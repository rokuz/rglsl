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
vec4 GLF_dead10_GLF_color = _GLF_FUZZED(vec4(-0.4, 35.07, -598.535, -8367.4650));

layout(set = 0, binding = 2) uniform buf2 {
    float GLF_dead10one;
};

mat2 GLF_dead10m22 = _GLF_FUZZED(mat2(mat2x3(98.65, 1.3, 178.430, -462.733, 25.23, 1.6)));
mat2x3 GLF_dead10m23 = _GLF_FUZZED(mat2x3(3.1, 52.85, -7036.6064, 595.599, 5.0, -51.41));
mat2x4 GLF_dead10m24 = _GLF_FUZZED(((-8063.6830) - mat2x4(-0.8, -6.7, 114.090, -3616.7224, -368.607, -683.865, 95.76, -6.7)));
mat3x2 GLF_dead10m32 = _GLF_FUZZED(mat3x2(mat3x4(759.381, -0.6, 6.1, 453.909, -97.28, 3823.0386, -1.7, -2.8, 160.765, -0.8, 2.0, -381.218)));
mat3 GLF_dead10m33 = _GLF_FUZZED((mat3(-53.26, -1951.6111, -893.759, -621.206, -5.2, 577.195, -0.1, 3.3, -2.6) + mat3(mat2(-6.1, 73.13, -7090.5494, -9.4))));
mat3x4 GLF_dead10m34 = _GLF_FUZZED(mat3x4(740.948, -757.882, float(-29475), 5338.5532, -7204.6380, 0.5, 0.3, -69.67, 7576.2315, 6.2, 0.4, vec4(12.03, 1.2, -6910.2543, -3540.7535).p));
mat4x2 GLF_dead10m42 = _GLF_FUZZED(mat4x2(vec3(-34.66, 3.9, 7.4).x, (-(-65.50)), -23.43, -4.9, 3.7, -4.6, 9322.0260, (-(-330.477))));
mat4x3 GLF_dead10m43 = _GLF_FUZZED((mat4x3(-3.0, -6.0, -8.7, -585.588, -3921.3631, 593.928, 5.7, -671.763, 7.4, 5.7, -8.5, -76.64) - mat4x3(6.4, 5.2, 1.9, 85.29, 94.14, 86.89, 50.15, 5.1, 3.5, 8557.7844, -5376.3387, 6.8)));
mat4 GLF_dead10m44 = _GLF_FUZZED((95.72 - mat4(-17.87, -5852.1631, -93.17, 44.07, 480.719, 4.4, -6.5, -2.3, -68.39, -92.07, -699.530, 3.3, 3.9, -35.57, 71.68, 1.6)));

struct GLF_dead11QuicksortObject {
    int numbers[10];
};

GLF_dead11QuicksortObject GLF_dead11obj = GLF_dead11QuicksortObject(int[10](0, 0, 0, 0, 0, 0, 0, 0, 0, 0));

void GLF_dead11swap(int GLF_dead11i, int GLF_dead11j) {
    int GLF_dead11temp = GLF_dead11obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11i, 10)];
    GLF_dead11obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11i, 10)] = GLF_dead11obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11j, 10)];
    GLF_dead11obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11j, 10)] = GLF_dead11temp;
}

layout(set = 0, binding = 3) uniform buf3 {
    float GLF_dead5time;
};

float GLF_dead5h_r = _GLF_FUZZED((847.168 + (-4.5)));
float GLF_dead5s_g = _GLF_FUZZED(float(-32336));
float GLF_dead5b_b = _GLF_FUZZED(vec2(-32.82, -3528.5337).g);

float _GLF_outlined_2(vec3 GLF_dead5temp) {
    return GLF_dead5temp.x;
}

void GLF_dead5doConvert() {
    vec3 GLF_dead5temp = _GLF_FUZZED((vec3(5006.7009, -141.247, 5791.4030) / vec3(-454.590, 9.8, -2.3)));
    GLF_dead5temp = GLF_dead5b_b * (1.0 - GLF_dead5s_g) + (GLF_dead5b_b - GLF_dead5b_b * (1.0 - GLF_dead5s_g)) * clamp(abs(abs(6.0 * (GLF_dead5h_r - vec3(0, 1, 2) / 3.0)) - 3.0) - 1.0, 0.0, 1.0);
    GLF_dead5h_r = _GLF_outlined_2(GLF_dead5temp);
    GLF_dead5s_g = GLF_dead5temp.y;
    do {
        GLF_dead5b_b = GLF_dead5temp.z;
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < _GLF_IDENTITY(dot(vec2(0.0, 0.0), vec2(1.0, cos(0.0))), dot(vec2(0.0, 0.0), vec2(1.0, cos(0.0)))))))) {
            int donor_replacementGLF_dead8i = _GLF_FUZZED(bitfieldExtract(69922, -87425, ivec3(48649, -99431, 89383)[2]));
            int donor_replacementGLF_dead8iters = _GLF_FUZZED(((-1279) << ivec2(6115, -23025)[1]));
            int donor_replacementGLF_dead8v = _GLF_FUZZED(83262);
            for (donor_replacementGLF_dead8i = 0; donor_replacementGLF_dead8i < donor_replacementGLF_dead8iters; donor_replacementGLF_dead8i++) {
                donor_replacementGLF_dead8v = (4 * donor_replacementGLF_dead8v * (1000 - donor_replacementGLF_dead8v)) / 1000;
            }
        }
    } while (_GLF_WRAPPED_LOOP(false));
}

vec3 GLF_dead5computeColor(float GLF_dead5c, vec2 GLF_dead5position) {
    GLF_dead5h_r = fract(GLF_dead5c);
    GLF_dead5s_g = 1.0;
    GLF_dead5b_b = (0.5 + (sin(GLF_dead5time) * 0.5 + 0.5));
    GLF_dead5doConvert();
    GLF_dead5s_g *= 1.0 / GLF_dead5position.y;
    GLF_dead5h_r *= 1.0 / GLF_dead5position.x;
    if (abs(GLF_dead5position.y - GLF_dead5position.x) < 0.5) {
        GLF_dead5b_b = clamp(0.0, 1.0, GLF_dead5b_b * 3.0);
    }
    return vec3(GLF_dead5h_r, GLF_dead5s_g, GLF_dead5b_b);
}

vec3 GLF_dead5defaultColor() {
    return vec3(0.0);
}

vec3 GLF_dead5drawShape(vec2 GLF_dead5pos, vec2 GLF_dead5square, vec3 GLF_dead5setting) {
    bool GLF_dead5c1 = GLF_dead5pos.x - GLF_dead5setting.x < GLF_dead5square.x;
    if (!GLF_dead5c1) {
        return GLF_dead5defaultColor();
    }
    bool GLF_dead5c2 = GLF_dead5pos.x + GLF_dead5setting.x > GLF_dead5square.x;
    if (!GLF_dead5c2) {
        return GLF_dead5defaultColor();
    }
    bool GLF_dead5c3 = GLF_dead5pos.y - GLF_dead5setting.x < GLF_dead5square.y;
    if (!GLF_dead5c3) {
        return GLF_dead5defaultColor();
    }
    bool GLF_dead5c4 = GLF_dead5pos.y + GLF_dead5setting.x > GLF_dead5square.y;
    do {
        if (!GLF_dead5c4) {
            return GLF_dead5defaultColor();
        }
    } while (_GLF_WRAPPED_LOOP(false));
    bool GLF_dead5c5 = GLF_dead5pos.x - (GLF_dead5setting.x - GLF_dead5setting.y) < GLF_dead5square.x;
    if (!GLF_dead5c5) {
        return GLF_dead5computeColor(GLF_dead5setting.z / 40.0, GLF_dead5pos);
    }
    bool GLF_dead5c6 = GLF_dead5pos.x + (GLF_dead5setting.x - GLF_dead5setting.y) > GLF_dead5square.x;
    if (!GLF_dead5c6) {
        if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
        } else {
            return GLF_dead5computeColor(GLF_dead5setting.z / 40.0, GLF_dead5pos);
        }
    }
    bool GLF_dead5c7 = GLF_dead5pos.y - (GLF_dead5setting.x - GLF_dead5setting.y) < GLF_dead5square.y;
    if (!GLF_dead5c7) {
        return GLF_dead5computeColor(GLF_dead5setting.z / 40.0, GLF_dead5pos);
    }
    bool GLF_dead5c8 = GLF_dead5pos.y + (GLF_dead5setting.x - GLF_dead5setting.y) > GLF_dead5square.y;
    if (!GLF_dead5c8) {
        return GLF_dead5computeColor(GLF_dead5setting.z / 40.0, GLF_dead5pos);
    }
    return GLF_dead5defaultColor();
}

const int GLF_dead7dp[256] = int[256](115, 133, 150, 164, 176, 184, 190, 192, 191, 187, 181, 172, 163, 153, 143, 134, 126, 120, 116, 114, 114, 117, 121, 127, 134, 141, 148, 154, 159, 162, 163, 161, 157, 151, 143, 134, 124, 113, 103, 94, 87, 82, 79, 80, 84, 91, 101, 114, 130, 146, 164, 182, 199, 215, 229, 240, 249, 254, 256, 254, 250, 243, 233, 223, 212, 200, 190, 180, 172, 166, 163, 161, 162, 164, 169, 174, 179, 185, 190, 193, 195, 195, 192, 188, 180, 171, 161, 149, 137, 125, 114, 105, 97, 93, 91, 93, 98, 106, 117, 130, 145, 161, 177, 193, 208, 221, 231, 239, 243, 244, 242, 236, 228, 218, 207, 194, 181, 169, 158, 148, 141, 135, 132, 131, 132, 135, 138, 143, 147, 151, 154, 155, 155, 152, 146, 139, 129, 118, 106, 93, 80, 68, 58, 49, 43, 40, 41, 44, 51, 61, 73, 87, 103, 119, 134, 149, 162, 173, 181, 186, 188, 186, 181, 174, 164, 153, 141, 128, 116, 104, 94, 86, 81, 77, 76, 77, 80, 84, 89, 94, 98, 102, 104, 104, 102, 98, 92, 83, 73, 62, 50, 38, 26, 16, 8, 2, 0, 0, 4, 11, 21, 33, 48, 64, 81, 98, 114, 129, 141, 151, 158, 161, 161, 158, 152, 144, 134, 123, 112, 100, 90, 81, 73, 68, 65, 65, 67, 70, 75, 81, 87, 92, 97, 101, 103, 102, 100, 95, 88, 79, 69, 58, 47, 36, 26, 18, 13, 11, 11, 15, 22, 32, 45, 60, 77, 94);

layout(set = 0, binding = 4) uniform buf4 {
    vec2 GLF_dead2injectionSwitch;
};

struct GLF_dead2QuicksortObject {
    int numbers[10];
};

GLF_dead2QuicksortObject GLF_dead2obj = GLF_dead2QuicksortObject(int[10](0, 0, 0, 0, 0, _GLF_IDENTITY(0, (0) >> 0), 0, 0, 0, 0));

vec3 GLF_dead2palette(vec3 GLF_dead2a, vec3 GLF_dead2b, vec3 GLF_dead2c, vec3 GLF_dead2d) {
    return fract(mix(_GLF_IDENTITY(GLF_dead2d, mat3(1.0) * (GLF_dead2d)) * _GLF_IDENTITY(GLF_dead2a, vec3(_GLF_IDENTITY(mat3(GLF_dead2a, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), (mat3(GLF_dead2a, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0)) / mat3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0)))), GLF_dead2a * GLF_dead2c, GLF_dead2b + GLF_dead2d - GLF_dead2c));
}

struct GLF_dead3QuicksortObject {
    int numbers[10];
};

GLF_dead3QuicksortObject GLF_dead3obj = GLF_dead3QuicksortObject(int[10](0, 0, 0, 0, 0, 0, 0, 0, 0, 0));
const vec4 GLF_dead1pal[16] = vec4[16](vec4(0.0, 0.0, 0.0, 1.0), vec4(0.5, 0.0, 0.0, 1.0), vec4(0.0, 0.5, 0.0, 1.0), _GLF_IDENTITY(vec4(0.5, 0.5, 0.0, 1.0), _GLF_IDENTITY(vec4(mat2x4(vec4(0.5, 0.5, 0.0, 1.0), 0.0, 1.0, 1.0, 1.0)), (vec4(mat2x4(vec4(0.5, 0.5, 0.0, 1.0), 0.0, 1.0, 1.0, 1.0))) / vec4(1.0, 1.0, 1.0, 1.0))), vec4(0.0, 0.0, 0.5, 1.0), vec4(0.5, 0.0, 0.5, 1.0), vec4(0.0, 0.5, 0.5, 1.0), vec4(0.5, 0.5, 0.5, 1.0), vec4(0.0, 0.0, 0.0, _GLF_IDENTITY(1.0, (1.0) + sin(0.0))), vec4(1.0, 0.0, 0.0, 1.0), vec4(0.0, 1.0, 0.0, 1.0), vec4(1.0, 1.0, 0.0, 1.0), vec4(0.0, 0.0, 1.0, 1.0), vec4(1.0, 0.0, 1.0, 1.0), vec4(0.0, 1.0, 1.0, 1.0), vec4(1.0, 1.0, 1.0, 1.0));
const vec4 GLF_dead1picdata[8] = vec4[8](vec4(4, 4, 20, 4), vec4(4, 4, 4, 20), vec4(4, 20, 20, 4), vec4(20, 4, 4, 8), vec4(8, 6, 4, 2), vec4(2, 12, 2, 4), vec4(_GLF_IDENTITY(16, (_GLF_IDENTITY(16, (16) / 1)) / 1), 2, 4, 4), vec4(12, 22, 4, 4));

bool GLF_dead1collision(vec2 GLF_dead1pos, vec4 GLF_dead1quad) {
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < log(1.0))))) {
        float donor_replacementGLF_dead9limit = _GLF_FUZZED(GLF_dead5b_b);
        float donor_replacementGLF_dead9ref = _GLF_FUZZED(GLF_dead5h_r);
        float donor_replacementGLF_dead9s = _GLF_FUZZED(GLF_dead5h_r);
        for (int GLF_dead9i = 1; GLF_dead9i < 800; GLF_dead9i++) {
            if (mod(float(GLF_dead9i), donor_replacementGLF_dead9ref) <= 0.01) {
                donor_replacementGLF_dead9s += 0.2;
            }
            if (float(GLF_dead9i) >= donor_replacementGLF_dead9limit) {
                ;
            }
        }
    }
    if (_GLF_DEAD(false)) {
        float donor_replacementGLF_dead4c_im = _GLF_FUZZED(-6.1);
        float donor_replacementGLF_dead4c_re = _GLF_FUZZED(-1.0);
        int donor_replacementGLF_dead4iteration = _GLF_FUZZED(-74549);
        if (_GLF_DEAD(false)) {
            int donor_replacementGLF_dead11pivot = _GLF_FUZZED(29382);
            for (int GLF_dead11j = donor_replacementGLF_dead4iteration; GLF_dead11j <= donor_replacementGLF_dead4iteration - 1; GLF_dead11j++) {
                if (GLF_dead11obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11j, 10)] <= donor_replacementGLF_dead11pivot) {
                    donor_replacementGLF_dead4iteration++;
                    GLF_dead11swap(donor_replacementGLF_dead4iteration, GLF_dead11j);
                }
            }
        }
        int donor_replacementGLF_dead4k = _GLF_FUZZED(20558);
        float donor_replacementGLF_dead4x = _GLF_FUZZED(determinant(mat2(-65.54, 73.73, -7.1, -6095.1736)));
        float donor_replacementGLF_dead4y = _GLF_FUZZED(determinant(mat4(-15.34, 7862.7717, -637.787, 725.696, 7.9, 53.00, -5.9, 395.596, 6.2, -7.1, 138.188, 9.5, -9.3, -7.7, 6.2, -805.776)));
        {
            if (donor_replacementGLF_dead4x * donor_replacementGLF_dead4x + donor_replacementGLF_dead4y * donor_replacementGLF_dead4y > 4.0) {
                ;
            }
            float GLF_dead4x_new = donor_replacementGLF_dead4x * donor_replacementGLF_dead4x - donor_replacementGLF_dead4y * donor_replacementGLF_dead4y + donor_replacementGLF_dead4c_re;
            donor_replacementGLF_dead4y = 2.0 * donor_replacementGLF_dead4x * donor_replacementGLF_dead4y + donor_replacementGLF_dead4c_im;
            donor_replacementGLF_dead4x = GLF_dead4x_new;
            donor_replacementGLF_dead4iteration++;
            donor_replacementGLF_dead4k++;
        }
    }
    if (GLF_dead1pos.x < GLF_dead1quad.x) {
        if (_GLF_WRAPPED_IF_FALSE(false)) {
        } else {
            return false;
        }
    }
    if (GLF_dead1pos.y < GLF_dead1quad.y) {
        return false;
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
        return true;
    }
    if (GLF_dead1pos.x > GLF_dead1quad.x + GLF_dead1quad.z) {
        for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != (1 ^ 1)); _injected_loop_counter--) {
            return false;
        }
    }
    if (GLF_dead1pos.y > GLF_dead1quad.y + GLF_dead1quad.w) {
        return false;
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
            if (_GLF_DEAD(false)) {
                vec3 donor_replacementGLF_dead11color = _GLF_FUZZED(max(faceforward(vec3(4017.5315, 9252.6266, -9.7), vec3(-706.971, 9.8, 8.8), vec3(84.89, -91.79, -615.770)), vec3(1.1, 9.6, -46.99)));
                {
                    donor_replacementGLF_dead11color.x += float(GLF_dead11obj.numbers[1]);
                }
            }
            bool donor_replacementGLF_dead5c8 = _GLF_FUZZED((23.53 == (-192.251)));
            vec3 donor_replacementGLF_dead5setting = _GLF_FUZZED(mat2x3(-2045.7629, 817.606, -7.9, -1.7, 149.888, 91.76)[0]);
            if (_GLF_DEAD(false)) {
                int donor_replacementGLF_dead9i = _GLF_FUZZED(-7340);
                if (GLF_dead1quad[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9i, 4)] >= 1.0) {
                    GLF_dead1quad[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9i, 4)] = GLF_dead1quad[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9i, 4)] * GLF_dead1quad[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9i, 4)];
                }
            }
            if (!donor_replacementGLF_dead5c8) {
                ;
                if (_GLF_DEAD(false)) {
                    int donor_replacementGLF_dead9i = _GLF_FUZZED(-55067);
                    float donor_replacementGLF_dead9s = _GLF_FUZZED(GLF_dead5h_r);
                    if (float(donor_replacementGLF_dead9i) >= GLF_dead5h_r) {
                        ;
                    }
                }
            }
        }
    }
    return true;
    if (_GLF_DEAD(false)) {
        int donor_replacementGLF_dead10c = _GLF_FUZZED(bitCount(int(GLF_dead5s_g)));
        uint donor_replacementGLF_dead10matrix_number = _GLF_FUZZED(uvec2(163221u, 886u).g);
        int donor_replacementGLF_dead10rows = _GLF_FUZZED(-81692);
        for (int GLF_dead10r = 0; GLF_dead10r < donor_replacementGLF_dead10rows; GLF_dead10r++) {
            switch (donor_replacementGLF_dead10matrix_number) {
                case 0u:
                    GLF_dead10m22[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead10c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10r, 2)] = GLF_dead10one;
                    break;
                case 1u:
                    GLF_dead10m23[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead10c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10r, 3)] = GLF_dead10one;
                    break;
                case 2u:
                    GLF_dead10m24[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead10c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10r, 4)] = GLF_dead10one;
                    break;
                case 3u:
                    GLF_dead10m32[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead10c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10r, 2)] = GLF_dead10one;
                    break;
                case 4u:
                    GLF_dead10m33[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead10c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10r, 3)] = GLF_dead10one;
                    break;
                case 5u:
                    GLF_dead10m34[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead10c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10r, 4)] = GLF_dead10one;
                    break;
                case 6u:
                    GLF_dead10m42[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead10c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10r, 2)] = GLF_dead10one;
                    break;
                case 7u:
                    GLF_dead10m43[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead10c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10r, 3)] = GLF_dead10one;
                    break;
                case 8u:
                    GLF_dead10m44[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead10c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10r, 4)] = GLF_dead10one;
                    break;
            }
        }
    }
}

layout(location = 0) out vec4 _GLF_color;

layout(set = 0, binding = 0) uniform buf0 {
    vec2 injectionSwitch;
};

