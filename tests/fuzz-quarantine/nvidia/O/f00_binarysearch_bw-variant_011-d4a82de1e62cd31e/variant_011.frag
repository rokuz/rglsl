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

layout(set = 0, binding = 2) uniform buf2 {
    vec2 GLF_live9injectionSwitch;
};

vec4 GLF_live6_GLF_color = _GLF_FUZZED((322.483 * vec4(12.40, 6.2, -657.310, -50.54)));
vec4 GLF_live0_GLF_color = _GLF_FUZZED(vec4(5.3, -20.75, 92.06, -1794.9786));
vec4 GLF_live3_GLF_color = _GLF_FUZZED(vec4(46.11, -348.717, -5731.4691, -742.927));

layout(set = 0, binding = 3) uniform buf3 {
    vec2 GLF_live3injectionSwitch;
};

float GLF_live3compute_derivative_x(float GLF_live3v) {
    {
        {
            ;
        }
    }
    return dFdx(GLF_live3v) * GLF_live3injectionSwitch.y;
}

float GLF_live3compute_derivative_y(float GLF_live3v) {
    return dFdy(GLF_live3v) * GLF_live3injectionSwitch.y;
}

float GLF_live3compute_stripe(float GLF_live3v) {
    return smoothstep(-.9, 1., (GLF_live3v) / ((GLF_live3injectionSwitch.y > GLF_live3injectionSwitch.x) ? GLF_live3compute_derivative_x(GLF_live3v) : GLF_live3compute_derivative_y(GLF_live3v)));
}

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

vec4 _GLF_outlined_7(vec4 _GLF_outVarBackup_GLF_color) {
    return _GLF_outVarBackup_GLF_color;
}

vec4 _GLF_outlined_8(vec4 _GLF_color) {
    return _GLF_color;
}

vec4 _GLF_outlined_9(vec4 _GLF_outVarBackup_GLF_color) {
    return _GLF_outVarBackup_GLF_color;
}

vec4 _GLF_outlined_23(vec4 _GLF_outVarBackup_GLF_color) {
    return _GLF_outVarBackup_GLF_color;
}

vec4 _GLF_outlined_24(vec4 _GLF_color) {
    return _GLF_color;
}

vec4 _GLF_outlined_25(vec4 _GLF_color) {
    return _GLF_color;
}

vec4 _GLF_outlined_26(vec4 _GLF_color) {
    return _GLF_color;
}

int _GLF_outlined_27(int GLF_live11v) {
    return (4 * GLF_live11v * (1000 - GLF_live11v)) / 1000;
}

vec4 _GLF_outlined_28(vec4 _GLF_outVarBackup_GLF_color) {
    return _GLF_outVarBackup_GLF_color;
}

vec4 _GLF_outlined_29() {
    return dFdxCoarse(vec4(-63.74, 3234.3972, -7.6, -2.9));
}

vec4 _GLF_outlined_30(vec4 _GLF_outVarBackup_GLF_color) {
    return _GLF_outVarBackup_GLF_color;
}

vec4 _GLF_outlined_31(vec4 _GLF_outVarBackup_GLF_color) {
    return _GLF_outVarBackup_GLF_color;
}

vec4 _GLF_outlined_32(vec4 _GLF_outVarBackup_GLF_color) {
    return _GLF_outVarBackup_GLF_color;
}

vec4 _GLF_outlined_33(vec4 _GLF_color) {
    return _GLF_color;
}

vec4 _GLF_outlined_34(vec4 _GLF_outVarBackup_GLF_color) {
    return _GLF_outVarBackup_GLF_color;
}

vec4 _GLF_outlined_35() {
    return vec4(-349.534, -5.8, 4.5, -6.8);
}

vec4 _GLF_outlined_36(vec4 _GLF_outVarBackup_GLF_color) {
    return _GLF_outVarBackup_GLF_color;
}

vec4 _GLF_outlined_37() {
    return (7.9 + vec4(-956.761, 6653.3468, -2294.6280, 84.32));
}

