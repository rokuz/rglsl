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
vec4 GLF_live25gl_FragCoord = _GLF_FUZZED(vec4(-374.947, -18.82, -11.91, -25.60));

layout(set = 0, binding = 1) uniform buf1 {
    vec2 GLF_live25injectionSwitch;
};

layout(set = 0, binding = 2) uniform buf2 {
    vec2 GLF_live24injectionSwitch;
};

struct GLF_live24QuicksortObject {
    int numbers[10];
};

GLF_live24QuicksortObject GLF_live24obj = GLF_live24QuicksortObject(int[10](0, 0, 0, 0, 0, 0, 0, 0, 0, 0));

void GLF_live24swap(int GLF_live24i, int GLF_live24j) {
    int GLF_live24temp = GLF_live24obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_live24i, 10)];
    GLF_live24obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_live24i, 10)] = GLF_live24obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_live24j, 10)];
    GLF_live24obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_live24j, 10)] = GLF_live24temp;
}

vec3 GLF_live24palette(vec3 GLF_live24a, vec3 GLF_live24b, vec3 GLF_live24c, vec3 GLF_live24d) {
    return fract(mix(GLF_live24d * GLF_live24a, GLF_live24a * GLF_live24c, GLF_live24b + GLF_live24d - GLF_live24c));
}

layout(set = 0, binding = 3) uniform buf3 {
    float GLF_live26time;
};

layout(set = 0, binding = 4) uniform buf4 {
    vec2 GLF_live26resolution;
};

float GLF_live26h_r = _GLF_FUZZED(447.186);
float GLF_live26s_g = _GLF_FUZZED(vec2(-86.03, 6.5).t);
float GLF_live26b_b = _GLF_FUZZED(float((ivec4(67623, -19075, 81916, -47869) != ivec4(18593, 44948, -54980, -3736))));

void GLF_live26doConvert() {
    int GLF_live26msb8 = 256;
    vec3 GLF_live26temp = _GLF_FUZZED(vec3(-6.4, 7.1, -1715.1714));
    GLF_live26temp = GLF_live26b_b * (float(bitCount(GLF_live26msb8)) - GLF_live26s_g) + (GLF_live26b_b - GLF_live26b_b * (float(bitCount(GLF_live26msb8)) - GLF_live26s_g)) * clamp(abs(abs(6.0 * (GLF_live26h_r - vec3(bitfieldReverse(0), bitCount(GLF_live26msb8), 2) / 3.0)) - 3.0) - float(bitCount(GLF_live26msb8)), float(bitfieldExtract(int(GLF_live26resolution.x), 0, 1)), float(bitCount(int(GLF_live26resolution.x))));
    GLF_live26h_r = GLF_live26temp.x;
    GLF_live26s_g = GLF_live26temp.y;
    GLF_live26b_b = GLF_live26temp.z;
}

vec3 GLF_live26computeColor(float GLF_live26c, vec2 GLF_live26position) {
    int GLF_live26msb8 = 256;
    GLF_live26h_r = fract(GLF_live26c);
    GLF_live26s_g = float(bitCount(GLF_live26msb8));
    GLF_live26b_b = (0.5 + (sin(GLF_live26time) * 0.5 + 0.5));
    GLF_live26doConvert();
    GLF_live26s_g *= float(bitCount(GLF_live26msb8)) / GLF_live26position.y;
    GLF_live26h_r *= float(bitCount(GLF_live26msb8)) / GLF_live26position.x;
    if (abs(GLF_live26position.y - GLF_live26position.x) < 0.5) {
        GLF_live26b_b = clamp(GLF_live26b_b * float(bitCount(GLF_live26msb8)) * 3.0, float(bitfieldExtract(int(GLF_live26resolution.x), 0, 1)), float(bitCount(GLF_live26msb8)));
    }
    return vec3(GLF_live26h_r, GLF_live26s_g, GLF_live26b_b);
}

vec3 GLF_live26defaultColor() {
    return vec3(float(bitfieldExtract(int(GLF_live26resolution.y), 0, 1)));
}

vec3 GLF_live26drawShape(vec2 GLF_live26pos, vec2 GLF_live26square, vec3 GLF_live26setting) {
    int GLF_live26msb8 = 256;
    bool GLF_live26c1 = GLF_live26pos.x - GLF_live26setting.x < GLF_live26square.x;
    if (!GLF_live26c1) {
        return GLF_live26defaultColor();
    }
    bool GLF_live26c2 = GLF_live26pos.x + GLF_live26setting.x > GLF_live26square.x;
    if (!GLF_live26c2) {
        return GLF_live26defaultColor();
    }
    bool GLF_live26c3 = GLF_live26pos.y - GLF_live26setting.x < GLF_live26square.y;
    if (!GLF_live26c3) {
        return GLF_live26defaultColor();
    }
    bool GLF_live26c4 = GLF_live26pos.y + GLF_live26setting.x > GLF_live26square.y;
    if (!GLF_live26c4) {
        return GLF_live26defaultColor();
    }
    bool GLF_live26c5 = GLF_live26pos.x - (GLF_live26setting.x - GLF_live26setting.y) < GLF_live26square.x;
    if (!GLF_live26c5) {
        return GLF_live26computeColor(GLF_live26setting.z / (5.0 * float(findMSB(GLF_live26msb8))), GLF_live26pos);
    }
    bool GLF_live26c6 = GLF_live26pos.x + (GLF_live26setting.x - GLF_live26setting.y) > GLF_live26square.x;
    if (!GLF_live26c6) {
        return GLF_live26computeColor(GLF_live26setting.z / (5.0 * float(findMSB(GLF_live26msb8))), GLF_live26pos);
    }
    bool GLF_live26c7 = GLF_live26pos.y - (GLF_live26setting.x - GLF_live26setting.y) < GLF_live26square.y;
    if (!GLF_live26c7) {
        return GLF_live26computeColor(GLF_live26setting.z / (5.0 * float(findMSB(GLF_live26msb8))), GLF_live26pos);
    }
    bool GLF_live26c8 = GLF_live26pos.y + (GLF_live26setting.x - GLF_live26setting.y) > GLF_live26square.y;
    if (!GLF_live26c8) {
        return GLF_live26computeColor(GLF_live26setting.z / (5.0 * float(findMSB(GLF_live26msb8))), GLF_live26pos);
    }
    return GLF_live26defaultColor();
}

layout(set = 0, binding = 5) uniform sampler2D GLF_live23tex;
const float GLF_live23weights[9] = float[9](1.0, 0.5, -0.25, 0.5, 1.0, -0.5, -0.25, -0.5, -1.0);

layout(set = 0, binding = 6) uniform buf6 {
    float GLF_live19time;
};

layout(set = 0, binding = 7) uniform buf7 {
    vec2 GLF_live19resolution;
};

float GLF_live19h_r = _GLF_FUZZED(float(98267u));
float GLF_live19s_g = _GLF_FUZZED(0.8);
float GLF_live19b_b = _GLF_FUZZED(-907.515);

void GLF_live19doConvert() {
    int GLF_live19msb8 = 256;
    vec3 GLF_live19temp = _GLF_FUZZED((-vec3(449.811, -3156.8806, -5.8)));
    GLF_live19temp = GLF_live19b_b * (float(bitCount(GLF_live19msb8)) - GLF_live19s_g) + (GLF_live19b_b - GLF_live19b_b * (float(bitCount(GLF_live19msb8)) - GLF_live19s_g)) * clamp(abs(abs(6.0 * (GLF_live19h_r - vec3(bitfieldReverse(0), bitCount(GLF_live19msb8), 2) / 3.0)) - 3.0) - float(bitCount(GLF_live19msb8)), float(bitfieldExtract(int(GLF_live19resolution.x), 0, 1)), float(bitCount(int(GLF_live19resolution.x))));
    GLF_live19h_r = GLF_live19temp.x;
    GLF_live19s_g = GLF_live19temp.y;
    GLF_live19b_b = GLF_live19temp.z;
}

vec3 GLF_live19computeColor(float GLF_live19c, vec2 GLF_live19position) {
    {
        vec2 GLF_live23coord = _GLF_FUZZED(vec2(-574.030, 7.9));
        int GLF_live23i = _GLF_FUZZED((+(false ? (-32843) : (-23421))));
        int GLF_live23j = _GLF_FUZZED(ivec4(73172, -98031, -73880, 77141).r);
        vec4 GLF_live23res = _GLF_FUZZED(vec4(7368.5974, 6802.9926, -2.6, -987.477));
        float GLF_live23uvstep = _GLF_FUZZED(vec4(-0.5, 3938.4172, -7.4, 40.92).s);
        {
            GLF_live23res += texture(GLF_live23tex, GLF_live23coord + vec2(float(GLF_live23i - 1) * GLF_live23uvstep, float(GLF_live23j - 1) * GLF_live23uvstep)) * GLF_live23weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live23i * 3 + GLF_live23j, 9)];
        }
    }
    int GLF_live19msb8 = 256;
    GLF_live19h_r = fract(GLF_live19c);
    GLF_live19s_g = float(bitCount(GLF_live19msb8));
    GLF_live19b_b = (0.5 + (sin(GLF_live19time) * 0.5 + 0.5));
    GLF_live19doConvert();
    GLF_live19s_g *= float(bitCount(GLF_live19msb8)) / GLF_live19position.y;
    GLF_live19h_r *= float(bitCount(GLF_live19msb8)) / GLF_live19position.x;
    if (abs(GLF_live19position.y - GLF_live19position.x) < 0.5) {
        GLF_live19b_b = clamp(GLF_live19b_b * float(bitCount(GLF_live19msb8)) * 3.0, float(bitfieldExtract(int(GLF_live19resolution.x), 0, 1)), float(bitCount(GLF_live19msb8)));
    }
    return vec3(GLF_live19h_r, GLF_live19s_g, GLF_live19b_b);
}

vec3 GLF_live19defaultColor() {
    return vec3(float(bitfieldExtract(int(GLF_live19resolution.y), 0, 1)));
}

vec3 GLF_live19drawShape(vec2 GLF_live19pos, vec2 GLF_live19square, vec3 GLF_live19setting) {
    int GLF_live19msb8 = 256;
    bool GLF_live19c1 = GLF_live19pos.x - GLF_live19setting.x < GLF_live19square.x;
    if (!GLF_live19c1) {
        return GLF_live19defaultColor();
    }
    bool GLF_live19c2 = GLF_live19pos.x + GLF_live19setting.x > GLF_live19square.x;
    if (!GLF_live19c2) {
        return GLF_live19defaultColor();
    }
    bool GLF_live19c3 = GLF_live19pos.y - GLF_live19setting.x < GLF_live19square.y;
    if (!GLF_live19c3) {
        return GLF_live19defaultColor();
    }
    bool GLF_live19c4 = GLF_live19pos.y + GLF_live19setting.x > GLF_live19square.y;
    if (!GLF_live19c4) {
        return GLF_live19defaultColor();
    }
    bool GLF_live19c5 = GLF_live19pos.x - (GLF_live19setting.x - GLF_live19setting.y) < GLF_live19square.x;
    if (!GLF_live19c5) {
        return GLF_live19computeColor(GLF_live19setting.z / (5.0 * float(findMSB(GLF_live19msb8))), GLF_live19pos);
    }
    bool GLF_live19c6 = GLF_live19pos.x + (GLF_live19setting.x - GLF_live19setting.y) > GLF_live19square.x;
    if (!GLF_live19c6) {
        return GLF_live19computeColor(GLF_live19setting.z / (5.0 * float(findMSB(GLF_live19msb8))), GLF_live19pos);
    }
    bool GLF_live19c7 = GLF_live19pos.y - (GLF_live19setting.x - GLF_live19setting.y) < GLF_live19square.y;
    if (!GLF_live19c7) {
        return GLF_live19computeColor(GLF_live19setting.z / (5.0 * float(findMSB(GLF_live19msb8))), GLF_live19pos);
    }
    bool GLF_live19c8 = GLF_live19pos.y + (GLF_live19setting.x - GLF_live19setting.y) > GLF_live19square.y;
    if (!GLF_live19c8) {
        return GLF_live19computeColor(GLF_live19setting.z / (5.0 * float(findMSB(GLF_live19msb8))), GLF_live19pos);
    }
    return GLF_live19defaultColor();
}

struct GLF_live21QuicksortObject {
    int numbers[10];
};

GLF_live21QuicksortObject GLF_live21obj = GLF_live21QuicksortObject(int[10](0, 0, 0, 0, 0, 0, 0, 0, 0, 0));

void GLF_live21swap(int GLF_live21i, int GLF_live21j) {
    int GLF_live21temp = GLF_live21obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_live21i, 10)];
    {
        int GLF_live25a = _GLF_FUZZED(((-68611) ^ ((-9760) + 30045)));
        int GLF_live25b = _GLF_FUZZED((37087 - 11931));
        vec2 GLF_live25uv = _GLF_FUZZED((3028.8540 + vec2(vec4(7866.2553, 9.6, -0.5, -4064.2565))));
        {
            GLF_live25uv.y -= step(GLF_live25injectionSwitch.y, GLF_live25uv.x) + float(GLF_live25a);
            GLF_live25uv.x *= (isnan(GLF_live25uv.y) ? cosh(GLF_live25gl_FragCoord.y) : tanh(GLF_live25gl_FragCoord.x));
            GLF_live25b--;
        }
    }
    GLF_live21obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_live21i, 10)] = GLF_live21obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_live21j, 10)];
    GLF_live21obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_live21j, 10)] = GLF_live21temp;
}

layout(set = 0, binding = 8) uniform sampler2D GLF_live22tex;

ivec2 GLF_live16iter(ivec2 GLF_live16p) {
    if (GLF_live16p.x > 0) {
        GLF_live16p.y--;
        {
            bool GLF_live19c8 = _GLF_FUZZED((175661u != 137576u));
            {
                int GLF_live25a = _GLF_FUZZED((((-90534) ^ 91019) + 49540));
                int GLF_live25b = _GLF_FUZZED((true ? (-29069) : (-81282)));
                int GLF_live25c = _GLF_FUZZED(ivec2(57586, 78021).t);
                int GLF_live25d = _GLF_FUZZED(-76282);
                vec2 GLF_live25uv = _GLF_FUZZED(vec2(92.19, -50.97));
                {
                    int GLF_live25looplimiter3 = 0;
                    do {
                        if (GLF_live25looplimiter3 >= 4) {
                            break;
                        }
                        GLF_live25looplimiter3++;
                        {
                            GLF_live25uv.y -= step(GLF_live25injectionSwitch.y, GLF_live25uv.x) + float(GLF_live25a) + float(GLF_live25b) + float(GLF_live25c);
                            GLF_live25d--;
                        }
                    } while (GLF_live25d > int(GLF_live25injectionSwitch.x));
                }
            }
            int GLF_live19msb8 = _GLF_FUZZED(ivec4(27947, -83051, 37018, 62545).t);
            vec2 GLF_live19pos = _GLF_FUZZED(vec2(-45.76, -2247.1430));
            vec3 GLF_live19setting = _GLF_FUZZED(vec3(-66.85, -1.6, -7.3));
            if (!GLF_live19c8) {
                ;
            }
        }
    }
    if (GLF_live16p.x < 0) {
        GLF_live16p.y++;
    }
    {
        vec2 GLF_live26center = _GLF_FUZZED((mat2(-7.3, -9.1, -2620.9412, -475.600) * vec2(4801.8467, 5.5)));
        int GLF_live26i = _GLF_FUZZED(-62241);
        int GLF_live26msb8 = _GLF_FUZZED(62826);
        vec2 GLF_live26position = _GLF_FUZZED(vec2(5.0, 850.354));
        vec3 GLF_live26result = _GLF_FUZZED(vec3((true ? (-355.934) : 1178.3975)));
        {
            vec3 GLF_live26d = _GLF_FUZZED(vec3(904.729, vec2(-5.6, 6.6)));
            GLF_live26d = GLF_live26drawShape(GLF_live26position, GLF_live26center + vec2(sin(float(GLF_live26i) / (float(bitCount(GLF_live26msb8)) * 10.0) + GLF_live26time) / 4.0 * float(bitCount(GLF_live26msb8)), float(bitfieldExtract(int(GLF_live26resolution.x), 0, 1))), vec3(0.01 + sin(float(GLF_live26i) / 100.0 * float(bitCount(GLF_live26msb8))), 0.01, float(GLF_live26i)));
            if (length(GLF_live26d) <= float(bitfieldExtract(int(GLF_live26resolution.x), 0, 1))) {
                ;
            }
            GLF_live26result = vec3(GLF_live26d);
        }
    }
    GLF_live16p.x += GLF_live16p.y / 2;
    {
        int GLF_live26msb8 = _GLF_FUZZED(-53541);
        vec2 GLF_live26pos = _GLF_FUZZED((mat4x2(3.4, -3412.2738, -8619.4387, 5.2, -1.4, 7.4, -607.331, -322.975) * vec4(-596.557, 19.15, -4.3, -836.681)));
        vec3 GLF_live26setting = _GLF_FUZZED(vec3(-3.7, -67.36, -2864.7665).spt);
        {
            ;
        }
    }
    return GLF_live16p;
}

const int GLF_live18dp[256] = int[256](115, 133, 150, 164, 176, 184, 190, 192, 191, 187, 181, 172, 163, 153, 143, 134, 126, 120, 116, 114, 114, 117, 121, 127, 134, 141, 148, 154, 159, 162, 163, 161, 157, 151, 143, 134, 124, 113, 103, 94, 87, 82, 79, 80, 84, 91, 101, 114, 130, 146, 164, 182, 199, 215, 229, 240, 249, 254, 256, 254, 250, 243, 233, 223, 212, 200, 190, 180, 172, 166, 163, 161, 162, 164, 169, 174, 179, 185, 190, 193, 195, 195, 192, 188, 180, 171, 161, 149, 137, 125, 114, 105, 97, 93, 91, 93, 98, 106, 117, 130, 145, 161, 177, 193, 208, 221, 231, 239, 243, 244, 242, 236, 228, 218, 207, 194, 181, 169, 158, 148, 141, 135, 132, 131, 132, 135, 138, 143, 147, 151, 154, 155, 155, 152, 146, 139, 129, 118, 106, 93, 80, 68, 58, 49, 43, 40, 41, 44, 51, 61, 73, 87, 103, 119, 134, 149, 162, 173, 181, 186, 188, 186, 181, 174, 164, 153, 141, 128, 116, 104, 94, 86, 81, 77, 76, 77, 80, 84, 89, 94, 98, 102, 104, 104, 102, 98, 92, 83, 73, 62, 50, 38, 26, 16, 8, 2, 0, 0, 4, 11, 21, 33, 48, 64, 81, 98, 114, 129, 141, 151, 158, 161, 161, 158, 152, 144, 134, 123, 112, 100, 90, 81, 73, 68, 65, 65, 67, 70, 75, 81, 87, 92, 97, 101, 103, 102, 100, 95, 88, 79, 69, 58, 47, 36, 26, 18, 13, 11, 11, 15, 22, 32, 45, 60, 77, 94);
vec4 GLF_live13_GLF_color = _GLF_FUZZED((mat3x4(-8060.1865, -4115.6901, -5687.8330, -76.44, 72.38, 7952.4221, -8.2, -6505.6449, 14.19, -3.6, 15.80, -4.0) * (vec3(478.352, 115.813, -68.01) * (-87.12))));

float GLF_live13cross2d(vec2 GLF_live13a, vec2 GLF_live13b) {
    return ((GLF_live13a.x) * (GLF_live13b.y) - (GLF_live13b.x) * (GLF_live13a.y));
    {
        {
            vec2 GLF_live23coord = _GLF_FUZZED(((vec3(1.3, vec2(-7.5, 160.024)) * mat2x3(5295.8237, 7642.7988, 8293.7174, 55.57, 9563.5395, -4.9))));
            int GLF_live23i = _GLF_FUZZED((98851));
            int GLF_live23j = _GLF_FUZZED((~25829));
            vec4 GLF_live23res = _GLF_FUZZED((mat2x4(-5610.0636, -0.6, 16.21, 4783.3616, 520.120, -0.9, 7.2, 4.2) * vec2(5514.7670, 8.6)));
            float GLF_live23uvstep = _GLF_FUZZED(4.1);
            {
                GLF_live23res += texture(GLF_live23tex, GLF_live23coord + vec2(float(GLF_live23i - 1) * GLF_live23uvstep, float(GLF_live23j - 1) * GLF_live23uvstep)) * GLF_live23weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live23i * 3 + GLF_live23j, 9)];
            }
        }
        int GLF_live16looplimiter1 = 0;
        ivec2 GLF_live16p = _GLF_FUZZED(ivec2(((ivec3(-58161, -64548, -23316) & 32586) & (-7110))));
        {
            if (GLF_live16looplimiter1 >= 6) {
                ;
            }
            GLF_live16looplimiter1++;
            {
                int GLF_live20looplimiter1 = 0;
                if (GLF_live20looplimiter1 >= 5) {
                    ;
                    {
                        bool GLF_live26c2 = _GLF_FUZZED(true);
                        if (!GLF_live26c2) {
                            ;
                        }
                    }
                }
            }
            {
                GLF_live16p.x -= 16;
            }
        }
    }
}

int GLF_live13pointInTriangle(vec2 GLF_live13p, vec2 GLF_live13a, vec2 GLF_live13b, vec2 GLF_live13c) {
    {
        ivec2 GLF_live18pos = _GLF_FUZZED(ivec2(-54295, -75119));
        if (GLF_live18pos.x < GLF_live18dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18pos.y, 256)] + 15 && GLF_live18pos.x > GLF_live18dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18pos.y, 256)] - 15) {
            float GLF_live18p = (15.0 - abs(float(GLF_live18pos.x - GLF_live18dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18pos.y, 256)]))) / 15.0;
            {
                vec2 GLF_live22coord = _GLF_FUZZED(vec2(-9.2, -5.5));
                float GLF_live22h = _GLF_FUZZED(-9.3);
                int GLF_live22i = _GLF_FUZZED(46844);
                float GLF_live22refh = _GLF_FUZZED(30.55);
                float GLF_live22slope = _GLF_FUZZED((+(-432.634)));
                vec2 GLF_live22uvstep = _GLF_FUZZED((vec2(-91.84, -1744.6719)));
                {
                    GLF_live22coord -= GLF_live22uvstep;
                    GLF_live22refh += GLF_live22slope;
                    GLF_live22h = texture(GLF_live22tex, GLF_live22coord).y;
                    {
                        int GLF_live23looplimiter1 = 0;
                        if (GLF_live23looplimiter1 >= 3) {
                            ;
                        }
                    }
                    GLF_live22i++;
                }
            }
            ;
        }
    }
    float GLF_live13pab = GLF_live13cross2d(vec2(GLF_live13p.x - GLF_live13a.x, GLF_live13p.y - GLF_live13a.y), vec2(GLF_live13b.x - GLF_live13a.x, GLF_live13b.y - GLF_live13a.y));
    {
        int GLF_live23looplimiter1 = 0;
        if (GLF_live23looplimiter1 >= 3) {
            ;
        }
    }
    float GLF_live13pbc = GLF_live13cross2d(vec2(GLF_live13p.x - GLF_live13b.x, GLF_live13p.y - GLF_live13b.y), vec2(GLF_live13c.x - GLF_live13b.x, GLF_live13c.y - GLF_live13b.y));
    if (!((GLF_live13pab < 0.0 && GLF_live13pbc < 0.0) || (GLF_live13pab >= 0.0 && GLF_live13pbc >= 0.0))) {
        return 0;
    }
    float GLF_live13pca = GLF_live13cross2d(vec2(GLF_live13p.x - GLF_live13c.x, GLF_live13p.y - GLF_live13c.y), vec2(GLF_live13a.x - GLF_live13c.x, GLF_live13a.y - GLF_live13c.y));
    if (!((GLF_live13pab < 0.0 && GLF_live13pca < 0.0) || (GLF_live13pab >= 0.0 && GLF_live13pca >= 0.0))) {
        return 0;
    }
    return 1;
}

vec4 GLF_live9gl_FragCoord = _GLF_FUZZED(vec4(-5147.6049, -34.41, -30.74, -0.3));

layout(set = 0, binding = 9) uniform buf9 {
    vec2 GLF_live9injectionSwitch;
};

layout(set = 0, binding = 10) uniform buf10 {
    vec2 GLF_live9resolution;
};

const int GLF_live9N = 10;
int GLF_live9data[10] = int[10](_GLF_FUZZED(-66714), _GLF_FUZZED((53386 & 54508)), _GLF_FUZZED(((+(73661 | (-89745))))), _GLF_FUZZED(76220), _GLF_FUZZED((-55757)), _GLF_FUZZED(((-12165) - 91521)), _GLF_FUZZED(((-1773) + 30299)), _GLF_FUZZED((-33939)), _GLF_FUZZED(-45768), _GLF_FUZZED((~(-70727)))), GLF_live9temp[10] = int[10](_GLF_FUZZED((ivec4(-20600, 90472, -10372, -92632).r | 31610)), _GLF_FUZZED(-47037), _GLF_FUZZED((86089 & (-40938))), _GLF_FUZZED((-ivec2(94970, -25092).x)), _GLF_FUZZED((true ? (-71430) : int(150293u))), _GLF_FUZZED(3797), _GLF_FUZZED(6105), _GLF_FUZZED(int(true)), _GLF_FUZZED(-16385), _GLF_FUZZED(-78142));

void GLF_live9merge(int GLF_live9from, int GLF_live9mid, int GLF_live9to) {
    int GLF_live9k = GLF_live9from, GLF_live9i = GLF_live9from, GLF_live9j = GLF_live9mid + 1;
    {
        int GLF_live9looplimiter0 = 0;
        while (GLF_live9i <= GLF_live9mid && GLF_live9j <= GLF_live9to) {
            {
                int GLF_live20iteration = _GLF_FUZZED(int(161724u));
                {
                    ;
                }
            }
            if (GLF_live9looplimiter0 >= 4) {
                break;
            }
            GLF_live9looplimiter0++;
            {
                vec3 GLF_live26d = _GLF_FUZZED((mat3(319.308, 3972.8919, -370.798, 78.05, -29.97, 8782.7503, 325.615, -37.99, 2790.6443) * vec3(3368.8322, -8798.6469, -5995.0152)));
                if (length(GLF_live26d) <= float(bitfieldExtract(int(GLF_live26resolution.x), 0, 1))) {
                    ;
                }
            }
            {
                if (GLF_live9data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9i, 10)] < GLF_live9data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9j, 10)]) {
                    GLF_live9temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9k++, 10)] = GLF_live9data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9i++, 10)];
                } else {
                    GLF_live9temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9k++, 10)] = GLF_live9data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9j++, 10)];
                }
            }
        }
    }
    {
        {
            int GLF_live20iteration = _GLF_FUZZED((6824 + ivec4(-11862, -34174, 45027, 35442).q));
            {
                ;
            }
        }
        {
            int GLF_live16i = _GLF_FUZZED(((-9370) | (-28878)));
            {
                {
                    ;
                }
            }
            int GLF_live16looplimiter0 = 0;
            ivec2 GLF_live16p = _GLF_FUZZED((ivec2(24466, 33465) | (-73337)));
            for (GLF_live16i = 0; GLF_live16i < 100; GLF_live16i++) {
                if (GLF_live16looplimiter0 >= 6) {
                    break;
                }
                GLF_live16looplimiter0++;
                {
                    GLF_live16p = GLF_live16iter(GLF_live16p);
                }
            }
        }
        int GLF_live9looplimiter1 = 0;
        while (GLF_live9i < GLF_live9N && GLF_live9i <= GLF_live9mid) {
            if (GLF_live9looplimiter1 >= 4) {
                {
                    int GLF_live16looplimiter0 = 0;
                    ivec2 GLF_live16p = _GLF_FUZZED(ivec2(15299, 20942));
                    {
                        {
                            vec2 GLF_live23coord = _GLF_FUZZED(vec2(5.1, -30.41));
                            vec4 GLF_live23res = _GLF_FUZZED(vec4(485.703, 3524.2916, 6959.3119, 987.124));
                            float GLF_live23uvstep = _GLF_FUZZED((+((-8131.5218) - 83.91)));
                            {
                                int GLF_live23looplimiter1 = 0;
                                for (int GLF_live23i = 0; GLF_live23i < 3; GLF_live23i++) {
                                    if (GLF_live23looplimiter1 >= 3) {
                                        break;
                                    }
                                    GLF_live23looplimiter1++;
                                    {
                                        {
                                            int GLF_live23looplimiter0 = 0;
                                            for (int GLF_live23j = 0; GLF_live23j < 3; GLF_live23j++) {
                                                if (GLF_live23looplimiter0 >= 3) {
                                                    break;
                                                }
                                                GLF_live23looplimiter0++;
                                                {
                                                    GLF_live23res += texture(GLF_live23tex, GLF_live23coord + vec2(float(GLF_live23i - 1) * GLF_live23uvstep, float(GLF_live23j - 1) * GLF_live23uvstep)) * GLF_live23weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live23i * 3 + GLF_live23j, 9)];
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        if (GLF_live16looplimiter0 >= 6) {
                            {
                                int GLF_live25m = _GLF_FUZZED(10913);
                                {
                                    ;
                                }
                            }
                            {
                                vec2 GLF_live22coord = _GLF_FUZZED(vec2(-5.8, 290.067));
                                float GLF_live22h = _GLF_FUZZED(-639.810);
                                int GLF_live22i = _GLF_FUZZED((true ? ivec2(49577, -83489).s : ((-65176) + ivec3(-19483, -89295, 55810).g)));
                                int GLF_live22looplimiter0 = 0;
                                float GLF_live22refh = _GLF_FUZZED(-443.121);
                                float GLF_live22slope = _GLF_FUZZED((5.1 * 8.9));
                                vec2 GLF_live22uvstep = _GLF_FUZZED((vec2(6.5, -78.50)));
                                {
                                    if (GLF_live22looplimiter0 >= 6) {
                                        ;
                                    }
                                    GLF_live22looplimiter0++;
                                    {
                                        vec2 GLF_live23coord = _GLF_FUZZED(vec2(-3.7, 2.1));
                                        int GLF_live23i = _GLF_FUZZED(int(false));
                                        int GLF_live23looplimiter1 = 0;
                                        vec4 GLF_live23res = _GLF_FUZZED(vec4(-30.86, 1916.7636, 3.4, 8544.1373));
                                        float GLF_live23uvstep = _GLF_FUZZED(float(true));
                                        {
                                            if (GLF_live23looplimiter1 >= 3) {
                                                ;
                                            }
                                            GLF_live23looplimiter1++;
                                            {
                                                {
                                                    int GLF_live23looplimiter0 = 0;
                                                    for (int GLF_live23j = 0; GLF_live23j < 3; GLF_live23j++) {
                                                        if (GLF_live23looplimiter0 >= 3) {
                                                            break;
                                                        }
                                                        GLF_live23looplimiter0++;
                                                        {
                                                            GLF_live23res += texture(GLF_live23tex, GLF_live23coord + vec2(float(GLF_live23i - 1) * GLF_live23uvstep, float(GLF_live23j - 1) * GLF_live23uvstep)) * GLF_live23weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live23i * 3 + GLF_live23j, 9)];
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    {
                                        GLF_live22coord -= GLF_live22uvstep;
                                        GLF_live22refh += GLF_live22slope;
                                        GLF_live22h = texture(GLF_live22tex, GLF_live22coord).y;
                                        GLF_live22i++;
                                    }
                                }
                            }
                            ;
                        }
                        GLF_live16looplimiter0++;
                        {
                            GLF_live16p = GLF_live16iter(GLF_live16p);
                        }
                    }
                }
                break;
            }
            GLF_live9looplimiter1++;
            {
                GLF_live9temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9k++, 10)] = GLF_live9data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9i++, 10)];
                {
                    float GLF_live11th = _GLF_FUZZED(((-(-9197.1504))));
                    {
                        GLF_live11th = 0.5 - GLF_live11th;
                    }
                }
                {
                    int GLF_live25a = _GLF_FUZZED(91971);
                    int GLF_live25b = _GLF_FUZZED((-(-17972)));
                    int GLF_live25looplimiter1 = 0;
                    vec2 GLF_live25uv = _GLF_FUZZED(vec2(-931.258, -2.4));
                    {
                        if (GLF_live25looplimiter1 >= 4) {
                            ;
                        }
                        GLF_live25looplimiter1++;
                        {
                            GLF_live25uv.y -= step(GLF_live25injectionSwitch.y, GLF_live25uv.x) + float(GLF_live25a);
                            GLF_live25uv.x *= (isnan(GLF_live25uv.y) ? cosh(GLF_live25gl_FragCoord.y) : tanh(GLF_live25gl_FragCoord.x));
                            GLF_live25b--;
                        }
                    }
                }
            }
        }
    }
    {
        {
            int GLF_live21h = _GLF_FUZZED(-71943);
            int GLF_live21i = _GLF_FUZZED(-89305);
            int GLF_live21l = _GLF_FUZZED(14462);
            int GLF_live21pivot = _GLF_FUZZED((55351 - 76051));
            {
                int GLF_live24i = _GLF_FUZZED((true ? (-16380) : 63383));
                int GLF_live24looplimiter2 = 0;
                {
                    if (GLF_live24looplimiter2 >= 4) {
                        ;
                    }
                    GLF_live24looplimiter2++;
                    {
                        GLF_live24obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_live24i, 10)] = (10 - GLF_live24i) * int(GLF_live24injectionSwitch.y);
                    }
                }
            }
            {
                int GLF_live21looplimiter0 = 0;
                for (int GLF_live21j = GLF_live21l; GLF_live21j <= GLF_live21h - 1; GLF_live21j++) {
                    if (GLF_live21looplimiter0 >= 3) {
                        break;
                    }
                    GLF_live21looplimiter0++;
                    {
                        {
                            ;
                        }
                    }
                    {
                        if (GLF_live21obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_live21j, 10)] <= GLF_live21pivot) {
                            GLF_live21i++;
                            GLF_live21swap(GLF_live21i, GLF_live21j);
                        }
                    }
                }
            }
        }
        {
            ivec2 GLF_live16p = _GLF_FUZZED((ivec4(-45860, 33426, -82989, 8693).z | ivec2(-89174, -25724)));
            {
                GLF_live16p.y++;
                {
                    vec2 GLF_live22coord = _GLF_FUZZED(vec2(-6.9, -53.98));
                    {
                        bool GLF_live26c8 = _GLF_FUZZED(false);
                        int GLF_live26msb8 = _GLF_FUZZED((true ? (-30270) : (-(-88860))));
                        vec2 GLF_live26pos = _GLF_FUZZED((7.1 + (vec3(2426.1026, -3.3, 94.59) * mat2x3(-2935.0445, -741.332, 8485.2661, 9.6, -981.131, -3.0))));
                        vec3 GLF_live26setting = _GLF_FUZZED((-vec3(-52.82, -1.0, -9369.0598)));
                        if (!GLF_live26c8) {
                            ;
                        }
                    }
                    float GLF_live22h = _GLF_FUZZED(4048.3135);
                    int GLF_live22i = _GLF_FUZZED(int((169596u * 12533u)));
                    float GLF_live22refh = _GLF_FUZZED(float(130120u));
                    float GLF_live22slope = _GLF_FUZZED(0.7);
                    vec2 GLF_live22uvstep = _GLF_FUZZED(vec2(4.1, -0.4));
                    {
                        int GLF_live22looplimiter0 = 0;
                        while (GLF_live22h < GLF_live22refh && GLF_live22i < 32) {
                            if (GLF_live22looplimiter0 >= 6) {
                                break;
                            }
                            GLF_live22looplimiter0++;
                            {
                                GLF_live22coord -= GLF_live22uvstep;
                                GLF_live22refh += GLF_live22slope;
                                GLF_live22h = texture(GLF_live22tex, GLF_live22coord).y;
                                GLF_live22i++;
                            }
                        }
                    }
                }
            }
        }
        int GLF_live9looplimiter2 = 0;
        for (int GLF_live9i = GLF_live9from; GLF_live9i <= GLF_live9to; GLF_live9i++) {
            {
                int GLF_live25a = _GLF_FUZZED(((-(-35423)) + 65227));
                int GLF_live25b = _GLF_FUZZED(ivec3(-33162, 80466, -67059).g);
                vec2 GLF_live25uv = _GLF_FUZZED(vec2(-1641.5619, 4.0));
                {
                    int GLF_live25looplimiter1 = 0;
                    do {
                        if (GLF_live25looplimiter1 >= 4) {
                            break;
                        }
                        GLF_live25looplimiter1++;
                        {
                            GLF_live25uv.y -= step(GLF_live25injectionSwitch.y, GLF_live25uv.x) + float(GLF_live25a);
                            GLF_live25uv.x *= (isnan(GLF_live25uv.y) ? cosh(GLF_live25gl_FragCoord.y) : tanh(GLF_live25gl_FragCoord.x));
                            GLF_live25b--;
                        }
                    } while (GLF_live25b > int(GLF_live25injectionSwitch.x));
                }
            }
            if (GLF_live9looplimiter2 >= 4) {
                break;
            }
            {
                vec3 GLF_live21color = _GLF_FUZZED(vec3(0.8, -3703.7833, -9.8));
                vec2 GLF_live21uv = _GLF_FUZZED(vec4(-4.8, 822.907, 0.4, 6.6).xw);
                if (abs(GLF_live21uv.x - GLF_live21uv.y) < 0.25) {
                    GLF_live21color.x += float(GLF_live21obj.numbers[9]);
                }
            }
            {
                {
                    ;
                }
            }
            GLF_live9looplimiter2++;
            {
                ivec2 GLF_live16p = _GLF_FUZZED((ivec2(59102, 88943) - ivec2(19233, 42136)));
                {
                    GLF_live16p.y++;
                }
            }
            {
                {
                    vec3 GLF_live21color = _GLF_FUZZED((vec3(0.2, -3932.3162, 5.0) * vec3(-60.31, -7.6, 286.093)));
                    vec2 GLF_live21uv = _GLF_FUZZED((vec2(-1075.2566, -766.196) * mat2(-18.44, 2431.8089, -988.137, 4082.2062)));
                    if (GLF_live21uv.x > (1.0 / 4.0)) {
                        GLF_live21color.x += float(GLF_live21obj.numbers[1]);
                    }
                }
                GLF_live9data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9i, 10)] = GLF_live9temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9i, 10)];
            }
        }
        {
            vec3 GLF_live24color = _GLF_FUZZED(vec3(-87.93, -4306.0044, 4296.0264));
            int GLF_live24count = _GLF_FUZZED(ivec2(61553, 48648).y);
            int GLF_live24looplimiter4 = 0;
            {
                if (GLF_live24looplimiter4 >= 4) {
                    ;
                }
                GLF_live24looplimiter4++;
                {
                    GLF_live24color -= GLF_live24palette(vec3(float(GLF_live24obj.numbers[4]) * 0.1), trunc(vec3(0.1)), vec3(float(GLF_live24obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_live24injectionSwitch.y), 10)]) * 0.1), vec3(GLF_live24injectionSwitch.x, float(GLF_live24obj.numbers[2]) * 0.1, float(GLF_live24obj.numbers[8]) * 0.1));
                    GLF_live24count++;
                }
            }
        }
        {
            {
                int GLF_live26msb8 = _GLF_FUZZED(4814);
                vec2 GLF_live26pos = _GLF_FUZZED((+((mat4(-96.53, 1.0, -4.9, -2.7, 990.322, -4.8, -6.9, -9.1, 9.5, 3.6, 1.0, 414.634, 7.0, 8.3, 5746.0237, 12.63) == mat4(-6.0, -91.79, 9387.2294, -6191.7287, -757.887, 6935.0140, 6.2, 6.0, -884.443, -1584.8302, -1728.2132, -1195.4005, -22.84, -3.8, -7393.5903, -0.7)) ? vec2(-247.280, 937.438) : vec2(-6.4, 3989.4125))));
                vec3 GLF_live26setting = _GLF_FUZZED((vec2(4943.3213, 9.5) * (+mat3x2(-4.3, 8424.1063, -1819.8241, -755.361, 6974.0402, 1.1))));
                {
                    ;
                }
            }
            {
                GLF_live13_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
            }
        }
        {
            {
                ;
            }
        }
    }
}

layout(set = 0, binding = 11) uniform sampler2D GLF_live10tex;
vec4 GLF_live7_GLF_color = _GLF_FUZZED((mat2x4(-9.7, -4.6, 1.1, 41.47, 8.9, 542.932, 8.1, -8746.1654) * vec2(-9602.0234, 7.4)));

layout(set = 0, binding = 12) uniform buf12 {
    vec2 GLF_live7injectionSwitch;
};

float GLF_live7compute_derivative_x(float GLF_live7v) {
    return dFdx(GLF_live7v) * GLF_live7injectionSwitch.y;
}

float GLF_live7compute_derivative_y(float GLF_live7v) {
    return dFdy(GLF_live7v) * GLF_live7injectionSwitch.y;
}

float GLF_live7compute_stripe(float GLF_live7v, float GLF_live7t) {
    return smoothstep(-.9, 1., (GLF_live7v) / (20.0 * ((GLF_live7injectionSwitch.y > GLF_live7injectionSwitch.x) ? GLF_live7compute_derivative_x(GLF_live7t) : GLF_live7compute_derivative_y(GLF_live7t))));
}

int GLF_live4MATRIX_N = 4;
const int GLF_live6N = 10;
int GLF_live6data[10] = int[10](_GLF_FUZZED(1935), _GLF_FUZZED((-(-76230))), _GLF_FUZZED((15460 + 55321)), _GLF_FUZZED(((-42055) | (62149 | (92611 ^ 43443)))), _GLF_FUZZED(71758), _GLF_FUZZED(79510), _GLF_FUZZED((4849 & 75771)), _GLF_FUZZED(-95993), _GLF_FUZZED(-93623), _GLF_FUZZED(((!true) ? (-15956) : (-64895)))), GLF_live6temp[10] = int[10](_GLF_FUZZED(ivec4(70180, -7254, 98661, 48008).p), _GLF_FUZZED((-18767)), _GLF_FUZZED(ivec3(35851, 13821, -96331).t), _GLF_FUZZED(64284), _GLF_FUZZED(65295), _GLF_FUZZED(35317), _GLF_FUZZED((-(36272 & (-32885)))), _GLF_FUZZED((83423 * 51695)), _GLF_FUZZED(((-88409) + 96758)), _GLF_FUZZED((true ? (-24433) : (-18525))));

void GLF_live6merge(int GLF_live6from, int GLF_live6mid, int GLF_live6to) {
    {
        vec3 GLF_live7col = _GLF_FUZZED(vec3(4.4, -2732.3268, 83.95));
        vec2 GLF_live7uv = _GLF_FUZZED(((-4.2) - (vec2(8.7, 6.6) + vec2(-7.4, -3.1))));
        {
            float GLF_live7stripe = GLF_live7compute_stripe(tan((GLF_live7uv.x + GLF_live7uv.y) * 20.0), GLF_live7uv.x + GLF_live7uv.y);
            GLF_live7col = mix(vec3(GLF_live7uv.x, .8, 0), vec3(1, GLF_live7uv.y, 0), GLF_live7stripe);
            GLF_live7_GLF_color = vec4(GLF_live7col, 1.0);
            ;
        }
    }
    int GLF_live6k = GLF_live6from, GLF_live6i = GLF_live6from, GLF_live6j = GLF_live6mid + 1;
    {
        {
            int GLF_live25l = _GLF_FUZZED(56510);
            int GLF_live25m = _GLF_FUZZED(3813);
            {
                GLF_live25l = GLF_live25m + 1;
            }
        }
        int GLF_live21looplimiter0 = 0;
        if (GLF_live21looplimiter0 >= 3) {
            ;
        }
    }
    {
        ivec2 GLF_live16p = _GLF_FUZZED((ivec2(88910, 30170)));
        {
            GLF_live16p.y--;
            {
                int GLF_live20looplimiter1 = 0;
                if (GLF_live20looplimiter1 >= 5) {
                    ;
                }
            }
        }
    }
    {
        int GLF_live6looplimiter0 = 0;
        while (GLF_live6i <= GLF_live6mid && GLF_live6j <= GLF_live6to) {
            {
                ivec2 GLF_live18pos = _GLF_FUZZED(((-18478) & ivec2(ivec4(-46348, 13781, 1601, -10945))));
                {
                    {
                        bool GLF_live26c4 = _GLF_FUZZED((mat3x2(-4.9, -2.7, -75.44, -71.46, -558.766, 2.5) != mat3x2(2.9, -148.111, -81.60, -1.1, -2.9, 1614.9533)));
                        if (!GLF_live26c4) {
                            ;
                        }
                    }
                    float GLF_live18p = (15.0 - abs(float(GLF_live18pos.x - GLF_live18dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18pos.y, 256)]))) / 15.0;
                    ;
                }
            }
            if (GLF_live6looplimiter0 >= 7) {
                break;
                {
                    int GLF_live20iteration = _GLF_FUZZED(-14078);
                    float GLF_live20xCoord = _GLF_FUZZED(-5.2);
                    float GLF_live20yCoord = _GLF_FUZZED((4.4 + float(43454)));
                    if (GLF_live20iteration < 1000) {
                        ;
                    } else {
                        ;
                    }
                }
            }
            {
                int GLF_live24looplimiter2 = 0;
                if (GLF_live24looplimiter2 >= 4) {
                    ;
                }
            }
            GLF_live6looplimiter0++;
            {
                if (GLF_live6data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6i, 10)] < GLF_live6data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6j, 10)]) {
                    GLF_live6temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6k++, 10)] = GLF_live6data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6i++, 10)];
                    {
                        ivec2 GLF_live18pos = _GLF_FUZZED((ivec2(50026, -31839) | (-7615)));
                        {
                            if (GLF_live18pos.x < GLF_live18dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18pos.y, 256)] + 15 && GLF_live18pos.x > GLF_live18dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18pos.y, 256)] - 15) {
                                float GLF_live18p = (15.0 - abs(float(GLF_live18pos.x - GLF_live18dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18pos.y, 256)]))) / 15.0;
                                ;
                            }
                            GLF_live18pos.y++;
                        }
                    }
                } else {
                    GLF_live6temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6k++, 10)] = GLF_live6data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6j++, 10)];
                    {
                        vec3 GLF_live21color = _GLF_FUZZED(vec3(-2.0, 6.8, -4.9));
                        {
                            {
                                int GLF_live24looplimiter2 = 0;
                                for (int GLF_live24i = int(GLF_live24injectionSwitch.x); GLF_live24i < 10; GLF_live24i++) {
                                    if (GLF_live24looplimiter2 >= 4) {
                                        break;
                                    }
                                    GLF_live24looplimiter2++;
                                    {
                                        GLF_live24obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_live24i, 10)] = (10 - GLF_live24i) * int(GLF_live24injectionSwitch.y);
                                    }
                                }
                            }
                        }
                        vec2 GLF_live21uv = _GLF_FUZZED(vec2(-779.086, -2689.8397));
                        if (GLF_live21uv.y > (3.0 / 4.0)) {
                            GLF_live21color.z += float(GLF_live21obj.numbers[7]);
                        }
                    }
                }
            }
        }
    }
    {
        {
            ;
            {
                vec3 GLF_live24color = _GLF_FUZZED((mat3(-13.63, 332.064, -2694.9336, -168.272, 581.290, -4.3, 4.0, -8960.4662, 33.36) * vec3(8.6, 39.56, -22.50)));
                int GLF_live24count = _GLF_FUZZED((39155 * ivec2(-18014, -5273)).t);
                {
                    GLF_live24color -= GLF_live24palette(vec3(float(GLF_live24obj.numbers[4]) * 0.1), trunc(vec3(0.1)), vec3(float(GLF_live24obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_live24injectionSwitch.y), 10)]) * 0.1), vec3(GLF_live24injectionSwitch.x, float(GLF_live24obj.numbers[2]) * 0.1, float(GLF_live24obj.numbers[8]) * 0.1));
                    GLF_live24count++;
                }
            }
        }
    }
    {
        {
            int GLF_live26msb8 = _GLF_FUZZED(((-53696) | 48549));
            {
                GLF_live26b_b = clamp(GLF_live26b_b * float(bitCount(GLF_live26msb8)) * 3.0, float(bitfieldExtract(int(GLF_live26resolution.x), 0, 1)), float(bitCount(GLF_live26msb8)));
            }
        }
        int GLF_live6looplimiter1 = 0;
        while (GLF_live6i < GLF_live6N && GLF_live6i <= GLF_live6mid) {
            {
                {
                    ;
                }
            }
            if (GLF_live6looplimiter1 >= 7) {
                {
                    vec2 GLF_live10coord = _GLF_FUZZED((true ? vec2(0.4, 4.8) : vec2(-2.0, 8448.1300)).xy);
                    {
                        int GLF_live16looplimiter1 = 0;
                        ivec2 GLF_live16p = _GLF_FUZZED((+(~ivec2(-20840, 85363))));
                        while (GLF_live16p.x > 15) {
                            if (GLF_live16looplimiter1 >= 6) {
                                break;
                            }
                            GLF_live16looplimiter1++;
                            {
                                GLF_live16p.x -= 16;
                                {
                                    vec2 GLF_live22coord = _GLF_FUZZED(vec2(1501.6986, -87.70));
                                    float GLF_live22h = _GLF_FUZZED((9.8));
                                    int GLF_live22i = _GLF_FUZZED((30904 * (-85437)));
                                    float GLF_live22refh = _GLF_FUZZED(53.43);
                                    float GLF_live22slope = _GLF_FUZZED(-9.3);
                                    vec2 GLF_live22uvstep = _GLF_FUZZED((mat3x2(-57.04, -9.8, -413.239, 0.8, 1.8, 4.3) * (mat4x3(1.3, 0.0, 2.2, -589.784, -377.320, 9865.9333, 7.1, 3575.9687, 4.5, -164.005, 339.956, -4.0) * vec4(2.8, 9.2, -1.5, 974.574))));
                                    {
                                        int GLF_live22looplimiter0 = 0;
                                        while (GLF_live22h < GLF_live22refh && GLF_live22i < 32) {
                                            if (GLF_live22looplimiter0 >= 6) {
                                                {
                                                    int GLF_live25a = _GLF_FUZZED(69292);
                                                    int GLF_live25looplimiter0 = 0;
                                                    vec2 GLF_live25uv = _GLF_FUZZED(((-2.5) * vec2(-5.8, 22.55)));
                                                    {
                                                        if (GLF_live25looplimiter0 >= 4) {
                                                            ;
                                                        }
                                                        GLF_live25looplimiter0++;
                                                        {
                                                            GLF_live25uv.y -= step(GLF_live25injectionSwitch.y, GLF_live25uv.x);
                                                            GLF_live25uv.x -= tanh(GLF_live25uv.x * 0.25) / ldexp(GLF_live25injectionSwitch.y, findMSB(GLF_live25a));
                                                            GLF_live25a--;
                                                        }
                                                    }
                                                }
                                                break;
                                            }
                                            {
                                                int GLF_live25a = _GLF_FUZZED(-11781);
                                                int GLF_live25b = _GLF_FUZZED(-25945);
                                                int GLF_live25looplimiter1 = 0;
                                                vec2 GLF_live25uv = _GLF_FUZZED(vec3(9.8, 7378.5442, 5.7).gg);
                                                {
                                                    if (GLF_live25looplimiter1 >= 4) {
                                                        ;
                                                    }
                                                    GLF_live25looplimiter1++;
                                                    {
                                                        GLF_live25uv.y -= step(GLF_live25injectionSwitch.y, GLF_live25uv.x) + float(GLF_live25a);
                                                        GLF_live25uv.x *= (isnan(GLF_live25uv.y) ? cosh(GLF_live25gl_FragCoord.y) : tanh(GLF_live25gl_FragCoord.x));
                                                        GLF_live25b--;
                                                    }
                                                }
                                            }
                                            GLF_live22looplimiter0++;
                                            {
                                                GLF_live22coord -= GLF_live22uvstep;
                                                GLF_live22refh += GLF_live22slope;
                                                GLF_live22h = texture(GLF_live22tex, GLF_live22coord).y;
                                                {
                                                    int GLF_live24h = _GLF_FUZZED(41057);
                                                    int GLF_live24i = _GLF_FUZZED(((~(-63833)) * 14728));
                                                    int GLF_live24l = _GLF_FUZZED(-328);
                                                    int GLF_live24looplimiter0 = 0;
                                                    int GLF_live24pivot = _GLF_FUZZED((65870 * ((-31217) + 14591)));
                                                    for (int GLF_live24j = GLF_live24l; GLF_live24j <= GLF_live24h - 1; GLF_live24j++) {
                                                        if (GLF_live24looplimiter0 >= 4) {
                                                            break;
                                                        }
                                                        GLF_live24looplimiter0++;
                                                        {
                                                            if (GLF_live24obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_live24j, 10)] <= GLF_live24pivot) {
                                                                GLF_live24i++;
                                                                GLF_live24swap(GLF_live24i, GLF_live24j);
                                                            }
                                                        }
                                                    }
                                                }
                                                GLF_live22i++;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    int GLF_live10i = _GLF_FUZZED(int(55826u));
                    vec4 GLF_live10texel = _GLF_FUZZED((149.872 - vec4(vec2(8108.1388, -772.227), vec2(14.43, 1.7))));
                    {
                        vec2 GLF_live22coord = _GLF_FUZZED(vec2(-3966.4791, -72.73));
                        float GLF_live22h = _GLF_FUZZED(6351.9593);
                        int GLF_live22i = _GLF_FUZZED(-85619);
                        int GLF_live22looplimiter0 = 0;
                        {
                            bool GLF_live26c6 = _GLF_FUZZED(false);
                            int GLF_live26msb8 = _GLF_FUZZED(((-73814) * ivec2(-12668, -88332).t));
                            vec2 GLF_live26pos = _GLF_FUZZED(vec2(-824.447, 6.5));
                            vec3 GLF_live26setting = _GLF_FUZZED((vec3(-230.766, -8.4, 9.6) * 276.386));
                            if (!GLF_live26c6) {
                                ;
                            }
                        }
                        float GLF_live22refh = _GLF_FUZZED(74.54);
                        float GLF_live22slope = _GLF_FUZZED((752.085 + (-47.52)));
                        vec2 GLF_live22uvstep = _GLF_FUZZED((vec2(-2.5) * vec2(-2.6, -6.5)));
                        {
                            int GLF_live24looplimiter4 = 0;
                            if (GLF_live24looplimiter4 >= 4) {
                                ;
                            }
                        }
                        {
                            if (GLF_live22looplimiter0 >= 6) {
                                ;
                            }
                            GLF_live22looplimiter0++;
                            {
                                GLF_live22coord -= GLF_live22uvstep;
                                GLF_live22refh += GLF_live22slope;
                                GLF_live22h = texture(GLF_live22tex, GLF_live22coord).y;
                                GLF_live22i++;
                            }
                        }
                    }
                    {
                        int GLF_live10looplimiter0 = 0;
                        {
                            float GLF_live14x = _GLF_FUZZED(3.9);
                            float GLF_live14y = _GLF_FUZZED((300.373 + 7843.0098));
                            if (GLF_live14x * GLF_live14x + GLF_live14y * GLF_live14y > 4.0) {
                                ;
                            }
                        }
                        while (GLF_live10texel.x + GLF_live10texel.y + GLF_live10texel.z > 1.0 && GLF_live10i < 16) {
                            if (GLF_live10looplimiter0 >= 3) {
                                break;
                            }
                            GLF_live10looplimiter0++;
                            {
                                bool GLF_live19c6 = _GLF_FUZZED(true);
                                int GLF_live19msb8 = _GLF_FUZZED(76517);
                                vec2 GLF_live19pos = _GLF_FUZZED((vec2(-89.64, 4725.8043) * mat2(-33.04, -1.7, -9.0, 68.77)));
                                vec3 GLF_live19setting = _GLF_FUZZED(vec3(701.381, -597.665, -9.9));
                                if (!GLF_live19c6) {
                                    ;
                                }
                            }
                            {
                                GLF_live10coord = GLF_live10texel.xz + GLF_live10texel.yy;
                                GLF_live10coord = floor(GLF_live10coord * 256.0) / 256.0;
                                GLF_live10texel = texture(GLF_live10tex, GLF_live10coord);
                                GLF_live10i++;
                            }
                            {
                                int GLF_live18looplimiter0 = 0;
                                ivec2 GLF_live18pos = _GLF_FUZZED(ivec2(-70675, -74223));
                                {
                                    int GLF_live26looplimiter0 = 0;
                                    if (GLF_live26looplimiter0 >= 4) {
                                        ;
                                    }
                                }
                                {
                                    if (GLF_live18looplimiter0 >= 5) {
                                        ;
                                    }
                                    GLF_live18looplimiter0++;
                                    {
                                        vec3 GLF_live24color = _GLF_FUZZED((vec3(26.91, 3.2, -97.27) + ((-5.7) * 6332.3880)));
                                        int GLF_live24count = _GLF_FUZZED(91249);
                                        {
                                            int GLF_live24looplimiter5 = 0;
                                            do {
                                                if (GLF_live24looplimiter5 >= 4) {
                                                    break;
                                                }
                                                GLF_live24looplimiter5++;
                                                {
                                                    GLF_live24color -= GLF_live24palette(vec3(float(GLF_live24obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_live24injectionSwitch.y), 10)]) * 0.1), vec3(0.8), trunc(vec3(0.1)), vec3(GLF_live24injectionSwitch.x, 0.6, float(GLF_live24obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_live24injectionSwitch.x), 10)]) * 0.1));
                                                    GLF_live24count++;
                                                }
                                            } while (GLF_live24count != GLF_live24obj.numbers[2]);
                                        }
                                    }
                                    {
                                        if (GLF_live18pos.x < GLF_live18dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18pos.y, 256)] + 15 && GLF_live18pos.x > GLF_live18dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18pos.y, 256)] - 15) {
                                            float GLF_live18p = (15.0 - abs(float(GLF_live18pos.x - GLF_live18dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18pos.y, 256)]))) / 15.0;
                                            ;
                                        }
                                        GLF_live18pos.y++;
                                    }
                                }
                            }
                        }
                    }
                    {
                        vec2 GLF_live23coord = _GLF_FUZZED(vec2(8.4, 3.8));
                        vec4 GLF_live23res = _GLF_FUZZED(vec4(340.629, 53.31, -6957.3020, -2.8));
                        float GLF_live23uvstep = _GLF_FUZZED((888.642));
                        {
                            int GLF_live23looplimiter1 = 0;
                            for (int GLF_live23i = 0; GLF_live23i < 3; GLF_live23i++) {
                                if (GLF_live23looplimiter1 >= 3) {
                                    break;
                                }
                                GLF_live23looplimiter1++;
                                {
                                    {
                                        int GLF_live23looplimiter0 = 0;
                                        for (int GLF_live23j = 0; GLF_live23j < 3; GLF_live23j++) {
                                            if (GLF_live23looplimiter0 >= 3) {
                                                break;
                                            }
                                            GLF_live23looplimiter0++;
                                            {
                                                GLF_live23res += texture(GLF_live23tex, GLF_live23coord + vec2(float(GLF_live23i - 1) * GLF_live23uvstep, float(GLF_live23j - 1) * GLF_live23uvstep)) * GLF_live23weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live23i * 3 + GLF_live23j, 9)];
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                {
                    bool GLF_live19c7 = _GLF_FUZZED(false);
                    int GLF_live19msb8 = _GLF_FUZZED(-7499);
                    vec2 GLF_live19pos = _GLF_FUZZED((-vec2(17.03, 680.860)));
                    vec3 GLF_live19setting = _GLF_FUZZED((vec3(8630.0773, -8412.0828, 7.8) + 34.61));
                    {
                        vec2 GLF_live23coord = _GLF_FUZZED((vec2(-9033.4548, 0.3)));
                        int GLF_live23i = _GLF_FUZZED(-70563);
                        vec4 GLF_live23res = _GLF_FUZZED(vec4(-7.4, 3.0, -4731.5158, 5.8));
                        float GLF_live23uvstep = _GLF_FUZZED((false ? (98.35 * vec2(-9467.3018, -1.2)).g : 3.5));
                        {
                            {
                                int GLF_live23looplimiter0 = 0;
                                for (int GLF_live23j = 0; GLF_live23j < 3; GLF_live23j++) {
                                    if (GLF_live23looplimiter0 >= 3) {
                                        break;
                                    }
                                    GLF_live23looplimiter0++;
                                    {
                                        GLF_live23res += texture(GLF_live23tex, GLF_live23coord + vec2(float(GLF_live23i - 1) * GLF_live23uvstep, float(GLF_live23j - 1) * GLF_live23uvstep)) * GLF_live23weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live23i * 3 + GLF_live23j, 9)];
                                    }
                                }
                            }
                        }
                    }
                    if (!GLF_live19c7) {
                        ;
                    }
                }
                break;
            }
            GLF_live6looplimiter1++;
            {
                {
                    {
                        int GLF_live26looplimiter0 = 0;
                        if (GLF_live26looplimiter0 >= 4) {
                            ;
                        }
                    }
                    vec2 GLF_live11a = _GLF_FUZZED(vec2(109.849, -8.5));
                    {
                        int GLF_live19msb8 = _GLF_FUZZED((ivec2(49821, -22522).x - (-49637)));
                        vec2 GLF_live19pos = _GLF_FUZZED((-vec2(1.8, -7.5)));
                        vec3 GLF_live19setting = _GLF_FUZZED(vec3(6.0, -109.493, 5302.6218));
                        {
                            {
                                vec3 GLF_live26d = _GLF_FUZZED(vec3(-68.95, 24.17, 0.8));
                                if (length(GLF_live26d) <= float(bitfieldExtract(int(GLF_live26resolution.x), 0, 1))) {
                                    ;
                                }
                            }
                            ;
                        }
                    }
                    float GLF_live11z = _GLF_FUZZED(-461.529);
                    {
                        GLF_live11z = GLF_live11a.y / GLF_live11a.x;
                    }
                    {
                        {
                            vec2 GLF_live26center = _GLF_FUZZED(vec2(5.7, -8447.4807));
                            int GLF_live26looplimiter0 = 0;
                            int GLF_live26msb8 = _GLF_FUZZED(-57886);
                            vec2 GLF_live26position = _GLF_FUZZED(((-8.3) - vec2(841.470, 441.570)));
                            vec3 GLF_live26result = _GLF_FUZZED(vec3(0.8, -1.2, 32.37));
                            for (int GLF_live26i = bitfieldInsert(35, 0, 0, bitfieldExtract(int(GLF_live26resolution.x), 0, 1)); GLF_live26i >= bitfieldReverse(bitfieldExtract(int(GLF_live26resolution.x), 0, 1)); GLF_live26i--) {
                                if (GLF_live26looplimiter0 >= 4) {
                                    break;
                                }
                                GLF_live26looplimiter0++;
                                {
                                    vec3 GLF_live26d = _GLF_FUZZED(vec3(904.729, vec2(-5.6, 6.6)));
                                    GLF_live26d = GLF_live26drawShape(GLF_live26position, GLF_live26center + vec2(sin(float(GLF_live26i) / (float(bitCount(GLF_live26msb8)) * 10.0) + GLF_live26time) / 4.0 * float(bitCount(GLF_live26msb8)), float(bitfieldExtract(int(GLF_live26resolution.x), 0, 1))), vec3(0.01 + sin(float(GLF_live26i) / 100.0 * float(bitCount(GLF_live26msb8))), 0.01, float(GLF_live26i)));
                                    if (length(GLF_live26d) <= float(bitfieldExtract(int(GLF_live26resolution.x), 0, 1))) {
                                        continue;
                                    }
                                    GLF_live26result = vec3(GLF_live26d);
                                }
                            }
                        }
                        {
                            ;
                        }
                    }
                }
                GLF_live6temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6k++, 10)] = GLF_live6data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6i++, 10)];
            }
            {
                int GLF_live9high = _GLF_FUZZED(85131);
                int GLF_live9low = _GLF_FUZZED((-(-(-7926))));
                int GLF_live9m = _GLF_FUZZED((87392 * 73302));
                {
                    int GLF_live9looplimiter3 = 0;
                    for (int GLF_live9i = GLF_live9low; GLF_live9i < GLF_live9high; GLF_live9i += 2 * GLF_live9m) {
                        if (GLF_live9looplimiter3 >= 4) {
                            {
                                ivec2 GLF_live18pos = _GLF_FUZZED(((~ivec2(-48119, 32963)) & 27973));
                                {
                                    if (GLF_live18pos.x < GLF_live18dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18pos.y, 256)] + 15 && GLF_live18pos.x > GLF_live18dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18pos.y, 256)] - 15) {
                                        float GLF_live18p = (15.0 - abs(float(GLF_live18pos.x - GLF_live18dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18pos.y, 256)]))) / 15.0;
                                        ;
                                    }
                                    GLF_live18pos.y++;
                                }
                                {
                                    vec2 GLF_live23coord = _GLF_FUZZED(vec2(9504.7930, -4.1));
                                    int GLF_live23i = _GLF_FUZZED(ivec2(42639, 37755).g);
                                    vec4 GLF_live23res = _GLF_FUZZED(vec4(-3.0, 0.3, 8.9, -9.2));
                                    float GLF_live23uvstep = _GLF_FUZZED((-(-1.4)));
                                    {
                                        {
                                            int GLF_live23looplimiter0 = 0;
                                            for (int GLF_live23j = 0; GLF_live23j < 3; GLF_live23j++) {
                                                if (GLF_live23looplimiter0 >= 3) {
                                                    break;
                                                }
                                                GLF_live23looplimiter0++;
                                                {
                                                    GLF_live23res += texture(GLF_live23tex, GLF_live23coord + vec2(float(GLF_live23i - 1) * GLF_live23uvstep, float(GLF_live23j - 1) * GLF_live23uvstep)) * GLF_live23weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live23i * 3 + GLF_live23j, 9)];
                                                }
                                            }
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
                            {
                                int GLF_live26msb8 = _GLF_FUZZED(-8825);
                                vec2 GLF_live26position = _GLF_FUZZED(vec2(7284.6356, -4.1));
                                if (abs(GLF_live26position.y - GLF_live26position.x) < 0.5) {
                                    GLF_live26b_b = clamp(GLF_live26b_b * float(bitCount(GLF_live26msb8)) * 3.0, float(bitfieldExtract(int(GLF_live26resolution.x), 0, 1)), float(bitCount(GLF_live26msb8)));
                                }
                            }
                        }
                        {
                            {
                                {
                                    int GLF_live26msb8 = _GLF_FUZZED(-15178);
                                    {
                                        GLF_live26b_b = clamp(GLF_live26b_b * float(bitCount(GLF_live26msb8)) * 3.0, float(bitfieldExtract(int(GLF_live26resolution.x), 0, 1)), float(bitCount(GLF_live26msb8)));
                                    }
                                }
                                {
                                    ;
                                }
                                {
                                    int GLF_live26msb8 = _GLF_FUZZED(7561);
                                    {
                                        GLF_live26b_b = clamp(GLF_live26b_b * float(bitCount(GLF_live26msb8)) * 3.0, float(bitfieldExtract(int(GLF_live26resolution.x), 0, 1)), float(bitCount(GLF_live26msb8)));
                                    }
                                }
                            }
                            {
                                vec2 GLF_live23coord = _GLF_FUZZED(vec2(6.9, -34.18));
                                int GLF_live23i = _GLF_FUZZED(-41391);
                                vec4 GLF_live23res = _GLF_FUZZED(vec2(-1.5, 265.530).xyxy);
                                float GLF_live23uvstep = _GLF_FUZZED(-592.823);
                                {
                                    int GLF_live23looplimiter0 = 0;
                                    for (int GLF_live23j = 0; GLF_live23j < 3; GLF_live23j++) {
                                        if (GLF_live23looplimiter0 >= 3) {
                                            break;
                                        }
                                        GLF_live23looplimiter0++;
                                        {
                                            GLF_live23res += texture(GLF_live23tex, GLF_live23coord + vec2(float(GLF_live23i - 1) * GLF_live23uvstep, float(GLF_live23j - 1) * GLF_live23uvstep)) * GLF_live23weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live23i * 3 + GLF_live23j, 9)];
                                        }
                                    }
                                }
                            }
                            int GLF_live12looplimiter0 = 0;
                            if (GLF_live12looplimiter0 >= 7) {
                                ;
                            }
                            {
                                int GLF_live25a = _GLF_FUZZED(-98497);
                                int GLF_live25b = _GLF_FUZZED(64226);
                                int GLF_live25c = _GLF_FUZZED(-26707);
                                int GLF_live25d = _GLF_FUZZED((true ? (-23525) : int(true)));
                                vec2 GLF_live25uv = _GLF_FUZZED(vec2(9295.3515, 8.6));
                                {
                                    int GLF_live25looplimiter3 = 0;
                                    do {
                                        if (GLF_live25looplimiter3 >= 4) {
                                            break;
                                        }
                                        GLF_live25looplimiter3++;
                                        {
                                            GLF_live25uv.y -= step(GLF_live25injectionSwitch.y, GLF_live25uv.x) + float(GLF_live25a) + float(GLF_live25b) + float(GLF_live25c);
                                            GLF_live25d--;
                                        }
                                    } while (GLF_live25d > int(GLF_live25injectionSwitch.x));
                                }
                            }
                        }
                        GLF_live9looplimiter3++;
                        {
                            int GLF_live9from = GLF_live9i;
                            int GLF_live9mid = GLF_live9i + GLF_live9m - 1;
                            int GLF_live9to = min(GLF_live9i + 2 * GLF_live9m - 1, GLF_live9high);
                            GLF_live9merge(GLF_live9from, GLF_live9mid, GLF_live9to);
                        }
                        {
                            vec2 GLF_live22coord = _GLF_FUZZED((vec2(-5.5, 2196.7424) * 300.420));
                            float GLF_live22h = _GLF_FUZZED(824.495);
                            int GLF_live22i = _GLF_FUZZED(41427);
                            float GLF_live22refh = _GLF_FUZZED((0.1));
                            float GLF_live22slope = _GLF_FUZZED(50.27);
                            {
                                int GLF_live25a = _GLF_FUZZED(-29113);
                                int GLF_live25b = _GLF_FUZZED(13810);
                                int GLF_live25c = _GLF_FUZZED(64538);
                                vec2 GLF_live25uv = _GLF_FUZZED((vec2(-793.978, -6.3) * vec2(vec4(-551.720, 1.0, -2634.9422, 868.163))));
                                {
                                    int GLF_live25looplimiter2 = 0;
                                    do {
                                        if (GLF_live25looplimiter2 >= 4) {
                                            break;
                                        }
                                        GLF_live25looplimiter2++;
                                        {
                                            GLF_live25uv.y -= step(GLF_live25injectionSwitch.y, GLF_live25uv.x) + float(GLF_live25a) + float(GLF_live25b);
                                            GLF_live25uv.x += ldexp(GLF_live25injectionSwitch.y, isinf(GLF_live25uv.y + GLF_live25uv.x) ? findMSB(GLF_live25b) : findMSB(GLF_live25a));
                                            GLF_live25c--;
                                        }
                                    } while (GLF_live25c > int(GLF_live25injectionSwitch.x));
                                }
                            }
                            vec2 GLF_live22uvstep = _GLF_FUZZED((vec2(-7142.4721, -9916.5292) * mat2(2.8, 6.6, 88.66, -4.4)));
                            {
                                int GLF_live22looplimiter0 = 0;
                                while (GLF_live22h < GLF_live22refh && GLF_live22i < 32) {
                                    if (GLF_live22looplimiter0 >= 6) {
                                        break;
                                    }
                                    GLF_live22looplimiter0++;
                                    {
                                        GLF_live22coord -= GLF_live22uvstep;
                                        GLF_live22refh += GLF_live22slope;
                                        GLF_live22h = texture(GLF_live22tex, GLF_live22coord).y;
                                        GLF_live22i++;
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
                    {
                        bool GLF_live26c8 = _GLF_FUZZED(((-0.6) <= (-4.5)));
                        int GLF_live26msb8 = _GLF_FUZZED(-80291);
                        vec2 GLF_live26pos = _GLF_FUZZED(vec2(-8207.4061, 55.06));
                        vec3 GLF_live26setting = _GLF_FUZZED(vec3(98.63, (-2403.5464), 0.5));
                        if (!GLF_live26c8) {
                            ;
                        }
                    }
                }
                {
                    vec2 GLF_live26center = _GLF_FUZZED(vec2(4306.1027, 91.13));
                    int GLF_live26i = _GLF_FUZZED(2978);
                    int GLF_live26msb8 = _GLF_FUZZED(24336);
                    vec2 GLF_live26position = _GLF_FUZZED((false ? vec2(-2.3, 861.405) : vec2(1.4, 5.7)));
                    vec3 GLF_live26result = _GLF_FUZZED(vec3(531.311, -68.61, 6.1));
                    {
                        vec3 GLF_live26d = _GLF_FUZZED(vec3(904.729, vec2(-5.6, 6.6)));
                        GLF_live26d = GLF_live26drawShape(GLF_live26position, GLF_live26center + vec2(sin(float(GLF_live26i) / (float(bitCount(GLF_live26msb8)) * 10.0) + GLF_live26time) / 4.0 * float(bitCount(GLF_live26msb8)), float(bitfieldExtract(int(GLF_live26resolution.x), 0, 1))), vec3(0.01 + sin(float(GLF_live26i) / 100.0 * float(bitCount(GLF_live26msb8))), 0.01, float(GLF_live26i)));
                        if (length(GLF_live26d) <= float(bitfieldExtract(int(GLF_live26resolution.x), 0, 1))) {
                            ;
                        }
                        GLF_live26result = vec3(GLF_live26d);
                    }
                }
            }
        }
    }
    {
        int GLF_live6looplimiter2 = 0;
        for (int GLF_live6i = GLF_live6from; GLF_live6i <= GLF_live6to; GLF_live6i++) {
            if (GLF_live6looplimiter2 >= 7) {
                {
                    int GLF_live14looplimiter0 = 0;
                    if (GLF_live14looplimiter0 >= 5) {
                        ;
                        {
                            bool GLF_live26c5 = _GLF_FUZZED(false);
                            int GLF_live26msb8 = _GLF_FUZZED(79836);
                            vec2 GLF_live26pos = _GLF_FUZZED((vec2(-4.2, 4.2) + vec2(0.7, 4.4)));
                            vec3 GLF_live26setting = _GLF_FUZZED(vec3(1168.4486, -7599.9854, -5.9));
                            if (!GLF_live26c5) {
                                ;
                            }
                        }
                        {
                            {
                                ;
                            }
                        }
                    }
                }
                {
                    int GLF_live23looplimiter0 = 0;
                    if (GLF_live23looplimiter0 >= 3) {
                        ;
                    }
                }
                break;
            }
            GLF_live6looplimiter2++;
            {
                {
                    {
                        int GLF_live23looplimiter0 = 0;
                        if (GLF_live23looplimiter0 >= 3) {
                            ;
                        }
                    }
                    vec2 GLF_live19center = _GLF_FUZZED(vec2(-97.26, -414.480));
                    int GLF_live19i = _GLF_FUZZED(-6757);
                    int GLF_live19looplimiter0 = 0;
                    int GLF_live19msb8 = _GLF_FUZZED(-6299);
                    vec2 GLF_live19position = _GLF_FUZZED(((+(vec2(5.3, 752.287) * mat2(-9.5, -48.10, 1.0, 1.6))) - vec2(-1920.8239, 4.4)));
                    vec3 GLF_live19result = _GLF_FUZZED(vec3(-58.40));
                    {
                        if (GLF_live19looplimiter0 >= 4) {
                            ;
                        }
                        GLF_live19looplimiter0++;
                        {
                            vec3 GLF_live19d = _GLF_FUZZED((false ? vec3(9.0, 2678.5170, 5.9) : vec3(835.653, -95.09, -6895.0876)));
                            GLF_live19d = GLF_live19drawShape(GLF_live19position, GLF_live19center + vec2(sin(float(GLF_live19i) / (float(bitCount(GLF_live19msb8)) * 10.0) + GLF_live19time) / 4.0 * float(bitCount(GLF_live19msb8)), float(bitfieldExtract(int(GLF_live19resolution.x), 0, 1))), vec3(0.01 + sin(float(GLF_live19i) / 100.0 * float(bitCount(GLF_live19msb8))), 0.01, float(GLF_live19i)));
                            if (length(GLF_live19d) <= float(bitfieldExtract(int(GLF_live19resolution.x), 0, 1))) {
                                ;
                            }
                            GLF_live19result = vec3(GLF_live19d);
                        }
                    }
                    {
                        {
                            ;
                        }
                    }
                }
                GLF_live6data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6i, 10)] = GLF_live6temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6i, 10)];
                {
                    int GLF_live26looplimiter0 = 0;
                    if (GLF_live26looplimiter0 >= 4) {
                        ;
                    }
                }
                {
                    ivec2 GLF_live16p = _GLF_FUZZED((-ivec2(-16598, -64578)));
                    {
                        GLF_live16p = GLF_live16iter(GLF_live16p);
                    }
                }
            }
        }
        {
            int GLF_live23looplimiter1 = 0;
            if (GLF_live23looplimiter1 >= 3) {
                ;
            }
        }
    }
}

const int GLF_live5dp[256] = int[256](115, 133, 150, 164, 176, 184, 190, 192, 191, 187, 181, 172, 163, 153, 143, 134, 126, 120, 116, 114, 114, 117, 121, 127, 134, 141, 148, 154, 159, 162, 163, 161, 157, 151, 143, 134, 124, 113, 103, 94, 87, 82, 79, 80, 84, 91, 101, 114, 130, 146, 164, 182, 199, 215, 229, 240, 249, 254, 256, 254, 250, 243, 233, 223, 212, 200, 190, 180, 172, 166, 163, 161, 162, 164, 169, 174, 179, 185, 190, 193, 195, 195, 192, 188, 180, 171, 161, 149, 137, 125, 114, 105, 97, 93, 91, 93, 98, 106, 117, 130, 145, 161, 177, 193, 208, 221, 231, 239, 243, 244, 242, 236, 228, 218, 207, 194, 181, 169, 158, 148, 141, 135, 132, 131, 132, 135, 138, 143, 147, 151, 154, 155, 155, 152, 146, 139, 129, 118, 106, 93, 80, 68, 58, 49, 43, 40, 41, 44, 51, 61, 73, 87, 103, 119, 134, 149, 162, 173, 181, 186, 188, 186, 181, 174, 164, 153, 141, 128, 116, 104, 94, 86, 81, 77, 76, 77, 80, 84, 89, 94, 98, 102, 104, 104, 102, 98, 92, 83, 73, 62, 50, 38, 26, 16, 8, 2, 0, 0, 4, 11, 21, 33, 48, 64, 81, 98, 114, 129, 141, 151, 158, 161, 161, 158, 152, 144, 134, 123, 112, 100, 90, 81, 73, 68, 65, 65, 67, 70, 75, 81, 87, 92, 97, 101, 103, 102, 100, 95, 88, 79, 69, 58, 47, 36, 26, 18, 13, 11, 11, 15, 22, 32, 45, 60, 77, 94);

struct _GLF_struct_3 {
    ivec4 _f0;
    int i;
    float _f1;
    mat2x3 _f2;
    mat4 _f3;
    vec3 _f4;
};

struct _GLF_struct_2 {
    uvec3 _f0;
};

struct _GLF_struct_1 {
    vec2 _f0;
    _GLF_struct_2 _f1;
    mat4x2 _f2;
    mat2x3 _f3;
    vec4 _f4;
    vec3 _f5;
    int _f6;
};

struct _GLF_struct_0 {
    _GLF_struct_1 _f0;
    vec2 _f1;
    _GLF_struct_3 _f2;
    bool _f3;
    vec4 _f4;
    uvec2 _f5;
};

layout(set = 0, binding = 13) uniform buf13 {
    vec2 injectionSwitch;
};

layout(location = 0) out vec4 _GLF_color;

layout(set = 0, binding = 0) uniform buf0 {
    vec2 resolution;
};

void main() {
    float A[50];
    for (_GLF_struct_0 _GLF_struct_replacement_0 = _GLF_struct_0(_GLF_struct_1(vec2(1.0, 1.0), _GLF_struct_2(uvec3(1u, 1u, 1u)), mat4x2(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), mat2x3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0), vec4(1.0, 1.0, 1.0, 1.0), vec3(1.0, 1.0, 1.0), 1), vec2(1.0, 1.0), _GLF_struct_3(ivec4(1, 1, 1, 1), 0, 1.0, mat2x3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0), mat4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), vec3(1.0, 1.0, 1.0)), true, vec4(1.0, 1.0, 1.0, 1.0), uvec2(1u, 1u)); _GLF_struct_replacement_0._f2.i < 200; _GLF_struct_replacement_0._f2.i++) {
        {
            ivec2 GLF_live16p = _GLF_FUZZED((ivec2(69078, -99357) & ivec2(-93298, 65710)));
            {
                GLF_live16p.y++;
            }
            {
                {
                    ;
                }
            }
        }
        {
            int GLF_live23looplimiter0 = 0;
            if (GLF_live23looplimiter0 >= 3) {
                ;
            }
        }
        {
            {
                vec3 GLF_live24color = _GLF_FUZZED(vec3(vec2(295.173, 265.611), -5826.2719));
                int GLF_live24count = _GLF_FUZZED(-79278);
                int GLF_live24looplimiter5 = 0;
                {
                    if (GLF_live24looplimiter5 >= 4) {
                        ;
                    }
                    GLF_live24looplimiter5++;
                    {
                        GLF_live24color -= GLF_live24palette(vec3(float(GLF_live24obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_live24injectionSwitch.y), 10)]) * 0.1), vec3(0.8), trunc(vec3(0.1)), vec3(GLF_live24injectionSwitch.x, 0.6, float(GLF_live24obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_live24injectionSwitch.x), 10)]) * 0.1));
                        GLF_live24count++;
                    }
                }
            }
            {
                int GLF_live16looplimiter0 = 0;
                if (GLF_live16looplimiter0 >= 6) {
                    ;
                }
            }
            {
                ;
            }
        }
        if (_GLF_struct_replacement_0._f2.i >= int(resolution.x)) {
            break;
        }
        if ((4 * (_GLF_struct_replacement_0._f2.i / 4)) == _GLF_struct_replacement_0._f2.i) {
            A[_GLF_struct_replacement_0._f2.i / 4] = float(_GLF_struct_replacement_0._f2.i);
        }
    }
    for (int i = 0; i < 50; i++) {
        if (i < int(gl_FragCoord.x)) {
            break;
            {
                {
                    GLF_live13_GLF_color = vec4(0.0, 0.0, 0.0, 1.0);
                }
            }
            {
                {
                    ;
                }
                {
                    {
                        ;
                    }
                }
            }
        }
        if (i > 0) {
            {
                {
                    ;
                    {
                        {
                            ivec2 GLF_live18pos = _GLF_FUZZED((ivec2(8641, -79539) + 58309));
                            {
                                float GLF_live18p = (15.0 - abs(float(GLF_live18pos.x - GLF_live18dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18pos.y, 256)]))) / 15.0;
                                ;
                            }
                        }
                        float GLF_live14xCoord = _GLF_FUZZED((3.0 + 2.9));
                        float GLF_live14yCoord = _GLF_FUZZED(545.188);
                        {
                            ;
                        }
                    }
                }
                {
                    int GLF_live3looplimiter0 = 0;
                    if (GLF_live3looplimiter0 >= 7) {
                        ;
                        {
                            {
                                {
                                    ;
                                    {
                                        int GLF_live26looplimiter0 = 0;
                                        if (GLF_live26looplimiter0 >= 4) {
                                            ;
                                        }
                                    }
                                }
                            }
                            int GLF_live18looplimiter0 = 0;
                            ivec2 GLF_live18pos = _GLF_FUZZED(ivec2(-28939, -21915));
                            {
                                if (GLF_live18looplimiter0 >= 5) {
                                    ;
                                }
                                GLF_live18looplimiter0++;
                                {
                                    if (GLF_live18pos.x < GLF_live18dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18pos.y, 256)] + 15 && GLF_live18pos.x > GLF_live18dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18pos.y, 256)] - 15) {
                                        float GLF_live18p = (15.0 - abs(float(GLF_live18pos.x - GLF_live18dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18pos.y, 256)]))) / 15.0;
                                        ;
                                    }
                                    GLF_live18pos.y++;
                                }
                            }
                        }
                    }
                    {
                        vec2 GLF_live19center = _GLF_FUZZED(vec2(6.3, 0.1));
                        int GLF_live19i = _GLF_FUZZED((65722 + (-35276)));
                        int GLF_live19msb8 = _GLF_FUZZED(((50415 | (-54289)) | 22414));
                        vec2 GLF_live19position = _GLF_FUZZED((8.1 + vec2(-6.6, -1.9)));
                        vec3 GLF_live19result = _GLF_FUZZED(vec3(364.250, -90.74, -3.4));
                        {
                            vec3 GLF_live19d = _GLF_FUZZED((false ? vec3(9.0, 2678.5170, 5.9) : vec3(835.653, -95.09, -6895.0876)));
                            GLF_live19d = GLF_live19drawShape(GLF_live19position, GLF_live19center + vec2(sin(float(GLF_live19i) / (float(bitCount(GLF_live19msb8)) * 10.0) + GLF_live19time) / 4.0 * float(bitCount(GLF_live19msb8)), float(bitfieldExtract(int(GLF_live19resolution.x), 0, 1))), vec3(0.01 + sin(float(GLF_live19i) / 100.0 * float(bitCount(GLF_live19msb8))), 0.01, float(GLF_live19i)));
                            if (length(GLF_live19d) <= float(bitfieldExtract(int(GLF_live19resolution.x), 0, 1))) {
                                ;
                            }
                            GLF_live19result = vec3(GLF_live19d);
                        }
                    }
                    {
                        {
                            ;
                        }
                    }
                }
                {
                    {
                        ;
                        {
                            vec2 GLF_live23coord = _GLF_FUZZED(((-5.2) - vec2(332.158, 498.256)));
                            int GLF_live23i = _GLF_FUZZED(ivec4(-39227, -66192, -97523, 54548).g);
                            int GLF_live23looplimiter1 = 0;
                            vec4 GLF_live23res = _GLF_FUZZED((((-1.1) + ((-1795.8096) + 7.1)) - (mat2x4(-79.94, 8251.0915, 78.66, -171.772, 6.1, -1.0, 1.6, -66.17) * vec2(-9892.5883, 16.53))));
                            float GLF_live23uvstep = _GLF_FUZZED(float(int(true)));
                            {
                                if (GLF_live23looplimiter1 >= 3) {
                                    ;
                                }
                                GLF_live23looplimiter1++;
                                {
                                    {
                                        int GLF_live23looplimiter0 = 0;
                                        for (int GLF_live23j = 0; GLF_live23j < 3; GLF_live23j++) {
                                            if (GLF_live23looplimiter0 >= 3) {
                                                break;
                                            }
                                            GLF_live23looplimiter0++;
                                            {
                                                GLF_live23res += texture(GLF_live23tex, GLF_live23coord + vec2(float(GLF_live23i - 1) * GLF_live23uvstep, float(GLF_live23j - 1) * GLF_live23uvstep)) * GLF_live23weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live23i * 3 + GLF_live23j, 9)];
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            A[i] += A[i - 1];
            {
                ivec2 GLF_live16p = _GLF_FUZZED((true ? ivec2(-20005, -39106) : ivec2(-45984, 12731)));
                {
                    GLF_live16p.y++;
                }
                {
                    vec2 GLF_live22coord = _GLF_FUZZED((+vec2(-6.5, 8184.4984)));
                    float GLF_live22h = _GLF_FUZZED(2369.6794);
                    int GLF_live22i = _GLF_FUZZED(((-54321) - 415));
                    float GLF_live22refh = _GLF_FUZZED(-8.7);
                    float GLF_live22slope = _GLF_FUZZED(1.1);
                    vec2 GLF_live22uvstep = _GLF_FUZZED((vec2(4.6, -7.5) * (-4.1)));
                    {
                        GLF_live22coord -= GLF_live22uvstep;
                        GLF_live22refh += GLF_live22slope;
                        GLF_live22h = texture(GLF_live22tex, GLF_live22coord).y;
                        GLF_live22i++;
                        {
                            vec2 GLF_live23coord = _GLF_FUZZED((+vec2(float(-42076), -552.990)));
                            int GLF_live23looplimiter1 = 0;
                            vec4 GLF_live23res = _GLF_FUZZED((mat3x4(3114.6705, 7.4, 1818.5283, 40.88, -1.1, 892.896, 6.0, 50.16, -7680.4405, -631.325, -531.566, -14.79) * vec3(48.77, -1.1, 7.4)).zwyy);
                            float GLF_live23uvstep = _GLF_FUZZED(-5718.0608);
                            for (int GLF_live23i = 0; GLF_live23i < 3; GLF_live23i++) {
                                if (GLF_live23looplimiter1 >= 3) {
                                    break;
                                }
                                GLF_live23looplimiter1++;
                                {
                                    {
                                        int GLF_live23looplimiter0 = 0;
                                        for (int GLF_live23j = 0; GLF_live23j < 3; GLF_live23j++) {
                                            if (GLF_live23looplimiter0 >= 3) {
                                                break;
                                            }
                                            GLF_live23looplimiter0++;
                                            {
                                                GLF_live23res += texture(GLF_live23tex, GLF_live23coord + vec2(float(GLF_live23i - 1) * GLF_live23uvstep, float(GLF_live23j - 1) * GLF_live23uvstep)) * GLF_live23weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live23i * 3 + GLF_live23j, 9)];
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
                float GLF_live4alpha1 = _GLF_FUZZED(float(false));
                int GLF_live4looplimiter1 = 0;
                {
                    int GLF_live18looplimiter0 = 0;
                    if (GLF_live18looplimiter0 >= 5) {
                        ;
                    }
                    {
                        vec2 GLF_live23coord = _GLF_FUZZED((vec4(56.28, 10.90, 83.83, -60.63).sp - vec3(-6.1, 2.0, 209.754).p));
                        int GLF_live23looplimiter1 = 0;
                        vec4 GLF_live23res = _GLF_FUZZED(vec4(3023.5703, -81.18, 4725.2939, -2.2));
                        float GLF_live23uvstep = _GLF_FUZZED(4.6);
                        for (int GLF_live23i = 0; GLF_live23i < 3; GLF_live23i++) {
                            if (GLF_live23looplimiter1 >= 3) {
                                break;
                            }
                            GLF_live23looplimiter1++;
                            {
                                {
                                    int GLF_live23looplimiter0 = 0;
                                    for (int GLF_live23j = 0; GLF_live23j < 3; GLF_live23j++) {
                                        if (GLF_live23looplimiter0 >= 3) {
                                            break;
                                        }
                                        GLF_live23looplimiter0++;
                                        {
                                            GLF_live23res += texture(GLF_live23tex, GLF_live23coord + vec2(float(GLF_live23i - 1) * GLF_live23uvstep, float(GLF_live23j - 1) * GLF_live23uvstep)) * GLF_live23weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live23i * 3 + GLF_live23j, 9)];
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                {
                    vec3 GLF_live7col = _GLF_FUZZED((+(mat2x3(9.4, -1.9, -9526.7746, -70.42, 4.1, -2.8) * vec2(-1199.2153, -9.6))));
                    {
                        vec2 GLF_live22coord = _GLF_FUZZED(vec2(4937.6377, -2298.6780));
                        float GLF_live22h = _GLF_FUZZED(-6642.8086);
                        int GLF_live22i = _GLF_FUZZED((8406 + (-49725)));
                        float GLF_live22refh = _GLF_FUZZED(7904.9669);
                        float GLF_live22slope = _GLF_FUZZED(826.702);
                        vec2 GLF_live22uvstep = _GLF_FUZZED((mat2(7.6, -5442.1889, 0.9, -887.251) * (37.65 - vec2(-8694.4624, 607.706))));
                        {
                            int GLF_live22looplimiter0 = 0;
                            while (GLF_live22h < GLF_live22refh && GLF_live22i < 32) {
                                if (GLF_live22looplimiter0 >= 6) {
                                    break;
                                }
                                GLF_live22looplimiter0++;
                                {
                                    {
                                        bool GLF_live26c2 = _GLF_FUZZED((int(false) >= 70020));
                                        if (!GLF_live26c2) {
                                            ;
                                        }
                                    }
                                    GLF_live22coord -= GLF_live22uvstep;
                                    GLF_live22refh += GLF_live22slope;
                                    GLF_live22h = texture(GLF_live22tex, GLF_live22coord).y;
                                    GLF_live22i++;
                                }
                                {
                                    vec2 GLF_live26center = _GLF_FUZZED(vec3(-7.0, 5625.4781, 51.16).bb);
                                    int GLF_live26i = _GLF_FUZZED(int(true));
                                    int GLF_live26looplimiter0 = 0;
                                    int GLF_live26msb8 = _GLF_FUZZED(int(137397u));
                                    vec2 GLF_live26position = _GLF_FUZZED(vec2(-929.406, -9.3));
                                    vec3 GLF_live26result = _GLF_FUZZED((-vec3(-1979.7048, -360.015, 3.1)));
                                    {
                                        if (GLF_live26looplimiter0 >= 4) {
                                            ;
                                        }
                                        GLF_live26looplimiter0++;
                                        {
                                            vec3 GLF_live26d = _GLF_FUZZED(vec3(904.729, vec2(-5.6, 6.6)));
                                            GLF_live26d = GLF_live26drawShape(GLF_live26position, GLF_live26center + vec2(sin(float(GLF_live26i) / (float(bitCount(GLF_live26msb8)) * 10.0) + GLF_live26time) / 4.0 * float(bitCount(GLF_live26msb8)), float(bitfieldExtract(int(GLF_live26resolution.x), 0, 1))), vec3(0.01 + sin(float(GLF_live26i) / 100.0 * float(bitCount(GLF_live26msb8))), 0.01, float(GLF_live26i)));
                                            if (length(GLF_live26d) <= float(bitfieldExtract(int(GLF_live26resolution.x), 0, 1))) {
                                                ;
                                            }
                                            GLF_live26result = vec3(GLF_live26d);
                                        }
                                    }
                                }
                            }
                        }
                    }
                    vec2 GLF_live7uv = _GLF_FUZZED(vec2(2.5, 6047.7909));
                    {
                        float GLF_live7stripe = GLF_live7compute_stripe(tan((GLF_live7uv.x + GLF_live7uv.y) * 20.0), GLF_live7uv.x + GLF_live7uv.y);
                        GLF_live7col = mix(vec3(0.5, GLF_live7uv.x, 0.1), vec3(.4, 0, .5), GLF_live7stripe);
                        GLF_live7_GLF_color = vec4(GLF_live7col, 1.0);
                        ;
                    }
                }
                vec4 GLF_live4matrix_u = _GLF_FUZZED((false ? vec4(478.493, 5.5, -224.767, 0.8) : vec4(9976.6041, 3742.6232, -1.9, -12.57)));
                int GLF_live4u = _GLF_FUZZED(32129);
                {
                    if (GLF_live4looplimiter1 >= 6) {
                        {
                            int GLF_live22looplimiter0 = 0;
                            if (GLF_live22looplimiter0 >= 6) {
                                ;
                            }
                        }
                        ;
                    }
                    GLF_live4looplimiter1++;
                    {
                        GLF_live4alpha1 += GLF_live4matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_live4u, 4)] * GLF_live4matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_live4u, 4)];
                        {
                            float GLF_live14c_im = _GLF_FUZZED(((-2.9) * (-49.57)));
                            float GLF_live14c_re = _GLF_FUZZED(53.51);
                            {
                                vec2 GLF_live22coord = _GLF_FUZZED(((95.11 * 0.2) - vec2(436.173, 6.8)));
                                float GLF_live22h = _GLF_FUZZED(((-0.6) * ((-815.260) * float(140081u))));
                                int GLF_live22i = _GLF_FUZZED((~(47471 + (-28315))));
                                float GLF_live22refh = _GLF_FUZZED(54.07);
                                float GLF_live22slope = _GLF_FUZZED((+(false ? (-7.5) : (-1772.1894))));
                                vec2 GLF_live22uvstep = _GLF_FUZZED(vec2(-12.19));
                                {
                                    {
                                        bool GLF_live26c1 = _GLF_FUZZED(((uvec4(81224u, 136849u, 162717u, 1741u) | uvec4(125992u, 136529u, 45125u, 42987u)) == uvec4(116229u, 43177u, 172562u, 140563u)));
                                        if (!GLF_live26c1) {
                                            ;
                                        }
                                    }
                                    int GLF_live22looplimiter0 = 0;
                                    while (GLF_live22h < GLF_live22refh && GLF_live22i < 32) {
                                        if (GLF_live22looplimiter0 >= 6) {
                                            break;
                                        }
                                        GLF_live22looplimiter0++;
                                        {
                                            GLF_live22coord -= GLF_live22uvstep;
                                            GLF_live22refh += GLF_live22slope;
                                            GLF_live22h = texture(GLF_live22tex, GLF_live22coord).y;
                                            {
                                                int GLF_live24i = _GLF_FUZZED(-12800);
                                                {
                                                    GLF_live24obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_live24i, 10)] = (10 - GLF_live24i) * int(GLF_live24injectionSwitch.y);
                                                }
                                            }
                                            GLF_live22i++;
                                            {
                                                int GLF_live25a = _GLF_FUZZED(-36249);
                                                vec2 GLF_live25uv = _GLF_FUZZED(vec2(vec4(-692.607, -8344.6135, 6.5, 72.83)));
                                                {
                                                    GLF_live25uv.y -= step(GLF_live25injectionSwitch.y, GLF_live25uv.x);
                                                    GLF_live25uv.x -= tanh(GLF_live25uv.x * 0.25) / ldexp(GLF_live25injectionSwitch.y, findMSB(GLF_live25a));
                                                    GLF_live25a--;
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            {
                                {
                                    vec2 GLF_live22coord = _GLF_FUZZED(vec2(-7.3, -127.284));
                                    float GLF_live22h = _GLF_FUZZED(-7005.1438);
                                    int GLF_live22i = _GLF_FUZZED(-79465);
                                    int GLF_live22looplimiter0 = 0;
                                    float GLF_live22refh = _GLF_FUZZED(-0.9);
                                    float GLF_live22slope = _GLF_FUZZED((-0.7));
                                    vec2 GLF_live22uvstep = _GLF_FUZZED(vec2(-0.7, 11.37));
                                    while (GLF_live22h < GLF_live22refh && GLF_live22i < 32) {
                                        if (GLF_live22looplimiter0 >= 6) {
                                            break;
                                        }
                                        GLF_live22looplimiter0++;
                                        {
                                            GLF_live22coord -= GLF_live22uvstep;
                                            GLF_live22refh += GLF_live22slope;
                                            GLF_live22h = texture(GLF_live22tex, GLF_live22coord).y;
                                            GLF_live22i++;
                                        }
                                    }
                                }
                                int GLF_live16looplimiter1 = 0;
                                ivec2 GLF_live16p = _GLF_FUZZED((ivec2(-76143, -72127) & ivec2(51976, -57167)));
                                while (GLF_live16p.x > 15) {
                                    if (GLF_live16looplimiter1 >= 6) {
                                        break;
                                    }
                                    GLF_live16looplimiter1++;
                                    {
                                        vec3 GLF_live19d = _GLF_FUZZED((+(vec4(-3301.3799, 97.05, 723.777, 7.8) * mat3x4(-65.30, -3.5, -3967.3769, -42.86, 13.35, 4.1, -0.2, -11.04, 4826.3330, 20.16, -706.957, -4.5))));
                                        if (length(GLF_live19d) <= float(bitfieldExtract(int(GLF_live19resolution.x), 0, 1))) {
                                            ;
                                        }
                                    }
                                    {
                                        {
                                            {
                                                ;
                                            }
                                        }
                                        {
                                            vec3 GLF_live24color = _GLF_FUZZED(vec3(-7.4, -0.8, 949.780));
                                            int GLF_live24count = _GLF_FUZZED(-10049);
                                            int GLF_live24looplimiter5 = 0;
                                            {
                                                if (GLF_live24looplimiter5 >= 4) {
                                                    ;
                                                }
                                                GLF_live24looplimiter5++;
                                                {
                                                    GLF_live24color -= GLF_live24palette(vec3(float(GLF_live24obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_live24injectionSwitch.y), 10)]) * 0.1), vec3(0.8), trunc(vec3(0.1)), vec3(GLF_live24injectionSwitch.x, 0.6, float(GLF_live24obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_live24injectionSwitch.x), 10)]) * 0.1));
                                                    GLF_live24count++;
                                                }
                                            }
                                        }
                                        GLF_live16p.x -= 16;
                                        {
                                            int GLF_live23looplimiter1 = 0;
                                            if (GLF_live23looplimiter1 >= 3) {
                                                ;
                                            }
                                        }
                                    }
                                }
                            }
                            int GLF_live14iteration = _GLF_FUZZED((~77825));
                            int GLF_live14looplimiter0 = 0;
                            float GLF_live14x = _GLF_FUZZED((false ? 6927.6289 : (true ? 8.3 : 4.8)));
                            float GLF_live14y = _GLF_FUZZED(vec3(-6777.8542, 0.6, 785.104).p);
                            {
                                {
                                    ;
                                }
                            }
                            for (int GLF_live14k = 0; GLF_live14k < 1000; GLF_live14k++) {
                                if (GLF_live14looplimiter0 >= 5) {
                                    break;
                                }
                                GLF_live14looplimiter0++;
                                {
                                    if (GLF_live14x * GLF_live14x + GLF_live14y * GLF_live14y > 4.0) {
                                        {
                                            {
                                                {
                                                    vec2 GLF_live23coord = _GLF_FUZZED(vec2(-981.233, -3467.3327));
                                                    int GLF_live23looplimiter1 = 0;
                                                    vec4 GLF_live23res = _GLF_FUZZED(vec4(2093.8273, -2054.4851, 2482.2571, -8615.4367));
                                                    float GLF_live23uvstep = _GLF_FUZZED(float((588.937 >= (-5072.1245))));
                                                    for (int GLF_live23i = 0; GLF_live23i < 3; GLF_live23i++) {
                                                        if (GLF_live23looplimiter1 >= 3) {
                                                            break;
                                                        }
                                                        GLF_live23looplimiter1++;
                                                        {
                                                            {
                                                                int GLF_live23looplimiter0 = 0;
                                                                for (int GLF_live23j = 0; GLF_live23j < 3; GLF_live23j++) {
                                                                    if (GLF_live23looplimiter0 >= 3) {
                                                                        break;
                                                                    }
                                                                    GLF_live23looplimiter0++;
                                                                    {
                                                                        GLF_live23res += texture(GLF_live23tex, GLF_live23coord + vec2(float(GLF_live23i - 1) * GLF_live23uvstep, float(GLF_live23j - 1) * GLF_live23uvstep)) * GLF_live23weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live23i * 3 + GLF_live23j, 9)];
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                                ;
                                            }
                                        }
                                        break;
                                    }
                                    float GLF_live14x_new = GLF_live14x * GLF_live14x - GLF_live14y * GLF_live14y + GLF_live14c_re;
                                    GLF_live14y = 2.0 * GLF_live14x * GLF_live14y + GLF_live14c_im;
                                    GLF_live14x = GLF_live14x_new;
                                    GLF_live14iteration++;
                                }
                            }
                        }
                        {
                            bool GLF_live7c1 = _GLF_FUZZED((mat2x3(5.4, 764.109, -3110.3961, -496.882, 774.803, 6488.8218) == mat2x3(-65.56, 8478.2940, 822.122, -7.1, 7490.3338, -3.3)));
                            vec3 GLF_live7col = _GLF_FUZZED(vec3(-1.5, -239.648, 49.89));
                            vec2 GLF_live7uv = _GLF_FUZZED(vec2(86.67, 40.43));
                            {
                                int GLF_live19looplimiter0 = 0;
                                {
                                    vec2 GLF_live23coord = _GLF_FUZZED(vec2(5.7, -9394.1118));
                                    int GLF_live23i = _GLF_FUZZED(79091);
                                    int GLF_live23j = _GLF_FUZZED(((+47572) ^ (-50895)));
                                    vec4 GLF_live23res = _GLF_FUZZED(vec4(-2071.2720, -286.828, -63.13, 11.85));
                                    float GLF_live23uvstep = _GLF_FUZZED((+1865.0547));
                                    {
                                        GLF_live23res += texture(GLF_live23tex, GLF_live23coord + vec2(float(GLF_live23i - 1) * GLF_live23uvstep, float(GLF_live23j - 1) * GLF_live23uvstep)) * GLF_live23weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live23i * 3 + GLF_live23j, 9)];
                                    }
                                }
                                if (GLF_live19looplimiter0 >= 4) {
                                    ;
                                }
                            }
                            {
                                int GLF_live26looplimiter0 = 0;
                                if (GLF_live26looplimiter0 >= 4) {
                                    ;
                                }
                            }
                            if (GLF_live7c1) {
                                float GLF_live7stripe = GLF_live7compute_stripe(cos((GLF_live7uv.x + GLF_live7uv.y) * 20.0), GLF_live7uv.x + GLF_live7uv.y);
                                GLF_live7col = mix(vec3(GLF_live7uv.x, 0, 0.75), vec3(.8, .7, GLF_live7uv.x), GLF_live7stripe);
                                GLF_live7_GLF_color = vec4(GLF_live7col, 1.0);
                                {
                                    int GLF_live19msb8 = _GLF_FUZZED(-25214);
                                    vec2 GLF_live19pos = _GLF_FUZZED(vec2(43.62, 7.6));
                                    vec3 GLF_live19setting = _GLF_FUZZED(vec3(3813.7830, -6.4, 30.10));
                                    {
                                        ;
                                    }
                                }
                                ;
                            }
                        }
                        {
                            {
                                int GLF_live25a = _GLF_FUZZED(ivec4(55760, 54254, -57007, -93045).tqqt.b);
                                int GLF_live25b = _GLF_FUZZED(28313);
                                int GLF_live25looplimiter1 = 0;
                                vec2 GLF_live25uv = _GLF_FUZZED(vec2(-1498.9553, 51.15));
                                do {
                                    if (GLF_live25looplimiter1 >= 4) {
                                        break;
                                    }
                                    GLF_live25looplimiter1++;
                                    {
                                        GLF_live25uv.y -= step(GLF_live25injectionSwitch.y, GLF_live25uv.x) + float(GLF_live25a);
                                        GLF_live25uv.x *= (isnan(GLF_live25uv.y) ? cosh(GLF_live25gl_FragCoord.y) : tanh(GLF_live25gl_FragCoord.x));
                                        GLF_live25b--;
                                    }
                                } while (GLF_live25b > int(GLF_live25injectionSwitch.x));
                            }
                            int GLF_live14looplimiter3 = 0;
                            {
                                ivec2 GLF_live18pos = _GLF_FUZZED(ivec2(-87171, -84605));
                                if (GLF_live18pos.x < GLF_live18dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18pos.y, 256)] + 15 && GLF_live18pos.x > GLF_live18dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18pos.y, 256)] - 15) {
                                    float GLF_live18p = (15.0 - abs(float(GLF_live18pos.x - GLF_live18dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18pos.y, 256)]))) / 15.0;
                                    ;
                                }
                            }
                            if (GLF_live14looplimiter3 >= 5) {
                                ;
                            }
                        }
                    }
                    {
                        {
                            {
                                vec3 GLF_live24color = _GLF_FUZZED((6.8 - vec3(6.3, 13.81, 1.2)));
                                int GLF_live24count = _GLF_FUZZED(-24371);
                                {
                                    int GLF_live24looplimiter3 = 0;
                                    do {
                                        if (GLF_live24looplimiter3 >= 4) {
                                            break;
                                        }
                                        GLF_live24looplimiter3++;
                                        {
                                            GLF_live24color += GLF_live24palette(vec3(0.5, float(GLF_live24obj.numbers[8]) * 0.1, 0.2), vec3(0.5), trunc(vec3(GLF_live24injectionSwitch.y)), vec3(float(GLF_live24obj.numbers[4]) * 0.1, GLF_live24injectionSwitch.x, 0.6));
                                            GLF_live24count++;
                                        }
                                    } while (GLF_live24count != GLF_live24obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_live24injectionSwitch.x), 10)]);
                                }
                            }
                            GLF_live13_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
                        }
                    }
                    {
                        int GLF_live19msb8 = _GLF_FUZZED(92315);
                        vec2 GLF_live19pos = _GLF_FUZZED((vec2(-3.3, -837.660) - 190.415));
                        vec3 GLF_live19setting = _GLF_FUZZED(vec3(6.4, -93.07, 51.96));
                        {
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
            {
                int GLF_live18looplimiter0 = 0;
                {
                    bool GLF_live26c6 = _GLF_FUZZED(true);
                    int GLF_live26msb8 = _GLF_FUZZED(43109);
                    vec2 GLF_live26pos = _GLF_FUZZED(vec2(7343.0861, 3415.7914));
                    vec3 GLF_live26setting = _GLF_FUZZED(vec3(48.47, 7698.3171, -5099.5337));
                    if (!GLF_live26c6) {
                        ;
                    }
                }
                if (GLF_live18looplimiter0 >= 5) {
                    ;
                }
            }
            {
                {
                    vec2 GLF_live22coord = _GLF_FUZZED((mat3x2((false ? mat2x4(-17.82, -5.5, 0.7, -89.36, -85.07, 5.7, -63.43, 0.2) : mat2x4(0.9, 6689.0558, -8038.3286, -44.27, -2.0, 3002.0570, -1.9, -4.8))) * vec3(-2284.5141, 4.0, 7748.7094)));
                    float GLF_live22h = _GLF_FUZZED((-19.08));
                    int GLF_live22i = _GLF_FUZZED(-47524);
                    int GLF_live22looplimiter0 = 0;
                    float GLF_live22refh = _GLF_FUZZED((-7.4));
                    float GLF_live22slope = _GLF_FUZZED(-3.0);
                    vec2 GLF_live22uvstep = _GLF_FUZZED((mat2(-5.1, -4.2, -3000.4690, 2.6) * vec2(-3913.0454, -6720.1657)));
                    while (GLF_live22h < GLF_live22refh && GLF_live22i < 32) {
                        if (GLF_live22looplimiter0 >= 6) {
                            break;
                        }
                        GLF_live22looplimiter0++;
                        {
                            GLF_live22coord -= GLF_live22uvstep;
                            GLF_live22refh += GLF_live22slope;
                            GLF_live22h = texture(GLF_live22tex, GLF_live22coord).y;
                            GLF_live22i++;
                        }
                    }
                }
                vec2 GLF_live9color = _GLF_FUZZED((vec2(3.7, -6650.3243) + (-33.72)));
                int GLF_live9i = _GLF_FUZZED((false ? (-87609) : (-63457)));
                int GLF_live9looplimiter7 = 0;
                vec3 GLF_live9vecCoor = _GLF_FUZZED((false ? vec3(270.894, 1.8, 507.243) : vec3(-659.708, 42.91, 2278.7578)));
                {
                    if (GLF_live9looplimiter7 >= 4) {
                        ;
                    }
                    GLF_live9looplimiter7++;
                    {
                        float GLF_live20c_im = _GLF_FUZZED(7.8);
                        float GLF_live20c_re = _GLF_FUZZED(vec4(7029.9663, -9731.2687, -793.624, -7.6).x);
                        int GLF_live20iteration = _GLF_FUZZED(17727);
                        {
                            int GLF_live25a = _GLF_FUZZED(ivec3(37622, -52159, 13857).b);
                            int GLF_live25looplimiter0 = 0;
                            vec2 GLF_live25uv = _GLF_FUZZED(vec2(4.8, -8.6));
                            {
                                if (GLF_live25looplimiter0 >= 4) {
                                    ;
                                }
                                GLF_live25looplimiter0++;
                                {
                                    GLF_live25uv.y -= step(GLF_live25injectionSwitch.y, GLF_live25uv.x);
                                    GLF_live25uv.x -= tanh(GLF_live25uv.x * 0.25) / ldexp(GLF_live25injectionSwitch.y, findMSB(GLF_live25a));
                                    GLF_live25a--;
                                }
                            }
                        }
                        int GLF_live20looplimiter0 = 0;
                        {
                            {
                                ;
                            }
                        }
                        float GLF_live20x = _GLF_FUZZED(-3.3);
                        float GLF_live20y = _GLF_FUZZED(-5.1);
                        for (int GLF_live20k = 0; GLF_live20k < 1000; GLF_live20k++) {
                            if (GLF_live20looplimiter0 >= 5) {
                                break;
                            }
                            GLF_live20looplimiter0++;
                            {
                                if (GLF_live20x * GLF_live20x + GLF_live20y * GLF_live20y > 4.0) {
                                    break;
                                }
                                float GLF_live20x_new = GLF_live20x * GLF_live20x - GLF_live20y * GLF_live20y + GLF_live20c_re;
                                GLF_live20y = 2.0 * GLF_live20x * GLF_live20y + GLF_live20c_im;
                                GLF_live20x = GLF_live20x_new;
                                GLF_live20iteration++;
                            }
                        }
                    }
                    {
                        {
                            vec2 GLF_live22coord = _GLF_FUZZED((234.647 * vec2(-82.25, 4.7)));
                            float GLF_live22h = _GLF_FUZZED(((-5.7) + (750.255)));
                            int GLF_live22i = _GLF_FUZZED(-32397);
                            float GLF_live22refh = _GLF_FUZZED(vec2(-3.1, 9.5).x);
                            float GLF_live22slope = _GLF_FUZZED(5.3);
                            vec2 GLF_live22uvstep = _GLF_FUZZED(vec2(-6.1, -2.9));
                            {
                                int GLF_live22looplimiter0 = 0;
                                while (GLF_live22h < GLF_live22refh && GLF_live22i < 32) {
                                    if (GLF_live22looplimiter0 >= 6) {
                                        break;
                                        {
                                            int GLF_live25a = _GLF_FUZZED(38903);
                                            int GLF_live25b = _GLF_FUZZED(-49471);
                                            vec2 GLF_live25uv = _GLF_FUZZED(vec2(2646.5173, -6.8));
                                            {
                                                GLF_live25uv.y -= step(GLF_live25injectionSwitch.y, GLF_live25uv.x) + float(GLF_live25a);
                                                GLF_live25uv.x *= (isnan(GLF_live25uv.y) ? cosh(GLF_live25gl_FragCoord.y) : tanh(GLF_live25gl_FragCoord.x));
                                                GLF_live25b--;
                                            }
                                        }
                                    }
                                    GLF_live22looplimiter0++;
                                    {
                                        GLF_live22coord -= GLF_live22uvstep;
                                        GLF_live22refh += GLF_live22slope;
                                        GLF_live22h = texture(GLF_live22tex, GLF_live22coord).y;
                                        GLF_live22i++;
                                    }
                                }
                            }
                        }
                        if (int(GLF_live9gl_FragCoord[1]) < 30) {
                            GLF_live9color = fract(sin(GLF_live9vecCoor.yx - trunc(float(GLF_live9data[0]))));
                            {
                                {
                                    vec2 GLF_live23coord = _GLF_FUZZED(vec2(-8.7, -605.190));
                                    int GLF_live23i = _GLF_FUZZED((-98436));
                                    int GLF_live23looplimiter0 = 0;
                                    vec4 GLF_live23res = _GLF_FUZZED(vec4(-3.1, 46.17, 0.8, 201.479));
                                    float GLF_live23uvstep = _GLF_FUZZED(4.4);
                                    for (int GLF_live23j = 0; GLF_live23j < 3; GLF_live23j++) {
                                        if (GLF_live23looplimiter0 >= 3) {
                                            break;
                                        }
                                        GLF_live23looplimiter0++;
                                        {
                                            GLF_live23res += texture(GLF_live23tex, GLF_live23coord + vec2(float(GLF_live23i - 1) * GLF_live23uvstep, float(GLF_live23j - 1) * GLF_live23uvstep)) * GLF_live23weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live23i * 3 + GLF_live23j, 9)];
                                        }
                                    }
                                }
                                vec3 GLF_live21color = _GLF_FUZZED(vec3(8.4, 7.2, -733.190));
                                {
                                    GLF_live21color.x += float(GLF_live21obj.numbers[9]);
                                }
                            }
                            GLF_live9color[0] = dFdy(GLF_live9gl_FragCoord.y);
                            ;
                        } else {
                            {
                                int GLF_live18looplimiter0 = 0;
                                if (GLF_live18looplimiter0 >= 5) {
                                    ;
                                    {
                                        vec2 GLF_live22coord = _GLF_FUZZED(vec2(-7.4, 0.5));
                                        float GLF_live22h = _GLF_FUZZED(5.5);
                                        {
                                            vec3 GLF_live25color = _GLF_FUZZED((2.2 * vec3(2547.0662, 323.462, 3849.8690)));
                                            {
                                                GLF_live25color.yz += GLF_live25color.yz;
                                            }
                                        }
                                        int GLF_live22i = _GLF_FUZZED((ivec4(-90011, -26579, -3245, -44902).t + 28900));
                                        float GLF_live22refh = _GLF_FUZZED((-5.4));
                                        float GLF_live22slope = _GLF_FUZZED((-67.52));
                                        vec2 GLF_live22uvstep = _GLF_FUZZED(vec2(3.8, 2032.0811));
                                        {
                                            int GLF_live22looplimiter0 = 0;
                                            while (GLF_live22h < GLF_live22refh && GLF_live22i < 32) {
                                                if (GLF_live22looplimiter0 >= 6) {
                                                    break;
                                                }
                                                GLF_live22looplimiter0++;
                                                {
                                                    GLF_live22coord -= GLF_live22uvstep;
                                                    GLF_live22refh += GLF_live22slope;
                                                    {
                                                        {
                                                            ;
                                                        }
                                                    }
                                                    GLF_live22h = texture(GLF_live22tex, GLF_live22coord).y;
                                                    GLF_live22i++;
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            if (int(GLF_live9gl_FragCoord[1]) < 60) {
                                GLF_live9color = fract(sin(GLF_live9vecCoor.yx - trunc(float(GLF_live9data[1]))));
                                GLF_live9color[1] *= atan(faceforward(GLF_live9injectionSwitch, GLF_live9color.xx, GLF_live9vecCoor.yx).y);
                                {
                                    {
                                        ;
                                    }
                                }
                                ;
                            } else if (int(GLF_live9gl_FragCoord[1]) < 90) {
                                GLF_live9color = fract(sin(GLF_live9vecCoor.yx - trunc(float(GLF_live9data[2]))));
                                {
                                    vec2 GLF_live26center = _GLF_FUZZED(vec2(3536.8816, -8.0));
                                    int GLF_live26i = _GLF_FUZZED(77903);
                                    int GLF_live26looplimiter0 = 0;
                                    int GLF_live26msb8 = _GLF_FUZZED(int(66757u));
                                    vec2 GLF_live26position = _GLF_FUZZED(vec2(4.0, -1.4));
                                    vec3 GLF_live26result = _GLF_FUZZED(vec3(29.01, 0.4, -3641.9697));
                                    {
                                        if (GLF_live26looplimiter0 >= 4) {
                                            ;
                                        }
                                        GLF_live26looplimiter0++;
                                        {
                                            vec3 GLF_live26d = _GLF_FUZZED(vec3(904.729, vec2(-5.6, 6.6)));
                                            GLF_live26d = GLF_live26drawShape(GLF_live26position, GLF_live26center + vec2(sin(float(GLF_live26i) / (float(bitCount(GLF_live26msb8)) * 10.0) + GLF_live26time) / 4.0 * float(bitCount(GLF_live26msb8)), float(bitfieldExtract(int(GLF_live26resolution.x), 0, 1))), vec3(0.01 + sin(float(GLF_live26i) / 100.0 * float(bitCount(GLF_live26msb8))), 0.01, float(GLF_live26i)));
                                            if (length(GLF_live26d) <= float(bitfieldExtract(int(GLF_live26resolution.x), 0, 1))) {
                                                ;
                                            }
                                            GLF_live26result = vec3(GLF_live26d);
                                        }
                                    }
                                }
                                GLF_live9color.x += atanh(GLF_live9color.x) * cosh(GLF_live9injectionSwitch.y) * smoothstep(GLF_live9color, GLF_live9injectionSwitch, GLF_live9gl_FragCoord.yy).x;
                                ;
                            } else if (int(GLF_live9gl_FragCoord[1]) < 120) {
                                GLF_live9color = fract(acosh(clamp(GLF_live9vecCoor.yx - trunc(float(GLF_live9data[3])), 1.0, 1000.0)));
                                GLF_live9color.x += (isnan(GLF_live9gl_FragCoord.x) ? log2(GLF_live9gl_FragCoord.x) : log2(GLF_live9gl_FragCoord.y));
                                {
                                    vec2 GLF_live22coord = _GLF_FUZZED(vec2(-7.8, -403.215).xy.gr);
                                    float GLF_live22h = _GLF_FUZZED((+(-0.8)));
                                    int GLF_live22i = _GLF_FUZZED(14463);
                                    {
                                        vec2 GLF_live23coord = _GLF_FUZZED(vec2(-2.5, 48.18));
                                        int GLF_live23i = _GLF_FUZZED((~95089));
                                        int GLF_live23looplimiter0 = 0;
                                        vec4 GLF_live23res = _GLF_FUZZED(vec2(0.6, -1376.5805).rrgg);
                                        float GLF_live23uvstep = _GLF_FUZZED(float(72022u));
                                        for (int GLF_live23j = 0; GLF_live23j < 3; GLF_live23j++) {
                                            if (GLF_live23looplimiter0 >= 3) {
                                                break;
                                            }
                                            GLF_live23looplimiter0++;
                                            {
                                                GLF_live23res += texture(GLF_live23tex, GLF_live23coord + vec2(float(GLF_live23i - 1) * GLF_live23uvstep, float(GLF_live23j - 1) * GLF_live23uvstep)) * GLF_live23weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live23i * 3 + GLF_live23j, 9)];
                                            }
                                        }
                                    }
                                    int GLF_live22looplimiter0 = 0;
                                    float GLF_live22refh = _GLF_FUZZED(-54.67);
                                    float GLF_live22slope = _GLF_FUZZED(float(false));
                                    vec2 GLF_live22uvstep = _GLF_FUZZED(vec2(-295.131, -69.76));
                                    {
                                        if (GLF_live22looplimiter0 >= 6) {
                                            ;
                                        }
                                        GLF_live22looplimiter0++;
                                        {
                                            GLF_live22coord -= GLF_live22uvstep;
                                            GLF_live22refh += GLF_live22slope;
                                            GLF_live22h = texture(GLF_live22tex, GLF_live22coord).y;
                                            GLF_live22i++;
                                        }
                                    }
                                }
                                ;
                                {
                                    int GLF_live12i = _GLF_FUZZED(14993);
                                    int GLF_live12j = _GLF_FUZZED((false ? (-27510) : (-71271)));
                                    uint GLF_live12uselessOutVariable = _GLF_FUZZED(185422u);
                                    if (uint(GLF_live12j) < uaddCarry(uint(GLF_live12i), 1u, GLF_live12uselessOutVariable)) {
                                        {
                                            int GLF_live22looplimiter0 = 0;
                                            if (GLF_live22looplimiter0 >= 6) {
                                                ;
                                            }
                                        }
                                        ;
                                    }
                                    {
                                        ivec2 GLF_live18pos = _GLF_FUZZED(ivec4(74463, 60409, 80980, 92011).zw);
                                        {
                                            bool GLF_live19c4 = _GLF_FUZZED((mat2x3(-1.8, -69.51, 57.46, 3.1, 753.516, 7498.6226) != mat2x3(-9.3, -796.857, 9.3, 87.69, -8.9, 1.5)));
                                            if (!GLF_live19c4) {
                                                ;
                                                {
                                                    bool GLF_live26c6 = _GLF_FUZZED(((+mat4x3(282.686, 1101.0359, -8.3, -43.43, 2.0, -7.8, 1.6, -1505.4698, -3.4, -4.5, 8394.6439, 4.4)) == mat4x3(4374.7988, 9.5, 5.5, -6.8, 5.7, 2.1, 19.16, 4.1, -7223.9172, -8513.7261, 1525.3525, -222.029)));
                                                    int GLF_live26msb8 = _GLF_FUZZED(-93974);
                                                    vec2 GLF_live26pos = _GLF_FUZZED((false ? vec2(0.4, 1124.3437) : vec2(6.6, 847.465)));
                                                    vec3 GLF_live26setting = _GLF_FUZZED(vec3(89.73, 380.406, -30.23));
                                                    if (!GLF_live26c6) {
                                                        ;
                                                    }
                                                }
                                            }
                                        }
                                        {
                                            int GLF_live18looplimiter0 = 0;
                                            while (GLF_live18pos.y != 256) {
                                                if (GLF_live18looplimiter0 >= 5) {
                                                    break;
                                                }
                                                {
                                                    bool GLF_live19c3 = _GLF_FUZZED(false);
                                                    if (!GLF_live19c3) {
                                                        ;
                                                    }
                                                }
                                                GLF_live18looplimiter0++;
                                                {
                                                    {
                                                        vec3 GLF_live21color = _GLF_FUZZED((vec4(7.6, 8621.5379, -6.6, 8.4) * mat3x4(-71.86, -0.0, -3233.6999, -0.2, -5.4, -5.7, -1.6, -264.179, 2177.2401, 75.68, 608.494, 835.745)));
                                                        vec2 GLF_live21uv = _GLF_FUZZED(vec2(1.3, -53.01));
                                                        if (GLF_live21uv.x > (3.0 / 4.0)) {
                                                            GLF_live21color.z += float(GLF_live21obj.numbers[3]);
                                                        }
                                                    }
                                                    {
                                                        int GLF_live26msb8 = _GLF_FUZZED(-46341);
                                                        {
                                                            GLF_live26b_b = clamp(GLF_live26b_b * float(bitCount(GLF_live26msb8)) * 3.0, float(bitfieldExtract(int(GLF_live26resolution.x), 0, 1)), float(bitCount(GLF_live26msb8)));
                                                        }
                                                    }
                                                    if (GLF_live18pos.x < GLF_live18dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18pos.y, 256)] + 15 && GLF_live18pos.x > GLF_live18dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18pos.y, 256)] - 15) {
                                                        float GLF_live18p = (15.0 - abs(float(GLF_live18pos.x - GLF_live18dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18pos.y, 256)]))) / 15.0;
                                                        {
                                                            vec2 GLF_live23coord = _GLF_FUZZED(vec2(457.203, 13.63));
                                                            int GLF_live23i = _GLF_FUZZED(((-66960) - (-40570)));
                                                            int GLF_live23looplimiter0 = 0;
                                                            vec4 GLF_live23res = _GLF_FUZZED(vec4(2.8, -126.859, -6414.4863, -2.4));
                                                            float GLF_live23uvstep = _GLF_FUZZED(float(-46589));
                                                            for (int GLF_live23j = 0; GLF_live23j < 3; GLF_live23j++) {
                                                                if (GLF_live23looplimiter0 >= 3) {
                                                                    break;
                                                                }
                                                                GLF_live23looplimiter0++;
                                                                {
                                                                    GLF_live23res += texture(GLF_live23tex, GLF_live23coord + vec2(float(GLF_live23i - 1) * GLF_live23uvstep, float(GLF_live23j - 1) * GLF_live23uvstep)) * GLF_live23weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live23i * 3 + GLF_live23j, 9)];
                                                                }
                                                            }
                                                        }
                                                        ;
                                                    }
                                                    GLF_live18pos.y++;
                                                }
                                            }
                                            {
                                                {
                                                    ;
                                                }
                                            }
                                            {
                                                int GLF_live23looplimiter0 = 0;
                                                if (GLF_live23looplimiter0 >= 3) {
                                                    ;
                                                }
                                            }
                                        }
                                    }
                                }
                            } else if (int(GLF_live9gl_FragCoord[1]) < 150) {
                                {
                                    vec2 GLF_live22coord = _GLF_FUZZED(((bvec3(true, false, true).t ? vec2(-3226.4834, -37.38) : ((-42.47) * vec2(-7.6, 2203.5483))) - (-4.8)));
                                    float GLF_live22h = _GLF_FUZZED(vec4(9.7, 4611.2045, 263.391, 4372.1741).r);
                                    int GLF_live22i = _GLF_FUZZED((-32808));
                                    int GLF_live22looplimiter0 = 0;
                                    float GLF_live22refh = _GLF_FUZZED((0.3 * 399.772));
                                    float GLF_live22slope = _GLF_FUZZED((48.15 * (-3.9)));
                                    vec2 GLF_live22uvstep = _GLF_FUZZED(vec2(6.9, -5.9));
                                    while (GLF_live22h < GLF_live22refh && GLF_live22i < 32) {
                                        if (GLF_live22looplimiter0 >= 6) {
                                            break;
                                        }
                                        GLF_live22looplimiter0++;
                                        {
                                            GLF_live22coord -= GLF_live22uvstep;
                                            GLF_live22refh += GLF_live22slope;
                                            GLF_live22h = texture(GLF_live22tex, GLF_live22coord).y;
                                            GLF_live22i++;
                                        }
                                    }
                                }
                                ;
                            } else if (int(GLF_live9gl_FragCoord[1]) < 180) {
                                GLF_live9color = fract(sin(GLF_live9vecCoor.yx - trunc(float(GLF_live9data[4]))));
                                {
                                    {
                                        ;
                                    }
                                }
                                GLF_live9color[1] += asinh(GLF_live9gl_FragCoord.y * ldexp(GLF_live9color.y, -GLF_live9i));
                                ;
                                {
                                    ivec2 GLF_live18pos = _GLF_FUZZED((ivec2(79898, -74481) - (-60713)));
                                    {
                                        float GLF_live18p = (15.0 - abs(float(GLF_live18pos.x - GLF_live18dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18pos.y, 256)]))) / 15.0;
                                        ;
                                    }
                                }
                            } else if (int(GLF_live9gl_FragCoord[1]) < 210) {
                                {
                                    int GLF_live24i = _GLF_FUZZED(-58494);
                                    int GLF_live24j = _GLF_FUZZED(67328);
                                    int GLF_live24pivot = _GLF_FUZZED((~95962));
                                    if (GLF_live24obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_live24j, 10)] <= GLF_live24pivot) {
                                        GLF_live24i++;
                                        GLF_live24swap(GLF_live24i, GLF_live24j);
                                    }
                                }
                                GLF_live9color = fract(sin(GLF_live9vecCoor.yx - trunc(float(GLF_live9data[5]))));
                                GLF_live9color.y -= tanh(GLF_live9color.x) / cosh(GLF_live9color.y);
                                {
                                    ivec2 GLF_live16p = _GLF_FUZZED(((ivec2(-25632, 77022) - ivec2(80180, 985)) & ivec2(-41602, 21943)));
                                    {
                                        {
                                            vec3 GLF_live26d = _GLF_FUZZED(vec3(1114.3132, 871.925, 5.0));
                                            if (length(GLF_live26d) <= float(bitfieldExtract(int(GLF_live26resolution.x), 0, 1))) {
                                                ;
                                            }
                                        }
                                        GLF_live16p.y--;
                                        {
                                            vec2 GLF_live26center = _GLF_FUZZED((vec2(3.1, -39.56) * (-mat2(67.87, 5601.8245, 1.2, -2047.7162))));
                                            int GLF_live26i = _GLF_FUZZED(-87450);
                                            int GLF_live26looplimiter0 = 0;
                                            int GLF_live26msb8 = _GLF_FUZZED((43969 * (-30716)));
                                            vec2 GLF_live26position = _GLF_FUZZED(vec2(6610.4469, 39.14));
                                            vec3 GLF_live26result = _GLF_FUZZED(((-vec3(-541.450, 85.47, 4.8)) + vec3(-6.2, 3369.3330, 873.673)));
                                            {
                                                if (GLF_live26looplimiter0 >= 4) {
                                                    ;
                                                }
                                                GLF_live26looplimiter0++;
                                                {
                                                    vec3 GLF_live26d = _GLF_FUZZED(vec3(904.729, vec2(-5.6, 6.6)));
                                                    GLF_live26d = GLF_live26drawShape(GLF_live26position, GLF_live26center + vec2(sin(float(GLF_live26i) / (float(bitCount(GLF_live26msb8)) * 10.0) + GLF_live26time) / 4.0 * float(bitCount(GLF_live26msb8)), float(bitfieldExtract(int(GLF_live26resolution.x), 0, 1))), vec3(0.01 + sin(float(GLF_live26i) / 100.0 * float(bitCount(GLF_live26msb8))), 0.01, float(GLF_live26i)));
                                                    if (length(GLF_live26d) <= float(bitfieldExtract(int(GLF_live26resolution.x), 0, 1))) {
                                                        ;
                                                    }
                                                    GLF_live26result = vec3(GLF_live26d);
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
                                ;
                            } else if (int(GLF_live9gl_FragCoord[1]) < 240) {
                                GLF_live9color = fract(asinh(GLF_live9vecCoor.yx - trunc(float(GLF_live9data[6]))));
                                GLF_live9color.y -= isnan(float(GLF_live9i)) ? tanh(GLF_live9gl_FragCoord.x) : atanh(GLF_live9gl_FragCoord.y / GLF_live9resolution.y);
                                ;
                            } else if (int(GLF_live9gl_FragCoord[1]) < 270) {
                                GLF_live9color = fract(sin(GLF_live9vecCoor.yx - trunc(float(GLF_live9data[7]))));
                                {
                                    int GLF_live18looplimiter0 = 0;
                                    {
                                        bool GLF_live26c8 = _GLF_FUZZED(bool(8338));
                                        int GLF_live26msb8 = _GLF_FUZZED(4914);
                                        vec2 GLF_live26pos = _GLF_FUZZED((vec2(99.17, 30.14) * vec2(0.6, 7.1)));
                                        vec3 GLF_live26setting = _GLF_FUZZED(vec3(8110.5814, 1.2, 6221.3308));
                                        if (!GLF_live26c8) {
                                            ;
                                        }
                                    }
                                    ivec2 GLF_live18pos = _GLF_FUZZED(ivec2(ivec3(54714, -66258, 92186)));
                                    while (GLF_live18pos.y != 256) {
                                        if (GLF_live18looplimiter0 >= 5) {
                                            break;
                                            {
                                                int GLF_live23looplimiter1 = 0;
                                                if (GLF_live23looplimiter1 >= 3) {
                                                    ;
                                                }
                                            }
                                        }
                                        GLF_live18looplimiter0++;
                                        {
                                            {
                                                vec3 GLF_live19d = _GLF_FUZZED(vec3(3425.6504, -9.7, 84.37));
                                                if (length(GLF_live19d) <= float(bitfieldExtract(int(GLF_live19resolution.x), 0, 1))) {
                                                    ;
                                                }
                                                {
                                                    int GLF_live26msb8 = _GLF_FUZZED(-13342);
                                                    vec2 GLF_live26pos = _GLF_FUZZED(vec2(-83.29, -232.332));
                                                    vec3 GLF_live26setting = _GLF_FUZZED(vec3(23.99, -8.4, 5675.5141));
                                                    {
                                                        ;
                                                    }
                                                }
                                            }
                                            if (GLF_live18pos.x < GLF_live18dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18pos.y, 256)] + 15 && GLF_live18pos.x > GLF_live18dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18pos.y, 256)] - 15) {
                                                float GLF_live18p = (15.0 - abs(float(GLF_live18pos.x - GLF_live18dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18pos.y, 256)]))) / 15.0;
                                                ;
                                                {
                                                    vec2 GLF_live23coord = _GLF_FUZZED(vec2(-4193.4304, 6223.5671));
                                                    int GLF_live23i = _GLF_FUZZED(1913);
                                                    vec4 GLF_live23res = _GLF_FUZZED(vec4(25.96, 18.14, 4520.1318, -91.19));
                                                    float GLF_live23uvstep = _GLF_FUZZED(-2991.6973);
                                                    {
                                                        {
                                                            int GLF_live23looplimiter0 = 0;
                                                            for (int GLF_live23j = 0; GLF_live23j < 3; GLF_live23j++) {
                                                                if (GLF_live23looplimiter0 >= 3) {
                                                                    break;
                                                                }
                                                                GLF_live23looplimiter0++;
                                                                {
                                                                    GLF_live23res += texture(GLF_live23tex, GLF_live23coord + vec2(float(GLF_live23i - 1) * GLF_live23uvstep, float(GLF_live23j - 1) * GLF_live23uvstep)) * GLF_live23weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live23i * 3 + GLF_live23j, 9)];
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                            GLF_live18pos.y++;
                                        }
                                        {
                                            vec3 GLF_live19d = _GLF_FUZZED(vec3(-69.21, -3.1, 851.790));
                                            if (length(GLF_live19d) <= float(bitfieldExtract(int(GLF_live19resolution.x), 0, 1))) {
                                                ;
                                            }
                                        }
                                        {
                                            int GLF_live26msb8 = _GLF_FUZZED(23079);
                                            vec2 GLF_live26pos = _GLF_FUZZED((vec4(75.90, -169.565, -6502.9966, 1.2).rg + vec2(-91.43, 48.26)));
                                            vec3 GLF_live26setting = _GLF_FUZZED(vec3(-79.19, 9.9, 61.01));
                                            {
                                                ;
                                            }
                                        }
                                    }
                                }
                                GLF_live9color.y *= mix(normalize(GLF_live9vecCoor), normalize(vec3(GLF_live9color, degrees(GLF_live9color.x))), GLF_live9injectionSwitch.x).y;
                                ;
                            } else {
                                {
                                    int GLF_live19looplimiter0 = 0;
                                    if (GLF_live19looplimiter0 >= 4) {
                                        ;
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
        }
        {
            ivec2 GLF_live16p = _GLF_FUZZED((ivec2(74474, -96702) - ivec2(-58192, -11593)));
            {
                GLF_live16p.x = -GLF_live16p.x;
            }
        }
        {
            {
                {
                    int GLF_live14looplimiter1 = 0;
                    {
                        {
                            {
                                int GLF_live24i = _GLF_FUZZED((47020 * 980));
                                {
                                    GLF_live24obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_live24i, 10)] = (10 - GLF_live24i) * int(GLF_live24injectionSwitch.y);
                                }
                            }
                            {
                                bool GLF_live19c7 = _GLF_FUZZED((38938 > (-77465)));
                                int GLF_live19msb8 = _GLF_FUZZED(int((uvec2(45449u, 147743u) * 157313u).g));
                                vec2 GLF_live19pos = _GLF_FUZZED((vec2(-3588.4119, -322.617) * mat2(0.5, -600.866, 67.31, 9.3)));
                                vec3 GLF_live19setting = _GLF_FUZZED(vec3(616.110, 7041.3707, -5780.8164));
                                if (!GLF_live19c7) {
                                    ;
                                    {
                                        vec2 GLF_live26center = _GLF_FUZZED((vec3(-8399.9653, -41.95, 959.022) * mat2x3(505.503, 38.71, 5.2, 2171.1400, 45.89, -5365.5305)));
                                        int GLF_live26msb8 = _GLF_FUZZED(80412);
                                        vec2 GLF_live26position = _GLF_FUZZED(vec2(-9.2, -4.8));
                                        vec3 GLF_live26result = _GLF_FUZZED((vec3(-4.6, 8.9, 9416.7586) - vec3(7.1, 7.7, -0.7)));
                                        {
                                            int GLF_live26looplimiter0 = 0;
                                            for (int GLF_live26i = bitfieldInsert(35, 0, 0, bitfieldExtract(int(GLF_live26resolution.x), 0, 1)); GLF_live26i >= bitfieldReverse(bitfieldExtract(int(GLF_live26resolution.x), 0, 1)); GLF_live26i--) {
                                                if (GLF_live26looplimiter0 >= 4) {
                                                    break;
                                                }
                                                GLF_live26looplimiter0++;
                                                {
                                                    vec3 GLF_live26d = _GLF_FUZZED(vec3(904.729, vec2(-5.6, 6.6)));
                                                    GLF_live26d = GLF_live26drawShape(GLF_live26position, GLF_live26center + vec2(sin(float(GLF_live26i) / (float(bitCount(GLF_live26msb8)) * 10.0) + GLF_live26time) / 4.0 * float(bitCount(GLF_live26msb8)), float(bitfieldExtract(int(GLF_live26resolution.x), 0, 1))), vec3(0.01 + sin(float(GLF_live26i) / 100.0 * float(bitCount(GLF_live26msb8))), 0.01, float(GLF_live26i)));
                                                    if (length(GLF_live26d) <= float(bitfieldExtract(int(GLF_live26resolution.x), 0, 1))) {
                                                        continue;
                                                    }
                                                    GLF_live26result = vec3(GLF_live26d);
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            ;
                        }
                    }
                    if (GLF_live14looplimiter1 >= 5) {
                        ;
                    }
                }
                int GLF_live9j = _GLF_FUZZED((false ? 73503 : 68117));
                int GLF_live9looplimiter6 = 0;
                {
                    {
                        GLF_live13_GLF_color = vec4(0.0, 0.0, 0.0, 1.0);
                    }
                }
                {
                    {
                        {
                            ;
                        }
                    }
                    int GLF_live18looplimiter0 = 0;
                    if (GLF_live18looplimiter0 >= 5) {
                        {
                            vec2 GLF_live23coord = _GLF_FUZZED(vec2(-3.4, 0.4));
                            int GLF_live23i = _GLF_FUZZED(ivec3(-61676, 61442, -26410).r);
                            int GLF_live23j = _GLF_FUZZED(79546);
                            vec4 GLF_live23res = _GLF_FUZZED(vec4(-1246.5650, -5.8, -420.115, -9.9));
                            float GLF_live23uvstep = _GLF_FUZZED((((-799.798) - 55.06) * (883.090 - (-73.71))));
                            {
                                GLF_live23res += texture(GLF_live23tex, GLF_live23coord + vec2(float(GLF_live23i - 1) * GLF_live23uvstep, float(GLF_live23j - 1) * GLF_live23uvstep)) * GLF_live23weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live23i * 3 + GLF_live23j, 9)];
                            }
                        }
                        ;
                        {
                            int GLF_live23looplimiter1 = 0;
                            if (GLF_live23looplimiter1 >= 3) {
                                ;
                            }
                        }
                    }
                }
                {
                    {
                        int GLF_live21looplimiter0 = 0;
                        if (GLF_live21looplimiter0 >= 3) {
                            ;
                        }
                    }
                    if (GLF_live9looplimiter6 >= 4) {
                        ;
                        {
                            int GLF_live14iteration = _GLF_FUZZED(-92121);
                            {
                                ;
                            }
                        }
                    }
                    GLF_live9looplimiter6++;
                    {
                        GLF_live9temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9j, 10)] = GLF_live9data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9j, 10)];
                    }
                }
            }
            int GLF_live5looplimiter0 = 0;
            {
                {
                    {
                        ;
                    }
                }
                {
                    int GLF_live24looplimiter4 = 0;
                    if (GLF_live24looplimiter4 >= 4) {
                        ;
                    }
                }
                ivec2 GLF_live18pos = _GLF_FUZZED(((true ? false : false) ? ivec2(-87623, -85405) : ivec2(-54624, -7655)));
                {
                    int GLF_live18looplimiter0 = 0;
                    while (GLF_live18pos.y != 256) {
                        if (GLF_live18looplimiter0 >= 5) {
                            break;
                        }
                        GLF_live18looplimiter0++;
                        {
                            if (GLF_live18pos.x < GLF_live18dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18pos.y, 256)] + 15 && GLF_live18pos.x > GLF_live18dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18pos.y, 256)] - 15) {
                                float GLF_live18p = (15.0 - abs(float(GLF_live18pos.x - GLF_live18dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18pos.y, 256)]))) / 15.0;
                                ;
                            }
                            GLF_live18pos.y++;
                        }
                        {
                            bool GLF_live26c6 = _GLF_FUZZED((mat3(310.130, -42.92, 197.042, -417.929, -4251.7524, 9040.3063, -6595.5411, 7.1, -2062.3814) != (+mat3(1.7, 2178.2632, 9.1, -0.5, -7.4, 2794.8869, 6.9, -7.7, 5527.7024))));
                            int GLF_live26msb8 = _GLF_FUZZED(-6345);
                            vec2 GLF_live26pos = _GLF_FUZZED((vec4(9.2, -5.3, 487.241, 809.942)).sq);
                            vec3 GLF_live26setting = _GLF_FUZZED(vec3(38.51, -6.3, -4539.3893));
                            if (!GLF_live26c6) {
                                ;
                            }
                        }
                        {
                            vec2 GLF_live22coord = _GLF_FUZZED(vec2(vec3(960.003, -1.8, 85.35)));
                            float GLF_live22h = _GLF_FUZZED(float(false));
                            int GLF_live22i = _GLF_FUZZED((~ivec3(-24297, -25052, 37477)).t);
                            int GLF_live22looplimiter0 = 0;
                            float GLF_live22refh = _GLF_FUZZED(((-1.2) * (-2.8)));
                            float GLF_live22slope = _GLF_FUZZED(-1387.7633);
                            vec2 GLF_live22uvstep = _GLF_FUZZED(vec2(2.8, -3.7));
                            while (GLF_live22h < GLF_live22refh && GLF_live22i < 32) {
                                if (GLF_live22looplimiter0 >= 6) {
                                    break;
                                }
                                GLF_live22looplimiter0++;
                                {
                                    GLF_live22coord -= GLF_live22uvstep;
                                    GLF_live22refh += GLF_live22slope;
                                    {
                                        vec3 GLF_live24color = _GLF_FUZZED(vec3(vec2(6.6, -3321.7209), float(-70036)));
                                        vec2 GLF_live24grid = _GLF_FUZZED(vec2(504.361, 7.9));
                                        {
                                            int GLF_live24count = int(GLF_live24injectionSwitch.x);
                                            {
                                                int GLF_live24looplimiter5 = 0;
                                                do {
                                                    if (GLF_live24looplimiter5 >= 4) {
                                                        break;
                                                    }
                                                    GLF_live24looplimiter5++;
                                                    {
                                                        GLF_live24color -= GLF_live24palette(vec3(float(GLF_live24obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_live24injectionSwitch.y), 10)]) * 0.1), vec3(0.8), trunc(vec3(0.1)), vec3(GLF_live24injectionSwitch.x, 0.6, float(GLF_live24obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_live24injectionSwitch.x), 10)]) * 0.1));
                                                        GLF_live24count++;
                                                    }
                                                } while (GLF_live24count != GLF_live24obj.numbers[2]);
                                            }
                                            GLF_live24grid += vec2(GLF_live24count + GLF_live24obj.numbers[3], GLF_live24count + GLF_live24obj.numbers[3]);
                                        }
                                    }
                                    GLF_live22h = texture(GLF_live22tex, GLF_live22coord).y;
                                    GLF_live22i++;
                                }
                            }
                        }
                    }
                }
            }
            if (GLF_live5looplimiter0 >= 5) {
                {
                    int GLF_live26msb8 = _GLF_FUZZED(((-93666) & 173));
                    {
                        GLF_live26b_b = clamp(GLF_live26b_b * float(bitCount(GLF_live26msb8)) * 3.0, float(bitfieldExtract(int(GLF_live26resolution.x), 0, 1)), float(bitCount(GLF_live26msb8)));
                    }
                }
                ;
                {
                    float GLF_live11th = _GLF_FUZZED(6903.4116);
                    {
                        GLF_live11th = 1.0 - GLF_live11th;
                    }
                }
                {
                    float GLF_live20c_im = _GLF_FUZZED(vec3(5.2, -37.90, -7.5).p);
                    float GLF_live20c_re = _GLF_FUZZED((false ? (-6.9) : 975.251));
                    int GLF_live20iteration = _GLF_FUZZED(-72047);
                    int GLF_live20looplimiter0 = 0;
                    float GLF_live20x = _GLF_FUZZED(8.7);
                    float GLF_live20y = _GLF_FUZZED(-126.535);
                    for (int GLF_live20k = 0; GLF_live20k < 1000; GLF_live20k++) {
                        if (GLF_live20looplimiter0 >= 5) {
                            break;
                        }
                        {
                            int GLF_live26msb8 = _GLF_FUZZED(63083);
                            vec2 GLF_live26position = _GLF_FUZZED(((-(-9106.6421)) - vec2(8.8, 569.282)));
                            if (abs(GLF_live26position.y - GLF_live26position.x) < 0.5) {
                                GLF_live26b_b = clamp(GLF_live26b_b * float(bitCount(GLF_live26msb8)) * 3.0, float(bitfieldExtract(int(GLF_live26resolution.x), 0, 1)), float(bitCount(GLF_live26msb8)));
                            }
                        }
                        GLF_live20looplimiter0++;
                        {
                            if (GLF_live20x * GLF_live20x + GLF_live20y * GLF_live20y > 4.0) {
                                {
                                    int GLF_live24h = _GLF_FUZZED(ivec4(-38130, -43067, 33505, -87976).w);
                                    int GLF_live24i = _GLF_FUZZED((11163 + int(147141u)));
                                    int GLF_live24l = _GLF_FUZZED(-48877);
                                    int GLF_live24looplimiter0 = 0;
                                    int GLF_live24pivot = _GLF_FUZZED((89103 + (-58130)));
                                    for (int GLF_live24j = GLF_live24l; GLF_live24j <= GLF_live24h - 1; GLF_live24j++) {
                                        if (GLF_live24looplimiter0 >= 4) {
                                            break;
                                        }
                                        GLF_live24looplimiter0++;
                                        {
                                            if (GLF_live24obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_live24j, 10)] <= GLF_live24pivot) {
                                                GLF_live24i++;
                                                GLF_live24swap(GLF_live24i, GLF_live24j);
                                            }
                                        }
                                    }
                                }
                                break;
                            }
                            float GLF_live20x_new = GLF_live20x * GLF_live20x - GLF_live20y * GLF_live20y + GLF_live20c_re;
                            {
                                {
                                    ;
                                }
                            }
                            GLF_live20y = 2.0 * GLF_live20x * GLF_live20y + GLF_live20c_im;
                            GLF_live20x = GLF_live20x_new;
                            GLF_live20iteration++;
                        }
                    }
                }
            }
        }
    }
    {
        vec2 GLF_live9color = _GLF_FUZZED(vec2(8.4, 6.2));
        int GLF_live9i = _GLF_FUZZED(((-56398) - 97233));
        vec3 GLF_live9vecCoor = _GLF_FUZZED(vec3(7.6, 80.89, 6781.6790));
        {
            {
                vec2 GLF_live22coord = _GLF_FUZZED(((vec2(4.0, -68.72) + vec2(-6432.5508, -24.42)) + 2965.3042));
                float GLF_live22h = _GLF_FUZZED(vec3(31.72, -90.16, 8.6).p);
                int GLF_live22i = _GLF_FUZZED(64845);
                int GLF_live22looplimiter0 = 0;
                float GLF_live22refh = _GLF_FUZZED(-3.0);
                float GLF_live22slope = _GLF_FUZZED((false ? 36.18 : 3.7));
                vec2 GLF_live22uvstep = _GLF_FUZZED(vec2(5.3, -9.3));
                while (GLF_live22h < GLF_live22refh && GLF_live22i < 32) {
                    if (GLF_live22looplimiter0 >= 6) {
                        break;
                    }
                    GLF_live22looplimiter0++;
                    {
                        GLF_live22coord -= GLF_live22uvstep;
                        GLF_live22refh += GLF_live22slope;
                        GLF_live22h = texture(GLF_live22tex, GLF_live22coord).y;
                        GLF_live22i++;
                    }
                    {
                        vec2 GLF_live23coord = _GLF_FUZZED(vec2(-98.42, 2.0));
                        int GLF_live23i = _GLF_FUZZED(ivec2(95150, 36785).s);
                        vec4 GLF_live23res = _GLF_FUZZED(vec4(348.578, 860.212, 34.76, 4105.7791));
                        float GLF_live23uvstep = _GLF_FUZZED(-78.45);
                        {
                            {
                                int GLF_live23looplimiter0 = 0;
                                for (int GLF_live23j = 0; GLF_live23j < 3; GLF_live23j++) {
                                    if (GLF_live23looplimiter0 >= 3) {
                                        break;
                                    }
                                    GLF_live23looplimiter0++;
                                    {
                                        GLF_live23res += texture(GLF_live23tex, GLF_live23coord + vec2(float(GLF_live23i - 1) * GLF_live23uvstep, float(GLF_live23j - 1) * GLF_live23uvstep)) * GLF_live23weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live23i * 3 + GLF_live23j, 9)];
                                    }
                                }
                            }
                        }
                    }
                }
            }
            GLF_live9color = fract(asinh(GLF_live9vecCoor.yx - trunc(float(GLF_live9data[6]))));
            {
                vec2 GLF_live23coord = _GLF_FUZZED((vec2(5.0) * 64.24));
                int GLF_live23i = _GLF_FUZZED(97835);
                int GLF_live23j = _GLF_FUZZED(int(84306u));
                vec4 GLF_live23res = _GLF_FUZZED(vec4(77.76, 483.137, 7.2, 0.9).ggaa);
                float GLF_live23uvstep = _GLF_FUZZED(23.09);
                {
                    GLF_live23res += texture(GLF_live23tex, GLF_live23coord + vec2(float(GLF_live23i - 1) * GLF_live23uvstep, float(GLF_live23j - 1) * GLF_live23uvstep)) * GLF_live23weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live23i * 3 + GLF_live23j, 9)];
                }
            }
            GLF_live9color.y -= isnan(float(GLF_live9i)) ? tanh(GLF_live9gl_FragCoord.x) : atanh(GLF_live9gl_FragCoord.y / GLF_live9resolution.y);
            {
                vec3 GLF_live24color = _GLF_FUZZED(vec3(500.056, 886.894, 4210.0532));
                vec2 GLF_live24grid = _GLF_FUZZED((vec2(7.1, 5.3) * mat2(-8146.6960, -894.464, 4.1, 1.6)));
                {
                    int GLF_live24count = int(GLF_live24injectionSwitch.x);
                    {
                        int GLF_live24looplimiter5 = 0;
                        do {
                            if (GLF_live24looplimiter5 >= 4) {
                                break;
                            }
                            GLF_live24looplimiter5++;
                            {
                                GLF_live24color -= GLF_live24palette(vec3(float(GLF_live24obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_live24injectionSwitch.y), 10)]) * 0.1), vec3(0.8), trunc(vec3(0.1)), vec3(GLF_live24injectionSwitch.x, 0.6, float(GLF_live24obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_live24injectionSwitch.x), 10)]) * 0.1));
                                GLF_live24count++;
                            }
                        } while (GLF_live24count != GLF_live24obj.numbers[2]);
                    }
                    GLF_live24grid += vec2(GLF_live24count + GLF_live24obj.numbers[3], GLF_live24count + GLF_live24obj.numbers[3]);
                }
            }
            ;
        }
    }
    if (int(gl_FragCoord.x) < 20) {
        _GLF_color = vec4(A[0] / resolution.x, A[4] / resolution.y, 1.0, 1.0);
    } else {
        {
            {
                {
                    vec2 GLF_live22coord = _GLF_FUZZED((mat3x2(-8.9, -37.00, 4.6, -561.019, 6.0, -24.73) * vec3(877.188, 0.3, -8494.9511)));
                    {
                        vec2 GLF_live23coord = _GLF_FUZZED((float(false) + vec2(1.6, 2534.0241)));
                        int GLF_live23i = _GLF_FUZZED((87786 - (-25316)));
                        int GLF_live23looplimiter1 = 0;
                        vec4 GLF_live23res = _GLF_FUZZED(vec4(vec2(-2.5, 952.528), 1.6, -1.1));
                        float GLF_live23uvstep = _GLF_FUZZED((true ? float(39616) : float(62213u)));
                        {
                            if (GLF_live23looplimiter1 >= 3) {
                                ;
                            }
                            GLF_live23looplimiter1++;
                            {
                                {
                                    int GLF_live23looplimiter0 = 0;
                                    for (int GLF_live23j = 0; GLF_live23j < 3; GLF_live23j++) {
                                        if (GLF_live23looplimiter0 >= 3) {
                                            break;
                                        }
                                        GLF_live23looplimiter0++;
                                        {
                                            GLF_live23res += texture(GLF_live23tex, GLF_live23coord + vec2(float(GLF_live23i - 1) * GLF_live23uvstep, float(GLF_live23j - 1) * GLF_live23uvstep)) * GLF_live23weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live23i * 3 + GLF_live23j, 9)];
                                        }
                                    }
                                }
                            }
                        }
                    }
                    float GLF_live22h = _GLF_FUZZED(-56.11);
                    int GLF_live22i = _GLF_FUZZED(-2046);
                    float GLF_live22refh = _GLF_FUZZED(((-2.3) * (-8.2)));
                    float GLF_live22slope = _GLF_FUZZED(float(130256u));
                    vec2 GLF_live22uvstep = _GLF_FUZZED(((-2.9) - vec2(0.1, 7728.9356)));
                    {
                        int GLF_live22looplimiter0 = 0;
                        while (GLF_live22h < GLF_live22refh && GLF_live22i < 32) {
                            if (GLF_live22looplimiter0 >= 6) {
                                break;
                            }
                            {
                                vec3 GLF_live24color = _GLF_FUZZED(((-6.2) - vec3(-4.0, -521.780, 5.9)));
                                int GLF_live24count = _GLF_FUZZED(78095);
                                {
                                    GLF_live24color -= GLF_live24palette(vec3(float(GLF_live24obj.numbers[4]) * 0.1), trunc(vec3(0.1)), vec3(float(GLF_live24obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_live24injectionSwitch.y), 10)]) * 0.1), vec3(GLF_live24injectionSwitch.x, float(GLF_live24obj.numbers[2]) * 0.1, float(GLF_live24obj.numbers[8]) * 0.1));
                                    GLF_live24count++;
                                }
                            }
                            GLF_live22looplimiter0++;
                            {
                                GLF_live22coord -= GLF_live22uvstep;
                                GLF_live22refh += GLF_live22slope;
                                GLF_live22h = texture(GLF_live22tex, GLF_live22coord).y;
                                GLF_live22i++;
                            }
                        }
                    }
                }
                {
                    int GLF_live18looplimiter0 = 0;
                    ivec2 GLF_live18pos = _GLF_FUZZED(ivec2(-18863, -68915).st);
                    {
                        {
                            vec3 GLF_live24color = _GLF_FUZZED((vec3(-75.11, 234.493, -9.9) + (-4523.3240)));
                            vec2 GLF_live24grid = _GLF_FUZZED(vec2(-63.03, -4.4));
                            vec2 GLF_live24uv = _GLF_FUZZED((vec4(8.3, 1.6, 1.6, -7.4) * mat2x4(208.275, -10.67, 616.893, 5.3, 8656.6458, 6.9, 11.23, -537.225)));
                            if (GLF_live24uv.x > (2.0 / 4.0)) {
                                int GLF_live24count = int(GLF_live24injectionSwitch.x);
                                {
                                    int GLF_live24looplimiter4 = 0;
                                    do {
                                        if (GLF_live24looplimiter4 >= 4) {
                                            break;
                                        }
                                        GLF_live24looplimiter4++;
                                        {
                                            GLF_live24color -= GLF_live24palette(vec3(float(GLF_live24obj.numbers[4]) * 0.1), trunc(vec3(0.1)), vec3(float(GLF_live24obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_live24injectionSwitch.y), 10)]) * 0.1), vec3(GLF_live24injectionSwitch.x, float(GLF_live24obj.numbers[2]) * 0.1, float(GLF_live24obj.numbers[8]) * 0.1));
                                            GLF_live24count++;
                                        }
                                    } while (GLF_live24count != GLF_live24obj.numbers[1]);
                                }
                                GLF_live24grid += vec2(GLF_live24count + int(GLF_live24injectionSwitch.y), GLF_live24count + int(GLF_live24injectionSwitch.x));
                            }
                        }
                        if (GLF_live18looplimiter0 >= 5) {
                            ;
                        }
                        GLF_live18looplimiter0++;
                        {
                            if (GLF_live18pos.x < GLF_live18dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18pos.y, 256)] + 15 && GLF_live18pos.x > GLF_live18dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18pos.y, 256)] - 15) {
                                float GLF_live18p = (15.0 - abs(float(GLF_live18pos.x - GLF_live18dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18pos.y, 256)]))) / 15.0;
                                ;
                            }
                            GLF_live18pos.y++;
                        }
                        {
                            vec2 GLF_live23coord = _GLF_FUZZED(vec2(7.1, -4524.5086));
                            vec4 GLF_live23res = _GLF_FUZZED((mat4(5.7, -2866.1975, 6.7, -4.8, -3339.4645, 7.1, 9462.7089, 0.1, 7.3, -484.555, -317.433, 2.5, 715.814, -1693.1623, 7699.8720, 7241.6696) * vec4(-5.8, 5189.9442, 554.318, 505.169)));
                            float GLF_live23uvstep = _GLF_FUZZED(vec4(297.035, -6.8, -545.686, 9264.8188).z);
                            {
                                int GLF_live23looplimiter1 = 0;
                                for (int GLF_live23i = 0; GLF_live23i < 3; GLF_live23i++) {
                                    if (GLF_live23looplimiter1 >= 3) {
                                        break;
                                    }
                                    GLF_live23looplimiter1++;
                                    {
                                        {
                                            int GLF_live23looplimiter0 = 0;
                                            for (int GLF_live23j = 0; GLF_live23j < 3; GLF_live23j++) {
                                                if (GLF_live23looplimiter0 >= 3) {
                                                    break;
                                                }
                                                GLF_live23looplimiter0++;
                                                {
                                                    GLF_live23res += texture(GLF_live23tex, GLF_live23coord + vec2(float(GLF_live23i - 1) * GLF_live23uvstep, float(GLF_live23j - 1) * GLF_live23uvstep)) * GLF_live23weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live23i * 3 + GLF_live23j, 9)];
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                ;
            }
            {
                int GLF_live22looplimiter0 = 0;
                if (GLF_live22looplimiter0 >= 6) {
                    ;
                }
            }
        }
        {
            {
                {
                    ;
                }
                {
                    int GLF_live16i = _GLF_FUZZED(-27317);
                    int GLF_live16looplimiter0 = 0;
                    ivec2 GLF_live16p = _GLF_FUZZED(ivec2(-15897, -40778));
                    for (GLF_live16i = 0; GLF_live16i < 100; GLF_live16i++) {
                        {
                            int GLF_live21i = _GLF_FUZZED(95696);
                            {
                                bool GLF_live26c2 = _GLF_FUZZED(false);
                                if (!GLF_live26c2) {
                                    ;
                                }
                            }
                            {
                                {
                                    bool GLF_live26c3 = _GLF_FUZZED(false);
                                    if (!GLF_live26c3) {
                                        ;
                                    }
                                }
                                GLF_live21obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_live21i, 10)] = (10 - GLF_live21i);
                                GLF_live21obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_live21i, 10)] = GLF_live21obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_live21i, 10)] * GLF_live21obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_live21i, 10)];
                            }
                        }
                        if (GLF_live16looplimiter0 >= 6) {
                            break;
                            {
                                int GLF_live19msb8 = _GLF_FUZZED(((int(125004u) & 46419) & (-15383)));
                                vec2 GLF_live19position = _GLF_FUZZED((vec2(9.2, -57.40) + 290.319));
                                if (abs(GLF_live19position.y - GLF_live19position.x) < 0.5) {
                                    GLF_live19b_b = clamp(GLF_live19b_b * float(bitCount(GLF_live19msb8)) * 3.0, float(bitfieldExtract(int(GLF_live19resolution.x), 0, 1)), float(bitCount(GLF_live19msb8)));
                                }
                            }
                        }
                        GLF_live16looplimiter0++;
                        {
                            vec2 GLF_live22coord = _GLF_FUZZED((vec2(-366.146, 1.3) * (-8.3)));
                            float GLF_live22h = _GLF_FUZZED(-409.325);
                            int GLF_live22i = _GLF_FUZZED((24358 - 54072));
                            int GLF_live22looplimiter0 = 0;
                            float GLF_live22refh = _GLF_FUZZED(670.510);
                            float GLF_live22slope = _GLF_FUZZED((-(-256.146)));
                            vec2 GLF_live22uvstep = _GLF_FUZZED(vec2(14.01, -84.56));
                            while (GLF_live22h < GLF_live22refh && GLF_live22i < 32) {
                                if (GLF_live22looplimiter0 >= 6) {
                                    break;
                                }
                                GLF_live22looplimiter0++;
                                {
                                    GLF_live22coord -= GLF_live22uvstep;
                                    GLF_live22refh += GLF_live22slope;
                                    GLF_live22h = texture(GLF_live22tex, GLF_live22coord).y;
                                    GLF_live22i++;
                                }
                                {
                                    int GLF_live23looplimiter0 = 0;
                                    if (GLF_live23looplimiter0 >= 3) {
                                        ;
                                    }
                                }
                            }
                        }
                        {
                            GLF_live16p = GLF_live16iter(GLF_live16p);
                        }
                    }
                }
            }
            vec2 GLF_live9color = _GLF_FUZZED(vec2(1.4, -6.7));
            vec3 GLF_live9vecCoor = _GLF_FUZZED(vec3(-9.9, 605.150, -809.025));
            {
                {
                    int GLF_live26msb8 = _GLF_FUZZED(5752);
                    vec2 GLF_live26pos = _GLF_FUZZED(((-vec2(4895.9262, 135.414)) + float(-47621)));
                    vec3 GLF_live26setting = _GLF_FUZZED((mat3(-9737.3825, -0.5, 3.0, 399.003, 64.30, 57.52, -2.2, 8.3, -35.16) * vec3(-0.4, 6.6, -1.1)));
                    {
                        ;
                    }
                }
                GLF_live9color = fract(acosh(clamp(GLF_live9vecCoor.yx - trunc(float(GLF_live9data[3])), 1.0, 1000.0)));
                GLF_live9color.x += (isnan(GLF_live9gl_FragCoord.x) ? log2(GLF_live9gl_FragCoord.x) : log2(GLF_live9gl_FragCoord.y));
                ;
            }
        }
        if (int(gl_FragCoord.x) < 40) {
            {
                int GLF_live19msb8 = _GLF_FUZZED(72940);
                vec2 GLF_live19pos = _GLF_FUZZED((9.4 * vec2(-0.1, -7.4)));
                vec3 GLF_live19setting = _GLF_FUZZED((((-0.2) + vec3(-7.9, 2111.8579, 7.0)) * 3.6));
                {
                    ;
                }
            }
            _GLF_color = vec4(A[5] / resolution.x, A[9] / resolution.y, 1.0, 1.0);
            {
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = vec4(vec2(-16.11, -8.6), 2.8, -1.7);
                    {
                        int GLF_live16looplimiter1 = 0;
                        if (GLF_live16looplimiter1 >= 6) {
                            ;
                        }
                    }
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                int GLF_live2looplimiter0 = 0;
                if (GLF_live2looplimiter0 >= 4) {
                    ;
                }
            }
        } else {
            {
                {
                    int GLF_live21looplimiter2 = 0;
                    {
                        bool GLF_live26c1 = _GLF_FUZZED(bool(3683.2839));
                        if (!GLF_live26c1) {
                            ;
                        }
                    }
                    for (int GLF_live21i = 0; GLF_live21i < 10; GLF_live21i++) {
                        if (GLF_live21looplimiter2 >= 3) {
                            break;
                        }
                        GLF_live21looplimiter2++;
                        {
                            GLF_live21obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_live21i, 10)] = (10 - GLF_live21i);
                            GLF_live21obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_live21i, 10)] = GLF_live21obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_live21i, 10)] * GLF_live21obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_live21i, 10)];
                        }
                    }
                }
            }
            {
                {
                    ;
                }
            }
            if (int(gl_FragCoord.x) < 60) {
                {
                    {
                        vec3 GLF_live24color = _GLF_FUZZED((-vec3(-6.2, -9650.7904, 5.3)));
                        int GLF_live24count = _GLF_FUZZED(46541);
                        {
                            int GLF_live24looplimiter4 = 0;
                            do {
                                if (GLF_live24looplimiter4 >= 4) {
                                    break;
                                }
                                GLF_live24looplimiter4++;
                                {
                                    GLF_live24color -= GLF_live24palette(vec3(float(GLF_live24obj.numbers[4]) * 0.1), trunc(vec3(0.1)), vec3(float(GLF_live24obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_live24injectionSwitch.y), 10)]) * 0.1), vec3(GLF_live24injectionSwitch.x, float(GLF_live24obj.numbers[2]) * 0.1, float(GLF_live24obj.numbers[8]) * 0.1));
                                    GLF_live24count++;
                                }
                            } while (GLF_live24count != GLF_live24obj.numbers[1]);
                        }
                    }
                    {
                        int GLF_live21i = _GLF_FUZZED(-91128);
                        int GLF_live21looplimiter2 = 0;
                        {
                            if (GLF_live21looplimiter2 >= 3) {
                                {
                                    {
                                        ;
                                    }
                                }
                                ;
                            }
                            GLF_live21looplimiter2++;
                            {
                                GLF_live21obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_live21i, 10)] = (10 - GLF_live21i);
                                GLF_live21obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_live21i, 10)] = GLF_live21obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_live21i, 10)] * GLF_live21obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_live21i, 10)];
                            }
                        }
                        {
                            int GLF_live23looplimiter0 = 0;
                            if (GLF_live23looplimiter0 >= 3) {
                                ;
                            }
                        }
                    }
                    int GLF_live6from = _GLF_FUZZED(3129);
                    int GLF_live6looplimiter2 = 0;
                    int GLF_live6to = _GLF_FUZZED(708);
                    {
                        int GLF_live16looplimiter0 = 0;
                        ivec2 GLF_live16p = _GLF_FUZZED(ivec2(-1736, -3314));
                        {
                            vec3 GLF_live21color = _GLF_FUZZED((vec3(-4.2, 304.709, 1.4) - 9399.6708));
                            {
                                GLF_live21color.x += float(GLF_live21obj.numbers[9]);
                            }
                        }
                        {
                            if (GLF_live16looplimiter0 >= 6) {
                                ;
                            }
                            GLF_live16looplimiter0++;
                            {
                                GLF_live16p = GLF_live16iter(GLF_live16p);
                            }
                        }
                    }
                    for (int GLF_live6i = GLF_live6from; GLF_live6i <= GLF_live6to; GLF_live6i++) {
                        if (GLF_live6looplimiter2 >= 7) {
                            {
                                ivec2 GLF_live16p = _GLF_FUZZED((ivec4(85665, -28138, -23741, -60932).zz + ((-42345) ^ (-10767))));
                                if (GLF_live16p.x > 0) {
                                    GLF_live16p.y--;
                                }
                            }
                            {
                                int GLF_live25m = _GLF_FUZZED(((-38926) ^ 69738));
                                {
                                    ;
                                }
                            }
                            {
                                {
                                    {
                                        int GLF_live23looplimiter1 = 0;
                                        if (GLF_live23looplimiter1 >= 3) {
                                            ;
                                        }
                                    }
                                    int GLF_live16looplimiter0 = 0;
                                    {
                                        vec2 GLF_live22coord = _GLF_FUZZED((vec3(47.76, -936.701, 62.85).xz * (-7.1)));
                                        float GLF_live22h = _GLF_FUZZED(vec4(-8.9, 980.318, -5.2, -227.870).p);
                                        int GLF_live22i = _GLF_FUZZED(((-61053) + (~45090)));
                                        float GLF_live22refh = _GLF_FUZZED((-(false ? (-9.5) : (-8.5))));
                                        float GLF_live22slope = _GLF_FUZZED(-57.61);
                                        vec2 GLF_live22uvstep = _GLF_FUZZED(vec3(-9282.4137, 735.198, 7.5).gb.gg);
                                        {
                                            int GLF_live22looplimiter0 = 0;
                                            while (GLF_live22h < GLF_live22refh && GLF_live22i < 32) {
                                                if (GLF_live22looplimiter0 >= 6) {
                                                    break;
                                                }
                                                GLF_live22looplimiter0++;
                                                {
                                                    GLF_live22coord -= GLF_live22uvstep;
                                                    GLF_live22refh += GLF_live22slope;
                                                    GLF_live22h = texture(GLF_live22tex, GLF_live22coord).y;
                                                    GLF_live22i++;
                                                }
                                            }
                                        }
                                    }
                                    ivec2 GLF_live16p = _GLF_FUZZED(ivec2(-96570, 41034));
                                    {
                                        if (GLF_live16looplimiter0 >= 6) {
                                            ;
                                            {
                                                vec3 GLF_live21color = _GLF_FUZZED((vec3(-581.915, -2.3, 5.1) * float(((-32814) + (-69519)))));
                                                vec2 GLF_live21uv = _GLF_FUZZED(vec2(149.147, -8.2));
                                                {
                                                    {
                                                        ;
                                                    }
                                                }
                                                if (GLF_live21uv.y > (2.0 / 4.0)) {
                                                    GLF_live21color.y += float(GLF_live21obj.numbers[6]);
                                                    {
                                                        {
                                                            ;
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                        GLF_live16looplimiter0++;
                                        {
                                            GLF_live16p = GLF_live16iter(GLF_live16p);
                                        }
                                    }
                                }
                                vec3 GLF_live7col = _GLF_FUZZED(vec3((0.3 * float(-7155))));
                                {
                                    vec2 GLF_live22coord = _GLF_FUZZED(vec2(2934.8046, -8.4));
                                    float GLF_live22h = _GLF_FUZZED(8.2);
                                    int GLF_live22i = _GLF_FUZZED(-17684);
                                    int GLF_live22looplimiter0 = 0;
                                    float GLF_live22refh = _GLF_FUZZED(1.8);
                                    float GLF_live22slope = _GLF_FUZZED(-10.48);
                                    vec2 GLF_live22uvstep = _GLF_FUZZED(vec2(-8.2));
                                    {
                                        vec2 GLF_live26center = _GLF_FUZZED(vec2(6558.8734, -3865.3191));
                                        int GLF_live26looplimiter0 = 0;
                                        int GLF_live26msb8 = _GLF_FUZZED(-8663);
                                        vec2 GLF_live26position = _GLF_FUZZED((mat2(-3.3, -86.36, 86.26, -285.175) * vec2(-3125.8402, -452.975)));
                                        vec3 GLF_live26result = _GLF_FUZZED((vec3(73.48, 11.93, 42.49) * vec2(3.5, -717.021).y));
                                        for (int GLF_live26i = bitfieldInsert(35, 0, 0, bitfieldExtract(int(GLF_live26resolution.x), 0, 1)); GLF_live26i >= bitfieldReverse(bitfieldExtract(int(GLF_live26resolution.x), 0, 1)); GLF_live26i--) {
                                            if (GLF_live26looplimiter0 >= 4) {
                                                break;
                                            }
                                            GLF_live26looplimiter0++;
                                            {
                                                vec3 GLF_live26d = _GLF_FUZZED(vec3(904.729, vec2(-5.6, 6.6)));
                                                GLF_live26d = GLF_live26drawShape(GLF_live26position, GLF_live26center + vec2(sin(float(GLF_live26i) / (float(bitCount(GLF_live26msb8)) * 10.0) + GLF_live26time) / 4.0 * float(bitCount(GLF_live26msb8)), float(bitfieldExtract(int(GLF_live26resolution.x), 0, 1))), vec3(0.01 + sin(float(GLF_live26i) / 100.0 * float(bitCount(GLF_live26msb8))), 0.01, float(GLF_live26i)));
                                                if (length(GLF_live26d) <= float(bitfieldExtract(int(GLF_live26resolution.x), 0, 1))) {
                                                    continue;
                                                }
                                                GLF_live26result = vec3(GLF_live26d);
                                            }
                                        }
                                    }
                                    {
                                        if (GLF_live22looplimiter0 >= 6) {
                                            ;
                                        }
                                        GLF_live22looplimiter0++;
                                        {
                                            GLF_live22coord -= GLF_live22uvstep;
                                            GLF_live22refh += GLF_live22slope;
                                            GLF_live22h = texture(GLF_live22tex, GLF_live22coord).y;
                                            GLF_live22i++;
                                        }
                                    }
                                }
                                vec2 GLF_live7uv = _GLF_FUZZED(vec2(3422.8894, -2.3));
                                {
                                    int GLF_live18looplimiter0 = 0;
                                    ivec2 GLF_live18pos = _GLF_FUZZED((ivec2(-37190, -60547) & 4722));
                                    {
                                        {
                                            {
                                                ;
                                                {
                                                    vec2 GLF_live23coord = _GLF_FUZZED(vec2(7.4, -7641.0705));
                                                    int GLF_live23i = _GLF_FUZZED((-(-44658)));
                                                    int GLF_live23looplimiter0 = 0;
                                                    vec4 GLF_live23res = _GLF_FUZZED((mat4(-3068.7478, 722.159, -404.222, 2212.2806, 99.63, -8344.5251, 2.8, -5.2, 1.5, -328.171, -9985.8515, -1.0, -9407.1092, -3.3, 2.5, -677.226) * vec4(2.4, -5.7, -3.8, -732.921)));
                                                    float GLF_live23uvstep = _GLF_FUZZED(vec2(-7.0, -736.820).x);
                                                    for (int GLF_live23j = 0; GLF_live23j < 3; GLF_live23j++) {
                                                        if (GLF_live23looplimiter0 >= 3) {
                                                            break;
                                                        }
                                                        GLF_live23looplimiter0++;
                                                        {
                                                            GLF_live23res += texture(GLF_live23tex, GLF_live23coord + vec2(float(GLF_live23i - 1) * GLF_live23uvstep, float(GLF_live23j - 1) * GLF_live23uvstep)) * GLF_live23weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live23i * 3 + GLF_live23j, 9)];
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                        if (GLF_live18looplimiter0 >= 5) {
                                            ;
                                        }
                                        GLF_live18looplimiter0++;
                                        {
                                            {
                                                vec3 GLF_live24color = _GLF_FUZZED(vec3(9655.0828, 7818.5477, -73.49));
                                                int GLF_live24count = _GLF_FUZZED((~5364));
                                                int GLF_live24looplimiter3 = 0;
                                                do {
                                                    if (GLF_live24looplimiter3 >= 4) {
                                                        break;
                                                    }
                                                    GLF_live24looplimiter3++;
                                                    {
                                                        GLF_live24color += GLF_live24palette(vec3(0.5, float(GLF_live24obj.numbers[8]) * 0.1, 0.2), vec3(0.5), trunc(vec3(GLF_live24injectionSwitch.y)), vec3(float(GLF_live24obj.numbers[4]) * 0.1, GLF_live24injectionSwitch.x, 0.6));
                                                        GLF_live24count++;
                                                    }
                                                } while (GLF_live24count != GLF_live24obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_live24injectionSwitch.x), 10)]);
                                            }
                                            if (GLF_live18pos.x < GLF_live18dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18pos.y, 256)] + 15 && GLF_live18pos.x > GLF_live18dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18pos.y, 256)] - 15) {
                                                float GLF_live18p = (15.0 - abs(float(GLF_live18pos.x - GLF_live18dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18pos.y, 256)]))) / 15.0;
                                                ;
                                            }
                                            {
                                                vec2 GLF_live22coord = _GLF_FUZZED(vec2(7.1, 68.22));
                                                float GLF_live22h = _GLF_FUZZED(-492.622);
                                                int GLF_live22i = _GLF_FUZZED(95955);
                                                int GLF_live22looplimiter0 = 0;
                                                float GLF_live22refh = _GLF_FUZZED(4.5);
                                                float GLF_live22slope = _GLF_FUZZED((vec4(-9.1, -9956.5580, -1.4, 1.7).x - (-66.09)));
                                                vec2 GLF_live22uvstep = _GLF_FUZZED(vec2(654.191, 48.44));
                                                {
                                                    if (GLF_live22looplimiter0 >= 6) {
                                                        ;
                                                    }
                                                    GLF_live22looplimiter0++;
                                                    {
                                                        GLF_live22coord -= GLF_live22uvstep;
                                                        GLF_live22refh += GLF_live22slope;
                                                        GLF_live22h = texture(GLF_live22tex, GLF_live22coord).y;
                                                        GLF_live22i++;
                                                    }
                                                }
                                            }
                                            GLF_live18pos.y++;
                                        }
                                    }
                                }
                                {
                                    int GLF_live19msb8 = _GLF_FUZZED(53849);
                                    vec2 GLF_live19pos = _GLF_FUZZED(vec2(-9.9, -1.8));
                                    {
                                        int GLF_live25a = _GLF_FUZZED(ivec4(49807, -17287, -98918, 81833).y);
                                        int GLF_live25b = _GLF_FUZZED((80729));
                                        int GLF_live25c = _GLF_FUZZED((false ? (+ivec2(-22228, -92983)).x : 24815));
                                        int GLF_live25looplimiter2 = 0;
                                        vec2 GLF_live25uv = _GLF_FUZZED(vec2(-83.06, -16.57));
                                        do {
                                            if (GLF_live25looplimiter2 >= 4) {
                                                break;
                                            }
                                            GLF_live25looplimiter2++;
                                            {
                                                GLF_live25uv.y -= step(GLF_live25injectionSwitch.y, GLF_live25uv.x) + float(GLF_live25a) + float(GLF_live25b);
                                                GLF_live25uv.x += ldexp(GLF_live25injectionSwitch.y, isinf(GLF_live25uv.y + GLF_live25uv.x) ? findMSB(GLF_live25b) : findMSB(GLF_live25a));
                                                GLF_live25c--;
                                            }
                                        } while (GLF_live25c > int(GLF_live25injectionSwitch.x));
                                    }
                                    vec3 GLF_live19setting = _GLF_FUZZED((vec3(-12.68, 8.5, 2250.0324) * ((-103.073) - (-401.596))));
                                    {
                                        ;
                                    }
                                }
                                {
                                    {
                                        int GLF_live22looplimiter0 = 0;
                                        if (GLF_live22looplimiter0 >= 6) {
                                            ;
                                        }
                                    }
                                    float GLF_live7stripe = GLF_live7compute_stripe(cos((GLF_live7uv.x + GLF_live7uv.y) * 20.0), GLF_live7uv.x + GLF_live7uv.y);
                                    {
                                        int GLF_live18looplimiter0 = 0;
                                        ivec2 GLF_live18pos = _GLF_FUZZED(ivec2(16377, 58042));
                                        while (GLF_live18pos.y != 256) {
                                            if (GLF_live18looplimiter0 >= 5) {
                                                break;
                                            }
                                            GLF_live18looplimiter0++;
                                            {
                                                if (GLF_live18pos.x < GLF_live18dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18pos.y, 256)] + 15 && GLF_live18pos.x > GLF_live18dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18pos.y, 256)] - 15) {
                                                    float GLF_live18p = (15.0 - abs(float(GLF_live18pos.x - GLF_live18dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18pos.y, 256)]))) / 15.0;
                                                    ;
                                                }
                                                GLF_live18pos.y++;
                                                {
                                                    vec3 GLF_live24color = _GLF_FUZZED(vec3(5.0, 383.657, 28.30));
                                                    int GLF_live24count = _GLF_FUZZED(-50836);
                                                    int GLF_live24looplimiter3 = 0;
                                                    {
                                                        if (GLF_live24looplimiter3 >= 4) {
                                                            ;
                                                        }
                                                        GLF_live24looplimiter3++;
                                                        {
                                                            GLF_live24color += GLF_live24palette(vec3(0.5, float(GLF_live24obj.numbers[8]) * 0.1, 0.2), vec3(0.5), trunc(vec3(GLF_live24injectionSwitch.y)), vec3(float(GLF_live24obj.numbers[4]) * 0.1, GLF_live24injectionSwitch.x, 0.6));
                                                            GLF_live24count++;
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
                                    GLF_live7col = mix(vec3(GLF_live7uv.x, 0, 0.75), vec3(.8, .7, GLF_live7uv.x), GLF_live7stripe);
                                    {
                                        {
                                            ;
                                        }
                                    }
                                    GLF_live7_GLF_color = vec4(GLF_live7col, 1.0);
                                    ;
                                }
                            }
                            break;
                        }
                        {
                            {
                                ;
                            }
                        }
                        GLF_live6looplimiter2++;
                        {
                            {
                                vec2 GLF_live9color = _GLF_FUZZED(vec2(39.30, 0.0));
                                vec3 GLF_live9vecCoor = _GLF_FUZZED(vec3(3.7, 4228.7686, -3555.9557));
                                {
                                    {
                                        {
                                            int GLF_live25a = _GLF_FUZZED(7737);
                                            int GLF_live25looplimiter0 = 0;
                                            vec2 GLF_live25uv = _GLF_FUZZED((mat2(1.0, -5.6, 6074.7901, 1379.8665) * vec2(80.54, -1.8)));
                                            {
                                                if (GLF_live25looplimiter0 >= 4) {
                                                    ;
                                                }
                                                GLF_live25looplimiter0++;
                                                {
                                                    GLF_live25uv.y -= step(GLF_live25injectionSwitch.y, GLF_live25uv.x);
                                                    GLF_live25uv.x -= tanh(GLF_live25uv.x * 0.25) / ldexp(GLF_live25injectionSwitch.y, findMSB(GLF_live25a));
                                                    GLF_live25a--;
                                                }
                                            }
                                        }
                                        ;
                                    }
                                }
                                {
                                    GLF_live9color = fract(sin(GLF_live9vecCoor.yx - trunc(float(GLF_live9data[1]))));
                                    GLF_live9color[1] *= atan(faceforward(GLF_live9injectionSwitch, GLF_live9color.xx, GLF_live9vecCoor.yx).y);
                                    {
                                        {
                                            ;
                                            {
                                                int GLF_live19msb8 = _GLF_FUZZED((52356 - (-95524)));
                                                {
                                                    GLF_live19b_b = clamp(GLF_live19b_b * float(bitCount(GLF_live19msb8)) * 3.0, float(bitfieldExtract(int(GLF_live19resolution.x), 0, 1)), float(bitCount(GLF_live19msb8)));
                                                }
                                            }
                                        }
                                        {
                                            vec3 GLF_live21color = _GLF_FUZZED(vec3(14.05, -6.1, -5.7));
                                            {
                                                GLF_live21color.z += float(GLF_live21obj.numbers[3]);
                                            }
                                        }
                                        {
                                            vec2 GLF_live23coord = _GLF_FUZZED((mat3(6.9, -367.631, -437.543, -58.17, 58.50, -899.574, 22.64, 6.8, 4522.0736) * vec3(-282.535, -2102.2301, 9.2)).ts);
                                            int GLF_live23i = _GLF_FUZZED(((-50641) ^ 43271));
                                            int GLF_live23j = _GLF_FUZZED(int((true ? 31137u : 58375u)));
                                            vec4 GLF_live23res = _GLF_FUZZED(vec4(865.642, -89.76, 787.392, 3216.9539));
                                            float GLF_live23uvstep = _GLF_FUZZED(-0.0);
                                            {
                                                GLF_live23res += texture(GLF_live23tex, GLF_live23coord + vec2(float(GLF_live23i - 1) * GLF_live23uvstep, float(GLF_live23j - 1) * GLF_live23uvstep)) * GLF_live23weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live23i * 3 + GLF_live23j, 9)];
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
                            {
                                ivec2 GLF_live16p = _GLF_FUZZED(ivec2(-76777));
                                if (GLF_live16p.x > 0) {
                                    GLF_live16p.y--;
                                    {
                                        vec2 GLF_live26center = _GLF_FUZZED(vec2(45.31, 2.5));
                                        int GLF_live26i = _GLF_FUZZED(ivec2(-55063, 86734).g);
                                        int GLF_live26looplimiter0 = 0;
                                        int GLF_live26msb8 = _GLF_FUZZED(17505);
                                        vec2 GLF_live26position = _GLF_FUZZED(((vec2(26.21, 3.0)) + vec2(33.48, -5.8)));
                                        vec3 GLF_live26result = _GLF_FUZZED(vec3(83.30, -4.7, -5137.6486));
                                        {
                                            if (GLF_live26looplimiter0 >= 4) {
                                                ;
                                            }
                                            GLF_live26looplimiter0++;
                                            {
                                                vec3 GLF_live26d = _GLF_FUZZED(vec3(904.729, vec2(-5.6, 6.6)));
                                                GLF_live26d = GLF_live26drawShape(GLF_live26position, GLF_live26center + vec2(sin(float(GLF_live26i) / (float(bitCount(GLF_live26msb8)) * 10.0) + GLF_live26time) / 4.0 * float(bitCount(GLF_live26msb8)), float(bitfieldExtract(int(GLF_live26resolution.x), 0, 1))), vec3(0.01 + sin(float(GLF_live26i) / 100.0 * float(bitCount(GLF_live26msb8))), 0.01, float(GLF_live26i)));
                                                if (length(GLF_live26d) <= float(bitfieldExtract(int(GLF_live26resolution.x), 0, 1))) {
                                                    ;
                                                }
                                                GLF_live26result = vec3(GLF_live26d);
                                            }
                                        }
                                    }
                                }
                            }
                            GLF_live6data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6i, 10)] = GLF_live6temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live6i, 10)];
                        }
                        {
                            vec2 GLF_live10coord = _GLF_FUZZED((true ? vec3(2502.3418, -23.83, 6078.9541) : vec3(-5.0, -23.98, 5474.7202)).yz);
                            int GLF_live10i = _GLF_FUZZED(97598);
                            vec4 GLF_live10texel = _GLF_FUZZED((mat3x4(-953.171, -3.0, 82.02, -702.535, 49.77, 43.20, -6.1, 913.379, -6.1, 5836.1682, -83.89, -3.4) * (mat2x3(-287.379, -36.71, -1.4, -6838.2022, 897.156, -64.52) * vec2(-1.5, 186.281))));
                            {
                                {
                                    bool GLF_live26c3 = _GLF_FUZZED(false);
                                    if (!GLF_live26c3) {
                                        ;
                                    }
                                }
                                int GLF_live10looplimiter0 = 0;
                                {
                                    {
                                        bool GLF_live26c1 = _GLF_FUZZED(false);
                                        if (!GLF_live26c1) {
                                            ;
                                        }
                                    }
                                    int GLF_live21looplimiter0 = 0;
                                    if (GLF_live21looplimiter0 >= 3) {
                                        ;
                                    }
                                }
                                while (GLF_live10texel.x + GLF_live10texel.y + GLF_live10texel.z > 1.0 && GLF_live10i < 16) {
                                    if (GLF_live10looplimiter0 >= 3) {
                                        {
                                            int GLF_live26msb8 = _GLF_FUZZED(int(185385u));
                                            vec2 GLF_live26pos = _GLF_FUZZED((vec2(-1.8, 11.92) - 5.7));
                                            vec3 GLF_live26setting = _GLF_FUZZED(vec3(-8651.4034, 548.769, -23.97));
                                            {
                                                ;
                                            }
                                        }
                                        break;
                                    }
                                    GLF_live10looplimiter0++;
                                    {
                                        int GLF_live24i = _GLF_FUZZED(-74773);
                                        int GLF_live24j = _GLF_FUZZED((33588 ^ (-12837)));
                                        {
                                            GLF_live24i++;
                                            GLF_live24swap(GLF_live24i, GLF_live24j);
                                        }
                                    }
                                    {
                                        GLF_live10coord = GLF_live10texel.xz + GLF_live10texel.yy;
                                        {
                                            {
                                                ivec2 GLF_live18pos = _GLF_FUZZED((+ivec2(-47721, -51053)));
                                                if (GLF_live18pos.x < GLF_live18dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18pos.y, 256)] + 15 && GLF_live18pos.x > GLF_live18dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18pos.y, 256)] - 15) {
                                                    float GLF_live18p = (15.0 - abs(float(GLF_live18pos.x - GLF_live18dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18pos.y, 256)]))) / 15.0;
                                                    ;
                                                }
                                            }
                                            {
                                                vec2 GLF_live26center = _GLF_FUZZED(vec2(-1206.6150, -791.286));
                                                int GLF_live26i = _GLF_FUZZED(14029);
                                                int GLF_live26msb8 = _GLF_FUZZED(-79860);
                                                vec2 GLF_live26position = _GLF_FUZZED(((vec3(496.060, -6.3, 2.3) - 5222.9090) * mat2x3(-46.81, 5.8, 8.1, 1.5, 7.0, 152.299)));
                                                vec3 GLF_live26result = _GLF_FUZZED((vec3(-4.0) * 611.138));
                                                {
                                                    vec3 GLF_live26d = _GLF_FUZZED(vec3(904.729, vec2(-5.6, 6.6)));
                                                    GLF_live26d = GLF_live26drawShape(GLF_live26position, GLF_live26center + vec2(sin(float(GLF_live26i) / (float(bitCount(GLF_live26msb8)) * 10.0) + GLF_live26time) / 4.0 * float(bitCount(GLF_live26msb8)), float(bitfieldExtract(int(GLF_live26resolution.x), 0, 1))), vec3(0.01 + sin(float(GLF_live26i) / 100.0 * float(bitCount(GLF_live26msb8))), 0.01, float(GLF_live26i)));
                                                    if (length(GLF_live26d) <= float(bitfieldExtract(int(GLF_live26resolution.x), 0, 1))) {
                                                        ;
                                                    }
                                                    GLF_live26result = vec3(GLF_live26d);
                                                }
                                            }
                                            int GLF_live14iteration = _GLF_FUZZED((~((-73071) ^ (-82006))));
                                            {
                                                {
                                                    int GLF_live25a = _GLF_FUZZED(-58361);
                                                    int GLF_live25b = _GLF_FUZZED(((-96098) | (-42097)));
                                                    int GLF_live25c = _GLF_FUZZED(ivec3(-60650, -62561, -30696).s);
                                                    int GLF_live25looplimiter2 = 0;
                                                    vec2 GLF_live25uv = _GLF_FUZZED(vec2((9.1 * (-6.1)), ((6.3 * (-27.25)) - (-85.16))));
                                                    {
                                                        if (GLF_live25looplimiter2 >= 4) {
                                                            ;
                                                        }
                                                        GLF_live25looplimiter2++;
                                                        {
                                                            GLF_live25uv.y -= step(GLF_live25injectionSwitch.y, GLF_live25uv.x) + float(GLF_live25a) + float(GLF_live25b);
                                                            GLF_live25uv.x += ldexp(GLF_live25injectionSwitch.y, isinf(GLF_live25uv.y + GLF_live25uv.x) ? findMSB(GLF_live25b) : findMSB(GLF_live25a));
                                                            GLF_live25c--;
                                                        }
                                                    }
                                                }
                                                ;
                                            }
                                            {
                                                int GLF_live21i = _GLF_FUZZED((int(107343u) | ivec2(37008, -51781).t));
                                                {
                                                    GLF_live21obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_live21i, 10)] = (10 - GLF_live21i);
                                                    GLF_live21obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_live21i, 10)] = GLF_live21obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_live21i, 10)] * GLF_live21obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_live21i, 10)];
                                                }
                                            }
                                        }
                                        GLF_live10coord = floor(GLF_live10coord * 256.0) / 256.0;
                                        GLF_live10texel = texture(GLF_live10tex, GLF_live10coord);
                                        GLF_live10i++;
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
                {
                    {
                        {
                            ivec2 GLF_live18pos = _GLF_FUZZED(ivec2(-27661, 4228));
                            {
                                int GLF_live18looplimiter0 = 0;
                                while (GLF_live18pos.y != 256) {
                                    if (GLF_live18looplimiter0 >= 5) {
                                        break;
                                        {
                                            int GLF_live25looplimiter2 = 0;
                                            if (GLF_live25looplimiter2 >= 4) {
                                                ;
                                            }
                                        }
                                    }
                                    GLF_live18looplimiter0++;
                                    {
                                        {
                                            int GLF_live23looplimiter0 = 0;
                                            if (GLF_live23looplimiter0 >= 3) {
                                                ;
                                            }
                                        }
                                        {
                                            vec2 GLF_live19center = _GLF_FUZZED(vec2(4.6, -133.031));
                                            int GLF_live19i = _GLF_FUZZED((26432 * 4026));
                                            int GLF_live19looplimiter0 = 0;
                                            int GLF_live19msb8 = _GLF_FUZZED(-56155);
                                            vec2 GLF_live19position = _GLF_FUZZED((69.47 - vec2(-927.577, 77.95)));
                                            vec3 GLF_live19result = _GLF_FUZZED((mat2x3(20.50, -1.9, 2114.2551, 76.64, 97.53, 38.71) * vec2(6024.5459, -585.287)));
                                            {
                                                if (GLF_live19looplimiter0 >= 4) {
                                                    ;
                                                }
                                                GLF_live19looplimiter0++;
                                                {
                                                    vec3 GLF_live19d = _GLF_FUZZED((false ? vec3(9.0, 2678.5170, 5.9) : vec3(835.653, -95.09, -6895.0876)));
                                                    GLF_live19d = GLF_live19drawShape(GLF_live19position, GLF_live19center + vec2(sin(float(GLF_live19i) / (float(bitCount(GLF_live19msb8)) * 10.0) + GLF_live19time) / 4.0 * float(bitCount(GLF_live19msb8)), float(bitfieldExtract(int(GLF_live19resolution.x), 0, 1))), vec3(0.01 + sin(float(GLF_live19i) / 100.0 * float(bitCount(GLF_live19msb8))), 0.01, float(GLF_live19i)));
                                                    {
                                                        int GLF_live24i = _GLF_FUZZED((-7409));
                                                        {
                                                            GLF_live24obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_live24i, 10)] = (10 - GLF_live24i) * int(GLF_live24injectionSwitch.y);
                                                        }
                                                    }
                                                    if (length(GLF_live19d) <= float(bitfieldExtract(int(GLF_live19resolution.x), 0, 1))) {
                                                        ;
                                                    }
                                                    GLF_live19result = vec3(GLF_live19d);
                                                }
                                            }
                                        }
                                        if (GLF_live18pos.x < GLF_live18dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18pos.y, 256)] + 15 && GLF_live18pos.x > GLF_live18dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18pos.y, 256)] - 15) {
                                            float GLF_live18p = (15.0 - abs(float(GLF_live18pos.x - GLF_live18dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18pos.y, 256)]))) / 15.0;
                                            ;
                                        }
                                        {
                                            {
                                                vec2 GLF_live23coord = _GLF_FUZZED((vec4(-31.65, -3.8, -333.786, 733.833) * (mat2x4(mat3x2(80.37, 94.36, -3.4, -52.16, 0.5, -5780.6807)))));
                                                int GLF_live23i = _GLF_FUZZED(93014);
                                                int GLF_live23looplimiter1 = 0;
                                                vec4 GLF_live23res = _GLF_FUZZED(vec4(-7035.9119, -2414.7041, -3827.0402, -7.1));
                                                float GLF_live23uvstep = _GLF_FUZZED(vec4(-7841.1205, -69.98, -4.5, 2467.6888).y);
                                                {
                                                    if (GLF_live23looplimiter1 >= 3) {
                                                        ;
                                                    }
                                                    GLF_live23looplimiter1++;
                                                    {
                                                        {
                                                            int GLF_live23looplimiter0 = 0;
                                                            for (int GLF_live23j = 0; GLF_live23j < 3; GLF_live23j++) {
                                                                if (GLF_live23looplimiter0 >= 3) {
                                                                    break;
                                                                }
                                                                GLF_live23looplimiter0++;
                                                                {
                                                                    GLF_live23res += texture(GLF_live23tex, GLF_live23coord + vec2(float(GLF_live23i - 1) * GLF_live23uvstep, float(GLF_live23j - 1) * GLF_live23uvstep)) * GLF_live23weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live23i * 3 + GLF_live23j, 9)];
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                            vec3 GLF_live21color = _GLF_FUZZED((vec3(-545.361, -6.6, 873.001)));
                                            {
                                                vec2 GLF_live23coord = _GLF_FUZZED(vec2(7173.0290, -5.2));
                                                int GLF_live23i = _GLF_FUZZED(65198);
                                                int GLF_live23looplimiter1 = 0;
                                                vec4 GLF_live23res = _GLF_FUZZED(vec4(-2.2, -82.53, -719.103, 4407.4701));
                                                float GLF_live23uvstep = _GLF_FUZZED(-567.588);
                                                {
                                                    if (GLF_live23looplimiter1 >= 3) {
                                                        ;
                                                    }
                                                    GLF_live23looplimiter1++;
                                                    {
                                                        {
                                                            int GLF_live23looplimiter0 = 0;
                                                            for (int GLF_live23j = 0; GLF_live23j < 3; GLF_live23j++) {
                                                                if (GLF_live23looplimiter0 >= 3) {
                                                                    break;
                                                                }
                                                                GLF_live23looplimiter0++;
                                                                {
                                                                    GLF_live23res += texture(GLF_live23tex, GLF_live23coord + vec2(float(GLF_live23i - 1) * GLF_live23uvstep, float(GLF_live23j - 1) * GLF_live23uvstep)) * GLF_live23weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live23i * 3 + GLF_live23j, 9)];
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                            vec2 GLF_live21uv = _GLF_FUZZED(vec2(4.0, -50.82));
                                            if (abs(GLF_live21uv.x - GLF_live21uv.y) < 0.25) {
                                                GLF_live21color.x += float(GLF_live21obj.numbers[9]);
                                            }
                                        }
                                        GLF_live18pos.y++;
                                    }
                                }
                            }
                        }
                        ;
                    }
                    {
                        vec3 GLF_live26d = _GLF_FUZZED((vec4(1.3, -5.2, -3489.1460, -4.3) * (mat2x4(8.5, 437.997, -518.889, -33.78, -46.45, 5.2, 6.9, -857.584) * mat3x2(-731.818, 62.09, 0.2, 61.29, 1902.6783, -0.1))));
                        if (length(GLF_live26d) <= float(bitfieldExtract(int(GLF_live26resolution.x), 0, 1))) {
                            ;
                        }
                    }
                }
                {
                    int GLF_live25a = _GLF_FUZZED(89796);
                    int GLF_live25b = _GLF_FUZZED(((+((-2580) + (-48336))) ^ 31160));
                    int GLF_live25c = _GLF_FUZZED(-70261);
                    int GLF_live25looplimiter2 = 0;
                    vec2 GLF_live25uv = _GLF_FUZZED(vec2(650.780, 1.2).st);
                    do {
                        if (GLF_live25looplimiter2 >= 4) {
                            break;
                        }
                        GLF_live25looplimiter2++;
                        {
                            GLF_live25uv.y -= step(GLF_live25injectionSwitch.y, GLF_live25uv.x) + float(GLF_live25a) + float(GLF_live25b);
                            GLF_live25uv.x += ldexp(GLF_live25injectionSwitch.y, isinf(GLF_live25uv.y + GLF_live25uv.x) ? findMSB(GLF_live25b) : findMSB(GLF_live25a));
                            GLF_live25c--;
                        }
                    } while (GLF_live25c > int(GLF_live25injectionSwitch.x));
                }
                _GLF_color = vec4(A[10] / resolution.x, A[14] / resolution.y, 1.0, 1.0);
                {
                    {
                        vec2 GLF_live23coord = _GLF_FUZZED(vec2(-96.31, -8603.2885));
                        int GLF_live23i = _GLF_FUZZED((~(-38401)));
                        int GLF_live23j = _GLF_FUZZED(int((92086u ^ 180224u)));
                        int GLF_live23looplimiter0 = 0;
                        vec4 GLF_live23res = _GLF_FUZZED(vec4(-44.91, -3942.3707, -3734.7939, 3.8));
                        float GLF_live23uvstep = _GLF_FUZZED(231.376);
                        {
                            if (GLF_live23looplimiter0 >= 3) {
                                ;
                            }
                            GLF_live23looplimiter0++;
                            {
                                GLF_live23res += texture(GLF_live23tex, GLF_live23coord + vec2(float(GLF_live23i - 1) * GLF_live23uvstep, float(GLF_live23j - 1) * GLF_live23uvstep)) * GLF_live23weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live23i * 3 + GLF_live23j, 9)];
                            }
                        }
                    }
                    int GLF_live19looplimiter0 = 0;
                    {
                        {
                            ;
                        }
                    }
                    if (GLF_live19looplimiter0 >= 4) {
                        ;
                        {
                            bool GLF_live26c5 = _GLF_FUZZED(((-82000) == 72239));
                            int GLF_live26msb8 = _GLF_FUZZED(-41350);
                            vec2 GLF_live26pos = _GLF_FUZZED(vec2(vec3(568.349, -4.5, -14.81)));
                            vec3 GLF_live26setting = _GLF_FUZZED(vec3(-0.7, -8875.7063, -6.3));
                            if (!GLF_live26c5) {
                                ;
                            }
                        }
                    }
                }
                {
                    int GLF_live16i = _GLF_FUZZED((56267 + 24740));
                    int GLF_live16looplimiter0 = 0;
                    ivec2 GLF_live16p = _GLF_FUZZED(ivec2(-53285, 8489));
                    for (GLF_live16i = 0; GLF_live16i < 100; GLF_live16i++) {
                        if (GLF_live16looplimiter0 >= 6) {
                            break;
                        }
                        GLF_live16looplimiter0++;
                        {
                            GLF_live16p = GLF_live16iter(GLF_live16p);
                        }
                    }
                }
                {
                    vec2 GLF_live11a = _GLF_FUZZED((mat2(392.616, 31.39, 2.1, -80.78) * vec2(3059.8541, -7.5)).gr);
                    float GLF_live11z = _GLF_FUZZED(((-7.7) - (-6190.2203)));
                    if (GLF_live11a.y > GLF_live11a.x) {
                        GLF_live11z = GLF_live11a.x / GLF_live11a.y;
                        {
                            bool GLF_live19c3 = _GLF_FUZZED(((vec4(-67.74, 8.1, 864.844, -8.8) * mat3x4(-2.3, 80.06, 5714.0379, 193.396, 4.7, -6.5, 6.3, 4869.7042, 7586.1416, 4.5, -6.2, 8124.0834)) != vec4(7.4, -121.813, -0.6, 4.7).qqp));
                            if (!GLF_live19c3) {
                                ;
                            }
                        }
                        {
                            {
                                int GLF_live20iteration = _GLF_FUZZED(-12442);
                                {
                                    ;
                                }
                                {
                                    int GLF_live24h = _GLF_FUZZED(37345);
                                    int GLF_live24i = _GLF_FUZZED(int(uint(-21520)));
                                    int GLF_live24l = _GLF_FUZZED(38713);
                                    int GLF_live24looplimiter0 = 0;
                                    int GLF_live24pivot = _GLF_FUZZED(-84190);
                                    for (int GLF_live24j = GLF_live24l; GLF_live24j <= GLF_live24h - 1; GLF_live24j++) {
                                        if (GLF_live24looplimiter0 >= 4) {
                                            break;
                                        }
                                        GLF_live24looplimiter0++;
                                        {
                                            if (GLF_live24obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_live24j, 10)] <= GLF_live24pivot) {
                                                GLF_live24i++;
                                                GLF_live24swap(GLF_live24i, GLF_live24j);
                                            }
                                        }
                                    }
                                }
                            }
                            int GLF_live16looplimiter1 = 0;
                            ivec2 GLF_live16p = _GLF_FUZZED(ivec2(-93406, -73483));
                            while (GLF_live16p.x > 15) {
                                if (GLF_live16looplimiter1 >= 6) {
                                    break;
                                }
                                GLF_live16looplimiter1++;
                                {
                                    {
                                        vec2 GLF_live19center = _GLF_FUZZED((vec3(-4.7, 5767.3998, 41.06) * mat2x3(-6326.2479, -4.3, 4007.5436, 8213.4495, -223.389, -74.76)));
                                        int GLF_live19i = _GLF_FUZZED(54161);
                                        {
                                            vec2 GLF_live23coord = _GLF_FUZZED((vec2(12.51, 1439.2299) * vec2(-2344.2971, 8.5)));
                                            int GLF_live23i = _GLF_FUZZED(ivec4(-8923, -62902, -4307, 79607).w);
                                            vec4 GLF_live23res = _GLF_FUZZED((vec4(-3374.5211, -9.0, 4324.9137, -6.2) - (-63.14)));
                                            float GLF_live23uvstep = _GLF_FUZZED(float((-(-71221))));
                                            {
                                                int GLF_live23looplimiter0 = 0;
                                                for (int GLF_live23j = 0; GLF_live23j < 3; GLF_live23j++) {
                                                    if (GLF_live23looplimiter0 >= 3) {
                                                        break;
                                                    }
                                                    GLF_live23looplimiter0++;
                                                    {
                                                        GLF_live23res += texture(GLF_live23tex, GLF_live23coord + vec2(float(GLF_live23i - 1) * GLF_live23uvstep, float(GLF_live23j - 1) * GLF_live23uvstep)) * GLF_live23weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live23i * 3 + GLF_live23j, 9)];
                                                    }
                                                }
                                            }
                                        }
                                        int GLF_live19looplimiter0 = 0;
                                        int GLF_live19msb8 = _GLF_FUZZED(((78792 - 98081) - 86755));
                                        vec2 GLF_live19position = _GLF_FUZZED(vec2(-828.002, 4.1).rg);
                                        vec3 GLF_live19result = _GLF_FUZZED(vec3(4016.6772, 76.32, -3.9));
                                        {
                                            if (GLF_live19looplimiter0 >= 4) {
                                                ;
                                            }
                                            GLF_live19looplimiter0++;
                                            {
                                                vec3 GLF_live19d = _GLF_FUZZED((false ? vec3(9.0, 2678.5170, 5.9) : vec3(835.653, -95.09, -6895.0876)));
                                                GLF_live19d = GLF_live19drawShape(GLF_live19position, GLF_live19center + vec2(sin(float(GLF_live19i) / (float(bitCount(GLF_live19msb8)) * 10.0) + GLF_live19time) / 4.0 * float(bitCount(GLF_live19msb8)), float(bitfieldExtract(int(GLF_live19resolution.x), 0, 1))), vec3(0.01 + sin(float(GLF_live19i) / 100.0 * float(bitCount(GLF_live19msb8))), 0.01, float(GLF_live19i)));
                                                if (length(GLF_live19d) <= float(bitfieldExtract(int(GLF_live19resolution.x), 0, 1))) {
                                                    ;
                                                    {
                                                        vec3 GLF_live24color = _GLF_FUZZED(vec3(-122.789, 9.7, 692.449));
                                                        vec2 GLF_live24grid = _GLF_FUZZED(vec2(39.67, 6832.1165));
                                                        {
                                                            int GLF_live24count = int(GLF_live24injectionSwitch.x);
                                                            {
                                                                int GLF_live24looplimiter5 = 0;
                                                                do {
                                                                    if (GLF_live24looplimiter5 >= 4) {
                                                                        break;
                                                                    }
                                                                    GLF_live24looplimiter5++;
                                                                    {
                                                                        GLF_live24color -= GLF_live24palette(vec3(float(GLF_live24obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_live24injectionSwitch.y), 10)]) * 0.1), vec3(0.8), trunc(vec3(0.1)), vec3(GLF_live24injectionSwitch.x, 0.6, float(GLF_live24obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_live24injectionSwitch.x), 10)]) * 0.1));
                                                                        GLF_live24count++;
                                                                    }
                                                                } while (GLF_live24count != GLF_live24obj.numbers[2]);
                                                            }
                                                            GLF_live24grid += vec2(GLF_live24count + GLF_live24obj.numbers[3], GLF_live24count + GLF_live24obj.numbers[3]);
                                                        }
                                                    }
                                                }
                                                GLF_live19result = vec3(GLF_live19d);
                                            }
                                        }
                                    }
                                    GLF_live16p.x -= 16;
                                }
                            }
                        }
                        {
                            vec2 GLF_live23coord = _GLF_FUZZED(vec2(69.40, -4.5));
                            int GLF_live23i = _GLF_FUZZED(87847);
                            int GLF_live23looplimiter0 = 0;
                            vec4 GLF_live23res = _GLF_FUZZED(vec4(-2.6, -7.5, -17.39, 497.441));
                            float GLF_live23uvstep = _GLF_FUZZED(-9.7);
                            for (int GLF_live23j = 0; GLF_live23j < 3; GLF_live23j++) {
                                if (GLF_live23looplimiter0 >= 3) {
                                    break;
                                }
                                GLF_live23looplimiter0++;
                                {
                                    GLF_live23res += texture(GLF_live23tex, GLF_live23coord + vec2(float(GLF_live23i - 1) * GLF_live23uvstep, float(GLF_live23j - 1) * GLF_live23uvstep)) * GLF_live23weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live23i * 3 + GLF_live23j, 9)];
                                }
                            }
                        }
                    } else {
                        {
                            {
                                ;
                            }
                        }
                        GLF_live11z = GLF_live11a.y / GLF_live11a.x;
                    }
                }
            } else if (int(gl_FragCoord.x) < 80) {
                {
                    int GLF_live4looplimiter9 = 0;
                    if (GLF_live4looplimiter9 >= 6) {
                        {
                            bool GLF_live19c5 = _GLF_FUZZED(true);
                            int GLF_live19msb8 = _GLF_FUZZED(ivec4(-23507, 66451, 23668, -42555).x);
                            vec2 GLF_live19pos = _GLF_FUZZED(vec2(8.1, 6.6));
                            vec3 GLF_live19setting = _GLF_FUZZED(vec3(634.531, 3252.1937, 6879.5394));
                            if (!GLF_live19c5) {
                                ;
                            }
                        }
                        ;
                        {
                            int GLF_live18looplimiter0 = 0;
                            {
                                vec2 GLF_live22coord = _GLF_FUZZED(vec4(-316.442, -2145.2102, 9711.1107, -6.5).xw);
                                float GLF_live22h = _GLF_FUZZED(-8505.4272);
                                int GLF_live22i = _GLF_FUZZED((-76637));
                                {
                                    int GLF_live25looplimiter1 = 0;
                                    if (GLF_live25looplimiter1 >= 4) {
                                        ;
                                    }
                                }
                                float GLF_live22refh = _GLF_FUZZED((vec4(-909.158, -8.6, -6543.0546, -858.926).p + (-4.1)));
                                float GLF_live22slope = _GLF_FUZZED(float(-89408));
                                vec2 GLF_live22uvstep = _GLF_FUZZED(((vec2(-5.5, -1929.4493) * mat2(-2.2, 21.70, 51.61, 1.4)) - vec2(4.5, -7.3)));
                                {
                                    {
                                        int GLF_live23looplimiter1 = 0;
                                        if (GLF_live23looplimiter1 >= 3) {
                                            ;
                                        }
                                    }
                                    int GLF_live22looplimiter0 = 0;
                                    while (GLF_live22h < GLF_live22refh && GLF_live22i < 32) {
                                        if (GLF_live22looplimiter0 >= 6) {
                                            break;
                                        }
                                        GLF_live22looplimiter0++;
                                        {
                                            GLF_live22coord -= GLF_live22uvstep;
                                            GLF_live22refh += GLF_live22slope;
                                            GLF_live22h = texture(GLF_live22tex, GLF_live22coord).y;
                                            GLF_live22i++;
                                        }
                                        {
                                            vec2 GLF_live23coord = _GLF_FUZZED(vec2(5.6, 5712.3931));
                                            int GLF_live23i = _GLF_FUZZED(-86045);
                                            int GLF_live23j = _GLF_FUZZED(-28205);
                                            vec4 GLF_live23res = _GLF_FUZZED(vec4(229.540, 9503.0302, -79.42, -4757.6078));
                                            float GLF_live23uvstep = _GLF_FUZZED(vec4(-3.8, 5858.2039, -7465.0068, 4541.0624).t);
                                            {
                                                GLF_live23res += texture(GLF_live23tex, GLF_live23coord + vec2(float(GLF_live23i - 1) * GLF_live23uvstep, float(GLF_live23j - 1) * GLF_live23uvstep)) * GLF_live23weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live23i * 3 + GLF_live23j, 9)];
                                            }
                                        }
                                    }
                                }
                            }
                            if (GLF_live18looplimiter0 >= 5) {
                                ;
                            }
                        }
                    }
                }
                _GLF_color = vec4(A[15] / resolution.x, A[19] / resolution.y, 1.0, 1.0);
            } else if (int(gl_FragCoord.x) < 100) {
                {
                    float GLF_live4alpha3 = _GLF_FUZZED(609.688);
                    int GLF_live4j = _GLF_FUZZED((false ? (-60451) : (-70353)));
                    {
                        int GLF_live25a = _GLF_FUZZED(ivec2(-96430, 45003).t);
                        int GLF_live25b = _GLF_FUZZED(ivec4(-69106, 52604, -82783, -64173).yz.s);
                        int GLF_live25c = _GLF_FUZZED((~49972));
                        vec2 GLF_live25uv = _GLF_FUZZED((vec2(8.3, 827.557) + vec2(5452.2520, 37.42)));
                        {
                            GLF_live25uv.y -= step(GLF_live25injectionSwitch.y, GLF_live25uv.x) + float(GLF_live25a) + float(GLF_live25b);
                            GLF_live25uv.x += ldexp(GLF_live25injectionSwitch.y, isinf(GLF_live25uv.y + GLF_live25uv.x) ? findMSB(GLF_live25b) : findMSB(GLF_live25a));
                            GLF_live25c--;
                        }
                    }
                    int GLF_live4k = _GLF_FUZZED(33795);
                    mat4 GLF_live4matrix_a = _GLF_FUZZED(mat4((false ? mat3(440.883, 4185.2905, -2.0, -4.6, 1610.4744, -476.737, 2.9, 614.063, 7.4) : mat3(2506.3590, 74.77, -444.537, 252.580, 7.1, 5.5, -29.95, -4.8, 589.791))));
                    vec4 GLF_live4matrix_u = _GLF_FUZZED(vec4(3.5, -2515.1711, 1504.8123, -1666.2452));
                    {
                        {
                            {
                                ;
                            }
                        }
                        {
                            {
                                ;
                            }
                        }
                        {
                            vec2 GLF_live11a = _GLF_FUZZED(vec2(0.1, 3491.9613));
                            float GLF_live11z = _GLF_FUZZED(18.12);
                            {
                                GLF_live11z = GLF_live11a.x / GLF_live11a.y;
                                {
                                    vec2 GLF_live23coord = _GLF_FUZZED(vec2(-17.84, -62.72));
                                    int GLF_live23i = _GLF_FUZZED(42538);
                                    int GLF_live23j = _GLF_FUZZED(ivec2(922, 53273).t);
                                    int GLF_live23looplimiter0 = 0;
                                    vec4 GLF_live23res = _GLF_FUZZED(vec4(852.532, 4.0, 117.943, -4.9));
                                    float GLF_live23uvstep = _GLF_FUZZED(float(-26640));
                                    {
                                        if (GLF_live23looplimiter0 >= 3) {
                                            ;
                                        }
                                        GLF_live23looplimiter0++;
                                        {
                                            GLF_live23res += texture(GLF_live23tex, GLF_live23coord + vec2(float(GLF_live23i - 1) * GLF_live23uvstep, float(GLF_live23j - 1) * GLF_live23uvstep)) * GLF_live23weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live23i * 3 + GLF_live23j, 9)];
                                        }
                                    }
                                }
                            }
                        }
                        {
                            {
                                {
                                    float GLF_live20c_im = _GLF_FUZZED((5.6 - (-77.64)));
                                    float GLF_live20c_re = _GLF_FUZZED(vec4(-6210.1774, 8.0, -2.9, 1729.8706).g);
                                    int GLF_live20iteration = _GLF_FUZZED((ivec3(31039, 58278, -863).t * (-93613)));
                                    float GLF_live20x = _GLF_FUZZED(-1756.5077);
                                    float GLF_live20y = _GLF_FUZZED(((-586.788) + (-8094.8073)));
                                    {
                                        if (GLF_live20x * GLF_live20x + GLF_live20y * GLF_live20y > 4.0) {
                                            ;
                                        }
                                        float GLF_live20x_new = GLF_live20x * GLF_live20x - GLF_live20y * GLF_live20y + GLF_live20c_re;
                                        GLF_live20y = 2.0 * GLF_live20x * GLF_live20y + GLF_live20c_im;
                                        GLF_live20x = GLF_live20x_new;
                                        {
                                            vec2 GLF_live23coord = _GLF_FUZZED((vec4(-158.114, 15.87, 236.207, -2408.0723) * mat2x4(-5.9, -9698.7316, -94.95, 899.413, 235.915, 7150.0091, 9.5, 1538.5870)));
                                            int GLF_live23looplimiter1 = 0;
                                            vec4 GLF_live23res = _GLF_FUZZED(vec4(-3203.3664, 756.095, vec2(-5630.2543, -66.49)));
                                            float GLF_live23uvstep = _GLF_FUZZED(-78.65);
                                            for (int GLF_live23i = 0; GLF_live23i < 3; GLF_live23i++) {
                                                if (GLF_live23looplimiter1 >= 3) {
                                                    break;
                                                }
                                                GLF_live23looplimiter1++;
                                                {
                                                    {
                                                        int GLF_live23looplimiter0 = 0;
                                                        for (int GLF_live23j = 0; GLF_live23j < 3; GLF_live23j++) {
                                                            if (GLF_live23looplimiter0 >= 3) {
                                                                break;
                                                            }
                                                            GLF_live23looplimiter0++;
                                                            {
                                                                GLF_live23res += texture(GLF_live23tex, GLF_live23coord + vec2(float(GLF_live23i - 1) * GLF_live23uvstep, float(GLF_live23j - 1) * GLF_live23uvstep)) * GLF_live23weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live23i * 3 + GLF_live23j, 9)];
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                        GLF_live20iteration++;
                                    }
                                }
                                {
                                    ;
                                }
                            }
                            vec2 GLF_live9color = _GLF_FUZZED(vec2(-7324.8192, 8.2));
                            int GLF_live9i = _GLF_FUZZED(-97750);
                            vec3 GLF_live9vecCoor = _GLF_FUZZED((vec3(5.7, 45.86, 64.72) * 54.87));
                            {
                                {
                                    vec3 GLF_live24color = _GLF_FUZZED((vec3(-21.82, 3092.0659, 87.96) - 1530.9260));
                                    int GLF_live24count = _GLF_FUZZED(-44913);
                                    int GLF_live24looplimiter3 = 0;
                                    do {
                                        if (GLF_live24looplimiter3 >= 4) {
                                            break;
                                        }
                                        GLF_live24looplimiter3++;
                                        {
                                            GLF_live24color += GLF_live24palette(vec3(0.5, float(GLF_live24obj.numbers[8]) * 0.1, 0.2), vec3(0.5), trunc(vec3(GLF_live24injectionSwitch.y)), vec3(float(GLF_live24obj.numbers[4]) * 0.1, GLF_live24injectionSwitch.x, 0.6));
                                            GLF_live24count++;
                                        }
                                    } while (GLF_live24count != GLF_live24obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_live24injectionSwitch.x), 10)]);
                                }
                                int GLF_live9looplimiter7 = 0;
                                do {
                                    if (GLF_live9looplimiter7 >= 4) {
                                        break;
                                    }
                                    GLF_live9looplimiter7++;
                                    {
                                        {
                                            vec3 GLF_live24color = _GLF_FUZZED((7.1 * vec3(-9.9, 8.2, 732.865)));
                                            int GLF_live24count = _GLF_FUZZED((-41951));
                                            int GLF_live24looplimiter4 = 0;
                                            {
                                                if (GLF_live24looplimiter4 >= 4) {
                                                    ;
                                                }
                                                GLF_live24looplimiter4++;
                                                {
                                                    GLF_live24color -= GLF_live24palette(vec3(float(GLF_live24obj.numbers[4]) * 0.1), trunc(vec3(0.1)), vec3(float(GLF_live24obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_live24injectionSwitch.y), 10)]) * 0.1), vec3(GLF_live24injectionSwitch.x, float(GLF_live24obj.numbers[2]) * 0.1, float(GLF_live24obj.numbers[8]) * 0.1));
                                                    GLF_live24count++;
                                                }
                                            }
                                        }
                                        if (int(GLF_live9gl_FragCoord[1]) < 30) {
                                            GLF_live9color = fract(sin(GLF_live9vecCoor.yx - trunc(float(GLF_live9data[0]))));
                                            GLF_live9color[0] = dFdy(GLF_live9gl_FragCoord.y);
                                            break;
                                            {
                                                vec2 GLF_live23coord = _GLF_FUZZED(((514.151 * vec2(-2.2, 6.4)) * mat2(-34.65, 5019.3798, -8.8, 72.28)));
                                                int GLF_live23i = _GLF_FUZZED(int((128067u + 154110u)));
                                                int GLF_live23looplimiter1 = 0;
                                                vec4 GLF_live23res = _GLF_FUZZED(vec4(-5545.5160, 5903.0565, -4285.7741, -561.265));
                                                float GLF_live23uvstep = _GLF_FUZZED(vec4(6976.0861, 18.08, -9616.7435, -7.7).b);
                                                {
                                                    if (GLF_live23looplimiter1 >= 3) {
                                                        ;
                                                    }
                                                    GLF_live23looplimiter1++;
                                                    {
                                                        {
                                                            int GLF_live23looplimiter0 = 0;
                                                            for (int GLF_live23j = 0; GLF_live23j < 3; GLF_live23j++) {
                                                                if (GLF_live23looplimiter0 >= 3) {
                                                                    break;
                                                                }
                                                                GLF_live23looplimiter0++;
                                                                {
                                                                    GLF_live23res += texture(GLF_live23tex, GLF_live23coord + vec2(float(GLF_live23i - 1) * GLF_live23uvstep, float(GLF_live23j - 1) * GLF_live23uvstep)) * GLF_live23weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live23i * 3 + GLF_live23j, 9)];
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                            {
                                                int GLF_live19msb8 = _GLF_FUZZED(63253);
                                                vec2 GLF_live19pos = _GLF_FUZZED((vec2(2.0, 0.1) * mat2(4.3, -98.58, -517.756, 3.9)));
                                                vec3 GLF_live19setting = _GLF_FUZZED((false ? vec3(-9.0, 6.3, -309.891) : vec3(-4.8, 5.8, -970.766)));
                                                {
                                                    ;
                                                }
                                            }
                                        } else {
                                            {
                                                {
                                                    ;
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
                                            {
                                                {
                                                    ;
                                                }
                                            }
                                            if (int(GLF_live9gl_FragCoord[1]) < 60) {
                                                {
                                                    {
                                                        ;
                                                    }
                                                }
                                                {
                                                    float GLF_live11th = _GLF_FUZZED(32.44);
                                                    vec2 GLF_live11v = _GLF_FUZZED(vec2(vec3(-7.2)));
                                                    if (GLF_live11v.x < 0.0) {
                                                        GLF_live11th = 1.0 - GLF_live11th;
                                                    }
                                                }
                                                GLF_live9color = fract(sin(GLF_live9vecCoor.yx - trunc(float(GLF_live9data[1]))));
                                                GLF_live9color[1] *= atan(faceforward(GLF_live9injectionSwitch, GLF_live9color.xx, GLF_live9vecCoor.yx).y);
                                                break;
                                            } else if (int(GLF_live9gl_FragCoord[1]) < 90) {
                                                GLF_live9color = fract(sin(GLF_live9vecCoor.yx - trunc(float(GLF_live9data[2]))));
                                                GLF_live9color.x += atanh(GLF_live9color.x) * cosh(GLF_live9injectionSwitch.y) * smoothstep(GLF_live9color, GLF_live9injectionSwitch, GLF_live9gl_FragCoord.yy).x;
                                                {
                                                    ivec2 GLF_live16p = _GLF_FUZZED((+ivec2(43157, -84082)));
                                                    if (GLF_live16p.x > 0) {
                                                        GLF_live16p.y--;
                                                    }
                                                }
                                                {
                                                    vec2 GLF_live23coord = _GLF_FUZZED(vec2(-69.42, -4775.5676));
                                                    int GLF_live23i = _GLF_FUZZED(74225);
                                                    vec4 GLF_live23res = _GLF_FUZZED(vec4(139.575, -0.6, 5.3, 28.33));
                                                    float GLF_live23uvstep = _GLF_FUZZED(-120.021);
                                                    {
                                                        int GLF_live23looplimiter0 = 0;
                                                        for (int GLF_live23j = 0; GLF_live23j < 3; GLF_live23j++) {
                                                            if (GLF_live23looplimiter0 >= 3) {
                                                                break;
                                                            }
                                                            GLF_live23looplimiter0++;
                                                            {
                                                                GLF_live23res += texture(GLF_live23tex, GLF_live23coord + vec2(float(GLF_live23i - 1) * GLF_live23uvstep, float(GLF_live23j - 1) * GLF_live23uvstep)) * GLF_live23weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live23i * 3 + GLF_live23j, 9)];
                                                            }
                                                        }
                                                    }
                                                }
                                                {
                                                    {
                                                        ;
                                                    }
                                                }
                                                break;
                                            } else if (int(GLF_live9gl_FragCoord[1]) < 120) {
                                                GLF_live9color = fract(acosh(clamp(GLF_live9vecCoor.yx - trunc(float(GLF_live9data[3])), 1.0, 1000.0)));
                                                GLF_live9color.x += (isnan(GLF_live9gl_FragCoord.x) ? log2(GLF_live9gl_FragCoord.x) : log2(GLF_live9gl_FragCoord.y));
                                                break;
                                                {
                                                    ivec2 GLF_live18pos = _GLF_FUZZED(ivec2(-73977, -1450));
                                                    if (GLF_live18pos.x < GLF_live18dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18pos.y, 256)] + 15 && GLF_live18pos.x > GLF_live18dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18pos.y, 256)] - 15) {
                                                        float GLF_live18p = (15.0 - abs(float(GLF_live18pos.x - GLF_live18dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18pos.y, 256)]))) / 15.0;
                                                        {
                                                            {
                                                                ;
                                                            }
                                                        }
                                                        ;
                                                    }
                                                }
                                            } else {
                                                {
                                                    int GLF_live23looplimiter1 = 0;
                                                    if (GLF_live23looplimiter1 >= 3) {
                                                        ;
                                                    }
                                                }
                                                if (int(GLF_live9gl_FragCoord[1]) < 150) {
                                                    ;
                                                    {
                                                        int GLF_live19msb8 = _GLF_FUZZED(73772);
                                                        {
                                                            GLF_live19b_b = clamp(GLF_live19b_b * float(bitCount(GLF_live19msb8)) * 3.0, float(bitfieldExtract(int(GLF_live19resolution.x), 0, 1)), float(bitCount(GLF_live19msb8)));
                                                        }
                                                    }
                                                    {
                                                        vec2 GLF_live13pos = _GLF_FUZZED(vec2(-0.9, -9.3));
                                                        if (GLF_live13pointInTriangle(GLF_live13pos, vec2(0.7, 0.3), vec2(0.5, 0.9), vec2(0.1, 0.4)) == 1) {
                                                            GLF_live13_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
                                                            {
                                                                {
                                                                    ;
                                                                }
                                                            }
                                                        } else {
                                                            {
                                                                vec2 GLF_live22coord = _GLF_FUZZED((vec2(91.13, 106.203) * mat2(-3.1, 7.1, -2.4, 3931.4524)));
                                                                float GLF_live22h = _GLF_FUZZED(((-8436.1484) + float(6875u)));
                                                                int GLF_live22i = _GLF_FUZZED(ivec3(-84134, -19682, 39321).z);
                                                                float GLF_live22refh = _GLF_FUZZED(-8917.5849);
                                                                float GLF_live22slope = _GLF_FUZZED(2.7);
                                                                vec2 GLF_live22uvstep = _GLF_FUZZED((mat3x2(9172.4132, -74.28, -1102.1386, 88.42, 36.19, 863.658) * vec3(-228.414, 4.7, -0.6)));
                                                                {
                                                                    GLF_live22coord -= GLF_live22uvstep;
                                                                    GLF_live22refh += GLF_live22slope;
                                                                    GLF_live22h = texture(GLF_live22tex, GLF_live22coord).y;
                                                                    GLF_live22i++;
                                                                }
                                                            }
                                                            GLF_live13_GLF_color = vec4(0.0, 0.0, 0.0, 1.0);
                                                        }
                                                    }
                                                } else if (int(GLF_live9gl_FragCoord[1]) < 180) {
                                                    GLF_live9color = fract(sin(GLF_live9vecCoor.yx - trunc(float(GLF_live9data[4]))));
                                                    GLF_live9color[1] += asinh(GLF_live9gl_FragCoord.y * ldexp(GLF_live9color.y, -GLF_live9i));
                                                    break;
                                                } else {
                                                    {
                                                        int GLF_live22looplimiter0 = 0;
                                                        if (GLF_live22looplimiter0 >= 6) {
                                                            ;
                                                        }
                                                    }
                                                    if (int(GLF_live9gl_FragCoord[1]) < 210) {
                                                        GLF_live9color = fract(sin(GLF_live9vecCoor.yx - trunc(float(GLF_live9data[5]))));
                                                        GLF_live9color.y -= tanh(GLF_live9color.x) / cosh(GLF_live9color.y);
                                                        break;
                                                    } else if (int(GLF_live9gl_FragCoord[1]) < 240) {
                                                        GLF_live9color = fract(asinh(GLF_live9vecCoor.yx - trunc(float(GLF_live9data[6]))));
                                                        GLF_live9color.y -= isnan(float(GLF_live9i)) ? tanh(GLF_live9gl_FragCoord.x) : atanh(GLF_live9gl_FragCoord.y / GLF_live9resolution.y);
                                                        break;
                                                    } else if (int(GLF_live9gl_FragCoord[1]) < 270) {
                                                        GLF_live9color = fract(sin(GLF_live9vecCoor.yx - trunc(float(GLF_live9data[7]))));
                                                        {
                                                            ivec2 GLF_live16p = _GLF_FUZZED(ivec2(14335, -76290));
                                                            {
                                                                int GLF_live16looplimiter1 = 0;
                                                                while (GLF_live16p.x > 15) {
                                                                    if (GLF_live16looplimiter1 >= 6) {
                                                                        {
                                                                            bool GLF_live26c1 = _GLF_FUZZED((bvec4(false, bvec2(true, false), true) != bvec4(false, true, false, false).pspt.stst));
                                                                            if (!GLF_live26c1) {
                                                                                ;
                                                                            }
                                                                        }
                                                                        break;
                                                                    }
                                                                    GLF_live16looplimiter1++;
                                                                    {
                                                                        {
                                                                            float GLF_live20c_im = _GLF_FUZZED(218.099);
                                                                            float GLF_live20c_re = _GLF_FUZZED((+6186.4650));
                                                                            int GLF_live20iteration = _GLF_FUZZED(69114);
                                                                            int GLF_live20looplimiter0 = 0;
                                                                            float GLF_live20x = _GLF_FUZZED((678.766 + 3.9));
                                                                            float GLF_live20y = _GLF_FUZZED((10.65 * (-4.4)));
                                                                            {
                                                                                {
                                                                                    vec3 GLF_live24color = _GLF_FUZZED((vec3(71.17, -1.4, 1144.6211) + vec3(-3.5, -9790.6190, 358.169)));
                                                                                    int GLF_live24count = _GLF_FUZZED((37419 & 81900));
                                                                                    int GLF_live24looplimiter3 = 0;
                                                                                    {
                                                                                        if (GLF_live24looplimiter3 >= 4) {
                                                                                            ;
                                                                                        }
                                                                                        GLF_live24looplimiter3++;
                                                                                        {
                                                                                            GLF_live24color += GLF_live24palette(vec3(0.5, float(GLF_live24obj.numbers[8]) * 0.1, 0.2), vec3(0.5), trunc(vec3(GLF_live24injectionSwitch.y)), vec3(float(GLF_live24obj.numbers[4]) * 0.1, GLF_live24injectionSwitch.x, 0.6));
                                                                                            GLF_live24count++;
                                                                                        }
                                                                                    }
                                                                                }
                                                                                if (GLF_live20looplimiter0 >= 5) {
                                                                                    ;
                                                                                }
                                                                                GLF_live20looplimiter0++;
                                                                                {
                                                                                    if (GLF_live20x * GLF_live20x + GLF_live20y * GLF_live20y > 4.0) {
                                                                                        ;
                                                                                    }
                                                                                    float GLF_live20x_new = GLF_live20x * GLF_live20x - GLF_live20y * GLF_live20y + GLF_live20c_re;
                                                                                    GLF_live20y = 2.0 * GLF_live20x * GLF_live20y + GLF_live20c_im;
                                                                                    {
                                                                                        vec2 GLF_live26center = _GLF_FUZZED(((-36.88) * vec2(-61.95, 6500.3780)));
                                                                                        int GLF_live26i = _GLF_FUZZED(((98310 - 74952) & (-10469)));
                                                                                        int GLF_live26looplimiter0 = 0;
                                                                                        int GLF_live26msb8 = _GLF_FUZZED(-15250);
                                                                                        vec2 GLF_live26position = _GLF_FUZZED(vec2(-31.05));
                                                                                        vec3 GLF_live26result = _GLF_FUZZED((vec3(41.92, 5.0, 5.5) - vec3(-1.3, 8.9, 23.88)));
                                                                                        {
                                                                                            if (GLF_live26looplimiter0 >= 4) {
                                                                                                ;
                                                                                            }
                                                                                            GLF_live26looplimiter0++;
                                                                                            {
                                                                                                vec3 GLF_live26d = _GLF_FUZZED(vec3(904.729, vec2(-5.6, 6.6)));
                                                                                                GLF_live26d = GLF_live26drawShape(GLF_live26position, GLF_live26center + vec2(sin(float(GLF_live26i) / (float(bitCount(GLF_live26msb8)) * 10.0) + GLF_live26time) / 4.0 * float(bitCount(GLF_live26msb8)), float(bitfieldExtract(int(GLF_live26resolution.x), 0, 1))), vec3(0.01 + sin(float(GLF_live26i) / 100.0 * float(bitCount(GLF_live26msb8))), 0.01, float(GLF_live26i)));
                                                                                                if (length(GLF_live26d) <= float(bitfieldExtract(int(GLF_live26resolution.x), 0, 1))) {
                                                                                                    ;
                                                                                                }
                                                                                                GLF_live26result = vec3(GLF_live26d);
                                                                                            }
                                                                                        }
                                                                                    }
                                                                                    GLF_live20x = GLF_live20x_new;
                                                                                    GLF_live20iteration++;
                                                                                }
                                                                            }
                                                                        }
                                                                        GLF_live16p.x -= 16;
                                                                    }
                                                                }
                                                            }
                                                            {
                                                                vec2 GLF_live22coord = _GLF_FUZZED(vec3(5.1, -0.1, -2.1).ts);
                                                                float GLF_live22h = _GLF_FUZZED((float(158096u) + (-7.1)));
                                                                int GLF_live22i = _GLF_FUZZED((-ivec3(71057, 55121, 82485).z));
                                                                int GLF_live22looplimiter0 = 0;
                                                                float GLF_live22refh = _GLF_FUZZED(-1.4);
                                                                float GLF_live22slope = _GLF_FUZZED(-5.3);
                                                                vec2 GLF_live22uvstep = _GLF_FUZZED((6.1 * vec2(2.9, -9.7)));
                                                                {
                                                                    if (GLF_live22looplimiter0 >= 6) {
                                                                        ;
                                                                    }
                                                                    GLF_live22looplimiter0++;
                                                                    {
                                                                        GLF_live22coord -= GLF_live22uvstep;
                                                                        GLF_live22refh += GLF_live22slope;
                                                                        GLF_live22h = texture(GLF_live22tex, GLF_live22coord).y;
                                                                        GLF_live22i++;
                                                                    }
                                                                }
                                                            }
                                                        }
                                                        GLF_live9color.y *= mix(normalize(GLF_live9vecCoor), normalize(vec3(GLF_live9color, degrees(GLF_live9color.x))), GLF_live9injectionSwitch.x).y;
                                                        break;
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
                                                        {
                                                            vec2 GLF_live22coord = _GLF_FUZZED(vec2(-5.2, 9.8));
                                                            {
                                                                vec2 GLF_live23coord = _GLF_FUZZED(vec2(-707.465, -5.0));
                                                                int GLF_live23i = _GLF_FUZZED(ivec3(68351, 38282, -41082).y);
                                                                int GLF_live23j = _GLF_FUZZED((9353));
                                                                vec4 GLF_live23res = _GLF_FUZZED((float(true) - vec4(-32.05, -66.15, 6.5, 5.5)));
                                                                float GLF_live23uvstep = _GLF_FUZZED((false ? 726.900 : (-4.5)));
                                                                {
                                                                    GLF_live23res += texture(GLF_live23tex, GLF_live23coord + vec2(float(GLF_live23i - 1) * GLF_live23uvstep, float(GLF_live23j - 1) * GLF_live23uvstep)) * GLF_live23weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live23i * 3 + GLF_live23j, 9)];
                                                                }
                                                            }
                                                            float GLF_live22h = _GLF_FUZZED(vec2(-9.2, 2.5).t);
                                                            int GLF_live22i = _GLF_FUZZED(ivec3(64348, 86245, 31378).t);
                                                            float GLF_live22refh = _GLF_FUZZED(-4556.1872);
                                                            float GLF_live22slope = _GLF_FUZZED(845.499);
                                                            vec2 GLF_live22uvstep = _GLF_FUZZED(vec2(-4.9, 8.2));
                                                            {
                                                                int GLF_live22looplimiter0 = 0;
                                                                while (GLF_live22h < GLF_live22refh && GLF_live22i < 32) {
                                                                    if (GLF_live22looplimiter0 >= 6) {
                                                                        break;
                                                                    }
                                                                    GLF_live22looplimiter0++;
                                                                    {
                                                                        GLF_live22coord -= GLF_live22uvstep;
                                                                        GLF_live22refh += GLF_live22slope;
                                                                        GLF_live22h = texture(GLF_live22tex, GLF_live22coord).y;
                                                                        GLF_live22i++;
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    } else {
                                                        ;
                                                        {
                                                            vec3 GLF_live25color = _GLF_FUZZED(vec3((vec4(-68.91, 842.801, 336.260, 5.6) - vec2(-61.12, -8856.1532).r)));
                                                            {
                                                                GLF_live25color.yz += GLF_live25color.yz;
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                } while (0 == int(GLF_live9injectionSwitch.x));
                                {
                                    vec3 GLF_live19d = _GLF_FUZZED(vec3((mat3x4(-858.274, -96.61, 3279.8791, -981.444, 52.55, 7.7, -733.231, 4400.2089, -10.99, -7.1, -676.025, -7.5) * vec3(1527.4541, -374.136, -530.177))));
                                    if (length(GLF_live19d) <= float(bitfieldExtract(int(GLF_live19resolution.x), 0, 1))) {
                                        {
                                            int GLF_live25looplimiter2 = 0;
                                            if (GLF_live25looplimiter2 >= 4) {
                                                ;
                                            }
                                        }
                                        ;
                                    }
                                }
                            }
                        }
                        {
                            vec2 GLF_live22coord = _GLF_FUZZED(vec2(51.79, 460.935));
                            float GLF_live22h = _GLF_FUZZED(1.2);
                            int GLF_live22i = _GLF_FUZZED(2477);
                            {
                                {
                                    ;
                                }
                            }
                            float GLF_live22refh = _GLF_FUZZED(-440.303);
                            float GLF_live22slope = _GLF_FUZZED((+vec4(282.344, 765.322, 6063.6623, 402.711).x));
                            vec2 GLF_live22uvstep = _GLF_FUZZED(vec2(-3.5, -1895.3623));
                            {
                                int GLF_live22looplimiter0 = 0;
                                while (GLF_live22h < GLF_live22refh && GLF_live22i < 32) {
                                    if (GLF_live22looplimiter0 >= 6) {
                                        break;
                                    }
                                    GLF_live22looplimiter0++;
                                    {
                                        GLF_live22coord -= GLF_live22uvstep;
                                        {
                                            {
                                                ;
                                            }
                                        }
                                        GLF_live22refh += GLF_live22slope;
                                        GLF_live22h = texture(GLF_live22tex, GLF_live22coord).y;
                                        GLF_live22i++;
                                    }
                                }
                            }
                            {
                                int GLF_live26msb8 = _GLF_FUZZED(-73656);
                                {
                                    GLF_live26b_b = clamp(GLF_live26b_b * float(bitCount(GLF_live26msb8)) * 3.0, float(bitfieldExtract(int(GLF_live26resolution.x), 0, 1)), float(bitCount(GLF_live26msb8)));
                                }
                            }
                        }
                        int GLF_live4looplimiter2 = 0;
                        {
                            int GLF_live21looplimiter0 = 0;
                            if (GLF_live21looplimiter0 >= 3) {
                                {
                                    int GLF_live25a = _GLF_FUZZED((-46368));
                                    int GLF_live25b = _GLF_FUZZED(-62304);
                                    int GLF_live25c = _GLF_FUZZED(53691);
                                    int GLF_live25d = _GLF_FUZZED(44729);
                                    int GLF_live25looplimiter3 = 0;
                                    vec2 GLF_live25uv = _GLF_FUZZED(vec2(vec3(9.2, 8421.6194, 0.4)));
                                    {
                                        if (GLF_live25looplimiter3 >= 4) {
                                            ;
                                        }
                                        GLF_live25looplimiter3++;
                                        {
                                            GLF_live25uv.y -= step(GLF_live25injectionSwitch.y, GLF_live25uv.x) + float(GLF_live25a) + float(GLF_live25b) + float(GLF_live25c);
                                            GLF_live25d--;
                                        }
                                    }
                                }
                                ;
                            }
                        }
                        for (int GLF_live4a = GLF_live4MATRIX_N - 1; GLF_live4a >= GLF_live4k; GLF_live4a--) {
                            {
                                bool GLF_live7c1 = _GLF_FUZZED(true);
                                vec3 GLF_live7col = _GLF_FUZZED((true ? vec3(-22.18, 4.6, 5497.1232) : vec3(3.7, 2.8, -172.280)));
                                vec2 GLF_live7uv = _GLF_FUZZED(vec2(4.0, 57.04));
                                {
                                    vec2 GLF_live26center = _GLF_FUZZED(vec2(4.5, 738.682));
                                    int GLF_live26msb8 = _GLF_FUZZED(int(false));
                                    vec2 GLF_live26position = _GLF_FUZZED(vec2(89.68, 551.843));
                                    vec3 GLF_live26result = _GLF_FUZZED(vec3(-9.4));
                                    {
                                        int GLF_live26looplimiter0 = 0;
                                        for (int GLF_live26i = bitfieldInsert(35, 0, 0, bitfieldExtract(int(GLF_live26resolution.x), 0, 1)); GLF_live26i >= bitfieldReverse(bitfieldExtract(int(GLF_live26resolution.x), 0, 1)); GLF_live26i--) {
                                            if (GLF_live26looplimiter0 >= 4) {
                                                break;
                                            }
                                            GLF_live26looplimiter0++;
                                            {
                                                vec3 GLF_live26d = _GLF_FUZZED(vec3(904.729, vec2(-5.6, 6.6)));
                                                GLF_live26d = GLF_live26drawShape(GLF_live26position, GLF_live26center + vec2(sin(float(GLF_live26i) / (float(bitCount(GLF_live26msb8)) * 10.0) + GLF_live26time) / 4.0 * float(bitCount(GLF_live26msb8)), float(bitfieldExtract(int(GLF_live26resolution.x), 0, 1))), vec3(0.01 + sin(float(GLF_live26i) / 100.0 * float(bitCount(GLF_live26msb8))), 0.01, float(GLF_live26i)));
                                                if (length(GLF_live26d) <= float(bitfieldExtract(int(GLF_live26resolution.x), 0, 1))) {
                                                    continue;
                                                }
                                                GLF_live26result = vec3(GLF_live26d);
                                            }
                                        }
                                    }
                                }
                                if (GLF_live7c1) {
                                    float GLF_live7stripe = GLF_live7compute_stripe(cos((GLF_live7uv.x + GLF_live7uv.y) * 20.0), GLF_live7uv.x + GLF_live7uv.y);
                                    GLF_live7col = mix(vec3(GLF_live7uv.x, 0, 0.75), vec3(.8, .7, GLF_live7uv.x), GLF_live7stripe);
                                    GLF_live7_GLF_color = vec4(GLF_live7col, 1.0);
                                    {
                                        ivec2 GLF_live16p = _GLF_FUZZED(((-8850) | ivec2(64646, 22769)));
                                        {
                                            GLF_live16p = GLF_live16iter(GLF_live16p);
                                            {
                                                int GLF_live26msb8 = _GLF_FUZZED(83943);
                                                vec2 GLF_live26pos = _GLF_FUZZED(vec2(73.25, -706.751));
                                                vec3 GLF_live26setting = _GLF_FUZZED(vec3(-7.2, 93.82, 3340.4366));
                                                {
                                                    ;
                                                }
                                            }
                                        }
                                    }
                                    ;
                                }
                            }
                            if (GLF_live4looplimiter2 >= 6) {
                                {
                                    vec2 GLF_live22coord = _GLF_FUZZED((vec2(-9262.8750, -9805.1250) - vec2(99.32, 208.527)));
                                    {
                                        vec2 GLF_live26center = _GLF_FUZZED(vec2(2443.6999, -2623.7636));
                                        int GLF_live26i = _GLF_FUZZED(((-32274) & (279 - 48810)));
                                        int GLF_live26looplimiter0 = 0;
                                        int GLF_live26msb8 = _GLF_FUZZED(44916);
                                        vec2 GLF_live26position = _GLF_FUZZED(vec2(-269.519, -701.070));
                                        vec3 GLF_live26result = _GLF_FUZZED(vec3(-727.464, 9779.9911, 5936.6263));
                                        {
                                            if (GLF_live26looplimiter0 >= 4) {
                                                ;
                                            }
                                            GLF_live26looplimiter0++;
                                            {
                                                vec3 GLF_live26d = _GLF_FUZZED(vec3(904.729, vec2(-5.6, 6.6)));
                                                GLF_live26d = GLF_live26drawShape(GLF_live26position, GLF_live26center + vec2(sin(float(GLF_live26i) / (float(bitCount(GLF_live26msb8)) * 10.0) + GLF_live26time) / 4.0 * float(bitCount(GLF_live26msb8)), float(bitfieldExtract(int(GLF_live26resolution.x), 0, 1))), vec3(0.01 + sin(float(GLF_live26i) / 100.0 * float(bitCount(GLF_live26msb8))), 0.01, float(GLF_live26i)));
                                                if (length(GLF_live26d) <= float(bitfieldExtract(int(GLF_live26resolution.x), 0, 1))) {
                                                    ;
                                                }
                                                GLF_live26result = vec3(GLF_live26d);
                                            }
                                        }
                                    }
                                    float GLF_live22h = _GLF_FUZZED(((-8.7) + vec4(6.3, 4.5, 44.74, -6.1)).p);
                                    int GLF_live22i = _GLF_FUZZED(ivec4(37157, 64510, 53963, -25121).a);
                                    int GLF_live22looplimiter0 = 0;
                                    float GLF_live22refh = _GLF_FUZZED((9.9 * vec4(6.2, -7486.8845, 2159.5307, 667.958).s));
                                    float GLF_live22slope = _GLF_FUZZED((-(-58.77)));
                                    vec2 GLF_live22uvstep = _GLF_FUZZED(vec2(278.122, -638.848));
                                    while (GLF_live22h < GLF_live22refh && GLF_live22i < 32) {
                                        if (GLF_live22looplimiter0 >= 6) {
                                            break;
                                        }
                                        GLF_live22looplimiter0++;
                                        {
                                            GLF_live22coord -= GLF_live22uvstep;
                                            GLF_live22refh += GLF_live22slope;
                                            GLF_live22h = texture(GLF_live22tex, GLF_live22coord).y;
                                            GLF_live22i++;
                                        }
                                    }
                                }
                                break;
                            }
                            {
                                {
                                    ;
                                }
                            }
                            GLF_live4looplimiter2++;
                            {
                                GLF_live4alpha3 += GLF_live4matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_live4a, 4)] * GLF_live4matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_live4a, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live4j, 4)];
                            }
                        }
                    }
                }
                _GLF_color = vec4(A[20] / resolution.x, A[24] / resolution.y, 1.0, 1.0);
                {
                    {
                        bool GLF_live7c1 = _GLF_FUZZED((false ^^ true));
                        vec3 GLF_live7col = _GLF_FUZZED(vec3(vec2(120.458, -7.2), float(true)));
                        vec2 GLF_live7uv = _GLF_FUZZED(vec2(9.4, -16.99));
                        if (GLF_live7c1) {
                            {
                                float GLF_live14xCoord = _GLF_FUZZED(float(false));
                                float GLF_live14yCoord = _GLF_FUZZED(-151.786);
                                {
                                    vec2 GLF_live23coord = _GLF_FUZZED((vec2(-4.8, -1.8)));
                                    int GLF_live23looplimiter1 = 0;
                                    vec4 GLF_live23res = _GLF_FUZZED(vec4(-44.96, 7.7, 1.5, 9.4));
                                    float GLF_live23uvstep = _GLF_FUZZED(440.729);
                                    for (int GLF_live23i = 0; GLF_live23i < 3; GLF_live23i++) {
                                        if (GLF_live23looplimiter1 >= 3) {
                                            break;
                                        }
                                        GLF_live23looplimiter1++;
                                        {
                                            {
                                                int GLF_live23looplimiter0 = 0;
                                                for (int GLF_live23j = 0; GLF_live23j < 3; GLF_live23j++) {
                                                    if (GLF_live23looplimiter0 >= 3) {
                                                        break;
                                                    }
                                                    GLF_live23looplimiter0++;
                                                    {
                                                        GLF_live23res += texture(GLF_live23tex, GLF_live23coord + vec2(float(GLF_live23i - 1) * GLF_live23uvstep, float(GLF_live23j - 1) * GLF_live23uvstep)) * GLF_live23weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live23i * 3 + GLF_live23j, 9)];
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                                {
                                    ;
                                }
                                {
                                    {
                                        ;
                                    }
                                }
                            }
                            {
                                ivec2 GLF_live18pos = _GLF_FUZZED(ivec2(94801, 25749));
                                {
                                    float GLF_live18p = (15.0 - abs(float(GLF_live18pos.x - GLF_live18dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18pos.y, 256)]))) / 15.0;
                                    ;
                                }
                                {
                                    vec2 GLF_live23coord = _GLF_FUZZED(vec2(9.8, -2.2));
                                    int GLF_live23i = _GLF_FUZZED(84821);
                                    vec4 GLF_live23res = _GLF_FUZZED(vec4(6197.1749, vec3(13.58, 31.73, -7079.6570)));
                                    float GLF_live23uvstep = _GLF_FUZZED((142.781 - (4.1)));
                                    {
                                        int GLF_live23looplimiter0 = 0;
                                        for (int GLF_live23j = 0; GLF_live23j < 3; GLF_live23j++) {
                                            if (GLF_live23looplimiter0 >= 3) {
                                                break;
                                            }
                                            GLF_live23looplimiter0++;
                                            {
                                                GLF_live23res += texture(GLF_live23tex, GLF_live23coord + vec2(float(GLF_live23i - 1) * GLF_live23uvstep, float(GLF_live23j - 1) * GLF_live23uvstep)) * GLF_live23weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live23i * 3 + GLF_live23j, 9)];
                                            }
                                        }
                                    }
                                }
                            }
                            float GLF_live7stripe = GLF_live7compute_stripe(cos((GLF_live7uv.x + GLF_live7uv.y) * 20.0), GLF_live7uv.x + GLF_live7uv.y);
                            GLF_live7col = mix(vec3(GLF_live7uv.x, 0, 0.75), vec3(.8, .7, GLF_live7uv.x), GLF_live7stripe);
                            {
                                {
                                    ;
                                }
                            }
                            GLF_live7_GLF_color = vec4(GLF_live7col, 1.0);
                            ;
                        }
                    }
                    ivec2 GLF_live5pos = _GLF_FUZZED(ivec2(69503, -32556));
                    {
                        {
                            ;
                        }
                    }
                    {
                        float GLF_live5p = (15.0 - abs(float(GLF_live5pos.x - GLF_live5dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live5pos.y, 256)]))) / 15.0;
                        ;
                    }
                    {
                        vec2 GLF_live23coord = _GLF_FUZZED((vec3(-8.5, -84.02, -1.6) * mat2x3(-3115.5512, 1.3, 3504.9123, -41.53, -5.2, 46.89)));
                        int GLF_live23i = _GLF_FUZZED((-93259));
                        int GLF_live23j = _GLF_FUZZED(((-54741) & (6277 & (-99920))));
                        vec4 GLF_live23res = _GLF_FUZZED((-vec4(-5.8, -7.8, 0.0, -4356.5072)));
                        float GLF_live23uvstep = _GLF_FUZZED(7036.1575);
                        {
                            GLF_live23res += texture(GLF_live23tex, GLF_live23coord + vec2(float(GLF_live23i - 1) * GLF_live23uvstep, float(GLF_live23j - 1) * GLF_live23uvstep)) * GLF_live23weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live23i * 3 + GLF_live23j, 9)];
                        }
                    }
                    {
                        int GLF_live9j = _GLF_FUZZED(99318);
                        int GLF_live9looplimiter6 = 0;
                        {
                            vec2 GLF_live13pos = _GLF_FUZZED(vec3(9018.9059, -1.5, -1.3).xx);
                            if (GLF_live13pointInTriangle(GLF_live13pos, vec2(0.7, 0.3), vec2(0.5, 0.9), vec2(0.1, 0.4)) == 1) {
                                GLF_live13_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
                            } else {
                                GLF_live13_GLF_color = vec4(0.0, 0.0, 0.0, 1.0);
                                {
                                    ivec2 GLF_live16p = _GLF_FUZZED(ivec2(11637, -42308));
                                    {
                                        int GLF_live25a = _GLF_FUZZED(50834);
                                        int GLF_live25b = _GLF_FUZZED(-79414);
                                        int GLF_live25looplimiter1 = 0;
                                        vec2 GLF_live25uv = _GLF_FUZZED((6552.0136 - vec4(4.5, 2617.3897, 6261.1898, -8283.1626)).tp);
                                        {
                                            if (GLF_live25looplimiter1 >= 4) {
                                                ;
                                            }
                                            GLF_live25looplimiter1++;
                                            {
                                                GLF_live25uv.y -= step(GLF_live25injectionSwitch.y, GLF_live25uv.x) + float(GLF_live25a);
                                                GLF_live25uv.x *= (isnan(GLF_live25uv.y) ? cosh(GLF_live25gl_FragCoord.y) : tanh(GLF_live25gl_FragCoord.x));
                                                GLF_live25b--;
                                            }
                                        }
                                    }
                                    if (GLF_live16p.x < 0) {
                                        GLF_live16p.y++;
                                    }
                                }
                                {
                                    {
                                        ;
                                    }
                                }
                            }
                        }
                        {
                            if (GLF_live9looplimiter6 >= 4) {
                                ;
                                {
                                    vec2 GLF_live22coord = _GLF_FUZZED((vec2(568.304, -70.57) * 0.1));
                                    float GLF_live22h = _GLF_FUZZED((-8781.2361));
                                    int GLF_live22i = _GLF_FUZZED((-43312));
                                    {
                                        int GLF_live26msb8 = _GLF_FUZZED(81736);
                                        vec2 GLF_live26position = _GLF_FUZZED(vec2(-5.1));
                                        if (abs(GLF_live26position.y - GLF_live26position.x) < 0.5) {
                                            GLF_live26b_b = clamp(GLF_live26b_b * float(bitCount(GLF_live26msb8)) * 3.0, float(bitfieldExtract(int(GLF_live26resolution.x), 0, 1)), float(bitCount(GLF_live26msb8)));
                                        }
                                    }
                                    int GLF_live22looplimiter0 = 0;
                                    float GLF_live22refh = _GLF_FUZZED(7484.3324);
                                    float GLF_live22slope = _GLF_FUZZED(26.40);
                                    vec2 GLF_live22uvstep = _GLF_FUZZED(vec2(822.793));
                                    {
                                        if (GLF_live22looplimiter0 >= 6) {
                                            ;
                                        }
                                        GLF_live22looplimiter0++;
                                        {
                                            GLF_live22coord -= GLF_live22uvstep;
                                            GLF_live22refh += GLF_live22slope;
                                            GLF_live22h = texture(GLF_live22tex, GLF_live22coord).y;
                                            GLF_live22i++;
                                        }
                                    }
                                }
                            }
                            GLF_live9looplimiter6++;
                            {
                                GLF_live9temp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9j, 10)] = GLF_live9data[_GLF_MAKE_IN_BOUNDS_INT(GLF_live9j, 10)];
                            }
                        }
                        {
                            float GLF_live13pab = _GLF_FUZZED(8.1);
                            float GLF_live13pca = _GLF_FUZZED((-(-752.485)));
                            if (!((GLF_live13pab < 0.0 && GLF_live13pca < 0.0) || (GLF_live13pab >= 0.0 && GLF_live13pca >= 0.0))) {
                                ;
                                {
                                    {
                                        {
                                            ;
                                        }
                                    }
                                    ivec2 GLF_live16p = _GLF_FUZZED((ivec2(-61242, -16167) + (-61921)));
                                    {
                                        int GLF_live16looplimiter1 = 0;
                                        while (GLF_live16p.x > 15) {
                                            if (GLF_live16looplimiter1 >= 6) {
                                                break;
                                            }
                                            GLF_live16looplimiter1++;
                                            {
                                                {
                                                    int GLF_live23looplimiter0 = 0;
                                                    if (GLF_live23looplimiter0 >= 3) {
                                                        ;
                                                    }
                                                }
                                                GLF_live16p.x -= 16;
                                            }
                                            {
                                                int GLF_live26msb8 = _GLF_FUZZED((98645 & 28565));
                                                {
                                                    GLF_live26b_b = clamp(GLF_live26b_b * float(bitCount(GLF_live26msb8)) * 3.0, float(bitfieldExtract(int(GLF_live26resolution.x), 0, 1)), float(bitCount(GLF_live26msb8)));
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    {
                        vec2 GLF_live23coord = _GLF_FUZZED(vec2(vec3(4479.6948, -8.9, -45.27)));
                        int GLF_live23i = _GLF_FUZZED(-72913);
                        int GLF_live23looplimiter0 = 0;
                        vec4 GLF_live23res = _GLF_FUZZED((5.8 + vec4(-578.900, -47.28, -6.3, -7271.3944)));
                        float GLF_live23uvstep = _GLF_FUZZED(vec3(-0.8, 4.3, 551.297).g);
                        for (int GLF_live23j = 0; GLF_live23j < 3; GLF_live23j++) {
                            if (GLF_live23looplimiter0 >= 3) {
                                break;
                            }
                            GLF_live23looplimiter0++;
                            {
                                GLF_live23res += texture(GLF_live23tex, GLF_live23coord + vec2(float(GLF_live23i - 1) * GLF_live23uvstep, float(GLF_live23j - 1) * GLF_live23uvstep)) * GLF_live23weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live23i * 3 + GLF_live23j, 9)];
                            }
                        }
                    }
                }
                {
                    int GLF_live24i = _GLF_FUZZED(int(59161u));
                    int GLF_live24j = _GLF_FUZZED(-45885);
                    int GLF_live24pivot = _GLF_FUZZED(ivec3(-83540, 38980, -61444).r);
                    {
                        if (GLF_live24obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_live24j, 10)] <= GLF_live24pivot) {
                            GLF_live24i++;
                            GLF_live24swap(GLF_live24i, GLF_live24j);
                        }
                    }
                }
            } else if (int(gl_FragCoord.x) < 120) {
                _GLF_color = vec4(A[25] / resolution.x, A[29] / resolution.y, 1.0, 1.0);
            } else if (int(gl_FragCoord.x) < 140) {
                {
                    {
                        {
                            {
                                ;
                            }
                        }
                        {
                            vec2 GLF_live26center = _GLF_FUZZED(vec2(-3.3, 7.8));
                            int GLF_live26i = _GLF_FUZZED(60372);
                            int GLF_live26looplimiter0 = 0;
                            int GLF_live26msb8 = _GLF_FUZZED(((66112 | 91845) ^ 37482));
                            vec2 GLF_live26position = _GLF_FUZZED(vec2(-4.3, -3.7));
                            vec3 GLF_live26result = _GLF_FUZZED(vec3(-303.564, 7466.0278, 694.842));
                            {
                                if (GLF_live26looplimiter0 >= 4) {
                                    ;
                                }
                                GLF_live26looplimiter0++;
                                {
                                    vec3 GLF_live26d = _GLF_FUZZED(vec3(904.729, vec2(-5.6, 6.6)));
                                    GLF_live26d = GLF_live26drawShape(GLF_live26position, GLF_live26center + vec2(sin(float(GLF_live26i) / (float(bitCount(GLF_live26msb8)) * 10.0) + GLF_live26time) / 4.0 * float(bitCount(GLF_live26msb8)), float(bitfieldExtract(int(GLF_live26resolution.x), 0, 1))), vec3(0.01 + sin(float(GLF_live26i) / 100.0 * float(bitCount(GLF_live26msb8))), 0.01, float(GLF_live26i)));
                                    if (length(GLF_live26d) <= float(bitfieldExtract(int(GLF_live26resolution.x), 0, 1))) {
                                        ;
                                    }
                                    GLF_live26result = vec3(GLF_live26d);
                                }
                            }
                        }
                        {
                            int GLF_live4k = _GLF_FUZZED((((-56286) + (-28206))));
                            float GLF_live4magnitudeX = _GLF_FUZZED((213.224 - (false ? (-(-96.90)) : (true ? 2.6 : (-40.79)))));
                            mat4 GLF_live4matrix_a = _GLF_FUZZED(mat4(-2285.9911, -7.3, -43.01, 5.9, 6.9, 2.0, -5.0, 1351.5135, -86.18, 8.9, -50.20, -94.10, -4.6, -4.9, -3981.1183, -681.749));
                            {
                                vec2 GLF_live11a = _GLF_FUZZED((vec2(-5.3, 90.65) - (-3.2)));
                                float GLF_live11z = _GLF_FUZZED(-6.2);
                                {
                                    GLF_live11z = GLF_live11a.x / GLF_live11a.y;
                                }
                            }
                            vec4 GLF_live4matrix_u = _GLF_FUZZED(vec4(9.1, 4107.0570, 2.6, -9.3));
                            {
                                int GLF_live4looplimiter0 = 0;
                                for (int GLF_live4x = GLF_live4MATRIX_N - 1; GLF_live4x >= GLF_live4k; GLF_live4x--) {
                                    if (GLF_live4looplimiter0 >= 6) {
                                        break;
                                        {
                                            float GLF_live13pab = _GLF_FUZZED(-9.0);
                                            float GLF_live13pbc = _GLF_FUZZED(-7.3);
                                            if (!((GLF_live13pab < 0.0 && GLF_live13pbc < 0.0) || (GLF_live13pab >= 0.0 && GLF_live13pbc >= 0.0))) {
                                                ;
                                            }
                                        }
                                    }
                                    GLF_live4looplimiter0++;
                                    {
                                        GLF_live4magnitudeX += GLF_live4matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_live4x, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live4k, 4)] * GLF_live4matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_live4x, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live4k, 4)];
                                        GLF_live4matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_live4x, 4)] = GLF_live4matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_live4x, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_live4k, 4)];
                                    }
                                }
                            }
                        }
                        ;
                        {
                            {
                                {
                                    ;
                                }
                            }
                            int GLF_live16looplimiter1 = 0;
                            if (GLF_live16looplimiter1 >= 6) {
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
                {
                    int GLF_live19msb8 = _GLF_FUZZED(int(false));
                    vec2 GLF_live19position = _GLF_FUZZED(vec2(-6.0, -1.5));
                    if (abs(GLF_live19position.y - GLF_live19position.x) < 0.5) {
                        GLF_live19b_b = clamp(GLF_live19b_b * float(bitCount(GLF_live19msb8)) * 3.0, float(bitfieldExtract(int(GLF_live19resolution.x), 0, 1)), float(bitCount(GLF_live19msb8)));
                    }
                }
                {
                    {
                        vec2 GLF_live23coord = _GLF_FUZZED(vec2(0.1, -5469.9339));
                        int GLF_live23i = _GLF_FUZZED((-(-72866)));
                        int GLF_live23j = _GLF_FUZZED(-57873);
                        int GLF_live23looplimiter0 = 0;
                        vec4 GLF_live23res = _GLF_FUZZED(vec4(-69.63, 4.7, -9.3, 4135.8127));
                        float GLF_live23uvstep = _GLF_FUZZED(((0.1 - (-902.679)) + (-9.3)));
                        {
                            if (GLF_live23looplimiter0 >= 3) {
                                ;
                            }
                            GLF_live23looplimiter0++;
                            {
                                GLF_live23res += texture(GLF_live23tex, GLF_live23coord + vec2(float(GLF_live23i - 1) * GLF_live23uvstep, float(GLF_live23j - 1) * GLF_live23uvstep)) * GLF_live23weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live23i * 3 + GLF_live23j, 9)];
                            }
                        }
                    }
                    int GLF_live6high = _GLF_FUZZED(26778);
                    int GLF_live6looplimiter4 = 0;
                    int GLF_live6low = _GLF_FUZZED(72781);
                    for (int GLF_live6m = 1; GLF_live6m <= GLF_live6high; GLF_live6m = 2 * GLF_live6m) {
                        if (GLF_live6looplimiter4 >= 7) {
                            break;
                            {
                                int GLF_live16i = _GLF_FUZZED((+(-46083)));
                                int GLF_live16looplimiter0 = 0;
                                ivec2 GLF_live16p = _GLF_FUZZED(ivec2(99024, -84025));
                                for (GLF_live16i = 0; GLF_live16i < 100; GLF_live16i++) {
                                    if (GLF_live16looplimiter0 >= 6) {
                                        break;
                                    }
                                    GLF_live16looplimiter0++;
                                    {
                                        GLF_live16p = GLF_live16iter(GLF_live16p);
                                    }
                                }
                            }
                        }
                        GLF_live6looplimiter4++;
                        {
                            vec3 GLF_live21color = _GLF_FUZZED(vec3(7.2, 66.32, -5.5));
                            vec2 GLF_live21uv = _GLF_FUZZED(vec2(5.1, -36.03));
                            if (GLF_live21uv.y > (3.0 / 4.0)) {
                                GLF_live21color.z += float(GLF_live21obj.numbers[7]);
                            }
                        }
                        {
                            {
                                ;
                            }
                        }
                        {
                            {
                                int GLF_live6looplimiter3 = 0;
                                for (int GLF_live6i = GLF_live6low; GLF_live6i < GLF_live6high; GLF_live6i += 2 * GLF_live6m) {
                                    if (GLF_live6looplimiter3 >= 7) {
                                        break;
                                    }
                                    GLF_live6looplimiter3++;
                                    {
                                        float GLF_live14c_im = _GLF_FUZZED(vec2(-3147.9293, 938.919).x);
                                        {
                                            vec3 GLF_live24color = _GLF_FUZZED(vec3(-4.7, -0.1, 9.5));
                                            int GLF_live24count = _GLF_FUZZED(22750);
                                            {
                                                GLF_live24color += GLF_live24palette(vec3(0.5, float(GLF_live24obj.numbers[8]) * 0.1, 0.2), vec3(0.5), trunc(vec3(GLF_live24injectionSwitch.y)), vec3(float(GLF_live24obj.numbers[4]) * 0.1, GLF_live24injectionSwitch.x, 0.6));
                                                GLF_live24count++;
                                            }
                                        }
                                        float GLF_live14c_re = _GLF_FUZZED(-218.507);
                                        int GLF_live14iteration = _GLF_FUZZED(-50184);
                                        float GLF_live14x = _GLF_FUZZED(-55.69);
                                        {
                                            {
                                                ;
                                            }
                                        }
                                        float GLF_live14y = _GLF_FUZZED((5.5 - (-6700.3185)));
                                        {
                                            int GLF_live14looplimiter0 = 0;
                                            for (int GLF_live14k = 0; GLF_live14k < 1000; GLF_live14k++) {
                                                if (GLF_live14looplimiter0 >= 5) {
                                                    {
                                                        ivec2 GLF_live18pos = _GLF_FUZZED((ivec2(35511, 18794) + (ivec2(22968, -13215) - 35148)));
                                                        {
                                                            {
                                                                {
                                                                    ;
                                                                }
                                                            }
                                                            int GLF_live18looplimiter0 = 0;
                                                            while (GLF_live18pos.y != 256) {
                                                                if (GLF_live18looplimiter0 >= 5) {
                                                                    break;
                                                                }
                                                                GLF_live18looplimiter0++;
                                                                {
                                                                    if (GLF_live18pos.x < GLF_live18dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18pos.y, 256)] + 15 && GLF_live18pos.x > GLF_live18dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18pos.y, 256)] - 15) {
                                                                        float GLF_live18p = (15.0 - abs(float(GLF_live18pos.x - GLF_live18dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18pos.y, 256)]))) / 15.0;
                                                                        ;
                                                                    }
                                                                    GLF_live18pos.y++;
                                                                }
                                                            }
                                                        }
                                                    }
                                                    {
                                                        vec2 GLF_live22coord = _GLF_FUZZED(vec2(-5.2, 1.8));
                                                        float GLF_live22h = _GLF_FUZZED(-28.97);
                                                        int GLF_live22i = _GLF_FUZZED(-73261);
                                                        int GLF_live22looplimiter0 = 0;
                                                        {
                                                            {
                                                                ;
                                                            }
                                                        }
                                                        float GLF_live22refh = _GLF_FUZZED(-6.4);
                                                        float GLF_live22slope = _GLF_FUZZED(0.2);
                                                        vec2 GLF_live22uvstep = _GLF_FUZZED(vec2(-469.226, 3.3));
                                                        {
                                                            if (GLF_live22looplimiter0 >= 6) {
                                                                ;
                                                                {
                                                                    {
                                                                        ;
                                                                    }
                                                                }
                                                            }
                                                            GLF_live22looplimiter0++;
                                                            {
                                                                GLF_live22coord -= GLF_live22uvstep;
                                                                GLF_live22refh += GLF_live22slope;
                                                                GLF_live22h = texture(GLF_live22tex, GLF_live22coord).y;
                                                                GLF_live22i++;
                                                            }
                                                        }
                                                    }
                                                    break;
                                                }
                                                GLF_live14looplimiter0++;
                                                {
                                                    {
                                                        bool GLF_live26c1 = _GLF_FUZZED((86879u == 80283u));
                                                        if (!GLF_live26c1) {
                                                            ;
                                                        }
                                                    }
                                                    if (GLF_live14x * GLF_live14x + GLF_live14y * GLF_live14y > 4.0) {
                                                        break;
                                                    }
                                                    float GLF_live14x_new = GLF_live14x * GLF_live14x - GLF_live14y * GLF_live14y + GLF_live14c_re;
                                                    GLF_live14y = 2.0 * GLF_live14x * GLF_live14y + GLF_live14c_im;
                                                    {
                                                        vec2 GLF_live22coord = _GLF_FUZZED(vec4(vec2(95.68, -9145.8174), 2.8, (-2353.2651)).zz);
                                                        {
                                                            vec3 GLF_live24color = _GLF_FUZZED((vec3(1.0, -7946.1607, -3792.2012) + (-0.9)));
                                                            vec2 GLF_live24grid = _GLF_FUZZED(vec2(8662.3154, -5116.9591));
                                                            {
                                                                int GLF_live24count = int(GLF_live24injectionSwitch.x);
                                                                {
                                                                    int GLF_live24looplimiter4 = 0;
                                                                    do {
                                                                        if (GLF_live24looplimiter4 >= 4) {
                                                                            break;
                                                                        }
                                                                        GLF_live24looplimiter4++;
                                                                        {
                                                                            GLF_live24color -= GLF_live24palette(vec3(float(GLF_live24obj.numbers[4]) * 0.1), trunc(vec3(0.1)), vec3(float(GLF_live24obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_live24injectionSwitch.y), 10)]) * 0.1), vec3(GLF_live24injectionSwitch.x, float(GLF_live24obj.numbers[2]) * 0.1, float(GLF_live24obj.numbers[8]) * 0.1));
                                                                            GLF_live24count++;
                                                                        }
                                                                    } while (GLF_live24count != GLF_live24obj.numbers[1]);
                                                                }
                                                                GLF_live24grid += vec2(GLF_live24count + int(GLF_live24injectionSwitch.y), GLF_live24count + int(GLF_live24injectionSwitch.x));
                                                            }
                                                        }
                                                        float GLF_live22h = _GLF_FUZZED(vec3(-179.341, 3637.6909, 39.08).p);
                                                        int GLF_live22i = _GLF_FUZZED(96077);
                                                        {
                                                            int GLF_live24looplimiter5 = 0;
                                                            if (GLF_live24looplimiter5 >= 4) {
                                                                ;
                                                            }
                                                        }
                                                        int GLF_live22looplimiter0 = 0;
                                                        float GLF_live22refh = _GLF_FUZZED(0.5);
                                                        float GLF_live22slope = _GLF_FUZZED(float(75802));
                                                        vec2 GLF_live22uvstep = _GLF_FUZZED((mat2(5.8, -6024.3665, 0.1, 1.1) * vec2(283.409, 63.27)));
                                                        while (GLF_live22h < GLF_live22refh && GLF_live22i < 32) {
                                                            {
                                                                {
                                                                    ;
                                                                }
                                                            }
                                                            if (GLF_live22looplimiter0 >= 6) {
                                                                break;
                                                            }
                                                            GLF_live22looplimiter0++;
                                                            {
                                                                GLF_live22coord -= GLF_live22uvstep;
                                                                GLF_live22refh += GLF_live22slope;
                                                                GLF_live22h = texture(GLF_live22tex, GLF_live22coord).y;
                                                                GLF_live22i++;
                                                            }
                                                        }
                                                    }
                                                    GLF_live14x = GLF_live14x_new;
                                                    GLF_live14iteration++;
                                                }
                                            }
                                        }
                                    }
                                    {
                                        vec2 GLF_live22coord = _GLF_FUZZED(vec2(64.51, -5.3));
                                        float GLF_live22h = _GLF_FUZZED(-50.49);
                                        int GLF_live22i = _GLF_FUZZED((52515));
                                        int GLF_live22looplimiter0 = 0;
                                        float GLF_live22refh = _GLF_FUZZED(((-9.6) + (-8.0)));
                                        float GLF_live22slope = _GLF_FUZZED(9.6);
                                        vec2 GLF_live22uvstep = _GLF_FUZZED((-(false ? vec2(-5699.9587, 337.261) : vec2(8.3, 29.39))));
                                        while (GLF_live22h < GLF_live22refh && GLF_live22i < 32) {
                                            if (GLF_live22looplimiter0 >= 6) {
                                                break;
                                            }
                                            GLF_live22looplimiter0++;
                                            {
                                                GLF_live22coord -= GLF_live22uvstep;
                                                GLF_live22refh += GLF_live22slope;
                                                {
                                                    {
                                                        ;
                                                    }
                                                }
                                                GLF_live22h = texture(GLF_live22tex, GLF_live22coord).y;
                                                GLF_live22i++;
                                            }
                                        }
                                    }
                                    {
                                        {
                                            vec2 GLF_live22coord = _GLF_FUZZED(vec3(506.284, 66.57, 660.759).tp);
                                            float GLF_live22h = _GLF_FUZZED((+(true ? 6.8 : (-93.29))));
                                            int GLF_live22i = _GLF_FUZZED(97312);
                                            int GLF_live22looplimiter0 = 0;
                                            float GLF_live22refh = _GLF_FUZZED(((-747.735) + (-56.80)));
                                            float GLF_live22slope = _GLF_FUZZED(463.587);
                                            {
                                                vec2 GLF_live26center = _GLF_FUZZED((vec2(3.7, -5.6) - vec2(-6274.0016, 550.350)));
                                                int GLF_live26looplimiter0 = 0;
                                                int GLF_live26msb8 = _GLF_FUZZED(6256);
                                                vec2 GLF_live26position = _GLF_FUZZED(vec2(-7154.8686, 7175.8944));
                                                vec3 GLF_live26result = _GLF_FUZZED((vec3(224.142, -3497.5226, -3148.2945) * mat3(478.511, 826.424, 78.43, -8203.8107, -4.3, 798.188, (751.832 + (-3671.7498)), 575.421, 64.55)));
                                                for (int GLF_live26i = bitfieldInsert(35, 0, 0, bitfieldExtract(int(GLF_live26resolution.x), 0, 1)); GLF_live26i >= bitfieldReverse(bitfieldExtract(int(GLF_live26resolution.x), 0, 1)); GLF_live26i--) {
                                                    if (GLF_live26looplimiter0 >= 4) {
                                                        break;
                                                    }
                                                    GLF_live26looplimiter0++;
                                                    {
                                                        vec3 GLF_live26d = _GLF_FUZZED(vec3(904.729, vec2(-5.6, 6.6)));
                                                        GLF_live26d = GLF_live26drawShape(GLF_live26position, GLF_live26center + vec2(sin(float(GLF_live26i) / (float(bitCount(GLF_live26msb8)) * 10.0) + GLF_live26time) / 4.0 * float(bitCount(GLF_live26msb8)), float(bitfieldExtract(int(GLF_live26resolution.x), 0, 1))), vec3(0.01 + sin(float(GLF_live26i) / 100.0 * float(bitCount(GLF_live26msb8))), 0.01, float(GLF_live26i)));
                                                        if (length(GLF_live26d) <= float(bitfieldExtract(int(GLF_live26resolution.x), 0, 1))) {
                                                            continue;
                                                        }
                                                        GLF_live26result = vec3(GLF_live26d);
                                                    }
                                                }
                                            }
                                            vec2 GLF_live22uvstep = _GLF_FUZZED(vec2(-6.8, -1.9));
                                            {
                                                if (GLF_live22looplimiter0 >= 6) {
                                                    ;
                                                }
                                                GLF_live22looplimiter0++;
                                                {
                                                    GLF_live22coord -= GLF_live22uvstep;
                                                    GLF_live22refh += GLF_live22slope;
                                                    GLF_live22h = texture(GLF_live22tex, GLF_live22coord).y;
                                                    GLF_live22i++;
                                                }
                                            }
                                        }
                                        int GLF_live6from = GLF_live6i;
                                        {
                                            int GLF_live16looplimiter0 = 0;
                                            ivec2 GLF_live16p = _GLF_FUZZED((((-82663) * ivec2(-87756, 23006)) + ivec2(81994, 10377)));
                                            {
                                                if (GLF_live16looplimiter0 >= 6) {
                                                    ;
                                                }
                                                GLF_live16looplimiter0++;
                                                {
                                                    {
                                                        vec2 GLF_live22coord = _GLF_FUZZED(vec2(-99.53, -73.52));
                                                        float GLF_live22h = _GLF_FUZZED(-0.4);
                                                        {
                                                            int GLF_live26msb8 = _GLF_FUZZED(int(false));
                                                            vec2 GLF_live26pos = _GLF_FUZZED((vec2(4721.4858, -5.6) + (vec2(8.4, 94.68) - (-562.467))));
                                                            vec3 GLF_live26setting = _GLF_FUZZED(vec3(-392.194, 20.49, -1.6));
                                                            {
                                                                ;
                                                            }
                                                        }
                                                        int GLF_live22i = _GLF_FUZZED(-32614);
                                                        float GLF_live22refh = _GLF_FUZZED(-3.3);
                                                        float GLF_live22slope = _GLF_FUZZED(4.9);
                                                        vec2 GLF_live22uvstep = _GLF_FUZZED(vec4(5.1, 985.246, -17.00, 894.373).rb);
                                                        {
                                                            bool GLF_live26c8 = _GLF_FUZZED(false);
                                                            int GLF_live26msb8 = _GLF_FUZZED(12004);
                                                            vec2 GLF_live26pos = _GLF_FUZZED(vec2(-3.8, 485.890));
                                                            vec3 GLF_live26setting = _GLF_FUZZED(vec3(-7.9, 5.1, 657.667));
                                                            if (!GLF_live26c8) {
                                                                ;
                                                            }
                                                        }
                                                        {
                                                            GLF_live22coord -= GLF_live22uvstep;
                                                            GLF_live22refh += GLF_live22slope;
                                                            GLF_live22h = texture(GLF_live22tex, GLF_live22coord).y;
                                                            GLF_live22i++;
                                                        }
                                                        {
                                                            int GLF_live25a = _GLF_FUZZED((~(-89600)));
                                                            vec2 GLF_live25uv = _GLF_FUZZED((vec2(-985.874, -487.836) - 15.79));
                                                            {
                                                                int GLF_live25looplimiter0 = 0;
                                                                do {
                                                                    if (GLF_live25looplimiter0 >= 4) {
                                                                        break;
                                                                    }
                                                                    GLF_live25looplimiter0++;
                                                                    {
                                                                        GLF_live25uv.y -= step(GLF_live25injectionSwitch.y, GLF_live25uv.x);
                                                                        GLF_live25uv.x -= tanh(GLF_live25uv.x * 0.25) / ldexp(GLF_live25injectionSwitch.y, findMSB(GLF_live25a));
                                                                        GLF_live25a--;
                                                                    }
                                                                } while (GLF_live25a > int(GLF_live25injectionSwitch.x));
                                                            }
                                                        }
                                                    }
                                                    GLF_live16p = GLF_live16iter(GLF_live16p);
                                                }
                                            }
                                        }
                                        {
                                            {
                                                {
                                                    int GLF_live25a = _GLF_FUZZED(((-36276) ^ (-97755)));
                                                    int GLF_live25b = _GLF_FUZZED(-34173);
                                                    vec2 GLF_live25uv = _GLF_FUZZED(vec2(5.0, -4.8));
                                                    {
                                                        GLF_live25uv.y -= step(GLF_live25injectionSwitch.y, GLF_live25uv.x) + float(GLF_live25a);
                                                        GLF_live25uv.x *= (isnan(GLF_live25uv.y) ? cosh(GLF_live25gl_FragCoord.y) : tanh(GLF_live25gl_FragCoord.x));
                                                        GLF_live25b--;
                                                    }
                                                }
                                                ;
                                            }
                                        }
                                        int GLF_live6mid = GLF_live6i + GLF_live6m - 1;
                                        int GLF_live6to = min(GLF_live6i + 2 * GLF_live6m - 1, GLF_live6high);
                                        GLF_live6merge(GLF_live6from, GLF_live6mid, GLF_live6to);
                                    }
                                    {
                                        {
                                            ;
                                        }
                                    }
                                }
                                {
                                    {
                                        int GLF_live23looplimiter1 = 0;
                                        if (GLF_live23looplimiter1 >= 3) {
                                            ;
                                        }
                                    }
                                    int GLF_live22looplimiter0 = 0;
                                    {
                                        vec2 GLF_live26center = _GLF_FUZZED(((mat2(-59.56, -326.044, 1.9, -7024.1739) * vec2(337.865, -845.281)) + vec2(-9847.9752, 8.7)));
                                        int GLF_live26looplimiter0 = 0;
                                        int GLF_live26msb8 = _GLF_FUZZED(18673);
                                        vec2 GLF_live26position = _GLF_FUZZED(vec2((+(-7841.3481)), -34.13));
                                        vec3 GLF_live26result = _GLF_FUZZED((+vec2(-9473.2998, 26.47)).yx.sst);
                                        for (int GLF_live26i = bitfieldInsert(35, 0, 0, bitfieldExtract(int(GLF_live26resolution.x), 0, 1)); GLF_live26i >= bitfieldReverse(bitfieldExtract(int(GLF_live26resolution.x), 0, 1)); GLF_live26i--) {
                                            if (GLF_live26looplimiter0 >= 4) {
                                                break;
                                            }
                                            GLF_live26looplimiter0++;
                                            {
                                                vec3 GLF_live26d = _GLF_FUZZED(vec3(904.729, vec2(-5.6, 6.6)));
                                                GLF_live26d = GLF_live26drawShape(GLF_live26position, GLF_live26center + vec2(sin(float(GLF_live26i) / (float(bitCount(GLF_live26msb8)) * 10.0) + GLF_live26time) / 4.0 * float(bitCount(GLF_live26msb8)), float(bitfieldExtract(int(GLF_live26resolution.x), 0, 1))), vec3(0.01 + sin(float(GLF_live26i) / 100.0 * float(bitCount(GLF_live26msb8))), 0.01, float(GLF_live26i)));
                                                if (length(GLF_live26d) <= float(bitfieldExtract(int(GLF_live26resolution.x), 0, 1))) {
                                                    continue;
                                                }
                                                GLF_live26result = vec3(GLF_live26d);
                                            }
                                        }
                                    }
                                    if (GLF_live22looplimiter0 >= 6) {
                                        ;
                                    }
                                }
                            }
                        }
                        {
                            int GLF_live19looplimiter0 = 0;
                            if (GLF_live19looplimiter0 >= 4) {
                                ;
                            }
                        }
                    }
                }
                {
                    int GLF_live9high = _GLF_FUZZED(((~13996)));
                    int GLF_live9looplimiter4 = 0;
                    int GLF_live9low = _GLF_FUZZED((~(-62461)));
                    for (int GLF_live9m = 1; GLF_live9m <= GLF_live9high; GLF_live9m = 2 * GLF_live9m) {
                        if (GLF_live9looplimiter4 >= 4) {
                            {
                                {
                                    ;
                                }
                            }
                            break;
                        }
                        GLF_live9looplimiter4++;
                        {
                            {
                                int GLF_live9looplimiter3 = 0;
                                {
                                    {
                                        int GLF_live23looplimiter1 = 0;
                                        if (GLF_live23looplimiter1 >= 3) {
                                            ;
                                        }
                                    }
                                    int GLF_live12i = _GLF_FUZZED(39229);
                                    int GLF_live12j = _GLF_FUZZED(-89311);
                                    uint GLF_live12uselessOutVariable = _GLF_FUZZED(130615u);
                                    {
                                        {
                                            ;
                                        }
                                    }
                                    if (uint(GLF_live12j) < uaddCarry(uint(GLF_live12i), 1u, GLF_live12uselessOutVariable)) {
                                        ;
                                    }
                                }
                                {
                                    int GLF_live20iteration = _GLF_FUZZED((+ivec2(-11315, 4097)).t);
                                    float GLF_live20xCoord = _GLF_FUZZED(-593.239);
                                    float GLF_live20yCoord = _GLF_FUZZED(float((ivec3(28107, -93026, -3788).rb != ivec2(-85150, -97650))));
                                    if (GLF_live20iteration < 1000) {
                                        {
                                            bool GLF_live26c3 = _GLF_FUZZED(((int(true) < 35320) != true));
                                            if (!GLF_live26c3) {
                                                ;
                                            }
                                        }
                                        ;
                                    } else {
                                        ;
                                    }
                                }
                                for (int GLF_live9i = GLF_live9low; GLF_live9i < GLF_live9high; GLF_live9i += 2 * GLF_live9m) {
                                    if (GLF_live9looplimiter3 >= 4) {
                                        {
                                            {
                                                vec2 GLF_live23coord = _GLF_FUZZED(vec2(1.5, -55.75));
                                                int GLF_live23i = _GLF_FUZZED(-97146);
                                                int GLF_live23j = _GLF_FUZZED(((-44123) ^ 29850));
                                                vec4 GLF_live23res = _GLF_FUZZED((mat4(0.9, 287.496, -236.704, -9110.2959, 0.5, 6.3, -67.66, 647.371, 3.6, 800.716, -438.528, -9.9, 62.83, -5.6, 3.1, -3377.9267) * vec4(205.236, 704.929, 86.49, -507.775)));
                                                float GLF_live23uvstep = _GLF_FUZZED(-74.73);
                                                {
                                                    GLF_live23res += texture(GLF_live23tex, GLF_live23coord + vec2(float(GLF_live23i - 1) * GLF_live23uvstep, float(GLF_live23j - 1) * GLF_live23uvstep)) * GLF_live23weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live23i * 3 + GLF_live23j, 9)];
                                                }
                                            }
                                            int GLF_live14looplimiter3 = 0;
                                            {
                                                int GLF_live26msb8 = _GLF_FUZZED(-17642);
                                                {
                                                    GLF_live26b_b = clamp(GLF_live26b_b * float(bitCount(GLF_live26msb8)) * 3.0, float(bitfieldExtract(int(GLF_live26resolution.x), 0, 1)), float(bitCount(GLF_live26msb8)));
                                                }
                                            }
                                            if (GLF_live14looplimiter3 >= 5) {
                                                ;
                                            }
                                        }
                                        break;
                                    }
                                    {
                                        {
                                            ivec2 GLF_live16p = _GLF_FUZZED(ivec2(-19183, 75690));
                                            {
                                                GLF_live16p = GLF_live16iter(GLF_live16p);
                                                {
                                                    {
                                                        ;
                                                    }
                                                }
                                            }
                                        }
                                        {
                                            {
                                                int GLF_live24h = _GLF_FUZZED(79551);
                                                int GLF_live24i = _GLF_FUZZED(63972);
                                                int GLF_live24l = _GLF_FUZZED(-60474);
                                                int GLF_live24pivot = _GLF_FUZZED((30527 & int(false)));
                                                {
                                                    int GLF_live24looplimiter0 = 0;
                                                    for (int GLF_live24j = GLF_live24l; GLF_live24j <= GLF_live24h - 1; GLF_live24j++) {
                                                        if (GLF_live24looplimiter0 >= 4) {
                                                            break;
                                                        }
                                                        GLF_live24looplimiter0++;
                                                        {
                                                            if (GLF_live24obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_live24j, 10)] <= GLF_live24pivot) {
                                                                GLF_live24i++;
                                                                GLF_live24swap(GLF_live24i, GLF_live24j);
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                            vec2 GLF_live22coord = _GLF_FUZZED(vec2(vec4(648.489, -81.72, 589.732, 65.35)));
                                            float GLF_live22h = _GLF_FUZZED(float(161500u));
                                            int GLF_live22i = _GLF_FUZZED((44123 + (-64446)));
                                            int GLF_live22looplimiter0 = 0;
                                            float GLF_live22refh = _GLF_FUZZED((6.1 - (-2714.2769)));
                                            float GLF_live22slope = _GLF_FUZZED((-922.251));
                                            vec2 GLF_live22uvstep = _GLF_FUZZED(vec2(-366.507, -2.6));
                                            while (GLF_live22h < GLF_live22refh && GLF_live22i < 32) {
                                                if (GLF_live22looplimiter0 >= 6) {
                                                    break;
                                                }
                                                GLF_live22looplimiter0++;
                                                {
                                                    GLF_live22coord -= GLF_live22uvstep;
                                                    GLF_live22refh += GLF_live22slope;
                                                    GLF_live22h = texture(GLF_live22tex, GLF_live22coord).y;
                                                    GLF_live22i++;
                                                }
                                                {
                                                    int GLF_live26msb8 = _GLF_FUZZED(ivec3(1154, 33314, 56541).s);
                                                    vec2 GLF_live26pos = _GLF_FUZZED(vec2(-9.5, -36.87));
                                                    vec3 GLF_live26setting = _GLF_FUZZED((3.2 + vec3(9852.0344, 277.911, -2386.0985)));
                                                    {
                                                        ;
                                                    }
                                                }
                                            }
                                        }
                                        {
                                            vec3 GLF_live24color = _GLF_FUZZED(vec3(8379.5295, vec2(50.67, 1.8)));
                                            vec2 GLF_live24grid = _GLF_FUZZED(vec2(-686.003, 63.59));
                                            vec2 GLF_live24uv = _GLF_FUZZED((vec2(3068.9239, -7.2) * (vec2(950.309, 9697.8934) * mat2(6.0, 5321.0215, 3.9, 9727.8572))));
                                            if (GLF_live24uv.x > (2.0 / 4.0)) {
                                                int GLF_live24count = int(GLF_live24injectionSwitch.x);
                                                {
                                                    int GLF_live24looplimiter4 = 0;
                                                    do {
                                                        if (GLF_live24looplimiter4 >= 4) {
                                                            break;
                                                        }
                                                        GLF_live24looplimiter4++;
                                                        {
                                                            GLF_live24color -= GLF_live24palette(vec3(float(GLF_live24obj.numbers[4]) * 0.1), trunc(vec3(0.1)), vec3(float(GLF_live24obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_live24injectionSwitch.y), 10)]) * 0.1), vec3(GLF_live24injectionSwitch.x, float(GLF_live24obj.numbers[2]) * 0.1, float(GLF_live24obj.numbers[8]) * 0.1));
                                                            GLF_live24count++;
                                                        }
                                                    } while (GLF_live24count != GLF_live24obj.numbers[1]);
                                                }
                                                GLF_live24grid += vec2(GLF_live24count + int(GLF_live24injectionSwitch.y), GLF_live24count + int(GLF_live24injectionSwitch.x));
                                            }
                                        }
                                        {
                                            ;
                                        }
                                    }
                                    GLF_live9looplimiter3++;
                                    {
                                        {
                                            ;
                                        }
                                    }
                                    {
                                        {
                                            float GLF_live20c_im = _GLF_FUZZED(-48.95);
                                            float GLF_live20c_re = _GLF_FUZZED(float(true));
                                            int GLF_live20iteration = _GLF_FUZZED(ivec2(4014, 76646).r);
                                            float GLF_live20x = _GLF_FUZZED(2.7);
                                            float GLF_live20y = _GLF_FUZZED(9.6);
                                            {
                                                bool GLF_live26c4 = _GLF_FUZZED((mat4x3(-5.8, -2063.5967, 6.4, -1333.9469, -7.9, 77.22, 97.74, -0.6, 1970.4383, 48.35, 61.38, -6.1) == mat4x3(-3.5, 573.075, 8.6, 58.77, -7.4, -72.10, 8.0, -607.028, 29.80, 8862.9918, 8243.4571, 5662.0400)));
                                                if (!GLF_live26c4) {
                                                    ;
                                                }
                                            }
                                            {
                                                if (GLF_live20x * GLF_live20x + GLF_live20y * GLF_live20y > 4.0) {
                                                    ;
                                                }
                                                float GLF_live20x_new = GLF_live20x * GLF_live20x - GLF_live20y * GLF_live20y + GLF_live20c_re;
                                                GLF_live20y = 2.0 * GLF_live20x * GLF_live20y + GLF_live20c_im;
                                                GLF_live20x = GLF_live20x_new;
                                                GLF_live20iteration++;
                                            }
                                        }
                                        int GLF_live9from = GLF_live9i;
                                        {
                                            int GLF_live23looplimiter1 = 0;
                                            if (GLF_live23looplimiter1 >= 3) {
                                                ;
                                            }
                                        }
                                        {
                                            int GLF_live16looplimiter0 = 0;
                                            ivec2 GLF_live16p = _GLF_FUZZED((77844 * ivec2(-36697, -98285)));
                                            {
                                                if (GLF_live16looplimiter0 >= 6) {
                                                    ;
                                                }
                                                GLF_live16looplimiter0++;
                                                {
                                                    int GLF_live24looplimiter0 = 0;
                                                    if (GLF_live24looplimiter0 >= 4) {
                                                        ;
                                                    }
                                                }
                                                {
                                                    GLF_live16p = GLF_live16iter(GLF_live16p);
                                                }
                                            }
                                        }
                                        int GLF_live9mid = GLF_live9i + GLF_live9m - 1;
                                        int GLF_live9to = min(GLF_live9i + 2 * GLF_live9m - 1, GLF_live9high);
                                        GLF_live9merge(GLF_live9from, GLF_live9mid, GLF_live9to);
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
                _GLF_color = vec4(A[30] / resolution.x, A[34] / resolution.y, 1.0, 1.0);
                {
                    {
                        {
                            ;
                        }
                    }
                    ivec2 GLF_live18pos = _GLF_FUZZED((ivec2(62195, 30293) & (((-9442) * (-20211)) ^ (52947))));
                    {
                        int GLF_live18looplimiter0 = 0;
                        while (GLF_live18pos.y != 256) {
                            {
                                vec2 GLF_live22coord = _GLF_FUZZED((-vec2(-355.881, -8638.7012)));
                                float GLF_live22h = _GLF_FUZZED((+(-1.2)));
                                int GLF_live22i = _GLF_FUZZED(-52885);
                                int GLF_live22looplimiter0 = 0;
                                float GLF_live22refh = _GLF_FUZZED((mat3x4(4.6, 4.0, 5.1, 5.7, -197.628, -5.1, 903.662, -3896.3133, 8.3, -177.744, -864.702, 518.632) * vec3(4.0, 256.973, 3.8)).x);
                                float GLF_live22slope = _GLF_FUZZED(-5.9);
                                vec2 GLF_live22uvstep = _GLF_FUZZED((mat3x2(813.958, -8.5, -224.806, 5.4, 3.6, -17.11) * (5048.0507 + vec3(8.3, -2.9, -212.476))));
                                {
                                    if (GLF_live22looplimiter0 >= 6) {
                                        ;
                                    }
                                    GLF_live22looplimiter0++;
                                    {
                                        {
                                            {
                                                ;
                                            }
                                        }
                                        GLF_live22coord -= GLF_live22uvstep;
                                        GLF_live22refh += GLF_live22slope;
                                        GLF_live22h = texture(GLF_live22tex, GLF_live22coord).y;
                                        GLF_live22i++;
                                    }
                                }
                            }
                            if (GLF_live18looplimiter0 >= 5) {
                                break;
                            }
                            GLF_live18looplimiter0++;
                            {
                                if (GLF_live18pos.x < GLF_live18dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18pos.y, 256)] + 15 && GLF_live18pos.x > GLF_live18dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18pos.y, 256)] - 15) {
                                    float GLF_live18p = (15.0 - abs(float(GLF_live18pos.x - GLF_live18dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18pos.y, 256)]))) / 15.0;
                                    {
                                        {
                                            int GLF_live25a = _GLF_FUZZED(21918);
                                            int GLF_live25b = _GLF_FUZZED((ivec3(6326, 43614, 32449).b + (true ? (false ? 8332 : 39552) : (-49125))));
                                            int GLF_live25c = _GLF_FUZZED(-29491);
                                            int GLF_live25d = _GLF_FUZZED(50572);
                                            vec2 GLF_live25uv = _GLF_FUZZED((vec2(8.1, -71.09) - (true ? (vec4(-3960.0837, -22.48, -2.5, 417.683) * mat2x4(-345.076, 55.46, 6215.9015, -61.11, -0.2, -4.5, -79.84, 9.2)) : vec2(957.135, -853.828))));
                                            {
                                                int GLF_live25looplimiter3 = 0;
                                                do {
                                                    if (GLF_live25looplimiter3 >= 4) {
                                                        break;
                                                    }
                                                    GLF_live25looplimiter3++;
                                                    {
                                                        GLF_live25uv.y -= step(GLF_live25injectionSwitch.y, GLF_live25uv.x) + float(GLF_live25a) + float(GLF_live25b) + float(GLF_live25c);
                                                        GLF_live25d--;
                                                    }
                                                } while (GLF_live25d > int(GLF_live25injectionSwitch.x));
                                            }
                                        }
                                        int GLF_live20iteration = _GLF_FUZZED((int(true) ^ 9097));
                                        {
                                            ;
                                        }
                                    }
                                    ;
                                }
                                GLF_live18pos.y++;
                            }
                        }
                        {
                            int GLF_live19msb8 = _GLF_FUZZED(ivec4(-12954, -36326, -98324, 35145).s);
                            vec2 GLF_live19pos = _GLF_FUZZED(vec2(-8.0, -189.736));
                            vec3 GLF_live19setting = _GLF_FUZZED(vec3(3.1, -2002.5723, -133.128));
                            {
                                ;
                                {
                                    bool GLF_live26c1 = _GLF_FUZZED((143439u >= 135108u));
                                    if (!GLF_live26c1) {
                                        ;
                                    }
                                }
                            }
                        }
                    }
                }
                {
                    vec2 GLF_live22coord = _GLF_FUZZED((mat3x2(-7.2, 7652.7717, -3.6, 0.0, -40.56, 3230.0642) * (mat2x3(1023.2024, 581.984, 9.3, 6.2, 5.3, 9.8) * vec2(-6066.3290, -21.67))));
                    {
                        int GLF_live23looplimiter1 = 0;
                        if (GLF_live23looplimiter1 >= 3) {
                            ;
                        }
                    }
                    float GLF_live22h = _GLF_FUZZED(-9697.5322);
                    int GLF_live22i = _GLF_FUZZED(-18613);
                    float GLF_live22refh = _GLF_FUZZED(-2.9);
                    float GLF_live22slope = _GLF_FUZZED((-vec2(7.7, -73.50)).y);
                    vec2 GLF_live22uvstep = _GLF_FUZZED(((vec4(1696.9666, 968.321, -69.68, 92.35) * mat2x4(675.285, 51.83, -5.9, 8915.5299, -635.054, -1530.0308, 9697.8041, 1.1)) + 256.191));
                    {
                        vec2 GLF_live23coord = _GLF_FUZZED(vec4(-4.6, 550.229, 2.7, 9.3).qq);
                        int GLF_live23i = _GLF_FUZZED((ivec4(63616, -21703, 91562, -47925).y & 90844));
                        int GLF_live23looplimiter1 = 0;
                        vec4 GLF_live23res = _GLF_FUZZED(vec4(2.4, 2.1, -4.3, -105.574).arba);
                        float GLF_live23uvstep = _GLF_FUZZED(-5.7);
                        {
                            if (GLF_live23looplimiter1 >= 3) {
                                ;
                            }
                            GLF_live23looplimiter1++;
                            {
                                {
                                    int GLF_live23looplimiter0 = 0;
                                    for (int GLF_live23j = 0; GLF_live23j < 3; GLF_live23j++) {
                                        if (GLF_live23looplimiter0 >= 3) {
                                            break;
                                        }
                                        GLF_live23looplimiter0++;
                                        {
                                            GLF_live23res += texture(GLF_live23tex, GLF_live23coord + vec2(float(GLF_live23i - 1) * GLF_live23uvstep, float(GLF_live23j - 1) * GLF_live23uvstep)) * GLF_live23weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live23i * 3 + GLF_live23j, 9)];
                                        }
                                    }
                                }
                            }
                        }
                    }
                    {
                        {
                            int GLF_live26looplimiter0 = 0;
                            if (GLF_live26looplimiter0 >= 4) {
                                ;
                            }
                        }
                        int GLF_live22looplimiter0 = 0;
                        while (GLF_live22h < GLF_live22refh && GLF_live22i < 32) {
                            {
                                bool GLF_live26c1 = _GLF_FUZZED(true);
                                if (!GLF_live26c1) {
                                    ;
                                }
                            }
                            if (GLF_live22looplimiter0 >= 6) {
                                break;
                            }
                            GLF_live22looplimiter0++;
                            {
                                GLF_live22coord -= GLF_live22uvstep;
                                GLF_live22refh += GLF_live22slope;
                                GLF_live22h = texture(GLF_live22tex, GLF_live22coord).y;
                                GLF_live22i++;
                            }
                        }
                    }
                }
                {
                    float GLF_live13pab = _GLF_FUZZED(4.9);
                    float GLF_live13pca = _GLF_FUZZED(8041.9012);
                    {
                        int GLF_live21h = _GLF_FUZZED(-55668);
                        int GLF_live21i = _GLF_FUZZED((~(-14896)));
                        int GLF_live21l = _GLF_FUZZED((false ? 36563 : (((-27472) | 20060) ^ 71924)));
                        int GLF_live21looplimiter0 = 0;
                        int GLF_live21pivot = _GLF_FUZZED(-17816);
                        for (int GLF_live21j = GLF_live21l; GLF_live21j <= GLF_live21h - 1; GLF_live21j++) {
                            if (GLF_live21looplimiter0 >= 3) {
                                break;
                            }
                            GLF_live21looplimiter0++;
                            {
                                if (GLF_live21obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_live21j, 10)] <= GLF_live21pivot) {
                                    GLF_live21i++;
                                    GLF_live21swap(GLF_live21i, GLF_live21j);
                                    {
                                        vec2 GLF_live23coord = _GLF_FUZZED(vec3(31.46, -1.4, -2.9).st);
                                        int GLF_live23i = _GLF_FUZZED((52893 & int((vec3(704.357, 6846.6600, -1.8) != vec3(4.4, 4714.6198, 89.80)))));
                                        int GLF_live23looplimiter0 = 0;
                                        vec4 GLF_live23res = _GLF_FUZZED(vec4(-66.51, 8749.8500, -1.3, 114.510));
                                        float GLF_live23uvstep = _GLF_FUZZED((181.098 * ((vec3(-5487.8373, -4575.3790, 52.97) != vec3(8.2, 719.106, 2.6)) ? 8.4 : 3124.2961)));
                                        for (int GLF_live23j = 0; GLF_live23j < 3; GLF_live23j++) {
                                            if (GLF_live23looplimiter0 >= 3) {
                                                break;
                                            }
                                            GLF_live23looplimiter0++;
                                            {
                                                GLF_live23res += texture(GLF_live23tex, GLF_live23coord + vec2(float(GLF_live23i - 1) * GLF_live23uvstep, float(GLF_live23j - 1) * GLF_live23uvstep)) * GLF_live23weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live23i * 3 + GLF_live23j, 9)];
                                            }
                                        }
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
                    if (!((GLF_live13pab < 0.0 && GLF_live13pca < 0.0) || (GLF_live13pab >= 0.0 && GLF_live13pca >= 0.0))) {
                        ;
                    }
                }
            } else if (int(gl_FragCoord.x) < 160) {
                {
                    {
                        ;
                    }
                }
                _GLF_color = vec4(A[35] / resolution.x, A[39] / resolution.y, 1.0, 1.0);
                {
                    ivec2 GLF_live18pos = _GLF_FUZZED((+(88739 & ivec2(71428, -72500))));
                    if (GLF_live18pos.x < GLF_live18dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18pos.y, 256)] + 15 && GLF_live18pos.x > GLF_live18dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18pos.y, 256)] - 15) {
                        float GLF_live18p = (15.0 - abs(float(GLF_live18pos.x - GLF_live18dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18pos.y, 256)]))) / 15.0;
                        ;
                    }
                }
                {
                    vec2 GLF_live23coord = _GLF_FUZZED(vec2(472.905, 1.5));
                    int GLF_live23i = _GLF_FUZZED((ivec3(-90496, 31426, -48779) & ivec3(-23304, -27254, -77778)).g);
                    int GLF_live23j = _GLF_FUZZED((50009 & (-73713)));
                    int GLF_live23looplimiter0 = 0;
                    vec4 GLF_live23res = _GLF_FUZZED(((+mat3x4(75.31, -335.922, 5.6, 7806.8631, 749.625, -9.7, -52.30, 26.02, 1115.0547, 1886.1000, 9104.6467, 3622.3058)) * (vec3(-6441.2481, 987.520, 6.0) - vec3(-1.6, -6.5, -771.784))));
                    float GLF_live23uvstep = _GLF_FUZZED(vec3(-0.7, 686.575, -8077.7552).t);
                    {
                        if (GLF_live23looplimiter0 >= 3) {
                            ;
                        }
                        GLF_live23looplimiter0++;
                        {
                            GLF_live23res += texture(GLF_live23tex, GLF_live23coord + vec2(float(GLF_live23i - 1) * GLF_live23uvstep, float(GLF_live23j - 1) * GLF_live23uvstep)) * GLF_live23weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live23i * 3 + GLF_live23j, 9)];
                        }
                    }
                }
            } else {
                {
                    vec3 GLF_live19d = _GLF_FUZZED((vec3(4.5, 0.3, -2111.9920)));
                    if (length(GLF_live19d) <= float(bitfieldExtract(int(GLF_live19resolution.x), 0, 1))) {
                        ;
                    }
                }
                {
                    float GLF_live13pab = _GLF_FUZZED(((-7934.2602) + ((38.66 - (-8.8)) + (-3185.3113))));
                    float GLF_live13pca = _GLF_FUZZED(-52.79);
                    if (!((GLF_live13pab < 0.0 && GLF_live13pca < 0.0) || (GLF_live13pab >= 0.0 && GLF_live13pca >= 0.0))) {
                        ;
                    }
                }
                if (int(gl_FragCoord.x) < 180) {
                    _GLF_color = vec4(A[40] / resolution.x, A[44] / resolution.y, 1.0, 1.0);
                } else if (int(gl_FragCoord.x) < 180) {
                    _GLF_color = vec4(A[45] / resolution.x, A[49] / resolution.y, 1.0, 1.0);
                } else {
                    discard;
                    {
                        {
                            ;
                        }
                    }
                    {
                        bool GLF_live19c8 = _GLF_FUZZED((mat2(mat3x4(-2.7, -497.903, 8.9, 0.5, 642.272, -410.768, -3.6, 13.30, -1.3, -34.11, 4859.3817, 2.6)) != mat2(mat4x3(9250.6344, -3.6, 778.166, -793.111, -19.94, -876.127, -5.9, -9712.0868, -5.9, -9912.6659, -2107.4754, -81.91))));
                        int GLF_live19msb8 = _GLF_FUZZED((71502 | (-21314)));
                        {
                            vec2 GLF_live23coord = _GLF_FUZZED(vec2(-8.3, -8.0));
                            int GLF_live23i = _GLF_FUZZED(ivec4(-29405, -29759, 95871, -99303).a);
                            vec4 GLF_live23res = _GLF_FUZZED(vec4(5624.1876, -66.53, 1123.7222, 7.6));
                            float GLF_live23uvstep = _GLF_FUZZED(-5702.7017);
                            {
                                int GLF_live23looplimiter0 = 0;
                                for (int GLF_live23j = 0; GLF_live23j < 3; GLF_live23j++) {
                                    if (GLF_live23looplimiter0 >= 3) {
                                        break;
                                    }
                                    GLF_live23looplimiter0++;
                                    {
                                        GLF_live23res += texture(GLF_live23tex, GLF_live23coord + vec2(float(GLF_live23i - 1) * GLF_live23uvstep, float(GLF_live23j - 1) * GLF_live23uvstep)) * GLF_live23weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live23i * 3 + GLF_live23j, 9)];
                                    }
                                }
                            }
                        }
                        vec2 GLF_live19pos = _GLF_FUZZED(vec2(330.044));
                        vec3 GLF_live19setting = _GLF_FUZZED(vec3(6.8, 2.1, 3123.5949));
                        if (!GLF_live19c8) {
                            ;
                        }
                    }
                    {
                        int GLF_live5looplimiter0 = 0;
                        ivec2 GLF_live5pos = _GLF_FUZZED(ivec2(-87334, 83341));
                        {
                            {
                                ivec2 GLF_live18pos = _GLF_FUZZED((true ? ivec2(-3568, 46122) : ivec2(-13485, 32135)));
                                {
                                    bool GLF_live26c4 = _GLF_FUZZED(bool(46052));
                                    if (!GLF_live26c4) {
                                        ;
                                    }
                                }
                                if (GLF_live18pos.x < GLF_live18dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18pos.y, 256)] + 15 && GLF_live18pos.x > GLF_live18dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18pos.y, 256)] - 15) {
                                    float GLF_live18p = (15.0 - abs(float(GLF_live18pos.x - GLF_live18dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18pos.y, 256)]))) / 15.0;
                                    ;
                                }
                            }
                            if (GLF_live5looplimiter0 >= 5) {
                                ;
                                {
                                    ivec2 GLF_live18pos = _GLF_FUZZED((-ivec2(-77675, 9450)));
                                    {
                                        float GLF_live18p = (15.0 - abs(float(GLF_live18pos.x - GLF_live18dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live18pos.y, 256)]))) / 15.0;
                                        ;
                                    }
                                }
                            }
                            GLF_live5looplimiter0++;
                            {
                                if (GLF_live5pos.x < GLF_live5dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live5pos.y, 256)] + 15 && GLF_live5pos.x > GLF_live5dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live5pos.y, 256)] - 15) {
                                    float GLF_live5p = (15.0 - abs(float(GLF_live5pos.x - GLF_live5dp[_GLF_MAKE_IN_BOUNDS_INT(GLF_live5pos.y, 256)]))) / 15.0;
                                    ;
                                }
                                {
                                    float GLF_live11th = _GLF_FUZZED(vec3(-5.4, 97.16, 1.5).p);
                                    {
                                        vec2 GLF_live22coord = _GLF_FUZZED(vec2(0.9, -36.12));
                                        float GLF_live22h = _GLF_FUZZED(((76.38 * vec2(7.9, 7.7).t)));
                                        int GLF_live22i = _GLF_FUZZED(19455);
                                        float GLF_live22refh = _GLF_FUZZED(141.419);
                                        float GLF_live22slope = _GLF_FUZZED(40.01);
                                        vec2 GLF_live22uvstep = _GLF_FUZZED(vec2(1.2, 4.2));
                                        {
                                            {
                                                bool GLF_live26c5 = _GLF_FUZZED(false);
                                                int GLF_live26msb8 = _GLF_FUZZED(53930);
                                                vec2 GLF_live26pos = _GLF_FUZZED(vec2(-376.396, 22.43));
                                                vec3 GLF_live26setting = _GLF_FUZZED((-vec3(vec4(-4.1, -77.87, -92.65, 8.9).z, 3405.2479, -3.6)));
                                                if (!GLF_live26c5) {
                                                    ;
                                                }
                                            }
                                            GLF_live22coord -= GLF_live22uvstep;
                                            GLF_live22refh += GLF_live22slope;
                                            GLF_live22h = texture(GLF_live22tex, GLF_live22coord).y;
                                            GLF_live22i++;
                                        }
                                    }
                                    {
                                        GLF_live11th = 1.0 - GLF_live11th;
                                    }
                                    {
                                        ivec2 GLF_live16p = _GLF_FUZZED(ivec2(88693, 48614));
                                        {
                                            int GLF_live16looplimiter1 = 0;
                                            while (GLF_live16p.x > 15) {
                                                if (GLF_live16looplimiter1 >= 6) {
                                                    {
                                                        {
                                                            ;
                                                        }
                                                    }
                                                    break;
                                                }
                                                GLF_live16looplimiter1++;
                                                {
                                                    GLF_live16p.x -= 16;
                                                }
                                                {
                                                    {
                                                        ;
                                                    }
                                                }
                                                {
                                                    vec2 GLF_live23coord = _GLF_FUZZED(vec2(6.1, -2125.7882));
                                                    int GLF_live23i = _GLF_FUZZED(int(33706u));
                                                    int GLF_live23j = _GLF_FUZZED((true ? (-24406) : 86688));
                                                    int GLF_live23looplimiter0 = 0;
                                                    vec4 GLF_live23res = _GLF_FUZZED(vec4(-250.001, 61.29, 5376.0252, -623.500));
                                                    float GLF_live23uvstep = _GLF_FUZZED((2.7));
                                                    {
                                                        if (GLF_live23looplimiter0 >= 3) {
                                                            ;
                                                        }
                                                        GLF_live23looplimiter0++;
                                                        {
                                                            GLF_live23res += texture(GLF_live23tex, GLF_live23coord + vec2(float(GLF_live23i - 1) * GLF_live23uvstep, float(GLF_live23j - 1) * GLF_live23uvstep)) * GLF_live23weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live23i * 3 + GLF_live23j, 9)];
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                        {
                                            int GLF_live25m = _GLF_FUZZED(((-52356) | ((-10663) - (-31162))));
                                            {
                                                ;
                                            }
                                        }
                                        {
                                            int GLF_live20iteration = _GLF_FUZZED(401);
                                            float GLF_live20xCoord = _GLF_FUZZED(-1601.8982);
                                            float GLF_live20yCoord = _GLF_FUZZED(-3192.1914);
                                            if (GLF_live20iteration < 1000) {
                                                ;
                                            } else {
                                                ;
                                            }
                                        }
                                    }
                                }
                                GLF_live5pos.y++;
                                {
                                    {
                                        {
                                            int GLF_live25looplimiter4 = 0;
                                            if (GLF_live25looplimiter4 >= 4) {
                                                ;
                                            }
                                        }
                                        ;
                                    }
                                }
                            }
                            {
                                int GLF_live16looplimiter1 = 0;
                                {
                                    int GLF_live26msb8 = _GLF_FUZZED(((-54869) | 49346));
                                    vec2 GLF_live26pos = _GLF_FUZZED(vec2(6.8, -390.250));
                                    vec3 GLF_live26setting = _GLF_FUZZED(((-56.03) + ((vec3(9528.0427, -0.2, -0.2) - 172.744) + 17.79)));
                                    {
                                        ;
                                    }
                                }
                                ivec2 GLF_live16p = _GLF_FUZZED(ivec2(-77069, 35806));
                                {
                                    if (GLF_live16looplimiter1 >= 6) {
                                        ;
                                    }
                                    GLF_live16looplimiter1++;
                                    {
                                        GLF_live16p.x -= 16;
                                    }
                                }
                            }
                        }
                        {
                            float GLF_live11th = _GLF_FUZZED(-0.3);
                            {
                                ivec2 GLF_live16p = _GLF_FUZZED((ivec2(-14137, 13485) - 22996));
                                {
                                    GLF_live16p = GLF_live16iter(GLF_live16p);
                                }
                            }
                            vec2 GLF_live11v = _GLF_FUZZED(vec2(vec4(-7706.0374, 0.0, -496.405, -5.0)));
                            if (GLF_live11v.y < 0.0) {
                                GLF_live11th = -GLF_live11th;
                            }
                        }
                    }
                }
            }
        }
    }
}
