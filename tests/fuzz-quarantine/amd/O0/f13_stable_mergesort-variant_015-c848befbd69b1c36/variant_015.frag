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
vec4 GLF_dead10_GLF_color = _GLF_FUZZED(vec4(1.2, -3.1, -4.6, 7240.3994));

layout(set = 0, binding = 1) uniform buf1 {
    vec3 GLF_dead10polynomial;
};

float GLF_dead10fx(float GLF_dead10x) {
    return GLF_dead10polynomial.x * (GLF_dead10x * GLF_dead10x) + GLF_dead10polynomial.y * _GLF_IDENTITY(GLF_dead10x, max(GLF_dead10x, _GLF_IDENTITY(GLF_dead10x, (GLF_dead10x) * 1.0))) + GLF_dead10polynomial.z;
}

vec4 GLF_dead7gl_FragCoord = _GLF_FUZZED(vec2(-903.034, -996.989).xxyy);

layout(set = 0, binding = 2) uniform buf2 {
    vec2 GLF_dead7injectionSwitch;
};

layout(set = 0, binding = 3) uniform buf3 {
    vec2 GLF_dead7resolution;
};

layout(set = 0, binding = 4) uniform buf4 {
    vec2 GLF_dead9injectionSwitch;
};

struct GLF_dead9QuicksortObject {
    int numbers[10];
};

GLF_dead9QuicksortObject GLF_dead9obj = GLF_dead9QuicksortObject(int[10](0, 0, 0, 0, 0, 0, 0, 0, 0, 0));

void GLF_dead9swap(int GLF_dead9i, int GLF_dead9j) {
    int GLF_dead9temp = GLF_dead9obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead9i, 10)];
    GLF_dead9obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead9i, 10)] = GLF_dead9obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead9j, 10)];
    GLF_dead9obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead9j, 10)] = GLF_dead9temp;
}

vec3 GLF_dead9palette(vec3 GLF_dead9a, vec3 GLF_dead9b, vec3 GLF_dead9c, vec3 GLF_dead9d) {
    return fract(mix(GLF_dead9d * GLF_dead9a, GLF_dead9a * GLF_dead9c, GLF_dead9b + GLF_dead9d - GLF_dead9c));
}

layout(set = 0, binding = 5) uniform buf5 {
    vec2 GLF_dead8resolution;
};

float GLF_dead8b_b = _GLF_FUZZED(((-763.385) + (-135.860)));
vec4 GLF_dead0_GLF_color = _GLF_FUZZED(vec4(19.76, -17.71, 506.290, 5230.7472));
vec4 GLF_dead3_GLF_color = _GLF_FUZZED(vec4(-_GLF_IDENTITY(4.5, min(4.5, 4.5)), -82.55, -22.01, -55.46));
layout(set = 0, binding = 6) uniform sampler2D GLF_dead2tex;
const float GLF_dead2weights[9] = float[9](1.0, 0.5, _GLF_IDENTITY(-_GLF_IDENTITY(0.25, (true ? 0.25 : _GLF_FUZZED(-37.99))), clamp(-_GLF_IDENTITY(0.25, (true ? 0.25 : _GLF_FUZZED(-37.99))), -_GLF_IDENTITY(0.25, (true ? 0.25 : _GLF_FUZZED(-37.99))), -_GLF_IDENTITY(0.25, (true ? 0.25 : _GLF_FUZZED(-37.99))))), 0.5, 1.0, -0.5, -0.25, -0.5, -1.0);
layout(location = 0) out vec4 _GLF_color;

layout(set = 0, binding = 0) uniform buf0 {
    vec2 injectionSwitch;
};

const int N = 10;
int data[10], temp[10];

void merge(int from, int mid, int to) {
    if (_GLF_DEAD(false)) {
        vec4 donor_replacementGLF_dead4c = _GLF_FUZZED(mat4(-2.9, 345.464, -0.2, 853.991, 35.79, 9526.1696, 706.975, -8.5, 5630.3533, 0.2, 7945.1366, -9.2, 7.1, -71.20, 9060.2704, 8.4)[0]);
        int donor_replacementGLF_dead4i = _GLF_FUZZED(from);
        {
            if (donor_replacementGLF_dead4c[_GLF_IDENTITY(_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4i, 4), min(_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4i, 4), _GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4i, 4)))] >= 1.0) {
                donor_replacementGLF_dead4c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4i, 4)] = donor_replacementGLF_dead4c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4i, 4)] * donor_replacementGLF_dead4c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4i, 4)];
                if (_GLF_DEAD(_GLF_IDENTITY(false, !(!(false))))) {
                    _GLF_color = acosh(_GLF_color);
                }
            }
            donor_replacementGLF_dead4i++;
        }
    }
    int k = from, i = _GLF_IDENTITY(from, (from) - 0), j = mid + 1;
    while (i <= mid && j <= to) {
        if (data[i] < data[j]) {
            temp[k++] = data[i++];
        } else {
            if (_GLF_DEAD(false)) {
                if (_GLF_DEAD(false)) {
                    int donor_replacementGLF_dead8msb8 = _GLF_FUZZED(i);
                    vec2 donor_replacementGLF_dead8pos = _GLF_FUZZED((bvec4(false, true, false, true), vec2(-354.989)));
                    vec3 donor_replacementGLF_dead8setting = _GLF_FUZZED(vec3(5.2, 447.316, 47.28));
                    {
                        ;
                    }
                }
                _GLF_color = _GLF_color;
                if (_GLF_DEAD(false)) {
                    {
                        GLF_dead10_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
                    }
                }
            }
            if (_GLF_DEAD(false)) {
                _GLF_color = normalize(log2(GLF_dead3_GLF_color));
            }
            temp[k++] = _GLF_IDENTITY(data[j++], (data[j++]) << 0);
            if (_GLF_DEAD(_GLF_IDENTITY(_GLF_FALSE(false, (gl_FragCoord.y < _GLF_IDENTITY(dot(vec3(1.0, _GLF_IDENTITY(dot(vec3(1.0, 1.0, 0.0), vec3(0.0, 0.0, 1.0)), dot(vec3(1.0, 1.0, 0.0), vec3(0.0, 0.0, 1.0))), round(length(normalize(1.0)))), vec3(0.0, 1.0, 0.0)), dot(vec3(1.0, _GLF_IDENTITY(dot(vec3(1.0, 1.0, 0.0), vec3(0.0, 0.0, 1.0)), dot(vec3(1.0, 1.0, 0.0), vec3(0.0, 0.0, 1.0))), round(length(normalize(1.0)))), vec3(0.0, 1.0, 0.0))))), !(!(_GLF_FALSE(false, (gl_FragCoord.y < _GLF_IDENTITY(dot(vec3(1.0, _GLF_IDENTITY(dot(vec3(1.0, 1.0, 0.0), vec3(0.0, 0.0, 1.0)), dot(vec3(1.0, 1.0, 0.0), vec3(0.0, 0.0, 1.0))), round(length(normalize(1.0)))), vec3(0.0, 1.0, 0.0)), dot(vec3(1.0, _GLF_IDENTITY(dot(vec3(1.0, 1.0, 0.0), vec3(0.0, 0.0, 1.0)), dot(vec3(1.0, 1.0, 0.0), vec3(0.0, 0.0, 1.0))), round(length(normalize(1.0)))), vec3(0.0, 1.0, 0.0)))))))))) {
                _GLF_color = fract(_GLF_color);
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    {
                        GLF_dead10_GLF_color = vec4(0.0, 1.0, 0.0, 1.0);
                    }
                }
            }
        }
    }
    while (i < N && i <= mid) {
        temp[k++] = data[i++];
    }
    for (int i = from; i <= to; i++) {
        if (_GLF_DEAD(false)) {
            _GLF_color = GLF_dead0_GLF_color;
        }
        data[i] = temp[i];
        if (_GLF_DEAD(false)) {
            float donor_replacementGLF_dead10A = _GLF_FUZZED(-183.574);
            float donor_replacementGLF_dead10B = _GLF_FUZZED(distance(cosh(vec2(9843.2007, 98.08)), injectionSwitch));
            float donor_replacementGLF_dead10C = _GLF_FUZZED(degrees(-5.7));
            float donor_replacementGLF_dead10temp = _GLF_FUZZED(((-1449.0115) - ((-68.83) * (-6.8))));
            float donor_replacementGLF_dead10x0 = _GLF_FUZZED(0.5);
            float donor_replacementGLF_dead10x1 = _GLF_FUZZED(fract(620.557));
            float donor_replacementGLF_dead10x2 = _GLF_FUZZED(dot((injectionSwitch + injectionSwitch), injectionSwitch));
            {
                float GLF_dead10h0 = donor_replacementGLF_dead10x0 - donor_replacementGLF_dead10x2;
                float GLF_dead10h1 = donor_replacementGLF_dead10x1 - donor_replacementGLF_dead10x2;
                float GLF_dead10k0 = GLF_dead10fx(donor_replacementGLF_dead10x0) - GLF_dead10fx(donor_replacementGLF_dead10x2);
                float GLF_dead10k1 = GLF_dead10fx(donor_replacementGLF_dead10x1) - GLF_dead10fx(donor_replacementGLF_dead10x2);
                donor_replacementGLF_dead10temp = donor_replacementGLF_dead10x2;
                donor_replacementGLF_dead10A = (((GLF_dead10h1) * (GLF_dead10k0)) - ((GLF_dead10h0) * (GLF_dead10k1))) / (((_GLF_IDENTITY((GLF_dead10h0) * (GLF_dead10h0), ((GLF_dead10h0) * (GLF_dead10h0)) - 0.0)) * (GLF_dead10h1)) - (((GLF_dead10h1) * (GLF_dead10h1)) * (GLF_dead10h0)));
                donor_replacementGLF_dead10B = (((GLF_dead10k0) - (donor_replacementGLF_dead10A * (((GLF_dead10h0) * (GLF_dead10h0))))) / (GLF_dead10h0));
                donor_replacementGLF_dead10C = GLF_dead10fx(donor_replacementGLF_dead10x2);
                donor_replacementGLF_dead10x2 = donor_replacementGLF_dead10x2 - ((2.0 * donor_replacementGLF_dead10C) / (donor_replacementGLF_dead10B + sign(donor_replacementGLF_dead10B) * sqrt(max((donor_replacementGLF_dead10B * donor_replacementGLF_dead10B) - (4.0 * donor_replacementGLF_dead10A * donor_replacementGLF_dead10C), 0.0))));
                donor_replacementGLF_dead10x0 = donor_replacementGLF_dead10x1;
                donor_replacementGLF_dead10x1 = donor_replacementGLF_dead10temp;
                _GLF_IDENTITY(k++, (_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)) ? _GLF_IDENTITY(k++, ~(~(_GLF_IDENTITY(k++, (k++) | 0)))) : _GLF_FUZZED(to)));
            }
        }
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
        int donor_replacementGLF_dead5v = _GLF_FUZZED(bitCount(mid));
        {
            donor_replacementGLF_dead5v = 3 * donor_replacementGLF_dead5v + 1;
        }
    }
}

