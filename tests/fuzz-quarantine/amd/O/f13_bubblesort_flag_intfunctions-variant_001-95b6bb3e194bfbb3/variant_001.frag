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
vec4 GLF_dead10gl_FragCoord = _GLF_FUZZED(vec4(vec3(-8485.9908, -53.32, 0.8), -878.862));

layout(set = 0, binding = 2) uniform buf2 {
    vec2 GLF_dead10resolution;
};

ivec2 GLF_dead6iter(ivec2 GLF_dead6p) {
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < length(vec3(0.0, 0.0, 0.0)))))) {
        float donor_replacementGLF_dead8s = _GLF_FUZZED(-559.909);
        {
            ;
        }
    }
    if (GLF_dead6p.x > 0) {
        GLF_dead6p.y--;
    }
    if (GLF_dead6p.x < 0) {
        GLF_dead6p.y++;
    }
    for (int _injected_loop_counter = (0 & (-74605)); _GLF_WRAPPED_LOOP(_injected_loop_counter < ((1 << _GLF_IDENTITY(int(0), int(0))) >> _GLF_IDENTITY(int(0), int(0)))); _injected_loop_counter++) {
        GLF_dead6p.x += GLF_dead6p.y / 2;
    }
    return GLF_dead6p;
}

layout(set = 0, binding = 3) uniform buf3 {
    vec2 GLF_dead3injectionSwitch;
};

struct GLF_dead3QuicksortObject {
    int numbers[10];
};

GLF_dead3QuicksortObject GLF_dead3obj = GLF_dead3QuicksortObject(int[10](0, 0, 0, 0, 0, 0, 0, 0, 0, 0));

vec3 GLF_dead3palette(vec3 GLF_dead3a, vec3 GLF_dead3b, vec3 GLF_dead3c, vec3 GLF_dead3d) {
    return fract(mix(GLF_dead3d * GLF_dead3a, GLF_dead3a * GLF_dead3c, GLF_dead3b + GLF_dead3d - GLF_dead3c));
}

layout(location = 0) out vec4 _GLF_color;

layout(set = 0, binding = 0) uniform buf0 {
    vec2 injectionSwitch;
};

layout(set = 0, binding = 1) uniform buf1 {
    vec2 resolution;
};

bool checkSwap(float a, float b) {
    if (_GLF_DEAD(false)) {
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            if (_GLF_DEAD(false)) {
                _GLF_color = vec4(resolution, abs(acosh(injectionSwitch)));
            }
            {
                vec4 _GLF_outVarBackup_GLF_color;
                if (_GLF_DEAD(false)) {
                    int donor_replacementGLF_dead9v = _GLF_FUZZED(max(ivec2(-23261, 73501)[0], -94216));
                    {
                        donor_replacementGLF_dead9v = (4 * donor_replacementGLF_dead9v * (1000 - donor_replacementGLF_dead9v)) / 1000;
                    }
                }
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = fwidth(mat2x4(-844.774, -9.9, 34.15, 8452.3334, -8347.0061, -1985.1094, -86.25, -822.944)[1]);
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            _GLF_color = abs(mix(vec4(7.8, 9446.2446, 8.8, 95.24), vec4(6728.6610, -5.1, 1052.8812, 1.8), vec4(-73.02, -5.4, 21.55, -5.0)));
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= sin(0.0))))) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
        ivec2 donor_replacementGLF_dead6p = _GLF_FUZZED(ivec2(-42144, -41302));
        if (donor_replacementGLF_dead6p.x < 0) {
            do {
                donor_replacementGLF_dead6p.x = -donor_replacementGLF_dead6p.x;
            } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))));
            if (_GLF_DEAD(false)) {
                int donor_replacementGLF_dead8i = _GLF_FUZZED(-12267);
                float donor_replacementGLF_dead8limit = _GLF_FUZZED(-7156.9480);
                float donor_replacementGLF_dead8s = _GLF_FUZZED(mod(b, b));
                while (donor_replacementGLF_dead8i < bitfieldInsert(800, donor_replacementGLF_dead8i, 0, 0)) {
                    if (mod(float(donor_replacementGLF_dead8i), a) <= 0.01) {
                        donor_replacementGLF_dead8s += 0.2;
                    }
                    if (float(donor_replacementGLF_dead8i) >= donor_replacementGLF_dead8limit) {
                        ;
                    }
                    donor_replacementGLF_dead8i++;
                }
            }
        }
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
        int donor_replacementGLF_dead8i = _GLF_FUZZED(-7020);
        while (donor_replacementGLF_dead8i < bitfieldInsert(800, donor_replacementGLF_dead8i, 0, 0)) {
            if (mod(float(donor_replacementGLF_dead8i), a) <= 0.01) {
                b += 0.2;
            }
            if (float(donor_replacementGLF_dead8i) >= b) {
                ;
            }
            donor_replacementGLF_dead8i++;
        }
    }
    return gl_FragCoord.y < resolution.y / 2.0 ? a > b : a < b;
    if (_GLF_DEAD(false)) {
        int donor_replacementGLF_dead9v = _GLF_FUZZED((bvec4(false, true, true, true), -94866));
        {
            donor_replacementGLF_dead9v = (4 * donor_replacementGLF_dead9v * (1000 - donor_replacementGLF_dead9v)) / 1000;
        }
    }
    {
        vec4 _GLF_outVarBackup_GLF_color;
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
        _GLF_outVarBackup_GLF_color = _GLF_color;
        if (_GLF_WRAPPED_IF_FALSE(false)) {
        } else {
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                _GLF_color = (atanh(fwidthFine(vec4(89.71, -29.11, 7.6, 8.1))) * (-56.43));
            } else {
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                vec4 donor_replacementGLF_dead8c = _GLF_FUZZED(_GLF_outVarBackup_GLF_color);
                int donor_replacementGLF_dead8i = _GLF_FUZZED(52217);
                {
                    donor_replacementGLF_dead8c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead8i, 4)] = donor_replacementGLF_dead8c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead8i, 4)] * donor_replacementGLF_dead8c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead8i, 4)];
                }
            }
        }
        do {
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(0.4, 5.5, -53.17, -6666.5074);
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
        } while (_GLF_WRAPPED_LOOP(false));
    }
}

