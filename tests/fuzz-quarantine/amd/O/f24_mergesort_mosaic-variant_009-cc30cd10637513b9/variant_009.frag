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
vec4 GLF_live9_GLF_color = _GLF_FUZZED(vec4(-1.9, -77.58, 130.526, -539.393));
int GLF_live9map[16 * 16] = int[256](0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
vec4 GLF_live10gl_FragCoord = _GLF_FUZZED((vec4(3.1, 7.8, 4.5, 8.3)));
const int GLF_live10N = 10;
int GLF_live10data[10] = int[10](_GLF_FUZZED(30289), _GLF_FUZZED(ivec3(-98200, -40217, 93315).t), _GLF_FUZZED(((-48999) - (-67524))), _GLF_FUZZED((55600 & (-15134))), _GLF_FUZZED(54220), _GLF_FUZZED(70784), _GLF_FUZZED(int(true)), _GLF_FUZZED(44261), _GLF_FUZZED(49146), _GLF_FUZZED(-83713)), GLF_live10temp[10] = int[10](_GLF_FUZZED(-51669), _GLF_FUZZED(66273), _GLF_FUZZED(-99056), _GLF_FUZZED((((-56476) | 58542) + (-37672))), _GLF_FUZZED((25528)), _GLF_FUZZED(41952), _GLF_FUZZED(-8428), _GLF_FUZZED(-40862), _GLF_FUZZED(61680), _GLF_FUZZED(-72844));

void GLF_live10merge(int GLF_live10from, int GLF_live10mid, int GLF_live10to) {
    int GLF_live10k = GLF_live10from, GLF_live10i = GLF_live10from, GLF_live10j = GLF_live10mid + 1;
    {
        int GLF_live10looplimiter0 = 0;
        while (GLF_live10i <= GLF_live10mid && GLF_live10j <= GLF_live10to) {
            if (GLF_live10looplimiter0 >= 6) {
                break;
            }
            GLF_live10looplimiter0++;
            {
                if (GLF_live10data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10i, 10)] < GLF_live10data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10j, 10)]) {
                    GLF_live10temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10k++, 10)] = GLF_live10data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10i++, 10)];
                } else {
                    GLF_live10temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10k++, 10)] = GLF_live10data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10j++, 10)];
                }
            }
        }
    }
    {
        int GLF_live10looplimiter1 = 0;
        while (GLF_live10i < GLF_live10N && GLF_live10i <= GLF_live10mid) {
            if (GLF_live10looplimiter1 >= 6) {
                break;
            }
            GLF_live10looplimiter1++;
            {
                GLF_live10temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10k++, 10)] = GLF_live10data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10i++, 10)];
            }
        }
    }
    if (_GLF_WRAPPED_IF_FALSE(false)) {
    } else {
        int GLF_live10looplimiter2 = 0;
        for (int GLF_live10i = GLF_live10from; GLF_live10i <= GLF_live10to; GLF_live10i++) {
            if (GLF_live10looplimiter2 >= 6) {
                break;
            }
            GLF_live10looplimiter2++;
            {
                GLF_live10data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10i, 10)] = GLF_live10temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10i, 10)];
            }
        }
    }
}

layout(set = 0, binding = 2) uniform sampler2D GLF_live11tex;
vec4 GLF_live8_GLF_color = _GLF_FUZZED(vec4(0.3, -48.83, 3463.1447, 8.2));

layout(set = 0, binding = 3) uniform buf3 {
    vec2 GLF_live8injectionSwitch;
};

float GLF_live8compute_derivative_x(float GLF_live8v) {
    if (_GLF_WRAPPED_IF_FALSE(false)) {
    } else {
        return dFdx(GLF_live8v) * GLF_live8injectionSwitch.y;
    }
}

float GLF_live8compute_derivative_y(float GLF_live8v) {
    return dFdy(GLF_live8v) * GLF_live8injectionSwitch.y;
}

float GLF_live8compute_stripe(float GLF_live8v) {
    return smoothstep(-.9, 1., (GLF_live8v) / ((GLF_live8injectionSwitch.y > GLF_live8injectionSwitch.x) ? GLF_live8compute_derivative_x(GLF_live8v) : GLF_live8compute_derivative_y(GLF_live8v)));
}

vec4 GLF_live5_GLF_color = _GLF_FUZZED(((vec3(4.7, 7933.6247, -6.3) * mat2x3(6.4, 8.4, 4129.8594, -8826.1155, -790.087, 626.159)) * mat4x2(994.649, -2.2, -37.21, -6.9, 4.7, -6.3, -20.48, -565.034)));

layout(set = 0, binding = 4) uniform buf4 {
    vec3 GLF_live5polynomial;
};

float GLF_live5fx(float GLF_live5x) {
    return GLF_live5polynomial.x * pow(GLF_live5x, 2.0) + GLF_live5polynomial.y * GLF_live5x + GLF_live5polynomial.z;
}

vec4 GLF_live4_GLF_color = _GLF_FUZZED((vec4(7692.8661, 0.2, 639.197, 1.0) * 8833.7256));

struct GLF_live2BST {
    int data;
    int leftIndex;
    int rightIndex;
};

GLF_live2BST GLF_live2tree[10] = GLF_live2BST[10](GLF_live2BST(0, 0, 0), GLF_live2BST(0, 0, 0), GLF_live2BST(0, 0, 0), GLF_live2BST(0, 0, 0), GLF_live2BST(0, 0, 0), GLF_live2BST(0, 0, 0), GLF_live2BST(0, 0, 0), GLF_live2BST(0, 0, 0), GLF_live2BST(0, 0, 0), GLF_live2BST(0, 0, 0));

void GLF_live2makeTreeNode(inout GLF_live2BST GLF_live2tree, int GLF_live2data) {
    GLF_live2tree.data = GLF_live2data;
    GLF_live2tree.leftIndex = -1;
    GLF_live2tree.rightIndex = -1;
}

vec4 GLF_live3_GLF_color = _GLF_FUZZED(vec4(-71.63, 1.0, 0.6, -524.243));
int GLF_live1map[16 * 16] = int[256](0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
layout(location = 0) out vec4 _GLF_color;

layout(set = 0, binding = 0) uniform buf0 {
    vec2 injectionSwitch;
};

layout(set = 0, binding = 1) uniform buf1 {
    vec2 resolution;
};

const int N = 10;
int data[10], temp[10];

void merge(int from, int mid, int to) {
    int k = from, i = from, j = mid + 1;
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_IDENTITY(dot(vec4(1.0, determinant(mat4(1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0, 1.0)), 1.0, 1.0), vec4(0.0, 0.0, 0.0, 0.0)), _GLF_IDENTITY(dot(vec4(1.0, determinant(mat4(1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0, 1.0)), 1.0, 1.0), vec4(0.0, 0.0, 0.0, 0.0)), max(dot(vec4(1.0, determinant(mat4(1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0, 1.0)), 1.0, 1.0), vec4(0.0, 0.0, 0.0, 0.0)), dot(vec4(1.0, determinant(mat4(1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0, 1.0)), 1.0, 1.0), vec4(0.0, 0.0, 0.0, 0.0))))))))) {
        _GLF_color = _GLF_color;
    }
    for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
        vec2 GLF_live4coord = _GLF_FUZZED(vec2(-24.96, 410.894));
        if (GLF_live4coord.y < 0.6) {
            uvec2 GLF_live4icoord = uvec2(((GLF_live4coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
            uint GLF_live4res1 = uint(((GLF_live4icoord.x * GLF_live4icoord.y) >> (GLF_live4icoord.x & 31u)) & 0xffffffffu);
            uint GLF_live4res2 = uint(((GLF_live4icoord.x * GLF_live4icoord.y) << (GLF_live4icoord.x & 31u)) & 0xffffffffu);
            float GLF_live4res = float(((GLF_live4res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_live4res1 & 1u) != 0u ? 1u : 0u));
            GLF_live4_GLF_color = vec4(GLF_live4res, GLF_live4res, GLF_live4res, 1.0);
            {
                vec3 GLF_live8col = _GLF_FUZZED(vec3(840.135, -5322.7462, 5289.7042));
                vec2 GLF_live8uv = _GLF_FUZZED(vec2(9.3, 9163.5053));
                {
                    float GLF_live8stripe = GLF_live8compute_stripe(tan((GLF_live8uv.x + GLF_live8uv.y) * 20.0));
                    GLF_live8col = mix(vec3(GLF_live8uv.x, .8, 0), vec3(1, GLF_live8uv.y, 0), GLF_live8stripe);
                    GLF_live8_GLF_color = vec4(GLF_live8col, 1.0);
                    ;
                }
            }
        } else {
            ivec2 GLF_live4icoord = ivec2(((GLF_live4coord - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
            int GLF_live4res3 = ((GLF_live4icoord.x >> 5) & 1) ^ ((GLF_live4icoord.y & 32) >> 5);
            int GLF_live4res2 = (GLF_live4icoord.y * GLF_live4icoord.y >> 10) & 1;
            int GLF_live4res1 = (GLF_live4icoord.x * GLF_live4icoord.y >> 9) & 1;
            {
                int GLF_live9d = _GLF_FUZZED(75330);
                ivec2 GLF_live9p = _GLF_FUZZED(ivec2(-71490, -91162));
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    _GLF_color = GLF_live4_GLF_color;
                }
                if (GLF_live9d >= 0 && GLF_live9p.x > 0 && GLF_live9map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live9p.x - 2) + (GLF_live9p.y) * 16, 256)] == 0) {
                    GLF_live9d--;
                    GLF_live9map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live9p.x) + (GLF_live9p.y) * 16, 256)] = 1;
                    if (_GLF_DEAD(false)) {
                        _GLF_color = dFdx(GLF_live5_GLF_color);
                    }
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        GLF_live9map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live9p.x - 1) + (GLF_live9p.y) * 16, 256)] = 1;
                        if (_GLF_DEAD(false)) {
                            _GLF_color = smoothstep(20.33, 634.355, GLF_live4_GLF_color);
                        }
                    } else {
                    }
                    GLF_live9map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live9p.x - 2) + (GLF_live9p.y) * 16, 256)] = 1;
                    GLF_live9p.x -= 2;
                }
            }
            GLF_live4_GLF_color = vec4(float(GLF_live4res1 ^ GLF_live4res2), float(GLF_live4res2 & GLF_live4res3), float(GLF_live4res1 | GLF_live4res3), 1.0);
        }
    }
    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
        if (_GLF_WRAPPED_IF_FALSE(false)) {
        } else {
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                _GLF_color = vec4(roundEven(-3.4), vec3(-64.70, -62.58, -4598.2242));
                if (_GLF_DEAD(false)) {
                    _GLF_color = vec4(8.1, vec3(8.3, 7.2, 3.9));
                }
            }
            while (i <= mid && j <= to) {
                if (data[i] < data[j]) {
                    if (_GLF_DEAD(false)) {
                        continue;
                    }
                    temp[k++] = data[i++];
                } else {
                    temp[k++] = data[j++];
                    if (_GLF_DEAD(false)) {
                        if (_GLF_DEAD(false)) {
                            _GLF_color = GLF_live5_GLF_color;
                        }
                        _GLF_color = pow(vec4(1669.7495, -3.8, 6.4, -1.8), _GLF_color);
                    }
                }
            }
        }
    } else {
    }
    if (_GLF_DEAD(false)) {
        _GLF_color = cosh(log2(vec4(-9711.7022, 6.4, -6458.7123, 2.5)));
    }
    {
        int GLF_live10high = _GLF_FUZZED((~41611));
        int GLF_live10i = _GLF_FUZZED(56985);
        int GLF_live10m = _GLF_FUZZED(22315);
        {
            int GLF_live10from = GLF_live10i;
            int GLF_live10mid = GLF_live10i + GLF_live10m - 1;
            int GLF_live10to = min(GLF_live10i + 2 * GLF_live10m - 1, GLF_live10high);
            GLF_live10merge(GLF_live10from, GLF_live10mid, GLF_live10to);
        }
    }
    while (i < N && i <= mid) {
        temp[k++] = data[i++];
    }
    for (int i = from; i <= to; i++) {
        data[i] = temp[i];
    }
}

