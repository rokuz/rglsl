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

struct _GLF_struct_34 {
    int GLF_live12looplimiter0;
    mat3x4 _f0;
    vec2 _f1;
    bool _f2;
};

struct _GLF_struct_33 {
    uvec2 _f0;
    bvec2 _f1;
    mat2x3 _f2;
    mat4x2 _f3;
    _GLF_struct_34 _f4;
    mat4 _f5;
};

struct _GLF_struct_37 {
    vec4 _GLF_outVarBackup_GLF_color;
    mat4 _f0;
    mat2x4 _f1;
};

struct _GLF_struct_36 {
    mat4x3 _f0;
    bvec2 _f1;
    _GLF_struct_37 _f2;
    uvec2 _f3;
};

struct _GLF_struct_35 {
    _GLF_struct_36 _f0;
    ivec2 _f1;
    ivec2 _f2;
    vec2 _f3;
    uvec3 _f4;
};

struct _GLF_struct_38 {
    int GLF_live14looplimiter0;
    mat3 _f0;
};

struct _GLF_struct_39 {
    vec2 GLF_live14coord;
    ivec3 _f0;
};

struct _GLF_struct_42 {
    float GLF_live14h;
    bvec2 _f0;
    mat4x2 _f1;
};

struct _GLF_struct_41 {
    _GLF_struct_42 _f0;
};

struct _GLF_struct_40 {
    _GLF_struct_41 _f0;
    mat3 _f1;
    ivec3 _f2;
    float _f3;
};

struct _GLF_struct_45 {
    vec3 _f0;
    uvec2 _f1;
};

struct _GLF_struct_44 {
    mat3x4 _f0;
    ivec4 _f1;
    mat4x2 _f2;
};

struct _GLF_struct_43 {
    int GLF_live8looplimiter0;
    _GLF_struct_44 _f0;
    bvec4 _f1;
    mat4x2 _f2;
    _GLF_struct_45 _f3;
    int _f4;
};

struct _GLF_struct_49 {
    mat2 _f0;
    bvec2 _f1;
    float GLF_live14h;
    uvec2 _f2;
};

struct _GLF_struct_48 {
    mat3x2 _f0;
    mat3x4 _f1;
    int _f2;
    vec4 _f3;
    ivec4 _f4;
};

struct _GLF_struct_47 {
    _GLF_struct_48 _f0;
    _GLF_struct_49 _f1;
};

struct _GLF_struct_46 {
    _GLF_struct_47 _f0;
    bvec2 _f1;
    float _f2;
    mat4x3 _f3;
};

struct _GLF_struct_54 {
    mat3 _f0;
    uvec4 _f1;
    bvec3 _f2;
    mat3x4 _f3;
    mat4 _f4;
    uvec3 _f5;
};

struct _GLF_struct_53 {
    ivec4 _f0;
    mat3 _f1;
};

struct _GLF_struct_52 {
    uint _f0;
    mat4x3 _f1;
    vec2 _f2;
    mat4x3 _f3;
};

struct _GLF_struct_51 {
    _GLF_struct_52 _f0;
    mat2 _f1;
    mat2x3 _f2;
    _GLF_struct_53 _f3;
    bvec4 _f4;
    int GLF_live9looplimiter0;
    float _f5;
    _GLF_struct_54 _f6;
};

struct _GLF_struct_50 {
    float _f0;
    _GLF_struct_51 _f1;
    ivec4 _f2;
};

struct _GLF_struct_58 {
    mat4x2 _f0;
};

struct _GLF_struct_57 {
    mat3 _f0;
    vec2 _f1;
    uvec3 _f2;
    mat2x3 _f3;
    int _f4;
};

struct _GLF_struct_56 {
    float GLF_live14h;
    mat3x4 _f0;
    _GLF_struct_57 _f1;
    uint _f2;
    _GLF_struct_58 _f3;
    bvec4 _f4;
};

struct _GLF_struct_55 {
    bvec2 _f0;
    bvec2 _f1;
    int _f2;
    bvec4 _f3;
    _GLF_struct_56 _f4;
};

struct _GLF_struct_63 {
    bvec4 _f0;
    mat3x4 _f1;
    uvec2 _f2;
};

struct _GLF_struct_62 {
    ivec4 _f0;
    mat4x3 _f1;
    mat2x3 _f2;
    ivec3 _f3;
    mat2 _f4;
    int GLF_live14i;
    mat2x3 _f5;
    mat2 _f6;
};

struct _GLF_struct_61 {
    mat4 _f0;
    _GLF_struct_62 _f1;
    uvec2 _f2;
    uvec2 _f3;
    bvec4 _f4;
};

struct _GLF_struct_60 {
    ivec3 _f0;
    uvec3 _f1;
    vec4 _f2;
    bool _f3;
    mat2 _f4;
    bvec4 _f5;
};

struct _GLF_struct_59 {
    vec2 _f0;
    _GLF_struct_60 _f1;
    int _f2;
    _GLF_struct_61 _f3;
    uvec2 _f4;
    _GLF_struct_63 _f5;
    ivec4 _f6;
};

struct _GLF_struct_68 {
    uint _f0;
};

struct _GLF_struct_67 {
    mat2x3 _f0;
    mat3x4 _f1;
    vec3 _f2;
    float _f3;
    vec4 _f4;
    bool _f5;
    mat2x3 _f6;
};

struct _GLF_struct_66 {
    vec3 _f0;
    mat3 _f1;
};

struct _GLF_struct_65 {
    _GLF_struct_66 _f0;
    _GLF_struct_67 _f1;
    int _f2;
    _GLF_struct_68 _f3;
    mat4x3 _f4;
};

struct _GLF_struct_64 {
    _GLF_struct_65 _f0;
    float GLF_live14slope;
};

struct _GLF_struct_73 {
    bvec2 _f0;
    vec2 _f1;
    bvec2 _f2;
    mat4x2 _f3;
};

struct _GLF_struct_72 {
    uvec2 _f0;
    mat2 _f1;
    mat3x2 _f2;
    _GLF_struct_73 _f3;
};

struct _GLF_struct_71 {
    ivec3 _f0;
    mat2 _f1;
};

struct _GLF_struct_70 {
    mat3x4 _f0;
    _GLF_struct_71 _f1;
};

struct _GLF_struct_69 {
    _GLF_struct_70 _f0;
    uint _f1;
    _GLF_struct_72 _f2;
    int GLF_live10i;
};

struct _GLF_struct_76 {
    mat3 _f0;
    bool _f1;
    uint _f2;
    bvec2 _f3;
    bool _f4;
};

struct _GLF_struct_75 {
    mat2x4 _f0;
    bvec2 _f1;
    uvec4 _f2;
    bool _f3;
    _GLF_struct_76 _f4;
    uint _f5;
    uvec4 _f6;
};

struct _GLF_struct_74 {
    vec4 _f0;
    float GLF_live14h;
    bvec3 _f1;
    vec3 _f2;
    _GLF_struct_75 _f3;
    int _f4;
};

struct _GLF_struct_77 {
    uvec4 _f0;
    uint _f1;
    mat4 _f2;
    uvec3 _f3;
    vec4 GLF_live7texel;
    vec3 _f4;
};

struct _GLF_struct_80 {
    mat3x2 _f0;
    bool _f1;
    uvec2 _f2;
};

struct _GLF_struct_79 {
    _GLF_struct_80 _f0;
    float _f1;
    mat3 _f2;
    mat2x3 _f3;
    uint _f4;
    uint _f5;
};

struct _GLF_struct_78 {
    _GLF_struct_79 _f0;
    vec4 _f1;
    bvec2 _f2;
    float GLF_live9slope;
};

struct _GLF_struct_81 {
    mat4x2 _f0;
    float _f1;
    uvec2 _f2;
    bool c6;
    int _f3;
};

struct _GLF_struct_82 {
    ivec2 _f0;
    vec4 _GLF_outVarBackup_GLF_color;
};

struct _GLF_struct_86 {
    mat2x3 _f0;
    mat4 _f1;
};

struct _GLF_struct_85 {
    uvec2 _f0;
    float _f1;
    vec3 _f2;
    float _f3;
    bvec2 _f4;
};

struct _GLF_struct_84 {
    uvec3 _f0;
    bool _f1;
    float _f2;
};

struct _GLF_struct_83 {
    _GLF_struct_84 _f0;
    mat3x4 _f1;
    vec2 GLF_live14coord;
    float _f2;
    uvec4 _f3;
    _GLF_struct_85 _f4;
    _GLF_struct_86 _f5;
    mat4 _f6;
};

struct _GLF_struct_88 {
    vec4 _GLF_outVarBackup_GLF_color;
    uvec4 _f0;
};

struct _GLF_struct_87 {
    _GLF_struct_88 _f0;
    uvec2 _f1;
    bvec4 _f2;
};

struct _GLF_struct_90 {
    mat4 _f0;
    ivec4 _f1;
    float GLF_live13y;
};

struct _GLF_struct_89 {
    mat4 _f0;
    uvec2 _f1;
    _GLF_struct_90 _f2;
    bvec2 _f3;
};

struct _GLF_struct_92 {
    mat3x4 _f0;
    mat3x4 _f1;
    vec4 _f2;
    ivec2 _f3;
};

struct _GLF_struct_91 {
    float GLF_live13x_new;
    mat3x2 _f0;
    float _f1;
    bvec4 _f2;
    uvec2 _f3;
    _GLF_struct_92 _f4;
    ivec2 _f5;
};

struct _GLF_struct_97 {
    ivec4 _f0;
    float _f1;
    mat3x2 _f2;
    ivec4 _f3;
    ivec4 _f4;
    bvec2 _f5;
    uvec3 _f6;
};

struct _GLF_struct_96 {
    uvec3 _f0;
    vec4 _f1;
    uint _f2;
    ivec4 _f3;
};

struct _GLF_struct_95 {
    mat4x2 _f0;
    bvec4 _f1;
    uvec3 _f2;
    vec4 _GLF_outVarBackup_GLF_color;
    mat4x2 _f3;
    mat2x4 _f4;
    mat4 _f5;
    bvec4 _f6;
};

struct _GLF_struct_94 {
    vec4 _f0;
    ivec2 _f1;
    _GLF_struct_95 _f2;
    ivec2 _f3;
    _GLF_struct_96 _f4;
};

struct _GLF_struct_93 {
    vec3 _f0;
    _GLF_struct_94 _f1;
    mat3x4 _f2;
    _GLF_struct_97 _f3;
    uvec2 _f4;
};

struct _GLF_struct_98 {
    float GLF_live12grey;
    mat4x2 _f0;
};

struct _GLF_struct_99 {
    float GLF_live14refh;
    mat4x3 _f0;
};

struct _GLF_struct_107 {
    mat4 _f0;
    vec3 _f1;
    vec3 _f2;
    bool _f3;
};

struct _GLF_struct_106 {
    float GLF_live14h;
    mat2x3 _f0;
    vec2 _f1;
    vec4 _f2;
    mat3x4 _f3;
};

struct _GLF_struct_105 {
    vec3 _f0;
    mat4x2 _f1;
};

struct _GLF_struct_104 {
    int _f0;
    _GLF_struct_105 _f1;
    _GLF_struct_106 _f2;
    _GLF_struct_107 _f3;
};

struct _GLF_struct_103 {
    uvec4 _f0;
    bool _f1;
    uvec2 _f2;
    ivec4 _f3;
};

struct _GLF_struct_102 {
    mat3x4 _f0;
    mat2x3 _f1;
    mat4x2 _f2;
};

struct _GLF_struct_101 {
    uint _f0;
    mat2x3 _f1;
    _GLF_struct_102 _f2;
    _GLF_struct_103 _f3;
    uvec2 _f4;
};

struct _GLF_struct_100 {
    vec2 _f0;
    vec4 _f1;
    ivec4 _f2;
    _GLF_struct_101 _f3;
    mat2 _f4;
    _GLF_struct_104 _f5;
    bvec2 _f6;
};

struct _GLF_struct_110 {
    float GLF_live14slope;
    mat2x4 _f0;
    float _f1;
    bvec2 _f2;
    bvec2 _f3;
};

struct _GLF_struct_109 {
    _GLF_struct_110 _f0;
    bool _f1;
    ivec4 _f2;
};

struct _GLF_struct_108 {
    _GLF_struct_109 _f0;
    vec4 _f1;
    vec4 _f2;
    vec4 _f3;
    bool _f4;
    mat4x2 _f5;
};

struct _GLF_struct_116 {
    uint _f0;
    vec3 _f1;
};

struct _GLF_struct_115 {
    vec4 _GLF_outVarBackup_GLF_color;
    _GLF_struct_116 _f0;
};

struct _GLF_struct_114 {
    mat3x2 _f0;
    float _f1;
    vec3 _f2;
};

struct _GLF_struct_113 {
    bvec4 _f0;
    vec2 _f1;
    mat3 _f2;
};

struct _GLF_struct_112 {
    _GLF_struct_113 _f0;
    uvec4 _f1;
    _GLF_struct_114 _f2;
};

struct _GLF_struct_111 {
    uvec3 _f0;
    _GLF_struct_112 _f1;
    _GLF_struct_115 _f2;
};

struct _GLF_struct_117 {
    vec2 GLF_live14coord;
    uvec2 _f0;
    uvec3 _f1;
    vec2 _f2;
    bool _f3;
};

struct _GLF_struct_118 {
    vec4 _GLF_outVarBackup_GLF_color;
    ivec4 _f0;
    vec3 _f1;
    vec2 _f2;
    int _f3;
    mat4x3 _f4;
};

struct _GLF_struct_120 {
    vec2 GLF_live6v;
    vec4 _f0;
    vec3 _f1;
    vec2 _f2;
};

struct _GLF_struct_119 {
    _GLF_struct_120 _f0;
};

vec4 GLF_live12gl_FragCoord = _GLF_FUZZED((vec4(3.3, 1142.8318, 1.1, -5.6) * 25.43));
const int GLF_live12N = 10;
int GLF_live12data[10] = int[10](_GLF_FUZZED((326)), _GLF_FUZZED(-84757), _GLF_FUZZED(83077), _GLF_FUZZED(30388), _GLF_FUZZED(((-90488) + (-66790))), _GLF_FUZZED(29565), _GLF_FUZZED(int((64043u + 49925u))), _GLF_FUZZED(-93472), _GLF_FUZZED(-5968), _GLF_FUZZED(int((bvec2(true, true) == bvec2(false, false))))), GLF_live12temp[10] = int[10](_GLF_FUZZED(((94357 - (-19195)) + (-50288))), _GLF_FUZZED(70196), _GLF_FUZZED((~49329)), _GLF_FUZZED(-89411), _GLF_FUZZED(((uvec2(23571u, 170938u).g == 23338u) ? (-43652) : 44353)), _GLF_FUZZED((97226)), _GLF_FUZZED(ivec2(18681, -90434).x), _GLF_FUZZED(-3672), _GLF_FUZZED((((mat2x4(-42.60, -5771.2568, 8.5, 7549.0938, 550.215, 3.9, -5721.1774, 9740.2328) * mat2(-7840.4497, 585.005, -8.7, -59.10)) == mat2x4(-51.11, -1079.5153, -8458.3564, 2.3, 163.027, 4.1, 6.9, -6.8)) ? 75708 : (-81457))), _GLF_FUZZED(int(198164u)));

void GLF_live12merge(int GLF_live12from, int GLF_live12mid, int GLF_live12to) {
    int GLF_live12k = GLF_live12from, GLF_live12i = GLF_live12from, GLF_live12j = GLF_live12mid + 1;
    {
        int GLF_live12looplimiter0 = 0;
        while (GLF_live12i <= GLF_live12mid && GLF_live12j <= GLF_live12to) {
            if (GLF_live12looplimiter0 >= 4) {
                break;
            }
            GLF_live12looplimiter0++;
            {
                if (GLF_live12data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12i, 10)] < GLF_live12data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12j, 10)]) {
                    GLF_live12temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12k++, 10)] = GLF_live12data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12i++, 10)];
                } else {
                    GLF_live12temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12k++, 10)] = GLF_live12data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12j++, 10)];
                }
            }
        }
    }
    {
        int GLF_live12looplimiter1 = 0;
        while (GLF_live12i < GLF_live12N && GLF_live12i <= GLF_live12mid) {
            if (GLF_live12looplimiter1 >= 4) {
                break;
            }
            GLF_live12looplimiter1++;
            {
                GLF_live12temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12k++, 10)] = GLF_live12data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12i++, 10)];
            }
        }
    }
    {
        int GLF_live12looplimiter2 = 0;
        for (int GLF_live12i = GLF_live12from; GLF_live12i <= GLF_live12to; GLF_live12i++) {
            if (GLF_live12looplimiter2 >= 4) {
                break;
            }
            GLF_live12looplimiter2++;
            {
                GLF_live12data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12i, 10)] = GLF_live12temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12i, 10)];
            }
        }
    }
}

layout(set = 0, binding = 2) uniform sampler2D GLF_live14tex;

struct _GLF_struct_11 {
    bool _f0;
};

struct _GLF_struct_10 {
    vec4 _GLF_outVarBackup_GLF_color;
    _GLF_struct_11 _f0;
};

struct _GLF_struct_15 {
    uint _f0;
    mat2x4 _f1;
    mat4x2 _f2;
    mat3x2 _f3;
    uint _f4;
};

struct _GLF_struct_14 {
    bool _f0;
    ivec4 _f1;
    mat3x4 _f2;
    mat4 _f3;
};

struct _GLF_struct_13 {
    ivec3 _f0;
    mat3x2 _f1;
    ivec4 _f2;
    uvec2 _f3;
    int _f4;
    _GLF_struct_14 _f5;
    _GLF_struct_15 _f6;
};

struct _GLF_struct_12 {
    _GLF_struct_13 _f0;
    float GLF_live9refh;
    ivec4 _f1;
    vec3 _f2;
};

struct _GLF_struct_20 {
    bvec2 _f0;
};

struct _GLF_struct_19 {
    vec4 _f0;
    mat3 _f1;
};

struct _GLF_struct_18 {
    mat2x4 _f0;
    vec2 _f1;
    mat2x3 _f2;
    ivec2 _f3;
    bvec3 _f4;
    vec2 _f5;
};

struct _GLF_struct_17 {
    uvec2 _f0;
    _GLF_struct_18 _f1;
    _GLF_struct_19 _f2;
    _GLF_struct_20 _f3;
};

struct _GLF_struct_16 {
    _GLF_struct_17 _f0;
    vec4 _GLF_outVarBackup_GLF_color;
    bvec2 _f1;
    bool _f2;
    uvec4 _f3;
    mat4x2 _f4;
    vec2 _f5;
};

struct _GLF_struct_21 {
    ivec3 _f0;
    mat3x4 _f1;
    vec2 center;
    uvec2 _f2;
};

struct _GLF_struct_22 {
    int _f0;
    vec3 point1;
    ivec3 _f1;
    uvec3 _f2;
    uvec2 _f3;
    mat2 _f4;
    bool _f5;
    uvec2 _f6;
};

struct _GLF_struct_32 {
    ivec2 _f0;
    ivec4 _f1;
    mat2x4 _f2;
    mat3x4 _f3;
};

struct _GLF_struct_31 {
    bool _f0;
    bool _f1;
    uvec2 _f2;
    mat4x3 _f3;
};

struct _GLF_struct_30 {
    bool _f0;
    _GLF_struct_31 _f1;
    _GLF_struct_32 _f2;
};

struct _GLF_struct_29 {
    uint _f0;
    uvec2 _f1;
};

struct _GLF_struct_28 {
    mat4 _f0;
    _GLF_struct_29 _f1;
};

struct _GLF_struct_27 {
    mat4x2 _f0;
    uint _f1;
    mat2x4 _f2;
};

