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
int GLF_live6map[16 * 16] = int[256](0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, _GLF_IDENTITY(0, (0) / 1), 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, _GLF_IDENTITY(0, (0) ^ 0), 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, _GLF_IDENTITY(0, (0) * 1), 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, _GLF_IDENTITY(0, 0 ^ (_GLF_IDENTITY(0, (_GLF_IDENTITY(0, clamp(0, 0, 0))) - 0))), 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, _GLF_IDENTITY(0, (_GLF_IDENTITY(0, (true ? 0 : _GLF_FUZZED(-78940)))) + (0 >> _GLF_IDENTITY(int(4), int(4)))), 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, _GLF_IDENTITY(0, (0) * 1), 0, 0, _GLF_IDENTITY(0, (_GLF_IDENTITY(0, max(0, 0))) >> (0 << _GLF_IDENTITY(int(7), int(7)))), 0, 0, 0);
layout(set = 0, binding = 2) uniform sampler2D GLF_live5tex;
int GLF_live0msb8 = 256;
int GLF_live1data[10] = int[10](_GLF_FUZZED(-20919), _GLF_FUZZED(_GLF_IDENTITY(-25512, (-25512) | (0 ^ 0))), _GLF_FUZZED((96459 + ((-51568) - 50525))), _GLF_FUZZED(-95093), _GLF_FUZZED((19375 + ivec4(60441, -45433, 82724, -55880)).z), _GLF_FUZZED(99687), _GLF_FUZZED((+ivec3(-_GLF_IDENTITY(11262, (false ? _GLF_FUZZED(((-15641) ^ (35187))) : _GLF_IDENTITY(11262, clamp(11262, 11262, _GLF_IDENTITY(11262, 0 ^ (11262)))))), -66709, 83817)).t), _GLF_FUZZED(96978), _GLF_FUZZED(72571), _GLF_FUZZED(-28769)), GLF_live1temp[10] = int[10](_GLF_FUZZED(((-3862) & 79053)), _GLF_FUZZED(-30153), _GLF_FUZZED(17578), _GLF_FUZZED(91883), _GLF_FUZZED(int(164980u)), _GLF_FUZZED(81192), _GLF_FUZZED((33840 + int(true))), _GLF_FUZZED(35977), _GLF_FUZZED(((-25682) - (-95326))), _GLF_FUZZED(int(false)));
vec4 GLF_live3_GLF_color = _GLF_FUZZED((mat2x4(-3.6, 7.2, 9577.0048, -3085.8479, -147.960, -3921.7366, -2160.7981, -5609.5986) * vec2(_GLF_IDENTITY(-289.014, (_GLF_IDENTITY(-289.014, (false ? _GLF_FUZZED(-2.0) : (-289.014)))) * round(length(normalize(1.0)))), 2.1)));
layout(location = 0) out vec4 _GLF_color;

layout(set = 0, binding = 0) uniform buf0 {
    vec2 injectionSwitch;
};

layout(set = 0, binding = 1) uniform buf1 {
    vec2 resolution;
};

struct BinarySearchObject {
    int prime_numbers[10];
};