layout(set = 0, binding = 1) uniform buf1 {
    vec2 resolution;
};

vec4 _GLF_outlined_3(vec4 _GLF_outVarBackup_GLF_color) {
    return _GLF_outVarBackup_GLF_color;
}

vec4 _GLF_outlined_4() {
    return mix(degrees(vec4(-86.85, -9.1, 821.846, -86.24)), vec4(-4925.9727, -9256.5412, 40.87, 262.416), bvec4(false, true, true, true));
}

vec4 _GLF_outlined_5(vec4 _GLF_outVarBackup_GLF_color) {
    return _GLF_outVarBackup_GLF_color;
}

vec4 _GLF_outlined_6(vec4 _GLF_color) {
    return _GLF_color;
}

vec4 _GLF_outlined_7(vec4 _GLF_color) {
    return _GLF_color;
}

vec4 _GLF_outlined_8(vec4 _GLF_color) {
    return _GLF_color;
}

vec4 _GLF_outlined_9(vec4 _GLF_color) {
    return _GLF_color;
}

vec4 _GLF_outlined_10(vec4 _GLF_outVarBackup_GLF_color) {
    return _GLF_outVarBackup_GLF_color;
}

int _GLF_outlined_11(int k) {
    return (4 * k * (1000 - k)) / 1000;
}

vec4 _GLF_outlined_12(vec4 _GLF_outVarBackup_GLF_color) {
    return _GLF_outVarBackup_GLF_color;
}

vec4 _GLF_outlined_13() {
    return smoothstep((9488.6223 * 3538.9402), 8.6, vec4(-43.98, 4.0, 384.515, 965.856));
}

vec4 _GLF_outlined_14(vec4 _GLF_outVarBackup_GLF_color) {
    return _GLF_outVarBackup_GLF_color;
}

vec3 _GLF_outlined_15(vec2 injectionSwitch, vec2 o) {
    return vec3(injectionSwitch.x, cos(o));
}

vec4 _GLF_outlined_16(vec3 m) {
    return vec4(fwidthFine(m), 62.73);
}

vec4 _GLF_outlined_17(vec4 _GLF_outVarBackup_GLF_color) {
    return _GLF_outVarBackup_GLF_color;
}

vec4 _GLF_outlined_18() {
    return (vec4(3.6, 48.21, -3.2, -4816.7007) * dFdyFine(vec4(4100.7532, 686.036, 8.0, 2.8)));
}

vec4 _GLF_outlined_19(vec4 _GLF_color) {
    return _GLF_color;
}

vec4 _GLF_outlined_20(vec4 _GLF_outVarBackup_GLF_color) {
    return _GLF_outVarBackup_GLF_color;
}

vec4 _GLF_outlined_21(vec4 _GLF_outVarBackup_GLF_color) {
    return _GLF_outVarBackup_GLF_color;
}

vec4 _GLF_outlined_22() {
    return smoothstep(-71.88, -7.4, vec4(2.3, 708.246, 3515.4031, -0.6));
}

vec4 _GLF_outlined_23(vec4 _GLF_outVarBackup_GLF_color) {
    return _GLF_outVarBackup_GLF_color;
}

vec2 pattern(in vec2 x) {
    if (_GLF_DEAD(false)) {
        return vec2(1.0, 1.0);
    }
    vec2 n = floor(x);
    vec3 m = vec3(1.0);
    for (int j = -1; j <= int(injectionSwitch.y); j++) {
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            int donor_replacementGLF_dead8v = _GLF_FUZZED(-60829);
            {
                donor_replacementGLF_dead8v = (4 * donor_replacementGLF_dead8v * (1000 - donor_replacementGLF_dead8v)) / 1000;
            }
        }
        for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < int(_GLF_ONE(1.0, injectionSwitch.y))); _injected_loop_counter++) {
            for (int i = -1; _GLF_IDENTITY(i, max(i, i)) <= int(injectionSwitch.y); i++) {
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(90.44, -7.8, -6095.7637, 529.275);
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                        _GLF_color = _GLF_outlined_3(_GLF_outVarBackup_GLF_color);
                    }
                }
                vec2 g = vec2(float(j), float(i));
                vec2 o = mix(n, g, 0.2);
                for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < (int(_GLF_IDENTITY(_GLF_ONE(1.0, injectionSwitch.y), (true ? _GLF_ONE(1.0, injectionSwitch.y) : _GLF_FUZZED(-686.753)))) & 1)); _injected_loop_counter++) {
                    if (_GLF_DEAD(false)) {
                        {
                            for (int _injected_loop_counter = int(_GLF_ONE(1.0, injectionSwitch.y)); _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                                discard;
                            }
                        }
                        if (_GLF_DEAD(false)) {
                            int donor_replacementGLF_dead11i = _GLF_FUZZED(mix(i, -45769, true));
                            {
                                GLF_dead11obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11i, 10)] = (10 - donor_replacementGLF_dead11i);
                                GLF_dead11obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11i, 10)] = GLF_dead11obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11i, 10)] * GLF_dead11obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11i, 10)];
                            }
                        }
                    }
                    if (_GLF_IDENTITY(injectionSwitch, (injectionSwitch) / vec2(1.0, 1.0)).x < (m.x)) {
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                                if (_GLF_DEAD(false)) {
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        _GLF_color = _GLF_outlined_4();
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            _GLF_color = _GLF_outlined_5(_GLF_outVarBackup_GLF_color);
                                        }
                                    }
                                    {
                                        ;
                                    }
                                }
                            }
                            _GLF_color = dFdyCoarse(vec4(47.54, -3.2, -1.0, 8.6));
                        }
                        int k = 1;
                        if (_GLF_DEAD(false)) {
                            break;
                        }
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            if (_GLF_DEAD(false)) {
                                uint donor_replacementGLF_dead10matrix_number = _GLF_FUZZED(169902u);
                                int donor_replacementGLF_dead10rows = _GLF_FUZZED(findMSB(84654u));
                                {
                                    for (int GLF_dead10c = 0; GLF_dead10c < _injected_loop_counter; GLF_dead10c++) {
                                        for (int GLF_dead10r = 0; GLF_dead10r < donor_replacementGLF_dead10rows; GLF_dead10r++) {
                                            switch (donor_replacementGLF_dead10matrix_number) {
                                                case 0u:
                                                    GLF_dead10m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10r, 2)] = GLF_dead10one;
                                                    break;
                                                case 1u:
                                                    GLF_dead10m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10r, 3)] = GLF_dead10one;
                                                    break;
                                                case 2u:
                                                    GLF_dead10m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10r, 4)] = GLF_dead10one;
                                                    break;
                                                case 3u:
                                                    GLF_dead10m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10r, 2)] = GLF_dead10one;
                                                    break;
                                                case 4u:
                                                    GLF_dead10m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10r, 3)] = GLF_dead10one;
                                                    break;
                                                case 5u:
                                                    GLF_dead10m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10r, 4)] = GLF_dead10one;
                                                    break;
                                                case 6u:
                                                    GLF_dead10m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10r, 2)] = GLF_dead10one;
                                                    break;
                                                case 7u:
                                                    GLF_dead10m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10r, 3)] = GLF_dead10one;
                                                    break;
                                                case 8u:
                                                    GLF_dead10m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10r, 4)] = GLF_dead10one;
                                                    break;
                                            }
                                        }
                                    }
                                    donor_replacementGLF_dead10matrix_number = donor_replacementGLF_dead10matrix_number + 1u;
                                }
                            }
                            _GLF_outVarBackup_GLF_color = _GLF_outlined_6(_GLF_color);
                            _GLF_color = vec4(7917.9753, 8.1, -7.8, -4.1);
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < abs(0.0))))) {
                                    vec4 donor_replacementGLF_dead9c = _GLF_FUZZED((+_GLF_outVarBackup_GLF_color));
                                    int donor_replacementGLF_dead9i = _GLF_FUZZED((j & k));
                                    if (donor_replacementGLF_dead9c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9i, 4)] >= 1.0) {
                                        donor_replacementGLF_dead9c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9i, 4)] = donor_replacementGLF_dead9c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9i, 4)] * donor_replacementGLF_dead9c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9i, 4)];
                                    }
                                }
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_outlined_7(_GLF_color);
                                    _GLF_color = mod(abs(vec4(2402.8209, -4.6, -6.9, -4953.3614)), vec4(-3.4, -0.0, 558.779, -8.9));
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                            }
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            ivec2 donor_replacementGLF_dead7pos = _GLF_FUZZED(sign(ivec2(-3259, -92887)));
                            while (donor_replacementGLF_dead7pos.y != 256) {
                                if (donor_replacementGLF_dead7pos.x < GLF_dead7dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead7pos.y, 256)] + 15 && donor_replacementGLF_dead7pos.x > GLF_dead7dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead7pos.y, 256)] - 15) {
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = _GLF_outlined_8(_GLF_color);
                                    }
                                    float GLF_dead7p = (15.0 - abs(float(donor_replacementGLF_dead7pos.x - GLF_dead7dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead7pos.y, 256)]))) / 15.0;
                                    ;
                                }
                                donor_replacementGLF_dead7pos.y++;
                            }
                        }
                        if (_GLF_DEAD(false)) {
                            _GLF_color = _GLF_outlined_9(_GLF_color);
                            if (_GLF_DEAD(false)) {
                                for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != (1 | ((1 << _GLF_IDENTITY(int(4), int(4))) >> _GLF_IDENTITY(int(4), int(4))))); _injected_loop_counter++) {
                                    ;
                                }
                            }
                            if (_GLF_DEAD(false)) {
                                break;
                            }
                        }
                        if (_GLF_DEAD(false)) {
                            if (_GLF_DEAD(false)) {
                                do {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = _GLF_color;
                                    }
                                    _GLF_color = smoothstep(vec4(-74.57, 53.65, -8.5, -2812.6694), acos(dFdyFine(vec4(5248.6270, -52.07, -9.7, -4.5))), vec4(-653.612, -1115.7464, -6.8, 6.0));
                                    for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                            _GLF_color = _GLF_outlined_10(_GLF_outVarBackup_GLF_color);
                                        }
                                        {
                                            vec4 _GLF_outVarBackup_GLF_color;
                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                            _GLF_color = (vec4(4.2, -7.2, 0.9, -5644.1045) + exp2(-5779.8871));
                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                            }
                                        }
                                    }
                                } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))));
                                vec4 donor_replacementGLF_dead1quad = _GLF_FUZZED((unpackUnorm4x8(177440u) - 5.5));
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < _GLF_ZERO(0.0, injectionSwitch.x))))) {
                                        {
                                            ;
                                        }
                                    }
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = vec4(-0.8, 23.27, -7.4, 6.3);
                                    if (_GLF_DEAD(false)) {
                                        int donor_replacementGLF_dead8v = _GLF_FUZZED((mix(_injected_loop_counter, findMSB(156091u), (mat3x2(-1.7, -9.5, 44.18, -484.684, -60.53, 3.0) != mat3x2(-0.3, -444.916, -62.90, 88.48, -826.917, -408.468))) | bitCount(43300u)));
                                        {
                                            donor_replacementGLF_dead8v = (4 * donor_replacementGLF_dead8v * (1000 - donor_replacementGLF_dead8v)) / 1000;
                                        }
                                    }
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                                if (_GLF_DEAD(false)) {
                                    float donor_replacementGLF_dead9limit = _GLF_FUZZED(injectionSwitch[0]);
                                    float donor_replacementGLF_dead9ref = _GLF_FUZZED(degrees(GLF_dead5time));
                                    float donor_replacementGLF_dead9s = _GLF_FUZZED(log2(GLF_dead5time));
                                    {
                                        if (mod(float(j), donor_replacementGLF_dead9ref) <= 0.01) {
                                            donor_replacementGLF_dead9s += 0.2;
                                        }
                                        if (float(j) >= donor_replacementGLF_dead9limit) {
                                            ;
                                        }
                                    }
                                }
                                if (x.y > donor_replacementGLF_dead1quad.y + donor_replacementGLF_dead1quad.w) {
                                    if (_GLF_DEAD(false)) {
                                        if (_GLF_DEAD(false)) {
                                            _GLF_color = vec4(-4330.3367, -7492.8013, -5.4, 82.54);
                                        }
                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                            vec3 donor_replacementGLF_dead11color = _GLF_FUZZED(asin(vec3(2988.1297, -780.638, -1.0)));
                                            vec2 donor_replacementGLF_dead11uv = _GLF_FUZZED(o);
                                            if (donor_replacementGLF_dead11uv.y > (1.0 / 4.0)) {
                                                donor_replacementGLF_dead11color.x += float(GLF_dead11obj.numbers[5]);
                                            }
                                        }
                                        ivec2 donor_replacementGLF_dead7pos = _GLF_FUZZED(mix(ivec2(-16611, -89585), ivec2(-5456, 70951), bvec2(false, false)));
                                        {
                                            if (donor_replacementGLF_dead7pos.x < GLF_dead7dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead7pos.y, 256)] + 15 && donor_replacementGLF_dead7pos.x > GLF_dead7dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead7pos.y, 256)] - 15) {
                                                float GLF_dead7p = (15.0 - abs(float(donor_replacementGLF_dead7pos.x - GLF_dead7dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead7pos.y, 256)]))) / 15.0;
                                                ;
                                            }
                                            donor_replacementGLF_dead7pos.y++;
                                        }
                                    }
                                    if (_GLF_WRAPPED_IF_FALSE(false)) {
                                        if (_GLF_DEAD(false)) {
                                            {
                                                k = (4 * k * (1000 - k)) / 1000;
                                            }
                                        }
                                    } else {
                                        ;
                                    }
                                }
                                if (_GLF_DEAD(false)) {
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        _GLF_color = dFdxFine(((-8138.3738) + vec4(-381.895, -0.7, -4.8, -4.9)));
                                        if (_GLF_DEAD(false)) {
                                            vec3 donor_replacementGLF_dead11color = _GLF_FUZZED(vec3(-7837.8935, 7.2, 5589.6415));
                                            {
                                                donor_replacementGLF_dead11color.y += float(GLF_dead11obj.numbers[6]);
                                            }
                                        }
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                    }
                                    _GLF_color = vec4(8926.4960, 61.29, -1.7, -1828.1006);
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                            int donor_replacementGLF_dead10c = _GLF_FUZZED(-33423);
                                            uint donor_replacementGLF_dead10matrix_number = _GLF_FUZZED(174814u);
                                            int donor_replacementGLF_dead10r = _GLF_FUZZED(clamp(_injected_loop_counter, k, k));
                                            {
                                                switch (donor_replacementGLF_dead10matrix_number) {
                                                    case 0u:
                                                        GLF_dead10m22[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead10c, 2)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead10r, 2)] = GLF_dead10one;
                                                        break;
                                                    case 1u:
                                                        GLF_dead10m23[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead10c, 2)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead10r, 3)] = GLF_dead10one;
                                                        break;
                                                    case 2u:
                                                        GLF_dead10m24[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead10c, 2)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead10r, 4)] = GLF_dead10one;
                                                        break;
                                                    case 3u:
                                                        GLF_dead10m32[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead10c, 3)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead10r, 2)] = GLF_dead10one;
                                                        break;
                                                    case 4u:
                                                        GLF_dead10m33[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead10c, 3)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead10r, 3)] = GLF_dead10one;
                                                        break;
                                                    case 5u:
                                                        GLF_dead10m34[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead10c, 3)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead10r, 4)] = GLF_dead10one;
                                                        break;
                                                    case 6u:
                                                        GLF_dead10m42[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead10c, 4)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead10r, 2)] = GLF_dead10one;
                                                        break;
                                                    case 7u:
                                                        GLF_dead10m43[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead10c, 4)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead10r, 3)] = GLF_dead10one;
                                                        break;
                                                    case 8u:
                                                        GLF_dead10m44[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead10c, 4)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead10r, 4)] = GLF_dead10one;
                                                        break;
                                                }
                                            }
                                        }
                                        _GLF_color = _GLF_color;
                                    }
                                }
                                if (_GLF_DEAD(false)) {
                                    {
                                        k = _GLF_outlined_11(k);
                                    }
                                }
                            }
                            break;
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < _GLF_ZERO(0.0, injectionSwitch.x))))) {
                                {
                                    k = (4 * k * (1000 - k)) / 1000;
                                }
                            }
                        }
                        {
                            if (_GLF_DEAD(false)) {
                                _GLF_color = atanh(vec4(-4.9, 2.4, 8.0, 699.469));
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = vec4(-6919.4863, -8.5, 1095.1107, -9.1);
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                            }
                            if (_GLF_DEAD(false)) {
                                int donor_replacementGLF_dead10c = _GLF_FUZZED((j % 58852));
                                uint donor_replacementGLF_dead10matrix_number = _GLF_FUZZED((148613u ^ 153869u));
                                int donor_replacementGLF_dead10rows = _GLF_FUZZED(j);
                                for (int GLF_dead10r = 0; GLF_dead10r < donor_replacementGLF_dead10rows; GLF_dead10r++) {
                                    switch (donor_replacementGLF_dead10matrix_number) {
                                        case 0u:
                                            GLF_dead10m22[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead10c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10r, 2)] = GLF_dead10one;
                                            break;
                                        case 1u:
                                            GLF_dead10m23[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead10c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10r, 3)] = GLF_dead10one;
                                            break;
                                        case 2u:
                                            GLF_dead10m24[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead10c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10r, 4)] = GLF_dead10one;
                                            break;
                                        case 3u:
                                            GLF_dead10m32[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead10c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10r, 2)] = GLF_dead10one;
                                            break;
                                        case 4u:
                                            GLF_dead10m33[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead10c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10r, 3)] = GLF_dead10one;
                                            break;
                                        case 5u:
                                            GLF_dead10m34[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead10c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10r, 4)] = GLF_dead10one;
                                            break;
                                        case 6u:
                                            GLF_dead10m42[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead10c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10r, 2)] = GLF_dead10one;
                                            break;
                                        case 7u:
                                            GLF_dead10m43[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead10c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10r, 3)] = GLF_dead10one;
                                            break;
                                        case 8u:
                                            GLF_dead10m44[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead10c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10r, 4)] = GLF_dead10one;
                                            break;
                                    }
                                }
                            }
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = atan(vec4(vec2(-36.46, -9.1), mod(3.4, -3027.6489), dFdx(3.9)));
                            {
                                if (_GLF_DEAD(false)) {
                                    int donor_replacementGLF_dead8v = _GLF_FUZZED(ivec2(-5962, 2549).g);
                                    {
                                        donor_replacementGLF_dead8v = (4 * donor_replacementGLF_dead8v * (1000 - donor_replacementGLF_dead8v)) / 1000;
                                    }
                                }
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = vec4(-5.0);
                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                _GLF_color = _GLF_outlined_12(_GLF_outVarBackup_GLF_color);
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                int donor_replacementGLF_dead8v = _GLF_FUZZED(-57288);
                                {
                                    donor_replacementGLF_dead8v = (4 * donor_replacementGLF_dead8v * (1000 - donor_replacementGLF_dead8v)) / 1000;
                                }
                            }
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = _GLF_outlined_13();
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    _GLF_color = _GLF_outlined_14(_GLF_outVarBackup_GLF_color);
                                }
                            }
                            ivec2 donor_replacementGLF_dead7pos = _GLF_FUZZED(ivec2(-5459, -42304));
                            if (donor_replacementGLF_dead7pos.x < GLF_dead7dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead7pos.y, 256)] + 15 && donor_replacementGLF_dead7pos.x > GLF_dead7dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead7pos.y, 256)] - 15) {
                                float GLF_dead7p = (15.0 - abs(float(donor_replacementGLF_dead7pos.x - GLF_dead7dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead7pos.y, 256)]))) / 15.0;
                                ;
                            }
                        }
                        while (k >= 0) {
                            o = o + o;
                            k--;
                        }
                        for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
                            m = _GLF_outlined_15(injectionSwitch, o);
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                {
                                    GLF_dead10_GLF_color = vec4(vec3(0.0), 1.0);
                                }
                            }
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = vec4(98.00, 4.3, 8.2, 6.8);
                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= log(1.0))))) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                        }
                        if (_GLF_DEAD(false)) {
                            vec3 donor_replacementGLF_dead11color = _GLF_FUZZED(step(vec3(9.9, -78.65, 5174.3313), (ldexp(vec3(-7.7, -641.411, -399.937), ivec3(3489, 40940, 50320)) / m)));
                            {
                                donor_replacementGLF_dead11color.y += float(GLF_dead11obj.numbers[2]);
                            }
                        }
                    }
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        if (_GLF_DEAD(false)) {
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < _GLF_ZERO(0.0, injectionSwitch.x))))) {
                                _GLF_color = _GLF_outlined_16(m);
                            }
                            for (int GLF_dead2i = int(GLF_dead2injectionSwitch.x); GLF_dead2i < 10; GLF_dead2i++) {
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = (vec4(-58.99, 9016.5164, -6.0, 8.0) - 5083.5643);
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        _GLF_color = _GLF_outlined_17(_GLF_outVarBackup_GLF_color);
                                    }
                                }
                                GLF_dead2obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead2i, 10)] = (10 - GLF_dead2i) * int(GLF_dead2injectionSwitch.y);
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = radians(vec4(7774.5003, 635.761, 394.393, -8915.8123));
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                            }
                        }
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = vec4(2.2, 2.4, -7774.2556, 2740.0529);
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                        if (_GLF_DEAD(false)) {
                            _GLF_color = (vec4(2310.2177, -31.36, 9223.3118, 2021.8321));
                        }
                        if (_GLF_DEAD(false)) {
                            ivec2 donor_replacementGLF_dead7pos = _GLF_FUZZED(ivec2(-45530, 64950));
                            if (donor_replacementGLF_dead7pos.x < GLF_dead7dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead7pos.y, 256)] + 15 && donor_replacementGLF_dead7pos.x > GLF_dead7dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead7pos.y, 256)] - 15) {
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                    vec3 donor_replacementGLF_dead11color = _GLF_FUZZED((exp(vec3(-110.512, -84.75, 530.358)) + vec3(-660.779, 563.192, -65.45)));
                                    {
                                        donor_replacementGLF_dead11color.x += float(GLF_dead11obj.numbers[9]);
                                    }
                                }
                                float GLF_dead7p = (15.0 - abs(float(donor_replacementGLF_dead7pos.x - GLF_dead7dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead7pos.y, 256)]))) / 15.0;
                                ;
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                    int donor_replacementGLF_dead10cols = _GLF_FUZZED(j);
                                    uint donor_replacementGLF_dead10matrix_number = _GLF_FUZZED(184018u);
                                    for (int GLF_dead10c = 0; GLF_dead10c < donor_replacementGLF_dead10cols; GLF_dead10c++) {
                                        for (int GLF_dead10r = 0; GLF_dead10r < j; GLF_dead10r++) {
                                            switch (donor_replacementGLF_dead10matrix_number) {
                                                case 0u:
                                                    GLF_dead10m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10r, 2)] = GLF_dead10one;
                                                    break;
                                                case 1u:
                                                    GLF_dead10m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10r, 3)] = GLF_dead10one;
                                                    break;
                                                case 2u:
                                                    GLF_dead10m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10r, 4)] = GLF_dead10one;
                                                    break;
                                                case 3u:
                                                    GLF_dead10m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10r, 2)] = GLF_dead10one;
                                                    break;
                                                case 4u:
                                                    GLF_dead10m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10r, 3)] = GLF_dead10one;
                                                    break;
                                                case 5u:
                                                    GLF_dead10m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10r, 4)] = GLF_dead10one;
                                                    break;
                                                case 6u:
                                                    GLF_dead10m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10r, 2)] = GLF_dead10one;
                                                    break;
                                                case 7u:
                                                    GLF_dead10m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10r, 3)] = GLF_dead10one;
                                                    break;
                                                case 8u:
                                                    GLF_dead10m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10r, 4)] = GLF_dead10one;
                                                    break;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        if (_GLF_DEAD(false)) {
                            int donor_replacementGLF_dead8v = _GLF_FUZZED((i - 55282));
                            {
                                donor_replacementGLF_dead8v = (4 * donor_replacementGLF_dead8v * (1000 - donor_replacementGLF_dead8v)) / 1000;
                            }
                        }
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = ((-9.2) + (vec4(8931.8891, -8933.0897, 9.5, 4.4) / 3.9));
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            if (_GLF_WRAPPED_IF_FALSE(_GLF_IDENTITY(false, bool(bvec3(false, true, true))))) {
                            } else {
                                if (_GLF_DEAD(false)) {
                                    if (_GLF_DEAD(false)) {
                                        int donor_replacementGLF_dead11j = _GLF_FUZZED(_injected_loop_counter);
                                        int donor_replacementGLF_dead11pivot = _GLF_FUZZED(93623);
                                        if (GLF_dead11obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11j, 10)] <= donor_replacementGLF_dead11pivot) {
                                            i++;
                                            GLF_dead11swap(i, donor_replacementGLF_dead11j);
                                        }
                                    }
                                    _GLF_color = vec3(-9.6, 9.0, 2382.0248).yyyy;
                                }
                            }
                            if (_GLF_DEAD(false)) {
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                    _GLF_color = _GLF_color;
                                }
                                vec3 donor_replacementGLF_dead3color = _GLF_FUZZED(m);
                                {
                                    donor_replacementGLF_dead3color.y += float(GLF_dead3obj.numbers[2]);
                                }
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                continue;
                            }
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                }
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = _GLF_outlined_18();
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
            }
        }
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_outlined_19(_GLF_color);
            _GLF_color = vec4(5.5, _GLF_IDENTITY(7.0, max(7.0, 7.0)), 7.5, 1.7);
            if (_GLF_DEAD(false)) {
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    float donor_replacementGLF_dead9s = _GLF_FUZZED(cosh(GLF_dead5s_g));
                    {
                        donor_replacementGLF_dead9s += 0.2;
                    }
                }
                ivec2 donor_replacementGLF_dead7pos = _GLF_FUZZED(((ivec2(54758, 59366) - j) % ivec2(-20891, 94905)));
                if (_GLF_DEAD(false)) {
                    _GLF_color = vec4(m, GLF_dead5time);
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(1311.1024, -96.03, 5.4, -2474.6486);
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                }
                do {
                    float GLF_dead7p = (15.0 - abs(float(donor_replacementGLF_dead7pos.x - GLF_dead7dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead7pos.y, 256)]))) / 15.0;
                    ;
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            int donor_replacementGLF_dead10cols = _GLF_FUZZED(findLSB(j));
                            uint donor_replacementGLF_dead10matrix_number = _GLF_FUZZED(177662u);
                            for (int GLF_dead10c = 0; GLF_dead10c < donor_replacementGLF_dead10cols; GLF_dead10c++) {
                                for (int GLF_dead10r = 0; GLF_dead10r < j; GLF_dead10r++) {
                                    switch (donor_replacementGLF_dead10matrix_number) {
                                        case 0u:
                                            GLF_dead10m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10r, 2)] = GLF_dead10one;
                                            break;
                                        case 1u:
                                            GLF_dead10m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10r, 3)] = GLF_dead10one;
                                            break;
                                        case 2u:
                                            GLF_dead10m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10r, 4)] = GLF_dead10one;
                                            break;
                                        case 3u:
                                            GLF_dead10m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10r, 2)] = GLF_dead10one;
                                            break;
                                        case 4u:
                                            GLF_dead10m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10r, 3)] = GLF_dead10one;
                                            break;
                                        case 5u:
                                            GLF_dead10m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10r, 4)] = GLF_dead10one;
                                            break;
                                        case 6u:
                                            GLF_dead10m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10r, 2)] = GLF_dead10one;
                                            break;
                                        case 7u:
                                            GLF_dead10m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10r, 3)] = GLF_dead10one;
                                            break;
                                        case 8u:
                                            GLF_dead10m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10r, 4)] = GLF_dead10one;
                                            break;
                                    }
                                }
                            }
                        }
                        _GLF_color = mix((mat3x4(72.48, -6.7, 8570.6676, -7098.5048, 9.9, 232.208, 6.7, -706.291, 7.1, 327.379, 90.55, 27.58) * vec3(0.3, 329.474, 3.0)), vec4(18.79, -579.962, 5539.4883, -11.15), mix(min(209.875, -4036.4979), -51.03, ((-40.57) * 2.1)));
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                            _GLF_color = _GLF_outlined_20(_GLF_outVarBackup_GLF_color);
                        }
                    }
                } while (_GLF_WRAPPED_LOOP(false));
            }
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                _GLF_color = _GLF_outlined_21(_GLF_outVarBackup_GLF_color);
            }
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= sqrt(0.0))))) {
                    if (_GLF_DEAD(false)) {
                        int donor_replacementGLF_dead8v = _GLF_FUZZED(72496);
                        {
                            donor_replacementGLF_dead8v = (4 * donor_replacementGLF_dead8v * (1000 - donor_replacementGLF_dead8v)) / 1000;
                        }
                    }
                    _GLF_color = _GLF_outlined_22();
                } else {
                }
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = smoothstep(vec3(9.1, 894.779, -9.1).pssp, vec4(-14.50, -993.916, 5.1, -439.307), vec4(-6.0, 8.4, 6.2, 1.4));
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                        if (_GLF_DEAD(false)) {
                            {
                                m.x += float(GLF_dead11obj.numbers[1]);
                            }
                        }
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= sin(0.0))))) {
                    for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
                        _GLF_color = _GLF_outlined_23(_GLF_outVarBackup_GLF_color);
                    }
                    if (_GLF_DEAD(false)) {
                        int donor_replacementGLF_dead8v = _GLF_FUZZED(j);
                        {
                            donor_replacementGLF_dead8v = (4 * donor_replacementGLF_dead8v * (1000 - donor_replacementGLF_dead8v)) / 1000;
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        ivec2 donor_replacementGLF_dead7pos = _GLF_FUZZED(ivec2(-5548, -94875));
                        {
                            if (donor_replacementGLF_dead7pos.x < GLF_dead7dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead7pos.y, 256)] + 15 && donor_replacementGLF_dead7pos.x > GLF_dead7dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead7pos.y, 256)] - 15) {
                                float GLF_dead7p = (15.0 - abs(float(donor_replacementGLF_dead7pos.x - GLF_dead7dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead7pos.y, 256)]))) / 15.0;
                                ;
                            }
                            donor_replacementGLF_dead7pos.y++;
                        }
                    }
                }
            }
        }
    }
    return vec2(m.x, m.y - m.z);
}

