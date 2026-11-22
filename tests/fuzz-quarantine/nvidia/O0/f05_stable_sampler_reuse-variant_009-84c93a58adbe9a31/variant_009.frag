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

vec4 GLF_dead28gl_FragCoord = _GLF_FUZZED((vec2(-135.149, 860.657).r * vec4(4990.3323, -740.400, -6857.5950, 3.0)));
vec4 GLF_dead26_GLF_color = _GLF_FUZZED(vec3(6.5, 5.4, 464.501).gbbg);

struct GLF_dead27QuicksortObject {
    int numbers[10];
};

GLF_dead27QuicksortObject GLF_dead27obj = GLF_dead27QuicksortObject(int[10](0, 0, 0, 0, 0, 0, 0, 0, 0, 0));

void GLF_dead27swap(int GLF_dead27i, int GLF_dead27j) {
    int GLF_dead27temp = GLF_dead27obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead27i, 10)];
    GLF_dead27obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead27i, 10)] = GLF_dead27obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead27j, 10)];
    GLF_dead27obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead27j, 10)] = GLF_dead27temp;
}

vec4 GLF_dead25gl_FragCoord = _GLF_FUZZED(((-7010.8474) * vec4(1.1, -4.2, -6353.8233, -2445.9941)));

layout(set = 0, binding = 2) uniform buf2 {
    vec2 GLF_dead25injectionSwitch;
};

layout(set = 0, binding = 3) uniform buf3 {
    vec2 GLF_dead25resolution;
};

vec4 GLF_dead20gl_FragCoord = _GLF_FUZZED(vec4(94.71, 96.21, -86.97, 11.93));

layout(set = 0, binding = 4) uniform buf4 {
    vec2 GLF_dead20injectionSwitch;
};

vec4 GLF_dead21_GLF_color = _GLF_FUZZED(vec4(-485.044, -149.936, -452.370, -50.87).zzxx);

layout(set = 0, binding = 5) uniform buf5 {
    vec2 GLF_dead21injectionSwitch;
};

float GLF_dead21compute_derivative_x(float GLF_dead21v) {
    return dFdx(GLF_dead21v) * GLF_dead21injectionSwitch.y;
}

float GLF_dead21compute_derivative_y(float GLF_dead21v) {
    return dFdy(GLF_dead21v) * GLF_dead21injectionSwitch.y;
}

float GLF_dead21compute_stripe(float GLF_dead21v, float GLF_dead21t) {
    return smoothstep(-.9, 1., (GLF_dead21v) / (20.0 * ((GLF_dead21injectionSwitch.y > GLF_dead21injectionSwitch.x) ? GLF_dead21compute_derivative_x(GLF_dead21t) : GLF_dead21compute_derivative_y(GLF_dead21t))));
}