vec2 brick(vec2 uv) {
    int a = 4;
    {
        int GLF_live5c_im = _GLF_FUZZED(22081);
        int GLF_live5c_re = _GLF_FUZZED(ivec4(36001, -79193, 5207, 41460).a);
        int GLF_live5iteration = _GLF_FUZZED(72098);
        {
            int GLF_live8looplimiter2 = 0;
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = acos(vec4(-70.75, 0.3, 204.727, -6.5));
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    if (_GLF_DEAD(_GLF_IDENTITY(false, (false) && true))) {
                        _GLF_color = (mat2x4(-2544.1131, 8.6, -8740.6379, 291.688, -4.6, 40.28, -2.3, -129.944) * GLF_live3injectionSwitch);
                    }
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            if (GLF_live8looplimiter2 >= 6) {
                ;
            }
        }
        int GLF_live5x = _GLF_FUZZED(-83741);
        int GLF_live5y = _GLF_FUZZED(69605);
        {
            int GLF_live5looplimiter0 = 0;
            for (int GLF_live5k = 0; GLF_live5k < 1000; GLF_live5k++) {
                {
                    float GLF_live10xCoord = _GLF_FUZZED(vec3(-623.066, -3.7, 507.613).x);
                    float GLF_live10yCoord = _GLF_FUZZED(573.220);
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(-305.825, 1.0, -23.52, -358.319);
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(true, bool(bvec3(true, true, true))))) {
                            _GLF_color = _GLF_outlined_23(_GLF_outVarBackup_GLF_color);
                        }
                    }
                    {
                        ;
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = step(vec4(3.3, 9.9, -901.312, -1828.6777), vec4(-2.6, -9.9, 0.6, 9.6));
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                    }
                }
                if (GLF_live5looplimiter0 >= 6) {
                    break;
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_IDENTITY(dot(vec3(1.0, sin(0.0), 0.0), vec3(0.0, 1.0, 1.0)), _GLF_IDENTITY(dot(vec3(1.0, sin(0.0), 0.0), vec3(0.0, 1.0, 1.0)), 0.0 + (dot(vec3(1.0, sin(0.0), 0.0), vec3(0.0, 1.0, 1.0))))))))) {
                    _GLF_color = GLF_live0_GLF_color;
                }
                GLF_live5looplimiter0++;
                {
                    if (GLF_live5x * GLF_live5x + GLF_live5y * GLF_live5y > 262144) {
                        break;
                    }
                    int GLF_live5x_new = ((GLF_live5x * GLF_live5x - GLF_live5y * GLF_live5y) / 256 + GLF_live5c_re);
                    GLF_live5y = (2 * GLF_live5x * GLF_live5y / 256 + GLF_live5c_im);
                    GLF_live5x = GLF_live5x_new;
                    {
                        int GLF_live9j = _GLF_FUZZED((int(false) * 88906));
                        int GLF_live9looplimiter2 = 0;
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = acosh(vec4(963.938, 598.977, 6.3, -3.5));
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                        vec3 GLF_live9m = _GLF_FUZZED(vec3(-4.0, 1.0, -44.94));
                        vec2 GLF_live9n = _GLF_FUZZED(vec2(4.7, 2.2));
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                            _GLF_color = mix(vec4(7.9, 0.4, -6.7, 2.5), GLF_live0_GLF_color, isinf(_GLF_color));
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = uintBitsToFloat(uvec4(1440u, 82472u, 44527u, 195620u));
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                        }
                        {
                            if (GLF_live9looplimiter2 >= 4) {
                                ;
                            }
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_outlined_24(_GLF_color);
                                _GLF_color = vec4(-2714.7133, -932.385, -751.852, 4.0);
                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                            GLF_live9looplimiter2++;
                            {
                                {
                                    int GLF_live9looplimiter1 = 0;
                                    for (int GLF_live9i = -1; GLF_live9i <= int(GLF_live9injectionSwitch.y); GLF_live9i++) {
                                        if (GLF_live9looplimiter1 >= 4) {
                                            break;
                                        }
                                        GLF_live9looplimiter1++;
                                        {
                                            vec2 GLF_live9g = vec2(float(GLF_live9j), float(GLF_live9i));
                                            vec2 GLF_live9o = mix(GLF_live9n, GLF_live9g, 0.2);
                                            if (GLF_live9injectionSwitch.x < (GLF_live9m.x)) {
                                                int GLF_live9k = 1;
                                                {
                                                    int GLF_live9looplimiter0 = 0;
                                                    while (GLF_live9k >= 0) {
                                                        if (GLF_live9looplimiter0 >= 4) {
                                                            break;
                                                        }
                                                        GLF_live9looplimiter0++;
                                                        {
                                                            GLF_live9o = GLF_live9o + GLF_live9o;
                                                            GLF_live9k--;
                                                        }
                                                    }
                                                }
                                                GLF_live9m = vec3(GLF_live9injectionSwitch.x, cos(GLF_live9o));
                                                {
                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                    _GLF_color = vec4(-9.5, -1680.1768, -2764.0643, -620.831);
                                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    GLF_live5iteration++;
                }
            }
        }
    }
    do {
        uv.y -= step(injectionSwitch.y, uv.x);
        uv.x -= fract(tanh(uv.x)) / ldexp(injectionSwitch.y, findMSB(a));
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = sin(vec4(0.7, -701.035, -5810.0532, -93.10));
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_outlined_25(_GLF_color);
                _GLF_color = vec4(-725.299, 6.0, -197.776, -534.658);
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = clamp(vec4(-1.9, 725.567, 2696.3826, 5300.1268), vec4(22.82, -5.7, -999.838, 7.0), vec4(9236.8579, 47.91, -37.56, -7466.0553));
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= abs(abs(0.0)))))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
        {
            int GLF_live5looplimiter2 = 0;
            if (GLF_live5looplimiter2 >= 6) {
                ;
            }
        }
        a--;
        {
            {
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    if (_GLF_DEAD(false)) {
                        _GLF_color = _GLF_color;
                    }
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = pow(vec4(9742.9316, 39.28, -496.905, 7.5), vec4(1386.2911, 47.48, -5.4, -2751.3466));
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_outlined_26(_GLF_color);
                        _GLF_color = intBitsToFloat(ivec4(-2909, 91816, 27954, 91661));
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                        {
                            int GLF_live5looplimiter3 = 0;
                            if (GLF_live5looplimiter3 >= 6) {
                                ;
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = vec4(-2696.9238, -8.0, -6.7, 0.5);
                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= sin(0.0))))) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                            }
                        }
                    }
                }
                ;
            }
        }
    } while (a > int(injectionSwitch.x));
    {
        int GLF_live5looplimiter1 = 0;
        if (GLF_live5looplimiter1 >= 6) {
            ;
        }
    }
    {
        vec4 _GLF_outVarBackup_GLF_color;
        {
            int GLF_live1looplimiter1 = 0;
            {
                {
                    {
                        {
                            int GLF_live11looplimiter0 = 0;
                            int GLF_live11v = _GLF_FUZZED((83076 | (-93502)));
                            {
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = vec4(866.322, -2.2, 64.67, -153.051);
                                    }
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        _GLF_color = vec4(0.9, -61.23, 0.9, -970.660);
                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                    }
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = (asinh(vec3(-17.70, 260.842, 4.0)) * mat4x3(4656.5256, -736.876, 7.8, 8.3, -7.4, 2.7, 8.9, -278.950, 17.88, 625.279, 4.5, -99.77));
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = pow(vec4(-1.8, 9.0, 5.1, -849.497), vec4(-166.755, -4.7, 4.4, 471.568).yxyy);
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                                if (GLF_live11looplimiter0 >= 7) {
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        _GLF_color = atan(vec4(-4.6, 20.66, -1.4, 93.09));
                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                    }
                                    ;
                                }
                                GLF_live11looplimiter0++;
                                {
                                    GLF_live11v = _GLF_outlined_27(GLF_live11v);
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        _GLF_color = vec4(58.75, -494.016, 0.6, 2.8);
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                    }
                                }
                            }
                        }
                        ;
                    }
                }
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(508.986, 5.6, -822.076, 3.9);
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        _GLF_color = vec4(-1232.9904, -150.990, 4689.7121, 23.10);
                    }
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            if (GLF_live1looplimiter1 >= 7) {
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = mat4(-9.1, 29.07, 0.5, 51.03, 79.08, -308.120, -9966.0240, -9629.2274, -9.3, 5705.0582, 4.6, -337.951, -56.63, 2.0, -6.4, -26.38)[3];
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = abs(vec4(-557.511, -2.5, 99.09, -4.5));
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                {
                    int GLF_live5c_im = _GLF_FUZZED((((-34724) * (-36584)) + (-57677)));
                    int GLF_live5c_re = _GLF_FUZZED(-60181);
                    int GLF_live5iteration = _GLF_FUZZED((38302 & 12607));
                    int GLF_live5x = _GLF_FUZZED(((-51348) + 14363));
                    int GLF_live5y = _GLF_FUZZED(-47445);
                    {
                        int GLF_live5looplimiter0 = 0;
                        for (int GLF_live5k = 0; GLF_live5k < 1000; GLF_live5k++) {
                            if (GLF_live5looplimiter0 >= 6) {
                                {
                                    int GLF_live11looplimiter0 = 0;
                                    int GLF_live11v = _GLF_FUZZED(((25110) ^ ((-3740) & 83412)));
                                    {
                                        if (GLF_live11looplimiter0 >= 7) {
                                            ;
                                        }
                                        GLF_live11looplimiter0++;
                                        {
                                            GLF_live11v = (4 * GLF_live11v * (1000 - GLF_live11v)) / 1000;
                                            {
                                                vec4 _GLF_outVarBackup_GLF_color;
                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                _GLF_color = sin(vec4(989.134, 2.2, -55.78, -506.027));
                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                    _GLF_color = _GLF_outlined_28(_GLF_outVarBackup_GLF_color);
                                                }
                                            }
                                        }
                                    }
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        _GLF_color = vec4(5.2, -1376.7581, 746.684, -8.8);
                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= determinant(mat3(0.0, 0.0, 0.0, 0.0, log(1.0), 0.0, 0.0, 0.0, 0.0)))))) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                    }
                                }
                                break;
                            }
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = pow(vec4(2291.0317, -58.78, 53.21, 9.1), vec4(10.91, -92.23, 2.9, -7045.9432));
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                            GLF_live5looplimiter0++;
                            {
                                if (GLF_live5x * GLF_live5x + GLF_live5y * GLF_live5y > 262144) {
                                    break;
                                }
                                int GLF_live5x_new = ((GLF_live5x * GLF_live5x - GLF_live5y * GLF_live5y) / 256 + GLF_live5c_re);
                                GLF_live5y = (2 * GLF_live5x * GLF_live5y / 256 + GLF_live5c_im);
                                GLF_live5x = GLF_live5x_new;
                                {
                                    int GLF_live11i = _GLF_FUZZED(int(159832u));
                                    int GLF_live11iters = _GLF_FUZZED((true ? 22985 : (-(-82059))));
                                    int GLF_live11looplimiter0 = 0;
                                    int GLF_live11v = _GLF_FUZZED(int(121242u));
                                    for (GLF_live11i = 0; GLF_live11i < GLF_live11iters; GLF_live11i++) {
                                        if (GLF_live11looplimiter0 >= 7) {
                                            break;
                                        }
                                        GLF_live11looplimiter0++;
                                        {
                                            {
                                                vec4 _GLF_outVarBackup_GLF_color;
                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                _GLF_color = vec4(-64.79, -291.073, -41.96, 6.6);
                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                }
                                            }
                                            {
                                                vec4 _GLF_outVarBackup_GLF_color;
                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                _GLF_color = (-fract(vec4(0.1, 430.555, 6.4, -7.8)));
                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                }
                                            }
                                            GLF_live11v = (4 * GLF_live11v * (1000 - GLF_live11v)) / 1000;
                                        }
                                    }
                                }
                                GLF_live5iteration++;
                            }
                        }
                    }
                }
                if (_GLF_DEAD(false)) {
                    {
                        {
                            {
                                int GLF_live11i = _GLF_FUZZED((~68509));
                                int GLF_live11iters = _GLF_FUZZED(ivec3(58789, 11233, -37248).b);
                                int GLF_live11v = _GLF_FUZZED(73861);
                                {
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = vec4(-0.7, 689.659, 9.9, 1525.1863);
                                    }
                                    int GLF_live11looplimiter0 = 0;
                                    for (GLF_live11i = 0; GLF_live11i < GLF_live11iters; GLF_live11i++) {
                                        if (GLF_live11looplimiter0 >= 7) {
                                            break;
                                        }
                                        GLF_live11looplimiter0++;
                                        {
                                            GLF_live11v = (4 * GLF_live11v * (1000 - GLF_live11v)) / 1000;
                                        }
                                    }
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        _GLF_color = vec4(length((vec2(-8548.1611, 289.928) - vec2(-4.0, -9985.8634))));
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                        {
                                            vec4 _GLF_outVarBackup_GLF_color;
                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                            _GLF_color = mod(degrees(vec4(-2752.0044, 87.49, 8200.8439, 5430.0225)), vec4(8.8, 717.894, 7.2, 5301.9811));
                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                            }
                                        }
                                    }
                                }
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = _GLF_outlined_29();
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        _GLF_color = vec4(68.10, -8.1, 2.6, -622.405);
                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= _GLF_ZERO(0.0, injectionSwitch.x))))) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                    }
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        if (_GLF_DEAD(_GLF_IDENTITY(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)), bool(_GLF_IDENTITY(bvec3(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)), false, true), bvec3(bvec3(bvec3(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)), false, true)))))))) {
                                            _GLF_color = GLF_live0_GLF_color;
                                        }
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                            }
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = vec4(38.44, -6.1, -6.9, -12.83);
                                if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(true, false || (true)))) {
                                    _GLF_color = _GLF_outlined_30(_GLF_outVarBackup_GLF_color);
                                }
                            }
                            ;
                        }
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = (vec4(-94.03, 467.687, 3.9, 2582.0769) - vec4(-829.915, -2535.1036, 3.2, -3.9));
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= sqrt(0.0))))) {
                                _GLF_color = _GLF_outlined_7(_GLF_outVarBackup_GLF_color);
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = vec4(1.8, 107.724, 7.5, 312.923);
                                }
                            }
                        }
                    }
                    _GLF_color = GLF_live0_GLF_color;
                }
                ;
            }
        }
        {
            int GLF_live7i = _GLF_FUZZED(-22571);
            int GLF_live7j = _GLF_FUZZED(-75877);
            if (GLF_live7j < GLF_live7i + 1) {
                ;
            }
        }
        _GLF_outVarBackup_GLF_color = _GLF_outlined_8(_GLF_color);
        _GLF_color = vec4(275.531, -25.78, 2893.1522, -24.88);
        {
            {
                vec4 _GLF_outVarBackup_GLF_color;
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = round(asin(vec4(-8894.3704, 35.84, -34.99, -396.146)));
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = max(vec4(-215.220, 8.2, -60.77, 372.283), vec4(-6.8, -7585.9730, 1256.1549, 5.1));
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(-2.6, 9330.0602, -8.4, -9.7);
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outlined_31(_GLF_outVarBackup_GLF_color);
                    }
                }
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    if (_GLF_DEAD(false)) {
                        _GLF_color = exp(vec4(3.2, -709.233, -34.07, 4.7));
                    }
                    _GLF_color = _GLF_outlined_32(_GLF_outVarBackup_GLF_color);
                }
            }
            vec4 _GLF_outVarBackup_GLF_color;
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = min(vec4(160.011, -8.7, 289.289, -89.50), atan(-6896.7408, min(-38.70, -923.755)));
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= log(_GLF_ONE(1.0, injectionSwitch.y)))))) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            {
                vec4 _GLF_outVarBackup_GLF_color;
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec3(8.8, -1.9, 33.99).psst;
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(float(44746), 222.655, trunc(vec2(-284.629, 9.3)));
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            _GLF_outVarBackup_GLF_color = _GLF_outlined_33(_GLF_color);
            _GLF_color = vec4(2.1, 6213.8987, -0.2, -6.4);
            if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(true, bool(_GLF_IDENTITY(bool(true), !(!(bool(true)))))))) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = ceil(faceforward(mat4(-4177.0845, -568.122, 5474.8119, -6961.0387, 848.401, 22.67, -30.57, 7251.9680, -8.5, 3.7, 937.539, -232.395, -90.45, 78.00, 81.50, -3.4)[1], vec4(-6.6, 5.6, -300.934, 1.6), vec4(-3.7, -39.30, 58.99, 95.89)));
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
                _GLF_color = mat2x4(5922.8604, -180.183, -5.0, 94.16, 7.6, 55.99, -85.17, 986.808)[1];
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                _GLF_color = _GLF_color;
            }
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = roundEven(vec4(-8.5, 9.6, 6282.7988, 4.6));
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                _GLF_color = _GLF_outlined_9(_GLF_outVarBackup_GLF_color);
            }
        }
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            _GLF_color = _GLF_outlined_34(_GLF_outVarBackup_GLF_color);
        }
    }
    int b = 3;
    {
        {
            {
                int GLF_live11looplimiter0 = 0;
                int GLF_live11v = _GLF_FUZZED((+37273));
                {
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = _GLF_outlined_35();
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    if (GLF_live11looplimiter0 >= 7) {
                        ;
                    }
                    GLF_live11looplimiter0++;
                    {
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = vec4(8.3, 4.7, 4599.0764, -5977.8503);
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)), false || (_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))))) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                        GLF_live11v = (4 * GLF_live11v * (1000 - GLF_live11v)) / 1000;
                    }
                }
            }
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = (vec4(-91.75, 4.6, 43.29, -0.1) * 932.592);
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                _GLF_color = _GLF_outlined_36(_GLF_outVarBackup_GLF_color);
            }
        }
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        _GLF_color = dFdy(vec4(0.8, -84.24, 1.9, -251.550));
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
            {
                {
                    ;
                }
            }
        }
    }
    do {
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = mod(vec4(325.332, 5.1, 2352.4205, 6.0), vec4(2.8, -1.0, -6.3, 4683.2609));
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
        uv.y -= step(injectionSwitch.y, uv.x) + float(a);
        uv.x *= (isnan(uv.y) ? cosh(gl_FragCoord.y) : tanh(gl_FragCoord.x));
        b--;
        {
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(7447.1075, -9266.9005, -60.01, -0.3);
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            vec4 _GLF_outVarBackup_GLF_color;
            {
                int GLF_live11i = _GLF_FUZZED(-21059);
                int GLF_live11iters = _GLF_FUZZED(((-49662) | (+(-36997))));
                int GLF_live11looplimiter0 = 0;
                int GLF_live11v = _GLF_FUZZED(61761);
                for (GLF_live11i = 0; GLF_live11i < GLF_live11iters; GLF_live11i++) {
                    if (GLF_live11looplimiter0 >= 7) {
                        break;
                    }
                    GLF_live11looplimiter0++;
                    {
                        GLF_live11v = (4 * GLF_live11v * (1000 - GLF_live11v)) / 1000;
                    }
                }
            }
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = _GLF_outlined_37();
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(-2646.5987, 51.88, -858.030, -10.29);
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
        }
    } while (b > int(injectionSwitch.x));
    int c = 2;
    {
        int GLF_live11looplimiter0 = 0;
        if (GLF_live11looplimiter0 >= 7) {
            ;
            if (_GLF_DEAD(false)) {
                _GLF_color = GLF_live6_GLF_color;
            }
            {
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(-5.1, -3849.9862, 8653.1984, 9.6);
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec2(-9849.2190, 397.242).xyyy;
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
        }
    }
    do {
        uv.y -= step(injectionSwitch.y, uv.x) + float(a) + float(b);
        uv.x += ldexp(injectionSwitch.y, isinf(uv.y + uv.x) ? findMSB(b) : findMSB(a));
        c--;
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = (vec4(248.173, -541.754, 9.6, -9686.1583));
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= log(1.0))))) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
    } while (c > int(injectionSwitch.x));
    int d = 1;
    do {
        uv.y -= step(injectionSwitch.y, uv.x) + float(a) + float(b) + float(c);
        d--;
    } while (d > int(injectionSwitch.x));
    return fract(uv);
}

