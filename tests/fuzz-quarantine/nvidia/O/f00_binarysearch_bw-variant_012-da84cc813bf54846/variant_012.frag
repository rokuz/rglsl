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
int GLF_live13MATRIX_N = 4;

layout(set = 0, binding = 2) uniform buf2 {
    float GLF_live12one;
};

mat2 GLF_live12m22 = _GLF_FUZZED(mat2((mat4x2(0.0, 699.913, -8.6, -189.845, 2.0, 8.4, -934.615, 1415.5787) * 2957.6433)));
mat2x3 GLF_live12m23 = _GLF_FUZZED((mat2x3(-9.2, -3.6, -6.2, -215.510, 912.511, -1.2) * mat2(mat3x4(-145.411, -4.4, 41.94, -53.59, 686.192, 5.5, -920.451, 4.4, -3.1, 5.8, -134.278, -250.664))));
mat2x4 GLF_live12m24 = _GLF_FUZZED((89.88 * mat2x4(2782.6948, 8862.2670, -9.2, -98.23, 66.42, 993.422, -2201.9902, -4.3)));
mat3x2 GLF_live12m32 = _GLF_FUZZED((mat3x2(mat4x2(4.5, 889.162, -3.9, -36.22, -836.139, -8971.7609, 411.047, 725.546)) - (-150.099)));
mat3 GLF_live12m33 = _GLF_FUZZED(mat3(mat3x4(-6.9, 9.1, -691.252, 1298.1387, 3.9, -330.967, 1.2, 9.7, 868.373, 784.529, 0.6, 4.1)));
mat3x4 GLF_live12m34 = _GLF_FUZZED(mat3x4(0.9, -52.81, -3.2, 3.2, 42.96, 5.7, -3434.9091, 5.7, 864.167, 5.1, -5.4, 18.58));
mat4x2 GLF_live12m42 = _GLF_FUZZED(mat4x2(-6.1, -3.1, -2338.4623, -37.01, 7079.2030, -8.9, 97.33, 5.6));
mat4x3 GLF_live12m43 = _GLF_FUZZED(mat4x3(-3.5, -3.8, -69.54, -21.14, 5.7, 4764.3185, 6.2, -6.1, 599.723, -84.15, 2.1, -5271.6713));
mat4 GLF_live12m44 = _GLF_FUZZED(((21.56 + mat4(8.1, -8763.3252, 1750.5591, -6386.9443, 5497.6431, 9.8, -0.1, 140.232, 715.980, -6.3, -3.6, -3206.4315, 0.6, -6.7, -8.1, -15.55)) * mat4(7.7, -438.959, -90.57, 885.997, 0.3, 2.9, 6.5, -876.080, -7.7, 71.39, -392.615, -51.79, 1.1, -9687.0798, -0.8, -29.37)));
vec4 GLF_live11gl_FragCoord = _GLF_FUZZED(vec4(5734.4531, 25.94, 4248.0049, -750.336));

layout(set = 0, binding = 3) uniform buf3 {
    vec2 GLF_live11injectionSwitch;
};

const int GLF_live11N = 10;
int GLF_live11data[10] = int[10](_GLF_FUZZED(-66323), _GLF_FUZZED(36168), _GLF_FUZZED(13651), _GLF_FUZZED(int(false)), _GLF_FUZZED(int(uint(-9710))), _GLF_FUZZED((+(-85703))), _GLF_FUZZED(81736), _GLF_FUZZED(-60493), _GLF_FUZZED((((-96522) + 84635) & (+(-25)))), _GLF_FUZZED(-8983)), GLF_live11temp[10] = int[10](_GLF_FUZZED((63888 | (+(-64912)))), _GLF_FUZZED(-34865), _GLF_FUZZED(-5066), _GLF_FUZZED(21678), _GLF_FUZZED(89144), _GLF_FUZZED(-94782), _GLF_FUZZED((true ? (-57506) : (-3000))), _GLF_FUZZED(-64049), _GLF_FUZZED(-72712), _GLF_FUZZED((77642 ^ (+98461))));

void GLF_live11merge(int GLF_live11from, int GLF_live11mid, int GLF_live11to) {
    int GLF_live11k = GLF_live11from, GLF_live11i = GLF_live11from, GLF_live11j = GLF_live11mid + 1;
    {
        int GLF_live11looplimiter0 = 0;
        while (GLF_live11i <= GLF_live11mid && GLF_live11j <= GLF_live11to) {
            if (GLF_live11looplimiter0 >= 4) {
                break;
            }
            GLF_live11looplimiter0++;
            {
                if (GLF_live11data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11i, 10)] < GLF_live11data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11j, 10)]) {
                    GLF_live11temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11k++, 10)] = GLF_live11data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11i++, 10)];
                } else {
                    GLF_live11temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11k++, 10)] = GLF_live11data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11j++, 10)];
                }
            }
        }
    }
    {
        int GLF_live11looplimiter1 = 0;
        while (GLF_live11i < GLF_live11N && GLF_live11i <= GLF_live11mid) {
            if (GLF_live11looplimiter1 >= 4) {
                break;
            }
            GLF_live11looplimiter1++;
            {
                GLF_live11temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11k++, 10)] = GLF_live11data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11i++, 10)];
            }
        }
    }
    {
        int GLF_live11looplimiter2 = 0;
        for (int GLF_live11i = GLF_live11from; GLF_live11i <= GLF_live11to; GLF_live11i++) {
            if (GLF_live11looplimiter2 >= 4) {
                break;
            }
            GLF_live11looplimiter2++;
            {
                GLF_live11data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11i, 10)] = GLF_live11temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11i, 10)];
            }
        }
    }
}

vec4 GLF_dead10_GLF_color = _GLF_FUZZED((-vec4(-9.3)));

float GLF_dead10cross2d(vec2 GLF_dead10a, vec2 GLF_dead10b) {
    return ((GLF_dead10a.x) * (GLF_dead10b.y) - (GLF_dead10b.x) * (GLF_dead10a.y));
}

int GLF_dead10pointInTriangle(vec2 GLF_dead10p, vec2 GLF_dead10a, vec2 GLF_dead10b, vec2 GLF_dead10c) {
    float GLF_dead10pab = GLF_dead10cross2d(vec2(GLF_dead10p.x - GLF_dead10a.x, GLF_dead10p.y - GLF_dead10a.y), vec2(GLF_dead10b.x - GLF_dead10a.x, GLF_dead10b.y - GLF_dead10a.y));
    float GLF_dead10pbc = GLF_dead10cross2d(vec2(GLF_dead10p.x - GLF_dead10b.x, GLF_dead10p.y - GLF_dead10b.y), vec2(GLF_dead10c.x - GLF_dead10b.x, GLF_dead10c.y - GLF_dead10b.y));
    if (!((GLF_dead10pab < 0.0 && GLF_dead10pbc < 0.0) || (GLF_dead10pab >= 0.0 && GLF_dead10pbc >= 0.0))) {
        {
            int GLF_live11looplimiter4 = 0;
            if (GLF_live11looplimiter4 >= 4) {
                ;
            }
        }
        return 0;
    }
    {
        int GLF_live12cols = _GLF_FUZZED(int(72041u));
        uint GLF_live12matrix_number = _GLF_FUZZED(68667u);
        {
            int GLF_live12looplimiter2 = 0;
            for (int GLF_live12rows = 2; GLF_live12rows <= 4; GLF_live12rows++) {
                if (GLF_live12looplimiter2 >= 6) {
                    break;
                }
                GLF_live12looplimiter2++;
                {
                    {
                        int GLF_live12looplimiter1 = 0;
                        for (int GLF_live12c = 0; GLF_live12c < GLF_live12cols; GLF_live12c++) {
                            if (GLF_live12looplimiter1 >= 6) {
                                break;
                            }
                            GLF_live12looplimiter1++;
                            {
                                {
                                    int GLF_live12looplimiter0 = 0;
                                    for (int GLF_live12r = 0; GLF_live12r < GLF_live12rows; GLF_live12r++) {
                                        if (GLF_live12looplimiter0 >= 6) {
                                            break;
                                        }
                                        GLF_live12looplimiter0++;
                                        {
                                            switch (GLF_live12matrix_number) {
                                                case 0u:
                                                    GLF_live12m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live12r, 2)] = GLF_live12one;
                                                    break;
                                                case 1u:
                                                    GLF_live12m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live12r, 3)] = GLF_live12one;
                                                    break;
                                                case 2u:
                                                    GLF_live12m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live12r, 4)] = GLF_live12one;
                                                    break;
                                                case 3u:
                                                    GLF_live12m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live12r, 2)] = GLF_live12one;
                                                    break;
                                                case 4u:
                                                    GLF_live12m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live12r, 3)] = GLF_live12one;
                                                    break;
                                                case 5u:
                                                    GLF_live12m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live12r, 4)] = GLF_live12one;
                                                    break;
                                                case 6u:
                                                    GLF_live12m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live12r, 2)] = GLF_live12one;
                                                    break;
                                                case 7u:
                                                    GLF_live12m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live12r, 3)] = GLF_live12one;
                                                    break;
                                                case 8u:
                                                    GLF_live12m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live12r, 4)] = GLF_live12one;
                                                    break;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    GLF_live12matrix_number = GLF_live12matrix_number + 1u;
                }
            }
        }
    }
    float GLF_dead10pca = GLF_dead10cross2d(vec2(GLF_dead10p.x - GLF_dead10c.x, GLF_dead10p.y - GLF_dead10c.y), vec2(GLF_dead10a.x - GLF_dead10c.x, GLF_dead10a.y - GLF_dead10c.y));
    if (!((GLF_dead10pab < 0.0 && GLF_dead10pca < 0.0) || (GLF_dead10pab >= 0.0 && GLF_dead10pca >= 0.0))) {
        {
            {
                ;
            }
        }
        return 0;
    }
    return 1;
}

struct _GLF_struct_1 {
    int GLF_live5i;
    mat3 _f0;
};

struct _GLF_struct_5 {
    uvec3 _f0;
    mat3x2 _f1;
    mat4x2 _f2;
    mat3x2 _f3;
    mat2x4 _f4;
    vec4 _f5;
    int _f6;
};

struct _GLF_struct_4 {
    vec2 _f0;
    mat2x3 _f1;
    mat2x4 _f2;
    mat2x4 _f3;
};

struct _GLF_struct_3 {
    _GLF_struct_4 _f0;
    mat4x3 _f1;
    _GLF_struct_5 _f2;
    int GLF_live6msb8;
};

struct _GLF_struct_2 {
    vec4 _f0;
    mat4x2 _f1;
    _GLF_struct_3 _f2;
    bool _f3;
};

layout(set = 0, binding = 4) uniform buf4 {
    float GLF_live6time;
};

layout(set = 0, binding = 5) uniform buf5 {
    vec2 GLF_live6resolution;
};

float GLF_live6h_r = _GLF_FUZZED(35.39);
float GLF_live6s_g = _GLF_FUZZED(-1.9);
float GLF_live6b_b = _GLF_FUZZED(6.9);

void GLF_live6doConvert() {
    int GLF_live6msb8 = 256;
    vec3 GLF_live6temp = _GLF_FUZZED(vec3(-2653.8647, 940.058, -748.860));
    GLF_live6temp = GLF_live6b_b * (float(bitCount(GLF_live6msb8)) - GLF_live6s_g) + (GLF_live6b_b - GLF_live6b_b * (float(bitCount(GLF_live6msb8)) - GLF_live6s_g)) * clamp(abs(abs(6.0 * (GLF_live6h_r - vec3(bitfieldReverse(0), bitCount(GLF_live6msb8), 2) / 3.0)) - 3.0) - float(bitCount(GLF_live6msb8)), float(bitfieldExtract(int(GLF_live6resolution.x), 0, 0)), float(bitCount(int(GLF_live6resolution.x))));
    GLF_live6h_r = GLF_live6temp.x;
    GLF_live6s_g = GLF_live6temp.y;
    GLF_live6b_b = GLF_live6temp.z;
}

vec3 GLF_live6computeColor(float GLF_live6c, vec2 GLF_live6position) {
    if (_GLF_DEAD(false)) {
        int donor_replacementGLF_dead9c_im = _GLF_FUZZED(bitfieldInsert(62075, (bitfieldReverse(27587)), -48358, ((-51099) / (-21891))));
        int donor_replacementGLF_dead9c_re = _GLF_FUZZED(3756);
        int donor_replacementGLF_dead9iteration = _GLF_FUZZED(6598);
        int donor_replacementGLF_dead9x = _GLF_FUZZED(208);
        int donor_replacementGLF_dead9y = _GLF_FUZZED((mat4(-582.149, 8.1, 38.63, 22.93, -8.1, 3.5, 7771.9339, 124.446, -6264.3105, 0.4, -8542.9783, 108.135, -26.16, 0.4, 9940.6697, -4.3), 89388));
        {
            if (donor_replacementGLF_dead9x * donor_replacementGLF_dead9x + donor_replacementGLF_dead9y * donor_replacementGLF_dead9y > 262144) {
                ;
            }
            int GLF_dead9x_new = ((donor_replacementGLF_dead9x * donor_replacementGLF_dead9x - donor_replacementGLF_dead9y * donor_replacementGLF_dead9y) / 256 + donor_replacementGLF_dead9c_re);
            donor_replacementGLF_dead9y = (2 * donor_replacementGLF_dead9x * donor_replacementGLF_dead9y / 256 + donor_replacementGLF_dead9c_im);
            donor_replacementGLF_dead9x = GLF_dead9x_new;
            donor_replacementGLF_dead9iteration++;
        }
    }
    int GLF_live6msb8 = 256;
    GLF_live6h_r = fract(GLF_live6c);
    GLF_live6s_g = float(bitCount(GLF_live6msb8));
    {
        int GLF_live13a = _GLF_FUZZED(50954);
        float GLF_live13alpha3 = _GLF_FUZZED(((-8.5) - 2360.1134));
        int GLF_live13j = _GLF_FUZZED(65034);
        mat4 GLF_live13matrix_a = _GLF_FUZZED(mat4(mat4x2(1.8, -35.95, 2194.5505, -7.0, -9721.3631, 6.4, -1.8, -3362.8576)));
        vec4 GLF_live13matrix_u = _GLF_FUZZED(vec4(-8.1, 6.3, -3.3, -3.7));
        {
            GLF_live13alpha3 += GLF_live13matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_live13a, 4)] * GLF_live13matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_live13a, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live13j, 4)];
        }
    }
    GLF_live6b_b = (0.5 + (sin(GLF_live6time) * 0.5 + 0.5));
    GLF_live6doConvert();
    GLF_live6s_g *= float(bitCount(GLF_live6msb8)) / GLF_live6position.y;
    GLF_live6h_r *= float(bitCount(GLF_live6msb8)) / GLF_live6position.x;
    if (abs(GLF_live6position.y - GLF_live6position.x) < 0.5) {
        GLF_live6b_b = clamp(float(bitfieldExtract(int(GLF_live6resolution.x), 0, 0)), float(bitCount(GLF_live6msb8)), GLF_live6b_b * float(bitCount(GLF_live6msb8)) * 3.0);
    }
    {
        int GLF_live14looplimiter3 = 0;
        if (GLF_live14looplimiter3 >= 7) {
            ;
        }
    }
    return vec3(GLF_live6h_r, GLF_live6s_g, GLF_live6b_b);
}

