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
vec4 GLF_live17_GLF_color = _GLF_FUZZED((vec4(-84.79, -2.2, 954.532, 7.9)));

float GLF_live17cross2d(vec2 GLF_live17a, vec2 GLF_live17b) {
    return ((GLF_live17a.x) * (GLF_live17b.y) - (GLF_live17b.x) * (GLF_live17a.y));
}

int GLF_live17pointInTriangle(vec2 GLF_live17p, vec2 GLF_live17a, vec2 GLF_live17b, vec2 GLF_live17c) {
    float GLF_live17pab = GLF_live17cross2d(vec2(GLF_live17p.x - GLF_live17a.x, GLF_live17p.y - GLF_live17a.y), vec2(GLF_live17b.x - GLF_live17a.x, GLF_live17b.y - GLF_live17a.y));
    float GLF_live17pbc = GLF_live17cross2d(vec2(GLF_live17p.x - GLF_live17b.x, GLF_live17p.y - GLF_live17b.y), vec2(GLF_live17c.x - GLF_live17b.x, GLF_live17c.y - GLF_live17b.y));
    if (!((GLF_live17pab < 0.0 && GLF_live17pbc < 0.0) || (GLF_live17pab >= 0.0 && GLF_live17pbc >= 0.0))) {
        return 0;
    }
    float GLF_live17pca = GLF_live17cross2d(vec2(GLF_live17p.x - GLF_live17c.x, GLF_live17p.y - GLF_live17c.y), vec2(GLF_live17a.x - GLF_live17c.x, GLF_live17a.y - GLF_live17c.y));
    if (!((GLF_live17pab < 0.0 && GLF_live17pca < 0.0) || (GLF_live17pab >= 0.0 && GLF_live17pca >= 0.0))) {
        return 0;
    }
    return 1;
}

vec4 GLF_live16_GLF_color = _GLF_FUZZED(vec4(-1705.6641, -9.1, -97.05, 6487.2891));

layout(set = 0, binding = 2) uniform buf2 {
    vec2 GLF_live16injectionSwitch;
};

float GLF_live16compute_derivative_x(float GLF_live16v) {
    return dFdx(GLF_live16v) * GLF_live16injectionSwitch.y;
}

float GLF_live16compute_derivative_y(float GLF_live16v) {
    return dFdy(GLF_live16v) * GLF_live16injectionSwitch.y;
}

float GLF_live16compute_stripe(float GLF_live16v) {
    return smoothstep(-.9, 1., (GLF_live16v) / ((GLF_live16injectionSwitch.y > GLF_live16injectionSwitch.x) ? GLF_live16compute_derivative_x(GLF_live16v) : GLF_live16compute_derivative_y(GLF_live16v)));
}

vec4 GLF_dead13gl_FragCoord = _GLF_FUZZED(vec4(9107.2303, vec3(793.354, 1.9, 3.8)));

layout(set = 0, binding = 3) uniform buf3 {
    vec2 GLF_dead13injectionSwitch;
};

const int GLF_dead13N = 10;
int GLF_dead13data[10] = int[10](_GLF_FUZZED(33123), _GLF_FUZZED(43654), _GLF_FUZZED(((false) ? 69717 : (-14768))), _GLF_FUZZED(8979), _GLF_FUZZED(int(false)), _GLF_FUZZED((+65259)), _GLF_FUZZED(-94603), _GLF_FUZZED((-((35471 & (-15584)) - (-11501)))), _GLF_FUZZED(-15577), _GLF_FUZZED(-12169)), GLF_dead13temp[10] = int[10](_GLF_FUZZED(92754), _GLF_FUZZED(-5213), _GLF_FUZZED(-66921), _GLF_FUZZED(41526), _GLF_FUZZED(87414), _GLF_FUZZED(45900), _GLF_FUZZED(-10204), _GLF_FUZZED(-26884), _GLF_FUZZED(-20728), _GLF_FUZZED(65136));

void GLF_dead13merge(int GLF_dead13from, int GLF_dead13mid, int GLF_dead13to) {
    int GLF_dead13k = GLF_dead13from, GLF_dead13i = GLF_dead13from, GLF_dead13j = GLF_dead13mid + 1;
    while (GLF_dead13i <= GLF_dead13mid && GLF_dead13j <= GLF_dead13to) {
        if (_GLF_IDENTITY(GLF_dead13data[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13i, 10)] < GLF_dead13data[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13j, 10)], !(!(GLF_dead13data[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13i, 10)] < GLF_dead13data[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13j, 10)])))) {
            GLF_dead13temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13k++, 10)] = GLF_dead13data[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13i++, 10)];
        } else {
            GLF_dead13temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13k++, 10)] = GLF_dead13data[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13j++, 10)];
        }
        if (_GLF_DEAD(false)) {
            float donor_replacementGLF_dead16th = _GLF_FUZZED(dot(vec4(-1624.7960, 85.09, -7.8, -962.493), vec4(27.40, -766.683, -216.905, -4.0)));
            vec2 donor_replacementGLF_dead16v = _GLF_FUZZED(vec2(-80.69, -79.73));
            if (donor_replacementGLF_dead16v.x < 0.0) {
                donor_replacementGLF_dead16th = 1.0 - donor_replacementGLF_dead16th;
            }
        }
    }
    while (GLF_dead13i < GLF_dead13N && GLF_dead13i <= GLF_dead13mid) {
        GLF_dead13temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13k++, 10)] = GLF_dead13data[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13i++, 10)];
    }
    for (int GLF_dead13i = GLF_dead13from; GLF_dead13i <= GLF_dead13to; GLF_dead13i++) {
        if (_GLF_DEAD(false)) {
            float donor_replacementGLF_dead19th = _GLF_FUZZED(min(GLF_dead13injectionSwitch, GLF_dead13injectionSwitch).g);
            vec2 donor_replacementGLF_dead19v = _GLF_FUZZED(min(vec2(-3242.8211, 2.5), length(atanh(GLF_dead13gl_FragCoord))));
            if (donor_replacementGLF_dead19v.y < 0.0) {
                donor_replacementGLF_dead19th = -donor_replacementGLF_dead19th;
            }
        }
        GLF_dead13data[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13i, 10)] = GLF_dead13temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13i, 10)];
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
        float donor_replacementGLF_dead16th = _GLF_FUZZED(intBitsToFloat(bitfieldReverse(GLF_dead13mid)));
        {
            donor_replacementGLF_dead16th = 1.0 - donor_replacementGLF_dead16th;
        }
    }
}

layout(set = 0, binding = 4) uniform buf4 {
    float GLF_dead12time;
};

layout(set = 0, binding = 5) uniform buf5 {
    vec2 GLF_dead12resolution;
};

float GLF_dead12h_r = _GLF_FUZZED(72.65);
float GLF_dead12s_g = _GLF_FUZZED(3.8);
float GLF_dead12b_b = _GLF_FUZZED((+(1152.9201)));

float _GLF_outlined_16(float donor_replacementGLF_dead19th) {
    return 0.5 - donor_replacementGLF_dead19th;
}

void GLF_dead12doConvert() {
    if (_GLF_DEAD(false)) {
        float donor_replacementGLF_dead19th = _GLF_FUZZED(GLF_dead12b_b);
        {
            donor_replacementGLF_dead19th = _GLF_outlined_16(donor_replacementGLF_dead19th);
        }
    }
    int GLF_dead12msb8 = 256;
    vec3 GLF_dead12temp = _GLF_FUZZED(vec3(_GLF_IDENTITY(9.8, float(_GLF_IDENTITY(mat4(9.8, 1.0, _GLF_IDENTITY(dot(vec4(1.0, 0.0, 0.0, tan(0.0)), vec4(1.0, 0.0, 0.0, 0.0)), dot(vec4(1.0, 0.0, 0.0, tan(0.0)), vec4(1.0, 0.0, 0.0, 0.0))), 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 1.0, 0.0, 1.0, 0.0, 0.0), mat4(0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0) + (mat4(9.8, 1.0, _GLF_IDENTITY(dot(vec4(1.0, 0.0, 0.0, tan(0.0)), vec4(1.0, 0.0, 0.0, 0.0)), dot(vec4(1.0, 0.0, 0.0, tan(0.0)), vec4(1.0, 0.0, 0.0, 0.0))), 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 1.0, 0.0, 1.0, 0.0, 0.0))))), 24.98, -279.654));
    GLF_dead12temp = GLF_dead12b_b * (float(bitCount(GLF_dead12msb8)) - GLF_dead12s_g) + (GLF_dead12b_b - GLF_dead12b_b * (float(bitCount(GLF_dead12msb8)) - GLF_dead12s_g)) * clamp(abs(abs(6.0 * (GLF_dead12h_r - vec3(bitfieldReverse(0), bitCount(GLF_dead12msb8), 2) / 3.0)) - 3.0) - float(bitCount(GLF_dead12msb8)), float(bitfieldExtract(int(GLF_dead12resolution.x), 0, 0)), float(_GLF_IDENTITY(bitCount(int(GLF_dead12resolution.x)), clamp(bitCount(int(GLF_dead12resolution.x)), bitCount(int(GLF_dead12resolution.x)), bitCount(int(GLF_dead12resolution.x))))));
    GLF_dead12h_r = GLF_dead12temp.x;
    if (_GLF_DEAD(false)) {
        vec2 donor_replacementGLF_dead16a = _GLF_FUZZED(GLF_dead13injectionSwitch);
        {
            GLF_dead12s_g = donor_replacementGLF_dead16a.x / donor_replacementGLF_dead16a.y;
        }
    }
    GLF_dead12s_g = GLF_dead12temp.y;
    GLF_dead12b_b = GLF_dead12temp.z;
}

vec3 GLF_dead12computeColor(float GLF_dead12c, vec2 GLF_dead12position) {
    int GLF_dead12msb8 = 256;
    GLF_dead12h_r = fract(GLF_dead12c);
    GLF_dead12s_g = float(bitCount(GLF_dead12msb8));
    GLF_dead12b_b = (0.5 + (sin(GLF_dead12time) * 0.5 + 0.5));
    GLF_dead12doConvert();
    GLF_dead12s_g *= float(bitCount(GLF_dead12msb8)) / GLF_dead12position.y;
    GLF_dead12h_r *= float(bitCount(GLF_dead12msb8)) / GLF_dead12position.x;
    if (abs(GLF_dead12position.y - GLF_dead12position.x) < 0.5) {
        GLF_dead12b_b = clamp(float(bitfieldExtract(int(GLF_dead12resolution.x), 0, 0)), float(bitCount(GLF_dead12msb8)), GLF_dead12b_b * float(bitCount(GLF_dead12msb8)) * 3.0);
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_IDENTITY(dot(vec2(0.0, 1.0), vec2(sqrt(1.0), 0.0)), dot(vec2(0.0, 1.0), vec2(sqrt(1.0), 0.0))))))) {
        vec2 donor_replacementGLF_dead19v = _GLF_FUZZED(GLF_dead12position);
        if (length(donor_replacementGLF_dead19v) < 0.001) {
            ;
        }
    }
    return vec3(GLF_dead12h_r, GLF_dead12s_g, GLF_dead12b_b);
}

vec3 GLF_dead12defaultColor() {
    return vec3(float(bitfieldExtract(int(GLF_dead12resolution.y), 0, 0)));
}

vec3 GLF_dead12drawShape(vec2 GLF_dead12pos, vec2 GLF_dead12square, vec3 GLF_dead12setting) {
    int GLF_dead12msb8 = 256;
    bool GLF_dead12c1 = GLF_dead12pos.x - GLF_dead12setting.x < GLF_dead12square.x;
    if (!GLF_dead12c1) {
        return GLF_dead12defaultColor();
    }
    bool GLF_dead12c2 = GLF_dead12pos.x + GLF_dead12setting.x > GLF_dead12square.x;
    if (!GLF_dead12c2) {
        return GLF_dead12defaultColor();
        if (_GLF_DEAD(false)) {
            if (GLF_dead12pos.y < GLF_dead12pos.x) {
                GLF_dead12s_g = 0.5 - GLF_dead12s_g;
            }
        }
    }
    bool GLF_dead12c3 = GLF_dead12pos.y - GLF_dead12setting.x < GLF_dead12square.y;
    if (!GLF_dead12c3) {
        return GLF_dead12defaultColor();
    }
    bool GLF_dead12c4 = GLF_dead12pos.y + GLF_dead12setting.x > GLF_dead12square.y;
    if (!GLF_dead12c4) {
        return GLF_dead12defaultColor();
    }
    bool GLF_dead12c5 = GLF_dead12pos.x - (GLF_dead12setting.x - GLF_dead12setting.y) < GLF_dead12square.x;
    if (!GLF_dead12c5) {
        return GLF_dead12computeColor(GLF_dead12setting.z / (5.0 * float(findMSB(GLF_dead12msb8))), GLF_dead12pos);
    }
    if (_GLF_DEAD(false)) {
        {
            ;
        }
    }
    bool GLF_dead12c6 = GLF_dead12pos.x + _GLF_IDENTITY((GLF_dead12setting.x - GLF_dead12setting.y), clamp((GLF_dead12setting.x - GLF_dead12setting.y), (GLF_dead12setting.x - GLF_dead12setting.y), (GLF_dead12setting.x - GLF_dead12setting.y))) > GLF_dead12square.x;
    if (!GLF_dead12c6) {
        return GLF_dead12computeColor(GLF_dead12setting.z / (5.0 * float(findMSB(GLF_dead12msb8))), GLF_dead12pos);
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
        float donor_replacementGLF_dead19z = _GLF_FUZZED(sign(length(GLF_dead13gl_FragCoord)));
        {
            donor_replacementGLF_dead19z = GLF_dead12square.x / GLF_dead12square.y;
        }
    }
    bool GLF_dead12c7 = GLF_dead12pos.y - (GLF_dead12setting.x - GLF_dead12setting.y) < GLF_dead12square.y;
    if (!GLF_dead12c7) {
        if (_GLF_DEAD(false)) {
            float donor_replacementGLF_dead16th = _GLF_FUZZED(float(GLF_dead12msb8));
            {
                donor_replacementGLF_dead16th = -donor_replacementGLF_dead16th;
            }
        }
        return GLF_dead12computeColor(GLF_dead12setting.z / (5.0 * float(findMSB(GLF_dead12msb8))), GLF_dead12pos);
    }
    bool GLF_dead12c8 = GLF_dead12pos.y + (GLF_dead12setting.x - GLF_dead12setting.y) > GLF_dead12square.y;
    if (!GLF_dead12c8) {
        return GLF_dead12computeColor(GLF_dead12setting.z / (5.0 * float(findMSB(GLF_dead12msb8))), GLF_dead12pos);
    }
    return GLF_dead12defaultColor();
}

vec4 GLF_dead14_GLF_color = _GLF_FUZZED(vec4(-8.2, -6091.1036, 948.910, 0.9));

struct GLF_dead14BST {
    int data;
    int leftIndex;
    int rightIndex;
};

GLF_dead14BST GLF_dead14tree[10];

void GLF_dead14makeTreeNode(inout GLF_dead14BST GLF_dead14tree, int GLF_dead14data) {
    GLF_dead14tree.data = GLF_dead14data;
    GLF_dead14tree.leftIndex = -1;
    GLF_dead14tree.rightIndex = _GLF_IDENTITY(-1, (_GLF_IDENTITY(-1, 0 ^ (_GLF_IDENTITY(-1, 0 + (-1))))) ^ ((1 ^ 1) << _GLF_IDENTITY(int(4), int(4))));
}

int GLF_dead14search(int GLF_dead14target) {
    GLF_dead14BST GLF_dead14currentNode;
    int GLF_dead14index = 0;
    while (GLF_dead14index != -1) {
        GLF_dead14currentNode = GLF_dead14tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead14index, 10)];
        if (_GLF_DEAD(false)) {
            vec2 donor_replacementGLF_dead16v = _GLF_FUZZED(normalize(GLF_dead12resolution));
            if (length(donor_replacementGLF_dead16v) < 0.001) {
                ;
            }
        }
        if (GLF_dead14currentNode.data == GLF_dead14target) {
            return GLF_dead14target;
        }
        GLF_dead14index = GLF_dead14target > GLF_dead14currentNode.data ? GLF_dead14currentNode.rightIndex : GLF_dead14currentNode.leftIndex;
    }
    return -1;
}

vec4 GLF_dead15_GLF_color = _GLF_FUZZED(vec4(846.059, -2.2, -9370.4740, 9.6));
vec4 GLF_live9_GLF_color = _GLF_FUZZED((vec4(3.6, 6476.0454, 5.1, 0.9) * _GLF_IDENTITY(6.4, (_GLF_IDENTITY(6.4, min(6.4, _GLF_IDENTITY(6.4, float(mat3x4(6.4, 1.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0, 1.0, 0.0, 0.0, 1.0)))))) / 1.0)));

struct GLF_dead8QuicksortObject {
    int numbers[10];
};

GLF_dead8QuicksortObject GLF_dead8obj;

float _GLF_outlined_17(float donor_replacementGLF_dead19th) {
    return 0.5 - donor_replacementGLF_dead19th;
}

void GLF_dead8swap(int GLF_dead8i, int GLF_dead8j) {
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
        bool donor_replacementGLF_dead12c5 = _GLF_FUZZED((ivec4(-55291, -74296, 96147, -25192) == ivec4(76896, 11830, -68997, -36492)));
        int donor_replacementGLF_dead12msb8 = _GLF_FUZZED(((-90429) >> GLF_dead8j));
        vec2 donor_replacementGLF_dead12pos = _GLF_FUZZED(vec2(-7.8, 945.356));
        vec3 donor_replacementGLF_dead12setting = _GLF_FUZZED(vec3(266.898, 5.3, -6074.9494));
        if (!donor_replacementGLF_dead12c5) {
            ;
        }
    }
    int GLF_dead8temp = GLF_dead8obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead8i, 10)];
    if (_GLF_DEAD(_GLF_IDENTITY(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)), bool(bvec3(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)), false, false))))) {
        vec2 donor_replacementGLF_dead13color = _GLF_FUZZED(vec2(-492.754, -85.30));
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
            float donor_replacementGLF_dead16th = _GLF_FUZZED(GLF_dead12h_r);
            {
                donor_replacementGLF_dead16th = -donor_replacementGLF_dead16th;
            }
        }
        vec3 donor_replacementGLF_dead13vecCoor = _GLF_FUZZED(cosh(vec3(36.47, -9.0, -308.592)));
        {
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                float donor_replacementGLF_dead16th = _GLF_FUZZED(determinant(mat2(-38.69, 8.4, 397.328, -576.999)));
                {
                    donor_replacementGLF_dead16th = 0.5 - donor_replacementGLF_dead16th;
                }
            }
            donor_replacementGLF_dead13color = fract(sin(donor_replacementGLF_dead13vecCoor.yx - trunc(float(GLF_dead13data[1]))));
            donor_replacementGLF_dead13color[1] *= atan(faceforward(GLF_dead13injectionSwitch, donor_replacementGLF_dead13color.xx, donor_replacementGLF_dead13vecCoor.yx).y);
            ;
        }
    }
    if (_GLF_DEAD(false)) {
        vec2 donor_replacementGLF_dead19a = _GLF_FUZZED(vec2(4.9, -1.3));
        float donor_replacementGLF_dead19th = _GLF_FUZZED(radians(GLF_dead12b_b));
        if (donor_replacementGLF_dead19a.y < donor_replacementGLF_dead19a.x) {
            donor_replacementGLF_dead19th = _GLF_outlined_17(donor_replacementGLF_dead19th);
        }
    }
    GLF_dead8obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead8i, 10)] = GLF_dead8obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead8j, 10)];
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < tan(0.0))))) {
        int donor_replacementGLF_dead14baseIndex = _GLF_FUZZED(GLF_dead8temp);
        {
            donor_replacementGLF_dead14baseIndex = GLF_dead14tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead14baseIndex, 10)].rightIndex;
            ;
        }
    }
    GLF_dead8obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead8j, 10)] = GLF_dead8temp;
}

struct GLF_live4BST {
    int data;
    int leftIndex;
    int rightIndex;
};

GLF_live4BST GLF_live4tree[10];

float _GLF_outlined_18(vec2 donor_replacementGLF_dead19a) {
    return donor_replacementGLF_dead19a.x / donor_replacementGLF_dead19a.y;
}

vec4 _GLF_outlined_19(float GLF_live9res) {
    return vec4(GLF_live9res, GLF_live9res, GLF_live9res, 1.0);
}

vec4 _GLF_outlined_20(int GLF_live9res1, int GLF_live9res2, int GLF_live9res3) {
    return vec4(float(GLF_live9res1 ^ GLF_live9res2), float(GLF_live9res2 & GLF_live9res3), float(GLF_live9res1 | GLF_live9res3), 1.0);
}

int _GLF_outlined_21() {
    return 0;
}

float _GLF_outlined_22(float donor_replacementGLF_dead16th) {
    return 1.0 - donor_replacementGLF_dead16th;
}

int _GLF_outlined_23(int donor_replacementGLF_dead10v) {
    return (4 * donor_replacementGLF_dead10v * (1000 - donor_replacementGLF_dead10v)) / 1000;
}