vec4 _GLF_outlined_0(vec3 col) {
    return vec4(col, 1.0);
}

vec4 _GLF_outlined_1(vec4 _GLF_color) {
    return _GLF_color;
}

vec4 _GLF_outlined_24(vec4 _GLF_color) {
    return _GLF_color;
}

vec4 _GLF_outlined_25() {
    return (mat4(9.8, 3.1, -835.070, 44.84, -233.918, -11.95, 3.5, -200.514, 5346.8584, -53.92, -589.462, 6.8, 4472.0767, 38.15, 8.4, 151.017) * mat4(148.584, -46.29, -1650.9717, -9.6, 511.201, -384.873, 3.0, -7.9, -372.438, 6311.5039, -30.61, -51.30, 4193.1520, -4053.8352, -55.54, -73.71))[1];
}

vec4 _GLF_outlined_26() {
    return fwidthFine(vec4(9325.1044, 6928.8498, 5.2, -4217.7977));
}

vec4 _GLF_outlined_27(vec4 _GLF_color, float GLF_dead5b_b) {
    return (_GLF_color / GLF_dead5b_b);
}

vec4 _GLF_outlined_28(vec4 _GLF_outVarBackup_GLF_color) {
    return _GLF_outVarBackup_GLF_color;
}

vec4 _GLF_outlined_29() {
    return vec3(-3.3, -909.077, -1.8).yyyy;
}

vec4 _GLF_outlined_30() {
    return vec4(-2.0, -9728.1430, 9356.1396, 251.883);
}

vec4 _GLF_outlined_31(vec4 _GLF_color) {
    return dFdyCoarse(mix(_GLF_color, _GLF_color, _GLF_color));
}

vec4 _GLF_outlined_32(vec4 _GLF_outVarBackup_GLF_color) {
    return _GLF_outVarBackup_GLF_color;
}

vec4 _GLF_outlined_33(vec4 _GLF_outVarBackup_GLF_color) {
    return _GLF_outVarBackup_GLF_color;
}

vec4 _GLF_outlined_34(vec4 _GLF_color) {
    return _GLF_color;
}

vec4 _GLF_outlined_35(vec4 _GLF_color) {
    return refract(_GLF_color, vec4(-496.655, -83.26, -6.9, -2788.2786), inversesqrt(determinant(mat2(3.8, -9.2, -4180.2740, -6427.6926))));
}

vec4 _GLF_outlined_36(vec4 _GLF_color) {
    return _GLF_color;
}

vec4 _GLF_outlined_37(vec4 _GLF_color) {
    return _GLF_color;
}

vec4 _GLF_outlined_38(vec4 GLF_merged2_0_2_1_2_2_2cuv) {
    return GLF_merged2_0_2_1_2_2_2cuv;
}

vec4 _GLF_outlined_39(vec4 _GLF_color) {
    return _GLF_color;
}

vec4 _GLF_outlined_40() {
    return uintBitsToFloat(uvec4(156781u, 40742u, 131565u, 124077u));
}

vec4 _GLF_outlined_41(vec4 _GLF_outVarBackup_GLF_color) {
    return _GLF_outVarBackup_GLF_color;
}

vec4 _GLF_outlined_42(vec4 _GLF_outVarBackup_GLF_color) {
    return _GLF_outVarBackup_GLF_color;
}

int _GLF_outlined_43() {
    return 0;
}

vec4 _GLF_outlined_44(vec4 _GLF_outVarBackup_GLF_color) {
    return _GLF_outVarBackup_GLF_color;
}

vec4 _GLF_outlined_45(vec4 GLF_merged2_0_2_1_2_2_2cuv) {
    return dFdxFine(GLF_merged2_0_2_1_2_2_2cuv);
}

vec4 _GLF_outlined_46(vec4 _GLF_outVarBackup_GLF_color) {
    return _GLF_outVarBackup_GLF_color;
}

int _GLF_outlined_47(int donor_replacementGLF_dead8v) {
    return (4 * donor_replacementGLF_dead8v * (1000 - donor_replacementGLF_dead8v)) / 1000;
}

vec4 _GLF_outlined_48(vec4 _GLF_color) {
    return _GLF_color;
}

vec4 _GLF_outlined_49(vec4 _GLF_color) {
    return _GLF_color;
}

vec4 _GLF_outlined_50() {
    return vec4(-7.9, -6.5, -918.194, -2.6);
}

vec4 _GLF_outlined_51(vec4 GLF_merged2_0_2_1_2_2_2cuv) {
    return GLF_merged2_0_2_1_2_2_2cuv;
}

int _GLF_outlined_52(int donor_replacementGLF_dead8v) {
    return (4 * donor_replacementGLF_dead8v * (1000 - donor_replacementGLF_dead8v)) / 1000;
}

float _GLF_outlined_53() {
    return 1.0;
}

vec4 _GLF_outlined_54() {
    return vec4(-2123.5586, -0.0, 638.532, 403.005);
}

vec4 _GLF_outlined_55(vec4 _GLF_color) {
    return _GLF_color;
}

vec4 _GLF_outlined_56(vec4 _GLF_color) {
    return _GLF_color;
}

vec4 _GLF_outlined_57(vec4 _GLF_color) {
    return _GLF_color;
}

vec4 _GLF_outlined_58(vec4 _GLF_outVarBackup_GLF_color) {
    return _GLF_outVarBackup_GLF_color;
}

vec4 _GLF_outlined_59(vec4 _GLF_color) {
    return _GLF_color;
}

vec4 _GLF_outlined_60(vec4 _GLF_color) {
    return _GLF_color;
}

vec4 _GLF_outlined_61(vec4 _GLF_outVarBackup_GLF_color) {
    return _GLF_outVarBackup_GLF_color;
}

vec4 _GLF_outlined_62() {
    return reflect(vec4(7.5, 7270.1735, -1403.4045, -4911.3393), vec4(2718.0328, -8.6, -4.8, -6.6));
}

vec4 _GLF_outlined_63(vec4 _GLF_color) {
    return _GLF_color;
}

vec4 _GLF_outlined_64(vec4 _GLF_outVarBackup_GLF_color) {
    return _GLF_outVarBackup_GLF_color;
}

vec4 _GLF_outlined_65() {
    return vec4(-9682.6627, -28.48, 847.860, 822.737);
}

vec4 _GLF_outlined_66(vec4 _GLF_outVarBackup_GLF_color) {
    return _GLF_outVarBackup_GLF_color;
}

vec4 _GLF_outlined_67(vec4 _GLF_color) {
    return _GLF_color;
}

int _GLF_outlined_68(int donor_replacementGLF_dead8v) {
    return (4 * donor_replacementGLF_dead8v * (1000 - donor_replacementGLF_dead8v)) / 1000;
}

vec4 _GLF_outlined_69(vec4 _GLF_outVarBackup_GLF_color) {
    return acos(_GLF_outVarBackup_GLF_color);
}

vec4 _GLF_outlined_70(vec4 _GLF_color) {
    return _GLF_color;
}

vec4 _GLF_outlined_71(vec4 _GLF_color) {
    return _GLF_color;
}

vec4 _GLF_outlined_72() {
    return vec4(-68.34, -99.80, 65.21, -3276.6152);
}

vec4 _GLF_outlined_73(vec4 _GLF_color) {
    return _GLF_color;
}

vec4 _GLF_outlined_74(vec4 _GLF_outVarBackup_GLF_color) {
    return _GLF_outVarBackup_GLF_color;
}