vec3 GLF_live6defaultColor() {
    return vec3(float(bitfieldExtract(int(GLF_live6resolution.y), 0, 0)));
}

vec3 GLF_live6drawShape(vec2 GLF_live6pos, vec2 GLF_live6square, vec3 GLF_live6setting) {
    {
        int GLF_live11i = _GLF_FUZZED(-76650);
        int GLF_live11j = _GLF_FUZZED(37789);
        int GLF_live11k = _GLF_FUZZED(-7267);
        int GLF_live11looplimiter0 = 0;
        {
            if (GLF_live11looplimiter0 >= 4) {
                ;
            }
            GLF_live11looplimiter0++;
            {
                if (GLF_live11data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11i, 10)] < GLF_live11data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11j, 10)]) {
                    GLF_live11temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11k++, 10)] = GLF_live11data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11i++, 10)];
                } else {
                    GLF_live11temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11k++, 10)] = GLF_live11data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11j++, 10)];
                }
            }
        }
    }
    int GLF_live6msb8 = 256;
    bool GLF_live6c1 = GLF_live6pos.x - GLF_live6setting.x < GLF_live6square.x;
    if (!GLF_live6c1) {
        return GLF_live6defaultColor();
    }
    bool GLF_live6c2 = GLF_live6pos.x + GLF_live6setting.x > GLF_live6square.x;
    if (!GLF_live6c2) {
        {
            int GLF_live12looplimiter3 = 0;
            if (GLF_live12looplimiter3 >= 6) {
                ;
            }
        }
        return GLF_live6defaultColor();
        if (_GLF_DEAD(false)) {
            {
                ;
            }
        }
    }
    {
        int GLF_live12cols = _GLF_FUZZED((((-28059) & (-42858)) ^ ivec4(87326, -43236, -15129, -52389).a));
        uint GLF_live12matrix_number = _GLF_FUZZED(15075u);
        int GLF_live12rows = _GLF_FUZZED(27739);
        {
            {
                int GLF_live12looplimiter1 = 0;
                for (int GLF_live12c = 0; GLF_live12c < GLF_live12cols; GLF_live12c++) {
                    if (GLF_live12looplimiter1 >= 6) {
                        break;
                    }
                    GLF_live12looplimiter1++;
                    {
                        {
                            int GLF_live12looplimiter0 = 0;
                            for (int GLF_live12r = 0; GLF_live12r < GLF_live12rows; GLF_live12r++) {
                                if (GLF_live12looplimiter0 >= 6) {
                                    break;
                                }
                                GLF_live12looplimiter0++;
                                {
                                    switch (GLF_live12matrix_number) {
                                        case 0u:
                                            GLF_live12m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live12r, 2)] = GLF_live12one;
                                            break;
                                        case 1u:
                                            GLF_live12m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live12r, 3)] = GLF_live12one;
                                            break;
                                        case 2u:
                                            GLF_live12m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live12r, 4)] = GLF_live12one;
                                            break;
                                        case 3u:
                                            GLF_live12m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live12r, 2)] = GLF_live12one;
                                            break;
                                        case 4u:
                                            GLF_live12m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live12r, 3)] = GLF_live12one;
                                            break;
                                        case 5u:
                                            GLF_live12m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live12r, 4)] = GLF_live12one;
                                            break;
                                        case 6u:
                                            GLF_live12m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live12r, 2)] = GLF_live12one;
                                            break;
                                        case 7u:
                                            GLF_live12m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live12r, 3)] = GLF_live12one;
                                            break;
                                        case 8u:
                                            GLF_live12m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live12r, 4)] = GLF_live12one;
                                            break;
                                    }
                                }
                            }
                        }
                    }
                }
            }
            GLF_live12matrix_number = GLF_live12matrix_number + 1u;
        }
    }
    bool GLF_live6c3 = GLF_live6pos.y - GLF_live6setting.x < GLF_live6square.y;
    if (!GLF_live6c3) {
        return GLF_live6defaultColor();
    }
    bool GLF_live6c4 = GLF_live6pos.y + GLF_live6setting.x > GLF_live6square.y;
    if (!GLF_live6c4) {
        return GLF_live6defaultColor();
    }
    bool GLF_live6c5 = GLF_live6pos.x - (GLF_live6setting.x - GLF_live6setting.y) < GLF_live6square.x;
    if (!GLF_live6c5) {
        return GLF_live6computeColor(GLF_live6setting.z / (5.0 * float(findMSB(GLF_live6msb8))), GLF_live6pos);
    }
    {
        float GLF_live13alpha1 = _GLF_FUZZED((bvec3(true, true, true).z ? 1.0 : (-992.301)));
        float GLF_live13alpha2 = _GLF_FUZZED(((-6.9) * (-72.91)));
        float GLF_live13alpha3 = _GLF_FUZZED(vec3(-368.513, 9728.5445, 874.857).p);
        float GLF_live13beta = _GLF_FUZZED(-6.6);
        float GLF_live13magnitudeX = _GLF_FUZZED(28.05);
        mat4 GLF_live13matrix_a = _GLF_FUZZED(((-51.80) - mat4(687.498, -33.17, 442.975, -47.85, 67.07, 1.9, 8472.0476, -0.2, -8.4, 5171.9280, -29.88, 0.9, 56.58, -5.0, -48.45, -2903.1188)));
        vec4 GLF_live13matrix_b = _GLF_FUZZED(vec4(1.6, 4.2, 9.2, -78.49));
        vec4 GLF_live13matrix_u = _GLF_FUZZED((-vec4(699.802, -2543.9009, 1.4, -7.9)));
        {
            int GLF_live13looplimiter7 = 0;
            for (int GLF_live13k = 0; GLF_live13k < GLF_live13MATRIX_N - 1; GLF_live13k++) {
                if (GLF_live13looplimiter7 >= 7) {
                    break;
                }
                GLF_live13looplimiter7++;
                {
                    {
                        int GLF_live13looplimiter0 = 0;
                        for (int GLF_live13x = GLF_live13MATRIX_N - 1; GLF_live13x >= GLF_live13k; GLF_live13x--) {
                            if (GLF_live13looplimiter0 >= 7) {
                                break;
                            }
                            GLF_live13looplimiter0++;
                            {
                                GLF_live13magnitudeX += pow(GLF_live13matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_live13x, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live13k, 4)], 2.0);
                                GLF_live13matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_live13x, 4)] = GLF_live13matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_live13x, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live13k, 4)];
                            }
                        }
                    }
                    GLF_live13magnitudeX = sqrt(GLF_live13magnitudeX);
                    GLF_live13matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_live13k, 4)] -= (sign(GLF_live13matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_live13k, 4)]) * GLF_live13magnitudeX);
                    {
                        int GLF_live13looplimiter1 = 0;
                        for (int GLF_live13u = GLF_live13MATRIX_N - 1; GLF_live13u >= GLF_live13k; GLF_live13u--) {
                            if (GLF_live13looplimiter1 >= 7) {
                                break;
                            }
                            GLF_live13looplimiter1++;
                            {
                                GLF_live13alpha1 += pow(GLF_live13matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_live13u, 4)], 2.0);
                            }
                        }
                    }
                    GLF_live13alpha2 = 2.0 / GLF_live13alpha1;
                    {
                        int GLF_live13looplimiter4 = 0;
                        for (int GLF_live13j = GLF_live13k; GLF_live13j < GLF_live13MATRIX_N; GLF_live13j++) {
                            if (GLF_live13looplimiter4 >= 7) {
                                break;
                            }
                            GLF_live13looplimiter4++;
                            {
                                {
                                    int GLF_live13looplimiter2 = 0;
                                    for (int GLF_live13a = GLF_live13MATRIX_N - 1; GLF_live13a >= GLF_live13k; GLF_live13a--) {
                                        if (GLF_live13looplimiter2 >= 7) {
                                            break;
                                        }
                                        GLF_live13looplimiter2++;
                                        {
                                            GLF_live13alpha3 += GLF_live13matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_live13a, 4)] * GLF_live13matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_live13a, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live13j, 4)];
                                        }
                                    }
                                }
                                GLF_live13beta = GLF_live13alpha2 * GLF_live13alpha3;
                                {
                                    int GLF_live13looplimiter3 = 0;
                                    for (int GLF_live13a = GLF_live13MATRIX_N - 1; GLF_live13a >= GLF_live13k; GLF_live13a--) {
                                        if (GLF_live13looplimiter3 >= 7) {
                                            break;
                                        }
                                        GLF_live13looplimiter3++;
                                        {
                                            GLF_live13matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_live13a, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live13j, 4)] = GLF_live13matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_live13a, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live13j, 4)] - (GLF_live13beta * GLF_live13matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_live13a, 4)]);
                                        }
                                    }
                                }
                                GLF_live13alpha3 = 0.0;
                                GLF_live13beta = 0.0;
                            }
                        }
                    }
                    {
                        int GLF_live13looplimiter5 = 0;
                        for (int GLF_live13b = GLF_live13MATRIX_N - 1; GLF_live13b >= GLF_live13k; GLF_live13b--) {
                            if (GLF_live13looplimiter5 >= 7) {
                                break;
                            }
                            GLF_live13looplimiter5++;
                            {
                                GLF_live13alpha3 += GLF_live13matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_live13b, 4)] * GLF_live13matrix_b[_GLF_MAKE_IN_BOUNDS_INT(GLF_live13b, 4)];
                            }
                        }
                    }
                    GLF_live13beta = GLF_live13alpha2 * GLF_live13alpha3;
                    {
                        int GLF_live13looplimiter6 = 0;
                        for (int GLF_live13b = GLF_live13MATRIX_N - 1; GLF_live13b >= GLF_live13k; GLF_live13b--) {
                            if (GLF_live13looplimiter6 >= 7) {
                                break;
                            }
                            GLF_live13looplimiter6++;
                            {
                                GLF_live13matrix_b[_GLF_MAKE_IN_BOUNDS_INT(GLF_live13b, 4)] = GLF_live13matrix_b[_GLF_MAKE_IN_BOUNDS_INT(GLF_live13b, 4)] - (GLF_live13beta * GLF_live13matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_live13b, 4)]);
                            }
                        }
                    }
                    GLF_live13magnitudeX = 0.0;
                    GLF_live13alpha1 = 0.0;
                    GLF_live13alpha2 = 0.0;
                    GLF_live13alpha3 = 0.0;
                    GLF_live13beta = 0.0;
                }
            }
        }
    }
    bool GLF_live6c6 = GLF_live6pos.x + (GLF_live6setting.x - GLF_live6setting.y) > GLF_live6square.x;
    if (!GLF_live6c6) {
        return GLF_live6computeColor(GLF_live6setting.z / (5.0 * float(findMSB(GLF_live6msb8))), GLF_live6pos);
    }
    bool GLF_live6c7 = GLF_live6pos.y - (GLF_live6setting.x - GLF_live6setting.y) < GLF_live6square.y;
    if (!GLF_live6c7) {
        return GLF_live6computeColor(GLF_live6setting.z / (5.0 * float(findMSB(GLF_live6msb8))), GLF_live6pos);
    }
    bool GLF_live6c8 = GLF_live6pos.y + (GLF_live6setting.x - GLF_live6setting.y) > GLF_live6square.y;
    if (!GLF_live6c8) {
        return GLF_live6computeColor(GLF_live6setting.z / (5.0 * float(findMSB(GLF_live6msb8))), GLF_live6pos);
    }
    {
        {
            ;
        }
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
        int donor_replacementGLF_dead9x = _GLF_FUZZED(78444);
        int donor_replacementGLF_dead9y = _GLF_FUZZED(89019);
        if (donor_replacementGLF_dead9x * donor_replacementGLF_dead9x + donor_replacementGLF_dead9y * donor_replacementGLF_dead9y > 262144) {
            ;
        }
    }
    return GLF_live6defaultColor();
}

const int GLF_live5N = 10;
int GLF_live5data[10] = int[10](_GLF_FUZZED(27664), _GLF_FUZZED(((-65864) - int(55527u))), _GLF_FUZZED(73455), _GLF_FUZZED(int(37710u)), _GLF_FUZZED((~61968)), _GLF_FUZZED((-ivec3(81185, 5059, 87962).r)), _GLF_FUZZED(-30859), _GLF_FUZZED(ivec2(35007, -88009).t), _GLF_FUZZED(-47134), _GLF_FUZZED(38544)), GLF_live5temp[10] = int[10](_GLF_FUZZED((50214 * (-36170))), _GLF_FUZZED(((-64005) * 5947)), _GLF_FUZZED((54685 - 75780)), _GLF_FUZZED(-80785), _GLF_FUZZED((int((115358u - 95072u)) - 55591)), _GLF_FUZZED((((-42571) + (-55218)))), _GLF_FUZZED((-(-29816))), _GLF_FUZZED(ivec3(25377, -85533, -35154).x), _GLF_FUZZED(-28948), _GLF_FUZZED(-74958));

