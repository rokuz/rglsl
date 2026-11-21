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
int GLF_dead10MATRIX_N = 4;
vec4 GLF_dead9_GLF_color = _GLF_FUZZED(vec4(96.75));

layout(set = 0, binding = 1) uniform buf1 {
    vec2 GLF_dead9injectionSwitch;
};

float GLF_dead9compute_derivative_x(float GLF_dead9v) {
    return dFdx(GLF_dead9v) * GLF_dead9injectionSwitch.y;
}

float GLF_dead9compute_derivative_y(float GLF_dead9v) {
    return dFdy(GLF_dead9v) * GLF_dead9injectionSwitch.y;
}

float GLF_dead9compute_stripe(float GLF_dead9v) {
    return smoothstep(-.9, 1., (GLF_dead9v) / ((GLF_dead9injectionSwitch.y > GLF_dead9injectionSwitch.x) ? GLF_dead9compute_derivative_x(GLF_dead9v) : GLF_dead9compute_derivative_y(GLF_dead9v)));
}

vec4 GLF_dead3_GLF_color = _GLF_FUZZED(vec4(-53.16, -37.27, 2.8, -8680.2155));
int GLF_dead3map[16 * 16] = int[256](0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, _GLF_IDENTITY(0, (true ? 0 : _GLF_FUZZED(55914))), 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, _GLF_IDENTITY(0, (0) * 1), 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
const vec4 GLF_dead5pal[16] = vec4[16](vec4(0.0, 0.0, 0.0, 1.0), vec4(0.5, 0.0, 0.0, 1.0), vec4(0.0, 0.5, 0.0, 1.0), vec4(0.5, 0.5, 0.0, 1.0), vec4(0.0, _GLF_IDENTITY(0.0, min(_GLF_IDENTITY(0.0, max(0.0, 0.0)), 0.0)), 0.5, 1.0), vec4(_GLF_IDENTITY(0.5, max(0.5, 0.5)), 0.0, 0.5, 1.0), vec4(0.0, 0.5, 0.5, 1.0), vec4(0.5, 0.5, 0.5, 1.0), vec4(0.0, 0.0, 0.0, 1.0), vec4(1.0, 0.0, 0.0, 1.0), vec4(0.0, 1.0, 0.0, 1.0), vec4(1.0, 1.0, 0.0, 1.0), vec4(0.0, 0.0, 1.0, 1.0), vec4(1.0, 0.0, 1.0, 1.0), vec4(0.0, 1.0, 1.0, 1.0), vec4(1.0, 1.0, 1.0, 1.0));
const vec4 GLF_dead5picdata[8] = vec4[8](vec4(4, 4, 20, 4), vec4(4, 4, 4, 20), vec4(4, 20, 20, 4), vec4(20, 4, 4, 8), vec4(8, 6, 4, 2), vec4(2, 12, 2, 4), vec4(16, 2, 4, 4), _GLF_IDENTITY(vec4(12, 22, 4, 4), clamp(vec4(12, 22, 4, 4), vec4(12, 22, 4, 4), vec4(12, 22, 4, 4))));

bool GLF_dead5collision(vec2 GLF_dead5pos, vec4 GLF_dead5quad) {
    if (GLF_dead5pos.x < GLF_dead5quad.x) {
        if (_GLF_DEAD(false)) {
            int donor_replacementGLF_dead7i = _GLF_FUZZED(-36662);
            float donor_replacementGLF_dead7ref = _GLF_FUZZED(dFdy(-711.328));
            float donor_replacementGLF_dead7s = _GLF_FUZZED(ceil(687.248));
            if (mod(float(donor_replacementGLF_dead7i), donor_replacementGLF_dead7ref) <= 0.01) {
                donor_replacementGLF_dead7s += 0.2;
            }
        }
        return false;
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
        float donor_replacementGLF_dead8th = _GLF_FUZZED(-769.387);
        if (GLF_dead5pos.y < 0.0) {
            donor_replacementGLF_dead8th = -donor_replacementGLF_dead8th;
        }
    }
    if (_GLF_IDENTITY(GLF_dead5pos.y, min(GLF_dead5pos.y, GLF_dead5pos.y)) < GLF_dead5quad.y) {
        return false;
    }
    if (_GLF_IDENTITY(GLF_dead5pos.x, mix(float(_GLF_FUZZED(14.34)), float(GLF_dead5pos.x), bool(true))) > GLF_dead5quad.x + GLF_dead5quad.z) {
        return false;
    }
    if (GLF_dead5pos.y > GLF_dead5quad.y + GLF_dead5quad.w) {
        return false;
    }
    return true;
}

layout(set = 0, binding = 2) uniform sampler2D GLF_dead6tex;

struct GLF_dead0BST {
    int data;
    int leftIndex;
    int rightIndex;
};

GLF_dead0BST GLF_dead0tree[10] = GLF_dead0BST[10](GLF_dead0BST(0, 0, 0), GLF_dead0BST(0, 0, 0), GLF_dead0BST(0, 0, 0), GLF_dead0BST(_GLF_IDENTITY(0, (_GLF_IDENTITY(0, clamp(0, 0, 0))) | (_GLF_IDENTITY(0, (0) - 0))), 0, 0), GLF_dead0BST(0, 0, 0), GLF_dead0BST(_GLF_IDENTITY(0, (_GLF_IDENTITY(0, max(0, 0))) - _GLF_IDENTITY(0, (0) - 0)), 0, 0), GLF_dead0BST(0, 0, 0), GLF_dead0BST(0, 0, 0), GLF_dead0BST(0, 0, 0), GLF_dead0BST(0, 0, 0));

void GLF_dead0makeTreeNode(inout GLF_dead0BST GLF_dead0tree, int GLF_dead0data) {
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
        bool donor_replacementGLF_dead9c1 = _GLF_FUZZED(true);
        bool donor_replacementGLF_dead9c2 = _GLF_FUZZED((equal(acos(vec3(0.0, -6048.6845, -9263.7804)), vec3(7173.0239, -506.502, -810.503)) == isnan(vec3(7110.8601, -7.0, -665.387))));
        bool donor_replacementGLF_dead9c3 = _GLF_FUZZED(true);
        bool donor_replacementGLF_dead9c4 = _GLF_FUZZED((lessThan(ivec2(97494, -57632), ivec2(89761, -15481)) == greaterThanEqual(vec2(-2.3, -7364.9092), vec2(7.8, 0.2))));
        vec3 donor_replacementGLF_dead9col = _GLF_FUZZED(vec3(6.0, 6.7, 838.205));
        vec2 donor_replacementGLF_dead9uv = _GLF_FUZZED(vec2(-9.6, -9.0));
        if (!donor_replacementGLF_dead9c1 && !donor_replacementGLF_dead9c2 && !donor_replacementGLF_dead9c3 && donor_replacementGLF_dead9c4) {
            float GLF_dead9stripe = GLF_dead9compute_stripe(tan((donor_replacementGLF_dead9uv.x + donor_replacementGLF_dead9uv.y) * 20.0));
            donor_replacementGLF_dead9col = mix(vec3(donor_replacementGLF_dead9uv.x, .8, 0), vec3(1, donor_replacementGLF_dead9uv.y, 0), GLF_dead9stripe);
            GLF_dead9_GLF_color = vec4(donor_replacementGLF_dead9col, 1.0);
            return;
        }
    }
    GLF_dead0tree.data = GLF_dead0data;
    GLF_dead0tree.leftIndex = -1;
    GLF_dead0tree.rightIndex = -1;
}

int GLF_dead0search(int GLF_dead0target) {
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < _GLF_IDENTITY(0.0, _GLF_IDENTITY(float(mat2(_GLF_IDENTITY(0.0, (0.0) + 0.0), 0.0, 1.0, 0.0)), (float(mat2(_GLF_IDENTITY(0.0, (0.0) + 0.0), 0.0, 1.0, 0.0))) - 0.0)))))) {
        ivec2 donor_replacementGLF_dead3p = _GLF_FUZZED(ivec2(31960, 91760));
        if (donor_replacementGLF_dead3p.y < 14 && GLF_dead3map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead3p.x) + (_GLF_IDENTITY(donor_replacementGLF_dead3p.y + 2, ~(~(donor_replacementGLF_dead3p.y + 2)))) * 16, 256)] == 0) {
            GLF_dead0target += 1;
        }
    }
    GLF_dead0BST GLF_dead0currentNode = GLF_dead0BST(0, 0, 0);
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < abs(0.0))))) {
        float donor_replacementGLF_dead4s = _GLF_FUZZED(-1.2);
        {
            ;
        }
        if (_GLF_DEAD(false)) {
            mat4 donor_replacementGLF_dead10matrix_a = _GLF_FUZZED(mat4(-0.8, 68.19, -9400.4372, 7500.2884, 752.472, -3096.7730, -1.5, -71.89, -3.1, -5582.2276, -0.8, 315.447, -3.0, -196.384, -7.7, -8.5));
            for (int GLF_dead10a = GLF_dead10MATRIX_N - 1; GLF_dead10a >= GLF_dead0target; GLF_dead10a--) {
                donor_replacementGLF_dead10matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10a, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead0target, 4)] = donor_replacementGLF_dead10matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10a, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead0target, 4)] - (donor_replacementGLF_dead4s * GLF_dead3_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10a, 4)]);
            }
        }
    }
    int GLF_dead0index = 0;
    while (GLF_dead0index != -1) {
        GLF_dead0currentNode = GLF_dead0tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead0index, 10)];
        if (GLF_dead0currentNode.data == GLF_dead0target) {
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                float donor_replacementGLF_dead10magnitudeX = _GLF_FUZZED(-876.952);
                mat4 donor_replacementGLF_dead10matrix_a = _GLF_FUZZED((mat4(960.417, 60.28, -106.682, -3637.4386, -7027.8028, -746.489, 931.942, 689.053, 9978.7958, -1.5, -574.906, 0.9, 7209.4362, 7.6, -2353.3954, -2.3) * dFdxCoarse(4.3)));
                {
                    donor_replacementGLF_dead10magnitudeX += pow(donor_replacementGLF_dead10matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead0target, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead0index, 4)], 2.0);
                    GLF_dead3_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead0target, 4)] = donor_replacementGLF_dead10matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead0target, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead0index, 4)];
                }
            }
            return GLF_dead0target;
        }
        GLF_dead0index = GLF_dead0target > GLF_dead0currentNode.data ? _GLF_IDENTITY(GLF_dead0currentNode.rightIndex, min(_GLF_IDENTITY(GLF_dead0currentNode.rightIndex, clamp(GLF_dead0currentNode.rightIndex, GLF_dead0currentNode.rightIndex, _GLF_IDENTITY(GLF_dead0currentNode.rightIndex, (GLF_dead0currentNode.rightIndex) | (GLF_dead0currentNode.rightIndex)))), GLF_dead0currentNode.rightIndex)) : GLF_dead0currentNode.leftIndex;
    }
    return -1;
}

struct GLF_dead2QuicksortObject {
    int numbers[10];
};

GLF_dead2QuicksortObject GLF_dead2obj = GLF_dead2QuicksortObject(int[10](0, 0, 0, _GLF_IDENTITY(0, (0) << 0), 0, 0, 0, 0, 0, 0));
layout(location = 0) out vec4 _GLF_color;

layout(set = 0, binding = 0) uniform buf0 {
    vec2 injectionSwitch;
};

const int N = 10;
int data[10], temp[10];