struct _GLF_struct_26 {
    ivec3 _f0;
    mat4x2 _f1;
    mat4x3 _f2;
    vec3 _f3;
    ivec3 _f4;
    vec3 _f5;
    mat3x4 _f6;
};

struct _GLF_struct_25 {
    _GLF_struct_26 _f0;
    ivec4 _f1;
    vec4 _f2;
    _GLF_struct_27 _f3;
    bvec4 _f4;
    uvec3 _f5;
    bvec2 _f6;
};

struct _GLF_struct_24 {
    bvec4 _f0;
};

struct _GLF_struct_23 {
    _GLF_struct_24 _f0;
    vec2 GLF_live9coord;
    uint _f1;
    _GLF_struct_25 _f2;
    _GLF_struct_28 _f3;
    _GLF_struct_30 _f4;
    mat3x4 _f5;
    mat4x2 _f6;
};

layout(set = 0, binding = 3) uniform sampler2D GLF_live7tex;
layout(set = 0, binding = 4) uniform sampler2D GLF_live8tex;
layout(set = 0, binding = 5) uniform sampler2D GLF_live9tex;

struct _GLF_struct_6 {
    bvec3 _f0;
};

struct _GLF_struct_5 {
    bool _f0;
    ivec2 _f1;
    uvec2 _f2;
    bvec4 _f3;
    ivec4 _f4;
    vec4 _GLF_outVarBackup_GLF_color;
    _GLF_struct_6 _f5;
};

struct _GLF_struct_9 {
    mat4 _f0;
    bvec3 _f1;
    ivec4 _f2;
    uvec3 _f3;
    vec3 _f4;
    mat3x2 _f5;
    uvec2 _f6;
};

struct _GLF_struct_8 {
    int _f0;
    vec4 _GLF_outVarBackup_GLF_color;
    mat3x2 _f1;
    _GLF_struct_9 _f2;
    bvec3 _f3;
};

struct _GLF_struct_7 {
    uint _f0;
    bvec3 _f1;
    bool _f2;
    bvec4 _f3;
    _GLF_struct_8 _f4;
    float _f5;
    bvec2 _f6;
};

struct _GLF_struct_3 {
    vec4 _f0;
    mat2x4 _f1;
};

struct _GLF_struct_2 {
    vec4 _f0;
    bool _f1;
    mat2x4 _f2;
    mat4x2 _f3;
    mat2x3 _f4;
    mat3 _f5;
    mat2x4 _f6;
};

struct _GLF_struct_1 {
    ivec4 _f0;
    _GLF_struct_2 _f1;
    bvec2 _f2;
};

struct _GLF_struct_0 {
    _GLF_struct_1 _f0;
    _GLF_struct_3 _f1;
    ivec3 _f2;
    vec2 _f3;
    bool _f4;
    bool c5;
    bvec2 _f5;
    uvec4 _f6;
};

struct _GLF_struct_4 {
    mat2x3 _f0;
    mat2 rotationMatrix2;
    float _f1;
};

layout(set = 0, binding = 6) uniform buf6 {
    vec2 injectionSwitch;
};

const int GLF_live0dp[256] = int[256](115, 133, 150, 164, 176, 184, 190, 192, 191, 187, 181, 172, 163, 153, 143, 134, 126, 120, 116, 114, 114, 117, 121, 127, 134, 141, 148, 154, 159, 162, 163, 161, 157, 151, 143, 134, 124, 113, 103, 94, 87, 82, 79, 80, 84, 91, 101, 114, 130, 146, 164, 182, 199, 215, 229, 240, 249, 254, 256, 254, 250, 243, 233, 223, 212, 200, 190, 180, 172, 166, 163, 161, 162, 164, 169, 174, 179, 185, 190, 193, 195, 195, 192, 188, 180, 171, 161, 149, 137, 125, 114, 105, 97, 93, 91, 93, 98, 106, 117, 130, 145, 161, 177, 193, 208, 221, 231, 239, 243, 244, 242, 236, 228, 218, 207, 194, 181, 169, 158, 148, 141, 135, 132, 131, 132, 135, 138, 143, 147, 151, 154, 155, 155, 152, 146, 139, 129, 118, 106, 93, 80, 68, 58, 49, 43, 40, 41, 44, 51, 61, 73, 87, 103, 119, 134, 149, 162, 173, 181, 186, 188, 186, 181, 174, 164, 153, 141, 128, 116, 104, 94, 86, 81, 77, 76, 77, 80, 84, 89, 94, 98, 102, 104, 104, 102, 98, 92, 83, 73, 62, 50, 38, 26, 16, 8, 2, 0, 0, 4, 11, 21, 33, 48, 64, 81, 98, 114, 129, 141, 151, 158, 161, 161, 158, 152, 144, 134, 123, 112, 100, 90, 81, 73, 68, 65, 65, 67, 70, 75, 81, 87, 92, 97, 101, 103, 102, 100, 95, 88, 79, 69, 58, 47, 36, 26, 18, 13, 11, 11, 15, 22, 32, 45, 60, 77, 94);
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

vec4 _GLF_outlined_15(vec4 _GLF_color) {
    return _GLF_color;
}

vec4 _GLF_outlined_44() {
    return fwidthFine(vec3(258.446, -5554.1000, 1.8)).xzyz;
}

vec4 _GLF_outlined_45() {
    return degrees(vec4(201.337, -4.1, 8.8, 89.91));
}

vec3 _GLF_outlined_0(float b_b, int msb8, float s_g, float h_r, vec2 resolution) {
    {
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = mat2x4(-859.024, -88.23, -887.636, -4.8, 0.9, 6.1, -3.3, 307.066)[0];
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        {
            int GLF_live3looplimiter0 = 0;
            if (GLF_live3looplimiter0 >= 5) {
                ;
            }
            {
                vec2 GLF_live7coord = _GLF_FUZZED((3131.1280 + vec2(-578.562, 9.4)));
                int GLF_live7i = _GLF_FUZZED(19578);
                if (_GLF_DEAD(false)) {
                    return vec3(1.0, 1.0, 1.0);
                    {
                        vec2 GLF_live11a = _GLF_FUZZED(vec2(-9263.9196, 279.442));
                        float GLF_live11z = _GLF_FUZZED(((-4.3) * 2642.4706));
                        {
                            GLF_live11z = GLF_live11a.x / GLF_live11a.y;
                        }
                    }
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(9.8, -3.5, -3.1, -90.17);
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                }
                vec4 GLF_live7texel = _GLF_FUZZED((vec4(2.4, 31.23, 55.10, 37.41) * (((-78.74) - (-4.7)))));
                {
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        {
                            int GLF_live12i = _GLF_FUZZED(-4930);
                            int GLF_live12j = _GLF_FUZZED(((-93756) & 94476));
                            int GLF_live12k = _GLF_FUZZED((ivec3(64446, 81249, 94756) - (ivec3(-54401, 98518, -30936) - 64206)).t);
                            _GLF_struct_33 _GLF_struct_replacement_33 = _GLF_struct_33(uvec2(1u, 1u), bvec2(true, true), mat2x3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0), mat4x2(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), _GLF_struct_34(0, mat3x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), vec2(1.0, 1.0), true), mat4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0));
                            {
                                if (_GLF_struct_replacement_33._f4.GLF_live12looplimiter0 >= 4) {
                                    ;
                                }
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = (vec4(989.321, -6089.1518, -9.1, -0.9) + (-6535.9323));
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                                _GLF_struct_replacement_33._f4.GLF_live12looplimiter0++;
                                {
                                    if (GLF_live12data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12i, 10)] < GLF_live12data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12j, 10)]) {
                                        GLF_live12temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12k++, 10)] = GLF_live12data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12i++, 10)];
                                    } else {
                                        GLF_live12temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12k++, 10)] = GLF_live12data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12j++, 10)];
                                    }
                                }
                            }
                        }
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = log2(vec4(8400.7254, 10.20, -0.1, -6.2));
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    GLF_live7coord = GLF_live7texel.xz + GLF_live7texel.yy;
                    GLF_live7coord = floor(GLF_live7coord * 256.0) / 256.0;
                    GLF_live7texel = texture(GLF_live7tex, GLF_live7coord);
                    GLF_live7i++;
                    {
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = asin(vec4(-26.42, 188.342, -2.3, -6.6));
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                        vec2 GLF_live14coord = _GLF_FUZZED(vec2(-216.479, 42.72));
                        float GLF_live14h = _GLF_FUZZED(vec3(-3.1, 2699.2418, 6747.1799).g);
                        int GLF_live14i = _GLF_FUZZED((57495 + 60306));
                        float GLF_live14refh = _GLF_FUZZED(16.94);
                        float GLF_live14slope = _GLF_FUZZED(8.0);
                        vec2 GLF_live14uvstep = _GLF_FUZZED(vec2(2268.5374, -5.4));
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = vec4(185.745, 1.4, 82.51, -268.196);
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                        {
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = mat2x4(-389.617, 9542.4813, 6.2, -9.9, -1905.4887, 41.44, 959.528, -6.4)[1];
                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                            int GLF_live14looplimiter0 = 0;
                            while (GLF_live14h < GLF_live14refh && GLF_live14i < 32) {
                                if (GLF_live14looplimiter0 >= 4) {
                                    break;
                                }
                                GLF_live14looplimiter0++;
                                {
                                    GLF_live14coord -= GLF_live14uvstep;
                                    GLF_live14refh += GLF_live14slope;
                                    GLF_live14h = texture(GLF_live14tex, GLF_live14coord).y;
                                    GLF_live14i++;
                                }
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = (false ? vec4(-20.43, -2.0, -450.024, 169.305) : vec4(19.27, 78.47, 450.183, -7175.0207));
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                            }
                        }
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = vec4(vec2(5329.3127, -7.8), -87.38, fma(-7969.6809, -46.29, -5.3));
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                    }
                    {
                        _GLF_struct_35 _GLF_struct_replacement_35 = _GLF_struct_35(_GLF_struct_36(mat4x3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), bvec2(true, true), _GLF_struct_37(vec4(1.0, 1.0, 1.0, 1.0), mat4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), mat2x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0)), uvec2(1u, 1u)), ivec2(1, 1), ivec2(1, 1), vec2(1.0, 1.0), uvec3(1u, 1u, 1u));
                        _GLF_struct_replacement_35._f0._f2._GLF_outVarBackup_GLF_color = _GLF_outlined_15(_GLF_color);
                        _GLF_color = _GLF_outlined_44();
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                            if (_GLF_DEAD(false)) {
                                return vec3(1.0, 1.0, 1.0);
                            }
                            _GLF_color = _GLF_struct_replacement_35._f0._f2._GLF_outVarBackup_GLF_color;
                        }
                    }
                }
            }
        }
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = vec4(6.4, 882.089, 459.821, -1.4);
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
        {
            vec4 _GLF_outVarBackup_GLF_color;
            {
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(-0.7, -6.4, 3.1, -3972.6477);
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = ((uvec4(125430u, 79819u, 55507u, 171273u), vec2(-7.0, 7066.8383)) * mat4x2(47.21, 50.50, -0.1, 8595.5110, -6.3, 50.59, -520.642, 86.67));
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                    if (_GLF_DEAD(false)) {
                        return vec3(1.0, 1.0, 1.0);
                    }
                }
                vec2 GLF_live8coord = _GLF_FUZZED(vec2(-83.13, 28.37));
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = (vec4(2150.3399, 73.77, 652.563, 4.1) * vec4(7.6, -2.4, -87.09, 99.47));
                    if (_GLF_DEAD(false)) {
                        return vec3(1.0, 1.0, 1.0);
                    }
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                int GLF_live8i = _GLF_FUZZED(((-51027) & int((52989u))));
                int GLF_live8looplimiter0 = 0;
                while (GLF_live8i < 1 && GLF_live8coord.x > 1.0 || GLF_live8coord.y > 1.0) {
                    if (GLF_live8looplimiter0 >= 6) {
                        break;
                    }
                    GLF_live8looplimiter0++;
                    {
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = _GLF_outlined_45();
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                        if (GLF_live8coord.x > 1.0)
                            GLF_live8coord.x -= 1.0;
                        if (GLF_live8coord.y > 1.0)
                            GLF_live8coord.y -= 1.0;
                        if (_GLF_DEAD(false)) {
                            break;
                        }
                        GLF_live8coord *= 2.0;
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = vec4(9.7, 2.1, -799.405, 2.8);
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                        GLF_live8i++;
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = vec4(6.2, -3.2, 2.8, 98.70);
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                    }
                }
            }
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = min(asin(vec4(-23.01, 32.94, -563.861, -60.10)), vec4(-4.9, -64.68, 249.736, -4.2));
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                {
                    {
                        int GLF_live12looplimiter6 = 0;
                        for (int GLF_live12j = 0; GLF_live12j < 10; GLF_live12j++) {
                            if (GLF_live12looplimiter6 >= 4) {
                                break;
                            }
                            GLF_live12looplimiter6++;
                            {
                                GLF_live12temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12j, 10)] = GLF_live12data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12j, 10)];
                            }
                        }
                    }
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = min(fwidthCoarse(vec4(60.12, -46.71, 5.0, 8.8)), 954.491);
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= sin(0.0))))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
        _GLF_color = vec4(929.374, -4.5, -556.092, 772.788);
        if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(true, bool(bvec2(true, false))))) {
            if (_GLF_DEAD(false)) {
                return vec3(1.0, 1.0, 1.0);
            }
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(88.29, -2099.6740, 4.3, 5722.8329);
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            {
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(-594.917, 2.1, 6955.7520, 7.4);
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                vec4 _GLF_outVarBackup_GLF_color;
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = fwidth(vec4(-5.2, 3.2, 0.5, -4.8));
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(-9155.7402, 4876.1974, -177.238, 16.96);
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
    }
    if (_GLF_DEAD(false)) {
        {
            float GLF_live13xCoord = _GLF_FUZZED(605.666);
            float GLF_live13yCoord = _GLF_FUZZED(vec4(-52.01, -1.2, -99.34, 33.46).y);
            {
                ;
            }
        }
        return vec3(1.0, 1.0, 1.0);
    }
    return b_b * (float(bitCount(msb8)) - s_g) + (b_b - b_b * (float(bitCount(msb8)) - s_g)) * clamp(abs(abs(6.0 * (h_r - vec3(bitfieldReverse(0), bitCount(msb8), 2) / 3.0)) - 3.0) - float(bitCount(msb8)), float(bitfieldExtract(int(resolution.x), 0, 0)), float(bitCount(int(resolution.x))));
}

vec4 _GLF_outlined_3(vec4 _GLF_color) {
    return _GLF_color;
    if (_GLF_DEAD(false)) {
        return vec4(1.0, 1.0, 1.0, 1.0);
    }
    if (_GLF_DEAD(false)) {
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            return vec4(1.0, 1.0, 1.0, 1.0);
        }
        return vec4(1.0, 1.0, 1.0, 1.0);
    }
}

vec4 _GLF_outlined_4() {
    return (+vec4(1.9, 7.1, 966.392, -622.174));
}

vec4 _GLF_outlined_5(vec4 _GLF_outVarBackup_GLF_color) {
    return _GLF_outVarBackup_GLF_color;
    {
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        _GLF_color = ((-566.878) + vec4(-33.75, 33.23, 4.7, -35.23));
        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
    }
}

float _GLF_outlined_6(vec3 temp) {
    return temp.y;
}

vec4 _GLF_outlined_16(vec4 _GLF_color) {
    return _GLF_color;
}

vec4 _GLF_outlined_46() {
    return vec4(-9.5, 2.6, 792.341, -6.4);
}

float _GLF_outlined_47(vec2 GLF_live11a) {
    return GLF_live11a.x / GLF_live11a.y;
}

vec4 _GLF_outlined_48(vec4 _GLF_color) {
    return _GLF_color;
}

void doConvert() {
    int msb8 = 256;
    {
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = vec4(7275.6544, -32.65, 13.79, -94.41);
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
        {
            vec2 GLF_live14coord = _GLF_FUZZED(vec2(-0.2, 5456.2176));
            float GLF_live14h = _GLF_FUZZED(-2023.2436);
            int GLF_live14i = _GLF_FUZZED(-2204);
            float GLF_live14refh = _GLF_FUZZED(float(9825));
            float GLF_live14slope = _GLF_FUZZED(5518.9194);
            vec2 GLF_live14uvstep = _GLF_FUZZED(vec2(-40.14, 99.53));
            {
                _GLF_struct_38 _GLF_struct_replacement_38 = _GLF_struct_38(0, mat3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0));
                while (GLF_live14h < GLF_live14refh && GLF_live14i < 32) {
                    if (_GLF_struct_replacement_38.GLF_live14looplimiter0 >= 4) {
                        break;
                    }
                    _GLF_struct_replacement_38.GLF_live14looplimiter0++;
                    {
                        GLF_live14coord -= GLF_live14uvstep;
                        GLF_live14refh += GLF_live14slope;
                        GLF_live14h = texture(GLF_live14tex, GLF_live14coord).y;
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = vec4(2779.6348, -9980.2905, 2778.6235, -15.64);
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                        GLF_live14i++;
                    }
                }
            }
        }
        vec4 _GLF_outVarBackup_GLF_color;
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_outlined_3(_GLF_color);
            _GLF_color = vec4(440.457, -5.4, 2430.0301, -502.838);
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = smoothstep(vec4(148.437, -50.04, -881.062, 48.60), vec4(-72.05, -8.3, 3734.7709, -1.2), dFdy(vec4(7.4, 6.0, 508.421, -3.4)));
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
        }
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = cosh(vec4(6.1, -49.12, 100.194, -912.947));
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
            if (_GLF_DEAD(false)) {
                return;
            }
        }
        {
            vec2 GLF_live9coord = _GLF_FUZZED((vec2(-9718.6179, 82.17) * vec2(97.55, -4.4)));
            float GLF_live9h = _GLF_FUZZED(-6.1);
            {
                vec4 _GLF_outVarBackup_GLF_color;
                if (_GLF_DEAD(false)) {
                    return;
                    {
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = vec4(-7.6, 83.38, 1070.2890, 319.199);
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                        _GLF_struct_39 _GLF_struct_replacement_39 = _GLF_struct_39(_GLF_FUZZED((vec2(509.893, 42.05) - vec2(5.7, -1.7))), ivec3(1, 1, 1));
                        _GLF_struct_40 _GLF_struct_replacement_40 = _GLF_struct_40(_GLF_struct_41(_GLF_struct_42(_GLF_FUZZED(vec3(0.3, 0.3, 8576.2665).b), bvec2(true, true), mat4x2(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0))), mat3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), ivec3(1, 1, 1), 1.0);
                        int GLF_live14i = _GLF_FUZZED((true ? (-94717) : (-17018)));
                        float GLF_live14refh = _GLF_FUZZED((+7740.8987));
                        float GLF_live14slope = _GLF_FUZZED(-1.8);
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = cos(vec4(342.972, 6.3, -625.814, 448.689));
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                        vec2 GLF_live14uvstep = _GLF_FUZZED(vec3(-2073.3305, -0.7, 999.483).yx);
                        {
                            _GLF_struct_replacement_39.GLF_live14coord -= GLF_live14uvstep;
                            GLF_live14refh += GLF_live14slope;
                            _GLF_struct_replacement_40._f0._f0.GLF_live14h = texture(GLF_live14tex, _GLF_struct_replacement_39.GLF_live14coord).y;
                            GLF_live14i++;
                        }
                    }
                }
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = _GLF_outlined_46();
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                    if (_GLF_DEAD(_GLF_IDENTITY(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)), !(!(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))))))) {
                        return;
                    }
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            int GLF_live9i = _GLF_FUZZED((33477 & (-49666)));
            {
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = cosh(vec4(633.694, -937.099, 3.1, 775.177));
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                float GLF_live11th = _GLF_FUZZED(1875.6302);
                {
                    GLF_live11th = 1.0 - GLF_live11th;
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(4710.5760, -4703.1705, -7.9, 910.109);
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(true, !(!(true))))) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                }
            }
            int GLF_live9looplimiter0 = 0;
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_outlined_16(_GLF_color);
                _GLF_color = sin(vec4(-4.5, 626.503, -2.6, -6.9));
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    {
                        vec2 GLF_live11a = _GLF_FUZZED(vec2(vec3(-9391.9663, 3.0, -0.1)));
                        float GLF_live11z = _GLF_FUZZED((6139.3356 - 9508.9358));
                        if (GLF_live11a.y > GLF_live11a.x) {
                            GLF_live11z = _GLF_outlined_47(GLF_live11a);
                        } else {
                            GLF_live11z = GLF_live11a.y / GLF_live11a.x;
                        }
                    }
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            float GLF_live9refh = _GLF_FUZZED(1.6);
            float GLF_live9slope = _GLF_FUZZED(141.308);
            vec2 GLF_live9uvstep = _GLF_FUZZED((21.59 * (mat3x2(0.2, 4.6, 9.7, 250.500, 9.0, 0.5) * vec3(499.730, -425.487, -17.91))));
            {
                if (GLF_live9looplimiter0 >= 4) {
                    ;
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = mat3x4(-0.9, 520.458, 4.0, 218.936, 4.5, -7.4, 8299.3632, 5.9, 465.716, -3338.0390, -147.218, -0.6)[2];
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                }
                GLF_live9looplimiter0++;
                {
                    GLF_live9coord -= GLF_live9uvstep;
                    GLF_live9refh += GLF_live9slope;
                    GLF_live9h = texture(GLF_live9tex, GLF_live9coord).y;
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(7.4, 467.212, 66.46, 19.83);
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    GLF_live9i++;
                    {
                        vec2 GLF_live11a = _GLF_FUZZED(vec2(181.468, 8.9));
                        float GLF_live11z = _GLF_FUZZED(float(3610u));
                        {
                            GLF_live11z = GLF_live11a.x / GLF_live11a.y;
                        }
                    }
                }
            }
        }
        _GLF_outVarBackup_GLF_color = _GLF_color;
        {
            vec4 GLF_live10c = _GLF_FUZZED(vec4(6301.5941, 44.12, -1.3, -2513.8530));
            int GLF_live10looplimiter1 = 0;
            {
                int GLF_live13iteration = _GLF_FUZZED(((-5360) - 54213));
                {
                    ;
                }
            }
            for (int GLF_live10i = 0; GLF_live10i < 3; GLF_live10i++) {
                if (GLF_live10looplimiter1 >= 6) {
                    break;
                }
                GLF_live10looplimiter1++;
                {
                    if (_GLF_DEAD(false)) {
                        return;
                    }
                    if (GLF_live10c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10i, 4)] >= 1.0) {
                        GLF_live10c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10i, 4)] = GLF_live10c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10i, 4)] * GLF_live10c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10i, 4)];
                        {
                            {
                                ;
                            }
                        }
                    }
                }
            }
        }
        _GLF_color = _GLF_outlined_4();
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = vec4(8868.8123, -9011.8966, -715.084, 18.72);
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            _GLF_color = _GLF_outlined_5(_GLF_outVarBackup_GLF_color);
        }
    }
    vec3 temp;
    temp = _GLF_outlined_0(b_b, msb8, s_g, h_r, resolution);
    h_r = temp.x;
    s_g = _GLF_outlined_6(temp);
    {
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_outlined_48(_GLF_color);
        _GLF_color = step(74.59, unpackSnorm4x8(99979u));
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
    }
    b_b = temp.z;
    {
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        _GLF_color = normalize(mat3x4(6377.7455, -2.4, 3.0, -8505.1988, 138.680, -0.9, 427.661, -8.1, -7.6, 9383.2951, -44.91, 7.8)[2]);
        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
    }
}