void mergeSort() {
    int low = 0;
    if (_GLF_DEAD(false)) {
        return;
    }
    if (_GLF_DEAD(false)) {
        if (_GLF_DEAD(false)) {
            bool donor_replacementGLF_dead8c8 = _GLF_IDENTITY(_GLF_FUZZED(false), (_GLF_FUZZED(false)) && true);
            vec2 donor_replacementGLF_dead8pos = _GLF_FUZZED(vec2(-176.964, -18.32));
            vec3 donor_replacementGLF_dead8setting = _GLF_FUZZED(_GLF_IDENTITY(min(cosh(vec3(-484.051, -9034.3509, 78.84)), fwidthFine(689.854)), min(min(cosh(vec3(-484.051, -9034.3509, 78.84)), fwidthFine(689.854)), _GLF_IDENTITY(min(cosh(vec3(-484.051, -9034.3509, 78.84)), fwidthFine(689.854)), vec3(_GLF_IDENTITY(mat2x3(min(cosh(vec3(-484.051, -9034.3509, 78.84)), fwidthFine(689.854)), 0.0, 1.0, 1.0), mat2x3(mat2x4(mat2x3(min(cosh(vec3(-484.051, -9034.3509, 78.84)), fwidthFine(689.854)), 0.0, 1.0, 1.0)))))))));
            if (!donor_replacementGLF_dead8c8) {
                ;
            }
        }
        _GLF_color = unpackSnorm4x8(clamp(81361u, (104278u), 142683u));
    }
    if (_GLF_DEAD(false)) {
        _GLF_color = (injectionSwitch * mat4x2(_GLF_IDENTITY(5340.9839, mix(float(_GLF_FUZZED(-4.5)), float(5340.9839), bool(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0))))), -1.5, 5762.9383, 9434.5489, -9.6, 2.0, _GLF_IDENTITY(-8.6, length(vec4(0.0, 0.0, 0.0, _GLF_IDENTITY(0.0, max(_GLF_IDENTITY(0.0, (_GLF_IDENTITY(0.0, (0.0) / 1.0)) - 0.0), 0.0)))) + (-8.6)), -335.477));
    }
    int high = N - 1;
    for (int m = 1; m <= high; m = 2 * m) {
        if (_GLF_DEAD(false)) {
            _GLF_color = _GLF_color;
        }
        if (_GLF_DEAD(false)) {
            {
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    _GLF_color = _GLF_color;
                }
                GLF_dead0_GLF_color = vec4(_GLF_IDENTITY(1.0, clamp(1.0, 1.0, 1.0)), 0.0, 0.0, 1.0);
                if (_GLF_DEAD(false)) {
                    break;
                    if (_GLF_DEAD(_GLF_FALSE(false, (_GLF_IDENTITY(injectionSwitch, max(_GLF_IDENTITY(injectionSwitch, (true ? injectionSwitch : _GLF_FUZZED(GLF_dead9injectionSwitch))), injectionSwitch)).x > injectionSwitch.y)))) {
                        vec3 donor_replacementGLF_dead7m = _GLF_FUZZED((mat4x3(-8922.1859, -3525.3874, -29.84, -4796.7293, 553.073, 5.9, 69.44, -463.732, -1.9, -68.26, 8.6, -9.2) * ldexp(_GLF_color, ivec4(45582, -31525, 10495, 74887))));
                        vec2 donor_replacementGLF_dead7o = _GLF_FUZZED(vec2(-532.426, 294.932));
                        {
                            int GLF_dead7k = 1;
                            while (GLF_dead7k >= 0) {
                                donor_replacementGLF_dead7o = donor_replacementGLF_dead7o + donor_replacementGLF_dead7o;
                                GLF_dead7k--;
                            }
                            _GLF_IDENTITY(donor_replacementGLF_dead7m = vec3(GLF_dead7injectionSwitch.x, cos(donor_replacementGLF_dead7o)), (true ? _GLF_IDENTITY(donor_replacementGLF_dead7m = vec3(GLF_dead7injectionSwitch.x, cos(donor_replacementGLF_dead7o)), (_GLF_FALSE(false, (gl_FragCoord.x < 0.0)) ? _GLF_FUZZED(GLF_dead10polynomial) : (donor_replacementGLF_dead7m = vec3(GLF_dead7injectionSwitch.x, cos(donor_replacementGLF_dead7o))))) : _GLF_FUZZED(donor_replacementGLF_dead7m)));
                        }
                    }
                }
                if (_GLF_DEAD(false)) {
                    break;
                    if (_GLF_DEAD(false)) {
                        _GLF_color = GLF_dead3_GLF_color;
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        _GLF_color = vec4(-66.78, 8.2, _GLF_IDENTITY(7.4, _GLF_IDENTITY((false ? _GLF_FUZZED(5.9) : 7.4), mix(float(_GLF_FUZZED(8549.3896)), float((false ? _GLF_FUZZED(5.9) : 7.4)), bool(true)))), -28.37);
                    }
                    if (_GLF_DEAD(_GLF_IDENTITY(false, false || (false)))) {
                        _GLF_color = GLF_dead0_GLF_color;
                    }
                }
            }
            if (_GLF_DEAD(false)) {
                if (_GLF_DEAD(false)) {
                    vec3 donor_replacementGLF_dead9color = _GLF_FUZZED(vec3(4505.0969));
                    do {
                        donor_replacementGLF_dead9color += GLF_dead9palette(vec3(_GLF_IDENTITY(0.5, max(_GLF_IDENTITY(0.5, float(mat4x3(0.5, 1.0, 0.0, 1.0, 1.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0, 1.0))), 0.5)), float(GLF_dead9obj.numbers[8]) * 0.1, 0.2), vec3(0.5), trunc(vec3(GLF_dead9injectionSwitch.y)), vec3(float(GLF_dead9obj.numbers[4]) * 0.1, GLF_dead9injectionSwitch.x, 0.6));
                        low++;
                    } while (low != GLF_dead9obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_dead9injectionSwitch.x), 10)]);
                }
                int donor_replacementGLF_dead7i = _GLF_FUZZED(m);
                for (donor_replacementGLF_dead7i = 0; donor_replacementGLF_dead7i < high; donor_replacementGLF_dead7i++) {
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        bool donor_replacementGLF_dead8c3 = _GLF_FUZZED((mat4x2(-4.1, 347.351, 725.786, -65.84, -4303.5022, 1.9, 65.93, 8.8) == mat4x2(-5.4, -_GLF_IDENTITY(549.724, _GLF_IDENTITY(float(mat3x2(_GLF_IDENTITY(549.724, float(vec3(_GLF_IDENTITY(549.724, clamp(549.724, 549.724, 549.724)), abs(1.0), 0.0))), length(vec3(0.0, 0.0, 0.0)), 1.0, 0.0, 1.0, 0.0)), clamp(float(mat3x2(_GLF_IDENTITY(549.724, float(vec3(_GLF_IDENTITY(549.724, clamp(549.724, 549.724, 549.724)), abs(1.0), 0.0))), length(vec3(0.0, 0.0, 0.0)), 1.0, 0.0, 1.0, 0.0)), float(mat3x2(_GLF_IDENTITY(549.724, float(vec3(_GLF_IDENTITY(549.724, clamp(549.724, 549.724, 549.724)), abs(1.0), 0.0))), length(vec3(0.0, 0.0, 0.0)), 1.0, 0.0, 1.0, 0.0)), float(mat3x2(_GLF_IDENTITY(549.724, float(vec3(_GLF_IDENTITY(549.724, clamp(549.724, 549.724, 549.724)), abs(1.0), 0.0))), length(vec3(0.0, 0.0, 0.0)), 1.0, 0.0, 1.0, 0.0))))), -2.2, -68.19, -707.060, -5218.5435, 9288.2174, -4252.0907)));
                        if (!donor_replacementGLF_dead8c3) {
                            ;
                        }
                    }
                    high = (4 * high * (1000 - high)) / 1000;
                }
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                continue;
                if (_GLF_DEAD(false)) {
                    vec3 donor_replacementGLF_dead9color = _GLF_FUZZED(cosh(vec3(4.3, -868.750, -495.626)));
                    int donor_replacementGLF_dead9count = _GLF_FUZZED(low);
                    do {
                        donor_replacementGLF_dead9color -= GLF_dead9palette(vec3(float(GLF_dead9obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_dead9injectionSwitch.y), 10)]) * 0.1), vec3(0.8), trunc(vec3(0.1)), vec3(GLF_dead9injectionSwitch.x, 0.6, float(GLF_dead9obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_dead9injectionSwitch.x), 10)]) * 0.1));
                        donor_replacementGLF_dead9count++;
                    } while (donor_replacementGLF_dead9count != GLF_dead9obj.numbers[2]);
                }
            }
            if (_GLF_DEAD(false)) {
                float donor_replacementGLF_dead10x2 = _GLF_FUZZED(normalize(-1.3));
                if (_GLF_IDENTITY(donor_replacementGLF_dead10x2 <= -0.9 && donor_replacementGLF_dead10x2 >= -1.1, bool(bvec4(donor_replacementGLF_dead10x2 <= -0.9 && donor_replacementGLF_dead10x2 >= -1.1, false, false, _GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))))) {
                    GLF_dead10_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
                } else {
                    GLF_dead10_GLF_color = vec4(0.0, 1.0, 0.0, 1.0);
                }
            }
        }
        for (int i = low; i < high; i += 2 * m) {
            if (_GLF_DEAD(false)) {
                if (_GLF_DEAD(false)) {
                    _GLF_color = vec4(36.73, -11.73, 100.533, -108.849);
                }
                int donor_replacementGLF_dead4i = _GLF_IDENTITY(_GLF_FUZZED(N), (_GLF_FUZZED(N)) * 1);
                float donor_replacementGLF_dead4limit = _GLF_FUZZED(-9.1);
                float donor_replacementGLF_dead4ref = _GLF_FUZZED(atan(-4767.1881, reflect(-22.34, 0.1)));
                float donor_replacementGLF_dead4s = _GLF_FUZZED(0.8);
                while (donor_replacementGLF_dead4i < bitfieldInsert(800, donor_replacementGLF_dead4i, 0, 0)) {
                    if (mod(float(donor_replacementGLF_dead4i), donor_replacementGLF_dead4ref) <= 0.01) {
                        donor_replacementGLF_dead4s += 0.2;
                    }
                    if (float(donor_replacementGLF_dead4i) >= donor_replacementGLF_dead4limit) {
                        if (_GLF_DEAD(false)) {
                            _GLF_color = vec4(-98.51, -1.2, -358.114, -4.3);
                        }
                        ;
                    }
                    donor_replacementGLF_dead4i++;
                }
            }
            if (_GLF_DEAD(false)) {
                int donor_replacementGLF_dead8msb8 = _GLF_FUZZED(_GLF_IDENTITY((high / i), ((high / i)) / 1));
                {
                    GLF_dead8b_b = clamp(GLF_dead8b_b * float(bitCount(donor_replacementGLF_dead8msb8)) * 3.0, float(bitfieldExtract(int(GLF_dead8resolution.x), 0, 1)), float(bitCount(donor_replacementGLF_dead8msb8)));
                }
            }
            int from = i;
            int mid = i + m - 1;
            if (_GLF_DEAD(false)) {
                discard;
                if (_GLF_DEAD(false)) {
                    vec3 donor_replacementGLF_dead9color = _GLF_FUZZED(vec3(61.49, _GLF_IDENTITY(-1.8, float(vec4(_GLF_IDENTITY(-1.8, 1.0 * (-1.8)), determinant(mat4(0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, _GLF_IDENTITY(dot(vec3(0.0, 1.0, 0.0), vec3(0.0, 1.0, 0.0)), dot(vec3(0.0, 1.0, 0.0), vec3(0.0, 1.0, 0.0))), 0.0, 0.0, 0.0, 0.0, 0.0, determinant(mat3(0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0)), _GLF_ZERO(0.0, injectionSwitch.x))), sqrt(0.0), 0.0))), -97.50));
                    vec2 donor_replacementGLF_dead9grid = _GLF_FUZZED(vec2(508.760, 95.90));
                    vec2 donor_replacementGLF_dead9uv = _GLF_FUZZED(vec2(-3.3, 2731.4737).gg);
                    if (donor_replacementGLF_dead9uv.x > (2.0 / 4.0)) {
                        int GLF_dead9count = int(GLF_dead9injectionSwitch.x);
                        do {
                            donor_replacementGLF_dead9color -= GLF_dead9palette(vec3(float(GLF_dead9obj.numbers[4]) * 0.1), trunc(vec3(0.1)), vec3(float(GLF_dead9obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_dead9injectionSwitch.y), 10)]) * 0.1), vec3(GLF_dead9injectionSwitch.x, float(GLF_dead9obj.numbers[2]) * _GLF_IDENTITY(0.1, max(_GLF_IDENTITY(0.1, (0.1) - sqrt(0.0)), 0.1)), float(GLF_dead9obj.numbers[8]) * 0.1));
                            GLF_dead9count++;
                        } while (GLF_dead9count != GLF_dead9obj.numbers[1]);
                        donor_replacementGLF_dead9grid += vec2(GLF_dead9count + int(GLF_dead9injectionSwitch.y), GLF_dead9count + int(GLF_dead9injectionSwitch.x));
                    }
                }
            }
            if (_GLF_DEAD(_GLF_FALSE(false, _GLF_IDENTITY((injectionSwitch.x > injectionSwitch.y), bool(bool((injectionSwitch.x > injectionSwitch.y))))))) {
                vec2 donor_replacementGLF_dead2coord = _GLF_FUZZED(unpackSnorm2x16(46294u));
                if (_GLF_IDENTITY(_GLF_DEAD(false), !(_GLF_IDENTITY(!(_GLF_IDENTITY(_GLF_DEAD(false), !(_GLF_IDENTITY(!(_GLF_DEAD(false)), true && (!(_GLF_DEAD(false))))))), (!(_GLF_IDENTITY(_GLF_DEAD(false), !(_GLF_IDENTITY(!(_GLF_DEAD(false)), true && (!(_GLF_DEAD(false)))))))) || false)))) {
                    if (_GLF_DEAD(false)) {
                        if (_GLF_DEAD(false)) {
                            _GLF_color = GLF_dead3_GLF_color;
                        }
                        int donor_replacementGLF_dead7iters = _GLF_FUZZED(mix(m, m, false));
                        int donor_replacementGLF_dead7v = _GLF_FUZZED(min(i, high));
                        for (from = 0; from < _GLF_IDENTITY(donor_replacementGLF_dead7iters, int(int(donor_replacementGLF_dead7iters))); _GLF_IDENTITY(from++, (0 << _GLF_IDENTITY(int(1), int(1))) ^ (_GLF_IDENTITY(from++, (true ? (from++) : _GLF_FUZZED(low)))))) {
                            donor_replacementGLF_dead7v = (4 * donor_replacementGLF_dead7v * (1000 - donor_replacementGLF_dead7v)) / 1000;
                        }
                        if (_GLF_DEAD(false)) {
                            float donor_replacementGLF_dead10A = _GLF_FUZZED(intBitsToFloat(mid));
                            float donor_replacementGLF_dead10B = _GLF_FUZZED(-62.55);
                            float donor_replacementGLF_dead10C = _GLF_FUZZED(-43.08);
                            int donor_replacementGLF_dead10iterations = _GLF_FUZZED(donor_replacementGLF_dead7iters);
                            float donor_replacementGLF_dead10temp = _GLF_FUZZED(-190.457);
                            float donor_replacementGLF_dead10x0 = _GLF_FUZZED(atan(17.73, -262.334));
                            float donor_replacementGLF_dead10x1 = _GLF_FUZZED(fract(6.7));
                            float donor_replacementGLF_dead10x2 = _GLF_FUZZED(inversesqrt(cos(9.0)));
                            {
                                float GLF_dead10h0 = donor_replacementGLF_dead10x0 - donor_replacementGLF_dead10x2;
                                float GLF_dead10h1 = donor_replacementGLF_dead10x1 - donor_replacementGLF_dead10x2;
                                float GLF_dead10k0 = GLF_dead10fx(donor_replacementGLF_dead10x0) - GLF_dead10fx(donor_replacementGLF_dead10x2);
                                float GLF_dead10k1 = GLF_dead10fx(donor_replacementGLF_dead10x1) - GLF_dead10fx(donor_replacementGLF_dead10x2);
                                donor_replacementGLF_dead10temp = donor_replacementGLF_dead10x2;
                                donor_replacementGLF_dead10A = (_GLF_IDENTITY(((GLF_dead10h1) * (GLF_dead10k0)), max(((GLF_dead10h1) * (GLF_dead10k0)), ((GLF_dead10h1) * (GLF_dead10k0)))) - ((GLF_dead10h0) * (GLF_dead10k1))) / (_GLF_IDENTITY((((GLF_dead10h0) * (GLF_dead10h0)) * (GLF_dead10h1)), (true ? (((GLF_dead10h0) * (GLF_dead10h0)) * (GLF_dead10h1)) : _GLF_FUZZED(donor_replacementGLF_dead10temp))) - (((GLF_dead10h1) * (GLF_dead10h1)) * (GLF_dead10h0)));
                                donor_replacementGLF_dead10B = (((GLF_dead10k0) - (_GLF_IDENTITY(donor_replacementGLF_dead10A * (((GLF_dead10h0) * (GLF_dead10h0))), clamp(donor_replacementGLF_dead10A * (((GLF_dead10h0) * (GLF_dead10h0))), _GLF_IDENTITY(donor_replacementGLF_dead10A * (((GLF_dead10h0) * (GLF_dead10h0))), min(donor_replacementGLF_dead10A * (((GLF_dead10h0) * (GLF_dead10h0))), donor_replacementGLF_dead10A * (((GLF_dead10h0) * (GLF_dead10h0))))), donor_replacementGLF_dead10A * (((GLF_dead10h0) * (GLF_dead10h0))))))) / (GLF_dead10h0));
                                donor_replacementGLF_dead10C = GLF_dead10fx(donor_replacementGLF_dead10x2);
                                donor_replacementGLF_dead10x2 = donor_replacementGLF_dead10x2 - ((2.0 * donor_replacementGLF_dead10C) / (donor_replacementGLF_dead10B + sign(donor_replacementGLF_dead10B) * sqrt(max((donor_replacementGLF_dead10B * donor_replacementGLF_dead10B) - (4.0 * donor_replacementGLF_dead10A * donor_replacementGLF_dead10C), 0.0))));
                                donor_replacementGLF_dead10x0 = donor_replacementGLF_dead10x1;
                                donor_replacementGLF_dead10x1 = donor_replacementGLF_dead10temp;
                                donor_replacementGLF_dead10iterations++;
                            }
                        }
                        if (_GLF_DEAD(false)) {
                            _GLF_color = _GLF_color;
                            if (_GLF_DEAD(false)) {
                                float donor_replacementGLF_dead10A = _GLF_FUZZED(-2.9);
                                float donor_replacementGLF_dead10B = _GLF_FUZZED(-4.2);
                                float donor_replacementGLF_dead10C = _GLF_FUZZED(_GLF_IDENTITY(99.69, _GLF_IDENTITY(float(mat2x4(99.69, 0.0, 1.0, 0.0, 1.0, exp(0.0), 1.0, 0.0)), (false ? _GLF_FUZZED(donor_replacementGLF_dead10A) : float(mat2x4(99.69, 0.0, 1.0, 0.0, 1.0, exp(0.0), 1.0, 0.0))))));
                                int donor_replacementGLF_dead10iterations = _GLF_FUZZED(i);
                                float donor_replacementGLF_dead10temp = _GLF_FUZZED(normalize(-5.0));
                                float donor_replacementGLF_dead10x0 = _GLF_FUZZED(log2(72.94));
                                float donor_replacementGLF_dead10x1 = _GLF_FUZZED((GLF_dead3_GLF_color, 331.329));
                                float donor_replacementGLF_dead10x2 = _GLF_FUZZED(acosh(-580.472));
                                while (abs(donor_replacementGLF_dead10x2 - donor_replacementGLF_dead10x1) >= .00001 && _GLF_IDENTITY(donor_replacementGLF_dead10iterations < 64, true && (_GLF_IDENTITY(donor_replacementGLF_dead10iterations < 64, bool(bvec4(_GLF_IDENTITY(donor_replacementGLF_dead10iterations < 64, bool(bvec4(donor_replacementGLF_dead10iterations < 64, false, true, true))), _GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)), true, false)))))) {
                                    float GLF_dead10h0 = donor_replacementGLF_dead10x0 - donor_replacementGLF_dead10x2;
                                    float GLF_dead10h1 = donor_replacementGLF_dead10x1 - donor_replacementGLF_dead10x2;
                                    float GLF_dead10k0 = GLF_dead10fx(donor_replacementGLF_dead10x0) - GLF_dead10fx(donor_replacementGLF_dead10x2);
                                    float GLF_dead10k1 = GLF_dead10fx(donor_replacementGLF_dead10x1) - GLF_dead10fx(donor_replacementGLF_dead10x2);
                                    donor_replacementGLF_dead10temp = donor_replacementGLF_dead10x2;
                                    donor_replacementGLF_dead10A = (((GLF_dead10h1) * (GLF_dead10k0)) - ((GLF_dead10h0) * (GLF_dead10k1))) / ((((GLF_dead10h0) * (GLF_dead10h0)) * (GLF_dead10h1)) - (((GLF_dead10h1) * (GLF_dead10h1)) * (_GLF_IDENTITY(GLF_dead10h0, (true ? GLF_dead10h0 : _GLF_FUZZED(donor_replacementGLF_dead10x1))))));
                                    donor_replacementGLF_dead10B = (((GLF_dead10k0) - (donor_replacementGLF_dead10A * (((GLF_dead10h0) * (GLF_dead10h0))))) / (_GLF_IDENTITY(GLF_dead10h0, mix(float(_GLF_FUZZED(8534.4755)), float(_GLF_IDENTITY(GLF_dead10h0, (GLF_dead10h0) / 1.0)), bool(true)))));
                                    donor_replacementGLF_dead10C = GLF_dead10fx(donor_replacementGLF_dead10x2);
                                    donor_replacementGLF_dead10x2 = donor_replacementGLF_dead10x2 - ((2.0 * donor_replacementGLF_dead10C) / (donor_replacementGLF_dead10B + sign(donor_replacementGLF_dead10B) * sqrt(max((donor_replacementGLF_dead10B * donor_replacementGLF_dead10B) - (4.0 * donor_replacementGLF_dead10A * donor_replacementGLF_dead10C), 0.0))));
                                    donor_replacementGLF_dead10x0 = donor_replacementGLF_dead10x1;
                                    donor_replacementGLF_dead10x1 = donor_replacementGLF_dead10temp;
                                    donor_replacementGLF_dead10iterations++;
                                }
                            }
                        }
                    }
                    _GLF_color = sqrt(GLF_dead3_GLF_color);
                }
                int donor_replacementGLF_dead2j = _GLF_FUZZED(int(bitfieldReverse(_GLF_IDENTITY(181943u, (181943u) * 1u))));
                vec4 donor_replacementGLF_dead2res = _GLF_FUZZED(max(vec4(_GLF_IDENTITY(79.92, clamp(_GLF_IDENTITY(79.92, mix(float(_GLF_FUZZED(-2240.4840)), float(79.92), bool(true))), _GLF_IDENTITY(79.92, 1.0 * (79.92)), 79.92)), -8458.8969, 5.9, -7.8), trunc(_GLF_color)));
                float donor_replacementGLF_dead2uvstep = _GLF_FUZZED(-10.36);
                {
                    if (_GLF_IDENTITY(_GLF_DEAD(false), !(_GLF_IDENTITY(!(_GLF_DEAD(false)), false || (!(_GLF_DEAD(false))))))) {
                        if (donor_replacementGLF_dead2j < 1000) {
                            ;
                        } else {
                            ;
                        }
                    }
                    donor_replacementGLF_dead2res += texture(GLF_dead2tex, donor_replacementGLF_dead2coord + vec2(_GLF_IDENTITY(float(high - 1), _GLF_IDENTITY(max(float(_GLF_IDENTITY(high, min(high, high)) - 1), float(high - 1)), clamp(max(float(_GLF_IDENTITY(high, min(high, high)) - 1), float(high - 1)), _GLF_IDENTITY(max(float(_GLF_IDENTITY(high, min(high, high)) - 1), float(high - 1)), clamp(max(float(_GLF_IDENTITY(high, min(high, high)) - 1), float(high - 1)), max(float(_GLF_IDENTITY(high, min(high, high)) - 1), float(high - 1)), _GLF_IDENTITY(max(float(_GLF_IDENTITY(high, min(high, high)) - 1), float(high - 1)), (max(float(_GLF_IDENTITY(high, min(high, high)) - 1), float(high - 1))) / 1.0))), max(float(_GLF_IDENTITY(high, min(high, high)) - 1), float(high - 1))))) * donor_replacementGLF_dead2uvstep, float(donor_replacementGLF_dead2j - 1) * _GLF_IDENTITY(donor_replacementGLF_dead2uvstep, clamp(_GLF_IDENTITY(donor_replacementGLF_dead2uvstep, (true ? donor_replacementGLF_dead2uvstep : _GLF_FUZZED(donor_replacementGLF_dead2uvstep))), _GLF_IDENTITY(donor_replacementGLF_dead2uvstep, (donor_replacementGLF_dead2uvstep) - 0.0), donor_replacementGLF_dead2uvstep)))) * GLF_dead2weights[_GLF_MAKE_IN_BOUNDS_INT(_GLF_IDENTITY(high, (high) >> 0) * 3 + donor_replacementGLF_dead2j, 9)];
                }
                if (_GLF_DEAD(false)) {
                    int donor_replacementGLF_dead5v = _GLF_FUZZED(N);
                    {
                        donor_replacementGLF_dead5v = 3 * donor_replacementGLF_dead5v + 1;
                    }
                }
            }
            int to = min(i + 2 * m - 1, high);
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                _GLF_color = vec3(-8.0, -49.74, 1.5).tsts;
            }
            merge(_GLF_IDENTITY(from, (0 & N) | (from)), mid, to);
            if (_GLF_DEAD(false)) {
                _GLF_color = GLF_dead0_GLF_color;
            }
            if (_GLF_DEAD(false)) {
                vec3 donor_replacementGLF_dead9color = _GLF_FUZZED(trunc(vec3((vec2(1.7, 33.38) - (-2.0)), 0.4)));
                int donor_replacementGLF_dead9count = _GLF_FUZZED(from);
                {
                    donor_replacementGLF_dead9color += GLF_dead9palette(vec3(0.5, float(GLF_dead9obj.numbers[8]) * 0.1, 0.2), vec3(0.5), trunc(vec3(GLF_dead9injectionSwitch.y)), vec3(float(GLF_dead9obj.numbers[4]) * 0.1, GLF_dead9injectionSwitch.x, 0.6));
                    donor_replacementGLF_dead9count++;
                }
            }
        }
    }
    if (_GLF_DEAD(false)) {
        return;
    }
}

