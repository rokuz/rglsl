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
vec4 GLF_dead2gl_FragCoord = _GLF_FUZZED(vec4(323.610, 54.94, 342.582, -542.956));
const int GLF_dead2N = 10;
int GLF_dead2data[10] = int[10](_GLF_FUZZED(3004), _GLF_FUZZED(69576), _GLF_FUZZED(((-5812) - 48158)), _GLF_FUZZED(67619), _GLF_FUZZED((42899 - (-18492))), _GLF_FUZZED(52521), _GLF_FUZZED(-44436), _GLF_FUZZED((-(true ? (-79017) : (-25167)))), _GLF_FUZZED(1001), _GLF_FUZZED((+(-23603)))), GLF_dead2temp[10] = int[10](_GLF_FUZZED(70492), _GLF_FUZZED((+(-77459))), _GLF_FUZZED(-24750), _GLF_FUZZED(34200), _GLF_FUZZED((-(-84259))), _GLF_FUZZED((25207 | (-62126))), _GLF_FUZZED((~(-78885))), _GLF_FUZZED(-68762), _GLF_FUZZED(-62436), _GLF_FUZZED(((~25043) | 82393)));
int GLF_dead1MATRIX_N = 4;
layout(location = 0) out vec4 _GLF_color;

layout(set = 0, binding = 0) uniform buf0 {
    vec2 injectionSwitch;
};

layout(set = 0, binding = 1) uniform buf1 {
    vec2 resolution;
};

vec4 _GLF_outlined_0(vec4 _GLF_color) {
    return _GLF_color;
}

vec4 _GLF_outlined_3(vec4 _GLF_color) {
    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= sin(0.0))))) {
        return _GLF_color;
    } else {
    }
}

vec4 _GLF_outlined_4() {
    return vec4(-8.7, -84.24, 5567.4896, -958.832).babg;
}

vec2 _GLF_outlined_5(vec2 o) {
    return o + o;
}

vec4 _GLF_outlined_6(vec4 _GLF_color) {
    do {
        return _GLF_color;
    } while (_GLF_WRAPPED_LOOP(false));
}

