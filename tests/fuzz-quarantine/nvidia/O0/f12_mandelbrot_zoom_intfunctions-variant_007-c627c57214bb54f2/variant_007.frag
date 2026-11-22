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

layout(set = 0, binding = 1) uniform buf1 {
    vec2 injectionSwitch;
};

int GLF_dead18MATRIX_N = 4;
vec4 GLF_dead17gl_FragCoord = _GLF_FUZZED((vec4(-4.4, -58.57, 5.3, -2.9) * vec4(-632.678, -3.9, -1985.3834, 772.338)));

layout(set = 0, binding = 2) uniform buf2 {
    vec2 GLF_dead17injectionSwitch;
};

layout(set = 0, binding = 3) uniform buf3 {
    vec2 GLF_dead17resolution;
};

const int GLF_dead17N = 10;
int GLF_dead17data[10] = int[10](_GLF_FUZZED(-77705), _GLF_FUZZED(74520), _GLF_FUZZED(-66585), _GLF_FUZZED(((-88592) & (-24496))), _GLF_FUZZED((false ? (-76883) : (85099 & (-40245)))), _GLF_FUZZED(80821), _GLF_FUZZED(ivec2(52118, 52397).g), _GLF_FUZZED(-11301), _GLF_FUZZED(55592), _GLF_FUZZED((-32801))), GLF_dead17temp[10] = int[10](_GLF_FUZZED(-48561), _GLF_FUZZED(61903), _GLF_FUZZED(-4287), _GLF_FUZZED((3083 - 72695)), _GLF_FUZZED((6775 - 31500)), _GLF_FUZZED(int(115210u)), _GLF_FUZZED((ivec2(51356, -31705) & ivec2(-7806, 51149)).gg.t), _GLF_FUZZED(((-62911) + (-29573))), _GLF_FUZZED(29923), _GLF_FUZZED(-55890));

void GLF_dead17merge(int GLF_dead17from, int GLF_dead17mid, int GLF_dead17to) {
    int GLF_dead17k = GLF_dead17from, GLF_dead17i = GLF_dead17from, GLF_dead17j = GLF_dead17mid + 1;
    while (GLF_dead17i <= GLF_dead17mid && GLF_dead17j <= GLF_dead17to) {
        if (GLF_dead17data[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17i, 10)] < GLF_dead17data[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17j, 10)]) {
            GLF_dead17temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17k++, 10)] = GLF_dead17data[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17i++, 10)];
        } else {
            GLF_dead17temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17k++, 10)] = GLF_dead17data[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17j++, 10)];
        }
    }
    while (GLF_dead17i < GLF_dead17N && GLF_dead17i <= GLF_dead17mid) {
        GLF_dead17temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17k++, 10)] = GLF_dead17data[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17i++, 10)];
    }
    for (int GLF_dead17i = GLF_dead17from; GLF_dead17i <= GLF_dead17to; GLF_dead17i++) {
        GLF_dead17data[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17i, 10)] = GLF_dead17temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead17i, 10)];
    }
}

layout(set = 0, binding = 4) uniform sampler2D GLF_live11tex;
layout(set = 0, binding = 5) uniform sampler2D GLF_live14tex;
vec4 GLF_live7_GLF_color = _GLF_FUZZED(vec4((vec3(5369.9892, -73.15, -3.7) - 3.5), 2.8));

layout(set = 0, binding = 6) uniform buf6 {
    vec3 GLF_live7polynomial;
};

float GLF_live7fx(float GLF_live7x) {
    return GLF_live7polynomial.x * (GLF_live7x * GLF_live7x) + GLF_live7polynomial.y * GLF_live7x + GLF_live7polynomial.z;
}

layout(set = 0, binding = 7) uniform buf7 {
    vec2 GLF_live9injectionSwitch;
};

struct GLF_live9QuicksortObject {
    int numbers[10];
};

GLF_live9QuicksortObject GLF_live9obj = GLF_live9QuicksortObject(int[10](0, 0, 0, 0, 0, 0, 0, 0, 0, 0));

void GLF_live9swap(int GLF_live9i, int GLF_live9j) {
    int GLF_live9temp = GLF_live9obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9i, 10)];
    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
        int donor_replacementGLF_dead15v = _GLF_FUZZED(findMSB((GLF_live9j << (-69744))));
        {
            donor_replacementGLF_dead15v = 3 * donor_replacementGLF_dead15v + 1;
        }
    }
    GLF_live9obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9i, 10)] = GLF_live9obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9j, 10)];
    GLF_live9obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9j, 10)] = GLF_live9temp;
    {
        vec2 GLF_live11coord = _GLF_FUZZED(vec2(2.5, -3302.7862));
        int GLF_live11i = _GLF_FUZZED(-54009);
        vec4 GLF_live11texel = _GLF_FUZZED((vec4(vec3(8.1, 1.9, -80.26), -9.8) - (-5918.4434)));
        {
            int GLF_live11looplimiter0 = 0;
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                while (GLF_live11texel.x + GLF_live11texel.y + GLF_live11texel.z > 1.0 && GLF_live11i < 16) {
                    if (GLF_live11looplimiter0 >= 7) {
                        break;
                    }
                    GLF_live11looplimiter0++;
                    {
                        GLF_live11coord = GLF_live11texel.xz + GLF_live11texel.yy;
                        GLF_live11coord = floor(GLF_live11coord * 256.0) / 256.0;
                        GLF_live11texel = texture(GLF_live11tex, GLF_live11coord);
                        GLF_live11i++;
                    }
                }
            } else {
            }
        }
    }
}

vec3 GLF_live9palette(vec3 GLF_live9a, vec3 GLF_live9b, vec3 GLF_live9c, vec3 GLF_live9d) {
    return fract(mix(GLF_live9d * GLF_live9a, GLF_live9a * GLF_live9c, GLF_live9b + GLF_live9d - GLF_live9c));
}

const vec4 GLF_dead6pal[16] = vec4[16](vec4(0.0, 0.0, 0.0, 1.0), vec4(0.5, 0.0, 0.0, 1.0), vec4(0.0, 0.5, 0.0, 1.0), vec4(0.5, 0.5, 0.0, 1.0), vec4(0.0, 0.0, 0.5, 1.0), vec4(0.5, 0.0, 0.5, 1.0), vec4(0.0, 0.5, 0.5, 1.0), vec4(0.5, 0.5, 0.5, _GLF_IDENTITY(1.0, 0.0 + (1.0))), vec4(0.0, _GLF_IDENTITY(0.0, 1.0 * (0.0)), 0.0, 1.0), vec4(1.0, 0.0, 0.0, 1.0), vec4(0.0, _GLF_IDENTITY(1.0, mix(float(1.0), float(_GLF_FUZZED(237.664)), bool(false))), 0.0, 1.0), vec4(1.0, 1.0, 0.0, 1.0), vec4(0.0, 0.0, 1.0, 1.0), vec4(_GLF_IDENTITY(1.0, min(1.0, 1.0)), 0.0, 1.0, 1.0), vec4(0.0, 1.0, 1.0, 1.0), vec4(1.0, 1.0, 1.0, 1.0));
const vec4 GLF_dead6picdata[8] = vec4[8](vec4(4, 4, 20, 4), vec4(4, 4, 4, 20), vec4(4, 20, 20, 4), vec4(20, 4, 4, 8), vec4(8, 6, 4, 2), vec4(2, 12, 2, 4), vec4(16, 2, 4, _GLF_IDENTITY(4, (true ? _GLF_IDENTITY(4, (4) ^ (0 | 0)) : _GLF_FUZZED(-20049)))), vec4(12, 22, 4, 4));

layout(set = 0, binding = 8) uniform buf8 {
    float GLF_dead5one;
};

mat2 GLF_dead5m22 = _GLF_FUZZED(mat2(7053.6051, -4.8, -9372.6181, 198.247));
mat2x3 GLF_dead5m23 = _GLF_FUZZED(mat2x3(2.6, 1799.9196, -9.7, 9637.8574, 4547.9773, 277.048));
mat2x4 GLF_dead5m24 = _GLF_FUZZED(mat2x4(72.47));
mat3x2 GLF_dead5m32 = _GLF_FUZZED(mat3x2(-514.908, 2.5, -3035.9694, 6.5, 47.81, -8.2));
mat3 GLF_dead5m33 = _GLF_FUZZED((mat4x3(-111.767, 31.57, 3803.0046, 1.4, 9.5, -3.8, -7.1, 5.3, -3.8, 5.1, 5.7, _GLF_IDENTITY(370.776, (370.776) / 1.0)) * mat3x4(mat2x4(20.34, 0.8, -43.41, -4.1, -4.0, -8219.9881, -2.7, 1716.1713))));
mat3x4 GLF_dead5m34 = _GLF_FUZZED(mat3x4(2.2, -103.762, -5726.5489, 21.45, -3.6, -18.19, -3.3, -206.206, -8362.3354, 787.379, 3.1, 2324.4057));
mat4x2 GLF_dead5m42 = _GLF_FUZZED(mat4x2((-mat2x3(_GLF_IDENTITY(140.590, mix(float(_GLF_FUZZED(9.3)), float(140.590), bool(true))), _GLF_IDENTITY(-2.7, clamp(-2.7, -2.7, -2.7)), -620.446, 4716.7392, 5436.3047, 19.34))));
mat4x3 GLF_dead5m43 = _GLF_FUZZED(mat4x3(877.127, -378.624, _GLF_IDENTITY(-73.46, float(mat3(_GLF_IDENTITY(-73.46, mix(float(_GLF_FUZZED(66.76)), float(-73.46), bool(true))), 0.0, round(length(normalize(1.0))), 1.0, 0.0, 0.0, 0.0, 0.0, sqrt(0.0)))), 5.6, -670.761, -9.7, _GLF_IDENTITY(9873.4008, clamp(9873.4008, 9873.4008, _GLF_IDENTITY(9873.4008, _GLF_IDENTITY(float(mat4(9873.4008, 1.0, 1.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0, _GLF_IDENTITY(dot(vec4(0.0, 1.0, 0.0, 0.0), vec4(0.0, 1.0, 0.0, 0.0)), dot(vec4(0.0, 1.0, 0.0, 0.0), vec4(0.0, 1.0, 0.0, 0.0))), 0.0, 0.0, 1.0, 1.0, 1.0, 0.0)), mix(float(float(mat4(9873.4008, 1.0, 1.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0, _GLF_IDENTITY(dot(vec4(0.0, 1.0, 0.0, 0.0), vec4(0.0, 1.0, 0.0, 0.0)), dot(vec4(0.0, 1.0, 0.0, 0.0), vec4(0.0, 1.0, 0.0, 0.0))), 0.0, 0.0, 1.0, 1.0, 1.0, 0.0))), float(_GLF_FUZZED(-3.2)), bool(false)))))), -283.844, 333.422, 6.7, -247.240, 96.34));
mat4 GLF_dead5m44 = _GLF_FUZZED((mat4(-105.423, 0.0, -5.2, -876.294, 8.5, 2.2, 20.56, -693.681, 8436.8083, 95.97, -681.942, 7.6, 178.446, 0.2, 3.4, 1.6) - 653.543));
layout(set = 0, binding = 9) uniform sampler2D GLF_live0tex;
layout(location = 0) out vec4 _GLF_color;

layout(set = 0, binding = 0) uniform buf0 {
    vec2 resolution;
};

vec3 pickColor(int i) {
    return vec3(float(i) / 50.0, float(_GLF_IDENTITY(i, 0 ^ (i))) / 120.0, float(i) / 140.0);
    {
        vec2 GLF_live14coord = _GLF_FUZZED(((-7.6) - vec2(-5310.9873, 759.965)));
        float GLF_live14h = _GLF_FUZZED((30.27));
        if (_GLF_DEAD(false)) {
            {
                discard;
            }
        }
        int GLF_live14i = _GLF_FUZZED(int((mat3(5.4, -5067.5871, 5326.8142, -69.59, 83.70, -2195.5398, 935.842, 4.2, 1.5) == mat3(-1.0, -568.031, 0.3, -8.7, -448.509, -890.088, -466.920, 0.8, 64.13))));
        float GLF_live14refh = _GLF_FUZZED(3156.0398);
        float GLF_live14slope = _GLF_FUZZED(-9556.6192);
        vec2 GLF_live14uvstep = _GLF_FUZZED(vec2(6310.8597, 4.1));
        {
            if (_GLF_WRAPPED_IF_FALSE(false)) {
            } else {
                GLF_live14coord -= GLF_live14uvstep;
            }
            do {
                if (_GLF_DEAD(false)) {
                    float donor_replacementGLF_dead18beta = _GLF_FUZZED((-GLF_live14h));
                    int donor_replacementGLF_dead18k = _GLF_FUZZED(ivec4(-78558, 85620, -89382, 16329).s);
                    vec4 donor_replacementGLF_dead18matrix_b = _GLF_FUZZED(vec4(7747.5079, -2.2, -978.465, -5.2));
                    vec4 donor_replacementGLF_dead18matrix_u = _GLF_FUZZED(GLF_live7_GLF_color);
                    for (int GLF_dead18b = GLF_dead18MATRIX_N - 1; GLF_dead18b >= donor_replacementGLF_dead18k; GLF_dead18b--) {
                        donor_replacementGLF_dead18matrix_b[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead18b, 4)] = donor_replacementGLF_dead18matrix_b[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead18b, 4)] - (donor_replacementGLF_dead18beta * donor_replacementGLF_dead18matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead18b, 4)]);
                    }
                }
                GLF_live14refh += GLF_live14slope;
            } while (_GLF_WRAPPED_LOOP(false));
            if (_GLF_DEAD(false)) {
                vec2 donor_replacementGLF_dead17color = _GLF_FUZZED((injectionSwitch + dFdyCoarse(GLF_live14h)));
                vec3 donor_replacementGLF_dead17vecCoor = _GLF_FUZZED(vec3(2499.0757, -8852.0413, -971.546));
                {
                    donor_replacementGLF_dead17color = fract(sin(donor_replacementGLF_dead17vecCoor.yx - trunc(float(GLF_dead17data[0]))));
                    donor_replacementGLF_dead17color[0] = dFdy(GLF_dead17gl_FragCoord.y);
                    ;
                }
            }
            GLF_live14h = texture(GLF_live14tex, GLF_live14coord).y;
            GLF_live14i++;
        }
    }
}