void GLF_live5merge(int GLF_live5from, int GLF_live5mid, int GLF_live5to) {
    int GLF_live5k = GLF_live5from, GLF_live5i = GLF_live5from, GLF_live5j = GLF_live5mid + 1;
    {
        int GLF_live5looplimiter0 = 0;
        while (GLF_live5i <= GLF_live5mid && GLF_live5j <= GLF_live5to) {
            if (GLF_live5looplimiter0 >= 6) {
                break;
                if (_GLF_DEAD(false)) {
                    int donor_replacementGLF_dead8index = _GLF_FUZZED(GLF_live5j);
                    int donor_replacementGLF_dead8j = _GLF_FUZZED(GLF_live5i);
                    {
                        {
                            {
                                ;
                            }
                        }
                        donor_replacementGLF_dead8index = donor_replacementGLF_dead8j;
                        {
                            {
                                ;
                            }
                        }
                    }
                }
            }
            GLF_live5looplimiter0++;
            {
                if (GLF_live5data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live5i, 10)] < GLF_live5data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live5j, 10)]) {
                    GLF_live5temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live5k++, 10)] = GLF_live5data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live5i++, 10)];
                } else {
                    if (_GLF_DEAD(false)) {
                        float donor_replacementGLF_dead10pab = _GLF_FUZZED(GLF_live6h_r);
                        if (!((donor_replacementGLF_dead10pab < 0.0 && GLF_live6b_b < 0.0) || (donor_replacementGLF_dead10pab >= 0.0 && GLF_live6b_b >= 0.0))) {
                            ;
                        }
                    }
                    GLF_live5temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live5k++, 10)] = GLF_live5data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live5j++, 10)];
                }
            }
        }
    }
    {
        int GLF_live5looplimiter1 = 0;
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            vec2 donor_replacementGLF_dead10pos = _GLF_FUZZED((GLF_live6h_r + vec2(6.3, -8.0)));
            if (GLF_dead10pointInTriangle(donor_replacementGLF_dead10pos, vec2(0.7, 0.3), vec2(0.5, 0.9), vec2(0.1, 0.4)) == 1) {
                GLF_dead10_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
            } else {
                GLF_dead10_GLF_color = vec4(0.0, 0.0, 0.0, 1.0);
            }
        }
        while (GLF_live5i < GLF_live5N && GLF_live5i <= GLF_live5mid) {
            if (GLF_live5looplimiter1 >= 6) {
                {
                    int GLF_live11high = _GLF_FUZZED(-53676);
                    int GLF_live11looplimiter3 = 0;
                    int GLF_live11low = _GLF_FUZZED(((-3293) - 17942));
                    int GLF_live11m = _GLF_FUZZED(9004);
                    for (int GLF_live11i = GLF_live11low; GLF_live11i < GLF_live11high; GLF_live11i += 2 * GLF_live11m) {
                        if (GLF_live11looplimiter3 >= 4) {
                            break;
                        }
                        GLF_live11looplimiter3++;
                        {
                            int GLF_live11from = GLF_live11i;
                            int GLF_live11mid = GLF_live11i + GLF_live11m - 1;
                            int GLF_live11to = min(GLF_live11i + 2 * GLF_live11m - 1, GLF_live11high);
                            GLF_live11merge(GLF_live11from, GLF_live11mid, GLF_live11to);
                        }
                    }
                }
                break;
            }
            {
                int GLF_live13i = _GLF_FUZZED(64961);
                int GLF_live13looplimiter8 = 0;
                mat4 GLF_live13matrix_a = _GLF_FUZZED((mat4(-5.7, -8.7, 9637.5876, -646.838, 5.9, -3905.4056, 3.3, -4.6, 6.0, 9.7, 163.459, -1624.4143, 895.134, -1671.6217, 6920.7702, -9.8) * 4.1));
                vec4 GLF_live13matrix_b = _GLF_FUZZED(vec4(-56.91, 1.1, -18.37, -92.94));
                for (int GLF_live13j = (GLF_live13MATRIX_N - 1); GLF_live13j >= (GLF_live13i + 1); GLF_live13j--) {
                    if (GLF_live13looplimiter8 >= 7) {
                        break;
                    }
                    GLF_live13looplimiter8++;
                    {
                        GLF_live13matrix_b[_GLF_MAKE_IN_BOUNDS_INT(GLF_live13i, 4)] -= (GLF_live13matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_live13i, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live13j, 4)] * GLF_live13matrix_b[_GLF_MAKE_IN_BOUNDS_INT(GLF_live13j, 4)]);
                    }
                }
            }
            GLF_live5looplimiter1++;
            {
                GLF_live5temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live5k++, 10)] = GLF_live5data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live5i++, 10)];
            }
        }
    }
    {
        int GLF_live5looplimiter2 = 0;
        for (int GLF_live5i = GLF_live5from; GLF_live5i <= GLF_live5to; GLF_live5i++) {
            if (GLF_live5looplimiter2 >= 6) {
                break;
            }
            GLF_live5looplimiter2++;
            {
                vec2 GLF_live11color = _GLF_FUZZED(((-3.0) + vec2(2.5, 3.1)));
                int GLF_live11i = _GLF_FUZZED(-27969);
                vec3 GLF_live11vecCoor = _GLF_FUZZED(vec2(-6.8, 2.9).ggr);
                if (int(GLF_live11gl_FragCoord[1]) < 30) {
                    GLF_live11color = fract(sin(GLF_live11vecCoor.yx - trunc(float(GLF_live11data[0]))));
                    GLF_live11color[0] = dFdy(GLF_live11gl_FragCoord.y);
                    ;
                } else if (int(GLF_live11gl_FragCoord[1]) < 60) {
                    GLF_live11color = fract(sin(GLF_live11vecCoor.yx - trunc(float(GLF_live11data[1]))));
                    GLF_live11color[1] *= atan(faceforward(GLF_live11injectionSwitch, GLF_live11color.xx, GLF_live11vecCoor.yx).y);
                    ;
                } else if (int(GLF_live11gl_FragCoord[1]) < 90) {
                    GLF_live11color = fract(sin(GLF_live11vecCoor.yx - trunc(float(GLF_live11data[2]))));
                    GLF_live11color.x += atanh(GLF_live11color.x) * cosh(GLF_live11injectionSwitch.y) * smoothstep(GLF_live11color, GLF_live11injectionSwitch, GLF_live11gl_FragCoord.yy).x;
                    ;
                } else if (int(GLF_live11gl_FragCoord[1]) < 120) {
                    GLF_live11color = fract(acosh(clamp(GLF_live11vecCoor.yx - trunc(float(GLF_live11data[3])), 1.0, 1000.0)));
                    GLF_live11color.x += (isnan(GLF_live11gl_FragCoord.x) ? log2(GLF_live11gl_FragCoord.x) : log2(GLF_live11gl_FragCoord.y));
                    ;
                } else if (int(GLF_live11gl_FragCoord[1]) < 150) {
                    ;
                } else if (int(GLF_live11gl_FragCoord[1]) < 180) {
                    GLF_live11color = fract(sin(GLF_live11vecCoor.yx - trunc(float(GLF_live11data[4]))));
                    GLF_live11color[1] += asinh(GLF_live11gl_FragCoord.y * ldexp(GLF_live11color.y, -GLF_live11i));
                    ;
                } else if (int(GLF_live11gl_FragCoord[1]) < 210) {
                    GLF_live11color = fract(sin(GLF_live11vecCoor.yx - trunc(float(GLF_live11data[5]))));
                    GLF_live11color.y -= tanh(GLF_live11color.x) / cosh(GLF_live11color.y);
                    ;
                } else if (int(GLF_live11gl_FragCoord[1]) < 240) {
                    GLF_live11color = fract(asinh(GLF_live11vecCoor.yx - trunc(float(GLF_live11data[6]))));
                    GLF_live11color.y -= isnan(float(GLF_live11i)) ? tanh(GLF_live11gl_FragCoord.x) : atanh(GLF_live11gl_FragCoord.y);
                    ;
                } else if (int(GLF_live11gl_FragCoord[1]) < 270) {
                    GLF_live11color = fract(sin(GLF_live11vecCoor.yx - trunc(float(GLF_live11data[7]))));
                    GLF_live11color.y *= mix(normalize(GLF_live11vecCoor), normalize(vec3(GLF_live11color, degrees(GLF_live11color.x))), GLF_live11injectionSwitch.x).y;
                    ;
                } else {
                    ;
                }
            }
            {
                GLF_live5data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live5i, 10)] = GLF_live5temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live5i, 10)];
            }
        }
    }
    if (_GLF_DEAD(false)) {
        {
            ;
        }
    }
}

struct GLF_live3QuicksortObject {
    int numbers[10];
};

GLF_live3QuicksortObject GLF_live3obj;

void GLF_live3swap(int GLF_live3i, int GLF_live3j) {
    int GLF_live3temp = GLF_live3obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_live3i, 10)];
    GLF_live3obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_live3i, 10)] = GLF_live3obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_live3j, 10)];
    GLF_live3obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_live3j, 10)] = GLF_live3temp;
}

layout(set = 0, binding = 6) uniform buf6 {
    vec2 GLF_dead0injectionSwitch;
};

const int GLF_dead2dp[256] = int[256](115, 133, 150, 164, 176, 184, 190, 192, 191, 187, 181, 172, 163, 153, 143, 134, 126, 120, 116, 114, 114, 117, 121, 127, 134, 141, 148, 154, 159, 162, 163, 161, 157, 151, 143, 134, 124, 113, 103, 94, 87, 82, 79, 80, 84, 91, 101, 114, 130, 146, 164, 182, 199, 215, 229, 240, 249, 254, 256, 254, 250, 243, 233, 223, 212, 200, 190, 180, 172, 166, 163, 161, 162, 164, 169, 174, 179, 185, 190, 193, 195, 195, 192, 188, 180, 171, 161, 149, 137, 125, 114, 105, 97, 93, 91, 93, 98, 106, 117, 130, 145, 161, 177, 193, 208, 221, 231, 239, 243, 244, 242, 236, 228, 218, 207, 194, 181, 169, 158, 148, 141, 135, 132, 131, 132, 135, 138, 143, 147, 151, 154, 155, 155, 152, 146, 139, 129, 118, 106, 93, 80, 68, 58, 49, 43, 40, 41, 44, 51, 61, 73, 87, 103, 119, 134, 149, 162, 173, 181, 186, 188, 186, 181, 174, 164, 153, 141, 128, 116, 104, 94, 86, 81, 77, 76, 77, 80, 84, 89, 94, 98, 102, 104, 104, 102, 98, 92, 83, 73, 62, 50, 38, 26, 16, 8, 2, 0, 0, 4, 11, 21, 33, 48, 64, 81, 98, 114, 129, 141, 151, 158, 161, 161, 158, 152, 144, 134, 123, 112, 100, 90, 81, 73, 68, 65, 65, 67, 70, 75, 81, 87, 92, 97, 101, 103, 102, 100, 95, 88, 79, 69, 58, 47, 36, 26, 18, 13, 11, 11, 15, 22, 32, 45, 60, 77, 94);

