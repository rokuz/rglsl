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

vec4 GLF_dead8gl_FragCoord = _GLF_FUZZED(vec4(-9.7, -6673.2110, 9.5, 56.27));

layout(set = 0, binding = 2) uniform buf2 {
    vec2 GLF_dead8injectionSwitch;
};

int GLF_dead6MATRIX_N = 4;
vec4 GLF_dead7_GLF_color = _GLF_FUZZED((mat3x4(242.886, -121.062, -1270.7492, -4.5, 3168.1171, 31.18, -2.2, -4.7, -28.75, -5.0, -395.626, -64.37) * (+vec3(-1486.1892, 6285.9268, 681.409))));

layout(set = 0, binding = 3) uniform buf3 {
    vec3 GLF_dead7polynomial;
};

float GLF_dead7fx(float GLF_dead7x) {
    return GLF_dead7polynomial.x * pow(GLF_dead7x, 2.0) + GLF_dead7polynomial.y * GLF_dead7x + GLF_dead7polynomial.z;
}

layout(set = 0, binding = 4) uniform sampler2D GLF_dead5tex;
int GLF_dead3MATRIX_N = 4;

layout(set = 0, binding = 5) uniform buf5 {
    float GLF_dead1time;
};

float GLF_dead1h_r = _GLF_FUZZED(-4.0);
float GLF_dead1s_g = _GLF_FUZZED(9.0);
float GLF_dead1b_b = _GLF_FUZZED(-549.982);

vec3 _GLF_outlined_5(float GLF_dead1b_b, float GLF_dead1s_g, float GLF_dead1h_r) {
    return GLF_dead1b_b * (1.0 - GLF_dead1s_g) + (GLF_dead1b_b - GLF_dead1b_b * (1.0 - GLF_dead1s_g)) * clamp(abs(abs(6.0 * (GLF_dead1h_r - vec3(0, 1, 2) / 3.0)) - 3.0) - 1.0, 0.0, 1.0);
}

void GLF_dead1doConvert() {
    vec3 GLF_dead1temp = _GLF_FUZZED(vec3(determinant(mat4(49.18, 6.0, 4.0, -59.96, -233.716, -321.309, 75.62, -7316.3998, -5.3, 0.0, 2.9, 5.3, 17.72, 354.819, 246.657, 9.1)), 758.476, 459.324));
    GLF_dead1temp = _GLF_outlined_5(GLF_dead1b_b, GLF_dead1s_g, GLF_dead1h_r);
    GLF_dead1h_r = GLF_dead1temp.x;
    GLF_dead1s_g = GLF_dead1temp.y;
    GLF_dead1b_b = GLF_dead1temp.z;
    if (_GLF_DEAD(false)) {
        return;
    }
}

vec3 GLF_dead1computeColor(float GLF_dead1c, vec2 GLF_dead1position) {
    GLF_dead1h_r = fract(GLF_dead1c);
    GLF_dead1s_g = 1.0;
    GLF_dead1b_b = (0.5 + (sin(GLF_dead1time) * 0.5 + 0.5));
    if (_GLF_DEAD(false)) {
        return vec3(1.0, 1.0, 1.0);
    }
    GLF_dead1doConvert();
    GLF_dead1s_g *= 1.0 / GLF_dead1position.y;
    GLF_dead1h_r *= 1.0 / GLF_dead1position.x;
    if (abs(GLF_dead1position.y - GLF_dead1position.x) < 0.5) {
        GLF_dead1b_b = clamp(0.0, 1.0, GLF_dead1b_b * 3.0);
    }
    return vec3(GLF_dead1h_r, GLF_dead1s_g, GLF_dead1b_b);
}

vec3 GLF_dead1defaultColor() {
    return vec3(0.0);
}

vec3 GLF_dead1drawShape(vec2 GLF_dead1pos, vec2 GLF_dead1square, vec3 GLF_dead1setting) {
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
        return vec3(1.0, 1.0, 1.0);
    }
    bool GLF_dead1c1 = GLF_dead1pos.x - GLF_dead1setting.x < GLF_dead1square.x;
    if (_GLF_DEAD(false)) {
        vec4 donor_replacementGLF_dead5texel = _GLF_FUZZED(vec4(7.2, -6.0, 8678.1249, -6363.7476));
        {
            GLF_dead1square = donor_replacementGLF_dead5texel.xz + donor_replacementGLF_dead5texel.yy;
            GLF_dead1square = floor(GLF_dead1square * 256.0) / 256.0;
            donor_replacementGLF_dead5texel = texture(GLF_dead5tex, GLF_dead1square);
            GLF_dead3MATRIX_N++;
        }
    }
    if (!GLF_dead1c1) {
        return GLF_dead1defaultColor();
    }
    bool GLF_dead1c2 = GLF_dead1pos.x + GLF_dead1setting.x > GLF_dead1square.x;
    if (!GLF_dead1c2) {
        return GLF_dead1defaultColor();
    }
    bool GLF_dead1c3 = GLF_dead1pos.y - GLF_dead1setting.x < GLF_dead1square.y;
    if (!GLF_dead1c3) {
        return GLF_dead1defaultColor();
    }
    bool GLF_dead1c4 = GLF_dead1pos.y + GLF_dead1setting.x > GLF_dead1square.y;
    if (!GLF_dead1c4) {
        if (_GLF_DEAD(false)) {
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                int donor_replacementGLF_dead6k = _GLF_FUZZED(GLF_dead3MATRIX_N);
                vec4 donor_replacementGLF_dead6matrix_b = _GLF_FUZZED(vec4(-3752.8031, 8.9, -0.3, -3.7));
                vec4 donor_replacementGLF_dead6matrix_u = _GLF_FUZZED(vec4(64.55, -8679.7893, -46.02, -256.092));
                for (int GLF_dead6b = GLF_dead6MATRIX_N - 1; GLF_dead6b >= donor_replacementGLF_dead6k; GLF_dead6b--) {
                    donor_replacementGLF_dead6matrix_b[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6b, 4)] = donor_replacementGLF_dead6matrix_b[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6b, 4)] - (GLF_dead1b_b * donor_replacementGLF_dead6matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6b, 4)]);
                }
            }
            return vec3(1.0, 1.0, 1.0);
            if (_GLF_DEAD(false)) {
                {
                    GLF_dead7_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
                }
            }
        }
        return GLF_dead1defaultColor();
    }
    if (_GLF_DEAD(false)) {
        return vec3(1.0, 1.0, 1.0);
    }
    bool GLF_dead1c5 = GLF_dead1pos.x - (GLF_dead1setting.x - GLF_dead1setting.y) < GLF_dead1square.x;
    if (!GLF_dead1c5) {
        return GLF_dead1computeColor(GLF_dead1setting.z / 40.0, GLF_dead1pos);
    }
    bool GLF_dead1c6 = GLF_dead1pos.x + (GLF_dead1setting.x - GLF_dead1setting.y) > GLF_dead1square.x;
    if (!GLF_dead1c6) {
        return GLF_dead1computeColor(GLF_dead1setting.z / 40.0, GLF_dead1pos);
    }
    bool GLF_dead1c7 = GLF_dead1pos.y - (GLF_dead1setting.x - GLF_dead1setting.y) < GLF_dead1square.y;
    if (!GLF_dead1c7) {
        if (_GLF_DEAD(false)) {
            return vec3(1.0, 1.0, 1.0);
        }
        return GLF_dead1computeColor(GLF_dead1setting.z / 40.0, GLF_dead1pos);
    }
    bool GLF_dead1c8 = GLF_dead1pos.y + (GLF_dead1setting.x - GLF_dead1setting.y) > GLF_dead1square.y;
    if (!GLF_dead1c8) {
        return GLF_dead1computeColor(GLF_dead1setting.z / 40.0, GLF_dead1pos);
    }
    if (_GLF_DEAD(false)) {
        return vec3(1.0, 1.0, 1.0);
    }
    return GLF_dead1defaultColor();
}

layout(set = 0, binding = 6) uniform buf6 {
    float GLF_dead4time;
};

layout(set = 0, binding = 7) uniform buf7 {
    vec2 GLF_dead4resolution;
};

float GLF_dead4h_r = _GLF_FUZZED(8.5);
float GLF_dead4s_g = _GLF_FUZZED(float(61787));
float GLF_dead4b_b = _GLF_FUZZED((-(-8.5)));

vec3 _GLF_outlined_6(float GLF_dead4b_b, int GLF_dead4msb8, float GLF_dead4s_g, float GLF_dead4h_r, vec2 GLF_dead4resolution) {
    if (_GLF_DEAD(_GLF_IDENTITY(false, false || (false)))) {
        return vec3(1.0, 1.0, 1.0);
    }
    return GLF_dead4b_b * (float(bitCount(GLF_dead4msb8)) - GLF_dead4s_g) + (GLF_dead4b_b - GLF_dead4b_b * (float(bitCount(GLF_dead4msb8)) - GLF_dead4s_g)) * clamp(abs(abs(6.0 * (GLF_dead4h_r - vec3(bitfieldReverse(0), bitCount(GLF_dead4msb8), 2) / 3.0)) - 3.0) - float(bitCount(GLF_dead4msb8)), float(bitfieldExtract(int(GLF_dead4resolution.x), 0, 0)), float(bitCount(int(GLF_dead4resolution.x))));
}

void GLF_dead4doConvert() {
    int GLF_dead4msb8 = 256;
    vec3 GLF_dead4temp = _GLF_FUZZED(vec3(-2.4, -4.9, 96.19));
    GLF_dead4temp = _GLF_outlined_6(GLF_dead4b_b, GLF_dead4msb8, GLF_dead4s_g, GLF_dead4h_r, GLF_dead4resolution);
    GLF_dead4h_r = GLF_dead4temp.x;
    GLF_dead4s_g = GLF_dead4temp.y;
    if (_GLF_DEAD(false)) {
        if (GLF_dead4h_r <= -0.9 && GLF_dead4h_r >= -1.1) {
            GLF_dead7_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
        } else {
            GLF_dead7_GLF_color = vec4(0.0, 1.0, 0.0, 1.0);
        }
    }
    if (_GLF_DEAD(false)) {
        return;
    }
    GLF_dead4b_b = GLF_dead4temp.z;
}

vec3 GLF_dead4computeColor(float GLF_dead4c, vec2 GLF_dead4position) {
    if (_GLF_DEAD(false)) {
        return vec3(1.0, 1.0, 1.0);
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            vec3 donor_replacementGLF_dead8color = _GLF_FUZZED(vec3(62.96, 10.36, -3.3));
            {
                donor_replacementGLF_dead8color.yz += donor_replacementGLF_dead8color.yz;
            }
        }
    }
    int GLF_dead4msb8 = 256;
    GLF_dead4h_r = fract(GLF_dead4c);
    if (_GLF_DEAD(false)) {
        int donor_replacementGLF_dead8b = _GLF_FUZZED(GLF_dead4msb8);
        do {
            GLF_dead4position.y -= step(GLF_dead8injectionSwitch.y, GLF_dead4position.x) + float(GLF_dead3MATRIX_N) + float(donor_replacementGLF_dead8b) + float(GLF_dead3MATRIX_N);
            GLF_dead3MATRIX_N--;
        } while (GLF_dead3MATRIX_N > int(GLF_dead8injectionSwitch.x));
    }
    GLF_dead4s_g = float(bitCount(GLF_dead4msb8));
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
        return vec3(1.0, 1.0, 1.0);
    }
    GLF_dead4b_b = (0.5 + (sin(GLF_dead4time) * 0.5 + 0.5));
    GLF_dead4doConvert();
    GLF_dead4s_g *= float(bitCount(GLF_dead4msb8)) / GLF_dead4position.y;
    GLF_dead4h_r *= float(bitCount(GLF_dead4msb8)) / GLF_dead4position.x;
    if (abs(GLF_dead4position.y - GLF_dead4position.x) < 0.5) {
        GLF_dead4b_b = clamp(float(bitfieldExtract(int(GLF_dead4resolution.x), 0, 0)), float(bitCount(GLF_dead4msb8)), GLF_dead4b_b * float(bitCount(GLF_dead4msb8)) * 3.0);
    }
    return vec3(GLF_dead4h_r, GLF_dead4s_g, GLF_dead4b_b);
}

vec3 GLF_dead4defaultColor() {
    return vec3(float(bitfieldExtract(int(GLF_dead4resolution.y), 0, 0)));
}