vec4 GLF_dead16_GLF_color = _GLF_FUZZED(vec4(73.93, -4333.7907, 616.968, 7.3));
vec4 GLF_dead13_GLF_color = _GLF_FUZZED(vec4(-6.5, 15.44, 645.534, -3380.1789));
int GLF_dead13map[16 * 16] = int[256](0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
vec4 GLF_dead15gl_FragCoord = _GLF_FUZZED((vec4(8097.0346, -79.19, -2.5, 5.2)));
int GLF_dead15data[10] = int[10](_GLF_FUZZED(28630), _GLF_FUZZED((~(+(-60131)))), _GLF_FUZZED(93551), _GLF_FUZZED(-73004), _GLF_FUZZED((21594 | 93218)), _GLF_FUZZED(((-67585) - (~((-16202) | (-65618))))), _GLF_FUZZED((+52036)), _GLF_FUZZED(((-88791) | (-77346))), _GLF_FUZZED(-26484), _GLF_FUZZED(84905)), GLF_dead15temp[10] = int[10](_GLF_FUZZED((-70694)), _GLF_FUZZED(90210), _GLF_FUZZED((+79673)), _GLF_FUZZED(-24859), _GLF_FUZZED(87595), _GLF_FUZZED((~(-(-11020)))), _GLF_FUZZED(-69577), _GLF_FUZZED(65513), _GLF_FUZZED(-6978), _GLF_FUZZED(ivec3(-95668, 77154, -41319).p));

layout(set = 0, binding = 6) uniform buf6 {
    float GLF_dead10one;
};

mat2 GLF_dead10m22 = _GLF_FUZZED(((-3.5) * mat2(-7713.3404, -9.7, 5573.3126, -5686.3217)));
mat2x3 GLF_dead10m23 = _GLF_FUZZED(mat2x3(-5953.1670, 8142.5096, 3.6, -6.0, -79.36, 862.386));
mat2x4 GLF_dead10m24 = _GLF_FUZZED((mat4(9.8, -4551.3212, -858.738, -8327.5359, -721.273, 49.21, 8223.3915, -2.6, -8.9, -48.05, 9893.2996, 2880.0419, -2.7, -361.749, 9.1, 57.22) * mat2x4(-2.5, 35.32, 1.9, 0.3, 4.0, 156.711, 0.4, 8.3)));
mat3x2 GLF_dead10m32 = _GLF_FUZZED(mat3x2(mat4(mat2x4(-3331.1830, -4175.9368, 7049.2823, 35.98, -9.2, -6733.5418, -2.7, 3736.7890))));
mat3 GLF_dead10m33 = _GLF_FUZZED(mat3(-14.64, -69.17, 7756.2302, 5.7, 12.92, 677.739, -1.8, 64.18, 8582.7280));
mat3x4 GLF_dead10m34 = _GLF_FUZZED(mat3x4(-2.7, -394.921, 1.5, 614.814, 356.881, -85.81, -28.70, -17.88, 531.170, -0.3, 3442.6914, 29.12));
mat4x2 GLF_dead10m42 = _GLF_FUZZED(mat4x2(-4.8, -6639.0856, -8.1, -6130.3921, -0.6, 4.5, -7479.1562, 287.769));
mat4x3 GLF_dead10m43 = _GLF_FUZZED((mat4x3(-9.5, 4613.1521, -1.3, -0.3, -6.9, 17.87, -7.6, 52.31, -147.338, 8.4, -2.8, -6.2) + (-7951.0176)));
mat4 GLF_dead10m44 = _GLF_FUZZED(mat4(5788.9349, 7.6, -58.85, 61.73, -33.22, 737.467, -147.690, -2.8, -3033.5287, -0.6, 1.0, 4.2, -72.85, -3.6, 7.8, -93.41));
vec4 GLF_dead12_GLF_color = _GLF_FUZZED(vec4(-7117.0304, -1050.2471, 4.8, -8358.6743));

layout(set = 0, binding = 7) uniform buf7 {
    vec2 GLF_dead9injectionSwitch;
};

layout(set = 0, binding = 8) uniform sampler2D GLF_dead8tex;
const float GLF_dead8weights[9] = float[9](1.0, 0.5, -0.25, 0.5, 1.0, -0.5, -0.25, -0.5, -1.0);
const int GLF_dead5N = 10;
int GLF_dead5data[10] = int[10](_GLF_FUZZED(int((+80725u))), _GLF_FUZZED((+(-56219))), _GLF_FUZZED((+(-54516))), _GLF_FUZZED(25064), _GLF_FUZZED(-80530), _GLF_FUZZED(84777), _GLF_FUZZED(((+25672) ^ (((-63034) ^ (-46746)) & (33878 ^ 5842)))), _GLF_FUZZED((88016 & 70578)), _GLF_FUZZED(-4612), _GLF_FUZZED(((-13012) | (~15668)))), GLF_dead5temp[10] = int[10](_GLF_FUZZED((-64357)), _GLF_FUZZED(12764), _GLF_FUZZED(ivec3(60866, -25640, -82668).t), _GLF_FUZZED(-96536), _GLF_FUZZED(73066), _GLF_FUZZED(((mat4x2(-9.0, -3.3, 1.0, 441.703, 7987.7751, -6351.9203, 2.6, -73.83) == mat4x2(6.4, 8.6, 5.2, 740.194, -203.955, 9453.0787, -4.4, 8.1)) ? (-59796) : (-5202))), _GLF_FUZZED(-98474), _GLF_FUZZED(((-225) + 31179)), _GLF_FUZZED(-95904), _GLF_FUZZED((45597 & ivec4(53059, 81227, -81589, -49432).q)));

void GLF_dead5merge(int GLF_dead5from, int GLF_dead5mid, int GLF_dead5to) {
    int GLF_dead5k = GLF_dead5from, GLF_dead5i = GLF_dead5from, GLF_dead5j = GLF_dead5mid + 1;
    while (GLF_dead5i <= GLF_dead5mid && GLF_dead5j <= GLF_dead5to) {
        if (GLF_dead5data[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead5i, 10)] < GLF_dead5data[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead5j, 10)]) {
            GLF_dead5temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead5k++, 10)] = GLF_dead5data[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead5i++, 10)];
        } else {
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                uint donor_replacementGLF_dead10matrix_number = _GLF_FUZZED((bitfieldInsert(uint(9.7), (21584u + 59616u), GLF_dead5mid, GLF_dead5j) >> 48216u));
                for (int GLF_dead10cols = 2; GLF_dead10cols <= 4; GLF_dead10cols++) {
                    if (_GLF_DEAD(false)) {
                        float donor_replacementGLF_dead19c_im = _GLF_FUZZED(fract(GLF_dead10one));
                        float donor_replacementGLF_dead19c_re = _GLF_FUZZED(dFdxFine(GLF_dead10one));
                        int donor_replacementGLF_dead19iteration = _GLF_FUZZED(GLF_dead5i);
                        float donor_replacementGLF_dead19x = _GLF_FUZZED(log2(mod(4.1, GLF_dead10one)));
                        if (_GLF_DEAD(false)) {
                            int donor_replacementGLF_dead22i = _GLF_FUZZED(GLF_dead5k);
                            float donor_replacementGLF_dead22result = _GLF_FUZZED(round(cosh(dFdyCoarse(593.096))));
                            float donor_replacementGLF_dead22thirty_two = _GLF_FUZZED(donor_replacementGLF_dead19c_im);
                            if (mod(float(donor_replacementGLF_dead22i), round(donor_replacementGLF_dead22thirty_two)) <= 0.01) {
                                donor_replacementGLF_dead22result += 100.0;
                            }
                        }
                        if (_GLF_DEAD(false)) {
                            vec2 donor_replacementGLF_dead26coord = _GLF_FUZZED((GLF_dead25resolution / vec2(donor_replacementGLF_dead19c_re, donor_replacementGLF_dead19x)));
                            {
                                if (donor_replacementGLF_dead26coord.y < 0.6) {
                                    uvec2 GLF_dead26icoord = uvec2(((donor_replacementGLF_dead26coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                                    uint GLF_dead26res1 = uint(((GLF_dead26icoord.x * GLF_dead26icoord.y) >> (GLF_dead26icoord.x & 31u)) & 0xffffffffu);
                                    uint GLF_dead26res2 = uint(((GLF_dead26icoord.x * GLF_dead26icoord.y) << (GLF_dead26icoord.x & 31u)) & 0xffffffffu);
                                    float GLF_dead26res = float(((GLF_dead26res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_dead26res1 & 1u) != 0u ? 1u : 0u));
                                    GLF_dead26_GLF_color = vec4(GLF_dead26res, GLF_dead26res, GLF_dead26res, 1.0);
                                } else {
                                    ivec2 GLF_dead26icoord = ivec2(((donor_replacementGLF_dead26coord - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                                    int GLF_dead26res3 = ((GLF_dead26icoord.x >> 5) & 1) ^ ((GLF_dead26icoord.y & 32) >> 5);
                                    int GLF_dead26res2 = (GLF_dead26icoord.y * GLF_dead26icoord.y >> 10) & 1;
                                    int GLF_dead26res1 = (GLF_dead26icoord.x * GLF_dead26icoord.y >> 9) & 1;
                                    GLF_dead26_GLF_color = vec4(float(GLF_dead26res1 ^ GLF_dead26res2), float(GLF_dead26res2 & GLF_dead26res3), float(GLF_dead26res1 | GLF_dead26res3), 1.0);
                                }
                            }
                        }
                        float donor_replacementGLF_dead19y = _GLF_FUZZED(distance(vec3(-118.511, 6.2, -2.0), vec3(-5.9, -770.835, -8187.6712)));
                        {
                            if (donor_replacementGLF_dead19x * donor_replacementGLF_dead19x + donor_replacementGLF_dead19y * donor_replacementGLF_dead19y > 4.0) {
                                break;
                            }
                            float GLF_dead19x_new = donor_replacementGLF_dead19x * donor_replacementGLF_dead19x - donor_replacementGLF_dead19y * donor_replacementGLF_dead19y + donor_replacementGLF_dead19c_re;
                            donor_replacementGLF_dead19y = 2.0 * donor_replacementGLF_dead19x * donor_replacementGLF_dead19y + donor_replacementGLF_dead19c_im;
                            donor_replacementGLF_dead19x = GLF_dead19x_new;
                            donor_replacementGLF_dead19iteration++;
                        }
                    }
                    for (int GLF_dead10rows = 2; GLF_dead10rows <= 4; GLF_dead10rows++) {
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            vec3 donor_replacementGLF_dead21col = _GLF_FUZZED(vec3(-1.9, -3.2, 2.6));
                            vec2 donor_replacementGLF_dead21uv = _GLF_FUZZED(pow(injectionSwitch, exp2(injectionSwitch)));
                            {
                                float GLF_dead21stripe = GLF_dead21compute_stripe(cos((donor_replacementGLF_dead21uv.x + donor_replacementGLF_dead21uv.y) * 20.0), donor_replacementGLF_dead21uv.x + donor_replacementGLF_dead21uv.y);
                                donor_replacementGLF_dead21col = mix(vec3(donor_replacementGLF_dead21uv.x, 0, 0.75), vec3(.8, .7, donor_replacementGLF_dead21uv.x), GLF_dead21stripe);
                                GLF_dead21_GLF_color = vec4(donor_replacementGLF_dead21col, 1.0);
                                return;
                            }
                        }
                        if (_GLF_DEAD(_GLF_IDENTITY(false, (false) || false))) {
                            vec3 donor_replacementGLF_dead27color = _GLF_FUZZED((vec3(-3471.0274, -914.754, -2359.8651) + (-88.90)));
                            {
                                donor_replacementGLF_dead27color.z += float(GLF_dead27obj.numbers[7]);
                            }
                        }
                        for (int GLF_dead10c = 0; GLF_dead10c < GLF_dead10cols; GLF_dead10c++) {
                            for (int GLF_dead10r = 0; GLF_dead10r < GLF_dead10rows; GLF_dead10r++) {
                                switch (donor_replacementGLF_dead10matrix_number) {
                                    case 0u:
                                        GLF_dead10m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10r, 2)] = GLF_dead10one;
                                        break;
                                    case 1u:
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                            bool donor_replacementGLF_dead13canwalk = _GLF_FUZZED(false);
                                            ivec2 donor_replacementGLF_dead13ipos = _GLF_FUZZED(ivec2(-87484, 26927));
                                            if (_GLF_DEAD(false)) {
                                                int donor_replacementGLF_dead22i = _GLF_FUZZED((donor_replacementGLF_dead13ipos | GLF_dead5k)[0]);
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                    int donor_replacementGLF_dead29v = _GLF_FUZZED(GLF_dead5N);
                                                    {
                                                        donor_replacementGLF_dead29v = 3 * donor_replacementGLF_dead29v + 1;
                                                    }
                                                }
                                                int donor_replacementGLF_dead22iters = _GLF_FUZZED(floatBitsToInt(GLF_dead10one));
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                    {
                                                        ;
                                                    }
                                                }
                                                int donor_replacementGLF_dead22v = _GLF_FUZZED(GLF_dead5N);
                                                for (donor_replacementGLF_dead22i = 0; donor_replacementGLF_dead22i < donor_replacementGLF_dead22iters; donor_replacementGLF_dead22i++) {
                                                    donor_replacementGLF_dead22v = (4 * donor_replacementGLF_dead22v * (1000 - donor_replacementGLF_dead22v)) / 1000;
                                                }
                                            }
                                            if (_GLF_DEAD(false)) {
                                                float donor_replacementGLF_dead24th = _GLF_FUZZED(GLF_dead10one);
                                                {
                                                    donor_replacementGLF_dead24th = -donor_replacementGLF_dead24th;
                                                    if (_GLF_DEAD(false)) {
                                                        vec2 donor_replacementGLF_dead26coord = _GLF_FUZZED(GLF_dead9injectionSwitch);
                                                        {
                                                            ivec2 GLF_dead26icoord = ivec2(((donor_replacementGLF_dead26coord - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                                                            int GLF_dead26res3 = ((GLF_dead26icoord.x >> 5) & 1) ^ ((GLF_dead26icoord.y & 32) >> 5);
                                                            int GLF_dead26res2 = (GLF_dead26icoord.y * GLF_dead26icoord.y >> 10) & 1;
                                                            int GLF_dead26res1 = (GLF_dead26icoord.x * GLF_dead26icoord.y >> 9) & 1;
                                                            GLF_dead26_GLF_color = vec4(float(GLF_dead26res1 ^ GLF_dead26res2), float(GLF_dead26res2 & GLF_dead26res3), float(GLF_dead26res1 | GLF_dead26res3), 1.0);
                                                        }
                                                    }
                                                }
                                            }
                                            ivec2 donor_replacementGLF_dead13p = _GLF_FUZZED(ivec2(33188, -68640));
                                            if (_GLF_DEAD(false)) {
                                                int donor_replacementGLF_dead22i = _GLF_FUZZED(GLF_dead5j);
                                                int donor_replacementGLF_dead22iters = _GLF_FUZZED(GLF_dead5mid);
                                                int donor_replacementGLF_dead22v = _GLF_FUZZED((GLF_dead10cols ^ (-42209)));
                                                for (donor_replacementGLF_dead22i = 0; donor_replacementGLF_dead22i < donor_replacementGLF_dead22iters; donor_replacementGLF_dead22i++) {
                                                    donor_replacementGLF_dead22v = (4 * donor_replacementGLF_dead22v * (1000 - donor_replacementGLF_dead22v)) / 1000;
                                                }
                                            }
                                            int donor_replacementGLF_dead13v = _GLF_FUZZED(clamp(GLF_dead5N, GLF_dead5j, ivec3(19356, -16289, -13010).r));
                                            if (_GLF_DEAD(_GLF_IDENTITY(false, (false) && true))) {
                                                for (int GLF_dead27i = 0; GLF_dead27i < 10; GLF_dead27i++) {
                                                    GLF_dead27obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead27i, 10)] = (10 - GLF_dead27i);
                                                    GLF_dead27obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead27i, 10)] = GLF_dead27obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead27i, 10)] * GLF_dead27obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead27i, 10)];
                                                }
                                            }
                                            {
                                                donor_replacementGLF_dead13v++;
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                    int donor_replacementGLF_dead22iters = _GLF_FUZZED(GLF_dead5to);
                                                    int donor_replacementGLF_dead22v = _GLF_FUZZED(GLF_dead5from);
                                                    for (GLF_dead10r = 0; GLF_dead10r < donor_replacementGLF_dead22iters; GLF_dead10r++) {
                                                        donor_replacementGLF_dead22v = (4 * donor_replacementGLF_dead22v * (1000 - donor_replacementGLF_dead22v)) / 1000;
                                                    }
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                        int donor_replacementGLF_dead27i = _GLF_FUZZED(-30314);
                                                        {
                                                            GLF_dead27obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead27i, 10)] = (10 - donor_replacementGLF_dead27i);
                                                            GLF_dead27obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead27i, 10)] = GLF_dead27obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead27i, 10)] * GLF_dead27obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead27i, 10)];
                                                        }
                                                    }
                                                }
                                                int GLF_dead13directions = 0;
                                                if (_GLF_DEAD(false)) {
                                                    float donor_replacementGLF_dead22limit = _GLF_FUZZED(3160.9347);
                                                    float donor_replacementGLF_dead22result = _GLF_FUZZED(dFdxFine(4503.1123));
                                                    float donor_replacementGLF_dead22thirty_two = _GLF_FUZZED(-2662.2121);
                                                    for (int GLF_dead22i = 1; GLF_dead22i < 800; GLF_dead22i++) {
                                                        if ((GLF_dead22i % 32) == 0) {
                                                            donor_replacementGLF_dead22result += 0.4;
                                                        } else {
                                                            if (mod(float(GLF_dead22i), round(donor_replacementGLF_dead22thirty_two)) <= 0.01) {
                                                                donor_replacementGLF_dead22result += 100.0;
                                                            }
                                                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                                vec2 donor_replacementGLF_dead26coord = _GLF_FUZZED(GLF_dead25resolution);
                                                                if (donor_replacementGLF_dead26coord.x > 0.4) {
                                                                    if (donor_replacementGLF_dead26coord.y < 0.6) {
                                                                        uvec2 GLF_dead26icoord = uvec2(((donor_replacementGLF_dead26coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                                                                        uint GLF_dead26res1 = uint(((GLF_dead26icoord.x * GLF_dead26icoord.y) >> (GLF_dead26icoord.x & 31u)) & 0xffffffffu);
                                                                        uint GLF_dead26res2 = uint(((GLF_dead26icoord.x * GLF_dead26icoord.y) << (GLF_dead26icoord.x & 31u)) & 0xffffffffu);
                                                                        float GLF_dead26res = float(((GLF_dead26res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_dead26res1 & 1u) != 0u ? 1u : 0u));
                                                                        GLF_dead26_GLF_color = vec4(GLF_dead26res, GLF_dead26res, GLF_dead26res, 1.0);
                                                                    } else {
                                                                        ivec2 GLF_dead26icoord = ivec2(((donor_replacementGLF_dead26coord - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                                                                        int GLF_dead26res3 = ((GLF_dead26icoord.x >> 5) & 1) ^ ((GLF_dead26icoord.y & 32) >> 5);
                                                                        int GLF_dead26res2 = (GLF_dead26icoord.y * GLF_dead26icoord.y >> 10) & 1;
                                                                        int GLF_dead26res1 = (GLF_dead26icoord.x * GLF_dead26icoord.y >> 9) & 1;
                                                                        GLF_dead26_GLF_color = vec4(float(GLF_dead26res1 ^ GLF_dead26res2), float(GLF_dead26res2 & GLF_dead26res3), float(GLF_dead26res1 | GLF_dead26res3), 1.0);
                                                                    }
                                                                } else {
                                                                    ivec2 GLF_dead26icoord = ivec2(((donor_replacementGLF_dead26coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.6, 1.0)) * 256.0);
                                                                    int GLF_dead26v = (GLF_dead26icoord.x ^ GLF_dead26icoord.y) * GLF_dead26icoord.y;
                                                                    bool GLF_dead26res1 = ((GLF_dead26v >> 10) & 1) != 0;
                                                                    bool GLF_dead26res2 = ((GLF_dead26v >> 11) & 4) != 0;
                                                                    bool GLF_dead26res3 = ((GLF_dead26v >> 12) & 8) != 0;
                                                                    GLF_dead26_GLF_color = vec4(GLF_dead26res1 ? 1.0 : 0.0, GLF_dead26res2 ? 1.0 : 0.0, GLF_dead26res3 ? 1.0 : 0.0, 1);
                                                                }
                                                            }
                                                        }
                                                        if (float(GLF_dead22i) >= donor_replacementGLF_dead22limit) {
                                                            ;
                                                        }
                                                    }
                                                }
                                                if (donor_replacementGLF_dead13p.x > 0 && GLF_dead13map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead13p.x - 2) + (donor_replacementGLF_dead13p.y) * 16, 256)] == 0) {
                                                    if (_GLF_DEAD(_GLF_IDENTITY(false, true && (false)))) {
                                                        vec2 donor_replacementGLF_dead16coord = _GLF_FUZZED(injectionSwitch);
                                                        {
                                                            ivec2 GLF_dead16icoord = ivec2(((donor_replacementGLF_dead16coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.6, 1.0)) * 256.0);
                                                            if (_GLF_DEAD(false)) {
                                                                vec2 donor_replacementGLF_dead24a = _GLF_FUZZED((GLF_dead20injectionSwitch - GLF_dead21injectionSwitch));
                                                                float donor_replacementGLF_dead24z = _GLF_FUZZED(floor(GLF_dead10one));
                                                                if (donor_replacementGLF_dead24a.y > donor_replacementGLF_dead24a.x) {
                                                                    donor_replacementGLF_dead24z = donor_replacementGLF_dead24a.x / donor_replacementGLF_dead24a.y;
                                                                } else {
                                                                    donor_replacementGLF_dead24z = donor_replacementGLF_dead24a.y / donor_replacementGLF_dead24a.x;
                                                                }
                                                            }
                                                            int GLF_dead16v = (GLF_dead16icoord.x ^ GLF_dead16icoord.y) * GLF_dead16icoord.y;
                                                            bool GLF_dead16res1 = ((GLF_dead16v >> 10) & 1) != 0;
                                                            bool GLF_dead16res2 = ((GLF_dead16v >> 11) & 4) != 0;
                                                            bool GLF_dead16res3 = ((GLF_dead16v >> 12) & 8) != 0;
                                                            GLF_dead16_GLF_color = vec4(GLF_dead16res1 ? 1.0 : 0.0, GLF_dead16res2 ? 1.0 : 0.0, GLF_dead16res3 ? 1.0 : 0.0, 1);
                                                        }
                                                        if (_GLF_DEAD(false)) {
                                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                                vec3 donor_replacementGLF_dead27color = _GLF_FUZZED(vec3(6635.3627, -7.3, -3.4));
                                                                {
                                                                    donor_replacementGLF_dead27color.x += float(GLF_dead27obj.numbers[5]);
                                                                }
                                                            }
                                                            float donor_replacementGLF_dead19xCoord = _GLF_FUZZED(dot(vec3(GLF_dead10one, cosh(injectionSwitch)), vec3(-1.4, 237.627, 7.0)));
                                                            float donor_replacementGLF_dead19yCoord = _GLF_FUZZED(trunc(vec3(6765.9482, 5024.5859, 2.1)).z);
                                                            {
                                                                ;
                                                            }
                                                        }
                                                    }
                                                    GLF_dead13directions += 1;
                                                }
                                                if (donor_replacementGLF_dead13p.y > 0 && GLF_dead13map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead13p.x) + (donor_replacementGLF_dead13p.y - 2) * 16, 256)] == 0) {
                                                    GLF_dead13directions += 1;
                                                }
                                                if (donor_replacementGLF_dead13p.x < 14 && GLF_dead13map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead13p.x + 2) + (donor_replacementGLF_dead13p.y) * 16, 256)] == 0) {
                                                    GLF_dead13directions += 1;
                                                }
                                                if (donor_replacementGLF_dead13p.y < 14 && GLF_dead13map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead13p.x) + (donor_replacementGLF_dead13p.y + 2) * 16, 256)] == 0) {
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_IDENTITY(dot(vec4(1.0, 0.0, _GLF_IDENTITY(dot(vec2(1.0, 1.0), vec2(0.0, 0.0)), dot(vec2(1.0, 1.0), vec2(0.0, 0.0))), 1.0), vec4(0.0, 1.0, 1.0, 0.0)), dot(vec4(1.0, 0.0, _GLF_IDENTITY(dot(vec2(1.0, 1.0), vec2(0.0, 0.0)), dot(vec2(1.0, 1.0), vec2(0.0, 0.0))), 1.0), vec4(0.0, 1.0, 1.0, 0.0))))))) {
                                                        vec2 donor_replacementGLF_dead24v = _GLF_FUZZED((vec3(-7.5, 4.5, 9.1) * GLF_dead10m23));
                                                        if (length(donor_replacementGLF_dead24v) < 0.001) {
                                                            ;
                                                        }
                                                    }
                                                    GLF_dead13directions += 1;
                                                }
                                                if (GLF_dead13directions == 0) {
                                                    donor_replacementGLF_dead13canwalk = false;
                                                    int GLF_dead13j = _GLF_FUZZED(-9411);
                                                    if (_GLF_DEAD(false)) {
                                                        int donor_replacementGLF_dead27i = _GLF_FUZZED(((donor_replacementGLF_dead13p == donor_replacementGLF_dead13p) ? GLF_dead10r : GLF_dead10r));
                                                        int donor_replacementGLF_dead27j = _GLF_FUZZED(GLF_dead5j);
                                                        {
                                                            donor_replacementGLF_dead27i++;
                                                            GLF_dead27swap(donor_replacementGLF_dead27i, donor_replacementGLF_dead27j);
                                                        }
                                                    }
                                                    for (GLF_dead5j = 0; GLF_dead5j < 8; GLF_dead5j++) {
                                                        for (GLF_dead13j = 0; GLF_dead13j < 8; GLF_dead13j++) {
                                                            if (GLF_dead13map[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13j * 2 + GLF_dead5j * 2 * 16, 256)] == 0) {
                                                                donor_replacementGLF_dead13p.x = GLF_dead13j * 2;
                                                                donor_replacementGLF_dead13p.y = GLF_dead5j * 2;
                                                                donor_replacementGLF_dead13canwalk = true;
                                                            }
                                                            if (_GLF_DEAD(false)) {
                                                                vec2 donor_replacementGLF_dead26coord = _GLF_FUZZED(tanh(GLF_dead25injectionSwitch));
                                                                {
                                                                    uvec2 GLF_dead26icoord = uvec2(((donor_replacementGLF_dead26coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                                                                    uint GLF_dead26res1 = uint(((GLF_dead26icoord.x * GLF_dead26icoord.y) >> (GLF_dead26icoord.x & 31u)) & 0xffffffffu);
                                                                    uint GLF_dead26res2 = uint(((GLF_dead26icoord.x * GLF_dead26icoord.y) << (GLF_dead26icoord.x & 31u)) & 0xffffffffu);
                                                                    float GLF_dead26res = float(((GLF_dead26res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_dead26res1 & 1u) != 0u ? 1u : 0u));
                                                                    GLF_dead26_GLF_color = vec4(GLF_dead26res, GLF_dead26res, GLF_dead26res, 1.0);
                                                                }
                                                            }
                                                        }
                                                    }
                                                    GLF_dead13map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead13p.x) + (donor_replacementGLF_dead13p.y) * 16, 256)] = 1;
                                                } else {
                                                    int GLF_dead13d = donor_replacementGLF_dead13v % GLF_dead13directions;
                                                    donor_replacementGLF_dead13v += GLF_dead13directions;
                                                    if (GLF_dead13d >= 0 && donor_replacementGLF_dead13p.x > 0 && GLF_dead13map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead13p.x - 2) + (donor_replacementGLF_dead13p.y) * 16, 256)] == 0) {
                                                        GLF_dead13d--;
                                                        GLF_dead13map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead13p.x) + (donor_replacementGLF_dead13p.y) * 16, 256)] = 1;
                                                        GLF_dead13map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead13p.x - 1) + (donor_replacementGLF_dead13p.y) * 16, 256)] = 1;
                                                        if (_GLF_DEAD(false)) {
                                                            vec3 donor_replacementGLF_dead22c = _GLF_FUZZED(vec3(-9436.2356, -4.2, 7.6));
                                                            int donor_replacementGLF_dead22i = _GLF_FUZZED((+GLF_dead13d));
                                                            if (donor_replacementGLF_dead22c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead22i, 3)] >= 1.0) {
                                                                donor_replacementGLF_dead22c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead22i, 3)] = donor_replacementGLF_dead22c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead22i, 3)] * donor_replacementGLF_dead22c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead22i, 3)];
                                                            }
                                                        }
                                                        GLF_dead13map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead13p.x - 2) + (donor_replacementGLF_dead13p.y) * 16, 256)] = 1;
                                                        donor_replacementGLF_dead13p.x -= 2;
                                                    }
                                                    if (GLF_dead13d >= 0 && donor_replacementGLF_dead13p.y > 0 && GLF_dead13map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead13p.x) + (donor_replacementGLF_dead13p.y - 2) * 16, 256)] == 0) {
                                                        GLF_dead13d--;
                                                        GLF_dead13map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead13p.x) + (donor_replacementGLF_dead13p.y) * 16, 256)] = 1;
                                                        GLF_dead13map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead13p.x) + (donor_replacementGLF_dead13p.y - 1) * 16, 256)] = 1;
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                            int donor_replacementGLF_dead20a = _GLF_FUZZED((GLF_dead13d % GLF_dead5mid));
                                                            int donor_replacementGLF_dead20b = _GLF_FUZZED(GLF_dead10c);
                                                            int donor_replacementGLF_dead20c = _GLF_FUZZED(GLF_dead10cols);
                                                            vec2 donor_replacementGLF_dead20uv = _GLF_FUZZED(vec2(938.169, -6.7));
                                                            {
                                                                donor_replacementGLF_dead20uv.y -= step(GLF_dead20injectionSwitch.y, donor_replacementGLF_dead20uv.x) + float(donor_replacementGLF_dead20a) + float(donor_replacementGLF_dead20b);
                                                                donor_replacementGLF_dead20uv.x += ldexp(GLF_dead20injectionSwitch.y, isinf(donor_replacementGLF_dead20uv.y + donor_replacementGLF_dead20uv.x) ? findMSB(donor_replacementGLF_dead20b) : findMSB(donor_replacementGLF_dead20a));
                                                                donor_replacementGLF_dead20c--;
                                                            }
                                                        }
                                                        if (_GLF_DEAD(false)) {
                                                            vec2 donor_replacementGLF_dead26coord = _GLF_FUZZED(max(GLF_dead25injectionSwitch, GLF_dead20injectionSwitch));
                                                            {
                                                                ivec2 GLF_dead26icoord = ivec2(((donor_replacementGLF_dead26coord - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                                                                int GLF_dead26res3 = ((GLF_dead26icoord.x >> 5) & 1) ^ ((GLF_dead26icoord.y & 32) >> 5);
                                                                int GLF_dead26res2 = (GLF_dead26icoord.y * GLF_dead26icoord.y >> 10) & 1;
                                                                int GLF_dead26res1 = (GLF_dead26icoord.x * GLF_dead26icoord.y >> 9) & 1;
                                                                GLF_dead26_GLF_color = vec4(float(GLF_dead26res1 ^ GLF_dead26res2), float(GLF_dead26res2 & GLF_dead26res3), float(GLF_dead26res1 | GLF_dead26res3), 1.0);
                                                            }
                                                        }
                                                        GLF_dead13map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead13p.x) + (donor_replacementGLF_dead13p.y - 2) * 16, 256)] = 1;
                                                        if (_GLF_DEAD(false)) {
                                                            float donor_replacementGLF_dead24th = _GLF_FUZZED(GLF_dead10one);
                                                            vec2 donor_replacementGLF_dead24v = _GLF_FUZZED(GLF_dead21injectionSwitch);
                                                            if (donor_replacementGLF_dead24v.y < 0.0) {
                                                                if (_GLF_DEAD(false)) {
                                                                    {
                                                                        break;
                                                                    }
                                                                }
                                                                donor_replacementGLF_dead24th = -donor_replacementGLF_dead24th;
                                                            }
                                                        }
                                                        donor_replacementGLF_dead13p.y -= 2;
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                            int donor_replacementGLF_dead18iteration = _GLF_FUZZED(GLF_dead10rows);
                                                            {
                                                                if (_GLF_DEAD(false)) {
                                                                    {
                                                                        break;
                                                                    }
                                                                }
                                                                ;
                                                                if (_GLF_DEAD(false)) {
                                                                    int donor_replacementGLF_dead29v = _GLF_FUZZED(donor_replacementGLF_dead18iteration);
                                                                    {
                                                                        donor_replacementGLF_dead29v /= 2;
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                    if (GLF_dead13d >= 0 && donor_replacementGLF_dead13p.x < 14 && GLF_dead13map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead13p.x + 2) + (donor_replacementGLF_dead13p.y) * 16, 256)] == 0) {
                                                        GLF_dead13d--;
                                                        GLF_dead13map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead13p.x) + (donor_replacementGLF_dead13p.y) * 16, 256)] = 1;
                                                        GLF_dead13map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead13p.x + 1) + (donor_replacementGLF_dead13p.y) * 16, 256)] = 1;
                                                        GLF_dead13map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead13p.x + 2) + (donor_replacementGLF_dead13p.y) * 16, 256)] = 1;
                                                        donor_replacementGLF_dead13p.x += 2;
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                            int donor_replacementGLF_dead20a = _GLF_FUZZED(84646);
                                                            vec2 donor_replacementGLF_dead20uv = _GLF_FUZZED(tan(injectionSwitch));
                                                            do {
                                                                donor_replacementGLF_dead20uv.y -= step(GLF_dead20injectionSwitch.y, donor_replacementGLF_dead20uv.x);
                                                                donor_replacementGLF_dead20uv.x -= tanh(donor_replacementGLF_dead20uv.x * 0.25) / ldexp(GLF_dead20injectionSwitch.y, findMSB(donor_replacementGLF_dead20a));
                                                                donor_replacementGLF_dead20a--;
                                                            } while (donor_replacementGLF_dead20a > int(GLF_dead20injectionSwitch.x));
                                                        }
                                                    }
                                                    if (GLF_dead13d >= 0 && donor_replacementGLF_dead13p.y < 14 && GLF_dead13map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead13p.x) + (donor_replacementGLF_dead13p.y + 2) * 16, 256)] == 0) {
                                                        GLF_dead13d--;
                                                        GLF_dead13map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead13p.x) + (donor_replacementGLF_dead13p.y) * 16, 256)] = 1;
                                                        if (_GLF_DEAD(false)) {
                                                            int donor_replacementGLF_dead23iteration = _GLF_FUZZED(GLF_dead13d);
                                                            if (donor_replacementGLF_dead23iteration < 1000) {
                                                                ;
                                                            } else {
                                                                ;
                                                            }
                                                        }
                                                        GLF_dead13map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead13p.x) + (donor_replacementGLF_dead13p.y + 1) * 16, 256)] = 1;
                                                        GLF_dead13map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead13p.x) + (donor_replacementGLF_dead13p.y + 2) * 16, 256)] = 1;
                                                        donor_replacementGLF_dead13p.y += 2;
                                                    }
                                                }
                                                if (GLF_dead13map[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead13ipos.y * 16 + donor_replacementGLF_dead13ipos.x, 256)] == 1) {
                                                    GLF_dead13_GLF_color = vec4(1.0, 1.0, 1.0, 1.0);
                                                    return;
                                                    if (_GLF_DEAD(false)) {
                                                        int donor_replacementGLF_dead29v = _GLF_FUZZED((GLF_dead13directions - (GLF_dead5N)));
                                                        {
                                                            donor_replacementGLF_dead29v /= 2;
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                        GLF_dead10m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10r, 3)] = GLF_dead10one;
                                        break;
                                        if (_GLF_DEAD(false)) {
                                            int donor_replacementGLF_dead22i = _GLF_FUZZED(findMSB(139951u));
                                            int donor_replacementGLF_dead22iters = _GLF_FUZZED((bitfieldExtract(GLF_dead5mid, GLF_dead10rows, bitfieldExtract(GLF_dead10cols, GLF_dead5k, GLF_dead10cols)) / GLF_dead10cols));
                                            int donor_replacementGLF_dead22v = _GLF_FUZZED((31768 ^ GLF_dead5i));
                                            for (donor_replacementGLF_dead22i = 0; donor_replacementGLF_dead22i < donor_replacementGLF_dead22iters; donor_replacementGLF_dead22i++) {
                                                donor_replacementGLF_dead22v = (4 * donor_replacementGLF_dead22v * (1000 - donor_replacementGLF_dead22v)) / 1000;
                                            }
                                        }
                                    case 2u:
                                        GLF_dead10m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10r, 4)] = GLF_dead10one;
                                        break;
                                    case 3u:
                                        GLF_dead10m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10r, 2)] = GLF_dead10one;
                                        break;
                                    case 4u:
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                            float donor_replacementGLF_dead15grey = _GLF_FUZZED(13.74);
                                            {
                                                donor_replacementGLF_dead15grey = 0.5 + float(GLF_dead15data[0]) / 10.0;
                                            }
                                        }
                                        GLF_dead10m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10r, 3)] = GLF_dead10one;
                                        break;
                                    case 5u:
                                        GLF_dead10m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10r, 4)] = GLF_dead10one;
                                        break;
                                    case 6u:
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                            float donor_replacementGLF_dead19x = _GLF_FUZZED(dFdyFine(GLF_dead10one));
                                            float donor_replacementGLF_dead19y = _GLF_FUZZED(GLF_dead10one);
                                            if (_GLF_DEAD(false)) {
                                                int donor_replacementGLF_dead27h = _GLF_FUZZED(GLF_dead5i);
                                                int donor_replacementGLF_dead27i = _GLF_FUZZED((GLF_dead5to / (ivec2(29814, -44641).g - GLF_dead5from)));
                                                int donor_replacementGLF_dead27l = _GLF_FUZZED(ivec3(-26570, -39398, -40812)[0]);
                                                int donor_replacementGLF_dead27pivot = _GLF_FUZZED(GLF_dead5mid);
                                                for (int GLF_dead27j = donor_replacementGLF_dead27l; GLF_dead27j <= donor_replacementGLF_dead27h - 1; GLF_dead27j++) {
                                                    if (GLF_dead27obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead27j, 10)] <= donor_replacementGLF_dead27pivot) {
                                                        donor_replacementGLF_dead27i++;
                                                        GLF_dead27swap(donor_replacementGLF_dead27i, GLF_dead27j);
                                                    }
                                                }
                                            }
                                            if (donor_replacementGLF_dead19x * donor_replacementGLF_dead19x + donor_replacementGLF_dead19y * donor_replacementGLF_dead19y > 4.0) {
                                                break;
                                            }
                                        }
                                        if (_GLF_DEAD(false)) {
                                            vec3 donor_replacementGLF_dead22c = _GLF_FUZZED(abs(clamp(vec3(-7078.4143, -131.211, -9.2), vec3(-7942.2108, 4440.7096, 17.17), vec3(-1.8, 2.5, 5.5))));
                                            int donor_replacementGLF_dead22i = _GLF_FUZZED(GLF_dead5i);
                                            if (donor_replacementGLF_dead22c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead22i, 3)] >= 1.0) {
                                                donor_replacementGLF_dead22c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead22i, 3)] = donor_replacementGLF_dead22c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead22i, 3)] * donor_replacementGLF_dead22c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead22i, 3)];
                                            }
                                        }
                                        GLF_dead10m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10r, 2)] = GLF_dead10one;
                                        break;
                                        if (_GLF_DEAD(false)) {
                                            ivec2 donor_replacementGLF_dead16p = _GLF_FUZZED(ivec2(64756, -95942));
                                            if (donor_replacementGLF_dead16p.x < 0) {
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                    vec2 donor_replacementGLF_dead26coord = _GLF_FUZZED(cosh(GLF_dead9injectionSwitch));
                                                    {
                                                        ivec2 GLF_dead26icoord = ivec2(((donor_replacementGLF_dead26coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.6, 1.0)) * 256.0);
                                                        int GLF_dead26v = (GLF_dead26icoord.x ^ GLF_dead26icoord.y) * GLF_dead26icoord.y;
                                                        bool GLF_dead26res1 = ((GLF_dead26v >> 10) & 1) != 0;
                                                        bool GLF_dead26res2 = ((GLF_dead26v >> 11) & 4) != 0;
                                                        bool GLF_dead26res3 = ((GLF_dead26v >> 12) & 8) != 0;
                                                        GLF_dead26_GLF_color = vec4(GLF_dead26res1 ? 1.0 : 0.0, GLF_dead26res2 ? 1.0 : 0.0, GLF_dead26res3 ? 1.0 : 0.0, 1);
                                                    }
                                                }
                                                donor_replacementGLF_dead16p.y++;
                                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                    float donor_replacementGLF_dead18c_im = _GLF_FUZZED(35.11);
                                                    float donor_replacementGLF_dead18c_re = _GLF_FUZZED(GLF_dead10one);
                                                    int donor_replacementGLF_dead18iteration = _GLF_FUZZED(GLF_dead5from);
                                                    if (_GLF_DEAD(false)) {
                                                        if (_GLF_DEAD(false)) {
                                                            int donor_replacementGLF_dead22i = _GLF_FUZZED(GLF_dead10r);
                                                            float donor_replacementGLF_dead22limit = _GLF_FUZZED(min(donor_replacementGLF_dead18c_im, length(GLF_dead12_GLF_color)));
                                                            float donor_replacementGLF_dead22result = _GLF_FUZZED(ceil(injectionSwitch)[0]);
                                                            if (float(donor_replacementGLF_dead22i) >= donor_replacementGLF_dead22limit) {
                                                                ;
                                                            }
                                                        }
                                                        int donor_replacementGLF_dead22i = _GLF_FUZZED(findMSB(90838u));
                                                        int donor_replacementGLF_dead22iters = _GLF_FUZZED(GLF_dead5mid);
                                                        int donor_replacementGLF_dead22v = _GLF_FUZZED(GLF_dead5mid);
                                                        for (donor_replacementGLF_dead22i = 0; donor_replacementGLF_dead22i < donor_replacementGLF_dead22iters; donor_replacementGLF_dead22i++) {
                                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                                int donor_replacementGLF_dead23c_im = _GLF_FUZZED((~donor_replacementGLF_dead22iters));
                                                                int donor_replacementGLF_dead23c_re = _GLF_FUZZED(GLF_dead5N);
                                                                int donor_replacementGLF_dead23iteration = _GLF_FUZZED(GLF_dead5i);
                                                                int donor_replacementGLF_dead23x = _GLF_FUZZED(findMSB(uint(GLF_dead10cols)));
                                                                int donor_replacementGLF_dead23y = _GLF_FUZZED(findMSB((166643u - donor_replacementGLF_dead10matrix_number)));
                                                                for (int GLF_dead23k = 0; GLF_dead23k < 1000; GLF_dead23k++) {
                                                                    if (donor_replacementGLF_dead23x * donor_replacementGLF_dead23x + donor_replacementGLF_dead23y * donor_replacementGLF_dead23y > 262144) {
                                                                        break;
                                                                    }
                                                                    int GLF_dead23x_new = ((donor_replacementGLF_dead23x * donor_replacementGLF_dead23x - donor_replacementGLF_dead23y * donor_replacementGLF_dead23y) / 256 + donor_replacementGLF_dead23c_re);
                                                                    donor_replacementGLF_dead23y = (2 * donor_replacementGLF_dead23x * donor_replacementGLF_dead23y / 256 + donor_replacementGLF_dead23c_im);
                                                                    donor_replacementGLF_dead23x = GLF_dead23x_new;
                                                                    donor_replacementGLF_dead23iteration++;
                                                                }
                                                            }
                                                            donor_replacementGLF_dead22v = (4 * donor_replacementGLF_dead22v * (1000 - donor_replacementGLF_dead22v)) / 1000;
                                                        }
                                                    }
                                                    float donor_replacementGLF_dead18x = _GLF_FUZZED(GLF_dead10one);
                                                    float donor_replacementGLF_dead18y = _GLF_FUZZED(-7639.5720);
                                                    {
                                                        if (donor_replacementGLF_dead18x * donor_replacementGLF_dead18x + donor_replacementGLF_dead18y * donor_replacementGLF_dead18y > 4.0) {
                                                            break;
                                                        }
                                                        float GLF_dead18x_new = donor_replacementGLF_dead18x * donor_replacementGLF_dead18x - donor_replacementGLF_dead18y * donor_replacementGLF_dead18y + donor_replacementGLF_dead18c_re;
                                                        donor_replacementGLF_dead18y = 2.0 * donor_replacementGLF_dead18x * donor_replacementGLF_dead18y + donor_replacementGLF_dead18c_im;
                                                        donor_replacementGLF_dead18x = GLF_dead18x_new;
                                                        donor_replacementGLF_dead18iteration++;
                                                    }
                                                }
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                    int donor_replacementGLF_dead22v = _GLF_FUZZED(GLF_dead5from);
                                                    if (_GLF_DEAD(false)) {
                                                        vec2 donor_replacementGLF_dead26coord = _GLF_FUZZED(atanh(GLF_dead25injectionSwitch));
                                                        if (donor_replacementGLF_dead26coord.x > 0.4) {
                                                            if (donor_replacementGLF_dead26coord.y < 0.6) {
                                                                uvec2 GLF_dead26icoord = uvec2(((donor_replacementGLF_dead26coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                                                                uint GLF_dead26res1 = uint(((GLF_dead26icoord.x * GLF_dead26icoord.y) >> (GLF_dead26icoord.x & 31u)) & 0xffffffffu);
                                                                uint GLF_dead26res2 = uint(((GLF_dead26icoord.x * GLF_dead26icoord.y) << (GLF_dead26icoord.x & 31u)) & 0xffffffffu);
                                                                float GLF_dead26res = float(((GLF_dead26res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_dead26res1 & 1u) != 0u ? 1u : 0u));
                                                                GLF_dead26_GLF_color = vec4(GLF_dead26res, GLF_dead26res, GLF_dead26res, 1.0);
                                                            } else {
                                                                ivec2 GLF_dead26icoord = ivec2(((donor_replacementGLF_dead26coord - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                                                                int GLF_dead26res3 = ((GLF_dead26icoord.x >> 5) & 1) ^ ((GLF_dead26icoord.y & 32) >> 5);
                                                                int GLF_dead26res2 = (GLF_dead26icoord.y * GLF_dead26icoord.y >> 10) & 1;
                                                                int GLF_dead26res1 = (GLF_dead26icoord.x * GLF_dead26icoord.y >> 9) & 1;
                                                                GLF_dead26_GLF_color = vec4(float(GLF_dead26res1 ^ GLF_dead26res2), float(GLF_dead26res2 & GLF_dead26res3), float(GLF_dead26res1 | GLF_dead26res3), 1.0);
                                                            }
                                                        } else {
                                                            ivec2 GLF_dead26icoord = ivec2(((donor_replacementGLF_dead26coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.6, 1.0)) * 256.0);
                                                            int GLF_dead26v = (GLF_dead26icoord.x ^ GLF_dead26icoord.y) * GLF_dead26icoord.y;
                                                            bool GLF_dead26res1 = ((GLF_dead26v >> 10) & 1) != 0;
                                                            bool GLF_dead26res2 = ((GLF_dead26v >> 11) & 4) != 0;
                                                            bool GLF_dead26res3 = ((GLF_dead26v >> 12) & 8) != 0;
                                                            GLF_dead26_GLF_color = vec4(GLF_dead26res1 ? 1.0 : 0.0, GLF_dead26res2 ? 1.0 : 0.0, GLF_dead26res3 ? 1.0 : 0.0, 1);
                                                        }
                                                    }
                                                    {
                                                        donor_replacementGLF_dead22v = (4 * donor_replacementGLF_dead22v * (1000 - donor_replacementGLF_dead22v)) / 1000;
                                                    }
                                                    if (_GLF_DEAD(_GLF_IDENTITY(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)), !(!(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))))))) {
                                                        int donor_replacementGLF_dead29v = _GLF_FUZZED(GLF_dead5N);
                                                        if ((donor_replacementGLF_dead29v & 1) == 1) {
                                                            donor_replacementGLF_dead29v = 3 * donor_replacementGLF_dead29v + 1;
                                                        } else {
                                                            donor_replacementGLF_dead29v /= 2;
                                                        }
                                                    }
                                                }
                                            }
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < tan(0.0))))) {
                                                vec2 donor_replacementGLF_dead24a = _GLF_FUZZED(GLF_dead21injectionSwitch);
                                                float donor_replacementGLF_dead24th = _GLF_FUZZED(roundEven(GLF_dead10one));
                                                if (donor_replacementGLF_dead24a.y < donor_replacementGLF_dead24a.x) {
                                                    donor_replacementGLF_dead24th = 0.5 - donor_replacementGLF_dead24th;
                                                }
                                            }
                                        }
                                        if (_GLF_DEAD(false)) {
                                            if (_GLF_DEAD(false)) {
                                                vec2 donor_replacementGLF_dead26coord = _GLF_FUZZED((GLF_dead10one + vec2(159.096, 81.90)));
                                                if (donor_replacementGLF_dead26coord.x > 0.4) {
                                                    if (donor_replacementGLF_dead26coord.y < 0.6) {
                                                        uvec2 GLF_dead26icoord = uvec2(((donor_replacementGLF_dead26coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                                                        uint GLF_dead26res1 = uint(((GLF_dead26icoord.x * GLF_dead26icoord.y) >> (GLF_dead26icoord.x & 31u)) & 0xffffffffu);
                                                        uint GLF_dead26res2 = uint(((GLF_dead26icoord.x * GLF_dead26icoord.y) << (GLF_dead26icoord.x & 31u)) & 0xffffffffu);
                                                        float GLF_dead26res = float(((GLF_dead26res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_dead26res1 & 1u) != 0u ? 1u : 0u));
                                                        GLF_dead26_GLF_color = vec4(GLF_dead26res, GLF_dead26res, GLF_dead26res, 1.0);
                                                    } else {
                                                        ivec2 GLF_dead26icoord = ivec2(((donor_replacementGLF_dead26coord - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                                                        int GLF_dead26res3 = ((GLF_dead26icoord.x >> 5) & 1) ^ ((GLF_dead26icoord.y & 32) >> 5);
                                                        int GLF_dead26res2 = (GLF_dead26icoord.y * GLF_dead26icoord.y >> 10) & 1;
                                                        int GLF_dead26res1 = (GLF_dead26icoord.x * GLF_dead26icoord.y >> 9) & 1;
                                                        GLF_dead26_GLF_color = vec4(float(GLF_dead26res1 ^ GLF_dead26res2), float(GLF_dead26res2 & GLF_dead26res3), float(GLF_dead26res1 | GLF_dead26res3), 1.0);
                                                    }
                                                } else {
                                                    ivec2 GLF_dead26icoord = ivec2(((donor_replacementGLF_dead26coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.6, 1.0)) * 256.0);
                                                    int GLF_dead26v = (GLF_dead26icoord.x ^ GLF_dead26icoord.y) * GLF_dead26icoord.y;
                                                    bool GLF_dead26res1 = ((GLF_dead26v >> 10) & 1) != 0;
                                                    bool GLF_dead26res2 = ((GLF_dead26v >> 11) & 4) != 0;
                                                    bool GLF_dead26res3 = ((GLF_dead26v >> 12) & 8) != 0;
                                                    GLF_dead26_GLF_color = vec4(GLF_dead26res1 ? 1.0 : 0.0, GLF_dead26res2 ? 1.0 : 0.0, GLF_dead26res3 ? 1.0 : 0.0, 1);
                                                }
                                            }
                                            {
                                                discard;
                                            }
                                        }
                                        if (_GLF_DEAD(false)) {
                                            int donor_replacementGLF_dead22i = _GLF_FUZZED(GLF_dead10rows);
                                            int donor_replacementGLF_dead22iters = _GLF_FUZZED(GLF_dead10rows);
                                            int donor_replacementGLF_dead22v = _GLF_FUZZED(GLF_dead5i);
                                            for (donor_replacementGLF_dead22i = 0; donor_replacementGLF_dead22i < donor_replacementGLF_dead22iters; donor_replacementGLF_dead22i++) {
                                                donor_replacementGLF_dead22v = (4 * donor_replacementGLF_dead22v * (1000 - donor_replacementGLF_dead22v)) / 1000;
                                            }
                                        }
                                    case 7u:
                                        if (_GLF_DEAD(false)) {
                                            float donor_replacementGLF_dead18c_im = _GLF_FUZZED(-9.5);
                                            float donor_replacementGLF_dead18c_re = _GLF_FUZZED(ldexp(758.775, GLF_dead5i));
                                            int donor_replacementGLF_dead18iteration = _GLF_FUZZED(GLF_dead10c);
                                            float donor_replacementGLF_dead18x = _GLF_FUZZED(58.68);
                                            float donor_replacementGLF_dead18y = _GLF_FUZZED(distance(vec2(192.642, -6.1), smoothstep(GLF_dead9injectionSwitch, vec2(84.56, -0.2), injectionSwitch)));
                                            for (int GLF_dead18k = 0; GLF_dead18k < 1000; GLF_dead18k++) {
                                                if (donor_replacementGLF_dead18x * donor_replacementGLF_dead18x + donor_replacementGLF_dead18y * donor_replacementGLF_dead18y > 4.0) {
                                                    break;
                                                }
                                                float GLF_dead18x_new = donor_replacementGLF_dead18x * donor_replacementGLF_dead18x - donor_replacementGLF_dead18y * donor_replacementGLF_dead18y + donor_replacementGLF_dead18c_re;
                                                donor_replacementGLF_dead18y = 2.0 * donor_replacementGLF_dead18x * donor_replacementGLF_dead18y + donor_replacementGLF_dead18c_im;
                                                donor_replacementGLF_dead18x = GLF_dead18x_new;
                                                donor_replacementGLF_dead18iteration++;
                                            }
                                        }
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                            vec3 donor_replacementGLF_dead21col = _GLF_FUZZED(vec3(1481.8870, 5.0, -3.7));
                                            vec2 donor_replacementGLF_dead21uv = _GLF_FUZZED(vec2(-672.676, 4035.3269));
                                            {
                                                float GLF_dead21stripe = GLF_dead21compute_stripe(tan((donor_replacementGLF_dead21uv.x + donor_replacementGLF_dead21uv.y) * 20.0), donor_replacementGLF_dead21uv.x + donor_replacementGLF_dead21uv.y);
                                                donor_replacementGLF_dead21col = mix(vec3(0.5, donor_replacementGLF_dead21uv.x, 0.1), vec3(.4, 0, .5), GLF_dead21stripe);
                                                GLF_dead21_GLF_color = vec4(donor_replacementGLF_dead21col, 1.0);
                                                return;
                                            }
                                        }
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < sqrt(0.0))))) {
                                            {
                                                break;
                                            }
                                        }
                                        if (_GLF_DEAD(false)) {
                                            ivec2 donor_replacementGLF_dead16p = _GLF_FUZZED((ivec2(73773, 95291) / GLF_dead5k));
                                            {
                                                if (_GLF_DEAD(false)) {
                                                    int donor_replacementGLF_dead29count = _GLF_FUZZED((GLF_dead5j ^ GLF_dead10cols));
                                                    int donor_replacementGLF_dead29v = _GLF_FUZZED((GLF_dead5j ^ GLF_dead5to));
                                                    while (donor_replacementGLF_dead29v > 1) {
                                                        if ((donor_replacementGLF_dead29v & 1) == 1) {
                                                            donor_replacementGLF_dead29v = 3 * donor_replacementGLF_dead29v + 1;
                                                        } else {
                                                            donor_replacementGLF_dead29v /= 2;
                                                        }
                                                        donor_replacementGLF_dead29count++;
                                                    }
                                                }
                                                if (_GLF_DEAD(false)) {
                                                    {
                                                        ;
                                                    }
                                                }
                                                if (_GLF_DEAD(false)) {
                                                    int donor_replacementGLF_dead19iteration = _GLF_FUZZED(abs(bitfieldReverse(GLF_dead5N)));
                                                    {
                                                        ;
                                                    }
                                                }
                                                donor_replacementGLF_dead16p.x = -donor_replacementGLF_dead16p.x;
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                    int donor_replacementGLF_dead27i = _GLF_FUZZED(GLF_dead5N);
                                                    int donor_replacementGLF_dead27j = _GLF_FUZZED(bitCount(bitfieldInsert(donor_replacementGLF_dead10matrix_number, donor_replacementGLF_dead10matrix_number, GLF_dead5j, GLF_dead5j)));
                                                    if (GLF_dead27obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead27j, 10)] <= GLF_dead10cols) {
                                                        donor_replacementGLF_dead27i++;
                                                        GLF_dead27swap(donor_replacementGLF_dead27i, donor_replacementGLF_dead27j);
                                                    }
                                                }
                                            }
                                        }
                                        GLF_dead10m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10r, 3)] = GLF_dead10one;
                                        if (_GLF_DEAD(false)) {
                                            int donor_replacementGLF_dead27i = _GLF_FUZZED(findLSB(GLF_dead5j));
                                            {
                                                GLF_dead27obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead27i, 10)] = (10 - donor_replacementGLF_dead27i);
                                                GLF_dead27obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead27i, 10)] = GLF_dead27obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead27i, 10)] * GLF_dead27obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead27i, 10)];
                                            }
                                        }
                                        break;
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                            ivec2 donor_replacementGLF_dead16p = _GLF_FUZZED(ivec2(8329, 59057));
                                            if (_GLF_DEAD(false)) {
                                                int donor_replacementGLF_dead22i = _GLF_FUZZED((GLF_dead10rows >> GLF_dead5from));
                                                float donor_replacementGLF_dead22limit = _GLF_FUZZED(clamp(1425.7329, -90.17, 0.8));
                                                float donor_replacementGLF_dead22result = _GLF_FUZZED(float(true));
                                                if (float(donor_replacementGLF_dead22i) >= donor_replacementGLF_dead22limit) {
                                                    ;
                                                }
                                            }
                                            if (donor_replacementGLF_dead16p.x < 0) {
                                                donor_replacementGLF_dead16p.x = -donor_replacementGLF_dead16p.x;
                                            }
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                vec2 donor_replacementGLF_dead26coord = _GLF_FUZZED(GLF_dead25resolution);
                                                {
                                                    ivec2 GLF_dead26icoord = ivec2(((donor_replacementGLF_dead26coord - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                                                    int GLF_dead26res3 = ((GLF_dead26icoord.x >> 5) & 1) ^ ((GLF_dead26icoord.y & 32) >> 5);
                                                    int GLF_dead26res2 = (GLF_dead26icoord.y * GLF_dead26icoord.y >> 10) & 1;
                                                    int GLF_dead26res1 = (GLF_dead26icoord.x * GLF_dead26icoord.y >> 9) & 1;
                                                    GLF_dead26_GLF_color = vec4(float(GLF_dead26res1 ^ GLF_dead26res2), float(GLF_dead26res2 & GLF_dead26res3), float(GLF_dead26res1 | GLF_dead26res3), 1.0);
                                                }
                                            }
                                        }
                                    case 8u:
                                        GLF_dead10m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead10r, 4)] = GLF_dead10one;
                                        break;
                                }
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                if (_GLF_DEAD(false)) {
                                    float donor_replacementGLF_dead19c_im = _GLF_FUZZED(GLF_dead10one);
                                    float donor_replacementGLF_dead19c_re = _GLF_FUZZED(GLF_dead10one);
                                    int donor_replacementGLF_dead19iteration = _GLF_FUZZED(GLF_dead5j);
                                    float donor_replacementGLF_dead19x = _GLF_FUZZED(950.554);
                                    float donor_replacementGLF_dead19y = _GLF_FUZZED(GLF_dead10one);
                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                        vec2 donor_replacementGLF_dead26coord = _GLF_FUZZED(mod(GLF_dead20injectionSwitch, donor_replacementGLF_dead19y));
                                        {
                                            if (donor_replacementGLF_dead26coord.y < 0.6) {
                                                uvec2 GLF_dead26icoord = uvec2(((donor_replacementGLF_dead26coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                                                uint GLF_dead26res1 = uint(((GLF_dead26icoord.x * GLF_dead26icoord.y) >> (GLF_dead26icoord.x & 31u)) & 0xffffffffu);
                                                uint GLF_dead26res2 = uint(((GLF_dead26icoord.x * GLF_dead26icoord.y) << (GLF_dead26icoord.x & 31u)) & 0xffffffffu);
                                                float GLF_dead26res = float(((GLF_dead26res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_dead26res1 & 1u) != 0u ? 1u : 0u));
                                                GLF_dead26_GLF_color = vec4(GLF_dead26res, GLF_dead26res, GLF_dead26res, 1.0);
                                            } else {
                                                ivec2 GLF_dead26icoord = ivec2(((donor_replacementGLF_dead26coord - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                                                int GLF_dead26res3 = ((GLF_dead26icoord.x >> 5) & 1) ^ ((GLF_dead26icoord.y & 32) >> 5);
                                                int GLF_dead26res2 = (GLF_dead26icoord.y * GLF_dead26icoord.y >> 10) & 1;
                                                int GLF_dead26res1 = (GLF_dead26icoord.x * GLF_dead26icoord.y >> 9) & 1;
                                                GLF_dead26_GLF_color = vec4(float(GLF_dead26res1 ^ GLF_dead26res2), float(GLF_dead26res2 & GLF_dead26res3), float(GLF_dead26res1 | GLF_dead26res3), 1.0);
                                            }
                                        }
                                    }
                                    for (int GLF_dead19k = 0; GLF_dead19k < 1000; GLF_dead19k++) {
                                        if (donor_replacementGLF_dead19x * donor_replacementGLF_dead19x + donor_replacementGLF_dead19y * donor_replacementGLF_dead19y > 4.0) {
                                            break;
                                        }
                                        float GLF_dead19x_new = donor_replacementGLF_dead19x * donor_replacementGLF_dead19x - donor_replacementGLF_dead19y * donor_replacementGLF_dead19y + donor_replacementGLF_dead19c_re;
                                        if (_GLF_DEAD(false)) {
                                            vec2 donor_replacementGLF_dead24a = _GLF_FUZZED(injectionSwitch);
                                            float donor_replacementGLF_dead24th = _GLF_FUZZED(dFdyCoarse(roundEven(fwidthFine(donor_replacementGLF_dead19x))));
                                            if (donor_replacementGLF_dead24a.y < donor_replacementGLF_dead24a.x) {
                                                donor_replacementGLF_dead24th = 0.5 - donor_replacementGLF_dead24th;
                                            }
                                        }
                                        donor_replacementGLF_dead19y = 2.0 * donor_replacementGLF_dead19x * donor_replacementGLF_dead19y + donor_replacementGLF_dead19c_im;
                                        donor_replacementGLF_dead19x = GLF_dead19x_new;
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                            vec2 donor_replacementGLF_dead24a = _GLF_FUZZED(GLF_dead20injectionSwitch);
                                            float donor_replacementGLF_dead24th = _GLF_FUZZED(dot(inversesqrt(GLF_dead15gl_FragCoord), vec4(5.2, -6.4, -8164.9541, -39.64)));
                                            if (donor_replacementGLF_dead24a.y < donor_replacementGLF_dead24a.x) {
                                                donor_replacementGLF_dead24th = 0.5 - donor_replacementGLF_dead24th;
                                            }
                                        }
                                        if (_GLF_DEAD(false)) {
                                            int donor_replacementGLF_dead29count = _GLF_FUZZED(GLF_dead10rows);
                                            int donor_replacementGLF_dead29v = _GLF_FUZZED(GLF_dead10cols);
                                            {
                                                if ((donor_replacementGLF_dead29v & 1) == 1) {
                                                    donor_replacementGLF_dead29v = 3 * donor_replacementGLF_dead29v + 1;
                                                } else {
                                                    donor_replacementGLF_dead29v /= 2;
                                                }
                                                donor_replacementGLF_dead29count++;
                                            }
                                        }
                                        donor_replacementGLF_dead19iteration++;
                                        if (_GLF_DEAD(false)) {
                                            {
                                                ;
                                            }
                                        }
                                    }
                                }
                                float donor_replacementGLF_dead15grey = _GLF_FUZZED(GLF_dead10one);
                                if (int(GLF_dead15gl_FragCoord[1]) < 120) {
                                    if (_GLF_DEAD(false)) {
                                        int donor_replacementGLF_dead19iteration = _GLF_FUZZED(GLF_dead5to);
                                        float donor_replacementGLF_dead19xCoord = _GLF_FUZZED(atanh(GLF_dead10one));
                                        float donor_replacementGLF_dead19yCoord = _GLF_FUZZED(cos(float(donor_replacementGLF_dead10matrix_number)));
                                        if (donor_replacementGLF_dead19iteration < 1000) {
                                            ;
                                        } else {
                                            ;
                                        }
                                    }
                                    donor_replacementGLF_dead15grey = 0.5 + float(GLF_dead15data[3]) / 10.0;
                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                        vec2 donor_replacementGLF_dead24a = _GLF_FUZZED((donor_replacementGLF_dead15grey / vec2(8.5, 9099.4614)));
                                        float donor_replacementGLF_dead24z = _GLF_FUZZED(donor_replacementGLF_dead15grey);
                                        {
                                            donor_replacementGLF_dead24z = donor_replacementGLF_dead24a.x / donor_replacementGLF_dead24a.y;
                                        }
                                    }
                                } else {
                                    if (_GLF_DEAD(false)) {
                                        int donor_replacementGLF_dead22v = _GLF_FUZZED((GLF_dead10c + GLF_dead10c));
                                        {
                                            donor_replacementGLF_dead22v = (4 * donor_replacementGLF_dead22v * (1000 - donor_replacementGLF_dead22v)) / 1000;
                                        }
                                    }
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                        int donor_replacementGLF_dead22i = _GLF_FUZZED((~GLF_dead10c));
                                        float donor_replacementGLF_dead22limit = _GLF_FUZZED(round(3308.1320));
                                        float donor_replacementGLF_dead22result = _GLF_FUZZED(GLF_dead10one);
                                        if (float(donor_replacementGLF_dead22i) >= donor_replacementGLF_dead22limit) {
                                            ;
                                        }
                                    }
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                            int donor_replacementGLF_dead22iters = _GLF_FUZZED(GLF_dead10c);
                                            int donor_replacementGLF_dead22v = _GLF_FUZZED(GLF_dead5mid);
                                            for (GLF_dead10c = 0; GLF_dead10c < donor_replacementGLF_dead22iters; GLF_dead10c++) {
                                                donor_replacementGLF_dead22v = (4 * donor_replacementGLF_dead22v * (1000 - donor_replacementGLF_dead22v)) / 1000;
                                            }
                                        }
                                        float donor_replacementGLF_dead18c_im = _GLF_FUZZED(distance(83.91, 27.30));
                                        float donor_replacementGLF_dead18c_re = _GLF_FUZZED(faceforward(GLF_dead10one, acos(9.0), donor_replacementGLF_dead15grey));
                                        int donor_replacementGLF_dead18iteration = _GLF_FUZZED(GLF_dead5j);
                                        float donor_replacementGLF_dead18x = _GLF_FUZZED(donor_replacementGLF_dead15grey);
                                        float donor_replacementGLF_dead18y = _GLF_FUZZED(donor_replacementGLF_dead15grey);
                                        for (int GLF_dead18k = 0; GLF_dead18k < 1000; GLF_dead18k++) {
                                            if (donor_replacementGLF_dead18x * donor_replacementGLF_dead18x + donor_replacementGLF_dead18y * donor_replacementGLF_dead18y > 4.0) {
                                                break;
                                            }
                                            float GLF_dead18x_new = donor_replacementGLF_dead18x * donor_replacementGLF_dead18x - donor_replacementGLF_dead18y * donor_replacementGLF_dead18y + donor_replacementGLF_dead18c_re;
                                            donor_replacementGLF_dead18y = 2.0 * donor_replacementGLF_dead18x * donor_replacementGLF_dead18y + donor_replacementGLF_dead18c_im;
                                            donor_replacementGLF_dead18x = GLF_dead18x_new;
                                            donor_replacementGLF_dead18iteration++;
                                        }
                                    }
                                    if (int(GLF_dead15gl_FragCoord[1]) < 150) {
                                        discard;
                                    } else {
                                        if (int(GLF_dead15gl_FragCoord[1]) < 180) {
                                            if (_GLF_DEAD(false)) {
                                                int donor_replacementGLF_dead29v = _GLF_FUZZED(GLF_dead10cols);
                                                {
                                                    donor_replacementGLF_dead29v /= 2;
                                                }
                                            }
                                            donor_replacementGLF_dead15grey = 0.5 + float(GLF_dead15data[5]) / 10.0;
                                        } else {
                                            if (int(GLF_dead15gl_FragCoord[1]) < 210) {
                                                donor_replacementGLF_dead15grey = 0.5 + float(GLF_dead15data[6]) / 10.0;
                                            } else {
                                                if (int(GLF_dead15gl_FragCoord[1]) < 240) {
                                                    if (_GLF_DEAD(false)) {
                                                        vec2 donor_replacementGLF_dead26coord = _GLF_FUZZED(GLF_dead9injectionSwitch);
                                                        {
                                                            ivec2 GLF_dead26icoord = ivec2(((donor_replacementGLF_dead26coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.6, 1.0)) * 256.0);
                                                            int GLF_dead26v = (GLF_dead26icoord.x ^ GLF_dead26icoord.y) * GLF_dead26icoord.y;
                                                            bool GLF_dead26res1 = ((GLF_dead26v >> 10) & 1) != 0;
                                                            bool GLF_dead26res2 = ((GLF_dead26v >> 11) & 4) != 0;
                                                            bool GLF_dead26res3 = ((GLF_dead26v >> 12) & 8) != 0;
                                                            GLF_dead26_GLF_color = vec4(GLF_dead26res1 ? 1.0 : 0.0, GLF_dead26res2 ? 1.0 : 0.0, GLF_dead26res3 ? 1.0 : 0.0, 1);
                                                        }
                                                    }
                                                    if (_GLF_DEAD(false)) {
                                                        int donor_replacementGLF_dead22i = _GLF_FUZZED(max(GLF_dead5from, (GLF_dead10rows % GLF_dead5k)));
                                                        float donor_replacementGLF_dead22result = _GLF_FUZZED(GLF_dead10one);
                                                        float donor_replacementGLF_dead22thirty_two = _GLF_FUZZED(GLF_dead10one);
                                                        if ((donor_replacementGLF_dead22i % 32) == 0) {
                                                            donor_replacementGLF_dead22result += 0.4;
                                                        } else {
                                                            if (mod(float(donor_replacementGLF_dead22i), round(donor_replacementGLF_dead22thirty_two)) <= 0.01) {
                                                                donor_replacementGLF_dead22result += 100.0;
                                                            }
                                                        }
                                                    }
                                                    donor_replacementGLF_dead15grey = 0.5 + float(GLF_dead15data[7]) / 10.0;
                                                } else {
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                        int donor_replacementGLF_dead29count = _GLF_FUZZED(GLF_dead5N);
                                                        int donor_replacementGLF_dead29v = _GLF_FUZZED(GLF_dead5k);
                                                        while (donor_replacementGLF_dead29v > 1) {
                                                            if ((donor_replacementGLF_dead29v & 1) == 1) {
                                                                donor_replacementGLF_dead29v = 3 * donor_replacementGLF_dead29v + 1;
                                                            } else {
                                                                donor_replacementGLF_dead29v /= 2;
                                                            }
                                                            donor_replacementGLF_dead29count++;
                                                        }
                                                    }
                                                    if (int(GLF_dead15gl_FragCoord[1]) < 270) {
                                                        donor_replacementGLF_dead15grey = 0.5 + float(GLF_dead15data[8]) / 10.0;
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
                        donor_replacementGLF_dead10matrix_number = donor_replacementGLF_dead10matrix_number + 1u;
                    }
                    if (_GLF_DEAD(false)) {
                        int donor_replacementGLF_dead19iteration = _GLF_FUZZED(GLF_dead5N);
                        float donor_replacementGLF_dead19xCoord = _GLF_FUZZED(distance(GLF_dead9injectionSwitch, injectionSwitch));
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                            vec3 donor_replacementGLF_dead27color = _GLF_FUZZED(vec3(3.0, -3.8, -7247.1812));
                            {
                                donor_replacementGLF_dead27color.y += float(GLF_dead27obj.numbers[6]);
                            }
                        }
                        float donor_replacementGLF_dead19yCoord = _GLF_FUZZED(GLF_dead10one);
                        if (donor_replacementGLF_dead19iteration < 1000) {
                            ;
                        } else {
                            ;
                        }
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        vec3 donor_replacementGLF_dead27color = _GLF_FUZZED(vec3(245.211, 565.980, -4.0));
                        {
                            donor_replacementGLF_dead27color.y += float(GLF_dead27obj.numbers[6]);
                        }
                    }
                }
            }
            GLF_dead5temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead5k++, 10)] = GLF_dead5data[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead5j++, 10)];
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            float donor_replacementGLF_dead22result = _GLF_FUZZED(GLF_dead10one);
            {
                donor_replacementGLF_dead22result += 0.4;
            }
        }
    }
    while (GLF_dead5i < GLF_dead5N && GLF_dead5i <= GLF_dead5mid) {
        GLF_dead5temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead5k++, 10)] = GLF_dead5data[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead5i++, 10)];
        if (_GLF_DEAD(false)) {
            int donor_replacementGLF_dead7v = _GLF_FUZZED((GLF_dead5mid + findLSB(94316u)));
            {
                if (_GLF_DEAD(false)) {
                    int donor_replacementGLF_dead13directions = _GLF_FUZZED(GLF_dead5j);
                    ivec2 donor_replacementGLF_dead13p = _GLF_FUZZED((ivec2(49181, -6045) ^ ivec2(-55049, -36588)));
                    if (donor_replacementGLF_dead13p.y < 14 && GLF_dead13map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead13p.x) + (donor_replacementGLF_dead13p.y + 2) * 16, 256)] == 0) {
                        donor_replacementGLF_dead13directions += 1;
                    }
                }
                if (_GLF_DEAD(false)) {
                    vec3 donor_replacementGLF_dead27color = _GLF_FUZZED(faceforward(vec3(6906.7022, 6.0, 962.275), vec3(-1172.0369, 7.9, -862.141), ceil(ldexp(vec3(-3.3, 1.7, 5001.1832), ivec3(-25189, -48026, -36223)))));
                    {
                        donor_replacementGLF_dead27color.z += float(GLF_dead27obj.numbers[7]);
                    }
                }
                donor_replacementGLF_dead7v = 3 * donor_replacementGLF_dead7v + 1;
            }
        }
    }
    if (_GLF_DEAD(false)) {
        {
            ;
        }
    }
    for (int GLF_dead5i = GLF_dead5from; GLF_dead5i <= GLF_dead5to; GLF_dead5i++) {
        GLF_dead5data[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead5i, 10)] = GLF_dead5temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead5i, 10)];
    }
}

