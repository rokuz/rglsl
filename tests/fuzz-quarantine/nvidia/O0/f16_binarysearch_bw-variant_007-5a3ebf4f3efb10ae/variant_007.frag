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
vec4 GLF_live28gl_FragCoord = _GLF_FUZZED(((-3.8) + vec4(8.8, 5730.4794, -8.2, -85.67)));

layout(set = 0, binding = 2) uniform buf2 {
    vec2 GLF_live28resolution;
};

layout(set = 0, binding = 3) uniform buf3 {
    float GLF_live27time;
};

float GLF_live27h_r = _GLF_FUZZED(float(30743u));
float GLF_live27s_g = _GLF_FUZZED(92.80);
float GLF_live27b_b = _GLF_FUZZED(vec2(-9.6, 871.954).t);

void GLF_live27doConvert() {
    vec3 GLF_live27temp = _GLF_FUZZED(vec3(5.8, -182.551, -3198.8207));
    GLF_live27temp = GLF_live27b_b * (1.0 - GLF_live27s_g) + (GLF_live27b_b - GLF_live27b_b * (1.0 - GLF_live27s_g)) * clamp(abs(abs(6.0 * (GLF_live27h_r - vec3(0, 1, 2) / 3.0)) - 3.0) - 1.0, 0.0, 1.0);
    GLF_live27h_r = GLF_live27temp.x;
    GLF_live27s_g = GLF_live27temp.y;
    GLF_live27b_b = GLF_live27temp.z;
}

vec3 GLF_live27computeColor(float GLF_live27c, vec2 GLF_live27position) {
    GLF_live27h_r = fract(GLF_live27c);
    GLF_live27s_g = 1.0;
    GLF_live27b_b = (0.5 + (sin(GLF_live27time) * 0.5 + 0.5));
    GLF_live27doConvert();
    GLF_live27s_g *= 1.0 / GLF_live27position.y;
    GLF_live27h_r *= 1.0 / GLF_live27position.x;
    if (abs(GLF_live27position.y - GLF_live27position.x) < 0.5) {
        GLF_live27b_b = clamp(0.0, 1.0, GLF_live27b_b * 3.0);
    }
    return vec3(GLF_live27h_r, GLF_live27s_g, GLF_live27b_b);
}

vec3 GLF_live27defaultColor() {
    return vec3(0.0);
}

vec3 GLF_live27drawShape(vec2 GLF_live27pos, vec2 GLF_live27square, vec3 GLF_live27setting) {
    bool GLF_live27c1 = GLF_live27pos.x - GLF_live27setting.x < GLF_live27square.x;
    if (!GLF_live27c1) {
        return GLF_live27defaultColor();
    }
    bool GLF_live27c2 = GLF_live27pos.x + GLF_live27setting.x > GLF_live27square.x;
    if (!GLF_live27c2) {
        return GLF_live27defaultColor();
    }
    bool GLF_live27c3 = GLF_live27pos.y - GLF_live27setting.x < GLF_live27square.y;
    if (!GLF_live27c3) {
        return GLF_live27defaultColor();
    }
    bool GLF_live27c4 = GLF_live27pos.y + GLF_live27setting.x > GLF_live27square.y;
    if (!GLF_live27c4) {
        return GLF_live27defaultColor();
    }
    bool GLF_live27c5 = GLF_live27pos.x - (GLF_live27setting.x - GLF_live27setting.y) < GLF_live27square.x;
    if (!GLF_live27c5) {
        return GLF_live27computeColor(GLF_live27setting.z / 40.0, GLF_live27pos);
    }
    bool GLF_live27c6 = GLF_live27pos.x + (GLF_live27setting.x - GLF_live27setting.y) > GLF_live27square.x;
    if (!GLF_live27c6) {
        return GLF_live27computeColor(GLF_live27setting.z / 40.0, GLF_live27pos);
    }
    bool GLF_live27c7 = GLF_live27pos.y - (GLF_live27setting.x - GLF_live27setting.y) < GLF_live27square.y;
    if (!GLF_live27c7) {
        return GLF_live27computeColor(GLF_live27setting.z / 40.0, GLF_live27pos);
    }
    bool GLF_live27c8 = GLF_live27pos.y + (GLF_live27setting.x - GLF_live27setting.y) > GLF_live27square.y;
    if (!GLF_live27c8) {
        return GLF_live27computeColor(GLF_live27setting.z / 40.0, GLF_live27pos);
    }
    return GLF_live27defaultColor();
}

layout(set = 0, binding = 4) uniform sampler2D GLF_live25tex;

ivec2 GLF_live23iter(ivec2 GLF_live23p) {
    if (GLF_live23p.x > 0) {
        GLF_live23p.y--;
    }
    if (GLF_live23p.x < 0) {
        GLF_live23p.y++;
    }
    GLF_live23p.x += GLF_live23p.y / 2;
    return GLF_live23p;
}

layout(set = 0, binding = 5) uniform sampler2D GLF_live24tex;
vec4 GLF_live18gl_FragCoord = _GLF_FUZZED(vec4(9514.1769, 3961.7627, 2.5, -817.991));
int GLF_live18data[10] = int[10](_GLF_FUZZED(-5392), _GLF_FUZZED(63170), _GLF_FUZZED(71827), _GLF_FUZZED((9256)), _GLF_FUZZED(9224), _GLF_FUZZED(-38497), _GLF_FUZZED(-27656), _GLF_FUZZED((-(-23703))), _GLF_FUZZED(-22208), _GLF_FUZZED(93242)), GLF_live18temp[10] = int[10](_GLF_FUZZED(37733), _GLF_FUZZED(84647), _GLF_FUZZED(37845), _GLF_FUZZED(17444), _GLF_FUZZED(-35564), _GLF_FUZZED(-46194), _GLF_FUZZED(int(30736u)), _GLF_FUZZED(ivec4(60793, -74727, -50586, 53067).b), _GLF_FUZZED(ivec4(14021, 81614, 40741, -28861).t), _GLF_FUZZED(ivec2(_GLF_IDENTITY(-44809, (false ? _GLF_FUZZED(32731) : (-44809))), -65535).r));

struct GLF_live21BST {
    int data;
    int leftIndex;
    int rightIndex;
};

GLF_live21BST GLF_live21tree[10] = GLF_live21BST[10](GLF_live21BST(0, 0, 0), GLF_live21BST(0, 0, 0), GLF_live21BST(0, 0, 0), GLF_live21BST(0, _GLF_IDENTITY(0, (0) << 0), 0), GLF_live21BST(0, 0, _GLF_IDENTITY(0, ~(~(0)))), GLF_live21BST(0, 0, 0), GLF_live21BST(0, 0, 0), GLF_live21BST(0, 0, 0), GLF_live21BST(0, 0, 0), GLF_live21BST(0, 0, 0));

void GLF_live21makeTreeNode(inout GLF_live21BST GLF_live21tree, int GLF_live21data) {
    GLF_live21tree.data = GLF_live21data;
    GLF_live21tree.leftIndex = -1;
    GLF_live21tree.rightIndex = -1;
}

vec4 GLF_live14_GLF_color = _GLF_FUZZED((vec4(_GLF_IDENTITY(2.0, clamp(2.0, 2.0, _GLF_IDENTITY(2.0, (2.0) - 0.0))), 3630.6902, 21.56, _GLF_IDENTITY(3873.9376, clamp(3873.9376, 3873.9376, _GLF_IDENTITY(3873.9376, (3873.9376) - 0.0)))) - vec4(-58.34, 4905.9988, 70.86, 5833.2778)));

layout(set = 0, binding = 6) uniform buf6 {
    float GLF_live12time;
};

layout(set = 0, binding = 7) uniform buf7 {
    vec2 GLF_live12resolution;
};

float GLF_live12h_r = _GLF_FUZZED((-6.9));
float GLF_live12s_g = _GLF_FUZZED(_GLF_IDENTITY(-3.9, clamp(_GLF_IDENTITY(-3.9, max(-3.9, -3.9)), _GLF_IDENTITY(-3.9, float(vec2(-3.9, 0.0))), -3.9)));
float GLF_live12b_b = _GLF_FUZZED(_GLF_IDENTITY(((_GLF_IDENTITY(vec4(6.9, -2.7, 5.0, 3.7).z + 8.7, (vec4(6.9, -2.7, 5.0, 3.7).z + 8.7) / 1.0))), 1.0 * (((_GLF_IDENTITY(vec4(6.9, -2.7, 5.0, 3.7).z + 8.7, (vec4(6.9, -2.7, 5.0, 3.7).z + 8.7) / 1.0))))));

void GLF_live12doConvert() {
    int GLF_live12msb8 = 256;
    vec3 GLF_live12temp = _GLF_FUZZED(vec3(-3067.4161, 3.7, 9.0));
    GLF_live12temp = GLF_live12b_b * (float(bitCount(GLF_live12msb8)) - GLF_live12s_g) + (GLF_live12b_b - GLF_live12b_b * (float(bitCount(_GLF_IDENTITY(GLF_live12msb8, clamp(_GLF_IDENTITY(GLF_live12msb8, (GLF_live12msb8) | 0), _GLF_IDENTITY(GLF_live12msb8, (GLF_live12msb8) ^ 0), GLF_live12msb8)))) - GLF_live12s_g)) * clamp(abs(abs(6.0 * (GLF_live12h_r - vec3(_GLF_IDENTITY(bitfieldReverse(0), min(bitfieldReverse(0), bitfieldReverse(0))), bitCount(GLF_live12msb8), 2) / 3.0)) - 3.0) - float(bitCount(GLF_live12msb8)), float(bitfieldExtract(int(GLF_live12resolution.x), 0, 0)), float(bitCount(int(GLF_live12resolution.x))));
    GLF_live12h_r = GLF_live12temp.x;
    _GLF_IDENTITY(GLF_live12s_g = GLF_live12temp.y, (_GLF_IDENTITY(GLF_live12s_g = GLF_live12temp.y, (GLF_live12s_g = GLF_live12temp.y) * round(length(normalize(vec4(1.0, 1.0, 1.0, 1.0)))))) / 1.0);
    GLF_live12b_b = GLF_live12temp.z;
}

vec3 GLF_live12computeColor(float GLF_live12c, vec2 GLF_live12position) {
    int GLF_live12msb8 = 256;
    GLF_live12h_r = fract(GLF_live12c);
    GLF_live12s_g = float(bitCount(GLF_live12msb8));
    GLF_live12b_b = (0.5 + (sin(GLF_live12time) * 0.5 + 0.5));
    GLF_live12doConvert();
    GLF_live12s_g *= float(bitCount(GLF_live12msb8)) / GLF_live12position.y;
    GLF_live12h_r *= float(bitCount(GLF_live12msb8)) / GLF_live12position.x;
    if (_GLF_IDENTITY(abs(GLF_live12position.y - GLF_live12position.x) < 0.5, bool(bvec4(abs(GLF_live12position.y - GLF_live12position.x) < 0.5, true, false, false)))) {
        GLF_live12b_b = clamp(_GLF_IDENTITY(float(bitfieldExtract(int(GLF_live12resolution.x), 0, _GLF_IDENTITY(0, max(_GLF_IDENTITY(0, ~(_GLF_IDENTITY(~(0), clamp(~(0), ~(0), ~(0))))), 0)))), max(_GLF_IDENTITY(float(bitfieldExtract(int(GLF_live12resolution.x), 0, _GLF_IDENTITY(0, max(_GLF_IDENTITY(0, ~(_GLF_IDENTITY(~(0), clamp(~(0), ~(0), ~(0))))), 0)))), min(float(bitfieldExtract(_GLF_IDENTITY(int(GLF_live12resolution.x), int(int(int(GLF_live12resolution.x)))), 0, _GLF_IDENTITY(0, max(_GLF_IDENTITY(0, ~(_GLF_IDENTITY(~(0), clamp(~(0), ~(0), ~(0))))), 0)))), float(bitfieldExtract(int(GLF_live12resolution.x), 0, _GLF_IDENTITY(0, max(_GLF_IDENTITY(0, ~(_GLF_IDENTITY(~(0), clamp(~(0), ~(0), ~_GLF_IDENTITY((0), (_GLF_IDENTITY(true, !(!(true))) ? (0) : _GLF_FUZZED(-46549))))))), 0)))))), float(bitfieldExtract(int(GLF_live12resolution.x), 0, _GLF_IDENTITY(0, max(_GLF_IDENTITY(0, ~(_GLF_IDENTITY(~(0), clamp(~(0), ~(0), ~(0))))), 0)))))), float(bitCount(GLF_live12msb8)), GLF_live12b_b * float(_GLF_IDENTITY(bitCount(GLF_live12msb8), (true ? bitCount(GLF_live12msb8) : _GLF_FUZZED(-19508)))) * 3.0);
    }
    return vec3(GLF_live12h_r, GLF_live12s_g, GLF_live12b_b);
}

vec3 GLF_live12defaultColor() {
    return vec3(float(bitfieldExtract(int(GLF_live12resolution.y), 0, 0)));
}