vec3 GLF_dead4drawShape(vec2 GLF_dead4pos, vec2 GLF_dead4square, vec3 GLF_dead4setting) {
    int GLF_dead4msb8 = 256;
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
        float donor_replacementGLF_dead7C = _GLF_FUZZED(tanh(GLF_dead1b_b));
        float donor_replacementGLF_dead7temp = _GLF_FUZZED(step(-20.76, GLF_dead4h_r));
        {
            float GLF_dead7h0 = GLF_dead1b_b - GLF_dead1b_b;
            float GLF_dead7h1 = GLF_dead1h_r - GLF_dead1b_b;
            float GLF_dead7k0 = GLF_dead7fx(GLF_dead1b_b) - GLF_dead7fx(GLF_dead1b_b);
            float GLF_dead7k1 = GLF_dead7fx(GLF_dead1h_r) - GLF_dead7fx(GLF_dead1b_b);
            donor_replacementGLF_dead7temp = GLF_dead1b_b;
            GLF_dead1b_b = (((GLF_dead7h1) * (GLF_dead7k0)) - ((GLF_dead7h0) * (GLF_dead7k1))) / ((pow((GLF_dead7h0), 2.0) * (GLF_dead7h1)) - (pow((GLF_dead7h1), 2.0) * (GLF_dead7h0)));
            GLF_dead1h_r = (((GLF_dead7k0) - (GLF_dead1b_b * (pow((GLF_dead7h0), 2.0)))) / (GLF_dead7h0));
            donor_replacementGLF_dead7C = GLF_dead7fx(GLF_dead1b_b);
            GLF_dead1b_b = GLF_dead1b_b - ((2.0 * donor_replacementGLF_dead7C) / (GLF_dead1h_r + sign(GLF_dead1h_r) * sqrt(pow(GLF_dead1h_r, 2.0) - (4.0 * GLF_dead1b_b * donor_replacementGLF_dead7C))));
            GLF_dead1b_b = GLF_dead1h_r;
            GLF_dead1h_r = donor_replacementGLF_dead7temp;
        }
    }
    bool GLF_dead4c1 = GLF_dead4pos.x - GLF_dead4setting.x < GLF_dead4square.x;
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
        return vec3(1.0, 1.0, 1.0);
    }
    if (!GLF_dead4c1) {
        return GLF_dead4defaultColor();
    }
    bool GLF_dead4c2 = GLF_dead4pos.x + GLF_dead4setting.x > GLF_dead4square.x;
    if (!GLF_dead4c2) {
        return GLF_dead4defaultColor();
    }
    if (_GLF_DEAD(false)) {
        return vec3(1.0, 1.0, 1.0);
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
        float donor_replacementGLF_dead7temp = _GLF_FUZZED(GLF_dead4h_r);
        {
            float GLF_dead7h0 = GLF_dead4b_b - GLF_dead4h_r;
            float GLF_dead7h1 = GLF_dead4b_b - GLF_dead4h_r;
            float GLF_dead7k0 = GLF_dead7fx(GLF_dead4b_b) - GLF_dead7fx(GLF_dead4h_r);
            float GLF_dead7k1 = GLF_dead7fx(GLF_dead4b_b) - GLF_dead7fx(GLF_dead4h_r);
            donor_replacementGLF_dead7temp = GLF_dead4h_r;
            GLF_dead1h_r = (((GLF_dead7h1) * (GLF_dead7k0)) - ((GLF_dead7h0) * (GLF_dead7k1))) / ((pow((GLF_dead7h0), 2.0) * (GLF_dead7h1)) - (pow((GLF_dead7h1), 2.0) * (GLF_dead7h0)));
            GLF_dead1s_g = (((GLF_dead7k0) - (GLF_dead1h_r * (pow((GLF_dead7h0), 2.0)))) / (GLF_dead7h0));
            GLF_dead1b_b = GLF_dead7fx(GLF_dead4h_r);
            GLF_dead4h_r = GLF_dead4h_r - ((2.0 * GLF_dead1b_b) / (GLF_dead1s_g + sign(GLF_dead1s_g) * sqrt(pow(GLF_dead1s_g, 2.0) - (4.0 * GLF_dead1h_r * GLF_dead1b_b))));
            GLF_dead4b_b = GLF_dead4b_b;
            GLF_dead4b_b = donor_replacementGLF_dead7temp;
        }
    }
    bool GLF_dead4c3 = GLF_dead4pos.y - GLF_dead4setting.x < GLF_dead4square.y;
    if (!GLF_dead4c3) {
        return GLF_dead4defaultColor();
    }
    if (_GLF_DEAD(false)) {
        vec4 donor_replacementGLF_dead5texel = _GLF_FUZZED(vec4(2.1, -3.4, 4.0, 0.5));
        while (donor_replacementGLF_dead5texel.x + donor_replacementGLF_dead5texel.y + donor_replacementGLF_dead5texel.z > 1.0 && GLF_dead3MATRIX_N < 16) {
            GLF_dead4square = donor_replacementGLF_dead5texel.xz + donor_replacementGLF_dead5texel.yy;
            GLF_dead4square = floor(GLF_dead4square * 256.0) / 256.0;
            donor_replacementGLF_dead5texel = texture(GLF_dead5tex, GLF_dead4square);
            GLF_dead3MATRIX_N++;
        }
    }
    bool GLF_dead4c4 = GLF_dead4pos.y + GLF_dead4setting.x > GLF_dead4square.y;
    if (!GLF_dead4c4) {
        return GLF_dead4defaultColor();
    }
    bool GLF_dead4c5 = GLF_dead4pos.x - (GLF_dead4setting.x - GLF_dead4setting.y) < GLF_dead4square.x;
    if (!GLF_dead4c5) {
        if (_GLF_DEAD(false)) {
            return vec3(1.0, 1.0, 1.0);
            if (_GLF_DEAD(_GLF_IDENTITY(false, true && (false)))) {
                vec2 donor_replacementGLF_dead5coord = _GLF_FUZZED(GLF_dead4pos);
                vec4 donor_replacementGLF_dead5texel = _GLF_FUZZED(min(vec4(4029.2836, 6.4, 4.4, -9.2), vec4(-5.0, -157.376, -29.59, -8.7)));
                while (donor_replacementGLF_dead5texel.x + donor_replacementGLF_dead5texel.y + donor_replacementGLF_dead5texel.z > 1.0 && GLF_dead4msb8 < 16) {
                    donor_replacementGLF_dead5coord = donor_replacementGLF_dead5texel.xz + donor_replacementGLF_dead5texel.yy;
                    donor_replacementGLF_dead5coord = floor(donor_replacementGLF_dead5coord * 256.0) / 256.0;
                    donor_replacementGLF_dead5texel = texture(GLF_dead5tex, donor_replacementGLF_dead5coord);
                    GLF_dead4msb8++;
                }
            }
        }
        return GLF_dead4computeColor(GLF_dead4setting.z / (5.0 * float(findMSB(GLF_dead4msb8))), GLF_dead4pos);
        if (_GLF_DEAD(false)) {
            return vec3(1.0, 1.0, 1.0);
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
            float donor_replacementGLF_dead7temp = _GLF_FUZZED(dFdyCoarse(GLF_dead1s_g));
            float donor_replacementGLF_dead7x2 = _GLF_FUZZED(reflect(GLF_dead4b_b, GLF_dead4b_b));
            {
                float GLF_dead7h0 = GLF_dead4s_g - donor_replacementGLF_dead7x2;
                float GLF_dead7h1 = GLF_dead1h_r - donor_replacementGLF_dead7x2;
                float GLF_dead7k0 = GLF_dead7fx(GLF_dead4s_g) - GLF_dead7fx(donor_replacementGLF_dead7x2);
                float GLF_dead7k1 = GLF_dead7fx(GLF_dead1h_r) - GLF_dead7fx(donor_replacementGLF_dead7x2);
                donor_replacementGLF_dead7temp = donor_replacementGLF_dead7x2;
                GLF_dead1b_b = (((GLF_dead7h1) * (GLF_dead7k0)) - ((GLF_dead7h0) * (GLF_dead7k1))) / ((pow((GLF_dead7h0), 2.0) * (GLF_dead7h1)) - (pow((GLF_dead7h1), 2.0) * (GLF_dead7h0)));
                GLF_dead1h_r = (((GLF_dead7k0) - (GLF_dead1b_b * (pow((GLF_dead7h0), 2.0)))) / (GLF_dead7h0));
                GLF_dead1b_b = GLF_dead7fx(donor_replacementGLF_dead7x2);
                donor_replacementGLF_dead7x2 = donor_replacementGLF_dead7x2 - ((2.0 * GLF_dead1b_b) / (GLF_dead1h_r + sign(GLF_dead1h_r) * sqrt(pow(GLF_dead1h_r, 2.0) - (4.0 * GLF_dead1b_b * GLF_dead1b_b))));
                GLF_dead4s_g = GLF_dead1h_r;
                GLF_dead1h_r = donor_replacementGLF_dead7temp;
            }
        }
    }
    bool GLF_dead4c6 = GLF_dead4pos.x + (GLF_dead4setting.x - GLF_dead4setting.y) > GLF_dead4square.x;
    if (_GLF_DEAD(false)) {
        float donor_replacementGLF_dead7x2 = _GLF_FUZZED(GLF_dead4s_g);
        if (donor_replacementGLF_dead7x2 <= -0.9 && donor_replacementGLF_dead7x2 >= -1.1) {
            GLF_dead7_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
        } else {
            GLF_dead7_GLF_color = vec4(0.0, 1.0, 0.0, 1.0);
        }
    }
    if (!GLF_dead4c6) {
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            return vec3(1.0, 1.0, 1.0);
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                float donor_replacementGLF_dead7B = _GLF_FUZZED(dFdyFine(acosh(-6.5)));
                while (abs(GLF_dead4h_r - GLF_dead4b_b) >= .000000000000001) {
                    float GLF_dead7h0 = GLF_dead1h_r - GLF_dead4h_r;
                    float GLF_dead7h1 = GLF_dead4b_b - GLF_dead4h_r;
                    float GLF_dead7k0 = GLF_dead7fx(GLF_dead1h_r) - GLF_dead7fx(GLF_dead4h_r);
                    float GLF_dead7k1 = GLF_dead7fx(GLF_dead4b_b) - GLF_dead7fx(GLF_dead4h_r);
                    GLF_dead1b_b = GLF_dead4h_r;
                    GLF_dead1b_b = (((GLF_dead7h1) * (GLF_dead7k0)) - ((GLF_dead7h0) * (GLF_dead7k1))) / ((pow((GLF_dead7h0), 2.0) * (GLF_dead7h1)) - (pow((GLF_dead7h1), 2.0) * (GLF_dead7h0)));
                    donor_replacementGLF_dead7B = (((GLF_dead7k0) - (GLF_dead1b_b * (pow((GLF_dead7h0), 2.0)))) / (GLF_dead7h0));
                    GLF_dead4s_g = GLF_dead7fx(GLF_dead4h_r);
                    GLF_dead4h_r = GLF_dead4h_r - ((2.0 * GLF_dead4s_g) / (donor_replacementGLF_dead7B + sign(donor_replacementGLF_dead7B) * sqrt(pow(donor_replacementGLF_dead7B, 2.0) - (4.0 * GLF_dead1b_b * GLF_dead4s_g))));
                    GLF_dead1h_r = GLF_dead4b_b;
                    GLF_dead4b_b = GLF_dead1b_b;
                }
            }
        }
        return GLF_dead4computeColor(GLF_dead4setting.z / (5.0 * float(findMSB(GLF_dead4msb8))), GLF_dead4pos);
    }
    bool GLF_dead4c7 = GLF_dead4pos.y - (GLF_dead4setting.x - GLF_dead4setting.y) < GLF_dead4square.y;
    if (!GLF_dead4c7) {
        return GLF_dead4computeColor(GLF_dead4setting.z / (5.0 * float(findMSB(GLF_dead4msb8))), GLF_dead4pos);
    }
    bool GLF_dead4c8 = GLF_dead4pos.y + (GLF_dead4setting.x - GLF_dead4setting.y) > GLF_dead4square.y;
    if (!GLF_dead4c8) {
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
            int donor_replacementGLF_dead8a = _GLF_FUZZED(bitCount(47457u));
            do {
                GLF_dead4pos.y -= step(GLF_dead8injectionSwitch.y, GLF_dead4pos.x);
                GLF_dead4pos.x -= fract(tanh(GLF_dead4pos.x)) / ldexp(GLF_dead8injectionSwitch.y, findMSB(donor_replacementGLF_dead8a));
                donor_replacementGLF_dead8a--;
            } while (donor_replacementGLF_dead8a > int(GLF_dead8injectionSwitch.x));
        }
        return GLF_dead4computeColor(GLF_dead4setting.z / (5.0 * float(findMSB(GLF_dead4msb8))), GLF_dead4pos);
    }
    return GLF_dead4defaultColor();
}

layout(set = 0, binding = 8) uniform sampler2D GLF_dead2tex;
const float GLF_dead2weights[9] = float[9](1.0, 0.5, -0.25, 0.5, 1.0, -0.5, -0.25, -0.5, -1.0);
layout(location = 0) out vec4 _GLF_color;

layout(set = 0, binding = 0) uniform buf0 {
    vec2 resolution;
};

vec3 pickColor(int i) {
    return vec3(float(i) / 50.0, float(i) / 120.0, float(i) / 140.0);
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < length(vec4(0.0, 0.0, 0.0, 0.0)))))) {
            bool donor_replacementGLF_dead1c1 = _GLF_FUZZED(false);
            if (_GLF_DEAD(false)) {
                {
                    GLF_dead7_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
                }
            }
            if (!donor_replacementGLF_dead1c1) {
                return GLF_dead1defaultColor();
            }
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            return vec3(1.0, 1.0, 1.0);
        }
        vec3 donor_replacementGLF_dead0c = _GLF_FUZZED(vec3(792.785, -17.06, -558.022));
        if (_GLF_DEAD(false)) {
            _GLF_color = vec4(6.6, 1.8, 11.44, 890.756);
        }
        {
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                vec2 donor_replacementGLF_dead2coord = _GLF_FUZZED(vec2(-5.4, -481.052));
                vec4 donor_replacementGLF_dead2res = _GLF_FUZZED(_GLF_color);
                float donor_replacementGLF_dead2uvstep = _GLF_FUZZED(1.3);
                for (int GLF_dead2i = 0; GLF_dead2i < 3; GLF_dead2i++) {
                    for (int GLF_dead2j = 0; GLF_dead2j < 3; GLF_dead2j++) {
                        donor_replacementGLF_dead2res += texture(GLF_dead2tex, donor_replacementGLF_dead2coord + vec2(float(GLF_dead2i - 1) * donor_replacementGLF_dead2uvstep, float(GLF_dead2j - 1) * donor_replacementGLF_dead2uvstep)) * GLF_dead2weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead2i * 3 + GLF_dead2j, 9)];
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            _GLF_color = GLF_dead8gl_FragCoord;
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        continue;
                    }
                }
            }
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            if (_GLF_DEAD(false)) {
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    float donor_replacementGLF_dead6alpha1 = _GLF_FUZZED(GLF_dead1s_g);
                    float donor_replacementGLF_dead6alpha3 = _GLF_FUZZED(fwidthFine(donor_replacementGLF_dead0c).g);
                    mat4 donor_replacementGLF_dead6matrix_a = _GLF_FUZZED(mat4(-4.8, 8.4, 9.0, -0.3, -7.8, -353.767, -86.74, 1876.3278, -3.5, -44.91, -1.4, -85.88, -949.596, 4.3, -41.25, -352.616));
                    vec4 donor_replacementGLF_dead6matrix_u = _GLF_FUZZED(mod(vec4(248.285, 5396.2570, -8.0, -983.909), exp(atan(GLF_dead4b_b, GLF_dead1s_g))));
                    {
                        for (int GLF_dead6x = GLF_dead6MATRIX_N - 1; GLF_dead6x >= i; GLF_dead6x--) {
                            GLF_dead4s_g += pow(donor_replacementGLF_dead6matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6x, 4)][_GLF_MAKE_IN_BOUNDS_INT(i, 4)], 2.0);
                            donor_replacementGLF_dead6matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6x, 4)] = donor_replacementGLF_dead6matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6x, 4)][_GLF_MAKE_IN_BOUNDS_INT(i, 4)];
                        }
                        GLF_dead4s_g = sqrt(GLF_dead4s_g);
                        donor_replacementGLF_dead6matrix_u[_GLF_MAKE_IN_BOUNDS_INT(i, 4)] -= (sign(donor_replacementGLF_dead6matrix_u[_GLF_MAKE_IN_BOUNDS_INT(i, 4)]) * GLF_dead4s_g);
                        for (int GLF_dead6u = GLF_dead6MATRIX_N - 1; GLF_dead6u >= i; GLF_dead6u--) {
                            donor_replacementGLF_dead6alpha1 += pow(donor_replacementGLF_dead6matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6u, 4)], 2.0);
                        }
                        GLF_dead1b_b = 2.0 / donor_replacementGLF_dead6alpha1;
                        for (int GLF_dead6j = i; GLF_dead6j < GLF_dead6MATRIX_N; GLF_dead6j++) {
                            for (int GLF_dead6a = GLF_dead6MATRIX_N - 1; GLF_dead6a >= i; GLF_dead6a--) {
                                donor_replacementGLF_dead6alpha3 += donor_replacementGLF_dead6matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6a, 4)] * donor_replacementGLF_dead6matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6a, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6j, 4)];
                            }
                            GLF_dead1h_r = GLF_dead1b_b * donor_replacementGLF_dead6alpha3;
                            for (int GLF_dead6a = GLF_dead6MATRIX_N - 1; GLF_dead6a >= i; GLF_dead6a--) {
                                donor_replacementGLF_dead6matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6a, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6j, 4)] = donor_replacementGLF_dead6matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6a, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6j, 4)] - (GLF_dead1h_r * donor_replacementGLF_dead6matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6a, 4)]);
                            }
                            donor_replacementGLF_dead6alpha3 = 0.0;
                            GLF_dead1h_r = 0.0;
                        }
                        for (int GLF_dead6b = GLF_dead6MATRIX_N - 1; GLF_dead6b >= i; GLF_dead6b--) {
                            donor_replacementGLF_dead6alpha3 += donor_replacementGLF_dead6matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6b, 4)] * _GLF_outVarBackup_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6b, 4)];
                        }
                        GLF_dead1h_r = GLF_dead1b_b * donor_replacementGLF_dead6alpha3;
                        for (int GLF_dead6b = GLF_dead6MATRIX_N - 1; GLF_dead6b >= i; GLF_dead6b--) {
                            _GLF_outVarBackup_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6b, 4)] = _GLF_outVarBackup_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6b, 4)] - (GLF_dead1h_r * donor_replacementGLF_dead6matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6b, 4)]);
                        }
                        GLF_dead4s_g = 0.0;
                        donor_replacementGLF_dead6alpha1 = 0.0;
                        GLF_dead1b_b = 0.0;
                        donor_replacementGLF_dead6alpha3 = 0.0;
                        GLF_dead1h_r = 0.0;
                    }
                }
                return vec3(1.0, 1.0, 1.0);
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                float donor_replacementGLF_dead6alpha2 = _GLF_FUZZED(GLF_dead1time);
                float donor_replacementGLF_dead6alpha3 = _GLF_FUZZED(GLF_dead1s_g);
                float donor_replacementGLF_dead6magnitudeX = _GLF_FUZZED(min(GLF_dead1h_r, GLF_dead1s_g));
                mat4 donor_replacementGLF_dead6matrix_a = _GLF_FUZZED((mat2x4(9.0, 281.743, 8.2, -9.6, 33.28, -911.512, -4459.5725, 83.40) * (mat4x2(541.814, -4.8, -8.9, 5.8, -891.172, -665.007, 3.5, -508.339) * GLF_dead4b_b)));
                vec4 donor_replacementGLF_dead6matrix_b = _GLF_FUZZED(reflect(dFdyCoarse(_GLF_outVarBackup_GLF_color), (mat3x4(-92.40, 516.233, 86.63, -9948.6859, -4957.1668, 5.6, 8.4, 5.1, -65.73, -6.0, 2.8, -4.8) * vec3(69.19, 278.699, -54.03))));
                vec4 donor_replacementGLF_dead6matrix_u = _GLF_FUZZED(sin(_GLF_color));
                for (int GLF_dead6k = 0; GLF_dead6k < GLF_dead6MATRIX_N - 1; GLF_dead6k++) {
                    for (int GLF_dead6x = GLF_dead6MATRIX_N - 1; GLF_dead6x >= GLF_dead6k; GLF_dead6x--) {
                        donor_replacementGLF_dead6magnitudeX += pow(donor_replacementGLF_dead6matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6x, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6k, 4)], 2.0);
                        donor_replacementGLF_dead6matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6x, 4)] = donor_replacementGLF_dead6matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6x, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6k, 4)];
                    }
                    donor_replacementGLF_dead6magnitudeX = sqrt(donor_replacementGLF_dead6magnitudeX);
                    donor_replacementGLF_dead6matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6k, 4)] -= (sign(donor_replacementGLF_dead6matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6k, 4)]) * donor_replacementGLF_dead6magnitudeX);
                    for (int GLF_dead6u = GLF_dead6MATRIX_N - 1; GLF_dead6u >= GLF_dead6k; GLF_dead6u--) {
                        GLF_dead1b_b += pow(donor_replacementGLF_dead6matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6u, 4)], 2.0);
                    }
                    donor_replacementGLF_dead6alpha2 = 2.0 / GLF_dead1b_b;
                    for (int GLF_dead6j = GLF_dead6k; GLF_dead6j < GLF_dead6MATRIX_N; GLF_dead6j++) {
                        for (int GLF_dead6a = GLF_dead6MATRIX_N - 1; GLF_dead6a >= GLF_dead6k; GLF_dead6a--) {
                            donor_replacementGLF_dead6alpha3 += donor_replacementGLF_dead6matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6a, 4)] * donor_replacementGLF_dead6matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6a, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6j, 4)];
                        }
                        GLF_dead1s_g = donor_replacementGLF_dead6alpha2 * donor_replacementGLF_dead6alpha3;
                        for (int GLF_dead6a = GLF_dead6MATRIX_N - 1; GLF_dead6a >= GLF_dead6k; GLF_dead6a--) {
                            donor_replacementGLF_dead6matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6a, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6j, 4)] = donor_replacementGLF_dead6matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6a, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6j, 4)] - (GLF_dead1s_g * donor_replacementGLF_dead6matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6a, 4)]);
                        }
                        donor_replacementGLF_dead6alpha3 = 0.0;
                        GLF_dead1s_g = 0.0;
                    }
                    for (int GLF_dead6b = GLF_dead6MATRIX_N - 1; GLF_dead6b >= GLF_dead6k; GLF_dead6b--) {
                        donor_replacementGLF_dead6alpha3 += donor_replacementGLF_dead6matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6b, 4)] * donor_replacementGLF_dead6matrix_b[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6b, 4)];
                    }
                    if (_GLF_DEAD(false)) {
                        _GLF_color = step(donor_replacementGLF_dead6matrix_u, GLF_dead7_GLF_color);
                    }
                    GLF_dead1s_g = donor_replacementGLF_dead6alpha2 * donor_replacementGLF_dead6alpha3;
                    for (int GLF_dead6b = GLF_dead6MATRIX_N - 1; GLF_dead6b >= GLF_dead6k; GLF_dead6b--) {
                        donor_replacementGLF_dead6matrix_b[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6b, 4)] = donor_replacementGLF_dead6matrix_b[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6b, 4)] - (GLF_dead1s_g * donor_replacementGLF_dead6matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6b, 4)]);
                    }
                    donor_replacementGLF_dead6magnitudeX = 0.0;
                    GLF_dead1b_b = 0.0;
                    donor_replacementGLF_dead6alpha2 = 0.0;
                    donor_replacementGLF_dead6alpha3 = 0.0;
                    GLF_dead1s_g = 0.0;
                }
            }
            _GLF_color = step(sinh(67.44), vec4(953.139, 3.5, 5.0, 0.3));
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
        for (int GLF_dead0i = 0; GLF_dead0i < 3; GLF_dead0i++) {
            if (_GLF_DEAD(false)) {
                if (_GLF_DEAD(false)) {
                    break;
                }
                return vec3(1.0, 1.0, 1.0);
            }
            if (donor_replacementGLF_dead0c[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead0i, 3)] >= 1.0) {
                donor_replacementGLF_dead0c[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead0i, 3)] = donor_replacementGLF_dead0c[_GLF_MAKE_IN_BOUNDS_INT(_GLF_IDENTITY(GLF_dead0i, max(GLF_dead0i, GLF_dead0i)), 3)] * donor_replacementGLF_dead0c[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead0i, 3)];
                if (_GLF_DEAD(false)) {
                    break;
                }
                if (_GLF_DEAD(false)) {
                    if (_GLF_DEAD(false)) {
                        continue;
                    }
                    float donor_replacementGLF_dead3alpha3 = _GLF_FUZZED(sqrt(_GLF_color)[3]);
                    if (_GLF_DEAD(false)) {
                        float donor_replacementGLF_dead7A = _GLF_FUZZED(GLF_dead4b_b);
                        if (_GLF_DEAD(_GLF_IDENTITY(false, bool(bvec3(false, true, true))))) {
                            _GLF_color = GLF_dead8gl_FragCoord;
                        }
                        float donor_replacementGLF_dead7C = _GLF_FUZZED(GLF_dead1b_b);
                        float donor_replacementGLF_dead7x0 = _GLF_FUZZED(GLF_dead4resolution.r);
                        {
                            float GLF_dead7h0 = donor_replacementGLF_dead7x0 - GLF_dead4b_b;
                            float GLF_dead7h1 = GLF_dead4s_g - GLF_dead4b_b;
                            float GLF_dead7k0 = GLF_dead7fx(donor_replacementGLF_dead7x0) - GLF_dead7fx(GLF_dead4b_b);
                            float GLF_dead7k1 = GLF_dead7fx(GLF_dead4s_g) - GLF_dead7fx(GLF_dead4b_b);
                            GLF_dead4s_g = GLF_dead4b_b;
                            donor_replacementGLF_dead7A = (((GLF_dead7h1) * (GLF_dead7k0)) - ((GLF_dead7h0) * (GLF_dead7k1))) / ((pow((GLF_dead7h0), 2.0) * (GLF_dead7h1)) - (pow((GLF_dead7h1), 2.0) * (GLF_dead7h0)));
                            GLF_dead1h_r = (((GLF_dead7k0) - (donor_replacementGLF_dead7A * (pow((GLF_dead7h0), 2.0)))) / (GLF_dead7h0));
                            donor_replacementGLF_dead7C = GLF_dead7fx(GLF_dead4b_b);
                            GLF_dead4b_b = GLF_dead4b_b - ((2.0 * donor_replacementGLF_dead7C) / (GLF_dead1h_r + sign(GLF_dead1h_r) * sqrt(pow(GLF_dead1h_r, 2.0) - (4.0 * donor_replacementGLF_dead7A * donor_replacementGLF_dead7C))));
                            donor_replacementGLF_dead7x0 = GLF_dead4s_g;
                            GLF_dead4s_g = GLF_dead4s_g;
                        }
                    }
                    vec4 donor_replacementGLF_dead3matrix_b = _GLF_FUZZED(_GLF_color);
                    {
                        donor_replacementGLF_dead3alpha3 += _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(i, 4)] * donor_replacementGLF_dead3matrix_b[_GLF_MAKE_IN_BOUNDS_INT(i, 4)];
                    }
                }
            }
        }
    }
    if (_GLF_DEAD(false)) {
        return vec3(1.0, 1.0, 1.0);
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < _GLF_IDENTITY(0.0, mix(float(0.0), float(_GLF_FUZZED(-8.1)), bool(false))))))) {
        return vec3(1.0, 1.0, 1.0);
    }
}

