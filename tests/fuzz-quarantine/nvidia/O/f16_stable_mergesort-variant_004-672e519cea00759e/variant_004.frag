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
int GLF_live14msb8 = 256;
vec4 GLF_live7_GLF_color = _GLF_FUZZED(vec4(67.28, 82.86, 2408.8617, 531.453));

layout(set = 0, binding = 1) uniform buf1 {
    vec3 GLF_live7polynomial;
};

float GLF_live7fx(float GLF_live7x) {
    for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != (((1 << _GLF_IDENTITY(int(2), int(2))) >> _GLF_IDENTITY(int(2), int(2))) & ((((1 << _GLF_IDENTITY(int(2), int(2))) >> _GLF_IDENTITY(int(2), int(2))) << _GLF_IDENTITY(int(4), int(4))) >> _GLF_IDENTITY(int(4), int(4))))); _injected_loop_counter++) {
        return GLF_live7polynomial.x * pow(GLF_live7x, 2.0) + GLF_live7polynomial.y * GLF_live7x + GLF_live7polynomial.z;
    }
}

vec4 GLF_live10_GLF_color = _GLF_FUZZED(vec4(-7364.4747, -859.904, 340.782, -8.9));
layout(set = 0, binding = 2) uniform sampler2D GLF_live9tex;
const float GLF_live9weights[9] = float[9](1.0, 0.5, -0.25, 0.5, 1.0, -0.5, -0.25, -0.5, -1.0);
const int GLF_live3dp[256] = int[256](_GLF_IDENTITY(115, min(_GLF_IDENTITY(115, (115) - 0), 115)), _GLF_IDENTITY(133, (133) - 0), 150, 164, 176, 184, 190, 192, 191, 187, 181, 172, 163, 153, 143, 134, 126, 120, 116, 114, 114, 117, 121, 127, 134, 141, 148, 154, 159, 162, 163, 161, 157, 151, 143, 134, 124, 113, _GLF_IDENTITY(103, 0 + (103)), 94, 87, _GLF_IDENTITY(82, clamp(_GLF_IDENTITY(82, _GLF_IDENTITY((82) | (82), (_GLF_IDENTITY((82) | (82), (_GLF_IDENTITY((82) | (82), ((82) | (82)) | 0)) ^ 0)) - 0)), 82, 82)), 79, 80, 84, 91, _GLF_IDENTITY(101, (101) - (0 | 0)), 114, 130, 146, 164, 182, 199, 215, 229, 240, 249, 254, 256, 254, 250, 243, 233, 223, 212, 200, 190, 180, 172, 166, 163, 161, 162, 164, 169, 174, 179, 185, 190, 193, _GLF_IDENTITY(195, clamp(195, 195, 195)), 195, 192, 188, _GLF_IDENTITY(180, (180) ^ 0), 171, 161, 149, 137, 125, 114, 105, 97, 93, 91, 93, 98, 106, 117, _GLF_IDENTITY(130, (false ? _GLF_FUZZED((~62166)) : 130)), 145, 161, 177, 193, 208, 221, 231, 239, 243, 244, 242, 236, 228, 218, 207, 194, 181, 169, 158, 148, 141, 135, 132, 131, 132, 135, 138, _GLF_IDENTITY(143, (143) << 0), _GLF_IDENTITY(147, 0 | (147)), 151, 154, _GLF_IDENTITY(155, (155) << (0 & 56443)), 155, 152, 146, 139, 129, 118, _GLF_IDENTITY(106, min(_GLF_IDENTITY(106, int(ivec2(106, 0))), 106)), 93, 80, 68, 58, 49, 43, 40, 41, 44, 51, 61, 73, 87, 103, 119, 134, 149, 162, 173, 181, 186, 188, 186, 181, 174, 164, 153, 141, _GLF_IDENTITY(128, (128) >> 0), 116, 104, 94, 86, 81, 77, 76, 77, 80, 84, 89, 94, 98, 102, 104, 104, 102, 98, 92, 83, 73, 62, 50, 38, 26, 16, 8, 2, 0, 0, 4, 11, 21, 33, 48, 64, 81, 98, 114, 129, _GLF_IDENTITY(141, (141) | (141)), 151, 158, 161, 161, 158, 152, 144, 134, 123, 112, 100, 90, 81, 73, 68, 65, 65, 67, 70, 75, 81, 87, 92, 97, 101, 103, 102, 100, 95, 88, 79, 69, 58, 47, 36, 26, 18, 13, 11, 11, 15, 22, 32, 45, 60, 77, 94);

layout(set = 0, binding = 3) uniform buf3 {
    vec3 GLF_live1polynomial;
};

float GLF_live1fx(float GLF_live1x) {
    return GLF_live1polynomial.x * _GLF_IDENTITY(pow(GLF_live1x, 2.0), (true ? pow(GLF_live1x, 2.0) : _GLF_FUZZED(GLF_live1x))) + GLF_live1polynomial.y * GLF_live1x + GLF_live1polynomial.z;
}

layout(location = 0) out vec4 _GLF_color;

layout(set = 0, binding = 0) uniform buf0 {
    vec2 injectionSwitch;
};

const int N = 10;
int data[10], temp[10];

float _GLF_outlined_5(float GLF_live7temp) {
    return GLF_live7temp;
    if (_GLF_DEAD(false)) {
        _GLF_color = normalize(_GLF_color);
    }
}

vec4 _GLF_outlined_2() {
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
        _GLF_color = GLF_live7_GLF_color;
    }
    for (int _injected_loop_counter = (0 ^ 1); _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
        return vec4(-3.8, -_GLF_IDENTITY(21.63, _GLF_IDENTITY(float(_GLF_IDENTITY(mat3(21.63, 1.0, 0.0, 0.0, 0.0, 1.0, 1.0, cos(0.0), 1.0), mat3(mat4x3(mat3(21.63, 1.0, 0.0, 0.0, 0.0, 1.0, 1.0, cos(0.0), 1.0))))), (_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)) ? float(_GLF_IDENTITY(mat3(21.63, 1.0, 0.0, 0.0, 0.0, 1.0, 1.0, cos(0.0), 1.0), mat3(mat4x3(mat3(21.63, 1.0, 0.0, 0.0, 0.0, 1.0, 1.0, cos(0.0), 1.0))))) : _GLF_FUZZED(-99.10)))), 6236.4343, -64.17);
    }
    for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != (0 >> _GLF_IDENTITY(int(7), _GLF_IDENTITY(int(7), (false ? _GLF_FUZZED((uvec3(63036u, 143466u, 79692u), N)) : int(7)))))); _injected_loop_counter--) {
        if (_GLF_DEAD(false)) {
            _GLF_color = trunc(GLF_live10_GLF_color);
        }
        float GLF_live7A = _GLF_FUZZED(float(true));
        if (_GLF_DEAD(false)) {
            _GLF_color = GLF_live7_GLF_color;
        }
        float GLF_live7B = _GLF_FUZZED(-9.9);
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < _GLF_IDENTITY(0.0, min(0.0, 0.0)))))) {
            continue;
        }
        float GLF_live7C = _GLF_FUZZED((2.9 + 446.320));
        float GLF_live7temp = _GLF_FUZZED((-(5977.7787 + 6.1)));
        float GLF_live7x0 = _GLF_FUZZED((+7.3));
        float GLF_live7x1 = _GLF_FUZZED(vec4(-83.10, -6658.8131, 4917.8259, 4562.7594).a);
        float GLF_live7x2 = _GLF_FUZZED(vec4(1.0, -4231.3726, -480.264, -2178.8318).q);
        for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
            int GLF_live7looplimiter0 = 0;
            while (abs(GLF_live7x2 - GLF_live7x1) >= .000000000000001) {
                if (_GLF_DEAD(false)) {
                    return vec4(1.0, 1.0, 1.0, 1.0);
                }
                if (GLF_live7looplimiter0 >= 3) {
                    break;
                }
                GLF_live7looplimiter0++;
                {
                    float GLF_live7h0 = GLF_live7x0 - GLF_live7x2;
                    float GLF_live7h1 = GLF_live7x1 - GLF_live7x2;
                    float GLF_live7k0 = GLF_live7fx(GLF_live7x0) - GLF_live7fx(GLF_live7x2);
                    float GLF_live7k1 = GLF_live7fx(GLF_live7x1) - GLF_live7fx(GLF_live7x2);
                    do {
                        GLF_live7temp = GLF_live7x2;
                    } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
                    GLF_live7A = (((GLF_live7h1) * (_GLF_IDENTITY(GLF_live7k0, clamp(GLF_live7k0, _GLF_IDENTITY(GLF_live7k0, mix(float(GLF_live7k0), float(_GLF_FUZZED(-424.600)), bool(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))))), GLF_live7k0)))) - ((GLF_live7h0) * (GLF_live7k1))) / ((pow((GLF_live7h0), 2.0) * (GLF_live7h1)) - (pow((GLF_live7h1), 2.0) * (GLF_live7h0)));
                    GLF_live7B = (((GLF_live7k0) - (GLF_live7A * (pow((GLF_live7h0), 2.0)))) / (GLF_live7h0));
                    GLF_live7C = GLF_live7fx(GLF_live7x2);
                    GLF_live7x2 = GLF_live7x2 - (_GLF_IDENTITY((2.0 * GLF_live7C), min((2.0 * GLF_live7C), _GLF_IDENTITY((2.0 * GLF_live7C), ((2.0 * GLF_live7C)) + 0.0))) / (_GLF_IDENTITY(GLF_live7B + sign(GLF_live7B) * sqrt(pow(GLF_live7B, 2.0) - (4.0 * GLF_live7A * GLF_live7C)), 0.0 + (GLF_live7B + sign(GLF_live7B) * sqrt(pow(GLF_live7B, 2.0) - (4.0 * GLF_live7A * GLF_live7C))))));
                    GLF_live7x0 = GLF_live7x1;
                    GLF_live7x1 = _GLF_outlined_5(GLF_live7temp);
                    {
                        int GLF_live11i = _GLF_FUZZED(36852);
                        int GLF_live11j = _GLF_FUZZED(-30289);
                        uint GLF_live11uselessOutVariable = _GLF_FUZZED((176463u | uvec2(154962u, 168845u)).s);
                        if (uint(GLF_live11j) < uaddCarry(uint(GLF_live11i), 1u, GLF_live11uselessOutVariable)) {
                            ;
                        }
                    }
                }
            }
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
            continue;
        }
    }
}

vec4 _GLF_outlined_12(vec4 GLF_live10_GLF_color, vec4 GLF_live7_GLF_color) {
    return mix(GLF_live10_GLF_color, GLF_live7_GLF_color, bvec4(true, false, false, true));
}