struct _GLF_struct_0 {
    vec2 st;
    bool _f0;
};

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
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
        _GLF_color = mat4(1.1, 2.9, -1863.6717, -29.00, -1.1, 312.928, 7072.4742, 1.2, 5784.8416, -702.729, 6.5, -88.50, -4117.5570, -6283.9250, -1664.7867, -2.9)[3];
        if (_GLF_DEAD(false)) {
            {
                ;
            }
        }
    }
    int a = 4;
    do {
        uv.y -= step(injectionSwitch.y, uv.x);
        uv.x -= fract(tanh(uv.x)) / ldexp(injectionSwitch.y, findMSB(a));
        a--;
        {
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(1.8, -9.8, -9.6, -18.03);
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            int GLF_live3h = _GLF_FUZZED((false ? (77165 - (-44445)) : 85723));
            int GLF_live3i = _GLF_FUZZED((true ? (-(-82965)) : 59846));
            int GLF_live3l = _GLF_FUZZED(((-50522) | (ivec4(74671, 59471, 97338, -42363).z | 86064)));
            int GLF_live3looplimiter0 = 0;
            int GLF_live3pivot = _GLF_FUZZED((~(-71800)));
            {
                vec4 _GLF_outVarBackup_GLF_color;
                {
                    int GLF_live13looplimiter1 = 0;
                    if (GLF_live13looplimiter1 >= 7) {
                        ;
                    }
                }
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(-32.55, 5.9, 0.2, 509.583);
                if (_GLF_DEAD(false)) {
                    _GLF_color = min(mix(_GLF_color, vec4(5266.3508, -46.63, 1.3, -5061.0950), _GLF_color), vec4(7.8, -30.19, -679.633, 602.943));
                }
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                    if (_GLF_DEAD(false)) {
                        _GLF_color = vec4(-80.03, -55.57, 1.5, 35.11);
                    }
                }
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                {
                    ;
                }
            }
            for (int GLF_live3j = GLF_live3l; GLF_live3j <= GLF_live3h - 1; GLF_live3j++) {
                if (GLF_live3looplimiter0 >= 7) {
                    break;
                }
                GLF_live3looplimiter0++;
                {
                    if (GLF_live3obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_live3j, 10)] <= GLF_live3pivot) {
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            int donor_replacementGLF_dead9c_im = _GLF_FUZZED((~GLF_live3h));
                            int donor_replacementGLF_dead9c_re = _GLF_FUZZED((+GLF_live3j));
                            int donor_replacementGLF_dead9iteration = _GLF_FUZZED(GLF_live5N);
                            int donor_replacementGLF_dead9x = _GLF_FUZZED(GLF_live5N);
                            int donor_replacementGLF_dead9y = _GLF_FUZZED(-2692);
                            for (int GLF_dead9k = 0; GLF_dead9k < 1000; GLF_dead9k++) {
                                if (donor_replacementGLF_dead9x * donor_replacementGLF_dead9x + donor_replacementGLF_dead9y * donor_replacementGLF_dead9y > 262144) {
                                    break;
                                }
                                int GLF_dead9x_new = ((donor_replacementGLF_dead9x * donor_replacementGLF_dead9x - donor_replacementGLF_dead9y * donor_replacementGLF_dead9y) / 256 + donor_replacementGLF_dead9c_re);
                                donor_replacementGLF_dead9y = (2 * donor_replacementGLF_dead9x * donor_replacementGLF_dead9y / 256 + donor_replacementGLF_dead9c_im);
                                donor_replacementGLF_dead9x = GLF_dead9x_new;
                                donor_replacementGLF_dead9iteration++;
                            }
                        }
                        GLF_live3i++;
                        GLF_live3swap(GLF_live3i, GLF_live3j);
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = vec4(71.49, -9.2, -2.2, -6.8);
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                            {
                                int GLF_live11looplimiter1 = 0;
                                if (GLF_live11looplimiter1 >= 4) {
                                    ;
                                }
                            }
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        {
                            {
                                ;
                            }
                        }
                        _GLF_color = _GLF_color;
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < _GLF_IDENTITY(dot(vec3(0.0, 0.0, 0.0), vec3(1.0, _GLF_IDENTITY(dot(vec4(0.0, 1.0, 0.0, 0.0), vec4(0.0, 1.0, 0.0, 0.0)), dot(vec4(0.0, 1.0, 0.0, 0.0), vec4(0.0, 1.0, 0.0, 0.0))), 1.0)), dot(vec3(0.0, 0.0, 0.0), vec3(1.0, _GLF_IDENTITY(dot(vec4(0.0, 1.0, 0.0, 0.0), vec4(0.0, 1.0, 0.0, 0.0)), dot(vec4(0.0, 1.0, 0.0, 0.0), vec4(0.0, 1.0, 0.0, 0.0))), 1.0))))))) {
                            int donor_replacementGLF_dead9x = _GLF_FUZZED(GLF_live3pivot);
                            int donor_replacementGLF_dead9y = _GLF_FUZZED(GLF_live3j);
                            if (donor_replacementGLF_dead9x * donor_replacementGLF_dead9x + donor_replacementGLF_dead9y * donor_replacementGLF_dead9y > 262144) {
                                break;
                            }
                        }
                    }
                }
            }
        }
        {
            int GLF_live11looplimiter3 = 0;
            if (GLF_live11looplimiter3 >= 4) {
                ;
            }
        }
    } while (a > int(injectionSwitch.x));
    int b = 3;
    do {
        if (_GLF_DEAD(false)) {
            if (_GLF_DEAD(false)) {
                int donor_replacementGLF_dead9iteration = _GLF_FUZZED(findMSB(-94599));
                if (donor_replacementGLF_dead9iteration < 1000) {
                    ;
                } else {
                    ;
                }
            }
            _GLF_color = (_GLF_color * abs(GLF_live6h_r));
        }
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = vec4(33.91, -3255.4653, 49.58, 237.449);
            {
                {
                    ;
                }
            }
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                {
                    int GLF_live14looplimiter0 = 0;
                    if (GLF_live14looplimiter0 >= 7) {
                        ;
                    }
                }
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
        {
            int GLF_live4looplimiter2 = 0;
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = (sign(20.49) / vec4(-1881.7822, -6575.0665, 9336.5237, 302.369));
                {
                    int GLF_live12cols = _GLF_FUZZED(-89462);
                    int GLF_live12looplimiter2 = 0;
                    uint GLF_live12matrix_number = _GLF_FUZZED((145461u - uvec3(37656u, 93703u, 148251u)).x);
                    for (int GLF_live12rows = 2; GLF_live12rows <= 4; GLF_live12rows++) {
                        if (GLF_live12looplimiter2 >= 6) {
                            break;
                        }
                        GLF_live12looplimiter2++;
                        {
                            {
                                int GLF_live12looplimiter1 = 0;
                                for (int GLF_live12c = 0; GLF_live12c < GLF_live12cols; GLF_live12c++) {
                                    if (GLF_live12looplimiter1 >= 6) {
                                        break;
                                    }
                                    GLF_live12looplimiter1++;
                                    {
                                        {
                                            int GLF_live12looplimiter0 = 0;
                                            for (int GLF_live12r = 0; GLF_live12r < GLF_live12rows; GLF_live12r++) {
                                                if (GLF_live12looplimiter0 >= 6) {
                                                    break;
                                                }
                                                GLF_live12looplimiter0++;
                                                {
                                                    switch (GLF_live12matrix_number) {
                                                        case 0u:
                                                            GLF_live12m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live12r, 2)] = GLF_live12one;
                                                            break;
                                                        case 1u:
                                                            GLF_live12m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live12r, 3)] = GLF_live12one;
                                                            break;
                                                        case 2u:
                                                            GLF_live12m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live12r, 4)] = GLF_live12one;
                                                            break;
                                                        case 3u:
                                                            GLF_live12m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live12r, 2)] = GLF_live12one;
                                                            break;
                                                        case 4u:
                                                            GLF_live12m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live12r, 3)] = GLF_live12one;
                                                            break;
                                                        case 5u:
                                                            GLF_live12m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live12r, 4)] = GLF_live12one;
                                                            break;
                                                        case 6u:
                                                            GLF_live12m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live12r, 2)] = GLF_live12one;
                                                            break;
                                                        case 7u:
                                                            GLF_live12m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live12r, 3)] = GLF_live12one;
                                                            break;
                                                        case 8u:
                                                            GLF_live12m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live12r, 4)] = GLF_live12one;
                                                            break;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            GLF_live12matrix_number = GLF_live12matrix_number + 1u;
                        }
                    }
                }
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                    {
                        int GLF_live13looplimiter6 = 0;
                        if (GLF_live13looplimiter6 >= 7) {
                            ;
                        }
                    }
                }
            }
            {
                int GLF_live12cols = _GLF_FUZZED((false ? (~(-72067)) : (-57226)));
                int GLF_live12looplimiter2 = 0;
                uint GLF_live12matrix_number = _GLF_FUZZED(6630u);
                int GLF_live12rows = _GLF_FUZZED(44265);
                {
                    if (GLF_live12looplimiter2 >= 6) {
                        ;
                    }
                    GLF_live12looplimiter2++;
                    {
                        {
                            int GLF_live12looplimiter1 = 0;
                            for (int GLF_live12c = 0; GLF_live12c < GLF_live12cols; GLF_live12c++) {
                                if (GLF_live12looplimiter1 >= 6) {
                                    break;
                                }
                                GLF_live12looplimiter1++;
                                {
                                    {
                                        int GLF_live12looplimiter0 = 0;
                                        for (int GLF_live12r = 0; GLF_live12r < GLF_live12rows; GLF_live12r++) {
                                            if (GLF_live12looplimiter0 >= 6) {
                                                break;
                                            }
                                            GLF_live12looplimiter0++;
                                            {
                                                switch (GLF_live12matrix_number) {
                                                    case 0u:
                                                        GLF_live12m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live12r, 2)] = GLF_live12one;
                                                        break;
                                                    case 1u:
                                                        GLF_live12m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live12r, 3)] = GLF_live12one;
                                                        break;
                                                    case 2u:
                                                        GLF_live12m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live12r, 4)] = GLF_live12one;
                                                        break;
                                                    case 3u:
                                                        GLF_live12m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live12r, 2)] = GLF_live12one;
                                                        break;
                                                    case 4u:
                                                        GLF_live12m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live12r, 3)] = GLF_live12one;
                                                        break;
                                                    case 5u:
                                                        GLF_live12m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live12r, 4)] = GLF_live12one;
                                                        break;
                                                    case 6u:
                                                        GLF_live12m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live12r, 2)] = GLF_live12one;
                                                        break;
                                                    case 7u:
                                                        GLF_live12m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live12r, 3)] = GLF_live12one;
                                                        break;
                                                    case 8u:
                                                        GLF_live12m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live12r, 4)] = GLF_live12one;
                                                        break;
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        GLF_live12matrix_number = GLF_live12matrix_number + 1u;
                    }
                }
            }
            if (GLF_live4looplimiter2 >= 7) {
                ;
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < determinant(mat4(0.0, 0.0, 0.0, 0.0, 0.0, 0.0, length(vec4(0.0, 0.0, 0.0, 0.0)), 0.0, 1.0, 0.0, 0.0, 0.0, 1.0, sqrt(1.0), 1.0, 0.0)))))) {
                    _GLF_color = ((bvec4(true, false, false, false), mat4x2(-24.94, -67.63, 2.4, -9266.5198, 3.4, -11.30, -5.2, -66.62)), _GLF_color);
                    if (_GLF_DEAD(false)) {
                        _GLF_color = mix(uintBitsToFloat(uvec4(100999u, 135341u, 1408u, 97315u)), vec4(235.051, 5255.3523, -1074.5555, 5.2), vec4(-3.3, 30.55, 1.5, -48.76));
                    }
                }
            }
        }
        uv.y -= step(injectionSwitch.y, uv.x) + float(a);
        uv.x *= (isnan(uv.y) ? cosh(gl_FragCoord.y) : tanh(gl_FragCoord.x));
        b--;
    } while (b > int(injectionSwitch.x));
    int c = 2;
    do {
        uv.y -= step(injectionSwitch.y, uv.x) + float(a) + float(b);
        uv.x += ldexp(injectionSwitch.y, isinf(uv.y + uv.x) ? findMSB(b) : findMSB(a));
        if (_GLF_DEAD(false)) {
            _GLF_color = floor(_GLF_color);
        }
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = atanh(vec4(450.594, 82.74, 72.81, -7496.6654));
            {
                int GLF_live12cols = _GLF_FUZZED((-36024));
                int GLF_live12looplimiter2 = 0;
                uint GLF_live12matrix_number = _GLF_FUZZED(uint(-30858));
                int GLF_live12rows = _GLF_FUZZED(76294);
                {
                    if (GLF_live12looplimiter2 >= 6) {
                        ;
                    }
                    GLF_live12looplimiter2++;
                    {
                        {
                            int GLF_live12looplimiter1 = 0;
                            for (int GLF_live12c = 0; GLF_live12c < GLF_live12cols; GLF_live12c++) {
                                if (GLF_live12looplimiter1 >= 6) {
                                    break;
                                }
                                GLF_live12looplimiter1++;
                                {
                                    {
                                        int GLF_live12looplimiter0 = 0;
                                        for (int GLF_live12r = 0; GLF_live12r < GLF_live12rows; GLF_live12r++) {
                                            if (GLF_live12looplimiter0 >= 6) {
                                                break;
                                            }
                                            GLF_live12looplimiter0++;
                                            {
                                                switch (GLF_live12matrix_number) {
                                                    case 0u:
                                                        GLF_live12m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live12r, 2)] = GLF_live12one;
                                                        break;
                                                    case 1u:
                                                        GLF_live12m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live12r, 3)] = GLF_live12one;
                                                        break;
                                                    case 2u:
                                                        GLF_live12m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live12r, 4)] = GLF_live12one;
                                                        break;
                                                    case 3u:
                                                        GLF_live12m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live12r, 2)] = GLF_live12one;
                                                        break;
                                                    case 4u:
                                                        GLF_live12m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live12r, 3)] = GLF_live12one;
                                                        break;
                                                    case 5u:
                                                        GLF_live12m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live12r, 4)] = GLF_live12one;
                                                        break;
                                                    case 6u:
                                                        GLF_live12m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live12r, 2)] = GLF_live12one;
                                                        break;
                                                    case 7u:
                                                        GLF_live12m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live12r, 3)] = GLF_live12one;
                                                        break;
                                                    case 8u:
                                                        GLF_live12m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live12r, 4)] = GLF_live12one;
                                                        break;
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        GLF_live12matrix_number = GLF_live12matrix_number + 1u;
                    }
                }
            }
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                int donor_replacementGLF_dead9iteration = _GLF_FUZZED(a);
                if (donor_replacementGLF_dead9iteration < 1000) {
                    ;
                } else {
                    ;
                }
            }
        }
        {
            int GLF_live13k = _GLF_FUZZED(((-70527) + (-int(true))));
            int GLF_live13looplimiter0 = 0;
            float GLF_live13magnitudeX = _GLF_FUZZED((1523.4134 * (-1.3)));
            mat4 GLF_live13matrix_a = _GLF_FUZZED(mat4(-66.02, -32.37, 7.3, 191.375, -3263.6609, -2.8, 9377.0139, 5.2, 234.793, 6.8, 777.378, -0.4, -17.72, 0.2, -8453.6331, -874.462));
            vec4 GLF_live13matrix_u = _GLF_FUZZED(vec4(5.9, -5802.1825, vec2(4.0, -7283.6786)));
            for (int GLF_live13x = GLF_live13MATRIX_N - 1; GLF_live13x >= GLF_live13k; GLF_live13x--) {
                if (GLF_live13looplimiter0 >= 7) {
                    break;
                }
                GLF_live13looplimiter0++;
                {
                    GLF_live13magnitudeX += pow(GLF_live13matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_live13x, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live13k, 4)], 2.0);
                    GLF_live13matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_live13x, 4)] = GLF_live13matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_live13x, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live13k, 4)];
                }
            }
        }
        c--;
        if (_GLF_DEAD(false)) {
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                int donor_replacementGLF_dead7iteration = _GLF_FUZZED((b));
                float donor_replacementGLF_dead7xCoord = _GLF_FUZZED(4.2);
                float donor_replacementGLF_dead7yCoord = _GLF_FUZZED(cosh(GLF_live6time));
                if (donor_replacementGLF_dead7iteration < 1000) {
                    ;
                } else {
                    ;
                }
            }
            {
                {
                    int GLF_live12c = _GLF_FUZZED((-17790));
                    int GLF_live12looplimiter1 = 0;
                    uint GLF_live12matrix_number = _GLF_FUZZED(91720u);
                    int GLF_live12rows = _GLF_FUZZED(99431);
                    {
                        if (GLF_live12looplimiter1 >= 6) {
                            ;
                        }
                        GLF_live12looplimiter1++;
                        {
                            {
                                int GLF_live12looplimiter0 = 0;
                                for (int GLF_live12r = 0; GLF_live12r < GLF_live12rows; GLF_live12r++) {
                                    if (GLF_live12looplimiter0 >= 6) {
                                        break;
                                    }
                                    GLF_live12looplimiter0++;
                                    {
                                        switch (GLF_live12matrix_number) {
                                            case 0u:
                                                GLF_live12m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live12r, 2)] = GLF_live12one;
                                                break;
                                            case 1u:
                                                GLF_live12m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live12r, 3)] = GLF_live12one;
                                                break;
                                            case 2u:
                                                GLF_live12m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live12r, 4)] = GLF_live12one;
                                                break;
                                            case 3u:
                                                GLF_live12m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live12r, 2)] = GLF_live12one;
                                                break;
                                            case 4u:
                                                GLF_live12m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live12r, 3)] = GLF_live12one;
                                                break;
                                            case 5u:
                                                GLF_live12m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live12r, 4)] = GLF_live12one;
                                                break;
                                            case 6u:
                                                GLF_live12m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live12r, 2)] = GLF_live12one;
                                                break;
                                            case 7u:
                                                GLF_live12m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live12r, 3)] = GLF_live12one;
                                                break;
                                            case 8u:
                                                GLF_live12m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live12r, 4)] = GLF_live12one;
                                                break;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                vec4 _GLF_outVarBackup_GLF_color;
                if (_GLF_DEAD(false)) {
                    float donor_replacementGLF_dead7x = _GLF_FUZZED(degrees(GLF_live6s_g));
                    float donor_replacementGLF_dead7y = _GLF_FUZZED(GLF_live6s_g);
                    if (donor_replacementGLF_dead7x * donor_replacementGLF_dead7x + donor_replacementGLF_dead7y * donor_replacementGLF_dead7y > 4.0) {
                        break;
                    }
                }
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(1.4, -8.5, -26.29, -5.0);
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            _GLF_color = unpackUnorm4x8(189430u);
            {
                vec4 _GLF_outVarBackup_GLF_color;
                if (_GLF_DEAD(false)) {
                    {
                        ;
                    }
                }
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = dFdxFine((vec4(492.266, -1207.0631, 2.1, -248.421) / vec4(2.3, -9.4, 8.7, 97.56)));
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        _GLF_color = _GLF_color;
                    }
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
        }
    } while (c > int(injectionSwitch.x));
    int d = 1;
    do {
        uv.y -= step(injectionSwitch.y, uv.x) + float(a) + float(b) + float(c);
        d--;
    } while (d > int(injectionSwitch.x));
    return fract(uv);
    {
        int GLF_live13looplimiter9 = 0;
        mat4 GLF_live13matrix_a = _GLF_FUZZED(mat4(mat3x4(-2.3, 6.5, 6033.3209, -7.7, 2.8, 457.149, -5.2, -4.8, 978.694, -4.1, -238.768, 31.78)));
        vec4 GLF_live13matrix_b = _GLF_FUZZED(vec4(-4904.4703, -1137.9951, -535.243, 3.3));
        for (int GLF_live13i = (GLF_live13MATRIX_N - 1); GLF_live13i >= 0; GLF_live13i--) {
            if (GLF_live13looplimiter9 >= 7) {
                break;
            }
            GLF_live13looplimiter9++;
            {
                {
                    int GLF_live13looplimiter8 = 0;
                    for (int GLF_live13j = (GLF_live13MATRIX_N - 1); GLF_live13j >= (GLF_live13i + 1); GLF_live13j--) {
                        if (GLF_live13looplimiter8 >= 7) {
                            break;
                        }
                        GLF_live13looplimiter8++;
                        {
                            GLF_live13matrix_b[_GLF_MAKE_IN_BOUNDS_INT(GLF_live13i, 4)] -= (GLF_live13matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_live13i, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live13j, 4)] * GLF_live13matrix_b[_GLF_MAKE_IN_BOUNDS_INT(GLF_live13j, 4)]);
                        }
                    }
                }
                GLF_live13matrix_b[_GLF_MAKE_IN_BOUNDS_INT(GLF_live13i, 4)] /= GLF_live13matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_live13i, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live13i, 4)];
            }
        }
    }
}