float _GLF_outlined_1(float time) {
    return (0.5 + (sin(time) * 0.5 + 0.5));
}

vec4 _GLF_outlined_7() {
    {
        vec2 GLF_live8coord = _GLF_FUZZED(vec2(7125.4055, 857.630));
        if (GLF_live8coord.y > 1.0)
            GLF_live8coord.y -= 1.0;
    }
    return vec4(6178.1387, -73.10, 4982.1398, -86.20);
}

float _GLF_outlined_17(float c) {
    return fract(c);
    {
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        _GLF_color = vec4(2.7, 160.968, 3.8, -8720.2577);
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
    }
}

vec4 _GLF_outlined_18() {
    {
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        _GLF_color = vec4(-5.3, 2.9, -5.7, 1.6);
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
    }
    return vec4(vec2(-5.1, -369.041), (810.324 + vec2(3.9, -0.0)));
}

vec4 _GLF_outlined_19(vec4 _GLF_outVarBackup_GLF_color) {
    return _GLF_outVarBackup_GLF_color;
}

vec4 _GLF_outlined_20(vec4 _GLF_outVarBackup_GLF_color) {
    return _GLF_outVarBackup_GLF_color;
}

vec4 _GLF_outlined_21(vec4 _GLF_outVarBackup_GLF_color) {
    return _GLF_outVarBackup_GLF_color;
}

vec4 _GLF_outlined_22(vec4 _GLF_outVarBackup_GLF_color) {
    return _GLF_outVarBackup_GLF_color;
}

vec4 _GLF_outlined_23() {
    return vec4(-7052.7288, -2.5, 2.6, 5.3);
}

vec4 _GLF_outlined_49(vec4 _GLF_color) {
    return _GLF_color;
}

vec4 _GLF_outlined_50(vec4 _GLF_outVarBackup_GLF_color) {
    return _GLF_outVarBackup_GLF_color;
}

vec4 _GLF_outlined_51(vec4 _GLF_outVarBackup_GLF_color) {
    return _GLF_outVarBackup_GLF_color;
}

vec4 _GLF_outlined_52(vec4 _GLF_color) {
    return _GLF_color;
}

vec4 _GLF_outlined_53(vec4 _GLF_outVarBackup_GLF_color) {
    return _GLF_outVarBackup_GLF_color;
}

float _GLF_outlined_54(vec2 resolution, int msb8, float b_b) {
    return clamp(float(bitfieldExtract(int(resolution.x), 0, 0)), float(bitCount(msb8)), b_b * float(bitCount(msb8)) * 3.0);
}

vec3 computeColor(float c, vec2 position) {
    {
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        _GLF_color = (vec4(-5269.7123, -103.047, 6.9, 419.749) + (-8.0));
        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
    }
    int msb8 = 256;
    {
        vec2 GLF_live8coord = _GLF_FUZZED(vec2(-0.9, -728.944));
        vec4 GLF_live8res = _GLF_FUZZED(vec4(((-867.364) - (-996.565))));
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = vec4(-68.07, -32.18, -481.039, 83.44);
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
        if (_GLF_DEAD(false)) {
            return vec3(1.0, 1.0, 1.0);
        }
        {
            GLF_live8res = texture(GLF_live8tex, GLF_live8coord);
        }
    }
    {
        {
            ;
        }
    }
    h_r = _GLF_outlined_17(c);
    {
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        _GLF_color = atan(vec4(-7888.3679, 3.5, -39.08, -3.2));
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
    }
    s_g = float(bitCount(msb8));
    {
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                return vec3(1.0, 1.0, 1.0);
            }
            _GLF_color = atan(vec4(-5.0, 103.441, 0.7, -8.1));
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
            {
                _GLF_struct_43 _GLF_struct_replacement_43 = _GLF_struct_43(0, _GLF_struct_44(mat3x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), ivec4(1, 1, 1, 1), mat4x2(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0)), bvec4(true, true, true, true), mat4x2(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), _GLF_struct_45(vec3(1.0, 1.0, 1.0), uvec2(1u, 1u)), 1);
                if (_GLF_struct_replacement_43.GLF_live8looplimiter0 >= 6) {
                    ;
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        return vec3(1.0, 1.0, 1.0);
                    }
                }
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                if (_GLF_DEAD(false)) {
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = (-vec4(-20.80, -76.77, 4.5, 7.1));
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    return vec3(1.0, 1.0, 1.0);
                }
                return vec3(1.0, 1.0, 1.0);
                if (_GLF_DEAD(false)) {
                    return vec3(1.0, 1.0, 1.0);
                }
                {
                    vec2 GLF_live11a = _GLF_FUZZED((vec2(834.430, 474.173) - vec4(-7088.6505, 37.60, -60.17, -129.328).ss));
                    float GLF_live11z = _GLF_FUZZED((false ? (-42.67) : (-393.984)));
                    {
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = vec4(-4.9, -914.524, 4.2, 8.0);
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                        GLF_live11z = GLF_live11a.x / GLF_live11a.y;
                    }
                }
            }
        }
        {
            float GLF_live12grey = _GLF_FUZZED(177.213);
            {
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(-95.55, 17.23, 57.41, -7750.8307);
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                GLF_live12grey = 0.5 + float(GLF_live12data[0]) / 10.0;
            }
        }
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_outlined_49(_GLF_color);
        _GLF_color = vec4(-0.8, -6226.3338, 7.3, -5.6);
        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
            _GLF_color = _GLF_outlined_50(_GLF_outVarBackup_GLF_color);
        }
    }
    {
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = vec4(-6.0, -694.933, -3.0, 4.0);
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = atan(vec4(8.0, -730.055, -159.588, -37.86));
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        _GLF_color = vec4(7976.0373, -96.38, -205.860, 5.0);
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
            {
                {
                    ;
                }
            }
        }
    }
    b_b = _GLF_outlined_1(time);
    {
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        _GLF_color = _GLF_outlined_7();
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
    }
    doConvert();
    {
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        _GLF_color = vec4(-8.3, -6029.8166, -3.8, -75.20);
        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= sqrt(0.0))))) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
    }
    {
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        _GLF_color = _GLF_outlined_18();
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            _GLF_color = _GLF_outlined_51(_GLF_outVarBackup_GLF_color);
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = max(vec4(-37.68, 0.4, -73.60, 162.777), vec4(479.804, 273.091, 96.59, -7131.9130));
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
        }
        if (_GLF_DEAD(false)) {
            return vec3(1.0, 1.0, 1.0);
            if (_GLF_DEAD(false)) {
                return vec3(1.0, 1.0, 1.0);
            }
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = fma(exp(uintBitsToFloat(uvec4(75749u, 54812u, 155214u, 177997u))), sign(vec4(9.7, -9.3, -168.242, 2.2)), fwidth(vec4(-25.49, -4490.6343, -2.1, 53.13)));
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
        }
    }
    s_g *= float(bitCount(msb8)) / position.y;
    {
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        _GLF_color = vec4(-38.94, -0.4, 13.40, -9825.0621);
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
    }
    h_r *= float(bitCount(msb8)) / position.x;
    {
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        _GLF_color = (+vec4(7.9, 12.06, 9213.5707, 8.4));
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
    }
    {
        int GLF_live0looplimiter0 = 0;
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = vec4(0.0, -7800.7630, 275.456, -638.864);
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
        ivec2 GLF_live0pos = _GLF_FUZZED(ivec3(4146, 4401, -33187).pp);
        {
            {
                vec2 GLF_live11a = _GLF_FUZZED(vec2(-533.597, 20.26));
                float GLF_live11z = _GLF_FUZZED(-7.4);
                if (GLF_live11a.y > GLF_live11a.x) {
                    GLF_live11z = GLF_live11a.x / GLF_live11a.y;
                } else {
                    GLF_live11z = GLF_live11a.y / GLF_live11a.x;
                }
            }
            {
                int GLF_live10looplimiter0 = 0;
                if (GLF_live10looplimiter0 >= 6) {
                    if (_GLF_DEAD(false)) {
                        return vec3(1.0, 1.0, 1.0);
                    }
                    ;
                }
                if (_GLF_DEAD(false)) {
                    return vec3(1.0, 1.0, 1.0);
                }
            }
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(5124.9911, 0.8, -501.031, -56.83);
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= log(1.0))))) {
                    _GLF_color = _GLF_outlined_19(_GLF_outVarBackup_GLF_color);
                }
            }
            {
                int GLF_live5i = _GLF_FUZZED(ivec4(86504, 75679, 44142, -23681).t);
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(1481.6438, 5.1, 904.261, -8.5);
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                int GLF_live5iters = _GLF_FUZZED(int(14728u));
                int GLF_live5looplimiter0 = 0;
                int GLF_live5v = _GLF_FUZZED(((85443 & 32326) | (71108)));
                for (GLF_live5i = 0; GLF_live5i < GLF_live5iters; GLF_live5i++) {
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = degrees(vec4(-8.0, 369.405, 6.1, 6.1));
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outlined_20(_GLF_outVarBackup_GLF_color);
                        }
                    }
                    if (GLF_live5looplimiter0 >= 3) {
                        break;
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = vec4(-5.9, -4634.1963, -556.520, -84.07);
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                    }
                    GLF_live5looplimiter0++;
                    {
                        GLF_live5v = (4 * GLF_live5v * (1000 - GLF_live5v)) / 1000;
                    }
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            {
                                float GLF_live11th = _GLF_FUZZED(-354.984);
                                {
                                    GLF_live11th = -GLF_live11th;
                                }
                            }
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = pow(vec4(-7.1, -406.557, 404.086, -14.08), (vec4(5.9, -9818.1835, 37.98, 1.3) + (-3.3)));
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(-21.06, 0.3, -2813.2316, 690.822);
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = smoothstep(vec4(-57.33, -9.9, 9987.7533, -9.3), vec4(-15.61, 948.987, 5.9, 5405.6130), vec4(-9861.9607, 2.4, -77.24, -7.9));
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                    }
                }
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = (vec3(2.9, 41.37, -9.4) * mat4x3(7.4, 738.917, 5.9, -1.0, 54.86, -8.1, 9382.0077, 880.814, 8512.9918, 3974.6095, -15.43, 41.85));
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = (vec4(-3023.8733, -186.833, 657.818, 0.7) - (-3.3));
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(true, true && (true)))) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        return vec3(1.0, 1.0, 1.0);
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = vec4(3.2, 1.1, -2.0, 6.6);
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= _GLF_IDENTITY(dot(vec2(1.0, 0.0), vec2(0.0, 1.0)), dot(vec2(1.0, 0.0), vec2(0.0, 1.0))))))) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                    }
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outlined_21(_GLF_outVarBackup_GLF_color);
                    }
                }
            }
            if (GLF_live0looplimiter0 >= 5) {
                ;
            }
            GLF_live0looplimiter0++;
            {
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(4208.3482, -9.1, -17.25, 3043.9125);
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                if (GLF_live0pos.x < GLF_live0dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live0pos.y, 256)] + 15 && GLF_live0pos.x > GLF_live0dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live0pos.y, 256)] - 15) {
                    float GLF_live0p = (15.0 - abs(float(GLF_live0pos.x - GLF_live0dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live0pos.y, 256)]))) / 15.0;
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(449.587, -748.807, 5.9, -3182.0747);
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(29.17, 2011.9644, -6.0, 2.6);
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= sqrt(0.0))))) {
                            {
                                vec2 GLF_live14coord = _GLF_FUZZED(vec2(742.349, -5829.1399));
                                _GLF_struct_46 _GLF_struct_replacement_46 = _GLF_struct_46(_GLF_struct_47(_GLF_struct_48(mat3x2(1.0, 1.0, 1.0, 1.0, 1.0, 1.0), mat3x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), 1, vec4(1.0, 1.0, 1.0, 1.0), ivec4(1, 1, 1, 1)), _GLF_struct_49(mat2(1.0, 1.0, 1.0, 1.0), bvec2(true, true), _GLF_FUZZED(7.0), uvec2(1u, 1u))), bvec2(true, true), 1.0, mat4x3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0));
                                int GLF_live14i = _GLF_FUZZED(-7392);
                                float GLF_live14refh = _GLF_FUZZED(7964.6298);
                                float GLF_live14slope = _GLF_FUZZED(((-3.0) * ((-9.2) * (-68.75))));
                                vec2 GLF_live14uvstep = _GLF_FUZZED(vec2(-49.15, -749.931).yx);
                                {
                                    int GLF_live14looplimiter0 = 0;
                                    while (_GLF_struct_replacement_46._f0._f1.GLF_live14h < GLF_live14refh && GLF_live14i < 32) {
                                        if (GLF_live14looplimiter0 >= 4) {
                                            break;
                                        }
                                        GLF_live14looplimiter0++;
                                        {
                                            GLF_live14coord -= GLF_live14uvstep;
                                            GLF_live14refh += GLF_live14slope;
                                            _GLF_struct_replacement_46._f0._f1.GLF_live14h = texture(GLF_live14tex, GLF_live14coord).y;
                                            GLF_live14i++;
                                        }
                                    }
                                }
                            }
                            if (_GLF_DEAD(false)) {
                                return vec3(1.0, 1.0, 1.0);
                            }
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    ;
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = floor(vec4(8.0, 6.8, -0.0, 8495.4079));
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < determinant(mat4(0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 0.0, 1.0, 1.0, 0.0)))))) {
                            return vec3(1.0, 1.0, 1.0);
                        }
                        _GLF_color = tan(vec4(6941.8952, 9.1, -8.4, 2.9));
                        {
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = asinh(vec4(vec2(2801.6277, -3.1), -5256.3887, 76.37));
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = vec4(0.6, 5.0, 18.15, 6.9);
                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                    _GLF_color = _GLF_outlined_22(_GLF_outVarBackup_GLF_color);
                                }
                            }
                            vec2 GLF_live9coord = _GLF_FUZZED(vec2(-5.7, 278.060));
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = vec4(-3.0, -33.42, 9797.1538, 5.9);
                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                            float GLF_live9h = _GLF_FUZZED((7.4 + (-3.6)));
                            int GLF_live9i = _GLF_FUZZED(-62771);
                            {
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = vec4(-0.5, 901.074, -0.1, -3046.7217);
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = vec4(-87.22, -9162.3482, -0.4, 7.0);
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                            float GLF_live9refh = _GLF_FUZZED((373.704 + 2379.1693));
                            float GLF_live9slope = _GLF_FUZZED(-2.8);
                            vec2 GLF_live9uvstep = _GLF_FUZZED((vec3(8.5, 34.34, 9.0) * (mat2x3(mat3(-3.4, -917.902, 487.392, 685.307, -887.561, -1844.3323, 9.1, 37.67, -7939.7487)) * mat2(-5.7, 541.011, 6.9, -442.047))));
                            {
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                    return vec3(1.0, 1.0, 1.0);
                                }
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                    {
                                        {
                                            {
                                                vec4 _GLF_outVarBackup_GLF_color;
                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                _GLF_color = vec4(-6054.8960, -6.1, -8.3, 9.9);
                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                }
                                            }
                                            ;
                                        }
                                    }
                                    return vec3(1.0, 1.0, 1.0);
                                }
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    {
                                        vec2 GLF_live14coord = _GLF_FUZZED((vec4(-630.718, -7.0, 0.5, 98.39) * (mat2x4(-6.8, 1301.2959, 6.8, -37.04, 8.2, 0.0, -385.121, 7489.1683) + mat2x4(-5883.1118, 905.604, 9.4, -43.24, 9.0, -639.320, 473.695, 4.0))));
                                        float GLF_live14h = _GLF_FUZZED(-7613.6194);
                                        int GLF_live14i = _GLF_FUZZED(int(bool(-4031.3260)));
                                        int GLF_live14looplimiter0 = 0;
                                        float GLF_live14refh = _GLF_FUZZED((vec2(-58.86, -14.23) * vec2(-607.813, -8.8)).x);
                                        float GLF_live14slope = _GLF_FUZZED(-9.5);
                                        vec2 GLF_live14uvstep = _GLF_FUZZED(vec2((mat4(-5.0, -3533.0518, -88.73, 72.31, 0.5, -416.080, -2.8, -7723.2047, 407.492, 5.9, 3.3, -70.75, -3530.5302, 63.27, 4677.7112, 96.95) * vec4(-1.1, 5.2, 3.5, -949.149))));
                                        while (GLF_live14h < GLF_live14refh && GLF_live14i < 32) {
                                            if (GLF_live14looplimiter0 >= 4) {
                                                break;
                                            }
                                            GLF_live14looplimiter0++;
                                            {
                                                GLF_live14coord -= GLF_live14uvstep;
                                                GLF_live14refh += GLF_live14slope;
                                                {
                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                    _GLF_color = vec4(-0.8, 5.3, 2687.6991, -5436.1803);
                                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                    }
                                                }
                                                GLF_live14h = texture(GLF_live14tex, GLF_live14coord).y;
                                                GLF_live14i++;
                                            }
                                        }
                                    }
                                    _GLF_color = vec4(-1822.9818, vec3(-6501.0230, -2596.3972, -29.91));
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        if (_GLF_DEAD(false)) {
                                            return vec3(1.0, 1.0, 1.0);
                                        }
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = asinh(vec4(-11.07, -2151.1623, 9292.6902, -39.05));
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                                int GLF_live9looplimiter0 = 0;
                                while (GLF_live9h < GLF_live9refh && GLF_live9i < 32) {
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        _GLF_color = intBitsToFloat((ivec4(43971, 37621, 8884, -8055) + ivec4(-44398, -21609, 86226, -21833)));
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                    }
                                    if (GLF_live9looplimiter0 >= 4) {
                                        break;
                                    }
                                    GLF_live9looplimiter0++;
                                    {
                                        GLF_live9coord -= GLF_live9uvstep;
                                        GLF_live9refh += GLF_live9slope;
                                        {
                                            vec4 _GLF_outVarBackup_GLF_color;
                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                            _GLF_color = vec4(-7641.6172, 1.1, 44.12, 4.7);
                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                            }
                                        }
                                        GLF_live9h = texture(GLF_live9tex, GLF_live9coord).y;
                                        GLF_live9i++;
                                    }
                                }
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_outlined_52(_GLF_color);
                                    _GLF_color = cos(vec4(-895.586, -4.9, 55.46, 574.418));
                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= length(vec2(0.0, 0.0)))))) {
                                        if (_GLF_DEAD(false)) {
                                            {
                                                {
                                                    ;
                                                }
                                            }
                                            return vec3(1.0, 1.0, 1.0);
                                        }
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                return vec3(1.0, 1.0, 1.0);
                            }
                        }
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = vec4(-0.4, 9447.3314, -25.10, 1.2);
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                        {
                            {
                                ;
                            }
                        }
                    }
                }
                GLF_live0pos.y++;
            }
        }
        if (_GLF_DEAD(false)) {
            return vec3(1.0, 1.0, 1.0);
        }
    }
    {
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        _GLF_color = vec4(39.68, 3.9, -4.5, 78.17);
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = inversesqrt(vec4(15.74, 9.1, 4.1, 27.63));
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(-6878.3920, -57.79, -3.8, -34.08);
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(true, (true) && true))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(-3.4, 62.84, -3.6, -7.6);
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = _GLF_outlined_23();
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            _GLF_color = _GLF_outlined_53(_GLF_outVarBackup_GLF_color);
            {
                vec2 GLF_live6a = _GLF_FUZZED((vec4(-78.35, -5592.3101, -4872.7953, 490.338).z - vec2(-729.644, 378.066)));
                float GLF_live6th = _GLF_FUZZED(float(true));
                if (GLF_live6a.y < GLF_live6a.x) {
                    GLF_live6th = 0.5 - GLF_live6th;
                }
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(-78.89, vec2(-23.10, -1.1), -9408.5624);
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
            }
        }
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = (bvec3(false, true, false), vec4(-15.55, 0.4, 7.4, 2.5));
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
    }
    if (abs(position.y - position.x) < 0.5) {
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = (+vec4(814.620, -242.262, -4930.5048, 1532.1462));
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
        b_b = _GLF_outlined_54(resolution, msb8, b_b);
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = dFdy(vec4(9107.6901, -5.7, -47.73, 2.0));
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                {
                    int GLF_live13looplimiter3 = 0;
                    if (GLF_live13looplimiter3 >= 6) {
                        ;
                    }
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = ((-265.689) / vec4(-8928.6297, 1.3, -88.95, 1.7));
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                }
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < abs(0.0))))) {
                return vec3(1.0, 1.0, 1.0);
            }
        }
    }
    return vec3(h_r, s_g, b_b);
    {
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        _GLF_color = (true ? vec4(-3266.2682, -4.3, 4.8, 5.4) : vec4(342.881, -928.873, -4.4, 1.2));
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
    }
}