void merge(int from, int mid, int to) {
    do {
        if (_GLF_DEAD(false)) {
            return;
        }
    } while (_GLF_WRAPPED_LOOP(false));
    for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > (1 ^ 1)); _injected_loop_counter--) {
        if (_GLF_DEAD(false)) {
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < abs(0.0))))) {
                _GLF_color = (vec2(990.848, 2.6) * mat4x2(5529.9416, -9584.4717, 5.0, -7626.7094, -_GLF_IDENTITY(6.6, clamp(6.6, 6.6, _GLF_IDENTITY(6.6, max(6.6, 6.6)))), -7055.4744, 286.125, 91.64));
            }
            _GLF_color = _GLF_color;
        }
    }
    int k = _GLF_IDENTITY(from, 0 + (from)), i = from, j = mid + 1;
    if (_GLF_DEAD(false)) {
        _GLF_color = _GLF_color;
    }
    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= tan(log(1.0)))))) {
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            if (_GLF_DEAD(false)) {
                _GLF_color = (vec4(801.527, _GLF_IDENTITY(27.11, max(_GLF_IDENTITY(27.11, (false ? _GLF_FUZZED(0.7) : 27.11)), 27.11)), 5.5, -2468.7340) / (-516.229));
            }
            return;
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            _GLF_color = GLF_live10_GLF_color;
        }
    } else {
    }
    if (_GLF_WRAPPED_IF_FALSE(false)) {
        {
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                do {
                    if (_GLF_WRAPPED_IF_FALSE(false)) {
                    } else {
                        do {
                            ;
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                _GLF_color = GLF_live7_GLF_color;
                            }
                        } while (_GLF_WRAPPED_LOOP(false));
                    }
                    if (_GLF_DEAD(false)) {
                        _GLF_color = fract(vec4(2228.1769, 7.7, 9.4, -815.397));
                    }
                    if (_GLF_DEAD(_GLF_IDENTITY(false, bool(bvec3(false, false, false))))) {
                        discard;
                    }
                } while (_GLF_WRAPPED_LOOP(false));
            } else {
            }
            if (_GLF_DEAD(false)) {
                _GLF_color = GLF_live7_GLF_color;
            }
        }
    } else {
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            while (i <= mid && j <= to) {
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_ZERO(0.0, injectionSwitch.x))))) {
                    break;
                    if (_GLF_DEAD(_GLF_FALSE(false, (_GLF_IDENTITY(gl_FragCoord, (false ? _GLF_FUZZED(_GLF_color) : gl_FragCoord)).y < 0.0)))) {
                        _GLF_color = GLF_live7_GLF_color;
                    }
                }
                if (data[i] < data[j]) {
                    _GLF_IDENTITY(temp[k++] = data[i++], (temp[k++] = data[i++]) | 0);
                    if (_GLF_DEAD(false)) {
                        break;
                    }
                } else {
                    temp[k++] = data[j++];
                }
            }
            if (_GLF_DEAD(false)) {
                {
                    int GLF_live12looplimiter2 = 0;
                    if (GLF_live12looplimiter2 >= 7) {
                        ;
                    }
                }
                _GLF_color = _GLF_color;
            }
        } else {
        }
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
        _GLF_color = vec4(34.44, 2.8, 9027.3676, 2.7);
    }
    if (_GLF_WRAPPED_IF_FALSE(false)) {
    } else {
        while (i < N && i <= mid) {
            temp[k++] = data[i++];
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                if (_GLF_DEAD(false)) {
                    _GLF_color = atan(GLF_live10_GLF_color);
                    {
                        int GLF_live14i = _GLF_FUZZED((+30450));
                        float GLF_live14ref = _GLF_FUZZED((false ? 614.865 : (-4.1)));
                        float GLF_live14s = _GLF_FUZZED(-20.12);
                        if (mod(float(GLF_live14i), GLF_live14ref) <= 0.01) {
                            GLF_live14s += 0.2;
                        }
                    }
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (_GLF_IDENTITY(gl_FragCoord.x, min(gl_FragCoord.x, gl_FragCoord.x)) < _GLF_IDENTITY(dot(vec3(1.0, 0.0, 0.0), vec3(0.0, 1.0, 1.0)), dot(vec3(1.0, 0.0, 0.0), vec3(0.0, 1.0, 1.0))))))) {
                    break;
                }
                for (int _injected_loop_counter = (1 | ((1 << _GLF_IDENTITY(int(5), int(5))) >> _GLF_IDENTITY(int(5), int(5)))); _GLF_WRAPPED_LOOP(_injected_loop_counter != int(_GLF_ZERO(0.0, injectionSwitch.x))); _injected_loop_counter--) {
                    _GLF_color = _GLF_outlined_2();
                }
                if (_GLF_DEAD(false)) {
                    _GLF_color = (_GLF_color);
                    {
                        {
                            ;
                        }
                    }
                }
            }
        }
    }
    for (int i = from; i <= to; i++) {
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                if (_GLF_WRAPPED_IF_FALSE(false)) {
                } else {
                    _GLF_color = _GLF_outlined_12(GLF_live10_GLF_color, GLF_live7_GLF_color);
                }
                if (_GLF_DEAD(false)) {
                    _GLF_color = reflect(fwidthFine(_GLF_color), smoothstep(-348.946, 1216.1032, vec4(46.73, -532.532, 5.9, 9.9)));
                }
            }
            {
                int GLF_live14i = _GLF_FUZZED(ivec2(-94496, -41346).s);
                float GLF_live14ref = _GLF_FUZZED(8.2);
                float GLF_live14s = _GLF_FUZZED(-14.23);
                if (mod(float(GLF_live14i), GLF_live14ref) <= 0.01) {
                    GLF_live14s += 0.2;
                }
            }
            if (_GLF_DEAD(_GLF_IDENTITY(false, !(!(false))))) {
                return;
            }
            if (_GLF_DEAD(false)) {
                return;
            }
            if (_GLF_DEAD(false)) {
                _GLF_color = (dFdyFine(vec4(5.7, -35.93, -95.97, -5.6)) * vec4(-529.265, 4.4, -125.100, -36.26));
            }
        } else {
        }
        if (_GLF_DEAD(false)) {
            for (int _injected_loop_counter = (1 | 1); _GLF_WRAPPED_LOOP(_injected_loop_counter != (1 ^ 1)); _injected_loop_counter--) {
                discard;
            }
            if (_GLF_DEAD(false)) {
                _GLF_color = vec4(-7.6, -35.21, -2.0, 8.6);
            }
        }
        if (_GLF_DEAD(_GLF_IDENTITY(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)), !(!(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))))))) {
            if (_GLF_WRAPPED_IF_FALSE(false)) {
            } else {
                _GLF_color = _GLF_color;
            }
        }
        if (_GLF_DEAD(false)) {
            _GLF_color = dFdyCoarse(vec4(151.786, -1.3, 7.4, 7067.1702));
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            break;
        }
        for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < int(_GLF_ONE(1.0, injectionSwitch.y))); _injected_loop_counter++) {
            if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                if (_GLF_DEAD(false)) {
                    _GLF_color = (mat2(-4.0, 3.9, 308.303, -3186.9560), vec4(2.3, 4517.9793, 5447.4890, 982.274));
                }
            } else {
                data[i] = temp[i];
            }
        }
    }
    do {
        {
            ;
        }
    } while (_GLF_WRAPPED_LOOP(false));
}

vec4 _GLF_outlined_13() {
    return vec4(72.90, max(2405.0110, 23.76), vec2(-3284.4177, -16.12));
}

vec4 _GLF_outlined_14(vec4 GLF_live7_GLF_color) {
    return GLF_live7_GLF_color;
}

void mergeSort() {
    if (_GLF_DEAD(false)) {
        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= log(_GLF_ONE(1.0, injectionSwitch.y)))))) {
            if (_GLF_WRAPPED_IF_FALSE(false)) {
            } else {
                return;
            }
        } else {
        }
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < sqrt(0.0))))) {
        _GLF_color = vec4(-433.843, -48.34, -4.1, 1.0);
        if (_GLF_DEAD(false)) {
            do {
                _GLF_color = round(GLF_live10_GLF_color);
                if (_GLF_DEAD(false)) {
                    continue;
                }
            } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))));
        }
    }
    int low = 0;
    int high = N - _GLF_IDENTITY(1, _GLF_IDENTITY(int(int(1)), max(_GLF_IDENTITY(int(int(1)), _GLF_IDENTITY((int(int(1))) ^ 0, min((int(int(1))) ^ 0, _GLF_IDENTITY((int(int(1))) ^ 0, min((int(int(1))) ^ 0, (int(int(1))) ^ 0))))), int(int(1)))));
    for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
        if (_GLF_WRAPPED_IF_FALSE(false)) {
        } else {
            for (int m = 1; m <= high; m = 2 * m) {
                if (_GLF_DEAD(false)) {
                    for (int _injected_loop_counter = _GLF_IDENTITY(1, int(ivec4(1, int(_GLF_ZERO(0.0, injectionSwitch.x)), 1, 0))); _GLF_WRAPPED_LOOP(_injected_loop_counter != (0 ^ 0)); _injected_loop_counter--) {
                        _GLF_color = _GLF_outlined_13();
                    }
                    if (_GLF_DEAD(false)) {
                        break;
                    }
                }
                for (int _injected_loop_counter = int(_GLF_ZERO(0.0, injectionSwitch.x)); _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
                    do {
                        if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        } else {
                            if (_GLF_DEAD(false)) {
                                return;
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    _GLF_color = dFdxCoarse(max(GLF_live7_GLF_color, -7.5));
                                }
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                _GLF_color = (_GLF_color + 759.321);
                            }
                        }
                        {
                            int GLF_live14i = _GLF_FUZZED(84917);
                            float GLF_live14limit = _GLF_FUZZED((+(false ? 5.5 : 4766.5431)));
                            float GLF_live14ref = _GLF_FUZZED(60.70);
                            float GLF_live14s = _GLF_FUZZED(vec2(-72.51, 537.721).t);
                            {
                                if (mod(float(GLF_live14i), GLF_live14ref) <= 0.01) {
                                    GLF_live14s += 0.2;
                                }
                                if (float(GLF_live14i) >= GLF_live14limit) {
                                    ;
                                }
                                GLF_live14i++;
                            }
                        }
                    } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))));
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    _GLF_color = _GLF_outlined_14(GLF_live7_GLF_color);
                }
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                    if (_GLF_DEAD(false)) {
                        _GLF_color = fwidthFine(tanh(GLF_live7_GLF_color));
                    }
                    for (int i = low; i < high; i += 2 * _GLF_IDENTITY(m, (m) - 0)) {
                        int from = i;
                        int mid = i + m - 1;
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            _GLF_color = atan(vec4(183.429, 569.085, -6.7, -7.3));
                        }
                        int to = min(i + 2 * m - 1, high);
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < log(sqrt(1.0)))))) {
                            _GLF_color = _GLF_color;
                        }
                        merge(from, mid, to);
                    }
                } else {
                }
            }
        }
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
        _GLF_color = mod(_GLF_color, normalize(82.29));
    }
}

vec4 _GLF_outlined_0(vec4 _GLF_color) {
    return _GLF_color;
}

vec4 _GLF_outlined_1(vec4 _GLF_color) {
    if (_GLF_WRAPPED_IF_TRUE(true)) {
        do {
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                return _GLF_color;
            } else {
                if (_GLF_DEAD(_GLF_IDENTITY(_GLF_IDENTITY(false, (false) && true), (_GLF_IDENTITY(false, (false) && true)) && true))) {
                    if (_GLF_DEAD(false)) {
                        break;
                    }
                    return vec4(1.0, 1.0, 1.0, 1.0);
                }
            }
        } while (_GLF_WRAPPED_LOOP(false));
    } else {
    }
}

vec4 _GLF_outlined_3() {
    for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
        if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
        } else {
            return ((-4.5) / mat3x4(9.0, 610.096, -7.5, 99.80, -_GLF_IDENTITY(2.3, clamp(2.3, 2.3, _GLF_IDENTITY(2.3, max(2.3, 2.3)))), 9.6, -63.10, -848.804, -2.7, -22.01, -8.0, 720.695))[0];
        }
    }
}

vec4 _GLF_outlined_4(vec4 _GLF_color) {
    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
        return roundEven((vec4(-648.698, -4753.4593, -64.16, -2904.8658) / _GLF_color));
    } else {
    }
    if (_GLF_DEAD(false)) {
        return vec4(1.0, 1.0, 1.0, 1.0);
    }
}

int _GLF_outlined_6(int GLF_live4v) {
    return (4 * GLF_live4v * (_GLF_IDENTITY(1000, 0 + (1000)) - GLF_live4v)) / 1000;
}

vec4 _GLF_outlined_15() {
    return vec4(-810.844, -56.23, -9.9, 997.868);
}

int _GLF_outlined_7() {
    if (_GLF_DEAD(false)) {
        _GLF_color = _GLF_outlined_15();
    }
    {
        int GLF_live14i = _GLF_FUZZED(40403);
        float GLF_live14limit = _GLF_FUZZED(-2136.5970);
        float GLF_live14s = _GLF_FUZZED(vec4(-4906.8374, 0.7, -1088.5721, -3.1).g);
        if (float(GLF_live14i) >= GLF_live14limit) {
            ;
        }
    }
    return 0;
}

vec4 _GLF_outlined_8(bool GLF_live10res1, bool GLF_live10res2, bool GLF_live10res3) {
    return vec4(GLF_live10res1 ? 1.0 : 0.0, GLF_live10res2 ? 1.0 : 0.0, GLF_live10res3 ? 1.0 : 0.0, 1);
}

vec4 _GLF_outlined_9() {
    if (_GLF_WRAPPED_IF_FALSE(false)) {
    } else {
        return vec4(-5.7, -558.269, 62.61, 931.181);
    }
}

vec4 _GLF_outlined_10() {
    return vec4(_GLF_IDENTITY(1.0, determinant(mat4(0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0)) + (1.0)), 0.0, 0.0, 1.0);
}

float _GLF_outlined_11(float GLF_live1x2, float GLF_live1C, float GLF_live1B, float GLF_live1A) {
    return GLF_live1x2 - ((_GLF_IDENTITY(2.0, _GLF_IDENTITY((2.0) - 0.0, mix(float(_GLF_IDENTITY((2.0) - 0.0, clamp((2.0) - 0.0, (2.0) - 0.0, (2.0) - 0.0))), float(_GLF_FUZZED(803.456)), bool(false)))) * GLF_live1C) / (GLF_live1B + sign(GLF_live1B) * sqrt(pow(GLF_live1B, 2.0) - _GLF_IDENTITY((4.0 * GLF_live1A * _GLF_IDENTITY(GLF_live1C, min(GLF_live1C, GLF_live1C))), ((4.0 * GLF_live1A * _GLF_IDENTITY(GLF_live1C, min(GLF_live1C, GLF_live1C)))) + 0.0))));
}

vec4 _GLF_outlined_16() {
    return vec4(0.0, 1.0, 0.0, 1.0);
}

int _GLF_outlined_17(int GLF_live4v) {
    return (4 * GLF_live4v * (1000 - GLF_live4v)) / 1000;
}

vec4 _GLF_outlined_18(vec4 GLF_live7_GLF_color) {
    {
        float GLF_live14s = _GLF_FUZZED((51.61 * float(60912u)));
        {
            ;
        }
    }
    return GLF_live7_GLF_color;
}

vec4 _GLF_outlined_19(float GLF_live10res) {
    return vec4(GLF_live10res, GLF_live10res, GLF_live10res, 1.0);
}

vec4 _GLF_outlined_20() {
    return dFdxCoarse(vec4(79.40, -1.7, 38.64, 8.7));
}