vec2 pattern(in vec2 x) {
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
        _GLF_color = _GLF_color;
        {
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_outlined_3(_GLF_color);
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    _GLF_color = _GLF_color;
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < sqrt(0.0))))) {
                        do {
                            _GLF_color = _GLF_color;
                        } while (_GLF_WRAPPED_LOOP(false));
                    }
                }
                for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > (0 << _GLF_IDENTITY(int(7), int(7)))); _injected_loop_counter--) {
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        float donor_replacementGLF_dead2grey = _GLF_FUZZED(41.82);
                        {
                            if (int(GLF_dead2gl_FragCoord[1]) < 270) {
                                donor_replacementGLF_dead2grey = 0.5 + float(GLF_dead2data[8]) / 10.0;
                            } else {
                                discard;
                            }
                        }
                    }
                    if (_GLF_WRAPPED_IF_FALSE(false)) {
                    } else {
                        _GLF_color = clamp(vec4(-97.24, -5.5, -8814.8854, 6888.1660), -901.358, -782.087);
                    }
                }
                for (int _injected_loop_counter = (0 ^ 0); _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        if (_GLF_DEAD(_GLF_IDENTITY(false, (false) && true))) {
                            int donor_replacementGLF_dead3v = _GLF_FUZZED(clamp(-33337, GLF_dead1MATRIX_N, 35210));
                            {
                                donor_replacementGLF_dead3v = (4 * donor_replacementGLF_dead3v * (1000 - donor_replacementGLF_dead3v)) / 1000;
                            }
                        }
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
            }
            vec4 _GLF_outVarBackup_GLF_color;
            if (_GLF_IDENTITY(_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))), (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) || false)) {
                int donor_replacementGLF_dead1k = _GLF_IDENTITY(_GLF_FUZZED(-64833), ~(~(_GLF_FUZZED(-64833))));
                float donor_replacementGLF_dead1magnitudeX = _GLF_FUZZED(-961.922);
                mat4 donor_replacementGLF_dead1matrix_a = _GLF_FUZZED(mat4(280.141, 232.473, -182.712, -73.18, -4894.1092, -9.8, 7.7, 9.4, -1940.2420, -3.1, 1.4, 429.352, _GLF_IDENTITY(-78.31, (true ? (-78.31) : _GLF_FUZZED(donor_replacementGLF_dead1magnitudeX))), 373.069, -141.453, -3.1));
                int donor_replacementGLF_dead1x = _GLF_FUZZED(79961);
                for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
                    do {
                        donor_replacementGLF_dead1magnitudeX += pow(donor_replacementGLF_dead1matrix_a[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead1x, 4)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead1k, 4)], 2.0);
                    } while (_GLF_WRAPPED_LOOP(false));
                    _GLF_IDENTITY(_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead1x, 4)] = donor_replacementGLF_dead1matrix_a[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead1x, 4)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead1k, 4)], (_GLF_FALSE(false, (gl_FragCoord.x < 0.0)) ? _GLF_FUZZED(floor(-279.289)) : _GLF_IDENTITY(_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead1x, 4)] = donor_replacementGLF_dead1matrix_a[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead1x, 4)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead1k, 4)], (_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead1x, 4)] = donor_replacementGLF_dead1matrix_a[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead1x, 4)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead1k, 4)]) + abs(0.0))));
                }
            }
            _GLF_outVarBackup_GLF_color = _GLF_color;
            for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != ((1 << _GLF_IDENTITY(int(0), int(0))) >> _GLF_IDENTITY(int(0), _GLF_IDENTITY(int(0), (int(0)) >> 0)))); _injected_loop_counter++) {
                do {
                    if (_GLF_DEAD(_GLF_FALSE(false, _GLF_IDENTITY((gl_FragCoord.y < 0.0), !(_GLF_IDENTITY(!((gl_FragCoord.y < 0.0)), !(!(!((gl_FragCoord.y < 0.0)))))))))) {
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                if (_GLF_DEAD(false)) {
                                    do {
                                        _GLF_color = mod(vec4(vec3(2.2, 71.12, 5.5), -6417.7988), _GLF_color);
                                    } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
                                }
                            } else {
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = vec4(673.922, -3.1, -734.272, 66.34);
                                }
                            }
                            _GLF_outVarBackup_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead1MATRIX_N, 4)] = _GLF_outVarBackup_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead1MATRIX_N, 4)] * _GLF_outVarBackup_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(_GLF_IDENTITY(GLF_dead1MATRIX_N, (GLF_dead1MATRIX_N) << 0), 4)];
                            if (_GLF_DEAD(false)) {
                                float donor_replacementGLF_dead4limit = _GLF_FUZZED(-8.6);
                                float donor_replacementGLF_dead4s = _GLF_FUZZED(-94.14);
                                if (float(_injected_loop_counter) >= donor_replacementGLF_dead4limit) {
                                    ;
                                }
                            }
                        } else {
                        }
                    }
                } while (_GLF_WRAPPED_LOOP(false));
            }
            _GLF_color = vec4(9.1, 8.5, -9497.7989, -275.032);
            {
                vec4 _GLF_outVarBackup_GLF_color;
                if (_GLF_DEAD(false)) {
                    _GLF_color = ldexp(pow(vec4(6322.6007, -7587.7463, -2.3, 8475.7399), _GLF_outVarBackup_GLF_color), ivec4(-38455, -55532, 15385, -21491));
                }
                if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                } else {
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                }
                if (_GLF_DEAD(false)) {
                    _GLF_color = inversesqrt(vec4(-78.06, -16.59, 8570.4944, -755.543));
                }
                for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
                    _GLF_color = vec4(-9444.0428, -4019.7041, -11.10, 9163.8409);
                }
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                {
                    GLF_dead2temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead1MATRIX_N++, 10)] = GLF_dead2data[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead1MATRIX_N++, 10)];
                }
            }
            for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= log(1.0))))) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                    if (_GLF_DEAD(false)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
            }
        }
        if (_GLF_DEAD(false)) {
            int donor_replacementGLF_dead2i = _GLF_FUZZED(bitfieldExtract(-88647, _GLF_IDENTITY(25174, 1 * (25174)), mix(5809, -46494, true)));
            int donor_replacementGLF_dead2j = _GLF_FUZZED(40352);
            uint donor_replacementGLF_dead2uselessOutVariable = _GLF_FUZZED(uvec3(145154u, 2065u, 75053u).y);
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                float donor_replacementGLF_dead4s = _GLF_FUZZED(3.6);
                {
                    donor_replacementGLF_dead4s += 0.2;
                }
            }
            if (uint(donor_replacementGLF_dead2j) < uaddCarry(uint(donor_replacementGLF_dead2i), 1u, donor_replacementGLF_dead2uselessOutVariable)) {
                ;
                if (_GLF_DEAD(false)) {
                    float donor_replacementGLF_dead2grey = _GLF_FUZZED(_GLF_color.w);
                    {
                        if (int(GLF_dead2gl_FragCoord[1]) < 180) {
                            donor_replacementGLF_dead2grey = 0.5 + float(GLF_dead2data[5]) / 10.0;
                        } else {
                            if (int(GLF_dead2gl_FragCoord[1]) < 210) {
                                donor_replacementGLF_dead2grey = 0.5 + float(GLF_dead2data[6]) / 10.0;
                            } else {
                                if (int(GLF_dead2gl_FragCoord[1]) < 240) {
                                    donor_replacementGLF_dead2grey = 0.5 + float(GLF_dead2data[7]) / 10.0;
                                } else {
                                    if (int(GLF_dead2gl_FragCoord[1]) < 270) {
                                        donor_replacementGLF_dead2grey = 0.5 + float(GLF_dead2data[8]) / 10.0;
                                    } else {
                                        discard;
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
        vec4 _GLF_outVarBackup_GLF_color;
        for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
            for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != (((1 & 1) << _GLF_IDENTITY(int(3), int(3))) >> _GLF_IDENTITY(int(3), int(3)))); _injected_loop_counter++) {
                _GLF_outVarBackup_GLF_color = _GLF_color;
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                _GLF_color = vec4(-91.60, 2.3, 4204.7479, 0.6);
            }
        }
        do {
            if (_GLF_DEAD(false)) {
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= sqrt(0.0))))) {
                    if (_GLF_DEAD(false)) {
                        for (int _injected_loop_counter = (1 & 1); _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
                            _GLF_color = vec4(-37.99, -15.41, -894.514, 645.111);
                        }
                    }
                } else {
                }
                if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                } else {
                    _GLF_color = vec4(-4706.1241, 25.23, -302.661, -593.022);
                }
            }
        } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.y < _GLF_ZERO(0.0, injectionSwitch.x)))));
        _GLF_color = vec4(980.142, 901.795, 311.067, 86.69);
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > (0 >> _GLF_IDENTITY(int(4), int(4)))); _injected_loop_counter--) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < sqrt(0.0))))) {
                for (int _injected_loop_counter = _GLF_IDENTITY(0, (0) ^ 0); _GLF_WRAPPED_LOOP(_injected_loop_counter != ((int(_GLF_ONE(1.0, injectionSwitch.y)) << _GLF_IDENTITY(int(5), _GLF_IDENTITY(int(5), 1 * (int(5))))) >> _GLF_IDENTITY(int(5), int(5)))); _injected_loop_counter++) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
        }
    }
    vec2 n = floor(x);
    vec3 m = vec3(1.0);
    if (_GLF_WRAPPED_IF_TRUE(true)) {
        for (int j = -1; j <= int(injectionSwitch.y); j++) {
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                _GLF_color = _GLF_outlined_4();
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    if (_GLF_DEAD(_GLF_IDENTITY(false, !(!(false))))) {
                        do {
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                float donor_replacementGLF_dead4limit = _GLF_FUZZED(exp(clamp(-2.5, -15.20, -7545.8303)));
                                float donor_replacementGLF_dead4s = _GLF_FUZZED(uintBitsToFloat(107051u));
                                if (float(j) >= donor_replacementGLF_dead4limit) {
                                    ;
                                }
                            }
                            _GLF_color = (vec2(-9.7, 91.15) * mat4x2(-946.968, 5032.9060, -626.023, 8.2, 8.9, -519.150, -60.24, 2.7));
                        } while (_GLF_WRAPPED_LOOP(false));
                    }
                } else {
                }
            }
            do {
                for (int i = -1; i <= int(_GLF_IDENTITY(injectionSwitch, mat2(1.0) * (injectionSwitch)).y); i++) {
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        _GLF_color = fwidthCoarse(_GLF_color);
                    }
                    if (_GLF_DEAD(false)) {
                        if (j < i + 1) {
                            continue;
                        }
                    }
                    vec2 g = vec2(float(j), float(i));
                    if (_GLF_WRAPPED_IF_FALSE(false)) {
                    } else {
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            if (_GLF_DEAD(false)) {
                                _GLF_color = fwidthFine(ceil(_GLF_color));
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    _GLF_color = cos(_GLF_color);
                                }
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                {
                                    switch (j) {
                                        case 0:
                                            GLF_dead2data[_GLF_MAKE_IN_BOUNDS_INT(j, 10)] = 4;
                                            break;
                                        case 1:
                                            GLF_dead2data[_GLF_MAKE_IN_BOUNDS_INT(j, 10)] = 3;
                                            break;
                                        case 2:
                                            GLF_dead2data[_GLF_MAKE_IN_BOUNDS_INT(j, 10)] = 2;
                                            break;
                                        case 3:
                                            GLF_dead2data[_GLF_MAKE_IN_BOUNDS_INT(j, 10)] = 1;
                                            break;
                                        case 4:
                                            GLF_dead2data[_GLF_MAKE_IN_BOUNDS_INT(j, 10)] = 0;
                                            break;
                                        case 5:
                                            GLF_dead2data[_GLF_MAKE_IN_BOUNDS_INT(j, 10)] = -1;
                                            break;
                                        case 6:
                                            GLF_dead2data[_GLF_MAKE_IN_BOUNDS_INT(j, 10)] = -2;
                                            break;
                                        case 7:
                                            GLF_dead2data[_GLF_MAKE_IN_BOUNDS_INT(j, 10)] = -3;
                                            break;
                                        case 8:
                                            GLF_dead2data[_GLF_MAKE_IN_BOUNDS_INT(j, 10)] = -4;
                                            break;
                                        case 9:
                                            GLF_dead2data[_GLF_MAKE_IN_BOUNDS_INT(j, 10)] = -5;
                                            break;
                                    }
                                    j++;
                                }
                            }
                        } else {
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        _GLF_color = (mat4(0.3, 8044.5858, 0.4, -515.401, 10.24, 1.4, -0.8, 8.0, 21.02, 561.576, -9813.3027, -9.2, 47.54, 85.77, -1.3, 3.4) * mat3x4(-153.146, 280.701, 274.908, -4.2, 7.9, -9.9, 2.7, 655.223, 8.1, -8.3, -2.4, -9.2))[1];
                    }
                    if (_GLF_DEAD(_GLF_IDENTITY(false, bool(bvec3(_GLF_IDENTITY(false, true && (false)), false, _GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y))))))) {
                        _GLF_color = _GLF_color;
                    }
                    vec2 o = _GLF_IDENTITY(mix(n, g, 0.2), (_GLF_IDENTITY(mix(n, g, 0.2), clamp(mix(n, g, 0.2), mix(n, g, 0.2), mix(n, g, 0.2)))) / vec2(1.0, 1.0));
                    if (injectionSwitch.x < (m.x)) {
                        int k = 1;
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            if (_GLF_DEAD(false)) {
                                for (int GLF_dead4i = 0; GLF_dead4i < 3; GLF_dead4i++) {
                                    if (_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead4i, 4)] >= 1.0) {
                                        _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead4i, 4)] = _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead4i, 4)] * _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead4i, 4)];
                                    }
                                }
                            }
                            if (_GLF_DEAD(false)) {
                                do {
                                    _GLF_color = fma(_GLF_color, vec4(_GLF_IDENTITY(-1.1, clamp(-1.1, -1.1, -1.1)), 7.6, -676.996, -90.86), vec4(-9538.5832, -162.139, -67.05, -9.2));
                                } while (_GLF_WRAPPED_LOOP(false));
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    _GLF_color = _GLF_color;
                                }
                            }
                        } else {
                        }
                        do {
                            while (k >= 0) {
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = vec4(5168.5663, 27.87, -38.01, -9351.8601);
                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, _GLF_IDENTITY((gl_FragCoord.y >= 0.0), false || ((gl_FragCoord.y >= 0.0)))))) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                        for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
                                            if (_GLF_DEAD(false)) {
                                                do {
                                                    _GLF_color = (ivec2(36711, 59123), floor(_GLF_color));
                                                } while (_GLF_WRAPPED_LOOP(false));
                                            }
                                        }
                                    }
                                }
                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                    do {
                                        o = _GLF_outlined_5(o);
                                    } while (_GLF_WRAPPED_LOOP(false));
                                } else {
                                }
                                {
                                    do {
                                        if (_GLF_DEAD(false)) {
                                            _GLF_color = vec4(0.7, 3282.1869, -242.966, 0.9);
                                        }
                                    } while (_GLF_WRAPPED_LOOP(false));
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_outlined_0(_GLF_color);
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = acos(_GLF_color);
                                    }
                                    if (_GLF_DEAD(false)) {
                                        float donor_replacementGLF_dead1alpha3 = _GLF_FUZZED(-6.7);
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                            _GLF_color = min(_GLF_color, vec4(-0.1, 2.6, 9532.4825, -4.0));
                                        }
                                        if (_GLF_DEAD(false)) {
                                            for (int _injected_loop_counter = (1 ^ (1 | (1 & 1))); _GLF_WRAPPED_LOOP(_injected_loop_counter < _GLF_IDENTITY(1, (1) | 0)); _injected_loop_counter++) {
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                    for (int GLF_dead4i = 0; GLF_dead4i < 3; GLF_dead4i++) {
                                                        if (_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead4i, 4)] >= 1.0) {
                                                            _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead4i, 4)] = _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead4i, 4)] * _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead4i, 4)];
                                                        }
                                                    }
                                                }
                                                _GLF_color = (injectionSwitch * mat4x2(-2644.2080, 38.48, -0.1, -219.164, -311.925, 5.3, -813.322, 3.8));
                                            }
                                        }
                                        {
                                            donor_replacementGLF_dead1alpha3 += _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(k, 4)] * _GLF_outVarBackup_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(k, 4)];
                                        }
                                    }
                                    if (_GLF_IDENTITY(_GLF_DEAD(_GLF_IDENTITY(false, true && (false))), _GLF_IDENTITY(bool(bvec3(_GLF_DEAD(_GLF_IDENTITY(false, true && (false))), true, _GLF_FALSE(false, (gl_FragCoord.x < 0.0)))), (bool(bvec3(_GLF_DEAD(_GLF_IDENTITY(false, true && (false))), true, _GLF_FALSE(false, (gl_FragCoord.x < 0.0))))) || false))) {
                                        _GLF_color = (mat4x2(-5564.2721, -_GLF_IDENTITY(87.03, sin(0.0) + (87.03)), -73.69, -671.966, -0.4, 272.776, -3.8, -295.559), _GLF_outVarBackup_GLF_color);
                                    }
                                    _GLF_color = vec4(-4.1, 90.04, 191.078, -9.9);
                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)), bool(_GLF_IDENTITY(bool(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0))), true && (bool(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0))))))))) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                        if (_GLF_DEAD(false)) {
                                            _GLF_color = vec4(-6.3, 44.54, 7.6, 31.19);
                                        }
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < length(abs(vec2(0.0, 0.0))))))) {
                                            for (int _injected_loop_counter = ((((int(_GLF_ONE(1.0, injectionSwitch.y)) << _GLF_IDENTITY(int(7), _GLF_IDENTITY(int(7), min(int(7), int(7))))) >> _GLF_IDENTITY(int(7), int(7))) << _GLF_IDENTITY(int(0), _GLF_IDENTITY(int(0), (int(0)) | 0))) >> _GLF_IDENTITY(int(0), _GLF_IDENTITY(int(0), 0 | (int(0))))); _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
                                                if (_GLF_DEAD(false)) {
                                                    _GLF_color = dFdyCoarse((mat4(2691.5370, 34.24, -45.16, -41.30, -645.837, 411.748, 8.7, 830.513, 67.83, 738.104, 9824.3356, -17.24, 76.41, -681.911, 9594.8265, 5.9) * _GLF_outVarBackup_GLF_color));
                                                }
                                            }
                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                    _GLF_color = vec4(-4.3, 26.14, 833.860, o[0]);
                                                }
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                    int donor_replacementGLF_dead3v = _GLF_FUZZED(int(415.677));
                                                    for (j = 0; j < GLF_dead1MATRIX_N; j++) {
                                                        donor_replacementGLF_dead3v = (4 * donor_replacementGLF_dead3v * (1000 - donor_replacementGLF_dead3v)) / 1000;
                                                    }
                                                }
                                                _GLF_color = _GLF_color;
                                            } else {
                                            }
                                        }
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                            if (i * i + k * k > 262144) {
                                                break;
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                }
                                            }
                                        }
                                    }
                                }
                                k--;
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    float donor_replacementGLF_dead2grey = _GLF_FUZZED(exp2(3438.9171));
                                    {
                                        if (int(GLF_dead2gl_FragCoord[1]) < 60) {
                                            donor_replacementGLF_dead2grey = 0.5 + float(GLF_dead2data[1]) / 10.0;
                                        } else {
                                            if (int(GLF_dead2gl_FragCoord[1]) < 90) {
                                                donor_replacementGLF_dead2grey = 0.5 + float(GLF_dead2data[2]) / 10.0;
                                            } else {
                                                if (int(GLF_dead2gl_FragCoord[1]) < 120) {
                                                    donor_replacementGLF_dead2grey = 0.5 + float(GLF_dead2data[3]) / 10.0;
                                                } else {
                                                    if (int(GLF_dead2gl_FragCoord[1]) < 150) {
                                                        discard;
                                                    } else {
                                                        if (int(GLF_dead2gl_FragCoord[1]) < 180) {
                                                            donor_replacementGLF_dead2grey = 0.5 + float(GLF_dead2data[5]) / 10.0;
                                                        } else {
                                                            if (int(GLF_dead2gl_FragCoord[1]) < 210) {
                                                                donor_replacementGLF_dead2grey = 0.5 + float(GLF_dead2data[6]) / 10.0;
                                                            } else {
                                                                if (int(GLF_dead2gl_FragCoord[1]) < 240) {
                                                                    donor_replacementGLF_dead2grey = 0.5 + float(GLF_dead2data[7]) / 10.0;
                                                                } else {
                                                                    if (int(GLF_dead2gl_FragCoord[1]) < 270) {
                                                                        donor_replacementGLF_dead2grey = 0.5 + float(GLF_dead2data[8]) / 10.0;
                                                                    } else {
                                                                        discard;
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
                            }
                        } while (_GLF_WRAPPED_LOOP(false));
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            if (_GLF_DEAD(false)) {
                                int donor_replacementGLF_dead3v = _GLF_FUZZED(max(int(2.7), -45829));
                                {
                                    donor_replacementGLF_dead3v = (4 * donor_replacementGLF_dead3v * (1000 - donor_replacementGLF_dead3v)) / 1000;
                                }
                            }
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = vec4(-35.02, 6.2, -9.3, -2.1);
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                        do {
                            m = vec3(injectionSwitch.x, cos(o));
                        } while (_GLF_WRAPPED_LOOP(_GLF_IDENTITY(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)), (_GLF_FALSE(false, (gl_FragCoord.y < 0.0))) || false)));
                    }
                    {
                        if (_GLF_WRAPPED_IF_FALSE(false)) {
                        } else {
                            if (_GLF_DEAD(false)) {
                                _GLF_color = _GLF_color;
                            }
                        }
                        vec4 _GLF_outVarBackup_GLF_color;
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            } else {
                                _GLF_color = acos(clamp(_GLF_color, 312.430, 7956.4354));
                            }
                        }
                        _GLF_outVarBackup_GLF_color = _GLF_IDENTITY(_GLF_color, mix(vec4((_GLF_color)[0], _GLF_FUZZED(-8.3), (_GLF_color)[2], (_GLF_color)[3]), vec4(_GLF_FUZZED(-9991.1871), (_GLF_color)[1], _GLF_FUZZED(2229.5916), _GLF_FUZZED(-9.9)), bvec4(false, true, false, false)));
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            if (_GLF_WRAPPED_IF_FALSE(false)) {
                            } else {
                                _GLF_color = _GLF_IDENTITY(vec4(-1.2, -821.430, -6149.9515, -1546.9296), (vec4(-1.2, -821.430, -6149.9515, -1546.9296)) * mat4(1.0));
                            }
                            for (int _injected_loop_counter = int(_GLF_ZERO(0.0, injectionSwitch.x)); _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
                                if (_GLF_DEAD(_GLF_IDENTITY(false, !(!(false))))) {
                                    if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    } else {
                                        if (_GLF_DEAD(false)) {
                                            _GLF_color = vec4(2.6, -73.83, -8.3, 62.11);
                                        }
                                    }
                                    _GLF_color = vec4(-6305.3209, -722.429, -3160.2049, -4.0);
                                }
                            }
                            if (_GLF_DEAD(false)) {
                                _GLF_color = _GLF_color;
                            }
                            if (_GLF_WRAPPED_IF_FALSE(false)) {
                            } else {
                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (_GLF_IDENTITY(injectionSwitch, mix(vec2(_GLF_FUZZED(float(-17422)), (injectionSwitch)[1]), vec2((injectionSwitch)[0], _GLF_FUZZED(7466.6939)), bvec2(true, _GLF_FALSE(false, (gl_FragCoord.x < 0.0))))).x < injectionSwitch.y)))) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                        }
                        _GLF_color = abs(vec4(-7829.6482, 875.368, -894.486, -4451.7094));
                        do {
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                if (_GLF_DEAD(_GLF_IDENTITY(false, (false) && _GLF_TRUE(true, (gl_FragCoord.x >= 0.0))))) {
                                    float donor_replacementGLF_dead1alpha1 = _GLF_FUZZED(-3697.4693);
                                    int donor_replacementGLF_dead1u = _GLF_FUZZED(i);
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                        if (_GLF_DEAD(false)) {
                                            {
                                                if (_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(i, 4)] >= 1.0) {
                                                    _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(i, 4)] = _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(i, 4)] * _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(i, 4)];
                                                }
                                            }
                                        }
                                        _GLF_color = (_GLF_outVarBackup_GLF_color / (-361.071));
                                    }
                                    {
                                        donor_replacementGLF_dead1alpha1 += pow(_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead1u, 4)], 2.0);
                                    }
                                }
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                do {
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < log(1.0))))) {
                                        if (_GLF_DEAD(false)) {
                                            _GLF_color = fma(_GLF_color, abs(tanh(_GLF_outVarBackup_GLF_color)), _GLF_color);
                                        }
                                        if (_GLF_WRAPPED_IF_FALSE(false)) {
                                        } else {
                                            _GLF_color = log(atanh(_GLF_outVarBackup_GLF_color));
                                        }
                                    }
                                } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
                            }
                        } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))));
                    }
                }
            } while (_GLF_WRAPPED_LOOP(false));
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                _GLF_color = injectionSwitch.grgg;
            }
        }
    } else {
    }
    if (_GLF_DEAD(false)) {
        if (_GLF_WRAPPED_IF_FALSE(false)) {
        } else {
            _GLF_color = vec3(-2.3, 2.4, 1.0).ggbr;
        }
    }
    {
        vec4 _GLF_outVarBackup_GLF_color;
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            _GLF_color = _GLF_outlined_6(_GLF_color);
        }
        _GLF_outVarBackup_GLF_color = _GLF_color;
        if (_GLF_DEAD(false)) {
            {
                GLF_dead1MATRIX_N = (4 * GLF_dead1MATRIX_N * (1000 - GLF_dead1MATRIX_N)) / 1000;
            }
        }
        _GLF_color = ((-7.7) / vec4(-4.1, -472.329, 6.2, -466.588));
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
        if (_GLF_DEAD(false)) {
            _GLF_color = atanh(mix(_GLF_color, vec4(-830.125, 3794.7623, 65.19, 803.383), _GLF_outVarBackup_GLF_color));
        }
    }
    if (_GLF_DEAD(false)) {
        _GLF_color = (step(34.26, vec4(-863.682, -28.96, 1.1, _GLF_IDENTITY(22.30, mix(float(22.30), float(_GLF_FUZZED((float(-48233) - (-184.000)))), bool(false))))) / 0.2);
    }
    if (_GLF_WRAPPED_IF_FALSE(false)) {
        if (_GLF_DEAD(_GLF_IDENTITY(false, _GLF_IDENTITY(bool(bvec2(false, false)), false || (bool(bvec2(false, false))))))) {
            int donor_replacementGLF_dead1i = _GLF_FUZZED(16573);
            if (_GLF_DEAD(false)) {
                _GLF_color = vec4(9.6, 688.748, -80.21, -8085.5545);
            }
            mat4 donor_replacementGLF_dead1matrix_a = _GLF_FUZZED(mat4(5.7, -5.8, 5.0, -930.427, 946.403, -32.16, 3873.3205, 8.5, 3.3, -0.3, 54.24, 3316.2981, -9.0, 491.443, -2329.9762, -615.761));
            {
                for (int GLF_dead1j = (GLF_dead1MATRIX_N - 1); GLF_dead1j >= (donor_replacementGLF_dead1i + 1); GLF_dead1j--) {
                    for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < int(_GLF_ONE(1.0, injectionSwitch.y))); _injected_loop_counter++) {
                        _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead1i, 4)] -= (donor_replacementGLF_dead1matrix_a[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead1i, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead1j, 4)] * _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(_GLF_IDENTITY(GLF_dead1j, (_GLF_IDENTITY(GLF_dead1j, (GLF_dead1j) - 0)) << 0), 4)]);
                    }
                    do {
                        vec4 _GLF_outVarBackup_GLF_color;
                        if (_GLF_DEAD(false)) {
                            _GLF_color = _GLF_color;
                        }
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = clamp(fwidthCoarse(vec4(-76.37, 7.8, -120.975, -12.12)), vec4(5.7, 1809.6343, 621.646, -68.32), vec4(_GLF_IDENTITY(534.953, (534.953) / 1.0), -2.4, _GLF_IDENTITY(695.141, (true ? 695.141 : _GLF_FUZZED(11.60))), 0.9));
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                        if (_GLF_DEAD(false)) {
                            _GLF_color = roundEven(_GLF_color);
                        }
                    } while (_GLF_WRAPPED_LOOP(_GLF_IDENTITY(false, bool(bvec4(false, _GLF_TRUE(true, (gl_FragCoord.x >= 0.0)), true, true)))));
                }
                _GLF_IDENTITY(_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead1i, 4)] /= donor_replacementGLF_dead1matrix_a[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead1i, 4)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead1i, 4)], 0.0 + (_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead1i, 4)] /= donor_replacementGLF_dead1matrix_a[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead1i, 4)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead1i, 4)]));
            }
        }
    } else {
        if (_GLF_DEAD(_GLF_FALSE(false, (_GLF_IDENTITY(gl_FragCoord, (gl_FragCoord) * mat4(1.0)).x < 0.0)))) {
            do {
                _GLF_color = faceforward(_GLF_color, _GLF_color, fract(vec4(-24.16, -6.5, -_GLF_IDENTITY(1450.9035, float(mat4x2(_GLF_IDENTITY(1450.9035, float(mat2(1450.9035, round(length(normalize(vec3(1.0, 1.0, 1.0)))), 0.0, 0.0))), 1.0, 1.0, length(vec4(0.0, 0.0, 0.0, 0.0)), 0.0, 0.0, log(1.0), 1.0))), 6.8)));
            } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
        }
        if (_GLF_DEAD(false)) {
            vec4 donor_replacementGLF_dead4c = _GLF_FUZZED(_GLF_color);
            if (donor_replacementGLF_dead4c[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead1MATRIX_N, 4)] >= 1.0) {
                donor_replacementGLF_dead4c[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead1MATRIX_N, 4)] = donor_replacementGLF_dead4c[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead1MATRIX_N, 4)] * donor_replacementGLF_dead4c[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead1MATRIX_N, 4)];
            }
        }
        return vec2(m.x, _GLF_IDENTITY(m.y - _GLF_IDENTITY(m.z, (m.z) - 0.0), mix(float(_GLF_FUZZED(-7496.9792)), float(m.y - _GLF_IDENTITY(m.z, (m.z) - 0.0)), bool(true))));
    }
}