void merge(int from, int mid, int to) {
    if (_GLF_DEAD(false)) {
        mat4 donor_replacementGLF_dead10matrix_a = _GLF_FUZZED(mat4(104.203, 221.909, -8711.7964, -892.048, 2.9, 146.298, -721.547, -1569.5257, -29.53, 7.3, -4.4, 5.7, 9.0, -4.6, -1112.7973, -1949.5276));
        {
            for (int GLF_dead10j = (GLF_dead10MATRIX_N - 1); GLF_dead10j >= (to + 1); GLF_dead10j--) {
                _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(to, 4)] -= (donor_replacementGLF_dead10matrix_a[_GLF_MAKE_IN_BOUNDS_INT(to, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10j, 4)] * _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10j, 4)]);
            }
            _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(to, 4)] /= donor_replacementGLF_dead10matrix_a[_GLF_MAKE_IN_BOUNDS_INT(to, 4)][_GLF_MAKE_IN_BOUNDS_INT(to, 4)];
        }
    }
    if (_GLF_DEAD(false)) {
        _GLF_color = asinh(vec4(1.0, 2.5, -565.377, 2.5));
    }
    int k = from, i = from, j = mid + 1;
    {
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        _GLF_color = floor(mat4(7.9, -1001.0806, -1.5, -8389.7221, 5663.1576, -30.22, -5076.5078, -2.5, -2.1, 85.32, 7606.3481, 1.0, 8.2, -71.14, -1246.8258, 2.0)[1]);
        if (_GLF_DEAD(false)) {
            float donor_replacementGLF_dead7limit = _GLF_FUZZED(trunc(1740.5622));
            float donor_replacementGLF_dead7s = _GLF_FUZZED(ceil(-625.267));
            if (float(from) >= donor_replacementGLF_dead7limit) {
                ;
                if (_GLF_DEAD(false)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
        }
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
    }
    while (i <= mid && j <= to) {
        if (data[i] < data[j]) {
            if (_GLF_DEAD(_GLF_FALSE(false, (_GLF_IDENTITY(injectionSwitch, vec2(injectionSwitch[0], _GLF_IDENTITY(injectionSwitch[1], 1.0 * (injectionSwitch[1])))).x > injectionSwitch.y)))) {
                for (int GLF_dead0i = 0; GLF_dead0i < 20; GLF_dead0i++) {
                    int GLF_dead0result = GLF_dead0search(GLF_dead0i);
                    switch (GLF_dead0i) {
                        case 9:
                        case 5:
                        case 12:
                        case 15:
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                {
                                    _GLF_color = GLF_dead5pal[_GLF_MAKE_IN_BOUNDS_INT((int(GLF_dead5picdata[_GLF_MAKE_IN_BOUNDS_INT(j, 8)].x) * int(GLF_dead5picdata[_GLF_MAKE_IN_BOUNDS_INT(j, 8)].y) + j * 9 + 11) % 16, 16)];
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                        _GLF_color = roundEven(GLF_dead9_GLF_color);
                                    }
                                }
                            }
                            if (_GLF_DEAD(false)) {
                                _GLF_color = vec4(2.0, -4480.5963, -84.06, -3510.4618);
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = GLF_dead9_GLF_color;
                                }
                            }
                        case 7:
                        case 8:
                        case 2:
                            if (_GLF_DEAD(_GLF_FALSE(false, _GLF_IDENTITY((gl_FragCoord.y < 0.0), ((gl_FragCoord.y < 0.0)) || _GLF_FALSE(false, (gl_FragCoord.x < log(1.0))))))) {
                                _GLF_color = mat4(-1.4, 2131.5357, 5933.6519, 27.61, -38.88, -1.5, 1509.4893, 4603.0516, 499.134, 53.56, 2919.2201, 6466.4201, 60.48, 4295.5098, -2.5, 23.48)[1];
                            }
                        case 6:
                        case 17:
                        case 13:
                            if (GLF_dead0result == GLF_dead0i) {
                                j++;
                            }
                            break;
                            if (_GLF_DEAD(false)) {
                                _GLF_color = vec4(2.3, GLF_dead9injectionSwitch, -19.98);
                            }
                        default:
                            if (GLF_dead0result == -1) {
                                j++;
                            }
                            break;
                    }
                }
            }
            temp[k++] = data[i++];
        } else {
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = unpackSnorm4x8(132204u);
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            temp[k++] = data[j++];
        }
    }
    while (i < N && i <= mid) {
        temp[k++] = data[i++];
        if (_GLF_DEAD(false)) {
            vec2 donor_replacementGLF_dead6coord = _GLF_FUZZED((vec2(2.2, -3685.2622) + min(vec2(-6482.3788, -1.0), 9417.4227)));
            if (donor_replacementGLF_dead6coord.y > 1.0)
                donor_replacementGLF_dead6coord.y -= 1.0;
        }
    }
    for (int i = from; i <= to; i++) {
        data[i] = temp[i];
    }
    {
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        _GLF_color = (mat3(-4124.6203, -6522.8989, -7.4, 0.5, -98.95, 5.1, 9.8, 4.4, 42.97), vec4(-7.7, -543.246, 7376.8513, 145.010));
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
    }
    {
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        _GLF_color = normalize(vec4(788.213, -84.85, 3540.1726, -9290.8577));
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
    }
}

void mergeSort() {
    int low = 0;
    int high = N - 1;
    if (_GLF_DEAD(false)) {
        _GLF_IDENTITY(_GLF_color = fract(_GLF_color), vec4(0.0, 0.0, 0.0, 0.0) + (_GLF_color = fract(_GLF_color)));
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = vec4(3.7);
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(4.3, -1098.2774, -7496.5420, -9495.4031);
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
    }
    for (int m = 1; m <= high; m = 2 * m) {
        for (int i = low; i < high; i += 2 * m) {
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                for (int GLF_dead2i = 0; GLF_dead2i < 10; GLF_dead2i++) {
                    GLF_dead2obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead2i, 10)] = (10 - GLF_dead2i);
                    if (_GLF_DEAD(false)) {
                        vec2 donor_replacementGLF_dead8a = _GLF_FUZZED(vec2(2859.8442, 4982.2630));
                        float donor_replacementGLF_dead8z = _GLF_FUZZED(sinh(tanh(5.9)));
                        {
                            donor_replacementGLF_dead8z = donor_replacementGLF_dead8a.y / donor_replacementGLF_dead8a.x;
                        }
                    }
                    GLF_dead2obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead2i, 10)] = GLF_dead2obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead2i, 10)] * GLF_dead2obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead2i, 10)];
                }
            }
            int from = i;
            int mid = i + m - 1;
            int to = min(i + 2 * m - 1, high);
            if (_GLF_DEAD(false)) {
                _GLF_color = GLF_dead9_GLF_color;
            }
            merge(from, mid, to);
        }
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            if (_GLF_DEAD(false)) {
                if (GLF_dead0tree[_GLF_MAKE_IN_BOUNDS_INT(m, 10)].leftIndex == -1) {
                    GLF_dead0tree[_GLF_MAKE_IN_BOUNDS_INT(m, 10)].leftIndex = m;
                    if (_GLF_DEAD(_GLF_IDENTITY(false, bool(bvec4(_GLF_IDENTITY(false, _GLF_IDENTITY(bool(bvec3(false, _GLF_TRUE(true, (gl_FragCoord.y >= 0.0)), true)), !(!(_GLF_IDENTITY(bool(bvec3(false, _GLF_TRUE(true, (gl_FragCoord.y >= 0.0)), true)), false || (bool(bvec3(false, _GLF_TRUE(true, (gl_FragCoord.y >= 0.0)), true)))))))), false, false, false))))) {
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            _GLF_color = (GLF_dead3_GLF_color - max(vec4(-3.2, -43.09, 1.7, 0.8), -4.5));
                        }
                        _GLF_color = cosh(pow(_GLF_color, _GLF_outVarBackup_GLF_color));
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            bool donor_replacementGLF_dead3canwalk = _GLF_FUZZED((_GLF_outVarBackup_GLF_color != vec4(6.8, 6079.5362, 59.18, 870.587)));
                            ivec2 donor_replacementGLF_dead3p = _GLF_FUZZED(bitfieldExtract(ivec2(-34569, -78095), high, 819));
                            for (low = 0; low < 8; low++) {
                                if (GLF_dead3map[_GLF_MAKE_IN_BOUNDS_INT(low * 2 + low * 2 * 16, 256)] == 0) {
                                    donor_replacementGLF_dead3p.x = low * 2;
                                    donor_replacementGLF_dead3p.y = low * 2;
                                    donor_replacementGLF_dead3canwalk = true;
                                }
                            }
                        }
                    }
                    GLF_dead0makeTreeNode(GLF_dead0tree[_GLF_MAKE_IN_BOUNDS_INT(m, 10)], low);
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        {
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                _GLF_color = _GLF_color;
                            }
                            m += 1;
                        }
                    }
                    return;
                } else {
                    m = GLF_dead0tree[_GLF_MAKE_IN_BOUNDS_INT(m, 10)].leftIndex;
                    if (_GLF_DEAD(false)) {
                        _GLF_color = asinh(_GLF_outVarBackup_GLF_color);
                    }
                    continue;
                }
            }
            _GLF_IDENTITY(_GLF_color = atan(reflect(vec4(96.16, 8.2, 2.3, -8691.8925), vec4(-8943.5233, 7405.2691, 3.2, -4.4)), vec4(-5496.1508, 1.3, 3.3, -962.527)), (_GLF_IDENTITY(_GLF_color = atan(reflect(vec4(96.16, 8.2, 2.3, -8691.8925), vec4(-8943.5233, 7405.2691, 3.2, -4.4)), vec4(-5496.1508, 1.3, 3.3, -962.527)), (_GLF_IDENTITY(_GLF_color = atan(reflect(vec4(96.16, 8.2, 2.3, -8691.8925), vec4(-8943.5233, 7405.2691, 3.2, -4.4)), vec4(-5496.1508, 1.3, 3.3, -962.527)), vec4(0.0, 0.0, 0.0, 0.0) + (_GLF_color = atan(reflect(vec4(96.16, 8.2, 2.3, -8691.8925), vec4(-8943.5233, 7405.2691, 3.2, -4.4)), vec4(-5496.1508, 1.3, 3.3, -962.527))))) * vec4(1.0, 1.0, 1.0, 1.0))) - vec4(0.0, 0.0, 0.0, 0.0));
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                if (_GLF_DEAD(false)) {
                    vec2 donor_replacementGLF_dead8a = _GLF_FUZZED(vec2(-126.365, 2851.0716));
                    {
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            _GLF_color = _GLF_color;
                        }
                        vec4 _GLF_outVarBackup_GLF_color;
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                            _GLF_color = intBitsToFloat(ivec4(-53356, -2968, -44361, 18065));
                        }
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(9.6, 5.8, -6.1, 329.882);
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                        if (_GLF_DEAD(false)) {
                            _GLF_color = GLF_dead9_GLF_color;
                        }
                    }
                    float donor_replacementGLF_dead8z = _GLF_FUZZED(-57.09);
                    {
                        donor_replacementGLF_dead8z = donor_replacementGLF_dead8a.y / donor_replacementGLF_dead8a.x;
                    }
                }
                if (_GLF_DEAD(false)) {
                    _GLF_color = trunc(_GLF_outVarBackup_GLF_color);
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    vec2 donor_replacementGLF_dead6coord = _GLF_FUZZED(vec2(-3.2, -6.7));
                    int donor_replacementGLF_dead6i = _GLF_FUZZED(ivec3(36369, 54612, 96694)[1]);
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = (vec4(145.801, 43.94, 3.3, 561.466) / (-7697.2457));
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            _GLF_color = GLF_dead3_GLF_color;
                        }
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    while (donor_replacementGLF_dead6i < 1 && donor_replacementGLF_dead6coord.x > 1.0 || donor_replacementGLF_dead6coord.y > 1.0) {
                        if (donor_replacementGLF_dead6coord.x > 1.0)
                            donor_replacementGLF_dead6coord.x -= 1.0;
                        if (donor_replacementGLF_dead6coord.y > 1.0)
                            donor_replacementGLF_dead6coord.y -= 1.0;
                        donor_replacementGLF_dead6coord *= 2.0;
                        donor_replacementGLF_dead6i++;
                    }
                }
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
            if (_GLF_DEAD(false)) {
                float donor_replacementGLF_dead7limit = _GLF_FUZZED(length(vec2(610.715, -6.7)));
                float donor_replacementGLF_dead7ref = _GLF_FUZZED(tan(-77.14));
                if (_GLF_DEAD(false)) {
                    _GLF_color = (GLF_dead3_GLF_color * mat4(724.446, 1.9, -5083.3532, 9.6, -628.821, 8.3, -3.1, -3.8, 62.88, 9.6, 8786.7665, 224.826, 0.3, 1.4, -5359.7170, -5.8));
                }
                float donor_replacementGLF_dead7s = _GLF_FUZZED(3350.5054);
                while (low < bitfieldInsert(800, low, 0, 0)) {
                    if (mod(float(low), donor_replacementGLF_dead7ref) <= 0.01) {
                        donor_replacementGLF_dead7s += 0.2;
                    }
                    if (float(low) >= donor_replacementGLF_dead7limit) {
                        ;
                    }
                    low++;
                }
            }
            if (_GLF_DEAD(false)) {
                _GLF_color = vec4(-27.15, 8.2, -22.89, 260.964);
            }
            if (_GLF_DEAD(false)) {
                float donor_replacementGLF_dead4s = _GLF_FUZZED(atanh(-688.631));
                {
                    ;
                }
            }
        }
    }
}