vec4 _GLF_outlined_55() {
    return vec4(-4.7, -727.914, 728.222, 556.149);
}

vec3 defaultColor() {
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
        return vec3(1.0, 1.0, 1.0);
    }
    return vec3(float(bitfieldExtract(int(resolution.y), 0, 0)));
    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
        return vec3(1.0, 1.0, 1.0);
    }
    {
        {
            ;
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(376.828, -92.78, 0.2, 530.536);
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
                {
                    vec2 GLF_live11a = _GLF_FUZZED(vec2(29.83, -5.4));
                    float GLF_live11th = _GLF_FUZZED(float(true));
                    if (GLF_live11a.y < GLF_live11a.x) {
                        GLF_live11th = 0.5 - GLF_live11th;
                    }
                }
            }
        }
        {
            vec4 _GLF_outVarBackup_GLF_color;
            {
                float GLF_live11th = _GLF_FUZZED(((-751.584) * (-9.1)));
                {
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(-9.2, 3.4, vec2(-85.84, 0.8));
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    GLF_live11th = -GLF_live11th;
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(-922.951, -7730.6616, 40.05, -6.1);
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                }
            }
            _GLF_outVarBackup_GLF_color = _GLF_color;
            if (_GLF_DEAD(false)) {
                return vec3(1.0, 1.0, 1.0);
            }
            _GLF_color = _GLF_outlined_55();
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = exp(vec4(682.503, -9.7, 2.7, -5.5));
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    return vec3(1.0, 1.0, 1.0);
                }
                _GLF_color = _GLF_outVarBackup_GLF_color;
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = mod(vec4(7.8, -52.96, -695.168, 8031.9359), -1336.8461);
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
            }
        }
    }
}

vec4 _GLF_outlined_8() {
    return sign(vec4(-7.9, 43.67, -4.7, -795.016));
}

vec4 _GLF_outlined_56(vec4 _GLF_outVarBackup_GLF_color) {
    return _GLF_outVarBackup_GLF_color;
}

vec4 _GLF_outlined_9(vec4 _GLF_outVarBackup_GLF_color) {
    {
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        _GLF_color = (mat2x4(-5103.9910, -0.2, 1.3, -155.946, -54.93, 263.632, -1.8, -71.88) / (-mat2x4(-49.35, -3834.2252, -0.8, -3679.6311, -76.11, 27.72, -94.44, 7.9)))[0];
        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
    }
    {
        if (_GLF_DEAD(false)) {
            return vec4(1.0, 1.0, 1.0, 1.0);
        }
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        _GLF_color = vec4(9.1, 8289.6593, 517.876, 9.7);
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            _GLF_color = _GLF_outlined_56(_GLF_outVarBackup_GLF_color);
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = (37.22 / (vec4(6.2) * vec4(7.3, 1.8, -5223.7780, -29.95)));
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= sqrt(0.0))))) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
        }
    }
    return _GLF_outVarBackup_GLF_color;
}

vec4 _GLF_outlined_24(vec4 _GLF_outVarBackup_GLF_color) {
    return _GLF_outVarBackup_GLF_color;
}

vec4 _GLF_outlined_25() {
    return roundEven(clamp(vec4(-1.7, 6.7, -878.654, 60.97), dot(vec4(-8.8, 517.213, 194.896, -0.4), vec4(-67.20, 77.78, 2.1, 5.3)), -14.12));
}

vec4 _GLF_outlined_26(vec4 _GLF_outVarBackup_GLF_color) {
    return _GLF_outVarBackup_GLF_color;
    {
        float GLF_live12grey = _GLF_FUZZED(8.7);
        if (int(GLF_live12gl_FragCoord[1]) < 150) {
            ;
        } else {
            if (int(GLF_live12gl_FragCoord[1]) < 180) {
                GLF_live12grey = 0.5 + float(GLF_live12data[5]) / 10.0;
            } else {
                if (int(GLF_live12gl_FragCoord[1]) < 210) {
                    GLF_live12grey = 0.5 + float(GLF_live12data[6]) / 10.0;
                } else {
                    if (int(GLF_live12gl_FragCoord[1]) < 240) {
                        GLF_live12grey = 0.5 + float(GLF_live12data[7]) / 10.0;
                    } else {
                        if (int(GLF_live12gl_FragCoord[1]) < 270) {
                            GLF_live12grey = 0.5 + float(GLF_live12data[8]) / 10.0;
                        } else {
                            ;
                        }
                    }
                }
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = atan(vec4(44.24, 1.4, -5148.5679, 9.4), vec4(-0.0, -18.23, 3.4, -7.4));
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
            }
        }
    }
}

vec4 _GLF_outlined_27(vec4 _GLF_color) {
    return _GLF_color;
}

vec4 _GLF_outlined_28() {
    return vec4(-488.208, 9.8, -1748.8819, -5.8);
}

vec4 _GLF_outlined_57(vec4 _GLF_color) {
    return _GLF_color;
}

vec4 _GLF_outlined_58(vec4 _GLF_color) {
    return _GLF_color;
}

vec4 _GLF_outlined_59() {
    return vec4(-168.228, 6.9, -9.7, 6.3);
    {
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        _GLF_color = intBitsToFloat(ivec4(-61732, 9169, 77697, 25953));
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
    }
}

vec4 _GLF_outlined_60(vec4 _GLF_color) {
    return _GLF_color;
}

float _GLF_outlined_61(vec2 GLF_live11a) {
    return GLF_live11a.y / GLF_live11a.x;
}

vec4 _GLF_outlined_62(vec4 _GLF_outVarBackup_GLF_color) {
    return _GLF_outVarBackup_GLF_color;
}