vec2 brick(vec2 uv) {
    int a = 4;
    do {
        uv.y -= step(injectionSwitch.y, uv.x);
        {
            int GLF_live0i = _GLF_FUZZED(ivec4(51541, -76748, -6600, 64179).b);
            float GLF_live0limit = _GLF_FUZZED(7.2);
            int GLF_live0looplimiter0 = 0;
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(15.50, -179.570, -6517.8904, -40.76);
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            float GLF_live0ref = _GLF_FUZZED(36.16);
            if (_GLF_DEAD(false)) {
                break;
            }
            float GLF_live0s = _GLF_FUZZED(-8228.8988);
            {
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        return vec2(1.0, 1.0);
                    }
                    if (_GLF_DEAD(false)) {
                        if (_GLF_DEAD(false)) {
                            break;
                        }
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = sinh(vec4(2.3, 459.163, -558.922, -57.35));
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        if (_GLF_DEAD(false)) {
                            discard;
                        }
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(45.79, 24.25, 7.4, abs(8903.3285));
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                }
                if (_GLF_IDENTITY(GLF_live0looplimiter0, (GLF_live0looplimiter0) >> 0) >= 4) {
                    {
                        if (_GLF_DEAD(false)) {
                            continue;
                        }
                        {
                            ;
                        }
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < log(1.0))))) {
                        discard;
                    }
                    ;
                }
                GLF_live0looplimiter0++;
                {
                    if (mod(float(GLF_live0i), GLF_live0ref) <= 0.01) {
                        GLF_live0s += 0.2;
                    }
                    if (float(GLF_live0i) >= GLF_live0limit) {
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = floor(vec4(-91.84, -60.06, -82.06, 1103.7702));
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                            _GLF_color = exp(unpackSnorm4x8(84680u));
                        }
                        if (_GLF_DEAD(false)) {
                            discard;
                        }
                        ;
                    }
                    GLF_live0i++;
                    {
                        vec2 GLF_live5coord = _GLF_FUZZED((mat4x2(0.0, -62.29, 4279.9004, -5852.3214, -5.4, 10.14, -3.5, -9770.2693) * (vec3(3.1, -3.4, -713.428) * mat4x3(-7712.4311, -47.93, 8.1, 23.17, -577.168, 4.0, -1.8, 1645.3248, 34.52, -_GLF_IDENTITY(9.8, (_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)) ? _GLF_FUZZED(GLF_live0s) : 9.8)), -691.578, 623.427))));
                        int GLF_live5i = _GLF_FUZZED(_GLF_IDENTITY(ivec2(ivec4(-9214, 70038, 91452, 2061)), (ivec2(ivec4(-9214, 70038, 91452, 2061))) >> ivec2(0, 0)).s);
                        if (_GLF_DEAD(false)) {
                            continue;
                        }
                        vec4 GLF_live5texel = _GLF_FUZZED(vec4(-3.8, 5.6, -20.60, -6.3));
                        {
                            int GLF_live5looplimiter0 = _GLF_IDENTITY(0, ~(~(0)));
                            if (_GLF_DEAD(false)) {
                                continue;
                            }
                            while (GLF_live5texel.x + GLF_live5texel.y + _GLF_IDENTITY(GLF_live5texel, vec4(mat2x4(GLF_live5texel, 0.0, 0.0, length(0.0), determinant(mat2(round(length(normalize(1.0))), 1.0, 0.0, 1.0))))).z > 1.0 && GLF_live5i < 16) {
                                if (GLF_live5looplimiter0 >= _GLF_IDENTITY(5, (false ? _GLF_FUZZED(int(false)) : 5))) {
                                    break;
                                }
                                if (_GLF_DEAD(false)) {
                                    return vec2(1.0, 1.0);
                                }
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < tan(0.0))))) {
                                    break;
                                }
                                GLF_live5looplimiter0++;
                                {
                                    GLF_live5coord = GLF_live5texel.xz + GLF_live5texel.yy;
                                    GLF_live5coord = floor(GLF_live5coord * 256.0) / 256.0;
                                    GLF_live5texel = texture(GLF_live5tex, GLF_live5coord);
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = _GLF_color;
                                    }
                                    GLF_live5i++;
                                }
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                        return vec2(1.0, 1.0);
                                    }
                                    _GLF_color = vec4(2234.8481, -9.0, -506.013, 76.76);
                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    discard;
                                }
                            }
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            discard;
                        }
                        if (_GLF_DEAD(false)) {
                            _GLF_color = cosh(_GLF_color);
                        }
                        _GLF_color = abs(_GLF_color);
                    }
                }
            }
        }
        {
            int GLF_live6looplimiter0 = 0;
            if (GLF_live6looplimiter0 >= 3) {
                ;
            }
        }
        if (_GLF_DEAD(false)) {
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                discard;
            }
            _GLF_color = (GLF_live3_GLF_color - (GLF_live3_GLF_color / 35.02));
        }
        if (_GLF_DEAD(false)) {
            discard;
        }
        if (_GLF_DEAD(_GLF_IDENTITY(false, !(!(false))))) {
            discard;
        }
        uv.x -= fract(tanh(uv.x)) / ldexp(_GLF_IDENTITY(injectionSwitch, clamp(injectionSwitch, injectionSwitch, injectionSwitch)).y, findMSB(a));
        if (_GLF_DEAD(false)) {
            return vec2(1.0, 1.0);
        }
        a--;
        if (_GLF_DEAD(false)) {
            discard;
        }
    } while (_GLF_IDENTITY(a, min(_GLF_IDENTITY(a, (a) | int(_GLF_ZERO(0.0, injectionSwitch.x))), _GLF_IDENTITY(a, 0 | (a)))) > int(injectionSwitch.x));
    int b = 3;
    {
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_IDENTITY(_GLF_outVarBackup_GLF_color = _GLF_color, (false ? _GLF_FUZZED(_GLF_outVarBackup_GLF_color) : (_GLF_outVarBackup_GLF_color = _GLF_color)));
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            return vec2(1.0, 1.0);
        }
        _GLF_color = dFdxCoarse(vec4(8.5, -6.0, -74.47, -54.92));
        if (_GLF_DEAD(false)) {
            _GLF_color = vec4(6942.5607, 5.1, 7546.9596, 470.614);
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < tan(0.0))))) {
                return vec2(1.0, 1.0);
            }
        }
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
        {
            if (_GLF_DEAD(_GLF_FALSE(false, _GLF_IDENTITY((gl_FragCoord.x < 0.0), true && ((gl_FragCoord.x < 0.0)))))) {
                return vec2(1.0, 1.0);
            }
            {
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(-21.23, -76.60, 49.26, -53.54);
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        return vec2(1.0, 1.0);
                    }
                    if (_GLF_DEAD(false)) {
                        if (_GLF_DEAD(false)) {
                            return vec2(1.0, 1.0);
                        }
                        _GLF_color = dFdyCoarse(_GLF_color);
                    }
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                ;
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    return vec2(1.0, 1.0);
                }
            }
        }
    }
    do {
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
            continue;
        }
        uv.y -= step(injectionSwitch.y, uv.x) + float(a);
        if (_GLF_DEAD(false)) {
            _GLF_color = sin(GLF_live3_GLF_color);
        }
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = atanh(vec4(-8.5, 92.72, 8.1, 0.8));
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
        if (_GLF_DEAD(false)) {
            return vec2(1.0, 1.0);
        }
        uv.x *= (isnan(uv.y) ? cosh(gl_FragCoord.y) : tanh(gl_FragCoord.x));
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
            return vec2(1.0, 1.0);
        }
        _GLF_IDENTITY(b--, (_GLF_IDENTITY(false, bool(_GLF_IDENTITY(bool(_GLF_IDENTITY(false, (false) || false)), (_GLF_IDENTITY(bool(_GLF_IDENTITY(false, (false) || false)), (bool(_GLF_IDENTITY(false, (false) || false))) || false)) || false))) ? _GLF_FUZZED(b) : _GLF_IDENTITY(b--, (false ? _GLF_FUZZED(b) : _GLF_IDENTITY((b--), ((b--)) / 1)))));
    } while (b > int(_GLF_IDENTITY(injectionSwitch.x, clamp(_GLF_IDENTITY(injectionSwitch.x, min(_GLF_IDENTITY(injectionSwitch.x, (true ? injectionSwitch.x : _GLF_FUZZED(8.5))), _GLF_IDENTITY(injectionSwitch.x, min(injectionSwitch.x, injectionSwitch.x)))), _GLF_IDENTITY(injectionSwitch.x, min(injectionSwitch.x, injectionSwitch.x)), injectionSwitch.x))));
    {
        int GLF_live5looplimiter0 = 0;
        if (GLF_live5looplimiter0 >= 5) {
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                return vec2(1.0, 1.0);
            }
            ;
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(-7346.6720, 937.367, -1109.0528, 9.1);
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= log(_GLF_ONE(1.0, injectionSwitch.y)))))) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
        }
    }
    int c = 2;
    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
        _GLF_color = intBitsToFloat(ivec4(75400, 98854, -94651, 8300));
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            return vec2(1.0, 1.0);
        }
    }
    do {
        uv.y -= step(injectionSwitch.y, _GLF_IDENTITY(uv.x, (_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)) ? uv.x : _GLF_FUZZED(2.8)))) + float(a) + float(b);
        uv.x += ldexp(injectionSwitch.y, isinf(uv.y + uv.x) ? findMSB(b) : findMSB(a));
        c--;
    } while (c > int(injectionSwitch.x));
    {
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        _GLF_color = vec4(7051.6118, -3220.5410, 75.82, -4.7);
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
    }
    int d = 1;
    do {
        {
            vec3 GLF_live7c = _GLF_FUZZED(vec3(_GLF_IDENTITY(-1.5, clamp(-1.5, -1.5, _GLF_IDENTITY(-1.5, max(-1.5, _GLF_IDENTITY(-1.5, (-1.5) - 0.0))))), -9.6, 821.052).ttp);
            int GLF_live7i = _GLF_FUZZED(9245);
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < _GLF_IDENTITY(0.0, (_GLF_TRUE(true, (gl_FragCoord.x >= determinant(mat4(0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0)))) ? 0.0 : _GLF_FUZZED(6948.4393))))))) {
                discard;
            }
            if (GLF_live7c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live7i, 3)] >= 1.0) {
                GLF_live7c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live7i, 3)] = GLF_live7c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live7i, 3)] * GLF_live7c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live7i, 3)];
            }
        }
        uv.y -= step(injectionSwitch.y, uv.x) + float(_GLF_IDENTITY(a, max(a, a))) + float(b) + float(c);
        d--;
        {
            int GLF_live1i = _GLF_FUZZED(57976);
            if (_GLF_DEAD(false)) {
                break;
            }
            {
                int GLF_live1looplimiter5 = 0;
                do {
                    if (GLF_live1looplimiter5 >= 6) {
                        if (_GLF_DEAD(false)) {
                            _GLF_color = fwidthCoarse(_GLF_color);
                        }
                        break;
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            discard;
                        }
                        if (_GLF_DEAD(false)) {
                            continue;
                        }
                    }
                    GLF_live1looplimiter5++;
                    if (_GLF_DEAD(false)) {
                        _GLF_color = vec4(1.7, sign(uv), -2.6);
                    }
                    if (_GLF_DEAD(false)) {
                        break;
                    }
                    for (int _injected_loop_counter = int(_GLF_ZERO(0.0, injectionSwitch.x)); _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
                        switch (GLF_live1i) {
                            case 0:
                                GLF_live1data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live1i, 10)] = 4;
                                break;
                            case 1:
                                GLF_live1data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live1i, 10)] = 3;
                                break;
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                        {
                                            vec4 _GLF_outVarBackup_GLF_color;
                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                            _GLF_color = vec4(-61.36, 6.9, 242.208, -3403.4537);
                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= abs(abs(0.0)))))) {
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                            }
                                        }
                                    } else {
                                        _GLF_color = radians(_GLF_color);
                                    }
                                    {
                                        if (_GLF_DEAD(false)) {
                                            discard;
                                        }
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        _GLF_color = vec4(6.9, 9.9, -6.6, 666.057);
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            do {
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                            } while (_GLF_WRAPPED_LOOP(false));
                                        }
                                    }
                                    if (_GLF_DEAD(false)) {
                                        continue;
                                    }
                                }
                                if (_GLF_DEAD(false)) {
                                    return vec2(1.0, 1.0);
                                }
                            case 2:
                                {
                                    int GLF_live5looplimiter0 = 0;
                                    if (GLF_live5looplimiter0 >= 5) {
                                        ;
                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                            continue;
                                        }
                                    }
                                }
                                if (_GLF_WRAPPED_IF_FALSE(false)) {
                                } else {
                                    GLF_live1data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live1i, 10)] = 2;
                                }
                                break;
                            case 3:
                                GLF_live1data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live1i, 10)] = 1;
                                break;
                                if (_GLF_DEAD(false)) {
                                    discard;
                                }
                                do {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        _GLF_color = vec4(357.140, 90.16, faceforward(vec2(-0.9, 94.86), normalize(vec2(-241.983, 5721.9855)), vec2(-8526.3682, -4.7)));
                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                    }
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = vec4(-9.7, 515.104, _GLF_IDENTITY(9163.3500, (9163.3500) / 1.0), -338.393);
                                    if (_GLF_DEAD(false)) {
                                        return vec2(1.0, 1.0);
                                        if (_GLF_DEAD(_GLF_IDENTITY(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)), _GLF_IDENTITY(bool(bvec3(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)), true, true)), (bool(bvec3(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)), true, true))) || false)))) {
                                            continue;
                                        }
                                    }
                                    {
                                        int GLF_live5looplimiter0 = 0;
                                        if (GLF_live5looplimiter0 >= 5) {
                                            ;
                                        }
                                    }
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                } while (_GLF_WRAPPED_LOOP(false));
                            case 4:
                                GLF_live1data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live1i, 10)] = 0;
                                break;
                            case 5:
                                if (_GLF_DEAD(false)) {
                                    continue;
                                }
                                GLF_live1data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live1i, 10)] = -1;
                                break;
                            case 6:
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                    discard;
                                }
                                for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != _GLF_IDENTITY(1, ~(_GLF_IDENTITY(~(1), clamp(~(1), ~(1), ~(1)))))); _injected_loop_counter++) {
                                    GLF_live1data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live1i, 10)] = -2;
                                }
                                break;
                            case 7:
                                GLF_live1data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live1i, 10)] = -3;
                                break;
                            case 8:
                                GLF_live1data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live1i, 10)] = -4;
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = dFdy(dFdxFine(vec4(2.9, -7532.3284, 355.865, -4.7)));
                                }
                                break;
                                {
                                    float GLF_live4s = _GLF_FUZZED(7637.6852);
                                    {
                                        ;
                                    }
                                }
                            case 9:
                                GLF_live1data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live1i, 10)] = -5;
                                {
                                    if (_GLF_DEAD(false)) {
                                        continue;
                                    }
                                    float GLF_live7result = _GLF_FUZZED(0.9);
                                    {
                                        {
                                            vec4 _GLF_outVarBackup_GLF_color;
                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                            _GLF_color = vec4(2.7, -6469.9011, -24.03, 8.2);
                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                            }
                                        }
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                            return vec2(1.0, 1.0);
                                        }
                                        ;
                                        {
                                            vec4 _GLF_outVarBackup_GLF_color;
                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                            _GLF_color = vec4(-90.65, 1658.7875, 1.8, 52.47);
                                            if (_GLF_DEAD(false)) {
                                                _GLF_color = _GLF_color;
                                            }
                                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                break;
                                            }
                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                            }
                                        }
                                    }
                                }
                                break;
                        }
                        {
                            int GLF_live5looplimiter0 = 0;
                            if (GLF_live5looplimiter0 >= 5) {
                                ;
                            }
                        }
                        GLF_live1i++;
                    }
                    if (_GLF_IDENTITY(_GLF_DEAD(false), (_GLF_DEAD(false)) || false)) {
                        _GLF_color = GLF_live3_GLF_color;
                    }
                } while (GLF_live1i < 10);
            }
        }
        {
            vec4 _GLF_outVarBackup_GLF_color;
            if (_GLF_DEAD(false)) {
                return vec2(1.0, 1.0);
            }
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = roundEven(vec4(-0.6, -0.0, 1779.2643, 4.7));
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
        if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(true, !(!(true))))) {
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                if (_GLF_DEAD(false)) {
                    continue;
                }
                _GLF_color = ceil(vec4(6691.2327, -663.288, -166.946, 1.8));
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = vec4(4.2, -57.20, -529.070, -12.68);
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                discard;
            }
        } else {
        }
    } while (d > int(injectionSwitch.x));
    return fract(uv);
    {
        int GLF_live2v = _GLF_FUZZED(3253);
        if (_GLF_DEAD(false)) {
            _GLF_color = vec4(-0.6, 2.3, -7.3, 4292.9119);
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                return vec2(1.0, 1.0);
            }
        }
        {
            GLF_live2v = 3 * GLF_live2v + 1;
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                return vec2(1.0, 1.0);
            }
        }
    }
    if (_GLF_DEAD(false)) {
        return vec2(1.0, 1.0);
    }
}