vec4 _GLF_outlined_10(vec4 _GLF_color) {
    return _GLF_color;
}

vec4 _GLF_outlined_11(vec4 _GLF_color) {
    return _GLF_color;
}

vec4 _GLF_outlined_12() {
    return vec4(648.353, -4274.5167, 8.9, 7577.2687);
}

vec4 _GLF_outlined_13() {
    return vec4(-798.680, 6.6, 1297.3751, 81.57);
}

vec4 _GLF_outlined_38() {
    return (vec2(8942.9152, -8109.6405) * mat4x2(-84.68, 7.5, -329.706, 411.633, -392.495, -1.4, -70.58, -79.40));
}

vec4 _GLF_outlined_39(vec4 _GLF_outVarBackup_GLF_color) {
    return _GLF_outVarBackup_GLF_color;
}

vec4 _GLF_outlined_40(vec4 _GLF_color) {
    return _GLF_color;
}

vec4 _GLF_outlined_41(vec4 _GLF_color) {
    return _GLF_color;
}

vec4 _GLF_outlined_42(vec4 _GLF_outVarBackup_GLF_color) {
    return _GLF_outVarBackup_GLF_color;
}

float patternize(vec2 uv) {
    if (_GLF_DEAD(false)) {
        _GLF_color = _GLF_outlined_38();
    }
    vec2 size = vec2(0.45);
    vec2 st = smoothstep(size, size, uv);
    switch (int(mod(gl_FragCoord.y, 5.0))) {
        case 0:
            return mix(pow(st.x, injectionSwitch.y), st.x, size.y);
            if (_GLF_DEAD(false)) {
                _GLF_color = _GLF_color;
            }
            break;
        case 1:
            return mix(pow(uv.y, injectionSwitch.y), st.y, size.x);
            break;
        case 2:
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    _GLF_color = mat3x4(-1.0, 95.09, 7.3, 4174.8287, 9.8, 2.8, -7585.6563, -43.00, 5036.0041, -5.4, 3.0, -900.761)[0];
                }
                _GLF_color = vec4(dFdx(vec2(-587.381, 883.684)), vec2(2562.0424, 999.340));
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_outlined_10(_GLF_color);
                        _GLF_color = vec4(3.6, -1124.1219, 51.23, -937.566);
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = (mat2x4(-7.1, 9643.2055, 3.7, -91.45, 7.9, 631.332, 36.45, -3468.2034)[1] - (-6.1));
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                }
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(241.429, 1876.4238, 19.61, -875.285);
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        {
                            int GLF_live5c_im = _GLF_FUZZED(-40864);
                            int GLF_live5c_re = _GLF_FUZZED((+(-48744)));
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = vec4(0.3, -156.738, 286.343, -1.6);
                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                            int GLF_live5iteration = _GLF_FUZZED(56004);
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_outlined_11(_GLF_color);
                                _GLF_color = (6.5 * dFdxCoarse(vec4(-4.5, -7.4, 6440.3053, 2232.0182)));
                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                    _GLF_color = _GLF_outlined_39(_GLF_outVarBackup_GLF_color);
                                }
                            }
                            int GLF_live5x = _GLF_FUZZED(31582);
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = vec4(316.171, -7.8, 99.80, 498.067);
                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= _GLF_IDENTITY(dot(vec2(0.0, determinant(mat3(1.0, 1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 1.0))), vec2(1.0, 0.0)), dot(vec2(0.0, determinant(mat3(1.0, 1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 1.0))), vec2(1.0, 0.0))))))) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                            int GLF_live5y = _GLF_FUZZED((false ? 64179 : (-33798)));
                            {
                                int GLF_live5looplimiter0 = 0;
                                for (int GLF_live5k = 0; GLF_live5k < 1000; GLF_live5k++) {
                                    if (GLF_live5looplimiter0 >= 6) {
                                        break;
                                    }
                                    GLF_live5looplimiter0++;
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_outlined_40(_GLF_color);
                                        _GLF_color = vec4(923.547, -425.433, -9761.4442, 96.90);
                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                _GLF_color = vec4(-72.45, 84.65, 661.342, -483.571);
                                            }
                                        }
                                    }
                                    {
                                        {
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                _GLF_color = ((-970.253) + GLF_live6_GLF_color);
                                            }
                                            float GLF_live10c_im = _GLF_FUZZED(-46.75);
                                            float GLF_live10c_re = _GLF_FUZZED(-9.7);
                                            int GLF_live10iteration = _GLF_FUZZED((false ? ivec4(26557, 23675, 15937, -91619) : ivec4(9914, -63850, 18742, -88121)).a);
                                            float GLF_live10x = _GLF_FUZZED((false ? 7839.9407 : float(-93231)));
                                            float GLF_live10y = _GLF_FUZZED(-33.51);
                                            if (_GLF_DEAD(false)) {
                                                _GLF_color = acos(GLF_live0_GLF_color);
                                            }
                                            {
                                                if (GLF_live10x * GLF_live10x + GLF_live10y * GLF_live10y > 4.0) {
                                                    ;
                                                }
                                                float GLF_live10x_new = GLF_live10x * GLF_live10x - GLF_live10y * GLF_live10y + GLF_live10c_re;
                                                GLF_live10y = 2.0 * GLF_live10x * GLF_live10y + GLF_live10c_im;
                                                GLF_live10x = GLF_live10x_new;
                                                GLF_live10iteration++;
                                                {
                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                    _GLF_color = vec4(-96.95, 97.33, 8.1, -3384.2930);
                                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                    }
                                                }
                                            }
                                        }
                                        if (GLF_live5x * GLF_live5x + GLF_live5y * GLF_live5y > 262144) {
                                            break;
                                        }
                                        int GLF_live5x_new = ((GLF_live5x * GLF_live5x - GLF_live5y * GLF_live5y) / 256 + GLF_live5c_re);
                                        GLF_live5y = (2 * GLF_live5x * GLF_live5y / 256 + GLF_live5c_im);
                                        GLF_live5x = GLF_live5x_new;
                                        GLF_live5iteration++;
                                    }
                                }
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                _GLF_color = faceforward(_GLF_outVarBackup_GLF_color, fwidth(GLF_live6_GLF_color), _GLF_color);
                            }
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = mod(tanh(vec4(80.57, 1401.7161, -8.0, 2.4)), vec4(-3360.6852, 3412.1871, -8.5, 9661.1087));
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                        }
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
            }
            discard;
            break;
            {
                float GLF_live6pab = _GLF_FUZZED((7.6 + float(56765)));
                float GLF_live6pca = _GLF_FUZZED(-2467.8470);
                if (!((GLF_live6pab < 0.0 && GLF_live6pca < 0.0) || (GLF_live6pab >= 0.0 && GLF_live6pca >= 0.0))) {
                    ;
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(80.45, 2753.7467, 933.874, -5332.6617);
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                }
            }
        case 3:
            {
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = smoothstep(72.02, 4.5, vec4(-57.61, 8.3, -3252.9261, 6967.1205));
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = _GLF_outlined_12();
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = _GLF_outlined_13();
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            return mix(pow(uv.y, injectionSwitch.y), uv.y, size.y);
            break;
            {
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(-6220.2243, -1.2, -13.70, 6984.7351);
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= abs(0.0))))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                float GLF_live10xCoord = _GLF_FUZZED(202.707);
                if (_GLF_DEAD(false)) {
                    _GLF_color = GLF_live6_GLF_color;
                }
                float GLF_live10yCoord = _GLF_FUZZED(float(2351));
                {
                    ;
                }
            }
        case 4:
            {
                {
                    ;
                }
            }
            return mix(pow(st.y, injectionSwitch.y), st.x, size.x);
            break;
            {
                {
                    ;
                }
            }
            {
                int GLF_live8i = _GLF_FUZZED(-33557);
                int GLF_live8j = _GLF_FUZZED(ivec2(-42251, 66274).g);
                if (GLF_live8j < GLF_live8i + 1) {
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_outlined_41(_GLF_color);
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = vec4(3.5, 5.3, -2.5, -8396.1825);
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                        _GLF_color = vec4(4.7, 2159.3531, 83.85, 0.4);
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outlined_42(_GLF_outVarBackup_GLF_color);
                        }
                    }
                    ;
                }
            }
    }
}

