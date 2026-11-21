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
vec4 GLF_dead15_GLF_color = _GLF_FUZZED(vec4(-857.790, vec2(1759.2169, 18.67), -360.219));

layout(set = 0, binding = 1) uniform buf1 {
    float GLF_dead15one;
};

mat2 GLF_dead15m22 = _GLF_FUZZED((mat4x2(-6562.3023, -750.633, 75.62, 40.14, -361.020, -84.05, -409.053, 2.6) * mat2x4(-5.3, -5.1, 2.3, -844.644, -3.3, -14.67, 8144.3393, -7.5)));
mat2x3 GLF_dead15m23 = _GLF_FUZZED(mat2x3(44.15, -666.378, 505.797, 7139.3685, 4.4, -4149.3486));
mat2x4 GLF_dead15m24 = _GLF_FUZZED(mat2x4((+mat3x2(77.50, 7.3, -77.99, -6.0, 5.4, -79.46))));
mat3x2 GLF_dead15m32 = _GLF_FUZZED((mat3x2(1171.4350, -12.38, -91.97, 99.31, 866.592, 3366.3490) + 0.2));
mat3 GLF_dead15m33 = _GLF_FUZZED(mat3(-5.0, 7464.3454, 90.51, -530.804, -8.6, 485.520, -17.54, -9.3, 1.6));
mat3x4 GLF_dead15m34 = _GLF_FUZZED((((-8.1) - mat3x4(-6.0, 7.8, 2310.3117, 285.868, -81.58, 4.1, -4043.4174, 683.573, 7.2, 8.3, -429.953, 1.1)) * 84.38));
mat4x2 GLF_dead15m42 = _GLF_FUZZED(mat4x2(3.7, 18.92, 8.7, -301.288, -0.6, 361.465, 3.1, 7.5));
mat4x3 GLF_dead15m43 = _GLF_FUZZED(mat4x3(mat3x4(-32.85, -7.2, -96.37, -0.3, 13.52, 3.9, -9.7, -3.1, -5123.4003, -541.515, 3.0, -0.2)));
mat4 GLF_dead15m44 = _GLF_FUZZED(((-280.712) - mat4(-785.213, -33.84, -7903.6600, -546.895, 5.9, -6.7, 78.01, 2.8, 4.8, -517.378, -1818.9199, -5.3, -7.5, 267.269, -5.9, 0.5)));
vec4 GLF_dead13_GLF_color = _GLF_FUZZED(vec4(((-65.56) * vec2(5.3, -49.86).st), 3.8, -2717.7980));

struct _GLF_struct_38 {
    ivec4 _f0;
    float donor_replacementGLF_dead9limit;
};

struct _GLF_struct_41 {
    vec3 _f0;
    vec4 _f1;
    bvec2 _f2;
    int _f3;
};

struct _GLF_struct_40 {
    _GLF_struct_41 _f0;
    ivec3 _f1;
    mat4 _f2;
    mat3x2 _f3;
    vec4 _f4;
    mat2x3 _f5;
    int _f6;
};

struct _GLF_struct_39 {
    mat2x3 _f0;
    uvec4 _f1;
    _GLF_struct_40 _f2;
    vec2 _f3;
    mat4x3 _f4;
    float donor_replacementGLF_dead9limit;
    mat3x4 _f5;
    ivec2 _f6;
};

struct _GLF_struct_42 {
    int GLF_dead3res1;
    float _f0;
};

struct _GLF_struct_43 {
    ivec4 _f0;
    mat4x3 _f1;
    mat4 _f2;
    ivec2 GLF_dead3icoord;
};

struct _GLF_struct_47 {
    mat2x3 _f0;
    float _f1;
    vec3 _f2;
};

struct _GLF_struct_46 {
    mat4 _f0;
    mat2 _f1;
    mat2x3 _f2;
    ivec2 _f3;
    int _f4;
    ivec2 _f5;
};

struct _GLF_struct_45 {
    _GLF_struct_46 _f0;
    bvec2 _f1;
    float _f2;
    uint _f3;
    int donor_replacementGLF_dead10i;
    bool _f4;
};

struct _GLF_struct_44 {
    ivec4 _f0;
    _GLF_struct_45 _f1;
    _GLF_struct_47 _f2;
    vec3 _f3;
    bvec2 _f4;
    uvec4 _f5;
};

struct _GLF_struct_48 {
    bool _f0;
    int GLF_dead10j;
};

struct _GLF_struct_52 {
    vec3 _f0;
    bvec4 _f1;
    mat4 _f2;
};

struct _GLF_struct_51 {
    uint _f0;
    vec3 _f1;
    bvec3 _f2;
    uvec3 _f3;
    mat3 _f4;
    uvec3 _f5;
};

struct _GLF_struct_50 {
    mat4x2 _f0;
    _GLF_struct_51 _f1;
};

struct _GLF_struct_49 {
    mat3 _f0;
    mat2x4 _f1;
    _GLF_struct_50 _f2;
    float donor_replacementGLF_dead10uvstep;
    _GLF_struct_52 _f3;
};

struct _GLF_struct_57 {
    ivec2 _f0;
    vec4 _f1;
    bvec2 _f2;
};

struct _GLF_struct_56 {
    ivec3 _f0;
    vec4 _f1;
    ivec2 _f2;
    bvec2 _f3;
    float _f4;
    bool _f5;
    mat4x2 _f6;
};

struct _GLF_struct_55 {
    vec3 _f0;
    bool _f1;
    _GLF_struct_56 _f2;
    _GLF_struct_57 _f3;
    vec3 donor_replacementGLF_dead11m;
    bvec4 _f4;
    int _f5;
};

struct _GLF_struct_54 {
    uvec4 _f0;
};

struct _GLF_struct_53 {
    uvec2 _f0;
    _GLF_struct_54 _f1;
    ivec2 _f2;
    _GLF_struct_55 _f3;
};

struct _GLF_struct_58 {
    mat2 _f0;
    uvec4 _f1;
    mat2x3 _f2;
    mat2x4 _f3;
    vec3 _f4;
    float GLF_dead7p;
};

struct _GLF_struct_65 {
    ivec3 _f0;
};

struct _GLF_struct_64 {
    _GLF_struct_65 _f0;
    int GLF_dead11i;
};

struct _GLF_struct_63 {
    mat4x2 _f0;
    ivec2 _f1;
    mat2 _f2;
    mat3x4 _f3;
    ivec3 _f4;
    vec2 _f5;
};

struct _GLF_struct_62 {
    _GLF_struct_63 _f0;
    mat2 _f1;
};

struct _GLF_struct_61 {
    vec4 _f0;
    mat4x2 _f1;
    vec2 _f2;
    mat4x2 _f3;
};

struct _GLF_struct_60 {
    bvec4 _f0;
    _GLF_struct_61 _f1;
    mat4 _f2;
    mat4 _f3;
    vec2 _f4;
};

struct _GLF_struct_59 {
    _GLF_struct_60 _f0;
    mat2x4 _f1;
    _GLF_struct_62 _f2;
    mat2x4 _f3;
    _GLF_struct_64 _f4;
    uvec3 _f5;
};

struct _GLF_struct_73 {
    mat4 _f0;
    int _f1;
    uvec3 _f2;
    mat2 _f3;
};

struct _GLF_struct_72 {
    mat2x3 _f0;
    _GLF_struct_73 _f1;
};

struct _GLF_struct_71 {
    mat2 _f0;
    uvec4 _f1;
    float _f2;
    int _f3;
    mat3x2 _f4;
    int donor_replacementGLF_dead10i;
};

struct _GLF_struct_70 {
    _GLF_struct_71 _f0;
};

struct _GLF_struct_69 {
    float _f0;
};

struct _GLF_struct_68 {
    uint _f0;
    ivec3 _f1;
    mat3 _f2;
    uvec3 _f3;
    mat3x2 _f4;
    uvec4 _f5;
    ivec2 _f6;
};

struct _GLF_struct_67 {
    _GLF_struct_68 _f0;
};

struct _GLF_struct_66 {
    mat4x2 _f0;
    bvec3 _f1;
    _GLF_struct_67 _f2;
    _GLF_struct_69 _f3;
    _GLF_struct_70 _f4;
    _GLF_struct_72 _f5;
};

struct _GLF_struct_76 {
    int GLF_dead10j;
    mat4x2 _f0;
};

struct _GLF_struct_75 {
    float _f0;
    vec2 _f1;
    mat3x4 _f2;
    mat3x2 _f3;
    float _f4;
};

struct _GLF_struct_74 {
    _GLF_struct_75 _f0;
    _GLF_struct_76 _f1;
    int _f2;
    bvec3 _f3;
    ivec3 _f4;
};

struct _GLF_struct_84 {
    ivec2 _f0;
};

struct _GLF_struct_83 {
    uvec3 _f0;
    mat3 _f1;
    uvec3 _f2;
    uvec2 _f3;
    ivec4 _f4;
};

struct _GLF_struct_82 {
    uint _f0;
    mat2 _f1;
};

struct _GLF_struct_81 {
    uvec2 _f0;
    bvec4 _f1;
    float GLF_dead1stripe;
    mat4x3 _f2;
    _GLF_struct_82 _f3;
    _GLF_struct_83 _f4;
    _GLF_struct_84 _f5;
};

struct _GLF_struct_80 {
    mat2x4 _f0;
    float _f1;
    uvec4 _f2;
    mat4x2 _f3;
    bvec3 _f4;
};

struct _GLF_struct_79 {
    ivec2 _f0;
    uint _f1;
    ivec3 _f2;
    float _f3;
    uvec4 _f4;
    mat2x3 _f5;
};

struct _GLF_struct_78 {
    _GLF_struct_79 _f0;
    bool _f1;
    bvec3 _f2;
    uvec2 _f3;
    vec4 _f4;
    _GLF_struct_80 _f5;
    vec2 _f6;
};

struct _GLF_struct_77 {
    _GLF_struct_78 _f0;
    bvec2 _f1;
    _GLF_struct_81 _f2;
    mat4x3 _f3;
    int _f4;
    vec2 _f5;
};

layout(set = 0, binding = 2) uniform buf2 {
    vec2 GLF_dead11injectionSwitch;
};

struct GLF_dead8QuicksortObject {
    int numbers[10];
};

GLF_dead8QuicksortObject GLF_dead8obj = GLF_dead8QuicksortObject(int[10](0, 0, 0, 0, 0, 0, 0, 0, 0, 0));

void GLF_dead8swap(int GLF_dead8i, int GLF_dead8j) {
    int GLF_dead8temp = GLF_dead8obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead8i, 10)];
    GLF_dead8obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead8i, 10)] = GLF_dead8obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead8j, 10)];
    GLF_dead8obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead8j, 10)] = GLF_dead8temp;
}

layout(set = 0, binding = 3) uniform sampler2D GLF_dead10tex;
const float GLF_dead10weights[9] = float[9](1.0, 0.5, -0.25, 0.5, 1.0, -0.5, -0.25, -0.5, -1.0);

struct _GLF_struct_29 {
    vec2 _f0;
    ivec2 donor_replacementGLF_dead7pos;
    uvec4 _f1;
    uvec2 _f2;
};

struct _GLF_struct_28 {
    ivec3 _f0;
    mat3x2 _f1;
    mat4 _f2;
    float _f3;
    _GLF_struct_29 _f4;
};

struct _GLF_struct_27 {
    bvec2 _f0;
    bvec4 _f1;
    int _f2;
    _GLF_struct_28 _f3;
    mat3x2 _f4;
};

struct _GLF_struct_30 {
    bool donor_replacementGLF_dead1c3;
    vec2 _f0;
};

struct _GLF_struct_37 {
    ivec4 _f0;
    ivec4 _f1;
};

struct _GLF_struct_36 {
    _GLF_struct_37 _f0;
};

struct _GLF_struct_35 {
    ivec4 _f0;
    ivec4 _f1;
    ivec2 _f2;
    mat2x4 _f3;
    mat3x4 _f4;
};

struct _GLF_struct_34 {
    mat3x2 _f0;
    mat4x2 _f1;
    mat4x2 _f2;
    mat2 _f3;
    uvec2 _f4;
    mat4x3 _f5;
};

struct _GLF_struct_33 {
    mat3x2 _f0;
    uint _f1;
    mat2x4 _f2;
    uvec3 _f3;
    mat2x3 _f4;
};

struct _GLF_struct_32 {
    _GLF_struct_33 _f0;
    bool donor_replacementGLF_dead1c3;
    _GLF_struct_34 _f1;
    _GLF_struct_35 _f2;
    bvec4 _f3;
    mat4x3 _f4;
    mat2 _f5;
};

struct _GLF_struct_31 {
    _GLF_struct_32 _f0;
    mat2 _f1;
    _GLF_struct_36 _f2;
};

struct _GLF_struct_3 {
    mat3x4 _f0;
};

struct _GLF_struct_2 {
    mat4x3 _f0;
    _GLF_struct_3 _f1;
    mat3 _f2;
    float GLF_dead7p;
    bvec2 _f3;
};

struct _GLF_struct_6 {
    vec3 _f0;
    bvec2 _f1;
    float _f2;
    mat4x3 _f3;
    ivec3 _f4;
    ivec4 _f5;
};

struct _GLF_struct_5 {
    bvec3 _f0;
    ivec2 donor_replacementGLF_dead7pos;
    mat3 _f1;
};

struct _GLF_struct_4 {
    ivec4 _f0;
    _GLF_struct_5 _f1;
    mat4x2 _f2;
    mat2 _f3;
    _GLF_struct_6 _f4;
    uvec2 _f5;
};

struct _GLF_struct_9 {
    uint _f0;
    ivec2 _f1;
    mat3x2 _f2;
};

struct _GLF_struct_8 {
    float GLF_dead7p;
    _GLF_struct_9 _f0;
};

struct _GLF_struct_7 {
    mat4x3 _f0;
    bvec2 _f1;
    uint _f2;
    ivec3 _f3;
    bool _f4;
    _GLF_struct_8 _f5;
    mat4x2 _f6;
};

struct _GLF_struct_10 {
    float _f0;
    bool GLF_dead3res2;
    ivec2 _f1;
};

struct _GLF_struct_12 {
    mat4x3 _f0;
    ivec2 _f1;
    uvec4 _f2;
    vec2 donor_replacementGLF_dead1uv;
};

struct _GLF_struct_11 {
    mat3x2 _f0;
    int _f1;
    int _f2;
    _GLF_struct_12 _f3;
    uvec2 _f4;
    uint _f5;
    float _f6;
};

struct _GLF_struct_13 {
    vec2 donor_replacementGLF_dead3coord;
    mat3 _f0;
    mat3x2 _f1;
    int _f2;
    vec3 _f3;
    vec2 _f4;
};

struct _GLF_struct_14 {
    mat3x4 _f0;
    bvec2 _f1;
    int donor_replacementGLF_dead6b;
    uvec4 _f2;
};

struct _GLF_struct_17 {
    mat4 _f0;
    ivec3 _f1;
    bvec3 _f2;
    ivec2 _f3;
    mat3x4 _f4;
    uvec4 _f5;
};

struct _GLF_struct_16 {
    ivec2 _f0;
    _GLF_struct_17 _f1;
    uvec3 _f2;
};

struct _GLF_struct_15 {
    int donor_replacementGLF_dead4treeIndex;
    _GLF_struct_16 _f0;
};

struct _GLF_struct_22 {
    vec4 _f0;
    float _f1;
    ivec3 _f2;
    int _f3;
    vec4 _f4;
};

struct _GLF_struct_21 {
    uvec3 _f0;
    uint _f1;
    ivec3 _f2;
    uvec4 _f3;
};

struct _GLF_struct_20 {
    mat4x2 _f0;
    uint _f1;
    _GLF_struct_21 _f2;
    _GLF_struct_22 _f3;
    mat2 _f4;
};

struct _GLF_struct_19 {
    mat4 _f0;
    uvec2 _f1;
    mat2x3 _f2;
    vec3 _f3;
    bvec2 _f4;
};

struct _GLF_struct_18 {
    bool _f0;
    vec4 _f1;
    ivec4 _f2;
    _GLF_struct_19 _f3;
    uvec3 _f4;
    bool donor_replacementGLF_dead1c1;
    _GLF_struct_20 _f5;
    mat4 _f6;
};

struct _GLF_struct_26 {
    mat4x2 _f0;
};

struct _GLF_struct_25 {
    bool _f0;
    uvec2 _f1;
    bvec2 _f2;
};

struct _GLF_struct_24 {
    _GLF_struct_25 _f0;
    mat4x2 _f1;
};

struct _GLF_struct_23 {
    mat2x3 _f0;
    _GLF_struct_24 _f1;
    mat4x2 _f2;
    vec3 _f3;
    _GLF_struct_26 _f4;
    int donor_replacementGLF_dead0iteration;
};

layout(set = 0, binding = 4) uniform buf4 {
    vec2 GLF_dead6injectionSwitch;
};

struct GLF_dead4BST {
    int data;
    int leftIndex;
    int rightIndex;
};

GLF_dead4BST GLF_dead4tree[10] = GLF_dead4BST[10](GLF_dead4BST(0, 0, 0), GLF_dead4BST(0, 0, 0), GLF_dead4BST(0, 0, 0), GLF_dead4BST(0, 0, 0), GLF_dead4BST(0, 0, 0), GLF_dead4BST(0, 0, 0), GLF_dead4BST(0, 0, 0), GLF_dead4BST(0, 0, 0), GLF_dead4BST(0, 0, 0), GLF_dead4BST(0, 0, 0));

void GLF_dead4makeTreeNode(inout GLF_dead4BST GLF_dead4tree, int GLF_dead4data) {
    if (_GLF_DEAD(false)) {
        vec2 donor_replacementGLF_dead13coord = _GLF_FUZZED(smoothstep(GLF_dead6injectionSwitch, vec2(0.1, 1.1), vec2(-7.3, -4.3)));
        if (donor_replacementGLF_dead13coord.y < 0.6) {
            uvec2 GLF_dead13icoord = uvec2(((donor_replacementGLF_dead13coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
            uint GLF_dead13res1 = uint(((GLF_dead13icoord.x * GLF_dead13icoord.y) >> (GLF_dead13icoord.x & 31u)) & 0xffffffffu);
            uint GLF_dead13res2 = uint(((GLF_dead13icoord.x * GLF_dead13icoord.y) << (GLF_dead13icoord.x & 31u)) & 0xffffffffu);
            float GLF_dead13res = float(((GLF_dead13res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_dead13res1 & 1u) != 0u ? 1u : 0u));
            GLF_dead13_GLF_color = vec4(GLF_dead13res, GLF_dead13res, GLF_dead13res, 1.0);
        } else {
            ivec2 GLF_dead13icoord = ivec2(((donor_replacementGLF_dead13coord - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
            int GLF_dead13res3 = ((GLF_dead13icoord.x >> 5) & 1) ^ ((GLF_dead13icoord.y & 32) >> 5);
            int GLF_dead13res2 = (GLF_dead13icoord.y * GLF_dead13icoord.y >> 10) & 1;
            int GLF_dead13res1 = (GLF_dead13icoord.x * GLF_dead13icoord.y >> 9) & 1;
            GLF_dead13_GLF_color = vec4(float(GLF_dead13res1 ^ GLF_dead13res2), float(GLF_dead13res2 & GLF_dead13res3), float(GLF_dead13res1 | GLF_dead13res3), 1.0);
        }
    }
    GLF_dead4tree.data = GLF_dead4data;
    if (_GLF_DEAD(false)) {
        int donor_replacementGLF_dead15c = _GLF_FUZZED(98602);
        uint donor_replacementGLF_dead15matrix_number = _GLF_FUZZED(65594u);
        int donor_replacementGLF_dead15rows = _GLF_FUZZED(bitfieldInsert(-83383, GLF_dead4data, GLF_dead4data, (GLF_dead4data % (-11936))));
        {
            for (int GLF_dead15r = 0; GLF_dead15r < donor_replacementGLF_dead15rows; GLF_dead15r++) {
                switch (donor_replacementGLF_dead15matrix_number) {
                    case 0u:
                        GLF_dead15m22[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead15c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15r, 2)] = GLF_dead15one;
                        break;
                    case 1u:
                        GLF_dead15m23[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead15c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15r, 3)] = GLF_dead15one;
                        break;
                    case 2u:
                        GLF_dead15m24[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead15c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15r, 4)] = GLF_dead15one;
                        break;
                    case 3u:
                        GLF_dead15m32[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead15c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15r, 2)] = GLF_dead15one;
                        break;
                    case 4u:
                        GLF_dead15m33[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead15c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15r, 3)] = GLF_dead15one;
                        break;
                    case 5u:
                        GLF_dead15m34[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead15c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15r, 4)] = GLF_dead15one;
                        break;
                    case 6u:
                        GLF_dead15m42[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead15c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15r, 2)] = GLF_dead15one;
                        break;
                    case 7u:
                        GLF_dead15m43[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead15c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15r, 3)] = GLF_dead15one;
                        break;
                    case 8u:
                        GLF_dead15m44[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead15c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15r, 4)] = GLF_dead15one;
                        break;
                }
            }
        }
    }
    GLF_dead4tree.leftIndex = -1;
    GLF_dead4tree.rightIndex = -1;
}

const int GLF_dead7dp[256] = int[256](115, 133, 150, 164, 176, 184, 190, 192, 191, 187, 181, 172, 163, 153, 143, 134, 126, 120, 116, 114, 114, 117, 121, 127, 134, 141, 148, 154, 159, 162, 163, 161, 157, 151, 143, 134, 124, 113, 103, 94, 87, 82, 79, 80, 84, 91, 101, 114, 130, 146, 164, 182, 199, 215, 229, 240, 249, 254, 256, 254, 250, 243, 233, 223, 212, 200, 190, 180, 172, 166, 163, 161, 162, 164, 169, 174, 179, 185, 190, 193, 195, 195, 192, 188, 180, 171, 161, 149, 137, 125, 114, 105, 97, 93, 91, 93, 98, 106, 117, 130, 145, 161, 177, 193, 208, 221, 231, 239, 243, 244, 242, 236, 228, 218, 207, 194, 181, 169, 158, 148, 141, 135, 132, 131, 132, 135, 138, 143, 147, 151, 154, 155, 155, 152, 146, 139, 129, 118, 106, 93, 80, 68, 58, 49, 43, 40, 41, 44, 51, 61, 73, 87, 103, 119, 134, 149, 162, 173, 181, 186, 188, 186, 181, 174, 164, 153, 141, 128, 116, 104, 94, 86, 81, 77, 76, 77, 80, 84, 89, 94, 98, 102, 104, 104, 102, 98, 92, 83, 73, 62, 50, 38, 26, 16, 8, 2, 0, 0, 4, 11, 21, 33, 48, 64, 81, 98, 114, 129, 141, 151, 158, 161, 161, 158, 152, 144, 134, 123, 112, 100, 90, 81, 73, 68, 65, 65, 67, 70, 75, 81, 87, 92, 97, 101, 103, 102, 100, 95, 88, 79, 69, 58, 47, 36, 26, 18, 13, 11, 11, 15, 22, 32, 45, 60, 77, 94);

layout(set = 0, binding = 5) uniform buf5 {
    vec2 GLF_dead0resolution;
};

vec4 GLF_dead3_GLF_color = _GLF_FUZZED((mat3x4(3.5, 99.60, 5.6, -55.26, 872.907, 25.11, 0.8, 28.84, 8100.5674, 92.66, -5218.8494, 94.39) * vec4(-3264.6695, 29.20, 798.089, -2.5).pps.xzy));
vec4 GLF_dead1_GLF_color = _GLF_FUZZED(vec4(2601.6969, 5.7, 190.107, -3.8));

layout(set = 0, binding = 6) uniform buf6 {
    vec2 GLF_dead1injectionSwitch;
};