void main() {
    int msb10 = 1024;
    int msb9 = 512;
    uint uselessOutVariable;
    {
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        _GLF_color = vec4(-5291.1812, -4.1, -648.016, -1.2);
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                {
                    ;
                }
            }
        }
    }
    if (_GLF_WRAPPED_IF_TRUE(true)) {
        if (_GLF_DEAD(false)) {
            _GLF_color = _GLF_color;
        }
        if (_GLF_DEAD(false)) {
            float donor_replacementGLF_dead8s = _GLF_FUZZED(max(length(_GLF_color), 3.4));
            {
                ;
            }
        }
    } else {
    }
    float data[10];
    if (_GLF_DEAD(false)) {
        int donor_replacementGLF_dead4v = _GLF_FUZZED(bitfieldExtract(76553, msb10, (false ? 63689 : 90239)));
        {
            vec4 _GLF_outVarBackup_GLF_color;
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(-3.3, 5001.1939, 5.1, 762.224);
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = atanh(vec4(-32.95, -526.000, 751.272, -1458.0392));
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                    if (_GLF_DEAD(false)) {
                        for (msb9 = 0; msb9 < donor_replacementGLF_dead4v; msb9++) {
                            donor_replacementGLF_dead4v = (4 * donor_replacementGLF_dead4v * (1000 - donor_replacementGLF_dead4v)) / 1000;
                        }
                    }
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    if (_GLF_outVarBackup_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(msb10, 4)] >= 1.0) {
                        _GLF_outVarBackup_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(msb10, 4)] = _GLF_outVarBackup_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(msb10, 4)] * _GLF_outVarBackup_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(msb10, 4)];
                    }
                }
            } else {
            }
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            int donor_replacementGLF_dead8i = _GLF_FUZZED(donor_replacementGLF_dead4v);
            if (_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead8i, 4)] >= 1.0) {
                _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead8i, 4)] = _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead8i, 4)] * _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead8i, 4)];
            }
        }
        {
            donor_replacementGLF_dead4v /= 2;
        }
    }
    for (int i = bitfieldReverse(int(injectionSwitch.x)); i < findMSB(msb10); i++) {
        data[i] = float(usubBorrow(uint(10), uint(i), uselessOutVariable)) * injectionSwitch.y;
        {
            vec4 _GLF_outVarBackup_GLF_color;
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                vec2 donor_replacementGLF_dead9a = _GLF_FUZZED(GLF_dead3injectionSwitch);
                float donor_replacementGLF_dead9th = _GLF_FUZZED(3.3);
                if (donor_replacementGLF_dead9a.y < donor_replacementGLF_dead9a.x) {
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        donor_replacementGLF_dead9th = 0.5 - donor_replacementGLF_dead9th;
                    } else {
                        if (_GLF_DEAD(false)) {
                            int donor_replacementGLF_dead7j = _GLF_FUZZED(msb9);
                            if (uint(donor_replacementGLF_dead7j) < uaddCarry(uint(msb10), 1u, uselessOutVariable)) {
                                continue;
                            }
                        }
                    }
                }
            }
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                _GLF_outVarBackup_GLF_color = _GLF_color;
            } else {
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = dFdx(vec4(-7.4, -9.8, 978.108, -50.81));
                    if (_GLF_DEAD(false)) {
                        if (_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(msb10, 4)] >= 1.0) {
                            _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(msb10, 4)] = _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(msb10, 4)] * _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(msb10, 4)];
                        }
                    }
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < length(0.0))))) {
                do {
                    if (_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(msb9, 4)] >= 1.0) {
                        _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(msb9, 4)] = _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(msb9, 4)] * _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(msb9, 4)];
                    }
                    msb9++;
                } while (msb9 < findMSB(findLSB(msb9)));
            }
            _GLF_color = vec4(5237.6131, 45.86, 3116.1609, 6831.5234);
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(-721.805, -9.2, 6.7, 5770.0653);
                if (_GLF_DEAD(false)) {
                    {
                        continue;
                    }
                }
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(2.9, 0.9, -3.5, 255.772);
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                int donor_replacementGLF_dead9iters = _GLF_FUZZED(ivec4(75124, 80, 23224, 79577)[1]);
                                for (msb10 = 0; msb10 < donor_replacementGLF_dead9iters; msb10++) {
                                    msb10 = (4 * msb10 * (1000 - msb10)) / 1000;
                                }
                            }
                        }
                    }
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(-5.9, -5421.3945, 7.2, 92.37);
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            int donor_replacementGLF_dead9v = _GLF_FUZZED(i);
                            {
                                donor_replacementGLF_dead9v = (4 * donor_replacementGLF_dead9v * (1000 - donor_replacementGLF_dead9v)) / 1000;
                            }
                        }
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = (-53.47, vec4(85.17, 22.47, -854.367, 91.72));
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    int donor_replacementGLF_dead9v = _GLF_FUZZED(-52900);
                                    {
                                        donor_replacementGLF_dead9v = (4 * donor_replacementGLF_dead9v * (1000 - donor_replacementGLF_dead9v)) / 1000;
                                    }
                                }
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
            if (_GLF_DEAD(false)) {
                int donor_replacementGLF_dead8j = _GLF_FUZZED(i);
                {
                    i = donor_replacementGLF_dead8j;
                    if (_GLF_DEAD(false)) {
                        if (uint(msb9) < uaddCarry(uint(msb10), 1u, uselessOutVariable)) {
                            continue;
                        }
                    }
                }
            }
        }
        if (_GLF_DEAD(false)) {
            _GLF_color = normalize(_GLF_color);
        }
    }
    {
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        _GLF_color = vec4(45.26, -3221.6441, 7.2, 93.90);
        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
    }
    if (_GLF_DEAD(_GLF_IDENTITY(false, false || (false)))) {
        float donor_replacementGLF_dead8s = _GLF_FUZZED(mod(5.3, resolution.g));
        {
            donor_replacementGLF_dead8s += 0.2;
        }
    }
    if (_GLF_DEAD(false)) {
        {
            vec4 _GLF_outVarBackup_GLF_color;
            {
                if (_GLF_DEAD(false)) {
                    if (_GLF_outVarBackup_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(msb10, 4)] >= 1.0) {
                        _GLF_outVarBackup_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(msb10, 4)] = _GLF_outVarBackup_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(msb10, 4)] * _GLF_outVarBackup_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(msb10, 4)];
                    }
                }
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(9.8, 3418.7293, -9.1, -2.8);
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = vec4(959.629, -44.43, 5.0, -789.555);
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    int donor_replacementGLF_dead9v = _GLF_FUZZED(41829);
                    {
                        donor_replacementGLF_dead9v = (4 * donor_replacementGLF_dead9v * (1000 - donor_replacementGLF_dead9v)) / 1000;
                    }
                }
            }
        }
        {
            for (int _injected_loop_counter = (1 | 1); _GLF_WRAPPED_LOOP(_injected_loop_counter != int(_GLF_ZERO(0.0, injectionSwitch.x))); _injected_loop_counter--) {
                _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(msb10, 4)] = _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(msb10, 4)] * _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(msb10, 4)];
            }
        }
    }
    if (_GLF_DEAD(false)) {
        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                _GLF_color = vec4(549.728, 9.5, 9.9, 50.17);
                if (_GLF_DEAD(false)) {
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(0.6, -3.2, 21.76, -93.49);
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    _GLF_color = vec4(7.7, -55.85, -8.2, 4.5);
                }
            } else {
            }
        } else {
        }
        if (_GLF_WRAPPED_IF_FALSE(false)) {
        } else {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = vec4(-6.4, -4.3, 4.3, 88.76);
            do {
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            } while (_GLF_WRAPPED_LOOP(false));
        }
    }
    if (_GLF_DEAD(false)) {
        {
            msb10 = (4 * msb10 * (1000 - msb10)) / 1000;
        }
    }
    if (_GLF_DEAD(false)) {
        {
            vec4 _GLF_outVarBackup_GLF_color;
            if (_GLF_WRAPPED_IF_FALSE(false)) {
            } else {
                _GLF_outVarBackup_GLF_color = _GLF_color;
            }
            if (_GLF_WRAPPED_IF_FALSE(false)) {
            } else {
                _GLF_color = vec4(566.807, 4797.9255, -2473.6353, 34.25);
            }
            do {
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        int donor_replacementGLF_dead9v = _GLF_FUZZED(findMSB(int(-9766.2178)));
                        for (msb9 = 0; msb9 < msb9; msb9++) {
                            donor_replacementGLF_dead9v = (4 * donor_replacementGLF_dead9v * (1000 - donor_replacementGLF_dead9v)) / 1000;
                        }
                    }
                }
            } while (_GLF_WRAPPED_LOOP(false));
            if (_GLF_DEAD(false)) {
                _GLF_color = _GLF_color;
                if (_GLF_DEAD(false)) {
                    int donor_replacementGLF_dead9i = _GLF_FUZZED((true ? msb10 : (msb10)));
                    int donor_replacementGLF_dead9v = _GLF_FUZZED(floatBitsToInt(distance(_GLF_outVarBackup_GLF_color, _GLF_color)));
                    for (donor_replacementGLF_dead9i = 0; donor_replacementGLF_dead9i < msb9; donor_replacementGLF_dead9i++) {
                        donor_replacementGLF_dead9v = (4 * donor_replacementGLF_dead9v * (1000 - donor_replacementGLF_dead9v)) / 1000;
                    }
                }
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = tan(vec4(-118.705, 3.4, 57.35, -2.5));
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
            }
        }
        ivec2 donor_replacementGLF_dead6p = _GLF_FUZZED(ivec2(34483, -86646));
        do {
            donor_replacementGLF_dead6p.y--;
        } while (_GLF_WRAPPED_LOOP(false));
    }
    if (_GLF_DEAD(false)) {
        {
            msb10 = (4 * msb10 * (1000 - msb10)) / 1000;
        }
    }
    {
        vec4 _GLF_outVarBackup_GLF_color;
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            do {
                if (_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(msb9, 4)] >= 1.0) {
                    _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(msb9, 4)] = _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(msb9, 4)] * _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(msb9, 4)];
                }
                msb9++;
            } while (msb9 < findMSB(findLSB(msb9)));
        }
        _GLF_outVarBackup_GLF_color = _GLF_color;
        _GLF_color = sin(step(4866.2397, vec4(-27.52, -481.369, -29.73, -5450.8395)));
        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
        float donor_replacementGLF_dead0th = _GLF_FUZZED(inversesqrt(-974.799));
        for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > int(_GLF_ZERO(0.0, injectionSwitch.x))); _injected_loop_counter--) {
            donor_replacementGLF_dead0th = 1.0 - donor_replacementGLF_dead0th;
            if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            } else {
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    {
                        break;
                    }
                }
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = (22.16 + vec4(-4.2, 2.1, 7.8, 218.147));
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    } else {
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < tan(0.0))))) {
                            {
                                donor_replacementGLF_dead0th += 0.2;
                            }
                        }
                    }
                }
            }
        }
    }
    for (int _injected_loop_counter = int(_GLF_ZERO(0.0, injectionSwitch.x)); _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            if (_GLF_DEAD(false)) {
                {
                    if (_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(msb9, 4)] >= 1.0) {
                        _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(msb9, 4)] = _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(msb9, 4)] * _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(msb9, 4)];
                    }
                    msb9++;
                }
            }
            if (_GLF_DEAD(false)) {
                ivec2 donor_replacementGLF_dead6p = _GLF_FUZZED((uselessOutVariable, mix(ivec2(-82869, -76682), ivec2(93113, 28271), bvec2(false, false))));
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = atan(vec4(-5924.3702, 8715.7235, 55.36, -8.0), vec4(15.43, 9.0, -2.9, -1422.8159));
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(true, (true) && true))) {
                        if (_GLF_DEAD(false)) {
                            if (msb9 < int(GLF_dead10gl_FragCoord.x)) {
                                break;
                            }
                        }
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                while (donor_replacementGLF_dead6p.x > 15) {
                    donor_replacementGLF_dead6p.x -= 16;
                }
            }
            if (_GLF_WRAPPED_IF_FALSE(false)) {
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        {
                            msb9 = (4 * msb9 * (1000 - msb9)) / 1000;
                        }
                    }
                    _GLF_color = vec2(-689.384, -3004.8360).stst;
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                        if (_GLF_DEAD(false)) {
                            {
                                _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(msb10, 4)] = _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(msb10, 4)] * _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(msb10, 4)];
                            }
                        }
                    }
                }
            } else {
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    for (msb9 = 0; msb9 < _injected_loop_counter; msb9++) {
                        msb10 = (4 * msb10 * (1000 - msb10)) / 1000;
                    }
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    _GLF_color = _GLF_color;
                }
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    if (_GLF_DEAD(false)) {
                        {
                            _GLF_outVarBackup_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(msb9, 4)] = _GLF_outVarBackup_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(msb9, 4)] * _GLF_outVarBackup_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(msb9, 4)];
                        }
                    }
                    _GLF_color = vec4(-219.034, -39.59, -43.24, 2.9);
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
            }
            int donor_replacementGLF_dead6i = _GLF_FUZZED(msb10);
            int donor_replacementGLF_dead6v = _GLF_FUZZED(msb9);
            if (_GLF_DEAD(false)) {
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    float donor_replacementGLF_dead8s = _GLF_FUZZED(-520.866);
                    {
                        ;
                    }
                }
                ivec2 donor_replacementGLF_dead6p = _GLF_FUZZED(bitCount(ivec2(57091, -44574)));
                {
                    donor_replacementGLF_dead6p = GLF_dead6iter(donor_replacementGLF_dead6p);
                }
            }
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = dFdxCoarse(vec4(393.265, -444.884, 3.5, -0.8));
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        int donor_replacementGLF_dead8msb8 = _GLF_FUZZED(donor_replacementGLF_dead6v);
                        do {
                            if (_GLF_outVarBackup_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead6i, 4)] >= 1.0) {
                                _GLF_outVarBackup_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead6i, 4)] = _GLF_outVarBackup_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead6i, 4)] * _GLF_outVarBackup_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead6i, 4)];
                            }
                            donor_replacementGLF_dead6i++;
                        } while (donor_replacementGLF_dead6i < findMSB(findLSB(donor_replacementGLF_dead8msb8)));
                    }
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            for (donor_replacementGLF_dead6i = 0; donor_replacementGLF_dead6i < msb10; donor_replacementGLF_dead6i++) {
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = vec4(7550.4124, 4433.2599, 750.460, 8.7);
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                int donor_replacementGLF_dead9v = _GLF_FUZZED(donor_replacementGLF_dead6v);
                                {
                                    donor_replacementGLF_dead9v = (4 * donor_replacementGLF_dead9v * (1000 - donor_replacementGLF_dead9v)) / 1000;
                                }
                            }
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                        do {
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                        } while (_GLF_WRAPPED_LOOP(false));
                        for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < (((1 << _GLF_IDENTITY(int(4), int(4))) >> _GLF_IDENTITY(int(4), int(4))) & 1)); _injected_loop_counter++) {
                            _GLF_color = (vec4(-66.83, -54.11, 4955.0587, 6.7) - unpackUnorm4x8(81746u));
                        }
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                _GLF_color = mod(_GLF_color, _GLF_outVarBackup_GLF_color);
                            }
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        _GLF_color = (-vec4(-2.8, 18.37, -8.3, 36.69));
                    }
                    float donor_replacementGLF_dead9th = _GLF_FUZZED(smoothstep(6474.8926, 7.0, 213.322));
                    {
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            if (_GLF_DEAD(false)) {
                                for (msb9 = 0; msb9 < donor_replacementGLF_dead6i; msb9++) {
                                    msb9 = (4 * msb9 * (1000 - msb9)) / 1000;
                                }
                            }
                            _GLF_color = vec3(-37.49, -0.4, -2946.9748).zzzx;
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                if (donor_replacementGLF_dead6i >= int(GLF_dead10resolution.x)) {
                                    break;
                                }
                            }
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                        if (_GLF_DEAD(false)) {
                            int donor_replacementGLF_dead8i = _GLF_FUZZED(min(msb9, msb10));
                            {
                                _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead8i, 4)] = _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead8i, 4)] * _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead8i, 4)];
                            }
                        }
                        {
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                {
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                        {
                                            _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(msb10, 4)] = _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(msb10, 4)] * _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(msb10, 4)];
                                        }
                                    }
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = (-vec2(-9034.7680, 9014.6886).xxxy);
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                                if (_GLF_DEAD(false)) {
                                    int donor_replacementGLF_dead9iters = _GLF_FUZZED((donor_replacementGLF_dead6i * donor_replacementGLF_dead6v));
                                    int donor_replacementGLF_dead9v = _GLF_FUZZED(((-85556) | _injected_loop_counter));
                                    for (donor_replacementGLF_dead6i = 0; donor_replacementGLF_dead6i < donor_replacementGLF_dead9iters; donor_replacementGLF_dead6i++) {
                                        donor_replacementGLF_dead9v = (4 * donor_replacementGLF_dead9v * (1000 - donor_replacementGLF_dead9v)) / 1000;
                                    }
                                }
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        _GLF_color = vec4(9.4, 574.269, 2.6, 6212.5751);
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                    }
                                    _GLF_color = vec4(2.9, -6.6, 5.5, -2.0);
                                }
                            } else {
                                if (_GLF_DEAD(false)) {
                                    float donor_replacementGLF_dead8limit = _GLF_FUZZED(dFdxFine(-6.1));
                                    float donor_replacementGLF_dead8s = _GLF_FUZZED(donor_replacementGLF_dead9th);
                                    if (float(donor_replacementGLF_dead6i) >= donor_replacementGLF_dead8limit) {
                                        ;
                                    }
                                }
                            }
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = vec4(-7655.7804, 971.735, 4425.9260, 853.336);
                            if (_GLF_WRAPPED_IF_FALSE(false)) {
                            } else {
                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= sin(0.0))))) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = (mat3x4(-6229.2843, -6.6, -325.283, -410.230, -2697.3086, 8045.1963, 31.87, -94.42, -8.7, -2.8, -438.817, -5301.3875) * vec3(-0.7, 3.2, 86.70));
                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                            }
                        }
                        if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = vec4(-860.618, -8544.8461, -67.63, -6.1);
                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                        } else {
                            donor_replacementGLF_dead9th = 0.5 - donor_replacementGLF_dead9th;
                        }
                    }
                }
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = max(vec4(4150.4168, 3.2, 0.2, 687.797), round(91.45));
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < log(exp(0.0)))))) {
                            vec4 donor_replacementGLF_dead8c = _GLF_FUZZED(clamp(_GLF_outVarBackup_GLF_color, -69.98, -9932.6647));
                            if (donor_replacementGLF_dead8c[_GLF_MAKE_IN_BOUNDS_INT(msb10, 4)] >= 1.0) {
                                donor_replacementGLF_dead8c[_GLF_MAKE_IN_BOUNDS_INT(msb10, 4)] = donor_replacementGLF_dead8c[_GLF_MAKE_IN_BOUNDS_INT(msb10, 4)] * donor_replacementGLF_dead8c[_GLF_MAKE_IN_BOUNDS_INT(msb10, 4)];
                            }
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        uint donor_replacementGLF_dead7uselessOutVariable = _GLF_FUZZED(175865u);
                        if (uint(msb9) < uaddCarry(uint(msb9), 1u, donor_replacementGLF_dead7uselessOutVariable)) {
                            continue;
                        }
                    }
                }
                {
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        if (uint(msb9) < uaddCarry(uint(_injected_loop_counter), 1u, uselessOutVariable)) {
                            continue;
                        }
                    }
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        float donor_replacementGLF_dead8s = _GLF_FUZZED(refract(_GLF_color.t, -7.7, 28.80));
                        {
                            donor_replacementGLF_dead8s += 0.2;
                        }
                    }
                    _GLF_color = vec4(-337.181, vec2(7152.3422, -794.639), -99.64);
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= _GLF_ZERO(0.0, injectionSwitch.x))))) {
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = vec4(55.74, -26.19, -6.0, -5810.6308);
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        int donor_replacementGLF_dead8i = _GLF_FUZZED((~msb10));
                        float donor_replacementGLF_dead8limit = _GLF_FUZZED(length(-18.84));
                        float donor_replacementGLF_dead8s = _GLF_FUZZED(cosh(tan(35.51)));
                        if (float(donor_replacementGLF_dead8i) >= donor_replacementGLF_dead8limit) {
                            ;
                        }
                    }
                }
                do {
                    donor_replacementGLF_dead6v = (4 * donor_replacementGLF_dead6v * (1000 - donor_replacementGLF_dead6v)) / 1000;
                } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))));
                if (_GLF_DEAD(false)) {
                    for (msb9 = 0; msb9 < _injected_loop_counter; msb9++) {
                        donor_replacementGLF_dead6i = (4 * donor_replacementGLF_dead6i * (1000 - donor_replacementGLF_dead6i)) / 1000;
                    }
                }
            }
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    int donor_replacementGLF_dead9v = _GLF_FUZZED(donor_replacementGLF_dead6v);
                    {
                        donor_replacementGLF_dead9v = (4 * donor_replacementGLF_dead9v * (1000 - donor_replacementGLF_dead9v)) / 1000;
                    }
                }
                _GLF_color = smoothstep(9.7, 65.84, vec4(121.762, -97.10, -7.9, 5.7));
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
        }
    }
    {
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            {
                msb9 = (4 * msb9 * (1000 - msb9)) / 1000;
            }
        }
        for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != (int(_GLF_ZERO(0.0, injectionSwitch.x)) << _GLF_IDENTITY(int(2), int(2)))); _injected_loop_counter--) {
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                vec2 donor_replacementGLF_dead7a = _GLF_FUZZED(dFdx(vec2(-9.7, 72.69).ts));
                float donor_replacementGLF_dead7z = _GLF_FUZZED(((mix(8413.4902, 8.4, false) != 374.344) ? float(false) : ((-3.5) + (-7.7))));
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < _GLF_ZERO(0.0, injectionSwitch.x))))) {
                    ivec2 donor_replacementGLF_dead6p = _GLF_FUZZED(min(ivec2(66648, -57533), ivec2(69130, -54064)));
                    {
                        {
                            if (_GLF_DEAD(false)) {
                                if (uint(msb10) < uaddCarry(uint(msb10), 1u, uselessOutVariable)) {
                                    continue;
                                }
                            }
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = reflect(vec4(-65.99, 3206.5662, -876.745, -3.8), exp2((vec4(-97.03, 3900.7522, -98.81, 6115.4271) + (-68.91))));
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                            if (_GLF_DEAD(_GLF_IDENTITY(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)), (_GLF_FALSE(false, (gl_FragCoord.x < 0.0))) || false))) {
                                {
                                    if (_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(msb10, 4)] >= 1.0) {
                                        _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(msb10, 4)] = _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(msb10, 4)] * _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(msb10, 4)];
                                    }
                                    msb10++;
                                }
                            }
                        }
                        donor_replacementGLF_dead6p = GLF_dead6iter(donor_replacementGLF_dead6p);
                    }
                }
                if (donor_replacementGLF_dead7a.y > donor_replacementGLF_dead7a.x) {
                    donor_replacementGLF_dead7z = donor_replacementGLF_dead7a.x / donor_replacementGLF_dead7a.y;
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(464.814, -0.0, 1167.2521, 212.276);
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= _GLF_ZERO(0.0, injectionSwitch.x))))) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        float donor_replacementGLF_dead9th = _GLF_FUZZED(vec2(7876.7133, -1.6)[0]);
                        if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < length(0.0))))) {
                        } else {
                            if (_GLF_DEAD(false)) {
                                float donor_replacementGLF_dead8limit = _GLF_FUZZED(dFdyCoarse(85.46));
                                float donor_replacementGLF_dead8s = _GLF_FUZZED((-(-500.581)));
                                if (float(_injected_loop_counter) >= donor_replacementGLF_dead8limit) {
                                    ;
                                }
                            }
                            donor_replacementGLF_dead9th = 0.5 - donor_replacementGLF_dead9th;
                            if (_GLF_DEAD(false)) {
                                int donor_replacementGLF_dead7j = _GLF_FUZZED(msb9);
                                if (uint(donor_replacementGLF_dead7j) < uaddCarry(uint(_injected_loop_counter), 1u, uselessOutVariable)) {
                                    continue;
                                }
                            }
                        }
                    }
                } else {
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            ivec2 donor_replacementGLF_dead6p = _GLF_FUZZED(ivec2(7099, 21352));
                            for (msb9 = 0; msb9 < 100; msb9++) {
                                do {
                                    if (_GLF_DEAD(false)) {
                                        {
                                            msb10 = (4 * msb10 * (1000 - msb10)) / 1000;
                                        }
                                    }
                                    donor_replacementGLF_dead6p = GLF_dead6iter(donor_replacementGLF_dead6p);
                                } while (_GLF_WRAPPED_LOOP(false));
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                int donor_replacementGLF_dead8i = _GLF_FUZZED(bitCount(uselessOutVariable));
                                {
                                    if (_GLF_outVarBackup_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead8i, 4)] >= 1.0) {
                                        _GLF_outVarBackup_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead8i, 4)] = _GLF_outVarBackup_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead8i, 4)] * _GLF_outVarBackup_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead8i, 4)];
                                    }
                                    donor_replacementGLF_dead8i++;
                                }
                            }
                        }
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = clamp(vec4(vec2(-200.179, -55.55), round(vec2(-7518.6236, 499.970))), -1.9, dFdy(84.02));
                        if (_GLF_DEAD(false)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                        for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
                            if (_GLF_DEAD(false)) {
                                ivec2 donor_replacementGLF_dead6p = _GLF_FUZZED((ivec2(-76960, -69776) | ivec2(64972, -35652)));
                                {
                                    donor_replacementGLF_dead6p.y--;
                                }
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = vec4(2.5, 9.9, -7.5, -4543.8537);
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        do {
                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                }
                                            } else {
                                            }
                                        } while (_GLF_WRAPPED_LOOP(false));
                                    } else {
                                    }
                                }
                                if (_GLF_DEAD(false)) {
                                    int donor_replacementGLF_dead9i = _GLF_FUZZED(msb9);
                                    for (donor_replacementGLF_dead9i = 0; donor_replacementGLF_dead9i < _injected_loop_counter; donor_replacementGLF_dead9i++) {
                                        _injected_loop_counter = (4 * _injected_loop_counter * (1000 - _injected_loop_counter)) / 1000;
                                    }
                                }
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = dFdxFine(vec4(-4.2, 5.4, 54.56, -139.972));
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < abs(0.0))))) {
                                            {
                                                donor_replacementGLF_dead7z += 0.2;
                                            }
                                        }
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                            }
                        }
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= sin(sin(0.0)))))) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < sqrt(0.0))))) {
                                    {
                                        if (mod(float(_injected_loop_counter), donor_replacementGLF_dead7z) <= 0.01) {
                                            donor_replacementGLF_dead7z += 0.2;
                                        }
                                        if (float(_injected_loop_counter) >= donor_replacementGLF_dead7z) {
                                            ;
                                        }
                                        _injected_loop_counter++;
                                    }
                                }
                            } else {
                            }
                            if (_GLF_DEAD(false)) {
                                int donor_replacementGLF_dead8i = _GLF_FUZZED((87475 + msb9));
                                float donor_replacementGLF_dead8limit = _GLF_FUZZED(donor_replacementGLF_dead7z);
                                while (donor_replacementGLF_dead8i < bitfieldInsert(800, donor_replacementGLF_dead8i, 0, 0)) {
                                    if (mod(float(donor_replacementGLF_dead8i), donor_replacementGLF_dead7z) <= 0.01) {
                                        donor_replacementGLF_dead7z += 0.2;
                                    }
                                    if (float(donor_replacementGLF_dead8i) >= donor_replacementGLF_dead8limit) {
                                        ;
                                    }
                                    donor_replacementGLF_dead8i++;
                                }
                            }
                            if (_GLF_DEAD(false)) {
                                ivec2 donor_replacementGLF_dead6p = _GLF_FUZZED((ivec2(-17270, -23409) * msb9));
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    if (_GLF_DEAD(false)) {
                                        {
                                            msb9 = (4 * msb9 * (1000 - msb9)) / 1000;
                                        }
                                    }
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = vec4(-6515.5607, -575.241, 878.035, 1998.2853);
                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                        if (_GLF_DEAD(false)) {
                                            float donor_replacementGLF_dead8s = _GLF_FUZZED(donor_replacementGLF_dead7z);
                                            while (msb9 < bitfieldInsert(800, msb9, 0, 0)) {
                                                if (mod(float(msb9), donor_replacementGLF_dead7z) <= 0.01) {
                                                    donor_replacementGLF_dead8s += 0.2;
                                                }
                                                if (float(msb9) >= donor_replacementGLF_dead7z) {
                                                    ;
                                                }
                                                msb9++;
                                            }
                                        }
                                        {
                                            vec4 _GLF_outVarBackup_GLF_color;
                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                            _GLF_color = vec4(-601.257, -5976.3757, -1.1, -6385.6446);
                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                            }
                                        }
                                    }
                                }
                                {
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        _GLF_color = vec4(6.8, -4.1, -8909.7227, -288.527);
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            if (_GLF_DEAD(false)) {
                                                {
                                                    ;
                                                }
                                            }
                                            if (_GLF_DEAD(false)) {
                                                _GLF_color = injectionSwitch.sttt;
                                            }
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                    }
                                    donor_replacementGLF_dead6p = GLF_dead6iter(donor_replacementGLF_dead6p);
                                }
                            }
                        }
                    }
                    donor_replacementGLF_dead7z = donor_replacementGLF_dead7a.y / donor_replacementGLF_dead7a.x;
                }
                if (_GLF_DEAD(false)) {
                    if (msb9 < int(GLF_dead10gl_FragCoord.x)) {
                        break;
                    }
                }
                if (_GLF_DEAD(false)) {
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                        } else {
                        }
                        _GLF_color = vec4(40.99, 307.019, 8346.5298, -3765.7353);
                        for (int _injected_loop_counter = ((1 << _GLF_IDENTITY(int(4), int(4))) >> _GLF_IDENTITY(int(4), int(4))); _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(_GLF_TRUE(true, (gl_FragCoord.y >= _GLF_ZERO(0.0, injectionSwitch.x))), (_GLF_IDENTITY(_GLF_TRUE(true, (gl_FragCoord.y >= _GLF_ZERO(0.0, injectionSwitch.x))), (_GLF_TRUE(true, (gl_FragCoord.y >= _GLF_ZERO(0.0, injectionSwitch.x)))) && true)) || false))) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                    }
                    ivec2 donor_replacementGLF_dead6p = _GLF_FUZZED(ivec2(-70657, 80669));
                    {
                        do {
                            donor_replacementGLF_dead6p.y++;
                        } while (_GLF_WRAPPED_LOOP(false));
                    }
                }
            }
        }
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        if (_GLF_WRAPPED_IF_FALSE(false)) {
        } else {
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = (vec4(-856.699, 31.02, 97.22, -607.839) - 263.662);
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            _GLF_color = vec4(vec2(89.20, -0.8), radians(-9073.0496), -44.37);
        }
        do {
            if (_GLF_DEAD(false)) {
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    if (_GLF_DEAD(false)) {
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                _GLF_color = (faceforward(vec4(-2.5, -0.1, 2.9, 93.94), vec4(-8180.7089, -945.503, -5.9, 4864.3752), vec4(3.4, -40.52, -25.77, -99.23)) / fma(3211.5715, 175.197, 32.69));
                            } else {
                            }
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                        ivec2 donor_replacementGLF_dead6p = _GLF_FUZZED(floatBitsToInt(resolution));
                        if (_GLF_DEAD(false)) {
                            do {
                                if (_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(msb10, 4)] >= 1.0) {
                                    _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(msb10, 4)] = _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(msb10, 4)] * _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(msb10, 4)];
                                }
                                msb10++;
                            } while (msb10 < findMSB(findLSB(msb10)));
                        }
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            if (_GLF_WRAPPED_IF_FALSE(false)) {
                            } else {
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = (false ? vec4(-682.114, -46.75, 9028.1302, 47.34) : vec4(fwidthCoarse(1.3), pow(7.4, 6282.5970), -6.0, 26.88));
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                            }
                            _GLF_color = vec4(3.1, -7.9, -37.39, -1.1);
                            if (_GLF_DEAD(false)) {
                                {
                                    msb9 = (4 * msb9 * (1000 - msb9)) / 1000;
                                }
                            }
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= _GLF_ZERO(0.0, injectionSwitch.x))))) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                            if (_GLF_DEAD(false)) {
                                _GLF_color = acosh(GLF_dead3injectionSwitch.ssss);
                            }
                        }
                        {
                            donor_replacementGLF_dead6p.y++;
                        }
                    }
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    do {
                        _GLF_color = vec4(-939.467, -7021.6659, 9.1, 7.7);
                    } while (_GLF_WRAPPED_LOOP(false));
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = (mat4(-3.7, -30.71, 6.1, -4.2, 140.354, -9.7, 674.628, 821.560, 5.3, -48.02, -70.70, -537.660, 99.42, -567.850, 58.84, -119.787) + (-613.482))[1];
                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    } else {
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        {
                            discard;
                        }
                    }
                }
                vec2 donor_replacementGLF_dead1v = _GLF_FUZZED(vec2(430.660));
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(66.90, 2.4, -8.3, 92.30);
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                            float donor_replacementGLF_dead8s = _GLF_FUZZED(float(msb9));
                            {
                                ;
                            }
                        }
                    }
                }
                if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                } else {
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(4.0, 9.7, -9.9, -4.9);
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    if (length(donor_replacementGLF_dead1v) < 0.001) {
                        ;
                        if (_GLF_DEAD(false)) {
                            float donor_replacementGLF_dead9th = _GLF_FUZZED(ceil(0.2));
                            if (_GLF_DEAD(false)) {
                                if (msb9 < int(GLF_dead10gl_FragCoord.x)) {
                                    break;
                                }
                            }
                            if (_GLF_WRAPPED_IF_FALSE(false)) {
                            } else {
                                donor_replacementGLF_dead9th = -donor_replacementGLF_dead9th;
                            }
                        }
                        do {
                            if (_GLF_DEAD(false)) {
                                int donor_replacementGLF_dead4v = _GLF_FUZZED((~msb9));
                                do {
                                    if (_GLF_WRAPPED_IF_FALSE(false)) {
                                    } else {
                                        if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                        } else {
                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                    ivec2 donor_replacementGLF_dead6p = _GLF_FUZZED(ivec2(78644, -1444));
                                                    {
                                                        donor_replacementGLF_dead6p.x = -donor_replacementGLF_dead6p.x;
                                                    }
                                                }
                                            } else {
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                    {
                                                        msb9 = (4 * msb9 * (1000 - msb9)) / 1000;
                                                    }
                                                }
                                            }
                                            if ((donor_replacementGLF_dead4v & 1) == 1) {
                                                donor_replacementGLF_dead4v = 3 * donor_replacementGLF_dead4v + 1;
                                                {
                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                    _GLF_color = (sin(vec4(1.1, 5016.9878, -350.273, -3.5)) * (mat2x4(-0.0, 6.0, -46.42, -3.9, 681.881, -7.7, -14.74, 437.665) * outerProduct(vec2(24.03, 863.604), vec4(-132.681, 686.546, -498.224, 444.938))));
                                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                    }
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < determinant(mat2(0.0, 0.0, _GLF_IDENTITY(dot(vec4(0.0, 1.0, 1.0, 0.0), vec4(1.0, 0.0, 0.0, 1.0)), dot(vec4(0.0, 1.0, 1.0, 0.0), vec4(1.0, 0.0, 0.0, 1.0))), 0.0)))))) {
                                                        {
                                                            donor_replacementGLF_dead4v = (4 * donor_replacementGLF_dead4v * (1000 - donor_replacementGLF_dead4v)) / 1000;
                                                        }
                                                    }
                                                }
                                                {
                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                    _GLF_color = vec4(-1133.8616, -2.5, -3.2, 30.40);
                                                    if (_GLF_DEAD(false)) {
                                                        vec2 donor_replacementGLF_dead9a = _GLF_FUZZED(injectionSwitch);
                                                        {
                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                            _GLF_color = exp(vec4(7.0, -4.1, -6354.6230, -78.70));
                                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                            }
                                                        }
                                                        float donor_replacementGLF_dead9th = _GLF_FUZZED(-13.32);
                                                        if (donor_replacementGLF_dead9a.y < donor_replacementGLF_dead9a.x) {
                                                            donor_replacementGLF_dead9th = 0.5 - donor_replacementGLF_dead9th;
                                                        }
                                                    }
                                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= abs(0.0))))) {
                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                    }
                                                }
                                                {
                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                    _GLF_color = fma(sin(vec4(-396.419, 23.44, -84.16, -6.8)), vec4(7.9, -7790.6532, 211.085, -1.9), vec4(6161.0039, -959.423, -4.9, 72.67));
                                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(_GLF_TRUE(true, (gl_FragCoord.x >= _GLF_IDENTITY(dot(vec4(1.0, 0.0, 1.0, 1.0), vec4(0.0, 1.0, 0.0, 0.0)), dot(vec4(1.0, 0.0, 1.0, 1.0), vec4(0.0, 1.0, 0.0, 0.0))))), (_GLF_TRUE(true, (gl_FragCoord.x >= _GLF_IDENTITY(dot(vec4(1.0, 0.0, 1.0, 1.0), vec4(0.0, 1.0, 0.0, 0.0)), dot(vec4(1.0, 0.0, 1.0, 1.0), vec4(0.0, 1.0, 0.0, 0.0)))))) && _GLF_TRUE(true, (gl_FragCoord.y >= 0.0))))) {
                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                        {
                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                            _GLF_color = vec4(-7011.5988, -716.398, 7.3, 1440.3847);
                                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                            }
                                                        }
                                                    }
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                        int donor_replacementGLF_dead9i = _GLF_FUZZED(msb9);
                                                        for (donor_replacementGLF_dead9i = 0; donor_replacementGLF_dead9i < msb10; donor_replacementGLF_dead9i++) {
                                                            msb10 = (4 * msb10 * (1000 - msb10)) / 1000;
                                                        }
                                                    }
                                                }
                                            } else {
                                                for (int _injected_loop_counter = (((1 | 0) << _GLF_IDENTITY(int(7), _GLF_IDENTITY(int(7), (false ? _GLF_FUZZED(msb10) : int(7))))) >> _GLF_IDENTITY(int(7), _GLF_IDENTITY(int(7), ~(~(int(7)))))); _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
                                                    donor_replacementGLF_dead4v /= 2;
                                                    {
                                                        vec4 _GLF_outVarBackup_GLF_color;
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                            for (donor_replacementGLF_dead4v = 0; donor_replacementGLF_dead4v < _injected_loop_counter; donor_replacementGLF_dead4v++) {
                                                                donor_replacementGLF_dead4v = (4 * donor_replacementGLF_dead4v * (1000 - donor_replacementGLF_dead4v)) / 1000;
                                                            }
                                                        }
                                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                                        _GLF_color = mix(vec4(8.1, 89.93, -2880.9765, -45.78), vec4(1340.6766, 7.0, -3563.2479, 3.6), ceil(normalize(-0.2)));
                                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
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
                                                    _GLF_color = vec4(0.2, -6.6, -22.97, 306.360);
                                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                    }
                                                }
                                                _GLF_color = vec4(sinh(-5753.4902), 40.32, -1866.8969, -7332.7832);
                                                if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(true, !(_GLF_IDENTITY(!(true), !(!(!(true)))))))) {
                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                }
                                            }
                                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                _GLF_color = _GLF_color;
                                            }
                                        }
                                        {
                                            vec4 _GLF_outVarBackup_GLF_color;
                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                            _GLF_color = vec3(-2.9, 87.10, 7187.1984).xxzx;
                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                            }
                                        }
                                    }
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        _GLF_color = mix(vec4(4.0, -7.3, 5661.3192, -5400.0031), vec4(427.126, 1.1, -5.6, -8.2), bvec4(false, false, false, true));
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                    }
                                    msb9++;
                                } while (_GLF_WRAPPED_LOOP(false));
                                {
                                    if (_GLF_DEAD(false)) {
                                        float donor_replacementGLF_dead8limit = _GLF_FUZZED(determinant(mat2(-3.1, -0.1, 6261.1533, 9.2)));
                                        float donor_replacementGLF_dead8ref = _GLF_FUZZED(-5.9);
                                        float donor_replacementGLF_dead8s = _GLF_FUZZED(cos(-21.82));
                                        while (donor_replacementGLF_dead4v < bitfieldInsert(800, donor_replacementGLF_dead4v, 0, 0)) {
                                            if (mod(float(donor_replacementGLF_dead4v), donor_replacementGLF_dead8ref) <= 0.01) {
                                                donor_replacementGLF_dead8s += 0.2;
                                            }
                                            if (float(donor_replacementGLF_dead4v) >= donor_replacementGLF_dead8limit) {
                                                ;
                                            }
                                            donor_replacementGLF_dead4v++;
                                        }
                                    }
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        _GLF_color = unpackUnorm4x8(12571u);
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                    }
                                    if (_GLF_DEAD(false)) {
                                        {
                                            donor_replacementGLF_dead4v = (4 * donor_replacementGLF_dead4v * (1000 - donor_replacementGLF_dead4v)) / 1000;
                                        }
                                    }
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        do {
                                            _GLF_color = sign(vec3(-7.2, -3297.9937, 62.59).tstt);
                                        } while (_GLF_WRAPPED_LOOP(false));
                                        if (_GLF_DEAD(false)) {
                                            int donor_replacementGLF_dead9i = _GLF_FUZZED(ivec4(24458, 51389, -56000, 11193).b);
                                            for (donor_replacementGLF_dead9i = 0; donor_replacementGLF_dead9i < msb10; donor_replacementGLF_dead9i++) {
                                                donor_replacementGLF_dead4v = (4 * donor_replacementGLF_dead4v * (1000 - donor_replacementGLF_dead4v)) / 1000;
                                            }
                                        }
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(true, (true) || false))) {
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                            } else {
                                            }
                                        }
                                    }
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = sinh(clamp(vec4(-3.0, -2.5, 374.538, -554.447), 0.0, 204.414));
                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                        for (msb10 = 0; msb10 < msb9; msb10++) {
                                            donor_replacementGLF_dead4v = (4 * donor_replacementGLF_dead4v * (1000 - donor_replacementGLF_dead4v)) / 1000;
                                        }
                                    }
                                    if (_GLF_WRAPPED_IF_FALSE(false)) {
                                        if (_GLF_DEAD(false)) {
                                            int donor_replacementGLF_dead9v = _GLF_FUZZED((((-4.5) * mat4x2(-4.3, 8256.3006, 94.70, -5939.3943, 4.1, 5500.0185, -9.1, -63.34)), -41900));
                                            for (msb9 = 0; msb9 < donor_replacementGLF_dead4v; msb9++) {
                                                donor_replacementGLF_dead9v = (4 * donor_replacementGLF_dead9v * (1000 - donor_replacementGLF_dead9v)) / 1000;
                                            }
                                        }
                                    } else {
                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                            {
                                                if (_GLF_DEAD(false)) {
                                                    {
                                                        continue;
                                                    }
                                                }
                                                vec4 _GLF_outVarBackup_GLF_color;
                                                {
                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                    _GLF_color = vec4(8.4, -7.9, 944.615, -54.61);
                                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                        if (_GLF_DEAD(false)) {
                                                            float donor_replacementGLF_dead8limit = _GLF_FUZZED(-484.899);
                                                            float donor_replacementGLF_dead8ref = _GLF_FUZZED(dot(injectionSwitch, resolution));
                                                            float donor_replacementGLF_dead8s = _GLF_FUZZED(dFdxCoarse(-73.11));
                                                            {
                                                                if (mod(float(msb10), donor_replacementGLF_dead8ref) <= 0.01) {
                                                                    donor_replacementGLF_dead8s += 0.2;
                                                                }
                                                                if (float(msb10) >= donor_replacementGLF_dead8limit) {
                                                                    ;
                                                                }
                                                                msb10++;
                                                            }
                                                        }
                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                    }
                                                }
                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                _GLF_color = vec4(-161.621, 2.2, -28.18, -9711.8634);
                                                for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != int(_GLF_ZERO(0.0, injectionSwitch.x))); _injected_loop_counter--) {
                                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                        if (_GLF_DEAD(false)) {
                                                            {
                                                                if (_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(msb9, 4)] >= 1.0) {
                                                                    _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(msb9, 4)] = _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(msb9, 4)] * _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(msb9, 4)];
                                                                }
                                                                msb9++;
                                                            }
                                                        }
                                                    }
                                                }
                                                if (_GLF_DEAD(false)) {
                                                    int donor_replacementGLF_dead9iters = _GLF_FUZZED(ivec3(-94965, -90128, 15507)[2]);
                                                    for (msb10 = 0; msb10 < donor_replacementGLF_dead9iters; msb10++) {
                                                        msb9 = (4 * msb9 * (1000 - msb9)) / 1000;
                                                    }
                                                }
                                                {
                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                    _GLF_color = vec4(7.1, -79.87, 8702.7843, 6.0);
                                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                    }
                                                }
                                                if (_GLF_DEAD(false)) {
                                                    if (_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4v, 4)] >= 1.0) {
                                                        _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4v, 4)] = _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4v, 4)] * _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4v, 4)];
                                                    }
                                                }
                                            }
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                    }
                                }
                            }
                        } while (_GLF_WRAPPED_LOOP(false));
                        if (_GLF_DEAD(false)) {
                            int donor_replacementGLF_dead8i = _GLF_FUZZED(-1616);
                            float donor_replacementGLF_dead8limit = _GLF_FUZZED(exp(-4202.4589));
                            float donor_replacementGLF_dead8ref = _GLF_FUZZED(acosh(-0.0));
                            float donor_replacementGLF_dead8s = _GLF_FUZZED((+(-9.0)));
                            {
                                if (mod(float(donor_replacementGLF_dead8i), donor_replacementGLF_dead8ref) <= 0.01) {
                                    donor_replacementGLF_dead8s += 0.2;
                                }
                                if (float(donor_replacementGLF_dead8i) >= donor_replacementGLF_dead8limit) {
                                    ;
                                }
                                donor_replacementGLF_dead8i++;
                            }
                        }
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = atan(vec4(876.675, -2.4, -9.3, 616.367), vec4(-995.954, 1.6, 2421.4575, -3340.2935));
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                        {
                                            msb9 = (4 * msb9 * (1000 - msb9)) / 1000;
                                        }
                                    }
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = vec4(-9307.8980, 14.32, -6.1, 4680.7534);
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = _GLF_color;
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                            int donor_replacementGLF_dead9v = _GLF_FUZZED((vec4(-556.442, 9765.4563, 1.0, 9.8), msb9));
                                            {
                                                donor_replacementGLF_dead9v = (4 * donor_replacementGLF_dead9v * (1000 - donor_replacementGLF_dead9v)) / 1000;
                                            }
                                        }
                                    }
                                }
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                        if (_GLF_DEAD(false)) {
                            float donor_replacementGLF_dead8limit = _GLF_FUZZED(34.18);
                            float donor_replacementGLF_dead8ref = _GLF_FUZZED(-7.5);
                            float donor_replacementGLF_dead8s = _GLF_FUZZED(-1759.8876);
                            {
                                if (mod(float(msb10), donor_replacementGLF_dead8ref) <= 0.01) {
                                    donor_replacementGLF_dead8s += 0.2;
                                }
                                if (float(msb10) >= donor_replacementGLF_dead8limit) {
                                    ;
                                }
                                msb10++;
                            }
                        }
                    }
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < _GLF_IDENTITY(dot(vec3(_GLF_IDENTITY(dot(vec4(1.0, 1.0, 1.0, 0.0), vec4(0.0, 0.0, 0.0, 1.0)), dot(vec4(1.0, 1.0, 1.0, 0.0), vec4(0.0, 0.0, 0.0, 1.0))), 0.0, 1.0), vec3(1.0, 1.0, 0.0)), dot(vec3(_GLF_IDENTITY(dot(vec4(1.0, 1.0, 1.0, 0.0), vec4(0.0, 0.0, 0.0, 1.0)), dot(vec4(1.0, 1.0, 1.0, 0.0), vec4(0.0, 0.0, 0.0, 1.0))), 0.0, 1.0), vec3(1.0, 1.0, 0.0))))))) {
                    int donor_replacementGLF_dead9iters = _GLF_FUZZED(int(uselessOutVariable));
                    for (msb10 = 0; msb10 < donor_replacementGLF_dead9iters; msb10++) {
                        msb10 = (4 * msb10 * (1000 - msb10)) / 1000;
                    }
                }
                if (_GLF_DEAD(false)) {
                    _GLF_color = _GLF_color;
                }
            }
            {
                vec4 _GLF_outVarBackup_GLF_color;
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    {
                        msb10 = (4 * msb10 * (1000 - msb10)) / 1000;
                    }
                }
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(-5.5, -6282.9230, -163.030, -499.384);
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
        } while (_GLF_WRAPPED_LOOP(false));
        for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < (1 & 1)); _injected_loop_counter++) {
            if (_GLF_DEAD(false)) {
                {
                    msb9 = (4 * msb9 * (1000 - msb9)) / 1000;
                }
            }
            if (_GLF_DEAD(false)) {
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(9.9, -344.697, 3.3, 9304.5952);
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        float donor_replacementGLF_dead8limit = _GLF_FUZZED(86.80);
                        float donor_replacementGLF_dead8ref = _GLF_FUZZED(-4677.6521);
                        float donor_replacementGLF_dead8s = _GLF_FUZZED(-48.40);
                        while (msb10 < bitfieldInsert(800, msb10, 0, 0)) {
                            if (mod(float(msb10), donor_replacementGLF_dead8ref) <= 0.01) {
                                donor_replacementGLF_dead8s += 0.2;
                            }
                            if (float(msb10) >= donor_replacementGLF_dead8limit) {
                                ;
                            }
                            msb10++;
                        }
                    }
                }
                _GLF_color = _GLF_color;
                if (_GLF_DEAD(false)) {
                    vec2 donor_replacementGLF_dead9a = _GLF_FUZZED(GLF_dead3injectionSwitch);
                    float donor_replacementGLF_dead9z = _GLF_FUZZED(round(fract(82.65)));
                    do {
                        if (donor_replacementGLF_dead9a.y > donor_replacementGLF_dead9a.x) {
                            donor_replacementGLF_dead9z = donor_replacementGLF_dead9a.x / donor_replacementGLF_dead9a.y;
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                if (_GLF_DEAD(false)) {
                                    int donor_replacementGLF_dead8i = _GLF_FUZZED(int(donor_replacementGLF_dead9z));
                                    {
                                        _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead8i, 4)] = _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead8i, 4)] * _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead8i, 4)];
                                    }
                                }
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = acosh(vec4(206.011, 1.7, -5.2, -8.4));
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < abs(0.0))))) {
                                    {
                                        _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(msb9, 4)] = _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(msb9, 4)] * _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(msb9, 4)];
                                    }
                                }
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                vec4 donor_replacementGLF_dead8c = _GLF_FUZZED(dFdxFine(_GLF_color));
                                int donor_replacementGLF_dead8i = _GLF_FUZZED(_injected_loop_counter);
                                if (donor_replacementGLF_dead8c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead8i, 4)] >= 1.0) {
                                    donor_replacementGLF_dead8c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead8i, 4)] = donor_replacementGLF_dead8c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead8i, 4)] * donor_replacementGLF_dead8c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead8i, 4)];
                                }
                            }
                        } else {
                            donor_replacementGLF_dead9z = donor_replacementGLF_dead9a.y / donor_replacementGLF_dead9a.x;
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = vec4(-4723.5699, 755.993, -92.98, 32.97);
                                do {
                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= _GLF_IDENTITY(dot(vec3(1.0, 0.0, 1.0), vec3(0.0, 1.0, 0.0)), dot(vec3(1.0, 0.0, 1.0), vec3(0.0, 1.0, 0.0))))))) {
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            do {
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                            } while (_GLF_WRAPPED_LOOP(false));
                                        } else {
                                        }
                                    }
                                } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
                            }
                        }
                    } while (_GLF_WRAPPED_LOOP(false));
                }
            }
        }
        for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != (0 ^ 1)); _injected_loop_counter++) {
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
                if (_GLF_DEAD(false)) {
                    int donor_replacementGLF_dead9v = _GLF_FUZZED(findMSB(37113u));
                    {
                        donor_replacementGLF_dead9v = (4 * donor_replacementGLF_dead9v * (1000 - donor_replacementGLF_dead9v)) / 1000;
                    }
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    _GLF_color = _GLF_color;
                }
                if (_GLF_DEAD(false)) {
                    do {
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = vec4(-74.24, 5.8, 374.885, -44.44);
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                        vec4 _GLF_outVarBackup_GLF_color;
                        for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != (0 << _GLF_IDENTITY(int(6), _GLF_IDENTITY(int(6), 0 ^ (int(6)))))); _injected_loop_counter--) {
                            for (int _injected_loop_counter = (0 | 0); _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                            }
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            float donor_replacementGLF_dead8s = _GLF_FUZZED(9488.6858);
                            {
                                donor_replacementGLF_dead8s += 0.2;
                            }
                        }
                        do {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = vec4(-4.3, 0.4, -5902.0966, 8.9);
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < sin(0.0))))) {
                                    if (_GLF_WRAPPED_IF_FALSE(false)) {
                                    } else {
                                        _GLF_color = vec4(-3.6);
                                        {
                                            vec4 _GLF_outVarBackup_GLF_color;
                                            if (_GLF_DEAD(false)) {
                                                vec4 donor_replacementGLF_dead8c = _GLF_FUZZED(_GLF_color);
                                                do {
                                                    if (donor_replacementGLF_dead8c[_GLF_MAKE_IN_BOUNDS_INT(_injected_loop_counter, 4)] >= 1.0) {
                                                        donor_replacementGLF_dead8c[_GLF_MAKE_IN_BOUNDS_INT(_injected_loop_counter, 4)] = donor_replacementGLF_dead8c[_GLF_MAKE_IN_BOUNDS_INT(_injected_loop_counter, 4)] * donor_replacementGLF_dead8c[_GLF_MAKE_IN_BOUNDS_INT(_injected_loop_counter, 4)];
                                                    }
                                                    _injected_loop_counter++;
                                                } while (_injected_loop_counter < findMSB(findLSB(_injected_loop_counter)));
                                            }
                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                            _GLF_color = dFdx(vec4(7.2, 99.88, -4.0, -90.47));
                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                    float donor_replacementGLF_dead8limit = _GLF_FUZZED(-48.08);
                                                    float donor_replacementGLF_dead8ref = _GLF_FUZZED(399.107);
                                                    float donor_replacementGLF_dead8s = _GLF_FUZZED(89.15);
                                                    while (_injected_loop_counter < bitfieldInsert(800, _injected_loop_counter, 0, 0)) {
                                                        if (mod(float(_injected_loop_counter), donor_replacementGLF_dead8ref) <= 0.01) {
                                                            donor_replacementGLF_dead8s += 0.2;
                                                        }
                                                        if (float(_injected_loop_counter) >= donor_replacementGLF_dead8limit) {
                                                            ;
                                                        }
                                                        _injected_loop_counter++;
                                                    }
                                                }
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                            }
                                        }
                                    }
                                }
                                for (int _injected_loop_counter = (int(_GLF_ZERO(0.0, injectionSwitch.x)) >> _GLF_IDENTITY(int(4), int(4))); _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < sin(0.0))))) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                            }
                        } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.x < log(sqrt(1.0))))));
                        _GLF_color = vec4(-0.0, -44.63, vec2(59.89, 1.3));
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        } else {
                        }
                    } while (_GLF_WRAPPED_LOOP(false));
                    vec3 donor_replacementGLF_dead3color = _GLF_FUZZED(cross(vec3(-8.3, 2305.6205, 37.52), vec3(8.4, 2.3, 0.7)));
                    vec2 donor_replacementGLF_dead3grid = _GLF_FUZZED(uintBitsToFloat(uvec2(130285u, 58234u)));
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(7735.6696, -2004.4379, 23.44, 17.82);
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    {
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            ivec2 donor_replacementGLF_dead6p = _GLF_FUZZED(ivec2(72604, 52886));
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                vec4 donor_replacementGLF_dead8c = _GLF_FUZZED(_GLF_outVarBackup_GLF_color);
                                int donor_replacementGLF_dead8i = _GLF_FUZZED(msb10);
                                if (donor_replacementGLF_dead8c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead8i, 4)] >= 1.0) {
                                    donor_replacementGLF_dead8c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead8i, 4)] = donor_replacementGLF_dead8c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead8i, 4)] * donor_replacementGLF_dead8c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead8i, 4)];
                                }
                            }
                            if (donor_replacementGLF_dead6p.x > 0) {
                                donor_replacementGLF_dead6p.y--;
                            }
                            if (_GLF_DEAD(false)) {
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                    float donor_replacementGLF_dead8s = _GLF_FUZZED(-826.103);
                                    {
                                        donor_replacementGLF_dead8s += 0.2;
                                    }
                                }
                                _GLF_color = vec4(-7192.6681, 77.98, 90.68, -4.0);
                            }
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = log(vec4(819.889, 896.063, -917.146, 69.97));
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                        }
                        int GLF_dead3count = int(GLF_dead3injectionSwitch.x);
                        do {
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                if (_GLF_DEAD(false)) {
                                    if (_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(_injected_loop_counter, 4)] >= 1.0) {
                                        _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(_injected_loop_counter, 4)] = _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(_injected_loop_counter, 4)] * _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(_injected_loop_counter, 4)];
                                    }
                                }
                                do {
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                } while (_GLF_WRAPPED_LOOP(false));
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    do {
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                    } while (_GLF_WRAPPED_LOOP(false));
                                    do {
                                        _GLF_color = sign(dFdx(vec4(95.24, -7828.1606, -14.45, -3.6)));
                                    } while (_GLF_WRAPPED_LOOP(false));
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                    if (_GLF_DEAD(false)) {
                                        for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > (0 >> _GLF_IDENTITY(int(5), int(5)))); _injected_loop_counter--) {
                                            _GLF_color = log(_GLF_color);
                                        }
                                    }
                                }
                                _GLF_color = max(vec4(-68.83, 75.17, -5.7, 921.395), vec4(664.897, 179.776, 483.542, -103.860));
                                for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                                    if (_GLF_DEAD(false)) {
                                        {
                                            msb10 = (4 * msb10 * (1000 - msb10)) / 1000;
                                        }
                                    }
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        _GLF_color = min(vec4(4187.3806, -704.525, -7.1, 5.7), vec4(-3333.8805, 4.8, -740.082, 923.293));
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                    }
                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                            {
                                                vec4 _GLF_outVarBackup_GLF_color;
                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                _GLF_color = (false ? dFdxCoarse(vec4(-97.84, 1566.7266, 85.48, 6659.4113)) : vec4(-1490.4550, -4.5, -7146.3569, -0.8).ywww);
                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                }
                                            }
                                            for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                            }
                                        }
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < abs(sin(0.0)))))) {
                                            int donor_replacementGLF_dead8i = _GLF_FUZZED(((true && false) ? 86339 : msb10));
                                            float donor_replacementGLF_dead8ref = _GLF_FUZZED(4.0);
                                            float donor_replacementGLF_dead8s = _GLF_FUZZED(90.88);
                                            if (mod(float(donor_replacementGLF_dead8i), donor_replacementGLF_dead8ref) <= 0.01) {
                                                donor_replacementGLF_dead8s += 0.2;
                                            }
                                        }
                                    } else {
                                    }
                                }
                            }
                            donor_replacementGLF_dead3color -= GLF_dead3palette(vec3(float(GLF_dead3obj.numbers[4]) * 0.1), trunc(vec3(0.1)), vec3(float(GLF_dead3obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_dead3injectionSwitch.y), 10)]) * 0.1), vec3(GLF_dead3injectionSwitch.x, float(GLF_dead3obj.numbers[2]) * 0.1, float(GLF_dead3obj.numbers[8]) * 0.1));
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = (2168.7845 + vec4(-8696.8476, 9585.7270, -570.995, -328.829));
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                            do {
                                if (_GLF_DEAD(false)) {
                                    float donor_replacementGLF_dead5limit = _GLF_FUZZED(5.0);
                                    float donor_replacementGLF_dead5ref = _GLF_FUZZED(600.816);
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        _GLF_color = vec4(545.225, -1.5, -24.61, -6.2);
                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                            {
                                                vec4 _GLF_outVarBackup_GLF_color;
                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                _GLF_color = unpackSnorm4x8((mat2x3(6571.6433, -698.356, -7.8, 4.9, 21.58, -6.0), 84634u));
                                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                }
                                            }
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                            if (_GLF_DEAD(false)) {
                                                for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                }
                                                if (_GLF_DEAD(false)) {
                                                    float donor_replacementGLF_dead8limit = _GLF_FUZZED(round(-3.6));
                                                    if (float(_injected_loop_counter) >= donor_replacementGLF_dead8limit) {
                                                        ;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        _GLF_color = vec4(7.3, 807.096, 7834.1018, 7.2);
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                            for (msb10 = 0; msb10 < msb9; msb10++) {
                                                msb10 = (4 * msb10 * (1000 - msb10)) / 1000;
                                            }
                                        }
                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                    }
                                    float donor_replacementGLF_dead5s = _GLF_FUZZED(-8.0);
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = (vec4(-18.15, 609.519, 6732.1003, -239.865) * _GLF_color);
                                    }
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        {
                                            vec4 _GLF_outVarBackup_GLF_color;
                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                            _GLF_color = vec4(-3768.2673, 4080.7350, -7937.4828, -448.329);
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                int donor_replacementGLF_dead9v = _GLF_FUZZED((false ? _injected_loop_counter : GLF_dead3count));
                                                {
                                                    donor_replacementGLF_dead9v = (4 * donor_replacementGLF_dead9v * (1000 - donor_replacementGLF_dead9v)) / 1000;
                                                }
                                            }
                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                            }
                                        }
                                        _GLF_color = unpackUnorm4x8(137498u);
                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                            if (_GLF_DEAD(false)) {
                                                vec4 donor_replacementGLF_dead8c = _GLF_FUZZED(_GLF_outVarBackup_GLF_color);
                                                do {
                                                    if (donor_replacementGLF_dead8c[_GLF_MAKE_IN_BOUNDS_INT(msb9, 4)] >= 1.0) {
                                                        donor_replacementGLF_dead8c[_GLF_MAKE_IN_BOUNDS_INT(msb9, 4)] = donor_replacementGLF_dead8c[_GLF_MAKE_IN_BOUNDS_INT(msb9, 4)] * donor_replacementGLF_dead8c[_GLF_MAKE_IN_BOUNDS_INT(msb9, 4)];
                                                    }
                                                    msb9++;
                                                } while (msb9 < findMSB(findLSB(msb10)));
                                            }
                                            {
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                    float donor_replacementGLF_dead8limit = _GLF_FUZZED(min(donor_replacementGLF_dead3grid.x, donor_replacementGLF_dead5limit));
                                                    if (float(GLF_dead3count) >= donor_replacementGLF_dead8limit) {
                                                        ;
                                                    }
                                                }
                                                vec4 _GLF_outVarBackup_GLF_color;
                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                    int donor_replacementGLF_dead9i = _GLF_FUZZED(msb10);
                                                    for (donor_replacementGLF_dead9i = 0; donor_replacementGLF_dead9i < msb9; donor_replacementGLF_dead9i++) {
                                                        msb9 = (4 * msb9 * (1000 - msb9)) / 1000;
                                                    }
                                                }
                                                _GLF_color = vec4(3.8, -2735.1901, 7.7, -9598.9296);
                                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                    if (_GLF_DEAD(false)) {
                                                        {
                                                            msb9 = (4 * msb9 * (1000 - msb9)) / 1000;
                                                        }
                                                    }
                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                }
                                            }
                                        }
                                    }
                                    if (_GLF_WRAPPED_IF_FALSE(false)) {
                                        {
                                            vec4 _GLF_outVarBackup_GLF_color;
                                            if (_GLF_DEAD(false)) {
                                                if (_GLF_outVarBackup_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead3count, 4)] >= 1.0) {
                                                    _GLF_outVarBackup_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead3count, 4)] = _GLF_outVarBackup_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead3count, 4)] * _GLF_outVarBackup_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead3count, 4)];
                                                }
                                            }
                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                            _GLF_color = clamp(vec4(-428.752, 5.1, -344.756, -33.47), vec4(-57.13, 54.10, -17.11, 43.63), vec4(6.7, -242.791, 3.2, -856.696));
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < length(vec2(0.0, 0.0)))))) {
                                                ivec2 donor_replacementGLF_dead6p = _GLF_FUZZED(floatBitsToInt(injectionSwitch));
                                                do {
                                                    donor_replacementGLF_dead6p.x = -donor_replacementGLF_dead6p.x;
                                                    if (_GLF_DEAD(false)) {
                                                        {
                                                            msb9 = (4 * msb9 * (1000 - msb9)) / 1000;
                                                        }
                                                    }
                                                } while (_GLF_WRAPPED_LOOP(false));
                                            }
                                            for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                    if (_GLF_WRAPPED_IF_FALSE(false)) {
                                                    } else {
                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                    }
                                                }
                                            }
                                        }
                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)), bool(bvec2(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)), false))))) {
                                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                ivec2 donor_replacementGLF_dead6p = _GLF_FUZZED((ivec2(-39904, 95563) * ((ivec2(23562, -61415) % ivec2(-56726, 53402)) * msb10)));
                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                    donor_replacementGLF_dead6p.y++;
                                                } else {
                                                }
                                                {
                                                    {
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                            if (_injected_loop_counter < int(GLF_dead10gl_FragCoord.x)) {
                                                                break;
                                                            }
                                                        }
                                                        vec4 _GLF_outVarBackup_GLF_color;
                                                        if (_GLF_DEAD(false)) {
                                                            {
                                                                _injected_loop_counter = (4 * _injected_loop_counter * (1000 - _injected_loop_counter)) / 1000;
                                                            }
                                                        }
                                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                                        _GLF_color = fma(vec4(-38.66, 5.0, -8.1, -3.2), vec4(-4091.0358, -9.5, 591.215, 44.87), vec4(-5.7, 5770.4129, -6.2, -978.895));
                                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                        }
                                                    }
                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                    if (_GLF_DEAD(false)) {
                                                        int donor_replacementGLF_dead8i = _GLF_FUZZED(_injected_loop_counter);
                                                        {
                                                            if (mod(float(donor_replacementGLF_dead8i), donor_replacementGLF_dead5ref) <= 0.01) {
                                                                donor_replacementGLF_dead5limit += 0.2;
                                                            }
                                                            if (float(donor_replacementGLF_dead8i) >= donor_replacementGLF_dead5s) {
                                                                ;
                                                            }
                                                            donor_replacementGLF_dead8i++;
                                                        }
                                                    }
                                                    for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != ((0 ^ 0) & (19416 ^ 94133))); _injected_loop_counter--) {
                                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                                    }
                                                    if (_GLF_DEAD(false)) {
                                                        _GLF_color = vec4(92.09, 8.9, -6.9, 92.87);
                                                    }
                                                    if (_GLF_DEAD(false)) {
                                                        int donor_replacementGLF_dead7j = _GLF_FUZZED(msb9);
                                                        if (uint(donor_replacementGLF_dead7j) < uaddCarry(uint(msb10), 1u, uselessOutVariable)) {
                                                            continue;
                                                        }
                                                    }
                                                    _GLF_color = vec4(291.862, 3.0, -8.4, -8151.6347);
                                                    do {
                                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                        }
                                                    } while (_GLF_WRAPPED_LOOP(_GLF_IDENTITY(false, false || (false))));
                                                }
                                            }
                                        } else {
                                        }
                                        if (_GLF_DEAD(false)) {
                                            {
                                                discard;
                                            }
                                        }
                                    } else {
                                        for (int GLF_dead5i = 1; GLF_dead5i < 800; GLF_dead5i++) {
                                            if (mod(float(GLF_dead5i), donor_replacementGLF_dead5ref) <= 0.01) {
                                                {
                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                    if (_GLF_DEAD(false)) {
                                                        {
                                                            if (_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead3count, 4)] >= 1.0) {
                                                                _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead3count, 4)] = _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead3count, 4)] * _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead3count, 4)];
                                                            }
                                                            GLF_dead3count++;
                                                        }
                                                    }
                                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                                    } else {
                                                    }
                                                    _GLF_color = vec4(-1599.0047, 34.97, -354.179, -992.979);
                                                    do {
                                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                        }
                                                    } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))));
                                                }
                                                if (_GLF_DEAD(false)) {
                                                    int donor_replacementGLF_dead8i = _GLF_FUZZED(msb10);
                                                    if (_GLF_outVarBackup_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead8i, 4)] >= 1.0) {
                                                        _GLF_outVarBackup_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead8i, 4)] = _GLF_outVarBackup_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead8i, 4)] * _GLF_outVarBackup_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead8i, 4)];
                                                    }
                                                }
                                                if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                } else {
                                                    {
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                            {
                                                                GLF_dead3count = (4 * GLF_dead3count * (1000 - GLF_dead3count)) / 1000;
                                                            }
                                                        }
                                                        vec4 _GLF_outVarBackup_GLF_color;
                                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                                        _GLF_color = vec4(22.27, -339.562, 714.293, -6.9);
                                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                        }
                                                    }
                                                    donor_replacementGLF_dead5s += 0.2;
                                                }
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < tan(0.0))))) {
                                                    if (length(donor_replacementGLF_dead3grid) < 0.001) {
                                                        ;
                                                        {
                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                                    _GLF_color = (-_GLF_color);
                                                                }
                                                            } else {
                                                                {
                                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                    _GLF_color = vec4(-2.5, -8.6, -8.3, -791.896);
                                                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                                            int donor_replacementGLF_dead8msb8 = _GLF_FUZZED(GLF_dead3count);
                                                                            do {
                                                                                if (_GLF_outVarBackup_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(msb9, 4)] >= 1.0) {
                                                                                    _GLF_outVarBackup_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(msb9, 4)] = _GLF_outVarBackup_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(msb9, 4)] * _GLF_outVarBackup_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(msb9, 4)];
                                                                                }
                                                                                msb9++;
                                                                            } while (msb9 < findMSB(findLSB(donor_replacementGLF_dead8msb8)));
                                                                        }
                                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                    }
                                                                }
                                                            }
                                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                                    for (_injected_loop_counter = 0; _injected_loop_counter < GLF_dead3count; _injected_loop_counter++) {
                                                                        GLF_dead5i = (4 * GLF_dead5i * (1000 - GLF_dead5i)) / 1000;
                                                                    }
                                                                }
                                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                            } else {
                                                            }
                                                            do {
                                                                _GLF_color = vec4(8.9, -5.5, -4.5, -725.172);
                                                            } while (_GLF_WRAPPED_LOOP(false));
                                                            for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != (1 | 1)); _injected_loop_counter++) {
                                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                    } else {
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                                {
                                                    if (_GLF_DEAD(false)) {
                                                        int donor_replacementGLF_dead8i = _GLF_FUZZED(48623);
                                                        float donor_replacementGLF_dead8limit = _GLF_FUZZED(sqrt((donor_replacementGLF_dead5ref * donor_replacementGLF_dead5ref)));
                                                        float donor_replacementGLF_dead8s = _GLF_FUZZED(donor_replacementGLF_dead5ref);
                                                        {
                                                            if (mod(float(donor_replacementGLF_dead8i), donor_replacementGLF_dead5s) <= 0.01) {
                                                                donor_replacementGLF_dead8s += 0.2;
                                                            }
                                                            if (float(donor_replacementGLF_dead8i) >= donor_replacementGLF_dead8limit) {
                                                                ;
                                                            }
                                                            donor_replacementGLF_dead8i++;
                                                        }
                                                    }
                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                    {
                                                        vec4 _GLF_outVarBackup_GLF_color;
                                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                                        _GLF_color = vec4(2.8, 56.27, 5059.8723, 7315.3589);
                                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                        }
                                                    }
                                                    do {
                                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                                    } while (_GLF_WRAPPED_LOOP(false));
                                                    {
                                                        vec4 _GLF_outVarBackup_GLF_color;
                                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                                        _GLF_color = fwidthFine(vec4(-5688.2884, -801.807, 10.07, 0.3));
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                            {
                                                                continue;
                                                            }
                                                        }
                                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                        }
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                            int donor_replacementGLF_dead9iters = _GLF_FUZZED(msb9);
                                                            int donor_replacementGLF_dead9v = _GLF_FUZZED(findLSB((21548u >> bitfieldInsert(uselessOutVariable, uselessOutVariable, GLF_dead3count, msb10))));
                                                            for (_injected_loop_counter = 0; _injected_loop_counter < donor_replacementGLF_dead9iters; _injected_loop_counter++) {
                                                                donor_replacementGLF_dead9v = (4 * donor_replacementGLF_dead9v * (1000 - donor_replacementGLF_dead9v)) / 1000;
                                                            }
                                                        }
                                                    }
                                                    _GLF_color = vec4(8485.1394, -9.2, 6.2, 549.875);
                                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                donor_replacementGLF_dead5limit = 1.0 - donor_replacementGLF_dead5limit;
                                                            } else {
                                                            }
                                                        }
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                            _GLF_color = vec4(9304.4119, -34.32, -444.695, -72.00);
                                                        }
                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                        if (_GLF_DEAD(false)) {
                                                            _GLF_color = mix(_GLF_color, (_GLF_outVarBackup_GLF_color - donor_replacementGLF_dead5limit), bvec4(true, false, true, true));
                                                        }
                                                    }
                                                    if (_GLF_DEAD(false)) {
                                                        {
                                                            _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(_injected_loop_counter, 4)] = _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(_injected_loop_counter, 4)] * _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(_injected_loop_counter, 4)];
                                                        }
                                                    }
                                                    {
                                                        vec4 _GLF_outVarBackup_GLF_color;
                                                        if (_GLF_WRAPPED_IF_FALSE(false)) {
                                                        } else {
                                                            do {
                                                                {
                                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                    _GLF_color = inversesqrt(atan(vec4(-0.1, 9.4, -503.220, 4.6), vec4(2.2, 8.0, -7.7, 68.30)));
                                                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                                            int donor_replacementGLF_dead9iters = _GLF_FUZZED(_injected_loop_counter);
                                                                            for (GLF_dead3count = 0; GLF_dead3count < donor_replacementGLF_dead9iters; GLF_dead3count++) {
                                                                                msb9 = (4 * msb9 * (1000 - msb9)) / 1000;
                                                                            }
                                                                        }
                                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                    }
                                                                }
                                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                } else {
                                                                }
                                                            } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))));
                                                        }
                                                        if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                                int donor_replacementGLF_dead8i = _GLF_FUZZED(msb9);
                                                                {
                                                                    _GLF_outVarBackup_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead8i, 4)] = _GLF_outVarBackup_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead8i, 4)] * _GLF_outVarBackup_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead8i, 4)];
                                                                }
                                                            }
                                                            {
                                                                vec4 _GLF_outVarBackup_GLF_color;
                                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                _GLF_color = vec4(-1.6, -67.69, -57.78, 9558.9381);
                                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                }
                                                            }
                                                        } else {
                                                            _GLF_color = vec4(7770.4392, -6830.2612, 19.41, 953.461);
                                                        }
                                                        {
                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                            _GLF_color = dFdxFine(vec4(4.8, 7.1, 942.275, -939.844));
                                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                if (_GLF_DEAD(false)) {
                                                                    {
                                                                        msb9 = (4 * msb9 * (1000 - msb9)) / 1000;
                                                                    }
                                                                }
                                                            }
                                                        }
                                                        if (_GLF_WRAPPED_IF_FALSE(false)) {
                                                        } else {
                                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                            }
                                                        }
                                                    }
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                        {
                                                            GLF_dead3count = (4 * GLF_dead3count * (1000 - GLF_dead3count)) / 1000;
                                                        }
                                                    }
                                                }
                                            }
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                ivec2 donor_replacementGLF_dead6p = _GLF_FUZZED(ivec2(-80240, -28291));
                                                if (donor_replacementGLF_dead6p.x > 0) {
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                        {
                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                            _GLF_color = mix(vec4(-5.7, 473.337, 7595.4514, -14.12), vec4(2.6, -8.4, -299.786, -9546.5323), clamp(vec4(-36.10, 83.08, 9.0, -582.259), vec4(7112.7464, -7.8, 9.4, 348.646), vec4(-88.74, 9.0, -67.96, 5.8)));
                                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                            }
                                                        }
                                                        _GLF_color = unpackSnorm4x8(117676u);
                                                    }
                                                    donor_replacementGLF_dead6p.y--;
                                                }
                                            }
                                            if (float(GLF_dead5i) >= donor_replacementGLF_dead5limit) {
                                                ;
                                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                        if (float(GLF_dead5i) >= donor_replacementGLF_dead5limit) {
                                                            ;
                                                        }
                                                    }
                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                    _GLF_color = unpackSnorm4x8(26242u);
                                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                                        if (_GLF_DEAD(false)) {
                                                            float donor_replacementGLF_dead8s = _GLF_FUZZED(dot(_GLF_outVarBackup_GLF_color, vec4(-2386.3088, 5.6, -261.016, 8.1)));
                                                            {
                                                                donor_replacementGLF_dead8s += 0.2;
                                                            }
                                                        }
                                                        {
                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                            _GLF_color = acosh(vec4(-1930.8626, 6973.9319, 4.8, 5777.1975));
                                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                            }
                                                            if (_GLF_DEAD(false)) {
                                                                int donor_replacementGLF_dead9v = _GLF_FUZZED(_injected_loop_counter);
                                                                {
                                                                    donor_replacementGLF_dead9v = (4 * donor_replacementGLF_dead9v * (1000 - donor_replacementGLF_dead9v)) / 1000;
                                                                }
                                                            }
                                                        }
                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                        if (_GLF_DEAD(false)) {
                                                            _GLF_color = vec4(length((donor_replacementGLF_dead5s / vec2(-2.5, 3725.0839))));
                                                            if (_GLF_DEAD(false)) {
                                                                {
                                                                    if (_GLF_outVarBackup_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(msb10, 4)] >= 1.0) {
                                                                        _GLF_outVarBackup_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(msb10, 4)] = _GLF_outVarBackup_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(msb10, 4)] * _GLF_outVarBackup_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(msb10, 4)];
                                                                    }
                                                                    msb10++;
                                                                }
                                                            }
                                                        }
                                                    }
                                                } else {
                                                    {
                                                        vec4 _GLF_outVarBackup_GLF_color;
                                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                                        _GLF_color = vec4(127.552, 7.9, -474.442, -5.9);
                                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                        }
                                                    }
                                                }
                                            }
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                {
                                                    GLF_dead5i = (4 * GLF_dead5i * (1000 - GLF_dead5i)) / 1000;
                                                }
                                            }
                                        }
                                    }
                                    if (_GLF_WRAPPED_IF_FALSE(false)) {
                                    } else {
                                        {
                                            vec4 _GLF_outVarBackup_GLF_color;
                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                            _GLF_color = smoothstep(-6.7, acosh(76.67), vec4(-0.9, -249.685, -3.2, -1.5));
                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                            }
                                        }
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        _GLF_color = vec4(28.39, 0.7, -896.197, 98.04);
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                            }
                                        }
                                    }
                                }
                            } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))));
                            {
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                    _GLF_color = unpackSnorm4x8(45905u);
                                    if (_GLF_DEAD(false)) {
                                        if (msb9 < int(GLF_dead10gl_FragCoord.x)) {
                                            break;
                                        }
                                    }
                                }
                                if (_GLF_DEAD(false)) {
                                    for (GLF_dead3count = 0; GLF_dead3count < msb9; GLF_dead3count++) {
                                        _injected_loop_counter = (4 * _injected_loop_counter * (1000 - _injected_loop_counter)) / 1000;
                                    }
                                }
                                vec4 _GLF_outVarBackup_GLF_color;
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = vec4(-2.6, -77.90, -2.7, 5.1).stss;
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = vec4(-19.28, 6.0, 8.1, -9.7);
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_IDENTITY(dot(vec4(0.0, 1.0, tan(0.0), 0.0), vec4(1.0, 0.0, 1.0, 1.0)), dot(vec4(0.0, 1.0, tan(0.0), 0.0), vec4(1.0, 0.0, 1.0, 1.0))))))) {
                                        {
                                            GLF_dead3count = (4 * GLF_dead3count * (1000 - GLF_dead3count)) / 1000;
                                        }
                                    }
                                }
                            }
                            GLF_dead3count++;
                        } while (GLF_dead3count != GLF_dead3obj.numbers[1]);
                        donor_replacementGLF_dead3grid += vec2(GLF_dead3count + int(GLF_dead3injectionSwitch.y), GLF_dead3count + int(GLF_dead3injectionSwitch.x));
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                            if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    float donor_replacementGLF_dead8s = _GLF_FUZZED(-6749.6116);
                                    {
                                        donor_replacementGLF_dead8s += 0.2;
                                    }
                                }
                            } else {
                                _GLF_color = ((-5725.6097) + _GLF_color);
                            }
                        }
                    }
                }
            }
        }
        if (_GLF_DEAD(false)) {
            int donor_replacementGLF_dead7i = _GLF_FUZZED(int(true));
            uint donor_replacementGLF_dead7uselessOutVariable = _GLF_FUZZED(packUnorm4x8(_GLF_outVarBackup_GLF_color));
            if (uint(msb9) < uaddCarry(uint(donor_replacementGLF_dead7i), 1u, donor_replacementGLF_dead7uselessOutVariable)) {
                ;
            }
        }
        if (_GLF_DEAD(false)) {
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                {
                    msb9 = (4 * msb9 * (1000 - msb9)) / 1000;
                }
            }
            {
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    if (_GLF_DEAD(false)) {
                        int donor_replacementGLF_dead7j = _GLF_FUZZED(-47505);
                        if (uint(donor_replacementGLF_dead7j) < uaddCarry(uint(msb10), 1u, uselessOutVariable)) {
                            ;
                        }
                    }
                    _GLF_color = vec4(-687.178, -9529.5809, 10.30, -8.9);
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                        if (_GLF_DEAD(false)) {
                            {
                                msb10 = (4 * msb10 * (1000 - msb10)) / 1000;
                            }
                        }
                    }
                    if (_GLF_WRAPPED_IF_FALSE(false)) {
                    } else {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(-331.133, 4.0, -954.400, 6283.8150);
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                            if (_GLF_DEAD(false)) {
                                float donor_replacementGLF_dead8limit = _GLF_FUZZED(-3.2);
                                float donor_replacementGLF_dead8ref = _GLF_FUZZED(-634.834);
                                float donor_replacementGLF_dead8s = _GLF_FUZZED(atan(9613.9352, -528.637));
                                while (msb9 < bitfieldInsert(800, msb9, 0, 0)) {
                                    if (mod(float(msb9), donor_replacementGLF_dead8ref) <= 0.01) {
                                        donor_replacementGLF_dead8s += 0.2;
                                    }
                                    if (float(msb9) >= donor_replacementGLF_dead8limit) {
                                        ;
                                    }
                                    msb9++;
                                }
                            }
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        {
                            if (_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(msb9, 4)] >= 1.0) {
                                _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(msb9, 4)] = _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(msb9, 4)] * _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(msb9, 4)];
                            }
                            msb9++;
                        }
                    }
                } else {
                }
                if (_GLF_DEAD(false)) {
                    if (_GLF_DEAD(_GLF_IDENTITY(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)), !(!(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))))))) {
                        {
                            msb9 = (4 * msb9 * (1000 - msb9)) / 1000;
                        }
                    }
                    _GLF_color = atan(_GLF_outVarBackup_GLF_color, _GLF_color);
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(725.180, 3657.7037, -45.18, -7.9);
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                }
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    for (int _injected_loop_counter = int(_GLF_ONE(1.0, injectionSwitch.y)); _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                    }
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = vec4(-7.8, 41.91, 6650.1230, -402.071);
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                        _GLF_color = vec4(7.5, -3.6, -24.33, 7169.9962);
                    } else {
                    }
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                msb10 = (4 * msb10 * (1000 - msb10)) / 1000;
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    int donor_replacementGLF_dead9iters = _GLF_FUZZED(msb10);
                    int donor_replacementGLF_dead9v = _GLF_FUZZED((ivec3(43249, 25597, -65062) >> msb10)[2]);
                    for (msb10 = 0; msb10 < donor_replacementGLF_dead9iters; msb10++) {
                        donor_replacementGLF_dead9v = (4 * donor_replacementGLF_dead9v * (1000 - donor_replacementGLF_dead9v)) / 1000;
                    }
                }
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = (vec2(4.7, -9239.9581) * mat4x2(7.1, 2.9, -852.974, -7562.4930, -928.952, 3.7, -2951.5290, 7.4));
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        int donor_replacementGLF_dead8msb8 = _GLF_FUZZED((+(-93183)));
                        do {
                            if (_GLF_outVarBackup_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(msb9, 4)] >= 1.0) {
                                _GLF_outVarBackup_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(msb9, 4)] = _GLF_outVarBackup_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(msb9, 4)] * _GLF_outVarBackup_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(msb9, 4)];
                            }
                            msb9++;
                        } while (msb9 < findMSB(findLSB(donor_replacementGLF_dead8msb8)));
                    }
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
            }
        }
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = vec4(-7.7, 7558.2274, 3.5, -6.1);
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < log(1.0))))) {
                    int donor_replacementGLF_dead9iters = _GLF_FUZZED(floatBitsToInt(fract(-592.379)));
                    int donor_replacementGLF_dead9v = _GLF_FUZZED(findMSB(uselessOutVariable));
                    for (msb9 = 0; msb9 < donor_replacementGLF_dead9iters; msb9++) {
                        donor_replacementGLF_dead9v = (4 * donor_replacementGLF_dead9v * (1000 - donor_replacementGLF_dead9v)) / 1000;
                    }
                }
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                {
                    if (_GLF_outVarBackup_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(msb10, 4)] >= 1.0) {
                        _GLF_outVarBackup_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(msb10, 4)] = _GLF_outVarBackup_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(msb10, 4)] * _GLF_outVarBackup_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(msb10, 4)];
                    }
                    msb10++;
                }
            }
        }
    }
    if (_GLF_DEAD(false)) {
        ivec2 donor_replacementGLF_dead6p = _GLF_FUZZED(ivec2(35049, -66171));
        if (donor_replacementGLF_dead6p.x < 0) {
            donor_replacementGLF_dead6p.y++;
        }
    }
    int i = bitfieldExtract(int(injectionSwitch.x), bitCount(0), int(injectionSwitch.x));
    for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > (0 & 70651)); _injected_loop_counter--) {
        do {
            for (int _injected_loop_counter = int(_GLF_ZERO(0.0, injectionSwitch.x)); _GLF_WRAPPED_LOOP(_injected_loop_counter < (0 | (1 | 1))); _injected_loop_counter++) {
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                    for (int j = bitfieldExtract(int(injectionSwitch.x), 0, 0); j < findLSB(msb10); j++) {
                        if (uint(j) < uaddCarry(uint(i), 1u, uselessOutVariable)) {
                            for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = vec4(-5039.7040, 3.9, 717.284, 1.5);
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                            do {
                                vec4 _GLF_outVarBackup_GLF_color;
                                for (int _injected_loop_counter = ((1 << _GLF_IDENTITY(int(3), _GLF_IDENTITY(int(3), (int(3)) >> 0))) >> _GLF_IDENTITY(int(3), _GLF_IDENTITY(int(3), (false ? _GLF_FUZZED(msb9) : int(3))))); _GLF_WRAPPED_LOOP(_injected_loop_counter > _GLF_IDENTITY(0, max(0, 0))); _injected_loop_counter--) {
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                        {
                                            if (_GLF_outVarBackup_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(_injected_loop_counter, 4)] >= 1.0) {
                                                _GLF_outVarBackup_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(_injected_loop_counter, 4)] = _GLF_outVarBackup_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(_injected_loop_counter, 4)] * _GLF_outVarBackup_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(_injected_loop_counter, 4)];
                                            }
                                            _injected_loop_counter++;
                                        }
                                    }
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                }
                                _GLF_color = (vec4(-6356.2920, 56.12, 43.25, -3.6) * 3.1);
                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= sin(0.0))))) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))));
                            continue;
                            if (_GLF_DEAD(false)) {
                                int donor_replacementGLF_dead9v = _GLF_FUZZED(-41277);
                                {
                                    donor_replacementGLF_dead9v = (4 * donor_replacementGLF_dead9v * (1000 - donor_replacementGLF_dead9v)) / 1000;
                                }
                            }
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = vec4(vec2(93.82, 315.995), GLF_dead3injectionSwitch);
                                    if (_GLF_DEAD(false)) {
                                        {
                                            break;
                                        }
                                    }
                                }
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = vec4(777.641, -683.857, 4.2, -7766.3017);
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = vec4(-4236.0480, 5.4, 90.92, -26.33);
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                    if (_GLF_WRAPPED_IF_FALSE(false)) {
                                    } else {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                            }
                            if (_GLF_DEAD(false)) {
                                for (int _injected_loop_counter = int(_GLF_ZERO(0.0, injectionSwitch.x)); _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
                                    if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < sqrt(0.0))))) {
                                    } else {
                                        if (_GLF_DEAD(false)) {
                                            int donor_replacementGLF_dead8i = _GLF_FUZZED(sign(i));
                                            do {
                                                if (_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead8i, 4)] >= 1.0) {
                                                    _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead8i, 4)] = _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead8i, 4)] * _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead8i, 4)];
                                                }
                                                donor_replacementGLF_dead8i++;
                                            } while (donor_replacementGLF_dead8i < findMSB(findLSB(i)));
                                        }
                                        if (_GLF_DEAD(false)) {
                                            {
                                                vec4 _GLF_outVarBackup_GLF_color;
                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                if (_GLF_DEAD(false)) {
                                                    for (j = 0; j < msb9; j++) {
                                                        msb10 = (4 * msb10 * (1000 - msb10)) / 1000;
                                                    }
                                                }
                                                _GLF_color = unpackSnorm4x8(124017u);
                                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                }
                                            }
                                            _GLF_color = _GLF_color;
                                            do {
                                                vec4 _GLF_outVarBackup_GLF_color;
                                                {
                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                    _GLF_color = vec4(193.956, -8.7, 4574.4242, 6.9);
                                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                    }
                                                }
                                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                    float donor_replacementGLF_dead8limit = _GLF_FUZZED(860.375);
                                                    float donor_replacementGLF_dead8s = _GLF_FUZZED(exp(5.4));
                                                    if (float(j) >= donor_replacementGLF_dead8limit) {
                                                        ;
                                                    }
                                                }
                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                    if (_GLF_outVarBackup_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(i, 4)] >= 1.0) {
                                                        _GLF_outVarBackup_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(i, 4)] = _GLF_outVarBackup_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(i, 4)] * _GLF_outVarBackup_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(i, 4)];
                                                    }
                                                }
                                                _GLF_color = vec4(280.673, -4.0, -790.184, -81.03);
                                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                    {
                                                        vec4 _GLF_outVarBackup_GLF_color;
                                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                                        _GLF_color = vec4(-872.816, 3.3, 16.84, -4905.1450);
                                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                        }
                                                    }
                                                }
                                            } while (_GLF_WRAPPED_LOOP(false));
                                        }
                                    }
                                }
                                if (_GLF_DEAD(false)) {
                                    int donor_replacementGLF_dead9v = _GLF_FUZZED(j);
                                    for (j = 0; j < msb9; j++) {
                                        donor_replacementGLF_dead9v = (4 * donor_replacementGLF_dead9v * (1000 - donor_replacementGLF_dead9v)) / 1000;
                                    }
                                }
                                float donor_replacementGLF_dead5limit = _GLF_FUZZED(3753.3089);
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < abs(0.0))))) {
                                    int donor_replacementGLF_dead9iters = _GLF_FUZZED(msb10);
                                    for (msb10 = 0; msb10 < donor_replacementGLF_dead9iters; msb10++) {
                                        _injected_loop_counter = (4 * _injected_loop_counter * (1000 - _injected_loop_counter)) / 1000;
                                    }
                                }
                                float donor_replacementGLF_dead5s = _GLF_FUZZED((+73.52));
                                do {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = vec4(138.772, 341.842, -0.5, 4.7);
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                } while (_GLF_WRAPPED_LOOP(false));
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < length(vec4(0.0, 0.0, 0.0, 0.0)))))) {
                                    vec4 donor_replacementGLF_dead8c = _GLF_FUZZED(dFdy(vec4(924.320, -9.6, -8715.2886, 7.4)));
                                    {
                                        if (donor_replacementGLF_dead8c[_GLF_MAKE_IN_BOUNDS_INT(j, 4)] >= 1.0) {
                                            donor_replacementGLF_dead8c[_GLF_MAKE_IN_BOUNDS_INT(j, 4)] = donor_replacementGLF_dead8c[_GLF_MAKE_IN_BOUNDS_INT(j, 4)] * donor_replacementGLF_dead8c[_GLF_MAKE_IN_BOUNDS_INT(j, 4)];
                                        }
                                        j++;
                                    }
                                }
                                if (float(msb10) >= donor_replacementGLF_dead5limit) {
                                    ;
                                }
                            }
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                do {
                                    _GLF_color = vec4(-3.9, -7.7, 854.797, 76.48);
                                } while (_GLF_WRAPPED_LOOP(false));
                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                    if (_GLF_WRAPPED_IF_FALSE(false)) {
                                    } else {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                        int donor_replacementGLF_dead9iters = _GLF_FUZZED((_injected_loop_counter % i));
                                        int donor_replacementGLF_dead9v = _GLF_FUZZED(msb10);
                                        for (_injected_loop_counter = 0; _injected_loop_counter < donor_replacementGLF_dead9iters; _injected_loop_counter++) {
                                            donor_replacementGLF_dead9v = (4 * donor_replacementGLF_dead9v * (1000 - donor_replacementGLF_dead9v)) / 1000;
                                        }
                                    }
                                }
                            }
                            for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
                                if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                        ivec2 donor_replacementGLF_dead6p = _GLF_FUZZED(ivec2(32968, -55188));
                                        {
                                            {
                                                vec4 _GLF_outVarBackup_GLF_color;
                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                _GLF_color = ldexp(vec4(5.1, 6.3, -1.6, 78.09), ivec4(97755, 27913, -64091, 13829));
                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                }
                                            }
                                            if (_GLF_DEAD(false)) {
                                                int donor_replacementGLF_dead8i = _GLF_FUZZED(_injected_loop_counter);
                                                float donor_replacementGLF_dead8limit = _GLF_FUZZED(min(exp(7.6), 9.5));
                                                float donor_replacementGLF_dead8ref = _GLF_FUZZED(-581.411);
                                                float donor_replacementGLF_dead8s = _GLF_FUZZED(acosh(-9.3));
                                                while (donor_replacementGLF_dead8i < bitfieldInsert(800, donor_replacementGLF_dead8i, 0, 0)) {
                                                    if (mod(float(donor_replacementGLF_dead8i), donor_replacementGLF_dead8ref) <= 0.01) {
                                                        donor_replacementGLF_dead8s += 0.2;
                                                    }
                                                    if (float(donor_replacementGLF_dead8i) >= donor_replacementGLF_dead8limit) {
                                                        ;
                                                    }
                                                    donor_replacementGLF_dead8i++;
                                                }
                                            }
                                            donor_replacementGLF_dead6p.x = -donor_replacementGLF_dead6p.x;
                                            {
                                                vec4 _GLF_outVarBackup_GLF_color;
                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                _GLF_color = acosh(vec4(-7013.3143, 5864.9410, 614.766, 509.272));
                                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                                    if (_GLF_DEAD(false)) {
                                                        if (uint(j) < uaddCarry(uint(msb9), 1u, uselessOutVariable)) {
                                                            continue;
                                                        }
                                                    }
                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                }
                                            }
                                        }
                                    }
                                } else {
                                    if (_GLF_DEAD(false)) {
                                        vec2 donor_replacementGLF_dead0a = _GLF_FUZZED(fwidthCoarse(unpackUnorm2x16(uselessOutVariable)));
                                        float donor_replacementGLF_dead0z = _GLF_FUZZED(2.0);
                                        if (_GLF_DEAD(false)) {
                                            vec4 donor_replacementGLF_dead8c = _GLF_FUZZED((+_GLF_color));
                                            int donor_replacementGLF_dead8i = _GLF_FUZZED((_injected_loop_counter ^ (-78148)));
                                            {
                                                donor_replacementGLF_dead8c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead8i, 4)] = donor_replacementGLF_dead8c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead8i, 4)] * donor_replacementGLF_dead8c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead8i, 4)];
                                            }
                                        }
                                        if (_GLF_DEAD(false)) {
                                            {
                                                vec4 _GLF_outVarBackup_GLF_color;
                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                _GLF_color = vec4(2.2, 5416.4154, -81.35, -176.782);
                                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                }
                                            }
                                            _GLF_color = _GLF_color;
                                            {
                                                vec4 _GLF_outVarBackup_GLF_color;
                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                _GLF_color = floor(vec4(12.06, -8421.8968, -5631.9553, 39.24));
                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                }
                                            }
                                        }
                                        if (_GLF_WRAPPED_IF_FALSE(false)) {
                                            {
                                                vec4 _GLF_outVarBackup_GLF_color;
                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                _GLF_color = uintBitsToFloat(uvec4(15488u, 27315u, 105324u, 166674u));
                                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                }
                                            }
                                            if (_GLF_DEAD(false)) {
                                                int donor_replacementGLF_dead9i = _GLF_FUZZED((int((uselessOutVariable % uselessOutVariable)) << i));
                                                int donor_replacementGLF_dead9v = _GLF_FUZZED(_injected_loop_counter);
                                                for (donor_replacementGLF_dead9i = 0; donor_replacementGLF_dead9i < _injected_loop_counter; donor_replacementGLF_dead9i++) {
                                                    donor_replacementGLF_dead9v = (4 * donor_replacementGLF_dead9v * (1000 - donor_replacementGLF_dead9v)) / 1000;
                                                }
                                            }
                                        } else {
                                            do {
                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                    if (_GLF_WRAPPED_IF_FALSE(false)) {
                                                    } else {
                                                        vec4 _GLF_outVarBackup_GLF_color;
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                            {
                                                                ;
                                                            }
                                                        }
                                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                                        _GLF_color = vec4(-137.632, -8127.7030, -717.546, -999.916);
                                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                            if (_GLF_WRAPPED_IF_FALSE(false)) {
                                                            } else {
                                                                if (_GLF_DEAD(false)) {
                                                                    if (_injected_loop_counter >= int(GLF_dead10resolution.x)) {
                                                                        break;
                                                                    }
                                                                }
                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                            }
                                                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                                _GLF_color = vec4(donor_replacementGLF_dead0z, vec3(-38.79, -65.37, 4.0));
                                                            }
                                                        }
                                                    }
                                                    donor_replacementGLF_dead0z = donor_replacementGLF_dead0a.x / donor_replacementGLF_dead0a.y;
                                                } else {
                                                    if (_GLF_DEAD(false)) {
                                                        vec2 donor_replacementGLF_dead9a = _GLF_FUZZED(resolution);
                                                        float donor_replacementGLF_dead9th = _GLF_FUZZED(length(round(_GLF_color)));
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                            {
                                                                i = (4 * i * (1000 - i)) / 1000;
                                                            }
                                                        }
                                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                            if (donor_replacementGLF_dead9a.y < donor_replacementGLF_dead9a.x) {
                                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                                        for (j = 0; j < j; j++) {
                                                                            j = (4 * j * (1000 - j)) / 1000;
                                                                        }
                                                                    }
                                                                    donor_replacementGLF_dead9th = 0.5 - donor_replacementGLF_dead9th;
                                                                } else {
                                                                }
                                                            }
                                                        } else {
                                                        }
                                                        {
                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                                {
                                                                    ;
                                                                }
                                                            }
                                                            _GLF_color = vec4(923.668, 3.5, -0.7, -0.9);
                                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                                                if (_GLF_WRAPPED_IF_FALSE(false)) {
                                                                    {
                                                                        vec4 _GLF_outVarBackup_GLF_color;
                                                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                        _GLF_color = vec4(-54.97, -6036.8705, 7.3, -501.602);
                                                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                        }
                                                                    }
                                                                } else {
                                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            } while (_GLF_WRAPPED_LOOP(false));
                                        }
                                    }
                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                        float donor_replacementGLF_dead9th = _GLF_FUZZED(-4931.9450);
                                        if (_GLF_DEAD(false)) {
                                            int donor_replacementGLF_dead9iters = _GLF_FUZZED(msb10);
                                            for (j = 0; j < donor_replacementGLF_dead9iters; j++) {
                                                i = (4 * i * (1000 - i)) / 1000;
                                            }
                                        }
                                        if (_GLF_WRAPPED_IF_FALSE(false)) {
                                        } else {
                                            if (_GLF_WRAPPED_IF_FALSE(_GLF_IDENTITY(false, false || (false)))) {
                                            } else {
                                                donor_replacementGLF_dead9th = 0.5 - donor_replacementGLF_dead9th;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        bool doSwap = checkSwap(data[i], data[j]);
                        if (_GLF_WRAPPED_IF_FALSE(false)) {
                        } else {
                            if (_GLF_DEAD(false)) {
                                float donor_replacementGLF_dead8limit = _GLF_FUZZED((doSwap ? clamp(-6.0, 2.9, 13.26) : (-7548.4842)));
                                float donor_replacementGLF_dead8ref = _GLF_FUZZED(2004.3786);
                                float donor_replacementGLF_dead8s = _GLF_FUZZED(min(-4.9, -1.9));
                                while (i < bitfieldInsert(800, i, 0, 0)) {
                                    if (mod(float(i), donor_replacementGLF_dead8ref) <= 0.01) {
                                        donor_replacementGLF_dead8s += 0.2;
                                    }
                                    if (float(i) >= donor_replacementGLF_dead8limit) {
                                        ;
                                    }
                                    i++;
                                }
                            }
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = vec4(-5483.6658, -3.4, -0.1, -4.2);
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                    if (_GLF_DEAD(false)) {
                                        for (msb9 = 0; msb9 < j; msb9++) {
                                            msb10 = (4 * msb10 * (1000 - msb10)) / 1000;
                                        }
                                    }
                                    _GLF_color = vec4(590.729, -2.2, -8.8, 8.6);
                                } else {
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        _GLF_color = vec4(-5268.5842, -8793.7414, 4.5, -283.008);
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                            if (_GLF_DEAD(false)) {
                                                vec4 donor_replacementGLF_dead8c = _GLF_FUZZED(vec4(30.40, 2.7, -2.9, 7873.7800));
                                                if (donor_replacementGLF_dead8c[_GLF_MAKE_IN_BOUNDS_INT(i, 4)] >= 1.0) {
                                                    donor_replacementGLF_dead8c[_GLF_MAKE_IN_BOUNDS_INT(i, 4)] = donor_replacementGLF_dead8c[_GLF_MAKE_IN_BOUNDS_INT(i, 4)] * donor_replacementGLF_dead8c[_GLF_MAKE_IN_BOUNDS_INT(i, 4)];
                                                }
                                            }
                                        }
                                    }
                                    if (_GLF_DEAD(false)) {
                                        if (_GLF_outVarBackup_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(msb10, 4)] >= 1.0) {
                                            _GLF_outVarBackup_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(msb10, 4)] = _GLF_outVarBackup_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(msb10, 4)] * _GLF_outVarBackup_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(msb10, 4)];
                                        }
                                    }
                                }
                            }
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                        if (doSwap) {
                            float temp = data[i];
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < determinant(mat2(0.0, determinant(mat2(0.0, 1.0, 0.0, 0.0)), sin(0.0), 0.0)))))) {
                                for (msb10 = 0; msb10 < _injected_loop_counter; msb10++) {
                                    j = (4 * j * (1000 - j)) / 1000;
                                }
                            }
                            do {
                                for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
                                    if (_GLF_DEAD(_GLF_IDENTITY(false, (false) && true))) {
                                        if (float(msb10) >= temp) {
                                            ;
                                        }
                                    }
                                    data[i] = data[j];
                                }
                            } while (_GLF_WRAPPED_LOOP(false));
                            data[j] = temp;
                        }
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = vec4(-6725.5025, 351.175, 3.0, -2.3);
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= length(vec2(0.0, 0.0)))))) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                    }
                } else {
                }
            }
            i++;
        } while (i < findMSB(msb9));
    }
    {
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        _GLF_color = vec4(-93.26, 357.406, -3607.6839, -8935.0940);
        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
    }
    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
            if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            } else {
                _GLF_color = tanh(vec4(177.979, 530.751, -5045.9116, 491.424));
            }
            do {
                if (_GLF_DEAD(false)) {
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                        } else {
                        }
                        _GLF_color = dFdxFine(vec4(-7655.6817, -9.5, -72.08, 8.9));
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = vec4(-9.7, 340.547, -64.62, -5.3);
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    vec4 donor_replacementGLF_dead8c = _GLF_FUZZED(_GLF_outVarBackup_GLF_color);
                                    if (donor_replacementGLF_dead8c[_GLF_MAKE_IN_BOUNDS_INT(i, 4)] >= 1.0) {
                                        donor_replacementGLF_dead8c[_GLF_MAKE_IN_BOUNDS_INT(i, 4)] = donor_replacementGLF_dead8c[_GLF_MAKE_IN_BOUNDS_INT(i, 4)] * donor_replacementGLF_dead8c[_GLF_MAKE_IN_BOUNDS_INT(i, 4)];
                                    }
                                }
                                if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(true, !(!(_GLF_IDENTITY(true, (true) && true)))))) {
                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                        for (msb9 = 0; msb9 < msb10; msb9++) {
                                            msb10 = (4 * msb10 * (1000 - msb10)) / 1000;
                                        }
                                    }
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                            do {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            } while (_GLF_WRAPPED_LOOP(false));
                        }
                    }
                    _GLF_color = vec4(7.8, 27.44, 8.1, -577.122).spss;
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            {
                                i = (4 * i * (1000 - i)) / 1000;
                            }
                        }
                        _GLF_color = vec4(3.0, -2996.0262, 3283.6246, 8.7);
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                            if (_GLF_DEAD(false)) {
                                int donor_replacementGLF_dead9i = _GLF_FUZZED(-42531);
                                int donor_replacementGLF_dead9iters = _GLF_FUZZED(i);
                                for (donor_replacementGLF_dead9i = 0; donor_replacementGLF_dead9i < donor_replacementGLF_dead9iters; donor_replacementGLF_dead9i++) {
                                    msb10 = (4 * msb10 * (1000 - msb10)) / 1000;
                                }
                            }
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                }
            } while (_GLF_WRAPPED_LOOP(false));
        }
    } else {
    }
    if (gl_FragCoord.x < resolution.x / 2.0) {
        if (_GLF_DEAD(false)) {
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(9952.4493, 7575.3903, 253.695, -5498.4837);
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                _GLF_color = ((false ? mat2x4(7.1, 75.31, -203.796, 0.6, -7868.7001, 1883.5465, -7.7, -6.5) : mat2x4(-30.53, -95.68, 1.8, 70.77, 90.09, -2.0, -9494.0862, 3.7)) * GLF_dead3injectionSwitch);
            } else {
            }
        }
        if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
        } else {
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = asinh(vec4(522.055, 8310.1372, -641.702, 429.285));
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    if (_GLF_DEAD(false)) {
                        int donor_replacementGLF_dead9iters = _GLF_FUZZED(abs(msb10));
                        for (msb10 = 0; msb10 < donor_replacementGLF_dead9iters; msb10++) {
                            msb9 = (4 * msb9 * (1000 - msb9)) / 1000;
                        }
                    }
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
                _GLF_color = vec4(data[findMSB(1)] / 10.0, data[findLSB(32)] / 10.0, data[findMSB(msb9)] / 10.0, 1.0);
            }
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < abs(0.0))))) {
                    int donor_replacementGLF_dead5i = _GLF_FUZZED(int((mat4x2(3.6, 4.5, 1.2, -5.6, 214.727, 0.3, -493.176, -14.13), 7.6)));
                    if (_GLF_DEAD(false)) {
                        if (donor_replacementGLF_dead5i < int(GLF_dead10gl_FragCoord.x)) {
                            ;
                        }
                    }
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        for (int _injected_loop_counter = (0 | 1); _GLF_WRAPPED_LOOP(_injected_loop_counter > int(_GLF_ZERO(0.0, injectionSwitch.x))); _injected_loop_counter--) {
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                        }
                        _GLF_color = vec4(3.7, 2.2, -5165.2012, -1.7);
                        do {
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = vec4(4802.8353, 22.91, -3.7, -8.0);
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                        } while (_GLF_WRAPPED_LOOP(false));
                    }
                    {
                        if (_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead5i, 4)] >= 1.0) {
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= sin(0.0))))) {
                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                    _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead5i, 4)] = _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead5i, 4)] * _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead5i, 4)];
                                } else {
                                }
                            } else {
                            }
                        }
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            if (_GLF_DEAD(false)) {
                                int donor_replacementGLF_dead9iters = _GLF_FUZZED(i);
                                for (donor_replacementGLF_dead5i = 0; donor_replacementGLF_dead5i < donor_replacementGLF_dead9iters; donor_replacementGLF_dead5i++) {
                                    msb10 = (4 * msb10 * (1000 - msb10)) / 1000;
                                }
                            }
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = fract(vec4(4.3, 7.4, 7.6, 2.4));
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            _GLF_color = radians(_GLF_color);
                        }
                    }
                }
            } else {
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = (acosh(-2857.2280) * vec4(50.16, -7.0, -4.0, -9.2));
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < length(vec2(_GLF_ZERO(0.0, injectionSwitch.x), _GLF_ZERO(0.0, injectionSwitch.x))))))) {
                    {
                        i = (4 * i * (1000 - i)) / 1000;
                    }
                }
            }
        }
    } else {
        {
            vec4 _GLF_outVarBackup_GLF_color;
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = exp(vec4(7338.9965, 8.0, -813.724, -1342.4567));
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                    if (_GLF_DEAD(false)) {
                        float donor_replacementGLF_dead8limit = _GLF_FUZZED(dot(365.907, 258.615));
                        float donor_replacementGLF_dead8s = _GLF_FUZZED(1799.5549);
                        if (float(msb9) >= donor_replacementGLF_dead8limit) {
                            ;
                        }
                    }
                }
            }
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(-956.404, 3.5, -977.134, -4786.3118);
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(297.939, -558.250, 1.1, 1.0);
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            if (_GLF_DEAD(false)) {
                if (_GLF_DEAD(false)) {
                    vec2 donor_replacementGLF_dead9a = _GLF_FUZZED(injectionSwitch);
                    float donor_replacementGLF_dead9th = _GLF_FUZZED(6960.4086);
                    if (donor_replacementGLF_dead9a.y < donor_replacementGLF_dead9a.x) {
                        donor_replacementGLF_dead9th = 0.5 - donor_replacementGLF_dead9th;
                    }
                }
                float donor_replacementGLF_dead5s = _GLF_FUZZED(asin(dFdx(determinant(mat3(36.09, -275.474, 3.6, 93.78, 35.30, -11.22, 1.4, 2241.3588, -1.0)))));
                {
                    ;
                }
            }
            if (_GLF_DEAD(false)) {
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    for (msb10 = 0; msb10 < i; msb10++) {
                        msb10 = (4 * msb10 * (1000 - msb10)) / 1000;
                    }
                }
                _GLF_color = (_GLF_color / _GLF_color);
            }
            if (_GLF_DEAD(false)) {
                int donor_replacementGLF_dead6i = _GLF_FUZZED(-56354);
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(17.20, 4175.2461, 1064.6615, 1434.0495);
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                int donor_replacementGLF_dead6v = _GLF_FUZZED(msb10);
                for (donor_replacementGLF_dead6i = 0; donor_replacementGLF_dead6i < msb9; donor_replacementGLF_dead6i++) {
                    donor_replacementGLF_dead6v = (4 * donor_replacementGLF_dead6v * (1000 - donor_replacementGLF_dead6v)) / 1000;
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = ((-694.072) * vec4(-147.531, -6.7, 9745.9400, 6.9));
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= abs(0.0))))) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        {
                            msb9 = (4 * msb9 * (1000 - msb9)) / 1000;
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        {
                            ;
                            if (_GLF_DEAD(false)) {
                                _GLF_color = reflect(_GLF_outVarBackup_GLF_color, _GLF_outVarBackup_GLF_color);
                            }
                        }
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = vec4(-16.96, 42.60, 2788.5612, 76.73);
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        int donor_replacementGLF_dead9iters = _GLF_FUZZED(msb10);
                        for (donor_replacementGLF_dead6v = 0; donor_replacementGLF_dead6v < donor_replacementGLF_dead9iters; donor_replacementGLF_dead6v++) {
                            i = (4 * i * (1000 - i)) / 1000;
                        }
                    }
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    vec2 donor_replacementGLF_dead9a = _GLF_FUZZED(resolution);
                    float donor_replacementGLF_dead9z = _GLF_FUZZED(5.0);
                    {
                        donor_replacementGLF_dead9z = donor_replacementGLF_dead9a.y / donor_replacementGLF_dead9a.x;
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        {
                            i = (4 * i * (1000 - i)) / 1000;
                        }
                    }
                }
            }
            for (int _injected_loop_counter = (0 ^ 0); _GLF_WRAPPED_LOOP(_injected_loop_counter < (1 & int(_GLF_ONE(1.0, injectionSwitch.y)))); _injected_loop_counter++) {
                if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    {
                        do {
                            if (_GLF_DEAD(false)) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                if (_GLF_DEAD(_GLF_IDENTITY(false, !(!(false))))) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                        } while (_GLF_WRAPPED_LOOP(false));
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        if (_GLF_WRAPPED_IF_FALSE(false)) {
                        } else {
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                _GLF_color = vec4(7.6, -0.9, -139.152, -32.20);
                            } else {
                                if (_GLF_DEAD(false)) {
                                    {
                                        i = (4 * i * (1000 - i)) / 1000;
                                    }
                                }
                            }
                            if (_GLF_DEAD(false)) {
                                _GLF_color = vec4(-2.4, 7.2, -2.8, 6947.1716);
                            }
                        }
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = step(vec4(step(vec3(0.5, 2.4, -812.243), vec3(-34.27, -2.7, -18.72)), sin(-3.8)), vec4(-2.5, -643.895, -2168.4579, 4.3));
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                            if (_GLF_DEAD(false)) {
                                for (_injected_loop_counter = 0; _injected_loop_counter < msb10; _injected_loop_counter++) {
                                    i = (4 * i * (1000 - i)) / 1000;
                                }
                            }
                        }
                        if (_GLF_DEAD(_GLF_IDENTITY(false, (false) && true))) {
                            {
                                i = (4 * i * (1000 - i)) / 1000;
                            }
                        }
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = vec4(-3945.3274, -68.44, -52.97, 8.0);
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                    }
                } else {
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = fwidth(vec4(1778.5359, -4.1, 3.2, -48.10));
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    for (int _injected_loop_counter = _GLF_IDENTITY(0, max(0, 0)); _GLF_WRAPPED_LOOP(_injected_loop_counter != ((1 << _GLF_IDENTITY(int(6), _GLF_IDENTITY(int(6), clamp(int(6), int(6), int(6))))) >> _GLF_IDENTITY(int(6), int(6)))); _injected_loop_counter++) {
                        for (int _injected_loop_counter = (0 >> _GLF_IDENTITY(int(2), int(2))); _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            {
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                    {
                                        msb9 = (4 * msb9 * (1000 - msb9)) / 1000;
                                    }
                                }
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = dFdxCoarse(vec4(92.97, -9.7, 570.938, -6.7));
                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= sin(0.0))))) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        ivec2 donor_replacementGLF_dead6p = _GLF_FUZZED((+ivec2(-27835, 10586)));
                        for (int _injected_loop_counter = (0 << _GLF_IDENTITY(int(5), int(5))); _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
                            while (donor_replacementGLF_dead6p.x > 15) {
                                donor_replacementGLF_dead6p.x -= 16;
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                float donor_replacementGLF_dead8s = _GLF_FUZZED(645.542);
                                {
                                    donor_replacementGLF_dead8s += 0.2;
                                }
                            }
                        }
                        if (_GLF_DEAD(false)) {
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                {
                                    msb10 = (4 * msb10 * (1000 - msb10)) / 1000;
                                }
                            }
                            _GLF_color = vec4(-8149.7513, -4796.5939, -544.795, 733.800);
                        }
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = dFdyCoarse(vec4(-17.80, -351.511, -119.699, 58.80));
                            if (_GLF_WRAPPED_IF_FALSE(false)) {
                            } else {
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                            if (_GLF_DEAD(false)) {
                                {
                                    if (_GLF_outVarBackup_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(i, 4)] >= 1.0) {
                                        _GLF_outVarBackup_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(i, 4)] = _GLF_outVarBackup_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(i, 4)] * _GLF_outVarBackup_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(i, 4)];
                                    }
                                    i++;
                                }
                            }
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                if (_GLF_DEAD(false)) {
                                    {
                                        msb10 = (4 * msb10 * (1000 - msb10)) / 1000;
                                    }
                                }
                                _GLF_color = acosh(vec4(508.447, 8463.7736, -135.523, 602.883));
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                        }
                    }
                }
                for (int _injected_loop_counter = (1 | int(_GLF_ONE(1.0, injectionSwitch.y))); _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
                    if (_GLF_DEAD(false)) {
                        _GLF_color = (_GLF_color - _GLF_color);
                    }
                }
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = (mat2x4(-9.5, -88.37, 579.923, -2330.2748, 3.1, -6.8, 0.9, 4.4) * vec2(-0.6, -25.59));
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
            }
            for (int _injected_loop_counter = (1 | 1); _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
                do {
                    vec4 _GLF_outVarBackup_GLF_color;
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(31.70, 508.262, 7.3, -9.8);
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        float donor_replacementGLF_dead8s = _GLF_FUZZED(ldexp(153.125, bitCount(107201u)));
                        {
                            donor_replacementGLF_dead8s += 0.2;
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    if (_GLF_DEAD(_GLF_IDENTITY(false, (false) && true))) {
                        vec4 donor_replacementGLF_dead8c = _GLF_FUZZED(fract(_GLF_outVarBackup_GLF_color));
                        int donor_replacementGLF_dead8msb8 = _GLF_FUZZED(int(-1.3));
                        do {
                            if (donor_replacementGLF_dead8c[_GLF_MAKE_IN_BOUNDS_INT(msb9, 4)] >= 1.0) {
                                donor_replacementGLF_dead8c[_GLF_MAKE_IN_BOUNDS_INT(msb9, 4)] = donor_replacementGLF_dead8c[_GLF_MAKE_IN_BOUNDS_INT(msb9, 4)] * donor_replacementGLF_dead8c[_GLF_MAKE_IN_BOUNDS_INT(msb9, 4)];
                            }
                            msb9++;
                        } while (msb9 < findMSB(findLSB(donor_replacementGLF_dead8msb8)));
                    }
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = vec4(7349.2262, -6625.9048, 4.0, 39.18);
                    } else {
                    }
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                        {
                            if (_GLF_DEAD(false)) {
                                float donor_replacementGLF_dead8limit = _GLF_FUZZED(-578.192);
                                float donor_replacementGLF_dead8ref = _GLF_FUZZED(4.0);
                                float donor_replacementGLF_dead8s = _GLF_FUZZED(distance(dFdxFine(vec3(4146.6646, 477.026, -442.060)), vec3(2663.5392, -378.250, 3435.4868)));
                                while (_injected_loop_counter < bitfieldInsert(800, _injected_loop_counter, 0, 0)) {
                                    if (mod(float(_injected_loop_counter), donor_replacementGLF_dead8ref) <= 0.01) {
                                        donor_replacementGLF_dead8s += 0.2;
                                    }
                                    if (float(_injected_loop_counter) >= donor_replacementGLF_dead8limit) {
                                        ;
                                    }
                                    _injected_loop_counter++;
                                }
                            }
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = mat3x4(7889.2147, 91.34, 6.3, 6.0, 7960.8763, 0.9, -697.893, -5054.0347, -5044.0157, -3.8, -202.178, -4.3)[0];
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                    }
                } while (_GLF_WRAPPED_LOOP(false));
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < sqrt(0.0))))) {
                    float donor_replacementGLF_dead5s = _GLF_FUZZED(-0.8);
                    if (_GLF_DEAD(false)) {
                        _GLF_color = clamp(_GLF_color, donor_replacementGLF_dead5s, donor_replacementGLF_dead5s);
                    }
                    if (_GLF_DEAD(false)) {
                        int donor_replacementGLF_dead9v = _GLF_FUZZED(msb10);
                        {
                            donor_replacementGLF_dead9v = (4 * donor_replacementGLF_dead9v * (1000 - donor_replacementGLF_dead9v)) / 1000;
                        }
                    }
                    {
                        if (_GLF_DEAD(false)) {
                            for (_injected_loop_counter = 0; _injected_loop_counter < msb10; _injected_loop_counter++) {
                                _injected_loop_counter = (4 * _injected_loop_counter * (1000 - _injected_loop_counter)) / 1000;
                            }
                        }
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                _GLF_color = vec4(6028.1563, 3.5, 72.38, 5291.5913);
                            }
                            _GLF_color = min(vec4(8815.7861, -435.103, 9125.6439, 2.9), -7069.3681);
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < length(vec2(0.0, 0.0)))))) {
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                    float donor_replacementGLF_dead8s = _GLF_FUZZED(round(7.5));
                                    {
                                        donor_replacementGLF_dead8s += 0.2;
                                    }
                                }
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                    {
                                        discard;
                                    }
                                }
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                            if (_GLF_WRAPPED_IF_FALSE(false)) {
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    float donor_replacementGLF_dead8ref = _GLF_FUZZED(smoothstep(donor_replacementGLF_dead5s, 36.88, donor_replacementGLF_dead5s));
                                    if (mod(float(_injected_loop_counter), donor_replacementGLF_dead8ref) <= 0.01) {
                                        donor_replacementGLF_dead5s += 0.2;
                                    }
                                }
                            } else {
                                if (_GLF_DEAD(false)) {
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        _GLF_color = sin(vec4(-888.357, -9.7, -104.104, -8.1));
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                    }
                                    ivec2 donor_replacementGLF_dead6p = _GLF_FUZZED((ivec2(-21758, -68637)));
                                    while (donor_replacementGLF_dead6p.x > 15) {
                                        donor_replacementGLF_dead6p.x -= 16;
                                        {
                                            vec4 _GLF_outVarBackup_GLF_color;
                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                            _GLF_color = vec4(-18.93, intBitsToFloat(ivec3(43323, 31130, 25911)));
                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                            }
                                        }
                                        {
                                            vec4 _GLF_outVarBackup_GLF_color;
                                            for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != (0 << _GLF_IDENTITY(int(6), _GLF_IDENTITY(int(6), (int(6)) | 0)))); _injected_loop_counter--) {
                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                if (_GLF_DEAD(false)) {
                                                    {
                                                        msb10 = (4 * msb10 * (1000 - msb10)) / 1000;
                                                    }
                                                }
                                            }
                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                _GLF_color = vec4(-40.70, -1.8, -7.7, 979.909);
                                                if (_GLF_DEAD(false)) {
                                                    vec4 donor_replacementGLF_dead8c = _GLF_FUZZED(ceil(round(_GLF_color)));
                                                    int donor_replacementGLF_dead8msb8 = _GLF_FUZZED(msb9);
                                                    do {
                                                        if (donor_replacementGLF_dead8c[_GLF_MAKE_IN_BOUNDS_INT(i, 4)] >= 1.0) {
                                                            donor_replacementGLF_dead8c[_GLF_MAKE_IN_BOUNDS_INT(i, 4)] = donor_replacementGLF_dead8c[_GLF_MAKE_IN_BOUNDS_INT(i, 4)] * donor_replacementGLF_dead8c[_GLF_MAKE_IN_BOUNDS_INT(i, 4)];
                                                        }
                                                        i++;
                                                    } while (i < findMSB(findLSB(donor_replacementGLF_dead8msb8)));
                                                }
                                            } else {
                                            }
                                            do {
                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                }
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                    vec4 donor_replacementGLF_dead8c = _GLF_FUZZED((vec4(-2462.7418, -5.9, 4636.2695, 808.476) + _GLF_outVarBackup_GLF_color));
                                                    int donor_replacementGLF_dead8i = _GLF_FUZZED(_injected_loop_counter);
                                                    {
                                                        if (donor_replacementGLF_dead8c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead8i, 4)] >= 1.0) {
                                                            donor_replacementGLF_dead8c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead8i, 4)] = donor_replacementGLF_dead8c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead8i, 4)] * donor_replacementGLF_dead8c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead8i, 4)];
                                                        }
                                                        donor_replacementGLF_dead8i++;
                                                    }
                                                }
                                            } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))));
                                            {
                                                vec4 _GLF_outVarBackup_GLF_color;
                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                _GLF_color = vec4(66.36, -70.71, 6255.3330, -460.411);
                                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                    int donor_replacementGLF_dead8i = _GLF_FUZZED(_injected_loop_counter);
                                                    {
                                                        _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead8i, 4)] = _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead8i, 4)] * _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead8i, 4)];
                                                    }
                                                }
                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                        int donor_replacementGLF_dead8i = _GLF_FUZZED(int(roundEven(533.780)));
                                                        float donor_replacementGLF_dead8ref = _GLF_FUZZED(fract(donor_replacementGLF_dead5s));
                                                        while (donor_replacementGLF_dead8i < bitfieldInsert(800, donor_replacementGLF_dead8i, 0, 0)) {
                                                            if (mod(float(donor_replacementGLF_dead8i), donor_replacementGLF_dead8ref) <= 0.01) {
                                                                donor_replacementGLF_dead5s += 0.2;
                                                            }
                                                            if (float(donor_replacementGLF_dead8i) >= donor_replacementGLF_dead5s) {
                                                                ;
                                                            }
                                                            donor_replacementGLF_dead8i++;
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                        int donor_replacementGLF_dead9iters = _GLF_FUZZED((bitCount(uselessOutVariable) >> bitfieldInsert(7365, ivec3(53141, 87498, -46539).p, 3187, _injected_loop_counter)));
                                        for (i = 0; i < donor_replacementGLF_dead9iters; i++) {
                                            _injected_loop_counter = (4 * _injected_loop_counter * (1000 - _injected_loop_counter)) / 1000;
                                        }
                                    }
                                }
                            }
                        }
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = (transpose(mat4x3(63.79, -5.9, 175.997, 83.94, 4.0, -2.0, 859.570, -7.8, -30.69, 4.1, -4.0, 8.3)) * vec3(1508.7993, 702.784, -2.1));
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            for (int _injected_loop_counter = ((-21993) & 0); _GLF_WRAPPED_LOOP(_injected_loop_counter != int(_GLF_ONE(1.0, injectionSwitch.y))); _injected_loop_counter++) {
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                            }
                            if (_GLF_DEAD(false)) {
                                {
                                    i = (4 * i * (1000 - i)) / 1000;
                                }
                            }
                            if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                            } else {
                                do {
                                    _GLF_color = fwidth(vec4(-3.1, -708.788, 7.5, 3.0));
                                } while (_GLF_WRAPPED_LOOP(false));
                            }
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                if (_GLF_DEAD(false)) {
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < sqrt(0.0))))) {
                                        {
                                            donor_replacementGLF_dead5s += 0.2;
                                        }
                                    }
                                    _GLF_color = _GLF_color;
                                }
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                {
                                    msb10 = (4 * msb10 * (1000 - msb10)) / 1000;
                                }
                            }
                        }
                        donor_replacementGLF_dead5s += 0.2;
                    }
                }
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = trunc(vec4(2763.3866, -0.8, 7.0, 575.782));
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = vec4(-5.2, -8.3, -59.71, -404.334);
                } else {
                }
            }
            if (_GLF_DEAD(false)) {
                for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
                    if ((i & 1) == 1) {
                        i = 3 * i + 1;
                    } else {
                        do {
                            if (_GLF_WRAPPED_IF_FALSE(false)) {
                            } else {
                                i /= 2;
                            }
                        } while (_GLF_WRAPPED_LOOP(false));
                    }
                    msb10++;
                    if (_GLF_DEAD(_GLF_IDENTITY(false, !(!(_GLF_IDENTITY(false, bool(bvec3(false, false, true)))))))) {
                        float donor_replacementGLF_dead8s = _GLF_FUZZED(244.144);
                        {
                            donor_replacementGLF_dead8s += 0.2;
                        }
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = vec4(1919.2886, 0.0, 417.908, 0.6);
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                        float donor_replacementGLF_dead9th = _GLF_FUZZED(-8994.6714);
                        do {
                            donor_replacementGLF_dead9th = -donor_replacementGLF_dead9th;
                        } while (_GLF_WRAPPED_LOOP(false));
                        if (_GLF_DEAD(false)) {
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                {
                                    _GLF_outVarBackup_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(msb10, 4)] = _GLF_outVarBackup_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(msb10, 4)] * _GLF_outVarBackup_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(msb10, 4)];
                                }
                            }
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                _GLF_color = _GLF_color;
                            } else {
                            }
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        _GLF_color = (mat4(81.64, 66.49, 6.1, 6.5, 163.431, -15.72, -7.5, 8974.6527, 3.4, 5.5, -9.2, 5.6, -6.0, -804.524, 273.461, -5.9) * pow(_GLF_outVarBackup_GLF_color, sign(_GLF_color)));
                    }
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    if (_GLF_outVarBackup_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(msb10, 4)] >= 1.0) {
                        _GLF_outVarBackup_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(msb10, 4)] = _GLF_outVarBackup_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(msb10, 4)] * _GLF_outVarBackup_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(msb10, 4)];
                    }
                }
            }
            for (int _injected_loop_counter = ((1 << _GLF_IDENTITY(int(1), int(1))) >> _GLF_IDENTITY(int(1), int(1))); _GLF_WRAPPED_LOOP(_injected_loop_counter > _GLF_IDENTITY(0, ~(~(0)))); _injected_loop_counter--) {
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    for (msb9 = 0; msb9 < msb9; msb9++) {
                        msb10 = (4 * msb10 * (1000 - msb10)) / 1000;
                    }
                }
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = asinh(vec4(4898.8008, 683.244, 2868.8222, -25.89));
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                            ivec2 donor_replacementGLF_dead6p = _GLF_FUZZED(ivec2(94191, 73742));
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < sqrt(0.0))))) {
                                _GLF_color = vec4(-476.259, 3043.3297, -6874.3608, -424.645);
                            }
                            for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = asinh(exp(vec4(-653.157, -1.3, 3.8, 41.66)));
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = fwidth(_GLF_color);
                                    if (_GLF_DEAD(false)) {
                                        vec4 donor_replacementGLF_dead8c = _GLF_FUZZED(vec4(-494.795, -7285.0409, -1.1, -271.297));
                                        int donor_replacementGLF_dead8i = _GLF_FUZZED(msb10);
                                        if (donor_replacementGLF_dead8c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead8i, 4)] >= 1.0) {
                                            donor_replacementGLF_dead8c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead8i, 4)] = donor_replacementGLF_dead8c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead8i, 4)] * donor_replacementGLF_dead8c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead8i, 4)];
                                        }
                                    }
                                }
                                donor_replacementGLF_dead6p = GLF_dead6iter(donor_replacementGLF_dead6p);
                            }
                            if (_GLF_DEAD(false)) {
                                int donor_replacementGLF_dead9i = _GLF_FUZZED(85094);
                                for (donor_replacementGLF_dead9i = 0; donor_replacementGLF_dead9i < i; donor_replacementGLF_dead9i++) {
                                    msb10 = (4 * msb10 * (1000 - msb10)) / 1000;
                                }
                            }
                        }
                        _GLF_color = vec4(vec2(2.6, -5812.4105), -2462.6560, smoothstep(((-5.1) + 95.76), 5009.3498, 20.59));
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            for (msb10 = 0; msb10 < i; msb10++) {
                                _injected_loop_counter = (4 * _injected_loop_counter * (1000 - _injected_loop_counter)) / 1000;
                            }
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        vec4 donor_replacementGLF_dead8c = _GLF_FUZZED(_GLF_outVarBackup_GLF_color);
                        if (donor_replacementGLF_dead8c[_GLF_MAKE_IN_BOUNDS_INT(_injected_loop_counter, 4)] >= 1.0) {
                            donor_replacementGLF_dead8c[_GLF_MAKE_IN_BOUNDS_INT(_injected_loop_counter, 4)] = donor_replacementGLF_dead8c[_GLF_MAKE_IN_BOUNDS_INT(_injected_loop_counter, 4)] * donor_replacementGLF_dead8c[_GLF_MAKE_IN_BOUNDS_INT(_injected_loop_counter, 4)];
                        }
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        _GLF_color = dFdxCoarse(vec4(94.16, 150.221, -8.9, 6.9));
                    }
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(4596.9541, -5524.4963, 6079.8223, -2775.6655);
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                            if (_GLF_DEAD(false)) {
                                {
                                    continue;
                                }
                            }
                        }
                    }
                    if (_GLF_WRAPPED_IF_FALSE(false)) {
                    } else {
                        if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < log(1.0))))) {
                        } else {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                }
            }
            if (_GLF_DEAD(false)) {
                if ((msb10 & 1) == 1) {
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < abs(0.0))))) {
                            float donor_replacementGLF_dead8limit = _GLF_FUZZED(15.29);
                            float donor_replacementGLF_dead8s = _GLF_FUZZED(sqrt(tanh(-40.00)));
                            if (float(msb10) >= donor_replacementGLF_dead8limit) {
                                ;
                            }
                        }
                        _GLF_color = vec4(2.3, -272.119, -413.283, 755.957);
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = vec4(-0.6, 5003.8749, -37.83, -9.2);
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                if (_GLF_DEAD(_GLF_IDENTITY(false, false || (false)))) {
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        _GLF_color = vec4(-75.28, -5.7, -7.5, 5636.6682);
                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)), _GLF_IDENTITY(bool(bvec4(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)), false, false, true)), false || (bool(bvec4(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)), false, false, true))))))) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                    }
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                            if (_GLF_DEAD(false)) {
                                ivec2 donor_replacementGLF_dead6p = _GLF_FUZZED(clamp(ivec2(8178, -98256), (i % 4508), msb10));
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = (mat3x4(6.1, 0.4, 1.3, 6.3, 5.7, 33.65, 1.3, -3074.6433, -10.77, -6.3, 0.9, -8.7) * vec3(89.64, -2.5, -2.2));
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                        if (_GLF_DEAD(false)) {
                                            int donor_replacementGLF_dead8i = _GLF_FUZZED(-62283);
                                            float donor_replacementGLF_dead8ref = _GLF_FUZZED(-9.2);
                                            float donor_replacementGLF_dead8s = _GLF_FUZZED(9.2);
                                            if (mod(float(donor_replacementGLF_dead8i), donor_replacementGLF_dead8ref) <= 0.01) {
                                                donor_replacementGLF_dead8s += 0.2;
                                            }
                                        }
                                    }
                                }
                                if (donor_replacementGLF_dead6p.x < 0) {
                                    donor_replacementGLF_dead6p.x = -donor_replacementGLF_dead6p.x;
                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                        float donor_replacementGLF_dead8limit = _GLF_FUZZED(739.551);
                                        float donor_replacementGLF_dead8ref = _GLF_FUZZED(atan(0.9));
                                        float donor_replacementGLF_dead8s = _GLF_FUZZED((-6.9));
                                        {
                                            if (mod(float(msb9), donor_replacementGLF_dead8ref) <= 0.01) {
                                                donor_replacementGLF_dead8s += 0.2;
                                            }
                                            if (float(msb9) >= donor_replacementGLF_dead8limit) {
                                                ;
                                            }
                                            msb9++;
                                        }
                                    }
                                }
                            }
                        }
                        msb10 = 3 * msb10 + 1;
                        {
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = vec4(41.74, 87.74, 7104.2444, 9.7);
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                        if (_GLF_outVarBackup_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(msb9, 4)] >= 1.0) {
                                            _GLF_outVarBackup_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(msb9, 4)] = _GLF_outVarBackup_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(msb9, 4)] * _GLF_outVarBackup_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(msb9, 4)];
                                        }
                                    }
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                            vec4 _GLF_outVarBackup_GLF_color;
                            if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = vec4(2.3, -6.6, -678.458, -5.6);
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                            } else {
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                            }
                            _GLF_color = dFdyCoarse(vec4(-671.811, -8.9, 493.444, -6.2));
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = ((vec4(-72.09, -8277.0049, 80.11, -5666.3369) - vec4(6.4, -7929.3699, -371.077, -6.6)));
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                    } else {
                        if (_GLF_DEAD(false)) {
                            int donor_replacementGLF_dead9v = _GLF_FUZZED(msb9);
                            for (i = 0; i < msb9; i++) {
                                donor_replacementGLF_dead9v = (4 * donor_replacementGLF_dead9v * (1000 - donor_replacementGLF_dead9v)) / 1000;
                            }
                        }
                    }
                    for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = (vec4(-83.32, -8.0, 59.94, -76.28) - (-1191.2809));
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= _GLF_ZERO(0.0, injectionSwitch.x))))) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                ivec2 donor_replacementGLF_dead6p = _GLF_FUZZED(ivec2(71752, 59235));
                                do {
                                    donor_replacementGLF_dead6p = GLF_dead6iter(donor_replacementGLF_dead6p);
                                } while (_GLF_WRAPPED_LOOP(false));
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = vec4(-161.700, vec3(6229.6526, 5.8, -370.772));
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                            }
                        } else {
                        }
                    }
                } else {
                    if (_GLF_DEAD(false)) {
                        if (_GLF_DEAD(false)) {
                            for (i = 0; i < i; i++) {
                                msb10 = (4 * msb10 * (1000 - msb10)) / 1000;
                            }
                        }
                        float donor_replacementGLF_dead9th = _GLF_FUZZED(determinant(mat2(mat3x2(-82.63))));
                        {
                            donor_replacementGLF_dead9th = 1.0 - donor_replacementGLF_dead9th;
                        }
                    }
                    msb10 /= 2;
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = vec4(70.84, -4700.2818, 6.0, 645.298);
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = vec4(-85.60, -6849.8597, -4162.8480, -965.169);
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                        }
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        do {
                            _GLF_color = vec4(6.7, -4432.8268, -7491.6244, -3884.7267);
                        } while (_GLF_WRAPPED_LOOP(false));
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    } else {
                    }
                }
                if (_GLF_DEAD(false)) {
                    float donor_replacementGLF_dead8limit = _GLF_FUZZED(abs(-438.442));
                    float donor_replacementGLF_dead8ref = _GLF_FUZZED(8.1);
                    float donor_replacementGLF_dead8s = _GLF_FUZZED(atanh(-25.35));
                    {
                        if (mod(float(i), donor_replacementGLF_dead8ref) <= 0.01) {
                            donor_replacementGLF_dead8s += 0.2;
                        }
                        if (float(i) >= donor_replacementGLF_dead8limit) {
                            ;
                        }
                        i++;
                    }
                }
            }
        }
        _GLF_color = vec4(data[findLSB(32)] / 10.0, data[findMSB(msb9)] / 10.0, data[findMSB(1)] / 10.0, 1.0);
        if (_GLF_DEAD(false)) {
            float donor_replacementGLF_dead9th = _GLF_FUZZED(trunc(-5479.8969));
            {
                donor_replacementGLF_dead9th = 0.5 - donor_replacementGLF_dead9th;
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = (ceil(vec4(-1.8, -7.5, -74.36, 555.162)) * vec4(1.4, 8.7, 4.1, -837.393));
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
            }
        }
        {
            if (_GLF_DEAD(false)) {
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        do {
                            if (_GLF_outVarBackup_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(i, 4)] >= 1.0) {
                                _GLF_outVarBackup_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(i, 4)] = _GLF_outVarBackup_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(i, 4)] * _GLF_outVarBackup_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(i, 4)];
                            }
                            i++;
                        } while (i < findMSB(findLSB(msb9)));
                    }
                    _GLF_color = (false ? vec4(-120.875, -0.1, 22.69, -6.9) : vec4(7396.2628, -6.5, 0.0, -1871.2038));
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < _GLF_IDENTITY(dot(vec2(1.0, 0.0), vec2(0.0, 1.0)), dot(vec2(1.0, 0.0), vec2(0.0, 1.0))))))) {
                            for (msb10 = 0; msb10 < msb9; msb10++) {
                                i = (4 * i * (1000 - i)) / 1000;
                            }
                        }
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                _GLF_color = vec4(9687.1845, 7843.2226, 8.0, -818.635);
            }
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = vec4(-570.134, 2154.9962, -8.3, 38.75);
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
    }
}
