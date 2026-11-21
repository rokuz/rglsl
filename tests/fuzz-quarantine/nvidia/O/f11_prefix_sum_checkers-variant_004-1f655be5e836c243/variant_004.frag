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
vec4 GLF_live20_GLF_color = _GLF_FUZZED(vec4(-6643.0237, 8.1, 9154.1881, -1.7));

ivec2 GLF_live21iter(ivec2 GLF_live21p) {
    if (GLF_live21p.x > 0) {
        GLF_live21p.y--;
    }
    if (GLF_live21p.x < 0) {
        GLF_live21p.y++;
    }
    GLF_live21p.x += GLF_live21p.y / 2;
    return GLF_live21p;
}

layout(set = 0, binding = 2) uniform sampler2D GLF_live18tex;

layout(set = 0, binding = 3) uniform buf3 {
    vec2 GLF_dead17resolution;
};

int GLF_dead12MATRIX_N = 4;
vec4 GLF_dead13_GLF_color = _GLF_FUZZED(vec4(614.481, 631.985, -5.2, 3.2));

layout(set = 0, binding = 4) uniform buf4 {
    float GLF_dead13one;
};

mat2 GLF_dead13m22 = _GLF_FUZZED(mat2(mat3x4(61.02, -704.340, 6171.1068, _GLF_IDENTITY(8.0, clamp(8.0, 8.0, _GLF_IDENTITY(8.0, clamp(8.0, _GLF_IDENTITY(8.0, (8.0) - 0.0), 8.0)))), 5.6, 6.2, 174.737, 9642.2036, 984.391, 551.155, -9.4, -177.438)));
mat2x3 GLF_dead13m23 = _GLF_FUZZED(mat2x3(-49.22, 59.39, -61.93, -6.5, -8.3, -494.658));
mat2x4 GLF_dead13m24 = _GLF_FUZZED(mat2x4(6.5, 70.54, -82.93, 0.0, -316.173, 932.765, 133.547, 9.7));
mat3x2 GLF_dead13m32 = _GLF_FUZZED(mat3x2(-0.0, -4.8, -9.9, -4380.5123, 9.5, 47.03));
mat3 GLF_dead13m33 = _GLF_FUZZED(mat3(1.8, 4.6, -58.94, -0.4, -1.3, 1154.6800, 0.8, 7.2, -1.0));
mat3x4 GLF_dead13m34 = _GLF_FUZZED(mat3x4(_GLF_IDENTITY(-82.24, float(mat2(-82.24, 0.0, length(vec3(0.0, 0.0, 0.0)), 0.0))), 4.8, -211.920, 5.9, -364.363, 6953.9359, -8.4, -3311.9973, 6.9, _GLF_IDENTITY(-179.240, min(-179.240, -179.240)), 38.23, 7500.1987));
mat4x2 GLF_dead13m42 = _GLF_FUZZED(mat4x2(1882.3501, _GLF_IDENTITY(-542.713, 1.0 * (_GLF_IDENTITY(-542.713, (false ? _GLF_FUZZED(2.9) : (-542.713))))), _GLF_IDENTITY(-60.19, (true ? (-60.19) : _GLF_FUZZED(-9.0))), -6.4, 82.66, 0.1, 3009.6928, 1.4));
mat4x3 GLF_dead13m43 = _GLF_FUZZED(mat4x3(mat2x4(232.550, 621.794, -5.2, -3663.7871, 0.3, -95.23, 85.61, 27.29)));
mat4 GLF_dead13m44 = _GLF_FUZZED(mat4(-407.000, 1464.8223, -410.682, 354.945, 94.61, 1707.5920, -_GLF_IDENTITY(29.56, _GLF_IDENTITY(dot(vec2(1.0, 1.0), vec2(length(vec3(0.0, 0.0, 0.0)), 0.0)), dot(vec2(1.0, 1.0), vec2(length(vec3(0.0, 0.0, 0.0)), 0.0))) + (29.56)), 2.8, 46.42, -86.54, -9002.1693, 5.9, 86.11, 31.08, -3.5, 896.642));

layout(set = 0, binding = 5) uniform buf5 {
    vec2 GLF_dead14injectionSwitch;
};

layout(set = 0, binding = 6) uniform buf6 {
    vec2 GLF_live8injectionSwitch;
};

struct GLF_live10QuicksortObject {
    int numbers[10];
};

GLF_live10QuicksortObject GLF_live10obj = GLF_live10QuicksortObject(int[10](0, 0, 0, 0, 0, 0, 0, 0, 0, _GLF_IDENTITY(0, (0) | (0))));
vec4 GLF_live9_GLF_color = _GLF_FUZZED(vec3(-4.4, 135.540, -3.0).stss);

struct GLF_live7BST {
    int data;
    int leftIndex;
    int rightIndex;
};

GLF_live7BST GLF_live7tree[10] = GLF_live7BST[10](GLF_live7BST(0, 0, 0), GLF_live7BST(0, 0, 0), GLF_live7BST(0, 0, 0), GLF_live7BST(0, 0, 0), GLF_live7BST(0, 0, 0), GLF_live7BST(0, 0, 0), GLF_live7BST(0, 0, 0), GLF_live7BST(0, 0, 0), GLF_live7BST(0, 0, _GLF_IDENTITY(0, (0) << 0)), GLF_live7BST(0, 0, 0));

void GLF_live7makeTreeNode(inout GLF_live7BST GLF_live7tree, int GLF_live7data) {
    GLF_live7tree.data = GLF_live7data;
    GLF_live7tree.leftIndex = -1;
    GLF_live7tree.rightIndex = -1;
}

layout(set = 0, binding = 7) uniform buf7 {
    vec2 GLF_dead0injectionSwitch;
};

struct GLF_dead0QuicksortObject {
    int numbers[10];
};

GLF_dead0QuicksortObject GLF_dead0obj = GLF_dead0QuicksortObject(int[10](0, 0, 0, 0, 0, 0, _GLF_IDENTITY(0, (0) ^ 0), 0, 0, 0));

void GLF_dead0swap(int GLF_dead0i, int GLF_dead0j) {
    int GLF_dead0temp = GLF_dead0obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead0i, 10)];
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
        float donor_replacementGLF_dead11limit = _GLF_FUZZED(_GLF_IDENTITY(mod(-869.325, 297.247), max(_GLF_IDENTITY(mod(-869.325, 297.247), mix(float(_GLF_FUZZED(float(96651u))), float(mod(-869.325, 297.247)), bool(true))), mod(-869.325, 297.247))));
        float donor_replacementGLF_dead11result = _GLF_FUZZED(27.66);
        float donor_replacementGLF_dead11thirty_two = _GLF_FUZZED(length(vec4(59.00, -1.7, 4052.3612, -31.29)));
        for (int GLF_dead11i = 1; GLF_dead11i < 800; GLF_dead11i++) {
            if ((GLF_dead11i % 32) == 0) {
                donor_replacementGLF_dead11result += 0.4;
            } else {
                if (mod(float(GLF_dead11i), round(donor_replacementGLF_dead11thirty_two)) <= 0.01) {
                    donor_replacementGLF_dead11result += 100.0;
                }
            }
            if (float(GLF_dead11i) >= donor_replacementGLF_dead11limit) {
                ;
            }
        }
    }
    _GLF_IDENTITY(GLF_dead0obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead0i, 10)] = GLF_dead0obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead0j, 10)], (GLF_dead0obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead0i, 10)] = GLF_dead0obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead0j, 10)]) / (0 | 1));
    GLF_dead0obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead0j, 10)] = GLF_dead0temp;
}

vec3 GLF_dead0palette(vec3 GLF_dead0a, vec3 GLF_dead0b, vec3 GLF_dead0c, vec3 GLF_dead0d) {
    return fract(mix(GLF_dead0d * GLF_dead0a, _GLF_IDENTITY(GLF_dead0a * GLF_dead0c, clamp(GLF_dead0a * GLF_dead0c, _GLF_IDENTITY(GLF_dead0a * GLF_dead0c, clamp(GLF_dead0a * GLF_dead0c, GLF_dead0a * GLF_dead0c, _GLF_IDENTITY(GLF_dead0a * GLF_dead0c, clamp(GLF_dead0a * GLF_dead0c, GLF_dead0a * GLF_dead0c, GLF_dead0a * GLF_dead0c)))), GLF_dead0a * GLF_dead0c)), GLF_dead0b + GLF_dead0d - GLF_dead0c));
}

const int GLF_dead3N = 10;
int GLF_dead3data[10] = int[10](_GLF_FUZZED(72283), _GLF_FUZZED(-21105), _GLF_FUZZED(37327), _GLF_FUZZED(-10795), _GLF_FUZZED(78451), _GLF_FUZZED(int(false)), _GLF_FUZZED((_GLF_IDENTITY(-(-71177), max(_GLF_IDENTITY(-(-71177), int(int(-(-71177)))), -(-71177))))), _GLF_FUZZED(-7755), _GLF_FUZZED(45748), _GLF_IDENTITY(_GLF_FUZZED((_GLF_IDENTITY(62976 | (29430 - _GLF_IDENTITY((-88741), max((-88741), (-88741)))), (_GLF_IDENTITY(62976 | (29430 - _GLF_IDENTITY((-88741), max((-88741), (-88741)))), ~(~(62976 | (29430 - _GLF_IDENTITY((-88741), max((-88741), (-88741)))))))) * 1))), (_GLF_FUZZED(_GLF_IDENTITY((_GLF_IDENTITY(62976 | (29430 - _GLF_IDENTITY((-88741), max((-88741), (-88741)))), (_GLF_IDENTITY(62976 | (29430 - _GLF_IDENTITY((-88741), max((-88741), (-88741)))), ~(~(62976 | (29430 - _GLF_IDENTITY((-88741), max((-88741), (-88741)))))))) * 1)), clamp((_GLF_IDENTITY(62976 | (29430 - _GLF_IDENTITY((-88741), max((-88741), (-88741)))), (_GLF_IDENTITY(62976 | (29430 - _GLF_IDENTITY((-88741), max((-88741), (-88741)))), ~(~(62976 | (29430 - _GLF_IDENTITY((-88741), max((-88741), (-88741)))))))) * 1)), (_GLF_IDENTITY(62976 | (29430 - _GLF_IDENTITY((-88741), max((-88741), (-88741)))), (_GLF_IDENTITY(62976 | (29430 - _GLF_IDENTITY((-88741), max((-88741), (-88741)))), ~(~(62976 | (29430 - _GLF_IDENTITY((-88741), max((-88741), (-88741)))))))) * 1)), (_GLF_IDENTITY(62976 | (29430 - _GLF_IDENTITY((-88741), max((-88741), (-88741)))), (_GLF_IDENTITY(62976 | (29430 - _GLF_IDENTITY((-88741), max((-88741), (-88741)))), ~(~(62976 | (29430 - _GLF_IDENTITY((-88741), max((-88741), (-88741)))))))) * 1)))))) / 1)), GLF_dead3temp[10] = int[10](_GLF_FUZZED(1394), _GLF_FUZZED(ivec2(1841, -13193).r), _GLF_FUZZED(20998), _GLF_FUZZED(_GLF_IDENTITY(-91511, clamp(-91511, _GLF_IDENTITY(-91511, int(int(-91511))), -91511))), _GLF_FUZZED((+_GLF_IDENTITY((-20490), int(ivec4((-20490), ((1 << _GLF_IDENTITY(int(3), int(3))) >> _GLF_IDENTITY(int(3), int(3))), 0, (0 >> _GLF_IDENTITY(int(6), int(6)))))))), _GLF_FUZZED((-(-54105))), _GLF_FUZZED(-55033), _GLF_FUZZED(-92081), _GLF_FUZZED((45034)), _GLF_FUZZED(-40827));

