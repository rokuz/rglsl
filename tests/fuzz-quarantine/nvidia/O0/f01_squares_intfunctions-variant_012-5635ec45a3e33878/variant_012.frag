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
int GLF_live15MATRIX_N = 4;

layout(set = 0, binding = 2) uniform buf2 {
    float GLF_live13time;
};

float GLF_live13h_r = _GLF_FUZZED(8.0);
float GLF_live13s_g = _GLF_FUZZED(-3.7);
float GLF_live13b_b = _GLF_FUZZED(float(false));

void GLF_live13doConvert() {
    vec3 GLF_live13temp = _GLF_FUZZED(((vec4(-2.2, -0.3, 556.397, -71.83)) * mat3x4(2.0, 7.0, -719.132, 5.6, 5.4, -8.9, 90.42, -14.24, 8973.1465, -0.3, -662.662, -284.935)));
    GLF_live13temp = GLF_live13b_b * (1.0 - GLF_live13s_g) + (GLF_live13b_b - GLF_live13b_b * (1.0 - GLF_live13s_g)) * clamp(abs(abs(6.0 * (GLF_live13h_r - vec3(0, 1, 2) / 3.0)) - 3.0) - 1.0, 0.0, 1.0);
    GLF_live13h_r = GLF_live13temp.x;
    GLF_live13s_g = GLF_live13temp.y;
    GLF_live13b_b = GLF_live13temp.z;
}

vec3 GLF_live13computeColor(float GLF_live13c, vec2 GLF_live13position) {
    GLF_live13h_r = fract(GLF_live13c);
    GLF_live13s_g = 1.0;
    GLF_live13b_b = (0.5 + (sin(GLF_live13time) * 0.5 + 0.5));
    GLF_live13doConvert();
    GLF_live13s_g *= 1.0 / GLF_live13position.y;
    GLF_live13h_r *= 1.0 / GLF_live13position.x;
    if (abs(GLF_live13position.y - GLF_live13position.x) < 0.5) {
        GLF_live13b_b = clamp(0.0, 1.0, GLF_live13b_b * 3.0);
    }
    return vec3(GLF_live13h_r, GLF_live13s_g, GLF_live13b_b);
}

vec3 GLF_live13defaultColor() {
    return vec3(0.0);
}

vec3 GLF_live13drawShape(vec2 GLF_live13pos, vec2 GLF_live13square, vec3 GLF_live13setting) {
    bool GLF_live13c1 = GLF_live13pos.x - GLF_live13setting.x < GLF_live13square.x;
    if (!GLF_live13c1) {
        return GLF_live13defaultColor();
    }
    bool GLF_live13c2 = GLF_live13pos.x + GLF_live13setting.x > GLF_live13square.x;
    if (!GLF_live13c2) {
        return GLF_live13defaultColor();
    }
    bool GLF_live13c3 = GLF_live13pos.y - GLF_live13setting.x < GLF_live13square.y;
    if (!GLF_live13c3) {
        return GLF_live13defaultColor();
    }
    bool GLF_live13c4 = GLF_live13pos.y + GLF_live13setting.x > GLF_live13square.y;
    if (!GLF_live13c4) {
        return GLF_live13defaultColor();
    }
    bool GLF_live13c5 = GLF_live13pos.x - (GLF_live13setting.x - GLF_live13setting.y) < GLF_live13square.x;
    if (!GLF_live13c5) {
        return GLF_live13computeColor(GLF_live13setting.z / 40.0, GLF_live13pos);
    }
    bool GLF_live13c6 = GLF_live13pos.x + (GLF_live13setting.x - GLF_live13setting.y) > GLF_live13square.x;
    if (!GLF_live13c6) {
        return GLF_live13computeColor(GLF_live13setting.z / 40.0, GLF_live13pos);
    }
    bool GLF_live13c7 = GLF_live13pos.y - (GLF_live13setting.x - GLF_live13setting.y) < GLF_live13square.y;
    if (!GLF_live13c7) {
        return GLF_live13computeColor(GLF_live13setting.z / 40.0, GLF_live13pos);
    }
    bool GLF_live13c8 = GLF_live13pos.y + (GLF_live13setting.x - GLF_live13setting.y) > GLF_live13square.y;
    if (!GLF_live13c8) {
        return GLF_live13computeColor(GLF_live13setting.z / 40.0, GLF_live13pos);
    }
    return GLF_live13defaultColor();
}

layout(set = 0, binding = 3) uniform sampler2D GLF_live14tex;

layout(set = 0, binding = 4) uniform buf4 {
    float GLF_dead9time;
};

float GLF_dead9h_r = _GLF_FUZZED(-9564.1243);
float GLF_dead9s_g = _GLF_FUZZED(vec3(-60.55, -11.53, 35.23).x);
float GLF_dead9b_b = _GLF_FUZZED(54.20);

void GLF_dead9doConvert() {
    vec3 GLF_dead9temp = _GLF_FUZZED(((-7201.4209) + vec3(-807.571, 984.252, -6695.3946)));
    GLF_dead9temp = GLF_dead9b_b * (1.0 - GLF_dead9s_g) + (GLF_dead9b_b - GLF_dead9b_b * _GLF_IDENTITY((1.0 - GLF_dead9s_g), ((1.0 - GLF_dead9s_g)) - 0.0)) * clamp(abs(abs(6.0 * (GLF_dead9h_r - vec3(0, 1, 2) / 3.0)) - 3.0) - 1.0, 0.0, 1.0);
    GLF_dead9h_r = GLF_dead9temp.x;
    {
        vec4 GLF_live12c = _GLF_FUZZED(vec4(468.808, 6.1, 5.6, 10.45));
        int GLF_live12looplimiter1 = 0;
        for (int GLF_live12i = 0; GLF_live12i < 3; GLF_live12i++) {
            if (GLF_live12looplimiter1 >= 3) {
                break;
            }
            GLF_live12looplimiter1++;
            {
                if (GLF_live12c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12i, 4)] >= 1.0) {
                    GLF_live12c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12i, 4)] = GLF_live12c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12i, 4)] * GLF_live12c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12i, 4)];
                }
            }
        }
    }
    GLF_dead9s_g = GLF_dead9temp.y;
    GLF_dead9b_b = GLF_dead9temp.z;
}

vec3 GLF_dead9computeColor(float GLF_dead9c, vec2 GLF_dead9position) {
    GLF_dead9h_r = fract(GLF_dead9c);
    GLF_dead9s_g = 1.0;
    GLF_dead9b_b = (0.5 + (sin(GLF_dead9time) * 0.5 + 0.5));
    GLF_dead9doConvert();
    GLF_dead9s_g *= 1.0 / GLF_dead9position.y;
    GLF_dead9h_r *= 1.0 / GLF_dead9position.x;
    if (abs(GLF_dead9position.y - GLF_dead9position.x) < 0.5) {
        GLF_dead9b_b = clamp(0.0, 1.0, GLF_dead9b_b * 3.0);
    }
    return vec3(GLF_dead9h_r, GLF_dead9s_g, GLF_dead9b_b);
    {
        bool GLF_live13c5 = _GLF_FUZZED(false);
        vec2 GLF_live13pos = _GLF_FUZZED(((-vec2(6.2, -37.04)).gr + (-87.65)));
        vec3 GLF_live13setting = _GLF_FUZZED(vec3(-8310.2956, 4447.9789, -82.12));
        if (!GLF_live13c5) {
            ;
        }
    }
}

vec3 GLF_dead9defaultColor() {
    {
        vec2 GLF_live14coord = _GLF_FUZZED(vec2(4.7, -9.7));
        vec4 GLF_live14res = _GLF_FUZZED(vec4(-9815.6292, 5033.6014, 3629.6590, -8.9));
        {
            GLF_live14res = texture(GLF_live14tex, GLF_live14coord);
        }
    }
    return vec3(0.0);
}

vec3 GLF_dead9drawShape(vec2 GLF_dead9pos, vec2 GLF_dead9square, vec3 GLF_dead9setting) {
    bool GLF_dead9c1 = GLF_dead9pos.x - _GLF_IDENTITY(GLF_dead9setting, (GLF_dead9setting) - vec3(0.0, 0.0, 0.0)).x < GLF_dead9square.x;
    if (!GLF_dead9c1) {
        return GLF_dead9defaultColor();
    }
    bool GLF_dead9c2 = GLF_dead9pos.x + GLF_dead9setting.x > GLF_dead9square.x;
    if (!GLF_dead9c2) {
        return GLF_dead9defaultColor();
    }
    {
        float GLF_live15alpha3 = _GLF_FUZZED((true ? 1.7 : ((true ? (-57.28) : (-91.48)))));
        int GLF_live15j = _GLF_FUZZED(15351);
        int GLF_live15k = _GLF_FUZZED(-46375);
        int GLF_live15looplimiter2 = 0;
        mat4 GLF_live15matrix_a = _GLF_FUZZED((mat4(47.58, -2031.3595, 51.57, 348.498, 90.25, 36.60, -1.3, 2191.6378, 93.64, 8421.3368, 680.615, 5.3, -8.1, -4207.6101, -2.0, -6.5) * mat4(91.84, -21.63, -91.98, 4998.4315, -6646.0930, 1666.2368, float(114884u), -83.16, -477.978, 8.4, -2734.5111, -8.1, 4812.2679, -444.832, -3.5, -83.83)));
        vec4 GLF_live15matrix_u = _GLF_FUZZED((float(false) * vec4(3625.4072, -1.8, 2.0, 2.8)));
        for (int GLF_live15a = GLF_live15MATRIX_N - 1; GLF_live15a >= GLF_live15k; GLF_live15a--) {
            if (GLF_live15looplimiter2 >= 5) {
                break;
            }
            GLF_live15looplimiter2++;
            {
                GLF_live15alpha3 += GLF_live15matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15a, 4)] * GLF_live15matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15a, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live15j, 4)];
            }
        }
    }
    bool GLF_dead9c3 = GLF_dead9pos.y - GLF_dead9setting.x < GLF_dead9square.y;
    if (!GLF_dead9c3) {
        return GLF_dead9defaultColor();
    }
    bool GLF_dead9c4 = GLF_dead9pos.y + GLF_dead9setting.x > GLF_dead9square.y;
    if (!GLF_dead9c4) {
        return GLF_dead9defaultColor();
    }
    bool GLF_dead9c5 = GLF_dead9pos.x - (GLF_dead9setting.x - GLF_dead9setting.y) < GLF_dead9square.x;
    if (!GLF_dead9c5) {
        return GLF_dead9computeColor(GLF_dead9setting.z / 40.0, GLF_dead9pos);
    }
    bool GLF_dead9c6 = GLF_dead9pos.x + _GLF_IDENTITY((GLF_dead9setting.x - GLF_dead9setting.y), clamp((GLF_dead9setting.x - GLF_dead9setting.y), (GLF_dead9setting.x - GLF_dead9setting.y), _GLF_IDENTITY((GLF_dead9setting.x - GLF_dead9setting.y), (_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)) ? (GLF_dead9setting.x - GLF_dead9setting.y) : _GLF_FUZZED(GLF_dead9s_g))))) > GLF_dead9square.x;
    if (!GLF_dead9c6) {
        return GLF_dead9computeColor(GLF_dead9setting.z / _GLF_IDENTITY(40.0, mix(float(40.0), float(_GLF_FUZZED(-3.3)), bool(false))), GLF_dead9pos);
    }
    bool GLF_dead9c7 = GLF_dead9pos.y - (GLF_dead9setting.x - GLF_dead9setting.y) < GLF_dead9square.y;
    if (!GLF_dead9c7) {
        return GLF_dead9computeColor(GLF_dead9setting.z / 40.0, GLF_dead9pos);
    }
    bool GLF_dead9c8 = GLF_dead9pos.y + (GLF_dead9setting.x - GLF_dead9setting.y) > GLF_dead9square.y;
    if (!GLF_dead9c8) {
        return GLF_dead9computeColor(_GLF_IDENTITY(GLF_dead9setting, (true ? GLF_dead9setting : _GLF_FUZZED(vec3(-948.126, -599.134, -98.46)))).z / 40.0, GLF_dead9pos);
    }
    return GLF_dead9defaultColor();
}

struct _GLF_struct_7 {
    bvec4 _f0;
    uint _f1;
};

struct _GLF_struct_6 {
    _GLF_struct_7 _f0;
    bvec3 _f1;
    mat3 _f2;
    int donor_replacementGLF_dead7treeIndex;
};

struct _GLF_struct_12 {
    bvec4 _f0;
    bvec4 _f1;
    int GLF_live0looplimiter2;
    bvec2 _f2;
    mat2x4 _f3;
    mat4x2 _f4;
};

struct _GLF_struct_11 {
    mat4x2 _f0;
    mat2x4 _f1;
};

struct _GLF_struct_10 {
    mat3x2 _f0;
    bool _f1;
};

struct _GLF_struct_9 {
    bvec2 _f0;
    uvec3 _f1;
    _GLF_struct_10 _f2;
    _GLF_struct_11 _f3;
    _GLF_struct_12 _f4;
    float _f5;
};

struct _GLF_struct_8 {
    _GLF_struct_9 _f0;
    float _f1;
};

struct _GLF_struct_14 {
    mat4 _f0;
};

struct _GLF_struct_13 {
    vec4 _f0;
    mat2x3 _f1;
    mat2 _f2;
    vec2 GLF_live1uv;
    _GLF_struct_14 _f3;
};

struct GLF_dead7BST {
    int data;
    int leftIndex;
    int rightIndex;
};

GLF_dead7BST GLF_dead7tree[10] = GLF_dead7BST[10](GLF_dead7BST(0, 0, 0), GLF_dead7BST(0, 0, 0), GLF_dead7BST(0, 0, 0), GLF_dead7BST(_GLF_IDENTITY(0, (false ? _GLF_FUZZED(-34185) : 0)), 0, 0), GLF_dead7BST(0, 0, 0), GLF_dead7BST(0, 0, 0), GLF_dead7BST(0, 0, 0), GLF_dead7BST(0, 0, 0), GLF_dead7BST(0, 0, 0), GLF_dead7BST(0, 0, 0));

void GLF_dead7makeTreeNode(inout GLF_dead7BST GLF_dead7tree, int GLF_dead7data) {
    GLF_dead7tree.data = GLF_dead7data;
    GLF_dead7tree.leftIndex = -1;
    {
        bool GLF_live13c6 = _GLF_FUZZED(bvec4(false, true, false, true).s);
        vec2 GLF_live13pos = _GLF_FUZZED((((-8485.8509) * (-494.426)) - vec2(4.9, -7.0)));
        vec3 GLF_live13setting = _GLF_FUZZED(((vec3(-17.46, -8203.6343, 61.08)) * vec3(8.9, 8.6, -7.0)));
        if (!GLF_live13c6) {
            ;
        }
    }
    _GLF_IDENTITY(GLF_dead7tree.rightIndex = -1, 0 | (_GLF_IDENTITY(GLF_dead7tree.rightIndex = -1, ~(~(GLF_dead7tree.rightIndex = -1)))));
}

struct GLF_dead4QuicksortObject {
    int numbers[10];
};

GLF_dead4QuicksortObject GLF_dead4obj = GLF_dead4QuicksortObject(int[10](0, 0, 0, 0, 0, 0, 0, 0, 0, 0));

void GLF_dead4swap(int GLF_dead4i, int GLF_dead4j) {
    int GLF_dead4temp = GLF_dead4obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead4i, 10)];
    GLF_dead4obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead4i, 10)] = GLF_dead4obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead4j, 10)];
    GLF_dead4obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead4j, 10)] = GLF_dead4temp;
}

int GLF_live0MATRIX_N = 4;
vec4 GLF_live2_GLF_color = _GLF_FUZZED((vec4(-49.93, -8234.9708, 657.336, -2.6) - (-6743.0443)));

