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

ivec2 GLF_dead19iter(ivec2 GLF_dead19p) {
    if (GLF_dead19p.x > 0) {
        GLF_dead19p.y--;
    }
    if (GLF_dead19p.x < 0) {
        GLF_dead19p.y++;
    }
    GLF_dead19p.x += GLF_dead19p.y / 2;
    return GLF_dead19p;
}

layout(set = 0, binding = 2) uniform sampler2D GLF_dead20tex;
vec4 GLF_dead21_GLF_color = _GLF_FUZZED(vec4(-496.655, -9.8, 437.688, -7624.6529));

layout(set = 0, binding = 3) uniform buf3 {
    vec2 GLF_dead21injectionSwitch;
};

float GLF_dead21compute_derivative_x(float GLF_dead21v) {
    return dFdx(GLF_dead21v) * GLF_dead21injectionSwitch.y;
}

float GLF_dead21compute_derivative_y(float GLF_dead21v) {
    return dFdy(GLF_dead21v) * GLF_dead21injectionSwitch.y;
}

float GLF_dead21compute_stripe(float GLF_dead21v) {
    return smoothstep(-.9, 1., (GLF_dead21v) / ((GLF_dead21injectionSwitch.y > GLF_dead21injectionSwitch.x) ? GLF_dead21compute_derivative_x(GLF_dead21v) : GLF_dead21compute_derivative_y(GLF_dead21v)));
}

struct _GLF_struct_10 {
    uvec4 _f0;
    float GLF_live14slope;
    mat3x4 _f1;
};

struct _GLF_struct_19 {
    uint _f0;
    mat4x3 _f1;
    mat4 _f2;
    vec4 donor_replacementGLF_dead13matrix_b;
};

struct _GLF_struct_18 {
    mat4x3 _f0;
    bool _f1;
    _GLF_struct_19 _f2;
    vec2 _f3;
    float _f4;
};

struct _GLF_struct_17 {
    uvec2 _f0;
    ivec4 _f1;
};

struct _GLF_struct_16 {
    float _f0;
    ivec2 _f1;
    vec4 _f2;
    _GLF_struct_17 _f3;
    uvec2 _f4;
};

struct _GLF_struct_15 {
    mat3 _f0;
};

struct _GLF_struct_14 {
    mat4 _f0;
    mat2x3 _f1;
};

struct _GLF_struct_13 {
    vec3 _f0;
    mat3 _f1;
    mat2x4 _f2;
    mat2x3 _f3;
};

struct _GLF_struct_12 {
    float _f0;
    ivec3 _f1;
    _GLF_struct_13 _f2;
};

struct _GLF_struct_11 {
    _GLF_struct_12 _f0;
    _GLF_struct_14 _f1;
    _GLF_struct_15 _f2;
    _GLF_struct_16 _f3;
    uvec3 _f4;
    _GLF_struct_18 _f5;
};

struct _GLF_struct_20 {
    mat3x4 _f0;
    int GLF_live11looplimiter2;
    ivec2 _f1;
    mat3x4 _f2;
    bvec3 _f3;
};

struct _GLF_struct_21 {
    bvec4 _f0;
    bvec4 _f1;
    uvec4 _f2;
    ivec4 _f3;
    vec4 _GLF_outVarBackup_GLF_color;
    mat3x2 _f4;
    ivec3 _f5;
};

struct _GLF_struct_24 {
    mat2x3 _f0;
    mat2x3 _f1;
    uvec4 _f2;
    mat4 _f3;
    ivec4 _f4;
    mat4x3 _f5;
};

struct _GLF_struct_23 {
    vec2 _f0;
};

struct _GLF_struct_22 {
    vec4 _GLF_outVarBackup_GLF_color;
    _GLF_struct_23 _f0;
    mat2 _f1;
    mat2 _f2;
    _GLF_struct_24 _f3;
    mat2 _f4;
    vec3 _f5;
};

struct _GLF_struct_25 {
    mat4x2 _f0;
    mat4x3 _f1;
    int GLF_dead13x;
    int _f2;
};

struct _GLF_struct_27 {
    mat4x2 _f0;
    vec3 _f1;
    uvec3 _f2;
    mat3x2 _f3;
};

struct _GLF_struct_26 {
    mat2 _f0;
    float GLF_live15v;
    mat2 _f1;
    _GLF_struct_27 _f2;
};

struct _GLF_struct_29 {
    mat4x3 _f0;
    ivec3 _f1;
    vec4 _f2;
    bool _f3;
};

struct _GLF_struct_28 {
    int GLF_live17i;
    _GLF_struct_29 _f0;
};

struct _GLF_struct_34 {
    mat4 _f0;
    bvec3 _f1;
    vec2 _f2;
    bvec3 _f3;
    uvec4 _f4;
    mat4x2 _f5;
};

struct _GLF_struct_33 {
    mat2 _f0;
    _GLF_struct_34 _f1;
    float _f2;
    uvec3 _f3;
};

struct _GLF_struct_32 {
    int _f0;
    bool _f1;
    bvec4 _f2;
};

struct _GLF_struct_31 {
    vec4 _f0;
    mat2x3 _f1;
    uvec2 _f2;
    _GLF_struct_32 _f3;
    vec4 donor_replacementGLF_dead13matrix_u;
    uvec3 _f4;
};

struct _GLF_struct_30 {
    ivec4 _f0;
    int _f1;
    _GLF_struct_31 _f2;
    uvec3 _f3;
    _GLF_struct_33 _f4;
};

struct _GLF_struct_35 {
    vec3 _f0;
    vec4 _GLF_outVarBackup_GLF_color;
};

struct _GLF_struct_36 {
    mat4x3 _f0;
    vec4 _GLF_outVarBackup_GLF_color;
    float _f1;
};

struct _GLF_struct_40 {
    bool _f0;
    ivec4 _f1;
    vec2 _f2;
    int _f3;
};

struct _GLF_struct_39 {
    uvec4 _f0;
    mat4x3 _f1;
};

struct _GLF_struct_38 {
    mat2x3 _f0;
    mat3 _f1;
    _GLF_struct_39 _f2;
    ivec3 _f3;
    _GLF_struct_40 _f4;
};

struct _GLF_struct_37 {
    _GLF_struct_38 _f0;
    mat4 _f1;
    mat2 _f2;
    int GLF_live11i;
};

struct _GLF_struct_44 {
    uvec4 _f0;
    mat3 _f1;
    ivec2 _f2;
    mat2 _f3;
    float _f4;
    mat4x2 _f5;
    mat2x4 _f6;
};

struct _GLF_struct_43 {
    mat4x2 _f0;
    bvec4 _f1;
    mat2x4 _f2;
    mat2x3 _f3;
    vec3 _f4;
};

struct _GLF_struct_42 {
    uvec3 _f0;
    mat4x2 _f1;
    mat3 _f2;
    _GLF_struct_43 _f3;
    mat4 _f4;
    vec4 _f5;
    _GLF_struct_44 _f6;
};

struct _GLF_struct_41 {
    mat2x3 _f0;
    int GLF_live15looplimiter0;
    _GLF_struct_42 _f1;
    uvec3 _f2;
    int _f3;
    bvec4 _f4;
    int _f5;
};

struct _GLF_struct_47 {
    bvec2 _f0;
    mat4x2 _f1;
    mat3 _f2;
};

struct _GLF_struct_46 {
    int GLF_live16i;
    mat3x4 _f0;
    mat3x2 _f1;
    mat2x4 _f2;
    vec4 _f3;
    uvec3 _f4;
    _GLF_struct_47 _f5;
};

struct _GLF_struct_45 {
    _GLF_struct_46 _f0;
    vec3 _f1;
    uint _f2;
    uvec4 _f3;
};

struct _GLF_struct_49 {
    float _f0;
    bool _f1;
    bvec2 _f2;
    mat4 _f3;
    mat4 _f4;
};

struct _GLF_struct_48 {
    _GLF_struct_49 _f0;
    vec4 _GLF_outVarBackup_GLF_color;
    bvec2 _f1;
    uvec2 _f2;
};

struct _GLF_struct_50 {
    mat3x4 _f0;
    mat3x2 _f1;
    int _f2;
    bvec4 _f3;
    float _f4;
    int GLF_live14looplimiter0;
    int _f5;
};

struct _GLF_struct_55 {
    vec4 _f0;
    bvec2 _f1;
};

struct _GLF_struct_54 {
    bvec2 _f0;
    mat2 _f1;
    ivec2 _f2;
};

struct _GLF_struct_53 {
    mat2x4 _f0;
    uint _f1;
    vec4 _f2;
    vec3 _f3;
    ivec4 _f4;
};

struct _GLF_struct_52 {
    bvec3 _f0;
    ivec4 _f1;
    ivec3 _f2;
    uint _f3;
    mat4x2 _f4;
    _GLF_struct_53 _f5;
    _GLF_struct_54 _f6;
};

struct _GLF_struct_51 {
    _GLF_struct_52 _f0;
    _GLF_struct_55 _f1;
    bvec2 _f2;
    vec2 GLF_live7coord;
    mat3 _f3;
};

struct _GLF_struct_56 {
    uint _f0;
    uint _f1;
    int GLF_live16i;
};

struct _GLF_struct_59 {
    float GLF_live14refh;
    mat3x2 _f0;
};

struct _GLF_struct_58 {
    vec2 _f0;
    ivec2 _f1;
    vec3 _f2;
    _GLF_struct_59 _f3;
    int _f4;
    vec4 _f5;
    int _f6;
};

struct _GLF_struct_57 {
    mat3x4 _f0;
    ivec3 _f1;
    _GLF_struct_58 _f2;
};

struct _GLF_struct_62 {
    mat3x2 _f0;
    mat4x3 _f1;
};

struct _GLF_struct_61 {
    uvec2 _f0;
    _GLF_struct_62 _f1;
    float GLF_live14slope;
    mat3x2 _f2;
    uvec4 _f3;
    mat3x2 _f4;
    uint _f5;
};

struct _GLF_struct_60 {
    _GLF_struct_61 _f0;
};

struct _GLF_struct_63 {
    float GLF_live14slope;
    uvec4 _f0;
};

struct _GLF_struct_66 {
    mat3 _f0;
    uvec4 _f1;
    ivec2 _f2;
    mat2x4 _f3;
    float GLF_live14slope;
    mat2x4 _f4;
    ivec3 _f5;
};

struct _GLF_struct_65 {
    mat4x2 _f0;
    mat3 _f1;
    _GLF_struct_66 _f2;
};

struct _GLF_struct_64 {
    vec4 _f0;
    uvec3 _f1;
    _GLF_struct_65 _f2;
    mat3x2 _f3;
    mat3x4 _f4;
};

struct _GLF_struct_67 {
    mat3x4 _f0;
    vec3 _f1;
    vec3 _f2;
    mat2x4 _f3;
    bool _f4;
    vec4 _GLF_outVarBackup_GLF_color;
};

struct _GLF_struct_68 {
    mat4 _f0;
    mat3x4 _f1;
    float GLF_live16limit;
};

struct _GLF_struct_71 {
    uvec2 _f0;
    vec2 _f1;
    mat3 _f2;
    int _f3;
    ivec4 _f4;
    mat3 _f5;
};

struct _GLF_struct_70 {
    mat4x3 _f0;
    mat2x3 _f1;
    _GLF_struct_71 _f2;
    uvec4 _f3;
};

struct _GLF_struct_69 {
    _GLF_struct_70 _f0;
    mat2x4 _f1;
    vec2 _f2;
    int GLF_live17i;
    mat3 _f3;
};

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
            if (_GLF_DEAD(false)) {
                float donor_replacementGLF_dead18s = _GLF_FUZZED(floor(distance(-9569.4911, -0.5)));
                {
                    ;
                }
            }
            if (GLF_live15looplimiter1 >= 5) {
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

layout(set = 0, binding = 4) uniform sampler2D GLF_live14tex;
int GLF_dead13MATRIX_N = 4;
int GLF_live9map[16 * 16] = int[256](0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
const int GLF_live11N = 10;
int GLF_live11data[10] = int[10](_GLF_FUZZED(int(79295u)), _GLF_FUZZED(ivec4(51074, 54444, -21004, 48506).z), _GLF_FUZZED(((32476 + 44748) | 42106)), _GLF_FUZZED(-89931), _GLF_FUZZED((true ? (-62150) : (58903 ^ 12564))), _GLF_FUZZED(-66259), _GLF_FUZZED(-57767), _GLF_FUZZED((-38847)), _GLF_FUZZED((69403 - (-11007))), _GLF_FUZZED(13750)), GLF_live11temp[10] = int[10](_GLF_FUZZED((+(-25700))), _GLF_FUZZED((72210 ^ 5208)), _GLF_FUZZED(-5584), _GLF_FUZZED(45463), _GLF_FUZZED((1428 + (-7967))), _GLF_FUZZED(14325), _GLF_FUZZED((int(118678u))), _GLF_FUZZED(94126), _GLF_FUZZED((2837 - (-120))), _GLF_FUZZED(6717));

void GLF_live11merge(int GLF_live11from, int GLF_live11mid, int GLF_live11to) {
    int GLF_live11k = GLF_live11from, GLF_live11i = GLF_live11from, GLF_live11j = GLF_live11mid + 1;
    {
        if (_GLF_DEAD(false)) {
            ivec2 donor_replacementGLF_dead19p = _GLF_FUZZED((GLF_live11to - ivec2(62156, 65658)));
            {
                donor_replacementGLF_dead19p.x -= 16;
            }
        }
        int GLF_live11looplimiter0 = 0;
        while (GLF_live11i <= GLF_live11mid && GLF_live11j <= GLF_live11to) {
            if (_GLF_DEAD(false)) {
                vec2 donor_replacementGLF_dead20coord = _GLF_FUZZED(reflect(vec2(78.95, -15.59), vec2(8.7, 2.2)));
                float donor_replacementGLF_dead20h = _GLF_FUZZED(distance(vec3(-3.0, -27.58, 6138.7679), vec3(3717.9221, 9911.0019, -7144.7790)));
                float donor_replacementGLF_dead20refh = _GLF_FUZZED(-4.6);
                float donor_replacementGLF_dead20slope = _GLF_FUZZED(fwidthFine(3.8));
                vec2 donor_replacementGLF_dead20uvstep = _GLF_FUZZED(mix(vec2(8049.1265, 971.731), vec2(6.7, 0.3), 0.1));
                {
                    donor_replacementGLF_dead20coord -= donor_replacementGLF_dead20uvstep;
                    donor_replacementGLF_dead20refh += donor_replacementGLF_dead20slope;
                    donor_replacementGLF_dead20h = texture(GLF_dead20tex, donor_replacementGLF_dead20coord).y;
                    GLF_live11mid++;
                }
            }
            if (GLF_live11looplimiter0 >= 6) {
                break;
            }
            GLF_live11looplimiter0++;
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                float donor_replacementGLF_dead12th = _GLF_FUZZED(-623.740);
                vec2 donor_replacementGLF_dead12v = _GLF_FUZZED(vec2(-13.86, -6502.2006));
                if (_GLF_DEAD(false)) {
                    bool donor_replacementGLF_dead21c1 = _GLF_FUZZED(true);
                    bool donor_replacementGLF_dead21c2 = _GLF_FUZZED(true);
                    bool donor_replacementGLF_dead21c3 = _GLF_FUZZED((vec4(408.997, 9.4, -457.564, 2.8) == vec4(-6.1, -8.3, -20.13, 165.193)));
                    bool donor_replacementGLF_dead21c4 = _GLF_FUZZED(true);
                    vec3 donor_replacementGLF_dead21col = _GLF_FUZZED(smoothstep(exp2(donor_replacementGLF_dead12th), donor_replacementGLF_dead12th, vec3(1.9, 20.82, -330.179)));
                    if (!donor_replacementGLF_dead21c1 && !donor_replacementGLF_dead21c2 && !donor_replacementGLF_dead21c3 && donor_replacementGLF_dead21c4) {
                        float GLF_dead21stripe = GLF_dead21compute_stripe(tan((donor_replacementGLF_dead12v.x + donor_replacementGLF_dead12v.y) * 20.0));
                        donor_replacementGLF_dead21col = mix(vec3(donor_replacementGLF_dead12v.x, .8, 0), vec3(1, donor_replacementGLF_dead12v.y, 0), GLF_dead21stripe);
                        GLF_dead21_GLF_color = vec4(donor_replacementGLF_dead21col, 1.0);
                        return;
                    }
                }
                if (donor_replacementGLF_dead12v.x < 0.0) {
                    if (_GLF_DEAD(false)) {
                        {
                            donor_replacementGLF_dead12v -= donor_replacementGLF_dead12v;
                            donor_replacementGLF_dead12th += donor_replacementGLF_dead12th;
                            donor_replacementGLF_dead12th = texture(GLF_dead20tex, donor_replacementGLF_dead12v).y;
                            GLF_live11from++;
                        }
                    }
                    donor_replacementGLF_dead12th = 1.0 - donor_replacementGLF_dead12th;
                }
            }
            {
                if (GLF_live11data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11i, 10)] < GLF_live11data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11j, 10)]) {
                    GLF_live11temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11k++, 10)] = GLF_live11data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11i++, 10)];
                } else {
                    GLF_live11temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11k++, 10)] = GLF_live11data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11j++, 10)];
                }
            }
            if (_GLF_DEAD(false)) {
                {
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        ivec2 donor_replacementGLF_dead19p = _GLF_FUZZED(ivec2(73010, -23760));
                        {
                            donor_replacementGLF_dead19p.x -= 16;
                        }
                    }
                    vec2 GLF_live14coord = _GLF_FUZZED((vec2(79.44, -3407.1975) * vec2(-2.5, -483.547)));
                    float GLF_live14h = _GLF_FUZZED(7393.3076);
                    int GLF_live14i = _GLF_FUZZED((~(true ? (-27087) : 7069)));
                    float GLF_live14refh = _GLF_FUZZED(-1.7);
                    _GLF_struct_10 _GLF_struct_replacement_10 = _GLF_struct_10(uvec4(1u, 1u, 1u, 1u), _GLF_FUZZED(vec3(vec2(82.70, -710.984), 0.6).b), mat3x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0));
                    vec2 GLF_live14uvstep = _GLF_FUZZED(vec3(8.5, 613.831, -348.241).ts);
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        vec4 donor_replacementGLF_dead18c = _GLF_FUZZED(vec4(-8764.9180, 5.0, 70.49, 1731.0827));
                        if (donor_replacementGLF_dead18c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11looplimiter0, 4)] >= 1.0) {
                            donor_replacementGLF_dead18c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11looplimiter0, 4)] = donor_replacementGLF_dead18c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11looplimiter0, 4)] * donor_replacementGLF_dead18c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11looplimiter0, 4)];
                        }
                    }
                    {
                        int GLF_live14looplimiter0 = 0;
                        while (GLF_live14h < GLF_live14refh && GLF_live14i < 32) {
                            if (GLF_live14looplimiter0 >= 3) {
                                break;
                            }
                            GLF_live14looplimiter0++;
                            {
                                GLF_live14coord -= GLF_live14uvstep;
                                GLF_live14refh += _GLF_struct_replacement_10.GLF_live14slope;
                                GLF_live14h = texture(GLF_live14tex, GLF_live14coord).y;
                                GLF_live14i++;
                            }
                            if (_GLF_DEAD(false)) {
                                {
                                    GLF_live14uvstep -= GLF_live14coord;
                                    GLF_live14h += GLF_live14h;
                                    GLF_live14refh = texture(GLF_dead20tex, GLF_live14uvstep).y;
                                    GLF_live11k++;
                                }
                            }
                        }
                    }
                }
                float donor_replacementGLF_dead13alpha3 = _GLF_FUZZED(-18.15);
                _GLF_struct_11 _GLF_struct_replacement_11 = _GLF_struct_11(_GLF_struct_12(1.0, ivec3(1, 1, 1), _GLF_struct_13(vec3(1.0, 1.0, 1.0), mat3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), mat2x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), mat2x3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0))), _GLF_struct_14(mat4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), mat2x3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0)), _GLF_struct_15(mat3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0)), _GLF_struct_16(1.0, ivec2(1, 1), vec4(1.0, 1.0, 1.0, 1.0), _GLF_struct_17(uvec2(1u, 1u), ivec4(1, 1, 1, 1)), uvec2(1u, 1u)), uvec3(1u, 1u, 1u), _GLF_struct_18(mat4x3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), true, _GLF_struct_19(1u, mat4x3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), mat4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), _GLF_FUZZED(sign(vec4(-4.3, 8577.4590, -17.26, -11.87)))), vec2(1.0, 1.0), 1.0));
                {
                    int GLF_live15target = _GLF_FUZZED(((-20870)));
                    {
                        ;
                    }
                }
                vec4 donor_replacementGLF_dead13matrix_u = _GLF_FUZZED(vec4(asin(vec3(1676.9501, 4.0, -1.8)), -7.2));
                {
                    if (_GLF_DEAD(false)) {
                        {
                            donor_replacementGLF_dead13matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11from, 4)] = donor_replacementGLF_dead13matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11from, 4)] * donor_replacementGLF_dead13matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11from, 4)];
                        }
                    }
                    donor_replacementGLF_dead13alpha3 += donor_replacementGLF_dead13matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11mid, 4)] * _GLF_struct_replacement_11._f5._f2.donor_replacementGLF_dead13matrix_b[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11mid, 4)];
                }
            }
        }
    }
    {
        int GLF_live11looplimiter1 = 0;
        while (GLF_live11i < GLF_live11N && GLF_live11i <= GLF_live11mid) {
            if (GLF_live11looplimiter1 >= 6) {
                break;
            }
            GLF_live11looplimiter1++;
            if (_GLF_DEAD(false)) {
                vec4 donor_replacementGLF_dead18c = _GLF_FUZZED(vec4(1.9, 8900.7108, 0.3, -432.751));
                int donor_replacementGLF_dead18i = _GLF_FUZZED(GLF_live11looplimiter1);
                {
                    if (donor_replacementGLF_dead18c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead18i, 4)] >= 1.0) {
                        donor_replacementGLF_dead18c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead18i, 4)] = donor_replacementGLF_dead18c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead18i, 4)] * donor_replacementGLF_dead18c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead18i, 4)];
                    }
                    donor_replacementGLF_dead18i++;
                }
            }
            {
                if (_GLF_DEAD(false)) {
                    {
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                            discard;
                        }
                        if ((GLF_live11mid & 1) == 1) {
                            GLF_live11mid = 3 * GLF_live11mid + 1;
                        } else {
                            if (_GLF_DEAD(false)) {
                                discard;
                            }
                            GLF_live11mid /= 2;
                        }
                        GLF_live11looplimiter1++;
                    }
                }
                GLF_live11temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11k++, 10)] = GLF_live11data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11i++, 10)];
            }
        }
    }
    {
        float GLF_live16result = _GLF_FUZZED((+(-81.89)));
        {
            GLF_live16result += 0.4;
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                ivec2 donor_replacementGLF_dead19p = _GLF_FUZZED((ivec2(79563, 54299) & ivec2(80161, -78785)));
                {
                    donor_replacementGLF_dead19p.y--;
                }
            }
        }
    }
    {
        _GLF_struct_20 _GLF_struct_replacement_20 = _GLF_struct_20(mat3x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), 0, ivec2(1, 1), mat3x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), bvec3(true, true, true));
        for (int GLF_live11i = GLF_live11from; GLF_live11i <= GLF_live11to; GLF_live11i++) {
            if (_GLF_struct_replacement_20.GLF_live11looplimiter2 >= 6) {
                break;
            }
            _GLF_struct_replacement_20.GLF_live11looplimiter2++;
            {
                GLF_live11data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11i, 10)] = GLF_live11temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11i, 10)];
            }
        }
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < log(1.0))))) {
        if ((GLF_live11to & 1) == 1) {
            GLF_live11to = 3 * GLF_live11to + 1;
            if (_GLF_DEAD(false)) {
                vec3 donor_replacementGLF_dead21col = _GLF_FUZZED(vec3(-7.5, 2.5, -6325.1342));
                vec2 donor_replacementGLF_dead21uv = _GLF_FUZZED(vec2(-7436.5148, 5.8));
                {
                    float GLF_dead21stripe = GLF_dead21compute_stripe(tan((donor_replacementGLF_dead21uv.x + donor_replacementGLF_dead21uv.y) * 20.0));
                    donor_replacementGLF_dead21col = mix(vec3(0.5, donor_replacementGLF_dead21uv.x, 0.1), vec3(.4, 0, .5), GLF_dead21stripe);
                    GLF_dead21_GLF_color = vec4(donor_replacementGLF_dead21col, 1.0);
                    return;
                }
            }
        } else {
            GLF_live11to /= 2;
        }
    }
}

struct _GLF_struct_7 {
    vec2 _f0;
    bvec4 _f1;
    vec3 _f2;
    bool _f3;
    mat2 _f4;
};

struct _GLF_struct_6 {
    mat2 _f0;
    _GLF_struct_7 _f1;
};

struct _GLF_struct_5 {
    bool c2;
    ivec4 _f0;
    mat4x2 _f1;
};

struct _GLF_struct_4 {
    int _f0;
    _GLF_struct_5 _f1;
    mat4x3 _f2;
    _GLF_struct_6 _f3;
    mat4x3 _f4;
};

struct _GLF_struct_9 {
    vec3 _f0;
    bvec2 _f1;
    mat3x4 _f2;
};

struct _GLF_struct_8 {
    float donor_replacementGLF_dead3c_im;
    _GLF_struct_9 _f0;
};

layout(set = 0, binding = 5) uniform buf5 {
    float GLF_live6one;
};

mat2 GLF_live6m22 = _GLF_FUZZED(mat2(-87.42, -0.1, 6.1, -5.8));
mat2x3 GLF_live6m23 = _GLF_FUZZED(mat2x3(-531.057, 95.06, -8805.5584, 38.09, -974.903, -7.7));
mat2x4 GLF_live6m24 = _GLF_FUZZED(mat2x4(vec4(8716.3886, 4.0, 70.82, -152.329), vec4(16.96, -23.74, -2904.3801, -36.39)));
mat3x2 GLF_live6m32 = _GLF_FUZZED((mat3x2(mat3x4(-8.1, 4.1, -844.956, 5.9, -8398.4663, 2.5, -24.64, 0.8, -1.4, -0.9, -5.4, -2.0)) + mat3x2(-7.9, -52.15, 3.4, -938.732, 758.727, 7413.5312)));
mat3 GLF_live6m33 = _GLF_FUZZED(mat3(-32.95, 10.30, 8.9, 27.45, 77.13, 0.3, -570.973, -3.7, -5.7));
mat3x4 GLF_live6m34 = _GLF_FUZZED(mat3x4(63.25, -13.02, -4.1, -567.959, -3.5, 3.6, 1.8, -85.42, -4.5, 1.1, 5.0, -31.50));
mat4x2 GLF_live6m42 = _GLF_FUZZED(mat4x2(6.5, -45.56, 8.0, 25.37, -6.1, 63.10, 0.5, 3402.5978));
mat4x3 GLF_live6m43 = _GLF_FUZZED(mat4x3(float(int(18506u))));
mat4 GLF_live6m44 = _GLF_FUZZED(mat4(3016.4768, 446.991, 48.00, -1884.6068, 42.32, 694.031, -5790.5186, -79.53, 1.6, -398.854, 5.2, 782.517, -2.4, 93.52, 9611.4307, -3866.7624));
layout(set = 0, binding = 6) uniform sampler2D GLF_live7tex;

vec3 GLF_dead3pickColor(int GLF_dead3i) {
    return vec3(float(GLF_dead3i) / 50.0, float(GLF_dead3i) / 120.0, float(GLF_dead3i) / 140.0);
}

vec4 GLF_dead2gl_FragCoord = _GLF_FUZZED(vec4(-8.4, 7373.8767, 9512.2332, -693.095));