void main() {
    int i = int(_GLF_IDENTITY(injectionSwitch, mix(vec2(_GLF_FUZZED((_GLF_IDENTITY(false, false || (false)) ? 3.1 : (-7.9))), _GLF_FUZZED(14.40)), vec2(_GLF_IDENTITY((injectionSwitch)[0], float(_GLF_IDENTITY(mat2x4((injectionSwitch)[0], 0.0, length(vec4(0.0, 0.0, 0.0, 0.0)), 1.0, 1.0, 0.0, cos(_GLF_IDENTITY(dot(vec2(0.0, 1.0), vec2(1.0, 0.0)), dot(vec2(0.0, 1.0), vec2(1.0, 0.0)))), 1.0), (true ? mat2x4((injectionSwitch)[0], 0.0, length(vec4(0.0, 0.0, 0.0, 0.0)), 1.0, 1.0, 0.0, cos(_GLF_IDENTITY(dot(vec2(0.0, 1.0), vec2(1.0, 0.0)), dot(vec2(0.0, 1.0), vec2(1.0, 0.0)))), 1.0) : _GLF_FUZZED(mat2x4(-8.4, -677.029, -1.7, -7.5, -26.78, 724.384, 0.1, -4.5)))))), (injectionSwitch)[1]), bvec2(true, true))).x);
    if (_GLF_DEAD(false)) {
        _GLF_color = vec4(dot(_GLF_color, GLF_dead0_GLF_color), vec3(-5.4, -82.04, -369.534));
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
        vec2 donor_replacementGLF_dead7o = _GLF_FUZZED(injectionSwitch);
        {
            donor_replacementGLF_dead7o = _GLF_IDENTITY(donor_replacementGLF_dead7o + donor_replacementGLF_dead7o, vec2(_GLF_IDENTITY(mat2x3(donor_replacementGLF_dead7o + donor_replacementGLF_dead7o, 0.0, cos(0.0), _GLF_IDENTITY(dot(vec2(round(length(normalize(vec4(1.0, 1.0, 1.0, 1.0)))), 0.0), vec2(1.0, 0.0)), dot(vec2(round(length(normalize(vec4(1.0, 1.0, 1.0, 1.0)))), 0.0), vec2(1.0, 0.0))), 1.0), mat2x3(mat3x4(_GLF_IDENTITY(mat2x3(donor_replacementGLF_dead7o + donor_replacementGLF_dead7o, 0.0, cos(0.0), _GLF_IDENTITY(dot(vec2(round(length(normalize(vec4(1.0, 1.0, 1.0, 1.0)))), 0.0), vec2(1.0, 0.0)), dot(vec2(round(length(normalize(vec4(1.0, 1.0, 1.0, 1.0)))), 0.0), vec2(1.0, 0.0))), 1.0), (mat2x3(donor_replacementGLF_dead7o + donor_replacementGLF_dead7o, 0.0, cos(0.0), _GLF_IDENTITY(dot(vec2(round(length(normalize(vec4(1.0, 1.0, 1.0, 1.0)))), 0.0), vec2(1.0, 0.0)), dot(vec2(round(length(normalize(vec4(1.0, 1.0, 1.0, 1.0)))), 0.0), vec2(1.0, 0.0))), 1.0)) - mat2x3(0.0, 0.0, 0.0, 0.0, 0.0, 0.0)))))));
            i--;
        }
    }
    if (_GLF_DEAD(false)) {
        return;
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
        int donor_replacementGLF_dead8msb8 = _GLF_FUZZED(abs(_GLF_IDENTITY(int(5.9), (int(5.9)) >> (int(_GLF_ZERO(0.0, injectionSwitch.x)) | int(_GLF_ZERO(0.0, injectionSwitch.x))))));
        vec2 donor_replacementGLF_dead8pos = _GLF_FUZZED(step(injectionSwitch, vec2(-2.8, _GLF_IDENTITY(-5187.2530, (-5187.2530) - 0.0))));
        vec3 donor_replacementGLF_dead8setting = _GLF_FUZZED(vec3(1.4, 0.7, 7.4));
        {
            ;
        }
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < length(vec3(0.0, 0.0, 0.0)))))) {
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            if (_GLF_DEAD(false)) {
                vec3 donor_replacementGLF_dead9color = _GLF_FUZZED(vec3(3.0, 6676.7952, -3887.2876));
                vec2 donor_replacementGLF_dead9grid = _GLF_FUZZED(injectionSwitch);
                vec2 donor_replacementGLF_dead9uv = _GLF_FUZZED(injectionSwitch);
                if (donor_replacementGLF_dead9uv.x > (3.0 / 4.0)) {
                    int GLF_dead9count = int(GLF_dead9injectionSwitch.x);
                    do {
                        donor_replacementGLF_dead9color -= GLF_dead9palette(vec3(float(GLF_dead9obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_dead9injectionSwitch.y), 10)]) * 0.1), vec3(0.8), trunc(vec3(0.1)), vec3(GLF_dead9injectionSwitch.x, 0.6, float(GLF_dead9obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(_GLF_IDENTITY(GLF_dead9injectionSwitch.x, max(GLF_dead9injectionSwitch.x, GLF_dead9injectionSwitch.x))), _GLF_IDENTITY(10, min(10, 10)))]) * 0.1));
                        GLF_dead9count++;
                    } while (GLF_dead9count != GLF_dead9obj.numbers[2]);
                    _GLF_IDENTITY(donor_replacementGLF_dead9grid += vec2(GLF_dead9count + GLF_dead9obj.numbers[3], GLF_dead9count + GLF_dead9obj.numbers[3]), (_GLF_IDENTITY(donor_replacementGLF_dead9grid += vec2(GLF_dead9count + GLF_dead9obj.numbers[3], GLF_dead9count + GLF_dead9obj.numbers[3]), (false ? _GLF_FUZZED(acosh(vec2(68.93, 0.1))) : (donor_replacementGLF_dead9grid += vec2(GLF_dead9count + GLF_dead9obj.numbers[3], GLF_dead9count + GLF_dead9obj.numbers[3]))))) + vec2(0.0, 0.0));
                }
            }
            _GLF_color = _GLF_color;
        }
        _GLF_color = GLF_dead3_GLF_color;
        if (_GLF_DEAD(false)) {
            _GLF_color = GLF_dead3_GLF_color;
        }
    }
    if (_GLF_IDENTITY(_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > _GLF_IDENTITY(injectionSwitch, mix(vec2(_GLF_IDENTITY((injectionSwitch)[0], ((injectionSwitch)[0]) - 0.0), _GLF_FUZZED(((-54.55) * 15.44))), vec2(_GLF_FUZZED((-5705.9380)), (injectionSwitch)[1]), bvec2(false, true))).y))), bool(bool(_GLF_IDENTITY(_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > _GLF_IDENTITY(injectionSwitch, mix(vec2(_GLF_IDENTITY((injectionSwitch)[0], ((injectionSwitch)[0]) - 0.0), _GLF_FUZZED(((-54.55) * 15.44))), vec2(_GLF_FUZZED((-5705.9380)), (injectionSwitch)[1]), bvec2(false, true))).y))), bool(bool(_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > _GLF_IDENTITY(injectionSwitch, mix(vec2(_GLF_IDENTITY((injectionSwitch)[0], ((injectionSwitch)[0]) - 0.0), _GLF_FUZZED(((-54.55) * 15.44))), vec2(_GLF_FUZZED((-5705.9380)), (injectionSwitch)[1]), bvec2(false, true))).y)))))))))) {
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < length(vec2(0.0, 0.0)))))) {
            _GLF_color = GLF_dead3_GLF_color;
        }
        if (_GLF_DEAD(false)) {
            _GLF_color = (_GLF_color * (-1.1));
        }
        vec2 donor_replacementGLF_dead3coord = _GLF_FUZZED(injectionSwitch);
        if (_GLF_DEAD(_GLF_FALSE(false, (_GLF_IDENTITY(injectionSwitch.x, abs(0.0) + (injectionSwitch.x)) > injectionSwitch.y)))) {
            _GLF_color = GLF_dead3_GLF_color;
        }
        {
            ivec2 GLF_dead3icoord = ivec2(((donor_replacementGLF_dead3coord - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, _GLF_IDENTITY(1.0, clamp(1.0, 1.0, _GLF_IDENTITY(1.0, min(1.0, _GLF_IDENTITY(1.0, (1.0) - 0.0))))) / 0.4)) * 256.0);
            int GLF_dead3res3 = ((GLF_dead3icoord.x >> 5) & 1) ^ ((GLF_dead3icoord.y & 32) >> 5);
            int GLF_dead3res2 = (GLF_dead3icoord.y * _GLF_IDENTITY(GLF_dead3icoord.y, (false ? _GLF_FUZZED(i) : GLF_dead3icoord.y)) >> 10) & 1;
            if (_GLF_DEAD(_GLF_IDENTITY(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)), false || (_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))))) {
                vec3 donor_replacementGLF_dead8setting = _GLF_FUZZED(vec3(5.4, -93.21, 96.12));
                {
                    ;
                }
            }
            int GLF_dead3res1 = (GLF_dead3icoord.x * GLF_dead3icoord.y >> 9) & 1;
            GLF_dead3_GLF_color = vec4(_GLF_IDENTITY(float(GLF_dead3res1 ^ _GLF_IDENTITY(GLF_dead3res2, (GLF_dead3res2) - int(_GLF_ZERO(0.0, injectionSwitch.x)))), (true ? float(GLF_dead3res1 ^ _GLF_IDENTITY(GLF_dead3res2, _GLF_IDENTITY((GLF_dead3res2) - int(_GLF_ZERO(0.0, injectionSwitch.x)), clamp((GLF_dead3res2) - int(_GLF_ZERO(0.0, injectionSwitch.x)), _GLF_IDENTITY((GLF_dead3res2) - int(_GLF_ZERO(0.0, injectionSwitch.x)), (_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)) ? ((GLF_dead3res2) - int(_GLF_ZERO(0.0, injectionSwitch.x))) : _GLF_FUZZED(GLF_dead3res2))), (GLF_dead3res2) - int(_GLF_ZERO(0.0, injectionSwitch.x)))))) : _GLF_FUZZED(-86.17))), float(GLF_dead3res2 & GLF_dead3res3), _GLF_IDENTITY(float(GLF_dead3res1 | GLF_dead3res3), (float(GLF_dead3res1 | GLF_dead3res3)) - 0.0), 1.0);
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_ZERO(0.0, injectionSwitch.x))))) {
                vec3 donor_replacementGLF_dead9color = _GLF_FUZZED(vec3(6.4, 3.1, _GLF_IDENTITY(94.67, (94.67) * exp(0.0))));
                int donor_replacementGLF_dead9count = _GLF_FUZZED(-79287);
                do {
                    donor_replacementGLF_dead9color -= GLF_dead9palette(vec3(float(GLF_dead9obj.numbers[4]) * 0.1), trunc(vec3(0.1)), vec3(float(GLF_dead9obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_dead9injectionSwitch.y), 10)]) * 0.1), vec3(GLF_dead9injectionSwitch.x, float(GLF_dead9obj.numbers[2]) * 0.1, float(GLF_dead9obj.numbers[8]) * 0.1));
                    donor_replacementGLF_dead9count++;
                } while (donor_replacementGLF_dead9count != GLF_dead9obj.numbers[1]);
            }
        }
    }
    do {
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
            vec3 donor_replacementGLF_dead9color = _GLF_FUZZED(vec3(42.43, 4492.6847, 4.8));
            vec2 donor_replacementGLF_dead9grid = _GLF_FUZZED(asinh(step(injectionSwitch, vec2(-88.55, 92.33))));
            {
                int GLF_dead9count = int(GLF_dead9injectionSwitch.x);
                do {
                    donor_replacementGLF_dead9color += GLF_dead9palette(vec3(0.5, _GLF_IDENTITY(float(GLF_dead9obj.numbers[8]) * 0.1, 1.0 * (_GLF_IDENTITY(float(GLF_dead9obj.numbers[8]) * 0.1, clamp(float(GLF_dead9obj.numbers[8]) * 0.1, float(GLF_dead9obj.numbers[8]) * 0.1, float(GLF_dead9obj.numbers[8]) * 0.1)))), 0.2), vec3(0.5), trunc(vec3(GLF_dead9injectionSwitch.y)), vec3(float(GLF_dead9obj.numbers[4]) * 0.1, GLF_dead9injectionSwitch.x, 0.6));
                    GLF_dead9count++;
                } while (GLF_dead9count != GLF_dead9obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_dead9injectionSwitch.x), 10)]);
                donor_replacementGLF_dead9grid = vec2(GLF_dead9count + GLF_dead9obj.numbers[8], GLF_dead9count + GLF_dead9obj.numbers[_GLF_IDENTITY(6, (6) - 0)]);
            }
        }
        switch (i) {
            case 0:
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    int donor_replacementGLF_dead8msb8 = _GLF_FUZZED((N >> (63190 * 4448)));
                    vec2 donor_replacementGLF_dead8pos = _GLF_FUZZED(vec2(-3486.8229, -4.6));
                    vec3 donor_replacementGLF_dead8setting = _GLF_FUZZED((vec3(0.7, _GLF_IDENTITY(740.938, (740.938) - 0.0), -5.0) / (-2508.6030)));
                    {
                        ;
                    }
                }
                data[i] = 4;
                break;
            case 1:
                _GLF_IDENTITY(data[i] = 3, ~(_GLF_IDENTITY(~(data[i] = 3), _GLF_IDENTITY(int(_GLF_ZERO(0.0, injectionSwitch.x)), (_GLF_IDENTITY(int(_GLF_ZERO(0.0, injectionSwitch.x)), ~(~(int(_GLF_ZERO(0.0, injectionSwitch.x)))))) | (int(_GLF_ZERO(0.0, injectionSwitch.x)))) + (_GLF_IDENTITY(~(data[i] = 3), 0 ^ (~(data[i] = _GLF_IDENTITY(3, (_GLF_IDENTITY(3, 0 ^ (3))) << 0))))))));
                break;
                if (_GLF_DEAD(false)) {
                    _GLF_color = vec4(-7405.3610, 6.8, -0.8, -9.4);
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    discard;
                }
            case 2:
                data[i] = 2;
                if (_GLF_DEAD(false)) {
                    return;
                }
                break;
            case 3:
                data[i] = 1;
                break;
            case 4:
                data[i] = 0;
                break;
                if (_GLF_IDENTITY(_GLF_DEAD(false), true && (_GLF_DEAD(false)))) {
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        break;
                    }
                    _GLF_color = _GLF_color;
                }
                if (_GLF_DEAD(false)) {
                    vec2 donor_replacementGLF_dead3coord = _GLF_FUZZED(vec2(0.6, 9254.6642));
                    {
                        ivec2 GLF_dead3icoord = ivec2(((_GLF_IDENTITY(donor_replacementGLF_dead3coord - vec2(0.4, 0.0), _GLF_IDENTITY(vec2(_GLF_IDENTITY(mat3x2(_GLF_IDENTITY(donor_replacementGLF_dead3coord - vec2(0.4, 0.0), clamp(donor_replacementGLF_dead3coord - vec2(0.4, 0.0), donor_replacementGLF_dead3coord - vec2(0.4, 0.0), donor_replacementGLF_dead3coord - vec2(0.4, 0.0))), 0.0, 0.0, 0.0, log(1.0)), mat2(1.0) * (mat3x2(_GLF_IDENTITY(donor_replacementGLF_dead3coord - vec2(0.4, 0.0), clamp(donor_replacementGLF_dead3coord - vec2(0.4, 0.0), donor_replacementGLF_dead3coord - vec2(0.4, 0.0), donor_replacementGLF_dead3coord - vec2(0.4, 0.0))), 0.0, 0.0, 0.0, log(1.0))))), vec2(mat3x2(vec2(_GLF_IDENTITY(mat3x2(_GLF_IDENTITY(donor_replacementGLF_dead3coord - vec2(0.4, 0.0), clamp(donor_replacementGLF_dead3coord - vec2(0.4, 0.0), donor_replacementGLF_dead3coord - vec2(0.4, 0.0), donor_replacementGLF_dead3coord - vec2(0.4, 0.0))), 0.0, 0.0, 0.0, log(1.0)), mat2(1.0) * (mat3x2(_GLF_IDENTITY(donor_replacementGLF_dead3coord - vec2(0.4, 0.0), clamp(donor_replacementGLF_dead3coord - vec2(0.4, 0.0), donor_replacementGLF_dead3coord - vec2(0.4, 0.0), _GLF_IDENTITY(donor_replacementGLF_dead3coord, vec2(1.0, 1.0) * (donor_replacementGLF_dead3coord)) - vec2(0.4, 0.0))), 0.0, 0.0, 0.0, log(_GLF_IDENTITY(1.0, mix(float(_GLF_FUZZED(-58.01)), float(_GLF_IDENTITY(1.0, (false ? _GLF_FUZZED(GLF_dead8b_b) : 1.0))), bool(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))))))))), 1.0, 1.0, 0.0, exp(0.0)))))) * vec2(1.0 / 0.6, 1.0)) * _GLF_IDENTITY(256.0, clamp(256.0, 256.0, 256.0)));
                        int GLF_dead3v = (GLF_dead3icoord.x ^ GLF_dead3icoord.y) * GLF_dead3icoord.y;
                        bool GLF_dead3res1 = ((_GLF_IDENTITY(GLF_dead3v, (GLF_dead3v) | (GLF_dead3v)) >> 10) & 1) != 0;
                        if (_GLF_DEAD(false)) {
                            if (_GLF_DEAD(false)) {
                                if (_GLF_DEAD(false)) {
                                    if (_GLF_DEAD(false)) {
                                        float donor_replacementGLF_dead10A = _GLF_FUZZED(dot(_GLF_IDENTITY(vec3(-2.0, -64.55, 4.7), vec3(_GLF_IDENTITY(mat2x3(_GLF_IDENTITY(vec3(-2.0, -64.55, 4.7), clamp(vec3(-2.0, -64.55, 4.7), vec3(-2.0, -64.55, 4.7), vec3(-2.0, -64.55, 4.7))), 1.0, 1.0, 0.0), _GLF_IDENTITY(mat2x3(mat2x4(mat2x3(_GLF_IDENTITY(vec3(-2.0, -64.55, 4.7), clamp(vec3(-2.0, -64.55, 4.7), vec3(-2.0, -64.55, 4.7), vec3(-2.0, -64.55, 4.7))), 1.0, 1.0, 0.0))), mat2x3(mat4(mat2x3(mat2x4(mat2x3(_GLF_IDENTITY(vec3(-2.0, -64.55, 4.7), clamp(vec3(-2.0, -64.55, 4.7), vec3(-2.0, -64.55, 4.7), vec3(-2.0, -64.55, 4.7))), 1.0, 1.0, 0.0))))))))), _GLF_IDENTITY(vec3(679.662, -5559.6013, -98.21), max(_GLF_IDENTITY(vec3(679.662, -5559.6013, -98.21), max(vec3(679.662, -5559.6013, -98.21), vec3(679.662, -5559.6013, -98.21))), vec3(679.662, -5559.6013, -98.21)))));
                                        float donor_replacementGLF_dead10B = _GLF_FUZZED(float(i));
                                        float donor_replacementGLF_dead10C = _GLF_FUZZED(-348.865);
                                        float donor_replacementGLF_dead10temp = _GLF_FUZZED(ceil(3386.5069));
                                        float donor_replacementGLF_dead10x0 = _GLF_FUZZED(distance(vec3(87.54, -3347.1603, 2401.0669), mat2x3(-8.0, 39.74, -41.80, -3451.9908, -2255.2831, -24.13)[1]));
                                        float donor_replacementGLF_dead10x1 = _GLF_FUZZED(ceil(3896.0889));
                                        float donor_replacementGLF_dead10x2 = _GLF_FUZZED(34.50);
                                        {
                                            float GLF_dead10h0 = donor_replacementGLF_dead10x0 - donor_replacementGLF_dead10x2;
                                            float GLF_dead10h1 = donor_replacementGLF_dead10x1 - donor_replacementGLF_dead10x2;
                                            float GLF_dead10k0 = GLF_dead10fx(donor_replacementGLF_dead10x0) - GLF_dead10fx(donor_replacementGLF_dead10x2);
                                            float GLF_dead10k1 = GLF_dead10fx(donor_replacementGLF_dead10x1) - GLF_dead10fx(donor_replacementGLF_dead10x2);
                                            donor_replacementGLF_dead10temp = donor_replacementGLF_dead10x2;
                                            donor_replacementGLF_dead10A = (((GLF_dead10h1) * (GLF_dead10k0)) - ((GLF_dead10h0) * (GLF_dead10k1))) / ((((GLF_dead10h0) * (_GLF_IDENTITY(GLF_dead10h0, (GLF_dead10h0) + abs(0.0)))) * (GLF_dead10h1)) - (((GLF_dead10h1) * (_GLF_IDENTITY(GLF_dead10h1, min(GLF_dead10h1, GLF_dead10h1)))) * (GLF_dead10h0)));
                                            donor_replacementGLF_dead10B = (((GLF_dead10k0) - (_GLF_IDENTITY(donor_replacementGLF_dead10A, (_GLF_IDENTITY(donor_replacementGLF_dead10A, min(donor_replacementGLF_dead10A, donor_replacementGLF_dead10A))) - 0.0) * (((GLF_dead10h0) * (GLF_dead10h0))))) / (GLF_dead10h0));
                                            donor_replacementGLF_dead10C = GLF_dead10fx(donor_replacementGLF_dead10x2);
                                            donor_replacementGLF_dead10x2 = donor_replacementGLF_dead10x2 - ((2.0 * donor_replacementGLF_dead10C) / (donor_replacementGLF_dead10B + sign(donor_replacementGLF_dead10B) * sqrt(max((donor_replacementGLF_dead10B * donor_replacementGLF_dead10B) - (4.0 * donor_replacementGLF_dead10A * donor_replacementGLF_dead10C), 0.0))));
                                            donor_replacementGLF_dead10x0 = donor_replacementGLF_dead10x1;
                                            donor_replacementGLF_dead10x1 = donor_replacementGLF_dead10temp;
                                            i++;
                                        }
                                    }
                                    int donor_replacementGLF_dead5v = _GLF_FUZZED(_GLF_IDENTITY(N, int(ivec4(N, int(_GLF_ZERO(0.0, injectionSwitch.x)), 1, 0))));
                                    {
                                        donor_replacementGLF_dead5v = 3 * donor_replacementGLF_dead5v + 1;
                                    }
                                }
                                _GLF_color = log(_GLF_IDENTITY(min(vec4(-773.607, -71.04, -675.334, -83.14), vec4(4.1, -8250.0933, _GLF_IDENTITY(49.64, mix(float(_GLF_FUZZED(-65.55)), float(49.64), bool(true))), -5.7)), min(min(vec4(-773.607, -71.04, -675.334, -83.14), vec4(4.1, -8250.0933, _GLF_IDENTITY(49.64, mix(float(_GLF_FUZZED(-65.55)), float(49.64), bool(true))), -5.7)), min(vec4(-773.607, -71.04, -675.334, -83.14), vec4(4.1, -8250.0933, _GLF_IDENTITY(49.64, mix(float(_GLF_FUZZED(-65.55)), float(49.64), bool(true))), -5.7)))));
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < _GLF_IDENTITY(0.0, (true ? 0.0 : _GLF_FUZZED(59.34))))))) {
                                _GLF_color = GLF_dead0_GLF_color;
                            }
                            _GLF_color = _GLF_color;
                        }
                        bool GLF_dead3res2 = ((GLF_dead3v >> 11) & _GLF_IDENTITY(4, _GLF_IDENTITY((4), max(_GLF_IDENTITY((4), (_GLF_IDENTITY((4), clamp((4), (4), (4)))) + 0), (4))) | 0)) != 0;
                        bool GLF_dead3res3 = ((GLF_dead3v >> _GLF_IDENTITY(12, (_GLF_IDENTITY(12, (12) ^ 0)) ^ 0)) & 8) != 0;
                        if (_GLF_DEAD(false)) {
                            int donor_replacementGLF_dead8msb8 = _GLF_FUZZED((i / 53060));
                            vec2 donor_replacementGLF_dead8position = _GLF_FUZZED(vec2(-22.47, 4.3));
                            if (abs(donor_replacementGLF_dead8position.y - donor_replacementGLF_dead8position.x) < 0.5) {
                                GLF_dead8b_b = clamp(GLF_dead8b_b * float(bitCount(donor_replacementGLF_dead8msb8)) * 3.0, float(bitfieldExtract(int(GLF_dead8resolution.x), 0, 1)), float(bitCount(donor_replacementGLF_dead8msb8)));
                            }
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            if (_GLF_DEAD(_GLF_FALSE(false, (_GLF_IDENTITY(injectionSwitch, max(injectionSwitch, injectionSwitch)).x > injectionSwitch.y)))) {
                                _GLF_color = _GLF_IDENTITY(vec4(4.2, -9561.7543, -3.4, -7368.5412), (vec4(4.2, -9561.7543, -3.4, -7368.5412)) / vec4(1.0, 1.0, 1.0, 1.0));
                            }
                            _GLF_color = _GLF_color;
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < abs(abs(0.0)))))) {
                            int donor_replacementGLF_dead5v = _GLF_FUZZED(i);
                            {
                                donor_replacementGLF_dead5v /= 2;
                            }
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            {
                                GLF_dead10_GLF_color = vec4(0.0, 1.0, 0.0, 1.0);
                            }
                        }
                        _GLF_IDENTITY(GLF_dead3_GLF_color = vec4(GLF_dead3res1 ? 1.0 : 0.0, GLF_dead3res2 ? 1.0 : 0.0, GLF_dead3res3 ? 1.0 : 0.0, 1), cos(vec4(0.0, 0.0, 0.0, 0.0)) * (GLF_dead3_GLF_color = vec4(GLF_dead3res1 ? 1.0 : 0.0, GLF_dead3res2 ? 1.0 : 0.0, GLF_dead3res3 ? 1.0 : 0.0, 1)));
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        int donor_replacementGLF_dead4i = _GLF_FUZZED(sign(N));
                        if (_GLF_DEAD(false)) {
                            {
                                discard;
                            }
                        }
                        float donor_replacementGLF_dead4limit = _GLF_FUZZED(-7.4);
                        float donor_replacementGLF_dead4ref = _GLF_IDENTITY(_GLF_FUZZED(degrees(-3.6)), (false ? _GLF_FUZZED(length(donor_replacementGLF_dead4limit)) : _GLF_IDENTITY(_GLF_FUZZED(degrees(-3.6)), (_GLF_FUZZED(degrees(-3.6))) + 0.0)));
                        float donor_replacementGLF_dead4s = _GLF_FUZZED(((-9657.5149) * _GLF_IDENTITY(9833.4144, mix(float(_GLF_FUZZED(float((98615u != 198994u)))), float(9833.4144), bool(true)))));
                        while (donor_replacementGLF_dead4i < bitfieldInsert(800, donor_replacementGLF_dead4i, 0, 0)) {
                            if (mod(float(donor_replacementGLF_dead4i), donor_replacementGLF_dead4ref) <= 0.01) {
                                donor_replacementGLF_dead4s += 0.2;
                            }
                            if (_GLF_DEAD(false)) {
                                return;
                            }
                            if (float(donor_replacementGLF_dead4i) >= donor_replacementGLF_dead4limit) {
                                if (_GLF_DEAD(_GLF_FALSE(false, (_GLF_IDENTITY(gl_FragCoord.y, (gl_FragCoord.y) * 1.0) < 0.0)))) {
                                    _GLF_color = dFdxCoarse(GLF_dead3_GLF_color);
                                }
                                ;
                            }
                            if (_GLF_DEAD(false)) {
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                    discard;
                                }
                                _GLF_color = degrees((vec4(-6.8, 9674.4456, -5899.9982, 21.65) / GLF_dead0_GLF_color.g));
                                if (_GLF_DEAD(false)) {
                                    vec2 donor_replacementGLF_dead7o = _GLF_FUZZED(vec2(7.3, 7.7));
                                    {
                                        donor_replacementGLF_dead7o = donor_replacementGLF_dead7o + donor_replacementGLF_dead7o;
                                        donor_replacementGLF_dead4i--;
                                    }
                                }
                            }
                            donor_replacementGLF_dead4i++;
                        }
                    }
                }
            case 5:
                data[i] = -1;
                break;
                if (_GLF_DEAD(_GLF_IDENTITY(false, false || (false)))) {
                    if (_GLF_DEAD(false)) {
                        int donor_replacementGLF_dead5v = _GLF_FUZZED(N);
                        {
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                vec2 donor_replacementGLF_dead8pos = _GLF_FUZZED(step(-1692.1393, max(injectionSwitch, injectionSwitch)));
                                vec3 donor_replacementGLF_dead8setting = _GLF_FUZZED(vec3(8.6, -5913.9564, 164.774));
                                {
                                    ;
                                }
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                return;
                            }
                            if (_GLF_IDENTITY((donor_replacementGLF_dead5v & 1) == 1, ((donor_replacementGLF_dead5v & 1) == 1) || false)) {
                                donor_replacementGLF_dead5v = 3 * donor_replacementGLF_dead5v + 1;
                                if (_GLF_DEAD(_GLF_FALSE(false, (_GLF_IDENTITY(gl_FragCoord.y < 0.0, !(!(gl_FragCoord.y < 0.0))))))) {
                                    _GLF_color = vec4(8.9, -8.2, 275.517, 3.3);
                                }
                            } else {
                                donor_replacementGLF_dead5v /= 2;
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                    _GLF_color = GLF_dead3_GLF_color;
                                }
                            }
                            i++;
                        }
                    }
                    return;
                }
                if (_GLF_DEAD(false)) {
                    _GLF_color = cosh(vec2(0.6, -6.6)).grgg;
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    if (_GLF_DEAD(false)) {
                        _GLF_color = unpackUnorm4x8(127895u);
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            if (i < int(GLF_dead7gl_FragCoord.x)) {
                                break;
                            }
                        }
                    }
                    float donor_replacementGLF_dead4ref = _GLF_FUZZED(reflect(_GLF_IDENTITY(radians(-77.43), clamp(radians(-77.43), radians(-77.43), radians(-77.43))), 8.8));
                    float donor_replacementGLF_dead4s = _GLF_FUZZED(-1.8);
                    if (mod(float(i), donor_replacementGLF_dead4ref) <= 0.01) {
                        donor_replacementGLF_dead4s += 0.2;
                    }
                    if (_GLF_DEAD(false)) {
                        _GLF_color = asinh(vec4(-263.072, -649.338, -3.4, -80.58));
                    }
                }
            case 6:
                if (_GLF_DEAD(_GLF_IDENTITY(false, bool(bool(false))))) {
                    if (_GLF_DEAD(false)) {
                        if (_GLF_DEAD(false)) {
                            {
                                ;
                            }
                        }
                        return;
                    }
                    _GLF_color = mix(vec4(68.14, 7.5, -_GLF_IDENTITY(920.535, (true ? 920.535 : _GLF_FUZZED(max(GLF_dead8b_b, GLF_dead8b_b)))), -505.582), GLF_dead3_GLF_color, -7.5);
                }
                if (_GLF_DEAD(false)) {
                    _GLF_color = vec4(92.28, 6.9, -67.14, -3627.5098);
                }
                data[i] = -2;
                break;
            case 7:
                data[i] = -3;
                break;
            case 8:
                data[i] = -4;
                if (_GLF_DEAD(_GLF_FALSE(false, (_GLF_IDENTITY(gl_FragCoord.y < 0.0, true && (gl_FragCoord.y < 0.0)))))) {
                    vec4 donor_replacementGLF_dead4c = _GLF_FUZZED(GLF_dead0_GLF_color);
                    int donor_replacementGLF_dead4msb8 = _GLF_FUZZED(-14363);
                    do {
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < log(1.0))))) {
                            _GLF_color = GLF_dead3_GLF_color;
                        }
                        if (donor_replacementGLF_dead4c[_GLF_MAKE_IN_BOUNDS_INT(i, 4)] >= 1.0) {
                            donor_replacementGLF_dead4c[_GLF_MAKE_IN_BOUNDS_INT(i, 4)] = donor_replacementGLF_dead4c[_GLF_MAKE_IN_BOUNDS_INT(_GLF_IDENTITY(i, max(i, i)), 4)] * donor_replacementGLF_dead4c[_GLF_MAKE_IN_BOUNDS_INT(i, 4)];
                        }
                        i++;
                    } while (i < findMSB(findLSB(donor_replacementGLF_dead4msb8)));
                }
                break;
                if (_GLF_DEAD(false)) {
                    _GLF_color = GLF_dead0_GLF_color;
                }
            case 9:
                data[i] = -5;
                if (_GLF_DEAD(false)) {
                    _GLF_color = unpackUnorm4x8(134343u);
                    if (_GLF_DEAD(_GLF_IDENTITY(false, _GLF_FALSE(false, (gl_FragCoord.x < _GLF_IDENTITY(0.0, (0.0) / 1.0))) || (_GLF_IDENTITY(false, _GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)) && (_GLF_IDENTITY(false, (false) && true))))))) {
                        vec3 donor_replacementGLF_dead7m = _GLF_FUZZED(_GLF_IDENTITY(vec3(9146.3730, -_GLF_IDENTITY(1459.2517, mix(float(_GLF_IDENTITY(1459.2517, mix(float(_GLF_FUZZED(4.9)), float(1459.2517), bool(true)))), float(_GLF_FUZZED(1.3)), bool(false))), _GLF_IDENTITY(-_GLF_IDENTITY(282.403, clamp(282.403, 282.403, _GLF_IDENTITY(282.403, min(282.403, 282.403)))), _GLF_IDENTITY(float(_GLF_IDENTITY(mat2(_GLF_IDENTITY(-_GLF_IDENTITY(282.403, clamp(282.403, 282.403, _GLF_IDENTITY(282.403, min(282.403, 282.403)))), clamp(-_GLF_IDENTITY(282.403, clamp(282.403, 282.403, _GLF_IDENTITY(282.403, min(282.403, 282.403)))), -_GLF_IDENTITY(282.403, clamp(282.403, 282.403, _GLF_IDENTITY(282.403, min(282.403, 282.403)))), _GLF_IDENTITY(-_GLF_IDENTITY(282.403, clamp(282.403, 282.403, _GLF_IDENTITY(282.403, min(282.403, 282.403)))), max(-_GLF_IDENTITY(282.403, clamp(282.403, 282.403, _GLF_IDENTITY(282.403, min(282.403, 282.403)))), -_GLF_IDENTITY(282.403, clamp(282.403, 282.403, _GLF_IDENTITY(282.403, min(282.403, 282.403)))))))), 0.0, sin(sin(0.0)), 0.0), _GLF_IDENTITY(mat2(mat2(mat2(_GLF_IDENTITY(-_GLF_IDENTITY(282.403, clamp(282.403, 282.403, _GLF_IDENTITY(282.403, min(282.403, 282.403)))), clamp(-_GLF_IDENTITY(282.403, clamp(282.403, 282.403, _GLF_IDENTITY(282.403, min(282.403, 282.403)))), -_GLF_IDENTITY(282.403, clamp(282.403, 282.403, _GLF_IDENTITY(282.403, min(282.403, 282.403)))), _GLF_IDENTITY(-_GLF_IDENTITY(282.403, clamp(282.403, 282.403, _GLF_IDENTITY(282.403, min(282.403, 282.403)))), max(-_GLF_IDENTITY(282.403, clamp(282.403, 282.403, _GLF_IDENTITY(282.403, min(282.403, 282.403)))), -_GLF_IDENTITY(282.403, clamp(282.403, 282.403, _GLF_IDENTITY(282.403, min(282.403, 282.403)))))))), 0.0, sin(sin(0.0)), 0.0))), (mat2(mat2(mat2(_GLF_IDENTITY(-_GLF_IDENTITY(282.403, clamp(282.403, 282.403, _GLF_IDENTITY(282.403, min(282.403, 282.403)))), clamp(-_GLF_IDENTITY(282.403, clamp(282.403, 282.403, _GLF_IDENTITY(282.403, min(282.403, 282.403)))), -_GLF_IDENTITY(282.403, clamp(282.403, 282.403, _GLF_IDENTITY(282.403, min(282.403, 282.403)))), _GLF_IDENTITY(-_GLF_IDENTITY(282.403, clamp(282.403, 282.403, _GLF_IDENTITY(282.403, min(282.403, 282.403)))), max(-_GLF_IDENTITY(282.403, clamp(282.403, 282.403, _GLF_IDENTITY(282.403, min(282.403, 282.403)))), -_GLF_IDENTITY(282.403, clamp(282.403, 282.403, _GLF_IDENTITY(282.403, min(282.403, 282.403)))))))), 0.0, sin(sin(0.0)), 0.0)))) - mat2(0.0, 0.0, 0.0, 0.0)))), clamp(float(_GLF_IDENTITY(mat2(_GLF_IDENTITY(-_GLF_IDENTITY(282.403, clamp(282.403, 282.403, _GLF_IDENTITY(282.403, min(282.403, 282.403)))), clamp(-_GLF_IDENTITY(282.403, clamp(282.403, 282.403, _GLF_IDENTITY(282.403, min(282.403, 282.403)))), -_GLF_IDENTITY(282.403, clamp(282.403, 282.403, _GLF_IDENTITY(282.403, min(282.403, 282.403)))), _GLF_IDENTITY(-_GLF_IDENTITY(282.403, clamp(282.403, 282.403, _GLF_IDENTITY(282.403, min(282.403, 282.403)))), max(-_GLF_IDENTITY(282.403, clamp(282.403, 282.403, _GLF_IDENTITY(282.403, min(282.403, 282.403)))), -_GLF_IDENTITY(282.403, clamp(282.403, 282.403, _GLF_IDENTITY(282.403, min(282.403, 282.403)))))))), 0.0, sin(sin(0.0)), 0.0), _GLF_IDENTITY(mat2(mat2(mat2(_GLF_IDENTITY(-_GLF_IDENTITY(282.403, clamp(282.403, 282.403, _GLF_IDENTITY(282.403, min(282.403, 282.403)))), clamp(-_GLF_IDENTITY(282.403, clamp(282.403, 282.403, _GLF_IDENTITY(282.403, min(282.403, 282.403)))), -_GLF_IDENTITY(282.403, clamp(282.403, 282.403, _GLF_IDENTITY(282.403, min(282.403, 282.403)))), _GLF_IDENTITY(-_GLF_IDENTITY(282.403, clamp(282.403, 282.403, _GLF_IDENTITY(282.403, min(282.403, 282.403)))), max(-_GLF_IDENTITY(282.403, clamp(282.403, 282.403, _GLF_IDENTITY(282.403, min(282.403, 282.403)))), -_GLF_IDENTITY(282.403, clamp(282.403, 282.403, _GLF_IDENTITY(282.403, min(282.403, 282.403)))))))), 0.0, sin(sin(0.0)), 0.0))), (mat2(mat2(mat2(_GLF_IDENTITY(-_GLF_IDENTITY(282.403, clamp(282.403, 282.403, _GLF_IDENTITY(282.403, min(282.403, 282.403)))), clamp(-_GLF_IDENTITY(282.403, clamp(282.403, 282.403, _GLF_IDENTITY(282.403, min(282.403, 282.403)))), -_GLF_IDENTITY(282.403, clamp(282.403, 282.403, _GLF_IDENTITY(282.403, min(282.403, 282.403)))), _GLF_IDENTITY(-_GLF_IDENTITY(282.403, clamp(282.403, 282.403, _GLF_IDENTITY(282.403, min(282.403, 282.403)))), max(-_GLF_IDENTITY(282.403, clamp(282.403, 282.403, _GLF_IDENTITY(282.403, min(282.403, 282.403)))), -_GLF_IDENTITY(282.403, clamp(282.403, 282.403, _GLF_IDENTITY(282.403, min(282.403, 282.403)))))))), 0.0, sin(sin(0.0)), 0.0)))) - mat2(0.0, 0.0, 0.0, 0.0)))), float(_GLF_IDENTITY(mat2(_GLF_IDENTITY(-_GLF_IDENTITY(282.403, clamp(282.403, 282.403, _GLF_IDENTITY(282.403, min(282.403, 282.403)))), clamp(-_GLF_IDENTITY(282.403, clamp(282.403, 282.403, _GLF_IDENTITY(282.403, min(282.403, 282.403)))), -_GLF_IDENTITY(282.403, clamp(282.403, 282.403, _GLF_IDENTITY(282.403, min(282.403, 282.403)))), _GLF_IDENTITY(-_GLF_IDENTITY(282.403, clamp(282.403, 282.403, _GLF_IDENTITY(282.403, min(282.403, 282.403)))), max(-_GLF_IDENTITY(282.403, clamp(282.403, 282.403, _GLF_IDENTITY(282.403, min(282.403, 282.403)))), -_GLF_IDENTITY(282.403, clamp(282.403, 282.403, _GLF_IDENTITY(282.403, min(282.403, 282.403)))))))), 0.0, sin(sin(0.0)), 0.0), _GLF_IDENTITY(mat2(mat2(mat2(_GLF_IDENTITY(-_GLF_IDENTITY(282.403, clamp(282.403, 282.403, _GLF_IDENTITY(282.403, min(282.403, 282.403)))), clamp(-_GLF_IDENTITY(282.403, clamp(282.403, 282.403, _GLF_IDENTITY(282.403, min(282.403, 282.403)))), -_GLF_IDENTITY(282.403, clamp(282.403, 282.403, _GLF_IDENTITY(282.403, min(282.403, 282.403)))), _GLF_IDENTITY(-_GLF_IDENTITY(282.403, clamp(282.403, 282.403, _GLF_IDENTITY(282.403, min(282.403, 282.403)))), max(-_GLF_IDENTITY(282.403, clamp(282.403, 282.403, _GLF_IDENTITY(282.403, min(282.403, 282.403)))), -_GLF_IDENTITY(282.403, clamp(282.403, 282.403, _GLF_IDENTITY(282.403, min(282.403, 282.403)))))))), 0.0, sin(sin(0.0)), 0.0))), (mat2(mat2(mat2(_GLF_IDENTITY(-_GLF_IDENTITY(282.403, clamp(282.403, 282.403, _GLF_IDENTITY(282.403, min(282.403, 282.403)))), clamp(-_GLF_IDENTITY(282.403, clamp(282.403, 282.403, _GLF_IDENTITY(282.403, min(282.403, 282.403)))), -_GLF_IDENTITY(282.403, clamp(282.403, 282.403, _GLF_IDENTITY(282.403, min(282.403, 282.403)))), _GLF_IDENTITY(-_GLF_IDENTITY(282.403, clamp(282.403, 282.403, _GLF_IDENTITY(282.403, min(282.403, 282.403)))), max(-_GLF_IDENTITY(282.403, clamp(282.403, 282.403, _GLF_IDENTITY(282.403, min(282.403, 282.403)))), -_GLF_IDENTITY(282.403, clamp(282.403, 282.403, _GLF_IDENTITY(282.403, min(282.403, 282.403)))))))), 0.0, sin(sin(0.0)), 0.0)))) - mat2(0.0, 0.0, 0.0, 0.0)))), float(_GLF_IDENTITY(mat2(_GLF_IDENTITY(-_GLF_IDENTITY(282.403, clamp(282.403, 282.403, _GLF_IDENTITY(282.403, min(282.403, 282.403)))), clamp(-_GLF_IDENTITY(282.403, clamp(282.403, 282.403, _GLF_IDENTITY(282.403, min(282.403, 282.403)))), -_GLF_IDENTITY(282.403, clamp(282.403, 282.403, _GLF_IDENTITY(282.403, min(282.403, 282.403)))), _GLF_IDENTITY(-_GLF_IDENTITY(282.403, clamp(282.403, 282.403, _GLF_IDENTITY(282.403, min(282.403, 282.403)))), max(-_GLF_IDENTITY(282.403, clamp(282.403, 282.403, _GLF_IDENTITY(282.403, min(282.403, 282.403)))), -_GLF_IDENTITY(282.403, clamp(282.403, 282.403, _GLF_IDENTITY(282.403, min(282.403, 282.403)))))))), 0.0, sin(sin(0.0)), 0.0), _GLF_IDENTITY(mat2(mat2(mat2(_GLF_IDENTITY(-_GLF_IDENTITY(282.403, clamp(282.403, 282.403, _GLF_IDENTITY(282.403, min(282.403, 282.403)))), clamp(-_GLF_IDENTITY(282.403, clamp(282.403, 282.403, _GLF_IDENTITY(282.403, min(282.403, 282.403)))), -_GLF_IDENTITY(282.403, clamp(282.403, 282.403, _GLF_IDENTITY(282.403, min(282.403, 282.403)))), _GLF_IDENTITY(-_GLF_IDENTITY(282.403, clamp(282.403, 282.403, _GLF_IDENTITY(282.403, min(282.403, 282.403)))), max(-_GLF_IDENTITY(282.403, clamp(282.403, 282.403, _GLF_IDENTITY(282.403, min(282.403, 282.403)))), -_GLF_IDENTITY(282.403, clamp(282.403, 282.403, _GLF_IDENTITY(282.403, min(282.403, 282.403)))))))), 0.0, sin(sin(0.0)), 0.0))), (mat2(mat2(mat2(_GLF_IDENTITY(-_GLF_IDENTITY(282.403, clamp(282.403, 282.403, _GLF_IDENTITY(282.403, min(282.403, 282.403)))), clamp(-_GLF_IDENTITY(282.403, clamp(282.403, 282.403, _GLF_IDENTITY(282.403, min(282.403, 282.403)))), -_GLF_IDENTITY(282.403, clamp(282.403, 282.403, _GLF_IDENTITY(282.403, min(282.403, 282.403)))), _GLF_IDENTITY(-_GLF_IDENTITY(282.403, clamp(282.403, 282.403, _GLF_IDENTITY(282.403, min(282.403, 282.403)))), max(-_GLF_IDENTITY(282.403, clamp(282.403, 282.403, _GLF_IDENTITY(282.403, min(282.403, 282.403)))), -_GLF_IDENTITY(282.403, clamp(282.403, 282.403, _GLF_IDENTITY(282.403, min(282.403, 282.403)))))))), 0.0, sin(sin(0.0)), 0.0)))) - mat2(0.0, 0.0, 0.0, 0.0)))))))), mat3(1.0) * (vec3(9146.3730, -_GLF_IDENTITY(1459.2517, mix(float(_GLF_IDENTITY(1459.2517, mix(float(_GLF_FUZZED(4.9)), float(1459.2517), bool(true)))), float(_GLF_FUZZED(1.3)), bool(false))), _GLF_IDENTITY(-_GLF_IDENTITY(282.403, clamp(282.403, 282.403, _GLF_IDENTITY(282.403, min(282.403, 282.403)))), _GLF_IDENTITY(float(_GLF_IDENTITY(mat2(_GLF_IDENTITY(-_GLF_IDENTITY(282.403, clamp(282.403, 282.403, _GLF_IDENTITY(282.403, min(282.403, 282.403)))), clamp(-_GLF_IDENTITY(282.403, clamp(282.403, 282.403, _GLF_IDENTITY(282.403, min(282.403, 282.403)))), -_GLF_IDENTITY(282.403, clamp(282.403, 282.403, _GLF_IDENTITY(282.403, min(282.403, 282.403)))), _GLF_IDENTITY(-_GLF_IDENTITY(282.403, clamp(282.403, 282.403, _GLF_IDENTITY(282.403, min(282.403, 282.403)))), max(-_GLF_IDENTITY(282.403, clamp(282.403, 282.403, _GLF_IDENTITY(282.403, min(282.403, 282.403)))), -_GLF_IDENTITY(282.403, clamp(282.403, 282.403, _GLF_IDENTITY(282.403, min(282.403, 282.403)))))))), 0.0, sin(sin(0.0)), 0.0), _GLF_IDENTITY(mat2(mat2(mat2(_GLF_IDENTITY(-_GLF_IDENTITY(282.403, clamp(282.403, 282.403, _GLF_IDENTITY(282.403, min(282.403, 282.403)))), clamp(-_GLF_IDENTITY(282.403, clamp(282.403, 282.403, _GLF_IDENTITY(282.403, min(282.403, 282.403)))), -_GLF_IDENTITY(282.403, clamp(282.403, 282.403, _GLF_IDENTITY(282.403, min(282.403, 282.403)))), _GLF_IDENTITY(-_GLF_IDENTITY(282.403, clamp(282.403, 282.403, _GLF_IDENTITY(282.403, min(282.403, 282.403)))), max(-_GLF_IDENTITY(282.403, clamp(282.403, 282.403, _GLF_IDENTITY(282.403, min(282.403, 282.403)))), -_GLF_IDENTITY(282.403, clamp(282.403, 282.403, _GLF_IDENTITY(282.403, min(282.403, 282.403)))))))), 0.0, sin(sin(0.0)), 0.0))), (mat2(mat2(mat2(_GLF_IDENTITY(-_GLF_IDENTITY(282.403, clamp(282.403, 282.403, _GLF_IDENTITY(282.403, min(282.403, 282.403)))), clamp(-_GLF_IDENTITY(282.403, clamp(282.403, 282.403, _GLF_IDENTITY(282.403, min(282.403, 282.403)))), -_GLF_IDENTITY(282.403, clamp(282.403, 282.403, _GLF_IDENTITY(282.403, min(282.403, 282.403)))), _GLF_IDENTITY(-_GLF_IDENTITY(282.403, clamp(282.403, 282.403, _GLF_IDENTITY(282.403, min(282.403, 282.403)))), max(-_GLF_IDENTITY(282.403, clamp(282.403, 282.403, _GLF_IDENTITY(282.403, min(282.403, 282.403)))), -_GLF_IDENTITY(282.403, clamp(282.403, 282.403, _GLF_IDENTITY(282.403, min(282.403, 282.403)))))))), 0.0, sin(sin(0.0)), 0.0)))) - mat2(0.0, 0.0, 0.0, 0.0)))), clamp(float(_GLF_IDENTITY(mat2(_GLF_IDENTITY(-_GLF_IDENTITY(282.403, clamp(282.403, 282.403, _GLF_IDENTITY(282.403, min(282.403, 282.403)))), clamp(-_GLF_IDENTITY(282.403, clamp(282.403, 282.403, _GLF_IDENTITY(282.403, min(282.403, 282.403)))), -_GLF_IDENTITY(282.403, clamp(282.403, 282.403, _GLF_IDENTITY(282.403, min(282.403, 282.403)))), _GLF_IDENTITY(-_GLF_IDENTITY(282.403, clamp(282.403, 282.403, _GLF_IDENTITY(282.403, min(282.403, 282.403)))), max(-_GLF_IDENTITY(282.403, clamp(282.403, 282.403, _GLF_IDENTITY(282.403, min(282.403, 282.403)))), -_GLF_IDENTITY(282.403, clamp(282.403, 282.403, _GLF_IDENTITY(282.403, min(282.403, 282.403)))))))), 0.0, sin(sin(0.0)), 0.0), _GLF_IDENTITY(mat2(mat2(mat2(_GLF_IDENTITY(-_GLF_IDENTITY(282.403, clamp(282.403, 282.403, _GLF_IDENTITY(282.403, min(282.403, 282.403)))), clamp(-_GLF_IDENTITY(282.403, clamp(282.403, 282.403, _GLF_IDENTITY(282.403, min(282.403, 282.403)))), -_GLF_IDENTITY(282.403, clamp(282.403, 282.403, _GLF_IDENTITY(282.403, min(282.403, 282.403)))), _GLF_IDENTITY(-_GLF_IDENTITY(282.403, clamp(282.403, 282.403, _GLF_IDENTITY(282.403, min(282.403, 282.403)))), max(-_GLF_IDENTITY(282.403, clamp(282.403, 282.403, _GLF_IDENTITY(282.403, min(282.403, 282.403)))), -_GLF_IDENTITY(282.403, clamp(282.403, 282.403, _GLF_IDENTITY(282.403, min(282.403, 282.403)))))))), 0.0, sin(sin(0.0)), 0.0))), (mat2(mat2(mat2(_GLF_IDENTITY(-_GLF_IDENTITY(282.403, clamp(282.403, 282.403, _GLF_IDENTITY(282.403, min(282.403, 282.403)))), clamp(-_GLF_IDENTITY(282.403, clamp(282.403, 282.403, _GLF_IDENTITY(282.403, min(282.403, 282.403)))), -_GLF_IDENTITY(282.403, clamp(282.403, 282.403, _GLF_IDENTITY(282.403, min(282.403, 282.403)))), _GLF_IDENTITY(-_GLF_IDENTITY(282.403, clamp(282.403, 282.403, _GLF_IDENTITY(282.403, min(282.403, 282.403)))), max(-_GLF_IDENTITY(282.403, clamp(282.403, 282.403, _GLF_IDENTITY(282.403, min(282.403, 282.403)))), -_GLF_IDENTITY(282.403, clamp(282.403, 282.403, _GLF_IDENTITY(282.403, min(282.403, 282.403)))))))), 0.0, sin(sin(0.0)), 0.0)))) - mat2(0.0, 0.0, 0.0, 0.0)))), float(_GLF_IDENTITY(mat2(_GLF_IDENTITY(-_GLF_IDENTITY(282.403, clamp(282.403, 282.403, _GLF_IDENTITY(282.403, min(282.403, 282.403)))), clamp(-_GLF_IDENTITY(282.403, clamp(282.403, 282.403, _GLF_IDENTITY(282.403, min(282.403, 282.403)))), -_GLF_IDENTITY(282.403, clamp(282.403, 282.403, _GLF_IDENTITY(282.403, min(282.403, 282.403)))), _GLF_IDENTITY(-_GLF_IDENTITY(282.403, clamp(282.403, 282.403, _GLF_IDENTITY(282.403, min(282.403, 282.403)))), max(-_GLF_IDENTITY(282.403, clamp(282.403, 282.403, _GLF_IDENTITY(282.403, min(282.403, 282.403)))), -_GLF_IDENTITY(282.403, clamp(282.403, 282.403, _GLF_IDENTITY(282.403, min(282.403, 282.403)))))))), 0.0, sin(sin(0.0)), 0.0), _GLF_IDENTITY(mat2(mat2(mat2(_GLF_IDENTITY(-_GLF_IDENTITY(282.403, clamp(282.403, 282.403, _GLF_IDENTITY(282.403, min(282.403, 282.403)))), clamp(-_GLF_IDENTITY(282.403, clamp(282.403, 282.403, _GLF_IDENTITY(282.403, min(282.403, 282.403)))), -_GLF_IDENTITY(282.403, clamp(282.403, 282.403, _GLF_IDENTITY(282.403, min(282.403, 282.403)))), _GLF_IDENTITY(-_GLF_IDENTITY(282.403, clamp(282.403, 282.403, _GLF_IDENTITY(282.403, min(282.403, 282.403)))), max(-_GLF_IDENTITY(282.403, clamp(282.403, 282.403, _GLF_IDENTITY(282.403, min(282.403, 282.403)))), -_GLF_IDENTITY(282.403, clamp(282.403, 282.403, _GLF_IDENTITY(282.403, min(282.403, 282.403)))))))), 0.0, sin(sin(0.0)), 0.0))), (mat2(mat2(mat2(_GLF_IDENTITY(-_GLF_IDENTITY(282.403, clamp(282.403, 282.403, _GLF_IDENTITY(282.403, min(282.403, 282.403)))), clamp(-_GLF_IDENTITY(282.403, clamp(282.403, 282.403, _GLF_IDENTITY(282.403, min(282.403, 282.403)))), -_GLF_IDENTITY(282.403, clamp(282.403, 282.403, _GLF_IDENTITY(282.403, min(282.403, 282.403)))), _GLF_IDENTITY(-_GLF_IDENTITY(282.403, clamp(282.403, 282.403, _GLF_IDENTITY(282.403, min(282.403, 282.403)))), max(-_GLF_IDENTITY(282.403, clamp(282.403, 282.403, _GLF_IDENTITY(282.403, min(282.403, 282.403)))), -_GLF_IDENTITY(282.403, clamp(282.403, 282.403, _GLF_IDENTITY(282.403, min(282.403, 282.403)))))))), 0.0, sin(sin(0.0)), 0.0)))) - mat2(0.0, 0.0, 0.0, 0.0)))), float(_GLF_IDENTITY(mat2(_GLF_IDENTITY(-_GLF_IDENTITY(282.403, clamp(282.403, 282.403, _GLF_IDENTITY(282.403, min(282.403, 282.403)))), clamp(-_GLF_IDENTITY(282.403, clamp(282.403, 282.403, _GLF_IDENTITY(282.403, min(282.403, 282.403)))), -_GLF_IDENTITY(282.403, clamp(282.403, 282.403, _GLF_IDENTITY(282.403, min(282.403, 282.403)))), _GLF_IDENTITY(-_GLF_IDENTITY(282.403, clamp(282.403, 282.403, _GLF_IDENTITY(282.403, min(282.403, 282.403)))), max(-_GLF_IDENTITY(282.403, clamp(282.403, 282.403, _GLF_IDENTITY(282.403, min(282.403, 282.403)))), -_GLF_IDENTITY(282.403, clamp(282.403, 282.403, _GLF_IDENTITY(282.403, min(282.403, 282.403)))))))), 0.0, sin(sin(0.0)), 0.0), _GLF_IDENTITY(mat2(mat2(mat2(_GLF_IDENTITY(-_GLF_IDENTITY(282.403, clamp(282.403, 282.403, _GLF_IDENTITY(282.403, min(282.403, 282.403)))), clamp(-_GLF_IDENTITY(282.403, clamp(282.403, 282.403, _GLF_IDENTITY(282.403, min(282.403, 282.403)))), -_GLF_IDENTITY(282.403, clamp(282.403, 282.403, _GLF_IDENTITY(282.403, min(282.403, 282.403)))), _GLF_IDENTITY(-_GLF_IDENTITY(282.403, clamp(282.403, 282.403, _GLF_IDENTITY(282.403, min(282.403, 282.403)))), max(-_GLF_IDENTITY(282.403, clamp(282.403, 282.403, _GLF_IDENTITY(282.403, min(282.403, 282.403)))), -_GLF_IDENTITY(282.403, clamp(282.403, 282.403, _GLF_IDENTITY(282.403, min(282.403, 282.403)))))))), 0.0, sin(sin(0.0)), 0.0))), (mat2(mat2(mat2(_GLF_IDENTITY(-_GLF_IDENTITY(282.403, clamp(282.403, 282.403, _GLF_IDENTITY(282.403, min(282.403, 282.403)))), clamp(-_GLF_IDENTITY(282.403, clamp(282.403, 282.403, _GLF_IDENTITY(282.403, min(282.403, 282.403)))), -_GLF_IDENTITY(282.403, clamp(282.403, 282.403, _GLF_IDENTITY(282.403, min(282.403, 282.403)))), _GLF_IDENTITY(-_GLF_IDENTITY(282.403, clamp(282.403, 282.403, _GLF_IDENTITY(282.403, min(282.403, 282.403)))), max(-_GLF_IDENTITY(282.403, clamp(282.403, 282.403, _GLF_IDENTITY(282.403, min(282.403, 282.403)))), -_GLF_IDENTITY(282.403, clamp(282.403, 282.403, _GLF_IDENTITY(282.403, min(282.403, 282.403)))))))), 0.0, sin(sin(0.0)), 0.0)))) - mat2(0.0, 0.0, 0.0, 0.0)))))))))));
                        vec2 donor_replacementGLF_dead7o = _GLF_FUZZED(vec2(-8524.9745, 7.4));
                        if (GLF_dead7injectionSwitch.x < (donor_replacementGLF_dead7m.x)) {
                            int GLF_dead7k = 1;
                            while (GLF_dead7k >= 0) {
                                donor_replacementGLF_dead7o = donor_replacementGLF_dead7o + donor_replacementGLF_dead7o;
                                GLF_dead7k--;
                            }
                            donor_replacementGLF_dead7m = vec3(GLF_dead7injectionSwitch.x, cos(donor_replacementGLF_dead7o));
                        }
                    }
                }
                if (_GLF_DEAD(false)) {
                    break;
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        bool donor_replacementGLF_dead8c6 = _GLF_FUZZED(true);
                        int donor_replacementGLF_dead8msb8 = _GLF_FUZZED(findMSB(172756u));
                        vec2 donor_replacementGLF_dead8pos = _GLF_FUZZED(fwidthCoarse(vec2(_GLF_IDENTITY(-9.5, (true ? (-9.5) : _GLF_FUZZED(GLF_dead8b_b))), -6.8)));
                        vec3 donor_replacementGLF_dead8setting = _GLF_FUZZED(mat2x3(-70.81, 1.0, 73.85, -4.9, 2.0, -5553.3518)[1]);
                        if (!donor_replacementGLF_dead8c6) {
                            ;
                        }
                    }
                }
                if (_GLF_DEAD(_GLF_IDENTITY(false, (false) || false))) {
                    _GLF_color = asin(sin(GLF_dead3_GLF_color));
                }
                if (_GLF_DEAD(false)) {
                    int donor_replacementGLF_dead4i = _GLF_FUZZED((94615 - N));
                    float donor_replacementGLF_dead4ref = _GLF_FUZZED(dFdy(-2.1));
                    float donor_replacementGLF_dead4s = _GLF_FUZZED(-661.248);
                    if (mod(float(donor_replacementGLF_dead4i), donor_replacementGLF_dead4ref) <= 0.01) {
                        donor_replacementGLF_dead4s += 0.2;
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        _GLF_color = (vec4(4521.3582, -48.60, 9.2, 3310.5532) * 6748.8343);
                    }
                }
                if (_GLF_DEAD(false)) {
                    continue;
                }
                break;
        }
        i++;
    } while (i < 10);
    if (_GLF_DEAD(_GLF_IDENTITY(false, _GLF_IDENTITY(!(!(false)), !(!(!(!(false)))))))) {
        int donor_replacementGLF_dead6iteration = _GLF_FUZZED(ivec3(_GLF_IDENTITY(67116, 1 * (_GLF_IDENTITY(67116, clamp(67116, 67116, 67116)))), 49262, 79986).x);
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            vec3 donor_replacementGLF_dead8d = _GLF_FUZZED(exp2((vec3(-_GLF_IDENTITY(8964.3830, mix(float(_GLF_IDENTITY(8964.3830, (8964.3830) * 1.0)), float(_GLF_FUZZED(828.183)), bool(false))), 8.3, 36.08) + vec3(55.74, 8775.7913, 2.8))));
            if (length(donor_replacementGLF_dead8d) <= float(bitfieldExtract(int(GLF_dead8resolution.x), 0, 1))) {
                ;
            }
        }
        {
            ;
        }
        if (_GLF_DEAD(false)) {
            _GLF_color = _GLF_color;
        }
    }
    for (int j = 0; j < 10; j++) {
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
            break;
        }
        _GLF_IDENTITY(temp[j] = data[j], ~(~(temp[j] = data[j])));
    }
    if (_GLF_DEAD(false)) {
        _GLF_color = mix(GLF_dead0_GLF_color, cosh(vec4(-9.5, -999.510, _GLF_IDENTITY(-77.42, max(-77.42, -77.42)), 1857.0648)), bvec4(_GLF_IDENTITY(false, false || (false)), false, false, false));
    }
    mergeSort();
    if (_GLF_DEAD(false)) {
        return;
    }
    float grey;
    if (int(gl_FragCoord[1]) < 30) {
        grey = 0.5 + float(data[0]) / 10.0;
        if (_GLF_DEAD(false)) {
            vec3 donor_replacementGLF_dead9color = _GLF_FUZZED(mix(vec3(7.3, 413.468, 25.10), vec3(402.714, _GLF_IDENTITY(4656.9917, (_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)) ? _GLF_IDENTITY(4656.9917, max(4656.9917, 4656.9917)) : _GLF_FUZZED(grey))), -33.97), (grey * (-8348.9943))));
            do {
                donor_replacementGLF_dead9color -= GLF_dead9palette(vec3(float(GLF_dead9obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_dead9injectionSwitch.y), _GLF_IDENTITY(10, ~(_GLF_IDENTITY(~(10), min(~(10), ~(10))))))]) * 0.1), vec3(0.8), trunc(vec3(0.1)), vec3(GLF_dead9injectionSwitch.x, 0.6, float(GLF_dead9obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_dead9injectionSwitch.x), 10)]) * 0.1));
                i++;
            } while (i != GLF_dead9obj.numbers[2]);
        }
        if (_GLF_DEAD(false)) {
            {
                i = (4 * i * (1000 - i)) / 1000;
            }
            if (_GLF_DEAD(false)) {
                _GLF_color = vec4(grey);
            }
        }
        if (_GLF_DEAD(false)) {
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < sin(abs(0.0)))))) {
                vec3 donor_replacementGLF_dead8d = _GLF_FUZZED(vec3(9800.8497, 399.952, 4.4));
                if (length(donor_replacementGLF_dead8d) <= float(bitfieldExtract(int(GLF_dead8resolution.x), 0, 1))) {
                    ;
                }
            }
            _GLF_color = dFdy(_GLF_color);
            if (_GLF_DEAD(false)) {
                bool donor_replacementGLF_dead8c2 = _GLF_FUZZED(any((mat3x2(-3.5, 8.7, 1961.5696, -51.00, 27.10, -27.14), bvec2(false, false))));
                if (!donor_replacementGLF_dead8c2) {
                    ;
                }
            }
        }
    } else {
        if (int(gl_FragCoord[1]) < 60) {
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < sin(0.0))))) {
                vec2 donor_replacementGLF_dead2coord = _GLF_FUZZED(_GLF_IDENTITY(injectionSwitch, vec2(0.0, 0.0) + (injectionSwitch)));
                if (_GLF_DEAD(false)) {
                    vec4 donor_replacementGLF_dead4c = _GLF_FUZZED((_GLF_IDENTITY(uintBitsToFloat(uvec3(164846u, 4879u, 102535u)), mix(vec3((uintBitsToFloat(uvec3(164846u, 4879u, 102535u)))[0], (uintBitsToFloat(uvec3(164846u, 4879u, 102535u)))[1], (uintBitsToFloat(uvec3(164846u, 4879u, 102535u)))[2]), vec3(_GLF_FUZZED(((-8750.6499) - 7113.0904)), _GLF_FUZZED(-21.67), _GLF_FUZZED(-1350.9368)), bvec3(false, false, false))) * mat4x3(-755.247, 9.9, 264.395, -621.463, 2.1, 107.925, -1.6, 48.58, 0.8, 9.5, 9.4, -8.4)));
                    int donor_replacementGLF_dead4i = _GLF_FUZZED(int(true));
                    if (_GLF_DEAD(false)) {
                        for (int GLF_dead9i = int(GLF_dead9injectionSwitch.x); GLF_dead9i < 10; GLF_dead9i++) {
                            GLF_dead9obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead9i, 10)] = (10 - GLF_dead9i) * int(GLF_dead9injectionSwitch.y);
                        }
                    }
                    {
                        donor_replacementGLF_dead4c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4i, 4)] = donor_replacementGLF_dead4c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4i, 4)] * donor_replacementGLF_dead4c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4i, 4)];
                        if (_GLF_DEAD(false)) {
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                for (int GLF_dead9i = int(GLF_dead9injectionSwitch.x); GLF_dead9i < 10; GLF_dead9i++) {
                                    GLF_dead9obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead9i, 10)] = (10 - GLF_dead9i) * int(GLF_dead9injectionSwitch.y);
                                }
                            }
                            _GLF_color = GLF_dead0_GLF_color;
                        }
                        if (_GLF_DEAD(false)) {
                            return;
                        }
                    }
                }
                int donor_replacementGLF_dead2i = _GLF_FUZZED((false ? i : N));
                int donor_replacementGLF_dead2j = _GLF_FUZZED(bitCount(135552u));
                vec4 donor_replacementGLF_dead2res = _GLF_FUZZED(step(fma(grey, grey, 9503.1359), vec4(-82.42, -2.0, -7.6, -44.59)));
                {
                    _GLF_IDENTITY(donor_replacementGLF_dead2res += texture(GLF_dead2tex, _GLF_IDENTITY(donor_replacementGLF_dead2coord, max(_GLF_IDENTITY(donor_replacementGLF_dead2coord, vec2(donor_replacementGLF_dead2coord[0], donor_replacementGLF_dead2coord[1])), _GLF_IDENTITY(donor_replacementGLF_dead2coord, clamp(donor_replacementGLF_dead2coord, donor_replacementGLF_dead2coord, donor_replacementGLF_dead2coord)))) + vec2(float(donor_replacementGLF_dead2i - 1) * grey, float(donor_replacementGLF_dead2j - 1) * grey)) * _GLF_IDENTITY(GLF_dead2weights[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead2i * 3 + donor_replacementGLF_dead2j, 9)], (_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)) ? GLF_dead2weights[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead2i * 3 + donor_replacementGLF_dead2j, 9)] : _GLF_FUZZED(-92.75))), (donor_replacementGLF_dead2res += _GLF_IDENTITY(texture(GLF_dead2tex, _GLF_IDENTITY(donor_replacementGLF_dead2coord, max(_GLF_IDENTITY(donor_replacementGLF_dead2coord, vec2(donor_replacementGLF_dead2coord[0], donor_replacementGLF_dead2coord[1])), _GLF_IDENTITY(donor_replacementGLF_dead2coord, clamp(donor_replacementGLF_dead2coord, donor_replacementGLF_dead2coord, donor_replacementGLF_dead2coord)))) + vec2(_GLF_IDENTITY(float(donor_replacementGLF_dead2i - 1), mix(float(_GLF_FUZZED(-5163.2272)), float(float(donor_replacementGLF_dead2i - 1)), bool(true))) * grey, float(donor_replacementGLF_dead2j - 1) * grey)) * _GLF_IDENTITY(GLF_dead2weights[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead2i * 3 + donor_replacementGLF_dead2j, 9)], (_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)) ? GLF_dead2weights[_GLF_MAKE_IN_BOUNDS_INT(_GLF_IDENTITY(donor_replacementGLF_dead2i * 3 + donor_replacementGLF_dead2j, ~(_GLF_IDENTITY(~(donor_replacementGLF_dead2i * 3 + donor_replacementGLF_dead2j), (_GLF_IDENTITY(~(donor_replacementGLF_dead2i * 3 + donor_replacementGLF_dead2j), max(~(donor_replacementGLF_dead2i * 3 + donor_replacementGLF_dead2j), ~(donor_replacementGLF_dead2i * 3 + donor_replacementGLF_dead2j)))) | (~(donor_replacementGLF_dead2i * 3 + donor_replacementGLF_dead2j))))), 9)] : _GLF_IDENTITY(_GLF_FUZZED(-92.75), float(mat4x3(_GLF_IDENTITY(_GLF_FUZZED(-92.75), mix(float(_GLF_FUZZED(9.2)), float(_GLF_FUZZED(-92.75)), bool(true))), exp(0.0), 1.0, 1.0, 1.0, 0.0, 1.0, determinant(mat3(0.0, 1.0, 0.0, 0.0, 0.0, round(length(normalize(vec2(1.0, 1.0)))), 0.0, sqrt(0.0), 0.0)), 1.0, tan(0.0), 0.0, _GLF_IDENTITY(dot(vec4(0.0, 0.0, 1.0, 0.0), vec4(0.0, 0.0, 1.0, 0.0)), dot(vec4(0.0, 0.0, 1.0, 0.0), vec4(0.0, 0.0, 1.0, 0.0)))))))), (false ? _GLF_FUZZED((grey + GLF_dead7gl_FragCoord)) : _GLF_IDENTITY(texture(GLF_dead2tex, _GLF_IDENTITY(donor_replacementGLF_dead2coord, max(_GLF_IDENTITY(donor_replacementGLF_dead2coord, vec2(donor_replacementGLF_dead2coord[0], donor_replacementGLF_dead2coord[1])), _GLF_IDENTITY(donor_replacementGLF_dead2coord, clamp(donor_replacementGLF_dead2coord, donor_replacementGLF_dead2coord, donor_replacementGLF_dead2coord)))) + vec2(_GLF_IDENTITY(float(donor_replacementGLF_dead2i - 1), mix(float(_GLF_FUZZED(-5163.2272)), float(float(donor_replacementGLF_dead2i - 1)), bool(true))) * grey, float(donor_replacementGLF_dead2j - 1) * grey)) * _GLF_IDENTITY(GLF_dead2weights[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead2i * 3 + donor_replacementGLF_dead2j, 9)], (_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)) ? GLF_dead2weights[_GLF_MAKE_IN_BOUNDS_INT(_GLF_IDENTITY(donor_replacementGLF_dead2i * 3 + donor_replacementGLF_dead2j, ~(_GLF_IDENTITY(~(donor_replacementGLF_dead2i * 3 + donor_replacementGLF_dead2j), (_GLF_IDENTITY(~(donor_replacementGLF_dead2i * 3 + donor_replacementGLF_dead2j), max(~(donor_replacementGLF_dead2i * 3 + donor_replacementGLF_dead2j), ~(donor_replacementGLF_dead2i * 3 + donor_replacementGLF_dead2j)))) | (~(donor_replacementGLF_dead2i * 3 + donor_replacementGLF_dead2j))))), 9)] : _GLF_IDENTITY(_GLF_FUZZED(-92.75), float(mat4x3(_GLF_IDENTITY(_GLF_FUZZED(-92.75), mix(float(_GLF_FUZZED(9.2)), float(_GLF_FUZZED(-92.75)), bool(true))), exp(0.0), 1.0, 1.0, 1.0, 0.0, 1.0, determinant(mat3(0.0, 1.0, 0.0, 0.0, 0.0, round(length(normalize(vec2(1.0, 1.0)))), 0.0, sqrt(0.0), 0.0)), 1.0, tan(0.0), 0.0, _GLF_IDENTITY(dot(vec4(0.0, 0.0, 1.0, 0.0), vec4(0.0, 0.0, 1.0, 0.0)), dot(vec4(0.0, 0.0, 1.0, 0.0), vec4(0.0, 0.0, 1.0, 0.0)))))))), clamp(texture(GLF_dead2tex, _GLF_IDENTITY(donor_replacementGLF_dead2coord, max(_GLF_IDENTITY(donor_replacementGLF_dead2coord, vec2(donor_replacementGLF_dead2coord[0], donor_replacementGLF_dead2coord[1])), _GLF_IDENTITY(donor_replacementGLF_dead2coord, clamp(donor_replacementGLF_dead2coord, donor_replacementGLF_dead2coord, donor_replacementGLF_dead2coord)))) + vec2(_GLF_IDENTITY(float(donor_replacementGLF_dead2i - 1), mix(float(_GLF_FUZZED(-5163.2272)), float(float(donor_replacementGLF_dead2i - 1)), bool(true))) * grey, float(donor_replacementGLF_dead2j - 1) * grey)) * _GLF_IDENTITY(GLF_dead2weights[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead2i * 3 + donor_replacementGLF_dead2j, 9)], (_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)) ? GLF_dead2weights[_GLF_MAKE_IN_BOUNDS_INT(_GLF_IDENTITY(donor_replacementGLF_dead2i * 3 + donor_replacementGLF_dead2j, ~(_GLF_IDENTITY(~(donor_replacementGLF_dead2i * 3 + donor_replacementGLF_dead2j), (_GLF_IDENTITY(~(donor_replacementGLF_dead2i * 3 + donor_replacementGLF_dead2j), max(~(donor_replacementGLF_dead2i * 3 + donor_replacementGLF_dead2j), ~(donor_replacementGLF_dead2i * 3 + donor_replacementGLF_dead2j)))) | (~(donor_replacementGLF_dead2i * 3 + donor_replacementGLF_dead2j))))), 9)] : _GLF_IDENTITY(_GLF_FUZZED(-92.75), float(mat4x3(_GLF_IDENTITY(_GLF_FUZZED(-92.75), mix(float(_GLF_FUZZED(9.2)), float(_GLF_FUZZED(-92.75)), bool(true))), exp(0.0), 1.0, 1.0, 1.0, 0.0, 1.0, determinant(mat3(0.0, 1.0, 0.0, 0.0, 0.0, round(length(normalize(vec2(1.0, 1.0)))), 0.0, sqrt(0.0), 0.0)), 1.0, tan(0.0), 0.0, _GLF_IDENTITY(dot(vec4(0.0, 0.0, 1.0, 0.0), vec4(0.0, 0.0, 1.0, 0.0)), dot(vec4(0.0, 0.0, 1.0, 0.0), vec4(0.0, 0.0, 1.0, 0.0)))))))), _GLF_IDENTITY(texture(GLF_dead2tex, _GLF_IDENTITY(donor_replacementGLF_dead2coord, max(_GLF_IDENTITY(donor_replacementGLF_dead2coord, vec2(donor_replacementGLF_dead2coord[0], donor_replacementGLF_dead2coord[1])), _GLF_IDENTITY(donor_replacementGLF_dead2coord, clamp(donor_replacementGLF_dead2coord, donor_replacementGLF_dead2coord, donor_replacementGLF_dead2coord)))) + vec2(_GLF_IDENTITY(float(donor_replacementGLF_dead2i - 1), mix(float(_GLF_FUZZED(-5163.2272)), float(float(donor_replacementGLF_dead2i - 1)), bool(true))) * grey, float(donor_replacementGLF_dead2j - 1) * grey)) * _GLF_IDENTITY(GLF_dead2weights[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead2i * 3 + donor_replacementGLF_dead2j, 9)], (_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)) ? GLF_dead2weights[_GLF_MAKE_IN_BOUNDS_INT(_GLF_IDENTITY(donor_replacementGLF_dead2i * 3 + donor_replacementGLF_dead2j, ~(_GLF_IDENTITY(~(donor_replacementGLF_dead2i * 3 + donor_replacementGLF_dead2j), (_GLF_IDENTITY(~(donor_replacementGLF_dead2i * 3 + donor_replacementGLF_dead2j), max(~(donor_replacementGLF_dead2i * 3 + donor_replacementGLF_dead2j), ~(donor_replacementGLF_dead2i * 3 + donor_replacementGLF_dead2j)))) | (~(donor_replacementGLF_dead2i * 3 + donor_replacementGLF_dead2j))))), 9)] : _GLF_IDENTITY(_GLF_FUZZED(-92.75), float(mat4x3(_GLF_IDENTITY(_GLF_FUZZED(-92.75), mix(float(_GLF_FUZZED(9.2)), float(_GLF_FUZZED(-92.75)), bool(true))), exp(0.0), 1.0, 1.0, 1.0, 0.0, 1.0, determinant(mat3(0.0, 1.0, 0.0, 0.0, 0.0, round(length(normalize(vec2(1.0, 1.0)))), 0.0, sqrt(0.0), 0.0)), 1.0, tan(0.0), 0.0, _GLF_IDENTITY(dot(vec4(0.0, 0.0, 1.0, 0.0), vec4(0.0, 0.0, 1.0, 0.0)), dot(vec4(0.0, 0.0, 1.0, 0.0), vec4(0.0, 0.0, 1.0, 0.0)))))))), mat4(1.0) * (texture(GLF_dead2tex, _GLF_IDENTITY(donor_replacementGLF_dead2coord, max(_GLF_IDENTITY(donor_replacementGLF_dead2coord, vec2(donor_replacementGLF_dead2coord[0], donor_replacementGLF_dead2coord[1])), _GLF_IDENTITY(donor_replacementGLF_dead2coord, clamp(donor_replacementGLF_dead2coord, donor_replacementGLF_dead2coord, donor_replacementGLF_dead2coord)))) + vec2(_GLF_IDENTITY(float(donor_replacementGLF_dead2i - 1), mix(float(_GLF_FUZZED(-5163.2272)), float(float(donor_replacementGLF_dead2i - 1)), bool(true))) * grey, float(donor_replacementGLF_dead2j - 1) * grey)) * _GLF_IDENTITY(GLF_dead2weights[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead2i * 3 + donor_replacementGLF_dead2j, 9)], (_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)) ? GLF_dead2weights[_GLF_MAKE_IN_BOUNDS_INT(_GLF_IDENTITY(donor_replacementGLF_dead2i * 3 + donor_replacementGLF_dead2j, ~(_GLF_IDENTITY(~(donor_replacementGLF_dead2i * 3 + donor_replacementGLF_dead2j), (_GLF_IDENTITY(~(donor_replacementGLF_dead2i * 3 + donor_replacementGLF_dead2j), max(~(donor_replacementGLF_dead2i * 3 + donor_replacementGLF_dead2j), ~(donor_replacementGLF_dead2i * 3 + donor_replacementGLF_dead2j)))) | (~(donor_replacementGLF_dead2i * 3 + donor_replacementGLF_dead2j))))), 9)] : _GLF_IDENTITY(_GLF_FUZZED(-92.75), float(mat4x3(_GLF_IDENTITY(_GLF_FUZZED(-92.75), mix(float(_GLF_FUZZED(9.2)), float(_GLF_FUZZED(-92.75)), bool(true))), exp(0.0), 1.0, 1.0, 1.0, 0.0, 1.0, determinant(mat3(0.0, 1.0, 0.0, 0.0, 0.0, round(length(normalize(vec2(1.0, 1.0)))), 0.0, sqrt(0.0), 0.0)), 1.0, tan(0.0), 0.0, _GLF_IDENTITY(dot(vec4(0.0, 0.0, 1.0, 0.0), vec4(0.0, 0.0, 1.0, 0.0)), dot(vec4(0.0, 0.0, 1.0, 0.0), vec4(0.0, 0.0, 1.0, 0.0)))))))))), texture(GLF_dead2tex, _GLF_IDENTITY(donor_replacementGLF_dead2coord, max(_GLF_IDENTITY(donor_replacementGLF_dead2coord, vec2(donor_replacementGLF_dead2coord[0], donor_replacementGLF_dead2coord[1])), _GLF_IDENTITY(donor_replacementGLF_dead2coord, clamp(donor_replacementGLF_dead2coord, donor_replacementGLF_dead2coord, donor_replacementGLF_dead2coord)))) + vec2(_GLF_IDENTITY(float(donor_replacementGLF_dead2i - 1), mix(float(_GLF_FUZZED(-5163.2272)), float(float(donor_replacementGLF_dead2i - 1)), bool(true))) * grey, float(donor_replacementGLF_dead2j - 1) * grey)) * _GLF_IDENTITY(GLF_dead2weights[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead2i * 3 + donor_replacementGLF_dead2j, 9)], (_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)) ? GLF_dead2weights[_GLF_MAKE_IN_BOUNDS_INT(_GLF_IDENTITY(donor_replacementGLF_dead2i * 3 + donor_replacementGLF_dead2j, ~(_GLF_IDENTITY(~(donor_replacementGLF_dead2i * 3 + donor_replacementGLF_dead2j), (_GLF_IDENTITY(~(donor_replacementGLF_dead2i * 3 + donor_replacementGLF_dead2j), max(~(donor_replacementGLF_dead2i * 3 + donor_replacementGLF_dead2j), ~(donor_replacementGLF_dead2i * 3 + donor_replacementGLF_dead2j)))) | (~(donor_replacementGLF_dead2i * 3 + donor_replacementGLF_dead2j))))), 9)] : _GLF_IDENTITY(_GLF_FUZZED(-92.75), float(mat4x3(_GLF_IDENTITY(_GLF_FUZZED(-92.75), mix(float(_GLF_FUZZED(9.2)), float(_GLF_FUZZED(-92.75)), bool(true))), exp(0.0), 1.0, 1.0, 1.0, 0.0, 1.0, determinant(mat3(0.0, 1.0, 0.0, 0.0, 0.0, round(length(normalize(vec2(1.0, 1.0)))), 0.0, sqrt(0.0), 0.0)), 1.0, tan(0.0), 0.0, _GLF_IDENTITY(dot(vec4(0.0, 0.0, 1.0, 0.0), vec4(0.0, 0.0, 1.0, 0.0)), dot(vec4(0.0, 0.0, 1.0, 0.0), vec4(0.0, 0.0, 1.0, 0.0))))))))))))) - vec4(0.0, _GLF_IDENTITY(0.0, (true ? 0.0 : _GLF_FUZZED(-1.1))), 0.0, 0.0));
                }
            }
            if (_GLF_DEAD(false)) {
                _GLF_color = sinh(_GLF_color);
            }
            _GLF_IDENTITY(grey = 0.5 + float(data[1]) / 10.0, (false ? _GLF_FUZZED(distance(_GLF_IDENTITY(GLF_dead3_GLF_color, log(vec4(1.0, 1.0, 1.0, 1.0)) + (_GLF_IDENTITY(GLF_dead3_GLF_color, max(GLF_dead3_GLF_color, GLF_dead3_GLF_color)))), vec4(-8872.2300, -1987.0561, 5011.4790, -2.7))) : (grey = 0.5 + float(data[1]) / 10.0)));
        } else {
            if (int(gl_FragCoord[1]) < 90) {
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    _GLF_color = vec4(-4.4, 5650.1177, 30.15, 777.802);
                    if (_GLF_DEAD(false)) {
                        {
                            GLF_dead10_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                            {
                                GLF_dead10_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
                            }
                        }
                        return;
                    }
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    _GLF_color = GLF_dead3_GLF_color;
                }
                if (_GLF_IDENTITY(_GLF_DEAD(false), !(!(_GLF_DEAD(false))))) {
                    int donor_replacementGLF_dead8msb8 = _GLF_FUZZED((N * N));
                    vec2 donor_replacementGLF_dead8pos = _GLF_FUZZED(injectionSwitch);
                    vec3 donor_replacementGLF_dead8setting = _GLF_FUZZED(vec3(-451.292, 987.794, -3845.2825));
                    {
                        ;
                    }
                }
                grey = 0.5 + float(data[2]) / 10.0;
            } else {
                if (int(gl_FragCoord[1]) < 120) {
                    _GLF_IDENTITY(grey = 0.5 + _GLF_IDENTITY(float(data[3]), float(mat2x3(_GLF_IDENTITY(float(data[3]), mix(float(float(data[3])), float(_GLF_FUZZED(1470.6266)), bool(false))), 1.0, 1.0, 0.0, 0.0, 1.0))) / 10.0, (true ? (grey = 0.5 + _GLF_IDENTITY(_GLF_IDENTITY(float(data[3]), float(mat2x3(_GLF_IDENTITY(float(data[3]), mix(float(float(data[3])), float(_GLF_FUZZED(1470.6266)), bool(false))), 1.0, 1.0, 0.0, 0.0, 1.0))), mix(float(_GLF_IDENTITY(_GLF_IDENTITY(float(data[3]), float(mat2x3(_GLF_IDENTITY(float(data[3]), mix(float(float(data[3])), float(_GLF_FUZZED(1470.6266)), bool(false))), 1.0, 1.0, 0.0, 0.0, 1.0))), mix(float(_GLF_FUZZED(577.489)), float(_GLF_IDENTITY(float(data[3]), float(mat2x3(_GLF_IDENTITY(float(data[3]), mix(float(float(data[3])), float(_GLF_FUZZED(1470.6266)), bool(false))), 1.0, 1.0, 0.0, 0.0, 1.0)))), bool(true)))), float(_GLF_FUZZED(float(149369u))), bool(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))))) / 10.0) : _GLF_FUZZED(length(vec3(139.448, -5.8, -6.6)))));
                } else {
                    if (int(gl_FragCoord[1]) < 150) {
                        discard;
                        if (_GLF_DEAD(_GLF_IDENTITY(false, (false) || _GLF_IDENTITY(false, !(_GLF_IDENTITY(!(false), bool(bool(!(false))))))))) {
                            {
                                GLF_dead10_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
                            }
                        }
                        if (_GLF_DEAD(false)) {
                            if (_GLF_DEAD(false)) {
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                    return;
                                }
                                _GLF_color = vec4(9.6, 8.9, -5.1, -157.520);
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = _GLF_color;
                                }
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                {
                                    GLF_dead10_GLF_color = vec4(0.0, 1.0, 0.0, 1.0);
                                }
                            }
                            if (grey <= _GLF_IDENTITY(-0.9, min(-0.9, -0.9)) && grey >= -1.1) {
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    _GLF_color = (grey + GLF_dead0_GLF_color);
                                }
                                if (_GLF_DEAD(_GLF_IDENTITY(false, _GLF_FALSE(false, (gl_FragCoord.y < 0.0)) || (false)))) {
                                    return;
                                }
                                if (_GLF_DEAD(false)) {
                                    int donor_replacementGLF_dead9j = _GLF_FUZZED(i);
                                    int donor_replacementGLF_dead9pivot = _GLF_FUZZED(13867);
                                    if (GLF_dead9obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9j, 10)] <= donor_replacementGLF_dead9pivot) {
                                        i++;
                                        GLF_dead9swap(i, donor_replacementGLF_dead9j);
                                    }
                                }
                                GLF_dead0_GLF_color = vec4(_GLF_IDENTITY(1.0, (1.0) - 0.0), 0.0, 0.0, 1.0);
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                    int donor_replacementGLF_dead8msb8 = _GLF_FUZZED(i);
                                    vec2 donor_replacementGLF_dead8pos = _GLF_FUZZED(injectionSwitch);
                                    vec3 donor_replacementGLF_dead8setting = _GLF_FUZZED((vec3(7.5, -5.5, -489.226) + (-103.419)));
                                    {
                                        ;
                                    }
                                }
                            } else {
                                GLF_dead0_GLF_color = vec4(0.0, 1.0, 0.0, 1.0);
                            }
                            if (_GLF_DEAD(false)) {
                                _GLF_color = asinh(_GLF_color);
                                if (_GLF_IDENTITY(_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < sin(0.0)))), _GLF_IDENTITY(bool(_GLF_IDENTITY(bvec2(_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < sin(0.0)))), false), bvec2(bvec3(bvec2(_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < sin(0.0)))), false), false)))), (bool(_GLF_IDENTITY(bvec2(_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < sin(0.0)))), false), bvec2(bvec3(bvec2(_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < sin(0.0)))), false), false))))) && _GLF_TRUE(true, (gl_FragCoord.y >= 0.0))))) {
                                    return;
                                }
                            }
                        }
                    } else {
                        if (int(gl_FragCoord[1]) < 180) {
                            grey = 0.5 + float(data[5]) / 10.0;
                            if (_GLF_DEAD(false)) {
                                _GLF_color = GLF_dead0_GLF_color;
                            }
                            if (_GLF_DEAD(false)) {
                                return;
                            }
                        } else {
                            if (int(gl_FragCoord[_GLF_IDENTITY(1, (1) - 0)]) < 210) {
                                grey = 0.5 + float(data[6]) / 10.0;
                                if (_GLF_DEAD(_GLF_IDENTITY(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)), _GLF_IDENTITY(bool(bvec4(_GLF_IDENTITY(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)), (_GLF_FALSE(false, (gl_FragCoord.y < 0.0))) && true), _GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)), true, true)), bool(bool(bool(bvec4(_GLF_IDENTITY(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)), (_GLF_FALSE(false, (gl_FragCoord.y < 0.0))) && true), _GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)), true, true)))))))) {
                                    _GLF_color = GLF_dead3_GLF_color;
                                }
                                if (_GLF_DEAD(false)) {
                                    int donor_replacementGLF_dead6c_re = _GLF_FUZZED((ivec3(72451, -90824, -70810) - ivec3(55557, -16380, 96842)).y);
                                    int donor_replacementGLF_dead6iteration = _GLF_FUZZED(-44153);
                                    int donor_replacementGLF_dead6x = _GLF_FUZZED(min(N, i));
                                    {
                                        if (_GLF_DEAD(false)) {
                                            vec3 donor_replacementGLF_dead9color = _GLF_FUZZED(vec3(65.58, 0.8, -1588.4454));
                                            vec2 donor_replacementGLF_dead9grid = _GLF_IDENTITY(_GLF_FUZZED(fwidthCoarse(injectionSwitch)), min(_GLF_FUZZED(fwidthCoarse(injectionSwitch)), _GLF_IDENTITY(_GLF_FUZZED(fwidthCoarse(injectionSwitch)), max(_GLF_FUZZED(fwidthCoarse(injectionSwitch)), _GLF_IDENTITY(_GLF_FUZZED(fwidthCoarse(injectionSwitch)), max(_GLF_FUZZED(fwidthCoarse(injectionSwitch)), _GLF_FUZZED(fwidthCoarse(injectionSwitch))))))));
                                            vec2 donor_replacementGLF_dead9uv = _GLF_FUZZED(injectionSwitch);
                                            if (donor_replacementGLF_dead9uv.x > (2.0 / _GLF_IDENTITY(4.0, (4.0) * 1.0))) {
                                                int GLF_dead9count = int(GLF_dead9injectionSwitch.x);
                                                do {
                                                    donor_replacementGLF_dead9color -= _GLF_IDENTITY(GLF_dead9palette(vec3(float(GLF_dead9obj.numbers[4]) * 0.1), trunc(vec3(0.1)), vec3(_GLF_IDENTITY(float(GLF_dead9obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_dead9injectionSwitch.y), 10)]), 1.0 * (float(GLF_dead9obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_dead9injectionSwitch.y), 10)]))) * _GLF_IDENTITY(0.1, (0.1) - 0.0)), vec3(GLF_dead9injectionSwitch.x, float(GLF_dead9obj.numbers[2]) * 0.1, float(_GLF_IDENTITY(GLF_dead9obj.numbers[8], (GLF_dead9obj.numbers[8]) << 0)) * 0.1)), (false ? _GLF_FUZZED(donor_replacementGLF_dead9color) : GLF_dead9palette(vec3(float(GLF_dead9obj.numbers[4]) * 0.1), trunc(vec3(0.1)), vec3(_GLF_IDENTITY(float(GLF_dead9obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_dead9injectionSwitch.y), 10)]), 1.0 * (float(GLF_dead9obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_dead9injectionSwitch.y), 10)]))) * _GLF_IDENTITY(0.1, (0.1) - 0.0)), vec3(GLF_dead9injectionSwitch.x, float(GLF_dead9obj.numbers[2]) * 0.1, float(_GLF_IDENTITY(GLF_dead9obj.numbers[8], (GLF_dead9obj.numbers[8]) << 0)) * 0.1))));
                                                    _GLF_IDENTITY(GLF_dead9count++, (GLF_dead9count++) - (0 ^ int(_GLF_ZERO(0.0, injectionSwitch.x))));
                                                } while (GLF_dead9count != GLF_dead9obj.numbers[1]);
                                                donor_replacementGLF_dead9grid += vec2(GLF_dead9count + int(GLF_dead9injectionSwitch.y), GLF_dead9count + int(GLF_dead9injectionSwitch.x));
                                            }
                                        }
                                        if (donor_replacementGLF_dead6x * donor_replacementGLF_dead6x + i * i > 262144) {
                                            if (_GLF_DEAD(false)) {
                                                if (_GLF_DEAD(_GLF_IDENTITY(false, !(_GLF_IDENTITY(!(false), bool(bvec4(!(false), false, true, true))))))) {
                                                    int donor_replacementGLF_dead7i = _GLF_FUZZED(donor_replacementGLF_dead6x);
                                                    if (donor_replacementGLF_dead7i >= int(GLF_dead7resolution.x)) {
                                                        ;
                                                    }
                                                }
                                                return;
                                            }
                                            ;
                                            if (_GLF_DEAD(false)) {
                                                _GLF_color = GLF_dead3_GLF_color;
                                            }
                                        }
                                        int GLF_dead6x_new = ((_GLF_IDENTITY(donor_replacementGLF_dead6x * donor_replacementGLF_dead6x - i * i, (donor_replacementGLF_dead6x * donor_replacementGLF_dead6x - i * i) >> 0)) / 256 + donor_replacementGLF_dead6c_re);
                                        i = (2 * donor_replacementGLF_dead6x * i / 256 + i);
                                        donor_replacementGLF_dead6x = GLF_dead6x_new;
                                        donor_replacementGLF_dead6iteration++;
                                    }
                                }
                            } else {
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                    _GLF_color = GLF_dead0_GLF_color;
                                }
                                if (int(gl_FragCoord[1]) < 240) {
                                    grey = 0.5 + _GLF_IDENTITY(float(data[7]) / _GLF_IDENTITY(10.0, clamp(_GLF_IDENTITY(10.0, min(10.0, _GLF_IDENTITY(10.0, max(10.0, 10.0)))), _GLF_IDENTITY(10.0, float(mat4x2(10.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.0, _GLF_IDENTITY(dot(vec4(1.0, 0.0, 1.0, 0.0), vec4(0.0, 1.0, 0.0, 1.0)), dot(vec4(1.0, 0.0, 1.0, 0.0), _GLF_IDENTITY(vec4(0.0, 1.0, 0.0, 1.0), vec4(mat3x2(vec4(0.0, 1.0, 0.0, 1.0), 0.0, 0.0)))))))), _GLF_IDENTITY(10.0, min(10.0, _GLF_IDENTITY(10.0, float(vec3(10.0, 1.0, 1.0))))))), (float(data[7]) / _GLF_IDENTITY(10.0, clamp(_GLF_IDENTITY(10.0, min(10.0, _GLF_IDENTITY(10.0, max(10.0, 10.0)))), _GLF_IDENTITY(10.0, float(mat4x2(10.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.0, _GLF_IDENTITY(dot(vec4(1.0, 0.0, 1.0, 0.0), vec4(0.0, 1.0, 0.0, 1.0)), dot(vec4(1.0, 0.0, 1.0, 0.0), _GLF_IDENTITY(vec4(0.0, 1.0, 0.0, 1.0), vec4(mat3x2(vec4(0.0, 1.0, 0.0, 1.0), 0.0, 0.0)))))))), _GLF_IDENTITY(10.0, min(10.0, _GLF_IDENTITY(10.0, float(vec3(10.0, 1.0, 1.0)))))))) + length(vec3(0.0, 0.0, 0.0)));
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = GLF_dead0_GLF_color;
                                        if (_GLF_DEAD(false)) {
                                            {
                                                i /= 2;
                                                if (_GLF_DEAD(false)) {
                                                    _GLF_color = GLF_dead0_GLF_color;
                                                }
                                            }
                                        }
                                    }
                                } else {
                                    if (int(gl_FragCoord[1]) < 270) {
                                        if (_GLF_DEAD(false)) {
                                            if (_GLF_DEAD(false)) {
                                                {
                                                    ;
                                                }
                                            }
                                            return;
                                        }
                                        if (_GLF_DEAD(false)) {
                                            if (_GLF_DEAD(false)) {
                                                vec3 donor_replacementGLF_dead9color = _GLF_FUZZED(vec3(968.754, -7.3, 1.7));
                                                do {
                                                    donor_replacementGLF_dead9color -= GLF_dead9palette(vec3(float(GLF_dead9obj.numbers[4]) * 0.1), trunc(vec3(0.1)), vec3(float(GLF_dead9obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_dead9injectionSwitch.y), 10)]) * 0.1), vec3(GLF_dead9injectionSwitch.x, float(_GLF_IDENTITY(GLF_dead9obj.numbers[2], (GLF_dead9obj.numbers[2]) | 0)) * 0.1, float(_GLF_IDENTITY(GLF_dead9obj.numbers[8], (_GLF_IDENTITY(GLF_dead9obj.numbers[8], (GLF_dead9obj.numbers[8]) / 1)) / 1)) * 0.1));
                                                    i++;
                                                } while (i != GLF_dead9obj.numbers[1]);
                                            }
                                            if (_GLF_DEAD(false)) {
                                                if (_GLF_DEAD(false)) {
                                                    return;
                                                }
                                                _GLF_color = clamp(GLF_dead3_GLF_color, _GLF_IDENTITY(_GLF_color, _GLF_IDENTITY(vec4(mat3x2(_GLF_color, 1.0, sqrt(0.0))), (vec4(mat3x2(_GLF_color, 1.0, sqrt(0.0)))) / vec4(1.0, 1.0, 1.0, 1.0))), GLF_dead3_GLF_color);
                                            }
                                            _GLF_color = step(vec4(0.8, 632.428, 4.4, -4994.4655), (GLF_dead3_GLF_color + 5659.7038));
                                            if (_GLF_DEAD(false)) {
                                                bool donor_replacementGLF_dead8c8 = _GLF_FUZZED(false);
                                                int donor_replacementGLF_dead8msb8 = _GLF_FUZZED(81505);
                                                vec2 donor_replacementGLF_dead8pos = _GLF_FUZZED(injectionSwitch);
                                                vec3 donor_replacementGLF_dead8setting = _GLF_FUZZED((-vec3(-8987.6609, -9.2, 3890.9218)));
                                                if (!donor_replacementGLF_dead8c8) {
                                                    ;
                                                }
                                            }
                                            if (_GLF_DEAD(false)) {
                                                _GLF_color = sinh(_GLF_color);
                                                if (_GLF_DEAD(false)) {
                                                    {
                                                        ;
                                                    }
                                                }
                                            }
                                        }
                                        if (_GLF_DEAD(false)) {
                                            for (int GLF_dead9i = int(GLF_dead9injectionSwitch.x); GLF_dead9i < 10; GLF_dead9i++) {
                                                GLF_dead9obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead9i, 10)] = (10 - GLF_dead9i) * int(GLF_dead9injectionSwitch.y);
                                            }
                                        }
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                            _GLF_color = dFdxFine(_GLF_color);
                                        }
                                        grey = 0.5 + float(data[8]) / 10.0;
                                    } else {
                                        if (_GLF_DEAD(_GLF_FALSE(false, (_GLF_IDENTITY(injectionSwitch.x, (false ? _GLF_FUZZED(GLF_dead8b_b) : _GLF_IDENTITY(injectionSwitch.x, (true ? injectionSwitch.x : _GLF_FUZZED(GLF_dead8b_b))))) > injectionSwitch.y)))) {
                                            if (_GLF_DEAD(_GLF_FALSE(false, (_GLF_IDENTITY(injectionSwitch.x > injectionSwitch.y, _GLF_FALSE(false, (gl_FragCoord.x < 0.0)) || (_GLF_IDENTITY(injectionSwitch.x > injectionSwitch.y, bool(bvec4(injectionSwitch.x > injectionSwitch.y, true, false, false))))))))) {
                                                {
                                                    ;
                                                }
                                            }
                                            return;
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                int donor_replacementGLF_dead9i = _GLF_FUZZED(i);
                                                {
                                                    donor_replacementGLF_dead9i++;
                                                    GLF_dead9swap(donor_replacementGLF_dead9i, i);
                                                }
                                            }
                                        }
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                            return;
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                bool donor_replacementGLF_dead8c4 = _GLF_FUZZED((grey <= distance(vec3(-7.6, -95.78, -102.679), vec3(injectionSwitch, -2141.7996))));
                                                if (!donor_replacementGLF_dead8c4) {
                                                    ;
                                                }
                                            }
                                        }
                                        discard;
                                    }
                                }
                            }
                        }
                        if (_GLF_DEAD(false)) {
                            int donor_replacementGLF_dead7v = _GLF_FUZZED(_GLF_IDENTITY(clamp(N, _GLF_IDENTITY(i, clamp(_GLF_IDENTITY(i, (_GLF_FALSE(false, (gl_FragCoord.y < 0.0)) ? _GLF_FUZZED(N) : i)), i, _GLF_IDENTITY(i, (false ? _GLF_FUZZED(i) : i)))), N), (true ? clamp(N, _GLF_IDENTITY(i, clamp(_GLF_IDENTITY(i, (_GLF_FALSE(false, (gl_FragCoord.y < 0.0)) ? _GLF_FUZZED(N) : i)), i, _GLF_IDENTITY(i, (false ? _GLF_FUZZED(i) : i)))), N) : _GLF_FUZZED(41971))));
                            {
                                if (_GLF_DEAD(_GLF_IDENTITY(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)), false || (_GLF_IDENTITY(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)), !(!(_GLF_IDENTITY(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)), !(!(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))))))))))) {
                                    _GLF_color = fwidthCoarse(vec4(0.5, 8.9, 1.9, 0.3));
                                    if (_GLF_DEAD(false)) {
                                        float donor_replacementGLF_dead10A = _GLF_FUZZED(grey);
                                        float donor_replacementGLF_dead10C = _GLF_FUZZED(faceforward(94.92, dFdxFine(grey), -7.9));
                                        float donor_replacementGLF_dead10x1 = _GLF_FUZZED((injectionSwitch[1]));
                                        {
                                            float GLF_dead10h0 = grey - grey;
                                            float GLF_dead10h1 = donor_replacementGLF_dead10x1 - grey;
                                            float GLF_dead10k0 = GLF_dead10fx(grey) - GLF_dead10fx(grey);
                                            float GLF_dead10k1 = GLF_dead10fx(donor_replacementGLF_dead10x1) - GLF_dead10fx(grey);
                                            _GLF_IDENTITY(grey = grey, 0.0 + (grey = grey));
                                            donor_replacementGLF_dead10A = (((GLF_dead10h1) * (GLF_dead10k0)) - ((GLF_dead10h0) * (GLF_dead10k1))) / ((((GLF_dead10h0) * (GLF_dead10h0)) * (GLF_dead10h1)) - (((GLF_dead10h1) * (GLF_dead10h1)) * (GLF_dead10h0)));
                                            _GLF_IDENTITY(grey = (((GLF_dead10k0) - (donor_replacementGLF_dead10A * (((GLF_dead10h0) * (GLF_dead10h0))))) / (GLF_dead10h0)), (false ? _GLF_FUZZED(GLF_dead8b_b) : (grey = (((GLF_dead10k0) - (donor_replacementGLF_dead10A * (((GLF_dead10h0) * (GLF_dead10h0))))) / (GLF_dead10h0)))));
                                            donor_replacementGLF_dead10C = GLF_dead10fx(grey);
                                            grey = grey - ((2.0 * donor_replacementGLF_dead10C) / (grey + sign(grey) * sqrt(max((grey * grey) - (4.0 * donor_replacementGLF_dead10A * donor_replacementGLF_dead10C), _GLF_IDENTITY(0.0, mix(float(0.0), float(_GLF_FUZZED(79.40)), bool(false)))))));
                                            grey = donor_replacementGLF_dead10x1;
                                            donor_replacementGLF_dead10x1 = grey;
                                            donor_replacementGLF_dead7v++;
                                        }
                                    }
                                }
                                donor_replacementGLF_dead7v = (4 * donor_replacementGLF_dead7v * (1000 - donor_replacementGLF_dead7v)) / 1000;
                            }
                        }
                    }
                }
                if (_GLF_DEAD(false)) {
                    _GLF_color = _GLF_color;
                }
            }
        }
    }
    _GLF_color = vec4(vec3(_GLF_IDENTITY(grey, (false ? _GLF_FUZZED(0.6) : _GLF_IDENTITY(grey, clamp(grey, grey, grey))))), 1.0);
    if (_GLF_DEAD(false)) {
        bool donor_replacementGLF_dead8c7 = _GLF_FUZZED(false);
        int donor_replacementGLF_dead8msb8 = _GLF_FUZZED(i);
        vec2 donor_replacementGLF_dead8pos = _GLF_FUZZED(vec2(8.7, -87.70));
        vec3 donor_replacementGLF_dead8setting = _GLF_FUZZED(vec3(-33.54, -856.173, -9.4));
        if (!donor_replacementGLF_dead8c7) {
            ;
        }
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_IDENTITY(0.0, mix(float(_GLF_FUZZED(-7.1)), float(0.0), bool(true))))))) {
        return;
    }
}