float GLF_dead1compute_derivative_x(float GLF_dead1v) {
    if (_GLF_DEAD(false)) {
        int donor_replacementGLF_dead4count = _GLF_FUZZED((ivec4(17611, 6098, 21682, 87770), ivec4(1840, 55782, 4734, -18722)).a);
        if (_GLF_DEAD(false)) {
            vec2 donor_replacementGLF_dead13coord = _GLF_FUZZED(GLF_dead1injectionSwitch);
            {
                ivec2 GLF_dead13icoord = ivec2(((donor_replacementGLF_dead13coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.6, 1.0)) * 256.0);
                int GLF_dead13v = (GLF_dead13icoord.x ^ GLF_dead13icoord.y) * GLF_dead13icoord.y;
                bool GLF_dead13res1 = ((GLF_dead13v >> 10) & 1) != 0;
                bool GLF_dead13res2 = ((GLF_dead13v >> 11) & 4) != 0;
                if (_GLF_DEAD(false)) {
                    return 1.0;
                }
                bool GLF_dead13res3 = ((GLF_dead13v >> 12) & 8) != 0;
                GLF_dead13_GLF_color = vec4(GLF_dead13res1 ? 1.0 : 0.0, GLF_dead13res2 ? 1.0 : 0.0, GLF_dead13res3 ? 1.0 : 0.0, 1);
            }
        }
        {
            donor_replacementGLF_dead4count++;
        }
    }
    return dFdx(GLF_dead1v) * GLF_dead1injectionSwitch.y;
}

float GLF_dead1compute_derivative_y(float GLF_dead1v) {
    return dFdy(GLF_dead1v) * GLF_dead1injectionSwitch.y;
}

float GLF_dead1compute_stripe(float GLF_dead1v, float GLF_dead1t) {
    return smoothstep(-.9, 1., (GLF_dead1v) / (20.0 * ((GLF_dead1injectionSwitch.y > GLF_dead1injectionSwitch.x) ? GLF_dead1compute_derivative_x(GLF_dead1t) : GLF_dead1compute_derivative_y(GLF_dead1t))));
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < length(vec2(0.0, 0.0)))))) {
        _GLF_struct_27 _GLF_struct_replacement_27 = _GLF_struct_27(bvec2(true, true), bvec4(true, true, true, true), 1, _GLF_struct_28(ivec3(1, 1, 1), mat3x2(1.0, 1.0, 1.0, 1.0, 1.0, 1.0), mat4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), 1.0, _GLF_struct_29(vec2(1.0, 1.0), _GLF_FUZZED(ivec2(4549, -85985)), uvec4(1u, 1u, 1u, 1u), uvec2(1u, 1u))), mat3x2(1.0, 1.0, 1.0, 1.0, 1.0, 1.0));
        {
            _GLF_struct_2 _GLF_struct_replacement_2 = _GLF_struct_2(mat4x3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), _GLF_struct_3(mat3x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0)), mat3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), (15.0 - abs(float(_GLF_struct_replacement_27._f3._f4.donor_replacementGLF_dead7pos.x - GLF_dead7dp[_GLF_MAKE_IN_BOUNDS_INT(_GLF_struct_replacement_27._f3._f4.donor_replacementGLF_dead7pos.y, 256)]))) / 15.0, bvec2(true, true));
            ;
        }
    }
}

struct _GLF_struct_0 {
    mat2x4 _f0;
    int to;
    bvec4 _f1;
    ivec3 _f2;
    bool _f3;
    bvec4 _f4;
};

struct _GLF_struct_1 {
    int i;
    mat3x2 _f0;
};

layout(location = 0) out vec4 _GLF_color;

layout(set = 0, binding = 0) uniform buf0 {
    vec2 injectionSwitch;
};

const int N = 10;
int data[10], temp[10];