vec3 drawShape(vec2 pos, vec2 square, vec3 setting) {
    int msb8 = 256;
    bool c1 = pos.x - setting.x < square.x;
    {
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
            return vec3(1.0, 1.0, 1.0);
        }
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        _GLF_color = (vec4(-617.683, 7.7, -78.24, 79.59) - vec4(8424.6465, -75.31, 384.962, 2.9));
        {
            int GLF_live13looplimiter3 = 0;
            if (GLF_live13looplimiter3 >= 6) {
                ;
            }
        }
        if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(true, (true) && _GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y))))) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
    }
    if (!c1) {
        return defaultColor();
        if (_GLF_DEAD(false)) {
            return vec3(1.0, 1.0, 1.0);
        }
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = vec4(-729.382, -884.336, 207.604, -43.18);
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
    }
    bool c2 = pos.x + setting.x > square.x;
    {
        _GLF_struct_10 _GLF_struct_replacement_10 = _GLF_struct_10(vec4(1.0, 1.0, 1.0, 1.0), _GLF_struct_11(true));
        _GLF_struct_replacement_10._GLF_outVarBackup_GLF_color = _GLF_color;
        if (_GLF_DEAD(false)) {
            return vec3(1.0, 1.0, 1.0);
            {
                vec2 GLF_live14coord = _GLF_FUZZED(vec2(7192.3208, 7596.4020));
                float GLF_live14h = _GLF_FUZZED(-475.790);
                int GLF_live14i = _GLF_FUZZED(((-70546) | 63650));
                int GLF_live14looplimiter0 = 0;
                float GLF_live14refh = _GLF_FUZZED(55.55);
                float GLF_live14slope = _GLF_FUZZED(4.4);
                vec2 GLF_live14uvstep = _GLF_FUZZED(vec2(-2.9, -74.26));
                {
                    if (GLF_live14looplimiter0 >= 4) {
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
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = acosh(vec4(-6468.4532, 9713.6636, 138.682, 3.0));
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
        }
        _GLF_color = vec4(319.393, -6.9, 1190.4571, -3.2);
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                return vec3(1.0, 1.0, 1.0);
                if (_GLF_DEAD(false)) {
                    {
                        {
                            ;
                        }
                    }
                    return vec3(1.0, 1.0, 1.0);
                }
            }
            _GLF_color = _GLF_struct_replacement_10._GLF_outVarBackup_GLF_color;
        }
    }
    if (!c2) {
        return defaultColor();
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            {
                vec2 GLF_live9coord = _GLF_FUZZED(vec2(0.6, (-9704.5816)));
                float GLF_live9h = _GLF_FUZZED(1.2);
                {
                    int GLF_live14looplimiter0 = 0;
                    if (GLF_live14looplimiter0 >= 4) {
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = (+vec4(4.5, -8.4, -73.56, -4.6));
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                        ;
                    }
                }
                int GLF_live9i = _GLF_FUZZED((ivec4(14611, 7261, 6793, 44696) + 78720).s);
                _GLF_struct_50 _GLF_struct_replacement_50 = _GLF_struct_50(1.0, _GLF_struct_51(_GLF_struct_52(1u, mat4x3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), vec2(1.0, 1.0), mat4x3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0)), mat2(1.0, 1.0, 1.0, 1.0), mat2x3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0), _GLF_struct_53(ivec4(1, 1, 1, 1), mat3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0)), bvec4(true, true, true, true), 0, 1.0, _GLF_struct_54(mat3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), uvec4(1u, 1u, 1u, 1u), bvec3(true, true, true), mat3x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), mat4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), uvec3(1u, 1u, 1u))), ivec4(1, 1, 1, 1));
                _GLF_struct_12 _GLF_struct_replacement_12 = _GLF_struct_12(_GLF_struct_13(ivec3(1, 1, 1), mat3x2(1.0, 1.0, 1.0, 1.0, 1.0, 1.0), ivec4(1, 1, 1, 1), uvec2(1u, 1u), 1, _GLF_struct_14(true, ivec4(1, 1, 1, 1), mat3x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), mat4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0)), _GLF_struct_15(1u, mat2x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), mat4x2(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), mat3x2(1.0, 1.0, 1.0, 1.0, 1.0, 1.0), 1u)), _GLF_FUZZED(((false ? false : (mat4x2(-753.019, -1.6, 196.439, -250.792, -5.5, 8.9, 4.5, 7385.2666) != mat4x2(-54.58, 95.98, -9.0, -7.4, 622.138, -8841.7721, 217.221, 1026.0658))) ? 9116.8658 : float(true))), ivec4(1, 1, 1, 1), vec3(1.0, 1.0, 1.0));
                float GLF_live9slope = _GLF_FUZZED(vec2(6912.7254, 3.7).y);
                vec2 GLF_live9uvstep = _GLF_FUZZED(vec2(8416.1038, 5723.6847));
                while (GLF_live9h < _GLF_struct_replacement_12.GLF_live9refh && GLF_live9i < 32) {
                    if (_GLF_struct_replacement_50._f1.GLF_live9looplimiter0 >= 4) {
                        break;
                    }
                    _GLF_struct_replacement_50._f1.GLF_live9looplimiter0++;
                    {
                        GLF_live9coord -= GLF_live9uvstep;
                        _GLF_struct_replacement_12.GLF_live9refh += GLF_live9slope;
                        GLF_live9h = texture(GLF_live9tex, GLF_live9coord).y;
                        GLF_live9i++;
                        {
                            vec2 GLF_live14coord = _GLF_FUZZED(vec2(-375.035, -8.4));
                            _GLF_struct_55 _GLF_struct_replacement_55 = _GLF_struct_55(bvec2(true, true), bvec2(true, true), 1, bvec4(true, true, true, true), _GLF_struct_56(_GLF_FUZZED(-88.32), mat3x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), _GLF_struct_57(mat3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), vec2(1.0, 1.0), uvec3(1u, 1u, 1u), mat2x3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0), 1), 1u, _GLF_struct_58(mat4x2(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0)), bvec4(true, true, true, true)));
                            _GLF_struct_59 _GLF_struct_replacement_59 = _GLF_struct_59(vec2(1.0, 1.0), _GLF_struct_60(ivec3(1, 1, 1), uvec3(1u, 1u, 1u), vec4(1.0, 1.0, 1.0, 1.0), true, mat2(1.0, 1.0, 1.0, 1.0), bvec4(true, true, true, true)), 1, _GLF_struct_61(mat4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), _GLF_struct_62(ivec4(1, 1, 1, 1), mat4x3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), mat2x3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0), ivec3(1, 1, 1), mat2(1.0, 1.0, 1.0, 1.0), _GLF_FUZZED(ivec2(67730, 37406).s), mat2x3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0), mat2(1.0, 1.0, 1.0, 1.0)), uvec2(1u, 1u), uvec2(1u, 1u), bvec4(true, true, true, true)), uvec2(1u, 1u), _GLF_struct_63(bvec4(true, true, true, true), mat3x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), uvec2(1u, 1u)), ivec4(1, 1, 1, 1));
                            float GLF_live14refh = _GLF_FUZZED((84.63 - (-9.2)));
                            _GLF_struct_64 _GLF_struct_replacement_64 = _GLF_struct_64(_GLF_struct_65(_GLF_struct_66(vec3(1.0, 1.0, 1.0), mat3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0)), _GLF_struct_67(mat2x3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0), mat3x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), vec3(1.0, 1.0, 1.0), 1.0, vec4(1.0, 1.0, 1.0, 1.0), true, mat2x3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0)), 1, _GLF_struct_68(1u), mat4x3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0)), _GLF_FUZZED(530.527));
                            vec2 GLF_live14uvstep = _GLF_FUZZED(vec2(639.209, 6.1));
                            {
                                GLF_live14coord -= GLF_live14uvstep;
                                GLF_live14refh += _GLF_struct_replacement_64.GLF_live14slope;
                                _GLF_struct_replacement_55._f4.GLF_live14h = texture(GLF_live14tex, GLF_live14coord).y;
                                _GLF_struct_replacement_59._f3._f1.GLF_live14i++;
                            }
                        }
                    }
                }
                {
                    float GLF_live12grey = _GLF_FUZZED(((-8.2) + 2.6));
                    if (int(GLF_live12gl_FragCoord[1]) < 210) {
                        GLF_live12grey = 0.5 + float(GLF_live12data[6]) / 10.0;
                    } else {
                        if (int(GLF_live12gl_FragCoord[1]) < 240) {
                            GLF_live12grey = 0.5 + float(GLF_live12data[7]) / 10.0;
                        } else {
                            if (int(GLF_live12gl_FragCoord[1]) < 270) {
                                GLF_live12grey = 0.5 + float(GLF_live12data[8]) / 10.0;
                            } else {
                                ;
                            }
                        }
                    }
                }
            }
            return vec3(1.0, 1.0, 1.0);
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(1254.9749, 5.2, -2890.2719, 6.3);
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
        }
    }
    bool c3 = pos.y - setting.x < square.y;
    if (!c3) {
        return defaultColor();
    }
    {
        vec4 GLF_live10c = _GLF_FUZZED(vec4(-7.0, 5257.6154, -38.50, -704.831));
        int GLF_live10looplimiter1 = 0;
        for (_GLF_struct_69 _GLF_struct_replacement_69 = _GLF_struct_69(_GLF_struct_70(mat3x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), _GLF_struct_71(ivec3(1, 1, 1), mat2(1.0, 1.0, 1.0, 1.0))), 1u, _GLF_struct_72(uvec2(1u, 1u), mat2(1.0, 1.0, 1.0, 1.0), mat3x2(1.0, 1.0, 1.0, 1.0, 1.0, 1.0), _GLF_struct_73(bvec2(true, true), vec2(1.0, 1.0), bvec2(true, true), mat4x2(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0))), 0); _GLF_struct_replacement_69.GLF_live10i < 3; _GLF_struct_replacement_69.GLF_live10i++) {
            if (GLF_live10looplimiter1 >= 6) {
                break;
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = atan(vec4(-2.9, -1.3, -912.040, -4069.7010), vec4(6.1, 654.625, -7680.8449, 655.858));
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                if (_GLF_DEAD(_GLF_IDENTITY(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)), (_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))) && true))) {
                    discard;
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    break;
                }
            }
            GLF_live10looplimiter1++;
            {
                if (GLF_live10c[_GLF_MAKE_IN_BOUNDS_INT(_GLF_struct_replacement_69.GLF_live10i, 4)] >= 1.0) {
                    GLF_live10c[_GLF_MAKE_IN_BOUNDS_INT(_GLF_struct_replacement_69.GLF_live10i, 4)] = GLF_live10c[_GLF_MAKE_IN_BOUNDS_INT(_GLF_struct_replacement_69.GLF_live10i, 4)] * GLF_live10c[_GLF_MAKE_IN_BOUNDS_INT(_GLF_struct_replacement_69.GLF_live10i, 4)];
                }
            }
            {
                vec2 GLF_live14coord = _GLF_FUZZED(vec2(-2.6));
                _GLF_struct_74 _GLF_struct_replacement_74 = _GLF_struct_74(vec4(1.0, 1.0, 1.0, 1.0), _GLF_FUZZED((4893.2796 - (-1.2))), bvec3(true, true, true), vec3(1.0, 1.0, 1.0), _GLF_struct_75(mat2x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), bvec2(true, true), uvec4(1u, 1u, 1u, 1u), true, _GLF_struct_76(mat3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), true, 1u, bvec2(true, true), true), 1u, uvec4(1u, 1u, 1u, 1u)), 1);
                int GLF_live14i = _GLF_FUZZED(23200);
                int GLF_live14looplimiter0 = 0;
                float GLF_live14refh = _GLF_FUZZED(6.7);
                float GLF_live14slope = _GLF_FUZZED((+(-7448.1599)));
                vec2 GLF_live14uvstep = _GLF_FUZZED((vec2(1.5, -2.5) * mat2(mat2x4(7.2, -6.2, 0.9, -3.3, -6.5, 1.8, -4.4, 8289.1606))));
                {
                    if (GLF_live14looplimiter0 >= 4) {
                        ;
                    }
                    GLF_live14looplimiter0++;
                    {
                        GLF_live14coord -= GLF_live14uvstep;
                        GLF_live14refh += GLF_live14slope;
                        _GLF_struct_replacement_74.GLF_live14h = texture(GLF_live14tex, GLF_live14coord).y;
                        GLF_live14i++;
                    }
                }
            }
        }
    }
    {
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        _GLF_color = floor(vec4(5.2, -171.619, -971.798, -441.403));
        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
    }
    {
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = normalize(vec4(-8309.5086, -67.40, 3447.7764, -6.4));
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                _GLF_color = _GLF_outlined_24(_GLF_outVarBackup_GLF_color);
            }
        }
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        _GLF_color = vec4(-629.981, 4.4, 0.5, 0.2);
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
            {
                vec4 GLF_live10c = _GLF_FUZZED(((-1.7) + vec4(0.9, -1.9, -50.88, -8.1)));
                int GLF_live10i = _GLF_FUZZED(-92164);
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = dFdx(vec4(4.7, 684.276, -2.7, 595.873));
                    if (_GLF_DEAD(false)) {
                        {
                            {
                                ;
                            }
                        }
                        return vec3(1.0, 1.0, 1.0);
                    }
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                {
                    GLF_live10c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10i, 4)] = GLF_live10c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10i, 4)] * GLF_live10c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10i, 4)];
                }
                if (_GLF_DEAD(_GLF_IDENTITY(false, true && (false)))) {
                    return vec3(1.0, 1.0, 1.0);
                }
                {
                    {
                        {
                            ;
                        }
                    }
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = _GLF_outlined_25();
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                        {
                            int GLF_live14looplimiter0 = 0;
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = min(vec4(278.286, -1616.4037, -8.9, 635.014), -18.93);
                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                            if (GLF_live14looplimiter0 >= 4) {
                                ;
                            }
                        }
                        _GLF_color = _GLF_outlined_26(_GLF_outVarBackup_GLF_color);
                    }
                }
            }
        }
    }
    bool c4 = pos.y + setting.x > square.y;
    if (!c4) {
        {
            vec4 GLF_live10c = _GLF_FUZZED((vec3(-5.0, -3.2, -89.16) * mat4x3(-166.522, 36.43, -6.8, 1.5, 36.12, 374.956, 6.1, 9.8, -1.2, 1.9, -4180.3426, 6.7)));
            int GLF_live10looplimiter1 = 0;
            for (int GLF_live10i = 0; GLF_live10i < 3; GLF_live10i++) {
                if (GLF_live10looplimiter1 >= 6) {
                    break;
                    if (_GLF_DEAD(false)) {
                        return vec3(1.0, 1.0, 1.0);
                    }
                }
                GLF_live10looplimiter1++;
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(1.0, -9999.5452, vec2(-560.992, -6.0));
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    discard;
                }
                {
                    if (GLF_live10c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10i, 4)] >= 1.0) {
                        GLF_live10c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10i, 4)] = GLF_live10c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10i, 4)] * GLF_live10c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10i, 4)];
                    }
                }
            }
        }
        return defaultColor();
    }
    {
        vec2 GLF_live11a = _GLF_FUZZED(vec2(-5247.2998, 69.51));
        float GLF_live11z = _GLF_FUZZED((-(true ? (-343.072) : (-614.711))));
        if (GLF_live11a.y > GLF_live11a.x) {
            GLF_live11z = GLF_live11a.x / GLF_live11a.y;
        } else {
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = step(vec4(498.168, 9.9, 1.6, 112.144), cos(vec4(-21.97, -9486.5270, 5.2, 1.8)));
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            GLF_live11z = GLF_live11a.y / GLF_live11a.x;
        }
    }
    {
        vec4 _GLF_outVarBackup_GLF_color;
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            return vec3(1.0, 1.0, 1.0);
        }
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = vec4(-3.4, -3211.1676, 4.3, 9.0);
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
        _GLF_outVarBackup_GLF_color = _GLF_outlined_57(_GLF_color);
        {
            vec2 GLF_live11a = _GLF_FUZZED((vec4(-694.524, 485.601, 78.64, -4.9) * mat2x4(67.91, 202.612, -8.3, 7.1, -0.3, 6.7, 99.78, 5988.5650)));
            float GLF_live11z = _GLF_FUZZED(219.536);
            {
                GLF_live11z = GLF_live11a.y / GLF_live11a.x;
            }
        }
        _GLF_color = vec4(-2.9, 21.15, -85.22, 253.326);
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
            {
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(-94.29, -1521.9712, 2491.6238, -580.141);
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                vec2 GLF_live6a = _GLF_FUZZED(vec2(-2542.4705, 9079.1380));
                {
                    float GLF_live11th = _GLF_FUZZED(float(true));
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = sign(vec4(5700.8420, -2.9, 832.389, -7.7));
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    vec2 GLF_live11v = _GLF_FUZZED(vec2(1.3, -52.45));
                    if (GLF_live11v.y < 0.0) {
                        GLF_live11th = -GLF_live11th;
                    }
                }
                float GLF_live6th = _GLF_FUZZED(vec2(-7388.2759, 441.772).r);
                if (GLF_live6a.y < GLF_live6a.x) {
                    GLF_live6th = 0.5 - GLF_live6th;
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(-9878.2226, 1.7, -4.6, 0.1);
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = vec4(3.7, -0.1, -9466.5357, 904.095);
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                }
                if (_GLF_DEAD(false)) {
                    {
                        {
                            ;
                        }
                    }
                    return vec3(1.0, 1.0, 1.0);
                }
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = _GLF_outlined_8();
                    {
                        vec2 GLF_live7coord = _GLF_FUZZED(((-194.435) + vec2(6.4, 7218.3197)));
                        int GLF_live7i = _GLF_FUZZED(int((+122339u)));
                        _GLF_struct_77 _GLF_struct_replacement_77 = _GLF_struct_77(uvec4(1u, 1u, 1u, 1u), 1u, mat4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), uvec3(1u, 1u, 1u), _GLF_FUZZED(vec4(144.705, -2.0, -5255.8694, 8.3)), vec3(1.0, 1.0, 1.0));
                        {
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = vec4(-1.3, -673.642, 3.0, 7524.4720);
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                            GLF_live7coord = _GLF_struct_replacement_77.GLF_live7texel.xz + _GLF_struct_replacement_77.GLF_live7texel.yy;
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = vec4(-8.6, -9.4, -94.82, 5.1);
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                            GLF_live7coord = floor(GLF_live7coord * 256.0) / 256.0;
                            _GLF_struct_replacement_77.GLF_live7texel = texture(GLF_live7tex, GLF_live7coord);
                            GLF_live7i++;
                        }
                    }
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outlined_9(_GLF_outVarBackup_GLF_color);
                    }
                    if (_GLF_DEAD(false)) {
                        return vec3(1.0, 1.0, 1.0);
                    }
                }
            }
            {
                vec2 GLF_live9coord = _GLF_FUZZED((vec2(9.2, -6.7)));
                float GLF_live9h = _GLF_FUZZED(2998.8659);
                int GLF_live9i = _GLF_FUZZED(88310);
                {
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = atanh(vec4(-973.134, 8.5, 5.2, -1.9));
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_outlined_27(_GLF_color);
                    _GLF_color = _GLF_outlined_28();
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                int GLF_live9looplimiter0 = 0;
                float GLF_live9refh = _GLF_FUZZED(4.5);
                _GLF_struct_78 _GLF_struct_replacement_78 = _GLF_struct_78(_GLF_struct_79(_GLF_struct_80(mat3x2(1.0, 1.0, 1.0, 1.0, 1.0, 1.0), true, uvec2(1u, 1u)), 1.0, mat3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), mat2x3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0), 1u, 1u), vec4(1.0, 1.0, 1.0, 1.0), bvec2(true, true), _GLF_FUZZED(vec4(-705.450, 378.598, 66.25, 2.2).z));
                vec2 GLF_live9uvstep = _GLF_FUZZED(vec2(6.4, 3.0));
                {
                    if (GLF_live9looplimiter0 >= 4) {
                        ;
                    }
                    GLF_live9looplimiter0++;
                    {
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = fwidthCoarse((mat2x4(-36.48, 6314.1920, 4.7, 1581.5465, -2.9, 0.3, -6.0, 0.8) * vec2(6.9, 8.9)));
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                        GLF_live9coord -= GLF_live9uvstep;
                        GLF_live9refh += _GLF_struct_replacement_78.GLF_live9slope;
                        GLF_live9h = texture(GLF_live9tex, GLF_live9coord).y;
                        GLF_live9i++;
                    }
                }
            }
        }
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
        return vec3(1.0, 1.0, 1.0);
    }
    _GLF_struct_0 _GLF_struct_replacement_0 = _GLF_struct_0(_GLF_struct_1(ivec4(1, 1, 1, 1), _GLF_struct_2(vec4(1.0, 1.0, 1.0, 1.0), true, mat2x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), mat4x2(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), mat2x3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0), mat3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), mat2x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0)), bvec2(true, true)), _GLF_struct_3(vec4(1.0, 1.0, 1.0, 1.0), mat2x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0)), ivec3(1, 1, 1), vec2(1.0, 1.0), true, pos.x - (setting.x - setting.y) < square.x, bvec2(true, true), uvec4(1u, 1u, 1u, 1u));
    if (!_GLF_struct_replacement_0.c5) {
        return computeColor(setting.z / (5.0 * float(findMSB(msb8))), pos);
    }
    {
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_outlined_58(_GLF_color);
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = vec4(68.35, -1.7, -6.0, -4192.3113);
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
        _GLF_color = vec4(-80.43, -39.36, 7.8, 4179.5363);
        if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(true, bool(bvec3(true, true, true))))) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
    }
    if (_GLF_DEAD(false)) {
        return vec3(1.0, 1.0, 1.0);
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = vec4(-1.2, -7730.2735, 26.75, -6137.2095);
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
    }
    _GLF_struct_81 _GLF_struct_replacement_81 = _GLF_struct_81(mat4x2(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), 1.0, uvec2(1u, 1u), pos.x + (setting.x - setting.y) > square.x, 1);
    {
        vec4 _GLF_outVarBackup_GLF_color;
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = abs(vec4(2.2, -4622.8132, 5.2, 5.0));
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
        _GLF_outVarBackup_GLF_color = _GLF_color;
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = uintBitsToFloat(uvec4(157657u, 187902u, 140445u, 83086u));
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
        _GLF_color = _GLF_outlined_59();
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = vec4(-502.974, 4.8, -5540.8823, 4.2);
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
        if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(true, false || (true)))) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
    }
    if (_GLF_DEAD(false)) {
        return vec3(1.0, 1.0, 1.0);
    }
    if (!_GLF_struct_replacement_81.c6) {
        return computeColor(setting.z / (5.0 * float(findMSB(msb8))), pos);
    }
    {
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_outlined_60(_GLF_color);
        _GLF_color = dFdxCoarse(degrees(vec4(6.6, 31.24, -715.322, -4.8)));
        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
    }
    bool c7 = pos.y - (setting.x - setting.y) < square.y;
    if (!c7) {
        {
            {
                vec2 GLF_live11a = _GLF_FUZZED((+vec2(-8537.7327, -1158.0372)));
                float GLF_live11z = _GLF_FUZZED((vec2(-1.5, -4.5).x));
                {
                    GLF_live11z = _GLF_outlined_61(GLF_live11a);
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(3.4, -81.69, 70.10, -7.1);
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                }
            }
            _GLF_struct_5 _GLF_struct_replacement_5 = _GLF_struct_5(true, ivec2(1, 1), uvec2(1u, 1u), bvec4(true, true, true, true), ivec4(1, 1, 1, 1), vec4(1.0, 1.0, 1.0, 1.0), _GLF_struct_6(bvec3(true, true, true)));
            {
                vec4 _GLF_outVarBackup_GLF_color;
                {
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(0.4, 0.3, -3.4, -923.610);
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = mix(vec4(-7276.0801, 4.2, -2.9, 1.3), vec4(1550.5161), bvec4(false, false, false, true));
                    {
                        int GLF_live13looplimiter1 = 0;
                        if (GLF_live13looplimiter1 >= 6) {
                            ;
                        }
                    }
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outlined_62(_GLF_outVarBackup_GLF_color);
                    }
                }
                _GLF_outVarBackup_GLF_color = _GLF_color;
                if (_GLF_DEAD(false)) {
                    return vec3(1.0, 1.0, 1.0);
                }
                _GLF_color = vec4(vec3(9477.3525, -12.09, -882.759), 5402.4102);
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            _GLF_struct_replacement_5._GLF_outVarBackup_GLF_color = _GLF_color;
            if (_GLF_DEAD(false)) {
                return vec3(1.0, 1.0, 1.0);
            }
            _GLF_color = vec4(5.8, -221.375, 1.2, 8070.2022);
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                _GLF_color = _GLF_struct_replacement_5._GLF_outVarBackup_GLF_color;
            }
        }
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = vec4(726.697, -2.0, -9.4, 5.0);
            {
                vec2 GLF_live14coord = _GLF_FUZZED(vec2(-8.7, 2174.3964));
                float GLF_live14h = _GLF_FUZZED(((false ? (-504.902) : 3.2) * (-8.2)));
                int GLF_live14i = _GLF_FUZZED((-12381));
                float GLF_live14refh = _GLF_FUZZED(-6.6);
                float GLF_live14slope = _GLF_FUZZED(((-77.26) - (-392.438)));
                vec2 GLF_live14uvstep = _GLF_FUZZED(vec2(-9.8, -2694.8956));
                {
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(-54.62, -54.63, -447.889, 1.1);
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    GLF_live14coord -= GLF_live14uvstep;
                    GLF_live14refh += GLF_live14slope;
                    GLF_live14h = texture(GLF_live14tex, GLF_live14coord).y;
                    GLF_live14i++;
                }
            }
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = (vec4(394.392, 441.477, 3.6, 6.3) * vec4(-5.0, -4.9, -4937.0526, -4.8));
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
            }
        }
        return computeColor(setting.z / (5.0 * float(findMSB(msb8))), pos);
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = refract(vec4(-3.8, -0.7, 55.38, 1.3), mix(vec4(-5447.9120, -14.34, 988.595, -4847.6646), vec4(-1.7, -3.3, 7.5, 448.058), vec4(-6214.7109, 4702.4666, 7849.1277, 673.341)), 2488.7754);
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
    }
    {
        int GLF_live13looplimiter0 = 0;
        if (GLF_live13looplimiter0 >= 6) {
            ;
        }
    }
    {
        if (_GLF_DEAD(_GLF_IDENTITY(false, (false) || false))) {
            return vec3(1.0, 1.0, 1.0);
        }
        ivec2 GLF_live2p = _GLF_FUZZED(ivec2(64934, -28938).gg);
        if (_GLF_DEAD(false)) {
            return vec3(1.0, 1.0, 1.0);
        }
        if (GLF_live2p.x < 0) {
            GLF_live2p.x = -GLF_live2p.x;
        }
    }
    {
        {
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(1.1, 3.0, -7397.3165, -2.5);
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                return vec3(1.0, 1.0, 1.0);
            }
            _GLF_color = vec4(-4.9, -6011.7312, 590.883, 687.938);
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(69.34, -8547.4032, -6401.9299, -8.1);
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= _GLF_IDENTITY(dot(vec4(0.0, tan(0.0), 1.0, 0.0), vec4(1.0, 1.0, 0.0, 1.0)), dot(vec4(0.0, tan(0.0), 1.0, 0.0), vec4(1.0, 1.0, 0.0, 1.0))))))) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
            if (_GLF_DEAD(false)) {
                return vec3(1.0, 1.0, 1.0);
            }
            {
                {
                    ;
                }
            }
        }
        vec2 GLF_live6a = _GLF_FUZZED(vec2(-76.99, -76.04));
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = vec4(-12.80, 5244.7649, 2038.5535, -5.2);
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
        float GLF_live6z = _GLF_FUZZED(vec2(4.7, 5114.1052).r);
        if (GLF_live6a.y > GLF_live6a.x) {
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = (faceforward(vec4(2554.8761, -3.3, 221.412, -16.76), vec4(-3686.4837, -97.21, 6.8, -8.4), step(4.7, vec4(-5.4, -1.9, 975.173, -86.27))) / vec4(64.17, 48.07, -5230.1523, 9475.7324));
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(9240.3033, 2339.5476, -6.9, 6.3);
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                _GLF_color = atan(vec4(-973.202, -16.17, -7599.9788, -791.822), (vec4(68.09, -443.965, -9.2, -596.428) / 828.536));
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            GLF_live6z = GLF_live6a.x / GLF_live6a.y;
        } else {
            GLF_live6z = GLF_live6a.y / GLF_live6a.x;
        }
    }
    bool c8 = pos.y + (setting.x - setting.y) > square.y;
    if (!c8) {
        if (_GLF_DEAD(_GLF_IDENTITY(false, !(!(false))))) {
            return vec3(1.0, 1.0, 1.0);
        }
        return computeColor(setting.z / (5.0 * float(findMSB(msb8))), pos);
        if (_GLF_DEAD(false)) {
            return vec3(1.0, 1.0, 1.0);
            if (_GLF_DEAD(false)) {
                return vec3(1.0, 1.0, 1.0);
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(58.17, -8.0, -7.2, -2973.5681);
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
            }
        }
    }
    return defaultColor();
}