float patternize(vec2 uv) {
    vec2 size = vec2(0.45);
    {
        {
            ;
        }
    }
    _GLF_struct_0 _GLF_struct_replacement_0 = _GLF_struct_0(smoothstep(size, size, uv), true);
    switch (int(mod(gl_FragCoord.y, 5.0))) {
        case 0:
            return _GLF_IDENTITY(mix(pow(st.x, injectionSwitch.y), st.x, size.y), (false ? _GLF_FUZZED(-6.7) : mix(pow(_GLF_struct_replacement_0.st.x, injectionSwitch.y), _GLF_struct_replacement_0.st.x, size.y)));
            {
                int GLF_live11high = _GLF_FUZZED((~6650));
                int GLF_live11low = _GLF_FUZZED((ivec4(-75741, -75691, -83476, -15925) & ivec4(57683, 50894, 96969, 37793)).g);
                int GLF_live11m = _GLF_FUZZED(((mat3x4(-3573.3602, -5.8, -32.59, -5509.1023, 649.497, 33.36, 423.329, -2.5, 7.2, 31.29, 262.494, -98.30) == mat3x4(1884.6269)) ? ivec4(36989, -79070, 85610, -50761).g : (true ? 46947 : 15136)));
                {
                    {
                        int GLF_live11looplimiter3 = 0;
                        for (int GLF_live11i = GLF_live11low; GLF_live11i < GLF_live11high; GLF_live11i += 2 * GLF_live11m) {
                            if (GLF_live11looplimiter3 >= 4) {
                                break;
                            }
                            GLF_live11looplimiter3++;
                            {
                                int GLF_live11from = GLF_live11i;
                                int GLF_live11mid = GLF_live11i + GLF_live11m - 1;
                                int GLF_live11to = min(GLF_live11i + 2 * GLF_live11m - 1, GLF_live11high);
                                GLF_live11merge(GLF_live11from, GLF_live11mid, GLF_live11to);
                            }
                        }
                    }
                }
            }
            {
                int GLF_live6msb8 = _GLF_FUZZED(((76096 ^ 87499) ^ (49791 & (-67756))));
                vec2 GLF_live6pos = _GLF_FUZZED(((uvec2(15892u, 148262u) == uvec2(138535u, 159513u)) ? ((-338.404) + vec2(-334.871, 13.50)) : vec2(-4.4, -0.5)));
                vec3 GLF_live6setting = _GLF_FUZZED(vec3(9.9, -2.2, -3341.9529));
                {
                    ;
                    {
                        {
                            ;
                        }
                    }
                }
            }
            if (_GLF_DEAD(false)) {
                int donor_replacementGLF_dead7iteration = _GLF_FUZZED(GLF_live5N);
                {
                    ;
                }
            }
            if (_GLF_DEAD(false)) {
                _GLF_color = _GLF_color;
            }
            break;
        case 1:
            {
                if (_GLF_DEAD(false)) {
                    int donor_replacementGLF_dead9x = _GLF_FUZZED(((ivec2(32052, 54524) == (ivec2(65458, -3313))) ? bitfieldReverse(47820) : GLF_live5N));
                    int donor_replacementGLF_dead9y = _GLF_FUZZED(-30833);
                    if (donor_replacementGLF_dead9x * donor_replacementGLF_dead9x + donor_replacementGLF_dead9y * donor_replacementGLF_dead9y > 262144) {
                        break;
                    }
                }
                int GLF_live5from = _GLF_FUZZED(-2931);
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    _GLF_color = _GLF_color;
                }
                int GLF_live5looplimiter2 = 0;
                int GLF_live5to = _GLF_FUZZED(-4902);
                for (int GLF_live5i = GLF_live5from; GLF_live5i <= GLF_live5to; GLF_live5i++) {
                    if (GLF_live5looplimiter2 >= 6) {
                        break;
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            {
                                {
                                    ;
                                }
                            }
                            _GLF_color = vec4(641.435, 0.3, -34.19, 3.8);
                        }
                    }
                    {
                        int GLF_live12looplimiter4 = 0;
                        if (GLF_live12looplimiter4 >= 6) {
                            ;
                        }
                    }
                    GLF_live5looplimiter2++;
                    {
                        GLF_live5data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live5i, 10)] = GLF_live5temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live5i, 10)];
                    }
                }
            }
            return mix(pow(uv.y, injectionSwitch.y), _GLF_struct_replacement_0.st.y, size.x);
            break;
        case 2:
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                int donor_replacementGLF_dead0j = _GLF_FUZZED(-1250);
                vec3 donor_replacementGLF_dead0m = _GLF_FUZZED(abs(vec3(271.368, 62.40, 8.2)));
                {
                    int GLF_live5high = _GLF_FUZZED(-76758);
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = (transpose(mat4x3(-68.82, -6.4, -167.046, 60.23, 78.18, 1.4, -3.8, 4.3, -5.1, -7.2, -515.916, -8780.1584))[2] * mat4(4251.6987, -0.9, -91.16, 1018.8230, -6.5, -7793.7606, -9311.2010, -3.4, 4871.1006, 78.33, -50.05, -34.62, -6404.5014, -8729.2075, -83.86, -9.3));
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)), !(!(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0))))))) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        _GLF_color = sign(vec4(4.9, -9.4, -245.619, 60.95));
                    }
                    _GLF_struct_1 _GLF_struct_replacement_1 = _GLF_struct_1(_GLF_FUZZED(-93972), mat3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0));
                    int GLF_live5looplimiter3 = 0;
                    int GLF_live5m = _GLF_FUZZED(-90716);
                    {
                        if (GLF_live5looplimiter3 >= 6) {
                            ;
                        }
                        GLF_live5looplimiter3++;
                        {
                            int GLF_live5from = _GLF_struct_replacement_1.GLF_live5i;
                            int GLF_live5mid = _GLF_struct_replacement_1.GLF_live5i + GLF_live5m - 1;
                            int GLF_live5to = min(_GLF_struct_replacement_1.GLF_live5i + 2 * GLF_live5m - 1, GLF_live5high);
                            GLF_live5merge(GLF_live5from, GLF_live5mid, GLF_live5to);
                            if (_GLF_DEAD(false)) {
                                _GLF_color = tanh(vec4(876.321, 78.85, -13.91, 50.23));
                            }
                            if (_GLF_DEAD(false)) {
                                _GLF_color = faceforward(vec4(-0.1, -932.335, -1.6, -751.262), vec4(449.969, vec3(78.22, 3.0, -507.970)), (mat2x4(-936.932, 5.6, 81.27, -11.56, -11.18, -2.0, -3765.4869, 581.517) * vec2(1.6, -0.2)));
                                if (_GLF_DEAD(false)) {
                                    int donor_replacementGLF_dead7iteration = _GLF_FUZZED(bitCount(((96614u << 112581u) >> max(6586u, 178527u))));
                                    {
                                        ;
                                    }
                                }
                            }
                            if (_GLF_DEAD(false)) {
                                if (_GLF_DEAD(false)) {
                                    float donor_replacementGLF_dead10pab = _GLF_FUZZED(-6.2);
                                    float donor_replacementGLF_dead10pca = _GLF_FUZZED(GLF_live6time);
                                    if (!((donor_replacementGLF_dead10pab < 0.0 && donor_replacementGLF_dead10pca < 0.0) || (donor_replacementGLF_dead10pab >= 0.0 && donor_replacementGLF_dead10pca >= 0.0))) {
                                        ;
                                        {
                                            {
                                                ;
                                            }
                                        }
                                    }
                                }
                                _GLF_color = (_GLF_color / GLF_live6h_r);
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                    int donor_replacementGLF_dead8index = _GLF_FUZZED(52573);
                                    int donor_replacementGLF_dead8j = _GLF_FUZZED(bitCount(uvec2(83060u, 125941u)[1]));
                                    {
                                        donor_replacementGLF_dead8index = donor_replacementGLF_dead8j;
                                    }
                                }
                                {
                                    float GLF_live13alpha3 = _GLF_FUZZED((+6.2));
                                    int GLF_live13b = _GLF_FUZZED((+(-43476)));
                                    vec4 GLF_live13matrix_b = _GLF_FUZZED((vec2(6390.8238, 1.2) * mat4x2(-24.19, -6197.7048, -6.8, -5.0, -3.5, -6.2, -8.4, 800.465)));
                                    vec4 GLF_live13matrix_u = _GLF_FUZZED(vec4(vec2(648.408, 507.123), vec2(297.364, 541.209)));
                                    {
                                        GLF_live13alpha3 += GLF_live13matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_live13b, 4)] * GLF_live13matrix_b[_GLF_MAKE_IN_BOUNDS_INT(GLF_live13b, 4)];
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
                }
                vec2 donor_replacementGLF_dead0n = _GLF_FUZZED(radians(uv));
                {
                    for (int GLF_dead0i = -1; GLF_dead0i <= int(GLF_dead0injectionSwitch.y); GLF_dead0i++) {
                        vec2 GLF_dead0g = vec2(float(donor_replacementGLF_dead0j), float(GLF_dead0i));
                        {
                            int GLF_live3looplimiter2 = 0;
                            for (int GLF_live3i = 0; GLF_live3i < 10; GLF_live3i++) {
                                if (GLF_live3looplimiter2 >= 7) {
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = _GLF_color;
                                    }
                                    break;
                                }
                                {
                                    int GLF_live12cols = _GLF_FUZZED(-2135);
                                    uint GLF_live12matrix_number = _GLF_FUZZED(uint(ivec4(60266, -11199, 73570, 94622).b));
                                    int GLF_live12rows = _GLF_FUZZED(60743);
                                    {
                                        int GLF_live12looplimiter1 = 0;
                                        for (int GLF_live12c = 0; GLF_live12c < GLF_live12cols; GLF_live12c++) {
                                            if (GLF_live12looplimiter1 >= 6) {
                                                break;
                                            }
                                            GLF_live12looplimiter1++;
                                            {
                                                {
                                                    int GLF_live12looplimiter0 = 0;
                                                    for (int GLF_live12r = 0; GLF_live12r < GLF_live12rows; GLF_live12r++) {
                                                        if (GLF_live12looplimiter0 >= 6) {
                                                            break;
                                                        }
                                                        GLF_live12looplimiter0++;
                                                        {
                                                            switch (GLF_live12matrix_number) {
                                                                case 0u:
                                                                    GLF_live12m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live12r, 2)] = GLF_live12one;
                                                                    break;
                                                                case 1u:
                                                                    GLF_live12m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live12r, 3)] = GLF_live12one;
                                                                    break;
                                                                case 2u:
                                                                    GLF_live12m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live12r, 4)] = GLF_live12one;
                                                                    break;
                                                                case 3u:
                                                                    GLF_live12m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live12r, 2)] = GLF_live12one;
                                                                    break;
                                                                case 4u:
                                                                    GLF_live12m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live12r, 3)] = GLF_live12one;
                                                                    break;
                                                                case 5u:
                                                                    GLF_live12m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live12r, 4)] = GLF_live12one;
                                                                    break;
                                                                case 6u:
                                                                    GLF_live12m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live12r, 2)] = GLF_live12one;
                                                                    break;
                                                                case 7u:
                                                                    GLF_live12m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live12r, 3)] = GLF_live12one;
                                                                    break;
                                                                case 8u:
                                                                    GLF_live12m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live12r, 4)] = GLF_live12one;
                                                                    break;
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                                GLF_live3looplimiter2++;
                                {
                                    GLF_live3obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_live3i, 10)] = (10 - GLF_live3i);
                                    GLF_live3obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_live3i, 10)] = GLF_live3obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_live3i, 10)] * GLF_live3obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_live3i, 10)];
                                }
                            }
                        }
                        vec2 GLF_dead0o = mix(donor_replacementGLF_dead0n, GLF_dead0g, 0.2);
                        if (GLF_dead0injectionSwitch.x < (donor_replacementGLF_dead0m.x)) {
                            if (_GLF_DEAD(false)) {
                                _GLF_color = vec4(-9501.9634, 9.8, -87.23, -85.36);
                            }
                            int GLF_dead0k = 1;
                            while (GLF_dead0k >= 0) {
                                GLF_dead0o = GLF_dead0o + GLF_dead0o;
                                GLF_dead0k--;
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = vec4(-69.06, -8513.4128, 9001.3510, -0.3);
                                }
                            }
                            {
                                int GLF_live12looplimiter0 = 0;
                                if (GLF_live12looplimiter0 >= 6) {
                                    ;
                                }
                            }
                            donor_replacementGLF_dead0m = vec3(GLF_dead0injectionSwitch.x, cos(GLF_dead0o));
                        }
                    }
                }
            }
            discard;
            {
                {
                    ;
                }
            }
            break;
            {
                vec4 _GLF_outVarBackup_GLF_color;
                if (_GLF_DEAD(false)) {
                    _GLF_color = vec4(resolution, injectionSwitch);
                }
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(-4.5, -2.9, 153.319, 9125.8817);
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
        case 3:
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(3654.2966, 7.5, -80.98, -0.6);
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            return mix(pow(uv.y, injectionSwitch.y), uv.y, size.y);
            break;
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                _GLF_color = (mat4(-788.313, 7.9, -9.8, 5.8, 9.7, 17.22, 95.37, 9236.7907, -65.64, 9148.1346, -3064.4504, -648.228, 452.320, 1476.7138, 357.377, 15.20) * vec4(-31.77, 4.0, 5.1, -11.81));
            }
        case 4:
            return mix(pow(_GLF_struct_replacement_0.st.y, injectionSwitch.y), _GLF_struct_replacement_0.st.x, size.x);
            {
                vec2 GLF_live6center = _GLF_FUZZED(vec2(1460.7368, -7179.6977));
                if (_GLF_DEAD(false)) {
                    _GLF_color = _GLF_color;
                }
                {
                    int GLF_live11i = _GLF_FUZZED(-76595);
                    int GLF_live11j = _GLF_FUZZED((-42313));
                    int GLF_live11k = _GLF_FUZZED(80568);
                    int GLF_live11mid = _GLF_FUZZED(73576);
                    int GLF_live11to = _GLF_FUZZED(-69279);
                    {
                        int GLF_live11looplimiter0 = 0;
                        while (GLF_live11i <= GLF_live11mid && GLF_live11j <= GLF_live11to) {
                            if (GLF_live11looplimiter0 >= 4) {
                                break;
                            }
                            GLF_live11looplimiter0++;
                            {
                                if (GLF_live11data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11i, 10)] < GLF_live11data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11j, 10)]) {
                                    GLF_live11temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11k++, 10)] = GLF_live11data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11i++, 10)];
                                } else {
                                    GLF_live11temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11k++, 10)] = GLF_live11data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11j++, 10)];
                                }
                            }
                        }
                    }
                }
                int GLF_live6i = _GLF_FUZZED(2784);
                {
                    {
                        ;
                    }
                }
                int GLF_live6looplimiter0 = 0;
                _GLF_struct_2 _GLF_struct_replacement_2 = _GLF_struct_2(vec4(1.0, 1.0, 1.0, 1.0), mat4x2(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), _GLF_struct_3(_GLF_struct_4(vec2(1.0, 1.0), mat2x3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0), mat2x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), mat2x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0)), mat4x3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), _GLF_struct_5(uvec3(1u, 1u, 1u), mat3x2(1.0, 1.0, 1.0, 1.0, 1.0, 1.0), mat4x2(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), mat3x2(1.0, 1.0, 1.0, 1.0, 1.0, 1.0), mat2x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), vec4(1.0, 1.0, 1.0, 1.0), 1), _GLF_FUZZED(ivec3(-31100, 87589, 38703).b)), true);
                vec2 GLF_live6position = _GLF_FUZZED(vec2(755.049, -337.432));
                vec3 GLF_live6result = _GLF_FUZZED((vec2(-73.09, 7.9) * (mat3x2(651.762, 61.60, -861.491, -6.5, 8.5, 810.378) * (-43.65))));
                {
                    if (GLF_live6looplimiter0 >= 6) {
                        ;
                    }
                    GLF_live6looplimiter0++;
                    {
                        vec3 GLF_live6d = _GLF_FUZZED(vec3(9190.1029, 2.2, -1.4));
                        GLF_live6d = GLF_live6drawShape(GLF_live6position, GLF_live6center + vec2(sin(float(GLF_live6i) / (float(bitCount(_GLF_struct_replacement_2._f2.GLF_live6msb8)) * 10.0) + GLF_live6time) / 4.0 * float(bitCount(_GLF_struct_replacement_2._f2.GLF_live6msb8)), float(bitfieldExtract(int(GLF_live6resolution.x), 0, 0))), vec3(0.01 + sin(float(GLF_live6i) / 100.0 * float(bitCount(_GLF_struct_replacement_2._f2.GLF_live6msb8))), 0.01, float(GLF_live6i)));
                        if (length(GLF_live6d) <= float(bitfieldExtract(int(GLF_live6resolution.x), 0, 0))) {
                            ;
                            {
                                int GLF_live12c = _GLF_FUZZED(97686);
                                int GLF_live12looplimiter0 = 0;
                                uint GLF_live12matrix_number = _GLF_FUZZED(67320u);
                                int GLF_live12r = _GLF_FUZZED(int((133592u != 1754u)));
                                {
                                    if (GLF_live12looplimiter0 >= 6) {
                                        ;
                                    }
                                    GLF_live12looplimiter0++;
                                    {
                                        switch (GLF_live12matrix_number) {
                                            case 0u:
                                                GLF_live12m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live12r, 2)] = GLF_live12one;
                                                break;
                                            case 1u:
                                                GLF_live12m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live12r, 3)] = GLF_live12one;
                                                break;
                                            case 2u:
                                                GLF_live12m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live12r, 4)] = GLF_live12one;
                                                break;
                                            case 3u:
                                                GLF_live12m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live12r, 2)] = GLF_live12one;
                                                break;
                                            case 4u:
                                                GLF_live12m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live12r, 3)] = GLF_live12one;
                                                break;
                                            case 5u:
                                                GLF_live12m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live12r, 4)] = GLF_live12one;
                                                break;
                                            case 6u:
                                                GLF_live12m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live12r, 2)] = GLF_live12one;
                                                break;
                                            case 7u:
                                                GLF_live12m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live12r, 3)] = GLF_live12one;
                                                break;
                                            case 8u:
                                                GLF_live12m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live12r, 4)] = GLF_live12one;
                                                break;
                                        }
                                    }
                                }
                            }
                        }
                        GLF_live6result = vec3(GLF_live6d);
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        _GLF_color = acosh(vec4(-226.748, 3.3, 3949.8273, 3348.6003));
                    }
                }
            }
            break;
    }
}