vec3 GLF_live12drawShape(vec2 GLF_live12pos, vec2 GLF_live12square, vec3 GLF_live12setting) {
    int GLF_live12msb8 = 256;
    bool GLF_live12c1 = GLF_live12pos.x - GLF_live12setting.x < GLF_live12square.x;
    if (!GLF_live12c1) {
        return GLF_live12defaultColor();
    }
    bool GLF_live12c2 = GLF_live12pos.x + GLF_live12setting.x > GLF_live12square.x;
    {
        {
            {
                ;
            }
        }
        ivec2 GLF_live23p = _GLF_FUZZED(ivec2(-21596, -73185));
        if (GLF_live23p.x < 0) {
            GLF_live23p.x = -GLF_live23p.x;
        }
    }
    if (!GLF_live12c2) {
        return GLF_live12defaultColor();
    }
    {
        int GLF_live24looplimiter0 = 0;
        if (GLF_live24looplimiter0 >= 3) {
            ;
        }
    }
    bool GLF_live12c3 = GLF_live12pos.y - GLF_live12setting.x < GLF_live12square.y;
    if (!GLF_live12c3) {
        return GLF_live12defaultColor();
    }
    bool GLF_live12c4 = _GLF_IDENTITY(GLF_live12pos.y + GLF_live12setting.x > GLF_live12square.y, bool(bvec3(_GLF_IDENTITY(GLF_live12pos.y + GLF_live12setting.x > GLF_live12square.y, _GLF_IDENTITY(bool(bvec2(GLF_live12pos.y + GLF_live12setting.x > GLF_live12square.y, true)), _GLF_IDENTITY(bool(_GLF_IDENTITY(bvec3(bool(bvec2(GLF_live12pos.y + GLF_live12setting.x > GLF_live12square.y, true)), false, false), bvec3(bvec4(bvec3(bool(bvec2(GLF_live12pos.y + GLF_live12setting.x > GLF_live12square.y, true)), false, false), false)))), !(!(bool(_GLF_IDENTITY(bvec3(bool(bvec2(GLF_live12pos.y + GLF_live12setting.x > GLF_live12square.y, true)), false, false), bvec3(bvec4(bvec3(bool(bvec2(GLF_live12pos.y + GLF_live12setting.x > GLF_live12square.y, true)), false, false), false))))))))), true, true)));
    if (!GLF_live12c4) {
        return GLF_live12defaultColor();
    }
    bool GLF_live12c5 = GLF_live12pos.x - _GLF_IDENTITY((GLF_live12setting.x - GLF_live12setting.y), clamp(_GLF_IDENTITY((GLF_live12setting.x - GLF_live12setting.y), ((GLF_live12setting.x - GLF_live12setting.y)) + 0.0), (GLF_live12setting.x - GLF_live12setting.y), (GLF_live12setting.x - GLF_live12setting.y))) < GLF_live12square.x;
    if (!GLF_live12c5) {
        return GLF_live12computeColor(GLF_live12setting.z / (5.0 * float(findMSB(GLF_live12msb8))), GLF_live12pos);
    }
    bool GLF_live12c6 = GLF_live12pos.x + (GLF_live12setting.x - GLF_live12setting.y) > GLF_live12square.x;
    if (_GLF_IDENTITY(!GLF_live12c6, bool(bvec4(!GLF_live12c6, false, false, false)))) {
        return GLF_live12computeColor(GLF_live12setting.z / (5.0 * float(findMSB(GLF_live12msb8))), GLF_live12pos);
    }
    bool GLF_live12c7 = _GLF_IDENTITY(GLF_live12pos.y - _GLF_IDENTITY((_GLF_IDENTITY(GLF_live12setting, (GLF_live12setting) - abs(vec3(0.0, 0.0, 0.0))).x - GLF_live12setting.y), float(vec4(_GLF_IDENTITY((_GLF_IDENTITY(GLF_live12setting, (GLF_live12setting) - abs(vec3(0.0, 0.0, 0.0))).x - GLF_live12setting.y), (false ? _GLF_FUZZED(uintBitsToFloat(198955u)) : (_GLF_IDENTITY(GLF_live12setting, (GLF_live12setting) - abs(vec3(0.0, 0.0, 0.0))).x - GLF_live12setting.y))), 0.0, 0.0, 1.0))) < GLF_live12square.y, _GLF_IDENTITY(bool(_GLF_IDENTITY(bvec3(GLF_live12pos.y - _GLF_IDENTITY((_GLF_IDENTITY(GLF_live12setting, (GLF_live12setting) - abs(vec3(0.0, 0.0, 0.0))).x - GLF_live12setting.y), float(vec4(_GLF_IDENTITY((_GLF_IDENTITY(GLF_live12setting, (GLF_live12setting) - abs(vec3(0.0, 0.0, 0.0))).x - GLF_live12setting.y), (false ? _GLF_FUZZED(uintBitsToFloat(198955u)) : (_GLF_IDENTITY(GLF_live12setting, (GLF_live12setting) - abs(vec3(0.0, 0.0, 0.0))).x - GLF_live12setting.y))), 0.0, 0.0, 1.0))) < GLF_live12square.y, false, _GLF_FALSE(false, (gl_FragCoord.y < 0.0))), _GLF_IDENTITY(bvec3(bvec4(bvec3(GLF_live12pos.y - _GLF_IDENTITY((_GLF_IDENTITY(GLF_live12setting, (GLF_live12setting) - abs(vec3(0.0, 0.0, 0.0))).x - GLF_live12setting.y), float(vec4(_GLF_IDENTITY((_GLF_IDENTITY(GLF_live12setting, (GLF_live12setting) - abs(vec3(0.0, 0.0, 0.0))).x - GLF_live12setting.y), (false ? _GLF_FUZZED(uintBitsToFloat(198955u)) : (_GLF_IDENTITY(GLF_live12setting, (GLF_live12setting) - abs(vec3(0.0, 0.0, 0.0))).x - GLF_live12setting.y))), 0.0, 0.0, 1.0))) < GLF_live12square.y, false, _GLF_FALSE(false, (gl_FragCoord.y < 0.0))), true)), bvec3(bvec4(bvec3(bvec4(bvec3(GLF_live12pos.y - _GLF_IDENTITY((_GLF_IDENTITY(GLF_live12setting, (GLF_live12setting) - abs(vec3(0.0, 0.0, 0.0))).x - GLF_live12setting.y), float(vec4(_GLF_IDENTITY((_GLF_IDENTITY(GLF_live12setting, (GLF_live12setting) - abs(vec3(0.0, 0.0, 0.0))).x - GLF_live12setting.y), (false ? _GLF_FUZZED(uintBitsToFloat(198955u)) : (_GLF_IDENTITY(GLF_live12setting, (GLF_live12setting) - abs(vec3(0.0, 0.0, 0.0))).x - GLF_live12setting.y))), 0.0, 0.0, 1.0))) < GLF_live12square.y, false, _GLF_FALSE(false, (gl_FragCoord.y < 0.0))), true)), true))))), _GLF_IDENTITY(bool(bvec2(bool(_GLF_IDENTITY(bvec3(GLF_live12pos.y - _GLF_IDENTITY((_GLF_IDENTITY(GLF_live12setting, (GLF_live12setting) - abs(vec3(0.0, 0.0, 0.0))).x - GLF_live12setting.y), float(vec4(_GLF_IDENTITY((_GLF_IDENTITY(GLF_live12setting, (GLF_live12setting) - abs(vec3(0.0, 0.0, 0.0))).x - GLF_live12setting.y), (false ? _GLF_FUZZED(uintBitsToFloat(198955u)) : (_GLF_IDENTITY(GLF_live12setting, (GLF_live12setting) - abs(vec3(0.0, 0.0, 0.0))).x - GLF_live12setting.y))), 0.0, 0.0, 1.0))) < GLF_live12square.y, false, _GLF_FALSE(false, (gl_FragCoord.y < 0.0))), _GLF_IDENTITY(bvec3(bvec4(bvec3(GLF_live12pos.y - _GLF_IDENTITY((_GLF_IDENTITY(GLF_live12setting, (GLF_live12setting) - abs(vec3(0.0, 0.0, 0.0))).x - GLF_live12setting.y), float(vec4(_GLF_IDENTITY((_GLF_IDENTITY(GLF_live12setting, (GLF_live12setting) - abs(vec3(0.0, 0.0, 0.0))).x - GLF_live12setting.y), (false ? _GLF_FUZZED(uintBitsToFloat(198955u)) : (_GLF_IDENTITY(GLF_live12setting, (GLF_live12setting) - abs(vec3(0.0, 0.0, 0.0))).x - GLF_live12setting.y))), 0.0, 0.0, 1.0))) < GLF_live12square.y, false, _GLF_FALSE(false, (gl_FragCoord.y < 0.0))), true)), bvec3(bvec4(bvec3(bvec4(bvec3(GLF_live12pos.y - _GLF_IDENTITY((_GLF_IDENTITY(GLF_live12setting, (GLF_live12setting) - abs(vec3(0.0, 0.0, 0.0))).x - GLF_live12setting.y), float(vec4(_GLF_IDENTITY((_GLF_IDENTITY(GLF_live12setting, (GLF_live12setting) - abs(vec3(0.0, 0.0, 0.0))).x - GLF_live12setting.y), (false ? _GLF_FUZZED(uintBitsToFloat(198955u)) : (_GLF_IDENTITY(GLF_live12setting, (GLF_live12setting) - abs(vec3(0.0, 0.0, 0.0))).x - GLF_live12setting.y))), 0.0, 0.0, 1.0))) < GLF_live12square.y, false, _GLF_FALSE(false, (gl_FragCoord.y < 0.0))), true)), true))))), false)), bool(bvec4(bool(bvec2(bool(_GLF_IDENTITY(bvec3(GLF_live12pos.y - _GLF_IDENTITY((_GLF_IDENTITY(GLF_live12setting, (GLF_live12setting) - abs(vec3(0.0, 0.0, 0.0))).x - GLF_live12setting.y), float(vec4(_GLF_IDENTITY((_GLF_IDENTITY(GLF_live12setting, (GLF_live12setting) - abs(vec3(0.0, 0.0, 0.0))).x - GLF_live12setting.y), (false ? _GLF_FUZZED(uintBitsToFloat(198955u)) : (_GLF_IDENTITY(GLF_live12setting, (GLF_live12setting) - abs(vec3(0.0, 0.0, 0.0))).x - GLF_live12setting.y))), 0.0, 0.0, 1.0))) < GLF_live12square.y, false, _GLF_FALSE(false, (gl_FragCoord.y < 0.0))), _GLF_IDENTITY(bvec3(bvec4(bvec3(GLF_live12pos.y - _GLF_IDENTITY((_GLF_IDENTITY(GLF_live12setting, (GLF_live12setting) - abs(vec3(0.0, 0.0, 0.0))).x - GLF_live12setting.y), float(vec4(_GLF_IDENTITY((_GLF_IDENTITY(GLF_live12setting, (GLF_live12setting) - abs(vec3(0.0, 0.0, 0.0))).x - GLF_live12setting.y), (false ? _GLF_FUZZED(uintBitsToFloat(198955u)) : (_GLF_IDENTITY(GLF_live12setting, (GLF_live12setting) - abs(vec3(0.0, 0.0, 0.0))).x - GLF_live12setting.y))), 0.0, 0.0, 1.0))) < GLF_live12square.y, false, _GLF_FALSE(false, (gl_FragCoord.y < 0.0))), true)), bvec3(bvec4(bvec3(bvec4(bvec3(GLF_live12pos.y - _GLF_IDENTITY((_GLF_IDENTITY(GLF_live12setting, (GLF_live12setting) - abs(vec3(0.0, 0.0, 0.0))).x - GLF_live12setting.y), float(vec4(_GLF_IDENTITY((_GLF_IDENTITY(GLF_live12setting, (GLF_live12setting) - abs(vec3(0.0, 0.0, 0.0))).x - GLF_live12setting.y), (false ? _GLF_FUZZED(uintBitsToFloat(198955u)) : (_GLF_IDENTITY(GLF_live12setting, (GLF_live12setting) - abs(vec3(0.0, 0.0, 0.0))).x - GLF_live12setting.y))), 0.0, 0.0, 1.0))) < GLF_live12square.y, false, _GLF_IDENTITY(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)), _GLF_TRUE(true, (gl_FragCoord.x >= 0.0)) && (_GLF_FALSE(false, (gl_FragCoord.y < 0.0))))), true)), true))))), false)), _GLF_TRUE(true, (gl_FragCoord.y >= 0.0)), false, false)))));
    if (!GLF_live12c7) {
        return GLF_live12computeColor(GLF_live12setting.z / (5.0 * _GLF_IDENTITY(float(findMSB(GLF_live12msb8)), float(vec3(float(_GLF_IDENTITY(findMSB(GLF_live12msb8), (findMSB(GLF_live12msb8)) >> 0)), 1.0, 1.0)))), GLF_live12pos);
    }
    bool GLF_live12c8 = GLF_live12pos.y + (GLF_live12setting.x - _GLF_IDENTITY(GLF_live12setting.y, mix(float(_GLF_FUZZED(float(38428))), float(GLF_live12setting.y), bool(true)))) > _GLF_IDENTITY(GLF_live12square, max(GLF_live12square, GLF_live12square)).y;
    if (!GLF_live12c8) {
        return GLF_live12computeColor(GLF_live12setting.z / (5.0 * float(findMSB(GLF_live12msb8))), GLF_live12pos);
    }
    return GLF_live12defaultColor();
}

layout(set = 0, binding = 8) uniform sampler2D GLF_live10tex;
const float GLF_live10weights[9] = float[9](1.0, 0.5, -0.25, 0.5, 1.0, -0.5, -0.25, -0.5, -1.0);
const vec4 GLF_live5pal[16] = vec4[16](vec4(0.0, 0.0, 0.0, 1.0), vec4(0.5, 0.0, 0.0, 1.0), vec4(0.0, 0.5, 0.0, 1.0), vec4(0.5, 0.5, 0.0, 1.0), _GLF_IDENTITY(vec4(0.0, 0.0, 0.5, 1.0), clamp(vec4(0.0, 0.0, 0.5, 1.0), _GLF_IDENTITY(vec4(0.0, 0.0, 0.5, 1.0), (_GLF_IDENTITY(true ? vec4(0.0, 0.0, 0.5, 1.0) : _GLF_FUZZED(vec4(0.0, 1.8, 5.4, -8.4)), _GLF_IDENTITY(vec4(mat2(true ? vec4(0.0, 0.0, 0.5, 1.0) : _GLF_FUZZED(vec4(0.0, 1.8, 5.4, -8.4)))), (_GLF_IDENTITY(vec4(mat2(true ? vec4(0.0, 0.0, 0.5, 1.0) : _GLF_FUZZED(vec4(0.0, 1.8, 5.4, -8.4)))), (vec4(mat2(true ? vec4(0.0, 0.0, 0.5, 1.0) : _GLF_FUZZED(vec4(0.0, 1.8, 5.4, -8.4))))) * mat4(1.0))) * vec4(1.0, 1.0, 1.0, 1.0))))), vec4(0.0, 0.0, 0.5, 1.0))), vec4(0.5, 0.0, 0.5, 1.0), vec4(0.0, 0.5, 0.5, 1.0), vec4(0.5, 0.5, 0.5, 1.0), vec4(0.0, 0.0, 0.0, 1.0), vec4(1.0, 0.0, 0.0, 1.0), vec4(0.0, 1.0, 0.0, 1.0), vec4(1.0, 1.0, 0.0, 1.0), vec4(0.0, 0.0, 1.0, 1.0), vec4(1.0, 0.0, 1.0, 1.0), vec4(0.0, 1.0, 1.0, 1.0), vec4(1.0, 1.0, 1.0, 1.0));
const vec4 GLF_live5picdata[8] = vec4[8](vec4(_GLF_IDENTITY(4, max(4, 4)), 4, 20, 4), vec4(4, 4, 4, 20), vec4(4, 20, 20, 4), vec4(20, 4, 4, 8), vec4(8, 6, 4, 2), vec4(2, 12, 2, 4), vec4(16, 2, _GLF_IDENTITY(4, clamp(_GLF_IDENTITY(4, (4) * 1), _GLF_IDENTITY(4, (1 ^ 1) | (4)), 4)), 4), vec4(_GLF_IDENTITY(12, (_GLF_IDENTITY(12, 0 ^ (12))) << 0), 22, 4, 4));

bool GLF_live5collision(vec2 GLF_live5pos, vec4 GLF_live5quad) {
    if (_GLF_IDENTITY(GLF_live5pos.x, (GLF_live5pos.x) - 0.0) < GLF_live5quad.x) {
        {
            vec2 GLF_live10coord = _GLF_FUZZED(vec2(1539.7738, -122.698));
            int GLF_live10looplimiter1 = 0;
            vec4 GLF_live10res = _GLF_FUZZED(vec4(-6519.8993, 14.73, 398.836, -3361.1547));
            float GLF_live10uvstep = _GLF_FUZZED(vec2(-7.6, _GLF_IDENTITY(-9.7, (_GLF_IDENTITY(-9.7, max(-9.7, -9.7))) - 0.0)).x);
            for (int GLF_live10i = 0; GLF_live10i < 3; GLF_live10i++) {
                if (GLF_live10looplimiter1 >= 6) {
                    break;
                }
                GLF_live10looplimiter1++;
                {
                    {
                        int GLF_live10looplimiter0 = 0;
                        for (int GLF_live10j = 0; GLF_live10j < 3; GLF_live10j++) {
                            if (GLF_live10looplimiter0 >= 6) {
                                break;
                            }
                            {
                                {
                                    ;
                                }
                            }
                            GLF_live10looplimiter0++;
                            {
                                GLF_live10res += texture(GLF_live10tex, GLF_live10coord + vec2(float(GLF_live10i - 1) * GLF_live10uvstep, float(_GLF_IDENTITY(GLF_live10j - 1, clamp(_GLF_IDENTITY(GLF_live10j - 1, clamp(GLF_live10j - 1, GLF_live10j - 1, GLF_live10j - 1)), GLF_live10j - 1, _GLF_IDENTITY(GLF_live10j - 1, 0 ^ (_GLF_IDENTITY(GLF_live10j - 1, (GLF_live10j - 1) | (GLF_live10j - 1))))))) * GLF_live10uvstep)) * GLF_live10weights[_GLF_MAKE_IN_BOUNDS_INT(_GLF_IDENTITY(GLF_live10i, max(GLF_live10i, _GLF_IDENTITY(GLF_live10i, clamp(GLF_live10i, GLF_live10i, _GLF_IDENTITY(GLF_live10i, (GLF_live10i) | 0))))) * 3 + GLF_live10j, 9)];
                            }
                        }
                    }
                }
            }
            {
                vec2 GLF_live27center = _GLF_FUZZED(vec2(-56.92, 0.2));
                int GLF_live27i = _GLF_FUZZED(-5736);
                int GLF_live27looplimiter0 = 0;
                vec2 GLF_live27position = _GLF_FUZZED(vec2(21.70, -74.31));
                vec3 GLF_live27result = _GLF_FUZZED(vec3(225.299, 5640.4673, -18.48).bgb);
                {
                    if (GLF_live27looplimiter0 >= 6) {
                        ;
                    }
                    GLF_live27looplimiter0++;
                    {
                        vec3 GLF_live27d = _GLF_FUZZED(dFdxFine(vec3(-5063.9612, 115.398, -2.5)));
                        GLF_live27d = GLF_live27drawShape(GLF_live27position, GLF_live27center + vec2(sin(float(GLF_live27i) / 10.0 + GLF_live27time) / 4.0, 0.0), vec3(0.01 + sin(float(GLF_live27i) / 100.0), 0.01, float(GLF_live27i)));
                        if (length(GLF_live27d) <= 0.0) {
                            ;
                        }
                        GLF_live27result = vec3(GLF_live27d);
                    }
                }
            }
        }
        return false;
    }
    if (GLF_live5pos.y < GLF_live5quad.y) {
        return false;
    }
    if (GLF_live5pos.x > GLF_live5quad.x + GLF_live5quad.z) {
        return false;
        {
            {
                ;
            }
        }
    }
    if (GLF_live5pos.y > _GLF_IDENTITY(GLF_live5quad.y + GLF_live5quad.w, clamp(GLF_live5quad.y + GLF_live5quad.w, GLF_live5quad.y + GLF_live5quad.w, GLF_live5quad.y + GLF_live5quad.w))) {
        return _GLF_IDENTITY(false, _GLF_IDENTITY((false), !(!((false)))) && _GLF_TRUE(true, (gl_FragCoord.x >= sin(0.0))));
    }
    return true;
}