void GLF_dead3merge(int GLF_dead3from, int GLF_dead3mid, int GLF_dead3to) {
    int GLF_dead3k = GLF_dead3from, GLF_dead3i = GLF_dead3from, GLF_dead3j = _GLF_IDENTITY(GLF_dead3mid + 1, max(_GLF_IDENTITY(GLF_dead3mid + 1, (GLF_dead3mid + 1) << 0), _GLF_IDENTITY(GLF_dead3mid + 1, (0 >> _GLF_IDENTITY(int(3), int(3))) | (GLF_dead3mid + 1))));
    while (GLF_dead3i <= GLF_dead3mid && GLF_dead3j <= GLF_dead3to) {
        if (GLF_dead3data[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead3i, 10)] < GLF_dead3data[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead3j, 10)]) {
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < _GLF_IDENTITY(0.0, float(mat4x3(0.0, 1.0, 1.0, tan(0.0), determinant(mat3(sqrt(0.0), 0.0, 0.0, _GLF_IDENTITY(dot(vec2(1.0, 0.0), vec2(1.0, 0.0)), dot(vec2(1.0, 0.0), vec2(1.0, 0.0))), 0.0, _GLF_IDENTITY(dot(vec3(0.0, 1.0, 0.0), vec3(1.0, 0.0, 1.0)), dot(vec3(0.0, 1.0, 0.0), vec3(1.0, 0.0, 1.0))), 1.0, 1.0, 0.0)), 1.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0))))))) {
                float donor_replacementGLF_dead12alpha3 = _GLF_FUZZED(distance(vec4(6.0, -826.640, -0.4, -8.3), vec4(74.84, -974.587, -717.725, 71.73)));
                int donor_replacementGLF_dead12j = _GLF_FUZZED(GLF_dead3from);
                int donor_replacementGLF_dead12k = _GLF_FUZZED(clamp(GLF_dead3i, GLF_dead3j, GLF_dead3i));
                mat4 donor_replacementGLF_dead12matrix_a = _GLF_FUZZED(mat4(3112.0036, -4.0, -68.57, -9295.8863, 825.856, -599.186, 1.1, 3.7, 9.5, -625.491, 0.7, 954.170, 4.8, 58.02, 935.833, 42.92));
                vec4 donor_replacementGLF_dead12matrix_u = _GLF_FUZZED((vec3(-877.611, 2.1, -9.6) * mat4x3(-181.052, 5036.0469, 6.2, -116.478, 8856.0370, -5.4, -9.7, 6.4, 9.4, -876.672, 808.715, 320.899)));
                for (int GLF_dead12a = GLF_dead12MATRIX_N - 1; GLF_dead12a >= donor_replacementGLF_dead12k; _GLF_IDENTITY(GLF_dead12a--, (false ? _GLF_FUZZED(donor_replacementGLF_dead12k) : (GLF_dead12a--)))) {
                    donor_replacementGLF_dead12alpha3 += donor_replacementGLF_dead12matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12a, 4)] * donor_replacementGLF_dead12matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12a, 4)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead12j, 4)];
                }
            }
            GLF_dead3temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead3k++, 10)] = GLF_dead3data[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead3i++, 10)];
        } else {
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < tan(0.0))))) {
                bool donor_replacementGLF_dead15c7 = _GLF_FUZZED((bvec2(false, false) != bvec2(true, true)));
                vec2 donor_replacementGLF_dead15pos = _GLF_FUZZED(GLF_live8injectionSwitch);
                vec3 donor_replacementGLF_dead15setting = _GLF_FUZZED(vec3(-79.96, 608.477, -3304.0325));
                if (!donor_replacementGLF_dead15c7) {
                    ;
                }
            }
            GLF_dead3temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead3k++, 10)] = GLF_dead3data[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead3j++, 10)];
        }
    }
    while (GLF_dead3i < GLF_dead3N && GLF_dead3i <= GLF_dead3mid) {
        GLF_dead3temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead3k++, 10)] = GLF_dead3data[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead3i++, 10)];
        if (_GLF_DEAD(false)) {
            int donor_replacementGLF_dead16i = _GLF_FUZZED(GLF_dead12MATRIX_N);
            {
                if (GLF_dead13_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead16i, 4)] >= 1.0) {
                    GLF_dead13_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead16i, 4)] = GLF_dead13_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead16i, 4)] * GLF_dead13_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead16i, 4)];
                }
            }
        }
    }
    for (int GLF_dead3i = GLF_dead3from; GLF_dead3i <= GLF_dead3to; GLF_dead3i++) {
        if (_GLF_DEAD(false)) {
            vec4 donor_replacementGLF_dead18c = _GLF_FUZZED(vec4(GLF_live8injectionSwitch, min(9741.6392, 2.6), 226.816));
            int donor_replacementGLF_dead18i = _GLF_FUZZED(GLF_dead3k);
            {
                donor_replacementGLF_dead18c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead18i, 4)] = donor_replacementGLF_dead18c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead18i, 4)] * donor_replacementGLF_dead18c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead18i, 4)];
            }
        }
        if (_GLF_DEAD(false)) {
            float donor_replacementGLF_dead11limit = _GLF_FUZZED(dFdxCoarse(-89.66));
            float donor_replacementGLF_dead11result = _GLF_FUZZED(24.93);
            float donor_replacementGLF_dead11thirty_two = _GLF_FUZZED(_GLF_IDENTITY(vec2(-798.543, -8.7).r, min(vec2(-798.543, -8.7).r, vec2(-798.543, -8.7).r)));
            for (int GLF_dead11i = 1; GLF_dead11i < 800; GLF_dead11i++) {
                if ((GLF_dead11i % 32) == 0) {
                    donor_replacementGLF_dead11result += 0.4;
                } else {
                    {
                        int GLF_live18looplimiter0 = 0;
                        if (GLF_live18looplimiter0 >= 3) {
                            ;
                        }
                    }
                    if (mod(float(GLF_dead11i), round(donor_replacementGLF_dead11thirty_two)) <= 0.01) {
                        donor_replacementGLF_dead11result += 100.0;
                    }
                }
                if (float(GLF_dead11i) >= donor_replacementGLF_dead11limit) {
                    ;
                }
            }
            {
                vec2 GLF_live20coord = _GLF_FUZZED(vec2(-96.76, 126.011));
                if (GLF_live20coord.x > 0.4) {
                    if (GLF_live20coord.y < 0.6) {
                        uvec2 GLF_live20icoord = uvec2(((GLF_live20coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                        uint GLF_live20res1 = uint(((GLF_live20icoord.x * GLF_live20icoord.y) >> (GLF_live20icoord.x & 31u)) & 0xffffffffu);
                        uint GLF_live20res2 = uint(((GLF_live20icoord.x * GLF_live20icoord.y) << (GLF_live20icoord.x & 31u)) & 0xffffffffu);
                        float GLF_live20res = float(((GLF_live20res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_live20res1 & 1u) != 0u ? 1u : 0u));
                        GLF_live20_GLF_color = vec4(GLF_live20res, GLF_live20res, GLF_live20res, 1.0);
                    } else {
                        ivec2 GLF_live20icoord = ivec2(((GLF_live20coord - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                        int GLF_live20res3 = ((GLF_live20icoord.x >> 5) & 1) ^ ((GLF_live20icoord.y & 32) >> 5);
                        int GLF_live20res2 = (GLF_live20icoord.y * GLF_live20icoord.y >> 10) & 1;
                        int GLF_live20res1 = (GLF_live20icoord.x * GLF_live20icoord.y >> 9) & 1;
                        GLF_live20_GLF_color = vec4(float(GLF_live20res1 ^ GLF_live20res2), float(GLF_live20res2 & GLF_live20res3), float(GLF_live20res1 | GLF_live20res3), 1.0);
                    }
                } else {
                    ivec2 GLF_live20icoord = ivec2(((GLF_live20coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.6, 1.0)) * 256.0);
                    int GLF_live20v = (GLF_live20icoord.x ^ GLF_live20icoord.y) * GLF_live20icoord.y;
                    bool GLF_live20res1 = ((GLF_live20v >> 10) & 1) != 0;
                    bool GLF_live20res2 = ((GLF_live20v >> 11) & 4) != 0;
                    bool GLF_live20res3 = ((GLF_live20v >> 12) & 8) != 0;
                    GLF_live20_GLF_color = vec4(GLF_live20res1 ? 1.0 : 0.0, GLF_live20res2 ? 1.0 : 0.0, GLF_live20res3 ? 1.0 : 0.0, 1);
                }
            }
        }
        GLF_dead3data[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead3i, 10)] = _GLF_IDENTITY(GLF_dead3temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead3i, 10)], (_GLF_FALSE(false, (gl_FragCoord.y < 0.0)) ? _GLF_FUZZED(GLF_dead3from) : GLF_dead3temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead3i, 10)]));
    }
}

layout(set = 0, binding = 8) uniform sampler2D GLF_dead2tex;
layout(location = 0) out vec4 _GLF_color;

layout(set = 0, binding = 0) uniform buf0 {
    vec2 injectionSwitch;
};

layout(set = 0, binding = 1) uniform buf1 {
    vec2 resolution;
};

