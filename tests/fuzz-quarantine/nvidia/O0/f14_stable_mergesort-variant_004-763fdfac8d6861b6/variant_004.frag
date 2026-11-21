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
vec4 GLF_live14gl_FragCoord = _GLF_FUZZED((mat3x4(-1.2, 7.5, -98.31, 5.4, 23.84, -0.6, 9.3, 5.7, -4.4, -8808.2671, -8.0, 75.08) * (vec3(12.27, -43.58, -249.315) * (-5875.2113))));

layout(set = 0, binding = 1) uniform buf1 {
    vec2 GLF_live14injectionSwitch;
};

const int GLF_live14N = 10;
int GLF_live14data[10] = int[10](_GLF_FUZZED(int(184096u)), _GLF_FUZZED((int(false) | ivec3(78801, 26710, -4296)).x), _GLF_FUZZED(12813), _GLF_FUZZED(ivec3(29601, -12380, -15643).x), _GLF_FUZZED((-87933)), _GLF_FUZZED(-99815), _GLF_FUZZED(-57769), _GLF_FUZZED(-20487), _GLF_FUZZED(-45059), _GLF_FUZZED(-7226)), GLF_live14temp[10] = int[10](_GLF_FUZZED(17832), _GLF_FUZZED((-(-33492))), _GLF_FUZZED(-46496), _GLF_FUZZED(28523), _GLF_FUZZED((-(-40481))), _GLF_FUZZED(((-28910) & 82083)), _GLF_FUZZED(int(1668u)), _GLF_FUZZED(-16897), _GLF_FUZZED(81259), _GLF_FUZZED((+(-55692))));

void GLF_live14merge(int GLF_live14from, int GLF_live14mid, int GLF_live14to) {
    int GLF_live14k = GLF_live14from, GLF_live14i = GLF_live14from, GLF_live14j = GLF_live14mid + 1;
    {
        int GLF_live14looplimiter0 = 0;
        while (GLF_live14i <= GLF_live14mid && GLF_live14j <= GLF_live14to) {
            if (GLF_live14looplimiter0 >= 6) {
                break;
            }
            GLF_live14looplimiter0++;
            {
                if (GLF_live14data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14i, 10)] < GLF_live14data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14j, 10)]) {
                    GLF_live14temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14k++, 10)] = GLF_live14data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14i++, 10)];
                } else {
                    GLF_live14temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14k++, 10)] = GLF_live14data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14j++, 10)];
                }
            }
        }
    }
    {
        int GLF_live14looplimiter1 = 0;
        while (GLF_live14i < GLF_live14N && GLF_live14i <= GLF_live14mid) {
            if (GLF_live14looplimiter1 >= 6) {
                break;
            }
            GLF_live14looplimiter1++;
            {
                GLF_live14temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14k++, 10)] = GLF_live14data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14i++, 10)];
            }
        }
    }
    {
        int GLF_live14looplimiter2 = 0;
        for (int GLF_live14i = GLF_live14from; GLF_live14i <= GLF_live14to; GLF_live14i++) {
            if (GLF_live14looplimiter2 >= 6) {
                break;
            }
            GLF_live14looplimiter2++;
            {
                GLF_live14data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14i, 10)] = GLF_live14temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14i, 10)];
            }
        }
    }
}

vec4 GLF_live15gl_FragCoord = _GLF_FUZZED(vec4(-4030.6027, vec4(-9.7, -2201.5452, 9144.6532, 6785.8431).q, -98.29, 1.9));

layout(set = 0, binding = 2) uniform buf2 {
    vec2 GLF_live15resolution;
};

ivec2 GLF_live13iter(ivec2 GLF_live13p) {
    if (GLF_live13p.x > 0) {
        GLF_live13p.y--;
    }
    if (GLF_live13p.x < 0) {
        GLF_live13p.y++;
    }
    GLF_live13p.x += GLF_live13p.y / 2;
    return GLF_live13p;
}

vec4 GLF_dead11_GLF_color = _GLF_FUZZED((mat2x4(-2.9, 5.6, 91.01, 73.94, 1.1, 197.089, 793.649, -1.0) * vec2(-388.677, 58.15)));

layout(set = 0, binding = 3) uniform buf3 {
    float GLF_dead11one;
};

mat2 GLF_dead11m22 = _GLF_FUZZED((mat2(-6122.9180, -5.4, 6.2, 9.8) + mat2(2.9, -6337.0767, 2.8, -729.799)));
mat2x3 GLF_dead11m23 = _GLF_FUZZED((mat2x3(646.986, 927.800, -79.55, -6.8, -674.405, -1.6)));
mat2x4 GLF_dead11m24 = _GLF_FUZZED(mat2x4(mat4(-3779.0292, -2.1, -8428.0890, -553.292, 9120.7758, 717.669, 5.9, -4.4, 9.7, -443.299, -2.3, 0.9, -5.9, 598.444, -3.3, 5.8)));
mat3x2 GLF_dead11m32 = _GLF_FUZZED(mat3x2(mat2(4.0, 8.0, 41.08, 5.7)));
mat3 GLF_dead11m33 = _GLF_FUZZED((((-1.4) * (-9.0)) * (mat3(3.8, -4392.1879, -5370.8834, -4341.2672, 8043.9352, 7.1, -2.0, 3.1, 9300.6038) - 47.18)));
mat3x4 GLF_dead11m34 = _GLF_FUZZED(((-9711.4904) + mat3x4(14.16, 0.9, 8841.4585, -410.758, -0.0, 2708.1650, 1.5, 5.3, 102.366, 93.86, 5.0, 59.93)));
mat4x2 GLF_dead11m42 = _GLF_FUZZED(mat4x2(-9.9, -4137.5868, 1832.2625, -8734.2319, 5.6, -681.194, -474.346, 1.4));
mat4x3 GLF_dead11m43 = _GLF_FUZZED(mat4x3(-4.7, -5.6, 8.9, -9552.0182, -220.695, -942.729, -8078.6701, 29.92, 32.50, 7.9, 9.2, -2531.6673));
mat4 GLF_dead11m44 = _GLF_FUZZED(mat4(mat4x3(3783.6721, -90.09, -8.4, 1195.3580, -9.9, -138.323, -832.282, 449.609, -53.30, 4.2, -315.487, -8590.8733)));
vec4 GLF_dead9gl_FragCoord = _GLF_FUZZED(vec4(-8582.0435, 8.6, 5.1, 58.71));

layout(set = 0, binding = 4) uniform buf4 {
    vec2 GLF_dead9resolution;
};

layout(set = 0, binding = 5) uniform buf5 {
    vec2 GLF_dead7injectionSwitch;
};

layout(set = 0, binding = 6) uniform buf6 {
    vec2 GLF_dead6resolution;
};

float GLF_dead6b_b = _GLF_FUZZED(vec3(-1.7, 849.679, 27.11).y);
vec4 GLF_live2_GLF_color = _GLF_FUZZED(vec4(19.38, 2430.3461, 241.520, 7150.2913));
layout(set = 0, binding = 7) uniform sampler2D GLF_live1tex;
const float GLF_live1weights[9] = float[9](1.0, 0.5, -0.25, 0.5, 1.0, -0.5, -0.25, -0.5, -1.0);

struct _GLF_struct_2 {
    mat3x4 _f0;
    mat4x3 _f1;
    mat3x4 _f2;
};

struct _GLF_struct_1 {
    uvec3 _f0;
    _GLF_struct_2 _f1;
    mat3 _f2;
    mat3 _f3;
    bvec3 _f4;
};

struct _GLF_struct_0 {
    mat3x4 _f0;
    mat2x3 _f1;
    _GLF_struct_1 _f2;
    mat4x2 _f3;
    mat2x3 _f4;
    int low;
    mat2 _f5;
};

struct _GLF_struct_9 {
    mat2 _f0;
    uint _f1;
    mat3 _f2;
    vec2 _f3;
    vec2 _f4;
};

struct _GLF_struct_8 {
    mat2x4 _f0;
    mat4x2 _f1;
    bool _f2;
};

struct _GLF_struct_7 {
    _GLF_struct_8 _f0;
    bool _f1;
    _GLF_struct_9 _f2;
    bvec2 _f3;
    mat4 _f4;
};

struct _GLF_struct_6 {
    mat4x3 _f0;
    mat4 _f1;
    mat4 _f2;
    ivec2 _f3;
    ivec2 _f4;
    mat4x2 _f5;
    float _f6;
};

struct _GLF_struct_5 {
    mat2 _f0;
    uvec3 _f1;
    uvec3 _f2;
    float _f3;
    vec4 _f4;
};

struct _GLF_struct_4 {
    _GLF_struct_5 _f0;
    mat3x2 _f1;
    _GLF_struct_6 _f2;
};

struct _GLF_struct_3 {
    mat4x3 _f0;
    int i;
    bvec2 _f1;
    _GLF_struct_4 _f2;
    vec4 _f3;
    _GLF_struct_7 _f4;
};

layout(location = 0) out vec4 _GLF_color;

layout(set = 0, binding = 0) uniform buf0 {
    vec2 injectionSwitch;
};

const int N = 10;
int data[10], temp[10];

void merge(int from, int mid, int to) {
    {
        int GLF_live12looplimiter2 = 0;
        if (GLF_live12looplimiter2 >= 7) {
            ;
        }
    }
    if (_GLF_DEAD(false)) {
        {
            ;
        }
    }
    int k = from, i = from, j = mid + 1;
    if (_GLF_DEAD(false)) {
        uint donor_replacementGLF_dead11matrix_number = _GLF_FUZZED(106856u);
        for (int GLF_dead11cols = 2; GLF_dead11cols <= 4; GLF_dead11cols++) {
            for (int GLF_dead11rows = 2; GLF_dead11rows <= 4; GLF_dead11rows++) {
                for (int GLF_dead11c = 0; GLF_dead11c < GLF_dead11cols; GLF_dead11c++) {
                    for (int GLF_dead11r = 0; GLF_dead11r < GLF_dead11rows; GLF_dead11r++) {
                        switch (donor_replacementGLF_dead11matrix_number) {
                            case 0u:
                                GLF_dead11m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 2)] = GLF_dead11one;
                                break;
                            case 1u:
                                GLF_dead11m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 3)] = GLF_dead11one;
                                break;
                            case 2u:
                                GLF_dead11m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 4)] = GLF_dead11one;
                                break;
                                {
                                    int GLF_live13looplimiter0 = 0;
                                    ivec2 GLF_live13p = _GLF_FUZZED(((18491 & 90323) - ivec2(58495, -34758)));
                                    {
                                        if (GLF_live13looplimiter0 >= 6) {
                                            ;
                                        }
                                        GLF_live13looplimiter0++;
                                        {
                                            GLF_live13p = GLF_live13iter(GLF_live13p);
                                        }
                                    }
                                }
                            case 3u:
                                GLF_dead11m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 2)] = GLF_dead11one;
                                break;
                            case 4u:
                                GLF_dead11m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 3)] = GLF_dead11one;
                                break;
                                {
                                    vec2 GLF_live14color = _GLF_FUZZED((vec2(6.6, -506.918) * (-16.71)));
                                    int GLF_live14i = _GLF_FUZZED((~76751));
                                    vec3 GLF_live14vecCoor = _GLF_FUZZED((34.94 - vec3(5.2, 5396.5136, 46.47)));
                                    if (int(GLF_live14gl_FragCoord[1]) < 30) {
                                        GLF_live14color = fract(sin(GLF_live14vecCoor.yx - trunc(float(GLF_live14data[0]))));
                                        GLF_live14color[0] = dFdy(GLF_live14gl_FragCoord.y);
                                        ;
                                    } else if (int(GLF_live14gl_FragCoord[1]) < 60) {
                                        GLF_live14color = fract(sin(GLF_live14vecCoor.yx - trunc(float(GLF_live14data[1]))));
                                        GLF_live14color[1] *= atan(faceforward(GLF_live14injectionSwitch, GLF_live14color.xx, GLF_live14vecCoor.yx).y);
                                        ;
                                    } else if (int(GLF_live14gl_FragCoord[1]) < 90) {
                                        GLF_live14color = fract(sin(GLF_live14vecCoor.yx - trunc(float(GLF_live14data[2]))));
                                        GLF_live14color.x += atanh(GLF_live14color.x) * cosh(GLF_live14injectionSwitch.y) * smoothstep(GLF_live14color, GLF_live14injectionSwitch, GLF_live14gl_FragCoord.yy).x;
                                        ;
                                    } else if (int(GLF_live14gl_FragCoord[1]) < 120) {
                                        GLF_live14color = fract(acosh(clamp(GLF_live14vecCoor.yx - trunc(float(GLF_live14data[3])), 1.0, 1000.0)));
                                        GLF_live14color.x += (isnan(GLF_live14gl_FragCoord.x) ? log2(GLF_live14gl_FragCoord.x) : log2(GLF_live14gl_FragCoord.y));
                                        ;
                                    } else if (int(GLF_live14gl_FragCoord[1]) < 150) {
                                        ;
                                    } else if (int(GLF_live14gl_FragCoord[1]) < 180) {
                                        GLF_live14color = fract(sin(GLF_live14vecCoor.yx - trunc(float(GLF_live14data[4]))));
                                        GLF_live14color[1] += asinh(GLF_live14gl_FragCoord.y * ldexp(GLF_live14color.y, -GLF_live14i));
                                        ;
                                    } else if (int(GLF_live14gl_FragCoord[1]) < 210) {
                                        GLF_live14color = fract(sin(GLF_live14vecCoor.yx - trunc(float(GLF_live14data[5]))));
                                        GLF_live14color.y -= tanh(GLF_live14color.x) / cosh(GLF_live14color.y);
                                        ;
                                    } else if (int(GLF_live14gl_FragCoord[1]) < 240) {
                                        GLF_live14color = fract(asinh(GLF_live14vecCoor.yx - trunc(float(GLF_live14data[6]))));
                                        GLF_live14color.y -= isnan(float(GLF_live14i)) ? tanh(GLF_live14gl_FragCoord.x) : atanh(GLF_live14gl_FragCoord.y);
                                        ;
                                    } else if (int(GLF_live14gl_FragCoord[1]) < 270) {
                                        GLF_live14color = fract(sin(GLF_live14vecCoor.yx - trunc(float(GLF_live14data[7]))));
                                        GLF_live14color.y *= mix(normalize(GLF_live14vecCoor), normalize(vec3(GLF_live14color, degrees(GLF_live14color.x))), GLF_live14injectionSwitch.x).y;
                                        ;
                                    } else {
                                        ;
                                    }
                                }
                            case 5u:
                                GLF_dead11m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 4)] = GLF_dead11one;
                                break;
                            case 6u:
                                GLF_dead11m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 2)] = GLF_dead11one;
                                break;
                            case 7u:
                                GLF_dead11m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 3)] = GLF_dead11one;
                                break;
                            case 8u:
                                GLF_dead11m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 4)] = GLF_dead11one;
                                break;
                        }
                    }
                }
                donor_replacementGLF_dead11matrix_number = donor_replacementGLF_dead11matrix_number + 1u;
            }
        }
    }
    {
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        _GLF_color = vec4(7070.5153, -78.72, -63.60, 503.014);
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            {
                int GLF_live14j = _GLF_FUZZED(-73033);
                int GLF_live14looplimiter6 = 0;
                {
                    if (GLF_live14looplimiter6 >= 6) {
                        ;
                    }
                    GLF_live14looplimiter6++;
                    {
                        GLF_live14temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14j, 10)] = GLF_live14data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14j, 10)];
                    }
                }
            }
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
        if (_GLF_DEAD(false)) {
            int donor_replacementGLF_dead10iteration = _GLF_FUZZED((vec2(984.156, -8536.3197), k));
            {
                ;
            }
        }
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
        return;
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            {
                ;
            }
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < _GLF_IDENTITY(dot(vec3(0.0, 0.0, 0.0), vec3(1.0, 1.0, round(length(normalize(1.0))))), _GLF_IDENTITY(dot(vec3(0.0, 0.0, 0.0), vec3(1.0, 1.0, round(length(normalize(1.0))))), max(dot(vec3(0.0, 0.0, 0.0), vec3(1.0, 1.0, round(length(normalize(1.0))))), dot(vec3(0.0, 0.0, 0.0), vec3(1.0, _GLF_IDENTITY(1.0, (false ? _GLF_FUZZED(-8.2) : _GLF_IDENTITY(1.0, min(1.0, 1.0)))), round(length(normalize(1.0)))))))))))) {
            {
                int GLF_live14high = _GLF_FUZZED((46528 - ivec2(7720, -99448)).r);
                int GLF_live14low = _GLF_FUZZED(26260);
                int GLF_live14m = _GLF_FUZZED((~(-95935)));
                {
                    int GLF_live14looplimiter3 = 0;
                    for (int GLF_live14i = GLF_live14low; GLF_live14i < GLF_live14high; GLF_live14i += 2 * GLF_live14m) {
                        if (GLF_live14looplimiter3 >= 6) {
                            break;
                        }
                        GLF_live14looplimiter3++;
                        {
                            int GLF_live14from = GLF_live14i;
                            int GLF_live14mid = GLF_live14i + GLF_live14m - 1;
                            int GLF_live14to = min(GLF_live14i + 2 * GLF_live14m - 1, GLF_live14high);
                            GLF_live14merge(GLF_live14from, GLF_live14mid, GLF_live14to);
                        }
                    }
                }
            }
            return;
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                float donor_replacementGLF_dead10c_im = _GLF_FUZZED(9358.0179);
                float donor_replacementGLF_dead10c_re = _GLF_FUZZED(GLF_dead6b_b);
                int donor_replacementGLF_dead10iteration = _GLF_FUZZED(k);
                {
                    {
                        ;
                    }
                }
                float donor_replacementGLF_dead10x = _GLF_FUZZED(dot(GLF_dead6resolution, smoothstep(GLF_dead6b_b, (GLF_dead6b_b + 80.85), injectionSwitch)));
                float donor_replacementGLF_dead10y = _GLF_FUZZED(GLF_dead6b_b);
                {
                    if (donor_replacementGLF_dead10x * donor_replacementGLF_dead10x + donor_replacementGLF_dead10y * donor_replacementGLF_dead10y > 4.0) {
                        ;
                    }
                    float GLF_dead10x_new = donor_replacementGLF_dead10x * donor_replacementGLF_dead10x - donor_replacementGLF_dead10y * donor_replacementGLF_dead10y + donor_replacementGLF_dead10c_re;
                    donor_replacementGLF_dead10y = 2.0 * donor_replacementGLF_dead10x * donor_replacementGLF_dead10y + donor_replacementGLF_dead10c_im;
                    donor_replacementGLF_dead10x = GLF_dead10x_new;
                    donor_replacementGLF_dead10iteration++;
                    {
                        int GLF_live15i = _GLF_FUZZED(((-67459) * 36876));
                        if (GLF_live15i >= int(GLF_live15resolution.x)) {
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
    }
    while (i <= mid && j <= to) {
        if (data[i] < data[j]) {
            temp[k++] = data[i++];
        } else {
            if (_GLF_DEAD(_GLF_FALSE(false, (_GLF_IDENTITY(gl_FragCoord, min(_GLF_IDENTITY(gl_FragCoord, (true ? gl_FragCoord : _GLF_FUZZED(_GLF_color))), _GLF_IDENTITY(gl_FragCoord, (gl_FragCoord) * vec4(1.0, 1.0, 1.0, 1.0)))).x < 0.0)))) {
                float donor_replacementGLF_dead5th = _GLF_FUZZED(dFdx(-7081.6359));
                vec2 donor_replacementGLF_dead5v = _GLF_FUZZED(vec2(6.3, 80.18));
                if (donor_replacementGLF_dead5v.x < 0.0) {
                    donor_replacementGLF_dead5th = 1.0 - donor_replacementGLF_dead5th;
                }
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(floor(-5759.1615), vec3(227.297, -603.920, 90.91));
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)), (_GLF_IDENTITY(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)), bool(bvec3(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)), false, true)))) || false))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
            }
            temp[k++] = data[j++];
            {
                vec2 GLF_live14color = _GLF_FUZZED(vec2(10.57, -993.093));
                int GLF_live14i = _GLF_FUZZED((~31298));
                vec3 GLF_live14vecCoor = _GLF_FUZZED(vec3(986.237, 127.871, 2615.9643));
                if (int(GLF_live14gl_FragCoord[1]) < 210) {
                    GLF_live14color = fract(sin(GLF_live14vecCoor.yx - trunc(float(GLF_live14data[5]))));
                    GLF_live14color.y -= tanh(GLF_live14color.x) / cosh(GLF_live14color.y);
                    ;
                } else if (int(GLF_live14gl_FragCoord[1]) < 240) {
                    GLF_live14color = fract(asinh(GLF_live14vecCoor.yx - trunc(float(GLF_live14data[6]))));
                    GLF_live14color.y -= isnan(float(GLF_live14i)) ? tanh(GLF_live14gl_FragCoord.x) : atanh(GLF_live14gl_FragCoord.y);
                    ;
                } else if (int(GLF_live14gl_FragCoord[1]) < 270) {
                    GLF_live14color = fract(sin(GLF_live14vecCoor.yx - trunc(float(GLF_live14data[7]))));
                    GLF_live14color.y *= mix(normalize(GLF_live14vecCoor), normalize(vec3(GLF_live14color, degrees(GLF_live14color.x))), GLF_live14injectionSwitch.x).y;
                    ;
                } else {
                    ;
                }
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                return;
            }
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            if (_GLF_DEAD(false)) {
                {
                    discard;
                }
            }
            break;
        }
        {
            vec2 GLF_live14color = _GLF_FUZZED(vec2(-8813.6503, 6311.0484));
            int GLF_live14i = _GLF_FUZZED(-98633);
            vec3 GLF_live14vecCoor = _GLF_FUZZED(vec3(-5.8, 55.03, -8949.6669));
            if (int(GLF_live14gl_FragCoord[1]) < 120) {
                GLF_live14color = fract(acosh(clamp(GLF_live14vecCoor.yx - trunc(float(GLF_live14data[3])), 1.0, 1000.0)));
                GLF_live14color.x += (isnan(GLF_live14gl_FragCoord.x) ? log2(GLF_live14gl_FragCoord.x) : log2(GLF_live14gl_FragCoord.y));
                ;
            } else if (int(GLF_live14gl_FragCoord[1]) < 150) {
                ;
            } else if (int(GLF_live14gl_FragCoord[1]) < 180) {
                GLF_live14color = fract(sin(GLF_live14vecCoor.yx - trunc(float(GLF_live14data[4]))));
                GLF_live14color[1] += asinh(GLF_live14gl_FragCoord.y * ldexp(GLF_live14color.y, -GLF_live14i));
                ;
            } else if (int(GLF_live14gl_FragCoord[1]) < 210) {
                GLF_live14color = fract(sin(GLF_live14vecCoor.yx - trunc(float(GLF_live14data[5]))));
                GLF_live14color.y -= tanh(GLF_live14color.x) / cosh(GLF_live14color.y);
                ;
            } else if (int(GLF_live14gl_FragCoord[1]) < 240) {
                GLF_live14color = fract(asinh(GLF_live14vecCoor.yx - trunc(float(GLF_live14data[6]))));
                GLF_live14color.y -= isnan(float(GLF_live14i)) ? tanh(GLF_live14gl_FragCoord.x) : atanh(GLF_live14gl_FragCoord.y);
                ;
            } else if (int(GLF_live14gl_FragCoord[1]) < 270) {
                GLF_live14color = fract(sin(GLF_live14vecCoor.yx - trunc(float(GLF_live14data[7]))));
                GLF_live14color.y *= mix(normalize(GLF_live14vecCoor), normalize(vec3(GLF_live14color, degrees(GLF_live14color.x))), GLF_live14injectionSwitch.x).y;
                ;
            } else {
                ;
            }
        }
    }
    {
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        {
            int GLF_live15looplimiter1 = 0;
            if (GLF_live15looplimiter1 >= 5) {
                ;
            }
        }
        _GLF_color = (vec4(-471.682, -718.317, 9149.3794, -78.18) / vec4(-0.1, -4.9, 3403.9943, 90.59));
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
    }
    while (i < N && i <= mid) {
        temp[k++] = data[i++];
    }
    for (int i = from; i <= to; i++) {
        data[i] = temp[i];
        {
            vec2 GLF_live1coord = _GLF_FUZZED((vec3(-1.8, -2473.4947, -27.85) * (mat2x3(-7145.8187, 82.29, 549.955, 4418.1990, 123.357, 6.2) * (-9.0))));
            int GLF_live1i = _GLF_FUZZED((9657 * (false ? 81454 : (-16856))));
            if (_GLF_DEAD(false)) {
                bool donor_replacementGLF_dead6c7 = _GLF_FUZZED(all(bvec3(true, false, true)));
                int donor_replacementGLF_dead6msb8 = _GLF_FUZZED((i - findLSB(153887u)));
                vec2 donor_replacementGLF_dead6pos = _GLF_FUZZED(vec2(_GLF_IDENTITY(1017.3182, min(_GLF_IDENTITY(1017.3182, clamp(1017.3182, 1017.3182, 1017.3182)), 1017.3182)), -5610.0056));
                vec3 donor_replacementGLF_dead6setting = _GLF_FUZZED(vec3(8.5, 43.00, -8228.0572));
                if (!donor_replacementGLF_dead6c7) {
                    ;
                }
            }
            {
                int GLF_live14looplimiter1 = 0;
                if (GLF_live14looplimiter1 >= 6) {
                    ;
                }
            }
            vec4 GLF_live1res = _GLF_FUZZED(vec4(-6795.3842, -131.020, -7.5, 0.5));
            float GLF_live1uvstep = _GLF_FUZZED(-38.61);
            {
                int GLF_live1looplimiter0 = 0;
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = mix((mat2x4(-4807.2707, -83.98, -366.167, 9.4, -979.365, 538.219, _GLF_IDENTITY(-2.6, (true ? _GLF_IDENTITY(-2.6, max(-2.6, -2.6)) : _GLF_FUZZED(3.2))), -777.416) * vec2(-4728.5771, 50.25)), ((1103.0583 - vec4(6210.4280, -_GLF_IDENTITY(107.914, min(107.914, _GLF_IDENTITY(107.914, (107.914) / 1.0))), -27.08, -324.621)) - 17.77), -4474.6818);
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                        {
                            int GLF_live14i = _GLF_FUZZED((((-13587) & (-47836)) + (~(-18462))));
                            int GLF_live14j = _GLF_FUZZED(86437);
                            int GLF_live14k = _GLF_FUZZED(73918);
                            {
                                if (GLF_live14data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14i, 10)] < GLF_live14data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14j, 10)]) {
                                    GLF_live14temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14k++, 10)] = GLF_live14data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14i++, 10)];
                                } else {
                                    GLF_live14temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14k++, 10)] = GLF_live14data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14j++, 10)];
                                }
                            }
                        }
                    }
                }
                for (int GLF_live1j = 0; GLF_live1j < 3; GLF_live1j++) {
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        {
                            {
                                ;
                            }
                        }
                        int donor_replacementGLF_dead11cols = _GLF_FUZZED(findLSB(GLF_live1i));
                        uint donor_replacementGLF_dead11matrix_number = _GLF_FUZZED(161796u);
                        int donor_replacementGLF_dead11rows = _GLF_FUZZED(mix(int(97408u), j, false));
                        {
                            for (int GLF_dead11c = 0; GLF_dead11c < donor_replacementGLF_dead11cols; GLF_dead11c++) {
                                for (int GLF_dead11r = 0; GLF_dead11r < donor_replacementGLF_dead11rows; GLF_dead11r++) {
                                    switch (donor_replacementGLF_dead11matrix_number) {
                                        case 0u:
                                            GLF_dead11m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 2)] = GLF_dead11one;
                                            break;
                                        case 1u:
                                            GLF_dead11m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 3)] = GLF_dead11one;
                                            break;
                                        case 2u:
                                            {
                                                int GLF_live12looplimiter3 = 0;
                                                if (GLF_live12looplimiter3 >= 7) {
                                                    ;
                                                }
                                            }
                                            GLF_dead11m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 4)] = GLF_dead11one;
                                            break;
                                        case 3u:
                                            GLF_dead11m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 2)] = GLF_dead11one;
                                            break;
                                        case 4u:
                                            GLF_dead11m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 3)] = GLF_dead11one;
                                            break;
                                        case 5u:
                                            GLF_dead11m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 4)] = GLF_dead11one;
                                            break;
                                        case 6u:
                                            GLF_dead11m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 2)] = GLF_dead11one;
                                            break;
                                        case 7u:
                                            GLF_dead11m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 3)] = GLF_dead11one;
                                            break;
                                        case 8u:
                                            {
                                                ivec2 GLF_live13p = _GLF_FUZZED((47012 ^ ivec2(-6492, -83882)));
                                                {
                                                    GLF_live13p.x -= 16;
                                                }
                                            }
                                            GLF_dead11m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 4)] = GLF_dead11one;
                                            break;
                                    }
                                }
                            }
                            donor_replacementGLF_dead11matrix_number = donor_replacementGLF_dead11matrix_number + 1u;
                        }
                    }
                    if (GLF_live1looplimiter0 >= 4) {
                        break;
                    }
                    GLF_live1looplimiter0++;
                    {
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            return;
                        }
                        GLF_live1res += texture(GLF_live1tex, GLF_live1coord + vec2(float(_GLF_IDENTITY(GLF_live1i - 1, min(_GLF_IDENTITY(GLF_live1i - 1, 1 * (GLF_live1i - 1)), GLF_live1i - 1))) * GLF_live1uvstep, float(GLF_live1j - 1) * GLF_live1uvstep)) * GLF_live1weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live1i * 3 + GLF_live1j, 9)];
                    }
                }
                if (_GLF_DEAD(false)) {
                    int donor_replacementGLF_dead10iteration = _GLF_FUZZED(bitCount(183294u));
                    {
                        ;
                    }
                }
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = (vec4(2.1, -847.351, -1.3, -1559.3448) + floor(108.442));
                    if (_GLF_DEAD(false)) {
                        {
                            break;
                        }
                    }
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                        {
                            ivec2 GLF_live13p = _GLF_FUZZED((ivec2(-95014, 18416) & ivec2(63477, 12927)));
                            {
                                int GLF_live13looplimiter1 = 0;
                                while (GLF_live13p.x > 15) {
                                    if (GLF_live13looplimiter1 >= 6) {
                                        break;
                                    }
                                    GLF_live13looplimiter1++;
                                    {
                                        GLF_live13p.x -= 16;
                                    }
                                }
                            }
                        }
                    }
                    {
                        ivec2 GLF_live13p = _GLF_FUZZED((-ivec2(-71692, -2494)));
                        {
                            GLF_live13p.x = -GLF_live13p.x;
                        }
                    }
                }
            }
        }
    }
}