int _GLF_outlined_2(int x, int y, int c_im) {
    return (2 * x * y / 256 + c_im);
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
        float donor_replacementGLF_dead6alpha3 = _GLF_FUZZED(GLF_dead4b_b);
        int donor_replacementGLF_dead6j = _GLF_FUZZED(((sign(c_im) >> findLSB(139550u)) - GLF_dead3MATRIX_N));
        mat4 donor_replacementGLF_dead6matrix_a = _GLF_FUZZED(mat4(0.3, 9613.6245, -6005.9091, 19.46, -4035.2417, 9839.3327, 7.4, -25.20, -0.7, 326.402, -4.9, -53.06, -8.5, -68.75, -768.969, 275.904));
        vec4 donor_replacementGLF_dead6matrix_u = _GLF_FUZZED(vec4(3339.1678, -9.9, 5051.7516, 2694.8550));
        {
            donor_replacementGLF_dead6alpha3 += donor_replacementGLF_dead6matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead3MATRIX_N, 4)] * donor_replacementGLF_dead6matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead3MATRIX_N, 4)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead6j, 4)];
        }
    }
}

int _GLF_outlined_3(int x_new) {
    return x_new;
}

vec4 _GLF_outlined_7() {
    return (4.3 / mix(vec4(369.347, -58.88, -5.8, 4.7), vec4(85.07, -600.466, 9098.5949, -8.4), bvec4(false, true, true, true)));
}

vec4 _GLF_outlined_8(vec4 _GLF_outVarBackup_GLF_color) {
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
        {
            GLF_dead7_GLF_color = vec4(0.0, 1.0, 0.0, 1.0);
        }
    }
    return _GLF_outVarBackup_GLF_color;
}

vec4 _GLF_outlined_9(vec4 _GLF_outVarBackup_GLF_color) {
    return _GLF_outVarBackup_GLF_color;
}

vec4 _GLF_outlined_10() {
    return (mat2x4(7.4, -852.126, 5068.6032, 28.16, -4.7, -6735.1524, -67.87, 121.142) * vec2(-0.7, -5.1));
}

