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

vec4 GLF_dead28_GLF_color = _GLF_FUZZED(vec4(6809.3095, 47.31, -2268.5619, -69.50));

layout(set = 0, binding = 2) uniform buf2 {
    float GLF_dead28one;
};

mat2 GLF_dead28m22 = _GLF_FUZZED((mat2(-39.77, 896.650, 673.832, -6.5) * (-6.7)));
mat2x3 GLF_dead28m23 = _GLF_FUZZED(mat2x3(-9.0, -84.91, -9310.8701, -1.5, -8.3, -9.3));
mat2x4 GLF_dead28m24 = _GLF_FUZZED(mat2x4(-6.3, 79.65, 5102.6630, 4.0, 9.1, 4.9, 817.076, -6.6));
mat3x2 GLF_dead28m32 = _GLF_FUZZED(((-740.589) + mat3x2(7042.0840, -1.4, 4.5, 26.28, -8.0, -35.38)));
mat3 GLF_dead28m33 = _GLF_FUZZED(mat3(-2.8, 5.6, 5446.3453, -83.69, 7439.4888, -9.1, 36.79, 68.67, -56.26));
mat3x4 GLF_dead28m34 = _GLF_FUZZED(mat3x4(1.3, 3393.4277, -796.616, 472.202, -8.1, -7.7, -9.9, -4.5, -807.420, 81.52, -64.34, 901.015));
mat4x2 GLF_dead28m42 = _GLF_FUZZED(mat4x2(mat2x4(-12.29, 510.444, 6.2, 18.71, -75.53, 40.54, 3.6, 2.9)));
mat4x3 GLF_dead28m43 = _GLF_FUZZED(mat4x3(-45.22, -5.3, 9.8, 7.2, -3.1, -133.693, 2.3, -8.2, 8881.3038, -1.3, -2.4, 607.093));
mat4 GLF_dead28m44 = _GLF_FUZZED(mat4(89.91, 2.7, -731.728, 896.374, -6.3, 56.01, 9942.7349, 822.547, -0.7, 71.55, 1.5, 723.999, -469.167, -7933.8699, 7733.8006, -6.3));
vec4 GLF_dead30gl_FragCoord = _GLF_FUZZED(vec4(9.3, 214.331, 765.302, -2.4));

layout(set = 0, binding = 3) uniform buf3 {
    vec2 GLF_dead30resolution;
};

layout(set = 0, binding = 4) uniform buf4 {
    vec2 GLF_dead24injectionSwitch;
};

vec4 GLF_dead27gl_FragCoord = _GLF_FUZZED(vec4(-7.1, 7.8, 7593.6727, 4.6));
vec4 GLF_dead25gl_FragCoord = _GLF_FUZZED(vec4(70.65, 31.90, 8.8, 8236.3445));
const int GLF_dead25N = 10;
int GLF_dead25data[10] = int[10](_GLF_FUZZED(ivec2(-88942, 41641).x), _GLF_FUZZED(-14028), _GLF_FUZZED((-81314)), _GLF_FUZZED(91188), _GLF_FUZZED(70535), _GLF_FUZZED(83216), _GLF_FUZZED(-83172), _GLF_FUZZED(990), _GLF_FUZZED((ivec4(89954, -50930, 77497, 23151) & (95343 & ivec4(-94221, -13354, -54411, 21532))).r), _GLF_FUZZED(ivec4(-34924, -62055, -22945, 60539).y)), GLF_dead25temp[10] = int[10](_GLF_FUZZED(((87939 - (-63464)))), _GLF_FUZZED(-30002), _GLF_FUZZED(95816), _GLF_FUZZED(44945), _GLF_FUZZED(-73459), _GLF_FUZZED(42089), _GLF_FUZZED(7413), _GLF_FUZZED(-36898), _GLF_FUZZED((-(-80869))), _GLF_FUZZED((62047 + (-81008))));

void GLF_dead25merge(int GLF_dead25from, int GLF_dead25mid, int GLF_dead25to) {
    int GLF_dead25k = GLF_dead25from, GLF_dead25i = GLF_dead25from, GLF_dead25j = GLF_dead25mid + 1;
    while (GLF_dead25i <= GLF_dead25mid && GLF_dead25j <= GLF_dead25to) {
        if (_GLF_WRAPPED_IF_FALSE(false)) {
        } else {
            if (GLF_dead25data[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead25i, 10)] < GLF_dead25data[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead25j, 10)]) {
                GLF_dead25temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead25k++, 10)] = GLF_dead25data[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead25i++, 10)];
            } else {
                GLF_dead25temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead25k++, 10)] = GLF_dead25data[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead25j++, 10)];
            }
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            int donor_replacementGLF_dead28c = _GLF_FUZZED((GLF_dead25from | ivec4(-70358, -97112, -50102, 88110))[0]);
            uint donor_replacementGLF_dead28matrix_number = _GLF_FUZZED(44645u);
            for (int GLF_dead28r = 0; GLF_dead28r < GLF_dead25from; GLF_dead28r++) {
                switch (donor_replacementGLF_dead28matrix_number) {
                    case 0u:
                        GLF_dead28m22[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead28c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 2)] = GLF_dead28one;
                        break;
                    case 1u:
                        GLF_dead28m23[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead28c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 3)] = GLF_dead28one;
                        break;
                    case 2u:
                        GLF_dead28m24[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead28c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 4)] = GLF_dead28one;
                        break;
                    case 3u:
                        GLF_dead28m32[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead28c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 2)] = GLF_dead28one;
                        break;
                    case 4u:
                        GLF_dead28m33[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead28c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 3)] = GLF_dead28one;
                        break;
                    case 5u:
                        GLF_dead28m34[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead28c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 4)] = GLF_dead28one;
                        break;
                    case 6u:
                        GLF_dead28m42[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead28c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 2)] = GLF_dead28one;
                        break;
                    case 7u:
                        GLF_dead28m43[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead28c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 3)] = GLF_dead28one;
                        break;
                    case 8u:
                        GLF_dead28m44[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead28c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 4)] = GLF_dead28one;
                        break;
                }
            }
        }
    }
    while (GLF_dead25i < GLF_dead25N && GLF_dead25i <= GLF_dead25mid) {
        GLF_dead25temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead25k++, 10)] = GLF_dead25data[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead25i++, 10)];
        if (_GLF_DEAD(false)) {
            float donor_replacementGLF_dead29th = _GLF_FUZZED(tan(7.5));
            {
                donor_replacementGLF_dead29th = -donor_replacementGLF_dead29th;
            }
        }
    }
    for (int GLF_dead25i = GLF_dead25from; GLF_dead25i <= GLF_dead25to; GLF_dead25i++) {
        GLF_dead25data[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead25i, 10)] = GLF_dead25temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead25i, 10)];
    }
}

const int GLF_dead26dp[256] = int[256](115, 133, 150, 164, 176, 184, 190, 192, 191, 187, 181, 172, 163, 153, 143, 134, 126, 120, 116, 114, 114, 117, 121, 127, 134, 141, 148, 154, 159, 162, 163, 161, 157, 151, 143, 134, 124, 113, 103, 94, 87, 82, 79, 80, 84, 91, 101, 114, 130, 146, 164, 182, 199, 215, 229, 240, 249, 254, 256, 254, 250, 243, 233, 223, 212, 200, 190, 180, 172, 166, 163, 161, 162, 164, 169, 174, 179, 185, 190, 193, 195, 195, 192, 188, 180, 171, 161, 149, 137, 125, 114, 105, 97, 93, 91, 93, 98, 106, 117, 130, 145, 161, 177, 193, 208, 221, 231, 239, 243, 244, 242, 236, 228, 218, 207, 194, 181, 169, 158, 148, 141, 135, 132, 131, 132, 135, 138, 143, 147, 151, 154, 155, 155, 152, 146, 139, 129, 118, 106, 93, 80, 68, 58, 49, 43, 40, 41, 44, 51, 61, 73, 87, 103, 119, 134, 149, 162, 173, 181, 186, 188, 186, 181, 174, 164, 153, 141, 128, 116, 104, 94, 86, 81, 77, 76, 77, 80, 84, 89, 94, 98, 102, 104, 104, 102, 98, 92, 83, 73, 62, 50, 38, 26, 16, 8, 2, 0, 0, 4, 11, 21, 33, 48, 64, 81, 98, 114, 129, 141, 151, 158, 161, 161, 158, 152, 144, 134, 123, 112, 100, 90, 81, 73, 68, 65, 65, 67, 70, 75, 81, 87, 92, 97, 101, 103, 102, 100, 95, 88, 79, 69, 58, 47, 36, 26, 18, 13, 11, 11, 15, 22, 32, 45, 60, 77, 94);

struct GLF_dead20QuicksortObject {
    int numbers[10];
};

GLF_dead20QuicksortObject GLF_dead20obj = GLF_dead20QuicksortObject(int[10](0, 0, 0, 0, 0, 0, 0, 0, 0, 0));

void GLF_dead20swap(int GLF_dead20i, int GLF_dead20j) {
    int GLF_dead20temp = GLF_dead20obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead20i, 10)];
    GLF_dead20obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead20i, 10)] = GLF_dead20obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead20j, 10)];
    GLF_dead20obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead20j, 10)] = GLF_dead20temp;
}

const vec4 GLF_dead21pal[16] = vec4[16](vec4(0.0, 0.0, 0.0, 1.0), vec4(0.5, 0.0, 0.0, 1.0), vec4(0.0, 0.5, 0.0, 1.0), vec4(0.5, 0.5, 0.0, 1.0), vec4(0.0, 0.0, 0.5, 1.0), vec4(0.5, 0.0, 0.5, 1.0), vec4(0.0, 0.5, 0.5, 1.0), vec4(0.5, 0.5, 0.5, 1.0), vec4(0.0, 0.0, 0.0, 1.0), vec4(1.0, 0.0, 0.0, 1.0), vec4(0.0, 1.0, 0.0, 1.0), vec4(1.0, 1.0, 0.0, 1.0), vec4(0.0, 0.0, 1.0, 1.0), vec4(1.0, 0.0, 1.0, 1.0), vec4(0.0, 1.0, 1.0, 1.0), vec4(1.0, 1.0, 1.0, 1.0));
const vec4 GLF_dead21picdata[8] = vec4[8](vec4(4, 4, 20, 4), vec4(4, 4, 4, 20), vec4(4, 20, 20, 4), vec4(20, 4, 4, 8), vec4(8, 6, 4, 2), vec4(2, 12, 2, 4), vec4(16, 2, 4, 4), vec4(12, 22, 4, 4));

bool GLF_dead21collision(vec2 GLF_dead21pos, vec4 GLF_dead21quad) {
    if (GLF_dead21pos.x < GLF_dead21quad.x) {
        return false;
        if (_GLF_DEAD(false)) {
            vec2 donor_replacementGLF_dead29v = _GLF_FUZZED(dFdxCoarse(clamp((GLF_dead24injectionSwitch), -5.8, -1815.5794)));
            if (length(donor_replacementGLF_dead29v) < 0.001) {
                ;
            }
        }
    }
    if (GLF_dead21pos.y < GLF_dead21quad.y) {
        return false;
    }
    if (GLF_dead21pos.x > GLF_dead21quad.x + GLF_dead21quad.z) {
        return false;
    }
    if (_GLF_DEAD(false)) {
        vec2 donor_replacementGLF_dead29a = _GLF_FUZZED(GLF_dead24injectionSwitch);
        float donor_replacementGLF_dead29z = _GLF_FUZZED(-6.6);
        {
            donor_replacementGLF_dead29z = donor_replacementGLF_dead29a.x / donor_replacementGLF_dead29a.y;
        }
    }
    if (GLF_dead21pos.y > GLF_dead21quad.y + GLF_dead21quad.w) {
        return false;
    }
    return true;
}

int GLF_dead18MATRIX_N = 4;
layout(set = 0, binding = 5) uniform sampler2D GLF_dead17tex;
layout(set = 0, binding = 6) uniform sampler2D GLF_dead19tex;
vec4 GLF_dead15_GLF_color = _GLF_FUZZED(((-vec4(-23.96, 68.55, -2276.3462, 23.74)).xyyy * vec4(1.1, 3368.0196, 9845.1213, -5216.7629)));

layout(set = 0, binding = 7) uniform buf7 {
    vec3 GLF_dead15polynomial;
};

float GLF_dead15fx(float GLF_dead15x) {
    return GLF_dead15polynomial.x * pow(GLF_dead15x, 2.0) + GLF_dead15polynomial.y * GLF_dead15x + GLF_dead15polynomial.z;
}

layout(set = 0, binding = 8) uniform buf8 {
    vec2 GLF_dead13injectionSwitch;
};

struct GLF_dead13QuicksortObject {
    int numbers[10];
};

GLF_dead13QuicksortObject GLF_dead13obj = GLF_dead13QuicksortObject(int[10](0, 0, 0, 0, 0, 0, 0, 0, 0, 0));

vec3 GLF_dead13palette(vec3 GLF_dead13a, vec3 GLF_dead13b, vec3 GLF_dead13c, vec3 GLF_dead13d) {
    if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
    } else {
        return fract(mix(GLF_dead13d * GLF_dead13a, GLF_dead13a * GLF_dead13c, GLF_dead13b + GLF_dead13d - GLF_dead13c));
    }
}

const int GLF_dead11dp[256] = int[256](115, 133, 150, 164, 176, 184, 190, 192, 191, 187, 181, 172, 163, 153, 143, 134, 126, 120, 116, 114, 114, 117, 121, 127, 134, 141, 148, 154, 159, 162, 163, 161, 157, 151, 143, 134, 124, 113, 103, 94, 87, 82, 79, 80, 84, 91, 101, 114, 130, 146, 164, 182, 199, 215, 229, 240, 249, 254, 256, 254, 250, 243, 233, 223, 212, 200, 190, 180, 172, 166, 163, 161, 162, 164, 169, 174, 179, 185, 190, 193, 195, 195, 192, 188, 180, 171, 161, 149, 137, 125, 114, 105, 97, 93, 91, 93, 98, 106, 117, 130, 145, 161, 177, 193, 208, 221, 231, 239, 243, 244, 242, 236, 228, 218, 207, 194, 181, 169, 158, 148, 141, 135, 132, 131, 132, 135, 138, 143, 147, 151, 154, 155, 155, 152, 146, 139, 129, 118, 106, 93, 80, 68, 58, 49, 43, 40, 41, 44, 51, 61, 73, 87, 103, 119, 134, 149, 162, 173, 181, 186, 188, 186, 181, 174, 164, 153, 141, 128, 116, 104, 94, 86, 81, 77, 76, 77, 80, 84, 89, 94, 98, 102, 104, 104, 102, 98, 92, 83, 73, 62, 50, 38, 26, 16, 8, 2, 0, 0, 4, 11, 21, 33, 48, 64, 81, 98, 114, 129, 141, 151, 158, 161, 161, 158, 152, 144, 134, 123, 112, 100, 90, 81, 73, 68, 65, 65, 67, 70, 75, 81, 87, 92, 97, 101, 103, 102, 100, 95, 88, 79, 69, 58, 47, 36, 26, 18, 13, 11, 11, 15, 22, 32, 45, 60, 77, 94);
const vec4 GLF_dead10pal[16] = vec4[16](vec4(0.0, 0.0, 0.0, 1.0), vec4(0.5, 0.0, 0.0, 1.0), vec4(0.0, 0.5, 0.0, 1.0), vec4(0.5, 0.5, 0.0, 1.0), vec4(0.0, 0.0, 0.5, 1.0), vec4(0.5, 0.0, 0.5, 1.0), vec4(0.0, 0.5, 0.5, 1.0), vec4(0.5, 0.5, 0.5, 1.0), vec4(0.0, 0.0, 0.0, 1.0), vec4(1.0, 0.0, 0.0, 1.0), vec4(0.0, 1.0, 0.0, 1.0), vec4(1.0, 1.0, 0.0, 1.0), vec4(0.0, 0.0, 1.0, 1.0), vec4(1.0, 0.0, 1.0, 1.0), vec4(0.0, 1.0, 1.0, 1.0), vec4(1.0, 1.0, 1.0, 1.0));
const vec4 GLF_dead10picdata[8] = vec4[8](vec4(4, 4, 20, 4), vec4(4, 4, 4, 20), vec4(4, 20, 20, 4), vec4(20, 4, 4, 8), vec4(8, 6, 4, 2), vec4(2, 12, 2, 4), vec4(16, 2, 4, 4), vec4(12, 22, 4, 4));

bool GLF_dead10collision(vec2 GLF_dead10pos, vec4 GLF_dead10quad) {
    if (GLF_dead10pos.x < GLF_dead10quad.x) {
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            return false;
        } else {
        }
    }
    if (GLF_dead10pos.y < GLF_dead10quad.y) {
        for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                int donor_replacementGLF_dead28cols = _GLF_FUZZED(sign(-54819));
                uint donor_replacementGLF_dead28matrix_number = _GLF_FUZZED(38165u);
                int donor_replacementGLF_dead28rows = _GLF_FUZZED(GLF_dead25N);
                {
                    for (int GLF_dead28c = 0; GLF_dead28c < donor_replacementGLF_dead28cols; GLF_dead28c++) {
                        for (int GLF_dead28r = 0; GLF_dead28r < donor_replacementGLF_dead28rows; GLF_dead28r++) {
                            switch (donor_replacementGLF_dead28matrix_number) {
                                case 0u:
                                    GLF_dead28m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 2)] = GLF_dead28one;
                                    break;
                                case 1u:
                                    GLF_dead28m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 3)] = GLF_dead28one;
                                    break;
                                case 2u:
                                    GLF_dead28m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 4)] = GLF_dead28one;
                                    break;
                                case 3u:
                                    GLF_dead28m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 2)] = GLF_dead28one;
                                    break;
                                case 4u:
                                    GLF_dead28m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 3)] = GLF_dead28one;
                                    break;
                                case 5u:
                                    GLF_dead28m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 4)] = GLF_dead28one;
                                    break;
                                case 6u:
                                    GLF_dead28m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 2)] = GLF_dead28one;
                                    break;
                                case 7u:
                                    GLF_dead28m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 3)] = GLF_dead28one;
                                    break;
                                case 8u:
                                    GLF_dead28m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 4)] = GLF_dead28one;
                                    break;
                            }
                        }
                    }
                    donor_replacementGLF_dead28matrix_number = donor_replacementGLF_dead28matrix_number + 1u;
                }
            }
            return false;
        }
    }
    do {
        if (GLF_dead10pos.x > GLF_dead10quad.x + GLF_dead10quad.z) {
            if (_GLF_DEAD(false)) {
                uint donor_replacementGLF_dead28matrix_number = _GLF_FUZZED(packSnorm2x16(GLF_dead24injectionSwitch));
                int donor_replacementGLF_dead28rows = _GLF_FUZZED(GLF_dead25N);
                for (int GLF_dead28r = 0; GLF_dead28r < donor_replacementGLF_dead28rows; GLF_dead28r++) {
                    switch (donor_replacementGLF_dead28matrix_number) {
                        case 0u:
                            GLF_dead28m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead18MATRIX_N, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 2)] = GLF_dead28one;
                            break;
                        case 1u:
                            GLF_dead28m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead18MATRIX_N, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 3)] = GLF_dead28one;
                            break;
                        case 2u:
                            GLF_dead28m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead18MATRIX_N, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 4)] = GLF_dead28one;
                            break;
                        case 3u:
                            GLF_dead28m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead18MATRIX_N, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 2)] = GLF_dead28one;
                            break;
                        case 4u:
                            GLF_dead28m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead18MATRIX_N, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 3)] = GLF_dead28one;
                            break;
                        case 5u:
                            GLF_dead28m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead18MATRIX_N, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 4)] = GLF_dead28one;
                            break;
                        case 6u:
                            GLF_dead28m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead18MATRIX_N, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 2)] = GLF_dead28one;
                            break;
                        case 7u:
                            GLF_dead28m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead18MATRIX_N, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 3)] = GLF_dead28one;
                            break;
                        case 8u:
                            GLF_dead28m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead18MATRIX_N, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 4)] = GLF_dead28one;
                            break;
                    }
                }
            }
            if (_GLF_DEAD(false)) {
                float donor_replacementGLF_dead25grey = _GLF_FUZZED(-9293.2319);
                {
                    donor_replacementGLF_dead25grey = 0.5 + float(GLF_dead25data[0]) / 10.0;
                }
            }
            if (_GLF_DEAD(false)) {
                uint donor_replacementGLF_dead28matrix_number = _GLF_FUZZED(72637u);
                for (int GLF_dead28rows = 2; GLF_dead28rows <= 4; GLF_dead28rows++) {
                    for (int GLF_dead28c = 0; GLF_dead28c < GLF_dead18MATRIX_N; GLF_dead28c++) {
                        for (int GLF_dead28r = 0; GLF_dead28r < GLF_dead28rows; GLF_dead28r++) {
                            switch (donor_replacementGLF_dead28matrix_number) {
                                case 0u:
                                    GLF_dead28m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 2)] = GLF_dead28one;
                                    break;
                                case 1u:
                                    GLF_dead28m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 3)] = GLF_dead28one;
                                    break;
                                case 2u:
                                    GLF_dead28m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 4)] = GLF_dead28one;
                                    break;
                                case 3u:
                                    GLF_dead28m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 2)] = GLF_dead28one;
                                    break;
                                case 4u:
                                    GLF_dead28m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 3)] = GLF_dead28one;
                                    break;
                                case 5u:
                                    GLF_dead28m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 4)] = GLF_dead28one;
                                    break;
                                case 6u:
                                    GLF_dead28m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 2)] = GLF_dead28one;
                                    break;
                                case 7u:
                                    GLF_dead28m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 3)] = GLF_dead28one;
                                    break;
                                case 8u:
                                    GLF_dead28m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 4)] = GLF_dead28one;
                                    break;
                            }
                        }
                    }
                    donor_replacementGLF_dead28matrix_number = donor_replacementGLF_dead28matrix_number + 1u;
                }
            }
            for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < (1 & 1)); _injected_loop_counter++) {
                return false;
                if (_GLF_DEAD(false)) {
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        vec2 donor_replacementGLF_dead29a = _GLF_FUZZED((-(GLF_dead24injectionSwitch - 6.6)));
                        float donor_replacementGLF_dead29th = _GLF_FUZZED(tanh(1317.6887));
                        if (donor_replacementGLF_dead29a.y < donor_replacementGLF_dead29a.x) {
                            donor_replacementGLF_dead29th = 0.5 - donor_replacementGLF_dead29th;
                        }
                    }
                    ivec2 donor_replacementGLF_dead26pos = _GLF_FUZZED(ivec2(74846, -89308));
                    for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != int(_GLF_ONE(1.0, injectionSwitch.y))); _injected_loop_counter++) {
                        if (donor_replacementGLF_dead26pos.x < GLF_dead26dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead26pos.y, 256)] + 15 && donor_replacementGLF_dead26pos.x > GLF_dead26dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead26pos.y, 256)] - 15) {
                            float GLF_dead26p = (15.0 - abs(float(donor_replacementGLF_dead26pos.x - GLF_dead26dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead26pos.y, 256)]))) / 15.0;
                            ;
                            if (_GLF_DEAD(false)) {
                                int donor_replacementGLF_dead30i = _GLF_FUZZED(bitCount(190448u));
                                if (donor_replacementGLF_dead30i >= int(GLF_dead30resolution.x)) {
                                    break;
                                }
                            }
                        }
                        donor_replacementGLF_dead26pos.y++;
                    }
                }
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                int donor_replacementGLF_dead14i = _GLF_FUZZED(50027);
                float donor_replacementGLF_dead14limit = _GLF_FUZZED(7703.1592);
                float donor_replacementGLF_dead14s = _GLF_FUZZED(fwidth(-75.84));
                if (float(donor_replacementGLF_dead14i) >= donor_replacementGLF_dead14limit) {
                    for (int _injected_loop_counter = (0 >> _GLF_IDENTITY(int(4), int(4))); _GLF_WRAPPED_LOOP(_injected_loop_counter != int(_GLF_ONE(1.0, injectionSwitch.y))); _injected_loop_counter++) {
                        do {
                            if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                            } else {
                                ;
                            }
                        } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
                    }
                }
            }
        }
    } while (_GLF_WRAPPED_LOOP(false));
    if (GLF_dead10pos.y > GLF_dead10quad.y + GLF_dead10quad.w) {
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
            int donor_replacementGLF_dead28c = _GLF_FUZZED(GLF_dead18MATRIX_N);
            uint donor_replacementGLF_dead28matrix_number = _GLF_FUZZED((34505u * bitfieldInsert(70477u, 1046u, GLF_dead25N, ivec3(90715, -98812, 76940)[1])));
            int donor_replacementGLF_dead28rows = _GLF_FUZZED(bitCount(-9552));
            for (int GLF_dead28r = 0; GLF_dead28r < donor_replacementGLF_dead28rows; GLF_dead28r++) {
                switch (donor_replacementGLF_dead28matrix_number) {
                    case 0u:
                        GLF_dead28m22[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead28c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 2)] = GLF_dead28one;
                        break;
                    case 1u:
                        GLF_dead28m23[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead28c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 3)] = GLF_dead28one;
                        break;
                    case 2u:
                        GLF_dead28m24[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead28c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 4)] = GLF_dead28one;
                        break;
                    case 3u:
                        GLF_dead28m32[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead28c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 2)] = GLF_dead28one;
                        break;
                    case 4u:
                        GLF_dead28m33[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead28c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 3)] = GLF_dead28one;
                        break;
                    case 5u:
                        GLF_dead28m34[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead28c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 4)] = GLF_dead28one;
                        break;
                    case 6u:
                        GLF_dead28m42[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead28c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 2)] = GLF_dead28one;
                        break;
                    case 7u:
                        GLF_dead28m43[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead28c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 3)] = GLF_dead28one;
                        break;
                    case 8u:
                        GLF_dead28m44[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead28c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 4)] = GLF_dead28one;
                        break;
                }
            }
        }
        if (_GLF_DEAD(false)) {
            int donor_replacementGLF_dead21i = _GLF_FUZZED(abs(-97259));
            vec2 donor_replacementGLF_dead21pos = _GLF_FUZZED(mix(fwidthFine(vec2(-3980.8555, -48.65)), injectionSwitch, -62.74));
            vec4 donor_replacementGLF_dead21res = _GLF_FUZZED(acosh(dFdy(GLF_dead10quad)));
            if (GLF_dead21collision(donor_replacementGLF_dead21pos, GLF_dead21picdata[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead21i, 8)])) {
                donor_replacementGLF_dead21res = GLF_dead21pal[_GLF_MAKE_IN_BOUNDS_INT((int(GLF_dead21picdata[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead21i, 8)].x) * int(GLF_dead21picdata[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead21i, 8)].y) + donor_replacementGLF_dead21i * 9 + 11) % 16, 16)];
            }
        }
        return false;
    }
    return true;
    if (_GLF_DEAD(false)) {
        uint donor_replacementGLF_dead28matrix_number = _GLF_FUZZED(floatBitsToUint(-5.5));
        int donor_replacementGLF_dead28rows = _GLF_FUZZED((GLF_dead25N << (-94605)));
        {
            for (int GLF_dead28c = 0; GLF_dead28c < GLF_dead18MATRIX_N; GLF_dead28c++) {
                for (int GLF_dead28r = 0; GLF_dead28r < donor_replacementGLF_dead28rows; GLF_dead28r++) {
                    switch (donor_replacementGLF_dead28matrix_number) {
                        case 0u:
                            GLF_dead28m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 2)] = GLF_dead28one;
                            break;
                        case 1u:
                            GLF_dead28m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 3)] = GLF_dead28one;
                            break;
                        case 2u:
                            GLF_dead28m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 4)] = GLF_dead28one;
                            break;
                        case 3u:
                            GLF_dead28m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 2)] = GLF_dead28one;
                            break;
                        case 4u:
                            GLF_dead28m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 3)] = GLF_dead28one;
                            break;
                        case 5u:
                            GLF_dead28m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 4)] = GLF_dead28one;
                            break;
                        case 6u:
                            GLF_dead28m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 2)] = GLF_dead28one;
                            break;
                        case 7u:
                            GLF_dead28m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 3)] = GLF_dead28one;
                            break;
                        case 8u:
                            GLF_dead28m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 4)] = GLF_dead28one;
                            break;
                    }
                }
            }
            donor_replacementGLF_dead28matrix_number = donor_replacementGLF_dead28matrix_number + 1u;
        }
    }
}