vec3 mand(float xCoord, float yCoord) {
    float height = resolution.y;
    float width = resolution.x;
    float xpos = xCoord * 0.1 + (resolution.x * 0.6);
    float ypos = yCoord * 0.1 + (resolution.y * 0.4);
    float c_re = 0.8 * (xpos - _GLF_IDENTITY(width, clamp(_GLF_IDENTITY(width, max(width, width)), _GLF_IDENTITY(width, (width) + 0.0), width)) / 2.0) * 4.0 / width - _GLF_IDENTITY(0.4, min(0.4, 0.4));
    float c_im = 0.8 * (ypos - height / 2.0) * 4.0 / width;
    float x = 0.0, y = 0.0;
    if (_GLF_IDENTITY(0.0, max(0.0, 0.0)) > resolution.x) {
        x = 1.0;
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            y = 1.0;
        } else {
        }
    }
    int iteration = bitfieldReverse(int(x));
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
        do {
            {
                ;
            }
        } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))));
        {
            ;
        }
    }
    int k = bitfieldExtract(int(y), bitCount(int(x)), int(_GLF_IDENTITY(y, _GLF_IDENTITY(float(mat3(y, 1.0, 0.0, 1.0, exp(0.0), 1.0, log(1.0), 0.0, log(1.0))), mix(float(_GLF_FUZZED(37.43)), float(float(mat3(y, 1.0, 0.0, 1.0, exp(0.0), 1.0, log(1.0), _GLF_IDENTITY(0.0, float(vec2(_GLF_IDENTITY(0.0, float(mat2x4(0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 1.0))), sin(0.0)))), log(1.0)))), bool(true))))));
    int iterationCap = 1000;
    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= sin(0.0))))) {
        do {
            if (x * x + y * y > 4.0) {
                break;
            }
            float x_new = x * x - y * y + c_re;
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= determinant(mat2(0.0, 0.0, round(length(normalize(vec2(1.0, 1.0)))), 0.0)))))) {
                vec2 GLF_live0coord = _GLF_FUZZED((589.131 * vec2(911.311, -7.7)));
                if (_GLF_DEAD(false)) {
                    int donor_replacementGLF_dead4i = _GLF_FUZZED(iteration);
                    float donor_replacementGLF_dead4limit = _GLF_FUZZED(yCoord);
                    float donor_replacementGLF_dead4s = _GLF_FUZZED(xCoord);
                    if (_GLF_IDENTITY(float(donor_replacementGLF_dead4i) >= donor_replacementGLF_dead4limit, _GLF_FALSE(false, (gl_FragCoord.y < 0.0)) || (float(donor_replacementGLF_dead4i) >= donor_replacementGLF_dead4limit))) {
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            int donor_replacementGLF_dead18j = _GLF_FUZZED((iteration));
                            int donor_replacementGLF_dead18k = _GLF_FUZZED(donor_replacementGLF_dead4i);
                            mat4 donor_replacementGLF_dead18matrix_a = _GLF_FUZZED((135178u, GLF_dead5m44));
                            vec4 donor_replacementGLF_dead18matrix_u = _GLF_FUZZED(resolution.tstt);
                            for (int GLF_dead18a = GLF_dead18MATRIX_N - 1; GLF_dead18a >= donor_replacementGLF_dead18k; GLF_dead18a--) {
                                yCoord += donor_replacementGLF_dead18matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead18a, 4)] * donor_replacementGLF_dead18matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead18a, 4)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead18j, 4)];
                            }
                        }
                        {
                            float GLF_live7x2 = _GLF_FUZZED((8.4 * vec2(6.4, -8.0)).x);
                            if (GLF_live7x2 <= -0.9 && GLF_live7x2 >= -1.1) {
                                GLF_live7_GLF_color = vec4(_GLF_IDENTITY(1.0, (1.0) - 0.0), 0.0, 0.0, 1.0);
                                {
                                    vec2 GLF_live11coord = _GLF_FUZZED((89.06 * vec2(8.6, 9.2)));
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < _GLF_ZERO(0.0, injectionSwitch.x))))) {
                                        vec2 donor_replacementGLF_dead17color = _GLF_FUZZED(GLF_live11coord);
                                        int donor_replacementGLF_dead17i = _GLF_FUZZED(((-52129) / iterationCap));
                                        vec3 donor_replacementGLF_dead17vecCoor = _GLF_FUZZED(vec3(-4.2, -14.26, -91.55));
                                        if (int(GLF_dead17gl_FragCoord[1]) < 120) {
                                            donor_replacementGLF_dead17color = fract(acosh(clamp(donor_replacementGLF_dead17vecCoor.yx - trunc(float(GLF_dead17data[3])), 1.0, 1000.0)));
                                            donor_replacementGLF_dead17color.x += (isnan(GLF_dead17gl_FragCoord.x) ? log2(GLF_dead17gl_FragCoord.x) : log2(GLF_dead17gl_FragCoord.y));
                                            break;
                                        } else if (int(GLF_dead17gl_FragCoord[1]) < 150) {
                                            discard;
                                        } else if (int(GLF_dead17gl_FragCoord[1]) < 180) {
                                            donor_replacementGLF_dead17color = fract(sin(donor_replacementGLF_dead17vecCoor.yx - trunc(float(GLF_dead17data[4]))));
                                            donor_replacementGLF_dead17color[1] += asinh(GLF_dead17gl_FragCoord.y * ldexp(donor_replacementGLF_dead17color.y, -donor_replacementGLF_dead17i));
                                            break;
                                        } else if (int(GLF_dead17gl_FragCoord[1]) < 210) {
                                            donor_replacementGLF_dead17color = fract(sin(donor_replacementGLF_dead17vecCoor.yx - trunc(float(GLF_dead17data[5]))));
                                            donor_replacementGLF_dead17color.y -= tanh(donor_replacementGLF_dead17color.x) / cosh(donor_replacementGLF_dead17color.y);
                                            break;
                                        } else if (int(GLF_dead17gl_FragCoord[1]) < 240) {
                                            donor_replacementGLF_dead17color = fract(asinh(donor_replacementGLF_dead17vecCoor.yx - trunc(float(GLF_dead17data[6]))));
                                            donor_replacementGLF_dead17color.y -= isnan(float(donor_replacementGLF_dead17i)) ? tanh(GLF_dead17gl_FragCoord.x) : atanh(GLF_dead17gl_FragCoord.y / GLF_dead17resolution.y);
                                            break;
                                        } else if (int(GLF_dead17gl_FragCoord[1]) < 270) {
                                            donor_replacementGLF_dead17color = fract(sin(donor_replacementGLF_dead17vecCoor.yx - trunc(float(GLF_dead17data[7]))));
                                            donor_replacementGLF_dead17color.y *= mix(normalize(donor_replacementGLF_dead17vecCoor), normalize(vec3(donor_replacementGLF_dead17color, degrees(donor_replacementGLF_dead17color.x))), GLF_dead17injectionSwitch.x).y;
                                            break;
                                        } else {
                                            discard;
                                        }
                                    }
                                    int GLF_live11i = _GLF_FUZZED(ivec3(-67796, 55346, 81764).r);
                                    int GLF_live11looplimiter0 = 0;
                                    vec4 GLF_live11texel = _GLF_FUZZED(vec4(94.59, -3.1, 3146.0424, 9127.4334));
                                    {
                                        if (GLF_live11looplimiter0 >= 7) {
                                            ;
                                        }
                                        GLF_live11looplimiter0++;
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            _GLF_IDENTITY(GLF_live11coord = GLF_live11texel.xz + GLF_live11texel.yy, vec2(0.0, 0.0) + (GLF_live11coord = GLF_live11texel.xz + GLF_live11texel.yy));
                                            GLF_live11coord = floor(GLF_live11coord * 256.0) / 256.0;
                                            GLF_live11texel = texture(GLF_live11tex, GLF_live11coord);
                                            do {
                                                GLF_live11i++;
                                            } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.x < length(vec3(0.0, 0.0, 0.0))))));
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                float donor_replacementGLF_dead18alpha1 = _GLF_FUZZED(8.9);
                                                float donor_replacementGLF_dead18beta = _GLF_FUZZED(uintBitsToFloat((93889u)));
                                                int donor_replacementGLF_dead18k = _GLF_FUZZED(GLF_live11looplimiter0);
                                                float donor_replacementGLF_dead18magnitudeX = _GLF_FUZZED(c_re);
                                                mat4 donor_replacementGLF_dead18matrix_a = _GLF_FUZZED(GLF_dead5m44);
                                                vec4 donor_replacementGLF_dead18matrix_b = _GLF_FUZZED(GLF_live11texel);
                                                {
                                                    for (int GLF_dead18x = GLF_dead18MATRIX_N - 1; GLF_dead18x >= donor_replacementGLF_dead18k; GLF_dead18x--) {
                                                        donor_replacementGLF_dead18magnitudeX += donor_replacementGLF_dead18matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead18x, 4)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead18k, 4)] * donor_replacementGLF_dead18matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead18x, 4)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead18k, 4)];
                                                        _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead18x, 4)] = donor_replacementGLF_dead18matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead18x, 4)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead18k, 4)];
                                                    }
                                                    donor_replacementGLF_dead18magnitudeX = sqrt(donor_replacementGLF_dead18magnitudeX);
                                                    _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead18k, 4)] -= (sign(_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead18k, 4)]) * donor_replacementGLF_dead18magnitudeX);
                                                    for (int GLF_dead18u = GLF_dead18MATRIX_N - 1; GLF_dead18u >= donor_replacementGLF_dead18k; GLF_dead18u--) {
                                                        donor_replacementGLF_dead18alpha1 += _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead18u, 4)] * _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead18u, 4)];
                                                    }
                                                    c_im = 2.0 / donor_replacementGLF_dead18alpha1;
                                                    for (int GLF_dead18j = donor_replacementGLF_dead18k; GLF_dead18j < GLF_dead18MATRIX_N; GLF_dead18j++) {
                                                        for (int GLF_dead18a = GLF_dead18MATRIX_N - 1; GLF_dead18a >= donor_replacementGLF_dead18k; GLF_dead18a--) {
                                                            xCoord += _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead18a, 4)] * donor_replacementGLF_dead18matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead18a, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead18j, 4)];
                                                        }
                                                        donor_replacementGLF_dead18beta = c_im * xCoord;
                                                        for (int GLF_dead18a = GLF_dead18MATRIX_N - 1; GLF_dead18a >= donor_replacementGLF_dead18k; GLF_dead18a--) {
                                                            donor_replacementGLF_dead18matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead18a, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead18j, 4)] = donor_replacementGLF_dead18matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead18a, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead18j, 4)] - (donor_replacementGLF_dead18beta * _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead18a, 4)]);
                                                        }
                                                        xCoord = 0.0;
                                                        donor_replacementGLF_dead18beta = 0.0;
                                                    }
                                                    for (int GLF_dead18b = GLF_dead18MATRIX_N - 1; GLF_dead18b >= donor_replacementGLF_dead18k; GLF_dead18b--) {
                                                        xCoord += _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead18b, 4)] * donor_replacementGLF_dead18matrix_b[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead18b, 4)];
                                                    }
                                                    donor_replacementGLF_dead18beta = c_im * xCoord;
                                                    for (int GLF_dead18b = GLF_dead18MATRIX_N - 1; GLF_dead18b >= donor_replacementGLF_dead18k; GLF_dead18b--) {
                                                        donor_replacementGLF_dead18matrix_b[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead18b, 4)] = donor_replacementGLF_dead18matrix_b[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead18b, 4)] - (donor_replacementGLF_dead18beta * _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead18b, 4)]);
                                                    }
                                                    donor_replacementGLF_dead18magnitudeX = 0.0;
                                                    donor_replacementGLF_dead18alpha1 = 0.0;
                                                    c_im = 0.0;
                                                    xCoord = 0.0;
                                                    donor_replacementGLF_dead18beta = 0.0;
                                                }
                                            }
                                        } else {
                                        }
                                    }
                                }
                            } else {
                                {
                                    for (int _injected_loop_counter = (1 & 1); _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
                                        ;
                                    }
                                }
                                GLF_live7_GLF_color = vec4(0.0, 1.0, 0.0, 1.0);
                            }
                        }
                        do {
                            ;
                        } while (_GLF_WRAPPED_LOOP(false));
                    }
                }
                if (_GLF_DEAD(false)) {
                    float donor_replacementGLF_dead18alpha1 = _GLF_FUZZED(yCoord);
                    float donor_replacementGLF_dead18alpha2 = _GLF_FUZZED(c_re);
                    float donor_replacementGLF_dead18alpha3 = _GLF_FUZZED(fwidth(width));
                    float donor_replacementGLF_dead18beta = _GLF_FUZZED(ypos);
                    int donor_replacementGLF_dead18k = _GLF_FUZZED(iteration);
                    float donor_replacementGLF_dead18magnitudeX = _GLF_FUZZED(xpos);
                    mat4 donor_replacementGLF_dead18matrix_a = _GLF_FUZZED(mat4(-1355.0880, -468.316, 1018.3701, -9633.8441, -97.84, -55.94, 5.6, 73.01, -9.1, -5.6, -58.34, -9.9, 52.30, 0.2, 32.04, -3.8));
                    vec4 donor_replacementGLF_dead18matrix_b = _GLF_FUZZED(cos(_GLF_color));
                    vec4 donor_replacementGLF_dead18matrix_u = _GLF_FUZZED(_GLF_color);
                    {
                        for (int GLF_dead18x = GLF_dead18MATRIX_N - 1; GLF_dead18x >= donor_replacementGLF_dead18k; GLF_dead18x--) {
                            donor_replacementGLF_dead18magnitudeX += donor_replacementGLF_dead18matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead18x, 4)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead18k, 4)] * donor_replacementGLF_dead18matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead18x, 4)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead18k, 4)];
                            donor_replacementGLF_dead18matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead18x, 4)] = donor_replacementGLF_dead18matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead18x, 4)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead18k, 4)];
                        }
                        donor_replacementGLF_dead18magnitudeX = sqrt(donor_replacementGLF_dead18magnitudeX);
                        donor_replacementGLF_dead18matrix_u[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead18k, 4)] -= (sign(donor_replacementGLF_dead18matrix_u[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead18k, 4)]) * donor_replacementGLF_dead18magnitudeX);
                        for (int GLF_dead18u = GLF_dead18MATRIX_N - 1; GLF_dead18u >= donor_replacementGLF_dead18k; GLF_dead18u--) {
                            donor_replacementGLF_dead18alpha1 += donor_replacementGLF_dead18matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead18u, 4)] * donor_replacementGLF_dead18matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead18u, 4)];
                        }
                        donor_replacementGLF_dead18alpha2 = 2.0 / donor_replacementGLF_dead18alpha1;
                        for (int GLF_dead18j = donor_replacementGLF_dead18k; GLF_dead18j < GLF_dead18MATRIX_N; GLF_dead18j++) {
                            for (int GLF_dead18a = GLF_dead18MATRIX_N - 1; GLF_dead18a >= donor_replacementGLF_dead18k; GLF_dead18a--) {
                                donor_replacementGLF_dead18alpha3 += donor_replacementGLF_dead18matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead18a, 4)] * donor_replacementGLF_dead18matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead18a, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead18j, 4)];
                            }
                            donor_replacementGLF_dead18beta = donor_replacementGLF_dead18alpha2 * donor_replacementGLF_dead18alpha3;
                            for (int GLF_dead18a = GLF_dead18MATRIX_N - 1; GLF_dead18a >= donor_replacementGLF_dead18k; GLF_dead18a--) {
                                donor_replacementGLF_dead18matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead18a, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead18j, 4)] = donor_replacementGLF_dead18matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead18a, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead18j, 4)] - (donor_replacementGLF_dead18beta * donor_replacementGLF_dead18matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead18a, 4)]);
                            }
                            donor_replacementGLF_dead18alpha3 = 0.0;
                            donor_replacementGLF_dead18beta = 0.0;
                        }
                        for (int GLF_dead18b = GLF_dead18MATRIX_N - 1; GLF_dead18b >= donor_replacementGLF_dead18k; GLF_dead18b--) {
                            donor_replacementGLF_dead18alpha3 += donor_replacementGLF_dead18matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead18b, 4)] * donor_replacementGLF_dead18matrix_b[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead18b, 4)];
                        }
                        donor_replacementGLF_dead18beta = donor_replacementGLF_dead18alpha2 * donor_replacementGLF_dead18alpha3;
                        for (int GLF_dead18b = GLF_dead18MATRIX_N - 1; GLF_dead18b >= donor_replacementGLF_dead18k; GLF_dead18b--) {
                            donor_replacementGLF_dead18matrix_b[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead18b, 4)] = donor_replacementGLF_dead18matrix_b[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead18b, 4)] - (donor_replacementGLF_dead18beta * donor_replacementGLF_dead18matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead18b, 4)]);
                        }
                        donor_replacementGLF_dead18magnitudeX = 0.0;
                        donor_replacementGLF_dead18alpha1 = 0.0;
                        donor_replacementGLF_dead18alpha2 = 0.0;
                        donor_replacementGLF_dead18alpha3 = 0.0;
                        donor_replacementGLF_dead18beta = 0.0;
                    }
                }
                int GLF_live0i = _GLF_FUZZED(55832);
                int GLF_live0looplimiter0 = 0;
                {
                    vec2 GLF_live14coord = _GLF_FUZZED((false ? vec2(3.2, 9.8) : vec2(50.69, -976.663)));
                    float GLF_live14h = _GLF_FUZZED(vec2(9.6, 0.1).y);
                    int GLF_live14i = _GLF_FUZZED(ivec4(27691, 72939, -8006, 22308).s);
                    int GLF_live14looplimiter0 = 0;
                    float GLF_live14refh = _GLF_FUZZED(8.4);
                    float GLF_live14slope = _GLF_FUZZED(-941.455);
                    vec2 GLF_live14uvstep = _GLF_FUZZED((vec4(-1.1, -5289.1960, -9.7, 7.3) * mat2x4(2.4, 5.5, -28.97, -8.5, 3283.7591, 65.00, 3509.3347, 2.8)));
                    while (GLF_live14h < GLF_live14refh && _GLF_IDENTITY(GLF_live14i < 32, (GLF_live14i < 32) && true)) {
                        if (GLF_live14looplimiter0 >= 3) {
                            break;
                        }
                        for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
                            GLF_live14looplimiter0++;
                        }
                        {
                            GLF_live14coord -= GLF_live14uvstep;
                            GLF_live14refh += GLF_live14slope;
                            GLF_live14h = texture(GLF_live14tex, GLF_live14coord).y;
                            GLF_live14i++;
                        }
                    }
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    int donor_replacementGLF_dead7m = _GLF_FUZZED(-80376);
                    {
                        ;
                    }
                    {
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                            ;
                        } else {
                        }
                    }
                }
                vec4 GLF_live0texel = _GLF_FUZZED(vec4(2859.1583, 8995.4569, -_GLF_IDENTITY(1.4, clamp(1.4, _GLF_IDENTITY(1.4, clamp(1.4, _GLF_IDENTITY(1.4, float(mat4(1.4, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 1.0))), 1.4)), 1.4)), 7.9));
                {
                    int GLF_live10v = _GLF_FUZZED((-11769));
                    {
                        vec2 GLF_live11coord = _GLF_FUZZED(vec2(9862.8218));
                        int GLF_live11i = _GLF_FUZZED((-9532));
                        vec4 GLF_live11texel = _GLF_FUZZED(vec2(4.8, -158.621).ssts);
                        {
                            int GLF_live11looplimiter0 = 0;
                            while (GLF_live11texel.x + GLF_live11texel.y + GLF_live11texel.z > 1.0 && GLF_live11i < 16) {
                                if (_GLF_IDENTITY(GLF_live11looplimiter0, ~(~(_GLF_IDENTITY(GLF_live11looplimiter0, (false ? _GLF_FUZZED(iteration) : GLF_live11looplimiter0))))) >= 7) {
                                    break;
                                }
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    GLF_live11looplimiter0++;
                                } else {
                                }
                                {
                                    GLF_live11coord = GLF_live11texel.xz + GLF_live11texel.yy;
                                    GLF_live11coord = floor(GLF_live11coord * 256.0) / 256.0;
                                    GLF_live11texel = texture(GLF_live11tex, GLF_live11coord);
                                    GLF_live11i++;
                                }
                            }
                        }
                    }
                    {
                        GLF_live10v = (4 * GLF_live10v * (1000 - GLF_live10v)) / 1000;
                    }
                }
                while (GLF_live0texel.x + GLF_live0texel.y + GLF_live0texel.z > 1.0 && GLF_live0i < 16) {
                    {
                        {
                            int GLF_live9looplimiter2 = 0;
                            for (int GLF_live9i = int(GLF_live9injectionSwitch.x); GLF_live9i < 10; GLF_live9i++) {
                                if (GLF_live9looplimiter2 >= 6) {
                                    {
                                        for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                                            ;
                                        }
                                    }
                                    break;
                                    {
                                        vec2 GLF_live14coord = _GLF_FUZZED((vec2(6.0, -5191.9615) * vec2(0.7, -6.7)));
                                        if (_GLF_DEAD(false)) {
                                            int donor_replacementGLF_dead15v = _GLF_FUZZED(k);
                                            if ((donor_replacementGLF_dead15v & 1) == 1) {
                                                donor_replacementGLF_dead15v = 3 * donor_replacementGLF_dead15v + 1;
                                            } else {
                                                donor_replacementGLF_dead15v /= 2;
                                            }
                                        }
                                        float GLF_live14h = _GLF_FUZZED((+(-7231.8324)));
                                        int GLF_live14i = _GLF_FUZZED((~25005));
                                        float GLF_live14refh = _GLF_FUZZED(float(-49115));
                                        float GLF_live14slope = _GLF_FUZZED(6.3);
                                        vec2 GLF_live14uvstep = _GLF_FUZZED(vec2(8.7, -4963.7932));
                                        {
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                int donor_replacementGLF_dead15count = _GLF_FUZZED(int(199325u));
                                                int donor_replacementGLF_dead15v = _GLF_FUZZED(bitfieldInsert(GLF_live9looplimiter2, GLF_live9looplimiter2, GLF_live0looplimiter0, GLF_live9i));
                                                while (donor_replacementGLF_dead15v > 1) {
                                                    if ((donor_replacementGLF_dead15v & 1) == 1) {
                                                        donor_replacementGLF_dead15v = 3 * donor_replacementGLF_dead15v + 1;
                                                    } else {
                                                        donor_replacementGLF_dead15v /= 2;
                                                    }
                                                    donor_replacementGLF_dead15count++;
                                                }
                                            }
                                            int GLF_live14looplimiter0 = 0;
                                            while (GLF_live14h < GLF_live14refh && GLF_live14i < 32) {
                                                if (GLF_live14looplimiter0 >= 3) {
                                                    break;
                                                }
                                                GLF_live14looplimiter0++;
                                                {
                                                    GLF_live14coord -= GLF_live14uvstep;
                                                    GLF_live14refh += GLF_live14slope;
                                                    GLF_live14h = texture(GLF_live14tex, GLF_live14coord).y;
                                                    GLF_live14i++;
                                                }
                                            }
                                        }
                                    }
                                }
                                GLF_live9looplimiter2++;
                                {
                                    for (int _injected_loop_counter = (0 ^ (0 >> _GLF_IDENTITY(int(6), int(6)))); _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
                                        GLF_live9obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9i, 10)] = (10 - GLF_live9i) * int(GLF_live9injectionSwitch.y);
                                    }
                                }
                            }
                        }
                    }
                    if (GLF_live0looplimiter0 >= 6) {
                        {
                            int GLF_live14looplimiter0 = 0;
                            if (GLF_live14looplimiter0 >= 3) {
                                ;
                            }
                        }
                        break;
                    }
                    GLF_live0looplimiter0++;
                    {
                        do {
                            for (int _injected_loop_counter = (0 | 0); _GLF_WRAPPED_LOOP(_injected_loop_counter != ((1 << _GLF_IDENTITY(int(1), int(1))) >> _GLF_IDENTITY(int(1), int(1)))); _injected_loop_counter++) {
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    GLF_live7_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
                                } else {
                                    if (_GLF_DEAD(false)) {
                                        vec2 donor_replacementGLF_dead17color = _GLF_FUZZED(fwidthFine(GLF_live9injectionSwitch));
                                        vec3 donor_replacementGLF_dead17vecCoor = _GLF_FUZZED(vec3(-35.25, -5.2, -836.125));
                                        do {
                                            if (int(GLF_dead17gl_FragCoord[1]) < 30) {
                                                donor_replacementGLF_dead17color = fract(sin(donor_replacementGLF_dead17vecCoor.yx - trunc(float(GLF_dead17data[0]))));
                                                donor_replacementGLF_dead17color[0] = dFdy(GLF_dead17gl_FragCoord.y);
                                                break;
                                            } else if (int(GLF_dead17gl_FragCoord[1]) < 60) {
                                                donor_replacementGLF_dead17color = fract(sin(donor_replacementGLF_dead17vecCoor.yx - trunc(float(GLF_dead17data[1]))));
                                                donor_replacementGLF_dead17color[1] *= atan(faceforward(GLF_dead17injectionSwitch, donor_replacementGLF_dead17color.xx, donor_replacementGLF_dead17vecCoor.yx).y);
                                                break;
                                            } else if (int(GLF_dead17gl_FragCoord[1]) < 90) {
                                                donor_replacementGLF_dead17color = fract(sin(donor_replacementGLF_dead17vecCoor.yx - trunc(float(GLF_dead17data[2]))));
                                                donor_replacementGLF_dead17color.x += atanh(donor_replacementGLF_dead17color.x) * cosh(GLF_dead17injectionSwitch.y) * smoothstep(donor_replacementGLF_dead17color, GLF_dead17injectionSwitch, GLF_dead17gl_FragCoord.yy).x;
                                                break;
                                            } else if (int(GLF_dead17gl_FragCoord[1]) < 120) {
                                                donor_replacementGLF_dead17color = fract(acosh(clamp(donor_replacementGLF_dead17vecCoor.yx - trunc(float(GLF_dead17data[3])), 1.0, 1000.0)));
                                                donor_replacementGLF_dead17color.x += (isnan(GLF_dead17gl_FragCoord.x) ? log2(GLF_dead17gl_FragCoord.x) : log2(GLF_dead17gl_FragCoord.y));
                                                break;
                                            } else if (int(GLF_dead17gl_FragCoord[1]) < 150) {
                                                discard;
                                            } else if (int(GLF_dead17gl_FragCoord[1]) < 180) {
                                                donor_replacementGLF_dead17color = fract(sin(donor_replacementGLF_dead17vecCoor.yx - trunc(float(GLF_dead17data[4]))));
                                                donor_replacementGLF_dead17color[1] += asinh(GLF_dead17gl_FragCoord.y * ldexp(donor_replacementGLF_dead17color.y, -GLF_live0looplimiter0));
                                                break;
                                            } else if (int(GLF_dead17gl_FragCoord[1]) < 210) {
                                                donor_replacementGLF_dead17color = fract(sin(donor_replacementGLF_dead17vecCoor.yx - trunc(float(GLF_dead17data[5]))));
                                                donor_replacementGLF_dead17color.y -= tanh(donor_replacementGLF_dead17color.x) / cosh(donor_replacementGLF_dead17color.y);
                                                break;
                                            } else if (int(GLF_dead17gl_FragCoord[1]) < 240) {
                                                donor_replacementGLF_dead17color = fract(asinh(donor_replacementGLF_dead17vecCoor.yx - trunc(float(GLF_dead17data[6]))));
                                                donor_replacementGLF_dead17color.y -= isnan(float(GLF_live0looplimiter0)) ? tanh(GLF_dead17gl_FragCoord.x) : atanh(GLF_dead17gl_FragCoord.y / GLF_dead17resolution.y);
                                                break;
                                            } else if (int(GLF_dead17gl_FragCoord[1]) < 270) {
                                                donor_replacementGLF_dead17color = fract(sin(donor_replacementGLF_dead17vecCoor.yx - trunc(float(GLF_dead17data[7]))));
                                                donor_replacementGLF_dead17color.y *= mix(normalize(donor_replacementGLF_dead17vecCoor), normalize(vec3(donor_replacementGLF_dead17color, degrees(donor_replacementGLF_dead17color.x))), GLF_dead17injectionSwitch.x).y;
                                                break;
                                            } else {
                                                discard;
                                            }
                                        } while (0 == int(GLF_dead17injectionSwitch.x));
                                    }
                                }
                            }
                        } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))));
                    }
                    {
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            GLF_live0coord = GLF_live0texel.xz + GLF_live0texel.yy;
                        } else {
                        }
                        GLF_live0coord = floor(GLF_live0coord * 256.0) / 256.0;
                        do {
                            GLF_live0texel = texture(GLF_live0tex, GLF_live0coord);
                        } while (_GLF_WRAPPED_LOOP(false));
                        GLF_live0i++;
                    }
                }
                {
                    int GLF_live14looplimiter0 = 0;
                    if (GLF_live14looplimiter0 >= 3) {
                        ;
                    }
                }
                if (_GLF_DEAD(false)) {
                    vec4 donor_replacementGLF_dead8c = _GLF_FUZZED(GLF_live0texel);
                    int donor_replacementGLF_dead8i = _GLF_FUZZED(k);
                    int donor_replacementGLF_dead8msb8 = _GLF_FUZZED(k);
                    {
                        int GLF_live10v = _GLF_FUZZED(56582);
                        {
                            GLF_live10v = (4 * GLF_live10v * _GLF_IDENTITY((1000 - GLF_live10v), ((1000 - GLF_live10v)) / 1)) / 1000;
                            {
                                {
                                    ;
                                }
                            }
                        }
                    }
                    do {
                        if (_GLF_WRAPPED_IF_FALSE(false)) {
                        } else {
                            vec2 GLF_live11coord = _GLF_FUZZED(vec2(vec3(-0.8, 8826.4384, 920.125)));
                            int GLF_live11i = _GLF_FUZZED((90061 | (-86804)));
                            vec4 GLF_live11texel = _GLF_FUZZED(vec4(-0.5, -2.4, -3.1, 550.522));
                            {
                                int GLF_live11looplimiter0 = 0;
                                while (_GLF_IDENTITY(_GLF_IDENTITY(_GLF_IDENTITY(GLF_live11texel.x + GLF_live11texel.y, clamp(GLF_live11texel.x + GLF_live11texel.y, GLF_live11texel.x + GLF_live11texel.y, GLF_live11texel.x + GLF_live11texel.y)) + _GLF_IDENTITY(GLF_live11texel.z, float(_GLF_IDENTITY(mat4x2(GLF_live11texel.z, 0.0, _GLF_IDENTITY(dot(vec3(1.0, 0.0, 0.0), vec3(1.0, 0.0, 0.0)), dot(vec3(1.0, 0.0, 0.0), vec3(1.0, 0.0, 0.0))), 0.0, 0.0, round(length(normalize(vec4(1.0, 1.0, 1.0, 1.0)))), 1.0, abs(_GLF_ZERO(0.0, injectionSwitch.x))), mat4x2(0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0) + (mat4x2(GLF_live11texel.z, 0.0, _GLF_IDENTITY(dot(vec3(1.0, 0.0, 0.0), vec3(1.0, 0.0, 0.0)), dot(vec3(1.0, 0.0, 0.0), vec3(1.0, 0.0, 0.0))), 0.0, 0.0, round(length(normalize(vec4(1.0, 1.0, 1.0, 1.0)))), 1.0, abs(_GLF_ZERO(0.0, injectionSwitch.x))))))), (_GLF_IDENTITY(GLF_live11texel.x + GLF_live11texel.y, clamp(GLF_live11texel.x + GLF_live11texel.y, GLF_live11texel.x + GLF_live11texel.y, GLF_live11texel.x + GLF_live11texel.y)) + _GLF_IDENTITY(GLF_live11texel.z, float(_GLF_IDENTITY(mat4x2(GLF_live11texel.z, 0.0, _GLF_IDENTITY(dot(vec3(1.0, 0.0, 0.0), vec3(1.0, 0.0, 0.0)), dot(vec3(1.0, 0.0, 0.0), vec3(1.0, 0.0, 0.0))), 0.0, 0.0, round(length(normalize(vec4(1.0, 1.0, 1.0, 1.0)))), 1.0, abs(_GLF_ZERO(0.0, injectionSwitch.x))), mat4x2(0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0) + (mat4x2(GLF_live11texel.z, 0.0, _GLF_IDENTITY(dot(vec3(1.0, 0.0, 0.0), vec3(1.0, 0.0, 0.0)), dot(vec3(1.0, 0.0, 0.0), vec3(1.0, 0.0, 0.0))), 0.0, 0.0, round(length(normalize(vec4(1.0, 1.0, 1.0, 1.0)))), 1.0, abs(_GLF_ZERO(0.0, injectionSwitch.x)))))))) - 0.0) > 1.0 && GLF_live11i < 16, bool(bool(_GLF_IDENTITY(_GLF_IDENTITY(GLF_live11texel.x + GLF_live11texel.y, clamp(GLF_live11texel.x + GLF_live11texel.y, GLF_live11texel.x + GLF_live11texel.y, GLF_live11texel.x + GLF_live11texel.y)) + _GLF_IDENTITY(GLF_live11texel.z, float(_GLF_IDENTITY(mat4x2(GLF_live11texel.z, 0.0, _GLF_IDENTITY(dot(vec3(1.0, 0.0, 0.0), vec3(1.0, 0.0, 0.0)), dot(vec3(1.0, 0.0, 0.0), vec3(1.0, 0.0, 0.0))), 0.0, 0.0, round(length(normalize(vec4(1.0, 1.0, 1.0, 1.0)))), 1.0, abs(_GLF_ZERO(0.0, injectionSwitch.x))), mat4x2(0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0) + (mat4x2(GLF_live11texel.z, 0.0, _GLF_IDENTITY(dot(vec3(1.0, 0.0, 0.0), vec3(1.0, 0.0, 0.0)), dot(vec3(1.0, 0.0, 0.0), vec3(1.0, 0.0, 0.0))), 0.0, 0.0, round(length(normalize(vec4(1.0, 1.0, 1.0, 1.0)))), 1.0, abs(_GLF_ZERO(0.0, injectionSwitch.x))))))), (_GLF_IDENTITY(GLF_live11texel.x + GLF_live11texel.y, clamp(GLF_live11texel.x + GLF_live11texel.y, GLF_live11texel.x + GLF_live11texel.y, GLF_live11texel.x + GLF_live11texel.y)) + _GLF_IDENTITY(GLF_live11texel.z, float(_GLF_IDENTITY(mat4x2(GLF_live11texel.z, 0.0, _GLF_IDENTITY(dot(vec3(1.0, 0.0, 0.0), vec3(1.0, 0.0, 0.0)), dot(vec3(1.0, 0.0, 0.0), vec3(1.0, 0.0, 0.0))), 0.0, 0.0, round(length(normalize(vec4(1.0, 1.0, 1.0, 1.0)))), 1.0, abs(_GLF_ZERO(0.0, injectionSwitch.x))), mat4x2(0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0) + (mat4x2(GLF_live11texel.z, 0.0, _GLF_IDENTITY(dot(vec3(1.0, 0.0, 0.0), vec3(1.0, 0.0, 0.0)), dot(vec3(1.0, 0.0, 0.0), vec3(1.0, 0.0, 0.0))), 0.0, 0.0, round(length(normalize(vec4(1.0, 1.0, 1.0, 1.0)))), 1.0, abs(_GLF_ZERO(0.0, injectionSwitch.x)))))))) - 0.0) > 1.0 && GLF_live11i < 16)))) {
                                    if (GLF_live11looplimiter0 >= 7) {
                                        break;
                                    }
                                    GLF_live11looplimiter0++;
                                    {
                                        GLF_live11coord = GLF_live11texel.xz + GLF_live11texel.yy;
                                        GLF_live11coord = floor(GLF_live11coord * 256.0) / 256.0;
                                        GLF_live11texel = texture(GLF_live11tex, GLF_live11coord);
                                        GLF_live11i++;
                                    }
                                }
                            }
                        }
                        if (donor_replacementGLF_dead8c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead8i, 4)] >= 1.0) {
                            do {
                                float GLF_live7A = _GLF_FUZZED(float(false));
                                float GLF_live7B = _GLF_FUZZED(7.6);
                                float GLF_live7C = _GLF_FUZZED(-2.9);
                                int GLF_live7iterations = _GLF_FUZZED(int((145807u == 146179u)));
                                float GLF_live7temp = _GLF_FUZZED(-351.867);
                                float GLF_live7x0 = _GLF_FUZZED((101.994 - float(false)));
                                float GLF_live7x1 = _GLF_FUZZED(vec2(-0.1, 785.103).s);
                                float GLF_live7x2 = _GLF_FUZZED((5.2));
                                {
                                    int GLF_live7looplimiter0 = _GLF_IDENTITY(0, (0) >> 0);
                                    while (abs(GLF_live7x2 - GLF_live7x1) >= .00001 && GLF_live7iterations < 64) {
                                        {
                                            int GLF_live14looplimiter0 = 0;
                                            do {
                                                if (_GLF_DEAD(false)) {
                                                    int donor_replacementGLF_dead18b = _GLF_FUZZED(35045);
                                                    float donor_replacementGLF_dead18beta = _GLF_FUZZED(xpos);
                                                    vec4 donor_replacementGLF_dead18matrix_b = _GLF_FUZZED(GLF_live7_GLF_color);
                                                    {
                                                        donor_replacementGLF_dead18matrix_b[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead18b, 4)] = donor_replacementGLF_dead18matrix_b[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead18b, 4)] - (donor_replacementGLF_dead18beta * GLF_live7_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead18b, 4)]);
                                                    }
                                                }
                                                if (GLF_live14looplimiter0 >= 3) {
                                                    ;
                                                }
                                            } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.x < 0.0))));
                                        }
                                        if (GLF_live7looplimiter0 >= 4) {
                                            break;
                                        }
                                        GLF_live7looplimiter0++;
                                        {
                                            {
                                                ;
                                            }
                                        }
                                        {
                                            float GLF_live7h0 = GLF_live7x0 - GLF_live7x2;
                                            float GLF_live7h1 = GLF_live7x1 - GLF_live7x2;
                                            float GLF_live7k0 = GLF_live7fx(GLF_live7x0) - GLF_live7fx(GLF_live7x2);
                                            float GLF_live7k1 = GLF_live7fx(GLF_live7x1) - GLF_live7fx(GLF_live7x2);
                                            GLF_live7temp = GLF_live7x2;
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                int donor_replacementGLF_dead15v = _GLF_FUZZED((ivec4(23534, -6352, -98619, -46578) * GLF_live0looplimiter0)[0]);
                                                {
                                                    donor_replacementGLF_dead15v /= 2;
                                                }
                                            }
                                            GLF_live7A = (((GLF_live7h1) * (GLF_live7k0)) - ((GLF_live7h0) * (GLF_live7k1))) / ((((GLF_live7h0) * (GLF_live7h0)) * (GLF_live7h1)) - (((GLF_live7h1) * (GLF_live7h1)) * (GLF_live7h0)));
                                            {
                                                {
                                                    if (_GLF_DEAD(false)) {
                                                        vec4 donor_replacementGLF_dead18matrix_u = _GLF_FUZZED(dFdy(asin(vec4(-785.824, -4882.3600, 12.29, 953.329))));
                                                        int donor_replacementGLF_dead18u = _GLF_FUZZED(18669);
                                                        {
                                                            x_new += donor_replacementGLF_dead18matrix_u[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead18u, 4)] * donor_replacementGLF_dead18matrix_u[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead18u, 4)];
                                                        }
                                                    }
                                                    ;
                                                }
                                            }
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                vec2 donor_replacementGLF_dead17color = _GLF_FUZZED(resolution);
                                                int donor_replacementGLF_dead17i = _GLF_FUZZED(iteration);
                                                vec3 donor_replacementGLF_dead17vecCoor = _GLF_FUZZED(vec3(-4.2, 526.602, -7.7));
                                                {
                                                    if (int(GLF_dead17gl_FragCoord[1]) < 30) {
                                                        donor_replacementGLF_dead17color = fract(sin(donor_replacementGLF_dead17vecCoor.yx - trunc(float(GLF_dead17data[0]))));
                                                        donor_replacementGLF_dead17color[0] = dFdy(GLF_dead17gl_FragCoord.y);
                                                        break;
                                                    } else if (int(GLF_dead17gl_FragCoord[1]) < 60) {
                                                        donor_replacementGLF_dead17color = fract(sin(donor_replacementGLF_dead17vecCoor.yx - trunc(float(GLF_dead17data[1]))));
                                                        donor_replacementGLF_dead17color[1] *= atan(faceforward(GLF_dead17injectionSwitch, donor_replacementGLF_dead17color.xx, donor_replacementGLF_dead17vecCoor.yx).y);
                                                        break;
                                                    } else if (int(GLF_dead17gl_FragCoord[1]) < 90) {
                                                        donor_replacementGLF_dead17color = fract(sin(donor_replacementGLF_dead17vecCoor.yx - trunc(float(GLF_dead17data[2]))));
                                                        donor_replacementGLF_dead17color.x += atanh(donor_replacementGLF_dead17color.x) * cosh(GLF_dead17injectionSwitch.y) * smoothstep(donor_replacementGLF_dead17color, GLF_dead17injectionSwitch, GLF_dead17gl_FragCoord.yy).x;
                                                        break;
                                                    } else if (int(GLF_dead17gl_FragCoord[1]) < 120) {
                                                        donor_replacementGLF_dead17color = fract(acosh(clamp(donor_replacementGLF_dead17vecCoor.yx - trunc(float(GLF_dead17data[3])), 1.0, 1000.0)));
                                                        donor_replacementGLF_dead17color.x += (isnan(GLF_dead17gl_FragCoord.x) ? log2(GLF_dead17gl_FragCoord.x) : log2(GLF_dead17gl_FragCoord.y));
                                                        break;
                                                    } else if (int(GLF_dead17gl_FragCoord[1]) < 150) {
                                                        discard;
                                                    } else if (int(GLF_dead17gl_FragCoord[1]) < 180) {
                                                        donor_replacementGLF_dead17color = fract(sin(donor_replacementGLF_dead17vecCoor.yx - trunc(float(GLF_dead17data[4]))));
                                                        donor_replacementGLF_dead17color[1] += asinh(GLF_dead17gl_FragCoord.y * ldexp(donor_replacementGLF_dead17color.y, -donor_replacementGLF_dead17i));
                                                        break;
                                                    } else if (int(GLF_dead17gl_FragCoord[1]) < 210) {
                                                        donor_replacementGLF_dead17color = fract(sin(donor_replacementGLF_dead17vecCoor.yx - trunc(float(GLF_dead17data[5]))));
                                                        donor_replacementGLF_dead17color.y -= tanh(donor_replacementGLF_dead17color.x) / cosh(donor_replacementGLF_dead17color.y);
                                                        break;
                                                    } else if (int(GLF_dead17gl_FragCoord[1]) < 240) {
                                                        donor_replacementGLF_dead17color = fract(asinh(donor_replacementGLF_dead17vecCoor.yx - trunc(float(GLF_dead17data[6]))));
                                                        donor_replacementGLF_dead17color.y -= isnan(float(donor_replacementGLF_dead17i)) ? tanh(GLF_dead17gl_FragCoord.x) : atanh(GLF_dead17gl_FragCoord.y / GLF_dead17resolution.y);
                                                        break;
                                                    } else if (int(GLF_dead17gl_FragCoord[1]) < 270) {
                                                        donor_replacementGLF_dead17color = fract(sin(donor_replacementGLF_dead17vecCoor.yx - trunc(float(GLF_dead17data[7]))));
                                                        donor_replacementGLF_dead17color.y *= mix(normalize(donor_replacementGLF_dead17vecCoor), normalize(vec3(donor_replacementGLF_dead17color, degrees(donor_replacementGLF_dead17color.x))), GLF_dead17injectionSwitch.x).y;
                                                        break;
                                                    } else {
                                                        discard;
                                                    }
                                                }
                                            }
                                            do {
                                                for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != _GLF_IDENTITY(1, (1) - 0)); _injected_loop_counter++) {
                                                    GLF_live7B = (((GLF_live7k0) - (GLF_live7A * (((GLF_live7h0) * (GLF_live7h0))))) / (GLF_live7h0));
                                                }
                                            } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.y < _GLF_IDENTITY(dot(vec2(1.0, 1.0), vec2(0.0, 0.0)), dot(vec2(1.0, 1.0), vec2(0.0, 0.0)))))));
                                            for (int _injected_loop_counter = (1 | 1); _GLF_WRAPPED_LOOP(_injected_loop_counter > (0 ^ 0)); _injected_loop_counter--) {
                                                GLF_live7C = GLF_live7fx(GLF_live7x2);
                                            }
                                            GLF_live7x2 = GLF_live7x2 - ((2.0 * GLF_live7C) / _GLF_IDENTITY((GLF_live7B + sign(GLF_live7B) * sqrt(max((GLF_live7B * GLF_live7B) - (4.0 * GLF_live7A * GLF_live7C), 0.0))), mix(float((GLF_live7B + sign(GLF_live7B) * sqrt(max((GLF_live7B * GLF_live7B) - (4.0 * GLF_live7A * GLF_live7C), 0.0)))), float(_GLF_FUZZED((-vec3(8.3, -9.9, -2.6).r))), bool(false))));
                                            for (int _injected_loop_counter = (int(_GLF_ONE(1.0, injectionSwitch.y)) | 0); _GLF_WRAPPED_LOOP(_injected_loop_counter > _GLF_IDENTITY(0, (_GLF_IDENTITY(0, (true ? 0 : _GLF_FUZZED(k)))) * 1)); _injected_loop_counter--) {
                                                GLF_live7x0 = GLF_live7x1;
                                            }
                                            GLF_live7x1 = _GLF_IDENTITY(GLF_live7temp, float(mat4x3(GLF_live7temp, 0.0, sqrt(1.0), exp(0.0), 1.0, 1.0, 0.0, _GLF_IDENTITY(dot(vec3(0.0, length(vec2(0.0, 0.0)), _GLF_IDENTITY(dot(vec2(1.0, 0.0), vec2(1.0, 0.0)), dot(vec2(1.0, 0.0), vec2(1.0, 0.0)))), vec3(0.0, 0.0, 1.0)), dot(vec3(0.0, length(vec2(0.0, 0.0)), _GLF_IDENTITY(dot(vec2(1.0, 0.0), vec2(1.0, 0.0)), dot(vec2(1.0, 0.0), vec2(1.0, 0.0)))), vec3(0.0, 0.0, 1.0))), 1.0, 0.0, 0.0, 1.0)));
                                            GLF_live7iterations++;
                                        }
                                    }
                                }
                            } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))));
                            {
                                {
                                    if (_GLF_DEAD(false)) {
                                        int donor_replacementGLF_dead15count = _GLF_FUZZED(26841);
                                        int donor_replacementGLF_dead15v = _GLF_FUZZED(iteration);
                                        while (donor_replacementGLF_dead15v > 1) {
                                            if ((donor_replacementGLF_dead15v & 1) == 1) {
                                                donor_replacementGLF_dead15v = 3 * donor_replacementGLF_dead15v + 1;
                                            } else {
                                                donor_replacementGLF_dead15v /= 2;
                                            }
                                            donor_replacementGLF_dead15count++;
                                        }
                                    }
                                    ;
                                }
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    int donor_replacementGLF_dead18b = _GLF_FUZZED(-19413);
                                    float donor_replacementGLF_dead18beta = _GLF_FUZZED(xCoord);
                                    vec4 donor_replacementGLF_dead18matrix_u = _GLF_FUZZED(asinh(cosh(_GLF_color)));
                                    {
                                        _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead18b, 4)] = _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead18b, 4)] - (donor_replacementGLF_dead18beta * donor_replacementGLF_dead18matrix_u[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead18b, 4)]);
                                    }
                                }
                            }
                            donor_replacementGLF_dead8c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead8i, 4)] = donor_replacementGLF_dead8c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead8i, 4)] * donor_replacementGLF_dead8c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead8i, 4)];
                        }
                        {
                            int GLF_live10v = _GLF_FUZZED(-57629);
                            {
                                GLF_live10v = (4 * GLF_live10v * (1000 - GLF_live10v)) / 1000;
                            }
                        }
                        donor_replacementGLF_dead8i++;
                    } while (donor_replacementGLF_dead8i < findMSB(findLSB(donor_replacementGLF_dead8msb8)));
                    {
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            vec2 GLF_live14coord = _GLF_FUZZED(vec2(2.0, 4.9));
                            float GLF_live14h = _GLF_FUZZED(vec3(1582.5794, 3.0, -7.5).r);
                            int GLF_live14i = _GLF_FUZZED(-90243);
                            int GLF_live14looplimiter0 = 0;
                            float GLF_live14refh = _GLF_FUZZED((+6.0));
                            float GLF_live14slope = _GLF_FUZZED((-(-22.89)));
                            vec2 GLF_live14uvstep = _GLF_FUZZED(((mat2(3.9, 9.5, 2.8, -24.37)) * vec2(-1.0, 60.99)));
                            {
                                if (GLF_live14looplimiter0 >= 3) {
                                    ;
                                }
                                GLF_live14looplimiter0++;
                                do {
                                    GLF_live14coord -= GLF_live14uvstep;
                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                        int donor_replacementGLF_dead18a = _GLF_FUZZED(GLF_live0looplimiter0);
                                        float donor_replacementGLF_dead18alpha3 = _GLF_FUZZED(max(dFdx(c_re), c_re));
                                        int donor_replacementGLF_dead18j = _GLF_FUZZED(donor_replacementGLF_dead8msb8);
                                        mat4 donor_replacementGLF_dead18matrix_a = _GLF_FUZZED(GLF_dead5m44);
                                        vec4 donor_replacementGLF_dead18matrix_u = _GLF_FUZZED(GLF_live0texel);
                                        {
                                            donor_replacementGLF_dead18alpha3 += donor_replacementGLF_dead18matrix_u[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead18a, 4)] * donor_replacementGLF_dead18matrix_a[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead18a, 4)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead18j, 4)];
                                        }
                                    }
                                    GLF_live14refh += GLF_live14slope;
                                    GLF_live14h = texture(GLF_live14tex, GLF_live14coord).y;
                                    GLF_live14i++;
                                } while (_GLF_WRAPPED_LOOP(false));
                            }
                        } else {
                        }
                        int GLF_live10v = _GLF_FUZZED(84268);
                        {
                            GLF_live10v = (4 * GLF_live10v * (1000 - GLF_live10v)) / 1000;
                        }
                    }
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                        vec2 GLF_live11coord = _GLF_FUZZED((mat3x2(3.4, 4311.0368, -5.0, 9.2, -6.5, -3.0) * vec3(263.836, -17.61, -9.6)));
                        int GLF_live11i = _GLF_FUZZED(94555);
                        vec4 GLF_live11texel = _GLF_FUZZED(vec4(vec3(vec2(-2.2, 55.19), 54.37), 5.5));
                        {
                            GLF_live11coord = GLF_live11texel.xz + GLF_live11texel.yy;
                            GLF_live11coord = floor(GLF_live11coord * 256.0) / 256.0;
                            GLF_live11texel = texture(GLF_live11tex, GLF_live11coord);
                            GLF_live11i++;
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                int donor_replacementGLF_dead15count = _GLF_FUZZED(iterationCap);
                                while (donor_replacementGLF_dead8msb8 > 1) {
                                    if ((donor_replacementGLF_dead8msb8 & 1) == 1) {
                                        donor_replacementGLF_dead8msb8 = 3 * donor_replacementGLF_dead8msb8 + 1;
                                    } else {
                                        donor_replacementGLF_dead8msb8 /= 2;
                                    }
                                    donor_replacementGLF_dead15count++;
                                }
                            }
                        }
                    } else {
                    }
                }
            } else {
            }
            y = 2.0 * x * y + c_im;
            _GLF_IDENTITY(x = _GLF_IDENTITY(x_new, min(x_new, x_new)), (x = _GLF_IDENTITY(x_new, min(x_new, x_new))) - 0.0);
            iteration++;
            k++;
        } while (k < bitfieldInsert(iterationCap + (_GLF_IDENTITY(257.0 > resolution.y ? 1 : 0, (257.0 > resolution.y ? 1 : _GLF_IDENTITY(0, _GLF_IDENTITY(int(ivec3(0, 1, 0)), ~(~(int(ivec3(0, 1, 0))))))) / 1)), 0, 0, 0));
    } else {
    }
    if (0.0 > _GLF_IDENTITY(resolution.y, (resolution.y) - sqrt(0.0))) {
        iterationCap += 1;
    }
    {
        int GLF_live1count = _GLF_FUZZED((ivec2(37598, -97260).r | (-22086)));
        int GLF_live1looplimiter0 = 0;
        if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
        } else {
            {
                GLF_live7_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
            }
        }
        int GLF_live1v = _GLF_FUZZED((-ivec3(87270, -36938, -26235).y));
        while (GLF_live1v > 1) {
            if (GLF_live1looplimiter0 >= 6) {
                break;
            }
            if (_GLF_WRAPPED_IF_FALSE(false)) {
            } else {
                GLF_live1looplimiter0++;
            }
            {
                {
                    vec2 GLF_live11coord = _GLF_FUZZED(vec2(1747.2239, -4095.7103));
                    int GLF_live11i = _GLF_FUZZED(((-57837) ^ (false ? _GLF_IDENTITY((-89278), (_GLF_IDENTITY((-89278), ~(_GLF_IDENTITY(~((-89278)), (~((-89278))) * 1)))) >> 0) : (-98787))));
                    vec4 GLF_live11texel = _GLF_FUZZED(vec4(-2.1, -2.3, -79.27, -9484.6548));
                    {
                        if (_GLF_DEAD(false)) {
                            int donor_replacementGLF_dead15v = _GLF_FUZZED(GLF_live1v);
                            if ((donor_replacementGLF_dead15v & 1) == 1) {
                                donor_replacementGLF_dead15v = 3 * donor_replacementGLF_dead15v + 1;
                            } else {
                                donor_replacementGLF_dead15v /= 2;
                            }
                        }
                        _GLF_IDENTITY(GLF_live11coord = GLF_live11texel.xz + GLF_live11texel.yy, (false ? _GLF_FUZZED(GLF_live11coord) : (GLF_live11coord = GLF_live11texel.xz + GLF_live11texel.yy)));
                        for (int _injected_loop_counter = int(_GLF_ZERO(0.0, injectionSwitch.x)); _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
                            GLF_live11coord = floor(GLF_live11coord * 256.0) / 256.0;
                        }
                        GLF_live11texel = texture(GLF_live11tex, GLF_live11coord);
                        GLF_live11i++;
                        if (_GLF_DEAD(false)) {
                            float donor_replacementGLF_dead18alpha3 = _GLF_FUZZED(xCoord);
                            float donor_replacementGLF_dead18beta = _GLF_FUZZED((vec3(4204.4294, 41.52, 2.5).y));
                            int donor_replacementGLF_dead18k = _GLF_FUZZED(((-99743) + (-17683)));
                            mat4 donor_replacementGLF_dead18matrix_a = _GLF_FUZZED(GLF_dead5m44);
                            vec4 donor_replacementGLF_dead18matrix_u = _GLF_FUZZED(fwidthFine(GLF_live7_GLF_color));
                            for (int GLF_dead18j = donor_replacementGLF_dead18k; GLF_dead18j < GLF_dead18MATRIX_N; GLF_dead18j++) {
                                for (int GLF_dead18a = GLF_dead18MATRIX_N - 1; GLF_dead18a >= donor_replacementGLF_dead18k; GLF_dead18a--) {
                                    donor_replacementGLF_dead18alpha3 += donor_replacementGLF_dead18matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead18a, 4)] * donor_replacementGLF_dead18matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead18a, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead18j, 4)];
                                }
                                donor_replacementGLF_dead18beta = ypos * donor_replacementGLF_dead18alpha3;
                                for (int GLF_dead18a = GLF_dead18MATRIX_N - 1; GLF_dead18a >= donor_replacementGLF_dead18k; GLF_dead18a--) {
                                    donor_replacementGLF_dead18matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead18a, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead18j, 4)] = donor_replacementGLF_dead18matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead18a, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead18j, 4)] - (donor_replacementGLF_dead18beta * donor_replacementGLF_dead18matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead18a, 4)]);
                                }
                                donor_replacementGLF_dead18alpha3 = 0.0;
                                donor_replacementGLF_dead18beta = 0.0;
                            }
                        }
                    }
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    {
                        ;
                    }
                }
                for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                    if (_GLF_WRAPPED_IF_FALSE(_GLF_IDENTITY(false, bool(bvec4(false, true, false, true))))) {
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            int donor_replacementGLF_dead18j = _GLF_FUZZED(iteration);
                            mat4 donor_replacementGLF_dead18matrix_a = _GLF_FUZZED(mat4(-65.74, dot(resolution, vec2(-75.32, -319.108)), xCoord, 842.270, xCoord, c_re, (ypos * y), yCoord, -374.176, (false ? GLF_live7_GLF_color[1] : GLF_dead5one), roundEven(asin(c_re)), y, ypos, atanh(y), (c_im + y), x));
                            vec4 donor_replacementGLF_dead18matrix_u = _GLF_FUZZED(mix(GLF_live7_GLF_color, vec4(-6.0, -37.00, 8213.1372, -84.81), bvec4(false, true, false, true)));
                            {
                                y += donor_replacementGLF_dead18matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_live1count, 4)] * donor_replacementGLF_dead18matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_live1count, 4)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead18j, 4)];
                            }
                        }
                    } else {
                        if (_GLF_IDENTITY((GLF_live1v & 1) == 1, bool(bvec2((GLF_live1v & 1) == 1, true)))) {
                            GLF_live1v = 3 * GLF_live1v + 1;
                        } else {
                            {
                                vec2 GLF_live14coord = _GLF_FUZZED(vec2(9.5, 3158.8807));
                                float GLF_live14h = _GLF_FUZZED(-77.56);
                                int GLF_live14i = _GLF_FUZZED(-17612);
                                float GLF_live14refh = _GLF_FUZZED(55.65);
                                float GLF_live14slope = _GLF_FUZZED(107.351);
                                vec2 GLF_live14uvstep = _GLF_FUZZED((vec2(-3.7, -320.098) * (false ? vec2(34.40, 250.871) : vec2(9.5, 8054.9905))));
                                {
                                    int GLF_live14looplimiter0 = 0;
                                    while (GLF_live14h < GLF_live14refh && GLF_live14i < 32) {
                                        if (GLF_live14looplimiter0 >= 3) {
                                            break;
                                        }
                                        GLF_live14looplimiter0++;
                                        {
                                            GLF_live14coord -= GLF_live14uvstep;
                                            GLF_live14refh += GLF_live14slope;
                                            _GLF_IDENTITY(GLF_live14h = texture(GLF_live14tex, GLF_live14coord).y, (GLF_live14h = texture(GLF_live14tex, GLF_live14coord).y) + length(vec4(0.0, 0.0, 0.0, 0.0)));
                                            GLF_live14i++;
                                        }
                                    }
                                }
                            }
                            GLF_live1v /= 2;
                        }
                    }
                }
                do {
                    float GLF_live7A = _GLF_FUZZED(float(161285u));
                    float GLF_live7B = _GLF_FUZZED(vec2(809.691, 1.3).y);
                    float GLF_live7C = _GLF_FUZZED(0.8);
                    int GLF_live7iterations = _GLF_FUZZED(22437);
                    float GLF_live7temp = _GLF_FUZZED(float(189129u));
                    float GLF_live7x0 = _GLF_FUZZED(-2.6);
                    float GLF_live7x1 = _GLF_FUZZED(float(uvec3(188187u, 67080u, 90812u).t));
                    float GLF_live7x2 = _GLF_FUZZED(-7.2);
                    {
                        int GLF_live7looplimiter0 = 0;
                        while (abs(GLF_live7x2 - GLF_live7x1) >= .00001 && GLF_live7iterations < 64) {
                            if (GLF_live7looplimiter0 >= 4) {
                                break;
                            }
                            GLF_live7looplimiter0++;
                            {
                                float GLF_live7h0 = GLF_live7x0 - GLF_live7x2;
                                {
                                    vec2 GLF_live11coord = _GLF_FUZZED(vec2(-9163.0646, -55.42));
                                    int GLF_live11i = _GLF_FUZZED((ivec4(-45644, 44851, -36967, 88322).s - 8986));
                                    int GLF_live11looplimiter0 = 0;
                                    vec4 GLF_live11texel = _GLF_FUZZED(vec4(9293.0824, -5.0, 1.0, -2937.0405));
                                    while (GLF_live11texel.x + GLF_live11texel.y + GLF_live11texel.z > 1.0 && GLF_live11i < 16) {
                                        if (GLF_live11looplimiter0 >= 7) {
                                            break;
                                        }
                                        GLF_live11looplimiter0++;
                                        {
                                            GLF_live11coord = GLF_live11texel.xz + GLF_live11texel.yy;
                                            if (_GLF_DEAD(false)) {
                                                int donor_replacementGLF_dead18i = _GLF_FUZZED(findLSB(137822u));
                                                mat4 donor_replacementGLF_dead18matrix_a = _GLF_FUZZED(mat4(-789.095, 5.1, 5.7, 3134.9342, -71.35, -9034.3987, -387.504, -22.21, 12.37, 9.5, -6.7, 3.5, -5.3, -9190.9485, -8671.3659, -0.6));
                                                vec4 donor_replacementGLF_dead18matrix_b = _GLF_FUZZED((GLF_live7_GLF_color / ldexp(yCoord, GLF_live11i)));
                                                {
                                                    donor_replacementGLF_dead18matrix_b[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead18i, 4)] -= (donor_replacementGLF_dead18matrix_a[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead18i, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live1v, 4)] * donor_replacementGLF_dead18matrix_b[_GLF_MAKE_IN_BOUNDS_INT(GLF_live1v, 4)]);
                                                }
                                            }
                                            GLF_live11coord = floor(GLF_live11coord * 256.0) / 256.0;
                                            GLF_live11texel = texture(GLF_live11tex, GLF_live11coord);
                                            GLF_live11i++;
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_IDENTITY(dot(vec3(1.0, 0.0, 0.0), vec3(0.0, 1.0, 1.0)), _GLF_IDENTITY(dot(vec3(1.0, 0.0, 0.0), vec3(0.0, 1.0, 1.0)), max(dot(vec3(1.0, 0.0, 0.0), vec3(0.0, 1.0, 1.0)), dot(vec3(1.0, 0.0, 0.0), vec3(0.0, 1.0, 1.0))))))))) {
                                                int donor_replacementGLF_dead15count = _GLF_FUZZED(GLF_live1looplimiter0);
                                                {
                                                    if ((iteration & 1) == 1) {
                                                        iteration = 3 * iteration + 1;
                                                    } else {
                                                        iteration /= 2;
                                                    }
                                                    donor_replacementGLF_dead15count++;
                                                }
                                            }
                                        }
                                    }
                                }
                                float GLF_live7h1 = GLF_live7x1 - GLF_live7x2;
                                float GLF_live7k0 = GLF_live7fx(GLF_live7x0) - GLF_live7fx(GLF_live7x2);
                                float GLF_live7k1 = GLF_live7fx(GLF_live7x1) - GLF_live7fx(GLF_live7x2);
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    GLF_live7temp = GLF_live7x2;
                                } else {
                                }
                                GLF_live7A = (((GLF_live7h1) * (GLF_live7k0)) - ((GLF_live7h0) * (GLF_live7k1))) / ((((GLF_live7h0) * (GLF_live7h0)) * (GLF_live7h1)) - (((GLF_live7h1) * (GLF_live7h1)) * (GLF_live7h0)));
                                GLF_live7B = (((GLF_live7k0) - (GLF_live7A * (((GLF_live7h0) * (GLF_live7h0))))) / (GLF_live7h0));
                                do {
                                    GLF_live7C = GLF_live7fx(GLF_live7x2);
                                } while (_GLF_WRAPPED_LOOP(false));
                                GLF_live7x2 = GLF_live7x2 - ((2.0 * GLF_live7C) / (GLF_live7B + sign(GLF_live7B) * sqrt(max((GLF_live7B * GLF_live7B) - (4.0 * GLF_live7A * GLF_live7C), 0.0))));
                                GLF_live7x0 = GLF_live7x1;
                                GLF_live7x1 = GLF_live7temp;
                                GLF_live7iterations++;
                            }
                        }
                    }
                } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.x < log(1.0)))));
                GLF_live1count++;
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    if (_GLF_WRAPPED_IF_FALSE(false)) {
                    } else {
                        {
                            vec2 GLF_live14coord = _GLF_FUZZED(vec2(8316.8442, 25.97));
                            float GLF_live14h = _GLF_FUZZED(-5.7);
                            int GLF_live14i = _GLF_FUZZED(56787);
                            int GLF_live14looplimiter0 = 0;
                            float GLF_live14refh = _GLF_FUZZED(-258.856);
                            float GLF_live14slope = _GLF_FUZZED(-6.5);
                            vec2 GLF_live14uvstep = _GLF_FUZZED(vec3(13.26, -901.973, -7.8).yz);
                            {
                                if (GLF_live14looplimiter0 >= 3) {
                                    ;
                                }
                                GLF_live14looplimiter0++;
                                {
                                    GLF_live14coord -= GLF_live14uvstep;
                                    if (_GLF_DEAD(false)) {
                                        int donor_replacementGLF_dead18a = _GLF_FUZZED((66684 - (-10425)));
                                        float donor_replacementGLF_dead18beta = _GLF_FUZZED(yCoord);
                                        int donor_replacementGLF_dead18j = _GLF_FUZZED(min(GLF_live14looplimiter0, GLF_live1looplimiter0));
                                        mat4 donor_replacementGLF_dead18matrix_a = _GLF_FUZZED((GLF_dead5m44 / tanh((uvec3(87204u, 125675u, 98155u), xCoord))));
                                        vec4 donor_replacementGLF_dead18matrix_u = _GLF_FUZZED(mix((height / _GLF_color), GLF_live7_GLF_color, yCoord));
                                        {
                                            donor_replacementGLF_dead18matrix_a[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead18a, 4)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead18j, 4)] = donor_replacementGLF_dead18matrix_a[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead18a, 4)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead18j, 4)] - (donor_replacementGLF_dead18beta * donor_replacementGLF_dead18matrix_u[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead18a, 4)]);
                                        }
                                    }
                                    GLF_live14refh += GLF_live14slope;
                                    GLF_live14h = texture(GLF_live14tex, GLF_live14coord).y;
                                    if (_GLF_DEAD(false)) {
                                        float donor_replacementGLF_dead18beta = _GLF_FUZZED(xpos);
                                        int donor_replacementGLF_dead18j = _GLF_FUZZED(int((49252u % 91275u)));
                                        int donor_replacementGLF_dead18k = _GLF_FUZZED((ivec4(24593, 27357, -82456, -65201)[2]));
                                        mat4 donor_replacementGLF_dead18matrix_a = _GLF_FUZZED((dFdx(height) + (mat2x4(387.271, -436.888, -42.85, -129.712, -57.96, 9.0, -77.64, 104.276) * GLF_dead5m42)));
                                        for (int GLF_dead18a = GLF_dead18MATRIX_N - 1; GLF_dead18a >= donor_replacementGLF_dead18k; GLF_dead18a--) {
                                            donor_replacementGLF_dead18matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead18a, 4)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead18j, 4)] = donor_replacementGLF_dead18matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead18a, 4)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead18j, 4)] - (donor_replacementGLF_dead18beta * GLF_live7_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead18a, 4)]);
                                        }
                                    }
                                    GLF_live14i++;
                                }
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                int donor_replacementGLF_dead18i = _GLF_FUZZED(GLF_live14looplimiter0);
                                vec4 donor_replacementGLF_dead18matrix_b = _GLF_FUZZED(_GLF_color);
                                for (int GLF_dead18j = (GLF_dead18MATRIX_N - 1); GLF_dead18j >= (donor_replacementGLF_dead18i + 1); GLF_dead18j--) {
                                    donor_replacementGLF_dead18matrix_b[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead18i, 4)] -= (GLF_dead5m44[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead18i, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead18j, 4)] * donor_replacementGLF_dead18matrix_b[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead18j, 4)]);
                                }
                            }
                        }
                        ;
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
        {
            vec2 GLF_live11coord = _GLF_FUZZED((vec2(-2.3, -6387.0856)));
            int GLF_live11i = _GLF_FUZZED((90368 - (-_GLF_IDENTITY(59590, ~(~(_GLF_IDENTITY(59590, 0 | (_GLF_IDENTITY(59590, ~(~(59590)))))))))));
            vec4 GLF_live11texel = _GLF_FUZZED(vec4(57.31, -6.3, -2.3, -0.4));
            {
                int GLF_live11looplimiter0 = 0;
                while (GLF_live11texel.x + GLF_live11texel.y + GLF_live11texel.z > _GLF_IDENTITY(1.0, max(1.0, 1.0)) && GLF_live11i < 16) {
                    if (GLF_live11looplimiter0 >= 7) {
                        break;
                    }
                    GLF_live11looplimiter0++;
                    {
                        GLF_live11coord = GLF_live11texel.xz + GLF_live11texel.yy;
                        GLF_live11coord = floor(GLF_live11coord * 256.0) / 256.0;
                        GLF_live11texel = texture(GLF_live11tex, GLF_live11coord);
                        GLF_live11i++;
                    }
                }
            }
        }
        int donor_replacementGLF_dead7l = _GLF_FUZZED(clamp(-42531, k, k));
        int donor_replacementGLF_dead7m = _GLF_FUZZED(bitfieldInsert(iterationCap, -40555, (-iteration), iterationCap));
        if (_GLF_DEAD(false)) {
            int donor_replacementGLF_dead18a = _GLF_FUZZED((-(-28936)));
            mat4 donor_replacementGLF_dead18matrix_a = _GLF_FUZZED(mat4(GLF_dead5m42));
            vec4 donor_replacementGLF_dead18matrix_u = _GLF_FUZZED(vec4(8.8, 8.2, -2.0, -37.32));
            {
                donor_replacementGLF_dead18matrix_a[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead18a, 4)][_GLF_MAKE_IN_BOUNDS_INT(iteration, 4)] = donor_replacementGLF_dead18matrix_a[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead18a, 4)][_GLF_MAKE_IN_BOUNDS_INT(iteration, 4)] - (xCoord * donor_replacementGLF_dead18matrix_u[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead18a, 4)]);
            }
        }
        {
            {
                float GLF_live7A = _GLF_FUZZED(-7375.4962);
                float GLF_live7B = _GLF_FUZZED(44.41);
                float GLF_live7C = _GLF_FUZZED(-2.5);
                int GLF_live7iterations = _GLF_FUZZED(int(true));
                float GLF_live7temp = _GLF_FUZZED(float(31784));
                float GLF_live7x0 = _GLF_FUZZED(-2.5);
                float GLF_live7x1 = _GLF_FUZZED(-89.17);
                float GLF_live7x2 = _GLF_FUZZED((919.064 * 8.7));
                for (int _injected_loop_counter = (_GLF_IDENTITY((1 << _GLF_IDENTITY(int(2), _GLF_IDENTITY(int(2), max(int(2), int(2))))), max((1 << _GLF_IDENTITY(int(2), _GLF_IDENTITY(int(2), max(int(2), int(2))))), (1 << _GLF_IDENTITY(int(2), _GLF_IDENTITY(int(2), max(int(2), int(2))))))) >> _GLF_IDENTITY(int(2), _GLF_IDENTITY(int(2), (int(2)) + 0))); _GLF_WRAPPED_LOOP(_injected_loop_counter != int(_GLF_ZERO(0.0, injectionSwitch.x))); _injected_loop_counter--) {
                    float GLF_live7h0 = GLF_live7x0 - GLF_live7x2;
                    float GLF_live7h1 = GLF_live7x1 - GLF_live7x2;
                    float GLF_live7k0 = GLF_live7fx(GLF_live7x0) - GLF_live7fx(GLF_live7x2);
                    float GLF_live7k1 = GLF_live7fx(GLF_live7x1) - GLF_live7fx(GLF_live7x2);
                    GLF_live7temp = GLF_live7x2;
                    GLF_live7A = (((GLF_live7h1) * (GLF_live7k0)) - ((GLF_live7h0) * (GLF_live7k1))) / ((((GLF_live7h0) * (GLF_live7h0)) * (GLF_live7h1)) - (((GLF_live7h1) * (GLF_live7h1)) * (GLF_live7h0)));
                    GLF_live7B = (((GLF_live7k0) - (GLF_live7A * (((GLF_live7h0) * (GLF_live7h0))))) / (GLF_live7h0));
                    GLF_live7C = GLF_live7fx(GLF_live7x2);
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        GLF_live7x2 = GLF_live7x2 - ((2.0 * GLF_live7C) / (GLF_live7B + sign(GLF_live7B) * sqrt(max((GLF_live7B * GLF_live7B) - (4.0 * GLF_live7A * GLF_live7C), 0.0))));
                    } else {
                    }
                    GLF_live7x0 = GLF_live7x1;
                    if (_GLF_DEAD(false)) {
                        int donor_replacementGLF_dead18i = _GLF_FUZZED((-donor_replacementGLF_dead7m));
                        mat4 donor_replacementGLF_dead18matrix_a = _GLF_FUZZED(mat4(mat3(mat3x4(-0.6, 8.0, 826.271, -5.4, 6.0, 47.13, 9052.9784, -4.8, 61.16, -7.9, 5226.6022, -3.4))));
                        vec4 donor_replacementGLF_dead18matrix_b = _GLF_FUZZED(_GLF_color);
                        for (int GLF_dead18j = (GLF_dead18MATRIX_N - 1); GLF_dead18j >= (donor_replacementGLF_dead18i + 1); GLF_dead18j--) {
                            donor_replacementGLF_dead18matrix_b[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead18i, 4)] -= (donor_replacementGLF_dead18matrix_a[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead18i, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead18j, 4)] * donor_replacementGLF_dead18matrix_b[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead18j, 4)]);
                        }
                    }
                    _GLF_IDENTITY(GLF_live7x1 = GLF_live7temp, (_GLF_IDENTITY(GLF_live7x1 = GLF_live7temp, 1.0 * (GLF_live7x1 = GLF_live7temp))) / 1.0);
                    GLF_live7iterations++;
                }
            }
            donor_replacementGLF_dead7l = donor_replacementGLF_dead7m + 1;
        }
    }
    {
        vec2 GLF_live11coord = _GLF_FUZZED(vec2(vec3(574.797, 7419.6953, -9.5)));
        int GLF_live11i = _GLF_IDENTITY(_GLF_FUZZED(((uvec4(153712u, 34353u, _GLF_IDENTITY(156892u, _GLF_IDENTITY(uint(uint(156892u)), (_GLF_IDENTITY(uint(uint(156892u)), (uint(uint(156892u))) | (uint(uint(156892u))))) | 0u)), 168500u) != uvec4(164401u, 84877u, 182058u, 53411u)) ? 59840 : 93576)), min(_GLF_FUZZED(((uvec4(153712u, 34353u, _GLF_IDENTITY(156892u, _GLF_IDENTITY(uint(uint(156892u)), (_GLF_IDENTITY(uint(uint(156892u)), (uint(uint(156892u))) | (uint(uint(156892u))))) | 0u)), 168500u) != uvec4(164401u, 84877u, 182058u, 53411u)) ? 59840 : 93576)), _GLF_FUZZED(((uvec4(153712u, 34353u, _GLF_IDENTITY(156892u, _GLF_IDENTITY(uint(uint(156892u)), (_GLF_IDENTITY(uint(uint(156892u)), (uint(uint(156892u))) | (uint(uint(156892u))))) | 0u)), 168500u) != uvec4(164401u, 84877u, 182058u, 53411u)) ? 59840 : 93576))));
        int GLF_live11looplimiter0 = 0;
        vec4 GLF_live11texel = _GLF_FUZZED(((true ? mat4(-4444.1541, 7.5, 2.4, -3.9, 695.661, -3.5, 41.44, 3.1, 409.329, -5998.5609, -198.354, -8085.9760, 1.4, -78.98, -79.24, -4.1) : mat4(5.3, 7701.5259, -5.9, -_GLF_IDENTITY(941.156, (941.156) / 1.0), -9490.5286, 5.3, -990.586, -4017.5630, 977.044, 9.5, -949.521, -8479.7689, -347.623, 8738.1476, -2214.7546, 77.81)) * (vec4(1.1, 68.52, -79.70, -95.55) + vec4(-312.583, 9.3, 764.903, -440.619))));
        while (GLF_live11texel.x + GLF_live11texel.y + GLF_live11texel.z > 1.0 && GLF_live11i < 16) {
            if (GLF_live11looplimiter0 >= 7) {
                break;
            }
            GLF_live11looplimiter0++;
            {
                GLF_live11coord = GLF_live11texel.xz + GLF_live11texel.yy;
                GLF_live11coord = floor(GLF_live11coord * 256.0) / 256.0;
                GLF_live11texel = texture(GLF_live11tex, GLF_live11coord);
                GLF_live11i++;
            }
        }
    }
    if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
        {
            int GLF_live10i = _GLF_FUZZED(-90405);
            if (_GLF_DEAD(_GLF_IDENTITY(false, (_GLF_IDENTITY(false, bool(bvec3(false, true, true)))) || false))) {
                int donor_replacementGLF_dead18a = _GLF_FUZZED(k);
                float donor_replacementGLF_dead18alpha3 = _GLF_FUZZED(width);
                int donor_replacementGLF_dead18j = _GLF_FUZZED(-67547);
                vec4 donor_replacementGLF_dead18matrix_u = _GLF_FUZZED((vec4(-1.7, 7.5, 5369.1938, -8635.6094) / GLF_live7_GLF_color));
                {
                    donor_replacementGLF_dead18alpha3 += donor_replacementGLF_dead18matrix_u[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead18a, 4)] * GLF_dead5m44[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead18a, 4)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead18j, 4)];
                }
            }
            int GLF_live10iters = _GLF_FUZZED((false ? (-77130) : 16385));
            int GLF_live10v = _GLF_FUZZED(-55234);
            {
                int GLF_live10looplimiter0 = 0;
                for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > (0 | 0)); _injected_loop_counter--) {
                    for (GLF_live10i = 0; GLF_live10i < GLF_live10iters; GLF_live10i++) {
                        if (GLF_live10looplimiter0 >= 4) {
                            break;
                        }
                        GLF_live10looplimiter0++;
                        {
                            GLF_live10v = (4 * GLF_live10v * (1000 - GLF_live10v)) / 1000;
                        }
                    }
                }
            }
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            float donor_replacementGLF_dead8s = _GLF_FUZZED(_GLF_IDENTITY(width, max(width, width)));
            {
                float GLF_live7A = _GLF_FUZZED(vec2(-5680.7663, -7.3).ttt.b);
                float GLF_live7B = _GLF_FUZZED(8.0);
                float GLF_live7C = _GLF_FUZZED(-75.29);
                int GLF_live7iterations = _GLF_FUZZED(47968);
                int GLF_live7looplimiter0 = 0;
                float GLF_live7temp = _GLF_FUZZED((78.56 - float(-37238)));
                {
                    vec2 GLF_live11coord = _GLF_FUZZED(vec2(2707.4539, 1.2));
                    int GLF_live11i = _GLF_FUZZED(84129);
                    int GLF_live11looplimiter0 = 0;
                    vec4 GLF_live11texel = _GLF_FUZZED((+vec4(-775.964, 2.0, 2.7, 4.7)));
                    if (_GLF_WRAPPED_IF_FALSE(false)) {
                    } else {
                        if (GLF_live11looplimiter0 >= 7) {
                            ;
                        }
                        GLF_live11looplimiter0++;
                        {
                            GLF_live11coord = GLF_live11texel.xz + GLF_live11texel.yy;
                            GLF_live11coord = floor(GLF_live11coord * 256.0) / 256.0;
                            GLF_live11texel = texture(GLF_live11tex, GLF_live11coord);
                            GLF_live11i++;
                        }
                    }
                }
                float GLF_live7x0 = _GLF_FUZZED(((-99.97) - float(true)));
                float GLF_live7x1 = _GLF_FUZZED(float(false));
                float GLF_live7x2 = _GLF_FUZZED(-340.889);
                {
                    {
                        vec2 GLF_live14coord = _GLF_FUZZED(vec2(472.511, -40.52));
                        float GLF_live14h = _GLF_FUZZED((619.361));
                        int GLF_live14i = _GLF_FUZZED((21333 & (+(-88769))));
                        float GLF_live14refh = _GLF_FUZZED(_GLF_IDENTITY(-3525.8701, _GLF_IDENTITY(float(mat4(-3525.8701, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, sqrt(0.0), 1.0, 0.0, 1.0, 0.0, 1.0, 0.0, 0.0)), mix(float(_GLF_FUZZED(((-775.906) - 3.6))), float(float(mat4(-3525.8701, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, sqrt(0.0), 1.0, 0.0, 1.0, 0.0, 1.0, 0.0, 0.0))), bool(true)))));
                        float GLF_live14slope = _GLF_FUZZED(-986.067);
                        vec2 GLF_live14uvstep = _GLF_FUZZED((vec2(641.801, -6.7) - (+vec2(897.129, 2.1))));
                        {
                            int GLF_live14looplimiter0 = 0;
                            while (GLF_live14h < GLF_live14refh && GLF_live14i < 32) {
                                if (GLF_live14looplimiter0 >= 3) {
                                    break;
                                }
                                GLF_live14looplimiter0++;
                                {
                                    GLF_live14coord -= GLF_live14uvstep;
                                    GLF_live14refh += GLF_live14slope;
                                    do {
                                        GLF_live14h = texture(GLF_live14tex, GLF_live14coord).y;
                                    } while (_GLF_WRAPPED_LOOP(false));
                                    for (int _injected_loop_counter = int(_GLF_ZERO(0.0, injectionSwitch.x)); _GLF_WRAPPED_LOOP(_injected_loop_counter < (1 ^ 0)); _injected_loop_counter++) {
                                        GLF_live14i++;
                                    }
                                }
                            }
                        }
                    }
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        if (GLF_live7looplimiter0 >= 4) {
                            {
                                vec2 GLF_live11coord = _GLF_FUZZED(((mat4x2(-81.69, 5243.9288, 6.5, 290.950, -7009.8783, 56.04, -_GLF_IDENTITY(0.2, min(0.2, _GLF_IDENTITY(0.2, mix(float(_GLF_FUZZED(-92.59)), float(0.2), bool(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0))))))), 7784.3332) * mat2x4(8867.5390, -3.0, 3040.5126, 2.9, 79.88, -472.888, -82.77, -11.79)) * vec2(1.4, -1.1)));
                                int GLF_live11i = _GLF_FUZZED(-35521);
                                vec4 GLF_live11texel = _GLF_FUZZED(((uvec2(111404u, 95269u) == uvec2(28112u, 151790u)) ? vec4(4466.4557, -3.0, -3.6, -4.7) : vec4(-25.39, -_GLF_IDENTITY(316.651, mix(float(316.651), float(_GLF_FUZZED(31.85)), bool(false))), 4538.3845, 692.092)));
                                {
                                    GLF_live11coord = GLF_live11texel.xz + GLF_live11texel.yy;
                                    GLF_live11coord = floor(GLF_live11coord * 256.0) / 256.0;
                                    GLF_live11texel = texture(GLF_live11tex, GLF_live11coord);
                                    GLF_live11i++;
                                }
                            }
                            do {
                                ;
                            } while (_GLF_WRAPPED_LOOP(false));
                        }
                    } else {
                    }
                    GLF_live7looplimiter0++;
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < sin(0.0))))) {
                        float donor_replacementGLF_dead18alpha3 = _GLF_FUZZED(224.597);
                        int donor_replacementGLF_dead18k = _GLF_FUZZED(abs((-GLF_live7looplimiter0)));
                        vec4 donor_replacementGLF_dead18matrix_b = _GLF_FUZZED(vec4(-9887.0165, 4.6, 3056.2904, 5.0));
                        vec4 donor_replacementGLF_dead18matrix_u = _GLF_FUZZED((dFdyCoarse(vec4(2.0, -58.79, 0.5, 829.421)) * _GLF_color));
                        for (int GLF_dead18b = GLF_dead18MATRIX_N - 1; GLF_dead18b >= donor_replacementGLF_dead18k; GLF_dead18b--) {
                            donor_replacementGLF_dead18alpha3 += donor_replacementGLF_dead18matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead18b, 4)] * donor_replacementGLF_dead18matrix_b[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead18b, 4)];
                        }
                    }
                    {
                        vec2 GLF_live14coord = _GLF_FUZZED(vec2((vec4(598.841, -5476.9035, -4952.2152, 271.771) * mat3x4(mat4x3(-15.47, 6525.4376, 7.9, -20.51, 4.0, 7197.5235, -_GLF_IDENTITY(587.286, min(587.286, 587.286)), -50.33, 7.8, 49.91, 6.2, 5445.6481)))));
                        float GLF_live14h = _GLF_FUZZED(((-1.0) + 8.7));
                        int GLF_live14i = _GLF_FUZZED(int(uint(false)));
                        int GLF_live14looplimiter0 = 0;
                        float GLF_live14refh = _GLF_FUZZED(_GLF_IDENTITY(vec3(-4.4, -18.87, 9.7), max(vec3(-4.4, -18.87, 9.7), vec3(-4.4, -18.87, 9.7))).b);
                        float GLF_live14slope = _GLF_FUZZED(5.5);
                        vec2 GLF_live14uvstep = _GLF_FUZZED(vec2(-7.3, -3.5));
                        {
                            if (GLF_live14looplimiter0 >= 3) {
                                do {
                                    ;
                                } while (_GLF_WRAPPED_LOOP(false));
                            }
                            GLF_live14looplimiter0++;
                            {
                                GLF_live14coord -= GLF_live14uvstep;
                                GLF_live14refh += GLF_live14slope;
                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                    GLF_live14h = texture(GLF_live14tex, GLF_live14coord).y;
                                } else {
                                }
                                GLF_live14i++;
                            }
                        }
                    }
                    {
                        float GLF_live7h0 = GLF_live7x0 - GLF_live7x2;
                        float GLF_live7h1 = GLF_live7x1 - GLF_live7x2;
                        if (_GLF_DEAD(false)) {
                            float donor_replacementGLF_dead18alpha1 = _GLF_FUZZED(c_re);
                            int donor_replacementGLF_dead18k = _GLF_FUZZED(findMSB(ivec3(-27875, -24764, 1666)).r);
                            vec4 donor_replacementGLF_dead18matrix_u = _GLF_FUZZED(vec4(7.4, -6.5, -303.081, 897.408));
                            for (int GLF_dead18u = GLF_dead18MATRIX_N - 1; GLF_dead18u >= donor_replacementGLF_dead18k; GLF_dead18u--) {
                                donor_replacementGLF_dead18alpha1 += donor_replacementGLF_dead18matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead18u, 4)] * donor_replacementGLF_dead18matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead18u, 4)];
                            }
                        }
                        float GLF_live7k0 = GLF_live7fx(GLF_live7x0) - GLF_live7fx(GLF_live7x2);
                        float GLF_live7k1 = GLF_live7fx(GLF_live7x1) - GLF_live7fx(GLF_live7x2);
                        do {
                            GLF_live7temp = GLF_live7x2;
                            if (_GLF_WRAPPED_IF_FALSE(false)) {
                            } else {
                                vec2 GLF_live14coord = _GLF_FUZZED((vec2(-9.5, 8.8) - vec2(7725.8474, -18.91)));
                                float GLF_live14h = _GLF_FUZZED((-3.0));
                                int GLF_live14i = _GLF_FUZZED((51302));
                                int GLF_live14looplimiter0 = 0;
                                float GLF_live14refh = _GLF_FUZZED(9.0);
                                float GLF_live14slope = _GLF_FUZZED(708.382);
                                vec2 GLF_live14uvstep = _GLF_FUZZED(vec2(7254.8335, 8023.3669));
                                {
                                    if (GLF_live14looplimiter0 >= 3) {
                                        ;
                                    }
                                    GLF_live14looplimiter0++;
                                    {
                                        GLF_live14coord -= GLF_live14uvstep;
                                        GLF_live14refh += GLF_live14slope;
                                        GLF_live14h = texture(GLF_live14tex, GLF_live14coord).y;
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            GLF_live14i++;
                                        } else {
                                        }
                                    }
                                }
                            }
                        } while (_GLF_WRAPPED_LOOP(false));
                        if (_GLF_WRAPPED_IF_FALSE(false)) {
                        } else {
                            GLF_live7A = (((GLF_live7h1) * (GLF_live7k0)) - ((GLF_live7h0) * (GLF_live7k1))) / ((((GLF_live7h0) * (GLF_live7h0)) * (GLF_live7h1)) - (((GLF_live7h1) * (GLF_live7h1)) * (GLF_live7h0)));
                        }
                        for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
                            GLF_live7B = (((GLF_live7k0) - (GLF_live7A * ((_GLF_IDENTITY((GLF_live7h0) * (GLF_live7h0), max((GLF_live7h0) * (GLF_live7h0), (GLF_live7h0) * (GLF_live7h0))))))) / (GLF_live7h0));
                        }
                        GLF_live7C = GLF_live7fx(GLF_live7x2);
                        GLF_live7x2 = GLF_live7x2 - ((2.0 * GLF_live7C) / (GLF_live7B + sign(GLF_live7B) * sqrt(max((GLF_live7B * GLF_live7B) - (4.0 * GLF_live7A * GLF_live7C), 0.0))));
                        if (_GLF_DEAD(false)) {
                            int donor_replacementGLF_dead15count = _GLF_FUZZED(sign(GLF_live7looplimiter0));
                            {
                                if ((GLF_live7looplimiter0 & 1) == 1) {
                                    GLF_live7looplimiter0 = 3 * GLF_live7looplimiter0 + 1;
                                } else {
                                    GLF_live7looplimiter0 /= 2;
                                }
                                donor_replacementGLF_dead15count++;
                            }
                        }
                        GLF_live7x0 = GLF_live7x1;
                        GLF_live7x1 = GLF_live7temp;
                        GLF_live7iterations++;
                    }
                }
            }
            for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != (1 & _GLF_IDENTITY(1, (1) | (1)))); _injected_loop_counter++) {
                if (_GLF_DEAD(false)) {
                    float donor_replacementGLF_dead18alpha1 = _GLF_FUZZED(xCoord);
                    vec4 donor_replacementGLF_dead18matrix_u = _GLF_FUZZED(_GLF_color);
                    int donor_replacementGLF_dead18u = _GLF_FUZZED(findMSB(ivec4(93067, -96225, 63853, 21754))[2]);
                    {
                        donor_replacementGLF_dead18alpha1 += donor_replacementGLF_dead18matrix_u[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead18u, 4)] * donor_replacementGLF_dead18matrix_u[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead18u, 4)];
                    }
                }
                do {
                    ;
                } while (_GLF_WRAPPED_LOOP(false));
            }
        }
    } else {
        if (iteration < bitfieldInsert(iterationCap, 0, 0, 0)) {
            return pickColor(iteration);
        } else {
            {
                int GLF_live7looplimiter0 = 0;
                if (_GLF_WRAPPED_IF_FALSE(false)) {
                } else {
                    if (GLF_live7looplimiter0 >= 4) {
                        do {
                            ;
                        } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.y < tan(tan(0.0))))));
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            int donor_replacementGLF_dead15count = _GLF_FUZZED(bitfieldReverse(-1997));
                            int donor_replacementGLF_dead15v = _GLF_FUZZED(sign(k));
                            while (donor_replacementGLF_dead15v > 1) {
                                if ((donor_replacementGLF_dead15v & 1) == 1) {
                                    donor_replacementGLF_dead15v = 3 * donor_replacementGLF_dead15v + 1;
                                } else {
                                    donor_replacementGLF_dead15v /= 2;
                                }
                                donor_replacementGLF_dead15count++;
                            }
                        }
                    }
                }
            }
            return vec3(xCoord / resolution.x, 0.0, yCoord / resolution.y);
        }
    }
    if (_GLF_DEAD(false)) {
        {
            if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            } else {
                discard;
            }
        }
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
        int donor_replacementGLF_dead4i = _GLF_FUZZED(_GLF_IDENTITY(abs(iteration), min(abs(iteration), abs(iteration))));
        float donor_replacementGLF_dead4limit = _GLF_FUZZED(dot(injectionSwitch, resolution));
        float donor_replacementGLF_dead4ref = _GLF_FUZZED(height);
        if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
        } else {
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < _GLF_IDENTITY(dot(vec4(0.0, 0.0, 1.0, 0.0), vec4(round(length(normalize(vec4(1.0, 1.0, 1.0, 1.0)))), 1.0, 0.0, 1.0)), dot(vec4(0.0, 0.0, 1.0, 0.0), vec4(round(length(normalize(vec4(1.0, 1.0, 1.0, 1.0)))), 1.0, 0.0, 1.0))))))) {
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    vec2 donor_replacementGLF_dead17color = _GLF_FUZZED(vec2(-55.83, 855.153));
                    vec3 donor_replacementGLF_dead17vecCoor = _GLF_FUZZED(exp((GLF_live7polynomial - donor_replacementGLF_dead4ref)));
                    {
                        donor_replacementGLF_dead17color = fract(sin(donor_replacementGLF_dead17vecCoor.yx - trunc(float(GLF_dead17data[1]))));
                        donor_replacementGLF_dead17color[1] *= atan(faceforward(GLF_dead17injectionSwitch, donor_replacementGLF_dead17color.xx, donor_replacementGLF_dead17vecCoor.yx).y);
                        ;
                    }
                }
                int donor_replacementGLF_dead8i = _GLF_FUZZED((iterationCap << iterationCap));
                {
                    vec2 GLF_live11coord = _GLF_FUZZED(vec2(1343.9931));
                    int GLF_live11i = _GLF_FUZZED((66824 & ivec3(53156, -99097, -43026)).p);
                    int GLF_live11looplimiter0 = 0;
                    vec4 GLF_live11texel = _GLF_FUZZED((vec4(3673.5608, 7613.8238, _GLF_IDENTITY(-230.875, max(-230.875, -230.875)), -5786.2813) - vec4(2.8, -9.8, -3.4, -213.119)));
                    while (GLF_live11texel.x + GLF_live11texel.y + GLF_live11texel.z > 1.0 && GLF_live11i < 16) {
                        if (_GLF_IDENTITY(GLF_live11looplimiter0 >= 7, false || (GLF_live11looplimiter0 >= 7))) {
                            break;
                        }
                        GLF_live11looplimiter0++;
                        {
                            GLF_live11coord = GLF_live11texel.xz + GLF_live11texel.yy;
                            GLF_live11coord = floor(_GLF_IDENTITY(GLF_live11coord * 256.0, min(GLF_live11coord * 256.0, _GLF_IDENTITY(GLF_live11coord * 256.0, (GLF_live11coord * 256.0) / vec2(1.0, 1.0))))) / 256.0;
                            if (_GLF_WRAPPED_IF_FALSE(false)) {
                            } else {
                                GLF_live11texel = texture(GLF_live11tex, GLF_live11coord);
                            }
                            GLF_live11i++;
                        }
                    }
                }
                float donor_replacementGLF_dead8limit = _GLF_FUZZED((GLF_dead5one / c_im));
                float donor_replacementGLF_dead8s = _GLF_FUZZED(xCoord);
                while (donor_replacementGLF_dead8i < bitfieldInsert(800, donor_replacementGLF_dead8i, 0, 0)) {
                    if (mod(float(donor_replacementGLF_dead8i), y) <= 0.01) {
                        donor_replacementGLF_dead8s += 0.2;
                        do {
                            {
                                ;
                            }
                        } while (_GLF_WRAPPED_LOOP(false));
                    }
                    if (float(donor_replacementGLF_dead8i) >= donor_replacementGLF_dead8limit) {
                        ;
                        {
                            vec2 GLF_live11coord = _GLF_FUZZED((+(mat3x2(9432.3977, -0.9, -7.5, 0.5, 2020.3508, -362.350) * vec3(81.61, -4.6, -6.1))));
                            int GLF_live11i = _GLF_FUZZED(((-52267) & (-50037)));
                            vec4 GLF_live11texel = _GLF_FUZZED(vec4(-62.41, 0.3, 66.21, 8.7));
                            {
                                int GLF_live11looplimiter0 = 0;
                                while (GLF_live11texel.x + GLF_live11texel.y + GLF_live11texel.z > 1.0 && GLF_live11i < 16) {
                                    if (GLF_live11looplimiter0 >= 7) {
                                        break;
                                    }
                                    GLF_live11looplimiter0++;
                                    {
                                        GLF_live11coord = GLF_live11texel.xz + GLF_live11texel.yy;
                                        GLF_live11coord = floor(GLF_live11coord * 256.0) / 256.0;
                                        GLF_live11texel = texture(GLF_live11tex, GLF_live11coord);
                                        for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < ((1 << _GLF_IDENTITY(int(4), int(4))) >> _GLF_IDENTITY(int(4), int(4)))); _injected_loop_counter++) {
                                            GLF_live11i++;
                                        }
                                    }
                                }
                            }
                        }
                    }
                    {
                        {
                            vec2 GLF_live11coord = _GLF_FUZZED(vec2(-21.80, 0.1));
                            int GLF_live11i = _GLF_FUZZED(int(true));
                            vec4 GLF_live11texel = _GLF_FUZZED(vec4(480.345, -2023.5821, 0.3, -2290.4174));
                            {
                                GLF_live11coord = GLF_live11texel.xz + GLF_live11texel.yy;
                                GLF_live11coord = floor(GLF_live11coord * 256.0) / 256.0;
                                if (_GLF_DEAD(false)) {
                                    float donor_replacementGLF_dead18alpha1 = _GLF_FUZZED(round(width));
                                    vec4 donor_replacementGLF_dead18matrix_u = _GLF_FUZZED(roundEven(GLF_live11texel));
                                    int donor_replacementGLF_dead18u = _GLF_FUZZED((GLF_live11i % (-33932)));
                                    {
                                        donor_replacementGLF_dead18alpha1 += donor_replacementGLF_dead18matrix_u[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead18u, 4)] * donor_replacementGLF_dead18matrix_u[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead18u, 4)];
                                    }
                                }
                                GLF_live11texel = texture(GLF_live11tex, GLF_live11coord);
                                GLF_live11i++;
                            }
                        }
                        int GLF_live10i = _GLF_FUZZED((-85542));
                        int GLF_live10iters = _GLF_FUZZED(83346);
                        int GLF_live10looplimiter0 = 0;
                        int GLF_live10v = _GLF_FUZZED(31534);
                        for (GLF_live10i = 0; GLF_live10i < GLF_live10iters; GLF_live10i++) {
                            if (GLF_live10looplimiter0 >= 4) {
                                break;
                            }
                            GLF_live10looplimiter0++;
                            if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            } else {
                                do {
                                    GLF_live10v = (4 * GLF_live10v * _GLF_IDENTITY((1000 - GLF_live10v), clamp((1000 - GLF_live10v), (1000 - GLF_live10v), (1000 - GLF_live10v)))) / 1000;
                                } while (_GLF_WRAPPED_LOOP(false));
                            }
                        }
                    }
                    _GLF_IDENTITY(donor_replacementGLF_dead8i++, 0 + (_GLF_IDENTITY(donor_replacementGLF_dead8i++, (_GLF_IDENTITY(donor_replacementGLF_dead8i++, ~(~(donor_replacementGLF_dead8i++)))) - 0)));
                }
            }
        }
        float donor_replacementGLF_dead4s = _GLF_FUZZED(sqrt(c_re));
        {
            if (mod(float(donor_replacementGLF_dead4i), donor_replacementGLF_dead4ref) <= 0.01) {
                donor_replacementGLF_dead4s += 0.2;
            }
            if (float(donor_replacementGLF_dead4i) >= donor_replacementGLF_dead4limit) {
                ;
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                float donor_replacementGLF_dead18alpha1 = _GLF_FUZZED(c_im);
                int donor_replacementGLF_dead18k = _GLF_FUZZED(k);
                vec4 donor_replacementGLF_dead18matrix_u = _GLF_FUZZED(GLF_live7_GLF_color);
                for (int GLF_dead18u = GLF_dead18MATRIX_N - 1; GLF_dead18u >= donor_replacementGLF_dead18k; GLF_dead18u--) {
                    donor_replacementGLF_dead18alpha1 += donor_replacementGLF_dead18matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead18u, 4)] * donor_replacementGLF_dead18matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead18u, 4)];
                }
            }
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            int donor_replacementGLF_dead6i = _GLF_FUZZED(k);
            for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > (0 | 0)); _injected_loop_counter--) {
                vec3 GLF_live9color = _GLF_FUZZED(vec3(3.6, -1.8, 872.220).xzy);
                {
                    vec2 GLF_live11coord = _GLF_FUZZED((mat2(mat2x4(-44.67, 3.9, -3.9, -2.8, -769.901, -6.6, 1.5, 9.3)) * vec2(-3.5, 99.06)));
                    int GLF_live11i = _GLF_FUZZED(-95676);
                    vec4 GLF_live11texel = _GLF_FUZZED(vec4(3352.1264, -257.195, 77.47, -4.0));
                    {
                        GLF_live11coord = GLF_live11texel.xz + GLF_live11texel.yy;
                        GLF_live11coord = floor(GLF_live11coord * 256.0) / 256.0;
                        GLF_live11texel = texture(GLF_live11tex, GLF_live11coord);
                        GLF_live11i++;
                    }
                }
                int GLF_live9count = _GLF_FUZZED(((-66111) + (-97785)));
                {
                    GLF_live9color -= GLF_live9palette(vec3(float(GLF_live9obj.numbers[4]) * 0.1), trunc(vec3(0.1)), vec3(float(GLF_live9obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_live9injectionSwitch.y), 10)]) * 0.1), vec3(GLF_live9injectionSwitch.x, float(GLF_live9obj.numbers[2]) * 0.1, float(GLF_live9obj.numbers[8]) * 0.1));
                    GLF_live9count++;
                }
            }
            {
                if (_GLF_DEAD(false)) {
                    {
                        discard;
                    }
                }
                {
                    ;
                }
            }
            vec4 donor_replacementGLF_dead6res = _GLF_FUZZED(acosh((_GLF_color - _GLF_color)));
            {
                do {
                    donor_replacementGLF_dead6res = GLF_dead6pal[_GLF_MAKE_IN_BOUNDS_INT((int(GLF_dead6picdata[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead6i, 8)].x) * int(GLF_dead6picdata[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead6i, 8)].y) + donor_replacementGLF_dead6i * _GLF_IDENTITY(9, (9) << 0) + 11) % 16, 16)];
                } while (_GLF_WRAPPED_LOOP(false));
            }
        }
        if (_GLF_DEAD(false)) {
            float donor_replacementGLF_dead18alpha1 = _GLF_FUZZED(xpos);
            int donor_replacementGLF_dead18k = _GLF_FUZZED(bitCount(packSnorm4x8(GLF_live7_GLF_color)));
            vec4 donor_replacementGLF_dead18matrix_u = _GLF_FUZZED(vec4(GLF_live7polynomial, determinant(GLF_dead5m44)));
            for (int GLF_dead18u = GLF_dead18MATRIX_N - 1; GLF_dead18u >= donor_replacementGLF_dead18k; GLF_dead18u--) {
                donor_replacementGLF_dead18alpha1 += donor_replacementGLF_dead18matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead18u, 4)] * donor_replacementGLF_dead18matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead18u, 4)];
            }
        }
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
        int donor_replacementGLF_dead17i = _GLF_FUZZED(bitfieldInsert(iterationCap, iterationCap, -9060, iteration));
        int donor_replacementGLF_dead17m = _GLF_FUZZED(bitCount(iteration));
        {
            int GLF_dead17from = donor_replacementGLF_dead17i;
            int GLF_dead17mid = donor_replacementGLF_dead17i + donor_replacementGLF_dead17m - 1;
            int GLF_dead17to = min(donor_replacementGLF_dead17i + 2 * donor_replacementGLF_dead17m - 1, iteration);
            GLF_dead17merge(GLF_dead17from, GLF_dead17mid, GLF_dead17to);
        }
    }
    {
        {
            ;
        }
    }
}

