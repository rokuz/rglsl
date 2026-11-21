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
int GLF_live10msb8 = 256;
vec4 GLF_live8_GLF_color = _GLF_FUZZED((vec4(908.978, 77.24, -735.573, -1.4) * ((-1778.8769) * vec4(-7460.9530, 7465.5944, 945.905, -1.3))));

struct _GLF_struct_17 {
    vec4 _f0;
};

struct _GLF_struct_16 {
    ivec2 _f0;
    ivec3 _f1;
};

struct _GLF_struct_15 {
    bvec4 _f0;
    _GLF_struct_16 _f1;
    float _f2;
    float GLF_live5y;
    float _f3;
};

struct _GLF_struct_14 {
    bvec2 _f0;
    mat2x3 _f1;
    mat2x4 _f2;
    mat4 _f3;
};

struct _GLF_struct_13 {
    ivec3 _f0;
    _GLF_struct_14 _f1;
    mat3x2 _f2;
    mat2x4 _f3;
};

struct _GLF_struct_12 {
    mat3 _f0;
    _GLF_struct_13 _f1;
    _GLF_struct_15 _f2;
    _GLF_struct_17 _f3;
    mat4x2 _f4;
    vec3 _f5;
    uvec3 _f6;
};

struct _GLF_struct_18 {
    mat3x4 _f0;
    vec2 GLF_live3pos;
    mat4x2 _f1;
    vec4 _f2;
};

struct _GLF_struct_19 {
    mat4x2 _f0;
    ivec2 _f1;
    float GLF_live1x;
};

struct _GLF_struct_22 {
    ivec3 _f0;
    mat4 _f1;
    ivec2 _f2;
    float _f3;
};

struct _GLF_struct_21 {
    uint _f0;
    int GLF_live6looplimiter0;
    mat2x4 _f1;
    float _f2;
    bvec3 _f3;
    _GLF_struct_22 _f4;
};

struct _GLF_struct_20 {
    bool _f0;
    mat4x2 _f1;
    ivec4 _f2;
    _GLF_struct_21 _f3;
};

struct _GLF_struct_25 {
    bool _f0;
    mat2 _f1;
};

struct _GLF_struct_24 {
    bvec2 _f0;
    _GLF_struct_25 _f1;
};

struct _GLF_struct_23 {
    mat4x3 _f0;
    vec4 GLF_live6quad;
    mat3x2 _f1;
    _GLF_struct_24 _f2;
    vec4 _f3;
    uvec2 _f4;
    mat3 _f5;
};

layout(set = 0, binding = 1) uniform buf1 {
    vec2 GLF_live5resolution;
};

const int GLF_live7dp[256] = int[256](115, 133, 150, 164, 176, 184, 190, 192, 191, 187, 181, 172, 163, 153, 143, 134, 126, 120, 116, 114, 114, 117, 121, 127, 134, 141, 148, 154, 159, 162, 163, 161, 157, 151, 143, 134, 124, 113, 103, 94, 87, 82, 79, 80, 84, 91, 101, 114, 130, 146, 164, 182, 199, 215, 229, 240, 249, 254, 256, 254, 250, 243, 233, 223, 212, 200, 190, 180, 172, 166, 163, 161, 162, 164, 169, 174, 179, 185, 190, 193, 195, 195, 192, 188, 180, 171, 161, 149, 137, 125, 114, 105, 97, 93, 91, 93, 98, 106, 117, 130, 145, 161, 177, 193, 208, 221, 231, 239, 243, 244, 242, 236, 228, 218, 207, 194, 181, 169, 158, 148, 141, 135, 132, 131, 132, 135, 138, 143, 147, 151, 154, 155, 155, 152, 146, 139, 129, 118, 106, 93, 80, 68, 58, 49, 43, 40, 41, 44, 51, 61, 73, 87, 103, 119, 134, 149, 162, 173, 181, 186, 188, 186, 181, 174, 164, 153, 141, 128, 116, 104, 94, 86, 81, 77, 76, 77, 80, 84, 89, 94, 98, 102, 104, 104, 102, 98, 92, 83, 73, 62, 50, 38, 26, 16, 8, 2, 0, 0, 4, 11, 21, 33, 48, 64, 81, 98, 114, 129, 141, 151, 158, 161, 161, 158, 152, 144, 134, 123, 112, 100, 90, 81, 73, 68, 65, 65, 67, 70, 75, 81, 87, 92, 97, 101, 103, 102, 100, 95, 88, 79, 69, 58, 47, 36, 26, 18, 13, 11, 11, 15, 22, 32, 45, 60, 77, 94);
const vec4 GLF_live6pal[16] = vec4[16](vec4(0.0, 0.0, 0.0, 1.0), vec4(0.5, 0.0, 0.0, 1.0), vec4(0.0, 0.5, 0.0, 1.0), vec4(0.5, 0.5, 0.0, 1.0), vec4(0.0, 0.0, 0.5, 1.0), vec4(0.5, 0.0, 0.5, 1.0), vec4(0.0, 0.5, 0.5, 1.0), vec4(0.5, 0.5, 0.5, 1.0), vec4(0.0, 0.0, 0.0, 1.0), vec4(1.0, 0.0, 0.0, 1.0), vec4(0.0, 1.0, 0.0, 1.0), vec4(1.0, 1.0, 0.0, 1.0), vec4(0.0, 0.0, 1.0, 1.0), vec4(1.0, 0.0, 1.0, 1.0), vec4(0.0, 1.0, 1.0, 1.0), vec4(1.0, 1.0, 1.0, 1.0));
const vec4 GLF_live6picdata[8] = vec4[8](vec4(4, 4, 20, 4), vec4(4, 4, 4, 20), vec4(4, 20, 20, 4), vec4(20, 4, 4, 8), vec4(8, 6, 4, 2), vec4(2, 12, 2, 4), vec4(16, 2, 4, 4), vec4(12, 22, 4, 4));

bool GLF_live6collision(vec2 GLF_live6pos, vec4 GLF_live6quad) {
    if (GLF_live6pos.x < GLF_live6quad.x) {
        return false;
    }
    for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
        {
            vec2 GLF_live8coord = _GLF_FUZZED(vec2(-7.4, -40.32));
            {
                ivec2 GLF_live8icoord = ivec2(((GLF_live8coord - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                int GLF_live8res3 = ((GLF_live8icoord.x >> 5) & 1) ^ ((GLF_live8icoord.y & 32) >> 5);
                int GLF_live8res2 = (GLF_live8icoord.y * GLF_live8icoord.y >> 10) & 1;
                int GLF_live8res1 = (GLF_live8icoord.x * GLF_live8icoord.y >> 9) & 1;
                GLF_live8_GLF_color = vec4(float(GLF_live8res1 ^ GLF_live8res2), float(GLF_live8res2 & GLF_live8res3), float(GLF_live8res1 | GLF_live8res3), 1.0);
            }
        }
        if (GLF_live6pos.y < GLF_live6quad.y) {
            return false;
        }
    }
    if (GLF_live6pos.x > GLF_live6quad.x + GLF_live6quad.z) {
        return false;
    }
    if (GLF_live6pos.y > GLF_live6quad.y + GLF_live6quad.w) {
        return false;
    }
    do {
        {
            int GLF_live10i = _GLF_FUZZED(-87160);
            float GLF_live10ref = _GLF_FUZZED((6455.2701 + (-1.9)));
            float GLF_live10s = _GLF_FUZZED((9543.4634 + float((94055u))));
            if (mod(float(GLF_live10i), GLF_live10ref) <= 0.01) {
                GLF_live10s += 0.2;
            }
        }
        return true;
    } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))));
}

struct _GLF_struct_5 {
    int _f0;
    int _injected_loop_counter;
    mat4 _f1;
};

struct _GLF_struct_6 {
    int _f0;
    int index;
};

struct _GLF_struct_10 {
    vec2 _f0;
    bool _f1;
    float _f2;
    mat3x4 _f3;
};

struct _GLF_struct_9 {
    bvec3 _f0;
    vec2 _f1;
};

struct _GLF_struct_8 {
    mat2x4 _f0;
    vec2 _f1;
    _GLF_struct_9 _f2;
    mat4 _f3;
};

struct _GLF_struct_7 {
    _GLF_struct_8 _f0;
    ivec3 _f1;
    vec2 _f2;
    mat3x4 _f3;
    vec3 GLF_live0col;
    _GLF_struct_10 _f4;
    ivec2 _f5;
    mat2x4 _f6;
};

struct _GLF_struct_11 {
    vec3 _f0;
    vec2 GLF_live2g;
};

struct _GLF_struct_2 {
    mat3x4 _f0;
    mat4x3 _f1;
};

struct _GLF_struct_1 {
    mat4x2 _f0;
};

struct _GLF_struct_0 {
    ivec3 _f0;
    _GLF_struct_1 _f1;
    mat3 _f2;
    _GLF_struct_2 _f3;
    int baseIndex;
};

struct _GLF_struct_4 {
    int GLF_live1iteration;
    uvec2 _f0;
    mat3x4 _f1;
    bvec2 _f2;
    uvec2 _f3;
};

struct _GLF_struct_3 {
    _GLF_struct_4 _f0;
    ivec4 _f1;
    mat3x2 _f2;
    bvec4 _f3;
};

layout(set = 0, binding = 2) uniform buf2 {
    vec2 injectionSwitch;
};

layout(set = 0, binding = 3) uniform buf3 {
    vec2 GLF_live2injectionSwitch;
};

layout(set = 0, binding = 4) uniform buf4 {
    vec2 GLF_live2resolution;
};

vec4 GLF_live0_GLF_color = _GLF_FUZZED((vec4(-24.27, -8143.6543, -241.858, -6.1) * 439.506));

layout(set = 0, binding = 5) uniform buf5 {
    vec2 GLF_live0injectionSwitch;
};

float GLF_live0compute_derivative_x(float GLF_live0v) {
    return dFdx(GLF_live0v) * GLF_live0injectionSwitch.y;
}

float GLF_live0compute_derivative_y(float GLF_live0v) {
    return dFdy(GLF_live0v) * GLF_live0injectionSwitch.y;
}

float GLF_live0compute_stripe(float GLF_live0v) {
    if (_GLF_WRAPPED_IF_FALSE(false)) {
    } else {
        return smoothstep(-.9, 1., (GLF_live0v) / ((GLF_live0injectionSwitch.y > GLF_live0injectionSwitch.x) ? GLF_live0compute_derivative_x(GLF_live0v) : GLF_live0compute_derivative_y(GLF_live0v)));
    }
}

layout(location = 0) out vec4 _GLF_color;

layout(set = 0, binding = 0) uniform buf0 {
    vec2 resolution;
};

struct BST {
    int data;
    int leftIndex;
    int rightIndex;
};

BST tree[10];

void makeTreeNode(inout BST tree, int data) {
    {
        vec3 GLF_live0col = _GLF_FUZZED((+vec3(588.883, -482.558, -4.9)));
        vec2 GLF_live0uv = _GLF_FUZZED(vec2(-6.9, -8.5));
        {
            float GLF_live0stripe = GLF_live0compute_stripe(cos((GLF_live0uv.x + GLF_live0uv.y) * 20.0));
            for (_GLF_struct_5 _GLF_struct_replacement_5 = _GLF_struct_5(1, 1, mat4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0)); _GLF_WRAPPED_LOOP(_GLF_struct_replacement_5._injected_loop_counter > int(_GLF_ZERO(0.0, injectionSwitch.x))); _GLF_struct_replacement_5._injected_loop_counter--) {
                GLF_live0col = mix(vec3(.7, sinh(GLF_live0uv.x), GLF_live0uv.x), vec3(.3, .5, GLF_live0uv.x), GLF_live0stripe);
                {
                    int GLF_live4v = _GLF_FUZZED(-60121);
                    {
                        GLF_live4v /= 2;
                        {
                            vec4 GLF_live10c = _GLF_FUZZED((mat4(648.822, 4261.0334, -97.35, 4808.6020, -0.5, -9223.0874, 775.820, 8.5, 3.3, -1340.0085, -3.4, -95.65, -5.5, -0.1, 2.8, 1.1) * vec4(7139.4045, -7.5, 6.2, -68.36)));
                            int GLF_live10i = _GLF_FUZZED(((-26869) | (-18014)));
                            {
                                if (GLF_live10c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10i, 4)] >= 1.0) {
                                    GLF_live10c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10i, 4)] = GLF_live10c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10i, 4)] * GLF_live10c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10i, 4)];
                                }
                                GLF_live10i++;
                            }
                        }
                    }
                }
            }
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                GLF_live0_GLF_color = vec4(GLF_live0col, 1.0);
            } else {
            }
            ;
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                _GLF_color = (trunc(_GLF_color) + _GLF_color);
            }
        }
    }
    tree.data = data;
    if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
        {
            vec4 GLF_live10c = _GLF_FUZZED((mat2x4(8017.9571, 5.5, 357.024, -102.255, 4984.3215, 892.892, -501.702, -882.918) * vec2(-9.4, 37.28)));
            int GLF_live10i = _GLF_FUZZED(ivec2(-34703, -99910).s);
            {
                GLF_live10c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10i, 4)] = GLF_live10c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10i, 4)] * GLF_live10c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10i, 4)];
            }
        }
    } else {
        tree.leftIndex = -1;
    }
    if (_GLF_DEAD(false)) {
        {
            {
                ;
            }
        }
        _GLF_color = vec4(-1871.3018, 1.6, -4550.0060, 0.5);
    }
    tree.rightIndex = -1;
}

