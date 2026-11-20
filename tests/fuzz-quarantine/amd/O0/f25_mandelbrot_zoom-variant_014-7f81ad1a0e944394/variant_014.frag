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

layout(set = 0, binding = 1) uniform buf1 {
    vec2 injectionSwitch;
};

int GLF_live8MATRIX_N = 4;
layout(set = 0, binding = 2) uniform sampler2D GLF_live6tex;
const float GLF_live6weights[9] = float[9](1.0, 0.5, -0.25, 0.5, 1.0, -0.5, -0.25, -0.5, -1.0);
int GLF_dead4MATRIX_N = 4;
layout(set = 0, binding = 3) uniform sampler2D GLF_dead2tex;
const float GLF_dead2weights[9] = float[9](1.0, 0.5, -0.25, 0.5, 1.0, -0.5, -0.25, -0.5, -1.0);
vec4 GLF_dead1_GLF_color = _GLF_FUZZED((vec3(724.962, 5.0, -756.901) * mat4x3(810.273, 59.64, 49.85, -8876.1082, -4.4, 55.80, -42.13, -6.5, -4.9, -0.7, -_GLF_IDENTITY(5.0, (false ? _GLF_FUZZED(-41.48) : 5.0)), -54.29)));

layout(set = 0, binding = 4) uniform buf4 {
    vec2 GLF_dead1injectionSwitch;
};

float GLF_dead1compute_derivative_x(float GLF_dead1v) {
    return dFdx(GLF_dead1v) * GLF_dead1injectionSwitch.y;
}

float GLF_dead1compute_derivative_y(float GLF_dead1v) {
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
        return 1.0;
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            if (_GLF_IDENTITY(_GLF_DEAD(false), !(!(_GLF_DEAD(false))))) {
                vec2 donor_replacementGLF_dead2coord = _GLF_FUZZED(abs(vec2(1.7, 5.8)));
                int donor_replacementGLF_dead2i = _GLF_FUZZED((ivec2(-1003, -46139)).g);
                for (int GLF_dead2j = 0; _GLF_IDENTITY(GLF_dead2j < 3, (GLF_dead2j < 3) || _GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))); GLF_dead2j++) {
                    GLF_dead1_GLF_color += texture(GLF_dead2tex, donor_replacementGLF_dead2coord + vec2(float(donor_replacementGLF_dead2i - 1) * GLF_dead1v, float(GLF_dead2j - 1) * GLF_dead1v)) * GLF_dead2weights[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead2i * 3 + GLF_dead2j, 9)];
                }
            }
            return 1.0;
        }
    }
    return dFdy(GLF_dead1v) * GLF_dead1injectionSwitch.y;
}

float GLF_dead1compute_stripe(float GLF_dead1v) {
    return smoothstep(-.9, 1., (GLF_dead1v) / ((GLF_dead1injectionSwitch.y > GLF_dead1injectionSwitch.x) ? GLF_dead1compute_derivative_x(GLF_dead1v) : GLF_dead1compute_derivative_y(GLF_dead1v)));
    if (_GLF_DEAD(false)) {
        return 1.0;
    }
}

layout(location = 0) out vec4 _GLF_color;

layout(set = 0, binding = 0) uniform buf0 {
    vec2 resolution;
};

vec3 pickColor(int i) {
    return vec3(_GLF_IDENTITY(float(i), max(_GLF_IDENTITY(float(i), mix(float(_GLF_FUZZED(6.0)), float(float(i)), bool(true))), float(i))) / 50.0, float(i) / 120.0, float(i) / 140.0);
}