int GLF_live4search(int GLF_live4target) {
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < sqrt(0.0))))) {
        vec2 donor_replacementGLF_dead19a = _GLF_FUZZED(GLF_dead12resolution);
        {
            GLF_dead12s_g = _GLF_outlined_18(donor_replacementGLF_dead19a);
        }
    }
    GLF_live4BST GLF_live4currentNode;
    if (_GLF_DEAD(false)) {
        float donor_replacementGLF_dead16th = _GLF_FUZZED((GLF_dead12time + dot(vec3(-4.5, -9365.7315, -69.59), vec3(-143.453, 6841.8778, 97.42))));
        vec2 donor_replacementGLF_dead16v = _GLF_FUZZED(GLF_dead12resolution);
        if (donor_replacementGLF_dead16v.y < 0.0) {
            donor_replacementGLF_dead16th = -donor_replacementGLF_dead16th;
        }
    }
    int GLF_live4index = 0;
    {
        int GLF_live4looplimiter1 = 0;
        while (GLF_live4index != -1) {
            if (GLF_live4looplimiter1 >= 5) {
                break;
            }
            GLF_live4looplimiter1++;
            {
                if (_GLF_DEAD(_GLF_FALSE(false, (_GLF_IDENTITY(gl_FragCoord.y, clamp(_GLF_IDENTITY(gl_FragCoord.y, min(gl_FragCoord.y, gl_FragCoord.y)), _GLF_IDENTITY(gl_FragCoord.y, (gl_FragCoord.y) - 0.0), gl_FragCoord.y)) < 0.0)))) {
                    float donor_replacementGLF_dead9s = _GLF_FUZZED(dot(vec2(-200.025, 2588.2578), log(vec2(-5.4, -776.543))));
                    {
                        donor_replacementGLF_dead9s += 0.2;
                    }
                }
                GLF_live4currentNode = GLF_live4tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live4index, 10)];
                if (_GLF_DEAD(false)) {
                    int donor_replacementGLF_dead10iters = _GLF_FUZZED(GLF_live4index);
                    int donor_replacementGLF_dead10v = _GLF_FUZZED(findLSB(57218u));
                    if (_GLF_DEAD(false)) {
                        {
                            ;
                        }
                    }
                    {
                        vec2 GLF_live9coord = _GLF_FUZZED(((!true) ? vec2(682.292, -417.072) : vec2(7380.4300, -8774.7377)));
                        if (GLF_live9coord.y < 0.6) {
                            uvec2 GLF_live9icoord = uvec2(((GLF_live9coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                            uint GLF_live9res1 = uint(((GLF_live9icoord.x * _GLF_IDENTITY(GLF_live9icoord, uvec2(1u, 1u) * (GLF_live9icoord)).y) >> (GLF_live9icoord.x & 31u)) & 0xffffffffu);
                            uint GLF_live9res2 = _GLF_IDENTITY(uint(((GLF_live9icoord.x * GLF_live9icoord.y) << (GLF_live9icoord.x & 31u)) & 0xffffffffu), (uint(((GLF_live9icoord.x * GLF_live9icoord.y) << (GLF_live9icoord.x & 31u)) & 0xffffffffu)) >> 0u);
                            float GLF_live9res = float(_GLF_IDENTITY(((GLF_live9res2 & 0x80000000u) != 0u ? 1u : 0u), clamp(((GLF_live9res2 & 0x80000000u) != 0u ? 1u : 0u), ((GLF_live9res2 & 0x80000000u) != 0u ? 1u : 0u), ((GLF_live9res2 & 0x80000000u) != 0u ? 1u : 0u))) ^ ((GLF_live9res1 & 1u) != 0u ? 1u : 0u));
                            GLF_live9_GLF_color = _GLF_outlined_19(GLF_live9res);
                        } else {
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < _GLF_IDENTITY(0.0, mix(float(_GLF_FUZZED(29.93)), float(0.0), bool(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0))))))))) {
                                float donor_replacementGLF_dead15pab = _GLF_FUZZED(696.556);
                                float donor_replacementGLF_dead15pbc = _GLF_FUZZED(3.1);
                                if (!((donor_replacementGLF_dead15pab < 0.0 && donor_replacementGLF_dead15pbc < 0.0) || (donor_replacementGLF_dead15pab >= 0.0 && donor_replacementGLF_dead15pbc >= 0.0))) {
                                    return 0;
                                }
                            }
                            ivec2 GLF_live9icoord = ivec2((_GLF_IDENTITY((GLF_live9coord - vec2(0.4, 0.6)), mix(vec2(_GLF_FUZZED(-3.3), ((GLF_live9coord - vec2(0.4, 0.6)))[1]), vec2(((GLF_live9coord - vec2(0.4, 0.6)))[0], _GLF_FUZZED(158.609)), bvec2(true, _GLF_FALSE(false, (gl_FragCoord.y < 0.0))))) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                            int GLF_live9res3 = ((GLF_live9icoord.x >> 5) & 1) ^ ((GLF_live9icoord.y & 32) >> 5);
                            int GLF_live9res2 = (GLF_live9icoord.y * GLF_live9icoord.y >> 10) & 1;
                            int GLF_live9res1 = (GLF_live9icoord.x * GLF_live9icoord.y >> 9) & 1;
                            GLF_live9_GLF_color = _GLF_outlined_20(GLF_live9res1, GLF_live9res2, GLF_live9res3);
                        }
                    }
                    for (GLF_live4target = _GLF_outlined_21(); GLF_live4target < donor_replacementGLF_dead10iters; GLF_live4target++) {
                        donor_replacementGLF_dead10v = (4 * donor_replacementGLF_dead10v * (1000 - donor_replacementGLF_dead10v)) / 1000;
                    }
                }
                if (GLF_live4currentNode.data == GLF_live4target) {
                    return _GLF_IDENTITY(GLF_live4target, max(GLF_live4target, GLF_live4target));
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        vec2 donor_replacementGLF_dead16a = _GLF_FUZZED((GLF_dead13injectionSwitch - GLF_dead12time));
                        float donor_replacementGLF_dead16z = _GLF_FUZZED(distance(vec3(6.2, 347.446, -6958.3356), (mat2x3(481.356, -42.91, 43.17, -3072.6259, -20.86, -3.0) * (vec2(-2.1, 510.010) - vec2(-240.641, 3496.4455)))));
                        {
                            donor_replacementGLF_dead16z = donor_replacementGLF_dead16a.x / donor_replacementGLF_dead16a.y;
                        }
                    }
                }
                if (_GLF_DEAD(false)) {
                    int donor_replacementGLF_dead10v = _GLF_FUZZED(ivec2(84115, -62749).r);
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        float donor_replacementGLF_dead19th = _GLF_FUZZED(sin(round(GLF_dead12h_r)));
                        {
                            donor_replacementGLF_dead19th = 1.0 - donor_replacementGLF_dead19th;
                        }
                    }
                    {
                        if (_GLF_DEAD(false)) {
                            float donor_replacementGLF_dead16th = _GLF_FUZZED(GLF_dead12time);
                            {
                                donor_replacementGLF_dead16th = _GLF_outlined_22(donor_replacementGLF_dead16th);
                            }
                        }
                        donor_replacementGLF_dead10v = (4 * donor_replacementGLF_dead10v * (1000 - donor_replacementGLF_dead10v)) / 1000;
                    }
                }
                if (_GLF_DEAD(false)) {
                    vec2 donor_replacementGLF_dead13color = _GLF_FUZZED(vec2(-7.0, 3.3));
                    int donor_replacementGLF_dead13i = _GLF_FUZZED(GLF_live4index);
                    vec3 donor_replacementGLF_dead13vecCoor = _GLF_FUZZED(vec3(-3887.6281, -26.80, 8926.0398));
                    if (_GLF_DEAD(false)) {
                        vec2 donor_replacementGLF_dead19v = _GLF_FUZZED(vec2(-6.3, -1.7));
                        if (length(donor_replacementGLF_dead19v) < 0.001) {
                            ;
                        }
                    }
                    {
                        donor_replacementGLF_dead13color = fract(asinh(donor_replacementGLF_dead13vecCoor.yx - trunc(float(GLF_dead13data[6]))));
                        donor_replacementGLF_dead13color.y -= isnan(float(donor_replacementGLF_dead13i)) ? tanh(GLF_dead13gl_FragCoord.x) : atanh(GLF_dead13gl_FragCoord.y);
                        break;
                    }
                }
                _GLF_IDENTITY(GLF_live4index = GLF_live4target > GLF_live4currentNode.data ? GLF_live4currentNode.rightIndex : GLF_live4currentNode.leftIndex, (false ? _GLF_FUZZED(-80965) : (GLF_live4index = GLF_live4target > GLF_live4currentNode.data ? GLF_live4currentNode.rightIndex : GLF_live4currentNode.leftIndex)));
                if (_GLF_DEAD(false)) {
                    vec2 donor_replacementGLF_dead19a = _GLF_FUZZED(GLF_dead12resolution);
                    float donor_replacementGLF_dead19z = _GLF_FUZZED(GLF_dead12h_r);
                    if (donor_replacementGLF_dead19a.y > donor_replacementGLF_dead19a.x) {
                        donor_replacementGLF_dead19z = donor_replacementGLF_dead19a.x / donor_replacementGLF_dead19a.y;
                    } else {
                        donor_replacementGLF_dead19z = donor_replacementGLF_dead19a.y / donor_replacementGLF_dead19a.x;
                    }
                }
                if (_GLF_IDENTITY(_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))), true && (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))))) {
                    int donor_replacementGLF_dead10i = _GLF_FUZZED(bitfieldInsert(GLF_live4index, (779.938, GLF_live4index), 57872, -96484));
                    int donor_replacementGLF_dead10iters = _GLF_FUZZED(bitfieldInsert(GLF_live4looplimiter1, (GLF_live4target & GLF_live4looplimiter1), GLF_live4looplimiter1, GLF_live4target));
                    int donor_replacementGLF_dead10v = _GLF_FUZZED((true ? GLF_live4target : GLF_live4target));
                    for (donor_replacementGLF_dead10i = 0; donor_replacementGLF_dead10i < donor_replacementGLF_dead10iters; donor_replacementGLF_dead10i++) {
                        donor_replacementGLF_dead10v = _GLF_outlined_23(donor_replacementGLF_dead10v);
                    }
                }
                if (_GLF_DEAD(false)) {
                    vec2 donor_replacementGLF_dead19a = _GLF_FUZZED(cosh((vec2(-38.00, -0.6))));
                    {
                        GLF_dead12h_r = donor_replacementGLF_dead19a.x / donor_replacementGLF_dead19a.y;
                    }
                }
            }
            if (_GLF_DEAD(false)) {
                vec2 donor_replacementGLF_dead19v = _GLF_FUZZED(smoothstep(GLF_dead12time, GLF_dead12s_g, GLF_dead12resolution));
                if (donor_replacementGLF_dead19v.y < 0.0) {
                    GLF_dead12s_g = -GLF_dead12s_g;
                }
            }
        }
        if (_GLF_DEAD(false)) {
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < sin(0.0))))) {
                vec2 donor_replacementGLF_dead16v = _GLF_FUZZED(dFdx(min(vec2(-2381.4934, 9.2), GLF_dead12h_r)));
                {
                    vec3 GLF_live16col = _GLF_FUZZED((+vec2(-794.820, -8899.5048).xyy));
                    vec2 GLF_live16uv = _GLF_FUZZED(vec2(-1.8, 702.669));
                    {
                        float GLF_live16stripe = GLF_live16compute_stripe(tan((GLF_live16uv.x + GLF_live16uv.y) * 20.0));
                        GLF_live16col = mix(vec3(GLF_live16uv.x, .8, 0), vec3(1, GLF_live16uv.y, 0), GLF_live16stripe);
                        GLF_live16_GLF_color = vec4(GLF_live16col, 1.0);
                        ;
                    }
                }
                if (donor_replacementGLF_dead16v.y < 0.0) {
                    GLF_dead12b_b = -GLF_dead12b_b;
                }
            }
            {
                GLF_live4looplimiter1 = (_GLF_IDENTITY(4, (4) << 0) * GLF_live4looplimiter1 * (1000 - GLF_live4looplimiter1)) / 1000;
            }
        }
        if (_GLF_DEAD(false)) {
            float donor_replacementGLF_dead19th = _GLF_FUZZED(mod(GLF_dead12b_b, GLF_dead12h_r));
            {
                donor_replacementGLF_dead19th = 1.0 - donor_replacementGLF_dead19th;
            }
        }
    }
    if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < tan(0.0))))) {
    } else {
        return -1;
    }
}

const vec4 GLF_live7pal[16] = vec4[16](vec4(0.0, 0.0, 0.0, 1.0), vec4(0.5, 0.0, 0.0, 1.0), vec4(0.0, 0.5, 0.0, 1.0), vec4(0.5, 0.5, 0.0, 1.0), vec4(0.0, 0.0, 0.5, 1.0), vec4(0.5, 0.0, 0.5, 1.0), vec4(0.0, 0.5, 0.5, 1.0), vec4(0.5, 0.5, 0.5, 1.0), vec4(0.0, 0.0, 0.0, 1.0), vec4(1.0, 0.0, 0.0, 1.0), vec4(0.0, 1.0, 0.0, 1.0), vec4(1.0, 1.0, 0.0, 1.0), vec4(0.0, 0.0, 1.0, 1.0), vec4(1.0, 0.0, 1.0, 1.0), vec4(0.0, 1.0, 1.0, 1.0), vec4(1.0, 1.0, 1.0, 1.0));
const vec4 GLF_live7picdata[8] = vec4[8](vec4(4, 4, 20, 4), _GLF_IDENTITY(vec4(4, 4, 4, 20), max(vec4(4, 4, 4, 20), _GLF_IDENTITY(vec4(4, 4, 4, 20), max(vec4(4, 4, 4, 20), vec4(4, 4, 4, 20))))), vec4(4, 20, 20, 4), vec4(20, 4, 4, 8), vec4(8, 6, 4, 2), vec4(2, 12, 2, 4), vec4(16, _GLF_IDENTITY(2, int(int(2))), 4, 4), vec4(12, 22, 4, 4));
vec4 GLF_dead2gl_FragCoord = _GLF_FUZZED(vec4(-9.0, 4.9, 69.17, -0.7));

layout(set = 0, binding = 6) uniform buf6 {
    vec2 GLF_dead2injectionSwitch;
};

int GLF_dead2data[10] = int[10](_GLF_FUZZED((~(75741 ^ 66898))), _GLF_FUZZED(-34161), _GLF_FUZZED(ivec4(-12037, -74547, 32409, -78600).y), _GLF_FUZZED((20817 + 73129)), _GLF_FUZZED(-49977), _GLF_FUZZED((-((-8537) & 5429))), _GLF_FUZZED(-93809), _GLF_FUZZED((-92870)), _GLF_FUZZED((8168 - (-6650))), _GLF_FUZZED(7019)), GLF_dead2temp[10] = int[10](_GLF_FUZZED(-87656), _GLF_FUZZED(-82159), _GLF_FUZZED((28727 * 51579)), _GLF_FUZZED(-77483), _GLF_FUZZED(12157), _GLF_FUZZED(((_GLF_IDENTITY(-52498, (-52498) + 0)) + (-9891))), _GLF_FUZZED((~(+4960))), _GLF_FUZZED((-26650)), _GLF_FUZZED(-86314), _GLF_FUZZED(((-67198) + 44431)));
vec4 GLF_dead0_GLF_color = _GLF_IDENTITY(_GLF_FUZZED((_GLF_IDENTITY((vec4(671.457, -27.40, -901.095, 4317.8767) * 3.6) - 7.3, (_GLF_IDENTITY((vec4(671.457, -27.40, -901.095, 4317.8767) * 3.6) - 7.3, mat4(1.0) * ((vec4(671.457, -27.40, -901.095, 4317.8767) * 3.6) - 7.3))) - vec4(0.0, 0.0, 0.0, 0.0)))), abs(vec4(1.0, 1.0, 1.0, 1.0)) * (_GLF_FUZZED((_GLF_IDENTITY((vec4(671.457, -27.40, -901.095, 4317.8767) * 3.6) - 7.3, (_GLF_IDENTITY((vec4(671.457, -27.40, -901.095, 4317.8767) * 3.6) - 7.3, mat4(1.0) * ((vec4(671.457, -27.40, -901.095, 4317.8767) * 3.6) - 7.3))) - vec4(0.0, 0.0, 0.0, 0.0))))));
layout(location = 0) out vec4 _GLF_color;

layout(set = 0, binding = 0) uniform buf0 {
    vec2 injectionSwitch;
};

layout(set = 0, binding = 1) uniform buf1 {
    vec2 resolution;
};

vec4 _GLF_outlined_24(vec4 _GLF_color) {
    return (mat4x2(5.7, -1602.4931, 430.930, 294.615, 0.0, 7480.1977, 47.95, 1.0), dFdxCoarse(_GLF_color));
}

float _GLF_outlined_25(vec2 donor_replacementGLF_dead16a) {
    return donor_replacementGLF_dead16a.x / donor_replacementGLF_dead16a.y;
}

vec4 _GLF_outlined_26(vec4 _GLF_color) {
    return _GLF_color;
}

bool checkSwap(float a, float b) {
    return gl_FragCoord.y < resolution.y / 2.0 ? _GLF_IDENTITY(a > b, !(_GLF_IDENTITY(!(_GLF_IDENTITY(a > b, true && (a > b))), !(!(_GLF_IDENTITY(!(_GLF_IDENTITY(a > b, true && (a > b))), bool(bvec4(!(_GLF_IDENTITY(a > b, true && (a > b))), _GLF_FALSE(false, (gl_FragCoord.x < 0.0)), _GLF_FALSE(false, (gl_FragCoord.y < 0.0)), false)))))))) : a < b;
    if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
        if (_GLF_DEAD(false)) {
            float donor_replacementGLF_dead15pab = _GLF_FUZZED(b);
            float donor_replacementGLF_dead15pbc = _GLF_FUZZED(b);
            if (!((donor_replacementGLF_dead15pab < 0.0 && donor_replacementGLF_dead15pbc < 0.0) || (donor_replacementGLF_dead15pab >= 0.0 && donor_replacementGLF_dead15pbc >= 0.0))) {
                if (_GLF_DEAD(false)) {
                    float donor_replacementGLF_dead16th = _GLF_FUZZED(GLF_dead12h_r);
                    {
                        donor_replacementGLF_dead16th = -donor_replacementGLF_dead16th;
                    }
                }
                ;
            }
        }
    } else {
        if (_GLF_DEAD(false)) {
            vec2 donor_replacementGLF_dead0coord = _GLF_FUZZED(injectionSwitch);
            {
                {
                    {
                        {
                            ;
                        }
                    }
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = roundEven((vec4(8.0, -7.1, -8052.5413, -0.9) / vec4(687.185, 7775.6380, 8.3, 72.35)));
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        _GLF_color = GLF_dead15_GLF_color;
                    }
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    {
                        int GLF_live18looplimiter0 = 0;
                        int GLF_live18v = _GLF_FUZZED((76478));
                        {
                            if (GLF_live18looplimiter0 >= 5) {
                                ;
                            }
                            GLF_live18looplimiter0++;
                            {
                                GLF_live18v = (4 * GLF_live18v * (1000 - GLF_live18v)) / 1000;
                            }
                        }
                    }
                    _GLF_color = vec4(-4.4, 4.4, 665.429, 1.7);
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    {
                        GLF_dead15_GLF_color = vec4(0.0, 0.0, 0.0, 1.0);
                        if (_GLF_DEAD(false)) {
                            {
                                GLF_dead12s_g = 0.5 - GLF_dead12s_g;
                            }
                        }
                        if (_GLF_DEAD(false)) {
                            _GLF_color = fwidthFine((GLF_dead15_GLF_color - GLF_dead12h_r));
                        }
                    }
                }
                ivec2 GLF_dead0icoord = ivec2(((donor_replacementGLF_dead0coord - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, _GLF_IDENTITY(1.0, (true ? 1.0 : _GLF_FUZZED(b))) / _GLF_IDENTITY(0.4, (0.4) / 1.0))) * 256.0);
                int GLF_dead0res3 = ((GLF_dead0icoord.x >> 5) & 1) ^ ((GLF_dead0icoord.y & 32) >> 5);
                int GLF_dead0res2 = (GLF_dead0icoord.y * GLF_dead0icoord.y >> 10) & 1;
                int GLF_dead0res1 = (_GLF_IDENTITY(GLF_dead0icoord, clamp(GLF_dead0icoord, GLF_dead0icoord, GLF_dead0icoord)).x * GLF_dead0icoord.y >> 9) & 1;
                GLF_dead0_GLF_color = vec4(float(GLF_dead0res1 ^ GLF_dead0res2), float(GLF_dead0res2 & GLF_dead0res3), float(GLF_dead0res1 | GLF_dead0res3), 1.0);
            }
            {
                vec4 _GLF_outVarBackup_GLF_color;
                if (_GLF_DEAD(false)) {
                    {
                        if (_GLF_DEAD(false)) {
                            float donor_replacementGLF_dead16th = _GLF_FUZZED(float((uvec3(196752u, 24310u, 26654u) == (uvec3(43547u, 176761u, 198544u)))));
                            {
                                {
                                    ;
                                }
                            }
                            if (donor_replacementGLF_dead0coord.y < donor_replacementGLF_dead0coord.x) {
                                donor_replacementGLF_dead16th = 0.5 - donor_replacementGLF_dead16th;
                            }
                        }
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < _GLF_ZERO(0.0, injectionSwitch.x))))) {
                            _GLF_color = _GLF_outlined_24(_GLF_color);
                        }
                        _GLF_color = vec4(-902.303, -0.3, 1.1, 3.9);
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        vec2 donor_replacementGLF_dead16a = _GLF_FUZZED(vec2(-904.344, -9.2));
                        float donor_replacementGLF_dead16z = _GLF_FUZZED(GLF_dead12h_r);
                        if (donor_replacementGLF_dead16a.y > donor_replacementGLF_dead16a.x) {
                            donor_replacementGLF_dead16z = _GLF_outlined_25(donor_replacementGLF_dead16a);
                        } else {
                            donor_replacementGLF_dead16z = donor_replacementGLF_dead16a.y / donor_replacementGLF_dead16a.x;
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        _GLF_color = log2(GLF_dead14_GLF_color);
                    }
                    bool donor_replacementGLF_dead12c8 = _GLF_FUZZED(true);
                    int donor_replacementGLF_dead12msb8 = _GLF_FUZZED((60755 >> (-42096)));
                    vec2 donor_replacementGLF_dead12pos = _GLF_FUZZED(resolution);
                    vec3 donor_replacementGLF_dead12setting = _GLF_FUZZED(vec3(8183.5775, 88.64, 6.2));
                    if (!donor_replacementGLF_dead12c8) {
                        ;
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        {
                            ;
                        }
                    }
                }
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = fract(fwidthCoarse(vec4(520.655, 3302.1446, 58.07, 2754.9218)));
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
                if (_GLF_DEAD(false)) {
                    if (_GLF_DEAD(false)) {
                        _GLF_color = _GLF_outlined_26(_GLF_color);
                    }
                    {
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            _GLF_color = fwidth(GLF_dead15_GLF_color);
                        }
                        GLF_dead15_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
                    }
                }
            }
        }
    }
}

vec4 _GLF_outlined_0(vec4 _GLF_color) {
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
        vec2 donor_replacementGLF_dead19v = _GLF_FUZZED(injectionSwitch);
        if (donor_replacementGLF_dead19v.y < 0.0) {
            GLF_dead12s_g = -GLF_dead12s_g;
        }
    }
    if (_GLF_DEAD(false)) {
        if (_GLF_DEAD(false)) {
            float donor_replacementGLF_dead16th = _GLF_FUZZED(4628.1207);
            vec2 donor_replacementGLF_dead16v = _GLF_FUZZED(GLF_dead12resolution);
            if (donor_replacementGLF_dead16v.x < 0.0) {
                donor_replacementGLF_dead16th = 1.0 - donor_replacementGLF_dead16th;
            }
        }
        float donor_replacementGLF_dead15pab = _GLF_FUZZED(75.50);
        float donor_replacementGLF_dead15pbc = _GLF_FUZZED(47.66);
        if (!((donor_replacementGLF_dead15pab < 0.0 && _GLF_IDENTITY(donor_replacementGLF_dead15pbc < 0.0, false || (_GLF_IDENTITY(donor_replacementGLF_dead15pbc < 0.0, false || (donor_replacementGLF_dead15pbc < 0.0))))) || (donor_replacementGLF_dead15pab >= 0.0 && donor_replacementGLF_dead15pbc >= 0.0))) {
            ;
        }
    }
    return _GLF_color;
}

vec4 _GLF_outlined_1(vec4 _GLF_color) {
    if (_GLF_DEAD(false)) {
        float donor_replacementGLF_dead19th = _GLF_FUZZED(GLF_dead12time);
        {
            donor_replacementGLF_dead19th = 0.5 - donor_replacementGLF_dead19th;
        }
    }
    return _GLF_color;
}

vec4 _GLF_outlined_2(vec4 _GLF_outVarBackup_GLF_color) {
    return _GLF_outVarBackup_GLF_color;
}

vec4 _GLF_outlined_27(vec4 _GLF_color) {
    return _GLF_color;
}

vec4 _GLF_outlined_3(vec4 _GLF_outVarBackup_GLF_color) {
    return _GLF_outVarBackup_GLF_color;
    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
        int donor_replacementGLF_dead14count = _GLF_FUZZED(((-59449) ^ (-77897)));
        for (int GLF_dead14i = 0; GLF_dead14i < 20; GLF_dead14i++) {
            int GLF_dead14result = GLF_dead14search(GLF_dead14i);
            switch (GLF_dead14i) {
                case 9:
                case 5:
                case 12:
                case 15:
                case 7:
                case 8:
                case 2:
                case 6:
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_outlined_27(_GLF_color);
                        _GLF_color = vec4(-179.235, -2.3, -75.91, -3.4);
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                vec2 donor_replacementGLF_dead19a = _GLF_FUZZED(radians(mod(injectionSwitch, vec2(-7341.2232, -97.74))));
                                if (donor_replacementGLF_dead19a.y < donor_replacementGLF_dead19a.x) {
                                    GLF_dead12h_r = 0.5 - GLF_dead12h_r;
                                }
                            }
                        }
                    }
                case 17:
                case 13:
                    if (GLF_dead14result == GLF_dead14i) {
                        donor_replacementGLF_dead14count++;
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                float donor_replacementGLF_dead19th = _GLF_FUZZED(30.96);
                                vec2 donor_replacementGLF_dead19v = _GLF_FUZZED(GLF_dead12resolution);
                                if (donor_replacementGLF_dead19v.x < 0.0) {
                                    donor_replacementGLF_dead19th = 1.0 - donor_replacementGLF_dead19th;
                                }
                            }
                            _GLF_color = acosh(dFdyFine(_GLF_outVarBackup_GLF_color));
                        }
                    }
                    break;
                default:
                    if (GLF_dead14result == -1) {
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                            vec2 donor_replacementGLF_dead19a = _GLF_FUZZED(sin(injectionSwitch));
                            float donor_replacementGLF_dead19th = _GLF_FUZZED(GLF_dead12s_g);
                            if (donor_replacementGLF_dead19a.y < donor_replacementGLF_dead19a.x) {
                                donor_replacementGLF_dead19th = 0.5 - donor_replacementGLF_dead19th;
                            }
                        }
                        donor_replacementGLF_dead14count++;
                    }
                    break;
            }
            if (_GLF_DEAD(false)) {
                vec2 donor_replacementGLF_dead16a = _GLF_FUZZED(injectionSwitch);
                float donor_replacementGLF_dead16z = _GLF_FUZZED(8151.2944);
                {
                    donor_replacementGLF_dead16z = donor_replacementGLF_dead16a.x / donor_replacementGLF_dead16a.y;
                }
            }
        }
    }
}

float _GLF_outlined_28(float donor_replacementGLF_dead19th) {
    return 0.5 - donor_replacementGLF_dead19th;
}

vec4 _GLF_outlined_4() {
    if (_GLF_DEAD(false)) {
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            float donor_replacementGLF_dead16th = _GLF_FUZZED(GLF_dead12h_r);
            vec2 donor_replacementGLF_dead16v = _GLF_FUZZED(mix(GLF_dead2injectionSwitch, vec2(4373.7802, 4.5), GLF_dead12h_r));
            if (donor_replacementGLF_dead16v.y < 0.0) {
                donor_replacementGLF_dead16th = -donor_replacementGLF_dead16th;
            }
        }
        _GLF_color = GLF_dead2gl_FragCoord;
    }
    return acos(vec4(4.7, 255.314, 42.71, -1.8));
    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
        float donor_replacementGLF_dead19th = _GLF_FUZZED(ceil(GLF_dead12time));
        {
            donor_replacementGLF_dead19th = 0.5 - donor_replacementGLF_dead19th;
        }
    }
    {
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            _GLF_color = _GLF_color;
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(-5.5, 7351.5385, -7.9, 32.49);
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= sqrt(0.0))))) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
        }
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        _GLF_color = asin(vec4(-23.32, -2585.8076, 7312.6665, 4912.3795));
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            if (_GLF_DEAD(false)) {
                if (_GLF_DEAD(false)) {
                    vec2 donor_replacementGLF_dead16a = _GLF_FUZZED(vec2(-7.3, -7.5));
                    if (donor_replacementGLF_dead16a.y < donor_replacementGLF_dead16a.x) {
                        GLF_dead12h_r = 0.5 - GLF_dead12h_r;
                    }
                }
                _GLF_color = _GLF_color;
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    float donor_replacementGLF_dead19th = _GLF_FUZZED(GLF_dead12b_b);
                    {
                        donor_replacementGLF_dead19th = 0.5 - donor_replacementGLF_dead19th;
                    }
                }
            }
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
    }
    if (_GLF_DEAD(false)) {
        float donor_replacementGLF_dead19th = _GLF_FUZZED(sqrt(GLF_dead12s_g));
        {
            donor_replacementGLF_dead19th = _GLF_outlined_28(donor_replacementGLF_dead19th);
        }
    }
}