vec2 pattern(in vec2 x) {
    vec2 n = floor(x);
    if (_GLF_DEAD(false)) {
        float donor_replacementGLF_dead17x = _GLF_FUZZED(smoothstep(GLF_dead13one, GLF_dead13one, length(vec4(-5.5, 5032.0089, -2603.6500, -3.1))));
        float donor_replacementGLF_dead17y = _GLF_FUZZED(GLF_dead13one);
        {
            donor_replacementGLF_dead17x = 1.0;
            donor_replacementGLF_dead17y = 1.0;
        }
    }
    {
        int GLF_live4count = _GLF_FUZZED(int((_GLF_IDENTITY((-13) == 70656, ((-13) == 70656) || _GLF_FALSE(false, (gl_FragCoord.y < sqrt(0.0)))))));
        {
            GLF_live4count++;
        }
        if (_GLF_DEAD(false)) {
            int donor_replacementGLF_dead13c = _GLF_FUZZED(abs(ivec4(61003, _GLF_IDENTITY(65077, (65077) >> 0), 57309, -73420))[1]);
            uint donor_replacementGLF_dead13matrix_number = _GLF_FUZZED((199396u << 52821u));
            {
                for (int GLF_dead13r = 0; GLF_dead13r < GLF_live4count; GLF_dead13r++) {
                    switch (donor_replacementGLF_dead13matrix_number) {
                        case 0u:
                            {
                                {
                                    vec2 GLF_live20coord = _GLF_FUZZED(((-787.204) * vec2(19.57, -9488.2782)));
                                    {
                                        ivec2 GLF_live20icoord = ivec2(((GLF_live20coord - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                                        int GLF_live20res3 = ((GLF_live20icoord.x >> 5) & 1) ^ ((GLF_live20icoord.y & 32) >> 5);
                                        int GLF_live20res2 = (GLF_live20icoord.y * GLF_live20icoord.y >> 10) & 1;
                                        int GLF_live20res1 = (GLF_live20icoord.x * GLF_live20icoord.y >> 9) & 1;
                                        GLF_live20_GLF_color = vec4(float(GLF_live20res1 ^ GLF_live20res2), float(GLF_live20res2 & GLF_live20res3), float(GLF_live20res1 | GLF_live20res3), 1.0);
                                    }
                                }
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = vec4(-333.001, 281.099, -7899.1571, 168.797);
                                if (_GLF_DEAD(false)) {
                                    int donor_replacementGLF_dead18i = _GLF_FUZZED((GLF_dead13r / GLF_dead13r));
                                    float donor_replacementGLF_dead18limit = _GLF_FUZZED(GLF_dead13one);
                                    float donor_replacementGLF_dead18s = _GLF_FUZZED(GLF_dead13one);
                                    if (float(donor_replacementGLF_dead18i) >= donor_replacementGLF_dead18limit) {
                                        ;
                                    }
                                }
                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                float donor_replacementGLF_dead18ref = _GLF_FUZZED((GLF_dead13one / n).y);
                                float donor_replacementGLF_dead18s = _GLF_FUZZED(GLF_dead13one);
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = floor(vec4(974.698, 1503.8486, 550.453, -6.4));
                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                                if (mod(float(GLF_live4count), donor_replacementGLF_dead18ref) <= 0.01) {
                                    donor_replacementGLF_dead18s += 0.2;
                                }
                            }
                            GLF_dead13m22[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead13c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13r, 2)] = GLF_dead13one;
                            if (_GLF_DEAD(false)) {
                                int donor_replacementGLF_dead18i = _GLF_FUZZED((GLF_dead12MATRIX_N));
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = vec4(-5.9, -1071.7253, 5566.4867, -3.5);
                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                                float donor_replacementGLF_dead18limit = _GLF_FUZZED(sinh(GLF_dead13one));
                                {
                                    int GLF_live21looplimiter1 = 0;
                                    if (GLF_live21looplimiter1 >= 4) {
                                        ;
                                    }
                                }
                                float donor_replacementGLF_dead18s = _GLF_FUZZED(acosh(GLF_dead13one));
                                if (float(donor_replacementGLF_dead18i) >= donor_replacementGLF_dead18limit) {
                                    ;
                                }
                            }
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = radians(vec4(6.8, 66.93, 0.6, 740.407));
                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                            {
                                vec2 GLF_live20coord = _GLF_FUZZED(vec2(8.9, -514.206));
                                {
                                    if (GLF_live20coord.y < 0.6) {
                                        uvec2 GLF_live20icoord = uvec2(((GLF_live20coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                                        uint GLF_live20res1 = uint(((GLF_live20icoord.x * GLF_live20icoord.y) >> (GLF_live20icoord.x & 31u)) & 0xffffffffu);
                                        uint GLF_live20res2 = uint(((GLF_live20icoord.x * GLF_live20icoord.y) << (GLF_live20icoord.x & 31u)) & 0xffffffffu);
                                        float GLF_live20res = float(((GLF_live20res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_live20res1 & 1u) != 0u ? 1u : 0u));
                                        GLF_live20_GLF_color = vec4(GLF_live20res, GLF_live20res, GLF_live20res, 1.0);
                                    } else {
                                        ivec2 GLF_live20icoord = ivec2(((GLF_live20coord - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                                        int GLF_live20res3 = ((GLF_live20icoord.x >> 5) & 1) ^ ((GLF_live20icoord.y & 32) >> 5);
                                        int GLF_live20res2 = (GLF_live20icoord.y * GLF_live20icoord.y >> 10) & 1;
                                        int GLF_live20res1 = (GLF_live20icoord.x * GLF_live20icoord.y >> 9) & 1;
                                        {
                                            vec4 _GLF_outVarBackup_GLF_color;
                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                            _GLF_color = vec4(-8292.7692, -6.5, -6.2, -8249.2725);
                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                            }
                                        }
                                        GLF_live20_GLF_color = vec4(float(GLF_live20res1 ^ GLF_live20res2), float(GLF_live20res2 & GLF_live20res3), float(GLF_live20res1 | GLF_live20res3), 1.0);
                                        {
                                            vec4 _GLF_outVarBackup_GLF_color;
                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                            _GLF_color = (false ? vec4(2080.4531, -48.25, 55.64, 625.876) : vec4(-5.4, 79.88, -5.2, -4.8));
                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                            }
                                        }
                                    }
                                }
                            }
                            break;
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = vec4(-65.25, -998.387, 57.75, 6.3);
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                    {
                                        vec2 GLF_live18coord = _GLF_FUZZED(vec2(-8.9, -0.4));
                                        int GLF_live18i = _GLF_FUZZED(30110);
                                        int GLF_live18looplimiter0 = 0;
                                        vec4 GLF_live18texel = _GLF_FUZZED(vec4(1.5, 35.15, -9.4, -37.30));
                                        {
                                            if (GLF_live18looplimiter0 >= 3) {
                                                ;
                                            }
                                            GLF_live18looplimiter0++;
                                            {
                                                GLF_live18coord = GLF_live18texel.xz + GLF_live18texel.yy;
                                                GLF_live18coord = floor(GLF_live18coord * 256.0) / 256.0;
                                                GLF_live18texel = texture(GLF_live18tex, GLF_live18coord);
                                                GLF_live18i++;
                                            }
                                        }
                                    }
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        _GLF_color = unpackUnorm4x8(130416u);
                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                    }
                                }
                                {
                                    int GLF_live21looplimiter1 = 0;
                                    if (GLF_live21looplimiter1 >= 4) {
                                        ;
                                    }
                                }
                            }
                        case 1u:
                            GLF_dead13m23[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead13c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13r, 3)] = GLF_dead13one;
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = vec4(867.539, -9571.6736, 4651.0980, 3.6);
                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= _GLF_IDENTITY(dot(vec4(1.0, 1.0, 1.0, 1.0), vec4(0.0, determinant(mat4(0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0)), 0.0, 0.0)), _GLF_IDENTITY(dot(vec4(1.0, 1.0, 1.0, 1.0), vec4(0.0, determinant(mat4(0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0)), 0.0, 0.0)), min(dot(vec4(1.0, 1.0, 1.0, 1.0), vec4(0.0, determinant(mat4(0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0)), 0.0, 0.0)), dot(vec4(1.0, 1.0, 1.0, 1.0), vec4(0.0, determinant(mat4(0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0)), 0.0, 0.0))))))))) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                            break;
                        case 2u:
                            GLF_dead13m24[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead13c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13r, 4)] = GLF_dead13one;
                            break;
                        case 3u:
                            GLF_dead13m32[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead13c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13r, 2)] = GLF_dead13one;
                            break;
                        case 4u:
                            GLF_dead13m33[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead13c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13r, 3)] = GLF_dead13one;
                            break;
                        case 5u:
                            GLF_dead13m34[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead13c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13r, 4)] = GLF_dead13one;
                            break;
                        case 6u:
                            GLF_dead13m42[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead13c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13r, 2)] = GLF_dead13one;
                            break;
                        case 7u:
                            GLF_dead13m43[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead13c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13r, 3)] = GLF_dead13one;
                            break;
                        case 8u:
                            GLF_dead13m44[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead13c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13r, 4)] = GLF_dead13one;
                            break;
                    }
                }
            }
        }
    }
    vec3 m = _GLF_IDENTITY(vec3(1.0), mix(vec3(_GLF_FUZZED((+(-9.7))), (vec3(1.0))[1], _GLF_FUZZED(-136.395)), vec3((vec3(1.0))[0], _GLF_FUZZED(-9.5), (vec3(1.0))[2]), bvec3(true, false, true)));
    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
        int donor_replacementGLF_dead11i = _GLF_FUZZED((true ? GLF_dead3N : 18504));
        if (_GLF_DEAD(false)) {
            vec4 donor_replacementGLF_dead18c = _GLF_FUZZED(fract(_GLF_color));
            int donor_replacementGLF_dead18i = _GLF_FUZZED(-58756);
            int donor_replacementGLF_dead18msb8 = _GLF_FUZZED(GLF_dead12MATRIX_N);
            do {
                if (donor_replacementGLF_dead18c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead18i, 4)] >= 1.0) {
                    donor_replacementGLF_dead18c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead18i, 4)] = donor_replacementGLF_dead18c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead18i, 4)] * donor_replacementGLF_dead18c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead18i, 4)];
                }
                donor_replacementGLF_dead18i++;
            } while (donor_replacementGLF_dead18i < findMSB(findLSB(donor_replacementGLF_dead18msb8)));
        }
        {
            if (m[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11i, 3)] >= 1.0) {
                m[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11i, 3)] = _GLF_IDENTITY(m[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11i, 3)] * m[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11i, 3)], min(m[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11i, 3)] * m[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11i, 3)], m[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11i, 3)] * m[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11i, 3)]));
            }
        }
    }
    for (int j = _GLF_IDENTITY(-1, 0 | (-1)); j <= int(injectionSwitch.y); j++) {
        for (int i = -1; i <= int(injectionSwitch.y); _GLF_IDENTITY(i++, _GLF_IDENTITY((i++) | 0, 0 | (_GLF_IDENTITY((i++) | 0, ((i++) | 0) | 0))))) {
            {
                vec4 _GLF_outVarBackup_GLF_color;
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = faceforward(mod(vec4(325.575, -16.86, -98.13, 4668.4185), max(921.991, -4875.1983)), inversesqrt(_GLF_IDENTITY(vec4(-780.683, -9260.2790, 3616.8835, 4.4), (vec4(-780.683, -9260.2790, 3616.8835, 4.4)) + vec4(0.0, 0.0, 0.0, 0.0))), vec4(-3.6, 2.1, -461.968, 7.4));
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        if (_GLF_DEAD(false)) {
                            int donor_replacementGLF_dead18i = _GLF_FUZZED(68407);
                            float donor_replacementGLF_dead18limit = _GLF_FUZZED(GLF_dead13one);
                            float donor_replacementGLF_dead18ref = _GLF_FUZZED(73.74);
                            float donor_replacementGLF_dead18s = _GLF_FUZZED(length(m));
                            {
                                if (mod(float(donor_replacementGLF_dead18i), donor_replacementGLF_dead18ref) <= 0.01) {
                                    donor_replacementGLF_dead18s += 0.2;
                                }
                                if (float(donor_replacementGLF_dead18i) >= donor_replacementGLF_dead18limit) {
                                    ;
                                }
                                donor_replacementGLF_dead18i++;
                            }
                        }
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(-9.8, 12.37, 3081.7365, -4056.3284);
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                }
                _GLF_outVarBackup_GLF_color = _GLF_color;
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = mod(vec4(373.086, 446.888, 2.3, -1.8), vec4(-570.437, -1.6, -2.5, 9150.9252));
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= sqrt(0.0))))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                _GLF_IDENTITY(_GLF_color = unpackSnorm4x8(clamp(105573u, 4278u, 120835u)), (_GLF_color = unpackSnorm4x8(clamp(105573u, 4278u, 120835u))) * vec4(1.0, 1.0, 1.0, 1.0));
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < _GLF_ZERO(0.0, injectionSwitch.x))))) {
                    float donor_replacementGLF_dead17c_im = _GLF_FUZZED(asinh(fwidthCoarse(-95.46)));
                    float donor_replacementGLF_dead17c_re = _GLF_FUZZED(4.2);
                    int donor_replacementGLF_dead17iterationCap = _GLF_FUZZED(i);
                    int donor_replacementGLF_dead17k = _GLF_FUZZED(i);
                    float donor_replacementGLF_dead17x = _GLF_FUZZED(GLF_dead13one);
                    float donor_replacementGLF_dead17y = _GLF_FUZZED(vec4(8.3, 874.611, -88.18, 663.457).r);
                    do {
                        if (donor_replacementGLF_dead17x * donor_replacementGLF_dead17x + donor_replacementGLF_dead17y * donor_replacementGLF_dead17y > 4.0) {
                            break;
                        }
                        float GLF_dead17x_new = donor_replacementGLF_dead17x * donor_replacementGLF_dead17x - donor_replacementGLF_dead17y * donor_replacementGLF_dead17y + donor_replacementGLF_dead17c_re;
                        donor_replacementGLF_dead17y = 2.0 * donor_replacementGLF_dead17x * donor_replacementGLF_dead17y + donor_replacementGLF_dead17c_im;
                        donor_replacementGLF_dead17x = GLF_dead17x_new;
                        GLF_dead12MATRIX_N++;
                        donor_replacementGLF_dead17k++;
                    } while (donor_replacementGLF_dead17k < bitfieldInsert(donor_replacementGLF_dead17iterationCap + (257.0 > GLF_dead17resolution.y ? 1 : 0), 0, 0, 0));
                }
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    {
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            int donor_replacementGLF_dead17iterationCap = _GLF_FUZZED(int(2.9));
                            {
                                donor_replacementGLF_dead17iterationCap += 1;
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = vec4(923.377, -8810.2079, 3654.2364, -480.923);
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                            }
                        }
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        {
                            ivec2 GLF_live21p = _GLF_FUZZED(ivec2(84054, -44166));
                            {
                                GLF_live21p = GLF_live21iter(GLF_live21p);
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = log(vec4(-0.4, 2.0, -514.189, -837.042));
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                            }
                        }
                        _GLF_color = vec4(46.80, -2493.0552, -684.924, 6.0);
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                        if (_GLF_DEAD(_GLF_IDENTITY(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)), false || (_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))))) {
                            {
                                ;
                            }
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = vec4(-5.2, 463.167, 3309.6637, 797.040);
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                        }
                    }
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            vec2 g = vec2(float(j), float(i));
            vec2 o = mix(n, g, 0.2);
            if (injectionSwitch.x < (_GLF_IDENTITY(m.x, clamp(m.x, m.x, _GLF_IDENTITY(m.x, float(mat3x4(m.x, 1.0, 0.0, 0.0, 1.0, 0.0, _GLF_ONE(1.0, injectionSwitch.y), sqrt(1.0), cos(0.0), 0.0, 1.0, 0.0))))))) {
                int k = 1;
                while (_GLF_IDENTITY(k >= 0, !(!(_GLF_IDENTITY(k >= 0, true && (k >= 0)))))) {
                    o = o + o;
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                        bool GLF_live5c6 = _GLF_FUZZED((uvec3(9172u, 168087u, 107842u) == uvec3(15057u, 6731u, 187426u)));
                        vec2 GLF_live5pos = _GLF_FUZZED(vec2(-2538.6037, -51.97));
                        vec3 GLF_live5setting = _GLF_FUZZED(vec3(-391.421, -423.683, 4380.1050));
                        if (!GLF_live5c6) {
                            ;
                        }
                    } else {
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = vec4(-1.1, -68.67, 3832.0571, -85.18);
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                    }
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        if (_GLF_DEAD(false)) {
                            int donor_replacementGLF_dead0i = _GLF_FUZZED(j);
                            {
                                if (GLF_dead0obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(i, 10)] <= i) {
                                    donor_replacementGLF_dead0i++;
                                    GLF_dead0swap(donor_replacementGLF_dead0i, i);
                                }
                            }
                            {
                                vec2 GLF_live20coord = _GLF_FUZZED(vec2(-4.2, 463.175));
                                {
                                    ivec2 GLF_live20icoord = ivec2(((GLF_live20coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.6, 1.0)) * 256.0);
                                    int GLF_live20v = (GLF_live20icoord.x ^ GLF_live20icoord.y) * GLF_live20icoord.y;
                                    bool GLF_live20res1 = ((GLF_live20v >> 10) & 1) != 0;
                                    bool GLF_live20res2 = ((GLF_live20v >> 11) & 4) != 0;
                                    bool GLF_live20res3 = ((GLF_live20v >> 12) & 8) != 0;
                                    GLF_live20_GLF_color = vec4(GLF_live20res1 ? 1.0 : 0.0, GLF_live20res2 ? 1.0 : 0.0, GLF_live20res3 ? 1.0 : 0.0, 1);
                                }
                            }
                        }
                        if (_GLF_WRAPPED_IF_FALSE(false)) {
                        } else {
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                        }
                        _GLF_color = vec4(1172.4821, -_GLF_IDENTITY(9.5, min(9.5, _GLF_IDENTITY(9.5, 0.0 + (9.5)))), -212.519, -760.479);
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(true, bool(bvec4(true, false, true, true))))) {
                            {
                                {
                                    ;
                                }
                                {
                                    float GLF_live9pab = _GLF_FUZZED(float(uint((bvec2(false, false) == _GLF_IDENTITY(bvec2(false, false), bvec2(bvec4(bvec2(false, false), false, true)))))));
                                    float GLF_live9pca = _GLF_FUZZED((+9.7));
                                    if (_GLF_IDENTITY(!_GLF_IDENTITY(((GLF_live9pab < 0.0 && GLF_live9pca < 0.0) || (GLF_live9pab >= 0.0 && GLF_live9pca >= 0.0)), true && (((GLF_live9pab < 0.0 && GLF_live9pca < 0.0) || (GLF_live9pab >= 0.0 && GLF_live9pca >= 0.0)))), !(!(!_GLF_IDENTITY(((GLF_live9pab < 0.0 && GLF_live9pca < 0.0) || (GLF_live9pab >= 0.0 && GLF_live9pca >= 0.0)), true && (((GLF_live9pab < 0.0 && GLF_live9pca < 0.0) || (GLF_live9pab >= 0.0 && GLF_live9pca >= 0.0)))))))) {
                                        ;
                                    }
                                }
                            }
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = mat2x4(784.598, 1366.0203, 568.341, 52.44, 547.202, -5.8, -7815.8539, -6.4)[0];
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                    }
                    k--;
                }
                {
                    int GLF_live7looplimiter0 = 0;
                    if (GLF_live7looplimiter0 >= 4) {
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            float donor_replacementGLF_dead12beta = _GLF_FUZZED(step(-7.2, m)[2]);
                            int donor_replacementGLF_dead12k = _GLF_FUZZED(int(189739u));
                            for (int GLF_dead12b = GLF_dead12MATRIX_N - 1; GLF_dead12b >= donor_replacementGLF_dead12k; GLF_dead12b--) {
                                GLF_live9_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12b, 4)] = GLF_live9_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12b, 4)] - (donor_replacementGLF_dead12beta * GLF_live9_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12b, 4)]);
                            }
                        }
                        ;
                    }
                }
                m = vec3(injectionSwitch.x, cos(o));
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = asin(vec4(871.059, -77.43, -24.96, _GLF_IDENTITY(3557.8768, min(3557.8768, 3557.8768))));
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = log(vec4(84.52, -323.756, 5.4, -757.850));
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
            }
        }
    }
    return vec2(m.x, m.y - m.z);
    {
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        _GLF_color = vec4(-764.607, 98.04, -506.110, 8.4);
        if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)), !(!(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0))))))) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
    }
    {
        int GLF_live10looplimiter2 = 0;
        if (GLF_live10looplimiter2 >= 6) {
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = trunc(round(vec4(-263.677, -61.67, -2.3, 4112.5913)));
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            ;
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(4.5, -4.4, 5004.4597, -7.8);
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
        }
    }
}