vec3 mand(float xCoord, float yCoord) {
    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
        _GLF_color = _GLF_color;
    }
    if (_GLF_DEAD(false)) {
        int donor_replacementGLF_dead4k = _GLF_FUZZED(bitCount(93763));
        for (int GLF_dead4b = GLF_dead4MATRIX_N - 1; GLF_dead4b >= donor_replacementGLF_dead4k; GLF_dead4b--) {
            GLF_dead1_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead4b, 4)] = GLF_dead1_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead4b, 4)] - (yCoord * GLF_dead1_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead4b, 4)]);
        }
    }
    {
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            _GLF_color = vec4(26.30, 6.1, 930.860, -3.9);
        }
        int GLF_live5i = _GLF_FUZZED((+29439));
        float GLF_live5result = _GLF_FUZZED(float(-5947));
        float GLF_live5thirty_two = _GLF_FUZZED((false ? 89.96 : 341.943));
        {
            if (mod(float(GLF_live5i), round(GLF_live5thirty_two)) <= _GLF_IDENTITY(0.01, min(0.01, 0.01))) {
                GLF_live5result += 100.0;
            }
        }
    }
    float height = resolution.y;
    float width = resolution.x;
    if (_GLF_DEAD(false)) {
        int donor_replacementGLF_dead5v = _GLF_FUZZED(int(63910u));
        {
            donor_replacementGLF_dead5v = (4 * donor_replacementGLF_dead5v * (1000 - donor_replacementGLF_dead5v)) / 1000;
        }
    }
    {
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        if (_GLF_DEAD(false)) {
            _GLF_color = (_GLF_color * mat4(2.2, 7822.7526, 2.6, 245.358, 5.2, 4.9, -12.59, 12.86, 5.1, 7068.0899, 49.87, 8.5, 9.2, 2.4, -31.46, 584.443));
        }
        _GLF_color = vec4(-38.77, 4.2, -51.69, 0.1);
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
    }
    float xpos = _GLF_IDENTITY(xCoord * 0.1, float(mat4x3(xCoord * 0.1, round(length(normalize(vec3(1.0, 1.0, 1.0)))), cos(0.0), 1.0, 0.0, 0.0, 1.0, 1.0, 1.0, 0.0, determinant(mat4(1.0, abs(1.0), 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 0.0, tan(0.0), 1.0, 1.0, 0.0, tan(0.0), 0.0, 1.0)), 1.0))) + (resolution.x * 0.6);
    if (_GLF_DEAD(false)) {
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_IDENTITY(0.0, clamp(0.0, 0.0, 0.0)))))) {
            return vec3(1.0, 1.0, 1.0);
        }
        if (_GLF_DEAD(false)) {
            _GLF_color = vec4(_GLF_IDENTITY(-2.9, (true ? (-2.9) : _GLF_FUZZED(uintBitsToFloat(125546u)))), 7.9, -29.99, -1.6);
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            _GLF_color = ldexp(vec4(height, -795.100, GLF_dead1injectionSwitch), max(ivec4(37793, 71572, -7060, 54115), 93118));
        }
        return vec3(1.0, 1.0, 1.0);
    }
    float ypos = yCoord * 0.1 + (_GLF_IDENTITY(resolution.y * 0.4, clamp(resolution.y * 0.4, resolution.y * 0.4, resolution.y * 0.4)));
    if (_GLF_DEAD(false)) {
        return vec3(1.0, 1.0, 1.0);
        if (_GLF_DEAD(false)) {
            _GLF_color = vec4(-220.951, 6304.0011, -7.1, 4215.4753);
        }
        if (_GLF_DEAD(false)) {
            return vec3(1.0, 1.0, 1.0);
        }
    }
    float c_re = 0.8 * (xpos - width / 2.0) * 4.0 / width - 0.4;
    float c_im = 0.8 * (ypos - height / 2.0) * 4.0 / width;
    if (_GLF_DEAD(false)) {
        return vec3(1.0, 1.0, 1.0);
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
        _GLF_color = unpackUnorm4x8(max(75043u, 143015u));
    }
    float x = 0.0, y = 0.0;
    if (_GLF_DEAD(false)) {
        _GLF_color = _GLF_color;
    }
    {
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        _GLF_color = _GLF_IDENTITY(step(vec4(8.5, 3.2, -2.4, 7.9), vec4(-33.69, -395.502, -6.0, 8.3)), max(step(vec4(8.5, 3.2, -2.4, 7.9), vec4(-33.69, -395.502, -6.0, 8.3)), step(vec4(8.5, 3.2, -2.4, 7.9), vec4(-33.69, -395.502, -6.0, 8.3))));
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
        if (_GLF_DEAD(false)) {
            _GLF_color = _GLF_color;
        }
        if (_GLF_DEAD(false)) {
            return vec3(1.0, 1.0, 1.0);
        }
    }
    int iteration = 0;
    {
        if (_GLF_DEAD(false)) {
            _GLF_color = _GLF_color;
        }
        vec4 _GLF_outVarBackup_GLF_color;
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            _GLF_color = vec4(-696.266, 71.75, 7.2, 7.3);
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                return vec3(1.0, 1.0, _GLF_IDENTITY(1.0, mix(float(_GLF_FUZZED(-5781.4435)), float(_GLF_IDENTITY(1.0, (1.0) / 1.0)), bool(true))));
            }
            if (_GLF_DEAD(false)) {
                int donor_replacementGLF_dead5iters = _GLF_FUZZED(44167);
                for (iteration = 0; iteration < donor_replacementGLF_dead5iters; iteration++) {
                    iteration = (4 * iteration * (1000 - iteration)) / 1000;
                }
            }
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (_GLF_IDENTITY(gl_FragCoord, min(_GLF_IDENTITY(gl_FragCoord, clamp(_GLF_IDENTITY(gl_FragCoord, (gl_FragCoord) * mat4(1.0)), gl_FragCoord, gl_FragCoord)), gl_FragCoord)).x < 0.0)))) {
            {
                vec2 GLF_live6coord = _GLF_FUZZED(vec2(8.9, 7.9));
                int GLF_live6i = _GLF_IDENTITY(_GLF_FUZZED((_GLF_IDENTITY((int(false) & 9772), ((int(false) & 9772)) | (_GLF_IDENTITY((int(false) & 9772), ~(~((int(false) & 9772)))))) + (-56873))), clamp(_GLF_IDENTITY(_GLF_FUZZED((_GLF_IDENTITY((int(false) & 9772), ((int(false) & 9772)) | (_GLF_IDENTITY((int(false) & 9772), ~(~((int(false) & 9772)))))) + (-56873))), (_GLF_FUZZED((_GLF_IDENTITY((int(false) & 9772), ((int(false) & 9772)) | (_GLF_IDENTITY((int(false) & 9772), ~(~((int(false) & 9772)))))) + (-56873)))) << 0), _GLF_IDENTITY(_GLF_FUZZED((_GLF_IDENTITY((int(false) & 9772), ((int(false) & 9772)) | (_GLF_IDENTITY((int(false) & 9772), ~(~((int(false) & 9772)))))) + (-56873))), (_GLF_FUZZED((_GLF_IDENTITY((int(false) & 9772), ((int(false) & 9772)) | (_GLF_IDENTITY((int(false) & 9772), ~(~((int(false) & 9772)))))) + (-56873)))) ^ 0), _GLF_FUZZED((_GLF_IDENTITY((int(false) & 9772), ((int(false) & 9772)) | (_GLF_IDENTITY((int(false) & 9772), ~(~((int(false) & 9772)))))) + (-56873)))));
                vec4 GLF_live6res = _GLF_FUZZED(vec4(7453.3659, -915.754, 7688.2224, -5.8));
                float GLF_live6uvstep = _GLF_FUZZED(-15.28);
                {
                    if (_GLF_DEAD(false)) {
                        _GLF_color = vec4(-2.1, -31.80, -480.008, 99.40);
                    }
                    int GLF_live6looplimiter0 = 0;
                    for (int GLF_live6j = 0; GLF_live6j < 3; GLF_live6j++) {
                        if (GLF_live6looplimiter0 >= 7) {
                            break;
                        }
                        GLF_live6looplimiter0++;
                        {
                            GLF_live6res += texture(GLF_live6tex, GLF_live6coord + vec2(float(GLF_live6i - 1) * GLF_live6uvstep, float(GLF_live6j - 1) * GLF_live6uvstep)) * GLF_live6weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6i * 3 + GLF_live6j, 9)];
                        }
                    }
                }
            }
            int donor_replacementGLF_dead5v = _GLF_FUZZED(_GLF_IDENTITY(18931, ~(~(_GLF_IDENTITY(18931, (18931) / 1)))));
            {
                donor_replacementGLF_dead5v = (4 * donor_replacementGLF_dead5v * (1000 - donor_replacementGLF_dead5v)) / 1000;
            }
        }
        _GLF_outVarBackup_GLF_color = _GLF_color;
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
        if (_GLF_DEAD(_GLF_IDENTITY(false, (false) || false))) {
            return vec3(1.0, 1.0, 1.0);
        }
        _GLF_color = vec4(9.8, 6167.5639, -2.9, 8.2);
        if (_GLF_DEAD(false)) {
            _GLF_color = vec4(-6.2, xpos, (injectionSwitch + c_re));
        }
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    _GLF_color = vec4(5498.9273, 16.78, 9642.2559, 2009.6895);
                }
                _GLF_color = round(vec4(_GLF_IDENTITY(9948.1990, 1.0 * (9948.1990)), 4557.4877, -1169.6053, 13.92));
            }
            _GLF_color = _GLF_outVarBackup_GLF_color;
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                return vec3(1.0, 1.0, 1.0);
            }
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < _GLF_ZERO(0.0, injectionSwitch.x))))) {
            _GLF_color = clamp(_GLF_color, _GLF_outVarBackup_GLF_color, vec4(acos(c_im), ypos, c_re, c_re));
        }
        if (_GLF_DEAD(false)) {
            if (_GLF_DEAD(false)) {
                _GLF_color = GLF_dead1_GLF_color;
            }
            return vec3(1.0, 1.0, 1.0);
        }
        if (_GLF_DEAD(_GLF_IDENTITY(false, !(!(false))))) {
            _GLF_color = fwidth(_GLF_outVarBackup_GLF_color);
        }
    }
    for (int k = 0; k < 1000; k++) {
        if (x * x + y * y > 4.0) {
            if (_GLF_DEAD(false)) {
                {
                    iteration = (4 * iteration * (1000 - iteration)) / 1000;
                }
            }
            break;
            {
                vec4 _GLF_outVarBackup_GLF_color;
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    vec2 donor_replacementGLF_dead2coord = _GLF_FUZZED((_GLF_IDENTITY((vec3(-7.4, 59.37, 0.3) * mat2x3(5.1, -483.687, 4.3, 2024.0267, 470.357, -5022.1213)), max((vec3(-7.4, 59.37, 0.3) * mat2x3(5.1, -483.687, 4.3, 2024.0267, 470.357, -5022.1213)), (vec3(-7.4, 59.37, 0.3) * mat2x3(5.1, -483.687, 4.3, 2024.0267, 470.357, -5022.1213)))) * resolution));
                    float donor_replacementGLF_dead2uvstep = _GLF_IDENTITY(_GLF_FUZZED(y), clamp(_GLF_FUZZED(y), _GLF_FUZZED(y), _GLF_IDENTITY(_GLF_FUZZED(y), (_GLF_FUZZED(y)) + 0.0)));
                    {
                        for (int GLF_dead2j = 0; GLF_dead2j < 3; GLF_dead2j++) {
                            _GLF_color += texture(GLF_dead2tex, donor_replacementGLF_dead2coord + vec2(float(k - 1) * donor_replacementGLF_dead2uvstep, float(GLF_dead2j - 1) * donor_replacementGLF_dead2uvstep)) * GLF_dead2weights[_GLF_MAKE_IN_BOUNDS_INT(k * _GLF_IDENTITY(3, (3) << 0) + GLF_dead2j, 9)];
                        }
                    }
                }
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(2.0, 77.22, 8705.3708, -7863.3807);
                if (_GLF_DEAD(false)) {
                    {
                        iteration = (4 * iteration * (1000 - _GLF_IDENTITY(iteration, (iteration) | (iteration)))) / 1000;
                    }
                }
                if (_GLF_DEAD(false)) {
                    _GLF_color = GLF_dead1_GLF_color;
                }
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (_GLF_IDENTITY(gl_FragCoord, _GLF_IDENTITY(vec4(_GLF_IDENTITY(mat4x2(gl_FragCoord, 1.0, 1.0, 1.0, 0.0), mat4x2(mat4(mat4x2(gl_FragCoord, 1.0, 1.0, 1.0, 0.0))))), max(vec4(_GLF_IDENTITY(mat4x2(gl_FragCoord, 1.0, 1.0, 1.0, 0.0), mat4x2(mat4(mat4x2(gl_FragCoord, 1.0, 1.0, 1.0, 0.0))))), vec4(_GLF_IDENTITY(mat4x2(gl_FragCoord, 1.0, 1.0, 1.0, 0.0), mat4x2(mat4(mat4x2(gl_FragCoord, 1.0, 1.0, 1.0, 0.0)))))))).x >= abs(0.0))))) {
                    if (_GLF_DEAD(false)) {
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < tan(0.0))))) {
                            continue;
                        }
                        _GLF_color = mix(_GLF_color, _GLF_color, _GLF_color);
                    }
                    if (_GLF_DEAD(false)) {
                        break;
                    }
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            if (_GLF_DEAD(false)) {
                _GLF_color = sign(floor(GLF_dead1_GLF_color));
            }
            if (_GLF_DEAD(false)) {
                _GLF_color = mat4(8197.9475, 616.641, 2.5, -2326.5044, 23.65, 3.4, -7.3, -2890.4769, 5.4, _GLF_IDENTITY(-5.2, (_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)) ? _GLF_FUZZED(height) : (-5.2))), 8.4, 6.8, -98.28, -7.8, _GLF_IDENTITY(89.32, (_GLF_IDENTITY(89.32, clamp(89.32, 89.32, 89.32))) / 1.0), -5972.8860)[0];
            }
        }
        float x_new = x * x - y * y + c_re;
        if (_GLF_DEAD(false)) {
            int donor_replacementGLF_dead5v = _GLF_FUZZED(k);
            for (k = 0; k < iteration; k++) {
                donor_replacementGLF_dead5v = (_GLF_IDENTITY(4 * donor_replacementGLF_dead5v, (true ? _GLF_IDENTITY(4 * donor_replacementGLF_dead5v, (4 * donor_replacementGLF_dead5v) | 0) : _GLF_FUZZED(iteration))) * (_GLF_IDENTITY(1000, clamp(1000, 1000, _GLF_IDENTITY(1000, clamp(1000, 1000, 1000)))) - donor_replacementGLF_dead5v)) / 1000;
            }
            if (_GLF_DEAD(_GLF_IDENTITY(false, !(!(false))))) {
                _GLF_color = GLF_dead1_GLF_color;
            }
            {
                float GLF_live7th = _GLF_FUZZED(float(true));
                {
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        _GLF_color = vec4(9819.5110, 99.38, -5.7, -5499.6972);
                    }
                    GLF_live7th = -GLF_live7th;
                    if (_GLF_DEAD(false)) {
                        _GLF_color = atan(dFdyFine(GLF_dead1_GLF_color));
                    }
                }
            }
        }
        y = 2.0 * x * y + c_im;
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            _GLF_color = (-GLF_dead1_GLF_color);
            if (_GLF_DEAD(false)) {
                _GLF_color = vec4(-136.104, -9.6, 9.8, 5.3);
            }
        }
        x = x_new;
        {
            float GLF_live8alpha1 = _GLF_FUZZED(_GLF_IDENTITY(-75.92, min(-75.92, -75.92)));
            float GLF_live8alpha2 = _GLF_FUZZED(0.0);
            float GLF_live8alpha3 = _GLF_FUZZED(vec2(-2.0, 0.2).g);
            float GLF_live8beta = _GLF_FUZZED(-641.186);
            int GLF_live8k = _GLF_FUZZED(int(false));
            int GLF_live8looplimiter7 = 0;
            float GLF_live8magnitudeX = _GLF_FUZZED(-_GLF_IDENTITY(610.754, min(610.754, _GLF_IDENTITY(610.754, clamp(610.754, 610.754, 610.754)))));
            mat4 GLF_live8matrix_a = _GLF_FUZZED(mat4(-602.030, -5.4, -57.58, -716.770, -100.270, 327.649, -8.1, 9702.8364, -5179.0024, 834.896, -478.827, 3.6, 1.1, 7385.5476, -37.88, 1.6));
            vec4 GLF_live8matrix_b = _GLF_FUZZED(vec4(vec3(-2.6, 50.75, 587.833), -80.73));
            vec4 GLF_live8matrix_u = _GLF_FUZZED(vec4(-82.25, -545.050, 7.0, 880.738));
            {
                if (GLF_live8looplimiter7 >= 7) {
                    ;
                    if (_GLF_DEAD(false)) {
                        _GLF_color = vec4(20.50, -3904.3879, -61.62, -5.6);
                    }
                }
                GLF_live8looplimiter7++;
                {
                    {
                        int GLF_live8looplimiter0 = 0;
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                            _GLF_color = GLF_dead1_GLF_color;
                        }
                        for (int GLF_live8x = GLF_live8MATRIX_N - 1; GLF_live8x >= GLF_live8k; GLF_live8x--) {
                            if (GLF_live8looplimiter0 >= 7) {
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < tan(0.0))))) {
                                    _GLF_color = fwidthCoarse(vec4(-8.0, 7628.3395, 5.6, 7506.9352));
                                }
                                break;
                            }
                            GLF_live8looplimiter0++;
                            {
                                GLF_live8magnitudeX += pow(GLF_live8matrix_a[_GLF_IDENTITY(_GLF_MAKE_IN_BOUNDS_INT(GLF_live8x, 4), int(_GLF_IDENTITY(ivec2(_GLF_MAKE_IN_BOUNDS_INT(GLF_live8x, 4), 0), (false ? _GLF_FUZZED(ivec2(15373, -49974)) : ivec2(_GLF_MAKE_IN_BOUNDS_INT(GLF_live8x, 4), 0)))))][_GLF_MAKE_IN_BOUNDS_INT(GLF_live8k, 4)], 2.0);
                                GLF_live8matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_live8x, 4)] = GLF_live8matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_live8x, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live8k, 4)];
                            }
                        }
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        _GLF_color = GLF_live8matrix_u;
                    }
                    GLF_live8magnitudeX = sqrt(GLF_live8magnitudeX);
                    GLF_live8matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_live8k, 4)] -= (_GLF_IDENTITY(sign(_GLF_IDENTITY(GLF_live8matrix_u, vec4(0.0, 0.0, 0.0, 0.0) + (GLF_live8matrix_u))[_GLF_MAKE_IN_BOUNDS_INT(GLF_live8k, 4)]) * GLF_live8magnitudeX, (true ? (sign(_GLF_IDENTITY(GLF_live8matrix_u, vec4(0.0, 0.0, 0.0, 0.0) + (GLF_live8matrix_u))[_GLF_MAKE_IN_BOUNDS_INT(GLF_live8k, 4)]) * GLF_live8magnitudeX) : _GLF_FUZZED(sign(xpos)))));
                    {
                        int GLF_live8looplimiter1 = 0;
                        for (int GLF_live8u = GLF_live8MATRIX_N - 1; GLF_live8u >= GLF_live8k; GLF_live8u--) {
                            if (GLF_live8looplimiter1 >= 7) {
                                break;
                            }
                            GLF_live8looplimiter1++;
                            {
                                GLF_live8alpha1 += pow(GLF_live8matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_live8u, 4)], 2.0);
                            }
                        }
                    }
                    GLF_live8alpha2 = 2.0 / GLF_live8alpha1;
                    {
                        int GLF_live8looplimiter4 = 0;
                        for (int GLF_live8j = GLF_live8k; GLF_live8j < GLF_live8MATRIX_N; GLF_live8j++) {
                            if (GLF_live8looplimiter4 >= 7) {
                                break;
                            }
                            GLF_live8looplimiter4++;
                            {
                                {
                                    int GLF_live8looplimiter2 = 0;
                                    for (int GLF_live8a = GLF_live8MATRIX_N - 1; GLF_live8a >= GLF_live8k; GLF_live8a--) {
                                        if (GLF_live8looplimiter2 >= 7) {
                                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                _GLF_color = unpackSnorm4x8((198094u));
                                            }
                                            break;
                                        }
                                        GLF_live8looplimiter2++;
                                        {
                                            GLF_live8alpha3 += GLF_live8matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_live8a, 4)] * _GLF_IDENTITY(GLF_live8matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_live8a, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live8j, 4)], float(vec3(GLF_live8matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_live8a, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live8j, 4)], 0.0, 1.0)));
                                        }
                                    }
                                }
                                GLF_live8beta = GLF_live8alpha2 * GLF_live8alpha3;
                                {
                                    int GLF_live8looplimiter3 = 0;
                                    for (int GLF_live8a = GLF_live8MATRIX_N - 1; GLF_live8a >= GLF_live8k; GLF_live8a--) {
                                        if (GLF_live8looplimiter3 >= _GLF_IDENTITY(7, clamp(7, _GLF_IDENTITY(7, clamp(_GLF_IDENTITY(7, 1 * (7)), 7, 7)), 7))) {
                                            break;
                                        }
                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                            _GLF_color = vec4(5.8, 45.67, 3.0, -23.95);
                                        }
                                        GLF_live8looplimiter3++;
                                        {
                                            GLF_live8matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_live8a, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live8j, 4)] = GLF_live8matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_live8a, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live8j, 4)] - (GLF_live8beta * GLF_live8matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_live8a, 4)]);
                                        }
                                    }
                                }
                                GLF_live8alpha3 = 0.0;
                                GLF_live8beta = 0.0;
                            }
                            if (_GLF_DEAD(false)) {
                                _GLF_color = trunc(vec4(-823.354, -86.00, 8.4, 6111.5029));
                            }
                        }
                    }
                    {
                        int GLF_live8looplimiter5 = 0;
                        for (int GLF_live8b = GLF_live8MATRIX_N - 1; _GLF_IDENTITY(GLF_live8b >= GLF_live8k, _GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)) || (GLF_live8b >= GLF_live8k)); GLF_live8b--) {
                            if (GLF_live8looplimiter5 >= 7) {
                                break;
                            }
                            GLF_live8looplimiter5++;
                            if (_GLF_DEAD(false)) {
                                _GLF_color = GLF_dead1_GLF_color;
                            }
                            {
                                GLF_live8alpha3 += GLF_live8matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_live8b, 4)] * GLF_live8matrix_b[_GLF_MAKE_IN_BOUNDS_INT(GLF_live8b, 4)];
                            }
                            if (_GLF_DEAD(false)) {
                                _GLF_color = GLF_live8matrix_u;
                            }
                        }
                    }
                    GLF_live8beta = GLF_live8alpha2 * GLF_live8alpha3;
                    {
                        int GLF_live8looplimiter6 = 0;
                        for (int GLF_live8b = GLF_live8MATRIX_N - 1; GLF_live8b >= GLF_live8k; GLF_live8b--) {
                            if (GLF_live8looplimiter6 >= 7) {
                                break;
                            }
                            GLF_live8looplimiter6++;
                            {
                                GLF_live8matrix_b[_GLF_MAKE_IN_BOUNDS_INT(GLF_live8b, 4)] = GLF_live8matrix_b[_GLF_MAKE_IN_BOUNDS_INT(GLF_live8b, 4)] - (GLF_live8beta * GLF_live8matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_live8b, 4)]);
                            }
                        }
                    }
                    GLF_live8magnitudeX = 0.0;
                    GLF_live8alpha1 = 0.0;
                    GLF_live8alpha2 = 0.0;
                    GLF_live8alpha3 = 0.0;
                    GLF_live8beta = 0.0;
                }
            }
        }
        iteration++;
    }
    if (_GLF_DEAD(false)) {
        _GLF_color = GLF_dead1_GLF_color;
    }
    if (iteration < 1000) {
        return pickColor(iteration);
        if (_GLF_DEAD(false)) {
            {
                vec2 GLF_live6coord = _GLF_FUZZED(vec2(_GLF_IDENTITY(-13.43, mix(float(-13.43), float(_GLF_FUZZED(-4.4)), bool(false))), -0.0));
                int GLF_live6i = _GLF_FUZZED((56611 ^ 90533));
                int GLF_live6looplimiter0 = 0;
                vec4 GLF_live6res = _GLF_FUZZED((vec4(vec2(-8.8, -5.3), vec2(3.5, _GLF_IDENTITY(539.833, clamp(539.833, 539.833, 539.833))))));
                float GLF_live6uvstep = _GLF_FUZZED(8831.9930);
                for (int GLF_live6j = 0; GLF_live6j < 3; GLF_live6j++) {
                    if (GLF_live6looplimiter0 >= 7) {
                        break;
                    }
                    GLF_live6looplimiter0++;
                    {
                        GLF_live6res += texture(GLF_live6tex, GLF_live6coord + vec2(_GLF_IDENTITY(float(GLF_live6i - 1), max(_GLF_IDENTITY(float(GLF_live6i - 1), (false ? _GLF_FUZZED(yCoord) : float(GLF_live6i - 1))), _GLF_IDENTITY(float(GLF_live6i - 1), (true ? float(GLF_live6i - 1) : _GLF_FUZZED(xpos))))) * GLF_live6uvstep, float(GLF_live6j - 1) * _GLF_IDENTITY(GLF_live6uvstep, float(float(GLF_live6uvstep))))) * _GLF_IDENTITY(GLF_live6weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6i * 3 + GLF_live6j, 9)], _GLF_IDENTITY(float(mat2x3(_GLF_IDENTITY(GLF_live6weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6i * 3 + GLF_live6j, 9)], mix(float(_GLF_FUZZED(8152.6067)), float(GLF_live6weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6i * 3 + GLF_live6j, 9)]), bool(true))), 1.0, 1.0, 1.0, 0.0, 1.0)), (false ? _GLF_FUZZED(c_re) : float(mat2x3(_GLF_IDENTITY(GLF_live6weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6i * 3 + GLF_live6j, 9)], mix(float(_GLF_FUZZED(8152.6067)), float(GLF_live6weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6i * 3 + GLF_live6j, 9)]), bool(true))), 1.0, 1.0, 1.0, 0.0, 1.0)))));
                    }
                }
            }
            mat4 donor_replacementGLF_dead4matrix_a = _GLF_FUZZED((mat2x4(99.40, -1.4, _GLF_IDENTITY(-8.1, (-8.1) + 0.0), 490.421, -4.2, -269.181, -85.55, 4.6) * mat4x2(mat3x2(5663.6523, -4774.6447, -31.85, -3737.6356, 3.9, -432.942))));
            for (int GLF_dead4a = GLF_dead4MATRIX_N - 1; GLF_dead4a >= iteration; GLF_dead4a--) {
                height += _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead4a, 4)] * donor_replacementGLF_dead4matrix_a[_GLF_MAKE_IN_BOUNDS_INT(_GLF_IDENTITY(GLF_dead4a, clamp(GLF_dead4a, GLF_dead4a, _GLF_IDENTITY(GLF_dead4a, min(GLF_dead4a, _GLF_IDENTITY(GLF_dead4a, (GLF_dead4a) >> 0))))), 4)][_GLF_MAKE_IN_BOUNDS_INT(_GLF_IDENTITY(iteration, (_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)) ? iteration : _GLF_FUZZED(GLF_dead4a))), 4)];
            }
        }
    } else {
        return vec3(xCoord / resolution.x, 0.0, _GLF_IDENTITY(yCoord / resolution.y, 1.0 * (_GLF_IDENTITY(yCoord / resolution.y, (true ? (yCoord / resolution.y) : _GLF_FUZZED(xpos))))));
        if (_GLF_DEAD(false)) {
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < tan(abs(0.0)))))) {
                return vec3(1.0, 1.0, 1.0);
            }
            _GLF_color = vec4(-29.69, -1.3, -14.41, 4579.3095);
            if (_GLF_DEAD(false)) {
                _GLF_color = dFdxFine(GLF_dead1_GLF_color);
            }
        }
        if (_GLF_DEAD(false)) {
            _GLF_color = vec4(-9.4, -6.4, 235.417, -5.6);
        }
        if (_GLF_DEAD(false)) {
            _GLF_color = step(yCoord, GLF_dead1_GLF_color);
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            if (_GLF_DEAD(false)) {
                _GLF_color = pow(vec4(-67.89, -8696.4742, -9.7, 8653.0251), normalize(GLF_dead1_GLF_color));
            }
            return vec3(1.0, 1.0, 1.0);
        }
        {
            vec4 _GLF_outVarBackup_GLF_color;
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    _GLF_color = _GLF_color;
                }
                return vec3(1.0, 1.0, 1.0);
            }
            if (_GLF_DEAD(false)) {
                _GLF_color = mix(GLF_dead1_GLF_color, dFdx(GLF_dead1_GLF_color), bvec4(true, true, false, true));
            }
            if (_GLF_DEAD(false)) {
                for (iteration = 0; iteration < iteration; iteration++) {
                    iteration = (4 * iteration * (1000 - iteration)) / 1000;
                }
            }
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = vec4(-1.2, -0.2, -69.15, -2.0);
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
        return vec3(1.0, 1.0, 1.0);
    }
}