void main() {
    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
        _GLF_color = GLF_live7_GLF_color;
    }
    if (_GLF_DEAD(false)) {
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < abs(0.0))))) {
                {
                    int GLF_live14i = _GLF_FUZZED(-99959);
                    float GLF_live14limit = _GLF_FUZZED((+92.93));
                    int GLF_live14looplimiter0 = 0;
                    float GLF_live14ref = _GLF_FUZZED(-375.002);
                    float GLF_live14s = _GLF_FUZZED((-137.201));
                    while (GLF_live14i < bitfieldInsert(800, GLF_live14i, 0, 0)) {
                        if (GLF_live14looplimiter0 >= 3) {
                            break;
                        }
                        GLF_live14looplimiter0++;
                        {
                            if (mod(float(GLF_live14i), GLF_live14ref) <= 0.01) {
                                GLF_live14s += 0.2;
                            }
                            if (float(GLF_live14i) >= GLF_live14limit) {
                                ;
                            }
                            GLF_live14i++;
                        }
                    }
                }
                return;
            }
            _GLF_color = vec4(-6.3, 910.083, -5.4, 65.43);
        } else {
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                return;
            }
        }
    }
    int i = int(injectionSwitch.x);
    do {
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            return;
        }
        if (_GLF_DEAD(_GLF_FALSE(false, _GLF_IDENTITY((gl_FragCoord.y < 0.0), true && (_GLF_IDENTITY((gl_FragCoord.y < 0.0), false || ((gl_FragCoord.y < 0.0)))))))) {
            continue;
        }
    } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (_GLF_IDENTITY(gl_FragCoord.x < _GLF_IDENTITY(0.0, max(0.0, 0.0)), (_GLF_IDENTITY(gl_FragCoord.x < _GLF_IDENTITY(0.0, max(0.0, 0.0)), (gl_FragCoord.x < _GLF_IDENTITY(0.0, max(0.0, 0.0))) && true)) && _GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))))));
    do {
        if (_GLF_DEAD(false)) {
            return;
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                _GLF_color = (_GLF_color / (-40.94));
            }
        }
    } while (_GLF_WRAPPED_LOOP(false));
    if (_GLF_DEAD(false)) {
        _GLF_color = GLF_live10_GLF_color;
    }
    for (int _injected_loop_counter = _GLF_IDENTITY(0, ~(~(0))); _GLF_WRAPPED_LOOP(_injected_loop_counter != ((1 << _GLF_IDENTITY(int(0), int(0))) >> _GLF_IDENTITY(int(0), int(0)))); _injected_loop_counter++) {
        {
            int GLF_live11looplimiter0 = 0;
            if (GLF_live11looplimiter0 >= 3) {
                ;
            }
        }
        do {
            if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(_GLF_TRUE(true, (gl_FragCoord.y >= _GLF_IDENTITY(0.0, _GLF_IDENTITY(float(vec3(0.0, 1.0, 1.0)), (true ? float(vec3(0.0, 1.0, 1.0)) : _GLF_FUZZED(-763.386)))))), !(!(_GLF_TRUE(true, (gl_FragCoord.y >= _GLF_IDENTITY(0.0, _GLF_IDENTITY(float(vec3(0.0, 1.0, 1.0)), (true ? float(vec3(0.0, 1.0, 1.0)) : _GLF_FUZZED(-763.386))))))))))) {
                do {
                    switch (i) {
                        case 0:
                            if (_GLF_WRAPPED_IF_FALSE(false)) {
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = _GLF_color;
                                }
                            } else {
                                data[i] = 4;
                            }
                            for (int _injected_loop_counter = int(_GLF_ONE(1.0, injectionSwitch.y)); _GLF_WRAPPED_LOOP(_GLF_IDENTITY(_injected_loop_counter != 0, (_injected_loop_counter != 0) && true)); _injected_loop_counter--) {
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                    _GLF_color = asinh(dFdxCoarse(vec4(326.202, -183.119, -457.079, -65.84)));
                                }
                            }
                            break;
                        case 1:
                            do {
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                    _GLF_color = tan(atan(GLF_live10_GLF_color, (mat4(-537.054, 7730.7970, 9.6, -5.1, 3.3, 2.4, 38.99, -0.5, 3.1, -8.5, 9.5, 31.68, -1.8, -631.739, 9.0, -21.73) * GLF_live10_GLF_color)));
                                }
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < _GLF_IDENTITY(0.0, (0.0) / 1.0))))) {
                                    for (int _injected_loop_counter = (int(_GLF_ZERO(0.0, injectionSwitch.x)) >> _GLF_IDENTITY(int(2), int(2))); _GLF_WRAPPED_LOOP(_injected_loop_counter != int(_GLF_ONE(1.0, injectionSwitch.y))); _injected_loop_counter++) {
                                        for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != _GLF_IDENTITY((1 | 1), ((1 | _GLF_IDENTITY(1, max(1, 1)))) | ((1 | 1)))); _injected_loop_counter++) {
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                _GLF_color = _GLF_color;
                                            }
                                            _GLF_color = _GLF_color;
                                        }
                                    }
                                }
                                data[i] = 3;
                                if (_GLF_DEAD(false)) {
                                    for (int _injected_loop_counter = (0 << _GLF_IDENTITY(int(1), int(1))); _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
                                        _GLF_color = _GLF_color;
                                    }
                                }
                            } while (_GLF_WRAPPED_LOOP(false));
                            break;
                        case 2:
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                discard;
                            }
                            {
                                {
                                    ;
                                }
                            }
                            data[i] = 2;
                            if (_GLF_DEAD(false)) {
                                {
                                    vec2 GLF_live10coord = _GLF_FUZZED((vec2(-3.4, 94.10) * (-19.69)));
                                    if (_GLF_DEAD(false)) {
                                        discard;
                                    }
                                    {
                                        ivec2 GLF_live10icoord = ivec2((_GLF_IDENTITY((GLF_live10coord - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4), ((GLF_live10coord - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) / vec2(1.0, 1.0))) * 256.0);
                                        int GLF_live10res3 = ((GLF_live10icoord.x >> 5) & 1) ^ ((GLF_live10icoord.y & 32) >> 5);
                                        int GLF_live10res2 = (GLF_live10icoord.y * GLF_live10icoord.y >> 10) & 1;
                                        int GLF_live10res1 = (GLF_live10icoord.x * GLF_live10icoord.y >> 9) & 1;
                                        GLF_live10_GLF_color = vec4(float(GLF_live10res1 ^ GLF_live10res2), float(_GLF_IDENTITY(GLF_live10res2, _GLF_IDENTITY(int(ivec3(GLF_live10res2, 0, 0)), (false ? _GLF_FUZZED(N) : int(ivec3(GLF_live10res2, 0, 0))))) & GLF_live10res3), float(GLF_live10res1 | GLF_live10res3), 1.0);
                                    }
                                }
                                _GLF_color = _GLF_color;
                            }
                            break;
                        case 3:
                            for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > _GLF_IDENTITY(0, 0 ^ (_GLF_IDENTITY(0, (0) ^ 0)))); _injected_loop_counter--) {
                                data[i] = 1;
                            }
                            if (_GLF_DEAD(false)) {
                                continue;
                            }
                            break;
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                break;
                            }
                            if (_GLF_IDENTITY(_GLF_DEAD(_GLF_IDENTITY(false, (false) || false)), bool(bvec2(_GLF_DEAD(_GLF_IDENTITY(false, (false) || false)), true)))) {
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                    break;
                                }
                                _GLF_color = vec4(-7184.5015, -9.2, -_GLF_IDENTITY(0.8, _GLF_IDENTITY(float(vec3(0.8, length(vec3(0.0, 0.0, 0.0)), abs(1.0))), max(float(vec3(0.8, length(vec3(0.0, 0.0, 0.0)), abs(1.0))), float(vec3(0.8, length(vec3(0.0, 0.0, 0.0)), abs(1.0)))))), 8.1);
                            }
                        case 4:
                            data[i] = 0;
                            {
                                int GLF_live14looplimiter1 = 0;
                                if (GLF_live14looplimiter1 >= 3) {
                                    ;
                                }
                            }
                            break;
                        case 5:
                            if (_GLF_DEAD(false)) {
                                if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                } else {
                                    _GLF_color = _GLF_color;
                                }
                            }
                            for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > (N & (1 ^ 1))); _GLF_IDENTITY(_injected_loop_counter--, (false ? _GLF_FUZZED(8558) : (_injected_loop_counter--)))) {
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    if (_GLF_DEAD(_GLF_IDENTITY(false, !(!(false))))) {
                                        discard;
                                    }
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            data[i] = -1;
                                        } else {
                                        }
                                    } else {
                                    }
                                } else {
                                }
                                {
                                    vec4 GLF_live14c = _GLF_FUZZED(vec4(947.422, 4643.9028, 526.196, 947.987));
                                    int GLF_live14i = _GLF_FUZZED(ivec4(-65376, 41674, 77623, 24041).r);
                                    int GLF_live14msb8 = _GLF_FUZZED(-43031);
                                    {
                                        int GLF_live14looplimiter1 = 0;
                                        do {
                                            if (GLF_live14looplimiter1 >= 3) {
                                                break;
                                            }
                                            GLF_live14looplimiter1++;
                                            {
                                                if (GLF_live14c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14i, 4)] >= 1.0) {
                                                    GLF_live14c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14i, 4)] = GLF_live14c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14i, 4)] * GLF_live14c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14i, 4)];
                                                }
                                                GLF_live14i++;
                                            }
                                        } while (GLF_live14i < findMSB(findLSB(GLF_live14msb8)));
                                    }
                                }
                            }
                            break;
                        case 6:
                            if (_GLF_DEAD(false)) {
                                for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != (34638 & 0)); _injected_loop_counter--) {
                                    _GLF_color = vec4(6.7, -6.3, -7.7, 24.33);
                                }
                            }
                            if (_GLF_DEAD(false)) {
                                _GLF_color = step(vec4(3563.4518, -58.63, -48.97, -9.4), _GLF_color);
                            }
                            if (_GLF_IDENTITY(_GLF_DEAD(_GLF_FALSE(false, (_GLF_IDENTITY(gl_FragCoord, clamp(gl_FragCoord, gl_FragCoord, gl_FragCoord)).x < 0.0))), (_GLF_IDENTITY(_GLF_DEAD(_GLF_FALSE(false, (_GLF_IDENTITY(gl_FragCoord, clamp(gl_FragCoord, gl_FragCoord, gl_FragCoord)).x < 0.0))), bool(bool(_GLF_DEAD(_GLF_FALSE(false, (_GLF_IDENTITY(gl_FragCoord, clamp(gl_FragCoord, gl_FragCoord, gl_FragCoord)).x < 0.0))))))) || false)) {
                                break;
                            }
                            {
                                {
                                    for (int _injected_loop_counter = (1 | 1); _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            GLF_live7_GLF_color = _GLF_outlined_16();
                                            if (_GLF_DEAD(false)) {
                                                _GLF_color = tan(mix(_GLF_color, GLF_live7_GLF_color, _GLF_IDENTITY(_GLF_color, _GLF_IDENTITY(mat4(1.0) * (_GLF_color), (mat4(1.0) * (_GLF_color)) * mat4(1.0)))));
                                            }
                                        } else {
                                        }
                                        if (_GLF_DEAD(false)) {
                                            _GLF_color = GLF_live10_GLF_color;
                                        }
                                    }
                                }
                            }
                            {
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    _GLF_color = vec4(-1.9, -2345.8593, -4.1, 839.986);
                                }
                                int GLF_live4looplimiter0 = 0;
                                int GLF_live4v = _GLF_FUZZED(((mat4(-112.827, 795.547, -69.83, 499.601, -8.6, 34.29, 4.8, 96.31, -7116.1706, 8.2, -8.3, 8.9, 840.430, 6.7, -80.01, 56.79) == mat4(6230.6683, 3.1, -68.25, -5.1, _GLF_IDENTITY(941.860, (_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)) ? _GLF_IDENTITY(941.860, clamp(941.860, 941.860, 941.860)) : _GLF_FUZZED(8.2))), 8711.2798, 311.246, -7.7, -_GLF_IDENTITY(85.64, max(85.64, 85.64)), 30.95, 3274.7674, -5.4, 4.2, 0.1, 1.3, -3.3)) ? (-29765) : (_GLF_IDENTITY(-_GLF_IDENTITY(60598, min(60598, 60598)), (true ? (-_GLF_IDENTITY(60598, min(60598, 60598))) : _GLF_FUZZED((findLSB(N) * i)))))));
                                {
                                    {
                                        {
                                            ;
                                        }
                                    }
                                    if (GLF_live4looplimiter0 >= 3) {
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                            _GLF_color = (mat4(4414.2097, 9.0, 6.7, -8.4, -52.12, -9017.5009, -8.6, -3678.2500, -7392.8051, -50.76, -3.8, 901.123, 4.2, 3.7, 15.86, 6550.5359) * _GLF_color);
                                        }
                                        ;
                                        if (_GLF_DEAD(false)) {
                                            _GLF_color = intBitsToFloat(ivec2(17595, -82290).rggg);
                                        }
                                    }
                                    for (int _injected_loop_counter = ((1 | 1) | 0); _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                                        if (_GLF_DEAD(false)) {
                                            _GLF_color = (GLF_live1polynomial * mat4x3(5.3, -53.21, -2.1, 8715.7311, 332.880, -8.3, -7427.0415, -17.63, 8.5, 420.325, 9.4, 5.4));
                                        }
                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                            discard;
                                        }
                                    }
                                    GLF_live4looplimiter0++;
                                    if (_GLF_DEAD(false)) {
                                        continue;
                                    }
                                    if (_GLF_DEAD(false)) {
                                        return;
                                    }
                                    {
                                        GLF_live4v = _GLF_outlined_6(GLF_live4v);
                                    }
                                }
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                continue;
                            }
                            if (_GLF_WRAPPED_IF_FALSE(false)) {
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                    break;
                                }
                            } else {
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                    break;
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = uintBitsToFloat(uvec4(10217u, 175614u, 102652u, 164367u));
                                    }
                                }
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = fract(GLF_live10_GLF_color);
                                }
                                data[i] = -2;
                                for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = vec4(8.1, -694.619, -2.3, 1.3);
                                    }
                                    vec2 GLF_live10coord = _GLF_FUZZED(vec2(89.76, 2.6));
                                    {
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                            _GLF_color = _GLF_color;
                                        }
                                        ivec2 GLF_live10icoord = _GLF_IDENTITY(ivec2(((GLF_live10coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.6, _GLF_IDENTITY(1.0, 0.0 + (1.0)))) * 256.0), min(ivec2(((GLF_live10coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.6, _GLF_IDENTITY(1.0, 0.0 + (1.0)))) * 256.0), ivec2(((GLF_live10coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.6, _GLF_IDENTITY(1.0, 0.0 + (1.0)))) * 256.0)));
                                        int GLF_live10v = (GLF_live10icoord.x ^ _GLF_IDENTITY(GLF_live10icoord, _GLF_IDENTITY(ivec2(ivec3(_GLF_IDENTITY(GLF_live10icoord, (GLF_live10icoord) ^ ivec2(0, 0)), 0)), ivec2(ivec2(ivec2(ivec3(_GLF_IDENTITY(GLF_live10icoord, (GLF_live10icoord) ^ ivec2(0, 0)), 0)))))).y) * GLF_live10icoord.y;
                                        if (_GLF_DEAD(false)) {
                                            _GLF_color = GLF_live7_GLF_color;
                                        }
                                        bool GLF_live10res1 = ((GLF_live10v >> 10) & 1) != 0;
                                        bool GLF_live10res2 = (_GLF_IDENTITY(_GLF_IDENTITY((GLF_live10v >> 11), min((_GLF_IDENTITY(GLF_live10v, int(ivec2(GLF_live10v, 0))) >> 11), (GLF_live10v >> 11))) & 4, (_GLF_IDENTITY((GLF_live10v >> 11), min((_GLF_IDENTITY(GLF_live10v, int(ivec2(GLF_live10v, 0))) >> 11), (GLF_live10v >> 11))) & 4) ^ 0)) != 0;
                                        bool GLF_live10res3 = ((GLF_live10v >> 12) & 8) != 0;
                                        GLF_live10_GLF_color = vec4(GLF_live10res1 ? _GLF_IDENTITY(1.0, clamp(_GLF_IDENTITY(1.0, _GLF_IDENTITY(0.0 + (_GLF_IDENTITY(1.0, (false ? _GLF_FUZZED(741.850) : 1.0))), max(0.0 + (_GLF_IDENTITY(1.0, (false ? _GLF_FUZZED(741.850) : 1.0))), 0.0 + (_GLF_IDENTITY(1.0, (false ? _GLF_FUZZED(741.850) : 1.0)))))), _GLF_IDENTITY(1.0, tan(0.0) + (1.0)), 1.0)) : 0.0, GLF_live10res2 ? 1.0 : 0.0, GLF_live10res3 ? 1.0 : 0.0, 1);
                                    }
                                    {
                                        int GLF_live14i = _GLF_FUZZED(-97825);
                                        float GLF_live14limit = _GLF_FUZZED(4.9);
                                        int GLF_live14looplimiter0 = 0;
                                        float GLF_live14ref = _GLF_FUZZED(((-6826.1033) * (-8.4)));
                                        float GLF_live14s = _GLF_FUZZED(((-3551.6343) + 61.33));
                                        {
                                            if (GLF_live14looplimiter0 >= 3) {
                                                ;
                                            }
                                            GLF_live14looplimiter0++;
                                            {
                                                if (mod(float(GLF_live14i), GLF_live14ref) <= 0.01) {
                                                    GLF_live14s += 0.2;
                                                }
                                                if (float(GLF_live14i) >= GLF_live14limit) {
                                                    ;
                                                }
                                                GLF_live14i++;
                                            }
                                        }
                                    }
                                }
                            }
                            break;
                        case 7:
                            {
                                int GLF_live14i = _GLF_FUZZED(-9048);
                                float GLF_live14ref = _GLF_FUZZED((-((-8.4) * (-4.8))));
                                float GLF_live14s = _GLF_FUZZED(((-74.57) * (-6.0)));
                                if (mod(float(GLF_live14i), GLF_live14ref) <= 0.01) {
                                    GLF_live14s += 0.2;
                                }
                            }
                            data[i] = -3;
                            {
                                vec2 GLF_live10coord = _GLF_FUZZED(vec2(vec4(8.8, -33.67, 7.9, -7.7)));
                                if (GLF_live10coord.y < 0.6) {
                                    uvec2 GLF_live10icoord = uvec2(((GLF_live10coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                                    uint GLF_live10res1 = uint(((GLF_live10icoord.x * GLF_live10icoord.y) >> _GLF_IDENTITY((GLF_live10icoord.x & 31u), (_GLF_IDENTITY((GLF_live10icoord.x & 31u), (true ? (GLF_live10icoord.x & 31u) : _GLF_FUZZED(135492u)))) >> 0u)) & 0xffffffffu);
                                    uint GLF_live10res2 = uint(((GLF_live10icoord.x * GLF_live10icoord.y) << (GLF_live10icoord.x & 31u)) & 0xffffffffu);
                                    float GLF_live10res = float(((GLF_live10res2 & 0x80000000u) != 0u ? 1u : 0u) ^ _GLF_IDENTITY(((GLF_live10res1 & 1u) != 0u ? 1u : 0u), max(((GLF_live10res1 & 1u) != 0u ? 1u : 0u), _GLF_IDENTITY(((GLF_live10res1 & 1u) != 0u ? 1u : 0u), min(((GLF_live10res1 & 1u) != 0u ? 1u : 0u), ((GLF_live10res1 & 1u) != 0u ? 1u : 0u))))));
                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                        for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
                                            GLF_live10_GLF_color = _GLF_IDENTITY(vec4(GLF_live10res, GLF_live10res, GLF_live10res, 1.0), clamp(vec4(GLF_live10res, GLF_live10res, GLF_live10res, 1.0), vec4(GLF_live10res, GLF_live10res, GLF_live10res, 1.0), _GLF_IDENTITY(vec4(GLF_live10res, GLF_live10res, GLF_live10res, 1.0), mix(vec4((vec4(GLF_live10res, GLF_live10res, GLF_live10res, 1.0))[0], _GLF_FUZZED(69.47), _GLF_FUZZED(-5.0), (vec4(GLF_live10res, GLF_live10res, GLF_live10res, 1.0))[3]), vec4(_GLF_FUZZED(-1.2), (vec4(GLF_live10res, GLF_live10res, GLF_live10res, 1.0))[1], (vec4(GLF_live10res, GLF_live10res, GLF_live10res, 1.0))[2], _GLF_FUZZED(5106.9911)), bvec4(false, true, true, false)))));
                                        }
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                _GLF_color = GLF_live10_GLF_color;
                                            }
                                            discard;
                                        }
                                    } else {
                                    }
                                } else {
                                    ivec2 GLF_live10icoord = ivec2(((GLF_live10coord - vec2(0.4, 0.6)) * vec2(_GLF_IDENTITY(1.0, clamp(_GLF_IDENTITY(1.0, mix(float(1.0), float(_GLF_FUZZED(5.2)), bool(false))), 1.0, 1.0)) / 0.4, 1.0 / 0.4)) * 256.0);
                                    int GLF_live10res3 = ((GLF_live10icoord.x >> 5) & 1) ^ ((GLF_live10icoord.y & 32) >> 5);
                                    int GLF_live10res2 = (GLF_live10icoord.y * GLF_live10icoord.y >> 10) & _GLF_IDENTITY(1, (1) | (1));
                                    int GLF_live10res1 = (GLF_live10icoord.x * GLF_live10icoord.y >> 9) & 1;
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = GLF_live7_GLF_color;
                                    }
                                    if (_GLF_DEAD(false)) {
                                        return;
                                    }
                                    GLF_live10_GLF_color = vec4(float(GLF_live10res1 ^ GLF_live10res2), float(GLF_live10res2 & GLF_live10res3), float(GLF_live10res1 | GLF_live10res3), 1.0);
                                }
                            }
                            break;
                            if (_GLF_DEAD(false)) {
                                _GLF_color = vec4(6.5, -5435.6826, -72.90, 6.5);
                            }
                        case 8:
                            data[i] = -4;
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < _GLF_ZERO(0.0, injectionSwitch.x))))) {
                                break;
                                if (_GLF_DEAD(false)) {
                                    _GLF_IDENTITY(_GLF_color = (0.3 + dFdyFine(GLF_live10_GLF_color)), (_GLF_color = (0.3 + dFdyFine(GLF_live10_GLF_color))) / vec4(1.0, 1.0, 1.0, 1.0));
                                }
                            }
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = _GLF_outlined_0(_GLF_color);
                                }
                            } else {
                                if (_GLF_DEAD(false)) {
                                    continue;
                                }
                            }
                            break;
                            {
                                ivec2 GLF_live0p = _GLF_FUZZED(ivec2(_GLF_IDENTITY(33062, (33062) / 1), 29454));
                                {
                                    int GLF_live14i = _GLF_FUZZED(((94268 - (-61125)) + (81754 ^ 53447)));
                                    float GLF_live14ref = _GLF_FUZZED(-3133.3921);
                                    float GLF_live14s = _GLF_FUZZED(-9034.0799);
                                    if (mod(float(GLF_live14i), GLF_live14ref) <= 0.01) {
                                        GLF_live14s += 0.2;
                                    }
                                }
                                {
                                    int GLF_live0looplimiter1 = 0;
                                    do {
                                        while (GLF_live0p.x > 15) {
                                            {
                                                int GLF_live14looplimiter1 = 0;
                                                if (GLF_live14looplimiter1 >= 3) {
                                                    ;
                                                }
                                            }
                                            if (GLF_live0looplimiter1 >= 4) {
                                                break;
                                            }
                                            GLF_live0looplimiter1++;
                                            if (_GLF_DEAD(false)) {
                                                return;
                                            }
                                            if (_GLF_WRAPPED_IF_FALSE(false)) {
                                            } else {
                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(true, !(!(true))))) {
                                                        if (_GLF_DEAD(false)) {
                                                            _GLF_color = _GLF_outlined_3();
                                                            if (_GLF_DEAD(false)) {
                                                                _GLF_color = vec4(4848.3210, -91.53, 53.31, -7993.9139);
                                                            }
                                                        }
                                                        GLF_live0p.x -= 16;
                                                    } else {
                                                    }
                                                } else {
                                                }
                                            }
                                        }
                                    } while (_GLF_WRAPPED_LOOP(false));
                                    for (int _injected_loop_counter = int(_GLF_ONE(1.0, injectionSwitch.y)); _GLF_WRAPPED_LOOP(_injected_loop_counter != (0 >> _GLF_IDENTITY(int(5), int(5)))); _injected_loop_counter--) {
                                        if (_GLF_DEAD(_GLF_FALSE(false, (_GLF_IDENTITY(gl_FragCoord, (_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)) ? gl_FragCoord : _GLF_FUZZED(GLF_live10_GLF_color))).x < log(1.0))))) {
                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                _GLF_IDENTITY(_GLF_color = _GLF_color, vec4(0.0, 0.0, 0.0, 0.0) + (_GLF_color = _GLF_color));
                                            } else {
                                            }
                                        }
                                    }
                                }
                            }
                        case 9:
                            data[i] = -5;
                            break;
                            for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                                if (_GLF_DEAD(false)) {
                                    discard;
                                    {
                                        vec2 GLF_live6pos = _GLF_FUZZED(vec2(-97.94, -_GLF_IDENTITY(2.6, (2.6) - 0.0)));
                                        vec3 GLF_live6setting = _GLF_FUZZED((vec3(-8.6, 9624.2787, 5624.7124) + 23.45));
                                        do {
                                            ;
                                            if (_GLF_DEAD(false)) {
                                                if (_GLF_DEAD(false)) {
                                                    return;
                                                }
                                                _GLF_color = vec4(89.19, 303.835, 71.74, 709.277);
                                            }
                                            {
                                                int GLF_live14i = _GLF_FUZZED(int(((-44822) == 27042)));
                                                float GLF_live14ref = _GLF_FUZZED((9867.2315 * float(41378)));
                                                float GLF_live14s = _GLF_FUZZED(-4.0);
                                                if (mod(float(GLF_live14i), GLF_live14ref) <= 0.01) {
                                                    GLF_live14s += 0.2;
                                                }
                                            }
                                        } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
                                    }
                                }
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = GLF_live7_GLF_color;
                                }
                            }
                    }
                    do {
                        if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        } else {
                            int GLF_live4i = _GLF_FUZZED(_GLF_IDENTITY(((-12988) - ((-88561) - (-18092))), 0 ^ (((-12988) - ((-88561) - (-18092))))));
                            {
                                {
                                    ;
                                }
                            }
                            int GLF_live4iters = _GLF_FUZZED((~62199));
                            int GLF_live4looplimiter0 = 0;
                            int GLF_live4v = _GLF_FUZZED(_GLF_IDENTITY(-_GLF_IDENTITY(49557, ~(~(49557))), int(_GLF_IDENTITY(int(_GLF_IDENTITY(-_GLF_IDENTITY(49557, ~(~(49557))), (-_GLF_IDENTITY(49557, ~(~(49557)))) ^ 0)), min(int(_GLF_IDENTITY(-_GLF_IDENTITY(49557, ~(~(49557))), (-_GLF_IDENTITY(49557, ~(~(49557)))) ^ 0)), int(_GLF_IDENTITY(-_GLF_IDENTITY(49557, ~(~(49557))), (-_GLF_IDENTITY(49557, ~(_GLF_IDENTITY(~(49557), max(_GLF_IDENTITY(~(49557), 0 | (~(49557))), _GLF_IDENTITY(~(49557), (~(49557)) | 0)))))) ^ 0)))))));
                            {
                                int GLF_live14i = _GLF_FUZZED(-67832);
                                float GLF_live14limit = _GLF_FUZZED((+(true ? (-190.729) : (-6.5))));
                                float GLF_live14ref = _GLF_FUZZED(635.293);
                                float GLF_live14s = _GLF_FUZZED(-61.35);
                                {
                                    if (mod(float(GLF_live14i), GLF_live14ref) <= 0.01) {
                                        GLF_live14s += 0.2;
                                    }
                                    if (float(GLF_live14i) >= GLF_live14limit) {
                                        ;
                                    }
                                    GLF_live14i++;
                                }
                            }
                            if (_GLF_WRAPPED_IF_FALSE(false)) {
                            } else {
                                for (GLF_live4i = _GLF_outlined_7(); GLF_live4i < GLF_live4iters; GLF_live4i++) {
                                    if (GLF_live4looplimiter0 >= 3) {
                                        break;
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                            _GLF_color = (_GLF_IDENTITY((-19.62) / vec4(3402.4759, -2.9, 86.31, 0.7), (_GLF_IDENTITY(_GLF_IDENTITY((-19.62) / vec4(3402.4759, -2.9, 86.31, 0.7), max((-19.62) / vec4(3402.4759, -2.9, 86.31, 0.7), (-19.62) / vec4(3402.4759, -2.9, 86.31, 0.7))), (_GLF_IDENTITY((-19.62) / vec4(3402.4759, -2.9, 86.31, 0.7), max((-19.62) / vec4(3402.4759, -2.9, 86.31, 0.7), (-19.62) / vec4(3402.4759, -2.9, 86.31, 0.7)))) * vec4(1.0, 1.0, 1.0, 1.0))) - vec4(0.0, 0.0, 0.0, 0.0)));
                                        }
                                    }
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        if (_GLF_DEAD(false)) {
                                            break;
                                        }
                                        GLF_live4looplimiter0++;
                                    } else {
                                    }
                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                        if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                        } else {
                                            GLF_live4v = _GLF_outlined_17(GLF_live4v);
                                        }
                                    } else {
                                    }
                                }
                                {
                                    vec4 GLF_live14c = _GLF_FUZZED(vec4(-47.79, 5.2, 6.6, -946.952));
                                    int GLF_live14i = _GLF_FUZZED((false ? 67153 : ivec3(15842, -82511, 50307).r));
                                    {
                                        GLF_live14c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14i, 4)] = GLF_live14c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14i, 4)] * GLF_live14c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14i, 4)];
                                    }
                                }
                            }
                            if (_GLF_DEAD(false)) {
                                _GLF_color = vec4(injectionSwitch, _GLF_IDENTITY(-7.0, min(_GLF_IDENTITY(-7.0, (false ? _GLF_FUZZED(-7445.6068) : _GLF_IDENTITY(-7.0, 1.0 * (-7.0)))), _GLF_IDENTITY(-7.0, float(vec2(-7.0, 1.0))))), 2.0);
                            }
                            if (_GLF_DEAD(false)) {
                                _GLF_color = _GLF_color;
                            }
                        }
                    } while (_GLF_WRAPPED_LOOP(false));
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        _GLF_color = pow(atan(vec4(65.24, 44.14, 443.525, -5.3), GLF_live7_GLF_color), _GLF_IDENTITY(GLF_live10_GLF_color, (GLF_live10_GLF_color) * mat4(1.0)));
                    }
                    {
                        {
                            ;
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        _GLF_color = GLF_live7_GLF_color;
                    }
                    do {
                        if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_IDENTITY(0.0, (_GLF_IDENTITY(0.0, clamp(0.0, 0.0, _GLF_IDENTITY(0.0, float(mat3(0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0)))))) + 0.0))))) {
                            if (_GLF_DEAD(false)) {
                                _GLF_color = _GLF_outlined_18(GLF_live7_GLF_color);
                            }
                        } else {
                            i++;
                        }
                        if (_GLF_WRAPPED_IF_FALSE(false)) {
                        } else {
                            if (_GLF_DEAD(false)) {
                                _GLF_color = vec4(91.86, 660.205, 8498.5444, 916.679);
                            }
                        }
                    } while (_GLF_WRAPPED_LOOP(false));
                } while (i < _GLF_IDENTITY(10, max(10, _GLF_IDENTITY(10, ~(~(10))))));
            } else {
            }
        } while (_GLF_WRAPPED_LOOP(false));
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
        _GLF_color = _GLF_color;
    }
    for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
        for (int j = 0; j < 10; j++) {
            for (int _injected_loop_counter = int(_GLF_ONE(1.0, injectionSwitch.y)); _GLF_WRAPPED_LOOP(_injected_loop_counter > (0 & N)); _injected_loop_counter--) {
                temp[j] = data[j];
            }
        }
    }
    mergeSort();
    if (_GLF_DEAD(false)) {
        _GLF_color = refract(vec4(-3279.1064, -7742.2820, 1.6, -194.550), vec4(_GLF_IDENTITY(6.3, (_GLF_IDENTITY(6.3, (false ? _GLF_FUZZED(-4041.7590) : 6.3))) - 0.0), -21.10, -7.0, 1.3), -7.3);
        {
            do {
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    if (_GLF_DEAD(false)) {
                        return;
                    }
                    return;
                    if (_GLF_DEAD(false)) {
                        _GLF_color = GLF_live7_GLF_color;
                    }
                }
            } while (_GLF_WRAPPED_LOOP(false));
            float GLF_live7A = _GLF_FUZZED(((80049 == 90590) ? 2.2 : (vec2(8.2, 3.4).s - 454.552)));
            float GLF_live7B = _GLF_FUZZED(-5.1);
            float GLF_live7C = _GLF_FUZZED((-(-5.2)));
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                return;
            }
            int GLF_live7looplimiter0 = 0;
            float GLF_live7temp = _GLF_FUZZED(0.9);
            float GLF_live7x0 = _GLF_FUZZED(float(-36100));
            float GLF_live7x1 = _GLF_FUZZED(-3.1);
            float GLF_live7x2 = _GLF_FUZZED(((-62.61) + (-1.4)));
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                return;
            }
            while (abs(GLF_live7x2 - GLF_live7x1) >= .000000000000001) {
                if (GLF_live7looplimiter0 >= 3) {
                    break;
                }
                GLF_live7looplimiter0++;
                if (_GLF_WRAPPED_IF_FALSE(false)) {
                } else {
                    float GLF_live7h0 = GLF_live7x0 - GLF_live7x2;
                    float GLF_live7h1 = GLF_live7x1 - GLF_live7x2;
                    float GLF_live7k0 = GLF_live7fx(GLF_live7x0) - GLF_live7fx(GLF_live7x2);
                    float GLF_live7k1 = GLF_live7fx(GLF_live7x1) - GLF_live7fx(GLF_live7x2);
                    if (_GLF_WRAPPED_IF_FALSE(false)) {
                    } else {
                        for (int _injected_loop_counter = _GLF_IDENTITY(1, ~(_GLF_IDENTITY(~(1), (_GLF_IDENTITY(~(1), max(~(1), ~(1)))) + 0))); _GLF_WRAPPED_LOOP(_injected_loop_counter > (0 >> _GLF_IDENTITY(int(6), int(6)))); _injected_loop_counter--) {
                            GLF_live7temp = GLF_live7x2;
                        }
                    }
                    GLF_live7A = (((GLF_live7h1) * (GLF_live7k0)) - ((GLF_live7h0) * (GLF_live7k1))) / ((pow((GLF_live7h0), 2.0) * (GLF_live7h1)) - (pow((GLF_live7h1), 2.0) * (GLF_live7h0)));
                    GLF_live7B = (((GLF_live7k0) - (GLF_live7A * (pow((GLF_live7h0), _GLF_IDENTITY(2.0, (_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)) ? _GLF_IDENTITY(2.0, 0.0 + (2.0)) : _GLF_FUZZED(GLF_live7h0))))))) / (GLF_live7h0));
                    GLF_live7C = GLF_live7fx(GLF_live7x2);
                    GLF_live7x2 = GLF_live7x2 - ((2.0 * GLF_live7C) / (GLF_live7B + sign(GLF_live7B) * sqrt(pow(GLF_live7B, 2.0) - (4.0 * GLF_live7A * GLF_live7C))));
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        _GLF_color = GLF_live10_GLF_color;
                        if (_GLF_DEAD(false)) {
                            continue;
                        }
                    }
                    GLF_live7x0 = GLF_live7x1;
                    if (_GLF_WRAPPED_IF_FALSE(false)) {
                    } else {
                        _GLF_IDENTITY(GLF_live7x1 = GLF_live7temp, (true ? (GLF_live7x1 = GLF_live7temp) : _GLF_IDENTITY(_GLF_FUZZED(GLF_live7C), (false ? _GLF_FUZZED(GLF_live7x0) : _GLF_IDENTITY(_GLF_FUZZED(GLF_live7C), (false ? _GLF_FUZZED(GLF_live7x2) : _GLF_FUZZED(GLF_live7C)))))));
                    }
                    if (_GLF_DEAD(false)) {
                        _GLF_color = _GLF_color;
                    }
                }
            }
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            if (_GLF_DEAD(false)) {
                return;
            }
            do {
                return;
            } while (_GLF_WRAPPED_LOOP(false));
        }
    }
    float grey;
    if (int(gl_FragCoord[1]) < 30) {
        do {
            do {
                float GLF_live1A = _GLF_FUZZED(3.8);
                float GLF_live1B = _GLF_FUZZED(_GLF_IDENTITY(float(-24111), max(float(-24111), float(-_GLF_IDENTITY(24111, (_GLF_IDENTITY(24111, (24111) | (24111))) / 1)))));
                if (_GLF_DEAD(false)) {
                    _GLF_color = log(GLF_live10_GLF_color);
                }
                float GLF_live1C = _GLF_FUZZED((6328.8791));
                int GLF_live1looplimiter0 = 0;
                float GLF_live1temp = _GLF_FUZZED(137.621);
                {
                    vec2 GLF_live10coord = _GLF_IDENTITY(_GLF_FUZZED((vec4(-41.39, -783.928, 7199.2215, -82.66) * mat2x4(mat2(-517.003, 281.141, -4.4, -58.11)))), max(_GLF_IDENTITY(_GLF_FUZZED((vec4(-41.39, -783.928, 7199.2215, -82.66) * mat2x4(mat2(-517.003, 281.141, -4.4, -58.11)))), mix(vec2((_GLF_FUZZED((vec4(-41.39, _GLF_IDENTITY(-783.928, min(-783.928, _GLF_IDENTITY(-783.928, (-783.928) / 1.0))), 7199.2215, -82.66) * mat2x4(mat2(-517.003, 281.141, -4.4, -58.11)))))[0], (_GLF_FUZZED((vec4(-41.39, -783.928, 7199.2215, -82.66) * mat2x4(mat2(-517.003, 281.141, -4.4, -58.11)))))[1]), vec2(_GLF_FUZZED(8.0), _GLF_FUZZED(-6791.1360)), bvec2(false, false))), _GLF_FUZZED((vec4(-41.39, -783.928, 7199.2215, -82.66) * mat2x4(mat2(-517.003, 281.141, -4.4, -58.11))))));
                    {
                        if (_GLF_DEAD(false)) {
                            continue;
                        }
                        ivec2 GLF_live10icoord = ivec2(((GLF_live10coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.6, 1.0)) * 256.0);
                        int GLF_live10v = (GLF_live10icoord.x ^ GLF_live10icoord.y) * GLF_live10icoord.y;
                        bool GLF_live10res1 = ((GLF_live10v >> 10) & 1) != 0;
                        bool GLF_live10res2 = ((GLF_live10v >> 11) & 4) != 0;
                        bool GLF_live10res3 = (_GLF_IDENTITY((GLF_live10v >> 12), ((GLF_live10v >> 12)) >> 0) & 8) != 0;
                        GLF_live10_GLF_color = _GLF_outlined_8(GLF_live10res1, GLF_live10res2, GLF_live10res3);
                    }
                }
                float GLF_live1x0 = _GLF_FUZZED((float(57177) - vec2(828.451, -374.524).r));
                float GLF_live1x1 = _GLF_FUZZED(-61.28);
                if (_GLF_DEAD(false)) {
                    for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != (1 ^ 0)); _injected_loop_counter++) {
                        if (_GLF_DEAD(false)) {
                            _GLF_color = _GLF_color;
                            if (_GLF_DEAD(false)) {
                                _GLF_color = abs(_GLF_IDENTITY(_GLF_color, (false ? _GLF_FUZZED(vec4(-27.73, 789.843, 2571.6763, -8756.4748)) : _GLF_color)));
                            }
                        }
                    }
                    return;
                    if (_GLF_DEAD(false)) {
                        continue;
                    }
                }
                float GLF_live1x2 = _GLF_FUZZED(((-314.816) - (-4.8)));
                do {
                    while (abs(GLF_live1x2 - GLF_live1x1) >= .000000000000001) {
                        if (_GLF_WRAPPED_IF_FALSE(false)) {
                        } else {
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                discard;
                            }
                        }
                        for (int _injected_loop_counter = ((1 << _GLF_IDENTITY(int(1), int(1))) >> _GLF_IDENTITY(int(1), int(1))); _GLF_WRAPPED_LOOP(_injected_loop_counter > _GLF_IDENTITY(_GLF_IDENTITY(int(_GLF_ZERO(0.0, injectionSwitch.x)), clamp(int(_GLF_ZERO(0.0, injectionSwitch.x)), _GLF_IDENTITY(int(_GLF_ZERO(0.0, injectionSwitch.x)), max(int(_GLF_ZERO(0.0, injectionSwitch.x)), int(_GLF_ZERO(0.0, injectionSwitch.x)))), int(_GLF_ZERO(0.0, injectionSwitch.x)))), clamp(_GLF_IDENTITY(_GLF_IDENTITY(int(_GLF_ZERO(0.0, injectionSwitch.x)), clamp(int(_GLF_ZERO(0.0, injectionSwitch.x)), _GLF_IDENTITY(int(_GLF_ZERO(0.0, injectionSwitch.x)), max(int(_GLF_ZERO(0.0, injectionSwitch.x)), int(_GLF_ZERO(0.0, injectionSwitch.x)))), int(_GLF_ZERO(0.0, injectionSwitch.x)))), (_GLF_IDENTITY(int(_GLF_ZERO(0.0, injectionSwitch.x)), clamp(int(_GLF_ZERO(0.0, injectionSwitch.x)), _GLF_IDENTITY(int(_GLF_ZERO(0.0, injectionSwitch.x)), max(int(_GLF_ZERO(0.0, injectionSwitch.x)), int(_GLF_ZERO(0.0, injectionSwitch.x)))), int(_GLF_ZERO(0.0, injectionSwitch.x))))) ^ 0), _GLF_IDENTITY(_GLF_IDENTITY(int(_GLF_ZERO(0.0, injectionSwitch.x)), clamp(int(_GLF_ZERO(0.0, injectionSwitch.x)), _GLF_IDENTITY(int(_GLF_ZERO(0.0, injectionSwitch.x)), max(int(_GLF_ZERO(0.0, injectionSwitch.x)), int(_GLF_ZERO(0.0, injectionSwitch.x)))), int(_GLF_ZERO(0.0, injectionSwitch.x)))), ~(~(_GLF_IDENTITY(int(_GLF_ZERO(0.0, injectionSwitch.x)), clamp(int(_GLF_ZERO(0.0, injectionSwitch.x)), _GLF_IDENTITY(int(_GLF_ZERO(0.0, injectionSwitch.x)), max(int(_GLF_ZERO(0.0, injectionSwitch.x)), int(_GLF_ZERO(0.0, injectionSwitch.x)))), int(_GLF_ZERO(0.0, injectionSwitch.x))))))), _GLF_IDENTITY(int(_GLF_ZERO(0.0, injectionSwitch.x)), clamp(int(_GLF_ZERO(0.0, injectionSwitch.x)), _GLF_IDENTITY(int(_GLF_ZERO(0.0, injectionSwitch.x)), max(int(_GLF_ZERO(0.0, injectionSwitch.x)), int(_GLF_ZERO(0.0, injectionSwitch.x)))), int(_GLF_ZERO(0.0, injectionSwitch.x))))))); _injected_loop_counter--) {
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                do {
                                    _GLF_color = _GLF_outlined_9();
                                } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))));
                            }
                        }
                        if (_GLF_DEAD(false)) {
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (_GLF_IDENTITY(injectionSwitch.x, 0.0 + (injectionSwitch.x)) < injectionSwitch.y)))) {
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    _GLF_color = _GLF_outlined_4(_GLF_IDENTITY(_GLF_color, (true ? _GLF_IDENTITY(_GLF_color, (false ? _GLF_FUZZED(sin(GLF_live7_GLF_color)) : _GLF_color)) : _GLF_FUZZED(_GLF_color))));
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = (mat3x4(mat4x2(-1.2, -56.43, -8744.6977, 6.1, -4906.1914, 4.3, -1.8, 4700.4742)) * GLF_live1polynomial);
                                    }
                                }
                                if (_GLF_DEAD(false)) {
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < abs(0.0))))) {
                                        {
                                            int GLF_live14looplimiter0 = 0;
                                            if (GLF_live14looplimiter0 >= 3) {
                                                ;
                                            }
                                        }
                                        return;
                                    }
                                    _GLF_color = GLF_live10_GLF_color;
                                }
                            } else {
                            }
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= log(1.0))))) {
                                return;
                            } else {
                            }
                        }
                        if (GLF_live1looplimiter0 >= 5) {
                            break;
                        }
                        {
                            {
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                    _GLF_color = GLF_live7_GLF_color;
                                }
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    return;
                                }
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < determinant(mat3(0.0, length(0.0), abs(1.0), determinant(mat4(0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0)), 0.0, 1.0, 0.0, 0.0, 0.0)))))) {
                                    _GLF_color = GLF_live10_GLF_color;
                                }
                                if (_GLF_WRAPPED_IF_FALSE(false)) {
                                } else {
                                    GLF_live7_GLF_color = vec4(0.0, 1.0, _GLF_IDENTITY(0.0, (0.0) * 1.0), 1.0);
                                }
                            }
                        }
                        GLF_live1looplimiter0++;
                        if (_GLF_DEAD(_GLF_FALSE(false, _GLF_IDENTITY((gl_FragCoord.x < _GLF_ZERO(0.0, injectionSwitch.x)), false || ((gl_FragCoord.x < _GLF_ZERO(0.0, injectionSwitch.x))))))) {
                            break;
                        }
                        {
                            {
                                vec4 GLF_live14c = _GLF_FUZZED(vec4(-556.467, vec3(-1912.0060, 9893.0911, 5409.3248)));
                                int GLF_live14i = _GLF_FUZZED(80952);
                                int GLF_live14looplimiter1 = 0;
                                int GLF_live14msb8 = _GLF_FUZZED((69849 + (-2112)));
                                do {
                                    if (GLF_live14looplimiter1 >= 3) {
                                        break;
                                    }
                                    GLF_live14looplimiter1++;
                                    {
                                        if (GLF_live14c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14i, 4)] >= 1.0) {
                                            GLF_live14c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14i, 4)] = GLF_live14c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14i, 4)] * GLF_live14c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14i, 4)];
                                        }
                                        GLF_live14i++;
                                    }
                                } while (GLF_live14i < findMSB(findLSB(GLF_live14msb8)));
                            }
                            float GLF_live1h0 = GLF_live1x0 - GLF_live1x2;
                            float GLF_live1h1 = GLF_live1x1 - GLF_live1x2;
                            float GLF_live1k0 = GLF_live1fx(GLF_live1x0) - GLF_live1fx(GLF_live1x2);
                            if (_GLF_DEAD(false)) {
                                _GLF_color = clamp(vec4(68.71, 86.07, 1.4, 14.17), GLF_live1C, GLF_live1C);
                            }
                            float GLF_live1k1 = GLF_live1fx(GLF_live1x1) - GLF_live1fx(GLF_live1x2);
                            if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                            } else {
                                GLF_live1temp = GLF_live1x2;
                            }
                            if (_GLF_DEAD(false)) {
                                do {
                                    if (_GLF_DEAD(_GLF_IDENTITY(false, !(!(false))))) {
                                        _GLF_color = vec4(-585.711, 83.96, -48.42, 7.1);
                                    }
                                } while (_GLF_WRAPPED_LOOP(false));
                                break;
                            }
                            GLF_live1A = (((GLF_live1h1) * (GLF_live1k0)) - ((_GLF_IDENTITY(GLF_live1h0, clamp(GLF_live1h0, GLF_live1h0, GLF_live1h0))) * (GLF_live1k1))) / ((pow((GLF_live1h0), 2.0) * (GLF_live1h1)) - (pow((GLF_live1h1), _GLF_IDENTITY(2.0, min(2.0, _GLF_IDENTITY(2.0, (true ? 2.0 : _GLF_FUZZED(GLF_live1temp)))))) * (GLF_live1h0)));
                            if (_GLF_DEAD(_GLF_IDENTITY(false, (false) && true))) {
                                break;
                            }
                            for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
                                for (int _injected_loop_counter = int(_GLF_ONE(1.0, injectionSwitch.y)); _GLF_WRAPPED_LOOP(_injected_loop_counter != (0 << _GLF_IDENTITY(int(6), int(6)))); _injected_loop_counter--) {
                                    GLF_live1B = (((GLF_live1k0) - (GLF_live1A * (pow((GLF_live1h0), 2.0)))) / (GLF_live1h0));
                                }
                                {
                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (_GLF_IDENTITY(gl_FragCoord, (true ? gl_FragCoord : _GLF_FUZZED(GLF_live7_GLF_color))).x >= 0.0)))) {
                                        GLF_live7_GLF_color = _GLF_outlined_10();
                                    } else {
                                    }
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                        _GLF_color = ((true ? GLF_live1temp : GLF_live1h1) * _GLF_color);
                                    }
                                }
                            }
                            GLF_live1C = GLF_live1fx(GLF_live1x2);
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                _GLF_color = _GLF_color;
                            }
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                if (_GLF_DEAD(false)) {
                                    if (_GLF_WRAPPED_IF_FALSE(false)) {
                                    } else {
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < sqrt(0.0))))) {
                                            _GLF_color = mod(_GLF_color, GLF_live10_GLF_color);
                                        }
                                        do {
                                            return;
                                        } while (_GLF_WRAPPED_LOOP(false));
                                    }
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = fwidthCoarse(asin(_GLF_IDENTITY(mat2x4(-1088.7496, -76.43, 857.634, -395.837, 256.627, 9687.7753, 9.4, -4.5)[_GLF_IDENTITY(0, ~(~(_GLF_IDENTITY(0, (0) | 0))))], mat4(1.0) * (mat2x4(-1088.7496, -76.43, 857.634, -395.837, 256.627, 9687.7753, 9.4, -4.5)[_GLF_IDENTITY(0, ~(~(_GLF_IDENTITY(0, (0) | 0))))]))));
                                    }
                                }
                                {
                                    {
                                        ;
                                    }
                                }
                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                    for (int _injected_loop_counter = ((1 << _GLF_IDENTITY(int(6), int(6))) >> _GLF_IDENTITY(int(6), _GLF_IDENTITY(int(6), clamp(_GLF_IDENTITY(int(6), 0 + (int(_GLF_IDENTITY(6, min(6, _GLF_IDENTITY(6, (_GLF_IDENTITY(6, int(ivec4(6, 1, 1, 0)))) ^ 0)))))), int(6), int(6))))); _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
                                        GLF_live1x2 = _GLF_outlined_11(GLF_live1x2, GLF_live1C, GLF_live1B, GLF_live1A);
                                        if (_GLF_DEAD(false)) {
                                            {
                                                int GLF_live14i = _GLF_FUZZED((false ? 61502 : int((vec4(12.50, -350.240, -2.4, -302.071) != vec4(0.6, 2.4, -31.39, 1.4)))));
                                                float GLF_live14limit = _GLF_FUZZED(float(false));
                                                int GLF_live14looplimiter0 = 0;
                                                float GLF_live14ref = _GLF_FUZZED(float(true));
                                                float GLF_live14s = _GLF_FUZZED(8.2);
                                                while (GLF_live14i < bitfieldInsert(800, GLF_live14i, 0, 0)) {
                                                    if (GLF_live14looplimiter0 >= 3) {
                                                        break;
                                                    }
                                                    GLF_live14looplimiter0++;
                                                    {
                                                        if (mod(float(GLF_live14i), GLF_live14ref) <= 0.01) {
                                                            GLF_live14s += 0.2;
                                                        }
                                                        if (float(GLF_live14i) >= GLF_live14limit) {
                                                            ;
                                                        }
                                                        GLF_live14i++;
                                                    }
                                                }
                                            }
                                            _GLF_color = vec4(vec2(mat4(987.772, 97.25, 5974.3659, -611.417, 2112.7953, -10.18, 7463.5746, 0.4, 19.57, 5.4, -581.290, 8.0, -465.841, 215.088, -1376.2764, -3128.9792)[2]), GLF_live1x1, -6.0);
                                            {
                                                int GLF_live14looplimiter1 = 0;
                                                if (GLF_live14looplimiter1 >= 3) {
                                                    ;
                                                }
                                            }
                                        }
                                        if (_GLF_IDENTITY(_GLF_DEAD(_GLF_IDENTITY(false, bool(bvec3(_GLF_IDENTITY(_GLF_IDENTITY(false, !(!(false))), (_GLF_IDENTITY(false, !(!(false)))) || _GLF_FALSE(false, (_GLF_IDENTITY(gl_FragCoord.x < 0.0, _GLF_IDENTITY(bool(bvec2(gl_FragCoord.x < 0.0, false)), !(!(bool(bvec2(gl_FragCoord.x < 0.0, false))))))))), true, true)))), bool(_GLF_IDENTITY(bvec3(_GLF_IDENTITY(_GLF_DEAD(_GLF_IDENTITY(false, bool(bvec3(_GLF_IDENTITY(_GLF_IDENTITY(false, !(!(false))), (_GLF_IDENTITY(false, !(!(false)))) || _GLF_FALSE(false, (_GLF_IDENTITY(gl_FragCoord.x < 0.0, _GLF_IDENTITY(bool(bvec2(gl_FragCoord.x < 0.0, false)), !(!(bool(bvec2(gl_FragCoord.x < 0.0, false))))))))), true, true)))), !(!(_GLF_DEAD(_GLF_IDENTITY(false, bool(bvec3(_GLF_IDENTITY(_GLF_IDENTITY(false, !(!(false))), (_GLF_IDENTITY(false, !(!(false)))) || _GLF_FALSE(false, (_GLF_IDENTITY(gl_FragCoord.x < 0.0, _GLF_IDENTITY(bool(bvec2(gl_FragCoord.x < 0.0, false)), !(!(bool(bvec2(gl_FragCoord.x < 0.0, false))))))))), true, true))))))), false, false), bvec3(bvec3(bvec3(_GLF_IDENTITY(_GLF_DEAD(_GLF_IDENTITY(false, bool(bvec3(_GLF_IDENTITY(_GLF_IDENTITY(false, !(!(false))), (_GLF_IDENTITY(false, !(!(false)))) || _GLF_FALSE(false, (_GLF_IDENTITY(gl_FragCoord.x < 0.0, _GLF_IDENTITY(bool(bvec2(gl_FragCoord.x < 0.0, false)), !(!(bool(bvec2(gl_FragCoord.x < 0.0, false))))))))), true, true)))), !(!(_GLF_DEAD(_GLF_IDENTITY(false, bool(bvec3(_GLF_IDENTITY(_GLF_IDENTITY(false, !(!(false))), (_GLF_IDENTITY(false, !(!(false)))) || _GLF_FALSE(false, (_GLF_IDENTITY(gl_FragCoord.x < 0.0, _GLF_IDENTITY(bool(bvec2(gl_FragCoord.x < 0.0, false)), !(!(bool(bvec2(gl_FragCoord.x < 0.0, false))))))))), true, true))))))), false, false))))))) {
                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                discard;
                                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                    return;
                                                    if (_GLF_DEAD(false)) {
                                                        _GLF_color = GLF_live7_GLF_color;
                                                    }
                                                }
                                            } else {
                                            }
                                        }
                                    }
                                } else {
                                }
                            } else {
                                {
                                    {
                                        ;
                                    }
                                }
                            }
                            GLF_live1x0 = GLF_live1x1;
                            GLF_live1x1 = _GLF_IDENTITY(GLF_live1temp, (false ? _GLF_FUZZED(GLF_live1h0) : _GLF_IDENTITY(GLF_live1temp, _GLF_IDENTITY((GLF_live1temp) + 0.0, mix(float((GLF_live1temp) + 0.0), float(_GLF_IDENTITY(_GLF_FUZZED(-488.268), (_GLF_FUZZED(-488.268)) - 0.0)), bool(false))))));
                            if (_GLF_DEAD(_GLF_IDENTITY(false, (false) && _GLF_IDENTITY(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)), !(_GLF_IDENTITY(!(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y))), !(!(!(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y))))))))))) {
                                break;
                            }
                        }
                        if (_GLF_DEAD(false)) {
                            {
                                {
                                    ;
                                }
                            }
                            _GLF_color = vec4(vec3(8.9, 8.2, -79.09), GLF_live1x0);
                        }
                    }
                } while (_GLF_WRAPPED_LOOP(false));
                if (_GLF_DEAD(false)) {
                    do {
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = (_GLF_color + (-934.288));
                        } else {
                        }
                    } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
                    {
                        vec2 GLF_live10coord = _GLF_FUZZED(vec2(-3405.6347, -9.2));
                        {
                            if (GLF_live10coord.y < 0.6) {
                                if (_GLF_DEAD(_GLF_IDENTITY(false, bool(bool(false))))) {
                                    _GLF_color = tan(vec4(23.87, 2.1, -7.2, -5.4));
                                }
                                uvec2 GLF_live10icoord = uvec2((_GLF_IDENTITY((GLF_live10coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6), mix(vec2(_GLF_FUZZED(vec4(79.27, 83.82, 252.923, 7.6).w), ((GLF_live10coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6))[1]), vec2((_GLF_IDENTITY((GLF_live10coord - vec2(0.4, 0.0)), max((GLF_live10coord - vec2(0.4, 0.0)), _GLF_IDENTITY((GLF_live10coord - vec2(0.4, 0.0)), vec2(mat3x4((GLF_live10coord - vec2(0.4, 0.0)), 1.0, 0.0, 1.0, 1.0, 1.0, exp(0.0), 1.0, 0.0, 0.0, 1.0))))) * vec2(1.0 / 0.4, 1.0 / 0.6))[0], _GLF_FUZZED(-1486.2510)), bvec2(true, false)))) * 256.0);
                                uint GLF_live10res1 = uint(((GLF_live10icoord.x * _GLF_IDENTITY(GLF_live10icoord, uvec2(_GLF_IDENTITY(uvec4(GLF_live10icoord, 1u, 0u), clamp(uvec4(GLF_live10icoord, 1u, 0u), uvec4(GLF_live10icoord, 1u, 0u), uvec4(GLF_live10icoord, 1u, 0u))))).y) >> (GLF_live10icoord.x & 31u)) & 0xffffffffu);
                                uint GLF_live10res2 = uint(((GLF_live10icoord.x * GLF_live10icoord.y) << (GLF_live10icoord.x & 31u)) & 0xffffffffu);
                                float GLF_live10res = float(((GLF_live10res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_live10res1 & 1u) != 0u ? 1u : 0u));
                                if (_GLF_DEAD(false)) {
                                    return;
                                }
                                do {
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                        {
                                            int GLF_live14i = _GLF_FUZZED(93463);
                                            float GLF_live14ref = _GLF_FUZZED(((-8.8) + (-9.4)));
                                            float GLF_live14s = _GLF_FUZZED((false ? 0.1 : (-3550.4272)));
                                            if (mod(float(GLF_live14i), GLF_live14ref) <= 0.01) {
                                                GLF_live14s += 0.2;
                                            }
                                        }
                                        do {
                                            discard;
                                        } while (_GLF_WRAPPED_LOOP(false));
                                    }
                                } while (_GLF_WRAPPED_LOOP(false));
                                for (int _injected_loop_counter = ((_GLF_IDENTITY(1 << _GLF_IDENTITY(int(5), int(5)), (1 << _GLF_IDENTITY(int(5), int(5))) >> 0)) >> _GLF_IDENTITY(int(5), int(5))); _GLF_WRAPPED_LOOP(_injected_loop_counter != (0 >> _GLF_IDENTITY(int(1), _GLF_IDENTITY(int(1), 0 ^ (int(1)))))); _injected_loop_counter--) {
                                    if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                    } else {
                                        {
                                            int GLF_live14i = _GLF_FUZZED(-20408);
                                            float GLF_live14limit = _GLF_FUZZED(vec2(-5072.0650, -6500.7552).r);
                                            float GLF_live14s = _GLF_FUZZED((-(-4.6)));
                                            if (float(GLF_live14i) >= GLF_live14limit) {
                                                ;
                                            }
                                        }
                                        GLF_live10_GLF_color = _GLF_outlined_19(GLF_live10res);
                                    }
                                }
                            } else {
                                ivec2 GLF_live10icoord = ivec2(((GLF_live10coord - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, _GLF_IDENTITY(1.0, (_GLF_IDENTITY(1.0, (_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)) ? 1.0 : _GLF_FUZZED(GLF_live1A)))) * 1.0) / 0.4)) * 256.0);
                                int GLF_live10res3 = ((GLF_live10icoord.x >> 5) & 1) ^ ((GLF_live10icoord.y & 32) >> 5);
                                int GLF_live10res2 = (GLF_live10icoord.y * GLF_live10icoord.y >> 10) & 1;
                                int GLF_live10res1 = (GLF_live10icoord.x * GLF_live10icoord.y >> 9) & 1;
                                GLF_live10_GLF_color = vec4(float(GLF_live10res1 ^ GLF_live10res2), _GLF_IDENTITY(float(GLF_live10res2 & GLF_live10res3), min(float(GLF_live10res2 & GLF_live10res3), float(GLF_live10res2 & GLF_live10res3))), float(GLF_live10res1 | GLF_live10res3), 1.0);
                            }
                            {
                                int GLF_live12looplimiter1 = 0;
                                if (GLF_live12looplimiter1 >= 7) {
                                    ;
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
            } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.y < _GLF_IDENTITY(dot(vec3(0.0, 1.0, 1.0), vec3(exp(0.0), 0.0, 0.0)), dot(vec3(0.0, 1.0, 1.0), vec3(exp(0.0), 0.0, 0.0)))))));
        } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))));
        grey = _GLF_IDENTITY(0.5, (0.5) - 0.0) + _GLF_IDENTITY(float(data[0]), (float(data[0])) / cos(0.0)) / 10.0;
        do {
            if (_GLF_DEAD(_GLF_IDENTITY(false, !(_GLF_IDENTITY(!(false), bool(bool(!(false)))))))) {
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (_GLF_IDENTITY(injectionSwitch, (injectionSwitch) * mat2(1.0)).x < injectionSwitch.y)))) {
                        _GLF_color = clamp(cosh(_GLF_color), _GLF_color, faceforward(vec4(4.9, -8320.9489, -1.6, -92.37), vec4(93.54, 9467.1684, -397.386, -740.337), vec4(-665.658, 6.2, 14.57, 7.2)));
                    } else {
                    }
                } else {
                }
            }
        } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
    } else {
        if (int(gl_FragCoord[1]) < 60) {
            do {
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    grey = 0.5 + float(data[1]) / 10.0;
                } else {
                }
            } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))));
        } else {
            {
                vec2 GLF_live9coord = _GLF_FUZZED(vec2(493.747, 83.52));
                int GLF_live9looplimiter1 = 0;
                vec4 GLF_live9res = _GLF_FUZZED((vec4(31.90, -4.4, -99.39, 3.6) - vec4(-85.45, -8.1, -9.2, 9.3)));
                float GLF_live9uvstep = _GLF_FUZZED(92.61);
                for (int GLF_live9i = 0; GLF_live9i < 3; _GLF_IDENTITY(GLF_live9i++, (GLF_live9i++) | 0)) {
                    if (GLF_live9looplimiter1 >= 5) {
                        break;
                    }
                    GLF_live9looplimiter1++;
                    if (_GLF_DEAD(false)) {
                        continue;
                    }
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        do {
                            int GLF_live9looplimiter0 = 0;
                            for (int GLF_live9j = 0; GLF_live9j < 3; GLF_live9j++) {
                                if (GLF_live9looplimiter0 >= 5) {
                                    break;
                                    if (_GLF_DEAD(false)) {
                                        return;
                                    }
                                }
                                if (_GLF_WRAPPED_IF_FALSE(false)) {
                                } else {
                                    GLF_live9looplimiter0++;
                                }
                                {
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        GLF_live9res += texture(GLF_live9tex, GLF_live9coord + vec2(float(GLF_live9i - 1) * GLF_live9uvstep, float(GLF_live9j - 1) * GLF_live9uvstep)) * GLF_live9weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9i * 3 + GLF_live9j, 9)];
                                    } else {
                                    }
                                }
                            }
                        } while (_GLF_WRAPPED_LOOP(false));
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            return;
                        }
                        if (_GLF_DEAD(false)) {
                            _GLF_color = GLF_live10_GLF_color;
                        }
                    } else {
                    }
                    if (_GLF_DEAD(false)) {
                        _GLF_color = vec4(3141.5488, 9562.8610, -1.6, 2.3);
                        {
                            int GLF_live11looplimiter2 = 0;
                            if (GLF_live11looplimiter2 >= 3) {
                                ;
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
            if (_GLF_IDENTITY(_GLF_IDENTITY(int(gl_FragCoord[1]), (int(gl_FragCoord[1])) - ((0 << _GLF_IDENTITY(int(4), int(4))) >> _GLF_IDENTITY(int(5), int(5)))), (_GLF_IDENTITY(int(gl_FragCoord[1]), (int(gl_FragCoord[1])) - ((0 << _GLF_IDENTITY(int(4), int(4))) >> _GLF_IDENTITY(int(5), int(5))))) | (_GLF_IDENTITY(int(gl_FragCoord[1]), (int(gl_FragCoord[1])) - ((0 << _GLF_IDENTITY(int(4), int(4))) >> _GLF_IDENTITY(int(5), int(5)))))) < 90) {
                if (_GLF_DEAD(false)) {
                    _GLF_color = vec4(-5632.4642, -9776.0811, 0.0, 4.3);
                }
                if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(true, true && (true)))) {
                    ivec2 GLF_live3pos = _GLF_FUZZED(ivec2(23221, -83318));
                    if (GLF_live3pos.x < GLF_live3dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live3pos.y, 256)] + 15 && GLF_live3pos.x > GLF_live3dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live3pos.y, 256)] - 15) {
                        float GLF_live3p = (15.0 - abs(float(GLF_live3pos.x - GLF_live3dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live3pos.y, 256)]))) / 15.0;
                        if (_GLF_DEAD(false)) {
                            return;
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < abs(0.0))))) {
                            return;
                        }
                        {
                            if (_GLF_DEAD(false)) {
                                _GLF_color = GLF_live10_GLF_color;
                            }
                            float GLF_live8xCoord = _GLF_FUZZED(((-988.518) - 8.8));
                            float GLF_live8yCoord = _GLF_FUZZED((vec2(-2754.9458, -7.4).t * vec3(68.74, -5308.1048, -4612.8980).z));
                            if (_GLF_DEAD(false)) {
                                _GLF_color = unpackUnorm4x8(181901u);
                            }
                            {
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    ;
                                } else {
                                }
                            }
                        }
                        ;
                    }
                    if (_GLF_DEAD(false)) {
                        return;
                        if (_GLF_DEAD(false)) {
                            _GLF_color = vec4(-1289.8918, 1423.0269, 8792.7999, 43.67);
                        }
                    }
                } else {
                    if (_GLF_DEAD(false)) {
                        _GLF_color = exp2(min(GLF_live10_GLF_color, GLF_live7_GLF_color));
                    }
                }
                grey = 0.5 + float(data[2]) / 10.0;
            } else {
                for (int _injected_loop_counter = (0 << _GLF_IDENTITY(int(2), int(2))); _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
                    if (_GLF_IDENTITY(int(gl_FragCoord[1]), clamp(int(gl_FragCoord[1]), _GLF_IDENTITY(int(gl_FragCoord[1]), int(ivec3(int(gl_FragCoord[1]), (0 << _GLF_IDENTITY(int(5), _GLF_IDENTITY(int(5), max(int(5), _GLF_IDENTITY(int(5), (true ? int(5) : _GLF_FUZZED(_injected_loop_counter))))))), 1))), int(gl_FragCoord[1]))) < 120) {
                        grey = 0.5 + float(_GLF_IDENTITY(data[3], int(int(data[3])))) / 10.0;
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            discard;
                        }
                    } else {
                        if (_GLF_DEAD(false)) {
                            _GLF_color = (vec4(ceil(grey)) + (-8.9));
                        }
                        do {
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                if (int(gl_FragCoord[1]) < 150) {
                                    for (int _injected_loop_counter = int(_GLF_ONE(1.0, injectionSwitch.y)); _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                            _GLF_color = GLF_live10_GLF_color;
                                        }
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                            _GLF_color = fract(floor(_GLF_color));
                                        }
                                        discard;
                                    }
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = clamp(vec4(grey), step(856.107, grey), grey);
                                    }
                                } else {
                                    if (_GLF_DEAD(_GLF_IDENTITY(false, false || (false)))) {
                                        _GLF_color = (injectionSwitch * mat4x2(23.75, -45.42, 91.90, -4554.6848, -1042.2783, -9.6, 8.0, 0.2));
                                    }
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = vec4(7.6, 865.970, 5.1, 42.97);
                                    }
                                    for (int _injected_loop_counter = ((1 << _GLF_IDENTITY(int(6), int(6))) >> _GLF_IDENTITY(int(6), _GLF_IDENTITY(int(6), 0 ^ (int(6))))); _GLF_WRAPPED_LOOP(_GLF_IDENTITY(_injected_loop_counter != (1 ^ 1), !(_GLF_IDENTITY(!(_injected_loop_counter != (1 ^ 1)), false || (!(_GLF_IDENTITY(_injected_loop_counter, (_injected_loop_counter) | (_injected_loop_counter)) != (1 ^ 1))))))); _injected_loop_counter--) {
                                        if (int(gl_FragCoord[1]) < 180) {
                                            grey = 0.5 + float(data[5]) / 10.0;
                                        } else {
                                            do {
                                                if (int(gl_FragCoord[1]) < 210) {
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                        return;
                                                    }
                                                    {
                                                        bool GLF_live6c4 = _GLF_FUZZED((_GLF_IDENTITY(uvec4(41080u, 164497u, 30495u, 12811u), (uvec4(41080u, 164497u, 30495u, 12811u)) >> uvec4(0u, 0u, 0u, 0u)) == uvec4(166271u, 186993u, 5203u, 179821u)));
                                                        if (!GLF_live6c4) {
                                                            ;
                                                        }
                                                    }
                                                    grey = 0.5 + float(data[6]) / 10.0;
                                                    if (_GLF_DEAD(_GLF_IDENTITY(false, false || (false)))) {
                                                        _GLF_color = fwidthCoarse(faceforward(vec4(0.2, 3553.3046, -842.376, 1.7), GLF_live10_GLF_color, vec4(3.9, 319.478, -2.3, -1.8)));
                                                    }
                                                } else {
                                                    if (_GLF_DEAD(false)) {
                                                        _GLF_color = log(GLF_live10_GLF_color);
                                                    }
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                        break;
                                                    }
                                                    if (int(_GLF_IDENTITY(gl_FragCoord[1], max(_GLF_IDENTITY(gl_FragCoord[1], clamp(gl_FragCoord[1], gl_FragCoord[1], gl_FragCoord[1])), _GLF_IDENTITY(gl_FragCoord[1], clamp(gl_FragCoord[1], gl_FragCoord[1], gl_FragCoord[1]))))) < _GLF_IDENTITY(240, max(240, 240))) {
                                                        grey = _GLF_IDENTITY(0.5, float(mat2x3(0.5, 1.0, determinant(mat3(0.0, 0.0, 0.0, cos(0.0), 0.0, 0.0, 1.0, determinant(mat4(1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 0.0, 1.0)), 0.0)), 1.0, 1.0, 1.0))) + float(data[7]) / 10.0;
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                            _GLF_color = smoothstep((+_GLF_color), vec4(-38.28, -6848.7138, -2.1, -393.645), (vec4(7413.1810, 985.747, 4.6, 425.358) * 7.7));
                                                        }
                                                    } else {
                                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                            {
                                                                {
                                                                    ;
                                                                }
                                                            }
                                                            if (int(gl_FragCoord[1]) < 270) {
                                                                grey = 0.5 + float(data[8]) / 10.0;
                                                            } else {
                                                                {
                                                                    {
                                                                        ;
                                                                    }
                                                                }
                                                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                                                    if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                                    } else {
                                                                        discard;
                                                                    }
                                                                } else {
                                                                }
                                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                                    return;
                                                                }
                                                            }
                                                        } else {
                                                        }
                                                    }
                                                }
                                            } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
                                        }
                                    }
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = _GLF_color;
                                    }
                                    {
                                        float GLF_live7x2 = _GLF_FUZZED(_GLF_IDENTITY(5808.4739, (false ? _GLF_FUZZED(grey) : 5808.4739)));
                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                            if (GLF_live7x2 <= -0.9 && GLF_live7x2 >= -1.1) {
                                                _GLF_IDENTITY(GLF_live7_GLF_color = vec4(1.0, 0.0, 0.0, 1.0), sqrt(vec4(0.0, 0.0, 0.0, 0.0)) + (GLF_live7_GLF_color = vec4(1.0, 0.0, 0.0, 1.0)));
                                            } else {
                                                GLF_live7_GLF_color = vec4(0.0, 1.0, 0.0, 1.0);
                                            }
                                        } else {
                                        }
                                    }
                                }
                            } else {
                            }
                            if (_GLF_DEAD(false)) {
                                _GLF_color = _GLF_outlined_20();
                            }
                        } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
                    }
                }
            }
        }
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            if (_GLF_DEAD(false)) {
                _GLF_color = fma(GLF_live7_GLF_color, vec4(-526.543, 86.38, 820.226, -306.823), _GLF_IDENTITY(GLF_live10_GLF_color, (_GLF_IDENTITY(GLF_live10_GLF_color, vec4(GLF_live10_GLF_color[0], GLF_live10_GLF_color[1], GLF_live10_GLF_color[2], GLF_live10_GLF_color[3]))) - tan(vec4(_GLF_ZERO(0.0, injectionSwitch.x), _GLF_ZERO(0.0, injectionSwitch.x), _GLF_ZERO(0.0, injectionSwitch.x), _GLF_ZERO(0.0, injectionSwitch.x)))));
            }
            int GLF_live2msb8 = _GLF_FUZZED((16451 + 7032));
            if (_GLF_DEAD(false)) {
                _GLF_color = vec4(_GLF_IDENTITY(-2.2, clamp(_GLF_IDENTITY(-2.2, (-2.2) + 0.0), _GLF_IDENTITY(-2.2, mix(float(_GLF_FUZZED(-93.68)), float(-2.2), bool(true))), -2.2)), 1.0, -6230.6904, -8593.7570);
                {
                    {
                        ;
                    }
                }
            }
            vec2 GLF_live2pos = _GLF_FUZZED(vec2(-6.3, 3881.4273));
            vec3 GLF_live2setting = _GLF_FUZZED(vec3(-568.194, 74.25, 256.092).zxx);
            if (_GLF_WRAPPED_IF_FALSE(false)) {
            } else {
                do {
                    ;
                    {
                        vec4 GLF_live14c = _GLF_FUZZED(vec4(6.4, -5.1, -295.143, 5226.2995));
                        int GLF_live14i = _GLF_FUZZED(-66173);
                        {
                            GLF_live14c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14i, 4)] = GLF_live14c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14i, 4)] * GLF_live14c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14i, 4)];
                        }
                    }
                    {
                        int GLF_live4looplimiter0 = 0;
                        int GLF_live4v = _GLF_FUZZED(-85131);
                        do {
                            for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_ZERO(0.0, _GLF_IDENTITY(injectionSwitch.x, (_GLF_IDENTITY(injectionSwitch.x, max(injectionSwitch.x, injectionSwitch.x))) - 0.0)))))) {
                                    discard;
                                }
                                if (_GLF_DEAD(_GLF_IDENTITY(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)), (_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))) || _GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))))) {
                                    return;
                                }
                                if (GLF_live4looplimiter0 >= 3) {
                                    if (_GLF_DEAD(false)) {
                                        return;
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                            _GLF_color = _GLF_IDENTITY((_GLF_color - vec4(9.2, -54.39, 1243.0234, -2.4)), ((_GLF_color - vec4(9.2, -54.39, 1243.0234, -2.4))) * mat4(1.0));
                                        }
                                    }
                                    ;
                                    if (_GLF_DEAD(false)) {
                                        continue;
                                    }
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                            return;
                                            if (_GLF_DEAD(false)) {
                                                _GLF_color = vec4(-9983.3470, 8.9, -3.5, 12.17);
                                            }
                                        }
                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                            discard;
                                        }
                                        {
                                            int GLF_live12looplimiter2 = 0;
                                            if (GLF_live12looplimiter2 >= 7) {
                                                ;
                                            }
                                        }
                                    } else {
                                    }
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                        _GLF_color = dFdyFine(_GLF_color);
                                    }
                                }
                                do {
                                    GLF_live4looplimiter0++;
                                } while (_GLF_WRAPPED_LOOP(false));
                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= length(vec2(0.0, 0.0)))))) {
                                    GLF_live4v = (4 * GLF_live4v * (1000 - GLF_live4v)) / 1000;
                                } else {
                                }
                            }
                        } while (_GLF_WRAPPED_LOOP(false));
                    }
                    {
                        int GLF_live14i = _GLF_FUZZED(-85310);
                        float GLF_live14ref = _GLF_FUZZED(-7.6);
                        float GLF_live14s = _GLF_FUZZED((5404.6261));
                        if (mod(float(GLF_live14i), GLF_live14ref) <= 0.01) {
                            GLF_live14s += 0.2;
                        }
                    }
                } while (_GLF_WRAPPED_LOOP(false));
            }
        } else {
            if (_GLF_DEAD(false)) {
                return;
            }
        }
        for (int _injected_loop_counter = (0 | 0); _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    if (_GLF_WRAPPED_IF_FALSE(false)) {
                    } else {
                        _GLF_IDENTITY(_GLF_color = _GLF_outlined_1(_GLF_color), (_GLF_color = _GLF_outlined_1(_GLF_color)) - vec4(0.0, 0.0, 0.0, 0.0));
                    }
                } else {
                }
            }
            {
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    _GLF_color = GLF_live10_GLF_color;
                }
                vec2 GLF_live9coord = _GLF_FUZZED(vec2(8.6, 1.5));
                int GLF_live9looplimiter1 = 0;
                vec4 GLF_live9res = _GLF_FUZZED(vec4(4.6, 5657.6699, -3.4, 2403.9438));
                float GLF_live9uvstep = _GLF_FUZZED(vec2(-643.643, -9.6).g);
                for (int GLF_live9i = 0; GLF_live9i < 3; GLF_live9i++) {
                    if (_GLF_IDENTITY(_GLF_IDENTITY(GLF_live9looplimiter1, (false ? _GLF_FUZZED(ivec2(-81410, -70914).g) : GLF_live9looplimiter1)) >= 5, false || (_GLF_IDENTITY(GLF_live9looplimiter1, (false ? _GLF_FUZZED(ivec2(-81410, -70914).g) : GLF_live9looplimiter1)) >= 5))) {
                        break;
                    }
                    if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    } else {
                        GLF_live9looplimiter1++;
                    }
                    if (_GLF_DEAD(false)) {
                        _GLF_color = GLF_live7_GLF_color;
                    }
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                        {
                            int GLF_live9looplimiter0 = 0;
                            for (int GLF_live9j = 0; GLF_live9j < 3; GLF_live9j++) {
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < determinant(mat2(0.0, 0.0, 1.0, 0.0)))))) {
                                    _GLF_color = GLF_live9res;
                                }
                                if (GLF_live9looplimiter0 >= 5) {
                                    break;
                                }
                                GLF_live9looplimiter0++;
                                {
                                    GLF_live9res += texture(GLF_live9tex, GLF_live9coord + vec2(float(GLF_live9i - 1) * GLF_live9uvstep, float(GLF_live9j - 1) * GLF_live9uvstep)) * GLF_live9weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9i * 3 + GLF_live9j, 9)];
                                }
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = GLF_live10_GLF_color;
                                    {
                                        int GLF_live14i = _GLF_FUZZED(98406);
                                        float GLF_live14ref = _GLF_FUZZED(float(ivec3(2080, 18306, -71442).s));
                                        float GLF_live14s = _GLF_FUZZED((2699.6146 * (-2543.5492)));
                                        if (mod(float(GLF_live14i), GLF_live14ref) <= 0.01) {
                                            GLF_live14s += 0.2;
                                        }
                                    }
                                }
                            }
                        }
                    } else {
                    }
                }
            }
            if (_GLF_DEAD(false)) {
                _GLF_color = GLF_live7_GLF_color;
            }
        }
    }
    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
        do {
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                _GLF_color = normalize(GLF_live10_GLF_color);
            }
            _GLF_color = vec4(vec3(grey), 1.0);
        } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, _GLF_IDENTITY((gl_FragCoord.x < 0.0), ((gl_FragCoord.x < 0.0)) || _GLF_FALSE(false, (gl_FragCoord.x < sqrt(0.0)))))));
    } else {
    }
}
