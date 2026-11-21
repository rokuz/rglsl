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
    vec2 injectionSwitch;
};

vec4 GLF_live9gl_FragCoord = _GLF_FUZZED(vec4(-7.1, -7256.7702, -7.2, 9.3));

layout(set = 0, binding = 3) uniform buf3 {
    vec2 GLF_live9injectionSwitch;
};

layout(set = 0, binding = 4) uniform buf4 {
    vec2 GLF_live11resolution;
};

ivec2 GLF_live10iter(ivec2 GLF_live10p) {
    if (GLF_live10p.x > 0) {
        GLF_live10p.y--;
    }
    if (GLF_live10p.x < 0) {
        GLF_live10p.y++;
    }
    GLF_live10p.x += GLF_live10p.y / 2;
    return GLF_live10p;
}

int GLF_live4msb8 = 256;

layout(set = 0, binding = 5) uniform buf5 {
    vec2 GLF_live6resolution;
};

layout(set = 0, binding = 6) uniform buf6 {
    float GLF_live7time;
};

float GLF_live7h_r = _GLF_FUZZED(3146.9475);
float GLF_live7s_g = _GLF_FUZZED(-9.1);
float GLF_live7b_b = _GLF_FUZZED((-2.7));

void GLF_live7doConvert() {
    vec3 GLF_live7temp = _GLF_FUZZED(dFdyFine(vec3(2.4, -793.373, 1.4)));
    GLF_live7temp = GLF_live7b_b * (1.0 - GLF_live7s_g) + (GLF_live7b_b - GLF_live7b_b * (1.0 - GLF_live7s_g)) * clamp(abs(abs(6.0 * (GLF_live7h_r - vec3(0, 1, 2) / 3.0)) - 3.0) - 1.0, 0.0, 1.0);
    GLF_live7h_r = GLF_live7temp.x;
    GLF_live7s_g = GLF_live7temp.y;
    GLF_live7b_b = GLF_live7temp.z;
}

vec3 GLF_live7computeColor(float GLF_live7c, vec2 GLF_live7position) {
    if (_GLF_WRAPPED_IF_FALSE(false)) {
    } else {
        GLF_live7h_r = fract(GLF_live7c);
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
        return vec3(1.0, 1.0, 1.0);
    }
    GLF_live7s_g = 1.0;
    GLF_live7b_b = (0.5 + (sin(GLF_live7time) * 0.5 + 0.5));
    {
        int GLF_live8looplimiter0 = 0;
        int GLF_live8v = _GLF_FUZZED(ivec2(-73541, 26222).y);
        {
            if (GLF_live8looplimiter0 >= 7) {
                ;
            }
            GLF_live8looplimiter0++;
            {
                GLF_live8v = (4 * GLF_live8v * (1000 - GLF_live8v)) / 1000;
            }
        }
    }
    if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
    } else {
        GLF_live7doConvert();
    }
    GLF_live7s_g *= 1.0 / GLF_live7position.y;
    GLF_live7h_r *= 1.0 / GLF_live7position.x;
    if (abs(GLF_live7position.y - GLF_live7position.x) < 0.5) {
        GLF_live7b_b = clamp(0.0, 1.0, GLF_live7b_b * 3.0);
    }
    return vec3(GLF_live7h_r, GLF_live7s_g, GLF_live7b_b);
}

vec3 GLF_live7defaultColor() {
    return vec3(0.0);
}

vec3 GLF_live7drawShape(vec2 GLF_live7pos, vec2 GLF_live7square, vec3 GLF_live7setting) {
    bool GLF_live7c1 = GLF_live7pos.x - GLF_live7setting.x < GLF_live7square.x;
    if (!GLF_live7c1) {
        return GLF_live7defaultColor();
    }
    bool GLF_live7c2 = GLF_live7pos.x + GLF_live7setting.x > GLF_live7square.x;
    if (!GLF_live7c2) {
        {
            int GLF_live9l = _GLF_FUZZED((80677 & (-(+(-43182)))));
            int GLF_live9m = _GLF_FUZZED(ivec4(-95969, 2174, 37531, -26214).x);
            {
                GLF_live9l = GLF_live9m + 1;
            }
        }
        return GLF_live7defaultColor();
    }
    bool GLF_live7c3 = GLF_live7pos.y - GLF_live7setting.x < GLF_live7square.y;
    if (!GLF_live7c3) {
        return GLF_live7defaultColor();
        {
            int GLF_live10looplimiter1 = 0;
            ivec2 GLF_live10p = _GLF_FUZZED(ivec2(80009, 99670));
            while (GLF_live10p.x > 15) {
                if (GLF_live10looplimiter1 >= 7) {
                    break;
                }
                GLF_live10looplimiter1++;
                {
                    GLF_live10p.x -= 16;
                }
            }
        }
    }
    bool GLF_live7c4 = GLF_live7pos.y + GLF_live7setting.x > GLF_live7square.y;
    if (!GLF_live7c4) {
        return GLF_live7defaultColor();
        {
            int GLF_live8i = _GLF_FUZZED((+88959));
            int GLF_live8iters = _GLF_FUZZED((~(-81498)));
            int GLF_live8looplimiter0 = 0;
            int GLF_live8v = _GLF_FUZZED(-75114);
            for (GLF_live8i = 0; GLF_live8i < GLF_live8iters; GLF_live8i++) {
                if (GLF_live8looplimiter0 >= 7) {
                    break;
                }
                GLF_live8looplimiter0++;
                {
                    GLF_live8v = (4 * GLF_live8v * (1000 - GLF_live8v)) / 1000;
                }
            }
        }
    }
    bool GLF_live7c5 = GLF_live7pos.x - (GLF_live7setting.x - GLF_live7setting.y) < GLF_live7square.x;
    if (!GLF_live7c5) {
        return GLF_live7computeColor(GLF_live7setting.z / 40.0, GLF_live7pos);
    }
    {
        {
            ;
        }
    }
    bool GLF_live7c6 = GLF_live7pos.x + (GLF_live7setting.x - GLF_live7setting.y) > GLF_live7square.x;
    if (!GLF_live7c6) {
        return GLF_live7computeColor(GLF_live7setting.z / 40.0, GLF_live7pos);
    }
    bool GLF_live7c7 = GLF_live7pos.y - (GLF_live7setting.x - GLF_live7setting.y) < GLF_live7square.y;
    if (!GLF_live7c7) {
        if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < determinant(mat2(0.0, log(1.0), abs(0.0), 0.0)))))) {
        } else {
            return GLF_live7computeColor(GLF_live7setting.z / 40.0, GLF_live7pos);
        }
    }
    bool GLF_live7c8 = GLF_live7pos.y + (GLF_live7setting.x - GLF_live7setting.y) > GLF_live7square.y;
    if (!GLF_live7c8) {
        return GLF_live7computeColor(GLF_live7setting.z / 40.0, GLF_live7pos);
    }
    return GLF_live7defaultColor();
}

vec4 GLF_live3_GLF_color = _GLF_FUZZED((vec4(-89.01, -3.2, -4094.4561, -9.6) - vec4(0.8, 934.761, 273.112, -305.967)));
layout(location = 0) out vec4 _GLF_color;

layout(set = 0, binding = 0) uniform buf0 {
    float time;
};

layout(set = 0, binding = 1) uniform buf1 {
    vec2 resolution;
};

float h_r;
float s_g;
float b_b;