void main() {
    if (_GLF_DEAD(false)) {
        return;
        {
            int GLF_live6looplimiter0 = 0;
            if (GLF_live6looplimiter0 >= 7) {
                ;
            }
        }
    }
    vec3 data[16];
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < determinant(mat3(length(vec4(0.0, 0.0, 0.0, 0.0)), 1.0, 1.0, 0.0, 0.0, determinant(mat2(0.0, 0.0, 0.0, 0.0)), 0.0, sqrt(0.0), 0.0)))))) {
        _GLF_IDENTITY(_GLF_color = GLF_dead1_GLF_color, (true ? (_GLF_color = GLF_dead1_GLF_color) : _GLF_FUZZED(vec4(332.709, -958.796, -693.318, -19.96))));
        if (_GLF_DEAD(false)) {
            _GLF_color = ceil(vec4(-760.231, 9629.5478, 25.41, 12.38));
        }
    }
    if (_GLF_DEAD(false)) {
        _GLF_color = vec4(-79.15, 7263.6465, 78.49, 1847.3741);
        if (_GLF_DEAD(false)) {
            return;
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                vec2 donor_replacementGLF_dead2coord = _GLF_FUZZED(resolution);
                int donor_replacementGLF_dead2i = _GLF_FUZZED(67420);
                float donor_replacementGLF_dead2uvstep = _GLF_FUZZED(-224.564);
                {
                    for (int GLF_dead2j = 0; GLF_dead2j < 3; GLF_dead2j++) {
                        _GLF_color += texture(GLF_dead2tex, donor_replacementGLF_dead2coord + vec2(float(donor_replacementGLF_dead2i - _GLF_IDENTITY(1, 0 ^ (1))) * donor_replacementGLF_dead2uvstep, float(GLF_dead2j - 1) * donor_replacementGLF_dead2uvstep)) * GLF_dead2weights[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead2i * 3 + GLF_dead2j, 9)];
                    }
                }
            }
        }
    }
    if (_GLF_DEAD(false)) {
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = vec4(975.099, 9.4, 3454.9238, 5539.7267);
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                if (_GLF_DEAD(false)) {
                    _GLF_color = GLF_dead1_GLF_color;
                }
                if (_GLF_DEAD(false)) {
                    int donor_replacementGLF_dead4a = _GLF_FUZZED((~92260));
                    float donor_replacementGLF_dead4beta = _GLF_FUZZED(762.516);
                    int donor_replacementGLF_dead4j = _GLF_FUZZED(-81457);
                    mat4 donor_replacementGLF_dead4matrix_a = _GLF_FUZZED(mat4(-9.0, -3.6, -3804.1959, 3540.7306, 367.166, 920.518, -6807.3795, -291.470, 8669.7120, 165.461, 849.699, -765.930, 1.6, 620.326, 256.122, 27.88));
                    vec4 donor_replacementGLF_dead4matrix_u = _GLF_FUZZED(mix(_GLF_color, _GLF_color, bvec4(true, false, true, true)));
                    {
                        if (_GLF_DEAD(false)) {
                            _GLF_color = vec4(-8507.8063, 150.056, -973.277, 8877.0632);
                        }
                        donor_replacementGLF_dead4matrix_a[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4a, 4)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4j, 4)] = donor_replacementGLF_dead4matrix_a[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4a, 4)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4j, 4)] - (donor_replacementGLF_dead4beta * donor_replacementGLF_dead4matrix_u[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4a, 4)]);
                    }
                }
                if (_GLF_DEAD(false)) {
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        vec2 donor_replacementGLF_dead2coord = _GLF_FUZZED(resolution);
                        int donor_replacementGLF_dead2i = _GLF_FUZZED((+_GLF_IDENTITY(70459, (70459) ^ 0)));
                        int donor_replacementGLF_dead2j = _GLF_FUZZED(38865);
                        float donor_replacementGLF_dead2uvstep = _GLF_FUZZED(smoothstep(-_GLF_IDENTITY(61.19, clamp(61.19, 61.19, 61.19)), abs(-81.17), (+(-7.8))));
                        {
                            GLF_dead1_GLF_color += texture(GLF_dead2tex, donor_replacementGLF_dead2coord + vec2(float(donor_replacementGLF_dead2i - 1) * donor_replacementGLF_dead2uvstep, float(donor_replacementGLF_dead2j - 1) * donor_replacementGLF_dead2uvstep)) * GLF_dead2weights[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead2i * 3 + donor_replacementGLF_dead2j, 9)];
                        }
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        _GLF_color = GLF_dead1_GLF_color;
                    }
                    return;
                }
                _GLF_color = _GLF_outVarBackup_GLF_color;
                if (_GLF_DEAD(_GLF_IDENTITY(false, !(!(false))))) {
                    if (_GLF_DEAD(false)) {
                        _GLF_color = vec4(-372.539, -655.588, -9.8, 5068.5398);
                    }
                    float donor_replacementGLF_dead4alpha2 = _GLF_IDENTITY(_GLF_FUZZED(-60.12), min(_GLF_FUZZED(-60.12), _GLF_IDENTITY(_GLF_FUZZED(-60.12), mix(float(_GLF_FUZZED(9720.2762)), float(_GLF_FUZZED(-60.12)), bool(true)))));
                    float donor_replacementGLF_dead4alpha3 = _GLF_FUZZED(refract(distance(vec3(6.6, 1966.5505, 765.454), (vec3(49.49, 2.1, 219.177) + vec3(1.5, -4.7, -982.289))), 631.488, -28.57));
                    float donor_replacementGLF_dead4beta = _GLF_FUZZED(-7.3);
                    int donor_replacementGLF_dead4j = _GLF_FUZZED(((-90064) << int((109572u % 41522u))));
                    int donor_replacementGLF_dead4k = _GLF_FUZZED(bitfieldReverse(-81638));
                    mat4 donor_replacementGLF_dead4matrix_a = _GLF_FUZZED(mat4(-5.7, 6.5, 51.38, 576.048, -4.3, -592.663, 5.3, -4677.7876, -278.244, -73.39, -4697.8067, 223.164, -968.956, -7.4, 917.892, 1.8));
                    {
                        for (int GLF_dead4a = GLF_dead4MATRIX_N - 1; GLF_dead4a >= donor_replacementGLF_dead4k; GLF_dead4a--) {
                            donor_replacementGLF_dead4alpha3 += _GLF_outVarBackup_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead4a, 4)] * donor_replacementGLF_dead4matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead4a, 4)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4j, 4)];
                        }
                        donor_replacementGLF_dead4beta = donor_replacementGLF_dead4alpha2 * donor_replacementGLF_dead4alpha3;
                        for (int GLF_dead4a = GLF_dead4MATRIX_N - 1; GLF_dead4a >= donor_replacementGLF_dead4k; GLF_dead4a--) {
                            donor_replacementGLF_dead4matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead4a, 4)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4j, 4)] = donor_replacementGLF_dead4matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead4a, 4)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4j, 4)] - (donor_replacementGLF_dead4beta * _GLF_outVarBackup_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead4a, 4)]);
                        }
                        donor_replacementGLF_dead4alpha3 = 0.0;
                        donor_replacementGLF_dead4beta = 0.0;
                    }
                }
                if (_GLF_DEAD(false)) {
                    return;
                }
            }
        }
        return;
        {
            vec4 _GLF_outVarBackup_GLF_color;
            if (_GLF_DEAD(false)) {
                return;
            }
            if (_GLF_DEAD(false)) {
                int donor_replacementGLF_dead5i = _GLF_FUZZED(86512);
                int donor_replacementGLF_dead5iters = _GLF_FUZZED(((-10697) | (-24240)));
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    _GLF_color = vec4(73.69, -2.3, 1.5, 1.2);
                }
                int donor_replacementGLF_dead5v = _GLF_FUZZED((-bitfieldExtract(46536, -83311, -83189)));
                for (donor_replacementGLF_dead5i = 0; donor_replacementGLF_dead5i < donor_replacementGLF_dead5iters; donor_replacementGLF_dead5i++) {
                    if (_GLF_DEAD(false)) {
                        _GLF_color = _GLF_color;
                    }
                    donor_replacementGLF_dead5v = (4 * donor_replacementGLF_dead5v * (1000 - donor_replacementGLF_dead5v)) / 1000;
                    {
                        int GLF_live6looplimiter0 = 0;
                        if (GLF_live6looplimiter0 >= 7) {
                            ;
                        }
                    }
                }
            }
            _GLF_outVarBackup_GLF_color = _GLF_color;
            if (_GLF_DEAD(false)) {
                vec2 donor_replacementGLF_dead2coord = _GLF_FUZZED(resolution);
                {
                    vec3 GLF_live5c = _GLF_IDENTITY(_GLF_FUZZED(vec3(vec4(-14.08, 78.51, -55.39, 3142.2071))), (_GLF_IDENTITY(_GLF_FUZZED(vec3(vec4(-14.08, 78.51, -55.39, 3142.2071))), mix(vec3(_GLF_FUZZED(-3270.9285), (_GLF_FUZZED(vec3(vec4(-14.08, 78.51, -55.39, 3142.2071))))[1], (_GLF_FUZZED(vec3(vec4(-14.08, 78.51, -55.39, 3142.2071))))[2]), vec3((_GLF_FUZZED(vec3(vec4(-14.08, 78.51, -55.39, 3142.2071))))[0], _GLF_FUZZED(-8.7), _GLF_FUZZED(4606.6298)), bvec3(true, false, false)))) - vec3(0.0, 0.0, 0.0));
                    int GLF_live5i = _GLF_FUZZED(-2138);
                    int GLF_live5looplimiter1 = 0;
                    {
                        if (GLF_live5looplimiter1 >= 3) {
                            ;
                        }
                        GLF_live5looplimiter1++;
                        {
                            if (_GLF_DEAD(false)) {
                                _GLF_color = vec4(-795.647, injectionSwitch, -4.0);
                            }
                            if (GLF_live5c[_GLF_IDENTITY(_GLF_MAKE_IN_BOUNDS_INT(GLF_live5i, 3), 0 | (_GLF_MAKE_IN_BOUNDS_INT(GLF_live5i, 3)))] >= 1.0) {
                                GLF_live5c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live5i, 3)] = _GLF_IDENTITY(GLF_live5c, (true ? _GLF_IDENTITY(GLF_live5c, min(GLF_live5c, GLF_live5c)) : _GLF_FUZZED(vec3(-2389.4784, -38.47, 3964.2692))))[_GLF_MAKE_IN_BOUNDS_INT(GLF_live5i, 3)] * GLF_live5c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live5i, 3)];
                            }
                        }
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < log(1.0))))) {
                        _GLF_color = GLF_dead1_GLF_color;
                    }
                }
                float donor_replacementGLF_dead2uvstep = _GLF_FUZZED(-7.0);
                for (int GLF_dead2i = 0; GLF_dead2i < 3; GLF_dead2i++) {
                    for (int GLF_dead2j = 0; _GLF_IDENTITY(GLF_dead2j, max(_GLF_IDENTITY(GLF_dead2j, clamp(GLF_dead2j, GLF_dead2j, GLF_dead2j)), _GLF_IDENTITY(GLF_dead2j, (_GLF_IDENTITY(GLF_dead2j, (GLF_dead2j) * 1)) | 0))) < 3; GLF_dead2j++) {
                        _GLF_color += texture(GLF_dead2tex, donor_replacementGLF_dead2coord + vec2(float(GLF_dead2i - 1) * donor_replacementGLF_dead2uvstep, float(GLF_dead2j - 1) * donor_replacementGLF_dead2uvstep)) * GLF_dead2weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead2i * 3 + GLF_dead2j, 9)];
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        _GLF_color = _GLF_color;
                    }
                }
            }
            {
                if (_GLF_DEAD(false)) {
                    _GLF_color = vec4(-1.9, 6.6, -7.8, 52.02);
                }
                vec3 GLF_live5c = _GLF_FUZZED(vec3(-6.8, -2249.2162, -321.987));
                int GLF_live5i = _GLF_FUZZED(64405);
                if (GLF_live5c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live5i, 3)] >= 1.0) {
                    GLF_live5c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live5i, 3)] = GLF_live5c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live5i, 3)] * GLF_live5c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live5i, 3)];
                }
            }
            if (_GLF_DEAD(false)) {
                return;
            }
            _GLF_color = (-vec4(-1.8, -_GLF_IDENTITY(6.5, max(6.5, 6.5)), -390.837, -12.12));
            if (_GLF_DEAD(false)) {
                {
                    if (_GLF_DEAD(false)) {
                        _GLF_color = vec4(6.7, -769.837, -99.94, -943.975);
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            return;
                        }
                    }
                    vec4 _GLF_outVarBackup_GLF_color;
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                    if (_GLF_DEAD(false)) {
                        int donor_replacementGLF_dead5i = _GLF_FUZZED(26170);
                        int donor_replacementGLF_dead5iters = _GLF_FUZZED(-59850);
                        int donor_replacementGLF_dead5v = _GLF_FUZZED((((-48515) * 65121) & (-59082)));
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                        for (donor_replacementGLF_dead5i = 0; donor_replacementGLF_dead5i < donor_replacementGLF_dead5iters; donor_replacementGLF_dead5i++) {
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                _GLF_color = exp(vec4(-4.8, -77.83, -7.8, -8.9));
                            }
                            donor_replacementGLF_dead5v = (4 * donor_replacementGLF_dead5v * (1000 - donor_replacementGLF_dead5v)) / 1000;
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        _GLF_color = GLF_dead1_GLF_color;
                    }
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(59.57, 2.5, 1.9, -282.182);
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                    {
                        vec2 GLF_live6coord = _GLF_FUZZED((-(vec2(-9418.8104, 8.6) * vec2(794.648, -7.8))));
                        int GLF_live6i = _GLF_FUZZED(_GLF_IDENTITY((80944 + 94406), 0 ^ ((80944 + 94406))));
                        int GLF_live6looplimiter0 = 0;
                        vec4 GLF_live6res = _GLF_FUZZED(vec4(85.20, -_GLF_IDENTITY(2016.6281, (2016.6281) / 1.0), -398.909, 61.90));
                        float GLF_live6uvstep = _GLF_FUZZED(-50.28);
                        for (int GLF_live6j = 0; GLF_live6j < 3; GLF_live6j++) {
                            if (GLF_live6looplimiter0 >= 7) {
                                break;
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = uintBitsToFloat(uvec4(108274u, 194988u, 3653u, 181419u));
                                }
                            }
                            GLF_live6looplimiter0++;
                            {
                                GLF_live6res += texture(GLF_live6tex, GLF_live6coord + vec2(float(GLF_live6i - 1) * GLF_live6uvstep, float(GLF_live6j - 1) * GLF_live6uvstep)) * GLF_live6weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6i * 3 + GLF_live6j, 9)];
                            }
                        }
                    }
                }
                _GLF_color = mod(vec4(6948.5609, -92.67, 6.5, -5.0), smoothstep(-6830.5576, -89.55, -9381.1139));
            }
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
                if (_GLF_DEAD(false)) {
                    if (_GLF_DEAD(false)) {
                        _GLF_color = _GLF_color;
                    }
                    return;
                }
            }
        }
    }
    {
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < tan(0.0))))) {
            return;
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (_GLF_IDENTITY(gl_FragCoord.x < 0.0, (gl_FragCoord.x < 0.0) || false))))) {
            _GLF_IDENTITY(_GLF_color = vec4(10.55, -646.020, -49.28, 7048.8813), (false ? _GLF_FUZZED(vec4(0.1, 4760.1913, 2.7, 861.162)) : (_GLF_color = vec4(10.55, -646.020, -49.28, 7048.8813))));
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                _GLF_color = fract(_GLF_color);
            }
        }
        if (_GLF_DEAD(false)) {
            return;
        }
        int GLF_live0i = _GLF_FUZZED((((-84418) * (-752)) + (-94848)));
        if (_GLF_DEAD(false)) {
            _GLF_color = GLF_dead1_GLF_color;
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            {
                int GLF_live6looplimiter0 = 0;
                if (GLF_live6looplimiter0 >= 7) {
                    ;
                }
            }
            for (GLF_live0i = 0; GLF_live0i < GLF_live0i; GLF_live0i++) {
                GLF_live0i = (4 * GLF_live0i * (1000 - GLF_live0i)) / 1000;
            }
        }
        int GLF_live0iters = _GLF_FUZZED(94523);
        int GLF_live0looplimiter0 = 0;
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            _GLF_color = vec4(744.246, -59.95, -_GLF_IDENTITY(6.0, mix(float(_GLF_IDENTITY(6.0, clamp(6.0, _GLF_IDENTITY(6.0, (true ? 6.0 : _GLF_FUZZED(831.177))), 6.0))), float(_GLF_FUZZED(920.404)), bool(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))))), -4237.7673);
        }
        {
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    if (_GLF_DEAD(false)) {
                        _GLF_color = fwidthFine(_GLF_outVarBackup_GLF_color);
                    }
                    return;
                    if (_GLF_DEAD(false)) {
                        _GLF_color = (float(false), ((-3.1) - vec4(0.8, -432.377, 35.24, 3.4)));
                    }
                }
                {
                    {
                        ;
                    }
                }
                _GLF_color = round(vec4(-698.612, 58.11, 1602.1041, 29.98));
                if (_GLF_DEAD(false)) {
                    return;
                }
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        {
                            float GLF_live7th = _GLF_FUZZED(vec2(6.2, 4.0).s);
                            {
                                GLF_live7th = -GLF_live7th;
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                    _GLF_color = vec4(vec3(986.792, -3.3, -325.662)[2], vec3(4.3, 18.31, -0.5));
                                }
                            }
                        }
                        return;
                        if (_GLF_DEAD(false)) {
                            _GLF_color = GLF_dead1_GLF_color;
                        }
                    }
                }
            }
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_ZERO(0.0, injectionSwitch.x))))) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
            if (_GLF_DEAD(false)) {
                {
                    vec2 GLF_live6coord = _GLF_FUZZED(_GLF_IDENTITY(vec2(74.73, -50.61), mix(vec2(_GLF_FUZZED(-1558.0110), _GLF_FUZZED(77.10)), vec2((vec2(74.73, -50.61))[0], (vec2(74.73, -50.61))[1]), bvec2(true, true))));
                    int GLF_live6i = _GLF_FUZZED(((~3989) - ivec4(87756, 14062, -2773, -81624).g));
                    int GLF_live6looplimiter1 = 0;
                    vec4 GLF_live6res = _GLF_FUZZED((vec4(-9.1, vec3(5826.9998, -900.335, 9862.0905)).zxzw * mat4(7.4, -250.360, -4.7, -8471.0021, 65.85, 77.37, _GLF_IDENTITY(-8601.4324, (-8601.4324) - 0.0), 0.9, 7553.7908, 68.74, -27.10, -465.839, 6370.6552, -44.42, -489.083, 52.55)));
                    float GLF_live6uvstep = _GLF_IDENTITY(_GLF_FUZZED(((-4476.8341) * (-7.1))), mix(float(_GLF_FUZZED(((-4476.8341) * (-7.1)))), float(_GLF_FUZZED(-6.2)), bool(false)));
                    {
                        if (GLF_live6looplimiter1 >= 7) {
                            ;
                        }
                        GLF_live6looplimiter1++;
                        {
                            {
                                int GLF_live6looplimiter0 = 0;
                                for (int GLF_live6j = 0; GLF_live6j < 3; GLF_live6j++) {
                                    if (_GLF_IDENTITY(GLF_live6looplimiter0 >= 7, (_GLF_IDENTITY(GLF_live6looplimiter0 >= 7, !(!(_GLF_IDENTITY(GLF_live6looplimiter0 >= 7, !(!(GLF_live6looplimiter0 >= 7))))))) || false)) {
                                        break;
                                    }
                                    GLF_live6looplimiter0++;
                                    {
                                        GLF_live6res += texture(GLF_live6tex, GLF_live6coord + _GLF_IDENTITY(vec2(float(GLF_live6i - 1) * GLF_live6uvstep, float(GLF_live6j - 1) * GLF_live6uvstep), clamp(vec2(float(GLF_live6i - 1) * GLF_live6uvstep, float(GLF_live6j - 1) * GLF_live6uvstep), vec2(float(GLF_live6i - 1) * GLF_live6uvstep, float(GLF_live6j - 1) * GLF_live6uvstep), vec2(float(GLF_live6i - 1) * GLF_live6uvstep, float(GLF_live6j - 1) * GLF_live6uvstep)))) * GLF_live6weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6i * 3 + GLF_live6j, 9)];
                                    }
                                }
                            }
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        _GLF_color = GLF_live6res;
                    }
                }
                vec2 donor_replacementGLF_dead2coord = _GLF_FUZZED(_GLF_IDENTITY(injectionSwitch, clamp(injectionSwitch, injectionSwitch, injectionSwitch)));
                float donor_replacementGLF_dead2uvstep = _GLF_FUZZED(4875.6876);
                for (int GLF_dead2j = 0; GLF_dead2j < 3; GLF_dead2j++) {
                    _GLF_color += texture(GLF_dead2tex, donor_replacementGLF_dead2coord + vec2(float(GLF_live0i - 1) * donor_replacementGLF_dead2uvstep, float(GLF_dead2j - 1) * donor_replacementGLF_dead2uvstep)) * GLF_dead2weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live0i * 3 + GLF_dead2j, 9)];
                }
            }
            _GLF_color = vec4(-0.8, 344.040, 0.4, 27.50);
            if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)), (_GLF_TRUE(true, (gl_FragCoord.y >= 0.0))) && true))) {
                _GLF_IDENTITY(_GLF_color = _GLF_outVarBackup_GLF_color, (_GLF_IDENTITY(_GLF_color = _GLF_outVarBackup_GLF_color, (_GLF_color = _GLF_outVarBackup_GLF_color) * exp(vec4(0.0, 0.0, 0.0, 0.0)))) / vec4(1.0, 1.0, 1.0, 1.0));
            }
        }
        if (_GLF_DEAD(false)) {
            if (_GLF_DEAD(false)) {
                return;
            }
            bool donor_replacementGLF_dead1c1 = _GLF_FUZZED((ivec3(98291, 79149, -10073) != ivec3(-15254, -54083, 28058)));
            bool donor_replacementGLF_dead1c2 = _GLF_FUZZED(_GLF_IDENTITY(((mat2(7104.4683, -4.8, 170.039, 5113.1974) * vec2(-24.14, 5.8)) == _GLF_IDENTITY(resolution, mix(vec2((resolution)[0], (resolution)[1]), vec2(_GLF_FUZZED(-679.429), _GLF_FUZZED(729.843)), bvec2(false, _GLF_FALSE(false, (gl_FragCoord.y < 0.0)))))), true && (((_GLF_IDENTITY(mat2(7104.4683, -4.8, 170.039, 5113.1974) * vec2(-24.14, 5.8), min(mat2(7104.4683, -4.8, 170.039, 5113.1974) * vec2(-24.14, 5.8), mat2(7104.4683, -4.8, 170.039, 5113.1974) * vec2(-24.14, 5.8)))) == _GLF_IDENTITY(resolution, mix(vec2((resolution)[0], (resolution)[1]), vec2(_GLF_FUZZED(-679.429), _GLF_FUZZED(729.843)), bvec2(false, _GLF_FALSE(false, (gl_FragCoord.y < 0.0)))))))));
            bool donor_replacementGLF_dead1c3 = _GLF_FUZZED((true));
            bool donor_replacementGLF_dead1c4 = _GLF_FUZZED(true);
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                _GLF_color = mix(GLF_dead1_GLF_color, (vec4(82.46, -1.4, 904.465, 533.337) * mat4(-3107.8525, 2685.0621, -2292.6836, 472.157, -65.58, 9787.6244, 9.5, -2454.7046, 7.1, 8950.1162, -56.74, 55.76, _GLF_IDENTITY(6067.1192, (false ? _GLF_FUZZED(length((5.2 + _GLF_color))) : 6067.1192)), 7743.4843, -46.52, -2.8)), -8862.9588);
            }
            if (_GLF_DEAD(false)) {
                return;
            }
            vec3 donor_replacementGLF_dead1col = _GLF_FUZZED(cross(vec3(-494.384, -120.284, -475.840), vec3(-797.162, -4806.7724, 9.3)));
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                if (_GLF_DEAD(false)) {
                    return;
                }
                {
                    vec2 GLF_live7a = _GLF_FUZZED(vec2(6.8, -21.88));
                    float GLF_live7z = _GLF_FUZZED(53.89);
                    {
                        GLF_live7z = GLF_live7a.x / GLF_live7a.y;
                    }
                }
                _GLF_color = refract(_GLF_color, vec4(6281.4828, 45.91, -640.140, 1.2), -9.8);
                {
                    if (_GLF_DEAD(_GLF_IDENTITY(false, false || (_GLF_IDENTITY(false, (false) && true))))) {
                        return;
                    }
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = (vec4(8754.5905, -6.8, -15.77, 4.2) / (-25.58));
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                if (_GLF_DEAD(false)) {
                    _GLF_color = _GLF_color;
                }
            }
            if (_GLF_DEAD(false)) {
                _GLF_color = _GLF_color;
            }
            vec2 donor_replacementGLF_dead1uv = _GLF_FUZZED(fwidthFine(vec2(-901.452, -93.36)));
            if (!donor_replacementGLF_dead1c1 && !donor_replacementGLF_dead1c2 && !donor_replacementGLF_dead1c3 && donor_replacementGLF_dead1c4) {
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    float donor_replacementGLF_dead2uvstep = _GLF_FUZZED(dot(vec4(220.006), GLF_dead1_GLF_color));
                    {
                        for (int GLF_dead2j = 0; GLF_dead2j < 3; GLF_dead2j++) {
                            _GLF_color += texture(GLF_dead2tex, donor_replacementGLF_dead1uv + vec2(float(GLF_live0looplimiter0 - 1) * donor_replacementGLF_dead2uvstep, float(GLF_dead2j - 1) * donor_replacementGLF_dead2uvstep)) * GLF_dead2weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live0looplimiter0 * 3 + GLF_dead2j, 9)];
                        }
                    }
                }
                float GLF_dead1stripe = GLF_dead1compute_stripe(tan((_GLF_IDENTITY(donor_replacementGLF_dead1uv.x, max(donor_replacementGLF_dead1uv.x, donor_replacementGLF_dead1uv.x)) + donor_replacementGLF_dead1uv.y) * 20.0));
                if (_GLF_DEAD(false)) {
                    _GLF_color = GLF_dead1_GLF_color;
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        {
                            vec2 GLF_live6coord = _GLF_FUZZED(vec2(-8679.5778, -8.3));
                            int GLF_live6i = _GLF_FUZZED(-98345);
                            int GLF_live6j = _GLF_FUZZED((45320 & (+86035)));
                            vec4 GLF_live6res = _GLF_FUZZED(vec4(-962.084, -7.2, 98.63, -1182.0672));
                            float GLF_live6uvstep = _GLF_FUZZED((-float(-39780)));
                            {
                                GLF_live6res += texture(GLF_live6tex, GLF_live6coord + vec2(_GLF_IDENTITY(float(_GLF_IDENTITY(GLF_live6i, 0 ^ (GLF_live6i)) - 1) * GLF_live6uvstep, clamp(_GLF_IDENTITY(float(_GLF_IDENTITY(GLF_live6i, 0 ^ (GLF_live6i)) - 1) * GLF_live6uvstep, mix(float(float(_GLF_IDENTITY(GLF_live6i, 0 ^ (GLF_live6i)) - 1) * GLF_live6uvstep), float(_GLF_FUZZED(95.84)), bool(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))))), _GLF_IDENTITY(float(_GLF_IDENTITY(GLF_live6i, 0 ^ (GLF_live6i)) - 1) * GLF_live6uvstep, (float(_GLF_IDENTITY(GLF_live6i, 0 ^ (GLF_live6i)) - 1) * GLF_live6uvstep) / 1.0), float(_GLF_IDENTITY(GLF_live6i, 0 ^ (GLF_live6i)) - 1) * GLF_live6uvstep)), float(GLF_live6j - 1) * GLF_live6uvstep)) * GLF_live6weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6i * 3 + _GLF_IDENTITY(GLF_live6j, (GLF_live6j) | (GLF_live6j)), 9)];
                            }
                        }
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = (vec4(-_GLF_IDENTITY(4.6, _GLF_IDENTITY(float(mat3x2(_GLF_IDENTITY(4.6, mix(float(4.6), float(_GLF_FUZZED(6.3)), bool(false))), 1.0, 1.0, 1.0, _GLF_IDENTITY(1.0, float(float(1.0))), 1.0)), min(float(mat3x2(_GLF_IDENTITY(4.6, mix(float(4.6), float(_GLF_FUZZED(6.3)), bool(false))), 1.0, 1.0, 1.0, _GLF_IDENTITY(_GLF_IDENTITY(1.0, float(float(1.0))), (_GLF_IDENTITY(_GLF_IDENTITY(1.0, float(float(1.0))), 1.0 * (_GLF_IDENTITY(1.0, float(float(1.0)))))) / 1.0), 1.0)), _GLF_IDENTITY(float(mat3x2(_GLF_IDENTITY(4.6, mix(float(4.6), float(_GLF_FUZZED(6.3)), bool(false))), 1.0, 1.0, 1.0, _GLF_IDENTITY(1.0, float(float(1.0))), 1.0)), (true ? float(mat3x2(_GLF_IDENTITY(4.6, mix(float(4.6), float(_GLF_FUZZED(6.3)), bool(false))), 1.0, 1.0, 1.0, _GLF_IDENTITY(1.0, float(float(1.0))), 1.0)) : _GLF_FUZZED(-6.3)))))), 2.6, 1.8, 1.7) - vec4(-29.31, -7.1, 60.91, -_GLF_IDENTITY(32.79, (false ? _GLF_FUZZED(GLF_dead1stripe) : 32.79))));
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < length(determinant(mat4(0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0))))))) {
                                    {
                                        for (int GLF_dead2j = 0; GLF_dead2j < 3; GLF_dead2j++) {
                                            _GLF_color += texture(GLF_dead2tex, donor_replacementGLF_dead1uv + vec2(float(GLF_live0iters - 1) * GLF_dead1stripe, float(GLF_dead2j - 1) * GLF_dead1stripe)) * GLF_dead2weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live0iters * 3 + GLF_dead2j, 9)];
                                        }
                                    }
                                }
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                                if (_GLF_DEAD(_GLF_IDENTITY(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)), !(!(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))))))) {
                                    _GLF_color = vec4(-8.4, -7.0, -3117.0897, 4.0);
                                }
                                _GLF_outVarBackup_GLF_color = _GLF_IDENTITY(_GLF_color, mix(vec4(_GLF_FUZZED(6.7), (_GLF_color)[1], _GLF_IDENTITY((_GLF_color)[2], ((_GLF_color)[2]) * 1.0), _GLF_FUZZED((3.6 * (-777.169)))), vec4((_GLF_color)[0], _GLF_FUZZED(-3333.8588), _GLF_FUZZED(161.004), (_GLF_color)[3]), bvec4(true, false, false, true)));
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                    mat4 donor_replacementGLF_dead4matrix_a = _GLF_FUZZED(outerProduct((_GLF_color - vec4(_GLF_IDENTITY(GLF_dead1stripe, min(_GLF_IDENTITY(GLF_dead1stripe, (GLF_dead1stripe) / exp(0.0)), GLF_dead1stripe)), donor_replacementGLF_dead1col)), atan(_GLF_color)));
                                    vec4 donor_replacementGLF_dead4matrix_b = _GLF_FUZZED((reflect(_GLF_color, GLF_dead1_GLF_color) + GLF_dead1_GLF_color));
                                    {
                                        for (int GLF_dead4j = (GLF_dead4MATRIX_N - 1); GLF_dead4j >= (GLF_live0looplimiter0 + 1); GLF_dead4j--) {
                                            donor_replacementGLF_dead4matrix_b[_GLF_MAKE_IN_BOUNDS_INT(GLF_live0looplimiter0, 4)] -= (donor_replacementGLF_dead4matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_live0looplimiter0, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead4j, 4)] * donor_replacementGLF_dead4matrix_b[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead4j, 4)]);
                                        }
                                        donor_replacementGLF_dead4matrix_b[_GLF_MAKE_IN_BOUNDS_INT(GLF_live0looplimiter0, 4)] /= donor_replacementGLF_dead4matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_live0looplimiter0, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live0looplimiter0, 4)];
                                    }
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = donor_replacementGLF_dead1col.ttsp;
                                    }
                                }
                                _GLF_color = dFdy(vec4(-3.1, 3.6, -58.13, -6515.3327));
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                    return;
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                        _GLF_color = vec4(838.486, 621.260, 6.3, 74.68);
                                    }
                                }
                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                    if (_GLF_DEAD(false)) {
                                        if (_GLF_DEAD(false)) {
                                            if (_GLF_DEAD(false)) {
                                                _GLF_color = _GLF_color;
                                            }
                                            for (int GLF_dead4b = GLF_dead4MATRIX_N - 1; _GLF_IDENTITY(GLF_dead4b, (true ? GLF_dead4b : _GLF_FUZZED(GLF_live8MATRIX_N))) >= GLF_live0looplimiter0; GLF_dead4b--) {
                                                GLF_dead1stripe += GLF_dead1_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead4b, 4)] * _GLF_outVarBackup_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(_GLF_IDENTITY(GLF_dead4b, ~(_GLF_IDENTITY(~(GLF_dead4b), ~(~(~(GLF_dead4b)))))), 4)];
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < length(0.0))))) {
                                                    _GLF_color = GLF_dead1_GLF_color;
                                                }
                                            }
                                        }
                                        if (_GLF_DEAD(false)) {
                                            return;
                                        }
                                        _GLF_color = vec4(3.3, -4.3, -9725.2255, 2041.9321);
                                    }
                                }
                            }
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                            {
                                int GLF_live8i = _GLF_FUZZED(8496);
                                int GLF_live8looplimiter9 = 0;
                                mat4 GLF_live8matrix_a = _GLF_FUZZED(mat4(_GLF_IDENTITY(-2215.2019, (false ? _GLF_FUZZED(-98.32) : (-2215.2019))), -9.0, 8.2, -86.51, 4.8, 611.278, 8254.6915, -875.113, -529.586, -2.8, -1.7, -7617.2429, -484.097, 24.88, -1.1, -4272.5658));
                                vec4 GLF_live8matrix_b = _GLF_FUZZED(vec4(125.411, -6.1, 451.035, -882.337));
                                if (_GLF_DEAD(_GLF_IDENTITY(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)), (_GLF_FALSE(false, (gl_FragCoord.y < 0.0))) || _GLF_FALSE(false, (gl_FragCoord.y < 0.0))))) {
                                    _GLF_color = vec4(donor_replacementGLF_dead1col, GLF_dead1stripe);
                                }
                                {
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                        _GLF_color = vec3(-26.34, 488.838, 52.80).yzyx;
                                    }
                                    if (GLF_live8looplimiter9 >= _GLF_IDENTITY(7, (7) | (7))) {
                                        ;
                                    }
                                    GLF_live8looplimiter9++;
                                    {
                                        {
                                            if (_GLF_DEAD(false)) {
                                                _GLF_color = tanh(GLF_live8matrix_b);
                                            }
                                            int GLF_live8looplimiter8 = 0;
                                            for (int GLF_live8j = (GLF_live8MATRIX_N - 1); GLF_live8j >= (GLF_live8i + 1); GLF_live8j--) {
                                                if (_GLF_DEAD(false)) {
                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                }
                                                if (GLF_live8looplimiter8 >= 7) {
                                                    break;
                                                }
                                                GLF_live8looplimiter8++;
                                                {
                                                    GLF_live8matrix_b[_GLF_MAKE_IN_BOUNDS_INT(GLF_live8i, 4)] -= (GLF_live8matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_live8i, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live8j, 4)] * GLF_live8matrix_b[_GLF_MAKE_IN_BOUNDS_INT(GLF_live8j, 4)]);
                                                }
                                            }
                                        }
                                        GLF_live8matrix_b[_GLF_MAKE_IN_BOUNDS_INT(GLF_live8i, 4)] /= GLF_live8matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_live8i, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live8i, 4)];
                                    }
                                }
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                {
                                    GLF_live0i = (4 * GLF_live0i * (1000 - GLF_live0i)) / 1000;
                                }
                            }
                            if (_GLF_DEAD(false)) {
                                _GLF_color = GLF_dead1_GLF_color;
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = vec4(9.2, 3626.5722, -2.6, -1239.2265);
                                }
                            }
                        }
                        if (_GLF_DEAD(false)) {
                            if (_GLF_DEAD(false)) {
                                _GLF_color = vec4(GLF_dead1stripe, -4570.0711, GLF_dead1stripe, GLF_dead1stripe);
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < determinant(mat4(_GLF_IDENTITY(0.0, float(mat4x2(0.0, 1.0, 0.0, sqrt(0.0), 0.0, 0.0, exp(0.0), 0.0))), 0.0, 0.0, 0.0, 1.0, 0.0, length(vec2(0.0, 0.0)), determinant(mat2(0.0, 0.0, 1.0, 0.0)), 1.0, 1.0, 0.0, 0.0, 1.0, _GLF_IDENTITY(1.0, max(1.0, 1.0)), 1.0, 0.0)))))) {
                                _GLF_color = tan(mix(vec4(-869.647, 8.2, 190.735, 9954.1722), vec4(-16.03, 72.83, -468.179, -1.5), equal(bvec4(true, true, true, true), bvec4(false, false, false, true))));
                            }
                            _GLF_color = round(mix(GLF_dead1_GLF_color, (-_GLF_color), -1009.6474));
                            if (_GLF_DEAD(false)) {
                                return;
                            }
                        }
                    }
                    return;
                }
                donor_replacementGLF_dead1col = mix(vec3(donor_replacementGLF_dead1uv.x, .8, 0), vec3(1, donor_replacementGLF_dead1uv.y, 0), GLF_dead1stripe);
                {
                    if (_GLF_DEAD(_GLF_IDENTITY(_GLF_FALSE(false, (gl_FragCoord.y < sqrt(0.0))), (_GLF_FALSE(false, (gl_FragCoord.y < sqrt(0.0)))) || _GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))))) {
                        int donor_replacementGLF_dead2j = _GLF_FUZZED(GLF_live0i);
                        {
                            GLF_dead1_GLF_color += texture(GLF_dead2tex, donor_replacementGLF_dead1uv + vec2(float(GLF_live0i - 1) * GLF_dead1stripe, float(donor_replacementGLF_dead2j - 1) * GLF_dead1stripe)) * GLF_dead2weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live0i * 3 + donor_replacementGLF_dead2j, 9)];
                        }
                    }
                    vec4 _GLF_outVarBackup_GLF_color;
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        _GLF_color = acos(_GLF_outVarBackup_GLF_color);
                    }
                    _GLF_IDENTITY(_GLF_outVarBackup_GLF_color = _GLF_color, (true ? _GLF_IDENTITY(_GLF_outVarBackup_GLF_color = _GLF_color, (_GLF_outVarBackup_GLF_color = _GLF_color) * vec4(1.0, 1.0, 1.0, 1.0)) : _GLF_FUZZED(_GLF_color)));
                    _GLF_color = vec4(-0.4, 8.9, -9.5, -6815.1138);
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                    {
                        {
                            ;
                        }
                    }
                }
                GLF_dead1_GLF_color = vec4(donor_replacementGLF_dead1col, 1.0);
                return;
                if (_GLF_DEAD(false)) {
                    if (_GLF_DEAD(false)) {
                        return;
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        _GLF_color = reflect(vec4(375.093, 387.984, 2883.4920, -390.500), GLF_dead1_GLF_color);
                    }
                    return;
                    if (_GLF_DEAD(_GLF_IDENTITY(false, true && (_GLF_IDENTITY(false, (false) || false))))) {
                        if (_GLF_DEAD(false)) {
                            for (int GLF_dead2i = 0; GLF_dead2i < 3; GLF_dead2i++) {
                                for (int GLF_dead2j = 0; GLF_dead2j < 3; GLF_dead2j++) {
                                    {
                                        vec2 GLF_live7v = _GLF_FUZZED((mat2(-48.73, -85.58, -48.00, 6.2) * vec2(1.9, 5234.9746)));
                                        if (length(GLF_live7v) < 0.001) {
                                            ;
                                        }
                                    }
                                    _GLF_color += texture(GLF_dead2tex, donor_replacementGLF_dead1uv + vec2(float(GLF_dead2i - 1) * GLF_dead1stripe, float(GLF_dead2j - 1) * GLF_dead1stripe)) * GLF_dead2weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead2i * 3 + GLF_dead2j, 9)];
                                }
                            }
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            return;
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                int donor_replacementGLF_dead2i = _GLF_FUZZED((GLF_live0i % GLF_live0iters));
                                for (int GLF_dead2j = 0; GLF_dead2j < 3; GLF_dead2j++) {
                                    _GLF_color += texture(GLF_dead2tex, donor_replacementGLF_dead1uv + vec2(float(donor_replacementGLF_dead2i - 1) * GLF_dead1stripe, float(GLF_dead2j - 1) * GLF_dead1stripe)) * GLF_dead2weights[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead2i * 3 + GLF_dead2j, 9)];
                                }
                            }
                        }
                        _GLF_color = mix(_GLF_color, GLF_dead1_GLF_color, bvec4(false, false, false, true));
                        {
                            int GLF_live8looplimiter5 = 0;
                            if (GLF_live8looplimiter5 >= 7) {
                                ;
                            }
                        }
                    }
                }
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < log(1.0))))) {
                _GLF_color = cos(vec4(8.9, 49.01, 98.98, 44.25));
            }
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            return;
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                _GLF_color = vec4(-16.23, 6.4, -29.35, -96.72);
            }
        }
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                _GLF_color = _GLF_color;
                if (_GLF_IDENTITY(_GLF_DEAD(false), false || (_GLF_IDENTITY(_GLF_DEAD(false), !(!(_GLF_DEAD(false))))))) {
                    mat4 donor_replacementGLF_dead4matrix_a = _GLF_FUZZED(matrixCompMult(mat4(mat4x2(-75.83, 5.4, 8957.7558, -68.18, 6.8, 9657.8923, -3.6, 531.329)), mat4(-99.95, -253.415, 101.034, 7.4, -9220.6320, 92.51, 14.23, -416.071, 7.6, -8115.0945, 1.4, -327.752, -7623.8143, 5006.8167, -41.73, 3.2)));
                    vec4 donor_replacementGLF_dead4matrix_b = _GLF_FUZZED(_GLF_color);
                    for (int GLF_dead4i = (GLF_dead4MATRIX_N - 1); _GLF_IDENTITY(GLF_dead4i >= 0, bool(bvec4(GLF_dead4i >= 0, true, true, false))); GLF_dead4i--) {
                        for (int GLF_dead4j = (GLF_dead4MATRIX_N - 1); GLF_dead4j >= (GLF_dead4i + 1); GLF_dead4j--) {
                            donor_replacementGLF_dead4matrix_b[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead4i, 4)] -= (donor_replacementGLF_dead4matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead4i, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead4j, 4)] * donor_replacementGLF_dead4matrix_b[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead4j, _GLF_IDENTITY(4, max(4, 4)))]);
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                _GLF_color = _GLF_color;
                            }
                        }
                        donor_replacementGLF_dead4matrix_b[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead4i, 4)] /= donor_replacementGLF_dead4matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead4i, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead4i, 4)];
                    }
                    if (_GLF_DEAD(false)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
            }
            {
                {
                    ;
                }
            }
            _GLF_color = fwidth(vec4(-6.9, -7.1, 5185.2900, _GLF_IDENTITY(86.12, (_GLF_IDENTITY(86.12, clamp(86.12, 86.12, 86.12))) / 1.0)));
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
                {
                    if (_GLF_DEAD(false)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = unpackSnorm4x8(_GLF_IDENTITY(packSnorm2x16(vec2(0.1, 6609.4188)), uint(_GLF_ZERO(0.0, injectionSwitch.x)) ^ (_GLF_IDENTITY(packSnorm2x16(vec2(0.1, 6609.4188)), max(packSnorm2x16(vec2(0.1, 6609.4188)), _GLF_IDENTITY(packSnorm2x16(vec2(0.1, 6609.4188)), max(packSnorm2x16(vec2(0.1, 6609.4188)), packSnorm2x16(vec2(0.1, 6609.4188)))))))));
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        _GLF_color = _GLF_color;
                    }
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            _GLF_color = (smoothstep(vec4(-1788.4249, -6.1, 4.6, 856.124), normalize(vec4(0.8, 47.97, -155.328, 4.6)), vec4(83.54, 0.4, 4.6, -85.01)) * mat4(mat3x4(702.484, 657.966, 422.245, -7.5, -9.1, -8.6, 67.00, -3258.9593, 9.4, 9.9, 5.7, -75.52)));
                        }
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
            }
        }
        int GLF_live0v = _GLF_FUZZED((false ? _GLF_IDENTITY((-55314), 0 + ((-55314))) : ivec2(14320, 44348).s));
        {
            if (_GLF_DEAD(false)) {
                _GLF_color = atanh(_GLF_color);
            }
            vec4 _GLF_outVarBackup_GLF_color;
            if (_GLF_DEAD(_GLF_IDENTITY(false, true && (false)))) {
                _GLF_color = vec4(injectionSwitch, resolution);
            }
            _GLF_outVarBackup_GLF_color = _GLF_color;
            if (_GLF_DEAD(false)) {
                _GLF_color = refract(_GLF_outVarBackup_GLF_color, _GLF_outVarBackup_GLF_color, clamp(-_GLF_IDENTITY(6.5, mix(float(_GLF_IDENTITY(_GLF_FUZZED(-70.09), clamp(_GLF_FUZZED(-70.09), _GLF_FUZZED(-70.09), _GLF_FUZZED(-70.09)))), float(6.5), bool(true))), 6.2, faceforward(9.3, 8.0, 9545.9164)));
                if (_GLF_DEAD(false)) {
                    _GLF_color = vec4(560.786);
                }
            }
            _GLF_color = smoothstep(tan(6.0), -0.5, vec4(-88.87, 6.8, 3.7, 20.63));
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(-468.564, -73.15, -6010.2463, 3.1);
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                    if (_GLF_DEAD(false)) {
                        _GLF_color = min(((-1.3) - GLF_dead1_GLF_color), -13.70);
                    }
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                if (_GLF_DEAD(_GLF_FALSE(false, (_GLF_IDENTITY(gl_FragCoord, vec4(gl_FragCoord[0], gl_FragCoord[1], gl_FragCoord[2], gl_FragCoord[3])).y < 0.0)))) {
                    _GLF_color = abs(exp2(vec4(-486.288, -6113.5117, 674.307, -391.344)));
                }
                _GLF_IDENTITY(_GLF_color = _GLF_outVarBackup_GLF_color, (true ? (_GLF_color = _GLF_outVarBackup_GLF_color) : _GLF_FUZZED(GLF_dead1_GLF_color)));
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(-2.3, 66.78, 486.875, 8117.6695);
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                    if (_GLF_DEAD(false)) {
                        if (_GLF_DEAD(false)) {
                            _GLF_color = _GLF_color;
                        }
                        return;
                    }
                }
            }
        }
        for (GLF_live0i = 0; GLF_live0i < GLF_live0iters; GLF_live0i++) {
            if (GLF_live0looplimiter0 >= 7) {
                if (_GLF_DEAD(false)) {
                    int donor_replacementGLF_dead5i = _GLF_FUZZED(-2741);
                    for (_GLF_IDENTITY(donor_replacementGLF_dead5i = 0, (donor_replacementGLF_dead5i = 0) >> (0 >> _GLF_IDENTITY(int(8), _GLF_IDENTITY(int(8), 0 ^ (int(8)))))); donor_replacementGLF_dead5i < GLF_live0looplimiter0; donor_replacementGLF_dead5i++) {
                        GLF_live0i = (4 * GLF_live0i * (1000 - GLF_live0i)) / 1000;
                    }
                }
                break;
                if (_GLF_IDENTITY(_GLF_DEAD(_GLF_IDENTITY(false, !(!(_GLF_IDENTITY(false, true && (false)))))), bool(bvec4(_GLF_DEAD(_GLF_IDENTITY(false, !(!(_GLF_IDENTITY(false, true && (false)))))), true, true, true)))) {
                    _GLF_color = GLF_dead1_GLF_color;
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_ZERO(0.0, injectionSwitch.x))))) {
                    if (_GLF_DEAD(false)) {
                        break;
                    }
                    vec2 donor_replacementGLF_dead2pos = _GLF_FUZZED(ldexp(injectionSwitch, ivec2(-74560, -74831)));
                    if (donor_replacementGLF_dead2pos.y < _GLF_color.y) {
                        ;
                    }
                    if (_GLF_DEAD(false)) {
                        if (_GLF_DEAD(false)) {
                            break;
                        }
                        _GLF_color = asin(_GLF_color);
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                            return;
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        float donor_replacementGLF_dead4alpha3 = _GLF_FUZZED(atanh(-2.7));
                        {
                            donor_replacementGLF_dead4alpha3 += _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_live0looplimiter0, 4)] * _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_live0looplimiter0, 4)];
                        }
                    }
                }
                {
                    int GLF_live8i = _GLF_FUZZED(37434);
                    int GLF_live8j = _GLF_FUZZED(47230);
                    int GLF_live8looplimiter8 = 0;
                    mat4 GLF_live8matrix_a = _GLF_FUZZED(mat4(mat3x2(7.0, -4.5, 3039.9302, -7.2, 0.3, 1.0)));
                    vec4 GLF_live8matrix_b = _GLF_FUZZED(vec4(4.3, 3.3, 870.455, 64.66));
                    {
                        if (GLF_live8looplimiter8 >= 7) {
                            ;
                        }
                        _GLF_IDENTITY(GLF_live8looplimiter8++, (GLF_live8looplimiter8++) << 0);
                        {
                            GLF_live8matrix_b[_GLF_MAKE_IN_BOUNDS_INT(GLF_live8i, 4)] -= (GLF_live8matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_live8i, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live8j, 4)] * GLF_live8matrix_b[_GLF_MAKE_IN_BOUNDS_INT(GLF_live8j, 4)]);
                        }
                        if (_GLF_DEAD(false)) {
                            _GLF_color = (vec3(-548.324, -9.0, 543.313) * mat4x3(-5.6, 97.61, -376.776, 64.80, 506.297, 7.4, 5.1, -8.7, -2719.2674, 4.4, 8.1, -99.01));
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        _GLF_color = _GLF_color;
                    }
                }
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                _GLF_color = (injectionSwitch * mat4x2(11.75, -14.14, 643.237, -2.8, 7.1, 9.9, -7.1, -991.408));
            }
            if (_GLF_DEAD(false)) {
                discard;
            }
            GLF_live0looplimiter0++;
            {
                GLF_live0v = (4 * GLF_live0v * (1000 - GLF_live0v)) / 1000;
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        _GLF_color = injectionSwitch.yxyy;
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            vec2 donor_replacementGLF_dead2coord = _GLF_FUZZED(vec2(_GLF_IDENTITY(-0.8, (true ? (-0.8) : _GLF_FUZZED(-6128.2365))), 9.5));
                            float donor_replacementGLF_dead2uvstep = _GLF_FUZZED(acos(8020.1062));
                            for (int GLF_dead2i = 0; GLF_dead2i < 3; GLF_dead2i++) {
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                    _GLF_color = _GLF_color;
                                }
                                for (int GLF_dead2j = 0; GLF_dead2j < 3; GLF_dead2j++) {
                                    _GLF_color += texture(GLF_dead2tex, donor_replacementGLF_dead2coord + vec2(float(GLF_dead2i - 1) * donor_replacementGLF_dead2uvstep, float(GLF_dead2j - 1) * donor_replacementGLF_dead2uvstep)) * GLF_dead2weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead2i * 3 + GLF_dead2j, 9)];
                                    {
                                        vec3 GLF_live5c = _GLF_FUZZED(vec3(7.9, -1.1, -703.119));
                                        int GLF_live5i = _GLF_FUZZED((+(-98330)));
                                        if (GLF_live5c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live5i, 3)] >= 1.0) {
                                            _GLF_IDENTITY(GLF_live5c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live5i, 3)] = GLF_live5c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live5i, 3)] * GLF_live5c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live5i, 3)], (GLF_live5c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live5i, 3)] = GLF_live5c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live5i, 3)] * GLF_live5c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live5i, 3)]) + 0.0);
                                        }
                                    }
                                }
                            }
                        }
                    }
                    _GLF_color = (-_GLF_color);
                }
                if (_GLF_DEAD(false)) {
                    return;
                    if (_GLF_DEAD(false)) {
                        _GLF_color = intBitsToFloat(ivec2(ivec4(40458, -9178, 63893, -45796))).ttst;
                    }
                }
                if (_GLF_DEAD(false)) {
                    _GLF_color = (-faceforward(clamp(_GLF_color, _GLF_color, GLF_dead1_GLF_color), GLF_dead1_GLF_color, fwidth(_GLF_color)));
                }
            }
            {
                int GLF_live5i = _GLF_FUZZED(((true ? 81805 : 65319) | 70486));
                float GLF_live5limit = _GLF_FUZZED(float(true));
                int GLF_live5looplimiter0 = 0;
                float GLF_live5result = _GLF_FUZZED((7.7 + (-62.22)));
                float GLF_live5thirty_two = _GLF_FUZZED(((1.3 - 94.29) - ((-904.478) + 405.520)));
                {
                    if (_GLF_IDENTITY(GLF_live5looplimiter0, (0 << _GLF_IDENTITY(int(0), int(0))) ^ (GLF_live5looplimiter0)) >= 3) {
                        ;
                    }
                    GLF_live5looplimiter0++;
                    {
                        if ((GLF_live5i % 32) == 0) {
                            GLF_live5result += 0.4;
                        } else {
                            if (mod(float(GLF_live5i), round(GLF_live5thirty_two)) <= 0.01) {
                                GLF_live5result += 100.0;
                            }
                        }
                        if (float(GLF_live5i) >= GLF_live5limit) {
                            ;
                        }
                    }
                }
            }
        }
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = vec4(-79.09, -22.96, -9.2, -9.7);
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                {
                    vec2 GLF_live7a = _GLF_FUZZED((-(vec2(-4.4, -17.94) * vec2(-1.6, 8.8))));
                    float GLF_live7z = _GLF_FUZZED(-38.47);
                    if (_GLF_DEAD(false)) {
                        _GLF_color = asin(smoothstep(_GLF_outVarBackup_GLF_color, (-GLF_dead1_GLF_color), vec4(-6008.1947, 4.4, -9628.4988, -7.9)));
                    }
                    {
                        GLF_live7z = GLF_live7a.y / GLF_live7a.x;
                    }
                }
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
        if (_GLF_DEAD(false)) {
            return;
        }
        {
            if (_GLF_DEAD(false)) {
                int donor_replacementGLF_dead5v = _GLF_FUZZED(int(false));
                if (_GLF_DEAD(false)) {
                    _GLF_color = atanh(vec4(9.1, -9.6, -3821.3278, 5.1));
                }
                for (GLF_live0iters = 0; GLF_live0iters < GLF_live0looplimiter0; GLF_live0iters++) {
                    donor_replacementGLF_dead5v = (4 * donor_replacementGLF_dead5v * (_GLF_IDENTITY(1000, (true ? 1000 : _GLF_FUZZED(GLF_live0iters))) - donor_replacementGLF_dead5v)) / 1000;
                }
            }
            vec4 _GLF_outVarBackup_GLF_color;
            if (_GLF_DEAD(false)) {
                _GLF_color = (8.9 * _GLF_color);
            }
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = vec4(11.69, -2252.5470, -15.02, -9.0);
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
    }
    for (int i = 0; i < 4; i++) {
        if (_GLF_DEAD(_GLF_IDENTITY(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)), bool(_GLF_IDENTITY(bvec3(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)), false, true), bvec3(bvec3(_GLF_IDENTITY(bvec3(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)), false, true), bvec3(bvec4(bvec3(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)), false, true), false)))))))))) {
            _GLF_color = _GLF_color;
        }
        for (int j = 0; j < 4; j++) {
            {
                vec4 _GLF_outVarBackup_GLF_color;
                if (_GLF_DEAD(false)) {
                    float donor_replacementGLF_dead4alpha3 = _GLF_FUZZED(-170.766);
                    mat4 donor_replacementGLF_dead4matrix_a = _GLF_FUZZED((mat4(8724.7037, 5728.7909, -5.4, 822.269, 817.502, 0.1, -1.1, -93.30, 9.8, -61.63, 956.460, -2679.7420, -5.5, -0.5, -27.89, -0.7) * mat4(-47.46, 3.0, -7.8, 296.938, -9.6, 5713.1715, 74.27, 1396.8661, -3453.5619, 7.2, 5.2, 6.2, 3985.2103, -9.1, 5232.4148, -84.50)));
                    for (int GLF_dead4a = GLF_dead4MATRIX_N - 1; GLF_dead4a >= j; GLF_dead4a--) {
                        donor_replacementGLF_dead4alpha3 += _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead4a, 4)] * donor_replacementGLF_dead4matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead4a, 4)][_GLF_MAKE_IN_BOUNDS_INT(j, 4)];
                    }
                }
                _GLF_outVarBackup_GLF_color = _GLF_color;
                if (_GLF_DEAD(false)) {
                    discard;
                }
                _GLF_color = vec4(176.441, -2310.6829, -41.01, 9.4);
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            if (_GLF_DEAD(_GLF_IDENTITY(false, false || (_GLF_IDENTITY(false, false || (false)))))) {
                vec2 donor_replacementGLF_dead2coord = _GLF_FUZZED(resolution);
                float donor_replacementGLF_dead2uvstep = _GLF_IDENTITY(_GLF_FUZZED(3022.6999), float(_GLF_IDENTITY(mat3x2(_GLF_FUZZED(3022.6999), 1.0, 1.0, round(length(normalize(vec2(1.0, 1.0)))), 0.0, round(length(normalize(vec2(1.0, 1.0))))), transpose(transpose(mat3x2(_GLF_FUZZED(3022.6999), 1.0, 1.0, round(length(normalize(vec2(1.0, 1.0)))), 0.0, round(length(normalize(vec2(1.0, 1.0))))))))));
                for (int GLF_dead2i = 0; GLF_dead2i < 3; GLF_dead2i++) {
                    for (int GLF_dead2j = 0; GLF_dead2j < 3; GLF_dead2j++) {
                        _GLF_color += texture(GLF_dead2tex, donor_replacementGLF_dead2coord + vec2(float(GLF_dead2i - 1) * donor_replacementGLF_dead2uvstep, float(GLF_dead2j - 1) * donor_replacementGLF_dead2uvstep)) * GLF_dead2weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead2i * 3 + GLF_dead2j, 9)];
                    }
                }
            }
            if (_GLF_DEAD(false)) {
                return;
            }
            if (_GLF_DEAD(false)) {
                return;
            }
            data[4 * j + i] = mand(gl_FragCoord.x + float(i - 1), gl_FragCoord.y + float(j - 1));
            if (_GLF_DEAD(false)) {
                if (_GLF_DEAD(false)) {
                    float donor_replacementGLF_dead4alpha3 = _GLF_FUZZED(3.8);
                    vec4 donor_replacementGLF_dead4matrix_b = _GLF_FUZZED(GLF_dead1_GLF_color.xwyy);
                    {
                        donor_replacementGLF_dead4alpha3 += _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(j, 4)] * donor_replacementGLF_dead4matrix_b[_GLF_MAKE_IN_BOUNDS_INT(j, 4)];
                    }
                }
                _GLF_color = _GLF_color;
            }
        }
    }
    {
        if (_GLF_DEAD(false)) {
            _GLF_color = (mat2x4(8569.3292, -353.564, -97.08, -6802.8168, -1254.8062, 894.124, -1.8, 3883.2576) * vec2(-6620.6245, 300.210));
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
            _GLF_color = _GLF_color;
        }
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_IDENTITY(_GLF_outVarBackup_GLF_color = _GLF_color, (_GLF_FALSE(false, (gl_FragCoord.x < length(vec4(0.0, 0.0, 0.0, 0.0)))) ? _GLF_FUZZED(vec4(vec2(-3494.1047, 8413.6292), 8603.0531, 776.387)) : (_GLF_outVarBackup_GLF_color = _GLF_color)));
        _GLF_color = dFdyCoarse(vec4(361.337, 1313.3893, 5.1, 42.29));
        if (_GLF_DEAD(false)) {
            return;
        }
        if (_GLF_DEAD(false)) {
            _GLF_color = GLF_dead1_GLF_color;
        }
        if (_GLF_DEAD(false)) {
            _GLF_color = vec4(atan(resolution), 16.08, 51.42);
        }
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                _GLF_color = mix(_GLF_outVarBackup_GLF_color, _GLF_color, -7.7);
            }
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                return;
            }
            _GLF_color = mod(_GLF_outVarBackup_GLF_color, 4.4);
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            vec2 donor_replacementGLF_dead2coord = _GLF_IDENTITY(_GLF_FUZZED(vec2(-76.26, _GLF_IDENTITY(51.71, clamp(_GLF_IDENTITY(51.71, (false ? _GLF_FUZZED(-4.1) : 51.71)), 51.71, 51.71)))), min(_GLF_FUZZED(vec2(-76.26, _GLF_IDENTITY(51.71, clamp(_GLF_IDENTITY(51.71, (false ? _GLF_FUZZED(-4.1) : 51.71)), 51.71, 51.71)))), _GLF_FUZZED(vec2(-76.26, _GLF_IDENTITY(51.71, clamp(_GLF_IDENTITY(51.71, (false ? _GLF_FUZZED(-4.1) : 51.71)), 51.71, 51.71))))));
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                _GLF_color = GLF_dead1_GLF_color;
            }
            int donor_replacementGLF_dead2i = _GLF_FUZZED(-75395);
            int donor_replacementGLF_dead2j = _GLF_FUZZED(-87727);
            if (_GLF_DEAD(false)) {
                _GLF_color = tan(_GLF_outVarBackup_GLF_color);
            }
            float donor_replacementGLF_dead2uvstep = _GLF_FUZZED(-48.47);
            {
                GLF_dead1_GLF_color += texture(GLF_dead2tex, donor_replacementGLF_dead2coord + vec2(float(donor_replacementGLF_dead2i - 1) * donor_replacementGLF_dead2uvstep, float(donor_replacementGLF_dead2j - 1) * donor_replacementGLF_dead2uvstep)) * _GLF_IDENTITY(GLF_dead2weights[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead2i * 3 + donor_replacementGLF_dead2j, 9)], max(GLF_dead2weights[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead2i * 3 + donor_replacementGLF_dead2j, 9)], GLF_dead2weights[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead2i * 3 + donor_replacementGLF_dead2j, 9)]));
            }
        }
        if (_GLF_DEAD(false)) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
    }
    if (_GLF_DEAD(false)) {
        if (_GLF_DEAD(false)) {
            if (_GLF_DEAD(false)) {
                _GLF_color = log2(GLF_dead1_GLF_color);
            }
            if (_GLF_DEAD(false)) {
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    _GLF_color = _GLF_color;
                }
                {
                    vec2 GLF_live6coord = _GLF_IDENTITY(_GLF_FUZZED(vec2(5.9, -2.5).yx), clamp(_GLF_IDENTITY(_GLF_FUZZED(vec2(5.9, -2.5).yx), (_GLF_IDENTITY(_GLF_FUZZED(vec2(5.9, -2.5).yx), (_GLF_FUZZED(vec2(5.9, -2.5).yx)) / vec2(1.0, 1.0))) * vec2(1.0, 1.0)), _GLF_IDENTITY(_GLF_FUZZED(vec2(5.9, -2.5).yx), clamp(_GLF_FUZZED(vec2(5.9, -2.5).yx), _GLF_FUZZED(vec2(5.9, -2.5).yx), _GLF_FUZZED(vec2(5.9, -2.5).yx))), _GLF_FUZZED(vec2(5.9, -2.5).yx)));
                    int GLF_live6i = _GLF_FUZZED((-(-50597)));
                    if (_GLF_DEAD(false)) {
                        _GLF_color = vec4(-678.134, 0.5, 7.6, -88.93);
                    }
                    int GLF_live6j = _GLF_FUZZED(61631);
                    int GLF_live6looplimiter0 = 0;
                    vec4 GLF_live6res = _GLF_FUZZED(((+vec4(-7084.9290, _GLF_IDENTITY(-4.5, mix(float(-4.5), float(_GLF_FUZZED(-8354.4212)), bool(false))), 711.934, -6.4)) * mat4(942.844, -1.5, 78.02, -2.9, -_GLF_IDENTITY(8972.6346, (false ? _GLF_FUZZED(-7761.6913) : 8972.6346)), 91.23, 76.22, 342.783, 798.608, 2.2, -9.0, 68.78, 316.328, -0.1, 7.1, 6.0)));
                    float GLF_live6uvstep = _GLF_FUZZED(vec2(-_GLF_IDENTITY(4.1, float(vec3(4.1, 0.0, 1.0))), -134.554).s);
                    {
                        if (GLF_live6looplimiter0 >= 7) {
                            ;
                        }
                        _GLF_IDENTITY(GLF_live6looplimiter0++, (GLF_live6looplimiter0++) * (1 | 1));
                        {
                            GLF_live6res += texture(GLF_live6tex, GLF_live6coord + vec2(float(GLF_live6i - 1) * GLF_live6uvstep, float(GLF_live6j - 1) * GLF_live6uvstep)) * GLF_live6weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6i * 3 + GLF_live6j, 9)];
                        }
                    }
                }
                return;
            }
            if (_GLF_DEAD(false)) {
                _GLF_color = vec4(-45.37, -864.625, -4.0, -92.90);
            }
            if (_GLF_DEAD(false)) {
                int donor_replacementGLF_dead5i = _GLF_FUZZED(-70688);
                int donor_replacementGLF_dead5iters = _GLF_FUZZED(10567);
                int donor_replacementGLF_dead5v = _GLF_FUZZED(_GLF_IDENTITY(-3514, ~(_GLF_IDENTITY(~(-3514), (~(-3514)) | (~(-3514))))));
                for (donor_replacementGLF_dead5i = 0; donor_replacementGLF_dead5i < donor_replacementGLF_dead5iters; donor_replacementGLF_dead5i++) {
                    donor_replacementGLF_dead5v = (4 * donor_replacementGLF_dead5v * (1000 - donor_replacementGLF_dead5v)) / 1000;
                }
            }
            _GLF_color = fma(GLF_dead1_GLF_color, cos(_GLF_color), vec4(8.1, -9910.0863, 54.70, 42.06));
        }
        if (_GLF_DEAD(_GLF_IDENTITY(false, !(!(false))))) {
            return;
        }
        if (_GLF_DEAD(false)) {
            int donor_replacementGLF_dead5v = _GLF_FUZZED(-37839);
            {
                donor_replacementGLF_dead5v = (4 * donor_replacementGLF_dead5v * (1000 - donor_replacementGLF_dead5v)) / 1000;
                {
                    int GLF_live6looplimiter1 = 0;
                    if (GLF_live6looplimiter1 >= 7) {
                        ;
                    }
                    if (_GLF_DEAD(false)) {
                        _GLF_color = GLF_dead1_GLF_color;
                    }
                }
            }
            {
                int GLF_live8a = _GLF_FUZZED(int(true));
                float GLF_live8alpha3 = _GLF_FUZZED(vec3(5.3, 680.654, -9132.0784).ttpp.r);
                int GLF_live8j = _GLF_FUZZED(((-72513) * (~56150)));
                int GLF_live8looplimiter2 = 0;
                mat4 GLF_live8matrix_a = _GLF_FUZZED((mat2x4(-3.9, 986.220, 1619.0935, -3.0, 99.65, 1.9, -681.572, 30.73) * mat4x2(-4988.1148, -_GLF_IDENTITY(8.3, (8.3) / round(length(normalize(vec2(1.0, 1.0))))), 9.9, 15.90, 47.78, 2.5, 6515.5653, -4.8)));
                vec4 GLF_live8matrix_u = _GLF_FUZZED(vec4(-8.2, -838.095, 6.6, -9.5));
                {
                    if (GLF_live8looplimiter2 >= 7) {
                        ;
                    }
                    GLF_live8looplimiter2++;
                    {
                        if (_GLF_DEAD(false)) {
                            _GLF_color = ((-5694.6797) - GLF_live8matrix_u);
                        }
                        GLF_live8alpha3 += GLF_live8matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_live8a, 4)] * GLF_live8matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_live8a, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live8j, 4)];
                    }
                }
            }
        }
        return;
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < length(sin(vec4(0.0, 0.0, 0.0, 0.0))))))) {
            return;
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            _GLF_color = degrees(GLF_dead1_GLF_color);
            if (_GLF_DEAD(false)) {
                _GLF_color = vec4(1291.0665, -3.0, 1195.3586, 6982.5538);
            }
            {
                if (_GLF_DEAD(false)) {
                    if (_GLF_DEAD(_GLF_IDENTITY(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)), true && (_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))))) {
                        return;
                    }
                    _GLF_color = vec4(-36.37, -893.429, -8161.4726, 55.11);
                    if (_GLF_DEAD(false)) {
                        _GLF_color = (vec4(-64.53, -8.2, -91.53, -2.4) * mat4(-6.7, -442.728, 7.6, -1.8, 2.1, 6.4, 17.76, -1.1, -108.811, 546.253, -18.08, -8.9, -1.6, 6043.5972, 76.24, 856.215));
                    }
                    if (_GLF_DEAD(false)) {
                        return;
                    }
                }
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(1060.2209, -8.9, 9.2, -3174.1296);
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= sqrt(0.0))))) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
        }
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = (_GLF_IDENTITY((mat3x4((mat2x4(795.763, 5440.1330, 703.547, 651.182, 7.1, -481.204, -9063.0737, 9854.7433) / 49.64)), vec4(0.0, 2.4, -254.850, -8413.7556)), min((mat3x4((mat2x4(795.763, 5440.1330, 703.547, 651.182, 7.1, -481.204, -9063.0737, 9854.7433) / 49.64)), vec4(0.0, 2.4, -254.850, -8413.7556)), _GLF_IDENTITY((mat3x4((mat2x4(795.763, 5440.1330, 703.547, 651.182, 7.1, -481.204, -9063.0737, 9854.7433) / 49.64)), vec4(0.0, 2.4, -254.850, -8413.7556)), clamp((mat3x4((mat2x4(795.763, 5440.1330, 703.547, 651.182, 7.1, -481.204, -9063.0737, 9854.7433) / 49.64)), vec4(0.0, 2.4, -254.850, -8413.7556)), (mat3x4((mat2x4(795.763, 5440.1330, 703.547, 651.182, 7.1, -481.204, -9063.0737, 9854.7433) / 49.64)), vec4(0.0, 2.4, -254.850, -8413.7556)), (mat3x4((mat2x4(795.763, 5440.1330, 703.547, 651.182, 7.1, -481.204, -9063.0737, 9854.7433) / 49.64)), vec4(0.0, 2.4, -254.850, -8413.7556)))))));
            if (_GLF_DEAD(false)) {
                _GLF_color = GLF_dead1_GLF_color;
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < log(determinant(mat3(1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0))))))) {
                if (_GLF_DEAD(false)) {
                    return;
                }
                {
                    int GLF_live6looplimiter0 = 0;
                    if (GLF_live6looplimiter0 >= 7) {
                        ;
                    }
                }
                _GLF_color = sin(vec4(-7349.9964, 5399.7818, -291.929, -_GLF_IDENTITY(7.5, max(7.5, 7.5))));
            }
            if (_GLF_DEAD(false)) {
                int donor_replacementGLF_dead5v = _GLF_FUZZED((51453 | (-63563)));
                {
                    donor_replacementGLF_dead5v = (4 * donor_replacementGLF_dead5v * (1000 - donor_replacementGLF_dead5v)) / _GLF_IDENTITY(1000, min(_GLF_IDENTITY(1000, (1000) >> 0), 1000));
                }
            }
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
                {
                    vec3 GLF_live5c = _GLF_FUZZED(vec3(81.55, 239.393, -1.0));
                    int GLF_live5i = _GLF_FUZZED(19541);
                    int GLF_live5looplimiter1 = 0;
                    {
                        if (GLF_live5looplimiter1 >= 3) {
                            ;
                        }
                        GLF_live5looplimiter1++;
                        {
                            if (GLF_live5c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live5i, 3)] >= _GLF_IDENTITY(1.0, (1.0) + determinant(mat3(0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0)))) {
                                GLF_live5c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live5i, 3)] = GLF_live5c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live5i, 3)] * GLF_live5c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live5i, 3)];
                            }
                        }
                    }
                }
            }
        }
        if (_GLF_DEAD(false)) {
            _GLF_color = radians(_GLF_color);
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                _GLF_color = vec4(393.081, -150.800, 7.1, 381.164);
            }
        }
        if (_GLF_DEAD(false)) {
            {
                float GLF_live7th = _GLF_FUZZED((true ? _GLF_IDENTITY(82.09, max(_GLF_IDENTITY(82.09, min(82.09, 82.09)), _GLF_IDENTITY(82.09, min(82.09, 82.09)))) : (-91.96)));
                if (_GLF_DEAD(false)) {
                    _GLF_color = fwidth(_GLF_color);
                }
                {
                    GLF_live7th = 1.0 - GLF_live7th;
                }
            }
            return;
        }
    }
    vec3 sum = vec3(0.0);
    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
        vec2 donor_replacementGLF_dead2coord = _GLF_FUZZED((vec2(-1.1, -782.793) - (-_GLF_IDENTITY(8.1, max(_GLF_IDENTITY(8.1, (_GLF_IDENTITY(8.1, (8.1) + 0.0)) - 0.0), 8.1)))));
        int donor_replacementGLF_dead2i = _GLF_FUZZED(int(-97.39));
        float donor_replacementGLF_dead2uvstep = _GLF_FUZZED(refract(45.82, 8.7, 380.362));
        for (int GLF_dead2j = 0; GLF_dead2j < 3; GLF_dead2j++) {
            _GLF_color += texture(GLF_dead2tex, donor_replacementGLF_dead2coord + vec2(float(donor_replacementGLF_dead2i - 1) * donor_replacementGLF_dead2uvstep, float(GLF_dead2j - 1) * donor_replacementGLF_dead2uvstep)) * GLF_dead2weights[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead2i * 3 + GLF_dead2j, 9)];
        }
    }
    for (int i = 0; _GLF_IDENTITY(i, (i) ^ 0) < 16; i++) {
        sum += data[i];
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < determinant(mat4(abs(0.0), 1.0, sqrt(1.0), sin(0.0), 0.0, 0.0, 0.0, sqrt(1.0), 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0)))))) {
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < sqrt(0.0))))) {
                if (_GLF_DEAD(false)) {
                    {
                        i = (4 * i * (_GLF_IDENTITY(1000 - i, 0 | (1000 - i)))) / 1000;
                    }
                }
                _GLF_color = _GLF_color;
            }
            return;
        }
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            if (_GLF_DEAD(false)) {
                _GLF_color = (GLF_dead1_GLF_color.r * GLF_dead1_GLF_color);
            }
            vec2 donor_replacementGLF_dead2coord = _GLF_FUZZED(vec2(591.857, -3.7));
            int donor_replacementGLF_dead2i = _GLF_FUZZED(34615);
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                _GLF_color = GLF_dead1_GLF_color;
            }
            float donor_replacementGLF_dead2uvstep = _GLF_FUZZED(dFdx(4119.4979));
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                _GLF_color = _GLF_color;
            }
            {
                if (_GLF_DEAD(false)) {
                    _GLF_color = (GLF_dead1_GLF_color + 3.3);
                }
                for (int GLF_dead2j = 0; GLF_dead2j < 3; GLF_dead2j++) {
                    GLF_dead1_GLF_color += texture(GLF_dead2tex, donor_replacementGLF_dead2coord + vec2(float(donor_replacementGLF_dead2i - 1) * donor_replacementGLF_dead2uvstep, float(GLF_dead2j - 1) * donor_replacementGLF_dead2uvstep)) * GLF_dead2weights[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead2i * 3 + GLF_dead2j, 9)];
                }
            }
        }
        {
            vec3 GLF_live5c = _GLF_FUZZED(vec3(-4.3, 14.00, -4437.7783));
            int GLF_live5i = _GLF_FUZZED((24789 * 5378));
            int GLF_live5looplimiter1 = 0;
            {
                if (GLF_live5looplimiter1 >= 3) {
                    ;
                }
                GLF_live5looplimiter1++;
                {
                    if (GLF_live5c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live5i, 3)] >= 1.0) {
                        GLF_live5c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live5i, 3)] = GLF_live5c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live5i, 3)] * GLF_live5c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live5i, 3)];
                    }
                }
            }
        }
        if (_GLF_DEAD(false)) {
            {
                int GLF_live5i = _GLF_FUZZED(-29580);
                float GLF_live5result = _GLF_FUZZED(-69.17);
                float GLF_live5thirty_two = _GLF_FUZZED(9.8);
                {
                    if (mod(float(GLF_live5i), round(GLF_live5thirty_two)) <= 0.01) {
                        GLF_live5result += 100.0;
                    }
                }
            }
            _GLF_color = vec2(-7.9, 4063.8372).xxyx;
        }
        if (_GLF_DEAD(false)) {
            _GLF_color = (vec3(633.305, -8.3, 669.222) * mat4x3(-2267.6552, 7977.0106, 3035.4174, 5.3, -37.22, 2100.8499, -7.6, 41.52, -8501.9862, 9.6, -2.4, -175.502));
        }
        _GLF_color = GLF_dead1_GLF_color;
    }
    {
        vec4 _GLF_outVarBackup_GLF_color;
        {
            float GLF_live8alpha1 = _GLF_FUZZED(float(76248u));
            int GLF_live8k = _GLF_FUZZED(-31496);
            int GLF_live8looplimiter1 = 0;
            vec4 GLF_live8matrix_u = _GLF_FUZZED(vec4((vec2(8189.4392, -5422.2489) - vec2(5993.5662, 99.83)), vec2(-4.9, -_GLF_IDENTITY(1944.6999, max(1944.6999, _GLF_IDENTITY(1944.6999, (false ? _GLF_FUZZED(-2138.0378) : 1944.6999)))))));
            for (int GLF_live8u = _GLF_IDENTITY(GLF_live8MATRIX_N - 1, (GLF_live8MATRIX_N - 1) | (_GLF_IDENTITY(GLF_live8MATRIX_N - 1, min(GLF_live8MATRIX_N - 1, GLF_live8MATRIX_N - 1)))); _GLF_IDENTITY(GLF_live8u >= GLF_live8k, !(_GLF_IDENTITY(!(GLF_live8u >= GLF_live8k), true && (!(GLF_live8u >= GLF_live8k))))); GLF_live8u--) {
                if (GLF_live8looplimiter1 >= 7) {
                    if (_GLF_DEAD(false)) {
                        _GLF_color = fwidth(_GLF_color);
                    }
                    break;
                }
                GLF_live8looplimiter1++;
                {
                    GLF_live8alpha1 += pow(GLF_live8matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_live8u, 4)], 2.0);
                }
            }
        }
        _GLF_outVarBackup_GLF_color = _GLF_color;
        _GLF_color = vec4(-313.544, -5.4, 7.4, _GLF_IDENTITY(-78.07, (_GLF_IDENTITY(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)), !(!(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0))))) ? _GLF_IDENTITY(-78.07, clamp(-_GLF_IDENTITY(78.07, (78.07) * 1.0), -78.07, -78.07)) : _GLF_FUZZED(distance(sum, sum)))));
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
    }
    sum /= _GLF_IDENTITY(vec3(16.0), (true ? vec3(16.0) : _GLF_FUZZED(sum)));
    _GLF_color = vec4(sum, 1.0);
    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
        _GLF_color = GLF_dead1_GLF_color;
    }
}