vec2 _GLF_outlined_10(vec2 resolution) {
    return resolution.xy / min(resolution.x, resolution.y);
}

vec4 _GLF_outlined_11(vec4 _GLF_outVarBackup_GLF_color) {
    return _GLF_outVarBackup_GLF_color;
}

vec4 _GLF_outlined_29(vec4 _GLF_color) {
    return _GLF_color;
}

vec4 _GLF_outlined_30() {
    return mat4(3.8, -132.121, -9.0, 52.05, 9.8, 5.7, -2.1, -9.2, -4.9, 760.473, 33.27, -637.681, -46.78, 5885.2675, -6.8, 5.9)[3];
}

vec4 _GLF_outlined_12() {
    if (_GLF_DEAD(false)) {
        return vec4(1.0, 1.0, 1.0, 1.0);
    }
    return vec4(vec2(9.8, -2.8), fwidthFine(64.51), -2.7);
    {
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_outlined_29(_GLF_color);
        _GLF_color = _GLF_outlined_30();
        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= length(vec3(0.0, 0.0, 0.0)))))) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(-772.646, 4.3, -53.75, -4884.9316);
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
        }
    }
}

vec4 _GLF_outlined_31() {
    return vec4(253.453, -762.056, -98.14, -2216.4911);
}

vec4 _GLF_outlined_32(vec4 _GLF_color) {
    return _GLF_color;
}

vec4 _GLF_outlined_33(vec4 _GLF_color) {
    return _GLF_color;
}

vec2 _GLF_outlined_34(vec2 resolution, vec2 aspect) {
    return (gl_FragCoord.xy / resolution.xy) * aspect;
}

vec4 _GLF_outlined_63(vec4 _GLF_outVarBackup_GLF_color) {
    return _GLF_outVarBackup_GLF_color;
}

vec4 _GLF_outlined_64(vec4 _GLF_outVarBackup_GLF_color) {
    return _GLF_outVarBackup_GLF_color;
}

vec4 _GLF_outlined_65() {
    return atanh(smoothstep(67.94, 7.7, vec4(-4.2, 290.366, -981.460, 308.316)));
}

vec4 _GLF_outlined_66(vec4 _GLF_outVarBackup_GLF_color) {
    return _GLF_outVarBackup_GLF_color;
}

vec4 _GLF_outlined_67(vec4 _GLF_outVarBackup_GLF_color) {
    return _GLF_outVarBackup_GLF_color;
}

vec4 _GLF_outlined_68() {
    return unpackSnorm4x8(41690u);
}

vec4 _GLF_outlined_69(vec4 _GLF_outVarBackup_GLF_color) {
    return _GLF_outVarBackup_GLF_color;
}

vec4 _GLF_outlined_70(vec4 _GLF_outVarBackup_GLF_color) {
    return _GLF_outVarBackup_GLF_color;
}

vec4 _GLF_outlined_71(vec4 _GLF_outVarBackup_GLF_color) {
    return _GLF_outVarBackup_GLF_color;
}

vec4 _GLF_outlined_72() {
    return vec4(9.5, 6357.1077, -3.3, 3.1);
}

vec4 _GLF_outlined_73(vec4 _GLF_color) {
    return _GLF_color;
}

float _GLF_outlined_74(float GLF_live11th) {
    return 1.0 - GLF_live11th;
}

vec3 _GLF_outlined_75(vec3 d) {
    return vec3(d);
}