void doConvert() {
    {
        if (_GLF_DEAD(false)) {
            return;
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(545.634, -912.510, -927.064, -46.25);
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
        }
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = vec4(-8.1, -25.52, -0.8, 3.8);
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
        {
            {
                ;
            }
        }
        float GLF_live4s = _GLF_FUZZED(5.7);
        {
            ;
        }
    }
    int msb8 = 256;
    vec3 temp;
    {
        {
            {
                ;
                if (_GLF_DEAD(false)) {
                    return;
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(-5154.6113, 8115.2380, 6.1, 7.0);
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                }
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(6751.1451, 24.20, 466.844, -41.63);
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
            }
        }
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        {
            vec4 _GLF_outVarBackup_GLF_color;
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(-333.345, -626.036, -4.1, 0.9);
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            _GLF_outVarBackup_GLF_color = _GLF_color;
            {
                vec2 GLF_live7position = _GLF_FUZZED(vec2(6.3, -9407.8140));
                if (abs(GLF_live7position.y - GLF_live7position.x) < 0.5) {
                    GLF_live7b_b = clamp(0.0, 1.0, GLF_live7b_b * 3.0);
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(8.1, -8.4, -5.0, -213.265);
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    return;
                }
            }
            _GLF_color = vec4(-6606.2764, -9.5, 985.078, 67.83);
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= sqrt(0.0))))) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
        {
            int GLF_live8looplimiter0 = 0;
            int GLF_live8v = _GLF_FUZZED(((-1064) & ((-52858) & (-23526))));
            {
                if (GLF_live8looplimiter0 >= 7) {
                    ;
                }
                GLF_live8looplimiter0++;
                {
                    GLF_live8v = (4 * GLF_live8v * (1000 - GLF_live8v)) / 1000;
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(13.91, -4.5, 3.2, -0.0);
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                }
            }
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = sign(vec4(205.563, 86.79, -384.144, 5.8));
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= sqrt(0.0))))) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
        }
        _GLF_color = smoothstep(vec4(1406.8378, -1.5, 1.5, 6360.9633), vec4(-473.234, -3430.8634, -3.5, -2.7), unpackUnorm4x8(max(1425u, 21485u)));
        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= determinant(mat2(0.0, 0.0, 0.0, 0.0)))))) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
        {
            {
                int GLF_live10looplimiter1 = 0;
                if (GLF_live10looplimiter1 >= 7) {
                    ;
                }
            }
            vec4 _GLF_outVarBackup_GLF_color;
            {
                vec4 GLF_live4c = _GLF_FUZZED(vec4(4.5, 0.8, 3.7, -1.8));
                int GLF_live4i = _GLF_FUZZED(77536);
                int GLF_live4looplimiter1 = 0;
                {
                    if (GLF_live4looplimiter1 >= 3) {
                        ;
                        {
                            int GLF_live8i = _GLF_FUZZED(-70088);
                            int GLF_live8iters = _GLF_FUZZED(-86179);
                            int GLF_live8looplimiter0 = 0;
                            int GLF_live8v = _GLF_FUZZED(((99636 + 18164)));
                            for (GLF_live8i = 0; GLF_live8i < GLF_live8iters; GLF_live8i++) {
                                if (GLF_live8looplimiter0 >= 7) {
                                    break;
                                }
                                GLF_live8looplimiter0++;
                                {
                                    GLF_live8v = (4 * GLF_live8v * (1000 - GLF_live8v)) / 1000;
                                }
                            }
                        }
                    }
                    GLF_live4looplimiter1++;
                    {
                        if (GLF_live4c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live4i, 4)] >= 1.0) {
                            GLF_live4c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live4i, 4)] = GLF_live4c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live4i, 4)] * GLF_live4c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live4i, 4)];
                            {
                                {
                                    ;
                                }
                            }
                        }
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = vec4(946.546, -6.5, 9204.5921, 6.2);
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(true, (true) && true))) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                        GLF_live4i++;
                    }
                }
            }
            {
                ivec2 GLF_live10p = _GLF_FUZZED(ivec2(92356, -8339));
                {
                    GLF_live10p.y++;
                }
            }
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = vec4(vec3(-6.6, -38.22, -1138.2445), 4.2);
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(-2.9, 5.4, 41.96, -85.36);
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
    }
    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
        temp = b_b * (float(bitCount(msb8)) - s_g) + (b_b - b_b * (float(bitCount(msb8)) - s_g)) * clamp(abs(abs(6.0 * (h_r - vec3(bitfieldReverse(0), bitCount(msb8), 2) / 3.0)) - 3.0) - float(bitCount(msb8)), float(bitfieldExtract(int(resolution.x), 0, 0)), float(bitCount(int(resolution.x))));
    } else {
    }
    if (_GLF_DEAD(false)) {
        return;
        {
            {
                ;
            }
        }
    }
    {
        int GLF_live4i = _GLF_FUZZED(ivec2(-13226, 89988).r);
        float GLF_live4limit = _GLF_FUZZED(float(27184));
        float GLF_live4ref = _GLF_FUZZED(6056.4276);
        float GLF_live4s = _GLF_FUZZED(-800.312);
        {
            int GLF_live4looplimiter0 = 0;
            while (GLF_live4i < bitfieldInsert(800, GLF_live4i, 0, 0)) {
                if (GLF_live4looplimiter0 >= 3) {
                    break;
                }
                GLF_live4looplimiter0++;
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(297.078, -16.89, 9402.3036, -492.063);
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                {
                    if (mod(float(GLF_live4i), GLF_live4ref) <= 0.01) {
                        {
                            {
                                ;
                            }
                        }
                        GLF_live4s += 0.2;
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = vec4(-357.014, 9.6, 865.006, -5311.6495);
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= determinant(mat2(0.0, 0.0, 0.0, 0.0)))))) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                    }
                    if (float(GLF_live4i) >= GLF_live4limit) {
                        ;
                        {
                            int GLF_live10i = _GLF_FUZZED(-26572);
                            int GLF_live10looplimiter0 = 0;
                            ivec2 GLF_live10p = _GLF_FUZZED((((-55912) - (-10174)) - (ivec2(-84585, 99763) * ivec2(15324, 67501))));
                            for (GLF_live10i = 0; GLF_live10i < 100; GLF_live10i++) {
                                if (GLF_live10looplimiter0 >= 7) {
                                    break;
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        _GLF_color = (vec4(-1526.0631, 8.9, -8873.5323, 3.1) * log2(vec4(-3768.9479, 4.5, -9.9, -1784.8815)));
                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                    }
                                }
                                GLF_live10looplimiter0++;
                                {
                                    GLF_live10p = GLF_live10iter(GLF_live10p);
                                }
                            }
                        }
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = dFdxFine(vec4(-0.4, -6294.0171, -4.3, 5.8));
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= tan(0.0))))) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                    }
                    {
                        int GLF_live9a = _GLF_FUZZED(int(true));
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = vec4(-3.9, -4.4, -5.0, 6.0);
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                        int GLF_live9b = _GLF_FUZZED(ivec4(-76492, 92841, 66629, -6077).t);
                        vec2 GLF_live9uv = _GLF_FUZZED(vec2((2.8 + 7171.1337), -7.9));
                        {
                            GLF_live9uv.y -= step(GLF_live9injectionSwitch.y, GLF_live9uv.x) + float(GLF_live9a);
                            GLF_live9uv.x *= (isnan(GLF_live9uv.y) ? cosh(GLF_live9gl_FragCoord.y) : tanh(GLF_live9gl_FragCoord.x));
                            GLF_live9b--;
                        }
                    }
                    GLF_live4i++;
                }
            }
            {
                int GLF_live11looplimiter0 = 0;
                if (GLF_live11looplimiter0 >= 7) {
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = ((-1.2) + vec4(-0.0, 3.2, 7.7, 8.0));
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    ;
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = max(vec4(-3834.2350, 9.0, -55.48, 0.9), max(-6.3, -93.55));
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                }
            }
        }
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = vec4(-82.72, -8.8, -2.2, 20.11);
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
    }
    h_r = temp.x;
    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
        {
            vec4 _GLF_outVarBackup_GLF_color;
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                _GLF_outVarBackup_GLF_color = _GLF_color;
            } else {
            }
            _GLF_color = vec4(-7.2, 7.0, 74.72, -3596.2133);
            {
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = atan(vec4(-26.22, -301.076, -0.7, 478.152), vec4(-9.5, -327.892, -72.57, 9.8));
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                int GLF_live9a = _GLF_FUZZED(56507);
                int GLF_live9b = _GLF_FUZZED(-37393);
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(8943.3479, -254.765, -855.657, 857.447);
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(true, (true) && true))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                int GLF_live9c = _GLF_FUZZED(10796);
                vec2 GLF_live9uv = _GLF_FUZZED(vec2(-8.6, 3.2));
                {
                    GLF_live9uv.y -= step(GLF_live9injectionSwitch.y, GLF_live9uv.x) + float(GLF_live9a) + float(GLF_live9b);
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = (vec2(-7.4, -7943.2095) * mat4x2(-1.1, 636.247, 88.00, -29.12, -8.2, -302.178, -81.04, 0.1));
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    GLF_live9uv.x += ldexp(GLF_live9injectionSwitch.y, isinf(GLF_live9uv.y + GLF_live9uv.x) ? findMSB(GLF_live9b) : findMSB(GLF_live9a));
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = exp(vec4(-5.6, -2.5, -4.1, 8.3));
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    GLF_live9c--;
                }
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                return;
            }
            {
                {
                    ;
                }
            }
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
            {
                vec2 GLF_live7position = _GLF_FUZZED(vec2(1.4, -30.06));
                if (abs(GLF_live7position.y - GLF_live7position.x) < 0.5) {
                    GLF_live7b_b = clamp(0.0, 1.0, GLF_live7b_b * 3.0);
                }
            }
            {
                int GLF_live9a = _GLF_FUZZED(-65480);
                int GLF_live9b = _GLF_FUZZED((true ? (-55310) : (-53252)));
                int GLF_live9c = _GLF_FUZZED(int(true));
                int GLF_live9d = _GLF_FUZZED(ivec4(37489, -82479, -42223, 58463).arga.y);
                int GLF_live9looplimiter3 = 0;
                vec2 GLF_live9uv = _GLF_FUZZED(vec2(80.62, 6300.3372));
                do {
                    if (GLF_live9looplimiter3 >= 5) {
                        break;
                    }
                    GLF_live9looplimiter3++;
                    {
                        GLF_live9uv.y -= step(GLF_live9injectionSwitch.y, GLF_live9uv.x) + float(GLF_live9a) + float(GLF_live9b) + float(GLF_live9c);
                        GLF_live9d--;
                    }
                } while (GLF_live9d > int(GLF_live9injectionSwitch.x));
            }
        }
        return;
    }
    {
        float GLF_live0c_im = _GLF_FUZZED(-8.1);
        {
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(364.418, -2894.7116, 27.68, -49.42);
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            {
                ;
            }
        }
        float GLF_live0c_re = _GLF_FUZZED(8.9);
        int GLF_live0iteration = _GLF_FUZZED(((-81830) + 5145));
        int GLF_live0k = _GLF_FUZZED(92431);
        float GLF_live0x = _GLF_FUZZED(-7265.6649);
        {
            vec4 GLF_live4c = _GLF_FUZZED(vec4(-724.837, -973.923, -0.7, 0.3));
            int GLF_live4i = _GLF_FUZZED(((-42930) | int(80559u)));
            int GLF_live4looplimiter1 = 0;
            {
                if (GLF_live4looplimiter1 >= 3) {
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = (sign((vec4(-3.7, -4.7, 64.24, -323.458) - vec4(-0.5, -1833.4277, 63.97, 5.9))) / atan(vec4(5.9, 12.98, -10.06, -1.4)));
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    ;
                }
                GLF_live4looplimiter1++;
                {
                    if (GLF_live4c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live4i, 4)] >= 1.0) {
                        GLF_live4c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live4i, 4)] = GLF_live4c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live4i, 4)] * GLF_live4c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live4i, 4)];
                        {
                            int GLF_live10looplimiter1 = 0;
                            ivec2 GLF_live10p = _GLF_FUZZED(((-88930) | ivec2(-73308, 78925)));
                            {
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = mod(asin(vec4(-78.43, -6.6, 84.47, -5.2)), 88.65);
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                                if (GLF_live10looplimiter1 >= 7) {
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        _GLF_color = vec4(-921.613, 68.47, -3.1, 468.913);
                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                    }
                                    ;
                                }
                                GLF_live10looplimiter1++;
                                {
                                    GLF_live10p.x -= 16;
                                }
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = vec4(-6.1, vec3(-54.19, -3236.2018, -2.1));
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                            }
                        }
                    }
                    GLF_live4i++;
                }
            }
            {
                ivec2 GLF_live10p = _GLF_FUZZED((ivec2(74226, -21401) | 89092));
                {
                    GLF_live10p.y++;
                }
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(858.452, 8.3, 2.3, -2180.2975);
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
            }
        }
        float GLF_live0y = _GLF_FUZZED(-5411.3419);
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            {
                {
                    ;
                }
            }
            _GLF_color = vec4(7335.0941, 4.2, 0.7, 270.833);
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(2.3, -7.7, 2.7, 4.3);
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
        }
        {
            {
                vec4 _GLF_outVarBackup_GLF_color;
                {
                    {
                        ivec2 GLF_live10p = _GLF_FUZZED(ivec2(-76491, -42244));
                        {
                            GLF_live10p.y++;
                        }
                    }
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = fract(vec4(-14.45, -3.8, -949.232, 8.6));
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = (vec4(-8100.1559, 399.031, -2455.2073, 44.60) - 1.5);
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                }
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = (vec3(1.4, -0.7, 18.04) * mat4x3(-4.6, -9115.2493, -2.2, 4505.7557, 5093.8961, -610.985, 912.696, -36.17, 923.282, -5.7, 5.5, 1.4));
                if (_GLF_WRAPPED_IF_FALSE(false)) {
                } else {
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            return;
                        }
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = clamp(vec4(-54.53, -739.996, -7.8, -14.74), -1.2, fwidthFine(-26.92));
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                    }
                }
            }
            {
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(-5.4, 7.8, -132.174, 694.552);
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = unpackUnorm4x8(26013u);
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(-63.84, 402.248, 5615.5065, -3.8);
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            if (GLF_live0x * GLF_live0x + GLF_live0y * GLF_live0y > 4.0) {
                ;
            }
            float GLF_live0x_new = GLF_live0x * GLF_live0x - GLF_live0y * GLF_live0y + GLF_live0c_re;
            GLF_live0y = 2.0 * GLF_live0x * GLF_live0y + GLF_live0c_im;
            {
                {
                    ;
                }
            }
            GLF_live0x = GLF_live0x_new;
            GLF_live0iteration++;
            {
                vec4 _GLF_outVarBackup_GLF_color;
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(-903.332, 72.50, 0.4, 1.4);
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    _GLF_color = vec4(775.168, -9.2, 9.9, -988.865);
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = vec4(2738.4442, -5449.6283, -2076.0520, -853.982);
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                    {
                        int GLF_live5looplimiter2 = 0;
                        if (GLF_live5looplimiter2 >= 7) {
                            ;
                        }
                    }
                }
                _GLF_outVarBackup_GLF_color = _GLF_color;
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(4769.4512, -533.997, -48.81, -5.0);
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                _GLF_color = vec4(-63.85, 1.6, -2.1, -2347.6889);
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = smoothstep(vec4(-5164.9723, 91.22, -2.8, 9398.0588), vec4(530.778, 5.2, -81.24, -863.690), vec4(-1.2));
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = sqrt(vec4(8843.1761, -4.0, -60.50, 7.3));
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                        }
                    }
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                    if (_GLF_DEAD(false)) {
                        return;
                    }
                }
            }
            GLF_live0k++;
        }
    }
    s_g = temp.y;
    if (_GLF_WRAPPED_IF_TRUE(true)) {
        b_b = temp.z;
    } else {
    }
    {
        {
            ;
        }
    }
}