void main() {
    vec2 uv = gl_FragCoord.xy / resolution.y;
    float A[50];
    for (int i = 0; _GLF_IDENTITY(i, (false ? _GLF_FUZZED(_GLF_IDENTITY(bitfieldReverse(25513), (bitfieldReverse(25513)) | (bitfieldReverse(25513)))) : i)) < 200; i++) {
        if (i >= int(resolution.x)) {
            break;
        }
        if ((4 * (i / 4)) == i) {
            A[i / 4] = float(i);
            {
                ivec2 GLF_live21p = _GLF_FUZZED((ivec2(-14213, 60178) | (-29540)));
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = atan(vec4(863.841, 6.0, 3.7, 1.4), (+vec4(0.9, -5.0, 1682.2422, 9.7)));
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                {
                    int GLF_live21looplimiter1 = 0;
                    while (GLF_live21p.x > 15) {
                        if (GLF_live21looplimiter1 >= 4) {
                            break;
                        }
                        GLF_live21looplimiter1++;
                        {
                            GLF_live21p.x -= 16;
                        }
                    }
                }
            }
        }
    }
    for (int i = 0; i < 50; i++) {
        if (i < int(gl_FragCoord.x)) {
            break;
        }
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = (false ? cosh(vec4(-5.1, 1.3, 5843.3315, 3151.6085)) : vec4(-2329.7295, 1.4, -7.6, 9.2));
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
        {
            vec3 GLF_live10color = _GLF_FUZZED(vec3(-9003.3973, 7027.0813, -6069.0830));
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                int donor_replacementGLF_dead18i = _GLF_FUZZED(GLF_dead12MATRIX_N);
                {
                    if (GLF_dead13_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead18i, 4)] >= 1.0) {
                        GLF_dead13_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead18i, 4)] = GLF_dead13_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead18i, 4)] * GLF_dead13_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead18i, 4)];
                    }
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = log(vec4(-4.8, -2.1, -5.6, 739.845));
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= tan(0.0))))) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    donor_replacementGLF_dead18i++;
                }
            }
            vec2 GLF_live10uv = _GLF_FUZZED(vec2(-63.60, 68.41));
            if (GLF_live10uv.x > (3.0 / 4.0)) {
                GLF_live10color.z += float(GLF_live10obj.numbers[3]);
            }
        }
        if (i > 0) {
            A[i] += A[i - 1];
        }
    }
    vec2 c = pattern((15.0 + tan(_GLF_IDENTITY(0.2, clamp(_GLF_IDENTITY(0.2, (0.2) / 1.0), 0.2, _GLF_IDENTITY(0.2, (false ? _GLF_FUZZED(3.6) : 0.2)))))) * uv);
    vec3 col;
    if (int(gl_FragCoord.y) < 20) {
        {
            int GLF_live7result = _GLF_FUZZED(((-_GLF_IDENTITY(33465, (_GLF_IDENTITY(33465, 1 * (33465))) | _GLF_IDENTITY((_GLF_IDENTITY(33465, (true ? 33465 : _GLF_FUZZED(GLF_dead3N)))), ((_GLF_IDENTITY(33465, (true ? 33465 : _GLF_FUZZED(GLF_dead3N))))) - 0))) * _GLF_IDENTITY((-63759), ((-63759)) + 0)));
            int GLF_live7sum = _GLF_IDENTITY(_GLF_FUZZED(-83562), min(_GLF_FUZZED(-83562), _GLF_IDENTITY(_GLF_FUZZED(-83562), clamp(_GLF_FUZZED(-83562), _GLF_FUZZED(-83562), _GLF_FUZZED(-83562)))));
            if (GLF_live7result > 0) {
                for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < ((1 << _GLF_IDENTITY(int(6), int(6))) >> _GLF_IDENTITY(int(6), int(6)))); _injected_loop_counter++) {
                    GLF_live7sum += GLF_live7result;
                }
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(-5.9, 481.875, -57.22, -5.4);
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= determinant(mat4(0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 0.0, 1.0, 1.0, 0.0)))))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < abs(0.0))))) {
                    int donor_replacementGLF_dead18i = _GLF_FUZZED(sign(GLF_dead12MATRIX_N));
                    float donor_replacementGLF_dead18limit = _GLF_FUZZED(49.91);
                    float donor_replacementGLF_dead18ref = _GLF_FUZZED(GLF_dead13one);
                    float donor_replacementGLF_dead18s = _GLF_FUZZED(GLF_dead13one);
                    while (donor_replacementGLF_dead18i < bitfieldInsert(800, donor_replacementGLF_dead18i, 0, 0)) {
                        if (mod(float(donor_replacementGLF_dead18i), donor_replacementGLF_dead18ref) <= 0.01) {
                            donor_replacementGLF_dead18s += 0.2;
                        }
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = vec3(-4.3, 984.985, 968.409).spts;
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                        if (float(donor_replacementGLF_dead18i) >= donor_replacementGLF_dead18limit) {
                            ;
                            {
                                vec2 GLF_live20coord = _GLF_FUZZED(vec2(9570.6746, -62.05));
                                if (GLF_live20coord.y < 0.6) {
                                    uvec2 GLF_live20icoord = uvec2(((GLF_live20coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                                    uint GLF_live20res1 = uint(((GLF_live20icoord.x * GLF_live20icoord.y) >> (GLF_live20icoord.x & 31u)) & 0xffffffffu);
                                    uint GLF_live20res2 = uint(((GLF_live20icoord.x * GLF_live20icoord.y) << (GLF_live20icoord.x & 31u)) & 0xffffffffu);
                                    float GLF_live20res = float(((GLF_live20res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_live20res1 & 1u) != 0u ? 1u : 0u));
                                    GLF_live20_GLF_color = vec4(GLF_live20res, GLF_live20res, GLF_live20res, 1.0);
                                } else {
                                    ivec2 GLF_live20icoord = ivec2(((GLF_live20coord - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                                    int GLF_live20res3 = ((GLF_live20icoord.x >> 5) & 1) ^ ((GLF_live20icoord.y & 32) >> 5);
                                    int GLF_live20res2 = (GLF_live20icoord.y * GLF_live20icoord.y >> 10) & 1;
                                    int GLF_live20res1 = (GLF_live20icoord.x * GLF_live20icoord.y >> 9) & 1;
                                    GLF_live20_GLF_color = vec4(float(GLF_live20res1 ^ GLF_live20res2), float(GLF_live20res2 & GLF_live20res3), float(GLF_live20res1 | GLF_live20res3), 1.0);
                                }
                            }
                        }
                        donor_replacementGLF_dead18i++;
                    }
                }
            } else {
                switch (GLF_live7result) {
                    case -1:
                        GLF_live7sum += 1;
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = vec4(-1.7, -7.4, 1201.7654, 8.5);
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                        break;
                        {
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = vec4(-1712.8344, 1.7, -7.9, 9.1);
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                            {
                                ;
                            }
                        }
                    case 0:
                        for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
                            ;
                        }
                }
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(-34.17, -24.02, -5050.0487, -2.1);
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
            }
            {
                ivec2 GLF_live21p = _GLF_FUZZED(ivec2(70018, -5663));
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = ceil(vec4(-4.7, -5668.7551, -1877.0316, -6.2));
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                if (GLF_live21p.x < 0) {
                    GLF_live21p.y++;
                }
            }
            {
                {
                    ;
                }
            }
        }
        for (int _injected_loop_counter = int(_GLF_ONE(1.0, injectionSwitch.y)); _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
            if (_GLF_DEAD(false)) {
                int donor_replacementGLF_dead13cols = _GLF_FUZZED(bitfieldExtract(97833, ivec2(40221, -85697)[0], _injected_loop_counter));
                uint donor_replacementGLF_dead13matrix_number = _GLF_FUZZED(159765u);
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = smoothstep(7879.9075, -9.0, vec4(-4.8, -7.5, -97.93, 1.4));
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                {
                    for (int GLF_dead13c = 0; GLF_dead13c < donor_replacementGLF_dead13cols; _GLF_IDENTITY(GLF_dead13c++, (GLF_dead13c++) >> 0)) {
                        for (int GLF_dead13r = 0; GLF_dead13r < _injected_loop_counter; GLF_dead13r++) {
                            switch (donor_replacementGLF_dead13matrix_number) {
                                case 0u:
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                        if (0.0 > GLF_dead17resolution.y) {
                                            donor_replacementGLF_dead13cols += 1;
                                        }
                                    }
                                    GLF_dead13m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13r, 2)] = GLF_dead13one;
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        _GLF_color = vec4(5.4, -6.5, 7.4, -122.817);
                                        {
                                            {
                                                ;
                                            }
                                        }
                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                    }
                                    break;
                                case 1u:
                                    GLF_dead13m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13r, 3)] = GLF_dead13one;
                                    break;
                                case 2u:
                                    GLF_dead13m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13r, 4)] = GLF_dead13one;
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        _GLF_color = dFdyCoarse(vec4(-9744.5915, 98.84, 6.6, -1.4));
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            {
                                                vec4 _GLF_outVarBackup_GLF_color;
                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                _GLF_color = unpackUnorm4x8(11344u);
                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                }
                                            }
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                    }
                                    break;
                                case 3u:
                                    GLF_dead13m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13r, 2)] = GLF_dead13one;
                                    break;
                                case 4u:
                                    GLF_dead13m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13r, 3)] = _GLF_IDENTITY(GLF_dead13one, (_GLF_IDENTITY(GLF_dead13one, mix(float(GLF_dead13one), float(_GLF_FUZZED(-3.9)), bool(false)))) + 0.0);
                                    break;
                                case 5u:
                                    GLF_dead13m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13r, 4)] = GLF_dead13one;
                                    break;
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                        int donor_replacementGLF_dead18i = _GLF_FUZZED((bitfieldExtract(GLF_dead13c, GLF_dead3N, GLF_dead13c) % (donor_replacementGLF_dead13cols)));
                                        {
                                            GLF_dead13_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead18i, 4)] = GLF_dead13_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead18i, 4)] * GLF_dead13_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead18i, 4)];
                                        }
                                    }
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        _GLF_color = vec4(-32.98, 2704.5853, 2.5, -756.715);
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            {
                                                vec2 GLF_live18coord = _GLF_FUZZED(vec2(-955.619, 8.2));
                                                int GLF_live18i = _GLF_FUZZED(-20260);
                                                int GLF_live18looplimiter0 = 0;
                                                vec4 GLF_live18texel = _GLF_FUZZED(vec4(7.0, -3243.5610, -36.73, 32.01));
                                                {
                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                    _GLF_color = vec4(-23.73, -8.3, 76.01, 3969.0961);
                                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                    }
                                                }
                                                {
                                                    if (GLF_live18looplimiter0 >= 3) {
                                                        ;
                                                    }
                                                    GLF_live18looplimiter0++;
                                                    {
                                                        vec4 _GLF_outVarBackup_GLF_color;
                                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                                        _GLF_color = vec4(-5353.9309, -3.4, 2.0, 81.86);
                                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= _GLF_IDENTITY(0.0, (0.0) * 1.0))))) {
                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                        }
                                                    }
                                                    {
                                                        GLF_live18coord = GLF_live18texel.xz + GLF_live18texel.yy;
                                                        GLF_live18coord = floor(GLF_live18coord * 256.0) / 256.0;
                                                        GLF_live18texel = texture(GLF_live18tex, GLF_live18coord);
                                                        GLF_live18i++;
                                                    }
                                                }
                                            }
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                    }
                                case 6u:
                                    GLF_dead13m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13r, 2)] = GLF_dead13one;
                                    break;
                                case 7u:
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        _GLF_color = radians(vec4(-62.42, -7.6, 82.34, 1.2));
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                    }
                                    GLF_dead13m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13r, 3)] = GLF_dead13one;
                                    break;
                                case 8u:
                                    GLF_dead13m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13r, 4)] = GLF_dead13one;
                                    break;
                            }
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = vec4(7.3, -3.1, 3.5, 6794.1643);
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                        }
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        {
                            break;
                        }
                    }
                    donor_replacementGLF_dead13matrix_number = donor_replacementGLF_dead13matrix_number + 1u;
                }
            }
            _GLF_IDENTITY(col = .5 + cos(c.y + vec3(resolution.x, A[4] / resolution.x + 50.0, 22.0)), (_GLF_IDENTITY(col = .5 + cos(c.y + vec3(resolution.x, A[4] / resolution.x + 50.0, 22.0)), (col = .5 + cos(c.y + vec3(resolution.x, A[4] / resolution.x + 50.0, 22.0))) / vec3(1.0, 1.0, 1.0))) + vec3(0.0, 0.0, 0.0));
            if (_GLF_DEAD(false)) {
                vec3 donor_replacementGLF_dead14m = _GLF_FUZZED(col);
                vec2 donor_replacementGLF_dead14o = _GLF_FUZZED(c);
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = cos(vec4(0.7, 963.511, 519.570, 8558.3224));
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                {
                    int GLF_dead14k = 1;
                    {
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = vec4(-23.79, 6327.2427, -0.9, -4.7);
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                        vec2 GLF_live20coord = _GLF_FUZZED((mat3x2(-8.7, 32.49, 3458.1539, -30.15, -926.821, 44.23) * vec3(825.420, -664.993, 4.0)));
                        {
                            if (GLF_live20coord.y < 0.6) {
                                uvec2 GLF_live20icoord = uvec2(((GLF_live20coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                                uint GLF_live20res1 = uint(((GLF_live20icoord.x * GLF_live20icoord.y) >> (GLF_live20icoord.x & 31u)) & 0xffffffffu);
                                uint GLF_live20res2 = uint(((GLF_live20icoord.x * GLF_live20icoord.y) << (GLF_live20icoord.x & 31u)) & 0xffffffffu);
                                float GLF_live20res = float(((GLF_live20res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_live20res1 & 1u) != 0u ? 1u : 0u));
                                GLF_live20_GLF_color = vec4(GLF_live20res, GLF_live20res, GLF_live20res, 1.0);
                            } else {
                                ivec2 GLF_live20icoord = ivec2(((GLF_live20coord - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                                int GLF_live20res3 = ((GLF_live20icoord.x >> 5) & 1) ^ ((GLF_live20icoord.y & 32) >> 5);
                                int GLF_live20res2 = (GLF_live20icoord.y * GLF_live20icoord.y >> 10) & 1;
                                int GLF_live20res1 = (GLF_live20icoord.x * GLF_live20icoord.y >> 9) & 1;
                                GLF_live20_GLF_color = vec4(float(GLF_live20res1 ^ GLF_live20res2), float(GLF_live20res2 & GLF_live20res3), float(GLF_live20res1 | GLF_live20res3), 1.0);
                            }
                        }
                    }
                    while (GLF_dead14k >= 0) {
                        donor_replacementGLF_dead14o = donor_replacementGLF_dead14o + donor_replacementGLF_dead14o;
                        GLF_dead14k--;
                    }
                    donor_replacementGLF_dead14m = vec3(GLF_dead14injectionSwitch.x, _GLF_IDENTITY(cos(donor_replacementGLF_dead14o), max(cos(donor_replacementGLF_dead14o), cos(donor_replacementGLF_dead14o))));
                }
            }
            {
                ivec2 GLF_live21p = _GLF_FUZZED(ivec2(77856, -80101));
                {
                    GLF_live21p = GLF_live21iter(GLF_live21p);
                }
            }
            {
                int GLF_live8a = _GLF_FUZZED(((_GLF_IDENTITY((-21199), ((-21199)) >> 0) + (_GLF_IDENTITY(-67977, min(_GLF_IDENTITY(-67977, 0 | (-67977)), -67977)))) * (-37752)));
                int GLF_live8looplimiter0 = 0;
                vec2 GLF_live8uv = _GLF_FUZZED(((-5.8) + vec2(214.390, -905.566)));
                do {
                    if (GLF_live8looplimiter0 >= 6) {
                        break;
                    }
                    GLF_live8looplimiter0++;
                    {
                        GLF_live8uv.y -= step(GLF_live8injectionSwitch.y, GLF_live8uv.x);
                        GLF_live8uv.x -= _GLF_IDENTITY(fract(tanh(GLF_live8uv.x)) / ldexp(GLF_live8injectionSwitch.y, findMSB(GLF_live8a)), mix(float(_GLF_FUZZED(-9.1)), float(_GLF_IDENTITY(fract(tanh(GLF_live8uv.x)) / ldexp(GLF_live8injectionSwitch.y, findMSB(GLF_live8a)), mix(float(fract(tanh(GLF_live8uv.x)) / ldexp(GLF_live8injectionSwitch.y, findMSB(GLF_live8a))), float(_GLF_FUZZED(-7072.1383)), bool(false)))), bool(true)));
                        GLF_live8a--;
                    }
                } while (GLF_live8a > int(GLF_live8injectionSwitch.x));
            }
        }
    } else if (int(gl_FragCoord.y) < 40) {
        col = .5 + cos(c.y + vec3(resolution.x, A[9] / resolution.x + 50.0, 22.0));
    } else if (int(gl_FragCoord.y) < 60) {
        col = .5 + cos(c.y + vec3(resolution.x, A[14] / _GLF_IDENTITY(resolution.x, mix(float(resolution.x), _GLF_IDENTITY(float(_GLF_FUZZED(float(GLF_dead3N))), (_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)) ? _GLF_IDENTITY(float(_GLF_FUZZED(float(GLF_dead3N))), float(mat2x3(float(_GLF_FUZZED(float(GLF_dead3N))), 0.0, 0.0, 1.0, 1.0, 0.0))) : _GLF_FUZZED(((-8.3) - 7320.2719)))), bool(false))) + 50.0, 22.0));
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = vec4(2484.5179, -4600.3361, 25.26, -5705.5180);
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
    } else {
        for (int _injected_loop_counter = (0 >> _GLF_IDENTITY(int(4), _GLF_IDENTITY(int(4), ~_GLF_IDENTITY((~(_GLF_IDENTITY(int(4), (int(4)) >> 0))), ((~(_GLF_IDENTITY(int(4), (int(4)) >> 0)))) | (_GLF_IDENTITY((~(_GLF_IDENTITY(int(4), (int(4)) >> 0))), (false ? _GLF_FUZZED(-1611) : _GLF_IDENTITY((~(_GLF_IDENTITY(int(4), (int(4)) >> 0))), (0 | 0) ^ ((~_GLF_IDENTITY((_GLF_IDENTITY(int(4), (int(4)) >> 0)), ~(~((_GLF_IDENTITY(int(4), (int(4)) >> 0))))))))))))))); _GLF_WRAPPED_LOOP(_GLF_IDENTITY(_injected_loop_counter, (_GLF_IDENTITY(_injected_loop_counter, min(_injected_loop_counter, _injected_loop_counter))) >> 0) != 1); _injected_loop_counter++) {
            if (_GLF_DEAD(false)) {
                mat4 donor_replacementGLF_dead12matrix_a = _GLF_FUZZED((525.303 / mat4(-7.1, 4700.2428, 6.0, 9655.9570, -3.0, -2562.6948, -80.01, -3.4, 8.8, -694.454, -8941.9756, 78.07, -9672.5173, 1055.8002, -83.99, -1942.3994)));
                for (int GLF_dead12j = (GLF_dead12MATRIX_N - 1); GLF_dead12j >= (_injected_loop_counter + 1); GLF_dead12j--) {
                    _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(_injected_loop_counter, 4)] -= (donor_replacementGLF_dead12matrix_a[_GLF_MAKE_IN_BOUNDS_INT(_injected_loop_counter, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12j, 4)] * _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12j, 4)]);
                }
            }
            do {
                {
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = mat3x4(2.3, 9.0, -8291.6335, 3.2, -50.63, -2876.2175, 8318.0199, 6859.0473, 0.0, 6.0, -97.61, 8.1)[1];
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(-3.3, -3260.2030, -48.57, 422.536);
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                if (int(gl_FragCoord.y) < 80) {
                    col = .5 + cos(c.y + vec3(resolution.x, _GLF_IDENTITY(A[39] / _GLF_IDENTITY(resolution.x, (false ? _GLF_FUZZED(GLF_dead13one) : resolution.x)), _GLF_IDENTITY(float(_GLF_IDENTITY(float(A[39] / _GLF_IDENTITY(resolution.x, (false ? _GLF_FUZZED(GLF_dead13one) : resolution.x))), clamp(float(A[39] / _GLF_IDENTITY(resolution.x, (false ? _GLF_FUZZED(GLF_dead13one) : resolution.x))), float(A[39] / _GLF_IDENTITY(resolution.x, (false ? _GLF_FUZZED(GLF_dead13one) : resolution.x))), _GLF_IDENTITY(float(A[39] / _GLF_IDENTITY(resolution.x, (false ? _GLF_FUZZED(GLF_dead13one) : resolution.x))), min(float(A[39] / _GLF_IDENTITY(resolution.x, (false ? _GLF_FUZZED(GLF_dead13one) : resolution.x))), float(A[39] / _GLF_IDENTITY(resolution.x, (false ? _GLF_FUZZED(GLF_dead13one) : resolution.x)))))))), max(float(_GLF_IDENTITY(float(A[39] / _GLF_IDENTITY(resolution.x, (false ? _GLF_FUZZED(GLF_dead13one) : resolution.x))), clamp(float(A[39] / _GLF_IDENTITY(resolution.x, (false ? _GLF_FUZZED(GLF_dead13one) : resolution.x))), float(A[39] / _GLF_IDENTITY(resolution.x, (false ? _GLF_FUZZED(GLF_dead13one) : resolution.x))), _GLF_IDENTITY(float(A[39] / _GLF_IDENTITY(resolution.x, (false ? _GLF_FUZZED(GLF_dead13one) : resolution.x))), min(float(A[39] / _GLF_IDENTITY(resolution.x, (false ? _GLF_FUZZED(GLF_dead13one) : resolution.x))), float(A[39] / _GLF_IDENTITY(resolution.x, (false ? _GLF_FUZZED(GLF_dead13one) : resolution.x)))))))), float(_GLF_IDENTITY(float(A[39] / _GLF_IDENTITY(resolution.x, (false ? _GLF_FUZZED(GLF_dead13one) : resolution.x))), clamp(float(A[39] / _GLF_IDENTITY(resolution.x, (false ? _GLF_FUZZED(GLF_dead13one) : resolution.x))), float(A[39] / _GLF_IDENTITY(resolution.x, (false ? _GLF_FUZZED(GLF_dead13one) : resolution.x))), _GLF_IDENTITY(float(A[39] / _GLF_IDENTITY(resolution.x, (false ? _GLF_FUZZED(GLF_dead13one) : resolution.x))), min(float(A[39] / _GLF_IDENTITY(resolution.x, (false ? _GLF_FUZZED(GLF_dead13one) : resolution.x))), float(A[39] / _GLF_IDENTITY(resolution.x, (false ? _GLF_FUZZED(GLF_dead13one) : resolution.x))))))))))) + 50.0, 22.0));
                } else {
                    if (_GLF_DEAD(false)) {
                        for (int GLF_dead11i = 0; GLF_dead11i < 3; GLF_dead11i++) {
                            if (col[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11i, 3)] >= 1.0) {
                                col[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11i, 3)] = _GLF_IDENTITY(col, min(col, col))[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11i, 3)] * _GLF_IDENTITY(col[_GLF_MAKE_IN_BOUNDS_INT(_GLF_IDENTITY(GLF_dead11i, (GLF_dead11i) << (0 << _GLF_IDENTITY(int(2), int(2)))), 3)], (false ? _GLF_FUZZED(GLF_dead13one) : col[_GLF_MAKE_IN_BOUNDS_INT(_GLF_IDENTITY(GLF_dead11i, (GLF_dead11i) << (0 << _GLF_IDENTITY(int(2), int(2)))), 3)]));
                            }
                        }
                    }
                    {
                        bool GLF_live5c8 = _GLF_IDENTITY(_GLF_FUZZED((ivec3(-25978, -44278, -25136) != ivec3(-46029, -87959, 17479))), !(!(_GLF_IDENTITY(_GLF_FUZZED((ivec3(-25978, -44278, -25136) != ivec3(-46029, -87959, 17479))), (_GLF_FUZZED((ivec3(-25978, -44278, -25136) != ivec3(-46029, -87959, 17479)))) && true))));
                        vec2 GLF_live5pos = _GLF_FUZZED(vec2(-1.1, 628.688));
                        {
                            int GLF_live8l = _GLF_FUZZED((-98792));
                            int GLF_live8m = _GLF_FUZZED(-1044);
                            {
                                GLF_live8l = GLF_live8m + 1;
                            }
                        }
                        vec3 GLF_live5setting = _GLF_IDENTITY(_GLF_FUZZED(vec3(8326.7642, 89.52, 1.7)), (true ? _GLF_FUZZED(vec3(8326.7642, 89.52, 1.7)) : _GLF_FUZZED(col)));
                        if (!GLF_live5c8) {
                            ;
                        }
                    }
                    if (int(gl_FragCoord.y) < 100) {
                        col = .5 + cos(c.y + vec3(resolution.x, A[39] / resolution.x + 50.0, _GLF_IDENTITY(22.0, (_GLF_IDENTITY(22.0, clamp(22.0, 22.0, 22.0))) / 1.0)));
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = vec4(7.5, -816.057, 8.0, 967.916);
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= abs(0.0))))) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                    } else {
                        {
                            int GLF_live10looplimiter1 = 0;
                            if (GLF_live10looplimiter1 >= 6) {
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = vec4(-4381.7276, 249.589, 0.0, -54.27);
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                                ;
                            }
                        }
                        if (int(gl_FragCoord.y) < 120) {
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    vec2 donor_replacementGLF_dead2coord = _GLF_FUZZED(cosh((resolution / floor(-4.0))));
                                    {
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            donor_replacementGLF_dead2coord = _GLF_color.xz + _GLF_color.yy;
                                            {
                                                {
                                                    ;
                                                }
                                                {
                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                    _GLF_color = pow(vec2(-207.744, -4.5).ssts, vec4(-225.383, -2.6, 428.530, 449.096));
                                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                    }
                                                }
                                            }
                                            {
                                                vec4 _GLF_outVarBackup_GLF_color;
                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                _GLF_color = vec4(-9.8, 8.7, -42.81, -5.5);
                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                }
                                            }
                                        } else {
                                        }
                                        donor_replacementGLF_dead2coord = floor(donor_replacementGLF_dead2coord * 256.0) / 256.0;
                                        {
                                            vec4 _GLF_outVarBackup_GLF_color;
                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                            _GLF_color = vec4(7.7, 83.37, 6.4, -5.4);
                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                {
                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                    _GLF_color = vec4(6097.2448, -6.7, 83.52, 35.55);
                                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                    }
                                                }
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                            }
                                            {
                                                vec4 _GLF_outVarBackup_GLF_color;
                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                _GLF_color = vec4(8.5, -432.770, 935.226, 3.3);
                                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                }
                                            }
                                        }
                                        _GLF_color = texture(GLF_dead2tex, donor_replacementGLF_dead2coord);
                                        _injected_loop_counter++;
                                        {
                                            vec4 _GLF_outVarBackup_GLF_color;
                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                            _GLF_color = (mat4(629.197, 6.3, 1.2, -1.2, -6.6, 8519.9864, -4.0, -8.2, -2095.6856, -9.9, 932.815, -7990.3046, -2251.2651, 9.7, 2.3, -5.5) * max(vec4(-7005.1986, -60.97, -2298.8137, -4.6), _GLF_IDENTITY(-62.80, (_GLF_IDENTITY(-62.80, min(-62.80, -62.80))) * 1.0)));
                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                            }
                                        }
                                    }
                                    {
                                        {
                                            vec2 GLF_live18coord = _GLF_FUZZED(vec2(-15.54));
                                            int GLF_live18i = _GLF_FUZZED(((ivec3(65737, 58705, -46609) == ivec3(28206, -41864, -41652)) ? (-54155) : 72666));
                                            int GLF_live18looplimiter0 = 0;
                                            vec4 GLF_live18texel = _GLF_FUZZED(vec4(33.54, 74.39, -9.5, -1.7));
                                            while (GLF_live18texel.x + GLF_live18texel.y + GLF_live18texel.z > 1.0 && GLF_live18i < 16) {
                                                if (GLF_live18looplimiter0 >= 3) {
                                                    {
                                                        vec4 _GLF_outVarBackup_GLF_color;
                                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                                        _GLF_color = atan(vec4(-7.9, -4.2, 195.187, 107.958));
                                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                        }
                                                    }
                                                    break;
                                                }
                                                GLF_live18looplimiter0++;
                                                {
                                                    GLF_live18coord = GLF_live18texel.xz + GLF_live18texel.yy;
                                                    GLF_live18coord = floor(GLF_live18coord * 256.0) / 256.0;
                                                    GLF_live18texel = texture(GLF_live18tex, GLF_live18coord);
                                                    GLF_live18i++;
                                                }
                                            }
                                        }
                                        {
                                            vec4 _GLF_outVarBackup_GLF_color;
                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                            _GLF_color = sinh((vec4(-5.2, 915.305, -9728.5540, 6133.9076)));
                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                            }
                                        }
                                        {
                                            GLF_live9_GLF_color = vec4(0.0, 0.0, 0.0, 1.0);
                                        }
                                    }
                                }
                                col = .5 + cos(c.y + vec3(resolution.x, A[39] / resolution.x + 50.0, 22.0));
                            } else {
                                {
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        _GLF_color = (mat4(78.83, 259.543, -839.051, -621.970, 0.4, -4.1, 3.6, 5847.3786, 143.754, -6.5, -7.2, -228.639, 42.64, 8042.7939, -0.8, -1.4) * vec4(-2.2, 5.8, 2.9, 0.4));
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                    }
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    if (_GLF_DEAD(_GLF_IDENTITY(false, bool(bvec4(_GLF_IDENTITY(false, true && (_GLF_IDENTITY(false, bool(bvec3(_GLF_IDENTITY(false, !(!(false))), false, false))))), false, true, true))))) {
                                        int donor_replacementGLF_dead3high = _GLF_FUZZED(-55204);
                                        int donor_replacementGLF_dead3i = _GLF_FUZZED(ivec4(-87440, 11365, -35103, -215).p);
                                        int donor_replacementGLF_dead3m = _GLF_FUZZED(_injected_loop_counter);
                                        {
                                            vec4 _GLF_outVarBackup_GLF_color;
                                            {
                                                vec2 GLF_live18coord = _GLF_FUZZED((7.0 - vec2(-2043.5246, -4284.7310)));
                                                int GLF_live18i = _GLF_FUZZED(85618);
                                                int GLF_live18looplimiter0 = 0;
                                                vec4 GLF_live18texel = _GLF_FUZZED((vec4(-36.09, 3.0, 34.19, -7.4) - vec4(vec2(7.4, 2215.3987), -3782.3019, 5318.2885)));
                                                {
                                                    if (GLF_live18looplimiter0 >= 3) {
                                                        ;
                                                    }
                                                    GLF_live18looplimiter0++;
                                                    {
                                                        GLF_live18coord = GLF_live18texel.xz + GLF_live18texel.yy;
                                                        GLF_live18coord = floor(GLF_live18coord * 256.0) / 256.0;
                                                        GLF_live18texel = texture(GLF_live18tex, GLF_live18coord);
                                                        GLF_live18i++;
                                                    }
                                                }
                                            }
                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                            _GLF_color = vec4(-51.08, -135.957, 64.78, _GLF_IDENTITY(3.7, _GLF_IDENTITY(float(_GLF_IDENTITY(vec4(3.7, 0.0, 0.0, _GLF_IDENTITY(dot(vec4(0.0, 1.0, 0.0, 0.0), vec4(0.0, 1.0, 0.0, _GLF_ZERO(0.0, injectionSwitch.x))), dot(vec4(0.0, 1.0, 0.0, 0.0), vec4(0.0, 1.0, 0.0, _GLF_ZERO(0.0, injectionSwitch.x))))), clamp(vec4(3.7, 0.0, 0.0, _GLF_IDENTITY(dot(vec4(0.0, 1.0, 0.0, 0.0), vec4(0.0, 1.0, 0.0, _GLF_ZERO(0.0, injectionSwitch.x))), dot(vec4(0.0, 1.0, 0.0, 0.0), vec4(0.0, 1.0, 0.0, _GLF_ZERO(0.0, injectionSwitch.x))))), vec4(3.7, 0.0, 0.0, _GLF_IDENTITY(dot(vec4(0.0, 1.0, 0.0, 0.0), vec4(0.0, 1.0, 0.0, _GLF_ZERO(0.0, injectionSwitch.x))), dot(vec4(0.0, 1.0, 0.0, 0.0), vec4(0.0, 1.0, 0.0, _GLF_ZERO(0.0, injectionSwitch.x))))), vec4(3.7, 0.0, 0.0, _GLF_IDENTITY(dot(vec4(0.0, 1.0, 0.0, 0.0), vec4(0.0, 1.0, 0.0, _GLF_ZERO(0.0, injectionSwitch.x))), dot(vec4(0.0, 1.0, 0.0, 0.0), vec4(0.0, 1.0, 0.0, _GLF_ZERO(0.0, injectionSwitch.x)))))))), (_GLF_IDENTITY(float(_GLF_IDENTITY(vec4(3.7, 0.0, 0.0, _GLF_IDENTITY(dot(vec4(0.0, 1.0, 0.0, 0.0), vec4(0.0, 1.0, 0.0, _GLF_ZERO(0.0, injectionSwitch.x))), dot(vec4(0.0, 1.0, 0.0, 0.0), vec4(0.0, 1.0, 0.0, _GLF_ZERO(0.0, injectionSwitch.x))))), clamp(vec4(3.7, 0.0, 0.0, _GLF_IDENTITY(dot(vec4(0.0, 1.0, 0.0, 0.0), vec4(0.0, 1.0, 0.0, _GLF_ZERO(0.0, injectionSwitch.x))), dot(vec4(0.0, 1.0, 0.0, 0.0), vec4(0.0, 1.0, 0.0, _GLF_ZERO(0.0, injectionSwitch.x))))), vec4(3.7, 0.0, 0.0, _GLF_IDENTITY(dot(vec4(0.0, 1.0, 0.0, 0.0), vec4(0.0, 1.0, 0.0, _GLF_ZERO(0.0, injectionSwitch.x))), dot(vec4(0.0, 1.0, 0.0, 0.0), vec4(0.0, 1.0, 0.0, _GLF_ZERO(0.0, injectionSwitch.x))))), vec4(3.7, 0.0, 0.0, _GLF_IDENTITY(dot(vec4(0.0, 1.0, 0.0, 0.0), vec4(0.0, 1.0, 0.0, _GLF_ZERO(0.0, injectionSwitch.x))), dot(vec4(0.0, 1.0, 0.0, 0.0), vec4(0.0, 1.0, 0.0, _GLF_ZERO(0.0, injectionSwitch.x)))))))), 0.0 + (float(_GLF_IDENTITY(vec4(3.7, 0.0, 0.0, _GLF_IDENTITY(dot(vec4(0.0, 1.0, 0.0, 0.0), vec4(0.0, 1.0, 0.0, _GLF_ZERO(0.0, injectionSwitch.x))), dot(vec4(0.0, 1.0, 0.0, 0.0), vec4(0.0, 1.0, 0.0, _GLF_ZERO(0.0, injectionSwitch.x))))), clamp(vec4(3.7, 0.0, 0.0, _GLF_IDENTITY(dot(vec4(0.0, 1.0, 0.0, 0.0), vec4(0.0, 1.0, 0.0, _GLF_ZERO(0.0, injectionSwitch.x))), dot(vec4(0.0, 1.0, 0.0, 0.0), vec4(0.0, 1.0, 0.0, _GLF_ZERO(0.0, injectionSwitch.x))))), vec4(3.7, 0.0, 0.0, _GLF_IDENTITY(dot(vec4(0.0, 1.0, 0.0, 0.0), vec4(0.0, 1.0, 0.0, _GLF_ZERO(0.0, injectionSwitch.x))), dot(vec4(0.0, 1.0, 0.0, 0.0), vec4(0.0, 1.0, 0.0, _GLF_ZERO(0.0, injectionSwitch.x))))), vec4(3.7, 0.0, 0.0, _GLF_IDENTITY(dot(vec4(0.0, 1.0, 0.0, 0.0), vec4(0.0, 1.0, 0.0, _GLF_ZERO(0.0, injectionSwitch.x))), dot(vec4(0.0, 1.0, 0.0, 0.0), vec4(0.0, 1.0, 0.0, _GLF_ZERO(0.0, injectionSwitch.x))))))))))) - 0.0)));
                                            if (_GLF_DEAD(false)) {
                                                float donor_replacementGLF_dead18limit = _GLF_FUZZED(normalize(-1.3));
                                                {
                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                    _GLF_color = mod(vec4(-0.0, 4.2, -7.4, 7.7), vec4(985.748, -2.9, -3.4, -5738.5030));
                                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)), (_GLF_TRUE(true, (gl_FragCoord.y >= 0.0))) && true))) {
                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                    }
                                                }
                                                float donor_replacementGLF_dead18ref = _GLF_FUZZED(GLF_dead13one);
                                                float donor_replacementGLF_dead18s = _GLF_FUZZED(sign(GLF_dead13one));
                                                {
                                                    if (mod(float(donor_replacementGLF_dead3i), donor_replacementGLF_dead18ref) <= 0.01) {
                                                        donor_replacementGLF_dead18s += 0.2;
                                                    }
                                                    if (float(donor_replacementGLF_dead3i) >= donor_replacementGLF_dead18limit) {
                                                        ;
                                                    }
                                                    donor_replacementGLF_dead3i++;
                                                }
                                            }
                                            {
                                                vec2 GLF_live18coord = _GLF_FUZZED(vec2(-83.23, -5.9));
                                                int GLF_live18i = _GLF_FUZZED(int(155958u));
                                                int GLF_live18looplimiter0 = 0;
                                                vec4 GLF_live18texel = _GLF_FUZZED((-vec4(-5.1, 6.6, -10.95, -0.2)));
                                                while (GLF_live18texel.x + GLF_live18texel.y + GLF_live18texel.z > 1.0 && GLF_live18i < 16) {
                                                    if (GLF_live18looplimiter0 >= 3) {
                                                        break;
                                                    }
                                                    GLF_live18looplimiter0++;
                                                    {
                                                        GLF_live18coord = GLF_live18texel.xz + GLF_live18texel.yy;
                                                        {
                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                            _GLF_color = mat4(-6.7, -817.523, -0.7, -7.7, 93.87, -0.5, 3.5, -3735.0467, -28.43, -754.164, 10.93, -4067.5214, -752.900, -2.9, -33.55, 2.8)[2];
                                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                            }
                                                        }
                                                        GLF_live18coord = floor(GLF_live18coord * 256.0) / 256.0;
                                                        {
                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                            _GLF_color = vec3(-4.6, 425.585, -8.5).xxxx;
                                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                            }
                                                        }
                                                        GLF_live18texel = texture(GLF_live18tex, GLF_live18coord);
                                                        GLF_live18i++;
                                                    }
                                                }
                                            }
                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= _GLF_IDENTITY(0.0, (0.0) + 0.0))))) {
                                                {
                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                    _GLF_color = max(vec4(-11.48, 503.514, -927.083, 602.205), vec4(2411.0086, -7.5, -0.9, -43.73));
                                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                    }
                                                }
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                            }
                                        }
                                        {
                                            if (_GLF_DEAD(_GLF_IDENTITY(false, bool(bvec3(false, _GLF_FALSE(false, (gl_FragCoord.x < 0.0)), true))))) {
                                                vec4 donor_replacementGLF_dead18c = _GLF_FUZZED(vec4(-929.197, 7.9, -2188.4844, -6.3));
                                                int donor_replacementGLF_dead18i = _GLF_FUZZED(donor_replacementGLF_dead3i);
                                                if (donor_replacementGLF_dead18c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead18i, 4)] >= 1.0) {
                                                    donor_replacementGLF_dead18c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead18i, 4)] = donor_replacementGLF_dead18c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead18i, 4)] * donor_replacementGLF_dead18c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead18i, 4)];
                                                }
                                            }
                                            int GLF_dead3from = donor_replacementGLF_dead3i;
                                            int GLF_dead3mid = donor_replacementGLF_dead3i + donor_replacementGLF_dead3m - 1;
                                            int GLF_dead3to = min(donor_replacementGLF_dead3i + 2 * donor_replacementGLF_dead3m - 1, donor_replacementGLF_dead3high);
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                int donor_replacementGLF_dead13cols = _GLF_FUZZED(_GLF_IDENTITY(bitCount(max(_injected_loop_counter, GLF_dead3to)), (bitCount(max(_injected_loop_counter, GLF_dead3to))) + 0));
                                                {
                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                    _GLF_color = (clamp((vec4(659.710, -2.7, -339.936, 7.9) + 3458.6986), (-vec4(-21.78, -4.7, -230.318, -9.2)), vec4(-418.068, -6.7, -719.644, 5142.1195)) / vec4(608.024, vec2(87.12, -3950.3197), -3.1));
                                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                    }
                                                }
                                                uint donor_replacementGLF_dead13matrix_number = _GLF_FUZZED(118366u);
                                                for (int GLF_dead13rows = 2; GLF_dead13rows <= 4; GLF_dead13rows++) {
                                                    for (int GLF_dead13c = 0; GLF_dead13c < donor_replacementGLF_dead13cols; GLF_dead13c++) {
                                                        for (int GLF_dead13r = 0; GLF_dead13r < GLF_dead13rows; GLF_dead13r++) {
                                                            switch (donor_replacementGLF_dead13matrix_number) {
                                                                case 0u:
                                                                    GLF_dead13m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13r, 2)] = GLF_dead13one;
                                                                    {
                                                                        vec4 _GLF_outVarBackup_GLF_color;
                                                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                        _GLF_color = vec4(7.1, 7.9, 9580.1956, 9637.9562);
                                                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                        }
                                                                    }
                                                                    break;
                                                                case 1u:
                                                                    GLF_dead13m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13r, 3)] = GLF_dead13one;
                                                                    {
                                                                        vec4 _GLF_outVarBackup_GLF_color;
                                                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                        _GLF_color = vec4(278.811, -202.434, -9.1, 246.413);
                                                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                        }
                                                                    }
                                                                    break;
                                                                case 2u:
                                                                    GLF_dead13m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13r, 4)] = GLF_dead13one;
                                                                    break;
                                                                case 3u:
                                                                    GLF_dead13m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13r, 2)] = GLF_dead13one;
                                                                    break;
                                                                case 4u:
                                                                    GLF_dead13m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13r, 3)] = GLF_dead13one;
                                                                    break;
                                                                    {
                                                                        vec4 _GLF_outVarBackup_GLF_color;
                                                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                        _GLF_color = vec4(-3.9, 60.05, 6343.4802, 1.3);
                                                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                        }
                                                                    }
                                                                case 5u:
                                                                    GLF_dead13m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13r, 4)] = GLF_dead13one;
                                                                    break;
                                                                case 6u:
                                                                    GLF_dead13m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13r, 2)] = GLF_dead13one;
                                                                    break;
                                                                    {
                                                                        ivec2 GLF_live21p = _GLF_FUZZED(ivec2(62727, 76498));
                                                                        if (GLF_live21p.x < 0) {
                                                                            GLF_live21p.x = -GLF_live21p.x;
                                                                        }
                                                                    }
                                                                case 7u:
                                                                    {
                                                                        vec4 _GLF_outVarBackup_GLF_color;
                                                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                        _GLF_color = vec4(-8.4, 9845.6012, -7.4, -17.53);
                                                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                        }
                                                                    }
                                                                    GLF_dead13m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13r, 3)] = GLF_dead13one;
                                                                    break;
                                                                    {
                                                                        vec4 _GLF_outVarBackup_GLF_color;
                                                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                        _GLF_color = clamp(vec4(-23.82, 3.0, -6735.6566, -624.581), 0.9, -9.1);
                                                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                        }
                                                                    }
                                                                    if (_GLF_DEAD(false)) {
                                                                        vec4 donor_replacementGLF_dead16c = _GLF_FUZZED(tanh(GLF_live9_GLF_color));
                                                                        for (int GLF_dead16i = 0; GLF_dead16i < 3; GLF_dead16i++) {
                                                                            if (donor_replacementGLF_dead16c[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead16i, 4)] >= 1.0) {
                                                                                donor_replacementGLF_dead16c[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead16i, 4)] = donor_replacementGLF_dead16c[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead16i, 4)] * donor_replacementGLF_dead16c[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead16i, 4)];
                                                                            }
                                                                        }
                                                                    }
                                                                case 8u:
                                                                    GLF_dead13m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13r, 4)] = GLF_dead13one;
                                                                    break;
                                                            }
                                                        }
                                                    }
                                                    if (_GLF_DEAD(false)) {
                                                        if (GLF_dead13_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(_injected_loop_counter, 4)] >= 1.0) {
                                                            GLF_dead13_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(_injected_loop_counter, 4)] = GLF_dead13_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(_injected_loop_counter, 4)] * GLF_dead13_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(_injected_loop_counter, 4)];
                                                        }
                                                    }
                                                    donor_replacementGLF_dead13matrix_number = donor_replacementGLF_dead13matrix_number + 1u;
                                                }
                                            }
                                            {
                                                vec4 _GLF_outVarBackup_GLF_color;
                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                _GLF_color = sign(vec3(6.1, -24.79, 96.26).ptpt);
                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                }
                                            }
                                            {
                                                {
                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                    _GLF_color = vec4(550.255, -0.9, -5890.1162, -7.5);
                                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                    }
                                                }
                                                vec2 GLF_live20coord = _GLF_FUZZED(vec2(2215.4018, -54.90));
                                                {
                                                    if (GLF_live20coord.y < 0.6) {
                                                        uvec2 GLF_live20icoord = uvec2(((GLF_live20coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                                                        uint GLF_live20res1 = uint(((GLF_live20icoord.x * GLF_live20icoord.y) >> (GLF_live20icoord.x & 31u)) & 0xffffffffu);
                                                        uint GLF_live20res2 = uint(((GLF_live20icoord.x * GLF_live20icoord.y) << (GLF_live20icoord.x & 31u)) & 0xffffffffu);
                                                        float GLF_live20res = float(((GLF_live20res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_live20res1 & 1u) != 0u ? 1u : 0u));
                                                        GLF_live20_GLF_color = vec4(GLF_live20res, GLF_live20res, GLF_live20res, 1.0);
                                                    } else {
                                                        ivec2 GLF_live20icoord = ivec2(((GLF_live20coord - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                                                        int GLF_live20res3 = ((GLF_live20icoord.x >> 5) & 1) ^ ((GLF_live20icoord.y & 32) >> 5);
                                                        int GLF_live20res2 = (GLF_live20icoord.y * GLF_live20icoord.y >> 10) & 1;
                                                        {
                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                            _GLF_color = max(vec4(141.353, -4326.7415, 7.3, 975.230), 5.1);
                                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                            }
                                                        }
                                                        int GLF_live20res1 = (GLF_live20icoord.x * GLF_live20icoord.y >> 9) & 1;
                                                        GLF_live20_GLF_color = vec4(float(GLF_live20res1 ^ GLF_live20res2), float(GLF_live20res2 & GLF_live20res3), float(GLF_live20res1 | GLF_live20res3), 1.0);
                                                    }
                                                }
                                            }
                                            GLF_dead3merge(GLF_dead3from, GLF_dead3mid, GLF_dead3to);
                                            {
                                                vec4 _GLF_outVarBackup_GLF_color;
                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                _GLF_color = fract(vec4(-3.1, -8.6, -120.289, -919.282));
                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                }
                                            }
                                        }
                                    }
                                    if (_GLF_WRAPPED_IF_FALSE(_GLF_IDENTITY(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)), false || _GLF_IDENTITY((_GLF_FALSE(false, (_GLF_IDENTITY(injectionSwitch.x > injectionSwitch.y, _GLF_FALSE(false, (gl_FragCoord.y < 0.0)) || (injectionSwitch.x > injectionSwitch.y))))), _GLF_TRUE(true, (gl_FragCoord.y >= 0.0)) && (_GLF_IDENTITY((_GLF_FALSE(false, (_GLF_IDENTITY(injectionSwitch.x > injectionSwitch.y, _GLF_FALSE(false, (gl_FragCoord.y < 0.0)) || (injectionSwitch.x > injectionSwitch.y))))), false || ((_GLF_FALSE(false, (_GLF_IDENTITY(injectionSwitch.x > injectionSwitch.y, _GLF_FALSE(false, (gl_FragCoord.y < 0.0)) || (injectionSwitch.x > injectionSwitch.y)))))))))))) {
                                    } else {
                                        int GLF_live7baseIndex = _GLF_FUZZED(50736);
                                        int GLF_live7data = _GLF_FUZZED(-66530);
                                        int GLF_live7looplimiter0 = 0;
                                        int GLF_live7treeIndex = _GLF_FUZZED(52914);
                                        {
                                            if (GLF_live7looplimiter0 >= 4) {
                                                ;
                                            }
                                            GLF_live7looplimiter0++;
                                            {
                                                vec4 _GLF_outVarBackup_GLF_color;
                                                {
                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                    _GLF_color = atanh(vec4(-226.854, 7112.9984, -806.649, -103.045));
                                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                    }
                                                }
                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                _GLF_color = vec4(-0.5, 2913.7382, 808.732, -2302.7954);
                                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                }
                                            }
                                            do {
                                                if (GLF_live7data <= GLF_live7tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live7baseIndex, 10)].data) {
                                                    if (GLF_live7tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live7baseIndex, 10)].leftIndex == -1) {
                                                        GLF_live7tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live7baseIndex, 10)].leftIndex = GLF_live7treeIndex;
                                                        if (_GLF_WRAPPED_IF_FALSE(false)) {
                                                            if (_GLF_DEAD(false)) {
                                                                float donor_replacementGLF_dead11result = _GLF_FUZZED(mod(-7337.9225, 26.16));
                                                                {
                                                                    donor_replacementGLF_dead11result += 0.4;
                                                                }
                                                            }
                                                        } else {
                                                            GLF_live7makeTreeNode(GLF_live7tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live7treeIndex, 10)], GLF_live7data);
                                                        }
                                                        {
                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                            _GLF_color = vec4(-17.49, -9526.4614, 434.729, 3.9);
                                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                            }
                                                        }
                                                        ;
                                                    } else {
                                                        GLF_live7baseIndex = GLF_live7tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live7baseIndex, 10)].leftIndex;
                                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                            ;
                                                            {
                                                                {
                                                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                                        int donor_replacementGLF_dead12i = _GLF_FUZZED(GLF_live7data);
                                                                        int donor_replacementGLF_dead12j = _GLF_FUZZED(sign(GLF_dead3N));
                                                                        {
                                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                            _GLF_color = vec4(-0.3, 2.6, 42.14, 46.08);
                                                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                            }
                                                                            if (_GLF_DEAD(_GLF_IDENTITY(false, !(!(false))))) {
                                                                                float donor_replacementGLF_dead17x = _GLF_FUZZED(reflect(-2339.5843, GLF_dead13one));
                                                                                float donor_replacementGLF_dead17y = _GLF_FUZZED(-7.2);
                                                                                {
                                                                                    donor_replacementGLF_dead17x = 1.0;
                                                                                    donor_replacementGLF_dead17y = 1.0;
                                                                                }
                                                                            }
                                                                        }
                                                                        mat4 donor_replacementGLF_dead12matrix_a = _GLF_FUZZED(mat4(mat3x4(7.6, 15.29, -7.1, -340.768, 5027.5552, -1.2, -4088.6711, 4.1, -6.6, 5.6, 0.4, 820.928)));
                                                                        vec4 donor_replacementGLF_dead12matrix_b = _GLF_FUZZED(mat2x4(-8970.4100, 7664.7207, -42.16, 4852.1039, 56.98, 38.03, -3.5, -180.621)[0]);
                                                                        {
                                                                            {
                                                                                vec4 _GLF_outVarBackup_GLF_color;
                                                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                                _GLF_color = vec4(-7.0, 0.2, -5941.2965, -9.4);
                                                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                                }
                                                                            }
                                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                            _GLF_color = smoothstep(mix(-4.2, 98.17, true), -9.4, _GLF_IDENTITY(vec4(-2.7, -368.023, 27.66, -345.346), (false ? _GLF_FUZZED(vec4(-8.1, -8562.5714, 0.8, 8828.4259)) : _GLF_IDENTITY(vec4(-2.7, -368.023, 27.66, -345.346), min(vec4(-2.7, -368.023, 27.66, -345.346), vec4(-2.7, -368.023, 27.66, -345.346))))));
                                                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                            }
                                                                        }
                                                                        {
                                                                            donor_replacementGLF_dead12matrix_b[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead12i, 4)] -= (donor_replacementGLF_dead12matrix_a[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead12i, 4)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead12j, 4)] * donor_replacementGLF_dead12matrix_b[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead12j, 4)]);
                                                                        }
                                                                    }
                                                                    ;
                                                                }
                                                            }
                                                        } else {
                                                        }
                                                        if (_GLF_DEAD(false)) {
                                                            float donor_replacementGLF_dead12alpha2 = _GLF_FUZZED(sqrt(reflect(1.3, -500.211)));
                                                            float donor_replacementGLF_dead12alpha3 = _GLF_FUZZED(8483.1419);
                                                            {
                                                                vec4 _GLF_outVarBackup_GLF_color;
                                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                _GLF_color = max(vec4(-344.003, 83.13, 6.7, 80.56), 9.6);
                                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                }
                                                            }
                                                            float donor_replacementGLF_dead12beta = _GLF_FUZZED(-68.39);
                                                            int donor_replacementGLF_dead12j = _GLF_FUZZED(GLF_live7data);
                                                            int donor_replacementGLF_dead12k = _GLF_FUZZED(GLF_live7treeIndex);
                                                            {
                                                                vec4 _GLF_outVarBackup_GLF_color;
                                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                _GLF_color = round(vec4(97.31, 5662.4591, 2.9, 36.57));
                                                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= sin(0.0))))) {
                                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                }
                                                            }
                                                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                                int donor_replacementGLF_dead18i = _GLF_FUZZED((~donor_replacementGLF_dead12j));
                                                                {
                                                                    {
                                                                        vec2 GLF_live20coord = _GLF_FUZZED((vec2(-6.2, -34.27) - vec2(3992.9728, -0.1)));
                                                                        if (GLF_live20coord.y < 0.6) {
                                                                            uvec2 GLF_live20icoord = uvec2(((GLF_live20coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                                                                            uint GLF_live20res1 = uint(((GLF_live20icoord.x * GLF_live20icoord.y) >> (GLF_live20icoord.x & 31u)) & 0xffffffffu);
                                                                            uint GLF_live20res2 = uint(((GLF_live20icoord.x * GLF_live20icoord.y) << (GLF_live20icoord.x & 31u)) & 0xffffffffu);
                                                                            {
                                                                                vec4 _GLF_outVarBackup_GLF_color;
                                                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                                _GLF_color = (true ? vec4(-7.5, 8.2, 2.0, -5.5) : asin(vec4(15.38, -35.39, -27.36, -914.724)));
                                                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                                }
                                                                            }
                                                                            float GLF_live20res = float(((GLF_live20res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_live20res1 & 1u) != 0u ? 1u : 0u));
                                                                            GLF_live20_GLF_color = vec4(GLF_live20res, GLF_live20res, GLF_live20res, 1.0);
                                                                        } else {
                                                                            ivec2 GLF_live20icoord = ivec2(((GLF_live20coord - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                                                                            int GLF_live20res3 = ((GLF_live20icoord.x >> 5) & 1) ^ ((GLF_live20icoord.y & 32) >> 5);
                                                                            int GLF_live20res2 = (GLF_live20icoord.y * GLF_live20icoord.y >> 10) & 1;
                                                                            int GLF_live20res1 = (GLF_live20icoord.x * GLF_live20icoord.y >> 9) & 1;
                                                                            GLF_live20_GLF_color = vec4(float(GLF_live20res1 ^ GLF_live20res2), float(GLF_live20res2 & GLF_live20res3), float(GLF_live20res1 | GLF_live20res3), 1.0);
                                                                        }
                                                                    }
                                                                    if (GLF_dead13_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead18i, 4)] >= 1.0) {
                                                                        GLF_dead13_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead18i, 4)] = GLF_dead13_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead18i, 4)] * GLF_dead13_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead18i, 4)];
                                                                    }
                                                                    {
                                                                        vec2 GLF_live18coord = _GLF_FUZZED((vec2(-3542.1876, -47.14) + 92.07));
                                                                        int GLF_live18i = _GLF_FUZZED(-34620);
                                                                        vec4 GLF_live18texel = _GLF_FUZZED(vec4(-6.5, 818.128, -43.29, 8.6));
                                                                        {
                                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                            _GLF_color = (fwidthCoarse(vec4(3.3, 10.94, 2.2, -2.6)) + vec4(633.896, 0.4, 90.09, 0.3));
                                                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                            }
                                                                        }
                                                                        {
                                                                            int GLF_live18looplimiter0 = 0;
                                                                            while (GLF_live18texel.x + GLF_live18texel.y + GLF_live18texel.z > 1.0 && GLF_live18i < 16) {
                                                                                if (GLF_live18looplimiter0 >= 3) {
                                                                                    break;
                                                                                }
                                                                                GLF_live18looplimiter0++;
                                                                                {
                                                                                    GLF_live18coord = GLF_live18texel.xz + GLF_live18texel.yy;
                                                                                    GLF_live18coord = floor(GLF_live18coord * 256.0) / 256.0;
                                                                                    GLF_live18texel = texture(GLF_live18tex, GLF_live18coord);
                                                                                    GLF_live18i++;
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                    donor_replacementGLF_dead18i++;
                                                                }
                                                                {
                                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                    _GLF_color = vec4(-85.63, -1088.2559, -7174.9166, -43.57);
                                                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                    }
                                                                }
                                                            }
                                                            mat4 donor_replacementGLF_dead12matrix_a = _GLF_FUZZED(mat4(333.401, 6497.3933, 355.534, -4.4, 177.741, 776.505, -5.8, 8.8, -8.8, 6.5, -0.6, -4.0, -33.57, -2669.9063, 6905.5004, 8.6));
                                                            {
                                                                vec2 GLF_live20coord = _GLF_FUZZED(vec2(8.3, -4.6));
                                                                {
                                                                    uvec2 GLF_live20icoord = uvec2(((GLF_live20coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                                                                    uint GLF_live20res1 = uint(((GLF_live20icoord.x * GLF_live20icoord.y) >> (GLF_live20icoord.x & 31u)) & 0xffffffffu);
                                                                    uint GLF_live20res2 = uint(((GLF_live20icoord.x * GLF_live20icoord.y) << (GLF_live20icoord.x & 31u)) & 0xffffffffu);
                                                                    float GLF_live20res = float(((GLF_live20res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_live20res1 & 1u) != 0u ? 1u : 0u));
                                                                    GLF_live20_GLF_color = vec4(GLF_live20res, GLF_live20res, GLF_live20res, 1.0);
                                                                }
                                                            }
                                                            vec4 donor_replacementGLF_dead12matrix_u = _GLF_FUZZED(_GLF_color);
                                                            {
                                                                for (int GLF_dead12a = GLF_dead12MATRIX_N - 1; GLF_dead12a >= donor_replacementGLF_dead12k; GLF_dead12a--) {
                                                                    donor_replacementGLF_dead12alpha3 += donor_replacementGLF_dead12matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12a, 4)] * donor_replacementGLF_dead12matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12a, 4)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead12j, 4)];
                                                                    {
                                                                        vec2 GLF_live18coord = _GLF_FUZZED(vec2(0.2, 705.115));
                                                                        {
                                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                            _GLF_color = vec4(133.355, 3.0, 253.463, -4886.0103);
                                                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)), false || (_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))))) {
                                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                            }
                                                                        }
                                                                        int GLF_live18i = _GLF_FUZZED(32717);
                                                                        vec4 GLF_live18texel = _GLF_FUZZED((vec2(1.4, 1.7) * mat4x2(-8.7, -931.550, -5.4, -8345.5424, 6.5, 19.39, -231.542, -60.91)));
                                                                        {
                                                                            int GLF_live18looplimiter0 = 0;
                                                                            while (GLF_live18texel.x + GLF_live18texel.y + GLF_live18texel.z > 1.0 && GLF_live18i < 16) {
                                                                                if (GLF_live18looplimiter0 >= 3) {
                                                                                    break;
                                                                                }
                                                                                GLF_live18looplimiter0++;
                                                                                {
                                                                                    {
                                                                                        vec4 _GLF_outVarBackup_GLF_color;
                                                                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                                        _GLF_color = vec4(-46.33, 8.7, -5.5, -647.765);
                                                                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                                        }
                                                                                    }
                                                                                    GLF_live18coord = GLF_live18texel.xz + GLF_live18texel.yy;
                                                                                    GLF_live18coord = floor(GLF_live18coord * 256.0) / 256.0;
                                                                                    GLF_live18texel = texture(GLF_live18tex, GLF_live18coord);
                                                                                    GLF_live18i++;
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                                donor_replacementGLF_dead12beta = donor_replacementGLF_dead12alpha2 * donor_replacementGLF_dead12alpha3;
                                                                for (int GLF_dead12a = GLF_dead12MATRIX_N - 1; GLF_dead12a >= donor_replacementGLF_dead12k; GLF_dead12a--) {
                                                                    donor_replacementGLF_dead12matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12a, 4)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead12j, 4)] = donor_replacementGLF_dead12matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead12a, 4)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead12j, 4)] - (donor_replacementGLF_dead12beta * donor_replacementGLF_dead12matrix_u[_GLF_MAKE_IN_BOUNDS_INT(_GLF_IDENTITY(GLF_dead12a, (GLF_dead12a) >> int(_GLF_ZERO(0.0, injectionSwitch.x))), 4)]);
                                                                }
                                                                _GLF_IDENTITY(donor_replacementGLF_dead12alpha3 = 0.0, (true ? (donor_replacementGLF_dead12alpha3 = 0.0) : _GLF_FUZZED(donor_replacementGLF_dead12alpha2)));
                                                                donor_replacementGLF_dead12beta = 0.0;
                                                            }
                                                        }
                                                    }
                                                } else {
                                                    if (GLF_live7tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live7baseIndex, 10)].rightIndex == -1) {
                                                        GLF_live7tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live7baseIndex, 10)].rightIndex = GLF_live7treeIndex;
                                                        GLF_live7makeTreeNode(GLF_live7tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live7treeIndex, 10)], GLF_live7data);
                                                        ;
                                                        {
                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                            _GLF_color = mod(vec4(-_GLF_IDENTITY(4.8, min(4.8, _GLF_IDENTITY(4.8, clamp(4.8, 4.8, 4.8)))), -703.711, 7.0, -3425.3955), tan(587.482));
                                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                            }
                                                        }
                                                    } else {
                                                        GLF_live7baseIndex = GLF_live7tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live7baseIndex, 10)].rightIndex;
                                                        ;
                                                    }
                                                }
                                            } while (_GLF_WRAPPED_LOOP(false));
                                        }
                                    }
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        _GLF_color = (_GLF_IDENTITY(vec4(51.12, -27.92, 24.46, 2187.1226) * (-1.1), (_GLF_IDENTITY(false ? _GLF_FUZZED(vec4(col, -58.40)) : (vec4(51.12, -27.92, 24.46, 2187.1226) * (-1.1)), _GLF_IDENTITY(mat4(1.0) * (false ? _GLF_FUZZED(vec4(col, -58.40)) : (vec4(51.12, -27.92, 24.46, 2187.1226) * (-1.1))), max(mat4(1.0) * (false ? _GLF_FUZZED(vec4(col, -58.40)) : (vec4(51.12, -27.92, 24.46, 2187.1226) * (-1.1))), mat4(1.0) * (_GLF_IDENTITY(false ? _GLF_FUZZED(vec4(col, -_GLF_IDENTITY(58.40, float(_GLF_IDENTITY(float(58.40), clamp(float(58.40), float(58.40), float(58.40))))))) : (vec4(51.12, -27.92, 24.46, 2187.1226) * (-1.1)), mix(vec4(_GLF_FUZZED(-764.488), (false ? _GLF_FUZZED(vec4(col, -_GLF_IDENTITY(58.40, float(_GLF_IDENTITY(float(58.40), clamp(float(58.40), float(58.40), float(58.40))))))) : (vec4(51.12, -27.92, 24.46, 2187.1226) * (-1.1)))[1], (false ? _GLF_FUZZED(vec4(col, -_GLF_IDENTITY(58.40, float(_GLF_IDENTITY(float(58.40), clamp(float(58.40), float(58.40), float(58.40))))))) : (vec4(51.12, -27.92, 24.46, 2187.1226) * (-1.1)))[2], _GLF_FUZZED((-380.784))), vec4((false ? _GLF_FUZZED(vec4(col, -_GLF_IDENTITY(58.40, float(_GLF_IDENTITY(float(58.40), clamp(float(58.40), float(58.40), float(58.40))))))) : (vec4(51.12, -27.92, 24.46, 2187.1226) * (-1.1)))[0], _GLF_FUZZED(68.51), _GLF_FUZZED(4.5), (false ? _GLF_FUZZED(vec4(col, -_GLF_IDENTITY(58.40, float(_GLF_IDENTITY(float(58.40), clamp(float(58.40), float(58.40), float(58.40))))))) : (vec4(51.12, -27.92, 24.46, 2187.1226) * (-1.1)))[3]), bvec4(true, false, _GLF_FALSE(false, (gl_FragCoord.y < 0.0)), _GLF_TRUE(true, (gl_FragCoord.y >= determinant(mat4(0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0))))))))))))));
                                        if (_GLF_DEAD(false)) {
                                            float donor_replacementGLF_dead11result = _GLF_FUZZED(7155.9984);
                                            {
                                                {
                                                    int GLF_live18looplimiter0 = 0;
                                                    if (GLF_live18looplimiter0 >= 3) {
                                                        ;
                                                    }
                                                }
                                                {
                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                    _GLF_color = vec4(710.103, 6.2, 4.2, 3.4);
                                                    {
                                                        vec4 _GLF_outVarBackup_GLF_color;
                                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                                        _GLF_color = vec4(483.512, 32.83, -8.3, 90.76);
                                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                        }
                                                    }
                                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                    }
                                                }
                                                donor_replacementGLF_dead11result += 100.0;
                                            }
                                        }
                                    } else {
                                    }
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                            }
                        } else {
                            {
                                {
                                    ;
                                }
                            }
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = vec4(-3.3, -25.99, 0.5, 9339.4887);
                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= _GLF_IDENTITY(0.0, _GLF_IDENTITY(max(0.0, 0.0), max(max(0.0, 0.0), max(0.0, 0.0)))))))) {
                                    {
                                        if (_GLF_DEAD(false)) {
                                            vec2 donor_replacementGLF_dead15pos = _GLF_FUZZED(vec2(81.43, -6.6));
                                            vec3 donor_replacementGLF_dead15setting = _GLF_FUZZED(vec3(-9.6, -78.37, -77.64));
                                            {
                                                ;
                                            }
                                        }
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        _GLF_color = vec4(-4.6, 13.81, 409.201, 9615.2235);
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                        {
                                            vec2 GLF_live20coord = _GLF_FUZZED((vec2(3.0, 8.4) - vec2(3.4, -3.7)));
                                            {
                                                ivec2 GLF_live20icoord = ivec2(((GLF_live20coord - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                                                int GLF_live20res3 = ((GLF_live20icoord.x >> 5) & 1) ^ ((GLF_live20icoord.y & 32) >> 5);
                                                int GLF_live20res2 = (GLF_live20icoord.y * GLF_live20icoord.y >> 10) & 1;
                                                int GLF_live20res1 = (GLF_live20icoord.x * GLF_live20icoord.y >> 9) & 1;
                                                GLF_live20_GLF_color = vec4(float(GLF_live20res1 ^ GLF_live20res2), float(GLF_live20res2 & GLF_live20res3), float(GLF_live20res1 | GLF_live20res3), 1.0);
                                            }
                                        }
                                        {
                                            vec4 _GLF_outVarBackup_GLF_color;
                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                            _GLF_color = vec4(-4.0, -5544.5328, -71.23, -742.533);
                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                            }
                                        }
                                    }
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                            if (int(gl_FragCoord.y) < 140) {
                                col = .5 + cos(c.y + vec3(resolution.x, A[_GLF_IDENTITY(39, clamp(39, 39, _GLF_IDENTITY(39, (39) | (39))))] / resolution.x + 50.0, 22.0));
                                if (_GLF_DEAD(false)) {
                                    vec4 donor_replacementGLF_dead16c = _GLF_FUZZED((col.xyzx * GLF_dead13one));
                                    {
                                        donor_replacementGLF_dead16c[_GLF_MAKE_IN_BOUNDS_INT(_injected_loop_counter, 4)] = donor_replacementGLF_dead16c[_GLF_MAKE_IN_BOUNDS_INT(_injected_loop_counter, 4)] * donor_replacementGLF_dead16c[_GLF_MAKE_IN_BOUNDS_INT(_injected_loop_counter, 4)];
                                    }
                                }
                            } else if (int(gl_FragCoord.y) < 160) {
                                col = .5 + cos(c.y + vec3(resolution.x, A[39] / resolution.x + 50.0, 22.0));
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = (vec4(-1.8, -6133.1702, -1.4, -2.0) - dFdyCoarse(6.0));
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                            } else if (int(gl_FragCoord.y) < 180) {
                                if (_GLF_DEAD(false)) {
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        _GLF_color = vec4(93.97, _GLF_IDENTITY(8.8, max(8.8, _GLF_IDENTITY(8.8, (8.8) + 0.0))), 2.3, 4.7);
                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                    }
                                    vec2 donor_replacementGLF_dead0grid = _GLF_FUZZED(uv);
                                    {
                                        int GLF_dead0count = int(GLF_dead0injectionSwitch.x);
                                        do {
                                            col -= GLF_dead0palette(vec3(float(GLF_dead0obj.numbers[4]) * 0.1), trunc(vec3(0.1)), vec3(float(GLF_dead0obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_dead0injectionSwitch.y), 10)]) * 0.1), vec3(GLF_dead0injectionSwitch.x, float(GLF_dead0obj.numbers[2]) * 0.1, float(GLF_dead0obj.numbers[8]) * 0.1));
                                            GLF_dead0count++;
                                        } while (GLF_dead0count != GLF_dead0obj.numbers[1]);
                                        donor_replacementGLF_dead0grid += vec2(GLF_dead0count + int(GLF_dead0injectionSwitch.y), GLF_dead0count + int(GLF_dead0injectionSwitch.x));
                                    }
                                }
                                col = .5 + cos(c.y + vec3(resolution.x, A[44] / resolution.x + 50.0, 22.0));
                            } else {
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_IDENTITY(_GLF_color, vec4(mat4(_GLF_color, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 1.0, sin(0.0), 0.0, 0.0, 1.0, length(vec2(0.0, 0.0)))));
                                    _GLF_color = vec4(764.132, -3.2, 7557.5742, 741.655);
                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(true, (_GLF_IDENTITY(true, !(!(true)))) || false))) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                        {
                                            ivec2 GLF_live21p = _GLF_FUZZED(ivec3(16443, -32274, -78787).rg);
                                            {
                                                GLF_live21p.y++;
                                            }
                                        }
                                    }
                                }
                                if (int(gl_FragCoord.y) < 200) {
                                    col = .5 + cos(c.y + vec3(resolution.x, A[49] / _GLF_IDENTITY(resolution, vec2(1.0, 1.0) * (resolution)).x + 50.0, 22.0));
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        _GLF_color = (ivec4(26753, -8222, 93206, 9512), vec4(22.12, 706.128, -95.52, -5198.2868));
                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                    }
                                } else {
                                    {
                                        int GLF_live8a = _GLF_FUZZED(36518);
                                        {
                                            vec4 _GLF_outVarBackup_GLF_color;
                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                            _GLF_color = vec4(133.000, 1853.3787, 49.24, -25.90);
                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                            }
                                        }
                                        int GLF_live8b = _GLF_FUZZED(_GLF_IDENTITY(-16010, (-16010) >> 0));
                                        {
                                            vec4 _GLF_outVarBackup_GLF_color;
                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                            {
                                                vec2 GLF_live20coord = _GLF_FUZZED(vec2(-5164.1037, -3.7));
                                                {
                                                    ivec2 GLF_live20icoord = ivec2(((GLF_live20coord - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                                                    int GLF_live20res3 = ((GLF_live20icoord.x >> 5) & 1) ^ ((GLF_live20icoord.y & 32) >> 5);
                                                    int GLF_live20res2 = (GLF_live20icoord.y * GLF_live20icoord.y >> 10) & 1;
                                                    int GLF_live20res1 = (GLF_live20icoord.x * GLF_live20icoord.y >> 9) & 1;
                                                    GLF_live20_GLF_color = vec4(float(GLF_live20res1 ^ GLF_live20res2), float(GLF_live20res2 & GLF_live20res3), float(GLF_live20res1 | GLF_live20res3), 1.0);
                                                }
                                            }
                                            _GLF_color = vec4(9396.7060, 493.760, -_GLF_IDENTITY(749.076, (_GLF_IDENTITY(749.076, min(749.076, 749.076))) * 1.0), 619.982);
                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= log(1.0))))) {
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                            }
                                        }
                                        int GLF_live8c = _GLF_FUZZED(int(38954u));
                                        vec2 GLF_live8uv = _GLF_FUZZED((-vec2(-657.552, -3637.3368)));
                                        {
                                            int GLF_live8looplimiter2 = 0;
                                            do {
                                                if (GLF_live8looplimiter2 >= 6) {
                                                    break;
                                                }
                                                GLF_live8looplimiter2++;
                                                {
                                                    GLF_live8uv.y -= _GLF_IDENTITY(step(GLF_live8injectionSwitch.y, GLF_live8uv.x), mix(float(_GLF_FUZZED(778.052)), float(_GLF_IDENTITY(step(GLF_live8injectionSwitch.y, GLF_live8uv.x), mix(float(step(GLF_live8injectionSwitch.y, GLF_live8uv.x)), float(_GLF_FUZZED(3674.9913)), bool(false)))), bool(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0))))) + float(_GLF_IDENTITY(GLF_live8a, (GLF_live8a) - 0)) + float(GLF_live8b);
                                                    GLF_live8uv.x += ldexp(GLF_live8injectionSwitch.y, isinf(GLF_live8uv.y + GLF_live8uv.x) ? findMSB(GLF_live8b) : _GLF_IDENTITY(findMSB(GLF_live8a), (findMSB(GLF_live8a)) * 1));
                                                    GLF_live8c--;
                                                }
                                            } while (GLF_live8c > int(GLF_live8injectionSwitch.x));
                                        }
                                        {
                                            vec2 GLF_live18coord = _GLF_FUZZED(vec3(1.1, 4.5, -8676.8395).bb);
                                            int GLF_live18i = _GLF_FUZZED((true ? (-67238) : 37431));
                                            int GLF_live18looplimiter0 = 0;
                                            vec4 GLF_live18texel = _GLF_FUZZED(vec4(6.3, -8560.6260, 9.3, -4.8));
                                            while (GLF_live18texel.x + GLF_live18texel.y + GLF_live18texel.z > 1.0 && GLF_live18i < 16) {
                                                if (GLF_live18looplimiter0 >= 3) {
                                                    break;
                                                }
                                                GLF_live18looplimiter0++;
                                                {
                                                    GLF_live18coord = GLF_live18texel.xz + GLF_live18texel.yy;
                                                    GLF_live18coord = floor(GLF_live18coord * 256.0) / 256.0;
                                                    GLF_live18texel = texture(GLF_live18tex, GLF_live18coord);
                                                    GLF_live18i++;
                                                }
                                            }
                                        }
                                    }
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        {
                                            vec4 _GLF_outVarBackup_GLF_color;
                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                            _GLF_color = vec4(4.9, -88.24, 2.5, 456.596);
                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                            }
                                        }
                                        _GLF_color = vec4(265.198, -86.83, 94.06, 165.940);
                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                    }
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        _GLF_color = vec4(smoothstep(217.189, 0.6, 1.0), -49.34, vec2(-8.0, -471.319));
                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(true, !(!(true))))) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                    }
                                    do {
                                        discard;
                                    } while (_GLF_WRAPPED_LOOP(false));
                                }
                            }
                        }
                    }
                }
            } while (_GLF_WRAPPED_LOOP(false));
            {
                vec3 GLF_live10color = _GLF_FUZZED(vec3(3.1, -824.387, 6920.4774));
                {
                    GLF_live10color.y += float(GLF_live10obj.numbers[2]);
                }
            }
            if (_GLF_DEAD(false)) {
                {
                    GLF_dead13_GLF_color = vec4(vec3(0.0), 1.0);
                }
            }
        }
    }
    {
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        _GLF_color = abs((vec4(-727.201, -5.2, -421.884, -6.5) * mat4(3.3, -5.0, 5.3, 66.88, -186.402, 9956.4169, -2.8, -19.52, 865.244, -6609.7352, -1.5, -4.5, -876.703, 752.694, 8.9, -323.723)));
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
    }
    _GLF_color = vec4(col, 1.0);
}