vec4 _GLF_outlined_5(vec4 _GLF_outVarBackup_GLF_color) {
    {
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        _GLF_color = max(vec4(3343.8395, -921.190, -8.4, -6596.2874), normalize(-10.75));
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            {
                bool GLF_live16c1 = _GLF_FUZZED(true);
                bool GLF_live16c2 = _GLF_FUZZED(false);
                bool GLF_live16c3 = _GLF_FUZZED(false);
                vec3 GLF_live16col = _GLF_FUZZED(vec3(963.249, -8.7, -9668.7592));
                vec2 GLF_live16uv = _GLF_FUZZED(vec2(-4.4, -8919.9964));
                if (!GLF_live16c1 && !GLF_live16c2 && GLF_live16c3) {
                    float GLF_live16stripe = GLF_live16compute_stripe(cos((GLF_live16uv.x + GLF_live16uv.y) * 20.0));
                    GLF_live16col = mix(vec3(.7, sinh(GLF_live16uv.x), GLF_live16uv.x), vec3(.3, .5, GLF_live16uv.x), GLF_live16stripe);
                    GLF_live16_GLF_color = vec4(GLF_live16col, 1.0);
                    ;
                }
            }
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
    }
    return _GLF_outVarBackup_GLF_color;
}

vec4 _GLF_outlined_6(vec4 _GLF_color) {
    return _GLF_color;
}

vec4 _GLF_outlined_7(vec4 _GLF_outVarBackup_GLF_color) {
    return _GLF_outVarBackup_GLF_color;
}

vec4 _GLF_outlined_8(vec4 _GLF_outVarBackup_GLF_color) {
    return _GLF_outVarBackup_GLF_color;
}

vec4 _GLF_outlined_9(float temp) {
    if (_GLF_DEAD(false)) {
        vec2 donor_replacementGLF_dead19v = _GLF_FUZZED(GLF_dead12resolution);
        if (length(donor_replacementGLF_dead19v) < 0.001) {
            ;
        }
    }
    return vec4(vec2(6.9, -36.60), (atan(temp) * vec2(473.749, 37.15)));
    if (_GLF_DEAD(false)) {
        _GLF_color = GLF_dead15_GLF_color;
    }
}

vec4 _GLF_outlined_10() {
    return vec4(-5066.4162, 7.4, 9.4, -9.7);
}

vec4 _GLF_outlined_11(vec4 _GLF_color) {
    return exp2(_GLF_color);
}

vec4 _GLF_outlined_12(vec4 _GLF_outVarBackup_GLF_color) {
    return _GLF_outVarBackup_GLF_color;
}

vec4 _GLF_outlined_13() {
    return ((mat2x4(-9.8, -359.714, -4904.5223, 7235.4862, -415.277, 7070.4773, 367.379, -5.0) - (-_GLF_IDENTITY(7.8, max(7.8, _GLF_IDENTITY(7.8, float(_GLF_IDENTITY(mat2x3(_GLF_IDENTITY(7.8, float(mat2x3(7.8, 0.0, 0.0, 1.0, 1.0, 1.0))), 1.0, 0.0, 0.0, 1.0, 0.0), (mat2x3(_GLF_IDENTITY(7.8, float(mat2x3(7.8, 0.0, 0.0, 1.0, 1.0, 1.0))), 1.0, 0.0, 0.0, 1.0, 0.0)) - mat2x3(0.0, 0.0, 0.0, 0.0, 0.0, 0.0)))))))) * vec2(-64.21, 2394.8179));
    {
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            vec2 donor_replacementGLF_dead19a = _GLF_FUZZED(mix(fwidthFine(injectionSwitch), vec2(-7.4, 3845.3858), GLF_dead12h_r));
            float donor_replacementGLF_dead19th = _GLF_FUZZED(floor(fwidthFine(GLF_dead12time)));
            if (donor_replacementGLF_dead19a.y < donor_replacementGLF_dead19a.x) {
                donor_replacementGLF_dead19th = 0.5 - donor_replacementGLF_dead19th;
            }
        }
        int GLF_live11i = _GLF_FUZZED(ivec4(-94886, -80132, -88621, 5581).y);
        int GLF_live11iters = _GLF_FUZZED((~(+ivec4(-68006, -35446, -70432, 47409)).y));
        int GLF_live11looplimiter0 = 0;
        int GLF_live11v = _GLF_FUZZED(-82308);
        for (GLF_live11i = 0; GLF_live11i < GLF_live11iters; GLF_live11i++) {
            if (GLF_live11looplimiter0 >= 7) {
                break;
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                {
                    ;
                }
            }
            GLF_live11looplimiter0++;
            {
                GLF_live11v = (4 * GLF_live11v * (1000 - GLF_live11v)) / 1000;
            }
        }
    }
}

vec4 _GLF_outlined_14(vec2 resolution) {
    {
        int GLF_live18looplimiter0 = 0;
        int GLF_live18v = _GLF_FUZZED((~(-51179)));
        {
            if (GLF_live18looplimiter0 >= 5) {
                ;
            }
            GLF_live18looplimiter0++;
            {
                GLF_live18v = (4 * GLF_live18v * (1000 - GLF_live18v)) / 1000;
            }
        }
    }
    return resolution.rggr;
    if (_GLF_DEAD(false)) {
        float donor_replacementGLF_dead16th = _GLF_FUZZED(mix(GLF_dead12time, GLF_dead12time, GLF_dead12h_r));
        {
            donor_replacementGLF_dead16th = 1.0 - donor_replacementGLF_dead16th;
        }
    }
}

float _GLF_outlined_29(float GLF_dead12b_b) {
    return 1.0 - GLF_dead12b_b;
}

vec4 _GLF_outlined_15(vec4 _GLF_outVarBackup_GLF_color) {
    return _GLF_outVarBackup_GLF_color;
    {
        if (_GLF_DEAD(false)) {
            _GLF_color = GLF_dead14_GLF_color;
        }
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        if (_GLF_DEAD(false)) {
            {
                ;
            }
        }
        if (_GLF_DEAD(false)) {
            _GLF_color = vec4(-6748.2703, 8.8, -5.8, -0.4);
            if (_GLF_DEAD(false)) {
                {
                    GLF_dead12b_b = _GLF_outlined_29(GLF_dead12b_b);
                }
            }
        }
        _GLF_color = vec4(5.9, -7.4, -7.4, 3895.6680);
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
        if (_GLF_DEAD(false)) {
            _GLF_color = mix(_GLF_color, vec4(resolution, GLF_dead2injectionSwitch), vec4(1.7, 918.869, 67.55, 74.56));
        }
    }
}

vec4 _GLF_outlined_30() {
    return abs(vec4(-3389.8305, -1.9, 2.4, -345.161));
    {
        vec2 GLF_live17pos = _GLF_FUZZED(vec2((mat3(-4036.5308, -4432.1710, -16.57, -570.844, 6.6, -5.3, -6.5, -7225.8464, -8.6) * vec3(-7.2, -841.358, -2.1))));
        if (GLF_live17pointInTriangle(GLF_live17pos, vec2(0.7, 0.3), vec2(0.5, 0.9), vec2(0.1, 0.4)) == 1) {
            GLF_live17_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
        } else {
            GLF_live17_GLF_color = vec4(0.0, 0.0, 0.0, 1.0);
        }
    }
}

vec4 _GLF_outlined_31(vec4 _GLF_color) {
    return _GLF_color;
}

vec4 _GLF_outlined_32(vec4 GLF_dead14_GLF_color) {
    return atanh(log2(GLF_dead14_GLF_color));
}

vec4 _GLF_outlined_33(vec4 GLF_dead2gl_FragCoord) {
    return GLF_dead2gl_FragCoord;
}

vec4 _GLF_outlined_34(vec4 GLF_dead0_GLF_color) {
    return GLF_dead0_GLF_color;
}

vec4 _GLF_outlined_35(float GLF_live9res) {
    return vec4(GLF_live9res, GLF_live9res, GLF_live9res, 1.0);
}

vec4 _GLF_outlined_36(vec4 _GLF_color) {
    return _GLF_color;
}

vec4 _GLF_outlined_37(vec4 _GLF_outVarBackup_GLF_color) {
    return _GLF_outVarBackup_GLF_color;
}

float _GLF_outlined_38(float GLF_dead12h_r) {
    return 0.5 - GLF_dead12h_r;
}

vec4 _GLF_outlined_39(vec4 _GLF_color) {
    return _GLF_color;
    {
        int GLF_live18looplimiter0 = 0;
        if (GLF_live18looplimiter0 >= 5) {
            ;
        }
    }
}

vec4 _GLF_outlined_40(vec4 _GLF_color) {
    return sqrt(_GLF_color);
}

vec4 _GLF_outlined_41() {
    return vec4(7.7, 2.8, -2.7, 7.8);
}

vec4 _GLF_outlined_42(vec4 GLF_live9_GLF_color) {
    return GLF_live9_GLF_color;
}

float _GLF_outlined_43(float donor_replacementGLF_dead16th) {
    return 0.5 - donor_replacementGLF_dead16th;
}

vec4 _GLF_outlined_44(vec4 GLF_dead0_GLF_color) {
    return exp((GLF_dead0_GLF_color / (-0.8)));
}

vec4 _GLF_outlined_45(vec4 GLF_dead13gl_FragCoord) {
    return asinh(sqrt(GLF_dead13gl_FragCoord));
}

float _GLF_outlined_46(vec2 donor_replacementGLF_dead19a) {
    return donor_replacementGLF_dead19a.y / donor_replacementGLF_dead19a.x;
}

float _GLF_outlined_47(vec2 donor_replacementGLF_dead19a) {
    return donor_replacementGLF_dead19a.x / donor_replacementGLF_dead19a.y;
}

vec4 _GLF_outlined_48() {
    return abs(vec4(2.0, 131.454, -68.74, -9076.9932));
}

vec4 _GLF_outlined_49(vec4 _GLF_outVarBackup_GLF_color) {
    return _GLF_outVarBackup_GLF_color;
}

float _GLF_outlined_50(float donor_replacementGLF_dead19th) {
    return -donor_replacementGLF_dead19th;
}

float _GLF_outlined_51(vec2 donor_replacementGLF_dead16a) {
    return donor_replacementGLF_dead16a.x / donor_replacementGLF_dead16a.y;
}

vec4 _GLF_outlined_52(vec4 _GLF_color) {
    return _GLF_color;
}

vec4 _GLF_outlined_53() {
    return vec4(-3.2, -7.3, -6563.8035, -713.930);
}