vec4 _GLF_outlined_1(vec4 _GLF_color) {
    do {
        return _GLF_color;
    } while (_GLF_WRAPPED_LOOP(false));
}

vec4 _GLF_outlined_2(vec4 _GLF_color) {
    do {
        return _GLF_color;
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            for (GLF_dead1MATRIX_N = 0; GLF_dead1MATRIX_N < GLF_dead1MATRIX_N; GLF_dead1MATRIX_N++) {
                GLF_dead1MATRIX_N = (4 * GLF_dead1MATRIX_N * (1000 - GLF_dead1MATRIX_N)) / 1000;
            }
        }
    } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
}

vec4 _GLF_outlined_7(vec4 _GLF_outVarBackup_GLF_color) {
    return _GLF_outVarBackup_GLF_color;
}

vec4 _GLF_outlined_8(vec4 _GLF_color) {
    return _GLF_color;
}

vec4 _GLF_outlined_9() {
    return mat3x4(-6704.4823, -5928.2147, _GLF_IDENTITY(-_GLF_IDENTITY(9.1, max(9.1, 9.1)), max(-_GLF_IDENTITY(9.1, max(9.1, 9.1)), -_GLF_IDENTITY(9.1, max(9.1, 9.1)))), 3.8, -7.6, 74.99, -1.3, -6.6, -5.3, 747.009, 45.80, -10.97)[1];
}

vec4 _GLF_outlined_10(vec4 _GLF_outVarBackup_GLF_color) {
    for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
        return _GLF_outVarBackup_GLF_color;
    }
}

vec4 _GLF_outlined_11(vec4 _GLF_color) {
    return _GLF_color;
}

vec4 _GLF_outlined_12() {
    return floor(vec4(8.1, 62.82, -29.61, 34.59));
}

vec4 _GLF_outlined_13() {
    do {
        return (vec4(-6.6, 1048.0949, 4.0, 0.3) - vec4(-1.3, -941.292, -9472.5643, 835.722));
    } while (_GLF_WRAPPED_LOOP(false));
}

vec4 _GLF_outlined_14(vec4 _GLF_color) {
    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_ZERO(0.0, injectionSwitch.x))))) {
            float donor_replacementGLF_dead4limit = _GLF_FUZZED(dFdy(fwidthFine(5.8)));
            float donor_replacementGLF_dead4s = _GLF_FUZZED(acos(19.17));
            if (float(GLF_dead1MATRIX_N) >= donor_replacementGLF_dead4limit) {
                ;
            }
        }
        return _GLF_color;
    } else {
    }
}

vec4 _GLF_outlined_15() {
    return (mat3x4(0.3, 2478.0136, 6447.7393, -9.5, -3.2, 982.452, 35.45, -4.4, 219.175, -126.230, -55.41, -730.958) * vec3(2.7, 3438.2864, -2072.9957));
}

vec4 _GLF_outlined_16() {
    return vec4(-40.33, -348.453, 1.1, 2771.5660);
}

vec4 _GLF_outlined_17(vec4 _GLF_color) {
    return _GLF_color;
}

vec4 _GLF_outlined_18(vec4 _GLF_color) {
    return mod(_GLF_color, 657.645);
}

vec4 _GLF_outlined_19(vec4 _GLF_color) {
    return _GLF_color;
}

vec4 _GLF_outlined_20() {
    return vec4(4063.3857, -5.9, -_GLF_IDENTITY(5.3, clamp(5.3, 5.3, 5.3)), 8.2);
}

vec4 _GLF_outlined_21(vec4 _GLF_color) {
    return _GLF_color;
}

vec4 _GLF_outlined_22(vec4 _GLF_color) {
    return _GLF_color;
}

vec4 _GLF_outlined_23() {
    return (vec4(9.0, 7375.3962, 9029.7137, 9.0) + vec4(258.351, -9.6, 380.058, -65.89));
}

vec4 _GLF_outlined_24() {
    if (_GLF_DEAD(false)) {
        for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != (0 | int(_GLF_ZERO(0.0, injectionSwitch.x)))); _injected_loop_counter--) {
            _GLF_color = _GLF_color;
        }
    }
    return vec4(6.5, 1248.0871, -514.215, 54.55);
}