layout(set = 0, binding = 9) uniform sampler2D GLF_dead6tex;

struct GLF_dead4QuicksortObject {
    int numbers[10];
};

GLF_dead4QuicksortObject GLF_dead4obj = GLF_dead4QuicksortObject(int[10](0, 0, 0, 0, 0, 0, 0, 0, 0, 0));

struct GLF_dead3BST {
    int data;
    int leftIndex;
    int rightIndex;
};

GLF_dead3BST GLF_dead3tree[10] = GLF_dead3BST[10](GLF_dead3BST(0, 0, 0), GLF_dead3BST(0, 0, 0), GLF_dead3BST(0, 0, 0), GLF_dead3BST(0, 0, 0), GLF_dead3BST(0, 0, 0), GLF_dead3BST(0, 0, 0), GLF_dead3BST(0, 0, 0), GLF_dead3BST(0, 0, 0), GLF_dead3BST(0, 0, 0), GLF_dead3BST(0, 0, 0));

int GLF_dead3search(int GLF_dead3target) {
    GLF_dead3BST GLF_dead3currentNode = GLF_dead3BST(0, 0, 0);
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
        if (_GLF_DEAD(false)) {
            float donor_replacementGLF_dead12pab = _GLF_FUZZED(-45.33);
            float donor_replacementGLF_dead12pca = _GLF_FUZZED(-183.990);
            if (!((donor_replacementGLF_dead12pab < 0.0 && donor_replacementGLF_dead12pca < 0.0) || (donor_replacementGLF_dead12pab >= 0.0 && donor_replacementGLF_dead12pca >= 0.0))) {
                return 0;
            }
        }
        if (_GLF_DEAD(false)) {
            bool donor_replacementGLF_dead13canwalk = _GLF_FUZZED(isnan(vec3(-9.1, 8.7, 797.784)).t);
            int donor_replacementGLF_dead13i = _GLF_FUZZED(min(20833, GLF_dead3target));
            int donor_replacementGLF_dead13j = _GLF_FUZZED(GLF_dead5N);
            ivec2 donor_replacementGLF_dead13p = _GLF_FUZZED((ivec2(22875, -94538) - 72930));
            if (_GLF_DEAD(false)) {
                bool donor_replacementGLF_dead21c1 = _GLF_FUZZED((donor_replacementGLF_dead13canwalk ? donor_replacementGLF_dead13canwalk : (bvec4(false, false, true, true) == bvec4(false, true, true, true))));
                bool donor_replacementGLF_dead21c2 = _GLF_FUZZED(donor_replacementGLF_dead13canwalk);
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    int donor_replacementGLF_dead23iteration = _GLF_FUZZED(GLF_dead3target);
                    if (donor_replacementGLF_dead23iteration < 1000) {
                        ;
                    } else {
                        ;
                    }
                }
                vec3 donor_replacementGLF_dead21col = _GLF_FUZZED((vec3(-4495.3126, 480.611, 4.2) + (-3211.3157)));
                vec2 donor_replacementGLF_dead21uv = _GLF_FUZZED(sin(vec3(-54.80, 8.9, 26.71).pt));
                if (!donor_replacementGLF_dead21c1 && donor_replacementGLF_dead21c2) {
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        {
                            ;
                        }
                    }
                    float GLF_dead21stripe = GLF_dead21compute_stripe(tan((donor_replacementGLF_dead21uv.x + donor_replacementGLF_dead21uv.y) * 20.0), donor_replacementGLF_dead21uv.x + donor_replacementGLF_dead21uv.y);
                    donor_replacementGLF_dead21col = mix(vec3(0.5, donor_replacementGLF_dead21uv.x, 0.1), vec3(.4, 0, .5), GLF_dead21stripe);
                    GLF_dead21_GLF_color = vec4(donor_replacementGLF_dead21col, 1.0);
                    ;
                }
            }
            for (donor_replacementGLF_dead13j = 0; donor_replacementGLF_dead13j < 8; donor_replacementGLF_dead13j++) {
                if (GLF_dead13map[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead13j * 2 + donor_replacementGLF_dead13i * 2 * 16, 256)] == 0) {
                    donor_replacementGLF_dead13p.x = donor_replacementGLF_dead13j * 2;
                    donor_replacementGLF_dead13p.y = donor_replacementGLF_dead13i * 2;
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        int donor_replacementGLF_dead22v = _GLF_FUZZED(donor_replacementGLF_dead13j);
                        {
                            donor_replacementGLF_dead22v = (4 * donor_replacementGLF_dead22v * (1000 - donor_replacementGLF_dead22v)) / 1000;
                        }
                    }
                    donor_replacementGLF_dead13canwalk = true;
                    if (_GLF_DEAD(false)) {
                        vec3 donor_replacementGLF_dead27color = _GLF_FUZZED(vec3(7381.4570, 6185.9546, 184.736));
                        {
                            donor_replacementGLF_dead27color.z += float(GLF_dead27obj.numbers[3]);
                        }
                    }
                }
            }
        }
        int donor_replacementGLF_dead5high = _GLF_FUZZED(39825);
        int donor_replacementGLF_dead5i = _GLF_FUZZED(GLF_dead3target);
        int donor_replacementGLF_dead5m = _GLF_FUZZED((GLF_dead3target));
        {
            int GLF_dead5from = donor_replacementGLF_dead5i;
            if (_GLF_DEAD(false)) {
                bool donor_replacementGLF_dead21c1 = _GLF_FUZZED(((-9740.6143) > GLF_dead10one));
                bool donor_replacementGLF_dead21c2 = _GLF_FUZZED(false);
                bool donor_replacementGLF_dead21c3 = _GLF_FUZZED(true);
                vec3 donor_replacementGLF_dead21col = _GLF_FUZZED(vec3(-991.788, 400.382, -237.932));
                vec2 donor_replacementGLF_dead21uv = _GLF_FUZZED(vec2(-8.7, 9.7));
                if (_GLF_DEAD(false)) {
                    vec2 donor_replacementGLF_dead26coord = _GLF_FUZZED(unpackHalf2x16((~19830u)));
                    {
                        ivec2 GLF_dead26icoord = ivec2(((donor_replacementGLF_dead26coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.6, 1.0)) * 256.0);
                        int GLF_dead26v = (GLF_dead26icoord.x ^ GLF_dead26icoord.y) * GLF_dead26icoord.y;
                        bool GLF_dead26res1 = ((GLF_dead26v >> 10) & 1) != 0;
                        bool GLF_dead26res2 = ((GLF_dead26v >> 11) & 4) != 0;
                        bool GLF_dead26res3 = ((GLF_dead26v >> 12) & 8) != 0;
                        GLF_dead26_GLF_color = vec4(GLF_dead26res1 ? 1.0 : 0.0, GLF_dead26res2 ? 1.0 : 0.0, GLF_dead26res3 ? 1.0 : 0.0, 1);
                    }
                }
                if (!donor_replacementGLF_dead21c1 && !donor_replacementGLF_dead21c2 && donor_replacementGLF_dead21c3) {
                    float GLF_dead21stripe = GLF_dead21compute_stripe(cos((donor_replacementGLF_dead21uv.x + donor_replacementGLF_dead21uv.y) * 20.0), donor_replacementGLF_dead21uv.x + donor_replacementGLF_dead21uv.y);
                    donor_replacementGLF_dead21col = mix(vec3(.7, sinh(donor_replacementGLF_dead21uv.x), donor_replacementGLF_dead21uv.x), vec3(.3, .5, donor_replacementGLF_dead21uv.x), GLF_dead21stripe);
                    GLF_dead21_GLF_color = vec4(donor_replacementGLF_dead21col, 1.0);
                    ;
                }
            }
            int GLF_dead5mid = donor_replacementGLF_dead5i + donor_replacementGLF_dead5m - 1;
            if (_GLF_DEAD(false)) {
                if (_GLF_DEAD(false)) {
                    int donor_replacementGLF_dead25k = _GLF_FUZZED(donor_replacementGLF_dead5m);
                    vec2 donor_replacementGLF_dead25o = _GLF_FUZZED(injectionSwitch);
                    {
                        donor_replacementGLF_dead25o = donor_replacementGLF_dead25o + donor_replacementGLF_dead25o;
                        donor_replacementGLF_dead25k--;
                    }
                }
                vec2 donor_replacementGLF_dead8coord = _GLF_FUZZED(vec2(9.8, 834.782));
                vec4 donor_replacementGLF_dead8res = _GLF_FUZZED(min(vec4(-3.3, -10.47, -30.98, -7.8), vec4(-323.588, 9891.6652, -6.8, -877.708)));
                if (_GLF_DEAD(false)) {
                    int donor_replacementGLF_dead29v = _GLF_FUZZED(ivec2(57749, 36050)[1]);
                    {
                        donor_replacementGLF_dead29v /= 2;
                    }
                }
                float donor_replacementGLF_dead8uvstep = _GLF_FUZZED(9606.2874);
                for (int GLF_dead8i = 0; GLF_dead8i < 3; GLF_dead8i++) {
                    for (int GLF_dead8j = 0; GLF_dead8j < 3; GLF_dead8j++) {
                        donor_replacementGLF_dead8res += texture(GLF_dead8tex, donor_replacementGLF_dead8coord + vec2(float(GLF_dead8i - 1) * donor_replacementGLF_dead8uvstep, float(GLF_dead8j - 1) * donor_replacementGLF_dead8uvstep)) * GLF_dead8weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead8i * 3 + GLF_dead8j, 9)];
                        if (_GLF_DEAD(false)) {
                            vec3 donor_replacementGLF_dead27color = _GLF_FUZZED(cross(vec3(1.2, 8619.3396, 61.82), vec3(156.635, 423.783, -0.1)));
                            {
                                donor_replacementGLF_dead27color.y += float(GLF_dead27obj.numbers[6]);
                            }
                        }
                    }
                }
            }
            int GLF_dead5to = min(donor_replacementGLF_dead5i + 2 * donor_replacementGLF_dead5m - 1, donor_replacementGLF_dead5high);
            GLF_dead5merge(GLF_dead5from, GLF_dead5mid, GLF_dead5to);
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            float donor_replacementGLF_dead24th = _GLF_FUZZED(519.746);
            {
                donor_replacementGLF_dead24th = 0.5 - donor_replacementGLF_dead24th;
            }
        }
        if (_GLF_DEAD(false)) {
            vec2 donor_replacementGLF_dead16coord = _GLF_FUZZED(vec2(-9.7, 1.8));
            if (donor_replacementGLF_dead16coord.y < 0.6) {
                uvec2 GLF_dead16icoord = uvec2(((donor_replacementGLF_dead16coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                uint GLF_dead16res1 = uint(((GLF_dead16icoord.x * GLF_dead16icoord.y) >> (GLF_dead16icoord.x & 31u)) & 0xffffffffu);
                uint GLF_dead16res2 = uint(((GLF_dead16icoord.x * GLF_dead16icoord.y) << (GLF_dead16icoord.x & 31u)) & 0xffffffffu);
                float GLF_dead16res = float(((GLF_dead16res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_dead16res1 & 1u) != 0u ? 1u : 0u));
                GLF_dead16_GLF_color = vec4(GLF_dead16res, GLF_dead16res, GLF_dead16res, 1.0);
            } else {
                ivec2 GLF_dead16icoord = ivec2(((donor_replacementGLF_dead16coord - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                int GLF_dead16res3 = ((GLF_dead16icoord.x >> 5) & 1) ^ ((GLF_dead16icoord.y & 32) >> 5);
                int GLF_dead16res2 = (GLF_dead16icoord.y * GLF_dead16icoord.y >> 10) & 1;
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    vec3 donor_replacementGLF_dead27color = _GLF_FUZZED(GLF_dead12_GLF_color.stp);
                    {
                        donor_replacementGLF_dead27color.x += float(GLF_dead27obj.numbers[5]);
                    }
                }
                int GLF_dead16res1 = (GLF_dead16icoord.x * GLF_dead16icoord.y >> 9) & 1;
                if (_GLF_DEAD(false)) {
                    vec3 donor_replacementGLF_dead27color = _GLF_FUZZED(vec3(6.6, 8643.5447, 6220.8750));
                    vec2 donor_replacementGLF_dead27uv = _GLF_FUZZED(GLF_dead9injectionSwitch);
                    if (abs(donor_replacementGLF_dead27uv.x - donor_replacementGLF_dead27uv.y) < 0.25) {
                        donor_replacementGLF_dead27color.x += float(GLF_dead27obj.numbers[9]);
                    }
                }
                GLF_dead16_GLF_color = vec4(float(GLF_dead16res1 ^ GLF_dead16res2), float(GLF_dead16res2 & GLF_dead16res3), float(GLF_dead16res1 | GLF_dead16res3), 1.0);
            }
            if (_GLF_DEAD(false)) {
                int donor_replacementGLF_dead19iteration = _GLF_FUZZED(donor_replacementGLF_dead5m);
                float donor_replacementGLF_dead19xCoord = _GLF_FUZZED(GLF_dead10one);
                float donor_replacementGLF_dead19yCoord = _GLF_FUZZED(GLF_dead10one);
                if (donor_replacementGLF_dead19iteration < 1000) {
                    ;
                } else {
                    ;
                }
            }
        }
    }
    if (_GLF_DEAD(_GLF_IDENTITY(false, true && (false)))) {
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
            float donor_replacementGLF_dead19x = _GLF_FUZZED((+GLF_dead16_GLF_color[1]));
            float donor_replacementGLF_dead19y = _GLF_FUZZED(roundEven(8234.2581));
            if (donor_replacementGLF_dead19x * donor_replacementGLF_dead19x + donor_replacementGLF_dead19y * donor_replacementGLF_dead19y > 4.0) {
                ;
            }
        }
        int donor_replacementGLF_dead9a = _GLF_FUZZED(findLSB((GLF_dead3target >> GLF_dead3target)));
        int donor_replacementGLF_dead9b = _GLF_FUZZED(GLF_dead3target);
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            int donor_replacementGLF_dead29v = _GLF_FUZZED(GLF_dead3target);
            {
                donor_replacementGLF_dead29v = 3 * donor_replacementGLF_dead29v + 1;
            }
        }
        int donor_replacementGLF_dead9c = _GLF_FUZZED((findLSB(packSnorm4x8(vec4(66.94, -4.0, -2555.4346, 988.032))) << GLF_dead3target));
        if (_GLF_DEAD(false)) {
            int donor_replacementGLF_dead13i = _GLF_FUZZED(donor_replacementGLF_dead9c);
            if (_GLF_DEAD(false)) {
                int donor_replacementGLF_dead20a = _GLF_FUZZED(int(82597u));
                int donor_replacementGLF_dead20b = _GLF_FUZZED((~(-38600)));
                int donor_replacementGLF_dead20c = _GLF_FUZZED(donor_replacementGLF_dead9c);
                vec2 donor_replacementGLF_dead20uv = _GLF_FUZZED(vec2(-3.8, 74.90));
                {
                    donor_replacementGLF_dead20uv.y -= step(GLF_dead20injectionSwitch.y, donor_replacementGLF_dead20uv.x) + float(donor_replacementGLF_dead20a) + float(donor_replacementGLF_dead20b);
                    donor_replacementGLF_dead20uv.x += ldexp(GLF_dead20injectionSwitch.y, isinf(donor_replacementGLF_dead20uv.y + donor_replacementGLF_dead20uv.x) ? findMSB(donor_replacementGLF_dead20b) : findMSB(donor_replacementGLF_dead20a));
                    donor_replacementGLF_dead20c--;
                    if (_GLF_DEAD(false)) {
                        int donor_replacementGLF_dead27i = _GLF_FUZZED((GLF_dead3target >> donor_replacementGLF_dead20b));
                        int donor_replacementGLF_dead27j = _GLF_FUZZED(donor_replacementGLF_dead20c);
                        int donor_replacementGLF_dead27pivot = _GLF_FUZZED(ivec2(90603, 42474)[1]);
                        if (GLF_dead27obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead27j, 10)] <= donor_replacementGLF_dead27pivot) {
                            donor_replacementGLF_dead27i++;
                            GLF_dead27swap(donor_replacementGLF_dead27i, donor_replacementGLF_dead27j);
                        }
                    }
                }
            }
            float donor_replacementGLF_dead13limit = _GLF_FUZZED(-7.4);
            if (_GLF_DEAD(false)) {
                bool donor_replacementGLF_dead21c1 = _GLF_FUZZED((vec3(-3.1, 405.405, -553.753) != vec3(-2.4, -9564.1740, 83.94)));
                bool donor_replacementGLF_dead21c2 = _GLF_FUZZED(true);
                vec3 donor_replacementGLF_dead21col = _GLF_FUZZED(smoothstep(vec3(-6044.8602, -0.4, 923.981), vec3(-9145.1245, -5.5, 1.8), vec3(-92.10, -4714.1336, 87.80)));
                vec2 donor_replacementGLF_dead21uv = _GLF_FUZZED(injectionSwitch);
                if (!donor_replacementGLF_dead21c1 && donor_replacementGLF_dead21c2) {
                    float GLF_dead21stripe = GLF_dead21compute_stripe(tan((donor_replacementGLF_dead21uv.x + donor_replacementGLF_dead21uv.y) * 20.0), donor_replacementGLF_dead21uv.x + donor_replacementGLF_dead21uv.y);
                    donor_replacementGLF_dead21col = mix(vec3(0.5, donor_replacementGLF_dead21uv.x, 0.1), vec3(.4, 0, .5), GLF_dead21stripe);
                    if (_GLF_DEAD(false)) {
                        int donor_replacementGLF_dead22i = _GLF_FUZZED(ivec3(-54966, 37599, 92980)[0]);
                        float donor_replacementGLF_dead22result = _GLF_FUZZED(donor_replacementGLF_dead13limit);
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                            int donor_replacementGLF_dead29count = _GLF_FUZZED(donor_replacementGLF_dead9c);
                            int donor_replacementGLF_dead29v = _GLF_FUZZED(((-56337) - (-43933)));
                            {
                                if ((donor_replacementGLF_dead29v & 1) == 1) {
                                    donor_replacementGLF_dead29v = 3 * donor_replacementGLF_dead29v + 1;
                                } else {
                                    donor_replacementGLF_dead29v /= 2;
                                }
                                donor_replacementGLF_dead29count++;
                            }
                        }
                        float donor_replacementGLF_dead22thirty_two = _GLF_FUZZED(-2.0);
                        if (mod(float(donor_replacementGLF_dead22i), round(donor_replacementGLF_dead22thirty_two)) <= 0.01) {
                            donor_replacementGLF_dead22result += 100.0;
                        }
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        vec3 donor_replacementGLF_dead27color = _GLF_FUZZED(donor_replacementGLF_dead21col);
                        vec2 donor_replacementGLF_dead27uv = _GLF_FUZZED(GLF_dead21injectionSwitch);
                        if (donor_replacementGLF_dead27uv.x > (1.0 / 4.0)) {
                            donor_replacementGLF_dead27color.x += float(GLF_dead27obj.numbers[1]);
                        }
                    }
                    GLF_dead21_GLF_color = vec4(donor_replacementGLF_dead21col, 1.0);
                    ;
                }
            }
            float donor_replacementGLF_dead13result = _GLF_FUZZED(max(acosh(5.7), 603.913));
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                vec3 donor_replacementGLF_dead27color = _GLF_FUZZED(abs(ceil(vec3(-2.4, -9289.3327, -1.7))));
                {
                    donor_replacementGLF_dead27color.x += float(GLF_dead27obj.numbers[9]);
                }
            }
            float donor_replacementGLF_dead13thirty_two = _GLF_FUZZED(vec4(-0.2, 6.1, -7348.3472, -3.0).x);
            {
                if ((donor_replacementGLF_dead13i % 32) == 0) {
                    if (_GLF_DEAD(false)) {
                        vec3 donor_replacementGLF_dead27color = _GLF_FUZZED((vec3(4319.7930, -1.6, 92.50) + vec3(-5054.9027, -647.182, -7767.6554)));
                        {
                            donor_replacementGLF_dead27color.x += float(GLF_dead27obj.numbers[1]);
                        }
                    }
                    donor_replacementGLF_dead13result += 0.4;
                } else {
                    if (mod(float(donor_replacementGLF_dead13i), round(donor_replacementGLF_dead13thirty_two)) <= 0.01) {
                        donor_replacementGLF_dead13result += 100.0;
                    }
                }
                if (float(donor_replacementGLF_dead13i) >= donor_replacementGLF_dead13limit) {
                    ;
                }
            }
        }
        vec2 donor_replacementGLF_dead9uv = _GLF_FUZZED(injectionSwitch);
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            int donor_replacementGLF_dead27i = _GLF_FUZZED(findMSB(GLF_dead3target));
            int donor_replacementGLF_dead27j = _GLF_FUZZED(max(donor_replacementGLF_dead9b, donor_replacementGLF_dead9a));
            int donor_replacementGLF_dead27pivot = _GLF_FUZZED(ivec3(-49142, -45356, 28792).p);
            if (GLF_dead27obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead27j, 10)] <= donor_replacementGLF_dead27pivot) {
                donor_replacementGLF_dead27i++;
                GLF_dead27swap(donor_replacementGLF_dead27i, donor_replacementGLF_dead27j);
            }
        }
        {
            donor_replacementGLF_dead9uv.y -= step(GLF_dead9injectionSwitch.y, donor_replacementGLF_dead9uv.x) + float(donor_replacementGLF_dead9a) + float(donor_replacementGLF_dead9b);
            donor_replacementGLF_dead9uv.x += ldexp(GLF_dead9injectionSwitch.y, isinf(donor_replacementGLF_dead9uv.y + donor_replacementGLF_dead9uv.x) ? findMSB(donor_replacementGLF_dead9b) : findMSB(donor_replacementGLF_dead9a));
            donor_replacementGLF_dead9c--;
        }
        if (_GLF_DEAD(false)) {
            bool donor_replacementGLF_dead13canwalk = _GLF_FUZZED(true);
            int donor_replacementGLF_dead13directions = _GLF_FUZZED(bitCount(clamp(121088u, 193456u, 96224u)));
            int donor_replacementGLF_dead13i = _GLF_FUZZED(ivec2(14120, -99837)[1]);
            ivec2 donor_replacementGLF_dead13p = _GLF_FUZZED(ivec2(-26976, 75893));
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                int donor_replacementGLF_dead20m = _GLF_FUZZED(findLSB((GLF_dead5N << donor_replacementGLF_dead9c)));
                int donor_replacementGLF_dead20r = _GLF_FUZZED(donor_replacementGLF_dead9c);
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        int donor_replacementGLF_dead29count = _GLF_FUZZED(bitCount(140998u));
                        int donor_replacementGLF_dead29v = _GLF_FUZZED(donor_replacementGLF_dead9a);
                        while (donor_replacementGLF_dead29v > 1) {
                            if ((donor_replacementGLF_dead29v & 1) == 1) {
                                donor_replacementGLF_dead29v = 3 * donor_replacementGLF_dead29v + 1;
                            } else {
                                donor_replacementGLF_dead29v /= 2;
                            }
                            donor_replacementGLF_dead29count++;
                        }
                    }
                    float donor_replacementGLF_dead22limit = _GLF_FUZZED(-8775.2217);
                    float donor_replacementGLF_dead22result = _GLF_FUZZED(GLF_dead10one);
                    float donor_replacementGLF_dead22thirty_two = _GLF_FUZZED(GLF_dead10one);
                    for (int GLF_dead22i = 1; GLF_dead22i < 800; GLF_dead22i++) {
                        if ((GLF_dead22i % 32) == 0) {
                            donor_replacementGLF_dead22result += 0.4;
                        } else {
                            if (mod(float(GLF_dead22i), round(donor_replacementGLF_dead22thirty_two)) <= 0.01) {
                                donor_replacementGLF_dead22result += 100.0;
                            }
                        }
                        if (float(GLF_dead22i) >= donor_replacementGLF_dead22limit) {
                            ;
                        }
                    }
                }
                {
                    donor_replacementGLF_dead20r = donor_replacementGLF_dead20m - 1;
                }
            }
            int donor_replacementGLF_dead13v = _GLF_FUZZED(ivec4(90370, -25530, 25468, -94978).q);
            if (donor_replacementGLF_dead13directions == 0) {
                donor_replacementGLF_dead13canwalk = false;
                int GLF_dead13j = _GLF_FUZZED(-9411);
                if (_GLF_DEAD(false)) {
                    if (_GLF_DEAD(false)) {
                        if (_GLF_DEAD(false)) {
                            int donor_replacementGLF_dead23c_im = _GLF_FUZZED(ivec3(-68761, -68983, -37514).s);
                            int donor_replacementGLF_dead23c_re = _GLF_FUZZED(donor_replacementGLF_dead9c);
                            int donor_replacementGLF_dead23iteration = _GLF_FUZZED((GLF_dead3target & GLF_dead13j));
                            int donor_replacementGLF_dead23x = _GLF_FUZZED(GLF_dead3target);
                            int donor_replacementGLF_dead23y = _GLF_FUZZED(donor_replacementGLF_dead13v);
                            {
                                if (donor_replacementGLF_dead23x * donor_replacementGLF_dead23x + donor_replacementGLF_dead23y * donor_replacementGLF_dead23y > 262144) {
                                    ;
                                }
                                int GLF_dead23x_new = ((donor_replacementGLF_dead23x * donor_replacementGLF_dead23x - donor_replacementGLF_dead23y * donor_replacementGLF_dead23y) / 256 + donor_replacementGLF_dead23c_re);
                                donor_replacementGLF_dead23y = (2 * donor_replacementGLF_dead23x * donor_replacementGLF_dead23y / 256 + donor_replacementGLF_dead23c_im);
                                donor_replacementGLF_dead23x = GLF_dead23x_new;
                                donor_replacementGLF_dead23iteration++;
                            }
                        }
                        int donor_replacementGLF_dead22i = _GLF_FUZZED(((bitfieldInsert(donor_replacementGLF_dead13p, donor_replacementGLF_dead13p, donor_replacementGLF_dead13i, -21847) % donor_replacementGLF_dead13p), donor_replacementGLF_dead13directions));
                        int donor_replacementGLF_dead22iters = _GLF_FUZZED(donor_replacementGLF_dead9a);
                        int donor_replacementGLF_dead22v = _GLF_FUZZED((donor_replacementGLF_dead13directions % donor_replacementGLF_dead13directions));
                        for (donor_replacementGLF_dead22i = 0; donor_replacementGLF_dead22i < donor_replacementGLF_dead22iters; donor_replacementGLF_dead22i++) {
                            if (_GLF_DEAD(false)) {
                                vec3 donor_replacementGLF_dead27color = _GLF_FUZZED(vec3(-2742.8668, 654.565, -8885.1650));
                                vec2 donor_replacementGLF_dead27uv = _GLF_FUZZED((isinf(GLF_dead12_GLF_color), GLF_dead9injectionSwitch));
                                if (donor_replacementGLF_dead27uv.x > (2.0 / 4.0)) {
                                    donor_replacementGLF_dead27color.y += float(GLF_dead27obj.numbers[2]);
                                }
                            }
                            donor_replacementGLF_dead22v = (4 * donor_replacementGLF_dead22v * (1000 - donor_replacementGLF_dead22v)) / 1000;
                            if (_GLF_DEAD(false)) {
                                vec2 donor_replacementGLF_dead26coord = _GLF_FUZZED(GLF_dead25injectionSwitch);
                                if (donor_replacementGLF_dead26coord.x > 0.4) {
                                    if (donor_replacementGLF_dead26coord.y < 0.6) {
                                        uvec2 GLF_dead26icoord = uvec2(((donor_replacementGLF_dead26coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                                        uint GLF_dead26res1 = uint(((GLF_dead26icoord.x * GLF_dead26icoord.y) >> (GLF_dead26icoord.x & 31u)) & 0xffffffffu);
                                        uint GLF_dead26res2 = uint(((GLF_dead26icoord.x * GLF_dead26icoord.y) << (GLF_dead26icoord.x & 31u)) & 0xffffffffu);
                                        float GLF_dead26res = float(((GLF_dead26res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_dead26res1 & 1u) != 0u ? 1u : 0u));
                                        GLF_dead26_GLF_color = vec4(GLF_dead26res, GLF_dead26res, GLF_dead26res, 1.0);
                                    } else {
                                        ivec2 GLF_dead26icoord = ivec2(((donor_replacementGLF_dead26coord - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                                        int GLF_dead26res3 = ((GLF_dead26icoord.x >> 5) & 1) ^ ((GLF_dead26icoord.y & 32) >> 5);
                                        int GLF_dead26res2 = (GLF_dead26icoord.y * GLF_dead26icoord.y >> 10) & 1;
                                        int GLF_dead26res1 = (GLF_dead26icoord.x * GLF_dead26icoord.y >> 9) & 1;
                                        GLF_dead26_GLF_color = vec4(float(GLF_dead26res1 ^ GLF_dead26res2), float(GLF_dead26res2 & GLF_dead26res3), float(GLF_dead26res1 | GLF_dead26res3), 1.0);
                                    }
                                } else {
                                    ivec2 GLF_dead26icoord = ivec2(((donor_replacementGLF_dead26coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.6, 1.0)) * 256.0);
                                    int GLF_dead26v = (GLF_dead26icoord.x ^ GLF_dead26icoord.y) * GLF_dead26icoord.y;
                                    bool GLF_dead26res1 = ((GLF_dead26v >> 10) & 1) != 0;
                                    bool GLF_dead26res2 = ((GLF_dead26v >> 11) & 4) != 0;
                                    bool GLF_dead26res3 = ((GLF_dead26v >> 12) & 8) != 0;
                                    GLF_dead26_GLF_color = vec4(GLF_dead26res1 ? 1.0 : 0.0, GLF_dead26res2 ? 1.0 : 0.0, GLF_dead26res3 ? 1.0 : 0.0, 1);
                                }
                            }
                        }
                    }
                    float donor_replacementGLF_dead18c_im = _GLF_FUZZED(27.83);
                    float donor_replacementGLF_dead18c_re = _GLF_FUZZED(GLF_dead10one);
                    if (_GLF_DEAD(false)) {
                        int donor_replacementGLF_dead22i = _GLF_FUZZED(donor_replacementGLF_dead9a);
                        int donor_replacementGLF_dead22iters = _GLF_FUZZED(donor_replacementGLF_dead9c);
                        int donor_replacementGLF_dead22v = _GLF_FUZZED(bitfieldExtract(clamp((donor_replacementGLF_dead13i / GLF_dead13j), donor_replacementGLF_dead9a, GLF_dead5N), (GLF_dead5N / donor_replacementGLF_dead13v), donor_replacementGLF_dead9c));
                        for (donor_replacementGLF_dead22i = 0; donor_replacementGLF_dead22i < donor_replacementGLF_dead22iters; donor_replacementGLF_dead22i++) {
                            donor_replacementGLF_dead22v = (4 * donor_replacementGLF_dead22v * (1000 - donor_replacementGLF_dead22v)) / 1000;
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            float donor_replacementGLF_dead22limit = _GLF_FUZZED(GLF_dead10one);
                            float donor_replacementGLF_dead22result = _GLF_FUZZED(661.341);
                            if (_GLF_DEAD(false)) {
                                int donor_replacementGLF_dead29count = _GLF_FUZZED(GLF_dead13j);
                                int donor_replacementGLF_dead29v = _GLF_FUZZED(bitCount(146767u));
                                while (donor_replacementGLF_dead29v > 1) {
                                    if ((donor_replacementGLF_dead29v & 1) == 1) {
                                        donor_replacementGLF_dead29v = 3 * donor_replacementGLF_dead29v + 1;
                                    } else {
                                        donor_replacementGLF_dead29v /= 2;
                                    }
                                    donor_replacementGLF_dead29count++;
                                }
                            }
                            float donor_replacementGLF_dead22thirty_two = _GLF_FUZZED(636.627);
                            for (int GLF_dead22i = 1; GLF_dead22i < 800; GLF_dead22i++) {
                                if (_GLF_DEAD(_GLF_IDENTITY(false, false || (false)))) {
                                    vec2 donor_replacementGLF_dead26coord = _GLF_FUZZED(exp(sinh(GLF_dead21injectionSwitch)));
                                    if (donor_replacementGLF_dead26coord.x > 0.4) {
                                        if (donor_replacementGLF_dead26coord.y < 0.6) {
                                            uvec2 GLF_dead26icoord = uvec2(((donor_replacementGLF_dead26coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                                            uint GLF_dead26res1 = uint(((GLF_dead26icoord.x * GLF_dead26icoord.y) >> (GLF_dead26icoord.x & 31u)) & 0xffffffffu);
                                            uint GLF_dead26res2 = uint(((GLF_dead26icoord.x * GLF_dead26icoord.y) << (GLF_dead26icoord.x & 31u)) & 0xffffffffu);
                                            float GLF_dead26res = float(((GLF_dead26res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_dead26res1 & 1u) != 0u ? 1u : 0u));
                                            GLF_dead26_GLF_color = vec4(GLF_dead26res, GLF_dead26res, GLF_dead26res, 1.0);
                                        } else {
                                            ivec2 GLF_dead26icoord = ivec2(((donor_replacementGLF_dead26coord - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                                            int GLF_dead26res3 = ((GLF_dead26icoord.x >> 5) & 1) ^ ((GLF_dead26icoord.y & 32) >> 5);
                                            int GLF_dead26res2 = (GLF_dead26icoord.y * GLF_dead26icoord.y >> 10) & 1;
                                            int GLF_dead26res1 = (GLF_dead26icoord.x * GLF_dead26icoord.y >> 9) & 1;
                                            GLF_dead26_GLF_color = vec4(float(GLF_dead26res1 ^ GLF_dead26res2), float(GLF_dead26res2 & GLF_dead26res3), float(GLF_dead26res1 | GLF_dead26res3), 1.0);
                                        }
                                    } else {
                                        ivec2 GLF_dead26icoord = ivec2(((donor_replacementGLF_dead26coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.6, 1.0)) * 256.0);
                                        int GLF_dead26v = (GLF_dead26icoord.x ^ GLF_dead26icoord.y) * GLF_dead26icoord.y;
                                        bool GLF_dead26res1 = ((GLF_dead26v >> 10) & 1) != 0;
                                        bool GLF_dead26res2 = ((GLF_dead26v >> 11) & 4) != 0;
                                        bool GLF_dead26res3 = ((GLF_dead26v >> 12) & 8) != 0;
                                        GLF_dead26_GLF_color = vec4(GLF_dead26res1 ? 1.0 : 0.0, GLF_dead26res2 ? 1.0 : 0.0, GLF_dead26res3 ? 1.0 : 0.0, 1);
                                    }
                                }
                                if ((GLF_dead22i % 32) == 0) {
                                    donor_replacementGLF_dead22result += 0.4;
                                } else {
                                    if (mod(float(GLF_dead22i), round(donor_replacementGLF_dead22thirty_two)) <= 0.01) {
                                        donor_replacementGLF_dead22result += 100.0;
                                    }
                                }
                                if (float(GLF_dead22i) >= donor_replacementGLF_dead22limit) {
                                    ;
                                }
                            }
                        }
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        vec2 donor_replacementGLF_dead26coord = _GLF_FUZZED(refract(GLF_dead21injectionSwitch, GLF_dead9injectionSwitch, vec3(-638.938, -3.1, -64.84).t));
                        {
                            ivec2 GLF_dead26icoord = ivec2(((donor_replacementGLF_dead26coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.6, 1.0)) * 256.0);
                            int GLF_dead26v = (GLF_dead26icoord.x ^ GLF_dead26icoord.y) * GLF_dead26icoord.y;
                            bool GLF_dead26res1 = ((GLF_dead26v >> 10) & 1) != 0;
                            bool GLF_dead26res2 = ((GLF_dead26v >> 11) & 4) != 0;
                            bool GLF_dead26res3 = ((GLF_dead26v >> 12) & 8) != 0;
                            GLF_dead26_GLF_color = vec4(GLF_dead26res1 ? 1.0 : 0.0, GLF_dead26res2 ? 1.0 : 0.0, GLF_dead26res3 ? 1.0 : 0.0, 1);
                        }
                    }
                    int donor_replacementGLF_dead18iteration = _GLF_FUZZED(31406);
                    float donor_replacementGLF_dead18x = _GLF_FUZZED(cosh(42.14));
                    float donor_replacementGLF_dead18y = _GLF_FUZZED(798.507);
                    {
                        if (donor_replacementGLF_dead18x * donor_replacementGLF_dead18x + donor_replacementGLF_dead18y * donor_replacementGLF_dead18y > 4.0) {
                            ;
                        }
                        float GLF_dead18x_new = donor_replacementGLF_dead18x * donor_replacementGLF_dead18x - donor_replacementGLF_dead18y * donor_replacementGLF_dead18y + donor_replacementGLF_dead18c_re;
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            int donor_replacementGLF_dead29count = _GLF_FUZZED(donor_replacementGLF_dead9c);
                            int donor_replacementGLF_dead29v = _GLF_FUZZED(GLF_dead3target);
                            while (donor_replacementGLF_dead29v > 1) {
                                if ((donor_replacementGLF_dead29v & 1) == 1) {
                                    donor_replacementGLF_dead29v = 3 * donor_replacementGLF_dead29v + 1;
                                } else {
                                    donor_replacementGLF_dead29v /= 2;
                                }
                                donor_replacementGLF_dead29count++;
                            }
                        }
                        donor_replacementGLF_dead18y = 2.0 * donor_replacementGLF_dead18x * donor_replacementGLF_dead18y + donor_replacementGLF_dead18c_im;
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            int donor_replacementGLF_dead23iteration = _GLF_FUZZED(findLSB(99980u));
                            if (donor_replacementGLF_dead23iteration < 1000) {
                                ;
                            } else {
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                    vec3 donor_replacementGLF_dead27color = _GLF_FUZZED(log2((vec3(-84.74, 0.6, -130.955) + float(true))));
                                    {
                                        donor_replacementGLF_dead27color.y += float(GLF_dead27obj.numbers[2]);
                                    }
                                }
                                ;
                                if (_GLF_DEAD(false)) {
                                    vec3 donor_replacementGLF_dead27color = _GLF_FUZZED(vec3(-9.7, 68.13, 36.31));
                                    vec2 donor_replacementGLF_dead27uv = _GLF_FUZZED(GLF_dead21injectionSwitch);
                                    if (donor_replacementGLF_dead27uv.x > (1.0 / 4.0)) {
                                        donor_replacementGLF_dead27color.x += float(GLF_dead27obj.numbers[1]);
                                    }
                                }
                            }
                        }
                        donor_replacementGLF_dead18x = GLF_dead18x_new;
                        donor_replacementGLF_dead18iteration++;
                    }
                    if (_GLF_DEAD(false)) {
                        int donor_replacementGLF_dead27i = _GLF_FUZZED(floatBitsToInt(-6293.6124));
                        int donor_replacementGLF_dead27j = _GLF_FUZZED(min(donor_replacementGLF_dead9c, donor_replacementGLF_dead13directions));
                        int donor_replacementGLF_dead27pivot = _GLF_FUZZED(ivec3(-98211, 88179, 1510)[2]);
                        {
                            if (GLF_dead27obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead27j, 10)] <= donor_replacementGLF_dead27pivot) {
                                donor_replacementGLF_dead27i++;
                                GLF_dead27swap(donor_replacementGLF_dead27i, donor_replacementGLF_dead27j);
                            }
                        }
                    }
                }
                for (donor_replacementGLF_dead13i = 0; donor_replacementGLF_dead13i < 8; donor_replacementGLF_dead13i++) {
                    for (GLF_dead13j = 0; GLF_dead13j < 8; GLF_dead13j++) {
                        if (_GLF_DEAD(false)) {
                            int donor_replacementGLF_dead22v = _GLF_FUZZED(GLF_dead13j);
                            {
                                donor_replacementGLF_dead22v = (4 * donor_replacementGLF_dead22v * (1000 - donor_replacementGLF_dead22v)) / 1000;
                            }
                            if (_GLF_DEAD(false)) {
                                int donor_replacementGLF_dead29count = _GLF_FUZZED(int(donor_replacementGLF_dead13canwalk));
                                int donor_replacementGLF_dead29v = _GLF_FUZZED(ivec2(23501, 6784)[0]);
                                {
                                    if ((donor_replacementGLF_dead29v & 1) == 1) {
                                        donor_replacementGLF_dead29v = 3 * donor_replacementGLF_dead29v + 1;
                                    } else {
                                        donor_replacementGLF_dead29v /= 2;
                                    }
                                    donor_replacementGLF_dead29count++;
                                }
                            }
                        }
                        if (GLF_dead13map[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead13j * 2 + donor_replacementGLF_dead13i * 2 * 16, 256)] == 0) {
                            donor_replacementGLF_dead13p.x = GLF_dead13j * 2;
                            donor_replacementGLF_dead13p.y = donor_replacementGLF_dead13i * 2;
                            if (_GLF_DEAD(false)) {
                                if (_GLF_DEAD(false)) {
                                    int donor_replacementGLF_dead29v = _GLF_FUZZED(int(147039u));
                                    {
                                        donor_replacementGLF_dead29v = 3 * donor_replacementGLF_dead29v + 1;
                                    }
                                }
                                int donor_replacementGLF_dead18iteration = _GLF_FUZZED(donor_replacementGLF_dead9c);
                                {
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                        float donor_replacementGLF_dead19c_im = _GLF_FUZZED(GLF_dead10one);
                                        float donor_replacementGLF_dead19c_re = _GLF_FUZZED((-GLF_dead10one));
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                            int donor_replacementGLF_dead29v = _GLF_FUZZED(findLSB(GLF_dead3target));
                                            {
                                                donor_replacementGLF_dead29v /= 2;
                                            }
                                        }
                                        int donor_replacementGLF_dead19iteration = _GLF_FUZZED(donor_replacementGLF_dead13v);
                                        float donor_replacementGLF_dead19x = _GLF_FUZZED(dot(GLF_dead9injectionSwitch, donor_replacementGLF_dead9uv));
                                        if (_GLF_DEAD(false)) {
                                            int donor_replacementGLF_dead29v = _GLF_FUZZED(donor_replacementGLF_dead18iteration);
                                            {
                                                donor_replacementGLF_dead29v = 3 * donor_replacementGLF_dead29v + 1;
                                            }
                                        }
                                        float donor_replacementGLF_dead19y = _GLF_FUZZED(-6.5);
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                            vec2 donor_replacementGLF_dead24a = _GLF_FUZZED(GLF_dead21injectionSwitch);
                                            float donor_replacementGLF_dead24z = _GLF_FUZZED(roundEven(6.9));
                                            {
                                                donor_replacementGLF_dead24z = donor_replacementGLF_dead24a.x / donor_replacementGLF_dead24a.y;
                                            }
                                        }
                                        for (int GLF_dead19k = 0; GLF_dead19k < 1000; GLF_dead19k++) {
                                            if (donor_replacementGLF_dead19x * donor_replacementGLF_dead19x + donor_replacementGLF_dead19y * donor_replacementGLF_dead19y > 4.0) {
                                                break;
                                            }
                                            float GLF_dead19x_new = donor_replacementGLF_dead19x * donor_replacementGLF_dead19x - donor_replacementGLF_dead19y * donor_replacementGLF_dead19y + donor_replacementGLF_dead19c_re;
                                            donor_replacementGLF_dead19y = 2.0 * donor_replacementGLF_dead19x * donor_replacementGLF_dead19y + donor_replacementGLF_dead19c_im;
                                            if (_GLF_DEAD(false)) {
                                                for (int GLF_dead27i = 0; GLF_dead27i < 10; GLF_dead27i++) {
                                                    GLF_dead27obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead27i, 10)] = (10 - GLF_dead27i);
                                                    GLF_dead27obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead27i, 10)] = GLF_dead27obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead27i, 10)] * GLF_dead27obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead27i, 10)];
                                                }
                                            }
                                            donor_replacementGLF_dead19x = GLF_dead19x_new;
                                            donor_replacementGLF_dead19iteration++;
                                        }
                                    }
                                    ;
                                }
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    vec3 donor_replacementGLF_dead22c = _GLF_FUZZED(dFdy(vec3(-99.81, 760.502, 80.93)));
                                    for (int GLF_dead22i = 0; GLF_dead22i < 3; GLF_dead22i++) {
                                        if (donor_replacementGLF_dead22c[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead22i, 3)] >= 1.0) {
                                            donor_replacementGLF_dead22c[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead22i, 3)] = donor_replacementGLF_dead22c[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead22i, 3)] * donor_replacementGLF_dead22c[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead22i, 3)];
                                        }
                                    }
                                }
                            }
                            donor_replacementGLF_dead13canwalk = true;
                        }
                    }
                }
                GLF_dead13map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead13p.x) + (donor_replacementGLF_dead13p.y) * 16, 256)] = 1;
            } else {
                int GLF_dead13d = donor_replacementGLF_dead13v % donor_replacementGLF_dead13directions;
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    float donor_replacementGLF_dead24th = _GLF_FUZZED(GLF_dead10one);
                    {
                        donor_replacementGLF_dead24th = 0.5 - donor_replacementGLF_dead24th;
                    }
                }
                donor_replacementGLF_dead13v += donor_replacementGLF_dead13directions;
                if (GLF_dead13d >= 0 && donor_replacementGLF_dead13p.x > 0 && GLF_dead13map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead13p.x - 2) + (donor_replacementGLF_dead13p.y) * 16, 256)] == 0) {
                    GLF_dead13d--;
                    GLF_dead13map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead13p.x) + (donor_replacementGLF_dead13p.y) * 16, 256)] = 1;
                    if (_GLF_DEAD(false)) {
                        int donor_replacementGLF_dead20a = _GLF_FUZZED((findLSB(donor_replacementGLF_dead13i) << donor_replacementGLF_dead9c));
                        int donor_replacementGLF_dead20b = _GLF_FUZZED(donor_replacementGLF_dead13i);
                        int donor_replacementGLF_dead20c = _GLF_FUZZED(findMSB(GLF_dead13d));
                        vec2 donor_replacementGLF_dead20uv = _GLF_FUZZED((donor_replacementGLF_dead9uv * GLF_dead10one));
                        {
                            donor_replacementGLF_dead20uv.y -= step(GLF_dead20injectionSwitch.y, donor_replacementGLF_dead20uv.x) + float(donor_replacementGLF_dead20a) + float(donor_replacementGLF_dead20b);
                            donor_replacementGLF_dead20uv.x += ldexp(GLF_dead20injectionSwitch.y, isinf(donor_replacementGLF_dead20uv.y + donor_replacementGLF_dead20uv.x) ? findMSB(donor_replacementGLF_dead20b) : findMSB(donor_replacementGLF_dead20a));
                            if (_GLF_DEAD(false)) {
                                int donor_replacementGLF_dead22i = _GLF_FUZZED(max(donor_replacementGLF_dead20b, donor_replacementGLF_dead9c));
                                float donor_replacementGLF_dead22limit = _GLF_FUZZED(GLF_dead10one);
                                if (_GLF_DEAD(false)) {
                                    int donor_replacementGLF_dead29count = _GLF_FUZZED((donor_replacementGLF_dead9c + donor_replacementGLF_dead13v));
                                    int donor_replacementGLF_dead29v = _GLF_FUZZED(bitfieldReverse(donor_replacementGLF_dead20c));
                                    while (donor_replacementGLF_dead29v > 1) {
                                        if ((donor_replacementGLF_dead29v & 1) == 1) {
                                            donor_replacementGLF_dead29v = 3 * donor_replacementGLF_dead29v + 1;
                                        } else {
                                            donor_replacementGLF_dead29v /= 2;
                                        }
                                        donor_replacementGLF_dead29count++;
                                    }
                                }
                                float donor_replacementGLF_dead22result = _GLF_FUZZED(faceforward(GLF_dead10one, 147.215, asinh(9.1)));
                                float donor_replacementGLF_dead22thirty_two = _GLF_FUZZED(dot(GLF_dead10one, atanh(-8961.6831)));
                                {
                                    if ((donor_replacementGLF_dead22i % 32) == 0) {
                                        donor_replacementGLF_dead22result += 0.4;
                                    } else {
                                        if (mod(float(donor_replacementGLF_dead22i), round(donor_replacementGLF_dead22thirty_two)) <= 0.01) {
                                            donor_replacementGLF_dead22result += 100.0;
                                        }
                                    }
                                    if (float(donor_replacementGLF_dead22i) >= donor_replacementGLF_dead22limit) {
                                        ;
                                    }
                                }
                            }
                            donor_replacementGLF_dead20c--;
                        }
                    }
                    GLF_dead13map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead13p.x - 1) + (donor_replacementGLF_dead13p.y) * 16, 256)] = 1;
                    GLF_dead13map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead13p.x - 2) + (donor_replacementGLF_dead13p.y) * 16, 256)] = 1;
                    donor_replacementGLF_dead13p.x -= 2;
                }
                if (GLF_dead13d >= 0 && donor_replacementGLF_dead13p.y > 0 && GLF_dead13map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead13p.x) + (donor_replacementGLF_dead13p.y - 2) * 16, 256)] == 0) {
                    GLF_dead13d--;
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        bool donor_replacementGLF_dead21c1 = _GLF_FUZZED((GLF_dead10m24 != mat2x4(-31.66, 30.72, 7821.2008, 1828.6147, 604.769, -5.8, 5.7, 2274.9277)));
                        bool donor_replacementGLF_dead21c2 = _GLF_FUZZED(donor_replacementGLF_dead13canwalk);
                        bool donor_replacementGLF_dead21c3 = _GLF_FUZZED(donor_replacementGLF_dead13canwalk);
                        bool donor_replacementGLF_dead21c4 = _GLF_FUZZED(mix(donor_replacementGLF_dead13canwalk, (donor_replacementGLF_dead13canwalk || true), (mat4(-215.512, -99.12, -43.61, -8.2, 8.5, 7.7, 5.1, -3.1, -3.2, -8.5, -7.8, -6.0, -85.31, 276.032, -9.2, 287.130) == GLF_dead10m44)));
                        vec3 donor_replacementGLF_dead21col = _GLF_FUZZED(vec3(8767.4047, -24.35, -5574.5973));
                        vec2 donor_replacementGLF_dead21uv = _GLF_FUZZED(GLF_dead9injectionSwitch);
                        if (!donor_replacementGLF_dead21c1 && !donor_replacementGLF_dead21c2 && !donor_replacementGLF_dead21c3 && donor_replacementGLF_dead21c4) {
                            float GLF_dead21stripe = GLF_dead21compute_stripe(tan((donor_replacementGLF_dead21uv.x + donor_replacementGLF_dead21uv.y) * 20.0), donor_replacementGLF_dead21uv.x + donor_replacementGLF_dead21uv.y);
                            donor_replacementGLF_dead21col = mix(vec3(donor_replacementGLF_dead21uv.x, .8, 0), vec3(1, donor_replacementGLF_dead21uv.y, 0), GLF_dead21stripe);
                            GLF_dead21_GLF_color = vec4(donor_replacementGLF_dead21col, 1.0);
                            ;
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            float donor_replacementGLF_dead24th = _GLF_FUZZED(2.8);
                            {
                                donor_replacementGLF_dead24th = 0.5 - donor_replacementGLF_dead24th;
                            }
                        }
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        vec3 donor_replacementGLF_dead27color = _GLF_FUZZED((mix(vec3(-3.2, -7.9, -1.0), asinh(vec3(2.0, 363.163, -2.0)), vec3(-7.6, -844.287, 7546.8784)) * determinant(mat3(7.4, -9.8, 1.2, 80.58, -5.3, -1.7, 4.2, 134.378, 5.3))));
                        vec2 donor_replacementGLF_dead27uv = _GLF_FUZZED(injectionSwitch);
                        if (abs(donor_replacementGLF_dead27uv.x - donor_replacementGLF_dead27uv.y) < 0.25) {
                            donor_replacementGLF_dead27color.x += float(GLF_dead27obj.numbers[9]);
                        }
                    }
                    GLF_dead13map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead13p.x) + (donor_replacementGLF_dead13p.y) * 16, 256)] = 1;
                    GLF_dead13map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead13p.x) + (donor_replacementGLF_dead13p.y - 1) * 16, 256)] = 1;
                    GLF_dead13map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead13p.x) + (donor_replacementGLF_dead13p.y - 2) * 16, 256)] = 1;
                    donor_replacementGLF_dead13p.y -= 2;
                }
                if (_GLF_DEAD(_GLF_IDENTITY(false, bool(bool(false))))) {
                    int donor_replacementGLF_dead23iteration = _GLF_FUZZED(findMSB(floatBitsToUint(GLF_dead10one)));
                    if (donor_replacementGLF_dead23iteration < 1000) {
                        ;
                    } else {
                        ;
                    }
                }
                if (GLF_dead13d >= 0 && donor_replacementGLF_dead13p.x < 14 && GLF_dead13map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead13p.x + 2) + (donor_replacementGLF_dead13p.y) * 16, 256)] == 0) {
                    GLF_dead13d--;
                    GLF_dead13map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead13p.x) + (donor_replacementGLF_dead13p.y) * 16, 256)] = 1;
                    GLF_dead13map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead13p.x + 1) + (donor_replacementGLF_dead13p.y) * 16, 256)] = 1;
                    GLF_dead13map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead13p.x + 2) + (donor_replacementGLF_dead13p.y) * 16, 256)] = 1;
                    if (_GLF_DEAD(_GLF_IDENTITY(false, true && (false)))) {
                        vec2 donor_replacementGLF_dead26coord = _GLF_FUZZED(donor_replacementGLF_dead9uv);
                        {
                            ivec2 GLF_dead26icoord = ivec2(((donor_replacementGLF_dead26coord - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                            int GLF_dead26res3 = ((GLF_dead26icoord.x >> 5) & 1) ^ ((GLF_dead26icoord.y & 32) >> 5);
                            int GLF_dead26res2 = (GLF_dead26icoord.y * GLF_dead26icoord.y >> 10) & 1;
                            int GLF_dead26res1 = (GLF_dead26icoord.x * GLF_dead26icoord.y >> 9) & 1;
                            GLF_dead26_GLF_color = vec4(float(GLF_dead26res1 ^ GLF_dead26res2), float(GLF_dead26res2 & GLF_dead26res3), float(GLF_dead26res1 | GLF_dead26res3), 1.0);
                        }
                    }
                    donor_replacementGLF_dead13p.x += 2;
                }
                if (GLF_dead13d >= 0 && donor_replacementGLF_dead13p.y < 14 && GLF_dead13map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead13p.x) + (donor_replacementGLF_dead13p.y + 2) * 16, 256)] == 0) {
                    GLF_dead13d--;
                    GLF_dead13map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead13p.x) + (donor_replacementGLF_dead13p.y) * 16, 256)] = 1;
                    GLF_dead13map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead13p.x) + (donor_replacementGLF_dead13p.y + 1) * 16, 256)] = 1;
                    if (_GLF_DEAD(false)) {
                        float donor_replacementGLF_dead24th = _GLF_FUZZED(186.820);
                        {
                            donor_replacementGLF_dead24th = -donor_replacementGLF_dead24th;
                        }
                    }
                    GLF_dead13map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead13p.x) + (donor_replacementGLF_dead13p.y + 2) * 16, 256)] = 1;
                    donor_replacementGLF_dead13p.y += 2;
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    vec2 donor_replacementGLF_dead16coord = _GLF_FUZZED(injectionSwitch);
                    {
                        if (donor_replacementGLF_dead16coord.y < 0.6) {
                            uvec2 GLF_dead16icoord = uvec2(((donor_replacementGLF_dead16coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                            uint GLF_dead16res1 = uint(((GLF_dead16icoord.x * GLF_dead16icoord.y) >> (GLF_dead16icoord.x & 31u)) & 0xffffffffu);
                            uint GLF_dead16res2 = uint(((GLF_dead16icoord.x * GLF_dead16icoord.y) << (GLF_dead16icoord.x & 31u)) & 0xffffffffu);
                            float GLF_dead16res = float(((GLF_dead16res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_dead16res1 & 1u) != 0u ? 1u : 0u));
                            GLF_dead16_GLF_color = vec4(GLF_dead16res, GLF_dead16res, GLF_dead16res, 1.0);
                        } else {
                            ivec2 GLF_dead16icoord = ivec2(((donor_replacementGLF_dead16coord - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                            int GLF_dead16res3 = ((GLF_dead16icoord.x >> 5) & 1) ^ ((GLF_dead16icoord.y & 32) >> 5);
                            int GLF_dead16res2 = (GLF_dead16icoord.y * GLF_dead16icoord.y >> 10) & 1;
                            int GLF_dead16res1 = (GLF_dead16icoord.x * GLF_dead16icoord.y >> 9) & 1;
                            if (_GLF_DEAD(false)) {
                                vec3 donor_replacementGLF_dead21col = _GLF_FUZZED(tan(acosh(vec3(9.4, -70.07, -421.814))));
                                vec2 donor_replacementGLF_dead21uv = _GLF_FUZZED(donor_replacementGLF_dead9uv);
                                {
                                    float GLF_dead21stripe = GLF_dead21compute_stripe(cos((donor_replacementGLF_dead21uv.x + donor_replacementGLF_dead21uv.y) * 20.0), donor_replacementGLF_dead21uv.x + donor_replacementGLF_dead21uv.y);
                                    donor_replacementGLF_dead21col = mix(vec3(donor_replacementGLF_dead21uv.x, 0, 0.75), vec3(.8, .7, donor_replacementGLF_dead21uv.x), GLF_dead21stripe);
                                    GLF_dead21_GLF_color = vec4(donor_replacementGLF_dead21col, 1.0);
                                    ;
                                }
                            }
                            if (_GLF_DEAD(false)) {
                                vec3 donor_replacementGLF_dead22c = _GLF_FUZZED((false ? vec3(-98.81, 9017.6443, -465.472) : vec3(657.183, -847.856, 225.119)));
                                int donor_replacementGLF_dead22i = _GLF_FUZZED((donor_replacementGLF_dead13p.y >> donor_replacementGLF_dead13directions));
                                {
                                    if (donor_replacementGLF_dead22c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead22i, 3)] >= 1.0) {
                                        donor_replacementGLF_dead22c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead22i, 3)] = donor_replacementGLF_dead22c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead22i, 3)] * donor_replacementGLF_dead22c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead22i, 3)];
                                    }
                                }
                            }
                            GLF_dead16_GLF_color = vec4(float(GLF_dead16res1 ^ GLF_dead16res2), float(GLF_dead16res2 & GLF_dead16res3), float(GLF_dead16res1 | GLF_dead16res3), 1.0);
                        }
                    }
                }
            }
        }
    }
    int GLF_dead3index = 0;
    while (GLF_dead3index != -1) {
        GLF_dead3currentNode = GLF_dead3tree[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead3index, 10)];
        if (GLF_dead3currentNode.data == GLF_dead3target) {
            return GLF_dead3target;
            if (_GLF_DEAD(_GLF_IDENTITY(false, false || (false)))) {
                int donor_replacementGLF_dead29count = _GLF_FUZZED(GLF_dead5N);
                int donor_replacementGLF_dead29v = _GLF_FUZZED(GLF_dead3index);
                {
                    if ((donor_replacementGLF_dead29v & 1) == 1) {
                        donor_replacementGLF_dead29v = 3 * donor_replacementGLF_dead29v + 1;
                    } else {
                        donor_replacementGLF_dead29v /= 2;
                    }
                    donor_replacementGLF_dead29count++;
                }
            }
        }
        GLF_dead3index = GLF_dead3target > GLF_dead3currentNode.data ? GLF_dead3currentNode.rightIndex : GLF_dead3currentNode.leftIndex;
    }
    return -1;
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
        int donor_replacementGLF_dead23c_im = _GLF_FUZZED(GLF_dead3index);
        int donor_replacementGLF_dead23c_re = _GLF_FUZZED((ivec2(26110, -58339), (5128 / GLF_dead3target)));
        int donor_replacementGLF_dead23iteration = _GLF_FUZZED((clamp((true ? GLF_dead3index : GLF_dead3target), GLF_dead5N, GLF_dead3index) - GLF_dead3index));
        int donor_replacementGLF_dead23x = _GLF_FUZZED((GLF_dead3index << GLF_dead3target));
        int donor_replacementGLF_dead23y = _GLF_FUZZED(GLF_dead3target);
        {
            if (donor_replacementGLF_dead23x * donor_replacementGLF_dead23x + donor_replacementGLF_dead23y * donor_replacementGLF_dead23y > 262144) {
                ;
            }
            int GLF_dead23x_new = ((donor_replacementGLF_dead23x * donor_replacementGLF_dead23x - donor_replacementGLF_dead23y * donor_replacementGLF_dead23y) / 256 + donor_replacementGLF_dead23c_re);
            donor_replacementGLF_dead23y = (2 * donor_replacementGLF_dead23x * donor_replacementGLF_dead23y / 256 + donor_replacementGLF_dead23c_im);
            donor_replacementGLF_dead23x = GLF_dead23x_new;
            donor_replacementGLF_dead23iteration++;
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                int donor_replacementGLF_dead29v = _GLF_FUZZED(donor_replacementGLF_dead23y);
                {
                    donor_replacementGLF_dead29v /= 2;
                }
            }
        }
    }
}