void mergeSort() {
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
        return;
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
        _GLF_color = _GLF_color;
    }
    int low = 0;
    int high = N - 1;
    for (int m = 1; m <= high; m = 2 * m) {
        for (int i = low; i < high; i += 2 * m) {
            int from = i;
            int mid = i + m - 1;
            {
                if (_GLF_DEAD(false)) {
                    _GLF_color = GLF_live5_GLF_color;
                }
                vec2 GLF_live11coord = _GLF_FUZZED(vec2(41.42, 9.4));
                float GLF_live11h = _GLF_FUZZED(3.6);
                int GLF_live11i = _GLF_FUZZED((true ? (-22181) : 24730));
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    _GLF_color = sqrt(GLF_live4_GLF_color);
                }
                int GLF_live11looplimiter0 = 0;
                float GLF_live11refh = _GLF_FUZZED(5.8);
                float GLF_live11slope = _GLF_FUZZED(vec2(3.4, -8.2).t);
                if (_GLF_DEAD(false)) {
                    _GLF_color = atan(acosh(GLF_live8_GLF_color));
                }
                vec2 GLF_live11uvstep = _GLF_FUZZED(vec2(-5434.9514, -85.46));
                while (GLF_live11h < GLF_live11refh && GLF_live11i < 32) {
                    if (GLF_live11looplimiter0 >= 5) {
                        break;
                    }
                    GLF_live11looplimiter0++;
                    {
                        GLF_live11coord -= GLF_live11uvstep;
                        GLF_live11refh += GLF_live11slope;
                        if (_GLF_DEAD(false)) {
                            _GLF_color = GLF_live9_GLF_color;
                        }
                        if (_GLF_WRAPPED_IF_FALSE(_GLF_IDENTITY(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)), (_GLF_FALSE(false, (gl_FragCoord.x < 0.0))) && _GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y))))) {
                        } else {
                            GLF_live11h = texture(GLF_live11tex, GLF_live11coord).y;
                        }
                        GLF_live11i++;
                    }
                }
            }
            int to = min(i + 2 * m - 1, high);
            if (_GLF_WRAPPED_IF_FALSE(false)) {
            } else {
                merge(from, mid, to);
            }
        }
    }
}