void main() {
    if (_GLF_DEAD(false)) {
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            _GLF_color = GLF_live9_GLF_color;
        }
        _GLF_color = tan(GLF_dead2gl_FragCoord);
        if (_GLF_DEAD(false)) {
            vec2 donor_replacementGLF_dead16a = _GLF_FUZZED(injectionSwitch);
            if (donor_replacementGLF_dead16a.y > donor_replacementGLF_dead16a.x) {
                GLF_dead12b_b = donor_replacementGLF_dead16a.x / donor_replacementGLF_dead16a.y;
            } else {
                GLF_dead12b_b = donor_replacementGLF_dead16a.y / donor_replacementGLF_dead16a.x;
            }
        }
    }
    float data[10];
    if (_GLF_DEAD(false)) {
        _GLF_color = GLF_dead2gl_FragCoord;
    }
    {
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            _GLF_color = _GLF_color;
            {
                vec3 GLF_live16col = _GLF_FUZZED(vec3(19.51, -6.9, -9.4));
                vec2 GLF_live16uv = _GLF_FUZZED(vec2(-45.28, -7.9));
                {
                    float GLF_live16stripe = GLF_live16compute_stripe(cos((GLF_live16uv.x + GLF_live16uv.y) * 20.0));
                    GLF_live16col = mix(vec3(GLF_live16uv.x, 0, 0.75), vec3(.8, .7, GLF_live16uv.x), GLF_live16stripe);
                    GLF_live16_GLF_color = vec4(GLF_live16col, 1.0);
                    ;
                }
            }
        }
        float GLF_live4v = _GLF_FUZZED(-9763.9311);
        if (GLF_live4v < float(GLF_live4search(6))) {
            if (_GLF_DEAD(false)) {
                _GLF_color = vec4(GLF_dead2injectionSwitch, fwidthCoarse(GLF_dead12s_g), fwidth(GLF_dead12time));
                if (_GLF_DEAD(false)) {
                    vec2 donor_replacementGLF_dead16a = _GLF_FUZZED(asin(vec2(22.62, -2.9)));
                    float donor_replacementGLF_dead16z = _GLF_FUZZED(degrees(GLF_dead12h_r));
                    {
                        donor_replacementGLF_dead16z = donor_replacementGLF_dead16a.x / donor_replacementGLF_dead16a.y;
                    }
                }
            }
            ;
        }
    }
    for (int i = 0; i < 10; _GLF_IDENTITY(i++, (i++) | 0)) {
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            {
                ;
            }
        }
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = vec4(54.24, -90.65, -4234.3853, -9751.3377);
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
        if (_GLF_DEAD(false)) {
            vec2 donor_replacementGLF_dead1pos = _GLF_FUZZED(pow(injectionSwitch, injectionSwitch));
            vec3 donor_replacementGLF_dead1setting = _GLF_FUZZED(vec3(-5.4, 7.3, -8403.0327));
            if (_GLF_DEAD(false)) {
                _GLF_color = (GLF_dead2gl_FragCoord + 333.289);
            }
            {
                vec4 _GLF_outVarBackup_GLF_color;
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    _GLF_color = _GLF_outlined_5(_GLF_outVarBackup_GLF_color);
                }
                if (_GLF_DEAD(false)) {
                    int donor_replacementGLF_dead8i = _GLF_FUZZED(i);
                    int donor_replacementGLF_dead8j = _GLF_FUZZED(21627);
                    {
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                            _GLF_color = dFdxCoarse(GLF_dead0_GLF_color);
                            if (_GLF_DEAD(false)) {
                                {
                                    discard;
                                }
                            }
                        }
                        donor_replacementGLF_dead8i++;
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            if (_GLF_DEAD(false)) {
                                vec2 donor_replacementGLF_dead19a = _GLF_FUZZED((+resolution));
                                if (donor_replacementGLF_dead19a.y < donor_replacementGLF_dead19a.x) {
                                    GLF_dead12s_g = 0.5 - GLF_dead12s_g;
                                }
                            }
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = _GLF_outlined_30();
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(true, !(_GLF_IDENTITY(!(true), (!(true)) && true))))) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            bool donor_replacementGLF_dead12c4 = _GLF_FUZZED(true);
                            if (!donor_replacementGLF_dead12c4) {
                                ;
                            }
                        }
                        GLF_dead8swap(donor_replacementGLF_dead8i, donor_replacementGLF_dead8j);
                        if (_GLF_DEAD(false)) {
                            vec2 donor_replacementGLF_dead16v = _GLF_FUZZED(dFdxCoarse(resolution));
                            if (length(donor_replacementGLF_dead16v) < 0.001) {
                                ;
                            }
                        }
                    }
                }
                _GLF_outVarBackup_GLF_color = _GLF_outlined_1(_GLF_color);
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                    if (_GLF_DEAD(false)) {
                        if (_GLF_DEAD(false)) {
                            float donor_replacementGLF_dead16th = _GLF_FUZZED(GLF_dead12time);
                            if (donor_replacementGLF_dead1pos.y < donor_replacementGLF_dead1pos.x) {
                                donor_replacementGLF_dead16th = 0.5 - donor_replacementGLF_dead16th;
                            }
                        }
                        for (int GLF_dead13j = 0; GLF_dead13j < 10; GLF_dead13j++) {
                            GLF_dead13temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13j, 10)] = GLF_dead13data[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13j, 10)];
                        }
                    }
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        if (_GLF_DEAD(false)) {
                            {
                                GLF_dead12s_g = -GLF_dead12s_g;
                            }
                        }
                        if (_GLF_DEAD(false)) {
                            if (_GLF_DEAD(false)) {
                                vec2 donor_replacementGLF_dead19a = _GLF_FUZZED((resolution - donor_replacementGLF_dead1pos));
                                float donor_replacementGLF_dead19z = _GLF_FUZZED(intBitsToFloat((GLF_dead13N & findMSB(64586u))));
                                if (donor_replacementGLF_dead19a.y > donor_replacementGLF_dead19a.x) {
                                    donor_replacementGLF_dead19z = donor_replacementGLF_dead19a.x / donor_replacementGLF_dead19a.y;
                                    {
                                        bool GLF_live16c1 = _GLF_FUZZED(true);
                                        bool GLF_live16c2 = _GLF_FUZZED(true);
                                        bool GLF_live16c3 = _GLF_FUZZED((true ^^ false));
                                        vec3 GLF_live16col = _GLF_FUZZED((46.42 + vec3(-979.392, 6795.3857, 7281.3939)).tst);
                                        vec2 GLF_live16uv = _GLF_FUZZED(((((-7.5) - mat3x2(-14.39, -1064.2386, -2261.6791, -5.7, 6.9, -3.4)) * mat4x3(7568.4837, -3.0, 24.88, 449.838, 9.9, 861.650, -5.2, -76.64, -899.703, 2.5, -9510.8711, -0.2)) * vec4(745.958, 390.604, 8.7, -6.3)));
                                        if (!GLF_live16c1 && !GLF_live16c2 && GLF_live16c3) {
                                            float GLF_live16stripe = GLF_live16compute_stripe(cos((GLF_live16uv.x + GLF_live16uv.y) * 20.0));
                                            GLF_live16col = mix(vec3(.7, sinh(GLF_live16uv.x), GLF_live16uv.x), vec3(.3, .5, GLF_live16uv.x), GLF_live16stripe);
                                            GLF_live16_GLF_color = vec4(GLF_live16col, 1.0);
                                            ;
                                        }
                                    }
                                } else {
                                    donor_replacementGLF_dead19z = donor_replacementGLF_dead19a.y / donor_replacementGLF_dead19a.x;
                                }
                            }
                            int donor_replacementGLF_dead14i = _GLF_FUZZED(((-84202) & i));
                            if (_GLF_DEAD(false)) {
                                vec2 donor_replacementGLF_dead19a = _GLF_FUZZED(injectionSwitch);
                                if (donor_replacementGLF_dead19a.y < donor_replacementGLF_dead19a.x) {
                                    GLF_dead12b_b = 0.5 - GLF_dead12b_b;
                                }
                            }
                            {
                                int GLF_dead14result = GLF_dead14search(donor_replacementGLF_dead14i);
                                switch (donor_replacementGLF_dead14i) {
                                    case 9:
                                    case 5:
                                    case 12:
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < _GLF_ZERO(0.0, injectionSwitch.x))))) {
                                            _GLF_color = vec4(0.0, 2.6, -3.1, 5.3);
                                        }
                                    case 15:
                                    case 7:
                                    case 8:
                                    case 2:
                                        {
                                            int GLF_live18i = _GLF_FUZZED(((-14172) * 24953));
                                            int GLF_live18iters = _GLF_FUZZED((((-36811) - 16254) | (-93371)));
                                            int GLF_live18looplimiter0 = 0;
                                            int GLF_live18v = _GLF_FUZZED((78338 | (-91613)));
                                            for (GLF_live18i = 0; GLF_live18i < GLF_live18iters; GLF_live18i++) {
                                                if (GLF_live18looplimiter0 >= 5) {
                                                    break;
                                                }
                                                GLF_live18looplimiter0++;
                                                {
                                                    GLF_live18v = (4 * GLF_live18v * (1000 - GLF_live18v)) / 1000;
                                                }
                                            }
                                        }
                                    case 6:
                                    case 17:
                                        {
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                {
                                                    ;
                                                }
                                            }
                                            vec4 _GLF_outVarBackup_GLF_color;
                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                            _GLF_color = vec4(8978.0435, -75.45, -656.065, -4602.3504);
                                            if (_GLF_DEAD(false)) {
                                                _GLF_color = vec4(556.229, -11.83, -6683.6095, -7.0);
                                                if (_GLF_DEAD(false)) {
                                                    float donor_replacementGLF_dead16z = _GLF_FUZZED(tan(5.7));
                                                    if (donor_replacementGLF_dead1pos.y > donor_replacementGLF_dead1pos.x) {
                                                        donor_replacementGLF_dead16z = donor_replacementGLF_dead1pos.x / donor_replacementGLF_dead1pos.y;
                                                        {
                                                            vec3 GLF_live16col = _GLF_FUZZED((vec3(5096.1993, -6459.4342, -7.6)));
                                                            vec2 GLF_live16uv = _GLF_FUZZED(vec2(1.9, 836.205));
                                                            {
                                                                float GLF_live16stripe = GLF_live16compute_stripe(tan((GLF_live16uv.x + GLF_live16uv.y) * 20.0));
                                                                GLF_live16col = mix(vec3(0.5, GLF_live16uv.x, 0.1), vec3(.4, 0, .5), GLF_live16stripe);
                                                                GLF_live16_GLF_color = vec4(GLF_live16col, 1.0);
                                                                ;
                                                            }
                                                        }
                                                    } else {
                                                        donor_replacementGLF_dead16z = donor_replacementGLF_dead1pos.y / donor_replacementGLF_dead1pos.x;
                                                    }
                                                }
                                            }
                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                if (_GLF_DEAD(false)) {
                                                    vec2 donor_replacementGLF_dead19v = _GLF_FUZZED(asinh(GLF_dead12resolution));
                                                    if (length(donor_replacementGLF_dead19v) < 0.001) {
                                                        ;
                                                    }
                                                }
                                            }
                                        }
                                    case 13:
                                        if (GLF_dead14result == donor_replacementGLF_dead14i) {
                                            i++;
                                        }
                                        break;
                                        {
                                            bool GLF_live16c1 = _GLF_FUZZED(true);
                                            bool GLF_live16c2 = _GLF_FUZZED((mat3x2(-8598.3358, -0.9, 7.4, -7.0, 822.793, -14.44) == mat3x2(-8.1, 800.058, 618.658, -896.647, -412.684, -55.03)));
                                            bool GLF_live16c3 = _GLF_FUZZED((bvec4(bvec2(true, false), bvec2(false, true)) != bvec4(true, false, false, true)));
                                            bool GLF_live16c4 = _GLF_FUZZED((mat4(-5.7, -5601.8515, 7401.9452, 3.7, 9.9, 10.15, 97.62, -0.8, -5.8, 26.35, -6.3, -5.9, 64.23, -7.0, 270.293, 6.2) != (mat4(-26.89, -3.1, 5799.8241, -3.7, 9017.3496, -193.180, -4719.3811, 123.125, 9903.6497, -19.23, -2.4, -0.8, 1401.7861, 9.6, -8.3, -5.5) + (-268.133))));
                                            vec3 GLF_live16col = _GLF_FUZZED(vec3(-6.3));
                                            vec2 GLF_live16uv = _GLF_FUZZED(vec2(560.083, -6.2));
                                            if (!GLF_live16c1 && !GLF_live16c2 && !GLF_live16c3 && GLF_live16c4) {
                                                float GLF_live16stripe = GLF_live16compute_stripe(tan((GLF_live16uv.x + GLF_live16uv.y) * 20.0));
                                                GLF_live16col = mix(vec3(GLF_live16uv.x, .8, 0), vec3(1, GLF_live16uv.y, 0), GLF_live16stripe);
                                                GLF_live16_GLF_color = vec4(GLF_live16col, 1.0);
                                                ;
                                            }
                                        }
                                    default:
                                        if (GLF_dead14result == -1) {
                                            i++;
                                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                _GLF_color = GLF_dead15_GLF_color;
                                            }
                                        }
                                        break;
                                }
                            }
                        }
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        if (_GLF_DEAD(false)) {
                            _GLF_color = _GLF_color;
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                            {
                                ;
                            }
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            {
                                GLF_dead15_GLF_color = vec4(0.0, 0.0, 0.0, 1.0);
                            }
                        }
                        _GLF_color = acos((round(vec3(803.169, -3780.8538, 340.393)) * mat4x3(-9.4, -7.6, 1.2, -8.0, 5.2, 9613.6874, -5169.4323, 3.7, -_GLF_IDENTITY(0.3, min(0.3, _GLF_IDENTITY(0.3, mix(float(0.3), float(_GLF_FUZZED(-859.877)), bool(false))))), 79.98, _GLF_IDENTITY(-442.233, (_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)) ? (-442.233) : _GLF_FUZZED(9860.5801))), 9196.0675)));
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    _GLF_color = vec4(5349.1697, 2.9, 6.6, -53.36);
                } else {
                }
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    if (_GLF_DEAD(false)) {
                        _GLF_color = GLF_live9_GLF_color;
                    }
                    {
                        {
                            ;
                        }
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        float donor_replacementGLF_dead16th = _GLF_FUZZED(-1.3);
                        {
                            bool GLF_live16c1 = _GLF_FUZZED(true);
                            bool GLF_live16c2 = _GLF_FUZZED(true);
                            bool GLF_live16c3 = _GLF_FUZZED(true);
                            bool GLF_live16c4 = _GLF_FUZZED(true);
                            vec3 GLF_live16col = _GLF_FUZZED(vec3(vec2(-87.75, 9.3), 66.91));
                            vec2 GLF_live16uv = _GLF_FUZZED(vec2(-6.8, -778.544));
                            if (!GLF_live16c1 && !GLF_live16c2 && !GLF_live16c3 && GLF_live16c4) {
                                float GLF_live16stripe = GLF_live16compute_stripe(tan((GLF_live16uv.x + GLF_live16uv.y) * 20.0));
                                GLF_live16col = mix(vec3(GLF_live16uv.x, .8, 0), vec3(1, GLF_live16uv.y, 0), GLF_live16stripe);
                                GLF_live16_GLF_color = vec4(GLF_live16col, 1.0);
                                ;
                            }
                        }
                        {
                            donor_replacementGLF_dead16th = -donor_replacementGLF_dead16th;
                        }
                    }
                    _GLF_outVarBackup_GLF_color = _GLF_outlined_6(_GLF_color);
                    _GLF_color = vec4(5.0, -5.4, -4716.1942, -4.2);
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= _GLF_IDENTITY(dot(vec2(0.0, 1.0), vec2(1.0, 0.0)), _GLF_IDENTITY(dot(vec2(0.0, 1.0), vec2(1.0, 0.0)), _GLF_IDENTITY(1.0, mix(float(1.0), float(_GLF_FUZZED(58.58)), bool(false))) * (dot(vec2(0.0, 1.0), vec2(_GLF_IDENTITY(1.0, (1.0) * 1.0), 0.0))))))))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(true, !(!(_GLF_IDENTITY(true, (true) && true)))))) {
                    _GLF_color = _GLF_outlined_2(_GLF_outVarBackup_GLF_color);
                }
                {
                    vec2 GLF_live9coord = _GLF_FUZZED(((-6809.8135) * vec2(-20.11, -8569.4191)));
                    {
                        uvec2 GLF_live9icoord = uvec2(((GLF_live9coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                        if (_GLF_DEAD(false)) {
                            {
                                ;
                            }
                        }
                        uint GLF_live9res1 = uint(((GLF_live9icoord.x * GLF_live9icoord.y) >> (GLF_live9icoord.x & 31u)) & 0xffffffffu);
                        if (_GLF_DEAD(false)) {
                            _GLF_color = fwidthCoarse(GLF_dead13gl_FragCoord);
                        }
                        uint GLF_live9res2 = uint(((GLF_live9icoord.x * GLF_live9icoord.y) << (GLF_live9icoord.x & 31u)) & 0xffffffffu);
                        float GLF_live9res = float(((GLF_live9res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_live9res1 & 1u) != 0u ? 1u : 0u));
                        GLF_live9_GLF_color = vec4(GLF_live9res, GLF_live9res, GLF_live9res, 1.0);
                    }
                }
                if (_GLF_DEAD(false)) {
                    _GLF_color = GLF_dead2gl_FragCoord;
                }
            }
            if (_GLF_DEAD(_GLF_IDENTITY(false, (false) && true))) {
                _GLF_IDENTITY(_GLF_color = (-GLF_dead2gl_FragCoord), (_GLF_IDENTITY(_GLF_color = (-GLF_dead2gl_FragCoord), (true ? (_GLF_color = (-GLF_dead2gl_FragCoord)) : _GLF_FUZZED((+_GLF_color))))) / vec4(1.0, 1.0, 1.0, 1.0));
            }
            {
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    {
                        GLF_dead12b_b = 0.5 - GLF_dead12b_b;
                    }
                }
                vec4 _GLF_outVarBackup_GLF_color;
                {
                    bool GLF_live16c1 = _GLF_FUZZED((14734 < (true ? (-63429) : 75885)));
                    bool GLF_live16c2 = _GLF_FUZZED(((true ? bvec2(false, false) : bvec2(false, false)) != bvec2(false)));
                    bool GLF_live16c3 = _GLF_FUZZED((11796 == (-72890)));
                    vec3 GLF_live16col = _GLF_FUZZED(vec3(float(-93345)));
                    vec2 GLF_live16uv = _GLF_FUZZED((vec2(-4.2, -7227.0101) - vec2(-27.56, -23.79)));
                    if (!GLF_live16c1 && !GLF_live16c2 && GLF_live16c3) {
                        float GLF_live16stripe = GLF_live16compute_stripe(cos((GLF_live16uv.x + GLF_live16uv.y) * 20.0));
                        GLF_live16col = mix(vec3(.7, sinh(GLF_live16uv.x), GLF_live16uv.x), vec3(.3, .5, GLF_live16uv.x), GLF_live16stripe);
                        GLF_live16_GLF_color = vec4(GLF_live16col, 1.0);
                        ;
                    }
                }
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(-5894.2930, 6855.2118, -78.25, 8.7);
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            if (_GLF_DEAD(false)) {
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(-1.8, 46.30, -54.19, -1512.6535);
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= sqrt(0.0))))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        if (_GLF_DEAD(false)) {
                            {
                                ;
                            }
                        }
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                        if (_GLF_DEAD(false)) {
                            _GLF_color = exp2(GLF_dead13gl_FragCoord);
                        }
                    }
                }
                _GLF_color = max(vec4(-22.38, -8.1, 2.8, 521.472), 605.115);
            }
            {
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = abs(vec4(-55.62, -7878.8705, -169.019, -49.67));
                    do {
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                            if (_GLF_DEAD(false)) {
                                _GLF_color = GLF_dead0_GLF_color;
                            }
                        }
                    } while (_GLF_WRAPPED_LOOP(_GLF_IDENTITY(false, !(!(false)))));
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = round(vec4(vec2(-5.8, 1663.4528), vec2(-5.7, -6.6)));
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                _GLF_color = dFdx((GLF_dead0_GLF_color - 3.7));
                            }
                            _GLF_IDENTITY(_GLF_color = _GLF_outVarBackup_GLF_color, (true ? _GLF_IDENTITY(_GLF_color = _GLF_outVarBackup_GLF_color, (false ? _GLF_FUZZED(_GLF_outVarBackup_GLF_color) : (_GLF_color = _GLF_outVarBackup_GLF_color))) : _GLF_FUZZED(_GLF_color)));
                        }
                    }
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    _GLF_color = _GLF_outlined_31(_GLF_color);
                }
                if (_GLF_DEAD(false)) {
                    vec4 donor_replacementGLF_dead9c = _GLF_FUZZED((inversesqrt(injectionSwitch) * mat4x2(542.535, 42.58, -5.5, -9.4, -564.502, 6.2, -26.29, -8106.9145)));
                    {
                        if (_GLF_DEAD(false)) {
                            _GLF_color = GLF_dead0_GLF_color;
                            {
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = round(GLF_dead15_GLF_color);
                                    if (_GLF_DEAD(false)) {
                                        float donor_replacementGLF_dead16th = _GLF_FUZZED(GLF_dead12time);
                                        vec2 donor_replacementGLF_dead16v = _GLF_FUZZED(atanh(resolution));
                                        if (donor_replacementGLF_dead16v.y < 0.0) {
                                            donor_replacementGLF_dead16th = -donor_replacementGLF_dead16th;
                                        }
                                    }
                                }
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = (mat2x4(mat2x3(-4877.8558, 4875.7532, -478.938, -5684.4581, 206.926, -8.4)) * vec2(-7983.2951, -955.118));
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                    {
                                        ;
                                    }
                                }
                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= sqrt(0.0))))) {
                                    _GLF_color = _GLF_outlined_7(_GLF_outVarBackup_GLF_color);
                                }
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                {
                                    ;
                                }
                            }
                        }
                        if (donor_replacementGLF_dead9c[_GLF_MAKE_IN_BOUNDS_INT(i, 4)] >= 1.0) {
                            donor_replacementGLF_dead9c[_GLF_MAKE_IN_BOUNDS_INT(i, 4)] = donor_replacementGLF_dead9c[_GLF_MAKE_IN_BOUNDS_INT(i, 4)] * donor_replacementGLF_dead9c[_GLF_MAKE_IN_BOUNDS_INT(i, 4)];
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            _GLF_color = GLF_dead15_GLF_color;
                        }
                        i++;
                        if (_GLF_DEAD(_GLF_IDENTITY(false, (false) || false))) {
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                {
                                    GLF_dead12s_g = 1.0 - GLF_dead12s_g;
                                    {
                                        {
                                            GLF_live17_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
                                        }
                                    }
                                }
                            }
                            {
                                if (_GLF_DEAD(false)) {
                                    {
                                        ;
                                    }
                                }
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = (mat4(596.963, -9774.8633, -815.448, -9.0, 8.0, -20.68, -14.76, 505.041, 221.150, 1.7, -960.014, 54.74, -9979.8099, -95.48, 7.7, 148.010) * mix(vec4(3918.0725, 9.9, 255.988, 4.9), (vec4(-20.55, -8.6, -79.83, -83.86) - (-64.72)), -325.996));
                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                        _GLF_color = GLF_dead2gl_FragCoord;
                                    }
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                            if (_GLF_DEAD(false)) {
                                if (length(donor_replacementGLF_dead1pos) < 0.001) {
                                    ;
                                }
                            }
                            _GLF_color = donor_replacementGLF_dead9c;
                        }
                    }
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(5.1, -33.23, -4152.4471, -7.3);
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                }
                ;
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    vec2 donor_replacementGLF_dead16a = _GLF_FUZZED(GLF_dead2injectionSwitch);
                    float donor_replacementGLF_dead16th = _GLF_FUZZED(-585.428);
                    if (donor_replacementGLF_dead16a.y < donor_replacementGLF_dead16a.x) {
                        donor_replacementGLF_dead16th = 0.5 - donor_replacementGLF_dead16th;
                    }
                }
            }
            if (_GLF_DEAD(false)) {
                _GLF_color = GLF_dead0_GLF_color;
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec3(_GLF_IDENTITY(41.08, (41.08) - 0.0), 2243.8291, -3.7).xxzy;
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
            }
            if (_GLF_DEAD(false)) {
                int donor_replacementGLF_dead13j = _GLF_FUZZED(sign((i / i)));
                {
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        _GLF_color = GLF_dead15_GLF_color;
                    }
                    GLF_dead13temp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead13j, 10)] = GLF_dead13data[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead13j, 10)];
                    if (_GLF_DEAD(false)) {
                        {
                            ;
                        }
                    }
                }
            }
        }
        data[i] = float(10 - i) * injectionSwitch.y;
    }
    for (int i = 0; i < 9; i++) {
        for (int j = 0; j < 10; j++) {
            if (j < _GLF_IDENTITY(i, max(i, i)) + 1) {
                if (_GLF_DEAD(false)) {
                    int donor_replacementGLF_dead14count = _GLF_FUZZED(min(ivec3(24538, 6358, -49373), i).b);
                    {
                        int GLF_dead14result = GLF_dead14search(i);
                        switch (i) {
                            case 9:
                            case 5:
                            case 12:
                            case 15:
                            case 7:
                            case 8:
                            case 2:
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    _GLF_color = (mat4x3(-8.2, -1178.6383, -8704.7128, 3.9, 144.675, -36.58, -7.4, 7.1, -346.015, 2.8, 3.3, -1.2)[1] * mat4x3(-7330.8523, 81.09, -20.54, 8.3, -228.874, 754.149, 5.4, 9.4, -897.212, -0.0, -3.1, 4.9));
                                }
                            case 6:
                            case 17:
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = vec4(3431.6194, 167.793, 15.03, -501.819);
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                            case 13:
                                if (GLF_dead14result == i) {
                                    donor_replacementGLF_dead14count++;
                                }
                                break;
                            default:
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                        _GLF_color = unpackSnorm4x8(44508u);
                                    }
                                    _GLF_color = vec4(5.3, -919.063, 96.60, 4.7);
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                                if (GLF_dead14result == -1) {
                                    donor_replacementGLF_dead14count++;
                                }
                                break;
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = vec4(6.1, -7.2, -9.1, -854.179);
                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                        }
                    }
                }
                continue;
                if (_GLF_DEAD(false)) {
                    int donor_replacementGLF_dead8i = _GLF_FUZZED(i);
                    if (_GLF_DEAD(false)) {
                        if (_GLF_DEAD(false)) {
                            float donor_replacementGLF_dead19th = _GLF_FUZZED(sqrt(GLF_dead12time));
                            vec2 donor_replacementGLF_dead19v = _GLF_FUZZED(GLF_dead2injectionSwitch);
                            if (donor_replacementGLF_dead19v.y < 0.0) {
                                donor_replacementGLF_dead19th = -donor_replacementGLF_dead19th;
                            }
                        }
                        if (_GLF_DEAD(false)) {
                            _GLF_color = _GLF_outlined_32(GLF_dead14_GLF_color);
                        }
                        {
                            bool GLF_live16c1 = _GLF_FUZZED(true);
                            bool GLF_live16c2 = _GLF_FUZZED(true);
                            vec3 GLF_live16col = _GLF_FUZZED(vec3(vec4(-537.434, -2.4, 6.3, 2.9)));
                            vec2 GLF_live16uv = _GLF_FUZZED((+vec2(-6.3, 4.6)));
                            if (!GLF_live16c1 && GLF_live16c2) {
                                float GLF_live16stripe = GLF_live16compute_stripe(tan((GLF_live16uv.x + GLF_live16uv.y) * 20.0));
                                GLF_live16col = mix(vec3(0.5, GLF_live16uv.x, 0.1), vec3(.4, 0, .5), GLF_live16stripe);
                                GLF_live16_GLF_color = vec4(GLF_live16col, 1.0);
                                ;
                            }
                        }
                        _GLF_color = vec4(1.2, 7.3, -3396.3133, 96.00);
                    }
                    for (int GLF_dead8j = i; GLF_dead8j <= j - 1; GLF_dead8j++) {
                        if (_GLF_DEAD(false)) {
                            vec2 donor_replacementGLF_dead19a = _GLF_FUZZED(GLF_dead13injectionSwitch);
                            if (donor_replacementGLF_dead19a.y > donor_replacementGLF_dead19a.x) {
                                GLF_dead12s_g = donor_replacementGLF_dead19a.x / donor_replacementGLF_dead19a.y;
                            } else {
                                GLF_dead12s_g = donor_replacementGLF_dead19a.y / donor_replacementGLF_dead19a.x;
                            }
                        }
                        if (GLF_dead8obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead8j, 10)] <= _GLF_IDENTITY(j, 0 ^ (j))) {
                            if (_GLF_DEAD(false)) {
                                _GLF_color = _GLF_outlined_33(GLF_dead2gl_FragCoord);
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = vec4(-6.9, -5.2, -432.323, -5.3);
                                }
                            }
                            if (_GLF_DEAD(false)) {
                                {
                                    int GLF_live18i = _GLF_FUZZED(-50777);
                                    int GLF_live18iters = _GLF_FUZZED(4805);
                                    int GLF_live18v = _GLF_FUZZED(87575);
                                    {
                                        int GLF_live18looplimiter0 = 0;
                                        for (GLF_live18i = 0; GLF_live18i < GLF_live18iters; GLF_live18i++) {
                                            if (GLF_live18looplimiter0 >= 5) {
                                                break;
                                            }
                                            GLF_live18looplimiter0++;
                                            {
                                                GLF_live18v = (4 * GLF_live18v * (1000 - GLF_live18v)) / 1000;
                                            }
                                        }
                                    }
                                }
                                _GLF_color = ((true) ? vec4(-42.47, 5.1, -7004.8920, 5.9) : GLF_dead14_GLF_color);
                            }
                            donor_replacementGLF_dead8i++;
                            GLF_dead8swap(donor_replacementGLF_dead8i, GLF_dead8j);
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        _GLF_color = (mat3x4(1217.7539, 1661.5321, 2346.7690, 4.2, -2.6, -8.0, -8.3, -6479.6885, 423.330, 3.9, -99.89, 2272.0789) * vec3(-8.9, 9811.7210, 0.7));
                    }
                }
            }
            {
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            _GLF_color = _GLF_outlined_34(GLF_dead0_GLF_color);
                            if (_GLF_DEAD(false)) {
                                _GLF_color = GLF_dead2gl_FragCoord;
                            }
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = cos(vec4(63.02, -793.756, 65.59, 88.45));
                                {
                                    vec3 GLF_live16col = _GLF_FUZZED(vec3(-3.5, -8429.2905, -44.18));
                                    vec2 GLF_live16uv = _GLF_FUZZED(vec2(0.6, 8884.3785));
                                    {
                                        float GLF_live16stripe = GLF_live16compute_stripe(cos((GLF_live16uv.x + GLF_live16uv.y) * 20.0));
                                        GLF_live16col = mix(vec3(GLF_live16uv.x, 0, 0.75), vec3(.8, .7, GLF_live16uv.x), GLF_live16stripe);
                                        GLF_live16_GLF_color = vec4(GLF_live16col, 1.0);
                                        ;
                                    }
                                }
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                        }
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        if (_GLF_DEAD(false)) {
                            vec2 donor_replacementGLF_dead16a = _GLF_FUZZED(refract(resolution, log(injectionSwitch), GLF_dead12s_g));
                            if (donor_replacementGLF_dead16a.y < donor_replacementGLF_dead16a.x) {
                                {
                                    {
                                        ;
                                    }
                                }
                                GLF_dead12s_g = 0.5 - GLF_dead12s_g;
                            }
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                            _GLF_color = GLF_dead2gl_FragCoord;
                        }
                        _GLF_IDENTITY(_GLF_color = vec4(-62.74, -18.65, 0.7, -94.88), vec4(0.0, 0.0, 0.0, 0.0) + (_GLF_color = vec4(-62.74, -18.65, 0.7, -94.88)));
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outlined_8(_GLF_outVarBackup_GLF_color);
                            if (_GLF_DEAD(false)) {
                                {
                                    ;
                                }
                            }
                        }
                    }
                    {
                        do {
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                int donor_replacementGLF_dead14count = _GLF_FUZZED(j);
                                if (donor_replacementGLF_dead14count == 20) {
                                    GLF_dead14_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
                                } else {
                                    GLF_dead14_GLF_color = vec4(0.0, 0.0, 1.0, 1.0);
                                }
                            }
                            j = (4 * j * (1000 - j)) / 1000;
                        } while (_GLF_WRAPPED_LOOP(false));
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                            _GLF_color = vec4(atan(vec3(8.9, -6.1, 6.1)), 8304.7539);
                            {
                                vec2 GLF_live9coord = _GLF_FUZZED((mat3x2(9.4, -8.3, 0.0, 8.2, 7.0, -29.18) * vec3(0.1, -6.1, 67.11)));
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    {
                                        GLF_dead12h_r = 0.5 - GLF_dead12h_r;
                                    }
                                }
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = abs(vec4(8.0, -95.68, -7.7, -99.63));
                                    }
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = vec4(8405.4597, 158.118, -3.5, 8.7);
                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= tan(0.0))))) {
                                        if (_GLF_DEAD(_GLF_IDENTITY(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)), (_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))) || false))) {
                                            float donor_replacementGLF_dead19th = _GLF_FUZZED(39.61);
                                            {
                                                donor_replacementGLF_dead19th = -donor_replacementGLF_dead19th;
                                            }
                                            {
                                                int GLF_live18v = _GLF_FUZZED(((-60527) - 9447));
                                                {
                                                    GLF_live18v = (4 * GLF_live18v * (1000 - GLF_live18v)) / 1000;
                                                }
                                            }
                                        }
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                                {
                                    uvec2 GLF_live9icoord = uvec2(((GLF_live9coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                                    uint GLF_live9res1 = uint(((_GLF_IDENTITY(GLF_live9icoord.x, min(GLF_live9icoord.x, GLF_live9icoord.x)) * GLF_live9icoord.y) >> (GLF_live9icoord.x & 31u)) & 0xffffffffu);
                                    uint GLF_live9res2 = uint(((GLF_live9icoord.x * GLF_live9icoord.y) << (GLF_live9icoord.x & 31u)) & 0xffffffffu);
                                    float GLF_live9res = float(((GLF_live9res2 & 0x80000000u) != 0u ? 1u : 0u) ^ _GLF_IDENTITY(((GLF_live9res1 & 1u) != 0u ? 1u : 0u), max(((GLF_live9res1 & 1u) != 0u ? 1u : 0u), _GLF_IDENTITY(((GLF_live9res1 & 1u) != 0u ? 1u : 0u), uint(uvec2(((GLF_live9res1 & 1u) != 0u ? 1u : 0u), 1u))))));
                                    if (_GLF_DEAD(false)) {
                                        {
                                            GLF_dead15_GLF_color = vec4(0.0, 0.0, 0.0, 1.0);
                                        }
                                    }
                                    GLF_live9_GLF_color = _GLF_outlined_35(GLF_live9res);
                                }
                            }
                        }
                    }
                }
                vec2 GLF_live5pos = _GLF_FUZZED(vec2(vec4(7.7, 1.5, 1.0, 159.028)));
                vec3 GLF_live5setting = _GLF_FUZZED(vec3(-996.969, -6.2, 5.6));
                {
                    ;
                }
            }
            bool doSwap = checkSwap(_GLF_IDENTITY(data[i], max(data[i], data[i])), data[j]);
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(144.748, 8.1, -8.2, -2368.1681);
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            {
                if (_GLF_DEAD(false)) {
                    vec2 donor_replacementGLF_dead16a = _GLF_FUZZED(GLF_dead2injectionSwitch);
                    float donor_replacementGLF_dead16z = _GLF_FUZZED(length(vec4(5.1, -3.5, -3.1, 116.962)));
                    {
                        donor_replacementGLF_dead16z = donor_replacementGLF_dead16a.x / donor_replacementGLF_dead16a.y;
                    }
                }
                if (_GLF_DEAD(false)) {
                    _GLF_color = ((4462 & ivec2(93467, 18218)), GLF_dead0_GLF_color);
                    if (_GLF_DEAD(false)) {
                        vec2 donor_replacementGLF_dead16a = _GLF_FUZZED(GLF_dead13injectionSwitch);
                        float donor_replacementGLF_dead16z = _GLF_FUZZED(ldexp(GLF_dead12h_r, (((-9868.4159) <= (-4.2)) ? 78693 : int(GLF_dead12b_b))));
                        if (donor_replacementGLF_dead16a.y > donor_replacementGLF_dead16a.x) {
                            donor_replacementGLF_dead16z = donor_replacementGLF_dead16a.x / donor_replacementGLF_dead16a.y;
                        } else {
                            donor_replacementGLF_dead16z = donor_replacementGLF_dead16a.y / donor_replacementGLF_dead16a.x;
                        }
                    }
                }
                vec4 _GLF_outVarBackup_GLF_color;
                if (_GLF_DEAD(false)) {
                    vec2 donor_replacementGLF_dead16a = _GLF_FUZZED(GLF_dead13injectionSwitch);
                    if (donor_replacementGLF_dead16a.y < donor_replacementGLF_dead16a.x) {
                        GLF_dead12h_r = 0.5 - GLF_dead12h_r;
                    }
                }
                _GLF_outVarBackup_GLF_color = _GLF_color;
                if (_GLF_DEAD(false)) {
                    int donor_replacementGLF_dead14baseIndex = _GLF_FUZZED(int(false));
                    int donor_replacementGLF_dead14treeIndex = _GLF_FUZZED(i);
                    if (GLF_dead14tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead14baseIndex, 10)].leftIndex == -1) {
                        GLF_dead14tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead14baseIndex, 10)].leftIndex = donor_replacementGLF_dead14treeIndex;
                        GLF_dead14makeTreeNode(GLF_dead14tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead14treeIndex, 10)], i);
                        return;
                    } else {
                        donor_replacementGLF_dead14baseIndex = GLF_dead14tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead14baseIndex, 10)].leftIndex;
                        continue;
                    }
                }
                _GLF_color = vec4(-5.1, 0.4, 0.6, -13.72);
                {
                    vec3 GLF_live16col = _GLF_FUZZED((vec3(4.5, 8.9, 5081.0780) * mat3(-7.1, 7728.3437, -6159.3167, -427.798, 7196.2774, 143.481, 8.4, 7.3, -576.153)));
                    vec2 GLF_live16uv = _GLF_FUZZED(vec4(9.6, 4620.0754, 60.19, -7.8).yx);
                    {
                        float GLF_live16stripe = GLF_live16compute_stripe(cos((GLF_live16uv.x + GLF_live16uv.y) * 20.0));
                        GLF_live16col = mix(vec3(GLF_live16uv.x, 0, 0.75), vec3(.8, .7, GLF_live16uv.x), GLF_live16stripe);
                        GLF_live16_GLF_color = vec4(GLF_live16col, 1.0);
                        ;
                    }
                }
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(-4022.5789, vec2(634.695, -53.79), -3.1);
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(true, (true) && true))) {
                        {
                            vec3 GLF_live16col = _GLF_FUZZED(vec3(-9.1, -1.4, 739.552));
                            vec2 GLF_live16uv = _GLF_FUZZED((false ? vec2(8.8, 2.7) : vec2(739.092, -61.99)));
                            {
                                float GLF_live16stripe = GLF_live16compute_stripe(cos((GLF_live16uv.x + GLF_live16uv.y) * 20.0));
                                GLF_live16col = mix(vec3(GLF_live16uv.x, 0, 0.75), vec3(.8, .7, GLF_live16uv.x), GLF_live16stripe);
                                GLF_live16_GLF_color = vec4(GLF_live16col, 1.0);
                                ;
                            }
                        }
                        if (_GLF_DEAD(false)) {
                            {
                                ;
                            }
                        }
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                    if (_GLF_DEAD(false)) {
                        if (_GLF_DEAD(false)) {
                            vec2 donor_replacementGLF_dead19a = _GLF_FUZZED(radians(GLF_dead13injectionSwitch));
                            float donor_replacementGLF_dead19z = _GLF_FUZZED(GLF_dead12time);
                            {
                                donor_replacementGLF_dead19z = donor_replacementGLF_dead19a.y / donor_replacementGLF_dead19a.x;
                            }
                        }
                        _GLF_color = GLF_dead14_GLF_color;
                    }
                }
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
                if (_GLF_DEAD(false)) {
                    _GLF_color = _GLF_color;
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        {
                            float GLF_live17pab = _GLF_FUZZED(-0.1);
                            float GLF_live17pbc = _GLF_FUZZED((true ? (-15.66) : (-119.518)));
                            if (!((GLF_live17pab < 0.0 && GLF_live17pbc < 0.0) || (GLF_live17pab >= 0.0 && GLF_live17pbc >= 0.0))) {
                                ;
                            }
                        }
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(-74.00, 9.0, -143.556, 798.395);
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            {
                                {
                                    GLF_live17_GLF_color = vec4(0.0, 0.0, 0.0, 1.0);
                                }
                            }
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                }
            }
            if (doSwap) {
                float temp = data[i];
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        if (_GLF_DEAD(false)) {
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_IDENTITY(_GLF_color, _GLF_IDENTITY(mat4(1.0) * (_GLF_color), (false ? _GLF_FUZZED(GLF_dead14_GLF_color) : (mat4(1.0) * (_GLF_color)))));
                                _GLF_color = vec4(419.523, 8185.7386, -4.3, -5333.3407);
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                                if (_GLF_DEAD(false)) {
                                    vec2 donor_replacementGLF_dead19a = _GLF_FUZZED(mix(vec3(-5957.8758, -3.6, 6.2).zz, GLF_dead12resolution, bvec2(false, false)));
                                    float donor_replacementGLF_dead19z = _GLF_FUZZED(length(vec3(1.1, 5706.3538, 3483.4642)));
                                    {
                                        donor_replacementGLF_dead19z = donor_replacementGLF_dead19a.x / donor_replacementGLF_dead19a.y;
                                    }
                                }
                            }
                            _GLF_color = GLF_dead2gl_FragCoord;
                        }
                        _GLF_color = _GLF_outlined_9(temp);
                    } else {
                    }
                }
                data[i] = data[j];
                data[j] = temp;
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    if (_GLF_DEAD(false)) {
                        {
                            ;
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_IDENTITY(dot(vec3(1.0, 1.0, 0.0), vec3(0.0, 0.0, 1.0)), dot(vec3(1.0, 1.0, 0.0), vec3(0.0, 0.0, 1.0))))))) {
                                float donor_replacementGLF_dead19th = _GLF_FUZZED(fwidth(-2256.6911));
                                {
                                    donor_replacementGLF_dead19th = 0.5 - donor_replacementGLF_dead19th;
                                }
                            }
                        }
                    }
                    for (int _injected_loop_counter = (0 | 0); _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = vec4(-545.801, -4737.3658, 4.5, -2846.0772);
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                    vec2 donor_replacementGLF_dead16v = _GLF_FUZZED(acos(unpackUnorm2x16(packUnorm2x16(GLF_dead12resolution))));
                                    if (donor_replacementGLF_dead16v.y < 0.0) {
                                        GLF_dead12s_g = -GLF_dead12s_g;
                                    }
                                }
                            }
                        }
                        if (_GLF_DEAD(false)) {
                            {
                                {
                                    vec2 GLF_live17pos = _GLF_FUZZED(vec2(-98.51, -752.464));
                                    if (GLF_live17pointInTriangle(GLF_live17pos, vec2(0.7, 0.3), vec2(0.5, 0.9), vec2(0.1, 0.4)) == 1) {
                                        GLF_live17_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
                                    } else {
                                        GLF_live17_GLF_color = vec4(0.0, 0.0, 0.0, 1.0);
                                    }
                                }
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = uintBitsToFloat(uvec4(98726u, 16938u, 154160u, 26587u));
                                }
                                if (_GLF_DEAD(false)) {
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                        {
                                            GLF_dead12s_g = -GLF_dead12s_g;
                                        }
                                    }
                                    {
                                        vec2 GLF_live9coord = _GLF_FUZZED((4.5 * _GLF_IDENTITY(vec2(-7.3, 7.1), min(vec2(-7.3, 7.1), vec2(-7.3, 7.1)))));
                                        {
                                            ivec2 GLF_live9icoord = ivec2(((GLF_live9coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.6, 1.0)) * 256.0);
                                            int GLF_live9v = (GLF_live9icoord.x ^ GLF_live9icoord.y) * GLF_live9icoord.y;
                                            if (_GLF_DEAD(false)) {
                                                _GLF_color = tan(GLF_dead15_GLF_color);
                                                if (_GLF_DEAD(false)) {
                                                    float donor_replacementGLF_dead16th = _GLF_FUZZED(abs(distance(GLF_dead12b_b, exp(GLF_dead12time))));
                                                    vec2 donor_replacementGLF_dead16v = _GLF_FUZZED(injectionSwitch);
                                                    if (donor_replacementGLF_dead16v.y < 0.0) {
                                                        donor_replacementGLF_dead16th = -donor_replacementGLF_dead16th;
                                                    }
                                                }
                                            }
                                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                {
                                                    ;
                                                }
                                            }
                                            bool GLF_live9res1 = ((GLF_live9v >> 10) & 1) != 0;
                                            bool GLF_live9res2 = ((GLF_live9v >> 11) & 4) != 0;
                                            bool GLF_live9res3 = ((GLF_live9v >> 12) & 8) != 0;
                                            if (_GLF_DEAD(false)) {
                                                {
                                                    ;
                                                }
                                            }
                                            GLF_live9_GLF_color = vec4(GLF_live9res1 ? 1.0 : 0.0, GLF_live9res2 ? 1.0 : 0.0, GLF_live9res3 ? 1.0 : 0.0, 1);
                                        }
                                    }
                                    vec3 donor_replacementGLF_dead8color = _GLF_FUZZED(inversesqrt(vec3(3.4, _GLF_IDENTITY(28.00, max(28.00, 28.00)), 5.1)));
                                    vec2 donor_replacementGLF_dead8uv = _GLF_FUZZED((resolution * mat2(-353.680, 315.342, -766.507, -94.51)));
                                    if (donor_replacementGLF_dead8uv.y > (1.0 / 4.0)) {
                                        {
                                            vec4 _GLF_outVarBackup_GLF_color;
                                            {
                                                vec4 _GLF_outVarBackup_GLF_color;
                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                _GLF_color = vec4(-5.6, -425.547, -8.8, 338.408);
                                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                }
                                            }
                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                            _GLF_color = _GLF_outlined_10();
                                            if (_GLF_DEAD(false)) {
                                                {
                                                    _injected_loop_counter = j;
                                                }
                                            }
                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                                _GLF_color = _GLF_outlined_3(_GLF_outVarBackup_GLF_color);
                                                if (_GLF_DEAD(false)) {
                                                    vec2 donor_replacementGLF_dead16v = _GLF_FUZZED(fma(GLF_dead13injectionSwitch, GLF_dead12resolution, injectionSwitch));
                                                    if (donor_replacementGLF_dead16v.y < 0.0) {
                                                        GLF_dead12b_b = -GLF_dead12b_b;
                                                    }
                                                }
                                                if (_GLF_DEAD(false)) {
                                                    vec2 donor_replacementGLF_dead13color = _GLF_FUZZED(resolution);
                                                    vec3 donor_replacementGLF_dead13vecCoor = _GLF_FUZZED(donor_replacementGLF_dead8color);
                                                    if (int(GLF_dead13gl_FragCoord[1]) < 210) {
                                                        {
                                                            {
                                                                bool GLF_live16c1 = _GLF_FUZZED((ivec4(70752, 88015, 94076, -81662) != ivec4(-80127, -97050, 20618, 78476)));
                                                                bool GLF_live16c2 = _GLF_FUZZED((ivec4(84812, -48563, 27546, -29587) == ivec4(28246, 77781, 37195, -60765)));
                                                                vec3 GLF_live16col = _GLF_FUZZED((4896.4864 * (4.8 * vec3(4.7, 2.3, 9.5))));
                                                                vec2 GLF_live16uv = _GLF_FUZZED((vec2(-56.38, 665.846) - ((-836.664) * (-6.4))));
                                                                if (!GLF_live16c1 && GLF_live16c2) {
                                                                    float GLF_live16stripe = GLF_live16compute_stripe(tan((GLF_live16uv.x + GLF_live16uv.y) * 20.0));
                                                                    GLF_live16col = mix(vec3(0.5, GLF_live16uv.x, 0.1), vec3(.4, 0, .5), GLF_live16stripe);
                                                                    GLF_live16_GLF_color = vec4(GLF_live16col, 1.0);
                                                                    ;
                                                                }
                                                            }
                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                            _GLF_outVarBackup_GLF_color = _GLF_outlined_36(_GLF_color);
                                                            if (_GLF_DEAD(false)) {
                                                                float donor_replacementGLF_dead16th = _GLF_FUZZED(float(180276u));
                                                                vec2 donor_replacementGLF_dead16v = _GLF_FUZZED(GLF_dead12resolution);
                                                                if (donor_replacementGLF_dead16v.x < 0.0) {
                                                                    donor_replacementGLF_dead16th = 1.0 - donor_replacementGLF_dead16th;
                                                                }
                                                            }
                                                            _GLF_color = vec4(-10.92, -3.5, 67.00, -2.9);
                                                            if (_GLF_DEAD(false)) {
                                                                _GLF_color = roundEven(GLF_dead13gl_FragCoord);
                                                            }
                                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                            }
                                                        }
                                                        donor_replacementGLF_dead13color = fract(sin(donor_replacementGLF_dead13vecCoor.yx - trunc(_GLF_IDENTITY(float(GLF_dead13data[5]), float(mat2x3(float(GLF_dead13data[5]), 1.0, 0.0, 1.0, 1.0, 0.0))))));
                                                        donor_replacementGLF_dead13color.y -= tanh(donor_replacementGLF_dead13color.x) / cosh(donor_replacementGLF_dead13color.y);
                                                        break;
                                                    } else if (int(GLF_dead13gl_FragCoord[1]) < 240) {
                                                        donor_replacementGLF_dead13color = fract(asinh(donor_replacementGLF_dead13vecCoor.yx - trunc(float(GLF_dead13data[6]))));
                                                        donor_replacementGLF_dead13color.y -= isnan(float(_injected_loop_counter)) ? tanh(GLF_dead13gl_FragCoord.x) : atanh(GLF_dead13gl_FragCoord.y);
                                                        break;
                                                    } else if (int(GLF_dead13gl_FragCoord[1]) < 270) {
                                                        donor_replacementGLF_dead13color = fract(sin(donor_replacementGLF_dead13vecCoor.yx - trunc(float(GLF_dead13data[7]))));
                                                        if (_GLF_DEAD(false)) {
                                                            vec2 donor_replacementGLF_dead19a = _GLF_FUZZED(min(donor_replacementGLF_dead13color, donor_replacementGLF_dead8uv));
                                                            float donor_replacementGLF_dead19th = _GLF_FUZZED(GLF_dead12s_g);
                                                            if (donor_replacementGLF_dead19a.y < donor_replacementGLF_dead19a.x) {
                                                                donor_replacementGLF_dead19th = 0.5 - donor_replacementGLF_dead19th;
                                                            }
                                                        }
                                                        {
                                                            int GLF_live18i = _GLF_FUZZED(16079);
                                                            int GLF_live18iters = _GLF_FUZZED(-23461);
                                                            int GLF_live18looplimiter0 = 0;
                                                            int GLF_live18v = _GLF_FUZZED(-46546);
                                                            for (GLF_live18i = 0; GLF_live18i < GLF_live18iters; GLF_live18i++) {
                                                                if (GLF_live18looplimiter0 >= 5) {
                                                                    break;
                                                                }
                                                                GLF_live18looplimiter0++;
                                                                {
                                                                    GLF_live18v = (4 * GLF_live18v * (1000 - GLF_live18v)) / 1000;
                                                                }
                                                            }
                                                        }
                                                        donor_replacementGLF_dead13color.y *= mix(normalize(donor_replacementGLF_dead13vecCoor), normalize(vec3(donor_replacementGLF_dead13color, degrees(donor_replacementGLF_dead13color.x))), GLF_dead13injectionSwitch.x).y;
                                                        break;
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                            _GLF_color = clamp(GLF_dead13gl_FragCoord, GLF_dead15_GLF_color, dFdxFine(GLF_dead2gl_FragCoord));
                                                        }
                                                    } else {
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                            _GLF_color = vec4(dFdyCoarse(GLF_dead12h_r), temp, GLF_dead13injectionSwitch);
                                                        }
                                                        discard;
                                                    }
                                                    {
                                                        vec4 _GLF_outVarBackup_GLF_color;
                                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                                        if (_GLF_DEAD(false)) {
                                                            if (_GLF_DEAD(false)) {
                                                                if (length(donor_replacementGLF_dead8uv) < 0.001) {
                                                                    ;
                                                                }
                                                            }
                                                            _GLF_color = GLF_dead14_GLF_color;
                                                        }
                                                        _GLF_color = vec4(5.3, 1316.6459, 6.7, -6553.9592);
                                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                        if (_GLF_DEAD(false)) {
                                            vec3 donor_replacementGLF_dead13vecCoor = _GLF_FUZZED(donor_replacementGLF_dead8color);
                                            {
                                                donor_replacementGLF_dead8uv = fract(acosh(clamp(donor_replacementGLF_dead13vecCoor.yx - trunc(float(GLF_dead13data[3])), 1.0, 1000.0)));
                                                donor_replacementGLF_dead8uv.x += (isnan(GLF_dead13gl_FragCoord.x) ? log2(GLF_dead13gl_FragCoord.x) : log2(GLF_dead13gl_FragCoord.y));
                                                break;
                                            }
                                        }
                                        donor_replacementGLF_dead8color.x += float(GLF_dead8obj.numbers[5]);
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < tan(0.0))))) {
                                            _GLF_color = GLF_dead0_GLF_color.bgbb;
                                        }
                                        if (_GLF_DEAD(false)) {
                                            _GLF_color = vec4(-1300.8643, 592.707, -703.558, 5.5);
                                        }
                                    }
                                }
                                {
                                    {
                                        int GLF_live18looplimiter0 = 0;
                                        if (GLF_live18looplimiter0 >= 5) {
                                            ;
                                        }
                                    }
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    {
                                        int GLF_live18i = _GLF_FUZZED(((-41656) ^ 99601));
                                        int GLF_live18iters = _GLF_FUZZED((-85441));
                                        int GLF_live18looplimiter0 = 0;
                                        int GLF_live18v = _GLF_FUZZED((-(-94286)));
                                        for (GLF_live18i = 0; GLF_live18i < GLF_live18iters; GLF_live18i++) {
                                            if (GLF_live18looplimiter0 >= 5) {
                                                break;
                                            }
                                            GLF_live18looplimiter0++;
                                            {
                                                GLF_live18v = (4 * GLF_live18v * (1000 - GLF_live18v)) / 1000;
                                            }
                                        }
                                    }
                                    _GLF_color = vec4(8.5, -3.6, 557.045, 32.22);
                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= tan(0.0))))) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                        if (_GLF_DEAD(false)) {
                                            vec2 donor_replacementGLF_dead19a = _GLF_FUZZED(injectionSwitch);
                                            float donor_replacementGLF_dead19z = _GLF_FUZZED(determinant(mat2(5.6, -2.0, 4210.1252, -7.5)));
                                            if (donor_replacementGLF_dead19a.y > donor_replacementGLF_dead19a.x) {
                                                donor_replacementGLF_dead19z = donor_replacementGLF_dead19a.x / donor_replacementGLF_dead19a.y;
                                            } else {
                                                donor_replacementGLF_dead19z = donor_replacementGLF_dead19a.y / donor_replacementGLF_dead19a.x;
                                            }
                                        }
                                    }
                                }
                                {
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                        _GLF_color = GLF_live9_GLF_color;
                                    }
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = (vec4(-552.994, 74.46, 52.29, 65.28) / (-895.278));
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                        if (!((temp < 0.0 && temp < 0.0) || (temp >= 0.0 && temp >= 0.0))) {
                                            ;
                                        }
                                    }
                                    if (_GLF_DEAD(false)) {
                                        float donor_replacementGLF_dead16th = _GLF_FUZZED(GLF_dead12b_b);
                                        {
                                            donor_replacementGLF_dead16th = -donor_replacementGLF_dead16th;
                                        }
                                    }
                                    do {
                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                            {
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                    int donor_replacementGLF_dead13i = _GLF_FUZZED(j);
                                                    if (_GLF_DEAD(false)) {
                                                        float donor_replacementGLF_dead19th = _GLF_FUZZED(distance(temp, GLF_dead12b_b));
                                                        {
                                                            donor_replacementGLF_dead19th = -donor_replacementGLF_dead19th;
                                                        }
                                                    }
                                                    int donor_replacementGLF_dead13j = _GLF_FUZZED(13904);
                                                    {
                                                        if (GLF_dead13data[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead13i, 10)] < GLF_dead13data[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead13j, 10)]) {
                                                            GLF_dead13temp[_GLF_MAKE_IN_BOUNDS_INT(_injected_loop_counter++, 10)] = GLF_dead13data[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead13i++, 10)];
                                                        } else {
                                                            GLF_dead13temp[_GLF_MAKE_IN_BOUNDS_INT(_injected_loop_counter++, 10)] = GLF_dead13data[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead13j++, 10)];
                                                        }
                                                    }
                                                }
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                    _GLF_color = vec4(35.27, 8.8, -23.66, -58.19);
                                                }
                                                vec2 GLF_live9coord = _GLF_FUZZED((vec4(-9575.5917, (vec2(5246.1563, -4217.9147) * mat2(78.42, 3.9, 25.41, 866.548)), -82.20) * mat2x4(-1778.1255, -5.6, 3.4, 8.8, -765.631, 3.3, 1964.4451, -6.7)));
                                                {
                                                    ivec2 GLF_live9icoord = ivec2(((GLF_live9coord - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                                                    int GLF_live9res3 = ((GLF_live9icoord.x >> 5) & 1) ^ ((GLF_live9icoord.y & 32) >> 5);
                                                    int GLF_live9res2 = (GLF_live9icoord.y * GLF_live9icoord.y >> 10) & 1;
                                                    int GLF_live9res1 = (GLF_live9icoord.x * GLF_live9icoord.y >> 9) & 1;
                                                    GLF_live9_GLF_color = vec4(float(GLF_live9res1 ^ GLF_live9res2), float(GLF_live9res2 & GLF_live9res3), float(GLF_live9res1 | GLF_live9res3), 1.0);
                                                }
                                            }
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_IDENTITY(dot(vec4(0.0, 1.0, 1.0, 0.0), vec4(1.0, sin(0.0), 0.0, 1.0)), dot(vec4(0.0, 1.0, 1.0, 0.0), vec4(1.0, sin(0.0), 0.0, 1.0))))))) {
                                            {
                                                if (_GLF_DEAD(false)) {
                                                    _GLF_color = (vec4(injectionSwitch, GLF_dead13injectionSwitch) / smoothstep(fwidthCoarse(GLF_dead12b_b), GLF_dead12s_g, GLF_dead15_GLF_color));
                                                }
                                                vec4 _GLF_outVarBackup_GLF_color;
                                                _GLF_outVarBackup_GLF_color = _GLF_IDENTITY(_GLF_color, min(_GLF_IDENTITY(_GLF_color, vec4(mat2x4(_GLF_color, 0.0, 0.0, 0.0, 1.0))), _GLF_color));
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                    _GLF_color = ldexp(vec4(-271.545, -245.803, 4.6, 1547.6474), ivec4(68406, 14131, -25716, -38078));
                                                }
                                                _GLF_color = vec4(0.8, -5368.3751, 408.641, -380.501);
                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                    _GLF_color = _GLF_outlined_37(_GLF_outVarBackup_GLF_color);
                                                }
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                    {
                                                        GLF_dead12h_r = _GLF_outlined_38(GLF_dead12h_r);
                                                    }
                                                }
                                            }
                                            {
                                                ;
                                            }
                                        }
                                    } while (_GLF_WRAPPED_LOOP(false));
                                }
                                if (GLF_dead2data[_GLF_MAKE_IN_BOUNDS_INT(i, 10)] < GLF_dead2data[_GLF_MAKE_IN_BOUNDS_INT(i, 10)]) {
                                    _GLF_IDENTITY(GLF_dead2temp[_GLF_MAKE_IN_BOUNDS_INT(j++, 10)] = GLF_dead2data[_GLF_MAKE_IN_BOUNDS_INT(i++, 10)], ~(~(_GLF_IDENTITY(GLF_dead2temp[_GLF_MAKE_IN_BOUNDS_INT(j++, 10)] = GLF_dead2data[_GLF_MAKE_IN_BOUNDS_INT(i++, 10)], (GLF_dead2temp[_GLF_MAKE_IN_BOUNDS_INT(j++, 10)] = GLF_dead2data[_GLF_MAKE_IN_BOUNDS_INT(i++, 10)]) / ((1 << _GLF_IDENTITY(int(6), int(6))) >> _GLF_IDENTITY(int(6), int(6)))))));
                                    if (_GLF_DEAD(false)) {
                                        {
                                            GLF_dead14_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
                                        }
                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                            float donor_replacementGLF_dead16th = _GLF_FUZZED(log(GLF_dead12time));
                                            {
                                                donor_replacementGLF_dead16th = -donor_replacementGLF_dead16th;
                                            }
                                        }
                                    }
                                } else {
                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                        vec3 donor_replacementGLF_dead8color = _GLF_FUZZED(dFdy(vec3(35.05, -0.9, -8.1)));
                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                            vec2 donor_replacementGLF_dead19a = _GLF_FUZZED(resolution);
                                            float donor_replacementGLF_dead19th = _GLF_FUZZED(mix(log(GLF_dead12h_r), GLF_dead12b_b, GLF_dead12s_g));
                                            if (donor_replacementGLF_dead19a.y < donor_replacementGLF_dead19a.x) {
                                                donor_replacementGLF_dead19th = 0.5 - donor_replacementGLF_dead19th;
                                            }
                                        }
                                        {
                                            donor_replacementGLF_dead8color.x += float(GLF_dead8obj.numbers[9]);
                                            {
                                                vec4 _GLF_outVarBackup_GLF_color;
                                                _GLF_outVarBackup_GLF_color = _GLF_outlined_39(_GLF_color);
                                                if (_GLF_DEAD(false)) {
                                                    _GLF_color = vec4(83.11, -9.2, 37.12, 0.8);
                                                }
                                                _GLF_color = (vec4(4.8, 582.224, 0.7, 1108.8053) + 5.5);
                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                }
                                            }
                                        }
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                            _GLF_color = GLF_dead14_GLF_color;
                                        }
                                    }
                                    GLF_dead2temp[_GLF_MAKE_IN_BOUNDS_INT(j++, 10)] = GLF_dead2data[_GLF_MAKE_IN_BOUNDS_INT(i++, 10)];
                                    if (_GLF_DEAD(false)) {
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                            float donor_replacementGLF_dead19th = _GLF_FUZZED(GLF_dead12h_r);
                                            vec2 donor_replacementGLF_dead19v = _GLF_FUZZED(round(resolution));
                                            if (donor_replacementGLF_dead19v.x < 0.0) {
                                                donor_replacementGLF_dead19th = 1.0 - donor_replacementGLF_dead19th;
                                            }
                                        }
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                {
                                                    temp = 1.0 - temp;
                                                }
                                            }
                                            _GLF_color = refract(GLF_dead15_GLF_color, GLF_dead0_GLF_color, min(GLF_dead12b_b, -11.22));
                                        }
                                        _GLF_color = _GLF_outlined_11(_GLF_color);
                                    }
                                    if (_GLF_DEAD(false)) {
                                        vec2 donor_replacementGLF_dead19a = _GLF_FUZZED(fwidthFine(GLF_dead2injectionSwitch));
                                        {
                                            GLF_dead12b_b = donor_replacementGLF_dead19a.y / donor_replacementGLF_dead19a.x;
                                        }
                                    }
                                }
                            }
                            if (_GLF_DEAD(_GLF_IDENTITY(false, bool(bvec2(false, false))))) {
                                vec2 donor_replacementGLF_dead16a = _GLF_FUZZED(GLF_dead13injectionSwitch);
                                {
                                    GLF_dead12s_g = donor_replacementGLF_dead16a.x / donor_replacementGLF_dead16a.y;
                                }
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                vec2 donor_replacementGLF_dead13color = _GLF_FUZZED(vec2(-728.320, 5.4));
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = vec4(-203.118, -7.3, -38.13, 6.9);
                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= _GLF_IDENTITY(dot(vec2(sqrt(0.0), 1.0), vec2(abs(1.0), determinant(mat4(0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 0.0)))), dot(vec2(sqrt(0.0), 1.0), vec2(abs(1.0), determinant(mat4(0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 0.0))))))))) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                                vec3 donor_replacementGLF_dead13vecCoor = _GLF_FUZZED(vec3(21.38, 7501.4619, 5.5));
                                {
                                    donor_replacementGLF_dead13color = fract(sin(donor_replacementGLF_dead13vecCoor.yx - trunc(float(GLF_dead13data[7]))));
                                    donor_replacementGLF_dead13color.y *= mix(normalize(donor_replacementGLF_dead13vecCoor), normalize(vec3(_GLF_IDENTITY(donor_replacementGLF_dead13color, max(donor_replacementGLF_dead13color, _GLF_IDENTITY(donor_replacementGLF_dead13color, vec2(mat3(donor_replacementGLF_dead13color, 1.0, 1.0, 1.0, 0.0, 0.0, 1.0, 0.0))))), degrees(donor_replacementGLF_dead13color.x))), GLF_dead13injectionSwitch.x).y;
                                    break;
                                }
                            }
                        }
                    }
                    {
                        vec3 GLF_live16col = _GLF_FUZZED(vec2(-578.613, 220.739).grg);
                        vec2 GLF_live16uv = _GLF_FUZZED(vec2(-6965.8639, 28.76));
                        {
                            float GLF_live16stripe = GLF_live16compute_stripe(cos((GLF_live16uv.x + GLF_live16uv.y) * 20.0));
                            GLF_live16col = mix(vec3(.7, sinh(GLF_live16uv.x), GLF_live16uv.x), vec3(.3, .5, GLF_live16uv.x), GLF_live16stripe);
                            GLF_live16_GLF_color = vec4(GLF_live16col, 1.0);
                            ;
                        }
                    }
                    _GLF_color = _GLF_outlined_40(_GLF_color);
                    if (_GLF_DEAD(_GLF_IDENTITY(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)), (_GLF_FALSE(false, (gl_FragCoord.y < 0.0))) && true))) {
                        float donor_replacementGLF_dead16th = _GLF_FUZZED(GLF_dead12h_r);
                        {
                            donor_replacementGLF_dead16th = 0.5 - donor_replacementGLF_dead16th;
                        }
                    }
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    _GLF_color = dFdyCoarse(GLF_dead2gl_FragCoord);
                }
            }
            if (_GLF_DEAD(false)) {
                vec2 donor_replacementGLF_dead2color = _GLF_FUZZED(vec2(-_GLF_IDENTITY(8588.8541, (8588.8541) - sqrt(0.0)), -2.3));
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(-2.4, 1.1, -58.88, -97.37);
                    {
                        vec3 GLF_live16col = _GLF_FUZZED(vec3(6.8, -48.88, -2.8));
                        vec2 GLF_live16uv = _GLF_FUZZED((false ? (vec2(116.490, 4579.0554) * vec2(-55.32, -462.126)) : (vec4(523.466, 57.17, -58.76, -1715.7274) * mat2x4(-69.78, -9.8, 997.514, -10.34, 5.9, 176.455, 3.0, 682.139))));
                        {
                            float GLF_live16stripe = GLF_live16compute_stripe(tan((GLF_live16uv.x + GLF_live16uv.y) * 20.0));
                            GLF_live16col = mix(vec3(GLF_live16uv.x, .8, 0), vec3(1, GLF_live16uv.y, 0), GLF_live16stripe);
                            GLF_live16_GLF_color = vec4(GLF_live16col, 1.0);
                            ;
                        }
                    }
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                    if (_GLF_DEAD(false)) {
                        vec2 donor_replacementGLF_dead16v = _GLF_FUZZED(resolution);
                        if (donor_replacementGLF_dead16v.y < 0.0) {
                            GLF_dead12h_r = -GLF_dead12h_r;
                        }
                    }
                }
                int donor_replacementGLF_dead2i = _GLF_FUZZED(-79373);
                vec3 donor_replacementGLF_dead2vecCoor = _GLF_FUZZED(vec3(atan(-306.077), intBitsToFloat(j), -21.18));
                if (int(GLF_dead2gl_FragCoord[1]) < 240) {
                    donor_replacementGLF_dead2color = fract(asinh(donor_replacementGLF_dead2vecCoor.yx - trunc(float(GLF_dead2data[6]))));
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(582.970, 0.4, 52.16, 9.2);
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                            if (_GLF_DEAD(false)) {
                                _GLF_color = dFdyCoarse(_GLF_outVarBackup_GLF_color);
                            }
                        }
                    }
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = _GLF_outlined_41();
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                            _GLF_color = _GLF_outlined_12(_GLF_outVarBackup_GLF_color);
                        }
                        if (_GLF_DEAD(false)) {
                            float donor_replacementGLF_dead16th = _GLF_FUZZED(GLF_dead12s_g);
                            vec2 donor_replacementGLF_dead16v = _GLF_FUZZED(resolution);
                            if (donor_replacementGLF_dead16v.y < 0.0) {
                                donor_replacementGLF_dead16th = -donor_replacementGLF_dead16th;
                            }
                        }
                        if (_GLF_DEAD(false)) {
                            _GLF_color = vec4(2848.4187, 2752.5314, 632.151, -55.45);
                        }
                    }
                    if (_GLF_DEAD(_GLF_IDENTITY(false, bool(bvec2(false, true))))) {
                        _GLF_color = GLF_dead13gl_FragCoord;
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        if (_GLF_DEAD(false)) {
                            int donor_replacementGLF_dead14treeIndex = _GLF_FUZZED((+j));
                            while (j <= donor_replacementGLF_dead14treeIndex) {
                                if (donor_replacementGLF_dead2i <= GLF_dead14tree[_GLF_MAKE_IN_BOUNDS_INT(j, 10)].data) {
                                    {
                                        {
                                            ;
                                        }
                                    }
                                    if (GLF_dead14tree[_GLF_MAKE_IN_BOUNDS_INT(j, 10)].leftIndex == -1) {
                                        GLF_dead14tree[_GLF_MAKE_IN_BOUNDS_INT(j, 10)].leftIndex = donor_replacementGLF_dead14treeIndex;
                                        GLF_dead14makeTreeNode(GLF_dead14tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead14treeIndex, 10)], donor_replacementGLF_dead2i);
                                        return;
                                    } else {
                                        j = GLF_dead14tree[_GLF_MAKE_IN_BOUNDS_INT(j, 10)].leftIndex;
                                        continue;
                                    }
                                } else {
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = vec4(ldexp(donor_replacementGLF_dead2vecCoor, ivec3(-20315, -7050, -62425)), GLF_dead12b_b);
                                    }
                                    if (GLF_dead14tree[_GLF_MAKE_IN_BOUNDS_INT(j, 10)].rightIndex == -1) {
                                        GLF_dead14tree[_GLF_MAKE_IN_BOUNDS_INT(j, 10)].rightIndex = donor_replacementGLF_dead14treeIndex;
                                        GLF_dead14makeTreeNode(GLF_dead14tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead14treeIndex, 10)], donor_replacementGLF_dead2i);
                                        return;
                                    } else {
                                        j = GLF_dead14tree[_GLF_MAKE_IN_BOUNDS_INT(j, 10)].rightIndex;
                                        continue;
                                    }
                                }
                            }
                        }
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = vec4(float(2713), -6.8, degrees(5149.8179), 52.51);
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                float donor_replacementGLF_dead19th = _GLF_FUZZED(GLF_dead12s_g);
                                vec2 donor_replacementGLF_dead19v = _GLF_FUZZED(atan((mat2(-9.4, -2626.2200, -667.455, 5.2) * GLF_dead12resolution)));
                                if (donor_replacementGLF_dead19v.y < 0.0) {
                                    donor_replacementGLF_dead19th = -donor_replacementGLF_dead19th;
                                }
                            }
                        }
                        float donor_replacementGLF_dead9s = _GLF_FUZZED(_GLF_IDENTITY(pow(4.3, mod(9.9, 269.150)), max(pow(4.3, mod(9.9, 269.150)), pow(4.3, mod(9.9, 269.150)))));
                        {
                            donor_replacementGLF_dead9s += 0.2;
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                int donor_replacementGLF_dead13high = _GLF_FUZZED(j);
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = round(ceil(GLF_live9_GLF_color));
                                }
                                int donor_replacementGLF_dead13i = _GLF_FUZZED(ivec2(9066, 29419)[1]);
                                {
                                    int GLF_dead13from = donor_replacementGLF_dead13i;
                                    int GLF_dead13mid = donor_replacementGLF_dead13i + i - 1;
                                    int GLF_dead13to = min(donor_replacementGLF_dead13i + 2 * i - 1, donor_replacementGLF_dead13high);
                                    GLF_dead13merge(GLF_dead13from, GLF_dead13mid, GLF_dead13to);
                                }
                            }
                        }
                        if (_GLF_DEAD(false)) {
                            _GLF_color = _GLF_color;
                            if (_GLF_DEAD(false)) {
                                if (_GLF_DEAD(_GLF_IDENTITY(false, !(!(false))))) {
                                    float donor_replacementGLF_dead16th = _GLF_FUZZED(donor_replacementGLF_dead9s);
                                    vec2 donor_replacementGLF_dead16v = _GLF_FUZZED(donor_replacementGLF_dead2color);
                                    if (donor_replacementGLF_dead16v.y < 0.0) {
                                        donor_replacementGLF_dead16th = -donor_replacementGLF_dead16th;
                                    }
                                }
                                {
                                    discard;
                                }
                            }
                        }
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        _GLF_color = asin(GLF_dead0_GLF_color);
                    }
                    donor_replacementGLF_dead2color.y -= isnan(float(donor_replacementGLF_dead2i)) ? tanh(GLF_dead2gl_FragCoord.x) : atanh(GLF_dead2gl_FragCoord.y);
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        {
                            ;
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        float donor_replacementGLF_dead19th = _GLF_FUZZED((floor(GLF_dead12h_r) - intBitsToFloat(j)));
                        vec2 donor_replacementGLF_dead19v = _GLF_FUZZED(injectionSwitch);
                        if (donor_replacementGLF_dead19v.x < 0.0) {
                            donor_replacementGLF_dead19th = 1.0 - donor_replacementGLF_dead19th;
                        }
                    }
                    if (_GLF_DEAD(_GLF_IDENTITY(false, (false) && true))) {
                        _GLF_color = _GLF_outlined_13();
                    }
                    if (_GLF_DEAD(false)) {
                        vec2 donor_replacementGLF_dead19v = _GLF_FUZZED(fwidth(GLF_dead2injectionSwitch));
                        if (length(donor_replacementGLF_dead19v) < 0.001) {
                            ;
                        }
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        int donor_replacementGLF_dead14baseIndex = _GLF_FUZZED(min(findLSB(i), j));
                        int donor_replacementGLF_dead14data = _GLF_FUZZED(i);
                        int donor_replacementGLF_dead14treeIndex = _GLF_FUZZED(donor_replacementGLF_dead2i);
                        {
                            if (donor_replacementGLF_dead14data <= GLF_dead14tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead14baseIndex, 10)].data) {
                                if (GLF_dead14tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead14baseIndex, 10)].leftIndex == -1) {
                                    GLF_dead14tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead14baseIndex, 10)].leftIndex = donor_replacementGLF_dead14treeIndex;
                                    GLF_dead14makeTreeNode(GLF_dead14tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead14treeIndex, 10)], donor_replacementGLF_dead14data);
                                    return;
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = vec4(-790.329, -273.836, -3.7, 6774.4677);
                                        if (_GLF_DEAD(false)) {
                                            {
                                                GLF_dead12h_r = 0.5 - GLF_dead12h_r;
                                            }
                                        }
                                    }
                                } else {
                                    donor_replacementGLF_dead14baseIndex = GLF_dead14tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead14baseIndex, 10)].leftIndex;
                                    continue;
                                }
                            } else {
                                if (GLF_dead14tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead14baseIndex, 10)].rightIndex == -_GLF_IDENTITY(1, 1 * (1))) {
                                    GLF_dead14tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead14baseIndex, 10)].rightIndex = donor_replacementGLF_dead14treeIndex;
                                    GLF_dead14makeTreeNode(GLF_dead14tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead14treeIndex, 10)], donor_replacementGLF_dead14data);
                                    return;
                                } else {
                                    donor_replacementGLF_dead14baseIndex = GLF_dead14tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead14baseIndex, 10)].rightIndex;
                                    continue;
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = (vec4(GLF_dead12b_b, GLF_dead12b_b, 162.830, GLF_dead12h_r) - GLF_dead12b_b);
                                        if (_GLF_DEAD(false)) {
                                            {
                                                ;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    {
                        if (_GLF_DEAD(false)) {
                            float donor_replacementGLF_dead15pab = _GLF_FUZZED(-3.4);
                            float donor_replacementGLF_dead15pbc = _GLF_FUZZED((doSwap ? pow(-8.5, -9.9) : (-9.1)));
                            if (!((donor_replacementGLF_dead15pab < 0.0 && donor_replacementGLF_dead15pbc < 0.0) || (donor_replacementGLF_dead15pab >= 0.0 && donor_replacementGLF_dead15pbc >= 0.0))) {
                                ;
                            }
                        }
                        float GLF_live3pab = _GLF_FUZZED((0.3 + (-6.6)));
                        float GLF_live3pbc = _GLF_FUZZED((6.5));
                        if (_GLF_DEAD(false)) {
                            {
                                ;
                            }
                        }
                        if (!((GLF_live3pab < 0.0 && GLF_live3pbc < 0.0) || (GLF_live3pab >= 0.0 && GLF_live3pbc >= 0.0))) {
                            ;
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                if (_GLF_DEAD(false)) {
                                    {
                                        GLF_dead12b_b = clamp(float(bitfieldExtract(int(GLF_dead12resolution.x), 0, 0)), float(bitCount(i)), GLF_dead12b_b * float(_GLF_IDENTITY(bitCount(i), (bitCount(i)) | (bitCount(i)))) * 3.0);
                                        if (_GLF_DEAD(false)) {
                                            _GLF_color = GLF_dead2gl_FragCoord;
                                        }
                                    }
                                }
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                if (_GLF_DEAD(false)) {
                                    int donor_replacementGLF_dead14baseIndex = _GLF_FUZZED(i);
                                    if (_GLF_DEAD(false)) {
                                        {
                                            GLF_dead12h_r = donor_replacementGLF_dead2color.x / donor_replacementGLF_dead2color.y;
                                        }
                                    }
                                    int donor_replacementGLF_dead14treeIndex = _GLF_FUZZED(i);
                                    while (donor_replacementGLF_dead14baseIndex <= donor_replacementGLF_dead14treeIndex) {
                                        if (i <= GLF_dead14tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead14baseIndex, 10)].data) {
                                            if (GLF_dead14tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead14baseIndex, 10)].leftIndex == -1) {
                                                _GLF_IDENTITY(GLF_dead14tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead14baseIndex, 10)].leftIndex = donor_replacementGLF_dead14treeIndex, (GLF_dead14tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead14baseIndex, 10)].leftIndex = donor_replacementGLF_dead14treeIndex) << 0);
                                                GLF_dead14makeTreeNode(GLF_dead14tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead14treeIndex, 10)], i);
                                                return;
                                            } else {
                                                donor_replacementGLF_dead14baseIndex = GLF_dead14tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead14baseIndex, 10)].leftIndex;
                                                continue;
                                            }
                                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                _GLF_color = _GLF_outlined_42(GLF_live9_GLF_color);
                                            }
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                vec2 donor_replacementGLF_dead19a = _GLF_FUZZED(GLF_dead12resolution);
                                                {
                                                    GLF_live3pbc = donor_replacementGLF_dead19a.y / donor_replacementGLF_dead19a.x;
                                                }
                                            }
                                        } else {
                                            if (GLF_dead14tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead14baseIndex, 10)].rightIndex == -1) {
                                                GLF_dead14tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead14baseIndex, 10)].rightIndex = donor_replacementGLF_dead14treeIndex;
                                                GLF_dead14makeTreeNode(GLF_dead14tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead14treeIndex, 10)], i);
                                                return;
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                    if (donor_replacementGLF_dead2color.x < 0.0) {
                                                        {
                                                            {
                                                                ;
                                                            }
                                                        }
                                                        GLF_live3pbc = 1.0 - GLF_live3pbc;
                                                    }
                                                }
                                            } else {
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                    float donor_replacementGLF_dead16th = _GLF_FUZZED(length(vec4(-11.68, -3.2, 19.62, -6.1)));
                                                    if (donor_replacementGLF_dead2color.y < donor_replacementGLF_dead2color.x) {
                                                        donor_replacementGLF_dead16th = _GLF_outlined_43(donor_replacementGLF_dead16th);
                                                    }
                                                }
                                                donor_replacementGLF_dead14baseIndex = GLF_dead14tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead14baseIndex, 10)].rightIndex;
                                                continue;
                                            }
                                            {
                                                vec3 GLF_live16col = _GLF_FUZZED((vec3(2.0, 286.376, -8.3) + vec3(-3.1, -98.04, 1585.4539)));
                                                vec2 GLF_live16uv = _GLF_FUZZED(vec2(-1.4, -9.8));
                                                {
                                                    float GLF_live16stripe = GLF_live16compute_stripe(cos((GLF_live16uv.x + GLF_live16uv.y) * 20.0));
                                                    GLF_live16col = mix(vec3(.7, sinh(GLF_live16uv.x), GLF_live16uv.x), vec3(.3, .5, GLF_live16uv.x), GLF_live16stripe);
                                                    GLF_live16_GLF_color = vec4(GLF_live16col, 1.0);
                                                    ;
                                                }
                                            }
                                        }
                                    }
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = fract(sin(_GLF_outVarBackup_GLF_color));
                                    }
                                }
                                _GLF_color = smoothstep(-92.65, -22.23, vec4(-8563.4262, -287.820, 74.20, -2.3));
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        _GLF_color = (vec4(-772.290, -1930.7092, -4625.8848, 7.0) / vec4(45.83, 7.4, -1.3, 9.6));
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                    }
                                }
                            }
                        }
                    }
                    break;
                    if (_GLF_DEAD(false)) {
                        {
                            vec3 GLF_live16col = _GLF_FUZZED(vec2(-7772.3434, -1.3).yyy);
                            vec2 GLF_live16uv = _GLF_FUZZED((vec3(3.8, -29.50, -53.96) * (mat2x3(9.1, 62.64, 56.85, 880.412, 0.1, 53.89) - (mat4x3(-5511.8466, -6358.0236, 7204.8400, -94.56, -35.97, 1.6, 399.185, -39.40, -8.2, -32.34, -1.9, -638.863) * mat2x4(69.32, -6.6, 1.8, -4859.8224, 28.57, 38.13, 541.610, 7072.2971)))));
                            {
                                float GLF_live16stripe = GLF_live16compute_stripe(cos((GLF_live16uv.x + GLF_live16uv.y) * 20.0));
                                GLF_live16col = mix(vec3(GLF_live16uv.x, 0, 0.75), vec3(.8, .7, GLF_live16uv.x), GLF_live16stripe);
                                GLF_live16_GLF_color = vec4(GLF_live16col, 1.0);
                                ;
                            }
                        }
                        _GLF_color = GLF_dead0_GLF_color;
                    }
                } else {
                    if (_GLF_DEAD(false)) {
                        _GLF_color = GLF_dead0_GLF_color;
                        if (_GLF_DEAD(false)) {
                            _GLF_color = GLF_dead2gl_FragCoord;
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                if (donor_replacementGLF_dead2color.y < 0.0) {
                                    GLF_dead12b_b = -GLF_dead12b_b;
                                }
                            }
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            vec2 donor_replacementGLF_dead16v = _GLF_FUZZED(GLF_dead13injectionSwitch);
                            if (donor_replacementGLF_dead16v.y < 0.0) {
                                GLF_dead12s_g = -GLF_dead12s_g;
                            }
                        }
                    }
                    {
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            if (_GLF_DEAD(_GLF_IDENTITY(false, (false) && true))) {
                                vec2 donor_replacementGLF_dead19a = _GLF_FUZZED(exp2((bvec2(false, false).rrrr, resolution)));
                                float donor_replacementGLF_dead19z = _GLF_FUZZED(GLF_dead12b_b);
                                {
                                    donor_replacementGLF_dead19z = donor_replacementGLF_dead19a.x / donor_replacementGLF_dead19a.y;
                                }
                            }
                            _GLF_color = GLF_dead2gl_FragCoord;
                        }
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(-8.1, -20.80, 3.6, -2.6);
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            _GLF_color = GLF_dead14_GLF_color;
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                int donor_replacementGLF_dead17index = _GLF_FUZZED((GLF_dead13N - GLF_dead13N));
                                int donor_replacementGLF_dead17j = _GLF_FUZZED(((GLF_dead13N * donor_replacementGLF_dead2i)));
                                {
                                    donor_replacementGLF_dead17index = donor_replacementGLF_dead17j;
                                }
                            }
                        }
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    if (int(GLF_dead2gl_FragCoord[1]) < 270) {
                        donor_replacementGLF_dead2color = fract(_GLF_IDENTITY(sin(donor_replacementGLF_dead2vecCoor.yx - trunc(float(GLF_dead2data[7]))), mix(vec2((sin(donor_replacementGLF_dead2vecCoor.yx - trunc(float(GLF_dead2data[7]))))[0], (sin(donor_replacementGLF_dead2vecCoor.yx - trunc(float(GLF_dead2data[7]))))[1]), vec2(_GLF_FUZZED(-4.5), _GLF_FUZZED(-91.26)), bvec2(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)), false))));
                        donor_replacementGLF_dead2color.y *= mix(normalize(donor_replacementGLF_dead2vecCoor), normalize(vec3(donor_replacementGLF_dead2color, degrees(donor_replacementGLF_dead2color.x))), GLF_dead2injectionSwitch.x).y;
                        if (_GLF_DEAD(false)) {
                            {
                                if (_GLF_DEAD(false)) {
                                    float donor_replacementGLF_dead19z = _GLF_FUZZED(GLF_dead12b_b);
                                    {
                                        donor_replacementGLF_dead19z = donor_replacementGLF_dead2color.x / donor_replacementGLF_dead2color.y;
                                    }
                                }
                                {
                                    {
                                        ;
                                    }
                                }
                                ;
                            }
                        }
                        break;
                    } else {
                        discard;
                        if (_GLF_DEAD(false)) {
                            _GLF_color = GLF_dead0_GLF_color;
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = vec4(-4.7, 28.65, 1.0, 572.473);
                                if (_GLF_DEAD(false)) {
                                    {
                                        GLF_dead14_GLF_color = vec4(0.0, 0.0, 1.0, 1.0);
                                    }
                                }
                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                                {
                                    {
                                        ;
                                    }
                                }
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    _GLF_color = GLF_dead2gl_FragCoord;
                                }
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                    vec2 donor_replacementGLF_dead19a = _GLF_FUZZED(injectionSwitch);
                                    if (donor_replacementGLF_dead19a.y < donor_replacementGLF_dead19a.x) {
                                        GLF_dead12b_b = 0.5 - GLF_dead12b_b;
                                    }
                                }
                            }
                            if (_GLF_DEAD(false)) {
                                _GLF_color = _GLF_outlined_14(resolution);
                            }
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
                _GLF_color = _GLF_outlined_44(GLF_dead0_GLF_color);
            }
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(-0.3, 114.621, 7.9, 2224.0942);
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
        }
        if (_GLF_DEAD(false)) {
            if (_GLF_DEAD(false)) {
                vec2 donor_replacementGLF_dead19a = _GLF_FUZZED(vec2(-78.37, 2.0));
                float donor_replacementGLF_dead19z = _GLF_FUZZED(floor(GLF_dead12s_g));
                if (donor_replacementGLF_dead19a.y > donor_replacementGLF_dead19a.x) {
                    donor_replacementGLF_dead19z = donor_replacementGLF_dead19a.x / donor_replacementGLF_dead19a.y;
                } else {
                    donor_replacementGLF_dead19z = donor_replacementGLF_dead19a.y / donor_replacementGLF_dead19a.x;
                }
            }
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                if (_GLF_DEAD(false)) {
                    vec2 donor_replacementGLF_dead19a = _GLF_FUZZED(GLF_dead12resolution);
                    {
                        GLF_dead12s_g = donor_replacementGLF_dead19a.y / donor_replacementGLF_dead19a.x;
                    }
                }
                _GLF_color = atanh(vec4(-9777.2660, 5.6, 676.168, 3.2));
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            int donor_replacementGLF_dead13high = _GLF_FUZZED((bitCount(139875u) | ((-4437) + (-40141))));
            int donor_replacementGLF_dead13m = _GLF_FUZZED((i * (-40271)));
            {
                for (int GLF_dead13i = i; GLF_dead13i < donor_replacementGLF_dead13high; GLF_dead13i += 2 * donor_replacementGLF_dead13m) {
                    int GLF_dead13from = GLF_dead13i;
                    int GLF_dead13mid = GLF_dead13i + donor_replacementGLF_dead13m - 1;
                    if (_GLF_DEAD(false)) {
                        vec2 donor_replacementGLF_dead19v = _GLF_FUZZED(GLF_dead2injectionSwitch);
                        if (donor_replacementGLF_dead19v.x < 0.0) {
                            GLF_dead12b_b = 1.0 - GLF_dead12b_b;
                            {
                                int GLF_live18i = _GLF_FUZZED(ivec4(29191, -87754, -37978, -90320).p);
                                int GLF_live18iters = _GLF_FUZZED(40044);
                                int GLF_live18v = _GLF_FUZZED(int(true));
                                {
                                    int GLF_live18looplimiter0 = 0;
                                    for (GLF_live18i = 0; GLF_live18i < GLF_live18iters; GLF_live18i++) {
                                        if (GLF_live18looplimiter0 >= 5) {
                                            break;
                                        }
                                        GLF_live18looplimiter0++;
                                        {
                                            GLF_live18v = (4 * GLF_live18v * (1000 - GLF_live18v)) / 1000;
                                        }
                                    }
                                }
                            }
                        }
                    }
                    int GLF_dead13to = min(GLF_dead13i + 2 * donor_replacementGLF_dead13m - 1, donor_replacementGLF_dead13high);
                    {
                        {
                            vec2 GLF_live17pos = _GLF_FUZZED(vec2(-6.6, 7511.6146));
                            if (GLF_live17pointInTriangle(GLF_live17pos, vec2(0.7, 0.3), vec2(0.5, 0.9), vec2(0.1, 0.4)) == 1) {
                                GLF_live17_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
                            } else {
                                GLF_live17_GLF_color = vec4(0.0, 0.0, 0.0, 1.0);
                            }
                        }
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(1349.9322, -877.472, 99.18, acosh(8.6));
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)), false || (_GLF_IDENTITY(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)), (_GLF_TRUE(true, (gl_FragCoord.y >= 0.0))) || false))))) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    if (_GLF_DEAD(_GLF_IDENTITY(false, !(!(false))))) {
                        {
                            ;
                        }
                    }
                    GLF_dead13merge(GLF_dead13from, GLF_dead13mid, GLF_dead13to);
                }
            }
        }
        if (_GLF_DEAD(false)) {
            _GLF_color = _GLF_outlined_0(_GLF_color);
            if (_GLF_DEAD(false)) {
                vec2 donor_replacementGLF_dead19a = _GLF_FUZZED(GLF_dead12resolution);
                if (donor_replacementGLF_dead19a.y < donor_replacementGLF_dead19a.x) {
                    GLF_dead12b_b = 0.5 - GLF_dead12b_b;
                }
            }
            {
                int GLF_live7i = _GLF_FUZZED(94523);
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            _GLF_color = _GLF_outlined_45(GLF_dead13gl_FragCoord);
                        }
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(-6011.3657, -8.9, -0.6, 60.66);
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    {
                        {
                            ;
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        _GLF_color = GLF_dead14_GLF_color;
                    }
                    _GLF_color = dFdx(vec4(8.0, -9.0, 379.609, 2.9));
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < log(1.0))))) {
                            {
                                ;
                            }
                        }
                        if (_GLF_DEAD(_GLF_IDENTITY(false, true && (false)))) {
                            bool donor_replacementGLF_dead12c6 = _GLF_FUZZED((vec3(3.2, -314.377, -8.1) == vec3(-78.77, 4.2, 0.7)));
                            int donor_replacementGLF_dead12msb8 = _GLF_FUZZED(i);
                            vec2 donor_replacementGLF_dead12pos = _GLF_FUZZED(_GLF_IDENTITY((resolution / _GLF_IDENTITY(GLF_dead2injectionSwitch, min(GLF_dead2injectionSwitch, GLF_dead2injectionSwitch))), clamp(_GLF_IDENTITY((resolution / _GLF_IDENTITY(GLF_dead2injectionSwitch, min(GLF_dead2injectionSwitch, GLF_dead2injectionSwitch))), (false ? _GLF_FUZZED(GLF_dead2injectionSwitch) : (resolution / _GLF_IDENTITY(GLF_dead2injectionSwitch, min(GLF_dead2injectionSwitch, GLF_dead2injectionSwitch))))), (resolution / _GLF_IDENTITY(GLF_dead2injectionSwitch, min(GLF_dead2injectionSwitch, GLF_dead2injectionSwitch))), (resolution / _GLF_IDENTITY(GLF_dead2injectionSwitch, min(GLF_dead2injectionSwitch, GLF_dead2injectionSwitch))))));
                            vec3 donor_replacementGLF_dead12setting = _GLF_FUZZED(vec3(-93.15, 52.52, 6.5));
                            if (!donor_replacementGLF_dead12c6) {
                                ;
                            }
                        }
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                {
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        vec2 donor_replacementGLF_dead19a = _GLF_FUZZED(injectionSwitch);
                        if (donor_replacementGLF_dead19a.y > donor_replacementGLF_dead19a.x) {
                            GLF_dead12h_r = donor_replacementGLF_dead19a.x / donor_replacementGLF_dead19a.y;
                        } else {
                            GLF_dead12h_r = _GLF_outlined_46(donor_replacementGLF_dead19a);
                        }
                    }
                    int GLF_live11v = _GLF_FUZZED(int((false ? 165011u : 57152u)));
                    {
                        if (_GLF_DEAD(false)) {
                            vec2 donor_replacementGLF_dead16a = _GLF_FUZZED(injectionSwitch);
                            float donor_replacementGLF_dead16th = _GLF_FUZZED(80.01);
                            if (donor_replacementGLF_dead16a.y < donor_replacementGLF_dead16a.x) {
                                donor_replacementGLF_dead16th = 0.5 - donor_replacementGLF_dead16th;
                            }
                        }
                        GLF_live11v = (4 * GLF_live11v * (1000 - GLF_live11v)) / 1000;
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < _GLF_ZERO(0.0, injectionSwitch.x))))) {
                            vec2 donor_replacementGLF_dead16a = _GLF_FUZZED(injectionSwitch);
                            float donor_replacementGLF_dead16z = _GLF_FUZZED(GLF_dead12time);
                            if (donor_replacementGLF_dead16a.y > donor_replacementGLF_dead16a.x) {
                                donor_replacementGLF_dead16z = donor_replacementGLF_dead16a.x / donor_replacementGLF_dead16a.y;
                            } else {
                                donor_replacementGLF_dead16z = donor_replacementGLF_dead16a.y / donor_replacementGLF_dead16a.x;
                            }
                        }
                    }
                }
                if (_GLF_DEAD(false)) {
                    vec2 donor_replacementGLF_dead13color = _GLF_FUZZED(fwidthCoarse(GLF_dead2injectionSwitch));
                    if (_GLF_DEAD(false)) {
                        if (length(donor_replacementGLF_dead13color) < 0.001) {
                            ;
                        }
                    }
                    vec3 donor_replacementGLF_dead13vecCoor = _GLF_FUZZED(vec3(3.3, 213.406, -70.96));
                    if (int(GLF_dead13gl_FragCoord[1]) < 120) {
                        donor_replacementGLF_dead13color = fract(acosh(clamp(donor_replacementGLF_dead13vecCoor.yx - trunc(float(GLF_dead13data[3])), 1.0, 1000.0)));
                        donor_replacementGLF_dead13color.x += (isnan(GLF_dead13gl_FragCoord.x) ? log2(GLF_dead13gl_FragCoord.x) : log2(GLF_dead13gl_FragCoord.y));
                        break;
                    } else if (int(GLF_dead13gl_FragCoord[1]) < 150) {
                        discard;
                    } else if (int(GLF_dead13gl_FragCoord[1]) < 180) {
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            float donor_replacementGLF_dead16th = _GLF_FUZZED(cosh(GLF_dead12h_r));
                            if (donor_replacementGLF_dead13color.y < donor_replacementGLF_dead13color.x) {
                                donor_replacementGLF_dead16th = 0.5 - donor_replacementGLF_dead16th;
                            }
                        }
                        donor_replacementGLF_dead13color = fract(sin(_GLF_IDENTITY(donor_replacementGLF_dead13vecCoor.yx, vec2(1.0, 1.0) * (_GLF_IDENTITY(donor_replacementGLF_dead13vecCoor.yx, min(donor_replacementGLF_dead13vecCoor.yx, donor_replacementGLF_dead13vecCoor.yx)))) - trunc(float(GLF_dead13data[4]))));
                        if (_GLF_DEAD(false)) {
                            _GLF_color = GLF_dead14_GLF_color;
                        }
                        donor_replacementGLF_dead13color[1] += asinh(GLF_dead13gl_FragCoord.y * ldexp(donor_replacementGLF_dead13color.y, -GLF_live7i));
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            _GLF_color = (GLF_dead0_GLF_color - determinant(mat4(9.2, -30.17, -604.794, 834.327, -4.9, -9.6, -7395.6928, 1797.6732, -0.9, -3979.0958, -3.8, -7626.6602, 82.35, -0.6, 1.1, 5.0)));
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                            float donor_replacementGLF_dead16th = _GLF_FUZZED(refract(GLF_dead12s_g, GLF_dead12time, 99.13));
                            vec2 donor_replacementGLF_dead16v = _GLF_FUZZED(vec2(-74.72, -5.0));
                            if (donor_replacementGLF_dead16v.y < 0.0) {
                                donor_replacementGLF_dead16th = -donor_replacementGLF_dead16th;
                            }
                        }
                        break;
                    } else if (int(GLF_dead13gl_FragCoord[1]) < 210) {
                        donor_replacementGLF_dead13color = fract(sin(donor_replacementGLF_dead13vecCoor.yx - trunc(float(GLF_dead13data[5]))));
                        if (_GLF_DEAD(false)) {
                            _GLF_color = intBitsToFloat(ivec4(-1597, 47683, -96029, -48762));
                        }
                        donor_replacementGLF_dead13color.y -= tanh(donor_replacementGLF_dead13color.x) / cosh(donor_replacementGLF_dead13color.y);
                        {
                            int GLF_live19looplimiter1 = 0;
                            if (GLF_live19looplimiter1 >= 6) {
                                ;
                            }
                        }
                        break;
                    } else if (int(GLF_dead13gl_FragCoord[1]) < 240) {
                        {
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                vec2 donor_replacementGLF_dead16a = _GLF_FUZZED(mat3x2(890.957, 15.45, -31.05, -3.4, 3946.6225, -29.64)[1]);
                                float donor_replacementGLF_dead16th = _GLF_FUZZED(GLF_dead12s_g);
                                if (donor_replacementGLF_dead16a.y < donor_replacementGLF_dead16a.x) {
                                    donor_replacementGLF_dead16th = 0.5 - donor_replacementGLF_dead16th;
                                }
                            }
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = mat2x4(5601.9598, 135.334, 842.284, 5.8, 2352.3230, 6102.9012, -8.5, 2.9)[0];
                            if (_GLF_DEAD(false)) {
                                float donor_replacementGLF_dead19th = _GLF_FUZZED(fma(fwidthFine(vec3(7767.0996, -9.1, -81.99))[1], GLF_dead12s_g, GLF_dead12time));
                                if (donor_replacementGLF_dead13color.x < 0.0) {
                                    donor_replacementGLF_dead19th = 1.0 - donor_replacementGLF_dead19th;
                                }
                            }
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= sin(0.0))))) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    vec2 donor_replacementGLF_dead19v = _GLF_FUZZED(trunc(donor_replacementGLF_dead13color));
                                    if (donor_replacementGLF_dead19v.x < 0.0) {
                                        GLF_dead12s_g = 1.0 - GLF_dead12s_g;
                                    }
                                }
                            }
                        }
                        donor_replacementGLF_dead13color = fract(asinh(donor_replacementGLF_dead13vecCoor.yx - trunc(_GLF_IDENTITY(float(GLF_dead13data[6]), mix(float(_GLF_FUZZED(-254.025)), float(float(GLF_dead13data[6])), bool(true))))));
                        donor_replacementGLF_dead13color.y -= isnan(float(GLF_live7i)) ? tanh(GLF_dead13gl_FragCoord.x) : atanh(GLF_dead13gl_FragCoord.y);
                        break;
                    } else if (int(GLF_dead13gl_FragCoord[1]) < 270) {
                        if (_GLF_DEAD(false)) {
                            vec2 donor_replacementGLF_dead19a = _GLF_FUZZED(dFdyCoarse(GLF_dead2injectionSwitch));
                            if (donor_replacementGLF_dead19a.y > donor_replacementGLF_dead19a.x) {
                                GLF_dead12b_b = _GLF_outlined_47(donor_replacementGLF_dead19a);
                            } else {
                                GLF_dead12b_b = donor_replacementGLF_dead19a.y / donor_replacementGLF_dead19a.x;
                            }
                        }
                        donor_replacementGLF_dead13color = fract(sin(donor_replacementGLF_dead13vecCoor.yx - trunc(float(GLF_dead13data[7]))));
                        if (_GLF_DEAD(false)) {
                            {
                                {
                                    vec3 GLF_live16col = _GLF_FUZZED((-vec3(-0.3, 99.81, -0.9)));
                                    vec2 GLF_live16uv = _GLF_FUZZED(vec2(vec4(68.80, 0.6, 739.576, -0.0)));
                                    {
                                        float GLF_live16stripe = GLF_live16compute_stripe(tan((GLF_live16uv.x + GLF_live16uv.y) * 20.0));
                                        GLF_live16col = mix(vec3(0.5, GLF_live16uv.x, 0.1), vec3(.4, 0, .5), GLF_live16stripe);
                                        GLF_live16_GLF_color = vec4(GLF_live16col, 1.0);
                                        ;
                                    }
                                }
                                ;
                            }
                        }
                        donor_replacementGLF_dead13color.y *= mix(normalize(donor_replacementGLF_dead13vecCoor), normalize(vec3(donor_replacementGLF_dead13color, degrees(donor_replacementGLF_dead13color.x))), GLF_dead13injectionSwitch.x).y;
                        break;
                    } else {
                        discard;
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        vec2 donor_replacementGLF_dead19v = _GLF_FUZZED(injectionSwitch);
                        if (length(donor_replacementGLF_dead19v) < 0.001) {
                            ;
                        }
                    }
                }
                vec4 GLF_live7res = _GLF_FUZZED((vec4(-5471.3232, 969.575, -719.634, -867.552) + 5790.6911));
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    int donor_replacementGLF_dead14baseIndex = _GLF_FUZZED(GLF_live7i);
                    if (_GLF_DEAD(false)) {
                        _GLF_color = exp(GLF_dead15_GLF_color);
                    }
                    {
                        donor_replacementGLF_dead14baseIndex = GLF_dead14tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead14baseIndex, 10)].leftIndex;
                        continue;
                    }
                }
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = mix(faceforward(vec4(-8.9, 6.4, -2.5, 5032.2404), vec4(-5975.5315, 8734.2717, 30.81, -3.7), vec4(4.8, -1029.3433, -3137.3348, -8120.1795)), vec4(-2.1, -8.1, 1.4, 4.5), 6.6);
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                            vec2 donor_replacementGLF_dead16a = _GLF_FUZZED(refract(GLF_dead2injectionSwitch, injectionSwitch, 6.5));
                            if (donor_replacementGLF_dead16a.y < donor_replacementGLF_dead16a.x) {
                                GLF_dead12s_g = 0.5 - GLF_dead12s_g;
                            }
                        }
                        if (_GLF_DEAD(false)) {
                            _GLF_color = vec4(GLF_dead12time, GLF_dead12b_b, resolution);
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                {
                                    ;
                                }
                            }
                        }
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                            vec2 donor_replacementGLF_dead16v = _GLF_FUZZED(GLF_dead13injectionSwitch);
                            if (donor_replacementGLF_dead16v.y < 0.0) {
                                GLF_dead12b_b = -GLF_dead12b_b;
                            }
                        }
                    }
                    GLF_live7res = GLF_live7pal[_GLF_MAKE_IN_BOUNDS_INT((int(GLF_live7picdata[_GLF_MAKE_IN_BOUNDS_INT(GLF_live7i, 8)].x) * int(GLF_live7picdata[_GLF_MAKE_IN_BOUNDS_INT(GLF_live7i, 8)].y) + GLF_live7i * 9 + 11) % 16, 16)];
                } else {
                    if (_GLF_DEAD(false)) {
                        {
                            int GLF_live18i = _GLF_FUZZED(((-97817) ^ (-28502)));
                            int GLF_live18iters = _GLF_FUZZED(54664);
                            int GLF_live18looplimiter0 = 0;
                            int GLF_live18v = _GLF_FUZZED(-85340);
                            for (GLF_live18i = 0; GLF_live18i < GLF_live18iters; GLF_live18i++) {
                                if (GLF_live18looplimiter0 >= 5) {
                                    break;
                                }
                                GLF_live18looplimiter0++;
                                {
                                    GLF_live18v = (4 * GLF_live18v * (1000 - GLF_live18v)) / 1000;
                                }
                            }
                        }
                        vec2 donor_replacementGLF_dead19v = _GLF_FUZZED((+injectionSwitch));
                        if (length(donor_replacementGLF_dead19v) < 0.001) {
                            ;
                        }
                    }
                }
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_IDENTITY(_GLF_color = fma(cos(abs(vec4(-6.6, -35.94, 3.6, -649.116))), vec4(46.70, -8708.6516, 438.346, -1.4), sqrt(vec4(6.8, 93.95, -487.945, 122.020))), (_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)) ? (_GLF_color = fma(cos(abs(vec4(-6.6, -35.94, 3.6, -649.116))), vec4(46.70, -8708.6516, 438.346, -1.4), sqrt(vec4(6.8, 93.95, -487.945, 122.020)))) : _GLF_FUZZED(GLF_live9_GLF_color)));
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
            }
            {
                vec4 _GLF_outVarBackup_GLF_color;
                if (_GLF_DEAD(false)) {
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        vec2 donor_replacementGLF_dead12center = _GLF_FUZZED((step(9.0, vec2(1.1, 578.371))));
                        vec2 donor_replacementGLF_dead12position = _GLF_FUZZED((injectionSwitch * resolution));
                        vec3 donor_replacementGLF_dead12result = _GLF_FUZZED(refract(vec3(8.5, 4.1, -1.9), clamp(vec3(9646.6023, -2.8, 74.50), vec3(-78.57, -6.6, -8.7), vec3(-7.8, 4.3, 9.6)), 9.4));
                        for (int GLF_dead12i = bitfieldInsert(35, 0, 0, bitfieldExtract(int(GLF_dead12resolution.x), 0, 0)); GLF_dead12i >= bitfieldReverse(bitfieldExtract(int(GLF_dead12resolution.x), 0, 0)); GLF_dead12i--) {
                            vec3 GLF_dead12d = _GLF_FUZZED(dFdxFine(vec3(-7.1, 1752.1157, 7.6)));
                            GLF_dead12d = GLF_dead12drawShape(donor_replacementGLF_dead12position, donor_replacementGLF_dead12center + vec2(_GLF_IDENTITY(sin(float(GLF_dead12i) / (float(bitCount(i)) * 10.0) + GLF_dead12time), mix(float(_GLF_FUZZED(-1740.4432)), float(sin(float(GLF_dead12i) / (float(bitCount(i)) * 10.0) + GLF_dead12time)), bool(_GLF_IDENTITY(true, bool(bvec4(true, false, false, true)))))) / 4.0 * float(bitCount(i)), float(bitfieldExtract(int(GLF_dead12resolution.x), 0, 0))), vec3(0.01 + sin(float(GLF_dead12i) / 100.0 * float(bitCount(i))), 0.01, float(GLF_dead12i)));
                            if (length(GLF_dead12d) <= float(bitfieldExtract(int(GLF_dead12resolution.x), _GLF_IDENTITY(0, _GLF_IDENTITY(int(ivec2(0, 0)), (false ? _GLF_FUZZED(78035) : int(ivec2(0, 0))))), 0))) {
                                continue;
                            }
                            donor_replacementGLF_dead12result = vec3(GLF_dead12d);
                        }
                    }
                    int donor_replacementGLF_dead9i = _GLF_FUZZED(i);
                    float donor_replacementGLF_dead9limit = _GLF_FUZZED(((-69.78) / 1.3));
                    float donor_replacementGLF_dead9ref = _GLF_FUZZED(sinh(5.0));
                    float donor_replacementGLF_dead9s = _GLF_FUZZED(-440.019);
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        bool donor_replacementGLF_dead12c2 = _GLF_FUZZED(any(bvec4(true, true, true, true)));
                        if (!donor_replacementGLF_dead12c2) {
                            ;
                        }
                    }
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < sqrt(0.0))))) {
                            int donor_replacementGLF_dead14count = _GLF_FUZZED(findMSB(i));
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                float donor_replacementGLF_dead16th = _GLF_FUZZED(acosh(donor_replacementGLF_dead9s));
                                {
                                    donor_replacementGLF_dead16th = -donor_replacementGLF_dead16th;
                                }
                            }
                            int donor_replacementGLF_dead14i = _GLF_FUZZED(donor_replacementGLF_dead9i);
                            {
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = vec4(-253.889, 835.413, -3184.0197, 952.372);
                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                                int GLF_dead14result = GLF_dead14search(donor_replacementGLF_dead14i);
                                switch (donor_replacementGLF_dead14i) {
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
                                        if (GLF_dead14result == donor_replacementGLF_dead14i) {
                                            if (_GLF_DEAD(false)) {
                                                _GLF_color = GLF_dead14_GLF_color;
                                            }
                                            donor_replacementGLF_dead14count++;
                                        }
                                        break;
                                    default:
                                        if (GLF_dead14result == -1) {
                                            donor_replacementGLF_dead14count++;
                                        }
                                        break;
                                }
                            }
                        }
                        if (_GLF_DEAD(_GLF_IDENTITY(false, !(!(false))))) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = _GLF_outlined_48();
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    {
                        if (mod(float(donor_replacementGLF_dead9i), donor_replacementGLF_dead9ref) <= 0.01) {
                            donor_replacementGLF_dead9s += 0.2;
                        }
                        {
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_IDENTITY(0.0, max(0.0, 0.0)))))) {
                                int donor_replacementGLF_dead12msb8 = _GLF_FUZZED(donor_replacementGLF_dead9i);
                                vec2 donor_replacementGLF_dead12position = _GLF_FUZZED((injectionSwitch * donor_replacementGLF_dead9s));
                                if (abs(donor_replacementGLF_dead12position.y - donor_replacementGLF_dead12position.x) < 0.5) {
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = fwidthCoarse(GLF_dead2gl_FragCoord);
                                    }
                                    GLF_dead12b_b = clamp(float(bitfieldExtract(int(GLF_dead12resolution.x), 0, 0)), float(bitCount(donor_replacementGLF_dead12msb8)), GLF_dead12b_b * float(bitCount(donor_replacementGLF_dead12msb8)) * 3.0);
                                }
                            }
                            vec2 GLF_live9coord = _GLF_FUZZED((true ? vec2(4.7, 45.50) : vec2(-9.9, 8159.7053)));
                            if (GLF_live9coord.y < 0.6) {
                                uvec2 GLF_live9icoord = uvec2(((GLF_live9coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                                uint GLF_live9res1 = uint(((GLF_live9icoord.x * GLF_live9icoord.y) >> (GLF_live9icoord.x & 31u)) & 0xffffffffu);
                                uint GLF_live9res2 = uint(((GLF_live9icoord.x * GLF_live9icoord.y) << (GLF_live9icoord.x & 31u)) & 0xffffffffu);
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = vec4(975.359, 783.803, -6582.7784, 843.963);
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                                float GLF_live9res = float((_GLF_IDENTITY((GLF_live9res2 & 0x80000000u) != 0u, true && ((GLF_live9res2 & 0x80000000u) != 0u)) ? 1u : 0u) ^ ((GLF_live9res1 & 1u) != 0u ? 1u : 0u));
                                GLF_live9_GLF_color = vec4(GLF_live9res, GLF_live9res, GLF_live9res, 1.0);
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                    vec2 donor_replacementGLF_dead19a = _GLF_FUZZED(resolution);
                                    float donor_replacementGLF_dead19z = _GLF_FUZZED(-709.865);
                                    {
                                        donor_replacementGLF_dead19z = donor_replacementGLF_dead19a.y / donor_replacementGLF_dead19a.x;
                                    }
                                }
                            } else {
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                    {
                                        if (_GLF_DEAD(false)) {
                                            {
                                                ;
                                            }
                                        }
                                        {
                                            vec4 _GLF_outVarBackup_GLF_color;
                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                            _GLF_color = (mat2x4(0.1, 6.3, -5.0, -7205.4180, -96.41, 78.33, 8.7, -5047.4549) * vec2(5989.7183, -150.979));
                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                _GLF_color = _GLF_outlined_49(_GLF_outVarBackup_GLF_color);
                                            }
                                        }
                                        switch (donor_replacementGLF_dead9i) {
                                            case 0:
                                                GLF_dead13data[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9i, 10)] = 4;
                                                if (_GLF_DEAD(false)) {
                                                    {
                                                        GLF_dead12h_r = 0.5 - GLF_dead12h_r;
                                                    }
                                                }
                                                break;
                                            case 1:
                                                GLF_dead13data[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9i, 10)] = 3;
                                                break;
                                            case 2:
                                                GLF_dead13data[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9i, 10)] = 2;
                                                break;
                                            case 3:
                                                GLF_dead13data[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9i, 10)] = 1;
                                                break;
                                            case 4:
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < length(vec2(0.0, 0.0)))))) {
                                                    float donor_replacementGLF_dead16th = _GLF_FUZZED(dFdy(donor_replacementGLF_dead9limit));
                                                    {
                                                        donor_replacementGLF_dead16th = -donor_replacementGLF_dead16th;
                                                    }
                                                }
                                                GLF_dead13data[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9i, 10)] = 0;
                                                if (_GLF_DEAD(false)) {
                                                    float donor_replacementGLF_dead19th = _GLF_FUZZED(acos(sinh(distance(GLF_dead13injectionSwitch, GLF_dead2injectionSwitch))));
                                                    vec2 donor_replacementGLF_dead19v = _GLF_FUZZED(GLF_dead13gl_FragCoord.ag);
                                                    if (donor_replacementGLF_dead19v.x < 0.0) {
                                                        donor_replacementGLF_dead19th = 1.0 - donor_replacementGLF_dead19th;
                                                    }
                                                }
                                                break;
                                            case 5:
                                                GLF_dead13data[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9i, 10)] = -1;
                                                if (_GLF_DEAD(false)) {
                                                    _GLF_color = fwidth(GLF_live9_GLF_color);
                                                }
                                                break;
                                            case 6:
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                    float donor_replacementGLF_dead19th = _GLF_FUZZED(_GLF_outVarBackup_GLF_color[0]);
                                                    if (GLF_live9coord.y < 0.0) {
                                                        donor_replacementGLF_dead19th = _GLF_outlined_50(donor_replacementGLF_dead19th);
                                                    }
                                                }
                                                GLF_dead13data[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9i, 10)] = -2;
                                                if (_GLF_DEAD(false)) {
                                                    _GLF_color = _GLF_color;
                                                }
                                                break;
                                            case 7:
                                                GLF_dead13data[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9i, 10)] = -3;
                                                break;
                                                if (_GLF_DEAD(false)) {
                                                    vec2 donor_replacementGLF_dead19v = _GLF_FUZZED(trunc(resolution));
                                                    if (donor_replacementGLF_dead19v.x < 0.0) {
                                                        donor_replacementGLF_dead9ref = 1.0 - donor_replacementGLF_dead9ref;
                                                    }
                                                }
                                            case 8:
                                                GLF_dead13data[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9i, 10)] = -4;
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_IDENTITY(dot(vec4(0.0, 1.0, 1.0, 0.0), vec4(1.0, 0.0, 0.0, 1.0)), dot(vec4(0.0, 1.0, 1.0, 0.0), vec4(1.0, 0.0, 0.0, 1.0))))))) {
                                                    vec2 donor_replacementGLF_dead16a = _GLF_FUZZED(vec2(-97.26, 805.213));
                                                    if (donor_replacementGLF_dead16a.y > donor_replacementGLF_dead16a.x) {
                                                        donor_replacementGLF_dead9limit = donor_replacementGLF_dead16a.x / donor_replacementGLF_dead16a.y;
                                                    } else {
                                                        donor_replacementGLF_dead9limit = donor_replacementGLF_dead16a.y / donor_replacementGLF_dead16a.x;
                                                    }
                                                }
                                                break;
                                            case 9:
                                                GLF_dead13data[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9i, 10)] = -5;
                                                break;
                                        }
                                        donor_replacementGLF_dead9i++;
                                    }
                                    {
                                        int GLF_live18looplimiter0 = 0;
                                        if (GLF_live18looplimiter0 >= 5) {
                                            ;
                                        }
                                    }
                                }
                                ivec2 GLF_live9icoord = ivec2(((GLF_live9coord - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                                int GLF_live9res3 = ((GLF_live9icoord.x >> 5) & 1) ^ ((GLF_live9icoord.y & 32) >> 5);
                                int GLF_live9res2 = (GLF_live9icoord.y * GLF_live9icoord.y >> 10) & 1;
                                int GLF_live9res1 = (GLF_live9icoord.x * GLF_live9icoord.y >> 9) & 1;
                                GLF_live9_GLF_color = vec4(float(GLF_live9res1 ^ GLF_live9res2), float(GLF_live9res2 & GLF_live9res3), float(GLF_live9res1 | GLF_live9res3), 1.0);
                            }
                        }
                        if (float(donor_replacementGLF_dead9i) >= donor_replacementGLF_dead9limit) {
                            if (_GLF_DEAD(false)) {
                                _GLF_color = (11.92 / vec4(92.10, -8058.9118, 751.734, 1.0));
                            }
                            ;
                        }
                        if (_GLF_DEAD(false)) {
                            vec3 donor_replacementGLF_dead12d = _GLF_FUZZED(vec3(545.691, 9.2, 509.412));
                            if (length(donor_replacementGLF_dead12d) <= float(bitfieldExtract(int(GLF_dead12resolution.x), 0, 0))) {
                                continue;
                            }
                        }
                        donor_replacementGLF_dead9i++;
                    }
                    if (_GLF_DEAD(false)) {
                        _GLF_color = _GLF_outlined_15(_GLF_outVarBackup_GLF_color);
                    }
                }
                _GLF_outVarBackup_GLF_color = _GLF_color;
                if (_GLF_DEAD(false)) {
                    _GLF_color = GLF_dead0_GLF_color;
                }
                if (_GLF_DEAD(false)) {
                    vec2 donor_replacementGLF_dead13color = _GLF_FUZZED(vec2(17.59, 7.7));
                    vec3 donor_replacementGLF_dead13vecCoor = _GLF_FUZZED(inversesqrt(vec3(-6.0, 3712.5575, 8.5)));
                    do {
                        if (int(GLF_dead13gl_FragCoord[1]) < 30) {
                            donor_replacementGLF_dead13color = fract(sin(donor_replacementGLF_dead13vecCoor.yx - trunc(float(GLF_dead13data[0]))));
                            donor_replacementGLF_dead13color[0] = dFdy(GLF_dead13gl_FragCoord.y);
                            break;
                        } else if (int(GLF_dead13gl_FragCoord[1]) < 60) {
                            donor_replacementGLF_dead13color = fract(sin(donor_replacementGLF_dead13vecCoor.yx - trunc(float(GLF_dead13data[1]))));
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                _GLF_color = GLF_dead15_GLF_color;
                            }
                            donor_replacementGLF_dead13color[1] *= atan(faceforward(GLF_dead13injectionSwitch, donor_replacementGLF_dead13color.xx, donor_replacementGLF_dead13vecCoor.yx).y);
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                _GLF_color = vec4(GLF_dead12b_b);
                            }
                            break;
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                _GLF_color = min(dFdy(GLF_dead0_GLF_color), vec4(5.7, 107.914, 530.250, 3619.0824));
                            }
                        } else if (int(GLF_dead13gl_FragCoord[1]) < 90) {
                            donor_replacementGLF_dead13color = fract(sin(donor_replacementGLF_dead13vecCoor.yx - trunc(float(GLF_dead13data[2]))));
                            donor_replacementGLF_dead13color.x += atanh(donor_replacementGLF_dead13color.x) * cosh(GLF_dead13injectionSwitch.y) * smoothstep(donor_replacementGLF_dead13color, GLF_dead13injectionSwitch, GLF_dead13gl_FragCoord.yy).x;
                            break;
                        } else if (int(GLF_dead13gl_FragCoord[1]) < 120) {
                            donor_replacementGLF_dead13color = fract(acosh(clamp(donor_replacementGLF_dead13vecCoor.yx - trunc(float(GLF_dead13data[3])), 1.0, 1000.0)));
                            donor_replacementGLF_dead13color.x += (isnan(GLF_dead13gl_FragCoord.x) ? log2(GLF_dead13gl_FragCoord.x) : log2(GLF_dead13gl_FragCoord.y));
                            break;
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                _GLF_color = GLF_dead2gl_FragCoord;
                            }
                        } else {
                            if (_GLF_DEAD(false)) {
                                _GLF_color = sin(vec2(-9.7, -146.074).grrr);
                            }
                            if (int(GLF_dead13gl_FragCoord[1]) < 150) {
                                discard;
                            } else {
                                {
                                    vec3 GLF_live16col = _GLF_FUZZED(vec3(-5379.1491, -769.816, 43.11));
                                    vec2 GLF_live16uv = _GLF_FUZZED((vec2(-82.91, 2174.4301) + 7738.1429));
                                    {
                                        float GLF_live16stripe = GLF_live16compute_stripe(cos((GLF_live16uv.x + GLF_live16uv.y) * 20.0));
                                        GLF_live16col = mix(vec3(.7, sinh(GLF_live16uv.x), GLF_live16uv.x), vec3(.3, .5, GLF_live16uv.x), GLF_live16stripe);
                                        GLF_live16_GLF_color = vec4(GLF_live16col, 1.0);
                                        ;
                                    }
                                }
                                if (int(GLF_dead13gl_FragCoord[1]) < 180) {
                                    donor_replacementGLF_dead13color = fract(sin(donor_replacementGLF_dead13vecCoor.yx - trunc(float(GLF_dead13data[4]))));
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                        {
                                            GLF_dead12b_b = 0.5 - GLF_dead12b_b;
                                        }
                                    }
                                    donor_replacementGLF_dead13color[1] += asinh(GLF_dead13gl_FragCoord.y * ldexp(donor_replacementGLF_dead13color.y, -i));
                                    break;
                                } else if (int(GLF_dead13gl_FragCoord[1]) < 210) {
                                    donor_replacementGLF_dead13color = fract(sin(donor_replacementGLF_dead13vecCoor.yx - trunc(float(GLF_dead13data[5]))));
                                    donor_replacementGLF_dead13color.y -= tanh(donor_replacementGLF_dead13color.x) / cosh(donor_replacementGLF_dead13color.y);
                                    break;
                                } else if (int(_GLF_IDENTITY(GLF_dead13gl_FragCoord[1], (GLF_dead13gl_FragCoord[1]) - _GLF_IDENTITY(dot(vec4(1.0, 0.0, 1.0, 1.0), vec4(0.0, 1.0, _GLF_IDENTITY(dot(vec2(1.0, 0.0), vec2(0.0, 1.0)), dot(vec2(1.0, 0.0), vec2(0.0, 1.0))), abs(0.0))), dot(vec4(1.0, 0.0, 1.0, 1.0), vec4(0.0, 1.0, _GLF_IDENTITY(dot(vec2(1.0, 0.0), vec2(0.0, 1.0)), dot(vec2(1.0, 0.0), vec2(0.0, 1.0))), abs(0.0)))))) < 240) {
                                    donor_replacementGLF_dead13color = fract(asinh(donor_replacementGLF_dead13vecCoor.yx - trunc(float(GLF_dead13data[6]))));
                                    donor_replacementGLF_dead13color.y -= isnan(float(i)) ? tanh(GLF_dead13gl_FragCoord.x) : atanh(GLF_dead13gl_FragCoord.y);
                                    break;
                                } else if (int(GLF_dead13gl_FragCoord[1]) < 270) {
                                    donor_replacementGLF_dead13color = fract(sin(donor_replacementGLF_dead13vecCoor.yx - trunc(float(GLF_dead13data[7]))));
                                    donor_replacementGLF_dead13color.y *= mix(normalize(donor_replacementGLF_dead13vecCoor), normalize(vec3(donor_replacementGLF_dead13color, degrees(donor_replacementGLF_dead13color.x))), GLF_dead13injectionSwitch.x).y;
                                    break;
                                } else {
                                    discard;
                                }
                            }
                        }
                    } while (0 == int(GLF_dead13injectionSwitch.x));
                }
                {
                    if (_GLF_DEAD(false)) {
                        vec2 donor_replacementGLF_dead19a = _GLF_FUZZED(exp(asinh(resolution)));
                        float donor_replacementGLF_dead19z = _GLF_FUZZED(normalize(GLF_dead12b_b));
                        if (donor_replacementGLF_dead19a.y > donor_replacementGLF_dead19a.x) {
                            donor_replacementGLF_dead19z = donor_replacementGLF_dead19a.x / donor_replacementGLF_dead19a.y;
                        } else {
                            donor_replacementGLF_dead19z = donor_replacementGLF_dead19a.y / donor_replacementGLF_dead19a.x;
                        }
                    }
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    if (_GLF_DEAD(false)) {
                        float donor_replacementGLF_dead19th = _GLF_FUZZED(exp2(GLF_dead12b_b));
                        vec2 donor_replacementGLF_dead19v = _GLF_FUZZED(injectionSwitch);
                        if (donor_replacementGLF_dead19v.x < 0.0) {
                            donor_replacementGLF_dead19th = 1.0 - donor_replacementGLF_dead19th;
                        }
                    }
                    _GLF_color = _GLF_outlined_4();
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        vec2 donor_replacementGLF_dead16a = _GLF_FUZZED(GLF_dead12resolution);
                        if (donor_replacementGLF_dead16a.y > donor_replacementGLF_dead16a.x) {
                            GLF_dead12h_r = _GLF_outlined_51(donor_replacementGLF_dead16a);
                        } else {
                            {
                                int GLF_live18looplimiter0 = 0;
                                int GLF_live18v = _GLF_FUZZED(22839);
                                {
                                    if (GLF_live18looplimiter0 >= 5) {
                                        ;
                                    }
                                    GLF_live18looplimiter0++;
                                    {
                                        GLF_live18v = (4 * GLF_live18v * (1000 - GLF_live18v)) / 1000;
                                    }
                                }
                            }
                            GLF_dead12h_r = donor_replacementGLF_dead16a.y / donor_replacementGLF_dead16a.x;
                        }
                    }
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            if (_GLF_DEAD(false)) {
                                _GLF_color = GLF_dead13gl_FragCoord;
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                _GLF_color = vec4(-911.425, vec2(-2290.1404, 5.6), -5739.3298);
                            }
                            _GLF_color = _GLF_color;
                            if (_GLF_DEAD(false)) {
                                _GLF_color = GLF_dead0_GLF_color;
                            }
                        }
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        _GLF_color = vec3(8117.6162, 97.65, -2820.8488).bbbb;
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        _GLF_color = atanh(GLF_dead15_GLF_color);
                    }
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    {
                        int GLF_live18i = _GLF_FUZZED(91252);
                        int GLF_live18iters = _GLF_FUZZED(32998);
                        int GLF_live18v = _GLF_FUZZED(97094);
                        {
                            int GLF_live18looplimiter0 = 0;
                            for (GLF_live18i = 0; GLF_live18i < GLF_live18iters; GLF_live18i++) {
                                if (GLF_live18looplimiter0 >= 5) {
                                    break;
                                }
                                GLF_live18looplimiter0++;
                                {
                                    GLF_live18v = (4 * GLF_live18v * (1000 - GLF_live18v)) / 1000;
                                }
                            }
                        }
                    }
                    {
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                            _GLF_color = GLF_dead15_GLF_color;
                            if (_GLF_DEAD(false)) {
                                {
                                    ;
                                }
                            }
                        }
                        GLF_dead13data[_GLF_MAKE_IN_BOUNDS_INT(i, 10)] = GLF_dead13temp[_GLF_MAKE_IN_BOUNDS_INT(i, 10)];
                    }
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    vec2 donor_replacementGLF_dead19a = _GLF_FUZZED((mat4x3(45.64, 33.88, 5.6, -798.063, -63.79, -7236.4707, 38.74, -8.4, 18.51, -8.2, -5272.3485, 7.3), resolution));
                    if (donor_replacementGLF_dead19a.y > donor_replacementGLF_dead19a.x) {
                        GLF_dead12b_b = donor_replacementGLF_dead19a.x / donor_replacementGLF_dead19a.y;
                    } else {
                        GLF_dead12b_b = donor_replacementGLF_dead19a.y / donor_replacementGLF_dead19a.x;
                    }
                }
                _GLF_color = vec4(-8965.2775, -3077.5440, -93.71, -4.5);
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                    if (_GLF_WRAPPED_IF_FALSE(false)) {
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < _GLF_IDENTITY(dot(vec4(1.0, 0.0, 1.0, 0.0), vec4(0.0, 1.0, 0.0, 1.0)), dot(vec4(1.0, 0.0, 1.0, 0.0), vec4(0.0, 1.0, 0.0, 1.0))))))) {
                            float donor_replacementGLF_dead19th = _GLF_FUZZED(GLF_dead12time);
                            {
                                donor_replacementGLF_dead19th = 1.0 - donor_replacementGLF_dead19th;
                            }
                        }
                    } else {
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            do {
                                _GLF_color = GLF_dead2gl_FragCoord;
                            } while (_GLF_WRAPPED_LOOP(_GLF_IDENTITY(false, false || (false))));
                        }
                    }
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < sqrt(0.0))))) {
                        _GLF_color = asin(_GLF_outVarBackup_GLF_color);
                    }
                    if (_GLF_DEAD(false)) {
                        if (_GLF_DEAD(false)) {
                            vec2 donor_replacementGLF_dead19a = _GLF_FUZZED(abs(max(GLF_dead2injectionSwitch, GLF_dead12time)));
                            float donor_replacementGLF_dead19z = _GLF_FUZZED(GLF_dead12b_b);
                            {
                                donor_replacementGLF_dead19z = donor_replacementGLF_dead19a.x / donor_replacementGLF_dead19a.y;
                            }
                        }
                        {
                            {
                                ;
                            }
                        }
                        _GLF_color = GLF_dead0_GLF_color;
                        if (_GLF_DEAD(false)) {
                            float donor_replacementGLF_dead19th = _GLF_FUZZED(faceforward(GLF_dead12time, round(GLF_dead12s_g), GLF_dead12b_b));
                            {
                                donor_replacementGLF_dead19th = 0.5 - donor_replacementGLF_dead19th;
                            }
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        {
                            GLF_dead12h_r = 1.0 - GLF_dead12h_r;
                        }
                    }
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    if (_GLF_DEAD(false)) {
                        {
                            ;
                        }
                    }
                    _GLF_color = GLF_dead0_GLF_color;
                }
                if (_GLF_DEAD(false)) {
                    vec2 donor_replacementGLF_dead19a = _GLF_FUZZED(GLF_dead12resolution);
                    float donor_replacementGLF_dead19z = _GLF_FUZZED(GLF_dead12time);
                    {
                        donor_replacementGLF_dead19z = donor_replacementGLF_dead19a.y / donor_replacementGLF_dead19a.x;
                    }
                }
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    if (_GLF_DEAD(false)) {
                        _GLF_color = vec4(-29.33, -4370.9683, 5.0, -88.35);
                    }
                    _GLF_outVarBackup_GLF_color = _GLF_outlined_52(_GLF_color);
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        _GLF_color = _GLF_color;
                        if (_GLF_DEAD(false)) {
                            vec2 donor_replacementGLF_dead19v = _GLF_FUZZED(injectionSwitch.ss);
                            if (length(donor_replacementGLF_dead19v) < 0.001) {
                                ;
                            }
                        }
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        _GLF_color = GLF_dead14_GLF_color;
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        int donor_replacementGLF_dead13to = _GLF_FUZZED(1246);
                        for (int GLF_dead13i = i; GLF_dead13i <= donor_replacementGLF_dead13to; GLF_dead13i++) {
                            GLF_dead13data[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13i, 10)] = GLF_dead13temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13i, 10)];
                            if (_GLF_DEAD(_GLF_IDENTITY(false, !(!(false))))) {
                                _GLF_color = acos(vec3(250.659, -81.01, 3.0).zyzx);
                            }
                        }
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < sin(0.0))))) {
                        _GLF_color = vec4(997.242, 46.24, -60.11, -90.21);
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            vec2 donor_replacementGLF_dead19a = _GLF_FUZZED(mod(GLF_dead12resolution, GLF_dead12s_g));
                            {
                                {
                                    float GLF_live17pab = _GLF_FUZZED(911.142);
                                    float GLF_live17pbc = _GLF_FUZZED((2.2 * (-27.98)));
                                    if (!((GLF_live17pab < 0.0 && GLF_live17pbc < 0.0) || (GLF_live17pab >= 0.0 && GLF_live17pbc >= 0.0))) {
                                        ;
                                    }
                                }
                                GLF_dead12h_r = donor_replacementGLF_dead19a.y / donor_replacementGLF_dead19a.x;
                            }
                        }
                    }
                    _GLF_color = vec4(87.00, 5.8, -758.610, -3239.4344);
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                if (_GLF_DEAD(false)) {
                    _GLF_color = GLF_dead0_GLF_color;
                }
            }
        }
        if (_GLF_DEAD(false)) {
            {
                GLF_dead15_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
            }
        }
        if (_GLF_DEAD(false)) {
            _GLF_color = GLF_dead0_GLF_color;
            if (_GLF_DEAD(false)) {
                _GLF_color = GLF_dead14_GLF_color;
            }
        }
        if (_GLF_DEAD(false)) {
            vec2 donor_replacementGLF_dead19a = _GLF_FUZZED(injectionSwitch);
            float donor_replacementGLF_dead19z = _GLF_FUZZED(sqrt(distance(resolution, GLF_dead12resolution)));
            if (donor_replacementGLF_dead19a.y > donor_replacementGLF_dead19a.x) {
                donor_replacementGLF_dead19z = donor_replacementGLF_dead19a.x / donor_replacementGLF_dead19a.y;
            } else {
                donor_replacementGLF_dead19z = donor_replacementGLF_dead19a.y / donor_replacementGLF_dead19a.x;
            }
        }
    }
    if (gl_FragCoord.x < resolution.x / 2.0) {
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
            {
                ;
            }
        }
        if (_GLF_DEAD(false)) {
            _GLF_color = vec4(3.8, 3.5, 19.73, -82.49);
        }
        _GLF_color = _GLF_IDENTITY(vec4(data[0] / 10.0, data[5] / 10.0, data[9] / 10.0, 1.0), (false ? _GLF_FUZZED(_GLF_color) : vec4(data[0] / 10.0, data[5] / 10.0, data[9] / 10.0, 1.0)));
        if (_GLF_DEAD(false)) {
            vec2 donor_replacementGLF_dead16a = _GLF_FUZZED(GLF_dead2injectionSwitch);
            float donor_replacementGLF_dead16th = _GLF_FUZZED(GLF_dead12h_r);
            if (donor_replacementGLF_dead16a.y < donor_replacementGLF_dead16a.x) {
                donor_replacementGLF_dead16th = 0.5 - donor_replacementGLF_dead16th;
            }
        }
        if (_GLF_DEAD(false)) {
            if (_GLF_DEAD(false)) {
                vec2 donor_replacementGLF_dead16v = _GLF_FUZZED(GLF_dead12resolution);
                if (donor_replacementGLF_dead16v.x < 0.0) {
                    GLF_dead12h_r = 1.0 - GLF_dead12h_r;
                }
            }
            int donor_replacementGLF_dead10v = _GLF_FUZZED(87538);
            {
                donor_replacementGLF_dead10v = (4 * donor_replacementGLF_dead10v * (1000 - _GLF_IDENTITY(donor_replacementGLF_dead10v, clamp(donor_replacementGLF_dead10v, donor_replacementGLF_dead10v, donor_replacementGLF_dead10v)))) / 1000;
            }
        }
        if (_GLF_DEAD(_GLF_FALSE(false, _GLF_IDENTITY((gl_FragCoord.x < 0.0), false || ((gl_FragCoord.x < 0.0)))))) {
            _GLF_color = _GLF_outlined_53();
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (_GLF_IDENTITY(injectionSwitch.x > injectionSwitch.y, !(!(injectionSwitch.x > injectionSwitch.y))))))) {
            bool donor_replacementGLF_dead1c7 = _GLF_IDENTITY(_GLF_FUZZED(false), !(!(_GLF_FUZZED(false))));
            vec2 donor_replacementGLF_dead1pos = _GLF_FUZZED(vec2(30.15, -89.17));
            vec3 donor_replacementGLF_dead1setting = _GLF_FUZZED(exp2(vec3(0.3, -5.3, -3.6)));
            if (!donor_replacementGLF_dead1c7) {
                ;
            }
            if (_GLF_DEAD(_GLF_IDENTITY(false, true && (false)))) {
                _GLF_color = vec4(GLF_dead12time);
            }
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            vec2 donor_replacementGLF_dead16a = _GLF_FUZZED(min(injectionSwitch, -7021.2380));
            float donor_replacementGLF_dead16z = _GLF_FUZZED(round(vec3(-8.5, 6905.9539, -0.8).z));
            {
                {
                    bool GLF_live16c1 = _GLF_FUZZED(false);
                    bool GLF_live16c2 = _GLF_FUZZED(true);
                    bool GLF_live16c3 = _GLF_FUZZED(true);
                    bool GLF_live16c4 = _GLF_FUZZED(false);
                    vec3 GLF_live16col = _GLF_FUZZED(vec3(-5.1, 4680.9437, -324.873));
                    vec2 GLF_live16uv = _GLF_FUZZED(vec2(1.4, -0.3));
                    if (!GLF_live16c1 && !GLF_live16c2 && !GLF_live16c3 && GLF_live16c4) {
                        float GLF_live16stripe = GLF_live16compute_stripe(tan((GLF_live16uv.x + GLF_live16uv.y) * 20.0));
                        GLF_live16col = mix(vec3(GLF_live16uv.x, .8, 0), vec3(1, GLF_live16uv.y, 0), GLF_live16stripe);
                        GLF_live16_GLF_color = vec4(GLF_live16col, 1.0);
                        ;
                    }
                }
                donor_replacementGLF_dead16z = donor_replacementGLF_dead16a.y / donor_replacementGLF_dead16a.x;
            }
        }
    } else {
        if (_GLF_DEAD(false)) {
            {
                GLF_dead15_GLF_color = vec4(0.0, 0.0, 0.0, 1.0);
            }
        }
        _GLF_color = vec4(data[_GLF_IDENTITY(5, (_GLF_IDENTITY(5, (5) | (5))) - (0 << _GLF_IDENTITY(int(0), int(0))))] / 10.0, data[9] / 10.0, data[0] / 10.0, 1.0);
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
        _GLF_color = ceil(GLF_dead0_GLF_color);
    }
}