void insert(int treeIndex, int data) {
    _GLF_struct_0 _GLF_struct_replacement_0 = _GLF_struct_0(ivec3(1, 1, 1), _GLF_struct_1(mat4x2(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0)), mat3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), _GLF_struct_2(mat3x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), mat4x3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0)), 0);
    while (_GLF_struct_replacement_0.baseIndex <= treeIndex) {
        if (data <= tree[_GLF_struct_replacement_0.baseIndex].data) {
            {
                vec2 GLF_live8coord = _GLF_FUZZED(vec2(vec3(-334.085, 411.033, -3681.9979)).rr);
                if (GLF_live8coord.y < 0.6) {
                    uvec2 GLF_live8icoord = uvec2(((GLF_live8coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                    uint GLF_live8res1 = uint(((GLF_live8icoord.x * GLF_live8icoord.y) >> (GLF_live8icoord.x & 31u)) & 0xffffffffu);
                    uint GLF_live8res2 = uint(((GLF_live8icoord.x * GLF_live8icoord.y) << (GLF_live8icoord.x & 31u)) & 0xffffffffu);
                    float GLF_live8res = float(((GLF_live8res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_live8res1 & 1u) != 0u ? 1u : 0u));
                    GLF_live8_GLF_color = vec4(GLF_live8res, GLF_live8res, GLF_live8res, 1.0);
                } else {
                    ivec2 GLF_live8icoord = ivec2(((GLF_live8coord - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                    int GLF_live8res3 = ((GLF_live8icoord.x >> 5) & 1) ^ ((GLF_live8icoord.y & 32) >> 5);
                    int GLF_live8res2 = (GLF_live8icoord.y * GLF_live8icoord.y >> 10) & 1;
                    int GLF_live8res1 = (GLF_live8icoord.x * GLF_live8icoord.y >> 9) & 1;
                    GLF_live8_GLF_color = vec4(float(GLF_live8res1 ^ GLF_live8res2), float(GLF_live8res2 & GLF_live8res3), float(GLF_live8res1 | GLF_live8res3), 1.0);
                }
            }
            if (tree[_GLF_struct_replacement_0.baseIndex].leftIndex == -1) {
                {
                    float GLF_live1c_im = _GLF_FUZZED(-367.474);
                    if (_GLF_DEAD(false)) {
                        _GLF_color = vec4(7673.0922, -603.886, 9544.4155, 15.49);
                    }
                    float GLF_live1c_re = _GLF_FUZZED(4189.7420);
                    int GLF_live1iteration = _GLF_FUZZED(int(6526u));
                    {
                        int GLF_live5iteration = _GLF_FUZZED(67511);
                        {
                            ;
                        }
                    }
                    int GLF_live1looplimiter0 = 0;
                    float GLF_live1x = _GLF_FUZZED((false ? 610.226 : 8.6));
                    {
                        vec2 GLF_live8coord = _GLF_FUZZED((vec2(-904.569, -7.7) - vec2(4.6, 541.855)));
                        if (GLF_live8coord.y < 0.6) {
                            uvec2 GLF_live8icoord = uvec2(((GLF_live8coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                            uint GLF_live8res1 = uint(((GLF_live8icoord.x * GLF_live8icoord.y) >> (GLF_live8icoord.x & 31u)) & 0xffffffffu);
                            uint GLF_live8res2 = uint(((GLF_live8icoord.x * GLF_live8icoord.y) << (GLF_live8icoord.x & 31u)) & 0xffffffffu);
                            float GLF_live8res = float(((GLF_live8res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_live8res1 & 1u) != 0u ? 1u : 0u));
                            GLF_live8_GLF_color = vec4(GLF_live8res, GLF_live8res, GLF_live8res, 1.0);
                        } else {
                            ivec2 GLF_live8icoord = ivec2(((GLF_live8coord - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                            int GLF_live8res3 = ((GLF_live8icoord.x >> 5) & 1) ^ ((GLF_live8icoord.y & 32) >> 5);
                            int GLF_live8res2 = (GLF_live8icoord.y * GLF_live8icoord.y >> 10) & 1;
                            int GLF_live8res1 = (GLF_live8icoord.x * GLF_live8icoord.y >> 9) & 1;
                            GLF_live8_GLF_color = vec4(float(GLF_live8res1 ^ GLF_live8res2), float(GLF_live8res2 & GLF_live8res3), float(GLF_live8res1 | GLF_live8res3), 1.0);
                        }
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        _GLF_color = step(GLF_live0_GLF_color, vec4(0.9, 9032.4586, -8.9, -3729.4557));
                        {
                            {
                                ;
                            }
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < determinant(mat3(0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0)))))) {
                            _GLF_color = vec4(vec3(-5271.9604, 39.10, 9.5), GLF_live1c_re);
                        }
                    }
                    float GLF_live1y = _GLF_FUZZED(2.1);
                    for (int GLF_live1k = 0; GLF_live1k < 1000; GLF_live1k++) {
                        {
                            vec4 GLF_live10c = _GLF_FUZZED(vec4(5401.5981));
                            int GLF_live10i = _GLF_FUZZED(((~(-80376)) * 71221));
                            int GLF_live10msb8 = _GLF_FUZZED(-28142);
                            {
                                int GLF_live10looplimiter1 = 0;
                                do {
                                    if (GLF_live10looplimiter1 >= 7) {
                                        break;
                                    }
                                    GLF_live10looplimiter1++;
                                    {
                                        if (GLF_live10c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10i, 4)] >= 1.0) {
                                            GLF_live10c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10i, 4)] = GLF_live10c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10i, 4)] * GLF_live10c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10i, 4)];
                                        }
                                        GLF_live10i++;
                                    }
                                } while (GLF_live10i < findMSB(findLSB(GLF_live10msb8)));
                            }
                        }
                        if (GLF_live1looplimiter0 >= 5) {
                            break;
                        }
                        GLF_live1looplimiter0++;
                        {
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < log(1.0))))) {
                                _GLF_color = (-vec4(-7456.0697, 48.56, -2.5, 1832.5174));
                            }
                            if (GLF_live1x * GLF_live1x + GLF_live1y * GLF_live1y > 4.0) {
                                break;
                            }
                            float GLF_live1x_new = GLF_live1x * GLF_live1x - GLF_live1y * GLF_live1y + GLF_live1c_re;
                            GLF_live1y = 2.0 * GLF_live1x * GLF_live1y + GLF_live1c_im;
                            {
                                {
                                    ;
                                }
                            }
                            GLF_live1x = GLF_live1x_new;
                            if (_GLF_DEAD(false)) {
                                _GLF_color = _GLF_color;
                            }
                            GLF_live1iteration++;
                        }
                        if (_GLF_DEAD(false)) {
                            _GLF_color = _GLF_color;
                        }
                    }
                }
                tree[_GLF_struct_replacement_0.baseIndex].leftIndex = treeIndex;
                makeTreeNode(tree[treeIndex], data);
                return;
            } else {
                do {
                    _GLF_struct_replacement_0.baseIndex = tree[_GLF_struct_replacement_0.baseIndex].leftIndex;
                } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))));
                continue;
                {
                    int GLF_live10i = _GLF_FUZZED(ivec2(69172, 48994).s);
                    float GLF_live10limit = _GLF_FUZZED(vec4(86.72, -4.1, 2.3, 4.0).y);
                    float GLF_live10ref = _GLF_FUZZED(72.06);
                    float GLF_live10s = _GLF_FUZZED(-2756.1613);
                    {
                        if (mod(float(GLF_live10i), GLF_live10ref) <= 0.01) {
                            GLF_live10s += 0.2;
                        }
                        if (float(GLF_live10i) >= GLF_live10limit) {
                            ;
                        }
                        GLF_live10i++;
                    }
                }
            }
            if (_GLF_DEAD(false)) {
                _GLF_color = (mat4(-459.628, 2.4, -98.31, -359.279, 9.0, -350.275, -3.8, 0.4, -4.3, -32.67, -218.560, -2.4, -3202.2562, 7.5, -4.6, -26.08) * GLF_live0_GLF_color);
            }
            {
                {
                    vec4 GLF_live10c = _GLF_FUZZED(vec4(3.8, 592.114, -1602.9680, -805.786));
                    int GLF_live10i = _GLF_FUZZED(((-47450) - 8757));
                    {
                        if (GLF_live10c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10i, 4)] >= 1.0) {
                            GLF_live10c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10i, 4)] = GLF_live10c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10i, 4)] * GLF_live10c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10i, 4)];
                        }
                        GLF_live10i++;
                    }
                }
                {
                    ;
                }
            }
        } else {
            if (tree[_GLF_struct_replacement_0.baseIndex].rightIndex == -1) {
                tree[_GLF_struct_replacement_0.baseIndex].rightIndex = treeIndex;
                do {
                    do {
                        makeTreeNode(tree[treeIndex], data);
                    } while (_GLF_WRAPPED_LOOP(false));
                } while (_GLF_WRAPPED_LOOP(false));
                return;
                {
                    ivec2 GLF_live7pos = _GLF_FUZZED(ivec2(80100, -37482));
                    {
                        int GLF_live10i = _GLF_FUZZED(68681);
                        float GLF_live10limit = _GLF_FUZZED((81.43 * (false ? 9586.9989 : (1.6 - (-3.4)))));
                        int GLF_live10looplimiter0 = 0;
                        float GLF_live10ref = _GLF_FUZZED(5.3);
                        float GLF_live10s = _GLF_FUZZED(-8.7);
                        while (GLF_live10i < bitfieldInsert(800, GLF_live10i, 0, 0)) {
                            if (GLF_live10looplimiter0 >= 7) {
                                break;
                            }
                            GLF_live10looplimiter0++;
                            {
                                if (mod(float(GLF_live10i), GLF_live10ref) <= 0.01) {
                                    GLF_live10s += 0.2;
                                }
                                if (float(GLF_live10i) >= GLF_live10limit) {
                                    ;
                                }
                                GLF_live10i++;
                            }
                        }
                    }
                    {
                        if (GLF_live7pos.x < GLF_live7dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live7pos.y, 256)] + 15 && GLF_live7pos.x > GLF_live7dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live7pos.y, 256)] - 15) {
                            float GLF_live7p = (15.0 - abs(float(GLF_live7pos.x - GLF_live7dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live7pos.y, 256)]))) / 15.0;
                            ;
                        }
                        GLF_live7pos.y++;
                    }
                }
            } else {
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    _GLF_color = GLF_live0_GLF_color;
                }
                {
                    int GLF_live10i = _GLF_FUZZED(((vec4(-59.34, -3.4, -4641.4314, -609.122) != vec4(-569.739, -7.7, 72.63, -4.3)) ? int(103528u) : ivec4(-54109, 30784, -59247, -76715).w));
                    float GLF_live10limit = _GLF_FUZZED(-3227.0454);
                    float GLF_live10s = _GLF_FUZZED((vec4(1.7, 405.014, 1.6, 83.44).zww.z - float(90166u)));
                    if (float(GLF_live10i) >= GLF_live10limit) {
                        ;
                    }
                }
                _GLF_struct_replacement_0.baseIndex = tree[_GLF_struct_replacement_0.baseIndex].rightIndex;
                continue;
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                    do {
                        _GLF_color = (_GLF_color * 6816.5978).ggbb;
                    } while (_GLF_WRAPPED_LOOP(false));
                    if (_GLF_DEAD(false)) {
                        _GLF_color = GLF_live0_GLF_color;
                    }
                }
            }
        }
    }
}