layout(set = 0, binding = 9) uniform buf9 {
    vec2 GLF_live3injectionSwitch;
};

struct GLF_live3QuicksortObject {
    int numbers[10];
};

GLF_live3QuicksortObject GLF_live3obj = GLF_live3QuicksortObject(int[10](0, 0, 0, 0, 0, 0, 0, 0, 0, _GLF_IDENTITY(0, (true ? 0 : _GLF_FUZZED(((-22778) + (75673 & (-44332))))))));

vec3 GLF_live3palette(vec3 GLF_live3a, vec3 GLF_live3b, vec3 GLF_live3c, vec3 GLF_live3d) {
    return fract(mix(GLF_live3d * GLF_live3a, GLF_live3a * GLF_live3c, _GLF_IDENTITY(_GLF_IDENTITY(GLF_live3b + GLF_live3d - GLF_live3c, (_GLF_IDENTITY(GLF_live3b + GLF_live3d - GLF_live3c, (GLF_live3b + GLF_live3d - GLF_live3c) * mat3(1.0))) / vec3(1.0, 1.0, 1.0)), (_GLF_IDENTITY(GLF_live3b + GLF_live3d - GLF_live3c, (_GLF_IDENTITY(GLF_live3b + GLF_live3d - GLF_live3c, (GLF_live3b + GLF_live3d - GLF_live3c) * mat3(1.0))) / vec3(1.0, 1.0, 1.0))) + vec3(0.0, 0.0, 0.0))));
    {
        {
            GLF_live14_GLF_color = vec4(0.0, 0.0, 0.0, 1.0);
        }
    }
}

const int GLF_live4N = 10;
int GLF_live4data[10] = int[10](_GLF_IDENTITY(_GLF_FUZZED(-_GLF_IDENTITY(61454, max(61454, _GLF_IDENTITY(61454, min(61454, 61454))))), (true ? _GLF_IDENTITY(_GLF_FUZZED(-_GLF_IDENTITY(61454, max(61454, _GLF_IDENTITY(61454, min(61454, 61454))))), (false ? _GLF_FUZZED(GLF_live4N) : _GLF_FUZZED(-_GLF_IDENTITY(61454, max(_GLF_IDENTITY(61454, (_GLF_IDENTITY(61454, ~(~(61454)))) * 1), _GLF_IDENTITY(61454, min(61454, 61454))))))) : _GLF_FUZZED(-80727))), _GLF_FUZZED(((_GLF_IDENTITY(-14164, min(_GLF_IDENTITY(-14164, clamp(-14164, _GLF_IDENTITY(-14164, 0 | (-14164)), _GLF_IDENTITY(-14164, clamp(-14164, -14164, -14164)))), _GLF_IDENTITY(-14164, clamp(-14164, -14164, -14164))))) | 89890)), _GLF_FUZZED(int(61447u)), _GLF_FUZZED(74199), _GLF_FUZZED(_GLF_IDENTITY((41377 * 16731), max(_GLF_IDENTITY((41377 * 16731), int(_GLF_IDENTITY(ivec2((41377 * 16731), 1), (_GLF_IDENTITY(ivec2((41377 * 16731), 1), _GLF_IDENTITY(ivec2(0, 0) ^ (ivec2((41377 * 16731), 1)), (ivec2(0, 0) ^ (ivec2((41377 * 16731), 1))) << ivec2(0, 0)))) | (ivec2((41377 * 16731), 1))))), (41377 * 16731)))), _GLF_FUZZED(58130), _GLF_FUZZED((19602 - 34433)), _GLF_FUZZED(_GLF_IDENTITY(83838, int(_GLF_IDENTITY(ivec3(_GLF_IDENTITY(83838, (_GLF_IDENTITY(83838, (83838) >> (0 | 0))) ^ (39607 & 0)), 0, 0), (ivec3(_GLF_IDENTITY(83838, (_GLF_IDENTITY(83838, (83838) >> (0 | _GLF_IDENTITY(0, (true ? 0 : _GLF_FUZZED(GLF_live4N)))))) ^ (39607 & 0)), 0, 0)) - ivec3(0, 0, 0))))), _GLF_FUZZED((_GLF_IDENTITY((-2486) ^ (_GLF_IDENTITY(-48103, ~(_GLF_IDENTITY(~(_GLF_IDENTITY(-48103, (false ? _GLF_FUZZED(GLF_live4N) : (-48103)))), min(~(_GLF_IDENTITY(-48103, (false ? _GLF_FUZZED(GLF_live4N) : (-48103)))), ~(_GLF_IDENTITY(-48103, (false ? _GLF_FUZZED(GLF_live4N) : (-48103))))))))), ((1 << _GLF_IDENTITY(int(2), int(2))) >> _GLF_IDENTITY(int(2), int(2))) * ((-2486) ^ (_GLF_IDENTITY(-48103, ~(_GLF_IDENTITY(~(_GLF_IDENTITY(-48103, (false ? _GLF_FUZZED(GLF_live4N) : (-48103)))), min(~(_GLF_IDENTITY(-48103, (false ? _GLF_FUZZED(GLF_live4N) : (-48103)))), ~(_GLF_IDENTITY(-48103, (false ? _GLF_FUZZED(GLF_live4N) : (-48103))))))))))))), _GLF_FUZZED(-_GLF_IDENTITY(62961, (62961) / _GLF_IDENTITY(1, ~(~(1)))))), GLF_live4temp[10] = int[10](_GLF_FUZZED((46068 | 80284)), _GLF_FUZZED(-9634), _GLF_FUZZED((~_GLF_IDENTITY((-68479), ~(~((-68479)))))), _GLF_FUZZED(-73067), _GLF_FUZZED(int(175591u)), _GLF_FUZZED(-45312), _GLF_FUZZED(17676), _GLF_FUZZED(int((mat4x3(_GLF_IDENTITY(3.6, _GLF_IDENTITY(float(vec3(3.6, 0.0, abs(1.0))), (float(vec3(3.6, 0.0, abs(1.0)))) + sin(0.0))), -4152.2255, -7.8, 74.27, 6946.2949, 178.178, _GLF_IDENTITY(-64.08, 1.0 * (_GLF_IDENTITY(-64.08, (_GLF_IDENTITY(-64.08, (true ? (-64.08) : _GLF_FUZZED(97.49)))) - 0.0))), _GLF_IDENTITY(5505.7498, max(5505.7498, 5505.7498)), 30.51, -453.972, -24.90, _GLF_IDENTITY(3988.3857, (3988.3857) / 1.0)) != mat4x3(47.27, -2.4, 1.9, 4968.2304, 918.823, -946.868, 1.6, -8.6, -74.29, 4.2, 8.9, -601.236)))), _GLF_FUZZED((2192)), _GLF_FUZZED((-37056)));

void GLF_live4merge(int GLF_live4from, int GLF_live4mid, int GLF_live4to) {
    int GLF_live4k = GLF_live4from, GLF_live4i = GLF_live4from, GLF_live4j = GLF_live4mid + 1;
    {
        int GLF_live4looplimiter0 = 0;
        while (GLF_live4i <= GLF_live4mid && _GLF_IDENTITY(GLF_live4j, ~(~(GLF_live4j))) <= GLF_live4to) {
            if (GLF_live4looplimiter0 >= 6) {
                break;
            }
            GLF_live4looplimiter0++;
            {
                if (GLF_live4data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live4i, 10)] < _GLF_IDENTITY(GLF_live4data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live4j, 10)], ~(_GLF_IDENTITY(_GLF_IDENTITY(~(GLF_live4data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live4j, 10)]), min(~(GLF_live4data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live4j, 10)]), ~(GLF_live4data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live4j, 10)]))), 0 ^ (_GLF_IDENTITY(~(GLF_live4data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live4j, 10)]), min(~(GLF_live4data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live4j, 10)]), ~(GLF_live4data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live4j, 10)])))))))) {
                    GLF_live4temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live4k++, 10)] = GLF_live4data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live4i++, 10)];
                } else {
                    _GLF_IDENTITY(GLF_live4temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live4k++, 10)] = GLF_live4data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live4j++, 10)], (GLF_live4temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live4k++, 10)] = GLF_live4data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live4j++, 10)]) * 1);
                    {
                        int GLF_live5looplimiter0 = 0;
                        if (GLF_live5looplimiter0 >= 7) {
                            ;
                        }
                    }
                }
            }
        }
    }
    {
        int GLF_live4looplimiter1 = 0;
        while (GLF_live4i < _GLF_IDENTITY(_GLF_IDENTITY(GLF_live4N, (_GLF_IDENTITY(GLF_live4N, (true ? GLF_live4N : _GLF_FUZZED(GLF_live4k)))) ^ 0), (_GLF_IDENTITY(GLF_live4N, (_GLF_IDENTITY(_GLF_IDENTITY(GLF_live4N, (true ? GLF_live4N : _GLF_FUZZED(GLF_live4k))), ~(~(_GLF_IDENTITY(_GLF_IDENTITY(GLF_live4N, (true ? GLF_live4N : _GLF_FUZZED(GLF_live4k))), min(_GLF_IDENTITY(_GLF_IDENTITY(GLF_live4N, (true ? GLF_live4N : _GLF_FUZZED(GLF_live4k))), (_GLF_IDENTITY(GLF_live4N, (true ? GLF_live4N : _GLF_FUZZED(GLF_live4k)))) * 1), _GLF_IDENTITY(GLF_live4N, (true ? GLF_live4N : _GLF_FUZZED(GLF_live4k))))))))) ^ 0)) ^ 0) && GLF_live4i <= GLF_live4mid) {
            if (GLF_live4looplimiter1 >= 6) {
                break;
            }
            GLF_live4looplimiter1++;
            {
                {
                    int GLF_live28i = _GLF_FUZZED(-5498);
                    if (GLF_live28i >= int(GLF_live28resolution.x)) {
                        ;
                    }
                }
                vec2 GLF_live9a = _GLF_FUZZED(vec2(-6101.9742, 2.5));
                float GLF_live9th = _GLF_FUZZED(((-3137.3501) * (-179.851)));
                if (GLF_live9a.y < GLF_live9a.x) {
                    _GLF_IDENTITY(GLF_live9th = 0.5 - GLF_live9th, (GLF_live9th = 0.5 - _GLF_IDENTITY(GLF_live9th, mix(float(_GLF_IDENTITY(GLF_live9th, float(mat4x2(GLF_live9th, sqrt(1.0), 1.0, 1.0, 1.0, log(1.0), 1.0, 1.0)))), float(_GLF_FUZZED(53.49)), bool(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))))) - 0.0);
                }
            }
            {
                GLF_live4temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live4k++, 10)] = GLF_live4data[_GLF_IDENTITY(_GLF_MAKE_IN_BOUNDS_INT(GLF_live4i++, 10), (_GLF_MAKE_IN_BOUNDS_INT(GLF_live4i++, 10)) + _GLF_IDENTITY((0 >> _GLF_IDENTITY(int(7), int(7))), ((0 >> _GLF_IDENTITY(int(7), int(7)))) / 1))];
            }
        }
    }
    {
        int GLF_live4looplimiter2 = 0;
        {
            float GLF_live9th = _GLF_FUZZED(-5277.3307);
            {
                _GLF_IDENTITY(GLF_live9th = 1.0 - GLF_live9th, (GLF_live9th = 1.0 - GLF_live9th) - 0.0);
            }
        }
        for (int GLF_live4i = GLF_live4from; GLF_live4i <= GLF_live4to; GLF_live4i++) {
            if (GLF_live4looplimiter2 >= 6) {
                break;
            }
            GLF_live4looplimiter2++;
            {
                GLF_live4data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live4i, 10)] = GLF_live4temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live4i, 10)];
            }
        }
    }
    {
        float GLF_live17result = _GLF_FUZZED(-4673.3722);
        {
            GLF_live17result += 100.0;
        }
    }
}