ivec2 GLF_live3iter(ivec2 GLF_live3p) {
    if (GLF_live3p.x > 0) {
        GLF_live3p.y--;
        {
            vec2 GLF_live13center = _GLF_FUZZED(vec2(1.4, -6.6));
            vec2 GLF_live13position = _GLF_FUZZED(vec2(696.013, -7.0));
            vec3 GLF_live13result = _GLF_FUZZED(vec3(94.02, -2.0, -8.0));
            {
                int GLF_live13looplimiter0 = 0;
                for (int GLF_live13i = 35; GLF_live13i >= 0; GLF_live13i--) {
                    if (GLF_live13looplimiter0 >= 6) {
                        break;
                    }
                    GLF_live13looplimiter0++;
                    {
                        vec3 GLF_live13d = _GLF_FUZZED(vec3(-8.0, -9.2, 7.0));
                        GLF_live13d = GLF_live13drawShape(GLF_live13position, GLF_live13center + vec2(sin(float(GLF_live13i) / 10.0 + GLF_live13time) / 4.0, 0.0), vec3(0.01 + sin(float(GLF_live13i) / 100.0), 0.01, float(GLF_live13i)));
                        if (length(GLF_live13d) <= 0.0) {
                            continue;
                        }
                        GLF_live13result = vec3(GLF_live13d);
                    }
                }
            }
        }
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_IDENTITY(dot(vec4(0.0, 0.0, 1.0, 1.0), vec4(1.0, 1.0, 0.0, 0.0)), dot(vec4(0.0, 0.0, 1.0, 1.0), vec4(1.0, 1.0, 0.0, 0.0))))))) {
        vec3 donor_replacementGLF_dead4color = _GLF_FUZZED(vec3(-50.15, 2.1, -0.8));
        {
            donor_replacementGLF_dead4color.y += float(GLF_dead4obj.numbers[2]);
        }
    }
    if (_GLF_IDENTITY(GLF_live3p.x < 0, true && (GLF_live3p.x < 0))) {
        GLF_live3p.y++;
    }
    GLF_live3p.x += GLF_live3p.y / 2;
    return GLF_live3p;
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < tan(0.0))))) {
            {
                int GLF_live12looplimiter1 = 0;
                if (GLF_live12looplimiter1 >= 3) {
                    ;
                }
            }
            {
                GLF_dead9b_b = clamp(0.0, 1.0, GLF_dead9b_b * 3.0);
            }
        }
        float donor_replacementGLF_dead7v = _GLF_FUZZED(3.5);
        if (donor_replacementGLF_dead7v < 1.5) {
            ;
        }
    }
}

vec4 GLF_live1_GLF_color = _GLF_FUZZED(vec4(5676.8834, 2918.7091, -95.94, -8.5));

layout(set = 0, binding = 5) uniform buf5 {
    vec2 GLF_live1injectionSwitch;
};

float GLF_live1compute_derivative_x(float GLF_live1v) {
    return dFdx(GLF_live1v) * GLF_live1injectionSwitch.y;
}

float GLF_live1compute_derivative_y(float GLF_live1v) {
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
        int donor_replacementGLF_dead4j = _GLF_FUZZED((ivec3(71727, 13, 26994).p % (-85108)));
        int donor_replacementGLF_dead4pivot = _GLF_FUZZED(-25687);
        {
            if (GLF_dead4obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4j, 10)] <= donor_replacementGLF_dead4pivot) {
                GLF_live0MATRIX_N++;
                GLF_dead4swap(GLF_live0MATRIX_N, donor_replacementGLF_dead4j);
            }
        }
        {
            vec2 GLF_live14coord = _GLF_FUZZED(vec2(-9.8, 9511.3960));
            int GLF_live14i = _GLF_FUZZED(-21838);
            {
                int GLF_live14looplimiter0 = 0;
                while (GLF_live14i < 1 && GLF_live14coord.x > 1.0 || GLF_live14coord.y > 1.0) {
                    if (GLF_live14looplimiter0 >= 4) {
                        break;
                    }
                    GLF_live14looplimiter0++;
                    {
                        if (GLF_live14coord.x > 1.0)
                            GLF_live14coord.x -= 1.0;
                        if (GLF_live14coord.y > 1.0)
                            GLF_live14coord.y -= 1.0;
                        GLF_live14coord *= 2.0;
                        GLF_live14i++;
                    }
                }
            }
        }
    }
    return dFdy(GLF_live1v) * _GLF_IDENTITY(GLF_live1injectionSwitch.y, min(GLF_live1injectionSwitch.y, GLF_live1injectionSwitch.y));
}

float GLF_live1compute_stripe(float GLF_live1v) {
    return _GLF_IDENTITY(smoothstep(-.9, 1., (GLF_live1v) / ((GLF_live1injectionSwitch.y > GLF_live1injectionSwitch.x) ? GLF_live1compute_derivative_x(GLF_live1v) : GLF_live1compute_derivative_y(GLF_live1v))), (_GLF_IDENTITY(smoothstep(-.9, 1., (GLF_live1v) / ((GLF_live1injectionSwitch.y > GLF_live1injectionSwitch.x) ? GLF_live1compute_derivative_x(GLF_live1v) : GLF_live1compute_derivative_y(GLF_live1v))), (smoothstep(-.9, 1., (GLF_live1v) / ((GLF_live1injectionSwitch.y > GLF_live1injectionSwitch.x) ? GLF_live1compute_derivative_x(GLF_live1v) : GLF_live1compute_derivative_y(GLF_live1v)))) / 1.0)) / 1.0);
}

struct _GLF_struct_5 {
    uvec2 _f0;
};

struct _GLF_struct_4 {
    bvec2 _f0;
    mat4x3 _f1;
    mat4 _f2;
    mat2x4 _f3;
    int _f4;
    ivec4 _f5;
};

struct _GLF_struct_3 {
    uvec2 _f0;
    uvec4 _f1;
    float _f2;
    _GLF_struct_4 _f3;
    uvec2 _f4;
    ivec3 _f5;
    uvec4 _f6;
};

struct _GLF_struct_2 {
    mat2 _f0;
    uvec4 _f1;
    ivec4 _f2;
    mat4x3 _f3;
    bvec4 _f4;
};

struct _GLF_struct_1 {
    mat3x4 _f0;
    bvec3 _f1;
    uvec2 _f2;
    mat3x2 _f3;
    mat3 _f4;
    mat2 _f5;
    _GLF_struct_2 _f6;
};

struct _GLF_struct_0 {
    bvec3 _f0;
    mat3x4 _f1;
    mat3 _f2;
    uint _f3;
    _GLF_struct_1 _f4;
    _GLF_struct_3 _f5;
    float angle;
    _GLF_struct_5 _f6;
};

layout(set = 0, binding = 6) uniform buf6 {
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
    vec3 temp;
    temp = _GLF_IDENTITY(b_b * (float(bitCount(msb8)) - s_g), max(b_b * _GLF_IDENTITY((float(bitCount(msb8)) - s_g), clamp(_GLF_IDENTITY((float(bitCount(msb8)) - s_g), max((float(bitCount(msb8)) - s_g), _GLF_IDENTITY((float(bitCount(msb8)) - s_g), clamp((float(bitCount(msb8)) - s_g), (float(bitCount(msb8)) - s_g), (float(bitCount(msb8)) - s_g))))), (float(bitCount(msb8)) - s_g), (float(bitCount(msb8)) - s_g))), b_b * (float(bitCount(msb8)) - s_g))) + (b_b - b_b * (float(bitCount(msb8)) - s_g)) * clamp(abs(_GLF_IDENTITY(abs(6.0 * (h_r - vec3(bitfieldReverse(0), bitCount(msb8), 2) / _GLF_IDENTITY(3.0, (3.0) - log(1.0)))) - 3.0, mix(vec3(_GLF_IDENTITY((abs(6.0 * (h_r - vec3(bitfieldReverse(0), bitCount(msb8), 2) / _GLF_IDENTITY(3.0, (3.0) - log(1.0)))) - 3.0)[0], (true ? (abs(6.0 * (h_r - vec3(bitfieldReverse(0), bitCount(msb8), 2) / _GLF_IDENTITY(3.0, (3.0) - log(1.0)))) - 3.0)[0] : _GLF_FUZZED(s_g))), (abs(6.0 * (h_r - vec3(bitfieldReverse(0), bitCount(msb8), 2) / _GLF_IDENTITY(3.0, (3.0) - log(1.0)))) - 3.0)[1], _GLF_FUZZED(((-0.2) * (-95.84)))), vec3(_GLF_FUZZED(47.09), _GLF_FUZZED(9502.4969), (abs(6.0 * (h_r - vec3(bitfieldReverse(0), bitCount(msb8), 2) / _GLF_IDENTITY(3.0, (3.0) - log(1.0)))) - 3.0)[2]), bvec3(_GLF_FALSE(false, (gl_FragCoord.y < abs(0.0))), false, _GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))))) - float(bitCount(msb8)), float(bitfieldExtract(int(resolution.x), _GLF_IDENTITY(0, min(0, 0)), 0)), float(bitCount(int(_GLF_IDENTITY(resolution.x, (_GLF_IDENTITY(resolution.x, min(_GLF_IDENTITY(resolution.x, min(resolution.x, resolution.x)), resolution.x))) + 0.0)))));
    h_r = temp.x;
    s_g = temp.y;
    b_b = temp.z;
}

