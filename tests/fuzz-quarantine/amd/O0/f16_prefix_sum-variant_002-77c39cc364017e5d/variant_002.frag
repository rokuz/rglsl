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

layout(set = 0, binding = 1) uniform buf1 {
    vec2 injectionSwitch;
};

layout(set = 0, binding = 2) uniform buf2 {
    vec2 GLF_dead8resolution;
};

vec4 GLF_dead9_GLF_color = _GLF_FUZZED(vec4(72.74, 9.4, -376.693, -9.8));
layout(set = 0, binding = 3) uniform sampler2D GLF_dead7tex;
const float GLF_dead7weights[9] = float[9](1.0, 0.5, -0.25, 0.5, 1.0, -0.5, -0.25, -0.5, -1.0);
vec4 GLF_dead10_GLF_color = _GLF_FUZZED(vec3(-168.335, -110.635, -3.1).tppp);

layout(set = 0, binding = 4) uniform buf4 {
    vec2 GLF_dead10injectionSwitch;
};

float GLF_dead10compute_derivative_x(float GLF_dead10v) {
    return dFdx(GLF_dead10v) * GLF_dead10injectionSwitch.y;
}

float GLF_dead10compute_derivative_y(float GLF_dead10v) {
    return dFdy(GLF_dead10v) * GLF_dead10injectionSwitch.y;
}

float GLF_dead10compute_stripe(float GLF_dead10v) {
    return smoothstep(-.9, 1., (GLF_dead10v) / ((GLF_dead10injectionSwitch.y > GLF_dead10injectionSwitch.x) ? GLF_dead10compute_derivative_x(GLF_dead10v) : GLF_dead10compute_derivative_y(GLF_dead10v)));
}

vec4 GLF_dead4_GLF_color = _GLF_FUZZED(vec4(64.45, 0.3, 244.097, 3.2));

struct GLF_dead4BST {
    int data;
    int leftIndex;
    int rightIndex;
};

GLF_dead4BST GLF_dead4tree[10] = GLF_dead4BST[10](GLF_dead4BST(0, 0, 0), GLF_dead4BST(0, 0, 0), GLF_dead4BST(0, 0, 0), GLF_dead4BST(0, 0, 0), GLF_dead4BST(0, 0, 0), GLF_dead4BST(0, 0, 0), GLF_dead4BST(0, 0, 0), GLF_dead4BST(0, 0, 0), GLF_dead4BST(0, 0, 0), GLF_dead4BST(0, 0, 0));

void GLF_dead4makeTreeNode(inout GLF_dead4BST GLF_dead4tree, int GLF_dead4data) {
    GLF_dead4tree.data = GLF_dead4data;
    if (_GLF_DEAD(false)) {
        vec2 donor_replacementGLF_dead7coord = _GLF_FUZZED(injectionSwitch);
        float donor_replacementGLF_dead7uvstep = _GLF_FUZZED(-812.575);
        {
            for (int GLF_dead7j = 0; GLF_dead7j < 3; GLF_dead7j++) {
                GLF_dead4_GLF_color += texture(GLF_dead7tex, donor_replacementGLF_dead7coord + vec2(float(GLF_dead4data - 1) * donor_replacementGLF_dead7uvstep, float(GLF_dead7j - 1) * donor_replacementGLF_dead7uvstep)) * GLF_dead7weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead4data * 3 + GLF_dead7j, 9)];
            }
        }
    }
    GLF_dead4tree.leftIndex = -1;
    GLF_dead4tree.rightIndex = -1;
}

vec4 GLF_dead6_GLF_color = _GLF_FUZZED(vec4(9.3, 5.6, -26.74, 9.1));
int GLF_dead6map[16 * 16] = int[256](0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);

struct GLF_dead3QuicksortObject {
    int numbers[10];
};

GLF_dead3QuicksortObject GLF_dead3obj = GLF_dead3QuicksortObject(int[10](0, 0, 0, 0, 0, 0, 0, 0, 0, 0));
vec4 GLF_dead5_GLF_color = _GLF_FUZZED(vec4(857.514, 8.1, -35.43, 1.2));

layout(set = 0, binding = 5) uniform buf5 {
    vec2 GLF_dead5injectionSwitch;
};

float GLF_dead5compute_derivative_x(float GLF_dead5v) {
    return dFdx(GLF_dead5v) * GLF_dead5injectionSwitch.y;
}

float GLF_dead5compute_derivative_y(float GLF_dead5v) {
    return dFdy(GLF_dead5v) * GLF_dead5injectionSwitch.y;
}

float GLF_dead5compute_stripe(float GLF_dead5v) {
    return smoothstep(-.9, 1., (GLF_dead5v) / ((GLF_dead5injectionSwitch.y > GLF_dead5injectionSwitch.x) ? GLF_dead5compute_derivative_x(GLF_dead5v) : GLF_dead5compute_derivative_y(GLF_dead5v)));
}

layout(set = 0, binding = 6) uniform buf6 {
    vec2 GLF_dead0injectionSwitch;
};

layout(set = 0, binding = 7) uniform buf7 {
    vec2 GLF_dead2injectionSwitch;
};

layout(location = 0) out vec4 _GLF_color;

layout(set = 0, binding = 0) uniform buf0 {
    vec2 resolution;
};