void mergeSort() {
    {
        {
            ;
        }
    }
    if (_GLF_DEAD(false)) {
        return;
    }
    _GLF_struct_0 _GLF_struct_replacement_0 = _GLF_struct_0(mat3x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), mat2x3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0), _GLF_struct_1(uvec3(1u, 1u, 1u), _GLF_struct_2(mat3x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), mat4x3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), mat3x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, _GLF_IDENTITY(1.0, (true ? 1.0 : _GLF_FUZZED(dot(GLF_dead6b_b, 6.9)))), 1.0, 1.0, 1.0)), mat3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), mat3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), bvec3(true, true, true)), mat4x2(1.0, 1.0, 1.0, 1.0, _GLF_IDENTITY(1.0, mix(float(_GLF_FUZZED(-15.50)), float(1.0), bool(true))), 1.0, 1.0, 1.0), mat2x3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0), _GLF_IDENTITY(0, (0 >> _GLF_IDENTITY(int(1), _GLF_IDENTITY(int(1), (int(1)) ^ 0))) + (_GLF_IDENTITY(0, max(0, 0)))), mat2(1.0, 1.0, 1.0, 1.0));
    if (_GLF_DEAD(false)) {
        return;
    }
    int high = _GLF_IDENTITY(N - 1, min(N - 1, N - 1));
    for (int m = 1; m <= high; m = _GLF_IDENTITY(2 * m, (_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)) ? (2 * m) : _GLF_FUZZED(m)))) {
        if (_GLF_DEAD(false)) {
            if (_GLF_DEAD(false)) {
                int donor_replacementGLF_dead10iteration = _GLF_FUZZED(((~m) ^ high));
                {
                    ;
                }
            }
            {
                if (_GLF_DEAD(false)) {
                    break;
                }
                ;
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                int donor_replacementGLF_dead11cols = _GLF_FUZZED(high);
                uint donor_replacementGLF_dead11matrix_number = _GLF_FUZZED((~72046u));
                {
                    for (int GLF_dead11rows = 2; GLF_dead11rows <= 4; GLF_dead11rows++) {
                        for (int GLF_dead11c = 0; GLF_dead11c < donor_replacementGLF_dead11cols; GLF_dead11c++) {
                            for (int GLF_dead11r = 0; GLF_dead11r < GLF_dead11rows; GLF_dead11r++) {
                                switch (donor_replacementGLF_dead11matrix_number) {
                                    case 0u:
                                        {
                                            int GLF_live12iteration = _GLF_FUZZED(ivec2(-51959, 55214).x);
                                            {
                                                ;
                                            }
                                        }
                                        GLF_dead11m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 2)] = GLF_dead11one;
                                        break;
                                    case 1u:
                                        GLF_dead11m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 3)] = GLF_dead11one;
                                        break;
                                    case 2u:
                                        GLF_dead11m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 4)] = GLF_dead11one;
                                        break;
                                    case 3u:
                                        GLF_dead11m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 2)] = GLF_dead11one;
                                        break;
                                    case 4u:
                                        GLF_dead11m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 3)] = GLF_dead11one;
                                        break;
                                    case 5u:
                                        GLF_dead11m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 4)] = GLF_dead11one;
                                        break;
                                    case 6u:
                                        GLF_dead11m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 2)] = GLF_dead11one;
                                        break;
                                        {
                                            {
                                                ;
                                            }
                                        }
                                    case 7u:
                                        GLF_dead11m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 3)] = GLF_dead11one;
                                        break;
                                    case 8u:
                                        GLF_dead11m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 4)] = GLF_dead11one;
                                        break;
                                }
                            }
                        }
                        donor_replacementGLF_dead11matrix_number = donor_replacementGLF_dead11matrix_number + 1u;
                        {
                            ivec2 GLF_live13p = _GLF_FUZZED(ivec2(20311, 77665));
                            if (GLF_live13p.x > 0) {
                                GLF_live13p.y--;
                            }
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
        if (_GLF_DEAD(false)) {
            return;
        }
        {
            vec2 GLF_live14color = _GLF_FUZZED(((-5045.6181) * vec2(-31.29, -8.2)));
            int GLF_live14i = _GLF_FUZZED(49901);
            vec3 GLF_live14vecCoor = _GLF_FUZZED(vec3(-64.55, -3.9, 7152.2616));
            if (int(GLF_live14gl_FragCoord[1]) < 150) {
                ;
            } else if (int(GLF_live14gl_FragCoord[1]) < 180) {
                GLF_live14color = fract(sin(GLF_live14vecCoor.yx - trunc(float(GLF_live14data[4]))));
                GLF_live14color[1] += asinh(GLF_live14gl_FragCoord.y * ldexp(GLF_live14color.y, -GLF_live14i));
                ;
            } else if (int(GLF_live14gl_FragCoord[1]) < 210) {
                GLF_live14color = fract(sin(GLF_live14vecCoor.yx - trunc(float(GLF_live14data[5]))));
                GLF_live14color.y -= tanh(GLF_live14color.x) / cosh(GLF_live14color.y);
                ;
            } else if (int(GLF_live14gl_FragCoord[1]) < 240) {
                GLF_live14color = fract(asinh(GLF_live14vecCoor.yx - trunc(float(GLF_live14data[6]))));
                GLF_live14color.y -= isnan(float(GLF_live14i)) ? tanh(GLF_live14gl_FragCoord.x) : atanh(GLF_live14gl_FragCoord.y);
                ;
            } else if (int(GLF_live14gl_FragCoord[1]) < 270) {
                GLF_live14color = fract(sin(GLF_live14vecCoor.yx - trunc(float(GLF_live14data[7]))));
                GLF_live14color.y *= mix(normalize(GLF_live14vecCoor), normalize(vec3(GLF_live14color, degrees(GLF_live14color.x))), GLF_live14injectionSwitch.x).y;
                ;
            } else {
                ;
            }
        }
        if (_GLF_DEAD(false)) {
            {
                GLF_dead11_GLF_color = vec4(vec3(0.0), 1.0);
            }
        }
        for (_GLF_struct_3 _GLF_struct_replacement_3 = _GLF_struct_3(mat4x3(1.0, 1.0, 1.0, _GLF_IDENTITY(1.0, (false ? _GLF_FUZZED(GLF_dead6b_b) : 1.0)), 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), _GLF_struct_replacement_0.low, bvec2(true, true), _GLF_struct_4(_GLF_struct_5(mat2(1.0, 1.0, 1.0, 1.0), uvec3(1u, 1u, 1u), uvec3(1u, 1u, 1u), 1.0, vec4(1.0, 1.0, 1.0, 1.0)), mat3x2(1.0, 1.0, 1.0, 1.0, 1.0, 1.0), _GLF_struct_6(mat4x3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), mat4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), mat4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), ivec2(1, 1), ivec2(1, 1), mat4x2(1.0, 1.0, 1.0, 1.0, _GLF_IDENTITY(1.0, (true ? 1.0 : _GLF_FUZZED(-341.748))), 1.0, 1.0, 1.0), 1.0)), vec4(1.0, 1.0, 1.0, 1.0), _GLF_struct_7(_GLF_struct_8(mat2x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), mat4x2(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), true), true, _GLF_struct_9(mat2(1.0, 1.0, 1.0, 1.0), 1u, mat3(1.0, 1.0, 1.0, 1.0, 1.0, _GLF_IDENTITY(1.0, max(_GLF_IDENTITY(1.0, max(1.0, 1.0)), _GLF_IDENTITY(1.0, mix(float(_GLF_FUZZED(7277.9627)), float(1.0), bool(true))))), 1.0, 1.0, 1.0), vec2(1.0, 1.0), vec2(1.0, 1.0)), bvec2(true, true), mat4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0))); _GLF_struct_replacement_3.i < high; _GLF_struct_replacement_3.i += 2 * m) {
            int from = _GLF_struct_replacement_3.i;
            int mid = _GLF_IDENTITY(_GLF_struct_replacement_3.i + m, max(_GLF_struct_replacement_3.i + m, _GLF_struct_replacement_3.i + m)) - 1;
            int to = min(_GLF_struct_replacement_3.i + 2 * m - 1, high);
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                {
                    ivec2 GLF_live13p = _GLF_FUZZED(ivec2(9972, -69848));
                    {
                        GLF_live13p.y++;
                    }
                }
                break;
                {
                    {
                        ;
                    }
                }
            }
            if (_GLF_DEAD(false)) {
                int donor_replacementGLF_dead11c = _GLF_FUZZED(min((mid | from), to));
                uint donor_replacementGLF_dead11matrix_number = _GLF_FUZZED(clamp(162030u, 167408u, 103884u));
                int donor_replacementGLF_dead11r = _GLF_FUZZED(from);
                {
                    switch (donor_replacementGLF_dead11matrix_number) {
                        case 0u:
                            GLF_dead11m22[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11c, 2)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11r, 2)] = GLF_dead11one;
                            break;
                        case 1u:
                            GLF_dead11m23[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11c, 2)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11r, 3)] = GLF_dead11one;
                            break;
                        case 2u:
                            GLF_dead11m24[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11c, 2)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11r, 4)] = GLF_dead11one;
                            break;
                        case 3u:
                            GLF_dead11m32[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11c, 3)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11r, 2)] = GLF_dead11one;
                            {
                                float GLF_live12x = _GLF_FUZZED((-(-1.3)));
                                float GLF_live12y = _GLF_FUZZED(((-6.5) - (-8.2)));
                                if (GLF_live12x * GLF_live12x + GLF_live12y * GLF_live12y > 4.0) {
                                    ;
                                }
                            }
                            break;
                        case 4u:
                            GLF_dead11m33[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11c, 3)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11r, 3)] = GLF_dead11one;
                            break;
                        case 5u:
                            GLF_dead11m34[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11c, 3)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11r, 4)] = GLF_dead11one;
                            break;
                        case 6u:
                            GLF_dead11m42[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11c, 4)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11r, 2)] = GLF_dead11one;
                            break;
                            {
                                {
                                    ;
                                }
                            }
                        case 7u:
                            GLF_dead11m43[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11c, 4)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11r, 3)] = GLF_dead11one;
                            break;
                        case 8u:
                            GLF_dead11m44[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11c, 4)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11r, 4)] = GLF_dead11one;
                            break;
                    }
                }
            }
            merge(from, mid, to);
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_IDENTITY(dot(vec3(1.0, 0.0, 1.0), vec3(0.0, 1.0, tan(0.0))), dot(vec3(1.0, 0.0, 1.0), vec3(0.0, 1.0, tan(0.0)))))))) {
                if (_GLF_DEAD(false)) {
                    discard;
                }
                vec2 donor_replacementGLF_dead5v = _GLF_FUZZED(vec2(-0.1, 72.65));
                if (length(donor_replacementGLF_dead5v) < 0.001) {
                    ;
                    {
                        {
                            ;
                        }
                    }
                }
            }
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < abs(0.0))))) {
            continue;
        }
        if (_GLF_DEAD(false)) {
            if (_GLF_DEAD(false)) {
                int donor_replacementGLF_dead11cols = _GLF_FUZZED(m);
                uint donor_replacementGLF_dead11matrix_number = _GLF_FUZZED(167107u);
                int donor_replacementGLF_dead11rows = _GLF_FUZZED((N >> N));
                for (int GLF_dead11c = 0; GLF_dead11c < donor_replacementGLF_dead11cols; GLF_dead11c++) {
                    for (int GLF_dead11r = 0; GLF_dead11r < donor_replacementGLF_dead11rows; GLF_dead11r++) {
                        switch (donor_replacementGLF_dead11matrix_number) {
                            case 0u:
                                GLF_dead11m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 2)] = GLF_dead11one;
                                break;
                            case 1u:
                                GLF_dead11m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 3)] = GLF_dead11one;
                                break;
                            case 2u:
                                GLF_dead11m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 4)] = GLF_dead11one;
                                break;
                            case 3u:
                                GLF_dead11m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 2)] = GLF_dead11one;
                                break;
                            case 4u:
                                GLF_dead11m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 3)] = GLF_dead11one;
                                break;
                            case 5u:
                                GLF_dead11m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 4)] = GLF_dead11one;
                                break;
                            case 6u:
                                GLF_dead11m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 2)] = GLF_dead11one;
                                break;
                            case 7u:
                                {
                                    {
                                        ;
                                    }
                                }
                                GLF_dead11m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 3)] = GLF_dead11one;
                                break;
                            case 8u:
                                GLF_dead11m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 4)] = GLF_dead11one;
                                break;
                        }
                    }
                }
            }
            if (_GLF_DEAD(false)) {
                break;
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                int donor_replacementGLF_dead10iteration = _GLF_FUZZED(((-31561) | (m % m)));
                {
                    ;
                }
            }
            {
                if (_GLF_DEAD(false)) {
                    float donor_replacementGLF_dead10c_im = _GLF_FUZZED(GLF_dead6b_b);
                    float donor_replacementGLF_dead10c_re = _GLF_FUZZED(GLF_dead6b_b);
                    {
                        float GLF_live12c_im = _GLF_FUZZED((+7441.6858));
                        float GLF_live12c_re = _GLF_FUZZED((2.8));
                        int GLF_live12iteration = _GLF_FUZZED(-57550);
                        int GLF_live12looplimiter0 = 0;
                        float GLF_live12x = _GLF_FUZZED((-4758.6612));
                        float GLF_live12y = _GLF_FUZZED((((-6052.3026) + (-0.0))));
                        for (int GLF_live12k = 0; GLF_live12k < 1000; GLF_live12k++) {
                            if (GLF_live12looplimiter0 >= 7) {
                                break;
                            }
                            GLF_live12looplimiter0++;
                            {
                                if (GLF_live12x * GLF_live12x + GLF_live12y * GLF_live12y > 4.0) {
                                    break;
                                }
                                float GLF_live12x_new = GLF_live12x * GLF_live12x - GLF_live12y * GLF_live12y + GLF_live12c_re;
                                GLF_live12y = 2.0 * GLF_live12x * GLF_live12y + GLF_live12c_im;
                                GLF_live12x = GLF_live12x_new;
                                GLF_live12iteration++;
                            }
                        }
                    }
                    int donor_replacementGLF_dead10iteration = _GLF_FUZZED(((-86331) ^ (bitfieldExtract(N, -27194, m) ^ high)));
                    float donor_replacementGLF_dead10x = _GLF_FUZZED(mod(GLF_dead6b_b, -523.476));
                    float donor_replacementGLF_dead10y = _GLF_FUZZED(((-2148.8617) + cosh(GLF_dead6b_b)));
                    {
                        if (donor_replacementGLF_dead10x * donor_replacementGLF_dead10x + donor_replacementGLF_dead10y * donor_replacementGLF_dead10y > 4.0) {
                            break;
                        }
                        float GLF_dead10x_new = donor_replacementGLF_dead10x * donor_replacementGLF_dead10x - donor_replacementGLF_dead10y * donor_replacementGLF_dead10y + donor_replacementGLF_dead10c_re;
                        donor_replacementGLF_dead10y = 2.0 * donor_replacementGLF_dead10x * donor_replacementGLF_dead10y + donor_replacementGLF_dead10c_im;
                        donor_replacementGLF_dead10x = GLF_dead10x_new;
                        donor_replacementGLF_dead10iteration++;
                    }
                }
                ;
            }
        }
    }
    {
        if (_GLF_DEAD(false)) {
            int donor_replacementGLF_dead4c_im = _GLF_FUZZED(bitfieldInsert(N, N, abs(findLSB(110205u)), 29524));
            int donor_replacementGLF_dead4c_re = _GLF_FUZZED((N % N));
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(-33.87, -67.54, 1.2, -686.412);
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            int donor_replacementGLF_dead4iteration = _GLF_FUZZED(bitCount(10875u));
            int donor_replacementGLF_dead4x = _GLF_FUZZED(_GLF_IDENTITY(41631, max(41631, 41631)));
            int donor_replacementGLF_dead4y = _GLF_FUZZED(high);
            {
                if (donor_replacementGLF_dead4x * donor_replacementGLF_dead4x + donor_replacementGLF_dead4y * donor_replacementGLF_dead4y > 262144) {
                    ;
                }
                int GLF_dead4x_new = ((donor_replacementGLF_dead4x * donor_replacementGLF_dead4x - donor_replacementGLF_dead4y * donor_replacementGLF_dead4y) / 256 + donor_replacementGLF_dead4c_re);
                donor_replacementGLF_dead4y = (2 * donor_replacementGLF_dead4x * donor_replacementGLF_dead4y / 256 + donor_replacementGLF_dead4c_im);
                donor_replacementGLF_dead4x = GLF_dead4x_new;
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    uint donor_replacementGLF_dead11matrix_number = _GLF_FUZZED(190502u);
                    for (int GLF_dead11cols = 2; GLF_dead11cols <= 4; GLF_dead11cols++) {
                        for (int GLF_dead11rows = 2; GLF_dead11rows <= 4; GLF_dead11rows++) {
                            for (int GLF_dead11c = 0; GLF_dead11c < GLF_dead11cols; GLF_dead11c++) {
                                for (int GLF_dead11r = 0; GLF_dead11r < GLF_dead11rows; GLF_dead11r++) {
                                    switch (donor_replacementGLF_dead11matrix_number) {
                                        case 0u:
                                            GLF_dead11m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 2)] = GLF_dead11one;
                                            break;
                                        case 1u:
                                            GLF_dead11m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 3)] = GLF_dead11one;
                                            break;
                                        case 2u:
                                            GLF_dead11m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 4)] = GLF_dead11one;
                                            break;
                                        case 3u:
                                            GLF_dead11m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 2)] = GLF_dead11one;
                                            break;
                                        case 4u:
                                            GLF_dead11m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 3)] = GLF_dead11one;
                                            break;
                                        case 5u:
                                            GLF_dead11m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 4)] = GLF_dead11one;
                                            break;
                                        case 6u:
                                            GLF_dead11m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 2)] = GLF_dead11one;
                                            {
                                                ivec2 GLF_live13p = _GLF_FUZZED(ivec2(-26889, -78034));
                                                {
                                                    int GLF_live13looplimiter1 = 0;
                                                    while (GLF_live13p.x > 15) {
                                                        if (GLF_live13looplimiter1 >= 6) {
                                                            break;
                                                        }
                                                        GLF_live13looplimiter1++;
                                                        {
                                                            GLF_live13p.x -= 16;
                                                        }
                                                    }
                                                }
                                            }
                                            break;
                                        case 7u:
                                            GLF_dead11m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 3)] = GLF_dead11one;
                                            break;
                                        case 8u:
                                            {
                                                int GLF_live14i = _GLF_FUZZED((~(-21980)));
                                                int GLF_live14j = _GLF_FUZZED(-78671);
                                                int GLF_live14k = _GLF_FUZZED(-41717);
                                                {
                                                    if (GLF_live14data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14i, 10)] < GLF_live14data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14j, 10)]) {
                                                        GLF_live14temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14k++, 10)] = GLF_live14data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14i++, 10)];
                                                    } else {
                                                        GLF_live14temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14k++, 10)] = GLF_live14data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14j++, 10)];
                                                    }
                                                }
                                            }
                                            GLF_dead11m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 4)] = GLF_dead11one;
                                            break;
                                    }
                                }
                            }
                            {
                                int GLF_live14i = _GLF_FUZZED(91368);
                                {
                                    int GLF_live14looplimiter5 = 0;
                                    do {
                                        if (GLF_live14looplimiter5 >= 6) {
                                            break;
                                        }
                                        GLF_live14looplimiter5++;
                                        {
                                            switch (GLF_live14i) {
                                                case 0:
                                                    GLF_live14data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14i, 10)] = 4;
                                                    break;
                                                case 1:
                                                    GLF_live14data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14i, 10)] = 3;
                                                    break;
                                                case 2:
                                                    GLF_live14data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14i, 10)] = 2;
                                                    break;
                                                case 3:
                                                    GLF_live14data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14i, 10)] = 1;
                                                    break;
                                                case 4:
                                                    GLF_live14data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14i, 10)] = 0;
                                                    break;
                                                case 5:
                                                    GLF_live14data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14i, 10)] = -1;
                                                    break;
                                                case 6:
                                                    GLF_live14data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14i, 10)] = -2;
                                                    break;
                                                case 7:
                                                    GLF_live14data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14i, 10)] = -3;
                                                    break;
                                                case 8:
                                                    GLF_live14data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14i, 10)] = -4;
                                                    break;
                                                case 9:
                                                    GLF_live14data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14i, 10)] = -5;
                                                    break;
                                            }
                                            GLF_live14i++;
                                        }
                                    } while (GLF_live14i < 10);
                                }
                            }
                            donor_replacementGLF_dead11matrix_number = donor_replacementGLF_dead11matrix_number + 1u;
                        }
                    }
                }
                donor_replacementGLF_dead4iteration++;
            }
        }
        vec4 _GLF_outVarBackup_GLF_color;
        if (_GLF_DEAD(false)) {
            float donor_replacementGLF_dead5th = _GLF_FUZZED(2.5);
            {
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    return;
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    uint donor_replacementGLF_dead11matrix_number = _GLF_FUZZED(bitfieldReverse(181642u));
                    for (int GLF_dead11cols = 2; GLF_dead11cols <= 4; GLF_dead11cols++) {
                        for (int GLF_dead11rows = 2; GLF_dead11rows <= 4; GLF_dead11rows++) {
                            for (int GLF_dead11c = 0; GLF_dead11c < GLF_dead11cols; GLF_dead11c++) {
                                for (int GLF_dead11r = 0; GLF_dead11r < GLF_dead11rows; GLF_dead11r++) {
                                    switch (donor_replacementGLF_dead11matrix_number) {
                                        case 0u:
                                            GLF_dead11m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 2)] = GLF_dead11one;
                                            break;
                                        case 1u:
                                            GLF_dead11m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 3)] = GLF_dead11one;
                                            break;
                                        case 2u:
                                            GLF_dead11m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 4)] = GLF_dead11one;
                                            {
                                                int GLF_live13looplimiter1 = 0;
                                                ivec2 GLF_live13p = _GLF_FUZZED(ivec2(-6000, -21684));
                                                while (GLF_live13p.x > 15) {
                                                    if (GLF_live13looplimiter1 >= 6) {
                                                        break;
                                                    }
                                                    GLF_live13looplimiter1++;
                                                    {
                                                        GLF_live13p.x -= 16;
                                                    }
                                                }
                                            }
                                            break;
                                        case 3u:
                                            GLF_dead11m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 2)] = GLF_dead11one;
                                            break;
                                        case 4u:
                                            GLF_dead11m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 3)] = GLF_dead11one;
                                            break;
                                        case 5u:
                                            GLF_dead11m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 4)] = GLF_dead11one;
                                            break;
                                        case 6u:
                                            GLF_dead11m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 2)] = GLF_dead11one;
                                            {
                                                {
                                                    ;
                                                }
                                            }
                                            break;
                                        case 7u:
                                            GLF_dead11m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 3)] = GLF_dead11one;
                                            break;
                                        case 8u:
                                            GLF_dead11m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 4)] = GLF_dead11one;
                                            break;
                                    }
                                }
                            }
                            {
                                {
                                    ;
                                }
                            }
                            donor_replacementGLF_dead11matrix_number = donor_replacementGLF_dead11matrix_number + 1u;
                        }
                    }
                    {
                        int GLF_live15looplimiter1 = 0;
                        if (GLF_live15looplimiter1 >= 5) {
                            ;
                        }
                    }
                }
                _GLF_IDENTITY(donor_replacementGLF_dead5th = 0.5 - donor_replacementGLF_dead5th, 0.0 + (donor_replacementGLF_dead5th = 0.5 - donor_replacementGLF_dead5th));
            }
        }
        _GLF_outVarBackup_GLF_color = _GLF_color;
        _GLF_color = dFdxFine(vec4(-5.1, -571.187, 256.650, -3.9));
        if (_GLF_DEAD(false)) {
            {
                discard;
            }
        }
        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < length(vec4(0.0, 0.0, 0.0, 0.0)))))) {
            int donor_replacementGLF_dead9i = _GLF_FUZZED(N);
            if (donor_replacementGLF_dead9i < int(GLF_dead9gl_FragCoord.x)) {
                ;
            }
        }
        if (_GLF_DEAD(false)) {
            {
                ivec2 GLF_live13p = _GLF_FUZZED(ivec2(-82098, 25626));
                {
                    GLF_live13p.x = -GLF_live13p.x;
                }
            }
            {
                ;
            }
        }
    }
}