float patternize(vec2 uv) {
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
        return 1.0;
    }
    vec2 size = vec2(0.45);
    if (_GLF_DEAD(false)) {
        return 1.0;
    }
    vec2 st = step(size, uv);
    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
        _GLF_color = faceforward(min(GLF_live3_GLF_color, fract(83.71)), refract(GLF_live3_GLF_color, GLF_live3_GLF_color, 3.9), vec4(5.2, -2447.0103, -9.3, 6.2));
    }
    switch (int(mod(gl_FragCoord.y, 5.0))) {
        case 0:
            return mix(pow(st.x, injectionSwitch.y), st.x, size.y);
            break;
        case 1:
            return mix(_GLF_IDENTITY(pow(uv.y, injectionSwitch.y), mix(float(_GLF_FUZZED(-847.137)), float(_GLF_IDENTITY(pow(uv.y, injectionSwitch.y), clamp(pow(uv.y, injectionSwitch.y), pow(uv.y, injectionSwitch.y), pow(uv.y, injectionSwitch.y)))), bool(true))), st.y, size.x);
            break;
        case 2:
            do {
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = sinh(vec4(65.97, -1696.8389, 5349.9823, -5.1));
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        discard;
                    }
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                }
                discard;
                {
                    int GLF_live6d = _GLF_FUZZED(69376);
                    ivec2 GLF_live6p = _GLF_FUZZED(ivec2(67040, 243));
                    {
                        GLF_live6d--;
                        GLF_live6map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live6p.x) + (GLF_live6p.y) * 16, 256)] = 1;
                        GLF_live6map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live6p.x) + (GLF_live6p.y - 1) * 16, 256)] = 1;
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            return 1.0;
                        }
                        GLF_live6map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live6p.x) + (GLF_live6p.y - 2) * 16, 256)] = 1;
                        GLF_live6p.y -= 2;
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        return 1.0;
                    }
                }
                {
                    if (_GLF_DEAD(false)) {
                        discard;
                    }
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = ldexp(vec4(0.9, -9.3, 3768.6595, -253.461), ivec4(ivec2(-49807, 88387)[1], -37662, ivec2(_GLF_IDENTITY(-20573, max(-20573, -20573)), -44068)));
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            continue;
                        }
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
            } while (_GLF_WRAPPED_LOOP(_GLF_IDENTITY(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)), _GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)) || (_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))))));
            break;
        case 3:
            return mix(pow(uv.y, _GLF_IDENTITY(injectionSwitch, mix(vec2(_GLF_FUZZED(-256.118), _GLF_IDENTITY((injectionSwitch)[1], max((injectionSwitch)[1], (injectionSwitch)[1]))), vec2((injectionSwitch)[0], _GLF_FUZZED(1.7)), bvec2(true, _GLF_FALSE(false, (_GLF_IDENTITY(injectionSwitch.x > injectionSwitch.y, !(!(_GLF_IDENTITY(injectionSwitch.x > injectionSwitch.y, bool(bvec3(_GLF_IDENTITY(injectionSwitch.x > injectionSwitch.y, true && (injectionSwitch.x > injectionSwitch.y)), false, false))))))))))).y), uv.y, size.y);
            break;
            if (_GLF_DEAD(false)) {
                return 1.0;
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = reflect(clamp(vec4(4174.9038, 7738.7882, -1.7, 2658.5843), -9175.1900, 6584.5141), vec4(86.15, -3.3, 9717.1595, -4529.1823));
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < length(vec2(0.0, 0.0)))))) {
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    return 1.0;
                }
                return 1.0;
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    if (_GLF_DEAD(false)) {
                        return 1.0;
                    }
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = normalize(vec4(-834.476, 8179.6922, 7981.3283, 770.631));
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        return 1.0;
                    }
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                if (_GLF_DEAD(false)) {
                    _GLF_color = GLF_live3_GLF_color;
                }
            }
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(709.327, 1.3, 738.503, -629.742);
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            {
                int GLF_live5looplimiter0 = 0;
                if (GLF_live5looplimiter0 >= 5) {
                    if (_GLF_DEAD(false)) {
                        return 1.0;
                    }
                    ;
                }
            }
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(769.627, -6.3, 14.14, -1.5);
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
        case 4:
            if (_GLF_DEAD(false)) {
                return 1.0;
            }
            return mix(pow(st.y, _GLF_IDENTITY(injectionSwitch, min(injectionSwitch, injectionSwitch)).y), st.x, size.x);
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                return 1.0;
            }
            break;
    }
}