int GLF_dead6MATRIX_N = 4;

layout(set = 0, binding = 9) uniform buf9 {
    vec2 GLF_dead4injectionSwitch;
};

struct GLF_dead4QuicksortObject {
    int numbers[10];
};

GLF_dead4QuicksortObject GLF_dead4obj = GLF_dead4QuicksortObject(int[10](0, 0, 0, 0, 0, 0, 0, 0, 0, 0));

vec3 GLF_dead4palette(vec3 GLF_dead4a, vec3 GLF_dead4b, vec3 GLF_dead4c, vec3 GLF_dead4d) {
    return fract(mix(GLF_dead4d * GLF_dead4a, GLF_dead4a * GLF_dead4c, GLF_dead4b + GLF_dead4d - GLF_dead4c));
}

float GLF_dead5b_b = _GLF_FUZZED(-519.123);
layout(set = 0, binding = 10) uniform sampler2D GLF_dead7tex;
const float GLF_dead7weights[9] = float[9](1.0, 0.5, -0.25, 0.5, 1.0, -0.5, -0.25, -0.5, -1.0);
vec4 GLF_dead2_GLF_color = _GLF_FUZZED(vec2(-672.673, 18.02).xx.ssts);
vec4 GLF_dead1_GLF_color = _GLF_FUZZED((vec4(-146.385, -3331.0317, 675.361, -79.82)));
layout(location = 0) out vec4 _GLF_color;
layout(set = 0, binding = 0) uniform sampler2D tex;