vec4 _GLF_outlined_1() {
    return unpackSnorm4x8(191662u);
}

vec3 _GLF_outlined_2(vec2 GLF_live3uv, float GLF_live3stripe) {
    return mix(vec3(0.5, GLF_live3uv.x, 0.1), vec3(.4, 0, .5), GLF_live3stripe);
    {
        {
            int GLF_live11i = _GLF_FUZZED(-39043);
            int GLF_live11iters = _GLF_FUZZED(92017);
            int GLF_live11looplimiter0 = 0;
            int GLF_live11v = _GLF_FUZZED(55902);
            for (GLF_live11i = 0; GLF_live11i < GLF_live11iters; GLF_live11i++) {
                if (GLF_live11looplimiter0 >= 7) {
                    break;
                }
                GLF_live11looplimiter0++;
                {
                    if (_GLF_DEAD(false)) {
                        _GLF_color = tan(vec4(-47.14, -26.85, -7.1, 33.56));
                    }
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = sqrt(mix(vec4(-54.29, -306.381, 15.50, -965.002), vec4(9.1, 1.0, 74.79, -6143.8877), bvec4(false, true, true, true)));
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)), !(!(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y))))))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                {
                    GLF_live11v = (4 * GLF_live11v * (1000 - GLF_live11v)) / 1000;
                }
            }
        }
        {
            ;
            {
                int GLF_live8looplimiter1 = 0;
                if (GLF_live8looplimiter1 >= 6) {
                    ;
                }
            }
        }
    }
}