vec3 computeColor(float c, vec2 position) {
    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
        {
            ;
        }
    } else {
    }
    int msb8 = 256;
    {
        int GLF_live9a = _GLF_FUZZED((ivec2(89748, 79963) + ivec2(-2231, -711)).r);
        int GLF_live9b = _GLF_FUZZED(((-76171) * (91395 + 16299)));
        int GLF_live9c = _GLF_FUZZED(-23160);
        vec2 GLF_live9uv = _GLF_FUZZED(vec2(-18.71, 2.9));
        {
            int GLF_live9looplimiter2 = 0;
            do {
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(5326.6623, 42.41, -85.82, 5.7);
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                if (GLF_live9looplimiter2 >= 5) {
                    break;
                }
                GLF_live9looplimiter2++;
                {
                    GLF_live9uv.y -= step(GLF_live9injectionSwitch.y, GLF_live9uv.x) + float(GLF_live9a) + float(GLF_live9b);
                    GLF_live9uv.x += ldexp(GLF_live9injectionSwitch.y, isinf(GLF_live9uv.y + GLF_live9uv.x) ? findMSB(GLF_live9b) : findMSB(GLF_live9a));
                    GLF_live9c--;
                }
            } while (GLF_live9c > int(GLF_live9injectionSwitch.x));
        }
    }
    h_r = fract(c);
    s_g = float(bitCount(msb8));
    for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
        {
            {
                ;
            }
        }
        {
            vec2 GLF_live3coord = _GLF_FUZZED(vec2(701.569, 9.5));
            {
                {
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = acos(vec4(-9.7, 1.3, 9809.0151, 76.93));
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    ;
                }
            }
            {
                uvec2 GLF_live3icoord = uvec2(((GLF_live3coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                uint GLF_live3res1 = uint(((GLF_live3icoord.x * GLF_live3icoord.y) >> (GLF_live3icoord.x & 31u)) & 0xffffffffu);
                uint GLF_live3res2 = uint(((GLF_live3icoord.x * GLF_live3icoord.y) << (GLF_live3icoord.x & 31u)) & 0xffffffffu);
                float GLF_live3res = float(((GLF_live3res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_live3res1 & 1u) != 0u ? 1u : 0u));
                GLF_live3_GLF_color = vec4(GLF_live3res, GLF_live3res, GLF_live3res, 1.0);
            }
        }
        b_b = (0.5 + (sin(time) * 0.5 + 0.5));
    }
    doConvert();
    s_g *= float(bitCount(msb8)) / position.y;
    for (int _injected_loop_counter = ((0 & ivec3(-89287, 16901, -25157).t) << _GLF_IDENTITY(int(0), _GLF_IDENTITY(int(0), clamp(int(0), int(0), int(0))))); _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
        h_r *= float(bitCount(msb8)) / position.x;
    }
    if (abs(position.y - position.x) < 0.5) {
        b_b = clamp(float(bitfieldExtract(int(resolution.x), 0, 0)), float(bitCount(msb8)), b_b * float(bitCount(msb8)) * 3.0);
    }
    if (_GLF_WRAPPED_IF_FALSE(false)) {
    } else {
        vec2 GLF_live7pos = _GLF_FUZZED((mat2(86.28, -8738.8608, -884.271, 2280.7060) * vec2(545.287, 945.989)));
        {
            ivec2 GLF_live10p = _GLF_FUZZED((ivec4(-16091, 22329, 46386, -58114).xz & (-90660)));
            if (GLF_live10p.x < 0) {
                GLF_live10p.y++;
            }
        }
        vec3 GLF_live7setting = _GLF_FUZZED(vec3(-2.1, 50.08, -7614.0488));
        {
            ;
        }
    }
    {
        int GLF_live8i = _GLF_FUZZED((false ? (-80710) : (-52887)));
        int GLF_live8iters = _GLF_FUZZED(-21735);
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = dFdxFine(vec4(-596.636, -1.4, -5286.4178, -2.1));
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
        int GLF_live8looplimiter0 = 0;
        int GLF_live8v = _GLF_FUZZED(-47664);
        for (GLF_live8i = 0; GLF_live8i < GLF_live8iters; GLF_live8i++) {
            if (GLF_live8looplimiter0 >= 7) {
                break;
            }
            GLF_live8looplimiter0++;
            {
                GLF_live8v = (4 * GLF_live8v * (1000 - GLF_live8v)) / 1000;
            }
        }
    }
    return vec3(h_r, s_g, b_b);
}

vec3 defaultColor() {
    {
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = dFdyCoarse(vec4(-6.6, 3.0, 4992.0739, -1628.3088));
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
        int GLF_live2i = _GLF_FUZZED(int(192571u));
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = vec4(2518.1248, -3788.2402, -8.3, -3.3);
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
        int GLF_live2iters = _GLF_FUZZED(-43470);
        int GLF_live2looplimiter0 = 0;
        int GLF_live2v = _GLF_FUZZED((false ? (-84719) : 88930));
        for (GLF_live2i = 0; GLF_live2i < GLF_live2iters; GLF_live2i++) {
            if (GLF_live2looplimiter0 >= 7) {
                break;
            }
            GLF_live2looplimiter0++;
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = asinh(trunc(vec4(7349.0176, 3190.7998, -5.1, 7940.7525)));
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    {
                        {
                            ;
                        }
                        {
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = vec4(5.0, 372.353, 1457.9275, -0.1);
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                            int GLF_live9a = _GLF_FUZZED(81112);
                            int GLF_live9b = _GLF_FUZZED(60962);
                            int GLF_live9c = _GLF_FUZZED(ivec4(32501, 43927, ivec2(-73485, 48170)).b);
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = degrees(cos(vec4(-3699.5151, 6877.1071, -6.6, 694.624)));
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                            int GLF_live9d = _GLF_FUZZED(ivec3(-9226, -93737, -45869).z);
                            int GLF_live9looplimiter3 = 0;
                            vec2 GLF_live9uv = _GLF_FUZZED((vec2(5510.9104, -97.20)));
                            {
                                if (GLF_live9looplimiter3 >= 5) {
                                    ;
                                }
                                GLF_live9looplimiter3++;
                                {
                                    GLF_live9uv.y -= step(GLF_live9injectionSwitch.y, GLF_live9uv.x) + float(GLF_live9a) + float(GLF_live9b) + float(GLF_live9c);
                                    GLF_live9d--;
                                }
                            }
                        }
                    }
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = mod(dFdxCoarse(vec4(1120.1318, 3.2, -9.7, -0.8)), vec4(456.062, 561.071, 9339.1622, -10.84));
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                            {
                                ivec2 GLF_live10p = _GLF_FUZZED(ivec2(64911, -8428));
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = vec4(-1816.1282, 589.136, -1127.6913, -56.52);
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                                if (GLF_live10p.x > 0) {
                                    GLF_live10p.y--;
                                }
                            }
                        }
                    }
                    {
                        int GLF_live8looplimiter0 = 0;
                        int GLF_live8v = _GLF_FUZZED(((-89522) & 24847));
                        {
                            if (GLF_live8looplimiter0 >= 7) {
                                ;
                            }
                            GLF_live8looplimiter0++;
                            {
                                GLF_live8v = (4 * GLF_live8v * (1000 - GLF_live8v)) / 1000;
                            }
                        }
                    }
                    {
                        vec4 GLF_live4c = _GLF_FUZZED(vec4(-24.14, vec3(-4840.0923, -55.29, -3.9)));
                        int GLF_live4i = _GLF_FUZZED((60528 - (-18656)));
                        {
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = smoothstep(vec4(-6.5, 5938.4299, -5.1, 3.1), vec3(-487.108, -2.2, -38.23).xyzx, acosh(vec4(5801.6009, 1.4, -7.0, 6.6)));
                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                            if (GLF_live4c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live4i, 4)] >= 1.0) {
                                GLF_live4c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live4i, 4)] = GLF_live4c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live4i, 4)] * GLF_live4c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live4i, 4)];
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                    continue;
                                }
                            }
                            GLF_live4i++;
                        }
                    }
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = mod(vec4(7.4, -3133.2070, -22.37, 334.639), 2639.3291);
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                }
            }
            {
                GLF_live2v = (4 * GLF_live2v * (1000 - GLF_live2v)) / 1000;
            }
        }
        {
            vec4 _GLF_outVarBackup_GLF_color;
            for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                _GLF_outVarBackup_GLF_color = _GLF_color;
            }
            {
                {
                    ;
                }
            }
            {
                int GLF_live10i = _GLF_FUZZED(26261);
                ivec2 GLF_live10p = _GLF_FUZZED(ivec2(50396, -57305));
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(-79.00, -7637.9910, -6521.7672, -4042.7648);
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= determinant(mat4(0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0)))))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                {
                    int GLF_live10looplimiter0 = 0;
                    for (GLF_live10i = 0; GLF_live10i < 100; GLF_live10i++) {
                        if (GLF_live10looplimiter0 >= 7) {
                            break;
                        }
                        GLF_live10looplimiter0++;
                        {
                            GLF_live10p = GLF_live10iter(GLF_live10p);
                        }
                    }
                }
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(refract(2.0, 9410.3186, 513.832));
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
            }
            for (int _injected_loop_counter = int(_GLF_ONE(1.0, injectionSwitch.y)); _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
                _GLF_color = trunc(cos(vec4(-866.314, -3989.9058, -9.1, 7474.3497)));
                {
                    int GLF_live9a = _GLF_FUZZED(-81093);
                    int GLF_live9b = _GLF_FUZZED((ivec3(46737, 58309, 37924) + ivec3(98571, 86379, -79272)).b);
                    vec2 GLF_live9uv = _GLF_FUZZED((false ? vec2(967.606, -70.43) : vec2(74.83, -3.5)));
                    {
                        GLF_live9uv.y -= step(GLF_live9injectionSwitch.y, GLF_live9uv.x) + float(GLF_live9a);
                        GLF_live9uv.x *= (isnan(GLF_live9uv.y) ? cosh(GLF_live9gl_FragCoord.y) : tanh(GLF_live9gl_FragCoord.x));
                        GLF_live9b--;
                    }
                }
            }
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
            {
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(7.9, -7169.1281, -2041.9961, 1.6);
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                {
                    ;
                }
            }
        }
    }
    return vec3(float(bitfieldExtract(int(resolution.y), 0, 0)));
    {
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        _GLF_color = vec4(-468.776, -926.019, 4174.1249, 0.9);
        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
    }
    {
        {
            ;
        }
    }
}