int search(int target) {
    {
        vec2 GLF_live8coord = _GLF_FUZZED(vec2(23.92, -737.829));
        {
            if (GLF_live8coord.y < 0.6) {
                uvec2 GLF_live8icoord = uvec2(((GLF_live8coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                uint GLF_live8res1 = uint(((GLF_live8icoord.x * GLF_live8icoord.y) >> (GLF_live8icoord.x & 31u)) & 0xffffffffu);
                uint GLF_live8res2 = uint(((GLF_live8icoord.x * GLF_live8icoord.y) << (GLF_live8icoord.x & 31u)) & 0xffffffffu);
                float GLF_live8res = float(((GLF_live8res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_live8res1 & 1u) != 0u ? 1u : 0u));
                GLF_live8_GLF_color = vec4(GLF_live8res, GLF_live8res, GLF_live8res, 1.0);
            } else {
                ivec2 GLF_live8icoord = ivec2(((GLF_live8coord - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                int GLF_live8res3 = ((GLF_live8icoord.x >> 5) & 1) ^ ((GLF_live8icoord.y & 32) >> 5);
                int GLF_live8res2 = (GLF_live8icoord.y * GLF_live8icoord.y >> 10) & 1;
                int GLF_live8res1 = (GLF_live8icoord.x * GLF_live8icoord.y >> 9) & 1;
                GLF_live8_GLF_color = vec4(float(GLF_live8res1 ^ GLF_live8res2), float(GLF_live8res2 & GLF_live8res3), float(GLF_live8res1 | GLF_live8res3), 1.0);
            }
        }
    }
    BST currentNode;
    _GLF_struct_6 _GLF_struct_replacement_6 = _GLF_struct_6(1, 0);
    if (_GLF_WRAPPED_IF_TRUE(true)) {
        while (_GLF_struct_replacement_6.index != -1) {
            do {
                if (_GLF_DEAD(false)) {
                    {
                        vec2 GLF_live8coord = _GLF_FUZZED(vec2(6216.3072, 68.62));
                        {
                            uvec2 GLF_live8icoord = uvec2(((GLF_live8coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                            uint GLF_live8res1 = uint(((GLF_live8icoord.x * GLF_live8icoord.y) >> (GLF_live8icoord.x & 31u)) & 0xffffffffu);
                            uint GLF_live8res2 = uint(((GLF_live8icoord.x * GLF_live8icoord.y) << (GLF_live8icoord.x & 31u)) & 0xffffffffu);
                            float GLF_live8res = float(((GLF_live8res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_live8res1 & 1u) != 0u ? 1u : 0u));
                            GLF_live8_GLF_color = vec4(GLF_live8res, GLF_live8res, GLF_live8res, 1.0);
                        }
                    }
                    _GLF_color = ceil(mod(GLF_live0_GLF_color, GLF_live0_GLF_color));
                }
                currentNode = tree[_GLF_struct_replacement_6.index];
            } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
            if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(true, bool(bvec2(true, false))))) {
                for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                    if (_GLF_DEAD(_GLF_IDENTITY(false, !(!(false))))) {
                        {
                            float GLF_live5c_im = _GLF_FUZZED(float(91658));
                            float GLF_live5c_re = _GLF_FUZZED(float(int(63645u)));
                            int GLF_live5iteration = _GLF_FUZZED(-16285);
                            int GLF_live5k = _GLF_FUZZED(3693);
                            {
                                vec2 GLF_live8coord = _GLF_FUZZED((vec2(153.031, 743.972) - (-7240.9140)));
                                {
                                    if (GLF_live8coord.y < 0.6) {
                                        uvec2 GLF_live8icoord = uvec2(((GLF_live8coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                                        uint GLF_live8res1 = uint(((GLF_live8icoord.x * GLF_live8icoord.y) >> (GLF_live8icoord.x & 31u)) & 0xffffffffu);
                                        uint GLF_live8res2 = uint(((GLF_live8icoord.x * GLF_live8icoord.y) << (GLF_live8icoord.x & 31u)) & 0xffffffffu);
                                        float GLF_live8res = float(((GLF_live8res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_live8res1 & 1u) != 0u ? 1u : 0u));
                                        GLF_live8_GLF_color = vec4(GLF_live8res, GLF_live8res, GLF_live8res, 1.0);
                                    } else {
                                        ivec2 GLF_live8icoord = ivec2(((GLF_live8coord - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                                        int GLF_live8res3 = ((GLF_live8icoord.x >> 5) & 1) ^ ((GLF_live8icoord.y & 32) >> 5);
                                        int GLF_live8res2 = (GLF_live8icoord.y * GLF_live8icoord.y >> 10) & 1;
                                        int GLF_live8res1 = (GLF_live8icoord.x * GLF_live8icoord.y >> 9) & 1;
                                        GLF_live8_GLF_color = vec4(float(GLF_live8res1 ^ GLF_live8res2), float(GLF_live8res2 & GLF_live8res3), float(GLF_live8res1 | GLF_live8res3), 1.0);
                                    }
                                }
                            }
                            float GLF_live5x = _GLF_FUZZED((vec2(-3.4, -42.50).t + (-2360.6305)));
                            _GLF_struct_12 _GLF_struct_replacement_12 = _GLF_struct_12(mat3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), _GLF_struct_13(ivec3(1, 1, 1), _GLF_struct_14(bvec2(true, true), mat2x3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0), mat2x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), mat4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0)), mat3x2(1.0, 1.0, 1.0, 1.0, 1.0, 1.0), mat2x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0)), _GLF_struct_15(bvec4(true, true, true, true), _GLF_struct_16(ivec2(1, 1), ivec3(1, 1, 1)), 1.0, _GLF_FUZZED((true ? 0.1 : (-6044.5006))), 1.0), _GLF_struct_17(vec4(1.0, 1.0, 1.0, 1.0)), mat4x2(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), vec3(1.0, 1.0, 1.0), uvec3(1u, 1u, 1u));
                            {
                                if (GLF_live5x * GLF_live5x + _GLF_struct_replacement_12._f2.GLF_live5y * _GLF_struct_replacement_12._f2.GLF_live5y > 4.0) {
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = atanh(vec4(-54.02, 5808.7263, -5.9, 1.7));
                                    }
                                    ;
                                }
                                {
                                    vec2 GLF_live8coord = _GLF_FUZZED(vec2(-3.2, 40.87));
                                    {
                                        if (GLF_live8coord.y < 0.6) {
                                            uvec2 GLF_live8icoord = uvec2(((GLF_live8coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                                            uint GLF_live8res1 = uint(((GLF_live8icoord.x * GLF_live8icoord.y) >> (GLF_live8icoord.x & 31u)) & 0xffffffffu);
                                            uint GLF_live8res2 = uint(((GLF_live8icoord.x * GLF_live8icoord.y) << (GLF_live8icoord.x & 31u)) & 0xffffffffu);
                                            float GLF_live8res = float(((GLF_live8res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_live8res1 & 1u) != 0u ? 1u : 0u));
                                            GLF_live8_GLF_color = vec4(GLF_live8res, GLF_live8res, GLF_live8res, 1.0);
                                        } else {
                                            ivec2 GLF_live8icoord = ivec2(((GLF_live8coord - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                                            int GLF_live8res3 = ((GLF_live8icoord.x >> 5) & 1) ^ ((GLF_live8icoord.y & 32) >> 5);
                                            int GLF_live8res2 = (GLF_live8icoord.y * GLF_live8icoord.y >> 10) & 1;
                                            int GLF_live8res1 = (GLF_live8icoord.x * GLF_live8icoord.y >> 9) & 1;
                                            GLF_live8_GLF_color = vec4(float(GLF_live8res1 ^ GLF_live8res2), float(GLF_live8res2 & GLF_live8res3), float(GLF_live8res1 | GLF_live8res3), 1.0);
                                        }
                                    }
                                }
                                float GLF_live5x_new = GLF_live5x * GLF_live5x - _GLF_struct_replacement_12._f2.GLF_live5y * _GLF_struct_replacement_12._f2.GLF_live5y + GLF_live5c_re;
                                _GLF_struct_replacement_12._f2.GLF_live5y = 2.0 * GLF_live5x * _GLF_struct_replacement_12._f2.GLF_live5y + GLF_live5c_im;
                                GLF_live5x = GLF_live5x_new;
                                GLF_live5iteration++;
                                GLF_live5k++;
                            }
                        }
                        _GLF_color = (9.6 / mat4(-3.6, 78.40, -9129.8883, -2758.8618, 4.0, -349.245, 39.33, 9055.9296, -116.542, 6.5, 424.197, -5.6, -6041.4177, 0.1, -3708.8043, -4.7))[3];
                    }
                    if (currentNode.data == target) {
                        return target;
                        {
                            int GLF_live4count = _GLF_FUZZED(63688);
                            if (_GLF_DEAD(false)) {
                                _GLF_color = _GLF_color;
                            }
                            {
                                int GLF_live10i = _GLF_FUZZED(-45261);
                                float GLF_live10limit = _GLF_FUZZED(-6.0);
                                float GLF_live10s = _GLF_FUZZED(-7575.9438);
                                if (float(GLF_live10i) >= GLF_live10limit) {
                                    ;
                                }
                            }
                            int GLF_live4looplimiter0 = 0;
                            int GLF_live4v = _GLF_FUZZED(((-16610) - (-78003)));
                            while (GLF_live4v > 1) {
                                if (GLF_live4looplimiter0 >= 7) {
                                    break;
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = GLF_live0_GLF_color;
                                    }
                                }
                                GLF_live4looplimiter0++;
                                {
                                    if ((GLF_live4v & 1) == 1) {
                                        for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
                                            {
                                                vec4 GLF_live10c = _GLF_FUZZED(vec4(-275.380, -10.36, -774.733, -5.5));
                                                int GLF_live10i = _GLF_FUZZED(-96623);
                                                {
                                                    GLF_live10c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10i, 4)] = GLF_live10c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10i, 4)] * GLF_live10c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10i, 4)];
                                                }
                                            }
                                            GLF_live4v = 3 * GLF_live4v + 1;
                                        }
                                    } else {
                                        GLF_live4v /= 2;
                                        {
                                            vec2 GLF_live8coord = _GLF_FUZZED(vec2(-9513.2079, -967.793));
                                            {
                                                ivec2 GLF_live8icoord = ivec2(((GLF_live8coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.6, 1.0)) * 256.0);
                                                int GLF_live8v = (GLF_live8icoord.x ^ GLF_live8icoord.y) * GLF_live8icoord.y;
                                                bool GLF_live8res1 = ((GLF_live8v >> 10) & 1) != 0;
                                                bool GLF_live8res2 = ((GLF_live8v >> 11) & 4) != 0;
                                                bool GLF_live8res3 = ((GLF_live8v >> 12) & 8) != 0;
                                                GLF_live8_GLF_color = vec4(GLF_live8res1 ? 1.0 : 0.0, GLF_live8res2 ? 1.0 : 0.0, GLF_live8res3 ? 1.0 : 0.0, 1);
                                            }
                                        }
                                    }
                                    GLF_live4count++;
                                }
                            }
                        }
                        {
                            float GLF_live10s = _GLF_FUZZED(98.97);
                            {
                                GLF_live10s += 0.2;
                            }
                        }
                    }
                    {
                        int GLF_live2j = _GLF_FUZZED(((22388 & (35210 & (-41934))) & ivec4(11056, 68092, -69231, 34074).s));
                        vec3 GLF_live2m = _GLF_FUZZED(vec3(29.64, -9081.8777, 2272.0257));
                        vec2 GLF_live2n = _GLF_FUZZED(vec2(0.6, -592.181));
                        {
                            {
                                {
                                    int GLF_live5looplimiter1 = 0;
                                    if (GLF_live5looplimiter1 >= 7) {
                                        ;
                                    }
                                }
                                {
                                    {
                                        ;
                                    }
                                }
                                int GLF_live2looplimiter1 = 0;
                                for (int GLF_live2i = -1; GLF_live2i <= int(GLF_live2injectionSwitch.y); GLF_live2i++) {
                                    if (GLF_live2looplimiter1 >= 6) {
                                        break;
                                        {
                                            vec2 GLF_live8coord = _GLF_FUZZED((vec2(671.959, -9.9) - vec2(6834.7247, 4.1)));
                                            if (GLF_live8coord.x > 0.4) {
                                                if (GLF_live8coord.y < 0.6) {
                                                    uvec2 GLF_live8icoord = uvec2(((GLF_live8coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                                                    uint GLF_live8res1 = uint(((GLF_live8icoord.x * GLF_live8icoord.y) >> (GLF_live8icoord.x & 31u)) & 0xffffffffu);
                                                    uint GLF_live8res2 = uint(((GLF_live8icoord.x * GLF_live8icoord.y) << (GLF_live8icoord.x & 31u)) & 0xffffffffu);
                                                    float GLF_live8res = float(((GLF_live8res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_live8res1 & 1u) != 0u ? 1u : 0u));
                                                    GLF_live8_GLF_color = vec4(GLF_live8res, GLF_live8res, GLF_live8res, 1.0);
                                                } else {
                                                    ivec2 GLF_live8icoord = ivec2(((GLF_live8coord - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                                                    int GLF_live8res3 = ((GLF_live8icoord.x >> 5) & 1) ^ ((GLF_live8icoord.y & 32) >> 5);
                                                    int GLF_live8res2 = (GLF_live8icoord.y * GLF_live8icoord.y >> 10) & 1;
                                                    int GLF_live8res1 = (GLF_live8icoord.x * GLF_live8icoord.y >> 9) & 1;
                                                    GLF_live8_GLF_color = vec4(float(GLF_live8res1 ^ GLF_live8res2), float(GLF_live8res2 & GLF_live8res3), float(GLF_live8res1 | GLF_live8res3), 1.0);
                                                }
                                            } else {
                                                ivec2 GLF_live8icoord = ivec2(((GLF_live8coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.6, 1.0)) * 256.0);
                                                int GLF_live8v = (GLF_live8icoord.x ^ GLF_live8icoord.y) * GLF_live8icoord.y;
                                                bool GLF_live8res1 = ((GLF_live8v >> 10) & 1) != 0;
                                                bool GLF_live8res2 = ((GLF_live8v >> 11) & 4) != 0;
                                                bool GLF_live8res3 = ((GLF_live8v >> 12) & 8) != 0;
                                                GLF_live8_GLF_color = vec4(GLF_live8res1 ? 1.0 : 0.0, GLF_live8res2 ? 1.0 : 0.0, GLF_live8res3 ? 1.0 : 0.0, 1);
                                            }
                                        }
                                    }
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < log(1.0))))) {
                                        _GLF_color = vec4(-1746.6820, 4885.3814, -5195.1545, -141.155);
                                        {
                                            vec2 GLF_live8coord = _GLF_FUZZED(vec2(5432.8155, 104.566));
                                            if (GLF_live8coord.x > 0.4) {
                                                if (GLF_live8coord.y < 0.6) {
                                                    uvec2 GLF_live8icoord = uvec2(((GLF_live8coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                                                    uint GLF_live8res1 = uint(((GLF_live8icoord.x * GLF_live8icoord.y) >> (GLF_live8icoord.x & 31u)) & 0xffffffffu);
                                                    uint GLF_live8res2 = uint(((GLF_live8icoord.x * GLF_live8icoord.y) << (GLF_live8icoord.x & 31u)) & 0xffffffffu);
                                                    float GLF_live8res = float(((GLF_live8res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_live8res1 & 1u) != 0u ? 1u : 0u));
                                                    GLF_live8_GLF_color = vec4(GLF_live8res, GLF_live8res, GLF_live8res, 1.0);
                                                } else {
                                                    ivec2 GLF_live8icoord = ivec2(((GLF_live8coord - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                                                    int GLF_live8res3 = ((GLF_live8icoord.x >> 5) & 1) ^ ((GLF_live8icoord.y & 32) >> 5);
                                                    int GLF_live8res2 = (GLF_live8icoord.y * GLF_live8icoord.y >> 10) & 1;
                                                    int GLF_live8res1 = (GLF_live8icoord.x * GLF_live8icoord.y >> 9) & 1;
                                                    GLF_live8_GLF_color = vec4(float(GLF_live8res1 ^ GLF_live8res2), float(GLF_live8res2 & GLF_live8res3), float(GLF_live8res1 | GLF_live8res3), 1.0);
                                                }
                                            } else {
                                                ivec2 GLF_live8icoord = ivec2(((GLF_live8coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.6, 1.0)) * 256.0);
                                                int GLF_live8v = (GLF_live8icoord.x ^ GLF_live8icoord.y) * GLF_live8icoord.y;
                                                bool GLF_live8res1 = ((GLF_live8v >> 10) & 1) != 0;
                                                bool GLF_live8res2 = ((GLF_live8v >> 11) & 4) != 0;
                                                bool GLF_live8res3 = ((GLF_live8v >> 12) & 8) != 0;
                                                GLF_live8_GLF_color = vec4(GLF_live8res1 ? 1.0 : 0.0, GLF_live8res2 ? 1.0 : 0.0, GLF_live8res3 ? 1.0 : 0.0, 1);
                                            }
                                        }
                                    }
                                    {
                                        int GLF_live10looplimiter0 = 0;
                                        if (GLF_live10looplimiter0 >= 7) {
                                            ;
                                        }
                                    }
                                    GLF_live2looplimiter1++;
                                    {
                                        int GLF_live4count = _GLF_FUZZED(-78805);
                                        int GLF_live4looplimiter0 = 0;
                                        int GLF_live4v = _GLF_FUZZED(-13489);
                                        while (GLF_live4v > 1) {
                                            {
                                                vec4 GLF_live10c = _GLF_FUZZED(vec4(-20.97, -6.2, -47.95, -9.0));
                                                int GLF_live10i = _GLF_FUZZED(((55127 + (-8472)) + (-72090)));
                                                {
                                                    if (GLF_live10c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10i, 4)] >= 1.0) {
                                                        GLF_live10c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10i, 4)] = GLF_live10c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10i, 4)] * GLF_live10c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10i, 4)];
                                                    }
                                                    GLF_live10i++;
                                                }
                                            }
                                            if (GLF_live4looplimiter0 >= 7) {
                                                break;
                                            }
                                            GLF_live4looplimiter0++;
                                            if (_GLF_DEAD(false)) {
                                                _GLF_color = asin(GLF_live0_GLF_color);
                                                {
                                                    vec2 GLF_live8coord = _GLF_FUZZED(vec2(-581.090, 44.46));
                                                    {
                                                        if (GLF_live8coord.y < 0.6) {
                                                            uvec2 GLF_live8icoord = uvec2(((GLF_live8coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                                                            uint GLF_live8res1 = uint(((GLF_live8icoord.x * GLF_live8icoord.y) >> (GLF_live8icoord.x & 31u)) & 0xffffffffu);
                                                            uint GLF_live8res2 = uint(((GLF_live8icoord.x * GLF_live8icoord.y) << (GLF_live8icoord.x & 31u)) & 0xffffffffu);
                                                            float GLF_live8res = float(((GLF_live8res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_live8res1 & 1u) != 0u ? 1u : 0u));
                                                            GLF_live8_GLF_color = vec4(GLF_live8res, GLF_live8res, GLF_live8res, 1.0);
                                                        } else {
                                                            ivec2 GLF_live8icoord = ivec2(((GLF_live8coord - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                                                            int GLF_live8res3 = ((GLF_live8icoord.x >> 5) & 1) ^ ((GLF_live8icoord.y & 32) >> 5);
                                                            int GLF_live8res2 = (GLF_live8icoord.y * GLF_live8icoord.y >> 10) & 1;
                                                            int GLF_live8res1 = (GLF_live8icoord.x * GLF_live8icoord.y >> 9) & 1;
                                                            GLF_live8_GLF_color = vec4(float(GLF_live8res1 ^ GLF_live8res2), float(GLF_live8res2 & GLF_live8res3), float(GLF_live8res1 | GLF_live8res3), 1.0);
                                                        }
                                                    }
                                                }
                                            }
                                            {
                                                if ((GLF_live4v & 1) == 1) {
                                                    GLF_live4v = 3 * GLF_live4v + 1;
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < length(0.0))))) {
                                                        _GLF_color = (vec4(5.2, 46.32, -61.35, -8774.1893) / 484.884);
                                                        {
                                                            {
                                                                ;
                                                            }
                                                        }
                                                    }
                                                } else {
                                                    GLF_live4v /= 2;
                                                }
                                                GLF_live4count++;
                                            }
                                        }
                                    }
                                    {
                                        {
                                            int GLF_live7looplimiter0 = 0;
                                            ivec2 GLF_live7pos = _GLF_FUZZED((ivec2(-78319, 21668) + ivec2(4383, -53325)));
                                            while (GLF_live7pos.y != 256) {
                                                if (GLF_live7looplimiter0 >= 3) {
                                                    break;
                                                }
                                                GLF_live7looplimiter0++;
                                                {
                                                    vec2 GLF_live8coord = _GLF_FUZZED(vec3(-1675.6121, -25.07, 8.0).tp);
                                                    {
                                                        ivec2 GLF_live8icoord = ivec2(((GLF_live8coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.6, 1.0)) * 256.0);
                                                        int GLF_live8v = (GLF_live8icoord.x ^ GLF_live8icoord.y) * GLF_live8icoord.y;
                                                        bool GLF_live8res1 = ((GLF_live8v >> 10) & 1) != 0;
                                                        bool GLF_live8res2 = ((GLF_live8v >> 11) & 4) != 0;
                                                        bool GLF_live8res3 = ((GLF_live8v >> 12) & 8) != 0;
                                                        GLF_live8_GLF_color = vec4(GLF_live8res1 ? 1.0 : 0.0, GLF_live8res2 ? 1.0 : 0.0, GLF_live8res3 ? 1.0 : 0.0, 1);
                                                    }
                                                }
                                                {
                                                    if (GLF_live7pos.x < GLF_live7dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live7pos.y, 256)] + 15 && GLF_live7pos.x > GLF_live7dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live7pos.y, 256)] - 15) {
                                                        float GLF_live7p = (15.0 - abs(float(GLF_live7pos.x - GLF_live7dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live7pos.y, 256)]))) / 15.0;
                                                        ;
                                                    }
                                                    GLF_live7pos.y++;
                                                }
                                            }
                                        }
                                        if (_GLF_DEAD(false)) {
                                            _GLF_color = dFdxFine((mat3x4(-457.731, 5.1, 9.5, 3.9, 169.006, -6865.6243, -9614.9372, -19.68, -170.748, 3.2, 3.9, -3.4) * vec3(-54.10, -7.3, 4.5)));
                                        }
                                        vec2 GLF_live2g = vec2(float(GLF_live2j), float(GLF_live2i));
                                        vec2 GLF_live2o = mix(GLF_live2n, GLF_live2g, 0.2);
                                        if (GLF_live2injectionSwitch.x < (GLF_live2m.x)) {
                                            int GLF_live2k = 1;
                                            {
                                                int GLF_live2looplimiter0 = 0;
                                                while (GLF_live2k >= 0) {
                                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                        int GLF_live4v = _GLF_FUZZED(-43779);
                                                        for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != (1 | int(_GLF_ONE(1.0, injectionSwitch.y)))); _injected_loop_counter++) {
                                                            GLF_live4v /= 2;
                                                        }
                                                    } else {
                                                    }
                                                    if (GLF_live2looplimiter0 >= 6) {
                                                        break;
                                                    }
                                                    {
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                            _GLF_color = GLF_live0_GLF_color;
                                                        }
                                                        {
                                                            {
                                                                {
                                                                    ;
                                                                }
                                                            }
                                                            ;
                                                        }
                                                    }
                                                    for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != int(_GLF_ONE(1.0, injectionSwitch.y))); _injected_loop_counter++) {
                                                        GLF_live2looplimiter0++;
                                                    }
                                                    {
                                                        GLF_live2o = GLF_live2o + GLF_live2o;
                                                        GLF_live2k--;
                                                    }
                                                }
                                            }
                                            GLF_live2m = vec3(GLF_live2injectionSwitch.x, cos(GLF_live2o));
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            } else {
            }
            if (_GLF_WRAPPED_IF_FALSE(false)) {
                if (_GLF_DEAD(false)) {
                    _GLF_color = radians(vec4(-8.9, 75.45, -7.0, 7.4));
                }
            } else {
                if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                } else {
                    if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        {
                            _GLF_struct_18 _GLF_struct_replacement_18 = _GLF_struct_18(mat3x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), _GLF_FUZZED(((vec2(-8.1, 454.159) * vec2(74.89, -0.9)) - (+vec4(787.687, -163.583, 3.5, -8074.8927)).br)), mat4x2(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), vec4(1.0, 1.0, 1.0, 1.0));
                            {
                                vec2 GLF_live8coord = _GLF_FUZZED((vec2(5226.4375, -2.6) - float(53114)));
                                {
                                    if (GLF_live8coord.y < 0.6) {
                                        uvec2 GLF_live8icoord = uvec2(((GLF_live8coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                                        uint GLF_live8res1 = uint(((GLF_live8icoord.x * GLF_live8icoord.y) >> (GLF_live8icoord.x & 31u)) & 0xffffffffu);
                                        uint GLF_live8res2 = uint(((GLF_live8icoord.x * GLF_live8icoord.y) << (GLF_live8icoord.x & 31u)) & 0xffffffffu);
                                        float GLF_live8res = float(((GLF_live8res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_live8res1 & 1u) != 0u ? 1u : 0u));
                                        GLF_live8_GLF_color = vec4(GLF_live8res, GLF_live8res, GLF_live8res, 1.0);
                                    } else {
                                        ivec2 GLF_live8icoord = ivec2(((GLF_live8coord - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                                        int GLF_live8res3 = ((GLF_live8icoord.x >> 5) & 1) ^ ((GLF_live8icoord.y & 32) >> 5);
                                        int GLF_live8res2 = (GLF_live8icoord.y * GLF_live8icoord.y >> 10) & 1;
                                        int GLF_live8res1 = (GLF_live8icoord.x * GLF_live8icoord.y >> 9) & 1;
                                        GLF_live8_GLF_color = vec4(float(GLF_live8res1 ^ GLF_live8res2), float(GLF_live8res2 & GLF_live8res3), float(GLF_live8res1 | GLF_live8res3), 1.0);
                                    }
                                }
                            }
                            vec4 GLF_live3quad = _GLF_FUZZED(vec4(6.4, -87.17, 36.07, 0.1));
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(true, !(!(true))))) {
                                if (_GLF_WRAPPED_IF_FALSE(_GLF_IDENTITY(false, !(!(false))))) {
                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                        _GLF_color = cos(vec4(7.1, 47.29, -8.1, -86.79));
                                    }
                                    {
                                        vec4 GLF_live10c = _GLF_FUZZED((vec4(358.239, 187.462, -62.30, 3.2) * vec4(-7.0, 2264.2021, 819.597, -60.56)));
                                        int GLF_live10i = _GLF_FUZZED(-14311);
                                        int GLF_live10msb8 = _GLF_FUZZED(((-48459) + 36305));
                                        {
                                            int GLF_live10looplimiter1 = 0;
                                            do {
                                                if (GLF_live10looplimiter1 >= 7) {
                                                    break;
                                                }
                                                GLF_live10looplimiter1++;
                                                {
                                                    if (GLF_live10c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10i, 4)] >= 1.0) {
                                                        GLF_live10c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10i, 4)] = GLF_live10c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10i, 4)] * GLF_live10c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10i, 4)];
                                                    }
                                                    GLF_live10i++;
                                                }
                                            } while (GLF_live10i < findMSB(findLSB(GLF_live10msb8)));
                                        }
                                    }
                                } else {
                                    if (_GLF_struct_replacement_18.GLF_live3pos.y < GLF_live3quad.y) {
                                        ;
                                    }
                                }
                            } else {
                            }
                        }
                    } else {
                        _GLF_struct_replacement_6.index = target > currentNode.data ? currentNode.rightIndex : currentNode.leftIndex;
                    }
                }
            }
        }
        {
            bool GLF_live0c1 = _GLF_FUZZED(((mat4x3(3.2, -522.848, 3737.5798, 2090.1413, 28.33, -40.43, 5396.6007, -1.8, 333.408, 3.2, 37.83, 791.099) * mat4(-2.8, 9565.6086, 5.7, 82.84, 48.92, 3788.4818, -9087.2722, 933.799, 6080.3572, -5.3, -4045.1432, -57.84, -895.886, -3603.5063, -435.524, -3865.0056)) == mat4x3(-4.9, 8229.9384, 680.027, 1.9, 3.1, 3.9, 6596.9560, 5.6, -963.437, 96.38, -9324.3016, -812.792)));
            bool GLF_live0c2 = _GLF_FUZZED(((uvec4(67778u, 157252u, 62987u, 125774u) * uvec4(155665u, 114573u, 129363u, 145366u)) == uvec4(141465u, 95802u, 151377u, 51852u)));
            bool GLF_live0c3 = _GLF_FUZZED(false);
            bool GLF_live0c4 = _GLF_FUZZED(bool(22677u));
            _GLF_struct_7 _GLF_struct_replacement_7 = _GLF_struct_7(_GLF_struct_8(mat2x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), vec2(1.0, 1.0), _GLF_struct_9(bvec3(true, true, true), vec2(1.0, 1.0)), mat4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0)), ivec3(1, 1, 1), vec2(1.0, 1.0), mat3x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), _GLF_FUZZED(vec3(8.2, (799.856), -60.12)), _GLF_struct_10(vec2(1.0, 1.0), true, 1.0, mat3x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0)), ivec2(1, 1), mat2x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0));
            vec2 GLF_live0uv = _GLF_FUZZED(vec2(5.4, -244.739));
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                if (!GLF_live0c1 && !GLF_live0c2 && !GLF_live0c3 && GLF_live0c4) {
                    float GLF_live0stripe = GLF_live0compute_stripe(tan((GLF_live0uv.x + GLF_live0uv.y) * 20.0));
                    do {
                        if (_GLF_DEAD(false)) {
                            _GLF_color = dFdxCoarse(GLF_live0_GLF_color);
                        }
                        _GLF_struct_replacement_7.GLF_live0col = mix(vec3(GLF_live0uv.x, .8, 0), vec3(1, GLF_live0uv.y, 0), GLF_live0stripe);
                    } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.x < sin(0.0)))));
                    GLF_live0_GLF_color = vec4(_GLF_struct_replacement_7.GLF_live0col, 1.0);
                    ;
                }
            } else {
            }
        }
    } else {
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
            {
                int GLF_live10looplimiter0 = 0;
                if (GLF_live10looplimiter0 >= 7) {
                    ;
                }
            }
            _GLF_color = GLF_live0_GLF_color;
        }
    }
    return -1;
}