struct _GLF_struct_2 {
    ivec4 _f0;
    mat2x3 _f1;
};

struct _GLF_struct_1 {
    _GLF_struct_2 _f0;
    mat2x4 _f1;
    ivec3 _f2;
    uvec2 _f3;
    vec2 _f4;
    mat4x3 _f5;
    mat4 _f6;
};

struct _GLF_struct_0 {
    vec3 _f0;
    bvec2 _f1;
    _GLF_struct_1 _f2;
    bool c6;
    vec4 _f3;
};

struct _GLF_struct_3 {
    mat3x2 _f0;
    mat2 _f1;
    bool c7;
};

layout(set = 0, binding = 7) uniform buf7 {
    vec2 injectionSwitch;
};

layout(location = 0) out vec4 _GLF_color;

layout(set = 0, binding = 0) uniform buf0 {
    float time;
};

layout(set = 0, binding = 1) uniform buf1 {
    vec2 resolution;
};

float h_r;
float s_g;
float b_b;

void doConvert() {
    int msb8 = 256;
    {
        if (_GLF_DEAD(false)) {
            ivec2 donor_replacementGLF_dead19p = _GLF_FUZZED(findLSB(ivec2(62193, -32297)));
            {
                donor_replacementGLF_dead19p.x -= 16;
            }
        }
        int GLF_live17looplimiter0 = 0;
        int GLF_live17v = _GLF_FUZZED(((94740 * 20140) | (-18738)));
        {
            if (GLF_live17looplimiter0 >= 3) {
                ;
            }
            GLF_live17looplimiter0++;
            {
                GLF_live17v = (4 * GLF_live17v * (1000 - GLF_live17v)) / 1000;
            }
        }
    }
    {
        _GLF_struct_21 _GLF_struct_replacement_21 = _GLF_struct_21(bvec4(true, true, true, true), bvec4(true, true, true, true), uvec4(1u, 1u, 1u, 1u), ivec4(1, 1, 1, 1), vec4(1.0, 1.0, 1.0, 1.0), mat3x2(1.0, 1.0, 1.0, 1.0, 1.0, 1.0), ivec3(1, 1, 1));
        _GLF_struct_replacement_21._GLF_outVarBackup_GLF_color = _GLF_color;
        _GLF_color = vec4(728.396, -5764.1554, -63.47, 0.7);
        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
            _GLF_color = _GLF_struct_replacement_21._GLF_outVarBackup_GLF_color;
        }
        {
            int GLF_live17i = _GLF_FUZZED((-15036));
            int GLF_live17iters = _GLF_FUZZED(-35207);
            int GLF_live17v = _GLF_FUZZED(-38701);
            {
                int GLF_live17looplimiter0 = 0;
                for (GLF_live17i = 0; GLF_live17i < GLF_live17iters; GLF_live17i++) {
                    if (GLF_live17looplimiter0 >= 3) {
                        break;
                    }
                    GLF_live17looplimiter0++;
                    {
                        GLF_live17v = (4 * GLF_live17v * (1000 - GLF_live17v)) / 1000;
                    }
                }
            }
        }
    }
    {
        vec2 GLF_live8a = _GLF_FUZZED((vec2(-3647.8215, -5302.8339) * mat2(vec2(-2.8, 1.1), vec2(8420.4266, -76.03))));
        float GLF_live8z = _GLF_FUZZED(vec3(7.5, 694.632, -71.66).z);
        if (_GLF_DEAD(false)) {
            while (s_g < s_g && msb8 < 32) {
                GLF_live8a -= GLF_live8a;
                s_g += b_b;
                s_g = texture(GLF_dead20tex, GLF_live8a).y;
                msb8++;
            }
        }
        {
            if (_GLF_DEAD(false)) {
                return;
            }
            GLF_live8z = GLF_live8a.y / GLF_live8a.x;
        }
    }
    if (_GLF_DEAD(false)) {
        {
            msb8 /= 2;
        }
    }
    vec3 temp;
    for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != _GLF_IDENTITY(1, (false ? _GLF_FUZZED(msb8) : 1))); _injected_loop_counter++) {
        do {
            if (_GLF_DEAD(false)) {
                int donor_replacementGLF_dead15v = _GLF_FUZZED(GLF_live11N);
                {
                    if ((donor_replacementGLF_dead15v & 1) == 1) {
                        donor_replacementGLF_dead15v = 3 * donor_replacementGLF_dead15v + 1;
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < sqrt(0.0))))) {
                            bool donor_replacementGLF_dead21c1 = _GLF_FUZZED(true);
                            bool donor_replacementGLF_dead21c2 = _GLF_FUZZED(false);
                            bool donor_replacementGLF_dead21c3 = _GLF_FUZZED(false);
                            vec2 donor_replacementGLF_dead21uv = _GLF_FUZZED(vec2(temp));
                            if (!donor_replacementGLF_dead21c1 && !donor_replacementGLF_dead21c2 && donor_replacementGLF_dead21c3) {
                                float GLF_dead21stripe = GLF_dead21compute_stripe(cos((donor_replacementGLF_dead21uv.x + donor_replacementGLF_dead21uv.y) * 20.0));
                                temp = mix(vec3(.7, sinh(donor_replacementGLF_dead21uv.x), donor_replacementGLF_dead21uv.x), vec3(.3, .5, donor_replacementGLF_dead21uv.x), GLF_dead21stripe);
                                GLF_dead21_GLF_color = vec4(temp, 1.0);
                                return;
                            }
                        }
                    } else {
                        donor_replacementGLF_dead15v /= 2;
                        {
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                vec2 donor_replacementGLF_dead20coord = _GLF_FUZZED(vec2(-7.0, 6.3));
                                vec2 donor_replacementGLF_dead20uvstep = _GLF_FUZZED(inversesqrt(ceil(injectionSwitch)));
                                while (h_r < s_g && _injected_loop_counter < 32) {
                                    donor_replacementGLF_dead20coord -= donor_replacementGLF_dead20uvstep;
                                    s_g += b_b;
                                    h_r = texture(GLF_dead20tex, donor_replacementGLF_dead20coord).y;
                                    _injected_loop_counter++;
                                }
                            }
                            int GLF_live15baseIndex = _GLF_FUZZED(42551);
                            int GLF_live15data = _GLF_FUZZED(31039);
                            int GLF_live15treeIndex = _GLF_FUZZED((5063 & 39010));
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
                                    GLF_live15tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15baseIndex, 10)].rightIndex = GLF_live15treeIndex;
                                    GLF_live15makeTreeNode(GLF_live15tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15treeIndex, 10)], GLF_live15data);
                                    ;
                                } else {
                                    if (_GLF_DEAD(false)) {
                                        vec2 donor_replacementGLF_dead20coord = _GLF_FUZZED(vec4(-4.0, 2410.7325, 95.19, 6.0).ba);
                                        vec2 donor_replacementGLF_dead20uvstep = _GLF_FUZZED(resolution);
                                        while (h_r < h_r && _injected_loop_counter < 32) {
                                            donor_replacementGLF_dead20coord -= donor_replacementGLF_dead20uvstep;
                                            h_r += b_b;
                                            h_r = texture(GLF_dead20tex, donor_replacementGLF_dead20coord).y;
                                            _injected_loop_counter++;
                                        }
                                    }
                                    GLF_live15baseIndex = GLF_live15tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15baseIndex, 10)].rightIndex;
                                    ;
                                }
                            }
                        }
                    }
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(2.8, -686.197, -2.4, -6.7);
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            {
                                int GLF_live16looplimiter0 = 0;
                                if (GLF_live16looplimiter0 >= 3) {
                                    if (_GLF_DEAD(false)) {
                                        bool donor_replacementGLF_dead21c1 = _GLF_FUZZED(true);
                                        bool donor_replacementGLF_dead21c2 = _GLF_FUZZED((ivec3(14260, -33318, -74850) != ivec3(-12277, 69778, 21542)));
                                        vec2 donor_replacementGLF_dead21uv = _GLF_FUZZED(vec2(-9383.9203, 59.65));
                                        if (!donor_replacementGLF_dead21c1 && donor_replacementGLF_dead21c2) {
                                            float GLF_dead21stripe = GLF_dead21compute_stripe(tan((donor_replacementGLF_dead21uv.x + donor_replacementGLF_dead21uv.y) * 20.0));
                                            temp = mix(vec3(0.5, donor_replacementGLF_dead21uv.x, 0.1), vec3(.4, 0, .5), GLF_dead21stripe);
                                            GLF_dead21_GLF_color = vec4(temp, 1.0);
                                            return;
                                        }
                                    }
                                    ;
                                }
                            }
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        break;
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = vec4(-2889.8092, 1371.3164, 849.338, -2.4);
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                {
                                    int GLF_live15baseIndex = _GLF_FUZZED(int(false));
                                    int GLF_live15data = _GLF_FUZZED(45908);
                                    int GLF_live15treeIndex = _GLF_FUZZED(((bvec2(true, true).s ? (-29687) : (-74524)) | (~(-84908))));
                                    {
                                        if (GLF_live15tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15baseIndex, 10)].rightIndex == -1) {
                                            GLF_live15tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15baseIndex, 10)].rightIndex = GLF_live15treeIndex;
                                            GLF_live15makeTreeNode(GLF_live15tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15treeIndex, 10)], GLF_live15data);
                                            ;
                                        } else {
                                            GLF_live15baseIndex = GLF_live15tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15baseIndex, 10)].rightIndex;
                                            ;
                                        }
                                    }
                                }
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        vec2 donor_replacementGLF_dead20coord = _GLF_FUZZED(injectionSwitch);
                        vec2 donor_replacementGLF_dead20uvstep = _GLF_FUZZED(resolution);
                        while (b_b < b_b && _injected_loop_counter < 32) {
                            donor_replacementGLF_dead20coord -= donor_replacementGLF_dead20uvstep;
                            b_b += b_b;
                            b_b = texture(GLF_dead20tex, donor_replacementGLF_dead20coord).y;
                            _injected_loop_counter++;
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        {
                            {
                                ;
                            }
                        }
                        _GLF_color = unpackSnorm4x8((~124682u));
                    }
                    if (_GLF_DEAD(false)) {
                        ivec2 donor_replacementGLF_dead19p = _GLF_FUZZED(ivec2(17827, -95968));
                        while (donor_replacementGLF_dead19p.x > 15) {
                            donor_replacementGLF_dead19p.x -= 16;
                        }
                    }
                    _injected_loop_counter++;
                }
            }
            temp = b_b * (float(bitCount(msb8)) - s_g) + (b_b - b_b * (float(bitCount(msb8)) - s_g)) * clamp(abs(abs(6.0 * (h_r - vec3(bitfieldReverse(0), bitCount(msb8), 2) / 3.0)) - 3.0) - float(bitCount(msb8)), float(bitfieldExtract(int(resolution.x), 0, 0)), float(bitCount(int(resolution.x))));
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                _GLF_color = round(_GLF_color);
            }
        } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
    }
    h_r = temp.x;
    for (int _injected_loop_counter = (0 ^ 1); _GLF_WRAPPED_LOOP(_injected_loop_counter > (0 & (17717 & (26031 * 88733)))); _injected_loop_counter--) {
        s_g = temp.y;
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = vec4(8.4, 9.4, -1.4, 1603.3889);
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
        if (_GLF_DEAD(false)) {
            vec2 donor_replacementGLF_dead12v = _GLF_FUZZED(injectionSwitch);
            if (donor_replacementGLF_dead12v.x < 0.0) {
                h_r = 1.0 - h_r;
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    ivec2 donor_replacementGLF_dead19p = _GLF_FUZZED(ivec2(20920, 54805));
                    for (_injected_loop_counter = 0; _injected_loop_counter < 100; _injected_loop_counter++) {
                        donor_replacementGLF_dead19p = GLF_dead19iter(donor_replacementGLF_dead19p);
                    }
                }
                if (_GLF_DEAD(false)) {
                    _GLF_color = (mat4(-67.42, -8371.4164, -787.737, 5.7, 4.1, 464.831, 8.9, -7.8, 526.780, 9982.5845, 90.51, 902.097, -6.0, 4.9, 645.675, -671.483) * _GLF_color);
                }
            }
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = (vec4(-8.0, 2822.8570, -809.083, -552.384) / vec4(2.0, 0.4, -5.5, 0.0));
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            if (_GLF_DEAD(false)) {
                {
                    donor_replacementGLF_dead12v -= donor_replacementGLF_dead12v;
                    h_r += s_g;
                    b_b = texture(GLF_dead20tex, donor_replacementGLF_dead12v).y;
                    GLF_dead13MATRIX_N++;
                }
            }
        }
    }
    do {
        for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
            if (_GLF_DEAD(false)) {
                {
                    ;
                }
            }
            {
                int GLF_live9directions = _GLF_FUZZED((~ivec3(24484, -8272, -53646).b));
                ivec2 GLF_live9p = _GLF_FUZZED(ivec2(-17979, -22716));
                if (GLF_live9p.y > 0 && GLF_live9map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live9p.x) + (GLF_live9p.y - 2) * 16, 256)] == 0) {
                    {
                        vec2 GLF_live14coord = _GLF_FUZZED((vec2(-9526.6690, 5857.5454) - 828.141));
                        float GLF_live14h = _GLF_FUZZED(-2919.3176);
                        int GLF_live14i = _GLF_FUZZED(((-87186) - ivec3(93649, 24716, -1263)).g);
                        int GLF_live14looplimiter0 = 0;
                        float GLF_live14refh = _GLF_FUZZED((false ? vec4(-7349.3875, 5.5, -8.7, 1395.9202) : vec4(-928.154, 6.3, 81.11, -7.0)).r);
                        float GLF_live14slope = _GLF_FUZZED(float(81150u));
                        vec2 GLF_live14uvstep = _GLF_FUZZED(vec2(6.0, -6281.6903));
                        {
                            if (GLF_live14looplimiter0 >= 3) {
                                ;
                            }
                            GLF_live14looplimiter0++;
                            {
                                GLF_live14coord -= GLF_live14uvstep;
                                GLF_live14refh += GLF_live14slope;
                                GLF_live14h = texture(GLF_live14tex, GLF_live14coord).y;
                                GLF_live14i++;
                            }
                        }
                    }
                    GLF_live9directions += 1;
                }
            }
            b_b = temp.z;
        }
    } while (_GLF_WRAPPED_LOOP(false));
    if (_GLF_DEAD(false)) {
        {
            {
                _GLF_struct_22 _GLF_struct_replacement_22 = _GLF_struct_22(vec4(1.0, 1.0, 1.0, 1.0), _GLF_struct_23(vec2(1.0, 1.0)), mat2(1.0, 1.0, 1.0, 1.0), mat2(1.0, 1.0, 1.0, 1.0), _GLF_struct_24(mat2x3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0), mat2x3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0), uvec4(1u, 1u, 1u, 1u), mat4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), ivec4(1, 1, 1, 1), mat4x3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0)), mat2(1.0, 1.0, 1.0, 1.0), vec3(1.0, 1.0, 1.0));
                _GLF_struct_replacement_22._GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = (degrees(vec4(-2.6, 8.5, -76.34, -2.8)) * (mat4(-9.3, 2.3, 177.156, -3610.4934, -78.16, 116.615, -3.1, 1982.0049, 12.01, -74.77, 8.8, 9962.1341, -6.0, 3.2, -3.6, 30.36) * 490.313));
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                    _GLF_color = _GLF_struct_replacement_22._GLF_outVarBackup_GLF_color;
                }
            }
            vec2 GLF_live10coord = _GLF_FUZZED(vec2(7.9, -13.69));
            if (GLF_live10coord.x > 1.0)
                GLF_live10coord.x -= 1.0;
        }
        _GLF_color = log(vec4(115.169, -3.0, 6.0, -7.2));
    }
}

vec3 computeColor(float c, vec2 position) {
    int msb8 = 256;
    h_r = fract(c);
    s_g = float(bitCount(msb8));
    b_b = (0.5 + (sin(time) * 0.5 + 0.5));
    doConvert();
    if (_GLF_WRAPPED_IF_TRUE(true)) {
        if (_GLF_DEAD(false)) {
            vec3 donor_replacementGLF_dead21col = _GLF_FUZZED(vec3(-2.2, -4.6, -1.0));
            {
                float GLF_dead21stripe = GLF_dead21compute_stripe(tan((position.x + position.y) * 20.0));
                donor_replacementGLF_dead21col = mix(vec3(position.x, .8, 0), vec3(1, position.y, 0), GLF_dead21stripe);
                GLF_dead21_GLF_color = vec4(donor_replacementGLF_dead21col, 1.0);
                ;
            }
        }
        s_g *= float(bitCount(msb8)) / position.y;
    } else {
    }
    if (_GLF_DEAD(false)) {
        float donor_replacementGLF_dead13alpha3 = _GLF_FUZZED(tan(b_b));
        {
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                ivec2 donor_replacementGLF_dead19p = _GLF_FUZZED(ivec2(7664, 49222));
                {
                    donor_replacementGLF_dead19p.y--;
                }
            }
            if (_GLF_DEAD(_GLF_IDENTITY(false, bool(bvec3(_GLF_IDENTITY(false, (false) && true), false, true))))) {
                return vec3(1.0, 1.0, 1.0);
            }
            {
                vec3 GLF_live16c = _GLF_FUZZED(vec3(631.564, -99.60, 1.8));
                {
                    int GLF_live16looplimiter1 = 0;
                    for (int GLF_live16i = 0; GLF_live16i < 3; GLF_live16i++) {
                        if (GLF_live16looplimiter1 >= 3) {
                            break;
                        }
                        GLF_live16looplimiter1++;
                        {
                            if (GLF_live16c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live16i, 3)] >= 1.0) {
                                GLF_live16c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live16i, 3)] = GLF_live16c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live16i, 3)] * GLF_live16c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live16i, 3)];
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                ivec2 donor_replacementGLF_dead19p = _GLF_FUZZED(ivec2(84938, 58400));
                                {
                                    donor_replacementGLF_dead19p.x = -donor_replacementGLF_dead19p.x;
                                }
                            }
                        }
                    }
                }
                if (_GLF_DEAD(false)) {
                    if (float(GLF_dead13MATRIX_N) >= donor_replacementGLF_dead13alpha3) {
                        ;
                    }
                }
            }
            for (_GLF_struct_25 _GLF_struct_replacement_25 = _GLF_struct_25(mat4x2(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), mat4x3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), GLF_dead13MATRIX_N - 1, 1); _GLF_struct_replacement_25.GLF_dead13x >= msb8; _GLF_struct_replacement_25.GLF_dead13x--) {
                s_g += pow(GLF_live6m44[_GLF_MAKE_IN_BOUNDS_INT(_GLF_struct_replacement_25.GLF_dead13x, 4)][_GLF_MAKE_IN_BOUNDS_INT(msb8, 4)], 2.0);
                _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(_GLF_struct_replacement_25.GLF_dead13x, 4)] = GLF_live6m44[_GLF_MAKE_IN_BOUNDS_INT(_GLF_struct_replacement_25.GLF_dead13x, 4)][_GLF_MAKE_IN_BOUNDS_INT(msb8, 4)];
                if (_GLF_DEAD(false)) {
                    ivec2 donor_replacementGLF_dead19p = _GLF_FUZZED((GLF_live11N | ivec2(-38616, -34756)));
                    {
                        donor_replacementGLF_dead19p.y++;
                    }
                }
            }
            s_g = sqrt(s_g);
            _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(msb8, 4)] -= (sign(_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(msb8, 4)]) * s_g);
            for (int GLF_dead13u = GLF_dead13MATRIX_N - 1; GLF_dead13u >= msb8; GLF_dead13u--) {
                b_b += pow(_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13u, 4)], 2.0);
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    ivec2 donor_replacementGLF_dead19p = _GLF_FUZZED((GLF_dead13u / ivec2(-67334, -93655)));
                    {
                        donor_replacementGLF_dead19p.x -= 16;
                    }
                }
            }
            c = 2.0 / b_b;
            for (int GLF_dead13j = msb8; GLF_dead13j < GLF_dead13MATRIX_N; GLF_dead13j++) {
                for (int GLF_dead13a = GLF_dead13MATRIX_N - 1; GLF_dead13a >= msb8; GLF_dead13a--) {
                    donor_replacementGLF_dead13alpha3 += _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13a, 4)] * GLF_live6m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13a, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13j, 4)];
                }
                h_r = c * donor_replacementGLF_dead13alpha3;
                if (_GLF_DEAD(false)) {
                    vec3 donor_replacementGLF_dead21col = _GLF_FUZZED(faceforward(vec3(-62.89, 50.39, -5.1), (true ? vec3(6.6, 8.4, 49.16) : mod(vec3(-9544.5200, 1400.4662, -746.013), GLF_live6one)), (h_r - vec3(6.1, 2.7, 9.7))));
                    {
                        float GLF_dead21stripe = GLF_dead21compute_stripe(tan((position.x + position.y) * 20.0));
                        donor_replacementGLF_dead21col = mix(vec3(0.5, position.x, 0.1), vec3(.4, 0, .5), GLF_dead21stripe);
                        GLF_dead21_GLF_color = vec4(donor_replacementGLF_dead21col, 1.0);
                        ;
                    }
                }
                for (int GLF_dead13a = GLF_dead13MATRIX_N - 1; GLF_dead13a >= msb8; GLF_dead13a--) {
                    if (_GLF_DEAD(false)) {
                        _GLF_color = mix(GLF_dead2gl_FragCoord, GLF_dead2gl_FragCoord, bvec4(false, false, false, true));
                        if (_GLF_DEAD(false)) {
                            while (GLF_dead13a < bitfieldInsert(800, GLF_dead13a, 0, 0)) {
                                if (mod(float(GLF_dead13a), b_b) <= 0.01) {
                                    s_g += 0.2;
                                }
                                if (float(GLF_dead13a) >= b_b) {
                                    ;
                                }
                                GLF_dead13a++;
                            }
                        }
                    }
                    GLF_live6m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13a, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13j, 4)] = GLF_live6m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13a, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13j, 4)] - (h_r * _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13a, 4)]);
                }
                donor_replacementGLF_dead13alpha3 = 0.0;
                h_r = 0.0;
                if (_GLF_DEAD(false)) {
                    continue;
                }
                {
                    if (_GLF_DEAD(false)) {
                        {
                            GLF_dead2gl_FragCoord[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13j, 4)] = GLF_dead2gl_FragCoord[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13j, 4)] * GLF_dead2gl_FragCoord[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13j, 4)];
                        }
                    }
                    vec4 _GLF_outVarBackup_GLF_color;
                    if (_GLF_DEAD(false)) {
                        bool donor_replacementGLF_dead21c1 = _GLF_FUZZED(true);
                        bool donor_replacementGLF_dead21c2 = _GLF_FUZZED((resolution != injectionSwitch));
                        bool donor_replacementGLF_dead21c3 = _GLF_FUZZED((uvec4(9223u, 16127u, 120877u, 124270u) == uvec4(61448u, 67606u, 30030u, 71831u)));
                        vec3 donor_replacementGLF_dead21col = _GLF_FUZZED(vec3(5.8, 87.56, 7051.8028));
                        if (!donor_replacementGLF_dead21c1 && !donor_replacementGLF_dead21c2 && donor_replacementGLF_dead21c3) {
                            float GLF_dead21stripe = GLF_dead21compute_stripe(cos((position.x + position.y) * 20.0));
                            donor_replacementGLF_dead21col = mix(vec3(.7, sinh(position.x), position.x), vec3(.3, .5, position.x), GLF_dead21stripe);
                            GLF_dead21_GLF_color = vec4(donor_replacementGLF_dead21col, 1.0);
                            ;
                        }
                    }
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = (6849.0071 - vec4(60.37, -7961.8713, 918.872, 0.2));
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
            }
            for (int GLF_dead13b = GLF_dead13MATRIX_N - 1; GLF_dead13b >= msb8; GLF_dead13b--) {
                donor_replacementGLF_dead13alpha3 += _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13b, 4)] * GLF_dead2gl_FragCoord[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13b, 4)];
            }
            h_r = c * donor_replacementGLF_dead13alpha3;
            for (int GLF_dead13b = GLF_dead13MATRIX_N - 1; GLF_dead13b >= msb8; GLF_dead13b--) {
                GLF_dead2gl_FragCoord[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13b, 4)] = GLF_dead2gl_FragCoord[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13b, 4)] - (h_r * _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13b, 4)]);
                {
                    float GLF_live16result = _GLF_FUZZED(-0.4);
                    {
                        GLF_live16result += 0.4;
                    }
                }
            }
            s_g = 0.0;
            b_b = 0.0;
            c = 0.0;
            donor_replacementGLF_dead13alpha3 = 0.0;
            h_r = 0.0;
        }
    }
    if (_GLF_DEAD(false)) {
        while (c < s_g && GLF_dead13MATRIX_N < 32) {
            position -= position;
            s_g += s_g;
            c = texture(GLF_dead20tex, position).y;
            GLF_dead13MATRIX_N++;
        }
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                if (_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(msb8, 4)] >= 1.0) {
                    _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(msb8, 4)] = _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(msb8, 4)] * _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(msb8, 4)];
                }
            }
            _GLF_color = _GLF_color;
            if (_GLF_DEAD(false)) {
                vec3 donor_replacementGLF_dead21col = _GLF_FUZZED(normalize(vec3(-482.074, 0.3, -7562.4627)));
                vec2 donor_replacementGLF_dead21uv = _GLF_FUZZED(asin(vec2(678.985, -2.9)));
                {
                    float GLF_dead21stripe = GLF_dead21compute_stripe(cos((donor_replacementGLF_dead21uv.x + donor_replacementGLF_dead21uv.y) * 20.0));
                    donor_replacementGLF_dead21col = mix(vec3(.7, sinh(donor_replacementGLF_dead21uv.x), donor_replacementGLF_dead21uv.x), vec3(.3, .5, donor_replacementGLF_dead21uv.x), GLF_dead21stripe);
                    GLF_dead21_GLF_color = vec4(donor_replacementGLF_dead21col, 1.0);
                    ;
                }
            }
        }
        {
            int GLF_live17looplimiter0 = 0;
            int GLF_live17v = _GLF_FUZZED(28244);
            {
                if (GLF_live17looplimiter0 >= 3) {
                    ;
                }
                GLF_live17looplimiter0++;
                {
                    GLF_live17v = (4 * GLF_live17v * (1000 - GLF_live17v)) / 1000;
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        {
                            c += 0.2;
                        }
                    }
                }
            }
        }
        {
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = mat4(55.74, 155.756, -9288.0483, 68.41, 8.4, 0.5, 42.43, 571.685, -0.3, 5040.0430, -6.3, -1883.9539, -6013.8594, 4.4, 5002.5587, -5924.7571)[0];
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                    if (_GLF_DEAD(false)) {
                        {
                            ;
                        }
                    }
                }
            }
            ;
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                {
                    if (mod(float(GLF_dead13MATRIX_N), h_r) <= 0.01) {
                        c += 0.2;
                    }
                    if (float(GLF_dead13MATRIX_N) >= s_g) {
                        ;
                    }
                    GLF_dead13MATRIX_N++;
                }
            }
        }
    }
    {
        {
            vec2 GLF_live14coord = _GLF_FUZZED(vec2(4.2, -223.504));
            float GLF_live14h = _GLF_FUZZED((false ? (-164.885) : 75.65));
            int GLF_live14i = _GLF_FUZZED((-53649));
            int GLF_live14looplimiter0 = 0;
            if (_GLF_DEAD(false)) {
                ivec2 donor_replacementGLF_dead19p = _GLF_FUZZED(ivec2(-21196, -99442));
                for (msb8 = 0; msb8 < 100; msb8++) {
                    donor_replacementGLF_dead19p = GLF_dead19iter(donor_replacementGLF_dead19p);
                }
            }
            float GLF_live14refh = _GLF_FUZZED(((-956.763) * vec2(1534.5068, 106.374).x));
            float GLF_live14slope = _GLF_FUZZED(-701.702);
            vec2 GLF_live14uvstep = _GLF_FUZZED((mat4x2(-118.427, 79.66, 4670.5117, 0.1, -999.041, -3.0, -5.5, -41.75) * vec4(-5.0, -2775.5605, -81.48, 56.45)));
            {
                if (GLF_live14looplimiter0 >= 3) {
                    ;
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < tan(0.0))))) {
                        bool donor_replacementGLF_dead21c1 = _GLF_FUZZED((ivec3(28092, -85065, 33933) != ivec3(71563, 26436, 22357)));
                        bool donor_replacementGLF_dead21c2 = _GLF_FUZZED((bvec2(false, true) != bvec2(true, false)));
                        vec3 donor_replacementGLF_dead21col = _GLF_FUZZED(tan(vec3(7.9, 2889.2692, -7.0)));
                        if (!donor_replacementGLF_dead21c1 && donor_replacementGLF_dead21c2) {
                            float GLF_dead21stripe = GLF_dead21compute_stripe(tan((position.x + position.y) * 20.0));
                            donor_replacementGLF_dead21col = mix(vec3(0.5, position.x, 0.1), vec3(.4, 0, .5), GLF_dead21stripe);
                            GLF_dead21_GLF_color = vec4(donor_replacementGLF_dead21col, 1.0);
                            ;
                        }
                    }
                }
                GLF_live14looplimiter0++;
                {
                    GLF_live14coord -= GLF_live14uvstep;
                    GLF_live14refh += GLF_live14slope;
                    GLF_live14h = texture(GLF_live14tex, GLF_live14coord).y;
                    GLF_live14i++;
                }
            }
        }
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        _GLF_color = unpackSnorm4x8(193780u);
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
            if (_GLF_DEAD(false)) {
                vec3 donor_replacementGLF_dead21col = _GLF_FUZZED(vec3(-9.8, -1.1, -5854.1593));
                {
                    float GLF_dead21stripe = GLF_dead21compute_stripe(tan((position.x + position.y) * 20.0));
                    donor_replacementGLF_dead21col = mix(vec3(0.5, position.x, 0.1), vec3(.4, 0, .5), GLF_dead21stripe);
                    GLF_dead21_GLF_color = vec4(donor_replacementGLF_dead21col, 1.0);
                    ;
                }
            }
        }
    }
    h_r *= float(bitCount(msb8)) / position.x;
    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
        if (_GLF_DEAD(false)) {
            bool donor_replacementGLF_dead21c1 = _GLF_FUZZED(true);
            bool donor_replacementGLF_dead21c2 = _GLF_FUZZED((GLF_live6m32 != mat3x2(-87.96, 9680.4451, 803.614, 375.981, -6480.2425, 69.05)));
            bool donor_replacementGLF_dead21c3 = _GLF_FUZZED(false);
            bool donor_replacementGLF_dead21c4 = _GLF_FUZZED((mat3x2(-2.1, 128.450, -96.36, 3.4, 7.3, -7590.7659) == mat3x2(60.68, -4.7, -2.6, 697.055, -8469.7751, 4.7)));
            vec3 donor_replacementGLF_dead21col = _GLF_FUZZED(atan(vec3(-1718.3812, -4.0, 9.7)));
            if (!donor_replacementGLF_dead21c1 && !donor_replacementGLF_dead21c2 && !donor_replacementGLF_dead21c3 && donor_replacementGLF_dead21c4) {
                float GLF_dead21stripe = GLF_dead21compute_stripe(tan((position.x + position.y) * 20.0));
                donor_replacementGLF_dead21col = mix(vec3(position.x, .8, 0), vec3(1, position.y, 0), GLF_dead21stripe);
                GLF_dead21_GLF_color = vec4(donor_replacementGLF_dead21col, 1.0);
                ;
            }
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
            _GLF_color = GLF_dead2gl_FragCoord;
        }
        if (abs(position.y - position.x) < 0.5) {
            b_b = clamp(float(bitfieldExtract(int(resolution.x), 0, 0)), float(bitCount(msb8)), b_b * float(bitCount(msb8)) * 3.0);
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                if (_GLF_DEAD(false)) {
                    ivec2 donor_replacementGLF_dead19p = _GLF_FUZZED(bitfieldReverse(ivec2(57606, -60931)));
                    if (donor_replacementGLF_dead19p.x < 0) {
                        donor_replacementGLF_dead19p.y++;
                    }
                }
                float donor_replacementGLF_dead12th = _GLF_FUZZED(c);
                if (position.y < position.x) {
                    donor_replacementGLF_dead12th = 0.5 - donor_replacementGLF_dead12th;
                }
            }
        }
    } else {
    }
    if (_GLF_WRAPPED_IF_FALSE(false)) {
    } else {
        vec4 _GLF_outVarBackup_GLF_color;
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < _GLF_IDENTITY(determinant(mat4(0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0)), mix(float(_GLF_FUZZED(-1.9)), float(determinant(mat4(0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0))), bool(true))))))) {
            ivec2 donor_replacementGLF_dead19p = _GLF_FUZZED(ivec2(17450, 47810));
            {
                donor_replacementGLF_dead19p.y--;
            }
        }
        do {
            if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                if (_GLF_DEAD(false)) {
                    _GLF_color = atanh(exp(GLF_dead2gl_FragCoord));
                }
            } else {
                _GLF_outVarBackup_GLF_color = _GLF_color;
            }
        } while (_GLF_WRAPPED_LOOP(false));
        _GLF_color = vec4(0.6, 87.36, 3729.4572, 2251.2303);
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = vec4(-809.950, 7.8, -8898.5502, 46.21);
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
        if (_GLF_DEAD(false)) {
            {
                if ((msb8 & 1) == 1) {
                    msb8 = 3 * msb8 + 1;
                } else {
                    msb8 /= 2;
                }
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(-4431.3708, 51.38, 1.9, 7.2);
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                msb8++;
            }
        }
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            do {
                _GLF_color = _GLF_outVarBackup_GLF_color;
                if (_GLF_DEAD(false)) {
                    {
                        {
                            {
                                ;
                            }
                        }
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = atanh(vec4(-6.4, -1324.1502, -2271.1966, 2.6));
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= sin(0.0))))) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                            if (_GLF_DEAD(false)) {
                                bool donor_replacementGLF_dead21c1 = _GLF_FUZZED(false);
                                vec3 donor_replacementGLF_dead21col = _GLF_FUZZED(vec3(0.6, 4191.3806, 3.7));
                                if (donor_replacementGLF_dead21c1) {
                                    float GLF_dead21stripe = GLF_dead21compute_stripe(cos((position.x + position.y) * 20.0));
                                    donor_replacementGLF_dead21col = mix(vec3(position.x, 0, 0.75), vec3(.8, .7, position.x), GLF_dead21stripe);
                                    GLF_dead21_GLF_color = vec4(donor_replacementGLF_dead21col, 1.0);
                                    ;
                                }
                            }
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            {
                                ;
                            }
                        }
                    }
                    discard;
                    {
                        if (_GLF_DEAD(false)) {
                            float donor_replacementGLF_dead18limit = _GLF_FUZZED(exp(time));
                            {
                                if (mod(float(msb8), s_g) <= 0.01) {
                                    b_b += 0.2;
                                }
                                if (float(msb8) >= donor_replacementGLF_dead18limit) {
                                    ;
                                }
                                msb8++;
                            }
                        }
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = (reflect(vec4(1.9, 622.244, 0.5, 5.8), vec4(464.042, 9.5, 1.1, -4.9)) * vec4(293.060, 853.959, 26.76, -4573.6062));
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                }
            } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))));
            if (_GLF_DEAD(false)) {
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = mat3x4(-180.109, 60.52, -64.71, -4.4, -565.246, 71.59, 406.765, -9.8, 1.6, 106.903, -6.1, 8.7)[2];
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(true, !(!(true))))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                _GLF_color = (_GLF_outVarBackup_GLF_color + 0.7);
            }
        }
        {
            vec2 GLF_live14coord = _GLF_FUZZED(vec2(-0.6, 7.1));
            float GLF_live14h = _GLF_FUZZED(float(7626u));
            int GLF_live14i = _GLF_FUZZED((~97477));
            float GLF_live14refh = _GLF_FUZZED(((137646u < 66829u) ? 8633.6447 : float(181617u)));
            float GLF_live14slope = _GLF_FUZZED((((-0.5) + (-8.5)) + 4.4));
            vec2 GLF_live14uvstep = _GLF_FUZZED(vec2(770.348, -99.59));
            {
                int GLF_live14looplimiter0 = 0;
                while (GLF_live14h < GLF_live14refh && GLF_live14i < 32) {
                    if (GLF_live14looplimiter0 >= 3) {
                        break;
                    }
                    GLF_live14looplimiter0++;
                    {
                        GLF_live14coord -= GLF_live14uvstep;
                        GLF_live14refh += GLF_live14slope;
                        GLF_live14h = texture(GLF_live14tex, GLF_live14coord).y;
                        GLF_live14i++;
                    }
                }
            }
        }
    }
    {
        float GLF_live11grey = _GLF_FUZZED(-9.1);
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            _GLF_color = dFdyFine(vec4(-254.080, 51.89, -11.14, -5.9));
        }
        {
            GLF_live11grey = 0.5 + float(GLF_live11data[5]) / 10.0;
            if (_GLF_DEAD(false)) {
                _GLF_color = log(GLF_dead2gl_FragCoord);
            }
        }
    }
    return vec3(h_r, s_g, b_b);
}

