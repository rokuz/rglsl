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

vec4 GLF_live15_GLF_color = _GLF_FUZZED(vec4(5.3, 9997.6752, 1.5, -10.14));

layout(set = 0, binding = 2) uniform buf2 {
    float GLF_live15one;
};

mat2 GLF_live15m22 = _GLF_FUZZED((mat3x2(8273.6070, -1.1, -_GLF_IDENTITY(50.51, max(50.51, _GLF_IDENTITY(50.51, min(50.51, _GLF_IDENTITY(50.51, mix(float(50.51), float(_GLF_FUZZED(-9.8)), bool(false))))))), 4.5, 2.2, -853.894) * mat2x3(7.2, -4.7, 1865.2148, 4191.9907, -3.1, -2644.9434)));
mat2x3 GLF_live15m23 = _GLF_FUZZED(mat2x3(vec3(-2.0, 8904.9781, 7.3), vec3(0.9, -2749.6911, 80.93)));
mat2x4 GLF_live15m24 = _GLF_FUZZED(mat2x4(mat4x2(-104.354, 2.7, 5163.4244, 609.411, -57.60, -4.0, 526.647, -717.991)));
mat3x2 GLF_live15m32 = _GLF_FUZZED(mat3x2(mat4x3(9.2, 0.2, 7.3, -2.5, 68.24, -861.441, -877.331, -4492.2670, -9841.0658, -445.971, 837.877, 9.4)));
mat3 GLF_live15m33 = _GLF_FUZZED((mat3(-66.25, 37.93, 9.1, 4597.5306, _GLF_IDENTITY(524.792, clamp(524.792, 524.792, 524.792)), 2440.4418, 4.5, 863.789, -9012.4072)));
mat3x4 GLF_live15m34 = _GLF_FUZZED((mat3x4(-47.64, 9.1, -89.98, -5.2, 3.5, -9.8, -955.745, -305.477, 833.716, 2.3, -8770.3168, -2.6) * mat3(mat2x4(-9760.0551, 7437.2880, -4.7, -4.7, 4.0, 2590.5479, _GLF_IDENTITY(3.4, clamp(3.4, 3.4, _GLF_IDENTITY(3.4, float(mat3(3.4, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 0.0, 0.0))))), 3.3))));
mat4x2 GLF_live15m42 = _GLF_FUZZED(mat4x2(mat3x4(-8.7, -49.92, 47.36, 9.0, 82.86, -69.54, 90.03, -1616.8451, -85.70, -1693.6531, 8.3, -669.253)));
mat4x3 GLF_live15m43 = _GLF_FUZZED(mat4x3(8.6, -8090.4364, -1.2, -6309.2319, -6.9, 51.20, -799.276, 8.3, 92.75, 9.9, 5.2, 63.00));
mat4 GLF_live15m44 = _GLF_FUZZED(mat4(8286.4976, -20.81, -5.7, 8.9, 778.332, -1.3, -3.7, -2465.8093, 19.69, -42.29, -40.88, -33.30, 1365.0743, -399.419, -3.4, -2946.3283));
vec4 GLF_live13_GLF_color = _GLF_FUZZED(vec4(9.2, 6291.3501, -4.4, -575.143));

struct GLF_dead11BST {
    int data;
    int leftIndex;
    int rightIndex;
};

GLF_dead11BST GLF_dead11tree[10] = GLF_dead11BST[10](GLF_dead11BST(0, 0, 0), GLF_dead11BST(0, 0, 0), GLF_dead11BST(0, 0, 0), GLF_dead11BST(_GLF_IDENTITY(0, ~(~(_GLF_IDENTITY(0, 0 ^ (0))))), 0, 0), GLF_dead11BST(0, 0, 0), GLF_dead11BST(0, 0, 0), GLF_dead11BST(0, 0, 0), GLF_dead11BST(_GLF_IDENTITY(0, (0) ^ (0 & (~13263))), 0, 0), GLF_dead11BST(0, 0, 0), GLF_dead11BST(0, 0, 0));

void GLF_dead11makeTreeNode(inout GLF_dead11BST GLF_dead11tree, int GLF_dead11data) {
    do {
        GLF_dead11tree.data = GLF_dead11data;
    } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))));
    if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
    } else {
        GLF_dead11tree.leftIndex = -1;
    }
    GLF_dead11tree.rightIndex = -1;
}

layout(set = 0, binding = 3) uniform sampler2D GLF_dead8tex;
vec4 GLF_live7_GLF_color = _GLF_FUZZED((vec3(-719.985, -5.8, -91.11) * mat4x3(-8.6, _GLF_IDENTITY(-801.522, 0.0 + _GLF_IDENTITY((-801.522), (_GLF_IDENTITY((-801.522), clamp((-801.522), (-801.522), (-801.522)))) - 0.0)), -_GLF_IDENTITY(5.0, (true ? 5.0 : _GLF_FUZZED(-7143.1853))), 4.9, 9.9, -282.568, -59.97, 78.24, -86.91, _GLF_IDENTITY(68.35, min(68.35, 68.35)), -8572.0765, 1.1)));
const vec4 GLF_live6pal[16] = vec4[16](vec4(0.0, 0.0, 0.0, 1.0), vec4(0.5, 0.0, 0.0, 1.0), vec4(0.0, 0.5, 0.0, _GLF_IDENTITY(1.0, _GLF_IDENTITY(float(vec3(1.0, 0.0, 0.0)), (float(vec3(1.0, 0.0, 0.0))) / 1.0))), vec4(0.5, 0.5, 0.0, 1.0), vec4(0.0, 0.0, 0.5, 1.0), vec4(0.5, 0.0, 0.5, 1.0), vec4(0.0, _GLF_IDENTITY(0.5, (0.5) / 1.0), 0.5, 1.0), vec4(0.5, 0.5, 0.5, 1.0), vec4(0.0, 0.0, 0.0, 1.0), vec4(1.0, 0.0, 0.0, 1.0), vec4(0.0, 1.0, 0.0, 1.0), _GLF_IDENTITY(vec4(1.0, 1.0, 0.0, 1.0), clamp(vec4(1.0, 1.0, 0.0, 1.0), vec4(1.0, 1.0, 0.0, 1.0), vec4(1.0, 1.0, 0.0, 1.0))), vec4(0.0, 0.0, 1.0, 1.0), vec4(1.0, 0.0, 1.0, _GLF_IDENTITY(1.0, _GLF_IDENTITY(float(mat3x4(1.0, 1.0, 0.0, 0.0, 0.0, 1.0, _GLF_IDENTITY(0.0, clamp(0.0, 0.0, 0.0)), 0.0, _GLF_IDENTITY(dot(vec2(1.0, 0.0), vec2(1.0, 0.0)), dot(vec2(1.0, 0.0), vec2(1.0, 0.0))), 1.0, sqrt(1.0), 1.0)), min(float(mat3x4(1.0, 1.0, 0.0, 0.0, 0.0, 1.0, _GLF_IDENTITY(0.0, clamp(0.0, 0.0, 0.0)), 0.0, _GLF_IDENTITY(dot(vec2(1.0, 0.0), vec2(1.0, 0.0)), dot(vec2(1.0, 0.0), vec2(1.0, 0.0))), 1.0, sqrt(1.0), 1.0)), float(mat3x4(1.0, 1.0, 0.0, 0.0, 0.0, 1.0, _GLF_IDENTITY(0.0, clamp(0.0, 0.0, 0.0)), 0.0, _GLF_IDENTITY(dot(vec2(1.0, 0.0), vec2(1.0, 0.0)), dot(vec2(1.0, 0.0), vec2(1.0, 0.0))), 1.0, sqrt(1.0), 1.0)))))), vec4(0.0, 1.0, 1.0, 1.0), vec4(1.0, 1.0, 1.0, 1.0));
const vec4 GLF_live6picdata[8] = vec4[8](vec4(4, 4, 20, 4), vec4(4, 4, _GLF_IDENTITY(4, ~(~_GLF_IDENTITY((4), 0 + ((4))))), 20), vec4(4, 20, 20, 4), vec4(20, 4, 4, 8), vec4(8, 6, 4, 2), vec4(2, 12, _GLF_IDENTITY(2, ((-95348) & 0) | (2)), 4), vec4(16, 2, 4, 4), vec4(12, 22, 4, 4));

bool GLF_live6collision(vec2 GLF_live6pos, vec4 GLF_live6quad) {
    {
        vec2 GLF_live13coord = _GLF_FUZZED(vec2(9.4, 430.597));
        if (GLF_live13coord.x > 0.4) {
            if (GLF_live13coord.y < 0.6) {
                uvec2 GLF_live13icoord = uvec2(_GLF_IDENTITY(((GLF_live13coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0, min(((GLF_live13coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0, ((GLF_live13coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0)));
                uint GLF_live13res1 = uint(((GLF_live13icoord.x * GLF_live13icoord.y) >> (GLF_live13icoord.x & 31u)) & 0xffffffffu);
                uint GLF_live13res2 = uint(((GLF_live13icoord.x * GLF_live13icoord.y) << (GLF_live13icoord.x & 31u)) & 0xffffffffu);
                float GLF_live13res = float(((GLF_live13res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_live13res1 & 1u) != 0u ? 1u : 0u));
                GLF_live13_GLF_color = vec4(GLF_live13res, GLF_live13res, GLF_live13res, 1.0);
            } else {
                ivec2 GLF_live13icoord = ivec2(((GLF_live13coord - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                int GLF_live13res3 = (_GLF_IDENTITY((GLF_live13icoord.x >> 5), int(_GLF_IDENTITY(ivec4(_GLF_IDENTITY((GLF_live13icoord.x >> 5), ((GLF_live13icoord.x >> 5)) ^ 0), (0 | 0), 1, 0), ivec4(0, 0, 0, 0) + (ivec4(_GLF_IDENTITY((GLF_live13icoord.x >> 5), ((GLF_live13icoord.x >> 5)) ^ 0), (0 | 0), 1, 0))))) & 1) ^ ((GLF_live13icoord.y & 32) >> 5);
                int GLF_live13res2 = (GLF_live13icoord.y * _GLF_IDENTITY(GLF_live13icoord.y, int(ivec2(GLF_live13icoord.y, (0 ^ 1)))) >> 10) & 1;
                int GLF_live13res1 = (GLF_live13icoord.x * GLF_live13icoord.y >> 9) & 1;
                GLF_live13_GLF_color = vec4(float(GLF_live13res1 ^ GLF_live13res2), float(GLF_live13res2 & GLF_live13res3), float(GLF_live13res1 | GLF_live13res3), 1.0);
            }
        } else {
            ivec2 GLF_live13icoord = ivec2(((GLF_live13coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.6, 1.0)) * 256.0);
            int GLF_live13v = (GLF_live13icoord.x ^ GLF_live13icoord.y) * GLF_live13icoord.y;
            bool GLF_live13res1 = ((GLF_live13v >> 10) & 1) != 0;
            bool GLF_live13res2 = ((GLF_live13v >> 11) & 4) != 0;
            bool GLF_live13res3 = ((GLF_live13v >> 12) & 8) != 0;
            GLF_live13_GLF_color = vec4(GLF_live13res1 ? 1.0 : 0.0, GLF_live13res2 ? 1.0 : 0.0, GLF_live13res3 ? 1.0 : 0.0, 1);
        }
    }
    if (GLF_live6pos.x < GLF_live6quad.x) {
        return false;
    }
    if (_GLF_WRAPPED_IF_TRUE(true)) {
        if (GLF_live6pos.y < GLF_live6quad.y) {
            do {
                return false;
            } while (_GLF_WRAPPED_LOOP(_GLF_IDENTITY(false, !(!(false)))));
            {
                int GLF_live15cols = _GLF_FUZZED((-(~(-58688))));
                uint GLF_live15matrix_number = _GLF_FUZZED((~168223u));
                int GLF_live15rows = _GLF_FUZZED(-7811);
                {
                    {
                        int GLF_live15looplimiter1 = 0;
                        for (int GLF_live15c = 0; GLF_live15c < GLF_live15cols; GLF_live15c++) {
                            if (GLF_live15looplimiter1 >= 4) {
                                break;
                            }
                            GLF_live15looplimiter1++;
                            {
                                {
                                    int GLF_live15looplimiter0 = 0;
                                    for (int GLF_live15r = 0; GLF_live15r < GLF_live15rows; GLF_live15r++) {
                                        if (GLF_live15looplimiter0 >= 4) {
                                            break;
                                        }
                                        GLF_live15looplimiter0++;
                                        {
                                            switch (GLF_live15matrix_number) {
                                                case 0u:
                                                    GLF_live15m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live15r, 2)] = GLF_live15one;
                                                    break;
                                                case 1u:
                                                    GLF_live15m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live15r, 3)] = GLF_live15one;
                                                    break;
                                                case 2u:
                                                    GLF_live15m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live15r, 4)] = GLF_live15one;
                                                    break;
                                                case 3u:
                                                    GLF_live15m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live15r, 2)] = GLF_live15one;
                                                    break;
                                                case 4u:
                                                    GLF_live15m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live15r, 3)] = GLF_live15one;
                                                    break;
                                                case 5u:
                                                    GLF_live15m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live15r, 4)] = GLF_live15one;
                                                    break;
                                                case 6u:
                                                    GLF_live15m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live15r, 2)] = GLF_live15one;
                                                    break;
                                                case 7u:
                                                    GLF_live15m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live15r, 3)] = GLF_live15one;
                                                    break;
                                                case 8u:
                                                    GLF_live15m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live15r, 4)] = GLF_live15one;
                                                    break;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    GLF_live15matrix_number = GLF_live15matrix_number + 1u;
                }
            }
        }
    } else {
    }
    if (GLF_live6pos.x > _GLF_IDENTITY(GLF_live6quad, (GLF_live6quad) * mat4(1.0)).x + GLF_live6quad.z) {
        return false;
        {
            vec2 GLF_live13coord = _GLF_FUZZED((mat4x2(-0.3) * vec4(-934.234, 90.19, 1460.6812, -49.30)));
            {
                uvec2 GLF_live13icoord = uvec2(((GLF_live13coord - _GLF_IDENTITY(vec2(0.4, 0.0), (_GLF_IDENTITY(vec2(0.4, 0.0), vec2(mat4x2(vec2(0.4, 0.0), 0.0, 0.0, 0.0, 0.0, 0.0, 1.0)))) * vec2(1.0, 1.0))) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                uint GLF_live13res1 = uint(((GLF_live13icoord.x * GLF_live13icoord.y) >> (GLF_live13icoord.x & 31u)) & 0xffffffffu);
                uint GLF_live13res2 = uint(((GLF_live13icoord.x * GLF_live13icoord.y) << (_GLF_IDENTITY(GLF_live13icoord.x, ~(~(GLF_live13icoord.x))) & 31u)) & 0xffffffffu);
                float GLF_live13res = float((_GLF_IDENTITY((GLF_live13res2 & _GLF_IDENTITY(0x80000000u, (_GLF_IDENTITY(0x80000000u, max(0x80000000u, 0x80000000u))) ^ uint(_GLF_ZERO(0.0, injectionSwitch.x)))), 0u ^ ((GLF_live13res2 & _GLF_IDENTITY(0x80000000u, (_GLF_IDENTITY(0x80000000u, max(0x80000000u, 0x80000000u))) ^ uint(_GLF_ZERO(0.0, injectionSwitch.x)))))) != 0u ? 1u : 0u) ^ ((GLF_live13res1 & 1u) != 0u ? 1u : 0u));
                GLF_live13_GLF_color = vec4(GLF_live13res, GLF_live13res, GLF_live13res, 1.0);
            }
        }
    }
    if (GLF_live6pos.y > GLF_live6quad.y + GLF_live6quad.w) {
        return false;
    }
    return true;
}

vec4 GLF_live5_GLF_color = _GLF_FUZZED(vec4(-2.9, -7.3, -71.35, 11.02));

float GLF_live5cross2d(vec2 GLF_live5a, vec2 GLF_live5b) {
    return _GLF_IDENTITY(((GLF_live5a.x) * (GLF_live5b.y) - (GLF_live5b.x) * (GLF_live5a.y)), max(((GLF_live5a.x) * (GLF_live5b.y) - (GLF_live5b.x) * (GLF_live5a.y)), ((GLF_live5a.x) * (GLF_live5b.y) - (GLF_live5b.x) * (GLF_live5a.y))));
}

int GLF_live5pointInTriangle(vec2 GLF_live5p, vec2 GLF_live5a, vec2 GLF_live5b, vec2 GLF_live5c) {
    float GLF_live5pab = GLF_live5cross2d(vec2(GLF_live5p.x - GLF_live5a.x, GLF_live5p.y - GLF_live5a.y), vec2(GLF_live5b.x - GLF_live5a.x, GLF_live5b.y - GLF_live5a.y));
    float GLF_live5pbc = GLF_live5cross2d(vec2(GLF_live5p.x - _GLF_IDENTITY(GLF_live5b, min(GLF_live5b, GLF_live5b)).x, GLF_live5p.y - _GLF_IDENTITY(GLF_live5b.y, (GLF_live5b.y) / 1.0)), vec2(GLF_live5c.x - GLF_live5b.x, GLF_live5c.y - GLF_live5b.y));
    if (!((GLF_live5pab < 0.0 && GLF_live5pbc < 0.0) || (GLF_live5pab >= _GLF_IDENTITY(0.0, max(_GLF_IDENTITY(0.0, clamp(0.0, 0.0, 0.0)), 0.0)) && GLF_live5pbc >= 0.0))) {
        if (_GLF_WRAPPED_IF_FALSE(false)) {
        } else {
            return 0;
        }
    }
    float GLF_live5pca = GLF_live5cross2d(vec2(GLF_live5p.x - GLF_live5c.x, GLF_live5p.y - GLF_live5c.y), vec2(GLF_live5a.x - GLF_live5c.x, GLF_live5a.y - GLF_live5c.y));
    if (_GLF_IDENTITY(!((_GLF_IDENTITY(GLF_live5pab < 0.0 && GLF_live5pca < 0.0, bool(bvec4(_GLF_IDENTITY(GLF_live5pab < 0.0 && GLF_live5pca < 0.0, !(_GLF_IDENTITY(!(GLF_live5pab < 0.0 && GLF_live5pca < 0.0), !(!(!(GLF_live5pab < 0.0 && GLF_live5pca < 0.0)))))), _GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)), true, false)))) || (GLF_live5pab >= 0.0 && GLF_live5pca >= 0.0)), !(!(_GLF_IDENTITY(!((_GLF_IDENTITY(GLF_live5pab < 0.0 && GLF_live5pca < 0.0, bool(bvec4(_GLF_IDENTITY(GLF_live5pab < 0.0 && GLF_live5pca < 0.0, !(_GLF_IDENTITY(!(GLF_live5pab < 0.0 && GLF_live5pca < 0.0), !(!_GLF_IDENTITY((!(GLF_live5pab < 0.0 && GLF_live5pca < 0.0)), bool(_GLF_IDENTITY(bvec3(_GLF_IDENTITY((!(GLF_live5pab < 0.0 && GLF_live5pca < 0.0)), bool(bvec3((!(GLF_live5pab < 0.0 && GLF_live5pca < 0.0)), false, true))), true, true), bvec3(bvec3(bvec3(_GLF_IDENTITY((!(GLF_live5pab < 0.0 && GLF_live5pca < 0.0)), bool(bvec3((!(GLF_live5pab < 0.0 && GLF_live5pca < 0.0)), false, true))), true, true)))))))))), _GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)), true, false)))) || (GLF_live5pab >= 0.0 && GLF_live5pca >= 0.0)), true && (!((_GLF_IDENTITY(GLF_live5pab < 0.0 && GLF_live5pca < 0.0, bool(bvec4(_GLF_IDENTITY(GLF_live5pab < 0.0 && GLF_live5pca < 0.0, !(_GLF_IDENTITY(!(GLF_live5pab < 0.0 && GLF_live5pca < 0.0), !(!_GLF_IDENTITY((!(GLF_live5pab < 0.0 && GLF_live5pca < 0.0)), bool(_GLF_IDENTITY(bvec3(_GLF_IDENTITY((!(GLF_live5pab < 0.0 && GLF_live5pca < 0.0)), bool(bvec3((!(GLF_live5pab < 0.0 && GLF_live5pca < 0.0)), false, true))), true, true), bvec3(bvec3(bvec3(_GLF_IDENTITY((!(GLF_live5pab < 0.0 && GLF_live5pca < 0.0)), bool(bvec3((!(GLF_live5pab < 0.0 && GLF_live5pca < 0.0)), false, true))), true, true)))))))))), _GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)), true, false)))) || (GLF_live5pab >= 0.0 && GLF_live5pca >= 0.0)))))))) {
        return 0;
    }
    return 1;
}

vec4 GLF_dead3_GLF_color = _GLF_FUZZED(vec4(-63.00, 9.9, -4.9, -11.28));
vec4 GLF_dead2_GLF_color = _GLF_FUZZED(vec2(_GLF_IDENTITY(4.9, (4.9) + _GLF_IDENTITY(dot(vec3(0.0, 1.0, 0.0), vec3(1.0, 0.0, abs(1.0))), dot(vec3(0.0, 1.0, 0.0), vec3(1.0, 0.0, abs(1.0))))), _GLF_IDENTITY(-450.229, clamp(-450.229, -450.229, _GLF_IDENTITY(-450.229, max(-450.229, -450.229))))).gggr);
layout(location = 0) out vec4 _GLF_color;

layout(set = 0, binding = 0) uniform buf0 {
    vec2 resolution;
};

int msb8 = 256;