vec3 computePoint(mat2 rotationMatrix) {
    {
        if (_GLF_DEAD(false)) {
            return vec3(1.0, 1.0, 1.0);
            if (_GLF_DEAD(false)) {
                return vec3(1.0, 1.0, 1.0);
            }
        }
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = vec4(-5181.6967, -5.7, 0.2, 256.951);
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                {
                    _GLF_struct_82 _GLF_struct_replacement_82 = _GLF_struct_82(ivec2(1, 1), vec4(1.0, 1.0, 1.0, 1.0));
                    _GLF_struct_replacement_82._GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = step(vec4(6390.8195, 4388.5177, 918.944, 519.814), radians(fwidthCoarse(vec4(9457.2562, 334.268, 8.6, 1.1))));
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            return vec3(1.0, 1.0, 1.0);
                        }
                        _GLF_color = _GLF_struct_replacement_82._GLF_outVarBackup_GLF_color;
                    }
                }
                if (_GLF_DEAD(false)) {
                    return vec3(1.0, 1.0, 1.0);
                }
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < abs(0.0))))) {
                return vec3(1.0, 1.0, 1.0);
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = _GLF_outlined_31();
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
            }
            if (_GLF_DEAD(false)) {
                return vec3(1.0, 1.0, 1.0);
            }
        }
        int GLF_live0looplimiter0 = 0;
        if (_GLF_DEAD(false)) {
            return vec3(1.0, 1.0, 1.0);
        }
        ivec2 GLF_live0pos = _GLF_FUZZED(ivec2(9832, 44918));
        {
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = sign(vec4(-78.62, 7525.0576, -642.032, 188.595));
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outlined_63(_GLF_outVarBackup_GLF_color);
                }
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(-835.920, 9665.6259, -3167.5521, -9.8);
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(-0.4, 6559.8668, 5.2, -4.6);
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    return vec3(1.0, 1.0, 1.0);
                }
                if (_GLF_DEAD(false)) {
                    return vec3(1.0, 1.0, 1.0);
                    {
                        float GLF_live13c_im = _GLF_FUZZED(float((23980u > 116647u)));
                        float GLF_live13c_re = _GLF_FUZZED(89.35);
                        int GLF_live13iteration = _GLF_FUZZED(-81975);
                        int GLF_live13looplimiter0 = 0;
                        float GLF_live13x = _GLF_FUZZED(float(false));
                        float GLF_live13y = _GLF_FUZZED(-23.06);
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = vec4(1.8, 93.95, 4706.5708, -8610.3387);
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                        for (int GLF_live13k = 0; GLF_live13k < 1000; GLF_live13k++) {
                            if (GLF_live13looplimiter0 >= 6) {
                                break;
                            }
                            GLF_live13looplimiter0++;
                            {
                                if (GLF_live13x * GLF_live13x + GLF_live13y * GLF_live13y > 4.0) {
                                    break;
                                }
                                float GLF_live13x_new = GLF_live13x * GLF_live13x - GLF_live13y * GLF_live13y + GLF_live13c_re;
                                GLF_live13y = 2.0 * GLF_live13x * GLF_live13y + GLF_live13c_im;
                                GLF_live13x = GLF_live13x_new;
                                GLF_live13iteration++;
                            }
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = vec4(-1562.6443, -1914.9362, -73.93, 4.0);
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                        }
                    }
                }
            }
            {
                vec2 GLF_live9coord = _GLF_FUZZED(vec2(-7.5, -94.49));
                {
                    _GLF_struct_83 _GLF_struct_replacement_83 = _GLF_struct_83(_GLF_struct_84(uvec3(1u, 1u, 1u), true, 1.0), mat3x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), _GLF_FUZZED(vec2(-682.442, 5.3)), 1.0, uvec4(1u, 1u, 1u, 1u), _GLF_struct_85(uvec2(1u, 1u), 1.0, vec3(1.0, 1.0, 1.0), 1.0, bvec2(true, true)), _GLF_struct_86(mat2x3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0), mat4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0)), mat4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0));
                    float GLF_live14h = _GLF_FUZZED(8264.5420);
                    int GLF_live14i = _GLF_FUZZED((+58542));
                    int GLF_live14looplimiter0 = 0;
                    float GLF_live14refh = _GLF_FUZZED(-1.3);
                    float GLF_live14slope = _GLF_FUZZED(4.5);
                    vec2 GLF_live14uvstep = _GLF_FUZZED(vec2(-6.3, 684.295));
                    {
                        if (GLF_live14looplimiter0 >= 4) {
                            ;
                        }
                        GLF_live14looplimiter0++;
                        {
                            _GLF_struct_replacement_83.GLF_live14coord -= GLF_live14uvstep;
                            GLF_live14refh += GLF_live14slope;
                            GLF_live14h = texture(GLF_live14tex, _GLF_struct_replacement_83.GLF_live14coord).y;
                            GLF_live14i++;
                        }
                    }
                }
                float GLF_live9h = _GLF_FUZZED(-650.852);
                int GLF_live9i = _GLF_FUZZED(8154);
                float GLF_live9refh = _GLF_FUZZED(((-3.3) + 5.1));
                float GLF_live9slope = _GLF_FUZZED(3.0);
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = (vec4(-1.7, 2.0, 9.4, -4.8) * mat4(4.1, -448.024, 0.1, 7.6, 88.38, -7.9, 31.17, -9129.8867, -7121.6323, -5.2, 35.47, 97.26, -9.2, 5.7, -635.256, -84.82));
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                vec2 GLF_live9uvstep = _GLF_FUZZED(vec2(-216.999, -7.4));
                {
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = radians(vec4(9.0, 42.69, -5.9, 3.8));
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= length(vec3(0.0, 0.0, 0.0)))))) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    {
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = ((-7.9) + (vec2(-84.32, -8.3) * mat4x2(7.4, -4.8, 79.02, 222.034, 45.68, 9837.3080, 2138.8068, -6.5)));
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                        int GLF_live12i = _GLF_FUZZED(1116);
                        int GLF_live12j = _GLF_FUZZED(45266);
                        int GLF_live12k = _GLF_FUZZED(-5229);
                        {
                            if (GLF_live12data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12i, 10)] < GLF_live12data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12j, 10)]) {
                                GLF_live12temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12k++, 10)] = GLF_live12data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12i++, 10)];
                            } else {
                                GLF_live12temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12k++, 10)] = GLF_live12data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12j++, 10)];
                            }
                        }
                    }
                    int GLF_live9looplimiter0 = 0;
                    while (GLF_live9h < GLF_live9refh && GLF_live9i < 32) {
                        if (GLF_live9looplimiter0 >= 4) {
                            break;
                        }
                        GLF_live9looplimiter0++;
                        {
                            GLF_live9coord -= GLF_live9uvstep;
                            GLF_live9refh += GLF_live9slope;
                            GLF_live9h = texture(GLF_live9tex, GLF_live9coord).y;
                            GLF_live9i++;
                        }
                        {
                            _GLF_struct_87 _GLF_struct_replacement_87 = _GLF_struct_87(_GLF_struct_88(vec4(1.0, 1.0, 1.0, 1.0), uvec4(1u, 1u, 1u, 1u)), uvec2(1u, 1u), bvec4(true, true, true, true));
                            _GLF_struct_replacement_87._f0._GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = vec4(-8.1, -158.023, 480.224, 9.9);
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                _GLF_color = _GLF_struct_replacement_87._f0._GLF_outVarBackup_GLF_color;
                            }
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = vec4(-0.8, -2.4, 971.969, -6251.8845);
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                        return vec3(1.0, 1.0, 1.0);
                    }
                }
            }
            int GLF_live5looplimiter0 = 0;
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                if (_GLF_DEAD(false)) {
                    return vec3(1.0, 1.0, 1.0);
                }
                _GLF_color = vec4(14.10, -637.713, 7.9, -635.222);
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            if (GLF_live5looplimiter0 >= 3) {
                ;
            }
        }
        while (GLF_live0pos.y != 256) {
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                break;
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    break;
                }
            }
            if (GLF_live0looplimiter0 >= 5) {
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = unpackSnorm4x8(uint(true));
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        {
                            float GLF_live13c_im = _GLF_FUZZED(((54434u >= 14361u) ? 291.986 : 10.16));
                            float GLF_live13c_re = _GLF_FUZZED(-5.4);
                            int GLF_live13iteration = _GLF_FUZZED(65205);
                            int GLF_live13looplimiter0 = 0;
                            float GLF_live13x = _GLF_FUZZED((7.1));
                            _GLF_struct_89 _GLF_struct_replacement_89 = _GLF_struct_89(mat4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), uvec2(1u, 1u), _GLF_struct_90(mat4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), ivec4(1, 1, 1, 1), _GLF_FUZZED(vec3(-8.1, 87.85, -889.539).p)), bvec2(true, true));
                            {
                                if (GLF_live13looplimiter0 >= 6) {
                                    ;
                                }
                                GLF_live13looplimiter0++;
                                {
                                    if (GLF_live13x * GLF_live13x + _GLF_struct_replacement_89._f2.GLF_live13y * _GLF_struct_replacement_89._f2.GLF_live13y > 4.0) {
                                        ;
                                    }
                                    _GLF_struct_91 _GLF_struct_replacement_91 = _GLF_struct_91(GLF_live13x * GLF_live13x - _GLF_struct_replacement_89._f2.GLF_live13y * _GLF_struct_replacement_89._f2.GLF_live13y + GLF_live13c_re, mat3x2(1.0, 1.0, 1.0, 1.0, 1.0, 1.0), 1.0, bvec4(true, true, true, true), uvec2(1u, 1u), _GLF_struct_92(mat3x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), mat3x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), vec4(1.0, 1.0, 1.0, 1.0), ivec2(1, 1)), ivec2(1, 1));
                                    _GLF_struct_replacement_89._f2.GLF_live13y = 2.0 * GLF_live13x * _GLF_struct_replacement_89._f2.GLF_live13y + GLF_live13c_im;
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        _GLF_color = uintBitsToFloat((uvec4(180147u, 74766u, 160645u, 120417u) / 54657u));
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                    }
                                    GLF_live13x = _GLF_struct_replacement_91.GLF_live13x_new;
                                    GLF_live13iteration++;
                                }
                            }
                        }
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                break;
            }
            GLF_live0looplimiter0++;
            {
                _GLF_struct_16 _GLF_struct_replacement_16 = _GLF_struct_16(_GLF_struct_17(uvec2(1u, 1u), _GLF_struct_18(mat2x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), vec2(1.0, 1.0), mat2x3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0), ivec2(1, 1), bvec3(true, true, true), vec2(1.0, 1.0)), _GLF_struct_19(vec4(1.0, 1.0, 1.0, 1.0), mat3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0)), _GLF_struct_20(bvec2(true, true))), vec4(1.0, 1.0, 1.0, 1.0), bvec2(true, true), true, uvec4(1u, 1u, 1u, 1u), mat4x2(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), vec2(1.0, 1.0));
                _GLF_struct_replacement_16._GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = (vec4(-9694.7137, -6.2, -383.640, 443.903) / (-2692.9704));
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    {
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = inversesqrt(vec4(56.21, 98.21, -3910.0870, 564.155));
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = vec4(33.30, -4763.9604, 0.0, -822.435);
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                        _GLF_color = ((mat2(703.759, -3.8, 6.8, 9.9) == mat2(-26.69, -3519.5680, -7.2, 271.296)) ? normalize(vec4(-2757.2373, -45.48, -365.960, 63.68)) : vec4(-6.3, 9822.0848, 1.3, 6.3));
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = vec4(-8214.9160, 493.227, -5.4, -729.867);
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outlined_64(_GLF_outVarBackup_GLF_color);
                        }
                        if (_GLF_DEAD(false)) {
                            break;
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        continue;
                    }
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(0.0, 287.438, 713.893, -592.234);
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    _GLF_color = floor(vec4(2220.2281, 31.61, -4.6, -222.529));
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = vec4(5.4, 2475.6654, 6.4, -5786.2812);
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                    }
                }
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(8.2, 4.2, 3938.7621, 7547.6908);
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    _GLF_color = _GLF_struct_replacement_16._GLF_outVarBackup_GLF_color;
                }
            }
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(-2.1, 5.9, -469.649, 17.02);
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            {
                if (GLF_live0pos.x < GLF_live0dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live0pos.y, 256)] + 15 && GLF_live0pos.x > GLF_live0dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live0pos.y, 256)] - 15) {
                    float GLF_live0p = (15.0 - abs(float(GLF_live0pos.x - GLF_live0dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live0pos.y, 256)]))) / 15.0;
                    ;
                }
                GLF_live0pos.y++;
            }
        }
        {
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = _GLF_outlined_65();
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(-62.87, -894.910, -806.122, 3.0);
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    {
                        {
                            ;
                        }
                    }
                }
            }
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = ((vec4(-8840.1299, -5426.2850, -5.7, 22.00) * mat4(-16.56, -944.560, -5887.3468, -59.61, -611.867, 3.9, -5.0, 3929.3489, -5.6, 64.12, 6145.0395, 4.4, 6385.0280, 21.87, 8424.0305, -357.666)) * (-5.2));
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            _GLF_color = vec4(2353.9495, 9.9, -1.3, 8.8);
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                _GLF_color = _GLF_outlined_66(_GLF_outVarBackup_GLF_color);
            }
        }
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_outlined_32(_GLF_color);
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(81.80, 1026.4870, 9.5, 4.5);
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            _GLF_color = vec4(-38.88, -778.550, -12.46, 352.311);
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = sqrt(vec4(2.9, -743.385, -7515.8215, 794.699));
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
            }
        }
    }
    int msb8 = 256;
    vec2 aspect;
    aspect = _GLF_outlined_10(resolution);
    {
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        _GLF_color = vec4(71.58, -55.41, 7.5, -6.9);
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = (vec4(-2.4, 27.36, -3.7, 879.376));
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = vec4(radians(-9.1));
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                _GLF_color = _GLF_outlined_67(_GLF_outVarBackup_GLF_color);
            }
        }
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = _GLF_outlined_68();
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
    }
    {
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        _GLF_color = ((vec4(-4.3, 87.26, 2.9, 64.40) * 7.0) / determinant(mat3(mat2x3(4484.2475, 327.362, -7.7, 3.7, -751.779, 17.74))));
        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
    }
    vec2 position;
    {
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = vec4(-5653.2590, 23.59, -1.8, 8.7);
            if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(true, !(!(true))))) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
        int GLF_live0looplimiter0 = 0;
        ivec2 GLF_live0pos = _GLF_FUZZED(ivec2(75932, -29630));
        {
            vec2 GLF_live8coord = _GLF_FUZZED((vec3(-6.3, 58.43, -470.625) * mat2x3(-163.151, -1.5, 3.9, -5.8, 5445.1682, 1470.9863)));
            {
                _GLF_struct_93 _GLF_struct_replacement_93 = _GLF_struct_93(vec3(1.0, 1.0, 1.0), _GLF_struct_94(vec4(1.0, 1.0, 1.0, 1.0), ivec2(1, 1), _GLF_struct_95(mat4x2(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), bvec4(true, true, true, true), uvec3(1u, 1u, 1u), vec4(1.0, 1.0, 1.0, 1.0), mat4x2(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), mat2x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), mat4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), bvec4(true, true, true, true)), ivec2(1, 1), _GLF_struct_96(uvec3(1u, 1u, 1u), vec4(1.0, 1.0, 1.0, 1.0), 1u, ivec4(1, 1, 1, 1))), mat3x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), _GLF_struct_97(ivec4(1, 1, 1, 1), 1.0, mat3x2(1.0, 1.0, 1.0, 1.0, 1.0, 1.0), ivec4(1, 1, 1, 1), ivec4(1, 1, 1, 1), bvec2(true, true), uvec3(1u, 1u, 1u)), uvec2(1u, 1u));
                _GLF_struct_replacement_93._f1._f2._GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = (6.2 + vec4(209.963, -1370.2356, 861.387, -99.39));
                {
                    {
                        ;
                    }
                }
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = pow(vec4(-2745.7382, 371.951, -76.59, 707.268), vec4(-2148.3636, 38.79, -1918.2379, -3.9));
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    _GLF_color = _GLF_outlined_69(_GLF_struct_replacement_93._f1._f2._GLF_outVarBackup_GLF_color);
                }
            }
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(-371.206, 9606.0166, 1.9, 710.493);
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            int GLF_live8i = _GLF_FUZZED(-10572);
            int GLF_live8looplimiter0 = 0;
            {
                {
                    {
                        ;
                    }
                }
                if (GLF_live8looplimiter0 >= 6) {
                    ;
                }
                GLF_live8looplimiter0++;
                {
                    if (GLF_live8coord.x > 1.0) {
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            return vec3(1.0, 1.0, 1.0);
                        }
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = ceil(vec4(-3.7, -981.964, -5968.1241, -2.0));
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                        GLF_live8coord.x -= 1.0;
                    }
                    if (GLF_live8coord.y > 1.0)
                        GLF_live8coord.y -= 1.0;
                    GLF_live8coord *= 2.0;
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = mod(fwidth(vec4(-3.4, 82.35, -5514.2684, -9134.9949)), -3987.5088);
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    GLF_live8i++;
                }
            }
        }
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = vec4(-3.6, 7175.7789, 8.5, -5088.7498);
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
        {
            vec4 _GLF_outVarBackup_GLF_color;
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(3.3, -6864.0040, 1049.4489, -9.4);
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outlined_70(_GLF_outVarBackup_GLF_color);
                }
            }
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = atan(vec4(-559.472, 6.5, 1029.8060, -33.91));
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                _GLF_color = _GLF_outlined_71(_GLF_outVarBackup_GLF_color);
                {
                    _GLF_struct_98 _GLF_struct_replacement_98 = _GLF_struct_98(_GLF_FUZZED(vec4(8044.7958, -522.947, 14.02, 27.50).b), mat4x2(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0));
                    if (int(GLF_live12gl_FragCoord[1]) < 120) {
                        _GLF_struct_replacement_98.GLF_live12grey = 0.5 + float(GLF_live12data[3]) / 10.0;
                    } else {
                        if (int(GLF_live12gl_FragCoord[1]) < 150) {
                            ;
                        } else {
                            if (int(GLF_live12gl_FragCoord[1]) < 180) {
                                _GLF_struct_replacement_98.GLF_live12grey = 0.5 + float(GLF_live12data[5]) / 10.0;
                            } else {
                                if (int(GLF_live12gl_FragCoord[1]) < 210) {
                                    _GLF_struct_replacement_98.GLF_live12grey = 0.5 + float(GLF_live12data[6]) / 10.0;
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        _GLF_color = ((0.6 * vec4(4095.3323, -576.658, 3.7, -182.767)) / (ivec3(33170, 32155, 37222), vec4(4.1, -201.890, 6.8, 6.2)));
                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                    }
                                } else {
                                    if (int(GLF_live12gl_FragCoord[1]) < 240) {
                                        _GLF_struct_replacement_98.GLF_live12grey = 0.5 + float(GLF_live12data[7]) / 10.0;
                                        {
                                            vec4 _GLF_outVarBackup_GLF_color;
                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                            _GLF_color = vec4(0.6, 0.9, 4626.2463, -40.76);
                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                            }
                                        }
                                    } else {
                                        if (int(GLF_live12gl_FragCoord[1]) < 270) {
                                            _GLF_struct_replacement_98.GLF_live12grey = 0.5 + float(GLF_live12data[8]) / 10.0;
                                        } else {
                                            ;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(-28.15, 8.5, 539.657, 533.262);
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
            }
        }
        while (GLF_live0pos.y != 256) {
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                discard;
            }
            if (GLF_live0looplimiter0 >= 5) {
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = dFdxCoarse(vec4(24.14, 7417.4394, 383.230, 828.038));
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_outlined_33(_GLF_color);
                    if (_GLF_DEAD(false)) {
                        break;
                    }
                    _GLF_color = _GLF_outlined_72();
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = vec4(903.525, 5416.6865, -46.04, 8.4);
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = vec4(-0.3, -81.63, -44.12, 1020.9404);
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                        {
                            vec2 GLF_live14coord = _GLF_FUZZED(vec2(vec4(-4698.3686, -3936.4726, 63.76, -2.5)));
                            float GLF_live14h = _GLF_FUZZED((float(false) * float(37779)));
                            int GLF_live14i = _GLF_FUZZED(-96165);
                            int GLF_live14looplimiter0 = 0;
                            _GLF_struct_99 _GLF_struct_replacement_99 = _GLF_struct_99(_GLF_FUZZED(((892.562))), mat4x3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0));
                            float GLF_live14slope = _GLF_FUZZED(9.7);
                            vec2 GLF_live14uvstep = _GLF_FUZZED(vec2(9.6, 1407.4002));
                            {
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = vec4(1.2, 3728.4290, -3.6, -545.287);
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                                if (GLF_live14looplimiter0 >= 4) {
                                    ;
                                }
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = (mat3x4(9245.3123, 2.3, -8.6, -26.60, 2772.9088, 8149.6510, -97.06, 0.3, -6.9, -1.3, 52.40, 1569.0516) * vec3(1060.7473, -622.988, -506.621));
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                                GLF_live14looplimiter0++;
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = ldexp(vec4(461.272, 3.9, -5.9, 8.3), (48808 ^ ivec4(29927, -12052, 34898, 80894)));
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                                {
                                    GLF_live14coord -= GLF_live14uvstep;
                                    _GLF_struct_replacement_99.GLF_live14refh += GLF_live14slope;
                                    GLF_live14h = texture(GLF_live14tex, GLF_live14coord).y;
                                    GLF_live14i++;
                                }
                            }
                        }
                    }
                }
                {
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        continue;
                    }
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = dFdyCoarse(vec4(9900.4112, -3999.6365, 6776.9532, -73.28));
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = asin(vec4(870.861, 5503.5564, -2.3, 61.28));
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outlined_11(_GLF_outVarBackup_GLF_color);
                    }
                }
                break;
            }
            GLF_live0looplimiter0++;
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(694.561, -8.4, -236.702, -33.78);
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= tan(0.0))))) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            {
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(-8445.7417, 27.10, -684.054, intBitsToFloat(29987));
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                vec2 GLF_live14coord = _GLF_FUZZED(vec2(35.66, -909.097));
                _GLF_struct_100 _GLF_struct_replacement_100 = _GLF_struct_100(vec2(1.0, 1.0), vec4(1.0, 1.0, 1.0, 1.0), ivec4(1, 1, 1, 1), _GLF_struct_101(1u, mat2x3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0), _GLF_struct_102(mat3x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), mat2x3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0), mat4x2(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0)), _GLF_struct_103(uvec4(1u, 1u, 1u, 1u), true, uvec2(1u, 1u), ivec4(1, 1, 1, 1)), uvec2(1u, 1u)), mat2(1.0, 1.0, 1.0, 1.0), _GLF_struct_104(1, _GLF_struct_105(vec3(1.0, 1.0, 1.0), mat4x2(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0)), _GLF_struct_106(_GLF_FUZZED(-44.26), mat2x3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0), vec2(1.0, 1.0), vec4(1.0, 1.0, 1.0, 1.0), mat3x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0)), _GLF_struct_107(mat4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), vec3(1.0, 1.0, 1.0), vec3(1.0, 1.0, 1.0), true)), bvec2(true, true));
                int GLF_live14i = _GLF_FUZZED(66232);
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = (vec4(31.44, 7.6, -2198.4039, 983.422) - vec4(8.5, 4.9, -369.850, -52.24));
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                int GLF_live14looplimiter0 = 0;
                float GLF_live14refh = _GLF_FUZZED((-(-21.11)));
                _GLF_struct_108 _GLF_struct_replacement_108 = _GLF_struct_108(_GLF_struct_109(_GLF_struct_110(_GLF_FUZZED((463.940 - 61.73)), mat2x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), 1.0, bvec2(true, true), bvec2(true, true)), true, ivec4(1, 1, 1, 1)), vec4(1.0, 1.0, 1.0, 1.0), vec4(1.0, 1.0, 1.0, 1.0), vec4(1.0, 1.0, 1.0, 1.0), true, mat4x2(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0));
                vec2 GLF_live14uvstep = _GLF_FUZZED(vec2(-6859.1936, -3.0));
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = dFdyCoarse(vec4(-936.006, 7.3, 652.108, 495.993));
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                {
                    if (GLF_live14looplimiter0 >= 4) {
                        ;
                    }
                    GLF_live14looplimiter0++;
                    {
                        GLF_live14coord -= GLF_live14uvstep;
                        GLF_live14refh += _GLF_struct_replacement_108._f0._f0.GLF_live14slope;
                        _GLF_struct_replacement_100._f5._f2.GLF_live14h = texture(GLF_live14tex, GLF_live14coord).y;
                        GLF_live14i++;
                    }
                }
            }
            {
                if (GLF_live0pos.x < GLF_live0dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live0pos.y, 256)] + 15 && GLF_live0pos.x > GLF_live0dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live0pos.y, 256)] - 15) {
                    float GLF_live0p = (15.0 - abs(float(GLF_live0pos.x - GLF_live0dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live0pos.y, 256)]))) / 15.0;
                    ;
                }
                GLF_live0pos.y++;
            }
        }
    }
    position = _GLF_outlined_34(resolution, aspect);
    {
        vec4 _GLF_outVarBackup_GLF_color;
        if (_GLF_DEAD(false)) {
            return vec3(1.0, 1.0, 1.0);
        }
        _GLF_outVarBackup_GLF_color = _GLF_outlined_73(_GLF_color);
        _GLF_color = vec4(3298.0085, 156.139, -4.0, -7511.6371);
        {
            {
                {
                    ;
                }
            }
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = vec4(3.2, -46.11, vec2(-82.06, 140.655));
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= _GLF_IDENTITY(dot(vec4(0.0, 1.0, sqrt(1.0), 1.0), vec4(1.0, 0.0, 0.0, 0.0)), dot(vec4(0.0, 1.0, sqrt(1.0), 1.0), vec4(1.0, 0.0, 0.0, 0.0))))))) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
            {
                int GLF_live7looplimiter0 = 0;
                if (GLF_live7looplimiter0 >= 6) {
                    ;
                }
            }
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = mix(vec4(43.83, 0.8, -6.6, 8.0), vec4(3.9, -6.7, 7.7, -4.2), vec4(-15.12, 8.9, -40.23, 4753.2008));
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
        }
    }
    _GLF_struct_21 _GLF_struct_replacement_21 = _GLF_struct_21(ivec3(1, 1, 1), mat3x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), vec2(1.0, 1.0), uvec2(1u, 1u));
    {
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
            return vec3(1.0, 1.0, 1.0);
        }
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        _GLF_color = vec4(-5.9, -5.9, 4.4, 5.5);
        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
            {
                float GLF_live11th = _GLF_FUZZED(-7613.9360);
                vec2 GLF_live11v = _GLF_FUZZED(vec2(74.45, -2.2));
                if (GLF_live11v.x < 0.0) {
                    GLF_live11th = _GLF_outlined_74(GLF_live11th);
                }
            }
        }
    }
    _GLF_struct_replacement_21.center = vec2(0.5) * aspect;
    position *= rotationMatrix;
    {
        float GLF_live12grey = _GLF_FUZZED((-(-(260.484))));
        {
            GLF_live12grey = 0.5 + float(GLF_live12data[8]) / 10.0;
        }
    }
    {
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        _GLF_color = vec4(-8.2, 22.74, 6692.1811, 17.68);
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
    }
    {
        float GLF_live6th = _GLF_FUZZED(73.41);
        {
            GLF_live6th = -GLF_live6th;
        }
    }
    {
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        _GLF_color = atanh(vec4(-73.75, 0.5, 9.1, 0.6));
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
    }
    _GLF_struct_replacement_21.center *= rotationMatrix;
    vec3 result = vec3(0.0);
    {
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            {
                _GLF_struct_111 _GLF_struct_replacement_111 = _GLF_struct_111(uvec3(1u, 1u, 1u), _GLF_struct_112(_GLF_struct_113(bvec4(true, true, true, true), vec2(1.0, 1.0), mat3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0)), uvec4(1u, 1u, 1u, 1u), _GLF_struct_114(mat3x2(1.0, 1.0, 1.0, 1.0, 1.0, 1.0), 1.0, vec3(1.0, 1.0, 1.0))), _GLF_struct_115(vec4(1.0, 1.0, 1.0, 1.0), _GLF_struct_116(1u, vec3(1.0, 1.0, 1.0))));
                _GLF_struct_replacement_111._f2._GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = exp(vec4(181.748, -3.5, 0.4, -2107.6972));
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_struct_replacement_111._f2._GLF_outVarBackup_GLF_color;
                }
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                return vec3(1.0, 1.0, 1.0);
            }
            return vec3(1.0, 1.0, 1.0);
        }
        _GLF_color = _GLF_outlined_12();
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(-1013.4600, 1723.1267, 15.08, 3.3);
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
        }
    }
    {
        {
            int GLF_live12looplimiter6 = 0;
            for (int GLF_live12j = 0; GLF_live12j < 10; GLF_live12j++) {
                if (GLF_live12looplimiter6 >= 4) {
                    break;
                }
                GLF_live12looplimiter6++;
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = abs(vec4(-7.5, 9.0, -22.55, -9.8));
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                {
                    GLF_live12temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12j, 10)] = GLF_live12data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12j, 10)];
                }
            }
        }
    }
    for (int i = bitfieldInsert(35, 0, 0, bitfieldExtract(int(resolution.x), 0, 0)); i >= bitfieldReverse(bitfieldExtract(int(resolution.x), 0, 0)); i--) {
        vec3 d;
        d = drawShape(position, _GLF_struct_replacement_21.center + vec2(sin(float(i) / (float(bitCount(msb8)) * 10.0) + time) / 4.0 * float(bitCount(msb8)), float(bitfieldExtract(int(resolution.x), 0, 0))), vec3(0.01 + sin(float(i) / 100.0 * float(bitCount(msb8))), 0.01, float(i)));
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = mix(mod(vec4(2558.1897, 7.3, -9501.6412, 781.138), atan(vec4(-86.11, 77.74, 2857.7162, -76.26), vec4(-3.2, -0.0, 4310.3846, -115.815))), vec4(74.98, -570.499, -63.27, -22.34), greaterThanEqual(ivec4(-36592, -71345, -7542, -90067), ivec4(11236, 67694, -48163, -97098)));
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(3.3, 8.6, 2222.8715, 0.4);
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
        if (length(d) <= float(bitfieldExtract(int(resolution.x), 0, 0))) {
            continue;
        }
        result = _GLF_outlined_75(d);
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = vec4(-564.612, -4.7, -36.28, 5017.4243);
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = mix(vec4(-4.1, 2.5, -28.57, 0.3), vec4(-62.00, 5.8, -8466.2002, 6849.4764), 278.897);
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
        }
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = radians(vec4(6874.2314, -8.1, -234.345, 3557.2909));
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = vec4(-6.4, 2269.7719, 7.0, 6.3);
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
            {
                int GLF_live12high = _GLF_FUZZED(2389);
                int GLF_live12low = _GLF_FUZZED(((-21171) - 52958));
                int GLF_live12m = _GLF_FUZZED(((-70823) * (-46050)));
                {
                    int GLF_live12looplimiter3 = 0;
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(2664.1705, -0.9, 1934.1625, -1041.3328);
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= determinant(mat2(0.0, 0.0, 0.0, 0.0)))))) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    for (int GLF_live12i = GLF_live12low; GLF_live12i < GLF_live12high; GLF_live12i += 2 * GLF_live12m) {
                        if (GLF_live12looplimiter3 >= 4) {
                            break;
                        }
                        GLF_live12looplimiter3++;
                        {
                            int GLF_live12from = GLF_live12i;
                            int GLF_live12mid = GLF_live12i + GLF_live12m - 1;
                            int GLF_live12to = min(GLF_live12i + 2 * GLF_live12m - 1, GLF_live12high);
                            GLF_live12merge(GLF_live12from, GLF_live12mid, GLF_live12to);
                        }
                    }
                }
            }
            {
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    return vec3(1.0, 1.0, 1.0);
                }
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = pow(vec4(-0.6, -53.55, 6.2, -4.2), ((-989.132) * vec4(4.6, 9937.1956, 2.7, -4125.5709)));
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
        }
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = (9.2 / vec4(1.2, -4599.8910, 762.845, -6513.0101));
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= tan(0.0))))) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
            {
                {
                    ;
                }
            }
            if (_GLF_DEAD(false)) {
                break;
            }
        }
    }
    return result;
}

float _GLF_outlined_2(float time) {
    return sin(time) * 0.1;
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < _GLF_ZERO(0.0, injectionSwitch.x))))) {
        return 1.0;
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = normalize(vec4(8043.0726, -626.066, -5.5, -5.5));
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = vec4(-2486.8871, 8.7, 5.0, 152.692);
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
    }
    {
        vec2 GLF_live9coord = _GLF_FUZZED((+vec2(6.3, 2.4)));
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < determinant(mat3(0.0, 0.0, 0.0, 0.0, 0.0, _GLF_IDENTITY(dot(vec2(1.0, 0.0), vec2(1.0, 0.0)), dot(vec2(1.0, 0.0), vec2(1.0, 0.0))), 0.0, 0.0, 0.0)))))) {
                return 1.0;
            }
            _GLF_color = acos(vec4(-27.56, -918.433, 87.02, -609.144));
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
        float GLF_live9h = _GLF_FUZZED(5.3);
        int GLF_live9i = _GLF_FUZZED(-68429);
        float GLF_live9refh = _GLF_FUZZED((-(+35.63)));
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            return 1.0;
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = (vec3(3222.9031, 6.3, -8.4)[1] / vec4(6.3, 9082.3933, 2.4, -4.7));
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
        }
        float GLF_live9slope = _GLF_FUZZED(5.9);
        vec2 GLF_live9uvstep = _GLF_FUZZED(((vec2(9.1, -445.473) + vec2(41.21, 72.64)) * vec2(-9.7, -9.2)));
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = vec4(-4.0, -732.602, -298.830, 61.54);
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
        {
            GLF_live9coord -= GLF_live9uvstep;
            GLF_live9refh += GLF_live9slope;
            GLF_live9h = texture(GLF_live9tex, GLF_live9coord).y;
            GLF_live9i++;
        }
    }
}

vec4 _GLF_outlined_13(vec4 _GLF_color) {
    return _GLF_color;
}

vec3 _GLF_outlined_14(vec3 mixed, vec3 point3) {
    {
        int GLF_live13iteration = _GLF_FUZZED((false ? (~(38197 * 72337)) : (-29905)));
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = vec4(468.681, -9.2, -4.3, 5.7);
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
        {
            ;
        }
    }
    return mix(mixed, point3, vec3(0.3));
    {
        _GLF_struct_117 _GLF_struct_replacement_117 = _GLF_struct_117(_GLF_FUZZED(vec2(-0.6, 577.108)), uvec2(1u, 1u), uvec3(1u, 1u, 1u), vec2(1.0, 1.0), true);
        float GLF_live14h = _GLF_FUZZED(((-2674.4513) + (-3.3)));
        int GLF_live14i = _GLF_FUZZED(-83293);
        int GLF_live14looplimiter0 = 0;
        float GLF_live14refh = _GLF_FUZZED(3771.5467);
        float GLF_live14slope = _GLF_FUZZED(728.654);
        vec2 GLF_live14uvstep = _GLF_FUZZED(vec2(vec3(-3574.7815, -20.94, 6.3)));
        while (GLF_live14h < GLF_live14refh && GLF_live14i < 32) {
            if (GLF_live14looplimiter0 >= 4) {
                break;
            }
            GLF_live14looplimiter0++;
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = ((mat2x4(-67.38, -71.94, -1.6, 2.1, -1.9, 60.90, 688.847, -2.3) - mat2x4(-574.004, 2013.5041, -6.8, -7.5, -8917.5351, -5.5, 36.12, -3886.5778)) * vec2(-8041.7204, 1860.9871));
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= _GLF_ZERO(0.0, injectionSwitch.x))))) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            {
                _GLF_struct_replacement_117.GLF_live14coord -= GLF_live14uvstep;
                GLF_live14refh += GLF_live14slope;
                GLF_live14h = texture(GLF_live14tex, _GLF_struct_replacement_117.GLF_live14coord).y;
                GLF_live14i++;
            }
        }
    }
}