vec3 defaultColor() {
    return vec3(float(bitfieldExtract(int(resolution.y), 0, 0)));
}

vec3 drawShape(vec2 pos, vec2 square, vec3 setting) {
    int msb8 = 256;
    {
        vec4 _GLF_outVarBackup_GLF_color;
        {
            {
                ;
            }
        }
        _GLF_outVarBackup_GLF_color = _GLF_color;
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            while (s_g < h_r && GLF_dead13MATRIX_N < 32) {
                square -= pos;
                h_r += h_r;
                s_g = texture(GLF_dead20tex, square).y;
                GLF_dead13MATRIX_N++;
            }
        }
        _GLF_color = sqrt(vec4(50.44, 2.6, 8695.4774, 5.4));
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
    }
    if (_GLF_DEAD(false)) {
        ivec2 donor_replacementGLF_dead19p = _GLF_FUZZED((ivec2(-12309, -53619) << (ivec2(-84965, 87915) & GLF_live11N)));
        {
            donor_replacementGLF_dead19p.x = -donor_replacementGLF_dead19p.x;
        }
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
        if (_GLF_DEAD(false)) {
            _GLF_color = (GLF_live6m34 * setting);
        }
        if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
        } else {
            return vec3(1.0, 1.0, 1.0);
        }
    }
    bool c1 = pos.x - setting.x < square.x;
    if (!c1) {
        return defaultColor();
    }
    _GLF_struct_4 _GLF_struct_replacement_4 = _GLF_struct_4(1, _GLF_struct_5(pos.x + setting.x > square.x, ivec4(1, 1, 1, 1), mat4x2(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0)), mat4x3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), _GLF_struct_6(mat2(1.0, 1.0, 1.0, 1.0), _GLF_struct_7(vec2(1.0, 1.0), bvec4(true, true, true, true), vec3(1.0, 1.0, 1.0), true, mat2(1.0, 1.0, 1.0, 1.0))), mat4x3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0));
    do {
        if (!_GLF_struct_replacement_4._f1.c2) {
            if (_GLF_DEAD(false)) {
                {
                    h_r = -h_r;
                }
                {
                    {
                        ;
                    }
                    if (_GLF_DEAD(false)) {
                        while (h_r < h_r && msb8 < 32) {
                            square -= square;
                            h_r += b_b;
                            h_r = texture(GLF_dead20tex, square).y;
                            msb8++;
                        }
                    }
                }
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                _GLF_color = mat4(2.1, 850.957, 2.3, 72.67, -3.7, 6.7, -6.2, -94.33, 8.1, 848.255, -9.8, 61.29, -4.7, -6.8, 415.510, -8.4)[0];
            }
            return defaultColor();
        }
    } while (_GLF_WRAPPED_LOOP(false));
    {
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        _GLF_color = vec4(-3.8, -649.982, 51.03, 34.59);
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
    }
    if (_GLF_DEAD(false)) {
        {
            float GLF_dead21stripe = GLF_dead21compute_stripe(tan((square.x + square.y) * 20.0));
            setting = mix(vec3(square.x, .8, 0), vec3(1, square.y, 0), GLF_dead21stripe);
            GLF_dead21_GLF_color = vec4(setting, 1.0);
            ;
        }
    }
    bool c3 = pos.y - setting.x < square.y;
    if (!c3) {
        {
            _GLF_struct_26 _GLF_struct_replacement_26 = _GLF_struct_26(mat2(1.0, 1.0, 1.0, 1.0), _GLF_FUZZED((-(-6939.1333))), mat2(1.0, 1.0, 1.0, 1.0), _GLF_struct_27(mat4x2(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), vec3(1.0, 1.0, 1.0), uvec3(1u, 1u, 1u), mat3x2(1.0, 1.0, 1.0, 1.0, 1.0, 1.0)));
            if (_GLF_struct_replacement_26.GLF_live15v < 4.0) {
                ;
            }
        }
        return defaultColor();
    }
    bool c4 = pos.y + setting.x > square.y;
    do {
        if (!c4) {
            if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                if (_GLF_DEAD(false)) {
                    if (_GLF_DEAD(false)) {
                        {
                            pos -= pos;
                            b_b += b_b;
                            h_r = texture(GLF_dead20tex, pos).y;
                            GLF_dead13MATRIX_N++;
                        }
                    }
                    if (square.y > square.x) {
                        s_g = square.x / square.y;
                    } else {
                        s_g = square.y / square.x;
                    }
                    if (_GLF_DEAD(false)) {
                        {
                            h_r += 0.2;
                        }
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        break;
                    }
                }
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(-1358.1609, -2495.5009, -61.17, -39.23);
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
            } else {
                return defaultColor();
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_ZERO(0.0, injectionSwitch.x))))) {
                    for (int GLF_dead13i = (GLF_dead13MATRIX_N - 1); GLF_dead13i >= 0; GLF_dead13i--) {
                        for (int GLF_dead13j = (GLF_dead13MATRIX_N - 1); GLF_dead13j >= (GLF_dead13i + 1); GLF_dead13j--) {
                            _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13i, 4)] -= (GLF_live6m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13i, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13j, 4)] * _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13j, 4)]);
                        }
                        _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13i, 4)] /= GLF_live6m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13i, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13i, 4)];
                    }
                }
            }
            if (_GLF_DEAD(false)) {
                continue;
            }
            if (_GLF_DEAD(false)) {
                _GLF_color = GLF_dead2gl_FragCoord;
            }
            if (_GLF_DEAD(false)) {
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = roundEven(vec4(-798.027, 30.13, 6.1, -0.7));
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                _GLF_struct_8 _GLF_struct_replacement_8 = _GLF_struct_8(_GLF_FUZZED(-1.5), _GLF_struct_9(vec3(1.0, 1.0, 1.0), bvec2(true, true), mat3x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0)));
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(-2370.0965, 77.00, 783.904, 8.0);
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                for (int GLF_dead3k = 0; GLF_dead3k < 1000; GLF_dead3k++) {
                    if (h_r * h_r + h_r * h_r > 4.0) {
                        break;
                    }
                    float GLF_dead3x_new = h_r * h_r - h_r * h_r + s_g;
                    h_r = 2.0 * h_r * h_r + _GLF_struct_replacement_8.donor_replacementGLF_dead3c_im;
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        while (GLF_dead3k > 1) {
                            if ((GLF_dead3k & 1) == 1) {
                                GLF_dead3k = 3 * GLF_dead3k + 1;
                            } else {
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                    if (!c4 && !c4 && c3) {
                                        float GLF_dead21stripe = GLF_dead21compute_stripe(cos((square.x + square.y) * 20.0));
                                        setting = mix(vec3(.7, sinh(square.x), square.x), vec3(.3, .5, square.x), GLF_dead21stripe);
                                        GLF_dead21_GLF_color = vec4(setting, 1.0);
                                        ;
                                    }
                                }
                                GLF_dead3k /= 2;
                                if (_GLF_DEAD(false)) {
                                    ivec2 donor_replacementGLF_dead19p = _GLF_FUZZED((clamp(GLF_live11N, GLF_dead13MATRIX_N, (c3 ? (-14771) : GLF_live11N)) ^ ivec2(68569, 52761)));
                                    while (donor_replacementGLF_dead19p.x > 15) {
                                        donor_replacementGLF_dead19p.x -= 16;
                                    }
                                }
                            }
                            GLF_dead3k++;
                        }
                        if (_GLF_DEAD(false)) {
                            {
                                float GLF_dead21stripe = GLF_dead21compute_stripe(cos((pos.x + pos.y) * 20.0));
                                setting = mix(vec3(.7, sinh(pos.x), pos.x), vec3(.3, .5, pos.x), GLF_dead21stripe);
                                GLF_dead21_GLF_color = vec4(setting, 1.0);
                                ;
                            }
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < _GLF_ZERO(0.0, injectionSwitch.x))))) {
                            _GLF_color = fwidthCoarse(mat3x4(-5.4, -291.118, -6.5, -3.6, 3.9, 5.4, -6.7, 9.4, -76.68, -4538.4520, 597.844, 8.3)[0]);
                        }
                    }
                    h_r = GLF_dead3x_new;
                    {
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            {
                                if ((msb8 & 1) == 1) {
                                    msb8 = 3 * msb8 + 1;
                                } else {
                                    {
                                        vec2 GLF_live14coord = _GLF_FUZZED(vec2(-299.384, -97.60));
                                        float GLF_live14h = _GLF_FUZZED(79.94);
                                        int GLF_live14i = _GLF_FUZZED((false ? (83763 ^ ((-4181) - 85393)) : ivec2(-92534, -57841).x));
                                        float GLF_live14refh = _GLF_FUZZED((-1126.4679));
                                        float GLF_live14slope = _GLF_FUZZED(-25.62);
                                        vec2 GLF_live14uvstep = _GLF_FUZZED(vec2(367.314, -90.12).rr);
                                        {
                                            int GLF_live14looplimiter0 = 0;
                                            if (_GLF_DEAD(false)) {
                                                ivec2 donor_replacementGLF_dead19p = _GLF_FUZZED((GLF_live11N * ivec2(-33618, 61515)));
                                                if (donor_replacementGLF_dead19p.x < 0) {
                                                    donor_replacementGLF_dead19p.y++;
                                                }
                                            }
                                            while (GLF_live14h < GLF_live14refh && GLF_live14i < 32) {
                                                if (GLF_live14looplimiter0 >= 3) {
                                                    break;
                                                }
                                                if (_GLF_DEAD(false)) {
                                                    float donor_replacementGLF_dead18ref = _GLF_FUZZED(degrees(GLF_live14slope));
                                                    if (mod(float(GLF_live14i), donor_replacementGLF_dead18ref) <= 0.01) {
                                                        h_r += 0.2;
                                                    }
                                                }
                                                GLF_live14looplimiter0++;
                                                {
                                                    GLF_live14coord -= GLF_live14uvstep;
                                                    GLF_live14refh += GLF_live14slope;
                                                    GLF_live14h = texture(GLF_live14tex, GLF_live14coord).y;
                                                    GLF_live14i++;
                                                }
                                            }
                                        }
                                    }
                                    msb8 /= 2;
                                }
                                GLF_dead3k++;
                            }
                        }
                        int GLF_live11looplimiter0 = 0;
                        if (GLF_live11looplimiter0 >= 6) {
                            ;
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                {
                                    GLF_dead2gl_FragCoord[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead3k, 4)] = GLF_dead2gl_FragCoord[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead3k, 4)] * GLF_dead2gl_FragCoord[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead3k, 4)];
                                }
                            }
                        }
                    }
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(-8.3, -3737.4476, 2.5, -1480.2913);
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                {
                                    pos -= square;
                                    GLF_dead3x_new += s_g;
                                    h_r = texture(GLF_dead20tex, pos).y;
                                    GLF_dead3k++;
                                }
                            }
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                        if (_GLF_DEAD(false)) {
                            if (c4) {
                                float GLF_dead21stripe = GLF_dead21compute_stripe(cos((square.x + square.y) * 20.0));
                                setting = mix(vec3(square.x, 0, 0.75), vec3(.8, .7, square.x), GLF_dead21stripe);
                                GLF_dead21_GLF_color = vec4(setting, 1.0);
                                ;
                            }
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        ivec2 donor_replacementGLF_dead19p = _GLF_FUZZED(ivec2(43101, -1021));
                        {
                            donor_replacementGLF_dead19p.x -= 16;
                        }
                    }
                    msb8++;
                    if (_GLF_DEAD(false)) {
                        float donor_replacementGLF_dead20slope = _GLF_FUZZED(773.926);
                        {
                            square -= pos;
                            h_r += donor_replacementGLF_dead20slope;
                            b_b = texture(GLF_dead20tex, square).y;
                            GLF_dead13MATRIX_N++;
                        }
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < length(vec2(0.0, 0.0)))))) {
                        _GLF_color = cosh(vec4(-4.0, 604.258, -6709.1317, 3924.6046));
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        int donor_replacementGLF_dead15v = _GLF_FUZZED((+msb8));
                        if (_GLF_DEAD(false)) {
                            ivec2 donor_replacementGLF_dead19p = _GLF_FUZZED((ivec2(-62296, -59015) | ivec2(53613, 1009)));
                            {
                                donor_replacementGLF_dead19p.y++;
                            }
                        }
                        {
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                ivec2 donor_replacementGLF_dead19p = _GLF_FUZZED(ivec2(28305, 46010));
                                if (donor_replacementGLF_dead19p.x < 0) {
                                    donor_replacementGLF_dead19p.x = -donor_replacementGLF_dead19p.x;
                                }
                            }
                            if ((donor_replacementGLF_dead15v & 1) == 1) {
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    _GLF_color = vec4(584.099, -7.2, -872.519, -9632.1671);
                                }
                                donor_replacementGLF_dead15v = 3 * donor_replacementGLF_dead15v + 1;
                            } else {
                                {
                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                        {
                                            pos -= pos;
                                            s_g += s_g;
                                            s_g = texture(GLF_dead20tex, pos).y;
                                            donor_replacementGLF_dead15v++;
                                        }
                                    }
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    if (_GLF_DEAD(false)) {
                                        float donor_replacementGLF_dead20h = _GLF_FUZZED(GLF_live6one);
                                        while (donor_replacementGLF_dead20h < b_b && donor_replacementGLF_dead15v < 32) {
                                            square -= pos;
                                            b_b += h_r;
                                            donor_replacementGLF_dead20h = texture(GLF_dead20tex, square).y;
                                            donor_replacementGLF_dead15v++;
                                        }
                                    }
                                    _GLF_color = dFdxCoarse(vec4(8.4, 12.31, -9.1, 4912.0145));
                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                                donor_replacementGLF_dead15v /= 2;
                            }
                            GLF_dead3k++;
                        }
                    }
                    {
                        _GLF_struct_28 _GLF_struct_replacement_28 = _GLF_struct_28(_GLF_FUZZED((+26400)), _GLF_struct_29(mat4x3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), ivec3(1, 1, 1), vec4(1.0, 1.0, 1.0, 1.0), true));
                        int GLF_live17iters = _GLF_FUZZED((88432 * (-77405)));
                        int GLF_live17v = _GLF_FUZZED(44007);
                        {
                            int GLF_live17looplimiter0 = 0;
                            for (_GLF_struct_replacement_28.GLF_live17i = 0; _GLF_struct_replacement_28.GLF_live17i < GLF_live17iters; _GLF_struct_replacement_28.GLF_live17i++) {
                                if (GLF_live17looplimiter0 >= 3) {
                                    break;
                                }
                                GLF_live17looplimiter0++;
                                if (_GLF_DEAD(false)) {
                                    {
                                        float GLF_dead21stripe = GLF_dead21compute_stripe(cos((square.x + square.y) * 20.0));
                                        setting = mix(vec3(square.x, 0, 0.75), vec3(.8, .7, square.x), GLF_dead21stripe);
                                        GLF_dead21_GLF_color = vec4(setting, 1.0);
                                        ;
                                    }
                                }
                                {
                                    if (_GLF_DEAD(false)) {
                                        {
                                            if (_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17v, 4)] >= 1.0) {
                                                _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17v, 4)] = _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17v, 4)] * _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17v, 4)];
                                            }
                                            GLF_live17v++;
                                        }
                                    }
                                    GLF_live17v = (4 * GLF_live17v * (1000 - GLF_live17v)) / 1000;
                                }
                            }
                        }
                    }
                }
                {
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        if (c1) {
                            float GLF_dead21stripe = GLF_dead21compute_stripe(cos((square.x + square.y) * 20.0));
                            setting = mix(vec3(square.x, 0, 0.75), vec3(.8, .7, square.x), GLF_dead21stripe);
                            GLF_dead21_GLF_color = vec4(setting, 1.0);
                            ;
                        }
                    }
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(2.8, 3.6, -2.0, 207.769);
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
            }
        }
    } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
    if (_GLF_DEAD(false)) {
        _GLF_color = cos(_GLF_color);
    }
    bool c5 = pos.x - (setting.x - setting.y) < square.x;
    if (!c5) {
        return computeColor(setting.z / (5.0 * float(findMSB(msb8))), pos);
        if (_GLF_DEAD(false)) {
            _GLF_color = (GLF_dead2gl_FragCoord - GLF_live6one);
        }
    }
    _GLF_struct_0 _GLF_struct_replacement_0 = _GLF_struct_0(vec3(1.0, 1.0, 1.0), bvec2(true, true), _GLF_struct_1(_GLF_struct_2(ivec4(1, 1, 1, 1), mat2x3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0)), mat2x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), ivec3(1, 1, 1), uvec2(1u, 1u), vec2(1.0, 1.0), mat4x3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), mat4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0)), pos.x + (setting.x - setting.y) > square.x, vec4(1.0, 1.0, 1.0, 1.0));
    if (!_GLF_struct_replacement_0.c6) {
        return computeColor(setting.z / (5.0 * float(findMSB(msb8))), pos);
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
        {
            if ((msb8 & 1) == 1) {
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    if (_GLF_DEAD(_GLF_IDENTITY(false, !(!(false))))) {
                        {
                            float GLF_dead21stripe = GLF_dead21compute_stripe(cos((square.x + square.y) * 20.0));
                            setting = mix(vec3(.7, sinh(square.x), square.x), vec3(.3, .5, square.x), GLF_dead21stripe);
                            GLF_dead21_GLF_color = vec4(setting, 1.0);
                            ;
                        }
                    }
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = acos(vec4(2882.3397, 1.2, 3.2, -6.4));
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                msb8 = 3 * msb8 + 1;
                if (_GLF_DEAD(false)) {
                    _GLF_color = vec4(-4.9, 894.502, 5.4, -498.786);
                }
            } else {
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    _GLF_color = fract((vec4(-5.9, 777.289, -402.468, 682.671) - GLF_dead2gl_FragCoord));
                }
                msb8 /= 2;
                if (_GLF_DEAD(false)) {
                    if (_GLF_DEAD(false)) {
                        ivec2 donor_replacementGLF_dead19p = _GLF_FUZZED(findMSB(ivec2(68929, 78010)));
                        if (donor_replacementGLF_dead19p.x > 0) {
                            donor_replacementGLF_dead19p.y--;
                        }
                    }
                    _GLF_color = _GLF_color;
                }
            }
            msb8++;
        }
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
        {
            s_g += 0.2;
        }
    }
    {
        if (_GLF_DEAD(false)) {
            vec2 donor_replacementGLF_dead20coord = _GLF_FUZZED(square);
            int donor_replacementGLF_dead20i = _GLF_FUZZED(findLSB(msb8));
            while (h_r < s_g && donor_replacementGLF_dead20i < 32) {
                donor_replacementGLF_dead20coord -= square;
                s_g += h_r;
                h_r = texture(GLF_dead20tex, donor_replacementGLF_dead20coord).y;
                donor_replacementGLF_dead20i++;
            }
        }
        if (_GLF_DEAD(false)) {
            _GLF_struct_30 _GLF_struct_replacement_30 = _GLF_struct_30(ivec4(1, 1, 1, 1), 1, _GLF_struct_31(vec4(1.0, 1.0, 1.0, 1.0), mat2x3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0), uvec2(1u, 1u), _GLF_struct_32(1, true, bvec4(true, true, true, true)), _GLF_FUZZED(_GLF_color), uvec3(1u, 1u, 1u)), uvec3(1u, 1u, 1u), _GLF_struct_33(mat2(1.0, 1.0, 1.0, 1.0), _GLF_struct_34(mat4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), bvec3(true, true, true), vec2(1.0, 1.0), bvec3(true, true, true), uvec4(1u, 1u, 1u, 1u), mat4x2(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0)), 1.0, uvec3(1u, 1u, 1u)));
            if (_GLF_DEAD(false)) {
                _GLF_color = (_GLF_struct_replacement_30._f2.donor_replacementGLF_dead13matrix_u);
            }
            for (int GLF_dead13b = GLF_dead13MATRIX_N - 1; GLF_dead13b >= msb8; GLF_dead13b--) {
                h_r += _GLF_struct_replacement_30._f2.donor_replacementGLF_dead13matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13b, 4)] * _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13b, 4)];
            }
        }
        float GLF_live11grey = _GLF_FUZZED(-184.387);
        {
            {
                vec4 _GLF_outVarBackup_GLF_color;
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    float donor_replacementGLF_dead20h = _GLF_FUZZED(sqrt(time));
                    while (donor_replacementGLF_dead20h < b_b && GLF_dead13MATRIX_N < 32) {
                        square -= square;
                        b_b += h_r;
                        donor_replacementGLF_dead20h = texture(GLF_dead20tex, square).y;
                        GLF_dead13MATRIX_N++;
                    }
                }
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(-45.00, 4698.5496, -979.086, -50.69);
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < _GLF_ZERO(0.0, injectionSwitch.x))))) {
                if (_GLF_DEAD(false)) {
                    {
                        ;
                    }
                }
                {
                    int GLF_live15baseIndex = _GLF_FUZZED(((-14241) | ((-6292) & (80622 ^ (-20154)))));
                    int GLF_live15data = _GLF_FUZZED(-55740);
                    int GLF_live15treeIndex = _GLF_FUZZED(78706);
                    if (GLF_live15data <= GLF_live15tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15baseIndex, 10)].data) {
                        if (GLF_live15tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15baseIndex, 10)].leftIndex == -1) {
                            GLF_live15tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15baseIndex, 10)].leftIndex = GLF_live15treeIndex;
                            GLF_live15makeTreeNode(GLF_live15tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15treeIndex, 10)], GLF_live15data);
                            ;
                        } else {
                            GLF_live15baseIndex = GLF_live15tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15baseIndex, 10)].leftIndex;
                            ;
                        }
                        if (_GLF_DEAD(false)) {
                            {
                                float GLF_dead21stripe = GLF_dead21compute_stripe(cos((pos.x + pos.y) * 20.0));
                                setting = mix(vec3(.7, sinh(pos.x), pos.x), vec3(.3, .5, pos.x), GLF_dead21stripe);
                                GLF_dead21_GLF_color = vec4(setting, 1.0);
                                ;
                            }
                        }
                    } else {
                        if (GLF_live15tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15baseIndex, 10)].rightIndex == -1) {
                            GLF_live15tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15baseIndex, 10)].rightIndex = GLF_live15treeIndex;
                            GLF_live15makeTreeNode(GLF_live15tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15treeIndex, 10)], GLF_live15data);
                            ;
                        } else {
                            GLF_live15baseIndex = GLF_live15tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15baseIndex, 10)].rightIndex;
                            ;
                            if (_GLF_DEAD(false)) {
                                while (GLF_live11grey < h_r && GLF_live15data < 32) {
                                    pos -= square;
                                    h_r += GLF_live11grey;
                                    GLF_live11grey = texture(GLF_dead20tex, pos).y;
                                    GLF_live15data++;
                                }
                            }
                        }
                    }
                }
                {
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        {
                            square -= pos;
                            h_r += s_g;
                            s_g = texture(GLF_dead20tex, square).y;
                            msb8++;
                        }
                    }
                    ;
                }
            }
            if (_GLF_DEAD(false)) {
                do {
                    if (_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(msb8, 4)] >= 1.0) {
                        _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(msb8, 4)] = _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(msb8, 4)] * _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(msb8, 4)];
                    }
                    msb8++;
                } while (msb8 < findMSB(findLSB(GLF_dead13MATRIX_N)));
            }
            GLF_live11grey = 0.5 + float(GLF_live11data[1]) / 10.0;
        }
    }
    if (_GLF_DEAD(false)) {
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = dFdyFine(vec4(10.25, -1249.6856, -7.4, 95.34));
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
        _GLF_color = _GLF_color;
    }
    _GLF_struct_3 _GLF_struct_replacement_3 = _GLF_struct_3(mat3x2(1.0, 1.0, 1.0, 1.0, 1.0, 1.0), mat2(1.0, 1.0, 1.0, 1.0), pos.y - (setting.x - setting.y) < square.y);
    if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
    } else {
        do {
            if (!_GLF_struct_replacement_3.c7) {
                return computeColor(setting.z / (5.0 * float(findMSB(msb8))), pos);
            }
        } while (_GLF_WRAPPED_LOOP(false));
    }
    bool c8 = pos.y + (setting.x - setting.y) > square.y;
    if (!c8) {
        if (_GLF_DEAD(false)) {
            if (_GLF_DEAD(false)) {
                _GLF_color = (vec4(5072.5261, 4.5, -4.9, -1.4) + _GLF_color);
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    float donor_replacementGLF_dead18s = _GLF_FUZZED(fract(square)[1]);
                    if (float(msb8) >= b_b) {
                        ;
                    }
                }
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                if (square.y < square.x) {
                    b_b = 0.5 - b_b;
                    if (_GLF_DEAD(_GLF_IDENTITY(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)), false || (_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))))) {
                        if (!c5 && !c4 && !c3 && c3) {
                            float GLF_dead21stripe = GLF_dead21compute_stripe(tan((pos.x + pos.y) * 20.0));
                            setting = mix(vec3(pos.x, .8, 0), vec3(1, pos.y, 0), GLF_dead21stripe);
                            GLF_dead21_GLF_color = vec4(setting, 1.0);
                            ;
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        _GLF_color = _GLF_color;
                    }
                }
            }
            {
                return GLF_dead3pickColor(msb8);
                if (_GLF_DEAD(false)) {
                    {
                        ;
                    }
                }
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < _GLF_ZERO(0.0, injectionSwitch.x))))) {
                _GLF_color = _GLF_color;
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                {
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = ((+vec4(-9577.3723, -7.0, 727.970, 1.8)));
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < sin(0.0))))) {
                                if (c8) {
                                    float GLF_dead21stripe = GLF_dead21compute_stripe(cos((square.x + square.y) * 20.0));
                                    setting = mix(vec3(square.x, 0, 0.75), vec3(.8, .7, square.x), GLF_dead21stripe);
                                    GLF_dead21_GLF_color = vec4(setting, 1.0);
                                    ;
                                }
                            }
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    msb8 = 3 * msb8 + 1;
                }
            }
        }
        return computeColor(setting.z / (5.0 * float(findMSB(msb8))), pos);
    }
    {
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        _GLF_color = vec4(185.051, -898.694, -6421.9768, -5734.0521);
        if (_GLF_DEAD(_GLF_IDENTITY(false, !(!(false))))) {
            _GLF_color = mod(_GLF_color, b_b);
        }
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                _GLF_color = _GLF_color;
            }
            if (_GLF_WRAPPED_IF_FALSE(false)) {
            } else {
                {
                    {
                        ;
                    }
                    if (_GLF_DEAD(_GLF_IDENTITY(false, false || (false)))) {
                        ivec2 donor_replacementGLF_dead19p = _GLF_FUZZED(ivec2(-12245, -44438));
                        while (donor_replacementGLF_dead19p.x > 15) {
                            donor_replacementGLF_dead19p.x -= 16;
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        _GLF_color = dFdxCoarse(vec4(-6.6, -497.859, -30.82, 548.234));
                    }
                }
                _GLF_color = _GLF_outVarBackup_GLF_color;
                if (_GLF_DEAD(false)) {
                    _GLF_color = _GLF_color;
                }
            }
        }
    }
    if (_GLF_DEAD(false)) {
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
            if (_GLF_DEAD(false)) {
                ivec2 donor_replacementGLF_dead19p = _GLF_FUZZED(min(ivec2(-16926, 62982), ivec2(-24134, -35251)));
                if (donor_replacementGLF_dead19p.x < 0) {
                    donor_replacementGLF_dead19p.x = -donor_replacementGLF_dead19p.x;
                }
            }
            {
                h_r = 0.5 - h_r;
                {
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        float donor_replacementGLF_dead20slope = _GLF_FUZZED(514.968);
                        while (s_g < b_b && GLF_dead13MATRIX_N < 32) {
                            pos -= pos;
                            b_b += donor_replacementGLF_dead20slope;
                            s_g = texture(GLF_dead20tex, pos).y;
                            GLF_dead13MATRIX_N++;
                        }
                    }
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = (((-916.538) + 204.907) + fwidthFine(vec4(-8.5, -36.70, 2.8, 7029.1449)));
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    _GLF_color = GLF_dead2gl_FragCoord;
                }
            }
        }
        if (msb8 < int(GLF_dead2gl_FragCoord.x)) {
            ;
            {
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < log(abs(1.0)))))) {
                    while (b_b < b_b && GLF_dead13MATRIX_N < 32) {
                        square -= pos;
                        b_b += s_g;
                        b_b = texture(GLF_dead20tex, square).y;
                        GLF_dead13MATRIX_N++;
                    }
                }
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(3.9, 995.862, -3.0, 9806.5594);
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                    if (_GLF_DEAD(false)) {
                        while (b_b < s_g && GLF_dead13MATRIX_N < 32) {
                            square -= pos;
                            s_g += s_g;
                            b_b = texture(GLF_dead20tex, square).y;
                            GLF_dead13MATRIX_N++;
                        }
                    }
                }
            }
        }
        {
            int GLF_live5looplimiter0 = 0;
            if (GLF_live5looplimiter0 >= 5) {
                ;
                {
                    _GLF_struct_35 _GLF_struct_replacement_35 = _GLF_struct_35(vec3(1.0, 1.0, 1.0), vec4(1.0, 1.0, 1.0, 1.0));
                    {
                        if (_GLF_DEAD(false)) {
                            while (s_g < b_b && msb8 < 32) {
                                square -= square;
                                b_b += s_g;
                                s_g = texture(GLF_dead20tex, square).y;
                                msb8++;
                            }
                        }
                        {
                            ;
                        }
                    }
                    _GLF_struct_replacement_35._GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(-7600.6650, -550.653, -81.55, -5672.5280);
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_struct_replacement_35._GLF_outVarBackup_GLF_color;
                    }
                }
                if (_GLF_DEAD(false)) {
                    {
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < tan(0.0))))) {
                            {
                                vec3 GLF_live16c = _GLF_FUZZED(vec3(6.7));
                                int GLF_live16i = _GLF_FUZZED(-87687);
                                {
                                    GLF_live16c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live16i, 3)] = GLF_live16c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live16i, 3)] * GLF_live16c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live16i, 3)];
                                }
                            }
                            return vec3(1.0, 1.0, 1.0);
                        }
                        {
                            vec3 GLF_live16c = _GLF_FUZZED((vec3(-4871.7786, -9.8, 7.8) - vec3(9325.1885, -7975.9192, 0.0)));
                            int GLF_live16i = _GLF_FUZZED((99645 + ((-70159) - (-3669))));
                            {
                                if (GLF_live16c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live16i, 3)] >= 1.0) {
                                    GLF_live16c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live16i, 3)] = GLF_live16c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live16i, 3)] * GLF_live16c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live16i, 3)];
                                    if (_GLF_DEAD(false)) {
                                        if (!c3 && !c5 && !c5 && c5) {
                                            float GLF_dead21stripe = GLF_dead21compute_stripe(tan((square.x + square.y) * 20.0));
                                            GLF_live16c = mix(vec3(square.x, .8, 0), vec3(1, square.y, 0), GLF_dead21stripe);
                                            GLF_dead21_GLF_color = vec4(GLF_live16c, 1.0);
                                            ;
                                        }
                                    }
                                }
                            }
                        }
                        b_b = square.x / square.y;
                    }
                }
            }
        }
    }
    return defaultColor();
}