vec4 _GLF_outlined_14() {
    return max(smoothstep(-379.318, 55.54, vec4(88.13, -66.96, -0.6, 9.3)), vec4(-434.444, -4.8, 5.9, -9.9));
}

vec4 _GLF_outlined_15(vec4 _GLF_color) {
    return _GLF_color;
}

vec4 _GLF_outlined_43(vec4 _GLF_outVarBackup_GLF_color) {
    return _GLF_outVarBackup_GLF_color;
}

vec4 _GLF_outlined_44(vec4 _GLF_outVarBackup_GLF_color) {
    return _GLF_outVarBackup_GLF_color;
}

vec3 _GLF_outlined_45(vec2 GLF_live9injectionSwitch, vec2 GLF_live9o) {
    return vec3(GLF_live9injectionSwitch.x, cos(GLF_live9o));
}

vec4 _GLF_outlined_46(vec4 _GLF_color) {
    return _GLF_color;
}

int binarySearch(BinarySearchObject obj, int x) {
    int l = 0, r = 9;
    {
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        _GLF_color = vec4(7.6, -0.7, -3271.8401, -4042.7105);
        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
    }
    while (l <= r) {
        int m = (l + r) / 2;
        if (obj.prime_numbers[m] == x) {
            return m;
        }
        if (obj.prime_numbers[m] < x) {
            l = m + 1;
        } else {
            {
                {
                    ;
                }
            }
            r = m - 1;
        }
    }
    if (_GLF_DEAD(false)) {
        _GLF_color = (+_GLF_color);
        {
            {
                {
                    GLF_live6_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = _GLF_outlined_14();
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = vec4(-483.684, 7.3, -1.2, 196.691);
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    _GLF_color = _GLF_outlined_43(_GLF_outVarBackup_GLF_color);
                                }
                            }
                        }
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                }
            }
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(42.47, -69.38, 9472.6021, 11.50);
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            {
                int GLF_live9looplimiter2 = 0;
                vec3 GLF_live9m = _GLF_FUZZED(vec3(324.349, 5835.9943, -80.35));
                vec2 GLF_live9n = _GLF_FUZZED(vec2(2.7, -9475.9142));
                for (int GLF_live9j = -1; GLF_live9j <= int(GLF_live9injectionSwitch.y); GLF_live9j++) {
                    if (GLF_live9looplimiter2 >= 4) {
                        break;
                    }
                    GLF_live9looplimiter2++;
                    {
                        {
                            int GLF_live9looplimiter1 = 0;
                            for (int GLF_live9i = -1; GLF_live9i <= int(GLF_live9injectionSwitch.y); GLF_live9i++) {
                                if (GLF_live9looplimiter1 >= 4) {
                                    break;
                                }
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = vec4(307.104, -4.0, 146.468, -5669.2809);
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        _GLF_color = _GLF_outlined_44(_GLF_outVarBackup_GLF_color);
                                    }
                                }
                                GLF_live9looplimiter1++;
                                {
                                    vec2 GLF_live9g = vec2(float(GLF_live9j), float(GLF_live9i));
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        _GLF_color = vec4(98.06, -955.093, -510.826, -8.0);
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                        {
                                            vec4 _GLF_outVarBackup_GLF_color;
                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                            _GLF_color = smoothstep(vec4(-7713.8095, 539.486, -8.4, -59.61), vec4(-86.09, 9.8, -94.25, 1.0), vec4(0.4, 4.5, -4.8, -966.815));
                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                            }
                                        }
                                    }
                                    vec2 GLF_live9o = mix(GLF_live9n, GLF_live9g, 0.2);
                                    if (GLF_live9injectionSwitch.x < (GLF_live9m.x)) {
                                        int GLF_live9k = 1;
                                        {
                                            {
                                                vec4 _GLF_outVarBackup_GLF_color;
                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                _GLF_color = (vec4(494.462, 7150.2487, 55.72, -563.774) * mat4(-2097.5995, 565.954, -9.8, -7.2, 300.050, 63.74, 7.7, 109.546, -6.6, -1477.3227, -683.490, 1.1, -8.0, -88.26, -576.969, -46.79));
                                                if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(_GLF_TRUE(true, (gl_FragCoord.x >= _GLF_ZERO(0.0, injectionSwitch.x))), !(!(_GLF_TRUE(true, (gl_FragCoord.x >= _GLF_ZERO(0.0, injectionSwitch.x)))))))) {
                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                }
                                            }
                                            int GLF_live9looplimiter0 = 0;
                                            while (GLF_live9k >= 0) {
                                                if (GLF_live9looplimiter0 >= 4) {
                                                    break;
                                                }
                                                GLF_live9looplimiter0++;
                                                {
                                                    GLF_live9o = GLF_live9o + GLF_live9o;
                                                    GLF_live9k--;
                                                }
                                            }
                                        }
                                        GLF_live9m = _GLF_outlined_45(GLF_live9injectionSwitch, GLF_live9o);
                                    }
                                }
                            }
                        }
                    }
                }
            }
            bool GLF_live3c1 = _GLF_FUZZED(false);
            bool GLF_live3c2 = _GLF_FUZZED((mat3x4(38.81, 650.677, -9.0, 9.3, 437.590, -46.22, -448.468, 23.39, 1.9, -947.704, 23.72, 2808.8395) == mat3x4(mat2(863.796, 2.7, 3658.9637, 362.653))));
            vec3 GLF_live3col = _GLF_FUZZED((+(vec3(-6252.2875, 4.9, 7.5) + vec3(7.8, -1712.9225, 2233.1652))));
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_outlined_15(_GLF_color);
                _GLF_color = dFdy(vec4(3.7, 7551.6775, 45.21, 8.1));
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= log(1.0))))) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(5.4, -84.03, -6149.8006, -2.6);
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= tan(0.0))))) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                }
            }
            vec2 GLF_live3uv = _GLF_FUZZED(vec2(vec4(6.8, -534.516, -31.37, 0.9)));
            if (!GLF_live3c1 && GLF_live3c2) {
                float GLF_live3stripe = GLF_live3compute_stripe(tan((GLF_live3uv.x + GLF_live3uv.y) * 20.0));
                {
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = reflect(reflect(vec4(-6.1, 7.7, -778.134, 24.37), (mat3x4(470.013, 989.621, -21.29, -9.8, 336.823, 3.8, 9791.2825, -4620.8859, 0.4, -3.0, 99.32, -421.965) * vec3(846.818, -3748.6776, -65.21))), vec4(-0.1, -31.23, 6933.0283, -994.027));
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    {
                        {
                            ;
                            {
                                {
                                    ;
                                }
                            }
                        }
                    }
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_outlined_46(_GLF_color);
                    _GLF_color = _GLF_outlined_1();
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                GLF_live3col = _GLF_outlined_2(GLF_live3uv, GLF_live3stripe);
                GLF_live3_GLF_color = vec4(GLF_live3col, 1.0);
                ;
                {
                    float GLF_live10x = _GLF_FUZZED(-154.210);
                    float GLF_live10y = _GLF_FUZZED(-15.92);
                    if (GLF_live10x * GLF_live10x + GLF_live10y * GLF_live10y > 4.0) {
                        ;
                    }
                }
            }
        }
    }
    {
        {
            GLF_live6_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
        }
    }
    return -1;
}

vec4 _GLF_outlined_3() {
    return vec4(-8567.9645, vec3(-251.825, 27.82, -4.1));
}

vec4 _GLF_outlined_16(vec4 _GLF_color) {
    return _GLF_color;
}

vec4 _GLF_outlined_17(vec4 _GLF_outVarBackup_GLF_color) {
    return _GLF_outVarBackup_GLF_color;
}

vec4 _GLF_outlined_47(vec4 _GLF_color) {
    return _GLF_color;
}

vec4 _GLF_outlined_48(vec4 _GLF_color) {
    return _GLF_color;
}

