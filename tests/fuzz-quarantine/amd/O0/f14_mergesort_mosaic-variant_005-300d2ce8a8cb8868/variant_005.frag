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
int GLF_dead19MATRIX_N = 4;

layout(set = 0, binding = 2) uniform buf2 {
    vec2 GLF_dead18resolution;
};

vec4 GLF_dead20gl_FragCoord = _GLF_FUZZED(vec4(5.3, 2.5, -0.3, -534.477));

layout(set = 0, binding = 3) uniform buf3 {
    vec2 GLF_dead20injectionSwitch;
};

layout(set = 0, binding = 4) uniform buf4 {
    vec2 GLF_dead20resolution;
};

vec4 GLF_dead21gl_FragCoord = _GLF_FUZZED(vec4(-8.4, 538.670, -3600.6869, 8.1));
const int GLF_dead21N = 10;
int GLF_dead21data[10] = int[10](_GLF_FUZZED((+(-3581))), _GLF_FUZZED(-857), _GLF_FUZZED(((42055 >= (-9494)) ? (-50806) : 7788)), _GLF_FUZZED(((uvec3(72202u, 40938u, 105090u) != uvec3(70273u, 193427u, 104193u)) ? (-71796) : (-96927))), _GLF_FUZZED(int(false)), _GLF_FUZZED(-79771), _GLF_FUZZED(95192), _GLF_FUZZED(((-66965) ^ 44597)), _GLF_FUZZED(-46984), _GLF_FUZZED(ivec4(ivec2(-67490, -10969), ivec2(87578, -25935)).a)), GLF_dead21temp[10] = int[10](_GLF_FUZZED(int((uvec4(5291u, 194132u, 42138u, 90175u) != uvec4(71052u, 101885u, 164233u, 147254u)))), _GLF_FUZZED(-39328), _GLF_FUZZED(-71084), _GLF_FUZZED(30110), _GLF_FUZZED(16755), _GLF_FUZZED(-23767), _GLF_FUZZED(ivec2(-48963, -59653).t), _GLF_FUZZED(86512), _GLF_FUZZED((-28827)), _GLF_FUZZED(ivec3(34937, -82650, -32602).g));

void GLF_dead21merge(int GLF_dead21from, int GLF_dead21mid, int GLF_dead21to) {
    int GLF_dead21k = GLF_dead21from, GLF_dead21i = GLF_dead21from, GLF_dead21j = GLF_dead21mid + 1;
    while (GLF_dead21i <= GLF_dead21mid && GLF_dead21j <= GLF_dead21to) {
        if (GLF_dead21data[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead21i, 10)] < GLF_dead21data[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead21j, 10)]) {
            GLF_dead21temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead21k++, 10)] = GLF_dead21data[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead21i++, 10)];
        } else {
            GLF_dead21temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead21k++, 10)] = GLF_dead21data[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead21j++, 10)];
        }
    }
    while (GLF_dead21i < GLF_dead21N && GLF_dead21i <= GLF_dead21mid) {
        GLF_dead21temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead21k++, 10)] = GLF_dead21data[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead21i++, 10)];
    }
    for (int GLF_dead21i = GLF_dead21from; GLF_dead21i <= GLF_dead21to; GLF_dead21i++) {
        GLF_dead21data[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead21i, 10)] = GLF_dead21temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead21i, 10)];
    }
}

vec4 GLF_live16_GLF_color = _GLF_FUZZED(vec4(86.24, 1078.4678, 911.211, -7311.1476));
int GLF_live16map[16 * 16] = int[256](0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
const vec4 GLF_live17pal[16] = vec4[16](vec4(0.0, 0.0, 0.0, 1.0), vec4(0.5, 0.0, 0.0, 1.0), vec4(0.0, 0.5, 0.0, 1.0), vec4(0.5, 0.5, 0.0, 1.0), vec4(0.0, 0.0, 0.5, 1.0), vec4(0.5, 0.0, 0.5, 1.0), vec4(0.0, 0.5, 0.5, 1.0), vec4(0.5, 0.5, 0.5, 1.0), vec4(0.0, 0.0, 0.0, 1.0), vec4(1.0, 0.0, 0.0, 1.0), vec4(0.0, 1.0, 0.0, 1.0), vec4(1.0, 1.0, 0.0, 1.0), vec4(0.0, 0.0, 1.0, 1.0), vec4(1.0, 0.0, 1.0, 1.0), vec4(0.0, 1.0, 1.0, 1.0), vec4(1.0, 1.0, 1.0, 1.0));
const vec4 GLF_live17picdata[8] = vec4[8](vec4(4, 4, 20, 4), vec4(4, 4, 4, 20), vec4(4, 20, 20, 4), vec4(20, 4, 4, 8), vec4(8, 6, 4, 2), vec4(2, 12, 2, 4), vec4(16, 2, 4, 4), vec4(12, 22, 4, 4));

bool GLF_live17collision(vec2 GLF_live17pos, vec4 GLF_live17quad) {
    if (GLF_live17pos.x < GLF_live17quad.x) {
        return false;
    }
    if (GLF_live17pos.y < GLF_live17quad.y) {
        return false;
    }
    if (GLF_live17pos.x > GLF_live17quad.x + GLF_live17quad.z) {
        return false;
    }
    if (GLF_live17pos.y > GLF_live17quad.y + GLF_live17quad.w) {
        return false;
    }
    return true;
}

layout(set = 0, binding = 5) uniform buf5 {
    float GLF_live11one;
};

mat2 GLF_live11m22 = _GLF_FUZZED(mat2(mat4x2(-0.0, -98.25, -5555.5406, 6655.4475, 4.4, 7.6, -4.9, 8.8)));
mat2x3 GLF_live11m23 = _GLF_FUZZED(mat2x3(35.25, -8065.2099, 2.3, -57.54, -8.4, -22.68));
mat2x4 GLF_live11m24 = _GLF_FUZZED(((+mat2x4(-8683.1702, -0.7, 0.9, -22.13, 5.2, 0.2, -4466.4064, -9.1))));
mat3x2 GLF_live11m32 = _GLF_FUZZED(mat3x2(14.02, -9.3, -2.9, -38.51, 4.6, -3454.4789));
mat3 GLF_live11m33 = _GLF_FUZZED((1.0 * mat3(-10.91, 4.4, -54.41, -28.85, 5.4, -60.77, -5.5, 6071.8852, 28.53)));
mat3x4 GLF_live11m34 = _GLF_FUZZED(mat3x4(4339.1046, -4103.0850, -6.8, -89.48, 4.0, -52.45, 1161.2069, 149.133, -4.4, -96.55, 8.2, 359.827));
mat4x2 GLF_live11m42 = _GLF_FUZZED(mat4x2(3.7, 61.68, 5.6, 9.2, 3.8, -2890.7284, 364.580, -936.280));
mat4x3 GLF_live11m43 = _GLF_FUZZED(mat4x3(mat3x4(5.4, -834.497, -4973.2706, 32.42, 1.7, 48.38, -8.6, 2946.1088, -8606.1163, -10.39, 2394.0464, -1.6)));
mat4 GLF_live11m44 = _GLF_FUZZED(mat4(mat3x2(-0.7, 13.23, -5.1, -4.3, -2.2, 75.66)));

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

layout(set = 0, binding = 6) uniform buf6 {
    vec2 GLF_dead7injectionSwitch;
};

layout(set = 0, binding = 7) uniform buf7 {
    float GLF_dead8time;
};

layout(set = 0, binding = 8) uniform buf8 {
    vec2 GLF_dead8resolution;
};

float GLF_dead8h_r = _GLF_FUZZED(-2.0);
float GLF_dead8s_g = _GLF_FUZZED((-(-88.56)));
float GLF_dead8b_b = _GLF_FUZZED(((false ^^ false) ? (-329.483) : (5268.2657)));

void GLF_dead8doConvert() {
    int GLF_dead8msb8 = 256;
    vec3 GLF_dead8temp = _GLF_FUZZED(faceforward(vec3(555.534, -0.5, -3.4), vec3(-5.7, 90.62, 4744.9624), vec3(-9243.9588, 8.2, -7.7)));
    GLF_dead8temp = GLF_dead8b_b * (float(bitCount(GLF_dead8msb8)) - GLF_dead8s_g) + (GLF_dead8b_b - GLF_dead8b_b * (float(bitCount(GLF_dead8msb8)) - GLF_dead8s_g)) * clamp(abs(abs(6.0 * (GLF_dead8h_r - vec3(bitfieldReverse(0), bitCount(GLF_dead8msb8), 2) / 3.0)) - 3.0) - float(bitCount(GLF_dead8msb8)), float(bitfieldExtract(int(GLF_dead8resolution.x), 0, 1)), float(bitCount(int(GLF_dead8resolution.x))));
    {
        ivec2 GLF_live10p = _GLF_FUZZED((+ivec2(16616, 20046)));
        {
            GLF_live10p = GLF_live10iter(GLF_live10p);
        }
    }
    GLF_dead8h_r = GLF_dead8temp.x;
    if (_GLF_DEAD(false)) {
        int donor_replacementGLF_dead18iteration = _GLF_FUZZED(-85694);
        {
            ;
        }
    }
    GLF_dead8s_g = GLF_dead8temp.y;
    {
        bool GLF_live16canwalk = _GLF_FUZZED((!(ivec3(-99535, -86752, 65918) == ivec3(18177, 64875, 16726))));
        int GLF_live16i = _GLF_FUZZED(ivec2(89694, 34092).t);
        int GLF_live16j = _GLF_FUZZED(-86502);
        int GLF_live16looplimiter1 = 0;
        ivec2 GLF_live16p = _GLF_FUZZED(((37787) ^ ivec2(21605, -84966)));
        for (GLF_live16j = 0; GLF_live16j < 8; GLF_live16j++) {
            if (GLF_live16looplimiter1 >= 7) {
                break;
            }
            GLF_live16looplimiter1++;
            {
                if (GLF_live16map[_GLF_MAKE_IN_BOUNDS_INT(GLF_live16j * 2 + GLF_live16i * 2 * 16, 256)] == 0) {
                    GLF_live16p.x = GLF_live16j * 2;
                    GLF_live16p.y = GLF_live16i * 2;
                    GLF_live16canwalk = true;
                }
            }
        }
    }
    GLF_dead8b_b = GLF_dead8temp.z;
}

vec3 GLF_dead8computeColor(float GLF_dead8c, vec2 GLF_dead8position) {
    int GLF_dead8msb8 = 256;
    GLF_dead8h_r = fract(GLF_dead8c);
    GLF_dead8s_g = float(bitCount(GLF_dead8msb8));
    GLF_dead8b_b = (0.5 + (sin(GLF_dead8time) * 0.5 + 0.5));
    GLF_dead8doConvert();
    GLF_dead8s_g *= float(bitCount(GLF_dead8msb8)) / GLF_dead8position.y;
    GLF_dead8h_r *= float(bitCount(GLF_dead8msb8)) / GLF_dead8position.x;
    if (abs(GLF_dead8position.y - GLF_dead8position.x) < 0.5) {
        GLF_dead8b_b = clamp(GLF_dead8b_b * float(bitCount(GLF_dead8msb8)) * 3.0, float(bitfieldExtract(int(GLF_dead8resolution.x), 0, 1)), float(bitCount(GLF_dead8msb8)));
    }
    return vec3(GLF_dead8h_r, GLF_dead8s_g, GLF_dead8b_b);
    if (_GLF_DEAD(false)) {
        float donor_replacementGLF_dead19alpha3 = _GLF_FUZZED(sqrt(GLF_dead8c));
        int donor_replacementGLF_dead19j = _GLF_FUZZED(findLSB(60864u));
        mat4 donor_replacementGLF_dead19matrix_a = _GLF_FUZZED(mat4(2.4, -9958.5558, 1.8, -730.838, 2388.9300, -2201.9393, -27.51, 87.63, 4.8, 3606.8459, 7.1, -6.9, -5474.2273, 6541.4954, 5.4, 2202.2771));
        {
            donor_replacementGLF_dead19alpha3 += GLF_live16_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead8msb8, 4)] * donor_replacementGLF_dead19matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead8msb8, 4)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead19j, 4)];
        }
    }
}

vec3 GLF_dead8defaultColor() {
    return vec3(float(bitfieldExtract(int(GLF_dead8resolution.y), 0, 1)));
}

vec3 GLF_dead8drawShape(vec2 GLF_dead8pos, vec2 GLF_dead8square, vec3 GLF_dead8setting) {
    int GLF_dead8msb8 = 256;
    bool GLF_dead8c1 = GLF_dead8pos.x - GLF_dead8setting.x < GLF_dead8square.x;
    if (!GLF_dead8c1) {
        if (_GLF_DEAD(false)) {
            int donor_replacementGLF_dead21from = _GLF_FUZZED(ivec3(-87015, 5589, 91607)[0]);
            for (int GLF_dead21i = donor_replacementGLF_dead21from; GLF_dead21i <= GLF_dead8msb8; GLF_dead21i++) {
                GLF_dead21data[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead21i, 10)] = GLF_dead21temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead21i, 10)];
            }
        }
        return GLF_dead8defaultColor();
        if (_GLF_DEAD(false)) {
            int donor_replacementGLF_dead19b = _GLF_FUZZED(min(-49295, ((-33065) + 66335)));
            {
                GLF_dead8s_g += GLF_live16_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead19b, 4)] * GLF_live16_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead19b, 4)];
            }
        }
    }
    bool GLF_dead8c2 = GLF_dead8pos.x + GLF_dead8setting.x > GLF_dead8square.x;
    if (!GLF_dead8c2) {
        return GLF_dead8defaultColor();
    }
    if (_GLF_DEAD(false)) {
        float donor_replacementGLF_dead18x = _GLF_FUZZED((-GLF_dead8b_b));
        float donor_replacementGLF_dead18y = _GLF_FUZZED(GLF_live11one);
        if (0.0 > GLF_dead18resolution.x) {
            donor_replacementGLF_dead18x = 1.0;
            donor_replacementGLF_dead18y = 1.0;
        }
    }
    bool GLF_dead8c3 = GLF_dead8pos.y - GLF_dead8setting.x < GLF_dead8square.y;
    if (!GLF_dead8c3) {
        return GLF_dead8defaultColor();
    }
    bool GLF_dead8c4 = GLF_dead8pos.y + GLF_dead8setting.x > GLF_dead8square.y;
    if (!GLF_dead8c4) {
        return GLF_dead8defaultColor();
    }
    bool GLF_dead8c5 = GLF_dead8pos.x - (GLF_dead8setting.x - GLF_dead8setting.y) < GLF_dead8square.x;
    if (!GLF_dead8c5) {
        return GLF_dead8computeColor(GLF_dead8setting.z / (5.0 * float(findMSB(GLF_dead8msb8))), GLF_dead8pos);
    }
    bool GLF_dead8c6 = GLF_dead8pos.x + (GLF_dead8setting.x - GLF_dead8setting.y) > GLF_dead8square.x;
    if (!GLF_dead8c6) {
        return GLF_dead8computeColor(GLF_dead8setting.z / (5.0 * float(findMSB(GLF_dead8msb8))), GLF_dead8pos);
    }
    bool GLF_dead8c7 = GLF_dead8pos.y - (GLF_dead8setting.x - GLF_dead8setting.y) < GLF_dead8square.y;
    if (!GLF_dead8c7) {
        return GLF_dead8computeColor(GLF_dead8setting.z / (5.0 * float(findMSB(GLF_dead8msb8))), GLF_dead8pos);
        {
            int GLF_live17i = _GLF_FUZZED(16205);
            vec2 GLF_live17pos = _GLF_FUZZED(vec2(1.7, -66.48));
            vec4 GLF_live17res = _GLF_FUZZED(vec2(4.5, -6.9).ttts);
            if (GLF_live17collision(GLF_live17pos, GLF_live17picdata[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17i, 8)])) {
                GLF_live17res = GLF_live17pal[_GLF_MAKE_IN_BOUNDS_INT((int(GLF_live17picdata[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17i, 8)].x) * int(GLF_live17picdata[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17i, 8)].y) + GLF_live17i * 9 + 11) % 16, 16)];
            }
        }
    }
    bool GLF_dead8c8 = GLF_dead8pos.y + (GLF_dead8setting.x - GLF_dead8setting.y) > GLF_dead8square.y;
    if (_GLF_DEAD(false)) {
        float donor_replacementGLF_dead18c_re = _GLF_FUZZED(round(determinant(mat4(-14.65, -1.0, -3.3, 94.43, -0.4, -5.2, -4581.6917, 0.9, 7.3, 83.71, 723.999, 95.53, -734.886, 630.321, 247.496, -32.21))));
        int donor_replacementGLF_dead18iteration = _GLF_FUZZED(GLF_dead8msb8);
        int donor_replacementGLF_dead18k = _GLF_FUZZED(GLF_dead8msb8);
        float donor_replacementGLF_dead18y = _GLF_FUZZED(GLF_dead8s_g);
        {
            if (GLF_dead8h_r * GLF_dead8h_r + donor_replacementGLF_dead18y * donor_replacementGLF_dead18y > 4.0) {
                ;
            }
            float GLF_dead18x_new = GLF_dead8h_r * GLF_dead8h_r - donor_replacementGLF_dead18y * donor_replacementGLF_dead18y + donor_replacementGLF_dead18c_re;
            donor_replacementGLF_dead18y = 2.0 * GLF_dead8h_r * donor_replacementGLF_dead18y + GLF_dead8b_b;
            GLF_dead8h_r = GLF_dead18x_new;
            donor_replacementGLF_dead18iteration++;
            donor_replacementGLF_dead18k++;
        }
    }
    if (!GLF_dead8c8) {
        return GLF_dead8computeColor(GLF_dead8setting.z / (5.0 * float(findMSB(GLF_dead8msb8))), GLF_dead8pos);
    }
    return GLF_dead8defaultColor();
}

layout(set = 0, binding = 9) uniform buf9 {
    float GLF_dead6one;
};

mat2 GLF_dead6m22 = _GLF_FUZZED(mat2(-45.58, -2.7, -8.2, 19.11));
mat2x3 GLF_dead6m23 = _GLF_FUZZED((mat2x3(90.73, -3.8, 7.7, -6.0, -78.16, -60.48) - float(91755)));
mat2x4 GLF_dead6m24 = _GLF_FUZZED(mat2x4(604.465, 9.7, -6.8, 0.6, -4.9, -6215.0349, -5.5, 14.19));
mat3x2 GLF_dead6m32 = _GLF_FUZZED(mat3x2(32.68, 3968.6777, 602.911, -985.192, 9621.9843, -12.07));
mat3 GLF_dead6m33 = _GLF_FUZZED(mat3(0.9, -32.41, 3979.5976, 2.6, -1861.8098, 452.631, 1.7, 29.42, 8.6));
mat3x4 GLF_dead6m34 = _GLF_FUZZED(mat3x4(544.036, 907.277, 2.9, 718.819, 73.77, -4.0, 95.05, -450.527, 9.0, -5.5, 51.96, 8.0));
mat4x2 GLF_dead6m42 = _GLF_FUZZED(mat4x2(mat3(835.025, -3.6, 9.0, -2422.2365, 5.2, 6.7, 4.5, -18.32, -8073.4595)));
mat4x3 GLF_dead6m43 = _GLF_FUZZED(mat4x3(mat3x2(-90.07, 1.4, 0.6, 621.884, -889.671, -7.9)));
mat4 GLF_dead6m44 = _GLF_FUZZED(mat4(-9.7, 78.33, -891.034, 491.809, -4720.6006, 2.6, 6406.6771, 6.1, 21.10, -937.013, -263.209, -44.50, 717.813, -9.5, -450.233, -7403.3641));
vec4 GLF_dead5_GLF_color = _GLF_FUZZED((vec4(-2898.4701, 2496.3269, 958.237, 580.811) + vec4(-176.746, 59.85, 8.6, -4.9)));

layout(set = 0, binding = 10) uniform buf10 {
    vec2 GLF_dead5injectionSwitch;
};

float GLF_dead5compute_derivative_x(float GLF_dead5v) {
    {
        vec2 GLF_live13v = _GLF_FUZZED(vec2(-4500.3047, 3088.8149));
        if (length(GLF_live13v) < 0.001) {
            ;
        }
    }
    if (_GLF_DEAD(false)) {
        float donor_replacementGLF_dead19alpha1 = _GLF_FUZZED((+GLF_live16_GLF_color.p));
        float donor_replacementGLF_dead19alpha2 = _GLF_FUZZED(GLF_dead6one);
        float donor_replacementGLF_dead19alpha3 = _GLF_FUZZED(GLF_dead8s_g);
        float donor_replacementGLF_dead19magnitudeX = _GLF_FUZZED(GLF_dead6one);
        mat4 donor_replacementGLF_dead19matrix_a = _GLF_FUZZED(mat4(GLF_live11m22));
        for (int GLF_dead19k = 0; GLF_dead19k < GLF_dead19MATRIX_N - 1; GLF_dead19k++) {
            for (int GLF_dead19x = GLF_dead19MATRIX_N - 1; GLF_dead19x >= GLF_dead19k; GLF_dead19x--) {
                donor_replacementGLF_dead19magnitudeX += donor_replacementGLF_dead19matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19x, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19k, 4)] * donor_replacementGLF_dead19matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19x, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19k, 4)];
                GLF_live16_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19x, 4)] = donor_replacementGLF_dead19matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19x, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19k, 4)];
            }
            donor_replacementGLF_dead19magnitudeX = sqrt(donor_replacementGLF_dead19magnitudeX);
            GLF_live16_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19k, 4)] -= (sign(GLF_live16_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19k, 4)]) * donor_replacementGLF_dead19magnitudeX);
            for (int GLF_dead19u = GLF_dead19MATRIX_N - 1; GLF_dead19u >= GLF_dead19k; GLF_dead19u--) {
                donor_replacementGLF_dead19alpha1 += GLF_live16_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19u, 4)] * GLF_live16_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19u, 4)];
            }
            donor_replacementGLF_dead19alpha2 = 2.0 / donor_replacementGLF_dead19alpha1;
            for (int GLF_dead19j = GLF_dead19k; GLF_dead19j < GLF_dead19MATRIX_N; GLF_dead19j++) {
                for (int GLF_dead19a = GLF_dead19MATRIX_N - 1; GLF_dead19a >= GLF_dead19k; GLF_dead19a--) {
                    donor_replacementGLF_dead19alpha3 += GLF_live16_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19a, 4)] * donor_replacementGLF_dead19matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19a, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19j, 4)];
                }
                GLF_dead8s_g = donor_replacementGLF_dead19alpha2 * donor_replacementGLF_dead19alpha3;
                for (int GLF_dead19a = GLF_dead19MATRIX_N - 1; GLF_dead19a >= GLF_dead19k; GLF_dead19a--) {
                    donor_replacementGLF_dead19matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19a, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19j, 4)] = donor_replacementGLF_dead19matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19a, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19j, 4)] - (GLF_dead8s_g * GLF_live16_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19a, 4)]);
                }
                donor_replacementGLF_dead19alpha3 = 0.0;
                GLF_dead8s_g = 0.0;
            }
            for (int GLF_dead19b = GLF_dead19MATRIX_N - 1; GLF_dead19b >= GLF_dead19k; GLF_dead19b--) {
                donor_replacementGLF_dead19alpha3 += GLF_live16_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19b, 4)] * GLF_live16_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19b, 4)];
            }
            GLF_dead8s_g = donor_replacementGLF_dead19alpha2 * donor_replacementGLF_dead19alpha3;
            for (int GLF_dead19b = GLF_dead19MATRIX_N - 1; GLF_dead19b >= GLF_dead19k; GLF_dead19b--) {
                GLF_live16_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19b, 4)] = GLF_live16_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19b, 4)] - (GLF_dead8s_g * GLF_live16_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19b, 4)]);
            }
            donor_replacementGLF_dead19magnitudeX = 0.0;
            donor_replacementGLF_dead19alpha1 = 0.0;
            donor_replacementGLF_dead19alpha2 = 0.0;
            donor_replacementGLF_dead19alpha3 = 0.0;
            GLF_dead8s_g = 0.0;
        }
    }
    return dFdx(GLF_dead5v) * GLF_dead5injectionSwitch.y;
    if (_GLF_DEAD(false)) {
        float donor_replacementGLF_dead19alpha1 = _GLF_FUZZED(vec3(6780.6359, 73.42, 3640.7521)[0]);
        int donor_replacementGLF_dead19u = _GLF_FUZZED(ivec2(-41914, -69076)[0]);
        {
            donor_replacementGLF_dead19alpha1 += GLF_live16_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead19u, 4)] * GLF_live16_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead19u, 4)];
        }
    }
}

float GLF_dead5compute_derivative_y(float GLF_dead5v) {
    return dFdy(GLF_dead5v) * GLF_dead5injectionSwitch.y;
}

float GLF_dead5compute_stripe(float GLF_dead5v, float GLF_dead5t) {
    return smoothstep(-.9, 1., (GLF_dead5v) / (20.0 * ((GLF_dead5injectionSwitch.y > GLF_dead5injectionSwitch.x) ? GLF_dead5compute_derivative_x(GLF_dead5t) : GLF_dead5compute_derivative_y(GLF_dead5t))));
    {
        int GLF_live16d = _GLF_FUZZED(7081);
        ivec2 GLF_live16p = _GLF_FUZZED(((mat4x3(8717.9486, -2.8, 46.53, 5.4, 129.525, 8981.2209, 29.96, 70.75, -5.9, -5908.2460, 85.46, -5500.5557) != mat4x3(4202.1297, 30.83, 601.845, -4953.7813, 6.0, 9.2, 84.84, -83.79, -8.1, -6.9, 5511.7845, -80.63)) ? (ivec2(33713, 2410) - 75971) : ivec2(99405, -31309)));
        if (GLF_live16d >= 0 && GLF_live16p.x < 14 && GLF_live16map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live16p.x + 2) + (GLF_live16p.y) * 16, 256)] == 0) {
            GLF_live16d--;
            if (_GLF_DEAD(false)) {
                float donor_replacementGLF_dead19alpha3 = _GLF_FUZZED(GLF_dead6one);
                vec4 donor_replacementGLF_dead19matrix_u = _GLF_FUZZED(fract(GLF_dead5_GLF_color));
                for (int GLF_dead19j = GLF_live16d; GLF_dead19j < GLF_dead19MATRIX_N; GLF_dead19j++) {
                    for (int GLF_dead19a = GLF_dead19MATRIX_N - 1; GLF_dead19a >= GLF_live16d; GLF_dead19a--) {
                        donor_replacementGLF_dead19alpha3 += donor_replacementGLF_dead19matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19a, 4)] * GLF_dead6m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19a, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19j, 4)];
                    }
                    GLF_dead8s_g = GLF_dead5v * donor_replacementGLF_dead19alpha3;
                    for (int GLF_dead19a = GLF_dead19MATRIX_N - 1; GLF_dead19a >= GLF_live16d; GLF_dead19a--) {
                        GLF_dead6m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19a, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19j, 4)] = GLF_dead6m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19a, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19j, 4)] - (GLF_dead8s_g * donor_replacementGLF_dead19matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19a, 4)]);
                    }
                    donor_replacementGLF_dead19alpha3 = 0.0;
                    GLF_dead8s_g = 0.0;
                }
            }
            GLF_live16map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live16p.x) + (GLF_live16p.y) * 16, 256)] = 1;
            if (_GLF_DEAD(false)) {
                int donor_replacementGLF_dead19k = _GLF_FUZZED(-62734);
                for (int GLF_dead19u = GLF_dead19MATRIX_N - 1; GLF_dead19u >= donor_replacementGLF_dead19k; GLF_dead19u--) {
                    GLF_dead5v += GLF_dead5_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19u, 4)] * GLF_dead5_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19u, 4)];
                }
            }
            GLF_live16map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live16p.x + 1) + (GLF_live16p.y) * 16, 256)] = 1;
            GLF_live16map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live16p.x + 2) + (GLF_live16p.y) * 16, 256)] = 1;
            GLF_live16p.x += 2;
        }
    }
}

vec4 GLF_live0gl_FragCoord = _GLF_FUZZED(vec4(-1351.7496, -841.933, 114.792, 6.6));
int GLF_live0data[10] = int[10](_GLF_FUZZED((-9692)), _GLF_FUZZED(-36370), _GLF_FUZZED((-(43215 & 14241))), _GLF_FUZZED(-2480), _GLF_FUZZED(ivec4(24361, 89677, -42791, -22432).g), _GLF_FUZZED(((93666) - (-26172))), _GLF_FUZZED(-24712), _GLF_FUZZED(((-68185) - 54521)), _GLF_FUZZED(int(true)), _GLF_FUZZED(((~40369) + 94948))), GLF_live0temp[10] = int[10](_GLF_FUZZED(-22479), _GLF_FUZZED((81703)), _GLF_FUZZED(-17433), _GLF_FUZZED(-93731), _GLF_FUZZED((+(-82274))), _GLF_FUZZED(-2336), _GLF_FUZZED(7774), _GLF_FUZZED((-55783)), _GLF_FUZZED(99453), _GLF_FUZZED((((-30031) - 2189))));
layout(location = 0) out vec4 _GLF_color;

layout(set = 0, binding = 0) uniform buf0 {
    vec2 injectionSwitch;
};

layout(set = 0, binding = 1) uniform buf1 {
    vec2 resolution;
};

const int N = 10;
int data[10], temp[10];

void merge(int from, int mid, int to) {
    int k = from, i = from, j = mid + 1;
    while (i <= mid && j <= to) {
        if (data[i] < data[j]) {
            temp[k++] = data[i++];
            if (_GLF_DEAD(false)) {
                {
                    vec2 GLF_live17pos = _GLF_FUZZED(vec2(450.464, 6.2));
                    vec4 GLF_live17quad = _GLF_FUZZED(vec4(-843.303, -2769.2020, 8137.3105, -6.9));
                    if (GLF_live17pos.y < GLF_live17quad.y) {
                        ;
                        if (_GLF_DEAD(false)) {
                            mat4 donor_replacementGLF_dead19matrix_a = _GLF_FUZZED(GLF_live11m44);
                            for (int GLF_dead19i = (GLF_dead19MATRIX_N - 1); GLF_dead19i >= 0; GLF_dead19i--) {
                                for (int GLF_dead19j = (GLF_dead19MATRIX_N - 1); GLF_dead19j >= (GLF_dead19i + 1); GLF_dead19j--) {
                                    _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19i, 4)] -= (donor_replacementGLF_dead19matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19i, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19j, 4)] * _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19j, 4)]);
                                }
                                _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19i, 4)] /= donor_replacementGLF_dead19matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19i, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19i, 4)];
                            }
                        }
                    }
                }
                _GLF_color = GLF_dead5_GLF_color;
            }
        } else {
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                {
                    break;
                }
            }
            temp[k++] = data[j++];
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                float donor_replacementGLF_dead19alpha2 = _GLF_FUZZED(GLF_live11one);
                float donor_replacementGLF_dead19beta = _GLF_FUZZED(GLF_dead8h_r);
                int donor_replacementGLF_dead19k = _GLF_FUZZED(findMSB(141686u));
                mat4 donor_replacementGLF_dead19matrix_a = _GLF_FUZZED(mat4(GLF_dead8time));
                vec4 donor_replacementGLF_dead19matrix_u = _GLF_FUZZED((resolution * mat4x2(-25.33, 8.7, -1.6, -3695.5594, -9.7, -1.0, 3.8, -547.605)));
                for (int GLF_dead19j = donor_replacementGLF_dead19k; GLF_dead19j < GLF_dead19MATRIX_N; GLF_dead19j++) {
                    for (int GLF_dead19a = GLF_dead19MATRIX_N - 1; GLF_dead19a >= donor_replacementGLF_dead19k; GLF_dead19a--) {
                        GLF_dead8b_b += donor_replacementGLF_dead19matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19a, 4)] * donor_replacementGLF_dead19matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19a, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19j, 4)];
                    }
                    donor_replacementGLF_dead19beta = donor_replacementGLF_dead19alpha2 * GLF_dead8b_b;
                    for (int GLF_dead19a = GLF_dead19MATRIX_N - 1; GLF_dead19a >= donor_replacementGLF_dead19k; GLF_dead19a--) {
                        donor_replacementGLF_dead19matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19a, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19j, 4)] = donor_replacementGLF_dead19matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19a, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19j, 4)] - (donor_replacementGLF_dead19beta * donor_replacementGLF_dead19matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19a, 4)]);
                    }
                    GLF_dead8b_b = 0.0;
                    donor_replacementGLF_dead19beta = 0.0;
                }
            }
        }
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
        float donor_replacementGLF_dead18c_im = _GLF_FUZZED((+fwidthCoarse(GLF_dead8h_r)));
        float donor_replacementGLF_dead18c_re = _GLF_FUZZED(GLF_dead8b_b);
        int donor_replacementGLF_dead18k = _GLF_FUZZED(int(true));
        float donor_replacementGLF_dead18x = _GLF_FUZZED(GLF_dead8resolution.t);
        float donor_replacementGLF_dead18y = _GLF_FUZZED((distance(vec4(1.6, -7.0, -17.37, 39.55), GLF_live16_GLF_color) - GLF_dead8h_r));
        {
            if (donor_replacementGLF_dead18x * donor_replacementGLF_dead18x + donor_replacementGLF_dead18y * donor_replacementGLF_dead18y > 4.0) {
                ;
            }
            float GLF_dead18x_new = donor_replacementGLF_dead18x * donor_replacementGLF_dead18x - donor_replacementGLF_dead18y * donor_replacementGLF_dead18y + donor_replacementGLF_dead18c_re;
            donor_replacementGLF_dead18y = 2.0 * donor_replacementGLF_dead18x * donor_replacementGLF_dead18y + donor_replacementGLF_dead18c_im;
            donor_replacementGLF_dead18x = GLF_dead18x_new;
            i++;
            donor_replacementGLF_dead18k++;
        }
    }
    {
        int GLF_live17i = _GLF_FUZZED(-2340);
        int GLF_live17looplimiter0 = 0;
        vec2 GLF_live17pos = _GLF_FUZZED((vec2(5.6, -75.15) - (-2394.1716)));
        vec4 GLF_live17res = _GLF_FUZZED((vec4(-879.847, 704.580, -360.404, -1699.4952) - (-535.033)));
        {
            if (_GLF_DEAD(false)) {
                {
                    GLF_live17res[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17i, 4)] -= (GLF_dead6m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17i, 4)][_GLF_MAKE_IN_BOUNDS_INT(from, 4)] * GLF_live17res[_GLF_MAKE_IN_BOUNDS_INT(from, 4)]);
                }
            }
            if (GLF_live17looplimiter0 >= 5) {
                ;
            }
            GLF_live17looplimiter0++;
            {
                if (_GLF_DEAD(false)) {
                    _GLF_color = vec4(-4.0, 736.961, 3.0, -60.68);
                }
                if (GLF_live17collision(GLF_live17pos, GLF_live17picdata[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17i, 8)])) {
                    GLF_live17res = GLF_live17pal[_GLF_MAKE_IN_BOUNDS_INT((int(GLF_live17picdata[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17i, 8)].x) * int(GLF_live17picdata[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17i, 8)].y) + GLF_live17i * 9 + 11) % 16, 16)];
                }
                if (_GLF_DEAD(false)) {
                    _GLF_color = GLF_live17res;
                }
            }
            if (_GLF_DEAD(false)) {
                _GLF_color = GLF_live0gl_FragCoord;
            }
        }
    }
    while (i < N && i <= mid) {
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            if (_GLF_DEAD(false)) {
                _GLF_color = vec4(-4547.2596, -56.23, -6.5, -11.30);
            }
            bool donor_replacementGLF_dead8c7 = _GLF_FUZZED(true);
            vec2 donor_replacementGLF_dead8pos = _GLF_FUZZED(min(vec2(-8.8, 7602.0781), GLF_dead6one));
            vec3 donor_replacementGLF_dead8setting = _GLF_FUZZED((exp(vec3(-0.4, 62.87, -9419.3453)) / vec3(1.6, -19.55, 6.4)));
            if (!donor_replacementGLF_dead8c7) {
                ;
            }
            if (_GLF_DEAD(false)) {
                _GLF_color = GLF_live0gl_FragCoord;
            }
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            _GLF_color = dFdxCoarse(vec4(13.05, -687.266, 9.5, 47.71));
        }
        temp[k++] = data[i++];
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                float donor_replacementGLF_dead19alpha2 = _GLF_FUZZED(mod(GLF_dead8s_g, vec3(8313.0745, -2153.5884, -1.0)[1]));
                float donor_replacementGLF_dead19alpha3 = _GLF_FUZZED(GLF_dead8b_b);
                vec4 donor_replacementGLF_dead19matrix_u = _GLF_FUZZED(GLF_live16_GLF_color);
                {
                    for (int GLF_dead19a = GLF_dead19MATRIX_N - 1; GLF_dead19a >= i; GLF_dead19a--) {
                        donor_replacementGLF_dead19alpha3 += donor_replacementGLF_dead19matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19a, 4)] * GLF_dead6m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19a, 4)][_GLF_MAKE_IN_BOUNDS_INT(k, 4)];
                    }
                    GLF_dead8s_g = donor_replacementGLF_dead19alpha2 * donor_replacementGLF_dead19alpha3;
                    for (int GLF_dead19a = GLF_dead19MATRIX_N - 1; GLF_dead19a >= i; GLF_dead19a--) {
                        GLF_dead6m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19a, 4)][_GLF_MAKE_IN_BOUNDS_INT(k, 4)] = GLF_dead6m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19a, 4)][_GLF_MAKE_IN_BOUNDS_INT(k, 4)] - (GLF_dead8s_g * donor_replacementGLF_dead19matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19a, 4)]);
                    }
                    donor_replacementGLF_dead19alpha3 = 0.0;
                    GLF_dead8s_g = 0.0;
                }
            }
            bool donor_replacementGLF_dead5c1 = _GLF_FUZZED(false);
            bool donor_replacementGLF_dead5c2 = _GLF_FUZZED(((mat3(0.5, -77.26, 6.7, -353.396, -24.94, -2799.1758, 12.52, 9566.3394, -851.740)) != mat3(-891.932, -5.2, -56.97, 9889.0727, 8.6, -760.684, -9.3, -895.001, 749.960)));
            if (_GLF_DEAD(false)) {
                float donor_replacementGLF_dead21grey = _GLF_FUZZED(exp(936.696));
                if (int(GLF_dead21gl_FragCoord[1]) < 210) {
                    donor_replacementGLF_dead21grey = 0.5 + float(GLF_dead21data[6]) / 10.0;
                } else {
                    if (int(GLF_dead21gl_FragCoord[1]) < 240) {
                        donor_replacementGLF_dead21grey = 0.5 + float(GLF_dead21data[7]) / 10.0;
                    } else {
                        if (int(GLF_dead21gl_FragCoord[1]) < 270) {
                            donor_replacementGLF_dead21grey = 0.5 + float(GLF_dead21data[8]) / 10.0;
                        } else {
                            discard;
                        }
                    }
                }
            }
            vec3 donor_replacementGLF_dead5col = _GLF_FUZZED(vec3(-146.502, 26.71, 5.6));
            vec2 donor_replacementGLF_dead5uv = _GLF_FUZZED(resolution);
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < sqrt(0.0))))) {
                _GLF_color = uintBitsToFloat(uvec4(151527u, 196832u, 34832u, 162028u));
            }
            if (!donor_replacementGLF_dead5c1 && donor_replacementGLF_dead5c2) {
                float GLF_dead5stripe = GLF_dead5compute_stripe(tan((donor_replacementGLF_dead5uv.x + donor_replacementGLF_dead5uv.y) * 20.0), donor_replacementGLF_dead5uv.x + donor_replacementGLF_dead5uv.y);
                donor_replacementGLF_dead5col = mix(vec3(0.5, donor_replacementGLF_dead5uv.x, 0.1), vec3(.4, 0, .5), GLF_dead5stripe);
                GLF_dead5_GLF_color = vec4(donor_replacementGLF_dead5col, 1.0);
                if (_GLF_DEAD(false)) {
                    {
                        GLF_dead8b_b = 0.5 + float(GLF_dead21data[0]) / 10.0;
                    }
                }
                return;
                if (_GLF_DEAD(false)) {
                    _GLF_color = GLF_dead5_GLF_color;
                }
            }
        }
    }
    for (int i = from; i <= to; i++) {
        data[i] = temp[i];
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
        float donor_replacementGLF_dead9s = _GLF_FUZZED(float(true));
        {
            ;
        }
    }
}