vec3 mand(float xCoord, float yCoord) {
    if (_GLF_DEAD(false)) {
        _GLF_color = vec4(804.146, -4.0, 2.9, 9988.3411);
    }
    if (_GLF_DEAD(_GLF_IDENTITY(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)), !(!(_GLF_IDENTITY(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)), bool(bvec4(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)), true, true, false)))))))) {
        _GLF_color = (GLF_dead7_GLF_color);
    }
    int xpos = int(xCoord) * _GLF_IDENTITY(256, int(ivec3(_GLF_IDENTITY(256, (256) | 0), 0, 0)));
    int ypos = int(yCoord) * 256;
    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
        vec2 donor_replacementGLF_dead4pos = _GLF_FUZZED((true ? vec2(-9874.2718, 6740.1207) : injectionSwitch));
        vec3 donor_replacementGLF_dead4setting = _GLF_FUZZED(vec3(81.56, -36.19, -181.712));
        {
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                {
                    GLF_dead7_GLF_color = vec4(0.0, 1.0, 0.0, 1.0);
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        _GLF_color = intBitsToFloat(ivec4(72993, 33010, -78908, -61228));
                    }
                }
            }
            return GLF_dead4computeColor(donor_replacementGLF_dead4setting.z / (5.0 * float(findMSB(xpos))), donor_replacementGLF_dead4pos);
        }
    }
    if (_GLF_DEAD(false)) {
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            bool donor_replacementGLF_dead4c5 = _GLF_FUZZED(false);
            int donor_replacementGLF_dead4msb8 = _GLF_FUZZED(ypos);
            vec2 donor_replacementGLF_dead4pos = _GLF_FUZZED(vec2(4.2, -410.298));
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                return vec3(1.0, 1.0, 1.0);
            }
            vec3 donor_replacementGLF_dead4setting = _GLF_FUZZED(log(vec3(-7.9, -4.8, 3.6)));
            if (!donor_replacementGLF_dead4c5) {
                return GLF_dead4computeColor(donor_replacementGLF_dead4setting.z / (5.0 * float(findMSB(donor_replacementGLF_dead4msb8))), donor_replacementGLF_dead4pos);
            }
        }
        {
            vec4 _GLF_outVarBackup_GLF_color;
            if (_GLF_DEAD(false)) {
                {
                    GLF_dead7_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
                }
            }
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = _GLF_outlined_7();
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            if (_GLF_DEAD(false)) {
                return vec3(1.0, 1.0, 1.0);
            }
            if (_GLF_DEAD(false)) {
                int donor_replacementGLF_dead6k = _GLF_FUZZED(int(true));
                mat4 donor_replacementGLF_dead6matrix_a = _GLF_FUZZED(mat4(-613.689, -42.98, 42.35, 3.2, 59.29, 408.757, 1.1, 79.32, -355.779, 3013.4603, -3.5, -3.3, -449.012, 420.343, 518.008, 9641.3364));
                vec4 donor_replacementGLF_dead6matrix_u = _GLF_FUZZED(((GLF_dead1s_g - asin(_GLF_color)) - GLF_dead1time));
                for (int GLF_dead6a = GLF_dead6MATRIX_N - 1; GLF_dead6a >= donor_replacementGLF_dead6k; GLF_dead6a--) {
                    donor_replacementGLF_dead6matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6a, 4)][_GLF_MAKE_IN_BOUNDS_INT(ypos, 4)] = donor_replacementGLF_dead6matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6a, 4)][_GLF_MAKE_IN_BOUNDS_INT(ypos, 4)] - (GLF_dead4b_b * donor_replacementGLF_dead6matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6a, 4)]);
                }
            }
            return vec3(1.0, 1.0, 1.0);
        }
        return vec3(1.0, 1.0, 1.0);
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < log(1.0))))) {
        vec3 donor_replacementGLF_dead1d = _GLF_FUZZED(max(vec3(742.252, 6.6, -3543.3839), fma(vec3(-769.499, 5.0, 8237.0568), fwidth(vec3(-26.57, -9945.8570, 8634.5223)), vec3(0.6, 9.6, -89.15))));
        if (length(donor_replacementGLF_dead1d) <= 0.0) {
            ;
        }
        if (_GLF_DEAD(false)) {
            _GLF_color = atanh(GLF_dead8gl_FragCoord);
        }
    }
    int height = int(resolution.y) * 256;
    {
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        _GLF_color = reflect(vec4(609.302, 7.7, -25.14, -3072.8231), vec4(-3.3, 485.038, -95.39, 39.67));
        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
            if (_GLF_DEAD(false)) {
                {
                    GLF_dead7_GLF_color = vec4(0.0, 1.0, 0.0, 1.0);
                }
            }
        }
    }
    if (_GLF_DEAD(false)) {
        if (_GLF_DEAD(false)) {
            return vec3(1.0, 1.0, 1.0);
        }
        if (_GLF_DEAD(false)) {
            {
                ;
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                return vec3(1.0, 1.0, 1.0);
            }
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (_GLF_IDENTITY(injectionSwitch, vec2(injectionSwitch[0], injectionSwitch[1])).x > injectionSwitch.y)))) {
            return vec3(1.0, 1.0, 1.0);
        }
        return vec3(1.0, 1.0, 1.0);
        if (_GLF_DEAD(false)) {
            if (_GLF_DEAD(false)) {
                _GLF_color = (mat2x4(-0.7, 495.260, 86.60, -63.46, -2220.0335, -4.0, -223.022, -30.30) * (mat2(-4.7, 3.2, 974.774, 5238.8746) * resolution));
            }
            bool donor_replacementGLF_dead4c4 = _GLF_FUZZED(equal((+uvec3(34908u, 21751u, 198172u)), uvec3(146825u, 135858u, 122037u))[0]);
            if (!donor_replacementGLF_dead4c4) {
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    vec2 donor_replacementGLF_dead5coord = _GLF_FUZZED(GLF_dead4resolution);
                    vec4 donor_replacementGLF_dead5texel = _GLF_FUZZED(atanh(_GLF_color));
                    {
                        donor_replacementGLF_dead5coord = donor_replacementGLF_dead5texel.xz + donor_replacementGLF_dead5texel.yy;
                        donor_replacementGLF_dead5coord = floor(donor_replacementGLF_dead5coord * 256.0) / 256.0;
                        donor_replacementGLF_dead5texel = texture(GLF_dead5tex, donor_replacementGLF_dead5coord);
                        height++;
                    }
                }
                return GLF_dead4defaultColor();
            }
            if (_GLF_DEAD(false)) {
                return vec3(1.0, 1.0, 1.0);
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    vec2 donor_replacementGLF_dead5coord = _GLF_FUZZED(resolution);
                    while (_GLF_color.x + _GLF_color.y + _GLF_color.z > 1.0 && xpos < 16) {
                        donor_replacementGLF_dead5coord = _GLF_color.xz + _GLF_color.yy;
                        donor_replacementGLF_dead5coord = floor(donor_replacementGLF_dead5coord * 256.0) / 256.0;
                        _GLF_color = texture(GLF_dead5tex, donor_replacementGLF_dead5coord);
                        xpos++;
                    }
                }
            }
            if (_GLF_DEAD(false)) {
                vec4 donor_replacementGLF_dead6matrix_b = _GLF_FUZZED(_GLF_color);
                {
                    donor_replacementGLF_dead6matrix_b[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead3MATRIX_N, 4)] = donor_replacementGLF_dead6matrix_b[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead3MATRIX_N, 4)] - (yCoord * _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead3MATRIX_N, 4)]);
                }
            }
        }
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
        return vec3(1.0, 1.0, 1.0);
        if (_GLF_DEAD(false)) {
            vec2 donor_replacementGLF_dead5coord = _GLF_FUZZED(injectionSwitch.rr);
            vec4 donor_replacementGLF_dead5texel = _GLF_FUZZED(vec4(-8261.0135, -779.048, -3.7, -6919.7048));
            {
                donor_replacementGLF_dead5coord = donor_replacementGLF_dead5texel.xz + donor_replacementGLF_dead5texel.yy;
                donor_replacementGLF_dead5coord = floor(donor_replacementGLF_dead5coord * 256.0) / 256.0;
                donor_replacementGLF_dead5texel = texture(GLF_dead5tex, donor_replacementGLF_dead5coord);
                height++;
            }
        }
    }
    int width = int(_GLF_IDENTITY(resolution.x, 1.0 * (resolution.x))) * 256;
    int c_re = ((xpos - _GLF_IDENTITY(width, min(width, width)) / 2) * 819) / width - 102;
    if (_GLF_DEAD(false)) {
        if (_GLF_DEAD(false)) {
            float donor_replacementGLF_dead6beta = _GLF_FUZZED(GLF_dead4h_r);
            for (int GLF_dead6b = GLF_dead6MATRIX_N - 1; GLF_dead6b >= xpos; GLF_dead6b--) {
                _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6b, 4)] = _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6b, 4)] - (donor_replacementGLF_dead6beta * _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6b, 4)]);
            }
        }
        if (_GLF_DEAD(_GLF_IDENTITY(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)), true && (_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))))) {
            vec2 donor_replacementGLF_dead4pos = _GLF_FUZZED(resolution);
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                if (GLF_dead1b_b <= -0.9 && GLF_dead1b_b >= -1.1) {
                    GLF_dead7_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
                } else {
                    GLF_dead7_GLF_color = vec4(0.0, 1.0, 0.0, 1.0);
                }
            }
            vec3 donor_replacementGLF_dead4setting = _GLF_FUZZED(vec3(-28.86, -0.5, 0.1));
            {
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    vec2 donor_replacementGLF_dead5coord = _GLF_FUZZED(vec2(-6987.4449, -3.8));
                    int donor_replacementGLF_dead5i = _GLF_FUZZED(93792);
                    {
                        donor_replacementGLF_dead5coord = _GLF_color.xz + _GLF_color.yy;
                        donor_replacementGLF_dead5coord = floor(donor_replacementGLF_dead5coord * 256.0) / 256.0;
                        _GLF_color = texture(GLF_dead5tex, donor_replacementGLF_dead5coord);
                        donor_replacementGLF_dead5i++;
                    }
                }
                return GLF_dead4computeColor(donor_replacementGLF_dead4setting.z / (5.0 * float(findMSB(xpos))), donor_replacementGLF_dead4pos);
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                return vec3(1.0, 1.0, 1.0);
            }
        }
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            if (_GLF_DEAD(false)) {
                return vec3(1.0, 1.0, 1.0);
            }
            _GLF_color = vec4(148.419, -524.458, -298.854, 3.2);
            if (_GLF_DEAD(false)) {
                if (GLF_dead4h_r <= -0.9 && GLF_dead4h_r >= -1.1) {
                    GLF_dead7_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
                } else {
                    GLF_dead7_GLF_color = vec4(0.0, 1.0, 0.0, 1.0);
                }
            }
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    return vec3(1.0, 1.0, 1.0);
                }
                _GLF_color = _GLF_outlined_8(_GLF_outVarBackup_GLF_color);
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                float donor_replacementGLF_dead7A = _GLF_FUZZED(distance(GLF_dead4resolution, resolution));
                float donor_replacementGLF_dead7temp = _GLF_FUZZED(mod(GLF_dead1h_r, GLF_dead1b_b));
                float donor_replacementGLF_dead7x1 = _GLF_FUZZED(GLF_dead1time);
                {
                    float GLF_dead7h0 = yCoord - yCoord;
                    float GLF_dead7h1 = donor_replacementGLF_dead7x1 - yCoord;
                    float GLF_dead7k0 = GLF_dead7fx(yCoord) - GLF_dead7fx(yCoord);
                    float GLF_dead7k1 = GLF_dead7fx(donor_replacementGLF_dead7x1) - GLF_dead7fx(yCoord);
                    donor_replacementGLF_dead7temp = yCoord;
                    donor_replacementGLF_dead7A = (((GLF_dead7h1) * (GLF_dead7k0)) - ((GLF_dead7h0) * (GLF_dead7k1))) / ((pow((GLF_dead7h0), 2.0) * (GLF_dead7h1)) - (pow((GLF_dead7h1), 2.0) * (GLF_dead7h0)));
                    GLF_dead1s_g = (((GLF_dead7k0) - (donor_replacementGLF_dead7A * (pow((GLF_dead7h0), 2.0)))) / (GLF_dead7h0));
                    xCoord = GLF_dead7fx(yCoord);
                    yCoord = yCoord - ((2.0 * xCoord) / (GLF_dead1s_g + sign(GLF_dead1s_g) * sqrt(pow(GLF_dead1s_g, 2.0) - (4.0 * donor_replacementGLF_dead7A * xCoord))));
                    yCoord = donor_replacementGLF_dead7x1;
                    donor_replacementGLF_dead7x1 = donor_replacementGLF_dead7temp;
                }
            }
            if (_GLF_DEAD(false)) {
                bool donor_replacementGLF_dead4c7 = _GLF_FUZZED(((ivec2(-94532, 30786) ^ (-77828)) != ivec2(655, 94823)));
                int donor_replacementGLF_dead4msb8 = _GLF_FUZZED(c_re);
                vec2 donor_replacementGLF_dead4pos = _GLF_FUZZED(vec2(-8.0, -34.05));
                vec3 donor_replacementGLF_dead4setting = _GLF_FUZZED((((mat3(589.422, -31.65, 40.72, 826.242, 2042.6066, -4.6, -50.95, 2.7, -5.4) - yCoord)) * vec3(586.885, 531.992, 3476.2414)));
                if (!donor_replacementGLF_dead4c7) {
                    return GLF_dead4computeColor(donor_replacementGLF_dead4setting.z / (5.0 * float(findMSB(donor_replacementGLF_dead4msb8))), donor_replacementGLF_dead4pos);
                }
            }
        }
        return vec3(1.0, 1.0, 1.0);
        if (_GLF_DEAD(false)) {
            int donor_replacementGLF_dead8b = _GLF_FUZZED((~GLF_dead3MATRIX_N));
            vec2 donor_replacementGLF_dead8uv = _GLF_FUZZED(vec2(-7596.7627, 5797.7130));
            {
                donor_replacementGLF_dead8uv.y -= step(GLF_dead8injectionSwitch.y, donor_replacementGLF_dead8uv.x) + float(width) + float(donor_replacementGLF_dead8b) + float(width);
                GLF_dead3MATRIX_N--;
            }
        }
    }
    int c_im = ((ypos - height / 2) * 819) / width;
    if (_GLF_DEAD(false)) {
        vec2 donor_replacementGLF_dead5coord = _GLF_FUZZED((cosh(GLF_dead4h_r) / GLF_dead4resolution));
        while (_GLF_color.x + _GLF_color.y + _GLF_color.z > 1.0 && ypos < 16) {
            donor_replacementGLF_dead5coord = _GLF_color.xz + _GLF_color.yy;
            donor_replacementGLF_dead5coord = floor(donor_replacementGLF_dead5coord * 256.0) / 256.0;
            _GLF_color = texture(GLF_dead5tex, donor_replacementGLF_dead5coord);
            ypos++;
        }
    }
    int x = 0, y = 0;
    int iteration = 0;
    if (_GLF_DEAD(false)) {
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            vec3 donor_replacementGLF_dead1d = _GLF_FUZZED(vec3(-664.294, 2612.7873, 42.42));
            if (length(donor_replacementGLF_dead1d) <= 0.0) {
                ;
            }
        }
        _GLF_color = _GLF_color;
    }
    for (int k = 0; k < 1000; k++) {
        if (_GLF_DEAD(false)) {
            int donor_replacementGLF_dead3a = _GLF_FUZZED(c_im);
            mat4 donor_replacementGLF_dead3matrix_a = _GLF_FUZZED(mat4(mat2x4(-8917.9769, -9560.8480, -26.38, -8492.6618, -5.3, 161.878, -0.1, -145.342)));
            {
                if (_GLF_DEAD(_GLF_IDENTITY(false, bool(bvec2(false, true))))) {
                    break;
                }
                donor_replacementGLF_dead3matrix_a[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead3a, 4)][_GLF_MAKE_IN_BOUNDS_INT(k, 4)] = donor_replacementGLF_dead3matrix_a[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead3a, 4)][_GLF_MAKE_IN_BOUNDS_INT(k, 4)] - (yCoord * _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead3a, 4)]);
                if (_GLF_DEAD(false)) {
                    vec4 donor_replacementGLF_dead6matrix_u = _GLF_FUZZED(_GLF_color);
                    {
                        GLF_dead1b_b += pow(donor_replacementGLF_dead6matrix_u[_GLF_MAKE_IN_BOUNDS_INT(c_re, 4)], 2.0);
                    }
                }
            }
        }
        if (x * x + _GLF_IDENTITY(y * y, 0 + (y * y)) > 262144) {
            if (_GLF_DEAD(false)) {
                {
                    return GLF_dead4defaultColor();
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    continue;
                    if (_GLF_DEAD(false)) {
                        vec2 donor_replacementGLF_dead5coord = _GLF_FUZZED(vec2(-1.5, -53.47));
                        int donor_replacementGLF_dead5i = _GLF_FUZZED(width);
                        {
                            donor_replacementGLF_dead5coord = _GLF_color.xz + _GLF_color.yy;
                            donor_replacementGLF_dead5coord = floor(donor_replacementGLF_dead5coord * 256.0) / 256.0;
                            _GLF_color = texture(GLF_dead5tex, donor_replacementGLF_dead5coord);
                            donor_replacementGLF_dead5i++;
                        }
                    }
                }
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                if (_GLF_DEAD(false)) {
                    float donor_replacementGLF_dead7A = _GLF_FUZZED(dFdxCoarse(-94.74));
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        _GLF_color = _GLF_color;
                    }
                    float donor_replacementGLF_dead7B = _GLF_FUZZED(acosh(GLF_dead1h_r));
                    float donor_replacementGLF_dead7temp = _GLF_FUZZED(GLF_dead1b_b);
                    float donor_replacementGLF_dead7x1 = _GLF_FUZZED(GLF_dead1h_r);
                    while (abs(xCoord - donor_replacementGLF_dead7x1) >= .000000000000001) {
                        float GLF_dead7h0 = xCoord - xCoord;
                        float GLF_dead7h1 = donor_replacementGLF_dead7x1 - xCoord;
                        float GLF_dead7k0 = GLF_dead7fx(xCoord) - GLF_dead7fx(xCoord);
                        float GLF_dead7k1 = GLF_dead7fx(donor_replacementGLF_dead7x1) - GLF_dead7fx(xCoord);
                        donor_replacementGLF_dead7temp = xCoord;
                        donor_replacementGLF_dead7A = (((GLF_dead7h1) * (GLF_dead7k0)) - ((GLF_dead7h0) * (GLF_dead7k1))) / ((pow((GLF_dead7h0), 2.0) * (GLF_dead7h1)) - (pow((GLF_dead7h1), 2.0) * (GLF_dead7h0)));
                        donor_replacementGLF_dead7B = (((GLF_dead7k0) - (donor_replacementGLF_dead7A * (pow((GLF_dead7h0), 2.0)))) / (GLF_dead7h0));
                        GLF_dead4b_b = GLF_dead7fx(xCoord);
                        xCoord = xCoord - ((2.0 * GLF_dead4b_b) / (donor_replacementGLF_dead7B + sign(donor_replacementGLF_dead7B) * sqrt(pow(donor_replacementGLF_dead7B, 2.0) - (4.0 * donor_replacementGLF_dead7A * GLF_dead4b_b))));
                        xCoord = donor_replacementGLF_dead7x1;
                        donor_replacementGLF_dead7x1 = donor_replacementGLF_dead7temp;
                    }
                }
                break;
            }
            break;
            if (_GLF_DEAD(false)) {
                vec2 donor_replacementGLF_dead2coord = _GLF_FUZZED(step(ceil(fwidthCoarse(vec2(-472.695, 229.538))), resolution));
                int donor_replacementGLF_dead2i = _GLF_FUZZED((+k));
                int donor_replacementGLF_dead2j = _GLF_FUZZED(xpos);
                vec4 donor_replacementGLF_dead2res = _GLF_FUZZED(fma(vec4(-3.9, 8444.9491, -1794.6737, 5.5), vec4(-152.118, -8457.5052, 7573.7454, -3517.7473), _GLF_color));
                float donor_replacementGLF_dead2uvstep = _GLF_FUZZED(fract(0.9));
                {
                    if (_GLF_DEAD(false)) {
                        if (GLF_dead4h_r <= -0.9 && GLF_dead4h_r >= -1.1) {
                            GLF_dead7_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
                        } else {
                            GLF_dead7_GLF_color = vec4(0.0, 1.0, 0.0, 1.0);
                        }
                    }
                    donor_replacementGLF_dead2res += texture(GLF_dead2tex, donor_replacementGLF_dead2coord + vec2(float(donor_replacementGLF_dead2i - 1) * donor_replacementGLF_dead2uvstep, float(donor_replacementGLF_dead2j - 1) * donor_replacementGLF_dead2uvstep)) * GLF_dead2weights[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead2i * 3 + donor_replacementGLF_dead2j, 9)];
                }
            }
        }
        {
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                vec2 donor_replacementGLF_dead5coord = _GLF_FUZZED(mat2x3(-5.8, 2.3, 4058.8489, 1.5, 2.2, 23.28)[1].tt);
                while (_GLF_color.x + _GLF_color.y + _GLF_color.z > 1.0 && k < 16) {
                    donor_replacementGLF_dead5coord = _GLF_color.xz + _GLF_color.yy;
                    donor_replacementGLF_dead5coord = floor(donor_replacementGLF_dead5coord * 256.0) / 256.0;
                    _GLF_color = texture(GLF_dead5tex, donor_replacementGLF_dead5coord);
                    k++;
                }
            }
            if (_GLF_DEAD(false)) {
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    _GLF_color = fwidthCoarse(inversesqrt(vec4(-3.9, 6.5, -343.691, 7313.9918)).rrar);
                }
                discard;
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                return vec3(1.0, 1.0, 1.0);
                if (_GLF_DEAD(false)) {
                    break;
                }
            }
            if (_GLF_DEAD(false)) {
                return vec3(1.0, 1.0, 1.0);
                if (_GLF_DEAD(false)) {
                    vec2 donor_replacementGLF_dead5coord = _GLF_FUZZED(fwidthCoarse(injectionSwitch));
                    {
                        donor_replacementGLF_dead5coord = _GLF_color.xz + _GLF_color.yy;
                        donor_replacementGLF_dead5coord = floor(donor_replacementGLF_dead5coord * 256.0) / 256.0;
                        _GLF_color = texture(GLF_dead5tex, donor_replacementGLF_dead5coord);
                        height++;
                    }
                }
            }
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = (vec4(879.497, -6441.1941, 5.8, -3.8) - vec4(_GLF_IDENTITY(6.9, max(6.9, _GLF_IDENTITY(6.9, (6.9) - 0.0))), 5190.9031, -9.0, 74.27));
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                if (_GLF_DEAD(false)) {
                    _GLF_color = (_GLF_color - atan(_GLF_outVarBackup_GLF_color));
                }
                _GLF_color = _GLF_outlined_9(_GLF_outVarBackup_GLF_color);
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = _GLF_outlined_10();
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= log(sqrt(1.0)))))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    return vec3(1.0, 1.0, 1.0);
                }
            }
        }
        if (_GLF_DEAD(false)) {
            vec2 donor_replacementGLF_dead5coord = _GLF_FUZZED(max(GLF_dead4resolution, GLF_dead1b_b));
            int donor_replacementGLF_dead5i = _GLF_FUZZED((height));
            while (_GLF_color.x + _GLF_color.y + _GLF_color.z > 1.0 && donor_replacementGLF_dead5i < 16) {
                donor_replacementGLF_dead5coord = _GLF_color.xz + _GLF_color.yy;
                donor_replacementGLF_dead5coord = floor(donor_replacementGLF_dead5coord * 256.0) / 256.0;
                _GLF_color = texture(GLF_dead5tex, donor_replacementGLF_dead5coord);
                donor_replacementGLF_dead5i++;
            }
        }
        int x_new = ((x * x - y * y) / 256 + c_re);
        y = _GLF_outlined_2(x, y, c_im);
        if (_GLF_DEAD(false)) {
            if (_GLF_DEAD(false)) {
                continue;
            }
            break;
        }
        x = _GLF_outlined_3(x_new);
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
            mat4 donor_replacementGLF_dead6matrix_a = _GLF_FUZZED(mat4(-7.9, 899.022, 676.956, -8836.0716, -5.2, 6.7, -5.9, 826.609, 2.4, 74.73, 8463.6804, 49.78, 2376.1509, -2234.5435, 567.812, 44.42));
            vec4 donor_replacementGLF_dead6matrix_b = _GLF_FUZZED(vec4(771.014, -77.80, 75.78, 40.74).bggb);
            for (int GLF_dead6j = (GLF_dead6MATRIX_N - 1); GLF_dead6j >= (GLF_dead3MATRIX_N + 1); GLF_dead6j--) {
                donor_replacementGLF_dead6matrix_b[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead3MATRIX_N, 4)] -= (donor_replacementGLF_dead6matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead3MATRIX_N, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6j, 4)] * donor_replacementGLF_dead6matrix_b[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6j, 4)]);
            }
        }
        if (_GLF_DEAD(false)) {
            if (_GLF_DEAD(false)) {
                float donor_replacementGLF_dead6alpha2 = _GLF_FUZZED(sinh(GLF_dead1b_b));
                int donor_replacementGLF_dead6j = _GLF_FUZZED(xpos);
                int donor_replacementGLF_dead6k = _GLF_FUZZED((acosh(resolution), ypos));
                mat4 donor_replacementGLF_dead6matrix_a = _GLF_FUZZED(mat4(72.20, -62.30, 9.4, -7575.1266, 2.5, -281.447, 3511.2978, 8017.1713, 29.63, 21.53, 0.3, 74.96, -151.865, -965.982, 8.9, 4987.5035));
                {
                    for (int GLF_dead6a = GLF_dead6MATRIX_N - 1; GLF_dead6a >= donor_replacementGLF_dead6k; GLF_dead6a--) {
                        GLF_dead1b_b += _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6a, 4)] * donor_replacementGLF_dead6matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6a, 4)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead6j, 4)];
                    }
                    yCoord = donor_replacementGLF_dead6alpha2 * GLF_dead1b_b;
                    for (int GLF_dead6a = GLF_dead6MATRIX_N - 1; GLF_dead6a >= donor_replacementGLF_dead6k; GLF_dead6a--) {
                        donor_replacementGLF_dead6matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6a, 4)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead6j, 4)] = donor_replacementGLF_dead6matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6a, 4)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead6j, 4)] - (yCoord * _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6a, 4)]);
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            _GLF_color = mat4(mat4x2(-9.6, -37.96, -7978.5574, 0.8, -3.0, -7914.2860, 2.1, -2.7))[0];
                        }
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < sqrt(0.0))))) {
                        _GLF_color = GLF_dead8gl_FragCoord;
                    }
                    GLF_dead1b_b = 0.0;
                    yCoord = 0.0;
                }
            }
            discard;
        }
        if (_GLF_DEAD(false)) {
            discard;
        }
        if (_GLF_DEAD(false)) {
            return vec3(1.0, 1.0, 1.0);
            if (_GLF_DEAD(false)) {
                bool donor_replacementGLF_dead4c6 = _GLF_FUZZED((145507u < 53721u));
                vec2 donor_replacementGLF_dead4pos = _GLF_FUZZED(resolution);
                vec3 donor_replacementGLF_dead4setting = _GLF_FUZZED(sinh(vec3(-459.647, 220.785, 8.1)));
                if (!donor_replacementGLF_dead4c6) {
                    return GLF_dead4computeColor(donor_replacementGLF_dead4setting.z / (5.0 * float(findMSB(y))), donor_replacementGLF_dead4pos);
                }
            }
        }
        _GLF_IDENTITY(iteration++, (_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)) ? _GLF_FUZZED(findMSB(18659u)) : (iteration++)));
    }
    if (iteration < 1000) {
        if (_GLF_DEAD(_GLF_FALSE(false, (_GLF_IDENTITY(gl_FragCoord, clamp(_GLF_IDENTITY(gl_FragCoord, clamp(gl_FragCoord, gl_FragCoord, gl_FragCoord)), gl_FragCoord, gl_FragCoord)).y < 0.0)))) {
            return vec3(1.0, 1.0, 1.0);
        }
        return pickColor(iteration);
    } else {
        {
            vec4 _GLF_outVarBackup_GLF_color;
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    if (_GLF_DEAD(false)) {
                        if (_GLF_DEAD(false)) {
                            _GLF_color = vec4(-7.5, -9672.2187, -8208.3673, -7292.8669);
                        }
                        mat4 donor_replacementGLF_dead6matrix_a = _GLF_FUZZED((mat4(-7140.3740, -4375.9536, -2281.4244, 9.4, 4.8, 9703.3542, -3.9, 372.341, 0.1, 2682.5801, -0.4, 7035.3007, -5.0, 2.7, 37.17, 204.549) * GLF_dead1time));
                        for (int GLF_dead6i = (GLF_dead6MATRIX_N - 1); GLF_dead6i >= 0; GLF_dead6i--) {
                            for (int GLF_dead6j = (GLF_dead6MATRIX_N - 1); GLF_dead6j >= (GLF_dead6i + 1); GLF_dead6j--) {
                                _GLF_outVarBackup_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6i, 4)] -= (donor_replacementGLF_dead6matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6i, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6j, 4)] * _GLF_outVarBackup_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6j, 4)]);
                            }
                            _GLF_outVarBackup_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6i, 4)] /= donor_replacementGLF_dead6matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6i, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6i, 4)];
                        }
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        return vec3(1.0, 1.0, 1.0);
                    }
                    _GLF_color = vec4(-7.2, 289.406, -6029.8922, -95.94);
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_IDENTITY(true, (true) || false))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                return vec3(1.0, 1.0, 1.0);
            }
            {
                vec4 _GLF_outVarBackup_GLF_color;
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < length(vec2(0.0, 0.0)))))) {
                    float donor_replacementGLF_dead6alpha2 = _GLF_FUZZED(GLF_dead1b_b);
                    int donor_replacementGLF_dead6k = _GLF_FUZZED(sign(c_im));
                    mat4 donor_replacementGLF_dead6matrix_a = _GLF_FUZZED(mat4(2.1, 5.6, 9436.3369, 96.72, 770.651, 60.93, -699.058, 534.937, 8.6, -6.9, 3.0, -416.481, 1963.8138, -1208.2666, -123.541, -3.3));
                    {
                        for (int GLF_dead6x = GLF_dead6MATRIX_N - 1; GLF_dead6x >= donor_replacementGLF_dead6k; GLF_dead6x--) {
                            GLF_dead4b_b += pow(donor_replacementGLF_dead6matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6x, 4)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead6k, 4)], 2.0);
                            _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6x, 4)] = donor_replacementGLF_dead6matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6x, 4)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead6k, 4)];
                        }
                        GLF_dead4b_b = sqrt(GLF_dead4b_b);
                        _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead6k, 4)] -= (sign(_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead6k, 4)]) * GLF_dead4b_b);
                        for (int GLF_dead6u = GLF_dead6MATRIX_N - 1; GLF_dead6u >= donor_replacementGLF_dead6k; GLF_dead6u--) {
                            GLF_dead4h_r += pow(_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6u, 4)], 2.0);
                        }
                        donor_replacementGLF_dead6alpha2 = 2.0 / GLF_dead4h_r;
                        for (int GLF_dead6j = donor_replacementGLF_dead6k; GLF_dead6j < GLF_dead6MATRIX_N; GLF_dead6j++) {
                            for (int GLF_dead6a = GLF_dead6MATRIX_N - 1; GLF_dead6a >= donor_replacementGLF_dead6k; GLF_dead6a--) {
                                GLF_dead4h_r += _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6a, 4)] * donor_replacementGLF_dead6matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6a, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6j, 4)];
                            }
                            GLF_dead4h_r = donor_replacementGLF_dead6alpha2 * GLF_dead4h_r;
                            for (int GLF_dead6a = GLF_dead6MATRIX_N - 1; GLF_dead6a >= donor_replacementGLF_dead6k; GLF_dead6a--) {
                                donor_replacementGLF_dead6matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6a, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6j, 4)] = donor_replacementGLF_dead6matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6a, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6j, 4)] - (GLF_dead4h_r * _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6a, 4)]);
                            }
                            GLF_dead4h_r = 0.0;
                            GLF_dead4h_r = 0.0;
                        }
                        for (int GLF_dead6b = GLF_dead6MATRIX_N - 1; GLF_dead6b >= donor_replacementGLF_dead6k; GLF_dead6b--) {
                            GLF_dead4h_r += _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6b, 4)] * _GLF_outVarBackup_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6b, 4)];
                        }
                        GLF_dead4h_r = donor_replacementGLF_dead6alpha2 * GLF_dead4h_r;
                        for (int GLF_dead6b = GLF_dead6MATRIX_N - 1; GLF_dead6b >= donor_replacementGLF_dead6k; GLF_dead6b--) {
                            _GLF_outVarBackup_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6b, 4)] = _GLF_outVarBackup_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6b, 4)] - (GLF_dead4h_r * _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6b, 4)]);
                        }
                        GLF_dead4b_b = 0.0;
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                            _GLF_color = sign(GLF_dead8gl_FragCoord);
                        }
                        GLF_dead4h_r = 0.0;
                        donor_replacementGLF_dead6alpha2 = 0.0;
                        GLF_dead4h_r = 0.0;
                        GLF_dead4h_r = 0.0;
                    }
                }
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = dFdy(vec4(9.9, 5230.1322, 57.13, 302.969));
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    vec2 donor_replacementGLF_dead2coord = _GLF_FUZZED(cos(injectionSwitch));
                    int donor_replacementGLF_dead2i = _GLF_FUZZED(width);
                    vec4 donor_replacementGLF_dead2res = _GLF_FUZZED(sinh(vec4(390.766, -92.22, 88.90, -85.49)));
                    for (int GLF_dead2j = 0; GLF_dead2j < 3; GLF_dead2j++) {
                        donor_replacementGLF_dead2res += texture(GLF_dead2tex, donor_replacementGLF_dead2coord + vec2(float(donor_replacementGLF_dead2i - 1) * yCoord, float(GLF_dead2j - 1) * yCoord)) * GLF_dead2weights[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead2i * 3 + GLF_dead2j, 9)];
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            vec4 donor_replacementGLF_dead5texel = _GLF_FUZZED(atanh(_GLF_outVarBackup_GLF_color));
                            while (donor_replacementGLF_dead5texel.x + donor_replacementGLF_dead5texel.y + donor_replacementGLF_dead5texel.z > 1.0 && GLF_dead3MATRIX_N < 16) {
                                donor_replacementGLF_dead2coord = donor_replacementGLF_dead5texel.xz + donor_replacementGLF_dead5texel.yy;
                                donor_replacementGLF_dead2coord = floor(donor_replacementGLF_dead2coord * 256.0) / 256.0;
                                donor_replacementGLF_dead5texel = texture(GLF_dead5tex, donor_replacementGLF_dead2coord);
                                GLF_dead3MATRIX_N++;
                            }
                        }
                    }
                }
            }
            if (_GLF_DEAD(false)) {
                return vec3(1.0, 1.0, 1.0);
            }
            _GLF_outVarBackup_GLF_color = _GLF_color;
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                return vec3(1.0, 1.0, 1.0);
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < sqrt(0.0))))) {
                {
                    return GLF_dead1defaultColor();
                }
            }
            _GLF_color = atan(vec4(0.7, 151.092, 6.8, 8593.4058), vec4(-1775.9436, -69.04, 38.73, -210.223));
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                mat4 donor_replacementGLF_dead6matrix_a = _GLF_FUZZED(mat4(8263.6063, 6.9, -3538.0982, 1726.5153, -11.22, -4.2, -92.51, -49.67, -9413.5480, -1712.1185, 7.1, -1.5, 5919.2173, 5267.0416, -5.1, 19.90));
                for (int GLF_dead6i = (GLF_dead6MATRIX_N - 1); GLF_dead6i >= 0; GLF_dead6i--) {
                    for (int GLF_dead6j = (GLF_dead6MATRIX_N - 1); GLF_dead6j >= (GLF_dead6i + 1); GLF_dead6j--) {
                        _GLF_outVarBackup_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6i, 4)] -= (donor_replacementGLF_dead6matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6i, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6j, 4)] * _GLF_outVarBackup_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6j, 4)]);
                    }
                    _GLF_outVarBackup_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6i, 4)] /= donor_replacementGLF_dead6matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6i, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6i, 4)];
                }
            }
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
                if (_GLF_DEAD(false)) {
                    float donor_replacementGLF_dead7temp = _GLF_FUZZED(4.5);
                    {
                        float GLF_dead7h0 = GLF_dead1h_r - GLF_dead1h_r;
                        float GLF_dead7h1 = yCoord - GLF_dead1h_r;
                        float GLF_dead7k0 = GLF_dead7fx(GLF_dead1h_r) - GLF_dead7fx(GLF_dead1h_r);
                        float GLF_dead7k1 = GLF_dead7fx(yCoord) - GLF_dead7fx(GLF_dead1h_r);
                        if (_GLF_DEAD(false)) {
                            _GLF_color = (GLF_dead8gl_FragCoord * GLF_dead8gl_FragCoord);
                        }
                        donor_replacementGLF_dead7temp = GLF_dead1h_r;
                        GLF_dead4s_g = (((GLF_dead7h1) * (GLF_dead7k0)) - ((GLF_dead7h0) * (GLF_dead7k1))) / ((pow((GLF_dead7h0), 2.0) * (GLF_dead7h1)) - (pow((GLF_dead7h1), 2.0) * (GLF_dead7h0)));
                        GLF_dead1b_b = (((GLF_dead7k0) - (GLF_dead4s_g * (pow((GLF_dead7h0), 2.0)))) / (GLF_dead7h0));
                        GLF_dead4b_b = GLF_dead7fx(GLF_dead1h_r);
                        GLF_dead1h_r = GLF_dead1h_r - ((2.0 * GLF_dead4b_b) / (GLF_dead1b_b + sign(GLF_dead1b_b) * sqrt(pow(GLF_dead1b_b, 2.0) - (4.0 * GLF_dead4s_g * GLF_dead4b_b))));
                        GLF_dead1h_r = yCoord;
                        yCoord = donor_replacementGLF_dead7temp;
                        if (_GLF_DEAD(false)) {
                            _GLF_color = vec4(-9477.2314, 5.0, -260.292, -83.95);
                        }
                    }
                }
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                bool donor_replacementGLF_dead1c5 = _GLF_FUZZED(true);
                vec2 donor_replacementGLF_dead1pos = _GLF_FUZZED(step(resolution, vec2(-8414.2003, 1.0)));
                if (_GLF_DEAD(false)) {
                    _GLF_color = _GLF_color;
                }
                if (_GLF_DEAD(false)) {
                    float donor_replacementGLF_dead7C = _GLF_FUZZED((GLF_dead1s_g + GLF_dead1time));
                    float donor_replacementGLF_dead7temp = _GLF_FUZZED(max(GLF_dead1b_b, exp(GLF_dead4s_g)));
                    float donor_replacementGLF_dead7x2 = _GLF_FUZZED(float(height));
                    while (abs(donor_replacementGLF_dead7x2 - xCoord) >= .000000000000001) {
                        float GLF_dead7h0 = GLF_dead4s_g - donor_replacementGLF_dead7x2;
                        float GLF_dead7h1 = xCoord - donor_replacementGLF_dead7x2;
                        float GLF_dead7k0 = GLF_dead7fx(GLF_dead4s_g) - GLF_dead7fx(donor_replacementGLF_dead7x2);
                        float GLF_dead7k1 = GLF_dead7fx(xCoord) - GLF_dead7fx(donor_replacementGLF_dead7x2);
                        donor_replacementGLF_dead7temp = donor_replacementGLF_dead7x2;
                        GLF_dead1b_b = (((GLF_dead7h1) * (GLF_dead7k0)) - ((GLF_dead7h0) * (GLF_dead7k1))) / ((pow((GLF_dead7h0), 2.0) * (GLF_dead7h1)) - (pow((GLF_dead7h1), 2.0) * (GLF_dead7h0)));
                        GLF_dead1s_g = (((GLF_dead7k0) - (GLF_dead1b_b * (pow((GLF_dead7h0), 2.0)))) / (GLF_dead7h0));
                        donor_replacementGLF_dead7C = GLF_dead7fx(donor_replacementGLF_dead7x2);
                        donor_replacementGLF_dead7x2 = donor_replacementGLF_dead7x2 - ((2.0 * donor_replacementGLF_dead7C) / (GLF_dead1s_g + sign(GLF_dead1s_g) * sqrt(pow(GLF_dead1s_g, 2.0) - (4.0 * GLF_dead1b_b * donor_replacementGLF_dead7C))));
                        GLF_dead4s_g = xCoord;
                        xCoord = donor_replacementGLF_dead7temp;
                    }
                }
                vec3 donor_replacementGLF_dead1setting = _GLF_FUZZED((vec3(5726.4527, 37.09, 28.43)));
                if (!donor_replacementGLF_dead1c5) {
                    return GLF_dead1computeColor(donor_replacementGLF_dead1setting.z / 40.0, donor_replacementGLF_dead1pos);
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        return vec3(1.0, 1.0, 1.0);
                    }
                }
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                return vec3(1.0, 1.0, 1.0);
            }
        }
        return vec3(0.0, 0.0, 0.5);
    }
}