const int GLF_live2dp[256] = int[256](115, 133, 150, 164, 176, 184, 190, _GLF_IDENTITY(192, (false ? _GLF_FUZZED(-33863) : 192)), 191, 187, 181, 172, 163, 153, 143, 134, 126, 120, 116, 114, 114, 117, 121, 127, _GLF_IDENTITY(134, int(ivec4(134, _GLF_IDENTITY(0, clamp(0, 0, 0)), 1, 1))), 141, 148, 154, 159, 162, _GLF_IDENTITY(163, ~(_GLF_IDENTITY(~(163), (~(163)) << 0))), 161, 157, 151, 143, _GLF_IDENTITY(134, (false ? _GLF_FUZZED((((-41834) & GLF_live4N) | (-41428))) : 134)), 124, 113, 103, 94, 87, 82, 79, 80, 84, 91, 101, 114, 130, 146, 164, 182, 199, 215, 229, 240, 249, _GLF_IDENTITY(254, (false ? _GLF_FUZZED((-GLF_live4N)) : 254)), 256, 254, 250, 243, 233, 223, 212, _GLF_IDENTITY(200, max(200, _GLF_IDENTITY(200, (200) + (0 & 50143)))), 190, 180, 172, 166, 163, _GLF_IDENTITY(161, (false ? _GLF_FUZZED(GLF_live4N) : 161)), 162, 164, 169, 174, 179, 185, 190, 193, 195, 195, 192, 188, 180, 171, 161, 149, 137, _GLF_IDENTITY(125, (125) / 1), 114, 105, 97, 93, 91, 93, 98, 106, 117, 130, 145, 161, 177, 193, 208, 221, 231, 239, 243, 244, 242, 236, 228, 218, 207, 194, 181, 169, 158, 148, 141, 135, 132, 131, 132, 135, 138, _GLF_IDENTITY(143, _GLF_IDENTITY((0 | 0) | (_GLF_IDENTITY(143, _GLF_IDENTITY((_GLF_IDENTITY(143, (143) * 1)), int(_GLF_IDENTITY(int(_GLF_IDENTITY((_GLF_IDENTITY(143, (143) * 1)), max((_GLF_IDENTITY(143, (143) * 1)), (_GLF_IDENTITY(143, (143) * 1))))), (_GLF_IDENTITY(int(_GLF_IDENTITY((_GLF_IDENTITY(143, (143) * 1)), max((_GLF_IDENTITY(143, (143) * 1)), (_GLF_IDENTITY(143, (143) * 1))))), (int(_GLF_IDENTITY((_GLF_IDENTITY(143, (143) * 1)), max((_GLF_IDENTITY(143, (143) * _GLF_IDENTITY(1, (false ? _GLF_FUZZED(53578) : 1)))), (_GLF_IDENTITY(143, (143) * 1)))))) / 1)) + 0))) * _GLF_IDENTITY(1, max(_GLF_IDENTITY(1, (1) | (1)), 1)))), (false ? _GLF_FUZZED(GLF_live4N) : ((0 | 0) | (_GLF_IDENTITY(143, _GLF_IDENTITY((_GLF_IDENTITY(143, (143) * 1)), int(_GLF_IDENTITY(int(_GLF_IDENTITY((_GLF_IDENTITY(143, (143) * 1)), max((_GLF_IDENTITY(143, (143) * 1)), (_GLF_IDENTITY(143, (143) * 1))))), (_GLF_IDENTITY(int(_GLF_IDENTITY((_GLF_IDENTITY(143, (143) * 1)), max((_GLF_IDENTITY(143, (143) * 1)), (_GLF_IDENTITY(143, (143) * 1))))), (int(_GLF_IDENTITY((_GLF_IDENTITY(143, (143) * 1)), max((_GLF_IDENTITY(143, (143) * _GLF_IDENTITY(1, (false ? _GLF_FUZZED(53578) : 1)))), (_GLF_IDENTITY(143, (143) * 1)))))) / 1)) + 0))) * _GLF_IDENTITY(1, max(_GLF_IDENTITY(1, (1) | (1)), 1)))))))), 147, _GLF_IDENTITY(151, min(151, 151)), 154, 155, _GLF_IDENTITY(155, 1 * (155)), 152, 146, 139, 129, 118, 106, 93, 80, 68, 58, 49, 43, 40, 41, 44, 51, 61, 73, 87, 103, 119, 134, 149, 162, 173, 181, 186, 188, 186, 181, 174, 164, 153, 141, 128, 116, 104, 94, 86, 81, 77, 76, 77, 80, 84, 89, 94, 98, 102, 104, 104, 102, 98, 92, 83, 73, 62, 50, 38, 26, 16, 8, 2, 0, 0, _GLF_IDENTITY(4, (4) | (4)), _GLF_IDENTITY(11, ~(~(_GLF_IDENTITY(11, (11) >> 0)))), 21, _GLF_IDENTITY(33, (33) | (33)), 48, 64, 81, 98, 114, 129, 141, 151, _GLF_IDENTITY(158, (false ? _GLF_FUZZED((~(-75211))) : 158)), _GLF_IDENTITY(161, _GLF_IDENTITY(0 ^ (161), clamp(_GLF_IDENTITY(0 ^ (161), (0 ^ (161)) ^ 0), 0 ^ (161), 0 ^ (161)))), 161, 158, 152, 144, 134, 123, 112, 100, 90, 81, 73, 68, 65, 65, 67, 70, 75, 81, 87, 92, 97, _GLF_IDENTITY(101, (_GLF_IDENTITY(101, _GLF_IDENTITY((101), min((101), (101))) << 0)) * ((1 << _GLF_IDENTITY(int(3), int(3))) >> _GLF_IDENTITY(int(3), int(3)))), 103, 102, 100, 95, 88, 79, 69, 58, 47, 36, 26, 18, 13, 11, 11, 15, 22, 32, 45, 60, 77, 94);
const int GLF_live1dp[256] = int[256](115, 133, 150, 164, 176, 184, 190, 192, 191, 187, 181, 172, 163, 153, 143, _GLF_IDENTITY(134, max(134, _GLF_IDENTITY(134, ~(~(134))))), 126, 120, 116, _GLF_IDENTITY(_GLF_IDENTITY(114, (114) | (114)), min(_GLF_IDENTITY(114, (114) | (114)), _GLF_IDENTITY(114, (114) | (114)))), 114, 117, 121, 127, 134, 141, 148, _GLF_IDENTITY(154, int(_GLF_IDENTITY(ivec3(154, 1, 1), (ivec3(154, _GLF_IDENTITY(1, min(1, _GLF_IDENTITY(1, max(_GLF_IDENTITY(1, (1) | (1)), 1)))), _GLF_IDENTITY(1, (1) - 0))) + ivec3(0, 0, 0)))), 159, 162, 163, 161, 157, 151, 143, 134, 124, 113, 103, 94, 87, 82, 79, 80, 84, 91, 101, _GLF_IDENTITY(114, (114) + 0), 130, 146, 164, 182, 199, 215, 229, 240, 249, 254, 256, 254, 250, 243, 233, 223, _GLF_IDENTITY(212, clamp(212, _GLF_IDENTITY(212, (212) | 0), 212)), 200, 190, 180, 172, 166, 163, 161, _GLF_IDENTITY(_GLF_IDENTITY(162, (0 >> _GLF_IDENTITY(int(0), _GLF_IDENTITY(int(0), clamp(int(0), int(0), int(0))))) ^ (162)), clamp(_GLF_IDENTITY(162, (0 >> _GLF_IDENTITY(int(0), _GLF_IDENTITY(int(0), clamp(int(0), int(0), int(0))))) ^ (162)), _GLF_IDENTITY(162, (0 >> _GLF_IDENTITY(int(0), _GLF_IDENTITY(_GLF_IDENTITY(int(0), clamp(int(0), int(0), int(0))), (_GLF_IDENTITY(int(0), clamp(int(0), _GLF_IDENTITY(int(0), ~(~(int(0)))), int(_GLF_IDENTITY(0, (0) - 0))))) - 0))) ^ (162)), _GLF_IDENTITY(_GLF_IDENTITY(162, (0 >> _GLF_IDENTITY(int(0), _GLF_IDENTITY(int(0), clamp(int(0), int(0), int(0))))) ^ (162)), (_GLF_IDENTITY(162, _GLF_IDENTITY((0 >> _GLF_IDENTITY(int(0), _GLF_IDENTITY(int(0), clamp(int(_GLF_IDENTITY(0, clamp(_GLF_IDENTITY(0, clamp(0, 0, _GLF_IDENTITY(0, ~(~(0))))), 0, _GLF_IDENTITY(0, ~(~(0)))))), int(0), _GLF_IDENTITY(int(0), ~(~(int(0)))))))), (0 << _GLF_IDENTITY(int(7), int(7))) ^ ((0 >> _GLF_IDENTITY(int(0), _GLF_IDENTITY(int(0), clamp(int(_GLF_IDENTITY(0, clamp(_GLF_IDENTITY(0, clamp(0, 0, _GLF_IDENTITY(0, ~(~(0))))), 0, _GLF_IDENTITY(0, ~(~(0)))))), int(0), _GLF_IDENTITY(int(0), ~(~(int(0)))))))))) ^ (162))) | 0))), 164, _GLF_IDENTITY(169, (169) - 0), 174, _GLF_IDENTITY(179, (_GLF_IDENTITY(179, (true ? 179 : _GLF_FUZZED(-98413)))) - _GLF_IDENTITY((0 << _GLF_IDENTITY(int(0), int(0))), (false ? _GLF_FUZZED(-51162) : (0 << _GLF_IDENTITY(int(0), int(0)))))), 185, 190, 193, 195, 195, 192, 188, 180, 171, 161, 149, 137, 125, 114, 105, 97, 93, 91, _GLF_IDENTITY(_GLF_IDENTITY(93, (_GLF_IDENTITY(93, ~(~(93)))) | 0), int(_GLF_IDENTITY(ivec2(_GLF_IDENTITY(93, (_GLF_IDENTITY(93, ~(~(93)))) | 0), 0), (_GLF_IDENTITY(ivec2(_GLF_IDENTITY(93, (_GLF_IDENTITY(93, ~(~(93)))) | 0), 0), _GLF_IDENTITY((false ? _GLF_FUZZED(ivec2(-64305, 32389)) : ivec2(_GLF_IDENTITY(93, (_GLF_IDENTITY(93, ~(~(93)))) | 0), 0)), ((false ? _GLF_FUZZED(ivec2(-64305, 32389)) : ivec2(_GLF_IDENTITY(93, (_GLF_IDENTITY(93, ~(~(93)))) | 0), 0))) - ivec2(0, 0)))) * ivec2(1, 1)))), 98, 106, 117, 130, _GLF_IDENTITY(145, (145) | (_GLF_IDENTITY(145, (145) / 1))), 161, 177, 193, 208, 221, 231, 239, 243, 244, 242, 236, 228, 218, 207, 194, 181, 169, 158, 148, 141, 135, 132, 131, 132, 135, 138, _GLF_IDENTITY(143, (143) | (143)), 147, 151, 154, _GLF_IDENTITY(155, max(155, 155)), _GLF_IDENTITY(155, 0 | (155)), 152, 146, 139, 129, _GLF_IDENTITY(118, _GLF_IDENTITY(int(ivec3(118, 0, 0)), 0 ^ (int(ivec3(118, 0, 0))))), 106, 93, 80, _GLF_IDENTITY(68, 0 ^ (68)), 58, 49, 43, 40, 41, 44, 51, 61, 73, _GLF_IDENTITY(87, _GLF_IDENTITY(1, (1) - 0) * (87)), 103, 119, 134, 149, 162, _GLF_IDENTITY(173, _GLF_IDENTITY(int(ivec3(173, 1, 0)), (int(ivec3(173, _GLF_IDENTITY(1, (_GLF_IDENTITY(1, 0 | (1))) - 0), 0))) | (int(ivec3(173, 1, 0))))), 181, 186, 188, 186, 181, 174, 164, 153, _GLF_IDENTITY(141, (_GLF_IDENTITY(141, (_GLF_IDENTITY(141, (_GLF_IDENTITY(141, 1 * (141))) ^ (0 & GLF_live4N))) | _GLF_IDENTITY((141), ((141)) - 0))) | 0), 128, 116, 104, 94, 86, 81, 77, 76, 77, 80, 84, 89, 94, 98, 102, 104, 104, 102, 98, 92, 83, 73, 62, 50, _GLF_IDENTITY(38, max(38, 38)), 26, 16, 8, 2, 0, 0, 4, 11, 21, 33, 48, 64, 81, _GLF_IDENTITY(98, min(98, 98)), 114, 129, _GLF_IDENTITY(141, (false ? _GLF_FUZZED((GLF_live4N | GLF_live4N)) : 141)), 151, 158, 161, 161, 158, 152, 144, 134, 123, 112, 100, 90, 81, 73, 68, 65, 65, 67, 70, 75, 81, 87, 92, 97, _GLF_IDENTITY(101, (101) / 1), 103, 102, 100, 95, 88, 79, 69, 58, 47, 36, 26, 18, 13, 11, _GLF_IDENTITY(11, _GLF_IDENTITY((11) * 1, (_GLF_IDENTITY((11) * 1, clamp((11) * _GLF_IDENTITY(1, int(_GLF_IDENTITY(ivec4(1, 1, 1, 1), min(ivec4(1, 1, 1, 1), _GLF_IDENTITY(ivec4(1, 1, 1, 1), (false ? _GLF_FUZZED(ivec4(60607, 63581, -68596, -13838)) : ivec4(1, 1, 1, 1))))))), _GLF_IDENTITY((11) * 1, clamp((11) * 1, _GLF_IDENTITY((11), ((11)) | 0) * _GLF_IDENTITY(1, (1) | (1)), (11) * 1)), (11) * 1))) | ((11) * 1))), 15, _GLF_IDENTITY(22, (_GLF_IDENTITY(true ? _GLF_IDENTITY(22, clamp(22, 22, _GLF_IDENTITY(22, (22) << 0))) : _GLF_FUZZED(GLF_live4N), (true ? _GLF_IDENTITY(22, clamp(22, 22, _GLF_IDENTITY(22, (22) << 0))) : _GLF_FUZZED(GLF_live4N)) | 0))), 32, 45, 60, 77, 94);
layout(location = 0) out vec4 _GLF_color;

layout(set = 0, binding = 0) uniform buf0 {
    vec2 injectionSwitch;
};

layout(set = 0, binding = 1) uniform buf1 {
    vec2 resolution;
};

struct BinarySearchObject {
    int prime_numbers[10];
};

