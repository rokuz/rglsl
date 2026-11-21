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
    vec2 GLF_live20resolution;
};

ivec2 GLF_live18iter(ivec2 GLF_live18p) {
    if (_GLF_DEAD(false)) {
        return ivec2(1, 1);
    }
    if (GLF_live18p.x > 0) {
        GLF_live18p.y--;
        if (_GLF_DEAD(false)) {
            return ivec2(1, 1);
        }
    }
    if (GLF_live18p.x < 0) {
        GLF_live18p.y++;
    }
    GLF_live18p.x += GLF_live18p.y / 2;
    return GLF_live18p;
}

vec4 GLF_live17gl_FragCoord = _GLF_FUZZED((+vec4((vec2(-656.502, 49.32) - 7420.5104), vec2(-89.87, 2401.0955))));

layout(set = 0, binding = 2) uniform buf2 {
    vec2 GLF_live17injectionSwitch;
};

layout(set = 0, binding = 3) uniform sampler2D GLF_live15tex;
const float GLF_live15weights[9] = float[9](1.0, 0.5, -0.25, 0.5, 1.0, -0.5, -0.25, -0.5, -1.0);
layout(set = 0, binding = 4) uniform sampler2D GLF_live16tex;

layout(set = 0, binding = 5) uniform buf5 {
    float GLF_live12one;
};

mat2 GLF_live12m22 = _GLF_FUZZED(mat2(mat3(-8.2, 30.02, 8323.6491, 1.4, 3.1, -6385.6067, 2557.9867, 2.4, -23.07)));
mat2x3 GLF_live12m23 = _GLF_FUZZED((vec4(-67.42, -71.74, 42.23, 9996.6863).a * mat2x3(4.6, -5837.4849, -92.43, 9093.6869, -354.754, -17.48)));
mat2x4 GLF_live12m24 = _GLF_FUZZED(mat2x4(-69.94, -234.504, -842.667, -8575.1211, -21.29, -336.168, 0.2, 74.48));
mat3x2 GLF_live12m32 = _GLF_FUZZED(mat3x2(234.606, 2.0, -271.765, 6708.7763, 7.4, 4.3));
mat3 GLF_live12m33 = _GLF_FUZZED(mat3(-95.39, -6.3, -2.5, -0.4, 2664.9754, 5.6, -385.153, 7.8, -0.8));
mat3x4 GLF_live12m34 = _GLF_FUZZED(mat3x4(-7275.0037, 639.737, 87.00, -571.968, -87.44, 853.793, -25.98, -1.5, -5345.3516, -1.6, -8.8, 4.9));
mat4x2 GLF_live12m42 = _GLF_FUZZED(mat4x2(mat3x4(-3.5, -1.0, 9944.9447, -35.01, -4.2, -941.938, 4.6, -56.60, 8091.0341, 187.267, 7.7, 4.9)));
mat4x3 GLF_live12m43 = _GLF_FUZZED(mat4x3(-8.2, -0.8, -5133.4455, -2.3, -78.46, 40.09, 8.0, -8.9, 699.572, 3.4, -8555.0972, -2.3));
mat4 GLF_live12m44 = _GLF_FUZZED(mat4(-91.52, 6866.2657, 6.4, 7.8, 53.90, -56.14, 974.549, 53.94, 93.95, -41.05, -287.232, -2.8, 423.474, -81.19, 5.2, -31.06));

layout(set = 0, binding = 6) uniform buf6 {
    vec2 GLF_live11resolution;
};

vec4 GLF_live14_GLF_color = _GLF_FUZZED((vec4(420.460, 82.08, 43.94, 700.530) - 7.0));

struct GLF_live14BST {
    int data;
    int leftIndex;
    int rightIndex;
};

GLF_live14BST GLF_live14tree[10] = GLF_live14BST[10](GLF_live14BST(0, 0, 0), GLF_live14BST(0, 0, 0), GLF_live14BST(0, 0, 0), GLF_live14BST(0, 0, 0), GLF_live14BST(0, 0, 0), GLF_live14BST(0, 0, 0), GLF_live14BST(0, 0, 0), GLF_live14BST(0, 0, 0), GLF_live14BST(0, 0, 0), GLF_live14BST(0, 0, 0));

void GLF_live14makeTreeNode(inout GLF_live14BST GLF_live14tree, int GLF_live14data) {
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
        return;
    }
    GLF_live14tree.data = GLF_live14data;
    GLF_live14tree.leftIndex = -1;
    GLF_live14tree.rightIndex = -1;
    {
        vec2 GLF_live15coord = _GLF_FUZZED(vec2(vec3(-86.20, -191.438, 359.198).x));
        int GLF_live15i = _GLF_FUZZED(-39570);
        int GLF_live15looplimiter0 = 0;
        vec4 GLF_live15res = _GLF_FUZZED(vec4(31.19, -4045.6868, -7.0, -6.7));
        float GLF_live15uvstep = _GLF_FUZZED(-212.579);
        for (int GLF_live15j = 0; GLF_live15j < 3; GLF_live15j++) {
            if (GLF_live15looplimiter0 >= 5) {
                if (_GLF_DEAD(false)) {
                    return;
                }
                {
                    ivec2 GLF_live18p = _GLF_FUZZED(ivec2(-39714, 49732));
                    {
                        GLF_live18p.x -= 16;
                    }
                }
                break;
                {
                    vec4 GLF_live19c = _GLF_FUZZED(vec4(-6.6, -4292.5548, 37.64, 5.7));
                    int GLF_live19looplimiter1 = 0;
                    for (int GLF_live19i = 0; GLF_live19i < 3; GLF_live19i++) {
                        if (GLF_live19looplimiter1 >= 3) {
                            break;
                        }
                        GLF_live19looplimiter1++;
                        {
                            if (GLF_live19c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i, 4)] >= 1.0) {
                                GLF_live19c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i, 4)] = GLF_live19c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i, 4)] * GLF_live19c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i, 4)];
                            }
                        }
                    }
                }
            }
            GLF_live15looplimiter0++;
            {
                GLF_live15res += texture(GLF_live15tex, GLF_live15coord + vec2(float(GLF_live15i - 1) * GLF_live15uvstep, float(GLF_live15j - 1) * GLF_live15uvstep)) * GLF_live15weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15i * 3 + GLF_live15j, 9)];
            }
        }
    }
}

int GLF_live14search(int GLF_live14target) {
    {
        {
            ;
        }
    }
    GLF_live14BST GLF_live14currentNode = GLF_live14BST(0, 0, 0);
    int GLF_live14index = 0;
    {
        int GLF_live14looplimiter1 = 0;
        while (GLF_live14index != -1) {
            if (GLF_live14looplimiter1 >= 6) {
                break;
            }
            GLF_live14looplimiter1++;
            {
                GLF_live14currentNode = GLF_live14tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14index, 10)];
                if (GLF_live14currentNode.data == GLF_live14target) {
                    return GLF_live14target;
                }
                {
                    vec2 GLF_live16coord = _GLF_FUZZED((vec4(5675.3720, -5.2, -3.4, -6.1).qp * vec2(4.9, -33.98)));
                    vec4 GLF_live16res = _GLF_FUZZED(vec4(873.029, -13.86, 1194.3070, 2.9));
                    if (GLF_live16coord.x < 1.0 && GLF_live16coord.y < 1.0) {
                        GLF_live16res = texture(GLF_live16tex, GLF_live16coord);
                    }
                }
                GLF_live14index = GLF_live14target > GLF_live14currentNode.data ? GLF_live14currentNode.rightIndex : GLF_live14currentNode.leftIndex;
            }
            {
                int GLF_live17a = _GLF_FUZZED(-73567);
                vec2 GLF_live17uv = _GLF_FUZZED(((vec2(2432.9972, -2.5) - vec2(148.396, -2.1)) * 6022.0112));
                {
                    GLF_live17uv.y -= step(GLF_live17injectionSwitch.y, GLF_live17uv.x);
                    GLF_live17uv.x -= fract(tanh(GLF_live17uv.x)) / ldexp(GLF_live17injectionSwitch.y, findMSB(GLF_live17a));
                    GLF_live17a--;
                    {
                        int GLF_live18i = _GLF_FUZZED(-29964);
                        ivec2 GLF_live18p = _GLF_FUZZED(ivec2(37221, -51116));
                        {
                            int GLF_live18looplimiter0 = 0;
                            for (GLF_live18i = 0; GLF_live18i < 100; GLF_live18i++) {
                                if (GLF_live18looplimiter0 >= 7) {
                                    break;
                                }
                                if (_GLF_DEAD(false)) {
                                    break;
                                }
                                GLF_live18looplimiter0++;
                                {
                                    GLF_live18p = GLF_live18iter(GLF_live18p);
                                }
                            }
                        }
                    }
                }
            }
        }
        {
            ivec2 GLF_live18p = _GLF_FUZZED((81053 - ivec2(75584, 17507)));
            {
                GLF_live18p.x -= 16;
            }
        }
    }
    return -1;
    {
        vec2 GLF_live15coord = _GLF_FUZZED((vec2(788.156, -180.499) - 6546.6603));
        int GLF_live15i = _GLF_FUZZED(44040);
        {
            vec4 GLF_live19c = _GLF_FUZZED(vec4(-41.16, -9.7, 4221.3271, 528.793));
            int GLF_live19i = _GLF_FUZZED((~(-4236)));
            int GLF_live19looplimiter1 = 0;
            {
                if (GLF_live19looplimiter1 >= 3) {
                    ;
                }
                GLF_live19looplimiter1++;
                {
                    if (GLF_live19c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i, 4)] >= 1.0) {
                        GLF_live19c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i, 4)] = GLF_live19c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i, 4)] * GLF_live19c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i, 4)];
                    }
                }
            }
        }
        vec4 GLF_live15res = _GLF_FUZZED(vec4(-42.28, 1188.5535, 191.121, 7.9));
        float GLF_live15uvstep = _GLF_FUZZED(vec4(-625.543, -2518.0221, 9.0, -2.2).b);
        {
            {
                int GLF_live15looplimiter0 = 0;
                for (int GLF_live15j = 0; GLF_live15j < 3; GLF_live15j++) {
                    if (GLF_live15looplimiter0 >= 5) {
                        if (_GLF_DEAD(false)) {
                            return 1;
                        }
                        break;
                    }
                    GLF_live15looplimiter0++;
                    {
                        GLF_live15res += texture(GLF_live15tex, GLF_live15coord + vec2(float(GLF_live15i - 1) * GLF_live15uvstep, float(GLF_live15j - 1) * GLF_live15uvstep)) * GLF_live15weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15i * 3 + GLF_live15j, 9)];
                    }
                }
            }
        }
    }
}

layout(set = 0, binding = 7) uniform sampler2D GLF_live13tex;

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
}

struct GLF_live9BST {
    int data;
    int leftIndex;
    int rightIndex;
};

GLF_live9BST GLF_live9tree[10] = GLF_live9BST[10](GLF_live9BST(0, 0, 0), GLF_live9BST(0, 0, 0), GLF_live9BST(0, 0, 0), GLF_live9BST(0, 0, 0), GLF_live9BST(0, 0, 0), GLF_live9BST(0, 0, 0), GLF_live9BST(0, 0, 0), GLF_live9BST(0, 0, 0), GLF_live9BST(0, 0, 0), GLF_live9BST(0, 0, 0));

void GLF_live9makeTreeNode(inout GLF_live9BST GLF_live9tree, int GLF_live9data) {
    GLF_live9tree.data = GLF_live9data;
    GLF_live9tree.leftIndex = -1;
    GLF_live9tree.rightIndex = -1;
}

vec4 GLF_live10_GLF_color = _GLF_FUZZED(((-473.388) + vec4(-245.017, -30.42, 2121.7636, (0.3 - (-87.53)))));

layout(set = 0, binding = 8) uniform buf8 {
    vec2 GLF_live10injectionSwitch;
};

float GLF_live10compute_derivative_x(float GLF_live10v) {
    return dFdx(GLF_live10v) * GLF_live10injectionSwitch.y;
    {
        float GLF_live20x = _GLF_FUZZED(-225.678);
        float GLF_live20y = _GLF_FUZZED(((-810.687) + 715.286));
        if (_GLF_DEAD(false)) {
            return 1.0;
        }
        {
            GLF_live20x = 1.0;
            GLF_live20y = 1.0;
        }
    }
}

float GLF_live10compute_derivative_y(float GLF_live10v) {
    return dFdy(GLF_live10v) * GLF_live10injectionSwitch.y;
}

float GLF_live10compute_stripe(float GLF_live10v) {
    return smoothstep(-.9, 1., (GLF_live10v) / ((GLF_live10injectionSwitch.y > GLF_live10injectionSwitch.x) ? GLF_live10compute_derivative_x(GLF_live10v) : GLF_live10compute_derivative_y(GLF_live10v)));
}

layout(set = 0, binding = 9) uniform buf9 {
    vec2 GLF_live5injectionSwitch;
};

struct GLF_live5QuicksortObject {
    int numbers[10];
};

GLF_live5QuicksortObject GLF_live5obj = GLF_live5QuicksortObject(int[10](0, 0, 0, 0, 0, 0, 0, 0, 0, 0));

vec3 GLF_live5palette(vec3 GLF_live5a, vec3 GLF_live5b, vec3 GLF_live5c, vec3 GLF_live5d) {
    return fract(mix(GLF_live5d * GLF_live5a, GLF_live5a * GLF_live5c, GLF_live5b + GLF_live5d - GLF_live5c));
    {
        vec2 GLF_live13coord = _GLF_FUZZED(((-vec2(18.66, 8.9)) - 2.8));
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < abs(0.0))))) {
            return vec3(1.0, 1.0, 1.0);
            {
                {
                    ;
                }
            }
        }
        int GLF_live13i = _GLF_FUZZED(((uvec2(44670u, 120500u) != uvec2(13842u, 131290u)) ? (+39791) : (-39647)));
        vec4 GLF_live13texel = _GLF_FUZZED(vec4(29.04, 951.305, 19.09, 1.5));
        {
            int GLF_live13looplimiter0 = 0;
            while (GLF_live13texel.x + GLF_live13texel.y + GLF_live13texel.z > 1.0 && GLF_live13i < 16) {
                if (GLF_live13looplimiter0 >= 4) {
                    break;
                    {
                        int GLF_live17looplimiter2 = 0;
                        if (GLF_live17looplimiter2 >= 6) {
                            ;
                        }
                    }
                }
                GLF_live13looplimiter0++;
                {
                    GLF_live13coord = GLF_live13texel.xz + GLF_live13texel.yy;
                    GLF_live13coord = floor(GLF_live13coord * 256.0) / 256.0;
                    GLF_live13texel = texture(GLF_live13tex, GLF_live13coord);
                    GLF_live13i++;
                }
            }
        }
    }
}

struct _GLF_struct_1 {
    mat2 _f0;
    ivec4 _f1;
    int _f2;
};

struct _GLF_struct_0 {
    ivec4 _f0;
    float x_new;
    ivec4 _f1;
    int _f2;
    uvec4 _f3;
    _GLF_struct_1 _f4;
};

struct _GLF_struct_5 {
    vec3 _f0;
    bvec2 _f1;
    mat4x3 _f2;
    mat3x2 _f3;
    float _f4;
    ivec2 _f5;
    mat4x2 _f6;
};

struct _GLF_struct_4 {
    mat2 _f0;
};

struct _GLF_struct_3 {
    _GLF_struct_4 _f0;
    bool _f1;
    _GLF_struct_5 _f2;
    mat2x4 _f3;
    mat2 _f4;
};

struct _GLF_struct_2 {
    uint uselessOutVariable;
    _GLF_struct_3 _f0;
};

struct _GLF_struct_6 {
    mat4 _f0;
    int GLF_live1looplimiter0;
    ivec4 _f1;
};

layout(set = 0, binding = 10) uniform buf10 {
    vec2 injectionSwitch;
};

layout(set = 0, binding = 11) uniform buf11 {
    vec2 GLF_live0injectionSwitch;
};

struct GLF_live0QuicksortObject {
    int numbers[10];
};

GLF_live0QuicksortObject GLF_live0obj = GLF_live0QuicksortObject(int[10](0, 0, 0, 0, 0, 0, 0, 0, 0, 0));