vec4 _GLF_outlined_0(vec3 color, vec2 injectionSwitch) {
    return vec4(color, injectionSwitch.y);
    {
        vec4 _GLF_outVarBackup_GLF_color;
        {
            float GLF_live6pab = _GLF_FUZZED((5.4 * (-1.2)));
            float GLF_live6pbc = _GLF_FUZZED(-6996.8213);
            if (!((GLF_live6pab < 0.0 && GLF_live6pbc < 0.0) || (GLF_live6pab >= 0.0 && GLF_live6pbc >= 0.0))) {
                ;
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(-4.4, 9.3, 46.19, 336.417);
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
            }
        }
        _GLF_outVarBackup_GLF_color = _GLF_color;
        _GLF_color = _GLF_outlined_3();
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            {
                int GLF_live11looplimiter0 = 0;
                int GLF_live11v = _GLF_FUZZED((-82482));
                {
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_outlined_47(_GLF_color);
                        _GLF_color = vec4(7.5, 8883.5433, -8794.8221, 8524.4014);
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    if (GLF_live11looplimiter0 >= 7) {
                        ;
                    }
                    GLF_live11looplimiter0++;
                    {
                        GLF_live11v = (4 * GLF_live11v * (1000 - GLF_live11v)) / 1000;
                    }
                }
            }
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_outlined_16(_GLF_color);
                _GLF_color = vec4(-378.111, -693.841, 4323.5081, 9810.8057);
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= sin(0.0))))) {
                    _GLF_color = _GLF_outlined_17(_GLF_outVarBackup_GLF_color);
                }
            }
            _GLF_color = _GLF_outVarBackup_GLF_color;
            {
                int GLF_live11looplimiter0 = 0;
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(-579.731, 6.8, 7.3, 0.0);
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                int GLF_live11v = _GLF_FUZZED(((false || false) ? 15590 : 51215));
                {
                    if (GLF_live11looplimiter0 >= 7) {
                        ;
                    }
                    GLF_live11looplimiter0++;
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(vec2(3.6, -58.44), vec2(-954.282, -6.9));
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    {
                        GLF_live11v = (4 * GLF_live11v * (1000 - GLF_live11v)) / 1000;
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = fwidthFine(vec4(-2.9, -2776.3326, 1653.6150, 420.358));
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(true, !(!(_GLF_IDENTITY(true, false || (true))))))) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                    }
                }
            }
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_outlined_48(_GLF_color);
                _GLF_color = vec4(9788.5451, -9.4, 5.5, 5.5);
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
        }
    }
}

vec4 _GLF_outlined_4() {
    return (false ? vec4(-473.210, -7.5, -842.757, 32.08) : vec4(-3.8, 296.794, -9.1, -7.9));
}

vec4 _GLF_outlined_49() {
    return vec4(-9.7, 8.8, -222.110, -8.9);
}

vec4 _GLF_outlined_50(vec4 _GLF_outVarBackup_GLF_color) {
    return _GLF_outVarBackup_GLF_color;
}

vec4 _GLF_outlined_5(vec4 _GLF_outVarBackup_GLF_color) {
    return _GLF_outVarBackup_GLF_color;
    {
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        _GLF_color = _GLF_outlined_49();
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            _GLF_color = _GLF_outlined_50(_GLF_outVarBackup_GLF_color);
        }
    }
}

vec4 _GLF_outlined_6(vec4 _GLF_color) {
    return _GLF_color;
}

vec4 _GLF_outlined_18(vec4 GLF_live3_GLF_color) {
    return trunc(GLF_live3_GLF_color);
}

vec4 _GLF_outlined_19() {
    return vec4(39.73, 1.6, 66.08, 46.05);
}

vec4 _GLF_outlined_20() {
    return mat2x4(-35.21)[0];
}

vec4 _GLF_outlined_21(vec4 _GLF_outVarBackup_GLF_color) {
    return _GLF_outVarBackup_GLF_color;
}

vec4 _GLF_outlined_22(vec4 _GLF_color) {
    return _GLF_color;
}

vec4 _GLF_outlined_51(vec4 _GLF_color) {
    return _GLF_color;
}

vec4 _GLF_outlined_52() {
    return dFdxFine(refract(vec4(-4.4, -2678.2168, -1970.5214, 451.011), vec2(-86.60, 9.2).rrrg, 2338.9568));
}

vec4 _GLF_outlined_53(vec3 GLF_live9m) {
    return vec4(9.6, dFdy(acosh(GLF_live9m)));
}

vec4 _GLF_outlined_54(vec4 _GLF_color) {
    return _GLF_color;
}

vec4 _GLF_outlined_55(vec4 _GLF_outVarBackup_GLF_color) {
    return _GLF_outVarBackup_GLF_color;
}

vec4 _GLF_outlined_56(vec4 _GLF_color) {
    return _GLF_color;
}

vec4 _GLF_outlined_57(vec4 _GLF_outVarBackup_GLF_color) {
    return _GLF_outVarBackup_GLF_color;
}

vec4 _GLF_outlined_58() {
    return vec4(1.0, 85.80, 483.684, -4815.9786);
}

vec4 _GLF_outlined_59(vec4 _GLF_color) {
    return _GLF_color;
}

vec4 _GLF_outlined_60() {
    return abs(vec4(-54.56, -7.0, -3.7, 1.3));
}

vec4 _GLF_outlined_61() {
    return vec4(-796.968, 0.1, 666.606, -9296.5886);
}