vec3 computePoint(mat2 rotationMatrix) {
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < sqrt(0.0))))) {
        return vec3(1.0, 1.0, 1.0);
    }
    int msb8 = 256;
    vec2 aspect;
    {
        vec2 GLF_live8v = _GLF_FUZZED((mat3x2(vec2(1.4, 6.3), vec4(-0.3, -4.3, -0.5, -292.213).rg, vec2(-6762.0393, -3.9)) * vec3(5.6, -3780.4460, 24.87)));
        if (_GLF_DEAD(false)) {
            ivec2 donor_replacementGLF_dead19p = _GLF_FUZZED((ivec2(96120, -48698) % ivec2(-43055, 70024)));
            while (donor_replacementGLF_dead19p.x > 15) {
                donor_replacementGLF_dead19p.x -= 16;
            }
        }
        if (_GLF_DEAD(false)) {
            if (_GLF_DEAD(false)) {
                {
                    vec3 GLF_live16c = _GLF_FUZZED(vec3(599.410, 786.975, 5.3));
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        do {
                            if (_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13MATRIX_N, 4)] >= 1.0) {
                                _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13MATRIX_N, 4)] = _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13MATRIX_N, 4)] * _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13MATRIX_N, 4)];
                            }
                            GLF_dead13MATRIX_N++;
                        } while (GLF_dead13MATRIX_N < findMSB(findLSB(msb8)));
                    }
                    {
                        int GLF_live16looplimiter1 = 0;
                        for (int GLF_live16i = 0; GLF_live16i < 3; GLF_live16i++) {
                            if (GLF_live16looplimiter1 >= 3) {
                                break;
                            }
                            GLF_live16looplimiter1++;
                            {
                                if (GLF_live16c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live16i, 3)] >= 1.0) {
                                    GLF_live16c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live16i, 3)] = GLF_live16c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live16i, 3)] * GLF_live16c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live16i, 3)];
                                }
                            }
                        }
                    }
                }
                _GLF_color = GLF_dead2gl_FragCoord;
            }
            {
                msb8 = 3 * msb8 + 1;
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < length(vec4(0.0, 0.0, 0.0, 0.0)))))) {
                {
                    ;
                }
            }
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            _GLF_color = atan(_GLF_color, fract(vec4(55.55, 442.812, -4.1, -7.2)));
        }
        if (length(GLF_live8v) < 0.001) {
            ;
        }
        {
            int GLF_live15baseIndex = _GLF_FUZZED(-76321);
            int GLF_live15data = _GLF_FUZZED(((-10594) ^ (73510 & (-22831))));
            int GLF_live15treeIndex = _GLF_FUZZED(66758);
            {
                if (GLF_live15tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15baseIndex, 10)].leftIndex == -1) {
                    GLF_live15tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15baseIndex, 10)].leftIndex = GLF_live15treeIndex;
                    GLF_live15makeTreeNode(GLF_live15tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15treeIndex, 10)], GLF_live15data);
                    ;
                } else {
                    GLF_live15baseIndex = GLF_live15tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15baseIndex, 10)].leftIndex;
                    ;
                }
            }
        }
    }
    aspect = resolution.xy / min(resolution.x, resolution.y);
    vec2 position;
    position = (gl_FragCoord.xy / resolution.xy) * aspect;
    if (_GLF_DEAD(false)) {
        return vec3(1.0, 1.0, 1.0);
    }
    vec2 center;
    {
        if (_GLF_DEAD(false)) {
            _GLF_color = _GLF_color;
        }
        int GLF_live6cols = _GLF_FUZZED(int(false));
        int GLF_live6looplimiter2 = 0;
        uint GLF_live6matrix_number = _GLF_FUZZED(186201u);
        for (int GLF_live6rows = 2; GLF_live6rows <= 4; GLF_live6rows++) {
            if (GLF_live6looplimiter2 >= 4) {
                break;
            }
            {
                int GLF_live16i = _GLF_FUZZED(int(((+171515u) & 100835u)));
                float GLF_live16result = _GLF_FUZZED(float(193437u));
                float GLF_live16thirty_two = _GLF_FUZZED((-37.76));
                if (mod(float(GLF_live16i), round(GLF_live16thirty_two)) <= 0.01) {
                    GLF_live16result += 100.0;
                }
                if (_GLF_DEAD(false)) {
                    float donor_replacementGLF_dead20h = _GLF_FUZZED(atan(GLF_live16thirty_two, GLF_live16thirty_two));
                    {
                        center -= center;
                        h_r += s_g;
                        donor_replacementGLF_dead20h = texture(GLF_dead20tex, center).y;
                        GLF_live16i++;
                    }
                }
            }
            GLF_live6looplimiter2++;
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                return vec3(1.0, 1.0, 1.0);
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < determinant(mat3(0.0, determinant(mat2(1.0, 0.0, 0.0, 1.0)), 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, determinant(mat2(0.0, 0.0, 1.0, 0.0)))))))) {
                int donor_replacementGLF_dead19i = _GLF_FUZZED(GLF_live6cols);
                ivec2 donor_replacementGLF_dead19p = _GLF_FUZZED(clamp(ivec2(84647, 65350), (GLF_live6rows | ivec2(-67879, -56420)), ivec2(-87710, -19182)));
                for (donor_replacementGLF_dead19i = 0; donor_replacementGLF_dead19i < 100; donor_replacementGLF_dead19i++) {
                    donor_replacementGLF_dead19p = GLF_dead19iter(donor_replacementGLF_dead19p);
                }
            }
            {
                {
                    int GLF_live6looplimiter1 = 0;
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        for (int GLF_live6c = 0; GLF_live6c < GLF_live6cols; GLF_live6c++) {
                            if (GLF_live6looplimiter1 >= 4) {
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = (dFdx(_GLF_color) - mod(GLF_dead2gl_FragCoord, b_b));
                                    if (_GLF_DEAD(_GLF_IDENTITY(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)), !(!(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))))))) {
                                        bool donor_replacementGLF_dead21c1 = _GLF_FUZZED(true);
                                        bool donor_replacementGLF_dead21c2 = _GLF_FUZZED(false);
                                        bool donor_replacementGLF_dead21c3 = _GLF_FUZZED((mat2(-63.84, -44.59, 7468.1822, 1930.7211), true));
                                        vec3 donor_replacementGLF_dead21col = _GLF_FUZZED(vec3(-65.98, -92.46, 49.32));
                                        if (!donor_replacementGLF_dead21c1 && !donor_replacementGLF_dead21c2 && donor_replacementGLF_dead21c3) {
                                            float GLF_dead21stripe = GLF_dead21compute_stripe(cos((center.x + center.y) * 20.0));
                                            donor_replacementGLF_dead21col = mix(vec3(.7, sinh(center.x), center.x), vec3(.3, .5, center.x), GLF_dead21stripe);
                                            GLF_dead21_GLF_color = vec4(donor_replacementGLF_dead21col, 1.0);
                                            ;
                                        }
                                    }
                                }
                                break;
                            }
                            for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != (1 ^ 0)); _injected_loop_counter++) {
                                GLF_live6looplimiter1++;
                            }
                            {
                                {
                                    {
                                        _GLF_struct_36 _GLF_struct_replacement_36 = _GLF_struct_36(mat4x3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), vec4(1.0, 1.0, 1.0, 1.0), 1.0);
                                        _GLF_struct_replacement_36._GLF_outVarBackup_GLF_color = _GLF_color;
                                        _GLF_color = pow(vec4(3502.6836, 505.272, -3171.8231, 7826.7788), vec4(713.753, -8.8, 571.774, 3.0));
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            _GLF_color = _GLF_struct_replacement_36._GLF_outVarBackup_GLF_color;
                                        }
                                    }
                                    _GLF_struct_37 _GLF_struct_replacement_37 = _GLF_struct_37(_GLF_struct_38(mat2x3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0), mat3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), _GLF_struct_39(uvec4(1u, 1u, 1u, 1u), mat4x3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0)), ivec3(1, 1, 1), _GLF_struct_40(true, ivec4(1, 1, 1, 1), vec2(1.0, 1.0), 1)), mat4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), mat2(1.0, 1.0, 1.0, 1.0), _GLF_FUZZED((32228 | ((-66361) ^ 46156))));
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                        return vec3(1.0, 1.0, 1.0);
                                        if (_GLF_DEAD(false)) {
                                            {
                                                h_r += 0.2;
                                            }
                                        }
                                    }
                                    int GLF_live11j = _GLF_FUZZED((+((-67898) - 14118)));
                                    int GLF_live11k = _GLF_FUZZED(-40206);
                                    {
                                        if (GLF_live11data[_GLF_MAKE_IN_BOUNDS_INT(_GLF_struct_replacement_37.GLF_live11i, 10)] < GLF_live11data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11j, 10)]) {
                                            GLF_live11temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11k++, 10)] = GLF_live11data[_GLF_MAKE_IN_BOUNDS_INT(_GLF_struct_replacement_37.GLF_live11i++, 10)];
                                        } else {
                                            if (_GLF_DEAD(false)) {
                                                _GLF_color = refract(_GLF_color, _GLF_color, h_r);
                                            }
                                            GLF_live11temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11k++, 10)] = GLF_live11data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11j++, 10)];
                                            if (_GLF_DEAD(_GLF_IDENTITY(false, !(!(_GLF_IDENTITY(false, true && (false))))))) {
                                                {
                                                    if (mod(float(GLF_live6cols), s_g) <= 0.01) {
                                                        b_b += 0.2;
                                                    }
                                                    if (float(GLF_live6cols) >= b_b) {
                                                        ;
                                                    }
                                                    GLF_live6cols++;
                                                }
                                            }
                                            {
                                                vec4 _GLF_outVarBackup_GLF_color;
                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                _GLF_color = vec4(468.393, 2015.9044, 8.2, 54.54);
                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                }
                                                if (_GLF_DEAD(false)) {
                                                    ivec2 donor_replacementGLF_dead19p = _GLF_FUZZED(ivec2(5421, -39893));
                                                    for (GLF_live6c = 0; GLF_live6c < 100; GLF_live6c++) {
                                                        donor_replacementGLF_dead19p = GLF_dead19iter(donor_replacementGLF_dead19p);
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        if (_GLF_DEAD(false)) {
                                            while (GLF_dead13MATRIX_N < bitfieldInsert(800, GLF_dead13MATRIX_N, 0, 0)) {
                                                if (mod(float(GLF_dead13MATRIX_N), s_g) <= 0.01) {
                                                    s_g += 0.2;
                                                }
                                                if (float(GLF_dead13MATRIX_N) >= b_b) {
                                                    ;
                                                }
                                                GLF_dead13MATRIX_N++;
                                            }
                                        }
                                        {
                                            int GLF_live15baseIndex = _GLF_FUZZED(40890);
                                            int GLF_live15data = _GLF_FUZZED(-68264);
                                            _GLF_struct_41 _GLF_struct_replacement_41 = _GLF_struct_41(mat2x3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0), 0, _GLF_struct_42(uvec3(1u, 1u, 1u), mat4x2(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), mat3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), _GLF_struct_43(mat4x2(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), bvec4(true, true, true, true), mat2x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), mat2x3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0), vec3(1.0, 1.0, 1.0)), mat4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), vec4(1.0, 1.0, 1.0, 1.0), _GLF_struct_44(uvec4(1u, 1u, 1u, 1u), mat3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), ivec2(1, 1), mat2(1.0, 1.0, 1.0, 1.0), 1.0, mat4x2(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), mat2x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0))), uvec3(1u, 1u, 1u), 1, bvec4(true, true, true, true), 1);
                                            int GLF_live15treeIndex = _GLF_FUZZED(-98723);
                                            while (GLF_live15baseIndex <= GLF_live15treeIndex) {
                                                if (_GLF_struct_replacement_41.GLF_live15looplimiter0 >= 5) {
                                                    break;
                                                }
                                                _GLF_struct_replacement_41.GLF_live15looplimiter0++;
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
                                        _GLF_color = vec4(1.1, -3.7, 145.563, -7040.7223);
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                vec3 donor_replacementGLF_dead21col = _GLF_FUZZED((log(vec3(-8.2, 946.644, -2.1)) / vec3(313.113, -4.7, -516.913)));
                                                {
                                                    float GLF_dead21stripe = GLF_dead21compute_stripe(cos((position.x + position.y) * 20.0));
                                                    donor_replacementGLF_dead21col = mix(vec3(position.x, 0, 0.75), vec3(.8, .7, position.x), GLF_dead21stripe);
                                                    GLF_dead21_GLF_color = vec4(donor_replacementGLF_dead21col, 1.0);
                                                    ;
                                                }
                                            }
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                    }
                                }
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    int GLF_live6looplimiter0 = 0;
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < sqrt(0.0))))) {
                                        _GLF_color = vec4(589.376, -2.6, -576.005, -4023.5078);
                                    }
                                    for (int GLF_live6r = 0; GLF_live6r < GLF_live6rows; GLF_live6r++) {
                                        if (GLF_live6looplimiter0 >= 4) {
                                            break;
                                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                if (_GLF_DEAD(false)) {
                                                    _GLF_color = _GLF_color;
                                                }
                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                    if (_GLF_DEAD(false)) {
                                                        {
                                                            if (_GLF_DEAD(false)) {
                                                                ivec2 donor_replacementGLF_dead19p = _GLF_FUZZED((GLF_live6looplimiter2 ^ ivec2(-93336, 5879)));
                                                                if (donor_replacementGLF_dead19p.x > 0) {
                                                                    donor_replacementGLF_dead19p.y--;
                                                                }
                                                            }
                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                            _GLF_color = vec4(2.8, -8.7, -1152.7103, 3.5);
                                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                {
                                                                    _GLF_struct_45 _GLF_struct_replacement_45 = _GLF_struct_45(_GLF_struct_46(_GLF_FUZZED(-24681), mat3x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), mat3x2(1.0, 1.0, 1.0, 1.0, 1.0, 1.0), mat2x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), vec4(1.0, 1.0, 1.0, 1.0), uvec3(1u, 1u, 1u), _GLF_struct_47(bvec2(true, true), mat4x2(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), mat3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0))), vec3(1.0, 1.0, 1.0), 1u, uvec4(1u, 1u, 1u, 1u));
                                                                    float GLF_live16limit = _GLF_FUZZED((-(472.424 + vec4(410.692, -83.44, -8.7, -41.12).a)));
                                                                    int GLF_live16looplimiter0 = 0;
                                                                    float GLF_live16result = _GLF_FUZZED(vec2(-99.78, 5438.0473).g);
                                                                    float GLF_live16thirty_two = _GLF_FUZZED(-5042.7310);
                                                                    {
                                                                        if (GLF_live16looplimiter0 >= 3) {
                                                                            ;
                                                                        }
                                                                        GLF_live16looplimiter0++;
                                                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                                            ivec2 donor_replacementGLF_dead19p = _GLF_FUZZED(ivec2(96112, 51808));
                                                                            if (donor_replacementGLF_dead19p.x < 0) {
                                                                                donor_replacementGLF_dead19p.y++;
                                                                            }
                                                                        }
                                                                        {
                                                                            if ((_GLF_struct_replacement_45._f0.GLF_live16i % 32) == 0) {
                                                                                GLF_live16result += 0.4;
                                                                            } else {
                                                                                if (mod(float(_GLF_struct_replacement_45._f0.GLF_live16i), round(GLF_live16thirty_two)) <= 0.01) {
                                                                                    GLF_live16result += 100.0;
                                                                                }
                                                                            }
                                                                            if (float(_GLF_struct_replacement_45._f0.GLF_live16i) >= GLF_live16limit) {
                                                                                ;
                                                                            }
                                                                        }
                                                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                                            {
                                                                                position -= center;
                                                                                GLF_live16limit += GLF_live16thirty_two;
                                                                                GLF_live16result = texture(GLF_dead20tex, position).y;
                                                                                GLF_live6cols++;
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                        {
                                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                                if (_GLF_DEAD(false)) {
                                                                    {
                                                                        center -= center;
                                                                        b_b += h_r;
                                                                        b_b = texture(GLF_dead20tex, center).y;
                                                                        GLF_live6looplimiter1++;
                                                                    }
                                                                }
                                                                return vec3(1.0, 1.0, 1.0);
                                                            }
                                                            b_b = 1.0 - b_b;
                                                        }
                                                    }
                                                    _GLF_color = vec4(-9.7, 3.8, -9589.7196, 8.5);
                                                    {
                                                        {
                                                            ;
                                                        }
                                                    }
                                                } else {
                                                    if (_GLF_DEAD(false)) {
                                                        {
                                                            center -= center;
                                                            s_g += s_g;
                                                            s_g = texture(GLF_dead20tex, center).y;
                                                            GLF_live6looplimiter1++;
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                        GLF_live6looplimiter0++;
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                            _GLF_color = vec4(6.5, -7.4, 4324.0815, 0.9);
                                        }
                                        {
                                            switch (GLF_live6matrix_number) {
                                                case 0u:
                                                    GLF_live6m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live6r, 2)] = GLF_live6one;
                                                    break;
                                                    if (_GLF_DEAD(false)) {
                                                        if (_GLF_DEAD(false)) {
                                                            int donor_replacementGLF_dead20i = _GLF_FUZZED(ivec4(-14090, 22568, 93215, 48619)[0]);
                                                            while (h_r < h_r && donor_replacementGLF_dead20i < 32) {
                                                                aspect -= center;
                                                                h_r += b_b;
                                                                h_r = texture(GLF_dead20tex, aspect).y;
                                                                donor_replacementGLF_dead20i++;
                                                            }
                                                        }
                                                        _GLF_color = vec4(s_g, min(sinh(injectionSwitch), position), dFdyCoarse(GLF_live6one));
                                                    }
                                                    {
                                                        int GLF_live15result = _GLF_FUZZED(71903);
                                                        int GLF_live15sum = _GLF_FUZZED(88428);
                                                        {
                                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                                {
                                                                    GLF_dead2gl_FragCoord[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6c, 4)] = GLF_dead2gl_FragCoord[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6c, 4)] * GLF_dead2gl_FragCoord[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6c, 4)];
                                                                }
                                                            }
                                                            switch (GLF_live15result) {
                                                                case -1:
                                                                    GLF_live15sum += 1;
                                                                    break;
                                                                case 0:
                                                                    ;
                                                            }
                                                        }
                                                    }
                                                case 1u:
                                                    if (_GLF_DEAD(false)) {
                                                        if (float(GLF_live6cols) >= b_b) {
                                                            ;
                                                        }
                                                    }
                                                    GLF_live6m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live6r, 3)] = GLF_live6one;
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                        vec3 donor_replacementGLF_dead21col = _GLF_FUZZED(vec3(1.3, 8.6, 1.8));
                                                        {
                                                            float GLF_dead21stripe = GLF_dead21compute_stripe(cos((center.x + center.y) * 20.0));
                                                            donor_replacementGLF_dead21col = mix(vec3(center.x, 0, 0.75), vec3(.8, .7, center.x), GLF_dead21stripe);
                                                            GLF_dead21_GLF_color = vec4(donor_replacementGLF_dead21col, 1.0);
                                                            ;
                                                        }
                                                    }
                                                    break;
                                                    if (_GLF_DEAD(false)) {
                                                        ivec2 donor_replacementGLF_dead19p = _GLF_FUZZED(ivec2(-80100, 79950));
                                                        {
                                                            donor_replacementGLF_dead19p.x -= 16;
                                                        }
                                                    }
                                                case 2u:
                                                    {
                                                        vec4 _GLF_outVarBackup_GLF_color;
                                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                                        {
                                                            if (_GLF_DEAD(false)) {
                                                                ivec2 donor_replacementGLF_dead19p = _GLF_FUZZED(mix(ivec2(34029, -34037), (ivec2(45547, -31286) | GLF_live6r), bvec2(false, false)));
                                                                {
                                                                    donor_replacementGLF_dead19p.y--;
                                                                }
                                                            }
                                                            int GLF_live16i = _GLF_FUZZED(633);
                                                            float GLF_live16limit = _GLF_FUZZED(-643.717);
                                                            float GLF_live16result = _GLF_FUZZED(float(true));
                                                            if (float(GLF_live16i) >= GLF_live16limit) {
                                                                ;
                                                            }
                                                        }
                                                        _GLF_color = vec4(-8623.1766, 3.1, -328.766, 7.7);
                                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(true, (true) && true))) {
                                                            {
                                                                {
                                                                    ;
                                                                }
                                                            }
                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                            if (_GLF_DEAD(false)) {
                                                                bool donor_replacementGLF_dead21c1 = _GLF_FUZZED(false);
                                                                bool donor_replacementGLF_dead21c2 = _GLF_FUZZED((ivec2(78307, -61239) != (ivec2(-41930, -52427) % GLF_live6cols)));
                                                                bool donor_replacementGLF_dead21c3 = _GLF_FUZZED((GLF_live6m43 != GLF_live6m43));
                                                                bool donor_replacementGLF_dead21c4 = _GLF_FUZZED(true);
                                                                vec3 donor_replacementGLF_dead21col = _GLF_FUZZED(smoothstep(s_g, -832.370, vec3(5.0, -447.924, -2.0)));
                                                                if (!donor_replacementGLF_dead21c1 && !donor_replacementGLF_dead21c2 && !donor_replacementGLF_dead21c3 && donor_replacementGLF_dead21c4) {
                                                                    float GLF_dead21stripe = GLF_dead21compute_stripe(tan((position.x + position.y) * 20.0));
                                                                    donor_replacementGLF_dead21col = mix(vec3(position.x, .8, 0), vec3(1, position.y, 0), GLF_dead21stripe);
                                                                    GLF_dead21_GLF_color = vec4(donor_replacementGLF_dead21col, 1.0);
                                                                    ;
                                                                }
                                                            }
                                                        }
                                                    }
                                                    GLF_live6m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live6r, 4)] = GLF_live6one;
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                        _GLF_color = GLF_dead2gl_FragCoord;
                                                    }
                                                    break;
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                        _GLF_color = intBitsToFloat(ivec4(-19417, 11947, 52918, 27143));
                                                    }
                                                case 3u:
                                                    GLF_live6m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live6r, 2)] = GLF_live6one;
                                                    break;
                                                case 4u:
                                                    GLF_live6m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live6r, 3)] = GLF_live6one;
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                        ivec2 donor_replacementGLF_dead19p = _GLF_FUZZED((mat3x2(20.37, -25.54, 71.20, 5.3, -7509.9956, 50.21), ivec2(84644, -7283)));
                                                        {
                                                            donor_replacementGLF_dead19p.x = -donor_replacementGLF_dead19p.x;
                                                        }
                                                    }
                                                    break;
                                                case 5u:
                                                    if (_GLF_DEAD(false)) {
                                                        continue;
                                                    }
                                                    GLF_live6m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live6r, 4)] = GLF_live6one;
                                                    break;
                                                case 6u:
                                                    GLF_live6m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live6r, 2)] = GLF_live6one;
                                                    break;
                                                    {
                                                        vec4 _GLF_outVarBackup_GLF_color;
                                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                                        _GLF_color = vec4(5.4, -5.8, 41.55, 597.911);
                                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                        }
                                                    }
                                                case 7u:
                                                    if (_GLF_WRAPPED_IF_FALSE(false)) {
                                                    } else {
                                                        GLF_live6m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live6r, 3)] = GLF_live6one;
                                                    }
                                                    break;
                                                    if (_GLF_DEAD(false)) {
                                                        for (int GLF_dead13k = 0; GLF_dead13k < GLF_dead13MATRIX_N - 1; GLF_dead13k++) {
                                                            for (int GLF_dead13x = GLF_dead13MATRIX_N - 1; GLF_dead13x >= GLF_dead13k; GLF_dead13x--) {
                                                                s_g += pow(GLF_live6m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13x, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13k, 4)], 2.0);
                                                                _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13x, 4)] = GLF_live6m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13x, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13k, 4)];
                                                            }
                                                            if (_GLF_DEAD(false)) {
                                                                discard;
                                                                {
                                                                    {
                                                                        ;
                                                                    }
                                                                }
                                                            }
                                                            s_g = sqrt(s_g);
                                                            _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13k, 4)] -= (sign(_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13k, 4)]) * s_g);
                                                            for (int GLF_dead13u = GLF_dead13MATRIX_N - 1; GLF_dead13u >= GLF_dead13k; GLF_dead13u--) {
                                                                {
                                                                    _GLF_struct_48 _GLF_struct_replacement_48 = _GLF_struct_48(_GLF_struct_49(1.0, true, bvec2(true, true), mat4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), mat4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0)), vec4(1.0, 1.0, 1.0, 1.0), bvec2(true, true), uvec2(1u, 1u));
                                                                    _GLF_struct_replacement_48._GLF_outVarBackup_GLF_color = _GLF_color;
                                                                    _GLF_color = vec4(357.994, -147.099, 5.7, 7.3);
                                                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= length(0.0))))) {
                                                                        _GLF_color = _GLF_struct_replacement_48._GLF_outVarBackup_GLF_color;
                                                                    }
                                                                }
                                                                s_g += pow(_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13u, 4)], 2.0);
                                                            }
                                                            b_b = 2.0 / s_g;
                                                            for (int GLF_dead13j = GLF_dead13k; GLF_dead13j < GLF_dead13MATRIX_N; GLF_dead13j++) {
                                                                for (int GLF_dead13a = GLF_dead13MATRIX_N - 1; GLF_dead13a >= GLF_dead13k; GLF_dead13a--) {
                                                                    s_g += _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13a, 4)] * GLF_live6m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13a, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13j, 4)];
                                                                }
                                                                h_r = b_b * s_g;
                                                                for (int GLF_dead13a = GLF_dead13MATRIX_N - 1; GLF_dead13a >= GLF_dead13k; GLF_dead13a--) {
                                                                    GLF_live6m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13a, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13j, 4)] = GLF_live6m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13a, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13j, 4)] - (h_r * _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13a, 4)]);
                                                                }
                                                                s_g = 0.0;
                                                                h_r = 0.0;
                                                            }
                                                            for (int GLF_dead13b = GLF_dead13MATRIX_N - 1; GLF_dead13b >= GLF_dead13k; GLF_dead13b--) {
                                                                {
                                                                    int GLF_live17looplimiter0 = 0;
                                                                    int GLF_live17v = _GLF_FUZZED(-74934);
                                                                    {
                                                                        if (GLF_live17looplimiter0 >= 3) {
                                                                            ;
                                                                        }
                                                                        GLF_live17looplimiter0++;
                                                                        {
                                                                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                                                vec3 donor_replacementGLF_dead21col = _GLF_FUZZED(vec3(2.3, 149.512, -1.0));
                                                                                {
                                                                                    float GLF_dead21stripe = GLF_dead21compute_stripe(cos((center.x + center.y) * 20.0));
                                                                                    donor_replacementGLF_dead21col = mix(vec3(.7, sinh(center.x), center.x), vec3(.3, .5, center.x), GLF_dead21stripe);
                                                                                    GLF_dead21_GLF_color = vec4(donor_replacementGLF_dead21col, 1.0);
                                                                                    ;
                                                                                }
                                                                            }
                                                                            GLF_live17v = (4 * GLF_live17v * (1000 - GLF_live17v)) / 1000;
                                                                        }
                                                                    }
                                                                }
                                                                s_g += _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13b, 4)] * GLF_dead2gl_FragCoord[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13b, 4)];
                                                            }
                                                            h_r = b_b * s_g;
                                                            for (int GLF_dead13b = GLF_dead13MATRIX_N - 1; GLF_dead13b >= GLF_dead13k; GLF_dead13b--) {
                                                                GLF_dead2gl_FragCoord[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13b, 4)] = GLF_dead2gl_FragCoord[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13b, 4)] - (h_r * _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13b, 4)]);
                                                            }
                                                            s_g = 0.0;
                                                            s_g = 0.0;
                                                            b_b = 0.0;
                                                            s_g = 0.0;
                                                            h_r = 0.0;
                                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                                _GLF_color = GLF_dead2gl_FragCoord;
                                                            }
                                                        }
                                                    }
                                                case 8u:
                                                    if (_GLF_DEAD(false)) {
                                                        {
                                                            int GLF_live17v = _GLF_FUZZED((ivec4(-20885, -62704, -26317, -77183).g | 38053));
                                                            {
                                                                GLF_live17v = (4 * GLF_live17v * (1000 - GLF_live17v)) / 1000;
                                                            }
                                                        }
                                                        _GLF_color = GLF_dead2gl_FragCoord;
                                                    }
                                                    {
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                            bool donor_replacementGLF_dead21c1 = _GLF_FUZZED((log2(GLF_live6one) < b_b));
                                                            bool donor_replacementGLF_dead21c2 = _GLF_FUZZED((GLF_live6m43 == GLF_live6m43));
                                                            vec3 donor_replacementGLF_dead21col = _GLF_FUZZED(vec3(-4623.7658, 310.602, -15.00));
                                                            if (!donor_replacementGLF_dead21c1 && donor_replacementGLF_dead21c2) {
                                                                float GLF_dead21stripe = GLF_dead21compute_stripe(tan((aspect.x + aspect.y) * 20.0));
                                                                donor_replacementGLF_dead21col = mix(vec3(0.5, aspect.x, 0.1), vec3(.4, 0, .5), GLF_dead21stripe);
                                                                GLF_dead21_GLF_color = vec4(donor_replacementGLF_dead21col, 1.0);
                                                                ;
                                                            }
                                                        }
                                                        int GLF_live10looplimiter0 = 0;
                                                        if (GLF_live10looplimiter0 >= 6) {
                                                            ;
                                                        }
                                                    }
                                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                                        GLF_live6m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live6r, 4)] = GLF_live6one;
                                                        if (_GLF_DEAD(false)) {
                                                            if (_GLF_DEAD(_GLF_IDENTITY(false, false || (_GLF_IDENTITY(false, (false) && true))))) {
                                                                discard;
                                                            }
                                                            {
                                                                s_g += pow(GLF_dead2gl_FragCoord[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6cols, 4)], 2.0);
                                                            }
                                                        }
                                                    } else {
                                                    }
                                                    if (_GLF_DEAD(false)) {
                                                        {
                                                            b_b = 0.5 - b_b;
                                                            if (_GLF_DEAD(false)) {
                                                                _GLF_color = _GLF_color;
                                                            }
                                                            {
                                                                vec4 _GLF_outVarBackup_GLF_color;
                                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                _GLF_color = fma(vec4(-360.589, -8.7, -857.121, 5.9), vec4(-54.81, -8.6, 2.7, 803.578), vec4(5.7, -1.1, -7.3, 1009.6921));
                                                                if (_GLF_DEAD(_GLF_IDENTITY(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)), !(!(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))))))) {
                                                                    vec3 donor_replacementGLF_dead21col = _GLF_FUZZED(trunc(vec3(31.37, -0.5, 9662.8757)));
                                                                    {
                                                                        float GLF_dead21stripe = GLF_dead21compute_stripe(cos((position.x + position.y) * 20.0));
                                                                        donor_replacementGLF_dead21col = mix(vec3(.7, sinh(position.x), position.x), vec3(.3, .5, position.x), GLF_dead21stripe);
                                                                        GLF_dead21_GLF_color = vec4(donor_replacementGLF_dead21col, 1.0);
                                                                        ;
                                                                    }
                                                                }
                                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                }
                                                                if (_GLF_DEAD(false)) {
                                                                    bool donor_replacementGLF_dead21c1 = _GLF_FUZZED(false);
                                                                    bool donor_replacementGLF_dead21c2 = _GLF_FUZZED(all(bvec4(false, true, false, true)));
                                                                    bool donor_replacementGLF_dead21c3 = _GLF_FUZZED((time <= s_g));
                                                                    vec3 donor_replacementGLF_dead21col = _GLF_FUZZED(vec3(-3870.4447, -379.993, 1.4));
                                                                    if (!donor_replacementGLF_dead21c1 && !donor_replacementGLF_dead21c2 && donor_replacementGLF_dead21c3) {
                                                                        float GLF_dead21stripe = GLF_dead21compute_stripe(cos((center.x + center.y) * 20.0));
                                                                        donor_replacementGLF_dead21col = mix(vec3(.7, sinh(center.x), center.x), vec3(.3, .5, center.x), GLF_dead21stripe);
                                                                        GLF_dead21_GLF_color = vec4(donor_replacementGLF_dead21col, 1.0);
                                                                        ;
                                                                    }
                                                                }
                                                            }
                                                        }
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < log(1.0))))) {
                                                            break;
                                                        }
                                                    }
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                        ivec2 donor_replacementGLF_dead19p = _GLF_FUZZED(ivec2(41066, 10467));
                                                        {
                                                            donor_replacementGLF_dead19p.x = -donor_replacementGLF_dead19p.x;
                                                        }
                                                    }
                                                    if (_GLF_DEAD(false)) {
                                                        for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
                                                            _GLF_color = vec4(9.1, -5628.7503, -561.734, -6.3);
                                                            {
                                                                vec4 _GLF_outVarBackup_GLF_color;
                                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                _GLF_color = vec4(6.7, 2740.4040, 9.2, 1.6);
                                                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                                        vec3 donor_replacementGLF_dead21col = _GLF_FUZZED(mix(sqrt(vec3(-8.8, 7515.1035, 4.6)), (true ? vec3(2005.7035, -8.6, -9.7) : vec3(-3.3, -565.826, 6336.2873)), 79.55));
                                                                        {
                                                                            float GLF_dead21stripe = GLF_dead21compute_stripe(cos((position.x + position.y) * 20.0));
                                                                            donor_replacementGLF_dead21col = mix(vec3(.7, sinh(position.x), position.x), vec3(.3, .5, position.x), GLF_dead21stripe);
                                                                            GLF_dead21_GLF_color = vec4(donor_replacementGLF_dead21col, 1.0);
                                                                            ;
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                                {
                                                                    GLF_live6cols /= 2;
                                                                }
                                                            }
                                                        }
                                                    }
                                                    break;
                                            }
                                            if (_GLF_DEAD(false)) {
                                                if (position.y < position.x) {
                                                    h_r = 0.5 - h_r;
                                                }
                                            }
                                        }
                                    }
                                } else {
                                }
                            }
                            if (_GLF_DEAD(false)) {
                                if (length(position) < 0.001) {
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                        vec2 donor_replacementGLF_dead20uvstep = _GLF_FUZZED(vec2(-390.671, -4.2));
                                        {
                                            aspect -= donor_replacementGLF_dead20uvstep;
                                            h_r += s_g;
                                            h_r = texture(GLF_dead20tex, aspect).y;
                                            msb8++;
                                        }
                                    }
                                    ;
                                }
                            }
                        }
                        if (_GLF_DEAD(_GLF_IDENTITY(false, !(!(false))))) {
                            if (mod(float(GLF_live6cols), b_b) <= 0.01) {
                                b_b += 0.2;
                            }
                        }
                        if (_GLF_DEAD(false)) {
                            {
                                GLF_dead2gl_FragCoord[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6cols, 4)] = GLF_dead2gl_FragCoord[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6cols, 4)] - (b_b * _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6cols, 4)]);
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = GLF_dead2gl_FragCoord;
                                    if (_GLF_DEAD(false)) {
                                        {
                                            _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6looplimiter1, 4)] = _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6looplimiter1, 4)] * _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6looplimiter1, 4)];
                                        }
                                    }
                                }
                            }
                        }
                        if (_GLF_DEAD(false)) {
                            continue;
                        }
                        {
                            if (_GLF_DEAD(_GLF_IDENTITY(false, _GLF_IDENTITY(bool(_GLF_IDENTITY(bool(false), !(!(bool(false))))), true && (bool(_GLF_IDENTITY(bool(false), !(!(bool(false)))))))))) {
                                while (h_r < h_r && GLF_live6looplimiter2 < 32) {
                                    aspect -= center;
                                    h_r += h_r;
                                    h_r = texture(GLF_dead20tex, aspect).y;
                                    GLF_live6looplimiter2++;
                                }
                            }
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = vec4(799.307, -3133.2768, -2275.9840, 915.231);
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                        {
                            _GLF_struct_50 _GLF_struct_replacement_50 = _GLF_struct_50(mat3x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), mat3x2(1.0, 1.0, 1.0, 1.0, 1.0, 1.0), 1, bvec4(true, true, true, true), 1.0, 0, 1);
                            if (_GLF_struct_replacement_50.GLF_live14looplimiter0 >= 3) {
                                ;
                            }
                        }
                    } else {
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = vec4(856.324, -6336.9190, -776.932, 2.9);
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        _GLF_color = GLF_dead2gl_FragCoord;
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        bool donor_replacementGLF_dead21c1 = _GLF_FUZZED(any(bvec3(true, false, false)));
                        bool donor_replacementGLF_dead21c2 = _GLF_FUZZED((uvec2(173615u, 85189u).ttss == uvec4(38610u, 45021u, 37712u, 125165u)));
                        bool donor_replacementGLF_dead21c3 = _GLF_FUZZED(true);
                        vec3 donor_replacementGLF_dead21col = _GLF_FUZZED(vec3(0.0, -5850.1955, -925.218));
                        if (!donor_replacementGLF_dead21c1 && !donor_replacementGLF_dead21c2 && donor_replacementGLF_dead21c3) {
                            float GLF_dead21stripe = GLF_dead21compute_stripe(cos((position.x + position.y) * 20.0));
                            donor_replacementGLF_dead21col = mix(vec3(.7, sinh(position.x), position.x), vec3(.3, .5, position.x), GLF_dead21stripe);
                            GLF_dead21_GLF_color = vec4(donor_replacementGLF_dead21col, 1.0);
                            ;
                        }
                    }
                }
                GLF_live6matrix_number = GLF_live6matrix_number + 1u;
            }
            {
                int GLF_live11high = _GLF_FUZZED(-40021);
                if (_GLF_DEAD(false)) {
                    _GLF_color = GLF_dead2gl_FragCoord;
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    for (int GLF_dead13j = (GLF_dead13MATRIX_N - 1); GLF_dead13j >= (GLF_live11high + 1); GLF_dead13j--) {
                        GLF_dead2gl_FragCoord[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11high, 4)] -= (GLF_live6m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11high, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13j, 4)] * GLF_dead2gl_FragCoord[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13j, 4)]);
                    }
                }
                int GLF_live11i = _GLF_FUZZED((57489 ^ (-8473)));
                int GLF_live11looplimiter3 = 0;
                int GLF_live11m = _GLF_FUZZED(-34611);
                {
                    if (GLF_live11looplimiter3 >= 6) {
                        ;
                    }
                    GLF_live11looplimiter3++;
                    {
                        int GLF_live11from = GLF_live11i;
                        int GLF_live11mid = GLF_live11i + GLF_live11m - 1;
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            if (_GLF_DEAD(false)) {
                                ivec2 donor_replacementGLF_dead19p = _GLF_FUZZED(((ivec4(-51953, 10580, -30531, 97835) != ivec4(ivec3(-89647, 32736, -68381), GLF_live11i)) ? (ivec4(4336, 20470, 73503, 59419).tq % ivec2(-23987, -19222).t) : (ivec2(88121, 7761) << ivec2(52447, -49473))));
                                if (donor_replacementGLF_dead19p.x > 0) {
                                    donor_replacementGLF_dead19p.y--;
                                }
                            }
                            {
                                if (_GLF_DEAD(false)) {
                                    {
                                        ;
                                    }
                                }
                                h_r += _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11i, 4)] * GLF_live6m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11i, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live11high, 4)];
                            }
                        }
                        int GLF_live11to = min(GLF_live11i + 2 * GLF_live11m - 1, GLF_live11high);
                        GLF_live11merge(GLF_live11from, GLF_live11mid, GLF_live11to);
                    }
                }
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                float donor_replacementGLF_dead20refh = _GLF_FUZZED(527.448);
                while (s_g < donor_replacementGLF_dead20refh && GLF_live6looplimiter2 < 32) {
                    aspect -= center;
                    donor_replacementGLF_dead20refh += h_r;
                    s_g = texture(GLF_dead20tex, aspect).y;
                    GLF_live6looplimiter2++;
                }
            }
        }
        if (_GLF_DEAD(false)) {
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = roundEven(vec4(6699.6629, 40.50, 996.541, 3101.2160));
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            return vec3(1.0, 1.0, 1.0);
        }
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
        _GLF_color = mix(vec4(7.8, -35.88, 4.9, 846.054), _GLF_color, _GLF_color);
    }
    center = vec2(0.5) * aspect;
    {
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        _GLF_color = vec4(8923.1077, 11.43, 7.1, -64.81);
        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= length(vec2(0.0, 0.0)))))) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
    }
    position *= rotationMatrix;
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
        while (msb8 > 1) {
            if ((msb8 & 1) == 1) {
                msb8 = 3 * msb8 + 1;
            } else {
                msb8 /= 2;
            }
            msb8++;
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            while (b_b < s_g && GLF_dead13MATRIX_N < 32) {
                position -= center;
                s_g += b_b;
                b_b = texture(GLF_dead20tex, position).y;
                GLF_dead13MATRIX_N++;
            }
        }
    }
    {
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        _GLF_color = vec4(9.4, -584.215, -1.4, 5.0);
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
    }
    center *= rotationMatrix;
    vec3 result = vec3(0.0);
    for (int _injected_loop_counter = (0 >> _GLF_IDENTITY(int(4), int(4))); _GLF_WRAPPED_LOOP(_injected_loop_counter != (0 ^ 1)); _injected_loop_counter++) {
        if (_GLF_DEAD(false)) {
            bool donor_replacementGLF_dead21c1 = _GLF_FUZZED(true);
            if (donor_replacementGLF_dead21c1) {
                float GLF_dead21stripe = GLF_dead21compute_stripe(cos((position.x + position.y) * 20.0));
                result = mix(vec3(position.x, 0, 0.75), vec3(.8, .7, position.x), GLF_dead21stripe);
                GLF_dead21_GLF_color = vec4(result, 1.0);
                ;
            }
        }
        if (_GLF_DEAD(false)) {
            {
                b_b += _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(_injected_loop_counter, 4)] * GLF_live6m44[_GLF_MAKE_IN_BOUNDS_INT(_injected_loop_counter, 4)][_GLF_MAKE_IN_BOUNDS_INT(msb8, 4)];
            }
        }
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            _GLF_struct_51 _GLF_struct_replacement_51 = _GLF_struct_51(_GLF_struct_52(bvec3(true, true, true), ivec4(1, 1, 1, 1), ivec3(1, 1, 1), 1u, mat4x2(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), _GLF_struct_53(mat2x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), 1u, vec4(1.0, 1.0, 1.0, 1.0), vec3(1.0, 1.0, 1.0), ivec4(1, 1, 1, 1)), _GLF_struct_54(bvec2(true, true), mat2(1.0, 1.0, 1.0, 1.0), ivec2(1, 1))), _GLF_struct_55(vec4(1.0, 1.0, 1.0, 1.0), bvec2(true, true)), bvec2(true, true), _GLF_FUZZED(vec2(7.7, 9.7)), mat3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0));
            int GLF_live7i = _GLF_FUZZED(29372);
            if (_GLF_DEAD(false)) {
                if (_GLF_DEAD(_GLF_IDENTITY(false, bool(bool(false))))) {
                    float donor_replacementGLF_dead18s = _GLF_FUZZED(dot(injectionSwitch, (+center)));
                    {
                        if (mod(float(_injected_loop_counter), b_b) <= 0.01) {
                            donor_replacementGLF_dead18s += 0.2;
                        }
                        if (float(_injected_loop_counter) >= b_b) {
                            ;
                        }
                        _injected_loop_counter++;
                    }
                }
                _GLF_color = dFdyCoarse((mat4(-3.2, 2647.4866, 8.4, 433.142, -2393.0967, 6.8, -4.4, 190.231, -5.5, -8.1, 6.9, 0.9, 6353.6259, 50.73, 78.31, -2.7) * vec4(6.7, 47.28, -23.15, -703.304)));
                {
                    int GLF_live17i = _GLF_FUZZED(99280);
                    int GLF_live17iters = _GLF_FUZZED(49039);
                    int GLF_live17looplimiter0 = 0;
                    int GLF_live17v = _GLF_FUZZED(37142);
                    for (GLF_live17i = 0; GLF_live17i < GLF_live17iters; GLF_live17i++) {
                        if (GLF_live17looplimiter0 >= 3) {
                            break;
                        }
                        GLF_live17looplimiter0++;
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                            ivec2 donor_replacementGLF_dead19p = _GLF_FUZZED((ivec2(25015, 71351) / ivec2(-40824, -9087)));
                            if (donor_replacementGLF_dead19p.x < 0) {
                                donor_replacementGLF_dead19p.y++;
                            }
                        }
                        {
                            GLF_live17v = (4 * GLF_live17v * (1000 - GLF_live17v)) / 1000;
                        }
                    }
                }
            }
            if (_GLF_DEAD(false)) {
                {
                    if (mod(float(_injected_loop_counter), b_b) <= 0.01) {
                        b_b += 0.2;
                    }
                    if (float(_injected_loop_counter) >= s_g) {
                        ;
                    }
                    _injected_loop_counter++;
                }
            }
            int GLF_live7looplimiter0 = 0;
            {
                if (_GLF_DEAD(false)) {
                    {
                        if (mod(float(msb8), b_b) <= 0.01) {
                            b_b += 0.2;
                        }
                        if (float(msb8) >= s_g) {
                            ;
                        }
                        msb8++;
                    }
                }
                int GLF_live15sum = _GLF_FUZZED(-58305);
                int GLF_live15target = _GLF_FUZZED((~93159));
                {
                    int GLF_live15result = GLF_live15search(GLF_live15target);
                    if (GLF_live15result > 0) {
                        GLF_live15sum += GLF_live15result;
                    } else {
                        switch (GLF_live15result) {
                            case -1:
                                GLF_live15sum += 1;
                                break;
                            case 0:
                                ;
                        }
                    }
                }
            }
            vec4 GLF_live7texel = _GLF_FUZZED(vec4(8.2, 3.4, -19.30, -5.1));
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = uintBitsToFloat(uvec2(11118u, 93580u).ssts);
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            {
                if (_GLF_DEAD(false)) {
                    ivec2 donor_replacementGLF_dead19p = _GLF_FUZZED(min(sign(ivec2(-95223, -32145)), ivec2(-82839, -88126)));
                    {
                        donor_replacementGLF_dead19p.x -= 16;
                    }
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < determinant(mat4(0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0, 1.0, 0.0, tan(0.0), 1.0, 0.0, 1.0, 0.0)))))) {
                    float donor_replacementGLF_dead13beta = _GLF_FUZZED(s_g);
                    for (int GLF_dead13b = GLF_dead13MATRIX_N - 1; GLF_dead13b >= GLF_live7i; GLF_dead13b--) {
                        GLF_live7texel[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13b, 4)] = GLF_live7texel[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13b, 4)] - (donor_replacementGLF_dead13beta * _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13b, 4)]);
                    }
                }
                if (GLF_live7looplimiter0 >= 7) {
                    if (_GLF_DEAD(false)) {
                        do {
                            if (_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_live7i, 4)] >= 1.0) {
                                _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_live7i, 4)] = _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_live7i, 4)] * _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_live7i, 4)];
                            }
                            GLF_live7i++;
                        } while (GLF_live7i < findMSB(findLSB(_injected_loop_counter)));
                    }
                    ;
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    _GLF_color = vec4(-451.183, -1846.4989, -409.888, -5450.5227);
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < abs(0.0))))) {
                    {
                        h_r += GLF_dead2gl_FragCoord[_GLF_MAKE_IN_BOUNDS_INT(GLF_live7looplimiter0, 4)] * GLF_live6m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_live7looplimiter0, 4)][_GLF_MAKE_IN_BOUNDS_INT(_injected_loop_counter, 4)];
                    }
                }
                GLF_live7looplimiter0++;
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = acosh(vec4(-66.71, -7568.6881, -9.8, -5.5));
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                {
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = atan(vec4(1.5, 21.67, -79.01, 39.20));
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        {
                            if (_GLF_DEAD(false)) {
                                ivec2 donor_replacementGLF_dead19p = _GLF_FUZZED(ivec2(-57118, 99636));
                                {
                                    donor_replacementGLF_dead19p.y++;
                                }
                            }
                            for (int GLF_dead13j = (GLF_dead13MATRIX_N - 1); GLF_dead13j >= (msb8 + 1); GLF_dead13j--) {
                                GLF_live7texel[_GLF_MAKE_IN_BOUNDS_INT(msb8, 4)] -= (GLF_live6m44[_GLF_MAKE_IN_BOUNDS_INT(msb8, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13j, 4)] * GLF_live7texel[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13j, 4)]);
                            }
                            GLF_live7texel[_GLF_MAKE_IN_BOUNDS_INT(msb8, 4)] /= GLF_live6m44[_GLF_MAKE_IN_BOUNDS_INT(msb8, 4)][_GLF_MAKE_IN_BOUNDS_INT(msb8, 4)];
                        }
                    }
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        if (_GLF_DEAD(false)) {
                            ivec2 donor_replacementGLF_dead19p = _GLF_FUZZED(ivec2(-90473, -576));
                            {
                                donor_replacementGLF_dead19p.y--;
                            }
                        }
                        _GLF_struct_replacement_51.GLF_live7coord = GLF_live7texel.xz + GLF_live7texel.yy;
                    } else {
                    }
                    _GLF_struct_replacement_51.GLF_live7coord = floor(_GLF_struct_replacement_51.GLF_live7coord * 256.0) / 256.0;
                    GLF_live7texel = texture(GLF_live7tex, _GLF_struct_replacement_51.GLF_live7coord);
                    GLF_live7i++;
                }
            }
        } else {
        }
        do {
            for (int i = bitfieldInsert(35, 0, 0, bitfieldExtract(int(resolution.x), 0, 0)); i >= bitfieldReverse(bitfieldExtract(int(resolution.x), 0, 0)); i--) {
                vec3 d;
                if (_GLF_DEAD(false)) {
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        ivec2 donor_replacementGLF_dead19p = _GLF_FUZZED(bitfieldInsert(ivec2(6642, 24196), ivec2(-42047, 49176), (_injected_loop_counter + _injected_loop_counter), ivec2(58065, -96679)[0]));
                        {
                            donor_replacementGLF_dead19p.y--;
                        }
                    }
                    break;
                }
                for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != (0 | 0)); _injected_loop_counter--) {
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < _GLF_IDENTITY(0.0, min(0.0, 0.0)))))) {
                            bool donor_replacementGLF_dead21c1 = _GLF_FUZZED(true);
                            if (donor_replacementGLF_dead21c1) {
                                float GLF_dead21stripe = GLF_dead21compute_stripe(cos((position.x + position.y) * 20.0));
                                d = mix(vec3(position.x, 0, 0.75), vec3(.8, .7, position.x), GLF_dead21stripe);
                                GLF_dead21_GLF_color = vec4(d, 1.0);
                                ;
                            }
                        }
                        d = drawShape(position, center + vec2(sin(float(i) / (float(bitCount(msb8)) * 10.0) + time) / 4.0 * float(bitCount(msb8)), float(bitfieldExtract(int(resolution.x), 0, 0))), vec3(0.01 + sin(float(i) / 100.0 * float(bitCount(msb8))), 0.01, float(i)));
                    } else {
                    }
                }
                if (length(d) <= float(bitfieldExtract(int(resolution.x), 0, 0))) {
                    continue;
                    if (_GLF_DEAD(false)) {
                        if (_GLF_DEAD(false)) {
                            float donor_replacementGLF_dead20refh = _GLF_FUZZED(-3562.8445);
                            while (h_r < donor_replacementGLF_dead20refh && GLF_dead13MATRIX_N < 32) {
                                position -= center;
                                donor_replacementGLF_dead20refh += s_g;
                                h_r = texture(GLF_dead20tex, position).y;
                                GLF_dead13MATRIX_N++;
                            }
                        }
                        if (_GLF_DEAD(false)) {
                            discard;
                        }
                        {
                            if (_GLF_DEAD(false)) {
                                if (mod(float(msb8), s_g) <= 0.01) {
                                    s_g += 0.2;
                                }
                            }
                            b_b = -b_b;
                        }
                    }
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        {
                            vec2 GLF_live14coord = _GLF_FUZZED((mat4x2(-741.715, -8.0, -8.0, -70.98, -12.83, -0.3, -91.09, -74.39) * vec4(-4.2, 3696.5490, 4.5, -86.43)));
                            float GLF_live14h = _GLF_FUZZED(float(-42573));
                            int GLF_live14i = _GLF_FUZZED(72652);
                            int GLF_live14looplimiter0 = 0;
                            float GLF_live14refh = _GLF_FUZZED(8.7);
                            float GLF_live14slope = _GLF_FUZZED(2.2);
                            if (_GLF_DEAD(false)) {
                                {
                                    GLF_live14slope += 0.2;
                                }
                            }
                            vec2 GLF_live14uvstep = _GLF_FUZZED(((mat4x2(3743.4529, -6.6, 5.3, -5.2, 244.280, 8.3, -4.1, 22.03) * vec4(583.144, -633.924, 8.6, -1.4))));
                            while (GLF_live14h < GLF_live14refh && GLF_live14i < 32) {
                                if (GLF_live14looplimiter0 >= 3) {
                                    break;
                                }
                                GLF_live14looplimiter0++;
                                {
                                    GLF_live14coord -= GLF_live14uvstep;
                                    GLF_live14refh += GLF_live14slope;
                                    GLF_live14h = texture(GLF_live14tex, GLF_live14coord).y;
                                    GLF_live14i++;
                                }
                            }
                        }
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = roundEven(vec4(62.25, -9.2, -711.531, 8.5));
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                            if (_GLF_DEAD(false)) {
                                {
                                    h_r += 0.2;
                                }
                            }
                        }
                    }
                }
                do {
                    result = vec3(d);
                    if (_GLF_DEAD(false)) {
                        int donor_replacementGLF_dead18i = _GLF_FUZZED(GLF_live11N);
                        do {
                            if (GLF_dead2gl_FragCoord[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead18i, 4)] >= 1.0) {
                                GLF_dead2gl_FragCoord[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead18i, 4)] = GLF_dead2gl_FragCoord[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead18i, 4)] * GLF_dead2gl_FragCoord[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead18i, 4)];
                            }
                            donor_replacementGLF_dead18i++;
                        } while (donor_replacementGLF_dead18i < findMSB(findLSB(_injected_loop_counter)));
                    }
                } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))));
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    _GLF_color = vec4(4.9, 4.0, -6544.0833, 339.857);
                }
                {
                    int GLF_live17i = _GLF_FUZZED(91541);
                    int GLF_live17iters = _GLF_FUZZED(-74359);
                    int GLF_live17v = _GLF_FUZZED(51404);
                    if (_GLF_DEAD(false)) {
                        {
                            ;
                        }
                    }
                    {
                        int GLF_live17looplimiter0 = 0;
                        for (GLF_live17i = 0; GLF_live17i < GLF_live17iters; GLF_live17i++) {
                            if (GLF_live17looplimiter0 >= 3) {
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                    vec2 donor_replacementGLF_dead20coord = _GLF_FUZZED(vec2(atan(GLF_live6one)));
                                    {
                                        donor_replacementGLF_dead20coord -= center;
                                        s_g += h_r;
                                        h_r = texture(GLF_dead20tex, donor_replacementGLF_dead20coord).y;
                                        GLF_live17i++;
                                    }
                                }
                                break;
                            }
                            GLF_live17looplimiter0++;
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                vec2 donor_replacementGLF_dead20coord = _GLF_FUZZED(vec2(890.935, -542.735));
                                float donor_replacementGLF_dead20h = _GLF_FUZZED(resolution.y);
                                {
                                    donor_replacementGLF_dead20coord -= center;
                                    s_g += h_r;
                                    donor_replacementGLF_dead20h = texture(GLF_dead20tex, donor_replacementGLF_dead20coord).y;
                                    GLF_live17iters++;
                                }
                            }
                            {
                                GLF_live17v = (4 * GLF_live17v * (1000 - GLF_live17v)) / 1000;
                            }
                        }
                    }
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    for (int GLF_dead13a = GLF_dead13MATRIX_N - 1; GLF_dead13a >= i; GLF_dead13a--) {
                        s_g += GLF_dead2gl_FragCoord[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13a, 4)] * GLF_live6m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13a, 4)][_GLF_MAKE_IN_BOUNDS_INT(msb8, 4)];
                    }
                    if (_GLF_DEAD(false)) {
                        ivec2 donor_replacementGLF_dead19p = _GLF_FUZZED((ivec2(66809, 6323) ^ _injected_loop_counter));
                        {
                            donor_replacementGLF_dead19p.x = -donor_replacementGLF_dead19p.x;
                        }
                    }
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = inversesqrt(vec4(1.0, 231.547, 632.267, 9.0));
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            {
                                if (mod(float(GLF_dead13MATRIX_N), h_r) <= 0.01) {
                                    s_g += 0.2;
                                }
                                if (float(GLF_dead13MATRIX_N) >= s_g) {
                                    ;
                                }
                                GLF_dead13MATRIX_N++;
                            }
                        }
                    }
                }
            }
        } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
    }
    return result;
}