layout(location = 0) out vec4 _GLF_color;
layout(set = 0, binding = 0) uniform sampler2D tex;

void main() {
    if (_GLF_DEAD(false)) {
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < abs(0.0))))) {
            int donor_replacementGLF_dead25i = _GLF_FUZZED((GLF_dead5N >> 21806));
            if (donor_replacementGLF_dead25i < int(GLF_dead25gl_FragCoord.x)) {
                ;
            }
        }
        int donor_replacementGLF_dead7count = _GLF_FUZZED(380);
        int donor_replacementGLF_dead7v = _GLF_FUZZED(((-19576) / (-6913)));
        while (donor_replacementGLF_dead7v > 1) {
            if (_GLF_DEAD(false)) {
                int donor_replacementGLF_dead25j = _GLF_FUZZED((true ? 27749 : donor_replacementGLF_dead7v));
                vec3 donor_replacementGLF_dead25m = _GLF_FUZZED(vec3((GLF_dead10one - GLF_dead13_GLF_color)));
                vec2 donor_replacementGLF_dead25n = _GLF_FUZZED(((injectionSwitch - GLF_dead21injectionSwitch) + GLF_dead20injectionSwitch));
                for (int GLF_dead25i = -1; GLF_dead25i <= int(GLF_dead25injectionSwitch.y); GLF_dead25i++) {
                    vec2 GLF_dead25g = vec2(float(donor_replacementGLF_dead25j), float(GLF_dead25i));
                    vec2 GLF_dead25o = mix(donor_replacementGLF_dead25n, GLF_dead25g, 0.2);
                    if (GLF_dead25injectionSwitch.x < (donor_replacementGLF_dead25m.x)) {
                        int GLF_dead25k = 1;
                        while (GLF_dead25k >= 0) {
                            GLF_dead25o = GLF_dead25o + GLF_dead25o;
                            GLF_dead25k--;
                        }
                        donor_replacementGLF_dead25m = vec3(GLF_dead25injectionSwitch.x, cos(GLF_dead25o));
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                            int donor_replacementGLF_dead27i = _GLF_FUZZED(donor_replacementGLF_dead7count);
                            int donor_replacementGLF_dead27j = _GLF_FUZZED(GLF_dead5N);
                            {
                                donor_replacementGLF_dead27i++;
                                GLF_dead27swap(donor_replacementGLF_dead27i, donor_replacementGLF_dead27j);
                            }
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        _GLF_color = GLF_dead13_GLF_color;
                    }
                }
            }
            if ((donor_replacementGLF_dead7v & 1) == 1) {
                if (_GLF_DEAD(false)) {
                    float donor_replacementGLF_dead24th = _GLF_FUZZED(GLF_dead10one);
                    {
                        donor_replacementGLF_dead24th = -donor_replacementGLF_dead24th;
                    }
                }
                donor_replacementGLF_dead7v = 3 * donor_replacementGLF_dead7v + 1;
            } else {
                if (_GLF_DEAD(false)) {
                    _GLF_color = abs((true ? uintBitsToFloat(uvec4(125274u, 189846u, 196129u, 71090u)) : GLF_dead12_GLF_color));
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        int donor_replacementGLF_dead25i = _GLF_FUZZED(donor_replacementGLF_dead7v);
                        int donor_replacementGLF_dead25j = _GLF_FUZZED(donor_replacementGLF_dead7count);
                        vec3 donor_replacementGLF_dead25m = _GLF_FUZZED(sinh(min(dFdxCoarse(vec3(-3431.0321, 816.613, -70.88)), vec3(967.279, -0.4, -1128.8648))));
                        vec2 donor_replacementGLF_dead25n = _GLF_FUZZED(injectionSwitch);
                        if (_GLF_DEAD(false)) {
                            int donor_replacementGLF_dead29count = _GLF_FUZZED((donor_replacementGLF_dead7v * GLF_dead5N));
                            int donor_replacementGLF_dead29v = _GLF_FUZZED(79171);
                            while (donor_replacementGLF_dead29v > 1) {
                                if ((donor_replacementGLF_dead29v & 1) == 1) {
                                    donor_replacementGLF_dead29v = 3 * donor_replacementGLF_dead29v + 1;
                                } else {
                                    donor_replacementGLF_dead29v /= 2;
                                }
                                donor_replacementGLF_dead29count++;
                            }
                        }
                        {
                            vec2 GLF_dead25g = vec2(float(donor_replacementGLF_dead25j), float(donor_replacementGLF_dead25i));
                            vec2 GLF_dead25o = mix(donor_replacementGLF_dead25n, GLF_dead25g, 0.2);
                            if (_GLF_DEAD(false)) {
                                {
                                    discard;
                                }
                            }
                            if (GLF_dead25injectionSwitch.x < (donor_replacementGLF_dead25m.x)) {
                                int GLF_dead25k = 1;
                                while (GLF_dead25k >= 0) {
                                    GLF_dead25o = GLF_dead25o + GLF_dead25o;
                                    GLF_dead25k--;
                                }
                                donor_replacementGLF_dead25m = vec3(GLF_dead25injectionSwitch.x, cos(GLF_dead25o));
                            }
                        }
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        _GLF_color = mix(GLF_dead16_GLF_color, _GLF_color, dFdxFine(GLF_dead15gl_FragCoord));
                        if (_GLF_DEAD(false)) {
                            float donor_replacementGLF_dead24th = _GLF_FUZZED((atan(3401.0078)));
                            {
                                donor_replacementGLF_dead24th = 1.0 - donor_replacementGLF_dead24th;
                            }
                        }
                    }
                }
                if (_GLF_DEAD(false)) {
                    vec2 donor_replacementGLF_dead16coord = _GLF_FUZZED(refract(vec2(-8.7, 5209.5438), vec2(-8.0, -168.861), -89.58));
                    {
                        ivec2 GLF_dead16icoord = ivec2(((donor_replacementGLF_dead16coord - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < sqrt(abs(0.0)))))) {
                            int donor_replacementGLF_dead20a = _GLF_FUZZED(donor_replacementGLF_dead7v);
                            int donor_replacementGLF_dead20b = _GLF_FUZZED(-25539);
                            if (_GLF_DEAD(_GLF_IDENTITY(false, bool(bvec3(false, true, false))))) {
                                vec2 donor_replacementGLF_dead26coord = _GLF_FUZZED(sin(GLF_dead9injectionSwitch));
                                {
                                    ivec2 GLF_dead26icoord = ivec2(((donor_replacementGLF_dead26coord - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                                    int GLF_dead26res3 = ((GLF_dead26icoord.x >> 5) & 1) ^ ((GLF_dead26icoord.y & 32) >> 5);
                                    int GLF_dead26res2 = (GLF_dead26icoord.y * GLF_dead26icoord.y >> 10) & 1;
                                    int GLF_dead26res1 = (GLF_dead26icoord.x * GLF_dead26icoord.y >> 9) & 1;
                                    GLF_dead26_GLF_color = vec4(float(GLF_dead26res1 ^ GLF_dead26res2), float(GLF_dead26res2 & GLF_dead26res3), float(GLF_dead26res1 | GLF_dead26res3), 1.0);
                                }
                            }
                            vec2 donor_replacementGLF_dead20uv = _GLF_FUZZED(GLF_dead9injectionSwitch);
                            {
                                donor_replacementGLF_dead20uv.y -= step(GLF_dead20injectionSwitch.y, donor_replacementGLF_dead20uv.x) + float(donor_replacementGLF_dead20a);
                                donor_replacementGLF_dead20uv.x *= (isnan(donor_replacementGLF_dead20uv.y) ? cosh(GLF_dead20gl_FragCoord.y) : tanh(GLF_dead20gl_FragCoord.x));
                                donor_replacementGLF_dead20b--;
                            }
                        }
                        int GLF_dead16res3 = ((GLF_dead16icoord.x >> 5) & 1) ^ ((GLF_dead16icoord.y & 32) >> 5);
                        if (_GLF_DEAD(false)) {
                            vec3 donor_replacementGLF_dead22c = _GLF_FUZZED(vec3(2514.3284, 73.67, -9.4));
                            int donor_replacementGLF_dead22i = _GLF_FUZZED(GLF_dead5N);
                            {
                                if (donor_replacementGLF_dead22c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead22i, 3)] >= 1.0) {
                                    donor_replacementGLF_dead22c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead22i, 3)] = donor_replacementGLF_dead22c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead22i, 3)] * donor_replacementGLF_dead22c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead22i, 3)];
                                }
                            }
                        }
                        int GLF_dead16res2 = (GLF_dead16icoord.y * GLF_dead16icoord.y >> 10) & 1;
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < sin(sqrt(0.0)))))) {
                            int donor_replacementGLF_dead29v = _GLF_FUZZED(GLF_dead5N);
                            if ((donor_replacementGLF_dead29v & 1) == 1) {
                                donor_replacementGLF_dead29v = 3 * donor_replacementGLF_dead29v + 1;
                            } else {
                                donor_replacementGLF_dead29v /= 2;
                            }
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            int donor_replacementGLF_dead23c_im = _GLF_FUZZED(donor_replacementGLF_dead7count);
                            int donor_replacementGLF_dead23c_re = _GLF_FUZZED(((31100 + donor_replacementGLF_dead7v) >> GLF_dead16res3));
                            int donor_replacementGLF_dead23iteration = _GLF_FUZZED(GLF_dead5N);
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                vec2 donor_replacementGLF_dead26coord = _GLF_FUZZED((GLF_dead10one + atanh(vec2(17.84, -202.251))));
                                {
                                    uvec2 GLF_dead26icoord = uvec2(((donor_replacementGLF_dead26coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                                    uint GLF_dead26res1 = uint(((GLF_dead26icoord.x * GLF_dead26icoord.y) >> (GLF_dead26icoord.x & 31u)) & 0xffffffffu);
                                    uint GLF_dead26res2 = uint(((GLF_dead26icoord.x * GLF_dead26icoord.y) << (GLF_dead26icoord.x & 31u)) & 0xffffffffu);
                                    float GLF_dead26res = float(((GLF_dead26res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_dead26res1 & 1u) != 0u ? 1u : 0u));
                                    GLF_dead26_GLF_color = vec4(GLF_dead26res, GLF_dead26res, GLF_dead26res, 1.0);
                                }
                            }
                            int donor_replacementGLF_dead23x = _GLF_FUZZED(bitCount((80061u ^ 76500u)));
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < determinant(mat3(0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0)))))) {
                                _GLF_color = GLF_dead15gl_FragCoord;
                            }
                            int donor_replacementGLF_dead23y = _GLF_FUZZED(55024);
                            for (int GLF_dead23k = 0; GLF_dead23k < 1000; GLF_dead23k++) {
                                if (donor_replacementGLF_dead23x * donor_replacementGLF_dead23x + donor_replacementGLF_dead23y * donor_replacementGLF_dead23y > 262144) {
                                    break;
                                }
                                int GLF_dead23x_new = ((donor_replacementGLF_dead23x * donor_replacementGLF_dead23x - donor_replacementGLF_dead23y * donor_replacementGLF_dead23y) / 256 + donor_replacementGLF_dead23c_re);
                                donor_replacementGLF_dead23y = (2 * donor_replacementGLF_dead23x * donor_replacementGLF_dead23y / 256 + donor_replacementGLF_dead23c_im);
                                donor_replacementGLF_dead23x = GLF_dead23x_new;
                                donor_replacementGLF_dead23iteration++;
                            }
                        }
                        int GLF_dead16res1 = (GLF_dead16icoord.x * GLF_dead16icoord.y >> 9) & 1;
                        GLF_dead16_GLF_color = vec4(float(GLF_dead16res1 ^ GLF_dead16res2), float(GLF_dead16res2 & GLF_dead16res3), float(GLF_dead16res1 | GLF_dead16res3), 1.0);
                    }
                }
                if (_GLF_DEAD(false)) {
                    float donor_replacementGLF_dead13result = _GLF_FUZZED(log(3803.5987));
                    {
                        if (_GLF_DEAD(false)) {
                            vec3 donor_replacementGLF_dead27color = _GLF_FUZZED((vec3(-111.572, 4.7, 4.9) / roundEven(vec3(-4.4, 0.7, -4.3))));
                            vec2 donor_replacementGLF_dead27uv = _GLF_FUZZED((-reflect(vec3(5262.6032, 20.62, -268.600), vec3(7.4, -388.783, -2.3))).bg);
                            if (abs(donor_replacementGLF_dead27uv.x - donor_replacementGLF_dead27uv.y) < 0.25) {
                                donor_replacementGLF_dead27color.x += float(GLF_dead27obj.numbers[9]);
                            }
                        }
                        ;
                    }
                }
                donor_replacementGLF_dead7v /= 2;
            }
            if (_GLF_DEAD(false)) {
                _GLF_color = vec4(1.4, -9700.6089, 8411.2449, 3.7);
            }
            donor_replacementGLF_dead7count++;
        }
    }
    vec3 texel = texture(tex, gl_FragCoord.xy * (1.0 / 256.0)).xyz;
    if (_GLF_DEAD(false)) {
        _GLF_color = _GLF_color;
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
            vec2 donor_replacementGLF_dead26coord = _GLF_FUZZED(mat3x2(-371.652, 16.60, 1571.2773, 4228.3524, 78.92, 528.154)[2]);
            {
                ivec2 GLF_dead26icoord = ivec2(((donor_replacementGLF_dead26coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.6, 1.0)) * 256.0);
                int GLF_dead26v = (GLF_dead26icoord.x ^ GLF_dead26icoord.y) * GLF_dead26icoord.y;
                bool GLF_dead26res1 = ((GLF_dead26v >> 10) & 1) != 0;
                bool GLF_dead26res2 = ((GLF_dead26v >> 11) & 4) != 0;
                bool GLF_dead26res3 = ((GLF_dead26v >> 12) & 8) != 0;
                GLF_dead26_GLF_color = vec4(GLF_dead26res1 ? 1.0 : 0.0, GLF_dead26res2 ? 1.0 : 0.0, GLF_dead26res3 ? 1.0 : 0.0, 1);
            }
        }
    }
    if (_GLF_DEAD(_GLF_IDENTITY(false, (false) || false))) {
        bool donor_replacementGLF_dead21c1 = _GLF_FUZZED(((-342.952) < GLF_dead10one));
        bool donor_replacementGLF_dead21c2 = _GLF_FUZZED(false);
        vec3 donor_replacementGLF_dead21col = _GLF_FUZZED((GLF_dead16_GLF_color * mat3x4(-507.240, -9.7, 15.63, 27.46, 3187.3172, 6317.9771, 57.42, 3.6, -9549.9052, -473.485, 0.7, -6.8)));
        vec2 donor_replacementGLF_dead21uv = _GLF_FUZZED(ldexp(vec2(880.422, 909.225), ivec2(-56481, 41107)));
        if (!donor_replacementGLF_dead21c1 && donor_replacementGLF_dead21c2) {
            float GLF_dead21stripe = GLF_dead21compute_stripe(tan((donor_replacementGLF_dead21uv.x + donor_replacementGLF_dead21uv.y) * 20.0), donor_replacementGLF_dead21uv.x + donor_replacementGLF_dead21uv.y);
            donor_replacementGLF_dead21col = mix(vec3(0.5, donor_replacementGLF_dead21uv.x, 0.1), vec3(.4, 0, .5), GLF_dead21stripe);
            GLF_dead21_GLF_color = vec4(donor_replacementGLF_dead21col, 1.0);
            return;
        }
    }
    vec2 reuse = (texel.xz + texel.yy) * 0.5 + vec2(0.25, 0.25);
    reuse = floor(reuse * 256.0) / 256.0;
    if (_GLF_DEAD(false)) {
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            _GLF_color = vec4(-60.20, -84.10, 23.35, -66.85);
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            _GLF_color = vec4(64.55, 81.53, 7.3, 65.40);
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            int donor_replacementGLF_dead29v = _GLF_FUZZED((GLF_dead5N / GLF_dead5N));
            {
                donor_replacementGLF_dead29v /= 2;
            }
        }
        int donor_replacementGLF_dead19iteration = _GLF_FUZZED(GLF_dead5N);
        {
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                int donor_replacementGLF_dead29v = _GLF_FUZZED(GLF_dead5N);
                if ((donor_replacementGLF_dead29v & 1) == 1) {
                    donor_replacementGLF_dead29v = 3 * donor_replacementGLF_dead29v + 1;
                } else {
                    donor_replacementGLF_dead29v /= 2;
                }
            }
            ;
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                vec3 donor_replacementGLF_dead27color = _GLF_FUZZED(vec3(8.4, -4.3, 3842.3927));
                {
                    donor_replacementGLF_dead27color.x += float(GLF_dead27obj.numbers[9]);
                }
            }
        }
    }
    _GLF_color = texture(tex, reuse);
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
        int donor_replacementGLF_dead3count = _GLF_FUZZED(ivec3(-38998, -6873, 37167)[1]);
        if (_GLF_DEAD(false)) {
            if (_GLF_DEAD(_GLF_IDENTITY(false, bool(bvec3(false, true, _GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))))))) {
                vec3 donor_replacementGLF_dead27color = _GLF_FUZZED(acos(vec3(347.003, 6402.7348, -5515.8395)));
                {
                    donor_replacementGLF_dead27color.x += float(GLF_dead27obj.numbers[1]);
                }
            }
            {
                ;
            }
        }
        int donor_replacementGLF_dead3i = _GLF_FUZZED(((-79847) * 26224));
        {
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < length(0.0))))) {
                if (_GLF_DEAD(false)) {
                    _GLF_color = _GLF_color;
                }
                _GLF_color = min(max(mat2x4(-968.151, -9.4, 693.603, 2462.9939, -3.7, 0.6, 1729.4082, -2.5)[0], _GLF_color), asin(vec4(5.8, -3.7, -5.1, -967.730)));
            }
            int GLF_dead3result = GLF_dead3search(donor_replacementGLF_dead3i);
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                float donor_replacementGLF_dead12pab = _GLF_FUZZED(float(false));
                float donor_replacementGLF_dead12pca = _GLF_FUZZED(ldexp(cos(88.15), -39515));
                if (_GLF_DEAD(false)) {
                    float donor_replacementGLF_dead15grey = _GLF_FUZZED(distance(vec3(8.2, -9.0, 1130.3726), texel));
                    if (int(GLF_dead15gl_FragCoord[1]) < 120) {
                        donor_replacementGLF_dead15grey = 0.5 + float(GLF_dead15data[3]) / 10.0;
                    } else {
                        if (int(GLF_dead15gl_FragCoord[1]) < 150) {
                            if (_GLF_DEAD(false)) {
                                _GLF_color = intBitsToFloat(ivec4(-52845, 78673, -83491, 29823));
                            }
                            discard;
                        } else {
                            if (int(GLF_dead15gl_FragCoord[1]) < 180) {
                                if (_GLF_DEAD(false)) {
                                    int donor_replacementGLF_dead29count = _GLF_FUZZED(((-53899) >> (donor_replacementGLF_dead3i / GLF_dead3result)));
                                    int donor_replacementGLF_dead29v = _GLF_FUZZED(donor_replacementGLF_dead3i);
                                    while (donor_replacementGLF_dead29v > 1) {
                                        if ((donor_replacementGLF_dead29v & 1) == 1) {
                                            donor_replacementGLF_dead29v = 3 * donor_replacementGLF_dead29v + 1;
                                        } else {
                                            donor_replacementGLF_dead29v /= 2;
                                        }
                                        donor_replacementGLF_dead29count++;
                                    }
                                }
                                donor_replacementGLF_dead15grey = 0.5 + float(GLF_dead15data[5]) / 10.0;
                            } else {
                                if (int(GLF_dead15gl_FragCoord[1]) < 210) {
                                    donor_replacementGLF_dead15grey = 0.5 + float(GLF_dead15data[6]) / 10.0;
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                        _GLF_color = vec4(2.3, 9801.2054, 6.4, 1.4);
                                    }
                                } else {
                                    if (int(GLF_dead15gl_FragCoord[1]) < 240) {
                                        donor_replacementGLF_dead15grey = 0.5 + float(GLF_dead15data[7]) / 10.0;
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                            float donor_replacementGLF_dead19x = _GLF_FUZZED(GLF_dead10one);
                                            float donor_replacementGLF_dead19y = _GLF_FUZZED(tan(GLF_dead10one));
                                            if (donor_replacementGLF_dead19x * donor_replacementGLF_dead19x + donor_replacementGLF_dead19y * donor_replacementGLF_dead19y > 4.0) {
                                                ;
                                            }
                                        }
                                    } else {
                                        if (int(GLF_dead15gl_FragCoord[1]) < 270) {
                                            donor_replacementGLF_dead15grey = 0.5 + float(GLF_dead15data[8]) / 10.0;
                                        } else {
                                            if (_GLF_DEAD(false)) {
                                                int donor_replacementGLF_dead22v = _GLF_FUZZED(GLF_dead5N);
                                                {
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                        _GLF_color = reflect(vec4(3170.0132, -0.4, -9612.9007, 83.78), (reflect(vec4(-2619.0282, -2.7, 9.1, -54.74), GLF_dead12_GLF_color)));
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                            float donor_replacementGLF_dead22result = _GLF_FUZZED(donor_replacementGLF_dead15grey);
                                                            {
                                                                donor_replacementGLF_dead22result += 0.4;
                                                            }
                                                        }
                                                    }
                                                    donor_replacementGLF_dead22v = (4 * donor_replacementGLF_dead22v * (1000 - donor_replacementGLF_dead22v)) / 1000;
                                                }
                                            }
                                            if (_GLF_DEAD(false)) {
                                                _GLF_color = inversesqrt(GLF_dead16_GLF_color);
                                                if (_GLF_DEAD(false)) {
                                                    _GLF_color = GLF_dead15gl_FragCoord;
                                                }
                                            }
                                            discard;
                                        }
                                        if (_GLF_DEAD(false)) {
                                            _GLF_color = mix(GLF_dead12_GLF_color, GLF_dead20gl_FragCoord, GLF_dead15gl_FragCoord);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                if (!((donor_replacementGLF_dead12pab < 0.0 && donor_replacementGLF_dead12pca < 0.0) || (donor_replacementGLF_dead12pab >= 0.0 && donor_replacementGLF_dead12pca >= 0.0))) {
                    if (_GLF_DEAD(false)) {
                        if (_GLF_DEAD(_GLF_IDENTITY(false, (false) || false))) {
                            _GLF_color = (GLF_dead16_GLF_color - GLF_dead20gl_FragCoord);
                        }
                        {
                            ;
                        }
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        int donor_replacementGLF_dead13d = _GLF_FUZZED(donor_replacementGLF_dead3count);
                        ivec2 donor_replacementGLF_dead13p = _GLF_FUZZED(ivec2(93332, 36032));
                        {
                            donor_replacementGLF_dead13d--;
                            GLF_dead13map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead13p.x) + (donor_replacementGLF_dead13p.y) * 16, 256)] = 1;
                            GLF_dead13map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead13p.x) + (donor_replacementGLF_dead13p.y - 1) * 16, 256)] = 1;
                            if (_GLF_DEAD(false)) {
                                _GLF_color = GLF_dead20gl_FragCoord;
                            }
                            GLF_dead13map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead13p.x) + (donor_replacementGLF_dead13p.y - 2) * 16, 256)] = 1;
                            donor_replacementGLF_dead13p.y -= 2;
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        float donor_replacementGLF_dead19c_im = _GLF_FUZZED(trunc(donor_replacementGLF_dead12pca));
                        int donor_replacementGLF_dead19iteration = _GLF_FUZZED(int(donor_replacementGLF_dead12pca));
                        float donor_replacementGLF_dead19x = _GLF_FUZZED(radians(donor_replacementGLF_dead12pca));
                        float donor_replacementGLF_dead19y = _GLF_FUZZED(donor_replacementGLF_dead12pca);
                        for (int GLF_dead19k = 0; GLF_dead19k < 1000; GLF_dead19k++) {
                            if (_GLF_DEAD(false)) {
                                _GLF_color = sign((GLF_dead16_GLF_color * atanh(donor_replacementGLF_dead12pca)));
                            }
                            if (donor_replacementGLF_dead19x * donor_replacementGLF_dead19x + donor_replacementGLF_dead19y * donor_replacementGLF_dead19y > 4.0) {
                                break;
                            }
                            float GLF_dead19x_new = donor_replacementGLF_dead19x * donor_replacementGLF_dead19x - donor_replacementGLF_dead19y * donor_replacementGLF_dead19y + donor_replacementGLF_dead12pca;
                            donor_replacementGLF_dead19y = 2.0 * donor_replacementGLF_dead19x * donor_replacementGLF_dead19y + donor_replacementGLF_dead19c_im;
                            donor_replacementGLF_dead19x = GLF_dead19x_new;
                            donor_replacementGLF_dead19iteration++;
                        }
                    }
                    ;
                }
            }
            if (_GLF_DEAD(false)) {
                vec3 donor_replacementGLF_dead27color = _GLF_FUZZED(texel);
                {
                    donor_replacementGLF_dead27color.x += float(GLF_dead27obj.numbers[5]);
                }
            }
            switch (donor_replacementGLF_dead3i) {
                case 9:
                case 5:
                    if (_GLF_DEAD(false)) {
                        vec3 donor_replacementGLF_dead27color = _GLF_FUZZED(sign(texel));
                        vec2 donor_replacementGLF_dead27uv = _GLF_FUZZED(ceil(atan(GLF_dead25injectionSwitch, vec2(-5409.7573, -76.33))));
                        if (abs(donor_replacementGLF_dead27uv.x - donor_replacementGLF_dead27uv.y) < 0.25) {
                            donor_replacementGLF_dead27color.x += float(GLF_dead27obj.numbers[9]);
                        }
                    }
                case 12:
                case 15:
                case 7:
                case 8:
                    if (_GLF_DEAD(false)) {
                        if (_GLF_DEAD(false)) {
                            vec3 donor_replacementGLF_dead21col = _GLF_FUZZED(cross(vec3(1.0, -8.9, 408.322), texel));
                            vec2 donor_replacementGLF_dead21uv = _GLF_FUZZED(vec2(-1427.4837, -1135.0246));
                            {
                                float GLF_dead21stripe = GLF_dead21compute_stripe(cos((donor_replacementGLF_dead21uv.x + donor_replacementGLF_dead21uv.y) * 20.0), donor_replacementGLF_dead21uv.x + donor_replacementGLF_dead21uv.y);
                                donor_replacementGLF_dead21col = mix(vec3(.7, sinh(donor_replacementGLF_dead21uv.x), donor_replacementGLF_dead21uv.x), vec3(.3, .5, donor_replacementGLF_dead21uv.x), GLF_dead21stripe);
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                    int donor_replacementGLF_dead29count = _GLF_FUZZED(findLSB(GLF_dead3result));
                                    int donor_replacementGLF_dead29v = _GLF_FUZZED(donor_replacementGLF_dead3count);
                                    {
                                        if ((donor_replacementGLF_dead29v & 1) == 1) {
                                            donor_replacementGLF_dead29v = 3 * donor_replacementGLF_dead29v + 1;
                                        } else {
                                            donor_replacementGLF_dead29v /= 2;
                                        }
                                        donor_replacementGLF_dead29count++;
                                    }
                                }
                                GLF_dead21_GLF_color = vec4(donor_replacementGLF_dead21col, 1.0);
                                if (_GLF_DEAD(false)) {
                                    int donor_replacementGLF_dead25i = _GLF_FUZZED(-38475);
                                    int donor_replacementGLF_dead25j = _GLF_FUZZED(-16373);
                                    vec3 donor_replacementGLF_dead25m = _GLF_FUZZED(max((GLF_dead21stripe - vec3(5.4, -0.0, -6.5)), donor_replacementGLF_dead21col));
                                    vec2 donor_replacementGLF_dead25n = _GLF_FUZZED(vec2(3619.4780, 2.8));
                                    {
                                        vec2 GLF_dead25g = vec2(float(donor_replacementGLF_dead25j), float(donor_replacementGLF_dead25i));
                                        vec2 GLF_dead25o = mix(donor_replacementGLF_dead25n, GLF_dead25g, 0.2);
                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                            int donor_replacementGLF_dead29v = _GLF_FUZZED(donor_replacementGLF_dead25j);
                                            {
                                                donor_replacementGLF_dead29v /= 2;
                                            }
                                        }
                                        if (GLF_dead25injectionSwitch.x < (donor_replacementGLF_dead25m.x)) {
                                            int GLF_dead25k = 1;
                                            while (GLF_dead25k >= 0) {
                                                GLF_dead25o = GLF_dead25o + GLF_dead25o;
                                                GLF_dead25k--;
                                            }
                                            donor_replacementGLF_dead25m = vec3(GLF_dead25injectionSwitch.x, cos(GLF_dead25o));
                                        }
                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                            int donor_replacementGLF_dead27i = _GLF_FUZZED(82493);
                                            int donor_replacementGLF_dead27j = _GLF_FUZZED(GLF_dead3result);
                                            {
                                                donor_replacementGLF_dead27i++;
                                                GLF_dead27swap(donor_replacementGLF_dead27i, donor_replacementGLF_dead27j);
                                            }
                                        }
                                    }
                                }
                                if (_GLF_DEAD(false)) {
                                    int donor_replacementGLF_dead29v = _GLF_FUZZED(GLF_dead5N);
                                    {
                                        donor_replacementGLF_dead29v = 3 * donor_replacementGLF_dead29v + 1;
                                    }
                                }
                                return;
                            }
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            _GLF_color = tan(GLF_dead15gl_FragCoord);
                        }
                        {
                            GLF_dead12_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            {
                                break;
                            }
                        }
                        if (_GLF_DEAD(false)) {
                            _GLF_color = GLF_dead20gl_FragCoord;
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < _GLF_ZERO(0.0, injectionSwitch.x))))) {
                            int donor_replacementGLF_dead27i = _GLF_FUZZED(donor_replacementGLF_dead3i);
                            {
                                GLF_dead27obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead27i, 10)] = (10 - donor_replacementGLF_dead27i);
                                GLF_dead27obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead27i, 10)] = GLF_dead27obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead27i, 10)] * GLF_dead27obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead27i, 10)];
                            }
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        int donor_replacementGLF_dead29v = _GLF_FUZZED(floatBitsToInt(distance(((-3.1) / vec3(8.6, -4434.5456, -91.28)), vec3(-8088.9682, -8.0, 92.66))));
                        {
                            donor_replacementGLF_dead29v /= 2;
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            int donor_replacementGLF_dead29v = _GLF_FUZZED(donor_replacementGLF_dead3count);
                            {
                                donor_replacementGLF_dead29v = 3 * donor_replacementGLF_dead29v + 1;
                            }
                        }
                        _GLF_color = GLF_dead21_GLF_color;
                    }
                case 2:
                case 6:
                    if (_GLF_DEAD(false)) {
                        vec3 donor_replacementGLF_dead27color = _GLF_FUZZED(step(vec3(0.3, -7.0, -4.3), vec3(6625.7447, -8989.7718, 462.079)));
                        vec2 donor_replacementGLF_dead27uv = _GLF_FUZZED(fwidthCoarse(vec2(1183.5513, 9.9)));
                        if (abs(donor_replacementGLF_dead27uv.x - donor_replacementGLF_dead27uv.y) < 0.25) {
                            donor_replacementGLF_dead27color.x += float(GLF_dead27obj.numbers[9]);
                        }
                    }
                case 17:
                    if (_GLF_DEAD(false)) {
                        vec2 donor_replacementGLF_dead6coord = _GLF_FUZZED(vec2(vec4(1348.2792, 783.283, -29.35, -14.32)));
                        int donor_replacementGLF_dead6i = _GLF_FUZZED(abs(GLF_dead3result));
                        if (_GLF_DEAD(false)) {
                            bool donor_replacementGLF_dead21c1 = _GLF_FUZZED(((uvec4(189143u, 119526u, 179272u, 176497u) << uvec4(51402u, 95526u, 82129u, 22586u)) == uvec4(126835u, 111266u, 180938u, 12951u)));
                            bool donor_replacementGLF_dead21c2 = _GLF_FUZZED(true);
                            vec3 donor_replacementGLF_dead21col = _GLF_FUZZED(vec3(2.6, 0.0, -5.8));
                            if (_GLF_DEAD(false)) {
                                vec2 donor_replacementGLF_dead26coord = _GLF_FUZZED(texel.bb);
                                {
                                    uvec2 GLF_dead26icoord = uvec2(((donor_replacementGLF_dead26coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                                    uint GLF_dead26res1 = uint(((GLF_dead26icoord.x * GLF_dead26icoord.y) >> (GLF_dead26icoord.x & 31u)) & 0xffffffffu);
                                    uint GLF_dead26res2 = uint(((GLF_dead26icoord.x * GLF_dead26icoord.y) << (GLF_dead26icoord.x & 31u)) & 0xffffffffu);
                                    float GLF_dead26res = float(((GLF_dead26res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_dead26res1 & 1u) != 0u ? 1u : 0u));
                                    GLF_dead26_GLF_color = vec4(GLF_dead26res, GLF_dead26res, GLF_dead26res, 1.0);
                                }
                            }
                            vec2 donor_replacementGLF_dead21uv = _GLF_FUZZED((faceforward(dFdx(-51.47), GLF_dead10one, GLF_dead10one) + vec2(928.890, -57.05)));
                            if (!donor_replacementGLF_dead21c1 && donor_replacementGLF_dead21c2) {
                                if (_GLF_DEAD(false)) {
                                    float donor_replacementGLF_dead24th = _GLF_FUZZED(dot(GLF_dead21_GLF_color, ((-451.637) - GLF_dead12_GLF_color)));
                                    vec2 donor_replacementGLF_dead24v = _GLF_FUZZED(donor_replacementGLF_dead6coord);
                                    if (donor_replacementGLF_dead24v.y < 0.0) {
                                        donor_replacementGLF_dead24th = -donor_replacementGLF_dead24th;
                                    }
                                }
                                float GLF_dead21stripe = GLF_dead21compute_stripe(tan((donor_replacementGLF_dead21uv.x + donor_replacementGLF_dead21uv.y) * 20.0), donor_replacementGLF_dead21uv.x + donor_replacementGLF_dead21uv.y);
                                donor_replacementGLF_dead21col = mix(vec3(0.5, donor_replacementGLF_dead21uv.x, 0.1), vec3(.4, 0, .5), GLF_dead21stripe);
                                GLF_dead21_GLF_color = vec4(donor_replacementGLF_dead21col, 1.0);
                                return;
                            }
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            _GLF_color = vec4(467.115, 2719.4288, 33.56, 1726.0877);
                            if (_GLF_DEAD(false)) {
                                int donor_replacementGLF_dead29v = _GLF_FUZZED(((-20219) ^ GLF_dead5N));
                                {
                                    donor_replacementGLF_dead29v = 3 * donor_replacementGLF_dead29v + 1;
                                }
                            }
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            vec2 donor_replacementGLF_dead26coord = _GLF_FUZZED(GLF_dead25injectionSwitch);
                            if (donor_replacementGLF_dead26coord.x > 0.4) {
                                if (donor_replacementGLF_dead26coord.y < 0.6) {
                                    uvec2 GLF_dead26icoord = uvec2(((donor_replacementGLF_dead26coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                                    uint GLF_dead26res1 = uint(((GLF_dead26icoord.x * GLF_dead26icoord.y) >> (GLF_dead26icoord.x & 31u)) & 0xffffffffu);
                                    uint GLF_dead26res2 = uint(((GLF_dead26icoord.x * GLF_dead26icoord.y) << (GLF_dead26icoord.x & 31u)) & 0xffffffffu);
                                    float GLF_dead26res = float(((GLF_dead26res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_dead26res1 & 1u) != 0u ? 1u : 0u));
                                    GLF_dead26_GLF_color = vec4(GLF_dead26res, GLF_dead26res, GLF_dead26res, 1.0);
                                } else {
                                    ivec2 GLF_dead26icoord = ivec2(((donor_replacementGLF_dead26coord - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                                    int GLF_dead26res3 = ((GLF_dead26icoord.x >> 5) & 1) ^ ((GLF_dead26icoord.y & 32) >> 5);
                                    int GLF_dead26res2 = (GLF_dead26icoord.y * GLF_dead26icoord.y >> 10) & 1;
                                    int GLF_dead26res1 = (GLF_dead26icoord.x * GLF_dead26icoord.y >> 9) & 1;
                                    GLF_dead26_GLF_color = vec4(float(GLF_dead26res1 ^ GLF_dead26res2), float(GLF_dead26res2 & GLF_dead26res3), float(GLF_dead26res1 | GLF_dead26res3), 1.0);
                                }
                            } else {
                                ivec2 GLF_dead26icoord = ivec2(((donor_replacementGLF_dead26coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.6, 1.0)) * 256.0);
                                int GLF_dead26v = (GLF_dead26icoord.x ^ GLF_dead26icoord.y) * GLF_dead26icoord.y;
                                bool GLF_dead26res1 = ((GLF_dead26v >> 10) & 1) != 0;
                                bool GLF_dead26res2 = ((GLF_dead26v >> 11) & 4) != 0;
                                bool GLF_dead26res3 = ((GLF_dead26v >> 12) & 8) != 0;
                                GLF_dead26_GLF_color = vec4(GLF_dead26res1 ? 1.0 : 0.0, GLF_dead26res2 ? 1.0 : 0.0, GLF_dead26res3 ? 1.0 : 0.0, 1);
                            }
                        }
                        vec4 donor_replacementGLF_dead6texel = _GLF_FUZZED((texel * mat4x3(-2.5, 256.784, -349.383, -3051.5763, 5662.6523, 41.01, -1.1, 3883.3793, 918.954, 6.1, 0.3, 2599.2074)));
                        while (donor_replacementGLF_dead6texel.x + donor_replacementGLF_dead6texel.y + donor_replacementGLF_dead6texel.z > 1.0 && donor_replacementGLF_dead6i < 16) {
                            if (_GLF_DEAD(false)) {
                                _GLF_color = dFdyFine(vec4(-1.5, -34.49, -99.13, -340.026));
                            }
                            donor_replacementGLF_dead6coord = donor_replacementGLF_dead6texel.xz + donor_replacementGLF_dead6texel.yy;
                            donor_replacementGLF_dead6coord = floor(donor_replacementGLF_dead6coord * 256.0) / 256.0;
                            if (_GLF_DEAD(false)) {
                                if (donor_replacementGLF_dead3count < int(GLF_dead28gl_FragCoord.x)) {
                                    break;
                                }
                            }
                            if (_GLF_DEAD(false)) {
                                float donor_replacementGLF_dead24th = _GLF_FUZZED(ceil(GLF_dead10one));
                                {
                                    if (_GLF_DEAD(false)) {
                                        for (int GLF_dead27i = 0; GLF_dead27i < 10; GLF_dead27i++) {
                                            GLF_dead27obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead27i, 10)] = (10 - GLF_dead27i);
                                            GLF_dead27obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead27i, 10)] = GLF_dead27obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead27i, 10)] * GLF_dead27obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead27i, 10)];
                                        }
                                    }
                                    donor_replacementGLF_dead24th = 1.0 - donor_replacementGLF_dead24th;
                                }
                            }
                            if (_GLF_DEAD(false)) {
                                vec3 donor_replacementGLF_dead27color = _GLF_FUZZED(vec3(61.64, GLF_dead10one, -405.942));
                                {
                                    donor_replacementGLF_dead27color.x += float(GLF_dead27obj.numbers[9]);
                                }
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                {
                                    discard;
                                }
                            }
                            donor_replacementGLF_dead6texel = texture(GLF_dead6tex, donor_replacementGLF_dead6coord);
                            donor_replacementGLF_dead6i++;
                            if (_GLF_DEAD(false)) {
                                _GLF_color = GLF_dead15gl_FragCoord;
                            }
                        }
                        if (_GLF_DEAD(false)) {
                            vec2 donor_replacementGLF_dead26coord = _GLF_FUZZED(reuse);
                            {
                                uvec2 GLF_dead26icoord = uvec2(((donor_replacementGLF_dead26coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                                uint GLF_dead26res1 = uint(((GLF_dead26icoord.x * GLF_dead26icoord.y) >> (GLF_dead26icoord.x & 31u)) & 0xffffffffu);
                                uint GLF_dead26res2 = uint(((GLF_dead26icoord.x * GLF_dead26icoord.y) << (GLF_dead26icoord.x & 31u)) & 0xffffffffu);
                                float GLF_dead26res = float(((GLF_dead26res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_dead26res1 & 1u) != 0u ? 1u : 0u));
                                GLF_dead26_GLF_color = vec4(GLF_dead26res, GLF_dead26res, GLF_dead26res, 1.0);
                            }
                        }
                    }
                    if (_GLF_DEAD(_GLF_IDENTITY(false, !(!(false))))) {
                        vec3 donor_replacementGLF_dead13c = _GLF_FUZZED(pow(vec3(-91.07, 8218.1077, -3.2), roundEven(vec3(-9.4, -8542.7404, 6481.4236).yxy)));
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            float donor_replacementGLF_dead24th = _GLF_FUZZED(GLF_dead10one);
                            vec2 donor_replacementGLF_dead24v = _GLF_FUZZED(injectionSwitch);
                            if (donor_replacementGLF_dead24v.x < 0.0) {
                                donor_replacementGLF_dead24th = 1.0 - donor_replacementGLF_dead24th;
                            }
                        }
                        int donor_replacementGLF_dead13i = _GLF_FUZZED(donor_replacementGLF_dead3i);
                        {
                            if (_GLF_DEAD(false)) {
                                int donor_replacementGLF_dead23x = _GLF_FUZZED(GLF_dead5N);
                                int donor_replacementGLF_dead23y = _GLF_FUZZED(bitfieldExtract(GLF_dead5N, donor_replacementGLF_dead3i, donor_replacementGLF_dead3i));
                                if (donor_replacementGLF_dead23x * donor_replacementGLF_dead23x + donor_replacementGLF_dead23y * donor_replacementGLF_dead23y > 262144) {
                                    break;
                                }
                            }
                            if (donor_replacementGLF_dead13c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead13i, 3)] >= 1.0) {
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = round(_GLF_color);
                                }
                                donor_replacementGLF_dead13c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead13i, 3)] = donor_replacementGLF_dead13c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead13i, 3)] * donor_replacementGLF_dead13c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead13i, 3)];
                            }
                        }
                        if (_GLF_DEAD(false)) {
                            int donor_replacementGLF_dead22i = _GLF_FUZZED(donor_replacementGLF_dead13i);
                            int donor_replacementGLF_dead22iters = _GLF_FUZZED(donor_replacementGLF_dead3i);
                            int donor_replacementGLF_dead22v = _GLF_FUZZED(donor_replacementGLF_dead3i);
                            for (donor_replacementGLF_dead22i = 0; donor_replacementGLF_dead22i < donor_replacementGLF_dead22iters; donor_replacementGLF_dead22i++) {
                                donor_replacementGLF_dead22v = (4 * donor_replacementGLF_dead22v * (1000 - donor_replacementGLF_dead22v)) / 1000;
                            }
                            if (_GLF_DEAD(false)) {
                                float donor_replacementGLF_dead22result = _GLF_FUZZED(1929.4415);
                                {
                                    ;
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                        vec2 donor_replacementGLF_dead26coord = _GLF_FUZZED(vec2(-0.8, -235.712));
                                        {
                                            ivec2 GLF_dead26icoord = ivec2(((donor_replacementGLF_dead26coord - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                                            int GLF_dead26res3 = ((GLF_dead26icoord.x >> 5) & 1) ^ ((GLF_dead26icoord.y & 32) >> 5);
                                            int GLF_dead26res2 = (GLF_dead26icoord.y * GLF_dead26icoord.y >> 10) & 1;
                                            int GLF_dead26res1 = (GLF_dead26icoord.x * GLF_dead26icoord.y >> 9) & 1;
                                            GLF_dead26_GLF_color = vec4(float(GLF_dead26res1 ^ GLF_dead26res2), float(GLF_dead26res2 & GLF_dead26res3), float(GLF_dead26res1 | GLF_dead26res3), 1.0);
                                        }
                                    }
                                }
                            }
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            float donor_replacementGLF_dead24th = _GLF_FUZZED(994.873);
                            {
                                donor_replacementGLF_dead24th = 0.5 - donor_replacementGLF_dead24th;
                            }
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        for (int GLF_dead27i = 0; GLF_dead27i < 10; GLF_dead27i++) {
                            GLF_dead27obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead27i, 10)] = (10 - GLF_dead27i);
                            GLF_dead27obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead27i, 10)] = GLF_dead27obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead27i, 10)] * GLF_dead27obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead27i, 10)];
                        }
                    }
                case 13:
                    if (GLF_dead3result == donor_replacementGLF_dead3i) {
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                            _GLF_color = smoothstep(GLF_dead10one, -9576.0585, vec4(3.6, 96.77, -54.75, 4.8));
                        }
                        donor_replacementGLF_dead3count++;
                        if (_GLF_DEAD(false)) {
                            if (_GLF_DEAD(false)) {
                                int donor_replacementGLF_dead22v = _GLF_FUZZED(donor_replacementGLF_dead3count);
                                {
                                    donor_replacementGLF_dead22v = (4 * donor_replacementGLF_dead22v * (1000 - donor_replacementGLF_dead22v)) / 1000;
                                }
                            }
                            int donor_replacementGLF_dead4i = _GLF_FUZZED(GLF_dead3result);
                            if (_GLF_DEAD(false)) {
                                _GLF_color = GLF_dead15gl_FragCoord;
                            }
                            if (_GLF_DEAD(false)) {
                                _GLF_color = round(GLF_dead16_GLF_color);
                            }
                            if (_GLF_DEAD(false)) {
                                if (_GLF_DEAD(false)) {
                                    vec3 donor_replacementGLF_dead22c = _GLF_FUZZED(asinh(abs(vec3(97.22, 4595.0976, -734.569))));
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = pow(GLF_dead12_GLF_color, vec4(GLF_dead10one));
                                    }
                                    int donor_replacementGLF_dead22i = _GLF_FUZZED(int(true));
                                    if (donor_replacementGLF_dead22c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead22i, 3)] >= 1.0) {
                                        donor_replacementGLF_dead22c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead22i, 3)] = donor_replacementGLF_dead22c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead22i, 3)] * donor_replacementGLF_dead22c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead22i, 3)];
                                    }
                                }
                                _GLF_color = round(vec4(983.629, -5.0, -4.6, 5.4));
                            }
                            {
                                GLF_dead4obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4i, 10)] = (10 - donor_replacementGLF_dead4i);
                                GLF_dead4obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4i, 10)] = GLF_dead4obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4i, 10)] * GLF_dead4obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4i, 10)];
                            }
                        }
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < sqrt(0.0))))) {
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            if (_GLF_DEAD(false)) {
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = (GLF_dead10m34 * smoothstep(GLF_dead10one, float(185770u), texel));
                                }
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                    vec2 donor_replacementGLF_dead26coord = _GLF_FUZZED(dFdxCoarse(GLF_dead20injectionSwitch));
                                    {
                                        uvec2 GLF_dead26icoord = uvec2(((donor_replacementGLF_dead26coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                                        uint GLF_dead26res1 = uint(((GLF_dead26icoord.x * GLF_dead26icoord.y) >> (GLF_dead26icoord.x & 31u)) & 0xffffffffu);
                                        uint GLF_dead26res2 = uint(((GLF_dead26icoord.x * GLF_dead26icoord.y) << (GLF_dead26icoord.x & 31u)) & 0xffffffffu);
                                        float GLF_dead26res = float(((GLF_dead26res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_dead26res1 & 1u) != 0u ? 1u : 0u));
                                        GLF_dead26_GLF_color = vec4(GLF_dead26res, GLF_dead26res, GLF_dead26res, 1.0);
                                    }
                                }
                                {
                                    ;
                                }
                            }
                            _GLF_color = vec4(-5993.7519, 9.5, 2.8, 88.61);
                        }
                        bool donor_replacementGLF_dead5canwalk = _GLF_FUZZED((uvec4(86476u, 156018u, 77141u, 156466u)[0] > uint(false)));
                        int donor_replacementGLF_dead5i = _GLF_FUZZED(donor_replacementGLF_dead3count);
                        int donor_replacementGLF_dead5j = _GLF_FUZZED(clamp(donor_replacementGLF_dead3i, -21203, donor_replacementGLF_dead3i));
                        ivec2 donor_replacementGLF_dead5p = _GLF_FUZZED(ivec2(44471, -65062));
                        if (_GLF_DEAD(false)) {
                            _GLF_color = dFdxCoarse(_GLF_color);
                            if (_GLF_DEAD(false)) {
                                _GLF_color = reflect(GLF_dead16_GLF_color, GLF_dead13_GLF_color);
                            }
                        }
                        if (_GLF_DEAD(false)) {
                            int donor_replacementGLF_dead25i = _GLF_FUZZED(donor_replacementGLF_dead5j);
                            if (donor_replacementGLF_dead25i >= int(GLF_dead25resolution.x)) {
                                break;
                            }
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                            vec2 donor_replacementGLF_dead26coord = _GLF_FUZZED(GLF_dead25resolution);
                            if (donor_replacementGLF_dead26coord.y < 0.6) {
                                uvec2 GLF_dead26icoord = uvec2(((donor_replacementGLF_dead26coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                                uint GLF_dead26res1 = uint(((GLF_dead26icoord.x * GLF_dead26icoord.y) >> (GLF_dead26icoord.x & 31u)) & 0xffffffffu);
                                uint GLF_dead26res2 = uint(((GLF_dead26icoord.x * GLF_dead26icoord.y) << (GLF_dead26icoord.x & 31u)) & 0xffffffffu);
                                float GLF_dead26res = float(((GLF_dead26res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_dead26res1 & 1u) != 0u ? 1u : 0u));
                                GLF_dead26_GLF_color = vec4(GLF_dead26res, GLF_dead26res, GLF_dead26res, 1.0);
                            } else {
                                ivec2 GLF_dead26icoord = ivec2(((donor_replacementGLF_dead26coord - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                                int GLF_dead26res3 = ((GLF_dead26icoord.x >> 5) & 1) ^ ((GLF_dead26icoord.y & 32) >> 5);
                                int GLF_dead26res2 = (GLF_dead26icoord.y * GLF_dead26icoord.y >> 10) & 1;
                                int GLF_dead26res1 = (GLF_dead26icoord.x * GLF_dead26icoord.y >> 9) & 1;
                                GLF_dead26_GLF_color = vec4(float(GLF_dead26res1 ^ GLF_dead26res2), float(GLF_dead26res2 & GLF_dead26res3), float(GLF_dead26res1 | GLF_dead26res3), 1.0);
                            }
                        }
                        {
                            if (_GLF_DEAD(false)) {
                                int donor_replacementGLF_dead8i = _GLF_FUZZED((~5321));
                                vec4 donor_replacementGLF_dead8res = _GLF_FUZZED(vec4(978.485, 15.83, -855.224, 72.49));
                                float donor_replacementGLF_dead8uvstep = _GLF_FUZZED(smoothstep(3718.1478, -52.74, 0.0));
                                {
                                    if (_GLF_DEAD(false)) {
                                        int donor_replacementGLF_dead19iteration = _GLF_FUZZED(donor_replacementGLF_dead5j);
                                        {
                                            ;
                                            if (_GLF_DEAD(false)) {
                                                _GLF_color = _GLF_color;
                                            }
                                        }
                                    }
                                    for (int GLF_dead8j = 0; GLF_dead8j < 3; GLF_dead8j++) {
                                        donor_replacementGLF_dead8res += texture(GLF_dead8tex, reuse + vec2(float(donor_replacementGLF_dead8i - 1) * donor_replacementGLF_dead8uvstep, float(GLF_dead8j - 1) * donor_replacementGLF_dead8uvstep)) * GLF_dead8weights[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead8i * 3 + GLF_dead8j, 9)];
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                            int donor_replacementGLF_dead22i = _GLF_FUZZED(ivec3(-39232, 961, 3244).z);
                                            int donor_replacementGLF_dead22iters = _GLF_FUZZED(GLF_dead8j);
                                            int donor_replacementGLF_dead22v = _GLF_FUZZED(donor_replacementGLF_dead3i);
                                            for (donor_replacementGLF_dead22i = 0; donor_replacementGLF_dead22i < donor_replacementGLF_dead22iters; donor_replacementGLF_dead22i++) {
                                                donor_replacementGLF_dead22v = (4 * donor_replacementGLF_dead22v * (1000 - donor_replacementGLF_dead22v)) / 1000;
                                            }
                                            if (_GLF_DEAD(false)) {
                                                _GLF_color = dFdxCoarse(exp2(_GLF_color));
                                            }
                                        }
                                    }
                                }
                                if (_GLF_DEAD(false)) {
                                    float donor_replacementGLF_dead13result = _GLF_FUZZED(donor_replacementGLF_dead8uvstep);
                                    {
                                        donor_replacementGLF_dead13result += 0.4;
                                    }
                                }
                            }
                            donor_replacementGLF_dead5p.x = donor_replacementGLF_dead5j * 2;
                            donor_replacementGLF_dead5p.y = donor_replacementGLF_dead5i * 2;
                            donor_replacementGLF_dead5canwalk = true;
                        }
                        if (_GLF_DEAD(false)) {
                            vec2 donor_replacementGLF_dead26coord = _GLF_FUZZED(GLF_dead25resolution);
                            if (donor_replacementGLF_dead26coord.x > 0.4) {
                                if (donor_replacementGLF_dead26coord.y < 0.6) {
                                    uvec2 GLF_dead26icoord = uvec2(((donor_replacementGLF_dead26coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                                    uint GLF_dead26res1 = uint(((GLF_dead26icoord.x * GLF_dead26icoord.y) >> (GLF_dead26icoord.x & 31u)) & 0xffffffffu);
                                    uint GLF_dead26res2 = uint(((GLF_dead26icoord.x * GLF_dead26icoord.y) << (GLF_dead26icoord.x & 31u)) & 0xffffffffu);
                                    float GLF_dead26res = float(((GLF_dead26res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_dead26res1 & 1u) != 0u ? 1u : 0u));
                                    GLF_dead26_GLF_color = vec4(GLF_dead26res, GLF_dead26res, GLF_dead26res, 1.0);
                                } else {
                                    ivec2 GLF_dead26icoord = ivec2(((donor_replacementGLF_dead26coord - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                                    int GLF_dead26res3 = ((GLF_dead26icoord.x >> 5) & 1) ^ ((GLF_dead26icoord.y & 32) >> 5);
                                    int GLF_dead26res2 = (GLF_dead26icoord.y * GLF_dead26icoord.y >> 10) & 1;
                                    int GLF_dead26res1 = (GLF_dead26icoord.x * GLF_dead26icoord.y >> 9) & 1;
                                    GLF_dead26_GLF_color = vec4(float(GLF_dead26res1 ^ GLF_dead26res2), float(GLF_dead26res2 & GLF_dead26res3), float(GLF_dead26res1 | GLF_dead26res3), 1.0);
                                }
                            } else {
                                ivec2 GLF_dead26icoord = ivec2(((donor_replacementGLF_dead26coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.6, 1.0)) * 256.0);
                                int GLF_dead26v = (GLF_dead26icoord.x ^ GLF_dead26icoord.y) * GLF_dead26icoord.y;
                                bool GLF_dead26res1 = ((GLF_dead26v >> 10) & 1) != 0;
                                bool GLF_dead26res2 = ((GLF_dead26v >> 11) & 4) != 0;
                                bool GLF_dead26res3 = ((GLF_dead26v >> 12) & 8) != 0;
                                GLF_dead26_GLF_color = vec4(GLF_dead26res1 ? 1.0 : 0.0, GLF_dead26res2 ? 1.0 : 0.0, GLF_dead26res3 ? 1.0 : 0.0, 1);
                            }
                        }
                    }
                    break;
                default:
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        if (_GLF_DEAD(false)) {
                            vec2 donor_replacementGLF_dead26coord = _GLF_FUZZED(fwidthCoarse(uintBitsToFloat(uvec2(197556u, 187869u))));
                            {
                                ivec2 GLF_dead26icoord = ivec2(((donor_replacementGLF_dead26coord - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                                int GLF_dead26res3 = ((GLF_dead26icoord.x >> 5) & 1) ^ ((GLF_dead26icoord.y & 32) >> 5);
                                int GLF_dead26res2 = (GLF_dead26icoord.y * GLF_dead26icoord.y >> 10) & 1;
                                int GLF_dead26res1 = (GLF_dead26icoord.x * GLF_dead26icoord.y >> 9) & 1;
                                GLF_dead26_GLF_color = vec4(float(GLF_dead26res1 ^ GLF_dead26res2), float(GLF_dead26res2 & GLF_dead26res3), float(GLF_dead26res1 | GLF_dead26res3), 1.0);
                            }
                        }
                        _GLF_color = sign(vec4(5540.7478, -75.96, -7895.6102, 3476.9616));
                    }
                    if (GLF_dead3result == -1) {
                        donor_replacementGLF_dead3count++;
                        if (_GLF_DEAD(false)) {
                            _GLF_color = GLF_dead25gl_FragCoord;
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_ZERO(0.0, injectionSwitch.x))))) {
                            vec2 donor_replacementGLF_dead8coord = _GLF_FUZZED(reuse);
                            vec4 donor_replacementGLF_dead8res = _GLF_FUZZED(vec4(-6.9, 9115.9002, 6.3, -27.31));
                            if (_GLF_DEAD(false)) {
                                vec3 donor_replacementGLF_dead21col = _GLF_FUZZED((texel - log2(vec3(4.8, -8.3, 3717.4900))));
                                vec2 donor_replacementGLF_dead21uv = _GLF_FUZZED(inversesqrt(donor_replacementGLF_dead8coord));
                                {
                                    float GLF_dead21stripe = GLF_dead21compute_stripe(cos((donor_replacementGLF_dead21uv.x + donor_replacementGLF_dead21uv.y) * 20.0), donor_replacementGLF_dead21uv.x + donor_replacementGLF_dead21uv.y);
                                    donor_replacementGLF_dead21col = mix(vec3(.7, sinh(donor_replacementGLF_dead21uv.x), donor_replacementGLF_dead21uv.x), vec3(.3, .5, donor_replacementGLF_dead21uv.x), GLF_dead21stripe);
                                    GLF_dead21_GLF_color = vec4(donor_replacementGLF_dead21col, 1.0);
                                    return;
                                }
                            }
                            float donor_replacementGLF_dead8uvstep = _GLF_FUZZED(-315.643);
                            for (int GLF_dead8i = 0; GLF_dead8i < 3; GLF_dead8i++) {
                                for (int GLF_dead8j = 0; GLF_dead8j < 3; GLF_dead8j++) {
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                        vec3 donor_replacementGLF_dead21col = _GLF_FUZZED(vec3(6.9, -4.5, 344.778));
                                        vec2 donor_replacementGLF_dead21uv = _GLF_FUZZED(dFdxFine(injectionSwitch));
                                        {
                                            float GLF_dead21stripe = GLF_dead21compute_stripe(tan((donor_replacementGLF_dead21uv.x + donor_replacementGLF_dead21uv.y) * 20.0), donor_replacementGLF_dead21uv.x + donor_replacementGLF_dead21uv.y);
                                            donor_replacementGLF_dead21col = mix(vec3(donor_replacementGLF_dead21uv.x, .8, 0), vec3(1, donor_replacementGLF_dead21uv.y, 0), GLF_dead21stripe);
                                            GLF_dead21_GLF_color = vec4(donor_replacementGLF_dead21col, 1.0);
                                            return;
                                        }
                                    }
                                    donor_replacementGLF_dead8res += texture(GLF_dead8tex, donor_replacementGLF_dead8coord + vec2(float(GLF_dead8i - 1) * donor_replacementGLF_dead8uvstep, float(GLF_dead8j - 1) * donor_replacementGLF_dead8uvstep)) * GLF_dead8weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead8i * 3 + GLF_dead8j, 9)];
                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                        vec2 donor_replacementGLF_dead16coord = _GLF_FUZZED(injectionSwitch);
                                        if (donor_replacementGLF_dead16coord.y < 0.6) {
                                            uvec2 GLF_dead16icoord = uvec2(((donor_replacementGLF_dead16coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                                            uint GLF_dead16res1 = uint(((GLF_dead16icoord.x * GLF_dead16icoord.y) >> (GLF_dead16icoord.x & 31u)) & 0xffffffffu);
                                            if (_GLF_DEAD(false)) {
                                                int donor_replacementGLF_dead23c_im = _GLF_FUZZED(donor_replacementGLF_dead3count);
                                                int donor_replacementGLF_dead23c_re = _GLF_FUZZED(2473);
                                                int donor_replacementGLF_dead23iteration = _GLF_FUZZED(36398);
                                                int donor_replacementGLF_dead23x = _GLF_FUZZED(GLF_dead8i);
                                                int donor_replacementGLF_dead23y = _GLF_FUZZED(donor_replacementGLF_dead3count);
                                                {
                                                    if (donor_replacementGLF_dead23x * donor_replacementGLF_dead23x + donor_replacementGLF_dead23y * donor_replacementGLF_dead23y > 262144) {
                                                        break;
                                                        if (_GLF_DEAD(false)) {
                                                            vec3 donor_replacementGLF_dead27color = _GLF_FUZZED(refract(vec3(-4.3, -5632.1665, 7.4), vec3(-72.54, 31.04, -704.505), float(GLF_dead16res1)));
                                                            {
                                                                donor_replacementGLF_dead27color.x += float(GLF_dead27obj.numbers[5]);
                                                            }
                                                        }
                                                    }
                                                    int GLF_dead23x_new = ((donor_replacementGLF_dead23x * donor_replacementGLF_dead23x - donor_replacementGLF_dead23y * donor_replacementGLF_dead23y) / 256 + donor_replacementGLF_dead23c_re);
                                                    donor_replacementGLF_dead23y = (2 * donor_replacementGLF_dead23x * donor_replacementGLF_dead23y / 256 + donor_replacementGLF_dead23c_im);
                                                    if (_GLF_DEAD(false)) {
                                                        _GLF_color = GLF_dead20gl_FragCoord;
                                                    }
                                                    donor_replacementGLF_dead23x = GLF_dead23x_new;
                                                    donor_replacementGLF_dead23iteration++;
                                                }
                                            }
                                            uint GLF_dead16res2 = uint(((GLF_dead16icoord.x * GLF_dead16icoord.y) << (GLF_dead16icoord.x & 31u)) & 0xffffffffu);
                                            float GLF_dead16res = float(((GLF_dead16res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_dead16res1 & 1u) != 0u ? 1u : 0u));
                                            if (_GLF_DEAD(false)) {
                                                vec2 donor_replacementGLF_dead24a = _GLF_FUZZED(donor_replacementGLF_dead16coord);
                                                float donor_replacementGLF_dead24z = _GLF_FUZZED(dFdx(donor_replacementGLF_dead8uvstep));
                                                {
                                                    donor_replacementGLF_dead24z = donor_replacementGLF_dead24a.x / donor_replacementGLF_dead24a.y;
                                                }
                                            }
                                            GLF_dead16_GLF_color = vec4(GLF_dead16res, GLF_dead16res, GLF_dead16res, 1.0);
                                        } else {
                                            ivec2 GLF_dead16icoord = ivec2(((donor_replacementGLF_dead16coord - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                                            int GLF_dead16res3 = ((GLF_dead16icoord.x >> 5) & 1) ^ ((GLF_dead16icoord.y & 32) >> 5);
                                            int GLF_dead16res2 = (GLF_dead16icoord.y * GLF_dead16icoord.y >> 10) & 1;
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                int donor_replacementGLF_dead22i = _GLF_FUZZED((donor_replacementGLF_dead3i & donor_replacementGLF_dead3count));
                                                float donor_replacementGLF_dead22result = _GLF_FUZZED(-8.5);
                                                float donor_replacementGLF_dead22thirty_two = _GLF_FUZZED(89.83);
                                                {
                                                    if (mod(float(donor_replacementGLF_dead22i), round(donor_replacementGLF_dead22thirty_two)) <= 0.01) {
                                                        donor_replacementGLF_dead22result += 100.0;
                                                    }
                                                }
                                            }
                                            int GLF_dead16res1 = (GLF_dead16icoord.x * GLF_dead16icoord.y >> 9) & 1;
                                            GLF_dead16_GLF_color = vec4(float(GLF_dead16res1 ^ GLF_dead16res2), float(GLF_dead16res2 & GLF_dead16res3), float(GLF_dead16res1 | GLF_dead16res3), 1.0);
                                        }
                                    }
                                }
                            }
                        }
                    }
                    break;
            }
        }
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
        if (_GLF_DEAD(false)) {
            _GLF_color = GLF_dead16_GLF_color;
        }
        _GLF_color = pow(exp(cos(vec4(1.6, -2.3, 37.22, -7.8))), _GLF_color);
        if (_GLF_DEAD(false)) {
            vec3 donor_replacementGLF_dead27color = _GLF_FUZZED(vec3(-43.18, 24.21, 3.5));
            {
                donor_replacementGLF_dead27color.y += float(GLF_dead27obj.numbers[2]);
            }
        }
    }
}