vec4 _GLF_outlined_0() {
    return vec4(591.323, 72.81, 8.3, 15.30);
}

vec4 _GLF_outlined_11(vec4 _GLF_outVarBackup_GLF_color) {
    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
        {
            GLF_dead7_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
        }
    }
    if (_GLF_DEAD(false)) {
        _GLF_color = mix(GLF_dead8gl_FragCoord, _GLF_outVarBackup_GLF_color, vec4(3.4, -64.83, 2335.9710, 778.687));
    }
    return _GLF_outVarBackup_GLF_color;
}

vec4 _GLF_outlined_1(vec3 sum) {
    if (_GLF_DEAD(false)) {
        return vec4(1.0, 1.0, 1.0, 1.0);
    }
    {
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        if (_GLF_DEAD(false)) {
            return vec4(1.0, 1.0, 1.0, 1.0);
        }
        _GLF_color = vec4(-732.952, 33.45, 196.033, 8.3);
        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
            _GLF_color = _GLF_outlined_11(_GLF_outVarBackup_GLF_color);
            if (_GLF_DEAD(false)) {
                return vec4(1.0, 1.0, 1.0, 1.0);
            }
        }
    }
    return vec4(sum, 1.0);
}

vec4 _GLF_outlined_4(vec4 _GLF_outVarBackup_GLF_color) {
    return _GLF_outVarBackup_GLF_color;
}

vec4 _GLF_outlined_12() {
    return vec4(-1485.9660, -5.6, -81.34, 0.8);
}

vec4 _GLF_outlined_13() {
    return mat3x4(mat4(0.3, -8.9, -13.38, 54.66, -67.07, 74.58, 6.1, -6.2, -927.742, 0.5, 7226.8496, 5.1, -64.76, 66.91, 47.92, -76.89))[0];
}

vec4 _GLF_outlined_14(vec4 _GLF_outVarBackup_GLF_color) {
    return _GLF_outVarBackup_GLF_color;
}

float _GLF_outlined_15() {
    return 0.0;
}

vec4 _GLF_outlined_16() {
    return vec4(-10.37, 6044.2378, 532.218, 6273.8420);
}

vec4 _GLF_outlined_17(vec4 _GLF_color) {
    if (_GLF_DEAD(false)) {
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            float donor_replacementGLF_dead7A = _GLF_FUZZED(vec3(-7.0, -2.4, 0.3)[1]);
            float donor_replacementGLF_dead7C = _GLF_FUZZED(-8147.1711);
            float donor_replacementGLF_dead7x0 = _GLF_FUZZED(dFdy(GLF_dead4h_r));
            float donor_replacementGLF_dead7x1 = _GLF_FUZZED(8.3);
            while (abs(GLF_dead1s_g - donor_replacementGLF_dead7x1) >= .000000000000001) {
                float GLF_dead7h0 = donor_replacementGLF_dead7x0 - GLF_dead1s_g;
                float GLF_dead7h1 = donor_replacementGLF_dead7x1 - GLF_dead1s_g;
                float GLF_dead7k0 = GLF_dead7fx(donor_replacementGLF_dead7x0) - GLF_dead7fx(GLF_dead1s_g);
                float GLF_dead7k1 = GLF_dead7fx(donor_replacementGLF_dead7x1) - GLF_dead7fx(GLF_dead1s_g);
                GLF_dead4b_b = GLF_dead1s_g;
                donor_replacementGLF_dead7A = (((GLF_dead7h1) * (GLF_dead7k0)) - ((GLF_dead7h0) * (GLF_dead7k1))) / ((pow((GLF_dead7h0), 2.0) * (GLF_dead7h1)) - (pow((GLF_dead7h1), 2.0) * (GLF_dead7h0)));
                GLF_dead4h_r = (((GLF_dead7k0) - (donor_replacementGLF_dead7A * (pow((GLF_dead7h0), 2.0)))) / (GLF_dead7h0));
                donor_replacementGLF_dead7C = GLF_dead7fx(GLF_dead1s_g);
                GLF_dead1s_g = GLF_dead1s_g - ((2.0 * donor_replacementGLF_dead7C) / (GLF_dead4h_r + sign(GLF_dead4h_r) * sqrt(pow(GLF_dead4h_r, 2.0) - (4.0 * donor_replacementGLF_dead7A * donor_replacementGLF_dead7C))));
                donor_replacementGLF_dead7x0 = donor_replacementGLF_dead7x1;
                donor_replacementGLF_dead7x1 = GLF_dead4b_b;
            }
        }
        return vec4(1.0, 1.0, 1.0, 1.0);
    }
    return (false ? vec4(-81.22, 8176.0979, 7343.4628, 6.0) : _GLF_color);
}