void merge(int from, int mid, int to) {
    if (_GLF_DEAD(false)) {
        vec3 donor_replacementGLF_dead8color = _GLF_FUZZED(cosh(trunc(vec3(-15.70, -8.5, -9.7))));
        vec2 donor_replacementGLF_dead8uv = _GLF_FUZZED(fwidth(GLF_dead1injectionSwitch));
        if (donor_replacementGLF_dead8uv.y > (1.0 / 4.0)) {
            donor_replacementGLF_dead8color.x += float(GLF_dead8obj.numbers[5]);
        }
        if (_GLF_DEAD(false)) {
            {
                ivec2 GLF_dead13icoord = ivec2(((donor_replacementGLF_dead8uv - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                int GLF_dead13res3 = ((GLF_dead13icoord.x >> 5) & 1) ^ ((GLF_dead13icoord.y & 32) >> 5);
                int GLF_dead13res2 = (GLF_dead13icoord.y * GLF_dead13icoord.y >> 10) & 1;
                int GLF_dead13res1 = (GLF_dead13icoord.x * GLF_dead13icoord.y >> 9) & 1;
                GLF_dead13_GLF_color = vec4(float(GLF_dead13res1 ^ GLF_dead13res2), float(GLF_dead13res2 & GLF_dead13res3), float(GLF_dead13res1 | GLF_dead13res3), 1.0);
                if (_GLF_DEAD(false)) {
                    return;
                }
            }
        }
    }
    int k = from, i = from, j = mid + 1;
    while (i <= mid && j <= to) {
        if (data[i] < data[j]) {
            if (_GLF_DEAD(false)) {
                if (_GLF_DEAD(false)) {
                    vec2 donor_replacementGLF_dead13coord = _GLF_FUZZED(GLF_dead11injectionSwitch);
                    if (donor_replacementGLF_dead13coord.y < 0.6) {
                        uvec2 GLF_dead13icoord = uvec2(((donor_replacementGLF_dead13coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                        uint GLF_dead13res1 = uint(((GLF_dead13icoord.x * GLF_dead13icoord.y) >> (GLF_dead13icoord.x & 31u)) & 0xffffffffu);
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            discard;
                        }
                        uint GLF_dead13res2 = uint(((GLF_dead13icoord.x * GLF_dead13icoord.y) << (GLF_dead13icoord.x & 31u)) & 0xffffffffu);
                        float GLF_dead13res = float(((GLF_dead13res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_dead13res1 & 1u) != 0u ? 1u : 0u));
                        GLF_dead13_GLF_color = vec4(GLF_dead13res, GLF_dead13res, GLF_dead13res, 1.0);
                    } else {
                        ivec2 GLF_dead13icoord = ivec2(((donor_replacementGLF_dead13coord - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                        int GLF_dead13res3 = ((GLF_dead13icoord.x >> 5) & 1) ^ ((GLF_dead13icoord.y & 32) >> 5);
                        int GLF_dead13res2 = (GLF_dead13icoord.y * GLF_dead13icoord.y >> 10) & 1;
                        int GLF_dead13res1 = (GLF_dead13icoord.x * GLF_dead13icoord.y >> 9) & 1;
                        GLF_dead13_GLF_color = vec4(float(GLF_dead13res1 ^ GLF_dead13res2), float(GLF_dead13res2 & GLF_dead13res3), float(GLF_dead13res1 | GLF_dead13res3), 1.0);
                    }
                }
                int donor_replacementGLF_dead9i = _GLF_FUZZED(findLSB(-24722));
                float donor_replacementGLF_dead9ref = _GLF_FUZZED(log2(-289.735));
                float donor_replacementGLF_dead9s = _GLF_FUZZED(sign(distance(-817.883, -8920.1122)));
                if (mod(float(donor_replacementGLF_dead9i), donor_replacementGLF_dead9ref) <= 0.01) {
                    if (_GLF_DEAD(false)) {
                        {
                            break;
                        }
                    }
                    donor_replacementGLF_dead9s += 0.2;
                }
            }
            if (_GLF_DEAD(false)) {
                if (_GLF_DEAD(false)) {
                    _GLF_struct_4 _GLF_struct_replacement_4 = _GLF_struct_4(ivec4(1, 1, 1, 1), _GLF_struct_5(bvec3(true, true, true), _GLF_FUZZED((ivec2(-2747, 6860) >> k)), mat3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0)), mat4x2(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), mat2(1.0, 1.0, 1.0, 1.0), _GLF_struct_6(vec3(1.0, 1.0, 1.0), bvec2(true, true), 1.0, mat4x3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), ivec3(1, 1, 1), ivec4(1, 1, 1, 1)), uvec2(1u, 1u));
                    while (_GLF_struct_replacement_4._f1.donor_replacementGLF_dead7pos.y != 256) {
                        if (_GLF_struct_replacement_4._f1.donor_replacementGLF_dead7pos.x < GLF_dead7dp[_GLF_MAKE_IN_BOUNDS_INT(_GLF_struct_replacement_4._f1.donor_replacementGLF_dead7pos.y, 256)] + 15 && _GLF_struct_replacement_4._f1.donor_replacementGLF_dead7pos.x > GLF_dead7dp[_GLF_MAKE_IN_BOUNDS_INT(_GLF_struct_replacement_4._f1.donor_replacementGLF_dead7pos.y, 256)] - 15) {
                            float GLF_dead7p = (15.0 - abs(float(_GLF_struct_replacement_4._f1.donor_replacementGLF_dead7pos.x - GLF_dead7dp[_GLF_MAKE_IN_BOUNDS_INT(_GLF_struct_replacement_4._f1.donor_replacementGLF_dead7pos.y, 256)]))) / 15.0;
                            ;
                        }
                        _GLF_struct_replacement_4._f1.donor_replacementGLF_dead7pos.y++;
                    }
                }
                bool donor_replacementGLF_dead1c1 = _GLF_FUZZED((mat2(-90.37, 4579.7074, 187.128, -23.01) != mat2(-2103.5902, 59.29, 2.9, -61.37)));
                bool donor_replacementGLF_dead1c2 = _GLF_FUZZED((injectionSwitch.s <= 227.245));
                vec3 donor_replacementGLF_dead1col = _GLF_FUZZED((vec3(-585.200, 0.4, 304.049) * 2.6));
                vec2 donor_replacementGLF_dead1uv = _GLF_FUZZED(vec2(580.000, 6.6));
                if (_GLF_DEAD(false)) {
                    ivec2 donor_replacementGLF_dead7pos = _GLF_FUZZED(ivec2(-65682, 18923));
                    if (donor_replacementGLF_dead7pos.x < GLF_dead7dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead7pos.y, 256)] + 15 && donor_replacementGLF_dead7pos.x > GLF_dead7dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead7pos.y, 256)] - 15) {
                        _GLF_struct_7 _GLF_struct_replacement_7 = _GLF_struct_7(mat4x3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), bvec2(true, true), 1u, ivec3(1, 1, 1), true, _GLF_struct_8((15.0 - abs(float(donor_replacementGLF_dead7pos.x - GLF_dead7dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead7pos.y, 256)]))) / 15.0, _GLF_struct_9(1u, ivec2(1, 1), mat3x2(1.0, 1.0, 1.0, 1.0, 1.0, 1.0))), mat4x2(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0));
                        ;
                    }
                }
                if (!donor_replacementGLF_dead1c1 && donor_replacementGLF_dead1c2) {
                    float GLF_dead1stripe = GLF_dead1compute_stripe(tan((donor_replacementGLF_dead1uv.x + donor_replacementGLF_dead1uv.y) * 20.0), donor_replacementGLF_dead1uv.x + donor_replacementGLF_dead1uv.y);
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        break;
                    }
                    donor_replacementGLF_dead1col = mix(vec3(0.5, donor_replacementGLF_dead1uv.x, 0.1), vec3(.4, 0, .5), GLF_dead1stripe);
                    GLF_dead1_GLF_color = vec4(donor_replacementGLF_dead1col, 1.0);
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        {
                            discard;
                        }
                    }
                    return;
                    if (_GLF_DEAD(false)) {
                        ivec2 donor_replacementGLF_dead7pos = _GLF_FUZZED(ivec2(-67963, 15739));
                        while (donor_replacementGLF_dead7pos.y != 256) {
                            if (donor_replacementGLF_dead7pos.x < GLF_dead7dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead7pos.y, 256)] + 15 && donor_replacementGLF_dead7pos.x > GLF_dead7dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead7pos.y, 256)] - 15) {
                                float GLF_dead7p = (15.0 - abs(float(donor_replacementGLF_dead7pos.x - GLF_dead7dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead7pos.y, 256)]))) / 15.0;
                                ;
                            }
                            donor_replacementGLF_dead7pos.y++;
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            return;
                        }
                    }
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        float donor_replacementGLF_dead9limit = _GLF_FUZZED(GLF_dead1_GLF_color[1]);
                        float donor_replacementGLF_dead9ref = _GLF_FUZZED(determinant(mat3(8.2, -6012.2155, -360.930, -9947.5506, -9.4, -5.6, -8.1, -9.0, 1.9)));
                        float donor_replacementGLF_dead9s = _GLF_FUZZED(vec2(829.606, -539.992).t);
                        {
                            if (mod(float(j), donor_replacementGLF_dead9ref) <= 0.01) {
                                donor_replacementGLF_dead9s += 0.2;
                            }
                            if (float(j) >= donor_replacementGLF_dead9limit) {
                                ;
                            }
                            j++;
                        }
                    }
                    ivec2 donor_replacementGLF_dead7pos = _GLF_FUZZED((~ivec2(-19339, -14108)));
                    {
                        float GLF_dead7p = (15.0 - abs(float(donor_replacementGLF_dead7pos.x - GLF_dead7dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead7pos.y, 256)]))) / 15.0;
                        ;
                    }
                }
            }
            temp[k++] = data[i++];
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                vec2 donor_replacementGLF_dead13coord = _GLF_FUZZED(GLF_dead11injectionSwitch);
                {
                    ivec2 GLF_dead13icoord = ivec2(((donor_replacementGLF_dead13coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.6, 1.0)) * 256.0);
                    int GLF_dead13v = (GLF_dead13icoord.x ^ GLF_dead13icoord.y) * GLF_dead13icoord.y;
                    bool GLF_dead13res1 = ((GLF_dead13v >> 10) & 1) != 0;
                    bool GLF_dead13res2 = ((GLF_dead13v >> 11) & 4) != 0;
                    bool GLF_dead13res3 = ((GLF_dead13v >> 12) & 8) != 0;
                    GLF_dead13_GLF_color = vec4(GLF_dead13res1 ? 1.0 : 0.0, GLF_dead13res2 ? 1.0 : 0.0, GLF_dead13res3 ? 1.0 : 0.0, 1);
                }
            }
        } else {
            temp[k++] = data[j++];
        }
    }
    while (i < N && i <= mid) {
        if (_GLF_DEAD(false)) {
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                if (_GLF_DEAD(false)) {
                    return;
                }
                int donor_replacementGLF_dead4data = _GLF_FUZZED(clamp(k, mid, from));
                int donor_replacementGLF_dead4treeIndex = _GLF_FUZZED(to);
                if (GLF_dead4tree[_GLF_MAKE_IN_BOUNDS_INT(mid, 10)].leftIndex == -1) {
                    GLF_dead4tree[_GLF_MAKE_IN_BOUNDS_INT(mid, 10)].leftIndex = donor_replacementGLF_dead4treeIndex;
                    GLF_dead4makeTreeNode(GLF_dead4tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4treeIndex, 10)], donor_replacementGLF_dead4data);
                    return;
                } else {
                    mid = GLF_dead4tree[_GLF_MAKE_IN_BOUNDS_INT(mid, 10)].leftIndex;
                    if (_GLF_DEAD(_GLF_IDENTITY(false, (false) || false))) {
                        vec2 donor_replacementGLF_dead13coord = _GLF_FUZZED(atan(GLF_dead11injectionSwitch));
                        {
                            ivec2 GLF_dead13icoord = ivec2(((donor_replacementGLF_dead13coord - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                            int GLF_dead13res3 = ((GLF_dead13icoord.x >> 5) & 1) ^ ((GLF_dead13icoord.y & 32) >> 5);
                            int GLF_dead13res2 = (GLF_dead13icoord.y * GLF_dead13icoord.y >> 10) & 1;
                            int GLF_dead13res1 = (GLF_dead13icoord.x * GLF_dead13icoord.y >> 9) & 1;
                            GLF_dead13_GLF_color = vec4(float(GLF_dead13res1 ^ GLF_dead13res2), float(GLF_dead13res2 & GLF_dead13res3), float(GLF_dead13res1 | GLF_dead13res3), 1.0);
                        }
                    }
                    continue;
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                            int donor_replacementGLF_dead15cols = _GLF_FUZZED(from);
                            uint donor_replacementGLF_dead15matrix_number = _GLF_FUZZED((199618u, 82433u));
                            {
                                for (int GLF_dead15c = 0; GLF_dead15c < donor_replacementGLF_dead15cols; GLF_dead15c++) {
                                    for (int GLF_dead15r = 0; GLF_dead15r < donor_replacementGLF_dead4data; GLF_dead15r++) {
                                        switch (donor_replacementGLF_dead15matrix_number) {
                                            case 0u:
                                                GLF_dead15m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15r, 2)] = GLF_dead15one;
                                                break;
                                            case 1u:
                                                GLF_dead15m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15r, 3)] = GLF_dead15one;
                                                break;
                                            case 2u:
                                                GLF_dead15m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15r, 4)] = GLF_dead15one;
                                                break;
                                            case 3u:
                                                GLF_dead15m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15r, 2)] = GLF_dead15one;
                                                break;
                                            case 4u:
                                                GLF_dead15m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15r, 3)] = GLF_dead15one;
                                                break;
                                            case 5u:
                                                GLF_dead15m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15r, 4)] = GLF_dead15one;
                                                break;
                                            case 6u:
                                                GLF_dead15m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15r, 2)] = GLF_dead15one;
                                                break;
                                            case 7u:
                                                GLF_dead15m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15r, 3)] = GLF_dead15one;
                                                break;
                                            case 8u:
                                                GLF_dead15m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15r, 4)] = GLF_dead15one;
                                                break;
                                        }
                                    }
                                }
                                donor_replacementGLF_dead15matrix_number = donor_replacementGLF_dead15matrix_number + 1u;
                            }
                        }
                        vec2 donor_replacementGLF_dead10coord = _GLF_FUZZED(mat3x2(45.49, -5589.8198, 30.25, 54.32, 7.1, -521.190)[2]);
                        float donor_replacementGLF_dead10uvstep = _GLF_FUZZED(1682.2008);
                        {
                            for (int GLF_dead10j = 0; GLF_dead10j < 3; GLF_dead10j++) {
                                GLF_dead1_GLF_color += texture(GLF_dead10tex, donor_replacementGLF_dead10coord + vec2(float(mid - 1) * donor_replacementGLF_dead10uvstep, float(GLF_dead10j - 1) * donor_replacementGLF_dead10uvstep)) * GLF_dead10weights[_GLF_MAKE_IN_BOUNDS_INT(mid * 3 + GLF_dead10j, 9)];
                            }
                        }
                    }
                }
            }
            vec2 donor_replacementGLF_dead3coord = _GLF_FUZZED(vec2(-171.186, 58.92));
            {
                ivec2 GLF_dead3icoord = ivec2(((donor_replacementGLF_dead3coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.6, 1.0)) * 256.0);
                int GLF_dead3v = (GLF_dead3icoord.x ^ GLF_dead3icoord.y) * GLF_dead3icoord.y;
                bool GLF_dead3res1 = ((GLF_dead3v >> 10) & 1) != 0;
                _GLF_struct_10 _GLF_struct_replacement_10 = _GLF_struct_10(1.0, ((GLF_dead3v >> 11) & 4) != 0, ivec2(1, 1));
                bool GLF_dead3res3 = ((GLF_dead3v >> 12) & 8) != 0;
                GLF_dead3_GLF_color = vec4(GLF_dead3res1 ? 1.0 : 0.0, _GLF_struct_replacement_10.GLF_dead3res2 ? 1.0 : 0.0, GLF_dead3res3 ? 1.0 : 0.0, 1);
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    vec4 donor_replacementGLF_dead9c = _GLF_FUZZED(dFdyFine(GLF_dead3_GLF_color));
                    if (_GLF_DEAD(false)) {
                        return;
                    }
                    int donor_replacementGLF_dead9i = _GLF_FUZZED(from);
                    {
                        if (donor_replacementGLF_dead9c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9i, 4)] >= 1.0) {
                            donor_replacementGLF_dead9c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9i, 4)] = donor_replacementGLF_dead9c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9i, 4)] * donor_replacementGLF_dead9c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9i, 4)];
                        }
                        donor_replacementGLF_dead9i++;
                    }
                }
            }
        }
        temp[k++] = data[i++];
    }
    for (int i = from; i <= to; i++) {
        data[i] = temp[i];
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
        _GLF_struct_38 _GLF_struct_replacement_38 = _GLF_struct_38(ivec4(1, 1, 1, 1), _GLF_FUZZED(384.302));
        float donor_replacementGLF_dead9ref = _GLF_FUZZED(2068.6671);
        if (_GLF_DEAD(false)) {
            return;
        }
        float donor_replacementGLF_dead9s = _GLF_FUZZED(floor(-211.017));
        while (i < bitfieldInsert(800, i, 0, 0)) {
            if (mod(float(i), donor_replacementGLF_dead9ref) <= 0.01) {
                donor_replacementGLF_dead9s += 0.2;
            }
            if (float(i) >= _GLF_struct_replacement_38.donor_replacementGLF_dead9limit) {
                ;
            }
            i++;
        }
    }
    if (_GLF_DEAD(false)) {
        if (_GLF_DEAD(false)) {
            int donor_replacementGLF_dead9i = _GLF_FUZZED(mid);
            float donor_replacementGLF_dead9limit = _GLF_FUZZED(-1.2);
            float donor_replacementGLF_dead9ref = _GLF_FUZZED(266.826);
            float donor_replacementGLF_dead9s = _GLF_FUZZED(72.23);
            {
                if (mod(float(donor_replacementGLF_dead9i), donor_replacementGLF_dead9ref) <= 0.01) {
                    donor_replacementGLF_dead9s += 0.2;
                }
                if (float(donor_replacementGLF_dead9i) >= donor_replacementGLF_dead9limit) {
                    ;
                }
                donor_replacementGLF_dead9i++;
            }
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            return;
        }
        {
            ;
        }
    }
    if (_GLF_DEAD(false)) {
        vec2 donor_replacementGLF_dead13coord = _GLF_FUZZED((mat2(mat2x4(-2.9, -524.176, 6.0, 324.254, -365.582, -6877.9031, 3.5, -7.5)) * mat4x2(-422.669, 9969.8336, -8.6, -859.310, -353.044, 6.4, -4.3, -604.880)[1]));
        if (donor_replacementGLF_dead13coord.x > 0.4) {
            if (donor_replacementGLF_dead13coord.y < 0.6) {
                uvec2 GLF_dead13icoord = uvec2(((donor_replacementGLF_dead13coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                uint GLF_dead13res1 = uint(((GLF_dead13icoord.x * GLF_dead13icoord.y) >> (GLF_dead13icoord.x & 31u)) & 0xffffffffu);
                uint GLF_dead13res2 = uint(((GLF_dead13icoord.x * GLF_dead13icoord.y) << (GLF_dead13icoord.x & 31u)) & 0xffffffffu);
                float GLF_dead13res = float(((GLF_dead13res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_dead13res1 & 1u) != 0u ? 1u : 0u));
                GLF_dead13_GLF_color = vec4(GLF_dead13res, GLF_dead13res, GLF_dead13res, 1.0);
            } else {
                ivec2 GLF_dead13icoord = ivec2(((donor_replacementGLF_dead13coord - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                int GLF_dead13res3 = ((GLF_dead13icoord.x >> 5) & 1) ^ ((GLF_dead13icoord.y & 32) >> 5);
                int GLF_dead13res2 = (GLF_dead13icoord.y * GLF_dead13icoord.y >> 10) & 1;
                int GLF_dead13res1 = (GLF_dead13icoord.x * GLF_dead13icoord.y >> 9) & 1;
                GLF_dead13_GLF_color = vec4(float(GLF_dead13res1 ^ GLF_dead13res2), float(GLF_dead13res2 & GLF_dead13res3), float(GLF_dead13res1 | GLF_dead13res3), 1.0);
            }
        } else {
            ivec2 GLF_dead13icoord = ivec2(((donor_replacementGLF_dead13coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.6, 1.0)) * 256.0);
            int GLF_dead13v = (GLF_dead13icoord.x ^ GLF_dead13icoord.y) * GLF_dead13icoord.y;
            bool GLF_dead13res1 = ((GLF_dead13v >> 10) & 1) != 0;
            bool GLF_dead13res2 = ((GLF_dead13v >> 11) & 4) != 0;
            bool GLF_dead13res3 = ((GLF_dead13v >> 12) & 8) != 0;
            GLF_dead13_GLF_color = vec4(GLF_dead13res1 ? 1.0 : 0.0, GLF_dead13res2 ? 1.0 : 0.0, GLF_dead13res3 ? 1.0 : 0.0, 1);
        }
    }
}

void mergeSort() {
    int low = 0;
    int high = N - 1;
    for (int m = 1; m <= high; m = 2 * m) {
        for (int i = low; i < high; i += 2 * m) {
            int from = i;
            int mid = i + m - 1;
            _GLF_struct_0 _GLF_struct_replacement_0 = _GLF_struct_0(mat2x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), min(i + 2 * m - 1, high), bvec4(true, true, true, true), ivec3(1, 1, 1), true, bvec4(true, true, true, true));
            merge(from, mid, _GLF_struct_replacement_0.to);
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                break;
            }
            if (_GLF_DEAD(false)) {
                discard;
            }
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            discard;
        }
    }
}

void main() {
    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
        if (_GLF_DEAD(false)) {
            int donor_replacementGLF_dead4count = _GLF_FUZZED((38331 | N));
            {
                if (_GLF_DEAD(false)) {
                    vec2 donor_replacementGLF_dead13coord = _GLF_FUZZED(GLF_dead0resolution);
                    if (donor_replacementGLF_dead13coord.y < 0.6) {
                        uvec2 GLF_dead13icoord = uvec2(((donor_replacementGLF_dead13coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                        uint GLF_dead13res1 = uint(((GLF_dead13icoord.x * GLF_dead13icoord.y) >> (GLF_dead13icoord.x & 31u)) & 0xffffffffu);
                        uint GLF_dead13res2 = uint(((GLF_dead13icoord.x * GLF_dead13icoord.y) << (GLF_dead13icoord.x & 31u)) & 0xffffffffu);
                        float GLF_dead13res = float(((GLF_dead13res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_dead13res1 & 1u) != 0u ? 1u : 0u));
                        GLF_dead13_GLF_color = vec4(GLF_dead13res, GLF_dead13res, GLF_dead13res, 1.0);
                    } else {
                        ivec2 GLF_dead13icoord = ivec2(((donor_replacementGLF_dead13coord - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                        int GLF_dead13res3 = ((GLF_dead13icoord.x >> 5) & 1) ^ ((GLF_dead13icoord.y & 32) >> 5);
                        int GLF_dead13res2 = (GLF_dead13icoord.y * GLF_dead13icoord.y >> 10) & 1;
                        int GLF_dead13res1 = (GLF_dead13icoord.x * GLF_dead13icoord.y >> 9) & 1;
                        GLF_dead13_GLF_color = vec4(float(GLF_dead13res1 ^ GLF_dead13res2), float(GLF_dead13res2 & GLF_dead13res3), float(GLF_dead13res1 | GLF_dead13res3), 1.0);
                    }
                }
                donor_replacementGLF_dead4count++;
            }
        }
        if (_GLF_DEAD(false)) {
            vec3 donor_replacementGLF_dead8color = _GLF_FUZZED(vec3(0.6, -722.057, 0.4));
            {
                donor_replacementGLF_dead8color.z += float(GLF_dead8obj.numbers[7]);
            }
        }
        bool donor_replacementGLF_dead1c1 = _GLF_FUZZED(any(bvec4(true, true, false, false)));
        bool donor_replacementGLF_dead1c2 = _GLF_FUZZED(any(lessThanEqual(ivec4(71086, -45571, 58885, 27), ivec4(29631, -94218, 82987, -16998))));
        _GLF_struct_30 _GLF_struct_replacement_30 = _GLF_struct_30(_GLF_FUZZED(false), vec2(1.0, 1.0));
        if (_GLF_DEAD(false)) {
            vec2 donor_replacementGLF_dead13coord = _GLF_FUZZED(GLF_dead6injectionSwitch);
            {
                uvec2 GLF_dead13icoord = uvec2(((donor_replacementGLF_dead13coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                uint GLF_dead13res1 = uint(((GLF_dead13icoord.x * GLF_dead13icoord.y) >> (GLF_dead13icoord.x & 31u)) & 0xffffffffu);
                uint GLF_dead13res2 = uint(((GLF_dead13icoord.x * GLF_dead13icoord.y) << (GLF_dead13icoord.x & 31u)) & 0xffffffffu);
                float GLF_dead13res = float(((GLF_dead13res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_dead13res1 & 1u) != 0u ? 1u : 0u));
                GLF_dead13_GLF_color = vec4(GLF_dead13res, GLF_dead13res, GLF_dead13res, 1.0);
            }
        }
        vec3 donor_replacementGLF_dead1col = _GLF_FUZZED(vec3(vec4(-5.2, -7.6, -995.836, 8.0)));
        if (_GLF_DEAD(_GLF_IDENTITY(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)), _GLF_IDENTITY(bool(bool(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))), !(!(bool(bool(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))))))))) {
            {
                discard;
            }
        }
        _GLF_struct_11 _GLF_struct_replacement_11 = _GLF_struct_11(mat3x2(1.0, 1.0, 1.0, 1.0, 1.0, 1.0), 1, 1, _GLF_struct_12(mat4x3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), ivec2(1, 1), uvec4(1u, 1u, 1u, 1u), _GLF_FUZZED(dFdxCoarse(vec2(-235.785, 7.5)))), uvec2(1u, 1u), 1u, 1.0);
        if (!donor_replacementGLF_dead1c1 && !donor_replacementGLF_dead1c2 && _GLF_struct_replacement_30.donor_replacementGLF_dead1c3) {
            if (_GLF_DEAD(false)) {
                return;
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    return;
                }
                vec2 donor_replacementGLF_dead10coord = _GLF_FUZZED(dFdyFine(injectionSwitch));
                vec4 donor_replacementGLF_dead10res = _GLF_FUZZED(vec4(8.0, 86.44, 0.4, 1765.5412));
                float donor_replacementGLF_dead10uvstep = _GLF_FUZZED(refract(78.48, log2(-196.389), 2.4));
                for (int GLF_dead10i = 0; GLF_dead10i < 3; GLF_dead10i++) {
                    for (int GLF_dead10j = 0; GLF_dead10j < 3; GLF_dead10j++) {
                        donor_replacementGLF_dead10res += texture(GLF_dead10tex, donor_replacementGLF_dead10coord + vec2(float(GLF_dead10i - 1) * donor_replacementGLF_dead10uvstep, float(GLF_dead10j - 1) * donor_replacementGLF_dead10uvstep)) * GLF_dead10weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10i * 3 + GLF_dead10j, 9)];
                    }
                }
            }
            float GLF_dead1stripe = GLF_dead1compute_stripe(cos((_GLF_struct_replacement_11._f3.donor_replacementGLF_dead1uv.x + _GLF_struct_replacement_11._f3.donor_replacementGLF_dead1uv.y) * 20.0), _GLF_struct_replacement_11._f3.donor_replacementGLF_dead1uv.x + _GLF_struct_replacement_11._f3.donor_replacementGLF_dead1uv.y);
            donor_replacementGLF_dead1col = mix(vec3(.7, sinh(_GLF_struct_replacement_11._f3.donor_replacementGLF_dead1uv.x), _GLF_struct_replacement_11._f3.donor_replacementGLF_dead1uv.x), vec3(.3, .5, _GLF_struct_replacement_11._f3.donor_replacementGLF_dead1uv.x), GLF_dead1stripe);
            if (_GLF_DEAD(false)) {
                int donor_replacementGLF_dead4count = _GLF_FUZZED((N ^ ((+72626) / (-66351))));
                if (_GLF_DEAD(false)) {
                    return;
                }
                {
                    donor_replacementGLF_dead4count++;
                }
            }
            GLF_dead1_GLF_color = vec4(donor_replacementGLF_dead1col, 1.0);
            return;
        }
    }
    _GLF_struct_1 _GLF_struct_replacement_1 = _GLF_struct_1(int(injectionSwitch.x), mat3x2(1.0, 1.0, 1.0, 1.0, 1.0, 1.0));
    do {
        switch (_GLF_struct_replacement_1.i) {
            case 0:
                data[_GLF_struct_replacement_1.i] = 4;
                break;
                if (_GLF_DEAD(false)) {
                    _GLF_struct_13 _GLF_struct_replacement_13 = _GLF_struct_13(_GLF_FUZZED(pow(vec2(20.86, 6.9), sqrt(injectionSwitch))), mat3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), mat3x2(1.0, 1.0, 1.0, 1.0, 1.0, 1.0), 1, vec3(1.0, 1.0, 1.0), vec2(1.0, 1.0));
                    if (_GLF_struct_replacement_13.donor_replacementGLF_dead3coord.x > 0.4) {
                        if (_GLF_struct_replacement_13.donor_replacementGLF_dead3coord.y < 0.6) {
                            if (_GLF_DEAD(false)) {
                                vec2 donor_replacementGLF_dead13coord = _GLF_FUZZED(GLF_dead0resolution);
                                if (donor_replacementGLF_dead13coord.x > 0.4) {
                                    if (donor_replacementGLF_dead13coord.y < 0.6) {
                                        uvec2 GLF_dead13icoord = uvec2(((donor_replacementGLF_dead13coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                                        uint GLF_dead13res1 = uint(((GLF_dead13icoord.x * GLF_dead13icoord.y) >> (GLF_dead13icoord.x & 31u)) & 0xffffffffu);
                                        uint GLF_dead13res2 = uint(((GLF_dead13icoord.x * GLF_dead13icoord.y) << (GLF_dead13icoord.x & 31u)) & 0xffffffffu);
                                        float GLF_dead13res = float(((GLF_dead13res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_dead13res1 & 1u) != 0u ? 1u : 0u));
                                        GLF_dead13_GLF_color = vec4(GLF_dead13res, GLF_dead13res, GLF_dead13res, 1.0);
                                    } else {
                                        ivec2 GLF_dead13icoord = ivec2(((donor_replacementGLF_dead13coord - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                            continue;
                                        }
                                        int GLF_dead13res3 = ((GLF_dead13icoord.x >> 5) & 1) ^ ((GLF_dead13icoord.y & 32) >> 5);
                                        int GLF_dead13res2 = (GLF_dead13icoord.y * GLF_dead13icoord.y >> 10) & 1;
                                        int GLF_dead13res1 = (GLF_dead13icoord.x * GLF_dead13icoord.y >> 9) & 1;
                                        GLF_dead13_GLF_color = vec4(float(GLF_dead13res1 ^ GLF_dead13res2), float(GLF_dead13res2 & GLF_dead13res3), float(GLF_dead13res1 | GLF_dead13res3), 1.0);
                                    }
                                } else {
                                    ivec2 GLF_dead13icoord = ivec2(((donor_replacementGLF_dead13coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.6, 1.0)) * 256.0);
                                    int GLF_dead13v = (GLF_dead13icoord.x ^ GLF_dead13icoord.y) * GLF_dead13icoord.y;
                                    bool GLF_dead13res1 = ((GLF_dead13v >> 10) & 1) != 0;
                                    bool GLF_dead13res2 = ((GLF_dead13v >> 11) & 4) != 0;
                                    bool GLF_dead13res3 = ((GLF_dead13v >> 12) & 8) != 0;
                                    GLF_dead13_GLF_color = vec4(GLF_dead13res1 ? 1.0 : 0.0, GLF_dead13res2 ? 1.0 : 0.0, GLF_dead13res3 ? 1.0 : 0.0, 1);
                                }
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                vec2 donor_replacementGLF_dead10coord = _GLF_FUZZED(GLF_dead0resolution);
                                int donor_replacementGLF_dead10i = _GLF_FUZZED(clamp(N, (true ? 2581 : N), -88426));
                                float donor_replacementGLF_dead10uvstep = _GLF_FUZZED(GLF_dead3_GLF_color.p);
                                {
                                    for (int GLF_dead10j = 0; GLF_dead10j < 3; GLF_dead10j++) {
                                        GLF_dead1_GLF_color += texture(GLF_dead10tex, donor_replacementGLF_dead10coord + vec2(float(donor_replacementGLF_dead10i - 1) * donor_replacementGLF_dead10uvstep, float(GLF_dead10j - 1) * donor_replacementGLF_dead10uvstep)) * GLF_dead10weights[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead10i * 3 + GLF_dead10j, 9)];
                                    }
                                }
                            }
                            uvec2 GLF_dead3icoord = uvec2(((_GLF_struct_replacement_13.donor_replacementGLF_dead3coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                            uint GLF_dead3res1 = uint(((GLF_dead3icoord.x * GLF_dead3icoord.y) >> (GLF_dead3icoord.x & 31u)) & 0xffffffffu);
                            uint GLF_dead3res2 = uint(((GLF_dead3icoord.x * GLF_dead3icoord.y) << (GLF_dead3icoord.x & 31u)) & 0xffffffffu);
                            float GLF_dead3res = float(((GLF_dead3res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_dead3res1 & 1u) != 0u ? 1u : 0u));
                            GLF_dead3_GLF_color = vec4(GLF_dead3res, GLF_dead3res, GLF_dead3res, 1.0);
                        } else {
                            ivec2 GLF_dead3icoord = ivec2(((_GLF_struct_replacement_13.donor_replacementGLF_dead3coord - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                            int GLF_dead3res3 = ((GLF_dead3icoord.x >> 5) & 1) ^ ((GLF_dead3icoord.y & 32) >> 5);
                            int GLF_dead3res2 = (GLF_dead3icoord.y * GLF_dead3icoord.y >> 10) & 1;
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                vec3 donor_replacementGLF_dead8color = _GLF_FUZZED(vec3(31.14, 23.03, 5.5));
                                vec2 donor_replacementGLF_dead8uv = _GLF_FUZZED((asin(GLF_dead3_GLF_color) * mat2x4(-1.2, -76.04, -804.507, 0.9, 340.849, -318.431, 869.525, -2.3)));
                                if (_GLF_DEAD(false)) {
                                    if (donor_replacementGLF_dead8uv.x > 0.4) {
                                        if (donor_replacementGLF_dead8uv.y < 0.6) {
                                            uvec2 GLF_dead13icoord = uvec2(((donor_replacementGLF_dead8uv - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                                            uint GLF_dead13res1 = uint(((GLF_dead13icoord.x * GLF_dead13icoord.y) >> (GLF_dead13icoord.x & 31u)) & 0xffffffffu);
                                            uint GLF_dead13res2 = uint(((GLF_dead13icoord.x * GLF_dead13icoord.y) << (GLF_dead13icoord.x & 31u)) & 0xffffffffu);
                                            float GLF_dead13res = float(((GLF_dead13res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_dead13res1 & 1u) != 0u ? 1u : 0u));
                                            GLF_dead13_GLF_color = vec4(GLF_dead13res, GLF_dead13res, GLF_dead13res, 1.0);
                                        } else {
                                            ivec2 GLF_dead13icoord = ivec2(((donor_replacementGLF_dead8uv - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                                            int GLF_dead13res3 = ((GLF_dead13icoord.x >> 5) & 1) ^ ((GLF_dead13icoord.y & 32) >> 5);
                                            int GLF_dead13res2 = (GLF_dead13icoord.y * GLF_dead13icoord.y >> 10) & 1;
                                            int GLF_dead13res1 = (GLF_dead13icoord.x * GLF_dead13icoord.y >> 9) & 1;
                                            GLF_dead13_GLF_color = vec4(float(GLF_dead13res1 ^ GLF_dead13res2), float(GLF_dead13res2 & GLF_dead13res3), float(GLF_dead13res1 | GLF_dead13res3), 1.0);
                                        }
                                    } else {
                                        ivec2 GLF_dead13icoord = ivec2(((donor_replacementGLF_dead8uv - vec2(0.4, 0.0)) * vec2(1.0 / 0.6, 1.0)) * 256.0);
                                        int GLF_dead13v = (GLF_dead13icoord.x ^ GLF_dead13icoord.y) * GLF_dead13icoord.y;
                                        bool GLF_dead13res1 = ((GLF_dead13v >> 10) & 1) != 0;
                                        bool GLF_dead13res2 = ((GLF_dead13v >> 11) & 4) != 0;
                                        bool GLF_dead13res3 = ((GLF_dead13v >> 12) & 8) != 0;
                                        GLF_dead13_GLF_color = vec4(GLF_dead13res1 ? 1.0 : 0.0, GLF_dead13res2 ? 1.0 : 0.0, GLF_dead13res3 ? 1.0 : 0.0, 1);
                                    }
                                }
                                if (donor_replacementGLF_dead8uv.y > (3.0 / 4.0)) {
                                    donor_replacementGLF_dead8color.z += float(GLF_dead8obj.numbers[7]);
                                }
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                discard;
                                if (_GLF_DEAD(false)) {
                                    if (_GLF_DEAD(false)) {
                                        break;
                                    }
                                    for (int GLF_dead8i = 0; GLF_dead8i < 10; GLF_dead8i++) {
                                        GLF_dead8obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead8i, 10)] = (10 - GLF_dead8i);
                                        GLF_dead8obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead8i, 10)] = GLF_dead8obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead8i, 10)] * GLF_dead8obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead8i, 10)];
                                    }
                                }
                            }
                            if (_GLF_DEAD(false)) {
                                int donor_replacementGLF_dead9i = _GLF_FUZZED(floatBitsToInt(8798.1012));
                                _GLF_struct_39 _GLF_struct_replacement_39 = _GLF_struct_39(mat2x3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0), uvec4(1u, 1u, 1u, 1u), _GLF_struct_40(_GLF_struct_41(vec3(1.0, 1.0, 1.0), vec4(1.0, 1.0, 1.0, 1.0), bvec2(true, true), 1), ivec3(1, 1, 1), mat4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), mat3x2(1.0, 1.0, 1.0, 1.0, 1.0, 1.0), vec4(1.0, 1.0, 1.0, 1.0), mat2x3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0), 1), vec2(1.0, 1.0), mat4x3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), _GLF_FUZZED(faceforward(-35.84, -91.84, 6989.4352)), mat3x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), ivec2(1, 1));
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                    {
                                        break;
                                    }
                                }
                                float donor_replacementGLF_dead9s = _GLF_FUZZED(-79.00);
                                if (float(donor_replacementGLF_dead9i) >= _GLF_struct_replacement_39.donor_replacementGLF_dead9limit) {
                                    ;
                                }
                            }
                            _GLF_struct_42 _GLF_struct_replacement_42 = _GLF_struct_42((GLF_dead3icoord.x * GLF_dead3icoord.y >> 9) & 1, 1.0);
                            GLF_dead3_GLF_color = vec4(float(_GLF_struct_replacement_42.GLF_dead3res1 ^ GLF_dead3res2), float(GLF_dead3res2 & GLF_dead3res3), float(_GLF_struct_replacement_42.GLF_dead3res1 | GLF_dead3res3), 1.0);
                            if (_GLF_DEAD(false)) {
                                int donor_replacementGLF_dead15cols = _GLF_FUZZED(GLF_dead3res2);
                                uint donor_replacementGLF_dead15matrix_number = _GLF_FUZZED(packUnorm2x16(GLF_dead6injectionSwitch));
                                {
                                    for (int GLF_dead15c = 0; GLF_dead15c < donor_replacementGLF_dead15cols; GLF_dead15c++) {
                                        for (int GLF_dead15r = 0; GLF_dead15r < GLF_dead3res2; GLF_dead15r++) {
                                            switch (donor_replacementGLF_dead15matrix_number) {
                                                case 0u:
                                                    GLF_dead15m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15r, 2)] = GLF_dead15one;
                                                    break;
                                                case 1u:
                                                    GLF_dead15m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15r, 3)] = GLF_dead15one;
                                                    break;
                                                case 2u:
                                                    GLF_dead15m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15r, 4)] = GLF_dead15one;
                                                    break;
                                                case 3u:
                                                    GLF_dead15m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15r, 2)] = GLF_dead15one;
                                                    break;
                                                case 4u:
                                                    GLF_dead15m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15r, 3)] = GLF_dead15one;
                                                    break;
                                                case 5u:
                                                    GLF_dead15m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15r, 4)] = GLF_dead15one;
                                                    break;
                                                case 6u:
                                                    GLF_dead15m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15r, 2)] = GLF_dead15one;
                                                    break;
                                                case 7u:
                                                    GLF_dead15m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15r, 3)] = GLF_dead15one;
                                                    if (_GLF_DEAD(false)) {
                                                        break;
                                                    }
                                                    break;
                                                case 8u:
                                                    GLF_dead15m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15r, 4)] = GLF_dead15one;
                                                    break;
                                            }
                                        }
                                    }
                                    donor_replacementGLF_dead15matrix_number = donor_replacementGLF_dead15matrix_number + 1u;
                                }
                            }
                        }
                    } else {
                        _GLF_struct_43 _GLF_struct_replacement_43 = _GLF_struct_43(ivec4(1, 1, 1, 1), mat4x3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), mat4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), ivec2(((_GLF_struct_replacement_13.donor_replacementGLF_dead3coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.6, 1.0)) * 256.0));
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            if (_GLF_DEAD(false)) {
                                if (_GLF_DEAD(false)) {
                                    uint donor_replacementGLF_dead15matrix_number = _GLF_FUZZED(94753u);
                                    for (int GLF_dead15cols = 2; GLF_dead15cols <= 4; GLF_dead15cols++) {
                                        for (int GLF_dead15rows = 2; GLF_dead15rows <= 4; GLF_dead15rows++) {
                                            for (int GLF_dead15c = 0; GLF_dead15c < GLF_dead15cols; GLF_dead15c++) {
                                                for (int GLF_dead15r = 0; GLF_dead15r < GLF_dead15rows; GLF_dead15r++) {
                                                    switch (donor_replacementGLF_dead15matrix_number) {
                                                        case 0u:
                                                            GLF_dead15m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15r, 2)] = GLF_dead15one;
                                                            break;
                                                        case 1u:
                                                            GLF_dead15m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15r, 3)] = GLF_dead15one;
                                                            break;
                                                        case 2u:
                                                            GLF_dead15m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15r, 4)] = GLF_dead15one;
                                                            break;
                                                        case 3u:
                                                            GLF_dead15m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15r, 2)] = GLF_dead15one;
                                                            break;
                                                        case 4u:
                                                            GLF_dead15m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15r, 3)] = GLF_dead15one;
                                                            break;
                                                        case 5u:
                                                            GLF_dead15m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15r, 4)] = GLF_dead15one;
                                                            break;
                                                        case 6u:
                                                            GLF_dead15m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15r, 2)] = GLF_dead15one;
                                                            break;
                                                        case 7u:
                                                            GLF_dead15m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15r, 3)] = GLF_dead15one;
                                                            break;
                                                        case 8u:
                                                            if (_GLF_DEAD(false)) {
                                                                continue;
                                                            }
                                                            GLF_dead15m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15r, 4)] = GLF_dead15one;
                                                            break;
                                                    }
                                                }
                                            }
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                continue;
                                            }
                                            donor_replacementGLF_dead15matrix_number = donor_replacementGLF_dead15matrix_number + 1u;
                                        }
                                    }
                                }
                                vec2 donor_replacementGLF_dead10coord = _GLF_FUZZED(dFdyCoarse(_GLF_color).ts);
                                _GLF_struct_44 _GLF_struct_replacement_44 = _GLF_struct_44(ivec4(1, 1, 1, 1), _GLF_struct_45(_GLF_struct_46(mat4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), mat2(1.0, 1.0, 1.0, 1.0), mat2x3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0), ivec2(1, 1), 1, ivec2(1, 1)), bvec2(true, true), 1.0, 1u, _GLF_FUZZED((N + 65418)), true), _GLF_struct_47(mat2x3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0), 1.0, vec3(1.0, 1.0, 1.0)), vec3(1.0, 1.0, 1.0), bvec2(true, true), uvec4(1u, 1u, 1u, 1u));
                                float donor_replacementGLF_dead10uvstep = _GLF_FUZZED(62.48);
                                {
                                    for (int GLF_dead10j = 0; GLF_dead10j < 3; GLF_dead10j++) {
                                        _GLF_color += texture(GLF_dead10tex, donor_replacementGLF_dead10coord + vec2(float(_GLF_struct_replacement_44._f1.donor_replacementGLF_dead10i - 1) * donor_replacementGLF_dead10uvstep, float(GLF_dead10j - 1) * donor_replacementGLF_dead10uvstep)) * GLF_dead10weights[_GLF_MAKE_IN_BOUNDS_INT(_GLF_struct_replacement_44._f1.donor_replacementGLF_dead10i * 3 + GLF_dead10j, 9)];
                                    }
                                }
                            }
                            discard;
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < length(vec3(0.0, 0.0, 0.0)))))) {
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                int donor_replacementGLF_dead15cols = _GLF_FUZZED(findLSB(6607u));
                                uint donor_replacementGLF_dead15matrix_number = _GLF_FUZZED(((73263u / 10284u) * 178992u));
                                int donor_replacementGLF_dead15rows = _GLF_FUZZED(((-17298) >> (-32808)));
                                {
                                    if (_GLF_DEAD(false)) {
                                        break;
                                    }
                                    for (int GLF_dead15c = 0; GLF_dead15c < donor_replacementGLF_dead15cols; GLF_dead15c++) {
                                        for (int GLF_dead15r = 0; GLF_dead15r < donor_replacementGLF_dead15rows; GLF_dead15r++) {
                                            switch (donor_replacementGLF_dead15matrix_number) {
                                                case 0u:
                                                    GLF_dead15m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15r, 2)] = GLF_dead15one;
                                                    break;
                                                case 1u:
                                                    GLF_dead15m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15r, 3)] = GLF_dead15one;
                                                    break;
                                                case 2u:
                                                    GLF_dead15m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15r, 4)] = GLF_dead15one;
                                                    break;
                                                case 3u:
                                                    GLF_dead15m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15r, 2)] = GLF_dead15one;
                                                    break;
                                                case 4u:
                                                    GLF_dead15m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15r, 3)] = GLF_dead15one;
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                        discard;
                                                    }
                                                    break;
                                                case 5u:
                                                    GLF_dead15m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15r, 4)] = GLF_dead15one;
                                                    break;
                                                case 6u:
                                                    GLF_dead15m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15r, 2)] = GLF_dead15one;
                                                    break;
                                                case 7u:
                                                    GLF_dead15m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15r, 3)] = GLF_dead15one;
                                                    break;
                                                case 8u:
                                                    GLF_dead15m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15r, 4)] = GLF_dead15one;
                                                    break;
                                            }
                                        }
                                    }
                                    donor_replacementGLF_dead15matrix_number = donor_replacementGLF_dead15matrix_number + 1u;
                                }
                            }
                            if (_GLF_DEAD(false)) {
                                int donor_replacementGLF_dead6a = _GLF_FUZZED(N);
                                _GLF_struct_14 _GLF_struct_replacement_14 = _GLF_struct_14(mat3x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), bvec2(true, true), _GLF_FUZZED(mix(N, 96164, false)), uvec4(1u, 1u, 1u, 1u));
                                int donor_replacementGLF_dead6c = _GLF_FUZZED(60106);
                                do {
                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                        vec2 donor_replacementGLF_dead13coord = _GLF_FUZZED(GLF_dead0resolution);
                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                            continue;
                                        }
                                        {
                                            ivec2 GLF_dead13icoord = ivec2(((donor_replacementGLF_dead13coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.6, 1.0)) * 256.0);
                                            int GLF_dead13v = (GLF_dead13icoord.x ^ GLF_dead13icoord.y) * GLF_dead13icoord.y;
                                            bool GLF_dead13res1 = ((GLF_dead13v >> 10) & 1) != 0;
                                            bool GLF_dead13res2 = ((GLF_dead13v >> 11) & 4) != 0;
                                            bool GLF_dead13res3 = ((GLF_dead13v >> 12) & 8) != 0;
                                            GLF_dead13_GLF_color = vec4(GLF_dead13res1 ? 1.0 : 0.0, GLF_dead13res2 ? 1.0 : 0.0, GLF_dead13res3 ? 1.0 : 0.0, 1);
                                        }
                                        if (_GLF_DEAD(false)) {
                                            discard;
                                        }
                                    }
                                    if (_GLF_DEAD(false)) {
                                        int donor_replacementGLF_dead8pivot = _GLF_FUZZED(N);
                                        if (_GLF_DEAD(false)) {
                                            vec2 donor_replacementGLF_dead13coord = _GLF_FUZZED(GLF_dead0resolution);
                                            {
                                                ivec2 GLF_dead13icoord = ivec2(((donor_replacementGLF_dead13coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.6, 1.0)) * 256.0);
                                                int GLF_dead13v = (GLF_dead13icoord.x ^ GLF_dead13icoord.y) * GLF_dead13icoord.y;
                                                bool GLF_dead13res1 = ((GLF_dead13v >> 10) & 1) != 0;
                                                bool GLF_dead13res2 = ((GLF_dead13v >> 11) & 4) != 0;
                                                bool GLF_dead13res3 = ((GLF_dead13v >> 12) & 8) != 0;
                                                GLF_dead13_GLF_color = vec4(GLF_dead13res1 ? 1.0 : 0.0, GLF_dead13res2 ? 1.0 : 0.0, GLF_dead13res3 ? 1.0 : 0.0, 1);
                                            }
                                        }
                                        for (int GLF_dead8j = donor_replacementGLF_dead6a; GLF_dead8j <= donor_replacementGLF_dead6a - 1; GLF_dead8j++) {
                                            if (GLF_dead8obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead8j, 10)] <= donor_replacementGLF_dead8pivot) {
                                                donor_replacementGLF_dead6a++;
                                                GLF_dead8swap(donor_replacementGLF_dead6a, GLF_dead8j);
                                            }
                                        }
                                        if (_GLF_DEAD(false)) {
                                            continue;
                                        }
                                    }
                                    _GLF_struct_replacement_13.donor_replacementGLF_dead3coord.y -= step(GLF_dead6injectionSwitch.y, _GLF_struct_replacement_13.donor_replacementGLF_dead3coord.x) + float(donor_replacementGLF_dead6a) + float(_GLF_struct_replacement_14.donor_replacementGLF_dead6b);
                                    _GLF_struct_replacement_13.donor_replacementGLF_dead3coord.x += ldexp(GLF_dead6injectionSwitch.y, isinf(_GLF_struct_replacement_13.donor_replacementGLF_dead3coord.y + _GLF_struct_replacement_13.donor_replacementGLF_dead3coord.x) ? findMSB(_GLF_struct_replacement_14.donor_replacementGLF_dead6b) : findMSB(donor_replacementGLF_dead6a));
                                    donor_replacementGLF_dead6c--;
                                } while (donor_replacementGLF_dead6c > int(GLF_dead6injectionSwitch.x));
                            }
                            break;
                        }
                        int GLF_dead3v = (_GLF_struct_replacement_43.GLF_dead3icoord.x ^ _GLF_struct_replacement_43.GLF_dead3icoord.y) * _GLF_struct_replacement_43.GLF_dead3icoord.y;
                        bool GLF_dead3res1 = ((GLF_dead3v >> 10) & 1) != 0;
                        if (_GLF_DEAD(false)) {
                            vec2 donor_replacementGLF_dead10coord = _GLF_FUZZED(clamp(dFdyFine(injectionSwitch), -7.2, -5.8));
                            int donor_replacementGLF_dead10i = _GLF_FUZZED(bitCount(min(-35284, GLF_dead3v)));
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                {
                                    ivec2 GLF_dead13icoord = ivec2(((donor_replacementGLF_dead10coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.6, 1.0)) * 256.0);
                                    int GLF_dead13v = (GLF_dead13icoord.x ^ GLF_dead13icoord.y) * GLF_dead13icoord.y;
                                    bool GLF_dead13res1 = ((GLF_dead13v >> 10) & 1) != 0;
                                    bool GLF_dead13res2 = ((GLF_dead13v >> 11) & 4) != 0;
                                    bool GLF_dead13res3 = ((GLF_dead13v >> 12) & 8) != 0;
                                    GLF_dead13_GLF_color = vec4(GLF_dead13res1 ? 1.0 : 0.0, GLF_dead13res2 ? 1.0 : 0.0, GLF_dead13res3 ? 1.0 : 0.0, 1);
                                }
                            }
                            float donor_replacementGLF_dead10uvstep = _GLF_FUZZED(-3.4);
                            {
                                for (_GLF_struct_48 _GLF_struct_replacement_48 = _GLF_struct_48(true, 0); _GLF_struct_replacement_48.GLF_dead10j < 3; _GLF_struct_replacement_48.GLF_dead10j++) {
                                    _GLF_color += texture(GLF_dead10tex, donor_replacementGLF_dead10coord + vec2(float(donor_replacementGLF_dead10i - 1) * donor_replacementGLF_dead10uvstep, float(_GLF_struct_replacement_48.GLF_dead10j - 1) * donor_replacementGLF_dead10uvstep)) * GLF_dead10weights[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead10i * 3 + _GLF_struct_replacement_48.GLF_dead10j, 9)];
                                }
                            }
                        }
                        bool GLF_dead3res2 = ((GLF_dead3v >> 11) & 4) != 0;
                        if (_GLF_DEAD(false)) {
                            while (_GLF_struct_replacement_43.GLF_dead3icoord.y != 256) {
                                if (_GLF_struct_replacement_43.GLF_dead3icoord.x < GLF_dead7dp[_GLF_MAKE_IN_BOUNDS_INT(_GLF_struct_replacement_43.GLF_dead3icoord.y, 256)] + 15 && _GLF_struct_replacement_43.GLF_dead3icoord.x > GLF_dead7dp[_GLF_MAKE_IN_BOUNDS_INT(_GLF_struct_replacement_43.GLF_dead3icoord.y, 256)] - 15) {
                                    float GLF_dead7p = (15.0 - abs(float(_GLF_struct_replacement_43.GLF_dead3icoord.x - GLF_dead7dp[_GLF_MAKE_IN_BOUNDS_INT(_GLF_struct_replacement_43.GLF_dead3icoord.y, 256)]))) / 15.0;
                                    if (_GLF_DEAD(false)) {
                                        vec2 donor_replacementGLF_dead13coord = _GLF_FUZZED(GLF_dead1injectionSwitch);
                                        if (donor_replacementGLF_dead13coord.x > 0.4) {
                                            if (donor_replacementGLF_dead13coord.y < 0.6) {
                                                uvec2 GLF_dead13icoord = uvec2(((donor_replacementGLF_dead13coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                                                uint GLF_dead13res1 = uint(((GLF_dead13icoord.x * GLF_dead13icoord.y) >> (GLF_dead13icoord.x & 31u)) & 0xffffffffu);
                                                uint GLF_dead13res2 = uint(((GLF_dead13icoord.x * GLF_dead13icoord.y) << (GLF_dead13icoord.x & 31u)) & 0xffffffffu);
                                                float GLF_dead13res = float(((GLF_dead13res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_dead13res1 & 1u) != 0u ? 1u : 0u));
                                                GLF_dead13_GLF_color = vec4(GLF_dead13res, GLF_dead13res, GLF_dead13res, 1.0);
                                            } else {
                                                ivec2 GLF_dead13icoord = ivec2(((donor_replacementGLF_dead13coord - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                                                int GLF_dead13res3 = ((GLF_dead13icoord.x >> 5) & 1) ^ ((GLF_dead13icoord.y & 32) >> 5);
                                                int GLF_dead13res2 = (GLF_dead13icoord.y * GLF_dead13icoord.y >> 10) & 1;
                                                int GLF_dead13res1 = (GLF_dead13icoord.x * GLF_dead13icoord.y >> 9) & 1;
                                                GLF_dead13_GLF_color = vec4(float(GLF_dead13res1 ^ GLF_dead13res2), float(GLF_dead13res2 & GLF_dead13res3), float(GLF_dead13res1 | GLF_dead13res3), 1.0);
                                            }
                                        } else {
                                            ivec2 GLF_dead13icoord = ivec2(((donor_replacementGLF_dead13coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.6, 1.0)) * 256.0);
                                            int GLF_dead13v = (GLF_dead13icoord.x ^ GLF_dead13icoord.y) * GLF_dead13icoord.y;
                                            bool GLF_dead13res1 = ((GLF_dead13v >> 10) & 1) != 0;
                                            bool GLF_dead13res2 = ((GLF_dead13v >> 11) & 4) != 0;
                                            if (_GLF_DEAD(false)) {
                                                break;
                                            }
                                            bool GLF_dead13res3 = ((GLF_dead13v >> 12) & 8) != 0;
                                            GLF_dead13_GLF_color = vec4(GLF_dead13res1 ? 1.0 : 0.0, GLF_dead13res2 ? 1.0 : 0.0, GLF_dead13res3 ? 1.0 : 0.0, 1);
                                        }
                                    }
                                    ;
                                }
                                _GLF_struct_replacement_43.GLF_dead3icoord.y++;
                            }
                        }
                        bool GLF_dead3res3 = ((GLF_dead3v >> 12) & 8) != 0;
                        GLF_dead3_GLF_color = vec4(GLF_dead3res1 ? 1.0 : 0.0, GLF_dead3res2 ? 1.0 : 0.0, GLF_dead3res3 ? 1.0 : 0.0, 1);
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        if (_GLF_DEAD(false)) {
                            int donor_replacementGLF_dead9i = _GLF_FUZZED(bitCount(189319u));
                            {
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                    vec2 donor_replacementGLF_dead13coord = _GLF_FUZZED(atanh(GLF_dead1injectionSwitch));
                                    {
                                        uvec2 GLF_dead13icoord = uvec2(((donor_replacementGLF_dead13coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                                        uint GLF_dead13res1 = uint(((GLF_dead13icoord.x * GLF_dead13icoord.y) >> (GLF_dead13icoord.x & 31u)) & 0xffffffffu);
                                        uint GLF_dead13res2 = uint(((GLF_dead13icoord.x * GLF_dead13icoord.y) << (GLF_dead13icoord.x & 31u)) & 0xffffffffu);
                                        float GLF_dead13res = float(((GLF_dead13res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_dead13res1 & 1u) != 0u ? 1u : 0u));
                                        GLF_dead13_GLF_color = vec4(GLF_dead13res, GLF_dead13res, GLF_dead13res, 1.0);
                                    }
                                }
                                _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9i, 4)] = _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9i, 4)] * _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9i, 4)];
                            }
                            if (_GLF_DEAD(false)) {
                                vec2 donor_replacementGLF_dead13coord = _GLF_FUZZED(GLF_dead11injectionSwitch);
                                {
                                    ivec2 GLF_dead13icoord = ivec2(((donor_replacementGLF_dead13coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.6, 1.0)) * 256.0);
                                    int GLF_dead13v = (GLF_dead13icoord.x ^ GLF_dead13icoord.y) * GLF_dead13icoord.y;
                                    bool GLF_dead13res1 = ((GLF_dead13v >> 10) & 1) != 0;
                                    bool GLF_dead13res2 = ((GLF_dead13v >> 11) & 4) != 0;
                                    bool GLF_dead13res3 = ((GLF_dead13v >> 12) & 8) != 0;
                                    GLF_dead13_GLF_color = vec4(GLF_dead13res1 ? 1.0 : 0.0, GLF_dead13res2 ? 1.0 : 0.0, GLF_dead13res3 ? 1.0 : 0.0, 1);
                                }
                            }
                        }
                        int donor_replacementGLF_dead4baseIndex = _GLF_FUZZED(93923);
                        int donor_replacementGLF_dead4data = _GLF_FUZZED(N);
                        int donor_replacementGLF_dead4treeIndex = _GLF_FUZZED(67635);
                        {
                            GLF_dead4tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4baseIndex, 10)].leftIndex = donor_replacementGLF_dead4treeIndex;
                            GLF_dead4makeTreeNode(GLF_dead4tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4treeIndex, 10)], donor_replacementGLF_dead4data);
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                vec2 donor_replacementGLF_dead13coord = _GLF_FUZZED(GLF_dead6injectionSwitch);
                                if (donor_replacementGLF_dead13coord.x > 0.4) {
                                    if (donor_replacementGLF_dead13coord.y < 0.6) {
                                        uvec2 GLF_dead13icoord = uvec2(((donor_replacementGLF_dead13coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                                        uint GLF_dead13res1 = uint(((GLF_dead13icoord.x * GLF_dead13icoord.y) >> (GLF_dead13icoord.x & 31u)) & 0xffffffffu);
                                        uint GLF_dead13res2 = uint(((GLF_dead13icoord.x * GLF_dead13icoord.y) << (GLF_dead13icoord.x & 31u)) & 0xffffffffu);
                                        float GLF_dead13res = float(((GLF_dead13res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_dead13res1 & 1u) != 0u ? 1u : 0u));
                                        GLF_dead13_GLF_color = vec4(GLF_dead13res, GLF_dead13res, GLF_dead13res, 1.0);
                                    } else {
                                        ivec2 GLF_dead13icoord = ivec2(((donor_replacementGLF_dead13coord - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                                        int GLF_dead13res3 = ((GLF_dead13icoord.x >> 5) & 1) ^ ((GLF_dead13icoord.y & 32) >> 5);
                                        int GLF_dead13res2 = (GLF_dead13icoord.y * GLF_dead13icoord.y >> 10) & 1;
                                        int GLF_dead13res1 = (GLF_dead13icoord.x * GLF_dead13icoord.y >> 9) & 1;
                                        GLF_dead13_GLF_color = vec4(float(GLF_dead13res1 ^ GLF_dead13res2), float(GLF_dead13res2 & GLF_dead13res3), float(GLF_dead13res1 | GLF_dead13res3), 1.0);
                                    }
                                } else {
                                    ivec2 GLF_dead13icoord = ivec2(((donor_replacementGLF_dead13coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.6, 1.0)) * 256.0);
                                    int GLF_dead13v = (GLF_dead13icoord.x ^ GLF_dead13icoord.y) * GLF_dead13icoord.y;
                                    bool GLF_dead13res1 = ((GLF_dead13v >> 10) & 1) != 0;
                                    bool GLF_dead13res2 = ((GLF_dead13v >> 11) & 4) != 0;
                                    bool GLF_dead13res3 = ((GLF_dead13v >> 12) & 8) != 0;
                                    GLF_dead13_GLF_color = vec4(GLF_dead13res1 ? 1.0 : 0.0, GLF_dead13res2 ? 1.0 : 0.0, GLF_dead13res3 ? 1.0 : 0.0, 1);
                                }
                            }
                            return;
                        }
                    }
                }
                if (_GLF_DEAD(false)) {
                    return;
                }
            case 1:
                data[_GLF_struct_replacement_1.i] = 3;
                if (_GLF_DEAD(false)) {
                    vec3 donor_replacementGLF_dead8color = _GLF_FUZZED(smoothstep(vec3(-287.690, -0.4, 8.5), vec3(81.16, -4.7, -89.50), vec3(-43.19, -1.3, 5.1)));
                    {
                        donor_replacementGLF_dead8color.z += float(GLF_dead8obj.numbers[3]);
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        vec2 donor_replacementGLF_dead13coord = _GLF_FUZZED(GLF_dead6injectionSwitch);
                        {
                            ivec2 GLF_dead13icoord = ivec2(((donor_replacementGLF_dead13coord - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                            int GLF_dead13res3 = ((GLF_dead13icoord.x >> 5) & 1) ^ ((GLF_dead13icoord.y & 32) >> 5);
                            int GLF_dead13res2 = (GLF_dead13icoord.y * GLF_dead13icoord.y >> 10) & 1;
                            int GLF_dead13res1 = (GLF_dead13icoord.x * GLF_dead13icoord.y >> 9) & 1;
                            GLF_dead13_GLF_color = vec4(float(GLF_dead13res1 ^ GLF_dead13res2), float(GLF_dead13res2 & GLF_dead13res3), float(GLF_dead13res1 | GLF_dead13res3), 1.0);
                        }
                    }
                }
                break;
            case 2:
                data[_GLF_struct_replacement_1.i] = 2;
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    vec3 donor_replacementGLF_dead1col = _GLF_FUZZED(vec2(-89.87, 6267.6140).xxy);
                    vec2 donor_replacementGLF_dead1uv = _GLF_FUZZED(log(injectionSwitch));
                    {
                        float GLF_dead1stripe = GLF_dead1compute_stripe(cos((donor_replacementGLF_dead1uv.x + donor_replacementGLF_dead1uv.y) * 20.0), donor_replacementGLF_dead1uv.x + donor_replacementGLF_dead1uv.y);
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            vec2 donor_replacementGLF_dead10coord = _GLF_FUZZED(injectionSwitch);
                            int donor_replacementGLF_dead10i = _GLF_FUZZED(N);
                            int donor_replacementGLF_dead10j = _GLF_FUZZED(-19528);
                            _GLF_struct_49 _GLF_struct_replacement_49 = _GLF_struct_49(mat3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), mat2x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), _GLF_struct_50(mat4x2(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), _GLF_struct_51(1u, vec3(1.0, 1.0, 1.0), bvec3(true, true, true), uvec3(1u, 1u, 1u), mat3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), uvec3(1u, 1u, 1u))), _GLF_FUZZED(dFdxCoarse((-GLF_dead1stripe))), _GLF_struct_52(vec3(1.0, 1.0, 1.0), bvec4(true, true, true, true), mat4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0)));
                            {
                                GLF_dead3_GLF_color += texture(GLF_dead10tex, donor_replacementGLF_dead10coord + vec2(float(donor_replacementGLF_dead10i - 1) * _GLF_struct_replacement_49.donor_replacementGLF_dead10uvstep, float(donor_replacementGLF_dead10j - 1) * _GLF_struct_replacement_49.donor_replacementGLF_dead10uvstep)) * GLF_dead10weights[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead10i * 3 + donor_replacementGLF_dead10j, 9)];
                            }
                        }
                        donor_replacementGLF_dead1col = mix(vec3(.7, sinh(donor_replacementGLF_dead1uv.x), donor_replacementGLF_dead1uv.x), vec3(.3, .5, donor_replacementGLF_dead1uv.x), GLF_dead1stripe);
                        GLF_dead1_GLF_color = vec4(donor_replacementGLF_dead1col, 1.0);
                        return;
                    }
                }
                break;
                if (_GLF_DEAD(_GLF_IDENTITY(false, (false) && true))) {
                    vec2 donor_replacementGLF_dead10coord = _GLF_FUZZED((mat4x2(80.92, 6656.0547, -1.9, -31.04, 1128.9528, -176.780, 83.84, 2.6) * floor(GLF_dead1_GLF_color)));
                    int donor_replacementGLF_dead10i = _GLF_FUZZED(ivec2(79983, 39151)[1]);
                    int donor_replacementGLF_dead10j = _GLF_FUZZED(abs(N));
                    float donor_replacementGLF_dead10uvstep = _GLF_FUZZED(-1.3);
                    {
                        _GLF_color += texture(GLF_dead10tex, donor_replacementGLF_dead10coord + vec2(float(donor_replacementGLF_dead10i - 1) * donor_replacementGLF_dead10uvstep, float(donor_replacementGLF_dead10j - 1) * donor_replacementGLF_dead10uvstep)) * GLF_dead10weights[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead10i * 3 + donor_replacementGLF_dead10j, 9)];
                    }
                }
            case 3:
                data[_GLF_struct_replacement_1.i] = 1;
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    {
                        GLF_dead15_GLF_color = vec4(vec3(0.0), 1.0);
                    }
                }
                break;
                if (_GLF_DEAD(false)) {
                    int donor_replacementGLF_dead4count = _GLF_FUZZED(-2764);
                    {
                        donor_replacementGLF_dead4count++;
                    }
                    if (_GLF_DEAD(false)) {
                        _GLF_struct_53 _GLF_struct_replacement_53 = _GLF_struct_53(uvec2(1u, 1u), _GLF_struct_54(uvec4(1u, 1u, 1u, 1u)), ivec2(1, 1), _GLF_struct_55(vec3(1.0, 1.0, 1.0), true, _GLF_struct_56(ivec3(1, 1, 1), vec4(1.0, 1.0, 1.0, 1.0), ivec2(1, 1), bvec2(true, true), 1.0, true, mat4x2(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0)), _GLF_struct_57(ivec2(1, 1), vec4(1.0, 1.0, 1.0, 1.0), bvec2(true, true)), _GLF_FUZZED(sign(vec3(49.66, -5288.5904, 8.6))), bvec4(true, true, true, true), 1));
                        vec2 donor_replacementGLF_dead11n = _GLF_FUZZED(mix((false ? GLF_dead6injectionSwitch : GLF_dead1injectionSwitch), vec2(-571.000, -1740.7772), (GLF_dead1injectionSwitch + injectionSwitch)));
                        for (int GLF_dead11j = -1; GLF_dead11j <= int(GLF_dead11injectionSwitch.y); GLF_dead11j++) {
                            for (int GLF_dead11i = -1; GLF_dead11i <= int(GLF_dead11injectionSwitch.y); GLF_dead11i++) {
                                vec2 GLF_dead11g = vec2(float(GLF_dead11j), float(GLF_dead11i));
                                if (_GLF_DEAD(false)) {
                                    {
                                        if (GLF_dead11g.y < 0.6) {
                                            uvec2 GLF_dead13icoord = uvec2(((GLF_dead11g - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                                            uint GLF_dead13res1 = uint(((GLF_dead13icoord.x * GLF_dead13icoord.y) >> (GLF_dead13icoord.x & 31u)) & 0xffffffffu);
                                            uint GLF_dead13res2 = uint(((GLF_dead13icoord.x * GLF_dead13icoord.y) << (GLF_dead13icoord.x & 31u)) & 0xffffffffu);
                                            float GLF_dead13res = float(((GLF_dead13res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_dead13res1 & 1u) != 0u ? 1u : 0u));
                                            GLF_dead13_GLF_color = vec4(GLF_dead13res, GLF_dead13res, GLF_dead13res, 1.0);
                                        } else {
                                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                break;
                                            }
                                            ivec2 GLF_dead13icoord = ivec2(((GLF_dead11g - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                                            int GLF_dead13res3 = ((GLF_dead13icoord.x >> 5) & 1) ^ ((GLF_dead13icoord.y & 32) >> 5);
                                            int GLF_dead13res2 = (GLF_dead13icoord.y * GLF_dead13icoord.y >> 10) & 1;
                                            int GLF_dead13res1 = (GLF_dead13icoord.x * GLF_dead13icoord.y >> 9) & 1;
                                            GLF_dead13_GLF_color = vec4(float(GLF_dead13res1 ^ GLF_dead13res2), float(GLF_dead13res2 & GLF_dead13res3), float(GLF_dead13res1 | GLF_dead13res3), 1.0);
                                        }
                                    }
                                }
                                vec2 GLF_dead11o = mix(donor_replacementGLF_dead11n, GLF_dead11g, 0.2);
                                if (GLF_dead11injectionSwitch.x < (_GLF_struct_replacement_53._f3.donor_replacementGLF_dead11m.x)) {
                                    if (_GLF_DEAD(false)) {
                                        {
                                            uvec2 GLF_dead13icoord = uvec2(((donor_replacementGLF_dead11n - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                                            uint GLF_dead13res1 = uint(((GLF_dead13icoord.x * GLF_dead13icoord.y) >> (GLF_dead13icoord.x & 31u)) & 0xffffffffu);
                                            uint GLF_dead13res2 = uint(((GLF_dead13icoord.x * GLF_dead13icoord.y) << (GLF_dead13icoord.x & 31u)) & 0xffffffffu);
                                            float GLF_dead13res = float(((GLF_dead13res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_dead13res1 & 1u) != 0u ? 1u : 0u));
                                            GLF_dead13_GLF_color = vec4(GLF_dead13res, GLF_dead13res, GLF_dead13res, 1.0);
                                        }
                                    }
                                    int GLF_dead11k = 1;
                                    while (GLF_dead11k >= 0) {
                                        GLF_dead11o = GLF_dead11o + GLF_dead11o;
                                        GLF_dead11k--;
                                    }
                                    if (_GLF_DEAD(false)) {
                                        vec2 donor_replacementGLF_dead13coord = _GLF_FUZZED(GLF_dead11injectionSwitch);
                                        {
                                            ivec2 GLF_dead13icoord = ivec2(((donor_replacementGLF_dead13coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.6, 1.0)) * 256.0);
                                            int GLF_dead13v = (GLF_dead13icoord.x ^ GLF_dead13icoord.y) * GLF_dead13icoord.y;
                                            bool GLF_dead13res1 = ((GLF_dead13v >> 10) & 1) != 0;
                                            bool GLF_dead13res2 = ((GLF_dead13v >> 11) & 4) != 0;
                                            bool GLF_dead13res3 = ((GLF_dead13v >> 12) & 8) != 0;
                                            GLF_dead13_GLF_color = vec4(GLF_dead13res1 ? 1.0 : 0.0, GLF_dead13res2 ? 1.0 : 0.0, GLF_dead13res3 ? 1.0 : 0.0, 1);
                                        }
                                    }
                                    _GLF_struct_replacement_53._f3.donor_replacementGLF_dead11m = vec3(GLF_dead11injectionSwitch.x, cos(GLF_dead11o));
                                }
                            }
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            {
                                if (donor_replacementGLF_dead11n.y < 0.6) {
                                    uvec2 GLF_dead13icoord = uvec2(((donor_replacementGLF_dead11n - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                                    uint GLF_dead13res1 = uint(((GLF_dead13icoord.x * GLF_dead13icoord.y) >> (GLF_dead13icoord.x & 31u)) & 0xffffffffu);
                                    uint GLF_dead13res2 = uint(((GLF_dead13icoord.x * GLF_dead13icoord.y) << (GLF_dead13icoord.x & 31u)) & 0xffffffffu);
                                    float GLF_dead13res = float(((GLF_dead13res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_dead13res1 & 1u) != 0u ? 1u : 0u));
                                    GLF_dead13_GLF_color = vec4(GLF_dead13res, GLF_dead13res, GLF_dead13res, 1.0);
                                } else {
                                    ivec2 GLF_dead13icoord = ivec2(((donor_replacementGLF_dead11n - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                                    int GLF_dead13res3 = ((GLF_dead13icoord.x >> 5) & 1) ^ ((GLF_dead13icoord.y & 32) >> 5);
                                    int GLF_dead13res2 = (GLF_dead13icoord.y * GLF_dead13icoord.y >> 10) & 1;
                                    int GLF_dead13res1 = (GLF_dead13icoord.x * GLF_dead13icoord.y >> 9) & 1;
                                    GLF_dead13_GLF_color = vec4(float(GLF_dead13res1 ^ GLF_dead13res2), float(GLF_dead13res2 & GLF_dead13res3), float(GLF_dead13res1 | GLF_dead13res3), 1.0);
                                }
                            }
                        }
                        if (_GLF_DEAD(false)) {
                            continue;
                        }
                    }
                }
            case 4:
                if (_GLF_DEAD(false)) {
                    vec2 donor_replacementGLF_dead13coord = _GLF_FUZZED(exp2(asin(GLF_dead1injectionSwitch)));
                    {
                        if (donor_replacementGLF_dead13coord.y < 0.6) {
                            uvec2 GLF_dead13icoord = uvec2(((donor_replacementGLF_dead13coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                            uint GLF_dead13res1 = uint(((GLF_dead13icoord.x * GLF_dead13icoord.y) >> (GLF_dead13icoord.x & 31u)) & 0xffffffffu);
                            uint GLF_dead13res2 = uint(((GLF_dead13icoord.x * GLF_dead13icoord.y) << (GLF_dead13icoord.x & 31u)) & 0xffffffffu);
                            float GLF_dead13res = float(((GLF_dead13res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_dead13res1 & 1u) != 0u ? 1u : 0u));
                            GLF_dead13_GLF_color = vec4(GLF_dead13res, GLF_dead13res, GLF_dead13res, 1.0);
                        } else {
                            ivec2 GLF_dead13icoord = ivec2(((donor_replacementGLF_dead13coord - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                            int GLF_dead13res3 = ((GLF_dead13icoord.x >> 5) & 1) ^ ((GLF_dead13icoord.y & 32) >> 5);
                            int GLF_dead13res2 = (GLF_dead13icoord.y * GLF_dead13icoord.y >> 10) & 1;
                            int GLF_dead13res1 = (GLF_dead13icoord.x * GLF_dead13icoord.y >> 9) & 1;
                            GLF_dead13_GLF_color = vec4(float(GLF_dead13res1 ^ GLF_dead13res2), float(GLF_dead13res2 & GLF_dead13res3), float(GLF_dead13res1 | GLF_dead13res3), 1.0);
                        }
                    }
                }
                if (_GLF_DEAD(false)) {
                    if (_GLF_DEAD(false)) {
                        int donor_replacementGLF_dead15cols = _GLF_FUZZED(floatBitsToInt(float(197984u)));
                        uint donor_replacementGLF_dead15matrix_number = _GLF_FUZZED(101596u);
                        for (int GLF_dead15rows = 2; GLF_dead15rows <= 4; GLF_dead15rows++) {
                            for (int GLF_dead15c = 0; GLF_dead15c < donor_replacementGLF_dead15cols; GLF_dead15c++) {
                                for (int GLF_dead15r = 0; GLF_dead15r < GLF_dead15rows; GLF_dead15r++) {
                                    switch (donor_replacementGLF_dead15matrix_number) {
                                        case 0u:
                                            GLF_dead15m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15r, 2)] = GLF_dead15one;
                                            break;
                                        case 1u:
                                            GLF_dead15m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15r, 3)] = GLF_dead15one;
                                            break;
                                        case 2u:
                                            GLF_dead15m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15r, 4)] = GLF_dead15one;
                                            break;
                                        case 3u:
                                            GLF_dead15m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15r, 2)] = GLF_dead15one;
                                            break;
                                        case 4u:
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                return;
                                            }
                                            GLF_dead15m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15r, 3)] = GLF_dead15one;
                                            break;
                                        case 5u:
                                            GLF_dead15m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15r, 4)] = GLF_dead15one;
                                            break;
                                        case 6u:
                                            GLF_dead15m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15r, 2)] = GLF_dead15one;
                                            break;
                                        case 7u:
                                            GLF_dead15m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15r, 3)] = GLF_dead15one;
                                            break;
                                        case 8u:
                                            GLF_dead15m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15r, 4)] = GLF_dead15one;
                                            break;
                                    }
                                }
                            }
                            donor_replacementGLF_dead15matrix_number = donor_replacementGLF_dead15matrix_number + 1u;
                        }
                    }
                    vec3 donor_replacementGLF_dead1col = _GLF_FUZZED((vec3(5.1, 9.7, 6.8) - 3.0));
                    vec2 donor_replacementGLF_dead1uv = _GLF_FUZZED(asinh(vec2(-2.4, 320.612)));
                    {
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < tan(0.0))))) {
                            {
                                uvec2 GLF_dead13icoord = uvec2(((donor_replacementGLF_dead1uv - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                                uint GLF_dead13res1 = uint(((GLF_dead13icoord.x * GLF_dead13icoord.y) >> (GLF_dead13icoord.x & 31u)) & 0xffffffffu);
                                uint GLF_dead13res2 = uint(((GLF_dead13icoord.x * GLF_dead13icoord.y) << (GLF_dead13icoord.x & 31u)) & 0xffffffffu);
                                float GLF_dead13res = float(((GLF_dead13res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_dead13res1 & 1u) != 0u ? 1u : 0u));
                                GLF_dead13_GLF_color = vec4(GLF_dead13res, GLF_dead13res, GLF_dead13res, 1.0);
                            }
                        }
                        float GLF_dead1stripe = GLF_dead1compute_stripe(cos((donor_replacementGLF_dead1uv.x + donor_replacementGLF_dead1uv.y) * 20.0), donor_replacementGLF_dead1uv.x + donor_replacementGLF_dead1uv.y);
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < sin(0.0))))) {
                            if (_GLF_DEAD(false)) {
                                return;
                            }
                            {
                                ivec2 GLF_dead13icoord = ivec2(((donor_replacementGLF_dead1uv - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                                int GLF_dead13res3 = ((GLF_dead13icoord.x >> 5) & 1) ^ ((GLF_dead13icoord.y & 32) >> 5);
                                int GLF_dead13res2 = (GLF_dead13icoord.y * GLF_dead13icoord.y >> 10) & 1;
                                int GLF_dead13res1 = (GLF_dead13icoord.x * GLF_dead13icoord.y >> 9) & 1;
                                GLF_dead13_GLF_color = vec4(float(GLF_dead13res1 ^ GLF_dead13res2), float(GLF_dead13res2 & GLF_dead13res3), float(GLF_dead13res1 | GLF_dead13res3), 1.0);
                            }
                        }
                        donor_replacementGLF_dead1col = mix(vec3(donor_replacementGLF_dead1uv.x, 0, 0.75), vec3(.8, .7, donor_replacementGLF_dead1uv.x), GLF_dead1stripe);
                        GLF_dead1_GLF_color = vec4(donor_replacementGLF_dead1col, 1.0);
                        return;
                    }
                }
                data[_GLF_struct_replacement_1.i] = 0;
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    bool donor_replacementGLF_dead1c1 = _GLF_FUZZED((mod(-26.15, 20.29) > (-1.1)));
                    bool donor_replacementGLF_dead1c2 = _GLF_FUZZED(false);
                    if (_GLF_DEAD(false)) {
                        if (_GLF_DEAD(false)) {
                            discard;
                        }
                        vec2 donor_replacementGLF_dead13coord = _GLF_FUZZED((89.39 + GLF_dead6injectionSwitch));
                        {
                            uvec2 GLF_dead13icoord = uvec2(((donor_replacementGLF_dead13coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                            uint GLF_dead13res1 = uint(((GLF_dead13icoord.x * GLF_dead13icoord.y) >> (GLF_dead13icoord.x & 31u)) & 0xffffffffu);
                            uint GLF_dead13res2 = uint(((GLF_dead13icoord.x * GLF_dead13icoord.y) << (GLF_dead13icoord.x & 31u)) & 0xffffffffu);
                            float GLF_dead13res = float(((GLF_dead13res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_dead13res1 & 1u) != 0u ? 1u : 0u));
                            GLF_dead13_GLF_color = vec4(GLF_dead13res, GLF_dead13res, GLF_dead13res, 1.0);
                        }
                    }
                    _GLF_struct_31 _GLF_struct_replacement_31 = _GLF_struct_31(_GLF_struct_32(_GLF_struct_33(mat3x2(1.0, 1.0, 1.0, 1.0, 1.0, 1.0), 1u, mat2x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), uvec3(1u, 1u, 1u), mat2x3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0)), _GLF_FUZZED(false), _GLF_struct_34(mat3x2(1.0, 1.0, 1.0, 1.0, 1.0, 1.0), mat4x2(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), mat4x2(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), mat2(1.0, 1.0, 1.0, 1.0), uvec2(1u, 1u), mat4x3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0)), _GLF_struct_35(ivec4(1, 1, 1, 1), ivec4(1, 1, 1, 1), ivec2(1, 1), mat2x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), mat3x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0)), bvec4(true, true, true, true), mat4x3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), mat2(1.0, 1.0, 1.0, 1.0)), mat2(1.0, 1.0, 1.0, 1.0), _GLF_struct_36(_GLF_struct_37(ivec4(1, 1, 1, 1), ivec4(1, 1, 1, 1))));
                    vec3 donor_replacementGLF_dead1col = _GLF_FUZZED(vec3(180.623, 8.3, 7.0));
                    vec2 donor_replacementGLF_dead1uv = _GLF_FUZZED(acosh(vec2(-772.467, -981.964)));
                    if (_GLF_DEAD(false)) {
                        discard;
                    }
                    if (!donor_replacementGLF_dead1c1 && !donor_replacementGLF_dead1c2 && _GLF_struct_replacement_31._f0.donor_replacementGLF_dead1c3) {
                        float GLF_dead1stripe = GLF_dead1compute_stripe(cos((donor_replacementGLF_dead1uv.x + donor_replacementGLF_dead1uv.y) * 20.0), donor_replacementGLF_dead1uv.x + donor_replacementGLF_dead1uv.y);
                        if (_GLF_DEAD(false)) {
                            int donor_replacementGLF_dead10i = _GLF_FUZZED(N);
                            int donor_replacementGLF_dead10j = _GLF_FUZZED(N);
                            {
                                _GLF_color += texture(GLF_dead10tex, donor_replacementGLF_dead1uv + vec2(float(donor_replacementGLF_dead10i - 1) * GLF_dead1stripe, float(donor_replacementGLF_dead10j - 1) * GLF_dead1stripe)) * GLF_dead10weights[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead10i * 3 + donor_replacementGLF_dead10j, 9)];
                            }
                        }
                        donor_replacementGLF_dead1col = mix(vec3(.7, sinh(donor_replacementGLF_dead1uv.x), donor_replacementGLF_dead1uv.x), vec3(.3, .5, donor_replacementGLF_dead1uv.x), GLF_dead1stripe);
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < tan(0.0))))) {
                            break;
                            if (_GLF_DEAD(false)) {
                                if (_GLF_DEAD(_GLF_IDENTITY(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)), false || (_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))))) {
                                    int donor_replacementGLF_dead9i = _GLF_FUZZED(87540);
                                    int donor_replacementGLF_dead9msb8 = _GLF_FUZZED(N);
                                    if (_GLF_DEAD(false)) {
                                        {
                                            if (_GLF_DEAD(false)) {
                                                return;
                                            }
                                            ivec2 GLF_dead13icoord = ivec2(((donor_replacementGLF_dead1uv - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                                            int GLF_dead13res3 = ((GLF_dead13icoord.x >> 5) & 1) ^ ((GLF_dead13icoord.y & 32) >> 5);
                                            int GLF_dead13res2 = (GLF_dead13icoord.y * GLF_dead13icoord.y >> 10) & 1;
                                            int GLF_dead13res1 = (GLF_dead13icoord.x * GLF_dead13icoord.y >> 9) & 1;
                                            GLF_dead13_GLF_color = vec4(float(GLF_dead13res1 ^ GLF_dead13res2), float(GLF_dead13res2 & GLF_dead13res3), float(GLF_dead13res1 | GLF_dead13res3), 1.0);
                                        }
                                    }
                                    do {
                                        if (GLF_dead1_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9i, 4)] >= 1.0) {
                                            GLF_dead1_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9i, 4)] = GLF_dead1_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9i, 4)] * GLF_dead1_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9i, 4)];
                                        }
                                        donor_replacementGLF_dead9i++;
                                    } while (donor_replacementGLF_dead9i < findMSB(findLSB(donor_replacementGLF_dead9msb8)));
                                }
                                int donor_replacementGLF_dead4baseIndex = _GLF_FUZZED(N);
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    vec2 donor_replacementGLF_dead13coord = _GLF_FUZZED((donor_replacementGLF_dead1c1 ? injectionSwitch : injectionSwitch));
                                    if (donor_replacementGLF_dead13coord.y < 0.6) {
                                        uvec2 GLF_dead13icoord = uvec2(((donor_replacementGLF_dead13coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                                        uint GLF_dead13res1 = uint(((GLF_dead13icoord.x * GLF_dead13icoord.y) >> (GLF_dead13icoord.x & 31u)) & 0xffffffffu);
                                        uint GLF_dead13res2 = uint(((GLF_dead13icoord.x * GLF_dead13icoord.y) << (GLF_dead13icoord.x & 31u)) & 0xffffffffu);
                                        float GLF_dead13res = float(((GLF_dead13res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_dead13res1 & 1u) != 0u ? 1u : 0u));
                                        GLF_dead13_GLF_color = vec4(GLF_dead13res, GLF_dead13res, GLF_dead13res, 1.0);
                                    } else {
                                        ivec2 GLF_dead13icoord = ivec2(((donor_replacementGLF_dead13coord - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                                        int GLF_dead13res3 = ((GLF_dead13icoord.x >> 5) & 1) ^ ((GLF_dead13icoord.y & 32) >> 5);
                                        int GLF_dead13res2 = (GLF_dead13icoord.y * GLF_dead13icoord.y >> 10) & 1;
                                        int GLF_dead13res1 = (GLF_dead13icoord.x * GLF_dead13icoord.y >> 9) & 1;
                                        GLF_dead13_GLF_color = vec4(float(GLF_dead13res1 ^ GLF_dead13res2), float(GLF_dead13res2 & GLF_dead13res3), float(GLF_dead13res1 | GLF_dead13res3), 1.0);
                                    }
                                }
                                int donor_replacementGLF_dead4data = _GLF_FUZZED(N);
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                        uint donor_replacementGLF_dead15matrix_number = _GLF_FUZZED(143142u);
                                        {
                                            for (int GLF_dead15r = 0; GLF_dead15r < donor_replacementGLF_dead4baseIndex; GLF_dead15r++) {
                                                switch (donor_replacementGLF_dead15matrix_number) {
                                                    case 0u:
                                                        GLF_dead15m22[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4baseIndex, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15r, 2)] = GLF_dead15one;
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                            continue;
                                                        }
                                                        break;
                                                    case 1u:
                                                        GLF_dead15m23[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4baseIndex, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15r, 3)] = GLF_dead15one;
                                                        break;
                                                    case 2u:
                                                        GLF_dead15m24[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4baseIndex, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15r, 4)] = GLF_dead15one;
                                                        break;
                                                    case 3u:
                                                        GLF_dead15m32[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4baseIndex, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15r, 2)] = GLF_dead15one;
                                                        break;
                                                    case 4u:
                                                        GLF_dead15m33[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4baseIndex, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15r, 3)] = GLF_dead15one;
                                                        break;
                                                    case 5u:
                                                        GLF_dead15m34[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4baseIndex, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15r, 4)] = GLF_dead15one;
                                                        break;
                                                    case 6u:
                                                        GLF_dead15m42[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4baseIndex, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15r, 2)] = GLF_dead15one;
                                                        break;
                                                    case 7u:
                                                        GLF_dead15m43[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4baseIndex, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15r, 3)] = GLF_dead15one;
                                                        break;
                                                    case 8u:
                                                        GLF_dead15m44[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4baseIndex, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15r, 4)] = GLF_dead15one;
                                                        break;
                                                }
                                            }
                                        }
                                    }
                                    {
                                        if (GLF_dead3_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4baseIndex, 4)] >= 1.0) {
                                            GLF_dead3_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4baseIndex, 4)] = GLF_dead3_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4baseIndex, 4)] * GLF_dead3_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4baseIndex, 4)];
                                        }
                                        donor_replacementGLF_dead4baseIndex++;
                                    }
                                }
                                _GLF_struct_15 _GLF_struct_replacement_15 = _GLF_struct_15(_GLF_FUZZED(-55065), _GLF_struct_16(ivec2(1, 1), _GLF_struct_17(mat4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), ivec3(1, 1, 1), bvec3(true, true, true), ivec2(1, 1), mat3x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), uvec4(1u, 1u, 1u, 1u)), uvec3(1u, 1u, 1u)));
                                {
                                    if (donor_replacementGLF_dead4data <= GLF_dead4tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4baseIndex, 10)].data) {
                                        if (GLF_dead4tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4baseIndex, 10)].leftIndex == -1) {
                                            GLF_dead4tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4baseIndex, 10)].leftIndex = _GLF_struct_replacement_15.donor_replacementGLF_dead4treeIndex;
                                            GLF_dead4makeTreeNode(GLF_dead4tree[_GLF_MAKE_IN_BOUNDS_INT(_GLF_struct_replacement_15.donor_replacementGLF_dead4treeIndex, 10)], donor_replacementGLF_dead4data);
                                            return;
                                        } else {
                                            donor_replacementGLF_dead4baseIndex = GLF_dead4tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4baseIndex, 10)].leftIndex;
                                            if (_GLF_DEAD(false)) {
                                                {
                                                    if (donor_replacementGLF_dead1uv.y < 0.6) {
                                                        uvec2 GLF_dead13icoord = uvec2(((donor_replacementGLF_dead1uv - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                                                        uint GLF_dead13res1 = uint(((GLF_dead13icoord.x * GLF_dead13icoord.y) >> (GLF_dead13icoord.x & 31u)) & 0xffffffffu);
                                                        uint GLF_dead13res2 = uint(((GLF_dead13icoord.x * GLF_dead13icoord.y) << (GLF_dead13icoord.x & 31u)) & 0xffffffffu);
                                                        float GLF_dead13res = float(((GLF_dead13res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_dead13res1 & 1u) != 0u ? 1u : 0u));
                                                        GLF_dead13_GLF_color = vec4(GLF_dead13res, GLF_dead13res, GLF_dead13res, 1.0);
                                                    } else {
                                                        ivec2 GLF_dead13icoord = ivec2(((donor_replacementGLF_dead1uv - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                                                        int GLF_dead13res3 = ((GLF_dead13icoord.x >> 5) & 1) ^ ((GLF_dead13icoord.y & 32) >> 5);
                                                        int GLF_dead13res2 = (GLF_dead13icoord.y * GLF_dead13icoord.y >> 10) & 1;
                                                        int GLF_dead13res1 = (GLF_dead13icoord.x * GLF_dead13icoord.y >> 9) & 1;
                                                        GLF_dead13_GLF_color = vec4(float(GLF_dead13res1 ^ GLF_dead13res2), float(GLF_dead13res2 & GLF_dead13res3), float(GLF_dead13res1 | GLF_dead13res3), 1.0);
                                                    }
                                                }
                                            }
                                            continue;
                                        }
                                    } else {
                                        if (GLF_dead4tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4baseIndex, 10)].rightIndex == -1) {
                                            GLF_dead4tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4baseIndex, 10)].rightIndex = _GLF_struct_replacement_15.donor_replacementGLF_dead4treeIndex;
                                            GLF_dead4makeTreeNode(GLF_dead4tree[_GLF_MAKE_IN_BOUNDS_INT(_GLF_struct_replacement_15.donor_replacementGLF_dead4treeIndex, 10)], donor_replacementGLF_dead4data);
                                            return;
                                        } else {
                                            donor_replacementGLF_dead4baseIndex = GLF_dead4tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4baseIndex, 10)].rightIndex;
                                            continue;
                                        }
                                    }
                                    if (_GLF_DEAD(false)) {
                                        continue;
                                    }
                                }
                            }
                        }
                        GLF_dead1_GLF_color = vec4(donor_replacementGLF_dead1col, 1.0);
                        return;
                    }
                    if (_GLF_DEAD(false)) {
                        break;
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            float donor_replacementGLF_dead9s = _GLF_FUZZED(-7.1);
                            {
                                donor_replacementGLF_dead9s += 0.2;
                            }
                        }
                    }
                }
                break;
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    {
                        break;
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        discard;
                    }
                }
            case 5:
                data[_GLF_struct_replacement_1.i] = -1;
                if (_GLF_DEAD(false)) {
                    int donor_replacementGLF_dead15cols = _GLF_FUZZED(N);
                    uint donor_replacementGLF_dead15matrix_number = _GLF_FUZZED(uvec3(189255u, 69326u, 50253u)[1]);
                    int donor_replacementGLF_dead15rows = _GLF_FUZZED(N);
                    {
                        for (int GLF_dead15c = 0; GLF_dead15c < donor_replacementGLF_dead15cols; GLF_dead15c++) {
                            for (int GLF_dead15r = 0; GLF_dead15r < donor_replacementGLF_dead15rows; GLF_dead15r++) {
                                switch (donor_replacementGLF_dead15matrix_number) {
                                    case 0u:
                                        GLF_dead15m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15r, 2)] = GLF_dead15one;
                                        break;
                                        if (_GLF_DEAD(false)) {
                                            continue;
                                        }
                                    case 1u:
                                        GLF_dead15m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15r, 3)] = GLF_dead15one;
                                        break;
                                    case 2u:
                                        GLF_dead15m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15r, 4)] = GLF_dead15one;
                                        break;
                                    case 3u:
                                        GLF_dead15m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15r, 2)] = GLF_dead15one;
                                        break;
                                    case 4u:
                                        GLF_dead15m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15r, 3)] = GLF_dead15one;
                                        break;
                                    case 5u:
                                        GLF_dead15m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15r, 4)] = GLF_dead15one;
                                        break;
                                    case 6u:
                                        GLF_dead15m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15r, 2)] = GLF_dead15one;
                                        break;
                                        if (_GLF_DEAD(false)) {
                                            break;
                                        }
                                    case 7u:
                                        GLF_dead15m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15r, 3)] = GLF_dead15one;
                                        break;
                                    case 8u:
                                        GLF_dead15m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15r, 4)] = GLF_dead15one;
                                        break;
                                }
                            }
                        }
                        donor_replacementGLF_dead15matrix_number = donor_replacementGLF_dead15matrix_number + 1u;
                    }
                }
                break;
            case 6:
                data[_GLF_struct_replacement_1.i] = -2;
                break;
            case 7:
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    ivec2 donor_replacementGLF_dead7pos = _GLF_FUZZED((~ivec2(25164, 95358)));
                    while (donor_replacementGLF_dead7pos.y != 256) {
                        if (donor_replacementGLF_dead7pos.x < GLF_dead7dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead7pos.y, 256)] + 15 && donor_replacementGLF_dead7pos.x > GLF_dead7dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead7pos.y, 256)] - 15) {
                            float GLF_dead7p = (15.0 - abs(float(donor_replacementGLF_dead7pos.x - GLF_dead7dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead7pos.y, 256)]))) / 15.0;
                            ;
                        }
                        donor_replacementGLF_dead7pos.y++;
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                            vec4 donor_replacementGLF_dead9c = _GLF_FUZZED(GLF_dead1_GLF_color);
                            int donor_replacementGLF_dead9i = _GLF_FUZZED(int(uvec2(76655u, 39665u)[0]));
                            {
                                if (donor_replacementGLF_dead9c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9i, 4)] >= 1.0) {
                                    donor_replacementGLF_dead9c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9i, 4)] = donor_replacementGLF_dead9c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9i, 4)] * donor_replacementGLF_dead9c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9i, 4)];
                                }
                                donor_replacementGLF_dead9i++;
                            }
                        }
                    }
                }
                data[_GLF_struct_replacement_1.i] = -3;
                break;
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < length(0.0))))) {
                    return;
                }
            case 8:
                data[_GLF_struct_replacement_1.i] = -4;
                break;
            case 9:
                data[_GLF_struct_replacement_1.i] = -5;
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    break;
                }
                break;
                if (_GLF_DEAD(false)) {
                    discard;
                }
        }
        _GLF_struct_replacement_1.i++;
    } while (_GLF_struct_replacement_1.i < 10);
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
        int donor_replacementGLF_dead9i = _GLF_FUZZED(N);
        float donor_replacementGLF_dead9limit = _GLF_FUZZED(mod(-324.916, 226.139));
        float donor_replacementGLF_dead9ref = _GLF_FUZZED(log(22.34));
        float donor_replacementGLF_dead9s = _GLF_FUZZED(6.3);
        while (donor_replacementGLF_dead9i < bitfieldInsert(800, donor_replacementGLF_dead9i, 0, 0)) {
            if (mod(float(donor_replacementGLF_dead9i), donor_replacementGLF_dead9ref) <= 0.01) {
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    break;
                }
                donor_replacementGLF_dead9s += 0.2;
            }
            if (float(donor_replacementGLF_dead9i) >= donor_replacementGLF_dead9limit) {
                ;
            }
            donor_replacementGLF_dead9i++;
        }
    }
    if (_GLF_DEAD(false)) {
        uint donor_replacementGLF_dead15matrix_number = _GLF_FUZZED(174650u);
        for (int GLF_dead15cols = 2; GLF_dead15cols <= 4; GLF_dead15cols++) {
            for (int GLF_dead15rows = 2; GLF_dead15rows <= 4; GLF_dead15rows++) {
                for (int GLF_dead15c = 0; GLF_dead15c < GLF_dead15cols; GLF_dead15c++) {
                    for (int GLF_dead15r = 0; GLF_dead15r < GLF_dead15rows; GLF_dead15r++) {
                        switch (donor_replacementGLF_dead15matrix_number) {
                            case 0u:
                                GLF_dead15m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15r, 2)] = GLF_dead15one;
                                break;
                            case 1u:
                                GLF_dead15m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15r, 3)] = GLF_dead15one;
                                break;
                            case 2u:
                                GLF_dead15m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15r, 4)] = GLF_dead15one;
                                break;
                            case 3u:
                                GLF_dead15m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15r, 2)] = GLF_dead15one;
                                break;
                            case 4u:
                                GLF_dead15m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15r, 3)] = GLF_dead15one;
                                break;
                            case 5u:
                                GLF_dead15m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15r, 4)] = GLF_dead15one;
                                break;
                            case 6u:
                                GLF_dead15m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15r, 2)] = GLF_dead15one;
                                break;
                            case 7u:
                                GLF_dead15m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15r, 3)] = GLF_dead15one;
                                break;
                            case 8u:
                                GLF_dead15m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15r, 4)] = GLF_dead15one;
                                break;
                        }
                    }
                }
                donor_replacementGLF_dead15matrix_number = donor_replacementGLF_dead15matrix_number + 1u;
            }
        }
    }
    for (int j = 0; j < 10; j++) {
        temp[j] = data[j];
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < tan(0.0))))) {
            uint donor_replacementGLF_dead15matrix_number = _GLF_FUZZED((+(65313u - 108103u)));
            int donor_replacementGLF_dead15rows = _GLF_FUZZED(-94970);
            for (int GLF_dead15c = 0; GLF_dead15c < j; GLF_dead15c++) {
                for (int GLF_dead15r = 0; GLF_dead15r < donor_replacementGLF_dead15rows; GLF_dead15r++) {
                    switch (donor_replacementGLF_dead15matrix_number) {
                        case 0u:
                            if (_GLF_DEAD(false)) {
                                return;
                            }
                            GLF_dead15m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15r, 2)] = GLF_dead15one;
                            break;
                        case 1u:
                            GLF_dead15m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15r, 3)] = GLF_dead15one;
                            break;
                        case 2u:
                            GLF_dead15m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15r, 4)] = GLF_dead15one;
                            break;
                        case 3u:
                            GLF_dead15m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15r, 2)] = GLF_dead15one;
                            break;
                        case 4u:
                            GLF_dead15m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15r, 3)] = GLF_dead15one;
                            break;
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                return;
                            }
                        case 5u:
                            GLF_dead15m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15r, 4)] = GLF_dead15one;
                            break;
                            if (_GLF_DEAD(false)) {
                                discard;
                            }
                        case 6u:
                            GLF_dead15m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15r, 2)] = GLF_dead15one;
                            break;
                        case 7u:
                            GLF_dead15m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15r, 3)] = GLF_dead15one;
                            break;
                        case 8u:
                            GLF_dead15m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15r, 4)] = GLF_dead15one;
                            break;
                    }
                }
            }
        }
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_ZERO(0.0, injectionSwitch.x))))) {
        ivec2 donor_replacementGLF_dead7pos = _GLF_FUZZED((ivec2(63454, -96749) << ivec2(-583, -63815)));
        {
            if (donor_replacementGLF_dead7pos.x < GLF_dead7dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead7pos.y, 256)] + 15 && donor_replacementGLF_dead7pos.x > GLF_dead7dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead7pos.y, 256)] - 15) {
                _GLF_struct_58 _GLF_struct_replacement_58 = _GLF_struct_58(mat2(1.0, 1.0, 1.0, 1.0), uvec4(1u, 1u, 1u, 1u), mat2x3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0), mat2x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), vec3(1.0, 1.0, 1.0), (15.0 - abs(float(donor_replacementGLF_dead7pos.x - GLF_dead7dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead7pos.y, 256)]))) / 15.0);
                ;
            }
            donor_replacementGLF_dead7pos.y++;
            if (_GLF_DEAD(false)) {
                vec2 donor_replacementGLF_dead10coord = _GLF_FUZZED(GLF_dead6injectionSwitch);
                int donor_replacementGLF_dead10i = _GLF_FUZZED((-51005));
                vec4 donor_replacementGLF_dead10res = _GLF_FUZZED(uintBitsToFloat((uvec4(141256u, 136608u, 35740u, 85208u) - uvec4(23187u, 70304u, 101842u, 179065u))));
                float donor_replacementGLF_dead10uvstep = _GLF_FUZZED(-5154.8623);
                {
                    for (int GLF_dead10j = 0; GLF_dead10j < 3; GLF_dead10j++) {
                        donor_replacementGLF_dead10res += texture(GLF_dead10tex, donor_replacementGLF_dead10coord + vec2(float(donor_replacementGLF_dead10i - 1) * donor_replacementGLF_dead10uvstep, float(GLF_dead10j - 1) * donor_replacementGLF_dead10uvstep)) * GLF_dead10weights[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead10i * 3 + GLF_dead10j, 9)];
                    }
                }
                if (_GLF_DEAD(false)) {
                    vec2 donor_replacementGLF_dead13coord = _GLF_FUZZED(asin(mix(mat2(-1953.2110, 4438.6774, -5.8, 3435.7515)[0], vec2(362.266, 306.832), bvec2(true, true))));
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        return;
                    }
                    if (donor_replacementGLF_dead13coord.y < 0.6) {
                        uvec2 GLF_dead13icoord = uvec2(((donor_replacementGLF_dead13coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                        uint GLF_dead13res1 = uint(((GLF_dead13icoord.x * GLF_dead13icoord.y) >> (GLF_dead13icoord.x & 31u)) & 0xffffffffu);
                        uint GLF_dead13res2 = uint(((GLF_dead13icoord.x * GLF_dead13icoord.y) << (GLF_dead13icoord.x & 31u)) & 0xffffffffu);
                        float GLF_dead13res = float(((GLF_dead13res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_dead13res1 & 1u) != 0u ? 1u : 0u));
                        GLF_dead13_GLF_color = vec4(GLF_dead13res, GLF_dead13res, GLF_dead13res, 1.0);
                    } else {
                        ivec2 GLF_dead13icoord = ivec2(((donor_replacementGLF_dead13coord - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                        int GLF_dead13res3 = ((GLF_dead13icoord.x >> 5) & 1) ^ ((GLF_dead13icoord.y & 32) >> 5);
                        int GLF_dead13res2 = (GLF_dead13icoord.y * GLF_dead13icoord.y >> 10) & 1;
                        int GLF_dead13res1 = (GLF_dead13icoord.x * GLF_dead13icoord.y >> 9) & 1;
                        GLF_dead13_GLF_color = vec4(float(GLF_dead13res1 ^ GLF_dead13res2), float(GLF_dead13res2 & GLF_dead13res3), float(GLF_dead13res1 | GLF_dead13res3), 1.0);
                    }
                }
            }
        }
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < _GLF_ZERO(0.0, injectionSwitch.x))))) {
        if (_GLF_DEAD(false)) {
            return;
        }
        vec3 donor_replacementGLF_dead8color = _GLF_FUZZED(log2(vec3(-7.4, 68.44, -82.45)));
        {
            donor_replacementGLF_dead8color.x += float(GLF_dead8obj.numbers[1]);
        }
    }
    mergeSort();
    float grey;
    if (_GLF_DEAD(false)) {
        float donor_replacementGLF_dead0y = _GLF_FUZZED(grey);
        if (_GLF_DEAD(false)) {
            if (_GLF_DEAD(_GLF_IDENTITY(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)), (_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))) && true))) {
                vec2 donor_replacementGLF_dead13coord = _GLF_FUZZED(GLF_dead1injectionSwitch);
                {
                    uvec2 GLF_dead13icoord = uvec2(((donor_replacementGLF_dead13coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                    uint GLF_dead13res1 = uint(((GLF_dead13icoord.x * GLF_dead13icoord.y) >> (GLF_dead13icoord.x & 31u)) & 0xffffffffu);
                    uint GLF_dead13res2 = uint(((GLF_dead13icoord.x * GLF_dead13icoord.y) << (GLF_dead13icoord.x & 31u)) & 0xffffffffu);
                    float GLF_dead13res = float(((GLF_dead13res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_dead13res1 & 1u) != 0u ? 1u : 0u));
                    GLF_dead13_GLF_color = vec4(GLF_dead13res, GLF_dead13res, GLF_dead13res, 1.0);
                }
            }
            return;
        }
        {
            grey = 1.0;
            if (_GLF_DEAD(false)) {
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    return;
                }
                int donor_replacementGLF_dead15c = _GLF_FUZZED(N);
                uint donor_replacementGLF_dead15matrix_number = _GLF_FUZZED(102597u);
                int donor_replacementGLF_dead15rows = _GLF_FUZZED(int(173587u));
                {
                    for (int GLF_dead15r = 0; GLF_dead15r < donor_replacementGLF_dead15rows; GLF_dead15r++) {
                        switch (donor_replacementGLF_dead15matrix_number) {
                            case 0u:
                                GLF_dead15m22[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead15c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15r, 2)] = GLF_dead15one;
                                break;
                            case 1u:
                                GLF_dead15m23[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead15c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15r, 3)] = GLF_dead15one;
                                break;
                            case 2u:
                                GLF_dead15m24[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead15c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15r, 4)] = GLF_dead15one;
                                break;
                            case 3u:
                                GLF_dead15m32[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead15c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15r, 2)] = GLF_dead15one;
                                break;
                            case 4u:
                                GLF_dead15m33[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead15c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15r, 3)] = GLF_dead15one;
                                break;
                            case 5u:
                                GLF_dead15m34[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead15c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15r, 4)] = GLF_dead15one;
                                break;
                            case 6u:
                                if (_GLF_DEAD(false)) {
                                    discard;
                                }
                                GLF_dead15m42[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead15c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15r, 2)] = GLF_dead15one;
                                break;
                            case 7u:
                                GLF_dead15m43[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead15c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15r, 3)] = GLF_dead15one;
                                break;
                            case 8u:
                                GLF_dead15m44[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead15c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15r, 4)] = GLF_dead15one;
                                break;
                        }
                    }
                }
            }
            donor_replacementGLF_dead0y = 1.0;
        }
    }
    if (int(gl_FragCoord[1]) < 30) {
        if (_GLF_DEAD(false)) {
            ivec2 donor_replacementGLF_dead7pos = _GLF_FUZZED((floatBitsToInt(fma(GLF_dead1injectionSwitch, injectionSwitch, injectionSwitch)) / (ivec2(79520, 38246), N)));
            if (donor_replacementGLF_dead7pos.x < GLF_dead7dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead7pos.y, 256)] + 15 && donor_replacementGLF_dead7pos.x > GLF_dead7dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead7pos.y, 256)] - 15) {
                float GLF_dead7p = (15.0 - abs(float(donor_replacementGLF_dead7pos.x - GLF_dead7dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead7pos.y, 256)]))) / 15.0;
                ;
            }
            if (_GLF_DEAD(false)) {
                return;
            }
        }
        grey = 0.5 + float(data[0]) / 10.0;
    } else {
        if (int(gl_FragCoord[1]) < 60) {
            grey = 0.5 + float(data[1]) / 10.0;
        } else {
            if (int(gl_FragCoord[1]) < 90) {
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                    grey = 0.5 + float(data[2]) / 10.0;
                } else {
                }
            } else {
                for (int _injected_loop_counter = (1 & 1); _GLF_WRAPPED_LOOP(_injected_loop_counter != (0 | 0)); _injected_loop_counter--) {
                    if (int(gl_FragCoord[1]) < 120) {
                        grey = 0.5 + float(data[3]) / 10.0;
                    } else {
                        if (int(gl_FragCoord[1]) < 150) {
                            discard;
                        } else {
                            if (int(gl_FragCoord[1]) < 180) {
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                    vec2 donor_replacementGLF_dead10coord = _GLF_FUZZED(atanh(mat3x2(-1.0, 3.4, -97.54, -16.62, 653.870, -7.2)[1]));
                                    int donor_replacementGLF_dead10i = _GLF_FUZZED(N);
                                    {
                                        for (int GLF_dead10j = 0; GLF_dead10j < 3; GLF_dead10j++) {
                                            GLF_dead1_GLF_color += texture(GLF_dead10tex, donor_replacementGLF_dead10coord + vec2(float(donor_replacementGLF_dead10i - 1) * grey, float(GLF_dead10j - 1) * grey)) * GLF_dead10weights[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead10i * 3 + GLF_dead10j, 9)];
                                        }
                                    }
                                }
                                if (_GLF_DEAD(false)) {
                                    if (_GLF_DEAD(false)) {
                                        vec2 donor_replacementGLF_dead11o = _GLF_FUZZED(min(GLF_dead6injectionSwitch, log(grey)));
                                        {
                                            donor_replacementGLF_dead11o = donor_replacementGLF_dead11o + donor_replacementGLF_dead11o;
                                            _injected_loop_counter--;
                                        }
                                    }
                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                        uint donor_replacementGLF_dead15matrix_number = _GLF_FUZZED((true ? 194603u : packHalf2x16(injectionSwitch)));
                                        int donor_replacementGLF_dead15rows = _GLF_FUZZED(floatBitsToInt(degrees(grey)));
                                        {
                                            for (int GLF_dead15c = 0; GLF_dead15c < _injected_loop_counter; GLF_dead15c++) {
                                                for (int GLF_dead15r = 0; GLF_dead15r < donor_replacementGLF_dead15rows; GLF_dead15r++) {
                                                    switch (donor_replacementGLF_dead15matrix_number) {
                                                        case 0u:
                                                            GLF_dead15m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15r, 2)] = GLF_dead15one;
                                                            break;
                                                        case 1u:
                                                            GLF_dead15m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15r, 3)] = GLF_dead15one;
                                                            break;
                                                        case 2u:
                                                            GLF_dead15m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15r, 4)] = GLF_dead15one;
                                                            break;
                                                        case 3u:
                                                            GLF_dead15m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15r, 2)] = GLF_dead15one;
                                                            break;
                                                        case 4u:
                                                            GLF_dead15m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15r, 3)] = GLF_dead15one;
                                                            break;
                                                        case 5u:
                                                            GLF_dead15m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15r, 4)] = GLF_dead15one;
                                                            break;
                                                            if (_GLF_DEAD(false)) {
                                                                discard;
                                                            }
                                                        case 6u:
                                                            GLF_dead15m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15r, 2)] = GLF_dead15one;
                                                            break;
                                                        case 7u:
                                                            GLF_dead15m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15r, 3)] = GLF_dead15one;
                                                            break;
                                                        case 8u:
                                                            GLF_dead15m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15r, 4)] = GLF_dead15one;
                                                            break;
                                                    }
                                                }
                                            }
                                            donor_replacementGLF_dead15matrix_number = donor_replacementGLF_dead15matrix_number + 1u;
                                        }
                                    }
                                    {
                                        discard;
                                    }
                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                        int donor_replacementGLF_dead15c = _GLF_FUZZED(-50509);
                                        uint donor_replacementGLF_dead15matrix_number = _GLF_FUZZED(106664u);
                                        int donor_replacementGLF_dead15r = _GLF_FUZZED(-56469);
                                        {
                                            switch (donor_replacementGLF_dead15matrix_number) {
                                                case 0u:
                                                    GLF_dead15m22[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead15c, 2)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead15r, 2)] = GLF_dead15one;
                                                    break;
                                                case 1u:
                                                    GLF_dead15m23[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead15c, 2)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead15r, 3)] = GLF_dead15one;
                                                    break;
                                                case 2u:
                                                    GLF_dead15m24[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead15c, 2)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead15r, 4)] = GLF_dead15one;
                                                    break;
                                                case 3u:
                                                    GLF_dead15m32[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead15c, 3)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead15r, 2)] = GLF_dead15one;
                                                    break;
                                                case 4u:
                                                    GLF_dead15m33[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead15c, 3)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead15r, 3)] = GLF_dead15one;
                                                    break;
                                                case 5u:
                                                    GLF_dead15m34[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead15c, 3)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead15r, 4)] = GLF_dead15one;
                                                    break;
                                                case 6u:
                                                    GLF_dead15m42[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead15c, 4)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead15r, 2)] = GLF_dead15one;
                                                    break;
                                                case 7u:
                                                    GLF_dead15m43[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead15c, 4)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead15r, 3)] = GLF_dead15one;
                                                    break;
                                                case 8u:
                                                    GLF_dead15m44[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead15c, 4)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead15r, 4)] = GLF_dead15one;
                                                    break;
                                            }
                                        }
                                    }
                                }
                                grey = 0.5 + float(data[5]) / 10.0;
                                if (_GLF_DEAD(false)) {
                                    if (_GLF_DEAD(false)) {
                                        vec2 donor_replacementGLF_dead13coord = _GLF_FUZZED(vec2(-5.7, 6.9));
                                        {
                                            if (donor_replacementGLF_dead13coord.y < 0.6) {
                                                uvec2 GLF_dead13icoord = uvec2(((donor_replacementGLF_dead13coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                                                uint GLF_dead13res1 = uint(((GLF_dead13icoord.x * GLF_dead13icoord.y) >> (GLF_dead13icoord.x & 31u)) & 0xffffffffu);
                                                uint GLF_dead13res2 = uint(((GLF_dead13icoord.x * GLF_dead13icoord.y) << (GLF_dead13icoord.x & 31u)) & 0xffffffffu);
                                                float GLF_dead13res = float(((GLF_dead13res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_dead13res1 & 1u) != 0u ? 1u : 0u));
                                                GLF_dead13_GLF_color = vec4(GLF_dead13res, GLF_dead13res, GLF_dead13res, 1.0);
                                            } else {
                                                ivec2 GLF_dead13icoord = ivec2(((donor_replacementGLF_dead13coord - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                                                int GLF_dead13res3 = ((GLF_dead13icoord.x >> 5) & 1) ^ ((GLF_dead13icoord.y & 32) >> 5);
                                                int GLF_dead13res2 = (GLF_dead13icoord.y * GLF_dead13icoord.y >> 10) & 1;
                                                int GLF_dead13res1 = (GLF_dead13icoord.x * GLF_dead13icoord.y >> 9) & 1;
                                                GLF_dead13_GLF_color = vec4(float(GLF_dead13res1 ^ GLF_dead13res2), float(GLF_dead13res2 & GLF_dead13res3), float(GLF_dead13res1 | GLF_dead13res3), 1.0);
                                            }
                                        }
                                    }
                                    int donor_replacementGLF_dead2j = _GLF_FUZZED((ivec4(40693, -1330, -93987, 61350), _injected_loop_counter));
                                    {
                                        if (_GLF_DEAD(false)) {
                                            ivec2 donor_replacementGLF_dead7pos = _GLF_FUZZED(ivec2(-5306, -14116));
                                            {
                                                if (_GLF_DEAD(false)) {
                                                    {
                                                        GLF_dead15_GLF_color = vec4(vec3(0.0), 1.0);
                                                    }
                                                }
                                                if (donor_replacementGLF_dead7pos.x < GLF_dead7dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead7pos.y, 256)] + 15 && donor_replacementGLF_dead7pos.x > GLF_dead7dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead7pos.y, 256)] - 15) {
                                                    float GLF_dead7p = (15.0 - abs(float(donor_replacementGLF_dead7pos.x - GLF_dead7dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead7pos.y, 256)]))) / 15.0;
                                                    ;
                                                    if (_GLF_DEAD(false)) {
                                                        vec3 donor_replacementGLF_dead11m = _GLF_FUZZED(vec3(302.744, -3.2, -197.530));
                                                        vec2 donor_replacementGLF_dead11n = _GLF_FUZZED(vec2(737.769, 592.059));
                                                        for (_GLF_struct_59 _GLF_struct_replacement_59 = _GLF_struct_59(_GLF_struct_60(bvec4(true, true, true, true), _GLF_struct_61(vec4(1.0, 1.0, 1.0, 1.0), mat4x2(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), vec2(1.0, 1.0), mat4x2(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0)), mat4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), mat4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), vec2(1.0, 1.0)), mat2x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), _GLF_struct_62(_GLF_struct_63(mat4x2(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), ivec2(1, 1), mat2(1.0, 1.0, 1.0, 1.0), mat3x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), ivec3(1, 1, 1), vec2(1.0, 1.0)), mat2(1.0, 1.0, 1.0, 1.0)), mat2x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), _GLF_struct_64(_GLF_struct_65(ivec3(1, 1, 1)), -1), uvec3(1u, 1u, 1u)); _GLF_struct_replacement_59._f4.GLF_dead11i <= int(GLF_dead11injectionSwitch.y); _GLF_struct_replacement_59._f4.GLF_dead11i++) {
                                                            vec2 GLF_dead11g = vec2(float(donor_replacementGLF_dead2j), float(_GLF_struct_replacement_59._f4.GLF_dead11i));
                                                            vec2 GLF_dead11o = mix(donor_replacementGLF_dead11n, GLF_dead11g, 0.2);
                                                            if (GLF_dead11injectionSwitch.x < (donor_replacementGLF_dead11m.x)) {
                                                                int GLF_dead11k = 1;
                                                                while (GLF_dead11k >= 0) {
                                                                    GLF_dead11o = GLF_dead11o + GLF_dead11o;
                                                                    GLF_dead11k--;
                                                                }
                                                                donor_replacementGLF_dead11m = vec3(GLF_dead11injectionSwitch.x, cos(GLF_dead11o));
                                                            }
                                                        }
                                                        if (_GLF_DEAD(false)) {
                                                            {
                                                                if (donor_replacementGLF_dead11n.y < 0.6) {
                                                                    uvec2 GLF_dead13icoord = uvec2(((donor_replacementGLF_dead11n - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                                                                    uint GLF_dead13res1 = uint(((GLF_dead13icoord.x * GLF_dead13icoord.y) >> (GLF_dead13icoord.x & 31u)) & 0xffffffffu);
                                                                    uint GLF_dead13res2 = uint(((GLF_dead13icoord.x * GLF_dead13icoord.y) << (GLF_dead13icoord.x & 31u)) & 0xffffffffu);
                                                                    float GLF_dead13res = float(((GLF_dead13res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_dead13res1 & 1u) != 0u ? 1u : 0u));
                                                                    GLF_dead13_GLF_color = vec4(GLF_dead13res, GLF_dead13res, GLF_dead13res, 1.0);
                                                                } else {
                                                                    ivec2 GLF_dead13icoord = ivec2(((donor_replacementGLF_dead11n - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                                                                    int GLF_dead13res3 = ((GLF_dead13icoord.x >> 5) & 1) ^ ((GLF_dead13icoord.y & 32) >> 5);
                                                                    int GLF_dead13res2 = (GLF_dead13icoord.y * GLF_dead13icoord.y >> 10) & 1;
                                                                    int GLF_dead13res1 = (GLF_dead13icoord.x * GLF_dead13icoord.y >> 9) & 1;
                                                                    GLF_dead13_GLF_color = vec4(float(GLF_dead13res1 ^ GLF_dead13res2), float(GLF_dead13res2 & GLF_dead13res3), float(GLF_dead13res1 | GLF_dead13res3), 1.0);
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                                donor_replacementGLF_dead7pos.y++;
                                            }
                                        }
                                        _injected_loop_counter = donor_replacementGLF_dead2j;
                                    }
                                }
                                if (_GLF_DEAD(_GLF_IDENTITY(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)), bool(bvec4(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)), true, true, true))))) {
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                        for (int GLF_dead8i = 0; GLF_dead8i < 10; GLF_dead8i++) {
                                            GLF_dead8obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead8i, 10)] = (10 - GLF_dead8i);
                                            GLF_dead8obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead8i, 10)] = GLF_dead8obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead8i, 10)] * GLF_dead8obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead8i, 10)];
                                        }
                                    }
                                    ivec2 donor_replacementGLF_dead7pos = _GLF_FUZZED(ivec2(58806, 67966));
                                    {
                                        if (_GLF_DEAD(false)) {
                                            if (_GLF_DEAD(false)) {
                                                uint donor_replacementGLF_dead15matrix_number = _GLF_FUZZED((23787u * 13097u));
                                                int donor_replacementGLF_dead15rows = _GLF_FUZZED(_injected_loop_counter);
                                                {
                                                    for (int GLF_dead15c = 0; GLF_dead15c < _injected_loop_counter; GLF_dead15c++) {
                                                        for (int GLF_dead15r = 0; GLF_dead15r < donor_replacementGLF_dead15rows; GLF_dead15r++) {
                                                            switch (donor_replacementGLF_dead15matrix_number) {
                                                                case 0u:
                                                                    GLF_dead15m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15r, 2)] = GLF_dead15one;
                                                                    break;
                                                                case 1u:
                                                                    GLF_dead15m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15r, 3)] = GLF_dead15one;
                                                                    break;
                                                                case 2u:
                                                                    GLF_dead15m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15r, 4)] = GLF_dead15one;
                                                                    break;
                                                                case 3u:
                                                                    GLF_dead15m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15r, 2)] = GLF_dead15one;
                                                                    break;
                                                                case 4u:
                                                                    GLF_dead15m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15r, 3)] = GLF_dead15one;
                                                                    break;
                                                                case 5u:
                                                                    GLF_dead15m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15r, 4)] = GLF_dead15one;
                                                                    break;
                                                                case 6u:
                                                                    GLF_dead15m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15r, 2)] = GLF_dead15one;
                                                                    break;
                                                                case 7u:
                                                                    GLF_dead15m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15r, 3)] = GLF_dead15one;
                                                                    break;
                                                                case 8u:
                                                                    GLF_dead15m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15r, 4)] = GLF_dead15one;
                                                                    break;
                                                            }
                                                        }
                                                    }
                                                    donor_replacementGLF_dead15matrix_number = donor_replacementGLF_dead15matrix_number + 1u;
                                                }
                                            }
                                            {
                                                if (GLF_dead8obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(_injected_loop_counter, 10)] <= _injected_loop_counter) {
                                                    _injected_loop_counter++;
                                                    GLF_dead8swap(_injected_loop_counter, _injected_loop_counter);
                                                }
                                            }
                                        }
                                        if (donor_replacementGLF_dead7pos.x < GLF_dead7dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead7pos.y, 256)] + 15 && donor_replacementGLF_dead7pos.x > GLF_dead7dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead7pos.y, 256)] - 15) {
                                            float GLF_dead7p = (15.0 - abs(float(donor_replacementGLF_dead7pos.x - GLF_dead7dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead7pos.y, 256)]))) / 15.0;
                                            if (_GLF_DEAD(false)) {
                                                vec3 donor_replacementGLF_dead8color = _GLF_FUZZED(mix(vec3(GLF_dead3_GLF_color), vec3(1175.9681, -18.86, 3128.8896), -8289.6102));
                                                {
                                                    donor_replacementGLF_dead8color.y += float(GLF_dead8obj.numbers[2]);
                                                }
                                            }
                                            ;
                                        }
                                        donor_replacementGLF_dead7pos.y++;
                                    }
                                }
                                if (_GLF_DEAD(false)) {
                                    vec2 donor_replacementGLF_dead13coord = _GLF_FUZZED(vec2(30.79));
                                    {
                                        ivec2 GLF_dead13icoord = ivec2(((donor_replacementGLF_dead13coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.6, 1.0)) * 256.0);
                                        int GLF_dead13v = (GLF_dead13icoord.x ^ GLF_dead13icoord.y) * GLF_dead13icoord.y;
                                        bool GLF_dead13res1 = ((GLF_dead13v >> 10) & 1) != 0;
                                        bool GLF_dead13res2 = ((GLF_dead13v >> 11) & 4) != 0;
                                        bool GLF_dead13res3 = ((GLF_dead13v >> 12) & 8) != 0;
                                        GLF_dead13_GLF_color = vec4(GLF_dead13res1 ? 1.0 : 0.0, GLF_dead13res2 ? 1.0 : 0.0, GLF_dead13res3 ? 1.0 : 0.0, 1);
                                    }
                                }
                            } else {
                                if (int(gl_FragCoord[1]) < 210) {
                                    grey = 0.5 + float(data[6]) / 10.0;
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                        break;
                                    }
                                } else {
                                    if (int(gl_FragCoord[1]) < 240) {
                                        grey = 0.5 + float(data[7]) / 10.0;
                                    } else {
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < _GLF_ZERO(0.0, injectionSwitch.x))))) {
                                            bool donor_replacementGLF_dead1c1 = _GLF_FUZZED((ldexp(-5826.9888, -40054) > (-539.205)));
                                            bool donor_replacementGLF_dead1c2 = _GLF_FUZZED(false);
                                            bool donor_replacementGLF_dead1c3 = _GLF_FUZZED((8526.8560 <= 6.5));
                                            vec3 donor_replacementGLF_dead1col = _GLF_FUZZED(cross(vec3(-30.36, 1524.0136, -19.85), vec3(117.655, -4.4, -9.5)));
                                            if (_GLF_DEAD(false)) {
                                                vec2 donor_replacementGLF_dead10coord = _GLF_FUZZED(GLF_dead0resolution);
                                                if (_GLF_DEAD(false)) {
                                                    {
                                                        ivec2 GLF_dead13icoord = ivec2(((donor_replacementGLF_dead10coord - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                                                        int GLF_dead13res3 = ((GLF_dead13icoord.x >> 5) & 1) ^ ((GLF_dead13icoord.y & 32) >> 5);
                                                        int GLF_dead13res2 = (GLF_dead13icoord.y * GLF_dead13icoord.y >> 10) & 1;
                                                        int GLF_dead13res1 = (GLF_dead13icoord.x * GLF_dead13icoord.y >> 9) & 1;
                                                        GLF_dead13_GLF_color = vec4(float(GLF_dead13res1 ^ GLF_dead13res2), float(GLF_dead13res2 & GLF_dead13res3), float(GLF_dead13res1 | GLF_dead13res3), 1.0);
                                                    }
                                                }
                                                _GLF_struct_66 _GLF_struct_replacement_66 = _GLF_struct_66(mat4x2(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), bvec3(true, true, true), _GLF_struct_67(_GLF_struct_68(1u, ivec3(1, 1, 1), mat3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), uvec3(1u, 1u, 1u), mat3x2(1.0, 1.0, 1.0, 1.0, 1.0, 1.0), uvec4(1u, 1u, 1u, 1u), ivec2(1, 1))), _GLF_struct_69(1.0), _GLF_struct_70(_GLF_struct_71(mat2(1.0, 1.0, 1.0, 1.0), uvec4(1u, 1u, 1u, 1u), 1.0, 1, mat3x2(1.0, 1.0, 1.0, 1.0, 1.0, 1.0), _GLF_FUZZED((+_injected_loop_counter)))), _GLF_struct_72(mat2x3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0), _GLF_struct_73(mat4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), 1, uvec3(1u, 1u, 1u), mat2(1.0, 1.0, 1.0, 1.0))));
                                                {
                                                    GLF_dead3_GLF_color += texture(GLF_dead10tex, donor_replacementGLF_dead10coord + vec2(float(_GLF_struct_replacement_66._f4._f0.donor_replacementGLF_dead10i - 1) * grey, float(_injected_loop_counter - 1) * grey)) * GLF_dead10weights[_GLF_MAKE_IN_BOUNDS_INT(_GLF_struct_replacement_66._f4._f0.donor_replacementGLF_dead10i * 3 + _injected_loop_counter, 9)];
                                                }
                                            }
                                            vec2 donor_replacementGLF_dead1uv = _GLF_FUZZED(vec2(-227.155, 75.03));
                                            if (!donor_replacementGLF_dead1c1 && !donor_replacementGLF_dead1c2 && donor_replacementGLF_dead1c3) {
                                                if (_GLF_DEAD(false)) {
                                                    int donor_replacementGLF_dead6m = _GLF_FUZZED(N);
                                                    {
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                            uint donor_replacementGLF_dead15matrix_number = _GLF_FUZZED(min(143271u, 128681u));
                                                            {
                                                                switch (donor_replacementGLF_dead15matrix_number) {
                                                                    case 0u:
                                                                        GLF_dead15m22[_GLF_MAKE_IN_BOUNDS_INT(_injected_loop_counter, 2)][_GLF_MAKE_IN_BOUNDS_INT(_injected_loop_counter, 2)] = GLF_dead15one;
                                                                        break;
                                                                    case 1u:
                                                                        GLF_dead15m23[_GLF_MAKE_IN_BOUNDS_INT(_injected_loop_counter, 2)][_GLF_MAKE_IN_BOUNDS_INT(_injected_loop_counter, 3)] = GLF_dead15one;
                                                                        break;
                                                                    case 2u:
                                                                        GLF_dead15m24[_GLF_MAKE_IN_BOUNDS_INT(_injected_loop_counter, 2)][_GLF_MAKE_IN_BOUNDS_INT(_injected_loop_counter, 4)] = GLF_dead15one;
                                                                        break;
                                                                    case 3u:
                                                                        GLF_dead15m32[_GLF_MAKE_IN_BOUNDS_INT(_injected_loop_counter, 3)][_GLF_MAKE_IN_BOUNDS_INT(_injected_loop_counter, 2)] = GLF_dead15one;
                                                                        break;
                                                                    case 4u:
                                                                        GLF_dead15m33[_GLF_MAKE_IN_BOUNDS_INT(_injected_loop_counter, 3)][_GLF_MAKE_IN_BOUNDS_INT(_injected_loop_counter, 3)] = GLF_dead15one;
                                                                        break;
                                                                    case 5u:
                                                                        GLF_dead15m34[_GLF_MAKE_IN_BOUNDS_INT(_injected_loop_counter, 3)][_GLF_MAKE_IN_BOUNDS_INT(_injected_loop_counter, 4)] = GLF_dead15one;
                                                                        break;
                                                                    case 6u:
                                                                        GLF_dead15m42[_GLF_MAKE_IN_BOUNDS_INT(_injected_loop_counter, 4)][_GLF_MAKE_IN_BOUNDS_INT(_injected_loop_counter, 2)] = GLF_dead15one;
                                                                        break;
                                                                    case 7u:
                                                                        GLF_dead15m43[_GLF_MAKE_IN_BOUNDS_INT(_injected_loop_counter, 4)][_GLF_MAKE_IN_BOUNDS_INT(_injected_loop_counter, 3)] = GLF_dead15one;
                                                                        break;
                                                                    case 8u:
                                                                        GLF_dead15m44[_GLF_MAKE_IN_BOUNDS_INT(_injected_loop_counter, 4)][_GLF_MAKE_IN_BOUNDS_INT(_injected_loop_counter, 4)] = GLF_dead15one;
                                                                        break;
                                                                }
                                                            }
                                                        }
                                                        if (_GLF_DEAD(false)) {
                                                            for (int GLF_dead10j = 0; GLF_dead10j < 3; GLF_dead10j++) {
                                                                GLF_dead1_GLF_color += texture(GLF_dead10tex, donor_replacementGLF_dead1uv + vec2(float(_injected_loop_counter - 1) * grey, float(GLF_dead10j - 1) * grey)) * GLF_dead10weights[_GLF_MAKE_IN_BOUNDS_INT(_injected_loop_counter * 3 + GLF_dead10j, 9)];
                                                            }
                                                        }
                                                        ;
                                                    }
                                                }
                                                if (_GLF_DEAD(false)) {
                                                    if (_GLF_DEAD(false)) {
                                                        {
                                                            uvec2 GLF_dead13icoord = uvec2(((donor_replacementGLF_dead1uv - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                                                            uint GLF_dead13res1 = uint(((GLF_dead13icoord.x * GLF_dead13icoord.y) >> (GLF_dead13icoord.x & 31u)) & 0xffffffffu);
                                                            uint GLF_dead13res2 = uint(((GLF_dead13icoord.x * GLF_dead13icoord.y) << (GLF_dead13icoord.x & 31u)) & 0xffffffffu);
                                                            float GLF_dead13res = float(((GLF_dead13res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_dead13res1 & 1u) != 0u ? 1u : 0u));
                                                            GLF_dead13_GLF_color = vec4(GLF_dead13res, GLF_dead13res, GLF_dead13res, 1.0);
                                                        }
                                                    }
                                                    break;
                                                }
                                                float GLF_dead1stripe = GLF_dead1compute_stripe(cos((donor_replacementGLF_dead1uv.x + donor_replacementGLF_dead1uv.y) * 20.0), donor_replacementGLF_dead1uv.x + donor_replacementGLF_dead1uv.y);
                                                donor_replacementGLF_dead1col = mix(vec3(.7, sinh(donor_replacementGLF_dead1uv.x), donor_replacementGLF_dead1uv.x), vec3(.3, .5, donor_replacementGLF_dead1uv.x), GLF_dead1stripe);
                                                GLF_dead1_GLF_color = vec4(donor_replacementGLF_dead1col, 1.0);
                                                return;
                                                if (_GLF_DEAD(false)) {
                                                    return;
                                                }
                                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                        uint donor_replacementGLF_dead15matrix_number = _GLF_FUZZED(38851u);
                                                        for (int GLF_dead15rows = 2; GLF_dead15rows <= 4; GLF_dead15rows++) {
                                                            for (int GLF_dead15c = 0; GLF_dead15c < _injected_loop_counter; GLF_dead15c++) {
                                                                for (int GLF_dead15r = 0; GLF_dead15r < GLF_dead15rows; GLF_dead15r++) {
                                                                    switch (donor_replacementGLF_dead15matrix_number) {
                                                                        case 0u:
                                                                            GLF_dead15m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15r, 2)] = GLF_dead15one;
                                                                            break;
                                                                        case 1u:
                                                                            GLF_dead15m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15r, 3)] = GLF_dead15one;
                                                                            break;
                                                                        case 2u:
                                                                            GLF_dead15m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15r, 4)] = GLF_dead15one;
                                                                            break;
                                                                        case 3u:
                                                                            GLF_dead15m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15r, 2)] = GLF_dead15one;
                                                                            break;
                                                                        case 4u:
                                                                            GLF_dead15m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15r, 3)] = GLF_dead15one;
                                                                            break;
                                                                        case 5u:
                                                                            GLF_dead15m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15r, 4)] = GLF_dead15one;
                                                                            break;
                                                                        case 6u:
                                                                            GLF_dead15m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15r, 2)] = GLF_dead15one;
                                                                            break;
                                                                        case 7u:
                                                                            GLF_dead15m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15r, 3)] = GLF_dead15one;
                                                                            break;
                                                                        case 8u:
                                                                            GLF_dead15m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15r, 4)] = GLF_dead15one;
                                                                            break;
                                                                    }
                                                                }
                                                            }
                                                            donor_replacementGLF_dead15matrix_number = donor_replacementGLF_dead15matrix_number + 1u;
                                                        }
                                                    }
                                                    {
                                                        discard;
                                                    }
                                                }
                                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                    uint donor_replacementGLF_dead15matrix_number = _GLF_FUZZED(149969u);
                                                    int donor_replacementGLF_dead15rows = _GLF_FUZZED(_injected_loop_counter);
                                                    {
                                                        for (int GLF_dead15r = 0; GLF_dead15r < donor_replacementGLF_dead15rows; GLF_dead15r++) {
                                                            switch (donor_replacementGLF_dead15matrix_number) {
                                                                case 0u:
                                                                    GLF_dead15m22[_GLF_MAKE_IN_BOUNDS_INT(_injected_loop_counter, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15r, 2)] = GLF_dead15one;
                                                                    break;
                                                                case 1u:
                                                                    GLF_dead15m23[_GLF_MAKE_IN_BOUNDS_INT(_injected_loop_counter, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15r, 3)] = GLF_dead15one;
                                                                    break;
                                                                case 2u:
                                                                    GLF_dead15m24[_GLF_MAKE_IN_BOUNDS_INT(_injected_loop_counter, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15r, 4)] = GLF_dead15one;
                                                                    break;
                                                                case 3u:
                                                                    GLF_dead15m32[_GLF_MAKE_IN_BOUNDS_INT(_injected_loop_counter, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15r, 2)] = GLF_dead15one;
                                                                    break;
                                                                case 4u:
                                                                    GLF_dead15m33[_GLF_MAKE_IN_BOUNDS_INT(_injected_loop_counter, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15r, 3)] = GLF_dead15one;
                                                                    break;
                                                                case 5u:
                                                                    GLF_dead15m34[_GLF_MAKE_IN_BOUNDS_INT(_injected_loop_counter, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15r, 4)] = GLF_dead15one;
                                                                    break;
                                                                case 6u:
                                                                    GLF_dead15m42[_GLF_MAKE_IN_BOUNDS_INT(_injected_loop_counter, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15r, 2)] = GLF_dead15one;
                                                                    break;
                                                                case 7u:
                                                                    GLF_dead15m43[_GLF_MAKE_IN_BOUNDS_INT(_injected_loop_counter, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15r, 3)] = GLF_dead15one;
                                                                    break;
                                                                case 8u:
                                                                    GLF_dead15m44[_GLF_MAKE_IN_BOUNDS_INT(_injected_loop_counter, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15r, 4)] = GLF_dead15one;
                                                                    break;
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                            if (_GLF_DEAD(false)) {
                                                if (donor_replacementGLF_dead1uv.y < 0.6) {
                                                    uvec2 GLF_dead13icoord = uvec2(((donor_replacementGLF_dead1uv - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                                                    uint GLF_dead13res1 = uint(((GLF_dead13icoord.x * GLF_dead13icoord.y) >> (GLF_dead13icoord.x & 31u)) & 0xffffffffu);
                                                    uint GLF_dead13res2 = uint(((GLF_dead13icoord.x * GLF_dead13icoord.y) << (GLF_dead13icoord.x & 31u)) & 0xffffffffu);
                                                    float GLF_dead13res = float(((GLF_dead13res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_dead13res1 & 1u) != 0u ? 1u : 0u));
                                                    GLF_dead13_GLF_color = vec4(GLF_dead13res, GLF_dead13res, GLF_dead13res, 1.0);
                                                } else {
                                                    ivec2 GLF_dead13icoord = ivec2(((donor_replacementGLF_dead1uv - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                                                    int GLF_dead13res3 = ((GLF_dead13icoord.x >> 5) & 1) ^ ((GLF_dead13icoord.y & 32) >> 5);
                                                    int GLF_dead13res2 = (GLF_dead13icoord.y * GLF_dead13icoord.y >> 10) & 1;
                                                    int GLF_dead13res1 = (GLF_dead13icoord.x * GLF_dead13icoord.y >> 9) & 1;
                                                    GLF_dead13_GLF_color = vec4(float(GLF_dead13res1 ^ GLF_dead13res2), float(GLF_dead13res2 & GLF_dead13res3), float(GLF_dead13res1 | GLF_dead13res3), 1.0);
                                                }
                                            }
                                        }
                                        if (int(gl_FragCoord[1]) < 270) {
                                            grey = 0.5 + float(data[8]) / 10.0;
                                        } else {
                                            if (_GLF_DEAD(false)) {
                                                if (_GLF_DEAD(false)) {
                                                    vec2 donor_replacementGLF_dead13coord = _GLF_FUZZED(vec2(94.56, -6683.4004));
                                                    {
                                                        if (donor_replacementGLF_dead13coord.y < 0.6) {
                                                            uvec2 GLF_dead13icoord = uvec2(((donor_replacementGLF_dead13coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                                                            uint GLF_dead13res1 = uint(((GLF_dead13icoord.x * GLF_dead13icoord.y) >> (GLF_dead13icoord.x & 31u)) & 0xffffffffu);
                                                            uint GLF_dead13res2 = uint(((GLF_dead13icoord.x * GLF_dead13icoord.y) << (GLF_dead13icoord.x & 31u)) & 0xffffffffu);
                                                            float GLF_dead13res = float(((GLF_dead13res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_dead13res1 & 1u) != 0u ? 1u : 0u));
                                                            GLF_dead13_GLF_color = vec4(GLF_dead13res, GLF_dead13res, GLF_dead13res, 1.0);
                                                        } else {
                                                            ivec2 GLF_dead13icoord = ivec2(((donor_replacementGLF_dead13coord - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                                                            int GLF_dead13res3 = ((GLF_dead13icoord.x >> 5) & 1) ^ ((GLF_dead13icoord.y & 32) >> 5);
                                                            int GLF_dead13res2 = (GLF_dead13icoord.y * GLF_dead13icoord.y >> 10) & 1;
                                                            int GLF_dead13res1 = (GLF_dead13icoord.x * GLF_dead13icoord.y >> 9) & 1;
                                                            GLF_dead13_GLF_color = vec4(float(GLF_dead13res1 ^ GLF_dead13res2), float(GLF_dead13res2 & GLF_dead13res3), float(GLF_dead13res1 | GLF_dead13res3), 1.0);
                                                        }
                                                    }
                                                }
                                                discard;
                                            }
                                            discard;
                                        }
                                    }
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                        if (_GLF_DEAD(false)) {
                                            vec2 donor_replacementGLF_dead10coord = _GLF_FUZZED(GLF_dead0resolution);
                                            int donor_replacementGLF_dead10i = _GLF_FUZZED((N - (-88033)));
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                {
                                                    ivec2 GLF_dead13icoord = ivec2(((donor_replacementGLF_dead10coord - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                                                    int GLF_dead13res3 = ((GLF_dead13icoord.x >> 5) & 1) ^ ((GLF_dead13icoord.y & 32) >> 5);
                                                    int GLF_dead13res2 = (GLF_dead13icoord.y * GLF_dead13icoord.y >> 10) & 1;
                                                    int GLF_dead13res1 = (GLF_dead13icoord.x * GLF_dead13icoord.y >> 9) & 1;
                                                    GLF_dead13_GLF_color = vec4(float(GLF_dead13res1 ^ GLF_dead13res2), float(GLF_dead13res2 & GLF_dead13res3), float(GLF_dead13res1 | GLF_dead13res3), 1.0);
                                                }
                                            }
                                            vec4 donor_replacementGLF_dead10res = _GLF_FUZZED(_GLF_color);
                                            for (_GLF_struct_74 _GLF_struct_replacement_74 = _GLF_struct_74(_GLF_struct_75(1.0, vec2(1.0, 1.0), mat3x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), mat3x2(1.0, 1.0, 1.0, 1.0, 1.0, 1.0), 1.0), _GLF_struct_76(0, mat4x2(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0)), 1, bvec3(true, true, true), ivec3(1, 1, 1)); _GLF_struct_replacement_74._f1.GLF_dead10j < 3; _GLF_struct_replacement_74._f1.GLF_dead10j++) {
                                                donor_replacementGLF_dead10res += texture(GLF_dead10tex, donor_replacementGLF_dead10coord + vec2(float(donor_replacementGLF_dead10i - 1) * grey, float(_GLF_struct_replacement_74._f1.GLF_dead10j - 1) * grey)) * GLF_dead10weights[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead10i * 3 + _GLF_struct_replacement_74._f1.GLF_dead10j, 9)];
                                            }
                                        }
                                        _GLF_struct_18 _GLF_struct_replacement_18 = _GLF_struct_18(true, vec4(1.0, 1.0, 1.0, 1.0), ivec4(1, 1, 1, 1), _GLF_struct_19(mat4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), uvec2(1u, 1u), mat2x3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0), vec3(1.0, 1.0, 1.0), bvec2(true, true)), uvec3(1u, 1u, 1u), _GLF_FUZZED(isnan(1.4)), _GLF_struct_20(mat4x2(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), 1u, _GLF_struct_21(uvec3(1u, 1u, 1u), 1u, ivec3(1, 1, 1), uvec4(1u, 1u, 1u, 1u)), _GLF_struct_22(vec4(1.0, 1.0, 1.0, 1.0), 1.0, ivec3(1, 1, 1), 1, vec4(1.0, 1.0, 1.0, 1.0)), mat2(1.0, 1.0, 1.0, 1.0)), mat4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0));
                                        vec3 donor_replacementGLF_dead1col = _GLF_FUZZED(vec3(5572.1080, -9948.8777, 3.5));
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                            vec2 donor_replacementGLF_dead10coord = _GLF_FUZZED(GLF_dead6injectionSwitch);
                                            for (int GLF_dead10i = 0; GLF_dead10i < 3; GLF_dead10i++) {
                                                for (int GLF_dead10j = 0; GLF_dead10j < 3; GLF_dead10j++) {
                                                    GLF_dead3_GLF_color += texture(GLF_dead10tex, donor_replacementGLF_dead10coord + vec2(float(GLF_dead10i - 1) * grey, float(GLF_dead10j - 1) * grey)) * GLF_dead10weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10i * 3 + GLF_dead10j, 9)];
                                                }
                                            }
                                        }
                                        vec2 donor_replacementGLF_dead1uv = _GLF_FUZZED(ceil(fwidthCoarse(vec2(-175.652, 64.11))));
                                        if (_GLF_struct_replacement_18.donor_replacementGLF_dead1c1) {
                                            _GLF_struct_77 _GLF_struct_replacement_77 = _GLF_struct_77(_GLF_struct_78(_GLF_struct_79(ivec2(1, 1), 1u, ivec3(1, 1, 1), 1.0, uvec4(1u, 1u, 1u, 1u), mat2x3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0)), true, bvec3(true, true, true), uvec2(1u, 1u), vec4(1.0, 1.0, 1.0, 1.0), _GLF_struct_80(mat2x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), 1.0, uvec4(1u, 1u, 1u, 1u), mat4x2(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), bvec3(true, true, true)), vec2(1.0, 1.0)), bvec2(true, true), _GLF_struct_81(uvec2(1u, 1u), bvec4(true, true, true, true), GLF_dead1compute_stripe(cos((donor_replacementGLF_dead1uv.x + donor_replacementGLF_dead1uv.y) * 20.0), donor_replacementGLF_dead1uv.x + donor_replacementGLF_dead1uv.y), mat4x3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), _GLF_struct_82(1u, mat2(1.0, 1.0, 1.0, 1.0)), _GLF_struct_83(uvec3(1u, 1u, 1u), mat3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), uvec3(1u, 1u, 1u), uvec2(1u, 1u), ivec4(1, 1, 1, 1)), _GLF_struct_84(ivec2(1, 1))), mat4x3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), 1, vec2(1.0, 1.0));
                                            donor_replacementGLF_dead1col = mix(vec3(donor_replacementGLF_dead1uv.x, 0, 0.75), vec3(.8, .7, donor_replacementGLF_dead1uv.x), _GLF_struct_replacement_77._f2.GLF_dead1stripe);
                                            GLF_dead1_GLF_color = vec4(donor_replacementGLF_dead1col, 1.0);
                                            return;
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                discard;
                                            }
                                        }
                                        if (_GLF_DEAD(false)) {
                                            if (_GLF_DEAD(false)) {
                                                uint donor_replacementGLF_dead15matrix_number = _GLF_FUZZED((clamp(3419u, 167862u, 79458u) ^ uint(580.389)));
                                                for (int GLF_dead15cols = 2; GLF_dead15cols <= 4; GLF_dead15cols++) {
                                                    for (int GLF_dead15rows = 2; GLF_dead15rows <= 4; GLF_dead15rows++) {
                                                        for (int GLF_dead15c = 0; GLF_dead15c < GLF_dead15cols; GLF_dead15c++) {
                                                            for (int GLF_dead15r = 0; GLF_dead15r < GLF_dead15rows; GLF_dead15r++) {
                                                                switch (donor_replacementGLF_dead15matrix_number) {
                                                                    case 0u:
                                                                        GLF_dead15m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15r, 2)] = GLF_dead15one;
                                                                        break;
                                                                    case 1u:
                                                                        GLF_dead15m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15r, 3)] = GLF_dead15one;
                                                                        break;
                                                                    case 2u:
                                                                        GLF_dead15m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15r, 4)] = GLF_dead15one;
                                                                        break;
                                                                    case 3u:
                                                                        GLF_dead15m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15r, 2)] = GLF_dead15one;
                                                                        break;
                                                                    case 4u:
                                                                        GLF_dead15m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15r, 3)] = GLF_dead15one;
                                                                        break;
                                                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                                            return;
                                                                        }
                                                                    case 5u:
                                                                        GLF_dead15m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15r, 4)] = GLF_dead15one;
                                                                        break;
                                                                    case 6u:
                                                                        GLF_dead15m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15r, 2)] = GLF_dead15one;
                                                                        break;
                                                                    case 7u:
                                                                        GLF_dead15m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15r, 3)] = GLF_dead15one;
                                                                        break;
                                                                    case 8u:
                                                                        GLF_dead15m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15r, 4)] = GLF_dead15one;
                                                                        break;
                                                                }
                                                            }
                                                        }
                                                        donor_replacementGLF_dead15matrix_number = donor_replacementGLF_dead15matrix_number + 1u;
                                                    }
                                                }
                                            }
                                            {
                                                donor_replacementGLF_dead1col.x += float(GLF_dead8obj.numbers[9]);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    vec4 donor_replacementGLF_dead9c = _GLF_FUZZED(GLF_dead1_GLF_color);
                    int donor_replacementGLF_dead9i = _GLF_FUZZED(-86238);
                    {
                        if (_GLF_DEAD(false)) {
                            vec2 donor_replacementGLF_dead13coord = _GLF_FUZZED(GLF_dead1injectionSwitch);
                            if (donor_replacementGLF_dead13coord.y < 0.6) {
                                uvec2 GLF_dead13icoord = uvec2(((donor_replacementGLF_dead13coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                                uint GLF_dead13res1 = uint(((GLF_dead13icoord.x * GLF_dead13icoord.y) >> (GLF_dead13icoord.x & 31u)) & 0xffffffffu);
                                uint GLF_dead13res2 = uint(((GLF_dead13icoord.x * GLF_dead13icoord.y) << (GLF_dead13icoord.x & 31u)) & 0xffffffffu);
                                float GLF_dead13res = float(((GLF_dead13res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_dead13res1 & 1u) != 0u ? 1u : 0u));
                                GLF_dead13_GLF_color = vec4(GLF_dead13res, GLF_dead13res, GLF_dead13res, 1.0);
                            } else {
                                ivec2 GLF_dead13icoord = ivec2(((donor_replacementGLF_dead13coord - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                                int GLF_dead13res3 = ((GLF_dead13icoord.x >> 5) & 1) ^ ((GLF_dead13icoord.y & 32) >> 5);
                                int GLF_dead13res2 = (GLF_dead13icoord.y * GLF_dead13icoord.y >> 10) & 1;
                                int GLF_dead13res1 = (GLF_dead13icoord.x * GLF_dead13icoord.y >> 9) & 1;
                                GLF_dead13_GLF_color = vec4(float(GLF_dead13res1 ^ GLF_dead13res2), float(GLF_dead13res2 & GLF_dead13res3), float(GLF_dead13res1 | GLF_dead13res3), 1.0);
                            }
                        }
                        donor_replacementGLF_dead9c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9i, 4)] = donor_replacementGLF_dead9c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9i, 4)] * donor_replacementGLF_dead9c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9i, 4)];
                    }
                }
            }
            if (_GLF_DEAD(false)) {
                _GLF_struct_23 _GLF_struct_replacement_23 = _GLF_struct_23(mat2x3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0), _GLF_struct_24(_GLF_struct_25(true, uvec2(1u, 1u), bvec2(true, true)), mat4x2(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0)), mat4x2(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), vec3(1.0, 1.0, 1.0), _GLF_struct_26(mat4x2(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0)), _GLF_FUZZED(min(-8578, 86627)));
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    int donor_replacementGLF_dead9i = _GLF_FUZZED(52064);
                    {
                        GLF_dead1_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9i, 4)] = GLF_dead1_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9i, 4)] * GLF_dead1_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9i, 4)];
                    }
                }
                int donor_replacementGLF_dead0iterationCap = _GLF_FUZZED(N);
                int donor_replacementGLF_dead0k = _GLF_FUZZED((bitfieldExtract(30190, N, (N >> (-89634))) + sign(N)));
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    vec2 donor_replacementGLF_dead10coord = _GLF_FUZZED(vec2(-0.5, -3267.2911));
                    int donor_replacementGLF_dead10i = _GLF_FUZZED(donor_replacementGLF_dead0k);
                    vec4 donor_replacementGLF_dead10res = _GLF_FUZZED(degrees(GLF_dead1_GLF_color));
                    float donor_replacementGLF_dead10uvstep = _GLF_FUZZED(-71.55);
                    {
                        donor_replacementGLF_dead10res += texture(GLF_dead10tex, donor_replacementGLF_dead10coord + vec2(float(donor_replacementGLF_dead10i - 1) * donor_replacementGLF_dead10uvstep, float(donor_replacementGLF_dead0iterationCap - 1) * donor_replacementGLF_dead10uvstep)) * GLF_dead10weights[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead10i * 3 + donor_replacementGLF_dead0iterationCap, 9)];
                    }
                }
                float donor_replacementGLF_dead0y = _GLF_FUZZED(faceforward(-566.054, grey, fwidth(asin(grey))));
                do {
                    if (grey * grey + donor_replacementGLF_dead0y * donor_replacementGLF_dead0y > 4.0) {
                        break;
                        if (_GLF_DEAD(false)) {
                            vec3 donor_replacementGLF_dead8color = _GLF_FUZZED(vec3(4.1, -15.15, -98.15));
                            vec2 donor_replacementGLF_dead8uv = _GLF_FUZZED(asin(mat3x2(-4301.8849, -9330.7017, -446.723, 999.082, 27.02, -5.6)[2]));
                            if (donor_replacementGLF_dead8uv.x > (1.0 / 4.0)) {
                                donor_replacementGLF_dead8color.x += float(GLF_dead8obj.numbers[1]);
                            }
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        ivec2 donor_replacementGLF_dead7pos = _GLF_FUZZED(ivec2(donor_replacementGLF_dead0iterationCap, _GLF_struct_replacement_23.donor_replacementGLF_dead0iteration));
                        {
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                int donor_replacementGLF_dead8h = _GLF_FUZZED(ivec3(-43838, -69629, 51705)[1]);
                                int donor_replacementGLF_dead8l = _GLF_FUZZED(24228);
                                for (int GLF_dead8j = donor_replacementGLF_dead8l; GLF_dead8j <= donor_replacementGLF_dead8h - 1; GLF_dead8j++) {
                                    if (GLF_dead8obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead8j, 10)] <= donor_replacementGLF_dead0iterationCap) {
                                        donor_replacementGLF_dead0iterationCap++;
                                        GLF_dead8swap(donor_replacementGLF_dead0iterationCap, GLF_dead8j);
                                    }
                                }
                            }
                            float GLF_dead7p = (15.0 - abs(float(donor_replacementGLF_dead7pos.x - GLF_dead7dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead7pos.y, 256)]))) / 15.0;
                            ;
                        }
                    }
                    float GLF_dead0x_new = grey * grey - donor_replacementGLF_dead0y * donor_replacementGLF_dead0y + grey;
                    if (_GLF_DEAD(false)) {
                        continue;
                    }
                    donor_replacementGLF_dead0y = 2.0 * grey * donor_replacementGLF_dead0y + grey;
                    grey = GLF_dead0x_new;
                    if (_GLF_DEAD(false)) {
                        vec2 donor_replacementGLF_dead13coord = _GLF_FUZZED(vec2(-9.8, 968.395));
                        {
                            ivec2 GLF_dead13icoord = ivec2(((donor_replacementGLF_dead13coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.6, 1.0)) * 256.0);
                            int GLF_dead13v = (GLF_dead13icoord.x ^ GLF_dead13icoord.y) * GLF_dead13icoord.y;
                            bool GLF_dead13res1 = ((GLF_dead13v >> 10) & 1) != 0;
                            bool GLF_dead13res2 = ((GLF_dead13v >> 11) & 4) != 0;
                            bool GLF_dead13res3 = ((GLF_dead13v >> 12) & 8) != 0;
                            GLF_dead13_GLF_color = vec4(GLF_dead13res1 ? 1.0 : 0.0, GLF_dead13res2 ? 1.0 : 0.0, GLF_dead13res3 ? 1.0 : 0.0, 1);
                        }
                    }
                    _GLF_struct_replacement_23.donor_replacementGLF_dead0iteration++;
                    donor_replacementGLF_dead0k++;
                } while (donor_replacementGLF_dead0k < bitfieldInsert(donor_replacementGLF_dead0iterationCap + (257.0 > GLF_dead0resolution.y ? 1 : 0), 0, 0, 0));
            }
            if (_GLF_DEAD(false)) {
                int donor_replacementGLF_dead4baseIndex = _GLF_FUZZED(-28190);
                int donor_replacementGLF_dead4data = _GLF_FUZZED(-72435);
                int donor_replacementGLF_dead4treeIndex = _GLF_FUZZED(-58145);
                {
                    if (_GLF_DEAD(false)) {
                        vec4 donor_replacementGLF_dead9c = _GLF_FUZZED(mod(GLF_dead3_GLF_color, GLF_dead1_GLF_color));
                        int donor_replacementGLF_dead9i = _GLF_FUZZED(int(uint(true)));
                        {
                            if (donor_replacementGLF_dead9c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9i, 4)] >= 1.0) {
                                donor_replacementGLF_dead9c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9i, 4)] = donor_replacementGLF_dead9c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9i, 4)] * donor_replacementGLF_dead9c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9i, 4)];
                            }
                            donor_replacementGLF_dead9i++;
                        }
                    }
                    if (GLF_dead4tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4baseIndex, 10)].rightIndex == -1) {
                        GLF_dead4tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4baseIndex, 10)].rightIndex = donor_replacementGLF_dead4treeIndex;
                        GLF_dead4makeTreeNode(GLF_dead4tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4treeIndex, 10)], donor_replacementGLF_dead4data);
                        return;
                    } else {
                        donor_replacementGLF_dead4baseIndex = GLF_dead4tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4baseIndex, 10)].rightIndex;
                        ;
                    }
                }
            }
        }
    }
    _GLF_color = vec4(vec3(grey), 1.0);
}