void main() {
    vec2 coord = gl_FragCoord.xy * (1.0 / 256.0);
    vec4 res = vec4(0.25);
    if (_GLF_DEAD(false)) {
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                if (_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6MATRIX_N, 4)] >= 1.0) {
                    _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6MATRIX_N, 4)] = _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6MATRIX_N, 4)] * _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6MATRIX_N, 4)];
                }
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                {
                    for (int _injected_loop_counter = int(_GLF_ONE(1.0, injectionSwitch.y)); _GLF_WRAPPED_LOOP(_injected_loop_counter > _GLF_IDENTITY(0, clamp(0, 0, 0))); _injected_loop_counter--) {
                        GLF_dead15_GLF_color = vec4(0.0, 1.0, 0.0, 1.0);
                    }
                }
                for (int _injected_loop_counter = (0 << _GLF_IDENTITY(int(7), _GLF_IDENTITY(int(7), (int(7)) ^ 0))); _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
                    do {
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            int donor_replacementGLF_dead16iteration = _GLF_FUZZED(GLF_dead6MATRIX_N);
                            if (donor_replacementGLF_dead16iteration < 1000) {
                                ;
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    do {
                                        coord.y -= step(GLF_dead24injectionSwitch.y, coord.x);
                                        coord.x -= fract(tanh(coord.x)) / ldexp(GLF_dead24injectionSwitch.y, findMSB(donor_replacementGLF_dead16iteration));
                                        donor_replacementGLF_dead16iteration--;
                                    } while (donor_replacementGLF_dead16iteration > int(GLF_dead24injectionSwitch.x));
                                }
                            } else {
                                ;
                            }
                        }
                        if (_GLF_DEAD(false)) {
                            {
                                discard;
                            }
                        }
                    } while (_GLF_WRAPPED_LOOP(false));
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        ivec2 donor_replacementGLF_dead26pos = _GLF_FUZZED(ivec2(9955, -93229));
                        while (donor_replacementGLF_dead26pos.y != 256) {
                            if (donor_replacementGLF_dead26pos.x < GLF_dead26dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead26pos.y, 256)] + 15 && donor_replacementGLF_dead26pos.x > GLF_dead26dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead26pos.y, 256)] - 15) {
                                float GLF_dead26p = (15.0 - abs(float(donor_replacementGLF_dead26pos.x - GLF_dead26dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead26pos.y, 256)]))) / 15.0;
                                for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != (0 >> _GLF_IDENTITY(int(7), _GLF_IDENTITY(int(7), (int(7)) - 0)))); _injected_loop_counter--) {
                                    ;
                                }
                            }
                            donor_replacementGLF_dead26pos.y++;
                        }
                    }
                }
            }
            for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
                    for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
                        if (_GLF_WRAPPED_IF_FALSE(false)) {
                        } else {
                            if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < sin(0.0))))) {
                                if (_GLF_DEAD(false)) {
                                    uint donor_replacementGLF_dead28matrix_number = _GLF_FUZZED(197231u);
                                    for (int GLF_dead28rows = 2; GLF_dead28rows <= 4; GLF_dead28rows++) {
                                        for (int GLF_dead28c = 0; GLF_dead28c < GLF_dead18MATRIX_N; GLF_dead28c++) {
                                            for (int GLF_dead28r = 0; GLF_dead28r < GLF_dead28rows; GLF_dead28r++) {
                                                switch (donor_replacementGLF_dead28matrix_number) {
                                                    case 0u:
                                                        GLF_dead28m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 2)] = GLF_dead28one;
                                                        break;
                                                    case 1u:
                                                        GLF_dead28m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 3)] = GLF_dead28one;
                                                        break;
                                                    case 2u:
                                                        GLF_dead28m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 4)] = GLF_dead28one;
                                                        break;
                                                    case 3u:
                                                        GLF_dead28m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 2)] = GLF_dead28one;
                                                        break;
                                                    case 4u:
                                                        GLF_dead28m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 3)] = GLF_dead28one;
                                                        break;
                                                    case 5u:
                                                        GLF_dead28m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 4)] = GLF_dead28one;
                                                        break;
                                                    case 6u:
                                                        GLF_dead28m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 2)] = GLF_dead28one;
                                                        break;
                                                    case 7u:
                                                        GLF_dead28m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 3)] = GLF_dead28one;
                                                        break;
                                                    case 8u:
                                                        GLF_dead28m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 4)] = GLF_dead28one;
                                                        break;
                                                }
                                            }
                                        }
                                        donor_replacementGLF_dead28matrix_number = donor_replacementGLF_dead28matrix_number + 1u;
                                    }
                                }
                            } else {
                                do {
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                        vec3 donor_replacementGLF_dead20color = _GLF_FUZZED(fwidth(vec3(GLF_dead15_GLF_color)));
                                        for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < ((int(_GLF_ONE(1.0, injectionSwitch.y)) << _GLF_IDENTITY(int(3), int(3))) >> _GLF_IDENTITY(int(3), _GLF_IDENTITY(int(3), max(int(3), _GLF_IDENTITY(int(3), int(ivec4(int(3), 0, 0, 0)))))))); _injected_loop_counter++) {
                                            donor_replacementGLF_dead20color.x += float(GLF_dead20obj.numbers[1]);
                                        }
                                    }
                                    for (int _injected_loop_counter = int(_GLF_ZERO(0.0, injectionSwitch.x)); _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                if (_GLF_DEAD(false)) {
                                                    float donor_replacementGLF_dead29th = _GLF_FUZZED(84.16);
                                                    {
                                                        donor_replacementGLF_dead29th = 0.5 - donor_replacementGLF_dead29th;
                                                    }
                                                }
                                                vec4 donor_replacementGLF_dead14c = _GLF_FUZZED(_GLF_color);
                                                if (donor_replacementGLF_dead14c[_GLF_MAKE_IN_BOUNDS_INT(_injected_loop_counter, 4)] >= 1.0) {
                                                    if (_GLF_DEAD(false)) {
                                                        int donor_replacementGLF_dead28c = _GLF_FUZZED((~GLF_dead18MATRIX_N));
                                                        uint donor_replacementGLF_dead28matrix_number = _GLF_FUZZED(packHalf2x16(asinh(GLF_dead13injectionSwitch)));
                                                        {
                                                            for (int GLF_dead28r = 0; GLF_dead28r < _injected_loop_counter; GLF_dead28r++) {
                                                                switch (donor_replacementGLF_dead28matrix_number) {
                                                                    case 0u:
                                                                        GLF_dead28m22[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead28c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 2)] = GLF_dead28one;
                                                                        break;
                                                                    case 1u:
                                                                        GLF_dead28m23[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead28c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 3)] = GLF_dead28one;
                                                                        break;
                                                                    case 2u:
                                                                        GLF_dead28m24[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead28c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 4)] = GLF_dead28one;
                                                                        break;
                                                                    case 3u:
                                                                        GLF_dead28m32[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead28c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 2)] = GLF_dead28one;
                                                                        break;
                                                                    case 4u:
                                                                        GLF_dead28m33[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead28c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 3)] = GLF_dead28one;
                                                                        break;
                                                                    case 5u:
                                                                        GLF_dead28m34[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead28c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 4)] = GLF_dead28one;
                                                                        break;
                                                                    case 6u:
                                                                        GLF_dead28m42[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead28c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 2)] = GLF_dead28one;
                                                                        break;
                                                                    case 7u:
                                                                        GLF_dead28m43[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead28c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 3)] = GLF_dead28one;
                                                                        break;
                                                                    case 8u:
                                                                        GLF_dead28m44[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead28c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 4)] = GLF_dead28one;
                                                                        break;
                                                                }
                                                            }
                                                        }
                                                    }
                                                    if (_GLF_DEAD(false)) {
                                                        float donor_replacementGLF_dead25grey = _GLF_FUZZED(GLF_dead4injectionSwitch.s);
                                                        if (int(GLF_dead25gl_FragCoord[1]) < 150) {
                                                            discard;
                                                        } else {
                                                            if (int(GLF_dead25gl_FragCoord[1]) < 180) {
                                                                for (int _injected_loop_counter = ((_GLF_IDENTITY(1, (1) + 0) << _GLF_IDENTITY(int(7), int(7))) >> _GLF_IDENTITY(int(7), int(7))); _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                                                                    donor_replacementGLF_dead25grey = 0.5 + float(GLF_dead25data[5]) / 10.0;
                                                                }
                                                            } else {
                                                                if (int(GLF_dead25gl_FragCoord[1]) < 210) {
                                                                    donor_replacementGLF_dead25grey = 0.5 + float(GLF_dead25data[6]) / 10.0;
                                                                } else {
                                                                    if (int(GLF_dead25gl_FragCoord[1]) < 240) {
                                                                        donor_replacementGLF_dead25grey = 0.5 + float(GLF_dead25data[7]) / 10.0;
                                                                    } else {
                                                                        if (int(GLF_dead25gl_FragCoord[1]) < 270) {
                                                                            donor_replacementGLF_dead25grey = 0.5 + float(GLF_dead25data[8]) / 10.0;
                                                                        } else {
                                                                            discard;
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                    donor_replacementGLF_dead14c[_GLF_MAKE_IN_BOUNDS_INT(_injected_loop_counter, 4)] = donor_replacementGLF_dead14c[_GLF_MAKE_IN_BOUNDS_INT(_injected_loop_counter, 4)] * donor_replacementGLF_dead14c[_GLF_MAKE_IN_BOUNDS_INT(_injected_loop_counter, 4)];
                                                }
                                            }
                                            GLF_dead1_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
                                        } else {
                                        }
                                    }
                                } while (_GLF_WRAPPED_LOOP(false));
                            }
                        }
                        if (_GLF_DEAD(false)) {
                            vec2 donor_replacementGLF_dead29v = _GLF_FUZZED(coord);
                            if (length(donor_replacementGLF_dead29v) < 0.001) {
                                ;
                            }
                        }
                    }
                }
            }
        } else {
        }
    }
    if (_GLF_WRAPPED_IF_FALSE(false)) {
        if (_GLF_DEAD(false)) {
            ivec2 donor_replacementGLF_dead26pos = _GLF_FUZZED(ivec2(-13545, 32547));
            {
                if (_GLF_DEAD(false)) {
                    int donor_replacementGLF_dead28c = _GLF_FUZZED(90172);
                    uint donor_replacementGLF_dead28matrix_number = _GLF_FUZZED(177058u);
                    for (int GLF_dead28r = 0; GLF_dead28r < GLF_dead6MATRIX_N; GLF_dead28r++) {
                        switch (donor_replacementGLF_dead28matrix_number) {
                            case 0u:
                                GLF_dead28m22[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead28c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 2)] = GLF_dead28one;
                                break;
                            case 1u:
                                GLF_dead28m23[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead28c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 3)] = GLF_dead28one;
                                break;
                            case 2u:
                                GLF_dead28m24[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead28c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 4)] = GLF_dead28one;
                                break;
                            case 3u:
                                GLF_dead28m32[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead28c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 2)] = GLF_dead28one;
                                break;
                            case 4u:
                                GLF_dead28m33[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead28c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 3)] = GLF_dead28one;
                                break;
                            case 5u:
                                GLF_dead28m34[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead28c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 4)] = GLF_dead28one;
                                break;
                            case 6u:
                                GLF_dead28m42[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead28c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 2)] = GLF_dead28one;
                                break;
                            case 7u:
                                GLF_dead28m43[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead28c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 3)] = GLF_dead28one;
                                break;
                            case 8u:
                                GLF_dead28m44[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead28c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 4)] = GLF_dead28one;
                                break;
                        }
                    }
                }
                if (donor_replacementGLF_dead26pos.x < GLF_dead26dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead26pos.y, 256)] + 15 && donor_replacementGLF_dead26pos.x > GLF_dead26dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead26pos.y, 256)] - 15) {
                    float GLF_dead26p = (15.0 - abs(float(donor_replacementGLF_dead26pos.x - GLF_dead26dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead26pos.y, 256)]))) / 15.0;
                    ;
                }
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    donor_replacementGLF_dead26pos.y++;
                } else {
                }
            }
        }
    } else {
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            vec2 donor_replacementGLF_dead17coord = _GLF_FUZZED(atan(coord, tan(vec2(4623.8906, -3844.3191))));
            int donor_replacementGLF_dead17i = _GLF_FUZZED(7426);
            while (donor_replacementGLF_dead17i < 1 && donor_replacementGLF_dead17coord.x > 1.0 || donor_replacementGLF_dead17coord.y > 1.0) {
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                    if (donor_replacementGLF_dead17coord.x > 1.0) {
                        if (_GLF_DEAD(false)) {
                            {
                                ;
                            }
                        }
                        for (int _injected_loop_counter = (0 | 0); _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
                            donor_replacementGLF_dead17coord.x -= 1.0;
                        }
                    }
                } else {
                }
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        {
                            ;
                            if (_GLF_DEAD(false)) {
                                int donor_replacementGLF_dead25j = _GLF_FUZZED(-65143);
                                {
                                    GLF_dead25temp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead25j, 10)] = GLF_dead25data[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead25j, 10)];
                                }
                            }
                        }
                    }
                    if (donor_replacementGLF_dead17coord.y > 1.0)
                        donor_replacementGLF_dead17coord.y -= 1.0;
                } else {
                }
                donor_replacementGLF_dead17coord *= 2.0;
                if (_GLF_DEAD(false)) {
                    float donor_replacementGLF_dead25grey = _GLF_FUZZED(normalize(7308.1581));
                    if (_GLF_DEAD(false)) {
                        uint donor_replacementGLF_dead28matrix_number = _GLF_FUZZED(86469u);
                        int donor_replacementGLF_dead28rows = _GLF_FUZZED(findLSB((2403 >> GLF_dead6MATRIX_N)));
                        {
                            for (int GLF_dead28r = 0; GLF_dead28r < donor_replacementGLF_dead28rows; GLF_dead28r++) {
                                switch (donor_replacementGLF_dead28matrix_number) {
                                    case 0u:
                                        GLF_dead28m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6MATRIX_N, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 2)] = GLF_dead28one;
                                        break;
                                    case 1u:
                                        GLF_dead28m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6MATRIX_N, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 3)] = GLF_dead28one;
                                        break;
                                    case 2u:
                                        GLF_dead28m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6MATRIX_N, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 4)] = GLF_dead28one;
                                        break;
                                    case 3u:
                                        GLF_dead28m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6MATRIX_N, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 2)] = GLF_dead28one;
                                        break;
                                    case 4u:
                                        GLF_dead28m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6MATRIX_N, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 3)] = GLF_dead28one;
                                        break;
                                    case 5u:
                                        GLF_dead28m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6MATRIX_N, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 4)] = GLF_dead28one;
                                        break;
                                    case 6u:
                                        GLF_dead28m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6MATRIX_N, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 2)] = GLF_dead28one;
                                        break;
                                    case 7u:
                                        GLF_dead28m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6MATRIX_N, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 3)] = GLF_dead28one;
                                        break;
                                    case 8u:
                                        GLF_dead28m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6MATRIX_N, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 4)] = GLF_dead28one;
                                        break;
                                }
                            }
                        }
                    }
                    {
                        if (int(GLF_dead25gl_FragCoord[1]) < 90) {
                            donor_replacementGLF_dead25grey = 0.5 + float(GLF_dead25data[2]) / 10.0;
                        } else {
                            if (int(GLF_dead25gl_FragCoord[1]) < 120) {
                                donor_replacementGLF_dead25grey = 0.5 + float(GLF_dead25data[3]) / 10.0;
                            } else {
                                if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                } else {
                                    if (int(GLF_dead25gl_FragCoord[1]) < 150) {
                                        if (_GLF_WRAPPED_IF_FALSE(false)) {
                                        } else {
                                            discard;
                                        }
                                    } else {
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            if (int(GLF_dead25gl_FragCoord[1]) < 180) {
                                                donor_replacementGLF_dead25grey = 0.5 + float(GLF_dead25data[5]) / 10.0;
                                            } else {
                                                if (int(GLF_dead25gl_FragCoord[1]) < 210) {
                                                    do {
                                                        donor_replacementGLF_dead25grey = 0.5 + float(GLF_dead25data[6]) / 10.0;
                                                    } while (_GLF_WRAPPED_LOOP(false));
                                                } else {
                                                    if (int(GLF_dead25gl_FragCoord[1]) < 240) {
                                                        donor_replacementGLF_dead25grey = 0.5 + float(GLF_dead25data[7]) / 10.0;
                                                    } else {
                                                        if (int(GLF_dead25gl_FragCoord[1]) < 270) {
                                                            do {
                                                                donor_replacementGLF_dead25grey = 0.5 + float(GLF_dead25data[8]) / 10.0;
                                                            } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.y < tan(0.0)))));
                                                        } else {
                                                            discard;
                                                        }
                                                    }
                                                }
                                            }
                                        } else {
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                for (int _injected_loop_counter = (1 ^ ((1 << _GLF_IDENTITY(int(2), int(2))) >> _GLF_IDENTITY(int(2), int(2)))); _GLF_WRAPPED_LOOP(_injected_loop_counter < ((1 << _GLF_IDENTITY(int(2), _GLF_IDENTITY(int(2), min(int(2), int(2))))) >> _GLF_IDENTITY(int(2), int(2)))); _injected_loop_counter++) {
                    donor_replacementGLF_dead17i++;
                }
            }
        }
    }
    coord *= 2.0;
    int i = 0;
    if (_GLF_DEAD(false)) {
        int donor_replacementGLF_dead8iters = _GLF_FUZZED((GLF_dead6MATRIX_N / i));
        for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
            for (GLF_dead6MATRIX_N = 0; GLF_dead6MATRIX_N < donor_replacementGLF_dead8iters; GLF_dead6MATRIX_N++) {
                if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                } else {
                    i = (4 * i * (1000 - i)) / 1000;
                }
                if (_GLF_DEAD(false)) {
                    float donor_replacementGLF_dead29th = _GLF_FUZZED(GLF_dead5b_b);
                    vec2 donor_replacementGLF_dead29v = _GLF_FUZZED(GLF_dead4injectionSwitch);
                    if (donor_replacementGLF_dead29v.y < 0.0) {
                        donor_replacementGLF_dead29th = -donor_replacementGLF_dead29th;
                    }
                }
                if (_GLF_DEAD(false)) {
                    int donor_replacementGLF_dead18i = _GLF_FUZZED(GLF_dead6MATRIX_N);
                    mat4 donor_replacementGLF_dead18matrix_a = _GLF_FUZZED((mat4(153.232, -42.87, -3.4, -2958.8632, 7784.2965, -65.21, -3.6, 822.717, 2.7, 16.76, 576.146, 8039.7111, -4699.6514, 460.385, -7.1, 81.81) / (mat4(8505.5835, -3.3, 8339.4611, 30.49, 8.3, -3350.3969, -5.4, 36.58, -2734.9473, -3467.9481, 4370.2100, -551.745, -3.9, -1.3, -4.5, -4.2) - mat4(-458.195, 75.46, 31.21, 9567.0959, -4902.7384, 254.960, 49.50, -7.3, -2187.9625, -286.324, -7.6, -7.8, -6.6, -5.5, -44.06, -8.9))));
                    vec4 donor_replacementGLF_dead18matrix_b = _GLF_FUZZED(GLF_dead2_GLF_color);
                    for (int GLF_dead18j = (GLF_dead18MATRIX_N - 1); GLF_dead18j >= (donor_replacementGLF_dead18i + 1); GLF_dead18j--) {
                        if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        } else {
                            donor_replacementGLF_dead18matrix_b[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead18i, 4)] -= (donor_replacementGLF_dead18matrix_a[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead18i, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead18j, 4)] * donor_replacementGLF_dead18matrix_b[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead18j, 4)]);
                        }
                    }
                }
            }
        }
    }
    for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
        for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
            do {
                while (i < 1 && coord.x > 1.0 || coord.y > 1.0) {
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            {
                                ;
                            }
                        }
                    } else {
                    }
                    for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
                        if (_GLF_DEAD(false)) {
                            vec2 donor_replacementGLF_dead29a = _GLF_FUZZED(coord);
                            float donor_replacementGLF_dead29th = _GLF_FUZZED((GLF_dead5b_b + GLF_dead5b_b));
                            if (donor_replacementGLF_dead29a.y < donor_replacementGLF_dead29a.x) {
                                donor_replacementGLF_dead29th = 0.5 - donor_replacementGLF_dead29th;
                            }
                        }
                        do {
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    } else {
                                        if (_GLF_DEAD(_GLF_IDENTITY(false, bool(bvec3(false, false, false))))) {
                                            if (_GLF_DEAD(false)) {
                                                vec2 donor_replacementGLF_dead29v = _GLF_FUZZED(injectionSwitch);
                                                if (length(donor_replacementGLF_dead29v) < 0.001) {
                                                    ;
                                                }
                                            }
                                            {
                                                ;
                                            }
                                        }
                                    }
                                    {
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                            int donor_replacementGLF_dead24m = _GLF_FUZZED(-84669);
                                            {
                                                _injected_loop_counter = donor_replacementGLF_dead24m + 1;
                                            }
                                            if (_GLF_DEAD(false)) {
                                                int donor_replacementGLF_dead28c = _GLF_FUZZED(bitCount(68204u));
                                                uint donor_replacementGLF_dead28matrix_number = _GLF_FUZZED(33753u);
                                                int donor_replacementGLF_dead28rows = _GLF_FUZZED(_injected_loop_counter);
                                                for (int GLF_dead28r = 0; GLF_dead28r < donor_replacementGLF_dead28rows; GLF_dead28r++) {
                                                    switch (donor_replacementGLF_dead28matrix_number) {
                                                        case 0u:
                                                            GLF_dead28m22[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead28c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 2)] = GLF_dead28one;
                                                            break;
                                                        case 1u:
                                                            GLF_dead28m23[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead28c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 3)] = GLF_dead28one;
                                                            break;
                                                        case 2u:
                                                            GLF_dead28m24[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead28c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 4)] = GLF_dead28one;
                                                            break;
                                                        case 3u:
                                                            GLF_dead28m32[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead28c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 2)] = GLF_dead28one;
                                                            break;
                                                        case 4u:
                                                            GLF_dead28m33[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead28c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 3)] = GLF_dead28one;
                                                            break;
                                                        case 5u:
                                                            GLF_dead28m34[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead28c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 4)] = GLF_dead28one;
                                                            break;
                                                        case 6u:
                                                            GLF_dead28m42[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead28c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 2)] = GLF_dead28one;
                                                            break;
                                                        case 7u:
                                                            GLF_dead28m43[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead28c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 3)] = GLF_dead28one;
                                                            break;
                                                        case 8u:
                                                            GLF_dead28m44[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead28c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 4)] = GLF_dead28one;
                                                            break;
                                                    }
                                                }
                                            }
                                        }
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                if (_GLF_DEAD(false)) {
                                                    ivec2 donor_replacementGLF_dead11pos = _GLF_FUZZED(ivec2(-68696, -32096));
                                                    for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
                                                        float GLF_dead11p = (15.0 - abs(float(donor_replacementGLF_dead11pos.x - GLF_dead11dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11pos.y, 256)]))) / 15.0;
                                                        do {
                                                            if (_GLF_WRAPPED_IF_FALSE(false)) {
                                                            } else {
                                                                ;
                                                            }
                                                        } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
                                                    }
                                                }
                                            } else {
                                            }
                                        } else {
                                            if (_GLF_DEAD(false)) {
                                                ivec2 donor_replacementGLF_dead26pos = _GLF_FUZZED(ivec2(94053, 54619));
                                                {
                                                    if (_GLF_DEAD(false)) {
                                                        int donor_replacementGLF_dead28cols = _GLF_FUZZED(GLF_dead6MATRIX_N);
                                                        uint donor_replacementGLF_dead28matrix_number = _GLF_FUZZED(51791u);
                                                        int donor_replacementGLF_dead28rows = _GLF_FUZZED(GLF_dead6MATRIX_N);
                                                        for (int GLF_dead28c = 0; GLF_dead28c < donor_replacementGLF_dead28cols; GLF_dead28c++) {
                                                            for (int GLF_dead28r = 0; GLF_dead28r < donor_replacementGLF_dead28rows; GLF_dead28r++) {
                                                                switch (donor_replacementGLF_dead28matrix_number) {
                                                                    case 0u:
                                                                        GLF_dead28m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 2)] = GLF_dead28one;
                                                                        break;
                                                                    case 1u:
                                                                        GLF_dead28m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 3)] = GLF_dead28one;
                                                                        break;
                                                                    case 2u:
                                                                        GLF_dead28m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 4)] = GLF_dead28one;
                                                                        break;
                                                                    case 3u:
                                                                        GLF_dead28m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 2)] = GLF_dead28one;
                                                                        break;
                                                                    case 4u:
                                                                        GLF_dead28m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 3)] = GLF_dead28one;
                                                                        break;
                                                                    case 5u:
                                                                        GLF_dead28m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 4)] = GLF_dead28one;
                                                                        break;
                                                                    case 6u:
                                                                        GLF_dead28m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 2)] = GLF_dead28one;
                                                                        break;
                                                                    case 7u:
                                                                        GLF_dead28m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 3)] = GLF_dead28one;
                                                                        break;
                                                                    case 8u:
                                                                        GLF_dead28m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 4)] = GLF_dead28one;
                                                                        break;
                                                                }
                                                            }
                                                        }
                                                    }
                                                    if (donor_replacementGLF_dead26pos.x < GLF_dead26dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead26pos.y, 256)] + 15 && donor_replacementGLF_dead26pos.x > GLF_dead26dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead26pos.y, 256)] - 15) {
                                                        if (_GLF_DEAD(false)) {
                                                            vec2 donor_replacementGLF_dead29a = _GLF_FUZZED(vec2(25.90, 79.84));
                                                            float donor_replacementGLF_dead29z = _GLF_FUZZED(ldexp(1.2, ivec4(61589, -73003, -56429, -60348)[0]));
                                                            {
                                                                donor_replacementGLF_dead29z = donor_replacementGLF_dead29a.y / donor_replacementGLF_dead29a.x;
                                                            }
                                                        }
                                                        float GLF_dead26p = (15.0 - abs(float(donor_replacementGLF_dead26pos.x - GLF_dead26dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead26pos.y, 256)]))) / 15.0;
                                                        ;
                                                    }
                                                    if (_GLF_WRAPPED_IF_FALSE(false)) {
                                                    } else {
                                                        donor_replacementGLF_dead26pos.y++;
                                                    }
                                                }
                                            }
                                        }
                                        GLF_dead2_GLF_color = vec4(vec3(0.0), 1.0);
                                    }
                                    if (_GLF_DEAD(false)) {
                                        float donor_replacementGLF_dead22s = _GLF_FUZZED(sin(clamp(GLF_dead5b_b, -8.2, GLF_dead5b_b)));
                                        {
                                            donor_replacementGLF_dead22s += 0.2;
                                        }
                                    }
                                }
                            } else {
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < abs(0.0))))) {
                                        int donor_replacementGLF_dead8i = _GLF_FUZZED(sign(i));
                                        int donor_replacementGLF_dead8iters = _GLF_FUZZED(GLF_dead6MATRIX_N);
                                        if (_GLF_DEAD(false)) {
                                            float donor_replacementGLF_dead29th = _GLF_FUZZED(length(vec2(-1.2, -8.9)));
                                            {
                                                donor_replacementGLF_dead29th = -donor_replacementGLF_dead29th;
                                            }
                                        }
                                        int donor_replacementGLF_dead8v = _GLF_FUZZED(bitCount(uint((uvec2(53170u, 29753u) == uvec2(102565u, 51720u)))));
                                        for (donor_replacementGLF_dead8i = 0; donor_replacementGLF_dead8i < donor_replacementGLF_dead8iters; donor_replacementGLF_dead8i++) {
                                            do {
                                                donor_replacementGLF_dead8v = (4 * donor_replacementGLF_dead8v * (1000 - donor_replacementGLF_dead8v)) / 1000;
                                            } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))));
                                            for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != _GLF_IDENTITY(0, int(ivec2(0, 1)))); _injected_loop_counter--) {
                                                if (_GLF_DEAD(false)) {
                                                    ivec2 donor_replacementGLF_dead26pos = _GLF_FUZZED(findMSB(ivec2(-39429, 19137)));
                                                    while (donor_replacementGLF_dead26pos.y != 256) {
                                                        if (donor_replacementGLF_dead26pos.x < GLF_dead26dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead26pos.y, 256)] + 15 && donor_replacementGLF_dead26pos.x > GLF_dead26dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead26pos.y, 256)] - 15) {
                                                            float GLF_dead26p = (15.0 - abs(float(donor_replacementGLF_dead26pos.x - GLF_dead26dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead26pos.y, 256)]))) / 15.0;
                                                            ;
                                                        }
                                                        donor_replacementGLF_dead26pos.y++;
                                                    }
                                                }
                                            }
                                        }
                                        if (_GLF_DEAD(false)) {
                                            int donor_replacementGLF_dead24m = _GLF_FUZZED(i);
                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                ;
                                            } else {
                                            }
                                        }
                                    }
                                } else {
                                }
                            }
                            if (_GLF_DEAD(false)) {
                                vec2 donor_replacementGLF_dead29a = _GLF_FUZZED((coord + vec2(-419.875, 8.5)));
                                {
                                    GLF_dead5b_b = donor_replacementGLF_dead29a.y / donor_replacementGLF_dead29a.x;
                                }
                            }
                        } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))));
                    }
                    if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    } else {
                        if (_GLF_WRAPPED_IF_FALSE(false)) {
                        } else {
                            if (_GLF_DEAD(false)) {
                                do {
                                    if (_GLF_DEAD(false)) {
                                        vec2 donor_replacementGLF_dead21pos = _GLF_FUZZED(intBitsToFloat(ivec2(65614, 92118)));
                                        vec4 donor_replacementGLF_dead21res = _GLF_FUZZED((_GLF_color * res));
                                        {
                                            if (GLF_dead21collision(donor_replacementGLF_dead21pos, GLF_dead21picdata[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6MATRIX_N, 8)])) {
                                                donor_replacementGLF_dead21res = GLF_dead21pal[_GLF_MAKE_IN_BOUNDS_INT((int(GLF_dead21picdata[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6MATRIX_N, 8)].x) * int(GLF_dead21picdata[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6MATRIX_N, 8)].y) + GLF_dead6MATRIX_N * 9 + 11) % 16, 16)];
                                            }
                                        }
                                    }
                                } while (_GLF_WRAPPED_LOOP(false));
                                ivec2 donor_replacementGLF_dead11pos = _GLF_FUZZED(ivec2(8290, 26116));
                                {
                                    if (donor_replacementGLF_dead11pos.x < GLF_dead11dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11pos.y, 256)] + 15 && donor_replacementGLF_dead11pos.x > GLF_dead11dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11pos.y, 256)] - 15) {
                                        float GLF_dead11p = (15.0 - abs(float(donor_replacementGLF_dead11pos.x - GLF_dead11dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11pos.y, 256)]))) / 15.0;
                                        ;
                                    }
                                    do {
                                        donor_replacementGLF_dead11pos.y++;
                                        if (_GLF_DEAD(false)) {
                                            {
                                                GLF_dead5b_b = coord.y / coord.x;
                                            }
                                        }
                                    } while (_GLF_WRAPPED_LOOP(false));
                                }
                            }
                        }
                        if (_GLF_DEAD(false)) {
                            int donor_replacementGLF_dead28cols = _GLF_FUZZED(((-30797) << GLF_dead6MATRIX_N));
                            uint donor_replacementGLF_dead28matrix_number = _GLF_FUZZED(29708u);
                            for (int GLF_dead28c = 0; GLF_dead28c < donor_replacementGLF_dead28cols; GLF_dead28c++) {
                                for (int GLF_dead28r = 0; GLF_dead28r < GLF_dead6MATRIX_N; GLF_dead28r++) {
                                    switch (donor_replacementGLF_dead28matrix_number) {
                                        case 0u:
                                            GLF_dead28m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 2)] = GLF_dead28one;
                                            break;
                                        case 1u:
                                            GLF_dead28m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 3)] = GLF_dead28one;
                                            break;
                                        case 2u:
                                            GLF_dead28m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 4)] = GLF_dead28one;
                                            break;
                                        case 3u:
                                            GLF_dead28m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 2)] = GLF_dead28one;
                                            break;
                                        case 4u:
                                            GLF_dead28m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 3)] = GLF_dead28one;
                                            break;
                                        case 5u:
                                            GLF_dead28m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 4)] = GLF_dead28one;
                                            break;
                                        case 6u:
                                            GLF_dead28m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 2)] = GLF_dead28one;
                                            break;
                                        case 7u:
                                            GLF_dead28m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 3)] = GLF_dead28one;
                                            break;
                                        case 8u:
                                            GLF_dead28m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 4)] = GLF_dead28one;
                                            break;
                                    }
                                }
                            }
                        }
                    }
                    if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    } else {
                        if (_GLF_WRAPPED_IF_FALSE(false)) {
                            do {
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                    int donor_replacementGLF_dead28cols = _GLF_FUZZED(GLF_dead6MATRIX_N);
                                    uint donor_replacementGLF_dead28matrix_number = _GLF_FUZZED(187687u);
                                    {
                                        for (int GLF_dead28rows = 2; GLF_dead28rows <= 4; GLF_dead28rows++) {
                                            for (int GLF_dead28c = 0; GLF_dead28c < donor_replacementGLF_dead28cols; GLF_dead28c++) {
                                                for (int GLF_dead28r = 0; GLF_dead28r < GLF_dead28rows; GLF_dead28r++) {
                                                    switch (donor_replacementGLF_dead28matrix_number) {
                                                        case 0u:
                                                            GLF_dead28m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 2)] = GLF_dead28one;
                                                            break;
                                                        case 1u:
                                                            GLF_dead28m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 3)] = GLF_dead28one;
                                                            break;
                                                        case 2u:
                                                            GLF_dead28m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 4)] = GLF_dead28one;
                                                            break;
                                                        case 3u:
                                                            GLF_dead28m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 2)] = GLF_dead28one;
                                                            break;
                                                        case 4u:
                                                            GLF_dead28m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 3)] = GLF_dead28one;
                                                            break;
                                                        case 5u:
                                                            GLF_dead28m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 4)] = GLF_dead28one;
                                                            break;
                                                        case 6u:
                                                            GLF_dead28m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 2)] = GLF_dead28one;
                                                            break;
                                                        case 7u:
                                                            GLF_dead28m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 3)] = GLF_dead28one;
                                                            break;
                                                        case 8u:
                                                            GLF_dead28m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 4)] = GLF_dead28one;
                                                            break;
                                                    }
                                                }
                                            }
                                            donor_replacementGLF_dead28matrix_number = donor_replacementGLF_dead28matrix_number + 1u;
                                        }
                                    }
                                }
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    vec2 donor_replacementGLF_dead19coord = _GLF_FUZZED(dFdyFine(GLF_dead13injectionSwitch));
                                    float donor_replacementGLF_dead19h = _GLF_FUZZED(-3.6);
                                    float donor_replacementGLF_dead19slope = _GLF_FUZZED(step(GLF_dead5b_b, 0.8));
                                    vec2 donor_replacementGLF_dead19uvstep = _GLF_FUZZED(atan(GLF_dead4injectionSwitch));
                                    while (donor_replacementGLF_dead19h < GLF_dead5b_b && i < 32) {
                                        donor_replacementGLF_dead19coord -= donor_replacementGLF_dead19uvstep;
                                        if (_GLF_DEAD(false)) {
                                            float donor_replacementGLF_dead22s = _GLF_FUZZED(donor_replacementGLF_dead19h);
                                            {
                                                ;
                                                if (_GLF_DEAD(false)) {
                                                    ivec2 donor_replacementGLF_dead26pos = _GLF_FUZZED(ivec2(-10389, 26125));
                                                    {
                                                        if (donor_replacementGLF_dead26pos.x < GLF_dead26dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead26pos.y, 256)] + 15 && donor_replacementGLF_dead26pos.x > GLF_dead26dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead26pos.y, 256)] - 15) {
                                                            float GLF_dead26p = (15.0 - abs(float(donor_replacementGLF_dead26pos.x - GLF_dead26dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead26pos.y, 256)]))) / 15.0;
                                                            ;
                                                        }
                                                        donor_replacementGLF_dead26pos.y++;
                                                    }
                                                }
                                            }
                                        }
                                        GLF_dead5b_b += donor_replacementGLF_dead19slope;
                                        donor_replacementGLF_dead19h = texture(GLF_dead19tex, donor_replacementGLF_dead19coord).y;
                                        i++;
                                    }
                                }
                            } while (_GLF_WRAPPED_LOOP(false));
                            if (_GLF_DEAD(false)) {
                                vec2 donor_replacementGLF_dead21pos = _GLF_FUZZED(injectionSwitch);
                                for (GLF_dead6MATRIX_N = 0; GLF_dead6MATRIX_N < 8; GLF_dead6MATRIX_N++) {
                                    if (_GLF_DEAD(false)) {
                                        {
                                            GLF_dead5b_b = 0.5 - GLF_dead5b_b;
                                        }
                                    }
                                    if (GLF_dead21collision(donor_replacementGLF_dead21pos, GLF_dead21picdata[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6MATRIX_N, 8)])) {
                                        for (int _injected_loop_counter = (0 << _GLF_IDENTITY(int(0), int(0))); _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
                                            _GLF_color = GLF_dead21pal[_GLF_MAKE_IN_BOUNDS_INT((int(GLF_dead21picdata[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6MATRIX_N, 8)].x) * int(GLF_dead21picdata[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6MATRIX_N, 8)].y) + GLF_dead6MATRIX_N * 9 + 11) % 16, 16)];
                                        }
                                    }
                                }
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                uint donor_replacementGLF_dead28matrix_number = _GLF_FUZZED(uvec3(131097u, 5179u, 107913u).z);
                                int donor_replacementGLF_dead28rows = _GLF_FUZZED(i);
                                for (int GLF_dead28c = 0; GLF_dead28c < i; GLF_dead28c++) {
                                    for (int GLF_dead28r = 0; GLF_dead28r < donor_replacementGLF_dead28rows; GLF_dead28r++) {
                                        switch (donor_replacementGLF_dead28matrix_number) {
                                            case 0u:
                                                GLF_dead28m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 2)] = GLF_dead28one;
                                                break;
                                            case 1u:
                                                GLF_dead28m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 3)] = GLF_dead28one;
                                                break;
                                            case 2u:
                                                GLF_dead28m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 4)] = GLF_dead28one;
                                                break;
                                            case 3u:
                                                GLF_dead28m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 2)] = GLF_dead28one;
                                                break;
                                            case 4u:
                                                GLF_dead28m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 3)] = GLF_dead28one;
                                                break;
                                            case 5u:
                                                GLF_dead28m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 4)] = GLF_dead28one;
                                                break;
                                            case 6u:
                                                GLF_dead28m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 2)] = GLF_dead28one;
                                                break;
                                            case 7u:
                                                GLF_dead28m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 3)] = GLF_dead28one;
                                                break;
                                            case 8u:
                                                GLF_dead28m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 4)] = GLF_dead28one;
                                                break;
                                        }
                                    }
                                }
                            }
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                if (_GLF_DEAD(false)) {
                                    {
                                        GLF_dead5b_b = 1.0 - GLF_dead5b_b;
                                    }
                                }
                                if (_GLF_DEAD(false)) {
                                    if (_GLF_WRAPPED_IF_FALSE(false)) {
                                    } else {
                                        if (_GLF_DEAD(false)) {
                                            {
                                                for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
                                                    if (GLF_dead20obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(i, 10)] <= i) {
                                                        i++;
                                                        GLF_dead20swap(i, i);
                                                    }
                                                }
                                            }
                                        }
                                        GLF_dead15_GLF_color = vec4(0.0, 1.0, 0.0, 1.0);
                                    }
                                }
                            } else {
                            }
                        } else {
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= length(vec2(0.0, 0.0)))))) {
                                do {
                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                        int donor_replacementGLF_dead30i = _GLF_FUZZED(ivec3(64881, 54407, -64823).z);
                                        if (donor_replacementGLF_dead30i < int(GLF_dead30gl_FragCoord.x)) {
                                            break;
                                        }
                                    }
                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                        if (_GLF_DEAD(false)) {
                                            vec3 donor_replacementGLF_dead4color = _GLF_FUZZED(acos(vec3(-4100.7161, 529.942, 304.922)));
                                            if (_GLF_DEAD(false)) {
                                                vec2 donor_replacementGLF_dead17coord = _GLF_FUZZED(degrees(injectionSwitch));
                                                int donor_replacementGLF_dead17i = _GLF_FUZZED(i);
                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                    if (donor_replacementGLF_dead17coord.x > 1.0)
                                                        donor_replacementGLF_dead17coord.x -= 1.0;
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                        uint donor_replacementGLF_dead28matrix_number = _GLF_FUZZED(packHalf2x16(unpackHalf2x16(45067u)));
                                                        int donor_replacementGLF_dead28rows = _GLF_FUZZED(GLF_dead6MATRIX_N);
                                                        {
                                                            for (int GLF_dead28r = 0; GLF_dead28r < donor_replacementGLF_dead28rows; GLF_dead28r++) {
                                                                switch (donor_replacementGLF_dead28matrix_number) {
                                                                    case 0u:
                                                                        GLF_dead28m22[_GLF_MAKE_IN_BOUNDS_INT(_injected_loop_counter, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 2)] = GLF_dead28one;
                                                                        break;
                                                                    case 1u:
                                                                        GLF_dead28m23[_GLF_MAKE_IN_BOUNDS_INT(_injected_loop_counter, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 3)] = GLF_dead28one;
                                                                        break;
                                                                    case 2u:
                                                                        GLF_dead28m24[_GLF_MAKE_IN_BOUNDS_INT(_injected_loop_counter, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 4)] = GLF_dead28one;
                                                                        break;
                                                                    case 3u:
                                                                        GLF_dead28m32[_GLF_MAKE_IN_BOUNDS_INT(_injected_loop_counter, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 2)] = GLF_dead28one;
                                                                        break;
                                                                    case 4u:
                                                                        GLF_dead28m33[_GLF_MAKE_IN_BOUNDS_INT(_injected_loop_counter, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 3)] = GLF_dead28one;
                                                                        break;
                                                                    case 5u:
                                                                        GLF_dead28m34[_GLF_MAKE_IN_BOUNDS_INT(_injected_loop_counter, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 4)] = GLF_dead28one;
                                                                        break;
                                                                    case 6u:
                                                                        GLF_dead28m42[_GLF_MAKE_IN_BOUNDS_INT(_injected_loop_counter, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 2)] = GLF_dead28one;
                                                                        break;
                                                                    case 7u:
                                                                        GLF_dead28m43[_GLF_MAKE_IN_BOUNDS_INT(_injected_loop_counter, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 3)] = GLF_dead28one;
                                                                        break;
                                                                    case 8u:
                                                                        GLF_dead28m44[_GLF_MAKE_IN_BOUNDS_INT(_injected_loop_counter, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 4)] = GLF_dead28one;
                                                                        break;
                                                                }
                                                            }
                                                        }
                                                    }
                                                    for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != (int(_GLF_ZERO(0.0, injectionSwitch.x)) << _GLF_IDENTITY(int(1), int(1)))); _injected_loop_counter--) {
                                                        if (donor_replacementGLF_dead17coord.y > 1.0)
                                                            donor_replacementGLF_dead17coord.y -= 1.0;
                                                        if (_GLF_DEAD(false)) {
                                                            for (int GLF_dead25m = 1; GLF_dead25m <= _injected_loop_counter; GLF_dead25m = 2 * GLF_dead25m) {
                                                                for (int GLF_dead25i = GLF_dead6MATRIX_N; GLF_dead25i < _injected_loop_counter; GLF_dead25i += 2 * GLF_dead25m) {
                                                                    int GLF_dead25from = GLF_dead25i;
                                                                    int GLF_dead25mid = GLF_dead25i + GLF_dead25m - 1;
                                                                    int GLF_dead25to = min(GLF_dead25i + 2 * GLF_dead25m - 1, _injected_loop_counter);
                                                                    GLF_dead25merge(GLF_dead25from, GLF_dead25mid, GLF_dead25to);
                                                                }
                                                            }
                                                        }
                                                    }
                                                    donor_replacementGLF_dead17coord *= 2.0;
                                                    donor_replacementGLF_dead17i++;
                                                } else {
                                                }
                                                do {
                                                    if (_GLF_DEAD(false)) {
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < sin(0.0))))) {
                                                            ivec2 donor_replacementGLF_dead26pos = _GLF_FUZZED(min(ivec2(-63525, 65167), GLF_dead6MATRIX_N));
                                                            if (donor_replacementGLF_dead26pos.x < GLF_dead26dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead26pos.y, 256)] + 15 && donor_replacementGLF_dead26pos.x > GLF_dead26dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead26pos.y, 256)] - 15) {
                                                                float GLF_dead26p = (15.0 - abs(float(donor_replacementGLF_dead26pos.x - GLF_dead26dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead26pos.y, 256)]))) / 15.0;
                                                                ;
                                                            }
                                                        }
                                                        {
                                                            ;
                                                        }
                                                    }
                                                } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))));
                                            }
                                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                {
                                                    break;
                                                }
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                    if (coord.y < coord.x) {
                                                        GLF_dead5b_b = 0.5 - GLF_dead5b_b;
                                                    }
                                                }
                                            }
                                            vec2 donor_replacementGLF_dead4grid = _GLF_FUZZED(dFdy(fwidth(coord)));
                                            if (coord.x > (3.0 / 4.0)) {
                                                if (_GLF_DEAD(false)) {
                                                    if (donor_replacementGLF_dead4grid.y > donor_replacementGLF_dead4grid.x) {
                                                        GLF_dead5b_b = donor_replacementGLF_dead4grid.x / donor_replacementGLF_dead4grid.y;
                                                    } else {
                                                        GLF_dead5b_b = donor_replacementGLF_dead4grid.y / donor_replacementGLF_dead4grid.x;
                                                    }
                                                }
                                                int GLF_dead4count = int(GLF_dead4injectionSwitch.x);
                                                if (_GLF_DEAD(false)) {
                                                    for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                                                        for (int GLF_dead22i = 0; GLF_dead22i < 3; GLF_dead22i++) {
                                                            if (res[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead22i, 4)] >= 1.0) {
                                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                    res[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead22i, 4)] = res[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead22i, 4)] * res[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead22i, 4)];
                                                                } else {
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                    uint donor_replacementGLF_dead28matrix_number = _GLF_FUZZED(120142u);
                                                    int donor_replacementGLF_dead28rows = _GLF_FUZZED(floatBitsToInt(-5975.8578));
                                                    for (int GLF_dead28c = 0; GLF_dead28c < GLF_dead4count; GLF_dead28c++) {
                                                        for (int GLF_dead28r = 0; GLF_dead28r < donor_replacementGLF_dead28rows; GLF_dead28r++) {
                                                            switch (donor_replacementGLF_dead28matrix_number) {
                                                                case 0u:
                                                                    GLF_dead28m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 2)] = GLF_dead28one;
                                                                    break;
                                                                case 1u:
                                                                    GLF_dead28m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 3)] = GLF_dead28one;
                                                                    break;
                                                                case 2u:
                                                                    GLF_dead28m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 4)] = GLF_dead28one;
                                                                    break;
                                                                case 3u:
                                                                    GLF_dead28m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 2)] = GLF_dead28one;
                                                                    break;
                                                                case 4u:
                                                                    GLF_dead28m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 3)] = GLF_dead28one;
                                                                    break;
                                                                case 5u:
                                                                    GLF_dead28m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 4)] = GLF_dead28one;
                                                                    break;
                                                                case 6u:
                                                                    GLF_dead28m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 2)] = GLF_dead28one;
                                                                    break;
                                                                case 7u:
                                                                    GLF_dead28m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 3)] = GLF_dead28one;
                                                                    break;
                                                                case 8u:
                                                                    GLF_dead28m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 4)] = GLF_dead28one;
                                                                    break;
                                                            }
                                                        }
                                                    }
                                                }
                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                            uint donor_replacementGLF_dead28matrix_number = _GLF_FUZZED(58548u);
                                                            {
                                                                for (int GLF_dead28rows = 2; GLF_dead28rows <= 4; GLF_dead28rows++) {
                                                                    for (int GLF_dead28c = 0; GLF_dead28c < i; GLF_dead28c++) {
                                                                        for (int GLF_dead28r = 0; GLF_dead28r < GLF_dead28rows; GLF_dead28r++) {
                                                                            switch (donor_replacementGLF_dead28matrix_number) {
                                                                                case 0u:
                                                                                    GLF_dead28m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 2)] = GLF_dead28one;
                                                                                    break;
                                                                                case 1u:
                                                                                    GLF_dead28m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 3)] = GLF_dead28one;
                                                                                    break;
                                                                                case 2u:
                                                                                    GLF_dead28m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 4)] = GLF_dead28one;
                                                                                    break;
                                                                                case 3u:
                                                                                    GLF_dead28m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 2)] = GLF_dead28one;
                                                                                    break;
                                                                                case 4u:
                                                                                    GLF_dead28m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 3)] = GLF_dead28one;
                                                                                    break;
                                                                                case 5u:
                                                                                    GLF_dead28m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 4)] = GLF_dead28one;
                                                                                    break;
                                                                                case 6u:
                                                                                    GLF_dead28m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 2)] = GLF_dead28one;
                                                                                    break;
                                                                                case 7u:
                                                                                    GLF_dead28m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 3)] = GLF_dead28one;
                                                                                    break;
                                                                                case 8u:
                                                                                    GLF_dead28m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 4)] = GLF_dead28one;
                                                                                    break;
                                                                            }
                                                                        }
                                                                    }
                                                                    donor_replacementGLF_dead28matrix_number = donor_replacementGLF_dead28matrix_number + 1u;
                                                                }
                                                            }
                                                        }
                                                        for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
                                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < sqrt(0.0))))) {
                                                                    int donor_replacementGLF_dead25i = _GLF_FUZZED(-20112);
                                                                    int donor_replacementGLF_dead25k = _GLF_FUZZED((GLF_dead6MATRIX_N + GLF_dead4count));
                                                                    int donor_replacementGLF_dead25mid = _GLF_FUZZED(GLF_dead4count);
                                                                    while (donor_replacementGLF_dead25i <= donor_replacementGLF_dead25mid && GLF_dead18MATRIX_N <= GLF_dead6MATRIX_N) {
                                                                        do {
                                                                            if (GLF_dead25data[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead25i, 10)] < GLF_dead25data[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead18MATRIX_N, 10)]) {
                                                                                for (int _injected_loop_counter = int(_GLF_ZERO(0.0, injectionSwitch.x)); _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
                                                                                    GLF_dead25temp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead25k++, 10)] = GLF_dead25data[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead25i++, 10)];
                                                                                }
                                                                            } else {
                                                                                GLF_dead25temp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead25k++, 10)] = GLF_dead25data[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead18MATRIX_N++, 10)];
                                                                            }
                                                                        } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
                                                                    }
                                                                }
                                                                do {
                                                                    for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                                                                        do {
                                                                            donor_replacementGLF_dead4color -= GLF_dead4palette(vec3(float(GLF_dead4obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_dead4injectionSwitch.y), 10)]) * 0.1), vec3(0.8), trunc(vec3(0.1)), vec3(GLF_dead4injectionSwitch.x, 0.6, float(GLF_dead4obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_dead4injectionSwitch.x), 10)]) * 0.1));
                                                                            if (_GLF_DEAD(false)) {
                                                                                float donor_replacementGLF_dead29th = _GLF_FUZZED(GLF_dead5b_b);
                                                                                {
                                                                                    donor_replacementGLF_dead29th = 1.0 - donor_replacementGLF_dead29th;
                                                                                }
                                                                            }
                                                                        } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))));
                                                                    }
                                                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < sqrt(length(0.0)))))) {
                                                                        for (int _injected_loop_counter = _GLF_IDENTITY((int(_GLF_ZERO(0.0, injectionSwitch.x)) | 0), int(_GLF_IDENTITY(ivec2((int(_GLF_ZERO(0.0, injectionSwitch.x)) | 0), 0), (ivec2((int(_GLF_ZERO(0.0, injectionSwitch.x)) | 0), 0)) | (ivec2((int(_GLF_ZERO(0.0, injectionSwitch.x)) | 0), 0))))); _GLF_WRAPPED_LOOP(_injected_loop_counter < (0 ^ 1)); _injected_loop_counter++) {
                                                                            if (int(GLF_dead25gl_FragCoord[1]) < 270) {
                                                                                GLF_dead5b_b = 0.5 + float(GLF_dead25data[8]) / 10.0;
                                                                            } else {
                                                                                discard;
                                                                            }
                                                                        }
                                                                    }
                                                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                                        float donor_replacementGLF_dead29th = _GLF_FUZZED(6.8);
                                                                        {
                                                                            donor_replacementGLF_dead29th = 1.0 - donor_replacementGLF_dead29th;
                                                                        }
                                                                    }
                                                                    GLF_dead4count++;
                                                                } while (GLF_dead4count != GLF_dead4obj.numbers[2]);
                                                            } else {
                                                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                                    float donor_replacementGLF_dead25grey = _GLF_FUZZED(78.94);
                                                                    do {
                                                                        if (int(GLF_dead25gl_FragCoord[1]) < 210) {
                                                                            donor_replacementGLF_dead25grey = 0.5 + float(GLF_dead25data[6]) / 10.0;
                                                                        } else {
                                                                            if (int(GLF_dead25gl_FragCoord[1]) < 240) {
                                                                                if (_GLF_WRAPPED_IF_FALSE(false)) {
                                                                                } else {
                                                                                    donor_replacementGLF_dead25grey = 0.5 + float(GLF_dead25data[7]) / 10.0;
                                                                                }
                                                                            } else {
                                                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                                    if (int(GLF_dead25gl_FragCoord[1]) < 270) {
                                                                                        donor_replacementGLF_dead25grey = 0.5 + float(GLF_dead25data[8]) / 10.0;
                                                                                    } else {
                                                                                        discard;
                                                                                    }
                                                                                } else {
                                                                                }
                                                                            }
                                                                        }
                                                                    } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))));
                                                                }
                                                            }
                                                            if (_GLF_DEAD(false)) {
                                                                if (donor_replacementGLF_dead4grid.x > (3.0 / 4.0)) {
                                                                    for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != (((((1 << _GLF_IDENTITY(int(3), int(3))) >> _GLF_IDENTITY(int(3), int(3))) << _GLF_IDENTITY(int(0), int(0))) >> _GLF_IDENTITY(int(0), int(0))) & 1)); _injected_loop_counter++) {
                                                                        donor_replacementGLF_dead4color.z += float(GLF_dead20obj.numbers[3]);
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    } else {
                                                    }
                                                } else {
                                                }
                                                if (_GLF_DEAD(_GLF_IDENTITY(false, (false) || false))) {
                                                    int donor_replacementGLF_dead20i = _GLF_FUZZED(GLF_dead4count);
                                                    if (_GLF_DEAD(false)) {
                                                        int donor_replacementGLF_dead25high = _GLF_FUZZED(GLF_dead6MATRIX_N);
                                                        int donor_replacementGLF_dead25low = _GLF_FUZZED(GLF_dead18MATRIX_N);
                                                        for (int GLF_dead25i = donor_replacementGLF_dead25low; GLF_dead25i < donor_replacementGLF_dead25high; GLF_dead25i += 2 * donor_replacementGLF_dead20i) {
                                                            if (_GLF_DEAD(false)) {
                                                                {
                                                                    break;
                                                                }
                                                            }
                                                            int GLF_dead25from = GLF_dead25i;
                                                            int GLF_dead25mid = GLF_dead25i + donor_replacementGLF_dead20i - 1;
                                                            int GLF_dead25to = min(GLF_dead25i + 2 * donor_replacementGLF_dead20i - 1, donor_replacementGLF_dead25high);
                                                            GLF_dead25merge(GLF_dead25from, GLF_dead25mid, GLF_dead25to);
                                                        }
                                                    }
                                                    {
                                                        GLF_dead20obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead20i, 10)] = (10 - donor_replacementGLF_dead20i);
                                                        for (int _injected_loop_counter = ((0 << _GLF_IDENTITY(int(5), int(5))) | 0); _GLF_WRAPPED_LOOP(_injected_loop_counter < int(_GLF_ONE(1.0, injectionSwitch.y))); _injected_loop_counter++) {
                                                            GLF_dead20obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead20i, 10)] = GLF_dead20obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead20i, 10)] * GLF_dead20obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead20i, 10)];
                                                        }
                                                    }
                                                }
                                                donor_replacementGLF_dead4grid += vec2(GLF_dead4count + GLF_dead4obj.numbers[3], GLF_dead4count + GLF_dead4obj.numbers[3]);
                                                if (_GLF_DEAD(false)) {
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                        float donor_replacementGLF_dead22s = _GLF_FUZZED(2186.6886);
                                                        if (mod(float(_injected_loop_counter), GLF_dead5b_b) <= 0.01) {
                                                            donor_replacementGLF_dead22s += 0.2;
                                                        }
                                                    }
                                                    int donor_replacementGLF_dead16iteration = _GLF_FUZZED(findLSB(143727u));
                                                    int donor_replacementGLF_dead16x = _GLF_FUZZED(min(i, i));
                                                    {
                                                        if (donor_replacementGLF_dead16x * donor_replacementGLF_dead16x + i * i > 262144) {
                                                            break;
                                                        }
                                                        int GLF_dead16x_new = ((donor_replacementGLF_dead16x * donor_replacementGLF_dead16x - i * i) / 256 + GLF_dead4count);
                                                        i = (2 * donor_replacementGLF_dead16x * i / 256 + i);
                                                        donor_replacementGLF_dead16x = GLF_dead16x_new;
                                                        donor_replacementGLF_dead16iteration++;
                                                    }
                                                }
                                                if (_GLF_WRAPPED_IF_FALSE(false)) {
                                                } else {
                                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                        if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                            if (_GLF_DEAD(false)) {
                                                                float donor_replacementGLF_dead29z = _GLF_FUZZED(GLF_dead5b_b);
                                                                {
                                                                    donor_replacementGLF_dead29z = donor_replacementGLF_dead4grid.y / donor_replacementGLF_dead4grid.x;
                                                                }
                                                            }
                                                        } else {
                                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                if (_GLF_DEAD(false)) {
                                                                    vec2 donor_replacementGLF_dead10pos = _GLF_FUZZED(mod(injectionSwitch, vec2(-33.11, -398.905)));
                                                                    vec4 donor_replacementGLF_dead10res = _GLF_FUZZED(normalize(unpackUnorm4x8(114373u)));
                                                                    do {
                                                                        if (GLF_dead10collision(donor_replacementGLF_dead10pos, GLF_dead10picdata[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead4count, 8)])) {
                                                                            donor_replacementGLF_dead10res = GLF_dead10pal[_GLF_MAKE_IN_BOUNDS_INT((int(GLF_dead10picdata[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead4count, 8)].x) * int(GLF_dead10picdata[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead4count, 8)].y) + GLF_dead4count * 9 + 11) % 16, 16)];
                                                                        }
                                                                    } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))));
                                                                }
                                                            } else {
                                                            }
                                                        }
                                                    } else {
                                                        if (_GLF_DEAD(false)) {
                                                            {
                                                                break;
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    } else {
                                    }
                                    if (_GLF_WRAPPED_IF_FALSE(false)) {
                                    } else {
                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                            if (_GLF_DEAD(false)) {
                                                float donor_replacementGLF_dead19h = _GLF_FUZZED(normalize(-1.1));
                                                float donor_replacementGLF_dead19refh = _GLF_FUZZED(-1.9);
                                                vec2 donor_replacementGLF_dead19uvstep = _GLF_FUZZED(vec2(-4.5, -5920.1367));
                                                do {
                                                    if (_GLF_DEAD(false)) {
                                                        {
                                                            ;
                                                        }
                                                    }
                                                } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.x < tan(0.0)))));
                                                {
                                                    coord -= donor_replacementGLF_dead19uvstep;
                                                    donor_replacementGLF_dead19refh += GLF_dead5b_b;
                                                    donor_replacementGLF_dead19h = texture(GLF_dead19tex, coord).y;
                                                    if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < _GLF_IDENTITY(dot(vec3(0.0, 1.0, 1.0), vec3(1.0, _GLF_ZERO(0.0, injectionSwitch.x), 0.0)), dot(vec3(0.0, 1.0, 1.0), vec3(1.0, _GLF_ZERO(0.0, injectionSwitch.x), 0.0))))))) {
                                                    } else {
                                                        GLF_dead6MATRIX_N++;
                                                    }
                                                }
                                            }
                                        } else {
                                        }
                                        do {
                                            if (_GLF_WRAPPED_IF_FALSE(false)) {
                                            } else {
                                                if (coord.x > 1.0) {
                                                    do {
                                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                            if (_GLF_WRAPPED_IF_FALSE(false)) {
                                                            } else {
                                                                coord.x -= 1.0;
                                                                for (int _injected_loop_counter = _GLF_IDENTITY(1, (true ? 1 : _GLF_FUZZED(GLF_dead6MATRIX_N))); _GLF_WRAPPED_LOOP(_injected_loop_counter != (0 & (~23821))); _injected_loop_counter--) {
                                                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                                        float donor_replacementGLF_dead15A = _GLF_FUZZED(GLF_dead5b_b);
                                                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                                            {
                                                                                donor_replacementGLF_dead15A = 0.5 - donor_replacementGLF_dead15A;
                                                                            }
                                                                        }
                                                                        float donor_replacementGLF_dead15C = _GLF_FUZZED(GLF_dead5b_b);
                                                                        float donor_replacementGLF_dead15x0 = _GLF_FUZZED(-3.3);
                                                                        float donor_replacementGLF_dead15x1 = _GLF_FUZZED(float(ivec2(75852, 62798)[0]));
                                                                        do {
                                                                            while (abs(GLF_dead5b_b - donor_replacementGLF_dead15x1) >= .000000000000001) {
                                                                                float GLF_dead15h0 = donor_replacementGLF_dead15x0 - GLF_dead5b_b;
                                                                                float GLF_dead15h1 = donor_replacementGLF_dead15x1 - GLF_dead5b_b;
                                                                                float GLF_dead15k0 = GLF_dead15fx(donor_replacementGLF_dead15x0) - GLF_dead15fx(GLF_dead5b_b);
                                                                                float GLF_dead15k1 = GLF_dead15fx(donor_replacementGLF_dead15x1) - GLF_dead15fx(GLF_dead5b_b);
                                                                                GLF_dead5b_b = GLF_dead5b_b;
                                                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                                                    float donor_replacementGLF_dead19h = _GLF_FUZZED(donor_replacementGLF_dead15x0);
                                                                                    if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                                                    } else {
                                                                                        if (_GLF_DEAD(_GLF_IDENTITY(false, false || (false)))) {
                                                                                            int donor_replacementGLF_dead23iteration = _GLF_FUZZED(i);
                                                                                            if (donor_replacementGLF_dead23iteration < 1000) {
                                                                                                ;
                                                                                            } else {
                                                                                                ;
                                                                                            }
                                                                                        }
                                                                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                                                            int donor_replacementGLF_dead28cols = _GLF_FUZZED((GLF_dead6MATRIX_N * GLF_dead18MATRIX_N));
                                                                                            uint donor_replacementGLF_dead28matrix_number = _GLF_FUZZED(77791u);
                                                                                            {
                                                                                                for (int GLF_dead28rows = 2; GLF_dead28rows <= 4; GLF_dead28rows++) {
                                                                                                    for (int GLF_dead28c = 0; GLF_dead28c < donor_replacementGLF_dead28cols; GLF_dead28c++) {
                                                                                                        for (int GLF_dead28r = 0; GLF_dead28r < GLF_dead28rows; GLF_dead28r++) {
                                                                                                            switch (donor_replacementGLF_dead28matrix_number) {
                                                                                                                case 0u:
                                                                                                                    GLF_dead28m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 2)] = GLF_dead28one;
                                                                                                                    break;
                                                                                                                case 1u:
                                                                                                                    GLF_dead28m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 3)] = GLF_dead28one;
                                                                                                                    break;
                                                                                                                case 2u:
                                                                                                                    GLF_dead28m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 4)] = GLF_dead28one;
                                                                                                                    break;
                                                                                                                case 3u:
                                                                                                                    GLF_dead28m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 2)] = GLF_dead28one;
                                                                                                                    break;
                                                                                                                case 4u:
                                                                                                                    GLF_dead28m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 3)] = GLF_dead28one;
                                                                                                                    break;
                                                                                                                case 5u:
                                                                                                                    GLF_dead28m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 4)] = GLF_dead28one;
                                                                                                                    break;
                                                                                                                case 6u:
                                                                                                                    GLF_dead28m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 2)] = GLF_dead28one;
                                                                                                                    break;
                                                                                                                case 7u:
                                                                                                                    GLF_dead28m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 3)] = GLF_dead28one;
                                                                                                                    break;
                                                                                                                case 8u:
                                                                                                                    GLF_dead28m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 4)] = GLF_dead28one;
                                                                                                                    break;
                                                                                                            }
                                                                                                        }
                                                                                                    }
                                                                                                    donor_replacementGLF_dead28matrix_number = donor_replacementGLF_dead28matrix_number + 1u;
                                                                                                }
                                                                                            }
                                                                                        }
                                                                                    }
                                                                                    int donor_replacementGLF_dead19i = _GLF_FUZZED(i);
                                                                                    float donor_replacementGLF_dead19refh = _GLF_FUZZED(length(GLF_dead15polynomial));
                                                                                    vec2 donor_replacementGLF_dead19uvstep = _GLF_FUZZED(vec2(75.83, 6.0));
                                                                                    while (donor_replacementGLF_dead19h < donor_replacementGLF_dead19refh && donor_replacementGLF_dead19i < 32) {
                                                                                        if (_GLF_DEAD(_GLF_IDENTITY(false, !(!(false))))) {
                                                                                            {
                                                                                                discard;
                                                                                            }
                                                                                        }
                                                                                        coord -= donor_replacementGLF_dead19uvstep;
                                                                                        donor_replacementGLF_dead19refh += GLF_dead5b_b;
                                                                                        donor_replacementGLF_dead19h = texture(GLF_dead19tex, coord).y;
                                                                                        donor_replacementGLF_dead19i++;
                                                                                    }
                                                                                }
                                                                                donor_replacementGLF_dead15A = (((GLF_dead15h1) * (GLF_dead15k0)) - ((GLF_dead15h0) * (GLF_dead15k1))) / ((pow((GLF_dead15h0), 2.0) * (GLF_dead15h1)) - (pow((GLF_dead15h1), 2.0) * (GLF_dead15h0)));
                                                                                do {
                                                                                    if (_GLF_DEAD(false)) {
                                                                                        ivec2 donor_replacementGLF_dead26pos = _GLF_FUZZED(bitfieldInsert(ivec2(30900, 79656), ivec2(-73000, 93278), _injected_loop_counter, -37165));
                                                                                        {
                                                                                            float GLF_dead26p = (15.0 - abs(float(donor_replacementGLF_dead26pos.x - GLF_dead26dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead26pos.y, 256)]))) / 15.0;
                                                                                            ;
                                                                                        }
                                                                                    }
                                                                                    GLF_dead5b_b = (((GLF_dead15k0) - (donor_replacementGLF_dead15A * (pow((GLF_dead15h0), 2.0)))) / (GLF_dead15h0));
                                                                                    if (_GLF_DEAD(false)) {
                                                                                        if (length(coord) < 0.001) {
                                                                                            ;
                                                                                        }
                                                                                    }
                                                                                } while (_GLF_WRAPPED_LOOP(_GLF_IDENTITY(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)), (_GLF_IDENTITY(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)), (_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))) || false)) || false)));
                                                                                for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                                                                                    donor_replacementGLF_dead15C = GLF_dead15fx(GLF_dead5b_b);
                                                                                }
                                                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                                    GLF_dead5b_b = GLF_dead5b_b - ((2.0 * donor_replacementGLF_dead15C) / (GLF_dead5b_b + sign(GLF_dead5b_b) * sqrt(pow(GLF_dead5b_b, 2.0) - (4.0 * donor_replacementGLF_dead15A * donor_replacementGLF_dead15C))));
                                                                                } else {
                                                                                    if (_GLF_DEAD(false)) {
                                                                                        float donor_replacementGLF_dead29th = _GLF_FUZZED(dot(vec3(734.375, -8178.4357, -2.7), mix(GLF_dead15polynomial, vec3(-919.399, -18.69, -9130.5210), vec3(-2908.4199, 0.5, 3.2))));
                                                                                        {
                                                                                            donor_replacementGLF_dead29th = -donor_replacementGLF_dead29th;
                                                                                        }
                                                                                    }
                                                                                }
                                                                                for (int _injected_loop_counter = int(_GLF_ZERO(0.0, injectionSwitch.x)); _GLF_WRAPPED_LOOP(_injected_loop_counter < int(_GLF_ONE(1.0, injectionSwitch.y))); _injected_loop_counter++) {
                                                                                    do {
                                                                                        donor_replacementGLF_dead15x0 = donor_replacementGLF_dead15x1;
                                                                                    } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
                                                                                }
                                                                                donor_replacementGLF_dead15x1 = GLF_dead5b_b;
                                                                            }
                                                                        } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.x < abs(0.0)))));
                                                                    }
                                                                }
                                                            }
                                                        } else {
                                                        }
                                                    } while (_GLF_WRAPPED_LOOP(false));
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < length(vec2(0.0, 0.0)))))) {
                                                        vec3 donor_replacementGLF_dead20color = _GLF_FUZZED((mat4x3(-5.9, -8.7, -2.9, -4.3, 9434.2202, -69.30, 6.6, -6.7, 96.98, 39.26, 29.17, 8175.9485) * GLF_dead15_GLF_color));
                                                        if (_GLF_DEAD(false)) {
                                                            float donor_replacementGLF_dead29th = _GLF_FUZZED(GLF_dead5b_b);
                                                            {
                                                                donor_replacementGLF_dead29th = -donor_replacementGLF_dead29th;
                                                            }
                                                        }
                                                        {
                                                            donor_replacementGLF_dead20color.y += float(GLF_dead20obj.numbers[6]);
                                                        }
                                                    }
                                                }
                                            }
                                        } while (_GLF_WRAPPED_LOOP(false));
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            if (_GLF_DEAD(false)) {
                                                int donor_replacementGLF_dead8i = _GLF_FUZZED(i);
                                                int donor_replacementGLF_dead8iters = _GLF_FUZZED((GLF_dead6MATRIX_N << ivec2(-33177, 13079).x));
                                                for (donor_replacementGLF_dead8i = 0; donor_replacementGLF_dead8i < donor_replacementGLF_dead8iters; donor_replacementGLF_dead8i++) {
                                                    for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != ((1 << _GLF_IDENTITY(int(6), int(6))) >> _GLF_IDENTITY(int(6), int(6)))); _injected_loop_counter++) {
                                                        if (_GLF_DEAD(false)) {
                                                            {
                                                                GLF_dead5b_b = 1.0 - GLF_dead5b_b;
                                                            }
                                                        }
                                                        GLF_dead6MATRIX_N = (4 * GLF_dead6MATRIX_N * (1000 - GLF_dead6MATRIX_N)) / 1000;
                                                    }
                                                }
                                            }
                                        } else {
                                        }
                                        if (_GLF_DEAD(false)) {
                                            int donor_replacementGLF_dead25high = _GLF_FUZZED(i);
                                            int donor_replacementGLF_dead25low = _GLF_FUZZED(GLF_dead6MATRIX_N);
                                            int donor_replacementGLF_dead25m = _GLF_FUZZED(GLF_dead6MATRIX_N);
                                            if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                    {
                                                        GLF_dead5b_b = coord.x / coord.y;
                                                    }
                                                }
                                            } else {
                                                for (int GLF_dead25i = donor_replacementGLF_dead25low; GLF_dead25i < donor_replacementGLF_dead25high; GLF_dead25i += 2 * donor_replacementGLF_dead25m) {
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                        {
                                                            GLF_dead28_GLF_color = vec4(vec3(0.0), 1.0);
                                                        }
                                                    }
                                                    int GLF_dead25from = GLF_dead25i;
                                                    int GLF_dead25mid = GLF_dead25i + donor_replacementGLF_dead25m - 1;
                                                    int GLF_dead25to = min(GLF_dead25i + 2 * donor_replacementGLF_dead25m - 1, donor_replacementGLF_dead25high);
                                                    GLF_dead25merge(GLF_dead25from, GLF_dead25mid, GLF_dead25to);
                                                }
                                            }
                                        }
                                    }
                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                        {
                                            ;
                                        }
                                    }
                                } while (_GLF_WRAPPED_LOOP(false));
                            } else {
                            }
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        {
                            ;
                        }
                    }
                    if (coord.y > 1.0) {
                        for (int _injected_loop_counter = (0 & (-23634)); _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
                            if (_GLF_DEAD(false)) {
                                ivec2 donor_replacementGLF_dead11pos = _GLF_FUZZED(ivec2(-59935, 37474));
                                do {
                                    float GLF_dead11p = (15.0 - abs(float(donor_replacementGLF_dead11pos.x - GLF_dead11dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11pos.y, 256)]))) / 15.0;
                                    ;
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < tan(0.0))))) {
                                        ivec2 donor_replacementGLF_dead26pos = _GLF_FUZZED(clamp(donor_replacementGLF_dead11pos, donor_replacementGLF_dead11pos, ivec2(93695, -37534)));
                                        {
                                            float GLF_dead26p = (15.0 - abs(float(donor_replacementGLF_dead26pos.x - GLF_dead26dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead26pos.y, 256)]))) / 15.0;
                                            ;
                                        }
                                    }
                                    if (_GLF_DEAD(false)) {
                                        if (_GLF_DEAD(false)) {
                                            int donor_replacementGLF_dead25k = _GLF_FUZZED((i * findMSB(35414u)));
                                            {
                                                GLF_dead25temp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead25k++, 10)] = GLF_dead25data[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6MATRIX_N++, 10)];
                                            }
                                        }
                                        float donor_replacementGLF_dead15A = _GLF_FUZZED(step(GLF_dead5b_b, GLF_dead5b_b));
                                        float donor_replacementGLF_dead15C = _GLF_FUZZED(9.0);
                                        float donor_replacementGLF_dead15temp = _GLF_FUZZED(GLF_dead11p);
                                        float donor_replacementGLF_dead15x1 = _GLF_FUZZED(GLF_dead11p);
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                            int donor_replacementGLF_dead18i = _GLF_FUZZED(50360);
                                            int donor_replacementGLF_dead18j = _GLF_FUZZED((ivec4(-50224, 18693, 23656, 18347)[3] % (-14811)));
                                            if (_GLF_DEAD(false)) {
                                                vec2 donor_replacementGLF_dead29a = _GLF_FUZZED((normalize(donor_replacementGLF_dead15A) * GLF_dead24injectionSwitch));
                                                {
                                                    donor_replacementGLF_dead15x1 = donor_replacementGLF_dead29a.x / donor_replacementGLF_dead29a.y;
                                                }
                                            }
                                            mat4 donor_replacementGLF_dead18matrix_a = _GLF_FUZZED(mat4(-6881.0922, 1322.4495, -2.1, 3.7, 338.197, -5.3, 187.150, 0.9, -8463.4161, -34.62, 2.0, -240.604, -2.8, 1.9, -748.337, 646.639));
                                            {
                                                if (_GLF_DEAD(false)) {
                                                    {
                                                        break;
                                                    }
                                                }
                                                GLF_dead1_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead18i, 4)] -= (donor_replacementGLF_dead18matrix_a[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead18i, 4)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead18j, 4)] * GLF_dead1_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead18j, 4)]);
                                            }
                                        }
                                        float donor_replacementGLF_dead15x2 = _GLF_FUZZED(GLF_dead11p);
                                        {
                                            float GLF_dead15h0 = GLF_dead11p - donor_replacementGLF_dead15x2;
                                            float GLF_dead15h1 = donor_replacementGLF_dead15x1 - donor_replacementGLF_dead15x2;
                                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                int donor_replacementGLF_dead23iteration = _GLF_FUZZED(GLF_dead6MATRIX_N);
                                                {
                                                    ;
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                        {
                                                            if (donor_replacementGLF_dead11pos.x < GLF_dead26dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11pos.y, 256)] + 15 && donor_replacementGLF_dead11pos.x > GLF_dead26dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11pos.y, 256)] - 15) {
                                                                float GLF_dead26p = (15.0 - abs(float(donor_replacementGLF_dead11pos.x - GLF_dead26dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11pos.y, 256)]))) / 15.0;
                                                                ;
                                                            }
                                                            donor_replacementGLF_dead11pos.y++;
                                                        }
                                                    }
                                                }
                                            }
                                            float GLF_dead15k0 = GLF_dead15fx(GLF_dead11p) - GLF_dead15fx(donor_replacementGLF_dead15x2);
                                            if (_GLF_DEAD(false)) {
                                                ivec2 donor_replacementGLF_dead26pos = _GLF_FUZZED(ivec2(47282, 40598));
                                                do {
                                                    if (donor_replacementGLF_dead26pos.x < GLF_dead26dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead26pos.y, 256)] + 15 && donor_replacementGLF_dead26pos.x > GLF_dead26dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead26pos.y, 256)] - 15) {
                                                        float GLF_dead26p = (15.0 - abs(float(donor_replacementGLF_dead26pos.x - GLF_dead26dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead26pos.y, 256)]))) / 15.0;
                                                        if (_GLF_DEAD(false)) {
                                                            {
                                                                GLF_dead28_GLF_color = vec4(vec3(0.0), 1.0);
                                                            }
                                                        }
                                                        ;
                                                    }
                                                    donor_replacementGLF_dead26pos.y++;
                                                } while (_GLF_WRAPPED_LOOP(false));
                                            }
                                            float GLF_dead15k1 = GLF_dead15fx(donor_replacementGLF_dead15x1) - GLF_dead15fx(donor_replacementGLF_dead15x2);
                                            donor_replacementGLF_dead15temp = donor_replacementGLF_dead15x2;
                                            do {
                                                if (_GLF_WRAPPED_IF_FALSE(false)) {
                                                } else {
                                                    donor_replacementGLF_dead15A = (((GLF_dead15h1) * (GLF_dead15k0)) - ((GLF_dead15h0) * (GLF_dead15k1))) / ((pow((GLF_dead15h0), 2.0) * (GLF_dead15h1)) - (pow((GLF_dead15h1), 2.0) * (GLF_dead15h0)));
                                                }
                                            } while (_GLF_WRAPPED_LOOP(false));
                                            GLF_dead11p = (((GLF_dead15k0) - (donor_replacementGLF_dead15A * (pow((GLF_dead15h0), 2.0)))) / (GLF_dead15h0));
                                            donor_replacementGLF_dead15C = GLF_dead15fx(donor_replacementGLF_dead15x2);
                                            donor_replacementGLF_dead15x2 = donor_replacementGLF_dead15x2 - ((2.0 * donor_replacementGLF_dead15C) / (GLF_dead11p + sign(GLF_dead11p) * sqrt(pow(GLF_dead11p, 2.0) - (4.0 * donor_replacementGLF_dead15A * donor_replacementGLF_dead15C))));
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                int donor_replacementGLF_dead25k = _GLF_FUZZED((GLF_dead18MATRIX_N / _injected_loop_counter));
                                                if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < length(0.0))))) {
                                                    if (_GLF_DEAD(false)) {
                                                        float donor_replacementGLF_dead29z = _GLF_FUZZED(GLF_dead15h1);
                                                        if (coord.y > coord.x) {
                                                            donor_replacementGLF_dead29z = coord.x / coord.y;
                                                        } else {
                                                            donor_replacementGLF_dead29z = coord.y / coord.x;
                                                        }
                                                    }
                                                } else {
                                                    GLF_dead25temp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead25k++, 10)] = GLF_dead25data[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6MATRIX_N++, 10)];
                                                }
                                            }
                                            do {
                                                GLF_dead11p = donor_replacementGLF_dead15x1;
                                            } while (_GLF_WRAPPED_LOOP(false));
                                            for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
                                                donor_replacementGLF_dead15x1 = donor_replacementGLF_dead15temp;
                                            }
                                        }
                                        if (_GLF_DEAD(_GLF_IDENTITY(false, !(_GLF_IDENTITY(!(false), !(!(!(false)))))))) {
                                            int donor_replacementGLF_dead28cols = _GLF_FUZZED(GLF_dead6MATRIX_N);
                                            uint donor_replacementGLF_dead28matrix_number = _GLF_FUZZED(139271u);
                                            int donor_replacementGLF_dead28rows = _GLF_FUZZED(79539);
                                            for (int GLF_dead28c = 0; GLF_dead28c < donor_replacementGLF_dead28cols; GLF_dead28c++) {
                                                for (int GLF_dead28r = 0; GLF_dead28r < donor_replacementGLF_dead28rows; GLF_dead28r++) {
                                                    switch (donor_replacementGLF_dead28matrix_number) {
                                                        case 0u:
                                                            GLF_dead28m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 2)] = GLF_dead28one;
                                                            break;
                                                        case 1u:
                                                            GLF_dead28m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 3)] = GLF_dead28one;
                                                            break;
                                                        case 2u:
                                                            GLF_dead28m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 4)] = GLF_dead28one;
                                                            break;
                                                        case 3u:
                                                            GLF_dead28m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 2)] = GLF_dead28one;
                                                            break;
                                                        case 4u:
                                                            GLF_dead28m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 3)] = GLF_dead28one;
                                                            break;
                                                        case 5u:
                                                            GLF_dead28m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 4)] = GLF_dead28one;
                                                            break;
                                                        case 6u:
                                                            GLF_dead28m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 2)] = GLF_dead28one;
                                                            break;
                                                        case 7u:
                                                            GLF_dead28m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 3)] = GLF_dead28one;
                                                            break;
                                                        case 8u:
                                                            GLF_dead28m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 4)] = GLF_dead28one;
                                                            break;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                        if (_GLF_DEAD(false)) {
                                            {
                                                float GLF_dead26p = (15.0 - abs(float(donor_replacementGLF_dead11pos.x - GLF_dead26dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead11pos.y, 256)]))) / 15.0;
                                                ;
                                            }
                                        }
                                        {
                                            ;
                                        }
                                    }
                                } while (_GLF_WRAPPED_LOOP(false));
                                if (_GLF_WRAPPED_IF_FALSE(false)) {
                                } else {
                                    if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_ZERO(0.0, injectionSwitch.x))))) {
                                        do {
                                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                float donor_replacementGLF_dead22s = _GLF_FUZZED(dot((res + 48.62), (GLF_dead2_GLF_color * GLF_dead5b_b)));
                                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                    ivec2 donor_replacementGLF_dead26pos = _GLF_FUZZED(donor_replacementGLF_dead11pos);
                                                    {
                                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                            if (donor_replacementGLF_dead26pos.x < GLF_dead26dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead26pos.y, 256)] + 15 && donor_replacementGLF_dead26pos.x > GLF_dead26dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead26pos.y, 256)] - 15) {
                                                                float GLF_dead26p = (15.0 - abs(float(donor_replacementGLF_dead26pos.x - GLF_dead26dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead26pos.y, 256)]))) / 15.0;
                                                                ;
                                                            }
                                                        } else {
                                                        }
                                                        donor_replacementGLF_dead26pos.y++;
                                                    }
                                                }
                                                if (_GLF_WRAPPED_IF_FALSE(false)) {
                                                } else {
                                                    if (_GLF_DEAD(false)) {
                                                        vec2 donor_replacementGLF_dead29a = _GLF_FUZZED((vec2(83.07, -8.7) / GLF_dead5b_b));
                                                        float donor_replacementGLF_dead29th = _GLF_FUZZED(dFdyCoarse(refract(donor_replacementGLF_dead22s, -906.123, GLF_dead5b_b)));
                                                        if (donor_replacementGLF_dead29a.y < donor_replacementGLF_dead29a.x) {
                                                            donor_replacementGLF_dead29th = 0.5 - donor_replacementGLF_dead29th;
                                                        }
                                                    }
                                                    donor_replacementGLF_dead22s += 0.2;
                                                }
                                            }
                                        } while (_GLF_WRAPPED_LOOP(false));
                                    } else {
                                        for (int _injected_loop_counter = (((1 & 1) << _GLF_IDENTITY(int(1), int(1))) >> _GLF_IDENTITY(int(1), int(1))); _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                        float donor_replacementGLF_dead29th = _GLF_FUZZED(GLF_dead5b_b);
                                                        if (coord.x < 0.0) {
                                                            donor_replacementGLF_dead29th = 1.0 - donor_replacementGLF_dead29th;
                                                        }
                                                    }
                                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                                        ;
                                                    } else {
                                                    }
                                                }
                                                int donor_replacementGLF_dead14i = _GLF_FUZZED(15057);
                                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                    ivec2 donor_replacementGLF_dead26pos = _GLF_FUZZED(ivec2(-91350, -86351));
                                                    if (donor_replacementGLF_dead26pos.x < GLF_dead26dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead26pos.y, 256)] + 15 && donor_replacementGLF_dead26pos.x > GLF_dead26dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead26pos.y, 256)] - 15) {
                                                        float GLF_dead26p = (15.0 - abs(float(donor_replacementGLF_dead26pos.x - GLF_dead26dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead26pos.y, 256)]))) / 15.0;
                                                        ;
                                                    }
                                                }
                                                float donor_replacementGLF_dead14s = _GLF_FUZZED(-6660.1025);
                                                if (_GLF_DEAD(false)) {
                                                    float donor_replacementGLF_dead22s = _GLF_FUZZED(-8732.5090);
                                                    {
                                                        ;
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                            ivec2 donor_replacementGLF_dead26pos = _GLF_FUZZED(ivec2(-91888, 85192));
                                                            {
                                                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                                    if (donor_replacementGLF_dead26pos.x < GLF_dead26dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead26pos.y, 256)] + 15 && donor_replacementGLF_dead26pos.x > GLF_dead26dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead26pos.y, 256)] - 15) {
                                                                        float GLF_dead26p = (15.0 - abs(float(donor_replacementGLF_dead26pos.x - GLF_dead26dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead26pos.y, 256)]))) / 15.0;
                                                                        for (int _injected_loop_counter = (0 >> _GLF_IDENTITY(int(3), int(3))); _GLF_WRAPPED_LOOP(_injected_loop_counter != int(_GLF_ONE(1.0, injectionSwitch.y))); _injected_loop_counter++) {
                                                                            ;
                                                                        }
                                                                    }
                                                                } else {
                                                                }
                                                                donor_replacementGLF_dead26pos.y++;
                                                            }
                                                        }
                                                    }
                                                }
                                                if (float(donor_replacementGLF_dead14i) >= GLF_dead5b_b) {
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                        int donor_replacementGLF_dead21i = _GLF_FUZZED(i);
                                                        {
                                                            GLF_dead1_GLF_color = GLF_dead21pal[_GLF_MAKE_IN_BOUNDS_INT((int(GLF_dead21picdata[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead21i, 8)].x) * int(GLF_dead21picdata[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead21i, 8)].y) + donor_replacementGLF_dead21i * 9 + 11) % 16, 16)];
                                                            if (_GLF_DEAD(false)) {
                                                                ivec2 donor_replacementGLF_dead26pos = _GLF_FUZZED(min(ivec2(23241, -2796), donor_replacementGLF_dead11pos));
                                                                {
                                                                    if (donor_replacementGLF_dead26pos.x < GLF_dead26dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead26pos.y, 256)] + 15 && donor_replacementGLF_dead26pos.x > GLF_dead26dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead26pos.y, 256)] - 15) {
                                                                        float GLF_dead26p = (15.0 - abs(float(donor_replacementGLF_dead26pos.x - GLF_dead26dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead26pos.y, 256)]))) / 15.0;
                                                                        ;
                                                                    }
                                                                    donor_replacementGLF_dead26pos.y++;
                                                                }
                                                            }
                                                        }
                                                    }
                                                    ;
                                                    if (_GLF_DEAD(false)) {
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                            {
                                                                donor_replacementGLF_dead14s = 0.5 + float(GLF_dead25data[7]) / 10.0;
                                                            }
                                                        }
                                                        if (_GLF_DEAD(false)) {
                                                            uint donor_replacementGLF_dead28matrix_number = _GLF_FUZZED(max(packHalf2x16(GLF_dead13injectionSwitch), 93398u));
                                                            {
                                                                for (int GLF_dead28r = 0; GLF_dead28r < GLF_dead18MATRIX_N; GLF_dead28r++) {
                                                                    switch (donor_replacementGLF_dead28matrix_number) {
                                                                        case 0u:
                                                                            GLF_dead28m22[_GLF_MAKE_IN_BOUNDS_INT(_injected_loop_counter, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 2)] = GLF_dead28one;
                                                                            break;
                                                                        case 1u:
                                                                            GLF_dead28m23[_GLF_MAKE_IN_BOUNDS_INT(_injected_loop_counter, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 3)] = GLF_dead28one;
                                                                            break;
                                                                        case 2u:
                                                                            GLF_dead28m24[_GLF_MAKE_IN_BOUNDS_INT(_injected_loop_counter, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 4)] = GLF_dead28one;
                                                                            break;
                                                                        case 3u:
                                                                            GLF_dead28m32[_GLF_MAKE_IN_BOUNDS_INT(_injected_loop_counter, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 2)] = GLF_dead28one;
                                                                            break;
                                                                        case 4u:
                                                                            GLF_dead28m33[_GLF_MAKE_IN_BOUNDS_INT(_injected_loop_counter, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 3)] = GLF_dead28one;
                                                                            break;
                                                                        case 5u:
                                                                            GLF_dead28m34[_GLF_MAKE_IN_BOUNDS_INT(_injected_loop_counter, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 4)] = GLF_dead28one;
                                                                            break;
                                                                        case 6u:
                                                                            GLF_dead28m42[_GLF_MAKE_IN_BOUNDS_INT(_injected_loop_counter, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 2)] = GLF_dead28one;
                                                                            break;
                                                                        case 7u:
                                                                            GLF_dead28m43[_GLF_MAKE_IN_BOUNDS_INT(_injected_loop_counter, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 3)] = GLF_dead28one;
                                                                            break;
                                                                        case 8u:
                                                                            GLF_dead28m44[_GLF_MAKE_IN_BOUNDS_INT(_injected_loop_counter, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 4)] = GLF_dead28one;
                                                                            break;
                                                                    }
                                                                }
                                                            }
                                                        }
                                                        vec2 donor_replacementGLF_dead17coord = _GLF_FUZZED((mat4x2(-5568.0538, 8.0, 0.7, -381.760, 99.51, -8.6, -36.76, 9.0) * round(res)));
                                                        vec4 donor_replacementGLF_dead17res = _GLF_FUZZED(GLF_dead15_GLF_color);
                                                        {
                                                            donor_replacementGLF_dead17res = texture(GLF_dead17tex, donor_replacementGLF_dead17coord);
                                                        }
                                                    }
                                                    if (_GLF_DEAD(false)) {
                                                        vec3 donor_replacementGLF_dead20color = _GLF_FUZZED((ivec2(51939, 18964), GLF_dead15polynomial));
                                                        {
                                                            donor_replacementGLF_dead20color.z += float(GLF_dead20obj.numbers[7]);
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            coord.y -= 1.0;
                        }
                    }
                    if (_GLF_WRAPPED_IF_FALSE(false)) {
                    } else {
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            {
                                ;
                            }
                        }
                        do {
                            coord *= 2.0;
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                vec2 donor_replacementGLF_dead29a = _GLF_FUZZED(exp(GLF_dead4injectionSwitch));
                                float donor_replacementGLF_dead29th = _GLF_FUZZED(fma((GLF_dead5b_b - vec3(0.8, 56.95, -568.191)).r, float(true), abs(-640.569)));
                                if (donor_replacementGLF_dead29a.y < donor_replacementGLF_dead29a.x) {
                                    donor_replacementGLF_dead29th = 0.5 - donor_replacementGLF_dead29th;
                                }
                            }
                            if (_GLF_DEAD(false)) {
                                vec2 donor_replacementGLF_dead17coord = _GLF_FUZZED(smoothstep(vec2(-2.3, -4.6), (GLF_dead4injectionSwitch * (+GLF_dead5b_b)), vec2(-9.4, 636.584)));
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                    float donor_replacementGLF_dead29z = _GLF_FUZZED(390.685);
                                    {
                                        donor_replacementGLF_dead29z = coord.x / coord.y;
                                    }
                                }
                                if (donor_replacementGLF_dead17coord.y > 1.0) {
                                    if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                    } else {
                                        donor_replacementGLF_dead17coord.y -= 1.0;
                                    }
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                        vec2 donor_replacementGLF_dead29a = _GLF_FUZZED(vec2(0.5, -8.2));
                                        float donor_replacementGLF_dead29z = _GLF_FUZZED(length((GLF_dead15polynomial)));
                                        {
                                            donor_replacementGLF_dead29z = donor_replacementGLF_dead29a.x / donor_replacementGLF_dead29a.y;
                                        }
                                    }
                                }
                            }
                        } while (_GLF_WRAPPED_LOOP(false));
                    }
                    i++;
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                            if (length(coord) < 0.001) {
                                ;
                            }
                        }
                        int donor_replacementGLF_dead8v = _GLF_FUZZED(abs(clamp(85963, -21118, i)));
                        {
                            do {
                                donor_replacementGLF_dead8v = (4 * donor_replacementGLF_dead8v * (1000 - donor_replacementGLF_dead8v)) / 1000;
                            } while (_GLF_WRAPPED_LOOP(false));
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                ivec2 donor_replacementGLF_dead26pos = _GLF_FUZZED(ivec2(96351, -81163));
                                if (donor_replacementGLF_dead26pos.x < GLF_dead26dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead26pos.y, 256)] + 15 && donor_replacementGLF_dead26pos.x > GLF_dead26dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead26pos.y, 256)] - 15) {
                                    float GLF_dead26p = (15.0 - abs(float(donor_replacementGLF_dead26pos.x - GLF_dead26dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead26pos.y, 256)]))) / 15.0;
                                    ;
                                }
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                int donor_replacementGLF_dead21i = _GLF_FUZZED(_injected_loop_counter);
                                vec2 donor_replacementGLF_dead21pos = _GLF_FUZZED(coord);
                                {
                                    if (GLF_dead21collision(donor_replacementGLF_dead21pos, GLF_dead21picdata[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead21i, 8)])) {
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                            int donor_replacementGLF_dead28cols = _GLF_FUZZED(GLF_dead18MATRIX_N);
                                            uint donor_replacementGLF_dead28matrix_number = _GLF_FUZZED(50421u);
                                            {
                                                for (int GLF_dead28rows = 2; GLF_dead28rows <= 4; GLF_dead28rows++) {
                                                    for (int GLF_dead28c = 0; GLF_dead28c < donor_replacementGLF_dead28cols; GLF_dead28c++) {
                                                        for (int GLF_dead28r = 0; GLF_dead28r < GLF_dead28rows; GLF_dead28r++) {
                                                            switch (donor_replacementGLF_dead28matrix_number) {
                                                                case 0u:
                                                                    GLF_dead28m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 2)] = GLF_dead28one;
                                                                    break;
                                                                case 1u:
                                                                    GLF_dead28m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 3)] = GLF_dead28one;
                                                                    break;
                                                                case 2u:
                                                                    GLF_dead28m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 4)] = GLF_dead28one;
                                                                    break;
                                                                case 3u:
                                                                    GLF_dead28m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 2)] = GLF_dead28one;
                                                                    break;
                                                                case 4u:
                                                                    GLF_dead28m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 3)] = GLF_dead28one;
                                                                    break;
                                                                case 5u:
                                                                    GLF_dead28m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 4)] = GLF_dead28one;
                                                                    break;
                                                                case 6u:
                                                                    GLF_dead28m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 2)] = GLF_dead28one;
                                                                    break;
                                                                case 7u:
                                                                    GLF_dead28m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 3)] = GLF_dead28one;
                                                                    break;
                                                                case 8u:
                                                                    GLF_dead28m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 4)] = GLF_dead28one;
                                                                    break;
                                                            }
                                                        }
                                                    }
                                                    donor_replacementGLF_dead28matrix_number = donor_replacementGLF_dead28matrix_number + 1u;
                                                }
                                            }
                                        }
                                        _GLF_color = GLF_dead21pal[_GLF_MAKE_IN_BOUNDS_INT((int(GLF_dead21picdata[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead21i, 8)].x) * int(GLF_dead21picdata[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead21i, 8)].y) + donor_replacementGLF_dead21i * 9 + 11) % 16, 16)];
                                    }
                                }
                            }
                        }
                    }
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        if (_GLF_DEAD(false)) {
                            vec3 donor_replacementGLF_dead5setting = _GLF_FUZZED(mix(vec3(-3.4, -89.86, 848.333), vec3(-5.4, 6206.0940, 445.651), bvec3(true, true, true)));
                            {
                                if (_GLF_DEAD(false)) {
                                    vec2 donor_replacementGLF_dead19coord = _GLF_FUZZED(acos(GLF_dead4injectionSwitch));
                                    int donor_replacementGLF_dead19i = _GLF_FUZZED(75941);
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                        int donor_replacementGLF_dead28cols = _GLF_FUZZED((ivec4(15437, -40637, 75900, 63096) + ivec4(-35697, -38655, 18357, 71172))[0]);
                                        uint donor_replacementGLF_dead28matrix_number = _GLF_FUZZED(bitfieldReverse(39372u));
                                        for (int GLF_dead28rows = 2; GLF_dead28rows <= 4; GLF_dead28rows++) {
                                            for (int GLF_dead28c = 0; GLF_dead28c < donor_replacementGLF_dead28cols; GLF_dead28c++) {
                                                for (int GLF_dead28r = 0; GLF_dead28r < GLF_dead28rows; GLF_dead28r++) {
                                                    switch (donor_replacementGLF_dead28matrix_number) {
                                                        case 0u:
                                                            GLF_dead28m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 2)] = GLF_dead28one;
                                                            break;
                                                        case 1u:
                                                            GLF_dead28m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 3)] = GLF_dead28one;
                                                            break;
                                                        case 2u:
                                                            GLF_dead28m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 4)] = GLF_dead28one;
                                                            break;
                                                        case 3u:
                                                            GLF_dead28m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 2)] = GLF_dead28one;
                                                            break;
                                                        case 4u:
                                                            GLF_dead28m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 3)] = GLF_dead28one;
                                                            break;
                                                        case 5u:
                                                            GLF_dead28m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 4)] = GLF_dead28one;
                                                            break;
                                                        case 6u:
                                                            GLF_dead28m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 2)] = GLF_dead28one;
                                                            break;
                                                        case 7u:
                                                            GLF_dead28m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 3)] = GLF_dead28one;
                                                            break;
                                                        case 8u:
                                                            GLF_dead28m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 4)] = GLF_dead28one;
                                                            break;
                                                    }
                                                }
                                            }
                                            donor_replacementGLF_dead28matrix_number = donor_replacementGLF_dead28matrix_number + 1u;
                                        }
                                    }
                                    do {
                                        do {
                                            donor_replacementGLF_dead19coord -= coord;
                                        } while (_GLF_WRAPPED_LOOP(false));
                                        do {
                                            for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > ((-5444) & 0)); _injected_loop_counter--) {
                                                GLF_dead5b_b += GLF_dead5b_b;
                                            }
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                float donor_replacementGLF_dead29th = _GLF_FUZZED(tan(GLF_dead5b_b));
                                                {
                                                    donor_replacementGLF_dead29th = 1.0 - donor_replacementGLF_dead29th;
                                                }
                                            }
                                        } while (_GLF_WRAPPED_LOOP(false));
                                        do {
                                            GLF_dead5b_b = texture(GLF_dead19tex, donor_replacementGLF_dead19coord).y;
                                        } while (_GLF_WRAPPED_LOOP(false));
                                        donor_replacementGLF_dead19i++;
                                    } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.x < tan(0.0)))));
                                }
                                do {
                                    ;
                                } while (_GLF_WRAPPED_LOOP(false));
                            }
                        }
                    } else {
                    }
                }
            } while (_GLF_WRAPPED_LOOP(false));
        }
    }
    if (coord.x < 1.0 && coord.y < 1.0) {
        res = texture(tex, coord);
    }
    if (_GLF_DEAD(false)) {
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_ZERO(0.0, injectionSwitch.x))))) {
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                {
                    ;
                }
            }
            int donor_replacementGLF_dead21i = _GLF_FUZZED(min(mix(i, GLF_dead18MATRIX_N, false), GLF_dead18MATRIX_N));
            {
                if (GLF_dead21collision(coord, GLF_dead21picdata[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead21i, 8)])) {
                    GLF_dead2_GLF_color = GLF_dead21pal[_GLF_MAKE_IN_BOUNDS_INT((int(GLF_dead21picdata[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead21i, 8)].x) * int(GLF_dead21picdata[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead21i, 8)].y) + donor_replacementGLF_dead21i * 9 + 11) % 16, 16)];
                }
            }
        }
        float donor_replacementGLF_dead6beta = _GLF_FUZZED(abs(inversesqrt(-398.140)));
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            vec4 donor_replacementGLF_dead22c = _GLF_FUZZED((GLF_dead13injectionSwitch * mat4x2(9.4, -2.5, -908.694, 317.690, 55.57, -37.55, 701.504, -3284.5834)));
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                {
                    GLF_dead5b_b = 0.5 - GLF_dead5b_b;
                }
            }
            if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < _GLF_IDENTITY(dot(vec2(1.0, 0.0), vec2(abs(0.0), 1.0)), dot(vec2(1.0, 0.0), vec2(abs(0.0), 1.0))))))) {
            } else {
                for (int GLF_dead22i = 0; GLF_dead22i < 3; GLF_dead22i++) {
                    if (donor_replacementGLF_dead22c[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead22i, 4)] >= 1.0) {
                        donor_replacementGLF_dead22c[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead22i, 4)] = donor_replacementGLF_dead22c[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead22i, 4)] * donor_replacementGLF_dead22c[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead22i, 4)];
                    }
                }
            }
        }
        vec4 donor_replacementGLF_dead6matrix_b = _GLF_FUZZED((res * 8.0));
        if (_GLF_DEAD(false)) {
            int donor_replacementGLF_dead25low = _GLF_FUZZED((mat4x2(8.1, -9222.2717, 9779.5600, -7.5, -8.1, -28.52, 8.7, -1974.5928), i));
            for (int GLF_dead25i = donor_replacementGLF_dead25low; GLF_dead25i < i; GLF_dead25i += 2 * i) {
                int GLF_dead25from = GLF_dead25i;
                int GLF_dead25mid = GLF_dead25i + i - 1;
                int GLF_dead25to = min(GLF_dead25i + 2 * i - 1, i);
                GLF_dead25merge(GLF_dead25from, GLF_dead25mid, GLF_dead25to);
            }
        }
        vec4 donor_replacementGLF_dead6matrix_u = _GLF_FUZZED(res);
        for (int GLF_dead6b = GLF_dead6MATRIX_N - 1; GLF_dead6b >= i; GLF_dead6b--) {
            do {
                if (_GLF_DEAD(false)) {
                    {
                        ;
                    }
                }
                donor_replacementGLF_dead6matrix_b[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6b, 4)] = donor_replacementGLF_dead6matrix_b[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6b, 4)] - (donor_replacementGLF_dead6beta * donor_replacementGLF_dead6matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6b, 4)]);
            } while (_GLF_WRAPPED_LOOP(false));
        }
    }
    if (_GLF_WRAPPED_IF_TRUE(true)) {
        if (_GLF_WRAPPED_IF_FALSE(false)) {
        } else {
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                if (_GLF_DEAD(false)) {
                    if (_GLF_DEAD(false)) {
                        {
                            ;
                        }
                    }
                    vec3 donor_replacementGLF_dead13color = _GLF_FUZZED(vec3(2810.5320, 628.589, 8085.9947));
                    if (coord.x > (2.0 / 4.0)) {
                        int GLF_dead13count = int(GLF_dead13injectionSwitch.x);
                        do {
                            donor_replacementGLF_dead13color -= GLF_dead13palette(vec3(float(GLF_dead13obj.numbers[4]) * 0.1), trunc(vec3(0.1)), vec3(float(GLF_dead13obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_dead13injectionSwitch.y), 10)]) * 0.1), vec3(GLF_dead13injectionSwitch.x, float(GLF_dead13obj.numbers[2]) * 0.1, float(GLF_dead13obj.numbers[8]) * 0.1));
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(true, (true) && true))) {
                                GLF_dead13count++;
                            } else {
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                int donor_replacementGLF_dead23iteration = _GLF_FUZZED((GLF_dead18MATRIX_N & (true ? (-16180) : GLF_dead18MATRIX_N)));
                                do {
                                    ;
                                } while (_GLF_WRAPPED_LOOP(false));
                            }
                        } while (GLF_dead13count != GLF_dead13obj.numbers[1]);
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                            {
                                ;
                            }
                        }
                        for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
                            for (int _injected_loop_counter = (((0 << _GLF_IDENTITY(int(4), int(4))) << _GLF_IDENTITY(int(1), int(1))) & (-42918)); _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
                                if (_GLF_DEAD(false)) {
                                    {
                                        break;
                                        if (_GLF_DEAD(false)) {
                                            int donor_replacementGLF_dead27i = _GLF_FUZZED(((-76624) << abs(ivec2(14709, -155)).g));
                                            if (donor_replacementGLF_dead27i < int(GLF_dead27gl_FragCoord.x)) {
                                                break;
                                            }
                                        }
                                    }
                                }
                                coord += vec2(GLF_dead13count + int(GLF_dead13injectionSwitch.y), GLF_dead13count + int(GLF_dead13injectionSwitch.x));
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                int donor_replacementGLF_dead28c = _GLF_FUZZED(max((_injected_loop_counter | _injected_loop_counter), i));
                                uint donor_replacementGLF_dead28matrix_number = _GLF_FUZZED(3531u);
                                int donor_replacementGLF_dead28rows = _GLF_FUZZED(min(i, bitfieldInsert(i, _injected_loop_counter, GLF_dead6MATRIX_N, GLF_dead18MATRIX_N)));
                                {
                                    for (int GLF_dead28r = 0; GLF_dead28r < donor_replacementGLF_dead28rows; GLF_dead28r++) {
                                        switch (donor_replacementGLF_dead28matrix_number) {
                                            case 0u:
                                                GLF_dead28m22[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead28c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 2)] = GLF_dead28one;
                                                break;
                                            case 1u:
                                                GLF_dead28m23[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead28c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 3)] = GLF_dead28one;
                                                break;
                                            case 2u:
                                                GLF_dead28m24[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead28c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 4)] = GLF_dead28one;
                                                break;
                                            case 3u:
                                                GLF_dead28m32[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead28c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 2)] = GLF_dead28one;
                                                break;
                                            case 4u:
                                                GLF_dead28m33[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead28c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 3)] = GLF_dead28one;
                                                break;
                                            case 5u:
                                                GLF_dead28m34[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead28c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 4)] = GLF_dead28one;
                                                break;
                                            case 6u:
                                                GLF_dead28m42[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead28c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 2)] = GLF_dead28one;
                                                break;
                                            case 7u:
                                                GLF_dead28m43[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead28c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 3)] = GLF_dead28one;
                                                break;
                                            case 8u:
                                                GLF_dead28m44[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead28c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 4)] = GLF_dead28one;
                                                break;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                float donor_replacementGLF_dead3c_im = _GLF_FUZZED(sinh(-407.635));
                float donor_replacementGLF_dead3c_re = _GLF_FUZZED(1481.8802);
                int donor_replacementGLF_dead3iteration = _GLF_FUZZED(-62947);
                for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
                    for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < int(_GLF_ONE(1.0, injectionSwitch.y))); _injected_loop_counter++) {
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            vec4 donor_replacementGLF_dead7res = _GLF_FUZZED(GLF_dead1_GLF_color);
                            float donor_replacementGLF_dead7uvstep = _GLF_FUZZED(8.4);
                            do {
                                do {
                                    do {
                                        if (_GLF_DEAD(false)) {
                                            {
                                                donor_replacementGLF_dead7uvstep = 0.5 + float(GLF_dead25data[7]) / 10.0;
                                            }
                                        }
                                        donor_replacementGLF_dead7res += texture(GLF_dead7tex, coord + vec2(float(i - 1) * donor_replacementGLF_dead7uvstep, float(i - 1) * donor_replacementGLF_dead7uvstep)) * GLF_dead7weights[_GLF_MAKE_IN_BOUNDS_INT(i * 3 + i, 9)];
                                    } while (_GLF_WRAPPED_LOOP(false));
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < sqrt(0.0))))) {
                                        {
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                if (coord.y < 0.0) {
                                                    GLF_dead5b_b = -GLF_dead5b_b;
                                                }
                                            }
                                            ;
                                        }
                                    }
                                } while (_GLF_WRAPPED_LOOP(false));
                            } while (_GLF_WRAPPED_LOOP(false));
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            vec3 donor_replacementGLF_dead20color = _GLF_FUZZED((mat2x3(-5.9, 11.09, -6442.0708, -227.266, 4518.9040, 2904.0090) * coord));
                            vec2 donor_replacementGLF_dead20uv = _GLF_FUZZED(smoothstep(GLF_dead13injectionSwitch, coord, GLF_dead13injectionSwitch));
                            for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                                if (donor_replacementGLF_dead20uv.x > (3.0 / 4.0)) {
                                    donor_replacementGLF_dead20color.z += float(GLF_dead20obj.numbers[3]);
                                    if (_GLF_DEAD(false)) {
                                        if (coord.x < 0.0) {
                                            donor_replacementGLF_dead3c_re = 1.0 - donor_replacementGLF_dead3c_re;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                int donor_replacementGLF_dead3k = _GLF_FUZZED(32903);
                float donor_replacementGLF_dead3x = _GLF_FUZZED(-241.664);
                do {
                    if (_GLF_DEAD(false)) {
                        int donor_replacementGLF_dead16y = _GLF_FUZZED(i);
                        for (int _injected_loop_counter = (0 & 69924); _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
                            if (_GLF_WRAPPED_IF_FALSE(false)) {
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                    int donor_replacementGLF_dead25i = _GLF_FUZZED((bool(_injected_loop_counter) ? GLF_dead6MATRIX_N : (mat3x2(2.6, 6.2, -8.4, 521.318, 466.011, -468.668), (GLF_dead18MATRIX_N ^ i))));
                                    int donor_replacementGLF_dead25k = _GLF_FUZZED(((donor_replacementGLF_dead3iteration * donor_replacementGLF_dead3iteration) << _injected_loop_counter));
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                        } else {
                                            if (_GLF_DEAD(false)) {
                                                if (coord.y > coord.x) {
                                                    donor_replacementGLF_dead3c_re = coord.x / coord.y;
                                                } else {
                                                    donor_replacementGLF_dead3c_re = coord.y / coord.x;
                                                }
                                            }
                                            GLF_dead25temp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead25k++, 10)] = GLF_dead25data[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead25i++, 10)];
                                        }
                                    } else {
                                    }
                                }
                            } else {
                                if (donor_replacementGLF_dead3k * donor_replacementGLF_dead3k + donor_replacementGLF_dead16y * donor_replacementGLF_dead16y > 262144) {
                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= _GLF_ZERO(0.0, injectionSwitch.x))))) {
                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                            ivec2 donor_replacementGLF_dead26pos = _GLF_FUZZED(ivec2(58189, 47349));
                                            do {
                                                if (donor_replacementGLF_dead26pos.x < GLF_dead26dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead26pos.y, 256)] + 15 && donor_replacementGLF_dead26pos.x > GLF_dead26dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead26pos.y, 256)] - 15) {
                                                    if (_GLF_DEAD(false)) {
                                                        float donor_replacementGLF_dead29z = _GLF_FUZZED(1575.8278);
                                                        {
                                                            donor_replacementGLF_dead29z = coord.y / coord.x;
                                                        }
                                                    }
                                                    float GLF_dead26p = (15.0 - abs(float(donor_replacementGLF_dead26pos.x - GLF_dead26dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead26pos.y, 256)]))) / 15.0;
                                                    ;
                                                }
                                                donor_replacementGLF_dead26pos.y++;
                                            } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
                                        }
                                        if (_GLF_WRAPPED_IF_FALSE(false)) {
                                        } else {
                                            ;
                                        }
                                    } else {
                                    }
                                }
                            }
                        }
                    }
                } while (_GLF_WRAPPED_LOOP(_GLF_IDENTITY(false, !(!(false)))));
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < determinant(mat4(0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, abs(0.0), 0.0, 0.0, 0.0, 0.0)))))) {
                        int donor_replacementGLF_dead8v = _GLF_FUZZED(donor_replacementGLF_dead3k);
                        if (_GLF_DEAD(false)) {
                            if (_GLF_DEAD(false)) {
                                {
                                    ;
                                }
                            }
                            if (GLF_dead6MATRIX_N < 1000) {
                                ;
                            } else {
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                    do {
                                        ;
                                    } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.x < log(1.0)))));
                                }
                                for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
                                    ;
                                }
                                if (_GLF_DEAD(false)) {
                                    int donor_replacementGLF_dead28cols = _GLF_FUZZED((GLF_dead25N | GLF_dead18MATRIX_N));
                                    uint donor_replacementGLF_dead28matrix_number = _GLF_FUZZED(186844u);
                                    for (int GLF_dead28c = 0; GLF_dead28c < donor_replacementGLF_dead28cols; GLF_dead28c++) {
                                        for (int GLF_dead28r = 0; GLF_dead28r < GLF_dead18MATRIX_N; GLF_dead28r++) {
                                            switch (donor_replacementGLF_dead28matrix_number) {
                                                case 0u:
                                                    GLF_dead28m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 2)] = GLF_dead28one;
                                                    break;
                                                case 1u:
                                                    GLF_dead28m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 3)] = GLF_dead28one;
                                                    break;
                                                case 2u:
                                                    GLF_dead28m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 4)] = GLF_dead28one;
                                                    break;
                                                case 3u:
                                                    GLF_dead28m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 2)] = GLF_dead28one;
                                                    break;
                                                case 4u:
                                                    GLF_dead28m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 3)] = GLF_dead28one;
                                                    break;
                                                case 5u:
                                                    GLF_dead28m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 4)] = GLF_dead28one;
                                                    break;
                                                case 6u:
                                                    GLF_dead28m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 2)] = GLF_dead28one;
                                                    break;
                                                case 7u:
                                                    GLF_dead28m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 3)] = GLF_dead28one;
                                                    break;
                                                case 8u:
                                                    GLF_dead28m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 4)] = GLF_dead28one;
                                                    break;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        do {
                            donor_replacementGLF_dead8v = (4 * donor_replacementGLF_dead8v * (1000 - donor_replacementGLF_dead8v)) / 1000;
                        } while (_GLF_WRAPPED_LOOP(false));
                    }
                } else {
                }
                float donor_replacementGLF_dead3y = _GLF_FUZZED(dot(unpackHalf2x16(22715u), vec2(-6.7, -44.18)));
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    do {
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                            float donor_replacementGLF_dead29th = _GLF_FUZZED(donor_replacementGLF_dead3y);
                            {
                                donor_replacementGLF_dead29th = -donor_replacementGLF_dead29th;
                            }
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            {
                                donor_replacementGLF_dead3c_re = 0.5 + float(GLF_dead25data[0]) / 10.0;
                            }
                        }
                        if (_GLF_WRAPPED_IF_FALSE(false)) {
                        } else {
                            if (_GLF_DEAD(false)) {
                                float donor_replacementGLF_dead15x2 = _GLF_FUZZED(donor_replacementGLF_dead3y);
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                        {
                                            if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < _GLF_ZERO(0.0, injectionSwitch.x))))) {
                                            } else {
                                                GLF_dead6MATRIX_N = donor_replacementGLF_dead3k - 1;
                                            }
                                        }
                                    }
                                    for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != int(_GLF_ONE(1.0, injectionSwitch.y))); _injected_loop_counter++) {
                                        if (donor_replacementGLF_dead15x2 <= -0.9 && donor_replacementGLF_dead15x2 >= -1.1) {
                                            GLF_dead15_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
                                        } else {
                                            for (int _injected_loop_counter = (1 & 1); _GLF_WRAPPED_LOOP(_injected_loop_counter > (0 >> _GLF_IDENTITY(int(1), int(1)))); _injected_loop_counter--) {
                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                        vec3 donor_replacementGLF_dead20color = _GLF_FUZZED(vec3(0.1, -34.82, 2588.0266));
                                                        vec2 donor_replacementGLF_dead20uv = _GLF_FUZZED(mix(GLF_dead4injectionSwitch, vec2(-4.7, -4.2), GLF_dead13injectionSwitch));
                                                        if (donor_replacementGLF_dead20uv.y > (1.0 / 4.0)) {
                                                            if (_GLF_DEAD(false)) {
                                                                if (coord.x < 0.0) {
                                                                    donor_replacementGLF_dead15x2 = 1.0 - donor_replacementGLF_dead15x2;
                                                                }
                                                            }
                                                            donor_replacementGLF_dead20color.x += float(GLF_dead20obj.numbers[5]);
                                                            if (_GLF_DEAD(false)) {
                                                                int donor_replacementGLF_dead24a = _GLF_FUZZED(donor_replacementGLF_dead3iteration);
                                                                vec2 donor_replacementGLF_dead24uv = _GLF_FUZZED(vec2(GLF_dead1_GLF_color));
                                                                {
                                                                    for (int _injected_loop_counter = (0 << _GLF_IDENTITY(int(5), int(5))); _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
                                                                        donor_replacementGLF_dead24uv.y -= step(GLF_dead24injectionSwitch.y, donor_replacementGLF_dead24uv.x);
                                                                    }
                                                                    do {
                                                                        donor_replacementGLF_dead24uv.x -= fract(tanh(donor_replacementGLF_dead24uv.x)) / ldexp(GLF_dead24injectionSwitch.y, findMSB(donor_replacementGLF_dead24a));
                                                                    } while (_GLF_WRAPPED_LOOP(false));
                                                                    donor_replacementGLF_dead24a--;
                                                                }
                                                            }
                                                        }
                                                        if (_GLF_DEAD(false)) {
                                                            int donor_replacementGLF_dead25low = _GLF_FUZZED(GLF_dead18MATRIX_N);
                                                            for (int GLF_dead25m = 1; GLF_dead25m <= GLF_dead18MATRIX_N; GLF_dead25m = 2 * GLF_dead25m) {
                                                                for (int GLF_dead25i = donor_replacementGLF_dead25low; GLF_dead25i < GLF_dead18MATRIX_N; GLF_dead25i += 2 * GLF_dead25m) {
                                                                    int GLF_dead25from = GLF_dead25i;
                                                                    int GLF_dead25mid = GLF_dead25i + GLF_dead25m - 1;
                                                                    int GLF_dead25to = min(GLF_dead25i + 2 * GLF_dead25m - 1, GLF_dead18MATRIX_N);
                                                                    GLF_dead25merge(GLF_dead25from, GLF_dead25mid, GLF_dead25to);
                                                                }
                                                            }
                                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                                vec2 donor_replacementGLF_dead29a = _GLF_FUZZED(roundEven(degrees(GLF_dead24injectionSwitch)));
                                                                float donor_replacementGLF_dead29z = _GLF_FUZZED(donor_replacementGLF_dead3c_im);
                                                                {
                                                                    donor_replacementGLF_dead29z = donor_replacementGLF_dead29a.y / donor_replacementGLF_dead29a.x;
                                                                }
                                                            }
                                                        }
                                                    }
                                                    GLF_dead15_GLF_color = vec4(0.0, 1.0, 0.0, 1.0);
                                                } else {
                                                }
                                            }
                                        }
                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                            float donor_replacementGLF_dead25grey = _GLF_FUZZED(refract(inversesqrt(donor_replacementGLF_dead3y), donor_replacementGLF_dead3c_im, donor_replacementGLF_dead15x2));
                                            {
                                                if (int(GLF_dead25gl_FragCoord[1]) < 270) {
                                                    donor_replacementGLF_dead25grey = 0.5 + float(GLF_dead25data[8]) / 10.0;
                                                } else {
                                                    discard;
                                                }
                                            }
                                        }
                                    }
                                } else {
                                }
                            }
                            for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    int donor_replacementGLF_dead25j = _GLF_FUZZED(_injected_loop_counter);
                                    {
                                        GLF_dead25temp[_GLF_MAKE_IN_BOUNDS_INT(i++, 10)] = GLF_dead25data[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead25j++, 10)];
                                    }
                                }
                                if (_GLF_DEAD(false)) {
                                    int donor_replacementGLF_dead14i = _GLF_FUZZED((GLF_dead6MATRIX_N + ivec3(-27292, -24152, -85081))[0]);
                                    if (_GLF_DEAD(false)) {
                                        ivec2 donor_replacementGLF_dead26pos = _GLF_FUZZED(ivec2(-34748, 28874));
                                        while (donor_replacementGLF_dead26pos.y != 256) {
                                            if (donor_replacementGLF_dead26pos.x < GLF_dead26dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead26pos.y, 256)] + 15 && donor_replacementGLF_dead26pos.x > GLF_dead26dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead26pos.y, 256)] - 15) {
                                                float GLF_dead26p = (15.0 - abs(float(donor_replacementGLF_dead26pos.x - GLF_dead26dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead26pos.y, 256)]))) / 15.0;
                                                ;
                                            }
                                            donor_replacementGLF_dead26pos.y++;
                                        }
                                    }
                                    float donor_replacementGLF_dead14limit = _GLF_FUZZED(donor_replacementGLF_dead3c_im);
                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                        ivec2 donor_replacementGLF_dead26pos = _GLF_FUZZED(abs(ivec2(73747, 10355)));
                                        {
                                            float GLF_dead26p = (15.0 - abs(float(donor_replacementGLF_dead26pos.x - GLF_dead26dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead26pos.y, 256)]))) / 15.0;
                                            ;
                                        }
                                    }
                                    if (_GLF_DEAD(false)) {
                                        vec2 donor_replacementGLF_dead21pos = _GLF_FUZZED(acos(dFdyFine(vec2(-5.3, -48.73))));
                                        vec4 donor_replacementGLF_dead21quad = _GLF_FUZZED(refract(GLF_dead1_GLF_color, trunc(res), -8.8));
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            if (donor_replacementGLF_dead21pos.x < donor_replacementGLF_dead21quad.x) {
                                                ;
                                            }
                                        } else {
                                        }
                                    }
                                    float donor_replacementGLF_dead14ref = _GLF_FUZZED(donor_replacementGLF_dead3c_re);
                                    {
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_ZERO(0.0, injectionSwitch.x))))) {
                                            float donor_replacementGLF_dead29th = _GLF_FUZZED(donor_replacementGLF_dead3y);
                                            {
                                                donor_replacementGLF_dead29th = 1.0 - donor_replacementGLF_dead29th;
                                            }
                                        }
                                        if (_GLF_DEAD(false)) {
                                            int donor_replacementGLF_dead16y = _GLF_FUZZED(GLF_dead6MATRIX_N);
                                            if (donor_replacementGLF_dead3iteration * donor_replacementGLF_dead3iteration + donor_replacementGLF_dead16y * donor_replacementGLF_dead16y > 262144) {
                                                break;
                                            }
                                        }
                                        if (_GLF_DEAD(false)) {
                                            vec2 donor_replacementGLF_dead29a = _GLF_FUZZED(injectionSwitch);
                                            if (donor_replacementGLF_dead29a.y < donor_replacementGLF_dead29a.x) {
                                                donor_replacementGLF_dead14limit = 0.5 - donor_replacementGLF_dead14limit;
                                            }
                                        }
                                        if (_GLF_DEAD(false)) {
                                            {
                                                if (int(GLF_dead25gl_FragCoord[1]) < 60) {
                                                    donor_replacementGLF_dead3x = 0.5 + float(GLF_dead25data[1]) / 10.0;
                                                } else {
                                                    if (int(GLF_dead25gl_FragCoord[1]) < 90) {
                                                        donor_replacementGLF_dead3x = 0.5 + float(GLF_dead25data[2]) / 10.0;
                                                        if (_GLF_DEAD(false)) {
                                                            int donor_replacementGLF_dead28c = _GLF_FUZZED(ivec4(-67584, -84485, -78186, 37160)[0]);
                                                            uint donor_replacementGLF_dead28matrix_number = _GLF_FUZZED(158750u);
                                                            int donor_replacementGLF_dead28rows = _GLF_FUZZED(GLF_dead25N);
                                                            {
                                                                for (int GLF_dead28r = 0; GLF_dead28r < donor_replacementGLF_dead28rows; GLF_dead28r++) {
                                                                    switch (donor_replacementGLF_dead28matrix_number) {
                                                                        case 0u:
                                                                            GLF_dead28m22[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead28c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 2)] = GLF_dead28one;
                                                                            break;
                                                                        case 1u:
                                                                            GLF_dead28m23[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead28c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 3)] = GLF_dead28one;
                                                                            break;
                                                                        case 2u:
                                                                            GLF_dead28m24[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead28c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 4)] = GLF_dead28one;
                                                                            break;
                                                                        case 3u:
                                                                            GLF_dead28m32[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead28c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 2)] = GLF_dead28one;
                                                                            break;
                                                                        case 4u:
                                                                            GLF_dead28m33[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead28c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 3)] = GLF_dead28one;
                                                                            break;
                                                                        case 5u:
                                                                            GLF_dead28m34[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead28c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 4)] = GLF_dead28one;
                                                                            break;
                                                                        case 6u:
                                                                            GLF_dead28m42[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead28c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 2)] = GLF_dead28one;
                                                                            break;
                                                                        case 7u:
                                                                            GLF_dead28m43[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead28c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 3)] = GLF_dead28one;
                                                                            break;
                                                                        case 8u:
                                                                            GLF_dead28m44[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead28c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 4)] = GLF_dead28one;
                                                                            break;
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    } else {
                                                        do {
                                                            if (_GLF_DEAD(false)) {
                                                                float donor_replacementGLF_dead29th = _GLF_FUZZED(donor_replacementGLF_dead14limit);
                                                                {
                                                                    donor_replacementGLF_dead29th = -donor_replacementGLF_dead29th;
                                                                }
                                                            }
                                                            if (int(GLF_dead25gl_FragCoord[1]) < 120) {
                                                                donor_replacementGLF_dead3x = 0.5 + float(GLF_dead25data[3]) / 10.0;
                                                            } else {
                                                                if (int(GLF_dead25gl_FragCoord[1]) < 150) {
                                                                    discard;
                                                                    if (_GLF_DEAD(false)) {
                                                                        uint donor_replacementGLF_dead28matrix_number = _GLF_FUZZED(120804u);
                                                                        for (int GLF_dead28cols = 2; GLF_dead28cols <= 4; GLF_dead28cols++) {
                                                                            for (int GLF_dead28rows = 2; GLF_dead28rows <= 4; GLF_dead28rows++) {
                                                                                for (int GLF_dead28c = 0; GLF_dead28c < GLF_dead28cols; GLF_dead28c++) {
                                                                                    for (int GLF_dead28r = 0; GLF_dead28r < GLF_dead28rows; GLF_dead28r++) {
                                                                                        switch (donor_replacementGLF_dead28matrix_number) {
                                                                                            case 0u:
                                                                                                GLF_dead28m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 2)] = GLF_dead28one;
                                                                                                break;
                                                                                            case 1u:
                                                                                                GLF_dead28m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 3)] = GLF_dead28one;
                                                                                                break;
                                                                                            case 2u:
                                                                                                GLF_dead28m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 4)] = GLF_dead28one;
                                                                                                break;
                                                                                            case 3u:
                                                                                                GLF_dead28m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 2)] = GLF_dead28one;
                                                                                                break;
                                                                                            case 4u:
                                                                                                GLF_dead28m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 3)] = GLF_dead28one;
                                                                                                break;
                                                                                            case 5u:
                                                                                                GLF_dead28m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 4)] = GLF_dead28one;
                                                                                                break;
                                                                                            case 6u:
                                                                                                GLF_dead28m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 2)] = GLF_dead28one;
                                                                                                break;
                                                                                            case 7u:
                                                                                                GLF_dead28m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 3)] = GLF_dead28one;
                                                                                                break;
                                                                                            case 8u:
                                                                                                GLF_dead28m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 4)] = GLF_dead28one;
                                                                                                break;
                                                                                        }
                                                                                    }
                                                                                }
                                                                                donor_replacementGLF_dead28matrix_number = donor_replacementGLF_dead28matrix_number + 1u;
                                                                            }
                                                                        }
                                                                    }
                                                                } else {
                                                                    if (int(GLF_dead25gl_FragCoord[1]) < 180) {
                                                                        donor_replacementGLF_dead3x = 0.5 + float(GLF_dead25data[5]) / 10.0;
                                                                    } else {
                                                                        if (int(GLF_dead25gl_FragCoord[1]) < 210) {
                                                                            donor_replacementGLF_dead3x = 0.5 + float(GLF_dead25data[6]) / 10.0;
                                                                        } else {
                                                                            if (int(GLF_dead25gl_FragCoord[1]) < 240) {
                                                                                donor_replacementGLF_dead3x = 0.5 + float(GLF_dead25data[7]) / 10.0;
                                                                            } else {
                                                                                if (int(GLF_dead25gl_FragCoord[1]) < 270) {
                                                                                    donor_replacementGLF_dead3x = 0.5 + float(GLF_dead25data[8]) / 10.0;
                                                                                } else {
                                                                                    for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != (0 & GLF_dead25N)); _injected_loop_counter--) {
                                                                                        discard;
                                                                                    }
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        } while (_GLF_WRAPPED_LOOP(false));
                                                    }
                                                }
                                            }
                                        }
                                        for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < ((1 << _GLF_IDENTITY(int(2), int(2))) >> _GLF_IDENTITY(int(2), _GLF_IDENTITY(int(2), min(_GLF_IDENTITY(int(2), (int(2)) | (int(2))), int(2)))))); _injected_loop_counter++) {
                                            if (mod(float(donor_replacementGLF_dead14i), donor_replacementGLF_dead14ref) <= 0.01) {
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                    float donor_replacementGLF_dead22s = _GLF_FUZZED(donor_replacementGLF_dead3y);
                                                    {
                                                        donor_replacementGLF_dead22s += 0.2;
                                                    }
                                                }
                                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                                        donor_replacementGLF_dead3c_re += 0.2;
                                                    } else {
                                                        if (_GLF_DEAD(false)) {
                                                            vec4 donor_replacementGLF_dead21quad = _GLF_FUZZED(max(atan(GLF_dead2_GLF_color, _GLF_color), donor_replacementGLF_dead3c_im));
                                                            if (_GLF_DEAD(false)) {
                                                                {
                                                                    break;
                                                                }
                                                            }
                                                            if (coord.y > donor_replacementGLF_dead21quad.y + donor_replacementGLF_dead21quad.w) {
                                                                if (_GLF_DEAD(false)) {
                                                                    {
                                                                        donor_replacementGLF_dead3x = -donor_replacementGLF_dead3x;
                                                                    }
                                                                }
                                                                ;
                                                            }
                                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                                {
                                                                    ;
                                                                }
                                                            }
                                                        }
                                                    }
                                                } else {
                                                }
                                            }
                                        }
                                        if (float(donor_replacementGLF_dead14i) >= donor_replacementGLF_dead14limit) {
                                            ;
                                        }
                                        if (_GLF_DEAD(false)) {
                                            {
                                                ;
                                            }
                                        }
                                    }
                                    if (_GLF_DEAD(false)) {
                                        vec2 donor_replacementGLF_dead29a = _GLF_FUZZED((-fwidthCoarse(GLF_dead13injectionSwitch)));
                                        float donor_replacementGLF_dead29z = _GLF_FUZZED(length(dFdyCoarse(donor_replacementGLF_dead3y)));
                                        if (donor_replacementGLF_dead29a.y > donor_replacementGLF_dead29a.x) {
                                            donor_replacementGLF_dead29z = donor_replacementGLF_dead29a.x / donor_replacementGLF_dead29a.y;
                                        } else {
                                            donor_replacementGLF_dead29z = donor_replacementGLF_dead29a.y / donor_replacementGLF_dead29a.x;
                                        }
                                    }
                                }
                                if (_GLF_DEAD(_GLF_IDENTITY(false, bool(bvec4(false, false, false, false))))) {
                                    int donor_replacementGLF_dead20i = _GLF_FUZZED(_injected_loop_counter);
                                    int donor_replacementGLF_dead20j = _GLF_FUZZED(GLF_dead18MATRIX_N);
                                    int donor_replacementGLF_dead20pivot = _GLF_FUZZED(i);
                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                        if (GLF_dead20obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead20j, 10)] <= donor_replacementGLF_dead20pivot) {
                                            donor_replacementGLF_dead20i++;
                                            GLF_dead20swap(donor_replacementGLF_dead20i, donor_replacementGLF_dead20j);
                                        }
                                    } else {
                                    }
                                }
                                if (_GLF_DEAD(false)) {
                                    vec2 donor_replacementGLF_dead5pos = _GLF_FUZZED(coord);
                                    vec3 donor_replacementGLF_dead5setting = _GLF_FUZZED(trunc(vec3(3.6, 3647.6312, -702.375)));
                                    {
                                        do {
                                            ;
                                        } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
                                    }
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                        {
                                            donor_replacementGLF_dead3y = -donor_replacementGLF_dead3y;
                                        }
                                    }
                                }
                                if (donor_replacementGLF_dead3x * donor_replacementGLF_dead3x + donor_replacementGLF_dead3y * donor_replacementGLF_dead3y > 4.0) {
                                    for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < ((((1 << _GLF_IDENTITY(int(3), int(3))) >> _GLF_IDENTITY(int(3), _GLF_IDENTITY(int(3), min(int(3), int(3))))) << _GLF_IDENTITY(int(4), int(4))) >> _GLF_IDENTITY(int(4), int(4)))); _injected_loop_counter++) {
                                        for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
                                            do {
                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                    ;
                                                } else {
                                                }
                                            } while (_GLF_WRAPPED_LOOP(false));
                                        }
                                    }
                                }
                            }
                        }
                        if (_GLF_WRAPPED_IF_FALSE(false)) {
                            if (_GLF_DEAD(false)) {
                                vec3 donor_replacementGLF_dead20color = _GLF_FUZZED(GLF_dead15polynomial);
                                {
                                    donor_replacementGLF_dead20color.z += float(GLF_dead20obj.numbers[7]);
                                }
                            }
                        } else {
                            if (_GLF_WRAPPED_IF_FALSE(false)) {
                            } else {
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                    float donor_replacementGLF_dead22s = _GLF_FUZZED(donor_replacementGLF_dead3c_re);
                                    if (mod(float(donor_replacementGLF_dead3iteration), donor_replacementGLF_dead3c_re) <= 0.01) {
                                        donor_replacementGLF_dead22s += 0.2;
                                    }
                                }
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                if (_GLF_DEAD(false)) {
                                    vec2 donor_replacementGLF_dead19coord = _GLF_FUZZED(GLF_dead4injectionSwitch);
                                    int donor_replacementGLF_dead19i = _GLF_FUZZED(donor_replacementGLF_dead3k);
                                    float donor_replacementGLF_dead19slope = _GLF_FUZZED(-68.30);
                                    vec2 donor_replacementGLF_dead19uvstep = _GLF_FUZZED(((GLF_dead1_GLF_color, asin(-2.6)) * coord));
                                    while (donor_replacementGLF_dead3x < GLF_dead5b_b && donor_replacementGLF_dead19i < 32) {
                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                            vec2 donor_replacementGLF_dead29a = _GLF_FUZZED(GLF_dead13injectionSwitch);
                                            if (donor_replacementGLF_dead29a.y > donor_replacementGLF_dead29a.x) {
                                                donor_replacementGLF_dead3c_re = donor_replacementGLF_dead29a.x / donor_replacementGLF_dead29a.y;
                                            } else {
                                                donor_replacementGLF_dead3c_re = donor_replacementGLF_dead29a.y / donor_replacementGLF_dead29a.x;
                                            }
                                        }
                                        if (_GLF_DEAD(false)) {
                                            ivec2 donor_replacementGLF_dead26pos = _GLF_FUZZED((ivec2(19380, -1659) + ivec2(-49014, 88273)));
                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                if (donor_replacementGLF_dead26pos.x < GLF_dead26dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead26pos.y, 256)] + 15 && donor_replacementGLF_dead26pos.x > GLF_dead26dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead26pos.y, 256)] - 15) {
                                                    float GLF_dead26p = (15.0 - abs(float(donor_replacementGLF_dead26pos.x - GLF_dead26dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead26pos.y, 256)]))) / 15.0;
                                                    ;
                                                }
                                                donor_replacementGLF_dead26pos.y++;
                                            } else {
                                            }
                                        }
                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                            if (_GLF_DEAD(false)) {
                                                {
                                                    ;
                                                }
                                            }
                                        } else {
                                        }
                                        donor_replacementGLF_dead19coord -= donor_replacementGLF_dead19uvstep;
                                        for (int _injected_loop_counter = _GLF_IDENTITY(1, 0 ^ (1)); _GLF_WRAPPED_LOOP(_injected_loop_counter > int(_GLF_ZERO(0.0, injectionSwitch.x))); _injected_loop_counter--) {
                                            GLF_dead5b_b += donor_replacementGLF_dead19slope;
                                        }
                                        donor_replacementGLF_dead3x = texture(GLF_dead19tex, donor_replacementGLF_dead19coord).y;
                                        donor_replacementGLF_dead19i++;
                                    }
                                }
                                int donor_replacementGLF_dead8i = _GLF_FUZZED(i);
                                int donor_replacementGLF_dead8iters = _GLF_FUZZED(GLF_dead6MATRIX_N);
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    for (donor_replacementGLF_dead8i = 0; donor_replacementGLF_dead8i < donor_replacementGLF_dead8iters; donor_replacementGLF_dead8i++) {
                                        i = (4 * i * (1000 - i)) / 1000;
                                    }
                                } else {
                                    if (_GLF_DEAD(false)) {
                                        if (length(coord) < 0.001) {
                                            ;
                                        }
                                    }
                                }
                            }
                        }
                        float GLF_dead3x_new = donor_replacementGLF_dead3x * donor_replacementGLF_dead3x - donor_replacementGLF_dead3y * donor_replacementGLF_dead3y + donor_replacementGLF_dead3c_re;
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                do {
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        donor_replacementGLF_dead3y = 2.0 * donor_replacementGLF_dead3x * donor_replacementGLF_dead3y + donor_replacementGLF_dead3c_im;
                                    } else {
                                    }
                                } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
                            } else {
                            }
                        } else {
                        }
                        donor_replacementGLF_dead3x = GLF_dead3x_new;
                        do {
                            if (_GLF_DEAD(false)) {
                                vec2 donor_replacementGLF_dead5position = _GLF_FUZZED(inversesqrt(injectionSwitch));
                                do {
                                    if (abs(donor_replacementGLF_dead5position.y - donor_replacementGLF_dead5position.x) < 0.5) {
                                        GLF_dead5b_b = clamp(0.0, 1.0, GLF_dead5b_b * 3.0);
                                    }
                                } while (_GLF_WRAPPED_LOOP(false));
                            }
                        } while (_GLF_WRAPPED_LOOP(false));
                        do {
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                        donor_replacementGLF_dead3iteration++;
                                    } else {
                                    }
                                } else {
                                }
                            } else {
                            }
                        } while (_GLF_WRAPPED_LOOP(false));
                        if (_GLF_WRAPPED_IF_FALSE(false)) {
                        } else {
                            for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < ((1 << _GLF_IDENTITY(int(4), int(4))) >> _GLF_IDENTITY(int(4), _GLF_IDENTITY(int(4), (int(4)) >> 0)))); _injected_loop_counter++) {
                                donor_replacementGLF_dead3k++;
                            }
                            if (_GLF_DEAD(false)) {
                                vec2 donor_replacementGLF_dead29a = _GLF_FUZZED(GLF_dead24injectionSwitch);
                                float donor_replacementGLF_dead29th = _GLF_FUZZED(donor_replacementGLF_dead3y);
                                if (donor_replacementGLF_dead29a.y < donor_replacementGLF_dead29a.x) {
                                    donor_replacementGLF_dead29th = 0.5 - donor_replacementGLF_dead29th;
                                }
                            }
                        }
                        if (_GLF_WRAPPED_IF_FALSE(_GLF_IDENTITY(false, bool(bool(false))))) {
                        } else {
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < tan(0.0))))) {
                                int donor_replacementGLF_dead25high = _GLF_FUZZED((63218 ^ donor_replacementGLF_dead3k));
                                int donor_replacementGLF_dead25i = _GLF_FUZZED(donor_replacementGLF_dead3k);
                                int donor_replacementGLF_dead25m = _GLF_FUZZED(-58663);
                                {
                                    int GLF_dead25from = donor_replacementGLF_dead25i;
                                    int GLF_dead25mid = donor_replacementGLF_dead25i + donor_replacementGLF_dead25m - 1;
                                    int GLF_dead25to = min(donor_replacementGLF_dead25i + 2 * donor_replacementGLF_dead25m - 1, donor_replacementGLF_dead25high);
                                    GLF_dead25merge(GLF_dead25from, GLF_dead25mid, GLF_dead25to);
                                }
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                {
                                    GLF_dead28_GLF_color = vec4(vec3(0.0), 1.0);
                                }
                            }
                        }
                    } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))));
                } else {
                }
                if (_GLF_DEAD(false)) {
                    if (_GLF_WRAPPED_IF_FALSE(_GLF_IDENTITY(false, _GLF_IDENTITY(bool(_GLF_IDENTITY(bvec3(false, false, true), bvec3(bvec4(bvec3(false, false, true), true)))), !(!(bool(_GLF_IDENTITY(bvec3(false, false, true), bvec3(bvec4(bvec3(false, false, true), true)))))))))) {
                    } else {
                        if (_GLF_DEAD(false)) {
                            vec4 donor_replacementGLF_dead14c = _GLF_FUZZED(_GLF_color);
                            int donor_replacementGLF_dead14i = _GLF_FUZZED(ivec4(-27526, -304, 63773, -22239)[3]);
                            if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                if (_GLF_DEAD(_GLF_IDENTITY(false, !(_GLF_IDENTITY(!(false), (!(false)) && true))))) {
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < log(1.0))))) {
                                        vec2 donor_replacementGLF_dead29a = _GLF_FUZZED(degrees(vec2(-4.7, 1.8)));
                                        float donor_replacementGLF_dead29z = _GLF_FUZZED(954.050);
                                        {
                                            donor_replacementGLF_dead29z = donor_replacementGLF_dead29a.y / donor_replacementGLF_dead29a.x;
                                        }
                                    }
                                    vec3 donor_replacementGLF_dead20color = _GLF_FUZZED(vec3(-2.8, 5832.5264, -7.5));
                                    {
                                        if (_GLF_DEAD(false)) {
                                            if (int(GLF_dead25gl_FragCoord[1]) < 90) {
                                                GLF_dead5b_b = 0.5 + float(GLF_dead25data[2]) / 10.0;
                                            } else {
                                                if (int(GLF_dead25gl_FragCoord[1]) < 120) {
                                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                        GLF_dead5b_b = 0.5 + float(GLF_dead25data[3]) / 10.0;
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                            int donor_replacementGLF_dead28c = _GLF_FUZZED((donor_replacementGLF_dead3k - 53831));
                                                            uint donor_replacementGLF_dead28matrix_number = _GLF_FUZZED(79705u);
                                                            int donor_replacementGLF_dead28r = _GLF_FUZZED(donor_replacementGLF_dead3iteration);
                                                            {
                                                                switch (donor_replacementGLF_dead28matrix_number) {
                                                                    case 0u:
                                                                        GLF_dead28m22[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead28c, 2)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead28r, 2)] = GLF_dead28one;
                                                                        break;
                                                                    case 1u:
                                                                        GLF_dead28m23[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead28c, 2)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead28r, 3)] = GLF_dead28one;
                                                                        break;
                                                                    case 2u:
                                                                        GLF_dead28m24[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead28c, 2)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead28r, 4)] = GLF_dead28one;
                                                                        break;
                                                                    case 3u:
                                                                        GLF_dead28m32[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead28c, 3)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead28r, 2)] = GLF_dead28one;
                                                                        break;
                                                                    case 4u:
                                                                        GLF_dead28m33[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead28c, 3)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead28r, 3)] = GLF_dead28one;
                                                                        break;
                                                                    case 5u:
                                                                        GLF_dead28m34[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead28c, 3)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead28r, 4)] = GLF_dead28one;
                                                                        break;
                                                                    case 6u:
                                                                        GLF_dead28m42[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead28c, 4)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead28r, 2)] = GLF_dead28one;
                                                                        break;
                                                                    case 7u:
                                                                        GLF_dead28m43[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead28c, 4)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead28r, 3)] = GLF_dead28one;
                                                                        break;
                                                                    case 8u:
                                                                        GLF_dead28m44[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead28c, 4)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead28r, 4)] = GLF_dead28one;
                                                                        break;
                                                                }
                                                            }
                                                        }
                                                    } else {
                                                    }
                                                } else {
                                                    if (int(GLF_dead25gl_FragCoord[1]) < 150) {
                                                        discard;
                                                    } else {
                                                        if (int(GLF_dead25gl_FragCoord[1]) < 180) {
                                                            GLF_dead5b_b = 0.5 + float(GLF_dead25data[5]) / 10.0;
                                                        } else {
                                                            if (int(GLF_dead25gl_FragCoord[1]) < 210) {
                                                                GLF_dead5b_b = 0.5 + float(GLF_dead25data[6]) / 10.0;
                                                            } else {
                                                                do {
                                                                    if (int(GLF_dead25gl_FragCoord[1]) < 240) {
                                                                        GLF_dead5b_b = 0.5 + float(GLF_dead25data[7]) / 10.0;
                                                                    } else {
                                                                        if (int(GLF_dead25gl_FragCoord[1]) < 270) {
                                                                            do {
                                                                                GLF_dead5b_b = 0.5 + float(GLF_dead25data[8]) / 10.0;
                                                                            } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))));
                                                                        } else {
                                                                            discard;
                                                                        }
                                                                    }
                                                                } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
                                                            }
                                                        }
                                                    }
                                                }
                                                if (_GLF_DEAD(false)) {
                                                    float donor_replacementGLF_dead29th = _GLF_FUZZED(log2(donor_replacementGLF_dead3x));
                                                    {
                                                        donor_replacementGLF_dead29th = -donor_replacementGLF_dead29th;
                                                    }
                                                }
                                            }
                                        }
                                        for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != (1 | 1)); _injected_loop_counter++) {
                                            donor_replacementGLF_dead20color.y += float(GLF_dead20obj.numbers[2]);
                                        }
                                    }
                                }
                            } else {
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != (0 << _GLF_IDENTITY(int(1), int(1)))); _injected_loop_counter--) {
                                        if (_GLF_DEAD(false)) {
                                            vec3 donor_replacementGLF_dead20color = _GLF_FUZZED(roundEven(vec3(160.141, -9.6, -3.1)));
                                            {
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                    int donor_replacementGLF_dead27i = _GLF_FUZZED(-54036);
                                                    if (donor_replacementGLF_dead27i < int(GLF_dead27gl_FragCoord.x)) {
                                                        break;
                                                    }
                                                }
                                                donor_replacementGLF_dead20color.z += float(GLF_dead20obj.numbers[7]);
                                            }
                                        }
                                        do {
                                            if (donor_replacementGLF_dead14c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead14i, 4)] >= 1.0) {
                                                donor_replacementGLF_dead14c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead14i, 4)] = donor_replacementGLF_dead14c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead14i, 4)] * donor_replacementGLF_dead14c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead14i, 4)];
                                            }
                                        } while (_GLF_WRAPPED_LOOP(false));
                                    }
                                } else {
                                }
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                float donor_replacementGLF_dead25grey = _GLF_FUZZED(donor_replacementGLF_dead3c_im);
                                {
                                    if (_GLF_DEAD(false)) {
                                        {
                                            GLF_dead28_GLF_color = vec4(vec3(0.0), 1.0);
                                        }
                                    }
                                    donor_replacementGLF_dead25grey = 0.5 + float(GLF_dead25data[6]) / 10.0;
                                    if (_GLF_DEAD(false)) {
                                        {
                                            discard;
                                        }
                                    }
                                }
                            }
                        }
                    }
                    vec2 donor_replacementGLF_dead7coord = _GLF_FUZZED(coord);
                    vec4 donor_replacementGLF_dead7res = _GLF_FUZZED(vec4(7949.6060, -8.0, -8.4, 9.2));
                    float donor_replacementGLF_dead7uvstep = _GLF_FUZZED(donor_replacementGLF_dead3y);
                    {
                        if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        } else {
                            donor_replacementGLF_dead7res += texture(GLF_dead7tex, donor_replacementGLF_dead7coord + vec2(float(donor_replacementGLF_dead3iteration - 1) * donor_replacementGLF_dead7uvstep, float(donor_replacementGLF_dead3iteration - 1) * donor_replacementGLF_dead7uvstep)) * GLF_dead7weights[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead3iteration * 3 + donor_replacementGLF_dead3iteration, 9)];
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                int donor_replacementGLF_dead23iteration = _GLF_FUZZED(GLF_dead18MATRIX_N);
                                {
                                    if (donor_replacementGLF_dead3k * donor_replacementGLF_dead3k + GLF_dead18MATRIX_N * GLF_dead18MATRIX_N > 262144) {
                                        ;
                                    }
                                    int GLF_dead23x_new = ((donor_replacementGLF_dead3k * donor_replacementGLF_dead3k - GLF_dead18MATRIX_N * GLF_dead18MATRIX_N) / 256 + GLF_dead18MATRIX_N);
                                    GLF_dead18MATRIX_N = (2 * donor_replacementGLF_dead3k * GLF_dead18MATRIX_N / 256 + i);
                                    donor_replacementGLF_dead3k = GLF_dead23x_new;
                                    if (_GLF_DEAD(false)) {
                                        int donor_replacementGLF_dead28cols = _GLF_FUZZED(int(187598u));
                                        uint donor_replacementGLF_dead28matrix_number = _GLF_FUZZED(152437u);
                                        int donor_replacementGLF_dead28rows = _GLF_FUZZED(i);
                                        {
                                            for (int GLF_dead28c = 0; GLF_dead28c < donor_replacementGLF_dead28cols; GLF_dead28c++) {
                                                for (int GLF_dead28r = 0; GLF_dead28r < donor_replacementGLF_dead28rows; GLF_dead28r++) {
                                                    switch (donor_replacementGLF_dead28matrix_number) {
                                                        case 0u:
                                                            GLF_dead28m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 2)] = GLF_dead28one;
                                                            break;
                                                        case 1u:
                                                            GLF_dead28m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 3)] = GLF_dead28one;
                                                            break;
                                                        case 2u:
                                                            GLF_dead28m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 4)] = GLF_dead28one;
                                                            break;
                                                        case 3u:
                                                            GLF_dead28m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 2)] = GLF_dead28one;
                                                            break;
                                                        case 4u:
                                                            GLF_dead28m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 3)] = GLF_dead28one;
                                                            break;
                                                        case 5u:
                                                            GLF_dead28m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 4)] = GLF_dead28one;
                                                            break;
                                                        case 6u:
                                                            GLF_dead28m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 2)] = GLF_dead28one;
                                                            break;
                                                        case 7u:
                                                            GLF_dead28m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 3)] = GLF_dead28one;
                                                            break;
                                                        case 8u:
                                                            GLF_dead28m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 4)] = GLF_dead28one;
                                                            break;
                                                    }
                                                }
                                            }
                                            donor_replacementGLF_dead28matrix_number = donor_replacementGLF_dead28matrix_number + 1u;
                                        }
                                    }
                                    donor_replacementGLF_dead23iteration++;
                                }
                                if (_GLF_DEAD(false)) {
                                    {
                                        donor_replacementGLF_dead3y = -donor_replacementGLF_dead3y;
                                    }
                                }
                            }
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < sqrt(0.0))))) {
                            for (int GLF_dead18u = GLF_dead18MATRIX_N - 1; GLF_dead18u >= donor_replacementGLF_dead3k; GLF_dead18u--) {
                                donor_replacementGLF_dead7uvstep += pow(_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead18u, 4)], 2.0);
                            }
                            if (_GLF_DEAD(false)) {
                                {
                                    donor_replacementGLF_dead3c_re = 1.0 - donor_replacementGLF_dead3c_re;
                                }
                            }
                        }
                    }
                }
                if (_GLF_DEAD(false)) {
                    vec4 donor_replacementGLF_dead10quad = _GLF_FUZZED(res);
                    if (_GLF_DEAD(false)) {
                        if (_GLF_DEAD(false)) {
                            for (int GLF_dead25j = 0; GLF_dead25j < 10; GLF_dead25j++) {
                                GLF_dead25temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead25j, 10)] = GLF_dead25data[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead25j, 10)];
                            }
                        }
                        float donor_replacementGLF_dead22limit = _GLF_FUZZED(abs(donor_replacementGLF_dead3y));
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            {
                                discard;
                            }
                        }
                        for (int GLF_dead22i = 1; GLF_dead22i < 800; GLF_dead22i++) {
                            if (_GLF_DEAD(false)) {
                                int donor_replacementGLF_dead25i = _GLF_FUZZED((GLF_dead22i & donor_replacementGLF_dead3k));
                                {
                                    switch (donor_replacementGLF_dead25i) {
                                        case 0:
                                            GLF_dead25data[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead25i, 10)] = 4;
                                            break;
                                        case 1:
                                            GLF_dead25data[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead25i, 10)] = 3;
                                            break;
                                        case 2:
                                            if (_GLF_DEAD(false)) {
                                                {
                                                    GLF_dead5b_b = 0.5 - GLF_dead5b_b;
                                                }
                                            }
                                            if (_GLF_WRAPPED_IF_FALSE(false)) {
                                            } else {
                                                GLF_dead25data[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead25i, 10)] = 2;
                                            }
                                            break;
                                        case 3:
                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                GLF_dead25data[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead25i, 10)] = 1;
                                            } else {
                                                if (_GLF_DEAD(false)) {
                                                    vec2 donor_replacementGLF_dead29a = _GLF_FUZZED(GLF_dead24injectionSwitch);
                                                    float donor_replacementGLF_dead29z = _GLF_FUZZED(fwidth(GLF_dead5b_b));
                                                    {
                                                        donor_replacementGLF_dead29z = donor_replacementGLF_dead29a.y / donor_replacementGLF_dead29a.x;
                                                    }
                                                }
                                            }
                                            break;
                                        case 4:
                                            GLF_dead25data[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead25i, 10)] = 0;
                                            break;
                                        case 5:
                                            GLF_dead25data[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead25i, 10)] = -1;
                                            break;
                                        case 6:
                                            if (_GLF_DEAD(false)) {
                                                if (coord.y < 0.0) {
                                                    donor_replacementGLF_dead22limit = -donor_replacementGLF_dead22limit;
                                                }
                                            }
                                            GLF_dead25data[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead25i, 10)] = -2;
                                            break;
                                        case 7:
                                            GLF_dead25data[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead25i, 10)] = -3;
                                            break;
                                        case 8:
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                vec2 donor_replacementGLF_dead29a = _GLF_FUZZED(GLF_dead24injectionSwitch);
                                                float donor_replacementGLF_dead29z = _GLF_FUZZED(dFdxFine(0.5));
                                                {
                                                    donor_replacementGLF_dead29z = donor_replacementGLF_dead29a.y / donor_replacementGLF_dead29a.x;
                                                }
                                            }
                                            do {
                                                GLF_dead25data[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead25i, 10)] = -4;
                                            } while (_GLF_WRAPPED_LOOP(false));
                                            break;
                                        case 9:
                                            GLF_dead25data[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead25i, 10)] = -5;
                                            break;
                                    }
                                    donor_replacementGLF_dead25i++;
                                }
                                if (_GLF_DEAD(false)) {
                                    int donor_replacementGLF_dead30i = _GLF_FUZZED(donor_replacementGLF_dead3iteration);
                                    if (donor_replacementGLF_dead30i < int(GLF_dead30gl_FragCoord.x)) {
                                        break;
                                    }
                                }
                            }
                            for (int _injected_loop_counter = int(_GLF_ZERO(0.0, injectionSwitch.x)); _GLF_WRAPPED_LOOP(_injected_loop_counter != ((1 << _GLF_IDENTITY(int(1), _GLF_IDENTITY(int(1), (int(1)) * 1))) >> _GLF_IDENTITY(int(1), int(1)))); _injected_loop_counter++) {
                                if (mod(float(GLF_dead22i), GLF_dead5b_b) <= 0.01) {
                                    for (int _injected_loop_counter = int(_GLF_ONE(1.0, injectionSwitch.y)); _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
                                        donor_replacementGLF_dead3y += 0.2;
                                    }
                                }
                            }
                            for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
                                if (float(GLF_dead22i) >= donor_replacementGLF_dead22limit) {
                                    ;
                                }
                            }
                        }
                    }
                    if (coord.y < donor_replacementGLF_dead10quad.y) {
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            ivec2 donor_replacementGLF_dead26pos = _GLF_FUZZED(ivec2(95270, 31689));
                            if (donor_replacementGLF_dead26pos.x < GLF_dead26dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead26pos.y, 256)] + 15 && donor_replacementGLF_dead26pos.x > GLF_dead26dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead26pos.y, 256)] - 15) {
                                float GLF_dead26p = (15.0 - abs(float(donor_replacementGLF_dead26pos.x - GLF_dead26dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead26pos.y, 256)]))) / 15.0;
                                ;
                            }
                        }
                        ;
                    }
                }
            }
            if (_GLF_DEAD(false)) {
                ivec2 donor_replacementGLF_dead26pos = _GLF_FUZZED(ivec2(-69218, -15680));
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    uint donor_replacementGLF_dead28matrix_number = _GLF_FUZZED(5478u);
                    {
                        for (int GLF_dead28c = 0; GLF_dead28c < GLF_dead18MATRIX_N; GLF_dead28c++) {
                            for (int GLF_dead28r = 0; GLF_dead28r < GLF_dead6MATRIX_N; GLF_dead28r++) {
                                switch (donor_replacementGLF_dead28matrix_number) {
                                    case 0u:
                                        GLF_dead28m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 2)] = GLF_dead28one;
                                        break;
                                    case 1u:
                                        GLF_dead28m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 3)] = GLF_dead28one;
                                        break;
                                    case 2u:
                                        GLF_dead28m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 4)] = GLF_dead28one;
                                        break;
                                    case 3u:
                                        GLF_dead28m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 2)] = GLF_dead28one;
                                        break;
                                    case 4u:
                                        GLF_dead28m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 3)] = GLF_dead28one;
                                        break;
                                    case 5u:
                                        GLF_dead28m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 4)] = GLF_dead28one;
                                        break;
                                    case 6u:
                                        GLF_dead28m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 2)] = GLF_dead28one;
                                        break;
                                    case 7u:
                                        GLF_dead28m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 3)] = GLF_dead28one;
                                        break;
                                    case 8u:
                                        GLF_dead28m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead28r, 4)] = GLF_dead28one;
                                        break;
                                }
                            }
                        }
                        donor_replacementGLF_dead28matrix_number = donor_replacementGLF_dead28matrix_number + 1u;
                    }
                }
                while (donor_replacementGLF_dead26pos.y != 256) {
                    if (donor_replacementGLF_dead26pos.x < GLF_dead26dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead26pos.y, 256)] + 15 && donor_replacementGLF_dead26pos.x > GLF_dead26dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead26pos.y, 256)] - 15) {
                        float GLF_dead26p = (15.0 - abs(float(donor_replacementGLF_dead26pos.x - GLF_dead26dp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead26pos.y, 256)]))) / 15.0;
                        ;
                    }
                    donor_replacementGLF_dead26pos.y++;
                }
                if (_GLF_DEAD(false)) {
                    if (i >= int(GLF_dead30resolution.x)) {
                        ;
                    }
                }
            }
            do {
                _GLF_color = vec4(res.xyz, 1.0);
            } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.x < sin(0.0)))));
        }
    } else {
    }
}