vec2 brick(vec2 uv) {
    int a = 4;
    do {
        {
            int GLF_live22i = _GLF_FUZZED((55823 + 74173));
            int GLF_live22j = _GLF_FUZZED(95244);
            if (GLF_live22j < GLF_live22i + 1) {
                ;
            }
        }
        uv.y -= step(injectionSwitch.y, uv.x);
        {
            vec2 GLF_live0coord = _GLF_FUZZED(vec2(-6.9, -_GLF_IDENTITY(5136.1009, clamp(5136.1009, 5136.1009, 5136.1009))));
            int GLF_live0i = _GLF_FUZZED(-58732);
            int GLF_live0looplimiter0 = 0;
            while (GLF_live0i < 1 && _GLF_IDENTITY(GLF_live0coord.x, clamp(_GLF_IDENTITY(GLF_live0coord.x, float(mat3x4(GLF_live0coord.x, 0.0, 1.0, 1.0, 1.0, abs(1.0), log(1.0), 1.0, 0.0, 1.0, _GLF_IDENTITY(0.0, clamp(0.0, _GLF_IDENTITY(0.0, (_GLF_IDENTITY(true, !(!(_GLF_IDENTITY(true, (true) && true)))) ? 0.0 : _GLF_FUZZED(GLF_live12s_g))), 0.0)), 1.0))), GLF_live0coord.x, GLF_live0coord.x)) > 1.0 || _GLF_IDENTITY(GLF_live0coord.y, mix(float(_GLF_FUZZED(float(_GLF_IDENTITY(93925u, ~(_GLF_IDENTITY(~(_GLF_IDENTITY(93925u, clamp(93925u, 93925u, 93925u))), min(~(_GLF_IDENTITY(93925u, _GLF_IDENTITY(clamp(93925u, 93925u, 93925u), (0u << _GLF_IDENTITY(uint(2u), uint(2u))) + (clamp(93925u, 93925u, 93925u))))), ~(_GLF_IDENTITY(93925u, clamp(93925u, 93925u, 93925u)))))))))), float(GLF_live0coord.y), bool(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y))))) > 1.0) {
                if (_GLF_IDENTITY(GLF_live0looplimiter0 >= 4, true && (_GLF_IDENTITY(GLF_live0looplimiter0 >= 4, _GLF_FALSE(false, (gl_FragCoord.y < 0.0)) || (GLF_live0looplimiter0 >= 4))))) {
                    break;
                }
                GLF_live0looplimiter0++;
                {
                    if (_GLF_IDENTITY(GLF_live0coord.x > 1.0, !(_GLF_IDENTITY(!(GLF_live0coord.x > 1.0), true && (!(GLF_live0coord.x > 1.0))))))
                        GLF_live0coord.x -= 1.0;
                    if (GLF_live0coord.y > 1.0)
                        _GLF_IDENTITY(GLF_live0coord.y -= 1.0, (_GLF_IDENTITY(GLF_live0coord.y -= 1.0, (true ? (GLF_live0coord.y -= 1.0) : _GLF_FUZZED(GLF_live12h_r)))) / cos(0.0));
                    GLF_live0coord *= 2.0;
                    GLF_live0i++;
                }
                {
                    int GLF_live2looplimiter0 = 0;
                    ivec2 GLF_live2pos = _GLF_FUZZED(ivec2(8517, -11566));
                    while (_GLF_IDENTITY(GLF_live2pos.y != 256, !(_GLF_IDENTITY(!(GLF_live2pos.y != 256), true && (!(GLF_live2pos.y != 256)))))) {
                        if (GLF_live2looplimiter0 >= _GLF_IDENTITY(7, (7) | (7))) {
                            {
                                vec2 GLF_live12center = _GLF_FUZZED((_GLF_IDENTITY(vec4(-9.3, 74.17, -5.3, 7.4) * mat2x4(7957.0182, 33.45, -6282.1179, -6.1, -8.7, -4.8, 9.5, -_GLF_IDENTITY(85.35, clamp(85.35, _GLF_IDENTITY(85.35, min(85.35, 85.35)), 85.35))), clamp(_GLF_IDENTITY(vec4(-9.3, 74.17, -5.3, 7.4) * mat2x4(7957.0182, 33.45, -6282.1179, -6.1, -8.7, -4.8, 9.5, -_GLF_IDENTITY(85.35, clamp(85.35, _GLF_IDENTITY(85.35, min(85.35, 85.35)), 85.35))), vec2(mat2(_GLF_IDENTITY(vec4(-9.3, 74.17, -5.3, 7.4) * mat2x4(7957.0182, 33.45, -6282.1179, -6.1, -8.7, -4.8, 9.5, -_GLF_IDENTITY(85.35, clamp(85.35, _GLF_IDENTITY(85.35, min(85.35, 85.35)), 85.35))), vec2(vec3(vec4(-9.3, 74.17, -5.3, 7.4) * mat2x4(7957.0182, 33.45, -6282.1179, -6.1, -8.7, -4.8, 9.5, -_GLF_IDENTITY(85.35, clamp(85.35, _GLF_IDENTITY(_GLF_IDENTITY(_GLF_IDENTITY(85.35, min(85.35, 85.35)), min(_GLF_IDENTITY(_GLF_IDENTITY(85.35, min(85.35, 85.35)), (true ? _GLF_IDENTITY(_GLF_IDENTITY(85.35, min(85.35, 85.35)), (_GLF_IDENTITY(85.35, min(85.35, 85.35))) * 1.0) : _GLF_FUZZED(GLF_live12s_g))), _GLF_IDENTITY(_GLF_IDENTITY(85.35, min(85.35, 85.35)), (_GLF_IDENTITY(85.35, min(85.35, 85.35))) / 1.0))), mix(float(_GLF_IDENTITY(_GLF_IDENTITY(85.35, min(85.35, 85.35)), min(_GLF_IDENTITY(_GLF_IDENTITY(85.35, min(85.35, 85.35)), (true ? _GLF_IDENTITY(_GLF_IDENTITY(85.35, min(85.35, 85.35)), (_GLF_IDENTITY(85.35, min(85.35, 85.35))) * 1.0) : _GLF_FUZZED(GLF_live12s_g))), _GLF_IDENTITY(_GLF_IDENTITY(85.35, min(85.35, 85.35)), (_GLF_IDENTITY(85.35, min(85.35, 85.35))) / 1.0)))), float(_GLF_FUZZED(vec3(993.424, 1.0, -141.668).x)), bool(false))), 85.35))), 1.0))), 1.0, _GLF_IDENTITY(0.0, max(0.0, 0.0))))), _GLF_IDENTITY(vec4(-9.3, 74.17, -5.3, 7.4) * mat2x4(7957.0182, 33.45, -6282.1179, -6.1, -8.7, -4.8, 9.5, -_GLF_IDENTITY(85.35, clamp(85.35, _GLF_IDENTITY(85.35, min(85.35, 85.35)), 85.35))), (vec4(-9.3, 74.17, -5.3, 7.4) * mat2x4(7957.0182, 33.45, -6282.1179, -6.1, -8.7, -4.8, 9.5, -_GLF_IDENTITY(85.35, clamp(85.35, _GLF_IDENTITY(85.35, min(85.35, 85.35)), 85.35)))) - vec2(0.0, 0.0)), vec4(-9.3, 74.17, -5.3, 7.4) * mat2x4(7957.0182, 33.45, -_GLF_IDENTITY(6282.1179, max(6282.1179, _GLF_IDENTITY(6282.1179, float(mat4(_GLF_IDENTITY(_GLF_IDENTITY(6282.1179, clamp(6282.1179, 6282.1179, 6282.1179)), clamp(_GLF_IDENTITY(6282.1179, clamp(6282.1179, 6282.1179, 6282.1179)), _GLF_IDENTITY(6282.1179, clamp(6282.1179, 6282.1179, 6282.1179)), _GLF_IDENTITY(6282.1179, clamp(6282.1179, 6282.1179, 6282.1179)))), 0.0, sin(0.0), 1.0, _GLF_IDENTITY(1.0, float(mat3x2(1.0, 0.0, 0.0, 1.0, 1.0, 1.0))), 0.0, 1.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, _GLF_IDENTITY(1.0, mix(float(1.0), float(_GLF_FUZZED(-5.6)), bool(false))), 1.0, 1.0))))), -6.1, -8.7, -4.8, _GLF_IDENTITY(9.5, max(9.5, _GLF_IDENTITY(9.5, (true ? _GLF_IDENTITY(9.5, max(9.5, 9.5)) : _GLF_FUZZED(GLF_live12h_r))))), -_GLF_IDENTITY(85.35, clamp(85.35, _GLF_IDENTITY(85.35, min(85.35, 85.35)), 85.35)))))));
                                int GLF_live12i = _GLF_FUZZED(ivec2(_GLF_IDENTITY(-79759, ~(_GLF_IDENTITY(~(_GLF_IDENTITY(-79759, clamp(-79759, _GLF_IDENTITY(-79759, (false ? _GLF_FUZZED(GLF_live0looplimiter0) : (-79759))), -79759))), clamp(~(_GLF_IDENTITY(-79759, clamp(-79759, _GLF_IDENTITY(-79759, (false ? _GLF_FUZZED(GLF_live0looplimiter0) : (-79759))), -79759))), ~(_GLF_IDENTITY(-79759, clamp(-79759, _GLF_IDENTITY(-79759, (false ? _GLF_FUZZED(GLF_live0looplimiter0) : (-79759))), -79759))), _GLF_IDENTITY(~(_GLF_IDENTITY(-79759, clamp(-79759, _GLF_IDENTITY(-79759, (false ? _GLF_FUZZED(GLF_live0looplimiter0) : (-79759))), -79759))), clamp(~(_GLF_IDENTITY(-79759, clamp(-79759, _GLF_IDENTITY(-79759, (false ? _GLF_FUZZED(GLF_live0looplimiter0) : (-79759))), -79759))), ~(_GLF_IDENTITY(-79759, clamp(_GLF_IDENTITY(-79759, ~(~(-79759))), _GLF_IDENTITY(-79759, (false ? _GLF_FUZZED(GLF_live0looplimiter0) : (-79759))), -79759))), ~(_GLF_IDENTITY(-79759, _GLF_IDENTITY(clamp(-79759, _GLF_IDENTITY(-79759, (false ? _GLF_FUZZED(GLF_live0looplimiter0) : (-79759))), -79759), (clamp(-79759, _GLF_IDENTITY(-79759, (false ? _GLF_FUZZED(GLF_live0looplimiter0) : (-79759))), -79759)) | 0))))))))), -2893).r);
                                int GLF_live12msb8 = _GLF_FUZZED((96867));
                                vec2 GLF_live12position = _GLF_FUZZED(vec2(_GLF_IDENTITY(-8.7, (_GLF_IDENTITY(-8.7, mix(float(_GLF_FUZZED(-120.940)), float(-8.7), bool(true)))) - 0.0), 7.3));
                                vec3 GLF_live12result = _GLF_FUZZED((mat3(_GLF_IDENTITY(-8.1, mix(float(-8.1), float(_GLF_FUZZED(-6.2)), bool(false))), -2475.6981, _GLF_IDENTITY(7096.0466, clamp(_GLF_IDENTITY(7096.0466, (7096.0466) + 0.0), 7096.0466, 7096.0466)), -7.7, 0.5, 86.53, _GLF_IDENTITY(-1.0, clamp(-1.0, _GLF_IDENTITY(-1.0, (false ? _GLF_FUZZED(-3181.9074) : (-1.0))), -1.0)), -841.035, -4.3) * vec3(617.632, -3.7, -602.563)));
                                {
                                    vec3 GLF_live12d = _GLF_FUZZED(atan(vec3(3.3, -6556.6588, -367.900), vec3(-0.7, _GLF_IDENTITY(-5.3, 1.0 * (-5.3)), 37.03)));
                                    GLF_live12d = GLF_live12drawShape(GLF_live12position, GLF_live12center + vec2(sin(float(GLF_live12i) / (float(bitCount(GLF_live12msb8)) * 10.0) + GLF_live12time) / 4.0 * float(bitCount(GLF_live12msb8)), float(bitfieldExtract(int(_GLF_IDENTITY(GLF_live12resolution.x, (GLF_live12resolution.x) - 0.0)), 0, 0))), vec3(0.01 + sin(float(GLF_live12i) / 100.0 * _GLF_IDENTITY(float(bitCount(GLF_live12msb8)), mix(float(float(bitCount(GLF_live12msb8))), float(_GLF_FUZZED(96.27)), bool(false)))), 0.01, float(GLF_live12i)));
                                    if (_GLF_IDENTITY(length(GLF_live12d) <= float(bitfieldExtract(int(GLF_live12resolution.x), 0, 0)), true && (length(GLF_live12d) <= float(bitfieldExtract(int(GLF_live12resolution.x), 0, 0))))) {
                                        ;
                                    }
                                    GLF_live12result = vec3(GLF_live12d);
                                }
                            }
                            break;
                        }
                        {
                            bool GLF_live27c1 = _GLF_FUZZED((bvec4(bvec3(true, false, false), true) == bvec4(true, true, false, false)));
                            if (!GLF_live27c1) {
                                ;
                            }
                        }
                        GLF_live2looplimiter0++;
                        {
                            {
                                vec2 GLF_live27pos = _GLF_FUZZED(vec2(355.823, -4.2));
                                vec3 GLF_live27setting = _GLF_FUZZED((((-16.53) * 2449.2777) * vec3(-75.10, vec2(428.570, -9516.6593))));
                                {
                                    ;
                                }
                            }
                            if (GLF_live2pos.x < _GLF_IDENTITY(GLF_live2dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live2pos.y, 256)] + 15, min(_GLF_IDENTITY(_GLF_IDENTITY(GLF_live2dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live2pos.y, 256)] + 15, _GLF_IDENTITY(0 | (GLF_live2dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live2pos.y, 256)] + 15), int(ivec4(0 | (GLF_live2dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live2pos.y, 256)] + 15), (_GLF_IDENTITY(0 & GLF_live4N, max(0 & GLF_live4N, _GLF_IDENTITY(0 & GLF_live4N, (0 & GLF_live4N) | 0)))), (_GLF_IDENTITY(0 << _GLF_IDENTITY(int(0), int(0)), (0 << _GLF_IDENTITY(int(0), int(0))) / 1)), 0)))), ~(~(_GLF_IDENTITY(GLF_live2dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live2pos.y, 256)] + 15, _GLF_IDENTITY(0 | (GLF_live2dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live2pos.y, 256)] + 15), int(ivec4(0 | (GLF_live2dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live2pos.y, 256)] + 15), (_GLF_IDENTITY(0 & GLF_live4N, max(0 & GLF_live4N, _GLF_IDENTITY(0 & GLF_live4N, (0 & GLF_live4N) | 0)))), (_GLF_IDENTITY(0 << _GLF_IDENTITY(int(0), int(0)), (0 << _GLF_IDENTITY(int(0), int(0))) / 1)), 0))))))), GLF_live2dp[_GLF_IDENTITY(_GLF_MAKE_IN_BOUNDS_INT(GLF_live2pos.y, 256), _GLF_IDENTITY(int(int(_GLF_MAKE_IN_BOUNDS_INT(GLF_live2pos.y, 256))), int(int(int(int(_GLF_MAKE_IN_BOUNDS_INT(GLF_live2pos.y, 256)))))))] + 15)) && GLF_live2pos.x > GLF_live2dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live2pos.y, 256)] - 15) {
                                float GLF_live2p = (15.0 - abs(float(GLF_live2pos.x - GLF_live2dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live2pos.y, 256)]))) / 15.0;
                                ;
                            }
                            GLF_live2pos.y++;
                            {
                                int GLF_live13v = _GLF_IDENTITY(_GLF_FUZZED(66581), (false ? _GLF_FUZZED(GLF_live4N) : _GLF_FUZZED(66581)));
                                {
                                    vec2 GLF_live24coord = _GLF_FUZZED((vec3(-9430.0005, -2251.7388, -534.854) * mat2x3(689.964, -8.2, 832.872, 5.9, 74.10, -69.66)));
                                    int GLF_live24i = _GLF_FUZZED(((false ? _GLF_IDENTITY(55807, (false ? _GLF_FUZZED(GLF_live2looplimiter0) : 55807)) : 26216) * 74675));
                                    vec4 GLF_live24texel = _GLF_FUZZED((2803.9982 * vec4(8.2, 8400.9582, -293.371, 40.62)));
                                    {
                                        int GLF_live24looplimiter0 = 0;
                                        while (GLF_live24texel.x + GLF_live24texel.y + GLF_live24texel.z > 1.0 && GLF_live24i < 16) {
                                            if (GLF_live24looplimiter0 >= 3) {
                                                break;
                                            }
                                            GLF_live24looplimiter0++;
                                            {
                                                GLF_live24coord = _GLF_IDENTITY(GLF_live24texel.xz, mix(vec2(_GLF_FUZZED(78.07), _GLF_FUZZED(((-5.7) + (-9.6)))), vec2(_GLF_IDENTITY((GLF_live24texel.xz)[0], float(_GLF_IDENTITY(mat2x3((GLF_live24texel.xz)[0], 1.0, sqrt(1.0), 0.0, 1.0, 0.0), mat3(1.0) * (mat2x3((GLF_live24texel.xz)[0], 1.0, sqrt(1.0), 0.0, 1.0, 0.0))))), (GLF_live24texel.xz)[1]), bvec2(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)), true))) + GLF_live24texel.yy;
                                                GLF_live24coord = floor(GLF_live24coord * 256.0) / 256.0;
                                                GLF_live24texel = texture(GLF_live24tex, GLF_live24coord);
                                                GLF_live24i++;
                                                {
                                                    {
                                                        ;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                                if ((GLF_live13v & 1) == 1) {
                                    GLF_live13v = 3 * GLF_live13v + 1;
                                } else {
                                    GLF_live13v /= _GLF_IDENTITY(2, ~(~(2)));
                                }
                            }
                        }
                    }
                }
            }
        }
        uv.x -= fract(tanh(uv.x)) / _GLF_IDENTITY(ldexp(injectionSwitch.y, _GLF_IDENTITY(findMSB(a), (findMSB(a)) ^ 0)), mix(float(ldexp(injectionSwitch.y, _GLF_IDENTITY(findMSB(a), (findMSB(a)) ^ 0))), float(_GLF_FUZZED(332.657)), bool(false)));
        {
            int GLF_live5i = _GLF_FUZZED(-87383);
            int GLF_live5looplimiter0 = 0;
            vec2 GLF_live5pos = _GLF_FUZZED(vec2(-430.498, 56.80));
            vec4 GLF_live5res = _GLF_FUZZED(vec4(-2.0, 1112.7852, -2987.7961, -2.0));
            {
                if (GLF_live5looplimiter0 >= 7) {
                    ;
                }
                GLF_live5looplimiter0++;
                {
                    vec2 GLF_live12center = _GLF_FUZZED(vec2(6.9, 697.082));
                    int GLF_live12i = _GLF_FUZZED(-88509);
                    int GLF_live12looplimiter0 = 0;
                    int GLF_live12msb8 = _GLF_FUZZED(-5521);
                    vec2 GLF_live12position = _GLF_FUZZED((vec2(9.3, -884.475) * mat2(-1.6, -7.6, _GLF_IDENTITY(9.7, (9.7) - 0.0), 171.070)));
                    vec3 GLF_live12result = _GLF_FUZZED(((-0.5) - vec3(-_GLF_IDENTITY(7488.8562, (_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)) ? _GLF_IDENTITY(7488.8562, clamp(7488.8562, 7488.8562, 7488.8562)) : _GLF_FUZZED(GLF_live12s_g))), 9.2, -8.2)));
                    {
                        if (GLF_live12looplimiter0 >= 3) {
                            ;
                        }
                        GLF_live12looplimiter0++;
                        {
                            vec3 GLF_live12d = _GLF_FUZZED(atan(vec3(3.3, -6556.6588, -367.900), vec3(-0.7, -5.3, 37.03)));
                            GLF_live12d = GLF_live12drawShape(GLF_live12position, GLF_live12center + vec2(sin(float(GLF_live12i) / _GLF_IDENTITY((float(bitCount(GLF_live12msb8)) * 10.0), max((float(bitCount(GLF_live12msb8)) * 10.0), _GLF_IDENTITY((float(bitCount(GLF_live12msb8)) * 10.0), (true ? (float(bitCount(GLF_live12msb8)) * 10.0) : _GLF_FUZZED(GLF_live12s_g))))) + GLF_live12time) / 4.0 * float(bitCount(GLF_live12msb8)), float(bitfieldExtract(int(_GLF_IDENTITY(_GLF_IDENTITY(GLF_live12resolution, max(GLF_live12resolution, GLF_live12resolution)).x, min(_GLF_IDENTITY(GLF_live12resolution, max(GLF_live12resolution, GLF_live12resolution)).x, _GLF_IDENTITY(GLF_live12resolution, max(GLF_live12resolution, GLF_live12resolution)).x))), 0, 0))), vec3(0.01 + sin(float(GLF_live12i) / 100.0 * float(bitCount(GLF_live12msb8))), 0.01, float(GLF_live12i)));
                            if (length(GLF_live12d) <= float(bitfieldExtract(int(GLF_live12resolution.x), 0, 0))) {
                                ;
                            }
                            GLF_live12result = vec3(_GLF_IDENTITY(GLF_live12d, max(_GLF_IDENTITY(GLF_live12d, (GLF_live12d) / vec3(1.0, 1.0, 1.0)), GLF_live12d)));
                        }
                    }
                }
                {
                    if (GLF_live5collision(GLF_live5pos, GLF_live5picdata[_GLF_MAKE_IN_BOUNDS_INT(GLF_live5i, 8)])) {
                        GLF_live5res = GLF_live5pal[_GLF_MAKE_IN_BOUNDS_INT((int(GLF_live5picdata[_GLF_MAKE_IN_BOUNDS_INT(GLF_live5i, 8)].x) * int(GLF_live5picdata[_GLF_MAKE_IN_BOUNDS_INT(GLF_live5i, 8)].y) + GLF_live5i * 9 + 11) % 16, 16)];
                    }
                }
            }
        }
        {
            int GLF_live23i = _GLF_FUZZED(((-39087) | 99968));
            int GLF_live23looplimiter0 = 0;
            ivec2 GLF_live23p = _GLF_FUZZED((ivec2(-72812, 16475) ^ (false ? ivec2(-36638, -92144) : ivec2(15654, -43589))));
            for (GLF_live23i = 0; GLF_live23i < 100; GLF_live23i++) {
                if (GLF_live23looplimiter0 >= 7) {
                    break;
                }
                GLF_live23looplimiter0++;
                {
                    GLF_live23p = GLF_live23iter(_GLF_IDENTITY(GLF_live23p, ~(~(_GLF_IDENTITY(GLF_live23p, (GLF_live23p) / ivec2(1, 1))))));
                }
            }
        }
        a--;
    } while (_GLF_IDENTITY(a > int(injectionSwitch.x), bool(_GLF_IDENTITY(bvec3(a > int(injectionSwitch.x), true, true), bvec3(_GLF_IDENTITY(bvec3(_GLF_IDENTITY(_GLF_IDENTITY(bvec3(a > int(injectionSwitch.x), true, true), bvec3(bvec4(bvec3(a > int(_GLF_IDENTITY(injectionSwitch.x, min(_GLF_IDENTITY(injectionSwitch.x, (false ? _GLF_FUZZED(GLF_live12s_g) : injectionSwitch.x)), injectionSwitch.x))), true, true), false))), bvec3(bvec4(_GLF_IDENTITY(bvec3(a > int(injectionSwitch.x), true, true), bvec3(bvec4(bvec3(a > int(_GLF_IDENTITY(injectionSwitch.x, min(_GLF_IDENTITY(injectionSwitch.x, (false ? _GLF_FUZZED(GLF_live12s_g) : injectionSwitch.x)), injectionSwitch.x))), true, true), false))), true)))), bvec3(bvec3(bvec3(_GLF_IDENTITY(_GLF_IDENTITY(bvec3(a > int(injectionSwitch.x), true, true), bvec3(bvec4(bvec3(a > int(_GLF_IDENTITY(injectionSwitch.x, min(_GLF_IDENTITY(injectionSwitch.x, (false ? _GLF_FUZZED(GLF_live12s_g) : injectionSwitch.x)), injectionSwitch.x))), true, true), false))), bvec3(bvec4(_GLF_IDENTITY(bvec3(a > int(injectionSwitch.x), true, true), bvec3(bvec4(bvec3(a > int(_GLF_IDENTITY(injectionSwitch.x, min(_GLF_IDENTITY(injectionSwitch.x, (false ? _GLF_FUZZED(GLF_live12s_g) : injectionSwitch.x)), injectionSwitch.x))), true, true), false))), true))))))))))));
    {
        vec2 GLF_live18color = _GLF_FUZZED(vec2(89.04, -5.8));
        int GLF_live18i = _GLF_FUZZED(96621);
        vec3 GLF_live18vecCoor = _GLF_FUZZED((+vec3(-3.2, -8850.7313, -76.58)));
        {
            GLF_live18color = fract(asinh(_GLF_IDENTITY(GLF_live18vecCoor.yx - trunc(float(GLF_live18data[_GLF_IDENTITY(6, (true ? _GLF_IDENTITY(6, (1 & 1) * (6)) : _GLF_FUZZED(GLF_live18i)))])), mix(vec2((GLF_live18vecCoor.yx - trunc(float(GLF_live18data[_GLF_IDENTITY(6, (true ? _GLF_IDENTITY(6, (1 & 1) * (6)) : _GLF_FUZZED(GLF_live18i)))])))[0], (GLF_live18vecCoor.yx - trunc(float(GLF_live18data[_GLF_IDENTITY(6, (true ? _GLF_IDENTITY(6, (1 & 1) * (6)) : _GLF_FUZZED(GLF_live18i)))])))[1]), vec2(_GLF_FUZZED(-16.32), _GLF_FUZZED(1.8)), bvec2(false, false)))));
            GLF_live18color.y -= isnan(float(GLF_live18i)) ? tanh(GLF_live18gl_FragCoord.x) : atanh(GLF_live18gl_FragCoord.y);
            ;
        }
    }
    int b = 3;
    do {
        uv.y -= step(injectionSwitch.y, uv.x) + float(a);
        uv.x *= (isnan(uv.y) ? cosh(gl_FragCoord.y) : _GLF_IDENTITY(tanh(gl_FragCoord.x), (tanh(gl_FragCoord.x)) - 0.0));
        b--;
    } while (b > int(injectionSwitch.x));
    int c = 2;
    do {
        uv.y -= step(injectionSwitch.y, uv.x) + float(a) + float(b);
        uv.x += ldexp(injectionSwitch.y, _GLF_IDENTITY(isinf(uv.y + uv.x), (_GLF_IDENTITY(isinf(uv.y + uv.x), false || (isinf(uv.y + uv.x)))) || false) ? findMSB(b) : findMSB(a));
        c--;
    } while (c > int(injectionSwitch.x));
    int d = 1;
    do {
        uv.y -= step(injectionSwitch.y, uv.x) + _GLF_IDENTITY(float(a), min(float(a), float(a))) + _GLF_IDENTITY(float(b), (true ? float(b) : _GLF_FUZZED(-6.6))) + float(c);
        d--;
    } while (d > _GLF_IDENTITY(int(injectionSwitch.x), int(ivec3(int(injectionSwitch.x), 0, 1))));
    return fract(uv);
}