float nb_mod(float limit, float ref) {
    int msb8 = 256;
    float s = float(bitfieldExtract(int(resolution.x), 0, 1));
    int i = bitCount(msb8);
    if (_GLF_WRAPPED_IF_FALSE(false)) {
        {
            vec2 GLF_live13coord = _GLF_FUZZED(vec2(-499.327, -630.796));
            if (GLF_live13coord.x > 0.4) {
                if (GLF_live13coord.y < 0.6) {
                    uvec2 GLF_live13icoord = uvec2(((GLF_live13coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                    uint GLF_live13res1 = uint(((GLF_live13icoord.x * GLF_live13icoord.y) >> (GLF_live13icoord.x & 31u)) & 0xffffffffu);
                    uint GLF_live13res2 = uint((_GLF_IDENTITY((GLF_live13icoord.x * GLF_live13icoord.y) << (GLF_live13icoord.x & 31u), clamp((GLF_live13icoord.x * GLF_live13icoord.y) << (GLF_live13icoord.x & 31u), _GLF_IDENTITY((GLF_live13icoord.x * GLF_live13icoord.y) << (GLF_live13icoord.x & 31u), ((GLF_live13icoord.x * GLF_live13icoord.y) << (GLF_live13icoord.x & 31u)) | (_GLF_IDENTITY((GLF_live13icoord.x * GLF_live13icoord.y) << (GLF_live13icoord.x & 31u), max((GLF_live13icoord.x * GLF_live13icoord.y) << (GLF_live13icoord.x & 31u), (GLF_live13icoord.x * GLF_live13icoord.y) << (GLF_live13icoord.x & 31u))))), (GLF_live13icoord.x * GLF_live13icoord.y) << (GLF_live13icoord.x & 31u)))) & 0xffffffffu);
                    float GLF_live13res = float(((GLF_live13res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_live13res1 & 1u) != 0u ? 1u : 0u));
                    GLF_live13_GLF_color = vec4(GLF_live13res, GLF_live13res, GLF_live13res, 1.0);
                } else {
                    ivec2 GLF_live13icoord = ivec2(((GLF_live13coord - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                    int GLF_live13res3 = ((GLF_live13icoord.x >> 5) & 1) ^ ((GLF_live13icoord.y & 32) >> 5);
                    int GLF_live13res2 = (GLF_live13icoord.y * GLF_live13icoord.y >> _GLF_IDENTITY(10, (_GLF_IDENTITY(10, (true ? 10 : _GLF_FUZZED(i)))) / 1)) & 1;
                    int GLF_live13res1 = (GLF_live13icoord.x * GLF_live13icoord.y >> 9) & 1;
                    GLF_live13_GLF_color = vec4(float(GLF_live13res1 ^ GLF_live13res2), float(GLF_live13res2 & GLF_live13res3), float(GLF_live13res1 | GLF_live13res3), 1.0);
                }
            } else {
                ivec2 GLF_live13icoord = ivec2(((GLF_live13coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.6, 1.0)) * 256.0);
                int GLF_live13v = (GLF_live13icoord.x ^ GLF_live13icoord.y) * GLF_live13icoord.y;
                bool GLF_live13res1 = ((GLF_live13v >> 10) & 1) != 0;
                bool GLF_live13res2 = ((GLF_live13v >> 11) & 4) != _GLF_IDENTITY(0, (0) | (_GLF_IDENTITY(0, 0 ^ (_GLF_IDENTITY(0, (false ? _GLF_FUZZED(-21422) : 0))))));
                bool GLF_live13res3 = ((GLF_live13v >> _GLF_IDENTITY(12, (12) + (0 << _GLF_IDENTITY(int(7), int(7))))) & 8) != 0;
                GLF_live13_GLF_color = vec4(GLF_live13res1 ? 1.0 : 0.0, GLF_live13res2 ? 1.0 : 0.0, GLF_live13res3 ? 1.0 : 0.0, 1);
            }
        }
    } else {
        if (_GLF_DEAD(_GLF_IDENTITY(false, true && (false)))) {
            {
                {
                    vec2 GLF_live13coord = _GLF_FUZZED((+vec2(1.1, 4.8)));
                    {
                        ivec2 GLF_live13icoord = ivec2(((GLF_live13coord - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                        int GLF_live13res3 = ((GLF_live13icoord.x >> 5) & 1) ^ ((GLF_live13icoord.y & 32) >> 5);
                        int GLF_live13res2 = (GLF_live13icoord.y * GLF_live13icoord.y >> 10) & 1;
                        int GLF_live13res1 = (GLF_live13icoord.x * GLF_live13icoord.y >> 9) & 1;
                        GLF_live13_GLF_color = vec4(float(GLF_live13res1 ^ GLF_live13res2), float(GLF_live13res2 & GLF_live13res3), float(GLF_live13res1 | GLF_live13res3), 1.0);
                    }
                }
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec2(-6.9, 846.908).yyxy;
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(457.125, 2579.1005, -4628.2736, -90.13);
                if (_GLF_DEAD(false)) {
                    vec2 donor_replacementGLF_dead8coord = _GLF_FUZZED(clamp(injectionSwitch, 9.1, s));
                    float donor_replacementGLF_dead8h = _GLF_FUZZED((vec3(84.51, 41.88, -2.4), -517.321));
                    int donor_replacementGLF_dead8i = _GLF_FUZZED(bitfieldExtract(msb8, msb8, -71095));
                    float donor_replacementGLF_dead8slope = _GLF_FUZZED(resolution.t);
                    vec2 donor_replacementGLF_dead8uvstep = _GLF_FUZZED(injectionSwitch);
                    while (donor_replacementGLF_dead8h < s && donor_replacementGLF_dead8i < 32) {
                        donor_replacementGLF_dead8coord -= donor_replacementGLF_dead8uvstep;
                        s += donor_replacementGLF_dead8slope;
                        donor_replacementGLF_dead8h = texture(GLF_dead8tex, donor_replacementGLF_dead8coord).y;
                        donor_replacementGLF_dead8i++;
                    }
                }
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= sqrt(0.0))))) {
                    if (_GLF_WRAPPED_IF_FALSE(false)) {
                    } else {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
            }
            bool donor_replacementGLF_dead0c4 = _GLF_IDENTITY(_GLF_FUZZED(true), false || (_GLF_FUZZED(true)));
            if (!donor_replacementGLF_dead0c4) {
                ;
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(6.1, (radians(vec3(707.746, -1.5, 2419.1839)) + 174.452));
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(true, !(!(_GLF_IDENTITY(true, (true) || false)))))) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    bool donor_replacementGLF_dead9c6 = _GLF_FUZZED(isinf(s));
                    vec2 donor_replacementGLF_dead9pos = _GLF_FUZZED(vec2(GLF_dead2_GLF_color));
                    vec3 donor_replacementGLF_dead9setting = _GLF_FUZZED(vec3(6679.7007, -2.7, 5.8));
                    {
                        int GLF_live15c = _GLF_FUZZED(int(((-8.4) < (-897.746))));
                        uint GLF_live15matrix_number = _GLF_FUZZED((true ? 33966u : 134763u));
                        int GLF_live15rows = _GLF_FUZZED(83954);
                        {
                            int GLF_live15looplimiter0 = 0;
                            for (int GLF_live15r = 0; GLF_live15r < GLF_live15rows; GLF_live15r++) {
                                if (GLF_live15looplimiter0 >= _GLF_IDENTITY(4, 0 ^ (4))) {
                                    break;
                                }
                                GLF_live15looplimiter0++;
                                {
                                    switch (GLF_live15matrix_number) {
                                        case 0u:
                                            GLF_live15m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live15r, 2)] = GLF_live15one;
                                            break;
                                        case 1u:
                                            GLF_live15m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live15r, 3)] = GLF_live15one;
                                            break;
                                        case 2u:
                                            GLF_live15m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live15r, 4)] = GLF_live15one;
                                            break;
                                        case 3u:
                                            GLF_live15m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live15r, 2)] = GLF_live15one;
                                            break;
                                        case 4u:
                                            GLF_live15m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live15r, 3)] = GLF_live15one;
                                            break;
                                        case 5u:
                                            GLF_live15m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live15r, 4)] = GLF_live15one;
                                            break;
                                        case 6u:
                                            GLF_live15m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live15r, 2)] = GLF_live15one;
                                            break;
                                        case 7u:
                                            GLF_live15m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live15r, 3)] = GLF_live15one;
                                            break;
                                        case 8u:
                                            GLF_live15m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live15r, 4)] = GLF_live15one;
                                            break;
                                    }
                                }
                            }
                        }
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = (vec4(868.052, -0.9, 31.90, 6460.9263) / (-0.1));
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                    }
                    if (_GLF_IDENTITY(!donor_replacementGLF_dead9c6, true && (!donor_replacementGLF_dead9c6))) {
                        ;
                        {
                            vec2 GLF_live13coord = _GLF_FUZZED(((_GLF_IDENTITY(6126.0973, (6126.0973) + 0.0) * vec2(-3.6, 29.48))));
                            {
                                ivec2 GLF_live13icoord = ivec2(((GLF_live13coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.6, 1.0)) * 256.0);
                                int GLF_live13v = (GLF_live13icoord.x ^ GLF_live13icoord.y) * GLF_live13icoord.y;
                                bool GLF_live13res1 = ((GLF_live13v >> 10) & 1) != 0;
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = vec4(98.15, 203.808, 4.2, 484.345);
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                                bool GLF_live13res2 = ((GLF_live13v >> 11) & 4) != 0;
                                bool GLF_live13res3 = ((GLF_live13v >> 12) & 8) != 0;
                                GLF_live13_GLF_color = vec4(GLF_live13res1 ? _GLF_IDENTITY(1.0, (1.0) * abs(1.0)) : 0.0, _GLF_IDENTITY(GLF_live13res2, (GLF_live13res2) || false) ? 1.0 : 0.0, GLF_live13res3 ? 1.0 : 0.0, 1);
                            }
                        }
                    }
                }
            }
        }
    }
    do {
        for (int _injected_loop_counter = ((_GLF_IDENTITY(1, (_GLF_IDENTITY(1, max(1, 1))) | (1)) << _GLF_IDENTITY(int(7), _GLF_IDENTITY(int(7), (true ? int(7) : _GLF_FUZZED(i))))) >> _GLF_IDENTITY(_GLF_IDENTITY(int(7), int(_GLF_IDENTITY(7, 0 | (7)))), (_GLF_IDENTITY(int(7), int(_GLF_IDENTITY(7, 0 | (7))))) | (_GLF_IDENTITY(int(7), int(_GLF_IDENTITY(7, 0 | (7))))))); _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
            while (i < bitfieldInsert(800, i, 0, 0)) {
                if (_GLF_IDENTITY(_GLF_DEAD(false), false || (_GLF_DEAD(false)))) {
                    vec2 donor_replacementGLF_dead2coord = _GLF_FUZZED(((vec4(-313.707, 6.0, 84.09, 32.55) * mat2x4(51.91, -4.0, _GLF_IDENTITY(-8745.7880, mix(float(-8745.7880), float(_GLF_FUZZED((-(-4307.5268)))), bool(false))), -3.9, 7.5, -_GLF_IDENTITY(832.672, min(832.672, _GLF_IDENTITY(832.672, clamp(832.672, 832.672, 832.672)))), 2.5, _GLF_IDENTITY(0.3, min(0.3, 0.3)))) * resolution));
                    {
                        vec2 GLF_live13coord = _GLF_FUZZED(vec2(-77.02, 62.34));
                        {
                            if (GLF_live13coord.y < 0.6) {
                                uvec2 GLF_live13icoord = uvec2(((GLF_live13coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                                uint GLF_live13res1 = uint(((GLF_live13icoord.x * GLF_live13icoord.y) >> (GLF_live13icoord.x & 31u)) & 0xffffffffu);
                                uint GLF_live13res2 = uint(((GLF_live13icoord.x * GLF_live13icoord.y) << (GLF_live13icoord.x & 31u)) & 0xffffffffu);
                                float GLF_live13res = float(((GLF_live13res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_live13res1 & 1u) != 0u ? 1u : 0u));
                                GLF_live13_GLF_color = vec4(GLF_live13res, GLF_live13res, GLF_live13res, 1.0);
                            } else {
                                ivec2 GLF_live13icoord = ivec2(((GLF_live13coord - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                                int GLF_live13res3 = ((GLF_live13icoord.x >> 5) & 1) ^ ((GLF_live13icoord.y & 32) >> 5);
                                int GLF_live13res2 = (GLF_live13icoord.y * GLF_live13icoord.y >> 10) & 1;
                                int GLF_live13res1 = (GLF_live13icoord.x * GLF_live13icoord.y >> 9) & 1;
                                GLF_live13_GLF_color = vec4(float(GLF_live13res1 ^ GLF_live13res2), float(GLF_live13res2 & GLF_live13res3), float(GLF_live13res1 | GLF_live13res3), 1.0);
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = vec4(-133.089, -7164.4209, -4865.1930, 210.232);
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                            }
                        }
                    }
                    {
                        if (donor_replacementGLF_dead2coord.y < 0.6) {
                            uvec2 GLF_dead2icoord = _GLF_IDENTITY(uvec2(((donor_replacementGLF_dead2coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0), uvec2(uvec3(uvec2(((donor_replacementGLF_dead2coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0), 1u)));
                            uint GLF_dead2res1 = uint(((GLF_dead2icoord.x * _GLF_IDENTITY(GLF_dead2icoord.y, (GLF_dead2icoord.y) >> uint(_GLF_ZERO(0.0, injectionSwitch.x)))) >> (GLF_dead2icoord.x & 31u)) & 0xffffffffu);
                            uint GLF_dead2res2 = uint(((GLF_dead2icoord.x * GLF_dead2icoord.y) << (_GLF_IDENTITY(GLF_dead2icoord, max(_GLF_IDENTITY(GLF_dead2icoord, (false ? _GLF_FUZZED(uvec2(162790u, 111519u)) : _GLF_IDENTITY(GLF_dead2icoord, min(GLF_dead2icoord, GLF_dead2icoord)))), _GLF_IDENTITY(GLF_dead2icoord, min(_GLF_IDENTITY(GLF_dead2icoord, uvec2(GLF_dead2icoord[0], _GLF_IDENTITY(GLF_dead2icoord[1], uint(_GLF_ZERO(0.0, injectionSwitch.x)) ^ (GLF_dead2icoord[1])))), GLF_dead2icoord)))).x & 31u)) & 0xffffffffu);
                            float GLF_dead2res = float(((GLF_dead2res2 & _GLF_IDENTITY(0x80000000u, clamp(0x80000000u, 0x80000000u, 0x80000000u))) != 0u ? 1u : 0u) ^ ((GLF_dead2res1 & 1u) != 0u ? 1u : 0u));
                            GLF_dead2_GLF_color = vec4(GLF_dead2res, GLF_dead2res, _GLF_IDENTITY(GLF_dead2res, (true ? GLF_dead2res : _GLF_FUZZED(float(bitfieldInsert(10658u, GLF_dead2res2, _injected_loop_counter, i))))), 1.0);
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                {
                                    {
                                        ;
                                    }
                                }
                                int donor_replacementGLF_dead10v = _GLF_FUZZED(77075);
                                {
                                    donor_replacementGLF_dead10v = 3 * donor_replacementGLF_dead10v + 1;
                                }
                            }
                        } else {
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                if (_GLF_DEAD(_GLF_FALSE(false, (_GLF_IDENTITY(gl_FragCoord, _GLF_IDENTITY(vec4(mat4x2(gl_FragCoord, 0.0, 1.0, 1.0, tan(0.0))), mix(vec4(_GLF_FUZZED(-6.9), (vec4(mat4x2(gl_FragCoord, 0.0, 1.0, 1.0, tan(0.0))))[1], _GLF_FUZZED(8.0), (vec4(mat4x2(gl_FragCoord, 0.0, 1.0, 1.0, tan(0.0))))[3]), vec4((vec4(mat4x2(gl_FragCoord, 0.0, 1.0, 1.0, tan(0.0))))[0], _GLF_FUZZED(-9502.7240), (vec4(mat4x2(gl_FragCoord, 0.0, 1.0, 1.0, tan(0.0))))[2], _GLF_FUZZED(vec4(-9.4, -7861.6234, 531.172, 2.6).r)), bvec4(true, false, true, false)))).y < 0.0)))) {
                                    {
                                        vec2 GLF_live13coord = _GLF_FUZZED((vec2(19.15, -6.2) - vec2(59.11, 94.61)));
                                        {
                                            ivec2 GLF_live13icoord = ivec2(((GLF_live13coord - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                                            int GLF_live13res3 = ((GLF_live13icoord.x >> 5) & 1) ^ ((GLF_live13icoord.y & 32) >> 5);
                                            {
                                                vec4 _GLF_outVarBackup_GLF_color;
                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                _GLF_color = vec4(4.8, -28.81, 822.638, -4.2);
                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                }
                                            }
                                            int GLF_live13res2 = (GLF_live13icoord.y * GLF_live13icoord.y >> 10) & 1;
                                            int GLF_live13res1 = _GLF_IDENTITY((GLF_live13icoord.x * GLF_live13icoord.y >> 9) & 1, (_GLF_IDENTITY((GLF_live13icoord.x * GLF_live13icoord.y >> 9) & 1, ((GLF_live13icoord.x * GLF_live13icoord.y >> 9) & 1) + 0)) >> 0);
                                            GLF_live13_GLF_color = vec4(float(GLF_live13res1 ^ GLF_live13res2), float(GLF_live13res2 & GLF_live13res3), float(GLF_live13res1 | GLF_live13res3), 1.0);
                                        }
                                    }
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        _GLF_color = vec4(-72.33, 8.4, 126.510, 7536.4845);
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                    }
                                    return 1.0;
                                }
                            } else {
                            }
                            ivec2 GLF_merged2_0_1_13_1_1_13GLF_dead2res1GLF_dead2res3;
                            ivec2 GLF_dead2icoord = ivec2(((donor_replacementGLF_dead2coord - vec2(0.4, 0.6)) * _GLF_IDENTITY(vec2(1.0 / 0.4, 1.0 / 0.4), mix(_GLF_IDENTITY(vec2(_GLF_IDENTITY((vec2(1.0 / 0.4, 1.0 / 0.4))[0], (false ? _GLF_FUZZED(-4493.6042) : (vec2(1.0 / 0.4, 1.0 / 0.4))[0])), (vec2(1.0 / 0.4, 1.0 / 0.4))[1]), (vec2(_GLF_IDENTITY((vec2(1.0 / 0.4, 1.0 / 0.4))[0], (false ? _GLF_FUZZED(-4493.6042) : (vec2(1.0 / 0.4, 1.0 / 0.4))[0])), (vec2(1.0 / 0.4, 1.0 / 0.4))[1])) * vec2(1.0, 1.0)), _GLF_IDENTITY(vec2(_GLF_FUZZED(float(-18461)), _GLF_FUZZED(0.5)), max(_GLF_IDENTITY(vec2(_GLF_FUZZED(float(-18461)), _GLF_FUZZED(0.5)), max(vec2(_GLF_FUZZED(float(-18461)), _GLF_FUZZED(0.5)), vec2(_GLF_FUZZED(float(-18461)), _GLF_FUZZED(0.5)))), vec2(_GLF_FUZZED(float(-18461)), _GLF_FUZZED(0.5)))), bvec2(false, false)))) * 256.0);
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = vec4(-2.3, -687.606, -72.58, 105.797);
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                            int GLF_dead2res3 = _GLF_IDENTITY(((GLF_dead2icoord.x >> 5) & 1) ^ ((GLF_dead2icoord.y & 32) >> 5), (_GLF_IDENTITY(((GLF_dead2icoord.x >> 5) & 1) ^ ((GLF_dead2icoord.y & 32) >> 5), ~(_GLF_IDENTITY(~(((GLF_dead2icoord.x >> 5) & 1) ^ ((GLF_dead2icoord.y & 32) >> 5)), (true ? _GLF_IDENTITY(~(((GLF_dead2icoord.x >> 5) & 1) ^ ((GLF_dead2icoord.y & 32) >> 5)), (true ? (~(((GLF_dead2icoord.x >> 5) & 1) ^ ((GLF_dead2icoord.y & 32) >> 5))) : _GLF_FUZZED(_injected_loop_counter))) : _GLF_FUZZED(_injected_loop_counter)))))) / 1);
                            _GLF_IDENTITY(GLF_merged2_0_1_13_1_1_13GLF_dead2res1GLF_dead2res3.y = GLF_dead2res3, (_GLF_IDENTITY(GLF_merged2_0_1_13_1_1_13GLF_dead2res1GLF_dead2res3.y = GLF_dead2res3, (GLF_merged2_0_1_13_1_1_13GLF_dead2res1GLF_dead2res3.y = GLF_dead2res3) >> (0 << _GLF_IDENTITY(int(3), int(3))))) | 0);
                            int GLF_dead2res2 = (GLF_dead2icoord.y * GLF_dead2icoord.y >> 10) & 1;
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = acos(tanh(vec4(-9.6, 8.8, 9024.5405, -253.427)));
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                int donor_replacementGLF_dead11baseIndex = _GLF_FUZZED(GLF_dead2res2);
                                int donor_replacementGLF_dead11data = _GLF_FUZZED(-69114);
                                int donor_replacementGLF_dead11treeIndex = _GLF_FUZZED(GLF_dead2res2);
                                {
                                    if (donor_replacementGLF_dead11data <= GLF_dead11tree[_GLF_IDENTITY(_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11baseIndex, 10), max(_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11baseIndex, 10), _GLF_IDENTITY(_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11baseIndex, 10), int(int(_GLF_IDENTITY(_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11baseIndex, 10), (_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11baseIndex, 10)) | (_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11baseIndex, 10))))))))].data) {
                                        if (GLF_dead11tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11baseIndex, 10)].leftIndex == -1) {
                                            GLF_dead11tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11baseIndex, 10)].leftIndex = donor_replacementGLF_dead11treeIndex;
                                            GLF_dead11makeTreeNode(GLF_dead11tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11treeIndex, 10)], donor_replacementGLF_dead11data);
                                            ;
                                        } else {
                                            donor_replacementGLF_dead11baseIndex = GLF_dead11tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11baseIndex, 10)].leftIndex;
                                            continue;
                                            {
                                                vec2 GLF_live13coord = _GLF_FUZZED(vec2(2.8, -7.4));
                                                {
                                                    uvec2 GLF_live13icoord = _GLF_IDENTITY(uvec2(((GLF_live13coord - vec2(0.4, 0.0)) * _GLF_IDENTITY(vec2(1.0 / 0.4, 1.0 / 0.6), (vec2(1.0 / 0.4, 1.0 / 0.6)) * vec2(1.0, 1.0))) * 256.0), (_GLF_IDENTITY(uvec2(((GLF_live13coord - vec2(0.4, 0.0)) * _GLF_IDENTITY(vec2(1.0 / 0.4, 1.0 / 0.6), (vec2(1.0 / 0.4, 1.0 / 0.6)) * vec2(1.0, 1.0))) * 256.0), uvec2(uvec3(uvec2(((GLF_live13coord - vec2(0.4, 0.0)) * _GLF_IDENTITY(vec2(1.0 / 0.4, 1.0 / 0.6), (vec2(1.0 / 0.4, 1.0 / 0.6)) * vec2(1.0, 1.0))) * 256.0), 1u)))) - (uvec2(0u, 0u) ^ uvec2(0u, 0u)));
                                                    uint GLF_live13res1 = uint(((GLF_live13icoord.x * GLF_live13icoord.y) >> (GLF_live13icoord.x & 31u)) & 0xffffffffu);
                                                    uint GLF_live13res2 = uint(((GLF_live13icoord.x * GLF_live13icoord.y) << (GLF_live13icoord.x & 31u)) & 0xffffffffu);
                                                    float GLF_live13res = float(((GLF_live13res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_live13res1 & 1u) != 0u ? 1u : 0u));
                                                    GLF_live13_GLF_color = vec4(GLF_live13res, GLF_live13res, GLF_live13res, 1.0);
                                                }
                                            }
                                        }
                                    } else {
                                        if (GLF_dead11tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11baseIndex, 10)].rightIndex == -1) {
                                            for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
                                                GLF_dead11tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11baseIndex, 10)].rightIndex = donor_replacementGLF_dead11treeIndex;
                                            }
                                            GLF_dead11makeTreeNode(GLF_dead11tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11treeIndex, 10)], donor_replacementGLF_dead11data);
                                            ;
                                        } else {
                                            donor_replacementGLF_dead11baseIndex = GLF_dead11tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11baseIndex, 10)].rightIndex;
                                            continue;
                                        }
                                        {
                                            vec2 GLF_live13coord = _GLF_FUZZED(vec2(-752.667, -215.119));
                                            {
                                                ivec2 GLF_live13icoord = ivec2(((GLF_live13coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.6, 1.0)) * 256.0);
                                                int GLF_live13v = (GLF_live13icoord.x ^ GLF_live13icoord.y) * GLF_live13icoord.y;
                                                {
                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                    _GLF_color = vec4(668.601, 3.3, -709.679, -0.3);
                                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                    }
                                                }
                                                bool GLF_live13res1 = ((GLF_live13v >> 10) & 1) != 0;
                                                bool GLF_live13res2 = ((GLF_live13v >> 11) & 4) != 0;
                                                bool GLF_live13res3 = ((GLF_live13v >> 12) & 8) != 0;
                                                GLF_live13_GLF_color = vec4(GLF_live13res1 ? 1.0 : 0.0, GLF_live13res2 ? 1.0 : 0.0, GLF_live13res3 ? 1.0 : 0.0, 1);
                                            }
                                        }
                                    }
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        _GLF_color = vec4(-436.122, -3.7, -388.428, 1.6);
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                    }
                                }
                            }
                            int GLF_dead2res1 = (_GLF_IDENTITY(GLF_dead2icoord, (GLF_dead2icoord) ^ ivec2(_GLF_IDENTITY(0, (0) - 0), 0)).x * GLF_dead2icoord.y >> 9) & 1;
                            GLF_merged2_0_1_13_1_1_13GLF_dead2res1GLF_dead2res3.x = GLF_dead2res1;
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                int donor_replacementGLF_dead11baseIndex = _GLF_FUZZED(_injected_loop_counter);
                                int donor_replacementGLF_dead11data = _GLF_FUZZED(msb8);
                                {
                                    if (donor_replacementGLF_dead11data <= GLF_dead11tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11baseIndex, 10)].data) {
                                        if (GLF_dead11tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11baseIndex, 10)].leftIndex == -1) {
                                            GLF_dead11tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11baseIndex, 10)].leftIndex = GLF_dead2res2;
                                            GLF_dead11makeTreeNode(GLF_dead11tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead2res2, 10)], donor_replacementGLF_dead11data);
                                            ;
                                        } else {
                                            {
                                                vec4 _GLF_outVarBackup_GLF_color;
                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                _GLF_color = vec4(mod(-9049.0842, -9223.9852), vec3(-94.18, -4021.2996, 287.879));
                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                }
                                            }
                                            {
                                                vec4 _GLF_outVarBackup_GLF_color;
                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                for (int _injected_loop_counter = int(_GLF_ZERO(0.0, injectionSwitch.x)); _GLF_WRAPPED_LOOP(_injected_loop_counter < _GLF_IDENTITY((0 ^ 1), (_GLF_IDENTITY((0 ^ 1), clamp((0 ^ 1), (0 ^ 1), (0 ^ 1)))) >> 0)); _injected_loop_counter++) {
                                                    _GLF_color = vec4(-4563.2634, 7075.8143, -540.810, -14.67);
                                                }
                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                    if (_GLF_WRAPPED_IF_FALSE(false)) {
                                                    } else {
                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                    }
                                                }
                                            }
                                            if (_GLF_WRAPPED_IF_FALSE(false)) {
                                                {
                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                    _GLF_color = vec4(-50.99, 1277.3589, -2224.2876, 77.46);
                                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                    }
                                                }
                                            } else {
                                                donor_replacementGLF_dead11baseIndex = GLF_dead11tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11baseIndex, 10)].leftIndex;
                                            }
                                            continue;
                                        }
                                        {
                                            vec4 _GLF_outVarBackup_GLF_color;
                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                            _GLF_color = vec4(_GLF_IDENTITY(3.2, mix(float(3.2), float(_GLF_FUZZED(-8.3)), bool(false))), -19.70, -2358.1742, -7.6);
                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                            }
                                        }
                                    } else {
                                        if (GLF_dead11tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11baseIndex, 10)].rightIndex == -1) {
                                            GLF_dead11tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11baseIndex, 10)].rightIndex = GLF_dead2res2;
                                            GLF_dead11makeTreeNode(GLF_dead11tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead2res2, 10)], donor_replacementGLF_dead11data);
                                            ;
                                        } else {
                                            donor_replacementGLF_dead11baseIndex = GLF_dead11tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11baseIndex, 10)].rightIndex;
                                            continue;
                                        }
                                    }
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        _GLF_color = normalize(vec4(1576.8157, -17.67, 451.527, 956.804));
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                    }
                                }
                                {
                                    int GLF_live14index = _GLF_FUZZED(_GLF_IDENTITY((-(77931 - (98292 & 79538))), max(_GLF_IDENTITY((-(77931 - (98292 & 79538))), ((-(77931 - (98292 & 79538)))) / 1), _GLF_IDENTITY((-(77931 - (98292 & 79538))), int(int((-(77931 - (98292 & 79538)))))))));
                                    int GLF_live14j = _GLF_FUZZED(-67651);
                                    {
                                        GLF_live14index = GLF_live14j;
                                    }
                                }
                            }
                            GLF_dead2_GLF_color = vec4(_GLF_IDENTITY(float(_GLF_IDENTITY(GLF_merged2_0_1_13_1_1_13GLF_dead2res1GLF_dead2res3.x ^ GLF_dead2res2, min(GLF_merged2_0_1_13_1_1_13GLF_dead2res1GLF_dead2res3.x ^ GLF_dead2res2, GLF_merged2_0_1_13_1_1_13GLF_dead2res1GLF_dead2res3.x ^ GLF_dead2res2))), mix(float(float(_GLF_IDENTITY(GLF_merged2_0_1_13_1_1_13GLF_dead2res1GLF_dead2res3.x ^ GLF_dead2res2, min(GLF_merged2_0_1_13_1_1_13GLF_dead2res1GLF_dead2res3.x ^ GLF_dead2res2, GLF_merged2_0_1_13_1_1_13GLF_dead2res1GLF_dead2res3.x ^ GLF_dead2res2)))), float(_GLF_FUZZED(-396.140)), bool(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))))), float(_GLF_IDENTITY(GLF_dead2res2, min(GLF_dead2res2, GLF_dead2res2)) & GLF_merged2_0_1_13_1_1_13GLF_dead2res1GLF_dead2res3.y), float(GLF_merged2_0_1_13_1_1_13GLF_dead2res1GLF_dead2res3.x | GLF_merged2_0_1_13_1_1_13GLF_dead2res1GLF_dead2res3.y), 1.0);
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                int donor_replacementGLF_dead11count = _GLF_FUZZED(GLF_dead2res2);
                                {
                                    donor_replacementGLF_dead11count++;
                                }
                            }
                        }
                    }
                    for (int _injected_loop_counter = (1 & _GLF_IDENTITY(1, min(1, 1))); _GLF_WRAPPED_LOOP(_injected_loop_counter > int(_GLF_ZERO(0.0, injectionSwitch.x))); _injected_loop_counter--) {
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            return 1.0;
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = dFdxCoarse(vec4(-9.1, -79.94, 3942.7129, 78.69));
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                            }
                        }
                    }
                }
                if (mod(float(i), ref) <= _GLF_IDENTITY(0.01, max(_GLF_IDENTITY(0.01, (false ? _GLF_FUZZED(ref) : 0.01)), 0.01))) {
                    s += 0.2;
                    if (_GLF_DEAD(false)) {
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < length(vec2(0.0, 0.0)))))) {
                            int donor_replacementGLF_dead10count = _GLF_FUZZED(msb8);
                            int donor_replacementGLF_dead10v = _GLF_FUZZED(msb8);
                            {
                                if ((donor_replacementGLF_dead10v & 1) == 1) {
                                    donor_replacementGLF_dead10v = 3 * donor_replacementGLF_dead10v + 1;
                                } else {
                                    donor_replacementGLF_dead10v /= 2;
                                }
                                donor_replacementGLF_dead10count++;
                            }
                        }
                        return 1.0;
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        vec2 donor_replacementGLF_dead8coord = _GLF_FUZZED((fma(resolution, _GLF_IDENTITY(injectionSwitch, (_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)) ? _GLF_FUZZED(radians(injectionSwitch)) : injectionSwitch)), resolution) / vec2(0.3, -2817.3473)));
                        float donor_replacementGLF_dead8h = _GLF_FUZZED(fma(limit, 4117.1239, limit));
                        int donor_replacementGLF_dead8i = _GLF_FUZZED(msb8);
                        float donor_replacementGLF_dead8refh = _GLF_IDENTITY(_GLF_FUZZED(-2915.2191), (true ? _GLF_FUZZED(-2915.2191) : _GLF_FUZZED(limit)));
                        float donor_replacementGLF_dead8slope = _GLF_FUZZED(s);
                        vec2 donor_replacementGLF_dead8uvstep = _GLF_FUZZED(vec2(vec3(-5299.7488, 770.788, 6928.4183)));
                        {
                            donor_replacementGLF_dead8coord -= donor_replacementGLF_dead8uvstep;
                            donor_replacementGLF_dead8refh += donor_replacementGLF_dead8slope;
                            donor_replacementGLF_dead8h = texture(GLF_dead8tex, donor_replacementGLF_dead8coord).y;
                            donor_replacementGLF_dead8i++;
                        }
                        {
                            {
                                ;
                            }
                        }
                    }
                }
                if (_GLF_DEAD(false)) {
                    discard;
                }
                for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
                    if (float(i) >= limit) {
                        return s;
                    }
                }
                if (_GLF_DEAD(false)) {
                    int donor_replacementGLF_dead11count = _GLF_FUZZED(_injected_loop_counter);
                    int donor_replacementGLF_dead11i = _GLF_FUZZED(msb8);
                    int donor_replacementGLF_dead11result = _GLF_FUZZED(_GLF_IDENTITY(msb8, clamp(_GLF_IDENTITY(msb8, min(msb8, msb8)), msb8, msb8)));
                    if (donor_replacementGLF_dead11result == donor_replacementGLF_dead11i) {
                        donor_replacementGLF_dead11count++;
                    }
                }
                if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                } else {
                    i++;
                }
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = tan(vec4(-9.3, 5962.0458, 8.7, 3.6));
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= determinant(mat4(0.0, 1.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, sin(0.0), log(1.0), 0.0, 1.0, 0.0, 0.0, 0.0, determinant(mat4(0.0, 1.0, 1.0, 0.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0)))))))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = vec4(5.5, 215.980, 507.420, 2825.4441);
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                    }
                }
            }
        }
    } while (_GLF_WRAPPED_LOOP(false));
    {
        vec2 GLF_live13coord = _GLF_FUZZED(vec2(4126.1259, 70.16));
        {
            uvec2 GLF_live13icoord = uvec2(((GLF_live13coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / _GLF_IDENTITY(0.6, (0.6) + length(0.0)))) * 256.0);
            uint GLF_live13res1 = uint(((GLF_live13icoord.x * GLF_live13icoord.y) >> (_GLF_IDENTITY(GLF_live13icoord.x & 31u, (GLF_live13icoord.x & 31u) / ((1u << _GLF_IDENTITY(uint(4u), uint(4u))) >> _GLF_IDENTITY(uint(4u), uint(4u)))))) & 0xffffffffu);
            uint GLF_live13res2 = uint(((GLF_live13icoord.x * GLF_live13icoord.y) << (GLF_live13icoord.x & 31u)) & 0xffffffffu);
            float GLF_live13res = float(((GLF_live13res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_live13res1 & 1u) != 0u ? 1u : 0u));
            GLF_live13_GLF_color = vec4(GLF_live13res, GLF_live13res, GLF_live13res, 1.0);
        }
    }
    return s;
    if (_GLF_DEAD(false)) {
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = mod((sinh(vec4(-517.173, 1.5, 78.71, 4675.1324)) * vec4(-8.5, 3.9, -0.4, 9579.7127)), 584.247);
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
        bool donor_replacementGLF_dead9c6 = _GLF_FUZZED((mat4x2(3.0, -0.9, -36.68, -657.858, -817.249, 40.86, -5.5, -23.69) != mat4x2(704.689, 348.063, -9.0, -170.367, 226.502, -601.409, -66.09, 552.325)));
        vec2 donor_replacementGLF_dead9pos = _GLF_FUZZED(injectionSwitch);
        vec3 donor_replacementGLF_dead9setting = _GLF_FUZZED(exp(tanh(vec3(-206.138, 7.8, 6.4))));
        if (!donor_replacementGLF_dead9c6) {
            ;
        }
        {
            vec2 GLF_live13coord = _GLF_FUZZED(vec2(vec2(17.22, 4451.3638).g));
            {
                uvec2 GLF_live13icoord = uvec2(((GLF_live13coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                uint GLF_live13res1 = uint(((GLF_live13icoord.x * GLF_live13icoord.y) >> (GLF_live13icoord.x & 31u)) & 0xffffffffu);
                uint GLF_live13res2 = _GLF_IDENTITY(uint(((_GLF_IDENTITY(GLF_live13icoord, uvec2(GLF_live13icoord[0], GLF_live13icoord[1])).x * GLF_live13icoord.y) << (GLF_live13icoord.x & _GLF_IDENTITY(31u, uint(_GLF_ONE(1.0, injectionSwitch.y)) * (31u)))) & 0xffffffffu), ~(~(uint(((_GLF_IDENTITY(GLF_live13icoord, uvec2(GLF_live13icoord[0], GLF_live13icoord[1])).x * GLF_live13icoord.y) << (GLF_live13icoord.x & _GLF_IDENTITY(31u, uint(_GLF_ONE(1.0, injectionSwitch.y)) * (31u)))) & 0xffffffffu))));
                float GLF_live13res = float(_GLF_IDENTITY((_GLF_IDENTITY((GLF_live13res2 & 0x80000000u) != 0u ? 1u : 0u, clamp((GLF_live13res2 & 0x80000000u) != 0u ? 1u : 0u, (GLF_live13res2 & 0x80000000u) != 0u ? 1u : 0u, _GLF_IDENTITY((GLF_live13res2 & 0x80000000u) != 0u ? 1u : 0u, 1u * ((GLF_live13res2 & 0x80000000u) != 0u ? 1u : 0u))))), uint(uvec3((_GLF_IDENTITY((GLF_live13res2 & 0x80000000u) != 0u ? 1u : 0u, clamp((GLF_live13res2 & 0x80000000u) != 0u ? 1u : 0u, (GLF_live13res2 & 0x80000000u) != 0u ? 1u : 0u, _GLF_IDENTITY((GLF_live13res2 & 0x80000000u) != 0u ? 1u : 0u, 1u * ((GLF_live13res2 & 0x80000000u) != 0u ? 1u : 0u))))), 0u, 0u))) ^ ((GLF_live13res1 & 1u) != 0u ? 1u : 0u));
                GLF_live13_GLF_color = vec4(GLF_live13res, GLF_live13res, GLF_live13res, 1.0);
            }
        }
    }
}

void main() {
    ivec2 GLF_merged2_0_1_1_1_1_4imsb8;
    {
        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = sin(vec4(-1.1, 420.120, 3106.6164, -5923.4032));
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            if (_GLF_DEAD(false)) {
                return;
            }
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                if (_GLF_WRAPPED_IF_FALSE(false)) {
                    do {
                        if (_GLF_DEAD(_GLF_FALSE(false, (_GLF_IDENTITY(gl_FragCoord.y < 0.0, bool(bool(gl_FragCoord.y < 0.0))))))) {
                            vec2 donor_replacementGLF_dead8coord = _GLF_FUZZED(injectionSwitch);
                            float donor_replacementGLF_dead8h = _GLF_FUZZED(abs(resolution).x);
                            int donor_replacementGLF_dead8i = _GLF_FUZZED(msb8);
                            {
                                int GLF_live15c = _GLF_FUZZED((15086 + (+(-55914))));
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = vec4(-56.16, -2.1, -4464.7880, -88.70);
                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                                int GLF_live15looplimiter0 = 0;
                                uint GLF_live15matrix_number = _GLF_FUZZED(uvec3(19619u, 50178u, 84620u).x);
                                int GLF_live15r = _GLF_FUZZED(-64373);
                                {
                                    if (GLF_live15looplimiter0 >= 4) {
                                        ;
                                    }
                                    GLF_live15looplimiter0++;
                                    {
                                        switch (GLF_live15matrix_number) {
                                            case 0u:
                                                GLF_live15m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live15r, 2)] = GLF_live15one;
                                                break;
                                            case 1u:
                                                GLF_live15m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live15r, 3)] = GLF_live15one;
                                                break;
                                            case 2u:
                                                GLF_live15m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live15r, 4)] = _GLF_IDENTITY(GLF_live15one, _GLF_IDENTITY(float(mat4x2(GLF_live15one, 1.0, 1.0, 1.0, 1.0, 1.0, 0.0, 1.0)), mix(float(float(mat4x2(GLF_live15one, 1.0, 1.0, 1.0, 1.0, 1.0, 0.0, 1.0))), float(_GLF_FUZZED(636.535)), bool(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))))));
                                                break;
                                            case 3u:
                                                GLF_live15m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live15r, 2)] = GLF_live15one;
                                                break;
                                            case 4u:
                                                GLF_live15m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live15r, 3)] = GLF_live15one;
                                                break;
                                            case 5u:
                                                GLF_live15m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live15r, 4)] = GLF_live15one;
                                                break;
                                            case 6u:
                                                GLF_live15m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live15r, 2)] = GLF_live15one;
                                                break;
                                            case 7u:
                                                GLF_live15m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live15r, 3)] = GLF_live15one;
                                                break;
                                            case 8u:
                                                {
                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                    _GLF_color = vec4(9746.9036, -4.5, -810.079, 799.539);
                                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(true, !(!(true))))) {
                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                    }
                                                }
                                                GLF_live15m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live15r, 4)] = GLF_live15one;
                                                break;
                                        }
                                    }
                                }
                            }
                            float donor_replacementGLF_dead8refh = _GLF_FUZZED(8004.5551);
                            float donor_replacementGLF_dead8slope = _GLF_FUZZED(96.26);
                            vec2 donor_replacementGLF_dead8uvstep = _GLF_FUZZED(radians(injectionSwitch));
                            for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                                {
                                    int GLF_live15c = _GLF_FUZZED(int(169111u));
                                    uint GLF_live15matrix_number = _GLF_FUZZED(uint((vec4(74.52, 15.46, vec2(-9622.8513, -228.156)) == (true ? vec4(-9.5, 45.96, -6.9, -61.62) : vec4(81.23, 1.5, -9.3, -4.3)))));
                                    int GLF_live15rows = _GLF_FUZZED(-75457);
                                    {
                                        {
                                            int GLF_live15looplimiter0 = 0;
                                            {
                                                vec4 _GLF_outVarBackup_GLF_color;
                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                _GLF_color = faceforward(vec4(-759.461, 3.3, -1284.9847, -7.1), vec4(-1.4, -5361.3693, 56.20, -7.2), vec4(-64.45, 35.16, -53.42, 4.6));
                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                }
                                            }
                                            for (int GLF_live15r = 0; GLF_live15r < GLF_live15rows; GLF_live15r++) {
                                                if (GLF_live15looplimiter0 >= 4) {
                                                    break;
                                                }
                                                GLF_live15looplimiter0++;
                                                {
                                                    {
                                                        vec4 _GLF_outVarBackup_GLF_color;
                                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                                        _GLF_color = vec4(-670.170, 0.5, -45.61, 3.0);
                                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                        }
                                                    }
                                                    switch (GLF_live15matrix_number) {
                                                        case 0u:
                                                            GLF_live15m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live15r, 2)] = GLF_live15one;
                                                            break;
                                                        case 1u:
                                                            GLF_live15m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live15r, 3)] = GLF_live15one;
                                                            break;
                                                        case 2u:
                                                            GLF_live15m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live15r, 4)] = GLF_live15one;
                                                            break;
                                                        case 3u:
                                                            GLF_live15m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live15r, 2)] = GLF_live15one;
                                                            break;
                                                        case 4u:
                                                            GLF_live15m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live15r, 3)] = GLF_live15one;
                                                            break;
                                                        case 5u:
                                                            GLF_live15m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live15r, 4)] = GLF_live15one;
                                                            break;
                                                        case 6u:
                                                            GLF_live15m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live15r, 2)] = GLF_live15one;
                                                            break;
                                                        case 7u:
                                                            GLF_live15m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live15r, 3)] = GLF_live15one;
                                                            break;
                                                        case 8u:
                                                            GLF_live15m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live15r, 4)] = GLF_live15one;
                                                            break;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                                while (donor_replacementGLF_dead8h < donor_replacementGLF_dead8refh && donor_replacementGLF_dead8i < 32) {
                                    donor_replacementGLF_dead8coord -= donor_replacementGLF_dead8uvstep;
                                    _GLF_IDENTITY(donor_replacementGLF_dead8refh += donor_replacementGLF_dead8slope, (donor_replacementGLF_dead8refh += donor_replacementGLF_dead8slope) - 0.0);
                                    {
                                        vec2 GLF_live13coord = _GLF_FUZZED(vec2(-3.7, -6371.8225));
                                        {
                                            uvec2 GLF_live13icoord = uvec2(((GLF_live13coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                                            uint GLF_live13res1 = uint(((GLF_live13icoord.x * GLF_live13icoord.y) >> (_GLF_IDENTITY(GLF_live13icoord.x, (GLF_live13icoord.x) + uint(_GLF_ZERO(0.0, injectionSwitch.x))) & 31u)) & 0xffffffffu);
                                            uint GLF_live13res2 = uint(((GLF_live13icoord.x * GLF_live13icoord.y) << (GLF_live13icoord.x & 31u)) & 0xffffffffu);
                                            float GLF_live13res = float(((GLF_live13res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_live13res1 & 1u) != 0u ? 1u : 0u));
                                            GLF_live13_GLF_color = vec4(GLF_live13res, GLF_live13res, GLF_live13res, 1.0);
                                        }
                                    }
                                    donor_replacementGLF_dead8h = _GLF_IDENTITY(texture(GLF_dead8tex, donor_replacementGLF_dead8coord).y, (true ? texture(GLF_dead8tex, donor_replacementGLF_dead8coord).y : _GLF_FUZZED(determinant(GLF_live15m22))));
                                    donor_replacementGLF_dead8i++;
                                    {
                                        vec2 GLF_live13coord = _GLF_IDENTITY(_GLF_FUZZED(vec2(vec4(-8.8, 7712.5848, 1.0, -3.1))), mat2(1.0) * (_GLF_FUZZED(vec2(vec4(-8.8, 7712.5848, 1.0, -3.1)))));
                                        if (_GLF_IDENTITY(GLF_live13coord.x, clamp(GLF_live13coord.x, GLF_live13coord.x, GLF_live13coord.x)) > 0.4) {
                                            if (GLF_live13coord.y < 0.6) {
                                                uvec2 GLF_live13icoord = uvec2(((GLF_live13coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                                                uint GLF_live13res1 = uint(((GLF_live13icoord.x * GLF_live13icoord.y) >> (_GLF_IDENTITY(GLF_live13icoord.x & 31u, max(_GLF_IDENTITY(GLF_live13icoord.x & 31u, max(GLF_live13icoord.x & 31u, GLF_live13icoord.x & 31u)), _GLF_IDENTITY(GLF_live13icoord.x & 31u, ~(~(_GLF_IDENTITY(GLF_live13icoord.x & 31u, (GLF_live13icoord.x & 31u) | (GLF_live13icoord.x & 31u))))))))) & 0xffffffffu);
                                                uint GLF_live13res2 = uint(((GLF_live13icoord.x * GLF_live13icoord.y) << (GLF_live13icoord.x & 31u)) & 0xffffffffu);
                                                float GLF_live13res = float(((GLF_live13res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_live13res1 & 1u) != 0u ? 1u : 0u));
                                                GLF_live13_GLF_color = vec4(GLF_live13res, GLF_live13res, GLF_live13res, 1.0);
                                            } else {
                                                ivec2 GLF_live13icoord = ivec2(_GLF_IDENTITY(((GLF_live13coord - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0, (((GLF_live13coord - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0) * mat2(1.0)));
                                                int GLF_live13res3 = ((GLF_live13icoord.x >> 5) & 1) ^ ((GLF_live13icoord.y & 32) >> 5);
                                                int GLF_live13res2 = (GLF_live13icoord.y * GLF_live13icoord.y >> 10) & 1;
                                                int GLF_live13res1 = (GLF_live13icoord.x * GLF_live13icoord.y >> 9) & 1;
                                                GLF_live13_GLF_color = vec4(float(GLF_live13res1 ^ GLF_live13res2), float(GLF_live13res2 & GLF_live13res3), float(GLF_live13res1 | GLF_live13res3), 1.0);
                                            }
                                        } else {
                                            ivec2 GLF_live13icoord = ivec2(((GLF_live13coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.6, 1.0)) * 256.0);
                                            int GLF_live13v = (GLF_live13icoord.x ^ GLF_live13icoord.y) * GLF_live13icoord.y;
                                            bool GLF_live13res1 = ((GLF_live13v >> 10) & 1) != 0;
                                            bool GLF_live13res2 = ((GLF_live13v >> 11) & 4) != 0;
                                            bool GLF_live13res3 = ((GLF_live13v >> 12) & 8) != 0;
                                            GLF_live13_GLF_color = vec4(GLF_live13res1 ? 1.0 : 0.0, GLF_live13res2 ? 1.0 : 0.0, GLF_live13res3 ? 1.0 : 0.0, 1);
                                        }
                                    }
                                }
                                {
                                    int GLF_live14looplimiter3 = 0;
                                    if (GLF_live14looplimiter3 >= 6) {
                                        ;
                                    }
                                }
                            }
                        }
                        {
                            int GLF_live15cols = _GLF_FUZZED(-16263);
                            uint GLF_live15matrix_number = _GLF_FUZZED((uvec3(196413u, 78610u, 46566u).b));
                            {
                                int GLF_live15looplimiter2 = 0;
                                for (int GLF_live15rows = 2; GLF_live15rows <= 4; GLF_live15rows++) {
                                    if (GLF_live15looplimiter2 >= 4) {
                                        break;
                                    }
                                    GLF_live15looplimiter2++;
                                    {
                                        {
                                            int GLF_live15looplimiter1 = 0;
                                            for (int GLF_live15c = 0; GLF_live15c < GLF_live15cols; GLF_live15c++) {
                                                if (GLF_live15looplimiter1 >= 4) {
                                                    break;
                                                }
                                                GLF_live15looplimiter1++;
                                                {
                                                    {
                                                        int GLF_live15looplimiter0 = 0;
                                                        for (int GLF_live15r = 0; GLF_live15r < GLF_live15rows; GLF_live15r++) {
                                                            if (GLF_live15looplimiter0 >= 4) {
                                                                break;
                                                            }
                                                            GLF_live15looplimiter0++;
                                                            {
                                                                switch (GLF_live15matrix_number) {
                                                                    case 0u:
                                                                        GLF_live15m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live15r, 2)] = GLF_live15one;
                                                                        break;
                                                                    case 1u:
                                                                        GLF_live15m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live15r, 3)] = GLF_live15one;
                                                                        break;
                                                                    case 2u:
                                                                        GLF_live15m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live15r, 4)] = GLF_live15one;
                                                                        break;
                                                                    case 3u:
                                                                        {
                                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                            _GLF_color = roundEven(vec4(-3832.0453, -3.4, 28.45, 6.3));
                                                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                            }
                                                                        }
                                                                        GLF_live15m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live15r, 2)] = GLF_live15one;
                                                                        break;
                                                                    case 4u:
                                                                        GLF_live15m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live15r, 3)] = GLF_live15one;
                                                                        break;
                                                                    case 5u:
                                                                        {
                                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                            _GLF_color = vec4(vec3(608.886, -996.858, -31.17), inversesqrt(min(4.0, 68.73)));
                                                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                            }
                                                                        }
                                                                        GLF_live15m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live15r, 4)] = GLF_live15one;
                                                                        break;
                                                                    case 6u:
                                                                        GLF_live15m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live15r, 2)] = GLF_live15one;
                                                                        break;
                                                                    case 7u:
                                                                        GLF_live15m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live15r, 3)] = GLF_live15one;
                                                                        break;
                                                                    case 8u:
                                                                        GLF_live15m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live15r, 4)] = GLF_live15one;
                                                                        break;
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                        GLF_live15matrix_number = GLF_live15matrix_number + 1u;
                                    }
                                }
                            }
                        }
                    } while (_GLF_WRAPPED_LOOP(false));
                } else {
                    ;
                    {
                        vec2 GLF_live13coord = _GLF_FUZZED(vec2(-7.0, -6306.3034));
                        {
                            if (GLF_live13coord.y < 0.6) {
                                uvec2 GLF_live13icoord = uvec2(((GLF_live13coord - vec2(0.4, 0.0)) * vec2(_GLF_IDENTITY(1.0, (1.0) * 1.0) / 0.4, 1.0 / 0.6)) * 256.0);
                                uint GLF_live13res1 = uint(((GLF_live13icoord.x * GLF_live13icoord.y) >> (GLF_live13icoord.x & 31u)) & 0xffffffffu);
                                uint GLF_live13res2 = uint(((GLF_live13icoord.x * GLF_live13icoord.y) << (GLF_live13icoord.x & 31u)) & 0xffffffffu);
                                float GLF_live13res = float(((GLF_live13res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_live13res1 & 1u) != 0u ? 1u : 0u));
                                GLF_live13_GLF_color = vec4(GLF_live13res, GLF_live13res, GLF_live13res, 1.0);
                            } else {
                                ivec2 GLF_live13icoord = ivec2(((GLF_live13coord - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                                int GLF_live13res3 = (_GLF_IDENTITY((GLF_live13icoord.x >> 5), ((GLF_live13icoord.x >> 5)) | 0) & 1) ^ ((_GLF_IDENTITY(GLF_live13icoord, ivec2(0, 0) | (GLF_live13icoord)).y & 32) >> 5);
                                int GLF_live13res2 = (_GLF_IDENTITY(GLF_live13icoord.y, max(GLF_live13icoord.y, GLF_live13icoord.y)) * GLF_live13icoord.y >> 10) & 1;
                                int GLF_live13res1 = (GLF_live13icoord.x * GLF_live13icoord.y >> 9) & 1;
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = step(-750.343, cosh(vec4(49.84, -0.8, 5.0, -5.4)));
                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                                GLF_live13_GLF_color = vec4(float(GLF_live13res1 ^ GLF_live13res2), float(GLF_live13res2 & GLF_live13res3), float(GLF_live13res1 | GLF_live13res3), 1.0);
                            }
                        }
                    }
                }
            } else {
            }
        } else {
        }
    }
    {
        vec2 GLF_live13coord = _GLF_FUZZED(vec2(_GLF_IDENTITY(-7.8, mix(float(-7.8), float(_GLF_FUZZED(8.0)), bool(false))), 59.58));
        {
            ivec2 GLF_live13icoord = ivec2(((GLF_live13coord - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
            int GLF_live13res3 = ((GLF_live13icoord.x >> 5) & 1) ^ ((GLF_live13icoord.y & 32) >> 5);
            int GLF_live13res2 = (GLF_live13icoord.y * GLF_live13icoord.y >> 10) & 1;
            int GLF_live13res1 = _GLF_IDENTITY((GLF_live13icoord.x * GLF_live13icoord.y >> 9), 0 + ((GLF_live13icoord.x * GLF_live13icoord.y >> 9))) & 1;
            GLF_live13_GLF_color = vec4(float(GLF_live13res1 ^ GLF_live13res2), float(GLF_live13res2 & GLF_live13res3), float(GLF_live13res1 | GLF_live13res3), _GLF_IDENTITY(1.0, mix(float(_GLF_FUZZED(-727.534)), float(1.0), bool(true))));
        }
    }
    {
        {
            int GLF_live15looplimiter5 = _GLF_IDENTITY(0, (_GLF_IDENTITY(0, int(ivec3(0, 0, int(_GLF_ZERO(0.0, injectionSwitch.x)))))) << 0);
            if (GLF_live15looplimiter5 >= 4) {
                ;
            }
        }
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        _GLF_color = cos(vec4(1987.5522, -972.368, -7.0, -6.5));
        {
            vec2 GLF_live13coord = _GLF_FUZZED(_GLF_IDENTITY(vec2(vec4(-0.9, -9.3, -2736.2179, -9676.9893)), min(vec2(vec4(-0.9, -9.3, -2736.2179, -9676.9893)), _GLF_IDENTITY(vec2(vec4(-0.9, -9.3, -2736.2179, -9676.9893)), mix(vec2((vec2(vec4(-0.9, -9.3, -2736.2179, -9676.9893)))[0], _GLF_FUZZED(1504.2713)), vec2(_GLF_FUZZED(76.79), (vec2(vec4(-0.9, -9.3, -2736.2179, -9676.9893)))[1]), bvec2(false, true))))));
            {
                uvec2 GLF_live13icoord = uvec2(((GLF_live13coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                uint GLF_live13res1 = uint(((GLF_live13icoord.x * GLF_live13icoord.y) >> (GLF_live13icoord.x & 31u)) & 0xffffffffu);
                uint GLF_live13res2 = uint((_GLF_IDENTITY((GLF_live13icoord.x * GLF_live13icoord.y), (true ? _GLF_IDENTITY((GLF_live13icoord.x * GLF_live13icoord.y), 0u ^ ((GLF_live13icoord.x * GLF_live13icoord.y))) : _GLF_FUZZED(89148u))) << (GLF_live13icoord.x & 31u)) & 0xffffffffu);
                float GLF_live13res = float(((GLF_live13res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_live13res1 & 1u) != 0u ? 1u : 0u));
                GLF_live13_GLF_color = vec4(GLF_live13res, GLF_live13res, GLF_live13res, 1.0);
            }
        }
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            do {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            } while (_GLF_WRAPPED_LOOP(false));
        }
    }
    int msb8 = 256;
    GLF_merged2_0_1_1_1_1_4imsb8.y = msb8;
    {
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        _GLF_color = (vec2(6.4, -14.76) * (mat4x2(1854.5848, -6.3, -530.047, -2.2, 8.4, -5.4, -8.9, 7.8) / mat4x2(729.975, 72.72, 6.3, -2.2, 2624.8167, 0.4, 2790.1811, -28.15)));
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
    }
    if (_GLF_DEAD(false)) {
        {
            vec2 GLF_live13coord = _GLF_FUZZED((vec2(23.63, -83.14) - (false ? (-693.175) : float(190218u))));
            {
                ivec2 GLF_live13icoord = ivec2(((GLF_live13coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.6, 1.0)) * 256.0);
                int GLF_live13v = (GLF_live13icoord.x ^ GLF_live13icoord.y) * GLF_live13icoord.y;
                bool GLF_live13res1 = ((GLF_live13v >> 10) & 1) != 0;
                bool GLF_live13res2 = ((GLF_live13v >> 11) & 4) != 0;
                bool GLF_live13res3 = _GLF_IDENTITY(((GLF_live13v >> 12) & 8) != 0, _GLF_IDENTITY(bool(_GLF_IDENTITY(bvec3(((GLF_live13v >> 12) & 8) != 0, true, false), bvec3(bvec4(bvec3(((GLF_live13v >> 12) & 8) != 0, true, false), false)))), false || (_GLF_IDENTITY(bool(_GLF_IDENTITY(bvec3(((GLF_live13v >> 12) & 8) != 0, true, false), bvec3(bvec4(bvec3(((GLF_live13v >> 12) & 8) != 0, true, false), false)))), bool(bool(bool(_GLF_IDENTITY(bvec3(((GLF_live13v >> 12) & 8) != 0, true, false), bvec3(bvec4(bvec3(((GLF_live13v >> 12) & 8) != 0, true, false), false))))))))));
                GLF_live13_GLF_color = vec4(GLF_live13res1 ? 1.0 : 0.0, GLF_live13res2 ? 1.0 : 0.0, GLF_live13res3 ? 1.0 : 0.0, 1);
            }
        }
        return;
    }
    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= _GLF_ZERO(0.0, injectionSwitch.x))))) {
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = _GLF_IDENTITY(vec4(-8.0, -7558.5617, -_GLF_IDENTITY(47.15, max(47.15, 47.15)), -5.4), vec4(_GLF_IDENTITY(mat3x4(vec4(-8.0, -7558.5617, -_GLF_IDENTITY(47.15, max(47.15, 47.15)), -5.4), 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0), transpose(transpose(mat3x4(vec4(-8.0, -7558.5617, -_GLF_IDENTITY(47.15, max(47.15, 47.15)), -5.4), 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0))))));
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            } else {
            }
        }
        {
            int GLF_live15c = _GLF_FUZZED(63751);
            int GLF_live15looplimiter0 = 0;
            uint GLF_live15matrix_number = _GLF_FUZZED((42310u & uint(false)));
            int GLF_live15r = _GLF_IDENTITY(_GLF_FUZZED(-76650), clamp(_GLF_FUZZED(-76650), _GLF_IDENTITY(_GLF_FUZZED(-76650), min(_GLF_FUZZED(-76650), _GLF_IDENTITY(_GLF_FUZZED(-76650), min(_GLF_FUZZED(-76650), _GLF_FUZZED(-76650))))), _GLF_IDENTITY(_GLF_FUZZED(-76650), max(_GLF_FUZZED(-76650), _GLF_FUZZED(-76650)))));
            {
                if (GLF_live15looplimiter0 >= _GLF_IDENTITY(4, 0 + (_GLF_IDENTITY(4, min(4, 4))))) {
                    ;
                }
                GLF_live15looplimiter0++;
                {
                    switch (GLF_live15matrix_number) {
                        case 0u:
                            GLF_live15m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live15r, 2)] = GLF_live15one;
                            break;
                        case 1u:
                            GLF_live15m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live15r, 3)] = GLF_live15one;
                            break;
                        case 2u:
                            GLF_live15m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live15r, 4)] = GLF_live15one;
                            break;
                        case 3u:
                            GLF_live15m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live15r, 2)] = GLF_live15one;
                            break;
                        case 4u:
                            GLF_live15m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live15r, 3)] = GLF_live15one;
                            break;
                        case 5u:
                            GLF_live15m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live15r, 4)] = GLF_live15one;
                            break;
                        case 6u:
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = vec4(-59.74, -880.502, -8314.7186, 7.7);
                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= _GLF_ZERO(0.0, injectionSwitch.x))))) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                            GLF_live15m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live15r, 2)] = GLF_live15one;
                            break;
                        case 7u:
                            GLF_live15m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live15r, 3)] = GLF_live15one;
                            break;
                        case 8u:
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = vec4(8627.7853, 9.0, -1.4, -393.990);
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                            GLF_live15m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live15r, 4)] = GLF_live15one;
                            break;
                    }
                }
            }
        }
        if (_GLF_DEAD(false)) {
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(-39.09, -4473.4807, 94.22, 774.968);
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= tan(0.0))))) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            {
                vec2 GLF_merged2_0_1_12_1_1_12GLF_live5pabGLF_live5pbc;
                float GLF_live5pab = _GLF_FUZZED(-0.4);
                GLF_merged2_0_1_12_1_1_12GLF_live5pabGLF_live5pbc.x = GLF_live5pab;
                float GLF_live5pbc = _GLF_FUZZED(-5.4);
                GLF_merged2_0_1_12_1_1_12GLF_live5pabGLF_live5pbc.y = GLF_live5pbc;
                if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                } else {
                    if (!((_GLF_IDENTITY(GLF_merged2_0_1_12_1_1_12GLF_live5pabGLF_live5pbc.x < 0.0 && GLF_merged2_0_1_12_1_1_12GLF_live5pabGLF_live5pbc.y < 0.0, (GLF_merged2_0_1_12_1_1_12GLF_live5pabGLF_live5pbc.x < 0.0 && GLF_merged2_0_1_12_1_1_12GLF_live5pabGLF_live5pbc.y < 0.0) && _GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) || (GLF_merged2_0_1_12_1_1_12GLF_live5pabGLF_live5pbc.x >= 0.0 && GLF_merged2_0_1_12_1_1_12GLF_live5pabGLF_live5pbc.y >= 0.0))) {
                        ;
                    }
                }
            }
            if (_GLF_DEAD(false)) {
                return;
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    int donor_replacementGLF_dead11baseIndex = _GLF_FUZZED(873);
                    do {
                        donor_replacementGLF_dead11baseIndex = GLF_dead11tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11baseIndex, _GLF_IDENTITY(10, (10) >> int(_GLF_ZERO(0.0, injectionSwitch.x))))].leftIndex;
                        ;
                    } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
                    {
                        int GLF_live15c = _GLF_FUZZED(1318);
                        uint GLF_live15matrix_number = _GLF_FUZZED((128652u - uint(6444)));
                        int GLF_live15rows = _GLF_FUZZED(-41974);
                        {
                            {
                                int GLF_live15looplimiter0 = 0;
                                for (int GLF_live15r = 0; GLF_live15r < GLF_live15rows; GLF_live15r++) {
                                    if (GLF_live15looplimiter0 >= 4) {
                                        break;
                                    }
                                    GLF_live15looplimiter0++;
                                    {
                                        switch (GLF_live15matrix_number) {
                                            case 0u:
                                                GLF_live15m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live15r, 2)] = GLF_live15one;
                                                break;
                                            case 1u:
                                                GLF_live15m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live15r, 3)] = GLF_live15one;
                                                break;
                                            case 2u:
                                                GLF_live15m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live15r, 4)] = GLF_live15one;
                                                break;
                                            case 3u:
                                                _GLF_IDENTITY(GLF_live15m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live15r, 2)] = GLF_live15one, (_GLF_IDENTITY(GLF_live15m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live15r, 2)] = GLF_live15one, (true ? (GLF_live15m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live15r, 2)] = GLF_live15one) : _GLF_FUZZED(-0.6)))) - 0.0);
                                                break;
                                            case 4u:
                                                GLF_live15m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live15r, 3)] = GLF_live15one;
                                                break;
                                            case 5u:
                                                GLF_live15m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live15r, 4)] = GLF_live15one;
                                                break;
                                            case 6u:
                                                GLF_live15m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live15r, 2)] = GLF_live15one;
                                                {
                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                    _GLF_color = vec4(6470.5692, mat2x3(7.4, 36.66, -26.50, -19.83, 824.831, 2494.5795)[0]);
                                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                    }
                                                }
                                                break;
                                            case 7u:
                                                GLF_live15m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live15r, 3)] = GLF_live15one;
                                                break;
                                            case 8u:
                                                GLF_live15m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live15r, 4)] = _GLF_IDENTITY(GLF_live15one, (GLF_live15one) / 1.0);
                                                break;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            float donor_replacementGLF_dead3x2 = _GLF_FUZZED(-317.163);
            if (donor_replacementGLF_dead3x2 <= -0.9 && donor_replacementGLF_dead3x2 >= -1.1) {
                do {
                    {
                        int GLF_live15looplimiter0 = 0;
                        if (GLF_live15looplimiter0 >= 4) {
                            ;
                        }
                    }
                    GLF_dead3_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
                } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
            } else {
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(0.0, 2.6, 91.85, 5800.6257);
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                if (_GLF_WRAPPED_IF_FALSE(false)) {
                } else {
                    GLF_dead3_GLF_color = _GLF_IDENTITY(vec4(0.0, 1.0, 0.0, 1.0), vec4(1.0, 1.0, 1.0, 1.0) * _GLF_IDENTITY((vec4(0.0, 1.0, _GLF_IDENTITY(0.0, clamp(0.0, 0.0, 0.0)), 1.0)), _GLF_IDENTITY(((vec4(0.0, 1.0, _GLF_IDENTITY(0.0, clamp(0.0, 0.0, 0.0)), 1.0))) * mat4(_GLF_ONE(1.0, injectionSwitch.y)), mix(vec4((((vec4(0.0, 1.0, _GLF_IDENTITY(0.0, clamp(0.0, 0.0, 0.0)), 1.0))) * mat4(_GLF_ONE(1.0, injectionSwitch.y)))[0], (((vec4(0.0, 1.0, _GLF_IDENTITY(0.0, clamp(0.0, 0.0, 0.0)), 1.0))) * mat4(_GLF_ONE(1.0, injectionSwitch.y)))[1], _GLF_FUZZED(6.6), (((vec4(0.0, 1.0, _GLF_IDENTITY(0.0, clamp(0.0, 0.0, 0.0)), 1.0))) * mat4(_GLF_ONE(1.0, injectionSwitch.y)))[3]), vec4(_GLF_FUZZED(-6139.8015), _GLF_FUZZED((true ? 625.540 : 9316.5317)), (((vec4(0.0, 1.0, _GLF_IDENTITY(0.0, clamp(0.0, 0.0, 0.0)), 1.0))) * mat4(_GLF_ONE(1.0, injectionSwitch.y)))[2], _GLF_FUZZED(375.198)), bvec4(false, false, true, false)))));
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_IDENTITY(0.0, (0.0) - sqrt(0.0)))))) {
                    int donor_replacementGLF_dead11baseIndex = _GLF_FUZZED(21693);
                    {
                        vec2 GLF_live13coord = _GLF_FUZZED((vec2(9.6, 8.2) * vec2(43.36, 655.960).t));
                        {
                            if (GLF_live13coord.y < 0.6) {
                                uvec2 GLF_live13icoord = uvec2(_GLF_IDENTITY(((GLF_live13coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)), mix(vec2(_GLF_FUZZED(212.438), (((GLF_live13coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)))[1]), vec2((((GLF_live13coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)))[0], _GLF_FUZZED(-7.6)), bvec2(true, false))) * 256.0);
                                uint GLF_live13res1 = uint(((GLF_live13icoord.x * GLF_live13icoord.y) >> (GLF_live13icoord.x & 31u)) & _GLF_IDENTITY(0xffffffffu, (0xffffffffu) | 0u));
                                uint GLF_live13res2 = uint(((GLF_live13icoord.x * GLF_live13icoord.y) << (_GLF_IDENTITY(GLF_live13icoord, uvec2(_GLF_IDENTITY(uvec4(_GLF_IDENTITY(GLF_live13icoord, max(GLF_live13icoord, GLF_live13icoord)), 0u, (1u | 1u)), min(_GLF_IDENTITY(uvec4(_GLF_IDENTITY(GLF_live13icoord, max(GLF_live13icoord, GLF_live13icoord)), 0u, (1u | 1u)), max(uvec4(_GLF_IDENTITY(GLF_live13icoord, max(GLF_live13icoord, GLF_live13icoord)), 0u, (1u | 1u)), uvec4(_GLF_IDENTITY(GLF_live13icoord, max(GLF_live13icoord, GLF_live13icoord)), 0u, (1u | 1u)))), uvec4(_GLF_IDENTITY(GLF_live13icoord, max(GLF_live13icoord, GLF_live13icoord)), 0u, (1u | 1u)))))).x & 31u)) & 0xffffffffu);
                                float GLF_live13res = float(((GLF_live13res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_live13res1 & 1u) != 0u ? 1u : 0u));
                                GLF_live13_GLF_color = vec4(GLF_live13res, GLF_live13res, GLF_live13res, 1.0);
                            } else {
                                ivec2 GLF_live13icoord = ivec2(((GLF_live13coord - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                                int GLF_live13res3 = ((GLF_live13icoord.x >> 5) & 1) ^ ((GLF_live13icoord.y & 32) >> 5);
                                int GLF_live13res2 = (_GLF_IDENTITY(GLF_live13icoord, ivec2(GLF_live13icoord[0], GLF_live13icoord[1])).y * _GLF_IDENTITY(GLF_live13icoord, ivec2(ivec3(GLF_live13icoord, 1))).y >> 10) & 1;
                                int GLF_live13res1 = (GLF_live13icoord.x * GLF_live13icoord.y >> 9) & 1;
                                GLF_live13_GLF_color = vec4(float(GLF_live13res1 ^ GLF_live13res2), float(GLF_live13res2 & GLF_live13res3), float(_GLF_IDENTITY(GLF_live13res1, ~(~(GLF_live13res1))) | GLF_live13res3), 1.0);
                            }
                        }
                    }
                    int donor_replacementGLF_dead11data = _GLF_FUZZED(-86602);
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = fma(vec4(6.2, -167.910, -72.77, 9.2), vec4(-5.9, -1.2, -693.762, 168.485), mix(vec4(63.72, -49.77, 0.1, 8.8), vec4(-3.9, -6421.0496, 7.9, -2.1), bvec4(false, bvec3(true, false, true))));
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            if (_GLF_WRAPPED_IF_FALSE(false)) {
                            } else {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                {
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        _GLF_color = vec4(-1.2, 28.24, 79.74, -957.591);
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                    }
                                    {
                                        ;
                                    }
                                }
                            }
                        }
                    }
                    int donor_replacementGLF_dead11treeIndex = _GLF_FUZZED(22919);
                    {
                        if (GLF_dead11tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11baseIndex, 10)].rightIndex == -1) {
                            GLF_dead11tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11baseIndex, 10)].rightIndex = donor_replacementGLF_dead11treeIndex;
                            GLF_dead11makeTreeNode(GLF_dead11tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11treeIndex, 10)], donor_replacementGLF_dead11data);
                            return;
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = vec4(-706.322, -4.0, -545.937, -581.522);
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                } else {
                                }
                            } else {
                            }
                        } else {
                            donor_replacementGLF_dead11baseIndex = GLF_dead11tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11baseIndex, 10)].rightIndex;
                            ;
                        }
                    }
                }
            }
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                {
                    {
                        ;
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = floor(vec4(vec2(-0.9, 1.8), vec2(9.0, 91.73)));
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                    }
                }
                _GLF_color = vec4(-5226.8743, 691.536, 7.0, 974.000);
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_IDENTITY(_GLF_outVarBackup_GLF_color, (_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)) ? _GLF_outVarBackup_GLF_color : _GLF_FUZZED(GLF_live13_GLF_color)));
                }
            }
        }
    } else {
    }
    {
        vec2 GLF_live13coord = _GLF_FUZZED(vec2(9.5, 672.122));
        {
            uvec2 GLF_live13icoord = uvec2(((GLF_live13coord - vec2(0.4, _GLF_IDENTITY(0.0, (0.0) * 1.0))) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
            uint GLF_live13res1 = uint(_GLF_IDENTITY(((GLF_live13icoord.x * GLF_live13icoord.y) >> (GLF_live13icoord.x & 31u)), (((GLF_live13icoord.x * GLF_live13icoord.y) >> (GLF_live13icoord.x & 31u))) << 0u) & 0xffffffffu);
            uint GLF_live13res2 = uint(((GLF_live13icoord.x * GLF_live13icoord.y) << (GLF_live13icoord.x & 31u)) & 0xffffffffu);
            float GLF_live13res = float(((GLF_live13res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_live13res1 & 1u) != _GLF_IDENTITY(0u, clamp(0u, 0u, 0u)) ? 1u : 0u));
            GLF_live13_GLF_color = vec4(GLF_live13res, GLF_live13res, GLF_live13res, 1.0);
        }
    }
    vec4 c = vec4(bitfieldExtract(0, 0, 0), 0.0, 0.0, bitCount(GLF_merged2_0_1_1_1_1_4imsb8.y));
    {
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        _GLF_color = dFdyCoarse(vec2(-86.37, 1.6).stst);
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = vec4(5.3, -793.565, 46.16, 5.2);
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
    }
    {
        vec4 _GLF_outVarBackup_GLF_color;
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = vec4(-786.465, 6.1, -47.47, 3.9);
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = clamp(vec4(_GLF_IDENTITY(-4.3, (true ? (-4.3) : _GLF_FUZZED(tan(radians(GLF_live15one))))), -3888.9955, -8.7, 7.0), -52.35, -4.3);
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                {
                    int GLF_live15cols = _GLF_FUZZED((-(-48334)));
                    uint GLF_live15matrix_number = _GLF_IDENTITY(_GLF_FUZZED((true ? 170560u : (uvec3(50567u, 177620u, 111836u) & uvec3(115500u, 108676u, 150150u)).r)), uint(uvec2(_GLF_IDENTITY(_GLF_FUZZED((true ? 170560u : (uvec3(50567u, 177620u, 111836u) & uvec3(115500u, 108676u, 150150u)).r)), (true ? _GLF_FUZZED((true ? 170560u : (uvec3(50567u, 177620u, 111836u) & uvec3(115500u, 108676u, 150150u)).r)) : _GLF_FUZZED(2429u))), 1u)));
                    {
                        int GLF_live15looplimiter2 = 0;
                        for (int GLF_live15rows = 2; GLF_live15rows <= 4; GLF_live15rows++) {
                            if (GLF_live15looplimiter2 >= 4) {
                                break;
                            }
                            GLF_live15looplimiter2++;
                            {
                                {
                                    int GLF_live15looplimiter1 = 0;
                                    for (int GLF_live15c = 0; GLF_live15c < GLF_live15cols; GLF_live15c++) {
                                        if (GLF_live15looplimiter1 >= 4) {
                                            break;
                                        }
                                        GLF_live15looplimiter1++;
                                        {
                                            {
                                                int GLF_live15looplimiter0 = 0;
                                                for (int GLF_live15r = 0; GLF_live15r < GLF_live15rows; GLF_live15r++) {
                                                    if (GLF_live15looplimiter0 >= 4) {
                                                        break;
                                                    }
                                                    GLF_live15looplimiter0++;
                                                    {
                                                        switch (GLF_live15matrix_number) {
                                                            case 0u:
                                                                GLF_live15m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live15r, 2)] = GLF_live15one;
                                                                break;
                                                            case 1u:
                                                                GLF_live15m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live15r, 3)] = GLF_live15one;
                                                                break;
                                                            case 2u:
                                                                GLF_live15m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live15r, 4)] = _GLF_IDENTITY(GLF_live15one, mix(float(_GLF_IDENTITY(GLF_live15one, mix(float(_GLF_FUZZED((+973.974))), float(GLF_live15one), bool(true)))), float(_GLF_FUZZED(4476.7510)), bool(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))));
                                                                break;
                                                            case 3u:
                                                                GLF_live15m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live15r, 2)] = GLF_live15one;
                                                                break;
                                                            case 4u:
                                                                GLF_live15m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live15r, 3)] = GLF_live15one;
                                                                break;
                                                            case 5u:
                                                                GLF_live15m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live15r, 4)] = GLF_live15one;
                                                                break;
                                                            case 6u:
                                                                GLF_live15m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live15r, 2)] = GLF_live15one;
                                                                break;
                                                            case 7u:
                                                                GLF_live15m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live15r, 3)] = GLF_live15one;
                                                                break;
                                                            case 8u:
                                                                GLF_live15m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live15r, 4)] = GLF_live15one;
                                                                break;
                                                        }
                                                    }
                                                }
                                                {
                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                    _GLF_color = mod(vec4(vec2(535.981, 9.7), vec2(7.2, -5.4)), 443.922);
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
                                        _GLF_color = clamp(asinh(vec4(9.8, -45.36, 308.097, -919.738)), 97.40, 52.46);
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                    }
                                }
                                GLF_live15matrix_number = GLF_live15matrix_number + 1u;
                            }
                        }
                    }
                }
                for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(1.9, -254.998, 1.5, 0.5);
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            {
                {
                    GLF_live15_GLF_color = vec4(vec3(0.0), 1.0);
                }
            }
        }
        _GLF_outVarBackup_GLF_color = _GLF_color;
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            _GLF_color = (+vec4(-8.2, 64.10, 545.372, -2.9));
        } else {
        }
        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
            {
                int GLF_live15looplimiter0 = 0;
                if (GLF_live15looplimiter0 >= 4) {
                    ;
                }
            }
        }
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = vec4(0.5, -2.1, -4429.2511, 812.420);
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
        if (_GLF_WRAPPED_IF_FALSE(false)) {
        } else {
            if (_GLF_DEAD(false)) {
                return;
            }
        }
    }
    if (_GLF_DEAD(false)) {
        int donor_replacementGLF_dead10count = _GLF_FUZZED(floatBitsToInt(-874.445));
        int donor_replacementGLF_dead10v = _GLF_FUZZED((+msb8));
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = min(vec4(-80.12, 3.6, -99.64, -2.0), sinh(-7.2));
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
        {
            if ((donor_replacementGLF_dead10v & 1) == 1) {
                donor_replacementGLF_dead10v = 3 * donor_replacementGLF_dead10v + 1;
            } else {
                donor_replacementGLF_dead10v /= 2;
                {
                    {
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = vec4(8.5, 1907.5365, -48.32, -2758.6746);
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                        ;
                    }
                }
            }
            donor_replacementGLF_dead10count++;
        }
    }
    {
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        {
            int GLF_live15looplimiter4 = 0;
            if (GLF_live15looplimiter4 >= 4) {
                ;
            }
        }
        _GLF_color = mix(vec4(-_GLF_IDENTITY(360.312, (true ? 360.312 : _GLF_FUZZED(GLF_live15one))), 0.9, 4.4, 558.697), vec4(6.9, -0.1, -69.77, 79.19), -741.958);
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
    }
    {
        vec2 GLF_live13coord = _GLF_FUZZED(vec2(-4.3));
        {
            uvec2 GLF_live13icoord = uvec2(((GLF_live13coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
            uint GLF_live13res1 = uint(((GLF_live13icoord.x * GLF_live13icoord.y) >> (GLF_live13icoord.x & 31u)) & 0xffffffffu);
            uint GLF_live13res2 = uint(((GLF_live13icoord.x * GLF_live13icoord.y) << (GLF_live13icoord.x & 31u)) & 0xffffffffu);
            float GLF_live13res = float(((GLF_live13res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_live13res1 & 1u) != 0u ? 1u : 0u));
            GLF_live13_GLF_color = vec4(GLF_live13res, GLF_live13res, GLF_live13res, 1.0);
        }
    }
    float ref = floor(resolution.x / float(findLSB(GLF_merged2_0_1_1_1_1_4imsb8.y)));
    {
        int GLF_live6i = _GLF_FUZZED(19457);
        if (_GLF_DEAD(false)) {
            vec2 donor_replacementGLF_dead8coord = _GLF_FUZZED(_GLF_IDENTITY(injectionSwitch, (injectionSwitch) + vec2(0.0, 0.0)));
            float donor_replacementGLF_dead8h = _GLF_FUZZED(ref);
            {
                {
                    ;
                }
            }
            int donor_replacementGLF_dead8i = _GLF_FUZZED(int((~84256u)));
            float donor_replacementGLF_dead8slope = _GLF_FUZZED(reflect(sqrt(38.20), ref));
            vec2 donor_replacementGLF_dead8uvstep = _GLF_FUZZED(vec2(51.23, 88.86));
            {
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    donor_replacementGLF_dead8coord -= donor_replacementGLF_dead8uvstep;
                } else {
                }
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(9101.5555, -460.553, 15.36, -0.7);
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                ref += donor_replacementGLF_dead8slope;
                donor_replacementGLF_dead8h = texture(GLF_dead8tex, donor_replacementGLF_dead8coord).y;
                donor_replacementGLF_dead8i++;
            }
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(-20.78, -28.58, -5.6, -56.06);
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
        }
        int GLF_live6looplimiter0 = 0;
        vec2 GLF_live6pos = _GLF_FUZZED(vec2(-490.225, 282.684));
        {
            vec4 _GLF_outVarBackup_GLF_color;
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                bool donor_replacementGLF_dead9c8 = _GLF_FUZZED(any(lessThanEqual(vec2(17.59, 62.37), resolution)));
                vec2 donor_replacementGLF_dead9pos = _GLF_FUZZED(ceil(vec2(-7083.0776, -_GLF_IDENTITY(38.16, _GLF_IDENTITY(float(mat4(38.16, log(1.0), 0.0, 1.0, _GLF_ZERO(0.0, injectionSwitch.x), sin(_GLF_IDENTITY(dot(vec2(1.0, 0.0), vec2(0.0, 1.0)), dot(vec2(1.0, 0.0), vec2(0.0, 1.0)))), 0.0, _GLF_IDENTITY(dot(vec2(_GLF_IDENTITY(dot(vec3(1.0, 0.0, 0.0), vec3(1.0, 0.0, 0.0)), dot(vec3(1.0, 0.0, 0.0), vec3(1.0, 0.0, 0.0))), 0.0), vec2(1.0, 0.0)), dot(vec2(_GLF_IDENTITY(dot(vec3(1.0, 0.0, 0.0), vec3(1.0, 0.0, 0.0)), dot(vec3(1.0, 0.0, 0.0), vec3(1.0, 0.0, 0.0))), 0.0), vec2(1.0, 0.0))), 1.0, 0.0, 1.0, 0.0, 1.0, 0.0, 0.0, 0.0)), float(mat3x4(float(mat4(38.16, log(1.0), 0.0, 1.0, _GLF_ZERO(0.0, injectionSwitch.x), sin(_GLF_IDENTITY(dot(vec2(1.0, 0.0), vec2(0.0, 1.0)), dot(vec2(1.0, 0.0), vec2(0.0, 1.0)))), 0.0, _GLF_IDENTITY(dot(vec2(_GLF_IDENTITY(dot(vec3(1.0, 0.0, 0.0), vec3(1.0, 0.0, 0.0)), dot(vec3(1.0, 0.0, 0.0), vec3(1.0, 0.0, 0.0))), 0.0), vec2(1.0, 0.0)), dot(vec2(_GLF_IDENTITY(dot(vec3(1.0, 0.0, 0.0), vec3(1.0, 0.0, 0.0)), dot(vec3(1.0, 0.0, 0.0), vec3(1.0, 0.0, 0.0))), 0.0), vec2(1.0, 0.0))), 1.0, 0.0, 1.0, 0.0, 1.0, 0.0, 0.0, 0.0)), 1.0, 0.0, 1.0, 0.0, 0.0, _GLF_IDENTITY(dot(vec4(0.0, 0.0, 1.0, 0.0), vec4(0.0, 0.0, 1.0, 0.0)), dot(vec4(0.0, 0.0, 1.0, 0.0), vec4(0.0, 0.0, 1.0, 0.0))), abs(1.0), 1.0, 1.0, 0.0, 0.0)))))));
                vec3 donor_replacementGLF_dead9setting = _GLF_FUZZED(atanh(vec3(5.3, 4.4, 302.173)));
                if (!donor_replacementGLF_dead9c8) {
                    ;
                }
            }
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = vec4(floor(-848.732), vec3(_GLF_IDENTITY(-27.42, max(-27.42, _GLF_IDENTITY(-27.42, clamp(-27.42, -27.42, -27.42)))), -9.7, 71.85));
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                _GLF_color = _GLF_IDENTITY(_GLF_outVarBackup_GLF_color, clamp(_GLF_IDENTITY(_GLF_outVarBackup_GLF_color, (false ? _GLF_FUZZED(_GLF_color) : _GLF_outVarBackup_GLF_color)), _GLF_outVarBackup_GLF_color, _GLF_IDENTITY(_GLF_outVarBackup_GLF_color, max(_GLF_IDENTITY(_GLF_outVarBackup_GLF_color, (_GLF_outVarBackup_GLF_color) - vec4(0.0, 0.0, 0.0, 0.0)), _GLF_outVarBackup_GLF_color))));
                {
                    int GLF_live15cols = _GLF_FUZZED(-_GLF_IDENTITY(97707, int(int(97707))));
                    uint GLF_live15matrix_number = _GLF_FUZZED(uvec4(177330u, 38626u, 47874u, 38898u).y);
                    {
                        {
                            int GLF_live15looplimiter2 = 0;
                            for (int GLF_live15rows = _GLF_IDENTITY(2, (2) | (2)); GLF_live15rows <= 4; GLF_live15rows++) {
                                if (GLF_live15looplimiter2 >= _GLF_IDENTITY(4, ~(_GLF_IDENTITY(~(_GLF_IDENTITY(4, (4) | (4))), min(~(_GLF_IDENTITY(4, (4) | (4))), ~(_GLF_IDENTITY(4, (4) | (4)))))))) {
                                    break;
                                }
                                GLF_live15looplimiter2++;
                                {
                                    {
                                        int GLF_live15looplimiter1 = 0;
                                        for (int GLF_live15c = 0; GLF_live15c < GLF_live15cols; GLF_live15c++) {
                                            if (GLF_live15looplimiter1 >= 4) {
                                                break;
                                                {
                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                    _GLF_color = roundEven(log(vec4(-2.1, -31.57, 2.6, -2759.9636)));
                                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                    }
                                                }
                                            }
                                            GLF_live15looplimiter1++;
                                            {
                                                {
                                                    int GLF_live15looplimiter0 = 0;
                                                    for (int GLF_live15r = 0; GLF_live15r < GLF_live15rows; GLF_live15r++) {
                                                        if (GLF_live15looplimiter0 >= 4) {
                                                            break;
                                                        }
                                                        GLF_live15looplimiter0++;
                                                        {
                                                            switch (GLF_live15matrix_number) {
                                                                case 0u:
                                                                    GLF_live15m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live15r, 2)] = GLF_live15one;
                                                                    break;
                                                                case 1u:
                                                                    GLF_live15m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live15r, 3)] = GLF_live15one;
                                                                    break;
                                                                case 2u:
                                                                    GLF_live15m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live15r, 4)] = GLF_live15one;
                                                                    break;
                                                                case 3u:
                                                                    GLF_live15m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live15r, 2)] = GLF_live15one;
                                                                    break;
                                                                case 4u:
                                                                    GLF_live15m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live15r, 3)] = GLF_live15one;
                                                                    break;
                                                                case 5u:
                                                                    GLF_live15m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live15r, 4)] = GLF_live15one;
                                                                    break;
                                                                case 6u:
                                                                    GLF_live15m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live15r, 2)] = GLF_live15one;
                                                                    break;
                                                                case 7u:
                                                                    _GLF_IDENTITY(GLF_live15m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live15r, 3)] = GLF_live15one, sqrt(0.0) + (GLF_live15m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live15r, 3)] = GLF_live15one));
                                                                    break;
                                                                case 8u:
                                                                    GLF_live15m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live15r, 4)] = GLF_live15one;
                                                                    break;
                                                            }
                                                        }
                                                    }
                                                }
                                                {
                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                    _GLF_color = fwidthCoarse(vec4(446.203, 28.23, 1.2, -1519.3818));
                                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    GLF_live15matrix_number = GLF_live15matrix_number + 1u;
                                }
                            }
                        }
                    }
                }
            }
        }
        if (_GLF_DEAD(false)) {
            int donor_replacementGLF_dead10v = _GLF_FUZZED(GLF_live6looplimiter0);
            {
                donor_replacementGLF_dead10v = 3 * donor_replacementGLF_dead10v + 1;
            }
        }
        vec4 GLF_live6res = _GLF_FUZZED(vec4(-6816.4777, _GLF_IDENTITY(4.4, (_GLF_IDENTITY(4.4, mix(float(4.4), float(_GLF_FUZZED(-920.061)), bool(false)))) / 1.0), 455.914, 5.7));
        if (_GLF_WRAPPED_IF_FALSE(false)) {
        } else {
            if (_GLF_DEAD(_GLF_FALSE(false, (_GLF_IDENTITY(injectionSwitch.x > injectionSwitch.y, (_GLF_IDENTITY(injectionSwitch.x > injectionSwitch.y, !(_GLF_IDENTITY(!(injectionSwitch.x > injectionSwitch.y), false || (!(injectionSwitch.x > injectionSwitch.y)))))) && true))))) {
                vec2 donor_replacementGLF_dead8coord = _GLF_FUZZED(vec2(-100.162, 769.080));
                float donor_replacementGLF_dead8h = _GLF_FUZZED(-4.6);
                int donor_replacementGLF_dead8i = _GLF_FUZZED(mix(msb8, GLF_live6looplimiter0, false));
                float donor_replacementGLF_dead8refh = _GLF_FUZZED(ref);
                float donor_replacementGLF_dead8slope = _GLF_FUZZED(62.98);
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(-4.1, 0.9, -7.1, 8.9);
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                vec2 donor_replacementGLF_dead8uvstep = _GLF_FUZZED(injectionSwitch);
                while (donor_replacementGLF_dead8h < donor_replacementGLF_dead8refh && donor_replacementGLF_dead8i < 32) {
                    donor_replacementGLF_dead8coord -= donor_replacementGLF_dead8uvstep;
                    donor_replacementGLF_dead8refh += donor_replacementGLF_dead8slope;
                    donor_replacementGLF_dead8h = texture(GLF_dead8tex, donor_replacementGLF_dead8coord).y;
                    donor_replacementGLF_dead8i++;
                    {
                        vec2 GLF_live13coord = _GLF_FUZZED(vec2(447.200, -500.115));
                        {
                            if (GLF_live13coord.y < 0.6) {
                                uvec2 GLF_live13icoord = uvec2(((GLF_live13coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                                uint GLF_live13res1 = uint((_GLF_IDENTITY((GLF_live13icoord.x * GLF_live13icoord.y), ((GLF_live13icoord.x * GLF_live13icoord.y)) | ((GLF_live13icoord.x * GLF_live13icoord.y))) >> (GLF_live13icoord.x & 31u)) & 0xffffffffu);
                                uint GLF_live13res2 = uint(((_GLF_IDENTITY(GLF_live13icoord.x * GLF_live13icoord.y, ~(~(GLF_live13icoord.x * GLF_live13icoord.y)))) << (GLF_live13icoord.x & 31u)) & 0xffffffffu);
                                float GLF_live13res = float(((GLF_live13res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_live13res1 & 1u) != 0u ? 1u : 0u));
                                GLF_live13_GLF_color = vec4(GLF_live13res, GLF_live13res, GLF_live13res, 1.0);
                            } else {
                                ivec2 GLF_live13icoord = ivec2(((GLF_live13coord - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                                int GLF_live13res3 = ((GLF_live13icoord.x >> 5) & 1) ^ ((GLF_live13icoord.y & 32) >> 5);
                                int GLF_live13res2 = (GLF_live13icoord.y * GLF_live13icoord.y >> 10) & 1;
                                int GLF_live13res1 = (_GLF_IDENTITY(GLF_live13icoord, max(GLF_live13icoord, GLF_live13icoord)).x * _GLF_IDENTITY(GLF_live13icoord, (_GLF_IDENTITY(GLF_live13icoord, max(GLF_live13icoord, GLF_live13icoord))) - ivec2(0, 0)).y >> 9) & 1;
                                GLF_live13_GLF_color = vec4(float(GLF_live13res1 ^ GLF_live13res2), float(GLF_live13res2 & GLF_live13res3), float(GLF_live13res1 | GLF_live13res3), 1.0);
                            }
                        }
                    }
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = acosh(exp(radians(vec4(-251.991, 348.406, -2044.9101, 48.42))));
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                }
            }
        }
        if (_GLF_WRAPPED_IF_FALSE(false)) {
        } else {
            if (_GLF_WRAPPED_IF_FALSE(false)) {
            } else {
                if (_GLF_DEAD(false)) {
                    {
                        vec2 GLF_live13coord = _GLF_FUZZED(vec2(-0.3, 305.510));
                        {
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = vec4(-9582.6902, 65.52, 305.611, -8.5);
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                            uvec2 GLF_live13icoord = uvec2(((_GLF_IDENTITY(GLF_live13coord - vec2(0.4, 0.0), (GLF_live13coord - vec2(0.4, 0.0)) / vec2(1.0, 1.0))) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                            uint GLF_live13res1 = uint(((GLF_live13icoord.x * GLF_live13icoord.y) >> (GLF_live13icoord.x & 31u)) & 0xffffffffu);
                            uint GLF_live13res2 = uint(((GLF_live13icoord.x * _GLF_IDENTITY(GLF_live13icoord.y, 1u * (_GLF_IDENTITY(GLF_live13icoord.y, (GLF_live13icoord.y) >> 0u)))) << (GLF_live13icoord.x & 31u)) & 0xffffffffu);
                            float GLF_live13res = float(((GLF_live13res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_live13res1 & 1u) != 0u ? 1u : 0u));
                            GLF_live13_GLF_color = _GLF_IDENTITY(vec4(GLF_live13res, GLF_live13res, GLF_live13res, 1.0), max(vec4(GLF_live13res, GLF_live13res, GLF_live13res, 1.0), vec4(GLF_live13res, GLF_live13res, GLF_live13res, 1.0)));
                        }
                    }
                    {
                        ;
                    }
                }
                {
                    vec2 GLF_live13coord = _GLF_FUZZED(vec2(-76.63, -5309.9946));
                    if (GLF_live13coord.y < 0.6) {
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = (vec4(-4.1, 35.79, 410.841, 2359.2341) - vec4(7910.7090, -41.03, 334.692, 7.1));
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                        uvec2 GLF_live13icoord = uvec2(((GLF_live13coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                        uint GLF_live13res1 = uint(((_GLF_IDENTITY(GLF_live13icoord, (true ? _GLF_IDENTITY(GLF_live13icoord, max(GLF_live13icoord, GLF_live13icoord)) : _GLF_FUZZED(GLF_live13icoord))).x * GLF_live13icoord.y) >> (GLF_live13icoord.x & 31u)) & 0xffffffffu);
                        uint GLF_live13res2 = uint(((GLF_live13icoord.x * GLF_live13icoord.y) << (GLF_live13icoord.x & _GLF_IDENTITY(31u, (31u) - 0u))) & 0xffffffffu);
                        float GLF_live13res = float(((GLF_live13res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_live13res1 & 1u) != 0u ? 1u : 0u));
                        GLF_live13_GLF_color = vec4(GLF_live13res, GLF_live13res, GLF_live13res, 1.0);
                    } else {
                        ivec2 GLF_live13icoord = ivec2(((GLF_live13coord - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                        int GLF_live13res3 = ((GLF_live13icoord.x >> 5) & 1) ^ ((GLF_live13icoord.y & 32) >> 5);
                        int GLF_live13res2 = (GLF_live13icoord.y * GLF_live13icoord.y >> 10) & 1;
                        int GLF_live13res1 = _GLF_IDENTITY((GLF_live13icoord.x * GLF_live13icoord.y >> 9), ~(~((GLF_live13icoord.x * GLF_live13icoord.y >> 9)))) & 1;
                        GLF_live13_GLF_color = vec4(float(GLF_live13res1 ^ GLF_live13res2), float(GLF_live13res2 & GLF_live13res3), float(GLF_live13res1 | GLF_live13res3), 1.0);
                    }
                }
            }
            if (_GLF_WRAPPED_IF_FALSE(_GLF_IDENTITY(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)), (_GLF_FALSE(false, (_GLF_IDENTITY(injectionSwitch.x > injectionSwitch.y, !(!(injectionSwitch.x > injectionSwitch.y)))))) || false))) {
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = dFdy(vec4(2267.8428, 0.4, -31.39, -7929.8455));
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < abs(0.0))))) {
                    return;
                    if (_GLF_DEAD(false)) {
                        int donor_replacementGLF_dead10count = _GLF_FUZZED(GLF_live6looplimiter0);
                        int donor_replacementGLF_dead10v = _GLF_FUZZED(GLF_live6looplimiter0);
                        while (donor_replacementGLF_dead10v > 1) {
                            if ((donor_replacementGLF_dead10v & 1) == 1) {
                                donor_replacementGLF_dead10v = 3 * donor_replacementGLF_dead10v + 1;
                            } else {
                                donor_replacementGLF_dead10v /= 2;
                            }
                            donor_replacementGLF_dead10count++;
                        }
                    }
                }
            } else {
                if (GLF_live6looplimiter0 >= 6) {
                    for (int _injected_loop_counter = _GLF_IDENTITY(int(_GLF_IDENTITY(_GLF_ZERO(0.0, injectionSwitch.x), mix(float(_GLF_ZERO(0.0, injectionSwitch.x)), float(_GLF_FUZZED(-3.2)), bool(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))))), (int(_GLF_IDENTITY(_GLF_ZERO(0.0, injectionSwitch.x), mix(float(_GLF_ZERO(0.0, injectionSwitch.x)), float(_GLF_FUZZED(-3.2)), bool(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))))))) | (_GLF_IDENTITY(int(_GLF_IDENTITY(_GLF_ZERO(0.0, injectionSwitch.x), mix(float(_GLF_ZERO(0.0, injectionSwitch.x)), float(_GLF_FUZZED(-3.2)), bool(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))))), int(ivec3(int(_GLF_IDENTITY(_GLF_ZERO(0.0, injectionSwitch.x), mix(float(_GLF_ZERO(0.0, injectionSwitch.x)), float(_GLF_FUZZED(-3.2)), bool(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))))), 0, 1))))); _GLF_WRAPPED_LOOP(_GLF_IDENTITY(_injected_loop_counter != 1, true && (_GLF_IDENTITY(_injected_loop_counter != 1, true && (_injected_loop_counter != 1))))); _injected_loop_counter++) {
                        ;
                    }
                }
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(0.1, -16.30, -7.2, -8.1);
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= length(vec4(0.0, 0.0, 0.0, 0.0)))))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
            }
            GLF_live6looplimiter0++;
            {
                if (GLF_live6collision(GLF_live6pos, GLF_live6picdata[_GLF_IDENTITY(_GLF_MAKE_IN_BOUNDS_INT(GLF_live6i, 8), (true ? _GLF_MAKE_IN_BOUNDS_INT(GLF_live6i, 8) : _GLF_FUZZED(GLF_live6i)))])) {
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(9.0, 9.8, -3937.9891, -6.1);
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != _GLF_IDENTITY(0, (0) | (0))); _injected_loop_counter--) {
                        GLF_live6res = GLF_live6pal[_GLF_MAKE_IN_BOUNDS_INT((int(GLF_live6picdata[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6i, 8)].x) * int(GLF_live6picdata[_GLF_IDENTITY(_GLF_MAKE_IN_BOUNDS_INT(GLF_live6i, 8), ~(~(_GLF_MAKE_IN_BOUNDS_INT(GLF_live6i, 8))))].y) + GLF_live6i * 9 + 11) % 16, 16)];
                        {
                            {
                                ;
                            }
                        }
                    }
                    {
                        vec2 GLF_live13coord = _GLF_FUZZED(vec2(-977.108, -8.0));
                        if (GLF_live13coord.x > 0.4) {
                            if (GLF_live13coord.y < 0.6) {
                                uvec2 GLF_live13icoord = uvec2(((GLF_live13coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                                uint GLF_live13res1 = uint(((GLF_live13icoord.x * GLF_live13icoord.y) >> (GLF_live13icoord.x & 31u)) & 0xffffffffu);
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = vec4(701.799, 47.67, -5562.0501, 9449.0262);
                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                                uint GLF_live13res2 = uint(((GLF_live13icoord.x * GLF_live13icoord.y) << (GLF_live13icoord.x & 31u)) & 0xffffffffu);
                                float GLF_live13res = float(((GLF_live13res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_live13res1 & 1u) != 0u ? 1u : 0u));
                                GLF_live13_GLF_color = vec4(GLF_live13res, GLF_live13res, GLF_live13res, 1.0);
                            } else {
                                ivec2 GLF_live13icoord = ivec2(((GLF_live13coord - vec2(0.4, 0.6)) * vec2(_GLF_IDENTITY(1.0, max(1.0, _GLF_IDENTITY(1.0, mix(float(1.0), float(_GLF_FUZZED(429.191)), bool(false))))) / 0.4, 1.0 / 0.4)) * 256.0);
                                int GLF_live13res3 = ((_GLF_IDENTITY(GLF_live13icoord.x, min(GLF_live13icoord.x, _GLF_IDENTITY(GLF_live13icoord.x, (GLF_live13icoord.x) | 0))) >> 5) & 1) ^ ((GLF_live13icoord.y & 32) >> 5);
                                int GLF_live13res2 = (GLF_live13icoord.y * GLF_live13icoord.y >> 10) & 1;
                                int GLF_live13res1 = (GLF_live13icoord.x * GLF_live13icoord.y >> 9) & 1;
                                GLF_live13_GLF_color = vec4(float(GLF_live13res1 ^ GLF_live13res2), float(GLF_live13res2 & GLF_live13res3), float(GLF_live13res1 | GLF_live13res3), 1.0);
                            }
                        } else {
                            ivec2 GLF_live13icoord = ivec2(((GLF_live13coord - vec2(0.4, 0.0)) * vec2(_GLF_IDENTITY(1.0 / 0.6, (1.0 / 0.6) + 0.0), 1.0)) * 256.0);
                            int GLF_live13v = (GLF_live13icoord.x ^ GLF_live13icoord.y) * GLF_live13icoord.y;
                            bool GLF_live13res1 = ((GLF_live13v >> 10) & 1) != 0;
                            bool GLF_live13res2 = ((GLF_live13v >> 11) & 4) != 0;
                            bool GLF_live13res3 = ((GLF_live13v >> 12) & 8) != 0;
                            GLF_live13_GLF_color = vec4(GLF_live13res1 ? 1.0 : 0.0, _GLF_IDENTITY(GLF_live13res2 ? 1.0 : 0.0, float(mat4x3(GLF_live13res2 ? 1.0 : 0.0, sqrt(1.0), 0.0, sqrt(1.0), 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0))), GLF_live13res3 ? 1.0 : 0.0, 1);
                        }
                    }
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(3722.1605, 8.0, 4.0, -7446.9801);
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        vec2 donor_replacementGLF_dead8coord = _GLF_FUZZED(asin(GLF_live6pos));
                        float donor_replacementGLF_dead8h = _GLF_FUZZED(ref);
                        int donor_replacementGLF_dead8i = _GLF_IDENTITY(_GLF_FUZZED(-22782), int(ivec3(_GLF_FUZZED(-22782), 0, int(_GLF_ONE(1.0, injectionSwitch.y)))));
                        {
                            int GLF_live15looplimiter1 = 0;
                            if (GLF_live15looplimiter1 >= 4) {
                                ;
                            }
                        }
                        float donor_replacementGLF_dead8refh = _GLF_FUZZED(fwidth(vec3(8723.7906, -7510.7220, 15.07)[0]));
                        float donor_replacementGLF_dead8slope = _GLF_FUZZED(0.5);
                        vec2 donor_replacementGLF_dead8uvstep = _GLF_FUZZED(sqrt(GLF_live6pos));
                        while (donor_replacementGLF_dead8h < donor_replacementGLF_dead8refh && donor_replacementGLF_dead8i < 32) {
                            donor_replacementGLF_dead8coord -= donor_replacementGLF_dead8uvstep;
                            donor_replacementGLF_dead8refh += donor_replacementGLF_dead8slope;
                            {
                                {
                                    ;
                                }
                            }
                            donor_replacementGLF_dead8h = texture(GLF_dead8tex, _GLF_IDENTITY(donor_replacementGLF_dead8coord, max(donor_replacementGLF_dead8coord, _GLF_IDENTITY(donor_replacementGLF_dead8coord, (true ? donor_replacementGLF_dead8coord : _GLF_FUZZED(donor_replacementGLF_dead8uvstep)))))).y;
                            {
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = (vec4(0.6, 271.937, 7.6, -1105.0576) + vec4(-1.7, 80.65, 31.53, 6.3));
                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                                vec4 _GLF_outVarBackup_GLF_color;
                                for (int _injected_loop_counter = ((0 >> _GLF_IDENTITY(int(3), _GLF_IDENTITY(int(3), 0 + (int(3))))) ^ 1); _GLF_WRAPPED_LOOP(_injected_loop_counter > (0 | 0)); _injected_loop_counter--) {
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                }
                                _GLF_color = max(vec4(6.9, 619.541, -5191.1897, 752.360), vec4(9.9, 9.7, -76.12, 500.054));
                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                            donor_replacementGLF_dead8i++;
                        }
                        {
                            {
                                ;
                            }
                        }
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            {
                                vec2 GLF_live13coord = _GLF_IDENTITY(_GLF_FUZZED((mat4x2(mat4x3(9.6, -235.311, -134.145, 2964.8516, 3421.7903, -3.2, 9.1, -371.054, 7.0, 0.1, _GLF_IDENTITY(2249.9106, (false ? _GLF_FUZZED(atan(GLF_live15one, GLF_live15one)) : 2249.9106)), -8.7)) * vec4(3.9, -8.4, 95.29, 568.375))), _GLF_IDENTITY(vec2(mat2x3(_GLF_FUZZED((mat4x2(mat4x3(9.6, -235.311, -134.145, 2964.8516, 3421.7903, -3.2, 9.1, -371.054, 7.0, 0.1, _GLF_IDENTITY(2249.9106, (false ? _GLF_FUZZED(atan(GLF_live15one, GLF_live15one)) : 2249.9106)), -8.7)) * vec4(3.9, -8.4, 95.29, 568.375))), 0.0, 1.0, determinant(mat2(1.0, 0.0, 0.0, 1.0)), tan(0.0))), clamp(vec2(mat2x3(_GLF_FUZZED((mat4x2(mat4x3(9.6, -235.311, -134.145, 2964.8516, 3421.7903, -3.2, 9.1, -371.054, 7.0, 0.1, _GLF_IDENTITY(2249.9106, (false ? _GLF_FUZZED(atan(GLF_live15one, GLF_live15one)) : 2249.9106)), -8.7)) * vec4(3.9, -8.4, 95.29, 568.375))), 0.0, 1.0, determinant(mat2(1.0, 0.0, 0.0, 1.0)), tan(0.0))), vec2(mat2x3(_GLF_FUZZED((mat4x2(mat4x3(9.6, -235.311, -134.145, 2964.8516, 3421.7903, -3.2, 9.1, -371.054, 7.0, 0.1, _GLF_IDENTITY(2249.9106, (false ? _GLF_FUZZED(atan(GLF_live15one, GLF_live15one)) : 2249.9106)), -8.7)) * vec4(3.9, -8.4, 95.29, 568.375))), 0.0, 1.0, determinant(mat2(1.0, 0.0, 0.0, 1.0)), tan(0.0))), vec2(mat2x3(_GLF_FUZZED((mat4x2(mat4x3(9.6, -235.311, -134.145, 2964.8516, 3421.7903, -3.2, 9.1, -371.054, 7.0, 0.1, _GLF_IDENTITY(2249.9106, (false ? _GLF_FUZZED(atan(GLF_live15one, GLF_live15one)) : 2249.9106)), -8.7)) * vec4(3.9, -8.4, 95.29, 568.375))), 0.0, 1.0, determinant(mat2(1.0, 0.0, 0.0, 1.0)), tan(0.0))))));
                                {
                                    uvec2 GLF_live13icoord = uvec2(_GLF_IDENTITY(((GLF_live13coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0, max(((GLF_live13coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0, ((GLF_live13coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0)));
                                    uint GLF_live13res1 = uint(((GLF_live13icoord.x * GLF_live13icoord.y) >> (GLF_live13icoord.x & 31u)) & 0xffffffffu);
                                    uint GLF_live13res2 = uint(((GLF_live13icoord.x * GLF_live13icoord.y) << _GLF_IDENTITY((GLF_live13icoord.x & 31u), (_GLF_IDENTITY((GLF_live13icoord.x & 31u), ((GLF_live13icoord.x & 31u)) + 0u)) | 0u)) & 0xffffffffu);
                                    float GLF_live13res = float(((GLF_live13res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_live13res1 & 1u) != 0u ? 1u : 0u));
                                    GLF_live13_GLF_color = vec4(GLF_live13res, GLF_live13res, GLF_live13res, 1.0);
                                }
                            }
                            _GLF_color = dFdxCoarse(mat3x4(mat4x3(4.4, 3.2, -7.1, 7.2, 844.857, 413.251, -47.77, -1.3, -9.5, -5787.4091, _GLF_IDENTITY(257.032, (257.032) - length(vec3(0.0, 0.0, 0.0))), -790.617))[0]);
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                if (_GLF_WRAPPED_IF_FALSE(false)) {
                                } else {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        _GLF_color = vec4(6106.1535, -6.8, -1.9, 19.68);
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                    }
                                }
                            }
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = refract(vec4(64.11, -1.8, 9.1, 31.07), vec4(2.0, -2894.8412, 2.8, -2.6), -4.4);
                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                        }
                    }
                }
            }
            if (_GLF_DEAD(false)) {
                vec2 donor_replacementGLF_dead8coord = _GLF_FUZZED(mix(injectionSwitch, resolution, vec2(vec3(2107.1751, -24.34, 1912.3581))));
                float donor_replacementGLF_dead8h = _GLF_FUZZED(ref);
                int donor_replacementGLF_dead8i = _GLF_FUZZED(min(GLF_live6looplimiter0, -90825));
                float donor_replacementGLF_dead8slope = _GLF_FUZZED(intBitsToFloat(GLF_live6looplimiter0));
                vec2 donor_replacementGLF_dead8uvstep = _GLF_FUZZED(min(GLF_live6pos, ref));
                if (_GLF_WRAPPED_IF_FALSE(false)) {
                    {
                        {
                            ;
                        }
                    }
                } else {
                    donor_replacementGLF_dead8coord -= donor_replacementGLF_dead8uvstep;
                    ref += donor_replacementGLF_dead8slope;
                    {
                        vec2 GLF_live13coord = _GLF_FUZZED(vec4(4388.9430, -433.804, 529.034, 7944.0385).br);
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = vec4(-61.26, 6.7, -7.6, 5.9);
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                        {
                            uvec2 GLF_live13icoord = uvec2(((GLF_live13coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, _GLF_IDENTITY(1.0 / 0.6, mix(float(1.0 / 0.6), float(_GLF_FUZZED(8.1)), bool(false))))) * 256.0);
                            uint GLF_live13res1 = uint(_GLF_IDENTITY(((GLF_live13icoord.x * GLF_live13icoord.y) >> (GLF_live13icoord.x & 31u)), min(((GLF_live13icoord.x * GLF_live13icoord.y) >> (GLF_live13icoord.x & 31u)), ((GLF_live13icoord.x * GLF_live13icoord.y) >> (GLF_live13icoord.x & 31u)))) & 0xffffffffu);
                            uint GLF_live13res2 = uint(((GLF_live13icoord.x * GLF_live13icoord.y) << (GLF_live13icoord.x & 31u)) & 0xffffffffu);
                            float GLF_live13res = float(((GLF_live13res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_live13res1 & 1u) != 0u ? 1u : _GLF_IDENTITY(0u, ~(~(0u)))));
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = (mat4x3(mat3x4(-9.0, 88.59, 8.3, -4456.6797, -6627.3994, 3195.6184, -2.6, -7.6, 9.4, -1.5, -2.1, -3.4)), vec4(1.9, 269.118, 9931.1068, -758.265));
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                            GLF_live13_GLF_color = vec4(GLF_live13res, GLF_live13res, GLF_live13res, 1.0);
                        }
                    }
                    donor_replacementGLF_dead8h = texture(GLF_dead8tex, donor_replacementGLF_dead8coord).y;
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(2.2, 4168.0499, 90.81, 8.2);
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    donor_replacementGLF_dead8i++;
                }
            }
        }
        if (_GLF_DEAD(false)) {
            return;
        }
    }
    {
        vec4 _GLF_outVarBackup_GLF_color;
        {
            vec2 GLF_live13coord = _GLF_FUZZED(((mat4x2(-5467.1110, 4.5, -9.3, 24.22, 1.4, -_GLF_IDENTITY(9554.0995, 1.0 * (9554.0995)), -9.3, 3238.9099) + mat4x2(2.7, 20.92, -17.39, 1.5, 5952.8771, -4804.8092, -7.9, -68.17)) * vec4(-84.62, 9.3, 2663.7568, -5.9)));
            if (GLF_live13coord.y < 0.6) {
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = ((-2.7) * vec3(-484.701, -6080.4134, 231.575).yxxy);
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                uvec2 GLF_live13icoord = uvec2(((GLF_live13coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                uint GLF_live13res1 = uint(((GLF_live13icoord.x * GLF_live13icoord.y) >> (GLF_live13icoord.x & 31u)) & 0xffffffffu);
                uint GLF_live13res2 = uint(((GLF_live13icoord.x * GLF_live13icoord.y) << (GLF_live13icoord.x & 31u)) & 0xffffffffu);
                float GLF_live13res = float(((GLF_live13res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_live13res1 & 1u) != _GLF_IDENTITY(0u, (0u) * 1u) ? 1u : 0u));
                GLF_live13_GLF_color = vec4(GLF_live13res, GLF_live13res, GLF_live13res, 1.0);
            } else {
                ivec2 GLF_live13icoord = ivec2(((GLF_live13coord - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                int GLF_live13res3 = ((GLF_live13icoord.x >> 5) & 1) ^ ((GLF_live13icoord.y & 32) >> 5);
                int GLF_live13res2 = (GLF_live13icoord.y * GLF_live13icoord.y >> 10) & 1;
                int GLF_live13res1 = (GLF_live13icoord.x * GLF_live13icoord.y >> 9) & 1;
                GLF_live13_GLF_color = vec4(float(GLF_live13res1 ^ GLF_live13res2), float(GLF_live13res2 & GLF_live13res3), float(GLF_live13res1 | GLF_live13res3), 1.0);
            }
        }
        _GLF_outVarBackup_GLF_color = _GLF_color;
        _GLF_color = vec4(9389.9437, _GLF_IDENTITY(-9.9, mix(float(_GLF_FUZZED(float(false))), float(-9.9), bool(true))), 5.1, 9.2);
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
            {
                vec2 GLF_live13coord = _GLF_FUZZED(vec2(22.94, 789.876));
                {
                    uvec2 GLF_live13icoord = uvec2(((GLF_live13coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                    uint GLF_live13res1 = uint(((GLF_live13icoord.x * GLF_live13icoord.y) >> (GLF_live13icoord.x & 31u)) & 0xffffffffu);
                    uint GLF_live13res2 = _GLF_IDENTITY(uint(((GLF_live13icoord.x * GLF_live13icoord.y) << (GLF_live13icoord.x & 31u)) & 0xffffffffu), ~(~(_GLF_IDENTITY(uint(((GLF_live13icoord.x * GLF_live13icoord.y) << (GLF_live13icoord.x & 31u)) & 0xffffffffu), (uint(((GLF_live13icoord.x * GLF_live13icoord.y) << (GLF_live13icoord.x & 31u)) & 0xffffffffu)) | 0u))));
                    float GLF_live13res = float(((GLF_live13res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_live13res1 & 1u) != 0u ? 1u : 0u));
                    GLF_live13_GLF_color = vec4(GLF_live13res, GLF_live13res, GLF_live13res, 1.0);
                }
            }
        }
    }
    {
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = mix(vec4(8327.5192, -1.9, -9.5, 6.0), vec4(-6.5, 9.9, 6365.2686, 574.656), vec4(7.2, -672.294, -5858.7118, -240.700));
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
        int GLF_live15cols = _GLF_FUZZED(ivec2(-51882, -88654).r);
        uint GLF_live15matrix_number = _GLF_FUZZED((+143595u));
        int GLF_live15rows = _GLF_FUZZED(1366);
        {
            int GLF_live15looplimiter1 = 0;
            for (int GLF_live15c = 0; GLF_live15c < GLF_live15cols; GLF_live15c++) {
                if (GLF_live15looplimiter1 >= 4) {
                    break;
                }
                GLF_live15looplimiter1++;
                {
                    {
                        int GLF_live15looplimiter0 = 0;
                        for (int GLF_live15r = 0; _GLF_IDENTITY(GLF_live15r < GLF_live15rows, (GLF_live15r < GLF_live15rows) || false); GLF_live15r++) {
                            if (GLF_live15looplimiter0 >= 4) {
                                break;
                            }
                            GLF_live15looplimiter0++;
                            {
                                switch (_GLF_IDENTITY(GLF_live15matrix_number, ((((1u << _GLF_IDENTITY(uint(1u), uint(1u))) >> _GLF_IDENTITY(uint(1u), uint(1u))) << _GLF_IDENTITY(uint(4u), uint(4u))) >> _GLF_IDENTITY(uint(4u), uint(4u))) * (GLF_live15matrix_number))) {
                                    case 0u:
                                        GLF_live15m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live15r, 2)] = GLF_live15one;
                                        break;
                                    case 1u:
                                        GLF_live15m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live15r, 3)] = GLF_live15one;
                                        break;
                                    case 2u:
                                        GLF_live15m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live15r, 4)] = GLF_live15one;
                                        break;
                                    case 3u:
                                        GLF_live15m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live15r, 2)] = GLF_live15one;
                                        break;
                                    case 4u:
                                        GLF_live15m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live15r, 3)] = GLF_live15one;
                                        break;
                                    case 5u:
                                        _GLF_IDENTITY(GLF_live15m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live15r, 4)] = GLF_live15one, (GLF_live15m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live15r, 4)] = GLF_live15one) / round(length(normalize(vec3(1.0, 1.0, 1.0)))));
                                        break;
                                    case 6u:
                                        GLF_live15m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live15r, 2)] = GLF_live15one;
                                        break;
                                    case 7u:
                                        GLF_live15m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live15r, 3)] = GLF_live15one;
                                        break;
                                    case 8u:
                                        GLF_live15m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live15r, 4)] = GLF_live15one;
                                        break;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    c.x = nb_mod(gl_FragCoord.x, ref);
    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
        return;
    }
    c.y = nb_mod(gl_FragCoord.y, ref);
    {
        int GLF_live7looplimiter1 = 0;
        if (_GLF_DEAD(false)) {
            int donor_replacementGLF_dead10count = _GLF_FUZZED(msb8);
            {
                if ((GLF_live7looplimiter1 & 1) == 1) {
                    GLF_live7looplimiter1 = 3 * GLF_live7looplimiter1 + 1;
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(864.790, 7514.9400, -2.7, -4269.3030);
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                } else {
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(-9.4, 8425.9447, -35.25, -4.4);
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    GLF_live7looplimiter1 /= 2;
                }
                donor_replacementGLF_dead10count++;
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = max(vec4(3527.4687, -312.215, 5.4, 8.6), 6721.9223);
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
            }
        }
        for (int _injected_loop_counter = (0 & (-51453)); _GLF_WRAPPED_LOOP(_injected_loop_counter < (1 & int(_GLF_ONE(1.0, injectionSwitch.y)))); _injected_loop_counter++) {
            if (GLF_live7looplimiter1 >= 5) {
                {
                    vec2 GLF_live13coord = _GLF_FUZZED((vec2(665.683, 2.7) * _GLF_IDENTITY(mat2(_GLF_IDENTITY(-9.4, min(-9.4, -9.4)), 798.871, -1.6, -287.056), (_GLF_IDENTITY(mat2(_GLF_IDENTITY(-9.4, min(-9.4, -9.4)), 798.871, -1.6, -287.056), (_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)) ? mat2(_GLF_IDENTITY(-9.4, min(-9.4, -9.4)), 798.871, -1.6, -287.056) : _GLF_FUZZED(GLF_live15m22)))) - mat2(0.0, 0.0, 0.0, 0.0))));
                    if (GLF_live13coord.y < 0.6) {
                        uvec2 GLF_live13icoord = uvec2(((GLF_live13coord - vec2(0.4, 0.0)) * vec2(_GLF_IDENTITY(1.0 / 0.4, (1.0 / 0.4) - 0.0), 1.0 / 0.6)) * 256.0);
                        uint GLF_live13res1 = uint(((GLF_live13icoord.x * _GLF_IDENTITY(GLF_live13icoord.y, 0u + (GLF_live13icoord.y))) >> (GLF_live13icoord.x & 31u)) & 0xffffffffu);
                        uint GLF_live13res2 = uint(((GLF_live13icoord.x * GLF_live13icoord.y) << (GLF_live13icoord.x & 31u)) & 0xffffffffu);
                        float GLF_live13res = float(((GLF_live13res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_live13res1 & 1u) != _GLF_IDENTITY(0u, (_GLF_IDENTITY(0u, (0u) - 0u)) >> 0u) ? 1u : 0u));
                        _GLF_IDENTITY(GLF_live13_GLF_color = vec4(GLF_live13res, GLF_live13res, GLF_live13res, 1.0), (_GLF_IDENTITY(GLF_live13_GLF_color = vec4(GLF_live13res, GLF_live13res, GLF_live13res, 1.0), (true ? _GLF_IDENTITY(GLF_live13_GLF_color = vec4(GLF_live13res, GLF_live13res, GLF_live13res, 1.0), (GLF_live13_GLF_color = vec4(GLF_live13res, GLF_live13res, GLF_live13res, 1.0)) * vec4(1.0, 1.0, 1.0, 1.0)) : _GLF_FUZZED(c)))) - vec4(0.0, 0.0, 0.0, 0.0));
                    } else {
                        ivec2 GLF_live13icoord = ivec2(((GLF_live13coord - _GLF_IDENTITY(vec2(0.4, 0.6), clamp(vec2(0.4, 0.6), _GLF_IDENTITY(vec2(0.4, 0.6), vec2(mat4x2(vec2(0.4, 0.6), 0.0, 1.0, 1.0, 1.0, 0.0, 0.0))), _GLF_IDENTITY(vec2(0.4, 0.6), clamp(vec2(0.4, 0.6), vec2(0.4, 0.6), vec2(0.4, 0.6)))))) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                        int GLF_live13res3 = ((GLF_live13icoord.x >> 5) & 1) ^ ((GLF_live13icoord.y & 32) >> 5);
                        int GLF_live13res2 = (_GLF_IDENTITY(GLF_live13icoord.y, min(GLF_live13icoord.y, GLF_live13icoord.y)) * GLF_live13icoord.y >> 10) & 1;
                        int GLF_live13res1 = (GLF_live13icoord.x * GLF_live13icoord.y >> 9) & 1;
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = (+sqrt(clamp(vec4(4.5, 8.8, -1.0, 751.469), -785.854, 4095.3206)));
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                        GLF_live13_GLF_color = vec4(float(GLF_live13res1 ^ GLF_live13res2), float(GLF_live13res2 & GLF_live13res3), float(GLF_live13res1 | GLF_live13res3), 1.0);
                    }
                }
                if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                } else {
                    ;
                }
            }
        }
    }
    if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
    } else {
        if (_GLF_DEAD(false)) {
            {
                {
                    {
                        int GLF_live15c = _GLF_FUZZED(-64148);
                        uint GLF_live15matrix_number = _GLF_FUZZED(184736u);
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = mod(vec4(6.2, 419.275, -9218.0965, 7.1), (vec4(447.203, 7.7, -749.610, -2349.7007)));
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                        int GLF_live15rows = _GLF_FUZZED((+(-75836)));
                        {
                            int GLF_live15looplimiter0 = 0;
                            for (int GLF_live15r = 0; GLF_live15r < GLF_live15rows; GLF_live15r++) {
                                if (GLF_live15looplimiter0 >= 4) {
                                    break;
                                }
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = (2.3 - vec4(2925.3983, 2763.2036, -7.5, 3618.7154));
                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                                GLF_live15looplimiter0++;
                                {
                                    switch (GLF_live15matrix_number) {
                                        case 0u:
                                            GLF_live15m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live15r, 2)] = GLF_live15one;
                                            break;
                                        case 1u:
                                            GLF_live15m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live15r, 3)] = GLF_live15one;
                                            break;
                                        case 2u:
                                            GLF_live15m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live15r, 4)] = GLF_live15one;
                                            break;
                                        case 3u:
                                            GLF_live15m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live15r, 2)] = GLF_live15one;
                                            break;
                                            {
                                                vec4 _GLF_outVarBackup_GLF_color;
                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                _GLF_color = vec4(48.64, 386.616, -5797.6428, -32.12);
                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                }
                                            }
                                        case 4u:
                                            GLF_live15m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live15r, 3)] = GLF_live15one;
                                            break;
                                            {
                                                vec4 _GLF_outVarBackup_GLF_color;
                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                _GLF_color = (vec4(7.3, -346.620, -1.6, 42.14) / vec4(-48.17, 6.5, 1.9, -9176.1773));
                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                }
                                            }
                                        case 5u:
                                            GLF_live15m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live15r, 4)] = GLF_live15one;
                                            break;
                                        case 6u:
                                            GLF_live15m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live15r, 2)] = GLF_live15one;
                                            break;
                                        case 7u:
                                            GLF_live15m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live15r, 3)] = GLF_live15one;
                                            break;
                                        case 8u:
                                            GLF_live15m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live15r, 4)] = GLF_live15one;
                                            break;
                                    }
                                }
                            }
                        }
                    }
                    vec2 GLF_live5pos = _GLF_FUZZED(vec2(-485.593, -8.3));
                    for (int _injected_loop_counter = ((_GLF_IDENTITY(1, int(int(1))) << _GLF_IDENTITY(int(3), _GLF_IDENTITY(int(3), (int(3)) - (0 >> _GLF_IDENTITY(int(4), int(4)))))) >> _GLF_IDENTITY(int(3), int(3))); _GLF_WRAPPED_LOOP(_injected_loop_counter != ((0 & (-35586)) << _GLF_IDENTITY(int(0), int(0)))); _injected_loop_counter--) {
                        if (GLF_live5pointInTriangle(GLF_live5pos, vec2(0.7, 0.3), vec2(0.5, 0.9), vec2(0.1, 0.4)) == 1) {
                            GLF_live5_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
                        } else {
                            GLF_live5_GLF_color = vec4(0.0, 0.0, 0.0, 1.0);
                        }
                    }
                }
                {
                    int GLF_live14looplimiter1 = 0;
                    if (GLF_live14looplimiter1 >= 6) {
                        ;
                    }
                }
                ;
            }
        }
    }
    {
        {
            vec4 _GLF_outVarBackup_GLF_color;
            if (_GLF_WRAPPED_IF_FALSE(false)) {
            } else {
                _GLF_outVarBackup_GLF_color = _GLF_color;
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = (atan(vec4(-4.9, 1445.0713, -71.41, 29.86)) / acosh(-0.5));
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
            }
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= sqrt(0.0))))) {
                _GLF_color = vec4(3611.4083, -_GLF_IDENTITY(1.0, clamp(1.0, 1.0, _GLF_IDENTITY(1.0, max(1.0, 1.0)))), -6.2, 31.13);
                {
                    int GLF_live14looplimiter2 = 0;
                    if (GLF_live14looplimiter2 >= 6) {
                        ;
                    }
                }
            } else {
            }
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, _GLF_IDENTITY((injectionSwitch.x < injectionSwitch.y), (_GLF_IDENTITY((injectionSwitch.x < injectionSwitch.y), ((injectionSwitch.x < injectionSwitch.y)) && true)) && true)))) {
                _GLF_color = _GLF_IDENTITY(_GLF_outVarBackup_GLF_color, max(_GLF_outVarBackup_GLF_color, _GLF_outVarBackup_GLF_color));
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(-68.20, 5.4, -128.528, -2.9);
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
            }
        }
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        {
            int GLF_live14looplimiter0 = 0;
            if (GLF_live14looplimiter0 >= 6) {
                ;
            }
        }
        _GLF_color = dFdyCoarse(sqrt(vec4(9.3, _GLF_IDENTITY(4.9, _GLF_IDENTITY(0.0, mix(float(0.0), float(_GLF_FUZZED(-581.773)), bool(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))))) + (4.9)), 89.48, -320.055)));
        {
            vec2 GLF_live13coord = _GLF_FUZZED((vec2(-809.040, -5.6)));
            {
                uvec2 GLF_live13icoord = uvec2(((GLF_live13coord - vec2(0.4, 0.0)) * vec2(_GLF_IDENTITY(1.0 / 0.4, mix(float(_GLF_FUZZED(-44.29)), float(1.0 / 0.4), bool(true))), 1.0 / 0.6)) * 256.0);
                uint GLF_live13res1 = uint(((GLF_live13icoord.x * GLF_live13icoord.y) >> (_GLF_IDENTITY(GLF_live13icoord.x & _GLF_IDENTITY(31u, (31u) | (31u)), (_GLF_IDENTITY(GLF_live13icoord.x & _GLF_IDENTITY(31u, (31u) | (31u)), uint(uvec2(GLF_live13icoord.x & _GLF_IDENTITY(31u, (31u) | (31u)), 0u)))) | (_GLF_IDENTITY(GLF_live13icoord.x & _GLF_IDENTITY(31u, (31u) | (31u)), (GLF_live13icoord.x & _GLF_IDENTITY(31u, (31u) | (31u))) | (GLF_live13icoord.x & _GLF_IDENTITY(31u, (31u) | (31u)))))))) & 0xffffffffu);
                uint GLF_live13res2 = uint(((GLF_live13icoord.x * GLF_live13icoord.y) << (GLF_live13icoord.x & 31u)) & 0xffffffffu);
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(-133.525, 36.15, -434.465, 267.998);
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                float GLF_live13res = float(((GLF_live13res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_live13res1 & 1u) != 0u ? 1u : 0u));
                GLF_live13_GLF_color = vec4(GLF_live13res, GLF_live13res, GLF_live13res, 1.0);
            }
        }
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            _GLF_color = _GLF_IDENTITY(_GLF_outVarBackup_GLF_color, mat4(1.0) * (_GLF_outVarBackup_GLF_color));
        }
    }
    {
        vec2 GLF_live13coord = _GLF_FUZZED(vec2(-5.2, 6202.8447));
        {
            if (GLF_live13coord.y < 0.6) {
                uvec2 GLF_live13icoord = uvec2(((GLF_live13coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                uint GLF_live13res1 = uint(((GLF_live13icoord.x * GLF_live13icoord.y) >> (GLF_live13icoord.x & 31u)) & 0xffffffffu);
                uint GLF_live13res2 = uint(((GLF_live13icoord.x * GLF_live13icoord.y) << _GLF_IDENTITY((GLF_live13icoord.x & 31u), min(_GLF_IDENTITY((GLF_live13icoord.x & 31u), ((GLF_live13icoord.x & 31u)) | ((GLF_live13icoord.x & 31u))), (GLF_live13icoord.x & 31u)))) & 0xffffffffu);
                float GLF_live13res = float(((GLF_live13res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_live13res1 & 1u) != 0u ? 1u : 0u));
                GLF_live13_GLF_color = vec4(GLF_live13res, GLF_live13res, GLF_live13res, 1.0);
            } else {
                ivec2 GLF_live13icoord = ivec2(((GLF_live13coord - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                int GLF_live13res3 = ((GLF_live13icoord.x >> 5) & 1) ^ ((GLF_live13icoord.y & 32) >> 5);
                int GLF_live13res2 = (GLF_live13icoord.y * GLF_live13icoord.y >> 10) & 1;
                int GLF_live13res1 = (GLF_live13icoord.x * GLF_live13icoord.y >> 9) & 1;
                GLF_live13_GLF_color = vec4(float(GLF_live13res1 ^ GLF_live13res2), float(GLF_live13res2 & GLF_live13res3), float(GLF_live13res1 | GLF_live13res3), 1.0);
            }
        }
    }
    c.z = c.x + c.y;
    {
        vec2 GLF_live13coord = _GLF_FUZZED((float(66653) * vec2(23.98, -9710.6210)));
        {
            uvec2 GLF_live13icoord = uvec2(((GLF_live13coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
            uint GLF_live13res1 = uint(((GLF_live13icoord.x * GLF_live13icoord.y) >> (GLF_live13icoord.x & 31u)) & 0xffffffffu);
            uint GLF_live13res2 = uint(((GLF_live13icoord.x * GLF_live13icoord.y) << (GLF_live13icoord.x & 31u)) & 0xffffffffu);
            float GLF_live13res = float(((GLF_live13res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_live13res1 & 1u) != 0u ? 1u : 0u));
            GLF_live13_GLF_color = vec4(GLF_live13res, GLF_live13res, GLF_live13res, 1.0);
        }
    }
    {
        if (_GLF_DEAD(false)) {
            int donor_replacementGLF_dead10count = _GLF_FUZZED(-47178);
            int donor_replacementGLF_dead10v = _GLF_FUZZED(findLSB((123304u + 171012u)));
            while (donor_replacementGLF_dead10v > 1) {
                if ((donor_replacementGLF_dead10v & 1) == 1) {
                    donor_replacementGLF_dead10v = 3 * donor_replacementGLF_dead10v + 1;
                    {
                        int GLF_live15c = _GLF_FUZZED(45121);
                        uint GLF_live15matrix_number = _GLF_FUZZED((49273u * 152866u));
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = vec4(6761.2651, 76.39, 7853.2602, -8.9);
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                        int GLF_live15rows = _GLF_FUZZED(int(false));
                        {
                            int GLF_live15looplimiter0 = 0;
                            for (int GLF_live15r = 0; GLF_live15r < GLF_live15rows; GLF_live15r++) {
                                if (GLF_live15looplimiter0 >= 4) {
                                    break;
                                }
                                GLF_live15looplimiter0++;
                                {
                                    switch (GLF_live15matrix_number) {
                                        case 0u:
                                            GLF_live15m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live15r, 2)] = _GLF_IDENTITY(GLF_live15one, 1.0 * (GLF_live15one));
                                            break;
                                        case 1u:
                                            GLF_live15m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live15r, 3)] = GLF_live15one;
                                            break;
                                        case 2u:
                                            GLF_live15m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live15r, 4)] = GLF_live15one;
                                            break;
                                        case 3u:
                                            GLF_live15m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live15r, 2)] = GLF_live15one;
                                            break;
                                        case 4u:
                                            GLF_live15m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live15r, 3)] = GLF_live15one;
                                            break;
                                        case 5u:
                                            GLF_live15m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live15r, 4)] = GLF_live15one;
                                            break;
                                        case 6u:
                                            GLF_live15m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live15r, 2)] = GLF_live15one;
                                            break;
                                        case 7u:
                                            GLF_live15m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live15r, 3)] = GLF_live15one;
                                            break;
                                        case 8u:
                                            {
                                                vec4 _GLF_outVarBackup_GLF_color;
                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                _GLF_color = vec4(1.5, 8.1, -625.458, 7335.9482);
                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                }
                                            }
                                            GLF_live15m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live15r, 4)] = GLF_live15one;
                                            break;
                                    }
                                }
                            }
                        }
                    }
                } else {
                    _GLF_IDENTITY(donor_replacementGLF_dead10v /= 2, (donor_replacementGLF_dead10v /= 2) ^ int(_GLF_ZERO(0.0, injectionSwitch.x)));
                }
                donor_replacementGLF_dead10count++;
            }
        }
        {
            GLF_live7_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
        }
        if (_GLF_DEAD(false)) {
            return;
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = ldexp(vec4(-0.3, 302.978, 443.318, 0.7), ivec4(79691, -80811, 53395, -65815));
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(vec2(-1016.9469, -336.393), refract(smoothstep(-9.3, 8920.0646, 999.317), 3911.1535, dFdyFine(141.992)), 2.8);
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            vec2 donor_replacementGLF_dead8coord = _GLF_FUZZED(normalize(injectionSwitch));
            float donor_replacementGLF_dead8h = _GLF_FUZZED(dFdxCoarse(ref));
            int donor_replacementGLF_dead8i = _GLF_FUZZED(8710);
            float donor_replacementGLF_dead8refh = _GLF_FUZZED(dot(dFdxCoarse(GLF_live7_GLF_color), vec4(23.84, 7.4, -25.04, -3525.4927)));
            vec2 donor_replacementGLF_dead8uvstep = _GLF_FUZZED(cosh((mat2(3.0, 6.6, 631.449, -51.28) * acosh(vec2(-677.270, _GLF_IDENTITY(-7151.7909, (-7151.7909) * cos(0.0)))))));
            while (donor_replacementGLF_dead8h < donor_replacementGLF_dead8refh && donor_replacementGLF_dead8i < 32) {
                {
                    vec2 GLF_live13coord = _GLF_FUZZED(vec2(-5.5, -942.292));
                    {
                        ivec2 GLF_live13icoord = ivec2(((GLF_live13coord - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                        int GLF_live13res3 = ((GLF_live13icoord.x >> 5) & 1) ^ ((GLF_live13icoord.y & 32) >> 5);
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = vec4(-8.3, 0.5, -4.6, 0.9);
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                        int GLF_live13res2 = (GLF_live13icoord.y * GLF_live13icoord.y >> 10) & 1;
                        int GLF_live13res1 = (GLF_live13icoord.x * GLF_live13icoord.y >> 9) & 1;
                        GLF_live13_GLF_color = vec4(float(_GLF_IDENTITY(GLF_live13res1, (GLF_live13res1) | (GLF_live13res1)) ^ GLF_live13res2), float(GLF_live13res2 & GLF_live13res3), float(GLF_live13res1 | GLF_live13res3), 1.0);
                    }
                }
                donor_replacementGLF_dead8coord -= donor_replacementGLF_dead8uvstep;
                if (_GLF_WRAPPED_IF_FALSE(_GLF_IDENTITY(false, bool(bvec3(false, false, true))))) {
                } else {
                    donor_replacementGLF_dead8refh += ref;
                }
                donor_replacementGLF_dead8h = texture(GLF_dead8tex, donor_replacementGLF_dead8coord).y;
                donor_replacementGLF_dead8i++;
            }
        }
    }
    for (int _injected_loop_counter = int(_GLF_ONE(1.0, injectionSwitch.y)); _GLF_WRAPPED_LOOP(_injected_loop_counter != (0 >> _GLF_IDENTITY(int(3), int(3)))); _injected_loop_counter--) {
        {
            int GLF_live15cols = _GLF_FUZZED((85259));
            int GLF_live15looplimiter1 = 0;
            uint GLF_live15matrix_number = _GLF_FUZZED(((121612u <= 171817u) ? ((+129322u) + (+123214u)) : 40008u));
            int GLF_live15rows = _GLF_FUZZED(8881);
            for (int GLF_live15c = 0; GLF_live15c < GLF_live15cols; GLF_live15c++) {
                if (GLF_live15looplimiter1 >= 4) {
                    break;
                }
                GLF_live15looplimiter1++;
                {
                    {
                        int GLF_live15looplimiter0 = 0;
                        for (int GLF_live15r = 0; GLF_live15r < GLF_live15rows; _GLF_IDENTITY(GLF_live15r++, (GLF_live15r++) / 1)) {
                            if (GLF_live15looplimiter0 >= 4) {
                                break;
                            }
                            GLF_live15looplimiter0++;
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = radians((vec4(9.5, -3.0, 8424.9872, -332.888) + (-5.0)));
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                            {
                                switch (GLF_live15matrix_number) {
                                    case 0u:
                                        GLF_live15m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live15r, 2)] = GLF_live15one;
                                        break;
                                    case 1u:
                                        GLF_live15m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live15r, 3)] = GLF_live15one;
                                        break;
                                    case 2u:
                                        GLF_live15m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live15r, 4)] = GLF_live15one;
                                        break;
                                    case 3u:
                                        GLF_live15m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live15r, 2)] = GLF_live15one;
                                        break;
                                    case 4u:
                                        GLF_live15m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live15r, 3)] = GLF_live15one;
                                        break;
                                    case 5u:
                                        GLF_live15m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live15r, 4)] = GLF_live15one;
                                        break;
                                        {
                                            vec4 _GLF_outVarBackup_GLF_color;
                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                            _GLF_color = vec4(-714.904, 1835.0759, -4.0, -102.243);
                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                            }
                                        }
                                    case 6u:
                                        GLF_live15m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live15r, 2)] = GLF_live15one;
                                        break;
                                    case 7u:
                                        _GLF_IDENTITY(GLF_live15m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live15r, 3)] = GLF_live15one, 0.0 + (GLF_live15m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live15r, 3)] = GLF_live15one));
                                        break;
                                    case 8u:
                                        GLF_live15m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live15r, 4)] = GLF_live15one;
                                        break;
                                }
                            }
                        }
                    }
                }
            }
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            return;
        }
    }
    int i = bitfieldReverse(bitfieldExtract(0, 0, 0));
    GLF_merged2_0_1_1_1_1_4imsb8.x = i;
    do {
        for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < (0 ^ 1)); _injected_loop_counter++) {
            {
                vec2 GLF_live13coord = _GLF_FUZZED(vec2(65.90, -81.08));
                {
                    uvec2 GLF_live13icoord = uvec2(((GLF_live13coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                    uint GLF_live13res1 = uint(((GLF_live13icoord.x * GLF_live13icoord.y) >> (GLF_live13icoord.x & 31u)) & 0xffffffffu);
                    uint GLF_live13res2 = uint(((GLF_live13icoord.x * GLF_live13icoord.y) << (GLF_live13icoord.x & 31u)) & 0xffffffffu);
                    float GLF_live13res = float(((GLF_live13res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_live13res1 & 1u) != 0u ? 1u : 0u));
                    GLF_live13_GLF_color = vec4(GLF_live13res, GLF_live13res, GLF_live13res, 1.0);
                }
            }
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(6.5, -97.40, 1.4, 2981.9261);
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            if (c[GLF_merged2_0_1_1_1_1_4imsb8.x] >= 1.0) {
                if (_GLF_WRAPPED_IF_FALSE(false)) {
                } else {
                    c[GLF_merged2_0_1_1_1_1_4imsb8.x] = _GLF_IDENTITY(c[GLF_merged2_0_1_1_1_1_4imsb8.x] * c[GLF_merged2_0_1_1_1_1_4imsb8.x], mix(float(_GLF_FUZZED(4970.4148)), float(c[GLF_merged2_0_1_1_1_1_4imsb8.x] * c[GLF_merged2_0_1_1_1_1_4imsb8.x]), bool(true)));
                }
                if (_GLF_DEAD(_GLF_IDENTITY(false, bool(_GLF_IDENTITY(bvec3(false, false, false), bvec3(bvec3(bvec3(false, false, false)))))))) {
                    discard;
                }
            }
        }
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = dFdyCoarse(vec4(-97.51, 1731.8219, 727.570, -3076.1377));
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                GLF_merged2_0_1_1_1_1_4imsb8.x++;
            }
        } else {
        }
        {
            vec2 GLF_live13coord = _GLF_FUZZED((mat3x2(8555.6040, -9932.6937, -1.6, -78.16, -5509.4790, 63.80) * vec3(2422.4871, 5318.7021, -992.070)));
            {
                if (GLF_live13coord.y < 0.6) {
                    uvec2 GLF_live13icoord = uvec2(((GLF_live13coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                    uint GLF_live13res1 = uint(((GLF_live13icoord.x * GLF_live13icoord.y) >> (GLF_live13icoord.x & 31u)) & 0xffffffffu);
                    uint GLF_live13res2 = uint(((GLF_live13icoord.x * GLF_live13icoord.y) << (GLF_live13icoord.x & 31u)) & 0xffffffffu);
                    float GLF_live13res = float(((GLF_live13res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_live13res1 & 1u) != 0u ? 1u : 0u));
                    GLF_live13_GLF_color = vec4(GLF_live13res, GLF_live13res, GLF_live13res, 1.0);
                } else {
                    ivec2 GLF_live13icoord = ivec2(((GLF_live13coord - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                    int GLF_live13res3 = ((_GLF_IDENTITY(GLF_live13icoord, ivec2(0, 0) | (GLF_live13icoord)).x >> 5) & 1) ^ ((GLF_live13icoord.y & 32) >> 5);
                    int GLF_live13res2 = _GLF_IDENTITY((GLF_live13icoord.y * _GLF_IDENTITY(GLF_live13icoord, clamp(GLF_live13icoord, GLF_live13icoord, GLF_live13icoord)).y >> 10) & 1, ((GLF_live13icoord.y * _GLF_IDENTITY(GLF_live13icoord, clamp(GLF_live13icoord, GLF_live13icoord, GLF_live13icoord)).y >> 10) & 1) | ((GLF_live13icoord.y * _GLF_IDENTITY(GLF_live13icoord, clamp(GLF_live13icoord, GLF_live13icoord, GLF_live13icoord)).y >> 10) & 1));
                    int GLF_live13res1 = _GLF_IDENTITY((GLF_live13icoord.x * GLF_live13icoord.y >> 9), ~(~(_GLF_IDENTITY((GLF_live13icoord.x * GLF_live13icoord.y >> 9), ((GLF_live13icoord.x * GLF_live13icoord.y >> 9)) / 1)))) & 1;
                    GLF_live13_GLF_color = vec4(float(GLF_live13res1 ^ GLF_live13res2), float(GLF_live13res2 & GLF_live13res3), float(GLF_live13res1 | GLF_live13res3), 1.0);
                }
            }
        }
    } while (_GLF_IDENTITY(GLF_merged2_0_1_1_1_1_4imsb8.x < _GLF_IDENTITY(findMSB(_GLF_IDENTITY(findLSB(GLF_merged2_0_1_1_1_1_4imsb8.y), (false ? _GLF_FUZZED(max(sign(msb8), i)) : _GLF_IDENTITY(findLSB(GLF_merged2_0_1_1_1_1_4imsb8.y), (findLSB(GLF_merged2_0_1_1_1_1_4imsb8.y)) | (findLSB(GLF_merged2_0_1_1_1_1_4imsb8.y)))))), 0 ^ (findMSB(_GLF_IDENTITY(findLSB(GLF_merged2_0_1_1_1_1_4imsb8.y), (false ? _GLF_FUZZED(max(sign(msb8), i)) : _GLF_IDENTITY(findLSB(GLF_merged2_0_1_1_1_1_4imsb8.y), (findLSB(GLF_merged2_0_1_1_1_1_4imsb8.y)) | (findLSB(GLF_merged2_0_1_1_1_1_4imsb8.y)))))))), !(_GLF_IDENTITY(!(_GLF_IDENTITY(GLF_merged2_0_1_1_1_1_4imsb8.x < _GLF_IDENTITY(findMSB(_GLF_IDENTITY(findLSB(GLF_merged2_0_1_1_1_1_4imsb8.y), (false ? _GLF_FUZZED(max(sign(msb8), i)) : _GLF_IDENTITY(findLSB(GLF_merged2_0_1_1_1_1_4imsb8.y), (findLSB(GLF_merged2_0_1_1_1_1_4imsb8.y)) | (findLSB(GLF_merged2_0_1_1_1_1_4imsb8.y)))))), 0 ^ (findMSB(_GLF_IDENTITY(findLSB(GLF_merged2_0_1_1_1_1_4imsb8.y), (false ? _GLF_FUZZED(max(sign(msb8), i)) : _GLF_IDENTITY(findLSB(GLF_merged2_0_1_1_1_1_4imsb8.y), (findLSB(GLF_merged2_0_1_1_1_1_4imsb8.y)) | (findLSB(GLF_merged2_0_1_1_1_1_4imsb8.y)))))))), bool(bool(GLF_merged2_0_1_1_1_1_4imsb8.x < _GLF_IDENTITY(findMSB(_GLF_IDENTITY(findLSB(GLF_merged2_0_1_1_1_1_4imsb8.y), (false ? _GLF_FUZZED(max(sign(msb8), i)) : _GLF_IDENTITY(findLSB(GLF_merged2_0_1_1_1_1_4imsb8.y), (findLSB(GLF_merged2_0_1_1_1_1_4imsb8.y)) | (findLSB(GLF_merged2_0_1_1_1_1_4imsb8.y)))))), 0 ^ (findMSB(_GLF_IDENTITY(findLSB(GLF_merged2_0_1_1_1_1_4imsb8.y), (false ? _GLF_FUZZED(max(sign(msb8), i)) : _GLF_IDENTITY(findLSB(GLF_merged2_0_1_1_1_1_4imsb8.y), (findLSB(GLF_merged2_0_1_1_1_1_4imsb8.y)) | (findLSB(GLF_merged2_0_1_1_1_1_4imsb8.y)))))))))))), !(!(!(_GLF_IDENTITY(GLF_merged2_0_1_1_1_1_4imsb8.x < _GLF_IDENTITY(findMSB(_GLF_IDENTITY(findLSB(GLF_merged2_0_1_1_1_1_4imsb8.y), (false ? _GLF_FUZZED(max(sign(msb8), i)) : _GLF_IDENTITY(findLSB(GLF_merged2_0_1_1_1_1_4imsb8.y), (findLSB(GLF_merged2_0_1_1_1_1_4imsb8.y)) | (findLSB(GLF_merged2_0_1_1_1_1_4imsb8.y)))))), 0 ^ (findMSB(_GLF_IDENTITY(findLSB(GLF_merged2_0_1_1_1_1_4imsb8.y), (false ? _GLF_FUZZED(max(sign(msb8), i)) : _GLF_IDENTITY(findLSB(GLF_merged2_0_1_1_1_1_4imsb8.y), (findLSB(GLF_merged2_0_1_1_1_1_4imsb8.y)) | (findLSB(GLF_merged2_0_1_1_1_1_4imsb8.y)))))))), bool(bool(GLF_merged2_0_1_1_1_1_4imsb8.x < _GLF_IDENTITY(findMSB(_GLF_IDENTITY(findLSB(GLF_merged2_0_1_1_1_1_4imsb8.y), (false ? _GLF_FUZZED(max(sign(msb8), i)) : _GLF_IDENTITY(findLSB(GLF_merged2_0_1_1_1_1_4imsb8.y), (findLSB(GLF_merged2_0_1_1_1_1_4imsb8.y)) | (findLSB(GLF_merged2_0_1_1_1_1_4imsb8.y)))))), 0 ^ (findMSB(_GLF_IDENTITY(findLSB(GLF_merged2_0_1_1_1_1_4imsb8.y), (false ? _GLF_FUZZED(max(sign(msb8), i)) : _GLF_IDENTITY(findLSB(GLF_merged2_0_1_1_1_1_4imsb8.y), (findLSB(GLF_merged2_0_1_1_1_1_4imsb8.y)) | (findLSB(GLF_merged2_0_1_1_1_1_4imsb8.y))))))))))))))))));
    c.x = mod(c.x, 1.0);
    c.y = mod(c.y, 1.0);
    c.z = mod(c.z, 1.0);
    if (_GLF_DEAD(false)) {
        return;
    }
    _GLF_color = c;
    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
        return;
        {
            vec4 _GLF_outVarBackup_GLF_color;
            if (_GLF_WRAPPED_IF_FALSE(false)) {
            } else {
                _GLF_outVarBackup_GLF_color = _GLF_color;
            }
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                _GLF_color = vec4(-416.340, 79.97, -2556.5490, 3.7);
            } else {
            }
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
            if (_GLF_DEAD(false)) {
                int donor_replacementGLF_dead10count = _GLF_FUZZED((+i));
                int donor_replacementGLF_dead10v = _GLF_FUZZED(-40456);
                {
                    vec2 GLF_live13coord = _GLF_FUZZED(((-vec2(8.3, -_GLF_IDENTITY(6.1, float(_GLF_IDENTITY(mat3x4(_GLF_IDENTITY(6.1, (6.1) - 0.0), 0.0, determinant(mat2(1.0, 0.0, 0.0, 1.0)), 0.0, 1.0, 1.0, 0.0, 0.0, 0.0, 1.0, tan(_GLF_ZERO(0.0, injectionSwitch.x)), 0.0), (mat3x4(_GLF_IDENTITY(6.1, (6.1) - 0.0), 0.0, determinant(mat2(1.0, 0.0, 0.0, 1.0)), 0.0, 1.0, 1.0, 0.0, 0.0, 0.0, 1.0, tan(_GLF_ZERO(0.0, injectionSwitch.x)), 0.0)) + mat3x4(0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0)))))) + (-56.27)));
                    {
                        ivec2 GLF_live13icoord = ivec2(((GLF_live13coord - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                        int GLF_live13res3 = ((GLF_live13icoord.x >> 5) & 1) ^ ((GLF_live13icoord.y & 32) >> 5);
                        int GLF_live13res2 = (GLF_live13icoord.y * GLF_live13icoord.y >> 10) & 1;
                        int GLF_live13res1 = (GLF_live13icoord.x * GLF_live13icoord.y >> 9) & 1;
                        GLF_live13_GLF_color = vec4(float(GLF_live13res1 ^ GLF_live13res2), float(GLF_live13res2 & GLF_live13res3), float(GLF_live13res1 | GLF_live13res3), 1.0);
                    }
                }
                while (donor_replacementGLF_dead10v > 1) {
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        {
                            int GLF_live14looplimiter2 = 0;
                            if (GLF_live14looplimiter2 >= 6) {
                                ;
                            }
                        }
                        _GLF_color = vec4(813.973, 781.195, -9.7, 1289.1936);
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= sqrt(0.0))))) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(-115.717, reflect((6.0 + 1.1), -7.5), vec2(-96.09, -5.9));
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    if ((donor_replacementGLF_dead10v & 1) == 1) {
                        donor_replacementGLF_dead10v = 3 * donor_replacementGLF_dead10v + 1;
                    } else {
                        donor_replacementGLF_dead10v /= 2;
                    }
                    donor_replacementGLF_dead10count++;
                    {
                        vec2 GLF_live13coord = _GLF_FUZZED(vec2(-31.54, 18.70));
                        {
                            ivec2 GLF_live13icoord = ivec2(((GLF_live13coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.6, 1.0)) * 256.0);
                            int GLF_live13v = (GLF_live13icoord.x ^ GLF_live13icoord.y) * GLF_live13icoord.y;
                            bool GLF_live13res1 = ((GLF_live13v >> 10) & 1) != 0;
                            bool GLF_live13res2 = ((GLF_live13v >> 11) & 4) != _GLF_IDENTITY(0, min(0, 0));
                            bool GLF_live13res3 = ((GLF_live13v >> 12) & 8) != 0;
                            GLF_live13_GLF_color = vec4(GLF_live13res1 ? 1.0 : 0.0, GLF_live13res2 ? 1.0 : 0.0, _GLF_IDENTITY(GLF_live13res3, _GLF_IDENTITY(bool(_GLF_IDENTITY(bvec2(GLF_live13res3, true), bvec2(bvec2(bvec2(GLF_live13res3, true))))), !(!(bool(_GLF_IDENTITY(bvec2(GLF_live13res3, true), bvec2(bvec2(bvec2(GLF_live13res3, true))))))))) ? 1.0 : 0.0, _GLF_IDENTITY(1, _GLF_IDENTITY(int(_GLF_IDENTITY(int(1), (int(1)) >> int(_GLF_ZERO(0.0, injectionSwitch.x)))), (_GLF_IDENTITY(int(_GLF_IDENTITY(int(1), (int(1)) >> int(_GLF_ZERO(0.0, injectionSwitch.x)))), min(int(_GLF_IDENTITY(int(1), (int(1)) >> int(_GLF_ZERO(0.0, injectionSwitch.x)))), int(_GLF_IDENTITY(int(1), (int(1)) >> int(_GLF_ZERO(0.0, injectionSwitch.x))))))) | (int(_GLF_IDENTITY(int(1), (int(1)) >> int(_GLF_ZERO(0.0, injectionSwitch.x))))))));
                        }
                    }
                }
            }
        } else {
        }
    }
    if (_GLF_WRAPPED_IF_TRUE(true)) {
        if (_GLF_IDENTITY(_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))), bool(bvec2(_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))), true)))) {
            {
                {
                    ;
                }
            }
            bool donor_replacementGLF_dead0c4 = _GLF_FUZZED((mat4x3(-345.029, -_GLF_IDENTITY(1.0, clamp(1.0, _GLF_IDENTITY(1.0, mix(float(1.0), float(_GLF_FUZZED(237.281)), bool(false))), _GLF_IDENTITY(1.0, max(1.0, 1.0)))), _GLF_IDENTITY(75.07, min(_GLF_IDENTITY(75.07, float(mat2x4(_GLF_IDENTITY(75.07, (75.07) / 1.0), 1.0, 1.0, _GLF_IDENTITY(0.0, (_GLF_IDENTITY(0.0, (0.0) + 0.0)) * 1.0), 0.0, _GLF_IDENTITY(0.0, 1.0 * (0.0)), 0.0, 1.0))), _GLF_IDENTITY(75.07, (false ? _GLF_FUZZED(ref) : 75.07)))), 9.8, 5.0, 4.5, 31.25, 7820.4637, 34.83, 1.7, -81.60, -817.537) == (mat4x3(-6.1, -610.016, -6.5, 6.3, -3341.8603, 7338.9504, -6.9, 4093.8469, 7.5, -5817.3407, 9271.1760, -9938.2009) / sinh(ref))));
            do {
                {
                    vec2 GLF_live13coord = _GLF_FUZZED((0.7 * vec2(-9.0, -6584.1951)));
                    {
                        ivec2 GLF_live13icoord = ivec2(((GLF_live13coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.6, 1.0)) * 256.0);
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = vec4(-4.7, 5.2, 9754.3124, 25.56);
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                        int GLF_live13v = (GLF_live13icoord.x ^ GLF_live13icoord.y) * GLF_live13icoord.y;
                        bool GLF_live13res1 = ((GLF_live13v >> 10) & 1) != 0;
                        bool GLF_live13res2 = ((GLF_live13v >> 11) & 4) != 0;
                        bool GLF_live13res3 = ((GLF_live13v >> 12) & 8) != 0;
                        GLF_live13_GLF_color = vec4(GLF_live13res1 ? 1.0 : 0.0, GLF_live13res2 ? 1.0 : 0.0, GLF_live13res3 ? 1.0 : 0.0, 1);
                    }
                }
                if (!donor_replacementGLF_dead0c4) {
                    ;
                    for (int _injected_loop_counter = int(_GLF_ONE(1.0, injectionSwitch.y)); _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < tan(0.0))))) {
                            bool donor_replacementGLF_dead9c2 = _GLF_FUZZED(bool(atan(ref)));
                            if (!donor_replacementGLF_dead9c2) {
                                ;
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = vec4(-20.18, -1284.1779, -773.590, 817.657);
                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                            }
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = vec4(5.8, -92.51, -5.8, -4.9);
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                        }
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_IDENTITY(_GLF_color, (false ? _GLF_FUZZED(GLF_live7_GLF_color) : _GLF_color));
                        _GLF_color = (vec4(0.7, 4837.1550, 5879.8242, 7.0).x + vec4(9424.6433, -4.2, -4163.4626, -0.3));
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = vec4(3245.3528, -4596.7189, 9.0, 1392.9210);
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                        }
                    }
                    if (_GLF_IDENTITY(_GLF_DEAD(false), true && (_GLF_IDENTITY(_GLF_DEAD(false), !(!(_GLF_DEAD(false))))))) {
                        return;
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                            return;
                        }
                    }
                }
            } while (_GLF_WRAPPED_LOOP(false));
        }
    } else {
    }
    {
        int GLF_live6i = _GLF_FUZZED(-29314);
        vec2 GLF_live6pos = _GLF_FUZZED((vec2(9305.5817, 90.96) * 12.48));
        vec4 GLF_live6res = _GLF_FUZZED(vec4(vec2(869.073, 6.2), ((-1.9) - 55.35), -33.81));
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            {
                int GLF_live15looplimiter2 = 0;
                if (GLF_live15looplimiter2 >= 4) {
                    ;
                }
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(-2.8, 1841.4427, -929.184, 70.09);
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
            }
            return;
        }
        for (int _injected_loop_counter = (0 >> _GLF_IDENTITY(int(1), _GLF_IDENTITY(int(1), (int(1)) | (_GLF_IDENTITY(int(1), (int(1)) | (int(1))))))); _GLF_WRAPPED_LOOP(_injected_loop_counter < _GLF_IDENTITY(1, (_GLF_IDENTITY(1, max(1, _GLF_IDENTITY(1, (_GLF_IDENTITY(1, (1) / 1)) / 1)))) - 0)); _injected_loop_counter++) {
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = uintBitsToFloat((_GLF_IDENTITY(uvec4(153167u, 46374u, 12889u, 94647u) + uvec4(41099u, 135079u, 66989u, 32810u), max(_GLF_IDENTITY(uvec4(153167u, 46374u, 12889u, 94647u) + uvec4(41099u, 135079u, 66989u, 32810u), (_GLF_IDENTITY(uvec4(153167u, 46374u, 12889u, 94647u) + uvec4(41099u, 135079u, 66989u, 32810u), uvec4(0u, 0u, 0u, 0u) | (uvec4(153167u, 46374u, 12889u, 94647u) + uvec4(41099u, 135079u, 66989u, 32810u)))) ^ uvec4(0u, 0u, 0u, 0u)), uvec4(153167u, 46374u, 12889u, 94647u) + uvec4(41099u, 135079u, 66989u, 32810u)))));
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                    if (_GLF_DEAD(false)) {
                        return;
                        {
                            vec2 GLF_live13coord = _GLF_FUZZED((-vec2(-6.0, 406.267)));
                            {
                                if (GLF_live13coord.y < 0.6) {
                                    uvec2 GLF_live13icoord = uvec2(((GLF_live13coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                                    uint GLF_live13res1 = uint(((GLF_live13icoord.x * GLF_live13icoord.y) >> (GLF_live13icoord.x & 31u)) & 0xffffffffu);
                                    uint GLF_live13res2 = uint(((GLF_live13icoord.x * GLF_live13icoord.y) << (_GLF_IDENTITY(GLF_live13icoord, uvec2(0u, 0u) + (GLF_live13icoord)).x & 31u)) & 0xffffffffu);
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        _GLF_color = vec4(-6057.6032, -89.68, 29.36, -9952.9890);
                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                    }
                                    float GLF_live13res = float(((GLF_live13res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_live13res1 & 1u) != 0u ? 1u : 0u));
                                    GLF_live13_GLF_color = vec4(GLF_live13res, GLF_live13res, GLF_live13res, 1.0);
                                } else {
                                    ivec2 GLF_live13icoord = ivec2(((_GLF_IDENTITY(GLF_live13coord - vec2(0.4, 0.6), mix(vec2(_GLF_FUZZED((+(-37.55))), _GLF_FUZZED(-2898.5089)), vec2((GLF_live13coord - vec2(0.4, 0.6))[0], (GLF_live13coord - vec2(0.4, 0.6))[1]), bvec2(true, true)))) * _GLF_IDENTITY(vec2(1.0 / 0.4, 1.0 / 0.4), (vec2(1.0 / 0.4, 1.0 / 0.4)) - vec2(0.0, 0.0))) * 256.0);
                                    int GLF_live13res3 = ((GLF_live13icoord.x >> 5) & 1) ^ ((GLF_live13icoord.y & 32) >> 5);
                                    int GLF_live13res2 = (GLF_live13icoord.y * GLF_live13icoord.y >> 10) & 1;
                                    int GLF_live13res1 = (_GLF_IDENTITY(GLF_live13icoord.x, ~(~(GLF_live13icoord.x))) * GLF_live13icoord.y >> 9) & 1;
                                    GLF_live13_GLF_color = vec4(float(GLF_live13res1 ^ GLF_live13res2), float(GLF_live13res2 & GLF_live13res3), float(GLF_live13res1 | GLF_live13res3), 1.0);
                                }
                            }
                        }
                    }
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(8.4, 8036.3319, -8.5, -188.351);
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                }
            }
            if (GLF_live6collision(GLF_live6pos, GLF_live6picdata[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6i, _GLF_IDENTITY(8, (8) ^ (0 << _GLF_IDENTITY(int(5), int(5)))))])) {
                {
                    vec2 GLF_live13coord = _GLF_FUZZED((-vec2(545.950)));
                    {
                        ivec2 GLF_live13icoord = ivec2(((GLF_live13coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.6, 1.0)) * 256.0);
                        int GLF_live13v = (GLF_live13icoord.x ^ GLF_live13icoord.y) * GLF_live13icoord.y;
                        bool GLF_live13res1 = ((GLF_live13v >> 10) & 1) != 0;
                        bool GLF_live13res2 = ((GLF_live13v >> 11) & 4) != 0;
                        bool GLF_live13res3 = ((GLF_live13v >> 12) & 8) != 0;
                        GLF_live13_GLF_color = vec4(GLF_live13res1 ? 1.0 : 0.0, GLF_live13res2 ? 1.0 : 0.0, _GLF_IDENTITY(GLF_live13res3, _GLF_FALSE(false, (gl_FragCoord.x < 0.0)) || (GLF_live13res3)) ? 1.0 : 0.0, 1);
                    }
                }
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = mod(reflect(vec4(-6473.6882, -8.7, 1.0, -1.8), vec4(5.3, -9335.4422, -7.8, -26.76)), 902.338);
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                for (int _injected_loop_counter = (1 & int(_GLF_ONE(1.0, injectionSwitch.y))); _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
                    GLF_live6res = GLF_live6pal[_GLF_MAKE_IN_BOUNDS_INT((int(GLF_live6picdata[_GLF_MAKE_IN_BOUNDS_INT(_GLF_IDENTITY(GLF_live6i, (((1 | 0) << _GLF_IDENTITY(int(6), int(_GLF_IDENTITY(6, (6) | (76284 & 0))))) >> _GLF_IDENTITY(int(6), int(6))) * (_GLF_IDENTITY(GLF_live6i, 1 * (GLF_live6i)))), 8)].x) * int(GLF_live6picdata[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6i, 8)].y) + GLF_live6i * 9 + 11) % 16, 16)];
                }
            }
        }
    }
}