void main() {
    int msb16 = 65536;
    uint uselessOutVariable;
    {
        {
            ;
        }
    }
    vec3 data[16];
    if (_GLF_WRAPPED_IF_TRUE(true)) {
        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
            for (int i = 0; i < findMSB(16); i++) {
                for (int j = 0; j < findLSB(16); j++) {
                    data[uaddCarry(uint(4 * j), uint(i), uselessOutVariable)] = mand(gl_FragCoord.x + float(i - bitCount(1)), gl_FragCoord.y + float(j - bitCount(1)));
                }
            }
        } else {
        }
    } else {
    }
    vec3 sum = vec3(0.0);
    for (int i = bitfieldReverse(0); i < findMSB(msb16); i++) {
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            int donor_replacementGLF_dead5cols = _GLF_FUZZED(i);
            if (_GLF_DEAD(false)) {
                if (_GLF_DEAD(false)) {
                    int donor_replacementGLF_dead17i = _GLF_FUZZED(i);
                    int donor_replacementGLF_dead17j = _GLF_FUZZED(bitCount(donor_replacementGLF_dead5cols));
                    int donor_replacementGLF_dead17k = _GLF_FUZZED(i);
                    int donor_replacementGLF_dead17mid = _GLF_FUZZED(floatBitsToInt(vec2(79.92, -41.54))[0]);
                    int donor_replacementGLF_dead17to = _GLF_FUZZED(bitCount(145439u));
                    while (donor_replacementGLF_dead17i <= donor_replacementGLF_dead17mid && donor_replacementGLF_dead17j <= donor_replacementGLF_dead17to) {
                        if (GLF_dead17data[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead17i, 10)] < GLF_dead17data[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead17j, 10)]) {
                            GLF_dead17temp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead17k++, 10)] = GLF_dead17data[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead17i++, 10)];
                        } else {
                            GLF_dead17temp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead17k++, 10)] = GLF_dead17data[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead17j++, 10)];
                        }
                    }
                }
                {
                    int GLF_live9h = _GLF_FUZZED(((-50615) - ((-32286) + (-66176))));
                    {
                        {
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                int donor_replacementGLF_dead18i = _GLF_FUZZED(findMSB(uselessOutVariable));
                                mat4 donor_replacementGLF_dead18matrix_a = _GLF_FUZZED(((mat2x4(-542.385, 4.7, -1881.7717, -735.863, -5202.6146, 53.01, -4.9, -178.941) + 7.7) * mat4x2(-0.6, 2.9, -2063.6709, 4.8, 113.640, 4101.7752, -62.74, -262.269)));
                                vec4 donor_replacementGLF_dead18matrix_b = _GLF_FUZZED(vec4(-1504.5513, -470.996, -8.4, 197.980));
                                {
                                    for (int GLF_dead18j = (GLF_dead18MATRIX_N - 1); GLF_dead18j >= (donor_replacementGLF_dead18i + 1); GLF_dead18j--) {
                                        donor_replacementGLF_dead18matrix_b[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead18i, 4)] -= (donor_replacementGLF_dead18matrix_a[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead18i, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead18j, 4)] * donor_replacementGLF_dead18matrix_b[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead18j, 4)]);
                                    }
                                    donor_replacementGLF_dead18matrix_b[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead18i, 4)] /= donor_replacementGLF_dead18matrix_a[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead18i, 4)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead18i, 4)];
                                }
                            }
                            ;
                        }
                    }
                    int GLF_live9i = _GLF_FUZZED(67374);
                    int GLF_live9l = _GLF_IDENTITY(_GLF_FUZZED(int(184053u)), clamp(_GLF_FUZZED(int(184053u)), _GLF_FUZZED(int(184053u)), _GLF_IDENTITY(_GLF_FUZZED(int(184053u)), 0 ^ (_GLF_IDENTITY(_GLF_FUZZED(int(184053u)), max(_GLF_FUZZED(int(184053u)), _GLF_FUZZED(int(184053u))))))));
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        int donor_replacementGLF_dead15v = _GLF_FUZZED(ivec2(48085, 3179)[0]);
                        {
                            donor_replacementGLF_dead15v = 3 * donor_replacementGLF_dead15v + 1;
                        }
                    }
                    int GLF_live9looplimiter0 = 0;
                    int GLF_live9pivot = _GLF_FUZZED((+(-92185)));
                    for (int GLF_live9j = GLF_live9l; GLF_live9j <= GLF_live9h - 1; GLF_live9j++) {
                        if (GLF_live9looplimiter0 >= 6) {
                            break;
                        }
                        do {
                            GLF_live9looplimiter0++;
                        } while (_GLF_WRAPPED_LOOP(false));
                        {
                            do {
                                if (GLF_live9obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9j, 10)] <= GLF_live9pivot) {
                                    GLF_live9i++;
                                    GLF_live9swap(GLF_live9i, GLF_live9j);
                                }
                            } while (_GLF_WRAPPED_LOOP(false));
                        }
                    }
                }
                {
                    vec2 GLF_live11coord = _GLF_FUZZED((mat2x4(-33.36, -112.705, 9.5, 2.3, 0.0, 5114.6971, -6.9, -744.494) * vec2(-466.584, 59.92)).pq);
                    int GLF_live11i = _GLF_FUZZED(-49341);
                    int GLF_live11looplimiter0 = 0;
                    vec4 GLF_live11texel = _GLF_FUZZED(vec4(23.36));
                    {
                        if (GLF_live11looplimiter0 >= 7) {
                            ;
                        }
                        GLF_live11looplimiter0++;
                        {
                            GLF_live11coord = GLF_live11texel.xz + GLF_live11texel.yy;
                            GLF_live11coord = floor(GLF_live11coord * 256.0) / 256.0;
                            GLF_live11texel = texture(GLF_live11tex, GLF_live11coord);
                            GLF_live11i++;
                        }
                    }
                }
                int donor_replacementGLF_dead8i = _GLF_FUZZED(donor_replacementGLF_dead5cols);
                float donor_replacementGLF_dead8limit = _GLF_FUZZED(((GLF_dead5one - 599.921) + degrees(GLF_dead5one)));
                float donor_replacementGLF_dead8ref = _GLF_FUZZED(GLF_dead5one);
                float donor_replacementGLF_dead8s = _GLF_FUZZED(min(dot(sum, sum), GLF_dead5one));
                while (donor_replacementGLF_dead8i < bitfieldInsert(800, _GLF_IDENTITY(donor_replacementGLF_dead8i, (int(_GLF_ZERO(0.0, injectionSwitch.x)) << _GLF_IDENTITY(int(0), _GLF_IDENTITY(int(0), ~(~(int(0)))))) ^ (_GLF_IDENTITY(donor_replacementGLF_dead8i, (_GLF_IDENTITY(donor_replacementGLF_dead8i, 1 * (donor_replacementGLF_dead8i))) / 1))), 0, 0)) {
                    if (mod(float(donor_replacementGLF_dead8i), donor_replacementGLF_dead8ref) <= 0.01) {
                        for (int _injected_loop_counter = _GLF_IDENTITY(((1 << _GLF_IDENTITY(int(5), _GLF_IDENTITY(int(5), clamp(int(5), _GLF_IDENTITY(int(_GLF_IDENTITY(5, min(5, 5))), max(int(_GLF_IDENTITY(5, min(5, 5))), int(_GLF_IDENTITY(5, min(5, 5))))), int(5))))) >> _GLF_IDENTITY(int(5), int(5))), ~(~(((1 << _GLF_IDENTITY(int(5), _GLF_IDENTITY(int(5), clamp(int(5), _GLF_IDENTITY(int(_GLF_IDENTITY(5, min(5, 5))), max(int(_GLF_IDENTITY(5, min(5, 5))), int(_GLF_IDENTITY(5, min(5, 5))))), int(5))))) >> _GLF_IDENTITY(int(5), int(5)))))); _GLF_WRAPPED_LOOP(_injected_loop_counter > (0 << _GLF_IDENTITY(int(2), _GLF_IDENTITY(int(2), (int(2)) << 0)))); _injected_loop_counter--) {
                            for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != 0); _injected_loop_counter--) {
                                vec2 GLF_live11coord = _GLF_FUZZED((vec2(3.3, -6727.4549)));
                                int GLF_live11i = _GLF_FUZZED(ivec2(_GLF_IDENTITY(69900, int(_GLF_IDENTITY(ivec4(69900, 0, 1, 1), (true ? _GLF_IDENTITY(ivec4(69900, 0, 1, 1), max(ivec4(69900, 0, 1, 1), ivec4(69900, 0, 1, 1))) : _GLF_FUZZED(ivec4(-32204, 72794, -71608, 33726)))))), _GLF_IDENTITY(62418, (false ? _GLF_FUZZED(donor_replacementGLF_dead5cols) : 62418))).g);
                                vec4 GLF_live11texel = _GLF_FUZZED(vec4(4.2, -2.8, -6.3, 2.8));
                                {
                                    int GLF_live11looplimiter0 = 0;
                                    while (GLF_live11texel.x + GLF_live11texel.y + GLF_live11texel.z > 1.0 && GLF_live11i < 16) {
                                        if (GLF_live11looplimiter0 >= 7) {
                                            if (_GLF_DEAD(false)) {
                                                int donor_replacementGLF_dead15count = _GLF_FUZZED(donor_replacementGLF_dead5cols);
                                                int donor_replacementGLF_dead15v = _GLF_FUZZED(i);
                                                {
                                                    if ((donor_replacementGLF_dead15v & 1) == 1) {
                                                        donor_replacementGLF_dead15v = 3 * donor_replacementGLF_dead15v + 1;
                                                    } else {
                                                        donor_replacementGLF_dead15v /= 2;
                                                    }
                                                    donor_replacementGLF_dead15count++;
                                                }
                                            }
                                            break;
                                        }
                                        GLF_live11looplimiter0++;
                                        {
                                            GLF_live11coord = GLF_live11texel.xz + GLF_live11texel.yy;
                                            GLF_live11coord = floor(GLF_live11coord * 256.0) / 256.0;
                                            if (_GLF_DEAD(false)) {
                                                float donor_replacementGLF_dead18beta = _GLF_FUZZED(min(donor_replacementGLF_dead8s, donor_replacementGLF_dead8s));
                                                int donor_replacementGLF_dead18j = _GLF_FUZZED(((-60178) % _injected_loop_counter));
                                                int donor_replacementGLF_dead18k = _GLF_FUZZED((_injected_loop_counter | (msb16 << 1250)));
                                                mat4 donor_replacementGLF_dead18matrix_a = _GLF_FUZZED((mat4(4.0, -22.93, 1.8, -47.35, -79.28, -668.398, 3.3, 45.17, 427.224, -3307.5683, -2.6, -89.45, -3.1, -9.7, -5634.7504, -297.087)));
                                                vec4 donor_replacementGLF_dead18matrix_u = _GLF_FUZZED(vec4(1.6, 2.1, 18.48, 4248.1298));
                                                for (int GLF_dead18a = GLF_dead18MATRIX_N - 1; GLF_dead18a >= donor_replacementGLF_dead18k; GLF_dead18a--) {
                                                    donor_replacementGLF_dead18matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead18a, 4)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead18j, 4)] = donor_replacementGLF_dead18matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead18a, 4)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead18j, 4)] - (donor_replacementGLF_dead18beta * donor_replacementGLF_dead18matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead18a, 4)]);
                                                }
                                            }
                                            GLF_live11texel = texture(GLF_live11tex, GLF_live11coord);
                                            do {
                                                GLF_live11i++;
                                            } while (_GLF_WRAPPED_LOOP(false));
                                        }
                                    }
                                }
                            }
                            donor_replacementGLF_dead8s += 0.2;
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        vec2 donor_replacementGLF_dead17color = _GLF_FUZZED((+GLF_live9injectionSwitch));
                        vec3 donor_replacementGLF_dead17vecCoor = _GLF_FUZZED((mat4x3(-386.809, -456.571, -909.384, 119.578, 6.8, 5.3, 7.8, 486.729, -2.8, 66.07, -5639.6646, 202.632) * vec4(resolution, ((-560.394) - donor_replacementGLF_dead8ref), abs(donor_replacementGLF_dead8ref))));
                        if (int(GLF_dead17gl_FragCoord[1]) < 270) {
                            donor_replacementGLF_dead17color = fract(sin(donor_replacementGLF_dead17vecCoor.yx - trunc(float(GLF_dead17data[7]))));
                            donor_replacementGLF_dead17color.y *= mix(normalize(donor_replacementGLF_dead17vecCoor), normalize(vec3(donor_replacementGLF_dead17color, degrees(donor_replacementGLF_dead17color.x))), GLF_dead17injectionSwitch.x).y;
                            break;
                        } else {
                            discard;
                        }
                    }
                    if (float(donor_replacementGLF_dead8i) >= donor_replacementGLF_dead8limit) {
                        do {
                            ;
                        } while (_GLF_WRAPPED_LOOP(false));
                    }
                    donor_replacementGLF_dead8i++;
                }
                {
                    vec2 GLF_live11coord = _GLF_FUZZED(vec2(-838.671, 2.7));
                    int GLF_live11i = _GLF_FUZZED(-45961);
                    vec4 GLF_live11texel = _GLF_FUZZED(vec4(7.7, 749.800, 7146.9903, -5.1));
                    {
                        int GLF_live11looplimiter0 = 0;
                        while (GLF_live11texel.x + GLF_live11texel.y + GLF_live11texel.z > 1.0 && GLF_live11i < 16) {
                            if (GLF_live11looplimiter0 >= 7) {
                                break;
                            }
                            GLF_live11looplimiter0++;
                            {
                                if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                } else {
                                    if (_GLF_DEAD(false)) {
                                        vec4 donor_replacementGLF_dead18matrix_u = _GLF_FUZZED((_GLF_color * donor_replacementGLF_dead8ref));
                                        {
                                            donor_replacementGLF_dead8s += donor_replacementGLF_dead18matrix_u[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead8i, 4)] * donor_replacementGLF_dead18matrix_u[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead8i, 4)];
                                        }
                                    }
                                    GLF_live11coord = GLF_live11texel.xz + GLF_live11texel.yy;
                                }
                                GLF_live11coord = floor(GLF_live11coord * 256.0) / 256.0;
                                GLF_live11texel = texture(GLF_live11tex, GLF_live11coord);
                                GLF_live11i++;
                            }
                        }
                        if (_GLF_DEAD(false)) {
                            int donor_replacementGLF_dead15v = _GLF_FUZZED(GLF_live11i);
                            if ((donor_replacementGLF_dead15v & 1) == 1) {
                                donor_replacementGLF_dead15v = 3 * donor_replacementGLF_dead15v + 1;
                            } else {
                                donor_replacementGLF_dead15v /= 2;
                            }
                        }
                    }
                }
            }
            {
                for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != (1 & 1)); _injected_loop_counter++) {
                    for (int GLF_dead5rows = _GLF_IDENTITY(2, (_GLF_IDENTITY(2, (false ? _GLF_FUZZED(_injected_loop_counter) : 2))) ^ 0); GLF_dead5rows <= 4; GLF_dead5rows++) {
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(true, (true) || false))) {
                            for (int GLF_dead5c = 0; GLF_dead5c < donor_replacementGLF_dead5cols; GLF_dead5c++) {
                                for (int GLF_dead5r = 0; GLF_dead5r < GLF_dead5rows; GLF_dead5r++) {
                                    switch (uselessOutVariable) {
                                        case 0u:
                                            GLF_dead5m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead5c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead5r, 2)] = GLF_dead5one;
                                            {
                                                if (_GLF_DEAD(false)) {
                                                    int donor_replacementGLF_dead17high = _GLF_FUZZED(7506);
                                                    int donor_replacementGLF_dead17i = _GLF_FUZZED(_injected_loop_counter);
                                                    int donor_replacementGLF_dead17m = _GLF_FUZZED(-17926);
                                                    {
                                                        int GLF_dead17from = donor_replacementGLF_dead17i;
                                                        int GLF_dead17mid = donor_replacementGLF_dead17i + donor_replacementGLF_dead17m - 1;
                                                        int GLF_dead17to = min(donor_replacementGLF_dead17i + 2 * donor_replacementGLF_dead17m - 1, donor_replacementGLF_dead17high);
                                                        GLF_dead17merge(GLF_dead17from, GLF_dead17mid, GLF_dead17to);
                                                    }
                                                }
                                                int GLF_live11looplimiter0 = 0;
                                                if (GLF_live11looplimiter0 >= 7) {
                                                    ;
                                                    if (_GLF_DEAD(_GLF_IDENTITY(false, (false) || false))) {
                                                        int donor_replacementGLF_dead15v = _GLF_FUZZED(((-89977) & GLF_dead5c));
                                                        {
                                                            donor_replacementGLF_dead15v = 3 * donor_replacementGLF_dead15v + 1;
                                                        }
                                                    }
                                                }
                                            }
                                            break;
                                        case 1u:
                                            do {
                                                GLF_dead5m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead5c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead5r, 3)] = GLF_dead5one;
                                            } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
                                            break;
                                        case 2u:
                                            {
                                                vec2 GLF_live11coord = _GLF_FUZZED((vec2(5.6, 6172.0487) - (vec2(-636.263, -3.9))));
                                                int GLF_live11i = _GLF_FUZZED(-85076);
                                                int GLF_live11looplimiter0 = 0;
                                                vec4 GLF_live11texel = _GLF_FUZZED(vec4(-4.3, 8.5, -670.385, 32.05));
                                                while (GLF_live11texel.x + GLF_live11texel.y + GLF_live11texel.z > 1.0 && GLF_live11i < 16) {
                                                    if (GLF_live11looplimiter0 >= 7) {
                                                        break;
                                                    }
                                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                                        GLF_live11looplimiter0++;
                                                    } else {
                                                    }
                                                    {
                                                        GLF_live11coord = GLF_live11texel.xz + GLF_live11texel.yy;
                                                        GLF_live11coord = floor(GLF_live11coord * 256.0) / 256.0;
                                                        GLF_live11texel = texture(GLF_live11tex, GLF_live11coord);
                                                        GLF_live11i++;
                                                    }
                                                }
                                            }
                                            GLF_dead5m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead5c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead5r, 4)] = GLF_dead5one;
                                            break;
                                        case 3u:
                                            if (_GLF_DEAD(false)) {
                                                int donor_replacementGLF_dead6i = _GLF_FUZZED(66766);
                                                vec4 donor_replacementGLF_dead6res = _GLF_FUZZED(exp2(vec4(6.6, -482.204, -622.722, 567.003)));
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                    int donor_replacementGLF_dead18i = _GLF_FUZZED(max(GLF_dead5c, (donor_replacementGLF_dead6i >> _injected_loop_counter)));
                                                    mat4 donor_replacementGLF_dead18matrix_a = _GLF_FUZZED(mat4(-3505.6989, 9.6, 38.46, -953.722, 34.62, -519.263, 79.76, 9771.0293, 4801.4173, -3.5, 27.95, 4.9, 88.65, -7.4, 5.4, 0.0));
                                                    vec4 donor_replacementGLF_dead18matrix_b = _GLF_FUZZED(_GLF_color);
                                                    {
                                                        for (int GLF_dead18j = (GLF_dead18MATRIX_N - 1); GLF_dead18j >= (donor_replacementGLF_dead18i + 1); GLF_dead18j--) {
                                                            donor_replacementGLF_dead18matrix_b[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead18i, 4)] -= (donor_replacementGLF_dead18matrix_a[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead18i, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead18j, 4)] * donor_replacementGLF_dead18matrix_b[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead18j, 4)]);
                                                        }
                                                        donor_replacementGLF_dead18matrix_b[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead18i, 4)] /= donor_replacementGLF_dead18matrix_a[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead18i, 4)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead18i, 4)];
                                                    }
                                                }
                                                {
                                                    do {
                                                        {
                                                            vec2 GLF_live11coord = _GLF_FUZZED(vec2(-88.38));
                                                            int GLF_live11i = _GLF_FUZZED(ivec3(36990, 74820, -59800).r);
                                                            vec4 GLF_live11texel = _GLF_FUZZED(vec4(-957.704, 2.2, -8.4, 5346.7277));
                                                            {
                                                                GLF_live11coord = GLF_live11texel.xz + GLF_live11texel.yy;
                                                                GLF_live11coord = floor(GLF_live11coord * 256.0) / 256.0;
                                                                GLF_live11texel = texture(GLF_live11tex, GLF_live11coord);
                                                                GLF_live11i++;
                                                            }
                                                        }
                                                        donor_replacementGLF_dead6res = GLF_dead6pal[_GLF_MAKE_IN_BOUNDS_INT((int(GLF_dead6picdata[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead6i, 8)].x) * int(GLF_dead6picdata[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead6i, 8)].y) + donor_replacementGLF_dead6i * 9 + 11) % 16, 16)];
                                                    } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
                                                }
                                            }
                                            if (_GLF_WRAPPED_IF_FALSE(false)) {
                                            } else {
                                                GLF_dead5m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead5c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead5r, 2)] = GLF_dead5one;
                                            }
                                            if (_GLF_DEAD(false)) {
                                                float donor_replacementGLF_dead8s = _GLF_FUZZED(tan(0.7));
                                                {
                                                    donor_replacementGLF_dead8s += 0.2;
                                                }
                                            }
                                            {
                                                vec2 GLF_live14coord = _GLF_FUZZED((mat4x2(4.4, 89.05, 6853.5970, -1098.9945, 0.4, 1163.5150, -5.6, -46.82) * vec4(2320.6405, 2084.3222, -7615.7691, -1.4)));
                                                float GLF_live14h = _GLF_FUZZED(float(true));
                                                int GLF_live14i = _GLF_FUZZED((((-87472) < (-30020)) ? (-48088) : (-92325)));
                                                float GLF_live14refh = _GLF_FUZZED(7.8);
                                                float GLF_live14slope = _GLF_FUZZED((false ? (-6416.6717) : 1.4));
                                                vec2 GLF_live14uvstep = _GLF_FUZZED(vec2((vec3(4980.1825, -5044.5958, 1418.5607) - (-59.77))));
                                                {
                                                    GLF_live14coord -= GLF_live14uvstep;
                                                    GLF_live14refh += GLF_live14slope;
                                                    GLF_live14h = texture(GLF_live14tex, GLF_live14coord).y;
                                                    GLF_live14i++;
                                                }
                                            }
                                            break;
                                            if (_GLF_WRAPPED_IF_FALSE(false)) {
                                            } else {
                                                int GLF_live10looplimiter0 = 0;
                                                if (GLF_live10looplimiter0 >= 4) {
                                                    for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
                                                        if (_GLF_DEAD(false)) {
                                                            float donor_replacementGLF_dead18magnitudeX = _GLF_FUZZED(3.0);
                                                            mat4 donor_replacementGLF_dead18matrix_a = _GLF_FUZZED(((-3866.0425) + mat4(GLF_dead5m42)));
                                                            int donor_replacementGLF_dead18x = _GLF_FUZZED((min(GLF_dead5r, GLF_live10looplimiter0) | msb16));
                                                            {
                                                                donor_replacementGLF_dead18magnitudeX += donor_replacementGLF_dead18matrix_a[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead18x, 4)][_GLF_MAKE_IN_BOUNDS_INT(i, 4)] * donor_replacementGLF_dead18matrix_a[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead18x, 4)][_GLF_MAKE_IN_BOUNDS_INT(i, 4)];
                                                                _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead18x, 4)] = donor_replacementGLF_dead18matrix_a[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead18x, 4)][_GLF_MAKE_IN_BOUNDS_INT(i, 4)];
                                                            }
                                                        }
                                                        ;
                                                        if (_GLF_DEAD(false)) {
                                                            float donor_replacementGLF_dead18alpha3 = _GLF_FUZZED(log2(GLF_dead5one));
                                                            int donor_replacementGLF_dead18j = _GLF_FUZZED(66272);
                                                            int donor_replacementGLF_dead18k = _GLF_FUZZED(GLF_live10looplimiter0);
                                                            mat4 donor_replacementGLF_dead18matrix_a = _GLF_FUZZED(inverse(mat4(8.0, -29.87, 70.59, 8.7, 1956.1342, -87.14, -22.17, 13.21, -3339.6168, -663.760, 8451.8962, 93.82, 4.4, -9.0, 298.925, -456.825)));
                                                            vec4 donor_replacementGLF_dead18matrix_u = _GLF_FUZZED(resolution.yyyy);
                                                            for (int GLF_dead18a = GLF_dead18MATRIX_N - 1; GLF_dead18a >= donor_replacementGLF_dead18k; GLF_dead18a--) {
                                                                donor_replacementGLF_dead18alpha3 += donor_replacementGLF_dead18matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead18a, 4)] * donor_replacementGLF_dead18matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead18a, 4)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead18j, 4)];
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                            if (_GLF_DEAD(false)) {
                                                int donor_replacementGLF_dead18i = _GLF_FUZZED(GLF_dead5c);
                                                for (int GLF_dead18j = (GLF_dead18MATRIX_N - 1); GLF_dead18j >= (donor_replacementGLF_dead18i + 1); GLF_dead18j--) {
                                                    GLF_live7_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead18i, 4)] -= (GLF_dead5m44[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead18i, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead18j, 4)] * GLF_live7_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead18j, 4)]);
                                                }
                                            }
                                        case 4u:
                                            {
                                                vec2 GLF_live14coord = _GLF_FUZZED((vec2(-555.484, -2.2) + vec2(-460.985, 2.3)));
                                                float GLF_live14h = _GLF_FUZZED(vec4(-7028.7027, -0.2, 6.3, 56.26).w);
                                                int GLF_live14i = _GLF_FUZZED((-94465));
                                                float GLF_live14refh = _GLF_FUZZED(86.28);
                                                float GLF_live14slope = _GLF_FUZZED(-6933.9085);
                                                vec2 GLF_live14uvstep = _GLF_FUZZED(((mat2(-15.25, 256.677, -5.6, -304.139) * (-mat4x2(-6571.9555, 48.13, -4.2, -382.992, -20.09, 4957.7601, -0.7, -64.20))) * vec4(-21.61, -27.74, 9.3, 26.54)));
                                                {
                                                    GLF_live14coord -= GLF_live14uvstep;
                                                    GLF_live14refh += GLF_live14slope;
                                                    do {
                                                        GLF_live14h = texture(GLF_live14tex, GLF_live14coord).y;
                                                    } while (_GLF_WRAPPED_LOOP(false));
                                                    GLF_live14i++;
                                                }
                                            }
                                            GLF_dead5m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead5c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead5r, 3)] = GLF_dead5one;
                                            break;
                                        case 5u:
                                            {
                                                vec2 GLF_live14coord = _GLF_FUZZED(vec2(1870.5909, -588.036));
                                                float GLF_live14h = _GLF_FUZZED(vec2(2.9, 7949.2678).y);
                                                int GLF_live14i = _GLF_FUZZED(-42032);
                                                float GLF_live14refh = _GLF_FUZZED((-1946.1789));
                                                float GLF_live14slope = _GLF_FUZZED(8576.5730);
                                                vec2 GLF_live14uvstep = _GLF_FUZZED(vec2(vec3(67.50, -70.62, 3.9)));
                                                {
                                                    int GLF_live14looplimiter0 = 0;
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                        int donor_replacementGLF_dead17high = _GLF_FUZZED(floatBitsToInt(GLF_dead5one));
                                                        int donor_replacementGLF_dead17low = _GLF_FUZZED(bitfieldReverse(_injected_loop_counter));
                                                        for (int GLF_dead17m = 1; GLF_dead17m <= donor_replacementGLF_dead17high; GLF_dead17m = 2 * GLF_dead17m) {
                                                            for (int GLF_dead17i = donor_replacementGLF_dead17low; GLF_dead17i < donor_replacementGLF_dead17high; GLF_dead17i += 2 * GLF_dead17m) {
                                                                int GLF_dead17from = GLF_dead17i;
                                                                int GLF_dead17mid = GLF_dead17i + GLF_dead17m - 1;
                                                                int GLF_dead17to = min(GLF_dead17i + 2 * GLF_dead17m - 1, donor_replacementGLF_dead17high);
                                                                GLF_dead17merge(GLF_dead17from, GLF_dead17mid, GLF_dead17to);
                                                            }
                                                        }
                                                    }
                                                    while (GLF_live14h < GLF_live14refh && GLF_live14i < 32) {
                                                        if (GLF_live14looplimiter0 >= 3) {
                                                            break;
                                                        }
                                                        if (_GLF_DEAD(false)) {
                                                            int donor_replacementGLF_dead18a = _GLF_FUZZED(_injected_loop_counter);
                                                            float donor_replacementGLF_dead18alpha3 = _GLF_FUZZED(fma(GLF_live14refh, sinh(log2(GLF_live14refh)), -0.3));
                                                            int donor_replacementGLF_dead18j = _GLF_FUZZED(max(sign(_injected_loop_counter), 59931));
                                                            mat4 donor_replacementGLF_dead18matrix_a = _GLF_FUZZED(inverse((mat4(-8.2, -3.6, -9.2, 1.3, -52.62, -773.823, 59.60, -54.44, -2.3, -87.53, -2014.8350, -1.5, -8.9, -45.50, -7.1, 4418.0289) * log2(110.122))));
                                                            {
                                                                donor_replacementGLF_dead18alpha3 += GLF_live7_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead18a, 4)] * donor_replacementGLF_dead18matrix_a[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead18a, 4)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead18j, 4)];
                                                            }
                                                        }
                                                        GLF_live14looplimiter0++;
                                                        {
                                                            do {
                                                                GLF_live14coord -= GLF_live14uvstep;
                                                            } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))));
                                                            GLF_live14refh += GLF_live14slope;
                                                            GLF_live14h = _GLF_IDENTITY(texture(GLF_live14tex, GLF_live14coord).y, (_GLF_FALSE(false, (gl_FragCoord.y < 0.0)) ? _GLF_FUZZED(GLF_live14refh) : texture(GLF_live14tex, GLF_live14coord).y));
                                                            if (_GLF_DEAD(false)) {
                                                                vec4 donor_replacementGLF_dead18matrix_b = _GLF_FUZZED(GLF_live7_GLF_color);
                                                                for (int GLF_dead18i = (GLF_dead18MATRIX_N - 1); GLF_dead18i >= 0; GLF_dead18i--) {
                                                                    for (int GLF_dead18j = (GLF_dead18MATRIX_N - 1); GLF_dead18j >= (GLF_dead18i + 1); GLF_dead18j--) {
                                                                        donor_replacementGLF_dead18matrix_b[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead18i, 4)] -= (GLF_dead5m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead18i, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead18j, 4)] * donor_replacementGLF_dead18matrix_b[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead18j, 4)]);
                                                                    }
                                                                    donor_replacementGLF_dead18matrix_b[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead18i, 4)] /= GLF_dead5m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead18i, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead18i, 4)];
                                                                }
                                                            }
                                                            GLF_live14i++;
                                                            if (_GLF_DEAD(false)) {
                                                                vec2 donor_replacementGLF_dead17color = _GLF_FUZZED(vec2(45.73, -3.1));
                                                                vec3 donor_replacementGLF_dead17vecCoor = _GLF_FUZZED(exp(sum));
                                                                if (int(GLF_dead17gl_FragCoord[1]) < 120) {
                                                                    donor_replacementGLF_dead17color = fract(acosh(clamp(donor_replacementGLF_dead17vecCoor.yx - trunc(float(GLF_dead17data[3])), 1.0, 1000.0)));
                                                                    donor_replacementGLF_dead17color.x += (isnan(GLF_dead17gl_FragCoord.x) ? log2(GLF_dead17gl_FragCoord.x) : log2(GLF_dead17gl_FragCoord.y));
                                                                    break;
                                                                } else if (int(GLF_dead17gl_FragCoord[1]) < 150) {
                                                                    discard;
                                                                } else if (int(GLF_dead17gl_FragCoord[1]) < 180) {
                                                                    donor_replacementGLF_dead17color = fract(sin(donor_replacementGLF_dead17vecCoor.yx - trunc(float(GLF_dead17data[4]))));
                                                                    donor_replacementGLF_dead17color[1] += asinh(GLF_dead17gl_FragCoord.y * ldexp(donor_replacementGLF_dead17color.y, -GLF_dead5c));
                                                                    break;
                                                                } else if (int(GLF_dead17gl_FragCoord[1]) < 210) {
                                                                    donor_replacementGLF_dead17color = fract(sin(donor_replacementGLF_dead17vecCoor.yx - trunc(float(GLF_dead17data[5]))));
                                                                    donor_replacementGLF_dead17color.y -= tanh(donor_replacementGLF_dead17color.x) / cosh(donor_replacementGLF_dead17color.y);
                                                                    break;
                                                                } else if (int(GLF_dead17gl_FragCoord[1]) < 240) {
                                                                    donor_replacementGLF_dead17color = fract(asinh(donor_replacementGLF_dead17vecCoor.yx - trunc(float(GLF_dead17data[6]))));
                                                                    donor_replacementGLF_dead17color.y -= isnan(float(GLF_dead5c)) ? tanh(GLF_dead17gl_FragCoord.x) : atanh(GLF_dead17gl_FragCoord.y / GLF_dead17resolution.y);
                                                                    break;
                                                                } else if (int(GLF_dead17gl_FragCoord[1]) < 270) {
                                                                    donor_replacementGLF_dead17color = fract(sin(donor_replacementGLF_dead17vecCoor.yx - trunc(float(GLF_dead17data[7]))));
                                                                    donor_replacementGLF_dead17color.y *= mix(normalize(donor_replacementGLF_dead17vecCoor), normalize(vec3(donor_replacementGLF_dead17color, degrees(donor_replacementGLF_dead17color.x))), GLF_dead17injectionSwitch.x).y;
                                                                    break;
                                                                } else {
                                                                    discard;
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                            GLF_dead5m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead5c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead5r, 4)] = GLF_dead5one;
                                            break;
                                        case 6u:
                                            GLF_dead5m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead5c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead5r, 2)] = GLF_dead5one;
                                            {
                                                int GLF_live14looplimiter0 = 0;
                                                if (GLF_live14looplimiter0 >= 3) {
                                                    ;
                                                }
                                                if (_GLF_DEAD(false)) {
                                                    int donor_replacementGLF_dead17j = _GLF_FUZZED(i);
                                                    int donor_replacementGLF_dead17k = _GLF_FUZZED(i);
                                                    {
                                                        GLF_dead17temp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead17k++, 10)] = GLF_dead17data[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead17j++, 10)];
                                                    }
                                                }
                                            }
                                            break;
                                        case 7u:
                                            GLF_dead5m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead5c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead5r, 3)] = GLF_dead5one;
                                            break;
                                            {
                                                vec2 GLF_live11coord = _GLF_FUZZED(vec2(-406.255, -8872.7014));
                                                int GLF_live11i = _GLF_FUZZED(int(186131u));
                                                int GLF_live11looplimiter0 = 0;
                                                vec4 GLF_live11texel = _GLF_FUZZED((mat2(7.0, -198.477, 6420.2367, -_GLF_IDENTITY(659.213, max(_GLF_IDENTITY(659.213, (true ? 659.213 : _GLF_FUZZED(GLF_dead5one))), 659.213))) * vec2(31.05, -1.7)).yxxx);
                                                {
                                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                        if (GLF_live11looplimiter0 >= 7) {
                                                            ;
                                                        }
                                                    } else {
                                                    }
                                                    GLF_live11looplimiter0++;
                                                    {
                                                        GLF_live11coord = GLF_live11texel.xz + GLF_live11texel.yy;
                                                        GLF_live11coord = floor(GLF_live11coord * 256.0) / 256.0;
                                                        GLF_live11texel = texture(GLF_live11tex, GLF_live11coord);
                                                        GLF_live11i++;
                                                    }
                                                }
                                            }
                                        case 8u:
                                            if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                            } else {
                                                GLF_dead5m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead5c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead5r, 4)] = GLF_dead5one;
                                            }
                                            break;
                                    }
                                }
                                if (_GLF_DEAD(false)) {
                                    vec4 donor_replacementGLF_dead8c = _GLF_FUZZED(fwidthFine(atanh(_GLF_color)));
                                    int donor_replacementGLF_dead8i = _GLF_FUZZED(-11158);
                                    {
                                        donor_replacementGLF_dead8c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead8i, 4)] = donor_replacementGLF_dead8c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead8i, 4)] * donor_replacementGLF_dead8c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead8i, 4)];
                                    }
                                }
                                {
                                    {
                                        ;
                                    }
                                }
                            }
                        } else {
                        }
                        do {
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                if (_GLF_DEAD(false)) {
                                    int donor_replacementGLF_dead15count = _GLF_FUZZED((donor_replacementGLF_dead5cols << 8301));
                                    int donor_replacementGLF_dead15v = _GLF_FUZZED(_injected_loop_counter);
                                    while (donor_replacementGLF_dead15v > 1) {
                                        if ((donor_replacementGLF_dead15v & 1) == 1) {
                                            donor_replacementGLF_dead15v = 3 * donor_replacementGLF_dead15v + 1;
                                        } else {
                                            donor_replacementGLF_dead15v /= 2;
                                        }
                                        donor_replacementGLF_dead15count++;
                                    }
                                }
                                uselessOutVariable = _GLF_IDENTITY(uselessOutVariable, max(uselessOutVariable, uselessOutVariable)) + 1u;
                            } else {
                            }
                        } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))));
                    }
                }
            }
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < log(1.0))))) {
            vec4 donor_replacementGLF_dead8c = _GLF_FUZZED(_GLF_color);
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                if (donor_replacementGLF_dead8c[_GLF_MAKE_IN_BOUNDS_INT(i, 4)] >= 1.0) {
                    donor_replacementGLF_dead8c[_GLF_MAKE_IN_BOUNDS_INT(i, 4)] = donor_replacementGLF_dead8c[_GLF_MAKE_IN_BOUNDS_INT(i, 4)] * donor_replacementGLF_dead8c[_GLF_MAKE_IN_BOUNDS_INT(i, 4)];
                }
            } else {
            }
        }
        sum += data[i];
        {
            int GLF_live13looplimiter1 = 0;
            for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > (1 ^ 1)); _injected_loop_counter--) {
                if (GLF_live13looplimiter1 >= _GLF_IDENTITY(6, min(6, 6))) {
                    ;
                }
            }
        }
    }
    {
        vec2 GLF_live11coord = _GLF_FUZZED(vec3(_GLF_IDENTITY(96.57, clamp(96.57, 96.57, 96.57)), -4.3, 0.6).yy);
        int GLF_live11i = _GLF_FUZZED(24098);
        int GLF_live11looplimiter0 = 0;
        vec4 GLF_live11texel = _GLF_FUZZED((-vec4(-8307.0153, -526.596, 7.1, 5.9)));
        while (GLF_live11texel.x + GLF_live11texel.y + GLF_live11texel.z > 1.0 && GLF_live11i < 16) {
            if (GLF_live11looplimiter0 >= 7) {
                break;
            }
            GLF_live11looplimiter0++;
            {
                GLF_live11coord = GLF_live11texel.xz + _GLF_IDENTITY(GLF_live11texel.yy, vec2(_GLF_ONE(1.0, injectionSwitch.y), _GLF_ONE(1.0, injectionSwitch.y)) * (GLF_live11texel.yy));
                GLF_live11coord = floor(GLF_live11coord * 256.0) / 256.0;
                for (int _injected_loop_counter = _GLF_IDENTITY(0, (_GLF_IDENTITY(0, (0) | (_GLF_IDENTITY(0, max(0, 0))))) | (0)); _GLF_WRAPPED_LOOP(_injected_loop_counter < (1 | 0)); _GLF_IDENTITY(_injected_loop_counter++, ~(_GLF_IDENTITY(~(_injected_loop_counter++), (~(_injected_loop_counter++)) >> 0)))) {
                    GLF_live11texel = texture(GLF_live11tex, GLF_live11coord);
                }
                GLF_live11i++;
            }
        }
    }
    sum /= vec3(16.0);
    {
        for (int _injected_loop_counter = int(_GLF_ONE(1.0, injectionSwitch.y)); _GLF_WRAPPED_LOOP(_injected_loop_counter > int(_GLF_ZERO(0.0, injectionSwitch.x))); _injected_loop_counter--) {
            ;
        }
    }
    _GLF_color = vec4(sum, 1.0);
}