float patternize(vec2 uv) {
    vec2 size = vec2(0.45);
    vec2 st = _GLF_IDENTITY(step(size, uv), _GLF_IDENTITY(_GLF_IDENTITY((step(size, uv)) * mat2(1.0), vec2(1.0, 1.0) * (_GLF_IDENTITY((step(size, uv)), ((step(size, uv))) - vec2(0.0, 0.0)) * mat2(1.0))), vec2(mat4x2(_GLF_IDENTITY((step(size, uv)) * mat2(1.0), _GLF_IDENTITY(vec2(1.0, _GLF_IDENTITY(1.0, (_GLF_IDENTITY(1.0, max(1.0, 1.0))) + 0.0)) * (_GLF_IDENTITY((step(size, uv)), ((_GLF_IDENTITY(step(size, uv), max(step(size, uv), _GLF_IDENTITY(step(size, uv), mix(vec2(_GLF_FUZZED(float(-50558)), (step(size, uv))[1]), vec2((step(size, uv))[0], _GLF_FUZZED(641.121)), bvec2(true, false))))))) - vec2(0.0, _GLF_IDENTITY(0.0, (_GLF_IDENTITY(false, _GLF_IDENTITY(bool(bool(false)), (bool(bool(false))) && true)) ? _GLF_FUZZED(GLF_live12s_g) : 0.0)))) * mat2(1.0)), mix(vec2(_GLF_FUZZED(1889.1055), _GLF_FUZZED(786.279)), vec2((vec2(1.0, _GLF_IDENTITY(1.0, (_GLF_IDENTITY(1.0, max(1.0, 1.0))) + 0.0)) * (_GLF_IDENTITY((step(size, uv)), ((_GLF_IDENTITY(step(size, uv), max(step(size, uv), _GLF_IDENTITY(step(size, uv), mix(vec2(_GLF_FUZZED(float(-50558)), (step(size, uv))[1]), vec2((step(size, uv))[0], _GLF_FUZZED(641.121)), bvec2(true, false))))))) - vec2(0.0, _GLF_IDENTITY(0.0, (_GLF_IDENTITY(false, _GLF_IDENTITY(bool(bool(false)), (bool(bool(false))) && true)) ? _GLF_FUZZED(GLF_live12s_g) : 0.0)))) * mat2(1.0)))[0], (vec2(1.0, _GLF_IDENTITY(1.0, (_GLF_IDENTITY(1.0, max(1.0, 1.0))) + 0.0)) * (_GLF_IDENTITY((step(size, uv)), ((_GLF_IDENTITY(step(size, uv), max(step(size, uv), _GLF_IDENTITY(step(size, uv), mix(vec2(_GLF_FUZZED(float(-50558)), (step(size, uv))[1]), vec2((step(size, uv))[0], _GLF_FUZZED(641.121)), bvec2(true, false))))))) - vec2(0.0, _GLF_IDENTITY(0.0, (_GLF_IDENTITY(false, _GLF_IDENTITY(bool(bool(false)), (bool(bool(false))) && true)) ? _GLF_FUZZED(GLF_live12s_g) : 0.0)))) * mat2(1.0)))[1]), bvec2(true, true)))), 1.0, 0.0, sqrt(0.0), 1.0, 0.0, 0.0))));
    switch (int(mod(gl_FragCoord.y, 5.0))) {
        case 0:
            return mix(pow(st.x, injectionSwitch.y), st.x, size.y);
            break;
        case 1:
            return mix(pow(uv.y, injectionSwitch.y), st.y, size.x);
            break;
        case 2:
            discard;
            {
                int GLF_live13v = _GLF_FUZZED(((-63053) * (-35233)));
                {
                    int GLF_live26a = _GLF_FUZZED(30876);
                    float GLF_live26beta = _GLF_FUZZED((0.1));
                    int GLF_live26j = _GLF_FUZZED(-1241);
                    mat4 GLF_live26matrix_a = _GLF_FUZZED(mat4(mat2x3(3531.2308, 954.163, -9078.4880, 6056.0899, 48.44, -3.4)));
                    vec4 GLF_live26matrix_u = _GLF_FUZZED(vec4(4411.2111, -13.68, -89.79, -4956.3106));
                    {
                        GLF_live26matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_live26a, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live26j, 4)] = GLF_live26matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_live26a, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live26j, 4)] - (GLF_live26beta * GLF_live26matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_live26a, 4)]);
                    }
                }
                {
                    GLF_live13v /= 2;
                }
            }
            {
                {
                    ;
                }
            }
            break;
            {
                vec3 GLF_live3color = _GLF_FUZZED(vec3(float(91210u), _GLF_IDENTITY((vec2(-5.4, 6837.2070) * (-6.3)), vec2(mat4((vec2(-5.4, 6837.2070) * (-6.3)), 1.0, 0.0, 1.0, 1.0, 0.0, 0.0, exp(tan(0.0)), 0.0, 0.0, sqrt(1.0), 1.0, 0.0, 0.0, sqrt(1.0))))));
                vec2 GLF_live3grid = _GLF_FUZZED(vec2(-573.826, 685.585));
                vec2 GLF_live3uv = _GLF_FUZZED(vec2(5750.6102, -9214.9285));
                if (GLF_live3uv.x > (1.0 / 4.0)) {
                    int GLF_live3count = int(GLF_live3injectionSwitch.x);
                    {
                        int GLF_live3looplimiter3 = 0;
                        do {
                            if (_GLF_IDENTITY(GLF_live3looplimiter3, (GLF_live3looplimiter3) ^ 0) >= 7) {
                                break;
                            }
                            GLF_live3looplimiter3++;
                            {
                                GLF_live3color += GLF_live3palette(vec3(0.5, float(GLF_live3obj.numbers[8]) * _GLF_IDENTITY(0.1, float(mat4x3(_GLF_IDENTITY(0.1, (0.1) - 0.0), 0.0, 1.0, 1.0, _GLF_ONE(1.0, _GLF_IDENTITY(injectionSwitch.y, mix(float(injectionSwitch.y), float(_GLF_FUZZED(65.96)), bool(false)))), 0.0, 0.0, 0.0, _GLF_ONE(1.0, injectionSwitch.y), 0.0, 0.0, 1.0))), 0.2), vec3(_GLF_IDENTITY(0.5, (_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)) ? 0.5 : _GLF_FUZZED(-3.0)))), trunc(vec3(GLF_live3injectionSwitch.y)), _GLF_IDENTITY(vec3(float(GLF_live3obj.numbers[4]) * 0.1, GLF_live3injectionSwitch.x, 0.6), mix(vec3((vec3(float(GLF_live3obj.numbers[4]) * 0.1, GLF_live3injectionSwitch.x, 0.6))[0], (vec3(float(GLF_live3obj.numbers[4]) * 0.1, GLF_live3injectionSwitch.x, 0.6))[1], (vec3(float(GLF_live3obj.numbers[4]) * 0.1, GLF_live3injectionSwitch.x, 0.6))[2]), vec3(_GLF_FUZZED(780.476), _GLF_FUZZED(float(-83115)), _GLF_FUZZED(7.6)), bvec3(false, false, false))));
                                GLF_live3count++;
                            }
                        } while (GLF_live3count != _GLF_IDENTITY(GLF_live3obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_live3injectionSwitch.x), 10)], (GLF_live3obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_live3injectionSwitch.x), 10)]) << 0));
                    }
                    GLF_live3grid = vec2(GLF_live3count + GLF_live3obj.numbers[8], GLF_live3count + GLF_live3obj.numbers[6]);
                }
            }
        case 3:
            return mix(pow(_GLF_IDENTITY(uv, min(uv, _GLF_IDENTITY(uv, (uv) * vec2(1.0, 1.0)))).y, _GLF_IDENTITY(injectionSwitch, _GLF_IDENTITY(max(injectionSwitch, injectionSwitch), clamp(max(injectionSwitch, injectionSwitch), max(injectionSwitch, injectionSwitch), max(injectionSwitch, injectionSwitch)))).y), _GLF_IDENTITY(uv.y, clamp(uv.y, _GLF_IDENTITY(uv.y, mix(float(_GLF_FUZZED(_GLF_IDENTITY(4.9, clamp(_GLF_IDENTITY(4.9, float(_GLF_IDENTITY(mat4x2(4.9, 0.0, 0.0, 0.0, 1.0, 0.0, determinant(mat3(0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0, 0.0)), 1.0), transpose(transpose(mat4x2(4.9, 0.0, 0.0, 0.0, 1.0, 0.0, determinant(mat3(0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0, 0.0)), 1.0)))))), 4.9, _GLF_IDENTITY(4.9, (4.9) + 0.0))))), float(uv.y), bool(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y))))), _GLF_IDENTITY(uv.y, (true ? uv.y : _GLF_FUZZED(GLF_live12time))))), size.y);
            break;
        case 4:
            return _GLF_IDENTITY(mix(pow(st.y, injectionSwitch.y), _GLF_IDENTITY(st, vec2(mat4(st, exp(0.0), 1.0, tan(0.0), log(1.0), 1.0, 1.0, 1.0, sin(_GLF_IDENTITY(0.0, min(0.0, 0.0))), 1.0, 1.0, 1.0, 1.0, tan(0.0), 0.0))).x, size.x), (_GLF_IDENTITY(mix(pow(st.y, injectionSwitch.y), _GLF_IDENTITY(st, vec2(mat4(st, exp(0.0), 1.0, tan(0.0), log(1.0), 1.0, 1.0, 1.0, sin(_GLF_IDENTITY(0.0, min(0.0, 0.0))), 1.0, 1.0, 1.0, 1.0, tan(0.0), 0.0))).x, size.x), (true ? mix(pow(st.y, injectionSwitch.y), _GLF_IDENTITY(st, vec2(mat4(st, exp(0.0), 1.0, tan(0.0), log(_GLF_IDENTITY(1.0, clamp(1.0, _GLF_IDENTITY(1.0, 1.0 * (1.0)), 1.0))), 1.0, 1.0, 1.0, sin(_GLF_IDENTITY(0.0, min(0.0, 0.0))), 1.0, 1.0, 1.0, 1.0, tan(0.0), 0.0))).x, size.x) : _GLF_FUZZED(GLF_live12s_g)))) / 1.0);
            break;
    }
}