void main() {
    vec3 data[16];
    for (int i = 0; i < 4; i++) {
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            vec2 donor_replacementGLF_dead2coord = _GLF_FUZZED((sign(vec2(-523.544, 3.4)) + pow((-3.8), -4.4)));
            float donor_replacementGLF_dead2uvstep = _GLF_FUZZED(dot(_GLF_color, (+_GLF_color)));
            for (int GLF_dead2j = 0; GLF_dead2j < 3; GLF_dead2j++) {
                _GLF_color += texture(GLF_dead2tex, donor_replacementGLF_dead2coord + vec2(float(i - 1) * donor_replacementGLF_dead2uvstep, float(GLF_dead2j - 1) * donor_replacementGLF_dead2uvstep)) * GLF_dead2weights[_GLF_MAKE_IN_BOUNDS_INT(i * 3 + GLF_dead2j, 9)];
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < abs(0.0))))) {
                return;
            }
        }
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = _GLF_outlined_12();
            if (_GLF_DEAD(false)) {
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
                vec2 donor_replacementGLF_dead5coord = _GLF_FUZZED(injectionSwitch);
                vec4 donor_replacementGLF_dead5texel = _GLF_FUZZED(dFdyFine(step(GLF_dead4h_r, _GLF_outVarBackup_GLF_color)));
                while (donor_replacementGLF_dead5texel.x + donor_replacementGLF_dead5texel.y + donor_replacementGLF_dead5texel.z > 1.0 && i < 16) {
                    donor_replacementGLF_dead5coord = donor_replacementGLF_dead5texel.xz + donor_replacementGLF_dead5texel.yy;
                    donor_replacementGLF_dead5coord = floor(donor_replacementGLF_dead5coord * 256.0) / 256.0;
                    donor_replacementGLF_dead5texel = texture(GLF_dead5tex, donor_replacementGLF_dead5coord);
                    i++;
                }
            }
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                if (_GLF_DEAD(false)) {
                    vec2 donor_replacementGLF_dead1position = _GLF_FUZZED(vec2(-1.1, 9.9));
                    if (abs(donor_replacementGLF_dead1position.y - donor_replacementGLF_dead1position.x) < 0.5) {
                        GLF_dead1b_b = clamp(0.0, 1.0, GLF_dead1b_b * 3.0);
                    }
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    continue;
                }
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
        for (int j = _GLF_IDENTITY(0, clamp(0, 0, 0)); j < 4; j++) {
            data[4 * j + i] = mand(gl_FragCoord.x + float(i - 1), gl_FragCoord.y + _GLF_IDENTITY(float(j - 1), mix(float(_GLF_FUZZED(3.7)), float(float(j - 1)), bool(true))));
            if (_GLF_DEAD(_GLF_IDENTITY(false, !(!(false))))) {
                float donor_replacementGLF_dead2beta = _GLF_FUZZED(dot(7201.8719, -6.4));
                if (_GLF_DEAD(false)) {
                    {
                        if (_GLF_DEAD(false)) {
                            _GLF_color = vec4(-0.0, 316.055, -9.7, -0.8);
                        }
                        ;
                        if (_GLF_DEAD(false)) {
                            return;
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            float donor_replacementGLF_dead6alpha1 = _GLF_FUZZED(round(GLF_dead1s_g));
                            vec4 donor_replacementGLF_dead6matrix_u = _GLF_FUZZED(intBitsToFloat(ivec4(47455, -30358, 7741, -85652)));
                            int donor_replacementGLF_dead6u = _GLF_FUZZED((int(false) + j));
                            {
                                donor_replacementGLF_dead6alpha1 += pow(donor_replacementGLF_dead6matrix_u[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead6u, 4)], 2.0);
                            }
                        }
                    }
                }
                if (_GLF_DEAD(false)) {
                    vec2 donor_replacementGLF_dead5coord = _GLF_FUZZED(vec2(-5.7, -5.4));
                    vec4 donor_replacementGLF_dead5texel = _GLF_FUZZED(vec4(-693.095, -719.606, -3053.6098, 4.2));
                    {
                        donor_replacementGLF_dead5coord = donor_replacementGLF_dead5texel.xz + donor_replacementGLF_dead5texel.yy;
                        donor_replacementGLF_dead5coord = floor(donor_replacementGLF_dead5coord * 256.0) / 256.0;
                        donor_replacementGLF_dead5texel = texture(GLF_dead5tex, donor_replacementGLF_dead5coord);
                        j++;
                    }
                }
                vec4 donor_replacementGLF_dead2matrix_u = _GLF_FUZZED((mat4(37.70, -35.13, -3385.6607, 958.718, -4.9, -65.26, 5084.7609, 16.28, 70.14, -62.68, -760.966, 0.8, 6.4, 118.207, -657.102, 58.97) * vec4(2.3, 5222.3459, -82.50, 3654.9332)));
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    vec2 donor_replacementGLF_dead2coord = _GLF_FUZZED(resolution);
                    float donor_replacementGLF_dead2uvstep = _GLF_FUZZED(exp(donor_replacementGLF_dead2beta));
                    for (int GLF_dead2i = 0; GLF_dead2i < 3; GLF_dead2i++) {
                        for (int GLF_dead2j = 0; GLF_dead2j < 3; GLF_dead2j++) {
                            donor_replacementGLF_dead2matrix_u += texture(GLF_dead2tex, donor_replacementGLF_dead2coord + vec2(float(GLF_dead2i - 1) * donor_replacementGLF_dead2uvstep, float(GLF_dead2j - 1) * donor_replacementGLF_dead2uvstep)) * GLF_dead2weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead2i * 3 + GLF_dead2j, 9)];
                        }
                    }
                }
                if (_GLF_DEAD(false)) {
                    {
                        GLF_dead7_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
                    }
                }
                {
                    if (_GLF_DEAD(false)) {
                        continue;
                    }
                    _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(j, 4)] = _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(j, 4)] - (donor_replacementGLF_dead2beta * donor_replacementGLF_dead2matrix_u[_GLF_MAKE_IN_BOUNDS_INT(j, 4)]);
                }
                if (_GLF_DEAD(false)) {
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        float donor_replacementGLF_dead3alpha3 = _GLF_FUZZED(atanh(198.346));
                        int donor_replacementGLF_dead3j = _GLF_FUZZED(i);
                        mat4 donor_replacementGLF_dead3matrix_a = _GLF_FUZZED(mat4(-9747.4854, 21.45, -4.7, -30.43, 4.3, -3.5, -7.9, 216.344, -421.824, -199.674, -1.5, 5373.7074, 3.5, 6.7, 3.4, -80.98));
                        {
                            donor_replacementGLF_dead3alpha3 += _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(j, 4)] * donor_replacementGLF_dead3matrix_a[_GLF_MAKE_IN_BOUNDS_INT(j, 4)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead3j, 4)];
                        }
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        return;
                    }
                    _GLF_color = atan(donor_replacementGLF_dead2matrix_u, (mat2x4(-488.349, 4.2, 96.50, 8.7, -134.629, 9920.7679, 58.83, -7.1) * resolution));
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        vec2 donor_replacementGLF_dead5coord = _GLF_FUZZED(refract(vec2(-6.6, 7.1), vec2(-760.843, 5.7), GLF_dead4b_b));
                        int donor_replacementGLF_dead5i = _GLF_FUZZED(GLF_dead3MATRIX_N);
                        vec4 donor_replacementGLF_dead5texel = _GLF_FUZZED(donor_replacementGLF_dead2matrix_u);
                        {
                            donor_replacementGLF_dead5coord = donor_replacementGLF_dead5texel.xz + donor_replacementGLF_dead5texel.yy;
                            donor_replacementGLF_dead5coord = floor(donor_replacementGLF_dead5coord * 256.0) / 256.0;
                            donor_replacementGLF_dead5texel = texture(GLF_dead5tex, donor_replacementGLF_dead5coord);
                            donor_replacementGLF_dead5i++;
                        }
                    }
                }
                if (_GLF_DEAD(false)) {
                    vec2 donor_replacementGLF_dead5coord = _GLF_FUZZED(fwidth(resolution));
                    int donor_replacementGLF_dead5i = _GLF_FUZZED(GLF_dead3MATRIX_N);
                    while (_GLF_color.x + _GLF_color.y + _GLF_color.z > 1.0 && donor_replacementGLF_dead5i < 16) {
                        if (_GLF_DEAD(false)) {
                            _GLF_color = refract(GLF_dead7_GLF_color, _GLF_color, GLF_dead1b_b);
                        }
                        donor_replacementGLF_dead5coord = _GLF_color.xz + _GLF_color.yy;
                        donor_replacementGLF_dead5coord = floor(donor_replacementGLF_dead5coord * 256.0) / 256.0;
                        _GLF_color = texture(GLF_dead5tex, donor_replacementGLF_dead5coord);
                        donor_replacementGLF_dead5i++;
                    }
                }
            }
            if (_GLF_DEAD(false)) {
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        bool donor_replacementGLF_dead4c2 = _GLF_FUZZED(true);
                        if (!donor_replacementGLF_dead4c2) {
                            ;
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        int donor_replacementGLF_dead6i = _GLF_FUZZED(ivec3(57006, 37403, 8842).p);
                        mat4 donor_replacementGLF_dead6matrix_a = _GLF_FUZZED(mat4(8.0, -5822.3759, 4.4, 7.8, 97.02, 2.1, -1098.8303, 468.694, -9450.2816, -6841.2426, 7127.0686, 632.163, 7267.8753, 1607.1743, 8358.6267, -337.527));
                        {
                            _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead6i, 4)] -= (donor_replacementGLF_dead6matrix_a[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead6i, 4)][_GLF_MAKE_IN_BOUNDS_INT(i, 4)] * _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(i, 4)]);
                        }
                    }
                    break;
                }
                continue;
            }
        }
    }
    vec3 sum = vec3(0.0);
    if (_GLF_DEAD(false)) {
        _GLF_color = _GLF_color;
    }
    if (_GLF_DEAD(false)) {
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            if (_GLF_DEAD(false)) {
                mat4 donor_replacementGLF_dead6matrix_a = _GLF_FUZZED(mat4(30.74, 8172.8934, 12.97, -0.4, 1.1, 3683.9454, -312.920, -6731.1514, 67.56, -74.99, -97.98, 40.83, 8.8, -482.622, 0.2, -7.5));
                {
                    _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead3MATRIX_N, 4)] -= (donor_replacementGLF_dead6matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead3MATRIX_N, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead3MATRIX_N, 4)] * _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead3MATRIX_N, 4)]);
                }
            }
            return;
            if (_GLF_DEAD(false)) {
                {
                    discard;
                }
            }
        }
        return;
        if (_GLF_DEAD(false)) {
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                vec2 donor_replacementGLF_dead2coord = _GLF_FUZZED(sqrt(injectionSwitch));
                int donor_replacementGLF_dead2i = _GLF_FUZZED(int(89959u));
                vec4 donor_replacementGLF_dead2res = _GLF_FUZZED(clamp(vec4(-1.5, 5.3, 160.729, 47.47), _GLF_color, _GLF_color));
                float donor_replacementGLF_dead2uvstep = _GLF_FUZZED(-4430.7132);
                for (int GLF_dead2j = 0; GLF_dead2j < 3; GLF_dead2j++) {
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        discard;
                    }
                    donor_replacementGLF_dead2res += texture(GLF_dead2tex, donor_replacementGLF_dead2coord + vec2(float(donor_replacementGLF_dead2i - 1) * donor_replacementGLF_dead2uvstep, float(GLF_dead2j - 1) * donor_replacementGLF_dead2uvstep)) * GLF_dead2weights[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead2i * 3 + GLF_dead2j, 9)];
                }
                if (_GLF_DEAD(false)) {
                    _GLF_color = clamp(vec4(21.19, 1813.3276, -87.90, -4.1), vec4(33.52, -2753.6444, -0.9, -18.13), GLF_dead7_GLF_color);
                }
            }
            return;
            if (_GLF_DEAD(false)) {
                _GLF_color = GLF_dead7_GLF_color;
            }
        }
    }
    if (_GLF_DEAD(false)) {
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            vec2 donor_replacementGLF_dead5coord = _GLF_FUZZED(GLF_dead4resolution);
            while (_GLF_color.x + _GLF_color.y + _GLF_color.z > 1.0 && GLF_dead3MATRIX_N < 16) {
                donor_replacementGLF_dead5coord = _GLF_color.xz + _GLF_color.yy;
                donor_replacementGLF_dead5coord = floor(donor_replacementGLF_dead5coord * 256.0) / 256.0;
                _GLF_color = texture(GLF_dead5tex, donor_replacementGLF_dead5coord);
                GLF_dead3MATRIX_N++;
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    _GLF_color = floor(GLF_dead7_GLF_color);
                }
            }
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            return;
        }
        bool donor_replacementGLF_dead1c1 = _GLF_FUZZED(true);
        if (!donor_replacementGLF_dead1c1) {
            ;
            if (_GLF_DEAD(false)) {
                return;
            }
            if (_GLF_DEAD(false)) {
                float donor_replacementGLF_dead7A = _GLF_FUZZED(GLF_dead4b_b);
                float donor_replacementGLF_dead7B = _GLF_FUZZED(GLF_dead4time);
                float donor_replacementGLF_dead7C = _GLF_FUZZED((GLF_dead1time - 5.2));
                float donor_replacementGLF_dead7x1 = _GLF_FUZZED(GLF_dead1b_b);
                while (abs(GLF_dead4h_r - donor_replacementGLF_dead7x1) >= .000000000000001) {
                    float GLF_dead7h0 = GLF_dead4s_g - GLF_dead4h_r;
                    float GLF_dead7h1 = donor_replacementGLF_dead7x1 - GLF_dead4h_r;
                    float GLF_dead7k0 = GLF_dead7fx(GLF_dead4s_g) - GLF_dead7fx(GLF_dead4h_r);
                    float GLF_dead7k1 = GLF_dead7fx(donor_replacementGLF_dead7x1) - GLF_dead7fx(GLF_dead4h_r);
                    GLF_dead1b_b = GLF_dead4h_r;
                    donor_replacementGLF_dead7A = (((GLF_dead7h1) * (GLF_dead7k0)) - ((GLF_dead7h0) * (GLF_dead7k1))) / ((pow((GLF_dead7h0), 2.0) * (GLF_dead7h1)) - (pow((GLF_dead7h1), 2.0) * (GLF_dead7h0)));
                    donor_replacementGLF_dead7B = (((GLF_dead7k0) - (donor_replacementGLF_dead7A * (pow((GLF_dead7h0), 2.0)))) / (GLF_dead7h0));
                    donor_replacementGLF_dead7C = GLF_dead7fx(GLF_dead4h_r);
                    GLF_dead4h_r = GLF_dead4h_r - ((2.0 * donor_replacementGLF_dead7C) / (donor_replacementGLF_dead7B + sign(donor_replacementGLF_dead7B) * sqrt(pow(donor_replacementGLF_dead7B, 2.0) - (4.0 * donor_replacementGLF_dead7A * donor_replacementGLF_dead7C))));
                    GLF_dead4s_g = donor_replacementGLF_dead7x1;
                    donor_replacementGLF_dead7x1 = GLF_dead1b_b;
                }
            }
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            if (GLF_dead1b_b <= -0.9 && GLF_dead1b_b >= -1.1) {
                GLF_dead7_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
            } else {
                GLF_dead7_GLF_color = vec4(0.0, 1.0, 0.0, 1.0);
            }
        }
    }
    for (int i = 0; i < 16; i++) {
        sum += data[i];
        if (_GLF_DEAD(false)) {
            vec2 donor_replacementGLF_dead4pos = _GLF_FUZZED(tanh(fma(fwidthFine(resolution), resolution, vec2(-82.99, 1345.2048))));
            if (_GLF_DEAD(false)) {
                return;
            }
            vec3 donor_replacementGLF_dead4setting = _GLF_FUZZED(vec3(6456.9578, 6.1, -7.5));
            if (_GLF_DEAD(false)) {
                break;
            }
            {
                ;
            }
        }
    }
    sum /= vec3(16.0);
    if (_GLF_DEAD(false)) {
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = (6.1 / vec4(-4.3, -813.618, -416.723, -7.0));
            if (_GLF_DEAD(false)) {
                return;
            }
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                if (_GLF_DEAD(false)) {
                    int donor_replacementGLF_dead6b = _GLF_FUZZED(GLF_dead3MATRIX_N);
                    {
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            _GLF_color = GLF_dead7_GLF_color;
                        }
                        GLF_dead1h_r += _GLF_outVarBackup_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead6b, 4)] * _GLF_outVarBackup_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead6b, 4)];
                    }
                }
                _GLF_color = _GLF_outVarBackup_GLF_color;
            }
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            int donor_replacementGLF_dead0i = _GLF_FUZZED(27390);
            if (sum[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead0i, 3)] >= 1.0) {
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    return;
                    if (_GLF_DEAD(false)) {
                        vec4 donor_replacementGLF_dead6matrix_u = _GLF_FUZZED(vec4(-21.58, 93.07, -5.5, 5.7));
                        {
                            GLF_dead1b_b += donor_replacementGLF_dead6matrix_u[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead0i, 4)] * _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead0i, 4)];
                        }
                    }
                }
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = _GLF_outlined_13();
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                        if (_GLF_DEAD(false)) {
                            vec2 donor_replacementGLF_dead1pos = _GLF_FUZZED(resolution);
                            vec3 donor_replacementGLF_dead1setting = _GLF_FUZZED(sum);
                            {
                                ;
                            }
                        }
                    }
                }
                {
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        _GLF_color = dFdy(_GLF_color);
                    }
                    {
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < determinant(mat4(length(vec3(0.0, 0.0, 0.0)), 0.0, log(1.0), 0.0, 0.0, 0.0, tan(0.0), 0.0, 0.0, 0.0, 0.0, 0.0, _GLF_IDENTITY(dot(vec2(1.0, 1.0), vec2(0.0, 0.0)), dot(vec2(1.0, 1.0), vec2(0.0, 0.0))), determinant(mat3(0.0, 1.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0)), 0.0, 0.0)))))) {
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                vec2 donor_replacementGLF_dead5coord = _GLF_FUZZED(log2(step(injectionSwitch, injectionSwitch)));
                                int donor_replacementGLF_dead5i = _GLF_FUZZED(-62337);
                                {
                                    donor_replacementGLF_dead5coord = _GLF_color.xz + _GLF_color.yy;
                                    donor_replacementGLF_dead5coord = floor(donor_replacementGLF_dead5coord * 256.0) / 256.0;
                                    _GLF_color = texture(GLF_dead5tex, donor_replacementGLF_dead5coord);
                                    donor_replacementGLF_dead5i++;
                                }
                            }
                            return;
                        }
                        if (_GLF_DEAD(false)) {
                            int donor_replacementGLF_dead8r = _GLF_FUZZED(findLSB(71315u));
                            {
                                donor_replacementGLF_dead8r = donor_replacementGLF_dead0i - 1;
                            }
                        }
                        vec4 _GLF_outVarBackup_GLF_color;
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = smoothstep(vec4(-781.485, 8.5, 7168.6106, 48.05).x, dot(vec4(8577.0858, 77.23, 7.8, 816.942), vec4(-1.5, 2616.0125, -4553.4668, 117.055)), sinh(vec4(-134.810, 1390.0888, 8969.1922, -69.04)));
                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                            if (_GLF_DEAD(false)) {
                                {
                                    GLF_dead7_GLF_color = vec4(0.0, 1.0, 0.0, 1.0);
                                }
                            }
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            _GLF_color = vec4(GLF_dead1b_b, GLF_dead1h_r, GLF_dead4resolution);
                        }
                        if (_GLF_DEAD(false)) {
                            int donor_replacementGLF_dead6i = _GLF_FUZZED(donor_replacementGLF_dead0i);
                            int donor_replacementGLF_dead6j = _GLF_FUZZED(92076);
                            mat4 donor_replacementGLF_dead6matrix_a = _GLF_FUZZED((mat4(9.5, -289.307, 3663.3632, 8372.8710, -4.3, 749.298, 9.4, -7929.2651, 43.88, 718.736, 9.3, 7633.3855, 39.55, 210.636, 9502.7903, 4.8) + mat4(2627.1083, -99.18, 0.6, -74.89, -81.70, -9160.6074, 56.00, 0.5, -6016.1157, -9.2, 118.053, 4478.7783, 6.3, -44.36, -6.4, -776.422)));
                            vec4 donor_replacementGLF_dead6matrix_b = _GLF_FUZZED(intBitsToFloat(ivec4(-28814, 87932, -84151, -73618)));
                            {
                                donor_replacementGLF_dead6matrix_b[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead6i, 4)] -= (donor_replacementGLF_dead6matrix_a[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead6i, 4)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead6j, 4)] * donor_replacementGLF_dead6matrix_b[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead6j, 4)]);
                            }
                        }
                    }
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = _GLF_outlined_0();
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= length(log(vec4(1.0, 1.0, 1.0, 1.0))))))) {
                        _GLF_color = _GLF_outlined_14(_GLF_outVarBackup_GLF_color);
                        if (_GLF_DEAD(false)) {
                            vec2 donor_replacementGLF_dead5coord = _GLF_FUZZED(exp(vec2(-18.72, 21.14)));
                            int donor_replacementGLF_dead5i = _GLF_FUZZED(GLF_dead3MATRIX_N);
                            while (_GLF_color.x + _GLF_color.y + _GLF_color.z > 1.0 && donor_replacementGLF_dead5i < 16) {
                                donor_replacementGLF_dead5coord = _GLF_color.xz + _GLF_color.yy;
                                donor_replacementGLF_dead5coord = floor(donor_replacementGLF_dead5coord * 256.0) / 256.0;
                                _GLF_color = texture(GLF_dead5tex, donor_replacementGLF_dead5coord);
                                donor_replacementGLF_dead5i++;
                            }
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        vec2 donor_replacementGLF_dead5coord = _GLF_FUZZED(GLF_dead4resolution);
                        {
                            donor_replacementGLF_dead5coord = _GLF_outVarBackup_GLF_color.xz + _GLF_outVarBackup_GLF_color.yy;
                            donor_replacementGLF_dead5coord = floor(donor_replacementGLF_dead5coord * 256.0) / 256.0;
                            _GLF_outVarBackup_GLF_color = texture(GLF_dead5tex, donor_replacementGLF_dead5coord);
                            donor_replacementGLF_dead0i++;
                        }
                    }
                }
                if (_GLF_DEAD(false)) {
                    if (_GLF_DEAD(false)) {
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < determinant(mat4(0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 1.0, 0.0)))))) {
                            float donor_replacementGLF_dead7C = _GLF_FUZZED(dot((vec3(90.53, 2.1, -2.2) * mat2x3(-3858.5073, -3.2, 70.32, -2.0, 37.51, -8332.0538)), clamp(vec2(4612.1816, 2871.7652), injectionSwitch, resolution)));
                            float donor_replacementGLF_dead7temp = _GLF_FUZZED((GLF_dead1b_b / GLF_dead1b_b));
                            float donor_replacementGLF_dead7x1 = _GLF_FUZZED(inversesqrt(length(vec4(1.8, 9449.7002, 47.83, 46.16))));
                            while (abs(GLF_dead4s_g - donor_replacementGLF_dead7x1) >= .000000000000001) {
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = GLF_dead8gl_FragCoord;
                                }
                                float GLF_dead7h0 = GLF_dead1h_r - GLF_dead4s_g;
                                float GLF_dead7h1 = donor_replacementGLF_dead7x1 - GLF_dead4s_g;
                                float GLF_dead7k0 = GLF_dead7fx(GLF_dead1h_r) - GLF_dead7fx(GLF_dead4s_g);
                                float GLF_dead7k1 = GLF_dead7fx(donor_replacementGLF_dead7x1) - GLF_dead7fx(GLF_dead4s_g);
                                donor_replacementGLF_dead7temp = GLF_dead4s_g;
                                GLF_dead4s_g = (((GLF_dead7h1) * (GLF_dead7k0)) - ((GLF_dead7h0) * (GLF_dead7k1))) / ((pow((GLF_dead7h0), 2.0) * (GLF_dead7h1)) - (pow((GLF_dead7h1), 2.0) * (GLF_dead7h0)));
                                GLF_dead4b_b = (((GLF_dead7k0) - (GLF_dead4s_g * (pow((GLF_dead7h0), 2.0)))) / (GLF_dead7h0));
                                donor_replacementGLF_dead7C = GLF_dead7fx(GLF_dead4s_g);
                                GLF_dead4s_g = GLF_dead4s_g - ((2.0 * donor_replacementGLF_dead7C) / (GLF_dead4b_b + sign(GLF_dead4b_b) * sqrt(pow(GLF_dead4b_b, 2.0) - (4.0 * GLF_dead4s_g * donor_replacementGLF_dead7C))));
                                GLF_dead1h_r = donor_replacementGLF_dead7x1;
                                donor_replacementGLF_dead7x1 = donor_replacementGLF_dead7temp;
                            }
                        }
                        return;
                    }
                    return;
                    {
                        vec4 _GLF_outVarBackup_GLF_color;
                        if (_GLF_DEAD(false)) {
                            float donor_replacementGLF_dead7x2 = _GLF_FUZZED(floor(GLF_dead4s_g));
                            if (donor_replacementGLF_dead7x2 <= -0.9 && donor_replacementGLF_dead7x2 >= -1.1) {
                                GLF_dead7_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
                            } else {
                                GLF_dead7_GLF_color = vec4(0.0, 1.0, 0.0, 1.0);
                            }
                        }
                        _GLF_outVarBackup_GLF_color = _GLF_color;
                        _GLF_color = vec4(vec2(-9.4, 6.7), 2.2, normalize(7270.7482));
                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                            _GLF_color = _GLF_outVarBackup_GLF_color;
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        return;
                    }
                }
                sum[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead0i, 3)] = sum[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead0i, 3)] * sum[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead0i, 3)];
                if (_GLF_DEAD(false)) {
                    {
                        if (_GLF_DEAD(false)) {
                            _GLF_color = GLF_dead7_GLF_color;
                        }
                        GLF_dead7_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
                    }
                }
                if (_GLF_DEAD(false)) {
                    return;
                    if (_GLF_DEAD(false)) {
                        float donor_replacementGLF_dead3alpha2 = _GLF_FUZZED(92.07);
                        float donor_replacementGLF_dead3alpha3 = _GLF_FUZZED(roundEven(radians(-604.235)));
                        if (_GLF_DEAD(_GLF_IDENTITY(false, !(!(false))))) {
                            return;
                        }
                        float donor_replacementGLF_dead3beta = _GLF_FUZZED(-877.213);
                        if (_GLF_DEAD(false)) {
                            _GLF_color = vec4(90.06, -18.42, -8.6, 5733.3847);
                        }
                        int donor_replacementGLF_dead3k = _GLF_FUZZED(abs(donor_replacementGLF_dead0i));
                        mat4 donor_replacementGLF_dead3matrix_a = _GLF_FUZZED(mat4(20.25, 9.4, -35.49, -1.8, -569.580, 34.25, -7.5, 3927.7430, 1663.9202, -9935.1184, 59.19, 95.93, 8.6, -537.222, 574.941, -86.12));
                        vec4 donor_replacementGLF_dead3matrix_u = _GLF_FUZZED(vec4(2016.8274, 8538.8836, 3.0, -6.7));
                        if (_GLF_DEAD(false)) {
                            return;
                        }
                        for (int GLF_dead3j = donor_replacementGLF_dead3k; GLF_dead3j < GLF_dead3MATRIX_N; GLF_dead3j++) {
                            for (int GLF_dead3a = GLF_dead3MATRIX_N - 1; GLF_dead3a >= donor_replacementGLF_dead3k; GLF_dead3a--) {
                                donor_replacementGLF_dead3alpha3 += donor_replacementGLF_dead3matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead3a, 4)] * donor_replacementGLF_dead3matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead3a, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead3j, 4)];
                                if (_GLF_DEAD(false)) {
                                    return;
                                }
                            }
                            donor_replacementGLF_dead3beta = donor_replacementGLF_dead3alpha2 * donor_replacementGLF_dead3alpha3;
                            for (int GLF_dead3a = GLF_dead3MATRIX_N - 1; GLF_dead3a >= donor_replacementGLF_dead3k; GLF_dead3a--) {
                                donor_replacementGLF_dead3matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead3a, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead3j, 4)] = donor_replacementGLF_dead3matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead3a, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead3j, 4)] - (donor_replacementGLF_dead3beta * donor_replacementGLF_dead3matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead3a, 4)]);
                            }
                            donor_replacementGLF_dead3alpha3 = 0.0;
                            if (_GLF_DEAD(false)) {
                                {
                                    discard;
                                }
                            }
                            donor_replacementGLF_dead3beta = _GLF_outlined_15();
                        }
                    }
                }
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                return;
            }
            if (_GLF_DEAD(false)) {
                if (_GLF_DEAD(false)) {
                    int donor_replacementGLF_dead8a = _GLF_FUZZED(GLF_dead3MATRIX_N);
                    int donor_replacementGLF_dead8b = _GLF_FUZZED(ivec4(82120, 66196, 24763, 20277)[2]);
                    vec2 donor_replacementGLF_dead8uv = _GLF_FUZZED(dFdxFine(exp((true ? vec2(-54.67, -66.47) : GLF_dead4resolution))));
                    {
                        donor_replacementGLF_dead8uv.y -= step(GLF_dead8injectionSwitch.y, donor_replacementGLF_dead8uv.x) + float(donor_replacementGLF_dead8a);
                        donor_replacementGLF_dead8uv.x *= (isnan(donor_replacementGLF_dead8uv.y) ? cosh(GLF_dead8gl_FragCoord.y) : tanh(GLF_dead8gl_FragCoord.x));
                        donor_replacementGLF_dead8b--;
                    }
                }
                return;
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    if (_GLF_DEAD(false)) {
                        return;
                    }
                    _GLF_color = _GLF_outlined_16();
                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
            }
            if (_GLF_DEAD(false)) {
                _GLF_color = _GLF_outlined_17(_GLF_color);
                if (_GLF_DEAD(false)) {
                    return;
                }
            }
            {
                if (_GLF_DEAD(_GLF_IDENTITY(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)), bool(bvec2(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)), true))))) {
                    vec2 donor_replacementGLF_dead4center = _GLF_FUZZED((floor(vec2(-8451.0648, -38.70)) * (-9.1)));
                    if (_GLF_DEAD(false)) {
                        _GLF_color = fwidthCoarse(GLF_dead8gl_FragCoord);
                    }
                    int donor_replacementGLF_dead4i = _GLF_FUZZED((false ? 78565 : 99610));
                    int donor_replacementGLF_dead4msb8 = _GLF_FUZZED(int(-56.75));
                    vec2 donor_replacementGLF_dead4position = _GLF_FUZZED((resolution * (-4.6)));
                    {
                        vec3 GLF_dead4d = _GLF_FUZZED(vec3(8.6, -52.57, -165.929));
                        GLF_dead4d = GLF_dead4drawShape(donor_replacementGLF_dead4position, donor_replacementGLF_dead4center + vec2(sin(float(donor_replacementGLF_dead4i) / (float(bitCount(donor_replacementGLF_dead4msb8)) * 10.0) + GLF_dead4time) / 4.0 * float(bitCount(donor_replacementGLF_dead4msb8)), float(bitfieldExtract(int(GLF_dead4resolution.x), 0, 0))), vec3(0.01 + sin(float(donor_replacementGLF_dead4i) / 100.0 * float(bitCount(donor_replacementGLF_dead4msb8))), 0.01, float(donor_replacementGLF_dead4i)));
                        if (length(GLF_dead4d) <= float(bitfieldExtract(int(GLF_dead4resolution.x), 0, 0))) {
                            ;
                        }
                        sum = vec3(GLF_dead4d);
                        if (_GLF_DEAD(_GLF_IDENTITY(false, !(!(false))))) {
                            int donor_replacementGLF_dead6k = _GLF_FUZZED(-60946);
                            float donor_replacementGLF_dead6magnitudeX = _GLF_FUZZED(GLF_dead4time);
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                _GLF_color = trunc(tanh(GLF_dead7_GLF_color));
                            }
                            mat4 donor_replacementGLF_dead6matrix_a = _GLF_FUZZED(mat4(-6.4, -38.30, -241.566, 1.0, -992.339, -80.00, 2.3, -666.755, 2733.9815, -5945.3981, -6.1, -8.3, 30.91, 5.4, 604.136, 7505.3906));
                            for (int GLF_dead6x = GLF_dead6MATRIX_N - 1; GLF_dead6x >= donor_replacementGLF_dead6k; GLF_dead6x--) {
                                donor_replacementGLF_dead6magnitudeX += pow(donor_replacementGLF_dead6matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6x, 4)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead6k, 4)], 2.0);
                                _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6x, 4)] = donor_replacementGLF_dead6matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6x, 4)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead6k, 4)];
                            }
                        }
                    }
                }
                if (_GLF_DEAD(false)) {
                    float donor_replacementGLF_dead7B = _GLF_FUZZED(dot(vec3(-1.5, 5860.6033, -7.9), sum));
                    while (abs(GLF_dead4b_b - GLF_dead4h_r) >= .000000000000001) {
                        float GLF_dead7h0 = GLF_dead4b_b - GLF_dead4b_b;
                        float GLF_dead7h1 = GLF_dead4h_r - GLF_dead4b_b;
                        float GLF_dead7k0 = GLF_dead7fx(GLF_dead4b_b) - GLF_dead7fx(GLF_dead4b_b);
                        float GLF_dead7k1 = GLF_dead7fx(GLF_dead4h_r) - GLF_dead7fx(GLF_dead4b_b);
                        GLF_dead4h_r = GLF_dead4b_b;
                        GLF_dead4h_r = (((GLF_dead7h1) * (GLF_dead7k0)) - ((GLF_dead7h0) * (GLF_dead7k1))) / ((pow((GLF_dead7h0), 2.0) * (GLF_dead7h1)) - (pow((GLF_dead7h1), 2.0) * (GLF_dead7h0)));
                        donor_replacementGLF_dead7B = (((GLF_dead7k0) - (GLF_dead4h_r * (pow((GLF_dead7h0), 2.0)))) / (GLF_dead7h0));
                        GLF_dead4s_g = GLF_dead7fx(GLF_dead4b_b);
                        GLF_dead4b_b = GLF_dead4b_b - ((2.0 * GLF_dead4s_g) / (donor_replacementGLF_dead7B + sign(donor_replacementGLF_dead7B) * sqrt(pow(donor_replacementGLF_dead7B, 2.0) - (4.0 * GLF_dead4h_r * GLF_dead4s_g))));
                        GLF_dead4b_b = GLF_dead4h_r;
                        GLF_dead4h_r = GLF_dead4h_r;
                    }
                }
                vec4 _GLF_outVarBackup_GLF_color;
                if (_GLF_DEAD(false)) {
                    return;
                }
                if (_GLF_DEAD(false)) {
                    return;
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    return;
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    if (_GLF_DEAD(false)) {
                        vec2 donor_replacementGLF_dead5coord = _GLF_FUZZED((GLF_dead4time * GLF_dead4resolution));
                        vec4 donor_replacementGLF_dead5texel = _GLF_FUZZED(_GLF_outVarBackup_GLF_color);
                        {
                            donor_replacementGLF_dead5coord = donor_replacementGLF_dead5texel.xz + donor_replacementGLF_dead5texel.yy;
                            donor_replacementGLF_dead5coord = floor(donor_replacementGLF_dead5coord * 256.0) / 256.0;
                            donor_replacementGLF_dead5texel = texture(GLF_dead5tex, donor_replacementGLF_dead5coord);
                            GLF_dead3MATRIX_N++;
                        }
                    }
                    return;
                }
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = mix(_GLF_IDENTITY(vec4(-390.236, 12.79, -2.3, -38.34), mix(vec4((vec4(-390.236, 12.79, -2.3, -38.34))[0], (vec4(-390.236, 12.79, -2.3, -38.34))[1], (vec4(-390.236, 12.79, -2.3, -38.34))[2], (vec4(-390.236, 12.79, -2.3, -38.34))[3]), vec4(_GLF_FUZZED(812.915), _GLF_FUZZED(9913.5722), _GLF_FUZZED((55.00 - (+(-13.57)))), _GLF_FUZZED(291.336)), bvec4(false, false, _GLF_FALSE(false, (gl_FragCoord.x < 0.0)), false))), _GLF_IDENTITY(vec4(1483.4620, -40.17, -8709.1662, -1781.6271), (vec4(1483.4620, -40.17, -8709.1662, -1781.6271)) - vec4(0.0, 0.0, 0.0, 0.0)), sin(vec4(5.2, 4.7, -_GLF_IDENTITY(0.5, 0.0 + (0.5)), 745.832)));
                if (_GLF_DEAD(false)) {
                    return;
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < sqrt(length(vec2(0.0, 0.0))))))) {
                    return;
                }
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        float donor_replacementGLF_dead3alpha3 = _GLF_FUZZED(roundEven(66.62));
                        mat4 donor_replacementGLF_dead3matrix_a = _GLF_FUZZED(((-601.208) * mat4(-792.197, 0.6, -0.7, -7670.9079, -7482.1691, 457.943, 542.908, -32.59, -482.146, -512.986, -4.4, 716.189, 4542.9123, 793.094, -915.659, 4.4)));
                        if (_GLF_DEAD(false)) {
                            _GLF_color = vec4(-8315.0324, -5.3, 8.2, -699.849);
                        }
                        vec4 donor_replacementGLF_dead3matrix_u = _GLF_FUZZED(_GLF_color);
                        for (int GLF_dead3a = GLF_dead3MATRIX_N - 1; GLF_dead3a >= donor_replacementGLF_dead0i; GLF_dead3a--) {
                            donor_replacementGLF_dead3alpha3 += donor_replacementGLF_dead3matrix_u[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead3a, 4)] * donor_replacementGLF_dead3matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead3a, 4)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead0i, 4)];
                            if (_GLF_DEAD(false)) {
                                continue;
                            }
                        }
                        if (_GLF_DEAD(false)) {
                            return;
                        }
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        return;
                    }
                    _GLF_color = exp(vec4(-6.3, 29.68, -0.0, -7.9));
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        {
                            GLF_dead7_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
                        }
                    }
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
                if (_GLF_DEAD(false)) {
                    return;
                }
            }
            if (_GLF_DEAD(false)) {
                _GLF_color = _GLF_color;
            }
            if (_GLF_DEAD(false)) {
                return;
            }
        }
        _GLF_color = vec4(-7676.3295, 105.684, 151.231, -72.41);
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            int donor_replacementGLF_dead3a = _GLF_FUZZED(-82780);
            if (_GLF_DEAD(false)) {
                return;
            }
            float donor_replacementGLF_dead3alpha3 = _GLF_FUZZED(-9768.5681);
            int donor_replacementGLF_dead3j = _GLF_FUZZED((ivec4(61168, -41655, 55421, 75443)[2] * (-18238)));
            mat4 donor_replacementGLF_dead3matrix_a = _GLF_FUZZED(mat4(7.1, 41.14, -7.6, 0.6, 4.6, 8.6, -4.6, 690.200, -57.66, 79.68, 9673.2842, -8.6, 4.5, 298.357, -1.8, 350.267));
            {
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    vec2 donor_replacementGLF_dead5coord = _GLF_FUZZED(GLF_dead4resolution.rg);
                    int donor_replacementGLF_dead5i = _GLF_FUZZED(bitfieldInsert(donor_replacementGLF_dead3j, donor_replacementGLF_dead3j, donor_replacementGLF_dead3j, -81652));
                    vec4 donor_replacementGLF_dead5texel = _GLF_FUZZED(vec4(-9.7, 1002.7533, 389.576, -21.60));
                    while (donor_replacementGLF_dead5texel.x + donor_replacementGLF_dead5texel.y + donor_replacementGLF_dead5texel.z > 1.0 && donor_replacementGLF_dead5i < 16) {
                        donor_replacementGLF_dead5coord = donor_replacementGLF_dead5texel.xz + donor_replacementGLF_dead5texel.yy;
                        donor_replacementGLF_dead5coord = floor(donor_replacementGLF_dead5coord * 256.0) / 256.0;
                        donor_replacementGLF_dead5texel = texture(GLF_dead5tex, donor_replacementGLF_dead5coord);
                        donor_replacementGLF_dead5i++;
                    }
                }
                donor_replacementGLF_dead3alpha3 += _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead3a, 4)] * donor_replacementGLF_dead3matrix_a[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead3a, 4)][_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead3j, 4)];
            }
            if (_GLF_DEAD(false)) {
                _GLF_color = GLF_dead8gl_FragCoord;
            }
        }
        if (_GLF_DEAD(false)) {
            float donor_replacementGLF_dead7A = _GLF_FUZZED(atan(-2.9));
            float donor_replacementGLF_dead7B = _GLF_FUZZED(dot(vec4(6.2, -746.110, 0.6, 2.9), _GLF_color));
            float donor_replacementGLF_dead7x0 = _GLF_FUZZED(log2(GLF_dead4h_r));
            float donor_replacementGLF_dead7x1 = _GLF_FUZZED(GLF_dead1b_b);
            float donor_replacementGLF_dead7x2 = _GLF_FUZZED(GLF_dead1s_g);
            while (abs(donor_replacementGLF_dead7x2 - donor_replacementGLF_dead7x1) >= .000000000000001) {
                float GLF_dead7h0 = donor_replacementGLF_dead7x0 - donor_replacementGLF_dead7x2;
                float GLF_dead7h1 = donor_replacementGLF_dead7x1 - donor_replacementGLF_dead7x2;
                float GLF_dead7k0 = GLF_dead7fx(donor_replacementGLF_dead7x0) - GLF_dead7fx(donor_replacementGLF_dead7x2);
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    _GLF_color = mod(_GLF_color, _GLF_color);
                }
                float GLF_dead7k1 = GLF_dead7fx(donor_replacementGLF_dead7x1) - GLF_dead7fx(donor_replacementGLF_dead7x2);
                GLF_dead1s_g = donor_replacementGLF_dead7x2;
                donor_replacementGLF_dead7A = (((GLF_dead7h1) * (GLF_dead7k0)) - ((GLF_dead7h0) * (GLF_dead7k1))) / ((pow((GLF_dead7h0), 2.0) * (GLF_dead7h1)) - (pow((GLF_dead7h1), 2.0) * (GLF_dead7h0)));
                donor_replacementGLF_dead7B = (((GLF_dead7k0) - (donor_replacementGLF_dead7A * (pow((GLF_dead7h0), 2.0)))) / (GLF_dead7h0));
                GLF_dead4h_r = GLF_dead7fx(donor_replacementGLF_dead7x2);
                donor_replacementGLF_dead7x2 = donor_replacementGLF_dead7x2 - ((2.0 * GLF_dead4h_r) / (donor_replacementGLF_dead7B + sign(donor_replacementGLF_dead7B) * sqrt(pow(donor_replacementGLF_dead7B, 2.0) - (4.0 * donor_replacementGLF_dead7A * GLF_dead4h_r))));
                donor_replacementGLF_dead7x0 = donor_replacementGLF_dead7x1;
                donor_replacementGLF_dead7x1 = GLF_dead1s_g;
            }
        }
        if (_GLF_DEAD(false)) {
            return;
        }
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
        float donor_replacementGLF_dead7B = _GLF_FUZZED((true ? GLF_dead1b_b : GLF_dead1s_g));
        float donor_replacementGLF_dead7C = _GLF_FUZZED(GLF_dead4s_g);
        float donor_replacementGLF_dead7x0 = _GLF_FUZZED(GLF_dead4time);
        {
            float GLF_dead7h0 = donor_replacementGLF_dead7x0 - GLF_dead4h_r;
            float GLF_dead7h1 = GLF_dead1b_b - GLF_dead4h_r;
            float GLF_dead7k0 = GLF_dead7fx(donor_replacementGLF_dead7x0) - GLF_dead7fx(GLF_dead4h_r);
            float GLF_dead7k1 = GLF_dead7fx(GLF_dead1b_b) - GLF_dead7fx(GLF_dead4h_r);
            GLF_dead1b_b = GLF_dead4h_r;
            GLF_dead4s_g = (((GLF_dead7h1) * (GLF_dead7k0)) - ((GLF_dead7h0) * (GLF_dead7k1))) / ((pow((GLF_dead7h0), 2.0) * (GLF_dead7h1)) - (pow((GLF_dead7h1), 2.0) * (GLF_dead7h0)));
            donor_replacementGLF_dead7B = (((GLF_dead7k0) - (GLF_dead4s_g * (pow((GLF_dead7h0), 2.0)))) / (GLF_dead7h0));
            donor_replacementGLF_dead7C = GLF_dead7fx(GLF_dead4h_r);
            GLF_dead4h_r = GLF_dead4h_r - ((2.0 * donor_replacementGLF_dead7C) / (donor_replacementGLF_dead7B + sign(donor_replacementGLF_dead7B) * sqrt(pow(donor_replacementGLF_dead7B, 2.0) - (4.0 * GLF_dead4s_g * donor_replacementGLF_dead7C))));
            donor_replacementGLF_dead7x0 = GLF_dead1b_b;
            GLF_dead1b_b = GLF_dead1b_b;
        }
    }
    _GLF_color = _GLF_outlined_1(sum);
    {
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            float donor_replacementGLF_dead6beta = _GLF_FUZZED(clamp(GLF_dead4s_g, GLF_dead4h_r, GLF_dead1time));
            for (int GLF_dead6b = GLF_dead6MATRIX_N - 1; GLF_dead6b >= GLF_dead3MATRIX_N; GLF_dead6b--) {
                _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6b, 4)] = _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6b, 4)] - (donor_replacementGLF_dead6beta * _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6b, 4)]);
            }
        }
        vec4 _GLF_outVarBackup_GLF_color;
        if (_GLF_DEAD(false)) {
            vec2 donor_replacementGLF_dead1center = _GLF_FUZZED(resolution);
            if (_GLF_DEAD(false)) {
                _GLF_color = (GLF_dead1h_r + _GLF_color);
            }
            vec2 donor_replacementGLF_dead1position = _GLF_FUZZED(injectionSwitch);
            for (int GLF_dead1i = 35; GLF_dead1i >= 0; GLF_dead1i--) {
                vec3 GLF_dead1d = _GLF_FUZZED((vec3(5308.5389, -7621.4225, 2207.2178) - vec3(5.7, 2.9, 3.8)));
                GLF_dead1d = GLF_dead1drawShape(donor_replacementGLF_dead1position, donor_replacementGLF_dead1center + vec2(sin(float(GLF_dead1i) / 10.0 + GLF_dead1time) / 4.0, 0.0), vec3(0.01 + sin(float(GLF_dead1i) / 100.0), 0.01, float(GLF_dead1i)));
                if (length(GLF_dead1d) <= 0.0) {
                    continue;
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        _GLF_color = vec4(-47.25, -61.48, 8.8, -65.21);
                    }
                    if (_GLF_DEAD(false)) {
                        while (_GLF_color.x + _GLF_color.y + _GLF_color.z > 1.0 && GLF_dead3MATRIX_N < 16) {
                            donor_replacementGLF_dead1position = _GLF_color.xz + _GLF_color.yy;
                            donor_replacementGLF_dead1position = floor(donor_replacementGLF_dead1position * 256.0) / 256.0;
                            _GLF_color = texture(GLF_dead5tex, donor_replacementGLF_dead1position);
                            GLF_dead3MATRIX_N++;
                        }
                    }
                }
                sum = vec3(GLF_dead1d);
                if (_GLF_DEAD(_GLF_IDENTITY(false, !(!(_GLF_IDENTITY(false, bool(bool(false)))))))) {
                    break;
                }
            }
        }
        _GLF_outVarBackup_GLF_color = _GLF_color;
        _GLF_color = vec4(4075.4940, -4370.1059, -0.4, 61.57);
        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
        if (_GLF_DEAD(false)) {
            return;
        }
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
        if (_GLF_DEAD(false)) {
            mat4 donor_replacementGLF_dead6matrix_a = _GLF_FUZZED(mat4(mat3x2(40.49, 209.401, 5.5, 43.46, -7.6, -6.7)));
            for (int GLF_dead6j = (GLF_dead6MATRIX_N - 1); GLF_dead6j >= (GLF_dead3MATRIX_N + 1); GLF_dead6j--) {
                _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead3MATRIX_N, 4)] -= (donor_replacementGLF_dead6matrix_a[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead3MATRIX_N, 4)][_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6j, 4)] * _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead6j, 4)]);
            }
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            return;
        }
        return;
        if (_GLF_DEAD(false)) {
            _GLF_color = vec4(-9748.2243, 8042.0616, 771.857, 2.6);
        }
    }
    {
        if (_GLF_DEAD(false)) {
            return;
        }
        vec4 _GLF_outVarBackup_GLF_color;
        if (_GLF_DEAD(false)) {
            {
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                if (_GLF_DEAD(false)) {
                    return;
                }
                _GLF_color = vec4(0.7, 905.064, -2226.0254, 860.909);
                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            return;
        }
        if (_GLF_DEAD(false)) {
            if (_GLF_DEAD(false)) {
                int donor_replacementGLF_dead4msb8 = _GLF_FUZZED(-78632);
                vec2 donor_replacementGLF_dead4position = _GLF_FUZZED(resolution);
                if (abs(donor_replacementGLF_dead4position.y - donor_replacementGLF_dead4position.x) < 0.5) {
                    GLF_dead4b_b = clamp(float(bitfieldExtract(int(GLF_dead4resolution.x), 0, 0)), float(bitCount(donor_replacementGLF_dead4msb8)), GLF_dead4b_b * float(bitCount(donor_replacementGLF_dead4msb8)) * 3.0);
                }
            }
            return;
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
            return;
        }
        _GLF_outVarBackup_GLF_color = _GLF_color;
        if (_GLF_DEAD(false)) {
            return;
            if (_GLF_DEAD(false)) {
                return;
            }
        }
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = vec4(-71.68, 8.4, 77.46, 2505.3267);
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
                if (_GLF_DEAD(false)) {
                    return;
                }
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                int donor_replacementGLF_dead8m = _GLF_FUZZED(ivec4(4658, -72715, 48575, -41288)[0]);
                {
                    GLF_dead3MATRIX_N = donor_replacementGLF_dead8m + 1;
                    if (_GLF_DEAD(false)) {
                        _GLF_color = _GLF_color;
                    }
                }
            }
        }
        if (_GLF_DEAD(false)) {
            if (_GLF_DEAD(false)) {
                if (_GLF_DEAD(false)) {
                    vec2 donor_replacementGLF_dead5coord = _GLF_FUZZED(injectionSwitch);
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < sin(0.0))))) {
                        _GLF_color = vec4(-89.63, -8.0, -71.91, 9232.0435);
                    }
                    int donor_replacementGLF_dead5i = _GLF_FUZZED(GLF_dead3MATRIX_N);
                    vec4 donor_replacementGLF_dead5texel = _GLF_FUZZED(_GLF_color);
                    {
                        donor_replacementGLF_dead5coord = donor_replacementGLF_dead5texel.xz + donor_replacementGLF_dead5texel.yy;
                        donor_replacementGLF_dead5coord = floor(donor_replacementGLF_dead5coord * 256.0) / 256.0;
                        donor_replacementGLF_dead5texel = texture(GLF_dead5tex, donor_replacementGLF_dead5coord);
                        donor_replacementGLF_dead5i++;
                    }
                }
                return;
            }
            return;
            if (_GLF_DEAD(false)) {
                if (_GLF_DEAD(false)) {
                    return;
                }
                {
                    ;
                }
                if (_GLF_DEAD(false)) {
                    _GLF_color = GLF_dead7_GLF_color;
                }
            }
        }
        _GLF_color = reflect(vec4(-5.0, 3.3, -15.38, 3.9), vec4(-5.4, 675.011, -6.4, -541.684));
        if (_GLF_DEAD(false)) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            _GLF_color = _GLF_outlined_4(_GLF_outVarBackup_GLF_color);
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                return;
                if (_GLF_DEAD(false)) {
                    vec2 donor_replacementGLF_dead5coord = _GLF_FUZZED(resolution);
                    vec4 donor_replacementGLF_dead5texel = _GLF_FUZZED(_GLF_color);
                    {
                        donor_replacementGLF_dead5coord = donor_replacementGLF_dead5texel.xz + donor_replacementGLF_dead5texel.yy;
                        donor_replacementGLF_dead5coord = floor(donor_replacementGLF_dead5coord * 256.0) / 256.0;
                        donor_replacementGLF_dead5texel = texture(GLF_dead5tex, donor_replacementGLF_dead5coord);
                        if (_GLF_DEAD(false)) {
                            _GLF_color = cos(GLF_dead8gl_FragCoord);
                        }
                        GLF_dead3MATRIX_N++;
                    }
                }
                if (_GLF_DEAD(false)) {
                    return;
                }
            }
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < length(0.0))))) {
            return;
        }
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
        {
            ;
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                return;
            }
        }
    }
    if (_GLF_DEAD(false)) {
        return;
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
        vec2 donor_replacementGLF_dead1pos = _GLF_FUZZED(vec2(7.5, 56.56));
        {
            ;
        }
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < tan(0.0))))) {
        return;
    }
}