int binarySearch(BinarySearchObject obj, int x) {
    {
        if (_GLF_DEAD(false)) {
            return 1;
        }
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        _GLF_color = (-vec4(3501.4203, -5227.5943, 11.77, -3230.1686));
        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
    }
    int l = 0, r = 9;
    {
        if (_GLF_DEAD(false)) {
            return 1;
        }
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        _GLF_color = (mat3x4(-8.0, -61.81, 7306.1108, -8071.1737, 2.2, -7711.0250, 15.19, -_GLF_IDENTITY(558.318, max(558.318, 558.318)), 170.112, -5798.9128, -6.2, -9.3) * vec3(82.89, -7.0, -7.4));
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
        return 1;
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
            return 1;
        }
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = mat3x4(-3.6, 0.4, -7172.4108, -2395.3345, -58.96, 0.8, 3241.1207, 9.7, -5342.9027, 8.5, -6.1, -2.8)[2];
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
    }
    {
        int GLF_live7i = _GLF_FUZZED(-45836);
        float GLF_live7limit = _GLF_FUZZED(float(112527u));
        if (_GLF_DEAD(false)) {
            return 1;
        }
        int GLF_live7looplimiter0 = 0;
        if (_GLF_DEAD(false)) {
            return 1;
        }
        if (_GLF_DEAD(false)) {
            return 1;
        }
        float GLF_live7result = _GLF_FUZZED(vec3(vec4(_GLF_IDENTITY(-85.70, (-85.70) / 1.0), 49.81, 2733.9753, -19.75)).b);
        if (_GLF_DEAD(false)) {
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                return 1;
            }
            _GLF_color = _GLF_color;
        }
        float GLF_live7thirty_two = _GLF_FUZZED(1.9);
        {
            if (GLF_live7looplimiter0 >= 3) {
                ;
            }
            GLF_live7looplimiter0++;
            {
                if (_GLF_IDENTITY((GLF_live7i % 32) == 0, false || ((GLF_live7i % 32) == 0))) {
                    if (_GLF_DEAD(false)) {
                        return 1;
                    }
                    GLF_live7result += 0.4;
                    if (_GLF_DEAD(false)) {
                        return 1;
                    }
                } else {
                    if (mod(float(GLF_live7i), round(GLF_live7thirty_two)) <= 0.01) {
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = min(vec4(258.421, 4.0, 8774.8282, 33.65), vec4(-9229.6062, 2.3, -7.1, 2.1));
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                        GLF_live7result += _GLF_IDENTITY(100.0, (true ? 100.0 : _GLF_FUZZED(fwidthFine(GLF_live7limit))));
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        return 1;
                        if (_GLF_DEAD(false)) {
                            return 1;
                        }
                    }
                }
                if (_GLF_DEAD(false)) {
                    return 1;
                }
                if (_GLF_DEAD(false)) {
                    _GLF_color = vec4(-3.7, -5.2, -834.396, -1.9);
                }
                if (float(GLF_live7i) >= GLF_live7limit) {
                    ;
                }
            }
        }
    }
    while (l <= r) {
        {
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                _GLF_color = GLF_live3_GLF_color;
            }
            int GLF_live7i = _GLF_FUZZED(56319);
            float GLF_live7result = _GLF_FUZZED(83.81);
            float GLF_live7thirty_two = _GLF_FUZZED(96.04);
            if ((GLF_live7i % 32) == 0) {
                GLF_live7result += 0.4;
            } else {
                if (mod(float(GLF_live7i), round(GLF_live7thirty_two)) <= 0.01) {
                    GLF_live7result += 100.0;
                }
            }
        }
        if (_GLF_DEAD(false)) {
            _GLF_color = fwidthCoarse(atan(vec4(-90.50, 7354.7945, 7.6, 6412.6774), vec4(-9469.2236, -75.89, -6928.5942, -5.1)));
        }
        int m = (l + r) / 2;
        {
            {
                int GLF_live4i = _GLF_FUZZED(74841);
                float GLF_live4limit = _GLF_FUZZED(24.65);
                float GLF_live4s = _GLF_FUZZED(92.32);
                if (float(GLF_live4i) >= GLF_live4limit) {
                    ;
                }
            }
            if (_GLF_DEAD(false)) {
                break;
            }
            {
                ;
            }
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            if (_GLF_DEAD(false)) {
                _GLF_color = vec4(-0.4, 5389.0571, -1.4, -6716.6792);
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                continue;
            }
            if (_GLF_DEAD(false)) {
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    if (_GLF_DEAD(false)) {
                        _GLF_color = roundEven(vec4(-43.76, 6445.2945, -760.212, 1974.9011));
                    }
                    _GLF_color = inversesqrt(vec4(-34.28, -0.4, -9.1, -8134.1940));
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                if (_GLF_DEAD(false)) {
                    _GLF_color = GLF_live3_GLF_color;
                }
                for (int _injected_loop_counter = (0 | 1); _GLF_WRAPPED_LOOP(_injected_loop_counter > (0 ^ 0)); _injected_loop_counter--) {
                    _GLF_color = _GLF_IDENTITY(cosh(vec3(-66.48, 4.6, 559.681)), min(cosh(vec3(-66.48, 4.6, 559.681)), _GLF_IDENTITY(cosh(vec3(-66.48, 4.6, 559.681)), mix(vec3(_GLF_FUZZED(-3.5), _GLF_FUZZED(-4.4), (cosh(vec3(-66.48, 4.6, 559.681)))[2]), vec3((cosh(vec3(-66.48, 4.6, 559.681)))[0], (cosh(vec3(-66.48, 4.6, 559.681)))[1], _GLF_FUZZED(3.1)), bvec3(true, true, false))))).rrgb;
                }
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                discard;
            }
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                _GLF_color = vec4(-6.3, 3293.7004, -586.726, -4015.6319);
            } else {
            }
        }
        if (obj.prime_numbers[m] == x) {
            if (_GLF_DEAD(false)) {
                _GLF_color = unpackSnorm4x8(115443u);
            }
            return m;
        }
        if (obj.prime_numbers[m] < x) {
            l = m + 1;
        } else {
            if (_GLF_IDENTITY(_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < sin(0.0)))), (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < sin(0.0))))) && true)) {
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    if (_GLF_DEAD(false)) {
                        return 1;
                    }
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = fwidth(vec4(5953.4639, -59.18, 1.7, 8766.1705));
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                discard;
            }
            r = m - 1;
            {
                {
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        return 1;
                    }
                    vec2 GLF_live5coord = _GLF_FUZZED(vec2(-0.2, 5.5));
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        discard;
                    }
                    int GLF_live5i = _GLF_IDENTITY(_GLF_FUZZED((~(-46748))), (false ? _GLF_FUZZED(r) : _GLF_FUZZED((~(-46748)))));
                    int GLF_live5looplimiter0 = 0;
                    vec4 GLF_live5texel = _GLF_FUZZED((mat2x4(-531.353, -62.57, -7116.0309, 2.6, 3.1, -7.9, 309.219, -7290.7203) * vec2(-9.1, -6.1)));
                    while (GLF_live5texel.x + GLF_live5texel.y + GLF_live5texel.z > 1.0 && GLF_live5i < 16) {
                        if (GLF_live5looplimiter0 >= 5) {
                            break;
                        }
                        GLF_live5looplimiter0++;
                        {
                            GLF_live5coord = GLF_live5texel.xz + GLF_live5texel.yy;
                            GLF_live5coord = floor(GLF_live5coord * 256.0) / 256.0;
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                continue;
                            }
                            GLF_live5texel = texture(GLF_live5tex, GLF_live5coord);
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < length(0.0))))) {
                                continue;
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    discard;
                                }
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                _GLF_color = vec4(-8819.2466, -544.788, 90.38, -7.0);
                            }
                            GLF_live5i++;
                        }
                    }
                }
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = (vec4(-1.6, -8.3, 2916.4258, 5764.6995) / sqrt(518.528));
                {
                    vec2 GLF_live5coord = _GLF_FUZZED(vec2(-6.8, 63.17));
                    int GLF_live5i = _GLF_FUZZED(int((40143u & (174573u & 27025u))));
                    vec4 GLF_live5texel = _GLF_FUZZED((1.5 - vec4(-1.1, -1.6, -91.63, 8.6)));
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        return 1;
                    }
                    {
                        int GLF_live5looplimiter0 = 0;
                        while (_GLF_IDENTITY(GLF_live5texel.x + GLF_live5texel.y + GLF_live5texel.z > 1.0 && GLF_live5i < 16, !(_GLF_IDENTITY(!(GLF_live5texel.x + GLF_live5texel.y + GLF_live5texel.z > 1.0 && GLF_live5i < 16), bool(bvec2(!(GLF_live5texel.x + GLF_live5texel.y + GLF_live5texel.z > 1.0 && GLF_live5i < 16), false)))))) {
                            if (GLF_live5looplimiter0 >= 5) {
                                break;
                            }
                            GLF_live5looplimiter0++;
                            {
                                GLF_live5coord = GLF_live5texel.xz + GLF_live5texel.yy;
                                GLF_live5coord = floor(GLF_live5coord * 256.0) / 256.0;
                                GLF_live5texel = _GLF_IDENTITY(texture(GLF_live5tex, GLF_live5coord), vec4(1.0, 1.0, 1.0, 1.0) * (texture(GLF_live5tex, GLF_live5coord)));
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                    discard;
                                }
                                GLF_live5i++;
                            }
                            if (_GLF_DEAD(false)) {
                                discard;
                            }
                        }
                    }
                }
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
        }
    }
    return -1;
    if (_GLF_DEAD(false)) {
        {
            {
                vec3 GLF_live7c = _GLF_FUZZED((mat4x3(9.5, 5809.7125, -419.302, 5.7, -23.05, 9.9, 1958.2598, 3683.0891, 0.3, 47.21, _GLF_IDENTITY(6.1, clamp(_GLF_IDENTITY(6.1, max(6.1, 6.1)), 6.1, _GLF_IDENTITY(6.1, float(mat4(6.1, length(vec2(0.0, 0.0)), 1.0, 1.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, _GLF_ZERO(0.0, injectionSwitch.x), 1.0, 1.0))))), 1.4) * vec4(-579.346, -4938.6502, 9538.1112, -45.47)));
                if (_GLF_DEAD(false)) {
                    return _GLF_IDENTITY(1, (1) >> 0);
                }
                int GLF_live7i = _GLF_FUZZED(((-34425) + (-41773)));
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = min(vec4(-1.0, 513.586, -936.929, 2760.3846), vec4(-8.3, -66.35, -962.026, -7.1));
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    return 1;
                }
                if (GLF_live7c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live7i, 3)] >= _GLF_IDENTITY(1.0, (1.0) / 1.0)) {
                    GLF_live7c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live7i, 3)] = _GLF_IDENTITY(GLF_live7c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live7i, 3)] * GLF_live7c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live7i, 3)], min(GLF_live7c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live7i, 3)] * GLF_live7c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live7i, 3)], GLF_live7c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live7i, 3)] * GLF_live7c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live7i, 3)]));
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = ((-24.27) * vec4(-7.7, 122.852, -52.20, 43.32));
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                }
                if (_GLF_DEAD(false)) {
                    return 1;
                }
            }
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = vec4(_GLF_IDENTITY(-3.4, float(float(-3.4))), -316.871, -5345.3960, 3873.8917);
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                if (_GLF_DEAD(false)) {
                    return 1;
                }
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
        return 1;
    }
    if (_GLF_DEAD(false)) {
        return 1;
    }
}