vec3 drawShape(vec2 pos, vec2 square, vec3 setting) {
    int msb8 = 256;
    bool c1 = pos.x - setting.x < square.x;
    if (!c1) {
        {
            int GLF_live4i = _GLF_FUZZED(-30079);
            float GLF_live4limit = _GLF_FUZZED(-5.7);
            int GLF_live4looplimiter0 = 0;
            float GLF_live4ref = _GLF_FUZZED(-592.966);
            float GLF_live4s = _GLF_FUZZED(float(178820u));
            while (GLF_live4i < bitfieldInsert(800, GLF_live4i, 0, 0)) {
                {
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(3.5, 92.36, 80.33, -2.8);
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    int GLF_live9a = _GLF_FUZZED((int(93193u) | ivec4(-33956, 58310, 21118, 82164).x));
                    int GLF_live9b = _GLF_FUZZED(-51436);
                    int GLF_live9c = _GLF_FUZZED((88675 + int(11055u)));
                    int GLF_live9d = _GLF_FUZZED(83660);
                    vec2 GLF_live9uv = _GLF_FUZZED(vec2(-2.2, 9854.5826));
                    {
                        int GLF_live9looplimiter3 = 0;
                        do {
                            if (GLF_live9looplimiter3 >= 5) {
                                break;
                            }
                            GLF_live9looplimiter3++;
                            {
                                GLF_live9uv.y -= step(GLF_live9injectionSwitch.y, GLF_live9uv.x) + float(GLF_live9a) + float(GLF_live9b) + float(GLF_live9c);
                                GLF_live9d--;
                            }
                        } while (GLF_live9d > int(GLF_live9injectionSwitch.x));
                    }
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = (mat2x4(0.5, -4428.2376, -2.5, -1832.9242, -17.56, -5822.6858, -19.26, 3.6), vec4(2.7, 9.2, 9.1, 47.56));
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                }
                if (GLF_live4looplimiter0 >= 3) {
                    if (_GLF_DEAD(false)) {
                        {
                            int GLF_live8v = _GLF_FUZZED(((-47552) * (-44172)));
                            {
                                GLF_live8v = (4 * GLF_live8v * (1000 - GLF_live8v)) / 1000;
                            }
                        }
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = (vec4(-482.109, 3.0, -2.9, 1012.3115) + (mat3x4(mat2x4(0.8, -1347.9307, 985.458, 8.3, 5142.6961, -0.7, -5732.6271, 2.9)) * vec3(-581.744, 2.7, 328.767)));
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                        return vec3(1.0, 1.0, 1.0);
                    }
                    break;
                }
                {
                    ivec2 GLF_live10p = _GLF_FUZZED(ivec2(48782, 91194));
                    if (GLF_live10p.x < 0) {
                        GLF_live10p.x = -GLF_live10p.x;
                    }
                }
                GLF_live4looplimiter0++;
                {
                    if (mod(float(GLF_live4i), GLF_live4ref) <= 0.01) {
                        GLF_live4s += 0.2;
                    }
                    for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > (ivec4(-41821, -413, 9185, -94470).z & 0)); _injected_loop_counter--) {
                        if (float(GLF_live4i) >= GLF_live4limit) {
                            ;
                        }
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = vec4(50.99, 55.19, 2248.2814, 8.3);
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                        {
                            int GLF_live9a = _GLF_FUZZED(79645);
                            int GLF_live9b = _GLF_FUZZED(99354);
                            int GLF_live9c = _GLF_FUZZED(10308);
                            int GLF_live9looplimiter2 = 0;
                            vec2 GLF_live9uv = _GLF_FUZZED(vec2(4.5, 0.0));
                            {
                                if (GLF_live9looplimiter2 >= 5) {
                                    ;
                                }
                                GLF_live9looplimiter2++;
                                {
                                    GLF_live9uv.y -= step(GLF_live9injectionSwitch.y, GLF_live9uv.x) + float(GLF_live9a) + float(GLF_live9b);
                                    GLF_live9uv.x += ldexp(GLF_live9injectionSwitch.y, isinf(GLF_live9uv.y + GLF_live9uv.x) ? findMSB(GLF_live9b) : findMSB(GLF_live9a));
                                    GLF_live9c--;
                                }
                            }
                        }
                    }
                    GLF_live4i++;
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = fwidth(vec4(9.3, 9642.5356, -2948.1492, -2728.3885));
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                }
            }
        }
        return defaultColor();
        if (_GLF_DEAD(false)) {
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = (vec4(941.599, 4.7, 5191.2870, -2.2) - exp2(583.881));
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    return vec3(1.0, 1.0, 1.0);
                }
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            return vec3(1.0, 1.0, 1.0);
            {
                int GLF_live9looplimiter4 = 0;
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = (vec4(8.0, 43.74, -6.3, 3.9) / smoothstep((73.01 / 82.40), 750.562, 831.046));
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                if (GLF_live9looplimiter4 >= 5) {
                    ;
                }
            }
        }
        {
            ivec2 GLF_live10p = _GLF_FUZZED((true ? ivec2(32046, 92455) : ivec2(-28710, -18832)));
            {
                GLF_live10p.y++;
            }
        }
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = vec4(-3.7, -230.256, 5.5, -7.7);
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            if (_GLF_DEAD(_GLF_IDENTITY(false, true && (false)))) {
                return vec3(1.0, 1.0, 1.0);
            }
            _GLF_color = vec4(-50.72, -367.900, -797.020, -6495.5524);
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
    }
    bool c2 = pos.x + setting.x > square.x;
    if (!c2) {
        return defaultColor();
    }
    {
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = vec4(0.5, -2.9, -594.996, -5646.5471);
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
        int GLF_live2looplimiter0 = 0;
        {
            int GLF_live8v = _GLF_FUZZED(-80114);
            {
                GLF_live8v = (4 * GLF_live8v * (1000 - GLF_live8v)) / 1000;
            }
        }
        {
            vec4 _GLF_outVarBackup_GLF_color;
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(-4569.7837, -1.8, 702.142, 65.14);
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = min(vec4(-43.31, 7.0, -5023.9178, -1506.3971), -853.892);
            {
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                    ;
                } else {
                }
            }
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
        if (GLF_live2looplimiter0 >= 7) {
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                {
                    int GLF_live9looplimiter4 = 0;
                    if (GLF_live9looplimiter4 >= 5) {
                        ;
                    }
                }
                return vec3(1.0, 1.0, 1.0);
            }
            ;
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(-5.1, 5.2, -1.1, 9363.4351);
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = mod(vec4(-2.8, 952.320, -1108.2551, -9.6), vec4(6609.8417, -7.7, 7154.7612, -9.0));
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = fwidth(vec4(-8.0, 696.430, -52.36, 5.3));
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                }
            }
        }
        {
            vec2 GLF_live7pos = _GLF_FUZZED(vec2(8051.1905, -1.0));
            vec3 GLF_live7setting = _GLF_FUZZED((vec3(7.5, 6.0, 618.629)));
            {
                ;
            }
        }
    }
    bool c3 = pos.y - setting.x < square.y;
    if (!c3) {
        return defaultColor();
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            {
                {
                    ;
                }
            }
            _GLF_color = tanh(dFdxCoarse(vec4(575.521, 7.0, -682.002, 2113.2009)));
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                {
                    {
                        ;
                    }
                }
                _GLF_color = _GLF_outVarBackup_GLF_color;
                {
                    vec2 GLF_live7pos = _GLF_FUZZED((vec4(-7486.2537, 4.6, -31.33, 4.1) * mat2x4(mat2(-4.0, 3550.5906, 53.06, -6.9))));
                    vec3 GLF_live7setting = _GLF_FUZZED(vec3(vec4(60.61)));
                    {
                        ;
                    }
                }
            }
        }
        {
            {
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = (-vec4(2281.9725, -96.09, -7638.8514, -3.4));
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                {
                    int GLF_live9a = _GLF_FUZZED((~(87782 ^ (-94273))));
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(-0.7, -87.36, -0.5, 69.82);
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    int GLF_live9b = _GLF_FUZZED(59477);
                    int GLF_live9c = _GLF_FUZZED(-62860);
                    int GLF_live9d = _GLF_FUZZED((~(-11536)));
                    vec2 GLF_live9uv = _GLF_FUZZED(vec3(-0.9, -195.246, 6.2).ps);
                    {
                        int GLF_live9looplimiter3 = 0;
                        do {
                            if (GLF_live9looplimiter3 >= 5) {
                                break;
                            }
                            GLF_live9looplimiter3++;
                            {
                                GLF_live9uv.y -= step(GLF_live9injectionSwitch.y, GLF_live9uv.x) + float(GLF_live9a) + float(GLF_live9b) + float(GLF_live9c);
                                GLF_live9d--;
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = vec4(1108.7248, 778.824, -0.6, 348.928);
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                            }
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = vec4(-5983.7208, 5096.3063, -91.47, -3504.0178);
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                        } while (GLF_live9d > int(GLF_live9injectionSwitch.x));
                    }
                }
                vec4 _GLF_outVarBackup_GLF_color;
                do {
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                } while (_GLF_WRAPPED_LOOP(false));
                _GLF_color = min(min(vec4(22.93, -167.103, 69.85, 1.8), (6.7 / vec4(-0.9, -6.2, 7.0, -9.7))), vec4(361.976, 701.631, -3.5, -3464.6671));
                {
                    ivec2 GLF_live10p = _GLF_FUZZED(((64218 | ivec2(-78906, 9550)) ^ ivec2(-49376, -52121)));
                    if (GLF_live10p.x > 0) {
                        GLF_live10p.y--;
                    }
                }
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(-2019.9665, 64.32, -9.4, -1.1);
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                }
                {
                    {
                        ivec2 GLF_live10p = _GLF_FUZZED(((-38155) | (ivec2(59168, -45085) & ivec2(6463, 87676))));
                        {
                            GLF_live10p = GLF_live10iter(GLF_live10p);
                        }
                    }
                    float GLF_live4s = _GLF_FUZZED(-79.65);
                    {
                        GLF_live4s += 0.2;
                    }
                }
            }
            vec2 GLF_live3coord = _GLF_FUZZED(vec2(-1.5, -0.1));
            {
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(0.5, 2.5, -7.8, -4269.1759);
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= length(vec4(0.0, 0.0, 0.0, 0.0)))))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_ZERO(0.0, injectionSwitch.x))))) {
                    return vec3(1.0, 1.0, 1.0);
                    {
                        int GLF_live8i = _GLF_FUZZED((ivec3(19550, 46943, -5241) - ivec3(-92619, -37661, -75111)).g);
                        int GLF_live8iters = _GLF_FUZZED((~(~25101)));
                        int GLF_live8v = _GLF_FUZZED(98628);
                        {
                            int GLF_live8looplimiter0 = 0;
                            for (GLF_live8i = 0; GLF_live8i < GLF_live8iters; GLF_live8i++) {
                                if (GLF_live8looplimiter0 >= 7) {
                                    break;
                                }
                                GLF_live8looplimiter0++;
                                {
                                    GLF_live8v = (4 * GLF_live8v * (1000 - GLF_live8v)) / 1000;
                                }
                            }
                        }
                    }
                    {
                        vec4 GLF_live4c = _GLF_FUZZED((true ? vec4(-3.6, 39.73, 513.529, -75.94) : vec4(5.1, 0.6, 944.312, -7.6)));
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = vec4(vec2(2767.6422, 3810.6889), normalize(vec2(-784.511, -9218.5474)));
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                        int GLF_live4i = _GLF_FUZZED(-28292);
                        int GLF_live4looplimiter1 = 0;
                        int GLF_live4msb8 = _GLF_FUZZED(2627);
                        do {
                            if (GLF_live4looplimiter1 >= 3) {
                                break;
                            }
                            GLF_live4looplimiter1++;
                            {
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                    break;
                                }
                                do {
                                    if (GLF_live4c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live4i, 4)] >= 1.0) {
                                        GLF_live4c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live4i, 4)] = GLF_live4c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live4i, 4)] * GLF_live4c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live4i, 4)];
                                    }
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        _GLF_color = vec4(-63.67, -10.15, 0.1, -24.84);
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                    }
                                } while (_GLF_WRAPPED_LOOP(false));
                                GLF_live4i++;
                            }
                        } while (GLF_live4i < findMSB(findLSB(GLF_live4msb8)));
                    }
                }
                {
                    {
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = sign(vec4(0.1, 9.4, -467.815, 324.447));
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                        ;
                    }
                }
                uvec2 GLF_live3icoord = uvec2(((GLF_live3coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                uint GLF_live3res1 = uint(((GLF_live3icoord.x * GLF_live3icoord.y) >> (GLF_live3icoord.x & 31u)) & 0xffffffffu);
                uint GLF_live3res2 = uint(((GLF_live3icoord.x * GLF_live3icoord.y) << (GLF_live3icoord.x & 31u)) & 0xffffffffu);
                {
                    {
                        {
                            ;
                        }
                    }
                    vec4 _GLF_outVarBackup_GLF_color;
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                    } else {
                    }
                    if (_GLF_WRAPPED_IF_FALSE(false)) {
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = vec4(768.196, -87.70, -3969.2115, -4.2);
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                    } else {
                        int GLF_live5looplimiter2 = 0;
                        if (GLF_live5looplimiter2 >= 7) {
                            ;
                        }
                    }
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = dFdyFine((87.75 / vec4(-1094.9098, -8.2, 1.7, 648.898)));
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    _GLF_color = ceil(vec4(-99.18, 1.0, 4484.7738, -9.8));
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        {
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = vec4(4084.2540, -13.83, 311.021, -2405.5886);
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                            int GLF_live8i = _GLF_FUZZED((false ? (-67910) : 3178));
                            int GLF_live8iters = _GLF_FUZZED((85821));
                            int GLF_live8looplimiter0 = 0;
                            int GLF_live8v = _GLF_FUZZED(50385);
                            for (GLF_live8i = 0; GLF_live8i < GLF_live8iters; GLF_live8i++) {
                                if (GLF_live8looplimiter0 >= 7) {
                                    break;
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        _GLF_color = vec4(85.80, 39.30, 8.0, -199.886);
                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                    }
                                }
                                GLF_live8looplimiter0++;
                                {
                                    GLF_live8v = (4 * GLF_live8v * (1000 - GLF_live8v)) / 1000;
                                }
                            }
                        }
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = acos(vec4(-6.9, -95.46, -6945.3105, -9.3));
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                    }
                }
                if (_GLF_WRAPPED_IF_FALSE(false)) {
                } else {
                    vec4 _GLF_outVarBackup_GLF_color;
                    do {
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                    } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
                    {
                        {
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < tan(0.0))))) {
                                return vec3(1.0, 1.0, 1.0);
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = vec4(94.67, -420.217, 4329.8136, 904.626);
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                            }
                            ;
                        }
                    }
                    _GLF_color = ((mat4(7.2, 35.11, -3.5, -0.4, -62.67, 218.271, -3242.1419, -957.183, 1.0, 1.1, -9386.2371, 78.98, 26.79, -15.49, 1.8, -3907.6163) * mat2x4(4768.0542, 4668.4555, -6402.9582, 4.2, -79.44, -1.6, 88.49, 44.62))[1] * 1.0);
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = fract(vec4(-4641.4681, -17.47, 6.3, 5744.5272));
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                float GLF_live3res = float(((GLF_live3res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_live3res1 & 1u) != 0u ? 1u : 0u));
                GLF_live3_GLF_color = vec4(GLF_live3res, GLF_live3res, GLF_live3res, 1.0);
            }
        }
    }
    bool c4 = pos.y + setting.x > square.y;
    if (!c4) {
        return defaultColor();
        {
            vec4 _GLF_outVarBackup_GLF_color;
            {
                int GLF_live8i = _GLF_FUZZED((-93282));
                int GLF_live8iters = _GLF_FUZZED(22690);
                int GLF_live8looplimiter0 = 0;
                int GLF_live8v = _GLF_FUZZED(ivec3(-28422, -74547, 30069).z);
                for (GLF_live8i = 0; GLF_live8i < GLF_live8iters; GLF_live8i++) {
                    if (GLF_live8looplimiter0 >= 7) {
                        break;
                    }
                    GLF_live8looplimiter0++;
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(-607.042, 8.4, -6994.4097, -7741.3440);
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    {
                        GLF_live8v = (4 * GLF_live8v * (1000 - GLF_live8v)) / 1000;
                    }
                }
            }
            {
                vec2 GLF_live7center = _GLF_FUZZED(vec2(-2.5));
                vec2 GLF_live7position = _GLF_FUZZED((vec2(132.539, 6.1) * vec2(-2.2, -4332.2858)));
                {
                    ivec2 GLF_live10p = _GLF_FUZZED(ivec2(87603, 88600));
                    {
                        GLF_live10p.y--;
                    }
                }
                vec3 GLF_live7result = _GLF_FUZZED(vec3(-7147.9368, 2354.8421, 3.9));
                {
                    int GLF_live7looplimiter0 = 0;
                    for (int GLF_live7i = 35; GLF_live7i >= 0; GLF_live7i--) {
                        if (GLF_live7looplimiter0 >= 7) {
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = dFdx(atan(vec4(-9751.7528, -4.9, -38.92, 7.0), vec4(55.03, 3.5, 4.1, 7.0)));
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                            break;
                        }
                        GLF_live7looplimiter0++;
                        {
                            vec3 GLF_live7d = _GLF_FUZZED(vec3(1.8, 23.71, 17.21));
                            GLF_live7d = GLF_live7drawShape(GLF_live7position, GLF_live7center + vec2(sin(float(GLF_live7i) / 10.0 + GLF_live7time) / 4.0, 0.0), vec3(0.01 + sin(float(GLF_live7i) / 100.0), 0.01, float(GLF_live7i)));
                            if (length(GLF_live7d) <= 0.0) {
                                continue;
                            }
                            GLF_live7result = vec3(GLF_live7d);
                        }
                    }
                }
            }
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = (mat2x4(-6.4, 13.48, 3625.2814, 2343.3832, -748.041, -1885.6954, 65.32, 2364.2639) * vec2(-13.92, 5651.1676));
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                {
                    vec2 GLF_live7center = _GLF_FUZZED((1087.0213 + (vec2(751.940, 7.1) * mat2(3.7, 0.3, -110.028, 9.7))));
                    int GLF_live7looplimiter0 = 0;
                    vec2 GLF_live7position = _GLF_FUZZED((+(vec2(5488.7689, 9.3) + vec2(-565.465, -7.0))));
                    vec3 GLF_live7result = _GLF_FUZZED(vec3(456.607, -1970.2202, -6697.3975));
                    for (int GLF_live7i = 35; GLF_live7i >= 0; GLF_live7i--) {
                        if (GLF_live7looplimiter0 >= 7) {
                            break;
                        }
                        GLF_live7looplimiter0++;
                        {
                            vec3 GLF_live7d = _GLF_FUZZED(vec3(1.8, 23.71, 17.21));
                            GLF_live7d = GLF_live7drawShape(GLF_live7position, GLF_live7center + vec2(sin(float(GLF_live7i) / 10.0 + GLF_live7time) / 4.0, 0.0), vec3(0.01 + sin(float(GLF_live7i) / 100.0), 0.01, float(GLF_live7i)));
                            if (length(GLF_live7d) <= 0.0) {
                                {
                                    ivec2 GLF_live10p = _GLF_FUZZED((+(ivec2(-65843, 66952) + ivec2(-99990, -59215))));
                                    {
                                        GLF_live10p.x -= 16;
                                    }
                                }
                                if (_GLF_DEAD(false)) {
                                    discard;
                                }
                                continue;
                            }
                            GLF_live7result = vec3(GLF_live7d);
                        }
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = vec4(-2691.9203, -0.7, -78.02, -245.575);
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                        if (_GLF_DEAD(false)) {
                            break;
                        }
                    }
                    {
                        int GLF_live10i = _GLF_FUZZED(-76946);
                        ivec2 GLF_live10p = _GLF_FUZZED(ivec2(-4933, 90884));
                        {
                            int GLF_live10looplimiter0 = 0;
                            for (GLF_live10i = 0; GLF_live10i < 100; GLF_live10i++) {
                                if (GLF_live10looplimiter0 >= 7) {
                                    break;
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        _GLF_color = mat2x4(5126.2395, -177.548, -751.424, -89.18, 367.483, -7.4, 5.5, 10.78)[0];
                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                    }
                                }
                                GLF_live10looplimiter0++;
                                {
                                    GLF_live10p = GLF_live10iter(GLF_live10p);
                                }
                            }
                        }
                    }
                }
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
    }
    bool c5 = pos.x - (setting.x - setting.y) < square.x;
    {
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        _GLF_color = vec4(5293.2332, 712.347, -1230.1703, -9.4);
        {
            int GLF_live9looplimiter1 = 0;
            if (GLF_live9looplimiter1 >= 5) {
                ;
            }
        }
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            {
                {
                    ;
                }
            }
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
    }
    if (!c5) {
        {
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(0.2, -933.577, 24.80, 6616.6254);
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            {
                for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
                    ;
                }
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(3.3, 2.5, -98.32, -53.73);
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                        if (_GLF_DEAD(false)) {
                            {
                                vec2 GLF_live7center = _GLF_FUZZED(vec2(-4.0, 733.719));
                                int GLF_live7i = _GLF_FUZZED(-84008);
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = (mat3x4(-1.3, -5.3, 1933.1658, 0.2, 9998.3288, -3.2, -6.5, 1254.3495, 6.1, 4.6, -5720.1551, 87.56) * vec3(-6603.9269, 2761.6219, 0.0));
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                                int GLF_live7looplimiter0 = 0;
                                vec2 GLF_live7position = _GLF_FUZZED(((vec2(-1756.1656, 3.8) + (-7.7)) + vec2(91.38, 63.18)));
                                vec3 GLF_live7result = _GLF_FUZZED((-vec3(-937.450, -171.753, 570.256)));
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = vec4(1.3, -95.97, -5.2, -1.8);
                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                                {
                                    if (GLF_live7looplimiter0 >= 7) {
                                        ;
                                    }
                                    {
                                        ivec2 GLF_live10p = _GLF_FUZZED(ivec2(-14899, -74100));
                                        if (GLF_live10p.x < 0) {
                                            GLF_live10p.y++;
                                        }
                                    }
                                    GLF_live7looplimiter0++;
                                    {
                                        vec3 GLF_live7d = _GLF_FUZZED(vec3(1.8, 23.71, 17.21));
                                        GLF_live7d = GLF_live7drawShape(GLF_live7position, GLF_live7center + vec2(sin(float(GLF_live7i) / 10.0 + GLF_live7time) / 4.0, 0.0), vec3(0.01 + sin(float(GLF_live7i) / 100.0), 0.01, float(GLF_live7i)));
                                        for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                                            if (length(GLF_live7d) <= 0.0) {
                                                ;
                                            }
                                        }
                                        GLF_live7result = vec3(GLF_live7d);
                                    }
                                }
                            }
                            return vec3(1.0, 1.0, 1.0);
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                for (int _injected_loop_counter = int(_GLF_ONE(1.0, injectionSwitch.y)); _GLF_WRAPPED_LOOP(_injected_loop_counter > int(_GLF_ZERO(0.0, injectionSwitch.x))); _injected_loop_counter--) {
                                    _GLF_color = smoothstep(vec4(-25.82, 6.9, 73.08, 17.46), vec4(325.240, 1.0, 8.7, -0.4), vec4(52.00, 400.896, -8195.3768, 3042.7715));
                                }
                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = vec4(-6695.4027, 71.76, 6.4, 1.5);
                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                            }
                        }
                    }
                }
                if (_GLF_DEAD(false)) {
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = ceil(vec4(903.623, -6728.7764, 3344.6411, 154.782));
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        {
                            float GLF_live4s = _GLF_FUZZED(6.3);
                            {
                                ;
                            }
                        }
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = vec4(6554.8210, -3.3, -6.3, -7.4);
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = vec4(5986.1207, -47.02, -1344.1793, 47.01);
                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                            _GLF_color = dFdx(vec4(365.395, 0.1, -849.600, -1.9));
                            {
                                int GLF_live8v = _GLF_FUZZED((67376 * 10802));
                                {
                                    GLF_live8v = (4 * GLF_live8v * (1000 - GLF_live8v)) / 1000;
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        _GLF_color = fwidthFine(vec4(-286.886, -120.726, 7.5, -9.9));
                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                    }
                                }
                            }
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                        _GLF_color = vec4(8675.5152, 0.0, -59.66, 5672.9277);
                        {
                            ivec2 GLF_live10p = _GLF_FUZZED((ivec2(-28839, -19645) - ivec2(91436, 87734)));
                            if (GLF_live10p.x < 0) {
                                GLF_live10p.x = -GLF_live10p.x;
                            }
                        }
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = dFdxCoarse((true ? vec4(-57.26, 95.07, 9.7, 25.98) : vec4(74.40, 60.57, 6944.1734, -1.7)));
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                    }
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(-2584.9054, 2.8, 4.7, 963.018);
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= tan(0.0))))) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        return vec3(1.0, 1.0, 1.0);
                    } else {
                    }
                }
            }
        }
        return computeColor(setting.z / (5.0 * float(findMSB(msb8))), pos);
    }
    bool c6 = pos.x + (setting.x - setting.y) > square.x;
    {
        int GLF_live8looplimiter0 = 0;
        if (GLF_live8looplimiter0 >= 7) {
            ;
        }
    }
    if (!c6) {
        {
            {
                ;
            }
        }
        {
            int GLF_live5index = _GLF_FUZZED(20116);
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(8.9, 7.7, 11.32, 35.91);
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            int GLF_live5j = _GLF_FUZZED(int(11680u));
            {
                GLF_live5index = GLF_live5j;
            }
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = asinh(vec4(9.9, -6302.3327, -6.7, -9843.6012));
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
        }
        {
            vec4 _GLF_outVarBackup_GLF_color;
            {
                ivec2 GLF_live10p = _GLF_FUZZED((21130 ^ ivec2(47867, 1618)));
                {
                    GLF_live10p.y--;
                }
            }
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = vec4(17.33, 7515.5142, 1.2, -3.5);
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(-714.961, 57.10, 208.990, -0.8);
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
            }
            {
                {
                    ;
                }
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(436.994, 5235.5289, -4863.4697, 113.904);
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
            }
        }
        return computeColor(setting.z / (5.0 * float(findMSB(msb8))), pos);
    }
    {
        int GLF_live8looplimiter0 = 0;
        if (GLF_live8looplimiter0 >= 7) {
            ;
        }
    }
    {
        int GLF_live2v = _GLF_FUZZED(ivec2(32698, -16310).r);
        {
            GLF_live2v = (4 * GLF_live2v * (1000 - GLF_live2v)) / 1000;
            {
                ivec2 GLF_live10p = _GLF_FUZZED((ivec2(-6697, 6768) & 69232));
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(-88.03, 3.0, -85.06, -5.0);
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                {
                    GLF_live10p.x -= 16;
                }
            }
            {
                vec4 GLF_live4c = _GLF_FUZZED(vec4(-3562.1645, vec3(-6.3, 5801.8141, -100.254)));
                int GLF_live4i = _GLF_FUZZED(84768);
                {
                    if (GLF_live4c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live4i, 4)] >= 1.0) {
                        GLF_live4c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live4i, 4)] = GLF_live4c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live4i, 4)] * GLF_live4c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live4i, 4)];
                    }
                    GLF_live4i++;
                    {
                        int GLF_live8looplimiter0 = 0;
                        int GLF_live8v = _GLF_FUZZED(-50770);
                        {
                            if (GLF_live8looplimiter0 >= 7) {
                                ;
                            }
                            GLF_live8looplimiter0++;
                            {
                                GLF_live8v = (4 * GLF_live8v * (1000 - GLF_live8v)) / 1000;
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = vec4(-2.0, 4610.1007, 1.7, 1.3);
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                            }
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = vec4(6908.9600, -2010.5747, -9.9, 355.649);
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                        }
                    }
                }
            }
        }
        {
            vec2 GLF_live7center = _GLF_FUZZED(vec2(7699.2979, -340.969));
            int GLF_live7i = _GLF_FUZZED(((-33647) ^ ((-24138) * 53199)));
            vec2 GLF_live7position = _GLF_FUZZED(vec2(-6.9, 8047.1369));
            if (_GLF_DEAD(false)) {
                return vec3(1.0, 1.0, 1.0);
            }
            vec3 GLF_live7result = _GLF_FUZZED(vec3(6.6, 1.9, 2.5));
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(-7.8, 3622.8373, 8421.8717, -2.2);
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            {
                vec3 GLF_live7d = _GLF_FUZZED(vec3(1.8, 23.71, 17.21));
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(5199.8118, -3.9, -743.886, 3.0);
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                GLF_live7d = GLF_live7drawShape(GLF_live7position, GLF_live7center + vec2(sin(float(GLF_live7i) / 10.0 + GLF_live7time) / 4.0, 0.0), vec3(0.01 + sin(float(GLF_live7i) / 100.0), 0.01, float(GLF_live7i)));
                {
                    int GLF_live8looplimiter0 = 0;
                    int GLF_live8v = _GLF_FUZZED(-45663);
                    {
                        if (GLF_live8looplimiter0 >= 7) {
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = atan(vec4(-99.92, -7.0, 8.6, -70.85), vec4(-0.3, 5488.5208, -1205.2833, 8.4));
                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                            ;
                        }
                        GLF_live8looplimiter0++;
                        {
                            GLF_live8v = (4 * GLF_live8v * (1000 - GLF_live8v)) / 1000;
                        }
                    }
                }
                if (length(GLF_live7d) <= 0.0) {
                    ;
                }
                GLF_live7result = vec3(GLF_live7d);
            }
        }
    }
    bool c7 = pos.y - (setting.x - setting.y) < square.y;
    if (!c7) {
        {
            int GLF_live10i = _GLF_FUZZED(89137);
            ivec2 GLF_live10p = _GLF_FUZZED(ivec2(-52941, 10122));
            {
                int GLF_live10looplimiter0 = 0;
                for (GLF_live10i = 0; GLF_live10i < 100; GLF_live10i++) {
                    if (GLF_live10looplimiter0 >= 7) {
                        break;
                    }
                    GLF_live10looplimiter0++;
                    {
                        GLF_live10p = GLF_live10iter(GLF_live10p);
                    }
                }
            }
        }
        {
            vec4 _GLF_outVarBackup_GLF_color;
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(-3.1, 5960.5685, 8.3, -5.3);
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = vec4(-4.2, 81.09, -9236.0048, -4.1);
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
        return computeColor(setting.z / (5.0 * float(findMSB(msb8))), pos);
    }
    {
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = vec4(334.034, -3.9, -8685.8452, length(fwidthFine(vec3(2692.0981, 5.2, -4392.9813))));
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
        {
            ;
            {
                bool GLF_live7c3 = _GLF_FUZZED(true);
                if (!GLF_live7c3) {
                    ;
                }
            }
            {
                int GLF_live10looplimiter0 = 0;
                ivec2 GLF_live10p = _GLF_FUZZED((ivec2(96876, 63064) - ivec2(-41398, -94394)));
                {
                    if (GLF_live10looplimiter0 >= 7) {
                        ;
                    }
                    GLF_live10looplimiter0++;
                    {
                        GLF_live10p = GLF_live10iter(GLF_live10p);
                    }
                }
            }
            {
                {
                    int GLF_live9looplimiter5 = 0;
                    if (GLF_live9looplimiter5 >= 5) {
                        ;
                    }
                }
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = ((ivec4(-74817, 77952, 41350, 89175) == ivec4(50325, 22554, 70517, 16809)) ? unpackSnorm4x8(159078u) : fwidthFine((vec4(-23.69, -5.2, -83.21, 616.860))));
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                vec4 _GLF_outVarBackup_GLF_color;
                {
                    int GLF_live10looplimiter0 = 0;
                    if (GLF_live10looplimiter0 >= 7) {
                        ;
                    }
                }
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = (vec4(-662.462, -6.7, 0.3, -8524.3597) * (-1266.6581));
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(true, !(!(true))))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(-8.0, -4.1, 7.0, 3.8);
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= tan(0.0))))) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
                {
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(3.5, 96.94, 4584.5439, 2.7);
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    int GLF_live8v = _GLF_FUZZED(26450);
                    {
                        GLF_live8v = (4 * GLF_live8v * (1000 - GLF_live8v)) / 1000;
                    }
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = mat3x4(-6488.1159, -2.8, -5164.1945, 2.3, 14.12, 3554.3062, 961.477, -37.49, -899.217, -47.75, -8.5, -5974.0440)[2];
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                }
            }
        }
    }
    bool c8 = pos.y + (setting.x - setting.y) > square.y;
    if (!c8) {
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = (-vec4(vec3(-3538.0773, -376.231, -4470.1763), -0.1));
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
        return computeColor(setting.z / (5.0 * float(findMSB(msb8))), pos);
    }
    return defaultColor();
}