void main() {
    int i = int(injectionSwitch.x);
    {
        if (_GLF_DEAD(false)) {
            _GLF_color = vec4(-38.30, 6896.7658, 9.1, -8.6);
        }
        int GLF_live11looplimiter0 = 0;
        do {
            if (GLF_live11looplimiter0 >= 5) {
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    ;
                } else {
                }
            }
        } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))));
    }
    for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > (int(_GLF_ZERO(0.0, injectionSwitch.x)) >> _GLF_IDENTITY(int(5), int(5)))); _injected_loop_counter--) {
        do {
            switch (i) {
                case 0:
                    data[i] = 4;
                    break;
                case 1:
                    if (_GLF_DEAD(false)) {
                        return;
                    }
                    data[i] = 3;
                    break;
                case 2:
                    data[i] = 2;
                    break;
                case 3:
                    for (int _injected_loop_counter = (0 << _GLF_IDENTITY(int(3), int(3))); _GLF_WRAPPED_LOOP(_injected_loop_counter != (1 & 1)); _injected_loop_counter++) {
                        data[i] = 1;
                    }
                    if (_GLF_DEAD(false)) {
                        _GLF_color = fwidthCoarse(GLF_live9_GLF_color);
                    }
                    break;
                    if (_GLF_DEAD(false)) {
                        _GLF_color = (mat4(-4.1, 17.09, 0.2, 7549.7314, -61.35, 3573.2358, 62.93, -3.8, -8.0, 16.88, -4541.3574, -96.76, -3.0, 2.8, 4.3, -0.1) * vec4(-2.0, 4.0, 6753.4713, 92.08));
                    }
                    {
                        {
                            vec2 GLF_live11coord = _GLF_FUZZED((vec2(7.5, 4715.3929) - (-1452.2888)));
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                _GLF_color = GLF_live8_GLF_color;
                            }
                            float GLF_live11h = _GLF_FUZZED(vec4(-6989.7901, 2674.1924, 7.1, 1713.2262).r);
                            int GLF_live11i = _GLF_FUZZED(-98629);
                            float GLF_live11refh = _GLF_FUZZED((7.6 * (-3434.9760)));
                            float GLF_live11slope = _GLF_FUZZED(-451.364);
                            vec2 GLF_live11uvstep = _GLF_FUZZED(vec2(-1460.8529, -77.16));
                            {
                                int GLF_live11looplimiter0 = 0;
                                while (GLF_live11h < GLF_live11refh && GLF_live11i < 32) {
                                    if (GLF_live11looplimiter0 >= 5) {
                                        break;
                                    }
                                    GLF_live11looplimiter0++;
                                    {
                                        GLF_live11coord -= GLF_live11uvstep;
                                        if (_GLF_DEAD(false)) {
                                            _GLF_color = normalize((GLF_live5_GLF_color * _GLF_color));
                                        }
                                        GLF_live11refh += GLF_live11slope;
                                        GLF_live11h = texture(GLF_live11tex, GLF_live11coord).y;
                                        GLF_live11i++;
                                    }
                                }
                            }
                        }
                        int GLF_live0looplimiter1 = 0;
                        if (GLF_live0looplimiter1 >= 7) {
                            ;
                        }
                    }
                case 4:
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        _GLF_color = vec4(-56.18, 9.8, 689.599, 849.970);
                    }
                    if (_GLF_DEAD(false)) {
                        _GLF_color = vec4(7694.0872, -114.170, 1.9, 776.441);
                    }
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        data[i] = 0;
                    } else {
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            _GLF_color = (mat4(-2.4, -7641.7171, 54.21, 0.8, -5.7, 22.23, -76.63, 1.8, 8.3, 1.3, 299.909, 2248.9906, -0.9, -26.58, -7.5, 0.4) * resolution.tsss);
                        }
                    }
                    {
                        int GLF_live1directions = _GLF_FUZZED(-54673);
                        ivec2 GLF_live1p = _GLF_FUZZED(ivec2(77429, 45800));
                        if (GLF_live1p.x < 14 && GLF_live1map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live1p.x + 2) + (GLF_live1p.y) * 16, 256)] == 0) {
                            if (_GLF_DEAD(false)) {
                                do {
                                    return;
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = vec4(-71.21, -35.44, 57.69, 3.3);
                                    }
                                } while (_GLF_WRAPPED_LOOP(false));
                            }
                            GLF_live1directions += 1;
                            if (_GLF_DEAD(false)) {
                                {
                                    bool GLF_live9canwalk = _GLF_FUZZED(true);
                                    int GLF_live9i = _GLF_FUZZED((~(-42593)));
                                    int GLF_live9j = _GLF_FUZZED(int(true));
                                    ivec2 GLF_live9p = _GLF_FUZZED(ivec2(-33506, 51165));
                                    {
                                        {
                                            int GLF_live9looplimiter1 = 0;
                                            for (GLF_live9j = 0; GLF_live9j < 8; GLF_live9j++) {
                                                if (GLF_live9looplimiter1 >= 4) {
                                                    break;
                                                }
                                                if (_GLF_DEAD(false)) {
                                                    _GLF_color = vec4(-112.725, 805.386, 2.9, -24.97);
                                                }
                                                GLF_live9looplimiter1++;
                                                {
                                                    if (GLF_live9map[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9j * 2 + GLF_live9i * 2 * 16, 256)] == 0) {
                                                        GLF_live9p.x = GLF_live9j * 2;
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < abs(sqrt(0.0)))))) {
                                                            _GLF_color = (GLF_live10gl_FragCoord + normalize(-8.4));
                                                        }
                                                        GLF_live9p.y = GLF_live9i * 2;
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                            _GLF_color = sinh(GLF_live10gl_FragCoord);
                                                        }
                                                        GLF_live9canwalk = true;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                                _GLF_color = dFdyCoarse(GLF_live3_GLF_color);
                            }
                        }
                    }
                    break;
                case 5:
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        if (_GLF_DEAD(false)) {
                            do {
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = (GLF_live5_GLF_color / tan(-4554.2111));
                                }
                                _GLF_color = vec4(-5.4, 4.6, 51.17, 9.0);
                                do {
                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                        _GLF_color = ((true ? vec4(-1698.0187, -20.19, -990.442, -6.2) : GLF_live3_GLF_color) + GLF_live3_GLF_color);
                                        {
                                            int GLF_live10high = _GLF_FUZZED(-12189);
                                            int GLF_live10looplimiter3 = 0;
                                            int GLF_live10low = _GLF_FUZZED(((41.41 != (-0.3)) ? (-36692) : int(7472u)));
                                            int GLF_live10m = _GLF_FUZZED(89269);
                                            for (int GLF_live10i = GLF_live10low; GLF_live10i < GLF_live10high; GLF_live10i += 2 * GLF_live10m) {
                                                if (GLF_live10looplimiter3 >= 6) {
                                                    break;
                                                }
                                                GLF_live10looplimiter3++;
                                                {
                                                    int GLF_live10from = GLF_live10i;
                                                    int GLF_live10mid = GLF_live10i + GLF_live10m - 1;
                                                    if (_GLF_DEAD(_GLF_IDENTITY(false, (false) && true))) {
                                                        _GLF_color = dFdx(GLF_live5_GLF_color);
                                                    }
                                                    int GLF_live10to = min(GLF_live10i + 2 * GLF_live10m - 1, GLF_live10high);
                                                    GLF_live10merge(GLF_live10from, GLF_live10mid, GLF_live10to);
                                                }
                                            }
                                            if (_GLF_DEAD(false)) {
                                                _GLF_color = _GLF_color;
                                            }
                                        }
                                    }
                                } while (_GLF_WRAPPED_LOOP(false));
                            } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
                            if (_GLF_DEAD(_GLF_IDENTITY(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)), (_GLF_FALSE(false, (gl_FragCoord.x < 0.0))) && true))) {
                                return;
                            }
                        }
                    } else {
                    }
                    data[i] = -1;
                    for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
                        if (_GLF_DEAD(false)) {
                            if (_GLF_DEAD(false)) {
                                _GLF_color = GLF_live8_GLF_color;
                            }
                            if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                            } else {
                                _GLF_color = _GLF_color;
                            }
                            {
                                float GLF_live5A = _GLF_FUZZED((0.8 * 46.40));
                                float GLF_live5B = _GLF_FUZZED(6.1);
                                float GLF_live5C = _GLF_FUZZED(86.71);
                                int GLF_live5looplimiter0 = 0;
                                float GLF_live5temp = _GLF_FUZZED(406.755);
                                float GLF_live5x0 = _GLF_FUZZED(9.8);
                                float GLF_live5x1 = _GLF_FUZZED(((-263.715) + 5.5));
                                float GLF_live5x2 = _GLF_FUZZED(-49.41);
                                while (abs(GLF_live5x2 - GLF_live5x1) >= .000000000000001) {
                                    if (GLF_live5looplimiter0 >= 5) {
                                        break;
                                    }
                                    GLF_live5looplimiter0++;
                                    do {
                                        float GLF_live5h0 = GLF_live5x0 - GLF_live5x2;
                                        {
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                _GLF_color = GLF_live5_GLF_color;
                                            }
                                            float GLF_live10grey = _GLF_FUZZED((false ? (6.4 * 5.2) : (-6685.5740)));
                                            if (_GLF_DEAD(false)) {
                                                _GLF_color = injectionSwitch.grrg;
                                            }
                                            {
                                                GLF_live10grey = 0.5 + float(GLF_live10data[5]) / 10.0;
                                            }
                                        }
                                        float GLF_live5h1 = GLF_live5x1 - GLF_live5x2;
                                        float GLF_live5k0 = GLF_live5fx(GLF_live5x0) - GLF_live5fx(GLF_live5x2);
                                        float GLF_live5k1 = GLF_live5fx(GLF_live5x1) - GLF_live5fx(GLF_live5x2);
                                        if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                        } else {
                                            GLF_live5temp = GLF_live5x2;
                                        }
                                        {
                                            bool GLF_live8c1 = _GLF_FUZZED(false);
                                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                _GLF_color = GLF_live9_GLF_color;
                                            }
                                            bool GLF_live8c2 = _GLF_FUZZED((true != false));
                                            bool GLF_live8c3 = _GLF_FUZZED(true);
                                            bool GLF_live8c4 = _GLF_FUZZED(true);
                                            vec3 GLF_live8col = _GLF_FUZZED(vec3(-7.9, 22.24, 44.60));
                                            vec2 GLF_live8uv = _GLF_FUZZED(((vec4(6269.8119, 7854.4782, 5.7, -8.8) - (-9008.1932)) * (mat2x4(-630.902, 6875.0369, -5786.2734, 5.5, 0.9, -0.3, 5.1, -7.3) - mat2x4(4.5, -7.1, -81.92, -5.3, 2150.2489, 52.45, -3.2, 4257.8549))));
                                            if (!GLF_live8c1 && !GLF_live8c2 && !GLF_live8c3 && GLF_live8c4) {
                                                float GLF_live8stripe = GLF_live8compute_stripe(tan((GLF_live8uv.x + GLF_live8uv.y) * 20.0));
                                                do {
                                                    GLF_live8col = mix(vec3(GLF_live8uv.x, .8, 0), vec3(1, GLF_live8uv.y, 0), GLF_live8stripe);
                                                } while (_GLF_WRAPPED_LOOP(false));
                                                GLF_live8_GLF_color = vec4(GLF_live8col, 1.0);
                                                if (_GLF_DEAD(false)) {
                                                    _GLF_color = min(log2(_GLF_color), GLF_live4_GLF_color);
                                                }
                                                ;
                                            }
                                        }
                                        GLF_live5A = (((GLF_live5h1) * (GLF_live5k0)) - ((GLF_live5h0) * (GLF_live5k1))) / ((pow((GLF_live5h0), 2.0) * (GLF_live5h1)) - (pow((GLF_live5h1), 2.0) * (GLF_live5h0)));
                                        if (_GLF_DEAD(false)) {
                                            _GLF_color = log2(GLF_live8_GLF_color);
                                        }
                                        GLF_live5B = (((GLF_live5k0) - (GLF_live5A * (pow((GLF_live5h0), 2.0)))) / (GLF_live5h0));
                                        if (_GLF_DEAD(false)) {
                                            _GLF_color = GLF_live10gl_FragCoord;
                                        }
                                        GLF_live5C = GLF_live5fx(GLF_live5x2);
                                        GLF_live5x2 = GLF_live5x2 - ((2.0 * GLF_live5C) / (GLF_live5B + sign(GLF_live5B) * sqrt(pow(GLF_live5B, 2.0) - (4.0 * GLF_live5A * GLF_live5C))));
                                        GLF_live5x0 = GLF_live5x1;
                                        GLF_live5x1 = GLF_live5temp;
                                    } while (_GLF_WRAPPED_LOOP(false));
                                }
                                if (_GLF_DEAD(false)) {
                                    {
                                        vec2 GLF_live11coord = _GLF_FUZZED(vec2(6.0, -1848.4794));
                                        if (_GLF_DEAD(false)) {
                                            _GLF_color = (GLF_live5_GLF_color);
                                        }
                                        float GLF_live11h = _GLF_FUZZED(vec2(0.1, -8.1).x);
                                        int GLF_live11i = _GLF_FUZZED(ivec4(58482, ivec2(-13067, -13501), 88187).y);
                                        float GLF_live11refh = _GLF_FUZZED(vec3(-2.3, 95.84, -7.0).t);
                                        float GLF_live11slope = _GLF_FUZZED(-76.17);
                                        vec2 GLF_live11uvstep = _GLF_FUZZED(vec2(-3.4, -9080.1562));
                                        {
                                            int GLF_live11looplimiter0 = 0;
                                            while (GLF_live11h < GLF_live11refh && GLF_live11i < 32) {
                                                if (GLF_live11looplimiter0 >= 5) {
                                                    break;
                                                }
                                                GLF_live11looplimiter0++;
                                                {
                                                    GLF_live11coord -= GLF_live11uvstep;
                                                    GLF_live11refh += GLF_live11slope;
                                                    GLF_live11h = texture(GLF_live11tex, GLF_live11coord).y;
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                        _GLF_color = _GLF_color;
                                                    }
                                                    GLF_live11i++;
                                                }
                                            }
                                        }
                                    }
                                    break;
                                }
                                {
                                    int GLF_live10i = _GLF_FUZZED(ivec4(6724).a);
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = reflect(GLF_live8_GLF_color, _GLF_color);
                                    }
                                    int GLF_live10looplimiter5 = 0;
                                    {
                                        if (GLF_live10looplimiter5 >= 6) {
                                            ;
                                        }
                                        GLF_live10looplimiter5++;
                                        {
                                            switch (GLF_live10i) {
                                                case 0:
                                                    GLF_live10data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10i, 10)] = 4;
                                                    break;
                                                case 1:
                                                    GLF_live10data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10i, 10)] = 3;
                                                    break;
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < sqrt(0.0))))) {
                                                        _GLF_color = (atan(vec3(813.960, -54.30, 861.328)) * mat4x3(0.1, 6550.5654, -3016.5324, -9028.6964, 6532.8439, 79.56, 284.190, -20.56, -88.89, -9.6, 309.376, 236.233));
                                                    }
                                                case 2:
                                                    GLF_live10data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10i, 10)] = 2;
                                                    break;
                                                case 3:
                                                    GLF_live10data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10i, 10)] = 1;
                                                    break;
                                                case 4:
                                                    GLF_live10data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10i, 10)] = 0;
                                                    break;
                                                case 5:
                                                    GLF_live10data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10i, 10)] = -1;
                                                    break;
                                                case 6:
                                                    GLF_live10data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10i, 10)] = -2;
                                                    break;
                                                case 7:
                                                    if (_GLF_WRAPPED_IF_FALSE(false)) {
                                                    } else {
                                                        GLF_live10data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10i, 10)] = -3;
                                                    }
                                                    break;
                                                case 8:
                                                    GLF_live10data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10i, 10)] = -4;
                                                    break;
                                                case 9:
                                                    GLF_live10data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10i, 10)] = -5;
                                                    break;
                                                    if (_GLF_DEAD(_GLF_IDENTITY(false, bool(bvec2(false, false))))) {
                                                        _GLF_color = GLF_live5_GLF_color;
                                                    }
                                            }
                                            GLF_live10i++;
                                        }
                                    }
                                }
                            }
                        }
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        _GLF_color = (GLF_live5_GLF_color - vec4(-747.331, -4.4, 8.2, -643.956));
                    }
                    break;
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        do {
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                } else {
                                    _GLF_color = acosh(log2(vec4(4.1, 4.6, 9558.6640, -8.8)));
                                }
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = sinh(GLF_live3_GLF_color);
                                }
                            } else {
                            }
                        } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            break;
                        }
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        if (_GLF_DEAD(false)) {
                            _GLF_color = GLF_live5_GLF_color;
                        }
                        continue;
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        if (_GLF_DEAD(false)) {
                            _GLF_color = _GLF_color;
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                            discard;
                        }
                        {
                            vec2 GLF_live7pos = _GLF_FUZZED(vec2(-9.6, 772.659));
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                break;
                            }
                            vec4 GLF_live7quad = _GLF_FUZZED(vec4(-0.5, -2.7, -9364.6447, -917.821));
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    if (GLF_live7pos.x > GLF_live7quad.x + GLF_live7quad.z) {
                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                            ;
                                        } else {
                                        }
                                    }
                                } else {
                                }
                            } else {
                            }
                            if (_GLF_DEAD(false)) {
                                _GLF_color = mat2x4(76.03, 97.11, -24.00, -1.9, 4211.2644, 79.99, -198.826, 8.5)[0];
                            }
                        }
                        _GLF_color = fract(GLF_live3_GLF_color);
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        if (_GLF_DEAD(false)) {
                            _GLF_color = _GLF_color;
                        }
                        return;
                    }
                    {
                        {
                            ;
                        }
                    }
                case 6:
                    data[i] = -2;
                    break;
                    for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                        if (_GLF_DEAD(false)) {
                            _GLF_color = _GLF_color;
                        }
                    }
                case 7:
                    data[i] = -3;
                    break;
                case 8:
                    data[i] = -4;
                    break;
                case 9:
                    data[i] = -5;
                    break;
            }
            i++;
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                _GLF_color = vec4(5.2, -0.2, -398.485, 3.4);
                {
                    vec2 GLF_live4coord = _GLF_FUZZED(vec2(-860.388, -6562.9935));
                    if (GLF_live4coord.y < 0.6) {
                        uvec2 GLF_live4icoord = uvec2(((GLF_live4coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                        uint GLF_live4res1 = uint(((GLF_live4icoord.x * GLF_live4icoord.y) >> (GLF_live4icoord.x & 31u)) & 0xffffffffu);
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            break;
                        }
                        uint GLF_live4res2 = uint(((GLF_live4icoord.x * GLF_live4icoord.y) << (GLF_live4icoord.x & 31u)) & 0xffffffffu);
                        float GLF_live4res = float(((GLF_live4res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_live4res1 & 1u) != 0u ? 1u : 0u));
                        GLF_live4_GLF_color = vec4(GLF_live4res, GLF_live4res, GLF_live4res, 1.0);
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                            break;
                            if (_GLF_DEAD(false)) {
                                _GLF_color = GLF_live3_GLF_color;
                            }
                        }
                    } else {
                        ivec2 GLF_live4icoord = ivec2(((GLF_live4coord - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                        int GLF_live4res3 = ((GLF_live4icoord.x >> 5) & 1) ^ ((GLF_live4icoord.y & 32) >> 5);
                        int GLF_live4res2 = (GLF_live4icoord.y * GLF_live4icoord.y >> 10) & 1;
                        int GLF_live4res1 = (GLF_live4icoord.x * GLF_live4icoord.y >> 9) & 1;
                        GLF_live4_GLF_color = vec4(float(GLF_live4res1 ^ GLF_live4res2), float(GLF_live4res2 & GLF_live4res3), float(GLF_live4res1 | GLF_live4res3), 1.0);
                    }
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    _GLF_color = (vec4(9.9, -8.7, -863.842, 759.208) * 16.60);
                }
                {
                    {
                        vec2 GLF_live4coord = _GLF_FUZZED((false ? vec2(30.62, -9.7) : vec2(2.1, -6618.2520)));
                        {
                            vec2 GLF_live11coord = _GLF_FUZZED((vec2(8363.6766, 3367.3575) * vec2(-54.05, -61.11)));
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                _GLF_color = GLF_live4_GLF_color;
                            }
                            float GLF_live11h = _GLF_FUZZED((-5190.8024));
                            int GLF_live11i = _GLF_FUZZED(77321);
                            int GLF_live11looplimiter0 = 0;
                            float GLF_live11refh = _GLF_FUZZED((+float(65149)));
                            if (_GLF_DEAD(false)) {
                                _GLF_color = _GLF_color;
                            }
                            float GLF_live11slope = _GLF_FUZZED(87.90);
                            vec2 GLF_live11uvstep = _GLF_FUZZED(vec2(-9.6, -7237.3062));
                            {
                                if (GLF_live11looplimiter0 >= 5) {
                                    ;
                                }
                                GLF_live11looplimiter0++;
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    GLF_live11coord -= GLF_live11uvstep;
                                    do {
                                        GLF_live11refh += GLF_live11slope;
                                        if (_GLF_DEAD(false)) {
                                            _GLF_color = clamp(degrees(vec4(87.46, 8.3, 835.865, -0.4)), GLF_live11slope, atan(GLF_live11refh));
                                        }
                                    } while (_GLF_WRAPPED_LOOP(false));
                                    GLF_live11h = texture(GLF_live11tex, GLF_live11coord).y;
                                    GLF_live11i++;
                                } else {
                                }
                            }
                        }
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            if (GLF_live4coord.x > 0.4) {
                                {
                                    int GLF_live10i = _GLF_FUZZED(-64910);
                                    int GLF_live10k = _GLF_FUZZED(78124);
                                    int GLF_live10looplimiter1 = 0;
                                    int GLF_live10mid = _GLF_FUZZED(-32442);
                                    while (GLF_live10i < GLF_live10N && GLF_live10i <= GLF_live10mid) {
                                        if (GLF_live10looplimiter1 >= 6) {
                                            break;
                                        }
                                        GLF_live10looplimiter1++;
                                        {
                                            for (int _injected_loop_counter = _GLF_IDENTITY((1 & 1), clamp((1 & 1), _GLF_IDENTITY((1 & 1), ((1 & 1)) ^ 0), (1 & 1))); _GLF_WRAPPED_LOOP(_injected_loop_counter != _GLF_IDENTITY(0, (true ? _GLF_IDENTITY(0, (0) >> 0) : _GLF_FUZZED(N)))); _injected_loop_counter--) {
                                                GLF_live10temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10k++, 10)] = GLF_live10data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live10i++, 10)];
                                            }
                                        }
                                    }
                                }
                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                    if (GLF_live4coord.y < 0.6) {
                                        uvec2 GLF_live4icoord = uvec2(((GLF_live4coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                                        uint GLF_live4res1 = uint(((GLF_live4icoord.x * GLF_live4icoord.y) >> (GLF_live4icoord.x & 31u)) & 0xffffffffu);
                                        uint GLF_live4res2 = uint(((GLF_live4icoord.x * GLF_live4icoord.y) << (GLF_live4icoord.x & 31u)) & 0xffffffffu);
                                        float GLF_live4res = float(((GLF_live4res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_live4res1 & 1u) != 0u ? 1u : 0u));
                                        GLF_live4_GLF_color = vec4(GLF_live4res, GLF_live4res, GLF_live4res, 1.0);
                                    } else {
                                        ivec2 GLF_live4icoord = ivec2(((GLF_live4coord - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                                        int GLF_live4res3 = ((GLF_live4icoord.x >> 5) & 1) ^ ((GLF_live4icoord.y & 32) >> 5);
                                        int GLF_live4res2 = (GLF_live4icoord.y * GLF_live4icoord.y >> 10) & 1;
                                        int GLF_live4res1 = (GLF_live4icoord.x * GLF_live4icoord.y >> 9) & 1;
                                        GLF_live4_GLF_color = vec4(float(GLF_live4res1 ^ GLF_live4res2), float(GLF_live4res2 & GLF_live4res3), float(GLF_live4res1 | GLF_live4res3), 1.0);
                                    }
                                } else {
                                }
                            } else {
                                ivec2 GLF_live4icoord = ivec2(((GLF_live4coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.6, 1.0)) * 256.0);
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = GLF_live5_GLF_color;
                                }
                                int GLF_live4v = (GLF_live4icoord.x ^ GLF_live4icoord.y) * GLF_live4icoord.y;
                                bool GLF_live4res1 = ((GLF_live4v >> 10) & 1) != 0;
                                bool GLF_live4res2 = ((GLF_live4v >> 11) & 4) != 0;
                                bool GLF_live4res3 = ((GLF_live4v >> 12) & 8) != 0;
                                GLF_live4_GLF_color = vec4(GLF_live4res1 ? 1.0 : 0.0, GLF_live4res2 ? 1.0 : 0.0, GLF_live4res3 ? 1.0 : 0.0, 1);
                            }
                        } else {
                        }
                    }
                    int GLF_live2baseIndex = _GLF_FUZZED(46220);
                    int GLF_live2data = _GLF_FUZZED(int(134683u));
                    if (_GLF_DEAD(false)) {
                        return;
                    }
                    int GLF_live2treeIndex = _GLF_FUZZED(705);
                    if (_GLF_DEAD(false)) {
                        _GLF_color = GLF_live9_GLF_color;
                    }
                    if (_GLF_DEAD(false)) {
                        break;
                    }
                    {
                        do {
                            {
                                GLF_live5_GLF_color = vec4(0.0, 1.0, 0.0, 1.0);
                                {
                                    bool GLF_live9canwalk = _GLF_FUZZED(true);
                                    int GLF_live9i = _GLF_FUZZED(547);
                                    int GLF_live9j = _GLF_FUZZED(ivec2(ivec4(-8056, -94058, -170, -54714)).t);
                                    int GLF_live9looplimiter1 = 0;
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = max((1.8 - GLF_live8_GLF_color), (_GLF_color));
                                    }
                                    ivec2 GLF_live9p = _GLF_FUZZED(ivec2(-91137, 86464));
                                    if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                            _GLF_color = asinh(GLF_live10gl_FragCoord);
                                        }
                                    } else {
                                        if (GLF_live9looplimiter1 >= 4) {
                                            ;
                                        }
                                        GLF_live9looplimiter1++;
                                        {
                                            if (_GLF_DEAD(false)) {
                                                _GLF_color = GLF_live4_GLF_color.wwxz;
                                            }
                                            if (GLF_live9map[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9j * 2 + GLF_live9i * 2 * 16, 256)] == 0) {
                                                GLF_live9p.x = GLF_live9j * 2;
                                                GLF_live9p.y = GLF_live9i * 2;
                                                GLF_live9canwalk = true;
                                            }
                                        }
                                    }
                                }
                            }
                        } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
                        GLF_live2tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live2baseIndex, 10)].rightIndex = GLF_live2treeIndex;
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            GLF_live2makeTreeNode(GLF_live2tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_live2treeIndex, 10)], GLF_live2data);
                            if (_GLF_DEAD(false)) {
                                break;
                            }
                        } else {
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = ((-0.1) - faceforward(GLF_live8_GLF_color, GLF_live8_GLF_color, GLF_live4_GLF_color));
                                }
                                {
                                    vec3 GLF_live8col = _GLF_FUZZED((mat3(mat3x2(-283.909, -3921.5269, -1.8, -7.6, 9673.0995, 2075.3218)) * vec3(4.3, 1874.6350, -16.46)));
                                    vec2 GLF_live8uv = _GLF_FUZZED(vec2(-2.1, 9.6));
                                    {
                                        float GLF_live8stripe = GLF_live8compute_stripe(cos((GLF_live8uv.x + GLF_live8uv.y) * 20.0));
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            GLF_live8col = mix(vec3(.7, sinh(GLF_live8uv.x), GLF_live8uv.x), vec3(.3, .5, GLF_live8uv.x), GLF_live8stripe);
                                        } else {
                                        }
                                        GLF_live8_GLF_color = vec4(GLF_live8col, 1.0);
                                        ;
                                    }
                                }
                                _GLF_color = _GLF_color;
                            }
                        }
                        do {
                            if (_GLF_DEAD(false)) {
                                return;
                            }
                            ;
                        } while (_GLF_WRAPPED_LOOP(false));
                    }
                }
            }
            {
                int GLF_live11looplimiter0 = 0;
                if (GLF_live11looplimiter0 >= 5) {
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                        ;
                    } else {
                    }
                }
            }
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                vec2 GLF_live3coord = _GLF_FUZZED(vec2(25.30, 1.5));
                if (_GLF_DEAD(false)) {
                    if (_GLF_DEAD(false)) {
                        if (_GLF_DEAD(false)) {
                            _GLF_color = GLF_live4_GLF_color;
                        }
                        return;
                    }
                    discard;
                }
                if (GLF_live3coord.y < 0.6) {
                    uvec2 GLF_live3icoord = uvec2(((GLF_live3coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                    uint GLF_live3res1 = uint(((GLF_live3icoord.x * GLF_live3icoord.y) >> (GLF_live3icoord.x & 31u)) & 0xffffffffu);
                    uint GLF_live3res2 = uint(((GLF_live3icoord.x * GLF_live3icoord.y) << (GLF_live3icoord.x & 31u)) & 0xffffffffu);
                    float GLF_live3res = float(((GLF_live3res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_live3res1 & 1u) != 0u ? 1u : 0u));
                    GLF_live3_GLF_color = vec4(GLF_live3res, GLF_live3res, GLF_live3res, 1.0);
                } else {
                    if (_GLF_DEAD(false)) {
                        if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        } else {
                            _GLF_color = GLF_live3_GLF_color;
                        }
                    }
                    ivec2 GLF_live3icoord = ivec2(((GLF_live3coord - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                    int GLF_live3res3 = ((GLF_live3icoord.x >> 5) & 1) ^ ((GLF_live3icoord.y & 32) >> 5);
                    if (_GLF_DEAD(false)) {
                        _GLF_color = GLF_live5_GLF_color;
                    }
                    {
                        {
                            ;
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        _GLF_color = (((-2533.4790) + GLF_live9_GLF_color) / GLF_live5_GLF_color);
                    }
                    int GLF_live3res2 = (GLF_live3icoord.y * GLF_live3icoord.y >> 10) & 1;
                    for (int _injected_loop_counter = _GLF_IDENTITY(1, (1) | (1)); _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                        vec2 GLF_live4coord = _GLF_FUZZED(vec2(19.27, 6.2));
                        {
                            ivec2 GLF_live4icoord = ivec2(((GLF_live4coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.6, 1.0)) * 256.0);
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                _GLF_color = GLF_live5_GLF_color;
                            }
                            int GLF_live4v = (GLF_live4icoord.x ^ GLF_live4icoord.y) * GLF_live4icoord.y;
                            bool GLF_live4res1 = ((GLF_live4v >> 10) & 1) != 0;
                            bool GLF_live4res2 = ((GLF_live4v >> 11) & 4) != 0;
                            bool GLF_live4res3 = ((GLF_live4v >> 12) & 8) != 0;
                            GLF_live4_GLF_color = vec4(GLF_live4res1 ? 1.0 : 0.0, GLF_live4res2 ? 1.0 : 0.0, GLF_live4res3 ? 1.0 : 0.0, 1);
                        }
                        {
                            vec2 GLF_live11coord = _GLF_FUZZED((vec3(5.6, -531.586, 7.2) * mat2x3(465.360, 337.850, 6.4, 137.238, 42.88, 50.67)));
                            float GLF_live11h = _GLF_FUZZED((-vec2(2.1, 6446.1284).r));
                            int GLF_live11i = _GLF_FUZZED(-45084);
                            float GLF_live11refh = _GLF_FUZZED(87.08);
                            float GLF_live11slope = _GLF_FUZZED(-6342.4330);
                            vec2 GLF_live11uvstep = _GLF_FUZZED((vec2(-350.601, 4.8)));
                            for (int _injected_loop_counter = (0 ^ 1); _GLF_WRAPPED_LOOP(_injected_loop_counter != int(_GLF_ZERO(0.0, injectionSwitch.x))); _injected_loop_counter--) {
                                int GLF_live11looplimiter0 = 0;
                                while (GLF_live11h < GLF_live11refh && GLF_live11i < 32) {
                                    if (GLF_live11looplimiter0 >= 5) {
                                        break;
                                    }
                                    GLF_live11looplimiter0++;
                                    {
                                        GLF_live11coord -= GLF_live11uvstep;
                                        GLF_live11refh += GLF_live11slope;
                                        GLF_live11h = texture(GLF_live11tex, GLF_live11coord).y;
                                        GLF_live11i++;
                                    }
                                }
                            }
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        _GLF_color = GLF_live9_GLF_color;
                    }
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        if (_GLF_DEAD(_GLF_IDENTITY(false, bool(bvec3(false, false, true))))) {
                            _GLF_color = _GLF_color;
                            if (_GLF_DEAD(false)) {
                                break;
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = GLF_live10gl_FragCoord;
                                }
                            }
                        }
                    } else {
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        _GLF_color = GLF_live10gl_FragCoord;
                    }
                    int GLF_live3res1 = (GLF_live3icoord.x * GLF_live3icoord.y >> 9) & 1;
                    {
                        {
                            ;
                        }
                    }
                    GLF_live3_GLF_color = vec4(float(GLF_live3res1 ^ GLF_live3res2), float(GLF_live3res2 & GLF_live3res3), float(GLF_live3res1 | GLF_live3res3), 1.0);
                    {
                        int GLF_live11looplimiter0 = 0;
                        if (GLF_live11looplimiter0 >= 5) {
                            ;
                        }
                    }
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_ZERO(0.0, injectionSwitch.x))))) {
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        _GLF_color = GLF_live3_GLF_color;
                    }
                    return;
                }
            } else {
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    _GLF_color = GLF_live3_GLF_color;
                }
            }
            {
                if (_GLF_DEAD(false)) {
                    _GLF_color = sign(GLF_live9_GLF_color);
                }
                bool GLF_live8c1 = _GLF_FUZZED(true);
                if (_GLF_DEAD(false)) {
                    _GLF_color = GLF_live8_GLF_color;
                }
                bool GLF_live8c2 = _GLF_FUZZED(false);
                bool GLF_live8c3 = _GLF_FUZZED(false);
                bool GLF_live8c4 = _GLF_FUZZED(false);
                vec3 GLF_live8col = _GLF_FUZZED((vec3(7.9, -9025.9391, -5.8) - (vec4(2676.2261, -21.39, -803.247, -6099.2159) * mat3x4(60.21, -802.037, 1.1, -9.1, 295.878, -6.8, -6.2, 5300.7136, -898.946, 786.968, -7.8, 2.1))));
                vec2 GLF_live8uv = _GLF_FUZZED(vec2(-0.6, -177.639));
                if (!GLF_live8c1 && !GLF_live8c2 && !GLF_live8c3 && GLF_live8c4) {
                    float GLF_live8stripe = GLF_live8compute_stripe(tan((GLF_live8uv.x + GLF_live8uv.y) * 20.0));
                    GLF_live8col = mix(vec3(GLF_live8uv.x, .8, 0), vec3(1, GLF_live8uv.y, 0), GLF_live8stripe);
                    GLF_live8_GLF_color = vec4(GLF_live8col, 1.0);
                    ;
                }
            }
        } while (i < 10);
    }
    for (int j = 0; j < 10; j++) {
        if (_GLF_DEAD(false)) {
            if (_GLF_DEAD(false)) {
                _GLF_color = mix(vec4(-7.3, injectionSwitch, 746.128), cos(GLF_live10gl_FragCoord), GLF_live8_GLF_color);
            }
            discard;
        }
        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
            temp[j] = data[j];
        } else {
        }
        if (_GLF_DEAD(false)) {
            discard;
        }
    }
    mergeSort();
    if (_GLF_DEAD(false)) {
        _GLF_color = GLF_live3_GLF_color;
    }
    {
        vec2 GLF_live11coord = _GLF_FUZZED(vec2(-4431.3348, -4524.8027));
        if (_GLF_DEAD(false)) {
            _GLF_color = mat4(mat4x2(-4.7, -7.6, 421.887, -8.9, -9486.1214, -2.4, 4.0, 8.1))[0];
        }
        float GLF_live11h = _GLF_FUZZED(6.5);
        int GLF_live11i = _GLF_FUZZED((~74553));
        float GLF_live11refh = _GLF_FUZZED(68.74);
        float GLF_live11slope = _GLF_FUZZED((true ? (-4.4) : vec4(-422.174, 282.696, -46.82, 11.39).p));
        vec2 GLF_live11uvstep = _GLF_FUZZED((mat2(-962.977, -8.4, -4.9, 553.777) * vec2(6796.4485, 52.54)));
        {
            for (int _injected_loop_counter = (0 >> _GLF_IDENTITY(int(4), int(4))); _GLF_WRAPPED_LOOP(_injected_loop_counter < int(_GLF_ONE(1.0, injectionSwitch.y))); _injected_loop_counter++) {
                GLF_live11coord -= GLF_live11uvstep;
            }
            GLF_live11refh += GLF_live11slope;
            GLF_live11h = texture(GLF_live11tex, GLF_live11coord).y;
            GLF_live11i++;
        }
    }
    mat3 pos = mat3(vec3(4, 0, int(injectionSwitch.y)) * ldexp(0.5, 2), vec3(0, -5, int(injectionSwitch.y)) * ldexp(0.2, 5), vec3(1, 8, int(injectionSwitch.y)) * ldexp(injectionSwitch.y, 0));
    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
        _GLF_color = vec4(12.40, -5.7, 6.9, 9685.1583);
    }
    if (_GLF_DEAD(false)) {
        if (_GLF_DEAD(false)) {
            return;
        }
        return;
    }
    vec3 vecCoor = roundEven(pos * vec3(gl_FragCoord.xx / resolution.yx, 1));
    if (_GLF_WRAPPED_IF_FALSE(false)) {
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            _GLF_color = GLF_live9_GLF_color;
        }
    } else {
        {
            ;
        }
    }
    vec2 color;
    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            do {
                if (_GLF_DEAD(false)) {
                    _GLF_color = GLF_live3_GLF_color;
                }
                if (int(gl_FragCoord[1]) < 30) {
                    color = fract(sin(vecCoor.yx - trunc(float(data[0]))));
                    if (_GLF_DEAD(false)) {
                        _GLF_color = atanh(GLF_live10gl_FragCoord);
                    }
                    color[0] = dFdy(gl_FragCoord.y);
                    if (_GLF_DEAD(false)) {
                        _GLF_color = _GLF_color;
                        if (_GLF_DEAD(false)) {
                            break;
                        }
                    }
                    break;
                } else {
                    for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != _GLF_IDENTITY(1, (1) | (1))); _injected_loop_counter++) {
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            {
                                {
                                    ;
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = _GLF_color;
                                    }
                                }
                            }
                            _GLF_color = _GLF_color;
                        }
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < sin(0.0))))) {
                        {
                            {
                                ;
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    _GLF_color = GLF_live10gl_FragCoord;
                                }
                            }
                        }
                        break;
                    }
                    if (int(gl_FragCoord[1]) < 60) {
                        color = fract(sin(vecCoor.yx - trunc(float(data[1]))));
                        if (_GLF_DEAD(false)) {
                            _GLF_color = (GLF_live3_GLF_color - vec3(1.3, -4038.2764, -0.8).s);
                        }
                        {
                            vec2 GLF_live4coord = _GLF_FUZZED(vec2(-74.48, 433.343));
                            {
                                uvec2 GLF_live4icoord = uvec2(((GLF_live4coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                                uint GLF_live4res1 = uint(((GLF_live4icoord.x * GLF_live4icoord.y) >> (GLF_live4icoord.x & 31u)) & 0xffffffffu);
                                uint GLF_live4res2 = uint(((GLF_live4icoord.x * GLF_live4icoord.y) << (GLF_live4icoord.x & 31u)) & 0xffffffffu);
                                float GLF_live4res = float(((GLF_live4res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_live4res1 & 1u) != 0u ? 1u : 0u));
                                GLF_live4_GLF_color = vec4(GLF_live4res, GLF_live4res, GLF_live4res, 1.0);
                            }
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < abs(0.0))))) {
                                _GLF_color = vec4(-437.807, 4686.7557, -1493.3550, 861.141);
                            }
                            if (_GLF_DEAD(false)) {
                                _GLF_color = atan(GLF_live4_GLF_color);
                            }
                            _GLF_color = _GLF_color;
                        }
                        for (int _injected_loop_counter = _GLF_IDENTITY(int(_GLF_ZERO(0.0, injectionSwitch.x)), 0 + (int(_GLF_ZERO(0.0, injectionSwitch.x)))); _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
                            color[1] *= atan(faceforward(injectionSwitch, color.xx, vecCoor.yx).y);
                        }
                        break;
                    } else {
                        {
                            {
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < log(1.0))))) {
                                    _GLF_color = GLF_live10gl_FragCoord;
                                }
                                GLF_live5_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
                            }
                        }
                        if (int(gl_FragCoord[1]) < 90) {
                            do {
                                color = fract(sin(vecCoor.yx - trunc(float(data[2]))));
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = dFdyCoarse(GLF_live3_GLF_color);
                                }
                            } while (_GLF_WRAPPED_LOOP(false));
                            color.x += atanh(color.x) * cosh(injectionSwitch.y) * smoothstep(color, injectionSwitch, gl_FragCoord.yy).x;
                            break;
                        } else if (int(gl_FragCoord[1]) < 120) {
                            do {
                                color = fract(acosh(clamp(vecCoor.yx - trunc(float(data[3])), 1.0, 1000.0)));
                            } while (_GLF_WRAPPED_LOOP(false));
                            color.x += (isnan(gl_FragCoord.x) ? log2(gl_FragCoord.x) : log2(gl_FragCoord.y));
                            break;
                        } else if (int(gl_FragCoord[1]) < 150) {
                            {
                                bool GLF_live1canwalk = _GLF_FUZZED((mat3(-192.067, -814.907, 882.180, -880.467, -6.8, 5.2, 105.309, -1.6, 84.98) == mat3(5.9, 9.2, -6028.2109, -5.8, -6773.9657, -366.652, -0.9, -7624.2079, -2307.9396)));
                                int GLF_live1i = _GLF_FUZZED(85192);
                                int GLF_live1j = _GLF_FUZZED((-25104));
                                int GLF_live1looplimiter2 = 0;
                                do {
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                        _GLF_color = atan(GLF_live3_GLF_color, vec4(vec2(-739.340, -7.8), vec2(-4.2, 7.9)));
                                    }
                                } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))));
                                ivec2 GLF_live1p = _GLF_FUZZED((ivec2(85893, -91775) - ivec2(12225, 18372)));
                                {
                                    if (GLF_live1looplimiter2 >= 5) {
                                        ;
                                        if (_GLF_DEAD(false)) {
                                            _GLF_color = GLF_live9_GLF_color;
                                        }
                                    }
                                    GLF_live1looplimiter2++;
                                    {
                                        {
                                            if (_GLF_DEAD(false)) {
                                                _GLF_color = GLF_live5_GLF_color;
                                            }
                                            int GLF_live1looplimiter1 = 0;
                                            {
                                                int GLF_live5looplimiter0 = 0;
                                                if (GLF_live5looplimiter0 >= 5) {
                                                    ;
                                                }
                                            }
                                            for (GLF_live1j = 0; GLF_live1j < 8; GLF_live1j++) {
                                                if (GLF_live1looplimiter1 >= 5) {
                                                    break;
                                                }
                                                GLF_live1looplimiter1++;
                                                do {
                                                    if (GLF_live1map[_GLF_MAKE_IN_BOUNDS_INT(GLF_live1j * 2 + GLF_live1i * 2 * 16, 256)] == 0) {
                                                        GLF_live1p.x = GLF_live1j * 2;
                                                        GLF_live1p.y = GLF_live1i * 2;
                                                        if (_GLF_DEAD(false)) {
                                                            _GLF_color = GLF_live4_GLF_color;
                                                        }
                                                        GLF_live1canwalk = true;
                                                    }
                                                    {
                                                        vec3 GLF_live8col = _GLF_FUZZED((vec3(-9.2, 0.0, float(135431u)) + (-4830.5731)));
                                                        vec2 GLF_live8uv = _GLF_FUZZED(vec2(2200.5963, 29.05));
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                            _GLF_color = vec4(183.780, -221.475, 6.3, 8.2);
                                                        }
                                                        {
                                                            float GLF_live8stripe = GLF_live8compute_stripe(cos((GLF_live8uv.x + GLF_live8uv.y) * 20.0));
                                                            GLF_live8col = mix(vec3(GLF_live8uv.x, 0, 0.75), vec3(.8, .7, GLF_live8uv.x), GLF_live8stripe);
                                                            GLF_live8_GLF_color = vec4(GLF_live8col, 1.0);
                                                            ;
                                                        }
                                                    }
                                                } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))));
                                                {
                                                    bool GLF_live9canwalk = _GLF_FUZZED((89639 <= 79862));
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                        _GLF_color = GLF_live4_GLF_color;
                                                    }
                                                    int GLF_live9i = _GLF_FUZZED(ivec3(80977, -54565, 60225).t);
                                                    ivec2 GLF_live9ipos = _GLF_FUZZED(ivec2(-97860, 37666));
                                                    int GLF_live9looplimiter3 = 0;
                                                    ivec2 GLF_live9p = _GLF_FUZZED(ivec2(ivec3(74326, 45207, -8341)));
                                                    int GLF_live9v = _GLF_FUZZED(98774);
                                                    {
                                                        if (GLF_live9looplimiter3 >= 4) {
                                                            ;
                                                        }
                                                        GLF_live9looplimiter3++;
                                                        {
                                                            GLF_live9v++;
                                                            int GLF_live9directions = 0;
                                                            if (GLF_live9p.x > 0 && GLF_live9map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live9p.x - 2) + (GLF_live9p.y) * 16, 256)] == 0) {
                                                                GLF_live9directions += 1;
                                                            }
                                                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                                _GLF_color = atanh(vec4(3814.6660, 5.4, -5.1, -5828.7341));
                                                            }
                                                            if (GLF_live9p.y > 0 && GLF_live9map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live9p.x) + (GLF_live9p.y - 2) * 16, 256)] == 0) {
                                                                GLF_live9directions += 1;
                                                            }
                                                            if (GLF_live9p.x < 14 && GLF_live9map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live9p.x + 2) + (GLF_live9p.y) * 16, 256)] == 0) {
                                                                GLF_live9directions += 1;
                                                            }
                                                            if (GLF_live9p.y < 14 && GLF_live9map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live9p.x) + (GLF_live9p.y + 2) * 16, 256)] == 0) {
                                                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                                    _GLF_color = GLF_live8_GLF_color;
                                                                }
                                                                GLF_live9directions += 1;
                                                            }
                                                            if (GLF_live9directions == 0) {
                                                                GLF_live9canwalk = false;
                                                                int GLF_live9j = _GLF_FUZZED(-57910);
                                                                {
                                                                    int GLF_live9looplimiter2 = 0;
                                                                    for (GLF_live9i = 0; GLF_live9i < 8; GLF_live9i++) {
                                                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                                            _GLF_color = GLF_live3_GLF_color;
                                                                        }
                                                                        if (GLF_live9looplimiter2 >= 4) {
                                                                            if (_GLF_DEAD(false)) {
                                                                                _GLF_color = GLF_live5_GLF_color;
                                                                            }
                                                                            break;
                                                                        }
                                                                        GLF_live9looplimiter2++;
                                                                        {
                                                                            {
                                                                                int GLF_live9looplimiter1 = 0;
                                                                                for (GLF_live9j = 0; GLF_live9j < 8; GLF_live9j++) {
                                                                                    if (GLF_live9looplimiter1 >= 4) {
                                                                                        break;
                                                                                    }
                                                                                    GLF_live9looplimiter1++;
                                                                                    {
                                                                                        if (GLF_live9map[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9j * 2 + GLF_live9i * 2 * 16, 256)] == 0) {
                                                                                            GLF_live9p.x = GLF_live9j * 2;
                                                                                            GLF_live9p.y = GLF_live9i * 2;
                                                                                            GLF_live9canwalk = true;
                                                                                        }
                                                                                        if (_GLF_DEAD(false)) {
                                                                                            _GLF_color = GLF_live5_GLF_color;
                                                                                        }
                                                                                    }
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                                GLF_live9map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live9p.x) + (GLF_live9p.y) * 16, 256)] = 1;
                                                            } else {
                                                                int GLF_live9d = GLF_live9v % GLF_live9directions;
                                                                GLF_live9v += GLF_live9directions;
                                                                if (GLF_live9d >= 0 && GLF_live9p.x > 0 && GLF_live9map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live9p.x - 2) + (GLF_live9p.y) * 16, 256)] == 0) {
                                                                    if (_GLF_DEAD(false)) {
                                                                        _GLF_color = vec4(24.70);
                                                                    }
                                                                    GLF_live9d--;
                                                                    if (_GLF_DEAD(false)) {
                                                                        _GLF_color = GLF_live4_GLF_color;
                                                                    }
                                                                    for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
                                                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                                            _GLF_color = GLF_live3_GLF_color;
                                                                        }
                                                                        GLF_live9map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live9p.x) + (GLF_live9p.y) * 16, 256)] = 1;
                                                                    }
                                                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < determinant(mat3(0.0, 1.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0)))))) {
                                                                        _GLF_color = normalize(GLF_live10gl_FragCoord);
                                                                    }
                                                                    GLF_live9map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live9p.x - 1) + (GLF_live9p.y) * 16, 256)] = 1;
                                                                    GLF_live9map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live9p.x - 2) + (GLF_live9p.y) * 16, 256)] = 1;
                                                                    GLF_live9p.x -= 2;
                                                                }
                                                                if (GLF_live9d >= 0 && GLF_live9p.y > 0 && GLF_live9map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live9p.x) + (GLF_live9p.y - 2) * 16, 256)] == 0) {
                                                                    GLF_live9d--;
                                                                    if (_GLF_DEAD(false)) {
                                                                        _GLF_color = inversesqrt(GLF_live3_GLF_color);
                                                                    }
                                                                    GLF_live9map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live9p.x) + (GLF_live9p.y) * 16, 256)] = 1;
                                                                    GLF_live9map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live9p.x) + (GLF_live9p.y - 1) * 16, 256)] = 1;
                                                                    GLF_live9map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live9p.x) + (GLF_live9p.y - 2) * 16, 256)] = 1;
                                                                    GLF_live9p.y -= 2;
                                                                }
                                                                if (_GLF_DEAD(false)) {
                                                                    _GLF_color = mat2x3(-3977.5737, -3.9, -0.9, -5.5, 52.63, 7501.6446)[1].tssp;
                                                                }
                                                                if (GLF_live9d >= 0 && GLF_live9p.x < 14 && GLF_live9map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live9p.x + 2) + (GLF_live9p.y) * 16, 256)] == 0) {
                                                                    GLF_live9d--;
                                                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                                        _GLF_color = GLF_live4_GLF_color;
                                                                    }
                                                                    GLF_live9map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live9p.x) + (GLF_live9p.y) * 16, 256)] = 1;
                                                                    GLF_live9map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live9p.x + 1) + (GLF_live9p.y) * 16, 256)] = 1;
                                                                    GLF_live9map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live9p.x + 2) + (GLF_live9p.y) * 16, 256)] = 1;
                                                                    GLF_live9p.x += 2;
                                                                }
                                                                if (GLF_live9d >= 0 && GLF_live9p.y < 14 && GLF_live9map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live9p.x) + (GLF_live9p.y + 2) * 16, 256)] == 0) {
                                                                    GLF_live9d--;
                                                                    GLF_live9map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live9p.x) + (GLF_live9p.y) * 16, 256)] = 1;
                                                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                        GLF_live9map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live9p.x) + (GLF_live9p.y + 1) * 16, 256)] = 1;
                                                                    } else {
                                                                    }
                                                                    GLF_live9map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live9p.x) + (GLF_live9p.y + 2) * 16, 256)] = 1;
                                                                    GLF_live9p.y += 2;
                                                                }
                                                            }
                                                            if (GLF_live9map[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9ipos.y * 16 + GLF_live9ipos.x, 256)] == 1) {
                                                                GLF_live9_GLF_color = vec4(1.0, 1.0, 1.0, 1.0);
                                                                ;
                                                            }
                                                        }
                                                    }
                                                }
                                                if (_GLF_DEAD(false)) {
                                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                        _GLF_color = _GLF_color;
                                                    } else {
                                                    }
                                                }
                                            }
                                            if (_GLF_DEAD(false)) {
                                                _GLF_color = GLF_live5_GLF_color;
                                            }
                                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                do {
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                        _GLF_color = _GLF_color;
                                                    }
                                                    _GLF_color = sin(vec4(-9.2, -7026.3139, -7.1, -82.12));
                                                } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
                                            }
                                        }
                                    }
                                }
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < log(1.0))))) {
                                if (_GLF_DEAD(false)) {
                                    continue;
                                }
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = GLF_live3_GLF_color;
                                }
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = GLF_live4_GLF_color;
                                }
                                for (int _injected_loop_counter = (0 << _GLF_IDENTITY(int(1), int(1))); _GLF_WRAPPED_LOOP(_injected_loop_counter < ((0 ^ 0) ^ 1)); _injected_loop_counter++) {
                                    {
                                        bool GLF_live8c1 = _GLF_FUZZED(bool(83.77));
                                        bool GLF_live8c2 = _GLF_FUZZED(true);
                                        vec3 GLF_live8col = _GLF_FUZZED(vec3(-414.591, -60.90, 877.355));
                                        vec2 GLF_live8uv = _GLF_FUZZED(vec2(141.685, 11.07));
                                        if (!GLF_live8c1 && GLF_live8c2) {
                                            float GLF_live8stripe = GLF_live8compute_stripe(tan((GLF_live8uv.x + GLF_live8uv.y) * 20.0));
                                            if (_GLF_DEAD(false)) {
                                                _GLF_color = (round(4895.5575) / GLF_live5polynomial.brgr);
                                            }
                                            GLF_live8col = mix(vec3(0.5, GLF_live8uv.x, 0.1), vec3(.4, 0, .5), GLF_live8stripe);
                                            GLF_live8_GLF_color = vec4(GLF_live8col, 1.0);
                                            ;
                                        }
                                    }
                                    _GLF_color = vec4(8.9, -9.3, -2.8, -52.22);
                                }
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = mod(GLF_live9_GLF_color, ((-8.9) * (-93.39)));
                                    }
                                    continue;
                                }
                            }
                            discard;
                            if (_GLF_DEAD(false)) {
                                _GLF_color = (vec2(-2267.2364, 0.6) * mat4x2(-9.2, -9009.5459, -58.25, 557.177, 5.7, -8.8, -241.388, -1322.1636));
                            }
                        } else {
                            if (_GLF_DEAD(false)) {
                                if (_GLF_DEAD(_GLF_IDENTITY(false, !(!(false))))) {
                                    _GLF_color = GLF_live10gl_FragCoord;
                                }
                                return;
                            }
                            {
                                float GLF_live10grey = _GLF_FUZZED((94.77 - (-15.98)));
                                if (int(GLF_live10gl_FragCoord[1]) < 90) {
                                    GLF_live10grey = 0.5 + float(GLF_live10data[2]) / 10.0;
                                } else {
                                    if (int(GLF_live10gl_FragCoord[1]) < 120) {
                                        GLF_live10grey = 0.5 + float(GLF_live10data[3]) / 10.0;
                                    } else {
                                        if (int(GLF_live10gl_FragCoord[1]) < 150) {
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < sqrt(0.0))))) {
                                                _GLF_color = GLF_live5_GLF_color;
                                            }
                                            ;
                                        } else {
                                            if (int(GLF_live10gl_FragCoord[1]) < 180) {
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                    _GLF_color = GLF_live4_GLF_color;
                                                }
                                                GLF_live10grey = 0.5 + float(GLF_live10data[5]) / 10.0;
                                            } else {
                                                if (int(GLF_live10gl_FragCoord[1]) < 210) {
                                                    GLF_live10grey = 0.5 + float(GLF_live10data[6]) / 10.0;
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                        _GLF_color = (+dFdy(GLF_live10gl_FragCoord));
                                                    }
                                                } else {
                                                    for (int _injected_loop_counter = (1 ^ 0); _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
                                                        if (int(GLF_live10gl_FragCoord[1]) < 240) {
                                                            GLF_live10grey = 0.5 + float(GLF_live10data[7]) / 10.0;
                                                        } else {
                                                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                                _GLF_color = uintBitsToFloat(uvec4(116487u, 73314u, 146913u, 72581u));
                                                            }
                                                            if (int(GLF_live10gl_FragCoord[1]) < 270) {
                                                                GLF_live10grey = 0.5 + float(GLF_live10data[8]) / 10.0;
                                                            } else {
                                                                if (_GLF_DEAD(false)) {
                                                                    _GLF_color = GLF_live5_GLF_color;
                                                                }
                                                                for (int _injected_loop_counter = (0 >> _GLF_IDENTITY(int(5), int(5))); _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
                                                                    ;
                                                                }
                                                            }
                                                            if (_GLF_DEAD(false)) {
                                                                _GLF_color = GLF_live8_GLF_color;
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            if (int(gl_FragCoord[1]) < 180) {
                                color = fract(sin(vecCoor.yx - trunc(float(data[4]))));
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    if (_GLF_WRAPPED_IF_FALSE(false)) {
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                            _GLF_color = vec4(90.00, -484.398, -6375.1142, 2.2);
                                        }
                                    } else {
                                        if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                            if (_GLF_DEAD(_GLF_IDENTITY(false, false || (false)))) {
                                                _GLF_color = vec4(991.662, GLF_live5polynomial);
                                            }
                                        } else {
                                            _GLF_color = _GLF_color;
                                        }
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                            continue;
                                        }
                                    }
                                }
                                if (_GLF_WRAPPED_IF_FALSE(false)) {
                                } else {
                                    color[1] += asinh(gl_FragCoord.y * ldexp(color.y, -i));
                                }
                                if (_GLF_WRAPPED_IF_FALSE(false)) {
                                } else {
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                        _GLF_color = GLF_live3_GLF_color;
                                    }
                                }
                                break;
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    {
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                            _GLF_color = min(atanh(GLF_live10gl_FragCoord), GLF_live4_GLF_color);
                                        }
                                        float GLF_live10grey = _GLF_FUZZED((8600.0930));
                                        {
                                            if (int(GLF_live10gl_FragCoord[1]) < 120) {
                                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                    _GLF_color = sin(GLF_live3_GLF_color);
                                                }
                                                GLF_live10grey = 0.5 + float(GLF_live10data[3]) / 10.0;
                                            } else {
                                                if (int(GLF_live10gl_FragCoord[1]) < 150) {
                                                    ;
                                                } else {
                                                    if (int(GLF_live10gl_FragCoord[1]) < 180) {
                                                        GLF_live10grey = 0.5 + float(GLF_live10data[5]) / 10.0;
                                                    } else {
                                                        if (int(GLF_live10gl_FragCoord[1]) < 210) {
                                                            GLF_live10grey = 0.5 + float(GLF_live10data[6]) / 10.0;
                                                        } else {
                                                            if (int(GLF_live10gl_FragCoord[1]) < 240) {
                                                                GLF_live10grey = 0.5 + float(GLF_live10data[7]) / 10.0;
                                                            } else {
                                                                if (int(GLF_live10gl_FragCoord[1]) < 270) {
                                                                    GLF_live10grey = 0.5 + float(GLF_live10data[8]) / 10.0;
                                                                } else {
                                                                    ;
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    _GLF_color = (3479.0262 - sign(vec4(-94.09, 6372.9832, -33.90, -2314.9950)));
                                    {
                                        int GLF_live6looplimiter2 = 0;
                                        if (GLF_live6looplimiter2 >= 5) {
                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                ;
                                            } else {
                                            }
                                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                return;
                                                {
                                                    int GLF_live9d = _GLF_FUZZED((~(65106 ^ 33549)));
                                                    ivec2 GLF_live9p = _GLF_FUZZED((+ivec2(94538, 2867)));
                                                    do {
                                                        GLF_live9d--;
                                                        GLF_live9map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live9p.x) + (GLF_live9p.y) * 16, 256)] = 1;
                                                        if (_GLF_DEAD(false)) {
                                                            _GLF_color = vec4(-247.150, -8.4, resolution);
                                                        }
                                                        GLF_live9map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live9p.x - 1) + (GLF_live9p.y) * 16, 256)] = 1;
                                                        GLF_live9map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live9p.x - 2) + (GLF_live9p.y) * 16, 256)] = 1;
                                                        GLF_live9p.x -= 2;
                                                    } while (_GLF_WRAPPED_LOOP(false));
                                                }
                                            }
                                        }
                                    }
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                        _GLF_color = GLF_live10gl_FragCoord;
                                    }
                                }
                            } else if (int(gl_FragCoord[1]) < 210) {
                                if (_GLF_DEAD(false)) {
                                    break;
                                }
                                color = fract(sin(vecCoor.yx - trunc(float(data[5]))));
                                color.y -= tanh(color.x) / cosh(color.y);
                                break;
                            } else if (int(gl_FragCoord[1]) < 240) {
                                color = fract(asinh(vecCoor.yx - trunc(float(data[6]))));
                                color.y -= isnan(float(i)) ? tanh(gl_FragCoord.x) : atanh(gl_FragCoord.y);
                                break;
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                    _GLF_color = dFdxCoarse(GLF_live9_GLF_color);
                                }
                            } else if (int(gl_FragCoord[1]) < 270) {
                                color = fract(sin(vecCoor.yx - trunc(float(data[7]))));
                                {
                                    {
                                        ;
                                    }
                                }
                                color.y *= mix(normalize(vecCoor), normalize(vec3(color, degrees(color.x))), injectionSwitch.x).y;
                                break;
                            } else {
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = vec4(-1580.4546, 6.9, 6.9, 9.6);
                                }
                                discard;
                            }
                            for (int _injected_loop_counter = int(_GLF_ZERO(0.0, injectionSwitch.x)); _GLF_WRAPPED_LOOP(_injected_loop_counter != (int(_GLF_ONE(1.0, injectionSwitch.y)) | 1)); _injected_loop_counter++) {
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = _GLF_color;
                                }
                            }
                        }
                    }
                }
            } while (0 == int(injectionSwitch.x));
        } else {
            if (_GLF_DEAD(_GLF_IDENTITY(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)), bool(bool(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))))))) {
                {
                    {
                        vec2 GLF_live11coord = _GLF_FUZZED(vec2(8.1, -37.16));
                        float GLF_live11h = _GLF_FUZZED(((-49.81) - vec2(vec4(21.73, -30.96, -3151.8838, 469.440))).r);
                        int GLF_live11i = _GLF_FUZZED((~(-26228)));
                        int GLF_live11looplimiter0 = 0;
                        float GLF_live11refh = _GLF_FUZZED(((-7.3) + (-483.997)));
                        float GLF_live11slope = _GLF_FUZZED(7.5);
                        if (_GLF_DEAD(false)) {
                            _GLF_color = GLF_live10gl_FragCoord;
                        }
                        vec2 GLF_live11uvstep = _GLF_FUZZED(vec2(-9.1, -62.24));
                        {
                            if (GLF_live11looplimiter0 >= 5) {
                                ;
                            }
                            do {
                                GLF_live11looplimiter0++;
                            } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
                            {
                                GLF_live11coord -= GLF_live11uvstep;
                                GLF_live11refh += GLF_live11slope;
                                GLF_live11h = texture(GLF_live11tex, GLF_live11coord).y;
                                GLF_live11i++;
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                    _GLF_color = mod(GLF_live5_GLF_color, GLF_live4_GLF_color);
                                }
                            }
                        }
                    }
                    float GLF_live5A = _GLF_FUZZED(((-3.2) - (-83.35)));
                    float GLF_live5B = _GLF_FUZZED(7.2);
                    if (_GLF_DEAD(false)) {
                        _GLF_color = GLF_live3_GLF_color;
                    }
                    float GLF_live5C = _GLF_FUZZED(((-4036.3890) + (-8760.8814)));
                    float GLF_live5temp = _GLF_FUZZED(-9.6);
                    float GLF_live5x0 = _GLF_FUZZED(472.869);
                    if (_GLF_DEAD(false)) {
                        return;
                        {
                            bool GLF_live8c1 = _GLF_FUZZED((false || false));
                            bool GLF_live8c2 = _GLF_FUZZED(false);
                            bool GLF_live8c3 = _GLF_FUZZED(((-5047.0290) < 984.111));
                            bool GLF_live8c4 = _GLF_FUZZED((ivec3(-94546, -19663, -66925) == ivec3(38136, -64594, -29121)));
                            vec3 GLF_live8col = _GLF_FUZZED((vec3(8.5, 1.5, 574.980) * 7742.6606));
                            vec2 GLF_live8uv = _GLF_FUZZED((vec2(-18.43, 1.4) * mat2(-385.972, 3.5, -1.7, 23.10)));
                            if (!GLF_live8c1 && !GLF_live8c2 && !GLF_live8c3 && GLF_live8c4) {
                                float GLF_live8stripe = GLF_live8compute_stripe(tan((GLF_live8uv.x + GLF_live8uv.y) * 20.0));
                                GLF_live8col = mix(vec3(GLF_live8uv.x, .8, 0), vec3(1, GLF_live8uv.y, 0), GLF_live8stripe);
                                GLF_live8_GLF_color = vec4(GLF_live8col, 1.0);
                                ;
                            }
                        }
                    }
                    float GLF_live5x1 = _GLF_FUZZED((-4.2));
                    float GLF_live5x2 = _GLF_FUZZED(float(false));
                    if (_GLF_DEAD(false)) {
                        return;
                    }
                    if (_GLF_DEAD(false)) {
                        _GLF_color = vec4(617.101, -73.64, 16.47, 602.595);
                    }
                    {
                        float GLF_live5h0 = GLF_live5x0 - GLF_live5x2;
                        float GLF_live5h1 = GLF_live5x1 - GLF_live5x2;
                        float GLF_live5k0 = GLF_live5fx(GLF_live5x0) - GLF_live5fx(GLF_live5x2);
                        float GLF_live5k1 = GLF_live5fx(GLF_live5x1) - GLF_live5fx(GLF_live5x2);
                        GLF_live5temp = GLF_live5x2;
                        GLF_live5A = (((GLF_live5h1) * (GLF_live5k0)) - ((GLF_live5h0) * (GLF_live5k1))) / ((pow((GLF_live5h0), 2.0) * (GLF_live5h1)) - (pow((GLF_live5h1), 2.0) * (GLF_live5h0)));
                        GLF_live5B = (((GLF_live5k0) - (GLF_live5A * (pow((GLF_live5h0), 2.0)))) / (GLF_live5h0));
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            _GLF_color = min(GLF_live3_GLF_color, GLF_live3_GLF_color);
                        }
                        GLF_live5C = GLF_live5fx(GLF_live5x2);
                        GLF_live5x2 = GLF_live5x2 - ((2.0 * GLF_live5C) / (GLF_live5B + sign(GLF_live5B) * sqrt(pow(GLF_live5B, 2.0) - (4.0 * GLF_live5A * GLF_live5C))));
                        GLF_live5x0 = GLF_live5x1;
                        GLF_live5x1 = GLF_live5temp;
                    }
                }
                for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != int(_GLF_ZERO(0.0, injectionSwitch.x))); _injected_loop_counter--) {
                    return;
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        _GLF_color = vec4(75.67, 9438.8772, 8.7, -39.00);
                    }
                }
            }
        }
        if (_GLF_DEAD(false)) {
            return;
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            _GLF_color = dFdxCoarse(GLF_live10gl_FragCoord);
        }
    } else {
    }
    _GLF_color = vec4(vec3(color, trunc(injectionSwitch.y)), injectionSwitch.y);
    {
        {
            ;
        }
    }
}