vec3 computeColor(float c, vec2 position) {
    {
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        _GLF_color = min(vec4(-7.4, 8939.8592, -5.9, -61.57), -4.7);
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
            {
                int GLF_live0looplimiter6 = 0;
                if (GLF_live0looplimiter6 >= 7) {
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        for (int GLF_dead4i = 0; GLF_dead4i < 10; GLF_dead4i++) {
                            if (_GLF_DEAD(_GLF_IDENTITY(false, false || (false)))) {
                                int donor_replacementGLF_dead11i = _GLF_FUZZED(findMSB(max((+30377u), 36974u)));
                                float donor_replacementGLF_dead11limit = _GLF_FUZZED(h_r);
                                float donor_replacementGLF_dead11ref = _GLF_FUZZED(h_r);
                                float donor_replacementGLF_dead11s = _GLF_FUZZED(cosh(trunc(-62.45)));
                                {
                                    if (mod(float(donor_replacementGLF_dead11i), donor_replacementGLF_dead11ref) <= 0.01) {
                                        {
                                            int GLF_live12i = _GLF_FUZZED(-43361);
                                            float GLF_live12limit = _GLF_FUZZED((+953.332));
                                            float GLF_live12s = _GLF_FUZZED(4822.4761);
                                            if (float(GLF_live12i) >= GLF_live12limit) {
                                                ;
                                            }
                                        }
                                        _GLF_IDENTITY(donor_replacementGLF_dead11s += 0.2, (true ? (donor_replacementGLF_dead11s += 0.2) : _GLF_FUZZED(c)));
                                    }
                                    {
                                        vec2 GLF_live13pos = _GLF_FUZZED(vec2(-414.231, -5.0));
                                        vec3 GLF_live13setting = _GLF_FUZZED(vec3(58.25, 5.3, 741.455));
                                        {
                                            vec4 _GLF_outVarBackup_GLF_color;
                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                            _GLF_color = fract(step(vec4(-8.8, -4.3, -4945.3028, -4.9), vec4(-6.7, -928.019, 25.07, 1821.0764)));
                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                            }
                                        }
                                        {
                                            ;
                                        }
                                    }
                                    if (float(donor_replacementGLF_dead11i) >= donor_replacementGLF_dead11limit) {
                                        ;
                                    }
                                }
                            }
                            GLF_dead4obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead4i, 10)] = (10 - GLF_dead4i);
                            GLF_dead4obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead4i, 10)] = GLF_dead4obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead4i, 10)] * GLF_dead4obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead4i, 10)];
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = faceforward(vec4(-7.5, 0.5, -16.40, 5.7), fma(vec2(-49.42, -6577.2062).yyxx, vec4(926.060, -856.320, -887.731, -9.0), vec4(417.081, -9.5, -96.77, 7.1)), vec4(679.509, -51.48, 0.2, -7.3));
                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                        }
                        if (_GLF_DEAD(false)) {
                            int donor_replacementGLF_dead8index = _GLF_FUZZED(GLF_live0looplimiter6);
                            {
                                donor_replacementGLF_dead8index = GLF_live0MATRIX_N;
                                {
                                    vec3 GLF_live13d = _GLF_FUZZED(vec3(5.2, -103.452, -9697.8995));
                                    if (length(GLF_live13d) <= 0.0) {
                                        ;
                                    }
                                }
                            }
                        }
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = (mat4(-2.1, -5.7, -62.36, -670.673, 860.181, -23.46, 39.00, 2806.4913, 34.24, -5.7, 22.99, -5.3, 0.7, -1.0, -53.55, 73.70) * mat4(579.389, 129.216, 13.22, -4.0, -5.9, 8.7, 9.2, 1469.8817, 8.9, 493.126, 2.9, -1.2, -1.2, 456.267, -0.1, 2.6))[1];
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                    }
                    ;
                }
            }
        }
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < _GLF_IDENTITY(dot(vec3(0.0, 1.0, 0.0), vec3(1.0, 0.0, 1.0)), dot(vec3(0.0, 1.0, 0.0), vec3(1.0, 0.0, 1.0))))))) {
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = fma(vec4(789.656, 6.4, -23.12, 3.9), vec4(68.60, 8268.6788, 9830.9527, 235.345), vec4(2.6, 4130.0883, 2.8, 51.60));
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
        vec3 donor_replacementGLF_dead4color = _GLF_FUZZED(min(sinh(vec3(226.781, -0.2, -7.8)), s_g));
        vec2 donor_replacementGLF_dead4uv = _GLF_FUZZED(GLF_live1injectionSwitch);
        if (donor_replacementGLF_dead4uv.x > (1.0 / 4.0)) {
            if (_GLF_DEAD(_GLF_FALSE(false, (_GLF_IDENTITY(gl_FragCoord, vec4(_GLF_IDENTITY(mat4x3(gl_FragCoord, 1.0, 0.0, 1.0, 0.0, _GLF_IDENTITY(0.0, float(mat3x4(0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 1.0, 0.0))), round(length(normalize(vec4(1.0, 1.0, 1.0, 1.0)))), determinant(mat4(0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, log(1.0), 0.0, 0.0, 1.0, 0.0, abs(0.0), 0.0, 0.0)), 0.0), (_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)) ? _GLF_FUZZED((mat4x3(-2476.2281, -7.9, 280.471, 2.2, 4.3, 72.97, 407.737, -4382.6768, 1982.0085, 68.98, -6.4, 8.5) - GLF_dead9time)) : mat4x3(gl_FragCoord, 1.0, 0.0, 1.0, 0.0, _GLF_IDENTITY(0.0, float(mat3x4(0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 1.0, 0.0))), round(length(normalize(vec4(1.0, 1.0, 1.0, 1.0)))), determinant(mat4(0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, log(1.0), 0.0, 0.0, 1.0, 0.0, abs(0.0), 0.0, 0.0)), 0.0))))).y < 0.0)))) {
                {
                    return GLF_dead9defaultColor();
                }
            }
            donor_replacementGLF_dead4color.x += float(GLF_dead4obj.numbers[1]);
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(60.09, -127.399, 3.0, -94.20);
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
        }
    }
    {
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        _GLF_color = fwidthFine(vec4(315.556, -1008.9298, -8.5, -4.9)).wyww;
        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
    }
    int msb8 = 256;
    h_r = fract(_GLF_IDENTITY(c, min(c, _GLF_IDENTITY(c, (c) - 0.0))));
    {
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        _GLF_color = (mat3x4(137.687, -9.1, -5131.6801, 8.8, 1.3, -0.5, -8.2, 4822.0742, -1.2, -505.086, 843.740, 242.337) * vec3(-32.07, -1.1, 4.2));
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
    }
    s_g = float(bitCount(msb8));
    _GLF_IDENTITY(b_b = (0.5 + (sin(time) * 0.5 + 0.5)), 1.0 * (b_b = (0.5 + (sin(time) * 0.5 + 0.5))));
    doConvert();
    s_g *= _GLF_IDENTITY(float(_GLF_IDENTITY(bitCount(msb8), int(_GLF_ONE(1.0, injectionSwitch.y)) * (bitCount(msb8)))) / position.y, float(float(float(_GLF_IDENTITY(bitCount(msb8), int(_GLF_ONE(1.0, injectionSwitch.y)) * (bitCount(msb8)))) / position.y)));
    {
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = vec4(6643.1683, -9.3, 6.1, 797.602);
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        _GLF_color = dFdxCoarse(normalize(vec4(-360.389, -0.9, -68.70, 7.6)));
        {
            int GLF_live12i = _GLF_FUZZED(1499);
            float GLF_live12limit = _GLF_FUZZED(((-(-203.919))));
            float GLF_live12s = _GLF_FUZZED(4.6);
            if (float(GLF_live12i) >= GLF_live12limit) {
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(4.9, 5.4, -37.86, -0.3);
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(true, _GLF_IDENTITY(bool(bvec3(true, false, false)), (bool(bvec3(true, false, false))) || false)))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                ;
            }
        }
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                bool donor_replacementGLF_dead9c8 = _GLF_IDENTITY(_GLF_FUZZED(isinf(distance(c, h_r))), bool(bvec4(_GLF_FUZZED(isinf(distance(c, h_r))), true, false, true)));
                vec2 donor_replacementGLF_dead9pos = _GLF_FUZZED(log2(injectionSwitch));
                vec3 donor_replacementGLF_dead9setting = _GLF_FUZZED(vec3(76.36, _GLF_IDENTITY(-26.22, float(mat2x3(-26.22, 0.0, _GLF_ONE(1.0, injectionSwitch.y), 0.0, 1.0, 0.0))), 29.77));
                if (!donor_replacementGLF_dead9c8) {
                    return GLF_dead9computeColor(donor_replacementGLF_dead9setting.z / 40.0, donor_replacementGLF_dead9pos);
                }
            }
        }
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = vec4(778.726, 803.446, 0.5, 7143.3044);
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
    }
    {
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        _GLF_color = vec4(-2.3, -0.5, 57.86, -23.78);
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
    }
    if (_GLF_IDENTITY(_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))), !(!(_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))))))) {
        bool donor_replacementGLF_dead9c8 = _GLF_FUZZED((ivec3(15864, -20155, -41303) != ivec3(-65644, -52023, -5242)));
        vec2 donor_replacementGLF_dead9pos = _GLF_FUZZED(GLF_live1injectionSwitch);
        vec3 donor_replacementGLF_dead9setting = _GLF_FUZZED(vec3(-3.1, 3.0, 8.4));
        if (!donor_replacementGLF_dead9c8) {
            return GLF_dead9computeColor(_GLF_IDENTITY(donor_replacementGLF_dead9setting.z, (donor_replacementGLF_dead9setting.z) / 1.0) / 40.0, donor_replacementGLF_dead9pos);
        }
    }
    h_r *= float(bitCount(msb8)) / position.x;
    {
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        _GLF_color = (mat4(-9.8, 613.276, -1906.3356, -0.2, -767.136, -1700.3232, 7.7, 42.36, -349.518, -6.8, -52.14, -5.4, 819.947, -8740.5431, -844.540, 4096.0587) * vec4(-867.388, -3896.2036, 4.3, -112.845));
        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
    }
    if (_GLF_IDENTITY(abs(position.y - position.x), (abs(position.y - position.x)) - sqrt(0.0)) < 0.5) {
        b_b = _GLF_IDENTITY(clamp(float(bitfieldExtract(int(resolution.x), 0, 0)), float(bitCount(msb8)), _GLF_IDENTITY(b_b * float(bitCount(msb8)), mix(float(_GLF_IDENTITY(b_b * float(bitCount(msb8)), (b_b * float(bitCount(msb8))) / 1.0)), float(_GLF_FUZZED(-50.87)), bool(false))) * 3.0), (_GLF_IDENTITY(false, true && (false)) ? _GLF_FUZZED(dFdy(-7599.9657)) : _GLF_IDENTITY(clamp(float(bitfieldExtract(int(resolution.x), 0, 0)), float(bitCount(msb8)), _GLF_IDENTITY(b_b * float(bitCount(msb8)), mix(float(_GLF_IDENTITY(b_b * float(bitCount(msb8)), (b_b * float(bitCount(msb8))) / 1.0)), float(_GLF_FUZZED(-50.87)), bool(false))) * 3.0), min(clamp(float(bitfieldExtract(int(resolution.x), 0, 0)), float(bitCount(msb8)), _GLF_IDENTITY(b_b * float(bitCount(msb8)), mix(float(_GLF_IDENTITY(b_b * float(bitCount(msb8)), (b_b * float(bitCount(msb8))) / 1.0)), float(_GLF_FUZZED(-50.87)), bool(false))) * 3.0), _GLF_IDENTITY(clamp(float(bitfieldExtract(int(resolution.x), 0, 0)), float(bitCount(msb8)), _GLF_IDENTITY(b_b * float(bitCount(msb8)), mix(float(_GLF_IDENTITY(b_b * float(bitCount(msb8)), (b_b * float(bitCount(msb8))) / 1.0)), float(_GLF_FUZZED(-50.87)), bool(false))) * 3.0), (true ? clamp(float(bitfieldExtract(int(resolution.x), 0, 0)), float(bitCount(msb8)), _GLF_IDENTITY(_GLF_IDENTITY(b_b * float(bitCount(msb8)), mix(float(_GLF_IDENTITY(b_b * float(bitCount(msb8)), (b_b * _GLF_IDENTITY(float(bitCount(msb8)), (true ? float(bitCount(msb8)) : _GLF_FUZZED(c)))) / 1.0)), float(_GLF_FUZZED(-50.87)), bool(false))), (_GLF_IDENTITY(_GLF_IDENTITY(b_b * float(bitCount(msb8)), mix(float(_GLF_IDENTITY(b_b * float(bitCount(msb8)), (b_b * _GLF_IDENTITY(float(bitCount(msb8)), (true ? float(bitCount(msb8)) : _GLF_FUZZED(c)))) / 1.0)), float(_GLF_FUZZED(-50.87)), bool(false))), (_GLF_IDENTITY(b_b * float(bitCount(msb8)), mix(float(_GLF_IDENTITY(b_b * float(bitCount(msb8)), (b_b * _GLF_IDENTITY(float(bitCount(msb8)), (true ? float(bitCount(msb8)) : _GLF_FUZZED(c)))) / 1.0)), float(_GLF_FUZZED(-50.87)), bool(false)))) + 0.0)) - 0.0) * 3.0) : _GLF_FUZZED(-21.11)))))));
    }
    {
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = vec4(0.4, -17.55, 925.234, -6670.3806);
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            int donor_replacementGLF_dead7data = _GLF_FUZZED(GLF_live0MATRIX_N);
            _GLF_struct_6 _GLF_struct_replacement_6 = _GLF_struct_6(_GLF_struct_7(bvec4(true, _GLF_IDENTITY(true, true && (true)), true, true), 1u), bvec3(true, true, true), mat3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), _GLF_FUZZED(bitCount(197974u)));
            {
                {
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(44.66, -2.3, 43.19, 74.54);
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    vec2 GLF_live14coord = _GLF_FUZZED(vec2(-32.76, -8.9));
                    vec4 GLF_live14res = _GLF_FUZZED(vec4(-549.262, 24.49, -7240.2344, -9.7));
                    if (GLF_live14coord.x < 1.0 && GLF_live14coord.y < 1.0) {
                        GLF_live14res = texture(GLF_live14tex, GLF_live14coord);
                    }
                }
                GLF_dead7tree[_GLF_MAKE_IN_BOUNDS_INT(msb8, 10)].rightIndex = _GLF_struct_replacement_6.donor_replacementGLF_dead7treeIndex;
                GLF_dead7makeTreeNode(GLF_dead7tree[_GLF_MAKE_IN_BOUNDS_INT(_GLF_struct_replacement_6.donor_replacementGLF_dead7treeIndex, 10)], donor_replacementGLF_dead7data);
                ;
            }
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = mat2x4(-478.313, -87.10, 76.40, -3.3, 545.114, -64.81, 84.20, 791.721)[1];
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
        }
        if (_GLF_DEAD(false)) {
            bool donor_replacementGLF_dead9c3 = _GLF_FUZZED(false);
            if (!donor_replacementGLF_dead9c3) {
                return GLF_dead9defaultColor();
            }
        }
        vec3 GLF_live1col = _GLF_FUZZED(vec3(-5.5, 8249.0497, -1.8));
        if (_GLF_DEAD(false)) {
            vec4 donor_replacementGLF_dead11c = _GLF_FUZZED(GLF_live1_GLF_color);
            if (donor_replacementGLF_dead11c[_GLF_MAKE_IN_BOUNDS_INT(msb8, _GLF_IDENTITY(4, 0 ^ (_GLF_IDENTITY(4, (_GLF_IDENTITY(4, (false ? _GLF_FUZZED(-89695) : 4))) | 0))))] >= 1.0) {
                donor_replacementGLF_dead11c[_GLF_MAKE_IN_BOUNDS_INT(msb8, 4)] = donor_replacementGLF_dead11c[_GLF_MAKE_IN_BOUNDS_INT(msb8, 4)] * donor_replacementGLF_dead11c[_GLF_MAKE_IN_BOUNDS_INT(msb8, 4)];
            }
        }
        vec2 GLF_live1uv = _GLF_FUZZED(vec2(-0.0, 8.7));
        if (_GLF_DEAD(false)) {
            {
                float GLF_live12limit = _GLF_FUZZED(-1008.2308);
                int GLF_live12looplimiter0 = 0;
                float GLF_live12ref = _GLF_FUZZED(((-6.3) * vec4(-386.337, 82.12, 6.7, 57.74)).z);
                float GLF_live12s = _GLF_FUZZED(5.3);
                for (int GLF_live12i = 1; GLF_live12i < 800; GLF_live12i++) {
                    if (GLF_live12looplimiter0 >= 3) {
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = vec4(-706.112, 0.3, -9.2, 4630.2357);
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                        break;
                    }
                    GLF_live12looplimiter0++;
                    {
                        if (mod(float(GLF_live12i), GLF_live12ref) <= 0.01) {
                            GLF_live12s += 0.2;
                        }
                        if (float(GLF_live12i) >= GLF_live12limit) {
                            ;
                        }
                    }
                }
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = cosh(vec4(2822.2205, -8.9, -8.9, 7824.6303));
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
            }
            vec3 donor_replacementGLF_dead4color = _GLF_FUZZED(log(vec3(-4.5, -3.7, -19.06)));
            {
                _GLF_IDENTITY(donor_replacementGLF_dead4color.z += float(GLF_dead4obj.numbers[3]), (false ? _GLF_FUZZED(s_g) : (donor_replacementGLF_dead4color.z += float(GLF_dead4obj.numbers[3]))));
            }
        }
        {
            vec2 GLF_live14coord = _GLF_FUZZED((vec2(39.08, -0.4) * mat2(-4.7, -374.654, float(true), vec4(-1.6, 12.12, 8441.4817, 96.38).x)));
            vec4 GLF_live14res = _GLF_FUZZED(vec4(273.648, -9.9, -1.5, 0.1));
            if (GLF_live14coord.x < 1.0 && GLF_live14coord.y < 1.0) {
                GLF_live14res = texture(GLF_live14tex, GLF_live14coord);
            }
        }
        {
            float GLF_live1stripe = _GLF_IDENTITY(GLF_live1compute_stripe(cos((GLF_live1uv.x + GLF_live1uv.y) * _GLF_IDENTITY(20.0, min(20.0, 20.0)))), (_GLF_IDENTITY(GLF_live1compute_stripe(cos((GLF_live1uv.x + GLF_live1uv.y) * _GLF_IDENTITY(20.0, min(20.0, 20.0)))), (GLF_live1compute_stripe(cos((GLF_live1uv.x + GLF_live1uv.y) * _GLF_IDENTITY(20.0, min(20.0, 20.0))))) + 0.0)) * 1.0);
            GLF_live1col = mix(vec3(.7, sinh(GLF_live1uv.x), _GLF_IDENTITY(GLF_live1uv.x, min(GLF_live1uv.x, _GLF_IDENTITY(GLF_live1uv.x, (GLF_live1uv.x) + 0.0)))), vec3(.3, .5, GLF_live1uv.x), GLF_live1stripe);
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(-8.8, 35.39, -84.59, 7.9);
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            GLF_live1_GLF_color = vec4(GLF_live1col, 1.0);
            ;
        }
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = (vec4(-4.6, 4.6, 23.24, 103.597) * mat4(5.1, -641.793, 3.7, -298.427, -46.97, -614.529, 9.4, 9.2, -7.7, -3.0, 1406.4361, 16.25, 59.77, -2886.8723, -1.6, 8879.0861));
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
    }
    {
        {
            ;
        }
    }
    return vec3(h_r, s_g, b_b);
    {
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        _GLF_color = sin(vec4(-720.171, 7.5, -82.40, 475.860));
        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= abs(0.0))))) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
    }
}

vec3 defaultColor() {
    {
        {
            GLF_live2_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
        }
    }
    {
        int GLF_live15looplimiter2 = 0;
        if (GLF_live15looplimiter2 >= 5) {
            ;
        }
    }
    if (_GLF_DEAD(false)) {
        {
            {
                {
                    ;
                }
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(1.3, -9.8, 5.9, 537.341);
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
            }
            ;
        }
    }
    return vec3(float(bitfieldExtract(int(resolution.y), 0, _GLF_IDENTITY(0, int(int(0))))));
}

float _GLF_outlined_1(float GLF_live0alpha2, float GLF_live0alpha3) {
    return GLF_live0alpha2 * GLF_live0alpha3;
}

float _GLF_outlined_2(float GLF_dead9b_b) {
    return clamp(0.0, 1.0, GLF_dead9b_b * 3.0);
}