void main() {
    float A[50];
    if (_GLF_DEAD(false)) {
        _GLF_color = dFdy(_GLF_color);
    }
    if (_GLF_DEAD(false)) {
        vec3 donor_replacementGLF_dead3color = _GLF_FUZZED(vec3(-131.633, -7377.8666, -0.0));
        do {
            for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != int(_GLF_ONE(1.0, injectionSwitch.y))); _injected_loop_counter++) {
                donor_replacementGLF_dead3color.x += float(GLF_dead3obj.numbers[5]);
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < sin(0.0))))) {
                vec2 donor_replacementGLF_dead9coord = _GLF_FUZZED(tanh(vec2(6.0, -5.7)));
                if (donor_replacementGLF_dead9coord.y < 0.6) {
                    uvec2 GLF_dead9icoord = uvec2(((donor_replacementGLF_dead9coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                    uint GLF_dead9res1 = uint(((GLF_dead9icoord.x * GLF_dead9icoord.y) >> (GLF_dead9icoord.x & 31u)) & 0xffffffffu);
                    uint GLF_dead9res2 = uint(((GLF_dead9icoord.x * GLF_dead9icoord.y) << (GLF_dead9icoord.x & 31u)) & 0xffffffffu);
                    float GLF_dead9res = float(((GLF_dead9res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_dead9res1 & 1u) != 0u ? 1u : 0u));
                    GLF_dead9_GLF_color = vec4(GLF_dead9res, GLF_dead9res, GLF_dead9res, 1.0);
                } else {
                    ivec2 GLF_dead9icoord = ivec2(((donor_replacementGLF_dead9coord - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                    int GLF_dead9res3 = ((GLF_dead9icoord.x >> 5) & 1) ^ ((GLF_dead9icoord.y & 32) >> 5);
                    int GLF_dead9res2 = (GLF_dead9icoord.y * GLF_dead9icoord.y >> 10) & 1;
                    int GLF_dead9res1 = (GLF_dead9icoord.x * GLF_dead9icoord.y >> 9) & 1;
                    GLF_dead9_GLF_color = vec4(float(GLF_dead9res1 ^ GLF_dead9res2), float(GLF_dead9res2 & GLF_dead9res3), float(GLF_dead9res1 | GLF_dead9res3), 1.0);
                }
            }
        } while (_GLF_WRAPPED_LOOP(false));
    }
    for (int i = 0; i < 200; i++) {
        if (_GLF_DEAD(false)) {
            if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            } else {
                _GLF_color = reflect(_GLF_color, unpackSnorm4x8(min(134102u, 25150u)));
            }
        }
        if (i >= int(resolution.x)) {
            break;
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                _GLF_color = _GLF_color;
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < length(vec3(0.0, 0.0, 0.0)))))) {
                    int donor_replacementGLF_dead4treeIndex = _GLF_FUZZED((+i));
                    if (GLF_dead4tree[_GLF_MAKE_IN_BOUNDS_INT(i, 10)].rightIndex == -1) {
                        GLF_dead4tree[_GLF_MAKE_IN_BOUNDS_INT(i, 10)].rightIndex = donor_replacementGLF_dead4treeIndex;
                        GLF_dead4makeTreeNode(GLF_dead4tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4treeIndex, 10)], i);
                        return;
                    } else {
                        i = GLF_dead4tree[_GLF_MAKE_IN_BOUNDS_INT(i, 10)].rightIndex;
                        continue;
                        if (_GLF_DEAD(false)) {
                            bool donor_replacementGLF_dead10c1 = _GLF_FUZZED(false);
                            bool donor_replacementGLF_dead10c2 = _GLF_FUZZED((uvec2(106980u, 162368u) == (58785u ^ uvec2(11665u, 110093u))));
                            bool donor_replacementGLF_dead10c3 = _GLF_FUZZED(bool(6.1));
                            vec3 donor_replacementGLF_dead10col = _GLF_FUZZED(log(vec3(8.2, -58.42, -730.545)));
                            vec2 donor_replacementGLF_dead10uv = _GLF_FUZZED((GLF_dead5_GLF_color * (mat2x4(7.1, 5270.1345, 5.8, -7549.9714, 89.24, 1101.0236, 121.834, 78.28) - (-1.1))));
                            if (!donor_replacementGLF_dead10c1 && !donor_replacementGLF_dead10c2 && donor_replacementGLF_dead10c3) {
                                float GLF_dead10stripe = GLF_dead10compute_stripe(cos((donor_replacementGLF_dead10uv.x + donor_replacementGLF_dead10uv.y) * 20.0));
                                donor_replacementGLF_dead10col = mix(vec3(.7, sinh(donor_replacementGLF_dead10uv.x), donor_replacementGLF_dead10uv.x), vec3(.3, .5, donor_replacementGLF_dead10uv.x), GLF_dead10stripe);
                                GLF_dead10_GLF_color = vec4(donor_replacementGLF_dead10col, 1.0);
                                return;
                            }
                        }
                    }
                }
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < log(1.0))))) {
                _GLF_color = mat2x4(-7.1, 2.1, -5886.3131, 4.0, 5026.9181, -7.2, -7.1, 2.5)[1];
            }
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            vec2 donor_replacementGLF_dead9coord = _GLF_FUZZED(GLF_dead2injectionSwitch);
            {
                ivec2 GLF_dead9icoord = ivec2(((donor_replacementGLF_dead9coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.6, 1.0)) * 256.0);
                int GLF_dead9v = (GLF_dead9icoord.x ^ GLF_dead9icoord.y) * GLF_dead9icoord.y;
                bool GLF_dead9res1 = ((GLF_dead9v >> 10) & 1) != 0;
                bool GLF_dead9res2 = ((GLF_dead9v >> 11) & 4) != 0;
                bool GLF_dead9res3 = ((GLF_dead9v >> 12) & 8) != 0;
                GLF_dead9_GLF_color = vec4(GLF_dead9res1 ? 1.0 : 0.0, GLF_dead9res2 ? 1.0 : 0.0, GLF_dead9res3 ? 1.0 : 0.0, 1);
            }
        }
        for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != int(_GLF_ZERO(0.0, injectionSwitch.x))); _injected_loop_counter--) {
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                int donor_replacementGLF_dead2j = _GLF_FUZZED(19816);
                vec3 donor_replacementGLF_dead2m = _GLF_FUZZED(vec3(-47.99, 6.8, -5.3));
                vec2 donor_replacementGLF_dead2n = _GLF_FUZZED((mat4x2(4.9, 9.0, 5310.7177, 44.51, -2721.6674, -8.1, -16.56, 8.2) * _GLF_color));
                for (int GLF_dead2i = -1; GLF_dead2i <= int(GLF_dead2injectionSwitch.y); GLF_dead2i++) {
                    vec2 GLF_dead2g = vec2(float(donor_replacementGLF_dead2j), float(GLF_dead2i));
                    vec2 GLF_dead2o = mix(donor_replacementGLF_dead2n, GLF_dead2g, 0.2);
                    if (GLF_dead2injectionSwitch.x < (donor_replacementGLF_dead2m.x)) {
                        int GLF_dead2k = 1;
                        if (_GLF_DEAD(false)) {
                            _GLF_color = _GLF_color;
                        }
                        while (GLF_dead2k >= 0) {
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                int donor_replacementGLF_dead7i = _GLF_FUZZED(-11538);
                                float donor_replacementGLF_dead7uvstep = _GLF_FUZZED(log(-77.09));
                                {
                                    for (int GLF_dead7j = 0; GLF_dead7j < 3; GLF_dead7j++) {
                                        _GLF_color += texture(GLF_dead7tex, GLF_dead2o + vec2(float(donor_replacementGLF_dead7i - 1) * donor_replacementGLF_dead7uvstep, float(GLF_dead7j - 1) * donor_replacementGLF_dead7uvstep)) * GLF_dead7weights[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead7i * 3 + GLF_dead7j, 9)];
                                    }
                                }
                            }
                            GLF_dead2o = GLF_dead2o + GLF_dead2o;
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < sqrt(0.0))))) {
                                _GLF_color = _GLF_color;
                                do {
                                    if (_GLF_DEAD(false)) {
                                        vec3 donor_replacementGLF_dead5col = _GLF_FUZZED(vec3(4002.6543, -458.573, -6094.5186));
                                        {
                                            vec4 _GLF_outVarBackup_GLF_color;
                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                            _GLF_color = vec4(-7445.1111, 5262.1897, 5.0, -273.902);
                                            do {
                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                }
                                            } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_ZERO(0.0, injectionSwitch.x)))));
                                        }
                                        vec2 donor_replacementGLF_dead5uv = _GLF_FUZZED(vec2(4580.9798, -8162.4745));
                                        {
                                            float GLF_dead5stripe = GLF_dead5compute_stripe(cos((donor_replacementGLF_dead5uv.x + donor_replacementGLF_dead5uv.y) * 20.0));
                                            donor_replacementGLF_dead5col = mix(vec3(donor_replacementGLF_dead5uv.x, 0, 0.75), vec3(.8, .7, donor_replacementGLF_dead5uv.x), GLF_dead5stripe);
                                            GLF_dead5_GLF_color = vec4(donor_replacementGLF_dead5col, 1.0);
                                            return;
                                            {
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                    bool donor_replacementGLF_dead10c1 = _GLF_FUZZED((bvec4(true, false, false, true) != bvec4(false, true, false, false)));
                                                    vec3 donor_replacementGLF_dead10col = _GLF_FUZZED(inversesqrt(vec3(-2.4, GLF_dead2g)));
                                                    if (donor_replacementGLF_dead10c1) {
                                                        float GLF_dead10stripe = GLF_dead10compute_stripe(cos((GLF_dead2o.x + GLF_dead2o.y) * 20.0));
                                                        donor_replacementGLF_dead10col = mix(vec3(GLF_dead2o.x, 0, 0.75), vec3(.8, .7, GLF_dead2o.x), GLF_dead10stripe);
                                                        if (_GLF_WRAPPED_IF_FALSE(_GLF_IDENTITY(false, !(!(false))))) {
                                                        } else {
                                                            GLF_dead10_GLF_color = vec4(donor_replacementGLF_dead10col, 1.0);
                                                        }
                                                        return;
                                                    }
                                                }
                                                vec4 _GLF_outVarBackup_GLF_color;
                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                    vec3 donor_replacementGLF_dead10col = _GLF_FUZZED(min(donor_replacementGLF_dead5col, donor_replacementGLF_dead5col));
                                                    {
                                                        float GLF_dead10stripe = GLF_dead10compute_stripe(tan((GLF_dead2g.x + GLF_dead2g.y) * 20.0));
                                                        donor_replacementGLF_dead10col = mix(vec3(0.5, GLF_dead2g.x, 0.1), vec3(.4, 0, .5), GLF_dead10stripe);
                                                        GLF_dead10_GLF_color = vec4(donor_replacementGLF_dead10col, 1.0);
                                                        return;
                                                    }
                                                }
                                                _GLF_color = vec4(9871.2835, 6.4, -0.3, 2.8);
                                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                }
                                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                    int donor_replacementGLF_dead7i = _GLF_FUZZED(int(true));
                                                    int donor_replacementGLF_dead7j = _GLF_FUZZED(donor_replacementGLF_dead2j);
                                                    float donor_replacementGLF_dead7uvstep = _GLF_FUZZED(GLF_dead5stripe);
                                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                        GLF_dead4_GLF_color += texture(GLF_dead7tex, GLF_dead2g + vec2(float(donor_replacementGLF_dead7i - 1) * donor_replacementGLF_dead7uvstep, float(donor_replacementGLF_dead7j - 1) * donor_replacementGLF_dead7uvstep)) * GLF_dead7weights[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead7i * 3 + donor_replacementGLF_dead7j, 9)];
                                                    } else {
                                                    }
                                                }
                                            }
                                            if (_GLF_DEAD(false)) {
                                                bool donor_replacementGLF_dead10c1 = _GLF_FUZZED(false);
                                                bool donor_replacementGLF_dead10c2 = _GLF_FUZZED(true);
                                                bool donor_replacementGLF_dead10c3 = _GLF_FUZZED(bool(136149u));
                                                bool donor_replacementGLF_dead10c4 = _GLF_FUZZED((((-mat2x4(4919.0376, 453.975, -784.649, -9.0, 81.66, 1.3, -502.360, 5.1)) * mat4x2(3.6, -40.62, -9.2, -1528.4130, -2.8, 4295.3283, 3284.7752, 53.11)) == mat4(mat4x2(-48.93, -971.626, -10.93, -1.0, -524.507, 7.7, -53.41, -1.3))));
                                                vec3 donor_replacementGLF_dead10col = _GLF_FUZZED(clamp(vec3(-612.411, 599.124, -1.1), GLF_dead5stripe, GLF_dead5stripe));
                                                if (!donor_replacementGLF_dead10c1 && !donor_replacementGLF_dead10c2 && !donor_replacementGLF_dead10c3 && donor_replacementGLF_dead10c4) {
                                                    float GLF_dead10stripe = GLF_dead10compute_stripe(tan((donor_replacementGLF_dead2n.x + donor_replacementGLF_dead2n.y) * 20.0));
                                                    donor_replacementGLF_dead10col = mix(vec3(donor_replacementGLF_dead2n.x, .8, 0), vec3(1, donor_replacementGLF_dead2n.y, 0), GLF_dead10stripe);
                                                    GLF_dead10_GLF_color = vec4(donor_replacementGLF_dead10col, 1.0);
                                                    return;
                                                }
                                            }
                                        }
                                    }
                                } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))));
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < length(vec3(0.0, 0.0, 0.0)))))) {
                                {
                                    ivec2 GLF_dead9icoord = ivec2(((GLF_dead2g - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                                    int GLF_dead9res3 = ((GLF_dead9icoord.x >> 5) & 1) ^ ((GLF_dead9icoord.y & 32) >> 5);
                                    int GLF_dead9res2 = (GLF_dead9icoord.y * GLF_dead9icoord.y >> 10) & 1;
                                    int GLF_dead9res1 = (GLF_dead9icoord.x * GLF_dead9icoord.y >> 9) & 1;
                                    GLF_dead9_GLF_color = vec4(float(GLF_dead9res1 ^ GLF_dead9res2), float(GLF_dead9res2 & GLF_dead9res3), float(GLF_dead9res1 | GLF_dead9res3), 1.0);
                                }
                            }
                            GLF_dead2k--;
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                bool donor_replacementGLF_dead6canwalk = _GLF_FUZZED((GLF_dead2k > GLF_dead2k));
                                int donor_replacementGLF_dead6i = _GLF_FUZZED(i);
                                ivec2 donor_replacementGLF_dead6ipos = _GLF_FUZZED(ivec2(-69456, 78660));
                                ivec2 donor_replacementGLF_dead6p = _GLF_FUZZED(ivec2(GLF_dead2i));
                                int donor_replacementGLF_dead6v = _GLF_FUZZED(i);
                                {
                                    donor_replacementGLF_dead6v++;
                                    int GLF_dead6directions = 0;
                                    if (donor_replacementGLF_dead6p.x > 0 && GLF_dead6map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead6p.x - 2) + (donor_replacementGLF_dead6p.y) * 16, 256)] == 0) {
                                        GLF_dead6directions += 1;
                                    }
                                    if (donor_replacementGLF_dead6p.y > 0 && GLF_dead6map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead6p.x) + (donor_replacementGLF_dead6p.y - 2) * 16, 256)] == 0) {
                                        GLF_dead6directions += 1;
                                    }
                                    if (donor_replacementGLF_dead6p.x < 14 && GLF_dead6map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead6p.x + 2) + (donor_replacementGLF_dead6p.y) * 16, 256)] == 0) {
                                        GLF_dead6directions += 1;
                                    }
                                    for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
                                        if (_GLF_DEAD(false)) {
                                            vec2 donor_replacementGLF_dead10uv = _GLF_FUZZED(donor_replacementGLF_dead2n);
                                            {
                                                float GLF_dead10stripe = GLF_dead10compute_stripe(cos((donor_replacementGLF_dead10uv.x + donor_replacementGLF_dead10uv.y) * 20.0));
                                                donor_replacementGLF_dead2m = mix(vec3(.7, sinh(donor_replacementGLF_dead10uv.x), donor_replacementGLF_dead10uv.x), vec3(.3, .5, donor_replacementGLF_dead10uv.x), GLF_dead10stripe);
                                                GLF_dead10_GLF_color = vec4(donor_replacementGLF_dead2m, 1.0);
                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                    return;
                                                } else {
                                                }
                                            }
                                        }
                                    }
                                    if (donor_replacementGLF_dead6p.y < 14 && GLF_dead6map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead6p.x) + (donor_replacementGLF_dead6p.y + 2) * 16, 256)] == 0) {
                                        GLF_dead6directions += 1;
                                        if (_GLF_DEAD(false)) {
                                            int donor_replacementGLF_dead7j = _GLF_FUZZED(-11256);
                                            float donor_replacementGLF_dead7uvstep = _GLF_FUZZED(log2(-1.7));
                                            {
                                                GLF_dead5_GLF_color += texture(GLF_dead7tex, donor_replacementGLF_dead2n + vec2(float(donor_replacementGLF_dead2j - 1) * donor_replacementGLF_dead7uvstep, float(donor_replacementGLF_dead7j - 1) * donor_replacementGLF_dead7uvstep)) * GLF_dead7weights[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead2j * 3 + donor_replacementGLF_dead7j, 9)];
                                            }
                                        }
                                    }
                                    if (GLF_dead6directions == 0) {
                                        if (_GLF_WRAPPED_IF_FALSE(false)) {
                                        } else {
                                            donor_replacementGLF_dead6canwalk = false;
                                        }
                                        int GLF_dead6j = _GLF_FUZZED(81297);
                                        for (donor_replacementGLF_dead6i = 0; donor_replacementGLF_dead6i < 8; donor_replacementGLF_dead6i++) {
                                            for (GLF_dead6j = 0; GLF_dead6j < 8; GLF_dead6j++) {
                                                if (GLF_dead6map[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6j * 2 + donor_replacementGLF_dead6i * 2 * 16, 256)] == 0) {
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                        float donor_replacementGLF_dead7uvstep = _GLF_FUZZED((+4.5));
                                                        for (int GLF_dead7i = 0; GLF_dead7i < 3; GLF_dead7i++) {
                                                            for (int GLF_dead7j = 0; GLF_dead7j < 3; GLF_dead7j++) {
                                                                GLF_dead5_GLF_color += texture(GLF_dead7tex, GLF_dead2g + vec2(float(GLF_dead7i - 1) * donor_replacementGLF_dead7uvstep, float(GLF_dead7j - 1) * donor_replacementGLF_dead7uvstep)) * GLF_dead7weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead7i * 3 + GLF_dead7j, 9)];
                                                            }
                                                        }
                                                    }
                                                    donor_replacementGLF_dead6p.x = GLF_dead6j * 2;
                                                    donor_replacementGLF_dead6p.y = donor_replacementGLF_dead6i * 2;
                                                    donor_replacementGLF_dead6canwalk = true;
                                                }
                                            }
                                        }
                                        GLF_dead6map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead6p.x) + (donor_replacementGLF_dead6p.y) * 16, 256)] = 1;
                                    } else {
                                        int GLF_dead6d = donor_replacementGLF_dead6v % GLF_dead6directions;
                                        {
                                            if (_GLF_DEAD(false)) {
                                                vec2 donor_replacementGLF_dead9coord = _GLF_FUZZED(GLF_dead5injectionSwitch);
                                                if (donor_replacementGLF_dead9coord.x > 0.4) {
                                                    if (donor_replacementGLF_dead9coord.y < 0.6) {
                                                        uvec2 GLF_dead9icoord = uvec2(((donor_replacementGLF_dead9coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                                                        uint GLF_dead9res1 = uint(((GLF_dead9icoord.x * GLF_dead9icoord.y) >> (GLF_dead9icoord.x & 31u)) & 0xffffffffu);
                                                        uint GLF_dead9res2 = uint(((GLF_dead9icoord.x * GLF_dead9icoord.y) << (GLF_dead9icoord.x & 31u)) & 0xffffffffu);
                                                        float GLF_dead9res = float(((GLF_dead9res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_dead9res1 & 1u) != 0u ? 1u : 0u));
                                                        GLF_dead9_GLF_color = vec4(GLF_dead9res, GLF_dead9res, GLF_dead9res, 1.0);
                                                    } else {
                                                        ivec2 GLF_dead9icoord = ivec2(((donor_replacementGLF_dead9coord - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                                                        int GLF_dead9res3 = ((GLF_dead9icoord.x >> 5) & 1) ^ ((GLF_dead9icoord.y & 32) >> 5);
                                                        int GLF_dead9res2 = (GLF_dead9icoord.y * GLF_dead9icoord.y >> 10) & 1;
                                                        int GLF_dead9res1 = (GLF_dead9icoord.x * GLF_dead9icoord.y >> 9) & 1;
                                                        GLF_dead9_GLF_color = vec4(float(GLF_dead9res1 ^ GLF_dead9res2), float(GLF_dead9res2 & GLF_dead9res3), float(GLF_dead9res1 | GLF_dead9res3), 1.0);
                                                    }
                                                } else {
                                                    ivec2 GLF_dead9icoord = ivec2(((donor_replacementGLF_dead9coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.6, 1.0)) * 256.0);
                                                    int GLF_dead9v = (GLF_dead9icoord.x ^ GLF_dead9icoord.y) * GLF_dead9icoord.y;
                                                    bool GLF_dead9res1 = ((GLF_dead9v >> 10) & 1) != 0;
                                                    bool GLF_dead9res2 = ((GLF_dead9v >> 11) & 4) != 0;
                                                    bool GLF_dead9res3 = ((GLF_dead9v >> 12) & 8) != 0;
                                                    GLF_dead9_GLF_color = vec4(GLF_dead9res1 ? 1.0 : 0.0, GLF_dead9res2 ? 1.0 : 0.0, GLF_dead9res3 ? 1.0 : 0.0, 1);
                                                }
                                            }
                                            vec4 _GLF_outVarBackup_GLF_color;
                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                            _GLF_color = log2(vec4(5797.9604, 7.9, 96.06, -8.4));
                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                            }
                                        }
                                        donor_replacementGLF_dead6v += GLF_dead6directions;
                                        if (GLF_dead6d >= 0 && donor_replacementGLF_dead6p.x > 0 && GLF_dead6map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead6p.x - 2) + (donor_replacementGLF_dead6p.y) * 16, 256)] == 0) {
                                            do {
                                                GLF_dead6d--;
                                            } while (_GLF_WRAPPED_LOOP(false));
                                            GLF_dead6map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead6p.x) + (donor_replacementGLF_dead6p.y) * 16, 256)] = 1;
                                            if (_GLF_DEAD(false)) {
                                                bool donor_replacementGLF_dead10c3 = _GLF_FUZZED(false);
                                                vec2 donor_replacementGLF_dead10uv = _GLF_FUZZED(GLF_dead0injectionSwitch);
                                                if (!donor_replacementGLF_dead6canwalk && !donor_replacementGLF_dead6canwalk && donor_replacementGLF_dead10c3) {
                                                    float GLF_dead10stripe = GLF_dead10compute_stripe(cos((donor_replacementGLF_dead10uv.x + donor_replacementGLF_dead10uv.y) * 20.0));
                                                    donor_replacementGLF_dead2m = mix(vec3(.7, sinh(donor_replacementGLF_dead10uv.x), donor_replacementGLF_dead10uv.x), vec3(.3, .5, donor_replacementGLF_dead10uv.x), GLF_dead10stripe);
                                                    GLF_dead10_GLF_color = vec4(donor_replacementGLF_dead2m, 1.0);
                                                    return;
                                                }
                                            }
                                            GLF_dead6map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead6p.x - 1) + (donor_replacementGLF_dead6p.y) * 16, 256)] = 1;
                                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                vec2 donor_replacementGLF_dead7coord = _GLF_FUZZED(GLF_dead5injectionSwitch);
                                                int donor_replacementGLF_dead7i = _GLF_FUZZED(sign(GLF_dead6directions));
                                                float donor_replacementGLF_dead7uvstep = _GLF_FUZZED(sqrt(9.1));
                                                for (int GLF_dead7j = 0; GLF_dead7j < 3; GLF_dead7j++) {
                                                    _GLF_color += texture(GLF_dead7tex, donor_replacementGLF_dead7coord + vec2(float(donor_replacementGLF_dead7i - 1) * donor_replacementGLF_dead7uvstep, float(GLF_dead7j - 1) * donor_replacementGLF_dead7uvstep)) * GLF_dead7weights[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead7i * 3 + GLF_dead7j, 9)];
                                                }
                                            }
                                            GLF_dead6map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead6p.x - 2) + (donor_replacementGLF_dead6p.y) * 16, 256)] = 1;
                                            donor_replacementGLF_dead6p.x -= 2;
                                        }
                                        if (GLF_dead6d >= 0 && donor_replacementGLF_dead6p.y > 0 && GLF_dead6map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead6p.x) + (donor_replacementGLF_dead6p.y - 2) * 16, 256)] == 0) {
                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                GLF_dead6d--;
                                            } else {
                                            }
                                            do {
                                                GLF_dead6map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead6p.x) + (donor_replacementGLF_dead6p.y) * 16, 256)] = 1;
                                            } while (_GLF_WRAPPED_LOOP(false));
                                            GLF_dead6map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead6p.x) + (donor_replacementGLF_dead6p.y - 1) * 16, 256)] = 1;
                                            GLF_dead6map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead6p.x) + (donor_replacementGLF_dead6p.y - 2) * 16, 256)] = 1;
                                            {
                                                vec4 _GLF_outVarBackup_GLF_color;
                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                _GLF_color = ((7972.2963 / mat2x4(-34.57, 1.6, 7104.6253, 5.6, -3.7, 67.73, 318.634, 647.033)) * mix(vec2(20.13, -346.333), vec2(6.2, -993.885), vec2(8740.5566, 0.6)));
                                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                }
                                            }
                                            donor_replacementGLF_dead6p.y -= 2;
                                        }
                                        if (GLF_dead6d >= 0 && donor_replacementGLF_dead6p.x < 14 && GLF_dead6map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead6p.x + 2) + (donor_replacementGLF_dead6p.y) * 16, 256)] == 0) {
                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                GLF_dead6d--;
                                            } else {
                                            }
                                            GLF_dead6map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead6p.x) + (donor_replacementGLF_dead6p.y) * 16, 256)] = 1;
                                            GLF_dead6map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead6p.x + 1) + (donor_replacementGLF_dead6p.y) * 16, 256)] = 1;
                                            GLF_dead6map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead6p.x + 2) + (donor_replacementGLF_dead6p.y) * 16, 256)] = 1;
                                            donor_replacementGLF_dead6p.x += 2;
                                        }
                                        if (GLF_dead6d >= 0 && donor_replacementGLF_dead6p.y < 14 && GLF_dead6map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead6p.x) + (donor_replacementGLF_dead6p.y + 2) * 16, 256)] == 0) {
                                            GLF_dead6d--;
                                            GLF_dead6map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead6p.x) + (donor_replacementGLF_dead6p.y) * 16, 256)] = 1;
                                            GLF_dead6map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead6p.x) + (donor_replacementGLF_dead6p.y + 1) * 16, 256)] = 1;
                                            GLF_dead6map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead6p.x) + (donor_replacementGLF_dead6p.y + 2) * 16, 256)] = 1;
                                            donor_replacementGLF_dead6p.y += 2;
                                        }
                                    }
                                    if (_GLF_DEAD(false)) {
                                        vec3 donor_replacementGLF_dead10col = _GLF_FUZZED(donor_replacementGLF_dead2m);
                                        vec2 donor_replacementGLF_dead10uv = _GLF_FUZZED(donor_replacementGLF_dead2n);
                                        for (int _injected_loop_counter = (0 >> _GLF_IDENTITY(int(8), _GLF_IDENTITY(int(8), (true ? int(8) : _GLF_FUZZED(donor_replacementGLF_dead2j))))); _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
                                            float GLF_dead10stripe = GLF_dead10compute_stripe(cos((donor_replacementGLF_dead10uv.x + donor_replacementGLF_dead10uv.y) * 20.0));
                                            do {
                                                donor_replacementGLF_dead10col = mix(vec3(.7, sinh(donor_replacementGLF_dead10uv.x), donor_replacementGLF_dead10uv.x), vec3(.3, .5, donor_replacementGLF_dead10uv.x), GLF_dead10stripe);
                                            } while (_GLF_WRAPPED_LOOP(false));
                                            GLF_dead10_GLF_color = vec4(donor_replacementGLF_dead10col, 1.0);
                                            return;
                                        }
                                    }
                                    if (GLF_dead6map[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead6ipos.y * 16 + donor_replacementGLF_dead6ipos.x, 256)] == 1) {
                                        GLF_dead6_GLF_color = vec4(1.0, 1.0, 1.0, 1.0);
                                        return;
                                    }
                                }
                            }
                            if (_GLF_DEAD(false)) {
                                _GLF_color = trunc(_GLF_color);
                            }
                        }
                        for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = vec4(-2293.4657, -43.71, 6.3, 4.7);
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(true, _GLF_IDENTITY(bool(bvec3(true, false, true)), bool(bvec2(bool(bvec3(true, false, true)), false)))))) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                        donor_replacementGLF_dead2m = vec3(GLF_dead2injectionSwitch.x, cos(GLF_dead2o));
                    }
                }
            }
        }
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= determinant(mat4(0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, sqrt(0.0), determinant(mat3(0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0)), 1.0, 1.0, 0.0)))))) {
                if (_GLF_DEAD(false)) {
                    bool donor_replacementGLF_dead10c1 = _GLF_FUZZED((acosh(0.5) != (-0.2)));
                    vec3 donor_replacementGLF_dead10col = _GLF_FUZZED(vec3(-4150.9439, -3892.2565, -67.15));
                    vec2 donor_replacementGLF_dead10uv = _GLF_FUZZED(GLF_dead2injectionSwitch);
                    if (_GLF_WRAPPED_IF_FALSE(false)) {
                    } else {
                        if (donor_replacementGLF_dead10c1) {
                            float GLF_dead10stripe = GLF_dead10compute_stripe(cos((donor_replacementGLF_dead10uv.x + donor_replacementGLF_dead10uv.y) * 20.0));
                            donor_replacementGLF_dead10col = mix(vec3(donor_replacementGLF_dead10uv.x, 0, 0.75), vec3(.8, .7, donor_replacementGLF_dead10uv.x), GLF_dead10stripe);
                            GLF_dead10_GLF_color = vec4(donor_replacementGLF_dead10col, 1.0);
                            return;
                        }
                    }
                }
            } else {
            }
            _GLF_color = (9.8 + vec4(-269.889, -1669.1965, 4235.9457, -9751.3649));
            if (_GLF_DEAD(false)) {
                bool donor_replacementGLF_dead10c1 = _GLF_FUZZED(((ivec4(-12514, 47478, -48364, -75128) ^ ivec4(49525, 86467, -98769, -26790)) != ivec4(-42433, -54531, 8653, -82263)));
                vec3 donor_replacementGLF_dead10col = _GLF_FUZZED(vec3(8.7, -321.853, -5.6));
                vec2 donor_replacementGLF_dead10uv = _GLF_FUZZED(ceil(GLF_dead0injectionSwitch));
                if (donor_replacementGLF_dead10c1) {
                    float GLF_dead10stripe = GLF_dead10compute_stripe(cos((donor_replacementGLF_dead10uv.x + donor_replacementGLF_dead10uv.y) * 20.0));
                    donor_replacementGLF_dead10col = mix(vec3(donor_replacementGLF_dead10uv.x, 0, 0.75), vec3(.8, .7, donor_replacementGLF_dead10uv.x), GLF_dead10stripe);
                    GLF_dead10_GLF_color = vec4(donor_replacementGLF_dead10col, 1.0);
                    return;
                }
            }
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    vec2 donor_replacementGLF_dead9coord = _GLF_FUZZED(injectionSwitch);
                    {
                        ivec2 GLF_dead9icoord = ivec2(((donor_replacementGLF_dead9coord - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                        int GLF_dead9res3 = ((GLF_dead9icoord.x >> 5) & 1) ^ ((GLF_dead9icoord.y & 32) >> 5);
                        int GLF_dead9res2 = (GLF_dead9icoord.y * GLF_dead9icoord.y >> 10) & 1;
                        int GLF_dead9res1 = (GLF_dead9icoord.x * GLF_dead9icoord.y >> 9) & 1;
                        GLF_dead9_GLF_color = vec4(float(GLF_dead9res1 ^ GLF_dead9res2), float(GLF_dead9res2 & GLF_dead9res3), float(GLF_dead9res1 | GLF_dead9res3), 1.0);
                    }
                }
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                vec2 donor_replacementGLF_dead9coord = _GLF_FUZZED((GLF_dead0injectionSwitch - 5814.1620));
                if (donor_replacementGLF_dead9coord.x > 0.4) {
                    if (donor_replacementGLF_dead9coord.y < 0.6) {
                        uvec2 GLF_dead9icoord = uvec2(((donor_replacementGLF_dead9coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                        uint GLF_dead9res1 = uint(((GLF_dead9icoord.x * GLF_dead9icoord.y) >> (GLF_dead9icoord.x & 31u)) & 0xffffffffu);
                        uint GLF_dead9res2 = uint(((GLF_dead9icoord.x * GLF_dead9icoord.y) << (GLF_dead9icoord.x & 31u)) & 0xffffffffu);
                        float GLF_dead9res = float(((GLF_dead9res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_dead9res1 & 1u) != 0u ? 1u : 0u));
                        GLF_dead9_GLF_color = vec4(GLF_dead9res, GLF_dead9res, GLF_dead9res, 1.0);
                    } else {
                        ivec2 GLF_dead9icoord = ivec2(((donor_replacementGLF_dead9coord - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                        int GLF_dead9res3 = ((GLF_dead9icoord.x >> 5) & 1) ^ ((GLF_dead9icoord.y & 32) >> 5);
                        int GLF_dead9res2 = (GLF_dead9icoord.y * GLF_dead9icoord.y >> 10) & 1;
                        int GLF_dead9res1 = (GLF_dead9icoord.x * GLF_dead9icoord.y >> 9) & 1;
                        GLF_dead9_GLF_color = vec4(float(GLF_dead9res1 ^ GLF_dead9res2), float(GLF_dead9res2 & GLF_dead9res3), float(GLF_dead9res1 | GLF_dead9res3), 1.0);
                    }
                } else {
                    ivec2 GLF_dead9icoord = ivec2(((donor_replacementGLF_dead9coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.6, 1.0)) * 256.0);
                    int GLF_dead9v = (GLF_dead9icoord.x ^ GLF_dead9icoord.y) * GLF_dead9icoord.y;
                    bool GLF_dead9res1 = ((GLF_dead9v >> 10) & 1) != 0;
                    bool GLF_dead9res2 = ((GLF_dead9v >> 11) & 4) != 0;
                    bool GLF_dead9res3 = ((GLF_dead9v >> 12) & 8) != 0;
                    GLF_dead9_GLF_color = vec4(GLF_dead9res1 ? 1.0 : 0.0, GLF_dead9res2 ? 1.0 : 0.0, GLF_dead9res3 ? 1.0 : 0.0, 1);
                }
            }
        }
        if (_GLF_DEAD(false)) {
            if (_GLF_DEAD(false)) {
                vec2 donor_replacementGLF_dead7coord = _GLF_FUZZED(dFdyCoarse(vec2(2901.4555, -14.92)));
                vec4 donor_replacementGLF_dead7res = _GLF_FUZZED(GLF_dead5_GLF_color);
                float donor_replacementGLF_dead7uvstep = _GLF_FUZZED(uintBitsToFloat(101130u));
                for (int GLF_dead7j = 0; GLF_dead7j < 3; GLF_dead7j++) {
                    donor_replacementGLF_dead7res += texture(GLF_dead7tex, donor_replacementGLF_dead7coord + vec2(float(i - 1) * donor_replacementGLF_dead7uvstep, float(GLF_dead7j - 1) * donor_replacementGLF_dead7uvstep)) * GLF_dead7weights[_GLF_MAKE_IN_BOUNDS_INT(i * 3 + GLF_dead7j, 9)];
                }
            }
            vec3 donor_replacementGLF_dead3color = _GLF_FUZZED(clamp(vec3(-15.41, 4.8, -9.5), vec3(899.499, -820.242, -1.7), min(vec3(1678.8039, 40.52, 2.7), acosh(-9.9))));
            {
                donor_replacementGLF_dead3color.x += float(GLF_dead3obj.numbers[5]);
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = (floor((+vec3(-120.784, -7.3, 397.238))) * mat4x3(116.714, -2838.5016, 14.58, -6.4, 197.218, -40.58, 9022.2462, 8731.5600, -4724.9995, 29.03, -5438.6452, 4907.5013));
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                        if (_GLF_DEAD(false)) {
                            vec2 donor_replacementGLF_dead7coord = _GLF_FUZZED(tan(vec2(2.6, -7222.2309)));
                            float donor_replacementGLF_dead7uvstep = _GLF_FUZZED(dFdxCoarse(trunc(-5.6)));
                            {
                                for (int GLF_dead7j = 0; GLF_dead7j < 3; GLF_dead7j++) {
                                    _GLF_color += texture(GLF_dead7tex, donor_replacementGLF_dead7coord + vec2(float(i - 1) * donor_replacementGLF_dead7uvstep, float(GLF_dead7j - 1) * donor_replacementGLF_dead7uvstep)) * GLF_dead7weights[_GLF_MAKE_IN_BOUNDS_INT(i * 3 + GLF_dead7j, 9)];
                                }
                            }
                        }
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
            }
        }
        if ((4 * (i / 4)) == i) {
            A[i / 4] = float(i);
        }
    }
    for (int i = 0; i < 50; i++) {
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
            vec3 donor_replacementGLF_dead5col = _GLF_FUZZED(vec3(3.1, -7.8, 59.63));
            vec2 donor_replacementGLF_dead5uv = _GLF_FUZZED(fract(resolution));
            {
                float GLF_dead5stripe = GLF_dead5compute_stripe(cos((donor_replacementGLF_dead5uv.x + donor_replacementGLF_dead5uv.y) * 20.0));
                donor_replacementGLF_dead5col = mix(vec3(donor_replacementGLF_dead5uv.x, 0, 0.75), vec3(.8, .7, donor_replacementGLF_dead5uv.x), GLF_dead5stripe);
                if (_GLF_WRAPPED_IF_FALSE(false)) {
                } else {
                    GLF_dead5_GLF_color = vec4(donor_replacementGLF_dead5col, 1.0);
                }
                if (_GLF_DEAD(false)) {
                    vec3 donor_replacementGLF_dead10col = _GLF_FUZZED(vec3(-2740.5716, -828.574, 89.26));
                    {
                        float GLF_dead10stripe = GLF_dead10compute_stripe(cos((donor_replacementGLF_dead5uv.x + donor_replacementGLF_dead5uv.y) * 20.0));
                        donor_replacementGLF_dead10col = mix(vec3(donor_replacementGLF_dead5uv.x, 0, 0.75), vec3(.8, .7, donor_replacementGLF_dead5uv.x), GLF_dead10stripe);
                        GLF_dead10_GLF_color = vec4(donor_replacementGLF_dead10col, 1.0);
                        return;
                    }
                }
                return;
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    if (_GLF_DEAD(false)) {
                        if (donor_replacementGLF_dead5uv.y < 0.6) {
                            uvec2 GLF_dead9icoord = uvec2(((donor_replacementGLF_dead5uv - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                            uint GLF_dead9res1 = uint(((GLF_dead9icoord.x * GLF_dead9icoord.y) >> (GLF_dead9icoord.x & 31u)) & 0xffffffffu);
                            uint GLF_dead9res2 = uint(((GLF_dead9icoord.x * GLF_dead9icoord.y) << (GLF_dead9icoord.x & 31u)) & 0xffffffffu);
                            float GLF_dead9res = float(((GLF_dead9res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_dead9res1 & 1u) != 0u ? 1u : 0u));
                            GLF_dead9_GLF_color = vec4(GLF_dead9res, GLF_dead9res, GLF_dead9res, 1.0);
                        } else {
                            ivec2 GLF_dead9icoord = ivec2(((donor_replacementGLF_dead5uv - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                            int GLF_dead9res3 = ((GLF_dead9icoord.x >> 5) & 1) ^ ((GLF_dead9icoord.y & 32) >> 5);
                            int GLF_dead9res2 = (GLF_dead9icoord.y * GLF_dead9icoord.y >> 10) & 1;
                            int GLF_dead9res1 = (GLF_dead9icoord.x * GLF_dead9icoord.y >> 9) & 1;
                            GLF_dead9_GLF_color = vec4(float(GLF_dead9res1 ^ GLF_dead9res2), float(GLF_dead9res2 & GLF_dead9res3), float(GLF_dead9res1 | GLF_dead9res3), 1.0);
                        }
                    }
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = sin(vec4(-7.1, 1.4, 7645.9470, -6035.1451));
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    } else {
                    }
                }
            }
        }
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            if (_GLF_DEAD(false)) {
                if (_GLF_DEAD(_GLF_IDENTITY(false, false || (false)))) {
                    vec2 donor_replacementGLF_dead7coord = _GLF_FUZZED((GLF_dead5injectionSwitch + 6932.6361));
                    int donor_replacementGLF_dead7i = _GLF_FUZZED(66332);
                    vec4 donor_replacementGLF_dead7res = _GLF_FUZZED(intBitsToFloat(ivec4(43261, 30742, -46444, 68842)));
                    float donor_replacementGLF_dead7uvstep = _GLF_FUZZED(determinant(mat2(-4606.7095, 8.9, -33.72, 30.05)));
                    for (int GLF_dead7j = 0; GLF_dead7j < 3; GLF_dead7j++) {
                        donor_replacementGLF_dead7res += texture(GLF_dead7tex, donor_replacementGLF_dead7coord + vec2(float(donor_replacementGLF_dead7i - 1) * donor_replacementGLF_dead7uvstep, float(GLF_dead7j - 1) * donor_replacementGLF_dead7uvstep)) * GLF_dead7weights[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead7i * 3 + GLF_dead7j, 9)];
                    }
                }
                _GLF_color = (-_GLF_color);
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                vec2 donor_replacementGLF_dead9coord = _GLF_FUZZED(GLF_dead0injectionSwitch);
                {
                    if (donor_replacementGLF_dead9coord.y < 0.6) {
                        uvec2 GLF_dead9icoord = uvec2(((donor_replacementGLF_dead9coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                        uint GLF_dead9res1 = uint(((GLF_dead9icoord.x * GLF_dead9icoord.y) >> (GLF_dead9icoord.x & 31u)) & 0xffffffffu);
                        uint GLF_dead9res2 = uint(((GLF_dead9icoord.x * GLF_dead9icoord.y) << (GLF_dead9icoord.x & 31u)) & 0xffffffffu);
                        float GLF_dead9res = float(((GLF_dead9res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_dead9res1 & 1u) != 0u ? 1u : 0u));
                        GLF_dead9_GLF_color = vec4(GLF_dead9res, GLF_dead9res, GLF_dead9res, 1.0);
                    } else {
                        ivec2 GLF_dead9icoord = ivec2(((donor_replacementGLF_dead9coord - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                        int GLF_dead9res3 = ((GLF_dead9icoord.x >> 5) & 1) ^ ((GLF_dead9icoord.y & 32) >> 5);
                        int GLF_dead9res2 = (GLF_dead9icoord.y * GLF_dead9icoord.y >> 10) & 1;
                        int GLF_dead9res1 = (GLF_dead9icoord.x * GLF_dead9icoord.y >> 9) & 1;
                        GLF_dead9_GLF_color = vec4(float(GLF_dead9res1 ^ GLF_dead9res2), float(GLF_dead9res2 & GLF_dead9res3), float(GLF_dead9res1 | GLF_dead9res3), 1.0);
                    }
                }
            }
            _GLF_color = vec4(7063.0403, 9.5, -7.5, 6.2);
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
        if (i < int(gl_FragCoord.x)) {
            break;
        }
        if (i > 0) {
            if (_GLF_DEAD(false)) {
                for (int _injected_loop_counter = ((1 << _GLF_IDENTITY(int(1), _GLF_IDENTITY(int(1), (int(1)) - (0 | 0)))) >> _GLF_IDENTITY(int(1), int(1))); _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
                    _GLF_color = dFdyCoarse(vec4(-8.6, -2.4, -8495.0708, 2.8));
                }
            }
            A[i] += A[i - 1];
        }
    }
    if (_GLF_DEAD(false)) {
        if (_GLF_DEAD(false)) {
            bool donor_replacementGLF_dead5c1 = _GLF_FUZZED(false);
            bool donor_replacementGLF_dead5c2 = _GLF_FUZZED(false);
            vec3 donor_replacementGLF_dead5col = _GLF_FUZZED(vec3(2.9, 4.9, -556.728));
            vec2 donor_replacementGLF_dead5uv = _GLF_FUZZED(GLF_dead0injectionSwitch);
            if (!donor_replacementGLF_dead5c1 && donor_replacementGLF_dead5c2) {
                float GLF_dead5stripe = GLF_dead5compute_stripe(tan((donor_replacementGLF_dead5uv.x + donor_replacementGLF_dead5uv.y) * 20.0));
                donor_replacementGLF_dead5col = mix(vec3(0.5, donor_replacementGLF_dead5uv.x, 0.1), vec3(.4, 0, .5), GLF_dead5stripe);
                GLF_dead5_GLF_color = vec4(donor_replacementGLF_dead5col, 1.0);
                return;
            }
        }
        _GLF_color = asinh(_GLF_color);
    }
    if (_GLF_DEAD(false)) {
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            if (_GLF_WRAPPED_IF_FALSE(false)) {
            } else {
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    vec3 donor_replacementGLF_dead3color = _GLF_FUZZED(vec3(-3772.6339, -8.7, 7.8));
                    {
                        donor_replacementGLF_dead3color.z += float(GLF_dead3obj.numbers[7]);
                    }
                }
                _GLF_color = (dot(vec3(8.1, -7261.6689, -48.00), vec3(342.585, 9.4, 520.428)) - _GLF_color);
            }
        } else {
        }
        if (_GLF_DEAD(false)) {
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(7901.8600, -593.095, 4232.6791, 5.4);
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    vec2 donor_replacementGLF_dead9coord = _GLF_FUZZED((mat3x2(564.173, -0.5, 77.99, 3.4, 25.12, -727.087) * vec3(162.810, -5240.2564, -6.3)));
                    {
                        if (donor_replacementGLF_dead9coord.y < 0.6) {
                            uvec2 GLF_dead9icoord = uvec2(((donor_replacementGLF_dead9coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                            uint GLF_dead9res1 = uint(((GLF_dead9icoord.x * GLF_dead9icoord.y) >> (GLF_dead9icoord.x & 31u)) & 0xffffffffu);
                            uint GLF_dead9res2 = uint(((GLF_dead9icoord.x * GLF_dead9icoord.y) << (GLF_dead9icoord.x & 31u)) & 0xffffffffu);
                            float GLF_dead9res = float(((GLF_dead9res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_dead9res1 & 1u) != 0u ? 1u : 0u));
                            GLF_dead9_GLF_color = vec4(GLF_dead9res, GLF_dead9res, GLF_dead9res, 1.0);
                        } else {
                            ivec2 GLF_dead9icoord = ivec2(((donor_replacementGLF_dead9coord - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                            int GLF_dead9res3 = ((GLF_dead9icoord.x >> 5) & 1) ^ ((GLF_dead9icoord.y & 32) >> 5);
                            int GLF_dead9res2 = (GLF_dead9icoord.y * GLF_dead9icoord.y >> 10) & 1;
                            int GLF_dead9res1 = (GLF_dead9icoord.x * GLF_dead9icoord.y >> 9) & 1;
                            GLF_dead9_GLF_color = vec4(float(GLF_dead9res1 ^ GLF_dead9res2), float(GLF_dead9res2 & GLF_dead9res3), float(GLF_dead9res1 | GLF_dead9res3), 1.0);
                        }
                    }
                }
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                    if (_GLF_DEAD(false)) {
                        vec2 donor_replacementGLF_dead7coord = _GLF_FUZZED(GLF_dead0injectionSwitch);
                        int donor_replacementGLF_dead7i = _GLF_FUZZED(int((mat4x2(-628.832, -551.985, -91.17, 30.73, 806.972, -328.591, 719.267, -68.61) != (-mat4x2(692.304, -28.88, -669.075, -4.9, -4.6, 975.021, 32.19, 31.07)))));
                        float donor_replacementGLF_dead7uvstep = _GLF_FUZZED(-7744.0513);
                        {
                            for (int GLF_dead7j = 0; GLF_dead7j < 3; GLF_dead7j++) {
                                GLF_dead4_GLF_color += texture(GLF_dead7tex, donor_replacementGLF_dead7coord + vec2(float(donor_replacementGLF_dead7i - 1) * donor_replacementGLF_dead7uvstep, float(GLF_dead7j - 1) * donor_replacementGLF_dead7uvstep)) * GLF_dead7weights[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead7i * 3 + GLF_dead7j, 9)];
                            }
                        }
                    }
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            int donor_replacementGLF_dead3i = _GLF_FUZZED(findMSB(-14062));
            int donor_replacementGLF_dead3j = _GLF_FUZZED(46819);
            if (donor_replacementGLF_dead3j < donor_replacementGLF_dead3i + 1) {
                ;
            }
            if (_GLF_DEAD(false)) {
                bool donor_replacementGLF_dead10c1 = _GLF_FUZZED(false);
                bool donor_replacementGLF_dead10c2 = _GLF_FUZZED(((false ? mat4x3(125.908, 3.1, -66.73, -8256.7058, -2.3, -720.861, -3670.4813, 3.6, -4.3, -9.5, -66.73, -321.798) : mat4x3(9519.5404, 86.67, -7.4, -45.78, 3.8, 53.39, 5.5, -0.5, 28.04, 6.1, 3.8, 8.5)) == mat4x3(-112.985, 1.2, 312.152, -1.1, -117.613, 4930.8559, 2.9, 3.8, -7.2, -912.726, -702.872, 6125.9204)));
                vec3 donor_replacementGLF_dead10col = _GLF_FUZZED((-mat4x3(-3.6, 67.05, -685.798, 39.78, 598.883, 7.7, 5.6, -5.0, -6146.3322, 0.8, 5.8, -82.58)[0]));
                vec2 donor_replacementGLF_dead10uv = _GLF_FUZZED(resolution);
                if (!donor_replacementGLF_dead10c1 && donor_replacementGLF_dead10c2) {
                    float GLF_dead10stripe = GLF_dead10compute_stripe(tan((donor_replacementGLF_dead10uv.x + donor_replacementGLF_dead10uv.y) * 20.0));
                    donor_replacementGLF_dead10col = mix(vec3(0.5, donor_replacementGLF_dead10uv.x, 0.1), vec3(.4, 0, .5), GLF_dead10stripe);
                    GLF_dead10_GLF_color = vec4(donor_replacementGLF_dead10col, 1.0);
                    return;
                }
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = clamp(vec4(-36.40, 4.9, -421.691, 45.14), 966.120, -925.209);
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                if (_GLF_DEAD(false)) {
                    {
                        GLF_dead4_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            vec2 donor_replacementGLF_dead7coord = _GLF_FUZZED(resolution);
                            vec4 donor_replacementGLF_dead7res = _GLF_FUZZED(_GLF_color);
                            float donor_replacementGLF_dead7uvstep = _GLF_FUZZED(clamp(-379.940, -80.93, 9.9));
                            for (int GLF_dead7i = 0; GLF_dead7i < 3; GLF_dead7i++) {
                                for (int GLF_dead7j = 0; GLF_dead7j < 3; GLF_dead7j++) {
                                    donor_replacementGLF_dead7res += texture(GLF_dead7tex, donor_replacementGLF_dead7coord + vec2(float(GLF_dead7i - 1) * donor_replacementGLF_dead7uvstep, float(GLF_dead7j - 1) * donor_replacementGLF_dead7uvstep)) * GLF_dead7weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead7i * 3 + GLF_dead7j, 9)];
                                }
                            }
                        }
                    }
                }
                _GLF_color = _GLF_color;
            }
        }
    }
    if (int(gl_FragCoord.x) < 20) {
        _GLF_color = vec4(A[0] / resolution.x, A[4] / resolution.y, 1.0, 1.0);
    } else {
        if (_GLF_DEAD(false)) {
            vec2 donor_replacementGLF_dead9coord = _GLF_FUZZED(GLF_dead2injectionSwitch);
            {
                uvec2 GLF_dead9icoord = uvec2(((donor_replacementGLF_dead9coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                uint GLF_dead9res1 = uint(((GLF_dead9icoord.x * GLF_dead9icoord.y) >> (GLF_dead9icoord.x & 31u)) & 0xffffffffu);
                uint GLF_dead9res2 = uint(((GLF_dead9icoord.x * GLF_dead9icoord.y) << (GLF_dead9icoord.x & 31u)) & 0xffffffffu);
                float GLF_dead9res = float(((GLF_dead9res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_dead9res1 & 1u) != 0u ? 1u : 0u));
                GLF_dead9_GLF_color = vec4(GLF_dead9res, GLF_dead9res, GLF_dead9res, 1.0);
            }
        }
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            if (_GLF_DEAD(false)) {
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    _GLF_color = trunc(vec4(-5432.4400, -0.3, -9.9, 235.944).rgaa);
                }
                int donor_replacementGLF_dead3i = _GLF_FUZZED(88485);
                int donor_replacementGLF_dead3j = _GLF_FUZZED(-7674);
                if (donor_replacementGLF_dead3j < donor_replacementGLF_dead3i + 1) {
                    ;
                }
            }
            for (int _injected_loop_counter = int(_GLF_ONE(1.0, injectionSwitch.y)); _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                _GLF_color = vec4(-6380.1862, -181.927, 6.5, 0.5);
            }
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                if (_GLF_DEAD(false)) {
                    bool donor_replacementGLF_dead5c1 = _GLF_FUZZED((injectionSwitch == GLF_dead2injectionSwitch));
                    bool donor_replacementGLF_dead5c2 = _GLF_FUZZED(true);
                    bool donor_replacementGLF_dead5c3 = _GLF_FUZZED(((int(false) >> 92101) >= 59477));
                    vec3 donor_replacementGLF_dead5col = _GLF_FUZZED(step(7.5, vec3(-7912.8681, -98.41, -3.5)));
                    vec2 donor_replacementGLF_dead5uv = _GLF_FUZZED(fwidth((resolution + (-340.596))));
                    if (!donor_replacementGLF_dead5c1 && !donor_replacementGLF_dead5c2 && donor_replacementGLF_dead5c3) {
                        float GLF_dead5stripe = GLF_dead5compute_stripe(cos((donor_replacementGLF_dead5uv.x + donor_replacementGLF_dead5uv.y) * 20.0));
                        donor_replacementGLF_dead5col = mix(vec3(.7, sinh(donor_replacementGLF_dead5uv.x), donor_replacementGLF_dead5uv.x), vec3(.3, .5, donor_replacementGLF_dead5uv.x), GLF_dead5stripe);
                        GLF_dead5_GLF_color = vec4(donor_replacementGLF_dead5col, 1.0);
                        return;
                    }
                }
                _GLF_color = _GLF_outVarBackup_GLF_color;
                if (_GLF_DEAD(false)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
        }
        if (_GLF_DEAD(false)) {
            vec3 donor_replacementGLF_dead10col = _GLF_FUZZED(vec3(6.1, 484.162, -9189.3341));
            vec2 donor_replacementGLF_dead10uv = _GLF_FUZZED((vec3(-41.52, 2.7, 9409.9354) * mat2x3(5.2, 3458.3425, 720.512, -3.9, -16.95, 554.677)));
            {
                float GLF_dead10stripe = GLF_dead10compute_stripe(cos((donor_replacementGLF_dead10uv.x + donor_replacementGLF_dead10uv.y) * 20.0));
                for (int _injected_loop_counter = _GLF_IDENTITY(1, clamp(1, _GLF_IDENTITY(1, max(1, 1)), 1)); _GLF_WRAPPED_LOOP(_injected_loop_counter != int(_GLF_ZERO(0.0, injectionSwitch.x))); _injected_loop_counter--) {
                    donor_replacementGLF_dead10col = mix(vec3(donor_replacementGLF_dead10uv.x, 0, 0.75), vec3(.8, .7, donor_replacementGLF_dead10uv.x), GLF_dead10stripe);
                }
                GLF_dead10_GLF_color = vec4(donor_replacementGLF_dead10col, 1.0);
                return;
            }
        }
        if (int(gl_FragCoord.x) < 40) {
            _GLF_color = vec4(A[5] / resolution.x, A[9] / resolution.y, 1.0, 1.0);
        } else {
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                int donor_replacementGLF_dead3i = _GLF_FUZZED(max(((66688 >> (-78893)) | bitfieldInsert(-11674, -81268, 28877, -83927)), 22524));
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    vec3 donor_replacementGLF_dead5col = _GLF_FUZZED(vec3(4905.2309, -40.31, 20.82));
                    vec2 donor_replacementGLF_dead5uv = _GLF_FUZZED(degrees(GLF_dead0injectionSwitch));
                    {
                        float GLF_dead5stripe = GLF_dead5compute_stripe(cos((donor_replacementGLF_dead5uv.x + donor_replacementGLF_dead5uv.y) * 20.0));
                        donor_replacementGLF_dead5col = mix(vec3(donor_replacementGLF_dead5uv.x, 0, 0.75), vec3(.8, .7, donor_replacementGLF_dead5uv.x), GLF_dead5stripe);
                        GLF_dead5_GLF_color = vec4(donor_replacementGLF_dead5col, 1.0);
                        return;
                    }
                }
                int donor_replacementGLF_dead3j = _GLF_FUZZED(findMSB(sign(-91485)));
                if (donor_replacementGLF_dead3j < donor_replacementGLF_dead3i + 1) {
                    ;
                }
                if (_GLF_DEAD(false)) {
                    _GLF_color = _GLF_color;
                }
            }
            if (int(gl_FragCoord.x) < 60) {
                _GLF_color = vec4(A[10] / resolution.x, A[14] / resolution.y, 1.0, 1.0);
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        vec2 donor_replacementGLF_dead9coord = _GLF_FUZZED(floor(GLF_dead2injectionSwitch));
                        if (donor_replacementGLF_dead9coord.y < 0.6) {
                            uvec2 GLF_dead9icoord = uvec2(((donor_replacementGLF_dead9coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                            uint GLF_dead9res1 = uint(((GLF_dead9icoord.x * GLF_dead9icoord.y) >> (GLF_dead9icoord.x & 31u)) & 0xffffffffu);
                            uint GLF_dead9res2 = uint(((GLF_dead9icoord.x * GLF_dead9icoord.y) << (GLF_dead9icoord.x & 31u)) & 0xffffffffu);
                            float GLF_dead9res = float(((GLF_dead9res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_dead9res1 & 1u) != 0u ? 1u : 0u));
                            GLF_dead9_GLF_color = vec4(GLF_dead9res, GLF_dead9res, GLF_dead9res, 1.0);
                        } else {
                            ivec2 GLF_dead9icoord = ivec2(((donor_replacementGLF_dead9coord - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                            int GLF_dead9res3 = ((GLF_dead9icoord.x >> 5) & 1) ^ ((GLF_dead9icoord.y & 32) >> 5);
                            int GLF_dead9res2 = (GLF_dead9icoord.y * GLF_dead9icoord.y >> 10) & 1;
                            int GLF_dead9res1 = (GLF_dead9icoord.x * GLF_dead9icoord.y >> 9) & 1;
                            GLF_dead9_GLF_color = vec4(float(GLF_dead9res1 ^ GLF_dead9res2), float(GLF_dead9res2 & GLF_dead9res3), float(GLF_dead9res1 | GLF_dead9res3), 1.0);
                        }
                    }
                    int donor_replacementGLF_dead6d = _GLF_FUZZED(-4895);
                    ivec2 donor_replacementGLF_dead6p = _GLF_FUZZED(ivec2(11796, 49748));
                    if (donor_replacementGLF_dead6d >= 0 && donor_replacementGLF_dead6p.x > 0 && GLF_dead6map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead6p.x - 2) + (donor_replacementGLF_dead6p.y) * 16, 256)] == 0) {
                        donor_replacementGLF_dead6d--;
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            vec2 donor_replacementGLF_dead7coord = _GLF_FUZZED(resolution);
                            float donor_replacementGLF_dead7uvstep = _GLF_FUZZED(526.121);
                            for (int GLF_dead7j = 0; GLF_dead7j < 3; GLF_dead7j++) {
                                _GLF_color += texture(GLF_dead7tex, donor_replacementGLF_dead7coord + vec2(float(donor_replacementGLF_dead6d - 1) * donor_replacementGLF_dead7uvstep, float(GLF_dead7j - 1) * donor_replacementGLF_dead7uvstep)) * GLF_dead7weights[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead6d * 3 + GLF_dead7j, 9)];
                            }
                        }
                        GLF_dead6map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead6p.x) + (donor_replacementGLF_dead6p.y) * 16, 256)] = 1;
                        GLF_dead6map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead6p.x - 1) + (donor_replacementGLF_dead6p.y) * 16, 256)] = 1;
                        GLF_dead6map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead6p.x - 2) + (donor_replacementGLF_dead6p.y) * 16, 256)] = 1;
                        donor_replacementGLF_dead6p.x -= 2;
                    }
                }
            } else {
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(6.7, 9530.7229, 9.0, 607.034);
                    if (_GLF_DEAD(false)) {
                        vec2 donor_replacementGLF_dead9coord = _GLF_FUZZED(resolution);
                        if (donor_replacementGLF_dead9coord.x > 0.4) {
                            if (donor_replacementGLF_dead9coord.y < 0.6) {
                                uvec2 GLF_dead9icoord = uvec2(((donor_replacementGLF_dead9coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                                uint GLF_dead9res1 = uint(((GLF_dead9icoord.x * GLF_dead9icoord.y) >> (GLF_dead9icoord.x & 31u)) & 0xffffffffu);
                                uint GLF_dead9res2 = uint(((GLF_dead9icoord.x * GLF_dead9icoord.y) << (GLF_dead9icoord.x & 31u)) & 0xffffffffu);
                                float GLF_dead9res = float(((GLF_dead9res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_dead9res1 & 1u) != 0u ? 1u : 0u));
                                GLF_dead9_GLF_color = vec4(GLF_dead9res, GLF_dead9res, GLF_dead9res, 1.0);
                            } else {
                                ivec2 GLF_dead9icoord = ivec2(((donor_replacementGLF_dead9coord - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                                int GLF_dead9res3 = ((GLF_dead9icoord.x >> 5) & 1) ^ ((GLF_dead9icoord.y & 32) >> 5);
                                int GLF_dead9res2 = (GLF_dead9icoord.y * GLF_dead9icoord.y >> 10) & 1;
                                int GLF_dead9res1 = (GLF_dead9icoord.x * GLF_dead9icoord.y >> 9) & 1;
                                GLF_dead9_GLF_color = vec4(float(GLF_dead9res1 ^ GLF_dead9res2), float(GLF_dead9res2 & GLF_dead9res3), float(GLF_dead9res1 | GLF_dead9res3), 1.0);
                            }
                        } else {
                            ivec2 GLF_dead9icoord = ivec2(((donor_replacementGLF_dead9coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.6, 1.0)) * 256.0);
                            int GLF_dead9v = (GLF_dead9icoord.x ^ GLF_dead9icoord.y) * GLF_dead9icoord.y;
                            bool GLF_dead9res1 = ((GLF_dead9v >> 10) & 1) != 0;
                            bool GLF_dead9res2 = ((GLF_dead9v >> 11) & 4) != 0;
                            bool GLF_dead9res3 = ((GLF_dead9v >> 12) & 8) != 0;
                            GLF_dead9_GLF_color = vec4(GLF_dead9res1 ? 1.0 : 0.0, GLF_dead9res2 ? 1.0 : 0.0, GLF_dead9res3 ? 1.0 : 0.0, 1);
                        }
                    }
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > int(_GLF_ZERO(0.0, injectionSwitch.x))); _injected_loop_counter--) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            int donor_replacementGLF_dead8i = _GLF_FUZZED(int(false));
                            if (donor_replacementGLF_dead8i >= int(GLF_dead8resolution.x)) {
                                if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                } else {
                                    ;
                                }
                            }
                        }
                    }
                }
                if (_GLF_DEAD(false)) {
                    bool donor_replacementGLF_dead5c1 = _GLF_FUZZED((bvec3(false, true, false) == bvec3(true, false, false)));
                    if (_GLF_DEAD(false)) {
                        int donor_replacementGLF_dead8i = _GLF_FUZZED(int(-49.74));
                        if (donor_replacementGLF_dead8i >= int(GLF_dead8resolution.x)) {
                            ;
                        }
                    }
                    vec3 donor_replacementGLF_dead5col = _GLF_FUZZED((vec3(-4.7, 363.331, 6.7)));
                    if (_GLF_DEAD(false)) {
                        bool donor_replacementGLF_dead10c2 = _GLF_FUZZED(bvec3(true, true, false)[0]);
                        bool donor_replacementGLF_dead10c3 = _GLF_FUZZED((mat4x3(-7.2, -3.2, -4.0, 780.942, -13.05, 623.765, -1.5, 1.9, -513.099, -68.11, -1.4, 4.1) == mat4x3(-9.1, 0.3, -1.4, -71.17, -210.199, -2.2, -9289.8895, -8.7, 81.70, -3.4, -335.182, 6.1)));
                        bool donor_replacementGLF_dead10c4 = _GLF_FUZZED(donor_replacementGLF_dead5c1);
                        vec2 donor_replacementGLF_dead10uv = _GLF_FUZZED(vec2(9.1, -5.0));
                        if (!donor_replacementGLF_dead5c1 && !donor_replacementGLF_dead10c2 && !donor_replacementGLF_dead10c3 && donor_replacementGLF_dead10c4) {
                            float GLF_dead10stripe = GLF_dead10compute_stripe(tan((donor_replacementGLF_dead10uv.x + donor_replacementGLF_dead10uv.y) * 20.0));
                            donor_replacementGLF_dead5col = mix(vec3(donor_replacementGLF_dead10uv.x, .8, 0), vec3(1, donor_replacementGLF_dead10uv.y, 0), GLF_dead10stripe);
                            for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
                                GLF_dead10_GLF_color = vec4(donor_replacementGLF_dead5col, 1.0);
                            }
                            return;
                        }
                    }
                    vec2 donor_replacementGLF_dead5uv = _GLF_FUZZED(vec2(187.811, 0.7));
                    if (donor_replacementGLF_dead5c1) {
                        float GLF_dead5stripe = GLF_dead5compute_stripe(cos((donor_replacementGLF_dead5uv.x + donor_replacementGLF_dead5uv.y) * 20.0));
                        donor_replacementGLF_dead5col = mix(vec3(donor_replacementGLF_dead5uv.x, 0, 0.75), vec3(.8, .7, donor_replacementGLF_dead5uv.x), GLF_dead5stripe);
                        GLF_dead5_GLF_color = vec4(donor_replacementGLF_dead5col, 1.0);
                        if (_GLF_DEAD(false)) {
                            {
                                ivec2 GLF_dead9icoord = ivec2(((donor_replacementGLF_dead5uv - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                                int GLF_dead9res3 = ((GLF_dead9icoord.x >> 5) & 1) ^ ((GLF_dead9icoord.y & 32) >> 5);
                                int GLF_dead9res2 = (GLF_dead9icoord.y * GLF_dead9icoord.y >> 10) & 1;
                                int GLF_dead9res1 = (GLF_dead9icoord.x * GLF_dead9icoord.y >> 9) & 1;
                                GLF_dead9_GLF_color = vec4(float(GLF_dead9res1 ^ GLF_dead9res2), float(GLF_dead9res2 & GLF_dead9res3), float(GLF_dead9res1 | GLF_dead9res3), 1.0);
                            }
                        }
                        return;
                    }
                }
                if (_GLF_DEAD(false)) {
                    _GLF_color = vec4(40.42, 267.303, 5665.4643, -76.16);
                    do {
                        if (_GLF_DEAD(false)) {
                            {
                                do {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                        bool donor_replacementGLF_dead10c1 = _GLF_FUZZED(false);
                                        bool donor_replacementGLF_dead10c2 = _GLF_FUZZED(false);
                                        bool donor_replacementGLF_dead10c3 = _GLF_FUZZED(false);
                                        bool donor_replacementGLF_dead10c4 = _GLF_FUZZED(true);
                                        vec3 donor_replacementGLF_dead10col = _GLF_FUZZED(vec3(2690.4029, -2.0, 305.024));
                                        vec2 donor_replacementGLF_dead10uv = _GLF_FUZZED(sinh(GLF_dead0injectionSwitch));
                                        if (!donor_replacementGLF_dead10c1 && !donor_replacementGLF_dead10c2 && !donor_replacementGLF_dead10c3 && donor_replacementGLF_dead10c4) {
                                            float GLF_dead10stripe = GLF_dead10compute_stripe(tan((donor_replacementGLF_dead10uv.x + donor_replacementGLF_dead10uv.y) * 20.0));
                                            donor_replacementGLF_dead10col = mix(vec3(donor_replacementGLF_dead10uv.x, .8, 0), vec3(1, donor_replacementGLF_dead10uv.y, 0), GLF_dead10stripe);
                                            GLF_dead10_GLF_color = vec4(donor_replacementGLF_dead10col, 1.0);
                                            if (_GLF_WRAPPED_IF_FALSE(false)) {
                                            } else {
                                                return;
                                            }
                                        }
                                    }
                                    _GLF_color = vec4(vec2(-0.8, -6386.7502), vec2(5584.3863, 571.535));
                                    for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < int(_GLF_ONE(1.0, injectionSwitch.y))); _injected_loop_counter++) {
                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= _GLF_ZERO(0.0, injectionSwitch.x))))) {
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < abs(length(0.0)))))) {
                                                vec2 donor_replacementGLF_dead7coord = _GLF_FUZZED(trunc(vec2(3.5, -50.20)));
                                                vec4 donor_replacementGLF_dead7res = _GLF_FUZZED((GLF_dead5_GLF_color - 70.03));
                                                float donor_replacementGLF_dead7uvstep = _GLF_FUZZED(9376.2874);
                                                for (int GLF_dead7i = 0; GLF_dead7i < 3; GLF_dead7i++) {
                                                    for (int GLF_dead7j = 0; GLF_dead7j < 3; GLF_dead7j++) {
                                                        donor_replacementGLF_dead7res += texture(GLF_dead7tex, donor_replacementGLF_dead7coord + vec2(float(GLF_dead7i - 1) * donor_replacementGLF_dead7uvstep, float(GLF_dead7j - 1) * donor_replacementGLF_dead7uvstep)) * GLF_dead7weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead7i * 3 + GLF_dead7j, 9)];
                                                    }
                                                }
                                            }
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                    }
                                } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))));
                                GLF_dead4_GLF_color = vec4(0.0, 0.0, 1.0, 1.0);
                            }
                        }
                    } while (_GLF_WRAPPED_LOOP(false));
                }
                if (int(gl_FragCoord.x) < 80) {
                    _GLF_color = vec4(A[15] / resolution.x, A[19] / resolution.y, 1.0, 1.0);
                } else if (int(gl_FragCoord.x) < 100) {
                    _GLF_color = vec4(A[20] / resolution.x, A[24] / resolution.y, 1.0, 1.0);
                    do {
                        if (_GLF_DEAD(false)) {
                            if (_GLF_DEAD(false)) {
                                vec2 donor_replacementGLF_dead9coord = _GLF_FUZZED(smoothstep(-86.42, 723.703, GLF_dead0injectionSwitch));
                                {
                                    ivec2 GLF_dead9icoord = ivec2(((donor_replacementGLF_dead9coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.6, 1.0)) * 256.0);
                                    int GLF_dead9v = (GLF_dead9icoord.x ^ GLF_dead9icoord.y) * GLF_dead9icoord.y;
                                    bool GLF_dead9res1 = ((GLF_dead9v >> 10) & 1) != 0;
                                    bool GLF_dead9res2 = ((GLF_dead9v >> 11) & 4) != 0;
                                    bool GLF_dead9res3 = ((GLF_dead9v >> 12) & 8) != 0;
                                    GLF_dead9_GLF_color = vec4(GLF_dead9res1 ? 1.0 : 0.0, GLF_dead9res2 ? 1.0 : 0.0, GLF_dead9res3 ? 1.0 : 0.0, 1);
                                }
                            }
                            _GLF_color = _GLF_color;
                        }
                    } while (_GLF_WRAPPED_LOOP(false));
                } else {
                    if (_GLF_DEAD(false)) {
                        _GLF_color = vec4(-3.1, -8.7, -9192.3680, -1782.3551);
                    }
                    if (_GLF_DEAD(false)) {
                        vec2 donor_replacementGLF_dead9coord = _GLF_FUZZED(atan(injectionSwitch));
                        {
                            if (donor_replacementGLF_dead9coord.y < 0.6) {
                                uvec2 GLF_dead9icoord = uvec2(((donor_replacementGLF_dead9coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                                uint GLF_dead9res1 = uint(((GLF_dead9icoord.x * GLF_dead9icoord.y) >> (GLF_dead9icoord.x & 31u)) & 0xffffffffu);
                                uint GLF_dead9res2 = uint(((GLF_dead9icoord.x * GLF_dead9icoord.y) << (GLF_dead9icoord.x & 31u)) & 0xffffffffu);
                                float GLF_dead9res = float(((GLF_dead9res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_dead9res1 & 1u) != 0u ? 1u : 0u));
                                GLF_dead9_GLF_color = vec4(GLF_dead9res, GLF_dead9res, GLF_dead9res, 1.0);
                            } else {
                                ivec2 GLF_dead9icoord = ivec2(((donor_replacementGLF_dead9coord - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                                int GLF_dead9res3 = ((GLF_dead9icoord.x >> 5) & 1) ^ ((GLF_dead9icoord.y & 32) >> 5);
                                int GLF_dead9res2 = (GLF_dead9icoord.y * GLF_dead9icoord.y >> 10) & 1;
                                int GLF_dead9res1 = (GLF_dead9icoord.x * GLF_dead9icoord.y >> 9) & 1;
                                GLF_dead9_GLF_color = vec4(float(GLF_dead9res1 ^ GLF_dead9res2), float(GLF_dead9res2 & GLF_dead9res3), float(GLF_dead9res1 | GLF_dead9res3), 1.0);
                            }
                        }
                    }
                    if (int(gl_FragCoord.x) < 120) {
                        if (_GLF_DEAD(false)) {
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = mix(inversesqrt(vec4(4.2, 3.3, -976.789, -2795.3319)), vec4(43.23, -84.95, -6.8, -875.037), vec4(-4963.8643, 7074.8045, 0.0, -2278.3429));
                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                            _GLF_color = vec4(vec2(91.15), vec2(-1.6, -9631.8378));
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                vec3 donor_replacementGLF_dead3color = _GLF_FUZZED((bvec2(false, false), vec3(2.1, 310.938, 478.902)));
                                {
                                    donor_replacementGLF_dead3color.x += float(GLF_dead3obj.numbers[5]);
                                }
                            }
                        }
                        _GLF_color = vec4(A[25] / resolution.x, A[29] / resolution.y, 1.0, 1.0);
                        {
                            if (_GLF_DEAD(false)) {
                                bool donor_replacementGLF_dead5c1 = _GLF_FUZZED(bvec2(false, true)[1]);
                                bool donor_replacementGLF_dead5c2 = _GLF_FUZZED(true);
                                bool donor_replacementGLF_dead5c3 = _GLF_FUZZED((ivec3(-41159, -40344, 26435) == ivec3(72748, -8130, 6337)));
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    do {
                                        _GLF_color = mat3x4(895.477, -944.883, -1.3, 9577.6540, 706.510, -98.70, -9384.6387, 6607.2915, -8955.6919, -868.033, -986.691, 5.6)[0];
                                    } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))));
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                        vec2 donor_replacementGLF_dead9coord = _GLF_FUZZED(((mat4x2(2.5, -1.5, -4.0, 6.6, 1.7, 477.746, 5.3, 4.1) + (mat4x2(-534.124, -6.1, 9.6, -46.04, 3.2, -54.44, 359.811, -373.144) + 84.29)) * _GLF_color));
                                        {
                                            ivec2 GLF_dead9icoord = ivec2(((donor_replacementGLF_dead9coord - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                                            int GLF_dead9res3 = ((GLF_dead9icoord.x >> 5) & 1) ^ ((GLF_dead9icoord.y & 32) >> 5);
                                            int GLF_dead9res2 = (GLF_dead9icoord.y * GLF_dead9icoord.y >> 10) & 1;
                                            int GLF_dead9res1 = (GLF_dead9icoord.x * GLF_dead9icoord.y >> 9) & 1;
                                            GLF_dead9_GLF_color = vec4(float(GLF_dead9res1 ^ GLF_dead9res2), float(GLF_dead9res2 & GLF_dead9res3), float(GLF_dead9res1 | GLF_dead9res3), 1.0);
                                        }
                                    }
                                    if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                    } else {
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                            } else {
                                            }
                                        }
                                    }
                                }
                                bool donor_replacementGLF_dead5c4 = _GLF_FUZZED(((mat3(-4.5, -971.576, 8784.1502, 2.9, -4951.1908, -94.52, 84.58, 6.2, 8133.2807) + (-65.31)) == mat3(1.8, -8699.7523, -642.618, 21.38, 744.600, -22.93, -2.0, -3373.0829, 500.630)));
                                vec3 donor_replacementGLF_dead5col = _GLF_FUZZED(vec3(-7.8, -9513.6370, -2.9));
                                vec2 donor_replacementGLF_dead5uv = _GLF_FUZZED(GLF_dead2injectionSwitch);
                                if (!donor_replacementGLF_dead5c1 && !donor_replacementGLF_dead5c2 && !donor_replacementGLF_dead5c3 && donor_replacementGLF_dead5c4) {
                                    float GLF_dead5stripe = GLF_dead5compute_stripe(tan((donor_replacementGLF_dead5uv.x + donor_replacementGLF_dead5uv.y) * 20.0));
                                    donor_replacementGLF_dead5col = mix(vec3(donor_replacementGLF_dead5uv.x, .8, 0), vec3(1, donor_replacementGLF_dead5uv.y, 0), GLF_dead5stripe);
                                    for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
                                        GLF_dead5_GLF_color = vec4(donor_replacementGLF_dead5col, 1.0);
                                    }
                                    return;
                                }
                            }
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = vec4(42.01, (3.9 * 626.770), -81.06, -47.75);
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                bool donor_replacementGLF_dead10c1 = _GLF_FUZZED(((-mat2(-7157.6810, -8.4, 7501.6123, 18.51)) != mat2(-6146.2380, -6610.5488, -11.51, -3.3)));
                                bool donor_replacementGLF_dead10c2 = _GLF_FUZZED(false);
                                vec3 donor_replacementGLF_dead10col = _GLF_FUZZED(clamp(vec3(87.78, -832.641, 878.904), vec3(9899.0921, 260.449, 8.6), vec3(547.880, 891.767, 68.58)));
                                vec2 donor_replacementGLF_dead10uv = _GLF_FUZZED(resolution);
                                if (!donor_replacementGLF_dead10c1 && donor_replacementGLF_dead10c2) {
                                    float GLF_dead10stripe = GLF_dead10compute_stripe(tan((donor_replacementGLF_dead10uv.x + donor_replacementGLF_dead10uv.y) * 20.0));
                                    donor_replacementGLF_dead10col = mix(vec3(0.5, donor_replacementGLF_dead10uv.x, 0.1), vec3(.4, 0, .5), GLF_dead10stripe);
                                    GLF_dead10_GLF_color = vec4(donor_replacementGLF_dead10col, 1.0);
                                    return;
                                }
                            }
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            int donor_replacementGLF_dead0a = _GLF_FUZZED(-96389);
                            int donor_replacementGLF_dead0b = _GLF_FUZZED((((-50568) % 92105) | (-90988)));
                            if (_GLF_DEAD(false)) {
                                bool donor_replacementGLF_dead5c1 = _GLF_FUZZED(true);
                                vec3 donor_replacementGLF_dead5col = _GLF_FUZZED(clamp(vec3(-46.25, 90.88, 479.278), -7852.8101, 5.5));
                                vec2 donor_replacementGLF_dead5uv = _GLF_FUZZED(vec2(7.8, 9564.6327));
                                if (donor_replacementGLF_dead5c1) {
                                    float GLF_dead5stripe = GLF_dead5compute_stripe(cos((donor_replacementGLF_dead5uv.x + donor_replacementGLF_dead5uv.y) * 20.0));
                                    donor_replacementGLF_dead5col = mix(vec3(donor_replacementGLF_dead5uv.x, 0, 0.75), vec3(.8, .7, donor_replacementGLF_dead5uv.x), GLF_dead5stripe);
                                    GLF_dead5_GLF_color = vec4(donor_replacementGLF_dead5col, 1.0);
                                    return;
                                }
                            }
                            int donor_replacementGLF_dead0c = _GLF_FUZZED(mix(51188, 15532, (188369u > 40430u)));
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                _GLF_color = (+_GLF_color);
                            }
                            int donor_replacementGLF_dead0d = _GLF_FUZZED(1829);
                            vec2 donor_replacementGLF_dead0uv = _GLF_FUZZED(injectionSwitch);
                            do {
                                donor_replacementGLF_dead0uv.y -= step(GLF_dead0injectionSwitch.y, donor_replacementGLF_dead0uv.x) + float(donor_replacementGLF_dead0a) + float(donor_replacementGLF_dead0b) + float(donor_replacementGLF_dead0c);
                                donor_replacementGLF_dead0d--;
                            } while (donor_replacementGLF_dead0d > int(GLF_dead0injectionSwitch.x));
                        }
                    } else if (int(gl_FragCoord.x) < 140) {
                        if (_GLF_DEAD(false)) {
                            vec2 donor_replacementGLF_dead7coord = _GLF_FUZZED(vec2(-2.8, -8.0));
                            vec4 donor_replacementGLF_dead7res = _GLF_FUZZED(GLF_dead4_GLF_color);
                            float donor_replacementGLF_dead7uvstep = _GLF_FUZZED(7.1);
                            for (int GLF_dead7i = 0; GLF_dead7i < 3; GLF_dead7i++) {
                                for (int GLF_dead7j = 0; GLF_dead7j < 3; GLF_dead7j++) {
                                    donor_replacementGLF_dead7res += texture(GLF_dead7tex, donor_replacementGLF_dead7coord + vec2(float(GLF_dead7i - 1) * donor_replacementGLF_dead7uvstep, float(GLF_dead7j - 1) * donor_replacementGLF_dead7uvstep)) * GLF_dead7weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead7i * 3 + GLF_dead7j, 9)];
                                }
                            }
                        }
                        _GLF_color = vec4(A[30] / resolution.x, A[34] / resolution.y, 1.0, 1.0);
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            vec2 donor_replacementGLF_dead9coord = _GLF_FUZZED(resolution);
                            {
                                uvec2 GLF_dead9icoord = uvec2(((donor_replacementGLF_dead9coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                                uint GLF_dead9res1 = uint(((GLF_dead9icoord.x * GLF_dead9icoord.y) >> (GLF_dead9icoord.x & 31u)) & 0xffffffffu);
                                uint GLF_dead9res2 = uint(((GLF_dead9icoord.x * GLF_dead9icoord.y) << (GLF_dead9icoord.x & 31u)) & 0xffffffffu);
                                float GLF_dead9res = float(((GLF_dead9res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_dead9res1 & 1u) != 0u ? 1u : 0u));
                                GLF_dead9_GLF_color = vec4(GLF_dead9res, GLF_dead9res, GLF_dead9res, 1.0);
                            }
                        }
                    } else {
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            int donor_replacementGLF_dead4baseIndex = _GLF_FUZZED(-75228);
                            int donor_replacementGLF_dead4data = _GLF_FUZZED(18666);
                            int donor_replacementGLF_dead4treeIndex = _GLF_FUZZED(findMSB(34393u));
                            {
                                if (donor_replacementGLF_dead4data <= GLF_dead4tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4baseIndex, 10)].data) {
                                    if (GLF_dead4tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4baseIndex, 10)].leftIndex == -1) {
                                        GLF_dead4tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4baseIndex, 10)].leftIndex = donor_replacementGLF_dead4treeIndex;
                                        GLF_dead4makeTreeNode(GLF_dead4tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4treeIndex, 10)], donor_replacementGLF_dead4data);
                                        return;
                                    } else {
                                        donor_replacementGLF_dead4baseIndex = GLF_dead4tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4baseIndex, 10)].leftIndex;
                                        ;
                                    }
                                } else {
                                    if (GLF_dead4tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4baseIndex, 10)].rightIndex == -1) {
                                        GLF_dead4tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4baseIndex, 10)].rightIndex = donor_replacementGLF_dead4treeIndex;
                                        GLF_dead4makeTreeNode(GLF_dead4tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4treeIndex, 10)], donor_replacementGLF_dead4data);
                                        {
                                            vec4 _GLF_outVarBackup_GLF_color;
                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                            _GLF_color = sinh(vec4(-11.62, 738.173, 3.4, 9.0));
                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                            }
                                        }
                                        return;
                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                            vec2 donor_replacementGLF_dead7coord = _GLF_FUZZED(GLF_dead0injectionSwitch);
                                            int donor_replacementGLF_dead7i = _GLF_FUZZED((donor_replacementGLF_dead4baseIndex / donor_replacementGLF_dead4baseIndex));
                                            vec4 donor_replacementGLF_dead7res = _GLF_FUZZED(GLF_dead4_GLF_color);
                                            float donor_replacementGLF_dead7uvstep = _GLF_FUZZED(trunc(9261.2148));
                                            for (int GLF_dead7j = 0; GLF_dead7j < 3; GLF_dead7j++) {
                                                donor_replacementGLF_dead7res += texture(GLF_dead7tex, donor_replacementGLF_dead7coord + vec2(float(donor_replacementGLF_dead7i - 1) * donor_replacementGLF_dead7uvstep, float(GLF_dead7j - 1) * donor_replacementGLF_dead7uvstep)) * GLF_dead7weights[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead7i * 3 + GLF_dead7j, 9)];
                                            }
                                        }
                                    } else {
                                        donor_replacementGLF_dead4baseIndex = GLF_dead4tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4baseIndex, 10)].rightIndex;
                                        ;
                                    }
                                    if (_GLF_DEAD(false)) {
                                        vec2 donor_replacementGLF_dead9coord = _GLF_FUZZED(mix(GLF_dead0injectionSwitch, mix(GLF_dead5injectionSwitch, injectionSwitch, GLF_dead5injectionSwitch.gg), -180.280));
                                        {
                                            ivec2 GLF_dead9icoord = ivec2(((donor_replacementGLF_dead9coord - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                                            int GLF_dead9res3 = ((GLF_dead9icoord.x >> 5) & 1) ^ ((GLF_dead9icoord.y & 32) >> 5);
                                            int GLF_dead9res2 = (GLF_dead9icoord.y * GLF_dead9icoord.y >> 10) & 1;
                                            int GLF_dead9res1 = (GLF_dead9icoord.x * GLF_dead9icoord.y >> 9) & 1;
                                            GLF_dead9_GLF_color = vec4(float(GLF_dead9res1 ^ GLF_dead9res2), float(GLF_dead9res2 & GLF_dead9res3), float(GLF_dead9res1 | GLF_dead9res3), 1.0);
                                        }
                                    }
                                }
                            }
                        }
                        do {
                            if (int(gl_FragCoord.x) < 160) {
                                if (_GLF_DEAD(false)) {
                                    bool donor_replacementGLF_dead10c1 = _GLF_FUZZED(false);
                                    bool donor_replacementGLF_dead10c2 = _GLF_FUZZED((ivec4(29788, 88488, -33390, 22596) != ivec4(75482, -71984, 48605, -94592)));
                                    vec3 donor_replacementGLF_dead10col = _GLF_FUZZED(vec3(4751.2351, 45.08, 7.8));
                                    vec2 donor_replacementGLF_dead10uv = _GLF_FUZZED(GLF_dead2injectionSwitch);
                                    if (!donor_replacementGLF_dead10c1 && donor_replacementGLF_dead10c2) {
                                        float GLF_dead10stripe = GLF_dead10compute_stripe(tan((donor_replacementGLF_dead10uv.x + donor_replacementGLF_dead10uv.y) * 20.0));
                                        donor_replacementGLF_dead10col = mix(vec3(0.5, donor_replacementGLF_dead10uv.x, 0.1), vec3(.4, 0, .5), GLF_dead10stripe);
                                        GLF_dead10_GLF_color = vec4(donor_replacementGLF_dead10col, 1.0);
                                        return;
                                    }
                                }
                                _GLF_color = vec4(A[35] / resolution.x, A[39] / resolution.y, 1.0, 1.0);
                            } else {
                                if (_GLF_WRAPPED_IF_FALSE(false)) {
                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                        vec2 donor_replacementGLF_dead7coord = _GLF_FUZZED(vec2(-2.2, 8.0));
                                        int donor_replacementGLF_dead7i = _GLF_FUZZED(-33423);
                                        vec4 donor_replacementGLF_dead7res = _GLF_FUZZED(GLF_dead5_GLF_color);
                                        float donor_replacementGLF_dead7uvstep = _GLF_FUZZED(length(vec4(-4094.1339, -212.332, -5.4, -3669.3539)));
                                        for (int GLF_dead7j = 0; GLF_dead7j < 3; GLF_dead7j++) {
                                            donor_replacementGLF_dead7res += texture(GLF_dead7tex, donor_replacementGLF_dead7coord + vec2(float(donor_replacementGLF_dead7i - 1) * donor_replacementGLF_dead7uvstep, float(GLF_dead7j - 1) * donor_replacementGLF_dead7uvstep)) * GLF_dead7weights[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead7i * 3 + GLF_dead7j, 9)];
                                        }
                                    }
                                } else {
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                            _GLF_color = exp(vec4(4692.5680, -3.9, -2695.3873, 76.71));
                                        }
                                    } else {
                                    }
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = uintBitsToFloat(uvec4(108563u, 156747u, 38421u, 145893u));
                                    if (_GLF_DEAD(false)) {
                                        vec2 donor_replacementGLF_dead9coord = _GLF_FUZZED(resolution);
                                        {
                                            ivec2 GLF_dead9icoord = ivec2(((donor_replacementGLF_dead9coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.6, 1.0)) * 256.0);
                                            int GLF_dead9v = (GLF_dead9icoord.x ^ GLF_dead9icoord.y) * GLF_dead9icoord.y;
                                            bool GLF_dead9res1 = ((GLF_dead9v >> 10) & 1) != 0;
                                            bool GLF_dead9res2 = ((GLF_dead9v >> 11) & 4) != 0;
                                            bool GLF_dead9res3 = ((GLF_dead9v >> 12) & 8) != 0;
                                            GLF_dead9_GLF_color = vec4(GLF_dead9res1 ? 1.0 : 0.0, GLF_dead9res2 ? 1.0 : 0.0, GLF_dead9res3 ? 1.0 : 0.0, 1);
                                        }
                                    }
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = vec4(-9243.2426, 679.574, -264.195, -35.56);
                                    }
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        if (_GLF_DEAD(false)) {
                                            do {
                                                discard;
                                            } while (_GLF_WRAPPED_LOOP(false));
                                        }
                                        if (_GLF_DEAD(false)) {
                                            _GLF_color = (_GLF_color + (-7.7));
                                        }
                                        do {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))));
                                    }
                                }
                                if (int(gl_FragCoord.x) < 180) {
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                        int donor_replacementGLF_dead6d = _GLF_FUZZED(ivec4(-38549, 61260, 90341, -2329)[0]);
                                        ivec2 donor_replacementGLF_dead6p = _GLF_FUZZED(ivec2(67435, 96838));
                                        if (_GLF_WRAPPED_IF_FALSE(false)) {
                                        } else {
                                            if (donor_replacementGLF_dead6d >= 0 && donor_replacementGLF_dead6p.y > 0 && GLF_dead6map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead6p.x) + (donor_replacementGLF_dead6p.y - 2) * 16, 256)] == 0) {
                                                donor_replacementGLF_dead6d--;
                                                GLF_dead6map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead6p.x) + (donor_replacementGLF_dead6p.y) * 16, 256)] = 1;
                                                GLF_dead6map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead6p.x) + (donor_replacementGLF_dead6p.y - 1) * 16, 256)] = 1;
                                                GLF_dead6map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead6p.x) + (donor_replacementGLF_dead6p.y - 2) * 16, 256)] = 1;
                                                donor_replacementGLF_dead6p.y -= 2;
                                            }
                                        }
                                    }
                                    _GLF_color = vec4(A[40] / resolution.x, A[44] / resolution.y, 1.0, 1.0);
                                } else if (int(gl_FragCoord.x) < 180) {
                                    if (_GLF_DEAD(false)) {
                                        if (_GLF_DEAD(false)) {
                                            _GLF_color = mix(_GLF_color, _GLF_color, bvec4(true, true, false, true));
                                        }
                                        _GLF_color = vec4(-6.1, 78.65, 5748.5268, 8822.5704);
                                    }
                                    if (_GLF_DEAD(false)) {
                                        vec2 donor_replacementGLF_dead9coord = _GLF_FUZZED(GLF_dead0injectionSwitch);
                                        {
                                            if (donor_replacementGLF_dead9coord.y < 0.6) {
                                                uvec2 GLF_dead9icoord = uvec2(((donor_replacementGLF_dead9coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                                                uint GLF_dead9res1 = uint(((GLF_dead9icoord.x * GLF_dead9icoord.y) >> (GLF_dead9icoord.x & 31u)) & 0xffffffffu);
                                                uint GLF_dead9res2 = uint(((GLF_dead9icoord.x * GLF_dead9icoord.y) << (GLF_dead9icoord.x & 31u)) & 0xffffffffu);
                                                float GLF_dead9res = float(((GLF_dead9res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_dead9res1 & 1u) != 0u ? 1u : 0u));
                                                GLF_dead9_GLF_color = vec4(GLF_dead9res, GLF_dead9res, GLF_dead9res, 1.0);
                                            } else {
                                                ivec2 GLF_dead9icoord = ivec2(((donor_replacementGLF_dead9coord - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                                                int GLF_dead9res3 = ((GLF_dead9icoord.x >> 5) & 1) ^ ((GLF_dead9icoord.y & 32) >> 5);
                                                int GLF_dead9res2 = (GLF_dead9icoord.y * GLF_dead9icoord.y >> 10) & 1;
                                                int GLF_dead9res1 = (GLF_dead9icoord.x * GLF_dead9icoord.y >> 9) & 1;
                                                for (int _injected_loop_counter = _GLF_IDENTITY(0, (0) / 1); _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
                                                    GLF_dead9_GLF_color = vec4(float(GLF_dead9res1 ^ GLF_dead9res2), float(GLF_dead9res2 & GLF_dead9res3), float(GLF_dead9res1 | GLF_dead9res3), 1.0);
                                                }
                                            }
                                        }
                                    }
                                    _GLF_color = vec4(A[45] / resolution.x, A[49] / resolution.y, 1.0, 1.0);
                                } else {
                                    discard;
                                }
                                if (_GLF_DEAD(false)) {
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                            {
                                                ;
                                                do {
                                                    if (_GLF_DEAD(_GLF_IDENTITY(false, (false) && true))) {
                                                        _GLF_color = (_GLF_color * _GLF_color);
                                                    }
                                                } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
                                            }
                                        }
                                    } else {
                                    }
                                    if (_GLF_DEAD(false)) {
                                        if (_GLF_DEAD(false)) {
                                            int donor_replacementGLF_dead4baseIndex = _GLF_FUZZED(38752);
                                            int donor_replacementGLF_dead4data = _GLF_FUZZED(76781);
                                            int donor_replacementGLF_dead4treeIndex = _GLF_FUZZED(-37645);
                                            {
                                                GLF_dead4tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4baseIndex, 10)].leftIndex = donor_replacementGLF_dead4treeIndex;
                                                GLF_dead4makeTreeNode(GLF_dead4tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4treeIndex, 10)], donor_replacementGLF_dead4data);
                                                return;
                                            }
                                        }
                                        _GLF_color = _GLF_color;
                                    }
                                    _GLF_color = _GLF_color;
                                }
                            }
                        } while (_GLF_WRAPPED_LOOP(false));
                    }
                }
            }
        }
    }
}