int binarySearch(BinarySearchObject obj, int x) {
    int l = 0, r = 9;
    while (l <= r) {
        int m = (l + r) / 2;
        if (obj.prime_numbers[m] == x) {
            return _GLF_IDENTITY(m, _GLF_IDENTITY((_GLF_IDENTITY(m, int(ivec3(_GLF_IDENTITY(m, (_GLF_IDENTITY(m, 0 + (m))) | (m)), 0, 1)))) >> 0, (_GLF_IDENTITY((_GLF_IDENTITY(m, int(ivec3(_GLF_IDENTITY(m, (_GLF_IDENTITY(m, 0 + (m))) | (m)), 0, 1)))) >> 0, (_GLF_IDENTITY((_GLF_IDENTITY(m, int(ivec3(_GLF_IDENTITY(m, (_GLF_IDENTITY(m, 0 + (m))) | (m)), 0, 1)))) >> 0, min((_GLF_IDENTITY(m, int(ivec3(_GLF_IDENTITY(m, (_GLF_IDENTITY(m, 0 + (m))) | (m)), 0, 1)))) >> 0, (_GLF_IDENTITY(m, int(ivec3(_GLF_IDENTITY(m, (_GLF_IDENTITY(m, 0 + (m))) | (m)), 0, 1)))) >> 0))) | (_GLF_IDENTITY((_GLF_IDENTITY(m, int(ivec3(_GLF_IDENTITY(m, (_GLF_IDENTITY(m, 0 + (m))) | (m)), 0, 1)))) >> 0, int(ivec3((_GLF_IDENTITY(m, int(ivec3(_GLF_IDENTITY(m, (_GLF_IDENTITY(m, 0 + (m))) | (m)), 0, 1)))) >> 0, 1, 0)))))) | (_GLF_IDENTITY((_GLF_IDENTITY(m, int(ivec3(_GLF_IDENTITY(m, (_GLF_IDENTITY(m, 0 + (m))) | (m)), 0, 1)))) >> 0, clamp((_GLF_IDENTITY(m, int(ivec3(_GLF_IDENTITY(m, (_GLF_IDENTITY(m, 0 + (m))) | (m)), 0, 1)))) >> 0, (_GLF_IDENTITY(m, int(ivec3(_GLF_IDENTITY(m, (_GLF_IDENTITY(m, 0 + (m))) | (m)), 0, 1)))) >> 0, (_GLF_IDENTITY(m, int(ivec3(_GLF_IDENTITY(m, (_GLF_IDENTITY(m, 0 + (m))) | (m)), 0, 1)))) >> 0)))));
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
        }
        if (obj.prime_numbers[m] < x) {
            _GLF_IDENTITY(l = m + 1, (true ? (l = m + 1) : _GLF_FUZZED(bitCount(r))));
            {
                {
                    vec2 GLF_live25coord = _GLF_FUZZED((((-0.8) * vec2(-4.9, 8.1)) * ((-6.5) + vec3(27.82, -33.97, -5975.8470)).bg));
                    float GLF_live25h = _GLF_FUZZED(984.185);
                    int GLF_live25i = _GLF_FUZZED(66809);
                    int GLF_live25looplimiter0 = 0;
                    float GLF_live25refh = _GLF_FUZZED(-994.267);
                    float GLF_live25slope = _GLF_FUZZED(-7.8);
                    vec2 GLF_live25uvstep = _GLF_FUZZED(vec2(889.084, -51.81));
                    {
                        if (GLF_live25looplimiter0 >= 4) {
                            ;
                        }
                        GLF_live25looplimiter0++;
                        {
                            GLF_live25coord -= GLF_live25uvstep;
                            GLF_live25refh += GLF_live25slope;
                            GLF_live25h = texture(GLF_live25tex, GLF_live25coord).y;
                            GLF_live25i++;
                        }
                    }
                }
                int GLF_live13looplimiter0 = 0;
                if (GLF_live13looplimiter0 >= 6) {
                    ;
                }
            }
        } else {
            r = m - 1;
        }
    }
    return -1;
}