void main() {
    if (_GLF_DEAD(false)) {
        bool donor_replacementGLF_dead6c5 = _GLF_FUZZED(false);
        if (_GLF_DEAD(false)) {
            {
                {
                    ;
                }
            }
            {
                GLF_dead11_GLF_color = vec4(vec3(0.0), 1.0);
            }
        }
        int donor_replacementGLF_dead6msb8 = _GLF_FUZZED((abs(_GLF_IDENTITY(37899, min(37899, _GLF_IDENTITY(37899, (37899) - 0)))) ^ (-12044)));
        vec2 donor_replacementGLF_dead6pos = _GLF_FUZZED(dFdyFine(vec2(-4.2, 254.854)));
        vec3 donor_replacementGLF_dead6setting = _GLF_FUZZED(vec3(-1721.2609, 0.1, -70.47));
        if (!donor_replacementGLF_dead6c5) {
            ;
        }
    }
    if (_GLF_DEAD(false)) {
        return;
    }
    int i = int(injectionSwitch.x);
    {
        {
            ;
        }
    }
    {
        {
            {
                ;
            }
        }
        vec4 _GLF_outVarBackup_GLF_color;
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            return;
        }
        _GLF_outVarBackup_GLF_color = _GLF_color;
        _GLF_color = vec4(-7.2, 87.67, vec4(-7.1, -182.606, -7.5, 57.72).br);
        if (_GLF_DEAD(false)) {
            return;
        }
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
    }
    if (_GLF_DEAD(false)) {
        {
            int GLF_live13looplimiter0 = 0;
            ivec2 GLF_live13p = _GLF_FUZZED(ivec2(4700, 45757));
            {
                if (GLF_live13looplimiter0 >= 6) {
                    ;
                }
                GLF_live13looplimiter0++;
                {
                    GLF_live13p = GLF_live13iter(GLF_live13p);
                }
            }
        }
        return;
    }
    if (_GLF_DEAD(false)) {
        uint donor_replacementGLF_dead11matrix_number = _GLF_FUZZED(uint(false));
        int donor_replacementGLF_dead11r = _GLF_FUZZED((48422 >> N));
        {
            switch (donor_replacementGLF_dead11matrix_number) {
                case 0u:
                    GLF_dead11m22[_GLF_MAKE_IN_BOUNDS_INT(i, 2)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11r, 2)] = GLF_dead11one;
                    break;
                case 1u:
                    GLF_dead11m23[_GLF_MAKE_IN_BOUNDS_INT(i, 2)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11r, 3)] = GLF_dead11one;
                    break;
                case 2u:
                    GLF_dead11m24[_GLF_MAKE_IN_BOUNDS_INT(i, 2)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11r, 4)] = GLF_dead11one;
                    break;
                case 3u:
                    GLF_dead11m32[_GLF_MAKE_IN_BOUNDS_INT(i, 3)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11r, 2)] = GLF_dead11one;
                    break;
                case 4u:
                    GLF_dead11m33[_GLF_MAKE_IN_BOUNDS_INT(i, 3)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11r, 3)] = GLF_dead11one;
                    break;
                case 5u:
                    GLF_dead11m34[_GLF_MAKE_IN_BOUNDS_INT(i, 3)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11r, 4)] = GLF_dead11one;
                    break;
                case 6u:
                    GLF_dead11m42[_GLF_MAKE_IN_BOUNDS_INT(i, 4)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11r, 2)] = GLF_dead11one;
                    break;
                case 7u:
                    GLF_dead11m43[_GLF_MAKE_IN_BOUNDS_INT(i, 4)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11r, 3)] = GLF_dead11one;
                    {
                        int GLF_live14i = _GLF_FUZZED(-10581);
                        int GLF_live14k = _GLF_FUZZED(((-74713) * 11497));
                        int GLF_live14looplimiter1 = 0;
                        {
                            if (GLF_live14looplimiter1 >= 6) {
                                ;
                            }
                            GLF_live14looplimiter1++;
                            {
                                GLF_live14temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14k++, 10)] = GLF_live14data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14i++, 10)];
                            }
                        }
                    }
                    break;
                case 8u:
                    GLF_dead11m44[_GLF_MAKE_IN_BOUNDS_INT(i, 4)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11r, 4)] = GLF_dead11one;
                    break;
            }
        }
    }
    do {
        {
            int GLF_live14high = _GLF_FUZZED(ivec3(4135, -22297, -31714).b);
            int GLF_live14looplimiter3 = 0;
            int GLF_live14low = _GLF_FUZZED((88029 | (-15551)));
            int GLF_live14m = _GLF_FUZZED(83621);
            for (int GLF_live14i = GLF_live14low; GLF_live14i < GLF_live14high; GLF_live14i += 2 * GLF_live14m) {
                if (GLF_live14looplimiter3 >= 6) {
                    break;
                }
                GLF_live14looplimiter3++;
                {
                    int GLF_live14from = GLF_live14i;
                    int GLF_live14mid = GLF_live14i + GLF_live14m - 1;
                    int GLF_live14to = min(GLF_live14i + 2 * GLF_live14m - 1, GLF_live14high);
                    GLF_live14merge(GLF_live14from, GLF_live14mid, GLF_live14to);
                }
            }
        }
        switch (i) {
            case 0:
                if (_GLF_DEAD(false)) {
                    return;
                    if (_GLF_DEAD(false)) {
                        return;
                    }
                }
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(-5925.5949, 92.36, -7670.3589, 9371.2517);
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                data[i] = 4;
                break;
            case 1:
                data[i] = 3;
                if (_GLF_DEAD(false)) {
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        int donor_replacementGLF_dead11cols = _GLF_FUZZED(findMSB(33468u));
                        uint donor_replacementGLF_dead11matrix_number = _GLF_FUZZED(bitfieldReverse((true ? 126318u : 180667u)));
                        int donor_replacementGLF_dead11rows = _GLF_FUZZED((i ^ N));
                        for (int GLF_dead11c = 0; GLF_dead11c < donor_replacementGLF_dead11cols; GLF_dead11c++) {
                            for (int GLF_dead11r = 0; GLF_dead11r < donor_replacementGLF_dead11rows; GLF_dead11r++) {
                                switch (donor_replacementGLF_dead11matrix_number) {
                                    case 0u:
                                        GLF_dead11m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 2)] = GLF_dead11one;
                                        break;
                                        {
                                            int GLF_live12looplimiter1 = 0;
                                            if (GLF_live12looplimiter1 >= 7) {
                                                ;
                                            }
                                        }
                                    case 1u:
                                        GLF_dead11m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 3)] = GLF_dead11one;
                                        break;
                                        {
                                            float GLF_live12c_im = _GLF_FUZZED(1532.9470);
                                            float GLF_live12c_re = _GLF_FUZZED(4764.2650);
                                            int GLF_live12iteration = _GLF_FUZZED(55914);
                                            int GLF_live12looplimiter0 = 0;
                                            float GLF_live12x = _GLF_FUZZED(float(133588u));
                                            float GLF_live12y = _GLF_FUZZED((true ? (-5.3) : 47.51));
                                            {
                                                if (GLF_live12looplimiter0 >= 7) {
                                                    ;
                                                }
                                                GLF_live12looplimiter0++;
                                                {
                                                    if (GLF_live12x * GLF_live12x + GLF_live12y * GLF_live12y > 4.0) {
                                                        ;
                                                    }
                                                    float GLF_live12x_new = GLF_live12x * GLF_live12x - GLF_live12y * GLF_live12y + GLF_live12c_re;
                                                    GLF_live12y = 2.0 * GLF_live12x * GLF_live12y + GLF_live12c_im;
                                                    GLF_live12x = GLF_live12x_new;
                                                    GLF_live12iteration++;
                                                }
                                            }
                                        }
                                    case 2u:
                                        GLF_dead11m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 4)] = GLF_dead11one;
                                        break;
                                    case 3u:
                                        GLF_dead11m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 2)] = GLF_dead11one;
                                        break;
                                        {
                                            ivec2 GLF_live13p = _GLF_FUZZED(ivec2(73090, 78190));
                                            if (GLF_live13p.x < 0) {
                                                GLF_live13p.x = -GLF_live13p.x;
                                            }
                                        }
                                    case 4u:
                                        GLF_dead11m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 3)] = GLF_dead11one;
                                        break;
                                    case 5u:
                                        GLF_dead11m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 4)] = GLF_dead11one;
                                        break;
                                    case 6u:
                                        GLF_dead11m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 2)] = GLF_dead11one;
                                        break;
                                    case 7u:
                                        GLF_dead11m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 3)] = GLF_dead11one;
                                        break;
                                    case 8u:
                                        GLF_dead11m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 4)] = GLF_dead11one;
                                        break;
                                }
                            }
                        }
                    }
                    return;
                }
                break;
            case 2:
                {
                    {
                        ;
                    }
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    {
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            if (_GLF_DEAD(false)) {
                                {
                                    GLF_dead11_GLF_color = vec4(vec3(0.0), 1.0);
                                }
                            }
                            _GLF_color = vec4(5.1, -297.735, -2.1, 64.55);
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < sin(0.0))))) {
                                    continue;
                                    {
                                        int GLF_live13looplimiter0 = 0;
                                        if (GLF_live13looplimiter0 >= 6) {
                                            ;
                                        }
                                    }
                                }
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                            {
                                int GLF_live15looplimiter1 = 0;
                                if (GLF_live15looplimiter1 >= 5) {
                                    ;
                                }
                            }
                        }
                        ;
                    }
                    if (_GLF_DEAD(false)) {
                        discard;
                    }
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(-56.49, -4158.0627, -26.08, 5511.3203);
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                }
                {
                    int GLF_live12iteration = _GLF_FUZZED(79068);
                    float GLF_live12xCoord = _GLF_FUZZED((false ? (-312.797) : 2703.6583));
                    float GLF_live12yCoord = _GLF_FUZZED(-7959.9921);
                    if (GLF_live12iteration < 1000) {
                        ;
                    } else {
                        ;
                    }
                }
                data[i] = 2;
                if (_GLF_DEAD(false)) {
                    discard;
                }
                break;
                {
                    float GLF_live2x2 = _GLF_FUZZED(19.87);
                    if (GLF_live2x2 <= -0.9 && GLF_live2x2 >= -1.1) {
                        GLF_live2_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
                    } else {
                        if (_GLF_DEAD(false)) {
                            float donor_replacementGLF_dead10c_im = _GLF_FUZZED(GLF_dead6b_b);
                            float donor_replacementGLF_dead10c_re = _GLF_FUZZED((bvec2(false, false), GLF_dead6b_b));
                            int donor_replacementGLF_dead10iteration = _GLF_FUZZED(58611);
                            float donor_replacementGLF_dead10y = _GLF_FUZZED(length(GLF_live2_GLF_color));
                            for (int GLF_dead10k = 0; GLF_dead10k < 1000; GLF_dead10k++) {
                                if (GLF_dead6b_b * GLF_dead6b_b + donor_replacementGLF_dead10y * donor_replacementGLF_dead10y > 4.0) {
                                    {
                                        int GLF_live13looplimiter0 = 0;
                                        if (GLF_live13looplimiter0 >= 6) {
                                            ;
                                        }
                                    }
                                    break;
                                }
                                float GLF_dead10x_new = GLF_dead6b_b * GLF_dead6b_b - donor_replacementGLF_dead10y * donor_replacementGLF_dead10y + donor_replacementGLF_dead10c_re;
                                donor_replacementGLF_dead10y = 2.0 * GLF_dead6b_b * donor_replacementGLF_dead10y + donor_replacementGLF_dead10c_im;
                                GLF_dead6b_b = GLF_dead10x_new;
                                donor_replacementGLF_dead10iteration++;
                            }
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < log(1.0))))) {
                            int donor_replacementGLF_dead7m = _GLF_FUZZED(_GLF_IDENTITY(i, _GLF_IDENTITY(int(_GLF_IDENTITY(ivec3(i, 1, int(_GLF_ZERO(0.0, injectionSwitch.x))), ~(~(ivec3(i, 1, int(_GLF_ZERO(0.0, injectionSwitch.x))))))), (int(_GLF_IDENTITY(ivec3(i, 1, int(_GLF_ZERO(0.0, injectionSwitch.x))), ~(~(ivec3(i, 1, int(_GLF_ZERO(0.0, injectionSwitch.x)))))))) | (int(_GLF_IDENTITY(ivec3(i, 1, int(_GLF_ZERO(0.0, injectionSwitch.x))), ~(~(ivec3(i, 1, int(_GLF_ZERO(0.0, injectionSwitch.x)))))))))));
                            {
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    int donor_replacementGLF_dead10iteration = _GLF_FUZZED((i + 30198));
                                    {
                                        {
                                            vec2 GLF_live14color = _GLF_FUZZED(((mat4x2(-3.1, 0.9, 4.8, -4.0, -583.623, -3689.2407, 1.4, -627.603) + mat4x2(1.8, -6.3, 148.942, -199.143, 5.5, 8.0, 498.360, 3646.7252)) * vec4(-8.0, -6.4, -415.903, -31.28)));
                                            int GLF_live14i = _GLF_FUZZED(81209);
                                            vec3 GLF_live14vecCoor = _GLF_FUZZED(vec3(-3.7, -38.09, -1032.5350));
                                            if (int(GLF_live14gl_FragCoord[1]) < 180) {
                                                GLF_live14color = fract(sin(GLF_live14vecCoor.yx - trunc(float(GLF_live14data[4]))));
                                                GLF_live14color[1] += asinh(GLF_live14gl_FragCoord.y * ldexp(GLF_live14color.y, -GLF_live14i));
                                                ;
                                            } else if (int(GLF_live14gl_FragCoord[1]) < 210) {
                                                GLF_live14color = fract(sin(GLF_live14vecCoor.yx - trunc(float(GLF_live14data[5]))));
                                                GLF_live14color.y -= tanh(GLF_live14color.x) / cosh(GLF_live14color.y);
                                                ;
                                            } else if (int(GLF_live14gl_FragCoord[1]) < 240) {
                                                GLF_live14color = fract(asinh(GLF_live14vecCoor.yx - trunc(float(GLF_live14data[6]))));
                                                GLF_live14color.y -= isnan(float(GLF_live14i)) ? tanh(GLF_live14gl_FragCoord.x) : atanh(GLF_live14gl_FragCoord.y);
                                                ;
                                            } else if (int(GLF_live14gl_FragCoord[1]) < 270) {
                                                GLF_live14color = fract(sin(GLF_live14vecCoor.yx - trunc(float(GLF_live14data[7]))));
                                                GLF_live14color.y *= mix(normalize(GLF_live14vecCoor), normalize(vec3(GLF_live14color, degrees(GLF_live14color.x))), GLF_live14injectionSwitch.x).y;
                                                ;
                                            } else {
                                                ;
                                            }
                                        }
                                        ;
                                    }
                                }
                                ;
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = vec4(98.39, -60.56, -15.23, 2.2);
                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                        {
                                            break;
                                        }
                                    }
                                    {
                                        int GLF_live14from = _GLF_FUZZED(-17580);
                                        int GLF_live14looplimiter2 = 0;
                                        int GLF_live14to = _GLF_FUZZED((25576 * 28010));
                                        for (int GLF_live14i = GLF_live14from; GLF_live14i <= GLF_live14to; GLF_live14i++) {
                                            if (GLF_live14looplimiter2 >= 6) {
                                                break;
                                            }
                                            GLF_live14looplimiter2++;
                                            {
                                                GLF_live14data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14i, 10)] = GLF_live14temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14i, 10)];
                                            }
                                        }
                                    }
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                            break;
                                        }
                                        {
                                            vec2 GLF_live14color = _GLF_FUZZED((mat3x2(5.5, 625.627, 737.329, -3.0, -4750.4540, -81.12) * vec3(-67.27, -7658.2019, -1118.6369)));
                                            int GLF_live14i = _GLF_FUZZED((~59712));
                                            int GLF_live14looplimiter7 = 0;
                                            vec3 GLF_live14vecCoor = _GLF_FUZZED(vec2((+(-7.2))).yyy);
                                            {
                                                if (GLF_live14looplimiter7 >= 6) {
                                                    ;
                                                }
                                                GLF_live14looplimiter7++;
                                                {
                                                    if (int(GLF_live14gl_FragCoord[1]) < 30) {
                                                        GLF_live14color = fract(sin(GLF_live14vecCoor.yx - trunc(float(GLF_live14data[0]))));
                                                        GLF_live14color[0] = dFdy(GLF_live14gl_FragCoord.y);
                                                        ;
                                                    } else if (int(GLF_live14gl_FragCoord[1]) < 60) {
                                                        GLF_live14color = fract(sin(GLF_live14vecCoor.yx - trunc(float(GLF_live14data[1]))));
                                                        GLF_live14color[1] *= atan(faceforward(GLF_live14injectionSwitch, GLF_live14color.xx, GLF_live14vecCoor.yx).y);
                                                        ;
                                                    } else if (int(GLF_live14gl_FragCoord[1]) < 90) {
                                                        GLF_live14color = fract(sin(GLF_live14vecCoor.yx - trunc(float(GLF_live14data[2]))));
                                                        GLF_live14color.x += atanh(GLF_live14color.x) * cosh(GLF_live14injectionSwitch.y) * smoothstep(GLF_live14color, GLF_live14injectionSwitch, GLF_live14gl_FragCoord.yy).x;
                                                        ;
                                                    } else if (int(GLF_live14gl_FragCoord[1]) < 120) {
                                                        GLF_live14color = fract(acosh(clamp(GLF_live14vecCoor.yx - trunc(float(GLF_live14data[3])), 1.0, 1000.0)));
                                                        GLF_live14color.x += (isnan(GLF_live14gl_FragCoord.x) ? log2(GLF_live14gl_FragCoord.x) : log2(GLF_live14gl_FragCoord.y));
                                                        ;
                                                    } else if (int(GLF_live14gl_FragCoord[1]) < 150) {
                                                        ;
                                                    } else if (int(GLF_live14gl_FragCoord[1]) < 180) {
                                                        GLF_live14color = fract(sin(GLF_live14vecCoor.yx - trunc(float(GLF_live14data[4]))));
                                                        GLF_live14color[1] += asinh(GLF_live14gl_FragCoord.y * ldexp(GLF_live14color.y, -GLF_live14i));
                                                        ;
                                                    } else if (int(GLF_live14gl_FragCoord[1]) < 210) {
                                                        GLF_live14color = fract(sin(GLF_live14vecCoor.yx - trunc(float(GLF_live14data[5]))));
                                                        GLF_live14color.y -= tanh(GLF_live14color.x) / cosh(GLF_live14color.y);
                                                        ;
                                                    } else if (int(GLF_live14gl_FragCoord[1]) < 240) {
                                                        GLF_live14color = fract(asinh(GLF_live14vecCoor.yx - trunc(float(GLF_live14data[6]))));
                                                        GLF_live14color.y -= isnan(float(GLF_live14i)) ? tanh(GLF_live14gl_FragCoord.x) : atanh(GLF_live14gl_FragCoord.y);
                                                        ;
                                                    } else if (int(GLF_live14gl_FragCoord[1]) < 270) {
                                                        GLF_live14color = fract(sin(GLF_live14vecCoor.yx - trunc(float(GLF_live14data[7]))));
                                                        GLF_live14color.y *= mix(normalize(GLF_live14vecCoor), normalize(vec3(GLF_live14color, degrees(GLF_live14color.x))), GLF_live14injectionSwitch.x).y;
                                                        ;
                                                    } else {
                                                        ;
                                                    }
                                                }
                                            }
                                        }
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                        if (_GLF_DEAD(false)) {
                                            break;
                                        }
                                    }
                                }
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    int donor_replacementGLF_dead11c = _GLF_FUZZED(N);
                                    uint donor_replacementGLF_dead11matrix_number = _GLF_FUZZED(packHalf2x16(vec2(-2.4, 1.3)));
                                    int donor_replacementGLF_dead11rows = _GLF_FUZZED(clamp(N, donor_replacementGLF_dead7m, N));
                                    for (int GLF_dead11r = 0; GLF_dead11r < donor_replacementGLF_dead11rows; GLF_dead11r++) {
                                        switch (donor_replacementGLF_dead11matrix_number) {
                                            case 0u:
                                                GLF_dead11m22[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 2)] = GLF_dead11one;
                                                break;
                                            case 1u:
                                                GLF_dead11m23[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 3)] = GLF_dead11one;
                                                break;
                                            case 2u:
                                                GLF_dead11m24[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 4)] = GLF_dead11one;
                                                break;
                                                {
                                                    {
                                                        ;
                                                    }
                                                }
                                            case 3u:
                                                GLF_dead11m32[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 2)] = GLF_dead11one;
                                                break;
                                            case 4u:
                                                GLF_dead11m33[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 3)] = GLF_dead11one;
                                                break;
                                            case 5u:
                                                GLF_dead11m34[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 4)] = GLF_dead11one;
                                                break;
                                            case 6u:
                                                GLF_dead11m42[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 2)] = GLF_dead11one;
                                                break;
                                            case 7u:
                                                GLF_dead11m43[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 3)] = GLF_dead11one;
                                                break;
                                            case 8u:
                                                GLF_dead11m44[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 4)] = GLF_dead11one;
                                                break;
                                        }
                                    }
                                }
                            }
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            break;
                        }
                        GLF_live2_GLF_color = vec4(0.0, 1.0, 0.0, 1.0);
                        if (_GLF_DEAD(false)) {
                            bool donor_replacementGLF_dead6c7 = _GLF_FUZZED(false);
                            int donor_replacementGLF_dead6msb8 = _GLF_FUZZED(i);
                            {
                                int GLF_live14i = _GLF_FUZZED(-81285);
                                {
                                    int GLF_live14looplimiter5 = 0;
                                    do {
                                        if (GLF_live14looplimiter5 >= 6) {
                                            break;
                                        }
                                        GLF_live14looplimiter5++;
                                        {
                                            switch (GLF_live14i) {
                                                case 0:
                                                    GLF_live14data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14i, 10)] = 4;
                                                    break;
                                                case 1:
                                                    GLF_live14data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14i, 10)] = 3;
                                                    break;
                                                case 2:
                                                    GLF_live14data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14i, 10)] = 2;
                                                    break;
                                                case 3:
                                                    GLF_live14data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14i, 10)] = 1;
                                                    break;
                                                case 4:
                                                    GLF_live14data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14i, 10)] = 0;
                                                    break;
                                                case 5:
                                                    GLF_live14data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14i, 10)] = -1;
                                                    break;
                                                case 6:
                                                    GLF_live14data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14i, 10)] = -2;
                                                    break;
                                                case 7:
                                                    GLF_live14data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14i, 10)] = -3;
                                                    break;
                                                case 8:
                                                    GLF_live14data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14i, 10)] = -4;
                                                    break;
                                                case 9:
                                                    GLF_live14data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14i, 10)] = -5;
                                                    break;
                                            }
                                            GLF_live14i++;
                                        }
                                    } while (GLF_live14i < 10);
                                }
                            }
                            if (_GLF_DEAD(false)) {
                                continue;
                            }
                            vec2 donor_replacementGLF_dead6pos = _GLF_FUZZED(injectionSwitch);
                            {
                                int GLF_live13looplimiter1 = 0;
                                ivec2 GLF_live13p = _GLF_FUZZED(ivec2(-2494, 27678));
                                while (GLF_live13p.x > 15) {
                                    if (GLF_live13looplimiter1 >= 6) {
                                        break;
                                    }
                                    GLF_live13looplimiter1++;
                                    {
                                        GLF_live13p.x -= 16;
                                    }
                                }
                            }
                            vec3 donor_replacementGLF_dead6setting = _GLF_FUZZED(vec3(-77.77, -588.740, 193.084));
                            if (!donor_replacementGLF_dead6c7) {
                                ;
                            }
                        }
                    }
                }
                if (_GLF_DEAD(false)) {
                    {
                        GLF_dead11_GLF_color = vec4(vec3(0.0), 1.0);
                    }
                }
            case 3:
                data[i] = 1;
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_IDENTITY(dot(vec4(0.0, 0.0, 0.0, 1.0), vec4(1.0, 1.0, 1.0, 0.0)), dot(vec4(0.0, 0.0, 0.0, 1.0), vec4(1.0, 1.0, 1.0, 0.0))))))) {
                    {
                        discard;
                    }
                }
                break;
                {
                    int GLF_live3i = _GLF_FUZZED(31326);
                    if (_GLF_DEAD(false)) {
                        discard;
                    }
                    if (_GLF_DEAD(false)) {
                        int donor_replacementGLF_dead6msb8 = _GLF_FUZZED((mat3(-2.2, -0.0, -2.7, 2.8, 77.98, -2233.6587, 2481.2036, -4.4, 1.2), GLF_live3i));
                        vec2 donor_replacementGLF_dead6pos = _GLF_FUZZED(vec2(-877.986, 5.9));
                        if (_GLF_DEAD(false)) {
                            continue;
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                float donor_replacementGLF_dead10xCoord = _GLF_FUZZED(6.0);
                                {
                                    ivec2 GLF_live13p = _GLF_FUZZED(ivec2(-98884, -49980));
                                    if (GLF_live13p.x < 0) {
                                        GLF_live13p.y++;
                                    }
                                }
                                float donor_replacementGLF_dead10yCoord = _GLF_FUZZED(-2670.8593);
                                {
                                    ;
                                }
                            }
                        }
                        if (_GLF_DEAD(false)) {
                            int donor_replacementGLF_dead9i = _GLF_FUZZED(i);
                            if (donor_replacementGLF_dead9i >= int(GLF_dead9resolution.x)) {
                                break;
                            }
                        }
                        vec3 donor_replacementGLF_dead6setting = _GLF_FUZZED(vec3(2.1, 81.95, 1.5));
                        if (_GLF_DEAD(_GLF_IDENTITY(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)), bool(bvec4(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)), false, false, true))))) {
                            float donor_replacementGLF_dead10x = _GLF_FUZZED(round(GLF_dead6b_b));
                            float donor_replacementGLF_dead10y = _GLF_FUZZED(-2.8);
                            if (donor_replacementGLF_dead10x * donor_replacementGLF_dead10x + donor_replacementGLF_dead10y * donor_replacementGLF_dead10y > 4.0) {
                                break;
                            }
                        }
                        {
                            ;
                        }
                    }
                    float GLF_live3limit = _GLF_FUZZED(-4475.6545);
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        float donor_replacementGLF_dead10y = _GLF_FUZZED(mod(-0.3, -9050.8573));
                        if (GLF_dead6b_b * GLF_dead6b_b + donor_replacementGLF_dead10y * donor_replacementGLF_dead10y > 4.0) {
                            break;
                            {
                                {
                                    int GLF_live14looplimiter6 = 0;
                                    for (int GLF_live14j = 0; GLF_live14j < 10; GLF_live14j++) {
                                        if (GLF_live14looplimiter6 >= 6) {
                                            break;
                                        }
                                        GLF_live14looplimiter6++;
                                        {
                                            GLF_live14temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14j, 10)] = GLF_live14data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14j, 10)];
                                        }
                                    }
                                }
                            }
                        }
                    }
                    int GLF_live3looplimiter0 = 0;
                    float GLF_live3ref = _GLF_FUZZED((+(-447.892)));
                    float GLF_live3s = _GLF_FUZZED((false ? (-51.48) : 781.752));
                    {
                        {
                            ;
                        }
                    }
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            int donor_replacementGLF_dead11cols = _GLF_FUZZED(GLF_live3looplimiter0);
                            uint donor_replacementGLF_dead11matrix_number = _GLF_FUZZED(41137u);
                            for (int GLF_dead11rows = 2; GLF_dead11rows <= 4; GLF_dead11rows++) {
                                for (int GLF_dead11c = 0; GLF_dead11c < donor_replacementGLF_dead11cols; GLF_dead11c++) {
                                    for (int GLF_dead11r = 0; GLF_dead11r < GLF_dead11rows; GLF_dead11r++) {
                                        switch (donor_replacementGLF_dead11matrix_number) {
                                            case 0u:
                                                GLF_dead11m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 2)] = GLF_dead11one;
                                                break;
                                            case 1u:
                                                GLF_dead11m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 3)] = GLF_dead11one;
                                                break;
                                            case 2u:
                                                GLF_dead11m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 4)] = GLF_dead11one;
                                                break;
                                            case 3u:
                                                GLF_dead11m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 2)] = GLF_dead11one;
                                                break;
                                            case 4u:
                                                GLF_dead11m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 3)] = GLF_dead11one;
                                                break;
                                            case 5u:
                                                GLF_dead11m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 4)] = GLF_dead11one;
                                                break;
                                            case 6u:
                                                {
                                                    vec2 GLF_live14color = _GLF_FUZZED(vec2(724.002, 7.0));
                                                    int GLF_live14i = _GLF_FUZZED(ivec3(17174, 13124, -47532).s);
                                                    vec3 GLF_live14vecCoor = _GLF_FUZZED((vec3(-689.086, -9.3, 3871.6507) + vec3(-9.1, 166.647, -972.811)));
                                                    if (int(GLF_live14gl_FragCoord[1]) < 150) {
                                                        ;
                                                    } else if (int(GLF_live14gl_FragCoord[1]) < 180) {
                                                        GLF_live14color = fract(sin(GLF_live14vecCoor.yx - trunc(float(GLF_live14data[4]))));
                                                        GLF_live14color[1] += asinh(GLF_live14gl_FragCoord.y * ldexp(GLF_live14color.y, -GLF_live14i));
                                                        ;
                                                    } else if (int(GLF_live14gl_FragCoord[1]) < 210) {
                                                        GLF_live14color = fract(sin(GLF_live14vecCoor.yx - trunc(float(GLF_live14data[5]))));
                                                        GLF_live14color.y -= tanh(GLF_live14color.x) / cosh(GLF_live14color.y);
                                                        ;
                                                    } else if (int(GLF_live14gl_FragCoord[1]) < 240) {
                                                        GLF_live14color = fract(asinh(GLF_live14vecCoor.yx - trunc(float(GLF_live14data[6]))));
                                                        GLF_live14color.y -= isnan(float(GLF_live14i)) ? tanh(GLF_live14gl_FragCoord.x) : atanh(GLF_live14gl_FragCoord.y);
                                                        ;
                                                    } else if (int(GLF_live14gl_FragCoord[1]) < 270) {
                                                        GLF_live14color = fract(sin(GLF_live14vecCoor.yx - trunc(float(GLF_live14data[7]))));
                                                        GLF_live14color.y *= mix(normalize(GLF_live14vecCoor), normalize(vec3(GLF_live14color, degrees(GLF_live14color.x))), GLF_live14injectionSwitch.x).y;
                                                        ;
                                                    } else {
                                                        ;
                                                    }
                                                }
                                                GLF_dead11m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 2)] = GLF_dead11one;
                                                break;
                                                {
                                                    {
                                                        ;
                                                    }
                                                }
                                            case 7u:
                                                GLF_dead11m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 3)] = GLF_dead11one;
                                                break;
                                            case 8u:
                                                GLF_dead11m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 4)] = GLF_dead11one;
                                                break;
                                        }
                                    }
                                }
                                donor_replacementGLF_dead11matrix_number = donor_replacementGLF_dead11matrix_number + 1u;
                            }
                        }
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            int donor_replacementGLF_dead11c = _GLF_FUZZED((-N));
                            uint donor_replacementGLF_dead11matrix_number = _GLF_FUZZED((22516u + 162927u));
                            int donor_replacementGLF_dead11rows = _GLF_FUZZED(GLF_live3i);
                            for (int GLF_dead11r = 0; GLF_dead11r < donor_replacementGLF_dead11rows; GLF_dead11r++) {
                                switch (donor_replacementGLF_dead11matrix_number) {
                                    case 0u:
                                        GLF_dead11m22[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 2)] = GLF_dead11one;
                                        break;
                                    case 1u:
                                        GLF_dead11m23[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 3)] = GLF_dead11one;
                                        break;
                                    case 2u:
                                        GLF_dead11m24[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 4)] = GLF_dead11one;
                                        break;
                                    case 3u:
                                        GLF_dead11m32[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 2)] = GLF_dead11one;
                                        break;
                                    case 4u:
                                        GLF_dead11m33[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 3)] = GLF_dead11one;
                                        break;
                                    case 5u:
                                        GLF_dead11m34[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 4)] = GLF_dead11one;
                                        break;
                                    case 6u:
                                        GLF_dead11m42[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 2)] = GLF_dead11one;
                                        break;
                                    case 7u:
                                        GLF_dead11m43[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 3)] = GLF_dead11one;
                                        break;
                                    case 8u:
                                        GLF_dead11m44[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 4)] = GLF_dead11one;
                                        break;
                                }
                            }
                        }
                        _GLF_color = vec4(5824.0200, 4.3, 507.746, 7.0);
                        {
                            {
                                ;
                            }
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            int donor_replacementGLF_dead11cols = _GLF_FUZZED(abs(GLF_live3looplimiter0));
                            uint donor_replacementGLF_dead11matrix_number = _GLF_FUZZED((155003u % 149221u));
                            int donor_replacementGLF_dead11rows = _GLF_FUZZED(49569);
                            {
                                for (int GLF_dead11c = 0; GLF_dead11c < donor_replacementGLF_dead11cols; GLF_dead11c++) {
                                    for (int GLF_dead11r = 0; GLF_dead11r < donor_replacementGLF_dead11rows; GLF_dead11r++) {
                                        switch (donor_replacementGLF_dead11matrix_number) {
                                            case 0u:
                                                GLF_dead11m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 2)] = GLF_dead11one;
                                                break;
                                            case 1u:
                                                GLF_dead11m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 3)] = GLF_dead11one;
                                                break;
                                            case 2u:
                                                GLF_dead11m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 4)] = GLF_dead11one;
                                                break;
                                            case 3u:
                                                GLF_dead11m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 2)] = GLF_dead11one;
                                                break;
                                            case 4u:
                                                GLF_dead11m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 3)] = GLF_dead11one;
                                                break;
                                            case 5u:
                                                GLF_dead11m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 4)] = GLF_dead11one;
                                                break;
                                            case 6u:
                                                {
                                                    {
                                                        ;
                                                    }
                                                }
                                                GLF_dead11m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 2)] = GLF_dead11one;
                                                break;
                                                {
                                                    int GLF_live13looplimiter1 = 0;
                                                    ivec2 GLF_live13p = _GLF_FUZZED((ivec2(86886, 74769) - 61995));
                                                    {
                                                        if (GLF_live13looplimiter1 >= 6) {
                                                            ;
                                                        }
                                                        GLF_live13looplimiter1++;
                                                        {
                                                            GLF_live13p.x -= 16;
                                                        }
                                                    }
                                                }
                                            case 7u:
                                                GLF_dead11m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 3)] = GLF_dead11one;
                                                break;
                                            case 8u:
                                                GLF_dead11m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 4)] = GLF_dead11one;
                                                break;
                                        }
                                    }
                                }
                                donor_replacementGLF_dead11matrix_number = donor_replacementGLF_dead11matrix_number + 1u;
                            }
                        }
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                uint donor_replacementGLF_dead11matrix_number = _GLF_FUZZED(83935u);
                                for (int GLF_dead11cols = 2; GLF_dead11cols <= 4; GLF_dead11cols++) {
                                    for (int GLF_dead11rows = 2; GLF_dead11rows <= 4; GLF_dead11rows++) {
                                        for (int GLF_dead11c = 0; GLF_dead11c < GLF_dead11cols; GLF_dead11c++) {
                                            for (int GLF_dead11r = 0; GLF_dead11r < GLF_dead11rows; GLF_dead11r++) {
                                                switch (donor_replacementGLF_dead11matrix_number) {
                                                    case 0u:
                                                        GLF_dead11m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 2)] = GLF_dead11one;
                                                        break;
                                                    case 1u:
                                                        GLF_dead11m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 3)] = GLF_dead11one;
                                                        break;
                                                    case 2u:
                                                        GLF_dead11m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 4)] = GLF_dead11one;
                                                        break;
                                                    case 3u:
                                                        GLF_dead11m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 2)] = GLF_dead11one;
                                                        break;
                                                        {
                                                            int GLF_live12iteration = _GLF_FUZZED(-21691);
                                                            {
                                                                ;
                                                            }
                                                        }
                                                    case 4u:
                                                        GLF_dead11m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 3)] = GLF_dead11one;
                                                        break;
                                                    case 5u:
                                                        GLF_dead11m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 4)] = GLF_dead11one;
                                                        break;
                                                        {
                                                            int GLF_live14j = _GLF_FUZZED(59171);
                                                            int GLF_live14looplimiter6 = 0;
                                                            {
                                                                if (GLF_live14looplimiter6 >= 6) {
                                                                    ;
                                                                }
                                                                GLF_live14looplimiter6++;
                                                                {
                                                                    GLF_live14temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14j, 10)] = GLF_live14data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14j, 10)];
                                                                }
                                                            }
                                                        }
                                                    case 6u:
                                                        GLF_dead11m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 2)] = GLF_dead11one;
                                                        break;
                                                    case 7u:
                                                        GLF_dead11m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 3)] = GLF_dead11one;
                                                        break;
                                                    case 8u:
                                                        GLF_dead11m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 4)] = GLF_dead11one;
                                                        break;
                                                }
                                            }
                                        }
                                        donor_replacementGLF_dead11matrix_number = donor_replacementGLF_dead11matrix_number + 1u;
                                    }
                                }
                            }
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        {
                            break;
                        }
                        {
                            int GLF_live12iteration = _GLF_FUZZED(-36336);
                            {
                                ;
                            }
                        }
                    }
                    while (GLF_live3i < bitfieldInsert(800, GLF_live3i, 0, 0)) {
                        if (GLF_live3looplimiter0 >= 3) {
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                    return;
                                }
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = vec4(2792.4512, -46.81, 1309.3016, 3327.1070);
                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                    {
                                        vec2 GLF_live14color = _GLF_FUZZED(vec2(38.91, 6671.7735));
                                        int GLF_live14i = _GLF_FUZZED((+(-44942)));
                                        vec3 GLF_live14vecCoor = _GLF_FUZZED(vec3(-55.14));
                                        if (int(GLF_live14gl_FragCoord[1]) < 180) {
                                            GLF_live14color = fract(sin(GLF_live14vecCoor.yx - trunc(float(GLF_live14data[4]))));
                                            GLF_live14color[1] += asinh(GLF_live14gl_FragCoord.y * ldexp(GLF_live14color.y, -GLF_live14i));
                                            ;
                                        } else if (int(GLF_live14gl_FragCoord[1]) < 210) {
                                            GLF_live14color = fract(sin(GLF_live14vecCoor.yx - trunc(float(GLF_live14data[5]))));
                                            GLF_live14color.y -= tanh(GLF_live14color.x) / cosh(GLF_live14color.y);
                                            ;
                                        } else if (int(GLF_live14gl_FragCoord[1]) < 240) {
                                            GLF_live14color = fract(asinh(GLF_live14vecCoor.yx - trunc(float(GLF_live14data[6]))));
                                            GLF_live14color.y -= isnan(float(GLF_live14i)) ? tanh(GLF_live14gl_FragCoord.x) : atanh(GLF_live14gl_FragCoord.y);
                                            ;
                                        } else if (int(GLF_live14gl_FragCoord[1]) < 270) {
                                            GLF_live14color = fract(sin(GLF_live14vecCoor.yx - trunc(float(GLF_live14data[7]))));
                                            GLF_live14color.y *= mix(normalize(GLF_live14vecCoor), normalize(vec3(GLF_live14color, degrees(GLF_live14color.x))), GLF_live14injectionSwitch.x).y;
                                            ;
                                        } else {
                                            ;
                                        }
                                    }
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                        return;
                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                            int donor_replacementGLF_dead11cols = _GLF_FUZZED(int(GLF_live3ref));
                                            uint donor_replacementGLF_dead11matrix_number = _GLF_FUZZED(83278u);
                                            {
                                                for (int GLF_dead11rows = 2; GLF_dead11rows <= 4; GLF_dead11rows++) {
                                                    for (int GLF_dead11c = 0; GLF_dead11c < donor_replacementGLF_dead11cols; GLF_dead11c++) {
                                                        for (int GLF_dead11r = 0; GLF_dead11r < GLF_dead11rows; GLF_dead11r++) {
                                                            switch (donor_replacementGLF_dead11matrix_number) {
                                                                case 0u:
                                                                    GLF_dead11m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 2)] = GLF_dead11one;
                                                                    break;
                                                                    {
                                                                        {
                                                                            ;
                                                                        }
                                                                    }
                                                                case 1u:
                                                                    GLF_dead11m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 3)] = GLF_dead11one;
                                                                    break;
                                                                case 2u:
                                                                    GLF_dead11m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 4)] = GLF_dead11one;
                                                                    break;
                                                                case 3u:
                                                                    GLF_dead11m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 2)] = GLF_dead11one;
                                                                    break;
                                                                case 4u:
                                                                    GLF_dead11m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 3)] = GLF_dead11one;
                                                                    break;
                                                                case 5u:
                                                                    GLF_dead11m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 4)] = GLF_dead11one;
                                                                    break;
                                                                case 6u:
                                                                    GLF_dead11m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 2)] = GLF_dead11one;
                                                                    break;
                                                                case 7u:
                                                                    GLF_dead11m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 3)] = GLF_dead11one;
                                                                    break;
                                                                case 8u:
                                                                    GLF_dead11m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 4)] = GLF_dead11one;
                                                                    break;
                                                            }
                                                        }
                                                    }
                                                    donor_replacementGLF_dead11matrix_number = donor_replacementGLF_dead11matrix_number + 1u;
                                                }
                                            }
                                        }
                                    }
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                        break;
                                    }
                                }
                            }
                            break;
                            {
                                int GLF_live12iteration = _GLF_FUZZED(((ivec2(-37242, -84809) + 40424) | ivec2(-36777, -20607)).g);
                                float GLF_live12xCoord = _GLF_FUZZED(-1.4);
                                float GLF_live12yCoord = _GLF_FUZZED(float(false));
                                if (GLF_live12iteration < 1000) {
                                    ;
                                } else {
                                    ;
                                }
                            }
                            if (_GLF_DEAD(false)) {
                                int donor_replacementGLF_dead9i = _GLF_FUZZED(((N / i) * N));
                                if (donor_replacementGLF_dead9i < int(GLF_dead9gl_FragCoord.x)) {
                                    break;
                                }
                            }
                            {
                                float GLF_live12c_im = _GLF_FUZZED(-418.205);
                                float GLF_live12c_re = _GLF_FUZZED(-59.64);
                                int GLF_live12iteration = _GLF_FUZZED((true ? ivec4(24811, -57165, -77390, -49074).q : ((-91012) - (-25327))));
                                float GLF_live12x = _GLF_FUZZED((false ? 8.0 : float(122084u)));
                                float GLF_live12y = _GLF_FUZZED(7.1);
                                {
                                    int GLF_live12looplimiter0 = 0;
                                    for (int GLF_live12k = 0; GLF_live12k < 1000; GLF_live12k++) {
                                        if (GLF_live12looplimiter0 >= 7) {
                                            break;
                                        }
                                        GLF_live12looplimiter0++;
                                        {
                                            if (GLF_live12x * GLF_live12x + GLF_live12y * GLF_live12y > 4.0) {
                                                break;
                                            }
                                            float GLF_live12x_new = GLF_live12x * GLF_live12x - GLF_live12y * GLF_live12y + GLF_live12c_re;
                                            GLF_live12y = 2.0 * GLF_live12x * GLF_live12y + GLF_live12c_im;
                                            GLF_live12x = GLF_live12x_new;
                                            GLF_live12iteration++;
                                        }
                                    }
                                }
                            }
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            {
                                int GLF_live14i = _GLF_FUZZED(80113);
                                int GLF_live14looplimiter5 = 0;
                                {
                                    if (GLF_live14looplimiter5 >= 6) {
                                        ;
                                    }
                                    GLF_live14looplimiter5++;
                                    {
                                        switch (GLF_live14i) {
                                            case 0:
                                                GLF_live14data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14i, 10)] = 4;
                                                break;
                                            case 1:
                                                GLF_live14data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14i, 10)] = 3;
                                                break;
                                            case 2:
                                                GLF_live14data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14i, 10)] = 2;
                                                break;
                                            case 3:
                                                GLF_live14data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14i, 10)] = 1;
                                                break;
                                            case 4:
                                                GLF_live14data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14i, 10)] = 0;
                                                break;
                                            case 5:
                                                GLF_live14data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14i, 10)] = -1;
                                                break;
                                            case 6:
                                                GLF_live14data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14i, 10)] = -2;
                                                break;
                                            case 7:
                                                GLF_live14data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14i, 10)] = -3;
                                                break;
                                            case 8:
                                                GLF_live14data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14i, 10)] = -4;
                                                break;
                                            case 9:
                                                GLF_live14data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14i, 10)] = -5;
                                                break;
                                        }
                                        GLF_live14i++;
                                    }
                                }
                            }
                            int donor_replacementGLF_dead9i = _GLF_FUZZED(max(GLF_live3looplimiter0, -57551));
                            if (donor_replacementGLF_dead9i < int(GLF_dead9gl_FragCoord.x)) {
                                break;
                            }
                        }
                        {
                            int GLF_live14high = _GLF_FUZZED(-65023);
                            int GLF_live14low = _GLF_FUZZED((51250 & (ivec2(-29556, 74710) - ivec2(16213, 89224))).x);
                            int GLF_live14m = _GLF_FUZZED((11264 + (~8781)));
                            {
                                int GLF_live14looplimiter3 = 0;
                                for (int GLF_live14i = GLF_live14low; GLF_live14i < GLF_live14high; GLF_live14i += 2 * GLF_live14m) {
                                    if (GLF_live14looplimiter3 >= 6) {
                                        break;
                                    }
                                    GLF_live14looplimiter3++;
                                    {
                                        int GLF_live14from = GLF_live14i;
                                        int GLF_live14mid = GLF_live14i + GLF_live14m - 1;
                                        int GLF_live14to = min(GLF_live14i + 2 * GLF_live14m - 1, GLF_live14high);
                                        GLF_live14merge(GLF_live14from, GLF_live14mid, GLF_live14to);
                                    }
                                }
                            }
                        }
                        GLF_live3looplimiter0++;
                        {
                            if (mod(float(GLF_live3i), GLF_live3ref) <= 0.01) {
                                {
                                    vec2 GLF_live14color = _GLF_FUZZED(vec2(-6.2, 4.9));
                                    vec3 GLF_live14vecCoor = _GLF_FUZZED(vec3(10.71));
                                    {
                                        GLF_live14color = fract(sin(GLF_live14vecCoor.yx - trunc(float(GLF_live14data[2]))));
                                        GLF_live14color.x += atanh(GLF_live14color.x) * cosh(GLF_live14injectionSwitch.y) * smoothstep(GLF_live14color, GLF_live14injectionSwitch, GLF_live14gl_FragCoord.yy).x;
                                        ;
                                    }
                                }
                                GLF_live3s += 0.2;
                            }
                            if (float(GLF_live3i) >= GLF_live3limit) {
                                ;
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                continue;
                            }
                            GLF_live3i++;
                        }
                    }
                }
            case 4:
                _GLF_IDENTITY(_GLF_IDENTITY(data[i] = 0, ~(_GLF_IDENTITY(~(data[i] = 0), 1 * (~(data[i] = 0))))), (_GLF_FALSE(false, (gl_FragCoord.x < 0.0)) ? _GLF_FUZZED(N) : _GLF_IDENTITY(data[i] = 0, ~(_GLF_IDENTITY(~(data[i] = 0), 1 * (~(data[i] = 0)))))));
                if (_GLF_DEAD(false)) {
                    if (_GLF_DEAD(false)) {
                        int donor_replacementGLF_dead7a = _GLF_FUZZED((N));
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < abs(0.0))))) {
                            float donor_replacementGLF_dead10c_im = _GLF_FUZZED(GLF_dead6b_b);
                            float donor_replacementGLF_dead10c_re = _GLF_FUZZED(-6380.9019);
                            int donor_replacementGLF_dead10iteration = _GLF_FUZZED((i & donor_replacementGLF_dead7a));
                            float donor_replacementGLF_dead10x = _GLF_FUZZED(atanh(dot(vec4(4.6, -8962.4869, 5.0, -11.03), _GLF_color)));
                            float donor_replacementGLF_dead10y = _GLF_FUZZED(inversesqrt(fract(GLF_dead6b_b)));
                            for (int GLF_dead10k = 0; GLF_dead10k < 1000; GLF_dead10k++) {
                                if (donor_replacementGLF_dead10x * donor_replacementGLF_dead10x + donor_replacementGLF_dead10y * donor_replacementGLF_dead10y > 4.0) {
                                    break;
                                }
                                float GLF_dead10x_new = donor_replacementGLF_dead10x * donor_replacementGLF_dead10x - donor_replacementGLF_dead10y * donor_replacementGLF_dead10y + donor_replacementGLF_dead10c_re;
                                donor_replacementGLF_dead10y = 2.0 * donor_replacementGLF_dead10x * donor_replacementGLF_dead10y + donor_replacementGLF_dead10c_im;
                                donor_replacementGLF_dead10x = GLF_dead10x_new;
                                {
                                    float GLF_live12x = _GLF_FUZZED(51.15);
                                    float GLF_live12y = _GLF_FUZZED((5.8 * 65.88));
                                    if (GLF_live12x * GLF_live12x + GLF_live12y * GLF_live12y > 4.0) {
                                        ;
                                    }
                                }
                                donor_replacementGLF_dead10iteration++;
                            }
                        }
                        int donor_replacementGLF_dead7b = _GLF_FUZZED(-42730);
                        int donor_replacementGLF_dead7c = _GLF_FUZZED(N);
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            discard;
                        }
                        {
                            {
                                ;
                            }
                        }
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = min(fwidthFine(vec4(1405.7545, -873.995, -569.943, 8.4)), 161.888);
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                    discard;
                                }
                            }
                            if (_GLF_DEAD(false)) {
                                int donor_replacementGLF_dead10iteration = _GLF_FUZZED(donor_replacementGLF_dead7b);
                                float donor_replacementGLF_dead10xCoord = _GLF_FUZZED(8938.3535);
                                float donor_replacementGLF_dead10yCoord = _GLF_FUZZED(sqrt(GLF_dead6b_b));
                                if (donor_replacementGLF_dead10iteration < 1000) {
                                    {
                                        vec2 GLF_live14color = _GLF_FUZZED(vec2(856.092, -70.11));
                                        vec3 GLF_live14vecCoor = _GLF_FUZZED(vec3(-3.9, -0.4, 4153.5686));
                                        {
                                            GLF_live14color = fract(sin(GLF_live14vecCoor.yx - trunc(float(GLF_live14data[5]))));
                                            GLF_live14color.y -= tanh(GLF_live14color.x) / cosh(GLF_live14color.y);
                                            ;
                                        }
                                    }
                                    ;
                                } else {
                                    ;
                                }
                            }
                        }
                        vec2 donor_replacementGLF_dead7uv = _GLF_FUZZED(tan(injectionSwitch));
                        do {
                            donor_replacementGLF_dead7uv.y -= step(GLF_dead7injectionSwitch.y, donor_replacementGLF_dead7uv.x) + float(donor_replacementGLF_dead7a) + float(donor_replacementGLF_dead7b);
                            donor_replacementGLF_dead7uv.x += ldexp(GLF_dead7injectionSwitch.y, isinf(donor_replacementGLF_dead7uv.y + donor_replacementGLF_dead7uv.x) ? findMSB(donor_replacementGLF_dead7b) : findMSB(donor_replacementGLF_dead7a));
                            if (_GLF_DEAD(false)) {
                                {
                                    break;
                                }
                            }
                            {
                                ivec2 GLF_live13p = _GLF_FUZZED(((-59788) * (ivec2(-25296, -17782) | ivec2(83539, 12661))));
                                {
                                    GLF_live13p.x = -GLF_live13p.x;
                                }
                            }
                            donor_replacementGLF_dead7c--;
                        } while (donor_replacementGLF_dead7c > int(GLF_dead7injectionSwitch.x));
                    }
                    break;
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        return;
                    }
                }
                break;
            case 5:
                if (_GLF_DEAD(false)) {
                    int donor_replacementGLF_dead4c_im = _GLF_FUZZED(73423);
                    int donor_replacementGLF_dead4c_re = _GLF_FUZZED((N % (65701 - i)));
                    int donor_replacementGLF_dead4iteration = _GLF_FUZZED(i);
                    int donor_replacementGLF_dead4x = _GLF_FUZZED(i);
                    int donor_replacementGLF_dead4y = _GLF_FUZZED(int((140955u)));
                    if (_GLF_DEAD(false)) {
                        float donor_replacementGLF_dead10c_im = _GLF_FUZZED(454.294);
                        float donor_replacementGLF_dead10c_re = _GLF_FUZZED(length((vec3(7530.8845, -87.23, 13.95) + float(45470u))));
                        {
                            int GLF_live13looplimiter1 = 0;
                            if (GLF_live13looplimiter1 >= 6) {
                                ;
                            }
                        }
                        int donor_replacementGLF_dead10iteration = _GLF_FUZZED(donor_replacementGLF_dead4y);
                        float donor_replacementGLF_dead10x = _GLF_FUZZED(-7740.8620);
                        float donor_replacementGLF_dead10y = _GLF_FUZZED(GLF_dead6b_b);
                        {
                            if (donor_replacementGLF_dead10x * donor_replacementGLF_dead10x + donor_replacementGLF_dead10y * donor_replacementGLF_dead10y > 4.0) {
                                break;
                            }
                            float GLF_dead10x_new = donor_replacementGLF_dead10x * donor_replacementGLF_dead10x - donor_replacementGLF_dead10y * donor_replacementGLF_dead10y + donor_replacementGLF_dead10c_re;
                            donor_replacementGLF_dead10y = 2.0 * donor_replacementGLF_dead10x * donor_replacementGLF_dead10y + donor_replacementGLF_dead10c_im;
                            donor_replacementGLF_dead10x = GLF_dead10x_new;
                            donor_replacementGLF_dead10iteration++;
                            {
                                float GLF_live12x = _GLF_FUZZED(-8.7);
                                float GLF_live12y = _GLF_FUZZED(float(-21452));
                                if (GLF_live12x * GLF_live12x + GLF_live12y * GLF_live12y > 4.0) {
                                    ;
                                }
                            }
                        }
                    }
                    for (int GLF_dead4k = 0; GLF_dead4k < 1000; GLF_dead4k++) {
                        if (donor_replacementGLF_dead4x * donor_replacementGLF_dead4x + donor_replacementGLF_dead4y * donor_replacementGLF_dead4y > 262144) {
                            break;
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                {
                                    ivec2 GLF_live13p = _GLF_FUZZED((ivec2(-17128, 69087) & ivec2(-41568, 35963)));
                                    if (GLF_live13p.x > 0) {
                                        GLF_live13p.y--;
                                    }
                                }
                                float donor_replacementGLF_dead10xCoord = _GLF_FUZZED(-8.9);
                                float donor_replacementGLF_dead10yCoord = _GLF_FUZZED((mat2x3(-314.221, -504.991, -703.528, -8.6, -6.1, 7.1), GLF_dead6b_b));
                                {
                                    ;
                                }
                            }
                        }
                        int GLF_dead4x_new = ((donor_replacementGLF_dead4x * donor_replacementGLF_dead4x - donor_replacementGLF_dead4y * donor_replacementGLF_dead4y) / 256 + donor_replacementGLF_dead4c_re);
                        donor_replacementGLF_dead4y = (2 * donor_replacementGLF_dead4x * donor_replacementGLF_dead4y / 256 + donor_replacementGLF_dead4c_im);
                        if (_GLF_DEAD(false)) {
                            int donor_replacementGLF_dead11cols = _GLF_FUZZED(GLF_dead4x_new);
                            uint donor_replacementGLF_dead11matrix_number = _GLF_FUZZED((68039u & 154481u));
                            int donor_replacementGLF_dead11rows = _GLF_FUZZED(donor_replacementGLF_dead4y);
                            {
                                int GLF_live12iteration = _GLF_FUZZED(90405);
                                {
                                    ;
                                }
                            }
                            {
                                for (int GLF_dead11c = 0; GLF_dead11c < donor_replacementGLF_dead11cols; GLF_dead11c++) {
                                    for (int GLF_dead11r = 0; GLF_dead11r < donor_replacementGLF_dead11rows; GLF_dead11r++) {
                                        switch (donor_replacementGLF_dead11matrix_number) {
                                            case 0u:
                                                GLF_dead11m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 2)] = GLF_dead11one;
                                                break;
                                            case 1u:
                                                GLF_dead11m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 3)] = GLF_dead11one;
                                                break;
                                            case 2u:
                                                GLF_dead11m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 4)] = GLF_dead11one;
                                                break;
                                            case 3u:
                                                GLF_dead11m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 2)] = GLF_dead11one;
                                                break;
                                            case 4u:
                                                GLF_dead11m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 3)] = GLF_dead11one;
                                                break;
                                            case 5u:
                                                GLF_dead11m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 4)] = GLF_dead11one;
                                                break;
                                            case 6u:
                                                GLF_dead11m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 2)] = GLF_dead11one;
                                                break;
                                            case 7u:
                                                GLF_dead11m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 3)] = GLF_dead11one;
                                                break;
                                            case 8u:
                                                GLF_dead11m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 4)] = GLF_dead11one;
                                                break;
                                        }
                                    }
                                    {
                                        ivec2 GLF_live13p = _GLF_FUZZED(ivec2(-87865, 34043));
                                        {
                                            GLF_live13p.x -= 16;
                                        }
                                    }
                                }
                                donor_replacementGLF_dead11matrix_number = donor_replacementGLF_dead11matrix_number + 1u;
                            }
                        }
                        donor_replacementGLF_dead4x = GLF_dead4x_new;
                        donor_replacementGLF_dead4iteration++;
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < sin(sin(0.0)))))) {
                            {
                                int GLF_live14i = _GLF_FUZZED(ivec4(-91636, 40084, 29204, 31276).t);
                                int GLF_live14j = _GLF_FUZZED(20256);
                                int GLF_live14k = _GLF_FUZZED(59031);
                                {
                                    if (GLF_live14data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14i, 10)] < GLF_live14data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14j, 10)]) {
                                        GLF_live14temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14k++, 10)] = GLF_live14data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14i++, 10)];
                                    } else {
                                        GLF_live14temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14k++, 10)] = GLF_live14data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14j++, 10)];
                                    }
                                }
                            }
                            int donor_replacementGLF_dead11cols = _GLF_FUZZED(GLF_dead4x_new);
                            uint donor_replacementGLF_dead11matrix_number = _GLF_FUZZED(122510u);
                            int donor_replacementGLF_dead11rows = _GLF_FUZZED(N);
                            {
                                for (int GLF_dead11c = 0; GLF_dead11c < donor_replacementGLF_dead11cols; GLF_dead11c++) {
                                    for (int GLF_dead11r = 0; GLF_dead11r < donor_replacementGLF_dead11rows; GLF_dead11r++) {
                                        switch (donor_replacementGLF_dead11matrix_number) {
                                            case 0u:
                                                GLF_dead11m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 2)] = GLF_dead11one;
                                                break;
                                                {
                                                    {
                                                        ;
                                                    }
                                                }
                                            case 1u:
                                                GLF_dead11m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 3)] = GLF_dead11one;
                                                break;
                                            case 2u:
                                                GLF_dead11m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 4)] = GLF_dead11one;
                                                break;
                                                {
                                                    int GLF_live14from = _GLF_FUZZED(-25898);
                                                    int GLF_live14looplimiter2 = 0;
                                                    int GLF_live14to = _GLF_FUZZED(ivec4(-31145, 773, 79901, -40187).w);
                                                    for (int GLF_live14i = GLF_live14from; GLF_live14i <= GLF_live14to; GLF_live14i++) {
                                                        if (GLF_live14looplimiter2 >= 6) {
                                                            break;
                                                        }
                                                        GLF_live14looplimiter2++;
                                                        {
                                                            GLF_live14data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14i, 10)] = GLF_live14temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14i, 10)];
                                                        }
                                                    }
                                                }
                                            case 3u:
                                                GLF_dead11m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 2)] = GLF_dead11one;
                                                break;
                                            case 4u:
                                                GLF_dead11m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 3)] = GLF_dead11one;
                                                break;
                                                {
                                                    float GLF_live12xCoord = _GLF_FUZZED(5.2);
                                                    float GLF_live12yCoord = _GLF_FUZZED(0.6);
                                                    {
                                                        ;
                                                    }
                                                }
                                            case 5u:
                                                GLF_dead11m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 4)] = GLF_dead11one;
                                                break;
                                            case 6u:
                                                GLF_dead11m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 2)] = GLF_dead11one;
                                                break;
                                            case 7u:
                                                GLF_dead11m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 3)] = GLF_dead11one;
                                                break;
                                            case 8u:
                                                GLF_dead11m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 4)] = GLF_dead11one;
                                                break;
                                        }
                                    }
                                }
                                donor_replacementGLF_dead11matrix_number = donor_replacementGLF_dead11matrix_number + 1u;
                            }
                        }
                    }
                }
                data[i] = -1;
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    int donor_replacementGLF_dead9i = _GLF_FUZZED((30664 % 77978));
                    if (donor_replacementGLF_dead9i >= int(GLF_dead9resolution.x)) {
                        break;
                    }
                }
                break;
            case 6:
                data[i] = -2;
                if (_GLF_DEAD(false)) {
                    continue;
                }
                if (_GLF_DEAD(false)) {
                    {
                        break;
                        {
                            int GLF_live15i = _GLF_FUZZED(((-50557) | 71239));
                            if (GLF_live15i < int(GLF_live15gl_FragCoord.x)) {
                                ;
                            }
                        }
                    }
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    bool donor_replacementGLF_dead6c1 = _GLF_FUZZED(((mat2x3(6.0, 6502.2355, -1.5, -0.2, 1.4, 4236.6185) * ((-4.2) - mat2(483.579, 6.3, 8.3, 3.1))) == mat2x3(57.88, 8447.6580, 278.510, -_GLF_IDENTITY(5.2, clamp(5.2, 5.2, 5.2)), -3.3, -36.09)));
                    if (!donor_replacementGLF_dead6c1) {
                        if (_GLF_DEAD(false)) {
                            int donor_replacementGLF_dead11cols = _GLF_FUZZED(i);
                            uint donor_replacementGLF_dead11matrix_number = _GLF_FUZZED((uvec3(150164u, 137855u, 45201u) - packHalf2x16(GLF_dead6resolution))[0]);
                            {
                                for (int GLF_dead11rows = 2; GLF_dead11rows <= 4; GLF_dead11rows++) {
                                    for (int GLF_dead11c = 0; GLF_dead11c < donor_replacementGLF_dead11cols; GLF_dead11c++) {
                                        for (int GLF_dead11r = 0; GLF_dead11r < GLF_dead11rows; GLF_dead11r++) {
                                            switch (donor_replacementGLF_dead11matrix_number) {
                                                case 0u:
                                                    GLF_dead11m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 2)] = GLF_dead11one;
                                                    break;
                                                case 1u:
                                                    GLF_dead11m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 3)] = GLF_dead11one;
                                                    break;
                                                case 2u:
                                                    {
                                                        int GLF_live13looplimiter1 = 0;
                                                        ivec2 GLF_live13p = _GLF_FUZZED(ivec2(ivec3(89621, 49027, 39519)));
                                                        while (GLF_live13p.x > 15) {
                                                            if (GLF_live13looplimiter1 >= 6) {
                                                                break;
                                                            }
                                                            GLF_live13looplimiter1++;
                                                            {
                                                                GLF_live13p.x -= 16;
                                                            }
                                                        }
                                                    }
                                                    GLF_dead11m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 4)] = GLF_dead11one;
                                                    break;
                                                case 3u:
                                                    GLF_dead11m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 2)] = GLF_dead11one;
                                                    break;
                                                case 4u:
                                                    GLF_dead11m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 3)] = GLF_dead11one;
                                                    break;
                                                case 5u:
                                                    GLF_dead11m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 4)] = GLF_dead11one;
                                                    break;
                                                case 6u:
                                                    GLF_dead11m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 2)] = GLF_dead11one;
                                                    break;
                                                case 7u:
                                                    GLF_dead11m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 3)] = GLF_dead11one;
                                                    break;
                                                case 8u:
                                                    GLF_dead11m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 4)] = GLF_dead11one;
                                                    break;
                                            }
                                        }
                                    }
                                    donor_replacementGLF_dead11matrix_number = donor_replacementGLF_dead11matrix_number + 1u;
                                }
                            }
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            if (_GLF_DEAD(false)) {
                                {
                                    ivec2 GLF_live13p = _GLF_FUZZED((ivec2(60509, 43209)));
                                    {
                                        int GLF_live13looplimiter1 = 0;
                                        while (GLF_live13p.x > 15) {
                                            if (GLF_live13looplimiter1 >= 6) {
                                                break;
                                            }
                                            GLF_live13looplimiter1++;
                                            {
                                                GLF_live13p.x -= 16;
                                            }
                                        }
                                    }
                                }
                                uint donor_replacementGLF_dead11matrix_number = _GLF_FUZZED((uvec3(127950u, 95689u, 179213u).b ^ (34953u)));
                                for (int GLF_dead11cols = 2; GLF_dead11cols <= 4; GLF_dead11cols++) {
                                    {
                                        ivec2 GLF_live13p = _GLF_FUZZED(ivec2(-97081, -89693));
                                        {
                                            GLF_live13p = GLF_live13iter(GLF_live13p);
                                        }
                                    }
                                    for (int GLF_dead11rows = 2; GLF_dead11rows <= 4; GLF_dead11rows++) {
                                        for (int GLF_dead11c = 0; GLF_dead11c < GLF_dead11cols; GLF_dead11c++) {
                                            for (int GLF_dead11r = 0; GLF_dead11r < GLF_dead11rows; GLF_dead11r++) {
                                                switch (donor_replacementGLF_dead11matrix_number) {
                                                    case 0u:
                                                        GLF_dead11m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 2)] = GLF_dead11one;
                                                        break;
                                                    case 1u:
                                                        GLF_dead11m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 3)] = GLF_dead11one;
                                                        break;
                                                    case 2u:
                                                        GLF_dead11m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 4)] = GLF_dead11one;
                                                        break;
                                                    case 3u:
                                                        {
                                                            int GLF_live14looplimiter3 = 0;
                                                            if (GLF_live14looplimiter3 >= 6) {
                                                                ;
                                                            }
                                                        }
                                                        GLF_dead11m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 2)] = GLF_dead11one;
                                                        break;
                                                    case 4u:
                                                        GLF_dead11m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 3)] = GLF_dead11one;
                                                        break;
                                                    case 5u:
                                                        {
                                                            int GLF_live13looplimiter1 = 0;
                                                            ivec2 GLF_live13p = _GLF_FUZZED((ivec2(89918, 97307) ^ int(180621u)));
                                                            while (GLF_live13p.x > 15) {
                                                                if (GLF_live13looplimiter1 >= 6) {
                                                                    break;
                                                                }
                                                                GLF_live13looplimiter1++;
                                                                {
                                                                    GLF_live13p.x -= 16;
                                                                }
                                                            }
                                                        }
                                                        GLF_dead11m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 4)] = GLF_dead11one;
                                                        break;
                                                    case 6u:
                                                        GLF_dead11m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 2)] = GLF_dead11one;
                                                        break;
                                                    case 7u:
                                                        GLF_dead11m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 3)] = GLF_dead11one;
                                                        break;
                                                    case 8u:
                                                        GLF_dead11m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 4)] = GLF_dead11one;
                                                        break;
                                                }
                                            }
                                        }
                                        donor_replacementGLF_dead11matrix_number = donor_replacementGLF_dead11matrix_number + 1u;
                                    }
                                }
                            }
                            break;
                        }
                        ;
                        {
                            {
                                ;
                            }
                        }
                    }
                }
                break;
            case 7:
                {
                    int GLF_live15i = _GLF_FUZZED(-39695);
                    if (GLF_live15i < int(GLF_live15gl_FragCoord.x)) {
                        ;
                    }
                }
                data[i] = -3;
                break;
                {
                    {
                        ;
                    }
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < sin(0.0))))) {
                    if (_GLF_DEAD(false)) {
                        int donor_replacementGLF_dead10iteration = _GLF_FUZZED(floatBitsToInt(GLF_dead6b_b));
                        float donor_replacementGLF_dead10xCoord = _GLF_FUZZED(float(115483u));
                        float donor_replacementGLF_dead10yCoord = _GLF_FUZZED(dFdxFine(-94.67));
                        if (donor_replacementGLF_dead10iteration < 1000) {
                            ;
                        } else {
                            ;
                        }
                    }
                    continue;
                }
            case 8:
                {
                    int GLF_live1looplimiter1 = 0;
                    if (GLF_live1looplimiter1 >= 4) {
                        ;
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_IDENTITY(dot(vec3(1.0, 1.0, 0.0), vec3(0.0, 0.0, 1.0)), dot(vec3(1.0, 1.0, 0.0), vec3(0.0, 0.0, 1.0))))))) {
                            {
                                break;
                            }
                        }
                    }
                }
                data[i] = -4;
                break;
                {
                    {
                        ;
                    }
                }
                if (_GLF_DEAD(_GLF_IDENTITY(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)), bool(bvec2(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)), _GLF_FALSE(false, (gl_FragCoord.x < 0.0))))))) {
                    {
                        break;
                    }
                }
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = normalize(vec4(-815.108, -98.56, -17.57, -220.430));
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                    if (_GLF_DEAD(false)) {
                        uint donor_replacementGLF_dead11matrix_number = _GLF_FUZZED(bitfieldReverse(175096u));
                        for (int GLF_dead11cols = 2; GLF_dead11cols <= 4; GLF_dead11cols++) {
                            for (int GLF_dead11rows = 2; GLF_dead11rows <= 4; GLF_dead11rows++) {
                                for (int GLF_dead11c = 0; GLF_dead11c < GLF_dead11cols; GLF_dead11c++) {
                                    for (int GLF_dead11r = 0; GLF_dead11r < GLF_dead11rows; GLF_dead11r++) {
                                        switch (donor_replacementGLF_dead11matrix_number) {
                                            case 0u:
                                                GLF_dead11m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 2)] = GLF_dead11one;
                                                break;
                                            case 1u:
                                                GLF_dead11m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 3)] = GLF_dead11one;
                                                break;
                                            case 2u:
                                                GLF_dead11m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 4)] = GLF_dead11one;
                                                break;
                                            case 3u:
                                                GLF_dead11m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 2)] = GLF_dead11one;
                                                break;
                                            case 4u:
                                                GLF_dead11m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 3)] = GLF_dead11one;
                                                {
                                                    int GLF_live12iteration = _GLF_FUZZED(int(false));
                                                    {
                                                        ;
                                                    }
                                                }
                                                break;
                                            case 5u:
                                                GLF_dead11m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 4)] = GLF_dead11one;
                                                break;
                                            case 6u:
                                                GLF_dead11m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 2)] = GLF_dead11one;
                                                break;
                                            case 7u:
                                                GLF_dead11m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 3)] = GLF_dead11one;
                                                break;
                                            case 8u:
                                                GLF_dead11m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 4)] = GLF_dead11one;
                                                break;
                                        }
                                    }
                                }
                                {
                                    {
                                        ;
                                    }
                                }
                                donor_replacementGLF_dead11matrix_number = donor_replacementGLF_dead11matrix_number + 1u;
                            }
                        }
                    }
                }
                if (_GLF_DEAD(false)) {
                    {
                        int GLF_live14looplimiter5 = 0;
                        if (GLF_live14looplimiter5 >= 6) {
                            ;
                        }
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        bool donor_replacementGLF_dead6c1 = _GLF_FUZZED(true);
                        if (!donor_replacementGLF_dead6c1) {
                            ;
                        }
                    }
                    {
                        {
                            ;
                        }
                    }
                    discard;
                }
            case 9:
                data[i] = -5;
                if (_GLF_DEAD(false)) {
                    return;
                }
                break;
        }
        if (_GLF_DEAD(false)) {
            discard;
            if (_GLF_DEAD(false)) {
                continue;
            }
        }
        i++;
        {
            {
                ;
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    int donor_replacementGLF_dead11c = _GLF_FUZZED(i);
                    uint donor_replacementGLF_dead11matrix_number = _GLF_FUZZED(5976u);
                    int donor_replacementGLF_dead11rows = _GLF_FUZZED((N * (-79349)));
                    for (int GLF_dead11r = 0; GLF_dead11r < donor_replacementGLF_dead11rows; GLF_dead11r++) {
                        switch (donor_replacementGLF_dead11matrix_number) {
                            case 0u:
                                GLF_dead11m22[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 2)] = GLF_dead11one;
                                break;
                            case 1u:
                                GLF_dead11m23[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 3)] = GLF_dead11one;
                                break;
                            case 2u:
                                GLF_dead11m24[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 4)] = GLF_dead11one;
                                break;
                            case 3u:
                                GLF_dead11m32[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 2)] = GLF_dead11one;
                                break;
                            case 4u:
                                GLF_dead11m33[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 3)] = GLF_dead11one;
                                break;
                            case 5u:
                                GLF_dead11m34[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 4)] = GLF_dead11one;
                                break;
                            case 6u:
                                GLF_dead11m42[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 2)] = GLF_dead11one;
                                break;
                            case 7u:
                                GLF_dead11m43[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 3)] = GLF_dead11one;
                                break;
                            case 8u:
                                GLF_dead11m44[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 4)] = GLF_dead11one;
                                break;
                                {
                                    float GLF_live12x = _GLF_FUZZED(-6.0);
                                    float GLF_live12y = _GLF_FUZZED(7.2);
                                    if (GLF_live12x * GLF_live12x + GLF_live12y * GLF_live12y > 4.0) {
                                        ;
                                    }
                                }
                        }
                        {
                            int GLF_live14i = _GLF_FUZZED((-94195));
                            int GLF_live14looplimiter2 = 0;
                            {
                                if (GLF_live14looplimiter2 >= 6) {
                                    ;
                                }
                                GLF_live14looplimiter2++;
                                {
                                    GLF_live14data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14i, 10)] = GLF_live14temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14i, 10)];
                                }
                            }
                        }
                    }
                }
                float donor_replacementGLF_dead5th = _GLF_FUZZED(log(-6.8));
                {
                    donor_replacementGLF_dead5th = -donor_replacementGLF_dead5th;
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        if (_GLF_DEAD(false)) {
                            return;
                        }
                        _GLF_color = intBitsToFloat(ivec4(-5358, 96582, 21368, 72119));
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                            if (_GLF_DEAD(false)) {
                                if (_GLF_DEAD(false)) {
                                    int donor_replacementGLF_dead9i = _GLF_FUZZED(N);
                                    if (donor_replacementGLF_dead9i >= int(GLF_dead9resolution.x)) {
                                        break;
                                    }
                                }
                                {
                                    {
                                        ;
                                    }
                                }
                                break;
                            }
                        }
                    }
                }
                {
                    {
                        ;
                    }
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    float donor_replacementGLF_dead10xCoord = _GLF_FUZZED(GLF_dead6b_b);
                    float donor_replacementGLF_dead10yCoord = _GLF_FUZZED(asinh(tanh(GLF_dead6b_b)));
                    {
                        {
                            {
                                ;
                            }
                        }
                        ;
                    }
                }
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                continue;
            }
        }
        if (_GLF_DEAD(false)) {
            return;
        }
    } while (i < 10);
    for (int j = 0; _GLF_IDENTITY(j, int(ivec4(_GLF_IDENTITY(j, int(ivec3(_GLF_IDENTITY(j, (j) | 0), 0, 0))), 1, ((1 << _GLF_IDENTITY(int(1), int(1))) >> _GLF_IDENTITY(int(1), int(1))), 0))) < 10; j++) {
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
            return;
        }
        temp[j] = data[j];
        if (_GLF_DEAD(false)) {
            continue;
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(9330.3339, -261.267, 7.8, -7.6);
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
        }
        if (_GLF_DEAD(_GLF_IDENTITY(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)), true && (_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))))) {
            discard;
        }
    }
    mergeSort();
    if (_GLF_DEAD(false)) {
        return;
        if (_GLF_DEAD(false)) {
            uint donor_replacementGLF_dead11matrix_number = _GLF_FUZZED(98417u);
            for (int GLF_dead11cols = 2; GLF_dead11cols <= 4; GLF_dead11cols++) {
                for (int GLF_dead11rows = 2; GLF_dead11rows <= 4; GLF_dead11rows++) {
                    for (int GLF_dead11c = 0; GLF_dead11c < GLF_dead11cols; GLF_dead11c++) {
                        for (int GLF_dead11r = 0; GLF_dead11r < GLF_dead11rows; GLF_dead11r++) {
                            switch (donor_replacementGLF_dead11matrix_number) {
                                case 0u:
                                    GLF_dead11m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 2)] = GLF_dead11one;
                                    break;
                                case 1u:
                                    GLF_dead11m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 3)] = GLF_dead11one;
                                    break;
                                case 2u:
                                    GLF_dead11m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 4)] = GLF_dead11one;
                                    break;
                                case 3u:
                                    GLF_dead11m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 2)] = GLF_dead11one;
                                    break;
                                    {
                                        int GLF_live14j = _GLF_FUZZED(((-70372) ^ 19204));
                                        {
                                            GLF_live14temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14j, 10)] = GLF_live14data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14j, 10)];
                                        }
                                    }
                                case 4u:
                                    {
                                        int GLF_live15looplimiter0 = 0;
                                        if (GLF_live15looplimiter0 >= 5) {
                                            ;
                                        }
                                    }
                                    GLF_dead11m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 3)] = GLF_dead11one;
                                    break;
                                case 5u:
                                    GLF_dead11m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 4)] = GLF_dead11one;
                                    break;
                                case 6u:
                                    GLF_dead11m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 2)] = GLF_dead11one;
                                    break;
                                case 7u:
                                    GLF_dead11m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 3)] = GLF_dead11one;
                                    break;
                                case 8u:
                                    GLF_dead11m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 4)] = GLF_dead11one;
                                    break;
                            }
                        }
                    }
                    donor_replacementGLF_dead11matrix_number = donor_replacementGLF_dead11matrix_number + 1u;
                }
            }
        }
    }
    float grey;
    if (int(gl_FragCoord[1]) < 30) {
        grey = 0.5 + float(data[0]) / 10.0;
    } else {
        if (int(gl_FragCoord[1]) < 60) {
            {
                int GLF_live13looplimiter1 = 0;
                ivec2 GLF_live13p = _GLF_FUZZED(ivec2(41301, -86340));
                {
                    if (GLF_live13looplimiter1 >= 6) {
                        ;
                    }
                    GLF_live13looplimiter1++;
                    {
                        GLF_live13p.x -= 16;
                    }
                }
            }
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(9.1, 99.91, -87.97, -587.029);
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= _GLF_ZERO(0.0, injectionSwitch.x))))) {
                            if (_GLF_DEAD(false)) {
                                {
                                    GLF_dead11_GLF_color = vec4(vec3(0.0), 1.0);
                                }
                            }
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    {
                        ivec2 GLF_live13p = _GLF_FUZZED((7223 & (56271 ^ ivec4(97265, -45930, 52892, -4334))).tq);
                        {
                            GLF_live13p.y++;
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        int donor_replacementGLF_dead11cols = _GLF_FUZZED(-38438);
                        uint donor_replacementGLF_dead11matrix_number = _GLF_FUZZED(102018u);
                        int donor_replacementGLF_dead11rows = _GLF_FUZZED((+ivec2(-20962, 88525).r));
                        {
                            for (int GLF_dead11c = 0; GLF_dead11c < donor_replacementGLF_dead11cols; GLF_dead11c++) {
                                for (int GLF_dead11r = 0; GLF_dead11r < donor_replacementGLF_dead11rows; GLF_dead11r++) {
                                    switch (donor_replacementGLF_dead11matrix_number) {
                                        case 0u:
                                            GLF_dead11m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 2)] = GLF_dead11one;
                                            break;
                                        case 1u:
                                            GLF_dead11m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 3)] = GLF_dead11one;
                                            break;
                                        case 2u:
                                            GLF_dead11m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 4)] = GLF_dead11one;
                                            break;
                                        case 3u:
                                            GLF_dead11m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 2)] = GLF_dead11one;
                                            break;
                                        case 4u:
                                            GLF_dead11m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 3)] = GLF_dead11one;
                                            break;
                                        case 5u:
                                            GLF_dead11m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 4)] = GLF_dead11one;
                                            break;
                                        case 6u:
                                            GLF_dead11m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 2)] = GLF_dead11one;
                                            break;
                                        case 7u:
                                            GLF_dead11m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 3)] = GLF_dead11one;
                                            break;
                                        case 8u:
                                            GLF_dead11m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 4)] = GLF_dead11one;
                                            break;
                                    }
                                }
                            }
                            donor_replacementGLF_dead11matrix_number = donor_replacementGLF_dead11matrix_number + 1u;
                        }
                    }
                    return;
                }
                if (_GLF_DEAD(false)) {
                    bool donor_replacementGLF_dead6c2 = _GLF_FUZZED((mat4x2(2.5, 93.23, 72.87, -2633.2939, 99.23, -3.2, -6.1, 5.6) != mat4x2(mat2x3(1.8, 419.314, -31.24, -4.4, -257.272, -3.0))));
                    if (!donor_replacementGLF_dead6c2) {
                        ;
                    }
                }
                {
                    vec2 GLF_live14color = _GLF_FUZZED((vec2(-6.3, -16.53) * (-8.4)));
                    int GLF_live14i = _GLF_FUZZED(55916);
                    vec3 GLF_live14vecCoor = _GLF_FUZZED(vec3(70.01, -88.89, -77.32));
                    if (int(GLF_live14gl_FragCoord[1]) < 240) {
                        GLF_live14color = fract(asinh(GLF_live14vecCoor.yx - trunc(float(GLF_live14data[6]))));
                        GLF_live14color.y -= isnan(float(GLF_live14i)) ? tanh(GLF_live14gl_FragCoord.x) : atanh(GLF_live14gl_FragCoord.y);
                        ;
                    } else if (int(GLF_live14gl_FragCoord[1]) < 270) {
                        GLF_live14color = fract(sin(GLF_live14vecCoor.yx - trunc(float(GLF_live14data[7]))));
                        GLF_live14color.y *= mix(normalize(GLF_live14vecCoor), normalize(vec3(GLF_live14color, degrees(GLF_live14color.x))), GLF_live14injectionSwitch.x).y;
                        ;
                    } else {
                        ;
                    }
                }
                _GLF_color = vec4(-7.3, 8745.6038, -2.5, -9740.5508);
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        return;
                    }
                }
                {
                    int GLF_live3i = _GLF_FUZZED(((-11792) | (-80874)));
                    {
                        int GLF_live14j = _GLF_FUZZED(-84612);
                        {
                            GLF_live14temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14j, 10)] = GLF_live14data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14j, 10)];
                        }
                    }
                    float GLF_live3limit = _GLF_FUZZED(-7.0);
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                            return;
                        }
                        return;
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                            float donor_replacementGLF_dead10c_im = _GLF_FUZZED(-8.1);
                            {
                                ivec2 GLF_live13p = _GLF_FUZZED((ivec2(-27879, 87466) * ivec2(-74716, 20716)));
                                {
                                    GLF_live13p.x = -GLF_live13p.x;
                                }
                            }
                            float donor_replacementGLF_dead10c_re = _GLF_FUZZED(-9624.3128);
                            int donor_replacementGLF_dead10iteration = _GLF_FUZZED(i);
                            float donor_replacementGLF_dead10x = _GLF_FUZZED(GLF_live3limit);
                            float donor_replacementGLF_dead10y = _GLF_FUZZED(vec3(-26.11, -1.6, -5.0)[0]);
                            for (int GLF_dead10k = 0; GLF_dead10k < 1000; GLF_dead10k++) {
                                if (donor_replacementGLF_dead10x * donor_replacementGLF_dead10x + donor_replacementGLF_dead10y * donor_replacementGLF_dead10y > 4.0) {
                                    break;
                                }
                                float GLF_dead10x_new = donor_replacementGLF_dead10x * donor_replacementGLF_dead10x - donor_replacementGLF_dead10y * donor_replacementGLF_dead10y + donor_replacementGLF_dead10c_re;
                                donor_replacementGLF_dead10y = 2.0 * donor_replacementGLF_dead10x * donor_replacementGLF_dead10y + donor_replacementGLF_dead10c_im;
                                donor_replacementGLF_dead10x = GLF_dead10x_new;
                                donor_replacementGLF_dead10iteration++;
                            }
                        }
                    }
                    int GLF_live3looplimiter0 = 0;
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        int donor_replacementGLF_dead11c = _GLF_FUZZED(-41074);
                        uint donor_replacementGLF_dead11matrix_number = _GLF_FUZZED(uvec4(138402u, 177651u, 99980u, 88353u)[1]);
                        int donor_replacementGLF_dead11rows = _GLF_FUZZED(N);
                        for (int GLF_dead11r = 0; GLF_dead11r < donor_replacementGLF_dead11rows; GLF_dead11r++) {
                            switch (donor_replacementGLF_dead11matrix_number) {
                                case 0u:
                                    GLF_dead11m22[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 2)] = GLF_dead11one;
                                    break;
                                case 1u:
                                    GLF_dead11m23[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 3)] = GLF_dead11one;
                                    break;
                                case 2u:
                                    GLF_dead11m24[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 4)] = GLF_dead11one;
                                    break;
                                case 3u:
                                    GLF_dead11m32[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 2)] = GLF_dead11one;
                                    break;
                                case 4u:
                                    GLF_dead11m33[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 3)] = GLF_dead11one;
                                    break;
                                case 5u:
                                    GLF_dead11m34[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 4)] = GLF_dead11one;
                                    break;
                                case 6u:
                                    GLF_dead11m42[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 2)] = GLF_dead11one;
                                    break;
                                case 7u:
                                    GLF_dead11m43[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 3)] = GLF_dead11one;
                                    break;
                                case 8u:
                                    GLF_dead11m44[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 4)] = GLF_dead11one;
                                    break;
                            }
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        if (_GLF_DEAD(false)) {
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                return;
                            }
                            int donor_replacementGLF_dead7l = _GLF_FUZZED(bitfieldExtract(N, -6510, N));
                            if (_GLF_DEAD(false)) {
                                return;
                            }
                            int donor_replacementGLF_dead7m = _GLF_FUZZED(ivec2(-64663, -99545)[1]);
                            {
                                donor_replacementGLF_dead7l = donor_replacementGLF_dead7m + 1;
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = log(vec4(-8565.4050, -550.011, -6.9, 5.2));
                                    if (_GLF_DEAD(false)) {
                                        if (_GLF_DEAD(false)) {
                                            {
                                                ;
                                            }
                                        }
                                        return;
                                    }
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                            }
                            if (_GLF_DEAD(false)) {
                                return;
                            }
                        }
                        return;
                        if (_GLF_DEAD(false)) {
                            float donor_replacementGLF_dead5th = _GLF_FUZZED(mix(injectionSwitch[1], GLF_live3limit, (GLF_live3looplimiter0 == i)));
                            vec2 donor_replacementGLF_dead5v = _GLF_FUZZED(vec2(1798.7270, 2.3));
                            if (donor_replacementGLF_dead5v.y < 0.0) {
                                if (_GLF_DEAD(false)) {
                                    {
                                        {
                                            ;
                                        }
                                    }
                                    return;
                                }
                                donor_replacementGLF_dead5th = -donor_replacementGLF_dead5th;
                                {
                                    int GLF_live14i = _GLF_FUZZED((20820));
                                    int GLF_live14looplimiter5 = 0;
                                    {
                                        if (GLF_live14looplimiter5 >= 6) {
                                            ;
                                        }
                                        GLF_live14looplimiter5++;
                                        {
                                            switch (GLF_live14i) {
                                                case 0:
                                                    GLF_live14data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14i, 10)] = 4;
                                                    break;
                                                case 1:
                                                    GLF_live14data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14i, 10)] = 3;
                                                    break;
                                                case 2:
                                                    GLF_live14data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14i, 10)] = 2;
                                                    break;
                                                case 3:
                                                    GLF_live14data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14i, 10)] = 1;
                                                    break;
                                                case 4:
                                                    GLF_live14data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14i, 10)] = 0;
                                                    break;
                                                case 5:
                                                    GLF_live14data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14i, 10)] = -1;
                                                    break;
                                                case 6:
                                                    GLF_live14data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14i, 10)] = -2;
                                                    break;
                                                case 7:
                                                    GLF_live14data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14i, 10)] = -3;
                                                    break;
                                                case 8:
                                                    GLF_live14data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14i, 10)] = -4;
                                                    break;
                                                case 9:
                                                    GLF_live14data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14i, 10)] = -5;
                                                    break;
                                            }
                                            GLF_live14i++;
                                        }
                                    }
                                }
                            }
                        }
                    }
                    float GLF_live3ref = _GLF_FUZZED(float(true));
                    if (_GLF_DEAD(false)) {
                        bool donor_replacementGLF_dead6c6 = _GLF_FUZZED(true);
                        {
                            ivec2 GLF_live13p = _GLF_FUZZED((ivec2(-85751, -84212) & (-39261)));
                            {
                                int GLF_live13looplimiter1 = 0;
                                while (GLF_live13p.x > 15) {
                                    if (GLF_live13looplimiter1 >= 6) {
                                        break;
                                    }
                                    GLF_live13looplimiter1++;
                                    {
                                        GLF_live13p.x -= 16;
                                    }
                                }
                            }
                        }
                        int donor_replacementGLF_dead6msb8 = _GLF_FUZZED(GLF_live3looplimiter0);
                        vec2 donor_replacementGLF_dead6pos = _GLF_FUZZED(cos(vec2(7715.3673, -976.296)));
                        vec3 donor_replacementGLF_dead6setting = _GLF_FUZZED(dFdx(abs(vec3(-2.0, -9331.9365, -6.9))));
                        if (!donor_replacementGLF_dead6c6) {
                            ;
                        }
                    }
                    float GLF_live3s = _GLF_FUZZED(695.078);
                    {
                        int GLF_live14i = _GLF_FUZZED(ivec2(28967, 62994).t);
                        int GLF_live14k = _GLF_FUZZED((int(true) * int(129472u)));
                        int GLF_live14looplimiter1 = 0;
                        {
                            if (GLF_live14looplimiter1 >= 6) {
                                ;
                            }
                            GLF_live14looplimiter1++;
                            {
                                GLF_live14temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14k++, 10)] = GLF_live14data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14i++, 10)];
                            }
                        }
                    }
                    {
                        if (GLF_live3looplimiter0 >= 3) {
                            {
                                int GLF_live14looplimiter2 = 0;
                                if (GLF_live14looplimiter2 >= 6) {
                                    ;
                                }
                            }
                            ;
                        }
                        GLF_live3looplimiter0++;
                        {
                            if (mod(float(GLF_live3i), GLF_live3ref) <= 0.01) {
                                if (_GLF_DEAD(false)) {
                                    int donor_replacementGLF_dead11cols = _GLF_FUZZED(int((GLF_live3looplimiter0, (mat3x4(-7.6, 8775.5413, 608.643, -4.5, 2.7, 5235.8711, -8.7, 8281.6059, -896.808, 6609.8230, -433.751, -2.7) != mat3x4(-8005.3032, 74.68, -4.5, -375.298, 3.7, 2.1, -4033.5281, 209.335, -63.05, -2.2, 385.937, 6.7)))));
                                    uint donor_replacementGLF_dead11matrix_number = _GLF_FUZZED(64163u);
                                    for (int GLF_dead11rows = 2; GLF_dead11rows <= 4; GLF_dead11rows++) {
                                        {
                                            ivec2 GLF_live13p = _GLF_FUZZED(ivec2(49583, -87753));
                                            {
                                                int GLF_live13looplimiter1 = 0;
                                                while (GLF_live13p.x > 15) {
                                                    if (GLF_live13looplimiter1 >= 6) {
                                                        break;
                                                    }
                                                    GLF_live13looplimiter1++;
                                                    {
                                                        GLF_live13p.x -= 16;
                                                    }
                                                }
                                            }
                                        }
                                        for (int GLF_dead11c = 0; GLF_dead11c < donor_replacementGLF_dead11cols; GLF_dead11c++) {
                                            for (int GLF_dead11r = 0; GLF_dead11r < GLF_dead11rows; GLF_dead11r++) {
                                                {
                                                    int GLF_live13i = _GLF_FUZZED(45928);
                                                    ivec2 GLF_live13p = _GLF_FUZZED((4525 + ivec2(-7424, 89546)));
                                                    {
                                                        int GLF_live13looplimiter0 = 0;
                                                        for (GLF_live13i = 0; GLF_live13i < 100; GLF_live13i++) {
                                                            if (GLF_live13looplimiter0 >= 6) {
                                                                break;
                                                            }
                                                            GLF_live13looplimiter0++;
                                                            {
                                                                GLF_live13p = GLF_live13iter(GLF_live13p);
                                                            }
                                                        }
                                                    }
                                                }
                                                switch (donor_replacementGLF_dead11matrix_number) {
                                                    case 0u:
                                                        GLF_dead11m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 2)] = GLF_dead11one;
                                                        break;
                                                    case 1u:
                                                        GLF_dead11m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 3)] = GLF_dead11one;
                                                        break;
                                                    case 2u:
                                                        GLF_dead11m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 4)] = GLF_dead11one;
                                                        break;
                                                    case 3u:
                                                        GLF_dead11m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 2)] = GLF_dead11one;
                                                        break;
                                                    case 4u:
                                                        GLF_dead11m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 3)] = GLF_dead11one;
                                                        break;
                                                    case 5u:
                                                        GLF_dead11m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 4)] = GLF_dead11one;
                                                        break;
                                                    case 6u:
                                                        GLF_dead11m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 2)] = GLF_dead11one;
                                                        break;
                                                    case 7u:
                                                        {
                                                            int GLF_live12iteration = _GLF_FUZZED(76836);
                                                            float GLF_live12xCoord = _GLF_FUZZED(-500.452);
                                                            float GLF_live12yCoord = _GLF_FUZZED((-(-3.4)));
                                                            if (GLF_live12iteration < 1000) {
                                                                ;
                                                            } else {
                                                                ;
                                                            }
                                                        }
                                                        GLF_dead11m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 3)] = GLF_dead11one;
                                                        break;
                                                    case 8u:
                                                        GLF_dead11m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 4)] = GLF_dead11one;
                                                        break;
                                                }
                                            }
                                        }
                                        donor_replacementGLF_dead11matrix_number = donor_replacementGLF_dead11matrix_number + 1u;
                                    }
                                }
                                GLF_live3s += 0.2;
                                {
                                    {
                                        ;
                                    }
                                }
                                if (_GLF_DEAD(false)) {
                                    float donor_replacementGLF_dead10xCoord = _GLF_FUZZED(GLF_live3s);
                                    float donor_replacementGLF_dead10yCoord = _GLF_FUZZED(grey);
                                    {
                                        ;
                                    }
                                }
                            }
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    {
                                        int GLF_live12looplimiter2 = 0;
                                        if (GLF_live12looplimiter2 >= 7) {
                                            ;
                                        }
                                    }
                                    {
                                        discard;
                                    }
                                }
                                _GLF_color = vec4(71.88, 2.4, -3416.7560, 919.169);
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                                if (_GLF_DEAD(false)) {
                                    {
                                        GLF_dead11_GLF_color = vec4(vec3(0.0), 1.0);
                                    }
                                }
                            }
                            if (float(GLF_live3i) >= GLF_live3limit) {
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = vec4(-3.1, 439.017, 52.54, -4.8);
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                                ;
                                if (_GLF_DEAD(false)) {
                                    vec2 donor_replacementGLF_dead5a = _GLF_FUZZED(injectionSwitch);
                                    float donor_replacementGLF_dead5z = _GLF_FUZZED(GLF_live3limit);
                                    if (donor_replacementGLF_dead5a.y > donor_replacementGLF_dead5a.x) {
                                        donor_replacementGLF_dead5z = donor_replacementGLF_dead5a.x / donor_replacementGLF_dead5a.y;
                                    } else {
                                        donor_replacementGLF_dead5z = donor_replacementGLF_dead5a.y / donor_replacementGLF_dead5a.x;
                                    }
                                    if (_GLF_DEAD(_GLF_IDENTITY(false, !(_GLF_IDENTITY(!(false), (!(false)) && true))))) {
                                        {
                                            int GLF_live13looplimiter1 = 0;
                                            ivec2 GLF_live13p = _GLF_FUZZED(ivec2(-40967, -67129));
                                            while (GLF_live13p.x > 15) {
                                                if (GLF_live13looplimiter1 >= 6) {
                                                    break;
                                                }
                                                GLF_live13looplimiter1++;
                                                {
                                                    GLF_live13p.x -= 16;
                                                }
                                            }
                                        }
                                        return;
                                    }
                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                        int donor_replacementGLF_dead11cols = _GLF_FUZZED(GLF_live3i);
                                        uint donor_replacementGLF_dead11matrix_number = _GLF_FUZZED(39988u);
                                        int donor_replacementGLF_dead11rows = _GLF_FUZZED(ivec4(57137, 70569, -98780, -76131).p);
                                        for (int GLF_dead11c = 0; GLF_dead11c < donor_replacementGLF_dead11cols; GLF_dead11c++) {
                                            for (int GLF_dead11r = 0; GLF_dead11r < donor_replacementGLF_dead11rows; GLF_dead11r++) {
                                                switch (donor_replacementGLF_dead11matrix_number) {
                                                    case 0u:
                                                        GLF_dead11m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 2)] = GLF_dead11one;
                                                        break;
                                                    case 1u:
                                                        GLF_dead11m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 3)] = GLF_dead11one;
                                                        break;
                                                    case 2u:
                                                        GLF_dead11m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 4)] = GLF_dead11one;
                                                        break;
                                                        {
                                                            float GLF_live12c_im = _GLF_FUZZED(float((76129u <= 86357u)));
                                                            float GLF_live12c_re = _GLF_FUZZED(670.727);
                                                            int GLF_live12iteration = _GLF_FUZZED(64651);
                                                            float GLF_live12x = _GLF_FUZZED(float(22073u));
                                                            float GLF_live12y = _GLF_FUZZED(-18.27);
                                                            {
                                                                if (GLF_live12x * GLF_live12x + GLF_live12y * GLF_live12y > 4.0) {
                                                                    ;
                                                                }
                                                                float GLF_live12x_new = GLF_live12x * GLF_live12x - GLF_live12y * GLF_live12y + GLF_live12c_re;
                                                                GLF_live12y = 2.0 * GLF_live12x * GLF_live12y + GLF_live12c_im;
                                                                GLF_live12x = GLF_live12x_new;
                                                                GLF_live12iteration++;
                                                            }
                                                        }
                                                    case 3u:
                                                        GLF_dead11m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 2)] = GLF_dead11one;
                                                        break;
                                                    case 4u:
                                                        GLF_dead11m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 3)] = GLF_dead11one;
                                                        break;
                                                    case 5u:
                                                        GLF_dead11m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 4)] = GLF_dead11one;
                                                        break;
                                                    case 6u:
                                                        GLF_dead11m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 2)] = GLF_dead11one;
                                                        break;
                                                    case 7u:
                                                        GLF_dead11m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 3)] = GLF_dead11one;
                                                        break;
                                                    case 8u:
                                                        GLF_dead11m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 4)] = GLF_dead11one;
                                                        break;
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            GLF_live3i++;
                        }
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        int donor_replacementGLF_dead11c = _GLF_FUZZED(ivec4(-75934, 99308, 36416, 39656).x);
                        uint donor_replacementGLF_dead11matrix_number = _GLF_FUZZED(180022u);
                        int donor_replacementGLF_dead11r = _GLF_FUZZED(findMSB(N));
                        {
                            int GLF_live13looplimiter0 = 0;
                            if (GLF_live13looplimiter0 >= 6) {
                                ;
                            }
                        }
                        {
                            switch (donor_replacementGLF_dead11matrix_number) {
                                case 0u:
                                    GLF_dead11m22[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11c, 2)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11r, 2)] = GLF_dead11one;
                                    break;
                                case 1u:
                                    GLF_dead11m23[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11c, 2)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11r, 3)] = GLF_dead11one;
                                    break;
                                case 2u:
                                    GLF_dead11m24[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11c, 2)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11r, 4)] = GLF_dead11one;
                                    break;
                                case 3u:
                                    {
                                        {
                                            ;
                                        }
                                    }
                                    GLF_dead11m32[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11c, 3)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11r, 2)] = GLF_dead11one;
                                    break;
                                case 4u:
                                    GLF_dead11m33[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11c, 3)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11r, 3)] = GLF_dead11one;
                                    break;
                                case 5u:
                                    GLF_dead11m34[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11c, 3)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11r, 4)] = GLF_dead11one;
                                    break;
                                case 6u:
                                    GLF_dead11m42[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11c, 4)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11r, 2)] = GLF_dead11one;
                                    break;
                                case 7u:
                                    GLF_dead11m43[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11c, 4)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11r, 3)] = GLF_dead11one;
                                    break;
                                case 8u:
                                    GLF_dead11m44[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11c, 4)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11r, 4)] = GLF_dead11one;
                                    break;
                            }
                        }
                    }
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        float donor_replacementGLF_dead10c_im = _GLF_FUZZED(cosh(6.6));
                        float donor_replacementGLF_dead10c_re = _GLF_FUZZED((+grey));
                        int donor_replacementGLF_dead10iteration = _GLF_FUZZED(((-71537) + ivec4(38403, 26331, -22992, 57685)).w);
                        float donor_replacementGLF_dead10x = _GLF_FUZZED(grey);
                        float donor_replacementGLF_dead10y = _GLF_FUZZED(smoothstep(GLF_dead6b_b, GLF_dead6b_b, grey));
                        for (int GLF_dead10k = 0; GLF_dead10k < 1000; GLF_dead10k++) {
                            if (donor_replacementGLF_dead10x * donor_replacementGLF_dead10x + donor_replacementGLF_dead10y * donor_replacementGLF_dead10y > 4.0) {
                                break;
                            }
                            float GLF_dead10x_new = donor_replacementGLF_dead10x * donor_replacementGLF_dead10x - donor_replacementGLF_dead10y * donor_replacementGLF_dead10y + donor_replacementGLF_dead10c_re;
                            donor_replacementGLF_dead10y = 2.0 * donor_replacementGLF_dead10x * donor_replacementGLF_dead10y + donor_replacementGLF_dead10c_im;
                            donor_replacementGLF_dead10x = GLF_dead10x_new;
                            donor_replacementGLF_dead10iteration++;
                            {
                                ivec2 GLF_live13p = _GLF_FUZZED(ivec2(53530, -42135));
                                if (GLF_live13p.x < 0) {
                                    GLF_live13p.y++;
                                }
                            }
                        }
                    }
                    return;
                }
                {
                    int GLF_live12looplimiter1 = 0;
                    if (GLF_live12looplimiter1 >= 7) {
                        ;
                    }
                }
            }
            grey = 0.5 + float(data[1]) / 10.0;
            {
                {
                    ;
                }
            }
        } else {
            if (_GLF_DEAD(false)) {
                float donor_replacementGLF_dead5th = _GLF_FUZZED(roundEven(vec2(28.28, -840.389).r));
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < sqrt(sqrt(0.0)))))) {
                    float donor_replacementGLF_dead10x = _GLF_FUZZED(sin(length(GLF_dead6b_b)));
                    {
                        int GLF_live14high = _GLF_FUZZED((true ? (-85525) : 96545));
                        int GLF_live14looplimiter4 = 0;
                        int GLF_live14low = _GLF_FUZZED((-((-97153) & (-68491))));
                        for (int GLF_live14m = 1; GLF_live14m <= GLF_live14high; GLF_live14m = 2 * GLF_live14m) {
                            if (GLF_live14looplimiter4 >= 6) {
                                break;
                            }
                            GLF_live14looplimiter4++;
                            {
                                {
                                    int GLF_live14looplimiter3 = 0;
                                    for (int GLF_live14i = GLF_live14low; GLF_live14i < GLF_live14high; GLF_live14i += 2 * GLF_live14m) {
                                        if (GLF_live14looplimiter3 >= 6) {
                                            break;
                                        }
                                        GLF_live14looplimiter3++;
                                        {
                                            int GLF_live14from = GLF_live14i;
                                            int GLF_live14mid = GLF_live14i + GLF_live14m - 1;
                                            int GLF_live14to = min(GLF_live14i + 2 * GLF_live14m - 1, GLF_live14high);
                                            GLF_live14merge(GLF_live14from, GLF_live14mid, GLF_live14to);
                                        }
                                    }
                                }
                            }
                        }
                    }
                    float donor_replacementGLF_dead10y = _GLF_FUZZED(grey);
                    if (donor_replacementGLF_dead10x * donor_replacementGLF_dead10x + donor_replacementGLF_dead10y * donor_replacementGLF_dead10y > 4.0) {
                        ;
                    }
                }
                {
                    int GLF_live14i = _GLF_FUZZED(ivec3(88502, -78539, -49337).t);
                    int GLF_live14j = _GLF_FUZZED(-21817);
                    int GLF_live14k = _GLF_FUZZED(-32408);
                    if (GLF_live14data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14i, 10)] < GLF_live14data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14j, 10)]) {
                        GLF_live14temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14k++, 10)] = GLF_live14data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14i++, 10)];
                    } else {
                        GLF_live14temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14k++, 10)] = GLF_live14data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14j++, 10)];
                    }
                }
                {
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        return;
                    }
                    donor_replacementGLF_dead5th = -donor_replacementGLF_dead5th;
                }
            }
            if (int(gl_FragCoord[1]) < 90) {
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    {
                        {
                            ;
                        }
                    }
                    float donor_replacementGLF_dead10c_re = _GLF_FUZZED(vec3(-597.450, -126.155, 93.69).g);
                    int donor_replacementGLF_dead10iteration = _GLF_FUZZED(i);
                    float donor_replacementGLF_dead10x = _GLF_FUZZED(tanh(GLF_dead6b_b));
                    float donor_replacementGLF_dead10y = _GLF_FUZZED(grey);
                    for (int GLF_dead10k = 0; GLF_dead10k < 1000; GLF_dead10k++) {
                        if (donor_replacementGLF_dead10x * donor_replacementGLF_dead10x + donor_replacementGLF_dead10y * donor_replacementGLF_dead10y > 4.0) {
                            break;
                        }
                        float GLF_dead10x_new = donor_replacementGLF_dead10x * donor_replacementGLF_dead10x - donor_replacementGLF_dead10y * donor_replacementGLF_dead10y + donor_replacementGLF_dead10c_re;
                        donor_replacementGLF_dead10y = 2.0 * donor_replacementGLF_dead10x * donor_replacementGLF_dead10y + grey;
                        donor_replacementGLF_dead10x = GLF_dead10x_new;
                        donor_replacementGLF_dead10iteration++;
                    }
                }
                if (_GLF_DEAD(false)) {
                    {
                        int GLF_live14from = _GLF_FUZZED(int((mat4x2(-437.880, -6.3, 2154.4272, 5.3, -97.15, -60.26, 2.0, -7.3) != mat4x2(-36.37, -420.442, -3.3, 12.99, -691.196, 8186.7370, 45.29, -51.33))));
                        int GLF_live14to = _GLF_FUZZED(((-50103) | (-34551)));
                        {
                            int GLF_live14looplimiter2 = 0;
                            for (int GLF_live14i = GLF_live14from; GLF_live14i <= GLF_live14to; GLF_live14i++) {
                                if (GLF_live14looplimiter2 >= 6) {
                                    break;
                                }
                                GLF_live14looplimiter2++;
                                {
                                    GLF_live14data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14i, 10)] = GLF_live14temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14i, 10)];
                                }
                            }
                        }
                    }
                    return;
                }
                if (_GLF_DEAD(false)) {
                    return;
                }
                grey = 0.5 + float(data[2]) / 10.0;
            } else {
                if (int(gl_FragCoord[1]) < 120) {
                    grey = 0.5 + float(data[3]) / 10.0;
                } else {
                    if (int(gl_FragCoord[1]) < 150) {
                        if (_GLF_DEAD(false)) {
                            int donor_replacementGLF_dead11cols = _GLF_FUZZED(bitCount(25356u));
                            uint donor_replacementGLF_dead11matrix_number = _GLF_FUZZED(82928u);
                            int donor_replacementGLF_dead11rows = _GLF_FUZZED(int(GLF_dead6b_b));
                            for (int GLF_dead11c = 0; GLF_dead11c < donor_replacementGLF_dead11cols; GLF_dead11c++) {
                                for (int GLF_dead11r = 0; GLF_dead11r < donor_replacementGLF_dead11rows; GLF_dead11r++) {
                                    switch (donor_replacementGLF_dead11matrix_number) {
                                        case 0u:
                                            GLF_dead11m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 2)] = GLF_dead11one;
                                            break;
                                        case 1u:
                                            GLF_dead11m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 3)] = GLF_dead11one;
                                            break;
                                        case 2u:
                                            GLF_dead11m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 4)] = GLF_dead11one;
                                            break;
                                        case 3u:
                                            GLF_dead11m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 2)] = GLF_dead11one;
                                            break;
                                        case 4u:
                                            GLF_dead11m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 3)] = GLF_dead11one;
                                            break;
                                        case 5u:
                                            GLF_dead11m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 4)] = GLF_dead11one;
                                            break;
                                        case 6u:
                                            GLF_dead11m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 2)] = GLF_dead11one;
                                            break;
                                        case 7u:
                                            GLF_dead11m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 3)] = GLF_dead11one;
                                            break;
                                        case 8u:
                                            GLF_dead11m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 4)] = GLF_dead11one;
                                            break;
                                    }
                                }
                            }
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_ZERO(0.0, injectionSwitch.x))))) {
                            return;
                        }
                        discard;
                    } else {
                        if (int(gl_FragCoord[1]) < 180) {
                            grey = _GLF_IDENTITY(0.5 + float(data[5]) / 10.0, clamp(_GLF_IDENTITY(0.5 + float(data[5]) / 10.0, (true ? (0.5 + _GLF_IDENTITY(float(data[5]), min(float(data[5]), float(data[5]))) / 10.0) : _GLF_FUZZED(7614.4014))), 0.5 + float(data[5]) / 10.0, 0.5 + float(data[5]) / 10.0));
                        } else {
                            if (int(gl_FragCoord[1]) < 210) {
                                if (_GLF_DEAD(false)) {
                                    int donor_replacementGLF_dead11c = _GLF_FUZZED(N);
                                    uint donor_replacementGLF_dead11matrix_number = _GLF_FUZZED(148593u);
                                    int donor_replacementGLF_dead11rows = _GLF_FUZZED((-92727, i));
                                    {
                                        for (int GLF_dead11r = 0; GLF_dead11r < donor_replacementGLF_dead11rows; GLF_dead11r++) {
                                            switch (donor_replacementGLF_dead11matrix_number) {
                                                case 0u:
                                                    {
                                                        int GLF_live13i = _GLF_FUZZED((7778 * 11794));
                                                        ivec2 GLF_live13p = _GLF_FUZZED(ivec2(-90749, 9336));
                                                        {
                                                            int GLF_live13looplimiter0 = 0;
                                                            for (GLF_live13i = 0; GLF_live13i < 100; GLF_live13i++) {
                                                                if (GLF_live13looplimiter0 >= 6) {
                                                                    break;
                                                                }
                                                                GLF_live13looplimiter0++;
                                                                {
                                                                    GLF_live13p = GLF_live13iter(GLF_live13p);
                                                                }
                                                            }
                                                        }
                                                    }
                                                    GLF_dead11m22[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 2)] = GLF_dead11one;
                                                    break;
                                                case 1u:
                                                    GLF_dead11m23[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 3)] = GLF_dead11one;
                                                    break;
                                                case 2u:
                                                    GLF_dead11m24[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 4)] = GLF_dead11one;
                                                    break;
                                                case 3u:
                                                    GLF_dead11m32[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 2)] = GLF_dead11one;
                                                    break;
                                                case 4u:
                                                    GLF_dead11m33[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 3)] = GLF_dead11one;
                                                    break;
                                                case 5u:
                                                    GLF_dead11m34[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 4)] = GLF_dead11one;
                                                    break;
                                                case 6u:
                                                    GLF_dead11m42[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 2)] = GLF_dead11one;
                                                    break;
                                                case 7u:
                                                    {
                                                        ivec2 GLF_live13p = _GLF_FUZZED(ivec2(-93470, 42698));
                                                        if (GLF_live13p.x < 0) {
                                                            GLF_live13p.x = -GLF_live13p.x;
                                                        }
                                                    }
                                                    GLF_dead11m43[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 3)] = GLF_dead11one;
                                                    break;
                                                case 8u:
                                                    GLF_dead11m44[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 4)] = GLF_dead11one;
                                                    break;
                                            }
                                        }
                                    }
                                }
                                grey = 0.5 + float(data[6]) / 10.0;
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                        if (_GLF_DEAD(false)) {
                                            int donor_replacementGLF_dead11c = _GLF_FUZZED(N);
                                            uint donor_replacementGLF_dead11matrix_number = _GLF_FUZZED(128065u);
                                            int donor_replacementGLF_dead11r = _GLF_FUZZED(bitfieldInsert(ivec4(2385, 47374, 67621, 52266), ivec4(49507, -81487, -88045, -21867), i, (i << N))[1]);
                                            {
                                                switch (donor_replacementGLF_dead11matrix_number) {
                                                    case 0u:
                                                        GLF_dead11m22[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11c, 2)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11r, 2)] = GLF_dead11one;
                                                        break;
                                                    case 1u:
                                                        GLF_dead11m23[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11c, 2)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11r, 3)] = GLF_dead11one;
                                                        break;
                                                    case 2u:
                                                        GLF_dead11m24[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11c, 2)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11r, 4)] = GLF_dead11one;
                                                        break;
                                                    case 3u:
                                                        GLF_dead11m32[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11c, 3)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11r, 2)] = GLF_dead11one;
                                                        break;
                                                    case 4u:
                                                        GLF_dead11m33[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11c, 3)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11r, 3)] = GLF_dead11one;
                                                        break;
                                                    case 5u:
                                                        GLF_dead11m34[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11c, 3)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11r, 4)] = GLF_dead11one;
                                                        break;
                                                    case 6u:
                                                        GLF_dead11m42[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11c, 4)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11r, 2)] = GLF_dead11one;
                                                        break;
                                                    case 7u:
                                                        GLF_dead11m43[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11c, 4)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11r, 3)] = GLF_dead11one;
                                                        break;
                                                    case 8u:
                                                        GLF_dead11m44[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11c, 4)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11r, 4)] = GLF_dead11one;
                                                        break;
                                                }
                                            }
                                            {
                                                int GLF_live14j = _GLF_FUZZED(58551);
                                                {
                                                    GLF_live14temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14j, 10)] = GLF_live14data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14j, 10)];
                                                }
                                            }
                                        }
                                        return;
                                    }
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = vec4(3569.2891, -634.566, -629.229, 438.898);
                                    if (_GLF_DEAD(false)) {
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                            float donor_replacementGLF_dead10x = _GLF_FUZZED(injectionSwitch.y);
                                            float donor_replacementGLF_dead10y = _GLF_FUZZED(grey);
                                            if (donor_replacementGLF_dead10x * donor_replacementGLF_dead10x + donor_replacementGLF_dead10y * donor_replacementGLF_dead10y > 4.0) {
                                                ;
                                            }
                                        }
                                        return;
                                    }
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                                {
                                    int GLF_live13looplimiter1 = 0;
                                    if (GLF_live13looplimiter1 >= 6) {
                                        ;
                                    }
                                }
                            } else {
                                if (_GLF_DEAD(false)) {
                                    return;
                                    if (_GLF_DEAD(false)) {
                                        int donor_replacementGLF_dead7a = _GLF_FUZZED(N);
                                        if (_GLF_DEAD(false)) {
                                            return;
                                        }
                                        int donor_replacementGLF_dead7b = _GLF_FUZZED(N);
                                        int donor_replacementGLF_dead7c = _GLF_FUZZED(-15370);
                                        vec2 donor_replacementGLF_dead7uv = _GLF_FUZZED(vec2(-2.3, -6.4));
                                        {
                                            donor_replacementGLF_dead7uv.y -= step(GLF_dead7injectionSwitch.y, donor_replacementGLF_dead7uv.x) + float(donor_replacementGLF_dead7a) + float(donor_replacementGLF_dead7b);
                                            {
                                                int GLF_live13looplimiter1 = 0;
                                                ivec2 GLF_live13p = _GLF_FUZZED(((-ivec2(-87439, 27849)) + (ivec2(82412, 46965))));
                                                {
                                                    if (GLF_live13looplimiter1 >= 6) {
                                                        ;
                                                    }
                                                    GLF_live13looplimiter1++;
                                                    {
                                                        GLF_live13p.x -= 16;
                                                    }
                                                }
                                            }
                                            donor_replacementGLF_dead7uv.x += ldexp(_GLF_IDENTITY(GLF_dead7injectionSwitch.y, mix(float(_GLF_IDENTITY(GLF_dead7injectionSwitch.y, mix(float(GLF_dead7injectionSwitch.y), float(_GLF_FUZZED((61.98 + (-1.1)))), bool(false)))), float(_GLF_FUZZED((((-4.7) * 8.7) + 371.006))), bool(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))))), isinf(donor_replacementGLF_dead7uv.y + donor_replacementGLF_dead7uv.x) ? findMSB(donor_replacementGLF_dead7b) : findMSB(donor_replacementGLF_dead7a));
                                            donor_replacementGLF_dead7c--;
                                        }
                                    }
                                }
                                if (int(gl_FragCoord[1]) < 240) {
                                    if (_GLF_DEAD(false)) {
                                        return;
                                    }
                                    if (_GLF_DEAD(false)) {
                                        float donor_replacementGLF_dead10c_im = _GLF_FUZZED(grey);
                                        float donor_replacementGLF_dead10c_re = _GLF_FUZZED(GLF_dead6b_b);
                                        int donor_replacementGLF_dead10iteration = _GLF_FUZZED((96525));
                                        float donor_replacementGLF_dead10x = _GLF_FUZZED(grey);
                                        float donor_replacementGLF_dead10y = _GLF_FUZZED(GLF_dead6b_b);
                                        for (int GLF_dead10k = 0; GLF_dead10k < 1000; GLF_dead10k++) {
                                            if (donor_replacementGLF_dead10x * donor_replacementGLF_dead10x + donor_replacementGLF_dead10y * donor_replacementGLF_dead10y > 4.0) {
                                                break;
                                            }
                                            float GLF_dead10x_new = donor_replacementGLF_dead10x * donor_replacementGLF_dead10x - donor_replacementGLF_dead10y * donor_replacementGLF_dead10y + donor_replacementGLF_dead10c_re;
                                            donor_replacementGLF_dead10y = 2.0 * donor_replacementGLF_dead10x * donor_replacementGLF_dead10y + donor_replacementGLF_dead10c_im;
                                            donor_replacementGLF_dead10x = GLF_dead10x_new;
                                            donor_replacementGLF_dead10iteration++;
                                        }
                                    }
                                    if (_GLF_IDENTITY(_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))), !(!(_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))))))) {
                                        return;
                                    }
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < tan(0.0))))) {
                                        int donor_replacementGLF_dead6msb8 = _GLF_FUZZED(N);
                                        {
                                            GLF_dead6b_b = clamp(float(bitfieldExtract(int(GLF_dead6resolution.x), 0, 0)), float(bitCount(donor_replacementGLF_dead6msb8)), GLF_dead6b_b * float(bitCount(donor_replacementGLF_dead6msb8)) * 3.0);
                                        }
                                        {
                                            ivec2 GLF_live13p = _GLF_FUZZED(ivec2(84962, -79468));
                                            {
                                                int GLF_live13looplimiter1 = 0;
                                                while (GLF_live13p.x > 15) {
                                                    if (GLF_live13looplimiter1 >= 6) {
                                                        break;
                                                    }
                                                    GLF_live13looplimiter1++;
                                                    {
                                                        GLF_live13p.x -= 16;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    grey = 0.5 + float(data[7]) / 10.0;
                                } else {
                                    if (int(gl_FragCoord[1]) < 270) {
                                        grey = 0.5 + float(data[8]) / 10.0;
                                    } else {
                                        discard;
                                        {
                                            vec4 _GLF_outVarBackup_GLF_color;
                                            {
                                                {
                                                    ;
                                                }
                                            }
                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                return;
                                            }
                                            _GLF_color = step(vec4(3.1, 947.919, -711.619, 9.1), vec4(-6.3, -4809.1969, 5641.7722, 818.782));
                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                if (_GLF_DEAD(false)) {
                                                    return;
                                                }
                                                {
                                                    int GLF_live13i = _GLF_FUZZED((96793 & 80743));
                                                    int GLF_live13looplimiter0 = 0;
                                                    ivec2 GLF_live13p = _GLF_FUZZED(((~(-97365)) - ivec2(96122, -12250)));
                                                    for (GLF_live13i = 0; GLF_live13i < 100; GLF_live13i++) {
                                                        if (GLF_live13looplimiter0 >= 6) {
                                                            break;
                                                        }
                                                        GLF_live13looplimiter0++;
                                                        {
                                                            GLF_live13p = GLF_live13iter(GLF_live13p);
                                                        }
                                                    }
                                                }
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                            }
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                {
                                                    ;
                                                }
                                            }
                                        }
                                    }
                                    if (_GLF_DEAD(false)) {
                                        return;
                                    }
                                }
                                {
                                    vec2 GLF_live1coord = _GLF_FUZZED(((false ? vec2(35.44, 7.0) : vec2(458.390, -77.98))));
                                    int GLF_live1looplimiter1 = 0;
                                    vec4 GLF_live1res = _GLF_FUZZED((vec4(-252.977, -2880.2597, 57.20, 5644.8978) + float(100769u)));
                                    float GLF_live1uvstep = _GLF_FUZZED((+6271.0980));
                                    for (int GLF_live1i = 0; GLF_live1i < 3; GLF_live1i++) {
                                        if (GLF_live1looplimiter1 >= 4) {
                                            break;
                                        }
                                        if (_GLF_DEAD(false)) {
                                            int donor_replacementGLF_dead11c = _GLF_FUZZED((GLF_live1i % GLF_live1i));
                                            uint donor_replacementGLF_dead11matrix_number = _GLF_FUZZED(152830u);
                                            int donor_replacementGLF_dead11r = _GLF_FUZZED(mix(i, N, false));
                                            {
                                                switch (donor_replacementGLF_dead11matrix_number) {
                                                    case 0u:
                                                        GLF_dead11m22[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11c, 2)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11r, 2)] = GLF_dead11one;
                                                        break;
                                                    case 1u:
                                                        GLF_dead11m23[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11c, 2)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11r, 3)] = GLF_dead11one;
                                                        break;
                                                    case 2u:
                                                        GLF_dead11m24[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11c, 2)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11r, 4)] = GLF_dead11one;
                                                        break;
                                                    case 3u:
                                                        GLF_dead11m32[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11c, 3)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11r, 2)] = GLF_dead11one;
                                                        break;
                                                    case 4u:
                                                        GLF_dead11m33[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11c, 3)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11r, 3)] = GLF_dead11one;
                                                        break;
                                                    case 5u:
                                                        GLF_dead11m34[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11c, 3)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11r, 4)] = GLF_dead11one;
                                                        break;
                                                    case 6u:
                                                        GLF_dead11m42[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11c, 4)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11r, 2)] = GLF_dead11one;
                                                        break;
                                                    case 7u:
                                                        GLF_dead11m43[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11c, 4)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11r, 3)] = GLF_dead11one;
                                                        break;
                                                    case 8u:
                                                        GLF_dead11m44[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11c, 4)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11r, 4)] = GLF_dead11one;
                                                        break;
                                                }
                                            }
                                        }
                                        GLF_live1looplimiter1++;
                                        {
                                            {
                                                if (_GLF_DEAD(false)) {
                                                    continue;
                                                }
                                                int GLF_live1looplimiter0 = 0;
                                                {
                                                    {
                                                        ;
                                                    }
                                                }
                                                for (int GLF_live1j = 0; GLF_live1j < 3; GLF_live1j++) {
                                                    if (GLF_live1looplimiter0 >= 4) {
                                                        break;
                                                        {
                                                            {
                                                                ;
                                                            }
                                                        }
                                                    }
                                                    GLF_live1looplimiter0++;
                                                    if (_GLF_DEAD(false)) {
                                                        int donor_replacementGLF_dead6msb8 = _GLF_FUZZED(_GLF_IDENTITY(findLSB(74129u), int(_GLF_ZERO(0.0, injectionSwitch.x)) ^ (findLSB(74129u))));
                                                        vec2 donor_replacementGLF_dead6pos = _GLF_FUZZED(vec2(-45.05, -7454.7078));
                                                        vec3 donor_replacementGLF_dead6setting = _GLF_FUZZED(vec3(GLF_live1uvstep, vec2(-8.4, 335.323)));
                                                        {
                                                            ;
                                                        }
                                                    }
                                                    {
                                                        vec4 _GLF_outVarBackup_GLF_color;
                                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                                        _GLF_color = max(vec4(-6.3, 3.5, -536.215, 15.88), 4.5);
                                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                            if (_GLF_DEAD(false)) {
                                                                break;
                                                            }
                                                        }
                                                    }
                                                    {
                                                        GLF_live1res += texture(GLF_live1tex, GLF_live1coord + vec2(float(GLF_live1i - 1) * GLF_live1uvstep, float(GLF_live1j - 1) * GLF_live1uvstep)) * GLF_live1weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live1i * 3 + GLF_live1j, 9)];
                                                    }
                                                }
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                    int donor_replacementGLF_dead11cols = _GLF_FUZZED(bitCount(27642u));
                                                    uint donor_replacementGLF_dead11matrix_number = _GLF_FUZZED(89373u);
                                                    int donor_replacementGLF_dead11rows = _GLF_FUZZED(GLF_live1i);
                                                    for (int GLF_dead11c = 0; GLF_dead11c < donor_replacementGLF_dead11cols; GLF_dead11c++) {
                                                        for (int GLF_dead11r = 0; GLF_dead11r < donor_replacementGLF_dead11rows; GLF_dead11r++) {
                                                            switch (donor_replacementGLF_dead11matrix_number) {
                                                                case 0u:
                                                                    GLF_dead11m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 2)] = GLF_dead11one;
                                                                    break;
                                                                case 1u:
                                                                    GLF_dead11m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 3)] = GLF_dead11one;
                                                                    {
                                                                        ivec2 GLF_live13p = _GLF_FUZZED(ivec2(54667, 19915));
                                                                        if (GLF_live13p.x < 0) {
                                                                            GLF_live13p.y++;
                                                                        }
                                                                    }
                                                                    break;
                                                                case 2u:
                                                                    GLF_dead11m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 4)] = GLF_dead11one;
                                                                    break;
                                                                case 3u:
                                                                    GLF_dead11m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 2)] = GLF_dead11one;
                                                                    break;
                                                                case 4u:
                                                                    {
                                                                        float GLF_live12c_im = _GLF_FUZZED(-229.200);
                                                                        float GLF_live12c_re = _GLF_FUZZED(-8.7);
                                                                        int GLF_live12iteration = _GLF_FUZZED(-25606);
                                                                        int GLF_live12looplimiter0 = 0;
                                                                        float GLF_live12x = _GLF_FUZZED(-58.02);
                                                                        float GLF_live12y = _GLF_FUZZED((-507.021));
                                                                        {
                                                                            if (GLF_live12looplimiter0 >= 7) {
                                                                                ;
                                                                            }
                                                                            GLF_live12looplimiter0++;
                                                                            {
                                                                                if (GLF_live12x * GLF_live12x + GLF_live12y * GLF_live12y > 4.0) {
                                                                                    ;
                                                                                }
                                                                                float GLF_live12x_new = GLF_live12x * GLF_live12x - GLF_live12y * GLF_live12y + GLF_live12c_re;
                                                                                GLF_live12y = 2.0 * GLF_live12x * GLF_live12y + GLF_live12c_im;
                                                                                GLF_live12x = GLF_live12x_new;
                                                                                GLF_live12iteration++;
                                                                            }
                                                                        }
                                                                    }
                                                                    GLF_dead11m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 3)] = GLF_dead11one;
                                                                    break;
                                                                case 5u:
                                                                    GLF_dead11m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 4)] = GLF_dead11one;
                                                                    break;
                                                                case 6u:
                                                                    GLF_dead11m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 2)] = GLF_dead11one;
                                                                    break;
                                                                case 7u:
                                                                    GLF_dead11m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 3)] = GLF_dead11one;
                                                                    break;
                                                                case 8u:
                                                                    GLF_dead11m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 4)] = GLF_dead11one;
                                                                    break;
                                                            }
                                                        }
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
                                    if (_GLF_DEAD(false)) {
                                        uint donor_replacementGLF_dead11matrix_number = _GLF_FUZZED(196014u);
                                        for (int GLF_dead11cols = 2; GLF_dead11cols <= 4; GLF_dead11cols++) {
                                            {
                                                {
                                                    ;
                                                }
                                            }
                                            for (int GLF_dead11rows = 2; GLF_dead11rows <= 4; GLF_dead11rows++) {
                                                for (int GLF_dead11c = 0; GLF_dead11c < GLF_dead11cols; GLF_dead11c++) {
                                                    for (int GLF_dead11r = 0; GLF_dead11r < GLF_dead11rows; GLF_dead11r++) {
                                                        switch (donor_replacementGLF_dead11matrix_number) {
                                                            case 0u:
                                                                GLF_dead11m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 2)] = GLF_dead11one;
                                                                {
                                                                    float GLF_live12xCoord = _GLF_FUZZED(((-6049.1146) - (+2.2)));
                                                                    float GLF_live12yCoord = _GLF_FUZZED((false ? 5887.1856 : (6.3)));
                                                                    {
                                                                        ;
                                                                    }
                                                                }
                                                                break;
                                                            case 1u:
                                                                GLF_dead11m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 3)] = GLF_dead11one;
                                                                break;
                                                            case 2u:
                                                                GLF_dead11m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 4)] = GLF_dead11one;
                                                                break;
                                                            case 3u:
                                                                GLF_dead11m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 2)] = GLF_dead11one;
                                                                break;
                                                            case 4u:
                                                                GLF_dead11m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 3)] = GLF_dead11one;
                                                                break;
                                                            case 5u:
                                                                {
                                                                    ivec2 GLF_live13p = _GLF_FUZZED((ivec2(9342, -25210) + 94937));
                                                                    if (GLF_live13p.x < 0) {
                                                                        GLF_live13p.x = -GLF_live13p.x;
                                                                    }
                                                                }
                                                                GLF_dead11m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 4)] = GLF_dead11one;
                                                                {
                                                                    float GLF_live12c_im = _GLF_FUZZED(9.2);
                                                                    float GLF_live12c_re = _GLF_FUZZED((+2.0));
                                                                    int GLF_live12iteration = _GLF_FUZZED(78402);
                                                                    int GLF_live12looplimiter0 = 0;
                                                                    float GLF_live12x = _GLF_FUZZED((vec2(70.72, -73.60).g * (-53.93)));
                                                                    float GLF_live12y = _GLF_FUZZED(4287.5564);
                                                                    {
                                                                        if (GLF_live12looplimiter0 >= 7) {
                                                                            ;
                                                                        }
                                                                        GLF_live12looplimiter0++;
                                                                        {
                                                                            if (GLF_live12x * GLF_live12x + GLF_live12y * GLF_live12y > 4.0) {
                                                                                ;
                                                                            }
                                                                            float GLF_live12x_new = GLF_live12x * GLF_live12x - GLF_live12y * GLF_live12y + GLF_live12c_re;
                                                                            GLF_live12y = 2.0 * GLF_live12x * GLF_live12y + GLF_live12c_im;
                                                                            GLF_live12x = GLF_live12x_new;
                                                                            GLF_live12iteration++;
                                                                        }
                                                                    }
                                                                }
                                                                break;
                                                            case 6u:
                                                                GLF_dead11m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 2)] = GLF_dead11one;
                                                                break;
                                                            case 7u:
                                                                GLF_dead11m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 3)] = GLF_dead11one;
                                                                break;
                                                            case 8u:
                                                                GLF_dead11m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 4)] = GLF_dead11one;
                                                                break;
                                                        }
                                                    }
                                                }
                                                donor_replacementGLF_dead11matrix_number = donor_replacementGLF_dead11matrix_number + 1u;
                                            }
                                            {
                                                int GLF_live12iteration = _GLF_FUZZED((+(-32424)));
                                                {
                                                    ;
                                                }
                                            }
                                        }
                                    }
                                }
                                {
                                    vec2 GLF_live14color = _GLF_FUZZED(vec2(-9.3, 3.8));
                                    int GLF_live14i = _GLF_FUZZED(-75367);
                                    vec3 GLF_live14vecCoor = _GLF_FUZZED(vec3(4249.7640, -223.187, 3.5));
                                    if (int(GLF_live14gl_FragCoord[1]) < 120) {
                                        GLF_live14color = fract(acosh(clamp(GLF_live14vecCoor.yx - trunc(float(GLF_live14data[3])), 1.0, 1000.0)));
                                        GLF_live14color.x += (isnan(GLF_live14gl_FragCoord.x) ? log2(GLF_live14gl_FragCoord.x) : log2(GLF_live14gl_FragCoord.y));
                                        ;
                                    } else if (int(GLF_live14gl_FragCoord[1]) < 150) {
                                        ;
                                    } else if (int(GLF_live14gl_FragCoord[1]) < 180) {
                                        GLF_live14color = fract(sin(GLF_live14vecCoor.yx - trunc(float(GLF_live14data[4]))));
                                        GLF_live14color[1] += asinh(GLF_live14gl_FragCoord.y * ldexp(GLF_live14color.y, -GLF_live14i));
                                        ;
                                    } else if (int(GLF_live14gl_FragCoord[1]) < 210) {
                                        GLF_live14color = fract(sin(GLF_live14vecCoor.yx - trunc(float(GLF_live14data[5]))));
                                        GLF_live14color.y -= tanh(GLF_live14color.x) / cosh(GLF_live14color.y);
                                        ;
                                    } else if (int(GLF_live14gl_FragCoord[1]) < 240) {
                                        GLF_live14color = fract(asinh(GLF_live14vecCoor.yx - trunc(float(GLF_live14data[6]))));
                                        GLF_live14color.y -= isnan(float(GLF_live14i)) ? tanh(GLF_live14gl_FragCoord.x) : atanh(GLF_live14gl_FragCoord.y);
                                        ;
                                    } else if (int(GLF_live14gl_FragCoord[1]) < 270) {
                                        GLF_live14color = fract(sin(GLF_live14vecCoor.yx - trunc(float(GLF_live14data[7]))));
                                        GLF_live14color.y *= mix(normalize(GLF_live14vecCoor), normalize(vec3(GLF_live14color, degrees(GLF_live14color.x))), GLF_live14injectionSwitch.x).y;
                                        ;
                                    } else {
                                        ;
                                    }
                                }
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                return;
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    return;
                                }
                            }
                            if (_GLF_DEAD(false)) {
                                bool donor_replacementGLF_dead6c6 = _GLF_FUZZED((false || true));
                                int donor_replacementGLF_dead6msb8 = _GLF_FUZZED(-40923);
                                vec2 donor_replacementGLF_dead6pos = _GLF_FUZZED(vec2(3764.1171, -24.76));
                                vec3 donor_replacementGLF_dead6setting = _GLF_FUZZED(cos(vec3(-9.9, -4005.9961, -521.175)));
                                {
                                    {
                                        vec2 GLF_live14color = _GLF_FUZZED(vec2(-1149.0684, 803.168));
                                        vec3 GLF_live14vecCoor = _GLF_FUZZED(vec3(19.42, -75.82, 3.8));
                                        if (int(GLF_live14gl_FragCoord[1]) < 270) {
                                            GLF_live14color = fract(sin(GLF_live14vecCoor.yx - trunc(float(GLF_live14data[7]))));
                                            GLF_live14color.y *= mix(normalize(GLF_live14vecCoor), normalize(vec3(GLF_live14color, degrees(GLF_live14color.x))), GLF_live14injectionSwitch.x).y;
                                            ;
                                        } else {
                                            ;
                                        }
                                    }
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = max(vec4(7378.1459, -7384.4132, -9.4, -12.40), dFdx(-78.11));
                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                                if (!donor_replacementGLF_dead6c6) {
                                    if (_GLF_DEAD(false)) {
                                        return;
                                    }
                                    ;
                                }
                            }
                        }
                        if (_GLF_DEAD(false)) {
                            uint donor_replacementGLF_dead11matrix_number = _GLF_FUZZED(109928u);
                            for (int GLF_dead11cols = 2; GLF_dead11cols <= 4; GLF_dead11cols++) {
                                for (int GLF_dead11rows = 2; GLF_dead11rows <= 4; GLF_dead11rows++) {
                                    for (int GLF_dead11c = 0; GLF_dead11c < GLF_dead11cols; GLF_dead11c++) {
                                        for (int GLF_dead11r = 0; GLF_dead11r < GLF_dead11rows; GLF_dead11r++) {
                                            switch (donor_replacementGLF_dead11matrix_number) {
                                                case 0u:
                                                    GLF_dead11m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 2)] = GLF_dead11one;
                                                    break;
                                                case 1u:
                                                    GLF_dead11m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 3)] = GLF_dead11one;
                                                    break;
                                                case 2u:
                                                    GLF_dead11m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 4)] = GLF_dead11one;
                                                    break;
                                                case 3u:
                                                    GLF_dead11m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 2)] = GLF_dead11one;
                                                    break;
                                                case 4u:
                                                    GLF_dead11m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 3)] = GLF_dead11one;
                                                    break;
                                                case 5u:
                                                    GLF_dead11m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 4)] = GLF_dead11one;
                                                    break;
                                                case 6u:
                                                    GLF_dead11m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 2)] = GLF_dead11one;
                                                    break;
                                                case 7u:
                                                    GLF_dead11m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 3)] = GLF_dead11one;
                                                    break;
                                                    {
                                                        int GLF_live14i = _GLF_FUZZED((50598 ^ (-11010)));
                                                        int GLF_live14j = _GLF_FUZZED((true ? (-77393) : (-66390)));
                                                        int GLF_live14k = _GLF_FUZZED((+(5856 ^ 53334)));
                                                        int GLF_live14looplimiter0 = 0;
                                                        int GLF_live14mid = _GLF_FUZZED(70192);
                                                        int GLF_live14to = _GLF_FUZZED(int(false));
                                                        while (GLF_live14i <= GLF_live14mid && GLF_live14j <= GLF_live14to) {
                                                            if (GLF_live14looplimiter0 >= 6) {
                                                                break;
                                                            }
                                                            GLF_live14looplimiter0++;
                                                            {
                                                                if (GLF_live14data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14i, 10)] < GLF_live14data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14j, 10)]) {
                                                                    GLF_live14temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14k++, 10)] = GLF_live14data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14i++, 10)];
                                                                } else {
                                                                    GLF_live14temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14k++, 10)] = GLF_live14data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live14j++, 10)];
                                                                }
                                                            }
                                                        }
                                                    }
                                                case 8u:
                                                    GLF_dead11m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11r, 4)] = GLF_dead11one;
                                                    break;
                                                    {
                                                        {
                                                            ;
                                                        }
                                                    }
                                            }
                                        }
                                    }
                                    donor_replacementGLF_dead11matrix_number = donor_replacementGLF_dead11matrix_number + 1u;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    if (_GLF_DEAD(false)) {
        return;
    }
    {
        {
            ;
        }
    }
    _GLF_color = _GLF_IDENTITY(vec4(vec3(grey), 1.0), (vec4(vec3(grey), 1.0)) + vec4(0.0, 0.0, 0.0, 0.0));
}