void main() {
    int i = int(injectionSwitch.x);
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
        bool donor_replacementGLF_dead9c1 = _GLF_FUZZED((vec3(ceil(vec2(87.71, -5.0)), -827.309) != vec3(342.540, -171.275, 539.873)));
        bool donor_replacementGLF_dead9c2 = _GLF_FUZZED((sign(findMSB(ivec4(-11913, -88221, -63355, -69822))) == ivec4(80729, 86154, -16028, 46720)));
        bool donor_replacementGLF_dead9c3 = _GLF_FUZZED((false ^^ false));
        vec3 donor_replacementGLF_dead9col = _GLF_FUZZED(vec3(392.493, 13.25, 7.7));
        vec2 donor_replacementGLF_dead9uv = _GLF_FUZZED((mat4x2(7.7, -7.5, 5270.9301, -6492.7961, 750.443, -8.6, -2.8, 8952.0586) * mat3x4(-1.3, -956.044, -9999.0154, -33.96, 5011.3986, 344.193, -706.779, -14.75, 9.4, -73.97, -2543.3530, -6.1))[0]);
        if (!donor_replacementGLF_dead9c1 && !donor_replacementGLF_dead9c2 && donor_replacementGLF_dead9c3) {
            float GLF_dead9stripe = GLF_dead9compute_stripe(cos((donor_replacementGLF_dead9uv.x + donor_replacementGLF_dead9uv.y) * 20.0));
            donor_replacementGLF_dead9col = mix(vec3(.7, sinh(donor_replacementGLF_dead9uv.x), donor_replacementGLF_dead9uv.x), vec3(.3, .5, donor_replacementGLF_dead9uv.x), GLF_dead9stripe);
            GLF_dead9_GLF_color = vec4(donor_replacementGLF_dead9col, 1.0);
            return;
        }
    }
    do {
        switch (i) {
            case 0:
                data[i] = 4;
                break;
                if (_GLF_DEAD(false)) {
                    _GLF_color = _GLF_color;
                }
                if (_GLF_DEAD(false)) {
                    if (_GLF_DEAD(false)) {
                        vec2 donor_replacementGLF_dead5pos = _GLF_FUZZED(injectionSwitch);
                        vec4 donor_replacementGLF_dead5quad = _GLF_FUZZED(step(vec4(-3201.3365, 1.5, 0.8, -84.13), ((-0.5) - _GLF_color)));
                        if (donor_replacementGLF_dead5pos.x > donor_replacementGLF_dead5quad.x + donor_replacementGLF_dead5quad.z) {
                            ;
                        }
                    }
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        if (_GLF_DEAD(false)) {
                            _GLF_color = dFdxFine(_GLF_outVarBackup_GLF_color);
                        }
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = log2(vec4(6218.1574, -7.1, 8279.9586, 5.2));
                        if (_GLF_DEAD(false)) {
                            {
                                if (_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(i, 4)] >= 1.0) {
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                    _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(i, 4)] = _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(i, 4)] * _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(i, 4)];
                                }
                                i++;
                            }
                        }
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            if (_GLF_DEAD(false)) {
                                bool donor_replacementGLF_dead9c1 = _GLF_FUZZED(false);
                                bool donor_replacementGLF_dead9c2 = _GLF_FUZZED((false != false));
                                bool donor_replacementGLF_dead9c3 = _GLF_FUZZED(true);
                                bool donor_replacementGLF_dead9c4 = _GLF_FUZZED(false);
                                vec3 donor_replacementGLF_dead9col = _GLF_FUZZED(vec3(-7.2, -5.3, 89.46));
                                vec2 donor_replacementGLF_dead9uv = _GLF_FUZZED(injectionSwitch);
                                if (!donor_replacementGLF_dead9c1 && !donor_replacementGLF_dead9c2 && !donor_replacementGLF_dead9c3 && donor_replacementGLF_dead9c4) {
                                    float GLF_dead9stripe = GLF_dead9compute_stripe(tan((donor_replacementGLF_dead9uv.x + donor_replacementGLF_dead9uv.y) * 20.0));
                                    donor_replacementGLF_dead9col = mix(vec3(donor_replacementGLF_dead9uv.x, .8, 0), vec3(1, donor_replacementGLF_dead9uv.y, 0), GLF_dead9stripe);
                                    GLF_dead9_GLF_color = vec4(donor_replacementGLF_dead9col, 1.0);
                                    return;
                                }
                            }
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    _GLF_color = mod(vec4(-353.869, 5031.8911, -497.370, -87.35), 4966.1735);
                }
            case 1:
                if (_GLF_DEAD(false)) {
                    if (_GLF_DEAD(false)) {
                        _GLF_color = GLF_dead3_GLF_color;
                    }
                    vec2 donor_replacementGLF_dead6coord = _GLF_FUZZED(injectionSwitch);
                    int donor_replacementGLF_dead6i = _GLF_FUZZED(i);
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(-230.954, -_GLF_IDENTITY(826.795, mix(float(_GLF_FUZZED((-0.4))), float(826.795), bool(true))), 55.96, 364.199);
                        if (_GLF_DEAD(false)) {
                            float donor_replacementGLF_dead8th = _GLF_FUZZED(4636.8317);
                            {
                                donor_replacementGLF_dead8th = -donor_replacementGLF_dead8th;
                            }
                        }
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(true, true && (true)))) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    while (donor_replacementGLF_dead6i < 1 && donor_replacementGLF_dead6coord.x > 1.0 || donor_replacementGLF_dead6coord.y > 1.0) {
                        if (donor_replacementGLF_dead6coord.x > 1.0)
                            donor_replacementGLF_dead6coord.x -= 1.0;
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            _GLF_color = GLF_dead9_GLF_color;
                        }
                        if (donor_replacementGLF_dead6coord.y > 1.0)
                            donor_replacementGLF_dead6coord.y -= 1.0;
                        donor_replacementGLF_dead6coord *= 2.0;
                        donor_replacementGLF_dead6i++;
                    }
                }
                if (_GLF_DEAD(false)) {
                    _GLF_color = (GLF_dead3_GLF_color + round(vec4(353.167, 3.2, 2.7, -75.65)));
                }
                if (_GLF_DEAD(false)) {
                    if (_GLF_DEAD(false)) {
                        _GLF_color = atan(vec4(-13.34, -177.854, -5028.7004, 5.0), _GLF_color);
                    }
                    {
                        discard;
                    }
                    if (_GLF_DEAD(false)) {
                        _GLF_color = vec4(-4525.8935, 4.9, -4628.3868, 5.5);
                    }
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < length(vec4(0.0, 0.0, 0.0, 0.0)))))) {
                    vec3 donor_replacementGLF_dead9col = _GLF_FUZZED(dFdxFine(vec3(39.40, -8625.8296, -6575.0157)));
                    vec2 donor_replacementGLF_dead9uv = _GLF_FUZZED(vec2(-2288.7776, 5.7));
                    {
                        float GLF_dead9stripe = GLF_dead9compute_stripe(cos((donor_replacementGLF_dead9uv.x + donor_replacementGLF_dead9uv.y) * 20.0));
                        donor_replacementGLF_dead9col = mix(vec3(donor_replacementGLF_dead9uv.x, 0, 0.75), vec3(.8, .7, donor_replacementGLF_dead9uv.x), GLF_dead9stripe);
                        GLF_dead9_GLF_color = vec4(donor_replacementGLF_dead9col, 1.0);
                        return;
                    }
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < _GLF_IDENTITY(dot(vec4(0.0, 1.0, 0.0, 0.0), vec4(1.0, 0.0, 1.0, 1.0)), _GLF_IDENTITY(dot(vec4(0.0, 1.0, 0.0, 0.0), vec4(1.0, 0.0, 1.0, 1.0)), clamp(dot(vec4(0.0, 1.0, 0.0, 0.0), vec4(1.0, 0.0, 1.0, 1.0)), dot(vec4(0.0, 1.0, 0.0, 0.0), vec4(1.0, 0.0, 1.0, 1.0)), dot(vec4(0.0, 1.0, 0.0, 0.0), vec4(1.0, 0.0, 1.0, 1.0))))))))) {
                    _GLF_color = step(516.667, _GLF_color);
                }
                data[i] = 3;
                break;
            case 2:
                data[i] = _GLF_IDENTITY(2, (true ? 2 : _GLF_FUZZED((N - i))));
                break;
            case 3:
                if (_GLF_DEAD(false)) {
                    _GLF_color = step(vec4(912.652, -114.210, 53.82, 588.730), vec4(49.48, -0.7, 5.9, -4.0));
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    vec2 donor_replacementGLF_dead6coord = _GLF_FUZZED((injectionSwitch * injectionSwitch));
                    if (donor_replacementGLF_dead6coord.x > 1.0)
                        donor_replacementGLF_dead6coord.x -= 1.0;
                }
                data[i] = 1;
                break;
                if (_GLF_DEAD(false)) {
                    float donor_replacementGLF_dead8th = _GLF_FUZZED(4.6);
                    {
                        donor_replacementGLF_dead8th = -donor_replacementGLF_dead8th;
                    }
                }
            case 4:
                data[i] = 0;
                break;
            case 5:
                if (_GLF_DEAD(false)) {
                    if (_GLF_DEAD(false)) {
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                            if (_GLF_DEAD(false)) {
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = vec4(96.37, 10.73, 385.314, -2882.2575);
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                                float donor_replacementGLF_dead8th = _GLF_FUZZED(49.68);
                                {
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                            _GLF_color = mix(_GLF_color, GLF_dead9_GLF_color, bvec4(false, true, true, true));
                                        }
                                        _GLF_color = mod(vec4(-2159.7517, -7.7, -12.71, -0.9), 7209.6430);
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                _GLF_color = acos((sign(vec4(-7212.6961, 2.0, 0.0, -9.9)) + donor_replacementGLF_dead8th));
                                            }
                                        }
                                    }
                                    donor_replacementGLF_dead8th = -donor_replacementGLF_dead8th;
                                }
                            }
                            vec2 donor_replacementGLF_dead6coord = _GLF_FUZZED(fwidth(vec2(622.524, 3.5)));
                            int donor_replacementGLF_dead6i = _GLF_FUZZED(((true ? i : 6125) / ivec4(18027, 49101, -18135, -62945))[3]);
                            if (_GLF_DEAD(false)) {
                                float donor_replacementGLF_dead10alpha1 = _GLF_FUZZED(dFdxFine(-1.6));
                                {
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                        _GLF_color = mod(max(GLF_dead9_GLF_color, GLF_dead3_GLF_color), _GLF_color);
                                    }
                                    donor_replacementGLF_dead10alpha1 += pow(_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead6i, 4)], 2.0);
                                }
                            }
                            while (donor_replacementGLF_dead6i < 1 && donor_replacementGLF_dead6coord.x > 1.0 || donor_replacementGLF_dead6coord.y > 1.0) {
                                if (donor_replacementGLF_dead6coord.x > 1.0)
                                    donor_replacementGLF_dead6coord.x -= 1.0;
                                if (donor_replacementGLF_dead6coord.y > 1.0)
                                    donor_replacementGLF_dead6coord.y -= 1.0;
                                donor_replacementGLF_dead6coord *= 2.0;
                                donor_replacementGLF_dead6i++;
                            }
                        }
                        _GLF_color = _GLF_color;
                        if (_GLF_DEAD(_GLF_IDENTITY(false, false || (_GLF_IDENTITY(false, (false) && true))))) {
                            _GLF_color = pow(vec4(-56.01, 5.4, -1.5, 28.44), asinh(vec4(5568.0767, 9.2, 685.762, 3902.9687)));
                        }
                        if (_GLF_DEAD(false)) {
                            vec3 donor_replacementGLF_dead9col = _GLF_FUZZED(vec3(-573.449, -8402.2431, -750.426));
                            vec2 donor_replacementGLF_dead9uv = _GLF_FUZZED(sqrt(dFdy(injectionSwitch)));
                            {
                                float GLF_dead9stripe = GLF_dead9compute_stripe(cos((donor_replacementGLF_dead9uv.x + donor_replacementGLF_dead9uv.y) * 20.0));
                                donor_replacementGLF_dead9col = mix(vec3(donor_replacementGLF_dead9uv.x, 0, 0.75), vec3(.8, .7, donor_replacementGLF_dead9uv.x), GLF_dead9stripe);
                                GLF_dead9_GLF_color = vec4(donor_replacementGLF_dead9col, 1.0);
                                return;
                            }
                        }
                    }
                    vec3 donor_replacementGLF_dead2color = _GLF_FUZZED(vec3(3.9, 3.6, mix(-2790.5561, max(6.3, -_GLF_IDENTITY(996.399, (_GLF_IDENTITY(996.399, (true ? 996.399 : _GLF_FUZZED(-0.7)))) / 1.0)), true)));
                    vec2 donor_replacementGLF_dead2uv = _GLF_FUZZED((((-3.5) * mat4x3(_GLF_IDENTITY(4.7, min(_GLF_IDENTITY(4.7, 0.0 + (4.7)), 4.7)), 4.9, 455.881, -8628.0690, -630.908, 1015.9226, -90.91, 5.4, -943.952, 322.009, _GLF_IDENTITY(-291.990, max(-291.990, _GLF_IDENTITY(-291.990, (-291.990) * 1.0))), 6.6))[3] * mat2x3(9.2, 5.2, -8896.6698, -377.364, -0.7, 61.05)));
                    if (donor_replacementGLF_dead2uv.x > (2.0 / 4.0)) {
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                            {
                                if (GLF_dead5collision(donor_replacementGLF_dead2uv, GLF_dead5picdata[_GLF_MAKE_IN_BOUNDS_INT(i, 8)])) {
                                    _GLF_color = GLF_dead5pal[_GLF_MAKE_IN_BOUNDS_INT((int(GLF_dead5picdata[_GLF_MAKE_IN_BOUNDS_INT(i, 8)].x) * int(_GLF_IDENTITY(GLF_dead5picdata[_GLF_MAKE_IN_BOUNDS_INT(i, 8)].y, min(GLF_dead5picdata[_GLF_MAKE_IN_BOUNDS_INT(i, 8)].y, GLF_dead5picdata[_GLF_MAKE_IN_BOUNDS_INT(i, 8)].y))) + i * 9 + 11) % 16, 16)];
                                }
                            }
                        }
                        donor_replacementGLF_dead2color.y += float(GLF_dead2obj.numbers[2]);
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                _GLF_color = (dFdxFine(_GLF_color) / vec4(25.87, -554.945, 61.47, 4.6));
                            }
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = vec4(-351.613, 692.756, -6.1, -9228.2300);
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                            _GLF_color = (mat3x4(mat4x2(-48.27, -8.9, 8.4, -54.35, -6.7, -32.49, 60.45, 8046.7857)) * vec3(-1.5, -83.10, 5.4));
                        }
                    }
                }
                if (_GLF_DEAD(false)) {
                    _GLF_color = clamp(_GLF_IDENTITY(vec4(-44.97, 13.07, 44.24, -86.19), min(vec4(-44.97, 13.07, 44.24, -86.19), vec4(-44.97, 13.07, 44.24, -86.19))), roundEven(vec4(882.676, -5.5, 7.5, 0.3)), _GLF_color);
                }
                if (_GLF_DEAD(false)) {
                    {
                        ;
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < log(1.0))))) {
                        _GLF_color = vec4(injectionSwitch, mod(vec2(9830.8149, -9.5), -353.137));
                    }
                    {
                        if (_GLF_DEAD(false)) {
                            _GLF_color = tan(_GLF_color);
                        }
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(56.26, 27.73, 344.081, 785.873);
                        if (_GLF_DEAD(false)) {
                            _GLF_color = fract(GLF_dead9_GLF_color);
                        }
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            if (_GLF_DEAD(false)) {
                                _GLF_color = dFdyCoarse(GLF_dead3_GLF_color);
                            }
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                        if (_GLF_DEAD(false)) {
                            _GLF_color = _GLF_color;
                        }
                        if (_GLF_DEAD(false)) {
                            vec2 donor_replacementGLF_dead8a = _GLF_FUZZED(injectionSwitch);
                            float donor_replacementGLF_dead8th = _GLF_FUZZED(-9.4);
                            if (donor_replacementGLF_dead8a.y < donor_replacementGLF_dead8a.x) {
                                donor_replacementGLF_dead8th = 0.5 - donor_replacementGLF_dead8th;
                            }
                        }
                    }
                }
                {
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(-455.119, -115.545, -316.107, -16.31);
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < log(1.0))))) {
                            _GLF_color = degrees(_GLF_outVarBackup_GLF_color);
                        }
                    }
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = uintBitsToFloat(uvec4(138328u, 113229u, 12812u, 160672u));
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                if (_GLF_DEAD(false)) {
                    vec3 donor_replacementGLF_dead9col = _GLF_FUZZED(vec3(injectionSwitch, dFdyFine(101.694)));
                    vec2 donor_replacementGLF_dead9uv = _GLF_FUZZED(vec2(-5.9, -938.903));
                    {
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            _GLF_color = GLF_dead9_GLF_color;
                        }
                        float GLF_dead9stripe = GLF_dead9compute_stripe(cos((donor_replacementGLF_dead9uv.x + donor_replacementGLF_dead9uv.y) * 20.0));
                        donor_replacementGLF_dead9col = mix(vec3(donor_replacementGLF_dead9uv.x, 0, 0.75), vec3(.8, .7, donor_replacementGLF_dead9uv.x), GLF_dead9stripe);
                        GLF_dead9_GLF_color = vec4(donor_replacementGLF_dead9col, 1.0);
                        return;
                    }
                }
                if (_GLF_DEAD(false)) {
                    vec2 donor_replacementGLF_dead6coord = _GLF_FUZZED(unpackSnorm2x16(mix(158230u, 164891u, false)));
                    if (donor_replacementGLF_dead6coord.y > _GLF_IDENTITY(1.0, min(_GLF_IDENTITY(1.0, max(1.0, 1.0)), 1.0)))
                        donor_replacementGLF_dead6coord.y -= 1.0;
                }
                data[i] = -1;
                break;
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    vec3 donor_replacementGLF_dead9col = _GLF_FUZZED(round(vec3(-345.459, 2.0, 4283.9063)));
                    vec2 donor_replacementGLF_dead9uv = _GLF_FUZZED(sqrt((vec2(942.408, 5.2))));
                    {
                        float GLF_dead9stripe = GLF_dead9compute_stripe(tan((donor_replacementGLF_dead9uv.x + donor_replacementGLF_dead9uv.y) * 20.0));
                        donor_replacementGLF_dead9col = mix(vec3(0.5, donor_replacementGLF_dead9uv.x, 0.1), vec3(.4, 0, .5), GLF_dead9stripe);
                        GLF_dead9_GLF_color = vec4(donor_replacementGLF_dead9col, 1.0);
                        return;
                    }
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < _GLF_IDENTITY(dot(vec4(1.0, 1.0, 1.0, 1.0), vec4(0.0, 0.0, 0.0, 0.0)), dot(vec4(1.0, 1.0, 1.0, 1.0), vec4(0.0, 0.0, 0.0, 0.0))))))) {
                    _GLF_color = vec4(-8.6, 80.46, -7099.3657, 24.62);
                }
            case 6:
                data[i] = -2;
                break;
            case 7:
                data[i] = -3;
                break;
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    if (_GLF_DEAD(false)) {
                        int donor_replacementGLF_dead0data = _GLF_FUZZED((~i));
                        while (i <= i) {
                            if (donor_replacementGLF_dead0data <= GLF_dead0tree[_GLF_MAKE_IN_BOUNDS_INT(i, 10)].data) {
                                if (GLF_dead0tree[_GLF_MAKE_IN_BOUNDS_INT(i, 10)].leftIndex == -1) {
                                    GLF_dead0tree[_GLF_MAKE_IN_BOUNDS_INT(i, 10)].leftIndex = i;
                                    GLF_dead0makeTreeNode(GLF_dead0tree[_GLF_MAKE_IN_BOUNDS_INT(i, 10)], donor_replacementGLF_dead0data);
                                    return;
                                } else {
                                    i = GLF_dead0tree[_GLF_MAKE_IN_BOUNDS_INT(i, 10)].leftIndex;
                                    continue;
                                }
                            } else {
                                if (GLF_dead0tree[_GLF_MAKE_IN_BOUNDS_INT(i, 10)].rightIndex == -1) {
                                    GLF_dead0tree[_GLF_MAKE_IN_BOUNDS_INT(i, 10)].rightIndex = i;
                                    GLF_dead0makeTreeNode(GLF_dead0tree[_GLF_MAKE_IN_BOUNDS_INT(i, 10)], donor_replacementGLF_dead0data);
                                    return;
                                    if (_GLF_DEAD(false)) {
                                        if (_GLF_DEAD(false)) {
                                            float donor_replacementGLF_dead7limit = _GLF_FUZZED(asin(GLF_dead3_GLF_color[0]));
                                            float donor_replacementGLF_dead7ref = _GLF_FUZZED(94.97);
                                            float donor_replacementGLF_dead7s = _GLF_FUZZED(-84.53);
                                            while (i < bitfieldInsert(800, i, 0, 0)) {
                                                if (mod(float(i), donor_replacementGLF_dead7ref) <= 0.01) {
                                                    donor_replacementGLF_dead7s += 0.2;
                                                }
                                                if (float(i) >= donor_replacementGLF_dead7limit) {
                                                    ;
                                                }
                                                i++;
                                            }
                                        }
                                        if (_GLF_DEAD(false)) {
                                            _GLF_color = vec4(345.238, 838.878, -5.5, -119.498);
                                        }
                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                            {
                                                i += 1;
                                                if (_GLF_DEAD(false)) {
                                                    _GLF_color = clamp(GLF_dead9_GLF_color, 3848.8471, (false ? step(-85.01, 678.616) : 3.6));
                                                }
                                            }
                                            if (_GLF_DEAD(false)) {
                                                float donor_replacementGLF_dead8th = _GLF_FUZZED(22.66);
                                                vec2 donor_replacementGLF_dead8v = _GLF_FUZZED(trunc(injectionSwitch));
                                                if (donor_replacementGLF_dead8v.y < 0.0) {
                                                    donor_replacementGLF_dead8th = -donor_replacementGLF_dead8th;
                                                }
                                            }
                                        }
                                        if (_GLF_DEAD(false)) {
                                            _GLF_color = (mat3x4(1.5, 7.2, 5.4, 816.047, 766.003, -14.64, 4297.8250, 56.10, -55.69, 314.774, -5.9, 5721.5033) * vec3(-1.8, -2.7, 9.2));
                                        }
                                        _GLF_color = uintBitsToFloat((_GLF_IDENTITY(189288u, max(189288u, 189288u)) ^ uvec4(101147u, 51005u, 82626u, 37679u)));
                                        if (_GLF_DEAD(false)) {
                                            _GLF_color = (_GLF_outVarBackup_GLF_color * GLF_dead9_GLF_color);
                                        }
                                    }
                                } else {
                                    i = GLF_dead0tree[_GLF_MAKE_IN_BOUNDS_INT(i, 10)].rightIndex;
                                    if (_GLF_DEAD(false)) {
                                        vec2 donor_replacementGLF_dead6coord = _GLF_FUZZED((40.29 * vec2(715.991, 9.2)));
                                        if (donor_replacementGLF_dead6coord.x < 1.0 && donor_replacementGLF_dead6coord.y < 1.0) {
                                            _GLF_outVarBackup_GLF_color = texture(GLF_dead6tex, donor_replacementGLF_dead6coord);
                                            if (_GLF_DEAD(false)) {
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                    _GLF_color = vec4(acosh(vec2(-627.929, 47.62)), vec2(50.34, 6335.6495));
                                                }
                                                float donor_replacementGLF_dead8th = _GLF_FUZZED(-5.0);
                                                {
                                                    donor_replacementGLF_dead8th = 1.0 - donor_replacementGLF_dead8th;
                                                }
                                            }
                                        }
                                    }
                                    continue;
                                }
                            }
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        if (_GLF_DEAD(false)) {
                            float donor_replacementGLF_dead10alpha3 = _GLF_FUZZED(step(atanh(-9691.3565), 5.2));
                            mat4 donor_replacementGLF_dead10matrix_a = _GLF_FUZZED(mat4((mat3x4(-942.004, 884.579, -4999.1643, 5696.7503, -5981.2579, 26.06, -6829.4166, -359.553, -15.02, -3.7, -9.9, 2.4) * mat2x3(82.23, 75.80, 791.210, -4571.3057, -37.01, -4.6))));
                            {
                                donor_replacementGLF_dead10alpha3 += GLF_dead3_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(i, 4)] * donor_replacementGLF_dead10matrix_a[_GLF_MAKE_IN_BOUNDS_INT(i, 4)][_GLF_MAKE_IN_BOUNDS_INT(i, 4)];
                            }
                        }
                        {
                            i += 1;
                        }
                    }
                    _GLF_color = (mat2x4(_GLF_IDENTITY(3.6, (_GLF_IDENTITY(3.6, min(3.6, 3.6))) / 1.0), -492.251, -0.5, -35.26, -46.27, -3.3, 73.86, 119.278) * vec2(6.1, 8.5));
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (_GLF_IDENTITY(gl_FragCoord.y, float(mat2x3(_GLF_IDENTITY(gl_FragCoord.y, clamp(gl_FragCoord.y, _GLF_IDENTITY(gl_FragCoord.y, mix(float(gl_FragCoord.y), float(_GLF_FUZZED(-9.7)), bool(false))), gl_FragCoord.y)), 1.0, 1.0, 1.0, 1.0, 1.0))) >= 0.0)))) {
                        if (_GLF_DEAD(false)) {
                            _GLF_color = step(max(-857.282, -6.6), _GLF_color);
                            if (_GLF_DEAD(_GLF_IDENTITY(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)), !(!(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))))))) {
                                float donor_replacementGLF_dead10beta = _GLF_FUZZED((injectionSwitch * mat4x2(-7028.8855, -9416.6461, -8976.0028, 55.10, -704.911, 5.0, 2.9, 3.8)).r);
                                vec4 donor_replacementGLF_dead10matrix_b = _GLF_FUZZED(exp(_GLF_outVarBackup_GLF_color));
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = atan(donor_replacementGLF_dead10matrix_b);
                                }
                                for (int GLF_dead10b = GLF_dead10MATRIX_N - 1; GLF_dead10b >= i; GLF_dead10b--) {
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = _GLF_color;
                                    }
                                    donor_replacementGLF_dead10matrix_b[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10b, 4)] = donor_replacementGLF_dead10matrix_b[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10b, 4)] - (donor_replacementGLF_dead10beta * GLF_dead3_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10b, 4)]);
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = pow((uvec2(83678u, 43990u), (6.8 + _GLF_color)), GLF_dead3_GLF_color);
                                    }
                                }
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                    _GLF_color = vec4(-513.614, -9.1, -27.99, -5150.6160);
                                }
                            }
                        }
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                        if (_GLF_DEAD(_GLF_FALSE(false, (_GLF_IDENTITY(gl_FragCoord, (gl_FragCoord) / vec4(1.0, 1.0, 1.0, 1.0)).y < 0.0)))) {
                            vec4 donor_replacementGLF_dead4c = _GLF_FUZZED(_GLF_color);
                            {
                                donor_replacementGLF_dead4c[_GLF_MAKE_IN_BOUNDS_INT(i, 4)] = donor_replacementGLF_dead4c[_GLF_MAKE_IN_BOUNDS_INT(i, 4)] * donor_replacementGLF_dead4c[_GLF_MAKE_IN_BOUNDS_INT(i, 4)];
                            }
                            if (_GLF_DEAD(false)) {
                                _GLF_color = sqrt(GLF_dead9_GLF_color);
                            }
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        if (_GLF_DEAD(false)) {
                            _GLF_color = vec4(-6435.3596, 1.1, -9543.8780, -0.6);
                        }
                        float donor_replacementGLF_dead10alpha2 = _GLF_FUZZED(length(injectionSwitch));
                        float donor_replacementGLF_dead10alpha3 = _GLF_FUZZED(-9228.2895);
                        float donor_replacementGLF_dead10beta = _GLF_FUZZED(610.421);
                        mat4 donor_replacementGLF_dead10matrix_a = _GLF_FUZZED(mat4(7.7, 687.285, 16.69, 4.1, -6.3, -0.2, -6733.9340, 219.974, -3.7, 9832.8727, -63.23, -385.233, -8.2, -40.24, -1.8, -934.783));
                        for (int GLF_dead10j = i; GLF_dead10j < GLF_dead10MATRIX_N; GLF_dead10j++) {
                            for (int GLF_dead10a = GLF_dead10MATRIX_N - 1; GLF_dead10a >= i; GLF_dead10a--) {
                                donor_replacementGLF_dead10alpha3 += GLF_dead3_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10a, 4)] * donor_replacementGLF_dead10matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10a, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10j, 4)];
                            }
                            donor_replacementGLF_dead10beta = donor_replacementGLF_dead10alpha2 * donor_replacementGLF_dead10alpha3;
                            for (int GLF_dead10a = GLF_dead10MATRIX_N - 1; GLF_dead10a >= i; GLF_dead10a--) {
                                donor_replacementGLF_dead10matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10a, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10j, 4)] = donor_replacementGLF_dead10matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10a, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10j, 4)] - (donor_replacementGLF_dead10beta * GLF_dead3_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10a, 4)]);
                            }
                            donor_replacementGLF_dead10alpha3 = 0.0;
                            if (_GLF_DEAD(false)) {
                                _GLF_color = log2(GLF_dead9_GLF_color);
                            }
                            donor_replacementGLF_dead10beta = 0.0;
                        }
                    }
                }
                if (_GLF_DEAD(false)) {
                    _GLF_color = _GLF_color;
                    if (_GLF_DEAD(false)) {
                        _GLF_color = (_GLF_color - round(_GLF_color));
                    }
                    {
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            _GLF_color = round(_GLF_color);
                        }
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_IDENTITY(_GLF_outVarBackup_GLF_color = _GLF_color, (true ? (_GLF_outVarBackup_GLF_color = _GLF_color) : _GLF_FUZZED((+GLF_dead3_GLF_color))));
                        _GLF_color = vec4(-2.8, 676.738, 4020.5946, -7.7);
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < length(vec2(0.0, 0.0)))))) {
                            _GLF_color = vec4(4.8, -4402.1321, -14.72, 2.3);
                        }
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        _GLF_color = _GLF_color;
                    }
                    if (_GLF_DEAD(false)) {
                        float donor_replacementGLF_dead7ref = _GLF_FUZZED(2.0);
                        float donor_replacementGLF_dead7s = _GLF_FUZZED(4443.7973);
                        if (mod(float(i), donor_replacementGLF_dead7ref) <= 0.01) {
                            donor_replacementGLF_dead7s += 0.2;
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = max(dFdxFine(vec4(21.88, 6.8, -9.6, -767.740)), -8283.7380);
                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                        }
                    }
                }
                if (_GLF_DEAD(false)) {
                    vec3 donor_replacementGLF_dead2color = _GLF_FUZZED(vec3(-623.858, -4361.1127, 8.6));
                    vec2 donor_replacementGLF_dead2uv = _GLF_FUZZED(vec2(-2430.1600, -7404.5454));
                    if (donor_replacementGLF_dead2uv.y > (1.0 / 4.0)) {
                        if (_GLF_DEAD(false)) {
                            _GLF_color = asin(GLF_dead9_GLF_color);
                        }
                        donor_replacementGLF_dead2color.x += float(GLF_dead2obj.numbers[5]);
                    }
                }
            case 8:
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    _GLF_color = _GLF_color;
                }
                data[i] = -4;
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(-41.76, -2614.8998, -3483.3706, 2563.0628);
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            _GLF_color = (true ? GLF_dead3_GLF_color : _GLF_color);
                        }
                    }
                }
                if (_GLF_DEAD(false)) {
                    _GLF_color = _GLF_IDENTITY(vec4(-289.230, -219.624, 150.311, 363.996), abs(vec4(_GLF_ZERO(0.0, injectionSwitch.x), _GLF_ZERO(0.0, injectionSwitch.x), _GLF_ZERO(0.0, injectionSwitch.x), _GLF_ZERO(0.0, injectionSwitch.x))) + (_GLF_IDENTITY(vec4(-289.230, -219.624, 150.311, 363.996), mat4(1.0) * (vec4(-289.230, -219.624, 150.311, 363.996)))));
                    if (_GLF_DEAD(false)) {
                        _GLF_color = max(_GLF_color, GLF_dead3_GLF_color);
                    }
                }
                break;
                if (_GLF_IDENTITY(_GLF_DEAD(false), !(_GLF_IDENTITY(!(_GLF_IDENTITY(_GLF_DEAD(false), true && (_GLF_DEAD(false)))), !(!(!(_GLF_IDENTITY(_GLF_DEAD(false), true && (_GLF_DEAD(false)))))))))) {
                    vec2 donor_replacementGLF_dead6coord = _GLF_FUZZED(((-7952.6620) * mat2(_GLF_IDENTITY(4.2, max(4.2, _GLF_IDENTITY(4.2, min(4.2, _GLF_IDENTITY(4.2, (false ? _GLF_FUZZED(-351.777) : 4.2)))))), 22.82, 8845.4213, 139.877)[0]));
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = (7159.2796 - vec4(-3537.5888, 1.8, 123.223, 442.961));
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    if (donor_replacementGLF_dead6coord.x > 1.0)
                        donor_replacementGLF_dead6coord.x -= 1.0;
                }
                if (_GLF_IDENTITY(_GLF_DEAD(_GLF_IDENTITY(false, !(_GLF_IDENTITY(!(false), (!(false)) || false)))), _GLF_IDENTITY(bool(bvec3(_GLF_DEAD(_GLF_IDENTITY(false, !(_GLF_IDENTITY(!(false), (!(false)) || false)))), true, _GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))), !(!(bool(bvec3(_GLF_DEAD(_GLF_IDENTITY(false, !(_GLF_IDENTITY(!(false), (!(false)) || false)))), true, _GLF_TRUE(true, (gl_FragCoord.y >= 0.0))))))))) {
                    _GLF_color = vec4(-83.58, 8.1, 105.289, 1.9);
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        float donor_replacementGLF_dead8th = _GLF_FUZZED(asin(-261.452));
                        {
                            donor_replacementGLF_dead8th = 0.5 - donor_replacementGLF_dead8th;
                        }
                        if (_GLF_DEAD(false)) {
                            _GLF_color = vec4(-8543.9023, -9.2, -6.5, 2031.2184);
                        }
                    }
                }
            case 9:
                data[i] = -5;
                if (_GLF_DEAD(false)) {
                    _GLF_color = _GLF_color;
                    if (_GLF_DEAD(false)) {
                        vec2 donor_replacementGLF_dead6coord = _GLF_FUZZED(max(vec2(-5.1, 3555.0265), mix(vec2(-7932.3454, 996.371), vec2(-3673.1395, 4.1), vec2(-91.27, 0.8))));
                        if (_GLF_DEAD(false)) {
                            float donor_replacementGLF_dead8z = _GLF_FUZZED(-8.9);
                            if (donor_replacementGLF_dead6coord.y > donor_replacementGLF_dead6coord.x) {
                                donor_replacementGLF_dead8z = donor_replacementGLF_dead6coord.x / donor_replacementGLF_dead6coord.y;
                            } else {
                                donor_replacementGLF_dead8z = donor_replacementGLF_dead6coord.y / donor_replacementGLF_dead6coord.x;
                            }
                        }
                        if (donor_replacementGLF_dead6coord.x > 1.0)
                            donor_replacementGLF_dead6coord.x -= 1.0;
                    }
                }
                break;
        }
        i++;
    } while (i < 10);
    for (int j = 0; j < 10; j++) {
        temp[j] = data[j];
    }
    mergeSort();
    float grey;
    if (_GLF_IDENTITY(int(gl_FragCoord[1]) < 30, true && (_GLF_IDENTITY(int(gl_FragCoord[1]) < 30, !(!(int(gl_FragCoord[1]) < 30)))))) {
        grey = 0.5 + float(data[0]) / 10.0;
    } else {
        if (_GLF_IDENTITY(int(gl_FragCoord[1]) < 60, false || (int(gl_FragCoord[1]) < 60))) {
            grey = 0.5 + float(data[1]) / 10.0;
        } else {
            if (int(gl_FragCoord[1]) < 90) {
                grey = 0.5 + float(data[2]) / 10.0;
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    vec2 donor_replacementGLF_dead8a = _GLF_FUZZED(degrees(vec2(-9.8, 793.695)));
                    if (donor_replacementGLF_dead8a.y < donor_replacementGLF_dead8a.x) {
                        grey = 0.5 - grey;
                    }
                }
            } else {
                if (_GLF_DEAD(false)) {
                    vec2 donor_replacementGLF_dead8a = _GLF_FUZZED(injectionSwitch);
                    {
                        grey = donor_replacementGLF_dead8a.x / donor_replacementGLF_dead8a.y;
                    }
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < length(vec4(0.0, 0.0, 0.0, _GLF_IDENTITY(0.0, (0.0) * 1.0))))))) {
                    _GLF_color = vec4(743.364, -4505.6479, -4424.2898, _GLF_IDENTITY(-40.06, clamp(_GLF_IDENTITY(-40.06, (-40.06) / 1.0), -40.06, -40.06)));
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        if (_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(i, 4)] >= 1.0) {
                            if (_GLF_DEAD(false)) {
                                bool donor_replacementGLF_dead9c1 = _GLF_FUZZED((i < (-18781)));
                                vec3 donor_replacementGLF_dead9col = _GLF_FUZZED(normalize(vec3(-6954.4177, -8685.4691, -107.997)));
                                vec2 donor_replacementGLF_dead9uv = _GLF_FUZZED(radians(injectionSwitch));
                                if (donor_replacementGLF_dead9c1) {
                                    float GLF_dead9stripe = GLF_dead9compute_stripe(cos((donor_replacementGLF_dead9uv.x + donor_replacementGLF_dead9uv.y) * 20.0));
                                    donor_replacementGLF_dead9col = mix(vec3(donor_replacementGLF_dead9uv.x, 0, 0.75), vec3(.8, .7, donor_replacementGLF_dead9uv.x), GLF_dead9stripe);
                                    GLF_dead9_GLF_color = vec4(donor_replacementGLF_dead9col, 1.0);
                                    return;
                                }
                            }
                            _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(i, 4)] = _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(i, 4)] * _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(i, 4)];
                        }
                    }
                }
                if (_GLF_DEAD(false)) {
                    _GLF_color = tan(vec4(-83.49, -8.2, 88.26, 4.2));
                }
                if (int(gl_FragCoord[1]) < 120) {
                    grey = 0.5 + float(data[3]) / 10.0;
                } else {
                    {
                        if (_GLF_DEAD(false)) {
                            ivec2 donor_replacementGLF_dead3ipos = _GLF_FUZZED(ivec2(15136, 6690));
                            if (GLF_dead3map[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead3ipos.y * 16 + donor_replacementGLF_dead3ipos.x, 256)] == 1) {
                                GLF_dead3_GLF_color = vec4(1.0, 1.0, 1.0, 1.0);
                                return;
                            }
                        }
                        vec4 _GLF_outVarBackup_GLF_color;
                        if (_GLF_DEAD(false)) {
                            {
                                ;
                            }
                        }
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            if (GLF_dead3_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(i, 4)] >= 1.0) {
                                GLF_dead3_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(i, 4)] = GLF_dead3_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(i, 4)] * GLF_dead3_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(i, 4)];
                            }
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            _GLF_color = vec4(2.0, 161.174, GLF_dead9injectionSwitch);
                        }
                        if (_GLF_DEAD(false)) {
                            _GLF_color = _GLF_color;
                            if (_GLF_DEAD(false)) {
                                if (_GLF_DEAD(false)) {
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = sin(GLF_dead3_GLF_color);
                                    }
                                    do {
                                        if (_GLF_outVarBackup_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(i, 4)] >= 1.0) {
                                            _GLF_outVarBackup_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(i, 4)] = _GLF_outVarBackup_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(i, 4)] * _GLF_outVarBackup_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(i, 4)];
                                        }
                                        i++;
                                    } while (i < findMSB(findLSB(i)));
                                }
                                _GLF_color = clamp(vec4(-4076.0417, 28.60, -6437.5478, -947.768), _GLF_outVarBackup_GLF_color, _GLF_IDENTITY(vec4(95.41, 39.06, 935.120, 60.88), (vec4(95.41, 39.06, 935.120, 60.88)) - vec4(0.0, 0.0, 0.0, 0.0)));
                            }
                        }
                        _GLF_color = fwidth(vec4(-_GLF_IDENTITY(535.735, (true ? 535.735 : _GLF_FUZZED(-16.33))), _GLF_IDENTITY(5037.6419, mix(float(5037.6419), float(_GLF_FUZZED(1061.6709)), bool(false))), -601.469, 8750.0575));
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                            if (_GLF_DEAD(false)) {
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = fract(vec4(6261.2248, -8254.1727, 4479.4944, 646.557));
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                                _GLF_color = faceforward(_GLF_outVarBackup_GLF_color, tanh(vec4(5.0, 4408.9798, 5.1, -6244.5336)), vec4(-635.908, -724.982, 0.2, -3527.6468));
                            }
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = vec4(vec3(4.3, 9704.1122, 0.2), trunc(grey));
                                }
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    float donor_replacementGLF_dead10beta = _GLF_FUZZED(log(grey));
                                    for (int GLF_dead10b = GLF_dead10MATRIX_N - 1; GLF_dead10b >= i; GLF_dead10b--) {
                                        GLF_dead3_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10b, 4)] = GLF_dead3_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10b, 4)] - (donor_replacementGLF_dead10beta * GLF_dead3_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10b, 4)]);
                                    }
                                }
                                _GLF_color = atan(vec4(-9270.3743, 482.964, 9.2, 3.6));
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = dFdy(vec4(-8.6, -7875.7424, -4.9, 9.2));
                                    }
                                }
                            }
                            if (_GLF_DEAD(false)) {
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = log(_GLF_outVarBackup_GLF_color);
                                }
                                _GLF_color = (mat2x4(7.1, 88.69, 0.2, -8.3, 70.02, -68.43, 5.9, -29.96) * vec2(-3173.8067, 6672.7265));
                            }
                            if (_GLF_DEAD(false)) {
                                _GLF_color = round(_GLF_color);
                            }
                            if (_GLF_DEAD(false)) {
                                for (int GLF_dead2i = 0; GLF_dead2i < 10; GLF_dead2i++) {
                                    GLF_dead2obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead2i, 10)] = (10 - GLF_dead2i);
                                    if (_GLF_DEAD(false)) {
                                        vec3 donor_replacementGLF_dead9col = _GLF_FUZZED(vec3(807.401, -1.8, 1.9));
                                        vec2 donor_replacementGLF_dead9uv = _GLF_FUZZED(injectionSwitch);
                                        {
                                            float GLF_dead9stripe = GLF_dead9compute_stripe(cos((donor_replacementGLF_dead9uv.x + donor_replacementGLF_dead9uv.y) * 20.0));
                                            donor_replacementGLF_dead9col = mix(vec3(.7, sinh(donor_replacementGLF_dead9uv.x), donor_replacementGLF_dead9uv.x), vec3(.3, .5, donor_replacementGLF_dead9uv.x), GLF_dead9stripe);
                                            GLF_dead9_GLF_color = vec4(donor_replacementGLF_dead9col, 1.0);
                                            {
                                                vec4 _GLF_outVarBackup_GLF_color;
                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                _GLF_color = floor((vec4(407.638, 812.276, -655.674, 29.31) + distance(vec2(641.202, -331.931), vec2(-623.746, 911.013))));
                                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= determinant(mat2(0.0, 0.0, 1.0, 0.0)))))) {
                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                }
                                            }
                                            return;
                                        }
                                    }
                                    if (_GLF_DEAD(false)) {
                                        if (float(i) >= grey) {
                                            ;
                                        }
                                    }
                                    GLF_dead2obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead2i, 10)] = GLF_dead2obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead2i, 10)] * GLF_dead2obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead2i, 10)];
                                }
                            }
                            if (_GLF_DEAD(false)) {
                                for (int GLF_dead4i = 1; GLF_dead4i < 800; GLF_dead4i++) {
                                    if (mod(float(GLF_dead4i), grey) <= 0.01) {
                                        grey += 0.2;
                                    }
                                    if (float(GLF_dead4i) >= grey) {
                                        ;
                                    }
                                }
                            }
                        }
                        if (_GLF_DEAD(false)) {
                            {
                                if (mod(float(i), grey) <= 0.01) {
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = (GLF_dead9_GLF_color);
                                    }
                                    grey += 0.2;
                                }
                                if (float(i) >= grey) {
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = GLF_dead3_GLF_color;
                                    }
                                    ;
                                }
                                i++;
                            }
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            vec3 donor_replacementGLF_dead2color = _GLF_FUZZED((vec3(89.86, 6454.4536, -2982.9105) / exp(87.37)));
                            vec2 donor_replacementGLF_dead2uv = _GLF_FUZZED(vec2(5190.2365, 54.37));
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                _GLF_color = (vec4(-4788.9491, 26.06, 6198.3038, -948.264) - 285.224);
                            }
                            if (_GLF_DEAD(false)) {
                                if (_GLF_DEAD(false)) {
                                    float donor_replacementGLF_dead8th = _GLF_FUZZED(fma(-453.517, 70.48, -260.532));
                                    if (donor_replacementGLF_dead2uv.y < 0.0) {
                                        donor_replacementGLF_dead8th = -donor_replacementGLF_dead8th;
                                    }
                                }
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = GLF_dead3_GLF_color;
                                }
                                if (_GLF_DEAD(false)) {
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                    _GLF_color = (_GLF_outVarBackup_GLF_color * vec4(-8.7, -3.9, -50.83, -207.100));
                                }
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < length(vec2(0.0, 0.0)))))) {
                                    _GLF_color = GLF_dead9_GLF_color;
                                }
                                _GLF_color = _GLF_color;
                            }
                            if (donor_replacementGLF_dead2uv.x > (2.0 / 4.0)) {
                                donor_replacementGLF_dead2color.y += float(GLF_dead2obj.numbers[2]);
                            }
                        }
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                            vec2 donor_replacementGLF_dead6coord = _GLF_FUZZED(vec2(_GLF_IDENTITY(4236.0079, (_GLF_IDENTITY(4236.0079, clamp(4236.0079, 4236.0079, _GLF_IDENTITY(4236.0079, min(4236.0079, 4236.0079))))) - _GLF_ZERO(0.0, injectionSwitch.x)), -7.9));
                            {
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    {
                                        grey += pow(GLF_dead3_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(i, 4)], 2.0);
                                    }
                                }
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    _GLF_color = (true ? _GLF_color : _GLF_color);
                                }
                                _GLF_color = texture(GLF_dead6tex, donor_replacementGLF_dead6coord);
                            }
                        }
                        _GLF_color = unpackUnorm4x8(35354u);
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        _GLF_color = _GLF_color;
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        bool donor_replacementGLF_dead3canwalk = _GLF_FUZZED((37295u <= 38154u));
                        ivec2 donor_replacementGLF_dead3p = _GLF_FUZZED((ivec2(-_GLF_IDENTITY(14899, _GLF_IDENTITY(int(int(14899)), (int(int(14899))) | (_GLF_IDENTITY(int(int(14899)), (int(int(14899))) * 1)))), 98094) - ivec2(-90069, 68098)));
                        for (i = 0; i < 8; i++) {
                            for (i = 0; i < 8; i++) {
                                if (GLF_dead3map[_GLF_MAKE_IN_BOUNDS_INT(i * 2 + i * 2 * 16, 256)] == 0) {
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = exp2(log2(GLF_dead9_GLF_color));
                                    }
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        _GLF_color = vec4(-1549.7310, -968.506, 3.7, -70.87);
                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                    }
                                    donor_replacementGLF_dead3p.x = i * 2;
                                    donor_replacementGLF_dead3p.y = i * 2;
                                    donor_replacementGLF_dead3canwalk = true;
                                }
                            }
                        }
                    }
                    if (int(gl_FragCoord[1]) < 150) {
                        discard;
                    } else {
                        if (int(_GLF_IDENTITY(gl_FragCoord, vec4(mat3(_GLF_IDENTITY(gl_FragCoord, mix(vec4(_GLF_FUZZED((-9208.6024)), (gl_FragCoord)[1], (gl_FragCoord)[2], (gl_FragCoord)[3]), vec4((gl_FragCoord)[0], _GLF_FUZZED(-0.6), _GLF_FUZZED(9.2), _GLF_FUZZED(-48.89)), bvec4(true, _GLF_FALSE(false, (gl_FragCoord.x < 0.0)), false, false))), 0.0, 0.0, 1.0, 1.0, 1.0)))[1]) < 180) {
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = vec4(2.8, -2.0, 405.201, 76.40);
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    if (_GLF_DEAD(false)) {
                                        {
                                            if (_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(i, 4)] >= 1.0) {
                                                if (_GLF_DEAD(false)) {
                                                    _GLF_color = GLF_dead3_GLF_color;
                                                }
                                                _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(i, 4)] = _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(i, 4)] * _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(i, 4)];
                                            }
                                            i++;
                                        }
                                    }
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                            grey = 0.5 + float(data[5]) / 10.0;
                            if (_GLF_DEAD(false)) {
                                vec3 donor_replacementGLF_dead2color = _GLF_FUZZED(vec2(3.4, 61.84).sts);
                                {
                                    donor_replacementGLF_dead2color.z += float(GLF_dead2obj.numbers[3]);
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_IDENTITY(0.0, float(mat2(0.0, 1.0, 0.0, 0.0))))))) {
                                        mat4 donor_replacementGLF_dead10matrix_a = _GLF_FUZZED(mat4(1.5, -79.65, 1.8, -0.7, -9.2, 3.4, -0.4, -2.5, 1.5, -58.45, 1.5, -7.5, -71.07, 5.1, -9950.2227, 2473.9921));
                                        {
                                            for (int GLF_dead10a = GLF_dead10MATRIX_N - 1; GLF_dead10a >= i; GLF_dead10a--) {
                                                grey += GLF_dead3_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10a, 4)] * donor_replacementGLF_dead10matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10a, 4)][_GLF_MAKE_IN_BOUNDS_INT(i, 4)];
                                            }
                                            {
                                                vec4 _GLF_outVarBackup_GLF_color;
                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                _GLF_color = vec4(-9802.2333, 8545.1815, 8556.6698, -74.67);
                                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                }
                                            }
                                            grey = grey * grey;
                                            for (int GLF_dead10a = GLF_dead10MATRIX_N - 1; GLF_dead10a >= i; GLF_dead10a--) {
                                                donor_replacementGLF_dead10matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10a, 4)][_GLF_MAKE_IN_BOUNDS_INT(i, 4)] = donor_replacementGLF_dead10matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10a, 4)][_GLF_MAKE_IN_BOUNDS_INT(i, 4)] - (grey * GLF_dead3_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10a, 4)]);
                                            }
                                            grey = 0.0;
                                            grey = 0.0;
                                        }
                                    }
                                }
                            }
                        } else {
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                {
                                    ;
                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                        vec2 donor_replacementGLF_dead8a = _GLF_FUZZED(injectionSwitch);
                                        {
                                            grey = donor_replacementGLF_dead8a.y / donor_replacementGLF_dead8a.x;
                                        }
                                    }
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                        _GLF_color = unpackUnorm4x8(_GLF_IDENTITY(uvec4(4549u, 5698u, 113861u, 108325u), (uvec4(4549u, 5698u, 113861u, 108325u)) - uvec4(0u, 0u, 0u, 0u))[1]);
                                        if (_GLF_DEAD(false)) {
                                            _GLF_color = vec4(3798.0649, 166.586, -529.795, 90.26);
                                            if (_GLF_DEAD(false)) {
                                                _GLF_color = fract(GLF_dead3_GLF_color);
                                            }
                                            if (_GLF_DEAD(false)) {
                                                {
                                                    ;
                                                }
                                            }
                                        }
                                    }
                                }
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                        _GLF_color = sign(vec4(238.357, -8193.2009, -21.95, -9585.4121));
                                    }
                                    vec4 donor_replacementGLF_dead7c = _GLF_FUZZED((_GLF_color / grey));
                                    {
                                        if (donor_replacementGLF_dead7c[_GLF_MAKE_IN_BOUNDS_INT(i, 4)] >= 1.0) {
                                            donor_replacementGLF_dead7c[_GLF_MAKE_IN_BOUNDS_INT(i, 4)] = donor_replacementGLF_dead7c[_GLF_MAKE_IN_BOUNDS_INT(i, 4)] * donor_replacementGLF_dead7c[_GLF_MAKE_IN_BOUNDS_INT(i, 4)];
                                        }
                                        i++;
                                    }
                                }
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < determinant(mat4(0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, sqrt(1.0), 1.0, log(1.0), 0.0, 0.0, exp(0.0), 0.0, 0.0)))))) {
                                vec2 donor_replacementGLF_dead8a = _GLF_FUZZED(vec2(-114.508, -7.8));
                                if (donor_replacementGLF_dead8a.y > donor_replacementGLF_dead8a.x) {
                                    grey = donor_replacementGLF_dead8a.x / donor_replacementGLF_dead8a.y;
                                } else {
                                    grey = donor_replacementGLF_dead8a.y / donor_replacementGLF_dead8a.x;
                                }
                            }
                            if (int(gl_FragCoord[1]) < 210) {
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = _GLF_IDENTITY(vec4(-54.61, -6.1, 6.9, -349.493), vec4(mat4x2(vec4(-54.61, -6.1, 6.9, -349.493), 1.0, 1.0, abs(0.0), 0.0)));
                                }
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < sqrt(0.0))))) {
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        _GLF_color = vec4(69.82, 444.731, -4252.8752, -91.25);
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                    }
                                    _GLF_color = vec3(526.793, -65.29, 49.90).yzxy;
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                        _GLF_color = GLF_dead9_GLF_color;
                                    }
                                }
                                grey = 0.5 + float(data[6]) / 10.0;
                            } else {
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    _GLF_color = radians(vec4(-0.3, -0.9, -5.1, 2555.0473));
                                    {
                                        if (_GLF_DEAD(false)) {
                                            _GLF_color = _GLF_color;
                                        }
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                            bool donor_replacementGLF_dead9c1 = _GLF_FUZZED(false);
                                            bool donor_replacementGLF_dead9c2 = _GLF_FUZZED(bvec2(false, true).x);
                                            bool donor_replacementGLF_dead9c3 = _GLF_FUZZED(bool(i));
                                            bool donor_replacementGLF_dead9c4 = _GLF_FUZZED(true);
                                            vec3 donor_replacementGLF_dead9col = _GLF_FUZZED(mat4x3(67.48, -1.1, -277.708, 499.094, 8.4, 5.6, 43.55, 0.4, 23.30, 2557.8218, 3664.9655, -4.7)[2]);
                                            vec2 donor_replacementGLF_dead9uv = _GLF_FUZZED((mat3x2(6.6, 74.40, 9584.5181, -64.39, 7.4, -3.5) * vec3(2.1, 8251.3311, -4.7)));
                                            if (!donor_replacementGLF_dead9c1 && !donor_replacementGLF_dead9c2 && !donor_replacementGLF_dead9c3 && donor_replacementGLF_dead9c4) {
                                                float GLF_dead9stripe = GLF_dead9compute_stripe(tan((donor_replacementGLF_dead9uv.x + donor_replacementGLF_dead9uv.y) * 20.0));
                                                donor_replacementGLF_dead9col = mix(vec3(donor_replacementGLF_dead9uv.x, .8, 0), vec3(1, donor_replacementGLF_dead9uv.y, 0), GLF_dead9stripe);
                                                GLF_dead9_GLF_color = vec4(donor_replacementGLF_dead9col, 1.0);
                                                return;
                                                if (_GLF_DEAD(false)) {
                                                    _GLF_color = radians(_GLF_color);
                                                }
                                                {
                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                    _GLF_color = vec4(4.4, 1393.5544, -5.7, -1.2);
                                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                    }
                                                    if (_GLF_DEAD(_GLF_IDENTITY(false, bool(bool(false))))) {
                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                    }
                                                }
                                            }
                                        }
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        if (_GLF_DEAD(false)) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                        _GLF_color = mod(vec4(0.8, -6341.4349, -9.0, -164.063), vec4(-385.430, 1715.0075, _GLF_IDENTITY(-1831.2389, float(mat2x4(-1831.2389, 0.0, 1.0, 1.0, _GLF_ONE(1.0, injectionSwitch.y), 1.0, _GLF_IDENTITY(1.0, float(vec3(1.0, 0.0, 0.0))), 1.0))), -64.32));
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            if (_GLF_DEAD(false)) {
                                                vec3 donor_replacementGLF_dead9col = _GLF_FUZZED(vec3(2.9, 35.94, -59.79));
                                                vec2 donor_replacementGLF_dead9uv = _GLF_FUZZED(injectionSwitch);
                                                {
                                                    {
                                                        vec4 _GLF_outVarBackup_GLF_color;
                                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                                        _GLF_color = vec4(-2938.7703, 8592.7854, 0.9, -0.5);
                                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= _GLF_IDENTITY(dot(vec3(0.0, 1.0, 0.0), vec3(1.0, 0.0, 1.0)), dot(vec3(0.0, 1.0, 0.0), vec3(1.0, 0.0, 1.0))))))) {
                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                        }
                                                    }
                                                    float GLF_dead9stripe = GLF_dead9compute_stripe(tan((donor_replacementGLF_dead9uv.x + donor_replacementGLF_dead9uv.y) * 20.0));
                                                    donor_replacementGLF_dead9col = mix(vec3(donor_replacementGLF_dead9uv.x, .8, 0), vec3(1, donor_replacementGLF_dead9uv.y, 0), GLF_dead9stripe);
                                                    GLF_dead9_GLF_color = vec4(donor_replacementGLF_dead9col, 1.0);
                                                    return;
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                        _GLF_color = dFdyCoarse(GLF_dead3_GLF_color);
                                                    }
                                                }
                                            }
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                    }
                                }
                                if (int(gl_FragCoord[1]) < _GLF_IDENTITY(240, 1 * (240))) {
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                        ivec2 donor_replacementGLF_dead3p = _GLF_FUZZED(floatBitsToInt(vec2(-780.229, -8.7)));
                                        if (i >= 0 && donor_replacementGLF_dead3p.x > 0 && GLF_dead3map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead3p.x - 2) + (donor_replacementGLF_dead3p.y) * 16, 256)] == 0) {
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                vec2 donor_replacementGLF_dead8v = _GLF_FUZZED(vec2(8.9, 5.8));
                                                if (length(donor_replacementGLF_dead8v) < 0.001) {
                                                    ;
                                                }
                                            }
                                            i--;
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                _GLF_color = vec4(95.73, -525.380, 7.0, -9.2);
                                            }
                                            GLF_dead3map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead3p.x) + (donor_replacementGLF_dead3p.y) * 16, 256)] = 1;
                                            GLF_dead3map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead3p.x - 1) + (donor_replacementGLF_dead3p.y) * 16, 256)] = 1;
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < sqrt(0.0))))) {
                                                _GLF_color = acos(GLF_dead9_GLF_color);
                                            }
                                            GLF_dead3map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead3p.x - 2) + (donor_replacementGLF_dead3p.y) * 16, 256)] = 1;
                                            donor_replacementGLF_dead3p.x -= 2;
                                        }
                                    }
                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                        bool donor_replacementGLF_dead9c1 = _GLF_FUZZED(false);
                                        bool donor_replacementGLF_dead9c2 = _GLF_FUZZED((mat3x2(-520.239, -7055.1842, 6130.8731, 25.38, 1.6, -2809.8428) == mat3x2(-6.7, 7.3, -129.128, -52.27, -7655.8302, 2.1)));
                                        bool donor_replacementGLF_dead9c3 = _GLF_FUZZED((dFdxFine(695.012) <= grey));
                                        vec3 donor_replacementGLF_dead9col = _GLF_FUZZED(exp2((vec2(-5.3, -992.242) * mat3x2(-6.2, -6.3, -2208.3145, -20.08, 5178.3704, -1677.2804))));
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                            _GLF_color = vec4(injectionSwitch, grey, tanh(length(donor_replacementGLF_dead9col)));
                                        }
                                        vec2 donor_replacementGLF_dead9uv = _GLF_FUZZED(vec2(-5278.9765, 0.3));
                                        if (!donor_replacementGLF_dead9c1 && !donor_replacementGLF_dead9c2 && donor_replacementGLF_dead9c3) {
                                            float GLF_dead9stripe = GLF_dead9compute_stripe(cos((donor_replacementGLF_dead9uv.x + donor_replacementGLF_dead9uv.y) * 20.0));
                                            donor_replacementGLF_dead9col = mix(vec3(.7, sinh(donor_replacementGLF_dead9uv.x), donor_replacementGLF_dead9uv.x), vec3(.3, .5, donor_replacementGLF_dead9uv.x), GLF_dead9stripe);
                                            GLF_dead9_GLF_color = vec4(donor_replacementGLF_dead9col, 1.0);
                                            return;
                                        }
                                    }
                                    grey = 0.5 + float(data[7]) / _GLF_IDENTITY(10.0, (false ? _GLF_FUZZED(smoothstep(-0.2, grey, -318.103)) : 10.0));
                                } else {
                                    if (int(gl_FragCoord[1]) < 270) {
                                        if (_GLF_DEAD(false)) {
                                            int donor_replacementGLF_dead0data = _GLF_FUZZED(bitfieldExtract(N, -79989, N));
                                            if (GLF_dead0tree[_GLF_MAKE_IN_BOUNDS_INT(i, 10)].rightIndex == -1) {
                                                GLF_dead0tree[_GLF_MAKE_IN_BOUNDS_INT(i, 10)].rightIndex = i;
                                                GLF_dead0makeTreeNode(GLF_dead0tree[_GLF_MAKE_IN_BOUNDS_INT(i, 10)], donor_replacementGLF_dead0data);
                                                return;
                                            } else {
                                                i = GLF_dead0tree[_GLF_MAKE_IN_BOUNDS_INT(i, 10)].rightIndex;
                                                ;
                                                if (_GLF_DEAD(false)) {
                                                    vec2 donor_replacementGLF_dead5pos = _GLF_FUZZED(injectionSwitch);
                                                    if (_GLF_DEAD(false)) {
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                            _GLF_color = _GLF_color;
                                                        }
                                                        bool donor_replacementGLF_dead9c1 = _GLF_FUZZED(bool((-_GLF_color)[0]));
                                                        bool donor_replacementGLF_dead9c2 = _GLF_FUZZED(((notEqual(uvec4(139702u, 143068u, 150184u, 174574u), uvec4(173997u, 150904u, 2519u, 179442u)) != bvec4(true, false, false, true)) && true));
                                                        bool donor_replacementGLF_dead9c3 = _GLF_FUZZED(false);
                                                        bool donor_replacementGLF_dead9c4 = _GLF_FUZZED(any(greaterThanEqual(ivec3(-59853, 13707, -57879), ivec3(-12649, -25632, -36835))));
                                                        vec3 donor_replacementGLF_dead9col = _GLF_FUZZED(vec3(6.7, 3.9, 6.8));
                                                        if (!donor_replacementGLF_dead9c1 && !donor_replacementGLF_dead9c2 && !donor_replacementGLF_dead9c3 && donor_replacementGLF_dead9c4) {
                                                            float GLF_dead9stripe = GLF_dead9compute_stripe(tan((donor_replacementGLF_dead5pos.x + donor_replacementGLF_dead5pos.y) * 20.0));
                                                            donor_replacementGLF_dead9col = mix(vec3(donor_replacementGLF_dead5pos.x, .8, 0), vec3(1, donor_replacementGLF_dead5pos.y, 0), GLF_dead9stripe);
                                                            GLF_dead9_GLF_color = vec4(donor_replacementGLF_dead9col, 1.0);
                                                            return;
                                                        }
                                                    }
                                                    {
                                                        if (GLF_dead5collision(donor_replacementGLF_dead5pos, GLF_dead5picdata[_GLF_MAKE_IN_BOUNDS_INT(i, 8)])) {
                                                            _GLF_color = GLF_dead5pal[_GLF_MAKE_IN_BOUNDS_INT((int(GLF_dead5picdata[_GLF_MAKE_IN_BOUNDS_INT(i, 8)].x) * int(GLF_dead5picdata[_GLF_MAKE_IN_BOUNDS_INT(i, 8)].y) + i * 9 + 11) % 16, 16)];
                                                        }
                                                    }
                                                    if (_GLF_DEAD(false)) {
                                                        _GLF_color = vec4(68.47, acos(grey), 3.7, grey);
                                                    }
                                                }
                                            }
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < tan(0.0))))) {
                                                {
                                                    ;
                                                }
                                            }
                                        }
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < tan(0.0))))) {
                                            _GLF_color = (+vec4(-428.208, 66.37, -62.91, -7.6));
                                        }
                                        grey = 0.5 + float(data[8]) / 10.0;
                                    } else {
                                        discard;
                                    }
                                }
                            }
                        }
                        if (_GLF_DEAD(false)) {
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < sin(0.0))))) {
                                {
                                    i += 1;
                                }
                            }
                            {
                                if (i <= GLF_dead0tree[_GLF_MAKE_IN_BOUNDS_INT(i, 10)].data) {
                                    {
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_IDENTITY(dot(vec4(1.0, 1.0, 1.0, 0.0), vec4(0.0, 0.0, 0.0, 1.0)), dot(vec4(1.0, 1.0, 1.0, 0.0), vec4(0.0, 0.0, 0.0, 1.0))))))) {
                                            mat4 donor_replacementGLF_dead10matrix_a = _GLF_FUZZED((transpose(mat4x3(-872.878, -3.9, 3.4, -82.45, -9.9, -91.33, -2764.5514, -5124.0762, 25.33, 1.7, 85.03, -754.796)) * transpose(mat3x4(5167.3383, 4.3, 2.6, -3.3, 42.33, -102.526, 5.8, 5.1, 24.25, 90.72, -0.7, 2281.8087))));
                                            {
                                                for (int GLF_dead10a = GLF_dead10MATRIX_N - 1; GLF_dead10a >= i; GLF_dead10a--) {
                                                    grey += GLF_dead3_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10a, 4)] * donor_replacementGLF_dead10matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10a, 4)][_GLF_MAKE_IN_BOUNDS_INT(i, 4)];
                                                }
                                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                    _GLF_color = (vec3(800.708, 100.509, -990.178).bgrr * donor_replacementGLF_dead10matrix_a);
                                                }
                                                grey = grey * grey;
                                                for (int GLF_dead10a = GLF_dead10MATRIX_N - 1; GLF_dead10a >= i; GLF_dead10a--) {
                                                    donor_replacementGLF_dead10matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10a, 4)][_GLF_MAKE_IN_BOUNDS_INT(i, 4)] = donor_replacementGLF_dead10matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10a, 4)][_GLF_MAKE_IN_BOUNDS_INT(i, 4)] - (grey * GLF_dead3_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10a, 4)]);
                                                }
                                                grey = 0.0;
                                                if (_GLF_DEAD(false)) {
                                                    _GLF_color = GLF_dead9_GLF_color;
                                                }
                                                grey = 0.0;
                                            }
                                        }
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        _GLF_color = (vec4(920.577, 5.6, -6.7, -9945.9342) + 300.823);
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                    }
                                    if (_GLF_DEAD(false)) {
                                        {
                                            i += 1;
                                        }
                                        if (_GLF_DEAD(false)) {
                                            {
                                                grey += 0.2;
                                            }
                                        }
                                    }
                                    if (GLF_dead0tree[_GLF_MAKE_IN_BOUNDS_INT(i, 10)].leftIndex == -1) {
                                        GLF_dead0tree[_GLF_MAKE_IN_BOUNDS_INT(i, 10)].leftIndex = i;
                                        if (_GLF_DEAD(false)) {
                                            vec2 donor_replacementGLF_dead6coord = _GLF_FUZZED((vec2(-4.5, -1.2) * mod(injectionSwitch, clamp(vec2(-_GLF_IDENTITY(565.568, max(565.568, _GLF_IDENTITY(565.568, (565.568) - 0.0))), -3109.2689), vec2(-276.219, 679.229), vec2(-1.4, -4.5)))));
                                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                _GLF_color = GLF_dead9_GLF_color;
                                            }
                                            if (donor_replacementGLF_dead6coord.x < 1.0 && donor_replacementGLF_dead6coord.y < 1.0) {
                                                _GLF_IDENTITY(_GLF_color = texture(GLF_dead6tex, donor_replacementGLF_dead6coord), (_GLF_IDENTITY(_GLF_color = texture(GLF_dead6tex, donor_replacementGLF_dead6coord), (_GLF_color = texture(GLF_dead6tex, donor_replacementGLF_dead6coord)) / vec4(_GLF_ONE(1.0, injectionSwitch.y), _GLF_ONE(1.0, injectionSwitch.y), _GLF_ONE(1.0, injectionSwitch.y), _GLF_ONE(1.0, injectionSwitch.y)))) - vec4(0.0, 0.0, 0.0, 0.0));
                                            }
                                        }
                                        GLF_dead0makeTreeNode(GLF_dead0tree[_GLF_MAKE_IN_BOUNDS_INT(i, 10)], i);
                                        return;
                                    } else {
                                        i = GLF_dead0tree[_GLF_MAKE_IN_BOUNDS_INT(i, 10)].leftIndex;
                                        ;
                                    }
                                } else {
                                    if (GLF_dead0tree[_GLF_MAKE_IN_BOUNDS_INT(i, 10)].rightIndex == -1) {
                                        GLF_dead0tree[_GLF_MAKE_IN_BOUNDS_INT(i, 10)].rightIndex = i;
                                        GLF_dead0makeTreeNode(GLF_dead0tree[_GLF_MAKE_IN_BOUNDS_INT(i, 10)], i);
                                        return;
                                    } else {
                                        i = GLF_dead0tree[_GLF_MAKE_IN_BOUNDS_INT(i, 10)].rightIndex;
                                        if (_GLF_DEAD(false)) {
                                            vec2 donor_replacementGLF_dead8v = _GLF_FUZZED(injectionSwitch);
                                            if (donor_replacementGLF_dead8v.x < 0.0) {
                                                grey = 1.0 - grey;
                                            }
                                        }
                                        ;
                                        if (_GLF_DEAD(false)) {
                                            _GLF_color = GLF_dead9_GLF_color;
                                        }
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                            mat4 donor_replacementGLF_dead10matrix_a = _GLF_FUZZED(mat4(-913.456, 4338.4604, -69.95, 3294.4932, -8089.2555, 296.084, 7.7, -1.0, -9.8, -1609.4146, -2.5, 1.3, 4425.4643, 89.15, 9170.4201, -701.762));
                                            vec4 donor_replacementGLF_dead10matrix_u = _GLF_FUZZED(GLF_dead3_GLF_color);
                                            if (_GLF_DEAD(false)) {
                                                _GLF_color = donor_replacementGLF_dead10matrix_u;
                                            }
                                            for (int GLF_dead10a = GLF_dead10MATRIX_N - 1; GLF_dead10a >= i; GLF_dead10a--) {
                                                donor_replacementGLF_dead10matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10a, 4)][_GLF_MAKE_IN_BOUNDS_INT(i, 4)] = donor_replacementGLF_dead10matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10a, 4)][_GLF_MAKE_IN_BOUNDS_INT(i, 4)] - (grey * donor_replacementGLF_dead10matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10a, 4)]);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        if (_GLF_DEAD(_GLF_IDENTITY(false, !(_GLF_IDENTITY(!(false), (_GLF_IDENTITY(!(false), bool(bool(!(false))))) || false))))) {
            {
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    {
                        grey += 0.2;
                    }
                }
                ;
                if (_GLF_DEAD(false)) {
                    ivec2 donor_replacementGLF_dead3p = _GLF_FUZZED((ivec2(-10267, 59160) + N));
                    if (donor_replacementGLF_dead3p.x > 0 && _GLF_IDENTITY(GLF_dead3map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead3p.x - 2) + (donor_replacementGLF_dead3p.y) * 16, 256)] == 0, _GLF_TRUE(true, (gl_FragCoord.x >= 0.0)) && (GLF_dead3map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead3p.x - 2) + (donor_replacementGLF_dead3p.y) * 16, 256)] == 0))) {
                        i += 1;
                    }
                }
            }
        }
    }
    _GLF_color = vec4(vec3(grey), 1.0);
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
        _GLF_color = vec4(669.069, -5253.7955, 4300.1620, -1.7);
    }
}