void main() {
    BinarySearchObject obj;
    {
        int GLF_live5i = _GLF_FUZZED(_GLF_IDENTITY(ivec3(-50392, 26934, 40094), (ivec3(-50392, 26934, 40094)) | (_GLF_IDENTITY(ivec3(-50392, 26934, 40094), min(ivec3(-50392, _GLF_IDENTITY(26934, ~(~(26934))), _GLF_IDENTITY(40094, (40094) * 1)), ivec3(-50392, 26934, 40094))))).y);
        int GLF_live5looplimiter0 = 0;
        vec2 GLF_live5pos = _GLF_FUZZED(vec2(5188.3388, -2.9));
        vec4 GLF_live5res = _GLF_FUZZED(_GLF_IDENTITY(vec4(5511.2910, 436.719, -1450.4859, -8.1), mix(vec4((vec4(5511.2910, 436.719, -1450.4859, -8.1))[0], _GLF_FUZZED(482.418), (vec4(5511.2910, 436.719, -1450.4859, -8.1))[2], _GLF_FUZZED(-80.53)), vec4(_GLF_FUZZED(3.1), (vec4(5511.2910, 436.719, -1450.4859, -8.1))[1], _GLF_FUZZED(9.0), (vec4(5511.2910, _GLF_IDENTITY(436.719, clamp(436.719, _GLF_IDENTITY(436.719, float(mat4(436.719, _GLF_IDENTITY(dot(vec2(0.0, 1.0), vec2(0.0, 1.0)), dot(vec2(0.0, 1.0), vec2(0.0, 1.0))), 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 0.0, _GLF_IDENTITY(0.0, (0.0) + 0.0), 1.0, 1.0, 0.0))), _GLF_IDENTITY(436.719, clamp(436.719, 436.719, 436.719)))), -1450.4859, -8.1))[3]), bvec4(false, true, _GLF_FALSE(false, (gl_FragCoord.y < 0.0)), true))));
        {
            vec2 GLF_live24coord = _GLF_FUZZED(_GLF_IDENTITY((vec2(-48.54, -2.9) - vec2(2.1, -0.2)), vec2(1.0, 1.0) * ((vec2(-48.54, -2.9) - vec2(2.1, -0.2)))));
            int GLF_live24i = _GLF_FUZZED((-18954));
            int GLF_live24looplimiter0 = 0;
            vec4 GLF_live24texel = _GLF_FUZZED(vec4(0.4, -3.2, -_GLF_IDENTITY(8.3, max(8.3, 8.3)), 3.6));
            {
                if (GLF_live24looplimiter0 >= 3) {
                    ;
                }
                GLF_live24looplimiter0++;
                {
                    GLF_live24coord = GLF_live24texel.xz + GLF_live24texel.yy;
                    GLF_live24coord = floor(GLF_live24coord * 256.0) / 256.0;
                    GLF_live24texel = texture(GLF_live24tex, GLF_live24coord);
                    GLF_live24i++;
                }
            }
        }
        for (GLF_live5i = 0; GLF_live5i < 8; GLF_live5i++) {
            if (GLF_live5looplimiter0 >= 7) {
                break;
            }
            GLF_live5looplimiter0++;
            {
                if (GLF_live5collision(GLF_live5pos, GLF_live5picdata[_GLF_MAKE_IN_BOUNDS_INT(GLF_live5i, 8)])) {
                    GLF_live5res = GLF_live5pal[_GLF_MAKE_IN_BOUNDS_INT((int(GLF_live5picdata[_GLF_MAKE_IN_BOUNDS_INT(GLF_live5i, 8)].x) * int(GLF_live5picdata[_GLF_MAKE_IN_BOUNDS_INT(GLF_live5i, 8)].y) + GLF_live5i * 9 + 11) % 16, 16)];
                }
            }
        }
    }
    for (int i = 0; i < 10; i++) {
        if (i == 0) {
            obj.prime_numbers[i] = 2;
        } else {
            {
                int GLF_live28i = _GLF_FUZZED(ivec4(55842, -29561, -5771, 73689).s);
                if (GLF_live28i < int(GLF_live28gl_FragCoord.x)) {
                    ;
                }
            }
            if (i == 1) {
                obj.prime_numbers[i] = 3;
            } else if (i == 2) {
                obj.prime_numbers[i] = 5;
                {
                    int GLF_live19i = _GLF_FUZZED(35714);
                    float GLF_live19ref = _GLF_FUZZED(363.901);
                    float GLF_live19s = _GLF_FUZZED(-2.7);
                    if (mod(float(GLF_live19i), GLF_live19ref) <= 0.01) {
                        GLF_live19s += 0.2;
                    }
                }
            } else if (i == 3) {
                obj.prime_numbers[i] = 7;
            } else if (i == 4) {
                obj.prime_numbers[i] = 11;
            } else if (i == 5) {
                obj.prime_numbers[i] = 13;
            } else if (_GLF_IDENTITY(i == 6, bool(bvec2(_GLF_IDENTITY(i == 6, !(!(i == 6))), true)))) {
                _GLF_IDENTITY(obj.prime_numbers[i] = 17, (obj.prime_numbers[i] = 17) / (0 ^ 1));
                {
                    vec2 GLF_live5pos = _GLF_FUZZED((vec2(-9.1, 749.763) * vec2(-0.8, 3613.9985)));
                    vec4 GLF_live5quad = _GLF_FUZZED(vec4(8.8, 5.5, 8.3, -_GLF_IDENTITY(161.879, max(161.879, 161.879))));
                    if (GLF_live5pos.y > GLF_live5quad.y + _GLF_IDENTITY(GLF_live5quad, vec4(0.0, 0.0, 0.0, 0.0) + (GLF_live5quad)).w) {
                        ;
                    }
                    {
                        int GLF_live13v = _GLF_FUZZED(ivec4(_GLF_IDENTITY(86148, (86148) | (_GLF_IDENTITY(86148, min(86148, 86148)))), -51562, 5619, 45028).a);
                        if ((GLF_live13v & 1) == 1) {
                            GLF_live13v = 3 * GLF_live13v + 1;
                        } else {
                            GLF_live13v /= 2;
                        }
                    }
                }
            } else if (i == 7) {
                obj.prime_numbers[i] = 19;
            } else if (i == 8) {
                obj.prime_numbers[i] = 23;
                {
                    int GLF_live5i = _GLF_FUZZED(-9250);
                    vec2 GLF_live5pos = _GLF_FUZZED(vec2(9045.4615, 43.90));
                    vec4 GLF_live5res = _GLF_FUZZED((mat3x4(-1.5, 9.6, -7841.9295, _GLF_IDENTITY(-18.03, float(mat4x3(_GLF_IDENTITY(-18.03, _GLF_IDENTITY(float(mat4(-18.03, determinant(mat4(0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0)), 0.0, 1.0, 0.0, 1.0, 1.0, 1.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 1.0, round(length(normalize(1.0))))), min(_GLF_IDENTITY(float(mat4(-18.03, determinant(mat4(0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0)), 0.0, 1.0, 0.0, 1.0, 1.0, 1.0, 1.0, 0.0, 0.0, _GLF_IDENTITY(0.0, (0.0) - 0.0), 0.0, 1.0, 1.0, round(length(normalize(1.0))))), clamp(float(mat4(-18.03, determinant(mat4(0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0)), _GLF_IDENTITY(0.0, 0.0 + (_GLF_IDENTITY(0.0, max(0.0, 0.0)))), 1.0, 0.0, 1.0, 1.0, 1.0, 1.0, 0.0, 0.0, _GLF_IDENTITY(0.0, (0.0) - 0.0), 0.0, 1.0, 1.0, round(length(normalize(1.0))))), float(mat4(-18.03, determinant(_GLF_IDENTITY(mat4(0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0), (true ? _GLF_IDENTITY(mat4(0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0), (mat4(0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0)) - mat4(0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0)) : _GLF_FUZZED(mat4(2.0, -56.75, -93.49, -6.3, -6.2, -97.20, 38.32, -6.0, -302.739, 4.7, 5.5, 5086.6058, -8.9, 24.15, 9337.0613, -6990.8388))))), 0.0, 1.0, 0.0, 1.0, _GLF_IDENTITY(1.0, max(1.0, _GLF_IDENTITY(1.0, (false ? _GLF_FUZZED(GLF_live12time) : 1.0)))), 1.0, 1.0, 0.0, 0.0, _GLF_IDENTITY(0.0, (0.0) - 0.0), 0.0, 1.0, 1.0, round(length(normalize(1.0))))), float(mat4(-18.03, determinant(mat4(0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0)), 0.0, 1.0, 0.0, 1.0, 1.0, 1.0, 1.0, 0.0, 0.0, _GLF_IDENTITY(0.0, (0.0) - 0.0), 0.0, 1.0, 1.0, round(length(normalize(1.0))))))), float(mat4(_GLF_IDENTITY(-18.03, mix(float(_GLF_IDENTITY(_GLF_FUZZED(-66.51), min(_GLF_FUZZED(-66.51), _GLF_FUZZED(-66.51)))), float(-18.03), bool(true))), _GLF_IDENTITY(determinant(mat4(0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0)), clamp(determinant(mat4(0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0)), determinant(mat4(0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0)), determinant(mat4(_GLF_IDENTITY(0.0, max(_GLF_IDENTITY(0.0, (false ? _GLF_FUZZED(GLF_live12b_b) : 0.0)), 0.0)), 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, _GLF_IDENTITY(0.0, (0.0) - _GLF_ZERO(0.0, injectionSwitch.x)), 0.0, 0.0)))), 0.0, 1.0, 0.0, 1.0, 1.0, 1.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, _GLF_IDENTITY(1.0, min(1.0, 1.0)), round(_GLF_IDENTITY(length(normalize(1.0)), float(vec3(_GLF_IDENTITY(length(normalize(1.0)), max(length(normalize(1.0)), length(normalize(1.0)))), 0.0, determinant(mat2(0.0, 0.0, 0.0, 0.0))))))))))), 1.0, 0.0, 1.0, 1.0, 1.0, 0.0, 0.0, 0.0, 0.0, abs(0.0), round(length(normalize(1.0)))))), -7246.9320, 651.759, 77.10, 2.1, -9930.6089, _GLF_IDENTITY(-255.908, (-255.908) - 0.0), _GLF_IDENTITY(5364.2441, _GLF_IDENTITY(min(_GLF_IDENTITY(5364.2441, clamp(5364.2441, 5364.2441, 5364.2441)), 5364.2441), mix(float(_GLF_IDENTITY(min(_GLF_IDENTITY(5364.2441, clamp(5364.2441, 5364.2441, 5364.2441)), 5364.2441), (min(_GLF_IDENTITY(5364.2441, clamp(5364.2441, 5364.2441, 5364.2441)), 5364.2441)) * 1.0)), float(_GLF_FUZZED(743.035)), bool(false)))), _GLF_IDENTITY(1395.4952, mix(float(_GLF_FUZZED(9.3)), float(1395.4952), bool(true)))) * vec3(vec2(-2.5, 5092.2906), -2.6)));
                    if (GLF_live5collision(GLF_live5pos, GLF_live5picdata[_GLF_MAKE_IN_BOUNDS_INT(GLF_live5i, 8)])) {
                        GLF_live5res = GLF_live5pal[_GLF_IDENTITY(_GLF_MAKE_IN_BOUNDS_INT((int(GLF_live5picdata[_GLF_MAKE_IN_BOUNDS_INT(GLF_live5i, 8)].x) * int(GLF_live5picdata[_GLF_MAKE_IN_BOUNDS_INT(GLF_live5i, 8)].y) + GLF_live5i * 9 + 11) % 16, 16), (false ? _GLF_FUZZED(GLF_live4N) : _GLF_MAKE_IN_BOUNDS_INT((int(GLF_live5picdata[_GLF_MAKE_IN_BOUNDS_INT(GLF_live5i, 8)].x) * int(GLF_live5picdata[_GLF_MAKE_IN_BOUNDS_INT(GLF_live5i, 8)].y) + GLF_live5i * 9 + 11) % 16, 16)))];
                    }
                }
            } else {
                {
                    {
                        ;
                        {
                            int GLF_live13looplimiter0 = 0;
                            if (_GLF_IDENTITY(GLF_live13looplimiter0, (false ? _GLF_FUZZED(i) : _GLF_IDENTITY(GLF_live13looplimiter0, _GLF_IDENTITY(1, ~(_GLF_IDENTITY(~(1), clamp(~(1), ~(1), ~(1))))) * (GLF_live13looplimiter0)))) >= 6) {
                                ;
                                {
                                    int GLF_live21baseIndex = _GLF_FUZZED(int((vec4(-9.7, 4.1, 5.0, 182.602) == vec4(2.9, 30.04, -273.853, -4.0))));
                                    int GLF_live21data = _GLF_FUZZED((63837 * (_GLF_IDENTITY(-6720, _GLF_IDENTITY(int(ivec4(_GLF_IDENTITY(-6720, min(-6720, -6720)), 1, 0, (1 | 1))), min(int(ivec4(_GLF_IDENTITY(-6720, min(-6720, -6720)), 1, 0, (1 | 1))), int(ivec4(_GLF_IDENTITY(-6720, min(-6720, -6720)), 1, 0, (1 | 1)))))))));
                                    int GLF_live21treeIndex = _GLF_FUZZED(((-84157)));
                                    {
                                        GLF_live21tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live21baseIndex, 10)].leftIndex = GLF_live21treeIndex;
                                        GLF_live21makeTreeNode(GLF_live21tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live21treeIndex, 10)], GLF_live21data);
                                        ;
                                    }
                                }
                            }
                        }
                    }
                }
                if (i == 9) {
                    {
                        ivec2 GLF_live1pos = _GLF_FUZZED(ivec2(-29597, 40407));
                        {
                            {
                                int GLF_live22looplimiter1 = 0;
                                if (GLF_live22looplimiter1 >= 4) {
                                    ;
                                }
                            }
                            int GLF_live1looplimiter0 = 0;
                            while (_GLF_IDENTITY(GLF_live1pos.y != 256, bool(bvec2(GLF_live1pos.y != 256, false)))) {
                                {
                                    int GLF_live4high = _GLF_FUZZED(-4451);
                                    int GLF_live4low = _GLF_IDENTITY(_GLF_FUZZED(ivec3(-43992, -62039, -58260).r), max(_GLF_FUZZED(_GLF_IDENTITY(ivec3(-43992, -62039, -58260).r, clamp(ivec3(-43992, -62039, -58260).r, ivec3(-43992, -62039, -58260).r, _GLF_IDENTITY(ivec3(-43992, _GLF_IDENTITY(-62039, clamp(_GLF_IDENTITY(-62039, 0 | (-62039)), -62039, -62039)), -58260), ivec3(0, 0, 0) ^ (_GLF_IDENTITY(ivec3(-43992, _GLF_IDENTITY(-62039, clamp(_GLF_IDENTITY(-62039, 0 | (-62039)), -62039, -62039)), -58260), (ivec3(-43992, _GLF_IDENTITY(-62039, clamp(_GLF_IDENTITY(-62039, 0 | (-62039)), -62039, -62039)), -58260)) - ivec3(0, 0, 0)))).r))), _GLF_FUZZED(ivec3(-43992, -_GLF_IDENTITY(62039, max(62039, 62039)), -58260).r)));
                                    int GLF_live4m = _GLF_FUZZED(45093);
                                    {
                                        int GLF_live4looplimiter3 = 0;
                                        for (int GLF_live4i = GLF_live4low; GLF_live4i < GLF_live4high; GLF_live4i += _GLF_IDENTITY(2 * GLF_live4m, (2 * GLF_live4m) * 1)) {
                                            if (GLF_live4looplimiter3 >= 6) {
                                                break;
                                            }
                                            GLF_live4looplimiter3++;
                                            {
                                                {
                                                    {
                                                        ;
                                                    }
                                                }
                                                int GLF_live4from = GLF_live4i;
                                                int GLF_live4mid = GLF_live4i + GLF_live4m - 1;
                                                int GLF_live4to = min(GLF_live4i + 2 * GLF_live4m - 1, GLF_live4high);
                                                GLF_live4merge(GLF_live4from, GLF_live4mid, GLF_live4to);
                                            }
                                        }
                                    }
                                }
                                if (GLF_live1looplimiter0 >= 7) {
                                    break;
                                }
                                {
                                    vec3 GLF_live17c = _GLF_FUZZED(vec3(3.9, -7290.9267, -138.554));
                                    int GLF_live17i = _GLF_FUZZED(26617);
                                    if (GLF_live17c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17i, 3)] >= 1.0) {
                                        GLF_live17c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17i, 3)] = GLF_live17c[_GLF_MAKE_IN_BOUNDS_INT(_GLF_IDENTITY(GLF_live17i, (false ? _GLF_FUZZED(GLF_live17i) : _GLF_IDENTITY(GLF_live17i, ~(~(GLF_live17i))))), 3)] * GLF_live17c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17i, 3)];
                                    }
                                }
                                _GLF_IDENTITY(GLF_live1looplimiter0++, (_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)) ? _GLF_IDENTITY(GLF_live1looplimiter0++, 0 + (GLF_live1looplimiter0++)) : _GLF_FUZZED(GLF_live4N)));
                                {
                                    if (GLF_live1pos.x < GLF_live1dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live1pos.y, 256)] + 15 && GLF_live1pos.x > GLF_live1dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live1pos.y, 256)] - 15) {
                                        {
                                            {
                                                ;
                                            }
                                        }
                                        float GLF_live1p = (15.0 - abs(float(GLF_live1pos.x - GLF_live1dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live1pos.y, 256)]))) / 15.0;
                                        ;
                                    }
                                    GLF_live1pos.y++;
                                }
                            }
                        }
                    }
                    obj.prime_numbers[i] = 29;
                }
            }
        }
    }
    vec2 uv = (_GLF_IDENTITY(gl_FragCoord.xy, _GLF_IDENTITY(vec2(vec2(gl_FragCoord.xy)), clamp(vec2(vec2(gl_FragCoord.xy)), vec2(vec2(_GLF_IDENTITY(gl_FragCoord, max(_GLF_IDENTITY(gl_FragCoord, vec4(mat2(gl_FragCoord))), gl_FragCoord)).xy)), vec2(vec2(gl_FragCoord.xy))))) / resolution.x) * vec2(resolution.x / _GLF_IDENTITY(resolution, mix(vec2(_GLF_FUZZED(78.45), _GLF_IDENTITY((resolution)[1], max((resolution)[1], (resolution)[1]))), vec2((resolution)[0], _GLF_FUZZED(((-7.4) - (-4276.0902)))), bvec2(true, false))).y, 1.0);
    vec2 b = brick(uv * 7.0);
    vec3 color = vec3(patternize(b));
    if (_GLF_IDENTITY(gl_FragCoord.y < resolution.y / 1.1, bool(_GLF_IDENTITY(bvec2(_GLF_IDENTITY(gl_FragCoord.y < resolution.y / 1.1, bool(bvec4(gl_FragCoord.y < resolution.y / 1.1, true, true, _GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y))))), _GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y))), bvec2(bvec2(bvec2(_GLF_IDENTITY(gl_FragCoord.y < resolution.y / 1.1, bool(bvec4(gl_FragCoord.y < resolution.y / 1.1, true, true, _GLF_TRUE(true, (_GLF_IDENTITY(injectionSwitch.x < injectionSwitch.y, bool(bvec4(injectionSwitch.x < injectionSwitch.y, true, true, false)))))))), _GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y))))))))) {
        if (_GLF_IDENTITY(binarySearch(obj, obj.prime_numbers[4]) != -(int(resolution.y)), !(!(_GLF_IDENTITY(_GLF_IDENTITY(binarySearch(obj, obj.prime_numbers[4]) != -(int(resolution.y)), (binarySearch(obj, obj.prime_numbers[4]) != -(int(_GLF_IDENTITY(resolution, (_GLF_IDENTITY(resolution, vec2(resolution[0], resolution[1]))) + vec2(0.0, 0.0)).y))) || false), !(!(_GLF_IDENTITY(binarySearch(obj, obj.prime_numbers[4]) != -(int(resolution.y)), (binarySearch(obj, obj.prime_numbers[4]) != -(_GLF_IDENTITY(int(_GLF_IDENTITY(resolution, (_GLF_IDENTITY(resolution, vec2(resolution[0], resolution[1]))) + vec2(_GLF_IDENTITY(0.0, min(0.0, 0.0)), 0.0)).y), (int(_GLF_IDENTITY(resolution, (_GLF_IDENTITY(resolution, vec2(resolution[0], resolution[1]))) + _GLF_IDENTITY(vec2(_GLF_IDENTITY(0.0, min(0.0, 0.0)), 0.0), (false ? _GLF_FUZZED(vec2(GLF_live18gl_FragCoord)) : vec2(_GLF_IDENTITY(0.0, min(0.0, 0.0)), 0.0)))).y)) | 0))) || false))))))) && binarySearch(obj, obj.prime_numbers[0]) >= _GLF_IDENTITY(-(int(resolution.x)), (true ? (-(int(resolution.x))) : _GLF_FUZZED(-76657)))) {
            color.yz -= dot(float(binarySearch(obj, _GLF_IDENTITY(obj.prime_numbers[4], (obj.prime_numbers[4]) / 1))), float(binarySearch(obj, obj.prime_numbers[_GLF_IDENTITY(0, (false ? _GLF_FUZZED(21992) : 0))])));
        } else {
            {
                vec2 GLF_live10coord = _GLF_FUZZED(_GLF_IDENTITY(vec2(-40.01, -0.0), clamp(vec2(-40.01, -0.0), vec2(-40.01, -0.0), vec2(-40.01, -0.0))));
                int GLF_live10i = _GLF_FUZZED((~_GLF_IDENTITY((-32462), (_GLF_IDENTITY((-32462), ~(~(_GLF_IDENTITY((-32462), (false ? _GLF_FUZZED(-65075) : (-32462))))))) >> 0)));
                int GLF_live10j = _GLF_FUZZED(((-45292) * (_GLF_IDENTITY(95768 ^ (-48741), (95768 ^ (-48741)) | 0))));
                vec4 GLF_live10res = _GLF_FUZZED(vec4(1.7, 8.8, -50.67, 766.512));
                float GLF_live10uvstep = _GLF_FUZZED((((mat4(224.117, 71.92, -40.80, 355.738, -1.3, -623.218, -7.6, 857.791, -1.8, 5.2, 58.28, -9.7, 8.0, 3.6, -0.0, -3.2) != mat4(-3425.1232, 8.0, -80.44, 0.3, -7.7, -309.429, -57.14, 2.3, 91.26, 561.966, 5366.8679, _GLF_IDENTITY(9.9, float(_GLF_IDENTITY(vec4(9.9, 0.0, round(length(normalize(vec4(1.0, 1.0, 1.0, 1.0)))), abs(1.0)), clamp(vec4(9.9, _GLF_IDENTITY(0.0, (false ? _GLF_FUZZED(determinant(inverse(mat3(-94.55, -72.47, -1.6, -474.277, -758.738, -9.4, 9.6, 277.987, 144.125)))) : _GLF_IDENTITY(0.0, (_GLF_IDENTITY(0.0, _GLF_IDENTITY(float(mat2x3(0.0, 1.0, 1.0, 0.0, 0.0, 0.0)), (_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)) ? float(mat2x3(0.0, 1.0, 1.0, 0.0, 0.0, 0.0)) : _GLF_FUZZED(tan(GLF_live12b_b)))))) / 1.0))), round(length(normalize(vec4(1.0, 1.0, _GLF_IDENTITY(1.0, mix(float(1.0), float(_GLF_FUZZED(-3.3)), bool(false))), 1.0)))), abs(1.0)), vec4(9.9, 0.0, round(length(normalize(vec4(_GLF_IDENTITY(1.0, clamp(1.0, _GLF_IDENTITY(1.0, mix(float(1.0), float(_GLF_FUZZED(-4.5)), bool(false))), _GLF_IDENTITY(1.0, 1.0 * (1.0)))), _GLF_IDENTITY(1.0, max(1.0, 1.0)), 1.0, 1.0)))), abs(1.0)), vec4(9.9, 0.0, round(length(normalize(vec4(1.0, 1.0, 1.0, 1.0)))), abs(1.0)))))), 1.6, 2129.5220, 2.3, -3.1)) ? 335.175 : 2.3)));
                {
                    GLF_live10res += texture(GLF_live10tex, _GLF_IDENTITY(GLF_live10coord + vec2(float(GLF_live10i - 1) * GLF_live10uvstep, float(GLF_live10j - 1) * GLF_live10uvstep), vec2(1.0, 1.0) * (_GLF_IDENTITY(GLF_live10coord + vec2(float(GLF_live10i - 1) * GLF_live10uvstep, float(GLF_live10j - 1) * GLF_live10uvstep), min(GLF_live10coord + vec2(float(GLF_live10i - 1) * GLF_live10uvstep, float(GLF_live10j - 1) * GLF_live10uvstep), _GLF_IDENTITY(GLF_live10coord + vec2(float(GLF_live10i - 1) * GLF_live10uvstep, float(GLF_live10j - 1) * GLF_live10uvstep), (GLF_live10coord + vec2(float(GLF_live10i - 1) * GLF_live10uvstep, float(_GLF_IDENTITY(GLF_live10j, ~(~(GLF_live10j))) - 1) * GLF_live10uvstep)) - vec2(0.0, 0.0))))))) * GLF_live10weights[_GLF_IDENTITY(_GLF_MAKE_IN_BOUNDS_INT(GLF_live10i * 3 + GLF_live10j, 9), _GLF_IDENTITY((_GLF_MAKE_IN_BOUNDS_INT(GLF_live10i * 3 + GLF_live10j, _GLF_IDENTITY(9, min(9, 9)))) | (_GLF_MAKE_IN_BOUNDS_INT(_GLF_IDENTITY(GLF_live10i, 0 | (_GLF_IDENTITY(GLF_live10i, ~(~(GLF_live10i))))) * 3 + GLF_live10j, 9)), 0 | ((_GLF_MAKE_IN_BOUNDS_INT(GLF_live10i * 3 + GLF_live10j, _GLF_IDENTITY(9, _GLF_IDENTITY(min(9, 9), int(ivec3(_GLF_IDENTITY(min(9, 9), (min(9, 9)) ^ 0), 0, int(_GLF_ONE(1.0, injectionSwitch.y)))))))) | (_GLF_MAKE_IN_BOUNDS_INT(_GLF_IDENTITY(GLF_live10i, 0 | (_GLF_IDENTITY(GLF_live10i, ~(~(GLF_live10i))))) * 3 + GLF_live10j, 9)))))];
                }
            }
            discard;
        }
    } else {
        if (binarySearch(obj, 1) == -1) {
            {
                vec2 GLF_live24coord = _GLF_FUZZED(vec4(-9.8, -45.60, -144.254, 65.59).zx);
                int GLF_live24i = _GLF_FUZZED(ivec4(85226, 27003, -83572, -65489).g);
                int GLF_live24looplimiter0 = 0;
                vec4 GLF_live24texel = _GLF_FUZZED(vec4(-6.3, 1383.4566, 1.2, -29.94));
                while (GLF_live24texel.x + GLF_live24texel.y + GLF_live24texel.z > 1.0 && GLF_live24i < 16) {
                    if (GLF_live24looplimiter0 >= 3) {
                        break;
                    }
                    GLF_live24looplimiter0++;
                    {
                        GLF_live24coord = GLF_live24texel.xz + GLF_live24texel.yy;
                        GLF_live24coord = floor(GLF_live24coord * 256.0) / 256.0;
                        GLF_live24texel = texture(GLF_live24tex, GLF_live24coord);
                        GLF_live24i++;
                    }
                }
            }
            discard;
        } else {
            color.yz += color.yz;
        }
    }
    _GLF_color = vec4(color, injectionSwitch.y);
}