vec3 drawShape(vec2 pos, vec2 square, vec3 setting) {
    {
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        _GLF_color = vec4(1.9, -1.9, 12.57, 47.31);
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
    }
    {
        {
            ;
        }
    }
    {
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        _GLF_color = degrees(vec4(862.090, -4.4, -871.305, -1678.0393));
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
    }
    int msb8 = 256;
    bool c1 = pos.x - setting.x < square.x;
    if (!c1) {
        {
            {
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = (+vec4(7067.6376));
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= determinant(mat4(0.0, 1.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0)))))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                int GLF_live12i = _GLF_FUZZED(-32697);
                float GLF_live12ref = _GLF_FUZZED(-0.2);
                float GLF_live12s = _GLF_FUZZED(vec2(-5.9, 6805.7728).r);
                if (mod(float(GLF_live12i), GLF_live12ref) <= 0.01) {
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = mod(vec4(19.83, 4.2, 5.8, -356.540), 8.3);
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    GLF_live12s += 0.2;
                }
            }
            if (_GLF_DEAD(false)) {
                float donor_replacementGLF_dead11s = _GLF_FUZZED(pow(dot(atanh(b_b), roundEven(h_r)), h_r));
                {
                    ;
                }
            }
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            if (_GLF_DEAD(false)) {
                vec4 donor_replacementGLF_dead11c = _GLF_FUZZED((_GLF_IDENTITY(h_r, min(_GLF_IDENTITY(h_r, min(h_r, h_r)), h_r)) * GLF_live1_GLF_color));
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = refract(vec4(-95.70, 45.54, -935.848, 691.271), dFdyFine(vec4(1.6, -77.18, -2008.3195, 313.738)), -553.451);
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                {
                    if (donor_replacementGLF_dead11c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live0MATRIX_N, 4)] >= 1.0) {
                        {
                            {
                                ;
                            }
                        }
                        donor_replacementGLF_dead11c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live0MATRIX_N, 4)] = donor_replacementGLF_dead11c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live0MATRIX_N, 4)] * donor_replacementGLF_dead11c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live0MATRIX_N, 4)];
                    }
                    {
                        int GLF_live14looplimiter0 = 0;
                        if (GLF_live14looplimiter0 >= 4) {
                            ;
                        }
                    }
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = (vec2(487.783, 573.533) * (mat4x2(-24.04, 2.7, 5.5, -229.895, -9641.8555, 42.95, -2981.7301, 4.0) / 910.501));
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                }
            }
            {
                float GLF_live12limit = _GLF_FUZZED(9080.0402);
                int GLF_live12looplimiter0 = 0;
                float GLF_live12ref = _GLF_FUZZED(3.3);
                float GLF_live12s = _GLF_FUZZED(5933.6505);
                for (int GLF_live12i = 1; GLF_live12i < 800; GLF_live12i++) {
                    if (GLF_live12looplimiter0 >= 3) {
                        break;
                    }
                    GLF_live12looplimiter0++;
                    {
                        if (mod(float(GLF_live12i), GLF_live12ref) <= 0.01) {
                            GLF_live12s += 0.2;
                        }
                        if (float(GLF_live12i) >= GLF_live12limit) {
                            ;
                        }
                    }
                }
            }
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(2.6, -5.1, -63.43, 0.4);
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            _GLF_color = log(normalize(vec4(8.7, 2.6, 2.6, -8940.6504)));
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                {
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(6315.7784, 379.351, -630.774, -939.397);
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    bool GLF_live13c6 = _GLF_FUZZED(bvec3(false, bvec2(bvec3(true, false, false))).z);
                    vec2 GLF_live13pos = _GLF_FUZZED(vec2(5048.3972, 16.65));
                    vec3 GLF_live13setting = _GLF_FUZZED((+vec3(-65.93)));
                    if (!GLF_live13c6) {
                        ;
                    }
                }
                _GLF_color = _GLF_outVarBackup_GLF_color;
                {
                    int GLF_live3i = _GLF_FUZZED(-57606);
                    ivec2 GLF_live3p = _GLF_FUZZED(ivec2(16077, -76510));
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = pow(vec4(-74.44, -9.7, 26.96, -8.3), step(9.5, vec4(7901.9957, 4074.6158, 25.29, -1.5)));
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    {
                        {
                            int GLF_live12looplimiter1 = 0;
                            if (GLF_live12looplimiter1 >= 3) {
                                ;
                            }
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = vec4(-7.8, 5911.5993, 3.8, -9.4);
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                        }
                        int GLF_live3looplimiter0 = 0;
                        for (GLF_live3i = 0; GLF_live3i < 100; GLF_live3i++) {
                            {
                                int GLF_live12i = _GLF_FUZZED(7534);
                                float GLF_live12ref = _GLF_FUZZED(float(82686u));
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = vec4(9.5, 9.1, 93.25, 270.816);
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                                float GLF_live12s = _GLF_FUZZED(-7654.4254);
                                if (mod(float(GLF_live12i), GLF_live12ref) <= 0.01) {
                                    GLF_live12s += 0.2;
                                }
                            }
                            if (GLF_live3looplimiter0 >= 5) {
                                if (_GLF_DEAD(false)) {
                                    for (int GLF_dead11i = 0; GLF_dead11i < 3; GLF_dead11i++) {
                                        if (GLF_live1_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11i, 4)] >= 1.0) {
                                            GLF_live1_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11i, 4)] = GLF_live1_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11i, 4)] * GLF_live1_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11i, 4)];
                                        }
                                    }
                                }
                                {
                                    {
                                        GLF_live13b_b = clamp(0.0, 1.0, GLF_live13b_b * 3.0);
                                    }
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        _GLF_color = vec4(9.1, -8.7, -6.7, 3.4);
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                    }
                                }
                                break;
                            }
                            GLF_live3looplimiter0++;
                            {
                                float GLF_live15alpha1 = _GLF_FUZZED(156.666);
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = vec4(cos(49.09), -2.4, -39.92, -4.0);
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                                int GLF_live15looplimiter1 = 0;
                                vec4 GLF_live15matrix_u = _GLF_FUZZED((vec4(-53.61, -1.6, 466.025, 626.024) + 3678.7877));
                                int GLF_live15u = _GLF_FUZZED(-63496);
                                {
                                    if (GLF_live15looplimiter1 >= 5) {
                                        ;
                                    }
                                    GLF_live15looplimiter1++;
                                    {
                                        GLF_live15alpha1 += pow(GLF_live15matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15u, 4)], 2.0);
                                    }
                                }
                            }
                            {
                                _GLF_IDENTITY(GLF_live3p = GLF_live3iter(GLF_live3p), ivec2(_GLF_ONE(1.0, injectionSwitch.y), _GLF_ONE(1.0, injectionSwitch.y)) * (GLF_live3p = GLF_live3iter(GLF_live3p)));
                            }
                        }
                        {
                            bool GLF_live13c4 = _GLF_FUZZED((false || true));
                            if (!GLF_live13c4) {
                                ;
                            }
                        }
                    }
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(-6.9, 92.42, 360.699, -2791.6315);
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= tan(_GLF_ZERO(0.0, injectionSwitch.x)))))) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                }
            }
            {
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_IDENTITY(0.0, (0.0) / 1.0))))) {
                        float donor_replacementGLF_dead11s = _GLF_FUZZED(s_g);
                        {
                            ;
                        }
                    }
                    {
                        {
                            float GLF_live12s = _GLF_FUZZED(-5.3);
                            {
                                GLF_live12s += 0.2;
                            }
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = vec4(6.9, 513.991, -559.972, -2.5);
                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                        }
                        ;
                    }
                }
                int GLF_live0i = _GLF_FUZZED(-45893);
                mat4 GLF_live0matrix_a = _GLF_FUZZED(mat4(651.477, -74.75, -47.22, -627.478, 41.89, 4.7, -618.412, -271.542, -47.35, -9.8, 7.3, -103.669, 5021.7004, -284.027, 4.8, 4.6));
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        bool donor_replacementGLF_dead9c5 = _GLF_FUZZED(c1);
                        vec2 donor_replacementGLF_dead9pos = _GLF_FUZZED(pos);
                        vec3 donor_replacementGLF_dead9setting = _GLF_FUZZED(setting);
                        if (!donor_replacementGLF_dead9c5) {
                            return _GLF_IDENTITY(GLF_dead9computeColor(donor_replacementGLF_dead9setting.z / 40.0, donor_replacementGLF_dead9pos), (GLF_dead9computeColor(donor_replacementGLF_dead9setting.z / 40.0, donor_replacementGLF_dead9pos)) + vec3(0.0, 0.0, 0.0));
                        }
                    }
                    float donor_replacementGLF_dead7v = _GLF_FUZZED(time);
                    if (donor_replacementGLF_dead7v < 4.0) {
                        ;
                    }
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = tan(vec4(-457.488, 331.991, -5.5, 1840.6545));
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                }
                vec4 GLF_live0matrix_b = _GLF_FUZZED(vec4(-467.842, -772.346, 1221.5438, -2.9));
                {
                    {
                        int GLF_live0looplimiter8 = 0;
                        for (int GLF_live0j = (GLF_live0MATRIX_N - 1); GLF_live0j >= (GLF_live0i + 1); GLF_live0j--) {
                            if (GLF_live0looplimiter8 >= 7) {
                                break;
                            }
                            GLF_live0looplimiter8++;
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = roundEven(vec4(827.586, 3.4, 322.599, -7.4));
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                            {
                                GLF_live0matrix_b[_GLF_MAKE_IN_BOUNDS_INT(GLF_live0i, 4)] -= (GLF_live0matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_live0i, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live0j, 4)] * GLF_live0matrix_b[_GLF_MAKE_IN_BOUNDS_INT(GLF_live0j, 4)]);
                                {
                                    vec2 GLF_live13position = _GLF_FUZZED((vec2(-6207.1596, -750.729) * (-85.82)));
                                    if (abs(GLF_live13position.y - GLF_live13position.x) < 0.5) {
                                        {
                                            vec4 _GLF_outVarBackup_GLF_color;
                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                            _GLF_color = vec4(-5.9, 15.04, 49.72, 53.76);
                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                            }
                                        }
                                        GLF_live13b_b = clamp(0.0, 1.0, GLF_live13b_b * 3.0);
                                    }
                                }
                            }
                        }
                    }
                    GLF_live0matrix_b[_GLF_MAKE_IN_BOUNDS_INT(GLF_live0i, 4)] /= GLF_live0matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_live0i, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live0i, 4)];
                }
                if (_GLF_IDENTITY(_GLF_DEAD(false), true && (_GLF_DEAD(false)))) {
                    vec3 donor_replacementGLF_dead4color = _GLF_FUZZED((_GLF_IDENTITY(setting, clamp(setting, _GLF_IDENTITY(setting, vec3(setting[0], setting[1], setting[2])), setting)) * length(9.4)));
                    vec2 donor_replacementGLF_dead4uv = _GLF_FUZZED(min(GLF_live1injectionSwitch, b_b));
                    if (donor_replacementGLF_dead4uv.y > (3.0 / 4.0)) {
                        donor_replacementGLF_dead4color.z += float(GLF_dead4obj.numbers[7]);
                    }
                }
            }
        }
        {
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(954.654, 1.3, -0.6, -1171.7448);
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            float GLF_live0alpha2 = _GLF_FUZZED(((vec4(-451.354, -261.342, 9627.6549, 4.8) + (-4391.3168)).z * (-8.6)));
            float GLF_live0alpha3 = _GLF_FUZZED((-(-5.8)));
            float GLF_live0beta = _GLF_FUZZED(6389.8821);
            int GLF_live0j = _GLF_FUZZED(-69154);
            int GLF_live0k = _GLF_FUZZED(int(true));
            if (_GLF_DEAD(false)) {
                {
                    ;
                }
                {
                    mat4 GLF_live15matrix_a = _GLF_FUZZED((mat4(-46.29, 885.317, -59.90, 6.8, 835.708, 0.0, -393.804, -55.11, 750.555, 4.0, -887.455, 7499.3135, 4939.4751, 586.441, 3599.9526, 139.815) + 2.6));
                    vec4 GLF_live15matrix_b = _GLF_FUZZED(vec4(3.6, -66.16, -51.44, -24.19));
                    {
                        int GLF_live15looplimiter9 = 0;
                        for (int GLF_live15i = (GLF_live15MATRIX_N - 1); GLF_live15i >= 0; GLF_live15i--) {
                            if (GLF_live15looplimiter9 >= 5) {
                                break;
                            }
                            GLF_live15looplimiter9++;
                            {
                                {
                                    int GLF_live15looplimiter8 = 0;
                                    for (int GLF_live15j = (GLF_live15MATRIX_N - 1); GLF_live15j >= (GLF_live15i + 1); GLF_live15j--) {
                                        if (GLF_live15looplimiter8 >= 5) {
                                            break;
                                        }
                                        GLF_live15looplimiter8++;
                                        {
                                            GLF_live15matrix_b[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15i, 4)] -= (GLF_live15matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15i, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live15j, 4)] * GLF_live15matrix_b[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15j, 4)]);
                                        }
                                    }
                                }
                                GLF_live15matrix_b[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15i, 4)] /= GLF_live15matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15i, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live15i, 4)];
                            }
                        }
                    }
                }
            }
            int GLF_live0looplimiter4 = 0;
            mat4 GLF_live0matrix_a = _GLF_FUZZED(mat4(-481.628, 5.4, _GLF_IDENTITY(-7625.2306, clamp(-7625.2306, -7625.2306, -7625.2306)), 4.8, -2283.9113, -3883.0925, -2076.6358, -3956.9983, 44.59, 0.8, 0.2, 3.6, -5880.3085, -906.052, -345.695, 70.60));
            vec4 GLF_live0matrix_u = _GLF_FUZZED(vec4(6.6, -5.4, 76.28, -2.7));
            {
                if (GLF_live0looplimiter4 >= 7) {
                    ;
                }
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(6.7, -2.5, 42.32, -7.8);
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                if (_GLF_DEAD(false)) {
                    {
                        ;
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = vec4(-270.281, 1173.3122, 5806.1605, 0.0);
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= determinant(mat4(0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0)))))) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                    }
                }
                GLF_live0looplimiter4++;
                {
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(-9.6, 8.7, -16.27, 9.3);
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    {
                        _GLF_struct_8 _GLF_struct_replacement_8 = _GLF_struct_8(_GLF_struct_9(bvec2(true, true), uvec3(1u, 1u, 1u), _GLF_struct_10(mat3x2(1.0, 1.0, 1.0, 1.0, 1.0, 1.0), true), _GLF_struct_11(mat4x2(1.0, 1.0, 1.0, 1.0, 1.0, _GLF_IDENTITY(1.0, clamp(_GLF_IDENTITY(1.0, (true ? 1.0 : _GLF_FUZZED(GLF_dead9h_r))), 1.0, 1.0)), 1.0, 1.0), mat2x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0)), _GLF_struct_12(bvec4(true, true, true, true), bvec4(true, true, true, true), 0, bvec2(true, true), mat2x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), mat4x2(1.0, 1.0, 1.0, 1.0, _GLF_IDENTITY(1.0, clamp(1.0, 1.0, _GLF_IDENTITY(1.0, (_GLF_IDENTITY(1.0, clamp(1.0, 1.0, 1.0))) + determinant(mat3(0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 1.0, 0.0))))), 1.0, 1.0, _GLF_IDENTITY(1.0, max(1.0, 1.0)))), 1.0), 1.0);
                        if (_GLF_DEAD(_GLF_IDENTITY(false, (false) && true))) {
                            {
                                GLF_dead9b_b = clamp(_GLF_IDENTITY(0.0, min(0.0, 0.0)), 1.0, GLF_dead9b_b * 3.0);
                            }
                        }
                        for (int GLF_live0a = GLF_live0MATRIX_N - 1; GLF_live0a >= GLF_live0k; GLF_live0a--) {
                            if (_GLF_struct_replacement_8._f0._f4.GLF_live0looplimiter2 >= 7) {
                                break;
                                {
                                    float GLF_live12limit = _GLF_FUZZED(vec3(900.096, -610.732, 2.1).r);
                                    float GLF_live12ref = _GLF_FUZZED(159.414);
                                    float GLF_live12s = _GLF_FUZZED(float(int(130138u)));
                                    {
                                        int GLF_live12looplimiter0 = 0;
                                        for (int GLF_live12i = 1; GLF_live12i < 800; GLF_live12i++) {
                                            if (GLF_live12looplimiter0 >= 3) {
                                                {
                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                    _GLF_color = vec4(6228.8621, 7706.6204, -1494.3203, -1.8);
                                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                    }
                                                }
                                                break;
                                            }
                                            GLF_live12looplimiter0++;
                                            {
                                                if (mod(float(GLF_live12i), GLF_live12ref) <= 0.01) {
                                                    GLF_live12s += 0.2;
                                                }
                                                if (float(GLF_live12i) >= GLF_live12limit) {
                                                    ;
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            {
                                vec4 GLF_live12c = _GLF_FUZZED(vec4(vec2(6.2, -6.7), ((240.969 * 9348.0160) * float(174694u)), -645.591));
                                {
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        _GLF_color = sign(vec4(929.507, -8.9, 4.7, -2126.6075));
                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                    }
                                    int GLF_live12looplimiter1 = 0;
                                    for (int GLF_live12i = 0; GLF_live12i < 3; GLF_live12i++) {
                                        {
                                            vec4 _GLF_outVarBackup_GLF_color;
                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                            _GLF_color = vec4(920.191, -52.43, -9868.8872, -9.7);
                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                            }
                                        }
                                        if (GLF_live12looplimiter1 >= 3) {
                                            break;
                                        }
                                        GLF_live12looplimiter1++;
                                        {
                                            if (GLF_live12c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12i, 4)] >= 1.0) {
                                                GLF_live12c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12i, 4)] = GLF_live12c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12i, 4)] * GLF_live12c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12i, 4)];
                                            }
                                        }
                                    }
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        _GLF_color = vec4(-69.39, -8.0, -1910.0752, -4.2);
                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= sin(0.0))))) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                    }
                                }
                            }
                            _GLF_struct_replacement_8._f0._f4.GLF_live0looplimiter2++;
                            {
                                if (_GLF_DEAD(_GLF_IDENTITY(false, true && (false)))) {
                                    vec4 donor_replacementGLF_dead11c = _GLF_FUZZED(radians(GLF_live0matrix_u));
                                    int donor_replacementGLF_dead11i = _GLF_FUZZED(((-18179) ^ GLF_live0MATRIX_N));
                                    if (_GLF_IDENTITY(donor_replacementGLF_dead11c, vec4(1.0, 1.0, 1.0, 1.0) * (donor_replacementGLF_dead11c))[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11i, 4)] >= 1.0) {
                                        donor_replacementGLF_dead11c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11i, 4)] = _GLF_IDENTITY(donor_replacementGLF_dead11c[_GLF_MAKE_IN_BOUNDS_INT(_GLF_IDENTITY(donor_replacementGLF_dead11i, clamp(_GLF_IDENTITY(donor_replacementGLF_dead11i, ~(~(_GLF_IDENTITY(donor_replacementGLF_dead11i, (donor_replacementGLF_dead11i) * 1)))), _GLF_IDENTITY(donor_replacementGLF_dead11i, clamp(donor_replacementGLF_dead11i, donor_replacementGLF_dead11i, donor_replacementGLF_dead11i)), donor_replacementGLF_dead11i)), 4)], clamp(_GLF_IDENTITY(donor_replacementGLF_dead11c[_GLF_MAKE_IN_BOUNDS_INT(_GLF_IDENTITY(donor_replacementGLF_dead11i, clamp(_GLF_IDENTITY(donor_replacementGLF_dead11i, ~(~(_GLF_IDENTITY(donor_replacementGLF_dead11i, (donor_replacementGLF_dead11i) * 1)))), _GLF_IDENTITY(donor_replacementGLF_dead11i, clamp(donor_replacementGLF_dead11i, donor_replacementGLF_dead11i, donor_replacementGLF_dead11i)), donor_replacementGLF_dead11i)), 4)], (donor_replacementGLF_dead11c[_GLF_MAKE_IN_BOUNDS_INT(_GLF_IDENTITY(donor_replacementGLF_dead11i, clamp(_GLF_IDENTITY(donor_replacementGLF_dead11i, ~(~(_GLF_IDENTITY(donor_replacementGLF_dead11i, (donor_replacementGLF_dead11i) * 1)))), _GLF_IDENTITY(donor_replacementGLF_dead11i, clamp(donor_replacementGLF_dead11i, donor_replacementGLF_dead11i, donor_replacementGLF_dead11i)), donor_replacementGLF_dead11i)), 4)]) - length(vec4(0.0, 0.0, 0.0, 0.0))), donor_replacementGLF_dead11c[_GLF_MAKE_IN_BOUNDS_INT(_GLF_IDENTITY(donor_replacementGLF_dead11i, clamp(_GLF_IDENTITY(donor_replacementGLF_dead11i, ~(~(_GLF_IDENTITY(donor_replacementGLF_dead11i, (donor_replacementGLF_dead11i) * 1)))), _GLF_IDENTITY(donor_replacementGLF_dead11i, clamp(donor_replacementGLF_dead11i, donor_replacementGLF_dead11i, donor_replacementGLF_dead11i)), donor_replacementGLF_dead11i)), 4)], donor_replacementGLF_dead11c[_GLF_MAKE_IN_BOUNDS_INT(_GLF_IDENTITY(donor_replacementGLF_dead11i, clamp(_GLF_IDENTITY(donor_replacementGLF_dead11i, ~(~(_GLF_IDENTITY(donor_replacementGLF_dead11i, (donor_replacementGLF_dead11i) * 1)))), _GLF_IDENTITY(donor_replacementGLF_dead11i, clamp(donor_replacementGLF_dead11i, donor_replacementGLF_dead11i, donor_replacementGLF_dead11i)), donor_replacementGLF_dead11i)), 4)])) * donor_replacementGLF_dead11c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11i, 4)];
                                        {
                                            vec4 _GLF_outVarBackup_GLF_color;
                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                            _GLF_color = vec4(-7.3, -64.05, 1631.2270, -3.7);
                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                            }
                                        }
                                    }
                                }
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = vec2(-2305.3324, 69.10).stss;
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                                GLF_live0alpha3 += GLF_live0matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_live0a, 4)] * GLF_live0matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_live0a, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live0j, 4)];
                                if (_GLF_DEAD(false)) {
                                    vec4 donor_replacementGLF_dead11c = _GLF_FUZZED(vec4(825.065, -464.299, -9.9, 7.6));
                                    for (int GLF_dead11i = 0; GLF_dead11i < 3; GLF_dead11i++) {
                                        if (donor_replacementGLF_dead11c[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11i, _GLF_IDENTITY(4, min(4, 4)))] >= 1.0) {
                                            donor_replacementGLF_dead11c[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11i, 4)] = donor_replacementGLF_dead11c[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11i, 4)] * donor_replacementGLF_dead11c[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11i, 4)];
                                        }
                                    }
                                }
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = log(vec4(8955.0187, -6469.2772, 9.7, 4.7));
                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= _GLF_ZERO(0.0, injectionSwitch.x))))) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                float donor_replacementGLF_dead11s = _GLF_FUZZED(s_g);
                                {
                                    ;
                                }
                            }
                        }
                    }
                    GLF_live0beta = _GLF_outlined_1(GLF_live0alpha2, GLF_live0alpha3);
                    {
                        int GLF_live0looplimiter3 = 0;
                        {
                            vec2 GLF_live14coord = _GLF_FUZZED(vec2(-5637.3972, 8223.6423));
                            int GLF_live14i = _GLF_FUZZED((-(93251 - 89231)));
                            int GLF_live14looplimiter0 = 0;
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = (vec4(-5.2, 7.5, -96.12, 439.234) / vec4(-9.3, -7.4, -6763.7699, 522.716));
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                            while (GLF_live14i < 1 && GLF_live14coord.x > 1.0 || GLF_live14coord.y > 1.0) {
                                if (GLF_live14looplimiter0 >= 4) {
                                    break;
                                }
                                GLF_live14looplimiter0++;
                                {
                                    if (GLF_live14coord.x > 1.0)
                                        GLF_live14coord.x -= 1.0;
                                    if (GLF_live14coord.y > 1.0)
                                        GLF_live14coord.y -= 1.0;
                                    GLF_live14coord *= 2.0;
                                    GLF_live14i++;
                                }
                            }
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            vec3 donor_replacementGLF_dead4color = _GLF_FUZZED(abs(vec3(-5.7, 84.54, -3.4)));
                            if (square.y > (2.0 / 4.0)) {
                                donor_replacementGLF_dead4color.y += float(GLF_dead4obj.numbers[6]);
                            }
                        }
                        for (int GLF_live0a = _GLF_IDENTITY(GLF_live0MATRIX_N, 0 ^ (GLF_live0MATRIX_N)) - 1; GLF_live0a >= GLF_live0k; GLF_live0a--) {
                            if (GLF_live0looplimiter3 >= 7) {
                                break;
                            }
                            GLF_live0looplimiter3++;
                            {
                                GLF_live0matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_live0a, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live0j, 4)] = GLF_live0matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_live0a, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live0j, 4)] - (GLF_live0beta * _GLF_IDENTITY(GLF_live0matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_live0a, 4)], max(GLF_live0matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_live0a, 4)], GLF_live0matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_live0a, 4)])));
                            }
                        }
                        {
                            int GLF_live15looplimiter1 = 0;
                            if (GLF_live15looplimiter1 >= 5) {
                                ;
                            }
                        }
                    }
                    GLF_live0alpha3 = 0.0;
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        int donor_replacementGLF_dead7baseIndex = _GLF_FUZZED(clamp((msb8 * msb8), GLF_live0looplimiter4, GLF_live0j));
                        int donor_replacementGLF_dead7data = _GLF_FUZZED(92691);
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = pow(inversesqrt(vec4(222.619, -8.4, 0.3, -16.56)), vec4(-5.7, -1503.5569, 753.649, 3259.4018));
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                        int donor_replacementGLF_dead7treeIndex = _GLF_FUZZED(int(144202u));
                        if (donor_replacementGLF_dead7data <= GLF_dead7tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead7baseIndex, 10)].data) {
                            {
                                vec4 GLF_live12c = _GLF_FUZZED(vec4(-60.85, -71.06, -8.9, 37.75));
                                int GLF_live12looplimiter1 = 0;
                                for (int GLF_live12i = 0; GLF_live12i < 3; GLF_live12i++) {
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        _GLF_color = (false ? vec4(-4680.0202, 5433.6712, -611.449, -3651.5693) : exp(atanh(vec4(1106.6744, 6664.0630, -3.5, 1741.5870))));
                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                    }
                                    if (GLF_live12looplimiter1 >= 3) {
                                        break;
                                    }
                                    GLF_live12looplimiter1++;
                                    {
                                        if (GLF_live12c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12i, 4)] >= 1.0) {
                                            {
                                                vec4 _GLF_outVarBackup_GLF_color;
                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                _GLF_color = vec4(-4827.3418, 5.0, -8.0, 51.91);
                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                }
                                            }
                                            GLF_live12c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12i, 4)] = GLF_live12c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12i, 4)] * GLF_live12c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12i, 4)];
                                        }
                                    }
                                }
                            }
                            if (GLF_dead7tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead7baseIndex, 10)].leftIndex == -1) {
                                GLF_dead7tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead7baseIndex, 10)].leftIndex = donor_replacementGLF_dead7treeIndex;
                                GLF_dead7makeTreeNode(GLF_dead7tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead7treeIndex, 10)], donor_replacementGLF_dead7data);
                                ;
                            } else {
                                donor_replacementGLF_dead7baseIndex = GLF_dead7tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead7baseIndex, 10)].leftIndex;
                                {
                                    {
                                        ;
                                    }
                                }
                                ;
                            }
                        } else {
                            if (GLF_dead7tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead7baseIndex, 10)].rightIndex == -1) {
                                _GLF_IDENTITY(GLF_dead7tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead7baseIndex, 10)].rightIndex = donor_replacementGLF_dead7treeIndex, 0 | (GLF_dead7tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead7baseIndex, 10)].rightIndex = donor_replacementGLF_dead7treeIndex));
                                GLF_dead7makeTreeNode(GLF_dead7tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead7treeIndex, 10)], donor_replacementGLF_dead7data);
                                ;
                            } else {
                                donor_replacementGLF_dead7baseIndex = GLF_dead7tree[_GLF_IDENTITY(_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead7baseIndex, 10), (_GLF_IDENTITY(_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead7baseIndex, 10), clamp(_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead7baseIndex, 10), _GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead7baseIndex, 10), _GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead7baseIndex, 10)))) ^ 0)].rightIndex;
                                ;
                            }
                        }
                    }
                    GLF_live0beta = 0.0;
                }
            }
        }
        return defaultColor();
    }
    bool c2 = pos.x + setting.x > _GLF_IDENTITY(square, vec2(mat2x3(_GLF_IDENTITY(square, min(square, square)), 1.0, 0.0, 0.0, 0.0))).x;
    {
        vec2 GLF_live14coord = _GLF_FUZZED(vec2(8.6, -7092.8617));
        int GLF_live14i = _GLF_FUZZED(27308);
        int GLF_live14looplimiter0 = 0;
        while (GLF_live14i < 1 && GLF_live14coord.x > 1.0 || GLF_live14coord.y > 1.0) {
            if (GLF_live14looplimiter0 >= 4) {
                break;
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(-99.84, 5.8, 4960.3821, 98.31);
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
            }
            GLF_live14looplimiter0++;
            {
                if (GLF_live14coord.x > 1.0)
                    GLF_live14coord.x -= 1.0;
                if (GLF_live14coord.y > 1.0)
                    GLF_live14coord.y -= 1.0;
                GLF_live14coord *= 2.0;
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = (mat4(-1.3, -242.130, 70.78, -1.4, -944.864, 48.39, -0.9, 9732.2133, 1455.5268, -0.6, 8.1, -9.6, -57.96, -5.9, -4.6, 6108.5608) * vec4(3.4, -0.1, 7672.8454, -82.69));
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                GLF_live14i++;
            }
        }
    }
    if (!c2) {
        {
            vec2 GLF_live14coord = _GLF_FUZZED(vec2(32.95, -6.5));
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = intBitsToFloat(ivec4(-51181, -35622, -91029, -58252)).tssp;
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            int GLF_live14i = _GLF_FUZZED(((-59447) & (79671)));
            int GLF_live14looplimiter0 = 0;
            while (GLF_live14i < 1 && GLF_live14coord.x > 1.0 || GLF_live14coord.y > 1.0) {
                if (GLF_live14looplimiter0 >= 4) {
                    break;
                }
                GLF_live14looplimiter0++;
                {
                    if (GLF_live14coord.x > 1.0)
                        GLF_live14coord.x -= 1.0;
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = sign((asin(vec4(76.19, 27.93, 51.65, 39.86)) * mat4(-22.17, 0.3, -4941.7891, 7.7, -4449.7212, 5.2, 814.962, 1541.6936, 5.6, 2800.7140, 8394.1666, 84.79, 23.20, -9870.5584, -798.864, -9991.8031)));
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    if (GLF_live14coord.y > 1.0)
                        GLF_live14coord.y -= 1.0;
                    GLF_live14coord *= 2.0;
                    GLF_live14i++;
                }
            }
        }
        {
            int GLF_live3i = _GLF_FUZZED(28339);
            ivec2 GLF_live3p = _GLF_FUZZED(ivec2(98461, -55195));
            {
                int GLF_live3looplimiter0 = 0;
                for (GLF_live3i = 0; GLF_live3i < 100; GLF_live3i++) {
                    if (GLF_live3looplimiter0 >= 5) {
                        break;
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = vec4(-8.4, -7.2, -0.5, -3.3);
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                    }
                    GLF_live3looplimiter0++;
                    {
                        {
                            int GLF_live15a = _GLF_FUZZED(-43742);
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = round(vec4(780.777, 31.96, -1.4, -8.1));
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                            float GLF_live15beta = _GLF_FUZZED(8.8);
                            int GLF_live15j = _GLF_FUZZED(89373);
                            int GLF_live15looplimiter3 = 0;
                            mat4 GLF_live15matrix_a = _GLF_FUZZED(mat4(7106.1936, -1.7, -482.047, 28.48, -9.2, 7.9, -66.75, 289.429, -729.128, -348.253, 9.3, -902.253, 547.332, -5.5, -3156.0186, 262.316));
                            vec4 GLF_live15matrix_u = _GLF_FUZZED((vec4(-0.6, -505.612, 1.9, 627.736) + vec4(3.1, -4.9, 5.3, -19.79)));
                            {
                                if (GLF_live15looplimiter3 >= 5) {
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        _GLF_color = vec4(2.6, 9822.0430, -21.13, -873.783);
                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                    }
                                    ;
                                }
                                GLF_live15looplimiter3++;
                                {
                                    GLF_live15matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15a, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live15j, 4)] = GLF_live15matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15a, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live15j, 4)] - (GLF_live15beta * GLF_live15matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15a, 4)]);
                                }
                            }
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = vec4(-46.62, -22.07, -867.989, -2.1);
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                        }
                        GLF_live3p = GLF_live3iter(GLF_live3p);
                        if (_GLF_IDENTITY(_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))), !(_GLF_IDENTITY(!(_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))), (_GLF_IDENTITY(!(_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))), (!(_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))))) || false)) || false)))) {
                            vec3 donor_replacementGLF_dead4color = _GLF_FUZZED(vec3(5472.0317, -68.81, -415.830));
                            {
                                {
                                    ;
                                }
                            }
                            vec2 donor_replacementGLF_dead4uv = _GLF_FUZZED(pos);
                            if (donor_replacementGLF_dead4uv.y > (2.0 / 4.0)) {
                                donor_replacementGLF_dead4color.y += float(GLF_dead4obj.numbers[6]);
                            }
                        }
                    }
                    {
                        int GLF_live14looplimiter0 = 0;
                        if (GLF_live14looplimiter0 >= 4) {
                            ;
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = step(vec4(155.288, 4179.7942, 989.434, -59.65), vec4(-8458.9320, -7.3, -0.9, 7556.2645));
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                        }
                    }
                }
            }
            {
                vec2 GLF_live14coord = _GLF_FUZZED((vec2(49.94, -1.1) * vec2(3.1, 9907.0020).ss));
                int GLF_live14i = _GLF_FUZZED(int(121943u));
                {
                    if (GLF_live14coord.x > 1.0)
                        GLF_live14coord.x -= 1.0;
                    if (GLF_live14coord.y > 1.0)
                        GLF_live14coord.y -= 1.0;
                    GLF_live14coord *= 2.0;
                    GLF_live14i++;
                }
            }
        }
        {
            float GLF_live15alpha3 = _GLF_FUZZED(((-7.3) + 43.20));
            int GLF_live15k = _GLF_FUZZED((~27437));
            int GLF_live15looplimiter5 = 0;
            vec4 GLF_live15matrix_b = _GLF_FUZZED(vec2(-797.765, -2.4).ss.ssst);
            vec4 GLF_live15matrix_u = _GLF_FUZZED(vec4(0.1, 117.894, 1.0, -6.1));
            for (int GLF_live15b = GLF_live15MATRIX_N - 1; GLF_live15b >= GLF_live15k; GLF_live15b--) {
                if (GLF_live15looplimiter5 >= 5) {
                    break;
                }
                GLF_live15looplimiter5++;
                {
                    GLF_live15alpha3 += GLF_live15matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15b, 4)] * GLF_live15matrix_b[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15b, 4)];
                }
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = sqrt(vec4(7.7, 2.0, -16.29, -71.69));
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
            }
        }
        return defaultColor();
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (_GLF_IDENTITY(gl_FragCoord.y, mix(float(_GLF_IDENTITY(gl_FragCoord.y, (gl_FragCoord.y) * 1.0)), float(_GLF_FUZZED(8253.1109)), bool(false))) < tan(0.0))))) {
        {
            return _GLF_IDENTITY(GLF_dead9defaultColor(), (_GLF_IDENTITY(GLF_dead9defaultColor(), (true ? GLF_dead9defaultColor() : _GLF_FUZZED(vec3(9.9, 47.60, 6.5))))) / vec3(1.0, 1.0, 1.0));
        }
    }
    bool c3 = pos.y - setting.x < square.y;
    if (!c3) {
        return defaultColor();
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = vec4(-6.4, -8.9, -193.089, -2263.8493);
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
        {
            vec4 _GLF_outVarBackup_GLF_color;
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = dFdxFine(vec4(-3341.6477, -0.8, 1.7, 1507.7727));
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= sin(0.0))))) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = vec4(0.1, -_GLF_IDENTITY(15.38, min(15.38, _GLF_IDENTITY(15.38, (15.38) + 0.0))), 841.086, 869.856);
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                _GLF_IDENTITY(_GLF_color = _GLF_outVarBackup_GLF_color, sin(abs(vec4(0.0, 0.0, 0.0, 0.0))) + (_GLF_color = _GLF_outVarBackup_GLF_color));
            }
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = (mat4x2(63.66, -9.7, 52.11, -3.0, -735.455, 94.09, 6.6, 5.9), (vec4(5123.8528, 0.0, -1.5, -6876.2619) - float(true)));
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
        }
        if (_GLF_DEAD(false)) {
            bool donor_replacementGLF_dead9c3 = _GLF_FUZZED(bvec2(false, true)[1]);
            if (!donor_replacementGLF_dead9c3) {
                return GLF_dead9defaultColor();
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = asinh(vec4(8942.1707, -34.44, -6.3, -6.6));
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
            }
        }
    }
    {
        bool GLF_live13c5 = _GLF_FUZZED((mat4(7653.1204, 1.9, 371.140, -112.024, -7.5, -141.161, 8.2, 51.98, 9.1, 5.3, -278.967, -6722.9673, -419.489, -1.9, -1.3, 0.2) != mat4(76.53, -8.5, -5.3, -90.27, -30.12, -3298.6323, 4.9, 60.18, -3.4, 6.7, -85.16, 19.57, -198.215, 869.789, 7759.8705, -4087.6551)));
        vec2 GLF_live13pos = _GLF_FUZZED(vec2(545.838, -2.1));
        vec3 GLF_live13setting = _GLF_FUZZED((mat3(-181.807, 441.911, -209.382, 2.7, -3322.9497, 3.1, -3.0, -2486.6261, -328.997) * vec3(-6.6, 43.89, -84.01)));
        if (!GLF_live13c5) {
            ;
        }
    }
    bool c4 = pos.y + setting.x > square.y;
    if (!c4) {
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = mix(vec4(7496.7747, -3946.7557, 7.0, 0.0), vec4(948.929, 855.740, 2726.0877, -392.792), (687.649 / vec4(6266.4176, 109.539, 6.2, 127.651)));
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
        if (_GLF_DEAD(false)) {
            {
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = tan(vec4(-47.64, 820.798, 850.616, 52.65));
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                int GLF_live15a = _GLF_FUZZED(72095);
                float GLF_live15alpha3 = _GLF_FUZZED(1579.2896);
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(-6974.6429, -70.71, -7381.6641, 676.461);
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                int GLF_live15j = _GLF_FUZZED(94607);
                mat4 GLF_live15matrix_a = _GLF_FUZZED(mat4(382.906, -9.0, 391.353, -4.9, 5329.6457, 6.6, -3.5, 2.5, 3.8, 50.98, -4.3, -1616.4428, -2830.7903, 735.983, -441.313, -62.05));
                vec4 GLF_live15matrix_u = _GLF_FUZZED(vec4(4606.2219, 1.7, 84.31, 9.2));
                {
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(-97.05, 2.4, -5.5, 7067.8359);
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= length(vec3(0.0, 0.0, 0.0)))))) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    GLF_live15alpha3 += GLF_live15matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15a, 4)] * GLF_live15matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15a, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live15j, 4)];
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = (uvec3(84477u, 92896u, 128258u), vec4(5.2, 0.9, 7.3, -98.32));
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                }
            }
            int donor_replacementGLF_dead7baseIndex = _GLF_FUZZED(msb8);
            {
                donor_replacementGLF_dead7baseIndex = _GLF_IDENTITY(GLF_dead7tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead7baseIndex, 10)].rightIndex, (GLF_dead7tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead7baseIndex, 10)].rightIndex) << 0);
                ;
                {
                    vec2 GLF_live14coord = _GLF_FUZZED(vec2(-191.385, -1.2));
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = radians((5.8 + vec4(-558.924, -7443.8775, 9.7, -5.2)));
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    vec4 GLF_live14res = _GLF_FUZZED(vec4(1.3, -976.047, 1.7, -1.8));
                    if (GLF_live14coord.x < 1.0 && GLF_live14coord.y < 1.0) {
                        GLF_live14res = texture(GLF_live14tex, GLF_live14coord);
                    }
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(2.3, -8.1, -53.98, -920.420);
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    bool donor_replacementGLF_dead9c1 = _GLF_FUZZED(false);
                    if (!donor_replacementGLF_dead9c1) {
                        return GLF_dead9defaultColor();
                    }
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = sinh(vec4(6.9, 2901.7774, -55.14, -616.738));
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                }
                {
                    int GLF_live15k = _GLF_FUZZED((true ? int(199937u) : ((-89165) | (-76426))));
                    int GLF_live15looplimiter0 = 0;
                    float GLF_live15magnitudeX = _GLF_FUZZED(2.6);
                    mat4 GLF_live15matrix_a = _GLF_FUZZED(((-mat4(-569.756, 6.9, -9.7, 18.35, -8.0, 9.2, 5307.5454, -8883.5679, 472.322, -0.0, -6.9, 78.47, 0.3, 7.5, 279.593, -9841.8145)) + mat4(-7.0, 0.7, 9971.4365, -6.0, -5.7, 4.3, -563.851, -238.560, 8782.2576, -717.238, -85.99, -812.061, 1.1, 907.568, -7246.6312, -2.5)));
                    vec4 GLF_live15matrix_u = _GLF_FUZZED(vec3(3.9, 9920.0655, -43.10).rgbr);
                    int GLF_live15x = _GLF_FUZZED(-41079);
                    {
                        if (GLF_live15looplimiter0 >= 5) {
                            ;
                        }
                        GLF_live15looplimiter0++;
                        {
                            GLF_live15magnitudeX += pow(GLF_live15matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15x, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live15k, 4)], 2.0);
                            GLF_live15matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15x, 4)] = GLF_live15matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15x, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live15k, 4)];
                        }
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = fma(clamp(vec4(9.7, 4.9, 31.08, -9.5), -3850.4354, 749.871), cosh(vec4(5320.5204, 9111.5607, 4.5, -201.153)), vec4(1.2, 7.7, 53.84, -23.13));
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                    }
                }
            }
            if (_GLF_IDENTITY(_GLF_DEAD(false), (_GLF_DEAD(false)) && true)) {
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(-8612.3415, vec2(8.8, -0.0), step(log2(9.2), -4.8));
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                {
                    return GLF_dead9computeColor(setting.z / 40.0, pos);
                }
            }
        }
        return defaultColor();
        {
            {
                ;
            }
        }
    }
    bool c5 = pos.x - (setting.x - _GLF_IDENTITY(setting, max(_GLF_IDENTITY(setting, (true ? setting : _GLF_FUZZED(setting))), setting)).y) < square.x;
    if (!c5) {
        return computeColor(setting.z / _GLF_IDENTITY((5.0 * float(findMSB(msb8))), max((_GLF_IDENTITY(5.0 * float(findMSB(msb8)), 0.0 + (5.0 * float(findMSB(msb8))))), _GLF_IDENTITY((5.0 * float(findMSB(msb8))), (false ? _GLF_FUZZED(s_g) : (5.0 * float(findMSB(msb8))))))), pos);
    }
    bool c6 = pos.x + (setting.x - setting.y) > square.x;
    if (!c6) {
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
            float donor_replacementGLF_dead11s = _GLF_FUZZED(-242.719);
            {
                donor_replacementGLF_dead11s += 0.2;
            }
        }
        return computeColor(setting.z / (5.0 * float(findMSB(_GLF_IDENTITY(msb8, clamp(msb8, _GLF_IDENTITY(msb8, clamp(msb8, msb8, msb8)), msb8))))), pos);
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (_GLF_IDENTITY(gl_FragCoord, (gl_FragCoord) / vec4(1.0, 1.0, 1.0, 1.0)).x < determinant(mat4(0.0, 0.0, 1.0, 1.0, 0.0, 0.0, _GLF_IDENTITY(1.0, 1.0 * (_GLF_IDENTITY(1.0, (_GLF_IDENTITY(1.0, clamp(1.0, 1.0, 1.0))) / 1.0))), 0.0, 0.0, sin(0.0), 0.0, 0.0, 0.0, 0.0, 0.0, 0.0)))))) {
        {
            ;
        }
    }
    bool c7 = pos.y - (setting.x - setting.y) < square.y;
    if (!c7) {
        {
            {
                float GLF_live15alpha3 = _GLF_FUZZED(0.9);
                int GLF_live15j = _GLF_FUZZED(int(false));
                int GLF_live15k = _GLF_FUZZED(((-17491) | 50869));
                mat4 GLF_live15matrix_a = _GLF_FUZZED((50.43 * mat4(6.0, -9400.3967, -5969.3555, -7.3, -5.1, 4016.6573, 7805.7959, -95.11, -50.95, -6888.7824, 3203.0791, -5904.1247, -5.4, -7.0, 719.665, 7288.0308)));
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = exp(vec4(5659.9931, 85.37, -3824.7969, -7.0));
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                vec4 GLF_live15matrix_u = _GLF_FUZZED(vec4(-1.6, 71.63, -0.3, 64.15));
                {
                    int GLF_live15looplimiter2 = 0;
                    for (int GLF_live15a = GLF_live15MATRIX_N - 1; GLF_live15a >= GLF_live15k; GLF_live15a--) {
                        if (GLF_live15looplimiter2 >= 5) {
                            break;
                        }
                        GLF_live15looplimiter2++;
                        {
                            GLF_live15alpha3 += GLF_live15matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15a, 4)] * GLF_live15matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15a, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live15j, 4)];
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = min(vec4(84.16, 9.1, -36.70, -50.29), vec4(-666.771, 1.5, 51.67, -94.70));
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                        }
                    }
                }
            }
            vec3 GLF_live1col = _GLF_FUZZED(vec3(7.6, 8.1, -1059.8673));
            vec2 GLF_live1uv = _GLF_FUZZED(vec2(vec4(7001.1493, -50.94, -264.586, 662.769)));
            {
                float GLF_live1stripe = GLF_live1compute_stripe(cos((GLF_live1uv.x + _GLF_IDENTITY(GLF_live1uv, clamp(GLF_live1uv, GLF_live1uv, GLF_live1uv)).y) * 20.0));
                GLF_live1col = mix(vec3(.7, sinh(_GLF_IDENTITY(GLF_live1uv, vec2(GLF_live1uv[0], GLF_live1uv[1])).x), GLF_live1uv.x), vec3(.3, .5, GLF_live1uv.x), GLF_live1stripe);
                GLF_live1_GLF_color = vec4(GLF_live1col, 1.0);
                ;
                {
                    float GLF_live12s = _GLF_FUZZED(float(60248));
                    {
                        ;
                    }
                }
            }
        }
        return computeColor(setting.z / (5.0 * float(_GLF_IDENTITY(findMSB(msb8), (findMSB(msb8)) + 0))), _GLF_IDENTITY(pos, max(pos, pos)));
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            {
                GLF_dead9b_b = _GLF_outlined_2(GLF_dead9b_b);
            }
        }
    }
    bool c8 = pos.y + (setting.x - setting.y) > square.y;
    if (!c8) {
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = trunc(vec3(-884.682, -2.1, 4960.3459)).ptpt;
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= _GLF_IDENTITY(dot(vec3(0.0, 1.0, 0.0), vec3(1.0, 0.0, 1.0)), dot(vec3(0.0, 1.0, 0.0), vec3(1.0, 0.0, 1.0))))))) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
        {
            {
                ;
            }
        }
        return computeColor(setting.z / (_GLF_IDENTITY(5.0, (true ? _GLF_IDENTITY(5.0, _GLF_IDENTITY(mix(float(5.0), float(_GLF_FUZZED(7134.6400)), bool(false)), min(mix(float(5.0), float(_GLF_FUZZED(7134.6400)), bool(false)), mix(float(5.0), float(_GLF_FUZZED(7134.6400)), bool(false))))) : _GLF_FUZZED(b_b))) * float(findMSB(msb8))), pos);
    }
    {
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        _GLF_color = sin(vec4(-16.76, -4.7, -918.110, -9.6));
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
    }
    {
        vec4 _GLF_outVarBackup_GLF_color;
        {
            bool GLF_live13c7 = _GLF_FUZZED((mat3(5425.3885, 556.949, 40.51, -2533.1085, -4428.0128, 2332.6315, 4788.0601, 313.358, 9905.0588) != mat3(-7502.3026, 45.05, -6962.9853, -8.4, 8.0, -9.6, 93.56, 5.4, -144.033)));
            vec2 GLF_live13pos = _GLF_FUZZED(vec2(-5.8, 7550.2007));
            vec3 GLF_live13setting = _GLF_FUZZED(vec3(1921.4253, 2.7, 477.481));
            if (!GLF_live13c7) {
                ;
            }
        }
        _GLF_outVarBackup_GLF_color = _GLF_color;
        {
            vec2 GLF_live14coord = _GLF_FUZZED((mat2(-1043.1755, -71.73, -7.9, -5577.6132) * vec2(0.7, -9.0)));
            int GLF_live14i = _GLF_FUZZED(int((37903u == 168282u)));
            {
                if (GLF_live14coord.x > 1.0)
                    GLF_live14coord.x -= 1.0;
                if (GLF_live14coord.y > 1.0)
                    GLF_live14coord.y -= 1.0;
                GLF_live14coord *= 2.0;
                GLF_live14i++;
            }
        }
        _GLF_color = smoothstep(vec4(-859.331, 4.7, 281.712, 7.7), vec4(1098.0861, 1.4, 992.815, _GLF_IDENTITY(-1.4, (_GLF_IDENTITY(-1.4, max(-1.4, -1.4))) / 1.0)), vec4(4.5, _GLF_IDENTITY(3.2, (true ? 3.2 : _GLF_FUZZED(h_r))), -51.67, -5.3));
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = ceil(vec4(-34.93, 29.52, 7.6, -569.940));
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(-501.655, -789.110, 9787.8434, -3.9);
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
            {
                ;
            }
        }
    }
    return defaultColor();
}