vec4 _GLF_outlined_35() {
    return vec4(6091.6836, 3.7, 2.2, 1260.8441);
}

vec4 _GLF_outlined_36(vec4 _GLF_outVarBackup_GLF_color) {
    return _GLF_outVarBackup_GLF_color;
}

vec4 _GLF_outlined_37(vec4 _GLF_outVarBackup_GLF_color) {
    return _GLF_outVarBackup_GLF_color;
}

vec4 _GLF_outlined_38() {
    return vec4(3.2, -5.5, 599.628, 6.9);
}

vec4 _GLF_outlined_39(vec4 _GLF_outVarBackup_GLF_color) {
    return _GLF_outVarBackup_GLF_color;
}

vec4 _GLF_outlined_40() {
    return vec4(-59.08, -6513.5945, -418.407, -58.07);
}

vec4 _GLF_outlined_41(vec4 _GLF_outVarBackup_GLF_color) {
    return _GLF_outVarBackup_GLF_color;
}

vec4 _GLF_outlined_42(vec4 _GLF_outVarBackup_GLF_color) {
    return _GLF_outVarBackup_GLF_color;
}

vec4 _GLF_outlined_43(vec3 mixed, int msb8) {
    return vec4(mixed, float(bitCount(msb8)));
}

vec4 _GLF_outlined_76() {
    return (vec4(6.6, 60.70, 62.45, -9571.6446) - atanh(vec4(-2.5, -684.490, -18.66, 28.84)));
}

vec4 _GLF_outlined_77(vec4 _GLF_outVarBackup_GLF_color) {
    return _GLF_outVarBackup_GLF_color;
}

float _GLF_outlined_78(float GLF_live6th) {
    return -GLF_live6th;
}

vec4 _GLF_outlined_79() {
    return vec4(721.171, -4107.0154, 8699.2776, -9.4);
}

void main() {
    int msb8 = 256;
    {
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        _GLF_color = exp2(vec4(-17.55, -63.52, 3.8, 3392.7470));
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = vec4(87.19, 5.1, -9.7, 7598.9002);
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
    }
    {
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        _GLF_color = vec3(28.04, -42.00, 849.685).tspt;
        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
    }
    float angle;
    angle = _GLF_outlined_2(time);
    {
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(-8.4, 5710.0011, -809.834, -68.73);
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            _GLF_color = vec4(4.8, -5.9, -41.85, -0.9);
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = _GLF_outlined_35();
                if (_GLF_DEAD(false)) {
                    return;
                }
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)), (_GLF_TRUE(true, (gl_FragCoord.x >= 0.0))) && _GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y))))) {
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = (vec4(8467.2449, -5.1, 5.7, -5.0) / 1046.2324);
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                _GLF_color = _GLF_outlined_36(_GLF_outVarBackup_GLF_color);
                {
                    int GLF_live14looplimiter0 = 0;
                    if (GLF_live14looplimiter0 >= 4) {
                        ;
                    }
                }
            }
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = (clamp(vec4(8916.6047, -6.7, 3437.6292, -8.5), vec4(511.324, -7.7, -8.3, 7.0), vec4(-5.3, -6.3, -1.7, 351.769)) * 7.9);
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            if (_GLF_DEAD(false)) {
                return;
            }
        }
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = vec4(-0.0, 56.56, -4.3, -8361.4931);
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                _GLF_color = _GLF_outlined_37(_GLF_outVarBackup_GLF_color);
            }
        }
        if (_GLF_DEAD(false)) {
            {
                int GLF_live13iteration = _GLF_FUZZED((89688 - (-15457)));
                float GLF_live13xCoord = _GLF_FUZZED(900.109);
                float GLF_live13yCoord = _GLF_FUZZED((+(-4831.5926)));
                if (GLF_live13iteration < 1000) {
                    ;
                } else {
                    ;
                }
            }
            return;
        }
        _GLF_struct_7 _GLF_struct_replacement_7 = _GLF_struct_7(1u, bvec3(true, true, true), true, bvec4(true, true, true, true), _GLF_struct_8(1, vec4(1.0, 1.0, 1.0, 1.0), mat3x2(1.0, 1.0, 1.0, 1.0, 1.0, 1.0), _GLF_struct_9(mat4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), bvec3(true, true, true), ivec4(1, 1, 1, 1), uvec3(1u, 1u, 1u), vec3(1.0, 1.0, 1.0), mat3x2(1.0, 1.0, 1.0, 1.0, 1.0, 1.0), uvec2(1u, 1u)), bvec3(true, true, true)), 1.0, bvec2(true, true));
        if (_GLF_DEAD(false)) {
            {
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(-524.061, -2123.5996, 6.6, -7.4);
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                vec4 _GLF_outVarBackup_GLF_color;
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = sign(vec4(-0.2, 4973.8382, 9628.5248, 3122.6277));
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= log(1.0))))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = mat2x4(-90.62, 2.8, -5.8, 7.9, -62.83, 2754.2398, 9.8, 6485.7247)[0];
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            {
                int GLF_live13looplimiter3 = 0;
                if (GLF_live13looplimiter3 >= 6) {
                    ;
                }
            }
            return;
        }
        _GLF_struct_replacement_7._f4._GLF_outVarBackup_GLF_color = _GLF_color;
        _GLF_color = _GLF_outlined_38();
        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
            _GLF_color = _GLF_struct_replacement_7._f4._GLF_outVarBackup_GLF_color;
        }
    }
    mat2 rotationMatrix;
    {
        float GLF_live11th = _GLF_FUZZED(-84.72);
        vec2 GLF_live11v = _GLF_FUZZED(((mat4x2(-3.1, -100.487, 6.0, 5074.9908, -3.5, -719.392, 28.60, 62.92) - 65.06) * vec4(564.562, 3870.0260, -3.3, -982.583)));
        if (GLF_live11v.y < 0.0) {
            GLF_live11th = -GLF_live11th;
        }
    }
    {
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            return;
        }
        vec4 _GLF_outVarBackup_GLF_color;
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = vec4(59.63, 7.3, -95.76, 66.20);
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < tan(0.0))))) {
                {
                    vec2 GLF_live14coord = _GLF_FUZZED((mat3x2(mat2x4(165.430, -99.10, 865.187, -3.8, 5.2, -78.67, 6.5, -95.93)) * vec3(728.445, 5558.1780, -623.267)));
                    float GLF_live14h = _GLF_FUZZED(-991.960);
                    int GLF_live14i = _GLF_FUZZED(2646);
                    float GLF_live14refh = _GLF_FUZZED(-0.9);
                    float GLF_live14slope = _GLF_FUZZED(3628.8667);
                    vec2 GLF_live14uvstep = _GLF_FUZZED(vec2(-2.7, 5.3));
                    {
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = vec4(-99.35, 20.13, -6119.2826, 3473.1339);
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                        int GLF_live14looplimiter0 = 0;
                        while (GLF_live14h < GLF_live14refh && GLF_live14i < 32) {
                            if (GLF_live14looplimiter0 >= 4) {
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
                return;
            }
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(3.6, 446.626, 0.6, -0.4);
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
            {
                vec2 GLF_live7coord = _GLF_FUZZED(vec3(0.6, -69.10, 3.7).gb);
                int GLF_live7i = _GLF_FUZZED(ivec2(-64652, 45650).g);
                int GLF_live7looplimiter0 = 0;
                vec4 GLF_live7texel = _GLF_FUZZED(vec4(66.69, -7.4, 57.37, 17.59));
                {
                    if (GLF_live7looplimiter0 >= 6) {
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            return;
                        }
                        ;
                    }
                    GLF_live7looplimiter0++;
                    {
                        GLF_live7coord = GLF_live7texel.xz + GLF_live7texel.yy;
                        GLF_live7coord = floor(GLF_live7coord * 256.0) / 256.0;
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = vec4(2.1, -9953.4056, -78.47, 572.444);
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                _GLF_color = _GLF_outlined_39(_GLF_outVarBackup_GLF_color);
                            }
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = vec4(-848.177, -1.1, 5.0, 895.296);
                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                        }
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = ldexp(vec4(vec2(97.26, 9.9), vec2(-37.36, -3.2)), ivec4(73908, 97021, 50879, 62934));
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                        GLF_live7texel = texture(GLF_live7tex, GLF_live7coord);
                        GLF_live7i++;
                        if (_GLF_DEAD(false)) {
                            return;
                        }
                    }
                }
            }
        }
        _GLF_outVarBackup_GLF_color = _GLF_color;
        _GLF_color = _GLF_outlined_76();
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            return;
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < determinant(mat3(0.0, 0.0, 0.0, 0.0, sin(0.0), 1.0, 0.0, 0.0, 0.0)))))) {
            return;
        }
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
            {
                int GLF_live13looplimiter0 = 0;
                if (GLF_live13looplimiter0 >= 6) {
                    ;
                }
            }
            if (_GLF_DEAD(false)) {
                return;
            }
        }
    }
    if (_GLF_DEAD(false)) {
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = vec4((vec2(7.8, -5.6) / vec2(-5.7, -872.931)), vec2(9.5, -5.2));
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
        return;
    }
    {
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        _GLF_color = tanh(min(vec4(6735.5061, 4.1, -15.92, -770.246), 72.35));
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = ((false ? 2.6 : (-415.103)) * clamp(roundEven(vec4(-58.36, -50.11, -4619.8552, 214.357)), 6125.2038, 6.8));
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
        return;
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = vec4(3989.6558, 0.7, 0.1, -7.9);
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
    }
    rotationMatrix = mat2(sin(angle), -cos(angle), cos(angle), sin(angle));
    {
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        _GLF_color = vec4(-9625.2653, 3.1, 2.5, -3.0);
        if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(true, bool(bvec2(true, false))))) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
    }
    _GLF_struct_22 _GLF_struct_replacement_22 = _GLF_struct_22(1, vec3(1.0, 1.0, 1.0), ivec3(1, 1, 1), uvec3(1u, 1u, 1u), uvec2(1u, 1u), mat2(1.0, 1.0, 1.0, 1.0), true, uvec2(1u, 1u));
    _GLF_struct_replacement_22.point1 = computePoint(rotationMatrix);
    _GLF_struct_4 _GLF_struct_replacement_4 = _GLF_struct_4(mat2x3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0), mat2(1.0, 1.0, 1.0, 1.0), 1.0);
    _GLF_struct_replacement_4.rotationMatrix2 = rotationMatrix * rotationMatrix;
    {
        _GLF_struct_118 _GLF_struct_replacement_118 = _GLF_struct_118(vec4(1.0, 1.0, 1.0, 1.0), ivec4(1, 1, 1, 1), vec3(1.0, 1.0, 1.0), vec2(1.0, 1.0), 1, mat4x3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0));
        _GLF_struct_replacement_118._GLF_outVarBackup_GLF_color = _GLF_color;
        _GLF_color = vec4(-1.7, -11.55, 633.273, -73.06);
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            _GLF_color = _GLF_outlined_77(_GLF_struct_replacement_118._GLF_outVarBackup_GLF_color);
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(873.797, 3.2, -1.1, -9365.3823);
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
        }
    }
    vec3 point2;
    {
        float GLF_live6th = _GLF_FUZZED((+vec2(2107.8223, 624.268).t));
        _GLF_struct_119 _GLF_struct_replacement_119 = _GLF_struct_119(_GLF_struct_120(_GLF_FUZZED(vec2(-4.9, -260.234)), vec4(1.0, 1.0, 1.0, 1.0), vec3(1.0, 1.0, 1.0), vec2(1.0, 1.0)));
        if (_GLF_struct_replacement_119._f0.GLF_live6v.y < 0.0) {
            GLF_live6th = _GLF_outlined_78(GLF_live6th);
            if (_GLF_DEAD(false)) {
                return;
            }
        }
    }
    point2 = computePoint(_GLF_struct_replacement_4.rotationMatrix2);
    mat2 rotationMatrix3;
    if (_GLF_DEAD(false)) {
        return;
    }
    {
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        _GLF_color = _GLF_outlined_40();
        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= tan(0.0))))) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
    }
    {
        {
            ;
        }
    }
    if (_GLF_DEAD(false)) {
        return;
    }
    rotationMatrix3 = rotationMatrix * rotationMatrix * rotationMatrix;
    {
        float GLF_live12grey = _GLF_FUZZED((-4817.6667));
        if (int(GLF_live12gl_FragCoord[1]) < 180) {
            GLF_live12grey = 0.5 + float(GLF_live12data[5]) / 10.0;
        } else {
            if (int(GLF_live12gl_FragCoord[1]) < 210) {
                GLF_live12grey = 0.5 + float(GLF_live12data[6]) / 10.0;
            } else {
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(-168.109, -9.1, 4.0, 1.9);
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                if (int(GLF_live12gl_FragCoord[1]) < 240) {
                    GLF_live12grey = 0.5 + float(GLF_live12data[7]) / 10.0;
                } else {
                    if (int(GLF_live12gl_FragCoord[1]) < 270) {
                        GLF_live12grey = 0.5 + float(GLF_live12data[8]) / 10.0;
                    } else {
                        ;
                    }
                }
            }
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = unpackUnorm4x8(50790u);
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
        }
    }
    vec3 point3;
    {
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_outlined_13(_GLF_color);
        _GLF_color = (vec3(-8.6, 14.28, 2.0) * mat4x3(-4169.8179, -6048.0120, 92.02, -69.08, -7.7, -9668.4454, -5908.9432, 564.262, -5865.0427, -4701.1483, -8.4, 4.5));
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
            return;
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(-1.9, -72.69, -7968.9335, -635.074);
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
        }
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            {
                _GLF_struct_23 _GLF_struct_replacement_23 = _GLF_struct_23(_GLF_struct_24(bvec4(true, true, true, true)), _GLF_FUZZED(vec2(13.66, 4.8)), 1u, _GLF_struct_25(_GLF_struct_26(ivec3(1, 1, 1), mat4x2(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), mat4x3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), vec3(1.0, 1.0, 1.0), ivec3(1, 1, 1), vec3(1.0, 1.0, 1.0), mat3x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0)), ivec4(1, 1, 1, 1), vec4(1.0, 1.0, 1.0, 1.0), _GLF_struct_27(mat4x2(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), 1u, mat2x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0)), bvec4(true, true, true, true), uvec3(1u, 1u, 1u), bvec2(true, true)), _GLF_struct_28(mat4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), _GLF_struct_29(1u, uvec2(1u, 1u))), _GLF_struct_30(true, _GLF_struct_31(true, true, uvec2(1u, 1u), mat4x3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0)), _GLF_struct_32(ivec2(1, 1), ivec4(1, 1, 1, 1), mat2x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), mat3x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0))), mat3x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), mat4x2(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0));
                float GLF_live9h = _GLF_FUZZED(9.4);
                int GLF_live9i = _GLF_FUZZED(-47224);
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(8669.5365, 0.0, -7853.0368, 9.0);
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                float GLF_live9refh = _GLF_FUZZED((float(137862u) - vec3(2.0, 8175.4034, 6713.1702).r));
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = (intBitsToFloat(95539) * vec4(9.7, 141.539, 8.7, 1.5));
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        return;
                    }
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(-6.5, -9.3, -7.3, -0.2);
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                float GLF_live9slope = _GLF_FUZZED(((-42.06) * (-8.1)));
                vec2 GLF_live9uvstep = _GLF_FUZZED(vec2(-52.49, -3.3));
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(-999.861, 94.47, -6.4, 65.96);
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                {
                    int GLF_live9looplimiter0 = 0;
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = (mat4(153.681, -94.00, 83.57, 2.1, 6.4, 74.24, -67.92, 720.005, -584.682, -21.21, -3.9, 7752.4170, 713.616, 881.623, 2.9, -40.40) * vec4(-609.507, -0.8, -61.16, -38.56));
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    while (GLF_live9h < GLF_live9refh && GLF_live9i < 32) {
                        if (GLF_live9looplimiter0 >= 4) {
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = vec4(18.31, 6305.7638, -841.469, -4.0);
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        _GLF_color = vec4(-2309.6853, 3.3, 9488.4416, -670.384);
                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                    }
                                }
                            }
                            {
                                float GLF_live12grey = _GLF_FUZZED(vec2(-235.123, 761.340).y);
                                if (int(GLF_live12gl_FragCoord[1]) < 270) {
                                    GLF_live12grey = 0.5 + float(GLF_live12data[8]) / 10.0;
                                } else {
                                    ;
                                }
                            }
                            break;
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            continue;
                        }
                        if (_GLF_DEAD(false)) {
                            return;
                            if (_GLF_DEAD(false)) {
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = vec4(3.6, 3.4, 2.4, -3222.2344);
                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                                {
                                    vec2 GLF_live11a = _GLF_FUZZED((vec2(55.22, -39.08) + (-42.15)));
                                    float GLF_live11th = _GLF_FUZZED(433.308);
                                    if (GLF_live11a.y < GLF_live11a.x) {
                                        GLF_live11th = 0.5 - GLF_live11th;
                                    }
                                }
                                break;
                            }
                        }
                        GLF_live9looplimiter0++;
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = _GLF_outlined_79();
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                _GLF_color = _GLF_outlined_41(_GLF_outVarBackup_GLF_color);
                            }
                        }
                        {
                            _GLF_struct_replacement_23.GLF_live9coord -= GLF_live9uvstep;
                            GLF_live9refh += GLF_live9slope;
                            GLF_live9h = texture(GLF_live9tex, _GLF_struct_replacement_23.GLF_live9coord).y;
                            GLF_live9i++;
                            {
                                vec2 GLF_live14coord = _GLF_FUZZED(vec2(2.9, -3.0));
                                float GLF_live14h = _GLF_FUZZED(988.558);
                                int GLF_live14i = _GLF_FUZZED(83078);
                                float GLF_live14refh = _GLF_FUZZED(vec3(12.94, -9173.9987, -259.124).y);
                                float GLF_live14slope = _GLF_FUZZED(2.3);
                                vec2 GLF_live14uvstep = _GLF_FUZZED(vec2(399.802, 96.29));
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
            }
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            {
                if (_GLF_DEAD(false)) {
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(5602.9575, -1.5, -3.1, -4.9);
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= sqrt(0.0))))) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    return;
                }
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(-3677.2213, -10.40, 38.79, -5738.0386);
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            _GLF_color = (60.76 * vec4(-0.5, -3.6, 233.919, 9.8));
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= log(1.0))))) {
                _GLF_color = _GLF_outlined_42(_GLF_outVarBackup_GLF_color);
            }
        }
    }
    point3 = computePoint(rotationMatrix3);
    vec3 mixed;
    mixed = mix(_GLF_struct_replacement_22.point1, point2, vec3(0.3));
    mixed = _GLF_outlined_14(mixed, point3);
    _GLF_color = _GLF_outlined_43(mixed, msb8);
    if (_GLF_DEAD(false)) {
        return;
    }
    {
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        _GLF_color = (min(vec4(-5.0, -935.147, -56.02, 0.5), vec4(7.5, 384.545, -6467.9146, 9.0)) * (-1.8));
        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= tan(0.0))))) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
    }
}