int binarySearch(BinarySearchObject obj, int x) {
    int l = 0, r = 9;
    if (_GLF_DEAD(false)) {
        _GLF_color = vec4(-9.4, 961.910, 90.08, -4142.9258);
    }
    {
        vec2 GLF_live11color = _GLF_FUZZED((vec2(7800.6427, -57.01)));
        vec3 GLF_live11vecCoor = _GLF_FUZZED(vec3(-8.1, 8363.1466, 20.65));
        {
            GLF_live11color = fract(acosh(clamp(GLF_live11vecCoor.yx - trunc(float(GLF_live11data[3])), 1.0, 1000.0)));
            GLF_live11color.x += (isnan(GLF_live11gl_FragCoord.x) ? log2(GLF_live11gl_FragCoord.x) : log2(GLF_live11gl_FragCoord.y));
            ;
        }
    }
    while (l <= r) {
        int m = (l + r) / 2;
        if (obj.prime_numbers[m] == x) {
            return m;
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < tan(0.0))))) {
                    float donor_replacementGLF_dead7c_im = _GLF_FUZZED(GLF_live6h_r);
                    float donor_replacementGLF_dead7c_re = _GLF_FUZZED(max(GLF_live6h_r, GLF_live6time));
                    int donor_replacementGLF_dead7iteration = _GLF_FUZZED(x);
                    float donor_replacementGLF_dead7x = _GLF_FUZZED((+GLF_live6time));
                    float donor_replacementGLF_dead7y = _GLF_FUZZED((GLF_live6h_r));
                    for (int GLF_dead7k = 0; GLF_dead7k < 1000; GLF_dead7k++) {
                        if (donor_replacementGLF_dead7x * donor_replacementGLF_dead7x + donor_replacementGLF_dead7y * donor_replacementGLF_dead7y > 4.0) {
                            break;
                        }
                        float GLF_dead7x_new = donor_replacementGLF_dead7x * donor_replacementGLF_dead7x - donor_replacementGLF_dead7y * donor_replacementGLF_dead7y + donor_replacementGLF_dead7c_re;
                        donor_replacementGLF_dead7y = 2.0 * donor_replacementGLF_dead7x * donor_replacementGLF_dead7y + donor_replacementGLF_dead7c_im;
                        donor_replacementGLF_dead7x = GLF_dead7x_new;
                        donor_replacementGLF_dead7iteration++;
                    }
                }
                _GLF_color = tanh(vec4(1.8, 6618.6010, -651.206, -3791.2513));
                if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)), true && (_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))))) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                _GLF_color = mix(_GLF_color, step((vec4(75.23, -44.56, 7.2, -2.3) - _GLF_color), (GLF_live6s_g - vec4(-0.7, 58.80, -74.58, 894.002))), bvec4(false, false, true, true));
            }
            if (_GLF_DEAD(false)) {
                {
                    break;
                }
            }
        }
        if (obj.prime_numbers[m] < x) {
            l = m + 1;
        } else {
            r = m - 1;
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                _GLF_color = vec4(-7843.2810, -2.1, -7.1, 5.2);
            }
        }
    }
    {
        vec3 GLF_live3color = _GLF_FUZZED((vec3(0.4, 45.26, -44.59) - 0.2));
        if (_GLF_DEAD(false)) {
            _GLF_color = vec4(25.66, 69.10, -3.8, 548.253);
        }
        vec2 GLF_live3uv = _GLF_FUZZED(vec2(878.125, 591.491));
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
            _GLF_color = vec4(2841.8847, -8448.0561, -9.8, 86.69);
        }
        if (GLF_live3uv.y > (1.0 / 4.0)) {
            {
                {
                    ;
                }
            }
            GLF_live3color.x += float(GLF_live3obj.numbers[5]);
        }
    }
    return -1;
}