vec3 computePoint(mat2 rotationMatrix) {
    int msb8 = 256;
    vec2 aspect;
    {
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        {
            {
                ;
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = roundEven(vec4(-96.12, -47.20, 23.58, 5.9));
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(true, bool(bvec3(true, true, true))))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    return vec3(1.0, 1.0, 1.0);
                }
            }
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(-3.2, 9.1, -5.7, -4704.2686);
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
        }
        _GLF_color = vec4(10.42, 578.110, 2136.1082, 24.63);
        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
            {
                int GLF_live4i = _GLF_FUZZED(int(19609u));
                {
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(-769.577, -286.399, -4.9, -106.459);
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    {
                        ;
                    }
                }
                float GLF_live4limit = _GLF_FUZZED((true ? (-35.49) : 691.599));
                int GLF_live4looplimiter0 = 0;
                float GLF_live4ref = _GLF_FUZZED(696.075);
                float GLF_live4s = _GLF_FUZZED(vec2(-743.163, 90.89).t);
                while (GLF_live4i < bitfieldInsert(800, GLF_live4i, 0, 0)) {
                    if (GLF_live4looplimiter0 >= 3) {
                        break;
                    }
                    GLF_live4looplimiter0++;
                    {
                        if (mod(float(GLF_live4i), GLF_live4ref) <= 0.01) {
                            GLF_live4s += 0.2;
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = vec4(-6424.5521, 304.719, 20.16, 368.216);
                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                        }
                        if (float(GLF_live4i) >= GLF_live4limit) {
                            ;
                        }
                        GLF_live4i++;
                    }
                }
            }
            _GLF_color = _GLF_outVarBackup_GLF_color;
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(-9.2, 3.8, -9.9, -9431.3831);
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
        }
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = min(atan(vec4(44.61, 7.0, -4.0, 7.5), vec4(-5.7, 31.91, 2207.9961, -684.797)), vec4(8334.9746, 24.02, -938.669, -6.5));
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
    }
    aspect = resolution.xy / min(resolution.x, resolution.y);
    {
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        _GLF_color = vec4(2.3, -7.6, 7.4, -4.0);
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
    }
    vec2 position;
    {
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        _GLF_color = vec4(-9853.4315, -7139.9505, 1206.6637, -7.2);
        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
    }
    {
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        {
            int GLF_live10i = _GLF_FUZZED(35139);
            int GLF_live10looplimiter0 = 0;
            ivec2 GLF_live10p = _GLF_FUZZED((80975 + ivec2(-38514, 60025)));
            for (GLF_live10i = 0; GLF_live10i < 100; GLF_live10i++) {
                if (GLF_live10looplimiter0 >= 7) {
                    break;
                }
                GLF_live10looplimiter0++;
                {
                    GLF_live10p = GLF_live10iter(GLF_live10p);
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = exp2(vec4(2972.7106, 0.7, -438.898, 16.61));
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                }
            }
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(423.810, 687.713, -44.35, -6662.4758);
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
        }
        _GLF_color = exp2(vec4(-6.3, -0.2, -2547.6377, 2.4));
        {
            ivec2 GLF_live10p = _GLF_FUZZED(ivec2(73193, -87870));
            {
                GLF_live10p.y--;
            }
        }
        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
    }
    {
        bool GLF_live7c3 = _GLF_FUZZED((mat2x3(-4252.0327, 6.7, 4802.3034, 1220.3018, -9648.5323, 3.0) != (874.296 * mat2x3(-22.59, 3598.3668, 3096.8911, -0.3, -218.607, 66.56))));
        if (!GLF_live7c3) {
            {
                int GLF_live8looplimiter0 = 0;
                if (GLF_live8looplimiter0 >= 7) {
                    ;
                }
            }
            ;
        }
    }
    {
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        _GLF_color = min(max(vec4(-3703.3141, 792.971, 5.1, 2977.3499), vec4(5.7, -33.21, 7.3, 13.17)), vec4(83.39, 7583.6115, 493.281, -772.389));
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
    }
    {
        {
            int GLF_live9a = _GLF_FUZZED((+82227));
            vec2 GLF_live9uv = _GLF_FUZZED((vec2(91.60, -891.386) + vec2(1.3, 8.1)));
            {
                GLF_live9uv.y -= step(GLF_live9injectionSwitch.y, GLF_live9uv.x);
                GLF_live9uv.x -= fract(tanh(GLF_live9uv.x)) / ldexp(GLF_live9injectionSwitch.y, findMSB(GLF_live9a));
                GLF_live9a--;
            }
        }
        int GLF_live2v = _GLF_FUZZED(63536);
        {
            vec4 _GLF_outVarBackup_GLF_color;
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = smoothstep(929.564, 5380.0931, vec4(-44.94, -7.0, -4973.2024, -6.0));
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            {
                vec4 GLF_live4c = _GLF_FUZZED(((+357.201) * vec4(-111.166, 21.84, 2363.3633, -88.68)));
                int GLF_live4i = _GLF_FUZZED(33154);
                if (GLF_live4c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live4i, 4)] >= 1.0) {
                    do {
                        GLF_live4c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live4i, 4)] = GLF_live4c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live4i, 4)] * GLF_live4c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live4i, 4)];
                    } while (_GLF_WRAPPED_LOOP(false));
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(-13.10, 3.8, -3.4, -6624.0967);
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                }
            }
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = fwidthCoarse(vec4(-8.8, -5654.3023, 412.389, -464.132));
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
        if (_GLF_DEAD(false)) {
            return vec3(1.0, 1.0, 1.0);
            {
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = min(vec4(50.33, -292.361, 285.366, -79.05), vec4(-48.70, 2.6, 2452.3317, -497.419));
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                int GLF_live8looplimiter0 = 0;
                if (GLF_live8looplimiter0 >= 7) {
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(-44.01, 3.9, -84.69, 76.64);
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    ;
                }
            }
        }
        {
            {
                ;
            }
        }
        {
            GLF_live2v = (4 * GLF_live2v * (1000 - GLF_live2v)) / 1000;
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < abs(0.0))))) {
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(76.81, -9.8, -8.0, -29.85);
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    {
                        ivec2 GLF_live10p = _GLF_FUZZED((ivec2(64614, -37564) ^ (-71498)));
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = vec4(5.0, -56.54, 534.324, -8.3);
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                        {
                            GLF_live10p.x = -GLF_live10p.x;
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = fwidthCoarse(vec4(-49.82, 894.331, -3.2, -37.78));
                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                        }
                    }
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(-3.1, -45.48, -2532.9383, 80.68);
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                        {
                            if (_GLF_DEAD(_GLF_IDENTITY(false, (false) && true))) {
                                return vec3(1.0, 1.0, 1.0);
                            }
                            {
                                int GLF_live8i = _GLF_FUZZED((23703 | (-69207)));
                                int GLF_live8iters = _GLF_FUZZED((false ? int(true) : 63639));
                                int GLF_live8looplimiter0 = 0;
                                int GLF_live8v = _GLF_FUZZED(int(105622u));
                                for (GLF_live8i = 0; GLF_live8i < GLF_live8iters; GLF_live8i++) {
                                    if (GLF_live8looplimiter0 >= 7) {
                                        break;
                                    }
                                    GLF_live8looplimiter0++;
                                    {
                                        GLF_live8v = (4 * GLF_live8v * (1000 - GLF_live8v)) / 1000;
                                    }
                                }
                            }
                            bool GLF_live7c3 = _GLF_FUZZED(((-11257) != (11027 - 69037)));
                            {
                                int GLF_live8v = _GLF_FUZZED(-24511);
                                {
                                    GLF_live8v = (4 * GLF_live8v * (1000 - GLF_live8v)) / 1000;
                                }
                            }
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = dFdyCoarse(round(vec4(7650.4351, -476.922, 36.55, 5.5)));
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                            if (!GLF_live7c3) {
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = vec4(-195.437, -220.981, -9.7, 262.139);
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                                ;
                            }
                        }
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                return vec3(1.0, 1.0, 1.0);
            }
        }
    }
    {
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        _GLF_color = fwidth(vec4(0.9, 814.692, 7.4, -5272.2677));
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
    }
    {
        {
            ;
        }
    }
    position = (gl_FragCoord.xy / resolution.xy) * aspect;
    vec2 center;
    center = vec2(0.5) * aspect;
    position *= rotationMatrix;
    {
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        _GLF_color = vec4(9652.3144, 0.2, 5.5, 3187.5687);
        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
    }
    center *= rotationMatrix;
    vec3 result = vec3(0.0);
    for (int i = bitfieldInsert(35, 0, 0, bitfieldExtract(int(resolution.x), 0, 0)); i >= bitfieldReverse(bitfieldExtract(int(resolution.x), 0, 0)); i--) {
        vec3 d;
        {
            vec2 GLF_live3coord = _GLF_FUZZED(((true ? vec2(-8.6, -683.692) : vec2(475.777, -0.7))));
            {
                {
                    int GLF_live8looplimiter0 = 0;
                    int GLF_live8v = _GLF_FUZZED(((-96139) - 8822));
                    {
                        if (GLF_live8looplimiter0 >= 7) {
                            ;
                        }
                        GLF_live8looplimiter0++;
                        {
                            GLF_live8v = (4 * GLF_live8v * (1000 - GLF_live8v)) / 1000;
                        }
                    }
                }
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = round(vec4(3605.3501, -8630.3963, -0.4, -3.4));
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= determinant(mat4(0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, length(vec2(0.0, 0.0)), 1.0, 1.0, 0.0)))))) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            if (GLF_live3coord.x > 0.4) {
                if (GLF_live3coord.y < 0.6) {
                    uvec2 GLF_live3icoord = uvec2(((GLF_live3coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                    {
                        {
                            vec4 GLF_live4c = _GLF_FUZZED(vec4(3.6, 42.03, 78.45, 8.8));
                            int GLF_live4i = _GLF_FUZZED(79901);
                            {
                                if (GLF_live4c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live4i, 4)] >= 1.0) {
                                    GLF_live4c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live4i, 4)] = GLF_live4c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live4i, 4)] * GLF_live4c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live4i, 4)];
                                    {
                                        ivec2 GLF_live10p = _GLF_FUZZED((ivec2(-59758, -27011) * ((-47580) * ivec2(56558, 57223))));
                                        {
                                            int GLF_live10looplimiter1 = 0;
                                            while (GLF_live10p.x > 15) {
                                                if (GLF_live10looplimiter1 >= 7) {
                                                    break;
                                                }
                                                GLF_live10looplimiter1++;
                                                {
                                                    {
                                                        vec4 _GLF_outVarBackup_GLF_color;
                                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                                        _GLF_color = unpackSnorm4x8(uint(false));
                                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                        }
                                                    }
                                                    GLF_live10p.x -= 16;
                                                }
                                            }
                                        }
                                    }
                                }
                                GLF_live4i++;
                            }
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            continue;
                        }
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = trunc(vec4(-8.4, -9268.0378, 3705.3828, -2804.1644));
                        {
                            int GLF_live10i = _GLF_FUZZED(-28729);
                            ivec2 GLF_live10p = _GLF_FUZZED(ivec2(-14086, -87190));
                            {
                                int GLF_live10looplimiter0 = 0;
                                for (GLF_live10i = 0; GLF_live10i < 100; GLF_live10i++) {
                                    if (GLF_live10looplimiter0 >= 7) {
                                        {
                                            vec4 _GLF_outVarBackup_GLF_color;
                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                            _GLF_color = clamp(vec4(1.7, 71.48, 8209.4664, -8834.6979), vec4(4986.2494, 37.64, -2.7, -1.5), vec4(160.254, 3.3, -365.409, 53.03));
                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                            }
                                        }
                                        break;
                                    }
                                    GLF_live10looplimiter0++;
                                    {
                                        GLF_live10p = GLF_live10iter(GLF_live10p);
                                        {
                                            vec4 _GLF_outVarBackup_GLF_color;
                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                            _GLF_color = vec4(acosh(-1.7));
                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= determinant(mat4(0.0, 0.0, 0.0, 0.0, _GLF_IDENTITY(dot(vec2(0.0, 1.0), vec2(1.0, 0.0)), dot(vec2(0.0, 1.0), vec2(1.0, 0.0))), tan(0.0), 0.0, 0.0, 1.0, 1.0, 0.0, sin(0.0), 1.0, 1.0, 1.0, 0.0)))))) {
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                            }
                                        }
                                    }
                                }
                            }
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = vec4(-6393.9161, -8185.9422, -0.9, -3507.1738);
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                        }
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    uint GLF_live3res1 = uint(((GLF_live3icoord.x * GLF_live3icoord.y) >> (GLF_live3icoord.x & 31u)) & 0xffffffffu);
                    uint GLF_live3res2 = uint(((GLF_live3icoord.x * GLF_live3icoord.y) << (GLF_live3icoord.x & 31u)) & 0xffffffffu);
                    float GLF_live3res = float(((GLF_live3res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_live3res1 & 1u) != 0u ? 1u : 0u));
                    GLF_live3_GLF_color = vec4(GLF_live3res, GLF_live3res, GLF_live3res, 1.0);
                } else {
                    ivec2 GLF_live3icoord = ivec2(((GLF_live3coord - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                    int GLF_live3res3 = ((GLF_live3icoord.x >> 5) & 1) ^ ((GLF_live3icoord.y & 32) >> 5);
                    {
                        int GLF_live8looplimiter0 = 0;
                        if (GLF_live8looplimiter0 >= 7) {
                            ;
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = vec4(-3.1, 3.8, 8019.5364, 5.3);
                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                        }
                    }
                    int GLF_live3res2 = (GLF_live3icoord.y * GLF_live3icoord.y >> 10) & 1;
                    int GLF_live3res1 = (GLF_live3icoord.x * GLF_live3icoord.y >> 9) & 1;
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                        GLF_live3_GLF_color = vec4(float(GLF_live3res1 ^ GLF_live3res2), float(GLF_live3res2 & GLF_live3res3), float(GLF_live3res1 | GLF_live3res3), 1.0);
                    } else {
                    }
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        if (_GLF_WRAPPED_IF_FALSE(_GLF_IDENTITY(false, !(!(false))))) {
                        } else {
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = ((-1.0) + vec4(5.0, 278.207, -0.8, -5.0));
                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                            _GLF_color = abs(pow(vec4(8.9, 2701.1546, -65.78, -703.187), sign(vec4(8816.7424, -804.830, -0.8, 1.9))));
                        }
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                }
            } else {
                ivec2 GLF_live3icoord = ivec2(((GLF_live3coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.6, 1.0)) * 256.0);
                {
                    {
                        {
                            int GLF_live11looplimiter0 = 0;
                            if (GLF_live11looplimiter0 >= 7) {
                                ;
                            }
                        }
                        vec4 _GLF_outVarBackup_GLF_color;
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = sqrt(vec4(-3.5, -1251.0624, -7.1, -16.39));
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = (mat4(645.204, -8.9, -151.640, -733.598, 392.560, -764.731, 694.981, 5586.0374, 2403.3372, 5.9, -659.343, -5.5, 50.52, 5.3, 703.666, 93.23) * vec4(-9.4, -9924.8730, -552.146, -829.781));
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= _GLF_IDENTITY(dot(vec4(0.0, 1.0, 0.0, 1.0), vec4(1.0, 0.0, 1.0, 0.0)), _GLF_IDENTITY(dot(vec4(0.0, 1.0, 0.0, 1.0), vec4(1.0, 0.0, 1.0, 0.0)), (true ? dot(vec4(0.0, 1.0, 0.0, 1.0), vec4(1.0, 0.0, 1.0, 0.0)) : _GLF_FUZZED(time)))))))) {
                            {
                                int GLF_live9a = _GLF_FUZZED(int(true));
                                int GLF_live9b = _GLF_FUZZED(-22119);
                                int GLF_live9c = _GLF_FUZZED(5068);
                                int GLF_live9d = _GLF_FUZZED(ivec4(69875, -71922, -93267, 29560).z);
                                int GLF_live9looplimiter3 = 0;
                                vec2 GLF_live9uv = _GLF_FUZZED((vec4(8582.5150, (vec3(-1.6, -547.823, 8.2) - (-9.5))) * (-mat2x4(783.297, -20.04, 202.161, -221.654, -10.24, -5.7, -81.97, 7.8))));
                                do {
                                    if (GLF_live9looplimiter3 >= 5) {
                                        {
                                            vec4 _GLF_outVarBackup_GLF_color;
                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                            _GLF_color = vec4(6.6, 1.6, 3.9, 3517.3856);
                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                            }
                                        }
                                        break;
                                    }
                                    GLF_live9looplimiter3++;
                                    {
                                        GLF_live9uv.y -= step(GLF_live9injectionSwitch.y, GLF_live9uv.x) + float(GLF_live9a) + float(GLF_live9b) + float(GLF_live9c);
                                        GLF_live9d--;
                                    }
                                } while (GLF_live9d > int(GLF_live9injectionSwitch.x));
                            }
                            do {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))));
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = (vec4(-65.20, 7083.5066, 8808.1116, 9137.5371) * mat4(-8229.6859, 54.21, -8479.6998, -84.22, 4984.8765, 150.948, 7352.5980, 2.3, 614.563, 9.3, 74.27, -750.183, 70.19, 81.67, 3.4, 59.77));
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
                        _GLF_color = mod((vec4(-38.24, -6996.7154, -703.245, -0.3)), 2.6);
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                            {
                                int GLF_live8looplimiter0 = 0;
                                int GLF_live8v = _GLF_FUZZED((ivec4(63478, -2305, -84422, -36077).a - (~10109)));
                                {
                                    if (GLF_live8looplimiter0 >= 7) {
                                        ;
                                    }
                                    GLF_live8looplimiter0++;
                                    {
                                        GLF_live8v = (4 * GLF_live8v * (1000 - GLF_live8v)) / 1000;
                                    }
                                }
                            }
                            {
                                bool GLF_live7c2 = _GLF_FUZZED(((~51622u) != (true ? 116800u : 188693u)));
                                if (!GLF_live7c2) {
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
                    {
                        int GLF_live4i = _GLF_FUZZED((true ? (~(-48828)) : (-52560)));
                        float GLF_live4limit = _GLF_FUZZED((-(-780.886)));
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = vec4(51.22, 562.497, -15.15, 22.31);
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                        float GLF_live4ref = _GLF_FUZZED((vec2(-9.6, 77.83).g * (-6310.3930)));
                        float GLF_live4s = _GLF_FUZZED((-(-1.5)));
                        {
                            int GLF_live4looplimiter0 = 0;
                            while (GLF_live4i < bitfieldInsert(800, GLF_live4i, 0, 0)) {
                                if (GLF_live4looplimiter0 >= 3) {
                                    break;
                                }
                                GLF_live4looplimiter0++;
                                {
                                    if (mod(float(GLF_live4i), GLF_live4ref) <= 0.01) {
                                        GLF_live4s += 0.2;
                                        {
                                            vec4 _GLF_outVarBackup_GLF_color;
                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                            _GLF_color = vec4(-9.7, -4.3, -6.7, -5.3);
                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                            }
                                        }
                                    }
                                    if (float(GLF_live4i) >= GLF_live4limit) {
                                        ;
                                    }
                                    GLF_live4i++;
                                }
                            }
                        }
                    }
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = (vec4(-3.5, -4.0, -12.83, 5.1));
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                            {
                                vec2 GLF_live7center = _GLF_FUZZED((vec2(63.07, -9.5) + (-0.0)));
                                {
                                    int GLF_live8looplimiter0 = 0;
                                    if (GLF_live8looplimiter0 >= 7) {
                                        ;
                                    }
                                }
                                int GLF_live7looplimiter0 = 0;
                                vec2 GLF_live7position = _GLF_FUZZED(vec2(vec3(-9.7, 1.7, -869.800)));
                                vec3 GLF_live7result = _GLF_FUZZED((mat4x3(mat4(75.35, 0.9, -4284.3269, -2.9, 793.765, -5.4, 5129.4531, -29.68, -7146.2498, -9319.6144, -5.4, 52.45, -4.9, 992.510, 768.350, -3.6)) * vec4(557.340, 6.8, -9.3, -4548.7879)));
                                for (int GLF_live7i = 35; GLF_live7i >= 0; GLF_live7i--) {
                                    if (GLF_live7looplimiter0 >= 7) {
                                        break;
                                    }
                                    GLF_live7looplimiter0++;
                                    {
                                        vec3 GLF_live7d = _GLF_FUZZED(vec3(1.8, 23.71, 17.21));
                                        GLF_live7d = GLF_live7drawShape(GLF_live7position, GLF_live7center + vec2(sin(float(GLF_live7i) / 10.0 + GLF_live7time) / 4.0, 0.0), vec3(0.01 + sin(float(GLF_live7i) / 100.0), 0.01, float(GLF_live7i)));
                                        if (length(GLF_live7d) <= 0.0) {
                                            continue;
                                        }
                                        {
                                            {
                                                ;
                                            }
                                        }
                                        GLF_live7result = vec3(GLF_live7d);
                                    }
                                    {
                                        int GLF_live9looplimiter5 = 0;
                                        if (GLF_live9looplimiter5 >= 5) {
                                            ;
                                        }
                                    }
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        _GLF_color = log2(min(vec4(-9.4, 6.2, -5.7, 4.7), -1548.8093));
                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                    }
                                }
                            }
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        {
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = vec4(-183.245, -7357.1486, 3232.6896, 5272.9983);
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                            int GLF_live8i = _GLF_FUZZED((-98493));
                            int GLF_live8iters = _GLF_FUZZED(-64719);
                            int GLF_live8v = _GLF_FUZZED((84719 + 78356));
                            {
                                int GLF_live8looplimiter0 = 0;
                                for (GLF_live8i = 0; GLF_live8i < GLF_live8iters; GLF_live8i++) {
                                    if (GLF_live8looplimiter0 >= 7) {
                                        break;
                                        {
                                            vec4 _GLF_outVarBackup_GLF_color;
                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                            _GLF_color = vec4(vec2(-2226.5417, -5448.5824), vec3(-1.7, 4160.3366, -8.7).r, -38.09);
                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                            }
                                        }
                                    }
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        _GLF_color = vec4(-99.46, 9.0, 1142.8254, 1.4);
                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= determinant(mat4(0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0, 1.0, 0.0)))))) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                    }
                                    GLF_live8looplimiter0++;
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        _GLF_color = round(vec4(-5005.7873, -9937.7345, 1.4, 4731.6465));
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                    }
                                    {
                                        GLF_live8v = (4 * GLF_live8v * (1000 - GLF_live8v)) / 1000;
                                    }
                                }
                            }
                        }
                        break;
                        {
                            {
                                ;
                            }
                        }
                    }
                    _GLF_color = vec4(-271.613, 1.0, -349.482, 50.27);
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                        {
                            {
                                ;
                            }
                        }
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = vec4(1907.9276, -1.4, -8398.1034, -1412.3835);
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = vec4(5.3, -1.2, 7229.8623, -737.155);
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                        break;
                    }
                }
                int GLF_live3v = (GLF_live3icoord.x ^ GLF_live3icoord.y) * GLF_live3icoord.y;
                bool GLF_live3res1 = ((GLF_live3v >> 10) & 1) != 0;
                bool GLF_live3res2 = ((GLF_live3v >> 11) & 4) != 0;
                bool GLF_live3res3 = ((GLF_live3v >> 12) & 8) != 0;
                GLF_live3_GLF_color = vec4(GLF_live3res1 ? 1.0 : 0.0, GLF_live3res2 ? 1.0 : 0.0, GLF_live3res3 ? 1.0 : 0.0, 1);
            }
        }
        {
            int GLF_live8v = _GLF_FUZZED((true ? (+43161) : (96465 + ((-82458) ^ 61564))));
            {
                GLF_live8v = (4 * GLF_live8v * (1000 - GLF_live8v)) / 1000;
            }
        }
        d = drawShape(position, center + vec2(sin(float(i) / (float(bitCount(msb8)) * 10.0) + time) / 4.0 * float(bitCount(msb8)), float(bitfieldExtract(int(resolution.x), 0, 0))), vec3(0.01 + sin(float(i) / 100.0 * float(bitCount(msb8))), 0.01, float(i)));
        {
            int GLF_live5looplimiter2 = 0;
            if (GLF_live5looplimiter2 >= 7) {
                ;
            }
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = dFdy(vec4(-92.35, 6170.5435, -84.66, -7539.3734));
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
        }
        if (length(d) <= float(bitfieldExtract(int(resolution.x), 0, 0))) {
            continue;
        }
        result = vec3(d);
    }
    return result;
}