vec3 _GLF_outlined_0(vec3 d) {
    return vec3(d);
    {
        float GLF_live12limit = _GLF_FUZZED((-58.15));
        int GLF_live12looplimiter0 = 0;
        float GLF_live12ref = _GLF_FUZZED(float(false));
        float GLF_live12s = _GLF_FUZZED((-641.674));
        for (int GLF_live12i = 1; GLF_live12i < 800; GLF_live12i++) {
            if (GLF_live12looplimiter0 >= 3) {
                break;
            }
            GLF_live12looplimiter0++;
            {
                if (mod(float(GLF_live12i), GLF_live12ref) <= 0.01) {
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = refract((+vec4(70.65, 15.57, -2.6, -3218.7220)), vec4(-5056.5689, -57.17, -69.75, 5181.0081), 14.91);
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    GLF_live12s += 0.2;
                }
                if (float(GLF_live12i) >= GLF_live12limit) {
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = intBitsToFloat(bitCount(clamp(ivec4(-79962, -99144, 31636, 50089), ivec4(-28121, -17506, -93377, 67421), ivec4(2511, -91966, -75562, -12230))));
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    ;
                }
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(-6.5, -4.9, -390.063, 9401.0034);
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
            }
        }
    }
}

vec3 computePoint(mat2 rotationMatrix) {
    int msb8 = 256;
    vec2 aspect;
    {
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        _GLF_color = vec4(-6.2, 1606.0059, 9.5, -36.22);
        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= tan(0.0))))) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
    }
    aspect = _GLF_IDENTITY(resolution.xy, (true ? _GLF_IDENTITY(resolution.xy, (resolution.xy) * mat2(1.0)) : _GLF_FUZZED(aspect))) / min(resolution.x, resolution.y);
    vec2 position;
    position = (gl_FragCoord.xy / _GLF_IDENTITY(resolution, mix(vec2(_GLF_FUZZED(281.302), _GLF_FUZZED(4.1)), vec2(_GLF_IDENTITY((resolution)[_GLF_IDENTITY(0, int(_GLF_ZERO(0.0, injectionSwitch.x)) + (0))], (true ? (resolution)[_GLF_IDENTITY(0, int(_GLF_ZERO(0.0, injectionSwitch.x)) + (0))] : _GLF_FUZZED(183.392))), (resolution)[1]), bvec2(true, true))).xy) * _GLF_IDENTITY(aspect, mix(vec2(_GLF_FUZZED(vec4(5453.5498, -89.70, -888.230, -3058.5390).g), _GLF_FUZZED(968.316)), vec2(_GLF_IDENTITY((aspect)[0], mix(float((aspect)[0]), float(_GLF_FUZZED(-7.0)), bool(false))), (aspect)[1]), bvec2(true, true)));
    vec2 center;
    center = vec2(0.5) * aspect;
    position *= rotationMatrix;
    center *= rotationMatrix;
    {
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        _GLF_color = abs(max(vec4(3443.5822, -410.362, -496.890, -1518.8875), vec4(7.3, 6.6, 3174.2624, 5.7)));
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
    }
    vec3 result = vec3(0.0);
    for (int i = bitfieldInsert(35, 0, 0, bitfieldExtract(int(resolution.x), 0, 0)); i >= bitfieldReverse(bitfieldExtract(int(resolution.x), 0, 0)); i--) {
        vec3 d;
        d = drawShape(position, center + _GLF_IDENTITY(vec2(_GLF_IDENTITY(sin(float(i) / (float(bitCount(msb8)) * 10.0) + time) / 4.0 * float(bitCount(msb8)), clamp(sin(float(i) / (float(bitCount(msb8)) * 10.0) + time) / 4.0 * float(bitCount(msb8)), _GLF_IDENTITY(sin(float(i) / (float(bitCount(msb8)) * 10.0) + time) / 4.0 * float(bitCount(msb8)), clamp(sin(float(i) / (float(bitCount(msb8)) * 10.0) + time) / 4.0 * float(bitCount(msb8)), sin(float(i) / (float(bitCount(msb8)) * 10.0) + time) / 4.0 * float(bitCount(msb8)), sin(float(i) / (float(bitCount(msb8)) * 10.0) + time) / 4.0 * float(bitCount(msb8)))), _GLF_IDENTITY(sin(float(i) / (float(bitCount(msb8)) * 10.0) + time) / 4.0 * float(bitCount(msb8)), min(sin(float(i) / (float(bitCount(msb8)) * 10.0) + time) / 4.0 * float(bitCount(msb8)), _GLF_IDENTITY(sin(float(i) / (float(bitCount(msb8)) * 10.0) + time) / 4.0 * float(bitCount(msb8)), mix(float(sin(float(i) / (float(bitCount(msb8)) * 10.0) + time) / 4.0 * float(bitCount(msb8))), float(_GLF_FUZZED(-2.3)), bool(false))))))), float(bitfieldExtract(int(resolution.x), 0, 0))), vec2(1.0, 1.0) * (vec2(_GLF_IDENTITY(sin(float(i) / (float(bitCount(msb8)) * 10.0) + time) / 4.0 * float(bitCount(msb8)), clamp(sin(float(i) / (float(bitCount(msb8)) * 10.0) + time) / 4.0 * float(bitCount(msb8)), _GLF_IDENTITY(sin(float(i) / (float(bitCount(msb8)) * 10.0) + time) / 4.0 * float(bitCount(msb8)), clamp(sin(float(i) / (float(bitCount(msb8)) * 10.0) + time) / 4.0 * float(bitCount(msb8)), sin(float(i) / (float(bitCount(msb8)) * 10.0) + time) / 4.0 * float(bitCount(msb8)), sin(float(i) / (float(bitCount(msb8)) * 10.0) + time) / 4.0 * float(bitCount(msb8)))), _GLF_IDENTITY(sin(float(i) / (float(bitCount(msb8)) * 10.0) + time) / 4.0 * float(bitCount(msb8)), min(sin(float(i) / (float(bitCount(msb8)) * 10.0) + time) / 4.0 * float(bitCount(msb8)), _GLF_IDENTITY(sin(float(i) / (float(bitCount(msb8)) * 10.0) + time) / 4.0 * float(bitCount(msb8)), mix(float(sin(float(i) / (float(bitCount(msb8)) * 10.0) + time) / 4.0 * float(bitCount(msb8))), float(_GLF_FUZZED(-2.3)), bool(false))))))), float(bitfieldExtract(int(resolution.x), 0, 0))))), vec3(0.01 + sin(float(_GLF_IDENTITY(i, ~(~(_GLF_IDENTITY(i, min(i, i)))))) / 100.0 * float(bitCount(msb8))), 0.01, float(i)));
        if (length(d) <= float(bitfieldExtract(int(_GLF_IDENTITY(resolution, _GLF_IDENTITY(vec2(mat2(resolution, 0.0, 1.0)), (vec2(mat2(resolution, 0.0, 1.0))) / vec2(1.0, 1.0))).x), 0, 0))) {
            continue;
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            float donor_replacementGLF_dead11limit = _GLF_FUZZED(time);
            float donor_replacementGLF_dead11ref = _GLF_FUZZED(s_g);
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = trunc(refract(vec4(1373.2120, -19.63, -530.462, 0.6), vec4(81.49, -55.38, -0.8, 70.01), 2.1));
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            float donor_replacementGLF_dead11s = _GLF_FUZZED(b_b);
            for (int GLF_dead11i = 1; GLF_dead11i < 800; GLF_dead11i++) {
                if (mod(float(GLF_dead11i), donor_replacementGLF_dead11ref) <= 0.01) {
                    donor_replacementGLF_dead11s += 0.2;
                }
                if (float(GLF_dead11i) >= donor_replacementGLF_dead11limit) {
                    ;
                }
            }
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(92.02, 3702.8063, 5325.2682, 2.6);
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= tan(0.0))))) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
        }
        result = _GLF_outlined_0(d);
    }
    return result;
    if (_GLF_DEAD(_GLF_IDENTITY(false, bool(_GLF_IDENTITY(bvec2(_GLF_IDENTITY(false, !(!(false))), true), bvec2(bvec2(bvec2(_GLF_IDENTITY(false, !(!(false))), true)))))))) {
        float donor_replacementGLF_dead11s = _GLF_FUZZED(b_b);
        {
            donor_replacementGLF_dead11s += 0.2;
            {
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(-6699.9774, -731.331, -383.845, -5652.2781);
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                bool GLF_live13c2 = _GLF_FUZZED(false);
                if (!GLF_live13c2) {
                    ;
                }
            }
        }
    }
}