vec3 GLF_live0palette(vec3 GLF_live0a, vec3 GLF_live0b, vec3 GLF_live0c, vec3 GLF_live0d) {
    {
        int GLF_live7result = _GLF_FUZZED(int(154115u));
        if (_GLF_DEAD(false)) {
            {
                if (_GLF_DEAD(false)) {
                    return vec3(1.0, 1.0, 1.0);
                }
                {
                    int GLF_live17looplimiter0 = 0;
                    if (GLF_live17looplimiter0 >= 6) {
                        ;
                    }
                }
                {
                    ;
                    {
                        float GLF_live20c_im = _GLF_FUZZED(2161.1621);
                        float GLF_live20c_re = _GLF_FUZZED(-2078.4497);
                        int GLF_live20iteration = _GLF_FUZZED(ivec4(28982, -81581, 95604, 80433).p);
                        int GLF_live20k = _GLF_FUZZED(ivec4(40363, -72932, 85598, 14762).x);
                        float GLF_live20x = _GLF_FUZZED(((-9.9) + float(65777)));
                        float GLF_live20y = _GLF_FUZZED((+2.3));
                        {
                            if (GLF_live20x * GLF_live20x + GLF_live20y * GLF_live20y > 4.0) {
                                ;
                            }
                            float GLF_live20x_new = GLF_live20x * GLF_live20x - GLF_live20y * GLF_live20y + GLF_live20c_re;
                            GLF_live20y = 2.0 * GLF_live20x * GLF_live20y + GLF_live20c_im;
                            GLF_live20x = GLF_live20x_new;
                            GLF_live20iteration++;
                            GLF_live20k++;
                        }
                    }
                }
            }
            return vec3(1.0, 1.0, 1.0);
        }
        {
            int GLF_live12looplimiter1 = 0;
            if (GLF_live12looplimiter1 >= 6) {
                ;
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    return vec3(1.0, 1.0, 1.0);
                }
                if (_GLF_DEAD(false)) {
                    return vec3(1.0, 1.0, 1.0);
                }
            }
        }
        {
            {
                ;
            }
        }
        int GLF_live7sum = _GLF_FUZZED(((-50749) & 24405));
        {
            vec3 GLF_live17color = _GLF_FUZZED(vec3(6.3, -5.9, 6.5));
            {
                int GLF_live18i = _GLF_FUZZED(-37794);
                ivec2 GLF_live18p = _GLF_FUZZED((ivec2(-8475, -15038) ^ ivec2(-77755, -5385)));
                {
                    int GLF_live18looplimiter0 = 0;
                    for (GLF_live18i = 0; GLF_live18i < 100; GLF_live18i++) {
                        if (GLF_live18looplimiter0 >= 7) {
                            break;
                        }
                        GLF_live18looplimiter0++;
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            discard;
                        }
                        {
                            GLF_live18p = GLF_live18iter(GLF_live18p);
                        }
                    }
                }
            }
            {
                GLF_live17color.yz += GLF_live17color.yz;
            }
        }
        {
            switch (GLF_live7result) {
                case -1:
                    {
                        int GLF_live13looplimiter0 = 0;
                        if (GLF_live13looplimiter0 >= 4) {
                            ;
                            {
                                vec2 GLF_live15coord = _GLF_FUZZED(vec2(0.9, -3.2));
                                int GLF_live15looplimiter1 = 0;
                                vec4 GLF_live15res = _GLF_FUZZED(vec4(3.6, 1.1, 1.1, 37.34).pqqq);
                                float GLF_live15uvstep = _GLF_FUZZED(-747.567);
                                for (int GLF_live15i = 0; GLF_live15i < 3; GLF_live15i++) {
                                    if (GLF_live15looplimiter1 >= 5) {
                                        break;
                                    }
                                    GLF_live15looplimiter1++;
                                    {
                                        if (_GLF_DEAD(false)) {
                                            break;
                                        }
                                        {
                                            int GLF_live15looplimiter0 = 0;
                                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                discard;
                                            }
                                            for (int GLF_live15j = 0; GLF_live15j < 3; GLF_live15j++) {
                                                {
                                                    float GLF_live19limit = _GLF_FUZZED(86.56);
                                                    int GLF_live19looplimiter0 = 0;
                                                    float GLF_live19ref = _GLF_FUZZED(-98.01);
                                                    float GLF_live19s = _GLF_FUZZED((+vec4(744.410, -37.27, 64.92, 2326.7848).p));
                                                    for (int GLF_live19i = 1; GLF_live19i < 800; GLF_live19i++) {
                                                        if (GLF_live19looplimiter0 >= 3) {
                                                            break;
                                                        }
                                                        GLF_live19looplimiter0++;
                                                        {
                                                            if (mod(float(GLF_live19i), GLF_live19ref) <= 0.01) {
                                                                GLF_live19s += 0.2;
                                                            }
                                                            if (float(GLF_live19i) >= GLF_live19limit) {
                                                                ;
                                                            }
                                                        }
                                                    }
                                                }
                                                if (GLF_live15looplimiter0 >= 5) {
                                                    break;
                                                }
                                                GLF_live15looplimiter0++;
                                                {
                                                    int GLF_live21iteration = _GLF_FUZZED(36742);
                                                    {
                                                        ;
                                                    }
                                                }
                                                {
                                                    GLF_live15res += texture(GLF_live15tex, GLF_live15coord + vec2(float(GLF_live15i - 1) * GLF_live15uvstep, float(GLF_live15j - 1) * GLF_live15uvstep)) * GLF_live15weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15i * 3 + GLF_live15j, 9)];
                                                }
                                                {
                                                    int GLF_live21looplimiter1 = 0;
                                                    if (GLF_live21looplimiter1 >= 3) {
                                                        ;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    GLF_live7sum += 1;
                    break;
                case 0:
                    ;
                    if (_GLF_DEAD(false)) {
                        return vec3(1.0, 1.0, 1.0);
                    }
                    {
                        vec2 GLF_live15coord = _GLF_FUZZED(vec2((true ? 308.370 : 0.5), 95.37));
                        int GLF_live15i = _GLF_FUZZED(-45088);
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            return vec3(1.0, 1.0, 1.0);
                        }
                        int GLF_live15looplimiter1 = 0;
                        vec4 GLF_live15res = _GLF_FUZZED(vec4(3465.7182, (-vec2(-6.2, 767.016).xx), -82.94));
                        float GLF_live15uvstep = _GLF_FUZZED(9.2);
                        {
                            if (_GLF_DEAD(false)) {
                                return vec3(1.0, 1.0, 1.0);
                            }
                            if (GLF_live15looplimiter1 >= 5) {
                                ;
                            }
                            GLF_live15looplimiter1++;
                            {
                                {
                                    int GLF_live15looplimiter0 = 0;
                                    for (int GLF_live15j = 0; GLF_live15j < 3; GLF_live15j++) {
                                        if (GLF_live15looplimiter0 >= 5) {
                                            break;
                                            {
                                                int GLF_live21looplimiter1 = 0;
                                                if (GLF_live21looplimiter1 >= 3) {
                                                    ;
                                                }
                                            }
                                        }
                                        GLF_live15looplimiter0++;
                                        if (_GLF_DEAD(false)) {
                                            discard;
                                        }
                                        {
                                            GLF_live15res += texture(GLF_live15tex, GLF_live15coord + vec2(float(GLF_live15i - 1) * GLF_live15uvstep, float(GLF_live15j - 1) * GLF_live15uvstep)) * GLF_live15weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15i * 3 + GLF_live15j, 9)];
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
        }
    }
    return fract(mix(GLF_live0d * GLF_live0a, GLF_live0a * GLF_live0c, GLF_live0b + GLF_live0d - GLF_live0c));
}

struct GLF_live1QuicksortObject {
    int numbers[10];
};

GLF_live1QuicksortObject GLF_live1obj = GLF_live1QuicksortObject(int[10](0, 0, 0, 0, 0, 0, 0, 0, 0, 0));
layout(location = 0) out vec4 _GLF_color;

layout(set = 0, binding = 0) uniform buf0 {
    vec2 resolution;
};

vec3 pickColor(int i) {
    {
        {
            int GLF_live18looplimiter0 = 0;
            ivec2 GLF_live18p = _GLF_FUZZED(ivec2(-5660, 70089));
            {
                if (GLF_live18looplimiter0 >= 7) {
                    ;
                }
                GLF_live18looplimiter0++;
                {
                    GLF_live18p = GLF_live18iter(GLF_live18p);
                }
            }
        }
        {
            ;
        }
        {
            float GLF_live20c_im = _GLF_FUZZED(4.8);
            float GLF_live20c_re = _GLF_FUZZED(-83.09);
            int GLF_live20iteration = _GLF_FUZZED((-((-60079) | 97929)));
            int GLF_live20iterationCap = _GLF_FUZZED(-3570);
            int GLF_live20k = _GLF_FUZZED((+ivec2(66752, 68696)).x);
            float GLF_live20x = _GLF_FUZZED(-519.985);
            float GLF_live20y = _GLF_FUZZED(-99.51);
            {
                if (_GLF_DEAD(false)) {
                    return vec3(1.0, 1.0, 1.0);
                }
                int GLF_live20looplimiter0 = 0;
                do {
                    if (GLF_live20looplimiter0 >= 3) {
                        break;
                    }
                    GLF_live20looplimiter0++;
                    {
                        if (GLF_live20x * GLF_live20x + GLF_live20y * GLF_live20y > 4.0) {
                            break;
                        }
                        float GLF_live20x_new = GLF_live20x * GLF_live20x - GLF_live20y * GLF_live20y + GLF_live20c_re;
                        GLF_live20y = 2.0 * GLF_live20x * GLF_live20y + GLF_live20c_im;
                        GLF_live20x = GLF_live20x_new;
                        GLF_live20iteration++;
                        GLF_live20k++;
                    }
                } while (GLF_live20k < bitfieldInsert(GLF_live20iterationCap + (257.0 > GLF_live20resolution.y ? 1 : 0), 0, 0, 0));
            }
        }
    }
    return vec3(float(i) / 50.0, float(i) / 120.0, float(i) / 140.0);
    {
        int GLF_live14looplimiter0 = 0;
        if (GLF_live14looplimiter0 >= 6) {
            ;
        }
    }
}

float _GLF_outlined_0(float x, float y, float c_im) {
    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
        return 1.0;
    }
    {
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
            return 1.0;
        }
        ivec2 GLF_live18p = _GLF_FUZZED((86046 | ivec2(-78467, -78558)));
        {
            GLF_live18p.y++;
        }
    }
    return 2.0 * x * y + c_im;
}

vec3 mand(float xCoord, float yCoord) {
    {
        int GLF_live17a = _GLF_FUZZED(((uvec3(133202u, 4848u, 61534u) != uvec3(112332u, 108136u, 109041u)) ? (86945 + (-72718)) : 12915));
        int GLF_live17b = _GLF_FUZZED((true ? 91809 : 59490));
        int GLF_live17looplimiter1 = 0;
        vec2 GLF_live17uv = _GLF_FUZZED(vec3(-96.68, -7.6, 95.03).xy);
        {
            if (GLF_live17looplimiter1 >= 6) {
                ;
                {
                    vec4 GLF_live19c = _GLF_FUZZED(vec3(-6.2, -78.84, -1.0).zyzz);
                    int GLF_live19i = _GLF_FUZZED(-80412);
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        return vec3(1.0, 1.0, 1.0);
                    }
                    int GLF_live19looplimiter1 = 0;
                    {
                        if (GLF_live19looplimiter1 >= 3) {
                            ;
                        }
                        GLF_live19looplimiter1++;
                        {
                            if (GLF_live19c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i, 4)] >= 1.0) {
                                GLF_live19c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i, 4)] = GLF_live19c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i, 4)] * GLF_live19c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i, 4)];
                            }
                        }
                    }
                }
            }
            GLF_live17looplimiter1++;
            {
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    return vec3(1.0, 1.0, 1.0);
                }
                GLF_live17uv.y -= step(GLF_live17injectionSwitch.y, GLF_live17uv.x) + float(GLF_live17a);
                GLF_live17uv.x *= (isnan(GLF_live17uv.y) ? cosh(GLF_live17gl_FragCoord.y) : tanh(GLF_live17gl_FragCoord.x));
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    return vec3(1.0, 1.0, 1.0);
                }
                {
                    float GLF_live20c_im = _GLF_FUZZED((50.03 + 667.034));
                    float GLF_live20c_re = _GLF_FUZZED((-vec2(-713.332, 8.0).s));
                    int GLF_live20iteration = _GLF_FUZZED((58636));
                    int GLF_live20iterationCap = _GLF_FUZZED(-57300);
                    int GLF_live20k = _GLF_FUZZED((-((-12583) ^ 46005)));
                    float GLF_live20x = _GLF_FUZZED((((bvec4(true, false, false, true) == bvec4(true, true, false, false)) ? 8.9 : 7142.6952) * (-95.15)));
                    float GLF_live20y = _GLF_FUZZED((-vec4(44.76, 93.46, -65.16, 5906.6509).s));
                    {
                        int GLF_live20looplimiter0 = 0;
                        do {
                            if (GLF_live20looplimiter0 >= 3) {
                                break;
                            }
                            GLF_live20looplimiter0++;
                            {
                                if (GLF_live20x * GLF_live20x + GLF_live20y * GLF_live20y > 4.0) {
                                    break;
                                }
                                float GLF_live20x_new = GLF_live20x * GLF_live20x - GLF_live20y * GLF_live20y + GLF_live20c_re;
                                GLF_live20y = 2.0 * GLF_live20x * GLF_live20y + GLF_live20c_im;
                                GLF_live20x = GLF_live20x_new;
                                GLF_live20iteration++;
                                GLF_live20k++;
                            }
                        } while (GLF_live20k < bitfieldInsert(GLF_live20iterationCap + (257.0 > GLF_live20resolution.y ? 1 : 0), 0, 0, 0));
                    }
                }
                GLF_live17b--;
            }
        }
    }
    {
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
            return vec3(1.0, 1.0, 1.0);
            {
                vec2 GLF_live13coord = _GLF_FUZZED(((vec2(-5.9, 6783.2405) + 747.706) * 3.5));
                int GLF_live13i = _GLF_FUZZED(((-19119) & (-51289)));
                if (_GLF_DEAD(false)) {
                    return vec3(1.0, 1.0, 1.0);
                }
                int GLF_live13looplimiter0 = 0;
                vec4 GLF_live13texel = _GLF_FUZZED(vec4(72.30, -194.713, 67.39, -5.1));
                if (_GLF_DEAD(false)) {
                    return vec3(1.0, 1.0, 1.0);
                }
                while (GLF_live13texel.x + GLF_live13texel.y + GLF_live13texel.z > 1.0 && GLF_live13i < 16) {
                    if (GLF_live13looplimiter0 >= 4) {
                        {
                            int GLF_live17a = _GLF_FUZZED(54153);
                            int GLF_live17b = _GLF_FUZZED(19987);
                            int GLF_live17c = _GLF_FUZZED((~(-54758)));
                            int GLF_live17looplimiter2 = 0;
                            vec2 GLF_live17uv = _GLF_FUZZED(vec2((+(-7.3)), 61.25));
                            do {
                                if (GLF_live17looplimiter2 >= 6) {
                                    break;
                                }
                                GLF_live17looplimiter2++;
                                {
                                    GLF_live17uv.y -= step(GLF_live17injectionSwitch.y, GLF_live17uv.x) + float(GLF_live17a) + float(GLF_live17b);
                                    GLF_live17uv.x += ldexp(GLF_live17injectionSwitch.y, isinf(GLF_live17uv.y + GLF_live17uv.x) ? findMSB(GLF_live17b) : findMSB(GLF_live17a));
                                    GLF_live17c--;
                                }
                            } while (GLF_live17c > int(GLF_live17injectionSwitch.x));
                        }
                        break;
                    }
                    GLF_live13looplimiter0++;
                    {
                        GLF_live13coord = GLF_live13texel.xz + GLF_live13texel.yy;
                        GLF_live13coord = floor(GLF_live13coord * 256.0) / 256.0;
                        GLF_live13texel = texture(GLF_live13tex, GLF_live13coord);
                        GLF_live13i++;
                        if (_GLF_DEAD(_GLF_IDENTITY(false, !(!(false))))) {
                            {
                                {
                                    ivec2 GLF_live18p = _GLF_FUZZED(ivec2(-37327, -23027));
                                    {
                                        GLF_live18p = GLF_live18iter(GLF_live18p);
                                    }
                                }
                                int GLF_live17a = _GLF_FUZZED(86689);
                                int GLF_live17b = _GLF_FUZZED((78858 & (+2429)));
                                int GLF_live17looplimiter1 = 0;
                                vec2 GLF_live17uv = _GLF_FUZZED(vec3(-9812.3162, -71.21, 9.3).ts);
                                do {
                                    if (GLF_live17looplimiter1 >= 6) {
                                        break;
                                        if (_GLF_DEAD(false)) {
                                            break;
                                        }
                                    }
                                    GLF_live17looplimiter1++;
                                    {
                                        GLF_live17uv.y -= step(GLF_live17injectionSwitch.y, GLF_live17uv.x) + float(GLF_live17a);
                                        GLF_live17uv.x *= (isnan(GLF_live17uv.y) ? cosh(GLF_live17gl_FragCoord.y) : tanh(GLF_live17gl_FragCoord.x));
                                        GLF_live17b--;
                                    }
                                } while (GLF_live17b > int(GLF_live17injectionSwitch.x));
                            }
                            break;
                        }
                    }
                    {
                        ivec2 GLF_live18p = _GLF_FUZZED((true ? ivec2(98709, -21356) : ivec2(64899, -50670)));
                        if (GLF_live18p.x > 0) {
                            GLF_live18p.y--;
                        }
                    }
                }
            }
            if (_GLF_DEAD(false)) {
                return vec3(1.0, 1.0, 1.0);
                {
                    vec4 GLF_live19c = _GLF_FUZZED(vec4(152.241, -6.6, 2179.5834, -7.8));
                    int GLF_live19looplimiter1 = 0;
                    for (int GLF_live19i = 0; GLF_live19i < 3; GLF_live19i++) {
                        if (GLF_live19looplimiter1 >= 3) {
                            break;
                        }
                        GLF_live19looplimiter1++;
                        {
                            if (GLF_live19c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i, 4)] >= 1.0) {
                                GLF_live19c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i, 4)] = GLF_live19c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i, 4)] * GLF_live19c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i, 4)];
                            }
                        }
                    }
                }
            }
            {
                int GLF_live19looplimiter1 = 0;
                if (GLF_live19looplimiter1 >= 3) {
                    ;
                }
            }
        }
        {
            ;
        }
    }
    {
        ivec2 GLF_live18p = _GLF_FUZZED((ivec2(-39931, -22174) & (-40298)));
        {
            GLF_live18p.y++;
        }
    }
    float height = resolution.y;
    float width = resolution.x;
    float xpos = xCoord * 0.1 + (resolution.x * 0.6);
    {
        vec2 GLF_live4pos = _GLF_FUZZED(((+vec2(-82.51, -39.16)) + (-337.191)));
        {
            int GLF_live8directions = _GLF_FUZZED(((+56339) + 34381));
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                return vec3(1.0, 1.0, 1.0);
            }
            {
                GLF_live8directions += 1;
            }
            if (_GLF_DEAD(false)) {
                return vec3(1.0, 1.0, 1.0);
            }
        }
        vec4 GLF_live4quad = _GLF_FUZZED(vec4(10.68, 2.3, 7.9, 3.9));
        if (GLF_live4pos.y < GLF_live4quad.y) {
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                return vec3(1.0, 1.0, 1.0);
            }
            ;
        }
        if (_GLF_DEAD(false)) {
            return vec3(1.0, 1.0, 1.0);
        }
        {
            vec2 GLF_live15coord = _GLF_FUZZED((vec2(-4719.5388, -2.9) * vec2(-981.987, -4851.1203)));
            {
                int GLF_live20looplimiter2 = 0;
                if (_GLF_DEAD(false)) {
                    return vec3(1.0, 1.0, 1.0);
                }
                if (GLF_live20looplimiter2 >= 3) {
                    ;
                }
            }
            int GLF_live15i = _GLF_FUZZED(32067);
            int GLF_live15j = _GLF_FUZZED((57441 | (43233 * ((-61222) ^ (-122)))));
            int GLF_live15looplimiter0 = 0;
            vec4 GLF_live15res = _GLF_FUZZED(((-6.7) - vec4(-7.7, -59.24, 640.002, 7264.7640)));
            float GLF_live15uvstep = _GLF_FUZZED(-7.8);
            {
                {
                    ;
                }
            }
            {
                if (GLF_live15looplimiter0 >= 5) {
                    ;
                }
                GLF_live15looplimiter0++;
                if (_GLF_DEAD(false)) {
                    return vec3(1.0, 1.0, 1.0);
                }
                {
                    GLF_live15res += texture(GLF_live15tex, GLF_live15coord + vec2(float(GLF_live15i - 1) * GLF_live15uvstep, float(GLF_live15j - 1) * GLF_live15uvstep)) * GLF_live15weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15i * 3 + GLF_live15j, 9)];
                }
            }
        }
    }
    {
        {
            ;
        }
    }
    {
        {
            int GLF_live14count = _GLF_FUZZED(23911);
            {
                if (_GLF_DEAD(false)) {
                    return vec3(1.0, 1.0, 1.0);
                }
                vec2 GLF_live15coord = _GLF_FUZZED((vec2(-454.291, 8.3) * 272.152));
                int GLF_live15i = _GLF_FUZZED(-87096);
                int GLF_live15j = _GLF_FUZZED(-48526);
                vec4 GLF_live15res = _GLF_FUZZED(vec4(-2708.9395, 6.1, 652.738, -40.39));
                float GLF_live15uvstep = _GLF_FUZZED(vec4(3.0, -3917.4577, -39.69, -38.26).a);
                {
                    GLF_live15res += texture(GLF_live15tex, GLF_live15coord + vec2(float(GLF_live15i - 1) * GLF_live15uvstep, float(GLF_live15j - 1) * GLF_live15uvstep)) * GLF_live15weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15i * 3 + GLF_live15j, 9)];
                }
            }
            if (_GLF_DEAD(false)) {
                {
                    int GLF_live19i = _GLF_FUZZED(19704);
                    float GLF_live19limit = _GLF_FUZZED((true ? 7073.9389 : 6842.5531));
                    float GLF_live19ref = _GLF_FUZZED((-(-4609.3965)));
                    float GLF_live19s = _GLF_FUZZED(17.93);
                    {
                        if (mod(float(GLF_live19i), GLF_live19ref) <= 0.01) {
                            GLF_live19s += 0.2;
                        }
                        if (float(GLF_live19i) >= GLF_live19limit) {
                            ;
                        }
                    }
                }
                return vec3(1.0, 1.0, 1.0);
            }
            int GLF_live14result = _GLF_FUZZED(-9411);
            {
                {
                    ;
                }
            }
            if (GLF_live14result == -1) {
                GLF_live14count++;
            }
            if (_GLF_DEAD(false)) {
                return vec3(1.0, 1.0, 1.0);
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                return vec3(1.0, 1.0, 1.0);
            }
        }
        if (_GLF_DEAD(false)) {
            return vec3(1.0, 1.0, 1.0);
        }
        vec3 GLF_live10col = _GLF_FUZZED(vec3(6.3, 241.080, -6801.7077));
        vec2 GLF_live10uv = _GLF_FUZZED((vec3(3.8, -95.04, 8.4) * mat2x3(8465.6393, -898.669, float(147078u), 45.33, -9.4, -604.705)));
        {
            float GLF_live10stripe = GLF_live10compute_stripe(cos((GLF_live10uv.x + GLF_live10uv.y) * 20.0));
            GLF_live10col = mix(vec3(GLF_live10uv.x, 0, 0.75), vec3(.8, .7, GLF_live10uv.x), GLF_live10stripe);
            {
                vec2 GLF_live16coord = _GLF_FUZZED(vec2(-17.56, -116.924));
                int GLF_live16i = _GLF_FUZZED(((-11729) - 85548));
                int GLF_live16looplimiter0 = 0;
                {
                    if (GLF_live16looplimiter0 >= 7) {
                        ;
                    }
                    {
                        vec4 GLF_live19c = _GLF_FUZZED((((-91.92) * (-6.7)) + vec4(873.464, -8.3, 0.7, 8159.3869)));
                        int GLF_live19i = _GLF_FUZZED((-(93483 & (-46951))));
                        {
                            if (GLF_live19c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i, 4)] >= 1.0) {
                                GLF_live19c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i, 4)] = GLF_live19c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i, 4)] * GLF_live19c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i, 4)];
                            }
                        }
                    }
                    GLF_live16looplimiter0++;
                    {
                        if (GLF_live16coord.x > 1.0)
                            GLF_live16coord.x -= 1.0;
                        if (GLF_live16coord.y > 1.0)
                            GLF_live16coord.y -= 1.0;
                        GLF_live16coord *= 2.0;
                        {
                            int GLF_live21c_im = _GLF_FUZZED(-80416);
                            int GLF_live21c_re = _GLF_FUZZED(-20685);
                            int GLF_live21iteration = _GLF_FUZZED((-47548));
                            int GLF_live21looplimiter0 = 0;
                            int GLF_live21x = _GLF_FUZZED(ivec3(73584, 36880, 55360).g);
                            int GLF_live21y = _GLF_FUZZED(int(140741u));
                            for (int GLF_live21k = 0; GLF_live21k < 1000; GLF_live21k++) {
                                if (GLF_live21looplimiter0 >= 3) {
                                    break;
                                }
                                GLF_live21looplimiter0++;
                                {
                                    if (GLF_live21x * GLF_live21x + GLF_live21y * GLF_live21y > 262144) {
                                        break;
                                    }
                                    int GLF_live21x_new = ((GLF_live21x * GLF_live21x - GLF_live21y * GLF_live21y) / 256 + GLF_live21c_re);
                                    GLF_live21y = (2 * GLF_live21x * GLF_live21y / 256 + GLF_live21c_im);
                                    GLF_live21x = GLF_live21x_new;
                                    GLF_live21iteration++;
                                }
                            }
                        }
                        GLF_live16i++;
                    }
                }
            }
            GLF_live10_GLF_color = vec4(GLF_live10col, 1.0);
            if (_GLF_DEAD(false)) {
                return vec3(1.0, 1.0, 1.0);
            }
            ;
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < sqrt(0.0))))) {
                return vec3(1.0, 1.0, 1.0);
                {
                    {
                        ;
                        {
                            int GLF_live21looplimiter1 = 0;
                            if (GLF_live21looplimiter1 >= 3) {
                                ;
                            }
                        }
                    }
                }
            }
        }
    }
    float ypos = yCoord * 0.1 + (resolution.y * 0.4);
    float c_re = 0.8 * (xpos - width / 2.0) * 4.0 / width - 0.4;
    {
        vec2 GLF_live16coord = _GLF_FUZZED(vec2(vec3(-43.11, 9542.7083, -18.73)));
        int GLF_live16i = _GLF_FUZZED((false ? 19342 : (-62020)));
        int GLF_live16looplimiter0 = 0;
        while (GLF_live16i < 1 && GLF_live16coord.x > 1.0 || GLF_live16coord.y > 1.0) {
            if (GLF_live16looplimiter0 >= 7) {
                break;
            }
            GLF_live16looplimiter0++;
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                return vec3(1.0, 1.0, 1.0);
            }
            {
                if (GLF_live16coord.x > 1.0) {
                    if (_GLF_DEAD(false)) {
                        continue;
                    }
                    GLF_live16coord.x -= 1.0;
                }
                if (GLF_live16coord.y > 1.0)
                    GLF_live16coord.y -= 1.0;
                GLF_live16coord *= 2.0;
                {
                    {
                        ;
                    }
                }
                GLF_live16i++;
            }
        }
    }
    {
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            {
                ivec2 GLF_live18p = _GLF_FUZZED(ivec2(-83967, 36673));
                {
                    GLF_live18p = GLF_live18iter(GLF_live18p);
                }
            }
            return vec3(1.0, 1.0, 1.0);
        }
        {
            {
                {
                    ;
                    {
                        ivec2 GLF_live18p = _GLF_FUZZED((24596 - ivec2(-93702, 61687)));
                        {
                            GLF_live18p.y++;
                        }
                    }
                }
                if (_GLF_DEAD(false)) {
                    return vec3(1.0, 1.0, 1.0);
                }
                {
                    vec2 GLF_live16coord = _GLF_FUZZED(vec2(-1.2, 0.7));
                    if (GLF_live16coord.y > 1.0)
                        GLF_live16coord.y -= 1.0;
                }
            }
            {
                vec2 GLF_live15coord = _GLF_FUZZED(vec2(576.393, 25.27));
                vec4 GLF_live15res = _GLF_FUZZED((-vec2(3.0, 5039.0077)).rrrr);
                float GLF_live15uvstep = _GLF_FUZZED((((-866.718) * 3906.5633)));
                {
                    int GLF_live15looplimiter1 = 0;
                    for (int GLF_live15i = 0; GLF_live15i < 3; GLF_live15i++) {
                        if (GLF_live15looplimiter1 >= 5) {
                            {
                                int GLF_live21looplimiter1 = 0;
                                if (GLF_live21looplimiter1 >= 3) {
                                    ;
                                }
                            }
                            break;
                            if (_GLF_DEAD(false)) {
                                break;
                            }
                        }
                        GLF_live15looplimiter1++;
                        {
                            {
                                int GLF_live15looplimiter0 = 0;
                                for (int GLF_live15j = 0; GLF_live15j < 3; GLF_live15j++) {
                                    if (GLF_live15looplimiter0 >= 5) {
                                        break;
                                    }
                                    GLF_live15looplimiter0++;
                                    {
                                        GLF_live15res += texture(GLF_live15tex, GLF_live15coord + vec2(float(GLF_live15i - 1) * GLF_live15uvstep, float(GLF_live15j - 1) * GLF_live15uvstep)) * GLF_live15weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15i * 3 + GLF_live15j, 9)];
                                    }
                                }
                                {
                                    int GLF_live21looplimiter2 = 0;
                                    if (GLF_live21looplimiter2 >= 3) {
                                        ;
                                    }
                                }
                            }
                        }
                    }
                }
            }
            bool GLF_live10c1 = _GLF_FUZZED(((bvec4(false, false, false, false) == bvec3(false, true, false).xyzz)));
            bool GLF_live10c2 = _GLF_FUZZED(false);
            bool GLF_live10c3 = _GLF_FUZZED((vec4(54.17, 7.3, -330.446, -0.0) != vec4(324.626, -198.275, -1.9, -313.234)));
            if (_GLF_DEAD(false)) {
                return vec3(1.0, 1.0, 1.0);
            }
            bool GLF_live10c4 = _GLF_FUZZED(true);
            {
                {
                    {
                        vec2 GLF_live16coord = _GLF_FUZZED(vec2(-0.0, -2.0));
                        {
                            {
                                ;
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                    return vec3(1.0, 1.0, 1.0);
                                }
                            }
                        }
                        vec4 GLF_live16res = _GLF_FUZZED((vec4(46.90, -7.8, -8522.2980, 3095.5435) - vec4(-5.0, -2.7, 5022.0033, 5358.1841)));
                        if (GLF_live16coord.x < 1.0 && GLF_live16coord.y < 1.0) {
                            GLF_live16res = texture(GLF_live16tex, GLF_live16coord);
                        }
                    }
                    ;
                }
                {
                    vec2 GLF_live16coord = _GLF_FUZZED((27.03 - (vec2(-418.650, -845.160) - vec2(-6970.3358, 14.96))));
                    int GLF_live16i = _GLF_FUZZED(99919);
                    int GLF_live16looplimiter0 = 0;
                    while (GLF_live16i < 1 && GLF_live16coord.x > 1.0 || GLF_live16coord.y > 1.0) {
                        if (GLF_live16looplimiter0 >= 7) {
                            break;
                        }
                        GLF_live16looplimiter0++;
                        {
                            if (GLF_live16coord.x > 1.0) {
                                {
                                    ivec2 GLF_live18p = _GLF_FUZZED(ivec2(64624, -61452));
                                    {
                                        GLF_live18p.y++;
                                    }
                                }
                                GLF_live16coord.x -= 1.0;
                            }
                            {
                                {
                                    ;
                                }
                            }
                            if (GLF_live16coord.y > 1.0)
                                GLF_live16coord.y -= 1.0;
                            GLF_live16coord *= 2.0;
                            {
                                int GLF_live20iteration = _GLF_FUZZED(22085);
                                {
                                    ;
                                }
                            }
                            GLF_live16i++;
                        }
                    }
                }
            }
            {
                vec2 GLF_live15coord = _GLF_FUZZED((mat2(-0.3, -546.166, 22.14, 6.3) * vec2(-9.6, 0.5)));
                int GLF_live15looplimiter1 = 0;
                {
                    {
                        ;
                    }
                }
                vec4 GLF_live15res = _GLF_FUZZED(vec4(403.223, -810.750, 81.14, -6.2));
                float GLF_live15uvstep = _GLF_FUZZED(((183707u <= (5317u & 75330u)) ? (-7864.4061) : (-607.202)));
                for (int GLF_live15i = 0; GLF_live15i < 3; GLF_live15i++) {
                    if (GLF_live15looplimiter1 >= 5) {
                        break;
                    }
                    {
                        int GLF_live18looplimiter0 = 0;
                        if (GLF_live18looplimiter0 >= 7) {
                            ;
                        }
                    }
                    GLF_live15looplimiter1++;
                    {
                        {
                            int GLF_live15looplimiter0 = 0;
                            for (int GLF_live15j = 0; GLF_live15j < 3; GLF_live15j++) {
                                if (GLF_live15looplimiter0 >= 5) {
                                    {
                                        int GLF_live18looplimiter1 = 0;
                                        ivec2 GLF_live18p = _GLF_FUZZED(ivec2(-39846, -44134));
                                        while (GLF_live18p.x > 15) {
                                            if (GLF_live18looplimiter1 >= 7) {
                                                break;
                                            }
                                            GLF_live18looplimiter1++;
                                            {
                                                GLF_live18p.x -= 16;
                                            }
                                        }
                                    }
                                    break;
                                }
                                GLF_live15looplimiter0++;
                                {
                                    GLF_live15res += texture(GLF_live15tex, GLF_live15coord + vec2(float(GLF_live15i - 1) * GLF_live15uvstep, float(GLF_live15j - 1) * GLF_live15uvstep)) * GLF_live15weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15i * 3 + GLF_live15j, 9)];
                                }
                            }
                            {
                                int GLF_live18looplimiter0 = 0;
                                ivec2 GLF_live18p = _GLF_FUZZED(ivec2((ivec4(92836, -69643, 30813, 72160).y & (-78829)), ((-84137) * (-2410))));
                                {
                                    if (GLF_live18looplimiter0 >= 7) {
                                        ;
                                    }
                                    GLF_live18looplimiter0++;
                                    {
                                        GLF_live18p = GLF_live18iter(GLF_live18p);
                                    }
                                }
                            }
                        }
                    }
                }
            }
            if (_GLF_DEAD(false)) {
                return vec3(1.0, 1.0, 1.0);
                {
                    vec2 GLF_live16coord = _GLF_FUZZED(vec2(-7.3, -4.9));
                    vec4 GLF_live16res = _GLF_FUZZED(vec4(790.710, -9.1, 85.19, -5.4));
                    if (GLF_live16coord.x < 1.0 && GLF_live16coord.y < 1.0) {
                        GLF_live16res = texture(GLF_live16tex, GLF_live16coord);
                    }
                }
            }
            {
                vec2 GLF_live13coord = _GLF_FUZZED(((mat2(mat2x4(6.4, -1.1, 8.6, -417.063, 33.57, 431.629, 8168.0458, -8.2)) != mat2(-33.77, 3.4, 6265.3328, -6.6)) ? vec2(518.034, 2.2) : vec2(6.4, -71.36)));
                int GLF_live13i = _GLF_FUZZED(-76134);
                vec4 GLF_live13texel = _GLF_FUZZED((mat3x4(6.7, -2.2, -71.54, 6.9, -3232.0500, -565.146, -2.0, -1.9, -4.2, -82.05, 413.540, 29.58) * vec3(9.5, -9998.3623, -9218.0676)));
                {
                    int GLF_live13looplimiter0 = 0;
                    {
                        vec2 GLF_live16coord = _GLF_FUZZED((-vec2(1.3, -3.0)));
                        if (GLF_live16coord.x > 1.0)
                            GLF_live16coord.x -= 1.0;
                    }
                    if (_GLF_DEAD(false)) {
                        return vec3(1.0, 1.0, 1.0);
                    }
                    if (_GLF_DEAD(false)) {
                        return vec3(1.0, 1.0, 1.0);
                    }
                    {
                        int GLF_live20iteration = _GLF_FUZZED(-70501);
                        int GLF_live20iterationCap = _GLF_FUZZED(-38250);
                        float GLF_live20xCoord = _GLF_FUZZED(6.6);
                        float GLF_live20yCoord = _GLF_FUZZED(((-7.0) * vec2(-6.8, 3883.5904)).r);
                        if (GLF_live20iteration < bitfieldInsert(GLF_live20iterationCap, 0, 0, 0)) {
                            ;
                        } else {
                            ;
                        }
                    }
                    while (GLF_live13texel.x + GLF_live13texel.y + GLF_live13texel.z > 1.0 && GLF_live13i < 16) {
                        if (GLF_live13looplimiter0 >= 4) {
                            {
                                vec2 GLF_live15coord = _GLF_FUZZED(vec2(-3.6, -1990.6477));
                                int GLF_live15i = _GLF_FUZZED(-98034);
                                vec4 GLF_live15res = _GLF_FUZZED(vec2(-0.3, -74.76).rgrg);
                                {
                                    {
                                        ;
                                    }
                                }
                                float GLF_live15uvstep = _GLF_FUZZED((744.990 - (vec2(9693.3628, 5332.3628).y * 4544.7810)));
                                {
                                    {
                                        ivec2 GLF_live18p = _GLF_FUZZED((((-85339) & ivec2(-5845, -83234)) & ivec2(-33821, -98193)));
                                        {
                                            GLF_live18p = GLF_live18iter(GLF_live18p);
                                        }
                                    }
                                    int GLF_live15looplimiter0 = 0;
                                    for (int GLF_live15j = 0; GLF_live15j < 3; GLF_live15j++) {
                                        if (GLF_live15looplimiter0 >= 5) {
                                            break;
                                        }
                                        GLF_live15looplimiter0++;
                                        if (_GLF_DEAD(false)) {
                                            return vec3(1.0, 1.0, 1.0);
                                        }
                                        {
                                            GLF_live15res += texture(GLF_live15tex, GLF_live15coord + vec2(float(GLF_live15i - 1) * GLF_live15uvstep, float(GLF_live15j - 1) * GLF_live15uvstep)) * GLF_live15weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15i * 3 + GLF_live15j, 9)];
                                        }
                                    }
                                }
                            }
                            break;
                            {
                                ivec2 GLF_live18p = _GLF_FUZZED(ivec2(30963, -27249));
                                if (GLF_live18p.x < 0) {
                                    GLF_live18p.y++;
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < tan(_GLF_IDENTITY(dot(vec3(0.0, 0.0, 1.0), vec3(1.0, 1.0, 0.0)), dot(vec3(0.0, 0.0, 1.0), vec3(1.0, 1.0, 0.0)))))))) {
                                        return vec3(1.0, 1.0, 1.0);
                                    }
                                }
                            }
                        }
                        GLF_live13looplimiter0++;
                        {
                            {
                                {
                                    ;
                                    {
                                        vec4 GLF_live19c = _GLF_FUZZED(((mat4(-0.2, 305.749, -17.85, -59.97, 932.477, -8463.0163, 860.615, -43.56, -7709.0842, 345.549, -96.66, -445.666, 876.494, -90.72, 1616.3434, 469.458) - (-4.6)) * vec4(-110.686, -4.3, -50.81, -8.3)));
                                        int GLF_live19i = _GLF_FUZZED(37048);
                                        {
                                            GLF_live19c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i, 4)] = GLF_live19c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i, 4)] * GLF_live19c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i, 4)];
                                        }
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                            break;
                                        }
                                    }
                                }
                                {
                                    {
                                        ;
                                    }
                                }
                            }
                            GLF_live13coord = GLF_live13texel.xz + GLF_live13texel.yy;
                            GLF_live13coord = floor(GLF_live13coord * 256.0) / 256.0;
                            GLF_live13texel = texture(GLF_live13tex, GLF_live13coord);
                            {
                                {
                                    ;
                                }
                            }
                            GLF_live13i++;
                        }
                    }
                }
            }
            vec3 GLF_live10col = _GLF_FUZZED(vec3(-9.7, -31.70, -9717.8987));
            vec2 GLF_live10uv = _GLF_FUZZED((-vec2(-5.1, -3.6)));
            {
                int GLF_live12c = _GLF_FUZZED(ivec2(-48065, 96370).y);
                if (_GLF_DEAD(_GLF_IDENTITY(false, false || (false)))) {
                    {
                        int GLF_live19i = _GLF_FUZZED(53162);
                        float GLF_live19limit = _GLF_FUZZED((656.757));
                        float GLF_live19ref = _GLF_FUZZED((23.80));
                        float GLF_live19s = _GLF_FUZZED(((-3.0) + (-4313.7690)));
                        {
                            if (mod(float(GLF_live19i), GLF_live19ref) <= 0.01) {
                                GLF_live19s += 0.2;
                            }
                            if (float(GLF_live19i) >= GLF_live19limit) {
                                ;
                            }
                        }
                    }
                    return vec3(1.0, 1.0, 1.0);
                }
                int GLF_live12looplimiter0 = 0;
                uint GLF_live12matrix_number = _GLF_FUZZED(uvec2(162092u, 120088u).y);
                int GLF_live12r = _GLF_FUZZED((-537));
                {
                    {
                        int GLF_live17a = _GLF_FUZZED((51365 | (-72350)));
                        int GLF_live17b = _GLF_FUZZED(999);
                        int GLF_live17looplimiter1 = 0;
                        vec2 GLF_live17uv = _GLF_FUZZED(((2.2) - (false ? vec2(-5.0, -904.233) : (vec2(-189.154, -7661.5677) * vec2(9.6, -359.045)))));
                        {
                            if (_GLF_DEAD(false)) {
                                return vec3(1.0, 1.0, 1.0);
                            }
                            if (GLF_live17looplimiter1 >= 6) {
                                ;
                            }
                            GLF_live17looplimiter1++;
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                return vec3(1.0, 1.0, 1.0);
                            }
                            {
                                GLF_live17uv.y -= step(GLF_live17injectionSwitch.y, GLF_live17uv.x) + float(GLF_live17a);
                                GLF_live17uv.x *= (isnan(GLF_live17uv.y) ? cosh(GLF_live17gl_FragCoord.y) : tanh(GLF_live17gl_FragCoord.x));
                                GLF_live17b--;
                            }
                        }
                    }
                    if (GLF_live12looplimiter0 >= 6) {
                        ;
                    }
                    GLF_live12looplimiter0++;
                    {
                        switch (GLF_live12matrix_number) {
                            case 0u:
                                {
                                    {
                                        ;
                                        if (_GLF_DEAD(false)) {
                                            return vec3(1.0, 1.0, 1.0);
                                        }
                                    }
                                }
                                GLF_live12m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live12r, 2)] = GLF_live12one;
                                break;
                            case 1u:
                                GLF_live12m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live12r, 3)] = GLF_live12one;
                                break;
                            case 2u:
                                GLF_live12m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live12r, 4)] = GLF_live12one;
                                if (_GLF_DEAD(false)) {
                                    return vec3(1.0, 1.0, 1.0);
                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                        return vec3(1.0, 1.0, 1.0);
                                    }
                                }
                                {
                                    vec2 GLF_live15coord = _GLF_FUZZED(vec2(-6661.9538, 4.4));
                                    int GLF_live15i = _GLF_FUZZED(-62010);
                                    int GLF_live15j = _GLF_FUZZED(((-75036) + (-46971)));
                                    {
                                        if (_GLF_DEAD(false)) {
                                            return vec3(1.0, 1.0, 1.0);
                                        }
                                        {
                                            ;
                                        }
                                    }
                                    int GLF_live15looplimiter0 = 0;
                                    {
                                        if (_GLF_DEAD(false)) {
                                            return vec3(1.0, 1.0, 1.0);
                                        }
                                        int GLF_live18looplimiter1 = 0;
                                        ivec2 GLF_live18p = _GLF_FUZZED(ivec2(-28240, 30824));
                                        {
                                            if (GLF_live18looplimiter1 >= 7) {
                                                ;
                                            }
                                            GLF_live18looplimiter1++;
                                            {
                                                GLF_live18p.x -= 16;
                                            }
                                        }
                                    }
                                    vec4 GLF_live15res = _GLF_FUZZED(vec4(4584.9556, 751.043, 9.4, -7.3));
                                    float GLF_live15uvstep = _GLF_FUZZED((4345.3765 + (-539.283)));
                                    {
                                        if (GLF_live15looplimiter0 >= 5) {
                                            ;
                                        }
                                        GLF_live15looplimiter0++;
                                        {
                                            {
                                                ;
                                            }
                                        }
                                        {
                                            GLF_live15res += texture(GLF_live15tex, GLF_live15coord + vec2(float(GLF_live15i - 1) * GLF_live15uvstep, float(GLF_live15j - 1) * GLF_live15uvstep)) * GLF_live15weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15i * 3 + GLF_live15j, 9)];
                                        }
                                    }
                                }
                                break;
                                if (_GLF_DEAD(false)) {
                                    return vec3(1.0, 1.0, 1.0);
                                    {
                                        int GLF_live18looplimiter1 = 0;
                                        if (GLF_live18looplimiter1 >= 7) {
                                            ;
                                        }
                                    }
                                    {
                                        vec2 GLF_live15coord = _GLF_FUZZED(vec2(44.77, 181.246));
                                        vec4 GLF_live15res = _GLF_FUZZED(vec4(6.1, 5.5, 77.06, -6937.8778));
                                        float GLF_live15uvstep = _GLF_FUZZED(float((mat4x3(7.5, 45.95, 1444.3329, 0.3, -3.2, -3.8, -6.3, 200.378, -7.7, 3.6, 672.175, -6821.8862) == mat4x3(-7.2, -3.7, 9.7, 2.9, 5.0, 3.7, -2872.0343, -9331.1465, 433.751, -27.68, 1230.1885, 76.13))));
                                        if (_GLF_DEAD(false)) {
                                            return vec3(1.0, 1.0, 1.0);
                                        }
                                        {
                                            int GLF_live15looplimiter1 = 0;
                                            for (int GLF_live15i = 0; GLF_live15i < 3; GLF_live15i++) {
                                                if (GLF_live15looplimiter1 >= 5) {
                                                    break;
                                                }
                                                GLF_live15looplimiter1++;
                                                {
                                                    if (_GLF_DEAD(false)) {
                                                        break;
                                                    }
                                                    {
                                                        int GLF_live15looplimiter0 = 0;
                                                        for (int GLF_live15j = 0; GLF_live15j < 3; GLF_live15j++) {
                                                            {
                                                                {
                                                                    ;
                                                                }
                                                            }
                                                            if (GLF_live15looplimiter0 >= 5) {
                                                                break;
                                                            }
                                                            {
                                                                int GLF_live19i = _GLF_FUZZED(((-73781) | (-75043)));
                                                                float GLF_live19limit = _GLF_FUZZED(5.3);
                                                                float GLF_live19s = _GLF_FUZZED(((-78.69) + 646.387));
                                                                if (float(GLF_live19i) >= GLF_live19limit) {
                                                                    if (_GLF_DEAD(_GLF_IDENTITY(false, false || (false)))) {
                                                                        discard;
                                                                    }
                                                                    ;
                                                                }
                                                            }
                                                            GLF_live15looplimiter0++;
                                                            {
                                                                GLF_live15res += texture(GLF_live15tex, GLF_live15coord + vec2(float(GLF_live15i - 1) * GLF_live15uvstep, float(GLF_live15j - 1) * GLF_live15uvstep)) * GLF_live15weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15i * 3 + GLF_live15j, 9)];
                                                            }
                                                        }
                                                    }
                                                    {
                                                        if (_GLF_DEAD(false)) {
                                                            return vec3(1.0, 1.0, 1.0);
                                                        }
                                                        int GLF_live18looplimiter0 = 0;
                                                        if (GLF_live18looplimiter0 >= 7) {
                                                            ;
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            case 3u:
                                {
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < tan(0.0))))) {
                                        return vec3(1.0, 1.0, 1.0);
                                    }
                                    vec2 GLF_live15coord = _GLF_FUZZED(vec2(-3.0, -83.97));
                                    int GLF_live15i = _GLF_FUZZED(-19094);
                                    {
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                            return vec3(1.0, 1.0, 1.0);
                                        }
                                        int GLF_live20iterationCap = _GLF_FUZZED(int((false && (8058u > 158759u))));
                                        {
                                            GLF_live20iterationCap += 1;
                                        }
                                    }
                                    vec4 GLF_live15res = _GLF_FUZZED(vec4(-0.1, 5.6, 904.577, -9388.5103));
                                    float GLF_live15uvstep = _GLF_FUZZED((+(3102.4547 - 33.21)));
                                    {
                                        int GLF_live15looplimiter0 = 0;
                                        for (int GLF_live15j = 0; GLF_live15j < 3; GLF_live15j++) {
                                            if (GLF_live15looplimiter0 >= 5) {
                                                break;
                                            }
                                            GLF_live15looplimiter0++;
                                            {
                                                GLF_live15res += texture(GLF_live15tex, GLF_live15coord + vec2(float(GLF_live15i - 1) * GLF_live15uvstep, float(GLF_live15j - 1) * GLF_live15uvstep)) * GLF_live15weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15i * 3 + GLF_live15j, 9)];
                                            }
                                        }
                                    }
                                }
                                {
                                    int GLF_live21c_im = _GLF_FUZZED(ivec4(25592, 53102, -69331, 36243).a);
                                    int GLF_live21c_re = _GLF_FUZZED(-52334);
                                    int GLF_live21iteration = _GLF_FUZZED(((-19139) - ((-78445) + (-52079))));
                                    int GLF_live21looplimiter0 = 0;
                                    int GLF_live21x = _GLF_FUZZED(ivec2(-81272, -57294).x);
                                    int GLF_live21y = _GLF_FUZZED(((-8894) * 63824));
                                    for (int GLF_live21k = 0; GLF_live21k < 1000; GLF_live21k++) {
                                        if (GLF_live21looplimiter0 >= 3) {
                                            break;
                                        }
                                        GLF_live21looplimiter0++;
                                        {
                                            if (GLF_live21x * GLF_live21x + GLF_live21y * GLF_live21y > 262144) {
                                                break;
                                            }
                                            int GLF_live21x_new = ((GLF_live21x * GLF_live21x - GLF_live21y * GLF_live21y) / 256 + GLF_live21c_re);
                                            GLF_live21y = (2 * GLF_live21x * GLF_live21y / 256 + GLF_live21c_im);
                                            GLF_live21x = GLF_live21x_new;
                                            GLF_live21iteration++;
                                        }
                                    }
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                        return vec3(1.0, 1.0, 1.0);
                                    }
                                }
                                GLF_live12m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live12r, 2)] = GLF_live12one;
                                break;
                            case 4u:
                                GLF_live12m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live12r, 3)] = GLF_live12one;
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    return vec3(1.0, 1.0, 1.0);
                                }
                                break;
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                    return vec3(1.0, 1.0, 1.0);
                                }
                            case 5u:
                                GLF_live12m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live12r, 4)] = GLF_live12one;
                                break;
                            case 6u:
                                GLF_live12m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live12r, 2)] = GLF_live12one;
                                {
                                    {
                                        ;
                                    }
                                }
                                break;
                            case 7u:
                                GLF_live12m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live12r, 3)] = GLF_live12one;
                                break;
                            case 8u:
                                GLF_live12m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live12r, 4)] = GLF_live12one;
                                break;
                        }
                    }
                }
            }
            if (!GLF_live10c1 && !GLF_live10c2 && !GLF_live10c3 && GLF_live10c4) {
                if (_GLF_DEAD(false)) {
                    {
                        vec2 GLF_live15coord = _GLF_FUZZED((vec2(-1.0, 7878.7650) - vec2(24.03, -991.829)));
                        {
                            int GLF_live18looplimiter1 = 0;
                            ivec2 GLF_live18p = _GLF_FUZZED((ivec2(29539, -60386) & (ivec3(52016, 69628, 75801) | ivec3(57266, -57260, 51433)).rg));
                            {
                                if (GLF_live18looplimiter1 >= 7) {
                                    ;
                                }
                                GLF_live18looplimiter1++;
                                {
                                    GLF_live18p.x -= 16;
                                }
                            }
                        }
                        int GLF_live15i = _GLF_FUZZED((-36044));
                        int GLF_live15j = _GLF_FUZZED(-4343);
                        int GLF_live15looplimiter0 = 0;
                        vec4 GLF_live15res = _GLF_FUZZED(vec4(-0.9, 551.630, -4.7, 7.5));
                        float GLF_live15uvstep = _GLF_FUZZED(-408.318);
                        {
                            if (GLF_live15looplimiter0 >= 5) {
                                ;
                            }
                            GLF_live15looplimiter0++;
                            {
                                GLF_live15res += texture(GLF_live15tex, GLF_live15coord + vec2(float(GLF_live15i - 1) * GLF_live15uvstep, float(GLF_live15j - 1) * GLF_live15uvstep)) * GLF_live15weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15i * 3 + GLF_live15j, 9)];
                            }
                            {
                                float GLF_live20c_im = _GLF_FUZZED((-(-8.7)));
                                float GLF_live20c_re = _GLF_FUZZED(66.37);
                                int GLF_live20iteration = _GLF_FUZZED((~85609));
                                int GLF_live20iterationCap = _GLF_FUZZED(((-46137) + 17206));
                                int GLF_live20k = _GLF_FUZZED(int(((131979u & 66326u) ^ 181976u)));
                                float GLF_live20x = _GLF_FUZZED((true ? float(-41709) : 4696.7684));
                                float GLF_live20y = _GLF_FUZZED(469.554);
                                if (_GLF_DEAD(false)) {
                                    return vec3(1.0, 1.0, 1.0);
                                }
                                {
                                    int GLF_live20looplimiter0 = 0;
                                    do {
                                        if (GLF_live20looplimiter0 >= 3) {
                                            break;
                                        }
                                        GLF_live20looplimiter0++;
                                        {
                                            if (GLF_live20x * GLF_live20x + GLF_live20y * GLF_live20y > 4.0) {
                                                break;
                                                if (_GLF_DEAD(false)) {
                                                    discard;
                                                }
                                            }
                                            float GLF_live20x_new = GLF_live20x * GLF_live20x - GLF_live20y * GLF_live20y + GLF_live20c_re;
                                            GLF_live20y = 2.0 * GLF_live20x * GLF_live20y + GLF_live20c_im;
                                            GLF_live20x = GLF_live20x_new;
                                            GLF_live20iteration++;
                                            GLF_live20k++;
                                        }
                                    } while (GLF_live20k < bitfieldInsert(GLF_live20iterationCap + (257.0 > GLF_live20resolution.y ? 1 : 0), 0, 0, 0));
                                }
                            }
                        }
                        if (_GLF_DEAD(false)) {
                            return vec3(1.0, 1.0, 1.0);
                        }
                    }
                    return vec3(1.0, 1.0, 1.0);
                }
                float GLF_live10stripe = GLF_live10compute_stripe(tan((GLF_live10uv.x + GLF_live10uv.y) * 20.0));
                GLF_live10col = mix(vec3(GLF_live10uv.x, .8, 0), vec3(1, GLF_live10uv.y, 0), GLF_live10stripe);
                GLF_live10_GLF_color = vec4(GLF_live10col, 1.0);
                ;
                {
                    vec2 GLF_live16coord = _GLF_FUZZED(vec2(-5764.8512, -1962.8791));
                    vec4 GLF_live16res = _GLF_FUZZED(vec4(-561.160, -5.7, -2091.0796, 87.80));
                    {
                        GLF_live16res = texture(GLF_live16tex, GLF_live16coord);
                    }
                }
            }
        }
        {
            int GLF_live19looplimiter1 = 0;
            if (GLF_live19looplimiter1 >= 3) {
                ;
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                return vec3(1.0, 1.0, 1.0);
            }
        }
        {
            ;
        }
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
        return vec3(1.0, 1.0, 1.0);
    }
    float c_im = 0.8 * (ypos - height / 2.0) * 4.0 / width;
    {
        {
            ;
        }
    }
    float x = 0.0, y = 0.0;
    {
        int GLF_live6v = _GLF_FUZZED((~(-76176)));
        {
            {
                ;
            }
        }
        if ((GLF_live6v & 1) == 1) {
            GLF_live6v = 3 * GLF_live6v + 1;
        } else {
            {
                int GLF_live17m = _GLF_FUZZED(-90370);
                {
                    ;
                }
            }
            GLF_live6v /= 2;
            {
                vec2 GLF_live15coord = _GLF_FUZZED(vec2(339.206, -117.157));
                vec4 GLF_live15res = _GLF_FUZZED(vec4(3.0, 4379.0104, -41.42, 4.5));
                if (_GLF_DEAD(false)) {
                    return vec3(1.0, 1.0, 1.0);
                }
                float GLF_live15uvstep = _GLF_FUZZED(-693.769);
                {
                    int GLF_live15looplimiter1 = 0;
                    for (int GLF_live15i = 0; GLF_live15i < 3; GLF_live15i++) {
                        if (GLF_live15looplimiter1 >= 5) {
                            break;
                        }
                        GLF_live15looplimiter1++;
                        {
                            {
                                if (_GLF_DEAD(false)) {
                                    discard;
                                }
                                int GLF_live15looplimiter0 = 0;
                                for (int GLF_live15j = 0; GLF_live15j < 3; GLF_live15j++) {
                                    if (GLF_live15looplimiter0 >= 5) {
                                        break;
                                    }
                                    GLF_live15looplimiter0++;
                                    {
                                        GLF_live15res += texture(GLF_live15tex, GLF_live15coord + vec2(float(GLF_live15i - 1) * GLF_live15uvstep, float(GLF_live15j - 1) * GLF_live15uvstep)) * GLF_live15weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15i * 3 + GLF_live15j, 9)];
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    {
        int GLF_live17a = _GLF_FUZZED(((false ? 79459 : (-2675))));
        int GLF_live17b = _GLF_FUZZED(21176);
        int GLF_live17c = _GLF_FUZZED(-86767);
        int GLF_live17d = _GLF_FUZZED(67699);
        {
            int GLF_live20looplimiter1 = 0;
            if (GLF_live20looplimiter1 >= 3) {
                ;
            }
        }
        vec2 GLF_live17uv = _GLF_FUZZED(vec2(277.529, 3029.5479));
        {
            int GLF_live17looplimiter3 = 0;
            do {
                if (GLF_live17looplimiter3 >= 6) {
                    break;
                }
                if (_GLF_DEAD(false)) {
                    break;
                }
                GLF_live17looplimiter3++;
                if (_GLF_DEAD(false)) {
                    discard;
                }
                {
                    {
                        vec4 GLF_live19c = _GLF_FUZZED((mat4(-36.13, -3.0, -694.678, -3998.2594, 131.559, -23.88, 4.0, -4866.0386, -2962.2628, -1.7, -573.494, -5244.2172, 47.52, 55.44, 846.505, -7.0) * vec4(-873.825, 3614.3508, -412.189, 6.7)));
                        int GLF_live19i = _GLF_FUZZED(25257);
                        {
                            if (GLF_live19c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i, 4)] >= 1.0) {
                                GLF_live19c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i, 4)] = GLF_live19c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i, 4)] * GLF_live19c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i, 4)];
                            }
                        }
                    }
                    GLF_live17uv.y -= step(GLF_live17injectionSwitch.y, GLF_live17uv.x) + float(GLF_live17a) + float(GLF_live17b) + float(GLF_live17c);
                    GLF_live17d--;
                }
            } while (GLF_live17d > int(GLF_live17injectionSwitch.x));
        }
    }
    {
        int GLF_live13looplimiter0 = 0;
        if (GLF_live13looplimiter0 >= 4) {
            ;
        }
    }
    {
        int GLF_live21looplimiter1 = 0;
        if (GLF_live21looplimiter1 >= 3) {
            ;
        }
    }
    if (_GLF_DEAD(_GLF_IDENTITY(false, !(!(false))))) {
        return vec3(1.0, 1.0, 1.0);
    }
    if (0.0 > resolution.x) {
        {
            {
                ;
            }
        }
        {
            vec2 GLF_live15coord = _GLF_FUZZED((+vec2(1427.2685, 64.62)));
            int GLF_live15i = _GLF_FUZZED(55795);
            int GLF_live15looplimiter1 = 0;
            vec4 GLF_live15res = _GLF_FUZZED(vec4(-2.1, -77.95, 6767.3318, 813.185));
            float GLF_live15uvstep = _GLF_FUZZED(8.1);
            {
                if (GLF_live15looplimiter1 >= 5) {
                    {
                        int GLF_live20looplimiter0 = 0;
                        if (GLF_live20looplimiter0 >= 3) {
                            ;
                        }
                    }
                    ;
                }
                GLF_live15looplimiter1++;
                {
                    {
                        int GLF_live15looplimiter0 = 0;
                        {
                            ivec2 GLF_live18p = _GLF_FUZZED(((51276 * ivec2(-3619, -55106)) * ivec2(69656, -9206)));
                            if (GLF_live18p.x > 0) {
                                GLF_live18p.y--;
                            }
                        }
                        for (int GLF_live15j = 0; GLF_live15j < 3; GLF_live15j++) {
                            if (GLF_live15looplimiter0 >= 5) {
                                break;
                            }
                            GLF_live15looplimiter0++;
                            {
                                GLF_live15res += texture(GLF_live15tex, GLF_live15coord + vec2(float(GLF_live15i - 1) * GLF_live15uvstep, float(GLF_live15j - 1) * GLF_live15uvstep)) * GLF_live15weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15i * 3 + GLF_live15j, 9)];
                            }
                        }
                        {
                            if (_GLF_DEAD(false)) {
                                return vec3(1.0, 1.0, 1.0);
                            }
                            ivec2 GLF_live18p = _GLF_FUZZED(ivec2(32103, -49702));
                            {
                                GLF_live18p.x -= 16;
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                return vec3(1.0, 1.0, 1.0);
                            }
                        }
                    }
                }
            }
        }
        x = 1.0;
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            return vec3(1.0, 1.0, 1.0);
            {
                int GLF_live11looplimiter0 = 0;
                if (GLF_live11looplimiter0 >= 7) {
                    ;
                }
            }
            if (_GLF_DEAD(false)) {
                return vec3(1.0, 1.0, 1.0);
                if (_GLF_DEAD(false)) {
                    return vec3(1.0, 1.0, 1.0);
                }
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                return vec3(1.0, 1.0, 1.0);
            }
        }
        y = 1.0;
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            return vec3(1.0, 1.0, 1.0);
        }
        {
            {
                ;
            }
        }
    }
    int iteration = bitfieldReverse(int(x));
    int k = bitfieldExtract(int(y), bitCount(int(x)), int(y));
    if (_GLF_DEAD(false)) {
        return vec3(1.0, 1.0, 1.0);
    }
    {
        {
            {
                {
                    ;
                }
            }
            ;
            {
                {
                    ;
                }
            }
        }
        {
            vec2 GLF_live15coord = _GLF_FUZZED(vec2(float(false)));
            int GLF_live15i = _GLF_FUZZED(35242);
            int GLF_live15looplimiter0 = 0;
            vec4 GLF_live15res = _GLF_FUZZED(vec4(313.633, vec4(46.58, 60.84, -8.3, -5795.5237).g, vec2(3.6, 2.1)));
            float GLF_live15uvstep = _GLF_FUZZED((-3817.5525));
            for (int GLF_live15j = 0; GLF_live15j < 3; GLF_live15j++) {
                if (GLF_live15looplimiter0 >= 5) {
                    {
                        int GLF_live21c_im = _GLF_FUZZED(-83759);
                        int GLF_live21c_re = _GLF_FUZZED(((-14488) - (-42005)));
                        int GLF_live21iteration = _GLF_FUZZED(92025);
                        int GLF_live21x = _GLF_FUZZED(25134);
                        if (_GLF_DEAD(false)) {
                            return vec3(1.0, 1.0, 1.0);
                        }
                        int GLF_live21y = _GLF_FUZZED(ivec3(40072, -29346, -84251).g);
                        {
                            int GLF_live21looplimiter0 = 0;
                            for (int GLF_live21k = 0; GLF_live21k < 1000; GLF_live21k++) {
                                if (GLF_live21looplimiter0 >= 3) {
                                    break;
                                }
                                GLF_live21looplimiter0++;
                                {
                                    if (GLF_live21x * GLF_live21x + GLF_live21y * GLF_live21y > 262144) {
                                        break;
                                    }
                                    int GLF_live21x_new = ((GLF_live21x * GLF_live21x - GLF_live21y * GLF_live21y) / 256 + GLF_live21c_re);
                                    GLF_live21y = (2 * GLF_live21x * GLF_live21y / 256 + GLF_live21c_im);
                                    GLF_live21x = GLF_live21x_new;
                                    GLF_live21iteration++;
                                }
                            }
                        }
                    }
                    break;
                }
                GLF_live15looplimiter0++;
                {
                    {
                        if (_GLF_DEAD(false)) {
                            continue;
                        }
                        ;
                    }
                }
                {
                    {
                        int GLF_live21c_im = _GLF_FUZZED(-76598);
                        int GLF_live21c_re = _GLF_FUZZED((false ? (-47782) : 28313));
                        int GLF_live21iteration = _GLF_FUZZED((32134 ^ int(true)));
                        int GLF_live21looplimiter0 = 0;
                        int GLF_live21x = _GLF_FUZZED((~(-39944)));
                        if (_GLF_DEAD(false)) {
                            discard;
                        }
                        int GLF_live21y = _GLF_FUZZED(-96554);
                        {
                            if (GLF_live21looplimiter0 >= 3) {
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                    break;
                                }
                                ;
                            }
                            GLF_live21looplimiter0++;
                            {
                                if (GLF_live21x * GLF_live21x + GLF_live21y * GLF_live21y > 262144) {
                                    ;
                                }
                                int GLF_live21x_new = ((GLF_live21x * GLF_live21x - GLF_live21y * GLF_live21y) / 256 + GLF_live21c_re);
                                GLF_live21y = (2 * GLF_live21x * GLF_live21y / 256 + GLF_live21c_im);
                                GLF_live21x = GLF_live21x_new;
                                GLF_live21iteration++;
                            }
                        }
                    }
                    GLF_live15res += texture(GLF_live15tex, GLF_live15coord + vec2(float(GLF_live15i - 1) * GLF_live15uvstep, float(GLF_live15j - 1) * GLF_live15uvstep)) * GLF_live15weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15i * 3 + GLF_live15j, 9)];
                }
            }
        }
    }
    int iterationCap = 1000;
    if (_GLF_DEAD(false)) {
        {
            vec2 GLF_live13coord = _GLF_FUZZED((vec3(9.7, -0.9, -7789.6540) * mat2x3(6070.9146, 47.51, 429.263, -1965.9144, 8902.9926, 1.5)));
            {
                vec4 GLF_live19c = _GLF_FUZZED(vec4(-5975.8195, 6905.8714, -1.6, 5.0));
                {
                    int GLF_live19looplimiter1 = 0;
                    for (int GLF_live19i = 0; GLF_live19i < 3; GLF_live19i++) {
                        if (GLF_live19looplimiter1 >= 3) {
                            break;
                        }
                        if (_GLF_DEAD(false)) {
                            discard;
                        }
                        GLF_live19looplimiter1++;
                        {
                            if (GLF_live19c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i, 4)] >= 1.0) {
                                GLF_live19c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i, 4)] = GLF_live19c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i, 4)] * GLF_live19c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i, 4)];
                            }
                        }
                    }
                }
            }
            if (_GLF_DEAD(_GLF_IDENTITY(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)), (_GLF_FALSE(false, (gl_FragCoord.x < 0.0))) && true))) {
                return vec3(1.0, 1.0, 1.0);
            }
            int GLF_live13i = _GLF_FUZZED(46707);
            int GLF_live13looplimiter0 = 0;
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                return vec3(1.0, 1.0, 1.0);
            }
            if (_GLF_DEAD(false)) {
                return vec3(1.0, 1.0, 1.0);
            }
            {
                vec2 GLF_live15coord = _GLF_FUZZED(vec3(-15.35, -659.930, -924.747).pp);
                int GLF_live15i = _GLF_FUZZED((~(~91820)));
                int GLF_live15looplimiter0 = 0;
                {
                    float GLF_live20c_im = _GLF_FUZZED(5735.7927);
                    float GLF_live20c_re = _GLF_FUZZED(float(34589));
                    if (_GLF_DEAD(_GLF_IDENTITY(false, !(!(false))))) {
                        return vec3(1.0, 1.0, 1.0);
                    }
                    int GLF_live20iteration = _GLF_FUZZED(int(28086u));
                    int GLF_live20iterationCap = _GLF_FUZZED((true ? int(false) : (-51379)));
                    int GLF_live20k = _GLF_FUZZED(int(true));
                    int GLF_live20looplimiter0 = 0;
                    float GLF_live20x = _GLF_FUZZED(float(false));
                    float GLF_live20y = _GLF_FUZZED(-3.6);
                    do {
                        if (GLF_live20looplimiter0 >= 3) {
                            break;
                        }
                        GLF_live20looplimiter0++;
                        {
                            if (GLF_live20x * GLF_live20x + GLF_live20y * GLF_live20y > 4.0) {
                                break;
                                if (_GLF_DEAD(false)) {
                                    break;
                                }
                            }
                            float GLF_live20x_new = GLF_live20x * GLF_live20x - GLF_live20y * GLF_live20y + GLF_live20c_re;
                            GLF_live20y = 2.0 * GLF_live20x * GLF_live20y + GLF_live20c_im;
                            GLF_live20x = GLF_live20x_new;
                            GLF_live20iteration++;
                            GLF_live20k++;
                        }
                    } while (GLF_live20k < bitfieldInsert(GLF_live20iterationCap + (257.0 > GLF_live20resolution.y ? 1 : 0), 0, 0, 0));
                }
                vec4 GLF_live15res = _GLF_FUZZED(((vec2(-523.670, -4.9) * mat3x2(-9.9, 6.0, -52.58, 27.31, -200.896, 53.38)) * (mat2x3(630.530, -2.5, 22.37, -10.65, -7.7, -7.0) * mat4x2(2.7, 8267.0030, -18.01, -909.542, -5321.4145, 508.663, -9.0, 461.354))));
                {
                    float GLF_live19s = _GLF_FUZZED(-97.56);
                    {
                        ;
                    }
                }
                float GLF_live15uvstep = _GLF_FUZZED((-(-76.19)));
                for (int GLF_live15j = 0; GLF_live15j < 3; GLF_live15j++) {
                    if (GLF_live15looplimiter0 >= 5) {
                        break;
                    }
                    GLF_live15looplimiter0++;
                    {
                        GLF_live15res += texture(GLF_live15tex, GLF_live15coord + vec2(float(GLF_live15i - 1) * GLF_live15uvstep, float(GLF_live15j - 1) * GLF_live15uvstep)) * GLF_live15weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15i * 3 + GLF_live15j, 9)];
                    }
                    {
                        vec4 GLF_live19c = _GLF_FUZZED(vec4(1223.3427, 47.80, 58.48, 4661.4874));
                        int GLF_live19looplimiter1 = 0;
                        for (int GLF_live19i = 0; GLF_live19i < 3; GLF_live19i++) {
                            if (GLF_live19looplimiter1 >= 3) {
                                break;
                            }
                            GLF_live19looplimiter1++;
                            {
                                if (GLF_live19c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i, 4)] >= 1.0) {
                                    GLF_live19c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i, 4)] = GLF_live19c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i, 4)] * GLF_live19c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i, 4)];
                                }
                            }
                        }
                    }
                }
            }
            vec4 GLF_live13texel = _GLF_FUZZED(vec4(6.4, 1.2, 5370.1946, 9179.4847));
            {
                if (GLF_live13looplimiter0 >= 4) {
                    ;
                }
                GLF_live13looplimiter0++;
                {
                    GLF_live13coord = GLF_live13texel.xz + GLF_live13texel.yy;
                    GLF_live13coord = floor(GLF_live13coord * 256.0) / 256.0;
                    GLF_live13texel = texture(GLF_live13tex, GLF_live13coord);
                    GLF_live13i++;
                    {
                        vec2 GLF_live16coord = _GLF_FUZZED(vec2(6.1, 2.7));
                        if (GLF_live16coord.x > 1.0)
                            GLF_live16coord.x -= 1.0;
                    }
                }
                {
                    vec2 GLF_live15coord = _GLF_FUZZED(vec3(-0.0, 969.697, 4126.0503).br);
                    int GLF_live15i = _GLF_FUZZED(-13292);
                    {
                        vec4 GLF_live19c = _GLF_FUZZED(vec4(-8094.1526, -42.14, 3.1, -4.2));
                        int GLF_live19looplimiter1 = 0;
                        for (int GLF_live19i = 0; GLF_live19i < 3; GLF_live19i++) {
                            if (GLF_live19looplimiter1 >= 3) {
                                break;
                            }
                            GLF_live19looplimiter1++;
                            {
                                if (GLF_live19c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i, 4)] >= 1.0) {
                                    GLF_live19c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i, 4)] = GLF_live19c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i, 4)] * GLF_live19c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i, 4)];
                                }
                            }
                        }
                    }
                    vec4 GLF_live15res = _GLF_FUZZED((true ? vec4(-9.9, -2.4, -6548.0270, 56.52) : vec4(8.7, 1.3, 8.8, -3880.6139)));
                    {
                        ivec2 GLF_live18p = _GLF_FUZZED((ivec2(-6939, -6150) & (true ? ivec2(-41249, 3674) : ivec2(1766, -1170))));
                        {
                            int GLF_live18looplimiter1 = 0;
                            while (GLF_live18p.x > 15) {
                                if (GLF_live18looplimiter1 >= 7) {
                                    break;
                                }
                                GLF_live18looplimiter1++;
                                {
                                    GLF_live18p.x -= 16;
                                }
                            }
                        }
                    }
                    float GLF_live15uvstep = _GLF_FUZZED((+(-2416.2507)));
                    {
                        int GLF_live15looplimiter0 = 0;
                        for (int GLF_live15j = 0; GLF_live15j < 3; GLF_live15j++) {
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                discard;
                            }
                            if (GLF_live15looplimiter0 >= 5) {
                                break;
                            }
                            GLF_live15looplimiter0++;
                            {
                                GLF_live15res += texture(GLF_live15tex, GLF_live15coord + vec2(float(GLF_live15i - 1) * GLF_live15uvstep, float(GLF_live15j - 1) * GLF_live15uvstep)) * GLF_live15weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15i * 3 + GLF_live15j, 9)];
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < log(1.0))))) {
                                discard;
                            }
                            {
                                int GLF_live21iteration = _GLF_FUZZED((~(-7118)));
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                    continue;
                                }
                                if (GLF_live21iteration < 1000) {
                                    if (_GLF_DEAD(false)) {
                                        break;
                                    }
                                    ;
                                } else {
                                    ;
                                }
                            }
                            if (_GLF_DEAD(false)) {
                                break;
                            }
                        }
                    }
                }
            }
        }
        return vec3(1.0, 1.0, 1.0);
        {
            int GLF_live8looplimiter1 = 0;
            {
                vec2 GLF_live15coord = _GLF_FUZZED((vec4(4099.3837, -356.355, 1.0, 25.47) * vec4(96.13, 3873.0944, -6029.7175, -9979.0303)).tq);
                {
                    int GLF_live18looplimiter0 = 0;
                    ivec2 GLF_live18p = _GLF_FUZZED((ivec2(91049, 62791) & ivec2(-37730, -83408).ts));
                    {
                        if (GLF_live18looplimiter0 >= 7) {
                            ;
                        }
                        GLF_live18looplimiter0++;
                        {
                            GLF_live18p = GLF_live18iter(GLF_live18p);
                        }
                    }
                }
                int GLF_live15i = _GLF_FUZZED(84160);
                {
                    int GLF_live21c_im = _GLF_FUZZED(42403);
                    int GLF_live21c_re = _GLF_FUZZED(-10615);
                    int GLF_live21iteration = _GLF_FUZZED((+(-83334)));
                    int GLF_live21x = _GLF_FUZZED(-70062);
                    int GLF_live21y = _GLF_FUZZED(-77498);
                    {
                        int GLF_live21looplimiter0 = 0;
                        for (int GLF_live21k = 0; GLF_live21k < 1000; GLF_live21k++) {
                            if (GLF_live21looplimiter0 >= 3) {
                                break;
                            }
                            GLF_live21looplimiter0++;
                            {
                                if (GLF_live21x * GLF_live21x + GLF_live21y * GLF_live21y > 262144) {
                                    break;
                                }
                                int GLF_live21x_new = ((GLF_live21x * GLF_live21x - GLF_live21y * GLF_live21y) / 256 + GLF_live21c_re);
                                GLF_live21y = (2 * GLF_live21x * GLF_live21y / 256 + GLF_live21c_im);
                                GLF_live21x = GLF_live21x_new;
                                GLF_live21iteration++;
                            }
                        }
                    }
                }
                int GLF_live15j = _GLF_FUZZED(32257);
                int GLF_live15looplimiter0 = 0;
                vec4 GLF_live15res = _GLF_FUZZED(vec4(-258.627, vec3(-4.8, -32.08, -6.8)));
                float GLF_live15uvstep = _GLF_FUZZED(-44.42);
                {
                    if (GLF_live15looplimiter0 >= 5) {
                        ;
                    }
                    GLF_live15looplimiter0++;
                    {
                        GLF_live15res += texture(GLF_live15tex, GLF_live15coord + vec2(float(GLF_live15i - 1) * GLF_live15uvstep, float(GLF_live15j - 1) * GLF_live15uvstep)) * GLF_live15weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15i * 3 + GLF_live15j, 9)];
                    }
                }
            }
            if (GLF_live8looplimiter1 >= 6) {
                ;
            }
        }
    }
    if (_GLF_DEAD(false)) {
        return vec3(1.0, 1.0, 1.0);
    }
    {
        {
            int GLF_live21x = _GLF_FUZZED(25709);
            int GLF_live21y = _GLF_FUZZED(-85476);
            if (GLF_live21x * GLF_live21x + GLF_live21y * GLF_live21y > 262144) {
                ;
            }
        }
        {
            ;
        }
    }
    do {
        if (x * x + y * y > 4.0) {
            {
                float GLF_live19limit = _GLF_FUZZED((true ? (-7.3) : ((-678.138) + 9336.6476)));
                int GLF_live19looplimiter0 = 0;
                float GLF_live19ref = _GLF_FUZZED(float(true));
                float GLF_live19s = _GLF_FUZZED((-0.6));
                for (int GLF_live19i = 1; GLF_live19i < 800; GLF_live19i++) {
                    if (GLF_live19looplimiter0 >= 3) {
                        break;
                    }
                    if (_GLF_DEAD(false)) {
                        continue;
                    }
                    GLF_live19looplimiter0++;
                    {
                        if (mod(float(GLF_live19i), GLF_live19ref) <= 0.01) {
                            GLF_live19s += 0.2;
                        }
                        if (float(GLF_live19i) >= GLF_live19limit) {
                            ;
                        }
                    }
                }
            }
            if (_GLF_DEAD(_GLF_IDENTITY(false, (false) && true))) {
                discard;
            }
            {
                vec3 GLF_live1color = _GLF_FUZZED((mat3(-74.99, -7.8, 4443.7053, 510.545, -41.57, -239.985, 2.3, -441.037, 9.8) * (vec3(1.6, 424.337, -1.1) - vec3(1.5, 140.497, -5.8))));
                {
                    GLF_live1color.z += float(GLF_live1obj.numbers[7]);
                    {
                        {
                            int GLF_live15looplimiter1 = 0;
                            {
                                {
                                    ;
                                }
                            }
                            if (GLF_live15looplimiter1 >= 5) {
                                ;
                            }
                        }
                        {
                            int GLF_live14looplimiter1 = 0;
                            {
                                vec2 GLF_live16coord = _GLF_FUZZED(vec2(7.5, 430.407));
                                int GLF_live16i = _GLF_FUZZED(57923);
                                int GLF_live16looplimiter0 = 0;
                                while (GLF_live16i < 1 && GLF_live16coord.x > 1.0 || GLF_live16coord.y > 1.0) {
                                    if (GLF_live16looplimiter0 >= 7) {
                                        break;
                                    }
                                    GLF_live16looplimiter0++;
                                    {
                                        if (GLF_live16coord.x > 1.0)
                                            GLF_live16coord.x -= 1.0;
                                        if (GLF_live16coord.y > 1.0)
                                            GLF_live16coord.y -= 1.0;
                                        GLF_live16coord *= 2.0;
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                            break;
                                        }
                                        GLF_live16i++;
                                    }
                                }
                            }
                            if (GLF_live14looplimiter1 >= 6) {
                                ;
                                {
                                    vec4 GLF_live19c = _GLF_FUZZED((+vec3(721.530, -2534.0361, -851.796).yxzy));
                                    int GLF_live19i = _GLF_FUZZED(-47138);
                                    {
                                        if (GLF_live19c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i, 4)] >= 1.0) {
                                            if (_GLF_DEAD(false)) {
                                                continue;
                                            }
                                            GLF_live19c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i, 4)] = GLF_live19c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i, 4)] * GLF_live19c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i, 4)];
                                        }
                                    }
                                }
                            }
                        }
                        {
                            ivec2 GLF_live18p = _GLF_FUZZED(ivec2(3425, 20545));
                            {
                                GLF_live18p.y++;
                                if (_GLF_DEAD(false)) {
                                    return vec3(1.0, 1.0, 1.0);
                                }
                            }
                        }
                        int GLF_live6count = _GLF_FUZZED(-96854);
                        {
                            int GLF_live20looplimiter0 = 0;
                            if (GLF_live20looplimiter0 >= 3) {
                                ;
                            }
                        }
                        int GLF_live6looplimiter0 = 0;
                        int GLF_live6v = _GLF_FUZZED(-26467);
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            discard;
                            {
                                ivec2 GLF_live18p = _GLF_FUZZED((ivec2(-93191, 38295) * (-29338)));
                                {
                                    GLF_live18p.y--;
                                }
                            }
                        }
                        while (GLF_live6v > 1) {
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                break;
                            }
                            if (GLF_live6looplimiter0 >= 5) {
                                {
                                    vec2 GLF_live16coord = _GLF_FUZZED(vec4(-99.06, -2.8, 9350.0235, 895.406).ra);
                                    int GLF_live16i = _GLF_FUZZED((int(7010u)));
                                    int GLF_live16looplimiter0 = 0;
                                    {
                                        if (GLF_live16looplimiter0 >= 7) {
                                            ;
                                        }
                                        GLF_live16looplimiter0++;
                                        {
                                            if (GLF_live16coord.x > 1.0)
                                                GLF_live16coord.x -= 1.0;
                                            if (GLF_live16coord.y > 1.0) {
                                                {
                                                    int GLF_live21c_im = _GLF_FUZZED(27352);
                                                    int GLF_live21c_re = _GLF_FUZZED(97432);
                                                    int GLF_live21iteration = _GLF_FUZZED(54731);
                                                    int GLF_live21looplimiter0 = 0;
                                                    int GLF_live21x = _GLF_FUZZED(59950);
                                                    int GLF_live21y = _GLF_FUZZED(int(true));
                                                    for (int GLF_live21k = 0; GLF_live21k < 1000; GLF_live21k++) {
                                                        if (GLF_live21looplimiter0 >= 3) {
                                                            break;
                                                        }
                                                        GLF_live21looplimiter0++;
                                                        {
                                                            if (GLF_live21x * GLF_live21x + GLF_live21y * GLF_live21y > 262144) {
                                                                break;
                                                            }
                                                            int GLF_live21x_new = ((GLF_live21x * GLF_live21x - GLF_live21y * GLF_live21y) / 256 + GLF_live21c_re);
                                                            GLF_live21y = (2 * GLF_live21x * GLF_live21y / 256 + GLF_live21c_im);
                                                            GLF_live21x = GLF_live21x_new;
                                                            GLF_live21iteration++;
                                                        }
                                                    }
                                                }
                                                GLF_live16coord.y -= 1.0;
                                            }
                                            GLF_live16coord *= 2.0;
                                            GLF_live16i++;
                                        }
                                    }
                                }
                                break;
                                {
                                    vec3 GLF_live10col = _GLF_FUZZED((vec2(-5.2, -891.808) * ((false ? (-7678.2508) : (-6335.4892)) - mat3x2(-9.5, 8.3, 7744.7998, 1.7, 8.1, -442.112))));
                                    vec2 GLF_live10uv = _GLF_FUZZED(vec2(-8.3, -61.81));
                                    if (_GLF_DEAD(false)) {
                                        discard;
                                        {
                                            {
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                    discard;
                                                }
                                                ;
                                            }
                                        }
                                    }
                                    {
                                        int GLF_live14count = _GLF_FUZZED(68384);
                                        {
                                            GLF_live14count++;
                                            {
                                                int GLF_live16looplimiter0 = 0;
                                                if (GLF_live16looplimiter0 >= 7) {
                                                    ;
                                                    {
                                                        float GLF_live19limit = _GLF_FUZZED(-5.4);
                                                        int GLF_live19looplimiter0 = 0;
                                                        float GLF_live19ref = _GLF_FUZZED(-2488.8834);
                                                        float GLF_live19s = _GLF_FUZZED(float(26848u));
                                                        for (int GLF_live19i = 1; GLF_live19i < 800; GLF_live19i++) {
                                                            if (GLF_live19looplimiter0 >= 3) {
                                                                break;
                                                            }
                                                            GLF_live19looplimiter0++;
                                                            {
                                                                if (mod(float(GLF_live19i), GLF_live19ref) <= 0.01) {
                                                                    GLF_live19s += 0.2;
                                                                }
                                                                if (float(GLF_live19i) >= GLF_live19limit) {
                                                                    ;
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                                if (_GLF_DEAD(false)) {
                                                    discard;
                                                }
                                            }
                                        }
                                    }
                                    {
                                        vec2 GLF_live16coord = _GLF_FUZZED(vec2(3586.1135, 50.82));
                                        int GLF_live16i = _GLF_FUZZED(4469);
                                        {
                                            int GLF_live16looplimiter0 = 0;
                                            while (GLF_live16i < 1 && GLF_live16coord.x > 1.0 || GLF_live16coord.y > 1.0) {
                                                if (GLF_live16looplimiter0 >= 7) {
                                                    break;
                                                }
                                                GLF_live16looplimiter0++;
                                                {
                                                    if (GLF_live16coord.x > 1.0) {
                                                        if (_GLF_DEAD(false)) {
                                                            break;
                                                        }
                                                        GLF_live16coord.x -= 1.0;
                                                    }
                                                    if (GLF_live16coord.y > 1.0) {
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                            continue;
                                                        }
                                                        {
                                                            vec4 GLF_live19c = _GLF_FUZZED(vec2(-0.7, -160.657).rggg);
                                                            {
                                                                int GLF_live19looplimiter1 = 0;
                                                                for (int GLF_live19i = 0; GLF_live19i < 3; GLF_live19i++) {
                                                                    if (GLF_live19looplimiter1 >= 3) {
                                                                        break;
                                                                    }
                                                                    GLF_live19looplimiter1++;
                                                                    {
                                                                        if (GLF_live19c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i, 4)] >= 1.0) {
                                                                            GLF_live19c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i, 4)] = GLF_live19c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i, 4)] * GLF_live19c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i, 4)];
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                        GLF_live16coord.y -= 1.0;
                                                    }
                                                    GLF_live16coord *= 2.0;
                                                    GLF_live16i++;
                                                    {
                                                        {
                                                            ;
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                        {
                                            ivec2 GLF_live18p = _GLF_FUZZED((ivec2(74318, -19655) + (+84050)));
                                            {
                                                GLF_live18p = GLF_live18iter(GLF_live18p);
                                            }
                                        }
                                    }
                                    {
                                        float GLF_live10stripe = GLF_live10compute_stripe(tan((GLF_live10uv.x + GLF_live10uv.y) * 20.0));
                                        GLF_live10col = mix(vec3(GLF_live10uv.x, .8, 0), vec3(1, GLF_live10uv.y, 0), GLF_live10stripe);
                                        GLF_live10_GLF_color = vec4(GLF_live10col, 1.0);
                                        ;
                                    }
                                }
                            }
                            {
                                if (_GLF_DEAD(false)) {
                                    continue;
                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                        return vec3(1.0, 1.0, 1.0);
                                    }
                                }
                                {
                                    float GLF_live20x = _GLF_FUZZED((-432.509));
                                    float GLF_live20y = _GLF_FUZZED((float(31793u) + vec4(-0.2, -24.26, 42.22, 8.6).x));
                                    if (0.0 > GLF_live20resolution.x) {
                                        GLF_live20x = 1.0;
                                        GLF_live20y = 1.0;
                                    }
                                }
                                int GLF_live7baseIndex = _GLF_FUZZED(int(false));
                                {
                                    float GLF_live19limit = _GLF_FUZZED(2.7);
                                    float GLF_live19ref = _GLF_FUZZED(89.39);
                                    float GLF_live19s = _GLF_FUZZED(187.526);
                                    {
                                        int GLF_live19looplimiter0 = 0;
                                        for (int GLF_live19i = 1; GLF_live19i < 800; GLF_live19i++) {
                                            if (GLF_live19looplimiter0 >= 3) {
                                                break;
                                            }
                                            GLF_live19looplimiter0++;
                                            {
                                                if (mod(float(GLF_live19i), GLF_live19ref) <= 0.01) {
                                                    GLF_live19s += 0.2;
                                                }
                                                if (float(GLF_live19i) >= GLF_live19limit) {
                                                    ;
                                                }
                                            }
                                            if (_GLF_DEAD(false)) {
                                                discard;
                                            }
                                        }
                                    }
                                }
                                {
                                    vec2 GLF_live13coord = _GLF_FUZZED(vec2(-0.0, -6.4));
                                    int GLF_live13i = _GLF_FUZZED(4365);
                                    vec4 GLF_live13texel = _GLF_FUZZED((mat3x4(1.4, -866.195, 6.2, 184.404, 234.593, -96.83, 56.06, 8623.6030, -74.53, -248.483, -901.244, 6.1) * vec3(-9.1, -3648.4960, 0.9)));
                                    {
                                        GLF_live13coord = GLF_live13texel.xz + GLF_live13texel.yy;
                                        GLF_live13coord = floor(GLF_live13coord * 256.0) / 256.0;
                                        GLF_live13texel = texture(GLF_live13tex, GLF_live13coord);
                                        {
                                            int GLF_live21looplimiter2 = 0;
                                            if (GLF_live21looplimiter2 >= 3) {
                                                ;
                                                if (_GLF_DEAD(false)) {
                                                    return vec3(1.0, 1.0, 1.0);
                                                }
                                            }
                                        }
                                        GLF_live13i++;
                                    }
                                }
                                int GLF_live7data = _GLF_FUZZED((30481 ^ ivec3(10645, 25428, -54345).t));
                                int GLF_live7treeIndex = _GLF_FUZZED(((-40442) - 612));
                                if (GLF_live7tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live7baseIndex, 10)].rightIndex == -1) {
                                    GLF_live7tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live7baseIndex, 10)].rightIndex = GLF_live7treeIndex;
                                    {
                                        {
                                            GLF_live14_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
                                        }
                                    }
                                    GLF_live7makeTreeNode(GLF_live7tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live7treeIndex, 10)], GLF_live7data);
                                    ;
                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                        break;
                                    }
                                    {
                                        ivec2 GLF_live18p = _GLF_FUZZED(ivec2(61504, -2232));
                                        {
                                            GLF_live18p.y--;
                                        }
                                    }
                                } else {
                                    if (_GLF_DEAD(false)) {
                                        discard;
                                        {
                                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                break;
                                            }
                                            vec2 GLF_live16coord = _GLF_FUZZED((7463.7939 * vec2(-335.239, -2.2)));
                                            int GLF_live16i = _GLF_FUZZED(-86887);
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                discard;
                                            }
                                            int GLF_live16looplimiter0 = 0;
                                            {
                                                if (GLF_live16looplimiter0 >= 7) {
                                                    ;
                                                }
                                                GLF_live16looplimiter0++;
                                                {
                                                    if (GLF_live16coord.x > 1.0) {
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                            continue;
                                                        }
                                                        GLF_live16coord.x -= 1.0;
                                                    }
                                                    if (GLF_live16coord.y > 1.0)
                                                        GLF_live16coord.y -= 1.0;
                                                    GLF_live16coord *= 2.0;
                                                    GLF_live16i++;
                                                }
                                            }
                                        }
                                        if (_GLF_DEAD(false)) {
                                            if (_GLF_DEAD(false)) {
                                                break;
                                            }
                                            break;
                                            {
                                                vec2 GLF_live15coord = _GLF_FUZZED((4517.6151 + vec2(-6.8, 8.4)));
                                                int GLF_live15looplimiter1 = 0;
                                                vec4 GLF_live15res = _GLF_FUZZED(vec4(6.8, 1.4, 46.00, 3.8));
                                                float GLF_live15uvstep = _GLF_FUZZED(float(-82900));
                                                for (int GLF_live15i = 0; GLF_live15i < 3; GLF_live15i++) {
                                                    if (GLF_live15looplimiter1 >= 5) {
                                                        {
                                                            if (_GLF_DEAD(false)) {
                                                                discard;
                                                            }
                                                            float GLF_live20c_im = _GLF_FUZZED(float((139985u * (+193556u))));
                                                            float GLF_live20c_re = _GLF_FUZZED((5.7 - 644.366));
                                                            int GLF_live20iteration = _GLF_FUZZED(ivec2(23367, -73126).r);
                                                            int GLF_live20iterationCap = _GLF_FUZZED((6262));
                                                            int GLF_live20k = _GLF_FUZZED(-34083);
                                                            int GLF_live20looplimiter0 = 0;
                                                            float GLF_live20x = _GLF_FUZZED(-3059.5611);
                                                            float GLF_live20y = _GLF_FUZZED(-442.642);
                                                            do {
                                                                if (GLF_live20looplimiter0 >= 3) {
                                                                    break;
                                                                }
                                                                GLF_live20looplimiter0++;
                                                                {
                                                                    if (GLF_live20x * GLF_live20x + GLF_live20y * GLF_live20y > 4.0) {
                                                                        if (_GLF_DEAD(_GLF_IDENTITY(false, !(_GLF_IDENTITY(!(false), false || (!(false))))))) {
                                                                            discard;
                                                                        }
                                                                        break;
                                                                    }
                                                                    float GLF_live20x_new = GLF_live20x * GLF_live20x - GLF_live20y * GLF_live20y + GLF_live20c_re;
                                                                    GLF_live20y = 2.0 * GLF_live20x * GLF_live20y + GLF_live20c_im;
                                                                    GLF_live20x = GLF_live20x_new;
                                                                    GLF_live20iteration++;
                                                                    GLF_live20k++;
                                                                }
                                                            } while (GLF_live20k < bitfieldInsert(GLF_live20iterationCap + (257.0 > GLF_live20resolution.y ? 1 : 0), 0, 0, 0));
                                                        }
                                                        break;
                                                    }
                                                    {
                                                        int GLF_live19looplimiter0 = 0;
                                                        if (GLF_live19looplimiter0 >= 3) {
                                                            ;
                                                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                                break;
                                                            }
                                                        }
                                                    }
                                                    GLF_live15looplimiter1++;
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                        continue;
                                                    }
                                                    {
                                                        if (_GLF_DEAD(false)) {
                                                            continue;
                                                        }
                                                        {
                                                            int GLF_live15looplimiter0 = 0;
                                                            for (int GLF_live15j = 0; GLF_live15j < 3; GLF_live15j++) {
                                                                if (GLF_live15looplimiter0 >= 5) {
                                                                    break;
                                                                }
                                                                GLF_live15looplimiter0++;
                                                                {
                                                                    GLF_live15res += texture(GLF_live15tex, GLF_live15coord + vec2(float(GLF_live15i - 1) * GLF_live15uvstep, float(GLF_live15j - 1) * GLF_live15uvstep)) * GLF_live15weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15i * 3 + GLF_live15j, 9)];
                                                                }
                                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < sqrt(0.0))))) {
                                                                    continue;
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                        {
                                            vec4 GLF_live19c = _GLF_FUZZED(vec4((+(-7906.2343)), 5575.0211, 9885.0991, -29.93));
                                            int GLF_live19i = _GLF_FUZZED((-(-53982)));
                                            int GLF_live19looplimiter1 = 0;
                                            {
                                                if (GLF_live19looplimiter1 >= 3) {
                                                    ;
                                                }
                                                GLF_live19looplimiter1++;
                                                {
                                                    if (GLF_live19c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i, 4)] >= 1.0) {
                                                        GLF_live19c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i, 4)] = GLF_live19c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i, 4)] * GLF_live19c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i, 4)];
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    GLF_live7baseIndex = GLF_live7tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live7baseIndex, 10)].rightIndex;
                                    ;
                                    if (_GLF_DEAD(false)) {
                                        continue;
                                    }
                                    if (_GLF_DEAD(false)) {
                                        continue;
                                    }
                                }
                            }
                            {
                                vec4 GLF_live19c = _GLF_FUZZED((vec4(-3.2, -8716.1779, 8.7, -0.5) * mat4(-2.5, -497.696, 44.19, 5609.3578, 3.5, -0.5, 13.65, 2.7, -252.622, -2.5, 84.16, -41.80, 37.05, 2.5, -2.9, 1.5)));
                                int GLF_live19i = _GLF_FUZZED(46028);
                                int GLF_live19looplimiter1 = 0;
                                {
                                    if (GLF_live19looplimiter1 >= 3) {
                                        ;
                                    }
                                    GLF_live19looplimiter1++;
                                    {
                                        if (GLF_live19c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i, 4)] >= 1.0) {
                                            GLF_live19c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i, 4)] = GLF_live19c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i, 4)] * GLF_live19c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i, 4)];
                                        }
                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                            discard;
                                        }
                                    }
                                }
                            }
                            GLF_live6looplimiter0++;
                            {
                                if ((GLF_live6v & 1) == 1) {
                                    GLF_live6v = 3 * GLF_live6v + 1;
                                } else {
                                    if (_GLF_DEAD(false)) {
                                        return vec3(1.0, 1.0, 1.0);
                                    }
                                    GLF_live6v /= 2;
                                }
                                {
                                    int GLF_live17a = _GLF_FUZZED(int(false));
                                    if (_GLF_DEAD(false)) {
                                        return vec3(1.0, 1.0, 1.0);
                                    }
                                    int GLF_live17b = _GLF_FUZZED((6771 | 17902));
                                    vec2 GLF_live17uv = _GLF_FUZZED(vec2(747.513, -6.8));
                                    {
                                        int GLF_live17looplimiter1 = 0;
                                        do {
                                            {
                                                if (_GLF_DEAD(false)) {
                                                    continue;
                                                }
                                                {
                                                    ;
                                                }
                                            }
                                            if (GLF_live17looplimiter1 >= 6) {
                                                break;
                                                {
                                                    int GLF_live18looplimiter1 = 0;
                                                    if (GLF_live18looplimiter1 >= 7) {
                                                        ;
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < tan(0.0))))) {
                                                            return vec3(1.0, 1.0, 1.0);
                                                        }
                                                    }
                                                }
                                            }
                                            GLF_live17looplimiter1++;
                                            {
                                                GLF_live17uv.y -= step(GLF_live17injectionSwitch.y, GLF_live17uv.x) + float(GLF_live17a);
                                                GLF_live17uv.x *= (isnan(GLF_live17uv.y) ? cosh(GLF_live17gl_FragCoord.y) : tanh(GLF_live17gl_FragCoord.x));
                                                GLF_live17b--;
                                            }
                                            {
                                                int GLF_live18i = _GLF_FUZZED(-39357);
                                                ivec2 GLF_live18p = _GLF_FUZZED(ivec2(-61536, 28759));
                                                {
                                                    if (_GLF_DEAD(false)) {
                                                        return vec3(1.0, 1.0, 1.0);
                                                    }
                                                    int GLF_live18looplimiter0 = 0;
                                                    for (GLF_live18i = 0; GLF_live18i < 100; GLF_live18i++) {
                                                        if (GLF_live18looplimiter0 >= 7) {
                                                            break;
                                                        }
                                                        GLF_live18looplimiter0++;
                                                        {
                                                            GLF_live18p = GLF_live18iter(GLF_live18p);
                                                        }
                                                    }
                                                }
                                            }
                                        } while (GLF_live17b > int(GLF_live17injectionSwitch.x));
                                    }
                                }
                                GLF_live6count++;
                            }
                        }
                        if (_GLF_DEAD(false)) {
                            continue;
                        }
                    }
                    {
                        vec2 GLF_live16coord = _GLF_FUZZED(vec2(vec3(3.7, -0.8, -71.67)));
                        int GLF_live16i = _GLF_FUZZED(86603);
                        int GLF_live16looplimiter0 = 0;
                        if (_GLF_DEAD(false)) {
                            discard;
                        }
                        {
                            if (GLF_live16looplimiter0 >= 7) {
                                ;
                            }
                            GLF_live16looplimiter0++;
                            {
                                if (GLF_live16coord.x > 1.0)
                                    GLF_live16coord.x -= 1.0;
                                if (GLF_live16coord.y > 1.0) {
                                    {
                                        int GLF_live20looplimiter3 = 0;
                                        if (GLF_live20looplimiter3 >= 3) {
                                            ;
                                        }
                                    }
                                    GLF_live16coord.y -= 1.0;
                                }
                                GLF_live16coord *= 2.0;
                                GLF_live16i++;
                            }
                        }
                    }
                }
            }
            break;
            {
                {
                    int GLF_live15looplimiter0 = 0;
                    if (GLF_live15looplimiter0 >= 5) {
                        ;
                    }
                }
                int GLF_live9baseIndex = _GLF_FUZZED((677 * (-87643)));
                int GLF_live9data = _GLF_FUZZED(int(false));
                {
                    float GLF_live19s = _GLF_FUZZED(float(11188u));
                    {
                        ;
                    }
                }
                int GLF_live9treeIndex = _GLF_FUZZED(-80179);
                {
                    int GLF_live15looplimiter1 = 0;
                    if (GLF_live15looplimiter1 >= 5) {
                        ;
                    }
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    discard;
                }
                {
                    {
                        vec2 GLF_live16coord = _GLF_FUZZED(vec2(-79.80, 2538.5657));
                        vec4 GLF_live16res = _GLF_FUZZED(vec4(-9412.5795, 8907.6689, -8.3, -61.24));
                        if (GLF_live16coord.x < 1.0 && GLF_live16coord.y < 1.0) {
                            GLF_live16res = texture(GLF_live16tex, GLF_live16coord);
                        }
                    }
                    int GLF_live9looplimiter0 = 0;
                    while (GLF_live9baseIndex <= GLF_live9treeIndex) {
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                            continue;
                        }
                        if (GLF_live9looplimiter0 >= 7) {
                            if (_GLF_DEAD(false)) {
                                discard;
                            }
                            break;
                            if (_GLF_DEAD(false)) {
                                discard;
                            }
                        }
                        if (_GLF_DEAD(false)) {
                            break;
                        }
                        {
                            int GLF_live17l = _GLF_FUZZED((+93751));
                            int GLF_live17m = _GLF_FUZZED((+(79928 + 42041)));
                            {
                                GLF_live17l = GLF_live17m + 1;
                            }
                        }
                        if (_GLF_DEAD(false)) {
                            continue;
                        }
                        GLF_live9looplimiter0++;
                        {
                            if (GLF_live9data <= GLF_live9tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9baseIndex, 10)].data) {
                                if (_GLF_DEAD(false)) {
                                    discard;
                                }
                                if (GLF_live9tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9baseIndex, 10)].leftIndex == -1) {
                                    GLF_live9tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9baseIndex, 10)].leftIndex = GLF_live9treeIndex;
                                    if (_GLF_DEAD(false)) {
                                        continue;
                                    }
                                    GLF_live9makeTreeNode(GLF_live9tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9treeIndex, 10)], GLF_live9data);
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                        break;
                                        {
                                            int GLF_live17a = _GLF_FUZZED(((-62274) | (-53481)));
                                            int GLF_live17b = _GLF_FUZZED((79626 ^ 48835));
                                            vec2 GLF_live17uv = _GLF_FUZZED(vec2(836.137));
                                            {
                                                GLF_live17uv.y -= step(GLF_live17injectionSwitch.y, GLF_live17uv.x) + float(GLF_live17a);
                                                {
                                                    if (_GLF_DEAD(false)) {
                                                        continue;
                                                    }
                                                    {
                                                        ;
                                                    }
                                                }
                                                GLF_live17uv.x *= (isnan(GLF_live17uv.y) ? cosh(GLF_live17gl_FragCoord.y) : tanh(GLF_live17gl_FragCoord.x));
                                                GLF_live17b--;
                                            }
                                        }
                                    }
                                    if (_GLF_DEAD(false)) {
                                        {
                                            {
                                                int GLF_live15looplimiter1 = 0;
                                                if (GLF_live15looplimiter1 >= 5) {
                                                    ;
                                                    if (_GLF_DEAD(false)) {
                                                        discard;
                                                    }
                                                }
                                            }
                                            int GLF_live13looplimiter0 = 0;
                                            {
                                                vec2 GLF_live15coord = _GLF_FUZZED((mat4x2(3.2, -1.8, 63.15, -462.500, -714.403, 28.20, 17.95, 57.13) * vec4(46.62, -2.8, -3.5, -4.9)));
                                                int GLF_live15i = _GLF_FUZZED(int((mat2x3(6993.9855, 25.20, 45.96, -2.3, -7.8, 3750.3036) == mat2x3(mat3x4(-7.8, -7726.6008, 30.28, -417.674, -137.829, -117.034, -2.4, -2262.2571, 9.8, 974.503, -830.858, 0.0)))));
                                                int GLF_live15j = _GLF_FUZZED(-94902);
                                                if (_GLF_DEAD(false)) {
                                                    break;
                                                }
                                                {
                                                    ivec2 GLF_live18p = _GLF_FUZZED((((-90491) - ivec2(8233, -22062)) ^ ivec2(-77712, 35416)));
                                                    {
                                                        GLF_live18p.x = -GLF_live18p.x;
                                                    }
                                                }
                                                int GLF_live15looplimiter0 = 0;
                                                vec4 GLF_live15res = _GLF_FUZZED((mat3x4(-6.4, 12.10, 6079.6385, 3.6, -51.55, 202.477, -954.829, -4.5, 38.15, -25.63, 819.283, -34.10) * vec3(47.63, -28.52, 3.6)));
                                                float GLF_live15uvstep = _GLF_FUZZED(-567.576);
                                                if (_GLF_DEAD(false)) {
                                                    continue;
                                                }
                                                {
                                                    if (_GLF_DEAD(false)) {
                                                        continue;
                                                    }
                                                    if (GLF_live15looplimiter0 >= 5) {
                                                        ;
                                                    }
                                                    GLF_live15looplimiter0++;
                                                    {
                                                        GLF_live15res += texture(GLF_live15tex, GLF_live15coord + vec2(float(GLF_live15i - 1) * GLF_live15uvstep, float(GLF_live15j - 1) * GLF_live15uvstep)) * GLF_live15weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15i * 3 + GLF_live15j, 9)];
                                                    }
                                                }
                                            }
                                            if (GLF_live13looplimiter0 >= 4) {
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < abs(0.0))))) {
                                                    return vec3(1.0, 1.0, 1.0);
                                                    if (_GLF_DEAD(false)) {
                                                        return vec3(1.0, 1.0, 1.0);
                                                    }
                                                }
                                                ;
                                            }
                                        }
                                        continue;
                                        {
                                            {
                                                ;
                                            }
                                        }
                                        {
                                            {
                                                ;
                                            }
                                        }
                                        {
                                            int GLF_live19i = _GLF_FUZZED(45247);
                                            float GLF_live19ref = _GLF_FUZZED(vec3(-85.40, 166.848, -11.80).b);
                                            float GLF_live19s = _GLF_FUZZED(vec3(-5.9, -4.1, -9.3).t);
                                            if (mod(float(GLF_live19i), GLF_live19ref) <= 0.01) {
                                                GLF_live19s += 0.2;
                                            }
                                        }
                                    }
                                    ;
                                } else {
                                    {
                                        float GLF_live20c_im = _GLF_FUZZED(((-474.694) - (-5.9)));
                                        float GLF_live20c_re = _GLF_FUZZED(-5.3);
                                        int GLF_live20iteration = _GLF_FUZZED(int(91674u));
                                        int GLF_live20iterationCap = _GLF_FUZZED(29189);
                                        int GLF_live20k = _GLF_FUZZED(-22818);
                                        int GLF_live20looplimiter0 = 0;
                                        float GLF_live20x = _GLF_FUZZED(vec4(-21.12, 6.3, 4.6, 3168.8950).x);
                                        float GLF_live20y = _GLF_FUZZED(vec3(5.4, 389.583, -1.8).pp.y);
                                        do {
                                            if (GLF_live20looplimiter0 >= 3) {
                                                break;
                                            }
                                            GLF_live20looplimiter0++;
                                            {
                                                if (GLF_live20x * GLF_live20x + GLF_live20y * GLF_live20y > 4.0) {
                                                    break;
                                                }
                                                float GLF_live20x_new = GLF_live20x * GLF_live20x - GLF_live20y * GLF_live20y + GLF_live20c_re;
                                                GLF_live20y = 2.0 * GLF_live20x * GLF_live20y + GLF_live20c_im;
                                                GLF_live20x = GLF_live20x_new;
                                                GLF_live20iteration++;
                                                GLF_live20k++;
                                            }
                                        } while (GLF_live20k < bitfieldInsert(GLF_live20iterationCap + (257.0 > GLF_live20resolution.y ? 1 : 0), 0, 0, 0));
                                    }
                                    GLF_live9baseIndex = GLF_live9tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9baseIndex, 10)].leftIndex;
                                    if (_GLF_DEAD(false)) {
                                        if (_GLF_DEAD(false)) {
                                            continue;
                                        }
                                        return vec3(1.0, 1.0, 1.0);
                                    }
                                    {
                                        {
                                            ;
                                        }
                                    }
                                    {
                                        ivec2 GLF_live18p = _GLF_FUZZED(ivec2(76317, 73903));
                                        {
                                            GLF_live18p.y++;
                                        }
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                            break;
                                        }
                                    }
                                    continue;
                                }
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    break;
                                }
                            } else {
                                {
                                    vec2 GLF_live15coord = _GLF_FUZZED(vec2(((-4186.9866) * (-0.0))));
                                    int GLF_live15i = _GLF_FUZZED(-89001);
                                    vec4 GLF_live15res = _GLF_FUZZED(vec4(7.3, -702.667, 20.44, -5633.5634));
                                    float GLF_live15uvstep = _GLF_FUZZED(vec2(7703.6889, -991.708).g);
                                    {
                                        int GLF_live15looplimiter0 = 0;
                                        for (int GLF_live15j = 0; GLF_live15j < 3; GLF_live15j++) {
                                            if (GLF_live15looplimiter0 >= 5) {
                                                break;
                                            }
                                            GLF_live15looplimiter0++;
                                            {
                                                GLF_live15res += texture(GLF_live15tex, GLF_live15coord + vec2(float(GLF_live15i - 1) * GLF_live15uvstep, float(GLF_live15j - 1) * GLF_live15uvstep)) * GLF_live15weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15i * 3 + GLF_live15j, 9)];
                                            }
                                        }
                                    }
                                }
                                if (GLF_live9tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9baseIndex, 10)].rightIndex == -1) {
                                    GLF_live9tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9baseIndex, 10)].rightIndex = GLF_live9treeIndex;
                                    GLF_live9makeTreeNode(GLF_live9tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9treeIndex, 10)], GLF_live9data);
                                    ;
                                } else {
                                    GLF_live9baseIndex = GLF_live9tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9baseIndex, 10)].rightIndex;
                                    {
                                        int GLF_live18looplimiter1 = 0;
                                        ivec2 GLF_live18p = _GLF_FUZZED(((-((-72042) ^ 40437)) - ivec2(80822, -89744)));
                                        while (GLF_live18p.x > 15) {
                                            if (GLF_live18looplimiter1 >= 7) {
                                                break;
                                            }
                                            GLF_live18looplimiter1++;
                                            {
                                                GLF_live18p.x -= 16;
                                            }
                                        }
                                    }
                                    {
                                        int GLF_live14baseIndex = _GLF_FUZZED(64660);
                                        {
                                            {
                                                ;
                                            }
                                        }
                                        int GLF_live14data = _GLF_FUZZED((-33523));
                                        int GLF_live14treeIndex = _GLF_FUZZED(67525);
                                        if (GLF_live14tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14baseIndex, 10)].rightIndex == -1) {
                                            GLF_live14tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14baseIndex, 10)].rightIndex = GLF_live14treeIndex;
                                            GLF_live14makeTreeNode(GLF_live14tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14treeIndex, 10)], GLF_live14data);
                                            ;
                                            if (_GLF_DEAD(false)) {
                                                break;
                                            }
                                        } else {
                                            {
                                                {
                                                    ;
                                                }
                                            }
                                            GLF_live14baseIndex = GLF_live14tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14baseIndex, 10)].rightIndex;
                                            ;
                                        }
                                    }
                                    continue;
                                }
                            }
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        {
                            float GLF_live20c_im = _GLF_FUZZED((true ? (9.8 - (-5.4)) : 6.9));
                            float GLF_live20c_re = _GLF_FUZZED(741.490);
                            int GLF_live20iteration = _GLF_FUZZED(91962);
                            int GLF_live20iterationCap = _GLF_FUZZED(-96411);
                            int GLF_live20k = _GLF_FUZZED(96623);
                            float GLF_live20x = _GLF_FUZZED(-5.5);
                            float GLF_live20y = _GLF_FUZZED(2769.5059);
                            {
                                int GLF_live20looplimiter0 = 0;
                                do {
                                    if (GLF_live20looplimiter0 >= 3) {
                                        break;
                                    }
                                    GLF_live20looplimiter0++;
                                    {
                                        if (GLF_live20x * GLF_live20x + GLF_live20y * GLF_live20y > 4.0) {
                                            break;
                                        }
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                            return vec3(1.0, 1.0, 1.0);
                                        }
                                        float GLF_live20x_new = GLF_live20x * GLF_live20x - GLF_live20y * GLF_live20y + GLF_live20c_re;
                                        GLF_live20y = 2.0 * GLF_live20x * GLF_live20y + GLF_live20c_im;
                                        GLF_live20x = GLF_live20x_new;
                                        GLF_live20iteration++;
                                        GLF_live20k++;
                                    }
                                } while (GLF_live20k < bitfieldInsert(GLF_live20iterationCap + (257.0 > GLF_live20resolution.y ? 1 : 0), 0, 0, 0));
                            }
                        }
                        return vec3(1.0, 1.0, 1.0);
                        {
                            vec2 GLF_live16coord = _GLF_FUZZED((vec2(-5158.6530, -6.2) - 0.9));
                            int GLF_live16i = _GLF_FUZZED(ivec3(-11101, 96203, -15481).p);
                            {
                                if (GLF_live16coord.x > 1.0)
                                    GLF_live16coord.x -= 1.0;
                                if (GLF_live16coord.y > 1.0)
                                    GLF_live16coord.y -= 1.0;
                                GLF_live16coord *= 2.0;
                                GLF_live16i++;
                            }
                        }
                        {
                            int GLF_live21c_im = _GLF_FUZZED((65500 | 88407));
                            int GLF_live21c_re = _GLF_FUZZED(93366);
                            int GLF_live21iteration = _GLF_FUZZED((60302 + (-20042)));
                            if (_GLF_DEAD(false)) {
                                break;
                            }
                            int GLF_live21x = _GLF_FUZZED(int(true));
                            int GLF_live21y = _GLF_FUZZED((true ? (-72430) : 35796));
                            {
                                int GLF_live21looplimiter0 = 0;
                                for (int GLF_live21k = 0; GLF_live21k < 1000; GLF_live21k++) {
                                    if (GLF_live21looplimiter0 >= 3) {
                                        break;
                                    }
                                    GLF_live21looplimiter0++;
                                    {
                                        if (GLF_live21x * GLF_live21x + GLF_live21y * GLF_live21y > 262144) {
                                            break;
                                        }
                                        if (_GLF_DEAD(false)) {
                                            return vec3(1.0, 1.0, 1.0);
                                        }
                                        int GLF_live21x_new = ((GLF_live21x * GLF_live21x - GLF_live21y * GLF_live21y) / 256 + GLF_live21c_re);
                                        if (_GLF_DEAD(false)) {
                                            break;
                                        }
                                        GLF_live21y = (2 * GLF_live21x * GLF_live21y / 256 + GLF_live21c_im);
                                        GLF_live21x = GLF_live21x_new;
                                        GLF_live21iteration++;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        _GLF_struct_0 _GLF_struct_replacement_0 = _GLF_struct_0(ivec4(1, 1, 1, 1), x * x - y * y + c_re, ivec4(1, 1, 1, 1), 1, uvec4(1u, 1u, 1u, 1u), _GLF_struct_1(mat2(1.0, 1.0, 1.0, 1.0), ivec4(1, 1, 1, 1), 1));
        {
            int GLF_live14baseIndex = _GLF_FUZZED(60893);
            int GLF_live14data = _GLF_FUZZED(-84008);
            int GLF_live14treeIndex = _GLF_FUZZED(77802);
            {
                vec2 GLF_live15coord = _GLF_FUZZED(vec2(6057.9039, -3545.1020));
                int GLF_live15looplimiter1 = 0;
                vec4 GLF_live15res = _GLF_FUZZED((+vec4(95.16, -5.9, -8.6, -5.5)));
                float GLF_live15uvstep = _GLF_FUZZED(float(-66028));
                for (int GLF_live15i = 0; GLF_live15i < 3; GLF_live15i++) {
                    if (_GLF_DEAD(false)) {
                        continue;
                    }
                    if (GLF_live15looplimiter1 >= 5) {
                        break;
                    }
                    GLF_live15looplimiter1++;
                    {
                        {
                            int GLF_live15looplimiter0 = 0;
                            for (int GLF_live15j = 0; GLF_live15j < 3; GLF_live15j++) {
                                if (GLF_live15looplimiter0 >= 5) {
                                    break;
                                }
                                GLF_live15looplimiter0++;
                                {
                                    {
                                        int GLF_live20looplimiter0 = 0;
                                        if (GLF_live20looplimiter0 >= 3) {
                                            ;
                                        }
                                    }
                                    GLF_live15res += texture(GLF_live15tex, GLF_live15coord + vec2(float(GLF_live15i - 1) * GLF_live15uvstep, float(GLF_live15j - 1) * GLF_live15uvstep)) * GLF_live15weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15i * 3 + GLF_live15j, 9)];
                                }
                            }
                        }
                    }
                }
            }
            if (GLF_live14tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14baseIndex, 10)].leftIndex == -1) {
                GLF_live14tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14baseIndex, 10)].leftIndex = GLF_live14treeIndex;
                GLF_live14makeTreeNode(GLF_live14tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14treeIndex, 10)], GLF_live14data);
                ;
            } else {
                GLF_live14baseIndex = GLF_live14tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14baseIndex, 10)].leftIndex;
                ;
            }
        }
        if (_GLF_DEAD(false)) {
            return vec3(1.0, 1.0, 1.0);
        }
        y = _GLF_outlined_0(x, y, c_im);
        if (_GLF_DEAD(false)) {
            continue;
        }
        {
            int GLF_live12looplimiter5 = 0;
            if (GLF_live12looplimiter5 >= 6) {
                ;
            }
        }
        if (_GLF_DEAD(_GLF_IDENTITY(false, !(!(_GLF_IDENTITY(false, false || (false))))))) {
            return vec3(1.0, 1.0, 1.0);
        }
        x = _GLF_struct_replacement_0.x_new;
        {
            int GLF_live19i = _GLF_FUZZED(ivec4(-71189, -79074, -80504, -59334).t);
            float GLF_live19limit = _GLF_FUZZED(float(((-50327) * 40149)));
            int GLF_live19looplimiter0 = 0;
            float GLF_live19ref = _GLF_FUZZED((-(144.402)));
            float GLF_live19s = _GLF_FUZZED(7.4);
            {
                if (GLF_live19looplimiter0 >= 3) {
                    if (_GLF_DEAD(false)) {
                        discard;
                    }
                    ;
                }
                GLF_live19looplimiter0++;
                {
                    if (mod(float(GLF_live19i), GLF_live19ref) <= 0.01) {
                        GLF_live19s += 0.2;
                    }
                    if (float(GLF_live19i) >= GLF_live19limit) {
                        ;
                    }
                }
            }
        }
        iteration++;
        {
            {
                ;
            }
        }
        if (_GLF_DEAD(false)) {
            break;
        }
        k++;
    } while (k < bitfieldInsert(iterationCap + (257.0 > resolution.y ? 1 : 0), 0, 0, 0));
    if (0.0 > resolution.y) {
        iterationCap += 1;
    }
    if (iteration < bitfieldInsert(iterationCap, 0, 0, 0)) {
        {
            ivec2 GLF_live2p = _GLF_FUZZED(ivec2(-38120, -3262));
            {
                vec2 GLF_live15coord = _GLF_FUZZED(vec2(390.896));
                int GLF_live15i = _GLF_FUZZED(81946);
                int GLF_live15looplimiter0 = 0;
                vec4 GLF_live15res = _GLF_FUZZED((mat2x4(-2.2, 6433.7729, -2.6, 15.97, 373.105, -39.24, 6.3, 2.8) * (-vec2(4712.7699, -34.45))));
                float GLF_live15uvstep = _GLF_FUZZED(float(true));
                for (int GLF_live15j = 0; GLF_live15j < 3; GLF_live15j++) {
                    if (GLF_live15looplimiter0 >= 5) {
                        break;
                    }
                    GLF_live15looplimiter0++;
                    {
                        GLF_live15res += texture(GLF_live15tex, GLF_live15coord + vec2(float(GLF_live15i - 1) * GLF_live15uvstep, float(GLF_live15j - 1) * GLF_live15uvstep)) * GLF_live15weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15i * 3 + GLF_live15j, 9)];
                    }
                }
            }
            if (GLF_live2p.x < 0) {
                GLF_live2p.x = -GLF_live2p.x;
                {
                    vec2 GLF_live16coord = _GLF_FUZZED(vec2(-7.2));
                    vec4 GLF_live16res = _GLF_FUZZED(vec4(-454.180, -2028.4086, -89.62, 2.9));
                    {
                        GLF_live16res = texture(GLF_live16tex, GLF_live16coord);
                    }
                }
                if (_GLF_DEAD(false)) {
                    return vec3(1.0, 1.0, 1.0);
                    {
                        int GLF_live15looplimiter0 = 0;
                        if (GLF_live15looplimiter0 >= 5) {
                            {
                                ivec2 GLF_live18p = _GLF_FUZZED(ivec2(93789, 38308));
                                if (GLF_live18p.x < 0) {
                                    GLF_live18p.x = -GLF_live18p.x;
                                }
                            }
                            ;
                        }
                    }
                }
                if (_GLF_DEAD(false)) {
                    return vec3(1.0, 1.0, 1.0);
                }
            }
            {
                vec3 GLF_live10col = _GLF_FUZZED((vec3(39.96, -7249.7990, 299.919) - (false ? vec3(6.9, -0.3, -715.817) : vec3(-5.0, 1903.0611, -5215.0312))));
                {
                    vec2 GLF_live16coord = _GLF_FUZZED(vec2(-1130.2824, -0.6));
                    int GLF_live16i = _GLF_FUZZED(-46846);
                    int GLF_live16looplimiter0 = 0;
                    {
                        if (GLF_live16looplimiter0 >= 7) {
                            ;
                            {
                                int GLF_live18looplimiter1 = 0;
                                if (GLF_live18looplimiter1 >= 7) {
                                    ;
                                }
                            }
                        }
                        GLF_live16looplimiter0++;
                        {
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                return vec3(1.0, 1.0, 1.0);
                            }
                            if (GLF_live16coord.x > 1.0)
                                GLF_live16coord.x -= 1.0;
                            if (GLF_live16coord.y > 1.0)
                                GLF_live16coord.y -= 1.0;
                            GLF_live16coord *= 2.0;
                            GLF_live16i++;
                        }
                    }
                }
                vec2 GLF_live10uv = _GLF_FUZZED(vec4(-5.3, 234.140, 3.5, -6.3).ts);
                {
                    {
                        int GLF_live17a = _GLF_FUZZED(ivec4(-68097, -86049, -46070, -18395).b);
                        int GLF_live17b = _GLF_FUZZED(ivec3(-82118, -67261, -78383).z);
                        int GLF_live17c = _GLF_FUZZED((+((+(-43843)) * (+90191))));
                        int GLF_live17looplimiter2 = 0;
                        vec2 GLF_live17uv = _GLF_FUZZED((vec2(-15.77, -40.72) + float(-54259)));
                        {
                            if (GLF_live17looplimiter2 >= 6) {
                                ;
                            }
                            GLF_live17looplimiter2++;
                            {
                                GLF_live17uv.y -= step(GLF_live17injectionSwitch.y, GLF_live17uv.x) + float(GLF_live17a) + float(GLF_live17b);
                                GLF_live17uv.x += ldexp(GLF_live17injectionSwitch.y, isinf(GLF_live17uv.y + GLF_live17uv.x) ? findMSB(GLF_live17b) : findMSB(GLF_live17a));
                                {
                                    {
                                        ;
                                    }
                                }
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                    return vec3(1.0, 1.0, 1.0);
                                }
                                GLF_live17c--;
                            }
                        }
                    }
                    {
                        if (_GLF_DEAD(false)) {
                            return vec3(1.0, 1.0, 1.0);
                        }
                        {
                            ;
                        }
                    }
                    float GLF_live10stripe = GLF_live10compute_stripe(tan((GLF_live10uv.x + GLF_live10uv.y) * 20.0));
                    if (_GLF_DEAD(false)) {
                        return vec3(1.0, 1.0, 1.0);
                    }
                    GLF_live10col = mix(vec3(0.5, GLF_live10uv.x, 0.1), vec3(.4, 0, .5), GLF_live10stripe);
                    GLF_live10_GLF_color = vec4(GLF_live10col, 1.0);
                    {
                        int GLF_live20looplimiter3 = 0;
                        if (GLF_live20looplimiter3 >= 3) {
                            ;
                        }
                    }
                    ;
                }
            }
        }
        if (_GLF_DEAD(false)) {
            return vec3(1.0, 1.0, 1.0);
            {
                int GLF_live19looplimiter0 = 0;
                if (GLF_live19looplimiter0 >= 3) {
                    ;
                }
            }
        }
        return pickColor(iteration);
    } else {
        {
            float GLF_live20c_im = _GLF_FUZZED(0.4);
            float GLF_live20c_re = _GLF_FUZZED(4.1);
            int GLF_live20iteration = _GLF_FUZZED(ivec3(-62427, -87983, -19723).t);
            int GLF_live20k = _GLF_FUZZED(81397);
            float GLF_live20x = _GLF_FUZZED(-9235.0036);
            float GLF_live20y = _GLF_FUZZED(((-7798.8479) + 8.9));
            {
                if (GLF_live20x * GLF_live20x + GLF_live20y * GLF_live20y > 4.0) {
                    ;
                }
                float GLF_live20x_new = GLF_live20x * GLF_live20x - GLF_live20y * GLF_live20y + GLF_live20c_re;
                GLF_live20y = 2.0 * GLF_live20x * GLF_live20y + GLF_live20c_im;
                GLF_live20x = GLF_live20x_new;
                GLF_live20iteration++;
                GLF_live20k++;
            }
        }
        if (_GLF_DEAD(false)) {
            return vec3(1.0, 1.0, 1.0);
        }
        if (_GLF_DEAD(false)) {
            return vec3(1.0, 1.0, 1.0);
        }
        return vec3(xCoord / resolution.x, 0.0, yCoord / resolution.y);
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
        return vec3(1.0, 1.0, 1.0);
    }
}