void main() {
    BinarySearchObject obj;
    {
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                return;
            }
            _GLF_color = radians(inversesqrt(vec4(-9.2, -772.867, 493.541, 5426.1837)));
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                if (_GLF_DEAD(false)) {
                    return;
                }
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        _GLF_color = ((_GLF_IDENTITY(-2854.4616, (_GLF_FALSE(false, (gl_FragCoord.y < 0.0)) ? _GLF_FUZZED(9.3) : (-2854.4616)))) + vec4(3.2, -59.58, 222.529, 2.7));
        if (_GLF_WRAPPED_IF_FALSE(false)) {
        } else {
            if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)), false || (_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))))) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
    }
    for (int i = 0; i < 10; _GLF_IDENTITY(i++, ~(~(i++)))) {
        if (_GLF_DEAD(false)) {
            return;
        }
        {
            {
                if (_GLF_DEAD(false)) {
                    return;
                }
                GLF_live3_GLF_color = vec4(0.0, 0.0, _GLF_IDENTITY(0.0, (0.0) / 1.0), 1.0);
                {
                    float GLF_live7limit = _GLF_FUZZED((4.9 + 9237.6653));
                    int GLF_live7looplimiter0 = _GLF_IDENTITY(0, (0) - 0);
                    float GLF_live7result = _GLF_FUZZED(-1.8);
                    float GLF_live7thirty_two = _GLF_FUZZED(float(39947));
                    for (int GLF_live7i = 1; GLF_live7i < 800; GLF_live7i++) {
                        if (GLF_live7looplimiter0 >= 3) {
                            break;
                        }
                        GLF_live7looplimiter0++;
                        {
                            if ((GLF_live7i % 32) == 0) {
                                GLF_live7result += 0.4;
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = vec4(545.687, 7709.1717, 7.6, -2385.9431);
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                            } else {
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = vec4(0.0, -8.4, vec2(-6124.6693, 7.3));
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                                if (mod(float(GLF_live7i), round(GLF_live7thirty_two)) <= 0.01) {
                                    _GLF_IDENTITY(GLF_live7result += 100.0, 1.0 * (GLF_live7result += 100.0));
                                }
                                if (_GLF_DEAD(_GLF_IDENTITY(false, (false) || _GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))))) {
                                    _GLF_color = mod(vec4(446.131, -575.165, -5924.1971, -3.4), GLF_live7thirty_two);
                                }
                            }
                            if (_GLF_DEAD(false)) {
                                discard;
                            }
                            if (float(GLF_live7i) >= GLF_live7limit) {
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < sin(0.0))))) {
                                    discard;
                                }
                                ;
                            }
                        }
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = tan(vec4(32.50, 2836.8786, -3117.7180, 6275.4910));
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                    }
                }
            }
        }
        if (_GLF_IDENTITY(i, (i) | 0) == 0) {
            obj.prime_numbers[i] = 2;
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_IDENTITY(_GLF_color = step(-718.895, vec4(-675.784, -20.50, -212.693, -7.5)), (_GLF_IDENTITY(_GLF_color = step(-718.895, vec4(-675.784, -20.50, -212.693, -7.5)), (_GLF_color = step(-718.895, vec4(-675.784, -20.50, -212.693, -7.5))) - vec4(0.0, 0.0, 0.0, 0.0))) + abs(abs(vec4(0.0, 0.0, 0.0, 0.0))));
                if (_GLF_DEAD(_GLF_FALSE(false, (_GLF_IDENTITY(gl_FragCoord, mat4(1.0) * (gl_FragCoord)).y < 0.0)))) {
                    discard;
                }
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
                if (_GLF_DEAD(false)) {
                    _GLF_color = mat3x4(-958.447, 993.481, -4.2, 4239.5052, -7865.4315, _GLF_IDENTITY(10.40, max(10.40, 10.40)), 773.901, 2663.3624, -_GLF_IDENTITY(7.0, clamp(7.0, _GLF_IDENTITY(7.0, (false ? _GLF_FUZZED(1.9) : 7.0)), 7.0)), 85.52, 205.237, 67.15)[0];
                }
            } else {
            }
        } else {
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(6068.0421, -_GLF_IDENTITY(2.8, (true ? 2.8 : _GLF_FUZZED(-17.09))), -37.18, -6.3);
                if (_GLF_DEAD(false)) {
                    discard;
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        break;
                    }
                }
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_IDENTITY(_GLF_outVarBackup_GLF_color, vec4(mat3(_GLF_outVarBackup_GLF_color, _GLF_IDENTITY(dot(vec4(sqrt(1.0), 0.0, 0.0, 0.0), vec4(1.0, 0.0, 0.0, 0.0)), dot(vec4(sqrt(1.0), 0.0, 0.0, 0.0), vec4(1.0, 0.0, 0.0, 0.0))), 0.0, 0.0, 1.0, 1.0)));
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = (vec4(9716.9444, -49.42, 0.4, 62.31) * vec4(992.632, -158.438, 2.8, 3.5));
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= abs(0.0))))) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                        if (_GLF_DEAD(false)) {
                            discard;
                        }
                    }
                }
            }
            if (i == 1) {
                obj.prime_numbers[i] = 3;
            } else if (i == 2) {
                obj.prime_numbers[i] = 5;
            } else {
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    return;
                }
                if (i == 3) {
                    obj.prime_numbers[i] = 7;
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(5.6, 5710.7236, -4017.5007, -1.1);
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                } else if (i == 4) {
                    obj.prime_numbers[i] = 11;
                } else {
                    if (_GLF_DEAD(false)) {
                        _GLF_color = mat3x4(-4.9, -3069.4591, 9.5, -9.6, -38.48, 4.4, 0.3, 3.9, 3.3, -2.2, -8.3, -675.289)[1];
                    }
                    if (i == 5) {
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            return;
                        }
                        obj.prime_numbers[i] = 13;
                    } else {
                        if (_GLF_DEAD(false)) {
                            _GLF_color = min(GLF_live3_GLF_color, -0.6);
                        }
                        if (i == _GLF_IDENTITY(6, (6) - 0)) {
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                _GLF_color = _GLF_color;
                            }
                            obj.prime_numbers[i] = 17;
                            if (_GLF_DEAD(false)) {
                                break;
                            }
                        } else {
                            {
                                int GLF_live5looplimiter0 = 0;
                                if (GLF_live5looplimiter0 >= 5) {
                                    ;
                                }
                            }
                            if (_GLF_IDENTITY(i, (i) - (0 ^ 0)) == 7) {
                                obj.prime_numbers[i] = 19;
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = vec4(2440.4935, 9948.7663, 88.75, 64.30);
                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                            } else {
                                if (_GLF_DEAD(false)) {
                                    break;
                                }
                                {
                                    if (_GLF_DEAD(false)) {
                                        discard;
                                    }
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = vec4(32.34, -63.34, 49.05, reflect(-74.56, -1105.5827));
                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(true, true && (true)))) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                                if (i == 8) {
                                    {
                                        vec4 GLF_live0c = _GLF_FUZZED((vec2(vec4(8966.4823, 720.724, -2.2, 8165.4994)) * mat4x2(7.1, 3023.3478, 700.432, 0.2, -9291.6939, -5.4, -3.4, _GLF_IDENTITY(-65.31, max(-65.31, _GLF_IDENTITY(-65.31, 1.0 * (-65.31)))))));
                                        int GLF_live0i = _GLF_FUZZED(-82652);
                                        int GLF_live0msb8 = _GLF_FUZZED((77123 & 64634));
                                        {
                                            int GLF_live0looplimiter1 = 0;
                                            do {
                                                if (GLF_live0looplimiter1 >= 4) {
                                                    break;
                                                }
                                                do {
                                                    GLF_live0looplimiter1++;
                                                    {
                                                        vec4 _GLF_outVarBackup_GLF_color;
                                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                                        _GLF_color = vec4(-0.2, 666.033, 3.5, 7589.3401);
                                                        if (_GLF_DEAD(false)) {
                                                            return;
                                                        }
                                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                            if (_GLF_DEAD(false)) {
                                                                return;
                                                            }
                                                        }
                                                    }
                                                } while (_GLF_WRAPPED_LOOP(false));
                                                {
                                                    if (GLF_live0c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live0i, 4)] >= 1.0) {
                                                        GLF_live0c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live0i, 4)] = GLF_live0c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live0i, 4)] * GLF_live0c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live0i, 4)];
                                                    }
                                                    if (_GLF_DEAD(false)) {
                                                        _GLF_color = GLF_live3_GLF_color;
                                                    }
                                                    GLF_live0i++;
                                                }
                                            } while (GLF_live0i < findMSB(findLSB(GLF_live0msb8)));
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                break;
                                            }
                                        }
                                        {
                                            vec4 _GLF_outVarBackup_GLF_color;
                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                            _GLF_color = pow(vec4(9557.5789, -9099.4474, -80.39, 1.9), mix(vec4(30.76, 93.32, -556.616, 8580.1334), vec4(-4.1, 0.5, 132.314, -7.0), radians(49.18)));
                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                            }
                                        }
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_IDENTITY(dot(vec2(1.0, 1.0), vec2(0.0, 0.0)), dot(vec2(1.0, 1.0), vec2(0.0, 0.0))))))) {
                                            discard;
                                        }
                                    }
                                    obj.prime_numbers[i] = 23;
                                } else {
                                    if (_GLF_DEAD(_GLF_IDENTITY(false, (_GLF_IDENTITY(false, !(!(_GLF_IDENTITY(false, true && (false)))))) && true))) {
                                        {
                                            bool GLF_live6canwalk = _GLF_FUZZED(true);
                                            int GLF_live6i = _GLF_FUZZED(-71660);
                                            int GLF_live6j = _GLF_FUZZED(87740);
                                            int GLF_live6looplimiter1 = 0;
                                            ivec2 GLF_live6p = _GLF_FUZZED(ivec2(_GLF_IDENTITY(-87755, 0 ^ (_GLF_IDENTITY(-87755, (-87755) * int(_GLF_ONE(1.0, injectionSwitch.y))))), -56954));
                                            if (_GLF_DEAD(false)) {
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                    break;
                                                }
                                                _GLF_color = (vec4(7639.6521, -2.3, -69.06, 962.909) - (-4.0));
                                            }
                                            {
                                                {
                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                    _GLF_color = vec4(-93.69, -0.3, -6.8, 7.1);
                                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                                        if (_GLF_DEAD(false)) {
                                                            _GLF_color = _GLF_color;
                                                        }
                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                    }
                                                }
                                                if (_GLF_DEAD(false)) {
                                                    _GLF_color = GLF_live3_GLF_color;
                                                }
                                                if (GLF_live6looplimiter1 >= 3) {
                                                    ;
                                                    if (_GLF_DEAD(false)) {
                                                        return;
                                                        {
                                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                                break;
                                                            }
                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                            _GLF_color = vec4(-2.0, -914.891, -869.325, 986.898);
                                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                            }
                                                        }
                                                    }
                                                }
                                                GLF_live6looplimiter1++;
                                                {
                                                    if (_GLF_IDENTITY(GLF_live6map[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6j * 2 + GLF_live6i * 2 * 16, 256)] == 0, bool(bvec4(GLF_live6map[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6j * 2 + GLF_live6i * 2 * 16, 256)] == 0, false, true, false)))) {
                                                        GLF_live6p.x = _GLF_IDENTITY(GLF_live6j * 2, (false ? _GLF_FUZZED(GLF_live0msb8) : (GLF_live6j * 2)));
                                                        GLF_live6p.y = GLF_live6i * 2;
                                                        GLF_live6canwalk = true;
                                                    }
                                                }
                                            }
                                        }
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                            continue;
                                        }
                                        break;
                                    }
                                    do {
                                        {
                                            if (_GLF_DEAD(false)) {
                                                _GLF_color = GLF_live3_GLF_color;
                                            }
                                            vec4 _GLF_outVarBackup_GLF_color;
                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                            _GLF_color = exp(vec4(6.6, 4310.8396, 79.21, -4.5));
                                            if (_GLF_DEAD(false)) {
                                                continue;
                                            }
                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                            }
                                        }
                                        if (i == 9) {
                                            obj.prime_numbers[i] = 29;
                                            {
                                                int GLF_live4looplimiter0 = 0;
                                                if (GLF_live4looplimiter0 >= 7) {
                                                    ;
                                                    {
                                                        vec4 _GLF_outVarBackup_GLF_color;
                                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                                        _GLF_color = exp(vec4(7367.4998, 30.68, -393.380, -0.1));
                                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                        if (_GLF_DEAD(_GLF_IDENTITY(false, bool(bool(false))))) {
                                            discard;
                                        }
                                    } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))));
                                    {
                                        int GLF_live5looplimiter0 = 0;
                                        if (GLF_live5looplimiter0 >= 5) {
                                            ;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = unpackUnorm4x8((min(17545u, 128063u) ^ 189107u));
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                if (_GLF_DEAD(false)) {
                    discard;
                }
            }
            if (_GLF_DEAD(false)) {
                return;
            }
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = (mat2x4(-9118.6092, 1.4, -50.64, 3.7, 4.1, -4.2, -380.610, -881.358) * (1.2 - vec2(0.6, 7.7)));
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
        }
    }
    if (_GLF_DEAD(false)) {
        _GLF_color = mix(_GLF_color, clamp(GLF_live3_GLF_color, 5620.1192, 7.9), -12.87);
    }
    vec2 uv = (gl_FragCoord.xy / _GLF_IDENTITY(resolution.x, (false ? _GLF_FUZZED(-53.80) : _GLF_IDENTITY(resolution.x, min(resolution.x, resolution.x))))) * vec2(resolution.x / resolution.y, 1.0);
    {
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        _GLF_color = vec4(-972.777, -5.6, 2776.0134, -50.76);
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
    }
    if (_GLF_DEAD(false)) {
        return;
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
        _GLF_color = (dFdxCoarse(_GLF_color) / _GLF_color);
    }
    vec2 b = brick(uv * 7.0);
    vec3 color = vec3(patternize(b));
    if (gl_FragCoord.y < resolution.y / 1.1) {
        if (binarySearch(obj, obj.prime_numbers[4]) != -(int(resolution.y)) && binarySearch(obj, _GLF_IDENTITY(obj.prime_numbers[0], (obj.prime_numbers[0]) | 0)) >= -(int(resolution.x))) {
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                _GLF_IDENTITY(_GLF_color = vec4(2.3, 35.43, -8324.3460, _GLF_IDENTITY(-4.6, clamp(_GLF_IDENTITY(-4.6, (true ? (-4.6) : _GLF_FUZZED(715.759))), _GLF_IDENTITY(-4.6, clamp(-4.6, -4.6, -4.6)), _GLF_IDENTITY(-4.6, float(_GLF_IDENTITY(mat4x3(-4.6, exp(0.0), 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, length(0.0), 0.0, 0.0), mat4x3(mat4x3(mat4x3(-4.6, exp(0.0), 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, length(0.0), 0.0, 0.0))))))))), (_GLF_IDENTITY(_GLF_color = vec4(2.3, 35.43, -8324.3460, _GLF_IDENTITY(-4.6, clamp(_GLF_IDENTITY(-4.6, (true ? (-4.6) : _GLF_FUZZED(715.759))), _GLF_IDENTITY(-4.6, clamp(-4.6, -4.6, -4.6)), _GLF_IDENTITY(-4.6, float(_GLF_IDENTITY(mat4x3(-4.6, exp(0.0), 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, length(0.0), 0.0, 0.0), mat4x3(mat4x3(mat4x3(-4.6, exp(0.0), 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, length(0.0), 0.0, 0.0))))))))), (false ? _GLF_FUZZED(vec4(281.819, 7146.8019, 81.67, -34.44)) : (_GLF_color = vec4(2.3, 35.43, -8324.3460, _GLF_IDENTITY(-4.6, clamp(_GLF_IDENTITY(-4.6, (true ? (-4.6) : _GLF_FUZZED(715.759))), _GLF_IDENTITY(-4.6, clamp(-4.6, -4.6, -4.6)), _GLF_IDENTITY(-4.6, float(_GLF_IDENTITY(mat4x3(-4.6, exp(0.0), 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, length(0.0), 0.0, 0.0), mat4x3(mat4x3(mat4x3(-4.6, exp(0.0), 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, length(0.0), 0.0, 0.0))))))))))))) / vec4(1.0, 1.0, 1.0, 1.0));
            }
            {
                vec4 _GLF_outVarBackup_GLF_color;
                if (_GLF_DEAD(_GLF_IDENTITY(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)), (_GLF_IDENTITY(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)), !(!(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))))) || false))) {
                    return;
                }
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = dFdyCoarse(min(vec4(-85.18, -840.334, -8501.9750, 0.5), -42.45));
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            {
                int GLF_live2v = _GLF_FUZZED((true ? 33237 : (-21885)));
                if (_GLF_DEAD(false)) {
                    _GLF_color = _GLF_color;
                }
                {
                    GLF_live2v /= 2;
                }
            }
            color.yz -= dot(_GLF_IDENTITY(float(binarySearch(obj, obj.prime_numbers[4])), (float(binarySearch(obj, obj.prime_numbers[4]))) / 1.0), float(binarySearch(obj, obj.prime_numbers[0])));
        } else {
            if (_GLF_DEAD(_GLF_FALSE(false, (_GLF_IDENTITY(injectionSwitch.x, clamp(injectionSwitch.x, _GLF_IDENTITY(injectionSwitch.x, (injectionSwitch.x) - _GLF_ZERO(0.0, injectionSwitch.x)), injectionSwitch.x)) > injectionSwitch.y)))) {
                return;
            }
            discard;
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(-8.9, -689.193, -845.790, -4.9);
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            if (_GLF_DEAD(false)) {
                _GLF_color = (_GLF_color + _GLF_color);
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(-33.83, 159.802, -980.661, -2655.6000);
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
            }
            if (_GLF_DEAD(false)) {
                if (_GLF_DEAD(false)) {
                    return;
                }
                if (_GLF_DEAD(false)) {
                    _GLF_color = GLF_live3_GLF_color;
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    _GLF_color = _GLF_color;
                }
                return;
            }
        }
    } else {
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
            _GLF_color = GLF_live3_GLF_color;
        }
        {
            vec4 GLF_live0c = _GLF_FUZZED(vec4(-3764.4996, 5.9, _GLF_IDENTITY(-_GLF_IDENTITY(37.53, min(_GLF_IDENTITY(37.53, max(37.53, 37.53)), 37.53)), (_GLF_IDENTITY(-_GLF_IDENTITY(37.53, min(_GLF_IDENTITY(37.53, max(37.53, 37.53)), 37.53)), (-_GLF_IDENTITY(37.53, min(_GLF_IDENTITY(37.53, max(37.53, 37.53)), 37.53))) / 1.0)) * 1.0), -8.2).rbgr);
            {
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(6.4, 4.3, 223.303, -1.2);
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                vec2 GLF_live5coord = _GLF_FUZZED(vec2(-2.5, 2064.7505).xx);
                int GLF_live5i = _GLF_FUZZED(-39472);
                vec4 GLF_live5texel = _GLF_FUZZED(_GLF_IDENTITY(vec4(1.4, -3079.4559, 19.18, 51.48), _GLF_IDENTITY(mat4(1.0) * (vec4(1.4, -3079.4559, 19.18, 51.48)), (mat4(1.0) * (vec4(1.4, -3079.4559, 19.18, 51.48))) - vec4(0.0, 0.0, 0.0, 0.0))));
                {
                    GLF_live5coord = GLF_live5texel.xz + GLF_live5texel.yy;
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(vec2(-348.670, -2.3), -6.0, vec4(3.7, 5564.4889, 981.376, 189.886)[0]);
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    GLF_live5coord = floor(GLF_live5coord * 256.0) / 256.0;
                    GLF_live5texel = texture(GLF_live5tex, GLF_live5coord);
                    GLF_live5i++;
                }
            }
            int GLF_live0i = _GLF_FUZZED(-20440);
            {
                vec2 GLF_live5coord = _GLF_FUZZED(vec2(-517.099, -1.9));
                int GLF_live5i = _GLF_FUZZED(-43467);
                int GLF_live5looplimiter0 = 0;
                vec4 GLF_live5texel = _GLF_FUZZED(vec4(-387.370, _GLF_IDENTITY(-432.957, float(mat2(-432.957, 1.0, 1.0, 1.0))), -476.117, 7.4));
                if (_GLF_DEAD(false)) {
                    return;
                }
                while (GLF_live5texel.x + GLF_live5texel.y + GLF_live5texel.z > 1.0 && GLF_live5i < 16) {
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        if (_GLF_DEAD(false)) {
                            continue;
                        }
                        _GLF_color = vec4(-295.954, 623.110, -3.1, 89.57);
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    if (GLF_live5looplimiter0 >= 5) {
                        break;
                    }
                    GLF_live5looplimiter0++;
                    {
                        GLF_live5coord = GLF_live5texel.xz + GLF_live5texel.yy;
                        GLF_live5coord = floor(_GLF_IDENTITY(GLF_live5coord, clamp(_GLF_IDENTITY(GLF_live5coord, min(GLF_live5coord, GLF_live5coord)), _GLF_IDENTITY(GLF_live5coord, max(_GLF_IDENTITY(GLF_live5coord, mix(vec2((GLF_live5coord)[0], (GLF_live5coord)[1]), vec2(_GLF_FUZZED(89.50), _GLF_FUZZED(-453.121)), bvec2(false, false))), GLF_live5coord)), _GLF_IDENTITY(GLF_live5coord, max(GLF_live5coord, _GLF_IDENTITY(GLF_live5coord, mix(vec2(_GLF_FUZZED(94.00), _GLF_FUZZED(-4.1)), vec2((GLF_live5coord)[0], (GLF_live5coord)[1]), bvec2(true, true))))))) * 256.0) / 256.0;
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = degrees(vec4(6661.4849, -3636.1918, -7508.5445, 5.5));
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                        GLF_live5texel = texture(GLF_live5tex, GLF_live5coord);
                        GLF_live5i++;
                        {
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < log(1.0))))) {
                                return;
                            }
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = exp(vec4(-7.2, 64.78, -8.2, 0.9));
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                    }
                }
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                _GLF_IDENTITY(_GLF_color = vec4(-59.08, resolution, normalize(-1.4)), vec4(0.0, 0.0, 0.0, 0.0) + (_GLF_IDENTITY(_GLF_color = vec4(-59.08, resolution, normalize(-1.4)), vec4(0.0, 0.0, 0.0, 0.0) + (_GLF_color = vec4(-59.08, resolution, normalize(-1.4))))));
            }
            if (_GLF_DEAD(_GLF_IDENTITY(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)), !(_GLF_IDENTITY(!(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))), !(_GLF_IDENTITY(!(_GLF_IDENTITY(!(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))), bool(bvec3(!(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))), true, false)))), bool(bool(!(_GLF_IDENTITY(!(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))), bool(bvec3(!(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))), true, false))))))))))))) {
                return;
            }
            {
                _GLF_IDENTITY(GLF_live0c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live0i, 4)] = GLF_live0c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live0i, 4)] * GLF_live0c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live0i, 4)], _GLF_IDENTITY(dot(vec4(0.0, 1.0, 0.0, 0.0), vec4(1.0, 0.0, 1.0, 1.0)), dot(vec4(0.0, 1.0, 0.0, 0.0), vec4(1.0, 0.0, 1.0, 1.0))) + (GLF_live0c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live0i, 4)] = GLF_live0c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live0i, 4)] * GLF_live0c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live0i, 4)]));
                {
                    vec4 GLF_live4c = _GLF_FUZZED((mat3x4(2.4, 382.454, 2147.9823, 435.991, _GLF_IDENTITY(726.718, min(726.718, 726.718)), -918.823, 34.98, -9.8, 19.17, 5.2, -4.2, -430.426) * vec3(-4.2, -19.70, 965.249)));
                    int GLF_live4i = _GLF_FUZZED(23603);
                    if (GLF_live4c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live4i, 4)] >= 1.0) {
                        if (_GLF_DEAD(false)) {
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                return;
                            }
                            _GLF_color = GLF_live0c;
                        }
                        GLF_live4c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live4i, 4)] = GLF_live4c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live4i, 4)] * GLF_live4c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live4i, 4)];
                    }
                    if (_GLF_DEAD(false)) {
                        return;
                    }
                }
            }
        }
        if (binarySearch(obj, 1) == -1) {
            discard;
            if (_GLF_DEAD(false)) {
                return;
            }
        } else {
            {
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(0.7, 108.524, -1.9, 643.738);
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                int GLF_live4looplimiter1 = 0;
                if (_GLF_IDENTITY(GLF_live4looplimiter1, (_GLF_IDENTITY(GLF_live4looplimiter1, clamp(GLF_live4looplimiter1, GLF_live4looplimiter1, GLF_live4looplimiter1))) / 1) >= 7) {
                    ;
                }
            }
            color.yz += color.yz;
        }
    }
    if (_GLF_DEAD(false)) {
        return;
    }
    _GLF_color = vec4(color, injectionSwitch.y);
}