void main() {
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
        return;
    }
    {
        {
            ;
        }
    }
    int msb8 = 256;
    float angle;
    angle = sin(time) * 0.1;
    {
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        _GLF_color = vec4(423.552, 3.6, -0.5, 19.44);
        {
            ivec2 GLF_live10p = _GLF_FUZZED(ivec2(75749, -39918));
            if (GLF_live10p.x > 0) {
                GLF_live10p.y--;
            }
        }
        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
            if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < tan(0.0))))) {
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = sqrt(vec4(4.2, -5315.8009, 6.4, -5.1));
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
            } else {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
            {
                ivec2 GLF_live10p = _GLF_FUZZED(ivec2(35836, 72687));
                {
                    GLF_live10p.x = -GLF_live10p.x;
                }
            }
        }
        {
            int GLF_live9a = _GLF_FUZZED(int(false));
            int GLF_live9b = _GLF_FUZZED(84773);
            int GLF_live9c = _GLF_FUZZED(96630);
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(3163.9129, 9.1, 586.380, -44.28);
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            int GLF_live9d = _GLF_FUZZED((90426 | (-30827)));
            vec2 GLF_live9uv = _GLF_FUZZED(((+vec2(-1077.7506, -65.52))));
            {
                GLF_live9uv.y -= step(GLF_live9injectionSwitch.y, GLF_live9uv.x) + float(GLF_live9a) + float(GLF_live9b) + float(GLF_live9c);
                GLF_live9d--;
            }
        }
    }
    mat2 rotationMatrix;
    rotationMatrix = mat2(sin(angle), -cos(angle), cos(angle), sin(angle));
    vec3 point1;
    point1 = computePoint(rotationMatrix);
    mat2 rotationMatrix2;
    {
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        _GLF_color = vec4(-6.1, -3861.2107, -9.4, 439.562);
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
    }
    rotationMatrix2 = rotationMatrix * rotationMatrix;
    {
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        _GLF_color = fwidthCoarse(vec4(-83.65, 7339.4900, 6.1, -9249.3483));
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
            {
                float GLF_live4s = _GLF_FUZZED(float(78640u));
                {
                    ;
                    {
                        int GLF_live8i = _GLF_FUZZED(92241);
                        int GLF_live8iters = _GLF_FUZZED((31930 - 44236));
                        int GLF_live8v = _GLF_FUZZED(ivec3(7093, 72972, -42702).s);
                        {
                            int GLF_live8looplimiter0 = 0;
                            for (GLF_live8i = 0; GLF_live8i < GLF_live8iters; GLF_live8i++) {
                                if (GLF_live8looplimiter0 >= 7) {
                                    break;
                                }
                                GLF_live8looplimiter0++;
                                {
                                    GLF_live8v = (4 * GLF_live8v * (1000 - GLF_live8v)) / 1000;
                                }
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = (mat2x4(-0.0, -2373.9018, 4.2, 1.1, 1.3, -7018.3229, 20.76, -3.8) * vec2(-9101.0875, -9.8));
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
    {
        int GLF_live8looplimiter0 = 0;
        if (GLF_live8looplimiter0 >= 7) {
            ;
        }
    }
    do {
        {
            ;
        }
    } while (_GLF_WRAPPED_LOOP(false));
    vec3 point2;
    {
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = max(fwidthFine(vec4(-8.4, -3.2, 8.4, 7.1)), vec4(-7.4, -3.8, -361.367, -15.71));
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
        ivec2 GLF_live10p = _GLF_FUZZED(((ivec2(66269, 632) | (-95338)) | (82044)));
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = vec4(425.671, 5.7, -53.67, -7.3);
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
        if (GLF_live10p.x > 0) {
            GLF_live10p.y--;
        }
    }
    point2 = computePoint(rotationMatrix2);
    mat2 rotationMatrix3;
    rotationMatrix3 = rotationMatrix * rotationMatrix * rotationMatrix;
    {
        {
            {
                int GLF_live10i = _GLF_FUZZED(int(false));
                ivec2 GLF_live10p = _GLF_FUZZED(ivec2(-69257, 64868));
                {
                    int GLF_live10looplimiter0 = 0;
                    for (GLF_live10i = 0; GLF_live10i < 100; GLF_live10i++) {
                        if (GLF_live10looplimiter0 >= 7) {
                            break;
                        }
                        GLF_live10looplimiter0++;
                        {
                            GLF_live10p = GLF_live10iter(GLF_live10p);
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = ldexp(vec4(6.3, -35.19, -5.8, -3750.6190), ivec4(-27663, -28327, -57291, -32737));
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                        }
                    }
                }
            }
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(-9.0, 327.583, 3.3, -22.78);
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            {
                int GLF_live4i = _GLF_FUZZED(49193);
                float GLF_live4limit = _GLF_FUZZED(-4943.4436);
                int GLF_live4looplimiter0 = 0;
                float GLF_live4ref = _GLF_FUZZED(3444.6530);
                float GLF_live4s = _GLF_FUZZED((false ? (2.1 + (-2.2)) : 54.57));
                {
                    if (GLF_live4looplimiter0 >= 3) {
                        ;
                    }
                    GLF_live4looplimiter0++;
                    {
                        if (mod(float(GLF_live4i), GLF_live4ref) <= 0.01) {
                            GLF_live4s += 0.2;
                        }
                        if (float(GLF_live4i) >= GLF_live4limit) {
                            ;
                        }
                        GLF_live4i++;
                    }
                }
            }
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(987.455, 26.70, -6.7, 95.26);
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            {
                ivec2 GLF_live10p = _GLF_FUZZED(ivec2(ivec3(29565, 39328, 21527)));
                {
                    GLF_live10p.y++;
                }
            }
            _GLF_color = (vec4(7.2, -39.18, -4833.8475, 791.699) - vec4(-4.8, -452.793, 24.16, -8.2));
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                {
                    int GLF_live8i = _GLF_FUZZED(-52878);
                    int GLF_live8iters = _GLF_FUZZED(-68971);
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(16.37, -8586.4394, -1.9, 136.793);
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    int GLF_live8v = _GLF_FUZZED(((-25624) * 70128));
                    {
                        int GLF_live8looplimiter0 = 0;
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = clamp(vec4(595.376, 12.64, -0.3, -9.9), 11.23, -90.61);
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                        for (GLF_live8i = 0; GLF_live8i < GLF_live8iters; GLF_live8i++) {
                            if (GLF_live8looplimiter0 >= 7) {
                                break;
                            }
                            GLF_live8looplimiter0++;
                            {
                                GLF_live8v = (4 * GLF_live8v * (1000 - GLF_live8v)) / 1000;
                            }
                        }
                    }
                }
                {
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = (mat2x4(mat3x4(7.8, -87.29, 8.0, 69.54, 899.091, 8.3, 8.9, -8.5, 5278.9712, 9.0, -316.795, -12.13)) * ceil(vec2(-217.295, 2.6)));
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    int GLF_live4i = _GLF_FUZZED(80967);
                    float GLF_live4limit = _GLF_FUZZED(float((53695u ^ 6332u)));
                    float GLF_live4ref = _GLF_FUZZED(8.0);
                    float GLF_live4s = _GLF_FUZZED(5.0);
                    {
                        int GLF_live8looplimiter0 = 0;
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = vec4(168.217, 0.0, -5.4, 730.824);
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                        if (GLF_live8looplimiter0 >= 7) {
                            ;
                        }
                    }
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = (vec4(-55.23, -9047.5786, -41.59, 281.218) * 177.410);
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    {
                        if (mod(float(GLF_live4i), GLF_live4ref) <= 0.01) {
                            GLF_live4s += 0.2;
                        }
                        if (float(GLF_live4i) >= GLF_live4limit) {
                            ;
                        }
                        GLF_live4i++;
                    }
                }
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        {
            int GLF_live10i = _GLF_FUZZED((ivec2(-87218, -69489).t + (-51300)));
            int GLF_live10looplimiter0 = 0;
            ivec2 GLF_live10p = _GLF_FUZZED(ivec2(67615, 85593));
            for (GLF_live10i = 0; GLF_live10i < 100; GLF_live10i++) {
                if (GLF_live10looplimiter0 >= 7) {
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(4.7, fwidth(vec3(-4223.0557, -10.58, 50.86)));
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(true, (true) && true))) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    break;
                }
                GLF_live10looplimiter0++;
                {
                    GLF_live10p = GLF_live10iter(GLF_live10p);
                }
            }
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(3.9, -3786.8840, 7047.5672, -8.6);
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
        }
        _GLF_color = vec4(1.9, -572.951, 9.9, 6.2);
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            {
                ivec2 GLF_live10p = _GLF_FUZZED((((-94531) + (-38428)) - ivec2(-69393, -46837)));
                if (GLF_live10p.x < 0) {
                    GLF_live10p.x = -GLF_live10p.x;
                }
            }
            _GLF_color = _GLF_outVarBackup_GLF_color;
            {
                {
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = sign(vec4(6754.6673, -8.6, 6.6, -216.408));
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    ;
                }
            }
        }
    }
    {
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        _GLF_color = vec4(-5.0, 6.5, 2.9, 4.5);
        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
    }
    vec3 point3;
    {
        ivec2 GLF_live10p = _GLF_FUZZED(((ivec2(-27951, -45170) * ivec2(-18668, 45393)) * 69277));
        if (GLF_live10p.x < 0) {
            GLF_live10p.y++;
        }
    }
    point3 = computePoint(rotationMatrix3);
    {
        int GLF_live10looplimiter0 = 0;
        if (GLF_live10looplimiter0 >= 7) {
            ;
        }
    }
    {
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        _GLF_color = (float(-75891) + vec4(-446.784, -4.2, -5795.3332, 2.8));
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
    }
    vec3 mixed;
    mixed = mix(point1, point2, vec3(0.3));
    mixed = mix(mixed, point3, vec3(0.3));
    _GLF_color = vec4(mixed, float(bitCount(msb8)));
    {
        {
            int GLF_live6i = _GLF_FUZZED(((-80764) ^ (-60764)));
            if (GLF_live6i >= int(GLF_live6resolution.x)) {
                ;
            }
        }
        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= abs(0.0))))) {
            {
                int GLF_live5looplimiter1 = 0;
                if (GLF_live5looplimiter1 >= 7) {
                    ;
                }
            }
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(-7549.4532, 97.53, -2.8, 192.342);
                {
                    bool GLF_live7c8 = _GLF_FUZZED((mat3x4(2863.9782, -7.1, -4.9, 50.14, 7361.8155, 2833.8481, -2293.3403, -1.2, -4.3, 40.49, 873.539, -74.62) != mat3x4(2.8, 112.631, 52.00, 7.4, 5916.6032, 4346.8698, 5.3, 5027.5421, -9.6, 29.71, -65.75, -911.104)));
                    vec2 GLF_live7pos = _GLF_FUZZED(vec2(-356.836, -93.12));
                    vec3 GLF_live7setting = _GLF_FUZZED(vec3(51.01, -394.770, -9.2));
                    if (!GLF_live7c8) {
                        ;
                    }
                }
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = atanh(vec4(6942.8421, -8109.0521, 2.1, -7.9));
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                {
                    {
                        ;
                    }
                }
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
                {
                    int GLF_live11i = _GLF_FUZZED((+(-64562)));
                    if (GLF_live11i >= int(GLF_live11resolution.x)) {
                        ;
                    }
                }
            }
            ;
            {
                int GLF_live4i = _GLF_FUZZED(-77929);
                {
                    {
                        ;
                    }
                }
                float GLF_live4limit = _GLF_FUZZED(-67.40);
                float GLF_live4ref = _GLF_FUZZED(-6492.9219);
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(-45.03, 8334.5559, -58.55, -9.4);
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                {
                    int GLF_live9m = _GLF_FUZZED(79285);
                    int GLF_live9r = _GLF_FUZZED(-79826);
                    {
                        GLF_live9r = GLF_live9m - 1;
                    }
                }
                float GLF_live4s = _GLF_FUZZED(-142.548);
                {
                    if (mod(float(GLF_live4i), GLF_live4ref) <= 0.01) {
                        do {
                            GLF_live4s += 0.2;
                        } while (_GLF_WRAPPED_LOOP(false));
                    }
                    if (float(GLF_live4i) >= GLF_live4limit) {
                        ;
                    }
                    GLF_live4i++;
                }
            }
            {
                int GLF_live8looplimiter0 = 0;
                int GLF_live8v = _GLF_FUZZED((~(-27093)));
                {
                    if (GLF_live8looplimiter0 >= 7) {
                        ;
                    }
                    GLF_live8looplimiter0++;
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = (vec4(8.5, 43.77, 144.586, -211.485) + dFdyFine(-9176.5377));
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    {
                        GLF_live8v = (4 * GLF_live8v * (1000 - GLF_live8v)) / 1000;
                    }
                }
            }
        } else {
        }
    }
    {
        ivec2 GLF_live10p = _GLF_FUZZED((ivec3(54258, 61983, -93566).ps * (-60012)));
        if (GLF_live10p.x > 0) {
            GLF_live10p.y--;
        }
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = mix(vec4(215.584, -974.228, -6.6, -602.486), vec4(3.6, -612.130, 5.0, -8.7), acos(vec4(487.882, 186.695, 919.867, -8.5)));
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
    }
}