vec3 hueColor(float angle) {
    float nodeData = float(search(15));
    vec3 color;
    {
        vec2 GLF_live8coord = _GLF_FUZZED(vec2(54.28, 0.3));
        if (GLF_live8coord.y < 0.6) {
            uvec2 GLF_live8icoord = uvec2(((GLF_live8coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
            uint GLF_live8res1 = uint(((GLF_live8icoord.x * GLF_live8icoord.y) >> (GLF_live8icoord.x & 31u)) & 0xffffffffu);
            uint GLF_live8res2 = uint(((GLF_live8icoord.x * GLF_live8icoord.y) << (GLF_live8icoord.x & 31u)) & 0xffffffffu);
            float GLF_live8res = float(((GLF_live8res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_live8res1 & 1u) != 0u ? 1u : 0u));
            GLF_live8_GLF_color = vec4(GLF_live8res, GLF_live8res, GLF_live8res, 1.0);
        } else {
            ivec2 GLF_live8icoord = ivec2(((GLF_live8coord - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
            int GLF_live8res3 = ((GLF_live8icoord.x >> 5) & 1) ^ ((GLF_live8icoord.y & 32) >> 5);
            int GLF_live8res2 = (GLF_live8icoord.y * GLF_live8icoord.y >> 10) & 1;
            int GLF_live8res1 = (GLF_live8icoord.x * GLF_live8icoord.y >> 9) & 1;
            GLF_live8_GLF_color = vec4(float(GLF_live8res1 ^ GLF_live8res2), float(GLF_live8res2 & GLF_live8res3), float(GLF_live8res1 | GLF_live8res3), 1.0);
        }
    }
    {
        bool GLF_live0c1 = _GLF_FUZZED(false);
        bool GLF_live0c2 = _GLF_FUZZED(false);
        bool GLF_live0c3 = _GLF_FUZZED(true);
        vec3 GLF_live0col = _GLF_FUZZED(vec3(6.1, 9.8, 1849.4624));
        vec2 GLF_live0uv = _GLF_FUZZED(vec2(213.871, -7451.2678));
        if (!GLF_live0c1 && !GLF_live0c2 && GLF_live0c3) {
            float GLF_live0stripe = GLF_live0compute_stripe(cos((GLF_live0uv.x + GLF_live0uv.y) * 20.0));
            GLF_live0col = mix(vec3(.7, sinh(GLF_live0uv.x), GLF_live0uv.x), vec3(.3, .5, GLF_live0uv.x), GLF_live0stripe);
            GLF_live0_GLF_color = vec4(GLF_live0col, 1.0);
            ;
        }
    }
    color = clamp(fract(angle * vec3(1.0, 5.0, nodeData)), 0.0, 1.0);
    color.x *= cosh(isnan(float(search(30))) ? 0.0 : 1.0);
    return color;
}

float makeFrame(float v) {
    do {
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            v *= 6.5;
        } else {
        }
    } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
    {
        float GLF_live1c_im = _GLF_FUZZED((-(5.8 + 7181.5821)));
        float GLF_live1c_re = _GLF_FUZZED(float(160223u));
        _GLF_struct_3 _GLF_struct_replacement_3 = _GLF_struct_3(_GLF_struct_4(_GLF_FUZZED((57074)), uvec2(1u, 1u), mat3x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), bvec2(true, true), uvec2(1u, 1u)), ivec4(1, 1, 1, 1), mat3x2(1.0, 1.0, 1.0, 1.0, 1.0, 1.0), bvec4(true, true, true, true));
        {
            int GLF_live7looplimiter0 = 0;
            if (GLF_live7looplimiter0 >= 3) {
                ;
                if (_GLF_DEAD(false)) {
                    _GLF_color = _GLF_color;
                }
            }
        }
        _GLF_struct_19 _GLF_struct_replacement_19 = _GLF_struct_19(mat4x2(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), ivec2(1, 1), _GLF_FUZZED((float(33895))));
        float GLF_live1y = _GLF_FUZZED((vec3(2319.4286, -7.3, -3.1).y * float(false)));
        {
            int GLF_live10looplimiter0 = 0;
            if (GLF_live10looplimiter0 >= 7) {
                ;
            }
        }
        {
            int GLF_live1looplimiter0 = 0;
            for (int GLF_live1k = 0; GLF_live1k < 1000; GLF_live1k++) {
                if (GLF_live1looplimiter0 >= 5) {
                    break;
                }
                if (_GLF_DEAD(false)) {
                    _GLF_color = step(GLF_live0_GLF_color, GLF_live0_GLF_color);
                }
                GLF_live1looplimiter0++;
                {
                    if (_GLF_struct_replacement_19.GLF_live1x * _GLF_struct_replacement_19.GLF_live1x + GLF_live1y * GLF_live1y > 4.0) {
                        break;
                    }
                    float GLF_live1x_new = _GLF_struct_replacement_19.GLF_live1x * _GLF_struct_replacement_19.GLF_live1x - GLF_live1y * GLF_live1y + GLF_live1c_re;
                    GLF_live1y = 2.0 * _GLF_struct_replacement_19.GLF_live1x * GLF_live1y + GLF_live1c_im;
                    _GLF_struct_replacement_19.GLF_live1x = GLF_live1x_new;
                    do {
                        _GLF_struct_replacement_3._f0.GLF_live1iteration++;
                    } while (_GLF_WRAPPED_LOOP(false));
                }
            }
        }
    }
    if (v < 1.5) {
        return float(search(100));
    }
    {
        int GLF_live4looplimiter0 = 0;
        if (GLF_live4looplimiter0 >= 7) {
            ;
        }
        if (_GLF_DEAD(_GLF_IDENTITY(false, true && (false)))) {
            _GLF_color = (_GLF_color - _GLF_color);
        }
    }
    if (v < 4.0) {
        {
            vec2 GLF_live8coord = _GLF_FUZZED((-((-6.9) + vec2(-9.1, 76.22))));
            {
                ivec2 GLF_live8icoord = ivec2(((GLF_live8coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.6, 1.0)) * 256.0);
                int GLF_live8v = (GLF_live8icoord.x ^ GLF_live8icoord.y) * GLF_live8icoord.y;
                bool GLF_live8res1 = ((GLF_live8v >> 10) & 1) != 0;
                bool GLF_live8res2 = ((GLF_live8v >> 11) & 4) != 0;
                bool GLF_live8res3 = ((GLF_live8v >> 12) & 8) != 0;
                GLF_live8_GLF_color = vec4(GLF_live8res1 ? 1.0 : 0.0, GLF_live8res2 ? 1.0 : 0.0, GLF_live8res3 ? 1.0 : 0.0, 1);
            }
        }
        return 0.0;
    }
    do {
        if (v < float(search(6))) {
            do {
                if (_GLF_DEAD(false)) {
                    {
                        int GLF_live6i = _GLF_FUZZED(ivec3(-53340, 45826, 52478).r);
                        vec4 GLF_live6res = _GLF_FUZZED(vec4(9.7, -2554.3130, 2.9, -7.4));
                        {
                            GLF_live6res = GLF_live6pal[_GLF_MAKE_IN_BOUNDS_INT((int(GLF_live6picdata[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6i, 8)].x) * int(GLF_live6picdata[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6i, 8)].y) + GLF_live6i * 9 + 11) % 16, 16)];
                        }
                    }
                    _GLF_color = refract(_GLF_color, GLF_live0_GLF_color, (82.44 - (-57.44)));
                }
                for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                    {
                        int GLF_live5iterationCap = _GLF_FUZZED(53821);
                        for (int _injected_loop_counter = (0 | 0); _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
                            if (0.0 > GLF_live5resolution.y) {
                                do {
                                    GLF_live5iterationCap += 1;
                                    {
                                        vec4 GLF_live10c = _GLF_FUZZED((vec4(-59.61, 4.1, -1.8, 574.090) * 83.94));
                                        int GLF_live10i = _GLF_FUZZED(58364);
                                        if (GLF_live10c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10i, 4)] >= 1.0) {
                                            GLF_live10c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10i, 4)] = GLF_live10c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10i, 4)] * GLF_live10c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10i, 4)];
                                        }
                                    }
                                } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))));
                            }
                        }
                    }
                    for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
                        return 1.0;
                    }
                }
                {
                    vec2 GLF_live8coord = _GLF_FUZZED(vec2(vec2(4297.0741, 527.426).grr));
                    {
                        ivec2 GLF_live8icoord = ivec2(((GLF_live8coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.6, 1.0)) * 256.0);
                        int GLF_live8v = (GLF_live8icoord.x ^ GLF_live8icoord.y) * GLF_live8icoord.y;
                        bool GLF_live8res1 = ((GLF_live8v >> 10) & 1) != 0;
                        bool GLF_live8res2 = ((GLF_live8v >> 11) & 4) != 0;
                        bool GLF_live8res3 = ((GLF_live8v >> 12) & 8) != 0;
                        GLF_live8_GLF_color = vec4(GLF_live8res1 ? 1.0 : 0.0, GLF_live8res2 ? 1.0 : 0.0, GLF_live8res3 ? 1.0 : 0.0, 1);
                    }
                }
            } while (_GLF_WRAPPED_LOOP(false));
        }
    } while (_GLF_WRAPPED_LOOP(false));
    for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
        return 10.0 + float(search(30));
        {
            ivec2 GLF_live7pos = _GLF_FUZZED(((-68611) ^ ivec2(-90405, 28746)));
            if (GLF_live7pos.x < GLF_live7dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live7pos.y, 256)] + 15 && GLF_live7pos.x > GLF_live7dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live7pos.y, 256)] - 15) {
                float GLF_live7p = (15.0 - abs(float(GLF_live7pos.x - GLF_live7dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live7pos.y, 256)]))) / 15.0;
                ;
            }
        }
    }
    {
        vec2 GLF_live8coord = _GLF_FUZZED(vec2(37.39, -97.32));
        {
            ivec2 GLF_live8icoord = ivec2(((GLF_live8coord - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
            int GLF_live8res3 = ((GLF_live8icoord.x >> 5) & 1) ^ ((GLF_live8icoord.y & 32) >> 5);
            int GLF_live8res2 = (GLF_live8icoord.y * GLF_live8icoord.y >> 10) & 1;
            int GLF_live8res1 = (GLF_live8icoord.x * GLF_live8icoord.y >> 9) & 1;
            GLF_live8_GLF_color = vec4(float(GLF_live8res1 ^ GLF_live8res2), float(GLF_live8res2 & GLF_live8res3), float(GLF_live8res1 | GLF_live8res3), 1.0);
        }
    }
}

void main() {
    int treeIndex = 0;
    {
        int GLF_live2k = _GLF_FUZZED(int(false));
        int GLF_live2looplimiter0 = 0;
        vec2 GLF_live2o = _GLF_FUZZED(vec2(4.7, -1.5));
        {
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                _GLF_color = vec4(GLF_live5resolution, resolution);
            }
            if (GLF_live2looplimiter0 >= 6) {
                ;
            }
            GLF_live2looplimiter0++;
            {
                vec2 GLF_live8coord = _GLF_FUZZED(((-83.67) - vec2(579.892, 1712.9848)));
                if (GLF_live8coord.y < 0.6) {
                    uvec2 GLF_live8icoord = uvec2(((GLF_live8coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                    uint GLF_live8res1 = uint(((GLF_live8icoord.x * GLF_live8icoord.y) >> (GLF_live8icoord.x & 31u)) & 0xffffffffu);
                    uint GLF_live8res2 = uint(((GLF_live8icoord.x * GLF_live8icoord.y) << (GLF_live8icoord.x & 31u)) & 0xffffffffu);
                    float GLF_live8res = float(((GLF_live8res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_live8res1 & 1u) != 0u ? 1u : 0u));
                    GLF_live8_GLF_color = vec4(GLF_live8res, GLF_live8res, GLF_live8res, 1.0);
                } else {
                    ivec2 GLF_live8icoord = ivec2(((GLF_live8coord - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                    int GLF_live8res3 = ((GLF_live8icoord.x >> 5) & 1) ^ ((GLF_live8icoord.y & 32) >> 5);
                    int GLF_live8res2 = (GLF_live8icoord.y * GLF_live8icoord.y >> 10) & 1;
                    int GLF_live8res1 = (GLF_live8icoord.x * GLF_live8icoord.y >> 9) & 1;
                    GLF_live8_GLF_color = vec4(float(GLF_live8res1 ^ GLF_live8res2), float(GLF_live8res2 & GLF_live8res3), float(GLF_live8res1 | GLF_live8res3), 1.0);
                }
            }
            {
                GLF_live2o = GLF_live2o + GLF_live2o;
                GLF_live2k--;
                if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                } else {
                    int GLF_live4looplimiter0 = 0;
                    if (GLF_live4looplimiter0 >= 7) {
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                            ;
                            {
                                int GLF_live10i = _GLF_FUZZED((-(88490 | 4564)));
                                float GLF_live10limit = _GLF_FUZZED(4114.2457);
                                float GLF_live10ref = _GLF_FUZZED(vec3(15.77, 14.22, -2204.6146).x);
                                float GLF_live10s = _GLF_FUZZED(float(true));
                                {
                                    if (mod(float(GLF_live10i), GLF_live10ref) <= 0.01) {
                                        GLF_live10s += 0.2;
                                    }
                                    if (float(GLF_live10i) >= GLF_live10limit) {
                                        ;
                                    }
                                    GLF_live10i++;
                                }
                            }
                        } else {
                        }
                    }
                }
                if (_GLF_DEAD(false)) {
                    _GLF_color = sqrt(_GLF_color);
                }
            }
        }
    }
    if (_GLF_DEAD(false)) {
        _GLF_color = clamp(vec4(2.0, -444.056, -8.6, -7.6), vec4(-1.3, 67.84, -2.5, 7793.4980), _GLF_color);
    }
    makeTreeNode(tree[0], 9);
    {
        {
            ;
        }
    }
    treeIndex++;
    for (int _injected_loop_counter = (1 | 1); _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
        if (_GLF_DEAD(false)) {
            _GLF_color = _GLF_color;
        }
        if (_GLF_DEAD(false)) {
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                _GLF_color = (-tanh(GLF_live0_GLF_color));
            }
            _GLF_color = (vec4(2390.9457, 2.8, -931.142, -2.4) - (-886.619));
        }
    }
    do {
        insert(treeIndex, 5);
        if (_GLF_DEAD(false)) {
            _GLF_color = (true ? sign(GLF_live0_GLF_color) : GLF_live0_GLF_color);
        }
    } while (_GLF_WRAPPED_LOOP(false));
    treeIndex++;
    do {
        insert(treeIndex, 12);
    } while (_GLF_WRAPPED_LOOP(false));
    do {
        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= log(cos(0.0)))))) {
            if (_GLF_DEAD(false)) {
                _GLF_color = _GLF_color;
            }
            treeIndex++;
        } else {
        }
    } while (_GLF_WRAPPED_LOOP(false));
    do {
        insert(treeIndex, 15);
        {
            vec4 GLF_live10c = _GLF_FUZZED((mat2x4(-2.5, -57.07, 6401.3287, 4275.5959, -277.057, -5.5, -0.3, 4.2) * vec2(901.966, 249.851)));
            int GLF_live10i = _GLF_FUZZED(63316);
            {
                if (GLF_live10c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10i, 4)] >= 1.0) {
                    GLF_live10c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10i, 4)] = GLF_live10c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10i, 4)] * GLF_live10c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10i, 4)];
                }
                GLF_live10i++;
            }
        }
    } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))));
    {
        vec4 GLF_live10c = _GLF_FUZZED(vec4(-95.81, 4.6, 6.8, 6.1));
        int GLF_live10i = _GLF_FUZZED(59086);
        int GLF_live10looplimiter1 = 0;
        {
            if (GLF_live10looplimiter1 >= 7) {
                ;
            }
            GLF_live10looplimiter1++;
            {
                if (GLF_live10c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10i, 4)] >= 1.0) {
                    GLF_live10c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10i, 4)] = GLF_live10c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10i, 4)] * GLF_live10c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10i, 4)];
                }
                GLF_live10i++;
            }
        }
    }
    for (int _injected_loop_counter = ((0 << _GLF_IDENTITY(int(5), int(5))) ^ 1); _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
        {
            vec2 GLF_live8coord = _GLF_FUZZED(vec2(-0.0, -4968.9004));
            if (GLF_live8coord.y < 0.6) {
                uvec2 GLF_live8icoord = uvec2(((GLF_live8coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                uint GLF_live8res1 = uint(((GLF_live8icoord.x * GLF_live8icoord.y) >> (GLF_live8icoord.x & 31u)) & 0xffffffffu);
                uint GLF_live8res2 = uint(((GLF_live8icoord.x * GLF_live8icoord.y) << (GLF_live8icoord.x & 31u)) & 0xffffffffu);
                float GLF_live8res = float(((GLF_live8res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_live8res1 & 1u) != 0u ? 1u : 0u));
                GLF_live8_GLF_color = vec4(GLF_live8res, GLF_live8res, GLF_live8res, 1.0);
            } else {
                ivec2 GLF_live8icoord = ivec2(((GLF_live8coord - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                int GLF_live8res3 = ((GLF_live8icoord.x >> 5) & 1) ^ ((GLF_live8icoord.y & 32) >> 5);
                int GLF_live8res2 = (GLF_live8icoord.y * GLF_live8icoord.y >> 10) & 1;
                int GLF_live8res1 = (GLF_live8icoord.x * GLF_live8icoord.y >> 9) & 1;
                GLF_live8_GLF_color = vec4(float(GLF_live8res1 ^ GLF_live8res2), float(GLF_live8res2 & GLF_live8res3), float(GLF_live8res1 | GLF_live8res3), 1.0);
            }
        }
        treeIndex++;
    }
    if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
            if (_GLF_DEAD(false)) {
                _GLF_color = sign(_GLF_color);
            }
        } else {
        }
    } else {
        insert(treeIndex, 7);
        {
            int GLF_live6i = _GLF_FUZZED(int(false));
            vec2 GLF_live6pos = _GLF_FUZZED(vec2(3.8, -73.14));
            if (_GLF_DEAD(false)) {
                _GLF_color = GLF_live0_GLF_color;
                {
                    vec4 GLF_live10c = _GLF_FUZZED(vec4(3001.2180, 6.1, 1.6, 116.573));
                    int GLF_live10i = _GLF_FUZZED(89683);
                    {
                        if (GLF_live10c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10i, 4)] >= 1.0) {
                            GLF_live10c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10i, 4)] = GLF_live10c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10i, 4)] * GLF_live10c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10i, 4)];
                        }
                        GLF_live10i++;
                    }
                }
            }
            vec4 GLF_live6res = _GLF_FUZZED((172.641 * ((mat3x4(2886.2570, -22.23, -40.08, -416.424, 80.32, -8.5, 6.0, 0.7, -10.17, 4648.0920, -0.1, 4.1) * vec3(-9833.2866, -4.2, -6.1)) * mat4(-5.1, 299.600, 5.5, 0.9, -3.6, 1.7, 4701.2164, 5.6, -878.010, -5.3, -865.576, -5572.7109, 72.26, 8.7, 0.3, -7.8))));
            {
                _GLF_struct_20 _GLF_struct_replacement_20 = _GLF_struct_20(true, mat4x2(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), ivec4(1, 1, 1, 1), _GLF_struct_21(1u, 0, mat2x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), 1.0, bvec3(true, true, true), _GLF_struct_22(ivec3(1, 1, 1), mat4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), ivec2(1, 1), 1.0)));
                for (GLF_live6i = 0; GLF_live6i < 8; GLF_live6i++) {
                    if (_GLF_struct_replacement_20._f3.GLF_live6looplimiter0 >= 3) {
                        break;
                    }
                    {
                        int GLF_live10i = _GLF_FUZZED(-50542);
                        float GLF_live10limit = _GLF_FUZZED((mat4x2(-0.7, 4036.0000, -5.1, 9.5, 37.40, -9.9, -73.42, -9.0) * vec4(-5.6, 10.35, 7.2, 3.7)).s);
                        int GLF_live10looplimiter0 = 0;
                        float GLF_live10ref = _GLF_FUZZED((620.193));
                        float GLF_live10s = _GLF_FUZZED(-1.9);
                        while (GLF_live10i < bitfieldInsert(800, GLF_live10i, 0, 0)) {
                            if (GLF_live10looplimiter0 >= 7) {
                                break;
                            }
                            GLF_live10looplimiter0++;
                            {
                                if (mod(float(GLF_live10i), GLF_live10ref) <= 0.01) {
                                    GLF_live10s += 0.2;
                                }
                                if (float(GLF_live10i) >= GLF_live10limit) {
                                    ;
                                }
                                GLF_live10i++;
                            }
                        }
                    }
                    _GLF_struct_replacement_20._f3.GLF_live6looplimiter0++;
                    {
                        if (GLF_live6collision(GLF_live6pos, GLF_live6picdata[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6i, 8)])) {
                            GLF_live6res = GLF_live6pal[_GLF_MAKE_IN_BOUNDS_INT((int(GLF_live6picdata[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6i, 8)].x) * int(GLF_live6picdata[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6i, 8)].y) + GLF_live6i * 9 + 11) % 16, 16)];
                        }
                    }
                }
            }
            {
                int GLF_live11looplimiter1 = 0;
                if (GLF_live11looplimiter1 >= 5) {
                    ;
                }
            }
        }
    }
    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
        if (_GLF_DEAD(false)) {
            _GLF_color = dFdy(_GLF_color);
        }
        treeIndex++;
    } else {
    }
    if (_GLF_DEAD(false)) {
        _GLF_color = vec4(-98.56, 3.0, 831.143, 1667.1634);
        if (_GLF_DEAD(false)) {
            _GLF_color = mix(vec4(1.6, 91.86, -2.7, -4609.5002), GLF_live0_GLF_color, vec4(-660.483, reflect(vec3(9.6, 62.07, -0.2), vec3(23.46, 3.2, -2.1))));
        }
    }
    insert(treeIndex, 8);
    treeIndex++;
    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= sqrt(0.0))))) {
        {
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                _GLF_color = refract(_GLF_color, GLF_live0_GLF_color, length(_GLF_color));
            }
            int GLF_live7looplimiter0 = 0;
            ivec2 GLF_live7pos = _GLF_FUZZED(ivec2(39438, -71324));
            {
                if (GLF_live7looplimiter0 >= 3) {
                    ;
                }
                GLF_live7looplimiter0++;
                for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
                    if (GLF_live7pos.x < GLF_live7dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live7pos.y, 256)] + 15 && GLF_live7pos.x > GLF_live7dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live7pos.y, 256)] - 15) {
                        float GLF_live7p = (15.0 - abs(float(GLF_live7pos.x - GLF_live7dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live7pos.y, 256)]))) / 15.0;
                        ;
                    }
                    {
                        vec2 GLF_live8coord = _GLF_FUZZED(vec2(4997.8159, 79.74));
                        {
                            ivec2 GLF_live8icoord = ivec2(((GLF_live8coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.6, 1.0)) * 256.0);
                            int GLF_live8v = (GLF_live8icoord.x ^ GLF_live8icoord.y) * GLF_live8icoord.y;
                            bool GLF_live8res1 = ((GLF_live8v >> 10) & 1) != 0;
                            bool GLF_live8res2 = ((GLF_live8v >> 11) & 4) != 0;
                            bool GLF_live8res3 = ((GLF_live8v >> 12) & 8) != 0;
                            GLF_live8_GLF_color = vec4(GLF_live8res1 ? 1.0 : 0.0, GLF_live8res2 ? 1.0 : 0.0, GLF_live8res3 ? 1.0 : 0.0, 1);
                        }
                    }
                    GLF_live7pos.y++;
                }
                {
                    int GLF_live10i = _GLF_FUZZED((+(-35779)));
                    float GLF_live10limit = _GLF_FUZZED((-0.6));
                    int GLF_live10looplimiter0 = 0;
                    float GLF_live10ref = _GLF_FUZZED((2.6));
                    float GLF_live10s = _GLF_FUZZED(vec2(-90.32, -1.1).s);
                    while (GLF_live10i < bitfieldInsert(800, GLF_live10i, 0, 0)) {
                        if (GLF_live10looplimiter0 >= 7) {
                            break;
                        }
                        GLF_live10looplimiter0++;
                        {
                            if (mod(float(GLF_live10i), GLF_live10ref) <= 0.01) {
                                GLF_live10s += 0.2;
                            }
                            if (float(GLF_live10i) >= GLF_live10limit) {
                                ;
                            }
                            GLF_live10i++;
                        }
                    }
                }
                if (_GLF_DEAD(false)) {
                    _GLF_color = tanh(GLF_live0_GLF_color);
                }
            }
        }
        insert(treeIndex, 2);
    } else {
    }
    treeIndex++;
    for (int _injected_loop_counter = (1 & 1); _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
        insert(treeIndex, 6);
    }
    if (_GLF_DEAD(false)) {
        _GLF_color = vec4(1.1, -40.69, 8416.2934, -499.628);
        {
            {
                vec2 GLF_live8coord = _GLF_FUZZED((vec2(333.537, -27.05)));
                {
                    ivec2 GLF_live8icoord = ivec2(((GLF_live8coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.6, 1.0)) * 256.0);
                    int GLF_live8v = (GLF_live8icoord.x ^ GLF_live8icoord.y) * GLF_live8icoord.y;
                    bool GLF_live8res1 = ((GLF_live8v >> 10) & 1) != 0;
                    bool GLF_live8res2 = ((GLF_live8v >> 11) & 4) != 0;
                    bool GLF_live8res3 = ((GLF_live8v >> 12) & 8) != 0;
                    GLF_live8_GLF_color = vec4(GLF_live8res1 ? 1.0 : 0.0, GLF_live8res2 ? 1.0 : 0.0, GLF_live8res3 ? 1.0 : 0.0, 1);
                }
            }
            {
                {
                    {
                        vec2 GLF_live8coord = _GLF_FUZZED(vec2(-8.8, 494.856).yx);
                        if (GLF_live8coord.y < 0.6) {
                            uvec2 GLF_live8icoord = uvec2(((GLF_live8coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                            uint GLF_live8res1 = uint(((GLF_live8icoord.x * GLF_live8icoord.y) >> (GLF_live8icoord.x & 31u)) & 0xffffffffu);
                            uint GLF_live8res2 = uint(((GLF_live8icoord.x * GLF_live8icoord.y) << (GLF_live8icoord.x & 31u)) & 0xffffffffu);
                            float GLF_live8res = float(((GLF_live8res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_live8res1 & 1u) != 0u ? 1u : 0u));
                            GLF_live8_GLF_color = vec4(GLF_live8res, GLF_live8res, GLF_live8res, 1.0);
                        } else {
                            ivec2 GLF_live8icoord = ivec2(((GLF_live8coord - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                            int GLF_live8res3 = ((GLF_live8icoord.x >> 5) & 1) ^ ((GLF_live8icoord.y & 32) >> 5);
                            int GLF_live8res2 = (GLF_live8icoord.y * GLF_live8icoord.y >> 10) & 1;
                            int GLF_live8res1 = (GLF_live8icoord.x * GLF_live8icoord.y >> 9) & 1;
                            GLF_live8_GLF_color = vec4(float(GLF_live8res1 ^ GLF_live8res2), float(GLF_live8res2 & GLF_live8res3), float(GLF_live8res1 | GLF_live8res3), 1.0);
                        }
                    }
                    ;
                }
            }
            int GLF_live2i = _GLF_FUZZED(95569);
            if (GLF_live2i >= int(GLF_live2resolution.x)) {
                ;
            }
        }
    }
    treeIndex++;
    if (_GLF_WRAPPED_IF_FALSE(false)) {
        {
            int GLF_live2j = _GLF_FUZZED(-90240);
            vec3 GLF_live2m = _GLF_FUZZED(vec3(-87.51, -51.01, 5203.4626));
            vec2 GLF_live2n = _GLF_FUZZED((vec2(8.8, -8.3)));
            for (int _injected_loop_counter = (0 ^ 0); _GLF_WRAPPED_LOOP(_injected_loop_counter < (((1 | 1) << _GLF_IDENTITY(int(2), int(2))) >> _GLF_IDENTITY(int(2), _GLF_IDENTITY(int(2), min(int(2), int(2)))))); _injected_loop_counter++) {
                {
                    int GLF_live2looplimiter1 = 0;
                    for (int GLF_live2i = -1; GLF_live2i <= int(GLF_live2injectionSwitch.y); GLF_live2i++) {
                        if (GLF_live2looplimiter1 >= 6) {
                            {
                                vec4 GLF_live10c = _GLF_FUZZED(vec4(-2003.5724, 805.121, 82.81, 195.580));
                                int GLF_live10i = _GLF_FUZZED(-73487);
                                int GLF_live10looplimiter1 = 0;
                                int GLF_live10msb8 = _GLF_FUZZED(-70365);
                                do {
                                    if (GLF_live10looplimiter1 >= 7) {
                                        break;
                                    }
                                    GLF_live10looplimiter1++;
                                    {
                                        if (GLF_live10c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10i, 4)] >= 1.0) {
                                            GLF_live10c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10i, 4)] = GLF_live10c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10i, 4)] * GLF_live10c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10i, 4)];
                                        }
                                        GLF_live10i++;
                                    }
                                } while (GLF_live10i < findMSB(findLSB(GLF_live10msb8)));
                            }
                            break;
                            {
                                vec4 GLF_live10c = _GLF_FUZZED(vec4(float((mat2x4(172.305, 5151.9180, -0.2, -77.71, 492.859, -98.10, -774.529, 8669.7848) == mat2x4(9005.5841, -815.110, 4082.1762, -62.37, -1.3, -517.768, -59.29, -343.910))), vec3(-3.5, 739.322, -4.1)));
                                int GLF_live10i = _GLF_FUZZED(((ivec3(-10633, 90993, -79432) == ivec3(66851, -37367, -59874)) ? (-11734) : (-74539)));
                                {
                                    GLF_live10c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10i, 4)] = GLF_live10c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10i, 4)] * GLF_live10c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10i, 4)];
                                }
                            }
                        }
                        {
                            vec4 GLF_live10c = _GLF_FUZZED((vec4(-0.8, -3.6, -672.062, 3882.4795) * mat4(28.00, -396.371, -7665.3625, -2912.3106, 8.9, -3510.3880, -222.873, -9633.8377, 29.89, -0.3, -65.07, 6964.6119, -354.736, 283.528, -9390.5841, -60.86)));
                            int GLF_live10i = _GLF_FUZZED((+84070));
                            {
                                if (GLF_live10c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10i, 4)] >= 1.0) {
                                    GLF_live10c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10i, 4)] = GLF_live10c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10i, 4)] * GLF_live10c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10i, 4)];
                                }
                                GLF_live10i++;
                            }
                        }
                        if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        } else {
                            GLF_live2looplimiter1++;
                        }
                        {
                            vec2 GLF_live8coord = _GLF_FUZZED(vec2(836.832, 719.468));
                            if (GLF_live8coord.y < 0.6) {
                                uvec2 GLF_live8icoord = uvec2(((GLF_live8coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                                uint GLF_live8res1 = uint(((GLF_live8icoord.x * GLF_live8icoord.y) >> (GLF_live8icoord.x & 31u)) & 0xffffffffu);
                                uint GLF_live8res2 = uint(((GLF_live8icoord.x * GLF_live8icoord.y) << (GLF_live8icoord.x & 31u)) & 0xffffffffu);
                                float GLF_live8res = float(((GLF_live8res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_live8res1 & 1u) != 0u ? 1u : 0u));
                                GLF_live8_GLF_color = vec4(GLF_live8res, GLF_live8res, GLF_live8res, 1.0);
                            } else {
                                ivec2 GLF_live8icoord = ivec2(((GLF_live8coord - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                                int GLF_live8res3 = ((GLF_live8icoord.x >> 5) & 1) ^ ((GLF_live8icoord.y & 32) >> 5);
                                int GLF_live8res2 = (GLF_live8icoord.y * GLF_live8icoord.y >> 10) & 1;
                                int GLF_live8res1 = (GLF_live8icoord.x * GLF_live8icoord.y >> 9) & 1;
                                GLF_live8_GLF_color = vec4(float(GLF_live8res1 ^ GLF_live8res2), float(GLF_live8res2 & GLF_live8res3), float(GLF_live8res1 | GLF_live8res3), 1.0);
                            }
                        }
                        {
                            _GLF_struct_11 _GLF_struct_replacement_11 = _GLF_struct_11(vec3(1.0, 1.0, 1.0), vec2(float(GLF_live2j), float(GLF_live2i)));
                            vec2 GLF_live2o = mix(GLF_live2n, _GLF_struct_replacement_11.GLF_live2g, 0.2);
                            if (GLF_live2injectionSwitch.x < (GLF_live2m.x)) {
                                {
                                    float GLF_live5x = _GLF_FUZZED((vec3(-6.7, -8527.7100, 126.719).g));
                                    float GLF_live5y = _GLF_FUZZED(float(false));
                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                        if (0.0 > GLF_live5resolution.x) {
                                            GLF_live5x = 1.0;
                                            GLF_live5y = 1.0;
                                        }
                                    } else {
                                    }
                                }
                                int GLF_live2k = 1;
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                    {
                                        vec4 GLF_live10c = _GLF_FUZZED(vec4(-54.52, -4.5, 2.8, -6.2));
                                        int GLF_live10i = _GLF_FUZZED(95173);
                                        {
                                            if (GLF_live10c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10i, 4)] >= 1.0) {
                                                GLF_live10c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10i, 4)] = GLF_live10c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10i, 4)] * GLF_live10c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10i, 4)];
                                            }
                                            GLF_live10i++;
                                        }
                                    }
                                    _GLF_color = dFdyFine(vec4(0.2, 1.5, 7.2, -8415.4799));
                                }
                                do {
                                    int GLF_live2looplimiter0 = 0;
                                    {
                                        vec2 GLF_live6pos = _GLF_FUZZED((false ? (vec3(1121.1155, -190.392, -1.7) * mat2x3(3.0, 4.0, -8389.6706, 1.2, -8.8, -7.2)) : vec2(-2.2, -41.27)));
                                        {
                                            int GLF_live10i = _GLF_FUZZED(ivec3(-84685, -46181, 31560).y);
                                            float GLF_live10ref = _GLF_FUZZED(-38.13);
                                            float GLF_live10s = _GLF_FUZZED(((-1889.9814) * 623.752));
                                            if (mod(float(GLF_live10i), GLF_live10ref) <= 0.01) {
                                                GLF_live10s += 0.2;
                                            }
                                        }
                                        _GLF_struct_23 _GLF_struct_replacement_23 = _GLF_struct_23(mat4x3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), _GLF_FUZZED(vec4(735.112, 4.8, -518.758, -22.38)), mat3x2(1.0, 1.0, 1.0, 1.0, 1.0, 1.0), _GLF_struct_24(bvec2(true, true), _GLF_struct_25(true, mat2(1.0, 1.0, 1.0, 1.0))), vec4(1.0, 1.0, 1.0, 1.0), uvec2(1u, 1u), mat3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0));
                                        if (GLF_live6pos.y > _GLF_struct_replacement_23.GLF_live6quad.y + _GLF_struct_replacement_23.GLF_live6quad.w) {
                                            ;
                                        }
                                    }
                                    {
                                        vec2 GLF_live8coord = _GLF_FUZZED(vec2(-4.3, 9.3));
                                        if (GLF_live8coord.y < 0.6) {
                                            uvec2 GLF_live8icoord = uvec2(((GLF_live8coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                                            uint GLF_live8res1 = uint(((GLF_live8icoord.x * GLF_live8icoord.y) >> (GLF_live8icoord.x & 31u)) & 0xffffffffu);
                                            uint GLF_live8res2 = uint(((GLF_live8icoord.x * GLF_live8icoord.y) << (GLF_live8icoord.x & 31u)) & 0xffffffffu);
                                            float GLF_live8res = float(((GLF_live8res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_live8res1 & 1u) != 0u ? 1u : 0u));
                                            GLF_live8_GLF_color = vec4(GLF_live8res, GLF_live8res, GLF_live8res, 1.0);
                                        } else {
                                            ivec2 GLF_live8icoord = ivec2(((GLF_live8coord - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                                            int GLF_live8res3 = ((GLF_live8icoord.x >> 5) & 1) ^ ((GLF_live8icoord.y & 32) >> 5);
                                            int GLF_live8res2 = (GLF_live8icoord.y * GLF_live8icoord.y >> 10) & 1;
                                            int GLF_live8res1 = (GLF_live8icoord.x * GLF_live8icoord.y >> 9) & 1;
                                            GLF_live8_GLF_color = vec4(float(GLF_live8res1 ^ GLF_live8res2), float(GLF_live8res2 & GLF_live8res3), float(GLF_live8res1 | GLF_live8res3), 1.0);
                                        }
                                    }
                                    if (_GLF_WRAPPED_IF_FALSE(false)) {
                                    } else {
                                        while (GLF_live2k >= 0) {
                                            if (GLF_live2looplimiter0 >= 6) {
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                    _GLF_color = vec4(-7.9, 1.0, -5.6, -56.38);
                                                }
                                                {
                                                    vec2 GLF_live6pos = _GLF_FUZZED(vec2(0.1, 644.102));
                                                    vec4 GLF_live6quad = _GLF_FUZZED(vec4(3.0, -84.88, 8113.5519, -298.776));
                                                    if (GLF_live6pos.x < GLF_live6quad.x) {
                                                        ;
                                                    }
                                                }
                                                break;
                                            }
                                            GLF_live2looplimiter0++;
                                            {
                                                GLF_live2o = GLF_live2o + GLF_live2o;
                                                GLF_live2k--;
                                            }
                                        }
                                    }
                                } while (_GLF_WRAPPED_LOOP(false));
                                GLF_live2m = vec3(GLF_live2injectionSwitch.x, cos(GLF_live2o));
                            }
                        }
                    }
                }
                {
                    int GLF_live10looplimiter0 = 0;
                    if (GLF_live10looplimiter0 >= 7) {
                        ;
                    }
                }
            }
        }
    } else {
        insert(treeIndex, 17);
        for (int _injected_loop_counter = (((1 << _GLF_IDENTITY(int(3), int(3))) >> _GLF_IDENTITY(int(3), int(3))) | int(_GLF_ONE(1.0, injectionSwitch.y))); _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < sin(0.0))))) {
                _GLF_color = (-6.5, _GLF_color);
                {
                    vec2 GLF_live8coord = _GLF_FUZZED(((vec2(59.45, 4.0)) + vec2(-48.76, -27.64).r));
                    {
                        uvec2 GLF_live8icoord = uvec2(((GLF_live8coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                        uint GLF_live8res1 = uint(((GLF_live8icoord.x * GLF_live8icoord.y) >> (GLF_live8icoord.x & 31u)) & 0xffffffffu);
                        uint GLF_live8res2 = uint(((GLF_live8icoord.x * GLF_live8icoord.y) << (GLF_live8icoord.x & 31u)) & 0xffffffffu);
                        float GLF_live8res = float(((GLF_live8res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_live8res1 & 1u) != 0u ? 1u : 0u));
                        GLF_live8_GLF_color = vec4(GLF_live8res, GLF_live8res, GLF_live8res, 1.0);
                    }
                }
            }
        }
    }
    {
        {
            ;
        }
    }
    for (int _injected_loop_counter = ((-77686) & (0 | 0)); _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
        treeIndex++;
    }
    insert(treeIndex, 13);
    vec2 z = (gl_FragCoord.yx / resolution);
    {
        vec2 GLF_live8coord = _GLF_FUZZED((vec2(-8.8, -9.1) - (-5.4)));
        if (GLF_live8coord.x > 0.4) {
            if (GLF_live8coord.y < 0.6) {
                uvec2 GLF_live8icoord = uvec2(((GLF_live8coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                uint GLF_live8res1 = uint(((GLF_live8icoord.x * GLF_live8icoord.y) >> (GLF_live8icoord.x & 31u)) & 0xffffffffu);
                uint GLF_live8res2 = uint(((GLF_live8icoord.x * GLF_live8icoord.y) << (GLF_live8icoord.x & 31u)) & 0xffffffffu);
                float GLF_live8res = float(((GLF_live8res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_live8res1 & 1u) != 0u ? 1u : 0u));
                GLF_live8_GLF_color = vec4(GLF_live8res, GLF_live8res, GLF_live8res, 1.0);
            } else {
                ivec2 GLF_live8icoord = ivec2(((GLF_live8coord - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                int GLF_live8res3 = ((GLF_live8icoord.x >> 5) & 1) ^ ((GLF_live8icoord.y & 32) >> 5);
                int GLF_live8res2 = (GLF_live8icoord.y * GLF_live8icoord.y >> 10) & 1;
                int GLF_live8res1 = (GLF_live8icoord.x * GLF_live8icoord.y >> 9) & 1;
                GLF_live8_GLF_color = vec4(float(GLF_live8res1 ^ GLF_live8res2), float(GLF_live8res2 & GLF_live8res3), float(GLF_live8res1 | GLF_live8res3), 1.0);
            }
        } else {
            ivec2 GLF_live8icoord = ivec2(((GLF_live8coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.6, 1.0)) * 256.0);
            int GLF_live8v = (GLF_live8icoord.x ^ GLF_live8icoord.y) * GLF_live8icoord.y;
            bool GLF_live8res1 = ((GLF_live8v >> 10) & 1) != 0;
            bool GLF_live8res2 = ((GLF_live8v >> 11) & 4) != 0;
            bool GLF_live8res3 = ((GLF_live8v >> 12) & 8) != 0;
            GLF_live8_GLF_color = vec4(GLF_live8res1 ? 1.0 : 0.0, GLF_live8res2 ? 1.0 : 0.0, GLF_live8res3 ? 1.0 : 0.0, 1);
        }
    }
    float x = makeFrame(z.x);
    float y = makeFrame(z.y);
    int sum = -100;
    for (int target = 0; target < 20; target++) {
        int result = search(target);
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            if (result > 0) {
                sum += result;
                {
                    int GLF_live5looplimiter0 = 0;
                    if (GLF_live5looplimiter0 >= 7) {
                        ;
                    }
                    {
                        vec2 GLF_live8coord = _GLF_FUZZED(((+(-552.086)) + vec2(-4.8, 50.56)));
                        if (GLF_live8coord.x > 0.4) {
                            if (GLF_live8coord.y < 0.6) {
                                uvec2 GLF_live8icoord = uvec2(((GLF_live8coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                                uint GLF_live8res1 = uint(((GLF_live8icoord.x * GLF_live8icoord.y) >> (GLF_live8icoord.x & 31u)) & 0xffffffffu);
                                uint GLF_live8res2 = uint(((GLF_live8icoord.x * GLF_live8icoord.y) << (GLF_live8icoord.x & 31u)) & 0xffffffffu);
                                float GLF_live8res = float(((GLF_live8res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_live8res1 & 1u) != 0u ? 1u : 0u));
                                GLF_live8_GLF_color = vec4(GLF_live8res, GLF_live8res, GLF_live8res, 1.0);
                            } else {
                                ivec2 GLF_live8icoord = ivec2(((GLF_live8coord - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                                int GLF_live8res3 = ((GLF_live8icoord.x >> 5) & 1) ^ ((GLF_live8icoord.y & 32) >> 5);
                                int GLF_live8res2 = (GLF_live8icoord.y * GLF_live8icoord.y >> 10) & 1;
                                int GLF_live8res1 = (GLF_live8icoord.x * GLF_live8icoord.y >> 9) & 1;
                                GLF_live8_GLF_color = vec4(float(GLF_live8res1 ^ GLF_live8res2), float(GLF_live8res2 & GLF_live8res3), float(GLF_live8res1 | GLF_live8res3), 1.0);
                            }
                        } else {
                            ivec2 GLF_live8icoord = ivec2(((GLF_live8coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.6, 1.0)) * 256.0);
                            int GLF_live8v = (GLF_live8icoord.x ^ GLF_live8icoord.y) * GLF_live8icoord.y;
                            bool GLF_live8res1 = ((GLF_live8v >> 10) & 1) != 0;
                            bool GLF_live8res2 = ((GLF_live8v >> 11) & 4) != 0;
                            bool GLF_live8res3 = ((GLF_live8v >> 12) & 8) != 0;
                            GLF_live8_GLF_color = vec4(GLF_live8res1 ? 1.0 : 0.0, GLF_live8res2 ? 1.0 : 0.0, GLF_live8res3 ? 1.0 : 0.0, 1);
                        }
                    }
                }
            } else {
                switch (result) {
                    case -1:
                        sum += 1;
                        break;
                    case 0:
                        return;
                }
            }
        } else {
        }
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
        if (_GLF_DEAD(false)) {
            _GLF_color = tanh(_GLF_color);
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            if (_GLF_WRAPPED_IF_FALSE(false)) {
            } else {
                _GLF_color = dFdxFine(vec4(-38.36, -560.595, 8207.0996, 52.53));
            }
        }
        _GLF_color = _GLF_color;
    }
    if (_GLF_DEAD(false)) {
        _GLF_color = fwidthCoarse(GLF_live0_GLF_color);
    }
    float a = tan(x + y * float(sum));
    _GLF_color = vec4(hueColor(a), 1.);
    if (_GLF_DEAD(false)) {
        _GLF_color = vec4(1173.9381, 6.0, -8799.4447, 7429.1493);
    }
}