void main() {
    vec2 uv = gl_FragCoord.xy / _GLF_IDENTITY(resolution.y, (true ? resolution.y : _GLF_FUZZED(-1.6)));
    float A[50];
    for (int i = 0; i < 200; i++) {
        if (i >= int(resolution.x)) {
            break;
            if (_GLF_WRAPPED_IF_FALSE(false)) {
            } else {
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    _GLF_color = _GLF_color;
                }
            }
            if (_GLF_DEAD(false)) {
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = tanh(fwidthCoarse(uv)).xyyy;
                } else {
                }
            }
            for (int _injected_loop_counter = int(_GLF_ONE(1.0, injectionSwitch.y)); _GLF_WRAPPED_LOOP(_injected_loop_counter != int(_GLF_ZERO(0.0, injectionSwitch.x))); _injected_loop_counter--) {
                vec4 _GLF_outVarBackup_GLF_color;
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        if (_GLF_DEAD(false)) {
                            _GLF_color = _GLF_color;
                        }
                    } else {
                    }
                } else {
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    _GLF_color = mod(_GLF_color, _GLF_color);
                }
                _GLF_color = step(vec4(2.9, 7.3, _GLF_IDENTITY(2.7, (true ? 2.7 : _GLF_FUZZED(-5967.3405))), -9.2), vec4(-53.64, -9204.8843, -539.520, -86.12));
                if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                } else {
                    if (_GLF_DEAD(false)) {
                        _GLF_color = cosh(exp(_GLF_color));
                    }
                }
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (_GLF_IDENTITY(injectionSwitch, vec2(injectionSwitch[0], injectionSwitch[1])).x < injectionSwitch.y)))) {
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        } else {
                        }
                    }
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                if (_GLF_DEAD(false)) {
                    _GLF_color = log(_GLF_color);
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    _GLF_color = _GLF_color;
                }
            } else {
            }
            if (_GLF_WRAPPED_IF_FALSE(false)) {
            } else {
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    int donor_replacementGLF_dead3iters = _GLF_FUZZED(GLF_dead1MATRIX_N);
                    for (i = 0; i < donor_replacementGLF_dead3iters; i++) {
                        GLF_dead1MATRIX_N = (4 * GLF_dead1MATRIX_N * (1000 - GLF_dead1MATRIX_N)) / 1000;
                    }
                }
                if (_GLF_DEAD(false)) {
                    _GLF_color = _GLF_color;
                }
            }
        }
        if ((4 * (i / 4)) == i) {
            for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    _GLF_color = _GLF_color;
                }
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                {
                    GLF_dead1MATRIX_N = (4 * GLF_dead1MATRIX_N * (1000 - GLF_dead1MATRIX_N)) / 1000;
                }
            }
            if (_GLF_DEAD(false)) {
                float donor_replacementGLF_dead1beta = _GLF_FUZZED(radians(-6.9));
                for (int GLF_dead1b = GLF_dead1MATRIX_N - 1; GLF_dead1b >= i; GLF_dead1b--) {
                    if (_GLF_DEAD(false)) {
                        _GLF_color = dFdxFine(sign(_GLF_color));
                    }
                    _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead1b, 4)] = _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead1b, 4)] - (donor_replacementGLF_dead1beta * _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead1b, 4)]);
                    if (_GLF_DEAD(false)) {
                        _GLF_color = vec4(-1279.5043, 530.321, -804.825, -836.516);
                    }
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    _GLF_color = fwidthFine(_GLF_color);
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        float donor_replacementGLF_dead4ref = _GLF_FUZZED(abs(donor_replacementGLF_dead1beta));
                        {
                            if (mod(float(i), donor_replacementGLF_dead4ref) <= 0.01) {
                                donor_replacementGLF_dead1beta += 0.2;
                            }
                            if (float(i) >= donor_replacementGLF_dead1beta) {
                                ;
                            }
                        }
                    }
                }
                if (_GLF_WRAPPED_IF_FALSE(false)) {
                } else {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = vec4(4327.9964, -7440.1713, 2.3, -5.0);
                        } else {
                        }
                    } else {
                    }
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                            if (_GLF_DEAD(false)) {
                                _GLF_color = _GLF_outlined_7(_GLF_outVarBackup_GLF_color);
                            }
                            if (_GLF_DEAD(false)) {
                                float donor_replacementGLF_dead2grey = _GLF_FUZZED(pow((sinh(65.07) * donor_replacementGLF_dead1beta), 6.5));
                                {
                                    if (int(GLF_dead2gl_FragCoord[1]) < 180) {
                                        donor_replacementGLF_dead2grey = 0.5 + float(GLF_dead2data[5]) / 10.0;
                                    } else {
                                        if (int(GLF_dead2gl_FragCoord[1]) < 210) {
                                            donor_replacementGLF_dead2grey = 0.5 + float(GLF_dead2data[6]) / 10.0;
                                        } else {
                                            if (int(GLF_dead2gl_FragCoord[1]) < 240) {
                                                donor_replacementGLF_dead2grey = 0.5 + float(GLF_dead2data[7]) / 10.0;
                                            } else {
                                                if (int(GLF_dead2gl_FragCoord[1]) < 270) {
                                                    donor_replacementGLF_dead2grey = 0.5 + float(GLF_dead2data[8]) / 10.0;
                                                } else {
                                                    discard;
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    } else {
                    }
                }
                if (_GLF_DEAD(false)) {
                    {
                        ;
                        if (_GLF_DEAD(false)) {
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                _GLF_color = vec4(8740.3413, -14.99, -0.4, 7933.1775);
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    _GLF_color = vec4(6.6, 544.207, -97.14, 1.5);
                                }
                            } else {
                            }
                        }
                    }
                }
            }
            if (_GLF_WRAPPED_IF_FALSE(false)) {
            } else {
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    int donor_replacementGLF_dead2j = _GLF_FUZZED(i);
                    while (i <= GLF_dead1MATRIX_N && donor_replacementGLF_dead2j <= GLF_dead1MATRIX_N) {
                        if (GLF_dead2data[_GLF_MAKE_IN_BOUNDS_INT(i, 10)] < GLF_dead2data[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead2j, 10)]) {
                            GLF_dead2temp[_GLF_MAKE_IN_BOUNDS_INT(i++, 10)] = GLF_dead2data[_GLF_MAKE_IN_BOUNDS_INT(i++, 10)];
                        } else {
                            GLF_dead2temp[_GLF_MAKE_IN_BOUNDS_INT(i++, 10)] = GLF_dead2data[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead2j++, 10)];
                        }
                    }
                }
                A[i / 4] = float(i);
            }
        }
        if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
        } else {
            if (_GLF_DEAD(false)) {
                int donor_replacementGLF_dead3i = _GLF_FUZZED(39393);
                int donor_replacementGLF_dead3v = _GLF_FUZZED((~min((81124 << 86491), i)));
                for (donor_replacementGLF_dead3i = 0; donor_replacementGLF_dead3i < i; donor_replacementGLF_dead3i++) {
                    donor_replacementGLF_dead3v = (4 * donor_replacementGLF_dead3v * (1000 - donor_replacementGLF_dead3v)) / 1000;
                }
            }
            if (_GLF_DEAD(false)) {
                _GLF_color = _GLF_color;
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                do {
                    _GLF_color = _GLF_outlined_8(_GLF_color);
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        for (int _injected_loop_counter = (0 | 0); _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
                            _GLF_color = _GLF_color;
                        }
                    }
                } while (_GLF_WRAPPED_LOOP(false));
            }
        }
        if (_GLF_DEAD(false)) {
            _GLF_color = _GLF_color;
        }
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                _GLF_color = mat2x4(8.0, 6.9, 6.7, -7.1, -87.92, 214.849, -3647.7037, -87.19)[1];
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    if (_GLF_WRAPPED_IF_FALSE(false)) {
                    } else {
                        _GLF_color = dFdy(vec4(571.109, 5.1, 63.52, -0.4));
                    }
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(true, false || (true)))) {
                        do {
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        } while (_GLF_WRAPPED_LOOP(false));
                    } else {
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        _GLF_color = vec4(cosh(-7.4), 7056.1668, 909.900, -28.50);
                    }
                }
            }
        } else {
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            _GLF_color = _GLF_color;
        }
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
        for (int _injected_loop_counter = (0 & (-65186)); _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                _GLF_color = _GLF_color;
            } else {
            }
        }
    }
    if (_GLF_DEAD(false)) {
        int donor_replacementGLF_dead2i = _GLF_FUZZED(mix(findLSB(23717u), -5489, false));
        if (_GLF_DEAD(_GLF_IDENTITY(false, !(_GLF_IDENTITY(!(_GLF_IDENTITY(false, bool(bool(false)))), bool(bvec4(!(_GLF_IDENTITY(false, bool(bool(false)))), true, true, false))))))) {
            _GLF_color = fwidthCoarse(_GLF_color);
        }
        int donor_replacementGLF_dead2j = _GLF_FUZZED(74151);
        if (_GLF_DEAD(false)) {
            {
                if (_GLF_DEAD(_GLF_IDENTITY(false, bool(bvec4(false, false, false, false))))) {
                    _GLF_color = vec4(8433.2754, -3.1, 75.82, -5.1);
                }
                ;
            }
        }
        uint donor_replacementGLF_dead2uselessOutVariable = _GLF_FUZZED(packSnorm4x8(_GLF_color));
        if (uint(donor_replacementGLF_dead2j) < uaddCarry(uint(donor_replacementGLF_dead2i), 1u, donor_replacementGLF_dead2uselessOutVariable)) {
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                ;
            } else {
            }
            if (_GLF_DEAD(false)) {
                _GLF_color = _GLF_color;
            }
        }
    }
    do {
        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
            for (int i = 0; i < 50; i++) {
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_IDENTITY(_GLF_color, (_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)) ? _GLF_IDENTITY(_GLF_color, (_GLF_color) + vec4(0.0, 0.0, 0.0, 0.0)) : _GLF_FUZZED(vec4(-90.01, -774.681, -9.5, -6.1))));
                    _GLF_color = vec4(2.6, -7.7, -_GLF_IDENTITY(1.3, clamp(_GLF_IDENTITY(1.3, (1.3) / _GLF_ONE(1.0, injectionSwitch.y)), 1.3, 1.3)), -5.5);
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
                            if (_GLF_DEAD(false)) {
                                float donor_replacementGLF_dead4s = _GLF_FUZZED(round(8.3));
                                {
                                    donor_replacementGLF_dead4s += 0.2;
                                }
                            }
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= abs(0.0))))) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                } else {
                                }
                            } else {
                            }
                        }
                    }
                }
                if (i < int(gl_FragCoord.x)) {
                    break;
                }
                if (i > 0) {
                    A[i] += A[i - 1];
                    if (_GLF_DEAD(false)) {
                        _GLF_color = (-vec4(-3546.8105, 960.202, 9.3, -41.11));
                    }
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        if (_GLF_DEAD(false)) {
                            _GLF_color = _GLF_outlined_9();
                        }
                        _GLF_color = vec4(-10.49, 4.7, 0.3, -_GLF_IDENTITY(548.819, length(vec3(0.0, 0.0, 0.0)) + (548.819)));
                        if (_GLF_DEAD(false)) {
                            _GLF_color = clamp(_GLF_color, 3.9, 5622.8040);
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < abs(0.0))))) {
                                _GLF_color = vec4(5.6, -4.0, 88.83, 7262.9795);
                            }
                        }
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != int(_GLF_ZERO(0.0, injectionSwitch.x))); _injected_loop_counter--) {
                                _GLF_color = _GLF_outlined_10(_GLF_outVarBackup_GLF_color);
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                _GLF_color = _GLF_outVarBackup_GLF_color.tttp;
                            }
                        }
                    }
                }
            }
        } else {
        }
    } while (_GLF_WRAPPED_LOOP(_GLF_IDENTITY(false, (false) || _GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))));
    vec2 c = pattern((15.0 + tan(0.2)) * uv);
    vec3 col;
    for (int _injected_loop_counter = (1 ^ 1); _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
        if (int(gl_FragCoord.y) < 20) {
            {
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    if (_GLF_DEAD(_GLF_IDENTITY(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)), false || (_GLF_IDENTITY(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)), (_GLF_FALSE(false, (gl_FragCoord.y < 0.0))) && true))))) {
                        do {
                            _GLF_color = _GLF_color;
                        } while (_GLF_WRAPPED_LOOP(false));
                    }
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(3.8, 6747.8647, 5.8, -8923.4451);
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                    if (_GLF_DEAD(false)) {
                        _GLF_color = vec4(resolution, mix(uv, resolution, c));
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        int donor_replacementGLF_dead3v = _GLF_FUZZED(_injected_loop_counter);
                        {
                            donor_replacementGLF_dead3v = (4 * donor_replacementGLF_dead3v * (1000 - donor_replacementGLF_dead3v)) / 1000;
                        }
                    }
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    _GLF_color = atanh(_GLF_color);
                }
                vec4 _GLF_outVarBackup_GLF_color;
                for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        _GLF_color = _GLF_color;
                    }
                }
                _GLF_outVarBackup_GLF_color = _GLF_IDENTITY(_GLF_outlined_1(_GLF_IDENTITY(_GLF_color, min(_GLF_IDENTITY(_GLF_color, min(_GLF_color, _GLF_color)), _GLF_color))), (_GLF_outlined_1(_GLF_IDENTITY(_GLF_color, min(_GLF_IDENTITY(_GLF_color, min(_GLF_color, _GLF_color)), _GLF_color)))) * vec4(1.0, 1.0, 1.0, 1.0));
                _GLF_color = vec4(-1048.3611, 791.408, 30.52, 42.77);
                if (_GLF_WRAPPED_IF_FALSE(false)) {
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                } else {
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        _GLF_color = _GLF_color;
                    }
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(4.8, -3.7, 128.295, 360.963);
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        if (_GLF_DEAD(false)) {
                            _GLF_color = radians(dFdx(_GLF_color));
                        }
                        if (_GLF_DEAD(false)) {
                            _GLF_color = ((mat2x3(240.224, -4.3, -9.4, -0.4, 745.399, 6955.5646) == mat2x3(9.0, 63.55, 440.623, -277.366, -4.0, -142.061)) ? vec4(722.788, 9919.8421, -782.183, -5.4) : min(vec4(303.928, -619.928, 859.265, -29.94), 83.70));
                        }
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                if (_GLF_DEAD(false)) {
                    for (_injected_loop_counter = 0; _injected_loop_counter < _injected_loop_counter; _injected_loop_counter++) {
                        GLF_dead1MATRIX_N = (4 * GLF_dead1MATRIX_N * (1000 - GLF_dead1MATRIX_N)) / 1000;
                    }
                }
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    if (_GLF_DEAD(false)) {
                        int donor_replacementGLF_dead3v = _GLF_FUZZED(_injected_loop_counter);
                        {
                            donor_replacementGLF_dead3v = (4 * donor_replacementGLF_dead3v * (1000 - donor_replacementGLF_dead3v)) / 1000;
                        }
                    }
                    do {
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))));
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                    if (_GLF_DEAD(false)) {
                        {
                            _injected_loop_counter = (4 * _injected_loop_counter * (1000 - _injected_loop_counter)) / 1000;
                        }
                    }
                }
            }
            _GLF_IDENTITY(col = .5 + cos(c.y + vec3(resolution.x, A[4] / resolution.x + 50.0, 22.0)), (true ? (col = .5 + cos(c.y + vec3(resolution.x, A[4] / resolution.x + 50.0, 22.0))) : _GLF_FUZZED(vec3(-132.277, -32.13, 445.446))));
        } else if (int(gl_FragCoord.y) < 40) {
            if (_GLF_WRAPPED_IF_FALSE(false)) {
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_ZERO(0.0, injectionSwitch.x))))) {
                    if (_GLF_WRAPPED_IF_FALSE(_GLF_IDENTITY(false, (false) && true))) {
                    } else {
                        _GLF_color = max(_GLF_color, _GLF_color);
                    }
                }
            } else {
                col = .5 + cos(c.y + vec3(resolution.x, A[9] / resolution.x + 50.0, 22.0));
                if (_GLF_DEAD(false)) {
                    if (_GLF_WRAPPED_IF_FALSE(false)) {
                    } else {
                        _GLF_color = (vec4(4488.7265, 3781.2112, 2716.3880, -4.2) * 943.357);
                    }
                }
            }
        } else {
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                _GLF_color = _GLF_outlined_11(_GLF_color);
                if (_GLF_DEAD(false)) {
                    if (_GLF_DEAD(false)) {
                        while (_injected_loop_counter < GLF_dead2N && _injected_loop_counter <= GLF_dead1MATRIX_N) {
                            GLF_dead2temp[_GLF_MAKE_IN_BOUNDS_INT(_injected_loop_counter++, 10)] = GLF_dead2data[_GLF_MAKE_IN_BOUNDS_INT(_injected_loop_counter++, 10)];
                        }
                    }
                    _GLF_color = mod(dFdyCoarse(vec4(2.4, -4036.6649, 61.79, 7311.1150)), 6511.0112);
                }
            }
            if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            } else {
                if (int(gl_FragCoord.y) < 60) {
                    col = .5 + cos(_GLF_IDENTITY(c.y + _GLF_IDENTITY(vec3(resolution.x, A[14] / resolution.x + 50.0, 22.0), (vec3(resolution.x, A[14] / resolution.x + 50.0, 22.0)) * mat3(1.0)), clamp(c.y + _GLF_IDENTITY(vec3(resolution.x, A[14] / resolution.x + 50.0, 22.0), (vec3(resolution.x, A[14] / resolution.x + 50.0, 22.0)) * mat3(1.0)), _GLF_IDENTITY(c.y + _GLF_IDENTITY(vec3(resolution.x, A[14] / resolution.x + 50.0, 22.0), (vec3(resolution.x, A[14] / resolution.x + 50.0, 22.0)) * mat3(1.0)), _GLF_IDENTITY(vec3(mat2(c.y + _GLF_IDENTITY(vec3(resolution.x, A[14] / resolution.x + 50.0, 22.0), (vec3(resolution.x, A[14] / resolution.x + 50.0, 22.0)) * mat3(1.0)), exp(0.0))), (true ? vec3(mat2(_GLF_IDENTITY(c, _GLF_IDENTITY((c) * mat2(_GLF_ONE(1.0, injectionSwitch.y)), clamp((c) * mat2(_GLF_ONE(1.0, injectionSwitch.y)), (c) * mat2(_GLF_ONE(1.0, injectionSwitch.y)), (c) * mat2(_GLF_ONE(1.0, injectionSwitch.y))))).y + _GLF_IDENTITY(vec3(resolution.x, A[14] / resolution.x + 50.0, 22.0), (vec3(resolution.x, A[14] / resolution.x + 50.0, 22.0)) * mat3(1.0)), exp(0.0))) : _GLF_FUZZED(col)))), c.y + _GLF_IDENTITY(vec3(resolution.x, A[14] / resolution.x + 50.0, 22.0), (vec3(resolution.x, A[14] / resolution.x + 50.0, 22.0)) * mat3(1.0)))));
                } else {
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        _GLF_color = (asinh(c) * mat4x2(4573.7189, 65.41, 956.397, 0.7, 9.5, -0.6, -8.7, -6.4));
                    }
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        if (_GLF_DEAD(_GLF_IDENTITY(false, (false) && true))) {
                            if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            } else {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                        if (_GLF_DEAD(false)) {
                            _GLF_color = (mat3x4(-1954.5525, 92.82, -348.532, -6639.5194, -_GLF_IDENTITY(2.6, (2.6) / 1.0), -236.930, -1.3, 8675.1415, 957.829, 97.82, 66.35, 4.7) + (-3.3))[0];
                        }
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            if (_GLF_WRAPPED_IF_FALSE(false)) {
                            } else {
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                            }
                            _GLF_color = vec4(fract((2.0)), vec3(66.97, 170.798, 59.37));
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                if (_GLF_DEAD(false)) {
                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                        _GLF_color = _GLF_outlined_12();
                                    } else {
                                    }
                                }
                            } else {
                            }
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                if (_GLF_WRAPPED_IF_FALSE(false)) {
                                } else {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                        }
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        if (_GLF_DEAD(_GLF_FALSE(false, _GLF_IDENTITY((injectionSwitch.x > injectionSwitch.y), !(_GLF_IDENTITY(!((injectionSwitch.x > injectionSwitch.y)), false || (_GLF_IDENTITY(!((injectionSwitch.x > injectionSwitch.y)), false || (!((injectionSwitch.x > injectionSwitch.y))))))))))) {
                            _GLF_color = vec4(83.57, 475.573, 4.1, 34.86);
                        }
                        if (_GLF_DEAD(false)) {
                            _GLF_color = uintBitsToFloat(uvec4(37209u, 50428u, 138943u, 38075u));
                        }
                        _GLF_color = _GLF_outlined_13();
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(true, !(!(true))))) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                        if (_GLF_DEAD(false)) {
                            float donor_replacementGLF_dead4limit = _GLF_FUZZED(-3.5);
                            float donor_replacementGLF_dead4s = _GLF_FUZZED(-2.3);
                            if (float(_injected_loop_counter) >= donor_replacementGLF_dead4limit) {
                                ;
                            }
                        }
                        if (_GLF_DEAD(false)) {
                            _GLF_color = _GLF_color;
                        }
                        if (int(gl_FragCoord.y) < 80) {
                            col = .5 + cos(c.y + vec3(_GLF_IDENTITY(resolution, (true ? resolution : _GLF_FUZZED(resolution))).x, A[39] / resolution.x + 50.0, 22.0));
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                _GLF_color = _GLF_outlined_14(_GLF_color);
                            }
                        } else {
                            if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            } else {
                                if (_GLF_DEAD(_GLF_IDENTITY(false, (false) || false))) {
                                    {
                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                                _GLF_color = _GLF_outlined_15();
                                            } else {
                                            }
                                        }
                                        if (_GLF_DEAD(false)) {
                                            _GLF_color = roundEven(_GLF_color);
                                        }
                                        ;
                                    }
                                }
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                _GLF_color = step(-3608.4709, _GLF_color);
                                do {
                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                        do {
                                            _GLF_color = vec4(-4.2, -7.8, -634.854, 52.41);
                                        } while (_GLF_WRAPPED_LOOP(false));
                                    }
                                } while (_GLF_WRAPPED_LOOP(false));
                            }
                            {
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    for (int _injected_loop_counter = int(_GLF_ZERO(0.0, injectionSwitch.x)); _GLF_WRAPPED_LOOP(_injected_loop_counter != ((0 >> _GLF_IDENTITY(int(3), int(3))) ^ ((1 << _GLF_IDENTITY(int(0), int(0))) >> _GLF_IDENTITY(int(0), int(0))))); _injected_loop_counter++) {
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                    }
                                    do {
                                        _GLF_IDENTITY(_GLF_color = cos(vec4(-501.705, 20.86, -457.040, -3.8)), (_GLF_IDENTITY(_GLF_color = cos(vec4(-501.705, 20.86, -457.040, -3.8)), (_GLF_color = cos(vec4(-501.705, 20.86, -457.040, -3.8))) * vec4(1.0, 1.0, 1.0, 1.0))) / vec4(1.0, 1.0, 1.0, 1.0));
                                    } while (_GLF_WRAPPED_LOOP(false));
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                    float donor_replacementGLF_dead2grey = _GLF_FUZZED(-3.4);
                                    if (int(GLF_dead2gl_FragCoord[1]) < 60) {
                                        donor_replacementGLF_dead2grey = 0.5 + float(GLF_dead2data[1]) / 10.0;
                                    } else {
                                        if (int(GLF_dead2gl_FragCoord[1]) < 90) {
                                            donor_replacementGLF_dead2grey = 0.5 + float(GLF_dead2data[2]) / 10.0;
                                        } else {
                                            if (int(GLF_dead2gl_FragCoord[1]) < 120) {
                                                donor_replacementGLF_dead2grey = 0.5 + float(GLF_dead2data[3]) / 10.0;
                                            } else {
                                                if (int(GLF_dead2gl_FragCoord[1]) < 150) {
                                                    discard;
                                                } else {
                                                    if (int(GLF_dead2gl_FragCoord[1]) < 180) {
                                                        donor_replacementGLF_dead2grey = 0.5 + float(GLF_dead2data[5]) / 10.0;
                                                    } else {
                                                        if (int(GLF_dead2gl_FragCoord[1]) < 210) {
                                                            donor_replacementGLF_dead2grey = 0.5 + float(GLF_dead2data[6]) / 10.0;
                                                        } else {
                                                            if (int(GLF_dead2gl_FragCoord[1]) < 240) {
                                                                donor_replacementGLF_dead2grey = 0.5 + float(GLF_dead2data[7]) / 10.0;
                                                            } else {
                                                                if (int(GLF_dead2gl_FragCoord[1]) < 270) {
                                                                    donor_replacementGLF_dead2grey = 0.5 + float(GLF_dead2data[8]) / 10.0;
                                                                } else {
                                                                    discard;
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = degrees(vec4(-840.277, -8.6, -9983.9021, 8109.6865));
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    do {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    } while (_GLF_WRAPPED_LOOP(false));
                                    if (_GLF_DEAD(false)) {
                                        {
                                            GLF_dead1MATRIX_N = (4 * GLF_dead1MATRIX_N * (1000 - GLF_dead1MATRIX_N)) / 1000;
                                        }
                                    }
                                }
                            }
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                vec4 _GLF_outVarBackup_GLF_color;
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    if (_GLF_DEAD(false)) {
                                        {
                                            _GLF_outVarBackup_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(_injected_loop_counter, 4)] = _GLF_outVarBackup_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(_injected_loop_counter, 4)] * _GLF_outVarBackup_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(_injected_loop_counter, 4)];
                                        }
                                    }
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                } else {
                                }
                                do {
                                    if (_GLF_IDENTITY(_GLF_DEAD(_GLF_FALSE(false, (_GLF_IDENTITY(gl_FragCoord, vec4(gl_FragCoord[0], gl_FragCoord[1], gl_FragCoord[2], gl_FragCoord[3])).x < 0.0))), bool(bvec2(_GLF_DEAD(_GLF_FALSE(false, (_GLF_IDENTITY(gl_FragCoord, vec4(gl_FragCoord[0], gl_FragCoord[1], gl_FragCoord[2], gl_FragCoord[3])).x < 0.0))), true)))) {
                                        _GLF_color = mod(_GLF_IDENTITY(_GLF_outVarBackup_GLF_color, (false ? _GLF_FUZZED((mat3x4(6107.0222, -2792.2525, 318.417, -58.45, -953.152, 10.75, -191.879, 6603.9741, 37.30, 87.98, 2795.4984, 6.0) * col)) : _GLF_outVarBackup_GLF_color)), -823.063);
                                    }
                                } while (_GLF_WRAPPED_LOOP(false));
                                _GLF_color = vec4(657.584, -5643.9565, -6.6, -4112.7125);
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(true, bool(bvec2(true, true))))) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                        if (_GLF_DEAD(false)) {
                                            float donor_replacementGLF_dead4limit = _GLF_FUZZED(-21.56);
                                            float donor_replacementGLF_dead4s = _GLF_FUZZED(-2055.5822);
                                            if (float(GLF_dead1MATRIX_N) >= donor_replacementGLF_dead4limit) {
                                                ;
                                            }
                                        }
                                    } else {
                                    }
                                }
                            } else {
                            }
                            if (int(gl_FragCoord.y) < 100) {
                                col = .5 + cos(c.y + _GLF_IDENTITY(_GLF_IDENTITY(vec3(resolution.x, A[39] / resolution.x + 50.0, _GLF_IDENTITY(22.0, (true ? 22.0 : _GLF_FUZZED(0.6)))), _GLF_IDENTITY((vec3(resolution.x, A[39] / resolution.x + 50.0, _GLF_IDENTITY(22.0, (true ? _GLF_IDENTITY(22.0, 0.0 + (_GLF_IDENTITY(22.0, max(22.0, _GLF_IDENTITY(22.0, float(mat3(22.0, 1.0, 1.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0))))))) : _GLF_FUZZED(0.6))))), _GLF_IDENTITY(vec3(_GLF_IDENTITY(mat2x3((vec3(resolution.x, A[39] / resolution.x + 50.0, _GLF_IDENTITY(22.0, (true ? _GLF_IDENTITY(22.0, 0.0 + (_GLF_IDENTITY(22.0, max(22.0, _GLF_IDENTITY(22.0, float(mat3(22.0, 1.0, 1.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0))))))) : _GLF_FUZZED(0.6))))), 1.0, 0.0, 1.0), transpose(transpose(mat2x3((vec3(resolution.x, A[39] / resolution.x + 50.0, _GLF_IDENTITY(22.0, (true ? _GLF_IDENTITY(22.0, 0.0 + (_GLF_IDENTITY(22.0, max(22.0, _GLF_IDENTITY(22.0, float(mat3(22.0, 1.0, 1.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0))))))) : _GLF_FUZZED(0.6))))), 1.0, 0.0, 1.0))))), clamp(vec3(_GLF_IDENTITY(mat2x3((vec3(resolution.x, A[39] / resolution.x + 50.0, _GLF_IDENTITY(22.0, (true ? _GLF_IDENTITY(22.0, 0.0 + (_GLF_IDENTITY(22.0, max(22.0, _GLF_IDENTITY(22.0, float(mat3(22.0, 1.0, 1.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0))))))) : _GLF_FUZZED(0.6))))), 1.0, 0.0, 1.0), transpose(transpose(mat2x3((vec3(resolution.x, A[39] / resolution.x + 50.0, _GLF_IDENTITY(22.0, (true ? _GLF_IDENTITY(22.0, 0.0 + (_GLF_IDENTITY(22.0, max(22.0, _GLF_IDENTITY(22.0, float(mat3(22.0, 1.0, 1.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0))))))) : _GLF_FUZZED(0.6))))), 1.0, 0.0, 1.0))))), _GLF_IDENTITY(vec3(_GLF_IDENTITY(mat2x3((vec3(resolution.x, A[39] / resolution.x + 50.0, _GLF_IDENTITY(22.0, (true ? _GLF_IDENTITY(22.0, 0.0 + (_GLF_IDENTITY(22.0, max(22.0, _GLF_IDENTITY(22.0, float(mat3(22.0, 1.0, 1.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0))))))) : _GLF_FUZZED(0.6))))), 1.0, 0.0, 1.0), transpose(transpose(mat2x3((vec3(resolution.x, A[39] / resolution.x + 50.0, _GLF_IDENTITY(22.0, (true ? _GLF_IDENTITY(22.0, 0.0 + (_GLF_IDENTITY(22.0, max(22.0, _GLF_IDENTITY(22.0, float(mat3(22.0, 1.0, 1.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0))))))) : _GLF_FUZZED(0.6))))), 1.0, 0.0, 1.0))))), (vec3(_GLF_IDENTITY(mat2x3((vec3(resolution.x, A[39] / resolution.x + 50.0, _GLF_IDENTITY(22.0, (true ? _GLF_IDENTITY(22.0, 0.0 + (_GLF_IDENTITY(22.0, max(22.0, _GLF_IDENTITY(22.0, float(mat3(22.0, 1.0, 1.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0))))))) : _GLF_FUZZED(0.6))))), 1.0, 0.0, 1.0), transpose(transpose(mat2x3((vec3(resolution.x, A[39] / resolution.x + 50.0, _GLF_IDENTITY(22.0, (true ? _GLF_IDENTITY(22.0, 0.0 + (_GLF_IDENTITY(22.0, max(22.0, _GLF_IDENTITY(22.0, float(mat3(22.0, 1.0, 1.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0))))))) : _GLF_FUZZED(0.6))))), 1.0, 0.0, 1.0)))))) - vec3(0.0, 0.0, 0.0)), vec3(_GLF_IDENTITY(mat2x3((vec3(resolution.x, A[39] / resolution.x + 50.0, _GLF_IDENTITY(22.0, (true ? _GLF_IDENTITY(22.0, 0.0 + (_GLF_IDENTITY(22.0, max(22.0, _GLF_IDENTITY(22.0, float(mat3(22.0, 1.0, 1.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0))))))) : _GLF_FUZZED(0.6))))), 1.0, 0.0, 1.0), transpose(transpose(mat2x3((vec3(resolution.x, A[39] / resolution.x + 50.0, _GLF_IDENTITY(22.0, (true ? _GLF_IDENTITY(22.0, 0.0 + (_GLF_IDENTITY(22.0, max(22.0, _GLF_IDENTITY(22.0, float(mat3(22.0, 1.0, 1.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0))))))) : _GLF_FUZZED(0.6))))), 1.0, 0.0, 1.0)))))))) - vec3(0.0, 0.0, 0.0)), vec3(mat4x2(_GLF_IDENTITY(_GLF_IDENTITY(vec3(resolution.x, A[39] / resolution.x + 50.0, _GLF_IDENTITY(22.0, (true ? 22.0 : _GLF_FUZZED(0.6)))), _GLF_IDENTITY((vec3(resolution.x, A[39] / resolution.x + 50.0, _GLF_IDENTITY(22.0, (true ? _GLF_IDENTITY(22.0, 0.0 + (_GLF_IDENTITY(22.0, max(22.0, _GLF_IDENTITY(22.0, float(mat3(22.0, 1.0, 1.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0))))))) : _GLF_FUZZED(0.6))))), _GLF_IDENTITY(vec3(_GLF_IDENTITY(mat2x3((vec3(resolution.x, A[39] / resolution.x + 50.0, _GLF_IDENTITY(22.0, (true ? _GLF_IDENTITY(22.0, 0.0 + (_GLF_IDENTITY(22.0, max(22.0, _GLF_IDENTITY(22.0, float(mat3(22.0, 1.0, 1.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0))))))) : _GLF_FUZZED(0.6))))), 1.0, 0.0, 1.0), transpose(transpose(mat2x3((vec3(resolution.x, A[39] / resolution.x + 50.0, _GLF_IDENTITY(22.0, (true ? _GLF_IDENTITY(22.0, 0.0 + (_GLF_IDENTITY(22.0, max(22.0, _GLF_IDENTITY(22.0, float(mat3(22.0, 1.0, 1.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0))))))) : _GLF_FUZZED(0.6))))), 1.0, 0.0, 1.0))))), clamp(vec3(_GLF_IDENTITY(mat2x3((vec3(resolution.x, A[39] / resolution.x + 50.0, _GLF_IDENTITY(22.0, (true ? _GLF_IDENTITY(22.0, 0.0 + (_GLF_IDENTITY(22.0, max(22.0, _GLF_IDENTITY(22.0, float(mat3(22.0, 1.0, 1.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0))))))) : _GLF_FUZZED(0.6))))), 1.0, 0.0, 1.0), transpose(transpose(mat2x3((vec3(resolution.x, A[39] / resolution.x + 50.0, _GLF_IDENTITY(22.0, (true ? _GLF_IDENTITY(22.0, 0.0 + (_GLF_IDENTITY(22.0, max(22.0, _GLF_IDENTITY(22.0, float(mat3(22.0, 1.0, 1.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0))))))) : _GLF_FUZZED(0.6))))), 1.0, 0.0, 1.0))))), _GLF_IDENTITY(vec3(_GLF_IDENTITY(mat2x3((vec3(resolution.x, A[39] / resolution.x + 50.0, _GLF_IDENTITY(22.0, (true ? _GLF_IDENTITY(22.0, 0.0 + (_GLF_IDENTITY(22.0, max(22.0, _GLF_IDENTITY(22.0, float(mat3(22.0, 1.0, 1.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0))))))) : _GLF_FUZZED(0.6))))), 1.0, 0.0, 1.0), transpose(transpose(mat2x3((vec3(resolution.x, A[39] / resolution.x + 50.0, _GLF_IDENTITY(22.0, (true ? _GLF_IDENTITY(22.0, 0.0 + (_GLF_IDENTITY(22.0, max(22.0, _GLF_IDENTITY(22.0, float(mat3(22.0, 1.0, 1.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0))))))) : _GLF_FUZZED(0.6))))), 1.0, 0.0, 1.0))))), (vec3(_GLF_IDENTITY(mat2x3((vec3(resolution.x, A[39] / resolution.x + 50.0, _GLF_IDENTITY(22.0, (true ? _GLF_IDENTITY(22.0, 0.0 + (_GLF_IDENTITY(22.0, max(22.0, _GLF_IDENTITY(22.0, float(mat3(22.0, 1.0, 1.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0))))))) : _GLF_FUZZED(0.6))))), 1.0, 0.0, 1.0), transpose(transpose(mat2x3((vec3(resolution.x, A[39] / resolution.x + 50.0, _GLF_IDENTITY(22.0, (true ? _GLF_IDENTITY(22.0, 0.0 + (_GLF_IDENTITY(22.0, max(22.0, _GLF_IDENTITY(22.0, float(mat3(22.0, 1.0, 1.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0))))))) : _GLF_FUZZED(0.6))))), 1.0, 0.0, 1.0)))))) - vec3(0.0, 0.0, 0.0)), vec3(_GLF_IDENTITY(mat2x3((vec3(resolution.x, A[39] / resolution.x + 50.0, _GLF_IDENTITY(22.0, (true ? _GLF_IDENTITY(22.0, 0.0 + (_GLF_IDENTITY(22.0, max(22.0, _GLF_IDENTITY(22.0, float(mat3(22.0, 1.0, 1.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0))))))) : _GLF_FUZZED(0.6))))), 1.0, 0.0, 1.0), transpose(transpose(mat2x3((vec3(resolution.x, A[39] / resolution.x + 50.0, _GLF_IDENTITY(22.0, (true ? _GLF_IDENTITY(22.0, 0.0 + (_GLF_IDENTITY(22.0, max(22.0, _GLF_IDENTITY(22.0, float(mat3(22.0, 1.0, 1.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0))))))) : _GLF_FUZZED(0.6))))), 1.0, 0.0, 1.0)))))))) - vec3(0.0, 0.0, 0.0)), clamp(_GLF_IDENTITY(vec3(resolution.x, A[39] / resolution.x + 50.0, _GLF_IDENTITY(22.0, (true ? 22.0 : _GLF_FUZZED(0.6)))), _GLF_IDENTITY((vec3(resolution.x, A[39] / resolution.x + 50.0, _GLF_IDENTITY(22.0, (true ? _GLF_IDENTITY(22.0, 0.0 + (_GLF_IDENTITY(22.0, max(22.0, _GLF_IDENTITY(22.0, float(mat3(22.0, 1.0, 1.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0))))))) : _GLF_FUZZED(0.6))))), _GLF_IDENTITY(vec3(_GLF_IDENTITY(mat2x3((vec3(resolution.x, A[39] / resolution.x + 50.0, _GLF_IDENTITY(22.0, (true ? _GLF_IDENTITY(22.0, 0.0 + (_GLF_IDENTITY(22.0, max(22.0, _GLF_IDENTITY(22.0, float(mat3(22.0, 1.0, 1.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0))))))) : _GLF_FUZZED(0.6))))), 1.0, 0.0, 1.0), transpose(transpose(mat2x3((vec3(resolution.x, A[39] / resolution.x + 50.0, _GLF_IDENTITY(22.0, (true ? _GLF_IDENTITY(22.0, 0.0 + (_GLF_IDENTITY(22.0, max(22.0, _GLF_IDENTITY(22.0, float(mat3(22.0, 1.0, 1.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0))))))) : _GLF_FUZZED(0.6))))), 1.0, 0.0, 1.0))))), clamp(vec3(_GLF_IDENTITY(mat2x3((vec3(resolution.x, A[39] / resolution.x + 50.0, _GLF_IDENTITY(22.0, (true ? _GLF_IDENTITY(22.0, 0.0 + (_GLF_IDENTITY(22.0, max(22.0, _GLF_IDENTITY(22.0, float(mat3(22.0, 1.0, 1.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0))))))) : _GLF_FUZZED(0.6))))), 1.0, 0.0, 1.0), transpose(transpose(mat2x3((vec3(resolution.x, A[39] / resolution.x + 50.0, _GLF_IDENTITY(22.0, (true ? _GLF_IDENTITY(22.0, 0.0 + (_GLF_IDENTITY(22.0, max(22.0, _GLF_IDENTITY(22.0, float(mat3(22.0, 1.0, 1.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0))))))) : _GLF_FUZZED(0.6))))), 1.0, 0.0, 1.0))))), _GLF_IDENTITY(vec3(_GLF_IDENTITY(mat2x3((vec3(resolution.x, A[39] / resolution.x + 50.0, _GLF_IDENTITY(22.0, (true ? _GLF_IDENTITY(22.0, 0.0 + (_GLF_IDENTITY(22.0, max(22.0, _GLF_IDENTITY(22.0, float(mat3(22.0, 1.0, 1.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0))))))) : _GLF_FUZZED(0.6))))), 1.0, 0.0, 1.0), transpose(transpose(mat2x3((vec3(resolution.x, A[39] / resolution.x + 50.0, _GLF_IDENTITY(22.0, (true ? _GLF_IDENTITY(22.0, 0.0 + (_GLF_IDENTITY(22.0, max(22.0, _GLF_IDENTITY(22.0, float(mat3(22.0, 1.0, 1.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0))))))) : _GLF_FUZZED(0.6))))), 1.0, 0.0, 1.0))))), (vec3(_GLF_IDENTITY(mat2x3((vec3(resolution.x, A[39] / resolution.x + 50.0, _GLF_IDENTITY(22.0, (true ? _GLF_IDENTITY(22.0, 0.0 + (_GLF_IDENTITY(22.0, max(22.0, _GLF_IDENTITY(22.0, float(mat3(22.0, 1.0, 1.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0))))))) : _GLF_FUZZED(0.6))))), 1.0, 0.0, 1.0), transpose(transpose(mat2x3((vec3(resolution.x, A[39] / resolution.x + 50.0, _GLF_IDENTITY(22.0, (true ? _GLF_IDENTITY(22.0, 0.0 + (_GLF_IDENTITY(22.0, max(22.0, _GLF_IDENTITY(22.0, float(mat3(22.0, 1.0, 1.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0))))))) : _GLF_FUZZED(0.6))))), 1.0, 0.0, 1.0)))))) - vec3(0.0, 0.0, 0.0)), vec3(_GLF_IDENTITY(mat2x3((vec3(resolution.x, A[39] / resolution.x + 50.0, _GLF_IDENTITY(22.0, (true ? _GLF_IDENTITY(22.0, 0.0 + (_GLF_IDENTITY(22.0, max(22.0, _GLF_IDENTITY(22.0, float(mat3(22.0, 1.0, 1.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0))))))) : _GLF_FUZZED(0.6))))), 1.0, 0.0, 1.0), transpose(transpose(mat2x3((vec3(resolution.x, A[39] / resolution.x + 50.0, _GLF_IDENTITY(22.0, (true ? _GLF_IDENTITY(22.0, 0.0 + (_GLF_IDENTITY(22.0, max(22.0, _GLF_IDENTITY(22.0, float(mat3(22.0, 1.0, 1.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0))))))) : _GLF_FUZZED(0.6))))), 1.0, 0.0, 1.0)))))))) - vec3(0.0, 0.0, 0.0)), _GLF_IDENTITY(vec3(resolution.x, A[39] / resolution.x + 50.0, _GLF_IDENTITY(22.0, (true ? 22.0 : _GLF_FUZZED(0.6)))), _GLF_IDENTITY((vec3(resolution.x, A[39] / resolution.x + 50.0, _GLF_IDENTITY(22.0, (true ? _GLF_IDENTITY(22.0, 0.0 + (_GLF_IDENTITY(22.0, max(22.0, _GLF_IDENTITY(22.0, float(mat3(22.0, 1.0, 1.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0))))))) : _GLF_FUZZED(0.6))))), _GLF_IDENTITY(vec3(_GLF_IDENTITY(mat2x3((vec3(resolution.x, A[39] / resolution.x + 50.0, _GLF_IDENTITY(22.0, (true ? _GLF_IDENTITY(22.0, 0.0 + (_GLF_IDENTITY(22.0, max(22.0, _GLF_IDENTITY(22.0, float(mat3(22.0, 1.0, 1.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0))))))) : _GLF_FUZZED(0.6))))), 1.0, 0.0, 1.0), transpose(transpose(mat2x3((vec3(resolution.x, A[39] / resolution.x + 50.0, _GLF_IDENTITY(22.0, (true ? _GLF_IDENTITY(22.0, 0.0 + (_GLF_IDENTITY(22.0, max(22.0, _GLF_IDENTITY(22.0, float(mat3(22.0, 1.0, 1.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0))))))) : _GLF_FUZZED(0.6))))), 1.0, 0.0, 1.0))))), clamp(vec3(_GLF_IDENTITY(mat2x3((vec3(resolution.x, A[39] / resolution.x + 50.0, _GLF_IDENTITY(22.0, (true ? _GLF_IDENTITY(22.0, 0.0 + (_GLF_IDENTITY(22.0, max(22.0, _GLF_IDENTITY(22.0, float(mat3(22.0, 1.0, 1.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0))))))) : _GLF_FUZZED(0.6))))), 1.0, 0.0, 1.0), transpose(transpose(mat2x3((vec3(resolution.x, A[39] / resolution.x + 50.0, _GLF_IDENTITY(22.0, (true ? _GLF_IDENTITY(22.0, 0.0 + (_GLF_IDENTITY(22.0, max(22.0, _GLF_IDENTITY(22.0, float(mat3(22.0, 1.0, 1.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0))))))) : _GLF_FUZZED(0.6))))), 1.0, 0.0, 1.0))))), _GLF_IDENTITY(vec3(_GLF_IDENTITY(mat2x3((vec3(resolution.x, A[39] / resolution.x + 50.0, _GLF_IDENTITY(22.0, (true ? _GLF_IDENTITY(22.0, 0.0 + (_GLF_IDENTITY(22.0, max(22.0, _GLF_IDENTITY(22.0, float(mat3(22.0, 1.0, 1.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0))))))) : _GLF_FUZZED(0.6))))), 1.0, 0.0, 1.0), transpose(transpose(mat2x3((vec3(resolution.x, A[39] / resolution.x + 50.0, _GLF_IDENTITY(22.0, (true ? _GLF_IDENTITY(22.0, 0.0 + (_GLF_IDENTITY(22.0, max(22.0, _GLF_IDENTITY(22.0, float(mat3(22.0, 1.0, 1.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0))))))) : _GLF_FUZZED(0.6))))), 1.0, 0.0, 1.0))))), (vec3(_GLF_IDENTITY(mat2x3((vec3(resolution.x, A[39] / resolution.x + 50.0, _GLF_IDENTITY(22.0, (true ? _GLF_IDENTITY(22.0, 0.0 + (_GLF_IDENTITY(22.0, max(22.0, _GLF_IDENTITY(22.0, float(mat3(22.0, 1.0, 1.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0))))))) : _GLF_FUZZED(0.6))))), 1.0, 0.0, 1.0), transpose(transpose(mat2x3((vec3(resolution.x, A[39] / resolution.x + 50.0, _GLF_IDENTITY(22.0, (true ? _GLF_IDENTITY(22.0, 0.0 + (_GLF_IDENTITY(22.0, max(22.0, _GLF_IDENTITY(22.0, float(mat3(22.0, 1.0, 1.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0))))))) : _GLF_FUZZED(0.6))))), 1.0, 0.0, 1.0)))))) - vec3(0.0, 0.0, 0.0)), vec3(_GLF_IDENTITY(mat2x3((vec3(resolution.x, A[39] / resolution.x + 50.0, _GLF_IDENTITY(22.0, (true ? _GLF_IDENTITY(22.0, 0.0 + (_GLF_IDENTITY(22.0, max(22.0, _GLF_IDENTITY(22.0, float(mat3(22.0, 1.0, 1.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0))))))) : _GLF_FUZZED(0.6))))), 1.0, 0.0, 1.0), transpose(transpose(mat2x3((vec3(resolution.x, A[39] / resolution.x + 50.0, _GLF_IDENTITY(22.0, (true ? _GLF_IDENTITY(22.0, 0.0 + (_GLF_IDENTITY(22.0, max(22.0, _GLF_IDENTITY(22.0, float(mat3(22.0, 1.0, 1.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0))))))) : _GLF_FUZZED(0.6))))), 1.0, 0.0, 1.0)))))))) - vec3(0.0, 0.0, 0.0)), _GLF_IDENTITY(vec3(resolution.x, A[39] / resolution.x + 50.0, _GLF_IDENTITY(22.0, (true ? 22.0 : _GLF_FUZZED(0.6)))), _GLF_IDENTITY((vec3(resolution.x, A[39] / resolution.x + 50.0, _GLF_IDENTITY(22.0, (true ? _GLF_IDENTITY(22.0, 0.0 + (_GLF_IDENTITY(22.0, max(22.0, _GLF_IDENTITY(22.0, float(mat3(22.0, 1.0, 1.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0))))))) : _GLF_FUZZED(0.6))))), _GLF_IDENTITY(vec3(_GLF_IDENTITY(mat2x3((vec3(resolution.x, A[39] / resolution.x + 50.0, _GLF_IDENTITY(22.0, (true ? _GLF_IDENTITY(22.0, 0.0 + (_GLF_IDENTITY(22.0, max(22.0, _GLF_IDENTITY(22.0, float(mat3(22.0, 1.0, 1.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0))))))) : _GLF_FUZZED(0.6))))), 1.0, 0.0, 1.0), transpose(transpose(mat2x3((vec3(resolution.x, A[39] / resolution.x + 50.0, _GLF_IDENTITY(22.0, (true ? _GLF_IDENTITY(22.0, 0.0 + (_GLF_IDENTITY(22.0, max(22.0, _GLF_IDENTITY(22.0, float(mat3(22.0, 1.0, 1.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0))))))) : _GLF_FUZZED(0.6))))), 1.0, 0.0, 1.0))))), clamp(vec3(_GLF_IDENTITY(mat2x3((vec3(resolution.x, A[39] / resolution.x + 50.0, _GLF_IDENTITY(22.0, (true ? _GLF_IDENTITY(22.0, 0.0 + (_GLF_IDENTITY(22.0, max(22.0, _GLF_IDENTITY(22.0, float(mat3(22.0, 1.0, 1.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0))))))) : _GLF_FUZZED(0.6))))), 1.0, 0.0, 1.0), transpose(transpose(mat2x3((vec3(resolution.x, A[39] / resolution.x + 50.0, _GLF_IDENTITY(22.0, (true ? _GLF_IDENTITY(22.0, 0.0 + (_GLF_IDENTITY(22.0, max(22.0, _GLF_IDENTITY(22.0, float(mat3(22.0, 1.0, 1.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0))))))) : _GLF_FUZZED(0.6))))), 1.0, 0.0, 1.0))))), _GLF_IDENTITY(vec3(_GLF_IDENTITY(mat2x3((vec3(resolution.x, A[39] / resolution.x + 50.0, _GLF_IDENTITY(22.0, (true ? _GLF_IDENTITY(22.0, 0.0 + (_GLF_IDENTITY(22.0, max(22.0, _GLF_IDENTITY(22.0, float(mat3(22.0, 1.0, 1.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0))))))) : _GLF_FUZZED(0.6))))), 1.0, 0.0, 1.0), transpose(transpose(mat2x3((vec3(resolution.x, A[39] / resolution.x + 50.0, _GLF_IDENTITY(22.0, (true ? _GLF_IDENTITY(22.0, 0.0 + (_GLF_IDENTITY(22.0, max(22.0, _GLF_IDENTITY(22.0, float(mat3(22.0, 1.0, 1.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0))))))) : _GLF_FUZZED(0.6))))), 1.0, 0.0, 1.0))))), (vec3(_GLF_IDENTITY(mat2x3((vec3(resolution.x, A[39] / resolution.x + 50.0, _GLF_IDENTITY(22.0, (true ? _GLF_IDENTITY(22.0, 0.0 + (_GLF_IDENTITY(22.0, max(22.0, _GLF_IDENTITY(22.0, float(mat3(22.0, 1.0, 1.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0))))))) : _GLF_FUZZED(0.6))))), 1.0, 0.0, 1.0), transpose(transpose(mat2x3((vec3(resolution.x, A[39] / resolution.x + 50.0, _GLF_IDENTITY(22.0, (true ? _GLF_IDENTITY(22.0, 0.0 + (_GLF_IDENTITY(22.0, max(22.0, _GLF_IDENTITY(22.0, float(mat3(22.0, 1.0, 1.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0))))))) : _GLF_FUZZED(0.6))))), 1.0, 0.0, 1.0)))))) - vec3(0.0, 0.0, 0.0)), vec3(_GLF_IDENTITY(mat2x3((vec3(resolution.x, A[39] / resolution.x + 50.0, _GLF_IDENTITY(22.0, (true ? _GLF_IDENTITY(22.0, 0.0 + (_GLF_IDENTITY(22.0, max(22.0, _GLF_IDENTITY(22.0, float(mat3(22.0, 1.0, 1.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0))))))) : _GLF_FUZZED(0.6))))), 1.0, 0.0, 1.0), transpose(transpose(mat2x3((vec3(resolution.x, A[39] / resolution.x + 50.0, _GLF_IDENTITY(22.0, (true ? _GLF_IDENTITY(22.0, 0.0 + (_GLF_IDENTITY(22.0, max(22.0, _GLF_IDENTITY(22.0, float(mat3(22.0, 1.0, 1.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0))))))) : _GLF_FUZZED(0.6))))), 1.0, 0.0, 1.0)))))))) - vec3(0.0, 0.0, 0.0)))), 0.0, 0.0, 0.0, tan(sin(0.0)), 0.0))));
                                for (int _injected_loop_counter = (0 & (-25166)); _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
                                    if (_GLF_DEAD(false)) {
                                        int donor_replacementGLF_dead1i = _GLF_FUZZED(ivec2(-30585, 23356)[1]);
                                        int donor_replacementGLF_dead1j = _GLF_FUZZED((~(-94551)));
                                        mat4 donor_replacementGLF_dead1matrix_a = _GLF_FUZZED((true ? mat4(-0.6, 539.563, 4.6, -8.9, 9147.5909, -1.9, 1.7, 237.129, 0.7, 28.56, -5.8, 84.31, 869.597, -22.69, -9503.0139, 0.8) : mat4(-72.26, 8861.2569, _GLF_IDENTITY(-8.3, max(-8.3, _GLF_IDENTITY(-8.3, (true ? (-8.3) : _GLF_FUZZED(1.1))))), 8470.7647, -96.01, 0.2, -5607.5957, 8.8, 1.7, -36.98, 832.570, 6364.4926, 3605.1789, 8540.3871, -3346.2733, 662.671)));
                                        {
                                            do {
                                                if (_GLF_DEAD(false)) {
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                        {
                                                            GLF_dead1MATRIX_N = (4 * GLF_dead1MATRIX_N * (1000 - GLF_dead1MATRIX_N)) / 1000;
                                                        }
                                                    }
                                                    _GLF_color = _GLF_color;
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                        for (_injected_loop_counter = 0; _injected_loop_counter < donor_replacementGLF_dead1i; _injected_loop_counter++) {
                                                            donor_replacementGLF_dead1i = (4 * donor_replacementGLF_dead1i * (1000 - donor_replacementGLF_dead1i)) / 1000;
                                                        }
                                                    }
                                                }
                                                _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead1i, 4)] -= (donor_replacementGLF_dead1matrix_a[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead1i, 4)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead1j, 4)] * _GLF_IDENTITY(_GLF_color, max(_GLF_color, _GLF_color))[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead1j, 4)]);
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < length(vec4(0.0, 0.0, 0.0, 0.0)))))) {
                                                    _GLF_color = (vec4(2487.1417, -8.1, -9591.4459, -578.116) - _GLF_color);
                                                }
                                            } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.y < _GLF_ZERO(0.0, injectionSwitch.x)))));
                                        }
                                        for (int _injected_loop_counter = (1 | 1); _GLF_WRAPPED_LOOP(_injected_loop_counter != int(_GLF_ZERO(0.0, injectionSwitch.x))); _injected_loop_counter--) {
                                            if (_GLF_DEAD(false)) {
                                                _GLF_color = atanh((216.863 / _GLF_IDENTITY(vec4(-63.43, -315.406, 9218.6525, 4.8), min(vec4(-63.43, -315.406, 9218.6525, 4.8), vec4(-63.43, -315.406, 9218.6525, 4.8)))));
                                                if (_GLF_DEAD(_GLF_IDENTITY(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)), true && (_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))))) {
                                                    _GLF_color = vec4(4662.6897, 5661.6641, -5.1, 0.1);
                                                }
                                            }
                                        }
                                    }
                                }
                            } else {
                                if (_GLF_DEAD(false)) {
                                    float donor_replacementGLF_dead2grey = _GLF_FUZZED(step(-1.4, -1.9));
                                    if (int(GLF_dead2gl_FragCoord[1]) < 150) {
                                        discard;
                                    } else {
                                        if (int(GLF_dead2gl_FragCoord[1]) < 180) {
                                            donor_replacementGLF_dead2grey = 0.5 + float(GLF_dead2data[5]) / 10.0;
                                        } else {
                                            if (int(GLF_dead2gl_FragCoord[1]) < 210) {
                                                donor_replacementGLF_dead2grey = 0.5 + float(GLF_dead2data[6]) / 10.0;
                                            } else {
                                                if (int(GLF_dead2gl_FragCoord[1]) < 240) {
                                                    donor_replacementGLF_dead2grey = 0.5 + float(GLF_dead2data[7]) / 10.0;
                                                } else {
                                                    if (int(GLF_dead2gl_FragCoord[1]) < 270) {
                                                        donor_replacementGLF_dead2grey = 0.5 + float(GLF_dead2data[8]) / 10.0;
                                                    } else {
                                                        discard;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                                if (int(gl_FragCoord.y) < 120) {
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < sin(_GLF_IDENTITY(0.0, float(mat4(0.0, 1.0, 1.0, 1.0, 0.0, exp(0.0), 0.0, log(1.0), abs(1.0), 1.0, 0.0, 0.0, determinant(mat3(_GLF_ONE(1.0, injectionSwitch.y), 0.0, 1.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0)), 1.0, 0.0, 0.0)))))))) {
                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                _GLF_color = _GLF_color;
                                            } else {
                                            }
                                        }
                                        if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                        } else {
                                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                if (_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(_injected_loop_counter, 4)] >= 1.0) {
                                                    _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(_injected_loop_counter, 4)] = _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(_injected_loop_counter, 4)] * _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(_injected_loop_counter, 4)];
                                                }
                                            }
                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                                    do {
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                            if (_GLF_WRAPPED_IF_FALSE(_GLF_IDENTITY(false, !(!(false))))) {
                                                            } else {
                                                                _GLF_color = acos(_GLF_color);
                                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                                    int donor_replacementGLF_dead4i = _GLF_FUZZED(findMSB(bitfieldReverse((16622 / _injected_loop_counter))));
                                                                    float donor_replacementGLF_dead4ref = _GLF_FUZZED(determinant(transpose(mat2(-14.64, 0.8, 59.67, -205.852))));
                                                                    float donor_replacementGLF_dead4s = _GLF_FUZZED(-5.9);
                                                                    if (mod(float(donor_replacementGLF_dead4i), donor_replacementGLF_dead4ref) <= 0.01) {
                                                                        donor_replacementGLF_dead4s += 0.2;
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    } while (_GLF_WRAPPED_LOOP(false));
                                                } else {
                                                }
                                                vec4 _GLF_outVarBackup_GLF_color;
                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                if (_GLF_DEAD(false)) {
                                                    float donor_replacementGLF_dead4limit = _GLF_FUZZED(determinant(mat3(-84.31, 6.1, 7297.6314, -9.7, -2.2, -3.4, 0.8, -621.196, -9.4)));
                                                    float donor_replacementGLF_dead4ref = _GLF_FUZZED(-664.659);
                                                    float donor_replacementGLF_dead4s = _GLF_FUZZED(6991.8336);
                                                    for (int GLF_dead4i = 1; GLF_dead4i < 800; GLF_dead4i++) {
                                                        if (mod(float(GLF_dead4i), donor_replacementGLF_dead4ref) <= 0.01) {
                                                            donor_replacementGLF_dead4s += 0.2;
                                                        }
                                                        if (float(GLF_dead4i) >= donor_replacementGLF_dead4limit) {
                                                            ;
                                                        }
                                                    }
                                                }
                                                do {
                                                    _GLF_color = vec4(-78.93, -556.192, 6800.9858, 7.0);
                                                } while (_GLF_WRAPPED_LOOP(false));
                                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                                    do {
                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                    } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
                                                    {
                                                        vec4 _GLF_outVarBackup_GLF_color;
                                                        if (_GLF_DEAD(false)) {
                                                            int donor_replacementGLF_dead3iters = _GLF_FUZZED(findMSB(102953u));
                                                            for (_injected_loop_counter = 0; _injected_loop_counter < donor_replacementGLF_dead3iters; _injected_loop_counter++) {
                                                                _injected_loop_counter = (4 * _injected_loop_counter * (1000 - _injected_loop_counter)) / 1000;
                                                            }
                                                        }
                                                        if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < length(vec3(_GLF_ZERO(0.0, injectionSwitch.x), _GLF_ZERO(0.0, injectionSwitch.x), _GLF_ZERO(0.0, injectionSwitch.x))))))) {
                                                            if (_GLF_DEAD(false)) {
                                                                _GLF_color = _GLF_color;
                                                            }
                                                        } else {
                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                        }
                                                        do {
                                                            for (int _injected_loop_counter = int(_GLF_ZERO(0.0, injectionSwitch.x)); _GLF_WRAPPED_LOOP(_injected_loop_counter < (1 | 1)); _injected_loop_counter++) {
                                                                _GLF_color = _GLF_outlined_16();
                                                            }
                                                        } while (_GLF_WRAPPED_LOOP(false));
                                                        if (_GLF_DEAD(false)) {
                                                            if (_GLF_DEAD(false)) {
                                                                float donor_replacementGLF_dead4limit = _GLF_FUZZED(abs(8.3));
                                                                float donor_replacementGLF_dead4ref = _GLF_FUZZED(ceil(vec2(-1.3, -6633.2601)[0]));
                                                                float donor_replacementGLF_dead4s = _GLF_FUZZED(-9.8);
                                                                for (int GLF_dead4i = 1; GLF_dead4i < 800; GLF_dead4i++) {
                                                                    if (mod(float(GLF_dead4i), donor_replacementGLF_dead4ref) <= 0.01) {
                                                                        donor_replacementGLF_dead4s += 0.2;
                                                                    }
                                                                    if (float(GLF_dead4i) >= donor_replacementGLF_dead4limit) {
                                                                        ;
                                                                    }
                                                                }
                                                            }
                                                            _GLF_color = asin(min(_GLF_outVarBackup_GLF_color, _GLF_color));
                                                            if (_GLF_DEAD(false)) {
                                                                _GLF_color = fma(_GLF_color, _GLF_outVarBackup_GLF_color, _GLF_color);
                                                            }
                                                        }
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                            do {
                                                                _GLF_color = _GLF_color;
                                                            } while (_GLF_WRAPPED_LOOP(false));
                                                        }
                                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                            for (int _injected_loop_counter = _GLF_IDENTITY(1, _GLF_IDENTITY(int(ivec3(1, 1, 1)), (int(ivec3(1, 1, 1))) >> 0)); _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                                                                if (_GLF_DEAD(false)) {
                                                                    if (_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(_injected_loop_counter, 4)] >= 1.0) {
                                                                        _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(_injected_loop_counter, 4)] = _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(_injected_loop_counter, 4)] * _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(_injected_loop_counter, 4)];
                                                                    }
                                                                }
                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                            }
                                                        }
                                                    }
                                                }
                                            } else {
                                                if (_GLF_DEAD(false)) {
                                                    for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
                                                        _GLF_color = vec4(-68.51, 1.9, -9432.8288, -44.88);
                                                    }
                                                }
                                            }
                                        }
                                        col = .5 + cos(c.y + vec3(resolution.x, A[39] / _GLF_IDENTITY(resolution.x, float(mat4(resolution.x, 1.0, 0.0, 0.0, 0.0, 1.0, 1.0, round(length(normalize(1.0))), _GLF_IDENTITY(1.0, min(_GLF_IDENTITY(1.0, float(mat2x4(1.0, 1.0, 0.0, 1.0, 0.0, 1.0, 1.0, 1.0))), 1.0)), 0.0, 0.0, 1.0, 1.0, 1.0, 1.0, 1.0))) + 50.0, 22.0));
                                    } else {
                                        if (_GLF_DEAD(_GLF_IDENTITY(false, _GLF_FALSE(false, (gl_FragCoord.x < 0.0)) || (_GLF_IDENTITY(false, bool(bvec2(false, true))))))) {
                                            _GLF_color = _GLF_color;
                                        }
                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                            _GLF_color = (mat4(-558.683, -719.336, 8.3, 4.8, 963.319, 9.5, -5.9, -31.67, 327.869, 851.822, 17.11, 6581.2379, -9411.0665, 3921.4137, 589.647, _GLF_IDENTITY(-9.7, max(_GLF_IDENTITY(-9.7, min(-9.7, -9.7)), -9.7))) * _GLF_color);
                                        }
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                            do {
                                                _GLF_color = vec4(-5.8, 2.3, 36.50, -8678.7538);
                                            } while (_GLF_WRAPPED_LOOP(false));
                                        }
                                        do {
                                            if (_GLF_DEAD(false)) {
                                                int donor_replacementGLF_dead0iteration = _GLF_FUZZED(20319);
                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                    if (donor_replacementGLF_dead0iteration < 1000) {
                                                        if (_GLF_DEAD(false)) {
                                                            if (_GLF_DEAD(false)) {
                                                                if (_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(_injected_loop_counter, 4)] >= 1.0) {
                                                                    _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(_injected_loop_counter, 4)] = _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(_injected_loop_counter, 4)] * _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(_injected_loop_counter, 4)];
                                                                }
                                                            }
                                                            _GLF_color = vec4(2858.4719, 683.731, 6959.5281, -23.83);
                                                        }
                                                        ;
                                                    } else {
                                                        ;
                                                    }
                                                } else {
                                                }
                                                if (_GLF_DEAD(false)) {
                                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                                        _GLF_color = mod(vec4(3.0, -39.81, -8571.5293, 5.5), mod(_GLF_color, vec4(6640.7568, -4.1, 399.848, -9.2)));
                                                    } else {
                                                    }
                                                }
                                            }
                                        } while (_GLF_WRAPPED_LOOP(false));
                                        for (int _injected_loop_counter = int(_GLF_ZERO(0.0, injectionSwitch.x)); _GLF_WRAPPED_LOOP(_injected_loop_counter != (int(_GLF_ONE(1.0, injectionSwitch.y)) & (1 & 1))); _injected_loop_counter++) {
                                            do {
                                                do {
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                        _GLF_color = _GLF_color;
                                                    }
                                                } while (_GLF_WRAPPED_LOOP(false));
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < _GLF_IDENTITY(0.0, min(_GLF_IDENTITY(0.0, (0.0) * 1.0), 0.0)))))) {
                                                    _GLF_color = _GLF_outlined_17(_GLF_color);
                                                }
                                                if (_GLF_DEAD(false)) {
                                                    _GLF_color = reflect(_GLF_color, tanh(vec4(83.66, -7.4, -87.58, -99.54)));
                                                }
                                            } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))));
                                        }
                                    }
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = _GLF_color;
                                    }
                                    do {
                                        if (_GLF_DEAD(false)) {
                                            do {
                                                _GLF_color = _GLF_color;
                                            } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))));
                                        }
                                        if (_GLF_DEAD(false)) {
                                            int donor_replacementGLF_dead4i = _GLF_FUZZED(_injected_loop_counter);
                                            float donor_replacementGLF_dead4limit = _GLF_FUZZED(dFdxCoarse(-97.45));
                                            float donor_replacementGLF_dead4s = _GLF_FUZZED(inversesqrt(-2799.8114));
                                            if (float(donor_replacementGLF_dead4i) >= donor_replacementGLF_dead4limit) {
                                                ;
                                            }
                                        }
                                    } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))));
                                } else {
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        {
                                            vec4 _GLF_outVarBackup_GLF_color;
                                            if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                            } else {
                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                            }
                                            _GLF_color = vec4(-3.3, 93.38, -4444.4803, 681.972);
                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(true, bool(bvec4(true, false, false, _GLF_IDENTITY(false, bool(bvec4(false, false, true, true)))))))) {
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                            }
                                        }
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        do {
                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                        } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))));
                                        for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != int(_GLF_ONE(1.0, injectionSwitch.y))); _injected_loop_counter++) {
                                            _GLF_color = vec4(895.919, -1.2, -9051.1567, -1.5);
                                        }
                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (_GLF_IDENTITY(injectionSwitch, mat2(1.0) * (injectionSwitch)).x < injectionSwitch.y)))) {
                                            if (_GLF_DEAD(false)) {
                                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                    _GLF_color = _GLF_color;
                                                }
                                                if (_GLF_DEAD(false)) {
                                                    int donor_replacementGLF_dead3v = _GLF_FUZZED(_injected_loop_counter);
                                                    for (_injected_loop_counter = 0; _injected_loop_counter < _injected_loop_counter; _injected_loop_counter++) {
                                                        donor_replacementGLF_dead3v = (4 * donor_replacementGLF_dead3v * (1000 - donor_replacementGLF_dead3v)) / 1000;
                                                    }
                                                }
                                                float donor_replacementGLF_dead3s = _GLF_FUZZED(_GLF_color[3]);
                                                {
                                                    for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != (int(_GLF_ZERO(0.0, injectionSwitch.x)) << _GLF_IDENTITY(int(5), int(5)))); _injected_loop_counter--) {
                                                        ;
                                                    }
                                                }
                                            }
                                            if (_GLF_DEAD(false)) {
                                                _GLF_color = _GLF_outlined_18(_GLF_color);
                                            }
                                            _GLF_color = _GLF_IDENTITY(_GLF_outVarBackup_GLF_color, (_GLF_IDENTITY(_GLF_outVarBackup_GLF_color, vec4(_GLF_outVarBackup_GLF_color[0], _GLF_outVarBackup_GLF_color[1], _GLF_outVarBackup_GLF_color[2], _GLF_outVarBackup_GLF_color[3]))) / vec4(1.0, 1.0, 1.0, 1.0));
                                        }
                                    } else {
                                    }
                                    if (int(gl_FragCoord.y) < 140) {
                                        col = .5 + cos(c.y + vec3(resolution.x, A[39] / resolution.x + 50.0, 22.0));
                                    } else if (int(gl_FragCoord.y) < 160) {
                                        for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > (0 | 0)); _injected_loop_counter--) {
                                            if (_GLF_DEAD(false)) {
                                                _GLF_color = vec4(-75.95, -365.739, 5557.7104, -8.1);
                                            }
                                            do {
                                                if (_GLF_DEAD(false)) {
                                                    _GLF_color = ((-2.1) * vec4(-87.59, -4.2, 4.9, -88.94));
                                                }
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                    {
                                                        _injected_loop_counter = (4 * _injected_loop_counter * (1000 - _injected_loop_counter)) / 1000;
                                                    }
                                                }
                                            } while (_GLF_WRAPPED_LOOP(false));
                                        }
                                        col = .5 + cos(_GLF_IDENTITY(c.y, clamp(c.y, c.y, c.y)) + vec3(resolution.x, A[39] / _GLF_IDENTITY(resolution.x, _GLF_IDENTITY(dot(vec4(_GLF_IDENTITY(dot(vec2(0.0, 1.0), vec2(0.0, 1.0)), dot(vec2(0.0, 1.0), vec2(0.0, 1.0))), 0.0, _GLF_ZERO(0.0, injectionSwitch.x), 0.0), vec4(cos(0.0), log(1.0), 0.0, 0.0)), dot(vec4(_GLF_IDENTITY(dot(vec2(0.0, 1.0), vec2(0.0, 1.0)), dot(vec2(0.0, 1.0), vec2(0.0, 1.0))), 0.0, _GLF_ZERO(0.0, injectionSwitch.x), 0.0), vec4(cos(0.0), log(1.0), 0.0, 0.0))) * (resolution.x)) + 50.0, 22.0));
                                    } else {
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                if (int(_GLF_IDENTITY(gl_FragCoord.y, (gl_FragCoord.y) - determinant(mat4(0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 1.0, 0.0, sin(0.0), 0.0, 1.0, abs(0.0), 0.0, 0.0, 0.0)))) < 180) {
                                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                        col = .5 + cos(c.y + vec3(resolution.x, A[44] / resolution.x + 50.0, 22.0));
                                                    } else {
                                                    }
                                                    {
                                                        vec4 _GLF_outVarBackup_GLF_color;
                                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                                        _GLF_color = (vec4(-8414.3912, 128.405, -1.2, 8.1) / exp(-0.0));
                                                        if (_GLF_DEAD(false)) {
                                                            _GLF_color = vec4(-834.359, 0.4, -931.158, -6.4);
                                                        }
                                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                        }
                                                        if (_GLF_DEAD(_GLF_IDENTITY(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)), _GLF_IDENTITY(bool(bvec4(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)), true, true, true)), _GLF_IDENTITY(false || (bool(bvec4(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)), true, true, true))), (false || (bool(bvec4(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)), true, true, true)))) && true))))) {
                                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                                _GLF_color = vec4(-86.06, -57.14, -1.3, 85.30);
                                                            }
                                                            _GLF_color = _GLF_color;
                                                        }
                                                    }
                                                } else {
                                                    for (int _injected_loop_counter = (0 | 1); _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
                                                        do {
                                                            if (_GLF_DEAD(false)) {
                                                                _GLF_color = (vec4(-9.9, 5539.6424, -5602.6940, -5.1) + (-7457.5088));
                                                            }
                                                            do {
                                                                if (int(gl_FragCoord.y) < _GLF_IDENTITY(200, int(_GLF_IDENTITY(int(_GLF_IDENTITY(200, int(int(200)))), max(int(_GLF_IDENTITY(200, int(int(200)))), int(_GLF_IDENTITY(200, int(int(200))))))))) {
                                                                    {
                                                                        vec4 _GLF_outVarBackup_GLF_color;
                                                                        _GLF_outVarBackup_GLF_color = _GLF_outlined_19(_GLF_color);
                                                                        _GLF_color = _GLF_outlined_20();
                                                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                                            float donor_replacementGLF_dead4limit = _GLF_FUZZED(-86.52);
                                                                            float donor_replacementGLF_dead4ref = _GLF_FUZZED(dot(-574.923, dFdx(-3134.2490)));
                                                                            float donor_replacementGLF_dead4s = _GLF_FUZZED(min(5685.2472, 7.7));
                                                                            for (int GLF_dead4i = 1; GLF_dead4i < 800; GLF_dead4i++) {
                                                                                if (mod(float(GLF_dead4i), donor_replacementGLF_dead4ref) <= 0.01) {
                                                                                    donor_replacementGLF_dead4s += 0.2;
                                                                                }
                                                                                if (float(GLF_dead4i) >= donor_replacementGLF_dead4limit) {
                                                                                    ;
                                                                                }
                                                                            }
                                                                        }
                                                                        for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                                                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                                } else {
                                                                                }
                                                                                if (_GLF_DEAD(false)) {
                                                                                    _GLF_color = step(_GLF_color, dFdyFine(vec4(169.557, 6.2, -2.1, 3337.3845)));
                                                                                }
                                                                                if (_GLF_DEAD(false)) {
                                                                                    float donor_replacementGLF_dead2grey = _GLF_FUZZED(intBitsToFloat(-13408));
                                                                                    {
                                                                                        if (int(GLF_dead2gl_FragCoord[1]) < 120) {
                                                                                            donor_replacementGLF_dead2grey = 0.5 + float(GLF_dead2data[3]) / 10.0;
                                                                                        } else {
                                                                                            if (int(GLF_dead2gl_FragCoord[1]) < 150) {
                                                                                                discard;
                                                                                            } else {
                                                                                                if (int(GLF_dead2gl_FragCoord[1]) < 180) {
                                                                                                    donor_replacementGLF_dead2grey = 0.5 + float(GLF_dead2data[5]) / 10.0;
                                                                                                } else {
                                                                                                    if (int(GLF_dead2gl_FragCoord[1]) < 210) {
                                                                                                        donor_replacementGLF_dead2grey = 0.5 + float(GLF_dead2data[6]) / 10.0;
                                                                                                    } else {
                                                                                                        if (int(GLF_dead2gl_FragCoord[1]) < 240) {
                                                                                                            donor_replacementGLF_dead2grey = 0.5 + float(GLF_dead2data[7]) / 10.0;
                                                                                                        } else {
                                                                                                            if (int(GLF_dead2gl_FragCoord[1]) < 270) {
                                                                                                                donor_replacementGLF_dead2grey = 0.5 + float(GLF_dead2data[8]) / 10.0;
                                                                                                            } else {
                                                                                                                discard;
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
                                                                    }
                                                                    if (_GLF_DEAD(false)) {
                                                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                                            _GLF_color = _GLF_color;
                                                                        }
                                                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                            _GLF_color = _GLF_outlined_21(_GLF_color);
                                                                        } else {
                                                                        }
                                                                    }
                                                                    col = .5 + cos(c.y + vec3(resolution.x, A[49] / resolution.x + 50.0, 22.0));
                                                                } else {
                                                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                                            _GLF_color = (ivec2(55530, 50161), (vec4(5.1, 23.02, 95.32, -6444.4157)));
                                                                        }
                                                                    } else {
                                                                    }
                                                                    if (_GLF_WRAPPED_IF_FALSE(false)) {
                                                                    } else {
                                                                        if (_GLF_DEAD(_GLF_FALSE(false, (_GLF_IDENTITY(gl_FragCoord.x < 0.0, !(!(_GLF_IDENTITY(gl_FragCoord.x < 0.0, bool(bool(gl_FragCoord.x < 0.0)))))))))) {
                                                                            float donor_replacementGLF_dead1alpha3 = _GLF_FUZZED(normalize(-91.92));
                                                                            int donor_replacementGLF_dead1b = _GLF_FUZZED(_GLF_IDENTITY(findLSB(-5450), 0 | (findLSB(-5450))));
                                                                            if (_GLF_IDENTITY(_GLF_DEAD(false), bool(bvec2(_GLF_DEAD(false), true)))) {
                                                                                _GLF_color = log2(tanh(vec4(3.1, 86.92, -6458.8648, 301.792)));
                                                                            }
                                                                            vec4 donor_replacementGLF_dead1matrix_b = _GLF_FUZZED((_GLF_color * _GLF_color));
                                                                            {
                                                                                {
                                                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                                                    if (_GLF_DEAD(_GLF_IDENTITY(false, true && (false)))) {
                                                                                        _GLF_color = mat3x4(1.4, -4.0, -4.7, 7.3, 302.414, -4.3, 0.2, -938.118, 80.05, -0.4, 81.32, -4798.8539)[0];
                                                                                    }
                                                                                    _GLF_outVarBackup_GLF_color = _GLF_outlined_22(_GLF_color);
                                                                                    _GLF_color = _GLF_outlined_23();
                                                                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= length(0.0))))) {
                                                                                            if (_GLF_WRAPPED_IF_FALSE(false)) {
                                                                                            } else {
                                                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                                            }
                                                                                        }
                                                                                    } else {
                                                                                    }
                                                                                }
                                                                                donor_replacementGLF_dead1alpha3 += _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead1b, 4)] * donor_replacementGLF_dead1matrix_b[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead1b, 4)];
                                                                            }
                                                                        }
                                                                        vec4 _GLF_outVarBackup_GLF_color;
                                                                        _GLF_outVarBackup_GLF_color = _GLF_outlined_2(_GLF_color);
                                                                        _GLF_color = fma(vec4(-5318.9921, 9.6, -2.5, 6232.7235), vec4(-62.70, 1376.0212, -75.48, 1.3), vec4(49.70, 4150.1377, 933.653, -6.0));
                                                                        {
                                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                                                _GLF_color = smoothstep(vec4(-91.56, 8.9, -3.5, 7705.8149), _GLF_outVarBackup_GLF_color, vec4(-6.4, 49.43, -4273.4040, 4806.7915));
                                                                            }
                                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                                                _GLF_color = mix(vec4(9.6, 9.8, -1.0, 52.33), _GLF_color, bvec4(true, false, true, false));
                                                                            }
                                                                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > _GLF_IDENTITY(injectionSwitch.y, (_GLF_IDENTITY(injectionSwitch.y, float(mat2(injectionSwitch.y, 0.0, 1.0, 1.0)))) - 0.0))))) {
                                                                                _GLF_color = _GLF_color;
                                                                            }
                                                                            _GLF_IDENTITY(_GLF_color = vec4(-6.6, -4.1, 1.3, _GLF_IDENTITY(9.3, (9.3) / 1.0)), (_GLF_color = vec4(-6.6, -4.1, 1.3, _GLF_IDENTITY(9.3, (9.3) / 1.0))) / vec4(1.0, 1.0, 1.0, 1.0));
                                                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                                                if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(true, (true) || false))) {
                                                                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                                        if (_GLF_DEAD(_GLF_IDENTITY(false, !(!(false))))) {
                                                                                            _GLF_color = ((-5.8) * vec4(52.00, -5951.7875, 6032.2416, -20.36));
                                                                                        }
                                                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                                    }
                                                                                } else {
                                                                                }
                                                                            } else {
                                                                            }
                                                                        }
                                                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                        }
                                                                    }
                                                                    discard;
                                                                    do {
                                                                        if (_GLF_IDENTITY(_GLF_DEAD(_GLF_IDENTITY(_GLF_FALSE(false, (gl_FragCoord.x < tan(0.0))), bool(bvec2(_GLF_FALSE(false, (gl_FragCoord.x < tan(0.0))), false)))), bool(bvec2(_GLF_DEAD(_GLF_IDENTITY(_GLF_FALSE(false, (gl_FragCoord.x < tan(0.0))), bool(bvec2(_GLF_FALSE(false, (gl_FragCoord.x < tan(0.0))), false)))), false)))) {
                                                                            _GLF_color = mix(_GLF_color, vec4(4.3, -289.859, 214.571, 35.39), vec4(-9.1, -5498.5996, -608.637, -1862.0036));
                                                                        }
                                                                    } while (_GLF_WRAPPED_LOOP(false));
                                                                    if (_GLF_DEAD(false)) {
                                                                        _GLF_color = mod(vec4(4930.1892, 261.036, -5.9, -68.32), vec4(-8.5, -333.901, 2.6, -3984.1664));
                                                                    }
                                                                    if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < _GLF_IDENTITY(0.0, min(0.0, 0.0)))))) {
                                                                    } else {
                                                                        if (_GLF_DEAD(false)) {
                                                                            _GLF_color = _GLF_outlined_24();
                                                                        }
                                                                    }
                                                                }
                                                            } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
                                                        } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))));
                                                    }
                                                }
                                            } else {
                                            }
                                        } else {
                                        }
                                    }
                                }
                            }
                        }
                    } else {
                    }
                    if (_GLF_DEAD(false)) {
                        _GLF_color = vec4(8851.2010, 72.97, -1.7, -5.2);
                    }
                }
            }
            if (_GLF_DEAD(false)) {
                float donor_replacementGLF_dead3s = _GLF_FUZZED(2.5);
                {
                    ;
                }
                if (_GLF_DEAD(false)) {
                    _GLF_color = min(_GLF_color, vec4(117.935, -8.8, -5.9, 2593.3392));
                }
            }
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
            {
                _injected_loop_counter = (4 * _injected_loop_counter * (1000 - _injected_loop_counter)) / 1000;
            }
        }
    }
    _GLF_color = vec4(col, 1.0);
}