void main() {
    {
        vec4 _GLF_outVarBackup_GLF_color;
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_outlined_24(_GLF_color);
            _GLF_color = vec4(5.2, 1.4, -0.1, -2.2);
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                if (_GLF_DEAD(false)) {
                    vec3 donor_replacementGLF_dead11color = _GLF_FUZZED(vec3(6.2, 46.26, -5382.5166));
                    {
                        donor_replacementGLF_dead11color.x += float(GLF_dead11obj.numbers[1]);
                    }
                }
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            int donor_replacementGLF_dead9i = _GLF_FUZZED(58113);
            float donor_replacementGLF_dead9limit = _GLF_FUZZED((GLF_dead5time));
            float donor_replacementGLF_dead9s = _GLF_FUZZED(GLF_dead5time);
            if (float(donor_replacementGLF_dead9i) >= donor_replacementGLF_dead9limit) {
                ;
            }
        }
        do {
            _GLF_outVarBackup_GLF_color = _GLF_color;
        } while (_GLF_WRAPPED_LOOP(false));
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = exp2(vec4(69.94, 7306.5371, 1.3, 6714.3495));
            if (_GLF_DEAD(false)) {
                int donor_replacementGLF_dead8i = _GLF_FUZZED((-(-60334)));
                int donor_replacementGLF_dead8iters = _GLF_FUZZED(((-68846) * 15830));
                int donor_replacementGLF_dead8v = _GLF_FUZZED((50386));
                for (donor_replacementGLF_dead8i = 0; donor_replacementGLF_dead8i < donor_replacementGLF_dead8iters; donor_replacementGLF_dead8i++) {
                    donor_replacementGLF_dead8v = (4 * donor_replacementGLF_dead8v * (1000 - donor_replacementGLF_dead8v)) / 1000;
                }
            }
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
        if (_GLF_DEAD(false)) {
            int donor_replacementGLF_dead9i = _GLF_FUZZED(ivec4(-23398, -84589, -68197, -62001)[3]);
            float donor_replacementGLF_dead9ref = _GLF_FUZZED(GLF_dead5b_b);
            float donor_replacementGLF_dead9s = _GLF_FUZZED(faceforward(-66.90, GLF_dead5h_r, -198.229));
            if (mod(float(donor_replacementGLF_dead9i), donor_replacementGLF_dead9ref) <= 0.01) {
                donor_replacementGLF_dead9s += 0.2;
            }
        }
        _GLF_color = vec4(991.825, 4.7, 1.6, 0.6);
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = _GLF_outlined_25();
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
            int donor_replacementGLF_dead4iteration = _GLF_FUZZED(((-16308) / 12374));
            int donor_replacementGLF_dead4iterationCap = _GLF_FUZZED((-(-19305)));
            float donor_replacementGLF_dead4xCoord = _GLF_FUZZED(69.37);
            float donor_replacementGLF_dead4yCoord = _GLF_FUZZED(2.3);
            if (_GLF_DEAD(false)) {
                _GLF_color = _GLF_color;
            }
            if (donor_replacementGLF_dead4iteration < bitfieldInsert(donor_replacementGLF_dead4iterationCap, 0, 0, 0)) {
                ;
            } else {
                ;
            }
        }
        for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = atanh(vec4(-7.4, 2.8, -1705.5138, 49.92));
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
    }
    {
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        _GLF_color = exp2(vec4(-88.96, 575.807, 7538.8658, -6.5));
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
        int donor_replacementGLF_dead9i = _GLF_FUZZED(min(findMSB(-22221), -74776));
        float donor_replacementGLF_dead9s = _GLF_FUZZED(GLF_dead5b_b);
        if (float(donor_replacementGLF_dead9i) >= GLF_dead5b_b) {
            ;
        }
    }
    if (_GLF_DEAD(false)) {
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < abs(0.0))))) {
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                vec2 donor_replacementGLF_dead5center = _GLF_FUZZED(injectionSwitch);
                int donor_replacementGLF_dead5i = _GLF_FUZZED(((-56543) / 21469));
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = _GLF_outlined_26();
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                vec2 donor_replacementGLF_dead5position = _GLF_FUZZED(injectionSwitch);
                vec3 donor_replacementGLF_dead5result = _GLF_FUZZED(vec3(659.609, -667.207, 63.63));
                {
                    vec3 GLF_dead5d = _GLF_FUZZED(vec3(-51.09, 5405.7271, -6.0));
                    GLF_dead5d = GLF_dead5drawShape(donor_replacementGLF_dead5position, donor_replacementGLF_dead5center + vec2(sin(float(donor_replacementGLF_dead5i) / 10.0 + GLF_dead5time) / 4.0, 0.0), vec3(0.01 + sin(float(donor_replacementGLF_dead5i) / 100.0), 0.01, float(donor_replacementGLF_dead5i)));
                    if (length(GLF_dead5d) <= 0.0) {
                        ;
                    }
                    donor_replacementGLF_dead5result = vec3(GLF_dead5d);
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        _GLF_color = _GLF_outlined_27(_GLF_color, GLF_dead5b_b);
                    }
                }
            }
            return;
        }
        do {
            _GLF_color = (true ? vec4(4.9, 5636.5759, 0.5, -19.41) : vec4(-7.5, -0.8, 991.216, 5533.7833));
        } while (_GLF_WRAPPED_LOOP(false));
    }
    vec4 GLF_merged2_0_2_1_2_2_2cuv;
    vec2 uv = gl_FragCoord.xy / resolution.y;
    {
        vec4 _GLF_outVarBackup_GLF_color;
        if (_GLF_DEAD(false)) {
            ivec2 donor_replacementGLF_dead7pos = _GLF_FUZZED(bitfieldExtract(ivec2(-28197, 10776), (+37759), -58827));
            {
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    if (donor_replacementGLF_dead7pos.x < GLF_dead7dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead7pos.y, 256)] + 15 && donor_replacementGLF_dead7pos.x > GLF_dead7dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead7pos.y, 256)] - 15) {
                        float GLF_dead7p = (15.0 - abs(float(donor_replacementGLF_dead7pos.x - GLF_dead7dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead7pos.y, 256)]))) / 15.0;
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            float donor_replacementGLF_dead9s = _GLF_FUZZED(GLF_dead5b_b);
                            {
                                ;
                            }
                        }
                        ;
                    }
                } else {
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        _GLF_color = vec4(-0.1, 4.4, 2.2, 91.67);
                    }
                }
                donor_replacementGLF_dead7pos.y++;
            }
        }
        _GLF_outVarBackup_GLF_color = _GLF_color;
        _GLF_color = mat3x4(-7541.6186, 2.2, -3.4, -9857.7124, -5.1, -7.4, -471.276, 83.50, -5.7, 4.1, 829.293, 2.8)[1];
        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
    }
    GLF_merged2_0_2_1_2_2_2cuv.zw = uv;
    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
        if (_GLF_DEAD(false)) {
            vec3 donor_replacementGLF_dead5setting = _GLF_FUZZED(ceil(vec3(8.4, 1.2, -4014.7371)));
            if (_GLF_DEAD(false)) {
                _GLF_color = vec4(9397.4598, 2.1, -239.453, -422.375);
            }
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = (70.81 * vec4(-32.76, 93.28, -6930.4099, 5.6).abbg);
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            {
                ;
            }
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(6236.6542, 9.8, 1.5, 3.2);
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= tan(0.0))))) {
                    if (_GLF_DEAD(false)) {
                        int donor_replacementGLF_dead8i = _GLF_FUZZED(-85746);
                        int donor_replacementGLF_dead8iters = _GLF_FUZZED(mix(-50161, 96720, greaterThanEqual(ivec2(23876, 84276), ivec2(45085, -44651)).g));
                        int donor_replacementGLF_dead8v = _GLF_FUZZED(findLSB((~(112668u + 2728u))));
                        for (donor_replacementGLF_dead8i = 0; donor_replacementGLF_dead8i < donor_replacementGLF_dead8iters; donor_replacementGLF_dead8i++) {
                            donor_replacementGLF_dead8v = (4 * donor_replacementGLF_dead8v * (1000 - donor_replacementGLF_dead8v)) / 1000;
                        }
                    }
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    {
                        GLF_dead10_GLF_color = vec4(vec3(0.0), 1.0);
                    }
                }
            }
        }
    } else {
    }
    float A[50];
    if (_GLF_DEAD(false)) {
        int donor_replacementGLF_dead8i = _GLF_FUZZED(-91810);
        int donor_replacementGLF_dead8iters = _GLF_FUZZED(findMSB(14250));
        int donor_replacementGLF_dead8v = _GLF_FUZZED(-22214);
        for (donor_replacementGLF_dead8i = 0; donor_replacementGLF_dead8i < donor_replacementGLF_dead8iters; donor_replacementGLF_dead8i++) {
            donor_replacementGLF_dead8v = (4 * donor_replacementGLF_dead8v * (1000 - donor_replacementGLF_dead8v)) / 1000;
        }
    }
    if (_GLF_DEAD(false)) {
        ivec2 donor_replacementGLF_dead7pos = _GLF_FUZZED(ivec2(10183, 77143));
        while (donor_replacementGLF_dead7pos.y != 256) {
            if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
            } else {
                if (donor_replacementGLF_dead7pos.x < GLF_dead7dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead7pos.y, 256)] + 15 && donor_replacementGLF_dead7pos.x > GLF_dead7dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead7pos.y, 256)] - 15) {
                    float GLF_dead7p = (15.0 - abs(float(donor_replacementGLF_dead7pos.x - GLF_dead7dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead7pos.y, 256)]))) / 15.0;
                    ;
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        int donor_replacementGLF_dead8i = _GLF_FUZZED(81303);
                        int donor_replacementGLF_dead8iters = _GLF_FUZZED((true ? (-13734) : (61570 - (-60252))));
                        int donor_replacementGLF_dead8v = _GLF_FUZZED(clamp(-9147, 59596, -19879));
                        for (donor_replacementGLF_dead8i = 0; donor_replacementGLF_dead8i < donor_replacementGLF_dead8iters; donor_replacementGLF_dead8i++) {
                            donor_replacementGLF_dead8v = (4 * donor_replacementGLF_dead8v * (1000 - donor_replacementGLF_dead8v)) / 1000;
                        }
                    }
                }
            }
            if (_GLF_DEAD(false)) {
                int donor_replacementGLF_dead8i = _GLF_FUZZED((15298 >> bitfieldExtract(16871, -9569, 59171)));
                int donor_replacementGLF_dead8iters = _GLF_FUZZED(18640);
                int donor_replacementGLF_dead8v = _GLF_FUZZED(int(5.1));
                for (donor_replacementGLF_dead8i = 0; donor_replacementGLF_dead8i < donor_replacementGLF_dead8iters; donor_replacementGLF_dead8i++) {
                    donor_replacementGLF_dead8v = (4 * donor_replacementGLF_dead8v * (1000 - donor_replacementGLF_dead8v)) / 1000;
                }
            }
            donor_replacementGLF_dead7pos.y++;
        }
    }
    if (_GLF_WRAPPED_IF_TRUE(true)) {
        for (int i = 0; i < 200; i++) {
            if (i >= int(resolution.x)) {
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    int donor_replacementGLF_dead8i = _GLF_FUZZED(i);
                    int donor_replacementGLF_dead8iters = _GLF_FUZZED((i % (-8501)));
                    int donor_replacementGLF_dead8v = _GLF_FUZZED(-4139);
                    for (donor_replacementGLF_dead8i = 0; donor_replacementGLF_dead8i < donor_replacementGLF_dead8iters; donor_replacementGLF_dead8i++) {
                        donor_replacementGLF_dead8v = (4 * donor_replacementGLF_dead8v * (1000 - donor_replacementGLF_dead8v)) / 1000;
                    }
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < tan(0.0))))) {
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = log(vec4(vec3(3571.0863, -86.52, 0.2), 86.56));
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outlined_28(_GLF_outVarBackup_GLF_color);
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        int donor_replacementGLF_dead10cols = _GLF_FUZZED(bitfieldReverse(i));
                        uint donor_replacementGLF_dead10matrix_number = _GLF_FUZZED(150833u);
                        for (int GLF_dead10c = 0; GLF_dead10c < donor_replacementGLF_dead10cols; GLF_dead10c++) {
                            for (int GLF_dead10r = 0; GLF_dead10r < i; GLF_dead10r++) {
                                switch (donor_replacementGLF_dead10matrix_number) {
                                    case 0u:
                                        GLF_dead10m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10r, 2)] = GLF_dead10one;
                                        break;
                                    case 1u:
                                        GLF_dead10m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10r, 3)] = GLF_dead10one;
                                        break;
                                    case 2u:
                                        GLF_dead10m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10r, 4)] = GLF_dead10one;
                                        break;
                                    case 3u:
                                        GLF_dead10m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10r, 2)] = GLF_dead10one;
                                        break;
                                    case 4u:
                                        GLF_dead10m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10r, 3)] = GLF_dead10one;
                                        break;
                                    case 5u:
                                        GLF_dead10m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10r, 4)] = GLF_dead10one;
                                        break;
                                    case 6u:
                                        GLF_dead10m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10r, 2)] = GLF_dead10one;
                                        break;
                                    case 7u:
                                        GLF_dead10m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10r, 3)] = GLF_dead10one;
                                        break;
                                    case 8u:
                                        GLF_dead10m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10r, 4)] = GLF_dead10one;
                                        break;
                                }
                            }
                        }
                    }
                    _GLF_color = vec4(-9.9, 33.61, 4.6, -5.5);
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        int donor_replacementGLF_dead9i = _GLF_FUZZED(-1906);
                        float donor_replacementGLF_dead9s = _GLF_FUZZED(GLF_dead5s_g);
                        if (mod(float(donor_replacementGLF_dead9i), GLF_dead5h_r) <= 0.01) {
                            donor_replacementGLF_dead9s += 0.2;
                        }
                    }
                }
                if (_GLF_DEAD(false)) {
                    _GLF_color = _GLF_outlined_29();
                }
                {
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = trunc(vec4(-182.496, -0.3, 0.2, -20.18));
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        {
                            i = (4 * i * (1000 - i)) / 1000;
                        }
                    }
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(-53.68, 4.2, 6.8, -2.4);
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            _GLF_color = _GLF_color;
                        }
                    }
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    if (_GLF_DEAD(false)) {
                        ivec2 donor_replacementGLF_dead7pos = _GLF_FUZZED(ivec2(-38979, 94736));
                        {
                            float GLF_dead7p = (15.0 - abs(float(donor_replacementGLF_dead7pos.x - GLF_dead7dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead7pos.y, 256)]))) / 15.0;
                            ;
                        }
                        {
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                {
                                    i = (4 * i * (1000 - i)) / 1000;
                                }
                            }
                            vec4 _GLF_outVarBackup_GLF_color;
                            if (_GLF_DEAD(false)) {
                                int donor_replacementGLF_dead8v = _GLF_FUZZED(75631);
                                {
                                    donor_replacementGLF_dead8v = (4 * donor_replacementGLF_dead8v * (1000 - donor_replacementGLF_dead8v)) / 1000;
                                }
                            }
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = vec4(65.20, 870.320, 44.99, -6.4);
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                    }
                    int donor_replacementGLF_dead1i = _GLF_FUZZED(i);
                    vec2 donor_replacementGLF_dead1pos = _GLF_FUZZED(injectionSwitch);
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < abs(sqrt(0.0)))))) {
                        vec3 donor_replacementGLF_dead11color = _GLF_FUZZED(vec3(-6.7, -372.555, -3.3));
                        {
                            donor_replacementGLF_dead11color.z += float(GLF_dead11obj.numbers[3]);
                        }
                    }
                    vec4 donor_replacementGLF_dead1res = _GLF_FUZZED(GLF_merged2_0_2_1_2_2_2cuv);
                    {
                        if (_GLF_WRAPPED_IF_FALSE(false)) {
                        } else {
                            vec4 _GLF_outVarBackup_GLF_color;
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = vec4(-13.68, -191.898, -4.9, 4.3);
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = asinh(mix(vec4(9.2, 0.3, 9.5, -793.975), vec4(87.31, 46.89, -1.3, -7344.9544), vec4(8.2, 2.0, -18.56, -19.35)));
                            for (int _injected_loop_counter = (0 >> _GLF_IDENTITY(int(0), _GLF_IDENTITY(int(0), (int(0)) * 1))); _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                    } else {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = vec4(-58.37, 377.943, -3.9, -2.5);
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                    if (_GLF_DEAD(false)) {
                                        vec3 donor_replacementGLF_dead11color = _GLF_FUZZED(vec3(25.09, 618.789, -5.3));
                                        if (donor_replacementGLF_dead1pos.y > (2.0 / 4.0)) {
                                            donor_replacementGLF_dead11color.y += float(GLF_dead11obj.numbers[6]);
                                        }
                                    }
                                }
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                _GLF_color = _GLF_outlined_30();
                            }
                        }
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = max(vec4(8815.5352, -7.7, 6821.7859, 398.442), vec4(-3.0, 76.36, 287.683, -2.4));
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                        if (GLF_dead1collision(donor_replacementGLF_dead1pos, GLF_dead1picdata[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead1i, 8)])) {
                            donor_replacementGLF_dead1res = GLF_dead1pal[_GLF_MAKE_IN_BOUNDS_INT((int(GLF_dead1picdata[_GLF_MAKE_IN_BOUNDS_INT(_GLF_IDENTITY(donor_replacementGLF_dead1i, (donor_replacementGLF_dead1i) << 0), 8)].x) * int(GLF_dead1picdata[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead1i, 8)].y) + donor_replacementGLF_dead1i * 9 + 11) % 16, 16)];
                        }
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        _GLF_color = GLF_merged2_0_2_1_2_2_2cuv;
                    }
                }
                break;
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    break;
                    if (_GLF_DEAD(false)) {
                        _GLF_color = step(floor(GLF_dead5b_b), _GLF_color);
                    }
                }
            }
            if ((4 * (i / 4)) == i) {
                do {
                    if (_GLF_DEAD(false)) {
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < sin(0.0))))) {
                            _GLF_color = vec4(344.856, -91.37, -578.033, 7692.4562);
                        }
                        _GLF_color = _GLF_outlined_31(_GLF_color);
                    }
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(5386.7319, 188.901, -799.942, -7052.4005);
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                vec4 donor_replacementGLF_dead9c = _GLF_FUZZED((((GLF_merged2_0_2_1_2_2_2cuv * GLF_merged2_0_2_1_2_2_2cuv) * GLF_dead5h_r) - (GLF_dead5h_r / GLF_dead5time)));
                                int donor_replacementGLF_dead9i = _GLF_FUZZED(72739);
                                {
                                    donor_replacementGLF_dead9c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9i, 4)] = donor_replacementGLF_dead9c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9i, 4)] * donor_replacementGLF_dead9c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9i, 4)];
                                }
                            }
                            _GLF_color = _GLF_outlined_32(_GLF_outVarBackup_GLF_color);
                        }
                    }
                } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
                A[i / 4] = float(i);
                if (_GLF_DEAD(false)) {
                    continue;
                }
            }
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(vec2(-128.800, -3.0), 52.29, -9.5);
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(-390.535, -5250.7254, 8631.6892, -6147.5212);
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                } else {
                }
            }
        }
    } else {
    }
    for (int i = 0; i < 50; i++) {
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                _GLF_color = atan(_GLF_outVarBackup_GLF_color);
            }
            do {
                _GLF_color = fma(vec4(618.946, -93.44, 9.3, 18.71), vec4(-3958.4011, -9.2, -6.4, 953.086), abs(vec4(-59.27, 6.5, -7.6, -0.8)));
            } while (_GLF_WRAPPED_LOOP(false));
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= determinant(mat2(0.0, 0.0, 0.0, 0.0)))))) {
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    _GLF_color = mix(_GLF_color, vec4(-485.316, 98.14, 1.8, 7.9), bvec4(false, true, true, true));
                }
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(99.23, 7.6, -2.9, 49.23);
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                        _GLF_color = _GLF_outlined_33(_GLF_outVarBackup_GLF_color);
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                float donor_replacementGLF_dead9ref = _GLF_FUZZED(GLF_dead5time);
                                for (int GLF_dead9i = 1; GLF_dead9i < 800; GLF_dead9i++) {
                                    if (mod(float(GLF_dead9i), donor_replacementGLF_dead9ref) <= 0.01) {
                                        GLF_dead5h_r += 0.2;
                                    }
                                    if (float(GLF_dead9i) >= GLF_dead5b_b) {
                                        ;
                                    }
                                }
                            }
                            _GLF_color = sqrt(vec4(-49.58, 3.2, -7520.9281, 6259.2320));
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                            _GLF_color = _GLF_color;
                        }
                    }
                }
                if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < abs(0.0))))) {
                } else {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_ZERO(0.0, injectionSwitch.x))))) {
                    {
                        ;
                    }
                }
            }
        }
        if (i < int(gl_FragCoord.x)) {
            {
                vec4 _GLF_outVarBackup_GLF_color;
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    vec4 donor_replacementGLF_dead9c = _GLF_FUZZED(GLF_merged2_0_2_1_2_2_2cuv);
                    int donor_replacementGLF_dead9i = _GLF_FUZZED(5797);
                    {
                        donor_replacementGLF_dead9c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9i, 4)] = donor_replacementGLF_dead9c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9i, 4)] * donor_replacementGLF_dead9c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9i, 4)];
                    }
                }
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(2276.6051, 19.53, 5.0, -6461.7821);
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            if (_GLF_DEAD(false)) {
                float donor_replacementGLF_dead9s = _GLF_FUZZED(-0.5);
                {
                    ;
                }
            }
            break;
        }
        if (_GLF_DEAD(false)) {
            _GLF_color = GLF_merged2_0_2_1_2_2_2cuv;
        }
        if (_GLF_DEAD(false)) {
            float donor_replacementGLF_dead9limit = _GLF_FUZZED(uv.t);
            float donor_replacementGLF_dead9s = _GLF_FUZZED(smoothstep(dot(GLF_dead2injectionSwitch, resolution), GLF_dead5s_g, GLF_dead5b_b));
            {
                if (mod(float(i), GLF_dead5h_r) <= 0.01) {
                    donor_replacementGLF_dead9s += 0.2;
                }
                if (float(i) >= donor_replacementGLF_dead9limit) {
                    ;
                }
            }
        }
        do {
            if (_GLF_DEAD(false)) {
                _GLF_color = GLF_merged2_0_2_1_2_2_2cuv;
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(-8.2, 7.0, 97.40, 7686.6317);
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                        if (_GLF_DEAD(false)) {
                            int donor_replacementGLF_dead8i = _GLF_FUZZED(91463);
                            int donor_replacementGLF_dead8iters = _GLF_FUZZED(i);
                            int donor_replacementGLF_dead8v = _GLF_FUZZED(i);
                            for (donor_replacementGLF_dead8i = 0; donor_replacementGLF_dead8i < donor_replacementGLF_dead8iters; donor_replacementGLF_dead8i++) {
                                donor_replacementGLF_dead8v = (4 * donor_replacementGLF_dead8v * (1000 - donor_replacementGLF_dead8v)) / 1000;
                            }
                        }
                    }
                }
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                bool donor_replacementGLF_dead5c7 = _GLF_FUZZED(false);
                vec2 donor_replacementGLF_dead5pos = _GLF_FUZZED(atan(uv, GLF_dead2injectionSwitch));
                vec3 donor_replacementGLF_dead5setting = _GLF_FUZZED(vec3(-930.033, 3.7, -2.8));
                if (!donor_replacementGLF_dead5c7) {
                    ;
                }
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < log(1.0))))) {
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < tan(0.0))))) {
                    _GLF_color = fract(_GLF_color);
                }
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(18.46, -1954.7559, 4654.6126, 396.007);
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                vec3 donor_replacementGLF_dead2color = _GLF_FUZZED(vec3(514.136, -512.893, -55.24));
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_outlined_34(_GLF_color);
                    _GLF_color = vec4(1.0, 6.4, 739.830, 225.335);
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                {
                    donor_replacementGLF_dead2color -= GLF_dead2palette(vec3(float(GLF_dead2obj.numbers[4]) * 0.1), trunc(vec3(0.1)), vec3(float(GLF_dead2obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_dead2injectionSwitch.y), 10)]) * 0.1), vec3(GLF_dead2injectionSwitch.x, float(GLF_dead2obj.numbers[2]) * 0.1, float(GLF_dead2obj.numbers[8]) * 0.1));
                    i++;
                    if (_GLF_DEAD(false)) {
                        continue;
                        if (_GLF_DEAD(false)) {
                            uint donor_replacementGLF_dead10matrix_number = _GLF_FUZZED(12064u);
                            int donor_replacementGLF_dead10r = _GLF_FUZZED(42948);
                            {
                                switch (donor_replacementGLF_dead10matrix_number) {
                                    case 0u:
                                        GLF_dead10m22[_GLF_MAKE_IN_BOUNDS_INT(i, 2)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead10r, 2)] = GLF_dead10one;
                                        break;
                                    case 1u:
                                        GLF_dead10m23[_GLF_MAKE_IN_BOUNDS_INT(i, 2)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead10r, 3)] = GLF_dead10one;
                                        break;
                                    case 2u:
                                        GLF_dead10m24[_GLF_MAKE_IN_BOUNDS_INT(i, 2)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead10r, 4)] = GLF_dead10one;
                                        break;
                                    case 3u:
                                        GLF_dead10m32[_GLF_MAKE_IN_BOUNDS_INT(i, 3)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead10r, 2)] = GLF_dead10one;
                                        break;
                                    case 4u:
                                        GLF_dead10m33[_GLF_MAKE_IN_BOUNDS_INT(i, 3)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead10r, 3)] = GLF_dead10one;
                                        break;
                                    case 5u:
                                        GLF_dead10m34[_GLF_MAKE_IN_BOUNDS_INT(i, 3)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead10r, 4)] = GLF_dead10one;
                                        break;
                                    case 6u:
                                        GLF_dead10m42[_GLF_MAKE_IN_BOUNDS_INT(i, 4)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead10r, 2)] = GLF_dead10one;
                                        break;
                                    case 7u:
                                        GLF_dead10m43[_GLF_MAKE_IN_BOUNDS_INT(i, 4)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead10r, 3)] = GLF_dead10one;
                                        break;
                                    case 8u:
                                        GLF_dead10m44[_GLF_MAKE_IN_BOUNDS_INT(i, 4)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead10r, 4)] = GLF_dead10one;
                                        break;
                                }
                            }
                        }
                    }
                }
            }
            if (i > 0) {
                A[i] += A[i - 1];
            }
            if (_GLF_WRAPPED_IF_FALSE(false)) {
            } else {
                if (_GLF_DEAD(false)) {
                    if (_GLF_DEAD(false)) {
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = vec4(2.5, -4.1, -5227.4079, 25.21);
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            int donor_replacementGLF_dead8v = _GLF_FUZZED(13878);
                            {
                                donor_replacementGLF_dead8v = (4 * donor_replacementGLF_dead8v * (1000 - donor_replacementGLF_dead8v)) / 1000;
                            }
                        }
                        ivec2 donor_replacementGLF_dead7pos = _GLF_FUZZED(((22879u / uvec4(149370u, 971u, 133598u, 58698u)), ivec2(-20457, 62611)));
                        {
                            if (donor_replacementGLF_dead7pos.x < GLF_dead7dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead7pos.y, 256)] + 15 && donor_replacementGLF_dead7pos.x > GLF_dead7dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead7pos.y, 256)] - 15) {
                                float GLF_dead7p = (15.0 - abs(float(donor_replacementGLF_dead7pos.x - GLF_dead7dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead7pos.y, 256)]))) / 15.0;
                                ;
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = _GLF_color;
                                }
                            }
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = (mat2x4(35.92, 918.377, 7.4, -4.1, 789.419, -5617.3577, 6.3, -66.08) * dFdxCoarse(vec2(-348.662, -84.28)));
                                if (_GLF_DEAD(false)) {
                                    int donor_replacementGLF_dead8v = _GLF_FUZZED(i);
                                    {
                                        donor_replacementGLF_dead8v = (4 * donor_replacementGLF_dead8v * (1000 - donor_replacementGLF_dead8v)) / 1000;
                                    }
                                }
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                            donor_replacementGLF_dead7pos.y++;
                        }
                    }
                    _GLF_color = _GLF_color;
                    if (_GLF_DEAD(false)) {
                        {
                            i = (4 * i * (1000 - i)) / 1000;
                        }
                    }
                }
            }
        } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))));
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            break;
        }
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
        {
            ;
        }
    }
    if (_GLF_DEAD(false)) {
        _GLF_color = vec4(-8112.2645, 58.45, -2.8, 3477.1620);
    }
    if (_GLF_WRAPPED_IF_TRUE(true)) {
        vec4 _GLF_outVarBackup_GLF_color;
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            _GLF_color = _GLF_outlined_35(_GLF_color);
        }
        _GLF_outVarBackup_GLF_color = _GLF_outlined_1(_GLF_color);
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            _GLF_color = atanh(vec4(-8.7, 9.1, 8101.6788, -3.4));
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_outlined_36(_GLF_color);
                if (_GLF_DEAD(false)) {
                    int donor_replacementGLF_dead10cols = _GLF_FUZZED(int(GLF_dead5h_r));
                    uint donor_replacementGLF_dead10matrix_number = _GLF_FUZZED(uvec4(161269u, 84328u, 83335u, 93555u)[0]);
                    int donor_replacementGLF_dead10rows = _GLF_FUZZED(findLSB(48484));
                    for (int GLF_dead10c = 0; GLF_dead10c < donor_replacementGLF_dead10cols; GLF_dead10c++) {
                        for (int GLF_dead10r = 0; GLF_dead10r < donor_replacementGLF_dead10rows; GLF_dead10r++) {
                            switch (donor_replacementGLF_dead10matrix_number) {
                                case 0u:
                                    GLF_dead10m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10r, 2)] = GLF_dead10one;
                                    break;
                                case 1u:
                                    GLF_dead10m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10r, 3)] = GLF_dead10one;
                                    break;
                                case 2u:
                                    GLF_dead10m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10r, 4)] = GLF_dead10one;
                                    break;
                                case 3u:
                                    GLF_dead10m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10r, 2)] = GLF_dead10one;
                                    break;
                                case 4u:
                                    GLF_dead10m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10r, 3)] = GLF_dead10one;
                                    break;
                                case 5u:
                                    GLF_dead10m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10r, 4)] = GLF_dead10one;
                                    break;
                                case 6u:
                                    GLF_dead10m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10r, 2)] = GLF_dead10one;
                                    break;
                                case 7u:
                                    GLF_dead10m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10r, 3)] = GLF_dead10one;
                                    break;
                                case 8u:
                                    GLF_dead10m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10r, 4)] = GLF_dead10one;
                                    break;
                            }
                        }
                    }
                }
                _GLF_color = vec4(6.2, -23.58, 286.689, 920.462);
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
                if (_GLF_DEAD(false)) {
                    int donor_replacementGLF_dead8v = _GLF_FUZZED(11753);
                    {
                        donor_replacementGLF_dead8v = (4 * donor_replacementGLF_dead8v * (1000 - donor_replacementGLF_dead8v)) / 1000;
                    }
                }
            }
        } else {
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(5894.9914, -5.3, 6.7, -15.38);
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
        }
        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
            if (_GLF_DEAD(false)) {
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(0.7, -4.5, 257.036, 773.660);
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            vec3 donor_replacementGLF_dead11color = _GLF_FUZZED(vec3(814.090, 1.4, 3.9));
                            vec2 donor_replacementGLF_dead11uv = _GLF_FUZZED(unpackHalf2x16(167335u));
                            if (donor_replacementGLF_dead11uv.y > (3.0 / 4.0)) {
                                donor_replacementGLF_dead11color.z += float(GLF_dead11obj.numbers[7]);
                            }
                        }
                    }
                }
                ivec2 donor_replacementGLF_dead7pos = _GLF_FUZZED(bitCount(ivec2(31126, 36522)));
                do {
                    while (donor_replacementGLF_dead7pos.y != 256) {
                        if (donor_replacementGLF_dead7pos.x < GLF_dead7dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead7pos.y, 256)] + 15 && donor_replacementGLF_dead7pos.x > GLF_dead7dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead7pos.y, 256)] - 15) {
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                _GLF_color = _GLF_color;
                            }
                            float GLF_dead7p = (15.0 - abs(float(donor_replacementGLF_dead7pos.x - GLF_dead7dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead7pos.y, 256)]))) / 15.0;
                            ;
                            if (_GLF_DEAD(false)) {
                                int donor_replacementGLF_dead8v = _GLF_FUZZED(-93668);
                                {
                                    donor_replacementGLF_dead8v = (4 * donor_replacementGLF_dead8v * (1000 - donor_replacementGLF_dead8v)) / 1000;
                                }
                            }
                        }
                        donor_replacementGLF_dead7pos.y++;
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            _GLF_color = vec4(-9406.4243, 9.9, 6.9, 3671.5196);
                        }
                    }
                } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
                if (_GLF_DEAD(false)) {
                    _GLF_color = vec4(39.60, -421.806, -1.9, 351.883);
                }
            }
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
        {
            if (_GLF_DEAD(false)) {
                int donor_replacementGLF_dead10cols = _GLF_FUZZED(ivec2(-55581, -90963).x);
                uint donor_replacementGLF_dead10matrix_number = _GLF_FUZZED(199347u);
                int donor_replacementGLF_dead10rows = _GLF_FUZZED(((-53838) >> (-44556)));
                for (int GLF_dead10c = 0; GLF_dead10c < donor_replacementGLF_dead10cols; GLF_dead10c++) {
                    for (int GLF_dead10r = 0; GLF_dead10r < donor_replacementGLF_dead10rows; GLF_dead10r++) {
                        switch (donor_replacementGLF_dead10matrix_number) {
                            case 0u:
                                GLF_dead10m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10r, 2)] = GLF_dead10one;
                                break;
                            case 1u:
                                GLF_dead10m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10r, 3)] = GLF_dead10one;
                                break;
                            case 2u:
                                GLF_dead10m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10r, 4)] = GLF_dead10one;
                                break;
                            case 3u:
                                GLF_dead10m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10r, 2)] = GLF_dead10one;
                                break;
                            case 4u:
                                GLF_dead10m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10r, 3)] = GLF_dead10one;
                                break;
                            case 5u:
                                GLF_dead10m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10r, 4)] = GLF_dead10one;
                                break;
                            case 6u:
                                GLF_dead10m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10r, 2)] = GLF_dead10one;
                                break;
                            case 7u:
                                GLF_dead10m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10r, 3)] = GLF_dead10one;
                                break;
                            case 8u:
                                GLF_dead10m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10r, 4)] = GLF_dead10one;
                                break;
                        }
                    }
                }
            }
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_outlined_37(_GLF_color);
            _GLF_color = (560.472 - vec4(808.401, -3.7, -92.95, 3.6));
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
    } else {
        if (_GLF_DEAD(false)) {
            vec4 donor_replacementGLF_dead9c = _GLF_FUZZED(_GLF_color);
            int donor_replacementGLF_dead9i = _GLF_FUZZED(-93082);
            {
                donor_replacementGLF_dead9c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9i, 4)] = donor_replacementGLF_dead9c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9i, 4)] * donor_replacementGLF_dead9c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9i, 4)];
            }
        }
    }
    vec2 c = pattern((_GLF_IDENTITY(15.0, min(_GLF_IDENTITY(15.0, float(vec2(15.0, 0.0))), 15.0)) + tan(0.2)) * GLF_merged2_0_2_1_2_2_2cuv.zw);
    GLF_merged2_0_2_1_2_2_2cuv.xy = c;
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < _GLF_IDENTITY(dot(vec3(exp(0.0), 0.0, 0.0), vec3(0.0, 1.0, 1.0)), dot(vec3(exp(0.0), 0.0, 0.0), vec3(0.0, 1.0, 1.0))))))) {
        if (_GLF_DEAD(_GLF_IDENTITY(false, !(!(_GLF_IDENTITY(false, (false) || false)))))) {
            vec4 donor_replacementGLF_dead9c = _GLF_FUZZED(sin(GLF_merged2_0_2_1_2_2_2cuv));
            int donor_replacementGLF_dead9i = _GLF_FUZZED((true ? (-40555) : 34470));
            {
                if (donor_replacementGLF_dead9c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9i, 4)] >= 1.0) {
                    donor_replacementGLF_dead9c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9i, 4)] = donor_replacementGLF_dead9c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9i, 4)] * donor_replacementGLF_dead9c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9i, 4)];
                }
            }
        }
        _GLF_color = _GLF_outlined_38(GLF_merged2_0_2_1_2_2_2cuv);
    }
    if (_GLF_DEAD(_GLF_IDENTITY(false, true && (false)))) {
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = cos(vec4(3320.0476, 14.71, 3.2, 95.57));
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
        return;
        if (_GLF_DEAD(false)) {
            int donor_replacementGLF_dead10cols = _GLF_FUZZED(max(43068, -11860));
            uint donor_replacementGLF_dead10matrix_number = _GLF_FUZZED(113887u);
            int donor_replacementGLF_dead10rows = _GLF_FUZZED(bitfieldReverse(50478));
            for (int GLF_dead10c = 0; GLF_dead10c < donor_replacementGLF_dead10cols; GLF_dead10c++) {
                for (int GLF_dead10r = 0; GLF_dead10r < donor_replacementGLF_dead10rows; GLF_dead10r++) {
                    switch (donor_replacementGLF_dead10matrix_number) {
                        case 0u:
                            GLF_dead10m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10r, 2)] = GLF_dead10one;
                            break;
                        case 1u:
                            GLF_dead10m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10r, 3)] = GLF_dead10one;
                            break;
                        case 2u:
                            GLF_dead10m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10r, 4)] = GLF_dead10one;
                            break;
                        case 3u:
                            GLF_dead10m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10r, 2)] = GLF_dead10one;
                            break;
                        case 4u:
                            GLF_dead10m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10r, 3)] = GLF_dead10one;
                            break;
                        case 5u:
                            GLF_dead10m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10r, 4)] = GLF_dead10one;
                            break;
                        case 6u:
                            GLF_dead10m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10r, 2)] = GLF_dead10one;
                            break;
                        case 7u:
                            GLF_dead10m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10r, 3)] = GLF_dead10one;
                            break;
                        case 8u:
                            GLF_dead10m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10r, 4)] = GLF_dead10one;
                            break;
                    }
                }
            }
        }
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
        for (int GLF_dead11i = 0; GLF_dead11i < 10; GLF_dead11i++) {
            GLF_dead11obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11i, 10)] = (10 - GLF_dead11i);
            GLF_dead11obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11i, 10)] = GLF_dead11obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11i, 10)] * GLF_dead11obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead11i, 10)];
        }
    }
    vec3 col;
    if (int(gl_FragCoord.y) < 20) {
        _GLF_IDENTITY(col = .5 + cos(_GLF_IDENTITY(GLF_merged2_0_2_1_2_2_2cuv, (false ? _GLF_FUZZED(fwidth(GLF_merged2_0_2_1_2_2_2cuv)) : GLF_merged2_0_2_1_2_2_2cuv)).xy.y + vec3(resolution.x, A[4] / resolution.x + 50.0, 22.0)), (col = .5 + cos(_GLF_IDENTITY(GLF_merged2_0_2_1_2_2_2cuv, (false ? _GLF_FUZZED(fwidth(GLF_merged2_0_2_1_2_2_2cuv)) : GLF_merged2_0_2_1_2_2_2cuv)).xy.y + vec3(resolution.x, A[4] / resolution.x + 50.0, 22.0))) / vec3(1.0, 1.0, 1.0));
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
            vec3 donor_replacementGLF_dead3color = _GLF_FUZZED(vec3(678.046, 81.43, 3.1));
            vec2 donor_replacementGLF_dead3uv = _GLF_FUZZED(vec2(-0.9, -36.14));
            for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != int(_GLF_ONE(1.0, injectionSwitch.y))); _injected_loop_counter++) {
                if (donor_replacementGLF_dead3uv.x > (2.0 / 4.0)) {
                    donor_replacementGLF_dead3color.y += float(GLF_dead3obj.numbers[2]);
                }
            }
        }
    } else if (_GLF_IDENTITY(int(gl_FragCoord.y) < 40, !(!(int(gl_FragCoord.y) < 40)))) {
        col = .5 + cos(GLF_merged2_0_2_1_2_2_2cuv.xy.y + vec3(resolution.x, _GLF_IDENTITY(A[9], 0.0 + (_GLF_IDENTITY(A[9], min(A[9], A[9])))) / resolution.x + 50.0, 22.0));
    } else if (int(gl_FragCoord.y) < 60) {
        col = .5 + cos(GLF_merged2_0_2_1_2_2_2cuv.xy.y + vec3(resolution.x, A[14] / resolution.x + 50.0, 22.0));
        if (_GLF_DEAD(false)) {
            int donor_replacementGLF_dead9i = _GLF_FUZZED((15970 - 90135));
            float donor_replacementGLF_dead9ref = _GLF_FUZZED((dot(1160.5863, -5.8) - GLF_dead5time));
            float donor_replacementGLF_dead9s = _GLF_FUZZED(GLF_dead5s_g);
            if (mod(float(donor_replacementGLF_dead9i), donor_replacementGLF_dead9ref) <= 0.01) {
                donor_replacementGLF_dead9s += 0.2;
            }
        }
        if (_GLF_DEAD(false)) {
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < tan(0.0))))) {
                int donor_replacementGLF_dead8i = _GLF_FUZZED(int(false));
                int donor_replacementGLF_dead8iters = _GLF_FUZZED(649);
                int donor_replacementGLF_dead8v = _GLF_FUZZED(-34188);
                for (donor_replacementGLF_dead8i = 0; donor_replacementGLF_dead8i < donor_replacementGLF_dead8iters; donor_replacementGLF_dead8i++) {
                    donor_replacementGLF_dead8v = (4 * donor_replacementGLF_dead8v * (1000 - donor_replacementGLF_dead8v)) / 1000;
                }
            }
            _GLF_color = _GLF_outlined_39(_GLF_color);
        }
    } else if (int(gl_FragCoord.y) < 80) {
        for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != _GLF_IDENTITY(1, int(ivec4(1, 0, 0, 1)))); _injected_loop_counter++) {
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = step(exp2(vec4(22.02, 7.6, -134.587, -47.20)), cos(vec4(33.19, 1033.6670, -6.0, -76.15)));
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        int donor_replacementGLF_dead8i = _GLF_FUZZED((-56388));
                        int donor_replacementGLF_dead8iters = _GLF_FUZZED(_injected_loop_counter);
                        for (donor_replacementGLF_dead8i = 0; donor_replacementGLF_dead8i < donor_replacementGLF_dead8iters; donor_replacementGLF_dead8i++) {
                            _injected_loop_counter = (4 * _injected_loop_counter * (1000 - _injected_loop_counter)) / 1000;
                        }
                    }
                }
                vec2 donor_replacementGLF_dead5pos = _GLF_FUZZED(tanh((_GLF_color * mat2x4(-65.30, 850.802, -520.873, -78.25, 9.6, 508.488, 78.08, -96.75))));
                vec3 donor_replacementGLF_dead5setting = _GLF_FUZZED(vec3(0.1, 3503.2015, 675.763));
                {
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        _GLF_color = dFdxFine(atanh(_GLF_color));
                    }
                    ;
                }
            }
        }
        {
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < sqrt(0.0))))) {
                _GLF_color = fwidthFine((_GLF_color - GLF_dead5time));
            }
            vec4 _GLF_outVarBackup_GLF_color;
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                _GLF_outVarBackup_GLF_color = _GLF_color;
            } else {
            }
            _GLF_color = _GLF_outlined_40();
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(99.51, 4.0, 1.8, -8078.1129);
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        int donor_replacementGLF_dead8v = _GLF_FUZZED(clamp(-16675, -61876, 9446));
                        {
                            donor_replacementGLF_dead8v = (4 * donor_replacementGLF_dead8v * (1000 - donor_replacementGLF_dead8v)) / 1000;
                        }
                    }
                    _GLF_color = _GLF_outlined_41(_GLF_outVarBackup_GLF_color);
                }
            }
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                if (_GLF_DEAD(false)) {
                    int donor_replacementGLF_dead8v = _GLF_FUZZED((+((-75889) & (-84412))));
                    {
                        donor_replacementGLF_dead8v = (4 * donor_replacementGLF_dead8v * (1000 - donor_replacementGLF_dead8v)) / 1000;
                    }
                }
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
        col = .5 + cos(GLF_merged2_0_2_1_2_2_2cuv.xy.y + vec3(resolution.x, A[39] / resolution.x + 50.0, 22.0));
        {
            if (_GLF_DEAD(false)) {
                _GLF_color = _GLF_color;
            }
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = (55486u, vec4(-5399.9937, vec3(4365.7778, -3390.9420, 6.5)));
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                _GLF_color = _GLF_outlined_42(_GLF_outVarBackup_GLF_color);
            }
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            int donor_replacementGLF_dead8i = _GLF_FUZZED(bitfieldReverse(-65303));
            int donor_replacementGLF_dead8iters = _GLF_FUZZED((int(7239.1901) + (-37885)));
            int donor_replacementGLF_dead8v = _GLF_FUZZED(-41121);
            for (donor_replacementGLF_dead8i = _GLF_outlined_43(); donor_replacementGLF_dead8i < donor_replacementGLF_dead8iters; donor_replacementGLF_dead8i++) {
                donor_replacementGLF_dead8v = (4 * donor_replacementGLF_dead8v * (1000 - donor_replacementGLF_dead8v)) / 1000;
            }
        }
        if (_GLF_DEAD(false)) {
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                return;
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(-3.4, -62.53, -7095.2386, -9484.9661);
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                        _GLF_color = _GLF_outlined_44(_GLF_outVarBackup_GLF_color);
                    }
                }
            }
            _GLF_color = _GLF_outlined_45(GLF_merged2_0_2_1_2_2_2cuv);
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                ivec2 donor_replacementGLF_dead7pos = _GLF_FUZZED(ivec2(-66785, -16011));
                if (_GLF_DEAD(false)) {
                    vec3 donor_replacementGLF_dead11color = _GLF_FUZZED(col);
                    vec2 donor_replacementGLF_dead11uv = _GLF_FUZZED(unpackSnorm2x16(87486u));
                    if (donor_replacementGLF_dead11uv.y > (2.0 / 4.0)) {
                        donor_replacementGLF_dead11color.y += float(GLF_dead11obj.numbers[6]);
                    }
                }
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(68.16, 0.5, 2.6, -26.29);
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        if (_GLF_DEAD(false)) {
                            int donor_replacementGLF_dead8i = _GLF_FUZZED(-91708);
                            int donor_replacementGLF_dead8iters = _GLF_FUZZED(-12939);
                            int donor_replacementGLF_dead8v = _GLF_FUZZED(((-65402) << ivec4(137, 38731, 58635, -19562)[3]));
                            for (donor_replacementGLF_dead8i = 0; donor_replacementGLF_dead8i < donor_replacementGLF_dead8iters; donor_replacementGLF_dead8i++) {
                                donor_replacementGLF_dead8v = (4 * donor_replacementGLF_dead8v * (1000 - donor_replacementGLF_dead8v)) / 1000;
                            }
                        }
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            int donor_replacementGLF_dead8i = _GLF_FUZZED(sign(((-45146) & (-49524))));
                            int donor_replacementGLF_dead8iters = _GLF_FUZZED(((-15775) % 11683));
                            int donor_replacementGLF_dead8v = _GLF_FUZZED(ivec3(82480, 54894, -13861)[1]);
                            for (donor_replacementGLF_dead8i = 0; donor_replacementGLF_dead8i < donor_replacementGLF_dead8iters; donor_replacementGLF_dead8i++) {
                                donor_replacementGLF_dead8v = (4 * donor_replacementGLF_dead8v * (1000 - donor_replacementGLF_dead8v)) / 1000;
                            }
                        }
                    }
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    int donor_replacementGLF_dead11i = _GLF_FUZZED((uvec2(76151u, 77990u), 28007));
                    int donor_replacementGLF_dead11j = _GLF_FUZZED(46991);
                    int donor_replacementGLF_dead11pivot = _GLF_FUZZED(((-13158) ^ 80347));
                    {
                        if (GLF_dead11obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11j, 10)] <= donor_replacementGLF_dead11pivot) {
                            donor_replacementGLF_dead11i++;
                            GLF_dead11swap(donor_replacementGLF_dead11i, donor_replacementGLF_dead11j);
                        }
                    }
                }
                if (donor_replacementGLF_dead7pos.x < GLF_dead7dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead7pos.y, 256)] + 15 && donor_replacementGLF_dead7pos.x > GLF_dead7dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead7pos.y, 256)] - 15) {
                    float GLF_dead7p = (15.0 - abs(float(donor_replacementGLF_dead7pos.x - GLF_dead7dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead7pos.y, 256)]))) / 15.0;
                    ;
                }
            }
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(-8.0, 268.188, -2529.2029, -2.2);
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    if (_GLF_DEAD(false)) {
                        int donor_replacementGLF_dead8v = _GLF_FUZZED(mix(-44315, 84994, false));
                        {
                            donor_replacementGLF_dead8v = (4 * donor_replacementGLF_dead8v * (1000 - donor_replacementGLF_dead8v)) / 1000;
                        }
                    }
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
                if (_GLF_DEAD(false)) {
                    {
                        col.x += float(GLF_dead11obj.numbers[5]);
                    }
                }
            }
        }
        if (_GLF_DEAD(false)) {
            _GLF_color = vec4(591.598, -47.97, 2.5, -2.9);
        }
        if (_GLF_DEAD(false)) {
            int donor_replacementGLF_dead10c = _GLF_FUZZED(mix(ivec4(68564, 67164, -56130, -92503)[2], 58957, true));
            uint donor_replacementGLF_dead10matrix_number = _GLF_FUZZED(40402u);
            int donor_replacementGLF_dead10rows = _GLF_FUZZED(bitCount(ivec2(-8855, 95487)[0]));
            for (int GLF_dead10r = 0; GLF_dead10r < donor_replacementGLF_dead10rows; GLF_dead10r++) {
                switch (donor_replacementGLF_dead10matrix_number) {
                    case 0u:
                        GLF_dead10m22[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead10c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10r, 2)] = GLF_dead10one;
                        break;
                    case 1u:
                        GLF_dead10m23[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead10c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10r, 3)] = GLF_dead10one;
                        break;
                    case 2u:
                        GLF_dead10m24[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead10c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10r, 4)] = GLF_dead10one;
                        break;
                    case 3u:
                        GLF_dead10m32[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead10c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10r, 2)] = GLF_dead10one;
                        break;
                    case 4u:
                        GLF_dead10m33[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead10c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10r, 3)] = GLF_dead10one;
                        break;
                    case 5u:
                        GLF_dead10m34[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead10c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10r, 4)] = GLF_dead10one;
                        break;
                    case 6u:
                        GLF_dead10m42[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead10c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10r, 2)] = GLF_dead10one;
                        break;
                    case 7u:
                        GLF_dead10m43[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead10c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10r, 3)] = GLF_dead10one;
                        break;
                    case 8u:
                        GLF_dead10m44[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead10c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10r, 4)] = GLF_dead10one;
                        break;
                }
            }
        }
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = exp(vec4(72.22, -1.5, -76.11, 335.117));
            if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            } else {
                if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(true, !(_GLF_IDENTITY(!(true), bool(bool(!(true)))))))) {
                    _GLF_color = _GLF_outlined_46(_GLF_outVarBackup_GLF_color);
                }
            }
            if (_GLF_DEAD(false)) {
                return;
            }
            if (_GLF_DEAD(false)) {
                ivec2 donor_replacementGLF_dead7pos = _GLF_FUZZED(ivec2(43499, 4968));
                if (donor_replacementGLF_dead7pos.x < GLF_dead7dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead7pos.y, 256)] + 15 && donor_replacementGLF_dead7pos.x > GLF_dead7dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead7pos.y, 256)] - 15) {
                    if (_GLF_DEAD(false)) {
                        int donor_replacementGLF_dead9i = _GLF_FUZZED(sign(ivec3(99254, -77272, -41185)[2]));
                        {
                            _GLF_outVarBackup_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9i, 4)] = _GLF_outVarBackup_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9i, 4)] * _GLF_outVarBackup_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9i, 4)];
                        }
                    }
                    float GLF_dead7p = (15.0 - abs(float(donor_replacementGLF_dead7pos.x - GLF_dead7dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead7pos.y, 256)]))) / 15.0;
                    ;
                    if (_GLF_DEAD(false)) {
                        int donor_replacementGLF_dead8v = _GLF_FUZZED(bitCount(76380));
                        {
                            donor_replacementGLF_dead8v = _GLF_outlined_47(donor_replacementGLF_dead8v);
                        }
                    }
                }
            }
        }
    } else {
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = vec4(vec2(1050.7479, 7.8), -236.345, intBitsToFloat((~63669)));
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < _GLF_IDENTITY(injectionSwitch.y, (injectionSwitch.y) + 0.0))))) {
                if (_GLF_DEAD(false)) {
                    int donor_replacementGLF_dead9i = _GLF_FUZZED(-2981);
                    float donor_replacementGLF_dead9ref = _GLF_FUZZED(faceforward(506.326, GLF_dead5s_g, pow(GLF_dead5b_b, GLF_dead5b_b)));
                    {
                        if (mod(float(donor_replacementGLF_dead9i), donor_replacementGLF_dead9ref) <= 0.01) {
                            GLF_dead5b_b += 0.2;
                        }
                        if (float(donor_replacementGLF_dead9i) >= GLF_dead5b_b) {
                            ;
                        }
                    }
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        if (_GLF_DEAD(false)) {
                            ivec2 donor_replacementGLF_dead7pos = _GLF_FUZZED(ivec3(-36245, -10062, -3427).pt);
                            if (donor_replacementGLF_dead7pos.x < GLF_dead7dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead7pos.y, 256)] + 15 && donor_replacementGLF_dead7pos.x > GLF_dead7dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead7pos.y, 256)] - 15) {
                                float GLF_dead7p = (15.0 - abs(float(donor_replacementGLF_dead7pos.x - GLF_dead7dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead7pos.y, 256)]))) / 15.0;
                                ;
                            }
                        }
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            _GLF_color = vec4(936.230, 594.068, 3008.6173, 82.88);
                        }
                        _GLF_color = vec4(-60.64, 26.77, -8.1, 91.82);
                        do {
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_outlined_48(_GLF_color);
                                if (_GLF_DEAD(false)) {
                                    vec4 donor_replacementGLF_dead9c = _GLF_FUZZED(_GLF_outVarBackup_GLF_color);
                                    for (int GLF_dead9i = 0; GLF_dead9i < 3; GLF_dead9i++) {
                                        if (donor_replacementGLF_dead9c[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead9i, 4)] >= 1.0) {
                                            donor_replacementGLF_dead9c[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead9i, 4)] = donor_replacementGLF_dead9c[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead9i, 4)] * donor_replacementGLF_dead9c[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead9i, 4)];
                                        }
                                    }
                                }
                                _GLF_color = vec4(-58.99, -8649.6231, -5.1, 2.9);
                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                if (_GLF_DEAD(false)) {
                                    vec2 donor_replacementGLF_dead11uv = _GLF_FUZZED((false ? GLF_dead2injectionSwitch : injectionSwitch));
                                    if (abs(donor_replacementGLF_dead11uv.x - donor_replacementGLF_dead11uv.y) < 0.25) {
                                        col.x += float(GLF_dead11obj.numbers[9]);
                                    }
                                }
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        } while (_GLF_WRAPPED_LOOP(false));
                    }
                    do {
                        _GLF_color = _GLF_outlined_49(_GLF_color);
                    } while (_GLF_WRAPPED_LOOP(false));
                }
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
        if (int(gl_FragCoord.y) < 100) {
            if (_GLF_DEAD(false)) {
                vec3 donor_replacementGLF_dead11color = _GLF_FUZZED(vec3(-3.1, -371.042, -907.244));
                if (c.y > (2.0 / 4.0)) {
                    donor_replacementGLF_dead11color.y += float(GLF_dead11obj.numbers[6]);
                }
            }
            if (_GLF_DEAD(false)) {
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(-349.988, -651.263, 2.1, -2.3);
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        float donor_replacementGLF_dead9limit = _GLF_FUZZED(smoothstep(GLF_dead5s_g, GLF_dead5b_b, 5.9));
                        float donor_replacementGLF_dead9ref = _GLF_FUZZED(GLF_dead5s_g);
                        float donor_replacementGLF_dead9s = _GLF_FUZZED(GLF_dead5h_r);
                        for (int GLF_dead9i = 1; GLF_dead9i < 800; GLF_dead9i++) {
                            if (mod(float(GLF_dead9i), donor_replacementGLF_dead9ref) <= 0.01) {
                                donor_replacementGLF_dead9s += 0.2;
                            }
                            if (float(GLF_dead9i) >= donor_replacementGLF_dead9limit) {
                                ;
                            }
                        }
                    }
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                return;
            }
            if (_GLF_WRAPPED_IF_FALSE(false)) {
                if (_GLF_DEAD(false)) {
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        vec4 donor_replacementGLF_dead9c = _GLF_FUZZED(pow(_GLF_color, _GLF_color));
                        int donor_replacementGLF_dead9i = _GLF_FUZZED(65554);
                        {
                            if (donor_replacementGLF_dead9c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9i, 4)] >= 1.0) {
                                donor_replacementGLF_dead9c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9i, 4)] = donor_replacementGLF_dead9c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9i, 4)] * donor_replacementGLF_dead9c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9i, 4)];
                            }
                        }
                    }
                    return;
                }
            } else {
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(2327.2244, -9521.7267, 3.5, 627.503);
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                if (_GLF_DEAD(false)) {
                    _GLF_color = intBitsToFloat(ivec4(27433, 19005, -49350, 56305));
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        if (_GLF_DEAD(false)) {
                            if (length(col) <= 0.0) {
                                ;
                            }
                        }
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        do {
                            _GLF_color = _GLF_outlined_50();
                        } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = (vec4(5758.4046, 6.7, -245.216, 7.1));
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= _GLF_ZERO(0.0, injectionSwitch.x))))) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                int donor_replacementGLF_dead11i = _GLF_FUZZED(761);
                                int donor_replacementGLF_dead11j = _GLF_FUZZED(int(GLF_dead5time));
                                int donor_replacementGLF_dead11pivot = _GLF_FUZZED(87750);
                                {
                                    if (GLF_dead11obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11j, 10)] <= donor_replacementGLF_dead11pivot) {
                                        donor_replacementGLF_dead11i++;
                                        GLF_dead11swap(donor_replacementGLF_dead11i, donor_replacementGLF_dead11j);
                                    }
                                }
                            }
                            if (_GLF_DEAD(false)) {
                                return;
                                {
                                    if (_GLF_DEAD(false)) {
                                        int donor_replacementGLF_dead8v = _GLF_FUZZED(-58676);
                                        {
                                            donor_replacementGLF_dead8v = (4 * donor_replacementGLF_dead8v * (1000 - donor_replacementGLF_dead8v)) / 1000;
                                        }
                                    }
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                        int donor_replacementGLF_dead8v = _GLF_FUZZED(clamp(65536, 54440, (ivec3(-31339, 22125, 40292)[0] / (-72370))));
                                        {
                                            donor_replacementGLF_dead8v = (4 * donor_replacementGLF_dead8v * (1000 - donor_replacementGLF_dead8v)) / 1000;
                                        }
                                    }
                                    _GLF_color = vec4(-0.7, -4.4, 3.3, 7.9);
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                    vec4 donor_replacementGLF_dead9c = _GLF_FUZZED(_GLF_outVarBackup_GLF_color);
                                    int donor_replacementGLF_dead9i = _GLF_FUZZED(34530);
                                    {
                                        donor_replacementGLF_dead9c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9i, 4)] = donor_replacementGLF_dead9c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9i, 4)] * donor_replacementGLF_dead9c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9i, 4)];
                                    }
                                }
                            }
                            if (_GLF_WRAPPED_IF_FALSE(false)) {
                            } else {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            int donor_replacementGLF_dead11i = _GLF_FUZZED(32456);
                            int donor_replacementGLF_dead11j = _GLF_FUZZED((98441 >> (-4360)));
                            int donor_replacementGLF_dead11pivot = _GLF_FUZZED(-3354);
                            if (GLF_dead11obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11j, 10)] <= donor_replacementGLF_dead11pivot) {
                                donor_replacementGLF_dead11i++;
                                GLF_dead11swap(donor_replacementGLF_dead11i, donor_replacementGLF_dead11j);
                            }
                        }
                        ivec2 donor_replacementGLF_dead7pos = _GLF_FUZZED(ivec2(52427, 93827));
                        {
                            if (donor_replacementGLF_dead7pos.x < GLF_dead7dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead7pos.y, 256)] + 15 && donor_replacementGLF_dead7pos.x > GLF_dead7dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead7pos.y, 256)] - 15) {
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = vec4(3.8, 5.4, -9.7, -0.7);
                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                                float GLF_dead7p = (15.0 - abs(float(donor_replacementGLF_dead7pos.x - GLF_dead7dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead7pos.y, 256)]))) / 15.0;
                                do {
                                    ;
                                } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
                            }
                            donor_replacementGLF_dead7pos.y++;
                        }
                    }
                }
                col = .5 + cos(GLF_merged2_0_2_1_2_2_2cuv.xy.y + vec3(resolution.x, _GLF_IDENTITY(A[39] / resolution.x, min(A[39] / resolution.x, _GLF_IDENTITY(A[39] / resolution.x, max(A[39] / resolution.x, A[39] / resolution.x)))) + 50.0, 22.0));
            }
        } else {
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_IDENTITY(dot(vec2(1.0, 1.0), vec2(0.0, 0.0)), dot(vec2(1.0, 1.0), vec2(0.0, 0.0))))))) {
                for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > _GLF_IDENTITY(0, (0) | 0)); _injected_loop_counter--) {
                    _GLF_color = mix(_GLF_color, GLF_merged2_0_2_1_2_2_2cuv, vec4(-5021.5602, -0.1, 7.5, 6.7));
                }
            }
            if (int(gl_FragCoord.y) < 120) {
                col = .5 + cos(GLF_merged2_0_2_1_2_2_2cuv.xy.y + vec3(resolution.x, A[39] / resolution.x + 50.0, 22.0));
                if (_GLF_DEAD(false)) {
                    vec4 donor_replacementGLF_dead9c = _GLF_FUZZED(GLF_merged2_0_2_1_2_2_2cuv.zxyz);
                    int donor_replacementGLF_dead9i = _GLF_FUZZED(-63837);
                    {
                        if (donor_replacementGLF_dead9c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9i, 4)] >= 1.0) {
                            donor_replacementGLF_dead9c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9i, 4)] = donor_replacementGLF_dead9c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9i, 4)] * donor_replacementGLF_dead9c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9i, 4)];
                        }
                    }
                }
                if (_GLF_DEAD(false)) {
                    return;
                    do {
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            float donor_replacementGLF_dead4x = _GLF_FUZZED(-85.70);
                            float donor_replacementGLF_dead4y = _GLF_FUZZED(tanh(-8919.2537));
                            {
                                if (_GLF_DEAD(false)) {
                                    int donor_replacementGLF_dead8v = _GLF_FUZZED(65378);
                                    {
                                        donor_replacementGLF_dead8v = (4 * donor_replacementGLF_dead8v * (1000 - donor_replacementGLF_dead8v)) / 1000;
                                    }
                                }
                                donor_replacementGLF_dead4x = 1.0;
                                donor_replacementGLF_dead4y = 1.0;
                                if (_GLF_DEAD(false)) {
                                    int donor_replacementGLF_dead9i = _GLF_FUZZED(-41092);
                                    {
                                        if (_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9i, 4)] >= 1.0) {
                                            _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9i, 4)] = _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9i, 4)] * _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9i, 4)];
                                        }
                                    }
                                }
                            }
                            if (_GLF_DEAD(false)) {
                                _GLF_color = _GLF_outlined_51(GLF_merged2_0_2_1_2_2_2cuv);
                            }
                        }
                    } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    int donor_replacementGLF_dead8v = _GLF_FUZZED(((-29447) * (-58963)));
                    {
                        donor_replacementGLF_dead8v = _GLF_outlined_52(donor_replacementGLF_dead8v);
                    }
                }
            } else {
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(-93.60, -0.9, -3239.9484, -910.258);
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        vec4 donor_replacementGLF_dead9c = _GLF_FUZZED(_GLF_color);
                        for (int GLF_dead9i = 0; GLF_dead9i < 3; GLF_dead9i++) {
                            if (donor_replacementGLF_dead9c[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead9i, 4)] >= 1.0) {
                                donor_replacementGLF_dead9c[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead9i, 4)] = donor_replacementGLF_dead9c[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead9i, 4)] * donor_replacementGLF_dead9c[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead9i, 4)];
                            }
                        }
                    }
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                if (int(gl_FragCoord.y) < 140) {
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        if (_GLF_DEAD(false)) {
                            vec3 donor_replacementGLF_dead11color = _GLF_FUZZED((+vec3(254.704, 899.318, 2.1)));
                            {
                                donor_replacementGLF_dead11color.x += float(GLF_dead11obj.numbers[9]);
                            }
                        }
                        col = .5 + cos(GLF_merged2_0_2_1_2_2_2cuv.xy.y + vec3(resolution.x, A[39] / resolution.x + 50.0, 22.0));
                    } else {
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < abs(0.0))))) {
                            uint donor_replacementGLF_dead10matrix_number = _GLF_FUZZED((~61088u));
                            for (int GLF_dead10cols = 2; GLF_dead10cols <= 4; GLF_dead10cols++) {
                                for (int GLF_dead10rows = 2; GLF_dead10rows <= 4; GLF_dead10rows++) {
                                    for (int GLF_dead10c = 0; GLF_dead10c < GLF_dead10cols; GLF_dead10c++) {
                                        for (int GLF_dead10r = 0; GLF_dead10r < GLF_dead10rows; GLF_dead10r++) {
                                            switch (donor_replacementGLF_dead10matrix_number) {
                                                case 0u:
                                                    GLF_dead10m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10r, 2)] = GLF_dead10one;
                                                    break;
                                                case 1u:
                                                    GLF_dead10m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10r, 3)] = GLF_dead10one;
                                                    break;
                                                case 2u:
                                                    GLF_dead10m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10r, 4)] = GLF_dead10one;
                                                    break;
                                                case 3u:
                                                    GLF_dead10m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10r, 2)] = GLF_dead10one;
                                                    break;
                                                case 4u:
                                                    GLF_dead10m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10r, 3)] = GLF_dead10one;
                                                    break;
                                                case 5u:
                                                    GLF_dead10m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10r, 4)] = GLF_dead10one;
                                                    break;
                                                case 6u:
                                                    GLF_dead10m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10r, 2)] = GLF_dead10one;
                                                    break;
                                                case 7u:
                                                    GLF_dead10m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10r, 3)] = GLF_dead10one;
                                                    break;
                                                case 8u:
                                                    GLF_dead10m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10r, 4)] = GLF_dead10one;
                                                    break;
                                            }
                                        }
                                    }
                                    donor_replacementGLF_dead10matrix_number = donor_replacementGLF_dead10matrix_number + 1u;
                                }
                            }
                        }
                    }
                    {
                        if (_GLF_DEAD(false)) {
                            int donor_replacementGLF_dead8i = _GLF_FUZZED(25170);
                            int donor_replacementGLF_dead8iters = _GLF_FUZZED(mix(-16583, -55906, false));
                            int donor_replacementGLF_dead8v = _GLF_FUZZED(-66504);
                            for (donor_replacementGLF_dead8i = 0; donor_replacementGLF_dead8i < donor_replacementGLF_dead8iters; donor_replacementGLF_dead8i++) {
                                donor_replacementGLF_dead8v = (4 * donor_replacementGLF_dead8v * (1000 - donor_replacementGLF_dead8v)) / 1000;
                            }
                        }
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(vec2(-6.5, 0.6), -40.49, trunc(-5.7));
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                if (_GLF_DEAD(false)) {
                                    float donor_replacementGLF_dead4x = _GLF_FUZZED(determinant(mat3(59.75, -794.121, 441.170, -2.1, 36.66, 62.91, 700.182, 215.193, 6.5)));
                                    float donor_replacementGLF_dead4y = _GLF_FUZZED(70.38);
                                    {
                                        donor_replacementGLF_dead4x = 1.0;
                                        donor_replacementGLF_dead4y = _GLF_outlined_53();
                                    }
                                }
                                _GLF_color = vec4(-1034.4005, 3066.8044, -7.4, 1604.7835);
                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                            if (_GLF_DEAD(false)) {
                                bool donor_replacementGLF_dead5c7 = _GLF_FUZZED(false);
                                {
                                    if (_GLF_DEAD(false)) {
                                        vec4 donor_replacementGLF_dead9c = _GLF_FUZZED(ldexp(faceforward(vec4(8639.6648, 28.47, -76.86, 0.6), GLF_merged2_0_2_1_2_2_2cuv, vec4(3.0, -9853.7613, 71.11, 0.9)), ivec4(-85277, 62556, -95719, -63279)));
                                        for (int GLF_dead9i = 0; GLF_dead9i < 3; GLF_dead9i++) {
                                            if (donor_replacementGLF_dead9c[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead9i, 4)] >= 1.0) {
                                                donor_replacementGLF_dead9c[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead9i, 4)] = donor_replacementGLF_dead9c[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead9i, 4)] * donor_replacementGLF_dead9c[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead9i, 4)];
                                            }
                                        }
                                    }
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = vec4(-1.0, 87.87, 1865.0761, -421.092);
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                                vec2 donor_replacementGLF_dead5pos = _GLF_FUZZED(ceil(c));
                                vec3 donor_replacementGLF_dead5setting = _GLF_FUZZED(vec3(-7.1, 752.837, -2.1));
                                if (!donor_replacementGLF_dead5c7) {
                                    ;
                                }
                            }
                            if (_GLF_DEAD(false)) {
                                if (_GLF_DEAD(false)) {
                                    vec4 donor_replacementGLF_dead9c = _GLF_FUZZED(_GLF_color);
                                    int donor_replacementGLF_dead9i = _GLF_FUZZED((false ? (-37365) : (-55450)));
                                    if (donor_replacementGLF_dead9c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9i, 4)] >= 1.0) {
                                        donor_replacementGLF_dead9c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9i, 4)] = donor_replacementGLF_dead9c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9i, 4)] * donor_replacementGLF_dead9c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9i, 4)];
                                    }
                                }
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = max(vec4(-5.1, -7.9, 28.96, -98.19), vec4(-273.035, 60.85, 9989.1841, 522.374));
                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        return;
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        int donor_replacementGLF_dead8v = _GLF_FUZZED(min(-87052, ((-50103, -97409) - (-53202))));
                        {
                            donor_replacementGLF_dead8v = (4 * donor_replacementGLF_dead8v * (1000 - donor_replacementGLF_dead8v)) / 1000;
                        }
                    }
                } else if (int(gl_FragCoord.y) < 160) {
                    col = .5 + cos(GLF_merged2_0_2_1_2_2_2cuv.xy.y + vec3(resolution.x, _GLF_IDENTITY(A[39] / resolution.x + 50.0, min(A[39] / resolution.x + 50.0, A[39] / resolution.x + 50.0)), 22.0));
                    if (_GLF_DEAD(false)) {
                        _GLF_color = GLF_merged2_0_2_1_2_2_2cuv;
                        if (_GLF_DEAD(false)) {
                            int donor_replacementGLF_dead10cols = _GLF_FUZZED((+89671));
                            uint donor_replacementGLF_dead10matrix_number = _GLF_FUZZED(bitfieldExtract(7048u, -15316, 46742));
                            for (int GLF_dead10rows = 2; GLF_dead10rows <= 4; GLF_dead10rows++) {
                                for (int GLF_dead10c = 0; GLF_dead10c < donor_replacementGLF_dead10cols; GLF_dead10c++) {
                                    for (int GLF_dead10r = 0; GLF_dead10r < GLF_dead10rows; GLF_dead10r++) {
                                        switch (donor_replacementGLF_dead10matrix_number) {
                                            case 0u:
                                                GLF_dead10m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10r, 2)] = GLF_dead10one;
                                                break;
                                            case 1u:
                                                GLF_dead10m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10r, 3)] = GLF_dead10one;
                                                break;
                                            case 2u:
                                                GLF_dead10m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10r, 4)] = GLF_dead10one;
                                                break;
                                            case 3u:
                                                GLF_dead10m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10r, 2)] = GLF_dead10one;
                                                break;
                                            case 4u:
                                                GLF_dead10m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10r, 3)] = GLF_dead10one;
                                                break;
                                            case 5u:
                                                GLF_dead10m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10r, 4)] = GLF_dead10one;
                                                break;
                                            case 6u:
                                                GLF_dead10m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10r, 2)] = GLF_dead10one;
                                                break;
                                            case 7u:
                                                GLF_dead10m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10r, 3)] = GLF_dead10one;
                                                break;
                                            case 8u:
                                                GLF_dead10m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10r, 4)] = GLF_dead10one;
                                                break;
                                        }
                                    }
                                }
                                donor_replacementGLF_dead10matrix_number = donor_replacementGLF_dead10matrix_number + 1u;
                            }
                        }
                    }
                } else {
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        _GLF_color = _GLF_outlined_54();
                    }
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_outlined_55(_GLF_color);
                        _GLF_color = atanh(vec4(-0.0, -9032.4763, 8.3, 7.7));
                        if (_GLF_DEAD(_GLF_IDENTITY(false, bool(_GLF_IDENTITY(bvec2(_GLF_IDENTITY(false, (false) && true), false), bvec2(bvec2(bvec2(_GLF_IDENTITY(false, (false) && true), false)))))))) {
                            vec4 donor_replacementGLF_dead9c = _GLF_FUZZED(_GLF_outVarBackup_GLF_color);
                            int donor_replacementGLF_dead9i = _GLF_FUZZED(ivec2(-98829, -68436).y);
                            {
                                if (donor_replacementGLF_dead9c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9i, 4)] >= 1.0) {
                                    donor_replacementGLF_dead9c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9i, 4)] = donor_replacementGLF_dead9c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9i, 4)] * donor_replacementGLF_dead9c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9i, 4)];
                                }
                            }
                        }
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    if (int(gl_FragCoord.y) < 180) {
                        for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                vec3 donor_replacementGLF_dead2color = _GLF_FUZZED(vec3(2364.0501, 8.0, 6881.4102));
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                    int donor_replacementGLF_dead8v = _GLF_FUZZED(bitCount(uint(reflect(-7700.7687, GLF_dead5h_r))));
                                    {
                                        donor_replacementGLF_dead8v = (4 * donor_replacementGLF_dead8v * (1000 - donor_replacementGLF_dead8v)) / 1000;
                                    }
                                }
                                vec2 donor_replacementGLF_dead2grid = _GLF_FUZZED(resolution);
                                {
                                    int GLF_dead2count = int(GLF_dead2injectionSwitch.x);
                                    do {
                                        donor_replacementGLF_dead2color -= GLF_dead2palette(vec3(float(GLF_dead2obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_dead2injectionSwitch.y), 10)]) * 0.1), vec3(0.8), trunc(vec3(0.1)), vec3(GLF_dead2injectionSwitch.x, 0.6, float(GLF_dead2obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_dead2injectionSwitch.x), 10)]) * 0.1));
                                        GLF_dead2count++;
                                    } while (_GLF_IDENTITY(GLF_dead2count, max(_GLF_IDENTITY(GLF_dead2count, (GLF_dead2count) | 0), GLF_dead2count)) != GLF_dead2obj.numbers[2]);
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        _GLF_color = vec4(1.8, 6562.5619, 1.2, 5602.1975);
                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                        if (_GLF_DEAD(false)) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                    }
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        donor_replacementGLF_dead2grid += vec2(GLF_dead2count + GLF_dead2obj.numbers[3], GLF_dead2count + GLF_dead2obj.numbers[3]);
                                        if (_GLF_DEAD(false)) {
                                            {
                                                GLF_dead2count = (4 * GLF_dead2count * (1000 - GLF_dead2count)) / 1000;
                                            }
                                        }
                                    } else {
                                    }
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = _GLF_outlined_56(_GLF_color);
                                    }
                                }
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = tanh(vec4(800.234, -5.7, -116.402, 6.1).braa);
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                            }
                        }
                        col = .5 + cos(GLF_merged2_0_2_1_2_2_2cuv.xy.y + vec3(resolution.x, A[44] / resolution.x + 50.0, 22.0));
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                            vec2 donor_replacementGLF_dead1pos = _GLF_FUZZED(vec2(825.375, 764.702));
                            vec4 donor_replacementGLF_dead1quad = _GLF_FUZZED((GLF_merged2_0_2_1_2_2_2cuv * mat4(-3926.9780, -897.154, 4.2, -8.6, -205.812, -6590.1711, -40.04, 2.9, -66.50, _GLF_IDENTITY(-_GLF_IDENTITY(6.4, (_GLF_IDENTITY(6.4, clamp(6.4, 6.4, 6.4))) * _GLF_ONE(1.0, injectionSwitch.y)), float(_GLF_IDENTITY(mat4x3(-_GLF_IDENTITY(6.4, (_GLF_IDENTITY(6.4, clamp(6.4, 6.4, 6.4))) * _GLF_ONE(1.0, injectionSwitch.y)), 0.0, 1.0, 0.0, 0.0, _GLF_ZERO(0.0, injectionSwitch.x), 1.0, 0.0, 0.0, 1.0, 0.0, 0.0), mat4x3(0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0) + (mat4x3(-_GLF_IDENTITY(6.4, (_GLF_IDENTITY(6.4, clamp(6.4, 6.4, 6.4))) * _GLF_ONE(1.0, injectionSwitch.y)), 0.0, 1.0, 0.0, 0.0, _GLF_ZERO(0.0, injectionSwitch.x), 1.0, 0.0, 0.0, 1.0, 0.0, 0.0))))), -4402.9580, 6782.3755, -36.73, -9061.8582, 6.5, 8.0)));
                            if (donor_replacementGLF_dead1pos.y > donor_replacementGLF_dead1quad.y + donor_replacementGLF_dead1quad.w) {
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                    float donor_replacementGLF_dead9s = _GLF_FUZZED(length(vec2(9.5, 3.4)));
                                    {
                                        donor_replacementGLF_dead9s += 0.2;
                                    }
                                }
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                    ivec2 donor_replacementGLF_dead7pos = _GLF_FUZZED((ivec2(-40905, -30793) >> ivec2(-20597, 79365)));
                                    if (donor_replacementGLF_dead7pos.x < GLF_dead7dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead7pos.y, 256)] + 15 && donor_replacementGLF_dead7pos.x > GLF_dead7dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead7pos.y, 256)] - 15) {
                                        {
                                            if (_GLF_DEAD(false)) {
                                                int donor_replacementGLF_dead8v = _GLF_FUZZED((21079 >> findMSB(160136u)));
                                                {
                                                    donor_replacementGLF_dead8v = (4 * donor_replacementGLF_dead8v * (1000 - donor_replacementGLF_dead8v)) / 1000;
                                                }
                                            }
                                            vec4 _GLF_outVarBackup_GLF_color;
                                            _GLF_outVarBackup_GLF_color = _GLF_outlined_57(_GLF_color);
                                            _GLF_color = fma(vec4(188.748, 22.64, 3487.1847, 18.29), vec4(5.0, 36.90, -412.041, -69.45), vec4(3.9, -0.7, 3.0, 8053.0281));
                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                                _GLF_color = _GLF_outlined_58(_GLF_outVarBackup_GLF_color);
                                            }
                                        }
                                        float GLF_dead7p = (15.0 - abs(float(donor_replacementGLF_dead7pos.x - GLF_dead7dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead7pos.y, 256)]))) / 15.0;
                                        ;
                                        {
                                            vec4 _GLF_outVarBackup_GLF_color;
                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                            _GLF_color = vec4(vec2(88.25, -464.106), 9.6, -8.7);
                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                            }
                                        }
                                    }
                                }
                                ;
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = (length(_GLF_color) + vec4(390.443, -489.906, -5.9, -8.1));
                                }
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    if (_GLF_DEAD(false)) {
                                        int donor_replacementGLF_dead11i = _GLF_FUZZED(17705);
                                        {
                                            GLF_dead11obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11i, 10)] = (10 - donor_replacementGLF_dead11i);
                                            GLF_dead11obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11i, 10)] = GLF_dead11obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11i, 10)] * GLF_dead11obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11i, 10)];
                                        }
                                    }
                                    _GLF_outVarBackup_GLF_color = _GLF_outlined_59(_GLF_color);
                                    _GLF_color = vec4(553.452, 2.3, 4366.8408, 14.35);
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                            }
                        }
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = vec4(6.6, -8177.4675, -5.9, -8517.4291);
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                {
                                    if (_GLF_DEAD(false)) {
                                        int donor_replacementGLF_dead8v = _GLF_FUZZED(2173);
                                        {
                                            donor_replacementGLF_dead8v = (4 * donor_replacementGLF_dead8v * (1000 - donor_replacementGLF_dead8v)) / 1000;
                                        }
                                    }
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_outlined_60(_GLF_color);
                                    _GLF_color = (vec4(-4900.6059, 27.01, -22.78, 92.51) / (-33.76));
                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                        _GLF_color = _GLF_outlined_61(_GLF_outVarBackup_GLF_color);
                                    }
                                }
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                    } else {
                        if (_GLF_DEAD(false)) {
                            float donor_replacementGLF_dead4x = _GLF_FUZZED(1.2);
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = step(vec4(vec2(93.45, 2.1), vec2(-8.8, 6991.3125)), vec4(-5.7, 4.9, 568.054, 9.2));
                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                            float donor_replacementGLF_dead4y = _GLF_FUZZED(-0.1);
                            if (donor_replacementGLF_dead4x * donor_replacementGLF_dead4x + donor_replacementGLF_dead4y * donor_replacementGLF_dead4y > 4.0) {
                                ;
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = _GLF_outlined_62();
                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                            }
                        }
                        if (int(gl_FragCoord.y) < 200) {
                            {
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                _GLF_color = (316.086 / vec4(-373.097, -1.7, 293.858, 24.87));
                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                            }
                            if (_GLF_DEAD(false)) {
                                int donor_replacementGLF_dead8i = _GLF_FUZZED(25451);
                                int donor_replacementGLF_dead8iters = _GLF_FUZZED(-57267);
                                int donor_replacementGLF_dead8v = _GLF_FUZZED(-15320);
                                for (donor_replacementGLF_dead8i = 0; donor_replacementGLF_dead8i < donor_replacementGLF_dead8iters; donor_replacementGLF_dead8i++) {
                                    donor_replacementGLF_dead8v = (4 * donor_replacementGLF_dead8v * (1000 - donor_replacementGLF_dead8v)) / 1000;
                                }
                            }
                            col = _GLF_IDENTITY(.5, min(_GLF_IDENTITY(.5, min(.5, .5)), .5)) + cos(GLF_merged2_0_2_1_2_2_2cuv.xy.y + vec3(resolution.x, A[49] / resolution.x + 50.0, 22.0));
                            if (_GLF_DEAD(false)) {
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_outlined_63(_GLF_color);
                                    _GLF_color = vec4(-9.2, -1857.1488, 3171.2131, 3.7);
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        if (_GLF_DEAD(false)) {
                                            int donor_replacementGLF_dead9i = _GLF_FUZZED(((~92743) - (-68993)));
                                            float donor_replacementGLF_dead9limit = _GLF_FUZZED(dot(atan(_GLF_color, vec4(-3.4, -39.32, -76.43, 2.1)), _GLF_outVarBackup_GLF_color));
                                            float donor_replacementGLF_dead9s = _GLF_FUZZED(GLF_dead5h_r);
                                            if (float(donor_replacementGLF_dead9i) >= donor_replacementGLF_dead9limit) {
                                                ;
                                            }
                                        }
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                                float donor_replacementGLF_dead4xCoord = _GLF_FUZZED(((-768.317) - 5.4));
                                float donor_replacementGLF_dead4yCoord = _GLF_FUZZED(sign(-3.5));
                                {
                                    ;
                                }
                            }
                        } else {
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < _GLF_IDENTITY(dot(vec3(0.0, 0.0, 0.0), vec3(abs(1.0), 1.0, 1.0)), dot(vec3(0.0, 0.0, 0.0), vec3(abs(1.0), 1.0, 1.0))))))) {
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                    _GLF_color = dFdxFine(dFdyCoarse(vec4(3.5, -7067.9208, 7234.7698, -6033.5623)));
                                }
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = vec4(-17.08, asin(vec3(2.1, 97.08, -5738.4533)));
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                }
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                    _GLF_color = cos(vec4(5292.7114, 316.293, -78.33, 3995.8308));
                                    if (_GLF_DEAD(false)) {
                                        int donor_replacementGLF_dead9i = _GLF_FUZZED(-85868);
                                        float donor_replacementGLF_dead9limit = _GLF_FUZZED(-47.88);
                                        float donor_replacementGLF_dead9ref = _GLF_FUZZED(GLF_dead5h_r);
                                        float donor_replacementGLF_dead9s = _GLF_FUZZED(GLF_dead5h_r);
                                        {
                                            if (mod(float(donor_replacementGLF_dead9i), donor_replacementGLF_dead9ref) <= 0.01) {
                                                donor_replacementGLF_dead9s += 0.2;
                                            }
                                            if (float(donor_replacementGLF_dead9i) >= donor_replacementGLF_dead9limit) {
                                                ;
                                            }
                                        }
                                    }
                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                            int donor_replacementGLF_dead11i = _GLF_FUZZED(93340);
                                            int donor_replacementGLF_dead11j = _GLF_FUZZED(33440);
                                            {
                                                donor_replacementGLF_dead11i++;
                                                GLF_dead11swap(donor_replacementGLF_dead11i, donor_replacementGLF_dead11j);
                                            }
                                        }
                                        _GLF_color = _GLF_outlined_64(_GLF_outVarBackup_GLF_color);
                                    }
                                }
                                {
                                    do {
                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                            _GLF_color = _GLF_color;
                                        }
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < length(vec4(0.0, 0.0, 0.0, 0.0)))))) {
                                            ivec2 donor_replacementGLF_dead7pos = _GLF_FUZZED((97411 % ivec2(42868, -8737).st));
                                            if (donor_replacementGLF_dead7pos.x < GLF_dead7dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead7pos.y, 256)] + 15 && donor_replacementGLF_dead7pos.x > GLF_dead7dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead7pos.y, 256)] - 15) {
                                                float GLF_dead7p = (15.0 - abs(float(donor_replacementGLF_dead7pos.x - GLF_dead7dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead7pos.y, 256)]))) / 15.0;
                                                ;
                                                if (_GLF_DEAD(false)) {
                                                    _GLF_color = _GLF_color;
                                                }
                                            }
                                        }
                                        {
                                            vec4 _GLF_outVarBackup_GLF_color;
                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                            _GLF_color = _GLF_outlined_65();
                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(true, _GLF_TRUE(true, (gl_FragCoord.y >= 0.0)) && (true)))) {
                                                _GLF_color = _GLF_outlined_66(_GLF_outVarBackup_GLF_color);
                                            }
                                            if (_GLF_DEAD(false)) {
                                                vec3 donor_replacementGLF_dead11color = _GLF_FUZZED(degrees((+vec3(7.2, 8.4, -7.0))));
                                                vec2 donor_replacementGLF_dead11uv = _GLF_FUZZED(uv);
                                                if (donor_replacementGLF_dead11uv.y > (2.0 / 4.0)) {
                                                    donor_replacementGLF_dead11color.y += float(GLF_dead11obj.numbers[6]);
                                                }
                                            }
                                        }
                                    } while (_GLF_WRAPPED_LOOP(false));
                                    {
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < _GLF_ZERO(0.0, injectionSwitch.x))))) {
                                            ivec2 donor_replacementGLF_dead7pos = _GLF_FUZZED(bitfieldInsert(ivec2(27637, -60261), ivec2(-19089, -80797), 36361, -29893));
                                            {
                                                if (donor_replacementGLF_dead7pos.x < GLF_dead7dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead7pos.y, 256)] + 15 && donor_replacementGLF_dead7pos.x > GLF_dead7dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead7pos.y, 256)] - 15) {
                                                    float GLF_dead7p = (15.0 - abs(float(donor_replacementGLF_dead7pos.x - GLF_dead7dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead7pos.y, 256)]))) / 15.0;
                                                    ;
                                                }
                                                {
                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                    _GLF_color = vec3(-4583.1521, 5841.1983, 8149.0618).ggbg;
                                                    if (_GLF_DEAD(false)) {
                                                        int donor_replacementGLF_dead8i = _GLF_FUZZED(18374);
                                                        int donor_replacementGLF_dead8iters = _GLF_FUZZED(88642);
                                                        int donor_replacementGLF_dead8v = _GLF_FUZZED(17700);
                                                        for (donor_replacementGLF_dead8i = 0; donor_replacementGLF_dead8i < donor_replacementGLF_dead8iters; donor_replacementGLF_dead8i++) {
                                                            donor_replacementGLF_dead8v = (4 * donor_replacementGLF_dead8v * (1000 - donor_replacementGLF_dead8v)) / 1000;
                                                        }
                                                    }
                                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                    }
                                                }
                                                donor_replacementGLF_dead7pos.y++;
                                            }
                                        }
                                        if (_GLF_DEAD(false)) {
                                            return;
                                        }
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        if (_GLF_DEAD(false)) {
                                            float donor_replacementGLF_dead9s = _GLF_FUZZED(GLF_dead5time);
                                            {
                                                ;
                                            }
                                        }
                                        _GLF_outVarBackup_GLF_color = _GLF_outlined_67(_GLF_color);
                                        _GLF_color = vec4(-3216.1498, -3.7, -116.152, 858.994);
                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                            } else {
                                            }
                                        }
                                    }
                                    ;
                                    if (_GLF_WRAPPED_IF_FALSE(false)) {
                                    } else {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        _GLF_color = dFdy(ldexp(vec4(-2.6, -2.4, -2376.6793, 28.96), ivec4(-65133, 2797, -16515, 42463)));
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                            vec3 donor_replacementGLF_dead11color = _GLF_FUZZED(log2(col));
                                            if (c.x > (3.0 / 4.0)) {
                                                donor_replacementGLF_dead11color.z += float(GLF_dead11obj.numbers[3]);
                                            }
                                        }
                                        if (_GLF_DEAD(false)) {
                                            _GLF_color = cos((c * mat4x2(9.3, 3.5, -50.70, 325.226, -8503.1292, -0.7, 6.5, 5958.0106)));
                                        }
                                        if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                        } else {
                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                        int donor_replacementGLF_dead8v = _GLF_FUZZED((29305 / 66192));
                                                        {
                                                            donor_replacementGLF_dead8v = (4 * donor_replacementGLF_dead8v * (1000 - donor_replacementGLF_dead8v)) / 1000;
                                                        }
                                                    }
                                                } else {
                                                    {
                                                        if (_GLF_DEAD(false)) {
                                                            int donor_replacementGLF_dead8i = _GLF_FUZZED((~95773));
                                                            int donor_replacementGLF_dead8iters = _GLF_FUZZED(90490);
                                                            int donor_replacementGLF_dead8v = _GLF_FUZZED(findLSB(134346u));
                                                            for (donor_replacementGLF_dead8i = 0; donor_replacementGLF_dead8i < donor_replacementGLF_dead8iters; donor_replacementGLF_dead8i++) {
                                                                donor_replacementGLF_dead8v = _GLF_outlined_68(donor_replacementGLF_dead8v);
                                                            }
                                                        }
                                                        vec4 _GLF_outVarBackup_GLF_color;
                                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                                        _GLF_color = vec4(-75.57, -22.53, -3373.7157, -84.77);
                                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= sqrt(0.0))))) {
                                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                                        }
                                                        if (_GLF_DEAD(false)) {
                                                            int donor_replacementGLF_dead8v = _GLF_FUZZED(ivec3(78378, 50129, 51391).r);
                                                            {
                                                                donor_replacementGLF_dead8v = (4 * donor_replacementGLF_dead8v * (1000 - donor_replacementGLF_dead8v)) / 1000;
                                                            }
                                                        }
                                                    }
                                                    if (_GLF_DEAD(false)) {
                                                        ivec2 donor_replacementGLF_dead7pos = _GLF_FUZZED(findMSB(ivec2(65353, 99427)));
                                                        {
                                                            if (_GLF_DEAD(false)) {
                                                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                                    int donor_replacementGLF_dead8v = _GLF_FUZZED(int(6655.7456));
                                                                    {
                                                                        donor_replacementGLF_dead8v = (4 * donor_replacementGLF_dead8v * (1000 - donor_replacementGLF_dead8v)) / 1000;
                                                                    }
                                                                }
                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                            }
                                                            float GLF_dead7p = (15.0 - abs(float(donor_replacementGLF_dead7pos.x - GLF_dead7dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead7pos.y, 256)]))) / 15.0;
                                                            ;
                                                            {
                                                                vec4 _GLF_outVarBackup_GLF_color;
                                                                if (_GLF_DEAD(_GLF_IDENTITY(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)), bool(bvec3(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)), true, false))))) {
                                                                    int donor_replacementGLF_dead8v = _GLF_FUZZED((-(-86879)));
                                                                    {
                                                                        donor_replacementGLF_dead8v = (4 * donor_replacementGLF_dead8v * (1000 - donor_replacementGLF_dead8v)) / 1000;
                                                                    }
                                                                }
                                                                _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                _GLF_color = intBitsToFloat(floatBitsToInt(vec4(-87.46, 7691.4915, -8.6, 2630.6027)));
                                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                            }
                                        }
                                    }
                                }
                                if (_GLF_DEAD(false)) {
                                    vec3 donor_replacementGLF_dead11color = _GLF_FUZZED(step(vec3(2.3, -6.9, -9731.5818), vec3(14.04, 78.96, -1757.7354)));
                                    vec2 donor_replacementGLF_dead11uv = _GLF_FUZZED(GLF_dead2injectionSwitch);
                                    if (donor_replacementGLF_dead11uv.y > (2.0 / 4.0)) {
                                        donor_replacementGLF_dead11color.y += float(GLF_dead11obj.numbers[6]);
                                    }
                                }
                            }
                            discard;
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                _GLF_color = vec4(sinh(GLF_merged2_0_2_1_2_2_2cuv.xy), (7.0 * 9.1), -495.956);
                            }
                        }
                    }
                }
            }
        }
    }
    _GLF_color = _GLF_outlined_0(col);
    {
        vec4 _GLF_outVarBackup_GLF_color;
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = ceil(vec4(3.0, 2732.8161, -3.5, -704.234));
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
        _GLF_outVarBackup_GLF_color = _GLF_color;
        if (_GLF_DEAD(false)) {
            vec3 donor_replacementGLF_dead11color = _GLF_FUZZED((unpackSnorm2x16(3723u) * mat3x2(1.1, -3.0, -3.5, 7968.9030, -678.782, 5.4)));
            {
                donor_replacementGLF_dead11color.y += float(GLF_dead11obj.numbers[6]);
            }
        }
        _GLF_color = vec4(-10.98, -791.423, -5199.8385, -93.36);
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            ivec2 donor_replacementGLF_dead7pos = _GLF_FUZZED(ivec2(37973, 45211));
            while (donor_replacementGLF_dead7pos.y != 256) {
                if (donor_replacementGLF_dead7pos.x < GLF_dead7dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead7pos.y, 256)] + 15 && donor_replacementGLF_dead7pos.x > GLF_dead7dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead7pos.y, 256)] - 15) {
                    float GLF_dead7p = (15.0 - abs(float(donor_replacementGLF_dead7pos.x - GLF_dead7dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead7pos.y, 256)]))) / 15.0;
                    ;
                }
                donor_replacementGLF_dead7pos.y++;
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(6.2, -9.0, 40.63, -20.16);
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                _GLF_color = _GLF_outlined_69(_GLF_outVarBackup_GLF_color);
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(-7670.1745, -837.908, 52.09, -7.1);
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                    if (_GLF_DEAD(false)) {
                        int donor_replacementGLF_dead9i = _GLF_FUZZED(63621);
                        {
                            if (_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9i, 4)] >= 1.0) {
                                _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9i, 4)] = _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9i, 4)] * _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9i, 4)];
                            }
                        }
                    }
                }
            }
        }
        if (_GLF_DEAD(false)) {
            _GLF_color = _GLF_color;
            if (_GLF_DEAD(false)) {
                {
                    col.x += float(GLF_dead11obj.numbers[1]);
                }
            }
        }
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
    }
    if (_GLF_DEAD(false)) {
        _GLF_color = exp(vec4(429.435, 4.4, -657.823, -1325.4596));
    }
    if (_GLF_DEAD(false)) {
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = vec4(1.6, -7.3, -703.776, 5.7);
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                    if (_GLF_DEAD(false)) {
                        ivec2 donor_replacementGLF_dead7pos = _GLF_FUZZED((ivec2(63509, -86672) * ivec2(46145, -13380)));
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            _GLF_color = sin(((-5.3) * _GLF_outVarBackup_GLF_color));
                        }
                        {
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                vec3 donor_replacementGLF_dead11color = _GLF_FUZZED(step(8440.7355, vec3(6.7, 6.7, 3575.1759)));
                                {
                                    donor_replacementGLF_dead11color.y += float(GLF_dead11obj.numbers[2]);
                                }
                            }
                            float GLF_dead7p = (15.0 - abs(float(donor_replacementGLF_dead7pos.x - GLF_dead7dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead7pos.y, 256)]))) / 15.0;
                            ;
                        }
                    }
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            } else {
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        int donor_replacementGLF_dead9i = _GLF_FUZZED(findMSB(83562u));
                        float donor_replacementGLF_dead9s = _GLF_FUZZED(tanh(GLF_dead5time));
                        if (mod(float(donor_replacementGLF_dead9i), GLF_dead5h_r) <= 0.01) {
                            donor_replacementGLF_dead9s += 0.2;
                        }
                    }
                    _GLF_color = vec4(5216.0369, -0.9, 762.230, 9157.8169);
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                if (_GLF_DEAD(false)) {
                    _GLF_color = acos(sign(_GLF_outVarBackup_GLF_color));
                }
            }
        }
        int donor_replacementGLF_dead1i = _GLF_FUZZED(-43663);
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
            return;
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_outlined_70(_GLF_color);
                _GLF_color = vec4(942.449, -0.1, -7395.5204, -0.4);
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            if (_GLF_DEAD(false)) {
                if (abs(uv.x - uv.y) < 0.25) {
                    col.x += float(GLF_dead11obj.numbers[9]);
                }
            }
            if (_GLF_DEAD(false)) {
                ivec2 donor_replacementGLF_dead7pos = _GLF_FUZZED(ivec2(18228, -36768));
                {
                    float GLF_dead7p = (15.0 - abs(float(donor_replacementGLF_dead7pos.x - GLF_dead7dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead7pos.y, 256)]))) / 15.0;
                    ;
                }
                if (_GLF_DEAD(false)) {
                    vec2 donor_replacementGLF_dead11uv = _GLF_FUZZED(injectionSwitch);
                    if (donor_replacementGLF_dead11uv.y > (2.0 / 4.0)) {
                        col.y += float(GLF_dead11obj.numbers[6]);
                    }
                }
            }
        }
        vec4 donor_replacementGLF_dead1res = _GLF_FUZZED(GLF_merged2_0_2_1_2_2_2cuv);
        {
            do {
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    _GLF_color = GLF_merged2_0_2_1_2_2_2cuv;
                }
            } while (_GLF_WRAPPED_LOOP(false));
            if (_GLF_DEAD(false)) {
                uint donor_replacementGLF_dead10matrix_number = _GLF_FUZZED((~packUnorm4x8(_GLF_color)));
                for (int GLF_dead10cols = 2; GLF_dead10cols <= 4; GLF_dead10cols++) {
                    for (int GLF_dead10rows = 2; GLF_dead10rows <= 4; GLF_dead10rows++) {
                        for (int GLF_dead10c = 0; GLF_dead10c < GLF_dead10cols; GLF_dead10c++) {
                            for (int GLF_dead10r = 0; GLF_dead10r < GLF_dead10rows; GLF_dead10r++) {
                                switch (donor_replacementGLF_dead10matrix_number) {
                                    case 0u:
                                        GLF_dead10m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10r, 2)] = GLF_dead10one;
                                        break;
                                    case 1u:
                                        GLF_dead10m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10r, 3)] = GLF_dead10one;
                                        break;
                                    case 2u:
                                        GLF_dead10m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10r, 4)] = GLF_dead10one;
                                        break;
                                    case 3u:
                                        GLF_dead10m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10r, 2)] = GLF_dead10one;
                                        break;
                                    case 4u:
                                        GLF_dead10m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10r, 3)] = GLF_dead10one;
                                        break;
                                    case 5u:
                                        GLF_dead10m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10r, 4)] = GLF_dead10one;
                                        break;
                                    case 6u:
                                        GLF_dead10m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10r, 2)] = GLF_dead10one;
                                        break;
                                    case 7u:
                                        GLF_dead10m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10r, 3)] = GLF_dead10one;
                                        break;
                                    case 8u:
                                        GLF_dead10m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10r, 4)] = GLF_dead10one;
                                        break;
                                }
                            }
                        }
                        donor_replacementGLF_dead10matrix_number = donor_replacementGLF_dead10matrix_number + 1u;
                    }
                }
            }
            if (_GLF_DEAD(false)) {
                int donor_replacementGLF_dead4iteration = _GLF_FUZZED(bitfieldReverse(31669));
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    {
                        GLF_dead5h_r += 0.2;
                    }
                }
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(-9.3, 39.28, -568.906, 2.2);
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                {
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        ;
                    } else {
                    }
                }
            }
            donor_replacementGLF_dead1res = GLF_dead1pal[_GLF_MAKE_IN_BOUNDS_INT((int(GLF_dead1picdata[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead1i, 8)].x) * int(GLF_dead1picdata[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead1i, 8)].y) + donor_replacementGLF_dead1i * 9 + 11) % 16, 16)];
        }
    }
    for (int _injected_loop_counter = (0 | ((-89808) & 0)); _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
        if (_GLF_DEAD(false)) {
            _GLF_color = _GLF_outlined_71(_GLF_color);
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
            return;
        }
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = floor(vec4(dFdxCoarse(-3.6), (vec3(-59.02, 363.384, 1.7) / (-196.607))));
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
    }
    {
        vec4 _GLF_outVarBackup_GLF_color;
        if (_GLF_DEAD(false)) {
            float donor_replacementGLF_dead9s = _GLF_FUZZED(ldexp(GLF_dead5b_b, -7106));
            {
                ;
            }
        }
        _GLF_outVarBackup_GLF_color = _GLF_color;
        if (_GLF_DEAD(false)) {
            _GLF_color = acosh(vec4(-2.9, GLF_dead5h_r, GLF_dead5b_b, GLF_dead5s_g));
        }
        _GLF_color = _GLF_outlined_72();
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
            int donor_replacementGLF_dead4iterationCap = _GLF_FUZZED(10038);
            {
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_outlined_73(_GLF_color);
                    _GLF_color = (vec4(-8.4, 0.3, 1.8, -9.5) / (uvec3(170402u, 97288u, 149346u), -2.0));
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                    if (_GLF_DEAD(false)) {
                        float donor_replacementGLF_dead9s = _GLF_FUZZED(GLF_dead5time);
                        {
                            donor_replacementGLF_dead9s += 0.2;
                        }
                    }
                }
                donor_replacementGLF_dead4iterationCap += 1;
            }
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(8747.7882, -2.0, 94.63, 8375.4926);
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
        }
        for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != (0 >> _GLF_IDENTITY(int(0), int(0)))); _injected_loop_counter--) {
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                do {
                    _GLF_color = _GLF_outlined_74(_GLF_outVarBackup_GLF_color);
                } while (_GLF_WRAPPED_LOOP(false));
            }
        }
    }
    if (_GLF_DEAD(false)) {
        return;
    }
}