void main() {
    {
        {
            {
                ;
            }
        }
        int GLF_live14baseIndex = _GLF_FUZZED(ivec4(15966, 37134, 98033, -96736).q);
        {
            {
                {
                    int GLF_live19i = _GLF_FUZZED((18270 | (51764 * 46209)));
                    float GLF_live19limit = _GLF_FUZZED((vec3(-78.96, -521.913, 7744.2248) * vec3(736.001, 0.9, -65.23)).x);
                    float GLF_live19s = _GLF_FUZZED(575.973);
                    if (float(GLF_live19i) >= GLF_live19limit) {
                        ;
                    }
                }
                vec2 GLF_live15coord = _GLF_FUZZED(vec2(-3.4, 4241.1818));
                int GLF_live15looplimiter1 = 0;
                vec4 GLF_live15res = _GLF_FUZZED(vec4(vec2(-410.858, -3753.7395), (true ? float(false) : (-57.80)), -85.68));
                float GLF_live15uvstep = _GLF_FUZZED(8.9);
                for (int GLF_live15i = 0; GLF_live15i < 3; GLF_live15i++) {
                    if (GLF_live15looplimiter1 >= 5) {
                        break;
                    }
                    GLF_live15looplimiter1++;
                    {
                        int GLF_live19looplimiter0 = 0;
                        if (GLF_live19looplimiter0 >= 3) {
                            ;
                        }
                    }
                    {
                        {
                            {
                                ;
                            }
                        }
                        {
                            int GLF_live15looplimiter0 = 0;
                            for (int GLF_live15j = 0; GLF_live15j < 3; GLF_live15j++) {
                                if (GLF_live15looplimiter0 >= 5) {
                                    break;
                                }
                                GLF_live15looplimiter0++;
                                {
                                    GLF_live15res += texture(GLF_live15tex, GLF_live15coord + vec2(float(GLF_live15i - 1) * GLF_live15uvstep, float(GLF_live15j - 1) * GLF_live15uvstep)) * GLF_live15weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15i * 3 + GLF_live15j, 9)];
                                }
                            }
                        }
                    }
                }
            }
            GLF_live14baseIndex = GLF_live14tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14baseIndex, 10)].leftIndex;
            ;
        }
    }
    {
        vec2 GLF_live15coord = _GLF_FUZZED(vec2(-9641.0858, -2220.3605));
        if (_GLF_DEAD(false)) {
            return;
        }
        {
            float GLF_live19limit = _GLF_FUZZED(-7.5);
            float GLF_live19ref = _GLF_FUZZED(-20.40);
            float GLF_live19s = _GLF_FUZZED(-964.033);
            {
                int GLF_live19looplimiter0 = 0;
                for (int GLF_live19i = 1; GLF_live19i < 800; GLF_live19i++) {
                    if (GLF_live19looplimiter0 >= 3) {
                        break;
                    }
                    GLF_live19looplimiter0++;
                    {
                        if (mod(float(GLF_live19i), GLF_live19ref) <= 0.01) {
                            GLF_live19s += 0.2;
                        }
                        if (float(GLF_live19i) >= GLF_live19limit) {
                            ;
                        }
                    }
                }
            }
        }
        int GLF_live15i = _GLF_FUZZED(30440);
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            return;
        }
        int GLF_live15j = _GLF_FUZZED((25075 - 42686));
        int GLF_live15looplimiter0 = 0;
        vec4 GLF_live15res = _GLF_FUZZED(vec3(1.7, -4790.3408, -7.9).ssst);
        float GLF_live15uvstep = _GLF_FUZZED(-9950.1551);
        {
            if (GLF_live15looplimiter0 >= 5) {
                ;
            }
            GLF_live15looplimiter0++;
            {
                {
                    ;
                }
            }
            {
                GLF_live15res += texture(GLF_live15tex, GLF_live15coord + vec2(float(GLF_live15i - 1) * GLF_live15uvstep, float(GLF_live15j - 1) * GLF_live15uvstep)) * GLF_live15weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15i * 3 + GLF_live15j, 9)];
            }
        }
    }
    if (_GLF_DEAD(false)) {
        return;
        if (_GLF_DEAD(false)) {
            return;
            {
                ivec2 GLF_live18p = _GLF_FUZZED(ivec2(-75443, -2417).rr);
                {
                    GLF_live18p.y++;
                    if (_GLF_DEAD(false)) {
                        return;
                    }
                }
            }
        }
        {
            {
                ;
                if (_GLF_DEAD(false)) {
                    return;
                }
            }
        }
        {
            int GLF_live5looplimiter4 = 0;
            if (GLF_live5looplimiter4 >= 4) {
                ;
            }
            {
                vec2 GLF_live16coord = _GLF_FUZZED((vec2(-5.6, 554.460) * mat2(3.8)));
                if (GLF_live16coord.x > 1.0)
                    GLF_live16coord.x -= 1.0;
            }
            if (_GLF_DEAD(false)) {
                return;
            }
        }
    }
    int msb16 = 65536;
    {
        int GLF_live9count = _GLF_FUZZED(-17330);
        {
            {
                ;
                if (_GLF_DEAD(false)) {
                    return;
                }
            }
        }
        {
            GLF_live9count++;
        }
    }
    {
        int GLF_live3i = _GLF_FUZZED((82444 + (-79915)));
        {
            vec2 GLF_live15coord = _GLF_FUZZED(vec3(8580.1160, 1252.7947, -418.904).gr);
            int GLF_live15looplimiter1 = 0;
            vec4 GLF_live15res = _GLF_FUZZED(vec4(-7.1, -50.77, 0.9, 41.40));
            float GLF_live15uvstep = _GLF_FUZZED((false ? 38.44 : vec4(-0.7, -9.1, -2.5, -34.18).w));
            for (int GLF_live15i = 0; GLF_live15i < 3; GLF_live15i++) {
                if (GLF_live15looplimiter1 >= 5) {
                    break;
                }
                GLF_live15looplimiter1++;
                {
                    {
                        {
                            int GLF_live20iterationCap = _GLF_FUZZED((34251 * 15320));
                            if (0.0 > GLF_live20resolution.y) {
                                GLF_live20iterationCap += 1;
                            }
                        }
                        int GLF_live15looplimiter0 = 0;
                        for (int GLF_live15j = 0; GLF_live15j < 3; GLF_live15j++) {
                            if (GLF_live15looplimiter0 >= 5) {
                                break;
                            }
                            GLF_live15looplimiter0++;
                            if (_GLF_DEAD(false)) {
                                discard;
                            }
                            {
                                GLF_live15res += texture(GLF_live15tex, GLF_live15coord + vec2(float(GLF_live15i - 1) * GLF_live15uvstep, float(GLF_live15j - 1) * GLF_live15uvstep)) * GLF_live15weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15i * 3 + GLF_live15j, 9)];
                            }
                        }
                    }
                }
            }
        }
        float GLF_live3ref = _GLF_FUZZED(vec2(-997.500, -41.43).s);
        float GLF_live3s = _GLF_FUZZED((-5.5));
        {
            float GLF_live19limit = _GLF_FUZZED((false ? (-6.3) : (-0.7)));
            int GLF_live19looplimiter0 = 0;
            float GLF_live19ref = _GLF_FUZZED(-6.1);
            float GLF_live19s = _GLF_FUZZED((-(7337.6229)));
            for (int GLF_live19i = 1; GLF_live19i < 800; GLF_live19i++) {
                if (GLF_live19looplimiter0 >= 3) {
                    break;
                }
                GLF_live19looplimiter0++;
                {
                    if (mod(float(GLF_live19i), GLF_live19ref) <= 0.01) {
                        GLF_live19s += 0.2;
                    }
                    if (float(GLF_live19i) >= GLF_live19limit) {
                        ;
                    }
                }
            }
        }
        {
            {
                int GLF_live12cols = _GLF_FUZZED(int(77736u));
                uint GLF_live12matrix_number = _GLF_FUZZED((90550u ^ 113017u));
                {
                    int GLF_live12looplimiter2 = 0;
                    for (int GLF_live12rows = 2; GLF_live12rows <= 4; GLF_live12rows++) {
                        {
                            {
                                ;
                                {
                                    float GLF_live19s = _GLF_FUZZED((431.908 * vec4(5757.1167, 179.592, -0.1, 62.24)).w);
                                    {
                                        GLF_live19s += 0.2;
                                    }
                                }
                            }
                        }
                        if (GLF_live12looplimiter2 >= 6) {
                            break;
                        }
                        GLF_live12looplimiter2++;
                        {
                            if (_GLF_DEAD(false)) {
                                discard;
                            }
                            {
                                {
                                    {
                                        ;
                                    }
                                }
                                int GLF_live12looplimiter1 = 0;
                                for (int GLF_live12c = 0; GLF_live12c < GLF_live12cols; GLF_live12c++) {
                                    if (GLF_live12looplimiter1 >= 6) {
                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                            discard;
                                        }
                                        {
                                            ivec2 GLF_live18p = _GLF_FUZZED(ivec2(-10623, 99374));
                                            {
                                                GLF_live18p.x -= 16;
                                            }
                                        }
                                        break;
                                    }
                                    GLF_live12looplimiter1++;
                                    {
                                        {
                                            int GLF_live12looplimiter0 = 0;
                                            for (int GLF_live12r = 0; GLF_live12r < GLF_live12rows; GLF_live12r++) {
                                                if (GLF_live12looplimiter0 >= 6) {
                                                    break;
                                                }
                                                {
                                                    {
                                                        ;
                                                    }
                                                }
                                                {
                                                    {
                                                        ivec2 GLF_live18p = _GLF_FUZZED((+ivec2(58137, 89958)));
                                                        {
                                                            GLF_live18p.x = -GLF_live18p.x;
                                                        }
                                                    }
                                                    if (_GLF_DEAD(false)) {
                                                        break;
                                                    }
                                                    vec2 GLF_live16coord = _GLF_FUZZED(vec2(7.1, 2936.8840));
                                                    vec4 GLF_live16res = _GLF_FUZZED((vec4(-3.0, -59.03, -32.39, 9.4) - vec4(-5892.1676, 21.85, -2.6, 55.73)));
                                                    {
                                                        GLF_live16res = texture(GLF_live16tex, GLF_live16coord);
                                                    }
                                                }
                                                GLF_live12looplimiter0++;
                                                {
                                                    switch (GLF_live12matrix_number) {
                                                        case 0u:
                                                            {
                                                                vec2 GLF_live16coord = _GLF_FUZZED((89.75 - ((-25.32) * vec2(-3017.7690, 8004.9439))));
                                                                int GLF_live16i = _GLF_FUZZED(-43882);
                                                                int GLF_live16looplimiter0 = 0;
                                                                {
                                                                    if (GLF_live16looplimiter0 >= 7) {
                                                                        ;
                                                                    }
                                                                    GLF_live16looplimiter0++;
                                                                    {
                                                                        {
                                                                            {
                                                                                ;
                                                                            }
                                                                        }
                                                                        if (GLF_live16coord.x > 1.0) {
                                                                            {
                                                                                {
                                                                                    ;
                                                                                }
                                                                            }
                                                                            GLF_live16coord.x -= 1.0;
                                                                        }
                                                                        if (GLF_live16coord.y > 1.0)
                                                                            GLF_live16coord.y -= 1.0;
                                                                        GLF_live16coord *= 2.0;
                                                                        GLF_live16i++;
                                                                    }
                                                                }
                                                            }
                                                            GLF_live12m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live12r, 2)] = GLF_live12one;
                                                            break;
                                                        case 1u:
                                                            {
                                                                {
                                                                    ivec2 GLF_live18p = _GLF_FUZZED(ivec2(10986, -67321));
                                                                    if (GLF_live18p.x > 0) {
                                                                        GLF_live18p.y--;
                                                                    }
                                                                }
                                                                vec2 GLF_live15coord = _GLF_FUZZED(vec2(2664.1056, 2.0));
                                                                {
                                                                    ivec2 GLF_live18p = _GLF_FUZZED(ivec2(33190, -32887));
                                                                    if (GLF_live18p.x < 0) {
                                                                        GLF_live18p.y++;
                                                                    }
                                                                }
                                                                int GLF_live15i = _GLF_FUZZED(47771);
                                                                int GLF_live15j = _GLF_FUZZED((true ? (-77669) : (-34296)));
                                                                vec4 GLF_live15res = _GLF_FUZZED(vec4(87.52, -3.4, -875.426, -54.57));
                                                                float GLF_live15uvstep = _GLF_FUZZED(-17.24);
                                                                {
                                                                    GLF_live15res += texture(GLF_live15tex, GLF_live15coord + vec2(float(GLF_live15i - 1) * GLF_live15uvstep, float(GLF_live15j - 1) * GLF_live15uvstep)) * GLF_live15weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15i * 3 + GLF_live15j, 9)];
                                                                }
                                                            }
                                                            GLF_live12m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live12r, 3)] = GLF_live12one;
                                                            break;
                                                            {
                                                                vec2 GLF_live15coord = _GLF_FUZZED(((vec2(-6.2, 4.0) + vec3(-33.09, -4941.0537, 80.87).br) * vec2(-9.9, 6441.2446)));
                                                                vec4 GLF_live15res = _GLF_FUZZED((vec4(-5638.0475, 5904.4473, 3013.3384, 1060.1494) + 95.06));
                                                                float GLF_live15uvstep = _GLF_FUZZED(-1520.0247);
                                                                {
                                                                    int GLF_live15looplimiter1 = 0;
                                                                    for (int GLF_live15i = 0; GLF_live15i < 3; GLF_live15i++) {
                                                                        if (GLF_live15looplimiter1 >= 5) {
                                                                            break;
                                                                        }
                                                                        GLF_live15looplimiter1++;
                                                                        {
                                                                            {
                                                                                int GLF_live15looplimiter0 = 0;
                                                                                for (int GLF_live15j = 0; GLF_live15j < 3; GLF_live15j++) {
                                                                                    if (GLF_live15looplimiter0 >= 5) {
                                                                                        break;
                                                                                    }
                                                                                    GLF_live15looplimiter0++;
                                                                                    {
                                                                                        ivec2 GLF_live18p = _GLF_FUZZED(ivec2(29585, 79601));
                                                                                        {
                                                                                            GLF_live18p.x = -GLF_live18p.x;
                                                                                        }
                                                                                    }
                                                                                    {
                                                                                        GLF_live15res += texture(GLF_live15tex, GLF_live15coord + vec2(float(GLF_live15i - 1) * GLF_live15uvstep, float(GLF_live15j - 1) * GLF_live15uvstep)) * GLF_live15weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15i * 3 + GLF_live15j, 9)];
                                                                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                                                            break;
                                                                                        }
                                                                                    }
                                                                                }
                                                                            }
                                                                        }
                                                                        {
                                                                            float GLF_live20xCoord = _GLF_FUZZED(vec3(7704.7399, 1329.0560, 6379.2578).s);
                                                                            float GLF_live20yCoord = _GLF_FUZZED(-3325.8006);
                                                                            {
                                                                                ;
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        case 2u:
                                                            GLF_live12m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live12r, 4)] = GLF_live12one;
                                                            break;
                                                        case 3u:
                                                            GLF_live12m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live12r, 2)] = GLF_live12one;
                                                            break;
                                                        case 4u:
                                                            GLF_live12m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live12r, 3)] = GLF_live12one;
                                                            break;
                                                        case 5u:
                                                            GLF_live12m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live12r, 4)] = GLF_live12one;
                                                            if (_GLF_DEAD(false)) {
                                                                break;
                                                            }
                                                            {
                                                                vec2 GLF_live15coord = _GLF_FUZZED(vec2(-7.3, 950.616));
                                                                int GLF_live15i = _GLF_FUZZED((77068 * (-94580)));
                                                                int GLF_live15looplimiter0 = 0;
                                                                vec4 GLF_live15res = _GLF_FUZZED(vec4(6.4, -6.5, -3754.7184, 9.0));
                                                                {
                                                                    ivec2 GLF_live18p = _GLF_FUZZED((22529 - ivec2(16993, 31963)));
                                                                    {
                                                                        GLF_live18p.x = -GLF_live18p.x;
                                                                    }
                                                                }
                                                                if (_GLF_DEAD(false)) {
                                                                    discard;
                                                                }
                                                                float GLF_live15uvstep = _GLF_FUZZED(-486.033);
                                                                for (int GLF_live15j = 0; GLF_live15j < 3; GLF_live15j++) {
                                                                    if (GLF_live15looplimiter0 >= 5) {
                                                                        if (_GLF_DEAD(false)) {
                                                                            break;
                                                                        }
                                                                        {
                                                                            vec4 GLF_live19c = _GLF_FUZZED(vec4(8.7, -8.9, -558.996, -96.76));
                                                                            int GLF_live19looplimiter1 = 0;
                                                                            for (int GLF_live19i = 0; GLF_live19i < 3; GLF_live19i++) {
                                                                                if (GLF_live19looplimiter1 >= 3) {
                                                                                    break;
                                                                                }
                                                                                GLF_live19looplimiter1++;
                                                                                {
                                                                                    if (GLF_live19c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i, 4)] >= 1.0) {
                                                                                        GLF_live19c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i, 4)] = GLF_live19c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i, 4)] * GLF_live19c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i, 4)];
                                                                                    }
                                                                                }
                                                                            }
                                                                        }
                                                                        break;
                                                                    }
                                                                    GLF_live15looplimiter0++;
                                                                    {
                                                                        GLF_live15res += texture(GLF_live15tex, GLF_live15coord + vec2(float(GLF_live15i - 1) * GLF_live15uvstep, float(GLF_live15j - 1) * GLF_live15uvstep)) * GLF_live15weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15i * 3 + GLF_live15j, 9)];
                                                                    }
                                                                }
                                                                {
                                                                    ivec2 GLF_live18p = _GLF_FUZZED(ivec2(-5534, -61187));
                                                                    {
                                                                        GLF_live18p.y++;
                                                                    }
                                                                }
                                                            }
                                                            if (_GLF_DEAD(false)) {
                                                                break;
                                                                {
                                                                    ivec2 GLF_live18p = _GLF_FUZZED(ivec2(-85929, -70205));
                                                                    if (GLF_live18p.x > 0) {
                                                                        GLF_live18p.y--;
                                                                    }
                                                                }
                                                                {
                                                                    vec2 GLF_live16coord = _GLF_FUZZED(vec2(9.2, 759.693));
                                                                    vec4 GLF_live16res = _GLF_FUZZED(vec4(88.71, -88.47, -436.634, -593.622));
                                                                    {
                                                                        {
                                                                            {
                                                                                ;
                                                                                if (_GLF_DEAD(false)) {
                                                                                    return;
                                                                                }
                                                                            }
                                                                        }
                                                                        GLF_live16res = texture(GLF_live16tex, GLF_live16coord);
                                                                    }
                                                                }
                                                            }
                                                            break;
                                                        case 6u:
                                                            GLF_live12m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live12r, 2)] = GLF_live12one;
                                                            break;
                                                        case 7u:
                                                            GLF_live12m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live12r, 3)] = GLF_live12one;
                                                            break;
                                                        case 8u:
                                                            GLF_live12m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live12r, 4)] = GLF_live12one;
                                                            break;
                                                            if (_GLF_DEAD(false)) {
                                                                return;
                                                            }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    {
                                        vec2 GLF_live15coord = _GLF_FUZZED(vec2(2.4, -5930.0438));
                                        int GLF_live15i = _GLF_FUZZED(-58460);
                                        vec4 GLF_live15res = _GLF_FUZZED(vec4(vec2(65.50, -1245.2853), -5.5, -764.494));
                                        float GLF_live15uvstep = _GLF_FUZZED(-738.932);
                                        {
                                            int GLF_live15looplimiter0 = 0;
                                            for (int GLF_live15j = 0; GLF_live15j < 3; GLF_live15j++) {
                                                if (GLF_live15looplimiter0 >= 5) {
                                                    break;
                                                }
                                                GLF_live15looplimiter0++;
                                                {
                                                    GLF_live15res += texture(GLF_live15tex, GLF_live15coord + vec2(float(GLF_live15i - 1) * GLF_live15uvstep, float(GLF_live15j - 1) * GLF_live15uvstep)) * GLF_live15weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15i * 3 + GLF_live15j, 9)];
                                                    {
                                                        ivec2 GLF_live18p = _GLF_FUZZED(ivec2(91145, 80687));
                                                        if (GLF_live18p.x < 0) {
                                                            GLF_live18p.y++;
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                                {
                                    {
                                        ;
                                        {
                                            vec4 GLF_live19c = _GLF_FUZZED(vec4(-0.5, -258.585, -2.9, -9.1));
                                            int GLF_live19looplimiter1 = 0;
                                            for (int GLF_live19i = 0; GLF_live19i < 3; GLF_live19i++) {
                                                if (GLF_live19looplimiter1 >= 3) {
                                                    break;
                                                }
                                                GLF_live19looplimiter1++;
                                                {
                                                    if (GLF_live19c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i, 4)] >= 1.0) {
                                                        GLF_live19c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i, 4)] = GLF_live19c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i, 4)] * GLF_live19c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i, 4)];
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    if (_GLF_DEAD(false)) {
                                        discard;
                                    }
                                }
                            }
                            GLF_live12matrix_number = GLF_live12matrix_number + 1u;
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
                    }
                }
            }
            {
                vec2 GLF_live16coord = _GLF_FUZZED((true ? ((vec2(-4.4, 7513.0011) * vec2(9.1, 876.074)) - vec2(-4.7, 272.593)) : vec2(-27.65)));
                vec4 GLF_live16res = _GLF_FUZZED(vec4(-70.32, 44.38, -67.48, 8.9));
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    return;
                }
                {
                    GLF_live16res = texture(GLF_live16tex, GLF_live16coord);
                }
            }
            {
                {
                    int GLF_live18looplimiter0 = 0;
                    if (GLF_live18looplimiter0 >= 7) {
                        ;
                    }
                }
                {
                    vec2 GLF_live16coord = _GLF_FUZZED(vec2(-8.4, 4.1));
                    if (GLF_live16coord.y > 1.0) {
                        {
                            {
                                ;
                            }
                        }
                        GLF_live16coord.y -= 1.0;
                    }
                }
                ;
            }
        }
        if (mod(float(GLF_live3i), GLF_live3ref) <= 0.01) {
            GLF_live3s += 0.2;
            if (_GLF_DEAD(false)) {
                return;
                if (_GLF_DEAD(false)) {
                    return;
                    {
                        vec2 GLF_live16coord = _GLF_FUZZED(vec2(-140.860, 73.48));
                        if (GLF_live16coord.y > 1.0)
                            GLF_live16coord.y -= 1.0;
                    }
                }
            }
            {
                int GLF_live21c_im = _GLF_FUZZED(9781);
                int GLF_live21c_re = _GLF_FUZZED((ivec3(-7447, -3969, 6918) + 68603).r);
                int GLF_live21iteration = _GLF_FUZZED((67217 * (-56483)));
                int GLF_live21looplimiter0 = 0;
                int GLF_live21x = _GLF_FUZZED(-39658);
                int GLF_live21y = _GLF_FUZZED(-69995);
                for (int GLF_live21k = 0; GLF_live21k < 1000; GLF_live21k++) {
                    if (GLF_live21looplimiter0 >= 3) {
                        break;
                    }
                    GLF_live21looplimiter0++;
                    {
                        if (GLF_live21x * GLF_live21x + GLF_live21y * GLF_live21y > 262144) {
                            break;
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                return;
                            }
                        }
                        int GLF_live21x_new = ((GLF_live21x * GLF_live21x - GLF_live21y * GLF_live21y) / 256 + GLF_live21c_re);
                        GLF_live21y = (2 * GLF_live21x * GLF_live21y / 256 + GLF_live21c_im);
                        GLF_live21x = GLF_live21x_new;
                        GLF_live21iteration++;
                    }
                }
            }
        }
        {
            int GLF_live6count = _GLF_FUZZED((~(-51682)));
            {
                {
                    ;
                }
            }
            int GLF_live6looplimiter0 = 0;
            int GLF_live6v = _GLF_FUZZED(64716);
            if (_GLF_DEAD(false)) {
                return;
                if (_GLF_DEAD(false)) {
                    return;
                }
                if (_GLF_DEAD(false)) {
                    {
                        int GLF_live21x = _GLF_FUZZED(16270);
                        int GLF_live21y = _GLF_FUZZED(10943);
                        if (GLF_live21x * GLF_live21x + GLF_live21y * GLF_live21y > 262144) {
                            ;
                        }
                    }
                    return;
                }
            }
            {
                {
                    ;
                }
                {
                    vec4 GLF_live19c = _GLF_FUZZED(vec4(25.70, 2.2, -6.8, 55.50));
                    int GLF_live19i = _GLF_FUZZED(80759);
                    if (GLF_live19c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i, 4)] >= 1.0) {
                        GLF_live19c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i, 4)] = GLF_live19c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i, 4)] * GLF_live19c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i, 4)];
                    }
                }
            }
            {
                {
                    ;
                    {
                        vec2 GLF_live16coord = _GLF_FUZZED(vec2(-8108.0034, -13.27));
                        int GLF_live16i = _GLF_FUZZED((~(true ? int(true) : (-78624))));
                        int GLF_live16looplimiter0 = 0;
                        while (GLF_live16i < 1 && GLF_live16coord.x > 1.0 || GLF_live16coord.y > 1.0) {
                            if (GLF_live16looplimiter0 >= 7) {
                                break;
                            }
                            GLF_live16looplimiter0++;
                            {
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                    return;
                                }
                                if (GLF_live16coord.x > 1.0)
                                    GLF_live16coord.x -= 1.0;
                                if (GLF_live16coord.y > 1.0)
                                    GLF_live16coord.y -= 1.0;
                                GLF_live16coord *= 2.0;
                                GLF_live16i++;
                            }
                        }
                    }
                }
            }
            if (_GLF_DEAD(false)) {
                return;
            }
            {
                {
                    vec4 GLF_live19c = _GLF_FUZZED(vec4(-81.63, -456.615, 397.768, -4.3));
                    {
                        int GLF_live19looplimiter1 = 0;
                        for (int GLF_live19i = 0; GLF_live19i < 3; GLF_live19i++) {
                            if (GLF_live19looplimiter1 >= 3) {
                                break;
                            }
                            GLF_live19looplimiter1++;
                            {
                                if (GLF_live19c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i, 4)] >= 1.0) {
                                    GLF_live19c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i, 4)] = GLF_live19c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i, 4)] * GLF_live19c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i, 4)];
                                }
                            }
                        }
                    }
                }
                if (GLF_live6looplimiter0 >= 5) {
                    ;
                }
                {
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        return;
                    }
                    int GLF_live9baseIndex = _GLF_FUZZED(56543);
                    int GLF_live9data = _GLF_FUZZED(97406);
                    int GLF_live9treeIndex = _GLF_FUZZED((+54745));
                    if (GLF_live9tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9baseIndex, 10)].rightIndex == -1) {
                        GLF_live9tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9baseIndex, 10)].rightIndex = GLF_live9treeIndex;
                        GLF_live9makeTreeNode(GLF_live9tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9treeIndex, 10)], GLF_live9data);
                        ;
                    } else {
                        GLF_live9baseIndex = GLF_live9tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9baseIndex, 10)].rightIndex;
                        ;
                    }
                    if (_GLF_DEAD(false)) {
                        return;
                    }
                }
                GLF_live6looplimiter0++;
                {
                    {
                        int GLF_live21looplimiter2 = 0;
                        if (GLF_live21looplimiter2 >= 3) {
                            ;
                        }
                    }
                    if ((GLF_live6v & 1) == 1) {
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            return;
                        }
                        {
                            {
                                int GLF_live18looplimiter0 = 0;
                                ivec2 GLF_live18p = _GLF_FUZZED((41058 + ivec2(-36705, -32840)));
                                {
                                    if (GLF_live18looplimiter0 >= 7) {
                                        ;
                                    }
                                    GLF_live18looplimiter0++;
                                    {
                                        GLF_live18p = GLF_live18iter(GLF_live18p);
                                    }
                                }
                            }
                            {
                                int GLF_live12c = _GLF_FUZZED((-(-39234)));
                                uint GLF_live12matrix_number = _GLF_FUZZED(14732u);
                                int GLF_live12r = _GLF_FUZZED(((-31566) - (-27492)));
                                {
                                    switch (GLF_live12matrix_number) {
                                        case 0u:
                                            GLF_live12m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live12r, 2)] = GLF_live12one;
                                            break;
                                            {
                                                {
                                                    ;
                                                }
                                            }
                                        case 1u:
                                            GLF_live12m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live12r, 3)] = GLF_live12one;
                                            break;
                                        case 2u:
                                            GLF_live12m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live12r, 4)] = GLF_live12one;
                                            break;
                                        case 3u:
                                            GLF_live12m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live12r, 2)] = GLF_live12one;
                                            break;
                                        case 4u:
                                            {
                                                vec2 GLF_live16coord = _GLF_FUZZED(vec2(-2.7, 87.03));
                                                int GLF_live16i = _GLF_FUZZED(-61640);
                                                {
                                                    int GLF_live20looplimiter0 = 0;
                                                    if (GLF_live20looplimiter0 >= 3) {
                                                        ;
                                                    }
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                        return;
                                                    }
                                                }
                                                int GLF_live16looplimiter0 = 0;
                                                while (GLF_live16i < 1 && GLF_live16coord.x > 1.0 || GLF_live16coord.y > 1.0) {
                                                    {
                                                        int GLF_live19i = _GLF_FUZZED(((ivec4(71622, -50292, -41596, 84622) * 97436) + ivec4(96101, -766, 96463, 67866)).z);
                                                        float GLF_live19limit = _GLF_FUZZED((+75.61));
                                                        int GLF_live19looplimiter0 = 0;
                                                        float GLF_live19ref = _GLF_FUZZED(-189.048);
                                                        float GLF_live19s = _GLF_FUZZED(9551.9251);
                                                        {
                                                            if (GLF_live19looplimiter0 >= 3) {
                                                                ;
                                                            }
                                                            GLF_live19looplimiter0++;
                                                            {
                                                                if (mod(float(GLF_live19i), GLF_live19ref) <= 0.01) {
                                                                    GLF_live19s += 0.2;
                                                                }
                                                                if (float(GLF_live19i) >= GLF_live19limit) {
                                                                    ;
                                                                }
                                                            }
                                                        }
                                                    }
                                                    if (GLF_live16looplimiter0 >= 7) {
                                                        break;
                                                    }
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                        discard;
                                                    }
                                                    GLF_live16looplimiter0++;
                                                    {
                                                        if (GLF_live16coord.x > 1.0)
                                                            GLF_live16coord.x -= 1.0;
                                                        if (GLF_live16coord.y > 1.0)
                                                            GLF_live16coord.y -= 1.0;
                                                        GLF_live16coord *= 2.0;
                                                        {
                                                            {
                                                                ;
                                                            }
                                                        }
                                                        GLF_live16i++;
                                                        if (_GLF_DEAD(false)) {
                                                            return;
                                                        }
                                                        {
                                                            int GLF_live20iterationCap = _GLF_FUZZED(27087);
                                                            if (0.0 > GLF_live20resolution.y) {
                                                                GLF_live20iterationCap += 1;
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                            GLF_live12m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live12r, 3)] = GLF_live12one;
                                            break;
                                            {
                                                vec2 GLF_live15coord = _GLF_FUZZED((vec2(-57.22, -62.40) + 864.247));
                                                int GLF_live15i = _GLF_FUZZED(-25002);
                                                int GLF_live15looplimiter1 = 0;
                                                vec4 GLF_live15res = _GLF_FUZZED(vec4(534.769, -793.725, -5719.8735, -2.7));
                                                float GLF_live15uvstep = _GLF_FUZZED(1.9);
                                                {
                                                    if (GLF_live15looplimiter1 >= 5) {
                                                        {
                                                            int GLF_live20iteration = _GLF_FUZZED(ivec2(48357, 52931).t);
                                                            {
                                                                ;
                                                            }
                                                        }
                                                        ;
                                                        {
                                                            float GLF_live20c_im = _GLF_FUZZED(-3.2);
                                                            float GLF_live20c_re = _GLF_FUZZED(vec2(-9.0, -46.87).x);
                                                            int GLF_live20iteration = _GLF_FUZZED(int(171196u));
                                                            int GLF_live20iterationCap = _GLF_FUZZED(-29575);
                                                            int GLF_live20k = _GLF_FUZZED(ivec4(-88404, 82114, -44257, -87680).s);
                                                            int GLF_live20looplimiter0 = 0;
                                                            float GLF_live20x = _GLF_FUZZED(((false ? false : false) ? 2.2 : (-172.449)));
                                                            float GLF_live20y = _GLF_FUZZED(-745.228);
                                                            do {
                                                                if (GLF_live20looplimiter0 >= 3) {
                                                                    break;
                                                                }
                                                                GLF_live20looplimiter0++;
                                                                {
                                                                    if (GLF_live20x * GLF_live20x + GLF_live20y * GLF_live20y > 4.0) {
                                                                        break;
                                                                    }
                                                                    float GLF_live20x_new = GLF_live20x * GLF_live20x - GLF_live20y * GLF_live20y + GLF_live20c_re;
                                                                    GLF_live20y = 2.0 * GLF_live20x * GLF_live20y + GLF_live20c_im;
                                                                    if (_GLF_DEAD(false)) {
                                                                        return;
                                                                    }
                                                                    GLF_live20x = GLF_live20x_new;
                                                                    GLF_live20iteration++;
                                                                    GLF_live20k++;
                                                                }
                                                            } while (GLF_live20k < bitfieldInsert(GLF_live20iterationCap + (257.0 > GLF_live20resolution.y ? 1 : 0), 0, 0, 0));
                                                        }
                                                    }
                                                    GLF_live15looplimiter1++;
                                                    {
                                                        {
                                                            int GLF_live15looplimiter0 = 0;
                                                            for (int GLF_live15j = 0; GLF_live15j < 3; GLF_live15j++) {
                                                                if (GLF_live15looplimiter0 >= 5) {
                                                                    break;
                                                                }
                                                                GLF_live15looplimiter0++;
                                                                {
                                                                    GLF_live15res += texture(GLF_live15tex, GLF_live15coord + vec2(float(GLF_live15i - 1) * GLF_live15uvstep, float(GLF_live15j - 1) * GLF_live15uvstep)) * GLF_live15weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15i * 3 + GLF_live15j, 9)];
                                                                }
                                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                                    continue;
                                                                }
                                                            }
                                                        }
                                                        {
                                                            {
                                                                ;
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        case 5u:
                                            {
                                                {
                                                    float GLF_live19s = _GLF_FUZZED(float(-21672));
                                                    {
                                                        GLF_live19s += 0.2;
                                                    }
                                                }
                                                vec2 GLF_live15coord = _GLF_FUZZED(vec4(-4.2, -4.7, (-(-7.1)), -84.37).xx);
                                                int GLF_live15looplimiter1 = 0;
                                                vec4 GLF_live15res = _GLF_FUZZED(vec4(3.5, 3.1, 2.5, -302.454));
                                                float GLF_live15uvstep = _GLF_FUZZED((vec2(1453.9245, -4.1).x - (-72.56)));
                                                for (int GLF_live15i = 0; GLF_live15i < 3; GLF_live15i++) {
                                                    if (GLF_live15looplimiter1 >= 5) {
                                                        break;
                                                    }
                                                    GLF_live15looplimiter1++;
                                                    {
                                                        {
                                                            int GLF_live15looplimiter0 = 0;
                                                            for (int GLF_live15j = 0; GLF_live15j < 3; GLF_live15j++) {
                                                                if (GLF_live15looplimiter0 >= 5) {
                                                                    break;
                                                                }
                                                                GLF_live15looplimiter0++;
                                                                {
                                                                    GLF_live15res += texture(GLF_live15tex, GLF_live15coord + vec2(float(GLF_live15i - 1) * GLF_live15uvstep, float(GLF_live15j - 1) * GLF_live15uvstep)) * GLF_live15weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15i * 3 + GLF_live15j, 9)];
                                                                }
                                                            }
                                                            {
                                                                ivec2 GLF_live18p = _GLF_FUZZED(ivec2(-7897, -5879));
                                                                {
                                                                    GLF_live18p.y--;
                                                                }
                                                            }
                                                        }
                                                    }
                                                    {
                                                        if (_GLF_DEAD(false)) {
                                                            return;
                                                        }
                                                        int GLF_live19i = _GLF_FUZZED(((-92284) - 79373));
                                                        float GLF_live19limit = _GLF_FUZZED((3.0 * float(-91146)));
                                                        float GLF_live19s = _GLF_FUZZED((+8.8));
                                                        if (float(GLF_live19i) >= GLF_live19limit) {
                                                            ;
                                                        }
                                                    }
                                                }
                                            }
                                            {
                                                int GLF_live21iteration = _GLF_FUZZED(((-44254) ^ 30617));
                                                {
                                                    if (_GLF_DEAD(false)) {
                                                        return;
                                                    }
                                                    ;
                                                    if (_GLF_DEAD(false)) {
                                                        return;
                                                    }
                                                }
                                            }
                                            GLF_live12m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live12r, 4)] = GLF_live12one;
                                            break;
                                        case 6u:
                                            GLF_live12m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live12r, 2)] = GLF_live12one;
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_ZERO(0.0, injectionSwitch.x))))) {
                                                return;
                                            }
                                            break;
                                        case 7u:
                                            GLF_live12m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live12r, 3)] = GLF_live12one;
                                            break;
                                        case 8u:
                                            GLF_live12m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live12r, 4)] = GLF_live12one;
                                            break;
                                    }
                                }
                            }
                            if (_GLF_DEAD(false)) {
                                {
                                    int GLF_live21x = _GLF_FUZZED(47900);
                                    int GLF_live21y = _GLF_FUZZED(13175);
                                    if (GLF_live21x * GLF_live21x + GLF_live21y * GLF_live21y > 262144) {
                                        ;
                                        if (_GLF_DEAD(false)) {
                                            return;
                                        }
                                    }
                                }
                                return;
                            }
                            int GLF_live9baseIndex = _GLF_FUZZED((26897 | ivec4(-16071, -64171, 12777, 55898).y));
                            int GLF_live9data = _GLF_FUZZED(35946);
                            int GLF_live9treeIndex = _GLF_FUZZED(-10957);
                            {
                                {
                                    int GLF_live14count = _GLF_FUZZED(((77022 ^ 33543) - ivec4(65106, 45194, 4280, -60499).g));
                                    int GLF_live14i = _GLF_FUZZED(4461);
                                    {
                                        int GLF_live14result = GLF_live14search(GLF_live14i);
                                        switch (GLF_live14i) {
                                            case 9:
                                            case 5:
                                            case 12:
                                                {
                                                    int GLF_live15looplimiter1 = 0;
                                                    if (GLF_live15looplimiter1 >= 5) {
                                                        ;
                                                    }
                                                }
                                            case 15:
                                            case 7:
                                            case 8:
                                            case 2:
                                                {
                                                    vec2 GLF_live15coord = _GLF_FUZZED((vec2(8.7, -8391.7230) + (mat3x2(-43.48, -1.5, -5875.1805, 6152.5261, 2.5, -69.96) * vec3(-2.4, -41.66, 59.08))));
                                                    vec4 GLF_live15res = _GLF_FUZZED(vec4(vec2(3.7, 649.160), vec2(262.313, -7919.2054)));
                                                    float GLF_live15uvstep = _GLF_FUZZED(-6705.5963);
                                                    {
                                                        int GLF_live15looplimiter1 = 0;
                                                        for (int GLF_live15i = 0; GLF_live15i < 3; GLF_live15i++) {
                                                            if (GLF_live15looplimiter1 >= 5) {
                                                                break;
                                                            }
                                                            GLF_live15looplimiter1++;
                                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < _GLF_IDENTITY(dot(vec2(0.0, 1.0), vec2(_GLF_ONE(1.0, injectionSwitch.y), 0.0)), dot(vec2(0.0, 1.0), vec2(_GLF_ONE(1.0, injectionSwitch.y), 0.0))))))) {
                                                                continue;
                                                            }
                                                            {
                                                                {
                                                                    ;
                                                                }
                                                            }
                                                            {
                                                                {
                                                                    int GLF_live15looplimiter0 = 0;
                                                                    for (int GLF_live15j = 0; GLF_live15j < 3; GLF_live15j++) {
                                                                        if (GLF_live15looplimiter0 >= 5) {
                                                                            {
                                                                                int GLF_live18looplimiter1 = 0;
                                                                                ivec2 GLF_live18p = _GLF_FUZZED((ivec2(-1918, -49131) & ivec2(31081, 4897)));
                                                                                {
                                                                                    if (GLF_live18looplimiter1 >= 7) {
                                                                                        ;
                                                                                    }
                                                                                    GLF_live18looplimiter1++;
                                                                                    {
                                                                                        GLF_live18p.x -= 16;
                                                                                    }
                                                                                }
                                                                            }
                                                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                                                return;
                                                                            }
                                                                            break;
                                                                        }
                                                                        GLF_live15looplimiter0++;
                                                                        {
                                                                            GLF_live15res += texture(GLF_live15tex, GLF_live15coord + vec2(float(GLF_live15i - 1) * GLF_live15uvstep, float(GLF_live15j - 1) * GLF_live15uvstep)) * GLF_live15weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15i * 3 + GLF_live15j, 9)];
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            case 6:
                                                {
                                                    int GLF_live21c_im = _GLF_FUZZED((46439 ^ (-52667)));
                                                    int GLF_live21c_re = _GLF_FUZZED(int(false));
                                                    int GLF_live21iteration = _GLF_FUZZED(int(105622u));
                                                    int GLF_live21looplimiter0 = 0;
                                                    int GLF_live21x = _GLF_FUZZED(-86928);
                                                    int GLF_live21y = _GLF_FUZZED(52854);
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                        return;
                                                    }
                                                    {
                                                        if (GLF_live21looplimiter0 >= 3) {
                                                            ;
                                                        }
                                                        if (_GLF_DEAD(false)) {
                                                            return;
                                                        }
                                                        GLF_live21looplimiter0++;
                                                        {
                                                            if (GLF_live21x * GLF_live21x + GLF_live21y * GLF_live21y > 262144) {
                                                                ;
                                                            }
                                                            int GLF_live21x_new = ((GLF_live21x * GLF_live21x - GLF_live21y * GLF_live21y) / 256 + GLF_live21c_re);
                                                            GLF_live21y = (2 * GLF_live21x * GLF_live21y / 256 + GLF_live21c_im);
                                                            GLF_live21x = GLF_live21x_new;
                                                            GLF_live21iteration++;
                                                        }
                                                    }
                                                }
                                            case 17:
                                                {
                                                    ivec2 GLF_live18p = _GLF_FUZZED(ivec3(-54882, 5873, -78763).pt);
                                                    {
                                                        GLF_live18p.x -= 16;
                                                    }
                                                }
                                                if (_GLF_DEAD(false)) {
                                                    return;
                                                }
                                                {
                                                    vec2 GLF_live15coord = _GLF_FUZZED((7.9 * (vec4(-15.72, 2.6, 48.32, -8.1).t * vec2(75.52, -83.23))));
                                                    vec4 GLF_live15res = _GLF_FUZZED(vec4(3.4, -0.8, 2453.6823, 2.4));
                                                    float GLF_live15uvstep = _GLF_FUZZED(((175672u == 24692u) ? 689.407 : 3.0));
                                                    {
                                                        int GLF_live15looplimiter1 = 0;
                                                        for (int GLF_live15i = 0; GLF_live15i < 3; GLF_live15i++) {
                                                            if (GLF_live15looplimiter1 >= 5) {
                                                                break;
                                                            }
                                                            GLF_live15looplimiter1++;
                                                            {
                                                                {
                                                                    {
                                                                        ivec2 GLF_live18p = _GLF_FUZZED(((ivec2(1802, -34115)) | 90347));
                                                                        if (GLF_live18p.x < 0) {
                                                                            GLF_live18p.y++;
                                                                        }
                                                                    }
                                                                    int GLF_live15looplimiter0 = 0;
                                                                    for (int GLF_live15j = 0; GLF_live15j < 3; GLF_live15j++) {
                                                                        if (GLF_live15looplimiter0 >= 5) {
                                                                            break;
                                                                        }
                                                                        GLF_live15looplimiter0++;
                                                                        {
                                                                            GLF_live15res += texture(GLF_live15tex, GLF_live15coord + vec2(float(GLF_live15i - 1) * GLF_live15uvstep, float(GLF_live15j - 1) * GLF_live15uvstep)) * GLF_live15weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15i * 3 + GLF_live15j, 9)];
                                                                        }
                                                                    }
                                                                }
                                                                {
                                                                    ivec2 GLF_live18p = _GLF_FUZZED(ivec2(6452, 79706));
                                                                    if (GLF_live18p.x < 0) {
                                                                        GLF_live18p.x = -GLF_live18p.x;
                                                                    }
                                                                }
                                                            }
                                                            {
                                                                int GLF_live20looplimiter3 = 0;
                                                                if (GLF_live20looplimiter3 >= 3) {
                                                                    ;
                                                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                                        return;
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
                                                }
                                            case 13:
                                                {
                                                    vec2 GLF_live15coord = _GLF_FUZZED(vec2(4.3, 3.6));
                                                    vec4 GLF_live15res = _GLF_FUZZED((((mat3x4(-71.74, 3952.4574, 1141.5094, -40.05, 507.389, -8.9, 0.5, -777.351, 8.9, 5048.2681, -8946.4144, 54.25) - (-261.582)) * vec3(68.24, -259.712, -9.5)) - vec3(31.27, 9215.9879, -2.6).b));
                                                    float GLF_live15uvstep = _GLF_FUZZED(((-2.6) * (-1.7)));
                                                    {
                                                        int GLF_live15looplimiter1 = 0;
                                                        if (_GLF_DEAD(false)) {
                                                            return;
                                                        }
                                                        for (int GLF_live15i = 0; GLF_live15i < 3; GLF_live15i++) {
                                                            if (GLF_live15looplimiter1 >= 5) {
                                                                break;
                                                            }
                                                            GLF_live15looplimiter1++;
                                                            {
                                                                {
                                                                    {
                                                                        int GLF_live19looplimiter1 = 0;
                                                                        if (_GLF_DEAD(false)) {
                                                                            discard;
                                                                        }
                                                                        if (GLF_live19looplimiter1 >= 3) {
                                                                            ;
                                                                        }
                                                                    }
                                                                    int GLF_live15looplimiter0 = 0;
                                                                    for (int GLF_live15j = 0; GLF_live15j < 3; GLF_live15j++) {
                                                                        if (GLF_live15looplimiter0 >= 5) {
                                                                            break;
                                                                        }
                                                                        GLF_live15looplimiter0++;
                                                                        {
                                                                            GLF_live15res += texture(GLF_live15tex, GLF_live15coord + vec2(float(GLF_live15i - 1) * GLF_live15uvstep, float(GLF_live15j - 1) * GLF_live15uvstep)) * GLF_live15weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15i * 3 + GLF_live15j, 9)];
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                                if (GLF_live14result == GLF_live14i) {
                                                    GLF_live14count++;
                                                }
                                                break;
                                            default:
                                                if (GLF_live14result == -1) {
                                                    GLF_live14count++;
                                                }
                                                break;
                                        }
                                        {
                                            {
                                                int GLF_live18looplimiter1 = 0;
                                                ivec2 GLF_live18p = _GLF_FUZZED(ivec2((~66645), -42404));
                                                while (GLF_live18p.x > 15) {
                                                    if (GLF_live18looplimiter1 >= 7) {
                                                        break;
                                                    }
                                                    GLF_live18looplimiter1++;
                                                    {
                                                        GLF_live18p.x -= 16;
                                                    }
                                                }
                                            }
                                            vec2 GLF_live15coord = _GLF_FUZZED(vec2(-5.0, 2119.7484));
                                            int GLF_live15i = _GLF_FUZZED(53762);
                                            int GLF_live15j = _GLF_FUZZED(-88068);
                                            int GLF_live15looplimiter0 = 0;
                                            vec4 GLF_live15res = _GLF_FUZZED(vec4(-7528.6748, (vec4(2267.8298, -3.0, -7.7, 3.6) * mat3x4(-147.343, -8.4, -8696.2642, 3357.2361, -2634.6519, 6.4, -88.23, 69.56, 475.642, 3051.6850, -110.668, -8.9))));
                                            float GLF_live15uvstep = _GLF_FUZZED((vec4(9188.7575, -9779.8925, 803.956, -16.91).r));
                                            {
                                                if (GLF_live15looplimiter0 >= 5) {
                                                    ;
                                                }
                                                GLF_live15looplimiter0++;
                                                {
                                                    GLF_live15res += texture(GLF_live15tex, GLF_live15coord + vec2(float(GLF_live15i - 1) * GLF_live15uvstep, float(GLF_live15j - 1) * GLF_live15uvstep)) * GLF_live15weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15i * 3 + GLF_live15j, 9)];
                                                }
                                                if (_GLF_DEAD(false)) {
                                                    return;
                                                }
                                            }
                                        }
                                    }
                                }
                                if (GLF_live9tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9baseIndex, 10)].rightIndex == -1) {
                                    GLF_live9tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9baseIndex, 10)].rightIndex = GLF_live9treeIndex;
                                    if (_GLF_DEAD(false)) {
                                        return;
                                    }
                                    {
                                        int GLF_live15looplimiter0 = 0;
                                        {
                                            float GLF_live20c_im = _GLF_FUZZED(772.788);
                                            float GLF_live20c_re = _GLF_FUZZED(float(104217u));
                                            if (_GLF_DEAD(false)) {
                                                return;
                                            }
                                            int GLF_live20iteration = _GLF_FUZZED((~10469));
                                            int GLF_live20k = _GLF_FUZZED(-11238);
                                            float GLF_live20x = _GLF_FUZZED(-6046.0810);
                                            float GLF_live20y = _GLF_FUZZED(float(-28693));
                                            {
                                                if (GLF_live20x * GLF_live20x + GLF_live20y * GLF_live20y > 4.0) {
                                                    ;
                                                }
                                                float GLF_live20x_new = GLF_live20x * GLF_live20x - GLF_live20y * GLF_live20y + GLF_live20c_re;
                                                GLF_live20y = 2.0 * GLF_live20x * GLF_live20y + GLF_live20c_im;
                                                GLF_live20x = GLF_live20x_new;
                                                GLF_live20iteration++;
                                                GLF_live20k++;
                                            }
                                        }
                                        if (GLF_live15looplimiter0 >= 5) {
                                            ;
                                        }
                                    }
                                    GLF_live9makeTreeNode(GLF_live9tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9treeIndex, 10)], GLF_live9data);
                                    ;
                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                        return;
                                    }
                                } else {
                                    GLF_live9baseIndex = GLF_live9tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9baseIndex, 10)].rightIndex;
                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                        return;
                                    }
                                    ;
                                }
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    return;
                                    if (_GLF_DEAD(false)) {
                                        return;
                                    }
                                }
                                {
                                    {
                                        GLF_live14_GLF_color = vec4(0.0, 0.0, 1.0, 1.0);
                                    }
                                }
                            }
                        }
                        GLF_live6v = 3 * GLF_live6v + 1;
                    } else {
                        GLF_live6v /= 2;
                    }
                    GLF_live6count++;
                    {
                        vec2 GLF_live15coord = _GLF_FUZZED(vec2(6.5, 8.5));
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            return;
                        }
                        int GLF_live15i = _GLF_FUZZED(65042);
                        int GLF_live15looplimiter1 = 0;
                        if (_GLF_DEAD(false)) {
                            return;
                        }
                        {
                            {
                                ;
                            }
                        }
                        vec4 GLF_live15res = _GLF_FUZZED((false ? vec4(5.0, -7.7, -8.5, -5.3) : vec4(5.2, -8.6, 1164.9764, -207.629)));
                        float GLF_live15uvstep = _GLF_FUZZED(7480.6836);
                        {
                            {
                                {
                                    ;
                                }
                            }
                            if (GLF_live15looplimiter1 >= 5) {
                                {
                                    ivec2 GLF_live18p = _GLF_FUZZED(ivec2(-75709, -70725));
                                    if (GLF_live18p.x > 0) {
                                        GLF_live18p.y--;
                                    }
                                }
                                ;
                            }
                            {
                                vec4 GLF_live19c = _GLF_FUZZED(vec4(vec3(-0.9, -6.0, -994.212).g));
                                int GLF_live19i = _GLF_FUZZED(48965);
                                {
                                    GLF_live19c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i, 4)] = GLF_live19c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i, 4)] * GLF_live19c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i, 4)];
                                }
                            }
                            GLF_live15looplimiter1++;
                            {
                                vec4 GLF_live19c = _GLF_FUZZED(vec4(-2.6, 1497.2830, 481.439, -5.5));
                                int GLF_live19i = _GLF_FUZZED(589);
                                {
                                    if (GLF_live19c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i, 4)] >= 1.0) {
                                        GLF_live19c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i, 4)] = GLF_live19c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i, 4)] * GLF_live19c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i, 4)];
                                    }
                                }
                            }
                            {
                                {
                                    int GLF_live15looplimiter0 = 0;
                                    for (int GLF_live15j = 0; GLF_live15j < 3; GLF_live15j++) {
                                        if (GLF_live15looplimiter0 >= 5) {
                                            break;
                                        }
                                        GLF_live15looplimiter0++;
                                        {
                                            GLF_live15res += texture(GLF_live15tex, GLF_live15coord + vec2(float(GLF_live15i - 1) * GLF_live15uvstep, float(GLF_live15j - 1) * GLF_live15uvstep)) * GLF_live15weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15i * 3 + GLF_live15j, 9)];
                                        }
                                    }
                                }
                                {
                                    int GLF_live21c_im = _GLF_FUZZED(38058);
                                    int GLF_live21c_re = _GLF_FUZZED((+(-22217)));
                                    int GLF_live21iteration = _GLF_FUZZED(int((false)));
                                    int GLF_live21x = _GLF_FUZZED(65421);
                                    int GLF_live21y = _GLF_FUZZED(86972);
                                    if (_GLF_DEAD(false)) {
                                        return;
                                    }
                                    {
                                        if (GLF_live21x * GLF_live21x + GLF_live21y * GLF_live21y > 262144) {
                                            ;
                                        }
                                        int GLF_live21x_new = ((GLF_live21x * GLF_live21x - GLF_live21y * GLF_live21y) / 256 + GLF_live21c_re);
                                        GLF_live21y = (2 * GLF_live21x * GLF_live21y / 256 + GLF_live21c_im);
                                        GLF_live21x = GLF_live21x_new;
                                        GLF_live21iteration++;
                                    }
                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                        return;
                                    }
                                }
                            }
                        }
                    }
                }
                if (_GLF_DEAD(false)) {
                    return;
                }
            }
            {
                vec2 GLF_live13coord = _GLF_FUZZED(vec2(-3669.6074, -6149.8073));
                int GLF_live13i = _GLF_FUZZED(13938);
                {
                    int GLF_live17a = _GLF_FUZZED(59564);
                    vec2 GLF_live17uv = _GLF_FUZZED(vec2(-5.4, -5.0));
                    {
                        {
                            int GLF_live21c_im = _GLF_FUZZED((~21323));
                            int GLF_live21c_re = _GLF_FUZZED(((uvec2(158189u, 25122u) != uvec2(23913u, 198764u)) ? 5560 : 88688));
                            int GLF_live21iteration = _GLF_FUZZED(-99640);
                            int GLF_live21looplimiter0 = 0;
                            int GLF_live21x = _GLF_FUZZED(-67840);
                            if (_GLF_DEAD(false)) {
                                return;
                            }
                            int GLF_live21y = _GLF_FUZZED(-32572);
                            for (int GLF_live21k = 0; GLF_live21k < 1000; GLF_live21k++) {
                                if (GLF_live21looplimiter0 >= 3) {
                                    break;
                                }
                                GLF_live21looplimiter0++;
                                {
                                    if (GLF_live21x * GLF_live21x + GLF_live21y * GLF_live21y > 262144) {
                                        break;
                                    }
                                    if (_GLF_DEAD(false)) {
                                        return;
                                    }
                                    int GLF_live21x_new = ((GLF_live21x * GLF_live21x - GLF_live21y * GLF_live21y) / 256 + GLF_live21c_re);
                                    GLF_live21y = (2 * GLF_live21x * GLF_live21y / 256 + GLF_live21c_im);
                                    GLF_live21x = GLF_live21x_new;
                                    GLF_live21iteration++;
                                }
                            }
                        }
                        GLF_live17uv.y -= step(GLF_live17injectionSwitch.y, GLF_live17uv.x);
                        GLF_live17uv.x -= fract(tanh(GLF_live17uv.x)) / ldexp(GLF_live17injectionSwitch.y, findMSB(GLF_live17a));
                        GLF_live17a--;
                    }
                }
                vec4 GLF_live13texel = _GLF_FUZZED(vec4(3886.6854, 0.8, 9.3, 4.4));
                {
                    GLF_live13coord = GLF_live13texel.xz + GLF_live13texel.yy;
                    GLF_live13coord = floor(GLF_live13coord * 256.0) / 256.0;
                    GLF_live13texel = texture(GLF_live13tex, GLF_live13coord);
                    GLF_live13i++;
                }
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < sqrt(0.0))))) {
                return;
            }
        }
    }
    if (_GLF_DEAD(false)) {
        if (_GLF_DEAD(_GLF_IDENTITY(false, false || (false)))) {
            return;
        }
        return;
        {
            {
                GLF_live14_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
            }
        }
    }
    if (_GLF_DEAD(false)) {
        return;
    }
    _GLF_struct_2 _GLF_struct_replacement_2 = _GLF_struct_2(1u, _GLF_struct_3(_GLF_struct_4(mat2(1.0, 1.0, 1.0, 1.0)), true, _GLF_struct_5(vec3(1.0, 1.0, 1.0), bvec2(true, true), mat4x3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), mat3x2(1.0, 1.0, 1.0, 1.0, 1.0, 1.0), 1.0, ivec2(1, 1), mat4x2(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0)), mat2x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), mat2(1.0, 1.0, 1.0, 1.0)));
    vec3 data[16];
    for (int i = 0; i < findMSB(16); i++) {
        {
            int GLF_live11looplimiter0 = 0;
            if (GLF_live11looplimiter0 >= 7) {
                ;
            }
        }
        {
            vec3 GLF_live10col = _GLF_FUZZED(vec3(-59.99));
            if (_GLF_DEAD(false)) {
                {
                    int GLF_live18looplimiter1 = 0;
                    ivec2 GLF_live18p = _GLF_FUZZED((ivec2(-79727, -17962) | ivec2(76761, 22662)));
                    while (GLF_live18p.x > 15) {
                        if (GLF_live18looplimiter1 >= 7) {
                            break;
                        }
                        GLF_live18looplimiter1++;
                        {
                            GLF_live18p.x -= 16;
                        }
                    }
                }
                {
                    {
                        vec2 GLF_live16coord = _GLF_FUZZED(vec2(72.85, 2059.6155));
                        if (GLF_live16coord.y > 1.0)
                            GLF_live16coord.y -= 1.0;
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        continue;
                    }
                    {
                        ;
                    }
                }
                discard;
            }
            vec2 GLF_live10uv = _GLF_FUZZED((vec2(-9.0, -3215.1674) + vec2(8.1, -84.20)));
            {
                {
                    {
                        int GLF_live18looplimiter1 = 0;
                        ivec2 GLF_live18p = _GLF_FUZZED((ivec2(-13054, 85078) & ivec2(-41948, 97832)));
                        while (GLF_live18p.x > 15) {
                            if (GLF_live18looplimiter1 >= 7) {
                                break;
                            }
                            GLF_live18looplimiter1++;
                            {
                                GLF_live18p.x -= 16;
                            }
                        }
                    }
                    vec2 GLF_live16coord = _GLF_FUZZED(vec2(-924.628, -2940.3465));
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        continue;
                    }
                    int GLF_live16i = _GLF_FUZZED(87824);
                    {
                        int GLF_live16looplimiter0 = 0;
                        while (GLF_live16i < 1 && GLF_live16coord.x > 1.0 || GLF_live16coord.y > 1.0) {
                            if (GLF_live16looplimiter0 >= 7) {
                                break;
                            }
                            GLF_live16looplimiter0++;
                            {
                                if (GLF_live16coord.x > 1.0)
                                    GLF_live16coord.x -= 1.0;
                                if (GLF_live16coord.y > 1.0)
                                    GLF_live16coord.y -= 1.0;
                                GLF_live16coord *= 2.0;
                                GLF_live16i++;
                            }
                            if (_GLF_DEAD(false)) {
                                return;
                            }
                            {
                                {
                                    ;
                                }
                            }
                        }
                    }
                }
                float GLF_live10stripe = GLF_live10compute_stripe(tan((GLF_live10uv.x + GLF_live10uv.y) * 20.0));
                GLF_live10col = mix(vec3(0.5, GLF_live10uv.x, 0.1), vec3(.4, 0, .5), GLF_live10stripe);
                if (_GLF_DEAD(false)) {
                    continue;
                }
                {
                    vec4 GLF_live19c = _GLF_FUZZED((vec4(-96.41, -9.6, 5.7, -9.3) - (-6.8)));
                    int GLF_live19i = _GLF_FUZZED(-91354);
                    if (GLF_live19c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i, 4)] >= 1.0) {
                        if (_GLF_DEAD(false)) {
                            discard;
                        }
                        GLF_live19c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i, 4)] = GLF_live19c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i, 4)] * GLF_live19c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i, 4)];
                    }
                }
                GLF_live10_GLF_color = vec4(GLF_live10col, 1.0);
                ;
                {
                    vec2 GLF_live13coord = _GLF_FUZZED((false ? vec2(-779.628, 4016.4603) : vec2(-80.32, 9764.8144)));
                    int GLF_live13i = _GLF_FUZZED(int(11474u));
                    vec4 GLF_live13texel = _GLF_FUZZED(((4.5 - 1.6) * vec4(96.51, -379.592, 4.2, -169.681)));
                    if (_GLF_DEAD(false)) {
                        return;
                    }
                    {
                        GLF_live13coord = GLF_live13texel.xz + GLF_live13texel.yy;
                        {
                            {
                                ;
                            }
                        }
                        GLF_live13coord = floor(GLF_live13coord * 256.0) / 256.0;
                        GLF_live13texel = texture(GLF_live13tex, GLF_live13coord);
                        GLF_live13i++;
                        if (_GLF_DEAD(false)) {
                            {
                                {
                                    ;
                                }
                            }
                            break;
                        }
                    }
                }
            }
            {
                int GLF_live18looplimiter1 = 0;
                if (GLF_live18looplimiter1 >= 7) {
                    ;
                }
            }
        }
        for (int j = 0; j < findLSB(16); j++) {
            if (_GLF_DEAD(false)) {
                discard;
            }
            data[uaddCarry(uint(4 * j), uint(i), _GLF_struct_replacement_2.uselessOutVariable)] = mand(gl_FragCoord.x + float(i - bitCount(1)), gl_FragCoord.y + float(j - bitCount(1)));
            {
                {
                    ;
                }
            }
        }
    }
    {
        float GLF_live20x = _GLF_FUZZED(-0.5);
        float GLF_live20y = _GLF_FUZZED((4.5 + (-8.9)));
        if (GLF_live20x * GLF_live20x + GLF_live20y * GLF_live20y > 4.0) {
            ;
        }
    }
    vec3 sum = vec3(0.0);
    for (int i = bitfieldReverse(0); i < findMSB(msb16); i++) {
        {
            vec3 GLF_live0color = _GLF_FUZZED((mat3(-764.458, 93.90, 16.48, 650.543, -72.62, 9886.7716, -8.9, -7.5, -314.623) * ((517.601 * (-0.7)) - vec3(vec4(-189.472, -80.82, -17.21, -40.78)))));
            {
                {
                    ivec2 GLF_live18p = _GLF_FUZZED(ivec2(63838, 58806));
                    {
                        int GLF_live18looplimiter1 = 0;
                        while (GLF_live18p.x > 15) {
                            if (GLF_live18looplimiter1 >= 7) {
                                if (_GLF_DEAD(false)) {
                                    discard;
                                }
                                break;
                            }
                            GLF_live18looplimiter1++;
                            {
                                GLF_live18p.x -= 16;
                            }
                        }
                    }
                }
                {
                    ;
                }
            }
            {
                ivec2 GLF_live18p = _GLF_FUZZED(ivec2(-74252, -57878));
                {
                    GLF_live18p.y--;
                }
            }
            int GLF_live0count = _GLF_FUZZED(((-49560) | (-36791)));
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                break;
            }
            {
                bool GLF_live10c1 = _GLF_FUZZED((mat2(mat2x4(mat4(16.28, 2.5, 8.2, 7831.2113, -7495.5950, -2.1, 6675.1840, -98.17, -6165.4950, -2.0, -708.878, 734.175, 442.161, 0.2, -2.8, -67.70))) != mat2(-12.20, 8.3, -8.1, -1.7)));
                bool GLF_live10c2 = _GLF_FUZZED(bvec2(true, false).t);
                bool GLF_live10c3 = _GLF_FUZZED(true);
                {
                    float GLF_live20x = _GLF_FUZZED((713.685 - (-44.37)));
                    float GLF_live20y = _GLF_FUZZED(-78.83);
                    if (0.0 > GLF_live20resolution.x) {
                        GLF_live20x = 1.0;
                        GLF_live20y = 1.0;
                    }
                }
                bool GLF_live10c4 = _GLF_FUZZED(false);
                vec3 GLF_live10col = _GLF_FUZZED(vec3(-12.53));
                vec2 GLF_live10uv = _GLF_FUZZED(((-1525.5839) - vec2(657.414, 73.91)));
                if (_GLF_DEAD(false)) {
                    return;
                    {
                        float GLF_live20xCoord = _GLF_FUZZED(-587.450);
                        float GLF_live20yCoord = _GLF_FUZZED(vec4(-7.6, -94.63, -1.0, 760.615).s);
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            break;
                        }
                        {
                            ;
                        }
                    }
                    {
                        vec2 GLF_live16coord = _GLF_FUZZED(vec2(9.2, 104.561));
                        if (GLF_live16coord.x > 1.0)
                            GLF_live16coord.x -= 1.0;
                    }
                }
                if (!GLF_live10c1 && !GLF_live10c2 && !GLF_live10c3 && GLF_live10c4) {
                    float GLF_live10stripe = GLF_live10compute_stripe(tan((GLF_live10uv.x + GLF_live10uv.y) * 20.0));
                    GLF_live10col = mix(vec3(GLF_live10uv.x, .8, 0), vec3(1, GLF_live10uv.y, 0), GLF_live10stripe);
                    {
                        vec2 GLF_live13coord = _GLF_FUZZED(vec2(0.7, 711.785));
                        int GLF_live13i = _GLF_FUZZED(-48704);
                        {
                            int GLF_live19looplimiter0 = 0;
                            if (GLF_live19looplimiter0 >= 3) {
                                ;
                            }
                        }
                        vec4 GLF_live13texel = _GLF_FUZZED(vec4(-8.6, -8527.2089, 5.7, -324.713));
                        {
                            int GLF_live13looplimiter0 = 0;
                            while (GLF_live13texel.x + GLF_live13texel.y + GLF_live13texel.z > 1.0 && GLF_live13i < 16) {
                                if (GLF_live13looplimiter0 >= 4) {
                                    break;
                                }
                                GLF_live13looplimiter0++;
                                {
                                    GLF_live13coord = GLF_live13texel.xz + GLF_live13texel.yy;
                                    GLF_live13coord = floor(GLF_live13coord * 256.0) / 256.0;
                                    GLF_live13texel = texture(GLF_live13tex, GLF_live13coord);
                                    GLF_live13i++;
                                }
                                {
                                    ivec2 GLF_live18p = _GLF_FUZZED(ivec2(70628, -98970));
                                    {
                                        GLF_live18p.y--;
                                    }
                                }
                            }
                        }
                    }
                    GLF_live10_GLF_color = vec4(GLF_live10col, 1.0);
                    ;
                }
            }
            {
                GLF_live0color -= GLF_live0palette(vec3(float(GLF_live0obj.numbers[4]) * 0.1), trunc(vec3(0.1)), vec3(float(GLF_live0obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_live0injectionSwitch.y), 10)]) * 0.1), vec3(GLF_live0injectionSwitch.x, float(GLF_live0obj.numbers[2]) * 0.1, float(GLF_live0obj.numbers[8]) * 0.1));
                {
                    int GLF_live12looplimiter4 = 0;
                    if (GLF_live12looplimiter4 >= 6) {
                        ;
                        {
                            int GLF_live20iterationCap = _GLF_FUZZED(87812);
                            {
                                GLF_live20iterationCap += 1;
                                if (_GLF_DEAD(false)) {
                                    continue;
                                }
                            }
                        }
                    }
                }
                if (_GLF_DEAD(false)) {
                    return;
                }
                {
                    {
                        ;
                    }
                }
                GLF_live0count++;
            }
            if (_GLF_DEAD(false)) {
                break;
            }
        }
        {
            vec4 GLF_live19c = _GLF_FUZZED(vec4(54.79, 7112.6403, -703.075, 400.710));
            int GLF_live19i = _GLF_FUZZED((int(136964u) ^ ivec3(64176, 54064, 27090).x));
            if (GLF_live19c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i, 4)] >= 1.0) {
                GLF_live19c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i, 4)] = GLF_live19c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i, 4)] * GLF_live19c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i, 4)];
            }
        }
        if (_GLF_DEAD(false)) {
            continue;
        }
        {
            int GLF_live17a = _GLF_FUZZED((bvec2(false, true).g ? (+(-10723)) : (-71332)));
            int GLF_live17b = _GLF_FUZZED(15731);
            {
                ivec2 GLF_live18p = _GLF_FUZZED((ivec2(-89404, -92053) + ivec2(24800, 1992)));
                if (GLF_live18p.x < 0) {
                    GLF_live18p.y++;
                }
            }
            int GLF_live17c = _GLF_FUZZED(-25181);
            int GLF_live17looplimiter2 = 0;
            vec2 GLF_live17uv = _GLF_FUZZED(vec2(-5.3, -9.1));
            do {
                if (GLF_live17looplimiter2 >= 6) {
                    break;
                }
                GLF_live17looplimiter2++;
                {
                    GLF_live17uv.y -= step(GLF_live17injectionSwitch.y, GLF_live17uv.x) + float(GLF_live17a) + float(GLF_live17b);
                    GLF_live17uv.x += ldexp(GLF_live17injectionSwitch.y, isinf(GLF_live17uv.y + GLF_live17uv.x) ? findMSB(GLF_live17b) : findMSB(GLF_live17a));
                    GLF_live17c--;
                }
            } while (GLF_live17c > int(GLF_live17injectionSwitch.x));
        }
        {
            vec3 GLF_live5color = _GLF_FUZZED((-vec2(-24.75, 4.7)).xxy);
            int GLF_live5count = _GLF_FUZZED(((89428) ^ (-22234)));
            {
                GLF_live5color -= GLF_live5palette(vec3(float(GLF_live5obj.numbers[4]) * 0.1), trunc(vec3(0.1)), vec3(float(GLF_live5obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_live5injectionSwitch.y), 10)]) * 0.1), vec3(GLF_live5injectionSwitch.x, float(GLF_live5obj.numbers[2]) * 0.1, float(GLF_live5obj.numbers[8]) * 0.1));
                {
                    vec2 GLF_live15coord = _GLF_FUZZED(vec2(-2.7, -8778.7345));
                    int GLF_live15i = _GLF_FUZZED(ivec3(-84068, 21124, -39061).t);
                    vec4 GLF_live15res = _GLF_FUZZED((vec2(-6503.4883, 1913.9439) * (mat4x2(3.0, -44.22, -9.4, 6.5, -5.3, 8.5, 0.4, 8.7) - 13.67)));
                    float GLF_live15uvstep = _GLF_FUZZED(((7.8 + 432.535)));
                    {
                        {
                            int GLF_live15looplimiter0 = 0;
                            for (int GLF_live15j = 0; GLF_live15j < 3; GLF_live15j++) {
                                if (GLF_live15looplimiter0 >= 5) {
                                    break;
                                }
                                {
                                    {
                                        ;
                                    }
                                }
                                GLF_live15looplimiter0++;
                                {
                                    GLF_live15res += texture(GLF_live15tex, GLF_live15coord + vec2(float(GLF_live15i - 1) * GLF_live15uvstep, float(GLF_live15j - 1) * GLF_live15uvstep)) * GLF_live15weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15i * 3 + GLF_live15j, 9)];
                                }
                            }
                        }
                    }
                    {
                        {
                            ;
                        }
                    }
                }
                GLF_live5count++;
                {
                    {
                        ;
                    }
                }
            }
            {
                int GLF_live9baseIndex = _GLF_FUZZED(-65808);
                int GLF_live9data = _GLF_FUZZED(-10011);
                {
                    {
                        float GLF_live20c_im = _GLF_FUZZED((8.1 - (-371.141)));
                        float GLF_live20c_re = _GLF_FUZZED(vec3(-5507.6387, 0.1, -15.78).z);
                        int GLF_live20iteration = _GLF_FUZZED(((-36807) | ivec3(-15293, -72382, -48051).y));
                        int GLF_live20iterationCap = _GLF_FUZZED((int(false) * (-13625)));
                        int GLF_live20k = _GLF_FUZZED(27182);
                        int GLF_live20looplimiter0 = 0;
                        float GLF_live20x = _GLF_FUZZED(8.7);
                        float GLF_live20y = _GLF_FUZZED(5180.0817);
                        do {
                            if (GLF_live20looplimiter0 >= 3) {
                                break;
                            }
                            GLF_live20looplimiter0++;
                            {
                                if (GLF_live20x * GLF_live20x + GLF_live20y * GLF_live20y > 4.0) {
                                    break;
                                }
                                float GLF_live20x_new = GLF_live20x * GLF_live20x - GLF_live20y * GLF_live20y + GLF_live20c_re;
                                GLF_live20y = 2.0 * GLF_live20x * GLF_live20y + GLF_live20c_im;
                                GLF_live20x = GLF_live20x_new;
                                GLF_live20iteration++;
                                GLF_live20k++;
                            }
                        } while (GLF_live20k < bitfieldInsert(GLF_live20iterationCap + (257.0 > GLF_live20resolution.y ? 1 : 0), 0, 0, 0));
                    }
                    vec2 GLF_live15coord = _GLF_FUZZED((vec2(7.2, -6.8) + (-9.5)));
                    int GLF_live15i = _GLF_FUZZED(-58519);
                    vec4 GLF_live15res = _GLF_FUZZED(vec4(-5.0, 7.6, -89.65, -3481.2829));
                    {
                        ivec2 GLF_live18p = _GLF_FUZZED((ivec2(-10314, -58831) + 67906));
                        {
                            GLF_live18p.x -= 16;
                        }
                    }
                    float GLF_live15uvstep = _GLF_FUZZED(-39.71);
                    {
                        int GLF_live20iterationCap = _GLF_FUZZED(int(false));
                        {
                            if (_GLF_DEAD(false)) {
                                continue;
                            }
                            GLF_live20iterationCap += 1;
                        }
                    }
                    {
                        {
                            {
                                ivec2 GLF_live18p = _GLF_FUZZED((ivec2(-68360, 85304) + (-14587)));
                                {
                                    GLF_live18p.x = -GLF_live18p.x;
                                }
                            }
                            int GLF_live15looplimiter0 = 0;
                            for (int GLF_live15j = 0; GLF_live15j < 3; GLF_live15j++) {
                                if (GLF_live15looplimiter0 >= 5) {
                                    {
                                        int GLF_live20iteration = _GLF_FUZZED((22940 | ivec4(-47824, -80006, -60575, 67459).q));
                                        {
                                            ;
                                        }
                                    }
                                    break;
                                }
                                GLF_live15looplimiter0++;
                                {
                                    GLF_live15res += texture(GLF_live15tex, GLF_live15coord + vec2(float(GLF_live15i - 1) * GLF_live15uvstep, float(GLF_live15j - 1) * GLF_live15uvstep)) * GLF_live15weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15i * 3 + GLF_live15j, 9)];
                                }
                                {
                                    int GLF_live18looplimiter0 = 0;
                                    ivec2 GLF_live18p = _GLF_FUZZED((ivec2(82802, 67915) | ivec2(-15791, -34332)));
                                    {
                                        if (GLF_live18looplimiter0 >= 7) {
                                            ;
                                        }
                                        GLF_live18looplimiter0++;
                                        {
                                            if (_GLF_DEAD(false)) {
                                                discard;
                                            }
                                            GLF_live18p = GLF_live18iter(GLF_live18p);
                                        }
                                    }
                                }
                            }
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        return;
                    }
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    if (_GLF_DEAD(false)) {
                        continue;
                    }
                    return;
                }
                int GLF_live9looplimiter0 = 0;
                int GLF_live9treeIndex = _GLF_FUZZED((ivec2(86375, -34758) ^ (true ? ivec2(8938, -22901) : ivec2(39722, 99183))).s);
                {
                    vec2 GLF_live16coord = _GLF_FUZZED((mat4x2(vec2(-3427.4585, 1161.3729), vec2(55.58, -17.46), vec2(-35.23, 9557.8785), vec2(135.930, -16.15).ts) * vec4(936.943, -4.4, -5.2, 3.3)));
                    if (GLF_live16coord.x > 1.0)
                        GLF_live16coord.x -= 1.0;
                }
                while (GLF_live9baseIndex <= GLF_live9treeIndex) {
                    if (GLF_live9looplimiter0 >= 7) {
                        {
                            vec2 GLF_live15coord = _GLF_FUZZED(vec2(8.0, 922.442));
                            vec4 GLF_live15res = _GLF_FUZZED(vec4(-65.26, -313.758, 810.633, 4.2));
                            float GLF_live15uvstep = _GLF_FUZZED(5.2);
                            {
                                int GLF_live15looplimiter1 = 0;
                                for (int GLF_live15i = 0; GLF_live15i < 3; GLF_live15i++) {
                                    if (GLF_live15looplimiter1 >= 5) {
                                        {
                                            int GLF_live21c_im = _GLF_FUZZED(9178);
                                            int GLF_live21c_re = _GLF_FUZZED((72332 & (-19813)));
                                            int GLF_live21iteration = _GLF_FUZZED(-71788);
                                            int GLF_live21x = _GLF_FUZZED(((true ? (-95362) : 11961) * (-62216)));
                                            int GLF_live21y = _GLF_FUZZED((20284 + (-50814)));
                                            {
                                                int GLF_live21looplimiter0 = 0;
                                                for (int GLF_live21k = 0; GLF_live21k < 1000; GLF_live21k++) {
                                                    if (GLF_live21looplimiter0 >= 3) {
                                                        break;
                                                    }
                                                    GLF_live21looplimiter0++;
                                                    {
                                                        if (GLF_live21x * GLF_live21x + GLF_live21y * GLF_live21y > 262144) {
                                                            break;
                                                        }
                                                        int GLF_live21x_new = ((GLF_live21x * GLF_live21x - GLF_live21y * GLF_live21y) / 256 + GLF_live21c_re);
                                                        GLF_live21y = (2 * GLF_live21x * GLF_live21y / 256 + GLF_live21c_im);
                                                        GLF_live21x = GLF_live21x_new;
                                                        GLF_live21iteration++;
                                                    }
                                                }
                                            }
                                        }
                                        break;
                                    }
                                    GLF_live15looplimiter1++;
                                    {
                                        {
                                            int GLF_live15looplimiter0 = 0;
                                            for (int GLF_live15j = 0; GLF_live15j < 3; GLF_live15j++) {
                                                {
                                                    {
                                                        ;
                                                    }
                                                }
                                                if (GLF_live15looplimiter0 >= 5) {
                                                    break;
                                                }
                                                GLF_live15looplimiter0++;
                                                {
                                                    GLF_live15res += texture(GLF_live15tex, GLF_live15coord + vec2(float(GLF_live15i - 1) * GLF_live15uvstep, float(GLF_live15j - 1) * GLF_live15uvstep)) * GLF_live15weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15i * 3 + GLF_live15j, 9)];
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        break;
                        {
                            int GLF_live18looplimiter1 = 0;
                            if (GLF_live18looplimiter1 >= 7) {
                                ;
                            }
                        }
                        {
                            vec2 GLF_live16coord = _GLF_FUZZED(vec2(297.999, 365.529));
                            int GLF_live16i = _GLF_FUZZED((((-67968) ^ (18984 * (-25284))) ^ (-36929)));
                            {
                                int GLF_live16looplimiter0 = 0;
                                while (GLF_live16i < 1 && GLF_live16coord.x > 1.0 || GLF_live16coord.y > 1.0) {
                                    if (GLF_live16looplimiter0 >= 7) {
                                        break;
                                        if (_GLF_DEAD(false)) {
                                            break;
                                        }
                                    }
                                    GLF_live16looplimiter0++;
                                    {
                                        if (GLF_live16coord.x > 1.0)
                                            GLF_live16coord.x -= 1.0;
                                        if (GLF_live16coord.y > 1.0)
                                            GLF_live16coord.y -= 1.0;
                                        GLF_live16coord *= 2.0;
                                        GLF_live16i++;
                                    }
                                }
                            }
                        }
                        if (_GLF_DEAD(false)) {
                            {
                                int GLF_live20iterationCap = _GLF_FUZZED(92746);
                                {
                                    GLF_live20iterationCap += 1;
                                }
                            }
                            break;
                            {
                                int GLF_live11i = _GLF_FUZZED(((-68876) + (-66405)));
                                if (GLF_live11i >= int(GLF_live11resolution.x)) {
                                    ;
                                }
                                if (_GLF_DEAD(false)) {
                                    break;
                                }
                            }
                            {
                                int GLF_live15looplimiter0 = 0;
                                if (GLF_live15looplimiter0 >= 5) {
                                    ;
                                }
                            }
                        }
                    }
                    GLF_live9looplimiter0++;
                    if (_GLF_DEAD(false)) {
                        continue;
                    }
                    {
                        if (GLF_live9data <= GLF_live9tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9baseIndex, 10)].data) {
                            {
                                int GLF_live12c = _GLF_FUZZED(437);
                                int GLF_live12looplimiter1 = 0;
                                {
                                    vec4 GLF_live19c = _GLF_FUZZED(vec4(8.4, (4.7 - (-13.02)), 5.0, 1.9));
                                    int GLF_live19looplimiter1 = 0;
                                    for (int GLF_live19i = 0; GLF_live19i < 3; GLF_live19i++) {
                                        if (GLF_live19looplimiter1 >= 3) {
                                            break;
                                        }
                                        GLF_live19looplimiter1++;
                                        {
                                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                discard;
                                            }
                                            if (GLF_live19c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i, 4)] >= 1.0) {
                                                GLF_live19c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i, 4)] = GLF_live19c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i, 4)] * GLF_live19c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i, 4)];
                                            }
                                        }
                                    }
                                }
                                {
                                    {
                                        int GLF_live19i = _GLF_FUZZED(((((-462.318) > 7.0) ? 26658 : 65220) + 90202));
                                        float GLF_live19limit = _GLF_FUZZED((vec4(69.13, 1.8, -8771.1834, -66.09) * vec4(9.9, vec3(7691.7378, -8.6, 579.463))).a);
                                        int GLF_live19looplimiter0 = 0;
                                        float GLF_live19ref = _GLF_FUZZED(99.12);
                                        float GLF_live19s = _GLF_FUZZED(((-772.538) - 1.6));
                                        {
                                            if (GLF_live19looplimiter0 >= 3) {
                                                ;
                                            }
                                            GLF_live19looplimiter0++;
                                            {
                                                if (mod(float(GLF_live19i), GLF_live19ref) <= 0.01) {
                                                    GLF_live19s += 0.2;
                                                }
                                                if (float(GLF_live19i) >= GLF_live19limit) {
                                                    ;
                                                }
                                            }
                                        }
                                    }
                                    vec2 GLF_live15coord = _GLF_FUZZED((((mat3x2(2.9, 22.15, 373.549, -6202.9669, -3.9, -4266.4647)) != mat3x2(-8.2, 278.174, 0.6, -414.226, -1884.2178, -0.2)) ? vec2(-5761.7020, 5471.5522) : vec2(5.6, 5.1)));
                                    int GLF_live15i = _GLF_FUZZED(7880);
                                    int GLF_live15j = _GLF_FUZZED(int(true));
                                    int GLF_live15looplimiter0 = 0;
                                    vec4 GLF_live15res = _GLF_FUZZED(vec4(145.460, -9.1, 1.9, -7.4));
                                    float GLF_live15uvstep = _GLF_FUZZED(-4190.0433);
                                    {
                                        if (GLF_live15looplimiter0 >= 5) {
                                            ;
                                        }
                                        GLF_live15looplimiter0++;
                                        {
                                            GLF_live15res += texture(GLF_live15tex, GLF_live15coord + vec2(float(GLF_live15i - 1) * GLF_live15uvstep, float(GLF_live15j - 1) * GLF_live15uvstep)) * GLF_live15weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15i * 3 + GLF_live15j, 9)];
                                            {
                                                int GLF_live19i = _GLF_FUZZED(-22794);
                                                float GLF_live19ref = _GLF_FUZZED(-8997.8576);
                                                float GLF_live19s = _GLF_FUZZED((-(-30.16)));
                                                if (mod(float(GLF_live19i), GLF_live19ref) <= 0.01) {
                                                    GLF_live19s += 0.2;
                                                }
                                            }
                                        }
                                    }
                                }
                                uint GLF_live12matrix_number = _GLF_FUZZED((87875u | (~142224u)));
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < abs(0.0))))) {
                                    break;
                                }
                                int GLF_live12rows = _GLF_FUZZED(ivec4(60282, 10487, 10867, -50694).y);
                                {
                                    if (GLF_live12looplimiter1 >= 6) {
                                        ;
                                    }
                                    GLF_live12looplimiter1++;
                                    {
                                        {
                                            int GLF_live17looplimiter4 = 0;
                                            {
                                                int GLF_live19i = _GLF_FUZZED((false ? 68985 : 26563));
                                                float GLF_live19ref = _GLF_FUZZED(-0.8);
                                                float GLF_live19s = _GLF_FUZZED(-7192.5675);
                                                if (mod(float(GLF_live19i), GLF_live19ref) <= 0.01) {
                                                    GLF_live19s += 0.2;
                                                }
                                            }
                                            if (GLF_live17looplimiter4 >= 6) {
                                                ;
                                            }
                                        }
                                        {
                                            int GLF_live12looplimiter0 = 0;
                                            {
                                                vec2 GLF_live16coord = _GLF_FUZZED((vec2(-6.6, -9.8) * 72.13));
                                                int GLF_live16i = _GLF_FUZZED(int((ivec3(-30078, -13067, 48156) != ivec3(-32268, 99983, -73436))));
                                                {
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                        continue;
                                                    }
                                                    int GLF_live16looplimiter0 = 0;
                                                    while (GLF_live16i < 1 && GLF_live16coord.x > 1.0 || GLF_live16coord.y > 1.0) {
                                                        if (GLF_live16looplimiter0 >= 7) {
                                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                                continue;
                                                            }
                                                            {
                                                                int GLF_live21iteration = _GLF_FUZZED(ivec2(-57185, -58226).s);
                                                                {
                                                                    ;
                                                                }
                                                            }
                                                            break;
                                                        }
                                                        GLF_live16looplimiter0++;
                                                        {
                                                            if (GLF_live16coord.x > 1.0)
                                                                GLF_live16coord.x -= 1.0;
                                                            if (GLF_live16coord.y > 1.0)
                                                                GLF_live16coord.y -= 1.0;
                                                            GLF_live16coord *= 2.0;
                                                            GLF_live16i++;
                                                        }
                                                    }
                                                }
                                            }
                                            for (int GLF_live12r = 0; GLF_live12r < GLF_live12rows; GLF_live12r++) {
                                                if (GLF_live12looplimiter0 >= 6) {
                                                    break;
                                                    {
                                                        ivec2 GLF_live18p = _GLF_FUZZED(((-64341) - ivec2(-77177, 47219)));
                                                        {
                                                            GLF_live18p.x = -GLF_live18p.x;
                                                        }
                                                    }
                                                }
                                                GLF_live12looplimiter0++;
                                                {
                                                    {
                                                        ivec2 GLF_live18p = _GLF_FUZZED(ivec2(24970, 88263));
                                                        {
                                                            int GLF_live18looplimiter1 = 0;
                                                            while (GLF_live18p.x > 15) {
                                                                if (GLF_live18looplimiter1 >= 7) {
                                                                    break;
                                                                }
                                                                GLF_live18looplimiter1++;
                                                                {
                                                                    GLF_live18p.x -= 16;
                                                                }
                                                            }
                                                        }
                                                    }
                                                    switch (GLF_live12matrix_number) {
                                                        case 0u:
                                                            GLF_live12m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live12r, 2)] = GLF_live12one;
                                                            break;
                                                            {
                                                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                                    discard;
                                                                }
                                                                int GLF_live20iterationCap = _GLF_FUZZED((ivec3(33940, 60130, 56856).rr.g ^ (-85146)));
                                                                {
                                                                    GLF_live20iterationCap += 1;
                                                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                                        discard;
                                                                    }
                                                                }
                                                            }
                                                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                                return;
                                                            }
                                                        case 1u:
                                                            GLF_live12m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live12r, 3)] = GLF_live12one;
                                                            break;
                                                        case 2u:
                                                            GLF_live12m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live12r, 4)] = GLF_live12one;
                                                            {
                                                                vec2 GLF_live16coord = _GLF_FUZZED((vec2(9.1, -9739.5319) * 5518.0988));
                                                                if (GLF_live16coord.y > 1.0)
                                                                    GLF_live16coord.y -= 1.0;
                                                            }
                                                            break;
                                                        case 3u:
                                                            GLF_live12m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live12r, 2)] = GLF_live12one;
                                                            break;
                                                        case 4u:
                                                            GLF_live12m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live12r, 3)] = GLF_live12one;
                                                            break;
                                                        case 5u:
                                                            GLF_live12m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live12r, 4)] = GLF_live12one;
                                                            break;
                                                        case 6u:
                                                            {
                                                                vec2 GLF_live16coord = _GLF_FUZZED(vec2(-80.01, -2820.1295));
                                                                vec4 GLF_live16res = _GLF_FUZZED((mat4(28.58, 7338.4457, 936.817, 7905.1156, 4.0, -9.5, -5.0, 2.7, 6738.8742, -7424.2271, 5.6, -54.91, 5.4, -554.495, -2.3, 5208.3924) * (vec2(806.292, 40.02).yxxy + (vec4(-70.66, -37.79, -40.09, 3.3) * 7.8))));
                                                                if (GLF_live16coord.x < 1.0 && GLF_live16coord.y < 1.0) {
                                                                    GLF_live16res = texture(GLF_live16tex, GLF_live16coord);
                                                                }
                                                            }
                                                            {
                                                                {
                                                                    ;
                                                                }
                                                            }
                                                            GLF_live12m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live12r, 2)] = GLF_live12one;
                                                            break;
                                                        case 7u:
                                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                                return;
                                                            }
                                                            GLF_live12m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live12r, 3)] = GLF_live12one;
                                                            {
                                                                int GLF_live19looplimiter1 = 0;
                                                                if (GLF_live19looplimiter1 >= 3) {
                                                                    ;
                                                                }
                                                            }
                                                            if (_GLF_DEAD(false)) {
                                                                discard;
                                                            }
                                                            break;
                                                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                                continue;
                                                            }
                                                        case 8u:
                                                            if (_GLF_DEAD(false)) {
                                                                continue;
                                                            }
                                                            GLF_live12m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live12r, 4)] = GLF_live12one;
                                                            break;
                                                    }
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                        {
                                                            int GLF_live19i = _GLF_FUZZED(-61115);
                                                            float GLF_live19limit = _GLF_FUZZED((6792.6407 - 32.02));
                                                            float GLF_live19ref = _GLF_FUZZED(vec4(7.3, 915.835, -3327.9329, -6.5).r);
                                                            float GLF_live19s = _GLF_FUZZED(2.2);
                                                            {
                                                                if (mod(float(GLF_live19i), GLF_live19ref) <= 0.01) {
                                                                    GLF_live19s += 0.2;
                                                                }
                                                                if (_GLF_DEAD(false)) {
                                                                    break;
                                                                }
                                                                if (float(GLF_live19i) >= GLF_live19limit) {
                                                                    ;
                                                                    if (_GLF_DEAD(false)) {
                                                                        continue;
                                                                    }
                                                                }
                                                            }
                                                        }
                                                        discard;
                                                    }
                                                    {
                                                        int GLF_live17looplimiter5 = 0;
                                                        if (GLF_live17looplimiter5 >= 6) {
                                                            {
                                                                float GLF_live20x = _GLF_FUZZED(7.9);
                                                                float GLF_live20y = _GLF_FUZZED(((-417.353) + 67.99));
                                                                if (0.0 > GLF_live20resolution.x) {
                                                                    GLF_live20x = 1.0;
                                                                    GLF_live20y = 1.0;
                                                                }
                                                            }
                                                            ;
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            if (GLF_live9tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9baseIndex, 10)].leftIndex == -1) {
                                GLF_live9tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9baseIndex, 10)].leftIndex = GLF_live9treeIndex;
                                {
                                    vec4 GLF_live19c = _GLF_FUZZED((vec4(-1.8, 8.9, 2.1, -500.716) * ((307.888 + vec4(1.4, 54.71, -8.4, -883.890)) + (-549.644))));
                                    {
                                        int GLF_live19looplimiter1 = 0;
                                        for (int GLF_live19i = 0; GLF_live19i < 3; GLF_live19i++) {
                                            if (GLF_live19looplimiter1 >= 3) {
                                                break;
                                            }
                                            GLF_live19looplimiter1++;
                                            {
                                                if (GLF_live19c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i, 4)] >= 1.0) {
                                                    GLF_live19c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i, 4)] = GLF_live19c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i, 4)] * GLF_live19c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live19i, 4)];
                                                }
                                            }
                                        }
                                    }
                                }
                                GLF_live9makeTreeNode(GLF_live9tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9treeIndex, 10)], GLF_live9data);
                                ;
                            } else {
                                {
                                    {
                                        {
                                            int GLF_live21looplimiter2 = 0;
                                            if (GLF_live21looplimiter2 >= 3) {
                                                ;
                                            }
                                        }
                                        ;
                                    }
                                }
                                if (_GLF_DEAD(false)) {
                                    return;
                                }
                                GLF_live9baseIndex = GLF_live9tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9baseIndex, 10)].leftIndex;
                                continue;
                                {
                                    int GLF_live18looplimiter1 = 0;
                                    ivec2 GLF_live18p = _GLF_FUZZED(ivec2(57738, -74163));
                                    {
                                        if (GLF_live18looplimiter1 >= 7) {
                                            ;
                                        }
                                        GLF_live18looplimiter1++;
                                        {
                                            GLF_live18p.x -= 16;
                                        }
                                    }
                                }
                            }
                        } else {
                            {
                                vec2 GLF_live16coord = _GLF_FUZZED((vec2(-8.9, 0.2) * vec2(9.6, -5.2)));
                                if (GLF_live16coord.x > 1.0) {
                                    {
                                        {
                                            ;
                                        }
                                        if (_GLF_DEAD(false)) {
                                            break;
                                        }
                                    }
                                    GLF_live16coord.x -= 1.0;
                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                        return;
                                    }
                                }
                            }
                            if (GLF_live9tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9baseIndex, 10)].rightIndex == -1) {
                                GLF_live9tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9baseIndex, 10)].rightIndex = GLF_live9treeIndex;
                                GLF_live9makeTreeNode(GLF_live9tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9treeIndex, 10)], GLF_live9data);
                                if (_GLF_DEAD(false)) {
                                    discard;
                                }
                                ;
                                {
                                    int GLF_live17a = _GLF_FUZZED(46616);
                                    int GLF_live17b = _GLF_FUZZED(98727);
                                    vec2 GLF_live17uv = _GLF_FUZZED(vec2(-4.2, -1.7));
                                    {
                                        int GLF_live17looplimiter1 = 0;
                                        {
                                            int GLF_live18i = _GLF_FUZZED((((-32905) ^ ivec3(-95435, -82751, -42307)) ^ ivec3(64, -14911, -24223)).x);
                                            ivec2 GLF_live18p = _GLF_FUZZED(ivec2(ivec3(83551, -90417, -27373)));
                                            {
                                                int GLF_live18looplimiter0 = 0;
                                                for (GLF_live18i = 0; GLF_live18i < 100; GLF_live18i++) {
                                                    if (GLF_live18looplimiter0 >= 7) {
                                                        break;
                                                    }
                                                    GLF_live18looplimiter0++;
                                                    {
                                                        GLF_live18p = GLF_live18iter(GLF_live18p);
                                                    }
                                                }
                                            }
                                        }
                                        do {
                                            if (GLF_live17looplimiter1 >= 6) {
                                                {
                                                    int GLF_live21c_im = _GLF_FUZZED(-58953);
                                                    int GLF_live21c_re = _GLF_FUZZED(-63620);
                                                    int GLF_live21iteration = _GLF_FUZZED(-22297);
                                                    int GLF_live21x = _GLF_FUZZED(34857);
                                                    int GLF_live21y = _GLF_FUZZED(85269);
                                                    {
                                                        int GLF_live21looplimiter0 = 0;
                                                        for (int GLF_live21k = 0; GLF_live21k < 1000; GLF_live21k++) {
                                                            if (GLF_live21looplimiter0 >= 3) {
                                                                break;
                                                            }
                                                            GLF_live21looplimiter0++;
                                                            {
                                                                if (GLF_live21x * GLF_live21x + GLF_live21y * GLF_live21y > 262144) {
                                                                    break;
                                                                }
                                                                int GLF_live21x_new = ((GLF_live21x * GLF_live21x - GLF_live21y * GLF_live21y) / 256 + GLF_live21c_re);
                                                                GLF_live21y = (2 * GLF_live21x * GLF_live21y / 256 + GLF_live21c_im);
                                                                GLF_live21x = GLF_live21x_new;
                                                                GLF_live21iteration++;
                                                            }
                                                        }
                                                    }
                                                }
                                                break;
                                            }
                                            {
                                                float GLF_live19s = _GLF_FUZZED(149.355);
                                                {
                                                    ;
                                                }
                                            }
                                            GLF_live17looplimiter1++;
                                            {
                                                GLF_live17uv.y -= step(GLF_live17injectionSwitch.y, GLF_live17uv.x) + float(GLF_live17a);
                                                GLF_live17uv.x *= (isnan(GLF_live17uv.y) ? cosh(GLF_live17gl_FragCoord.y) : tanh(GLF_live17gl_FragCoord.x));
                                                GLF_live17b--;
                                                {
                                                    ivec2 GLF_live18p = _GLF_FUZZED(ivec2(-23160, 16370));
                                                    {
                                                        GLF_live18p = GLF_live18iter(GLF_live18p);
                                                    }
                                                }
                                            }
                                            {
                                                {
                                                    ;
                                                }
                                            }
                                        } while (GLF_live17b > int(GLF_live17injectionSwitch.x));
                                    }
                                }
                            } else {
                                GLF_live9baseIndex = GLF_live9tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9baseIndex, 10)].rightIndex;
                                continue;
                            }
                        }
                        {
                            float GLF_live19limit = _GLF_FUZZED(1.3);
                            float GLF_live19ref = _GLF_FUZZED(-6.1);
                            float GLF_live19s = _GLF_FUZZED(vec4(-5992.0032, 9.0, 3.7, 9630.3223).z);
                            {
                                int GLF_live19looplimiter0 = 0;
                                for (int GLF_live19i = 1; GLF_live19i < 800; GLF_live19i++) {
                                    if (GLF_live19looplimiter0 >= 3) {
                                        break;
                                    }
                                    GLF_live19looplimiter0++;
                                    {
                                        if (mod(float(GLF_live19i), GLF_live19ref) <= 0.01) {
                                            GLF_live19s += 0.2;
                                        }
                                        if (float(GLF_live19i) >= GLF_live19limit) {
                                            ;
                                        }
                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                            discard;
                                        }
                                    }
                                }
                            }
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                            {
                                vec2 GLF_live16coord = _GLF_FUZZED(vec2(-459.364, 1.2));
                                if (GLF_live16coord.y > 1.0)
                                    GLF_live16coord.y -= 1.0;
                                if (_GLF_DEAD(false)) {
                                    continue;
                                }
                            }
                            discard;
                        }
                        {
                            int GLF_live19i = _GLF_FUZZED(((-72068) + 93979));
                            float GLF_live19limit = _GLF_FUZZED(-2766.2440);
                            int GLF_live19looplimiter0 = 0;
                            float GLF_live19ref = _GLF_FUZZED(0.1);
                            float GLF_live19s = _GLF_FUZZED(-6.0);
                            {
                                if (GLF_live19looplimiter0 >= 3) {
                                    ;
                                }
                                GLF_live19looplimiter0++;
                                {
                                    if (mod(float(GLF_live19i), GLF_live19ref) <= 0.01) {
                                        GLF_live19s += 0.2;
                                    }
                                    if (float(GLF_live19i) >= GLF_live19limit) {
                                        ;
                                    }
                                }
                            }
                        }
                    }
                }
                {
                    vec2 GLF_live15coord = _GLF_FUZZED(vec2(-2.3, -835.091));
                    int GLF_live15looplimiter1 = 0;
                    vec4 GLF_live15res = _GLF_FUZZED(vec4(1809.8309, -58.27, 2079.3093, 5.9).ptpq);
                    float GLF_live15uvstep = _GLF_FUZZED((-(-6.8)));
                    for (int GLF_live15i = 0; GLF_live15i < 3; GLF_live15i++) {
                        if (GLF_live15looplimiter1 >= 5) {
                            break;
                        }
                        GLF_live15looplimiter1++;
                        {
                            {
                                {
                                    int GLF_live20iterationCap = _GLF_FUZZED(((float(true) <= (-3.2)) ? 67366 : (-2469)));
                                    if (0.0 > GLF_live20resolution.y) {
                                        GLF_live20iterationCap += 1;
                                    }
                                }
                                int GLF_live15looplimiter0 = 0;
                                for (int GLF_live15j = 0; GLF_live15j < 3; GLF_live15j++) {
                                    if (GLF_live15looplimiter0 >= 5) {
                                        break;
                                    }
                                    GLF_live15looplimiter0++;
                                    {
                                        GLF_live15res += texture(GLF_live15tex, GLF_live15coord + vec2(float(GLF_live15i - 1) * GLF_live15uvstep, float(GLF_live15j - 1) * GLF_live15uvstep)) * GLF_live15weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15i * 3 + GLF_live15j, 9)];
                                    }
                                }
                                {
                                    int GLF_live18looplimiter1 = 0;
                                    if (GLF_live18looplimiter1 >= 7) {
                                        ;
                                    }
                                }
                            }
                        }
                    }
                }
                {
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        discard;
                    }
                    {
                        ;
                    }
                }
            }
        }
        sum += data[i];
        {
            _GLF_struct_6 _GLF_struct_replacement_6 = _GLF_struct_6(mat4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), 0, ivec4(1, 1, 1, 1));
            if (_GLF_struct_replacement_6.GLF_live1looplimiter0 >= 7) {
                {
                    vec2 GLF_live15coord = _GLF_FUZZED((mat4x2(9.6, 402.169, -7.0, -3.0, -57.35, 42.86, -638.028, 89.73) * vec4(9.1, -4496.2705, -554.760, -788.814)));
                    int GLF_live15i = _GLF_FUZZED(51186);
                    int GLF_live15j = _GLF_FUZZED(((-60779) & 7861));
                    {
                        ivec2 GLF_live18p = _GLF_FUZZED(ivec2(94592, -42020));
                        {
                            int GLF_live18looplimiter1 = 0;
                            while (GLF_live18p.x > 15) {
                                if (GLF_live18looplimiter1 >= 7) {
                                    break;
                                }
                                GLF_live18looplimiter1++;
                                if (_GLF_DEAD(false)) {
                                    break;
                                }
                                {
                                    GLF_live18p.x -= 16;
                                }
                            }
                        }
                    }
                    vec4 GLF_live15res = _GLF_FUZZED(vec4(750.254, -7.6, -2.1, 1344.3598));
                    float GLF_live15uvstep = _GLF_FUZZED(float(true));
                    {
                        GLF_live15res += texture(GLF_live15tex, GLF_live15coord + vec2(float(GLF_live15i - 1) * GLF_live15uvstep, float(GLF_live15j - 1) * GLF_live15uvstep)) * GLF_live15weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15i * 3 + GLF_live15j, 9)];
                    }
                    {
                        int GLF_live21c_im = _GLF_FUZZED(64521);
                        int GLF_live21c_re = _GLF_FUZZED(-35423);
                        int GLF_live21iteration = _GLF_FUZZED(-66667);
                        int GLF_live21looplimiter0 = 0;
                        int GLF_live21x = _GLF_FUZZED(-97534);
                        int GLF_live21y = _GLF_FUZZED(37104);
                        {
                            if (GLF_live21looplimiter0 >= 3) {
                                ;
                                if (_GLF_DEAD(false)) {
                                    break;
                                }
                            }
                            GLF_live21looplimiter0++;
                            {
                                if (GLF_live21x * GLF_live21x + GLF_live21y * GLF_live21y > 262144) {
                                    ;
                                }
                                if (_GLF_DEAD(false)) {
                                    return;
                                }
                                int GLF_live21x_new = ((GLF_live21x * GLF_live21x - GLF_live21y * GLF_live21y) / 256 + GLF_live21c_re);
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    continue;
                                }
                                GLF_live21y = (2 * GLF_live21x * GLF_live21y / 256 + GLF_live21c_im);
                                GLF_live21x = GLF_live21x_new;
                                GLF_live21iteration++;
                            }
                        }
                    }
                }
                ;
                {
                    {
                        vec3 GLF_live10col = _GLF_FUZZED(vec3(8.3, 2273.9416, -9689.0526));
                        vec2 GLF_live10uv = _GLF_FUZZED((vec2(3.3, 606.605) - (-0.9)));
                        {
                            float GLF_live10stripe = GLF_live10compute_stripe(tan((GLF_live10uv.x + GLF_live10uv.y) * 20.0));
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                continue;
                            }
                            {
                                {
                                    int GLF_live18i = _GLF_FUZZED(-98096);
                                    ivec2 GLF_live18p = _GLF_FUZZED((-ivec2(71037, 69380)));
                                    {
                                        int GLF_live18looplimiter0 = 0;
                                        for (GLF_live18i = 0; GLF_live18i < 100; GLF_live18i++) {
                                            if (GLF_live18looplimiter0 >= 7) {
                                                if (_GLF_DEAD(false)) {
                                                    discard;
                                                }
                                                break;
                                                if (_GLF_DEAD(false)) {
                                                    break;
                                                }
                                            }
                                            GLF_live18looplimiter0++;
                                            {
                                                GLF_live18p = GLF_live18iter(GLF_live18p);
                                            }
                                        }
                                    }
                                }
                                vec2 GLF_live16coord = _GLF_FUZZED(vec3(-919.377, 75.39, -8765.1025).zx);
                                if (GLF_live16coord.y > 1.0)
                                    GLF_live16coord.y -= 1.0;
                            }
                            GLF_live10col = mix(vec3(0.5, GLF_live10uv.x, 0.1), vec3(.4, 0, .5), GLF_live10stripe);
                            {
                                int GLF_live19i = _GLF_FUZZED(((-23729) & 47869));
                                float GLF_live19limit = _GLF_FUZZED(-1.1);
                                int GLF_live19looplimiter0 = 0;
                                float GLF_live19ref = _GLF_FUZZED(vec2(5.5, 2.4).t);
                                float GLF_live19s = _GLF_FUZZED((2157.5168 - (-7.1)));
                                {
                                    if (GLF_live19looplimiter0 >= 3) {
                                        ;
                                    }
                                    GLF_live19looplimiter0++;
                                    if (_GLF_DEAD(false)) {
                                        return;
                                    }
                                    {
                                        if (mod(float(GLF_live19i), GLF_live19ref) <= 0.01) {
                                            GLF_live19s += 0.2;
                                        }
                                        if (float(GLF_live19i) >= GLF_live19limit) {
                                            ;
                                        }
                                    }
                                }
                            }
                            GLF_live10_GLF_color = vec4(GLF_live10col, 1.0);
                            ;
                        }
                    }
                    int GLF_live6v = _GLF_FUZZED((83473 - (-52895)));
                    {
                        GLF_live6v = 3 * GLF_live6v + 1;
                    }
                }
            }
        }
    }
    sum /= vec3(16.0);
    if (_GLF_DEAD(false)) {
        return;
    }
    _GLF_color = vec4(sum, 1.0);
}