void main() {
    int msb8 = 256;
    float angle;
    if (_GLF_DEAD(false)) {
        for (int _injected_loop_counter = (1 ^ 1); _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
            if (msb8 < 1000) {
                ;
                {
                    vec3 GLF_live16c = _GLF_FUZZED((mat2x3(-78.12, -2.5, -4.0, -58.44, -99.59, -6982.4312) * vec2(-1.4, -3785.5337)));
                    int GLF_live16i = _GLF_FUZZED(int(((-927.359) < (-6.2))));
                    int GLF_live16looplimiter1 = 0;
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        ivec2 donor_replacementGLF_dead19p = _GLF_FUZZED(ivec2(-54199, -82468));
                        if (donor_replacementGLF_dead19p.x < 0) {
                            donor_replacementGLF_dead19p.y++;
                        }
                    }
                    {
                        if (GLF_live16looplimiter1 >= 3) {
                            ;
                        }
                        GLF_live16looplimiter1++;
                        {
                            if (GLF_live16c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live16i, 3)] >= 1.0) {
                                GLF_live16c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live16i, 3)] = GLF_live16c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live16i, 3)] * GLF_live16c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live16i, 3)];
                            }
                        }
                        if (_GLF_DEAD(_GLF_IDENTITY(false, (false) && true))) {
                            ivec2 donor_replacementGLF_dead19p = _GLF_FUZZED((bitCount(168428u) * ivec2(70641, -39373)));
                            {
                                donor_replacementGLF_dead19p = GLF_dead19iter(donor_replacementGLF_dead19p);
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
                ;
                {
                    int GLF_live5looplimiter0 = 0;
                    int GLF_live5v = _GLF_FUZZED(-50606);
                    {
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            do {
                                if (_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13MATRIX_N, 4)] >= 1.0) {
                                    _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13MATRIX_N, 4)] = _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13MATRIX_N, 4)] * _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13MATRIX_N, 4)];
                                }
                                GLF_dead13MATRIX_N++;
                            } while (GLF_dead13MATRIX_N < findMSB(findLSB(msb8)));
                        }
                        if (GLF_live5looplimiter0 >= 5) {
                            ;
                        }
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            GLF_live5looplimiter0++;
                        } else {
                        }
                        if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        } else {
                            {
                                int GLF_live15baseIndex = _GLF_FUZZED((+ivec4(12652, -73878, -10111, 26035)).q);
                                int GLF_live15data = _GLF_FUZZED(34388);
                                int GLF_live15treeIndex = _GLF_FUZZED(((-79868) & 19048));
                                {
                                    int GLF_live15looplimiter0 = 0;
                                    while (GLF_live15baseIndex <= GLF_live15treeIndex) {
                                        if (GLF_live15looplimiter0 >= 5) {
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
                                                    if (_GLF_DEAD(false)) {
                                                        vec3 donor_replacementGLF_dead21col = _GLF_FUZZED(vec3(-555.375, -7.2, -46.67));
                                                        vec2 donor_replacementGLF_dead21uv = _GLF_FUZZED(resolution);
                                                        {
                                                            float GLF_dead21stripe = GLF_dead21compute_stripe(cos((donor_replacementGLF_dead21uv.x + donor_replacementGLF_dead21uv.y) * 20.0));
                                                            donor_replacementGLF_dead21col = mix(vec3(.7, sinh(donor_replacementGLF_dead21uv.x), donor_replacementGLF_dead21uv.x), vec3(.3, .5, donor_replacementGLF_dead21uv.x), GLF_dead21stripe);
                                                            GLF_dead21_GLF_color = vec4(donor_replacementGLF_dead21col, 1.0);
                                                            return;
                                                        }
                                                    }
                                                    continue;
                                                    if (_GLF_DEAD(false)) {
                                                        {
                                                            if (mod(float(GLF_live15treeIndex), s_g) <= 0.01) {
                                                                angle += 0.2;
                                                            }
                                                            if (float(GLF_live15treeIndex) >= b_b) {
                                                                ;
                                                            }
                                                            GLF_live15treeIndex++;
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            if (_GLF_DEAD(false)) {
                                if (GLF_dead2gl_FragCoord[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13MATRIX_N, 4)] >= 1.0) {
                                    GLF_dead2gl_FragCoord[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13MATRIX_N, 4)] = GLF_dead2gl_FragCoord[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13MATRIX_N, 4)] * GLF_dead2gl_FragCoord[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13MATRIX_N, 4)];
                                }
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                _GLF_color = GLF_dead2gl_FragCoord;
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                        ivec2 donor_replacementGLF_dead19p = _GLF_FUZZED(ivec2(20916, -22504));
                                        {
                                            donor_replacementGLF_dead19p.x -= 16;
                                        }
                                    }
                                    _GLF_color = ((vec4(-9193.7033, 1.3, 1.1, -4722.2856) + 20.89) / 745.741);
                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(true, true && (_GLF_IDENTITY(true, bool(bvec4(true, true, true, false))))))) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                    bool donor_replacementGLF_dead21c1 = _GLF_FUZZED((true && true));
                                    vec3 donor_replacementGLF_dead21col = _GLF_FUZZED(acosh(tan(vec3(-3179.8998, 8979.8599, 1310.6056))));
                                    vec2 donor_replacementGLF_dead21uv = _GLF_FUZZED((mat4x2(8.8, -6642.9652, 6.0, -295.486, -6065.1204, 6851.9216, -4.7, -3.5) * trunc(_GLF_color)));
                                    if (donor_replacementGLF_dead21c1) {
                                        float GLF_dead21stripe = GLF_dead21compute_stripe(cos((donor_replacementGLF_dead21uv.x + donor_replacementGLF_dead21uv.y) * 20.0));
                                        donor_replacementGLF_dead21col = mix(vec3(donor_replacementGLF_dead21uv.x, 0, 0.75), vec3(.8, .7, donor_replacementGLF_dead21uv.x), GLF_dead21stripe);
                                        GLF_dead21_GLF_color = vec4(donor_replacementGLF_dead21col, 1.0);
                                        return;
                                    }
                                }
                                {
                                    int GLF_live17i = _GLF_FUZZED((82805));
                                    int GLF_live17iters = _GLF_FUZZED((59776 + 61887));
                                    int GLF_live17v = _GLF_FUZZED(62813);
                                    if (_GLF_DEAD(false)) {
                                        vec2 donor_replacementGLF_dead20coord = _GLF_FUZZED(resolution);
                                        vec2 donor_replacementGLF_dead20uvstep = _GLF_FUZZED((resolution + max(time, s_g)));
                                        while (h_r < h_r && GLF_dead13MATRIX_N < 32) {
                                            donor_replacementGLF_dead20coord -= donor_replacementGLF_dead20uvstep;
                                            h_r += h_r;
                                            h_r = texture(GLF_dead20tex, donor_replacementGLF_dead20coord).y;
                                            GLF_dead13MATRIX_N++;
                                        }
                                    }
                                    {
                                        int GLF_live17looplimiter0 = 0;
                                        for (GLF_live17i = 0; GLF_live17i < GLF_live17iters; GLF_live17i++) {
                                            if (GLF_live17looplimiter0 >= 3) {
                                                break;
                                            }
                                            GLF_live17looplimiter0++;
                                            {
                                                GLF_live17v = (4 * GLF_live17v * (1000 - GLF_live17v)) / 1000;
                                            }
                                        }
                                    }
                                }
                            }
                            if (_GLF_DEAD(false)) {
                                _GLF_color = GLF_live6m44[0];
                                if (_GLF_DEAD(false)) {
                                    ivec2 donor_replacementGLF_dead19p = _GLF_FUZZED((mat2x3(9305.9326, -6.6, -5.2, 0.3, -7.5, 747.486), ivec2(65194, 13906)));
                                    {
                                        donor_replacementGLF_dead19p.y++;
                                    }
                                }
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                        vec2 donor_replacementGLF_dead20coord = _GLF_FUZZED(injectionSwitch);
                                        vec2 donor_replacementGLF_dead20uvstep = _GLF_FUZZED(dFdyFine(step(fwidthCoarse(time), resolution)));
                                        {
                                            donor_replacementGLF_dead20coord -= donor_replacementGLF_dead20uvstep;
                                            s_g += h_r;
                                            h_r = texture(GLF_dead20tex, donor_replacementGLF_dead20coord).y;
                                            GLF_dead13MATRIX_N++;
                                        }
                                    }
                                    _GLF_color = vec4(7.6, 4187.1285, 0.4, -13.93);
                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                            }
                        }
                        {
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                {
                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                        {
                                            ;
                                        }
                                    }
                                    _injected_loop_counter /= 2;
                                    {
                                        int GLF_live15looplimiter0 = 0;
                                        if (GLF_live15looplimiter0 >= 5) {
                                            ;
                                        }
                                    }
                                    {
                                        {
                                            vec3 GLF_live16c = _GLF_FUZZED(vec3(-7234.1921, -6.4, -2.0));
                                            _GLF_struct_56 _GLF_struct_replacement_56 = _GLF_struct_56(1u, 1u, _GLF_FUZZED(int(false)));
                                            {
                                                GLF_live16c[_GLF_MAKE_IN_BOUNDS_INT(_GLF_struct_replacement_56.GLF_live16i, 3)] = GLF_live16c[_GLF_MAKE_IN_BOUNDS_INT(_GLF_struct_replacement_56.GLF_live16i, 3)] * GLF_live16c[_GLF_MAKE_IN_BOUNDS_INT(_GLF_struct_replacement_56.GLF_live16i, 3)];
                                            }
                                        }
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        _GLF_color = dFdxFine(vec4(5564.6524, -9743.1764, 0.6, -3.9));
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                            {
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < abs(0.0))))) {
                                                    if (_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(msb8, 4)] >= 1.0) {
                                                        _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(msb8, 4)] = _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(msb8, 4)] * _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(msb8, 4)];
                                                    }
                                                }
                                                int GLF_live15baseIndex = _GLF_FUZZED((66482 + (~80582)));
                                                int GLF_live15data = _GLF_FUZZED((false ? 47757 : (-61128)));
                                                int GLF_live15treeIndex = _GLF_FUZZED(-34365);
                                                {
                                                    if (GLF_live15tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15baseIndex, 10)].leftIndex == -1) {
                                                        GLF_live15tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15baseIndex, 10)].leftIndex = GLF_live15treeIndex;
                                                        GLF_live15makeTreeNode(GLF_live15tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15treeIndex, 10)], GLF_live15data);
                                                        ;
                                                    } else {
                                                        GLF_live15baseIndex = GLF_live15tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15baseIndex, 10)].leftIndex;
                                                        ;
                                                        if (_GLF_DEAD(false)) {
                                                            {
                                                                if (GLF_dead2gl_FragCoord[_GLF_MAKE_IN_BOUNDS_INT(_injected_loop_counter, 4)] >= 1.0) {
                                                                    GLF_dead2gl_FragCoord[_GLF_MAKE_IN_BOUNDS_INT(_injected_loop_counter, 4)] = GLF_dead2gl_FragCoord[_GLF_MAKE_IN_BOUNDS_INT(_injected_loop_counter, 4)] * GLF_dead2gl_FragCoord[_GLF_MAKE_IN_BOUNDS_INT(_injected_loop_counter, 4)];
                                                                }
                                                                _injected_loop_counter++;
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                            if (_GLF_DEAD(false)) {
                                                ivec2 donor_replacementGLF_dead19p = _GLF_FUZZED((findMSB(uvec2(55496u, 190201u)) << ivec2(-69044, -94323)));
                                                for (GLF_live5looplimiter0 = 0; GLF_live5looplimiter0 < 100; GLF_live5looplimiter0++) {
                                                    donor_replacementGLF_dead19p = GLF_dead19iter(donor_replacementGLF_dead19p);
                                                }
                                            }
                                        }
                                    }
                                    if (_GLF_DEAD(false)) {
                                        continue;
                                    }
                                    {
                                        {
                                            vec2 GLF_live14coord = _GLF_FUZZED((((-4026.0267) - vec2(4065.8765, 84.98)) * mat2(62.03, -8.7, 95.12, -889.645)));
                                            float GLF_live14h = _GLF_FUZZED(vec4(-5454.2357, vec2(-19.90, 877.670), -6.0).y);
                                            int GLF_live14i = _GLF_FUZZED((77078));
                                            int GLF_live14looplimiter0 = 0;
                                            _GLF_struct_57 _GLF_struct_replacement_57 = _GLF_struct_57(mat3x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), ivec3(1, 1, 1), _GLF_struct_58(vec2(1.0, 1.0), ivec2(1, 1), vec3(1.0, 1.0, 1.0), _GLF_struct_59(_GLF_FUZZED(((-0.2) + (-4.0))), mat3x2(1.0, 1.0, 1.0, 1.0, 1.0, 1.0)), 1, vec4(1.0, 1.0, 1.0, 1.0), 1));
                                            _GLF_struct_60 _GLF_struct_replacement_60 = _GLF_struct_60(_GLF_struct_61(uvec2(1u, 1u), _GLF_struct_62(mat3x2(1.0, 1.0, 1.0, 1.0, 1.0, 1.0), mat4x3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0)), _GLF_FUZZED((((-26903) <= (-54127)) ? (-4553.1671) : 7456.8835)), mat3x2(1.0, 1.0, 1.0, 1.0, 1.0, 1.0), uvec4(1u, 1u, 1u, 1u), mat3x2(1.0, 1.0, 1.0, 1.0, 1.0, 1.0), 1u));
                                            vec2 GLF_live14uvstep = _GLF_FUZZED(vec2(750.898, 887.042));
                                            {
                                                if (GLF_live14looplimiter0 >= 3) {
                                                    ;
                                                }
                                                GLF_live14looplimiter0++;
                                                {
                                                    GLF_live14coord -= GLF_live14uvstep;
                                                    _GLF_struct_replacement_57._f2._f3.GLF_live14refh += _GLF_struct_replacement_60._f0.GLF_live14slope;
                                                    GLF_live14h = texture(GLF_live14tex, GLF_live14coord).y;
                                                    GLF_live14i++;
                                                }
                                            }
                                        }
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        if (_GLF_DEAD(false)) {
                                            vec2 donor_replacementGLF_dead20coord = _GLF_FUZZED((h_r - (GLF_live6one - injectionSwitch)));
                                            vec2 donor_replacementGLF_dead20uvstep = _GLF_FUZZED(injectionSwitch);
                                            while (s_g < s_g && GLF_live5v < 32) {
                                                donor_replacementGLF_dead20coord -= donor_replacementGLF_dead20uvstep;
                                                s_g += s_g;
                                                s_g = texture(GLF_dead20tex, donor_replacementGLF_dead20coord).y;
                                                GLF_live5v++;
                                            }
                                        }
                                        _GLF_color = vec4(7190.8066, -944.944, 2.6, 5.0);
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < tan(0.0))))) {
                                                float donor_replacementGLF_dead18s = _GLF_FUZZED(h_r);
                                                {
                                                    ;
                                                }
                                            }
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                    }
                                }
                            }
                            if (_GLF_DEAD(false)) {
                                _GLF_color = (vec3(-558.144, 2.0, -0.7).gbgb / angle);
                                if (_GLF_DEAD(false)) {
                                    return;
                                }
                                if (_GLF_DEAD(false)) {
                                    ivec2 donor_replacementGLF_dead19p = _GLF_FUZZED(ivec2(-57965, 41362));
                                    while (donor_replacementGLF_dead19p.x > 15) {
                                        donor_replacementGLF_dead19p.x -= 16;
                                    }
                                }
                            }
                            GLF_live5v = (4 * GLF_live5v * (1000 - GLF_live5v)) / 1000;
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < determinant(mat3(sin(0.0), 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0)))))) {
                                _GLF_color = mix(vec4(4.5, 305.485, 0.7, 53.09), (GLF_dead2gl_FragCoord - mix(h_r, 2.9, true)), (ivec2(-51394, 11133), bvec4(true, true, true, false)));
                            }
                        }
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        {
                            vec2 GLF_live14coord = _GLF_FUZZED(vec2(-8.9, 4.1));
                            float GLF_live14h = _GLF_FUZZED(-4.1);
                            int GLF_live14i = _GLF_FUZZED((-(52246 ^ (-43106))));
                            int GLF_live14looplimiter0 = 0;
                            float GLF_live14refh = _GLF_FUZZED(-5.4);
                            _GLF_struct_63 _GLF_struct_replacement_63 = _GLF_struct_63(_GLF_FUZZED((((mat2(27.23, -25.16, 200.641, 56.62)) != mat2(2.5, -8.4, 68.81, 0.9)) ? (-1.0) : (-60.90))), uvec4(1u, 1u, 1u, 1u));
                            vec2 GLF_live14uvstep = _GLF_FUZZED(vec2(vec4(919.103, -8910.0131, -6.2, 5.4)));
                            while (GLF_live14h < GLF_live14refh && GLF_live14i < 32) {
                                if (GLF_live14looplimiter0 >= 3) {
                                    break;
                                }
                                GLF_live14looplimiter0++;
                                {
                                    if (_GLF_DEAD(false)) {
                                        do {
                                            if (_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13MATRIX_N, 4)] >= 1.0) {
                                                _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13MATRIX_N, 4)] = _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13MATRIX_N, 4)] * _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13MATRIX_N, 4)];
                                            }
                                            GLF_dead13MATRIX_N++;
                                        } while (GLF_dead13MATRIX_N < findMSB(findLSB(GLF_live14looplimiter0)));
                                    }
                                    GLF_live14coord -= GLF_live14uvstep;
                                    GLF_live14refh += _GLF_struct_replacement_63.GLF_live14slope;
                                    GLF_live14h = texture(GLF_live14tex, GLF_live14coord).y;
                                    GLF_live14i++;
                                }
                            }
                        }
                        {
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = ((-7.4) / vec4(47.26, 9.7, -97.18, -7046.0887));
                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                            ;
                            if (_GLF_DEAD(false)) {
                                ivec2 donor_replacementGLF_dead19p = _GLF_FUZZED(bitCount(uvec2(119709u, 176718u)));
                                while (donor_replacementGLF_dead19p.x > 15) {
                                    donor_replacementGLF_dead19p.x -= 16;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    if (_GLF_DEAD(false)) {
        vec2 donor_replacementGLF_dead12a = _GLF_FUZZED(resolution);
        if (donor_replacementGLF_dead12a.y < donor_replacementGLF_dead12a.x) {
            s_g = 0.5 - s_g;
        }
    }
    angle = sin(time) * 0.1;
    mat2 rotationMatrix;
    {
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        if (_GLF_DEAD(false)) {
            _GLF_color = dFdyFine(unpackSnorm4x8(156167u));
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                if (_GLF_DEAD(false)) {
                    ivec2 donor_replacementGLF_dead19p = _GLF_FUZZED(ivec2(-53844, 51101));
                    {
                        donor_replacementGLF_dead19p.y--;
                    }
                }
                _GLF_color = tan(vec4(4.1, -3748.1957, 2.7, -449.050));
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    if (_GLF_DEAD(false)) {
                        {
                            if (mod(float(GLF_dead13MATRIX_N), h_r) <= 0.01) {
                                s_g += 0.2;
                            }
                            if (float(GLF_dead13MATRIX_N) >= s_g) {
                                ;
                            }
                            GLF_dead13MATRIX_N++;
                        }
                    }
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
        }
        _GLF_color = pow(vec4(78.43, 32.77, 483.656, 488.684), vec4(9453.3296, -164.547, 9069.1011, 6.6));
        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
    }
    for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < int(_GLF_ONE(1.0, injectionSwitch.y))); _injected_loop_counter++) {
        if (_GLF_WRAPPED_IF_FALSE(false)) {
        } else {
            if (_GLF_DEAD(false)) {
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = fwidthCoarse(vec4(-512.805, 7.9, 5652.1847, 26.53));
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                        {
                            vec2 GLF_live14coord = _GLF_FUZZED((vec2(-332.107, -0.1) + (-101.091)));
                            float GLF_live14h = _GLF_FUZZED(-9.7);
                            int GLF_live14i = _GLF_FUZZED(2843);
                            float GLF_live14refh = _GLF_FUZZED((-4412.8654));
                            _GLF_struct_64 _GLF_struct_replacement_64 = _GLF_struct_64(vec4(1.0, 1.0, 1.0, 1.0), uvec3(1u, 1u, 1u), _GLF_struct_65(mat4x2(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), mat3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), _GLF_struct_66(mat3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), uvec4(1u, 1u, 1u, 1u), ivec2(1, 1), mat2x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), _GLF_FUZZED(76.92), mat2x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), ivec3(1, 1, 1))), mat3x2(1.0, 1.0, 1.0, 1.0, 1.0, 1.0), mat3x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0));
                            vec2 GLF_live14uvstep = _GLF_FUZZED(vec2(7.8, 37.60));
                            {
                                int GLF_live14looplimiter0 = 0;
                                while (GLF_live14h < GLF_live14refh && GLF_live14i < 32) {
                                    if (GLF_live14looplimiter0 >= 3) {
                                        break;
                                    }
                                    GLF_live14looplimiter0++;
                                    {
                                        GLF_live14coord -= GLF_live14uvstep;
                                        GLF_live14refh += _GLF_struct_replacement_64._f2._f2.GLF_live14slope;
                                        GLF_live14h = texture(GLF_live14tex, GLF_live14coord).y;
                                        if (_GLF_DEAD(false)) {
                                            ivec2 donor_replacementGLF_dead19p = _GLF_FUZZED(ivec2(79058, -43463));
                                            if (donor_replacementGLF_dead19p.x > 0) {
                                                donor_replacementGLF_dead19p.y--;
                                            }
                                        }
                                        GLF_live14i++;
                                    }
                                }
                            }
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        vec2 donor_replacementGLF_dead20coord = _GLF_FUZZED(injectionSwitch);
                        vec2 donor_replacementGLF_dead20uvstep = _GLF_FUZZED(vec2(1.6, -8.9));
                        while (angle < angle && msb8 < 32) {
                            donor_replacementGLF_dead20coord -= donor_replacementGLF_dead20uvstep;
                            angle += angle;
                            angle = texture(GLF_dead20tex, donor_replacementGLF_dead20coord).y;
                            msb8++;
                        }
                    }
                }
                _GLF_color = (mat4(6.7, 34.14, 3.5, 9978.7988, 261.575, 7.4, 38.74, 64.32, 114.600, -9993.5116, -6282.8247, -71.99, -5.9, -9.7, 6.9, 5812.4935) * mix(GLF_dead2gl_FragCoord, _GLF_color, _GLF_color));
            }
            if (_GLF_DEAD(false)) {
                break;
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                ivec2 donor_replacementGLF_dead19p = _GLF_FUZZED(ivec2(_injected_loop_counter));
                while (donor_replacementGLF_dead19p.x > 15) {
                    donor_replacementGLF_dead19p.x -= 16;
                }
            }
        }
        rotationMatrix = mat2(sin(angle), -cos(angle), cos(angle), sin(angle));
    }
    if (_GLF_DEAD(false)) {
        vec2 donor_replacementGLF_dead20coord = _GLF_FUZZED(injectionSwitch);
        vec2 donor_replacementGLF_dead20uvstep = _GLF_FUZZED(injectionSwitch);
        {
            donor_replacementGLF_dead20coord -= donor_replacementGLF_dead20uvstep;
            angle += s_g;
            b_b = texture(GLF_dead20tex, donor_replacementGLF_dead20coord).y;
            msb8++;
        }
    }
    if (_GLF_WRAPPED_IF_FALSE(false)) {
        {
            vec2 GLF_live14coord = _GLF_FUZZED(vec2(vec3(-9.9, -70.43, 99.13)));
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                ivec2 donor_replacementGLF_dead19p = _GLF_FUZZED(ivec2(-52067, -29115));
                while (donor_replacementGLF_dead19p.x > 15) {
                    donor_replacementGLF_dead19p.x -= 16;
                }
            }
            float GLF_live14h = _GLF_FUZZED(2688.1154);
            int GLF_live14i = _GLF_FUZZED(94875);
            float GLF_live14refh = _GLF_FUZZED(5.0);
            float GLF_live14slope = _GLF_FUZZED((+6.6));
            vec2 GLF_live14uvstep = _GLF_FUZZED(vec2(483.776, -766.972));
            {
                if (_GLF_DEAD(false)) {
                    if (float(msb8) >= h_r) {
                        ;
                    }
                }
                int GLF_live14looplimiter0 = 0;
                while (GLF_live14h < GLF_live14refh && GLF_live14i < 32) {
                    if (GLF_live14looplimiter0 >= 3) {
                        break;
                    }
                    if (_GLF_DEAD(false)) {
                        vec2 donor_replacementGLF_dead20coord = _GLF_FUZZED(GLF_live14uvstep);
                        while (h_r < h_r && GLF_live14i < 32) {
                            donor_replacementGLF_dead20coord -= GLF_live14uvstep;
                            h_r += GLF_live14slope;
                            h_r = texture(GLF_dead20tex, donor_replacementGLF_dead20coord).y;
                            GLF_live14i++;
                        }
                    }
                    GLF_live14looplimiter0++;
                    {
                        GLF_live14coord -= GLF_live14uvstep;
                        GLF_live14refh += GLF_live14slope;
                        GLF_live14h = texture(GLF_live14tex, GLF_live14coord).y;
                        GLF_live14i++;
                    }
                }
            }
        }
    } else {
        {
            vec4 _GLF_outVarBackup_GLF_color;
            if (_GLF_DEAD(false)) {
                ivec2 donor_replacementGLF_dead19p = _GLF_FUZZED(findLSB((104928u ^ uvec2(192187u, 21952u))));
                for (GLF_dead13MATRIX_N = 0; GLF_dead13MATRIX_N < 100; GLF_dead13MATRIX_N++) {
                    donor_replacementGLF_dead19p = GLF_dead19iter(donor_replacementGLF_dead19p);
                }
            }
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = sqrt(vec4(9.9, -6.5, 8.4, -1.5));
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
                if (_GLF_DEAD(false)) {
                    ivec2 donor_replacementGLF_dead19p = _GLF_FUZZED(ivec2(92164, 52080));
                    {
                        donor_replacementGLF_dead19p.y--;
                    }
                }
            }
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            bool donor_replacementGLF_dead21c1 = _GLF_FUZZED(true);
            bool donor_replacementGLF_dead21c2 = _GLF_FUZZED(true);
            bool donor_replacementGLF_dead21c3 = _GLF_FUZZED((mat2x3(-4120.9605, -508.768, 7.6, -6.2, -5132.3980, 3.5) == GLF_live6m23));
            bool donor_replacementGLF_dead21c4 = _GLF_FUZZED(false);
            vec3 donor_replacementGLF_dead21col = _GLF_FUZZED(vec3(614.356, 23.65, 9.2));
            vec2 donor_replacementGLF_dead21uv = _GLF_FUZZED(vec2(dFdx(-40.28), 2.5));
            if (!donor_replacementGLF_dead21c1 && !donor_replacementGLF_dead21c2 && !donor_replacementGLF_dead21c3 && donor_replacementGLF_dead21c4) {
                float GLF_dead21stripe = GLF_dead21compute_stripe(tan((donor_replacementGLF_dead21uv.x + donor_replacementGLF_dead21uv.y) * 20.0));
                donor_replacementGLF_dead21col = mix(vec3(donor_replacementGLF_dead21uv.x, .8, 0), vec3(1, donor_replacementGLF_dead21uv.y, 0), GLF_dead21stripe);
                GLF_dead21_GLF_color = vec4(donor_replacementGLF_dead21col, 1.0);
                return;
            }
        }
        _GLF_struct_67 _GLF_struct_replacement_67 = _GLF_struct_67(mat3x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), vec3(1.0, 1.0, 1.0), vec3(1.0, 1.0, 1.0), mat2x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), true, vec4(1.0, 1.0, 1.0, 1.0));
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            for (int GLF_dead13k = 0; GLF_dead13k < GLF_dead13MATRIX_N - 1; GLF_dead13k++) {
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    _GLF_color = min(vec4(-691.572, 4.1, 489.660, -6772.2793), s_g);
                }
                {
                    int GLF_live16i = _GLF_FUZZED(-76422);
                    _GLF_struct_68 _GLF_struct_replacement_68 = _GLF_struct_68(mat4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), mat3x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), _GLF_FUZZED(8.9));
                    float GLF_live16result = _GLF_FUZZED(vec2(121.740, -65.87).sst.p);
                    float GLF_live16thirty_two = _GLF_FUZZED(-628.768);
                    {
                        if ((GLF_live16i % 32) == 0) {
                            GLF_live16result += 0.4;
                        } else {
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                vec3 donor_replacementGLF_dead21col = _GLF_FUZZED(vec3(-9.0, -0.7, -9.4));
                                vec2 donor_replacementGLF_dead21uv = _GLF_FUZZED(vec2(-450.860, 97.46));
                                {
                                    float GLF_dead21stripe = GLF_dead21compute_stripe(cos((donor_replacementGLF_dead21uv.x + donor_replacementGLF_dead21uv.y) * 20.0));
                                    donor_replacementGLF_dead21col = mix(vec3(.7, sinh(donor_replacementGLF_dead21uv.x), donor_replacementGLF_dead21uv.x), vec3(.3, .5, donor_replacementGLF_dead21uv.x), GLF_dead21stripe);
                                    GLF_dead21_GLF_color = vec4(donor_replacementGLF_dead21col, 1.0);
                                    return;
                                }
                            }
                            if (mod(float(GLF_live16i), round(GLF_live16thirty_two)) <= 0.01) {
                                GLF_live16result += 100.0;
                            }
                        }
                        if (float(GLF_live16i) >= _GLF_struct_replacement_68.GLF_live16limit) {
                            ;
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            bool donor_replacementGLF_dead21c1 = _GLF_FUZZED((ivec4(-41810, 78886, -53779, 5573) == ivec4(-20798, -57067, 12574, -33603)));
                            bool donor_replacementGLF_dead21c2 = _GLF_FUZZED(false);
                            bool donor_replacementGLF_dead21c3 = _GLF_FUZZED((bvec2(false, false) != greaterThan(uvec2(35318u, 196371u), uvec2(145300u, 64968u))));
                            bool donor_replacementGLF_dead21c4 = _GLF_FUZZED(bool(atan(h_r)));
                            vec3 donor_replacementGLF_dead21col = _GLF_FUZZED(refract(vec3(-4.8, -38.68, -1.8), vec3(28.65, 0.1, -3273.5486), GLF_live16thirty_two));
                            vec2 donor_replacementGLF_dead21uv = _GLF_FUZZED(resolution);
                            if (!donor_replacementGLF_dead21c1 && !donor_replacementGLF_dead21c2 && !donor_replacementGLF_dead21c3 && donor_replacementGLF_dead21c4) {
                                float GLF_dead21stripe = GLF_dead21compute_stripe(tan((donor_replacementGLF_dead21uv.x + donor_replacementGLF_dead21uv.y) * 20.0));
                                donor_replacementGLF_dead21col = mix(vec3(donor_replacementGLF_dead21uv.x, .8, 0), vec3(1, donor_replacementGLF_dead21uv.y, 0), GLF_dead21stripe);
                                GLF_dead21_GLF_color = vec4(donor_replacementGLF_dead21col, 1.0);
                                return;
                            }
                        }
                    }
                }
                for (int GLF_dead13x = GLF_dead13MATRIX_N - 1; GLF_dead13x >= GLF_dead13k; GLF_dead13x--) {
                    b_b += pow(GLF_live6m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13x, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13k, 4)], 2.0);
                    if (_GLF_DEAD(_GLF_IDENTITY(false, !(!(false))))) {
                        vec2 donor_replacementGLF_dead20coord = _GLF_FUZZED((time * resolution));
                        float donor_replacementGLF_dead20slope = _GLF_FUZZED(atan(time));
                        vec2 donor_replacementGLF_dead20uvstep = _GLF_FUZZED(ceil(cos(mod(injectionSwitch, vec2(-1.6, 50.62)))));
                        while (angle < angle && msb8 < 32) {
                            donor_replacementGLF_dead20coord -= donor_replacementGLF_dead20uvstep;
                            angle += donor_replacementGLF_dead20slope;
                            angle = texture(GLF_dead20tex, donor_replacementGLF_dead20coord).y;
                            msb8++;
                        }
                    }
                    GLF_dead2gl_FragCoord[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13x, 4)] = GLF_live6m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13x, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13k, 4)];
                }
                b_b = sqrt(b_b);
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < determinant(mat3(abs(0.0), 0.0, 1.0, 0.0, 0.0, 0.0, sqrt(0.0), 0.0, 0.0)))))) {
                    _GLF_color = (vec2(-4.4, -0.0) * mat4x2((+mat3(-5.5, 3983.7921, 3.7, -18.24, -3313.6046, 9975.7614, -1.6, 88.73, 920.234))));
                }
                GLF_dead2gl_FragCoord[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13k, 4)] -= (sign(GLF_dead2gl_FragCoord[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13k, 4)]) * b_b);
                for (int GLF_dead13u = GLF_dead13MATRIX_N - 1; GLF_dead13u >= GLF_dead13k; GLF_dead13u--) {
                    s_g += pow(GLF_dead2gl_FragCoord[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13u, 4)], 2.0);
                }
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = uintBitsToFloat((~uvec4(194008u, 180725u, 155024u, 69645u)));
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        {
                            float GLF_live16limit = _GLF_FUZZED((+8.7));
                            float GLF_live16result = _GLF_FUZZED(-7518.7844);
                            float GLF_live16thirty_two = _GLF_FUZZED(-5.7);
                            {
                                int GLF_live16looplimiter0 = 0;
                                for (int GLF_live16i = 1; GLF_live16i < 800; GLF_live16i++) {
                                    if (GLF_live16looplimiter0 >= 3) {
                                        break;
                                    }
                                    GLF_live16looplimiter0++;
                                    {
                                        if ((GLF_live16i % 32) == 0) {
                                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                {
                                                    if (mod(float(GLF_dead13MATRIX_N), GLF_live16thirty_two) <= 0.01) {
                                                        b_b += 0.2;
                                                    }
                                                    if (float(GLF_dead13MATRIX_N) >= s_g) {
                                                        ;
                                                    }
                                                    GLF_dead13MATRIX_N++;
                                                }
                                            }
                                            GLF_live16result += 0.4;
                                        } else {
                                            if (mod(float(GLF_live16i), round(GLF_live16thirty_two)) <= 0.01) {
                                                GLF_live16result += 100.0;
                                            }
                                            if (_GLF_DEAD(false)) {
                                                vec3 donor_replacementGLF_dead21col = _GLF_FUZZED(vec3(-689.823, 36.32, -35.47));
                                                vec2 donor_replacementGLF_dead21uv = _GLF_FUZZED(dFdxCoarse(vec2(-377.715, -6.9)));
                                                {
                                                    float GLF_dead21stripe = GLF_dead21compute_stripe(cos((donor_replacementGLF_dead21uv.x + donor_replacementGLF_dead21uv.y) * 20.0));
                                                    donor_replacementGLF_dead21col = mix(vec3(.7, sinh(donor_replacementGLF_dead21uv.x), donor_replacementGLF_dead21uv.x), vec3(.3, .5, donor_replacementGLF_dead21uv.x), GLF_dead21stripe);
                                                    GLF_dead21_GLF_color = vec4(donor_replacementGLF_dead21col, 1.0);
                                                    return;
                                                }
                                            }
                                        }
                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                            do {
                                                if (_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13k, 4)] >= 1.0) {
                                                    _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13k, 4)] = _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13k, 4)] * _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13k, 4)];
                                                }
                                                GLF_dead13k++;
                                            } while (GLF_dead13k < findMSB(findLSB(GLF_dead13MATRIX_N)));
                                        }
                                        if (float(GLF_live16i) >= GLF_live16limit) {
                                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                ivec2 donor_replacementGLF_dead19p = _GLF_FUZZED((GLF_dead13MATRIX_N ^ (-ivec2(-83899, 90000))));
                                                for (GLF_live16i = 0; GLF_live16i < 100; GLF_live16i++) {
                                                    donor_replacementGLF_dead19p = GLF_dead19iter(donor_replacementGLF_dead19p);
                                                }
                                            }
                                            ;
                                        }
                                    }
                                }
                            }
                        }
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                s_g = 2.0 / s_g;
                for (int GLF_dead13j = GLF_dead13k; GLF_dead13j < GLF_dead13MATRIX_N; GLF_dead13j++) {
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(-7.3, -4.1, 546.160, -7015.7698);
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    for (int GLF_dead13a = GLF_dead13MATRIX_N - 1; GLF_dead13a >= GLF_dead13k; GLF_dead13a--) {
                        if (_GLF_DEAD(false)) {
                            vec3 donor_replacementGLF_dead21col = _GLF_FUZZED(refract(vec3(1.8, -2.8, -5915.1194), vec3(-4.9, 7.4, 0.9), 423.593));
                            vec2 donor_replacementGLF_dead21uv = _GLF_FUZZED(injectionSwitch);
                            {
                                float GLF_dead21stripe = GLF_dead21compute_stripe(cos((donor_replacementGLF_dead21uv.x + donor_replacementGLF_dead21uv.y) * 20.0));
                                donor_replacementGLF_dead21col = mix(vec3(donor_replacementGLF_dead21uv.x, 0, 0.75), vec3(.8, .7, donor_replacementGLF_dead21uv.x), GLF_dead21stripe);
                                GLF_dead21_GLF_color = vec4(donor_replacementGLF_dead21col, 1.0);
                                return;
                            }
                        }
                        angle += GLF_dead2gl_FragCoord[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13a, 4)] * GLF_live6m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13a, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13j, 4)];
                    }
                    angle = s_g * angle;
                    for (int GLF_dead13a = GLF_dead13MATRIX_N - 1; GLF_dead13a >= GLF_dead13k; GLF_dead13a--) {
                        GLF_live6m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13a, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13j, 4)] = GLF_live6m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13a, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13j, 4)] - (angle * GLF_dead2gl_FragCoord[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13a, 4)]);
                    }
                    angle = 0.0;
                    angle = 0.0;
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        _GLF_color = unpackUnorm4x8(106021u);
                    }
                }
                for (int GLF_dead13b = GLF_dead13MATRIX_N - 1; GLF_dead13b >= GLF_dead13k; GLF_dead13b--) {
                    angle += GLF_dead2gl_FragCoord[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13b, 4)] * _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13b, 4)];
                    if (_GLF_DEAD(false)) {
                        ivec2 donor_replacementGLF_dead19p = _GLF_FUZZED(((ivec2(-24390, 16601) - ivec2(-88786, 29717)) * GLF_live11N));
                        {
                            donor_replacementGLF_dead19p.x -= 16;
                        }
                    }
                    {
                        vec3 GLF_live16c = _GLF_FUZZED(vec3(vec2(-335.971, -3.1), 4.4));
                        int GLF_live16i = _GLF_FUZZED(41636);
                        if (GLF_live16c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live16i, 3)] >= 1.0) {
                            GLF_live16c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live16i, 3)] = GLF_live16c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live16i, 3)] * GLF_live16c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live16i, 3)];
                        }
                    }
                }
                angle = s_g * angle;
                for (int GLF_dead13b = GLF_dead13MATRIX_N - 1; GLF_dead13b >= GLF_dead13k; GLF_dead13b--) {
                    _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13b, 4)] = _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13b, 4)] - (angle * GLF_dead2gl_FragCoord[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13b, 4)]);
                    if (_GLF_DEAD(false)) {
                        {
                            ;
                        }
                    }
                }
                b_b = 0.0;
                s_g = 0.0;
                s_g = 0.0;
                angle = 0.0;
                angle = 0.0;
            }
            {
                int GLF_live15baseIndex = _GLF_FUZZED(68135);
                int GLF_live15data = _GLF_FUZZED(-95219);
                int GLF_live15treeIndex = _GLF_FUZZED(4559);
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
                            GLF_live15tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15baseIndex, 10)].rightIndex = GLF_live15treeIndex;
                            GLF_live15makeTreeNode(GLF_live15tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15treeIndex, 10)], GLF_live15data);
                            ;
                        } else {
                            GLF_live15baseIndex = GLF_live15tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15baseIndex, 10)].rightIndex;
                            ;
                        }
                    }
                }
            }
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(-574.303, 6.9, 71.91, 3.4);
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
        }
        _GLF_struct_replacement_67._GLF_outVarBackup_GLF_color = _GLF_color;
        _GLF_color = vec4(3.2, 78.95, 9832.3250, 9996.8324);
        do {
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                for (int GLF_dead13k = 0; GLF_dead13k < GLF_dead13MATRIX_N - 1; GLF_dead13k++) {
                    for (int GLF_dead13x = GLF_dead13MATRIX_N - 1; GLF_dead13x >= GLF_dead13k; GLF_dead13x--) {
                        h_r += pow(GLF_live6m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13x, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13k, 4)], 2.0);
                        GLF_dead2gl_FragCoord[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13x, 4)] = GLF_live6m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13x, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13k, 4)];
                    }
                    h_r = sqrt(h_r);
                    GLF_dead2gl_FragCoord[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13k, 4)] -= (sign(GLF_dead2gl_FragCoord[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13k, 4)]) * h_r);
                    for (int GLF_dead13u = GLF_dead13MATRIX_N - 1; GLF_dead13u >= GLF_dead13k; GLF_dead13u--) {
                        angle += pow(GLF_dead2gl_FragCoord[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13u, 4)], 2.0);
                    }
                    h_r = 2.0 / angle;
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        vec2 donor_replacementGLF_dead20coord = _GLF_FUZZED((time / resolution));
                        float donor_replacementGLF_dead20refh = _GLF_FUZZED(angle);
                        vec2 donor_replacementGLF_dead20uvstep = _GLF_FUZZED(fract(resolution));
                        while (h_r < donor_replacementGLF_dead20refh && msb8 < 32) {
                            donor_replacementGLF_dead20coord -= donor_replacementGLF_dead20uvstep;
                            donor_replacementGLF_dead20refh += h_r;
                            h_r = texture(GLF_dead20tex, donor_replacementGLF_dead20coord).y;
                            msb8++;
                        }
                    }
                    for (int GLF_dead13j = GLF_dead13k; GLF_dead13j < GLF_dead13MATRIX_N; GLF_dead13j++) {
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = vec4(18.28, vec3(-594.451, 633.825, 1784.7701));
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                    bool donor_replacementGLF_dead21c1 = _GLF_FUZZED(false);
                                    bool donor_replacementGLF_dead21c2 = _GLF_FUZZED(true);
                                    bool donor_replacementGLF_dead21c3 = _GLF_FUZZED((ivec4(-15380, 80033, -42992, -9945) == ivec4(45525, 73256, -9873, -32890)));
                                    bool donor_replacementGLF_dead21c4 = _GLF_FUZZED((153639u > 166186u));
                                    vec3 donor_replacementGLF_dead21col = _GLF_FUZZED(floor(vec3(-3.7, -7.9, -9413.8648)));
                                    vec2 donor_replacementGLF_dead21uv = _GLF_FUZZED(asin(vec2(3853.7084, -7.7)));
                                    if (!donor_replacementGLF_dead21c1 && !donor_replacementGLF_dead21c2 && !donor_replacementGLF_dead21c3 && donor_replacementGLF_dead21c4) {
                                        float GLF_dead21stripe = GLF_dead21compute_stripe(tan((donor_replacementGLF_dead21uv.x + donor_replacementGLF_dead21uv.y) * 20.0));
                                        donor_replacementGLF_dead21col = mix(vec3(donor_replacementGLF_dead21uv.x, .8, 0), vec3(1, donor_replacementGLF_dead21uv.y, 0), GLF_dead21stripe);
                                        GLF_dead21_GLF_color = vec4(donor_replacementGLF_dead21col, 1.0);
                                        return;
                                    }
                                }
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                            _GLF_color = GLF_live6m24[0];
                            if (_GLF_DEAD(false)) {
                                ivec2 donor_replacementGLF_dead19p = _GLF_FUZZED((ivec2(30267, -51216) << ((GLF_dead13k << GLF_dead13k) / findLSB(ivec2(77863, 98878)))));
                                for (GLF_dead13MATRIX_N = 0; GLF_dead13MATRIX_N < 100; GLF_dead13MATRIX_N++) {
                                    donor_replacementGLF_dead19p = GLF_dead19iter(donor_replacementGLF_dead19p);
                                }
                            }
                        }
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            if (_GLF_DEAD(false)) {
                                bool donor_replacementGLF_dead21c1 = _GLF_FUZZED(true);
                                bool donor_replacementGLF_dead21c2 = _GLF_FUZZED(false);
                                vec3 donor_replacementGLF_dead21col = _GLF_FUZZED((GLF_live6m33 * vec3(40.73, -9.5, -1752.5055)));
                                vec2 donor_replacementGLF_dead21uv = _GLF_FUZZED(resolution);
                                if (!donor_replacementGLF_dead21c1 && donor_replacementGLF_dead21c2) {
                                    float GLF_dead21stripe = GLF_dead21compute_stripe(tan((donor_replacementGLF_dead21uv.x + donor_replacementGLF_dead21uv.y) * 20.0));
                                    donor_replacementGLF_dead21col = mix(vec3(0.5, donor_replacementGLF_dead21uv.x, 0.1), vec3(.4, 0, .5), GLF_dead21stripe);
                                    GLF_dead21_GLF_color = vec4(donor_replacementGLF_dead21col, 1.0);
                                    return;
                                }
                            }
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                bool donor_replacementGLF_dead21c1 = _GLF_FUZZED(false);
                                vec3 donor_replacementGLF_dead21col = _GLF_FUZZED(vec3(-1.6, 74.05, -47.22));
                                vec2 donor_replacementGLF_dead21uv = _GLF_FUZZED(resolution);
                                if (donor_replacementGLF_dead21c1) {
                                    float GLF_dead21stripe = GLF_dead21compute_stripe(cos((donor_replacementGLF_dead21uv.x + donor_replacementGLF_dead21uv.y) * 20.0));
                                    donor_replacementGLF_dead21col = mix(vec3(donor_replacementGLF_dead21uv.x, 0, 0.75), vec3(.8, .7, donor_replacementGLF_dead21uv.x), GLF_dead21stripe);
                                    GLF_dead21_GLF_color = vec4(donor_replacementGLF_dead21col, 1.0);
                                    return;
                                }
                            }
                            _GLF_color = vec4(6421.2646, -7.8, 6.2, 8.4);
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            vec2 donor_replacementGLF_dead20coord = _GLF_FUZZED((vec2(6.6, -81.64) / time));
                            vec2 donor_replacementGLF_dead20uvstep = _GLF_FUZZED(radians(resolution));
                            {
                                donor_replacementGLF_dead20coord -= donor_replacementGLF_dead20uvstep;
                                h_r += s_g;
                                s_g = texture(GLF_dead20tex, donor_replacementGLF_dead20coord).y;
                                msb8++;
                            }
                        }
                        for (int GLF_dead13a = GLF_dead13MATRIX_N - 1; GLF_dead13a >= GLF_dead13k; GLF_dead13a--) {
                            h_r += GLF_dead2gl_FragCoord[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13a, 4)] * GLF_live6m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13a, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13j, 4)];
                        }
                        s_g = h_r * h_r;
                        for (int GLF_dead13a = GLF_dead13MATRIX_N - 1; GLF_dead13a >= GLF_dead13k; GLF_dead13a--) {
                            {
                                int GLF_live15result = _GLF_FUZZED(14351);
                                int GLF_live15sum = _GLF_FUZZED(-95555);
                                if (GLF_live15result > 0) {
                                    GLF_live15sum += GLF_live15result;
                                } else {
                                    switch (GLF_live15result) {
                                        case -1:
                                            if (_GLF_DEAD(false)) {
                                                vec2 donor_replacementGLF_dead20coord = _GLF_FUZZED(acosh(injectionSwitch));
                                                vec2 donor_replacementGLF_dead20uvstep = _GLF_FUZZED(resolution);
                                                {
                                                    donor_replacementGLF_dead20coord -= donor_replacementGLF_dead20uvstep;
                                                    b_b += angle;
                                                    s_g = texture(GLF_dead20tex, donor_replacementGLF_dead20coord).y;
                                                    msb8++;
                                                }
                                            }
                                            GLF_live15sum += 1;
                                            break;
                                        case 0:
                                            ;
                                    }
                                }
                            }
                            GLF_live6m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13a, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13j, 4)] = GLF_live6m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13a, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13j, 4)] - (s_g * GLF_dead2gl_FragCoord[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13a, 4)]);
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            ivec2 donor_replacementGLF_dead19p = _GLF_FUZZED(ivec2(74547, 22306));
                            {
                                donor_replacementGLF_dead19p.y++;
                            }
                        }
                        h_r = 0.0;
                        s_g = 0.0;
                    }
                    if (_GLF_DEAD(false)) {
                        continue;
                    }
                    for (int GLF_dead13b = GLF_dead13MATRIX_N - 1; GLF_dead13b >= GLF_dead13k; GLF_dead13b--) {
                        h_r += GLF_dead2gl_FragCoord[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13b, 4)] * GLF_dead2gl_FragCoord[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13b, 4)];
                        if (_GLF_DEAD(false)) {
                            vec2 donor_replacementGLF_dead20coord = _GLF_FUZZED(vec2(-49.05, -628.089));
                            vec2 donor_replacementGLF_dead20uvstep = _GLF_FUZZED(injectionSwitch);
                            {
                                donor_replacementGLF_dead20coord -= donor_replacementGLF_dead20uvstep;
                                s_g += h_r;
                                b_b = texture(GLF_dead20tex, donor_replacementGLF_dead20coord).y;
                                GLF_dead13k++;
                            }
                        }
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = vec4(-60.15, -7.5, -3.9, 5.5);
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                    }
                    s_g = h_r * h_r;
                    for (int GLF_dead13b = GLF_dead13MATRIX_N - 1; GLF_dead13b >= GLF_dead13k; GLF_dead13b--) {
                        GLF_dead2gl_FragCoord[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13b, 4)] = GLF_dead2gl_FragCoord[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13b, 4)] - (s_g * GLF_dead2gl_FragCoord[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13b, 4)]);
                    }
                    h_r = 0.0;
                    if (_GLF_DEAD(false)) {
                        ivec2 donor_replacementGLF_dead19p = _GLF_FUZZED((ivec2(-49453, 82611) ^ GLF_dead13k));
                        while (donor_replacementGLF_dead19p.x > 15) {
                            donor_replacementGLF_dead19p.x -= 16;
                        }
                    }
                    angle = 0.0;
                    h_r = 0.0;
                    h_r = 0.0;
                    s_g = 0.0;
                }
            }
            {
                _GLF_struct_69 _GLF_struct_replacement_69 = _GLF_struct_69(_GLF_struct_70(mat4x3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), mat2x3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0), _GLF_struct_71(uvec2(1u, 1u), vec2(1.0, 1.0), mat3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), 1, ivec4(1, 1, 1, 1), mat3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0)), uvec4(1u, 1u, 1u, 1u)), mat2x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), vec2(1.0, 1.0), _GLF_FUZZED(28950), mat3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0));
                int GLF_live17iters = _GLF_FUZZED(-96762);
                int GLF_live17looplimiter0 = 0;
                int GLF_live17v = _GLF_FUZZED(69652);
                for (_GLF_struct_replacement_69.GLF_live17i = 0; _GLF_struct_replacement_69.GLF_live17i < GLF_live17iters; _GLF_struct_replacement_69.GLF_live17i++) {
                    if (GLF_live17looplimiter0 >= 3) {
                        break;
                    }
                    GLF_live17looplimiter0++;
                    {
                        GLF_live17v = (4 * GLF_live17v * (1000 - GLF_live17v)) / 1000;
                    }
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    if (float(GLF_live17iters) >= b_b) {
                        ;
                    }
                }
            }
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                _GLF_color = _GLF_struct_replacement_67._GLF_outVarBackup_GLF_color;
            }
        } while (_GLF_WRAPPED_LOOP(false));
    }
    if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
        {
            int GLF_live11i = _GLF_FUZZED(-95623);
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                {
                    {
                        ;
                    }
                    if (_GLF_DEAD(false)) {
                        if (mod(float(GLF_dead13MATRIX_N), b_b) <= 0.01) {
                            angle += 0.2;
                        }
                    }
                }
                if (_GLF_DEAD(false)) {
                    _GLF_color = _GLF_color;
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    ivec2 donor_replacementGLF_dead19p = _GLF_FUZZED(bitfieldInsert((ivec2(23914, -64322)), ivec2(89916, -41313), GLF_live11i, findLSB(54948u)));
                    if (donor_replacementGLF_dead19p.x < 0) {
                        donor_replacementGLF_dead19p.y++;
                    }
                }
                {
                    _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(msb8, 4)] -= (GLF_live6m44[_GLF_MAKE_IN_BOUNDS_INT(msb8, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live11i, 4)] * _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11i, 4)]);
                }
                {
                    int GLF_live15sum = _GLF_FUZZED(ivec3(51195, 50871, -93945).y);
                    int GLF_live15target = _GLF_FUZZED((75966 + (-98060)));
                    {
                        int GLF_live15result = GLF_live15search(GLF_live15target);
                        if (GLF_live15result > 0) {
                            GLF_live15sum += GLF_live15result;
                        } else {
                            switch (GLF_live15result) {
                                case -1:
                                    GLF_live15sum += 1;
                                    break;
                                case 0:
                                    ;
                            }
                        }
                    }
                }
            }
            int GLF_live11j = _GLF_FUZZED(-63136);
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(-8.9, 3048.3090, -66.62, -7.2);
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            int GLF_live11k = _GLF_FUZZED(18191);
            if (GLF_live11data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11i, 10)] < GLF_live11data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11j, 10)]) {
                GLF_live11temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11k++, 10)] = GLF_live11data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11i++, 10)];
            } else {
                GLF_live11temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11k++, 10)] = GLF_live11data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11j++, 10)];
            }
        }
        if (_GLF_DEAD(false)) {
            for (int GLF_dead13j = msb8; GLF_dead13j < GLF_dead13MATRIX_N; GLF_dead13j++) {
                for (int GLF_dead13a = GLF_dead13MATRIX_N - 1; GLF_dead13a >= msb8; GLF_dead13a--) {
                    s_g += GLF_dead2gl_FragCoord[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13a, 4)] * GLF_live6m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13a, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13j, 4)];
                }
                b_b = b_b * s_g;
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    _GLF_color = vec4(h_r, angle, b_b, GLF_live6one);
                }
                for (int GLF_dead13a = GLF_dead13MATRIX_N - 1; GLF_dead13a >= msb8; GLF_dead13a--) {
                    GLF_live6m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13a, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13j, 4)] = GLF_live6m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13a, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13j, 4)] - (b_b * GLF_dead2gl_FragCoord[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13a, 4)]);
                }
                s_g = 0.0;
                b_b = 0.0;
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                vec2 donor_replacementGLF_dead20coord = _GLF_FUZZED((resolution * (resolution / 324.571)));
                vec2 donor_replacementGLF_dead20uvstep = _GLF_FUZZED(vec2(-0.9, 345.541));
                {
                    donor_replacementGLF_dead20coord -= donor_replacementGLF_dead20uvstep;
                    b_b += h_r;
                    s_g = texture(GLF_dead20tex, donor_replacementGLF_dead20coord).y;
                    GLF_dead13MATRIX_N++;
                }
            }
        }
    } else {
        if (_GLF_DEAD(false)) {
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = (dFdyCoarse(vec4(-42.61, 43.94, -12.12, 2524.7272)) - vec4(-6636.3249, 8330.3189, -35.13, -2.8));
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                _GLF_color = tanh((vec3(6.0, -1.6, -359.431) * mat4x3(mat3x4(-164.936, -3.2, 962.579, -33.46, 225.848, -50.75, 637.340, -284.340, 2.3, 5.3, 36.89, -1.8))));
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < determinant(mat3(0.0, 0.0, 0.0, 0.0, 0.0, abs(0.0), 1.0, 1.0, 0.0)))))) {
                    vec3 donor_replacementGLF_dead21col = _GLF_FUZZED((-vec3(1.4, 9.9, -967.827)));
                    vec2 donor_replacementGLF_dead21uv = _GLF_FUZZED(tanh(injectionSwitch));
                    {
                        float GLF_dead21stripe = GLF_dead21compute_stripe(cos((donor_replacementGLF_dead21uv.x + donor_replacementGLF_dead21uv.y) * 20.0));
                        donor_replacementGLF_dead21col = mix(vec3(.7, sinh(donor_replacementGLF_dead21uv.x), donor_replacementGLF_dead21uv.x), vec3(.3, .5, donor_replacementGLF_dead21uv.x), GLF_dead21stripe);
                        GLF_dead21_GLF_color = vec4(donor_replacementGLF_dead21col, 1.0);
                        return;
                    }
                }
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                ivec2 donor_replacementGLF_dead19p = _GLF_FUZZED(ivec2(-36157, 41667));
                {
                    donor_replacementGLF_dead19p.y--;
                }
            }
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(-7924.1375, 9.6, 54.00, 1.5);
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        {
                            if (GLF_dead2gl_FragCoord[_GLF_MAKE_IN_BOUNDS_INT(msb8, 4)] >= 1.0) {
                                GLF_dead2gl_FragCoord[_GLF_MAKE_IN_BOUNDS_INT(msb8, 4)] = GLF_dead2gl_FragCoord[_GLF_MAKE_IN_BOUNDS_INT(msb8, 4)] * GLF_dead2gl_FragCoord[_GLF_MAKE_IN_BOUNDS_INT(msb8, 4)];
                            }
                            msb8++;
                        }
                    }
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            {
                ;
            }
        }
        {
            int GLF_live5looplimiter0 = 0;
            {
                int GLF_live15baseIndex = _GLF_FUZZED(((~((-96241) + 18885)) - 70790));
                int GLF_live15data = _GLF_FUZZED((89489 & (false ? (-12924) : (-647))));
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    ivec2 donor_replacementGLF_dead19p = _GLF_FUZZED(min(ivec2(15342, -70090), ivec2(10865, -92809)));
                    while (donor_replacementGLF_dead19p.x > 15) {
                        donor_replacementGLF_dead19p.x -= 16;
                    }
                }
                int GLF_live15treeIndex = _GLF_FUZZED(ivec2(62109, 66604).t);
                if (GLF_live15tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15baseIndex, 10)].leftIndex == -1) {
                    GLF_live15tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15baseIndex, 10)].leftIndex = GLF_live15treeIndex;
                    GLF_live15makeTreeNode(GLF_live15tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15treeIndex, 10)], GLF_live15data);
                    ;
                } else {
                    GLF_live15baseIndex = GLF_live15tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15baseIndex, 10)].leftIndex;
                    ;
                }
            }
            for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != (((0 << _GLF_IDENTITY(int(8), int(8))) | 0) >> _GLF_IDENTITY(int(7), int(7)))); _injected_loop_counter--) {
                if (_GLF_DEAD(false)) {
                    {
                        if ((GLF_live5looplimiter0 & 1) == 1) {
                            GLF_live5looplimiter0 = 3 * GLF_live5looplimiter0 + 1;
                        } else {
                            {
                                int GLF_live17looplimiter0 = 0;
                                int GLF_live17v = _GLF_FUZZED((ivec3(28474, -27997, -53972) + ivec3(-63235, -39646, -3129)).p);
                                {
                                    if (GLF_live17looplimiter0 >= 3) {
                                        ;
                                    }
                                    GLF_live17looplimiter0++;
                                    {
                                        GLF_live17v = (4 * GLF_live17v * (1000 - GLF_live17v)) / 1000;
                                    }
                                }
                            }
                            GLF_live5looplimiter0 /= 2;
                        }
                        msb8++;
                    }
                }
                if (GLF_live5looplimiter0 >= 5) {
                    ;
                }
            }
        }
    }
    vec3 point1;
    if (_GLF_DEAD(false)) {
        vec2 donor_replacementGLF_dead20coord = _GLF_FUZZED((h_r / injectionSwitch));
        float donor_replacementGLF_dead20slope = _GLF_FUZZED(intBitsToFloat(abs(msb8)));
        vec2 donor_replacementGLF_dead20uvstep = _GLF_FUZZED(vec2(3.0, 287.083));
        {
            donor_replacementGLF_dead20coord -= donor_replacementGLF_dead20uvstep;
            b_b += donor_replacementGLF_dead20slope;
            h_r = texture(GLF_dead20tex, donor_replacementGLF_dead20coord).y;
            msb8++;
        }
    }
    point1 = computePoint(rotationMatrix);
    {
        int GLF_live17looplimiter0 = 0;
        int GLF_live17v = _GLF_FUZZED((94589 * (-51347)));
        if (_GLF_DEAD(false)) {
            ivec2 donor_replacementGLF_dead19p = _GLF_FUZZED((mat4x2(-51.95, 63.75, 54.33, 2439.8380, 4.8, -9.1, 2.4, 6.0), ivec2(-99836, 31569)));
            {
                donor_replacementGLF_dead19p.x = -donor_replacementGLF_dead19p.x;
            }
        }
        {
            if (GLF_live17looplimiter0 >= 3) {
                ;
            }
            GLF_live17looplimiter0++;
            {
                GLF_live17v = (4 * GLF_live17v * (1000 - GLF_live17v)) / 1000;
            }
        }
    }
    if (_GLF_DEAD(false)) {
        for (int GLF_dead13i = (GLF_dead13MATRIX_N - 1); GLF_dead13i >= 0; GLF_dead13i--) {
            for (int GLF_dead13j = (GLF_dead13MATRIX_N - 1); GLF_dead13j >= (GLF_dead13i + 1); GLF_dead13j--) {
                GLF_dead2gl_FragCoord[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13i, 4)] -= (GLF_live6m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13i, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13j, 4)] * GLF_dead2gl_FragCoord[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13j, 4)]);
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                vec2 donor_replacementGLF_dead20coord = _GLF_FUZZED((resolution - vec2(-4.6, 321.981)));
                vec2 donor_replacementGLF_dead20uvstep = _GLF_FUZZED(resolution);
                {
                    donor_replacementGLF_dead20coord -= donor_replacementGLF_dead20uvstep;
                    s_g += s_g;
                    h_r = texture(GLF_dead20tex, donor_replacementGLF_dead20coord).y;
                    msb8++;
                }
            }
            GLF_dead2gl_FragCoord[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13i, 4)] /= GLF_live6m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13i, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13i, 4)];
        }
    }
    mat2 rotationMatrix2;
    if (_GLF_DEAD(false)) {
        vec2 donor_replacementGLF_dead12a = _GLF_FUZZED(resolution);
        {
            h_r = donor_replacementGLF_dead12a.y / donor_replacementGLF_dead12a.x;
            {
                {
                    vec3 GLF_live16c = _GLF_FUZZED(((-955.283) + vec3(9659.3802, -5.8, 4.0)));
                    int GLF_live16looplimiter1 = 0;
                    for (int GLF_live16i = 0; GLF_live16i < 3; GLF_live16i++) {
                        if (GLF_live16looplimiter1 >= 3) {
                            break;
                        }
                        GLF_live16looplimiter1++;
                        {
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                vec2 donor_replacementGLF_dead20coord = _GLF_FUZZED((uvec2(177281u, 49497u), vec2(-77.23, 763.519)));
                                while (b_b < angle && msb8 < 32) {
                                    donor_replacementGLF_dead20coord -= donor_replacementGLF_dead12a;
                                    angle += s_g;
                                    b_b = texture(GLF_dead20tex, donor_replacementGLF_dead20coord).y;
                                    msb8++;
                                }
                            }
                            if (GLF_live16c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live16i, 3)] >= 1.0) {
                                if (_GLF_DEAD(false)) {
                                    bool donor_replacementGLF_dead21c1 = _GLF_FUZZED(true);
                                    bool donor_replacementGLF_dead21c2 = _GLF_FUZZED(((152561u % uvec3(98190u, 199847u, 194780u)) != uvec3(63430u, 92121u, 77279u)));
                                    bool donor_replacementGLF_dead21c3 = _GLF_FUZZED(false);
                                    bool donor_replacementGLF_dead21c4 = _GLF_FUZZED(false);
                                    if (!donor_replacementGLF_dead21c1 && !donor_replacementGLF_dead21c2 && !donor_replacementGLF_dead21c3 && donor_replacementGLF_dead21c4) {
                                        float GLF_dead21stripe = GLF_dead21compute_stripe(tan((donor_replacementGLF_dead12a.x + donor_replacementGLF_dead12a.y) * 20.0));
                                        GLF_live16c = mix(vec3(donor_replacementGLF_dead12a.x, .8, 0), vec3(1, donor_replacementGLF_dead12a.y, 0), GLF_dead21stripe);
                                        GLF_dead21_GLF_color = vec4(GLF_live16c, 1.0);
                                        return;
                                    }
                                }
                                GLF_live16c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live16i, 3)] = GLF_live16c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live16i, 3)] * GLF_live16c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live16i, 3)];
                            }
                        }
                        if (_GLF_DEAD(false)) {
                            {
                                float GLF_dead21stripe = GLF_dead21compute_stripe(cos((donor_replacementGLF_dead12a.x + donor_replacementGLF_dead12a.y) * 20.0));
                                point1 = mix(vec3(.7, sinh(donor_replacementGLF_dead12a.x), donor_replacementGLF_dead12a.x), vec3(.3, .5, donor_replacementGLF_dead12a.x), GLF_dead21stripe);
                                GLF_dead21_GLF_color = vec4(point1, 1.0);
                                return;
                            }
                        }
                    }
                }
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(-49.08, 5.1, -206.357, -7.5);
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
        }
    }
    rotationMatrix2 = rotationMatrix * rotationMatrix;
    vec3 point2;
    point2 = computePoint(rotationMatrix2);
    mat2 rotationMatrix3;
    if (_GLF_WRAPPED_IF_FALSE(false)) {
    } else {
        rotationMatrix3 = rotationMatrix * rotationMatrix * rotationMatrix;
    }
    if (_GLF_DEAD(false)) {
        vec2 donor_replacementGLF_dead21uv = _GLF_FUZZED(resolution);
        {
            float GLF_dead21stripe = GLF_dead21compute_stripe(tan((donor_replacementGLF_dead21uv.x + donor_replacementGLF_dead21uv.y) * 20.0));
            point1 = mix(vec3(donor_replacementGLF_dead21uv.x, .8, 0), vec3(1, donor_replacementGLF_dead21uv.y, 0), GLF_dead21stripe);
            GLF_dead21_GLF_color = vec4(point1, 1.0);
            return;
        }
    }
    if (_GLF_DEAD(false)) {
        _GLF_color = sin(_GLF_color);
    }
    vec3 point3;
    for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != ((1 << _GLF_IDENTITY(int(6), _GLF_IDENTITY(int(6), (int(6)) >> 0))) >> _GLF_IDENTITY(int(6), int(6)))); _injected_loop_counter++) {
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            point3 = computePoint(rotationMatrix3);
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                _GLF_color = resolution.rrrg;
                {
                    {
                        {
                            ;
                        }
                    }
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = fwidthFine(vec4(-5353.2502, 5010.9066, 23.29, -5.7));
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
            }
        } else {
        }
    }
    vec3 mixed;
    mixed = mix(point1, point2, vec3(0.3));
    if (_GLF_DEAD(false)) {
        vec2 donor_replacementGLF_dead20coord = _GLF_FUZZED(fwidthFine(vec2(-8.4, 355.179)));
        vec2 donor_replacementGLF_dead20uvstep = _GLF_FUZZED(mod(injectionSwitch, h_r));
        {
            donor_replacementGLF_dead20coord -= donor_replacementGLF_dead20uvstep;
            h_r += b_b;
            h_r = texture(GLF_dead20tex, donor_replacementGLF_dead20coord).y;
            GLF_dead13MATRIX_N++;
        }
    }
    {
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        _GLF_color = vec4(-6691.9412, 9032.6565, 900.852, 4596.9277);
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
    }
    if (_GLF_DEAD(false)) {
        vec2 donor_replacementGLF_dead20coord = _GLF_FUZZED(mat4x2(87.62, 210.720, 4730.9360, -9571.8622, -0.9, 7.7, 0.1, 6678.2907)[2]);
        vec2 donor_replacementGLF_dead20uvstep = _GLF_FUZZED(resolution);
        while (angle < angle && GLF_dead13MATRIX_N < 32) {
            donor_replacementGLF_dead20coord -= donor_replacementGLF_dead20uvstep;
            angle += s_g;
            angle = texture(GLF_dead20tex, donor_replacementGLF_dead20coord).y;
            GLF_dead13MATRIX_N++;
        }
    }
    mixed = mix(mixed, point3, vec3(0.3));
    _GLF_color = vec4(mixed, float(bitCount(msb8)));
}