void main() {
    BinarySearchObject obj;
    for (int i = 0; i < 10; i++) {
        if (i == 0) {
            {
                {
                    ;
                }
            }
            obj.prime_numbers[i] = 2;
        } else if (i == 1) {
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                {
                    vec2 GLF_live11color = _GLF_FUZZED(vec4(-12.13, 0.5, -1.7, 2.9).ps);
                    int GLF_live11i = _GLF_FUZZED(-94776);
                    vec3 GLF_live11vecCoor = _GLF_FUZZED((-(vec3(7.0, -5407.3632, 5.7))));
                    if (int(GLF_live11gl_FragCoord[1]) < 60) {
                        GLF_live11color = fract(sin(GLF_live11vecCoor.yx - trunc(float(GLF_live11data[1]))));
                        GLF_live11color[1] *= atan(faceforward(GLF_live11injectionSwitch, GLF_live11color.xx, GLF_live11vecCoor.yx).y);
                        ;
                    } else if (int(GLF_live11gl_FragCoord[1]) < 90) {
                        GLF_live11color = fract(sin(GLF_live11vecCoor.yx - trunc(float(GLF_live11data[2]))));
                        GLF_live11color.x += atanh(GLF_live11color.x) * cosh(GLF_live11injectionSwitch.y) * smoothstep(GLF_live11color, GLF_live11injectionSwitch, GLF_live11gl_FragCoord.yy).x;
                        ;
                    } else if (int(GLF_live11gl_FragCoord[1]) < 120) {
                        GLF_live11color = fract(acosh(clamp(GLF_live11vecCoor.yx - trunc(float(GLF_live11data[3])), 1.0, 1000.0)));
                        GLF_live11color.x += (isnan(GLF_live11gl_FragCoord.x) ? log2(GLF_live11gl_FragCoord.x) : log2(GLF_live11gl_FragCoord.y));
                        ;
                    } else if (int(GLF_live11gl_FragCoord[1]) < 150) {
                        ;
                    } else if (int(GLF_live11gl_FragCoord[1]) < 180) {
                        GLF_live11color = fract(sin(GLF_live11vecCoor.yx - trunc(float(GLF_live11data[4]))));
                        GLF_live11color[1] += asinh(GLF_live11gl_FragCoord.y * ldexp(GLF_live11color.y, -GLF_live11i));
                        ;
                    } else if (int(GLF_live11gl_FragCoord[1]) < 210) {
                        GLF_live11color = fract(sin(GLF_live11vecCoor.yx - trunc(float(GLF_live11data[5]))));
                        GLF_live11color.y -= tanh(GLF_live11color.x) / cosh(GLF_live11color.y);
                        ;
                    } else if (int(GLF_live11gl_FragCoord[1]) < 240) {
                        GLF_live11color = fract(asinh(GLF_live11vecCoor.yx - trunc(float(GLF_live11data[6]))));
                        GLF_live11color.y -= isnan(float(GLF_live11i)) ? tanh(GLF_live11gl_FragCoord.x) : atanh(GLF_live11gl_FragCoord.y);
                        ;
                    } else if (int(GLF_live11gl_FragCoord[1]) < 270) {
                        GLF_live11color = fract(sin(GLF_live11vecCoor.yx - trunc(float(GLF_live11data[7]))));
                        GLF_live11color.y *= mix(normalize(GLF_live11vecCoor), normalize(vec3(GLF_live11color, degrees(GLF_live11color.x))), GLF_live11injectionSwitch.x).y;
                        ;
                    } else {
                        ;
                    }
                }
                _GLF_color = vec4(403.993, -615.022, 46.76, -3603.5720);
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                _GLF_color = _GLF_color;
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(-7.1, -0.8, 1656.5825, -3.5);
                    if (_GLF_DEAD(false)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
            }
            obj.prime_numbers[i] = 3;
        } else if (i == 2) {
            if (_GLF_DEAD(false)) {
                _GLF_color = _GLF_color;
            }
            obj.prime_numbers[i] = 5;
        } else if (i == 3) {
            obj.prime_numbers[i] = 7;
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(5.7, 407.377, 7126.5664, -6300.7219);
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= sin(0.0))))) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                    {
                        int GLF_live13looplimiter8 = 0;
                        if (GLF_live13looplimiter8 >= 7) {
                            ;
                        }
                    }
                }
            }
        } else if (i == 4) {
            obj.prime_numbers[i] = 11;
        } else {
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                {
                    break;
                }
                {
                    int GLF_live12cols = _GLF_FUZZED((ivec4(-74025, 90965, 38188, -59275) + ivec4(20997, 21068, -31576, 56997)).y);
                    uint GLF_live12matrix_number = _GLF_FUZZED(156195u);
                    {
                        int GLF_live12looplimiter2 = 0;
                        for (int GLF_live12rows = 2; GLF_live12rows <= 4; GLF_live12rows++) {
                            if (GLF_live12looplimiter2 >= 6) {
                                break;
                            }
                            GLF_live12looplimiter2++;
                            {
                                {
                                    int GLF_live12looplimiter1 = 0;
                                    for (int GLF_live12c = 0; GLF_live12c < GLF_live12cols; GLF_live12c++) {
                                        if (GLF_live12looplimiter1 >= 6) {
                                            break;
                                        }
                                        GLF_live12looplimiter1++;
                                        {
                                            {
                                                int GLF_live12looplimiter0 = 0;
                                                for (int GLF_live12r = 0; GLF_live12r < GLF_live12rows; GLF_live12r++) {
                                                    if (GLF_live12looplimiter0 >= 6) {
                                                        break;
                                                    }
                                                    GLF_live12looplimiter0++;
                                                    {
                                                        switch (GLF_live12matrix_number) {
                                                            case 0u:
                                                                GLF_live12m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live12r, 2)] = GLF_live12one;
                                                                break;
                                                            case 1u:
                                                                GLF_live12m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live12r, 3)] = GLF_live12one;
                                                                break;
                                                            case 2u:
                                                                GLF_live12m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live12r, 4)] = GLF_live12one;
                                                                break;
                                                            case 3u:
                                                                GLF_live12m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live12r, 2)] = GLF_live12one;
                                                                break;
                                                            case 4u:
                                                                GLF_live12m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live12r, 3)] = GLF_live12one;
                                                                break;
                                                            case 5u:
                                                                GLF_live12m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live12r, 4)] = GLF_live12one;
                                                                break;
                                                            case 6u:
                                                                GLF_live12m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live12r, 2)] = GLF_live12one;
                                                                break;
                                                            case 7u:
                                                                GLF_live12m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live12r, 3)] = GLF_live12one;
                                                                break;
                                                            case 8u:
                                                                GLF_live12m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live12r, 4)] = GLF_live12one;
                                                                break;
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                                GLF_live12matrix_number = GLF_live12matrix_number + 1u;
                            }
                        }
                    }
                }
            }
            if (i == 5) {
                {
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        {
                            float GLF_live13alpha2 = _GLF_FUZZED(3333.9106);
                            float GLF_live13alpha3 = _GLF_FUZZED((-6686.0848));
                            float GLF_live13beta = _GLF_FUZZED((8.5));
                            int GLF_live13j = _GLF_FUZZED(53383);
                            int GLF_live13k = _GLF_FUZZED(ivec3(51339, -29747, 48089).z);
                            int GLF_live13looplimiter4 = 0;
                            mat4 GLF_live13matrix_a = _GLF_FUZZED((mat4(-7269.5498, 1.4, -9.5, -45.80, 2045.6917, -973.708, -78.98, 2.9, 8276.1719, 9.4, -893.776, -8.0, -8.2, 5.0, -2790.2851, 51.45) - mat4(407.947, 2.8, 5.4, -3362.8789, -7.8, -8.4, -1359.0974, 62.02, -999.700, -6286.8622, 7.7, -6.0, 2.1, -634.976, -384.700, -58.26)));
                            vec4 GLF_live13matrix_u = _GLF_FUZZED(((-980.379) - vec4(-9.2, -1177.5860, -0.4, 1.9)));
                            {
                                if (GLF_live13looplimiter4 >= 7) {
                                    ;
                                }
                                GLF_live13looplimiter4++;
                                {
                                    {
                                        int GLF_live13looplimiter2 = 0;
                                        for (int GLF_live13a = GLF_live13MATRIX_N - 1; GLF_live13a >= GLF_live13k; GLF_live13a--) {
                                            if (GLF_live13looplimiter2 >= 7) {
                                                break;
                                            }
                                            GLF_live13looplimiter2++;
                                            {
                                                GLF_live13alpha3 += GLF_live13matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_live13a, 4)] * GLF_live13matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_live13a, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live13j, 4)];
                                            }
                                        }
                                    }
                                    GLF_live13beta = GLF_live13alpha2 * GLF_live13alpha3;
                                    {
                                        int GLF_live13looplimiter3 = 0;
                                        for (int GLF_live13a = GLF_live13MATRIX_N - 1; GLF_live13a >= GLF_live13k; GLF_live13a--) {
                                            if (GLF_live13looplimiter3 >= 7) {
                                                break;
                                            }
                                            GLF_live13looplimiter3++;
                                            {
                                                GLF_live13matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_live13a, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live13j, 4)] = GLF_live13matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_live13a, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live13j, 4)] - (GLF_live13beta * GLF_live13matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_live13a, 4)]);
                                            }
                                        }
                                    }
                                    GLF_live13alpha3 = 0.0;
                                    GLF_live13beta = 0.0;
                                }
                            }
                        }
                        _GLF_color = refract(vec4(GLF_live6time, GLF_live6s_g, GLF_dead0injectionSwitch), vec4(215.585, 8.1, 1.3, 1484.5401), GLF_live6s_g);
                    }
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(-0.9, -8027.8429, -3.8, -484.872);
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        if (_GLF_DEAD(false)) {
                            {
                                GLF_dead10_GLF_color = vec4(0.0, 0.0, 0.0, 1.0);
                            }
                        }
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                obj.prime_numbers[i] = 13;
            } else {
                {
                    int GLF_live5looplimiter4 = 0;
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        _GLF_color = vec4(vec3(-19.52, -7604.2404, -78.25), 265.310);
                    }
                    if (GLF_live5looplimiter4 >= 6) {
                        ;
                    }
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    _GLF_color = _GLF_color;
                }
                if (i == 6) {
                    obj.prime_numbers[i] = 17;
                } else if (i == 7) {
                    obj.prime_numbers[i] = 19;
                } else {
                    if (_GLF_DEAD(false)) {
                        ivec2 donor_replacementGLF_dead2pos = _GLF_FUZZED(bitfieldInsert(ivec2(14287, 29832), ivec2(57195, -32970), (i ^ i), -37360));
                        if (_GLF_DEAD(false)) {
                            _GLF_color = mix((_GLF_color * GLF_live6s_g), (+vec4(-52.57, 4.8, 3.2, 5.7)), fwidthCoarse(vec4(2.2, 856.832, -2.1, -4.8)));
                            {
                                int GLF_live14index = _GLF_FUZZED(int(false));
                                int GLF_live14j = _GLF_FUZZED(-56607);
                                {
                                    GLF_live14index = GLF_live14j;
                                }
                            }
                        }
                        {
                            int GLF_live12cols = _GLF_FUZZED(-42503);
                            int GLF_live12looplimiter3 = 0;
                            uint GLF_live12matrix_number = _GLF_FUZZED(uint(-24697));
                            {
                                if (GLF_live12looplimiter3 >= 6) {
                                    ;
                                }
                                GLF_live12looplimiter3++;
                                {
                                    {
                                        int GLF_live12looplimiter2 = 0;
                                        for (int GLF_live12rows = 2; GLF_live12rows <= 4; GLF_live12rows++) {
                                            if (GLF_live12looplimiter2 >= 6) {
                                                break;
                                            }
                                            GLF_live12looplimiter2++;
                                            {
                                                {
                                                    int GLF_live12looplimiter1 = 0;
                                                    for (int GLF_live12c = 0; GLF_live12c < GLF_live12cols; GLF_live12c++) {
                                                        if (GLF_live12looplimiter1 >= 6) {
                                                            break;
                                                        }
                                                        GLF_live12looplimiter1++;
                                                        {
                                                            {
                                                                int GLF_live12looplimiter0 = 0;
                                                                for (int GLF_live12r = 0; GLF_live12r < GLF_live12rows; GLF_live12r++) {
                                                                    if (GLF_live12looplimiter0 >= 6) {
                                                                        break;
                                                                    }
                                                                    GLF_live12looplimiter0++;
                                                                    {
                                                                        switch (GLF_live12matrix_number) {
                                                                            case 0u:
                                                                                GLF_live12m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live12r, 2)] = GLF_live12one;
                                                                                break;
                                                                            case 1u:
                                                                                GLF_live12m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live12r, 3)] = GLF_live12one;
                                                                                break;
                                                                            case 2u:
                                                                                GLF_live12m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live12r, 4)] = GLF_live12one;
                                                                                break;
                                                                            case 3u:
                                                                                GLF_live12m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live12r, 2)] = GLF_live12one;
                                                                                break;
                                                                            case 4u:
                                                                                GLF_live12m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live12r, 3)] = GLF_live12one;
                                                                                break;
                                                                            case 5u:
                                                                                GLF_live12m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live12r, 4)] = GLF_live12one;
                                                                                break;
                                                                            case 6u:
                                                                                GLF_live12m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live12r, 2)] = GLF_live12one;
                                                                                break;
                                                                            case 7u:
                                                                                GLF_live12m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live12r, 3)] = GLF_live12one;
                                                                                break;
                                                                            case 8u:
                                                                                GLF_live12m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live12r, 4)] = GLF_live12one;
                                                                                break;
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                                GLF_live12matrix_number = GLF_live12matrix_number + 1u;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        while (donor_replacementGLF_dead2pos.y != 256) {
                            if (donor_replacementGLF_dead2pos.x < GLF_dead2dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead2pos.y, 256)] + 15 && donor_replacementGLF_dead2pos.x > GLF_dead2dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead2pos.y, 256)] - 15) {
                                float GLF_dead2p = (15.0 - abs(float(donor_replacementGLF_dead2pos.x - GLF_dead2dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead2pos.y, 256)]))) / 15.0;
                                ;
                            }
                            donor_replacementGLF_dead2pos.y++;
                        }
                    }
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(177.701, 1426.3212, -7.2, -979.223);
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(true, true && (true)))) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    if (i == 8) {
                        if (_GLF_DEAD(false)) {
                            _GLF_color = vec4(-3.7, -7332.7732, 68.48, -8.8);
                        }
                        obj.prime_numbers[i] = 23;
                    } else {
                        {
                            int GLF_live13looplimiter5 = 0;
                            if (GLF_live13looplimiter5 >= 7) {
                                ;
                            }
                        }
                        if (i == 9) {
                            obj.prime_numbers[i] = 29;
                            if (_GLF_DEAD(false)) {
                                _GLF_color = atan(vec4(9.6, -1.4, 7.2, 2.8));
                            }
                        }
                    }
                }
                if (_GLF_DEAD(false)) {
                    _GLF_color = roundEven(_GLF_color);
                }
            }
        }
    }
    vec2 uv = (gl_FragCoord.xy / resolution.x) * vec2(resolution.x / resolution.y, 1.0);
    vec2 b = _GLF_IDENTITY(brick(uv * 7.0), (false ? _GLF_FUZZED(resolution) : brick(uv * 7.0)));
    vec3 color = vec3(patternize(b));
    if (gl_FragCoord.y < _GLF_IDENTITY(resolution.y, clamp(_GLF_IDENTITY(resolution.y, clamp(resolution.y, resolution.y, resolution.y)), resolution.y, resolution.y)) / 1.1) {
        {
            int GLF_live13a = _GLF_FUZZED(87679);
            float GLF_live13alpha3 = _GLF_FUZZED(3.9);
            int GLF_live13j = _GLF_FUZZED(((35225 + 52683) & ((-93399) | (-13339))));
            mat4 GLF_live13matrix_a = _GLF_FUZZED(mat4(1551.1985, -109.073, -2.9, 6.8, -92.21, -2672.9291, -950.063, 5077.7099, 1.4, -55.49, -4.3, 82.26, -3466.8128, -0.4, 3370.3913, 934.424));
            vec4 GLF_live13matrix_u = _GLF_FUZZED(vec4(363.513, -0.7, 6.3, 1.2).ragb);
            {
                GLF_live13alpha3 += GLF_live13matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_live13a, 4)] * GLF_live13matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_live13a, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live13j, 4)];
            }
        }
        if (_GLF_DEAD(false)) {
            {
                int GLF_live3i = _GLF_FUZZED((6522 & (-2701)));
                int GLF_live3j = _GLF_FUZZED(20327);
                if (_GLF_DEAD(false)) {
                    _GLF_color = _GLF_color;
                }
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = transpose(mat4x2(743.042, 279.086, -7.0, -0.0, -6.6, 1574.1435, -2.3, 2.4))[1];
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= _GLF_ZERO(0.0, injectionSwitch.x))))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                {
                    GLF_live3i++;
                    GLF_live3swap(GLF_live3i, GLF_live3j);
                    if (_GLF_DEAD(false)) {
                        int donor_replacementGLF_dead9c_im = _GLF_FUZZED((GLF_live3j - (-23907)));
                        int donor_replacementGLF_dead9c_re = _GLF_FUZZED(77145);
                        int donor_replacementGLF_dead9iteration = _GLF_FUZZED((~48563));
                        int donor_replacementGLF_dead9x = _GLF_FUZZED((GLF_live3j));
                        {
                            int GLF_live13looplimiter5 = 0;
                            if (GLF_live13looplimiter5 >= 7) {
                                ;
                            }
                        }
                        int donor_replacementGLF_dead9y = _GLF_FUZZED(ivec3(-3563, -12813, 91942).b);
                        for (int GLF_dead9k = 0; GLF_dead9k < 1000; GLF_dead9k++) {
                            if (donor_replacementGLF_dead9x * donor_replacementGLF_dead9x + donor_replacementGLF_dead9y * donor_replacementGLF_dead9y > 262144) {
                                break;
                            }
                            int GLF_dead9x_new = ((donor_replacementGLF_dead9x * donor_replacementGLF_dead9x - donor_replacementGLF_dead9y * donor_replacementGLF_dead9y) / 256 + donor_replacementGLF_dead9c_re);
                            donor_replacementGLF_dead9y = (2 * donor_replacementGLF_dead9x * donor_replacementGLF_dead9y / 256 + donor_replacementGLF_dead9c_im);
                            donor_replacementGLF_dead9x = GLF_dead9x_new;
                            donor_replacementGLF_dead9iteration++;
                        }
                    }
                }
            }
            {
                ;
            }
        }
        if (binarySearch(obj, obj.prime_numbers[4]) != -(int(resolution.y)) && binarySearch(obj, obj.prime_numbers[0]) >= -(int(resolution.x))) {
            {
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    float donor_replacementGLF_dead10pab = _GLF_FUZZED(dFdxCoarse(GLF_live6b_b));
                    float donor_replacementGLF_dead10pbc = _GLF_FUZZED(dFdxCoarse(GLF_live6time));
                    if (!((donor_replacementGLF_dead10pab < 0.0 && donor_replacementGLF_dead10pbc < 0.0) || (donor_replacementGLF_dead10pab >= 0.0 && donor_replacementGLF_dead10pbc >= 0.0))) {
                        ;
                    }
                }
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(-8.4, 856.645, 6673.8233, -0.8);
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        {
                            int GLF_live14looplimiter0 = 0;
                            if (GLF_live14looplimiter0 >= 7) {
                                ;
                            }
                        }
                        _GLF_color = _GLF_color;
                    }
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            color.yz -= dot(float(binarySearch(obj, obj.prime_numbers[4])), _GLF_IDENTITY(float(binarySearch(obj, obj.prime_numbers[0])), (_GLF_IDENTITY(float(binarySearch(obj, obj.prime_numbers[0])), (float(binarySearch(obj, obj.prime_numbers[0]))) * 1.0)) - 0.0));
        } else {
            discard;
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec2(7567.6386, -467.926).tsst;
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                _GLF_color = log2(min((mat2x4(5.3, -5.2, 41.20, -3.4, -58.75, 4.1, -185.042, -6667.5069) * resolution), GLF_live6b_b));
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                {
                    ;
                }
                if (_GLF_DEAD(false)) {
                    int donor_replacementGLF_dead8index = _GLF_FUZZED((50198 + (GLF_live6b_b, 90140)));
                    int donor_replacementGLF_dead8j = _GLF_FUZZED(findLSB(121876u));
                    {
                        donor_replacementGLF_dead8index = donor_replacementGLF_dead8j;
                    }
                }
            }
        }
        if (_GLF_DEAD(false)) {
            ivec2 donor_replacementGLF_dead2pos = _GLF_FUZZED((ivec2(-20977, -54084) / (-78191)));
            {
                float GLF_dead2p = (15.0 - abs(float(donor_replacementGLF_dead2pos.x - GLF_dead2dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead2pos.y, 256)]))) / 15.0;
                ;
            }
            {
                {
                    {
                        ;
                    }
                }
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(266.987, vec2(5.2, 3.0), 10.03);
                if (_GLF_DEAD(false)) {
                    _GLF_color = _GLF_color;
                }
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(4112.3450, -8838.5459, -80.33, 6823.9666);
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        {
                            int GLF_live11looplimiter6 = 0;
                            if (GLF_live11looplimiter6 >= 4) {
                                ;
                            }
                        }
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
            }
            {
                int GLF_live3i = _GLF_FUZZED((((true) ? 83188 : (-2118)) | (-7835)));
                int GLF_live3j = _GLF_FUZZED((~(-49526)));
                if (_GLF_DEAD(false)) {
                    _GLF_color = (dot(vec2(8.9, 23.33), uv) * vec4(-12.96, -491.474, 26.04, -1474.8514));
                }
                {
                    vec2 GLF_live11color = _GLF_FUZZED(vec2(6.5, -69.57));
                    int GLF_live11i = _GLF_FUZZED((26419 | (-10773)));
                    vec3 GLF_live11vecCoor = _GLF_FUZZED((vec3(-4721.4962, 1.6, -1.7)));
                    if (int(GLF_live11gl_FragCoord[1]) < 90) {
                        GLF_live11color = fract(sin(GLF_live11vecCoor.yx - trunc(float(GLF_live11data[2]))));
                        GLF_live11color.x += atanh(GLF_live11color.x) * cosh(GLF_live11injectionSwitch.y) * smoothstep(GLF_live11color, GLF_live11injectionSwitch, GLF_live11gl_FragCoord.yy).x;
                        ;
                    } else if (int(GLF_live11gl_FragCoord[1]) < 120) {
                        GLF_live11color = fract(acosh(clamp(GLF_live11vecCoor.yx - trunc(float(GLF_live11data[3])), 1.0, 1000.0)));
                        GLF_live11color.x += (isnan(GLF_live11gl_FragCoord.x) ? log2(GLF_live11gl_FragCoord.x) : log2(GLF_live11gl_FragCoord.y));
                        ;
                    } else if (int(GLF_live11gl_FragCoord[1]) < 150) {
                        ;
                    } else if (int(GLF_live11gl_FragCoord[1]) < 180) {
                        GLF_live11color = fract(sin(GLF_live11vecCoor.yx - trunc(float(GLF_live11data[4]))));
                        GLF_live11color[1] += asinh(GLF_live11gl_FragCoord.y * ldexp(GLF_live11color.y, -GLF_live11i));
                        ;
                    } else if (int(GLF_live11gl_FragCoord[1]) < 210) {
                        GLF_live11color = fract(sin(GLF_live11vecCoor.yx - trunc(float(GLF_live11data[5]))));
                        GLF_live11color.y -= tanh(GLF_live11color.x) / cosh(GLF_live11color.y);
                        ;
                    } else if (int(GLF_live11gl_FragCoord[1]) < 240) {
                        GLF_live11color = fract(asinh(GLF_live11vecCoor.yx - trunc(float(GLF_live11data[6]))));
                        GLF_live11color.y -= isnan(float(GLF_live11i)) ? tanh(GLF_live11gl_FragCoord.x) : atanh(GLF_live11gl_FragCoord.y);
                        ;
                    } else if (int(GLF_live11gl_FragCoord[1]) < 270) {
                        GLF_live11color = fract(sin(GLF_live11vecCoor.yx - trunc(float(GLF_live11data[7]))));
                        GLF_live11color.y *= mix(normalize(GLF_live11vecCoor), normalize(vec3(GLF_live11color, degrees(GLF_live11color.x))), GLF_live11injectionSwitch.x).y;
                        ;
                    } else {
                        ;
                    }
                }
                {
                    if (_GLF_DEAD(false)) {
                        _GLF_color = vec4(5.2, 287.809, 2266.0243, -6587.8366);
                    }
                    {
                        float GLF_live13beta = _GLF_FUZZED((+1.8));
                        int GLF_live13j = _GLF_FUZZED(-36485);
                        int GLF_live13k = _GLF_FUZZED(int(false));
                        mat4 GLF_live13matrix_a = _GLF_FUZZED((+mat4(mat4x2(6.0, 18.46, -525.036, 7.9, -1996.0053, 6771.9437, -8.6, 5.0))));
                        vec4 GLF_live13matrix_u = _GLF_FUZZED((vec4(-1.0, 87.94, -8.8, -229.512) + float(58123u)));
                        {
                            int GLF_live13looplimiter3 = 0;
                            for (int GLF_live13a = GLF_live13MATRIX_N - 1; GLF_live13a >= GLF_live13k; GLF_live13a--) {
                                if (GLF_live13looplimiter3 >= 7) {
                                    break;
                                }
                                GLF_live13looplimiter3++;
                                {
                                    GLF_live13matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_live13a, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live13j, 4)] = GLF_live13matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_live13a, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live13j, 4)] - (GLF_live13beta * GLF_live13matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_live13a, 4)]);
                                }
                            }
                        }
                    }
                    GLF_live3i++;
                    GLF_live3swap(GLF_live3i, GLF_live3j);
                }
            }
        }
    } else {
        if (binarySearch(obj, 1) == -1) {
            discard;
        } else {
            {
                {
                    if (_GLF_DEAD(false)) {
                        _GLF_color = vec4(2.1, -131.815, 737.916, 2611.9936);
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        _GLF_color = (GLF_live6b_b / vec4(28.57, 765.320, 901.291, 7.2));
                    }
                    ;
                }
                {
                    mat4 GLF_live13matrix_a = _GLF_FUZZED(mat4(-8.1, -19.94, -309.592, 9.3, 8.8, -7.2, 7748.2967, 16.58, 0.4, 9.2, -62.87, 14.56, 79.08, -2.5, 11.64, 1114.5220));
                    vec4 GLF_live13matrix_b = _GLF_FUZZED(vec2(-612.641, 7881.0389).xyyx);
                    {
                        int GLF_live13looplimiter9 = 0;
                        for (int GLF_live13i = (GLF_live13MATRIX_N - 1); GLF_live13i >= 0; GLF_live13i--) {
                            if (GLF_live13looplimiter9 >= 7) {
                                break;
                            }
                            GLF_live13looplimiter9++;
                            {
                                {
                                    int GLF_live13looplimiter8 = 0;
                                    for (int GLF_live13j = (GLF_live13MATRIX_N - 1); GLF_live13j >= (GLF_live13i + 1); GLF_live13j--) {
                                        if (GLF_live13looplimiter8 >= 7) {
                                            break;
                                        }
                                        GLF_live13looplimiter8++;
                                        {
                                            GLF_live13matrix_b[_GLF_MAKE_IN_BOUNDS_INT(GLF_live13i, 4)] -= (GLF_live13matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_live13i, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live13j, 4)] * GLF_live13matrix_b[_GLF_MAKE_IN_BOUNDS_INT(GLF_live13j, 4)]);
                                        }
                                    }
                                }
                                GLF_live13matrix_b[_GLF_MAKE_IN_BOUNDS_INT(GLF_live13i, 4)] /= GLF_live13matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_live13i, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live13i, 4)];
                            }
                        }
                    }
                }
            }
            color.yz += color.yz;
        }
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
        _GLF_color = _GLF_color;
    }
    _GLF_color = vec4(color, injectionSwitch.y);
}