void main() {
    BinarySearchObject obj;
    if (_GLF_DEAD(false)) {
        _GLF_color = _GLF_color;
    }
    {
        {
            ;
        }
    }
    for (int i = 0; i < 10; i++) {
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
            _GLF_color = GLF_live0_GLF_color;
        }
        {
            {
                ;
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(497.660, 7.0, -5042.9625, 7.7);
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
            }
        }
        if (i == 0) {
            {
                int GLF_live8looplimiter2 = 0;
                if (GLF_live8looplimiter2 >= 6) {
                    ;
                }
            }
            obj.prime_numbers[i] = 2;
        } else if (i == 1) {
            obj.prime_numbers[i] = 3;
            {
                {
                    float GLF_live1limit = _GLF_FUZZED(4345.2820);
                    int GLF_live1looplimiter0 = 0;
                    float GLF_live1ref = _GLF_FUZZED(-2299.4566);
                    if (_GLF_DEAD(false)) {
                        _GLF_color = clamp(GLF_live0_GLF_color, GLF_live6_GLF_color, GLF_live3_GLF_color);
                    }
                    float GLF_live1s = _GLF_FUZZED(0.4);
                    for (int GLF_live1i = 1; GLF_live1i < 800; GLF_live1i++) {
                        if (GLF_live1looplimiter0 >= 7) {
                            break;
                        }
                        GLF_live1looplimiter0++;
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_outlined_51(_GLF_color);
                                _GLF_color = vec4(vec2(-85.42, 94.90), vec2(-2.6, 927.613));
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                            _GLF_color = _GLF_outlined_4();
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= abs(0.0))))) {
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = GLF_live3_GLF_color;
                                    {
                                        int GLF_live9k = _GLF_FUZZED(72302);
                                        vec2 GLF_live9o = _GLF_FUZZED((mat2((3.9 - mat2x3(-2.2, -7.9, -712.429, 999.738, -2471.4594, 7.0))) * (vec3(-2705.5201, -13.92, -81.96) * mat2x3(0.6, -91.64, -0.6, -9.0, -6127.1042, -5646.1255))));
                                        {
                                            GLF_live9o = GLF_live9o + GLF_live9o;
                                            GLF_live9k--;
                                        }
                                    }
                                }
                                _GLF_color = _GLF_outlined_5(_GLF_outVarBackup_GLF_color);
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = intBitsToFloat(ivec4(2762, -45543, 66424, -81724));
                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                            }
                        }
                        {
                            if (mod(float(GLF_live1i), GLF_live1ref) <= 0.01) {
                                GLF_live1s += 0.2;
                            }
                            if (float(GLF_live1i) >= GLF_live1limit) {
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                    _GLF_color = floor(GLF_live6_GLF_color);
                                }
                                ;
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = _GLF_outlined_52();
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                            }
                            {
                                int GLF_live11i = _GLF_FUZZED((35055 ^ (~(-11910))));
                                int GLF_live11iters = _GLF_FUZZED(-2153);
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = fract(reflect((+vec4(-0.2, -404.453, 97.21, -396.135)), vec4(2.8, 5324.7024, -9.8, 9.1)));
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                                int GLF_live11v = _GLF_FUZZED(-99772);
                                {
                                    int GLF_live11looplimiter0 = 0;
                                    for (GLF_live11i = 0; GLF_live11i < GLF_live11iters; GLF_live11i++) {
                                        if (GLF_live11looplimiter0 >= 7) {
                                            break;
                                        }
                                        {
                                            vec4 _GLF_outVarBackup_GLF_color;
                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                            _GLF_color = vec4(6.9, -4.6, -9457.7956, -1984.2254);
                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                            }
                                        }
                                        GLF_live11looplimiter0++;
                                        {
                                            GLF_live11v = (4 * GLF_live11v * (1000 - GLF_live11v)) / 1000;
                                        }
                                        {
                                            vec4 _GLF_outVarBackup_GLF_color;
                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                            _GLF_color = vec4(73.60, -9.5, -88.14, -3.0);
                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                vec4 _GLF_outVarBackup_GLF_color;
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = fwidthFine(vec4(-5865.8274, 125.404, -7.3, -926.648));
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = abs(vec4(20.84, 3.9, -7.2, 9.6));
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(7.9, -7530.5296, 4945.4591, 84.46);
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    _GLF_color = vec4(4603.3487, -63.75, 15.11, -7.8);
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                {
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = sin(vec4(0.8, 5.6, 16.96, 8.5));
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= log(1.0))))) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = (4925.3665 / vec4(-8.2, 682.464, -2949.1465, 26.07));
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= log(1.0))))) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                        _GLF_color = intBitsToFloat(ivec4(-47722, 23922, -51992, -63309));
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    {
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = dFdxFine(vec4(7.0, -8414.6014, 75.06, -91.96));
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                        ;
                    }
                }
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
        } else if (i == 2) {
            obj.prime_numbers[i] = 5;
        } else if (i == 3) {
            obj.prime_numbers[i] = 7;
        } else if (i == 4) {
            obj.prime_numbers[i] = 11;
        } else {
            {
                bool GLF_live3c1 = _GLF_FUZZED((mat4x3(654.662, -86.19, -3.1, -890.510, -8395.2448, -79.44, 9.1, -7.3, 4.3, 416.839, -7742.9026, -35.28) == mat4x3(8.6, (2.0 - 1.3), -9.1, 841.222, 44.79, 4.6, -93.36, -958.053, 8.4, 9.6, -8963.5037, 1575.1521)));
                vec3 GLF_live3col = _GLF_FUZZED(vec3(-7.0, 3.2, -809.360));
                vec2 GLF_live3uv = _GLF_FUZZED(vec2(vec3(-63.55, 388.427, 9.1)));
                if (GLF_live3c1) {
                    float GLF_live3stripe = GLF_live3compute_stripe(cos((GLF_live3uv.x + GLF_live3uv.y) * 20.0));
                    GLF_live3col = mix(vec3(GLF_live3uv.x, 0, 0.75), vec3(.8, .7, GLF_live3uv.x), GLF_live3stripe);
                    {
                        {
                            ;
                        }
                    }
                    GLF_live3_GLF_color = vec4(GLF_live3col, 1.0);
                    if (_GLF_DEAD(false)) {
                        _GLF_color = GLF_live0_GLF_color;
                    }
                    ;
                }
            }
            if (i == 5) {
                obj.prime_numbers[i] = 13;
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    _GLF_color = _GLF_outlined_18(GLF_live3_GLF_color);
                }
                if (_GLF_DEAD(false)) {
                    _GLF_color = _GLF_color;
                }
            } else {
                {
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(-4.3, -53.73, 73.82, 8141.9333);
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = vec4(44.79, 3.7, -137.749, -20.26).argb;
                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= log(1.0))))) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                        }
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = vec4(-8426.7017, 5.5, 32.69, 9966.9141);
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                    }
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = _GLF_outlined_19();
                    {
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = vec4(8492.7349, 2726.4328, -5644.7460, -156.340);
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                        vec4 _GLF_outVarBackup_GLF_color;
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = (+vec4(-757.678, 4.1, -9.7, -55.33));
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(-9.9, -8267.6847, -2039.6221, 0.5);
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = dFdxCoarse(vec4(796.588, 4.6, 4863.3410, 6295.4199));
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                {
                    int GLF_live9i = _GLF_FUZZED(-71381);
                    int GLF_live9j = _GLF_FUZZED((-17407));
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < log(1.0))))) {
                        _GLF_color = GLF_live3_GLF_color;
                    }
                    int GLF_live9looplimiter1 = 0;
                    vec3 GLF_live9m = _GLF_FUZZED(vec3(vec2(-448.189, -8.7), 3.1));
                    vec2 GLF_live9n = _GLF_FUZZED(vec2(544.857, -1872.4874));
                    {
                        if (GLF_live9looplimiter1 >= 4) {
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = vec4(8.6, 53.49, -0.9, -4.8);
                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                            ;
                        }
                        GLF_live9looplimiter1++;
                        {
                            vec2 GLF_live9g = vec2(float(GLF_live9j), float(GLF_live9i));
                            vec2 GLF_live9o = mix(GLF_live9n, GLF_live9g, 0.2);
                            if (GLF_live9injectionSwitch.x < (GLF_live9m.x)) {
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    _GLF_color = _GLF_outlined_53(GLF_live9m);
                                }
                                int GLF_live9k = 1;
                                {
                                    int GLF_live9looplimiter0 = 0;
                                    while (GLF_live9k >= 0) {
                                        if (GLF_live9looplimiter0 >= 4) {
                                            break;
                                        }
                                        GLF_live9looplimiter0++;
                                        if (_GLF_DEAD(false)) {
                                            _GLF_color = (vec4(-8580.6719, 8.8, 2959.4357, 9.4) + GLF_live3_GLF_color);
                                        }
                                        {
                                            GLF_live9o = GLF_live9o + GLF_live9o;
                                            GLF_live9k--;
                                        }
                                    }
                                }
                                GLF_live9m = vec3(GLF_live9injectionSwitch.x, cos(GLF_live9o));
                            }
                        }
                    }
                }
                if (i == 6) {
                    obj.prime_numbers[i] = 17;
                    {
                        {
                            GLF_live6_GLF_color = vec4(0.0, 0.0, 0.0, 1.0);
                        }
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = vec4(-1622.4650, -5.1, 6108.2969, 9.5);
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                    }
                } else {
                    {
                        int GLF_live9looplimiter3 = 0;
                        if (GLF_live9looplimiter3 >= 4) {
                            ;
                        }
                    }
                    if (i == 7) {
                        obj.prime_numbers[i] = 19;
                        {
                            int GLF_live8looplimiter2 = 0;
                            if (GLF_live8looplimiter2 >= 6) {
                                ;
                            }
                        }
                    } else if (i == 8) {
                        obj.prime_numbers[i] = 23;
                        {
                            {
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_outlined_54(_GLF_color);
                                    _GLF_color = vec4(1085.5922, -7.4, 4413.6500, 0.5);
                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                                GLF_live0_GLF_color = vec4(0.0, 1.0, 0.0, 1.0);
                            }
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = vec4(-5.5, step(vec3(-97.94, -2074.8916, 74.35), vec3(-9.4, 885.651, -732.137)));
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                        }
                    } else {
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = unpackUnorm4x8(20751u);
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = vec4(7.2, -83.38, 570.509, -7.5);
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                        {
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = vec4(-9.8, 121.719, -3.3, -2.1);
                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = vec4(8751.4872, -2.5, 9874.6708, 1873.2449);
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = vec4(54.29, 3.2, 62.57, 5980.4283);
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                        if (i == 9) {
                            obj.prime_numbers[i] = 29;
                            {
                                {
                                    ;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    if (_GLF_DEAD(false)) {
        _GLF_color = vec4(76.86, 70.73, -6961.5042, -31.91);
    }
    vec2 uv = (gl_FragCoord.xy / resolution.x) * vec2(resolution.x / resolution.y, 1.0);
    vec2 b = brick(uv * 7.0);
    {
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        {
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(0.3, -5007.7559, -77.81, -7652.3260);
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            int GLF_live5iteration = _GLF_FUZZED((-15855));
            {
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = (length(97.88) - vec4(308.897, 6806.3745, 7.9, -3.1));
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                ;
            }
        }
        _GLF_color = _GLF_outlined_20();
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
    }
    vec3 color = vec3(patternize(b));
    {
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        _GLF_color = mix(vec4(4281.7793, -454.925, -0.0, -389.882), vec4(-5.0, -5.3, 5.4, 1.2), determinant(mat3(40.25, 60.78, -128.504, 725.855, -6.1, -9233.3446, 2.8, 392.256, 8373.8498)));
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            _GLF_color = _GLF_outlined_55(_GLF_outVarBackup_GLF_color);
        }
    }
    if (gl_FragCoord.y < resolution.y / 1.1) {
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = sinh(vec4(-8.1, -658.294, 676.542, 733.726));
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = vec4(91.81, -4762.2399, -81.22, 756.862);
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                {
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = clamp(radians(vec4(-9755.9764, 816.098, -6974.2044, 7.2)), max(vec4(9.5, -7.9, 384.419, 22.32), 6.1), vec4(4046.2606, 2.6, 4.7, 8090.3578));
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = asin(vec4(352.214, 3794.1406, 92.38, 0.0));
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                _GLF_color = _GLF_outVarBackup_GLF_color;
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4((vec4(2.2, 1.7, 2105.7987, -7.6) * mat2x4(1228.8826, -4.2, 670.949, 935.520, 693.529, 1.2, -66.60, 4.8)), vec2(0.2, -1556.0017));
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
            }
        }
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = vec4(-44.57, -70.89, -4.7, 0.2);
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_outlined_56(_GLF_color);
                _GLF_color = step(vec3(7289.6016, 244.870, 5006.3399), vec3(3.6, 93.64, -3.2)).sttp;
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= _GLF_ZERO(0.0, injectionSwitch.x))))) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                _GLF_color = _GLF_outlined_57(_GLF_outVarBackup_GLF_color);
                if (_GLF_DEAD(_GLF_IDENTITY(false, _GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)) || (_GLF_IDENTITY(false, !(!(false))))))) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
        }
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = (asin(vec2(-127.060, -99.33)) * (-mat4x2(9.4, 9.8, 16.58, 5.7, -4.1, 3.2, 1.6, -3593.9355)));
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
        if (binarySearch(obj, obj.prime_numbers[4]) != -(int(resolution.y)) && binarySearch(obj, obj.prime_numbers[0]) >= -(int(resolution.x))) {
            color.yz -= dot(float(binarySearch(obj, obj.prime_numbers[4])), float(binarySearch(obj, obj.prime_numbers[0])));
            if (_GLF_DEAD(false)) {
                _GLF_color = exp2(vec4(687.750, 77.18, -7827.9781, -3.7));
            }
        } else {
            discard;
        }
    } else {
        if (binarySearch(obj, 1) == -1) {
            discard;
        } else {
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_outlined_6(_GLF_color);
                _GLF_color = vec4(-4.6, -72.05, 4691.3125, -8334.2967);
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= _GLF_IDENTITY(dot(vec2(log(1.0), 1.0), vec2(exp(0.0), 0.0)), dot(vec2(log(1.0), 1.0), vec2(exp(0.0), 0.0))))))) {
                    {
                        float GLF_live10c_im = _GLF_FUZZED(float((bvec2(false, true) == bvec2(false, false))));
                        float GLF_live10c_re = _GLF_FUZZED(-3743.9517);
                        int GLF_live10iteration = _GLF_FUZZED(int(false));
                        int GLF_live10looplimiter0 = 0;
                        float GLF_live10x = _GLF_FUZZED(-5241.2414);
                        float GLF_live10y = _GLF_FUZZED(405.757);
                        {
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = mat3x4(9809.4931, 0.9, -81.87, 3.4, 430.408, 410.697, -587.203, 88.89, 0.7, 280.542, -7.1, -1.3)[2];
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                            if (GLF_live10looplimiter0 >= 6) {
                                ;
                            }
                            GLF_live10looplimiter0++;
                            {
                                if (GLF_live10x * GLF_live10x + GLF_live10y * GLF_live10y > 4.0) {
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        _GLF_color = vec4(6241.8325, -6.7, 809.654, 5330.3196);
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                    }
                                    ;
                                }
                                float GLF_live10x_new = GLF_live10x * GLF_live10x - GLF_live10y * GLF_live10y + GLF_live10c_re;
                                GLF_live10y = 2.0 * GLF_live10x * GLF_live10y + GLF_live10c_im;
                                GLF_live10x = GLF_live10x_new;
                                GLF_live10iteration++;
                            }
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = vec4(9608.6891, 4.0, 2.5, -76.10);
                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        _GLF_color = tan(vec4(6.2, 70.68, -636.545, -66.40));
                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                    }
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                        }
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = vec4(8.9, -1.2, -8.1, -3.2);
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = mod(vec4(-9610.7829, -3323.5878, -34.93, 3544.8780), 5012.5486);
                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                    }
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = _GLF_outlined_58();
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                }
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(-3.0, 8.6, -9.3, -9.2);
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
            }
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_outlined_59(_GLF_color);
                _GLF_color = trunc(vec4(-12.26, 2.3, -137.750, -5834.1859));
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            color.yz += color.yz;
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(4.4, 6.6, 8258.5511, 1.1);
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
        }
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = vec4(46.26, 5216.7018, -9.3, -1.0);
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                _GLF_color = _GLF_outlined_21(_GLF_outVarBackup_GLF_color);
            }
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = abs(normalize(vec4(-21.14, 4.3, 1.2, 13.62)));
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
        }
        {
            {
                {
                    int GLF_live10looplimiter3 = 0;
                    if (GLF_live10looplimiter3 >= 6) {
                        ;
                    }
                }
                {
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(-44.99, 0.5, 0.6, 9.0);
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    GLF_live6_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(float(160915u), vec2(-978.676, -5.9), 3.9);
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                }
            }
            vec4 _GLF_outVarBackup_GLF_color;
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(-867.630, -40.27, -824.893, 2.3);
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = asinh(vec4(9102.3549, -9.7, 8.2, -22.47));
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    _GLF_color = (any(bvec2(false, false)) ? GLF_live3_GLF_color : GLF_live6_GLF_color);
                }
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            _GLF_outVarBackup_GLF_color = _GLF_outlined_22(_GLF_color);
            _GLF_color = _GLF_outlined_60();
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                {
                    int GLF_live5looplimiter0 = 0;
                    {
                        int GLF_live10looplimiter1 = 0;
                        {
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = (mat3x4(6.9, 4298.9036, 51.40, -9.1, -987.715, 958.487, -96.00, 34.72, -986.738, 3.7, -68.51, 2.6) * vec3(842.279, -85.43, -364.703));
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = vec4(6.1, -825.942, -68.13, 7601.1229);
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = max(mat2x4(7.1, 2015.7824, -5.7, -88.98, 2411.3086, -3.0, 2680.2410, 56.98)[0], -0.2);
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                        if (GLF_live10looplimiter1 >= 6) {
                            ;
                        }
                    }
                    if (GLF_live5looplimiter0 >= 6) {
                        ;
                    }
                }
                _GLF_color = _GLF_outVarBackup_GLF_color;
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = pow(vec4(5.4, -0.8, 7.4, -57.36), (true ? vec4(1.1, 4.3, 1468.2314, -3801.7027) : vec4(-6.5, -9.5, 555.114, 1.9)));
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= _GLF_IDENTITY(dot(vec3(0.0, 1.0, 0.0), vec3(1.0, 0.0, 1.0)), dot(vec3(0.0, 1.0, 0.0), vec3(1.0, 0.0, 1.0))))))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
            }
        }
    }
    _GLF_color = _GLF_outlined_0(color, injectionSwitch);
    {
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = sqrt(reflect(vec4(-37.85, -4688.9383, 85.12, 1125.2584), vec4(-6797.0762, -8.2, 1216.7752, -2640.6320)));
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= abs(0.0))))) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
                if (_GLF_DEAD(false)) {
                    _GLF_color = _GLF_outlined_61();
                }
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(-82.37, 622.283, 55.06, 5.2);
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
            }
        }
        _GLF_color = vec4(-103.417, 25.12, -5315.4345, 7.7);
        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= tan(0.0))))) {
            {
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = smoothstep(vec4(-7890.4691, 725.665, 78.55, -5.2), vec4(30.29, -8541.7229, -943.857, 6.6), vec4(10.03, 6.8, 5811.1515, -72.98));
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    _GLF_color = vec4(45.69, 0.9, 5706.1844, -728.929);
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < tan(0.0))))) {
                        _GLF_color = GLF_live6_GLF_color;
                    }
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                int GLF_live11i = _GLF_FUZZED(((-31795) & (~44761)));
                int GLF_live11iters = _GLF_FUZZED(-27214);
                int GLF_live11v = _GLF_FUZZED(18502);
                {
                    int GLF_live11looplimiter0 = 0;
                    for (GLF_live11i = 0; GLF_live11i < GLF_live11iters; GLF_live11i++) {
                        if (GLF_live11looplimiter0 >= 7) {
                            break;
                        }
                        GLF_live11looplimiter0++;
                        {
                            GLF_live11v = (4 * GLF_live11v * (1000 - GLF_live11v)) / 1000;
                        }
                    }
                }
            }
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
    }
    {
        int GLF_live9k = _GLF_FUZZED(6699);
        vec2 GLF_live9o = _GLF_FUZZED(vec2(float(-71258), 2.2));
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = (0.3 / vec4(9693.2375, 3.5, 23.21, -0.5));
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
        {
            GLF_live9o = GLF_live9o + GLF_live9o;
            GLF_live9k--;
        }
    }
}