void mergeSort() {
    int low = 0;
    int high = N - 1;
    for (int m = 1; m <= high; m = 2 * m) {
        for (int i = low; i < high; i += 2 * m) {
            if (_GLF_DEAD(false)) {
                if (_GLF_DEAD(false)) {
                    int donor_replacementGLF_dead6cols = _GLF_FUZZED(bitfieldExtract(high, i, -86783));
                    uint donor_replacementGLF_dead6matrix_number = _GLF_FUZZED(43503u);
                    {
                        for (int GLF_dead6c = 0; GLF_dead6c < donor_replacementGLF_dead6cols; GLF_dead6c++) {
                            for (int GLF_dead6r = 0; GLF_dead6r < i; GLF_dead6r++) {
                                switch (donor_replacementGLF_dead6matrix_number) {
                                    case 0u:
                                        GLF_dead6m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6r, 2)] = GLF_dead6one;
                                        if (_GLF_DEAD(false)) {
                                            _GLF_color = GLF_dead5_GLF_color;
                                        }
                                        break;
                                    case 1u:
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                            _GLF_color = GLF_live0gl_FragCoord;
                                        }
                                        GLF_dead6m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6r, 3)] = GLF_dead6one;
                                        if (_GLF_DEAD(_GLF_IDENTITY(false, bool(bool(_GLF_IDENTITY(false, bool(bvec3(false, true, true)))))))) {
                                            _GLF_color = GLF_live0gl_FragCoord;
                                        }
                                        break;
                                    case 2u:
                                        GLF_dead6m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6r, 4)] = GLF_dead6one;
                                        if (_GLF_DEAD(false)) {
                                            {
                                                discard;
                                            }
                                        }
                                        break;
                                    case 3u:
                                        GLF_dead6m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6r, 2)] = GLF_dead6one;
                                        break;
                                        {
                                            int GLF_live16directions = _GLF_FUZZED(97680);
                                            ivec2 GLF_live16p = _GLF_FUZZED(ivec2(58302, 42716));
                                            int GLF_live16v = _GLF_FUZZED((51934 ^ (8218 ^ 96607)));
                                            {
                                                int GLF_live16d = GLF_live16v % GLF_live16directions;
                                                GLF_live16v += GLF_live16directions;
                                                if (GLF_live16d >= 0 && GLF_live16p.x > 0 && GLF_live16map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live16p.x - 2) + (GLF_live16p.y) * 16, 256)] == 0) {
                                                    GLF_live16d--;
                                                    GLF_live16map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live16p.x) + (GLF_live16p.y) * 16, 256)] = 1;
                                                    GLF_live16map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live16p.x - 1) + (GLF_live16p.y) * 16, 256)] = 1;
                                                    GLF_live16map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live16p.x - 2) + (GLF_live16p.y) * 16, 256)] = 1;
                                                    GLF_live16p.x -= 2;
                                                    if (_GLF_DEAD(_GLF_IDENTITY(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)), (_GLF_FALSE(false, (gl_FragCoord.x < 0.0))) && true))) {
                                                        int donor_replacementGLF_dead20j = _GLF_FUZZED(bitfieldReverse(clamp(m, N, GLF_dead6r)));
                                                        vec3 donor_replacementGLF_dead20m = _GLF_FUZZED(log(mod(vec3(5.8, 3.5, -776.011), 6.2)));
                                                        vec2 donor_replacementGLF_dead20n = _GLF_FUZZED(vec2(-623.280, 9.1));
                                                        {
                                                            vec2 GLF_dead20g = vec2(float(donor_replacementGLF_dead20j), float(high));
                                                            vec2 GLF_dead20o = mix(donor_replacementGLF_dead20n, GLF_dead20g, 0.2);
                                                            if (GLF_dead20injectionSwitch.x < (donor_replacementGLF_dead20m.x)) {
                                                                int GLF_dead20k = 1;
                                                                while (GLF_dead20k >= 0) {
                                                                    GLF_dead20o = GLF_dead20o + GLF_dead20o;
                                                                    GLF_dead20k--;
                                                                }
                                                                donor_replacementGLF_dead20m = vec3(GLF_dead20injectionSwitch.x, cos(GLF_dead20o));
                                                            }
                                                        }
                                                    }
                                                }
                                                if (GLF_live16d >= 0 && GLF_live16p.y > 0 && GLF_live16map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live16p.x) + (GLF_live16p.y - 2) * 16, 256)] == 0) {
                                                    GLF_live16d--;
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                        int donor_replacementGLF_dead18iterationCap = _GLF_FUZZED(GLF_live16d);
                                                        if (0.0 > GLF_dead18resolution.y) {
                                                            donor_replacementGLF_dead18iterationCap += 1;
                                                        }
                                                    }
                                                    GLF_live16map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live16p.x) + (GLF_live16p.y) * 16, 256)] = 1;
                                                    GLF_live16map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live16p.x) + (GLF_live16p.y - 1) * 16, 256)] = 1;
                                                    GLF_live16map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live16p.x) + (GLF_live16p.y - 2) * 16, 256)] = 1;
                                                    if (_GLF_DEAD(false)) {
                                                        _GLF_color = tan(exp2(_GLF_color));
                                                        if (_GLF_DEAD(false)) {
                                                            if (0.0 > GLF_dead18resolution.y) {
                                                                GLF_live16v += 1;
                                                            }
                                                        }
                                                    }
                                                    GLF_live16p.y -= 2;
                                                }
                                                if (GLF_live16d >= 0 && GLF_live16p.x < 14 && GLF_live16map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live16p.x + 2) + (GLF_live16p.y) * 16, 256)] == 0) {
                                                    if (_GLF_DEAD(false)) {
                                                        vec4 donor_replacementGLF_dead19matrix_b = _GLF_FUZZED(_GLF_color);
                                                        for (int GLF_dead19i = (GLF_dead19MATRIX_N - 1); GLF_dead19i >= 0; GLF_dead19i--) {
                                                            for (int GLF_dead19j = (GLF_dead19MATRIX_N - 1); GLF_dead19j >= (GLF_dead19i + 1); GLF_dead19j--) {
                                                                donor_replacementGLF_dead19matrix_b[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19i, 4)] -= (GLF_dead6m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19i, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19j, 4)] * donor_replacementGLF_dead19matrix_b[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19j, 4)]);
                                                            }
                                                            donor_replacementGLF_dead19matrix_b[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19i, 4)] /= GLF_dead6m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19i, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19i, 4)];
                                                        }
                                                    }
                                                    GLF_live16d--;
                                                    GLF_live16map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live16p.x) + (GLF_live16p.y) * 16, 256)] = 1;
                                                    GLF_live16map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live16p.x + 1) + (GLF_live16p.y) * 16, 256)] = 1;
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_IDENTITY(dot(vec2(1.0, 1.0), vec2(0.0, 0.0)), dot(vec2(1.0, 1.0), vec2(0.0, 0.0))))))) {
                                                        _GLF_color = GLF_live0gl_FragCoord;
                                                    }
                                                    GLF_live16map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live16p.x + 2) + (GLF_live16p.y) * 16, 256)] = 1;
                                                    GLF_live16p.x += 2;
                                                }
                                                if (GLF_live16d >= 0 && GLF_live16p.y < 14 && GLF_live16map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live16p.x) + (GLF_live16p.y + 2) * 16, 256)] == 0) {
                                                    GLF_live16d--;
                                                    GLF_live16map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live16p.x) + (GLF_live16p.y) * 16, 256)] = 1;
                                                    GLF_live16map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live16p.x) + (GLF_live16p.y + 1) * 16, 256)] = 1;
                                                    GLF_live16map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live16p.x) + (GLF_live16p.y + 2) * 16, 256)] = 1;
                                                    GLF_live16p.y += 2;
                                                }
                                                if (_GLF_DEAD(false)) {
                                                    if (_GLF_DEAD(false)) {
                                                        mat4 donor_replacementGLF_dead19matrix_a = _GLF_FUZZED(GLF_dead6m44);
                                                        for (int GLF_dead19i = (GLF_dead19MATRIX_N - 1); GLF_dead19i >= 0; GLF_dead19i--) {
                                                            for (int GLF_dead19j = (GLF_dead19MATRIX_N - 1); GLF_dead19j >= (GLF_dead19i + 1); GLF_dead19j--) {
                                                                GLF_live16_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19i, 4)] -= (donor_replacementGLF_dead19matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19i, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19j, 4)] * GLF_live16_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19j, 4)]);
                                                            }
                                                            GLF_live16_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19i, 4)] /= donor_replacementGLF_dead19matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19i, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19i, 4)];
                                                        }
                                                    }
                                                    _GLF_color = GLF_live16_GLF_color;
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                        float donor_replacementGLF_dead19alpha1 = _GLF_FUZZED(length(injectionSwitch));
                                                        float donor_replacementGLF_dead19alpha2 = _GLF_FUZZED(GLF_dead8h_r);
                                                        int donor_replacementGLF_dead19k = _GLF_FUZZED(sign(-57450));
                                                        float donor_replacementGLF_dead19magnitudeX = _GLF_FUZZED(GLF_dead8h_r);
                                                        mat4 donor_replacementGLF_dead19matrix_a = _GLF_FUZZED((GLF_live11m24 * GLF_live11m42));
                                                        vec4 donor_replacementGLF_dead19matrix_b = _GLF_FUZZED(dFdyCoarse(GLF_dead5_GLF_color));
                                                        vec4 donor_replacementGLF_dead19matrix_u = _GLF_FUZZED(asinh(_GLF_color));
                                                        {
                                                            for (int GLF_dead19x = GLF_dead19MATRIX_N - 1; GLF_dead19x >= donor_replacementGLF_dead19k; GLF_dead19x--) {
                                                                donor_replacementGLF_dead19magnitudeX += donor_replacementGLF_dead19matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19x, 4)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead19k, 4)] * donor_replacementGLF_dead19matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19x, 4)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead19k, 4)];
                                                                donor_replacementGLF_dead19matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19x, 4)] = donor_replacementGLF_dead19matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19x, 4)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead19k, 4)];
                                                            }
                                                            donor_replacementGLF_dead19magnitudeX = sqrt(donor_replacementGLF_dead19magnitudeX);
                                                            donor_replacementGLF_dead19matrix_u[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead19k, 4)] -= (sign(donor_replacementGLF_dead19matrix_u[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead19k, 4)]) * donor_replacementGLF_dead19magnitudeX);
                                                            for (int GLF_dead19u = GLF_dead19MATRIX_N - 1; GLF_dead19u >= donor_replacementGLF_dead19k; GLF_dead19u--) {
                                                                donor_replacementGLF_dead19alpha1 += donor_replacementGLF_dead19matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19u, 4)] * donor_replacementGLF_dead19matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19u, 4)];
                                                            }
                                                            donor_replacementGLF_dead19alpha2 = 2.0 / donor_replacementGLF_dead19alpha1;
                                                            for (int GLF_dead19j = donor_replacementGLF_dead19k; GLF_dead19j < GLF_dead19MATRIX_N; GLF_dead19j++) {
                                                                for (int GLF_dead19a = GLF_dead19MATRIX_N - 1; GLF_dead19a >= donor_replacementGLF_dead19k; GLF_dead19a--) {
                                                                    GLF_dead8s_g += donor_replacementGLF_dead19matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19a, 4)] * donor_replacementGLF_dead19matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19a, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19j, 4)];
                                                                }
                                                                GLF_dead8h_r = donor_replacementGLF_dead19alpha2 * GLF_dead8s_g;
                                                                for (int GLF_dead19a = GLF_dead19MATRIX_N - 1; GLF_dead19a >= donor_replacementGLF_dead19k; GLF_dead19a--) {
                                                                    donor_replacementGLF_dead19matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19a, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19j, 4)] = donor_replacementGLF_dead19matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19a, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19j, 4)] - (GLF_dead8h_r * donor_replacementGLF_dead19matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19a, 4)]);
                                                                }
                                                                GLF_dead8s_g = 0.0;
                                                                GLF_dead8h_r = 0.0;
                                                            }
                                                            for (int GLF_dead19b = GLF_dead19MATRIX_N - 1; GLF_dead19b >= donor_replacementGLF_dead19k; GLF_dead19b--) {
                                                                GLF_dead8s_g += donor_replacementGLF_dead19matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19b, 4)] * donor_replacementGLF_dead19matrix_b[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19b, 4)];
                                                            }
                                                            GLF_dead8h_r = donor_replacementGLF_dead19alpha2 * GLF_dead8s_g;
                                                            for (int GLF_dead19b = GLF_dead19MATRIX_N - 1; GLF_dead19b >= donor_replacementGLF_dead19k; GLF_dead19b--) {
                                                                donor_replacementGLF_dead19matrix_b[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19b, 4)] = donor_replacementGLF_dead19matrix_b[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19b, 4)] - (GLF_dead8h_r * donor_replacementGLF_dead19matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19b, 4)]);
                                                            }
                                                            donor_replacementGLF_dead19magnitudeX = 0.0;
                                                            donor_replacementGLF_dead19alpha1 = 0.0;
                                                            donor_replacementGLF_dead19alpha2 = 0.0;
                                                            GLF_dead8s_g = 0.0;
                                                            GLF_dead8h_r = 0.0;
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    case 4u:
                                        GLF_dead6m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6r, 3)] = GLF_dead6one;
                                        if (_GLF_DEAD(false)) {
                                            float donor_replacementGLF_dead19alpha1 = _GLF_FUZZED(-1271.7286);
                                            vec4 donor_replacementGLF_dead19matrix_u = _GLF_FUZZED(_GLF_color);
                                            {
                                                donor_replacementGLF_dead19alpha1 += donor_replacementGLF_dead19matrix_u[_GLF_MAKE_IN_BOUNDS_INT(high, 4)] * donor_replacementGLF_dead19matrix_u[_GLF_MAKE_IN_BOUNDS_INT(high, 4)];
                                            }
                                        }
                                        if (_GLF_DEAD(false)) {
                                            _GLF_color = mix(_GLF_color, trunc(GLF_live16_GLF_color), GLF_dead8time);
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                for (int GLF_dead21j = 0; GLF_dead21j < 10; GLF_dead21j++) {
                                                    GLF_dead21temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead21j, 10)] = GLF_dead21data[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead21j, 10)];
                                                }
                                            }
                                        }
                                        break;
                                        if (_GLF_DEAD(false)) {
                                            _GLF_color = GLF_dead5_GLF_color;
                                        }
                                    case 5u:
                                        GLF_dead6m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6r, 4)] = GLF_dead6one;
                                        if (_GLF_DEAD(false)) {
                                            {
                                                GLF_dead8s_g = 0.5 + float(GLF_dead21data[2]) / 10.0;
                                            }
                                        }
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                            _GLF_color = GLF_live0gl_FragCoord;
                                        }
                                        if (_GLF_DEAD(false)) {
                                            {
                                                if (_GLF_DEAD(false)) {
                                                    _GLF_color = vec3(45.85, 3.2, -4.9).zyzz;
                                                }
                                                ;
                                            }
                                        }
                                        break;
                                    case 6u:
                                        {
                                            int GLF_live12looplimiter0 = 0;
                                            if (GLF_live12looplimiter0 >= 4) {
                                                ;
                                            }
                                        }
                                        {
                                            bool GLF_live16canwalk = _GLF_FUZZED(false);
                                            int GLF_live16i = _GLF_FUZZED(61341);
                                            int GLF_live16j = _GLF_FUZZED(58027);
                                            ivec2 GLF_live16p = _GLF_FUZZED(((-18677) - ivec2(55655, 90414)));
                                            {
                                                {
                                                    int GLF_live16looplimiter1 = 0;
                                                    for (GLF_live16j = 0; GLF_live16j < 8; GLF_live16j++) {
                                                        if (_GLF_DEAD(false)) {
                                                            _GLF_color = unpackUnorm4x8(max(127155u, donor_replacementGLF_dead6matrix_number));
                                                        }
                                                        if (GLF_live16looplimiter1 >= 7) {
                                                            break;
                                                        }
                                                        GLF_live16looplimiter1++;
                                                        {
                                                            if (GLF_live16map[_GLF_MAKE_IN_BOUNDS_INT(GLF_live16j * 2 + GLF_live16i * 2 * 16, 256)] == 0) {
                                                                GLF_live16p.x = GLF_live16j * 2;
                                                                if (_GLF_DEAD(false)) {
                                                                    _GLF_color = GLF_live16_GLF_color;
                                                                }
                                                                GLF_live16p.y = GLF_live16i * 2;
                                                                GLF_live16canwalk = true;
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                        GLF_dead6m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6r, 2)] = GLF_dead6one;
                                        break;
                                    case 7u:
                                        GLF_dead6m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6r, 3)] = GLF_dead6one;
                                        break;
                                    case 8u:
                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                            _GLF_color = GLF_live16_GLF_color;
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < _GLF_ZERO(0.0, injectionSwitch.x))))) {
                                                float donor_replacementGLF_dead21grey = _GLF_FUZZED(fract(GLF_live11one));
                                                {
                                                    if (int(GLF_dead21gl_FragCoord[1]) < 240) {
                                                        donor_replacementGLF_dead21grey = 0.5 + float(GLF_dead21data[7]) / 10.0;
                                                    } else {
                                                        if (int(GLF_dead21gl_FragCoord[1]) < 270) {
                                                            donor_replacementGLF_dead21grey = 0.5 + float(GLF_dead21data[8]) / 10.0;
                                                        } else {
                                                            discard;
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                        GLF_dead6m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6r, 4)] = GLF_dead6one;
                                        break;
                                }
                            }
                        }
                        if (_GLF_DEAD(false)) {
                            _GLF_color = faceforward(injectionSwitch.ggrr, vec4(resolution, GLF_dead6m32[0]), vec4(2.3, -9934.4426, 7484.5425, -511.388));
                        }
                        donor_replacementGLF_dead6matrix_number = donor_replacementGLF_dead6matrix_number + 1u;
                    }
                }
                _GLF_color = (mat3x4(-1.0, -75.43, 1236.7447, 6.7, -4.4, 4.2, -417.604, 115.212, 1.1, -3547.8737, -1.4, 58.77) * vec3(47.36, 0.4, -8.3));
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    _GLF_color = vec4(6119.4213, 7.0, -8.3, 0.4);
                }
            }
            {
                if (_GLF_DEAD(false)) {
                    float donor_replacementGLF_dead19beta = _GLF_FUZZED(length(mix(GLF_live11one, GLF_dead8time, (GLF_live16_GLF_color != GLF_dead5_GLF_color))));
                    mat4 donor_replacementGLF_dead19matrix_a = _GLF_FUZZED(mat4(GLF_dead8time));
                    for (int GLF_dead19a = GLF_dead19MATRIX_N - 1; GLF_dead19a >= high; GLF_dead19a--) {
                        donor_replacementGLF_dead19matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19a, 4)][_GLF_MAKE_IN_BOUNDS_INT(high, 4)] = donor_replacementGLF_dead19matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19a, 4)][_GLF_MAKE_IN_BOUNDS_INT(high, 4)] - (donor_replacementGLF_dead19beta * GLF_live0gl_FragCoord[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19a, 4)]);
                    }
                }
                {
                    {
                        ;
                    }
                }
                vec2 GLF_live0color = _GLF_FUZZED(((-2.7) + vec3(22.17, -61.33, -5.9).xz));
                vec3 GLF_live0vecCoor = _GLF_FUZZED((mat4x3(-58.12, -57.50, -0.9, 8435.4766, -9391.4911, 2270.3629, 7.0, -9.3, -405.277, -720.390, 2.0, -934.689) * vec4(-2858.8749, 2.4, -5.1, 0.9)));
                if (_GLF_DEAD(false)) {
                    _GLF_color = round(_GLF_color);
                }
                {
                    GLF_live0color = fract(sin(GLF_live0vecCoor.yx - trunc(float(GLF_live0data[5]))));
                    if (_GLF_DEAD(_GLF_IDENTITY(false, !(!(false))))) {
                        vec2 donor_replacementGLF_dead5uv = _GLF_FUZZED(intBitsToFloat(bitCount(ivec2(-25926, -1768))));
                        {
                            if (_GLF_DEAD(false)) {
                                _GLF_color = min(vec4(-4.2, 2.9, -775.991, 0.8), (GLF_live11m34 * vec3(55.88, 44.53, 8.1)));
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    {
                                        break;
                                    }
                                }
                            }
                            float GLF_dead5stripe = GLF_dead5compute_stripe(cos((donor_replacementGLF_dead5uv.x + donor_replacementGLF_dead5uv.y) * 20.0), donor_replacementGLF_dead5uv.x + donor_replacementGLF_dead5uv.y);
                            GLF_live0vecCoor = mix(vec3(donor_replacementGLF_dead5uv.x, 0, 0.75), vec3(.8, .7, donor_replacementGLF_dead5uv.x), GLF_dead5stripe);
                            if (_GLF_DEAD(false)) {
                                int donor_replacementGLF_dead8msb8 = _GLF_FUZZED(N);
                                {
                                    int GLF_live16d = _GLF_FUZZED(7898);
                                    ivec2 GLF_live16p = _GLF_FUZZED(ivec2(-36297, 58678));
                                    if (_GLF_DEAD(false)) {
                                        {
                                            GLF_dead8b_b = 1.0;
                                            GLF_dead5stripe = 1.0;
                                        }
                                    }
                                    if (GLF_live16d >= 0 && GLF_live16p.y < 14 && GLF_live16map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live16p.x) + (GLF_live16p.y + 2) * 16, 256)] == 0) {
                                        GLF_live16d--;
                                        GLF_live16map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live16p.x) + (GLF_live16p.y) * 16, 256)] = 1;
                                        GLF_live16map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live16p.x) + (GLF_live16p.y + 1) * 16, 256)] = 1;
                                        GLF_live16map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live16p.x) + (GLF_live16p.y + 2) * 16, 256)] = 1;
                                        GLF_live16p.y += 2;
                                    }
                                }
                                vec3 donor_replacementGLF_dead8setting = _GLF_FUZZED(GLF_live0vecCoor);
                                {
                                    ;
                                }
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    int donor_replacementGLF_dead18iterationCap = _GLF_FUZZED((low ^ ivec2(82221, -53669)[0]));
                                    if (0.0 > GLF_dead18resolution.y) {
                                        donor_replacementGLF_dead18iterationCap += 1;
                                    }
                                }
                            }
                            GLF_dead5_GLF_color = vec4(GLF_live0vecCoor, 1.0);
                            return;
                            {
                                if (_GLF_DEAD(false)) {
                                    int donor_replacementGLF_dead19b = _GLF_FUZZED(floatBitsToInt(GLF_live11one));
                                    {
                                        GLF_dead5_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead19b, 4)] = GLF_dead5_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead19b, 4)] - (GLF_dead8s_g * _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead19b, 4)]);
                                    }
                                }
                                int GLF_live16looplimiter3 = 0;
                                if (GLF_live16looplimiter3 >= 7) {
                                    ;
                                }
                            }
                            if (_GLF_DEAD(false)) {
                                {
                                    break;
                                }
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                    _GLF_color = _GLF_color;
                                }
                                if (_GLF_DEAD(false)) {
                                    {
                                        GLF_dead8s_g = 1.0;
                                        GLF_dead8s_g = 1.0;
                                    }
                                }
                                bool donor_replacementGLF_dead8c5 = _GLF_FUZZED(false);
                                vec2 donor_replacementGLF_dead8pos = _GLF_FUZZED(log2(smoothstep(GLF_dead5injectionSwitch, injectionSwitch, injectionSwitch)));
                                vec3 donor_replacementGLF_dead8setting = _GLF_FUZZED(clamp(GLF_live0vecCoor, GLF_live0vecCoor, clamp(GLF_live0vecCoor, GLF_live0vecCoor, vec3(-9549.3602, 4.9, 7775.4727))));
                                if (!donor_replacementGLF_dead8c5) {
                                    ;
                                }
                            }
                        }
                    }
                    GLF_live0color.y -= tanh(GLF_live0color.x) / cosh(GLF_live0color.y);
                    if (_GLF_DEAD(false)) {
                        {
                            if (_GLF_DEAD(false)) {
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    int donor_replacementGLF_dead19b = _GLF_FUZZED(m);
                                    vec4 donor_replacementGLF_dead19matrix_b = _GLF_FUZZED(vec4(GLF_dead8b_b, GLF_dead6one, injectionSwitch));
                                    {
                                        donor_replacementGLF_dead19matrix_b[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead19b, 4)] = donor_replacementGLF_dead19matrix_b[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead19b, 4)] - (GLF_dead8h_r * GLF_dead5_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead19b, 4)]);
                                    }
                                }
                                _GLF_color = vec4(-755.405, 97.89, -4.7, 0.8);
                            }
                            continue;
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        {
                            vec2 GLF_live17pos = _GLF_FUZZED(vec2(-38.31, 31.60));
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                {
                                    if (int(GLF_dead21gl_FragCoord[1]) < 210) {
                                        GLF_dead8h_r = 0.5 + float(GLF_dead21data[6]) / 10.0;
                                    } else {
                                        if (int(GLF_dead21gl_FragCoord[1]) < 240) {
                                            GLF_dead8h_r = 0.5 + float(GLF_dead21data[7]) / 10.0;
                                        } else {
                                            if (int(GLF_dead21gl_FragCoord[1]) < 270) {
                                                GLF_dead8h_r = 0.5 + float(GLF_dead21data[8]) / 10.0;
                                            } else {
                                                discard;
                                            }
                                        }
                                    }
                                }
                            }
                            vec4 GLF_live17quad = _GLF_FUZZED(((-8.2) - vec4(4.0, -832.552, -237.573, 492.744)));
                            if (_GLF_DEAD(false)) {
                                float donor_replacementGLF_dead18x = _GLF_FUZZED(-5939.2513);
                                if (donor_replacementGLF_dead18x * donor_replacementGLF_dead18x + GLF_dead8b_b * GLF_dead8b_b > 4.0) {
                                    break;
                                }
                            }
                            if (GLF_live17pos.x < GLF_live17quad.x) {
                                ;
                            }
                        }
                        bool donor_replacementGLF_dead5c1 = _GLF_FUZZED(true);
                        bool donor_replacementGLF_dead5c2 = _GLF_FUZZED((vec2(pow(GLF_live0gl_FragCoord, _GLF_color)) == GLF_live0color));
                        {
                            int GLF_live11cols = _GLF_FUZZED((int(true) + (-97502)));
                            uint GLF_live11matrix_number = _GLF_FUZZED((false ? 77395u : (uvec3(155335u, 97219u, 196740u).y * 55269u)));
                            {
                                int GLF_live11looplimiter2 = 0;
                                for (int GLF_live11rows = 2; GLF_live11rows <= 4; GLF_live11rows++) {
                                    if (GLF_live11looplimiter2 >= 5) {
                                        break;
                                        if (_GLF_DEAD(false)) {
                                            mat4 donor_replacementGLF_dead19matrix_a = _GLF_FUZZED((GLF_dead8h_r + (GLF_dead6m44 / GLF_dead6one)));
                                            for (int GLF_dead19i = (GLF_dead19MATRIX_N - 1); GLF_dead19i >= 0; GLF_dead19i--) {
                                                for (int GLF_dead19j = (GLF_dead19MATRIX_N - 1); GLF_dead19j >= (GLF_dead19i + 1); GLF_dead19j--) {
                                                    GLF_live0gl_FragCoord[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19i, 4)] -= (donor_replacementGLF_dead19matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19i, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19j, 4)] * GLF_live0gl_FragCoord[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19j, 4)]);
                                                }
                                                GLF_live0gl_FragCoord[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19i, 4)] /= donor_replacementGLF_dead19matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19i, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19i, 4)];
                                            }
                                        }
                                    }
                                    GLF_live11looplimiter2++;
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                        _GLF_color = acosh(radians(GLF_live16_GLF_color));
                                    }
                                    {
                                        {
                                            int GLF_live11looplimiter1 = 0;
                                            for (int GLF_live11c = 0; GLF_live11c < GLF_live11cols; GLF_live11c++) {
                                                if (GLF_live11looplimiter1 >= 5) {
                                                    break;
                                                }
                                                GLF_live11looplimiter1++;
                                                {
                                                    {
                                                        int GLF_live11looplimiter0 = 0;
                                                        for (int GLF_live11r = 0; GLF_live11r < GLF_live11rows; GLF_live11r++) {
                                                            if (_GLF_DEAD(false)) {
                                                                float donor_replacementGLF_dead18y = _GLF_FUZZED(resolution.t);
                                                                if (GLF_dead8s_g * GLF_dead8s_g + donor_replacementGLF_dead18y * donor_replacementGLF_dead18y > 4.0) {
                                                                    break;
                                                                }
                                                            }
                                                            if (GLF_live11looplimiter0 >= 5) {
                                                                break;
                                                            }
                                                            GLF_live11looplimiter0++;
                                                            {
                                                                switch (GLF_live11matrix_number) {
                                                                    case 0u:
                                                                        GLF_live11m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live11r, 2)] = GLF_live11one;
                                                                        break;
                                                                    case 1u:
                                                                        GLF_live11m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live11r, 3)] = GLF_live11one;
                                                                        break;
                                                                    case 2u:
                                                                        GLF_live11m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live11r, 4)] = GLF_live11one;
                                                                        break;
                                                                    case 3u:
                                                                        GLF_live11m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live11r, 2)] = GLF_live11one;
                                                                        break;
                                                                    case 4u:
                                                                        GLF_live11m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live11r, 3)] = GLF_live11one;
                                                                        break;
                                                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                                            if (_GLF_DEAD(false)) {
                                                                                for (int GLF_dead19i = (GLF_dead19MATRIX_N - 1); GLF_dead19i >= 0; GLF_dead19i--) {
                                                                                    for (int GLF_dead19j = (GLF_dead19MATRIX_N - 1); GLF_dead19j >= (GLF_dead19i + 1); GLF_dead19j--) {
                                                                                        _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19i, 4)] -= (GLF_live11m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19i, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19j, 4)] * _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19j, 4)]);
                                                                                    }
                                                                                    _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19i, 4)] /= GLF_live11m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19i, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19i, 4)];
                                                                                }
                                                                            }
                                                                            _GLF_color = GLF_dead5_GLF_color;
                                                                            if (_GLF_DEAD(false)) {
                                                                                int donor_replacementGLF_dead19i = _GLF_FUZZED(GLF_live11looplimiter0);
                                                                                mat4 donor_replacementGLF_dead19matrix_a = _GLF_FUZZED(mat4(mat2(984.045, -4.3, -984.326, -81.11)));
                                                                                vec4 donor_replacementGLF_dead19matrix_b = _GLF_FUZZED(GLF_live16_GLF_color);
                                                                                for (int GLF_dead19j = (GLF_dead19MATRIX_N - 1); GLF_dead19j >= (donor_replacementGLF_dead19i + 1); GLF_dead19j--) {
                                                                                    donor_replacementGLF_dead19matrix_b[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead19i, 4)] -= (donor_replacementGLF_dead19matrix_a[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead19i, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19j, 4)] * donor_replacementGLF_dead19matrix_b[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19j, 4)]);
                                                                                }
                                                                            }
                                                                        }
                                                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                                            int donor_replacementGLF_dead19i = _GLF_FUZZED(GLF_live11cols);
                                                                            vec4 donor_replacementGLF_dead19matrix_b = _GLF_FUZZED(degrees(GLF_dead5_GLF_color));
                                                                            {
                                                                                donor_replacementGLF_dead19matrix_b[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead19i, 4)] -= (GLF_live11m44[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead19i, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live11c, 4)] * donor_replacementGLF_dead19matrix_b[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11c, 4)]);
                                                                            }
                                                                        }
                                                                    case 5u:
                                                                        GLF_live11m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live11r, 4)] = GLF_live11one;
                                                                        break;
                                                                    case 6u:
                                                                        GLF_live11m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live11r, 2)] = GLF_live11one;
                                                                        break;
                                                                    case 7u:
                                                                        {
                                                                            vec2 GLF_live17pos = _GLF_FUZZED(vec2(3416.7543, -55.45));
                                                                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                                                _GLF_color = _GLF_color;
                                                                            }
                                                                            vec4 GLF_live17quad = _GLF_FUZZED(vec4(-450.797, 354.249, 94.50, 649.881));
                                                                            if (GLF_live17pos.y < GLF_live17quad.y) {
                                                                                ;
                                                                                if (_GLF_DEAD(false)) {
                                                                                    {
                                                                                        if (int(GLF_dead21gl_FragCoord[1]) < 210) {
                                                                                            GLF_dead8b_b = 0.5 + float(GLF_dead21data[6]) / 10.0;
                                                                                        } else {
                                                                                            if (int(GLF_dead21gl_FragCoord[1]) < 240) {
                                                                                                GLF_dead8b_b = 0.5 + float(GLF_dead21data[7]) / 10.0;
                                                                                            } else {
                                                                                                if (int(GLF_dead21gl_FragCoord[1]) < 270) {
                                                                                                    GLF_dead8b_b = 0.5 + float(GLF_dead21data[8]) / 10.0;
                                                                                                } else {
                                                                                                    discard;
                                                                                                }
                                                                                            }
                                                                                        }
                                                                                    }
                                                                                }
                                                                            }
                                                                        }
                                                                        GLF_live11m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live11r, 3)] = GLF_live11one;
                                                                        break;
                                                                        if (_GLF_DEAD(false)) {
                                                                            float donor_replacementGLF_dead21grey = _GLF_FUZZED(GLF_dead8s_g);
                                                                            if (int(GLF_dead21gl_FragCoord[1]) < 180) {
                                                                                donor_replacementGLF_dead21grey = 0.5 + float(GLF_dead21data[5]) / 10.0;
                                                                            } else {
                                                                                if (int(GLF_dead21gl_FragCoord[1]) < 210) {
                                                                                    donor_replacementGLF_dead21grey = 0.5 + float(GLF_dead21data[6]) / 10.0;
                                                                                } else {
                                                                                    if (int(GLF_dead21gl_FragCoord[1]) < 240) {
                                                                                        donor_replacementGLF_dead21grey = 0.5 + float(GLF_dead21data[7]) / 10.0;
                                                                                    } else {
                                                                                        if (int(GLF_dead21gl_FragCoord[1]) < 270) {
                                                                                            donor_replacementGLF_dead21grey = 0.5 + float(GLF_dead21data[8]) / 10.0;
                                                                                        } else {
                                                                                            discard;
                                                                                        }
                                                                                    }
                                                                                }
                                                                            }
                                                                        }
                                                                        if (_GLF_DEAD(false)) {
                                                                            _GLF_color = _GLF_color;
                                                                        }
                                                                    case 8u:
                                                                        GLF_live11m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live11r, 4)] = GLF_live11one;
                                                                        if (_GLF_DEAD(false)) {
                                                                            if (GLF_live11looplimiter0 >= int(GLF_dead20resolution.x)) {
                                                                                break;
                                                                            }
                                                                        }
                                                                        break;
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                                if (_GLF_DEAD(false)) {
                                                    {
                                                        discard;
                                                    }
                                                }
                                            }
                                        }
                                        if (_GLF_DEAD(false)) {
                                            int donor_replacementGLF_dead21from = _GLF_FUZZED((int(73885u) % i));
                                            for (int GLF_dead21i = donor_replacementGLF_dead21from; GLF_dead21i <= low; GLF_dead21i++) {
                                                GLF_dead21data[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead21i, 10)] = GLF_dead21temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead21i, 10)];
                                            }
                                        }
                                        GLF_live11matrix_number = GLF_live11matrix_number + 1u;
                                        if (_GLF_DEAD(false)) {
                                            _GLF_color = ((GLF_live11m44 * GLF_live11m34) * mod(GLF_live0vecCoor, GLF_live0vecCoor));
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < log(1.0))))) {
                                                float donor_replacementGLF_dead21grey = _GLF_FUZZED(determinant(GLF_live11m44));
                                                if (int(GLF_dead21gl_FragCoord[1]) < 30) {
                                                    donor_replacementGLF_dead21grey = 0.5 + float(GLF_dead21data[0]) / 10.0;
                                                } else {
                                                    if (int(GLF_dead21gl_FragCoord[1]) < 60) {
                                                        donor_replacementGLF_dead21grey = 0.5 + float(GLF_dead21data[1]) / 10.0;
                                                    } else {
                                                        if (int(GLF_dead21gl_FragCoord[1]) < 90) {
                                                            donor_replacementGLF_dead21grey = 0.5 + float(GLF_dead21data[2]) / 10.0;
                                                        } else {
                                                            if (int(GLF_dead21gl_FragCoord[1]) < 120) {
                                                                donor_replacementGLF_dead21grey = 0.5 + float(GLF_dead21data[3]) / 10.0;
                                                            } else {
                                                                if (int(GLF_dead21gl_FragCoord[1]) < 150) {
                                                                    discard;
                                                                } else {
                                                                    if (int(GLF_dead21gl_FragCoord[1]) < 180) {
                                                                        donor_replacementGLF_dead21grey = 0.5 + float(GLF_dead21data[5]) / 10.0;
                                                                    } else {
                                                                        if (int(GLF_dead21gl_FragCoord[1]) < 210) {
                                                                            donor_replacementGLF_dead21grey = 0.5 + float(GLF_dead21data[6]) / 10.0;
                                                                        } else {
                                                                            if (int(GLF_dead21gl_FragCoord[1]) < 240) {
                                                                                donor_replacementGLF_dead21grey = 0.5 + float(GLF_dead21data[7]) / 10.0;
                                                                            } else {
                                                                                if (int(GLF_dead21gl_FragCoord[1]) < 270) {
                                                                                    donor_replacementGLF_dead21grey = 0.5 + float(GLF_dead21data[8]) / 10.0;
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
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        bool donor_replacementGLF_dead5c3 = _GLF_FUZZED(false);
                        if (_GLF_DEAD(false)) {
                            float donor_replacementGLF_dead19alpha1 = _GLF_FUZZED(vec3(-9140.7957, -625.372, 3998.6111)[0]);
                            float donor_replacementGLF_dead19alpha2 = _GLF_FUZZED(tan(GLF_live11one));
                            float donor_replacementGLF_dead19alpha3 = _GLF_FUZZED(GLF_dead8s_g);
                            float donor_replacementGLF_dead19beta = _GLF_FUZZED(uintBitsToFloat(186170u));
                            float donor_replacementGLF_dead19magnitudeX = _GLF_FUZZED(GLF_dead8h_r);
                            vec4 donor_replacementGLF_dead19matrix_b = _GLF_FUZZED(uintBitsToFloat(uvec4(145465u, 176993u, 184262u, 17307u)));
                            {
                                for (int GLF_dead19x = GLF_dead19MATRIX_N - 1; GLF_dead19x >= low; GLF_dead19x--) {
                                    donor_replacementGLF_dead19magnitudeX += GLF_dead6m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19x, 4)][_GLF_MAKE_IN_BOUNDS_INT(low, 4)] * GLF_dead6m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19x, 4)][_GLF_MAKE_IN_BOUNDS_INT(low, 4)];
                                    GLF_live16_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19x, 4)] = GLF_dead6m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19x, 4)][_GLF_MAKE_IN_BOUNDS_INT(low, 4)];
                                }
                                donor_replacementGLF_dead19magnitudeX = sqrt(donor_replacementGLF_dead19magnitudeX);
                                GLF_live16_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(low, 4)] -= (sign(GLF_live16_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(low, 4)]) * donor_replacementGLF_dead19magnitudeX);
                                for (int GLF_dead19u = GLF_dead19MATRIX_N - 1; GLF_dead19u >= low; GLF_dead19u--) {
                                    donor_replacementGLF_dead19alpha1 += GLF_live16_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19u, 4)] * GLF_live16_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19u, 4)];
                                }
                                donor_replacementGLF_dead19alpha2 = 2.0 / donor_replacementGLF_dead19alpha1;
                                for (int GLF_dead19j = low; GLF_dead19j < GLF_dead19MATRIX_N; GLF_dead19j++) {
                                    for (int GLF_dead19a = GLF_dead19MATRIX_N - 1; GLF_dead19a >= low; GLF_dead19a--) {
                                        donor_replacementGLF_dead19alpha3 += GLF_live16_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19a, 4)] * GLF_dead6m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19a, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19j, 4)];
                                    }
                                    donor_replacementGLF_dead19beta = donor_replacementGLF_dead19alpha2 * donor_replacementGLF_dead19alpha3;
                                    for (int GLF_dead19a = GLF_dead19MATRIX_N - 1; GLF_dead19a >= low; GLF_dead19a--) {
                                        GLF_dead6m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19a, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19j, 4)] = GLF_dead6m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19a, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19j, 4)] - (donor_replacementGLF_dead19beta * GLF_live16_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19a, 4)]);
                                    }
                                    donor_replacementGLF_dead19alpha3 = 0.0;
                                    donor_replacementGLF_dead19beta = 0.0;
                                }
                                for (int GLF_dead19b = GLF_dead19MATRIX_N - 1; GLF_dead19b >= low; GLF_dead19b--) {
                                    donor_replacementGLF_dead19alpha3 += GLF_live16_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19b, 4)] * donor_replacementGLF_dead19matrix_b[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19b, 4)];
                                }
                                donor_replacementGLF_dead19beta = donor_replacementGLF_dead19alpha2 * donor_replacementGLF_dead19alpha3;
                                for (int GLF_dead19b = GLF_dead19MATRIX_N - 1; GLF_dead19b >= low; GLF_dead19b--) {
                                    donor_replacementGLF_dead19matrix_b[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19b, 4)] = donor_replacementGLF_dead19matrix_b[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19b, 4)] - (donor_replacementGLF_dead19beta * GLF_live16_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19b, 4)]);
                                }
                                donor_replacementGLF_dead19magnitudeX = 0.0;
                                donor_replacementGLF_dead19alpha1 = 0.0;
                                donor_replacementGLF_dead19alpha2 = 0.0;
                                donor_replacementGLF_dead19alpha3 = 0.0;
                                donor_replacementGLF_dead19beta = 0.0;
                            }
                        }
                        if (_GLF_DEAD(false)) {
                            _GLF_color = GLF_live0gl_FragCoord;
                        }
                        bool donor_replacementGLF_dead5c4 = _GLF_FUZZED(false);
                        vec3 donor_replacementGLF_dead5col = _GLF_FUZZED(GLF_live0vecCoor);
                        vec2 donor_replacementGLF_dead5uv = _GLF_FUZZED((resolution * (-607.424)));
                        if (_GLF_DEAD(false)) {
                            _GLF_color = degrees(GLF_live16_GLF_color);
                        }
                        if (!donor_replacementGLF_dead5c1 && !donor_replacementGLF_dead5c2 && !donor_replacementGLF_dead5c3 && donor_replacementGLF_dead5c4) {
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                _GLF_color = atan(vec4(6492.1149, -934.593, 836.891, -8770.0779));
                            }
                            float GLF_dead5stripe = GLF_dead5compute_stripe(tan((donor_replacementGLF_dead5uv.x + donor_replacementGLF_dead5uv.y) * 20.0), donor_replacementGLF_dead5uv.x + donor_replacementGLF_dead5uv.y);
                            donor_replacementGLF_dead5col = mix(vec3(donor_replacementGLF_dead5uv.x, .8, 0), vec3(1, donor_replacementGLF_dead5uv.y, 0), GLF_dead5stripe);
                            GLF_dead5_GLF_color = vec4(donor_replacementGLF_dead5col, 1.0);
                            return;
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                {
                                    int GLF_live16directions = _GLF_FUZZED(-35286);
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < sin(0.0))))) {
                                        _GLF_color = GLF_live0gl_FragCoord;
                                        if (_GLF_DEAD(false)) {
                                            float donor_replacementGLF_dead19alpha3 = _GLF_FUZZED(GLF_dead6one);
                                            int donor_replacementGLF_dead19j = _GLF_FUZZED(N);
                                            mat4 donor_replacementGLF_dead19matrix_a = _GLF_FUZZED(GLF_dead6m44);
                                            for (int GLF_dead19a = GLF_dead19MATRIX_N - 1; GLF_dead19a >= i; GLF_dead19a--) {
                                                donor_replacementGLF_dead19alpha3 += GLF_live0gl_FragCoord[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19a, 4)] * donor_replacementGLF_dead19matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19a, 4)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead19j, 4)];
                                            }
                                        }
                                    }
                                    ivec2 GLF_live16p = _GLF_FUZZED(((-81782) ^ ivec2(90325, -35546)));
                                    if (GLF_live16p.y < 14 && GLF_live16map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live16p.x) + (GLF_live16p.y + 2) * 16, 256)] == 0) {
                                        GLF_live16directions += 1;
                                    }
                                }
                                {
                                    int GLF_dead7k = 1;
                                    while (GLF_dead7k >= 0) {
                                        {
                                            ivec2 GLF_live16ipos = _GLF_FUZZED(ivec2(-96381, -42432));
                                            if (GLF_live16map[_GLF_MAKE_IN_BOUNDS_INT(GLF_live16ipos.y * 16 + GLF_live16ipos.x, 256)] == 1) {
                                                GLF_live16_GLF_color = vec4(1.0, 1.0, 1.0, 1.0);
                                                ;
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < sqrt(sqrt(0.0)))))) {
                                                    _GLF_color = GLF_dead5_GLF_color;
                                                }
                                            }
                                        }
                                        donor_replacementGLF_dead5uv = donor_replacementGLF_dead5uv + donor_replacementGLF_dead5uv;
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                            if (int(GLF_dead21gl_FragCoord[1]) < 240) {
                                                GLF_dead8b_b = 0.5 + float(GLF_dead21data[7]) / 10.0;
                                            } else {
                                                if (int(GLF_dead21gl_FragCoord[1]) < 270) {
                                                    GLF_dead8b_b = 0.5 + float(GLF_dead21data[8]) / 10.0;
                                                } else {
                                                    discard;
                                                }
                                            }
                                        }
                                        if (_GLF_DEAD(false)) {
                                            _GLF_color = exp2(unpackUnorm4x8(139659u));
                                        }
                                        {
                                            int GLF_live16d = _GLF_FUZZED(-4315);
                                            ivec2 GLF_live16p = _GLF_FUZZED(ivec4(87532, -80906, 15783, -1318).ww);
                                            {
                                                GLF_live16d--;
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                    float donor_replacementGLF_dead19alpha2 = _GLF_FUZZED(GLF_dead8h_r);
                                                    float donor_replacementGLF_dead19alpha3 = _GLF_FUZZED(step(GLF_dead5stripe, GLF_dead6one));
                                                    int donor_replacementGLF_dead19j = _GLF_FUZZED((~findMSB(95651)));
                                                    int donor_replacementGLF_dead19k = _GLF_FUZZED((donor_replacementGLF_dead5c3 ? m : ivec3(-53269, 24548, 95641)[0]));
                                                    {
                                                        for (int GLF_dead19a = GLF_dead19MATRIX_N - 1; GLF_dead19a >= donor_replacementGLF_dead19k; GLF_dead19a--) {
                                                            donor_replacementGLF_dead19alpha3 += GLF_live16_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19a, 4)] * GLF_dead6m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19a, 4)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead19j, 4)];
                                                        }
                                                        GLF_dead8s_g = donor_replacementGLF_dead19alpha2 * donor_replacementGLF_dead19alpha3;
                                                        for (int GLF_dead19a = GLF_dead19MATRIX_N - 1; GLF_dead19a >= donor_replacementGLF_dead19k; GLF_dead19a--) {
                                                            GLF_dead6m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19a, 4)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead19j, 4)] = GLF_dead6m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19a, 4)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead19j, 4)] - (GLF_dead8s_g * GLF_live16_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19a, 4)]);
                                                        }
                                                        donor_replacementGLF_dead19alpha3 = 0.0;
                                                        GLF_dead8s_g = 0.0;
                                                    }
                                                }
                                                GLF_live16map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live16p.x) + (GLF_live16p.y) * 16, 256)] = 1;
                                                GLF_live16map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live16p.x - 1) + (GLF_live16p.y) * 16, 256)] = 1;
                                                GLF_live16map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live16p.x - 2) + (GLF_live16p.y) * 16, 256)] = 1;
                                                GLF_live16p.x -= 2;
                                            }
                                        }
                                        GLF_dead7k--;
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                            _GLF_color = GLF_dead5_GLF_color;
                                        }
                                    }
                                    donor_replacementGLF_dead5col = vec3(GLF_dead7injectionSwitch.x, cos(donor_replacementGLF_dead5uv));
                                }
                            }
                        }
                    }
                    ;
                    if (_GLF_DEAD(false)) {
                        _GLF_color = _GLF_color;
                    }
                }
            }
            if (_GLF_DEAD(false)) {
                vec3 donor_replacementGLF_dead5col = _GLF_FUZZED(fract(exp2(vec3(-7797.3404, 6.0, -6.4))));
                {
                    bool GLF_live16canwalk = _GLF_FUZZED((mat3(-71.35, 953.875, 2.5, -344.617, -5.1, -9248.0359, -4.9, 6.3, 8952.1414) != mat3(-946.046, -14.21, 56.98, 8.8, -8.2, 4.7, -777.879, -7.1, -908.368)));
                    int GLF_live16i = _GLF_FUZZED((16314 - (-54899)));
                    int GLF_live16j = _GLF_FUZZED(9125);
                    ivec2 GLF_live16p = _GLF_FUZZED(ivec2(-89123, -90869));
                    {
                        if (GLF_live16map[_GLF_MAKE_IN_BOUNDS_INT(GLF_live16j * 2 + GLF_live16i * 2 * 16, 256)] == 0) {
                            GLF_live16p.x = GLF_live16j * 2;
                            GLF_live16p.y = GLF_live16i * 2;
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                _GLF_color = GLF_dead5_GLF_color;
                            }
                            GLF_live16canwalk = true;
                        }
                    }
                }
                vec2 donor_replacementGLF_dead5uv = _GLF_FUZZED(resolution);
                {
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < determinant(mat4(0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, sqrt(1.0), 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0)))))) {
                        _GLF_color = acosh(faceforward(vec4(868.268, -7124.7790, 47.48, -69.51), _GLF_color, (GLF_live0gl_FragCoord / _GLF_color)));
                    }
                    if (_GLF_DEAD(false)) {
                        vec4 donor_replacementGLF_dead9c = _GLF_FUZZED(_GLF_color);
                        for (int GLF_dead9i = 0; GLF_dead9i < 3; GLF_dead9i++) {
                            {
                                vec2 GLF_live13a = _GLF_FUZZED(vec2(83.20, -9.8));
                                float GLF_live13z = _GLF_FUZZED(-365.388);
                                {
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                        mat4 donor_replacementGLF_dead19matrix_a = _GLF_FUZZED(mat4(9.0, -8.0, 4.2, 390.766, -7.6, -165.396, -933.925, 68.45, 57.01, 8823.0484, -667.804, -2.5, -1.0, 1.9, -4.2, -7.4));
                                        vec4 donor_replacementGLF_dead19matrix_u = _GLF_FUZZED(intBitsToFloat(ivec4(-43840, -64521, 37004, 83192)));
                                        for (int GLF_dead19a = GLF_dead19MATRIX_N - 1; GLF_dead19a >= low; GLF_dead19a--) {
                                            GLF_live13z += donor_replacementGLF_dead19matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19a, 4)] * donor_replacementGLF_dead19matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19a, 4)][_GLF_MAKE_IN_BOUNDS_INT(high, 4)];
                                        }
                                    }
                                    GLF_live13z = GLF_live13a.x / GLF_live13a.y;
                                }
                            }
                            if (_GLF_DEAD(false)) {
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                    float donor_replacementGLF_dead19beta = _GLF_FUZZED(GLF_live11one);
                                    mat4 donor_replacementGLF_dead19matrix_a = _GLF_FUZZED(GLF_live11m44);
                                    vec4 donor_replacementGLF_dead19matrix_u = _GLF_FUZZED(asinh(GLF_live16_GLF_color));
                                    for (int GLF_dead19a = GLF_dead19MATRIX_N - 1; GLF_dead19a >= m; GLF_dead19a--) {
                                        donor_replacementGLF_dead19matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19a, 4)][_GLF_MAKE_IN_BOUNDS_INT(low, 4)] = donor_replacementGLF_dead19matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19a, 4)][_GLF_MAKE_IN_BOUNDS_INT(low, 4)] - (donor_replacementGLF_dead19beta * donor_replacementGLF_dead19matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19a, 4)]);
                                    }
                                }
                                _GLF_color = GLF_live16_GLF_color;
                            }
                            if (_GLF_DEAD(false)) {
                                float donor_replacementGLF_dead21grey = _GLF_FUZZED(length(GLF_dead6m33[0]));
                                if (int(GLF_dead21gl_FragCoord[1]) < 60) {
                                    donor_replacementGLF_dead21grey = 0.5 + float(GLF_dead21data[1]) / 10.0;
                                } else {
                                    if (int(GLF_dead21gl_FragCoord[1]) < 90) {
                                        donor_replacementGLF_dead21grey = 0.5 + float(GLF_dead21data[2]) / 10.0;
                                    } else {
                                        if (int(GLF_dead21gl_FragCoord[1]) < 120) {
                                            donor_replacementGLF_dead21grey = 0.5 + float(GLF_dead21data[3]) / 10.0;
                                        } else {
                                            if (int(GLF_dead21gl_FragCoord[1]) < 150) {
                                                discard;
                                            } else {
                                                if (int(GLF_dead21gl_FragCoord[1]) < 180) {
                                                    donor_replacementGLF_dead21grey = 0.5 + float(GLF_dead21data[5]) / 10.0;
                                                } else {
                                                    if (int(GLF_dead21gl_FragCoord[1]) < 210) {
                                                        donor_replacementGLF_dead21grey = 0.5 + float(GLF_dead21data[6]) / 10.0;
                                                    } else {
                                                        if (int(GLF_dead21gl_FragCoord[1]) < 240) {
                                                            donor_replacementGLF_dead21grey = 0.5 + float(GLF_dead21data[7]) / 10.0;
                                                        } else {
                                                            if (int(GLF_dead21gl_FragCoord[1]) < 270) {
                                                                donor_replacementGLF_dead21grey = 0.5 + float(GLF_dead21data[8]) / 10.0;
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
                            }
                            if (donor_replacementGLF_dead9c[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead9i, 4)] >= 1.0) {
                                donor_replacementGLF_dead9c[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead9i, 4)] = donor_replacementGLF_dead9c[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead9i, 4)] * donor_replacementGLF_dead9c[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead9i, 4)];
                            }
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < sqrt(0.0))))) {
                            _GLF_color = _GLF_color;
                        }
                    }
                    float GLF_dead5stripe = GLF_dead5compute_stripe(cos((donor_replacementGLF_dead5uv.x + donor_replacementGLF_dead5uv.y) * 20.0), donor_replacementGLF_dead5uv.x + donor_replacementGLF_dead5uv.y);
                    donor_replacementGLF_dead5col = mix(vec3(donor_replacementGLF_dead5uv.x, 0, 0.75), vec3(.8, .7, donor_replacementGLF_dead5uv.x), GLF_dead5stripe);
                    GLF_dead5_GLF_color = vec4(donor_replacementGLF_dead5col, 1.0);
                    return;
                }
                {
                    ivec2 GLF_live10p = _GLF_FUZZED(ivec2(93602, 9798));
                    {
                        GLF_live10p.y++;
                        if (_GLF_DEAD(false)) {
                            vec4 donor_replacementGLF_dead19matrix_u = _GLF_FUZZED(sign(_GLF_color));
                            {
                                GLF_dead8h_r += donor_replacementGLF_dead19matrix_u[_GLF_MAKE_IN_BOUNDS_INT(i, 4)] * _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(i, 4)];
                            }
                        }
                    }
                }
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < tan(0.0))))) {
                float donor_replacementGLF_dead18x = _GLF_FUZZED(GLF_dead8s_g);
                {
                    donor_replacementGLF_dead18x = 1.0;
                    GLF_dead8h_r = 1.0;
                }
            }
            if (_GLF_DEAD(false)) {
                _GLF_color = cos(GLF_live16_GLF_color);
            }
            int from = i;
            int mid = i + m - 1;
            {
                vec2 GLF_live17pos = _GLF_FUZZED(vec2(1.6, -69.73).ts);
                vec4 GLF_live17quad = _GLF_FUZZED(vec4(535.428, 269.472, -4.5, 2.7));
                if (GLF_live17pos.y < GLF_live17quad.y) {
                    ;
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    vec3 donor_replacementGLF_dead20m = _GLF_FUZZED(vec3(-24.74, -0.4, 210.530));
                    vec2 donor_replacementGLF_dead20n = _GLF_FUZZED(GLF_dead7injectionSwitch);
                    for (int GLF_dead20i = -1; GLF_dead20i <= int(GLF_dead20injectionSwitch.y); GLF_dead20i++) {
                        vec2 GLF_dead20g = vec2(float(i), float(GLF_dead20i));
                        vec2 GLF_dead20o = mix(donor_replacementGLF_dead20n, GLF_dead20g, 0.2);
                        if (GLF_dead20injectionSwitch.x < (donor_replacementGLF_dead20m.x)) {
                            int GLF_dead20k = 1;
                            while (GLF_dead20k >= 0) {
                                GLF_dead20o = GLF_dead20o + GLF_dead20o;
                                GLF_dead20k--;
                            }
                            donor_replacementGLF_dead20m = vec3(GLF_dead20injectionSwitch.x, cos(GLF_dead20o));
                        }
                    }
                }
            }
            int to = min(i + 2 * m - 1, high);
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                if (_GLF_DEAD(false)) {
                    _GLF_color = (GLF_live16_GLF_color / _GLF_color);
                }
                {
                    int GLF_live16d = _GLF_FUZZED(-75883);
                    ivec2 GLF_live16p = _GLF_FUZZED((ivec3(-78407, -36879, 30305).t + ivec2(45512, -10788)));
                    if (GLF_live16d >= 0 && GLF_live16p.x > 0 && GLF_live16map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live16p.x - 2) + (GLF_live16p.y) * 16, 256)] == 0) {
                        GLF_live16d--;
                        GLF_live16map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live16p.x) + (GLF_live16p.y) * 16, 256)] = 1;
                        GLF_live16map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live16p.x - 1) + (GLF_live16p.y) * 16, 256)] = 1;
                        GLF_live16map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live16p.x - 2) + (GLF_live16p.y) * 16, 256)] = 1;
                        GLF_live16p.x -= 2;
                    }
                }
                bool donor_replacementGLF_dead8c4 = _GLF_FUZZED(false);
                if (!donor_replacementGLF_dead8c4) {
                    ;
                }
                if (_GLF_DEAD(_GLF_IDENTITY(false, (false) || false))) {
                    {
                        break;
                    }
                }
            }
            {
                int GLF_live14looplimiter0 = 0;
                if (GLF_live14looplimiter0 >= 4) {
                    ;
                }
            }
            {
                int GLF_live10looplimiter1 = 0;
                ivec2 GLF_live10p = _GLF_FUZZED(ivec2(37260, 32497));
                {
                    if (GLF_live10looplimiter1 >= 3) {
                        ;
                    }
                    GLF_live10looplimiter1++;
                    {
                        GLF_live10p.x -= 16;
                    }
                }
            }
            {
                int GLF_live3i = _GLF_FUZZED(-98292);
                if (_GLF_DEAD(false)) {
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        float donor_replacementGLF_dead19beta = _GLF_FUZZED(GLF_dead8time);
                        vec4 donor_replacementGLF_dead19matrix_u = _GLF_FUZZED(trunc(_GLF_color));
                        for (int GLF_dead19b = GLF_dead19MATRIX_N - 1; GLF_dead19b >= low; GLF_dead19b--) {
                            GLF_live16_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19b, 4)] = GLF_live16_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19b, 4)] - (donor_replacementGLF_dead19beta * donor_replacementGLF_dead19matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19b, 4)]);
                        }
                    }
                    _GLF_color = intBitsToFloat(ivec4((ivec3(1884, -21464, -64920) % high), mid));
                }
                float GLF_live3limit = _GLF_FUZZED(23.76);
                float GLF_live3ref = _GLF_FUZZED((((+(-5.8)) - 44.97) - (-684.842)));
                if (_GLF_DEAD(false)) {
                    int donor_replacementGLF_dead8msb8 = _GLF_FUZZED(-3138);
                    vec2 donor_replacementGLF_dead8pos = _GLF_FUZZED(GLF_dead5injectionSwitch);
                    vec3 donor_replacementGLF_dead8setting = _GLF_FUZZED(ldexp(refract(vec3(846.438, 3588.7408, 2962.1736), vec3(-8.2, 7210.1880, -9.3), GLF_live3limit), ivec3(-17876, 72315, 10264)));
                    {
                        ;
                    }
                }
                float GLF_live3s = _GLF_FUZZED(54.58);
                {
                    int GLF_live3looplimiter0 = 0;
                    while (GLF_live3i < bitfieldInsert(800, GLF_live3i, 0, 0)) {
                        if (GLF_live3looplimiter0 >= 3) {
                            break;
                            if (_GLF_DEAD(false)) {
                                if (_GLF_DEAD(false)) {
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = vec4(4.7, 0.1, -507.024, -4437.2400);
                                        if (_GLF_DEAD(false)) {
                                            {
                                                break;
                                            }
                                        }
                                    }
                                    vec4 donor_replacementGLF_dead9c = _GLF_FUZZED((GLF_dead5_GLF_color - GLF_live0gl_FragCoord));
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = donor_replacementGLF_dead9c;
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_IDENTITY(dot(vec4(abs(0.0), sqrt(1.0), 0.0, 0.0), vec4(1.0, 0.0, 1.0, 1.0)), dot(vec4(abs(0.0), sqrt(1.0), 0.0, 0.0), vec4(1.0, 0.0, 1.0, 1.0))))))) {
                                            vec4 donor_replacementGLF_dead19matrix_b = _GLF_FUZZED(vec4(-2509.2614, 9185.6425, -6.5, 3.8));
                                            {
                                                for (int GLF_dead19j = (GLF_dead19MATRIX_N - 1); GLF_dead19j >= (from + 1); GLF_dead19j--) {
                                                    donor_replacementGLF_dead19matrix_b[_GLF_MAKE_IN_BOUNDS_INT(from, 4)] -= (GLF_live11m44[_GLF_MAKE_IN_BOUNDS_INT(from, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19j, 4)] * donor_replacementGLF_dead19matrix_b[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19j, 4)]);
                                                }
                                                donor_replacementGLF_dead19matrix_b[_GLF_MAKE_IN_BOUNDS_INT(from, 4)] /= GLF_live11m44[_GLF_MAKE_IN_BOUNDS_INT(from, 4)][_GLF_MAKE_IN_BOUNDS_INT(from, 4)];
                                            }
                                        }
                                    }
                                    {
                                        if (_GLF_DEAD(false)) {
                                            _GLF_color = dFdxFine(_GLF_color);
                                        }
                                        if (donor_replacementGLF_dead9c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live3looplimiter0, 4)] >= 1.0) {
                                            donor_replacementGLF_dead9c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live3looplimiter0, 4)] = donor_replacementGLF_dead9c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live3looplimiter0, 4)] * donor_replacementGLF_dead9c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live3looplimiter0, 4)];
                                        }
                                    }
                                }
                                vec3 donor_replacementGLF_dead5col = _GLF_FUZZED(dFdxCoarse(dFdxCoarse(vec3(1.3, 17.45, 0.6))));
                                vec2 donor_replacementGLF_dead5uv = _GLF_FUZZED(injectionSwitch);
                                {
                                    float GLF_dead5stripe = GLF_dead5compute_stripe(tan((donor_replacementGLF_dead5uv.x + donor_replacementGLF_dead5uv.y) * 20.0), donor_replacementGLF_dead5uv.x + donor_replacementGLF_dead5uv.y);
                                    if (_GLF_DEAD(false)) {
                                        {
                                            ;
                                        }
                                    }
                                    donor_replacementGLF_dead5col = mix(vec3(0.5, donor_replacementGLF_dead5uv.x, 0.1), vec3(.4, 0, .5), GLF_dead5stripe);
                                    GLF_dead5_GLF_color = vec4(donor_replacementGLF_dead5col, 1.0);
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                        float donor_replacementGLF_dead18xCoord = _GLF_FUZZED(faceforward(GLF_dead8s_g, GLF_dead8b_b, GLF_live3ref));
                                        {
                                            ;
                                        }
                                    }
                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                        {
                                            ;
                                        }
                                    }
                                    if (_GLF_DEAD(_GLF_IDENTITY(false, true && (_GLF_IDENTITY(false, (false) || false))))) {
                                        _GLF_color = GLF_dead5_GLF_color;
                                    }
                                    return;
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = GLF_dead5_GLF_color;
                                    }
                                    {
                                        vec2 GLF_live13a = _GLF_FUZZED(((vec2(8.4, 485.605) * 3.0) - vec2(-1566.9710, 1.3)));
                                        float GLF_live13z = _GLF_FUZZED(float(true));
                                        {
                                            GLF_live13z = GLF_live13a.y / GLF_live13a.x;
                                        }
                                    }
                                }
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                    _GLF_color = GLF_live0gl_FragCoord;
                                }
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = GLF_live0gl_FragCoord;
                                        if (_GLF_DEAD(false)) {
                                            int donor_replacementGLF_dead19i = _GLF_FUZZED(ivec4(71024, -67123, 99872, 30464).g);
                                            mat4 donor_replacementGLF_dead19matrix_a = _GLF_FUZZED(mat4(-8.2, 6.8, -7.1, 7197.5630, 313.621, 26.01, -38.49, -744.980, -329.427, 23.53, 58.93, -9609.0186, -2.1, -702.030, 1474.9830, -1310.0840));
                                            vec4 donor_replacementGLF_dead19matrix_b = _GLF_FUZZED(vec3(110.573, -0.8, -259.686).sssp);
                                            {
                                                for (int GLF_dead19j = (GLF_dead19MATRIX_N - 1); GLF_dead19j >= (donor_replacementGLF_dead19i + 1); GLF_dead19j--) {
                                                    donor_replacementGLF_dead19matrix_b[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead19i, 4)] -= (donor_replacementGLF_dead19matrix_a[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead19i, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19j, 4)] * donor_replacementGLF_dead19matrix_b[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19j, 4)]);
                                                }
                                                donor_replacementGLF_dead19matrix_b[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead19i, 4)] /= donor_replacementGLF_dead19matrix_a[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead19i, 4)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead19i, 4)];
                                            }
                                        }
                                    }
                                    if (_GLF_DEAD(false)) {
                                        {
                                            ;
                                        }
                                    }
                                    int donor_replacementGLF_dead9i = _GLF_FUZZED(N);
                                    float donor_replacementGLF_dead9ref = _GLF_FUZZED(GLF_dead6one);
                                    float donor_replacementGLF_dead9s = _GLF_FUZZED(40.14);
                                    if (mod(float(donor_replacementGLF_dead9i), donor_replacementGLF_dead9ref) <= 0.01) {
                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                            _GLF_color = vec4(-780.486, -9.6, -3700.9635, 2317.8374);
                                            {
                                                int GLF_live16directions = _GLF_FUZZED(-63789);
                                                {
                                                    GLF_live16directions += 1;
                                                }
                                            }
                                        }
                                        donor_replacementGLF_dead9s += 0.2;
                                    }
                                }
                            }
                        }
                        GLF_live3looplimiter0++;
                        {
                            if (_GLF_DEAD(false)) {
                                _GLF_color = GLF_live0gl_FragCoord;
                                if (_GLF_DEAD(false)) {
                                    int donor_replacementGLF_dead21k = _GLF_FUZZED(m);
                                    {
                                        GLF_dead21temp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead21k++, 10)] = GLF_dead21data[_GLF_MAKE_IN_BOUNDS_INT(mid++, 10)];
                                    }
                                }
                            }
                            if (mod(float(GLF_live3i), GLF_live3ref) <= 0.01) {
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                    bool donor_replacementGLF_dead5c1 = _GLF_FUZZED(true);
                                    bool donor_replacementGLF_dead5c2 = _GLF_FUZZED((ivec4(12981, -41796, 74042, -4166)[3] > i));
                                    vec3 donor_replacementGLF_dead5col = _GLF_FUZZED(vec3(-8.0, -9692.5703, 14.43));
                                    if (_GLF_DEAD(false)) {
                                        vec3 donor_replacementGLF_dead7m = _GLF_FUZZED(donor_replacementGLF_dead5col);
                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                            int donor_replacementGLF_dead21i = _GLF_FUZZED(floatBitsToInt(GLF_dead8time));
                                            int donor_replacementGLF_dead21j = _GLF_FUZZED(bitfieldExtract(to, N, mid));
                                            {
                                                if (GLF_dead21data[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead21i, 10)] < GLF_dead21data[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead21j, 10)]) {
                                                    GLF_dead21temp[_GLF_MAKE_IN_BOUNDS_INT(mid++, 10)] = GLF_dead21data[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead21i++, 10)];
                                                } else {
                                                    GLF_dead21temp[_GLF_MAKE_IN_BOUNDS_INT(mid++, 10)] = GLF_dead21data[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead21j++, 10)];
                                                }
                                            }
                                        }
                                        vec2 donor_replacementGLF_dead7n = _GLF_FUZZED((injectionSwitch + length(GLF_dead6one)));
                                        if (_GLF_DEAD(false)) {
                                            _GLF_color = (donor_replacementGLF_dead7m * mat4x3(-1756.7220, 81.93, 3488.5640, 552.092, 2152.1549, 609.864, 943.611, 161.429, 1.3, 5554.8980, -4607.7462, 56.63));
                                        }
                                        for (int GLF_dead7j = -1; GLF_dead7j <= int(GLF_dead7injectionSwitch.y); GLF_dead7j++) {
                                            if (_GLF_DEAD(false)) {
                                                _GLF_color = exp2((+GLF_live0gl_FragCoord));
                                            }
                                            for (int GLF_dead7i = -1; GLF_dead7i <= int(GLF_dead7injectionSwitch.y); GLF_dead7i++) {
                                                if (_GLF_DEAD(false)) {
                                                    _GLF_color = smoothstep(GLF_dead8time, dot(acosh(donor_replacementGLF_dead7m), donor_replacementGLF_dead5col), GLF_live0gl_FragCoord);
                                                }
                                                if (_GLF_DEAD(false)) {
                                                    float donor_replacementGLF_dead21grey = _GLF_FUZZED(GLF_dead8b_b);
                                                    if (int(GLF_dead21gl_FragCoord[1]) < 240) {
                                                        donor_replacementGLF_dead21grey = 0.5 + float(GLF_dead21data[7]) / 10.0;
                                                    } else {
                                                        if (int(GLF_dead21gl_FragCoord[1]) < 270) {
                                                            donor_replacementGLF_dead21grey = 0.5 + float(GLF_dead21data[8]) / 10.0;
                                                        } else {
                                                            discard;
                                                        }
                                                    }
                                                }
                                                vec2 GLF_dead7g = vec2(float(GLF_dead7j), float(GLF_dead7i));
                                                if (_GLF_DEAD(false)) {
                                                    _GLF_color = smoothstep(mix(determinant(GLF_dead6m33), GLF_live3limit, false), trunc(GLF_dead8b_b), (false, GLF_dead5_GLF_color));
                                                }
                                                vec2 GLF_dead7o = mix(donor_replacementGLF_dead7n, GLF_dead7g, 0.2);
                                                if (GLF_dead7injectionSwitch.x < (donor_replacementGLF_dead7m.x)) {
                                                    int GLF_dead7k = 1;
                                                    while (GLF_dead7k >= 0) {
                                                        GLF_dead7o = GLF_dead7o + GLF_dead7o;
                                                        GLF_dead7k--;
                                                    }
                                                    donor_replacementGLF_dead7m = vec3(GLF_dead7injectionSwitch.x, cos(GLF_dead7o));
                                                }
                                            }
                                        }
                                    }
                                    vec2 donor_replacementGLF_dead5uv = _GLF_FUZZED(resolution);
                                    if (!donor_replacementGLF_dead5c1 && donor_replacementGLF_dead5c2) {
                                        float GLF_dead5stripe = GLF_dead5compute_stripe(tan((donor_replacementGLF_dead5uv.x + donor_replacementGLF_dead5uv.y) * 20.0), donor_replacementGLF_dead5uv.x + donor_replacementGLF_dead5uv.y);
                                        donor_replacementGLF_dead5col = mix(vec3(0.5, donor_replacementGLF_dead5uv.x, 0.1), vec3(.4, 0, .5), GLF_dead5stripe);
                                        if (_GLF_DEAD(_GLF_IDENTITY(false, false || (false)))) {
                                            float donor_replacementGLF_dead19alpha3 = _GLF_FUZZED(GLF_dead8h_r);
                                            int donor_replacementGLF_dead19k = _GLF_FUZZED(68426);
                                            vec4 donor_replacementGLF_dead19matrix_b = _GLF_FUZZED(GLF_live0gl_FragCoord);
                                            for (int GLF_dead19b = GLF_dead19MATRIX_N - 1; GLF_dead19b >= donor_replacementGLF_dead19k; GLF_dead19b--) {
                                                donor_replacementGLF_dead19alpha3 += GLF_live16_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19b, 4)] * donor_replacementGLF_dead19matrix_b[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19b, 4)];
                                            }
                                        }
                                        GLF_dead5_GLF_color = vec4(donor_replacementGLF_dead5col, 1.0);
                                        return;
                                    }
                                    {
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                            int donor_replacementGLF_dead18iteration = _GLF_FUZZED(GLF_live3i);
                                            if (donor_replacementGLF_dead18iteration < bitfieldInsert(mid, 0, 0, 0)) {
                                                ;
                                            } else {
                                                ;
                                            }
                                        }
                                        ivec2 GLF_live10p = _GLF_FUZZED(ivec2(-77024, -78333));
                                        {
                                            GLF_live10p.x = -GLF_live10p.x;
                                            {
                                                int GLF_live16looplimiter0 = 0;
                                                if (GLF_live16looplimiter0 >= 7) {
                                                    ;
                                                    if (_GLF_DEAD(false)) {
                                                        _GLF_color = GLF_live16_GLF_color;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < log(1.0))))) {
                                        _GLF_color = _GLF_color;
                                    }
                                }
                                GLF_live3s += 0.2;
                            }
                            if (float(GLF_live3i) >= GLF_live3limit) {
                                ;
                            }
                            if (_GLF_DEAD(false)) {
                                float donor_replacementGLF_dead21grey = _GLF_FUZZED(GLF_dead8h_r);
                                if (int(GLF_dead21gl_FragCoord[1]) < 150) {
                                    discard;
                                } else {
                                    if (int(GLF_dead21gl_FragCoord[1]) < 180) {
                                        donor_replacementGLF_dead21grey = 0.5 + float(GLF_dead21data[5]) / 10.0;
                                    } else {
                                        if (int(GLF_dead21gl_FragCoord[1]) < 210) {
                                            donor_replacementGLF_dead21grey = 0.5 + float(GLF_dead21data[6]) / 10.0;
                                        } else {
                                            if (int(GLF_dead21gl_FragCoord[1]) < 240) {
                                                donor_replacementGLF_dead21grey = 0.5 + float(GLF_dead21data[7]) / 10.0;
                                            } else {
                                                if (int(GLF_dead21gl_FragCoord[1]) < 270) {
                                                    donor_replacementGLF_dead21grey = 0.5 + float(GLF_dead21data[8]) / 10.0;
                                                } else {
                                                    discard;
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            GLF_live3i++;
                        }
                    }
                }
            }
            if (_GLF_DEAD(false)) {
                if (_GLF_DEAD(false)) {
                    _GLF_color = roundEven(vec4(-3001.3414, -4.1, -7364.7726, -9.1));
                }
                vec4 donor_replacementGLF_dead9c = _GLF_FUZZED(vec4(9.3, 2.5, -5630.6505, 1069.0508));
                {
                    donor_replacementGLF_dead9c[_GLF_MAKE_IN_BOUNDS_INT(low, 4)] = donor_replacementGLF_dead9c[_GLF_MAKE_IN_BOUNDS_INT(low, 4)] * donor_replacementGLF_dead9c[_GLF_MAKE_IN_BOUNDS_INT(low, 4)];
                }
                if (_GLF_DEAD(false)) {
                    int donor_replacementGLF_dead19j = _GLF_FUZZED(N);
                    vec4 donor_replacementGLF_dead19matrix_u = _GLF_FUZZED(_GLF_color);
                    for (int GLF_dead19a = GLF_dead19MATRIX_N - 1; GLF_dead19a >= i; GLF_dead19a--) {
                        GLF_dead8b_b += donor_replacementGLF_dead19matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19a, 4)] * GLF_dead6m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19a, 4)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead19j, 4)];
                    }
                }
                {
                    int GLF_live12looplimiter0 = 0;
                    if (GLF_live12looplimiter0 >= 4) {
                        ;
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < _GLF_ZERO(0.0, injectionSwitch.x))))) {
                            int donor_replacementGLF_dead18iterationCap = _GLF_FUZZED(max(GLF_live12looplimiter0, high));
                            if (0.0 > GLF_dead18resolution.y) {
                                donor_replacementGLF_dead18iterationCap += 1;
                            }
                        }
                    }
                }
                if (_GLF_DEAD(false)) {
                    _GLF_color = GLF_dead5_GLF_color;
                }
            }
            if (_GLF_DEAD(false)) {
                _GLF_color = (true ? GLF_live0gl_FragCoord : GLF_dead6m34[2]);
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    float donor_replacementGLF_dead19beta = _GLF_FUZZED(GLF_dead8time);
                    int donor_replacementGLF_dead19j = _GLF_FUZZED((to + low));
                    mat4 donor_replacementGLF_dead19matrix_a = _GLF_FUZZED(GLF_live11m44);
                    vec4 donor_replacementGLF_dead19matrix_u = _GLF_FUZZED(GLF_live0gl_FragCoord);
                    {
                        donor_replacementGLF_dead19matrix_a[_GLF_MAKE_IN_BOUNDS_INT(mid, 4)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead19j, 4)] = donor_replacementGLF_dead19matrix_a[_GLF_MAKE_IN_BOUNDS_INT(mid, 4)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead19j, 4)] - (donor_replacementGLF_dead19beta * donor_replacementGLF_dead19matrix_u[_GLF_MAKE_IN_BOUNDS_INT(mid, 4)]);
                    }
                }
            }
            merge(from, mid, to);
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < _GLF_IDENTITY(0.0, min(0.0, 0.0)))))) {
                _GLF_color = _GLF_color;
            }
            if (_GLF_DEAD(false)) {
                bool donor_replacementGLF_dead5c1 = _GLF_FUZZED(false);
                bool donor_replacementGLF_dead5c2 = _GLF_FUZZED(greaterThan(ivec3(42465, -91784, -9889), ivec3(28231, 22096, 32024)).g);
                {
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        float donor_replacementGLF_dead19alpha3 = _GLF_FUZZED(8.0);
                        for (int GLF_dead19b = GLF_dead19MATRIX_N - 1; GLF_dead19b >= low; GLF_dead19b--) {
                            donor_replacementGLF_dead19alpha3 += _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19b, 4)] * GLF_live0gl_FragCoord[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19b, 4)];
                        }
                    }
                    int GLF_live10looplimiter1 = 0;
                    ivec2 GLF_live10p = _GLF_FUZZED((ivec2(78756, 56391) - (-78058)));
                    while (GLF_live10p.x > 15) {
                        if (GLF_live10looplimiter1 >= 3) {
                            break;
                        }
                        GLF_live10looplimiter1++;
                        {
                            {
                                {
                                    ;
                                }
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                _GLF_color = GLF_live0gl_FragCoord;
                            }
                            GLF_live10p.x -= 16;
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        _GLF_color = _GLF_color;
                    }
                }
                {
                    bool GLF_live16canwalk = _GLF_FUZZED(false);
                    int GLF_live16i = _GLF_FUZZED((82967 | 13650));
                    int GLF_live16j = _GLF_FUZZED((ivec2(-47774, 47533).y * (ivec2(45305, 50688) * ivec2(-52670, 68087)).g));
                    ivec2 GLF_live16p = _GLF_FUZZED(ivec2(68455, 1723));
                    {
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            int donor_replacementGLF_dead18iteration = _GLF_FUZZED((i + i));
                            int donor_replacementGLF_dead18iterationCap = _GLF_FUZZED((82524 + GLF_live16i));
                            if (donor_replacementGLF_dead18iteration < bitfieldInsert(donor_replacementGLF_dead18iterationCap, 0, 0, 0)) {
                                ;
                            } else {
                                ;
                            }
                        }
                        int GLF_live16looplimiter2 = 0;
                        for (GLF_live16i = 0; GLF_live16i < 8; GLF_live16i++) {
                            if (_GLF_DEAD(false)) {
                                float donor_replacementGLF_dead18c_im = _GLF_FUZZED(round(GLF_dead8time));
                                float donor_replacementGLF_dead18c_re = _GLF_FUZZED(GLF_dead8s_g);
                                int donor_replacementGLF_dead18iteration = _GLF_FUZZED(GLF_live16i);
                                int donor_replacementGLF_dead18iterationCap = _GLF_FUZZED(bitfieldInsert(GLF_live16i, 23959, mid, mid));
                                int donor_replacementGLF_dead18k = _GLF_FUZZED(mid);
                                float donor_replacementGLF_dead18x = _GLF_FUZZED(GLF_dead8time);
                                float donor_replacementGLF_dead18y = _GLF_FUZZED(exp(distance(vec3(-2162.8637, 1.5, 5.9), vec3(6.3, 1.2, -263.036))));
                                do {
                                    if (donor_replacementGLF_dead18x * donor_replacementGLF_dead18x + donor_replacementGLF_dead18y * donor_replacementGLF_dead18y > 4.0) {
                                        break;
                                    }
                                    float GLF_dead18x_new = donor_replacementGLF_dead18x * donor_replacementGLF_dead18x - donor_replacementGLF_dead18y * donor_replacementGLF_dead18y + donor_replacementGLF_dead18c_re;
                                    donor_replacementGLF_dead18y = 2.0 * donor_replacementGLF_dead18x * donor_replacementGLF_dead18y + donor_replacementGLF_dead18c_im;
                                    donor_replacementGLF_dead18x = GLF_dead18x_new;
                                    donor_replacementGLF_dead18iteration++;
                                    donor_replacementGLF_dead18k++;
                                } while (donor_replacementGLF_dead18k < bitfieldInsert(donor_replacementGLF_dead18iterationCap + (257.0 > GLF_dead18resolution.y ? 1 : 0), 0, 0, 0));
                            }
                            if (GLF_live16looplimiter2 >= 7) {
                                break;
                            }
                            GLF_live16looplimiter2++;
                            {
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                    {
                                        discard;
                                    }
                                }
                                {
                                    int GLF_live16looplimiter1 = 0;
                                    for (GLF_live16j = 0; GLF_live16j < 8; GLF_live16j++) {
                                        if (GLF_live16looplimiter1 >= 7) {
                                            break;
                                        }
                                        GLF_live16looplimiter1++;
                                        {
                                            if (GLF_live16map[_GLF_MAKE_IN_BOUNDS_INT(GLF_live16j * 2 + GLF_live16i * 2 * 16, 256)] == 0) {
                                                GLF_live16p.x = GLF_live16j * 2;
                                                GLF_live16p.y = GLF_live16i * 2;
                                                GLF_live16canwalk = true;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                bool donor_replacementGLF_dead5c3 = _GLF_FUZZED(true);
                vec3 donor_replacementGLF_dead5col = _GLF_FUZZED(intBitsToFloat(ivec3(-98865, 17855, 90491)));
                if (_GLF_DEAD(false)) {
                    _GLF_color = GLF_dead5_GLF_color;
                }
                vec2 donor_replacementGLF_dead5uv = _GLF_FUZZED(injectionSwitch);
                if (!donor_replacementGLF_dead5c1 && !donor_replacementGLF_dead5c2 && donor_replacementGLF_dead5c3) {
                    float GLF_dead5stripe = GLF_dead5compute_stripe(cos((donor_replacementGLF_dead5uv.x + donor_replacementGLF_dead5uv.y) * 20.0), donor_replacementGLF_dead5uv.x + donor_replacementGLF_dead5uv.y);
                    donor_replacementGLF_dead5col = mix(vec3(.7, sinh(donor_replacementGLF_dead5uv.x), donor_replacementGLF_dead5uv.x), vec3(.3, .5, donor_replacementGLF_dead5uv.x), GLF_dead5stripe);
                    GLF_dead5_GLF_color = vec4(donor_replacementGLF_dead5col, 1.0);
                    if (_GLF_DEAD(false)) {
                        float donor_replacementGLF_dead21grey = _GLF_FUZZED(GLF_dead8s_g);
                        if (int(GLF_dead21gl_FragCoord[1]) < 120) {
                            donor_replacementGLF_dead21grey = 0.5 + float(GLF_dead21data[3]) / 10.0;
                        } else {
                            if (int(GLF_dead21gl_FragCoord[1]) < 150) {
                                discard;
                            } else {
                                if (int(GLF_dead21gl_FragCoord[1]) < 180) {
                                    donor_replacementGLF_dead21grey = 0.5 + float(GLF_dead21data[5]) / 10.0;
                                } else {
                                    if (int(GLF_dead21gl_FragCoord[1]) < 210) {
                                        donor_replacementGLF_dead21grey = 0.5 + float(GLF_dead21data[6]) / 10.0;
                                    } else {
                                        if (int(GLF_dead21gl_FragCoord[1]) < 240) {
                                            donor_replacementGLF_dead21grey = 0.5 + float(GLF_dead21data[7]) / 10.0;
                                        } else {
                                            if (int(GLF_dead21gl_FragCoord[1]) < 270) {
                                                donor_replacementGLF_dead21grey = 0.5 + float(GLF_dead21data[8]) / 10.0;
                                            } else {
                                                discard;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    return;
                    {
                        float GLF_live13th = _GLF_FUZZED(((-9.7) + 5.7));
                        vec2 GLF_live13v = _GLF_FUZZED(vec2(4313.2471, 306.339));
                        if (GLF_live13v.x < 0.0) {
                            {
                                {
                                    ;
                                }
                            }
                            GLF_live13th = 1.0 - GLF_live13th;
                        }
                        {
                            int GLF_live16directions = _GLF_FUZZED(66158);
                            ivec2 GLF_live16p = _GLF_FUZZED(ivec2(58182, 88576));
                            int GLF_live16v = _GLF_FUZZED(ivec4(43452, -89109, -70407, 46001).q);
                            {
                                int GLF_live16d = GLF_live16v % GLF_live16directions;
                                if (_GLF_DEAD(false)) {
                                    if (0.0 > GLF_dead18resolution.y) {
                                        GLF_live16v += 1;
                                    }
                                }
                                GLF_live16v += GLF_live16directions;
                                if (GLF_live16d >= 0 && GLF_live16p.x > 0 && GLF_live16map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live16p.x - 2) + (GLF_live16p.y) * 16, 256)] == 0) {
                                    GLF_live16d--;
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = floor(GLF_live0gl_FragCoord);
                                    }
                                    GLF_live16map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live16p.x) + (GLF_live16p.y) * 16, 256)] = 1;
                                    GLF_live16map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live16p.x - 1) + (GLF_live16p.y) * 16, 256)] = 1;
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                        int donor_replacementGLF_dead18iterationCap = _GLF_FUZZED(93064);
                                        {
                                            donor_replacementGLF_dead18iterationCap += 1;
                                        }
                                    }
                                    GLF_live16map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live16p.x - 2) + (GLF_live16p.y) * 16, 256)] = 1;
                                    GLF_live16p.x -= 2;
                                }
                                if (GLF_live16d >= 0 && GLF_live16p.y > 0 && GLF_live16map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live16p.x) + (GLF_live16p.y - 2) * 16, 256)] == 0) {
                                    GLF_live16d--;
                                    GLF_live16map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live16p.x) + (GLF_live16p.y) * 16, 256)] = 1;
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = vec4(-0.5, -7482.0880, -167.449, -527.487);
                                    }
                                    GLF_live16map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live16p.x) + (GLF_live16p.y - 1) * 16, 256)] = 1;
                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                        float donor_replacementGLF_dead19alpha3 = _GLF_FUZZED(GLF_dead8b_b);
                                        float donor_replacementGLF_dead19beta = _GLF_FUZZED(pow(dFdx(GLF_dead8time), (GLF_dead5stripe - injectionSwitch)[0]));
                                        int donor_replacementGLF_dead19j = _GLF_FUZZED(mid);
                                        mat4 donor_replacementGLF_dead19matrix_a = _GLF_FUZZED(mat4(-8.3, -34.09, 8.8, 5.5, -1284.5762, -5.4, 0.8, 6.9, 9.3, 7.7, -9.7, 7.1, 11.44, 3.2, 38.30, 280.271));
                                        vec4 donor_replacementGLF_dead19matrix_u = _GLF_FUZZED(GLF_live16_GLF_color);
                                        {
                                            for (int GLF_dead19a = GLF_dead19MATRIX_N - 1; GLF_dead19a >= i; GLF_dead19a--) {
                                                donor_replacementGLF_dead19alpha3 += donor_replacementGLF_dead19matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19a, 4)] * donor_replacementGLF_dead19matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19a, 4)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead19j, 4)];
                                            }
                                            donor_replacementGLF_dead19beta = GLF_dead8s_g * donor_replacementGLF_dead19alpha3;
                                            for (int GLF_dead19a = GLF_dead19MATRIX_N - 1; GLF_dead19a >= i; GLF_dead19a--) {
                                                donor_replacementGLF_dead19matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19a, 4)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead19j, 4)] = donor_replacementGLF_dead19matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19a, 4)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead19j, 4)] - (donor_replacementGLF_dead19beta * donor_replacementGLF_dead19matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19a, 4)]);
                                            }
                                            donor_replacementGLF_dead19alpha3 = 0.0;
                                            donor_replacementGLF_dead19beta = 0.0;
                                        }
                                    }
                                    GLF_live16map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live16p.x) + (GLF_live16p.y - 2) * 16, 256)] = 1;
                                    GLF_live16p.y -= 2;
                                }
                                if (GLF_live16d >= 0 && GLF_live16p.x < 14 && GLF_live16map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live16p.x + 2) + (GLF_live16p.y) * 16, 256)] == 0) {
                                    GLF_live16d--;
                                    GLF_live16map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live16p.x) + (GLF_live16p.y) * 16, 256)] = 1;
                                    GLF_live16map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live16p.x + 1) + (GLF_live16p.y) * 16, 256)] = 1;
                                    GLF_live16map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live16p.x + 2) + (GLF_live16p.y) * 16, 256)] = 1;
                                    GLF_live16p.x += 2;
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                        for (int GLF_dead20j = -1; GLF_dead20j <= int(GLF_dead20injectionSwitch.y); GLF_dead20j++) {
                                            for (int GLF_dead20i = -1; GLF_dead20i <= int(GLF_dead20injectionSwitch.y); GLF_dead20i++) {
                                                vec2 GLF_dead20g = vec2(float(GLF_dead20j), float(GLF_dead20i));
                                                vec2 GLF_dead20o = mix(donor_replacementGLF_dead5uv, GLF_dead20g, 0.2);
                                                if (GLF_dead20injectionSwitch.x < (donor_replacementGLF_dead5col.x)) {
                                                    int GLF_dead20k = 1;
                                                    while (GLF_dead20k >= 0) {
                                                        GLF_dead20o = GLF_dead20o + GLF_dead20o;
                                                        GLF_dead20k--;
                                                    }
                                                    donor_replacementGLF_dead5col = vec3(GLF_dead20injectionSwitch.x, cos(GLF_dead20o));
                                                }
                                            }
                                        }
                                    }
                                }
                                if (GLF_live16d >= 0 && GLF_live16p.y < 14 && GLF_live16map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live16p.x) + (GLF_live16p.y + 2) * 16, 256)] == 0) {
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                        vec3 donor_replacementGLF_dead20m = _GLF_FUZZED(sign(donor_replacementGLF_dead5col));
                                        if (GLF_dead20injectionSwitch.x < (donor_replacementGLF_dead20m.x)) {
                                            int GLF_dead20k = 1;
                                            while (GLF_dead20k >= 0) {
                                                donor_replacementGLF_dead5uv = donor_replacementGLF_dead5uv + donor_replacementGLF_dead5uv;
                                                GLF_dead20k--;
                                            }
                                            donor_replacementGLF_dead20m = vec3(GLF_dead20injectionSwitch.x, cos(donor_replacementGLF_dead5uv));
                                        }
                                    }
                                    GLF_live16d--;
                                    GLF_live16map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live16p.x) + (GLF_live16p.y) * 16, 256)] = 1;
                                    GLF_live16map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live16p.x) + (GLF_live16p.y + 1) * 16, 256)] = 1;
                                    GLF_live16map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live16p.x) + (GLF_live16p.y + 2) * 16, 256)] = 1;
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                        int donor_replacementGLF_dead19i = _GLF_FUZZED((donor_replacementGLF_dead5c2 ? bitfieldExtract(7679, low, GLF_live16directions) : from));
                                        vec4 donor_replacementGLF_dead19matrix_b = _GLF_FUZZED(GLF_live0gl_FragCoord);
                                        for (int GLF_dead19j = (GLF_dead19MATRIX_N - 1); GLF_dead19j >= (donor_replacementGLF_dead19i + 1); GLF_dead19j--) {
                                            donor_replacementGLF_dead19matrix_b[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead19i, 4)] -= (GLF_live11m44[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead19i, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19j, 4)] * donor_replacementGLF_dead19matrix_b[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19j, 4)]);
                                        }
                                    }
                                    GLF_live16p.y += 2;
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < abs(0.0))))) {
                                        _GLF_color = mat2x4(GLF_live11one, GLF_dead8time, GLF_live11one, GLF_dead8time, acos(GLF_dead5stripe), GLF_dead5stripe, mix(GLF_dead8h_r, GLF_live11one, false), GLF_dead8h_r)[1];
                                    }
                                }
                            }
                        }
                    }
                }
                {
                    float GLF_live13th = _GLF_FUZZED(float(80063u));
                    {
                        GLF_live13th = -GLF_live13th;
                    }
                }
            }
        }
        if (_GLF_DEAD(false)) {
            int donor_replacementGLF_dead9i = _GLF_FUZZED(low);
            float donor_replacementGLF_dead9ref = _GLF_FUZZED(min(4049.2797, 83.02));
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                _GLF_color = pow(GLF_dead5_GLF_color, vec4(64.81, -399.608, -779.955, -8.4));
            }
            float donor_replacementGLF_dead9s = _GLF_FUZZED(vec2(4.2, -4364.4467)[1]);
            if (mod(float(donor_replacementGLF_dead9i), donor_replacementGLF_dead9ref) <= 0.01) {
                donor_replacementGLF_dead9s += 0.2;
            }
        }
        {
            {
                ;
            }
            if (_GLF_DEAD(false)) {
                float donor_replacementGLF_dead18c_im = _GLF_FUZZED(-8.0);
                float donor_replacementGLF_dead18c_re = _GLF_FUZZED(vec2(-607.430, 124.662)[0]);
                float donor_replacementGLF_dead18y = _GLF_FUZZED(determinant(mat4(7.2, 2828.9192, -68.17, -413.928, -8.5, 6.7, 51.34, 896.485, 8.4, 8.6, 918.463, 6.7, 18.74, -356.673, 91.73, 9.9)));
                {
                    if (GLF_dead8h_r * GLF_dead8h_r + donor_replacementGLF_dead18y * donor_replacementGLF_dead18y > 4.0) {
                        break;
                    }
                    float GLF_dead18x_new = GLF_dead8h_r * GLF_dead8h_r - donor_replacementGLF_dead18y * donor_replacementGLF_dead18y + donor_replacementGLF_dead18c_re;
                    donor_replacementGLF_dead18y = 2.0 * GLF_dead8h_r * donor_replacementGLF_dead18y + donor_replacementGLF_dead18c_im;
                    GLF_dead8h_r = GLF_dead18x_new;
                    low++;
                    high++;
                }
            }
        }
    }
}