void main() {
    int msb8 = 256;
    _GLF_struct_0 _GLF_struct_replacement_0 = _GLF_struct_0(bvec3(_GLF_IDENTITY(true, !(!(true))), true, true), mat3x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), mat3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, _GLF_IDENTITY(1.0, (1.0) * 1.0), 1.0, 1.0), 1u, _GLF_struct_1(mat3x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), bvec3(true, true, true), uvec2(1u, 1u), mat3x2(1.0, _GLF_IDENTITY(1.0, clamp(_GLF_IDENTITY(1.0, (1.0) / 1.0), 1.0, 1.0)), 1.0, 1.0, 1.0, 1.0), mat3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, _GLF_IDENTITY(1.0, mix(float(_GLF_FUZZED(float(33127))), float(1.0), bool(true)))), mat2(1.0, 1.0, 1.0, 1.0), _GLF_struct_2(mat2(1.0, 1.0, 1.0, 1.0), uvec4(1u, 1u, 1u, 1u), ivec4(1, 1, 1, 1), mat4x3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), bvec4(true, true, true, true))), _GLF_struct_3(uvec2(1u, 1u), uvec4(1u, 1u, 1u, 1u), 1.0, _GLF_struct_4(bvec2(true, true), mat4x3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), mat4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), mat2x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), 1, ivec4(1, 1, _GLF_IDENTITY(1, ~(~(1))), 1)), uvec2(1u, 1u), _GLF_IDENTITY(ivec3(1, 1, 1), ivec3(0, 0, 0) ^ (_GLF_IDENTITY(ivec3(1, 1, 1), (ivec3(1, 1, 1)) * ivec3(1, 1, 1)))), uvec4(1u, 1u, 1u, 1u)), 1.0, _GLF_struct_5(uvec2(1u, 1u)));
    _GLF_struct_replacement_0.angle = sin(time) * 0.1;
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
        {
            vec2 GLF_live14coord = _GLF_FUZZED(vec2(762.837, 8473.9978));
            vec4 GLF_live14res = _GLF_FUZZED(vec4(3.6, -9897.9034, 4.5, -5.5));
            if (GLF_live14coord.x < 1.0 && GLF_live14coord.y < 1.0) {
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(-51.17, 448.650, 459.313, 6516.7425);
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                GLF_live14res = texture(GLF_live14tex, GLF_live14coord);
            }
        }
        float donor_replacementGLF_dead11s = _GLF_FUZZED(s_g);
        {
            ;
        }
        {
            vec2 GLF_live13center = _GLF_FUZZED(((vec2(-7.8, -4039.3446)) + vec2(-6281.1489, 5190.0589)));
            int GLF_live13looplimiter0 = 0;
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(57.34, 8.4, 751.995, -7.5);
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            vec2 GLF_live13position = _GLF_FUZZED(vec2(-923.212, 7.1));
            vec3 GLF_live13result = _GLF_FUZZED(vec3(746.982, 6.8, -979.946));
            for (int GLF_live13i = 35; GLF_live13i >= 0; GLF_live13i--) {
                if (GLF_live13looplimiter0 >= 6) {
                    break;
                }
                GLF_live13looplimiter0++;
                {
                    vec3 GLF_live13d = _GLF_FUZZED(vec3(-8.0, -9.2, 7.0));
                    GLF_live13d = GLF_live13drawShape(GLF_live13position, GLF_live13center + vec2(sin(float(GLF_live13i) / 10.0 + GLF_live13time) / 4.0, 0.0), vec3(0.01 + sin(float(GLF_live13i) / 100.0), 0.01, float(GLF_live13i)));
                    if (length(GLF_live13d) <= 0.0) {
                        continue;
                    }
                    GLF_live13result = vec3(GLF_live13d);
                }
            }
        }
    }
    mat2 rotationMatrix;
    if (_GLF_DEAD(false)) {
        for (int GLF_dead4i = _GLF_IDENTITY(0, min(0, 0)); GLF_dead4i < 10; GLF_dead4i++) {
            GLF_dead4obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead4i, 10)] = (10 - GLF_dead4i);
            GLF_dead4obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead4i, 10)] = GLF_dead4obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead4i, 10)] * GLF_dead4obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead4i, 10)];
        }
    }
    rotationMatrix = mat2(sin(_GLF_struct_replacement_0.angle), -cos(_GLF_struct_replacement_0.angle), cos(_GLF_struct_replacement_0.angle), sin(_GLF_struct_replacement_0.angle));
    vec3 point1;
    point1 = computePoint(rotationMatrix);
    mat2 rotationMatrix2;
    rotationMatrix2 = rotationMatrix * rotationMatrix;
    vec3 point2;
    point2 = computePoint(rotationMatrix2);
    if (_GLF_DEAD(_GLF_FALSE(false, (_GLF_IDENTITY(injectionSwitch.x > injectionSwitch.y, !(!(injectionSwitch.x > injectionSwitch.y))))))) {
        float donor_replacementGLF_dead11limit = _GLF_FUZZED(fwidth(_GLF_IDENTITY(-970.999, clamp(-970.999, -970.999, _GLF_IDENTITY(-970.999, (-970.999) / 1.0)))));
        float donor_replacementGLF_dead11ref = _GLF_FUZZED(h_r);
        float donor_replacementGLF_dead11s = _GLF_FUZZED(point2.t);
        for (int GLF_dead11i = 1; GLF_dead11i < 800; GLF_dead11i++) {
            if (mod(float(GLF_dead11i), donor_replacementGLF_dead11ref) <= 0.01) {
                {
                    vec2 GLF_live14coord = _GLF_FUZZED((((-9.8) - vec2(18.70, 8304.3647)) - vec2(7.4, -18.15)));
                    if (GLF_live14coord.y > 1.0)
                        GLF_live14coord.y -= 1.0;
                }
                donor_replacementGLF_dead11s += 0.2;
            }
            if (float(GLF_dead11i) >= donor_replacementGLF_dead11limit) {
                ;
            }
        }
    }
    {
        bool GLF_live1c1 = _GLF_FUZZED((mat3x2(-7090.3608, -81.31, -13.19, -2.1, 24.32, 2.7) == mat3x2(-1501.6361, 999.163, 32.79, 799.215, -49.82, -1690.7297)));
        bool GLF_live1c2 = _GLF_FUZZED(((false != _GLF_IDENTITY(false, (false) || false)) ? false : false));
        vec3 GLF_live1col = _GLF_FUZZED((-vec3(-2.4, 2581.6805, 78.83)));
        vec2 GLF_live1uv = _GLF_FUZZED(vec2(5.1, 6328.8681));
        if (!GLF_live1c1 && GLF_live1c2) {
            float GLF_live1stripe = GLF_live1compute_stripe(tan((GLF_live1uv.x + GLF_live1uv.y) * 20.0));
            GLF_live1col = mix(vec3(0.5, GLF_live1uv.x, 0.1), vec3(.4, 0, .5), GLF_live1stripe);
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = dFdy(clamp(vec4(407.118, 481.821, 50.10, -7.3), -9.3, 173.734));
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                vec3 donor_replacementGLF_dead4color = _GLF_FUZZED(uintBitsToFloat(uvec3(14757u, 15245u, 195854u)));
                {
                    {
                        float GLF_live12s = _GLF_FUZZED(25.55);
                        {
                            GLF_live12s += 0.2;
                        }
                    }
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(763.003, -8527.3142, 87.82, 565.445);
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    donor_replacementGLF_dead4color.x += float(GLF_dead4obj.numbers[5]);
                }
            }
            GLF_live1_GLF_color = vec4(GLF_live1col, 1.0);
            ;
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = (refract(vec2(4.9, -907.685), vec2(64.68, 7789.6184), 8.1) * mat4x2(7.7, -341.837, -46.16, 38.58, -264.682, -433.625, -884.408, 9112.1661));
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
        }
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = unpackUnorm4x8(bitfieldInsert(149670u, 189478u, findLSB(-19132), (75960)));
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
    }
    mat2 rotationMatrix3;
    {
        vec3 GLF_live1col = _GLF_FUZZED(_GLF_IDENTITY((true ? vec3(-9.5, 6.0, -30.46) : vec3(30.13, -372.498, 8.6)), mix(vec3(((true ? vec3(-9.5, 6.0, -30.46) : vec3(30.13, -372.498, 8.6)))[0], _GLF_IDENTITY(((true ? vec3(-9.5, 6.0, -30.46) : vec3(30.13, -372.498, 8.6)))[1], min(((true ? vec3(-9.5, 6.0, -30.46) : vec3(30.13, -372.498, 8.6)))[1], ((true ? vec3(-9.5, 6.0, -30.46) : vec3(30.13, -372.498, 8.6)))[1])), _GLF_FUZZED(-7692.2831)), vec3(_GLF_FUZZED(505.752), _GLF_FUZZED(-3856.6975), ((true ? vec3(-9.5, 6.0, -30.46) : vec3(30.13, -372.498, 8.6)))[2]), bvec3(false, false, _GLF_TRUE(true, (gl_FragCoord.y >= sin(0.0)))))));
        if (_GLF_DEAD(false)) {
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(-4.5, 913.337, -5.4, 99.79);
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            bool donor_replacementGLF_dead9c6 = _GLF_FUZZED(true);
            vec2 donor_replacementGLF_dead9pos = _GLF_IDENTITY(_GLF_FUZZED(_GLF_IDENTITY(GLF_live1injectionSwitch, (GLF_live1injectionSwitch) / vec2(1.0, 1.0))), (_GLF_FUZZED(_GLF_IDENTITY(GLF_live1injectionSwitch, (GLF_live1injectionSwitch) / vec2(1.0, 1.0)))) / vec2(1.0, 1.0));
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = unpackUnorm4x8(bitfieldReverse(34103u));
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            vec3 donor_replacementGLF_dead9setting = _GLF_FUZZED((mat3(6.4, -2390.2743, 4.0, 5.0, 7872.2646, -8125.0552, 1.0, -309.301, 164.441) * point2));
            if (!donor_replacementGLF_dead9c6) {
                ;
                {
                    float GLF_live12s = _GLF_FUZZED((1.5 * (-7664.9918)));
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(80.51, -1.7, -5.1, 4265.9449);
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    {
                        GLF_live12s += 0.2;
                    }
                }
            }
        }
        _GLF_struct_13 _GLF_struct_replacement_13 = _GLF_struct_13(vec4(1.0, 1.0, 1.0, 1.0), mat2x3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0), _GLF_IDENTITY(mat2(1.0, 1.0, 1.0, 1.0), (_GLF_IDENTITY(mat2(1.0, 1.0, 1.0, 1.0), (_GLF_IDENTITY(mat2(1.0, 1.0, 1.0, 1.0), (mat2(1.0, 1.0, 1.0, 1.0)) - mat2(0.0, 0.0, 0.0, 0.0))) / mat2(1.0, 1.0, 1.0, 1.0))) + mat2(0.0, 0.0, 0.0, 0.0)), _GLF_FUZZED(vec2(-0.4, -6315.4210)), _GLF_struct_14(mat4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0)));
        if (_GLF_DEAD(false)) {
            vec4 donor_replacementGLF_dead11c = _GLF_FUZZED(faceforward((h_r - GLF_live1_GLF_color), _GLF_color, _GLF_color));
            {
                {
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(369.525, -28.77, -35.73, 25.38);
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    ;
                }
            }
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(5.4, 5.7, 8.8, -79.31);
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            for (int GLF_dead11i = 0; GLF_dead11i < 3; GLF_dead11i++) {
                {
                    float GLF_live15beta = _GLF_FUZZED(-90.68);
                    int GLF_live15j = _GLF_FUZZED(26011);
                    int GLF_live15k = _GLF_FUZZED(44875);
                    int GLF_live15looplimiter3 = 0;
                    mat4 GLF_live15matrix_a = _GLF_FUZZED(mat4(-3.4, 0.9, 53.66, 8237.3558, -2822.5954, 9404.9041, 41.35, 2137.2695, -7476.7603, 431.700, -3.7, -714.262, 6146.2883, -46.22, 17.68, -3.3));
                    vec4 GLF_live15matrix_u = _GLF_FUZZED(vec4(19.55, 176.726, -6244.9001, -9.6));
                    for (int GLF_live15a = GLF_live15MATRIX_N - 1; GLF_live15a >= GLF_live15k; GLF_live15a--) {
                        if (GLF_live15looplimiter3 >= 5) {
                            break;
                        }
                        GLF_live15looplimiter3++;
                        {
                            GLF_live15matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15a, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live15j, 4)] = GLF_live15matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15a, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live15j, 4)] - (GLF_live15beta * GLF_live15matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15a, 4)]);
                        }
                    }
                }
                if (donor_replacementGLF_dead11c[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11i, _GLF_IDENTITY(4, max(4, 4)))] >= 1.0) {
                    donor_replacementGLF_dead11c[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11i, 4)] = donor_replacementGLF_dead11c[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11i, 4)] * donor_replacementGLF_dead11c[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11i, 4)];
                }
            }
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (_GLF_IDENTITY(gl_FragCoord.y, clamp(gl_FragCoord.y, gl_FragCoord.y, gl_FragCoord.y)) < 0.0)))) {
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = dFdxFine(vec4(-78.58, -7.2, -7.5, 5.3));
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            int donor_replacementGLF_dead7result = _GLF_FUZZED(50182);
            int donor_replacementGLF_dead7sum = _GLF_FUZZED(max(msb8, 41747));
            if (donor_replacementGLF_dead7result > 0) {
                donor_replacementGLF_dead7sum += donor_replacementGLF_dead7result;
            } else {
                switch (donor_replacementGLF_dead7result) {
                    case -1:
                        donor_replacementGLF_dead7sum += 1;
                        if (_GLF_DEAD(false)) {
                            float donor_replacementGLF_dead11limit = _GLF_FUZZED(abs(time));
                            float donor_replacementGLF_dead11ref = _GLF_FUZZED(tan(s_g));
                            float donor_replacementGLF_dead11s = _GLF_FUZZED(reflect(time, time));
                            for (int GLF_dead11i = 1; GLF_dead11i < 800; GLF_dead11i++) {
                                if (mod(float(GLF_dead11i), _GLF_IDENTITY(donor_replacementGLF_dead11ref, max(donor_replacementGLF_dead11ref, donor_replacementGLF_dead11ref))) <= 0.01) {
                                    donor_replacementGLF_dead11s += 0.2;
                                }
                                if (float(GLF_dead11i) >= donor_replacementGLF_dead11limit) {
                                    ;
                                }
                            }
                        }
                        break;
                    case 0:
                        return;
                }
            }
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = (uintBitsToFloat(uvec4(123712u, 7094u, 71591u, 85097u)));
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
        }
        {
            {
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = unpackSnorm4x8((13168, 89356u));
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                float GLF_live15beta = _GLF_FUZZED(8515.9385);
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = log2(vec4(-7.6));
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                int GLF_live15k = _GLF_FUZZED(-18721);
                int GLF_live15looplimiter6 = 0;
                vec4 GLF_live15matrix_b = _GLF_FUZZED(vec4(-3.1, 2626.9689, -5.9, 169.541));
                vec4 GLF_live15matrix_u = _GLF_FUZZED(vec4(238.924, -6.6, 3.3, 8.9));
                for (int GLF_live15b = GLF_live15MATRIX_N - 1; GLF_live15b >= GLF_live15k; GLF_live15b--) {
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = dFdxCoarse(vec4(7.9, 0.3, 43.50, -1145.3866));
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    if (GLF_live15looplimiter6 >= 5) {
                        break;
                    }
                    GLF_live15looplimiter6++;
                    {
                        GLF_live15matrix_b[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15b, 4)] = GLF_live15matrix_b[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15b, 4)] - (GLF_live15beta * GLF_live15matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_live15b, 4)]);
                    }
                }
            }
            if (_GLF_DEAD(false)) {
                vec2 donor_replacementGLF_dead9center = _GLF_FUZZED(mod(GLF_live1injectionSwitch, vec2(3129.4844, 317.812)));
                vec2 donor_replacementGLF_dead9position = _GLF_FUZZED(injectionSwitch);
                for (int GLF_dead9i = 35; GLF_dead9i >= 0; GLF_dead9i--) {
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = reflect(vec4(655.600, 4354.3920, -9.1, 529.443), vec4(-0.8, -534.570, 2.4, -5.3));
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    vec3 GLF_dead9d = _GLF_FUZZED((-vec3(18.62, 4784.4483, 4.1)));
                    GLF_dead9d = GLF_dead9drawShape(donor_replacementGLF_dead9position, donor_replacementGLF_dead9center + vec2(sin(float(GLF_dead9i) / 10.0 + GLF_dead9time) / 4.0, 0.0), vec3(_GLF_IDENTITY(0.01, (true ? _GLF_IDENTITY(0.01, clamp(_GLF_IDENTITY(0.01, mix(float(_GLF_FUZZED(1133.8426)), float(0.01), bool(true))), _GLF_IDENTITY(0.01, (false ? _GLF_FUZZED(h_r) : 0.01)), 0.01)) : _GLF_FUZZED(GLF_dead9time))) + sin(float(GLF_dead9i) / 100.0), 0.01, float(GLF_dead9i)));
                    if (length(GLF_dead9d) <= 0.0) {
                        continue;
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = vec4(-687.399, 76.66, -9.7, 4.0);
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                        {
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = vec4(9.3, 79.24, -770.658, -169.068);
                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                            int GLF_live12i = _GLF_FUZZED(421);
                            float GLF_live12limit = _GLF_FUZZED(-9.5);
                            int GLF_live12looplimiter0 = 0;
                            float GLF_live12ref = _GLF_FUZZED(float(97742u));
                            float GLF_live12s = _GLF_FUZZED(float(23826u));
                            {
                                if (GLF_live12looplimiter0 >= 3) {
                                    ;
                                }
                                GLF_live12looplimiter0++;
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = vec4(-42.82, -6029.1873, -2.7, 70.63);
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                                {
                                    if (mod(float(GLF_live12i), GLF_live12ref) <= 0.01) {
                                        GLF_live12s += 0.2;
                                    }
                                    if (float(GLF_live12i) >= GLF_live12limit) {
                                        ;
                                    }
                                }
                            }
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = vec4(-67.97, 26.84, -6.9, -93.79);
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                        }
                    }
                    point2 = vec3(GLF_dead9d);
                }
            }
            float GLF_live1stripe = GLF_live1compute_stripe(tan((_GLF_struct_replacement_13.GLF_live1uv.x + _GLF_struct_replacement_13.GLF_live1uv.y) * 20.0));
            GLF_live1col = mix(vec3(_GLF_struct_replacement_13.GLF_live1uv.x, .8, 0), vec3(1, _GLF_struct_replacement_13.GLF_live1uv.y, 0), GLF_live1stripe);
            GLF_live1_GLF_color = vec4(GLF_live1col, 1.0);
            ;
        }
    }
    rotationMatrix3 = rotationMatrix * rotationMatrix * rotationMatrix;
    {
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        _GLF_color = roundEven(vec4(-84.80, -9.1, 1.4, 36.34));
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
    }
    vec3 point3;
    point3 = computePoint(rotationMatrix3);
    if (_GLF_DEAD(false)) {
        vec3 donor_replacementGLF_dead4color = _GLF_FUZZED(point2);
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < _GLF_ZERO(0.0, injectionSwitch.x))))) {
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(-509.054, 23.88, 394.403, 37.91);
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            int donor_replacementGLF_dead11i = _GLF_FUZZED(GLF_live0MATRIX_N);
            {
                GLF_live1_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11i, 4)] = _GLF_IDENTITY(GLF_live1_GLF_color[_GLF_IDENTITY(_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11i, 4), (true ? _GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11i, 4) : _GLF_FUZZED(bitCount(-19946))))], (_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)) ? _GLF_FUZZED(round(s_g)) : _GLF_IDENTITY(GLF_live1_GLF_color[_GLF_IDENTITY(_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11i, 4), (true ? _GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11i, 4) : _GLF_FUZZED(bitCount(-19946))))], mix(float(GLF_live1_GLF_color[_GLF_IDENTITY(_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11i, 4), (true ? _GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11i, 4) : _GLF_FUZZED(bitCount(-19946))))]), float(_GLF_FUZZED(51.40)), bool(false))))) * GLF_live1_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11i, 4)];
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = outerProduct(dFdx(vec4(5.2, -6.4, 658.922, -469.083)), vec2(5.7, 27.48))[0];
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
            }
            {
                int GLF_live15looplimiter7 = 0;
                if (GLF_live15looplimiter7 >= 5) {
                    ;
                }
            }
        }
        vec2 donor_replacementGLF_dead4uv = _GLF_FUZZED(asinh(injectionSwitch));
        if (donor_replacementGLF_dead4uv.y > (3.0 / 4.0)) {
            donor_replacementGLF_dead4color.z += float(GLF_dead4obj.numbers[7]);
        }
    }
    vec3 mixed;
    mixed = mix(point1, _GLF_IDENTITY(point2, clamp(point2, point2, point2)), vec3(0.3));
    mixed = _GLF_IDENTITY(mix(mixed, point3, vec3(0.3)), mix(vec3(_GLF_FUZZED(-824.564), (mix(mixed, point3, vec3(0.3)))[1], _GLF_FUZZED(7.0)), vec3((mix(mixed, point3, vec3(0.3)))[0], _GLF_FUZZED(float(35401)), (mix(mixed, point3, vec3(0.3)))[2]), bvec3(true, _GLF_FALSE(false, (gl_FragCoord.x < 0.0)), true)));
    {
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = (bvec4(true, true, false, true), vec4(0.2, -9.3, 9.3, -374.027));
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
        vec2 GLF_live14coord = _GLF_FUZZED(vec2(5593.7906, 2469.9994));
        if (GLF_live14coord.y > 1.0) {
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = smoothstep(-6.6, 5658.1090, vec4(583.094, 6022.1558, -1.7, 8.0));
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            GLF_live14coord.y -= 1.0;
        }
    }
    _GLF_color = vec4(mixed, float(bitCount(msb8)));
    {
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        _GLF_color = (vec2(9.9, 89.91) * mat4x2(39.69, 576.555, -1.7, 859.472, -0.1, -0.7, -295.166, -6243.2890));
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
    }
    if (_GLF_IDENTITY(_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))), false || (_GLF_IDENTITY(_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))), false || (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))))))) {
        bool donor_replacementGLF_dead9c4 = _GLF_FUZZED((resolution != (ivec2(19071, -49086), resolution)));
        {
            vec3 GLF_live13d = _GLF_FUZZED(vec3(-60.33, 429.673, 815.872));
            if (length(GLF_live13d) <= 0.0) {
                ;
            }
        }
        if (!donor_replacementGLF_dead9c4) {
            ;
        }
    }
    {
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        _GLF_color = mod(mix(vec4(49.41, 12.24, 2.0, -2964.4012), vec4(7376.6887, 3.7, -7.5, 7.4), equal(bvec4(true, true, false, false), bvec4(true, true, false, true))), vec4(2.0, -3.2, -62.04, 505.653));
        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
    }
}