void main() {
    if (_GLF_DEAD(false)) {
        _GLF_color = (GLF_dead5_GLF_color + _GLF_color);
    }
    int i = int(injectionSwitch.x);
    do {
        if (_GLF_DEAD(false)) {
            int donor_replacementGLF_dead19b = _GLF_FUZZED(i);
            vec4 donor_replacementGLF_dead19matrix_u = _GLF_FUZZED(GLF_live0gl_FragCoord);
            {
                GLF_dead8s_g += donor_replacementGLF_dead19matrix_u[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead19b, 4)] * _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead19b, 4)];
            }
        }
        switch (i) {
            case 0:
                data[i] = 4;
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    for (int GLF_dead19i = (GLF_dead19MATRIX_N - 1); GLF_dead19i >= 0; GLF_dead19i--) {
                        for (int GLF_dead19j = (GLF_dead19MATRIX_N - 1); GLF_dead19j >= (GLF_dead19i + 1); GLF_dead19j--) {
                            GLF_live16_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19i, 4)] -= (GLF_live11m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19i, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19j, 4)] * GLF_live16_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19j, 4)]);
                        }
                        GLF_live16_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19i, 4)] /= GLF_live11m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19i, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19i, 4)];
                    }
                }
                if (_GLF_DEAD(false)) {
                    _GLF_color = normalize(GLF_dead5_GLF_color);
                    if (_GLF_DEAD(false)) {
                        int donor_replacementGLF_dead19j = _GLF_FUZZED(bitCount(132246u));
                        int donor_replacementGLF_dead19k = _GLF_FUZZED(sign(i));
                        mat4 donor_replacementGLF_dead19matrix_a = _GLF_FUZZED(GLF_dead6m44);
                        for (int GLF_dead19a = GLF_dead19MATRIX_N - 1; GLF_dead19a >= donor_replacementGLF_dead19k; GLF_dead19a--) {
                            donor_replacementGLF_dead19matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19a, 4)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead19j, 4)] = donor_replacementGLF_dead19matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19a, 4)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead19j, 4)] - (GLF_dead8s_g * GLF_live0gl_FragCoord[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19a, 4)]);
                        }
                    }
                }
                break;
            case 1:
                data[i] = 3;
                break;
            case 2:
                data[i] = 2;
                if (_GLF_DEAD(false)) {
                    bool donor_replacementGLF_dead5c1 = _GLF_FUZZED(bvec3(true, false, true).x);
                    {
                        int GLF_live11looplimiter7 = 0;
                        if (GLF_live11looplimiter7 >= 5) {
                            ;
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        float donor_replacementGLF_dead21grey = _GLF_FUZZED(GLF_dead8s_g);
                        {
                            if (int(GLF_dead21gl_FragCoord[1]) < 210) {
                                donor_replacementGLF_dead21grey = 0.5 + float(GLF_dead21data[6]) / 10.0;
                            } else {
                                if (int(GLF_dead21gl_FragCoord[1]) < 240) {
                                    donor_replacementGLF_dead21grey = 0.5 + float(GLF_dead21data[7]) / 10.0;
                                } else {
                                    if (int(GLF_dead21gl_FragCoord[1]) < 270) {
                                        donor_replacementGLF_dead21grey = 0.5 + float(GLF_dead21data[8]) / 10.0;
                                    } else {
                                        discard;
                                    }
                                }
                            }
                        }
                    }
                    bool donor_replacementGLF_dead5c2 = _GLF_FUZZED(true);
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        if (!donor_replacementGLF_dead5c2) {
                            ;
                        }
                        if (_GLF_DEAD(false)) {
                            _GLF_color = pow(GLF_live0gl_FragCoord, GLF_live0gl_FragCoord);
                        }
                    }
                    bool donor_replacementGLF_dead5c3 = _GLF_FUZZED(true);
                    vec3 donor_replacementGLF_dead5col = _GLF_FUZZED(mat2x3(-4.2, -129.429, 614.395, -6.5, -43.21, 25.11)[0]);
                    vec2 donor_replacementGLF_dead5uv = _GLF_FUZZED(intBitsToFloat(ivec2(-60721, 25247)));
                    {
                        if (_GLF_DEAD(false)) {
                            int donor_replacementGLF_dead19i = _GLF_FUZZED((i - i));
                            vec4 donor_replacementGLF_dead19matrix_b = _GLF_FUZZED(vec4(2.4, 40.19, 3819.1714, 7.3));
                            for (int GLF_dead19j = (GLF_dead19MATRIX_N - 1); GLF_dead19j >= (donor_replacementGLF_dead19i + 1); GLF_dead19j--) {
                                donor_replacementGLF_dead19matrix_b[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead19i, 4)] -= (GLF_live11m44[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead19i, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19j, 4)] * donor_replacementGLF_dead19matrix_b[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19j, 4)]);
                            }
                        }
                        {
                            ;
                        }
                    }
                    if (!donor_replacementGLF_dead5c1 && !donor_replacementGLF_dead5c2 && donor_replacementGLF_dead5c3) {
                        float GLF_dead5stripe = GLF_dead5compute_stripe(cos((donor_replacementGLF_dead5uv.x + donor_replacementGLF_dead5uv.y) * 20.0), donor_replacementGLF_dead5uv.x + donor_replacementGLF_dead5uv.y);
                        if (_GLF_DEAD(false)) {
                            if (int(GLF_dead21gl_FragCoord[1]) < 60) {
                                GLF_dead5stripe = 0.5 + float(GLF_dead21data[1]) / 10.0;
                            } else {
                                if (int(GLF_dead21gl_FragCoord[1]) < 90) {
                                    GLF_dead5stripe = 0.5 + float(GLF_dead21data[2]) / 10.0;
                                } else {
                                    if (int(GLF_dead21gl_FragCoord[1]) < 120) {
                                        GLF_dead5stripe = 0.5 + float(GLF_dead21data[3]) / 10.0;
                                    } else {
                                        if (int(GLF_dead21gl_FragCoord[1]) < 150) {
                                            discard;
                                        } else {
                                            if (int(GLF_dead21gl_FragCoord[1]) < 180) {
                                                GLF_dead5stripe = 0.5 + float(GLF_dead21data[5]) / 10.0;
                                            } else {
                                                if (int(GLF_dead21gl_FragCoord[1]) < 210) {
                                                    GLF_dead5stripe = 0.5 + float(GLF_dead21data[6]) / 10.0;
                                                } else {
                                                    if (int(GLF_dead21gl_FragCoord[1]) < 240) {
                                                        GLF_dead5stripe = 0.5 + float(GLF_dead21data[7]) / 10.0;
                                                    } else {
                                                        if (int(GLF_dead21gl_FragCoord[1]) < 270) {
                                                            GLF_dead5stripe = 0.5 + float(GLF_dead21data[8]) / 10.0;
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
                        }
                        donor_replacementGLF_dead5col = mix(vec3(.7, sinh(donor_replacementGLF_dead5uv.x), donor_replacementGLF_dead5uv.x), vec3(.3, .5, donor_replacementGLF_dead5uv.x), GLF_dead5stripe);
                        GLF_dead5_GLF_color = vec4(donor_replacementGLF_dead5col, 1.0);
                        return;
                    }
                }
                break;
            case 3:
                data[i] = 1;
                break;
                {
                    int GLF_live17i = _GLF_FUZZED((((-38064) + 79258) & ivec2(61000, -58502).y));
                    vec2 GLF_live17pos = _GLF_FUZZED(vec2(-146.902, 6303.1622));
                    if (_GLF_DEAD(false)) {
                        _GLF_color = _GLF_color.ppss;
                    }
                    vec4 GLF_live17res = _GLF_FUZZED(vec4(vec2(946.546, -349.607), vec2(4.8, 3.6)));
                    {
                        if (GLF_live17collision(GLF_live17pos, GLF_live17picdata[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17i, 8)])) {
                            GLF_live17res = GLF_live17pal[_GLF_MAKE_IN_BOUNDS_INT((int(GLF_live17picdata[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17i, 8)].x) * int(GLF_live17picdata[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17i, 8)].y) + GLF_live17i * 9 + 11) % 16, 16)];
                        }
                    }
                }
                if (_GLF_DEAD(false)) {
                    int donor_replacementGLF_dead21j = _GLF_FUZZED((i & N));
                    int donor_replacementGLF_dead21k = _GLF_FUZZED(findMSB(22399u));
                    {
                        GLF_dead21temp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead21k++, 10)] = GLF_dead21data[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead21j++, 10)];
                    }
                }
            case 4:
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    float donor_replacementGLF_dead19alpha2 = _GLF_FUZZED(asinh(GLF_dead8time));
                    int donor_replacementGLF_dead19j = _GLF_FUZZED(ivec3(-21220, -12037, 80323).t);
                    mat4 donor_replacementGLF_dead19matrix_a = _GLF_FUZZED(mat4(GLF_live11m24));
                    vec4 donor_replacementGLF_dead19matrix_u = _GLF_FUZZED(fma(GLF_live16_GLF_color, GLF_live0gl_FragCoord, mix(_GLF_color, _GLF_color, bvec4(false, false, true, true))));
                    {
                        for (int GLF_dead19a = GLF_dead19MATRIX_N - 1; GLF_dead19a >= i; GLF_dead19a--) {
                            GLF_dead8b_b += donor_replacementGLF_dead19matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19a, 4)] * donor_replacementGLF_dead19matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19a, 4)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead19j, 4)];
                        }
                        GLF_dead8s_g = donor_replacementGLF_dead19alpha2 * GLF_dead8b_b;
                        for (int GLF_dead19a = GLF_dead19MATRIX_N - 1; GLF_dead19a >= i; GLF_dead19a--) {
                            donor_replacementGLF_dead19matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19a, 4)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead19j, 4)] = donor_replacementGLF_dead19matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19a, 4)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead19j, 4)] - (GLF_dead8s_g * donor_replacementGLF_dead19matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19a, 4)]);
                        }
                        GLF_dead8b_b = 0.0;
                        GLF_dead8s_g = 0.0;
                    }
                }
                data[i] = 0;
                if (_GLF_DEAD(false)) {
                    {
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            vec2 donor_replacementGLF_dead20o = _GLF_FUZZED(GLF_dead8resolution);
                            {
                                donor_replacementGLF_dead20o = donor_replacementGLF_dead20o + donor_replacementGLF_dead20o;
                                i--;
                            }
                        }
                        ;
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        _GLF_color = tan(reflect(_GLF_color, GLF_dead5_GLF_color));
                    }
                }
                break;
            case 5:
                if (_GLF_DEAD(false)) {
                    _GLF_color = vec3(5.6, 3044.1120, 227.890).xxyx;
                }
                data[i] = -1;
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    if (_GLF_DEAD(false)) {
                        float donor_replacementGLF_dead19beta = _GLF_FUZZED(exp2(GLF_dead8h_r));
                        for (int GLF_dead19a = GLF_dead19MATRIX_N - 1; GLF_dead19a >= i; GLF_dead19a--) {
                            GLF_dead6m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19a, 4)][_GLF_MAKE_IN_BOUNDS_INT(i, 4)] = GLF_dead6m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19a, 4)][_GLF_MAKE_IN_BOUNDS_INT(i, 4)] - (donor_replacementGLF_dead19beta * GLF_live16_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19a, 4)]);
                        }
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        {
                            continue;
                        }
                    }
                    _GLF_color = (_GLF_color + _GLF_color);
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    if (_GLF_DEAD(false)) {
                        int donor_replacementGLF_dead18iteration = _GLF_FUZZED(ivec4(-4444, 16020, 56134, 96051).a);
                        {
                            ;
                        }
                    }
                    vec3 donor_replacementGLF_dead5col = _GLF_FUZZED(vec3(6670.5847, 522.470, 229.712));
                    if (_GLF_DEAD(false)) {
                        _GLF_color = GLF_dead5_GLF_color;
                    }
                    vec2 donor_replacementGLF_dead5uv = _GLF_FUZZED(fract(injectionSwitch));
                    {
                        vec2 GLF_live17pos = _GLF_FUZZED((mat2(-17.65, -4.3, -5.2, -3562.5475) * vec2(617.399, 3553.5416)));
                        vec4 GLF_live17quad = _GLF_FUZZED((mat3x4(4773.8253, -4.0, 55.44, -111.470, 87.48, -9.8, 968.800, 5.3, 4.7, -63.31, -8.5, 362.477) * (vec3(34.91, -7.3, -6.8))));
                        if (GLF_live17pos.y < GLF_live17quad.y) {
                            ;
                        }
                    }
                    {
                        if (_GLF_DEAD(false)) {
                            float donor_replacementGLF_dead9limit = _GLF_FUZZED(degrees(81.13));
                            float donor_replacementGLF_dead9ref = _GLF_FUZZED(floor(-74.42));
                            float donor_replacementGLF_dead9s = _GLF_FUZZED(roundEven(GLF_dead6one));
                            {
                                ivec2 GLF_live10p = _GLF_FUZZED((ivec2(84064, -11597) * ivec2(59016, -29775)));
                                {
                                    GLF_live10p.y--;
                                    if (_GLF_DEAD(false)) {
                                        float donor_replacementGLF_dead21grey = _GLF_FUZZED(donor_replacementGLF_dead5col.b);
                                        {
                                            if (int(GLF_dead21gl_FragCoord[1]) < 240) {
                                                donor_replacementGLF_dead21grey = 0.5 + float(GLF_dead21data[7]) / 10.0;
                                            } else {
                                                if (int(GLF_dead21gl_FragCoord[1]) < 270) {
                                                    donor_replacementGLF_dead21grey = 0.5 + float(GLF_dead21data[8]) / 10.0;
                                                } else {
                                                    discard;
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            {
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = vec4(2234.1469, 154.321, 89.22, -7.3);
                                }
                                if (mod(float(i), donor_replacementGLF_dead9ref) <= 0.01) {
                                    {
                                        ivec2 GLF_live10p = _GLF_FUZZED(((ivec2(-18353, -84337) - (-90326)) ^ ((88670 & (-80375)) + (~(-51315)))));
                                        {
                                            GLF_live10p.x = -GLF_live10p.x;
                                        }
                                    }
                                    if (_GLF_DEAD(false)) {
                                        int donor_replacementGLF_dead19a = _GLF_FUZZED(((-76946) | i));
                                        float donor_replacementGLF_dead19alpha3 = _GLF_FUZZED(float(i));
                                        vec4 donor_replacementGLF_dead19matrix_u = _GLF_FUZZED(dFdyCoarse(GLF_dead5_GLF_color));
                                        {
                                            donor_replacementGLF_dead19alpha3 += donor_replacementGLF_dead19matrix_u[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead19a, 4)] * GLF_live11m44[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead19a, 4)][_GLF_MAKE_IN_BOUNDS_INT(i, 4)];
                                        }
                                    }
                                    donor_replacementGLF_dead9s += 0.2;
                                }
                                if (float(i) >= donor_replacementGLF_dead9limit) {
                                    ;
                                }
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                if (_GLF_DEAD(false)) {
                                    float donor_replacementGLF_dead19alpha1 = _GLF_FUZZED(GLF_dead8time);
                                    float donor_replacementGLF_dead19alpha2 = _GLF_FUZZED(GLF_dead8b_b);
                                    int donor_replacementGLF_dead19k = _GLF_FUZZED((i << i));
                                    mat4 donor_replacementGLF_dead19matrix_a = _GLF_FUZZED(GLF_live11m44);
                                    vec4 donor_replacementGLF_dead19matrix_b = _GLF_FUZZED(intBitsToFloat(ivec4(79241, -92818, 53653, -76202)));
                                    {
                                        for (int GLF_dead19x = GLF_dead19MATRIX_N - 1; GLF_dead19x >= donor_replacementGLF_dead19k; GLF_dead19x--) {
                                            GLF_dead8s_g += donor_replacementGLF_dead19matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19x, 4)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead19k, 4)] * donor_replacementGLF_dead19matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19x, 4)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead19k, 4)];
                                            GLF_live16_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19x, 4)] = donor_replacementGLF_dead19matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19x, 4)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead19k, 4)];
                                        }
                                        GLF_dead8s_g = sqrt(GLF_dead8s_g);
                                        GLF_live16_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead19k, 4)] -= (sign(GLF_live16_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead19k, 4)]) * GLF_dead8s_g);
                                        for (int GLF_dead19u = GLF_dead19MATRIX_N - 1; GLF_dead19u >= donor_replacementGLF_dead19k; GLF_dead19u--) {
                                            donor_replacementGLF_dead19alpha1 += GLF_live16_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19u, 4)] * GLF_live16_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19u, 4)];
                                        }
                                        donor_replacementGLF_dead19alpha2 = 2.0 / donor_replacementGLF_dead19alpha1;
                                        for (int GLF_dead19j = donor_replacementGLF_dead19k; GLF_dead19j < GLF_dead19MATRIX_N; GLF_dead19j++) {
                                            for (int GLF_dead19a = GLF_dead19MATRIX_N - 1; GLF_dead19a >= donor_replacementGLF_dead19k; GLF_dead19a--) {
                                                GLF_dead8b_b += GLF_live16_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19a, 4)] * donor_replacementGLF_dead19matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19a, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19j, 4)];
                                            }
                                            donor_replacementGLF_dead9limit = donor_replacementGLF_dead19alpha2 * GLF_dead8b_b;
                                            for (int GLF_dead19a = GLF_dead19MATRIX_N - 1; GLF_dead19a >= donor_replacementGLF_dead19k; GLF_dead19a--) {
                                                donor_replacementGLF_dead19matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19a, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19j, 4)] = donor_replacementGLF_dead19matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19a, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19j, 4)] - (donor_replacementGLF_dead9limit * GLF_live16_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19a, 4)]);
                                            }
                                            GLF_dead8b_b = 0.0;
                                            donor_replacementGLF_dead9limit = 0.0;
                                        }
                                        for (int GLF_dead19b = GLF_dead19MATRIX_N - 1; GLF_dead19b >= donor_replacementGLF_dead19k; GLF_dead19b--) {
                                            GLF_dead8b_b += GLF_live16_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19b, 4)] * donor_replacementGLF_dead19matrix_b[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19b, 4)];
                                        }
                                        donor_replacementGLF_dead9limit = donor_replacementGLF_dead19alpha2 * GLF_dead8b_b;
                                        for (int GLF_dead19b = GLF_dead19MATRIX_N - 1; GLF_dead19b >= donor_replacementGLF_dead19k; GLF_dead19b--) {
                                            donor_replacementGLF_dead19matrix_b[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19b, 4)] = donor_replacementGLF_dead19matrix_b[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19b, 4)] - (donor_replacementGLF_dead9limit * GLF_live16_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19b, 4)]);
                                        }
                                        GLF_dead8s_g = 0.0;
                                        donor_replacementGLF_dead19alpha1 = 0.0;
                                        donor_replacementGLF_dead19alpha2 = 0.0;
                                        GLF_dead8b_b = 0.0;
                                        donor_replacementGLF_dead9limit = 0.0;
                                    }
                                }
                                _GLF_color = (vec4(-7.1, -4.7, 60.68, 56.87) * _GLF_color);
                            }
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            _GLF_color = GLF_live16_GLF_color;
                        }
                        float GLF_dead5stripe = GLF_dead5compute_stripe(tan((donor_replacementGLF_dead5uv.x + donor_replacementGLF_dead5uv.y) * 20.0), donor_replacementGLF_dead5uv.x + donor_replacementGLF_dead5uv.y);
                        donor_replacementGLF_dead5col = mix(vec3(0.5, donor_replacementGLF_dead5uv.x, 0.1), vec3(.4, 0, .5), GLF_dead5stripe);
                        GLF_dead5_GLF_color = vec4(donor_replacementGLF_dead5col, 1.0);
                        return;
                    }
                }
                if (_GLF_DEAD(false)) {
                    bool donor_replacementGLF_dead8c2 = _GLF_FUZZED(false);
                    if (!donor_replacementGLF_dead8c2) {
                        if (_GLF_DEAD(false)) {
                            int donor_replacementGLF_dead20i = _GLF_FUZZED((i / findLSB(bitCount(198066u))));
                            if (donor_replacementGLF_dead20i < int(GLF_dead20gl_FragCoord.x)) {
                                break;
                            }
                        }
                        if (_GLF_DEAD(false)) {
                            _GLF_color = _GLF_color;
                        }
                        ;
                    }
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    _GLF_color = GLF_dead5_GLF_color;
                }
                break;
            case 6:
                {
                    int GLF_live16directions = _GLF_FUZZED(int(uint(-41174)));
                    ivec2 GLF_live16p = _GLF_FUZZED((true ? ivec2(14455, 95563) : ivec2(66438, -20723)));
                    if (GLF_live16p.y < 14 && GLF_live16map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live16p.x) + (GLF_live16p.y + 2) * 16, 256)] == 0) {
                        GLF_live16directions += 1;
                    }
                }
                data[i] = -2;
                break;
                if (_GLF_DEAD(false)) {
                    if (_GLF_DEAD(false)) {
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            _GLF_color = atan(GLF_dead5_GLF_color);
                        }
                        {
                            ;
                            if (_GLF_DEAD(false)) {
                                _GLF_color = GLF_dead5_GLF_color;
                            }
                        }
                    }
                    bool donor_replacementGLF_dead5c1 = _GLF_FUZZED((true != true));
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        vec3 donor_replacementGLF_dead20m = _GLF_FUZZED(vec3(-1304.9594, 8690.0867, 2015.6532).stt);
                        vec2 donor_replacementGLF_dead20o = _GLF_FUZZED(vec2(-9.3, 886.558));
                        if (GLF_dead20injectionSwitch.x < (donor_replacementGLF_dead20m.x)) {
                            int GLF_dead20k = 1;
                            while (GLF_dead20k >= 0) {
                                donor_replacementGLF_dead20o = donor_replacementGLF_dead20o + donor_replacementGLF_dead20o;
                                GLF_dead20k--;
                            }
                            donor_replacementGLF_dead20m = vec3(GLF_dead20injectionSwitch.x, cos(donor_replacementGLF_dead20o));
                        }
                    }
                    bool donor_replacementGLF_dead5c2 = _GLF_FUZZED((floatBitsToUint(_GLF_color)[1] > (143447u << 119433u)));
                    vec3 donor_replacementGLF_dead5col = _GLF_FUZZED(dFdyFine(vec3(85.35, 4964.0751, 7.8)));
                    vec2 donor_replacementGLF_dead5uv = _GLF_FUZZED(resolution);
                    if (!donor_replacementGLF_dead5c1 && donor_replacementGLF_dead5c2) {
                        float GLF_dead5stripe = GLF_dead5compute_stripe(tan((donor_replacementGLF_dead5uv.x + donor_replacementGLF_dead5uv.y) * 20.0), donor_replacementGLF_dead5uv.x + donor_replacementGLF_dead5uv.y);
                        donor_replacementGLF_dead5col = mix(vec3(0.5, donor_replacementGLF_dead5uv.x, 0.1), vec3(.4, 0, .5), GLF_dead5stripe);
                        GLF_dead5_GLF_color = vec4(donor_replacementGLF_dead5col, 1.0);
                        return;
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            bool donor_replacementGLF_dead8c6 = _GLF_FUZZED((donor_replacementGLF_dead5c1));
                            int donor_replacementGLF_dead8msb8 = _GLF_FUZZED(-52630);
                            vec2 donor_replacementGLF_dead8pos = _GLF_FUZZED(degrees(log2(resolution)));
                            vec3 donor_replacementGLF_dead8setting = _GLF_FUZZED((-vec3(-20.89, -0.3, 2219.3437)));
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                _GLF_color = floor(GLF_dead5_GLF_color);
                            }
                            if (!donor_replacementGLF_dead8c6) {
                                ;
                            }
                        }
                        if (_GLF_DEAD(false)) {
                            float donor_replacementGLF_dead19alpha3 = _GLF_FUZZED(GLF_dead6one);
                            int donor_replacementGLF_dead19k = _GLF_FUZZED(findMSB(N));
                            mat4 donor_replacementGLF_dead19matrix_a = _GLF_FUZZED(mat4(-9601.1451, -2.2, -72.36, 3.5, -7.1, 0.1, -2.2, 5326.8072, -5386.8988, -5.3, 9304.9595, 9.2, 2.0, 30.60, -5.4, -5.0));
                            vec4 donor_replacementGLF_dead19matrix_u = _GLF_FUZZED(_GLF_color);
                            for (int GLF_dead19j = donor_replacementGLF_dead19k; GLF_dead19j < GLF_dead19MATRIX_N; GLF_dead19j++) {
                                for (int GLF_dead19a = GLF_dead19MATRIX_N - 1; GLF_dead19a >= donor_replacementGLF_dead19k; GLF_dead19a--) {
                                    donor_replacementGLF_dead19alpha3 += donor_replacementGLF_dead19matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19a, 4)] * donor_replacementGLF_dead19matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19a, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19j, 4)];
                                }
                                GLF_dead8h_r = GLF_dead8s_g * donor_replacementGLF_dead19alpha3;
                                for (int GLF_dead19a = GLF_dead19MATRIX_N - 1; GLF_dead19a >= donor_replacementGLF_dead19k; GLF_dead19a--) {
                                    donor_replacementGLF_dead19matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19a, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19j, 4)] = donor_replacementGLF_dead19matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19a, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19j, 4)] - (GLF_dead8h_r * donor_replacementGLF_dead19matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19a, 4)]);
                                }
                                donor_replacementGLF_dead19alpha3 = 0.0;
                                GLF_dead8h_r = 0.0;
                            }
                        }
                    }
                    {
                        int GLF_live12index = _GLF_FUZZED((~(10057)));
                        int GLF_live12j = _GLF_FUZZED(((+(-38129)) | (-76436)));
                        {
                            if (_GLF_DEAD(false)) {
                                vec3 donor_replacementGLF_dead20m = _GLF_FUZZED(vec3(-80.15, 222.701, -54.27));
                                {
                                    vec2 GLF_dead20g = vec2(float(GLF_live12j), float(i));
                                    vec2 GLF_dead20o = mix(donor_replacementGLF_dead5uv, GLF_dead20g, 0.2);
                                    if (GLF_dead20injectionSwitch.x < (donor_replacementGLF_dead20m.x)) {
                                        int GLF_dead20k = 1;
                                        while (GLF_dead20k >= 0) {
                                            GLF_dead20o = GLF_dead20o + GLF_dead20o;
                                            GLF_dead20k--;
                                        }
                                        donor_replacementGLF_dead20m = vec3(GLF_dead20injectionSwitch.x, cos(GLF_dead20o));
                                    }
                                }
                            }
                            GLF_live12index = GLF_live12j;
                        }
                    }
                }
                {
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        if (int(GLF_dead21gl_FragCoord[1]) < 150) {
                            discard;
                        } else {
                            if (int(GLF_dead21gl_FragCoord[1]) < 180) {
                                GLF_dead8s_g = 0.5 + float(GLF_dead21data[5]) / 10.0;
                            } else {
                                if (int(GLF_dead21gl_FragCoord[1]) < 210) {
                                    GLF_dead8s_g = 0.5 + float(GLF_dead21data[6]) / 10.0;
                                } else {
                                    if (int(GLF_dead21gl_FragCoord[1]) < 240) {
                                        GLF_dead8s_g = 0.5 + float(GLF_dead21data[7]) / 10.0;
                                    } else {
                                        if (int(GLF_dead21gl_FragCoord[1]) < 270) {
                                            GLF_dead8s_g = 0.5 + float(GLF_dead21data[8]) / 10.0;
                                        } else {
                                            discard;
                                        }
                                    }
                                }
                            }
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        _GLF_color = _GLF_color;
                    }
                    vec2 GLF_live0color = _GLF_FUZZED(vec2(95.84, 36.89));
                    int GLF_live0i = _GLF_FUZZED(15503);
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        int donor_replacementGLF_dead8msb8 = _GLF_FUZZED(GLF_live0i);
                        vec2 donor_replacementGLF_dead8pos = _GLF_FUZZED(vec2(-3043.3208, -56.99));
                        vec3 donor_replacementGLF_dead8setting = _GLF_FUZZED(vec3(2.6, 9515.0972, -3.9));
                        {
                            ;
                        }
                    }
                    vec3 GLF_live0vecCoor = _GLF_FUZZED(vec3(-81.21, -5.8, -4163.0491));
                    {
                        GLF_live0color = fract(sin(GLF_live0vecCoor.yx - trunc(float(GLF_live0data[4]))));
                        GLF_live0color[1] += asinh(GLF_live0gl_FragCoord.y * ldexp(GLF_live0color.y, -GLF_live0i));
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            _GLF_color = abs(GLF_live16_GLF_color);
                        }
                        ;
                        if (_GLF_DEAD(false)) {
                            _GLF_color = _GLF_color;
                            if (_GLF_DEAD(false)) {
                                int donor_replacementGLF_dead18iterationCap = _GLF_FUZZED(N);
                                float donor_replacementGLF_dead18x = _GLF_FUZZED(determinant(GLF_live11m22));
                                do {
                                    if (donor_replacementGLF_dead18x * donor_replacementGLF_dead18x + GLF_dead8s_g * GLF_dead8s_g > 4.0) {
                                        break;
                                    }
                                    float GLF_dead18x_new = donor_replacementGLF_dead18x * donor_replacementGLF_dead18x - GLF_dead8s_g * GLF_dead8s_g + GLF_dead8h_r;
                                    GLF_dead8s_g = 2.0 * donor_replacementGLF_dead18x * GLF_dead8s_g + GLF_dead8b_b;
                                    donor_replacementGLF_dead18x = GLF_dead18x_new;
                                    GLF_live0i++;
                                    GLF_live0i++;
                                } while (GLF_live0i < bitfieldInsert(donor_replacementGLF_dead18iterationCap + (257.0 > GLF_dead18resolution.y ? 1 : 0), 0, 0, 0));
                            }
                        }
                    }
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        float donor_replacementGLF_dead19alpha3 = _GLF_FUZZED(GLF_dead8time);
                        int donor_replacementGLF_dead19k = _GLF_FUZZED(i);
                        vec4 donor_replacementGLF_dead19matrix_u = _GLF_FUZZED(faceforward(GLF_live0gl_FragCoord, GLF_live0gl_FragCoord, GLF_live0gl_FragCoord));
                        for (int GLF_dead19b = GLF_dead19MATRIX_N - 1; GLF_dead19b >= donor_replacementGLF_dead19k; GLF_dead19b--) {
                            donor_replacementGLF_dead19alpha3 += donor_replacementGLF_dead19matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19b, 4)] * GLF_dead5_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19b, 4)];
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        _GLF_color = sinh(vec4(2.1, -8080.8563, -6.2, -6155.0385));
                        if (_GLF_DEAD(false)) {
                            {
                                discard;
                            }
                        }
                    }
                    float donor_replacementGLF_dead9s = _GLF_FUZZED(GLF_dead6one);
                    {
                        ;
                    }
                }
            case 7:
                if (_GLF_DEAD(false)) {
                    bool donor_replacementGLF_dead5c1 = _GLF_FUZZED(false);
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < tan(0.0))))) {
                        {
                            GLF_dead21temp[_GLF_MAKE_IN_BOUNDS_INT(i, 10)] = GLF_dead21data[_GLF_MAKE_IN_BOUNDS_INT(i, 10)];
                        }
                    }
                    vec3 donor_replacementGLF_dead5col = _GLF_FUZZED((vec3(-36.48, -109.041, -65.99) * vec3(-32.95, -3.7, 99.27)));
                    vec2 donor_replacementGLF_dead5uv = _GLF_FUZZED(step(vec2(8270.8792, 9.7), mix(resolution, vec2(6.2, -59.32), resolution)));
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        _GLF_color = dFdyFine(_GLF_color);
                    }
                    if (_GLF_DEAD(false)) {
                        float donor_replacementGLF_dead9s = _GLF_FUZZED(4.2);
                        {
                            ;
                        }
                        if (_GLF_DEAD(false)) {
                            int donor_replacementGLF_dead21i = _GLF_FUZZED(((79924 * i) << min(i, i)));
                            {
                                GLF_dead21data[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead21i, 10)] = GLF_dead21temp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead21i, 10)];
                            }
                        }
                    }
                    if (donor_replacementGLF_dead5c1) {
                        {
                            int GLF_live14looplimiter0 = 0;
                            if (GLF_live14looplimiter0 >= 4) {
                                ;
                            }
                        }
                        float GLF_dead5stripe = GLF_dead5compute_stripe(cos((donor_replacementGLF_dead5uv.x + donor_replacementGLF_dead5uv.y) * 20.0), donor_replacementGLF_dead5uv.x + donor_replacementGLF_dead5uv.y);
                        donor_replacementGLF_dead5col = mix(vec3(donor_replacementGLF_dead5uv.x, 0, 0.75), vec3(.8, .7, donor_replacementGLF_dead5uv.x), GLF_dead5stripe);
                        GLF_dead5_GLF_color = vec4(donor_replacementGLF_dead5col, 1.0);
                        return;
                    }
                }
                data[i] = -3;
                break;
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    int donor_replacementGLF_dead18iteration = _GLF_FUZZED(53547);
                    int donor_replacementGLF_dead18k = _GLF_FUZZED(i);
                    float donor_replacementGLF_dead18x = _GLF_FUZZED(GLF_live11one);
                    float donor_replacementGLF_dead18y = _GLF_FUZZED(GLF_dead8h_r);
                    {
                        if (donor_replacementGLF_dead18x * donor_replacementGLF_dead18x + donor_replacementGLF_dead18y * donor_replacementGLF_dead18y > 4.0) {
                            break;
                        }
                        float GLF_dead18x_new = donor_replacementGLF_dead18x * donor_replacementGLF_dead18x - donor_replacementGLF_dead18y * donor_replacementGLF_dead18y + GLF_dead8b_b;
                        donor_replacementGLF_dead18y = 2.0 * donor_replacementGLF_dead18x * donor_replacementGLF_dead18y + GLF_dead8b_b;
                        donor_replacementGLF_dead18x = GLF_dead18x_new;
                        donor_replacementGLF_dead18iteration++;
                        donor_replacementGLF_dead18k++;
                    }
                }
            case 8:
                data[i] = -4;
                break;
            case 9:
                data[i] = -5;
                break;
        }
        i++;
    } while (i < 10);
    if (_GLF_DEAD(false)) {
        _GLF_color = GLF_live16_GLF_color;
    }
    if (_GLF_DEAD(false)) {
        vec3 donor_replacementGLF_dead5col = _GLF_FUZZED(vec3(1.7, -60.53, 4.4));
        if (_GLF_DEAD(false)) {
            float donor_replacementGLF_dead9s = _GLF_FUZZED(-4.6);
            {
                ;
            }
        }
        vec2 donor_replacementGLF_dead5uv = _GLF_FUZZED((unpackSnorm4x8(56275u) * mat2x4(-6.3, 6024.3797, 2385.0143, -97.99, -60.63, 9.0, 5.9, 3.1)));
        {
            float GLF_dead5stripe = GLF_dead5compute_stripe(cos((donor_replacementGLF_dead5uv.x + donor_replacementGLF_dead5uv.y) * 20.0), donor_replacementGLF_dead5uv.x + donor_replacementGLF_dead5uv.y);
            donor_replacementGLF_dead5col = mix(vec3(donor_replacementGLF_dead5uv.x, 0, 0.75), vec3(.8, .7, donor_replacementGLF_dead5uv.x), GLF_dead5stripe);
            if (_GLF_DEAD(false)) {
                _GLF_color = ceil(GLF_dead5_GLF_color);
            }
            GLF_dead5_GLF_color = vec4(donor_replacementGLF_dead5col, 1.0);
            return;
        }
    }
    for (int j = 0; j < 10; j++) {
        temp[j] = data[j];
    }
    {
        {
            ;
        }
    }
    mergeSort();
    mat3 pos = mat3(vec3(4, 0, int(injectionSwitch.y)) * ldexp(0.5, 2), vec3(0, -5, int(injectionSwitch.y)) * ldexp(0.2, 5), vec3(1, 8, int(injectionSwitch.y)) * ldexp(injectionSwitch.y, 0));
    vec3 vecCoor = roundEven(pos * vec3(gl_FragCoord.xx / resolution.yx, 1));
    if (_GLF_DEAD(false)) {
        vec4 donor_replacementGLF_dead9c = _GLF_FUZZED(GLF_dead5_GLF_color);
        {
            if (donor_replacementGLF_dead9c[_GLF_MAKE_IN_BOUNDS_INT(i, 4)] >= 1.0) {
                donor_replacementGLF_dead9c[_GLF_MAKE_IN_BOUNDS_INT(i, 4)] = donor_replacementGLF_dead9c[_GLF_MAKE_IN_BOUNDS_INT(i, 4)] * donor_replacementGLF_dead9c[_GLF_MAKE_IN_BOUNDS_INT(i, 4)];
            }
        }
    }
    vec2 color;
    {
        {
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                int donor_replacementGLF_dead19u = _GLF_FUZZED(i);
                {
                    GLF_dead8s_g += _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead19u, 4)] * _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead19u, 4)];
                }
            }
            ;
        }
    }
    if (_GLF_DEAD(false)) {
        vec3 donor_replacementGLF_dead5col = _GLF_FUZZED(vecCoor);
        if (_GLF_DEAD(false)) {
            {
                if (GLF_dead5_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(i, 4)] >= 1.0) {
                    GLF_dead5_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(i, 4)] = GLF_dead5_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(i, 4)] * GLF_dead5_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(i, 4)];
                }
            }
            {
                ivec2 GLF_live16ipos = _GLF_FUZZED(ivec2(28499, 53330));
                if (GLF_live16map[_GLF_MAKE_IN_BOUNDS_INT(GLF_live16ipos.y * 16 + GLF_live16ipos.x, 256)] == 1) {
                    GLF_live16_GLF_color = vec4(1.0, 1.0, 1.0, 1.0);
                    ;
                }
            }
        }
        vec2 donor_replacementGLF_dead5uv = _GLF_FUZZED((injectionSwitch * mat2(-3.0, 2.4, -16.48, -69.46)));
        if (_GLF_DEAD(false)) {
            _GLF_color = vec4(8.2, 28.13, 832.582, 5.9);
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
            vec2 donor_replacementGLF_dead8center = _GLF_FUZZED(((-9852.1473) * donor_replacementGLF_dead5uv));
            int donor_replacementGLF_dead8msb8 = _GLF_FUZZED(i);
            vec3 donor_replacementGLF_dead8result = _GLF_FUZZED(vec3(7769.1393, -1.2, -60.09));
            if (_GLF_DEAD(_GLF_IDENTITY(false, !(!(false))))) {
                int donor_replacementGLF_dead21i = _GLF_FUZZED(donor_replacementGLF_dead8msb8);
                do {
                    switch (donor_replacementGLF_dead21i) {
                        case 0:
                            GLF_dead21data[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead21i, 10)] = 4;
                            break;
                        case 1:
                            GLF_dead21data[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead21i, 10)] = 3;
                            break;
                        case 2:
                            GLF_dead21data[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead21i, 10)] = 2;
                            break;
                        case 3:
                            GLF_dead21data[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead21i, 10)] = 1;
                            break;
                        case 4:
                            GLF_dead21data[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead21i, 10)] = 0;
                            break;
                        case 5:
                            GLF_dead21data[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead21i, 10)] = -1;
                            break;
                        case 6:
                            GLF_dead21data[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead21i, 10)] = -2;
                            break;
                        case 7:
                            GLF_dead21data[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead21i, 10)] = -3;
                            break;
                        case 8:
                            GLF_dead21data[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead21i, 10)] = -4;
                            break;
                        case 9:
                            GLF_dead21data[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead21i, 10)] = -5;
                            break;
                    }
                    donor_replacementGLF_dead21i++;
                } while (donor_replacementGLF_dead21i < 10);
            }
            for (int GLF_dead8i = bitfieldInsert(35, 0, 0, bitfieldExtract(int(GLF_dead8resolution.x), 0, 1)); GLF_dead8i >= bitfieldReverse(bitfieldExtract(int(GLF_dead8resolution.x), 0, 1)); GLF_dead8i--) {
                {
                    int GLF_live12looplimiter1 = 0;
                    if (GLF_live12looplimiter1 >= 4) {
                        ;
                    }
                }
                vec3 GLF_dead8d = _GLF_FUZZED(dFdxFine(vec3(-80.48, -4.2, 329.711)));
                GLF_dead8d = GLF_dead8drawShape(donor_replacementGLF_dead5uv, donor_replacementGLF_dead8center + vec2(sin(float(GLF_dead8i) / (float(bitCount(donor_replacementGLF_dead8msb8)) * 10.0) + GLF_dead8time) / 4.0 * float(bitCount(donor_replacementGLF_dead8msb8)), float(bitfieldExtract(int(GLF_dead8resolution.x), 0, 1))), vec3(0.01 + sin(float(GLF_dead8i) / 100.0 * float(bitCount(donor_replacementGLF_dead8msb8))), 0.01, float(GLF_dead8i)));
                if (length(GLF_dead8d) <= float(bitfieldExtract(int(GLF_dead8resolution.x), 0, 1))) {
                    {
                        int GLF_live17i = _GLF_FUZZED(((-16370) - 64041));
                        int GLF_live17looplimiter0 = 0;
                        vec2 GLF_live17pos = _GLF_FUZZED(vec2(56.58, -9.1));
                        vec4 GLF_live17res = _GLF_FUZZED(vec4(vec3(-364.771, 131.487, 49.90), 12.34));
                        {
                            if (GLF_live17looplimiter0 >= 5) {
                                ;
                            }
                            GLF_live17looplimiter0++;
                            {
                                if (_GLF_DEAD(false)) {
                                    vec4 donor_replacementGLF_dead19matrix_b = _GLF_FUZZED(GLF_dead5_GLF_color);
                                    for (int GLF_dead19i = (GLF_dead19MATRIX_N - 1); GLF_dead19i >= 0; GLF_dead19i--) {
                                        for (int GLF_dead19j = (GLF_dead19MATRIX_N - 1); GLF_dead19j >= (GLF_dead19i + 1); GLF_dead19j--) {
                                            donor_replacementGLF_dead19matrix_b[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19i, 4)] -= (GLF_live11m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19i, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19j, 4)] * donor_replacementGLF_dead19matrix_b[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19j, 4)]);
                                        }
                                        donor_replacementGLF_dead19matrix_b[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19i, 4)] /= GLF_live11m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19i, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19i, 4)];
                                    }
                                }
                                if (GLF_live17collision(GLF_live17pos, GLF_live17picdata[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17i, 8)])) {
                                    GLF_live17res = GLF_live17pal[_GLF_MAKE_IN_BOUNDS_INT((int(GLF_live17picdata[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17i, 8)].x) * int(GLF_live17picdata[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17i, 8)].y) + GLF_live17i * 9 + 11) % 16, 16)];
                                }
                            }
                            if (_GLF_DEAD(false)) {
                                float donor_replacementGLF_dead19alpha2 = _GLF_FUZZED(distance(GLF_dead8d, vec3(-5.7, 2.4, -3685.7064)));
                                float donor_replacementGLF_dead19beta = _GLF_FUZZED(inversesqrt(GLF_dead8b_b));
                                int donor_replacementGLF_dead19j = _GLF_FUZZED(floatBitsToInt(GLF_dead6one));
                                mat4 donor_replacementGLF_dead19matrix_a = _GLF_FUZZED(outerProduct(min(_GLF_color, vec4(-5037.7225, 4.8, 3.5, 76.31)), _GLF_color));
                                {
                                    for (int GLF_dead19a = GLF_dead19MATRIX_N - 1; GLF_dead19a >= GLF_dead8i; GLF_dead19a--) {
                                        GLF_dead8h_r += GLF_live17res[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19a, 4)] * donor_replacementGLF_dead19matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19a, 4)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead19j, 4)];
                                    }
                                    donor_replacementGLF_dead19beta = donor_replacementGLF_dead19alpha2 * GLF_dead8h_r;
                                    for (int GLF_dead19a = GLF_dead19MATRIX_N - 1; GLF_dead19a >= GLF_dead8i; GLF_dead19a--) {
                                        donor_replacementGLF_dead19matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19a, 4)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead19j, 4)] = donor_replacementGLF_dead19matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19a, 4)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead19j, 4)] - (donor_replacementGLF_dead19beta * GLF_live17res[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19a, 4)]);
                                    }
                                    GLF_dead8h_r = 0.0;
                                    donor_replacementGLF_dead19beta = 0.0;
                                }
                            }
                        }
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        _GLF_color = GLF_live16_GLF_color;
                    }
                    continue;
                }
                donor_replacementGLF_dead8result = vec3(GLF_dead8d);
            }
        }
        {
            {
                int GLF_live10i = _GLF_FUZZED((54321 - (-57247)));
                int GLF_live10looplimiter0 = 0;
                ivec2 GLF_live10p = _GLF_FUZZED(ivec2(18617, -83444));
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    _GLF_color = GLF_live0gl_FragCoord.pssp;
                }
                for (GLF_live10i = 0; GLF_live10i < 100; GLF_live10i++) {
                    if (GLF_live10looplimiter0 >= 3) {
                        break;
                    }
                    GLF_live10looplimiter0++;
                    {
                        {
                            int GLF_live16directions = _GLF_FUZZED(54162);
                            ivec2 GLF_live16p = _GLF_FUZZED(((36243 + ivec2(72427, 74998)) & ivec2(59601, 74490)));
                            if (GLF_live16p.x > 0 && GLF_live16map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live16p.x - 2) + (GLF_live16p.y) * 16, 256)] == 0) {
                                GLF_live16directions += 1;
                                if (_GLF_DEAD(false)) {
                                    vec2 donor_replacementGLF_dead20o = _GLF_FUZZED(vec2(3.6, -830.484));
                                    {
                                        int GLF_dead20k = 1;
                                        while (GLF_dead20k >= 0) {
                                            donor_replacementGLF_dead20o = donor_replacementGLF_dead20o + donor_replacementGLF_dead20o;
                                            GLF_dead20k--;
                                        }
                                        donor_replacementGLF_dead5col = vec3(GLF_dead20injectionSwitch.x, cos(donor_replacementGLF_dead20o));
                                    }
                                }
                            }
                        }
                        if (_GLF_DEAD(false)) {
                            _GLF_color = GLF_live0gl_FragCoord;
                        }
                        GLF_live10p = GLF_live10iter(GLF_live10p);
                    }
                }
            }
            float GLF_dead5stripe = GLF_dead5compute_stripe(cos((donor_replacementGLF_dead5uv.x + donor_replacementGLF_dead5uv.y) * 20.0), donor_replacementGLF_dead5uv.x + donor_replacementGLF_dead5uv.y);
            if (_GLF_DEAD(false)) {
                _GLF_color = GLF_dead5_GLF_color;
            }
            donor_replacementGLF_dead5col = mix(vec3(.7, sinh(donor_replacementGLF_dead5uv.x), donor_replacementGLF_dead5uv.x), vec3(.3, .5, donor_replacementGLF_dead5uv.x), GLF_dead5stripe);
            GLF_dead5_GLF_color = vec4(donor_replacementGLF_dead5col, 1.0);
            {
                vec2 GLF_live13v = _GLF_FUZZED(vec2(54.21, 815.646));
                if (length(GLF_live13v) < 0.001) {
                    ;
                }
            }
            if (_GLF_DEAD(false)) {
                vec4 donor_replacementGLF_dead9c = _GLF_FUZZED(min(GLF_dead5_GLF_color, vec4(-3.4, 48.87, -0.6, 3.7)));
                int donor_replacementGLF_dead9i = _GLF_FUZZED(-26003);
                {
                    donor_replacementGLF_dead9c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9i, 4)] = donor_replacementGLF_dead9c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9i, 4)] * donor_replacementGLF_dead9c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9i, 4)];
                }
            }
            return;
        }
    }
    do {
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            {
                ;
                if (_GLF_DEAD(false)) {
                    int donor_replacementGLF_dead18iteration = _GLF_FUZZED(i);
                    int donor_replacementGLF_dead18iterationCap = _GLF_FUZZED(i);
                    float donor_replacementGLF_dead18xCoord = _GLF_FUZZED(ceil(GLF_live11one));
                    if (donor_replacementGLF_dead18iteration < bitfieldInsert(donor_replacementGLF_dead18iterationCap, 0, 0, 0)) {
                        ;
                    } else {
                        ;
                    }
                }
            }
        }
        if (int(gl_FragCoord[1]) < 30) {
            color = fract(sin(vecCoor.yx - trunc(float(data[0]))));
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < tan(0.0))))) {
                _GLF_color = max(vec4(4784.7437, 5892.4123, -989.637, 9543.7475), dFdyFine(_GLF_color));
                if (_GLF_DEAD(false)) {
                    {
                        ;
                    }
                }
            }
            color[0] = dFdy(gl_FragCoord.y);
            break;
            {
                if (_GLF_DEAD(false)) {
                    int donor_replacementGLF_dead21i = _GLF_FUZZED(findLSB(179593u));
                    {
                        GLF_dead21data[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead21i, 10)] = GLF_dead21temp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead21i, 10)];
                    }
                }
                {
                    GLF_live16_GLF_color = vec4(1.0, 1.0, 1.0, 1.0);
                    ;
                }
            }
        } else {
            if (_GLF_DEAD(false)) {
                _GLF_color = GLF_live0gl_FragCoord;
            }
            if (int(gl_FragCoord[1]) < 60) {
                color = fract(sin(vecCoor.yx - trunc(float(data[1]))));
                if (_GLF_DEAD(false)) {
                    _GLF_color = _GLF_color;
                }
                if (_GLF_DEAD(false)) {
                    uint donor_replacementGLF_dead6matrix_number = _GLF_FUZZED(105504u);
                    if (_GLF_DEAD(false)) {
                        float donor_replacementGLF_dead18xCoord = _GLF_FUZZED(GLF_live11one);
                        float donor_replacementGLF_dead18yCoord = _GLF_FUZZED((GLF_dead8time * GLF_dead8s_g));
                        if (i < bitfieldInsert(i, 0, 0, 0)) {
                            ;
                        } else {
                            ;
                        }
                    }
                    int donor_replacementGLF_dead6rows = _GLF_FUZZED(bitfieldInsert(N, int(dFdy(-6.1)), (i >> (-1002)), N));
                    {
                        if (_GLF_DEAD(_GLF_IDENTITY(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)), (_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))) || false))) {
                            _GLF_color = vec4(17.51, 79.90, 539.494, -0.7);
                            if (_GLF_DEAD(false)) {
                                float donor_replacementGLF_dead19alpha3 = _GLF_FUZZED(GLF_dead8b_b);
                                int donor_replacementGLF_dead19b = _GLF_FUZZED(N);
                                vec4 donor_replacementGLF_dead19matrix_b = _GLF_FUZZED(GLF_dead5_GLF_color);
                                {
                                    donor_replacementGLF_dead19alpha3 += GLF_live16_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead19b, 4)] * donor_replacementGLF_dead19matrix_b[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead19b, 4)];
                                }
                            }
                        }
                        for (int GLF_dead6r = 0; GLF_dead6r < donor_replacementGLF_dead6rows; GLF_dead6r++) {
                            switch (donor_replacementGLF_dead6matrix_number) {
                                case 0u:
                                    GLF_dead6m22[_GLF_MAKE_IN_BOUNDS_INT(i, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6r, 2)] = GLF_dead6one;
                                    break;
                                case 1u:
                                    GLF_dead6m23[_GLF_MAKE_IN_BOUNDS_INT(i, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6r, 3)] = GLF_dead6one;
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                        float donor_replacementGLF_dead21grey = _GLF_FUZZED(GLF_live11one);
                                        if (int(GLF_dead21gl_FragCoord[1]) < 270) {
                                            donor_replacementGLF_dead21grey = 0.5 + float(GLF_dead21data[8]) / 10.0;
                                        } else {
                                            discard;
                                        }
                                    }
                                    break;
                                case 2u:
                                    GLF_dead6m24[_GLF_MAKE_IN_BOUNDS_INT(i, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6r, 4)] = GLF_dead6one;
                                    break;
                                case 3u:
                                    GLF_dead6m32[_GLF_MAKE_IN_BOUNDS_INT(i, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6r, 2)] = GLF_dead6one;
                                    break;
                                case 4u:
                                    GLF_dead6m33[_GLF_MAKE_IN_BOUNDS_INT(i, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6r, 3)] = GLF_dead6one;
                                    break;
                                    if (_GLF_DEAD(false)) {
                                        float donor_replacementGLF_dead19magnitudeX = _GLF_FUZZED(-723.669);
                                        for (int GLF_dead19x = GLF_dead19MATRIX_N - 1; GLF_dead19x >= i; GLF_dead19x--) {
                                            donor_replacementGLF_dead19magnitudeX += GLF_dead6m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19x, 4)][_GLF_MAKE_IN_BOUNDS_INT(i, 4)] * GLF_dead6m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19x, 4)][_GLF_MAKE_IN_BOUNDS_INT(i, 4)];
                                            GLF_live16_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19x, 4)] = GLF_dead6m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19x, 4)][_GLF_MAKE_IN_BOUNDS_INT(i, 4)];
                                        }
                                    }
                                case 5u:
                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                        _GLF_color = vec4(vec3(975.326, -1.7, 5522.3234), GLF_dead8s_g);
                                    }
                                    GLF_dead6m34[_GLF_MAKE_IN_BOUNDS_INT(i, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6r, 4)] = GLF_dead6one;
                                    break;
                                case 6u:
                                    {
                                        if (_GLF_DEAD(false)) {
                                            if (_GLF_DEAD(false)) {
                                                int donor_replacementGLF_dead21i = _GLF_FUZZED(39306);
                                                {
                                                    switch (donor_replacementGLF_dead21i) {
                                                        case 0:
                                                            GLF_dead21data[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead21i, 10)] = 4;
                                                            break;
                                                        case 1:
                                                            GLF_dead21data[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead21i, 10)] = 3;
                                                            break;
                                                        case 2:
                                                            GLF_dead21data[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead21i, 10)] = 2;
                                                            break;
                                                        case 3:
                                                            GLF_dead21data[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead21i, 10)] = 1;
                                                            break;
                                                        case 4:
                                                            GLF_dead21data[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead21i, 10)] = 0;
                                                            break;
                                                        case 5:
                                                            GLF_dead21data[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead21i, 10)] = -1;
                                                            break;
                                                        case 6:
                                                            GLF_dead21data[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead21i, 10)] = -2;
                                                            break;
                                                        case 7:
                                                            GLF_dead21data[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead21i, 10)] = -3;
                                                            break;
                                                        case 8:
                                                            GLF_dead21data[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead21i, 10)] = -4;
                                                            break;
                                                        case 9:
                                                            GLF_dead21data[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead21i, 10)] = -5;
                                                            break;
                                                    }
                                                    donor_replacementGLF_dead21i++;
                                                }
                                            }
                                            _GLF_color = min(GLF_live0gl_FragCoord, GLF_live11one);
                                        }
                                        int GLF_live17looplimiter0 = 0;
                                        if (GLF_live17looplimiter0 >= 5) {
                                            ;
                                        }
                                    }
                                    {
                                        int GLF_live11looplimiter5 = 0;
                                        if (GLF_live11looplimiter5 >= 5) {
                                            ;
                                        }
                                    }
                                    GLF_dead6m42[_GLF_MAKE_IN_BOUNDS_INT(i, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6r, 2)] = GLF_dead6one;
                                    {
                                        {
                                            ;
                                        }
                                    }
                                    break;
                                case 7u:
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                        if (_GLF_DEAD(false)) {
                                            _GLF_color = vec4((length(vec4(9710.6975, 3.6, 744.674, 1060.6978)) / tanh(GLF_dead8h_r)));
                                            if (_GLF_DEAD(false)) {
                                                if (i < int(GLF_dead20gl_FragCoord.x)) {
                                                    break;
                                                }
                                            }
                                        }
                                        _GLF_color = (outerProduct(vec4(37.33, -9009.6664, -9.0, 0.6), _GLF_color) * _GLF_color);
                                    }
                                    GLF_dead6m43[_GLF_MAKE_IN_BOUNDS_INT(i, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6r, 3)] = GLF_dead6one;
                                    break;
                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                        {
                                            GLF_live11m44[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead6rows, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6r, 4)] = GLF_live11m44[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead6rows, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6r, 4)] - (GLF_dead8b_b * GLF_live16_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead6rows, 4)]);
                                        }
                                    }
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = fma(GLF_live16_GLF_color, _GLF_color, GLF_dead5_GLF_color);
                                    }
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < log(1.0))))) {
                                        float donor_replacementGLF_dead19alpha2 = _GLF_FUZZED(determinant(mat2(-34.56, 3702.6012, 6.3, -99.72)));
                                        float donor_replacementGLF_dead19beta = _GLF_FUZZED(asinh(GLF_dead8b_b));
                                        mat4 donor_replacementGLF_dead19matrix_a = _GLF_FUZZED(GLF_live11m44);
                                        vec4 donor_replacementGLF_dead19matrix_u = _GLF_FUZZED(atanh(_GLF_color));
                                        for (int GLF_dead19k = 0; GLF_dead19k < GLF_dead19MATRIX_N - 1; GLF_dead19k++) {
                                            for (int GLF_dead19x = GLF_dead19MATRIX_N - 1; GLF_dead19x >= GLF_dead19k; GLF_dead19x--) {
                                                GLF_dead8s_g += donor_replacementGLF_dead19matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19x, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19k, 4)] * donor_replacementGLF_dead19matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19x, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19k, 4)];
                                                donor_replacementGLF_dead19matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19x, 4)] = donor_replacementGLF_dead19matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19x, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19k, 4)];
                                            }
                                            GLF_dead8s_g = sqrt(GLF_dead8s_g);
                                            donor_replacementGLF_dead19matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19k, 4)] -= (sign(donor_replacementGLF_dead19matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19k, 4)]) * GLF_dead8s_g);
                                            for (int GLF_dead19u = GLF_dead19MATRIX_N - 1; GLF_dead19u >= GLF_dead19k; GLF_dead19u--) {
                                                GLF_dead8h_r += donor_replacementGLF_dead19matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19u, 4)] * donor_replacementGLF_dead19matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19u, 4)];
                                            }
                                            donor_replacementGLF_dead19alpha2 = 2.0 / GLF_dead8h_r;
                                            for (int GLF_dead19j = GLF_dead19k; GLF_dead19j < GLF_dead19MATRIX_N; GLF_dead19j++) {
                                                for (int GLF_dead19a = GLF_dead19MATRIX_N - 1; GLF_dead19a >= GLF_dead19k; GLF_dead19a--) {
                                                    GLF_dead8h_r += donor_replacementGLF_dead19matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19a, 4)] * donor_replacementGLF_dead19matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19a, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19j, 4)];
                                                }
                                                donor_replacementGLF_dead19beta = donor_replacementGLF_dead19alpha2 * GLF_dead8h_r;
                                                for (int GLF_dead19a = GLF_dead19MATRIX_N - 1; GLF_dead19a >= GLF_dead19k; GLF_dead19a--) {
                                                    donor_replacementGLF_dead19matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19a, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19j, 4)] = donor_replacementGLF_dead19matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19a, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19j, 4)] - (donor_replacementGLF_dead19beta * donor_replacementGLF_dead19matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19a, 4)]);
                                                }
                                                GLF_dead8h_r = 0.0;
                                                donor_replacementGLF_dead19beta = 0.0;
                                            }
                                            for (int GLF_dead19b = GLF_dead19MATRIX_N - 1; GLF_dead19b >= GLF_dead19k; GLF_dead19b--) {
                                                GLF_dead8h_r += donor_replacementGLF_dead19matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19b, 4)] * GLF_dead5_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19b, 4)];
                                            }
                                            donor_replacementGLF_dead19beta = donor_replacementGLF_dead19alpha2 * GLF_dead8h_r;
                                            for (int GLF_dead19b = GLF_dead19MATRIX_N - 1; GLF_dead19b >= GLF_dead19k; GLF_dead19b--) {
                                                GLF_dead5_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19b, 4)] = GLF_dead5_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19b, 4)] - (donor_replacementGLF_dead19beta * donor_replacementGLF_dead19matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19b, 4)]);
                                            }
                                            GLF_dead8s_g = 0.0;
                                            GLF_dead8h_r = 0.0;
                                            donor_replacementGLF_dead19alpha2 = 0.0;
                                            GLF_dead8h_r = 0.0;
                                            donor_replacementGLF_dead19beta = 0.0;
                                        }
                                    }
                                case 8u:
                                    GLF_dead6m44[_GLF_MAKE_IN_BOUNDS_INT(i, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6r, 4)] = GLF_dead6one;
                                    break;
                            }
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        {
                            GLF_dead8h_r = 0.5 + float(GLF_dead21data[2]) / 10.0;
                        }
                    }
                }
                color[1] *= atan(faceforward(injectionSwitch, color.xx, vecCoor.yx).y);
                break;
                if (_GLF_DEAD(false)) {
                    float donor_replacementGLF_dead9ref = _GLF_FUZZED(-1.6);
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        _GLF_color = (fwidthFine(vec4(8.9, 0.0, 9.3, 8.2)) * GLF_live0gl_FragCoord);
                    }
                    float donor_replacementGLF_dead9s = _GLF_FUZZED(-85.34);
                    if (mod(float(i), donor_replacementGLF_dead9ref) <= 0.01) {
                        donor_replacementGLF_dead9s += 0.2;
                    }
                    if (_GLF_DEAD(false)) {
                        _GLF_color = log2(_GLF_color);
                    }
                }
            } else {
                if (_GLF_DEAD(false)) {
                    if (_GLF_DEAD(false)) {
                        vec3 donor_replacementGLF_dead8d = _GLF_FUZZED(mix(vec3(-8.6, 43.75, -1.7), vec3(-0.6, 162.382, -85.70), -98.02));
                        if (length(donor_replacementGLF_dead8d) <= float(bitfieldExtract(int(GLF_dead8resolution.x), 0, 1))) {
                            {
                                int GLF_live17i = _GLF_FUZZED(32944);
                                int GLF_live17looplimiter0 = 0;
                                vec2 GLF_live17pos = _GLF_FUZZED((-vec2(-6.0, 103.903)));
                                vec4 GLF_live17res = _GLF_FUZZED(vec4(vec2(3271.3675, 150.757), vec2(10.81, 90.03)));
                                for (GLF_live17i = 0; GLF_live17i < 8; GLF_live17i++) {
                                    if (GLF_live17looplimiter0 >= 5) {
                                        break;
                                        if (_GLF_DEAD(false)) {
                                            {
                                                GLF_live17pos = GLF_live17pos + GLF_live17pos;
                                                GLF_live17looplimiter0--;
                                            }
                                        }
                                    }
                                    GLF_live17looplimiter0++;
                                    {
                                        if (GLF_live17collision(GLF_live17pos, GLF_live17picdata[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17i, 8)])) {
                                            GLF_live17res = GLF_live17pal[_GLF_MAKE_IN_BOUNDS_INT((int(GLF_live17picdata[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17i, 8)].x) * int(GLF_live17picdata[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17i, 8)].y) + GLF_live17i * 9 + 11) % 16, 16)];
                                        }
                                        if (_GLF_DEAD(false)) {
                                            _GLF_color = GLF_live0gl_FragCoord;
                                        }
                                    }
                                }
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = (GLF_live16_GLF_color * GLF_dead6m44);
                                }
                            }
                            continue;
                        }
                    }
                    _GLF_color = _GLF_color;
                }
                if (_GLF_DEAD(false)) {
                    _GLF_color = atanh(dFdy(GLF_live16_GLF_color));
                }
                if (int(gl_FragCoord[1]) < 90) {
                    if (_GLF_DEAD(_GLF_IDENTITY(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)), bool(_GLF_IDENTITY(bvec2(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)), true), bvec2(bvec3(bvec2(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)), true), false))))))) {
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            float donor_replacementGLF_dead18c_im = _GLF_FUZZED(GLF_dead6one);
                            float donor_replacementGLF_dead18c_re = _GLF_FUZZED(GLF_live11one);
                            int donor_replacementGLF_dead18k = _GLF_FUZZED(N);
                            {
                                if (GLF_dead8b_b * GLF_dead8b_b + GLF_dead8s_g * GLF_dead8s_g > 4.0) {
                                    break;
                                }
                                float GLF_dead18x_new = GLF_dead8b_b * GLF_dead8b_b - GLF_dead8s_g * GLF_dead8s_g + donor_replacementGLF_dead18c_re;
                                GLF_dead8s_g = 2.0 * GLF_dead8b_b * GLF_dead8s_g + donor_replacementGLF_dead18c_im;
                                GLF_dead8b_b = GLF_dead18x_new;
                                i++;
                                donor_replacementGLF_dead18k++;
                            }
                        }
                        _GLF_color = intBitsToFloat(ivec4(-98428, 10465, 89353, -85955));
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            {
                                if (int(GLF_dead21gl_FragCoord[1]) < 180) {
                                    GLF_dead8h_r = 0.5 + float(GLF_dead21data[5]) / 10.0;
                                } else {
                                    if (int(GLF_dead21gl_FragCoord[1]) < 210) {
                                        GLF_dead8h_r = 0.5 + float(GLF_dead21data[6]) / 10.0;
                                    } else {
                                        if (int(GLF_dead21gl_FragCoord[1]) < 240) {
                                            GLF_dead8h_r = 0.5 + float(GLF_dead21data[7]) / 10.0;
                                        } else {
                                            if (int(GLF_dead21gl_FragCoord[1]) < 270) {
                                                GLF_dead8h_r = 0.5 + float(GLF_dead21data[8]) / 10.0;
                                            } else {
                                                discard;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < length(vec4(0.0, 0.0, 0.0, 0.0)))))) {
                        float donor_replacementGLF_dead21grey = _GLF_FUZZED(GLF_live11one);
                        {
                            donor_replacementGLF_dead21grey = 0.5 + float(GLF_dead21data[1]) / 10.0;
                        }
                    }
                    {
                        float GLF_live13th = _GLF_FUZZED((vec4(-785.994, -874.539, 395.851, -2860.3257) - 2.6).w);
                        vec2 GLF_live13v = _GLF_FUZZED(vec2(97.21, -7238.8791));
                        if (GLF_live13v.y < 0.0) {
                            GLF_live13th = -GLF_live13th;
                        }
                    }
                    color = fract(sin(vecCoor.yx - trunc(float(data[2]))));
                    color.x += atanh(color.x) * cosh(injectionSwitch.y) * smoothstep(color, injectionSwitch, gl_FragCoord.yy).x;
                    break;
                } else {
                    if (_GLF_DEAD(false)) {
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            _GLF_color = vec4(4803.8879, 629.207, 370.309, -1560.9358);
                        }
                        _GLF_color = _GLF_color;
                    }
                    if (int(gl_FragCoord[1]) < 120) {
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            float donor_replacementGLF_dead9s = _GLF_FUZZED(GLF_dead6one);
                            {
                                ;
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = GLF_live16_GLF_color;
                                }
                            }
                        }
                        if (_GLF_DEAD(false)) {
                            {
                                GLF_dead21temp[_GLF_MAKE_IN_BOUNDS_INT(i, 10)] = GLF_dead21data[_GLF_MAKE_IN_BOUNDS_INT(i, 10)];
                            }
                        }
                        color = fract(acosh(clamp(vecCoor.yx - trunc(float(data[3])), 1.0, 1000.0)));
                        if (_GLF_DEAD(false)) {
                            _GLF_color = vec4(9.8, 2.8, -3.1, -2.0);
                        }
                        {
                            {
                                ;
                            }
                        }
                        {
                            uint GLF_live11matrix_number = _GLF_FUZZED(((true != false) ? 66534u : 118213u));
                            {
                                int GLF_live11looplimiter3 = 0;
                                for (int GLF_live11cols = 2; GLF_live11cols <= 4; GLF_live11cols++) {
                                    if (GLF_live11looplimiter3 >= 5) {
                                        break;
                                    }
                                    GLF_live11looplimiter3++;
                                    {
                                        {
                                            int GLF_live11looplimiter2 = 0;
                                            for (int GLF_live11rows = 2; GLF_live11rows <= 4; GLF_live11rows++) {
                                                if (GLF_live11looplimiter2 >= 5) {
                                                    break;
                                                    {
                                                        int GLF_live16directions = _GLF_FUZZED(ivec4(-14766, 4923, -20006, 83574).y);
                                                        {
                                                            GLF_live16directions += 1;
                                                        }
                                                    }
                                                }
                                                GLF_live11looplimiter2++;
                                                {
                                                    {
                                                        int GLF_live11looplimiter1 = 0;
                                                        for (int GLF_live11c = 0; GLF_live11c < GLF_live11cols; GLF_live11c++) {
                                                            if (GLF_live11looplimiter1 >= 5) {
                                                                {
                                                                    {
                                                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                                            float donor_replacementGLF_dead18c_im = _GLF_FUZZED(cos(GLF_dead8s_g));
                                                                            int donor_replacementGLF_dead18k = _GLF_FUZZED(N);
                                                                            float donor_replacementGLF_dead18y = _GLF_FUZZED(dFdyFine(GLF_live11one));
                                                                            {
                                                                                if (GLF_dead8b_b * GLF_dead8b_b + donor_replacementGLF_dead18y * donor_replacementGLF_dead18y > 4.0) {
                                                                                    break;
                                                                                }
                                                                                float GLF_dead18x_new = GLF_dead8b_b * GLF_dead8b_b - donor_replacementGLF_dead18y * donor_replacementGLF_dead18y + GLF_dead8b_b;
                                                                                donor_replacementGLF_dead18y = 2.0 * GLF_dead8b_b * donor_replacementGLF_dead18y + donor_replacementGLF_dead18c_im;
                                                                                GLF_dead8b_b = GLF_dead18x_new;
                                                                                GLF_live11rows++;
                                                                                donor_replacementGLF_dead18k++;
                                                                            }
                                                                        }
                                                                        ;
                                                                        if (_GLF_DEAD(false)) {
                                                                            _GLF_color = dFdxFine(_GLF_color);
                                                                        }
                                                                    }
                                                                }
                                                                break;
                                                            }
                                                            GLF_live11looplimiter1++;
                                                            {
                                                                {
                                                                    int GLF_live11looplimiter0 = 0;
                                                                    for (int GLF_live11r = 0; GLF_live11r < GLF_live11rows; GLF_live11r++) {
                                                                        if (GLF_live11looplimiter0 >= 5) {
                                                                            break;
                                                                        }
                                                                        GLF_live11looplimiter0++;
                                                                        {
                                                                            switch (GLF_live11matrix_number) {
                                                                                case 0u:
                                                                                    GLF_live11m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live11r, 2)] = GLF_live11one;
                                                                                    break;
                                                                                    if (_GLF_DEAD(false)) {
                                                                                        int donor_replacementGLF_dead20i = _GLF_FUZZED((bvec3(true, true, true), GLF_live11looplimiter2));
                                                                                        vec2 donor_replacementGLF_dead20n = _GLF_FUZZED(GLF_dead8resolution);
                                                                                        {
                                                                                            vec2 GLF_dead20g = vec2(float(GLF_live11cols), float(donor_replacementGLF_dead20i));
                                                                                            vec2 GLF_dead20o = mix(donor_replacementGLF_dead20n, GLF_dead20g, 0.2);
                                                                                            if (GLF_dead20injectionSwitch.x < (vecCoor.x)) {
                                                                                                int GLF_dead20k = 1;
                                                                                                while (GLF_dead20k >= 0) {
                                                                                                    GLF_dead20o = GLF_dead20o + GLF_dead20o;
                                                                                                    GLF_dead20k--;
                                                                                                }
                                                                                                vecCoor = vec3(GLF_dead20injectionSwitch.x, cos(GLF_dead20o));
                                                                                            }
                                                                                        }
                                                                                    }
                                                                                case 1u:
                                                                                    GLF_live11m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live11r, 3)] = GLF_live11one;
                                                                                    if (_GLF_DEAD(false)) {
                                                                                        _GLF_color = GLF_live16_GLF_color;
                                                                                    }
                                                                                    break;
                                                                                case 2u:
                                                                                    GLF_live11m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live11r, 4)] = GLF_live11one;
                                                                                    if (_GLF_DEAD(false)) {
                                                                                        float donor_replacementGLF_dead19alpha2 = _GLF_FUZZED(GLF_dead8time);
                                                                                        float donor_replacementGLF_dead19beta = _GLF_FUZZED(GLF_dead8time);
                                                                                        int donor_replacementGLF_dead19k = _GLF_FUZZED(int(GLF_dead8b_b));
                                                                                        mat4 donor_replacementGLF_dead19matrix_a = _GLF_FUZZED(GLF_live11m44);
                                                                                        for (int GLF_dead19j = donor_replacementGLF_dead19k; GLF_dead19j < GLF_dead19MATRIX_N; GLF_dead19j++) {
                                                                                            for (int GLF_dead19a = GLF_dead19MATRIX_N - 1; GLF_dead19a >= donor_replacementGLF_dead19k; GLF_dead19a--) {
                                                                                                GLF_dead8s_g += _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19a, 4)] * donor_replacementGLF_dead19matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19a, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19j, 4)];
                                                                                            }
                                                                                            donor_replacementGLF_dead19beta = donor_replacementGLF_dead19alpha2 * GLF_dead8s_g;
                                                                                            for (int GLF_dead19a = GLF_dead19MATRIX_N - 1; GLF_dead19a >= donor_replacementGLF_dead19k; GLF_dead19a--) {
                                                                                                donor_replacementGLF_dead19matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19a, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19j, 4)] = donor_replacementGLF_dead19matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19a, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19j, 4)] - (donor_replacementGLF_dead19beta * _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19a, 4)]);
                                                                                            }
                                                                                            GLF_dead8s_g = 0.0;
                                                                                            donor_replacementGLF_dead19beta = 0.0;
                                                                                        }
                                                                                    }
                                                                                    break;
                                                                                case 3u:
                                                                                    GLF_live11m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live11r, 2)] = GLF_live11one;
                                                                                    if (_GLF_DEAD(false)) {
                                                                                        float donor_replacementGLF_dead18y = _GLF_FUZZED(-244.393);
                                                                                        if (0.0 > GLF_dead18resolution.x) {
                                                                                            GLF_dead8h_r = 1.0;
                                                                                            donor_replacementGLF_dead18y = 1.0;
                                                                                        }
                                                                                    }
                                                                                    {
                                                                                        int GLF_live16d = _GLF_FUZZED((false ? (-77356) : (-75340)));
                                                                                        ivec2 GLF_live16p = _GLF_FUZZED((ivec2(ivec4(-34370, 75686, -44881, -11493)) + (-62423)));
                                                                                        if (GLF_live16d >= 0 && GLF_live16p.y < 14 && GLF_live16map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live16p.x) + (GLF_live16p.y + 2) * 16, 256)] == 0) {
                                                                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                                                                if (int(GLF_dead21gl_FragCoord[1]) < 210) {
                                                                                                    GLF_dead8s_g = 0.5 + float(GLF_dead21data[6]) / 10.0;
                                                                                                } else {
                                                                                                    if (int(GLF_dead21gl_FragCoord[1]) < 240) {
                                                                                                        GLF_dead8s_g = 0.5 + float(GLF_dead21data[7]) / 10.0;
                                                                                                    } else {
                                                                                                        if (int(GLF_dead21gl_FragCoord[1]) < 270) {
                                                                                                            GLF_dead8s_g = 0.5 + float(GLF_dead21data[8]) / 10.0;
                                                                                                        } else {
                                                                                                            discard;
                                                                                                        }
                                                                                                    }
                                                                                                }
                                                                                            }
                                                                                            GLF_live16d--;
                                                                                            GLF_live16map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live16p.x) + (GLF_live16p.y) * 16, 256)] = 1;
                                                                                            GLF_live16map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live16p.x) + (GLF_live16p.y + 1) * 16, 256)] = 1;
                                                                                            GLF_live16map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live16p.x) + (GLF_live16p.y + 2) * 16, 256)] = 1;
                                                                                            GLF_live16p.y += 2;
                                                                                            if (_GLF_DEAD(_GLF_IDENTITY(_GLF_IDENTITY(false, true && (false)), bool(bool(_GLF_IDENTITY(false, true && (false))))))) {
                                                                                                {
                                                                                                    GLF_live11looplimiter2 += 1;
                                                                                                }
                                                                                            }
                                                                                            if (_GLF_DEAD(false)) {
                                                                                                _GLF_color = vec4(0.1, 47.60, 8.3, -2.5);
                                                                                            }
                                                                                            if (_GLF_DEAD(false)) {
                                                                                                vec4 donor_replacementGLF_dead19matrix_b = _GLF_FUZZED(vec4(-6.0, -5.6, -64.70, 1.6));
                                                                                                {
                                                                                                    donor_replacementGLF_dead19matrix_b[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11cols, 4)] = donor_replacementGLF_dead19matrix_b[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11cols, 4)] - (GLF_dead8s_g * _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11cols, 4)]);
                                                                                                }
                                                                                            }
                                                                                        }
                                                                                    }
                                                                                    break;
                                                                                case 4u:
                                                                                    GLF_live11m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live11r, 3)] = GLF_live11one;
                                                                                    break;
                                                                                case 5u:
                                                                                    GLF_live11m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live11r, 4)] = GLF_live11one;
                                                                                    break;
                                                                                case 6u:
                                                                                    GLF_live11m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live11r, 2)] = GLF_live11one;
                                                                                    break;
                                                                                case 7u:
                                                                                    GLF_live11m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live11r, 3)] = GLF_live11one;
                                                                                    if (_GLF_DEAD(false)) {
                                                                                        {
                                                                                            GLF_dead8b_b = 0.5 + float(GLF_dead21data[8]) / 10.0;
                                                                                        }
                                                                                    }
                                                                                    break;
                                                                                case 8u:
                                                                                    GLF_live11m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live11r, 4)] = GLF_live11one;
                                                                                    break;
                                                                            }
                                                                        }
                                                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                                            int donor_replacementGLF_dead19k = _GLF_FUZZED(GLF_live11looplimiter3);
                                                                            float donor_replacementGLF_dead19magnitudeX = _GLF_FUZZED(((-0.4) - GLF_dead8b_b));
                                                                            mat4 donor_replacementGLF_dead19matrix_a = _GLF_FUZZED(GLF_dead6m44);
                                                                            vec4 donor_replacementGLF_dead19matrix_u = _GLF_FUZZED(vec4(24.47, 9792.8795, -608.500, 7131.4382));
                                                                            for (int GLF_dead19x = GLF_dead19MATRIX_N - 1; GLF_dead19x >= donor_replacementGLF_dead19k; GLF_dead19x--) {
                                                                                donor_replacementGLF_dead19magnitudeX += donor_replacementGLF_dead19matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19x, 4)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead19k, 4)] * donor_replacementGLF_dead19matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19x, 4)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead19k, 4)];
                                                                                donor_replacementGLF_dead19matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19x, 4)] = donor_replacementGLF_dead19matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19x, 4)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead19k, 4)];
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                                    {
                                                                        GLF_dead21temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live11looplimiter1++, 10)] = GLF_dead21data[_GLF_MAKE_IN_BOUNDS_INT(i++, 10)];
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                    GLF_live11matrix_number = GLF_live11matrix_number + 1u;
                                                }
                                            }
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                int donor_replacementGLF_dead18k = _GLF_FUZZED(N);
                                                float donor_replacementGLF_dead18x = _GLF_FUZZED(-2.4);
                                                float donor_replacementGLF_dead18y = _GLF_FUZZED(GLF_dead6one);
                                                do {
                                                    if (donor_replacementGLF_dead18x * donor_replacementGLF_dead18x + donor_replacementGLF_dead18y * donor_replacementGLF_dead18y > 4.0) {
                                                        break;
                                                    }
                                                    float GLF_dead18x_new = donor_replacementGLF_dead18x * donor_replacementGLF_dead18x - donor_replacementGLF_dead18y * donor_replacementGLF_dead18y + GLF_dead8s_g;
                                                    donor_replacementGLF_dead18y = 2.0 * donor_replacementGLF_dead18x * donor_replacementGLF_dead18y + GLF_dead8h_r;
                                                    donor_replacementGLF_dead18x = GLF_dead18x_new;
                                                    GLF_live11cols++;
                                                    donor_replacementGLF_dead18k++;
                                                } while (donor_replacementGLF_dead18k < bitfieldInsert(GLF_live11looplimiter3 + (257.0 > GLF_dead18resolution.y ? 1 : 0), 0, 0, 0));
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            int donor_replacementGLF_dead9i = _GLF_FUZZED(i);
                            {
                                _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9i, 4)] = _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9i, 4)] * _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9i, 4)];
                            }
                        }
                        if (_GLF_DEAD(false)) {
                            _GLF_color = vec4(1.7, -500.381, -487.079, 7614.2654);
                            if (_GLF_DEAD(false)) {
                                float donor_replacementGLF_dead21grey = _GLF_FUZZED(GLF_live11one);
                                if (int(GLF_dead21gl_FragCoord[1]) < 90) {
                                    donor_replacementGLF_dead21grey = 0.5 + float(GLF_dead21data[2]) / 10.0;
                                } else {
                                    if (int(GLF_dead21gl_FragCoord[1]) < 120) {
                                        donor_replacementGLF_dead21grey = 0.5 + float(GLF_dead21data[3]) / 10.0;
                                    } else {
                                        if (int(GLF_dead21gl_FragCoord[1]) < 150) {
                                            discard;
                                        } else {
                                            if (int(GLF_dead21gl_FragCoord[1]) < 180) {
                                                donor_replacementGLF_dead21grey = 0.5 + float(GLF_dead21data[5]) / 10.0;
                                            } else {
                                                if (int(GLF_dead21gl_FragCoord[1]) < 210) {
                                                    donor_replacementGLF_dead21grey = 0.5 + float(GLF_dead21data[6]) / 10.0;
                                                } else {
                                                    if (int(GLF_dead21gl_FragCoord[1]) < 240) {
                                                        donor_replacementGLF_dead21grey = 0.5 + float(GLF_dead21data[7]) / 10.0;
                                                    } else {
                                                        if (int(GLF_dead21gl_FragCoord[1]) < 270) {
                                                            donor_replacementGLF_dead21grey = 0.5 + float(GLF_dead21data[8]) / 10.0;
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
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                while (i >= 0) {
                                    color = color + color;
                                    i--;
                                    {
                                        if (_GLF_DEAD(false)) {
                                            int donor_replacementGLF_dead19i = _GLF_FUZZED(ivec2(-42059, -42876)[1]);
                                            mat4 donor_replacementGLF_dead19matrix_a = _GLF_FUZZED(mat4(-64.05, -0.6, 8153.2232, -2.1, 76.20, -1686.3712, -6942.4984, -6.5, -6.4, 4523.6743, 9383.6763, 77.79, -6.2, 7.4, -221.151, 8147.6292));
                                            {
                                                for (int GLF_dead19j = (GLF_dead19MATRIX_N - 1); GLF_dead19j >= (donor_replacementGLF_dead19i + 1); GLF_dead19j--) {
                                                    GLF_live0gl_FragCoord[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead19i, 4)] -= (donor_replacementGLF_dead19matrix_a[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead19i, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19j, 4)] * GLF_live0gl_FragCoord[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19j, 4)]);
                                                }
                                                GLF_live0gl_FragCoord[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead19i, 4)] /= donor_replacementGLF_dead19matrix_a[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead19i, 4)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead19i, 4)];
                                            }
                                        }
                                        {
                                            if (_GLF_DEAD(false)) {
                                                int donor_replacementGLF_dead21i = _GLF_FUZZED(N);
                                                {
                                                    GLF_dead21data[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead21i, 10)] = GLF_dead21temp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead21i, 10)];
                                                }
                                            }
                                            ;
                                        }
                                    }
                                }
                                if (_GLF_DEAD(_GLF_IDENTITY(false, (false) && true))) {
                                    float donor_replacementGLF_dead19alpha2 = _GLF_FUZZED(determinant(mat4(GLF_dead6m34)));
                                    float donor_replacementGLF_dead19alpha3 = _GLF_FUZZED(step(GLF_dead8s_g, GLF_dead8time));
                                    int donor_replacementGLF_dead19j = _GLF_FUZZED(78625);
                                    int donor_replacementGLF_dead19k = _GLF_FUZZED(N);
                                    mat4 donor_replacementGLF_dead19matrix_a = _GLF_FUZZED(mat4(1.5, 4.1, 4.9, 3.7, -9.4, 52.47, -3.6, -513.933, 2.4, 881.117, 906.935, 159.468, -10.95, -381.042, 7.9, -9.6));
                                    vec4 donor_replacementGLF_dead19matrix_u = _GLF_FUZZED(vec4(-5.8, -4.8, 2976.8957, 99.66));
                                    {
                                        for (int GLF_dead19a = GLF_dead19MATRIX_N - 1; GLF_dead19a >= donor_replacementGLF_dead19k; GLF_dead19a--) {
                                            donor_replacementGLF_dead19alpha3 += donor_replacementGLF_dead19matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19a, 4)] * donor_replacementGLF_dead19matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19a, 4)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead19j, 4)];
                                        }
                                        GLF_dead8h_r = donor_replacementGLF_dead19alpha2 * donor_replacementGLF_dead19alpha3;
                                        for (int GLF_dead19a = GLF_dead19MATRIX_N - 1; GLF_dead19a >= donor_replacementGLF_dead19k; GLF_dead19a--) {
                                            donor_replacementGLF_dead19matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19a, 4)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead19j, 4)] = donor_replacementGLF_dead19matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19a, 4)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead19j, 4)] - (GLF_dead8h_r * donor_replacementGLF_dead19matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19a, 4)]);
                                        }
                                        donor_replacementGLF_dead19alpha3 = 0.0;
                                        GLF_dead8h_r = 0.0;
                                    }
                                }
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                _GLF_color = (-GLF_dead5_GLF_color);
                            }
                            if (_GLF_DEAD(false)) {
                                float donor_replacementGLF_dead19alpha1 = _GLF_FUZZED(length(GLF_dead6one));
                                int donor_replacementGLF_dead19k = _GLF_FUZZED((i - i));
                                for (int GLF_dead19u = GLF_dead19MATRIX_N - 1; GLF_dead19u >= donor_replacementGLF_dead19k; GLF_dead19u--) {
                                    donor_replacementGLF_dead19alpha1 += GLF_live0gl_FragCoord[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19u, 4)] * GLF_live0gl_FragCoord[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19u, 4)];
                                }
                            }
                            if (_GLF_DEAD(false)) {
                                bool donor_replacementGLF_dead5c1 = _GLF_FUZZED(mix(mix(false, true, false), true, false));
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    int donor_replacementGLF_dead21i = _GLF_FUZZED(i);
                                    int donor_replacementGLF_dead21k = _GLF_FUZZED(ivec2(64783, 37405).t);
                                    while (donor_replacementGLF_dead21i < GLF_dead21N && donor_replacementGLF_dead21i <= i) {
                                        GLF_dead21temp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead21k++, 10)] = GLF_dead21data[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead21i++, 10)];
                                    }
                                }
                                if (donor_replacementGLF_dead5c1) {
                                    float GLF_dead5stripe = GLF_dead5compute_stripe(cos((color.x + color.y) * 20.0), color.x + color.y);
                                    vecCoor = mix(vec3(color.x, 0, 0.75), vec3(.8, .7, color.x), GLF_dead5stripe);
                                    GLF_dead5_GLF_color = vec4(vecCoor, 1.0);
                                    return;
                                }
                            }
                        }
                        if (_GLF_DEAD(false)) {
                            _GLF_color = log2(GLF_live0gl_FragCoord);
                        }
                        if (_GLF_DEAD(false)) {
                            vec3 donor_replacementGLF_dead7m = _GLF_FUZZED(vecCoor);
                            vec2 donor_replacementGLF_dead7n = _GLF_FUZZED(unpackUnorm2x16(93943u));
                            for (int GLF_dead7j = -1; GLF_dead7j <= int(GLF_dead7injectionSwitch.y); GLF_dead7j++) {
                                for (int GLF_dead7i = -1; GLF_dead7i <= int(GLF_dead7injectionSwitch.y); GLF_dead7i++) {
                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                        float donor_replacementGLF_dead18y = _GLF_FUZZED(cosh(GLF_dead8time));
                                        {
                                            GLF_dead8s_g = 1.0;
                                            donor_replacementGLF_dead18y = 1.0;
                                        }
                                    }
                                    vec2 GLF_dead7g = vec2(float(GLF_dead7j), float(GLF_dead7i));
                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                        int donor_replacementGLF_dead21i = _GLF_FUZZED(GLF_dead7j);
                                        {
                                            int GLF_dead21from = donor_replacementGLF_dead21i;
                                            int GLF_dead21mid = donor_replacementGLF_dead21i + GLF_dead7j - 1;
                                            int GLF_dead21to = min(donor_replacementGLF_dead21i + 2 * GLF_dead7j - 1, GLF_dead7j);
                                            GLF_dead21merge(GLF_dead21from, GLF_dead21mid, GLF_dead21to);
                                        }
                                    }
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < determinant(mat2(0.0, 1.0, 0.0, 0.0)))))) {
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                            if (GLF_dead8h_r * GLF_dead8h_r + GLF_dead8h_r * GLF_dead8h_r > 4.0) {
                                                break;
                                            }
                                        }
                                        _GLF_color = vec4(8.4, -6570.1305, 0.4, -349.368);
                                        if (_GLF_DEAD(false)) {
                                            int donor_replacementGLF_dead18iteration = _GLF_FUZZED(findMSB(clamp(-85272, i, GLF_dead7j)));
                                            {
                                                ;
                                            }
                                        }
                                    }
                                    vec2 GLF_dead7o = mix(donor_replacementGLF_dead7n, GLF_dead7g, 0.2);
                                    if (_GLF_DEAD(false)) {
                                        {
                                            GLF_dead8b_b = 0.5 + float(GLF_dead21data[0]) / 10.0;
                                        }
                                    }
                                    if (GLF_dead7injectionSwitch.x < (donor_replacementGLF_dead7m.x)) {
                                        int GLF_dead7k = 1;
                                        while (GLF_dead7k >= 0) {
                                            GLF_dead7o = GLF_dead7o + GLF_dead7o;
                                            {
                                                int GLF_live10looplimiter0 = 0;
                                                if (GLF_live10looplimiter0 >= 3) {
                                                    ;
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                        _GLF_color = _GLF_color;
                                                    }
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                        int donor_replacementGLF_dead19u = _GLF_FUZZED(GLF_live10looplimiter0);
                                                        {
                                                            GLF_dead8b_b += GLF_live16_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead19u, 4)] * GLF_live16_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead19u, 4)];
                                                        }
                                                    }
                                                }
                                                if (_GLF_DEAD(false)) {
                                                    _GLF_color = vec4(abs(GLF_dead8h_r), -7723.2635, GLF_dead8h_r, dot(GLF_dead8b_b, GLF_live11one));
                                                }
                                            }
                                            GLF_dead7k--;
                                        }
                                        donor_replacementGLF_dead7m = vec3(GLF_dead7injectionSwitch.x, cos(GLF_dead7o));
                                    }
                                }
                            }
                        }
                        color.x += (isnan(gl_FragCoord.x) ? log2(gl_FragCoord.x) : log2(gl_FragCoord.y));
                        if (_GLF_DEAD(false)) {
                            _GLF_color = _GLF_color;
                            if (_GLF_DEAD(false)) {
                                float donor_replacementGLF_dead19beta = _GLF_FUZZED(GLF_dead8s_g);
                                int donor_replacementGLF_dead19k = _GLF_FUZZED((i / N));
                                vec4 donor_replacementGLF_dead19matrix_b = _GLF_FUZZED(atan(min(GLF_live0gl_FragCoord, _GLF_color), vec4(-5.4, -9.3, -4.1, 4.5)));
                                vec4 donor_replacementGLF_dead19matrix_u = _GLF_FUZZED(GLF_live0gl_FragCoord);
                                for (int GLF_dead19b = GLF_dead19MATRIX_N - 1; GLF_dead19b >= donor_replacementGLF_dead19k; GLF_dead19b--) {
                                    donor_replacementGLF_dead19matrix_b[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19b, 4)] = donor_replacementGLF_dead19matrix_b[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19b, 4)] - (donor_replacementGLF_dead19beta * donor_replacementGLF_dead19matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19b, 4)]);
                                }
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                vec3 donor_replacementGLF_dead5col = _GLF_FUZZED(tanh(vec3(7.8, -5493.3833, 63.96)));
                                {
                                    if (_GLF_DEAD(false)) {
                                        float donor_replacementGLF_dead9ref = _GLF_FUZZED(-5.2);
                                        if (_GLF_DEAD(false)) {
                                            {
                                                float GLF_live13th = _GLF_FUZZED(0.0);
                                                if (_GLF_DEAD(false)) {
                                                    float donor_replacementGLF_dead18c_im = _GLF_FUZZED(distance(GLF_dead8s_g, GLF_dead8b_b));
                                                    float donor_replacementGLF_dead18c_re = _GLF_FUZZED(inversesqrt(GLF_dead6one));
                                                    int donor_replacementGLF_dead18iteration = _GLF_FUZZED((i << i));
                                                    float donor_replacementGLF_dead18x = _GLF_FUZZED(dFdxFine(determinant(GLF_live11m22)));
                                                    {
                                                        if (donor_replacementGLF_dead18x * donor_replacementGLF_dead18x + GLF_dead8h_r * GLF_dead8h_r > 4.0) {
                                                            break;
                                                        }
                                                        float GLF_dead18x_new = donor_replacementGLF_dead18x * donor_replacementGLF_dead18x - GLF_dead8h_r * GLF_dead8h_r + donor_replacementGLF_dead18c_re;
                                                        GLF_dead8h_r = 2.0 * donor_replacementGLF_dead18x * GLF_dead8h_r + donor_replacementGLF_dead18c_im;
                                                        donor_replacementGLF_dead18x = GLF_dead18x_new;
                                                        donor_replacementGLF_dead18iteration++;
                                                        i++;
                                                    }
                                                }
                                                {
                                                    bool GLF_live16canwalk = _GLF_FUZZED(true);
                                                    int GLF_live16i = _GLF_FUZZED(-15691);
                                                    ivec2 GLF_live16ipos = _GLF_FUZZED(ivec2(-32061, 69276));
                                                    ivec2 GLF_live16p = _GLF_FUZZED(ivec2(63204, 69838));
                                                    int GLF_live16v = _GLF_FUZZED(int(true));
                                                    {
                                                        GLF_live16v++;
                                                        int GLF_live16directions = 0;
                                                        if (GLF_live16p.x > 0 && GLF_live16map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live16p.x - 2) + (GLF_live16p.y) * 16, 256)] == 0) {
                                                            GLF_live16directions += 1;
                                                        }
                                                        if (GLF_live16p.y > 0 && GLF_live16map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live16p.x) + (GLF_live16p.y - 2) * 16, 256)] == 0) {
                                                            GLF_live16directions += 1;
                                                        }
                                                        if (GLF_live16p.x < 14 && GLF_live16map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live16p.x + 2) + (GLF_live16p.y) * 16, 256)] == 0) {
                                                            GLF_live16directions += 1;
                                                        }
                                                        if (GLF_live16p.y < 14 && GLF_live16map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live16p.x) + (GLF_live16p.y + 2) * 16, 256)] == 0) {
                                                            GLF_live16directions += 1;
                                                        }
                                                        if (_GLF_DEAD(false)) {
                                                            float donor_replacementGLF_dead19alpha2 = _GLF_FUZZED(donor_replacementGLF_dead9ref);
                                                            float donor_replacementGLF_dead19beta = _GLF_FUZZED(GLF_live11one);
                                                            float donor_replacementGLF_dead19magnitudeX = _GLF_FUZZED(atan(donor_replacementGLF_dead9ref));
                                                            for (int GLF_dead19k = 0; GLF_dead19k < GLF_dead19MATRIX_N - 1; GLF_dead19k++) {
                                                                for (int GLF_dead19x = GLF_dead19MATRIX_N - 1; GLF_dead19x >= GLF_dead19k; GLF_dead19x--) {
                                                                    donor_replacementGLF_dead19magnitudeX += GLF_live11m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19x, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19k, 4)] * GLF_live11m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19x, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19k, 4)];
                                                                    _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19x, 4)] = GLF_live11m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19x, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19k, 4)];
                                                                }
                                                                donor_replacementGLF_dead19magnitudeX = sqrt(donor_replacementGLF_dead19magnitudeX);
                                                                _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19k, 4)] -= (sign(_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19k, 4)]) * donor_replacementGLF_dead19magnitudeX);
                                                                for (int GLF_dead19u = GLF_dead19MATRIX_N - 1; GLF_dead19u >= GLF_dead19k; GLF_dead19u--) {
                                                                    GLF_dead8b_b += _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19u, 4)] * _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19u, 4)];
                                                                }
                                                                donor_replacementGLF_dead19alpha2 = 2.0 / GLF_dead8b_b;
                                                                for (int GLF_dead19j = GLF_dead19k; GLF_dead19j < GLF_dead19MATRIX_N; GLF_dead19j++) {
                                                                    for (int GLF_dead19a = GLF_dead19MATRIX_N - 1; GLF_dead19a >= GLF_dead19k; GLF_dead19a--) {
                                                                        GLF_dead8b_b += _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19a, 4)] * GLF_live11m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19a, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19j, 4)];
                                                                    }
                                                                    donor_replacementGLF_dead19beta = donor_replacementGLF_dead19alpha2 * GLF_dead8b_b;
                                                                    for (int GLF_dead19a = GLF_dead19MATRIX_N - 1; GLF_dead19a >= GLF_dead19k; GLF_dead19a--) {
                                                                        GLF_live11m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19a, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19j, 4)] = GLF_live11m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19a, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19j, 4)] - (donor_replacementGLF_dead19beta * _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19a, 4)]);
                                                                    }
                                                                    GLF_dead8b_b = 0.0;
                                                                    donor_replacementGLF_dead19beta = 0.0;
                                                                }
                                                                for (int GLF_dead19b = GLF_dead19MATRIX_N - 1; GLF_dead19b >= GLF_dead19k; GLF_dead19b--) {
                                                                    GLF_dead8b_b += _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19b, 4)] * _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19b, 4)];
                                                                }
                                                                donor_replacementGLF_dead19beta = donor_replacementGLF_dead19alpha2 * GLF_dead8b_b;
                                                                for (int GLF_dead19b = GLF_dead19MATRIX_N - 1; GLF_dead19b >= GLF_dead19k; GLF_dead19b--) {
                                                                    _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19b, 4)] = _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19b, 4)] - (donor_replacementGLF_dead19beta * _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19b, 4)]);
                                                                }
                                                                donor_replacementGLF_dead19magnitudeX = 0.0;
                                                                GLF_dead8b_b = 0.0;
                                                                donor_replacementGLF_dead19alpha2 = 0.0;
                                                                GLF_dead8b_b = 0.0;
                                                                donor_replacementGLF_dead19beta = 0.0;
                                                            }
                                                        }
                                                        if (GLF_live16directions == 0) {
                                                            GLF_live16canwalk = false;
                                                            int GLF_live16j = _GLF_FUZZED(-85183);
                                                            {
                                                                int GLF_live16looplimiter2 = 0;
                                                                for (GLF_live16i = 0; GLF_live16i < 8; GLF_live16i++) {
                                                                    if (GLF_live16looplimiter2 >= 7) {
                                                                        break;
                                                                    }
                                                                    GLF_live16looplimiter2++;
                                                                    {
                                                                        {
                                                                            int GLF_live16looplimiter1 = 0;
                                                                            for (GLF_live16j = 0; GLF_live16j < 8; GLF_live16j++) {
                                                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                                                    float donor_replacementGLF_dead21grey = _GLF_FUZZED(GLF_dead8time);
                                                                                    {
                                                                                        donor_replacementGLF_dead21grey = 0.5 + float(GLF_dead21data[5]) / 10.0;
                                                                                    }
                                                                                }
                                                                                if (GLF_live16looplimiter1 >= 7) {
                                                                                    break;
                                                                                    if (_GLF_DEAD(false)) {
                                                                                        float donor_replacementGLF_dead19alpha2 = _GLF_FUZZED(GLF_live13th);
                                                                                        float donor_replacementGLF_dead19alpha3 = _GLF_FUZZED(GLF_live11one);
                                                                                        int donor_replacementGLF_dead19j = _GLF_FUZZED(GLF_live16j);
                                                                                        int donor_replacementGLF_dead19k = _GLF_FUZZED(GLF_live16directions);
                                                                                        vec4 donor_replacementGLF_dead19matrix_u = _GLF_FUZZED(GLF_live0gl_FragCoord);
                                                                                        {
                                                                                            for (int GLF_dead19a = GLF_dead19MATRIX_N - 1; GLF_dead19a >= donor_replacementGLF_dead19k; GLF_dead19a--) {
                                                                                                donor_replacementGLF_dead19alpha3 += donor_replacementGLF_dead19matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19a, 4)] * GLF_dead6m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19a, 4)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead19j, 4)];
                                                                                            }
                                                                                            donor_replacementGLF_dead9ref = donor_replacementGLF_dead19alpha2 * donor_replacementGLF_dead19alpha3;
                                                                                            for (int GLF_dead19a = GLF_dead19MATRIX_N - 1; GLF_dead19a >= donor_replacementGLF_dead19k; GLF_dead19a--) {
                                                                                                GLF_dead6m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19a, 4)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead19j, 4)] = GLF_dead6m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19a, 4)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead19j, 4)] - (donor_replacementGLF_dead9ref * donor_replacementGLF_dead19matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19a, 4)]);
                                                                                            }
                                                                                            donor_replacementGLF_dead19alpha3 = 0.0;
                                                                                            donor_replacementGLF_dead9ref = 0.0;
                                                                                        }
                                                                                    }
                                                                                }
                                                                                GLF_live16looplimiter1++;
                                                                                {
                                                                                    if (GLF_live16map[_GLF_MAKE_IN_BOUNDS_INT(GLF_live16j * 2 + GLF_live16i * 2 * 16, 256)] == 0) {
                                                                                        GLF_live16p.x = GLF_live16j * 2;
                                                                                        GLF_live16p.y = GLF_live16i * 2;
                                                                                        GLF_live16canwalk = true;
                                                                                    }
                                                                                }
                                                                            }
                                                                            if (_GLF_DEAD(false)) {
                                                                                float donor_replacementGLF_dead18c_re = _GLF_FUZZED(GLF_dead6one);
                                                                                int donor_replacementGLF_dead18iteration = _GLF_FUZZED(9344);
                                                                                float donor_replacementGLF_dead18x = _GLF_FUZZED(fwidth(GLF_dead8time));
                                                                                float donor_replacementGLF_dead18y = _GLF_FUZZED(GLF_dead6one);
                                                                                do {
                                                                                    if (donor_replacementGLF_dead18x * donor_replacementGLF_dead18x + donor_replacementGLF_dead18y * donor_replacementGLF_dead18y > 4.0) {
                                                                                        break;
                                                                                    }
                                                                                    float GLF_dead18x_new = donor_replacementGLF_dead18x * donor_replacementGLF_dead18x - donor_replacementGLF_dead18y * donor_replacementGLF_dead18y + donor_replacementGLF_dead18c_re;
                                                                                    donor_replacementGLF_dead18y = 2.0 * donor_replacementGLF_dead18x * donor_replacementGLF_dead18y + GLF_dead8b_b;
                                                                                    donor_replacementGLF_dead18x = GLF_dead18x_new;
                                                                                    donor_replacementGLF_dead18iteration++;
                                                                                    i++;
                                                                                } while (i < bitfieldInsert(i + (257.0 > GLF_dead18resolution.y ? 1 : 0), 0, 0, 0));
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                                if (_GLF_DEAD(false)) {
                                                                    for (int GLF_dead21j = 0; GLF_dead21j < 10; GLF_dead21j++) {
                                                                        GLF_dead21temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead21j, 10)] = GLF_dead21data[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead21j, 10)];
                                                                    }
                                                                }
                                                            }
                                                            GLF_live16map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live16p.x) + (GLF_live16p.y) * 16, 256)] = 1;
                                                        } else {
                                                            int GLF_live16d = GLF_live16v % GLF_live16directions;
                                                            GLF_live16v += GLF_live16directions;
                                                            if (GLF_live16d >= 0 && GLF_live16p.x > 0 && GLF_live16map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live16p.x - 2) + (GLF_live16p.y) * 16, 256)] == 0) {
                                                                GLF_live16d--;
                                                                GLF_live16map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live16p.x) + (GLF_live16p.y) * 16, 256)] = 1;
                                                                GLF_live16map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live16p.x - 1) + (GLF_live16p.y) * 16, 256)] = 1;
                                                                GLF_live16map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live16p.x - 2) + (GLF_live16p.y) * 16, 256)] = 1;
                                                                GLF_live16p.x -= 2;
                                                            }
                                                            if (GLF_live16d >= 0 && GLF_live16p.y > 0 && GLF_live16map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live16p.x) + (GLF_live16p.y - 2) * 16, 256)] == 0) {
                                                                GLF_live16d--;
                                                                GLF_live16map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live16p.x) + (GLF_live16p.y) * 16, 256)] = 1;
                                                                GLF_live16map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live16p.x) + (GLF_live16p.y - 1) * 16, 256)] = 1;
                                                                GLF_live16map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live16p.x) + (GLF_live16p.y - 2) * 16, 256)] = 1;
                                                                GLF_live16p.y -= 2;
                                                            }
                                                            if (GLF_live16d >= 0 && GLF_live16p.x < 14 && GLF_live16map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live16p.x + 2) + (GLF_live16p.y) * 16, 256)] == 0) {
                                                                GLF_live16d--;
                                                                GLF_live16map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live16p.x) + (GLF_live16p.y) * 16, 256)] = 1;
                                                                GLF_live16map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live16p.x + 1) + (GLF_live16p.y) * 16, 256)] = 1;
                                                                GLF_live16map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live16p.x + 2) + (GLF_live16p.y) * 16, 256)] = 1;
                                                                GLF_live16p.x += 2;
                                                            }
                                                            if (GLF_live16d >= 0 && GLF_live16p.y < 14 && GLF_live16map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live16p.x) + (GLF_live16p.y + 2) * 16, 256)] == 0) {
                                                                GLF_live16d--;
                                                                GLF_live16map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live16p.x) + (GLF_live16p.y) * 16, 256)] = 1;
                                                                GLF_live16map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live16p.x) + (GLF_live16p.y + 1) * 16, 256)] = 1;
                                                                GLF_live16map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live16p.x) + (GLF_live16p.y + 2) * 16, 256)] = 1;
                                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < tan(0.0))))) {
                                                                    _GLF_color = _GLF_color;
                                                                }
                                                                GLF_live16p.y += 2;
                                                            }
                                                        }
                                                        if (GLF_live16map[_GLF_MAKE_IN_BOUNDS_INT(GLF_live16ipos.y * 16 + GLF_live16ipos.x, 256)] == 1) {
                                                            GLF_live16_GLF_color = vec4(1.0, 1.0, 1.0, 1.0);
                                                            if (_GLF_DEAD(false)) {
                                                                _GLF_color = vec4(-8.4, -4.5, 0.5, -3681.3296);
                                                            }
                                                            ;
                                                        }
                                                    }
                                                }
                                                if (_GLF_DEAD(false)) {
                                                    _GLF_color = (_GLF_color - _GLF_color);
                                                }
                                                vec2 GLF_live13v = _GLF_FUZZED(vec2(-5622.4445, 697.254));
                                                if (GLF_live13v.y < 0.0) {
                                                    GLF_live13th = -GLF_live13th;
                                                }
                                            }
                                            _GLF_color = (GLF_dead8time / _GLF_color);
                                        }
                                        float donor_replacementGLF_dead9s = _GLF_FUZZED(abs(GLF_dead6one));
                                        if (mod(float(i), donor_replacementGLF_dead9ref) <= 0.01) {
                                            donor_replacementGLF_dead9s += 0.2;
                                        }
                                    }
                                    if (_GLF_DEAD(false)) {
                                        if (_GLF_DEAD(false)) {
                                            float donor_replacementGLF_dead21grey = _GLF_FUZZED(GLF_dead6one);
                                            {
                                                if (int(GLF_dead21gl_FragCoord[1]) < 90) {
                                                    donor_replacementGLF_dead21grey = 0.5 + float(GLF_dead21data[2]) / 10.0;
                                                } else {
                                                    if (int(GLF_dead21gl_FragCoord[1]) < 120) {
                                                        donor_replacementGLF_dead21grey = 0.5 + float(GLF_dead21data[3]) / 10.0;
                                                    } else {
                                                        if (int(GLF_dead21gl_FragCoord[1]) < 150) {
                                                            discard;
                                                        } else {
                                                            if (int(GLF_dead21gl_FragCoord[1]) < 180) {
                                                                donor_replacementGLF_dead21grey = 0.5 + float(GLF_dead21data[5]) / 10.0;
                                                            } else {
                                                                if (int(GLF_dead21gl_FragCoord[1]) < 210) {
                                                                    donor_replacementGLF_dead21grey = 0.5 + float(GLF_dead21data[6]) / 10.0;
                                                                } else {
                                                                    if (int(GLF_dead21gl_FragCoord[1]) < 240) {
                                                                        donor_replacementGLF_dead21grey = 0.5 + float(GLF_dead21data[7]) / 10.0;
                                                                    } else {
                                                                        if (int(GLF_dead21gl_FragCoord[1]) < 270) {
                                                                            donor_replacementGLF_dead21grey = 0.5 + float(GLF_dead21data[8]) / 10.0;
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
                                        }
                                        _GLF_color = log2(_GLF_color);
                                    }
                                    float GLF_dead5stripe = GLF_dead5compute_stripe(cos((color.x + color.y) * 20.0), color.x + color.y);
                                    if (_GLF_DEAD(false)) {
                                        {
                                            discard;
                                        }
                                    }
                                    donor_replacementGLF_dead5col = mix(vec3(.7, sinh(color.x), color.x), vec3(.3, .5, color.x), GLF_dead5stripe);
                                    GLF_dead5_GLF_color = vec4(donor_replacementGLF_dead5col, 1.0);
                                    return;
                                }
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    {
                                        switch (i) {
                                            case 0:
                                                GLF_dead21data[_GLF_MAKE_IN_BOUNDS_INT(i, 10)] = 4;
                                                break;
                                            case 1:
                                                GLF_dead21data[_GLF_MAKE_IN_BOUNDS_INT(i, 10)] = 3;
                                                break;
                                            case 2:
                                                GLF_dead21data[_GLF_MAKE_IN_BOUNDS_INT(i, 10)] = 2;
                                                break;
                                            case 3:
                                                GLF_dead21data[_GLF_MAKE_IN_BOUNDS_INT(i, 10)] = 1;
                                                break;
                                            case 4:
                                                GLF_dead21data[_GLF_MAKE_IN_BOUNDS_INT(i, 10)] = 0;
                                                break;
                                            case 5:
                                                GLF_dead21data[_GLF_MAKE_IN_BOUNDS_INT(i, 10)] = -1;
                                                break;
                                            case 6:
                                                GLF_dead21data[_GLF_MAKE_IN_BOUNDS_INT(i, 10)] = -2;
                                                break;
                                            case 7:
                                                GLF_dead21data[_GLF_MAKE_IN_BOUNDS_INT(i, 10)] = -3;
                                                break;
                                            case 8:
                                                GLF_dead21data[_GLF_MAKE_IN_BOUNDS_INT(i, 10)] = -4;
                                                break;
                                            case 9:
                                                GLF_dead21data[_GLF_MAKE_IN_BOUNDS_INT(i, 10)] = -5;
                                                break;
                                        }
                                        i++;
                                    }
                                }
                            }
                            if (_GLF_DEAD(false)) {
                                _GLF_color = (GLF_dead6m34 * vec3(728.174, 459.462, 692.688));
                            }
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            {
                                break;
                            }
                        }
                        break;
                    } else if (int(gl_FragCoord[1]) < 150) {
                        if (_GLF_DEAD(false)) {
                            _GLF_color = GLF_live0gl_FragCoord;
                        }
                        discard;
                        if (_GLF_DEAD(false)) {
                            bool donor_replacementGLF_dead8c7 = _GLF_FUZZED(false);
                            if (_GLF_DEAD(false)) {
                                vec4 donor_replacementGLF_dead19matrix_b = _GLF_FUZZED(vec4(-8.7, 396.142, 1.9, 12.85));
                                vec4 donor_replacementGLF_dead19matrix_u = _GLF_FUZZED(vec4(-28.33, -523.585, -616.701, -68.67));
                                for (int GLF_dead19b = GLF_dead19MATRIX_N - 1; GLF_dead19b >= i; GLF_dead19b--) {
                                    GLF_dead8b_b += donor_replacementGLF_dead19matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19b, 4)] * donor_replacementGLF_dead19matrix_b[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19b, 4)];
                                }
                            }
                            vec3 donor_replacementGLF_dead8setting = _GLF_FUZZED(vecCoor);
                            if (!donor_replacementGLF_dead8c7) {
                                ;
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                    {
                                        if (int(GLF_dead21gl_FragCoord[1]) < 210) {
                                            GLF_dead8b_b = 0.5 + float(GLF_dead21data[6]) / 10.0;
                                        } else {
                                            if (int(GLF_dead21gl_FragCoord[1]) < 240) {
                                                GLF_dead8b_b = 0.5 + float(GLF_dead21data[7]) / 10.0;
                                            } else {
                                                if (int(GLF_dead21gl_FragCoord[1]) < 270) {
                                                    GLF_dead8b_b = 0.5 + float(GLF_dead21data[8]) / 10.0;
                                                } else {
                                                    discard;
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        if (_GLF_DEAD(false)) {
                            _GLF_color = GLF_live0gl_FragCoord;
                        }
                    } else if (int(gl_FragCoord[1]) < 180) {
                        {
                            int GLF_live1index = _GLF_FUZZED((-(-18602)));
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_ZERO(0.0, injectionSwitch.x))))) {
                                {
                                    ;
                                }
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                if (_GLF_DEAD(false)) {
                                    float donor_replacementGLF_dead19alpha3 = _GLF_FUZZED((mat4x2(GLF_live11m43), GLF_live11one));
                                    int donor_replacementGLF_dead19j = _GLF_FUZZED((-N));
                                    vec4 donor_replacementGLF_dead19matrix_u = _GLF_FUZZED(dFdxCoarse(unpackSnorm4x8(121640u)));
                                    {
                                        donor_replacementGLF_dead19alpha3 += donor_replacementGLF_dead19matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_live1index, 4)] * GLF_live11m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_live1index, 4)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead19j, 4)];
                                    }
                                }
                                _GLF_color = GLF_live0gl_FragCoord;
                            }
                            int GLF_live1j = _GLF_FUZZED((((-99869) == ((-57291) | 76470)) ? (-3464) : (-22946)));
                            {
                                GLF_live1index = GLF_live1j;
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = GLF_live16_GLF_color;
                                    if (_GLF_DEAD(false)) {
                                        float donor_replacementGLF_dead19beta = _GLF_FUZZED(GLF_dead8h_r);
                                        int donor_replacementGLF_dead19k = _GLF_FUZZED(i);
                                        mat4 donor_replacementGLF_dead19matrix_a = _GLF_FUZZED(mat4(-0.2, 5.9, -79.48, 3271.1644, 6754.2860, 47.88, 5.2, -6.3, -687.915, 327.150, 6.2, 1.8, -722.888, -1832.0105, -4591.5703, 7580.3338));
                                        for (int GLF_dead19j = donor_replacementGLF_dead19k; GLF_dead19j < GLF_dead19MATRIX_N; GLF_dead19j++) {
                                            for (int GLF_dead19a = GLF_dead19MATRIX_N - 1; GLF_dead19a >= donor_replacementGLF_dead19k; GLF_dead19a--) {
                                                GLF_dead8h_r += GLF_live16_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19a, 4)] * donor_replacementGLF_dead19matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19a, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19j, 4)];
                                            }
                                            donor_replacementGLF_dead19beta = GLF_dead8b_b * GLF_dead8h_r;
                                            for (int GLF_dead19a = GLF_dead19MATRIX_N - 1; GLF_dead19a >= donor_replacementGLF_dead19k; GLF_dead19a--) {
                                                donor_replacementGLF_dead19matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19a, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19j, 4)] = donor_replacementGLF_dead19matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19a, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19j, 4)] - (donor_replacementGLF_dead19beta * GLF_live16_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19a, 4)]);
                                            }
                                            GLF_dead8h_r = 0.0;
                                            donor_replacementGLF_dead19beta = 0.0;
                                        }
                                    }
                                }
                                {
                                    vec2 GLF_live13a = _GLF_FUZZED(vec3(7.7, 5.8, 8.9).rb);
                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                        float donor_replacementGLF_dead18y = _GLF_FUZZED(clamp(GLF_live11one, 5119.3918, GLF_dead8s_g));
                                        {
                                            GLF_dead8h_r = 1.0;
                                            donor_replacementGLF_dead18y = 1.0;
                                        }
                                    }
                                    float GLF_live13z = _GLF_FUZZED(((-58.05) + 0.1));
                                    {
                                        GLF_live13z = GLF_live13a.x / GLF_live13a.y;
                                        {
                                            if (_GLF_DEAD(false)) {
                                                int donor_replacementGLF_dead21i = _GLF_FUZZED(GLF_live1j);
                                                {
                                                    GLF_dead21data[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead21i, 10)] = GLF_dead21temp[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead21i, 10)];
                                                }
                                            }
                                            int GLF_live17i = _GLF_FUZZED(47264);
                                            int GLF_live17looplimiter0 = 0;
                                            vec2 GLF_live17pos = _GLF_FUZZED(vec2((-6.5)));
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                {
                                                    GLF_dead21data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live1j, 10)] = GLF_dead21temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live1j, 10)];
                                                }
                                            }
                                            vec4 GLF_live17res = _GLF_FUZZED(vec4(-611.442, -5.3, 4235.3846, 110.460));
                                            for (GLF_live17i = 0; GLF_live17i < 8; GLF_live17i++) {
                                                if (GLF_live17looplimiter0 >= 5) {
                                                    break;
                                                }
                                                GLF_live17looplimiter0++;
                                                {
                                                    if (GLF_live17collision(GLF_live17pos, GLF_live17picdata[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17i, 8)])) {
                                                        GLF_live17res = GLF_live17pal[_GLF_MAKE_IN_BOUNDS_INT((int(GLF_live17picdata[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17i, 8)].x) * int(GLF_live17picdata[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17i, 8)].y) + GLF_live17i * 9 + 11) % 16, 16)];
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        color = fract(sin(vecCoor.yx - trunc(float(data[4]))));
                        if (_GLF_DEAD(false)) {
                            vec2 donor_replacementGLF_dead5uv = _GLF_FUZZED(floor(color));
                            {
                                float GLF_dead5stripe = GLF_dead5compute_stripe(cos((donor_replacementGLF_dead5uv.x + donor_replacementGLF_dead5uv.y) * 20.0), donor_replacementGLF_dead5uv.x + donor_replacementGLF_dead5uv.y);
                                {
                                    {
                                        if (_GLF_DEAD(false)) {
                                            int donor_replacementGLF_dead21j = _GLF_FUZZED(87799);
                                            int donor_replacementGLF_dead21mid = _GLF_FUZZED((-i));
                                            while (i <= donor_replacementGLF_dead21mid && donor_replacementGLF_dead21j <= i) {
                                                if (GLF_dead21data[_GLF_MAKE_IN_BOUNDS_INT(i, 10)] < GLF_dead21data[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead21j, 10)]) {
                                                    GLF_dead21temp[_GLF_MAKE_IN_BOUNDS_INT(i++, 10)] = GLF_dead21data[_GLF_MAKE_IN_BOUNDS_INT(i++, 10)];
                                                } else {
                                                    GLF_dead21temp[_GLF_MAKE_IN_BOUNDS_INT(i++, 10)] = GLF_dead21data[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead21j++, 10)];
                                                }
                                            }
                                        }
                                        ;
                                    }
                                    {
                                        int GLF_live14looplimiter2 = 0;
                                        if (GLF_live14looplimiter2 >= 4) {
                                            ;
                                        }
                                    }
                                }
                                vecCoor = mix(vec3(donor_replacementGLF_dead5uv.x, 0, 0.75), vec3(.8, .7, donor_replacementGLF_dead5uv.x), GLF_dead5stripe);
                                GLF_dead5_GLF_color = vec4(vecCoor, 1.0);
                                {
                                    int GLF_live16directions = _GLF_FUZZED(ivec4(-46989, 4936, -58494, 55376).b);
                                    ivec2 GLF_live16p = _GLF_FUZZED(((ivec2(-69816, 58424) & (-13246)) ^ 75677));
                                    if (GLF_live16p.y < 14 && GLF_live16map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live16p.x) + (GLF_live16p.y + 2) * 16, 256)] == 0) {
                                        GLF_live16directions += 1;
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                            _GLF_color = _GLF_color;
                                            if (_GLF_DEAD(false)) {
                                                float donor_replacementGLF_dead18c_im = _GLF_FUZZED((-mix(GLF_dead5stripe, GLF_live11one, false)));
                                                int donor_replacementGLF_dead18iteration = _GLF_FUZZED(i);
                                                int donor_replacementGLF_dead18k = _GLF_FUZZED((GLF_live16directions * ivec4(-90598, 29254, -33523, 45873)[0]));
                                                do {
                                                    if (GLF_dead8h_r * GLF_dead8h_r + GLF_dead5stripe * GLF_dead5stripe > 4.0) {
                                                        break;
                                                    }
                                                    float GLF_dead18x_new = GLF_dead8h_r * GLF_dead8h_r - GLF_dead5stripe * GLF_dead5stripe + GLF_dead5stripe;
                                                    GLF_dead5stripe = 2.0 * GLF_dead8h_r * GLF_dead5stripe + donor_replacementGLF_dead18c_im;
                                                    GLF_dead8h_r = GLF_dead18x_new;
                                                    donor_replacementGLF_dead18iteration++;
                                                    donor_replacementGLF_dead18k++;
                                                } while (donor_replacementGLF_dead18k < bitfieldInsert(GLF_live16directions + (257.0 > GLF_dead18resolution.y ? 1 : 0), 0, 0, 0));
                                            }
                                        }
                                    }
                                }
                                return;
                            }
                        }
                        color[1] += asinh(gl_FragCoord.y * ldexp(color.y, -i));
                        if (_GLF_DEAD(false)) {
                            for (int GLF_dead21i = i; GLF_dead21i < i; GLF_dead21i += 2 * i) {
                                int GLF_dead21from = GLF_dead21i;
                                int GLF_dead21mid = GLF_dead21i + i - 1;
                                int GLF_dead21to = min(GLF_dead21i + 2 * i - 1, i);
                                GLF_dead21merge(GLF_dead21from, GLF_dead21mid, GLF_dead21to);
                            }
                        }
                        if (_GLF_DEAD(false)) {
                            _GLF_color = (matrixCompMult(mat4(GLF_dead8h_r), GLF_live11m44) * GLF_live0gl_FragCoord);
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            bool donor_replacementGLF_dead5c1 = _GLF_FUZZED((mat2x3(9.5, -85.44, -562.506, -9.6, -73.67, -46.88) != mat2x3(8.9, -19.05, -238.639, -2603.8074, -7883.2821, 2.0)));
                            bool donor_replacementGLF_dead5c2 = _GLF_FUZZED(all(bvec2(false, true)));
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                float donor_replacementGLF_dead18x = _GLF_FUZZED(-4.5);
                                {
                                    donor_replacementGLF_dead18x = 1.0;
                                    GLF_dead8b_b = 1.0;
                                }
                            }
                            bool donor_replacementGLF_dead5c3 = _GLF_FUZZED((mat3x2(-8.1, -2.5, 1969.0289, -1106.0293, 88.75, 3.7) != mat3x2(-5.8, -287.246, 92.33, -184.576, 2634.1510, 4.7)));
                            vec2 donor_replacementGLF_dead5uv = _GLF_FUZZED(vec2(-7.0, 4088.2925));
                            if (!donor_replacementGLF_dead5c1 && !donor_replacementGLF_dead5c2 && donor_replacementGLF_dead5c3) {
                                float GLF_dead5stripe = GLF_dead5compute_stripe(cos((donor_replacementGLF_dead5uv.x + donor_replacementGLF_dead5uv.y) * 20.0), donor_replacementGLF_dead5uv.x + donor_replacementGLF_dead5uv.y);
                                vecCoor = mix(vec3(.7, sinh(donor_replacementGLF_dead5uv.x), donor_replacementGLF_dead5uv.x), vec3(.3, .5, donor_replacementGLF_dead5uv.x), GLF_dead5stripe);
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    {
                                        if (_GLF_DEAD(false)) {
                                            _GLF_color = dFdyCoarse(_GLF_color);
                                        }
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                            {
                                                GLF_dead21temp[_GLF_MAKE_IN_BOUNDS_INT(i, 10)] = GLF_dead21data[_GLF_MAKE_IN_BOUNDS_INT(i, 10)];
                                            }
                                        }
                                        if (_GLF_DEAD(false)) {
                                            _GLF_color = GLF_live16_GLF_color;
                                        }
                                        {
                                            {
                                                ;
                                            }
                                            if (_GLF_DEAD(false)) {
                                                _GLF_color = GLF_dead5_GLF_color;
                                            }
                                        }
                                        ;
                                    }
                                }
                                GLF_dead5_GLF_color = vec4(vecCoor, 1.0);
                                return;
                            }
                        }
                        break;
                    } else {
                        if (_GLF_DEAD(false)) {
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                {
                                    if (int(GLF_dead21gl_FragCoord[1]) < 240) {
                                        GLF_dead8h_r = 0.5 + float(GLF_dead21data[7]) / 10.0;
                                    } else {
                                        if (int(GLF_dead21gl_FragCoord[1]) < 270) {
                                            GLF_dead8h_r = 0.5 + float(GLF_dead21data[8]) / 10.0;
                                        } else {
                                            discard;
                                        }
                                    }
                                }
                            }
                            bool donor_replacementGLF_dead5c1 = _GLF_FUZZED(true);
                            if (_GLF_DEAD(false)) {
                                bool donor_replacementGLF_dead8c3 = _GLF_FUZZED(donor_replacementGLF_dead5c1);
                                {
                                    {
                                        ;
                                    }
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = (_GLF_color * (+GLF_dead8h_r));
                                    }
                                }
                                if (!donor_replacementGLF_dead8c3) {
                                    ;
                                }
                            }
                            vec2 donor_replacementGLF_dead5uv = _GLF_FUZZED(resolution);
                            if (_GLF_DEAD(false)) {
                                _GLF_color = GLF_live0gl_FragCoord;
                            }
                            if (donor_replacementGLF_dead5c1) {
                                float GLF_dead5stripe = GLF_dead5compute_stripe(cos((donor_replacementGLF_dead5uv.x + donor_replacementGLF_dead5uv.y) * 20.0), donor_replacementGLF_dead5uv.x + donor_replacementGLF_dead5uv.y);
                                vecCoor = mix(vec3(donor_replacementGLF_dead5uv.x, 0, 0.75), vec3(.8, .7, donor_replacementGLF_dead5uv.x), GLF_dead5stripe);
                                if (_GLF_DEAD(false)) {
                                    float donor_replacementGLF_dead19alpha3 = _GLF_FUZZED(float(82901u));
                                    vec4 donor_replacementGLF_dead19matrix_b = _GLF_FUZZED(GLF_live16_GLF_color);
                                    vec4 donor_replacementGLF_dead19matrix_u = _GLF_FUZZED(GLF_live0gl_FragCoord);
                                    for (int GLF_dead19b = GLF_dead19MATRIX_N - 1; GLF_dead19b >= i; GLF_dead19b--) {
                                        donor_replacementGLF_dead19alpha3 += donor_replacementGLF_dead19matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19b, 4)] * donor_replacementGLF_dead19matrix_b[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19b, 4)];
                                    }
                                }
                                if (_GLF_DEAD(false)) {
                                    int donor_replacementGLF_dead9i = _GLF_FUZZED(((+i) % i));
                                    float donor_replacementGLF_dead9ref = _GLF_FUZZED(-425.909);
                                    float donor_replacementGLF_dead9s = _GLF_FUZZED(tanh(GLF_dead5stripe));
                                    if (mod(float(donor_replacementGLF_dead9i), donor_replacementGLF_dead9ref) <= 0.01) {
                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                float donor_replacementGLF_dead21grey = _GLF_FUZZED(GLF_dead8s_g);
                                                {
                                                    if (int(GLF_dead21gl_FragCoord[1]) < 210) {
                                                        donor_replacementGLF_dead21grey = 0.5 + float(GLF_dead21data[6]) / 10.0;
                                                    } else {
                                                        if (int(GLF_dead21gl_FragCoord[1]) < 240) {
                                                            donor_replacementGLF_dead21grey = 0.5 + float(GLF_dead21data[7]) / 10.0;
                                                        } else {
                                                            if (int(GLF_dead21gl_FragCoord[1]) < 270) {
                                                                donor_replacementGLF_dead21grey = 0.5 + float(GLF_dead21data[8]) / 10.0;
                                                            } else {
                                                                discard;
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                            _GLF_color = sign(_GLF_color);
                                        }
                                        donor_replacementGLF_dead9s += 0.2;
                                    }
                                }
                                GLF_dead5_GLF_color = vec4(vecCoor, 1.0);
                                return;
                                if (_GLF_DEAD(false)) {
                                    for (int GLF_dead9i = 0; GLF_dead9i < 3; GLF_dead9i++) {
                                        if (GLF_dead5_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead9i, 4)] >= 1.0) {
                                            GLF_dead5_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead9i, 4)] = GLF_dead5_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead9i, 4)] * GLF_dead5_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead9i, 4)];
                                        }
                                    }
                                }
                            }
                        }
                        if (_GLF_DEAD(false)) {
                            _GLF_color = mod(_GLF_color, vec4(2.1, -2.6, 5085.9595, 1.8));
                            {
                                int GLF_live11looplimiter0 = 0;
                                if (GLF_live11looplimiter0 >= 5) {
                                    ;
                                }
                            }
                        }
                        if (int(gl_FragCoord[1]) < 210) {
                            color = fract(sin(vecCoor.yx - trunc(float(data[5]))));
                            if (_GLF_DEAD(false)) {
                                {
                                    GLF_dead8b_b = 0.5 + float(GLF_dead21data[7]) / 10.0;
                                }
                            }
                            color.y -= tanh(color.x) / cosh(color.y);
                            break;
                        } else if (int(gl_FragCoord[1]) < 240) {
                            color = fract(asinh(vecCoor.yx - trunc(float(data[6]))));
                            color.y -= isnan(float(i)) ? tanh(gl_FragCoord.x) : atanh(gl_FragCoord.y / resolution.y);
                            break;
                            if (_GLF_DEAD(false)) {
                                int donor_replacementGLF_dead19a = _GLF_FUZZED(bitfieldReverse(i));
                                float donor_replacementGLF_dead19alpha3 = _GLF_FUZZED(GLF_live11one);
                                mat4 donor_replacementGLF_dead19matrix_a = _GLF_FUZZED(mat4(-499.536, -599.145, -3.0, -1.8, 74.51, 3.7, 745.652, -9.8, 2.4, 7.0, 414.642, 0.4, 5.1, 21.36, -21.52, 9331.4166));
                                vec4 donor_replacementGLF_dead19matrix_u = _GLF_FUZZED(GLF_live0gl_FragCoord);
                                {
                                    donor_replacementGLF_dead19alpha3 += donor_replacementGLF_dead19matrix_u[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead19a, 4)] * donor_replacementGLF_dead19matrix_a[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead19a, 4)][_GLF_MAKE_IN_BOUNDS_INT(i, 4)];
                                }
                            }
                            if (_GLF_DEAD(false)) {
                                _GLF_color = (vec4(-3999.0085, 3.1, 1.6, 7.9) * GLF_live11m44);
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                uint donor_replacementGLF_dead6matrix_number = _GLF_FUZZED((~107763u));
                                int donor_replacementGLF_dead6rows = _GLF_FUZZED(((-91246) / ivec2(2143, 47370)).s);
                                {
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                        vec4 donor_replacementGLF_dead19matrix_b = _GLF_FUZZED(atan(vec4(-582.942, 487.098, -1.3, 8.3)));
                                        for (int GLF_dead19i = (GLF_dead19MATRIX_N - 1); GLF_dead19i >= 0; GLF_dead19i--) {
                                            for (int GLF_dead19j = (GLF_dead19MATRIX_N - 1); GLF_dead19j >= (GLF_dead19i + 1); GLF_dead19j--) {
                                                donor_replacementGLF_dead19matrix_b[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19i, 4)] -= (GLF_dead6m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19i, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19j, 4)] * donor_replacementGLF_dead19matrix_b[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19j, 4)]);
                                            }
                                            donor_replacementGLF_dead19matrix_b[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19i, 4)] /= GLF_dead6m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19i, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19i, 4)];
                                        }
                                    }
                                    for (int GLF_dead6c = 0; GLF_dead6c < i; GLF_dead6c++) {
                                        for (int GLF_dead6r = 0; GLF_dead6r < donor_replacementGLF_dead6rows; GLF_dead6r++) {
                                            if (_GLF_DEAD(_GLF_IDENTITY(false, _GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)) || (false)))) {
                                                _GLF_color = vec4(-95.99, 5.2, 3.3, 54.87);
                                            }
                                            switch (donor_replacementGLF_dead6matrix_number) {
                                                case 0u:
                                                    GLF_dead6m22[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6r, 2)] = GLF_dead6one;
                                                    break;
                                                case 1u:
                                                    GLF_dead6m23[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6r, 3)] = GLF_dead6one;
                                                    break;
                                                    if (_GLF_DEAD(false)) {
                                                        _GLF_color = acosh(_GLF_color);
                                                    }
                                                case 2u:
                                                    if (_GLF_DEAD(false)) {
                                                        vec4 donor_replacementGLF_dead9c = _GLF_FUZZED(_GLF_color);
                                                        if (donor_replacementGLF_dead9c[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6c, 4)] >= 1.0) {
                                                            donor_replacementGLF_dead9c[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6c, 4)] = donor_replacementGLF_dead9c[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6c, 4)] * donor_replacementGLF_dead9c[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6c, 4)];
                                                        }
                                                    }
                                                    GLF_dead6m24[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6c, 2)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6r, 4)] = GLF_dead6one;
                                                    break;
                                                    if (_GLF_DEAD(false)) {
                                                        _GLF_color = vec4(-6.2, -481.082, -7133.1099, 28.17);
                                                    }
                                                case 3u:
                                                    if (_GLF_DEAD(false)) {
                                                        int donor_replacementGLF_dead19k = _GLF_FUZZED(mix(ivec3(-44971, 42526, 43659), floatBitsToInt(vec3(32.90, -61.96, -2147.7544)), bvec3(false, true, false)).r);
                                                        vec4 donor_replacementGLF_dead19matrix_u = _GLF_FUZZED(vec4(-8095.8860, -7326.2436, 7.2, 9.3));
                                                        for (int GLF_dead19u = GLF_dead19MATRIX_N - 1; GLF_dead19u >= donor_replacementGLF_dead19k; GLF_dead19u--) {
                                                            GLF_dead8b_b += donor_replacementGLF_dead19matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19u, 4)] * donor_replacementGLF_dead19matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19u, 4)];
                                                        }
                                                    }
                                                    GLF_dead6m32[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6r, 2)] = GLF_dead6one;
                                                    break;
                                                case 4u:
                                                    GLF_dead6m33[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6r, 3)] = GLF_dead6one;
                                                    break;
                                                case 5u:
                                                    if (_GLF_DEAD(false)) {
                                                        {
                                                            GLF_dead8b_b = 0.5 + float(GLF_dead21data[1]) / 10.0;
                                                        }
                                                    }
                                                    GLF_dead6m34[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6c, 3)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6r, 4)] = GLF_dead6one;
                                                    break;
                                                case 6u:
                                                    GLF_dead6m42[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6r, 2)] = GLF_dead6one;
                                                    break;
                                                    if (_GLF_DEAD(false)) {
                                                        bool donor_replacementGLF_dead8c8 = _GLF_FUZZED((GLF_live0gl_FragCoord == vec4(8.1, 572.657, -107.663, 8889.6217)));
                                                        vec2 donor_replacementGLF_dead8pos = _GLF_FUZZED((resolution * mat2(mat2x3(768.636, -3.7, 3.3, 2.0, 649.019, -3.6))));
                                                        if (!donor_replacementGLF_dead8c8) {
                                                            ;
                                                        }
                                                    }
                                                    {
                                                        if (_GLF_DEAD(false)) {
                                                            _GLF_color = GLF_live0gl_FragCoord;
                                                        }
                                                        if (_GLF_DEAD(false)) {
                                                            int donor_replacementGLF_dead21j = _GLF_FUZZED((i ^ (donor_replacementGLF_dead6rows / GLF_dead6c)));
                                                            if (GLF_dead21data[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6r, 10)] < GLF_dead21data[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead21j, 10)]) {
                                                                GLF_dead21temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6c++, 10)] = GLF_dead21data[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6r++, 10)];
                                                            } else {
                                                                GLF_dead21temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6c++, 10)] = GLF_dead21data[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead21j++, 10)];
                                                            }
                                                        }
                                                        int GLF_live16i = _GLF_FUZZED(-1222);
                                                        int GLF_live16looplimiter0 = 0;
                                                        {
                                                            if (GLF_live16looplimiter0 >= 7) {
                                                                ;
                                                            }
                                                            GLF_live16looplimiter0++;
                                                            {
                                                                GLF_live16map[_GLF_MAKE_IN_BOUNDS_INT(GLF_live16i, 256)] = 0;
                                                            }
                                                        }
                                                        if (_GLF_DEAD(false)) {
                                                            if (i < int(GLF_dead20gl_FragCoord.x)) {
                                                                break;
                                                            }
                                                        }
                                                    }
                                                case 7u:
                                                    GLF_dead6m43[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6r, 3)] = GLF_dead6one;
                                                    if (_GLF_DEAD(false)) {
                                                        _GLF_color = (bool(GLF_dead8s_g) ? GLF_dead5_GLF_color : GLF_live0gl_FragCoord);
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < determinant(mat4(determinant(mat2(0.0, 1.0, 0.0, 0.0)), 0.0, 0.0, 0.0, 1.0, 0.0, length(vec2(0.0, 0.0)), 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 1.0, 0.0)))))) {
                                                            float donor_replacementGLF_dead18c_im = _GLF_FUZZED(GLF_dead8s_g);
                                                            float donor_replacementGLF_dead18c_re = _GLF_FUZZED(vec3(-4.5, -24.59, -1.4)[0]);
                                                            int donor_replacementGLF_dead18iteration = _GLF_FUZZED(((-80603) | bitCount(clamp(donor_replacementGLF_dead6rows, 31993, GLF_dead6r))));
                                                            float donor_replacementGLF_dead18y = _GLF_FUZZED(float(false));
                                                            do {
                                                                if (GLF_dead8b_b * GLF_dead8b_b + donor_replacementGLF_dead18y * donor_replacementGLF_dead18y > 4.0) {
                                                                    break;
                                                                }
                                                                float GLF_dead18x_new = GLF_dead8b_b * GLF_dead8b_b - donor_replacementGLF_dead18y * donor_replacementGLF_dead18y + donor_replacementGLF_dead18c_re;
                                                                donor_replacementGLF_dead18y = 2.0 * GLF_dead8b_b * donor_replacementGLF_dead18y + donor_replacementGLF_dead18c_im;
                                                                GLF_dead8b_b = GLF_dead18x_new;
                                                                donor_replacementGLF_dead18iteration++;
                                                                i++;
                                                            } while (i < bitfieldInsert(donor_replacementGLF_dead6rows + (257.0 > GLF_dead18resolution.y ? 1 : 0), 0, 0, 0));
                                                        }
                                                    }
                                                    break;
                                                    if (_GLF_DEAD(false)) {
                                                        _GLF_color = _GLF_color;
                                                    }
                                                case 8u:
                                                    GLF_dead6m44[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6c, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6r, 4)] = GLF_dead6one;
                                                    break;
                                                    {
                                                        int GLF_live17i = _GLF_FUZZED(int(112092u));
                                                        if (_GLF_DEAD(false)) {
                                                            float donor_replacementGLF_dead18xCoord = _GLF_FUZZED(GLF_live11one);
                                                            float donor_replacementGLF_dead18yCoord = _GLF_FUZZED(467.275);
                                                            {
                                                                ;
                                                            }
                                                        }
                                                        vec2 GLF_live17pos = _GLF_FUZZED(vec2(-897.432, -19.19));
                                                        if (_GLF_DEAD(false)) {
                                                            int donor_replacementGLF_dead18iteration = _GLF_FUZZED(GLF_dead6r);
                                                            {
                                                                ;
                                                            }
                                                        }
                                                        vec4 GLF_live17res = _GLF_FUZZED(vec4(144.670, -2.8, -2575.7881, 961.030));
                                                        {
                                                            if (_GLF_DEAD(_GLF_IDENTITY(false, bool(bvec3(false, false, true))))) {
                                                                float donor_replacementGLF_dead18c_re = _GLF_FUZZED(vec3(-33.69, 89.31, -82.38).s);
                                                                int donor_replacementGLF_dead18iteration = _GLF_FUZZED(int(ldexp(GLF_dead6one, -98972)));
                                                                int donor_replacementGLF_dead18k = _GLF_FUZZED(ivec2(80965, 99156).r);
                                                                float donor_replacementGLF_dead18x = _GLF_FUZZED(GLF_dead8s_g);
                                                                float donor_replacementGLF_dead18y = _GLF_FUZZED(GLF_dead8s_g);
                                                                do {
                                                                    if (donor_replacementGLF_dead18x * donor_replacementGLF_dead18x + donor_replacementGLF_dead18y * donor_replacementGLF_dead18y > 4.0) {
                                                                        break;
                                                                    }
                                                                    float GLF_dead18x_new = donor_replacementGLF_dead18x * donor_replacementGLF_dead18x - donor_replacementGLF_dead18y * donor_replacementGLF_dead18y + donor_replacementGLF_dead18c_re;
                                                                    donor_replacementGLF_dead18y = 2.0 * donor_replacementGLF_dead18x * donor_replacementGLF_dead18y + GLF_dead8b_b;
                                                                    donor_replacementGLF_dead18x = GLF_dead18x_new;
                                                                    donor_replacementGLF_dead18iteration++;
                                                                    donor_replacementGLF_dead18k++;
                                                                } while (donor_replacementGLF_dead18k < bitfieldInsert(GLF_live17i + (257.0 > GLF_dead18resolution.y ? 1 : 0), 0, 0, 0));
                                                            }
                                                            if (GLF_live17collision(GLF_live17pos, GLF_live17picdata[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17i, 8)])) {
                                                                GLF_live17res = GLF_live17pal[_GLF_MAKE_IN_BOUNDS_INT((int(GLF_live17picdata[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17i, 8)].x) * int(GLF_live17picdata[_GLF_MAKE_IN_BOUNDS_INT(GLF_live17i, 8)].y) + GLF_live17i * 9 + 11) % 16, 16)];
                                                            }
                                                        }
                                                    }
                                            }
                                        }
                                    }
                                    donor_replacementGLF_dead6matrix_number = donor_replacementGLF_dead6matrix_number + 1u;
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                        {
                                            break;
                                        }
                                    }
                                }
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = GLF_live0gl_FragCoord;
                                }
                            }
                        } else {
                            if (_GLF_DEAD(false)) {
                                _GLF_color = (max(GLF_dead5_GLF_color, GLF_live0gl_FragCoord) * GLF_dead6m44);
                            }
                            if (int(gl_FragCoord[1]) < 270) {
                                color = fract(sin(vecCoor.yx - trunc(float(data[7]))));
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = vec4(-5.3, 2.6, -96.27, -7.1);
                                }
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                    int donor_replacementGLF_dead18iteration = _GLF_FUZZED(N);
                                    int donor_replacementGLF_dead18iterationCap = _GLF_FUZZED(-49785);
                                    float donor_replacementGLF_dead18yCoord = _GLF_FUZZED((GLF_dead6m22, distance(vec3(607.541, -389.275, -9.1), vec3(-9.5, -7416.2623, -1.4))));
                                    if (donor_replacementGLF_dead18iteration < bitfieldInsert(donor_replacementGLF_dead18iterationCap, 0, 0, 0)) {
                                        ;
                                    } else {
                                        ;
                                    }
                                }
                                color.y *= mix(normalize(vecCoor), normalize(vec3(color, degrees(color.x))), injectionSwitch.x).y;
                                break;
                            } else {
                                discard;
                            }
                        }
                    }
                }
            }
        }
    } while (0 == int(injectionSwitch.x));
    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
        if (_GLF_DEAD(false)) {
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                {
                    if (int(GLF_dead21gl_FragCoord[1]) < 90) {
                        GLF_dead8b_b = 0.5 + float(GLF_dead21data[2]) / 10.0;
                    } else {
                        if (int(GLF_dead21gl_FragCoord[1]) < 120) {
                            GLF_dead8b_b = 0.5 + float(GLF_dead21data[3]) / 10.0;
                        } else {
                            if (int(GLF_dead21gl_FragCoord[1]) < 150) {
                                discard;
                            } else {
                                if (int(GLF_dead21gl_FragCoord[1]) < 180) {
                                    GLF_dead8b_b = 0.5 + float(GLF_dead21data[5]) / 10.0;
                                } else {
                                    if (int(GLF_dead21gl_FragCoord[1]) < 210) {
                                        GLF_dead8b_b = 0.5 + float(GLF_dead21data[6]) / 10.0;
                                    } else {
                                        if (int(GLF_dead21gl_FragCoord[1]) < 240) {
                                            GLF_dead8b_b = 0.5 + float(GLF_dead21data[7]) / 10.0;
                                        } else {
                                            if (int(GLF_dead21gl_FragCoord[1]) < 270) {
                                                GLF_dead8b_b = 0.5 + float(GLF_dead21data[8]) / 10.0;
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
            }
            _GLF_color = min(sqrt(_GLF_color), vec4(85.23, 78.06, -4.9, 9.8));
        }
        {
            float GLF_dead5stripe = GLF_dead5compute_stripe(tan((color.x + color.y) * 20.0), color.x + color.y);
            vecCoor = mix(vec3(0.5, color.x, 0.1), vec3(.4, 0, .5), GLF_dead5stripe);
            GLF_dead5_GLF_color = vec4(vecCoor, 1.0);
            return;
        }
    }
    _GLF_color = vec4(vec3(color, trunc(injectionSwitch.y)), injectionSwitch.y);
    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
        if (_GLF_DEAD(false)) {
            float donor_replacementGLF_dead19alpha2 = _GLF_FUZZED(sin(GLF_dead8h_r));
            mat4 donor_replacementGLF_dead19matrix_a = _GLF_FUZZED(matrixCompMult((true ? GLF_live11m44 : mat4(6.0, -0.3, 44.08, -91.14, 5.6, 4.3, -84.45, -31.49, -51.82, -884.547, -3.7, 1.4, 38.74, -4.9, 93.48, -9697.5203)), mat4(77.99, 34.87, -62.82, 2421.9959, -4.3, 63.98, -7785.5495, 610.680, -44.96, -5.5, 92.25, 1988.4200, 39.70, -64.30, -219.258, -34.35)));
            vec4 donor_replacementGLF_dead19matrix_u = _GLF_FUZZED(GLF_live16_GLF_color);
            for (int GLF_dead19k = 0; GLF_dead19k < GLF_dead19MATRIX_N - 1; GLF_dead19k++) {
                for (int GLF_dead19x = GLF_dead19MATRIX_N - 1; GLF_dead19x >= GLF_dead19k; GLF_dead19x--) {
                    GLF_dead8b_b += donor_replacementGLF_dead19matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19x, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19k, 4)] * donor_replacementGLF_dead19matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19x, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19k, 4)];
                    donor_replacementGLF_dead19matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19x, 4)] = donor_replacementGLF_dead19matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19x, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19k, 4)];
                }
                GLF_dead8b_b = sqrt(GLF_dead8b_b);
                donor_replacementGLF_dead19matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19k, 4)] -= (sign(donor_replacementGLF_dead19matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19k, 4)]) * GLF_dead8b_b);
                for (int GLF_dead19u = GLF_dead19MATRIX_N - 1; GLF_dead19u >= GLF_dead19k; GLF_dead19u--) {
                    GLF_dead8b_b += donor_replacementGLF_dead19matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19u, 4)] * donor_replacementGLF_dead19matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19u, 4)];
                }
                donor_replacementGLF_dead19alpha2 = 2.0 / GLF_dead8b_b;
                for (int GLF_dead19j = GLF_dead19k; GLF_dead19j < GLF_dead19MATRIX_N; GLF_dead19j++) {
                    for (int GLF_dead19a = GLF_dead19MATRIX_N - 1; GLF_dead19a >= GLF_dead19k; GLF_dead19a--) {
                        GLF_dead8s_g += donor_replacementGLF_dead19matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19a, 4)] * donor_replacementGLF_dead19matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19a, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19j, 4)];
                    }
                    GLF_dead8b_b = donor_replacementGLF_dead19alpha2 * GLF_dead8s_g;
                    for (int GLF_dead19a = GLF_dead19MATRIX_N - 1; GLF_dead19a >= GLF_dead19k; GLF_dead19a--) {
                        donor_replacementGLF_dead19matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19a, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19j, 4)] = donor_replacementGLF_dead19matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19a, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19j, 4)] - (GLF_dead8b_b * donor_replacementGLF_dead19matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19a, 4)]);
                    }
                    GLF_dead8s_g = 0.0;
                    GLF_dead8b_b = 0.0;
                }
                for (int GLF_dead19b = GLF_dead19MATRIX_N - 1; GLF_dead19b >= GLF_dead19k; GLF_dead19b--) {
                    GLF_dead8s_g += donor_replacementGLF_dead19matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19b, 4)] * GLF_live0gl_FragCoord[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19b, 4)];
                }
                GLF_dead8b_b = donor_replacementGLF_dead19alpha2 * GLF_dead8s_g;
                for (int GLF_dead19b = GLF_dead19MATRIX_N - 1; GLF_dead19b >= GLF_dead19k; GLF_dead19b--) {
                    GLF_live0gl_FragCoord[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19b, 4)] = GLF_live0gl_FragCoord[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19b, 4)] - (GLF_dead8b_b * donor_replacementGLF_dead19matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead19b, 4)]);
                }
                GLF_dead8b_b = 0.0;
                GLF_dead8b_b = 0.0;
                donor_replacementGLF_dead19alpha2 = 0.0;
                GLF_dead8s_g = 0.0;
                GLF_dead8b_b = 0.0;
            }
        }
        _GLF_color = (+GLF_live0gl_FragCoord);
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            int donor_replacementGLF_dead19a = _GLF_FUZZED(int(true));
            float donor_replacementGLF_dead19alpha3 = _GLF_FUZZED(GLF_dead8b_b);
            {
                donor_replacementGLF_dead19alpha3 += GLF_live0gl_FragCoord[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead19a, 4)] * GLF_live11m44[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead19a, 4)][_GLF_MAKE_IN_BOUNDS_INT(i, 4)];
            }
        }
    }
}
