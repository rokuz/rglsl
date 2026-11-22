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

vec4 GLF_dead15_GLF_color = _GLF_FUZZED(vec4(-679.984, 2.5, 5.4, 6.7));
vec4 GLF_dead16_GLF_color = _GLF_FUZZED(vec4(-8.0, -962.021, -7.3, -86.18));
int GLF_dead16map[16 * 16] = int[256](0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
vec4 GLF_dead17_GLF_color = _GLF_FUZZED(vec4(-8.3, (vec2(-9.3, -941.945) + 556.667), -751.257));

layout(set = 0, binding = 3) uniform buf3 {
    vec2 GLF_dead17injectionSwitch;
};

float GLF_dead17compute_derivative_x(float GLF_dead17v) {
    return dFdx(GLF_dead17v) * GLF_dead17injectionSwitch.y;
}

float GLF_dead17compute_derivative_y(float GLF_dead17v) {
    return dFdy(GLF_dead17v) * GLF_dead17injectionSwitch.y;
}

float GLF_dead17compute_stripe(float GLF_dead17v, float GLF_dead17t) {
    return smoothstep(-.9, 1., (GLF_dead17v) / (20.0 * ((GLF_dead17injectionSwitch.y > GLF_dead17injectionSwitch.x) ? GLF_dead17compute_derivative_x(GLF_dead17t) : GLF_dead17compute_derivative_y(GLF_dead17t))));
}

layout(set = 0, binding = 4) uniform buf4 {
    vec2 GLF_live12injectionSwitch;
};

struct GLF_live12QuicksortObject {
    int numbers[10];
};

GLF_live12QuicksortObject GLF_live12obj = GLF_live12QuicksortObject(int[10](0, 0, 0, 0, 0, 0, 0, 0, 0, 0));

void GLF_live12swap(int GLF_live12i, int GLF_live12j) {
    int GLF_live12temp = GLF_live12obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12i, 10)];
    GLF_live12obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12i, 10)] = GLF_live12obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12j, 10)];
    GLF_live12obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12j, 10)] = GLF_live12temp;
}

vec3 GLF_live12palette(vec3 GLF_live12a, vec3 GLF_live12b, vec3 GLF_live12c, vec3 GLF_live12d) {
    return fract(mix(GLF_live12d * GLF_live12a, GLF_live12a * GLF_live12c, GLF_live12b + GLF_live12d - GLF_live12c));
}

vec4 GLF_live10_GLF_color = _GLF_FUZZED((vec4(1.9, -254.896, -38.27, -155.387) * vec4(-0.4, -2.1, 6785.0642, 0.5)));
vec4 GLF_live11_GLF_color = _GLF_FUZZED(vec4(4092.3504, 386.277, -7.2, 521.288));

layout(set = 0, binding = 5) uniform buf5 {
    vec2 GLF_live11injectionSwitch;
};

float GLF_live11compute_derivative_x(float GLF_live11v) {
    return dFdx(GLF_live11v) * GLF_live11injectionSwitch.y;
}

float GLF_live11compute_derivative_y(float GLF_live11v) {
    return dFdy(GLF_live11v) * GLF_live11injectionSwitch.y;
}

float GLF_live11compute_stripe(float GLF_live11v, float GLF_live11t) {
    return smoothstep(-.9, 1., (GLF_live11v) / (20.0 * ((GLF_live11injectionSwitch.y > GLF_live11injectionSwitch.x) ? GLF_live11compute_derivative_x(GLF_live11t) : GLF_live11compute_derivative_y(GLF_live11t))));
}

vec4 GLF_dead9gl_FragCoord = _GLF_FUZZED(vec4(vec3(-3.3, -3.0, -7.2).pt, vec2(8.0, -924.270)));
layout(set = 0, binding = 6) uniform sampler2D GLF_dead8tex;
const float GLF_dead8weights[9] = float[9](1.0, 0.5, -0.25, 0.5, 1.0, -0.5, -0.25, -0.5, -1.0);
int GLF_live4msb8 = 256;
const vec4 GLF_live5pal[16] = vec4[16](vec4(0.0, 0.0, 0.0, 1.0), vec4(0.5, 0.0, 0.0, 1.0), vec4(0.0, 0.5, 0.0, 1.0), vec4(0.5, 0.5, 0.0, 1.0), vec4(0.0, 0.0, 0.5, 1.0), vec4(0.5, 0.0, 0.5, 1.0), vec4(0.0, 0.5, 0.5, 1.0), vec4(0.5, 0.5, 0.5, 1.0), vec4(0.0, 0.0, 0.0, 1.0), vec4(1.0, 0.0, 0.0, 1.0), vec4(0.0, 1.0, 0.0, 1.0), vec4(1.0, 1.0, 0.0, 1.0), vec4(0.0, 0.0, 1.0, 1.0), vec4(1.0, 0.0, 1.0, 1.0), vec4(0.0, 1.0, 1.0, 1.0), vec4(1.0, 1.0, 1.0, 1.0));
const vec4 GLF_live5picdata[8] = vec4[8](vec4(4, 4, 20, 4), vec4(4, 4, 4, 20), vec4(4, 20, 20, 4), vec4(20, 4, 4, 8), vec4(8, 6, 4, 2), vec4(2, 12, 2, 4), vec4(16, 2, 4, 4), vec4(12, 22, 4, 4));

bool GLF_live5collision(vec2 GLF_live5pos, vec4 GLF_live5quad) {
    if (GLF_live5pos.x < GLF_live5quad.x) {
        {
            vec2 GLF_live10coord = _GLF_FUZZED(vec2(7.3, -6.6));
            if (GLF_live10coord.y < 0.6) {
                uvec2 GLF_live10icoord = uvec2(((GLF_live10coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                uint GLF_live10res1 = uint(((GLF_live10icoord.x * GLF_live10icoord.y) >> (GLF_live10icoord.x & 31u)) & 0xffffffffu);
                uint GLF_live10res2 = uint(((GLF_live10icoord.x * GLF_live10icoord.y) << (GLF_live10icoord.x & 31u)) & 0xffffffffu);
                float GLF_live10res = float(((GLF_live10res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_live10res1 & 1u) != 0u ? 1u : 0u));
                GLF_live10_GLF_color = vec4(GLF_live10res, GLF_live10res, GLF_live10res, 1.0);
            } else {
                ivec2 GLF_live10icoord = ivec2(((GLF_live10coord - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                int GLF_live10res3 = ((GLF_live10icoord.x >> 5) & 1) ^ ((GLF_live10icoord.y & 32) >> 5);
                int GLF_live10res2 = (GLF_live10icoord.y * GLF_live10icoord.y >> 10) & 1;
                int GLF_live10res1 = (GLF_live10icoord.x * GLF_live10icoord.y >> 9) & 1;
                GLF_live10_GLF_color = vec4(float(GLF_live10res1 ^ GLF_live10res2), float(GLF_live10res2 & GLF_live10res3), float(GLF_live10res1 | GLF_live10res3), 1.0);
            }
        }
        return false;
    }
    if (_GLF_DEAD(false)) {
        int donor_replacementGLF_dead7i = _GLF_FUZZED(((ivec3(10357, 52960, -68993) != ivec3(12850, -36669, 77476)) ? floatBitsToInt(0.5) : GLF_live4msb8));
        {
            GLF_live5quad[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead7i, 4)] = GLF_live5quad[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead7i, 4)] * GLF_live5quad[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead7i, 4)];
            if (_GLF_DEAD(false)) {
                vec2 donor_replacementGLF_dead15coord = _GLF_FUZZED(GLF_live11_GLF_color.gg);
                {
                    ivec2 GLF_dead15icoord = ivec2(((donor_replacementGLF_dead15coord - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                    int GLF_dead15res3 = ((GLF_dead15icoord.x >> 5) & 1) ^ ((GLF_dead15icoord.y & 32) >> 5);
                    int GLF_dead15res2 = (GLF_dead15icoord.y * GLF_dead15icoord.y >> 10) & 1;
                    int GLF_dead15res1 = (GLF_dead15icoord.x * GLF_dead15icoord.y >> 9) & 1;
                    GLF_dead15_GLF_color = vec4(float(GLF_dead15res1 ^ GLF_dead15res2), float(GLF_dead15res2 & GLF_dead15res3), float(GLF_dead15res1 | GLF_dead15res3), 1.0);
                }
            }
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            ivec2 donor_replacementGLF_dead16p = _GLF_FUZZED(((donor_replacementGLF_dead7i * ivec2(93048, 98042)) | (-57806)));
            {
                GLF_live4msb8--;
                GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead16p.x) + (donor_replacementGLF_dead16p.y) * 16, 256)] = 1;
                GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead16p.x - 1) + (donor_replacementGLF_dead16p.y) * 16, 256)] = 1;
                GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead16p.x - 2) + (donor_replacementGLF_dead16p.y) * 16, 256)] = 1;
                donor_replacementGLF_dead16p.x -= 2;
            }
        }
    }
    if (GLF_live5pos.y < GLF_live5quad.y) {
        return false;
    }
    {
        bool GLF_live11c1 = _GLF_FUZZED(true);
        bool GLF_live11c2 = _GLF_FUZZED(true);
        if (_GLF_DEAD(_GLF_IDENTITY(false, !(!(false))))) {
            vec3 donor_replacementGLF_dead17col = _GLF_FUZZED(cosh(vec3(-47.68, -6.7, 1.1)));
            {
                float GLF_dead17stripe = GLF_dead17compute_stripe(cos((GLF_live5pos.x + GLF_live5pos.y) * 20.0), GLF_live5pos.x + GLF_live5pos.y);
                donor_replacementGLF_dead17col = mix(vec3(.7, sinh(GLF_live5pos.x), GLF_live5pos.x), vec3(.3, .5, GLF_live5pos.x), GLF_dead17stripe);
                GLF_dead17_GLF_color = vec4(donor_replacementGLF_dead17col, 1.0);
                ;
            }
        }
        bool GLF_live11c3 = _GLF_FUZZED(true);
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            uint donor_replacementGLF_dead14uselessOutVariable = _GLF_FUZZED(63155u);
            if (uint(GLF_live4msb8) < uaddCarry(uint(GLF_live4msb8), 1u, donor_replacementGLF_dead14uselessOutVariable)) {
                ;
            }
        }
        vec3 GLF_live11col = _GLF_FUZZED((mat2x3(-4.8, 10.49, -97.81, 1754.1178, -2.0, -5375.2981) * vec2(vec3(-871.185, -0.4, -50.01))));
        vec2 GLF_live11uv = _GLF_FUZZED(vec2(8.0, -944.665));
        if (!GLF_live11c1 && !GLF_live11c2 && GLF_live11c3) {
            float GLF_live11stripe = GLF_live11compute_stripe(cos((GLF_live11uv.x + GLF_live11uv.y) * 20.0), GLF_live11uv.x + GLF_live11uv.y);
            GLF_live11col = mix(vec3(.7, sinh(GLF_live11uv.x), GLF_live11uv.x), vec3(.3, .5, GLF_live11uv.x), GLF_live11stripe);
            GLF_live11_GLF_color = vec4(GLF_live11col, 1.0);
            ;
        }
        if (_GLF_DEAD(false)) {
            {
                if (GLF_live11uv.y < 0.6) {
                    uvec2 GLF_dead15icoord = uvec2(((GLF_live11uv - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                    uint GLF_dead15res1 = uint(((GLF_dead15icoord.x * GLF_dead15icoord.y) >> (GLF_dead15icoord.x & 31u)) & 0xffffffffu);
                    uint GLF_dead15res2 = uint(((GLF_dead15icoord.x * GLF_dead15icoord.y) << (GLF_dead15icoord.x & 31u)) & 0xffffffffu);
                    float GLF_dead15res = float(((GLF_dead15res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_dead15res1 & 1u) != 0u ? 1u : 0u));
                    GLF_dead15_GLF_color = vec4(GLF_dead15res, GLF_dead15res, GLF_dead15res, 1.0);
                } else {
                    ivec2 GLF_dead15icoord = ivec2(((GLF_live11uv - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                    int GLF_dead15res3 = ((GLF_dead15icoord.x >> 5) & 1) ^ ((GLF_dead15icoord.y & 32) >> 5);
                    int GLF_dead15res2 = (GLF_dead15icoord.y * GLF_dead15icoord.y >> 10) & 1;
                    int GLF_dead15res1 = (GLF_dead15icoord.x * GLF_dead15icoord.y >> 9) & 1;
                    GLF_dead15_GLF_color = vec4(float(GLF_dead15res1 ^ GLF_dead15res2), float(GLF_dead15res2 & GLF_dead15res3), float(GLF_dead15res1 | GLF_dead15res3), 1.0);
                }
            }
        }
    }
    if (GLF_live5pos.x > GLF_live5quad.x + GLF_live5quad.z) {
        return false;
    }
    if (GLF_live5pos.y > GLF_live5quad.y + GLF_live5quad.w) {
        return false;
        {
            int GLF_live12i = _GLF_FUZZED(40028);
            int GLF_live12j = _GLF_FUZZED(int(true));
            int GLF_live12pivot = _GLF_FUZZED(((-32985) * (+(-98303))));
            {
                if (GLF_live12obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12j, 10)] <= GLF_live12pivot) {
                    GLF_live12i++;
                    GLF_live12swap(GLF_live12i, GLF_live12j);
                }
            }
        }
    }
    if (_GLF_DEAD(false)) {
        int donor_replacementGLF_dead8i = _GLF_FUZZED((GLF_live4msb8 | GLF_live4msb8));
        vec4 donor_replacementGLF_dead8res = _GLF_FUZZED(vec4(-9258.1635, 8.1, -66.12, 2.2));
        float donor_replacementGLF_dead8uvstep = _GLF_FUZZED(80.88);
        {
            for (int GLF_dead8j = 0; GLF_dead8j < 3; GLF_dead8j++) {
                donor_replacementGLF_dead8res += texture(GLF_dead8tex, GLF_live5pos + vec2(float(donor_replacementGLF_dead8i - 1) * donor_replacementGLF_dead8uvstep, float(GLF_dead8j - 1) * donor_replacementGLF_dead8uvstep)) * GLF_dead8weights[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead8i * 3 + GLF_dead8j, 9)];
            }
        }
        if (_GLF_DEAD(false)) {
            if (GLF_live5pos.y < 0.6) {
                uvec2 GLF_dead15icoord = uvec2(((GLF_live5pos - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                uint GLF_dead15res1 = uint(((GLF_dead15icoord.x * GLF_dead15icoord.y) >> (GLF_dead15icoord.x & 31u)) & 0xffffffffu);
                uint GLF_dead15res2 = uint(((GLF_dead15icoord.x * GLF_dead15icoord.y) << (GLF_dead15icoord.x & 31u)) & 0xffffffffu);
                float GLF_dead15res = float(((GLF_dead15res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_dead15res1 & 1u) != 0u ? 1u : 0u));
                GLF_dead15_GLF_color = vec4(GLF_dead15res, GLF_dead15res, GLF_dead15res, 1.0);
            } else {
                ivec2 GLF_dead15icoord = ivec2(((GLF_live5pos - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                int GLF_dead15res3 = ((GLF_dead15icoord.x >> 5) & 1) ^ ((GLF_dead15icoord.y & 32) >> 5);
                int GLF_dead15res2 = (GLF_dead15icoord.y * GLF_dead15icoord.y >> 10) & 1;
                int GLF_dead15res1 = (GLF_dead15icoord.x * GLF_dead15icoord.y >> 9) & 1;
                GLF_dead15_GLF_color = vec4(float(GLF_dead15res1 ^ GLF_dead15res2), float(GLF_dead15res2 & GLF_dead15res3), float(GLF_dead15res1 | GLF_dead15res3), 1.0);
            }
        }
    }
    return true;
}

vec4 GLF_dead3_GLF_color = _GLF_FUZZED(vec4(5965.9822, 0.5, 5.1, 9.3));

struct GLF_dead3BST {
    int data;
    int leftIndex;
    int rightIndex;
};

GLF_dead3BST GLF_dead3tree[10] = GLF_dead3BST[10](GLF_dead3BST(0, 0, 0), GLF_dead3BST(0, 0, 0), GLF_dead3BST(0, 0, 0), GLF_dead3BST(0, 0, 0), GLF_dead3BST(0, 0, 0), GLF_dead3BST(0, 0, 0), GLF_dead3BST(0, 0, 0), GLF_dead3BST(0, 0, 0), GLF_dead3BST(0, 0, 0), GLF_dead3BST(0, 0, 0));

void GLF_dead3makeTreeNode(inout GLF_dead3BST GLF_dead3tree, int GLF_dead3data) {
    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
        {
            GLF_dead3data += 1;
        }
    }
    GLF_dead3tree.data = GLF_dead3data;
    GLF_dead3tree.leftIndex = -1;
    if (_GLF_DEAD(false)) {
        float donor_replacementGLF_dead7s = _GLF_FUZZED(5.6);
        {
            donor_replacementGLF_dead7s += 0.2;
        }
    }
    {
        int GLF_live13iteration = _GLF_FUZZED(((-50303) | 86255));
        if (GLF_live13iteration < 1000) {
            ;
        } else {
            ;
        }
    }
    GLF_dead3tree.rightIndex = -1;
}

int GLF_dead0map[16 * 16] = int[256](0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);

ivec2 GLF_dead1iter(ivec2 GLF_dead1p) {
    if (GLF_dead1p.x > 0) {
        GLF_dead1p.y--;
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
            vec4 donor_replacementGLF_dead7c = _GLF_FUZZED(GLF_dead3_GLF_color);
            int donor_replacementGLF_dead7i = _GLF_FUZZED(abs(GLF_live4msb8));
            {
                donor_replacementGLF_dead7c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead7i, 4)] = donor_replacementGLF_dead7c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead7i, 4)] * donor_replacementGLF_dead7c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead7i, 4)];
            }
        }
    }
    if (GLF_dead1p.x < 0) {
        GLF_dead1p.y++;
        {
            float GLF_live4s = _GLF_FUZZED(3.2);
            {
                if (_GLF_DEAD(_GLF_IDENTITY(_GLF_FALSE(false, (gl_FragCoord.x < length(vec2(0.0, 0.0)))), true && (_GLF_FALSE(false, (gl_FragCoord.x < length(vec2(0.0, 0.0)))))))) {
                    vec2 donor_replacementGLF_dead15coord = _GLF_FUZZED(injectionSwitch);
                    {
                        ivec2 GLF_dead15icoord = ivec2(((donor_replacementGLF_dead15coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.6, 1.0)) * 256.0);
                        int GLF_dead15v = (GLF_dead15icoord.x ^ GLF_dead15icoord.y) * GLF_dead15icoord.y;
                        bool GLF_dead15res1 = ((GLF_dead15v >> 10) & 1) != 0;
                        bool GLF_dead15res2 = ((GLF_dead15v >> 11) & 4) != 0;
                        bool GLF_dead15res3 = ((GLF_dead15v >> 12) & 8) != 0;
                        GLF_dead15_GLF_color = vec4(GLF_dead15res1 ? 1.0 : 0.0, GLF_dead15res2 ? 1.0 : 0.0, GLF_dead15res3 ? 1.0 : 0.0, 1);
                    }
                }
                GLF_live4s += 0.2;
                if (_GLF_DEAD(false)) {
                    {
                        ;
                    }
                }
            }
        }
        {
            bool GLF_live11c1 = _GLF_FUZZED(true);
            bool GLF_live11c2 = _GLF_FUZZED(true);
            bool GLF_live11c3 = _GLF_FUZZED(false);
            vec3 GLF_live11col = _GLF_FUZZED((9.4 - vec3(-83.49, -3.5, 0.3)));
            vec2 GLF_live11uv = _GLF_FUZZED(vec3(71.48, -413.331, 6.1).pt);
            if (!GLF_live11c1 && !GLF_live11c2 && GLF_live11c3) {
                float GLF_live11stripe = GLF_live11compute_stripe(cos((GLF_live11uv.x + GLF_live11uv.y) * 20.0), GLF_live11uv.x + GLF_live11uv.y);
                GLF_live11col = mix(vec3(.7, sinh(GLF_live11uv.x), GLF_live11uv.x), vec3(.3, .5, GLF_live11uv.x), GLF_live11stripe);
                GLF_live11_GLF_color = vec4(GLF_live11col, 1.0);
                ;
            }
        }
    }
    {
        vec3 GLF_live11col = _GLF_FUZZED((vec3(-916.664, -3335.0702, 6.0) + vec3(-4.2, 57.91, 28.57)));
        vec2 GLF_live11uv = _GLF_FUZZED((-vec2(-9.5, 6990.2530)));
        {
            if (_GLF_DEAD(false)) {
                bool donor_replacementGLF_dead17c1 = _GLF_FUZZED(true);
                bool donor_replacementGLF_dead17c2 = _GLF_FUZZED(true);
                bool donor_replacementGLF_dead17c3 = _GLF_FUZZED(false);
                if (!donor_replacementGLF_dead17c1 && !donor_replacementGLF_dead17c2 && donor_replacementGLF_dead17c3) {
                    float GLF_dead17stripe = GLF_dead17compute_stripe(cos((GLF_live11uv.x + GLF_live11uv.y) * 20.0), GLF_live11uv.x + GLF_live11uv.y);
                    GLF_live11col = mix(vec3(.7, sinh(GLF_live11uv.x), GLF_live11uv.x), vec3(.3, .5, GLF_live11uv.x), GLF_dead17stripe);
                    GLF_dead17_GLF_color = vec4(GLF_live11col, 1.0);
                    ;
                }
            }
            float GLF_live11stripe = GLF_live11compute_stripe(cos((GLF_live11uv.x + GLF_live11uv.y) * 20.0), GLF_live11uv.x + GLF_live11uv.y);
            GLF_live11col = mix(vec3(.7, sinh(GLF_live11uv.x), GLF_live11uv.x), vec3(.3, .5, GLF_live11uv.x), GLF_live11stripe);
            GLF_live11_GLF_color = vec4(GLF_live11col, 1.0);
            ;
        }
    }
    GLF_dead1p.x += GLF_dead1p.y / 2;
    return GLF_dead1p;
}

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

float _GLF_outlined_0(vec3 temp) {
    return temp.z;
    {
        int GLF_live12looplimiter4 = 0;
        if (GLF_live12looplimiter4 >= 6) {
            ;
        }
    }
    if (_GLF_DEAD(false)) {
        vec2 donor_replacementGLF_dead8coord = _GLF_FUZZED(injectionSwitch);
        for (int GLF_dead8j = 0; GLF_dead8j < 3; GLF_dead8j++) {
            if (_GLF_DEAD(false)) {
                _GLF_color = (GLF_dead9gl_FragCoord * mat4(0.4, 383.779, -5.5, 6428.5231, 3450.0464, -6256.4361, 1.0, -84.69, -0.6, 7.1, 582.740, -4.7, -90.15, 7.2, 905.439, -5840.4876));
            }
            GLF_dead3_GLF_color += texture(GLF_dead8tex, donor_replacementGLF_dead8coord + vec2(float(GLF_live4msb8 - 1) * b_b, float(GLF_dead8j - 1) * b_b)) * GLF_dead8weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live4msb8 * 3 + GLF_dead8j, 9)];
        }
        if (_GLF_DEAD(false)) {
            _GLF_color = GLF_dead3_GLF_color;
        }
    }
}

void doConvert() {
    vec3 temp;
    {
        {
            ;
        }
        if (_GLF_DEAD(false)) {
            _GLF_color = GLF_dead3_GLF_color;
        }
    }
    temp = b_b * (1.0 - s_g) + (b_b - b_b * (1.0 - s_g)) * clamp(abs(abs(6.0 * (h_r - vec3(0, 1, 2) / 3.0)) - 3.0) - 1.0, 0.0, 1.0);
    h_r = temp.x;
    s_g = temp.y;
    if (_GLF_DEAD(false)) {
        if (GLF_live4msb8 < int(GLF_dead9gl_FragCoord.x)) {
            ;
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
            vec2 donor_replacementGLF_dead15coord = _GLF_FUZZED(GLF_live11injectionSwitch);
            if (donor_replacementGLF_dead15coord.x > 0.4) {
                if (donor_replacementGLF_dead15coord.y < 0.6) {
                    uvec2 GLF_dead15icoord = uvec2(((donor_replacementGLF_dead15coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                    uint GLF_dead15res1 = uint(((GLF_dead15icoord.x * GLF_dead15icoord.y) >> (GLF_dead15icoord.x & 31u)) & 0xffffffffu);
                    uint GLF_dead15res2 = uint(((GLF_dead15icoord.x * GLF_dead15icoord.y) << (GLF_dead15icoord.x & 31u)) & 0xffffffffu);
                    float GLF_dead15res = float(((GLF_dead15res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_dead15res1 & 1u) != 0u ? 1u : 0u));
                    GLF_dead15_GLF_color = vec4(GLF_dead15res, GLF_dead15res, GLF_dead15res, 1.0);
                } else {
                    ivec2 GLF_dead15icoord = ivec2(((donor_replacementGLF_dead15coord - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                    int GLF_dead15res3 = ((GLF_dead15icoord.x >> 5) & 1) ^ ((GLF_dead15icoord.y & 32) >> 5);
                    int GLF_dead15res2 = (GLF_dead15icoord.y * GLF_dead15icoord.y >> 10) & 1;
                    int GLF_dead15res1 = (GLF_dead15icoord.x * GLF_dead15icoord.y >> 9) & 1;
                    GLF_dead15_GLF_color = vec4(float(GLF_dead15res1 ^ GLF_dead15res2), float(GLF_dead15res2 & GLF_dead15res3), float(GLF_dead15res1 | GLF_dead15res3), 1.0);
                }
            } else {
                ivec2 GLF_dead15icoord = ivec2(((donor_replacementGLF_dead15coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.6, 1.0)) * 256.0);
                int GLF_dead15v = (GLF_dead15icoord.x ^ GLF_dead15icoord.y) * GLF_dead15icoord.y;
                bool GLF_dead15res1 = ((GLF_dead15v >> 10) & 1) != 0;
                bool GLF_dead15res2 = ((GLF_dead15v >> 11) & 4) != 0;
                bool GLF_dead15res3 = ((GLF_dead15v >> 12) & 8) != 0;
                GLF_dead15_GLF_color = vec4(GLF_dead15res1 ? 1.0 : 0.0, GLF_dead15res2 ? 1.0 : 0.0, GLF_dead15res3 ? 1.0 : 0.0, 1);
            }
        }
    }
    {
        int GLF_live13c_im = _GLF_FUZZED((95897 - (72489)));
        int GLF_live13c_re = _GLF_FUZZED((92831 ^ (-59274)));
        int GLF_live13iteration = _GLF_FUZZED(-17802);
        int GLF_live13x = _GLF_FUZZED(-87167);
        int GLF_live13y = _GLF_FUZZED(-74165);
        {
            if (GLF_live13x * GLF_live13x + GLF_live13y * GLF_live13y > 262144) {
                ;
            }
            int GLF_live13x_new = ((GLF_live13x * GLF_live13x - GLF_live13y * GLF_live13y) / 256 + GLF_live13c_re);
            if (_GLF_DEAD(_GLF_IDENTITY(false, !(!(false))))) {
                vec2 donor_replacementGLF_dead15coord = _GLF_FUZZED(resolution);
                {
                    ivec2 GLF_dead15icoord = ivec2(((donor_replacementGLF_dead15coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.6, 1.0)) * 256.0);
                    int GLF_dead15v = (GLF_dead15icoord.x ^ GLF_dead15icoord.y) * GLF_dead15icoord.y;
                    bool GLF_dead15res1 = ((GLF_dead15v >> 10) & 1) != 0;
                    bool GLF_dead15res2 = ((GLF_dead15v >> 11) & 4) != 0;
                    bool GLF_dead15res3 = ((GLF_dead15v >> 12) & 8) != 0;
                    GLF_dead15_GLF_color = vec4(GLF_dead15res1 ? 1.0 : 0.0, GLF_dead15res2 ? 1.0 : 0.0, GLF_dead15res3 ? 1.0 : 0.0, 1);
                }
            }
            GLF_live13y = (2 * GLF_live13x * GLF_live13y / 256 + GLF_live13c_im);
            if (_GLF_DEAD(false)) {
                int donor_replacementGLF_dead14i = _GLF_FUZZED(GLF_live13c_re);
                uint donor_replacementGLF_dead14uselessOutVariable = _GLF_FUZZED(uvec3(191465u, 74030u, 133819u)[2]);
                if (uint(GLF_live4msb8) < uaddCarry(uint(donor_replacementGLF_dead14i), 1u, donor_replacementGLF_dead14uselessOutVariable)) {
                    ;
                }
            }
            GLF_live13x = GLF_live13x_new;
            GLF_live13iteration++;
        }
    }
    b_b = _GLF_outlined_0(temp);
}

float _GLF_outlined_5() {
    return 1.0;
    if (_GLF_DEAD(false)) {
        vec3 donor_replacementGLF_dead17col = _GLF_FUZZED(vec3(7.3, 1.5, 58.91));
        vec2 donor_replacementGLF_dead17uv = _GLF_FUZZED(injectionSwitch);
        {
            float GLF_dead17stripe = GLF_dead17compute_stripe(tan((donor_replacementGLF_dead17uv.x + donor_replacementGLF_dead17uv.y) * 20.0), donor_replacementGLF_dead17uv.x + donor_replacementGLF_dead17uv.y);
            donor_replacementGLF_dead17col = mix(vec3(donor_replacementGLF_dead17uv.x, .8, 0), vec3(1, donor_replacementGLF_dead17uv.y, 0), GLF_dead17stripe);
            GLF_dead17_GLF_color = vec4(donor_replacementGLF_dead17col, 1.0);
            ;
        }
    }
}

vec3 computeColor(float c, vec2 position) {
    if (_GLF_DEAD(false)) {
        _GLF_color = _GLF_color;
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
            bool donor_replacementGLF_dead17c1 = _GLF_FUZZED((!((mat3(-8395.4020, 9934.4690, -182.816, -8442.8042, -3910.5557, 2.1, 19.64, -8241.6397, -202.507) / mat3(90.84, -68.64, 8.9, 73.98, 2151.5651, -9113.3062, 5.9, 5.5, -4.3)) != mat3(-0.4, 211.471, -2.5, 5.8, 8.0, -0.9, 29.18, 3.5, 2904.1129))));
            bool donor_replacementGLF_dead17c2 = _GLF_FUZZED(((111846u + 113983u) <= uvec4(152835u, 123550u, 34682u, 118907u).a));
            bool donor_replacementGLF_dead17c3 = _GLF_FUZZED(false);
            bool donor_replacementGLF_dead17c4 = _GLF_FUZZED(bvec3(false, false, true)[0]);
            vec3 donor_replacementGLF_dead17col = _GLF_FUZZED((trunc(vec3(21.64, -618.075, -2384.3184)) * vec3(vec2(6.8, -83.93), -327.485)));
            if (!donor_replacementGLF_dead17c1 && !donor_replacementGLF_dead17c2 && !donor_replacementGLF_dead17c3 && donor_replacementGLF_dead17c4) {
                float GLF_dead17stripe = GLF_dead17compute_stripe(tan((position.x + position.y) * 20.0), position.x + position.y);
                donor_replacementGLF_dead17col = mix(vec3(position.x, .8, 0), vec3(1, position.y, 0), GLF_dead17stripe);
                GLF_dead17_GLF_color = vec4(donor_replacementGLF_dead17col, 1.0);
                ;
            }
        }
        if (_GLF_DEAD(false)) {
            _GLF_color = GLF_live11_GLF_color;
        }
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
        vec2 donor_replacementGLF_dead15coord = _GLF_FUZZED(position);
        {
            ivec2 GLF_dead15icoord = ivec2(((donor_replacementGLF_dead15coord - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
            int GLF_dead15res3 = ((GLF_dead15icoord.x >> 5) & 1) ^ ((GLF_dead15icoord.y & 32) >> 5);
            int GLF_dead15res2 = (GLF_dead15icoord.y * GLF_dead15icoord.y >> 10) & 1;
            int GLF_dead15res1 = (GLF_dead15icoord.x * GLF_dead15icoord.y >> 9) & 1;
            GLF_dead15_GLF_color = vec4(float(GLF_dead15res1 ^ GLF_dead15res2), float(GLF_dead15res2 & GLF_dead15res3), float(GLF_dead15res1 | GLF_dead15res3), 1.0);
        }
    }
    if (_GLF_DEAD(false)) {
        _GLF_color = ((GLF_live11_GLF_color) + _GLF_color);
    }
    h_r = fract(c);
    {
        {
            ;
        }
        {
            bool GLF_live11c1 = _GLF_FUZZED(true);
            vec3 GLF_live11col = _GLF_FUZZED((53.71 - vec3(66.69, -920.112, -4.6)));
            vec2 GLF_live11uv = _GLF_FUZZED(vec2(2026.9571, -769.234));
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                _GLF_color = vec4(-52.27, 5208.0697, -6040.1094, -7415.0345);
            }
            if (GLF_live11c1) {
                float GLF_live11stripe = GLF_live11compute_stripe(cos((GLF_live11uv.x + GLF_live11uv.y) * 20.0), GLF_live11uv.x + GLF_live11uv.y);
                GLF_live11col = mix(vec3(GLF_live11uv.x, 0, 0.75), vec3(.8, .7, GLF_live11uv.x), GLF_live11stripe);
                GLF_live11_GLF_color = vec4(GLF_live11col, 1.0);
                ;
            }
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            {
                ;
            }
        }
    }
    if (_GLF_DEAD(false)) {
        if (position.x > 0.4) {
            if (position.y < 0.6) {
                uvec2 GLF_dead15icoord = uvec2(((position - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                uint GLF_dead15res1 = uint(((GLF_dead15icoord.x * GLF_dead15icoord.y) >> (GLF_dead15icoord.x & 31u)) & 0xffffffffu);
                uint GLF_dead15res2 = uint(((GLF_dead15icoord.x * GLF_dead15icoord.y) << (GLF_dead15icoord.x & 31u)) & 0xffffffffu);
                float GLF_dead15res = float(((GLF_dead15res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_dead15res1 & 1u) != 0u ? 1u : 0u));
                GLF_dead15_GLF_color = vec4(GLF_dead15res, GLF_dead15res, GLF_dead15res, 1.0);
            } else {
                ivec2 GLF_dead15icoord = ivec2(((position - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                int GLF_dead15res3 = ((GLF_dead15icoord.x >> 5) & 1) ^ ((GLF_dead15icoord.y & 32) >> 5);
                int GLF_dead15res2 = (GLF_dead15icoord.y * GLF_dead15icoord.y >> 10) & 1;
                int GLF_dead15res1 = (GLF_dead15icoord.x * GLF_dead15icoord.y >> 9) & 1;
                GLF_dead15_GLF_color = vec4(float(GLF_dead15res1 ^ GLF_dead15res2), float(GLF_dead15res2 & GLF_dead15res3), float(GLF_dead15res1 | GLF_dead15res3), 1.0);
            }
        } else {
            ivec2 GLF_dead15icoord = ivec2(((position - vec2(0.4, 0.0)) * vec2(1.0 / 0.6, 1.0)) * 256.0);
            int GLF_dead15v = (GLF_dead15icoord.x ^ GLF_dead15icoord.y) * GLF_dead15icoord.y;
            bool GLF_dead15res1 = ((GLF_dead15v >> 10) & 1) != 0;
            bool GLF_dead15res2 = ((GLF_dead15v >> 11) & 4) != 0;
            bool GLF_dead15res3 = ((GLF_dead15v >> 12) & 8) != 0;
            GLF_dead15_GLF_color = vec4(GLF_dead15res1 ? 1.0 : 0.0, GLF_dead15res2 ? 1.0 : 0.0, GLF_dead15res3 ? 1.0 : 0.0, 1);
        }
    }
    if (_GLF_DEAD(false)) {
        if (GLF_dead3_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_live4msb8, 4)] >= 1.0) {
            GLF_dead3_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_live4msb8, 4)] = GLF_dead3_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_live4msb8, 4)] * GLF_dead3_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_live4msb8, 4)];
            {
                int GLF_live12looplimiter2 = 0;
                if (GLF_live12looplimiter2 >= 6) {
                    ;
                }
            }
        }
    }
    s_g = _GLF_outlined_5();
    b_b = (0.5 + (sin(time) * 0.5 + 0.5));
    doConvert();
    if (_GLF_DEAD(false)) {
        _GLF_color = cosh(_GLF_color);
    }
    s_g *= 1.0 / position.y;
    h_r *= 1.0 / position.x;
    if (_GLF_DEAD(_GLF_IDENTITY(false, bool(bool(false))))) {
        {
            uvec2 GLF_dead15icoord = uvec2(((position - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
            uint GLF_dead15res1 = uint(((GLF_dead15icoord.x * GLF_dead15icoord.y) >> (GLF_dead15icoord.x & 31u)) & 0xffffffffu);
            uint GLF_dead15res2 = uint(((GLF_dead15icoord.x * GLF_dead15icoord.y) << (GLF_dead15icoord.x & 31u)) & 0xffffffffu);
            float GLF_dead15res = float(((GLF_dead15res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_dead15res1 & 1u) != 0u ? 1u : 0u));
            GLF_dead15_GLF_color = vec4(GLF_dead15res, GLF_dead15res, GLF_dead15res, 1.0);
        }
    }
    if (abs(position.y - position.x) < 0.5) {
        b_b = clamp(b_b * 3.0, 0.0, 1.0);
    }
    {
        {
            ;
        }
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
        if (position.x > 0.4) {
            if (position.y < 0.6) {
                uvec2 GLF_dead15icoord = uvec2(((position - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                uint GLF_dead15res1 = uint(((GLF_dead15icoord.x * GLF_dead15icoord.y) >> (GLF_dead15icoord.x & 31u)) & 0xffffffffu);
                uint GLF_dead15res2 = uint(((GLF_dead15icoord.x * GLF_dead15icoord.y) << (GLF_dead15icoord.x & 31u)) & 0xffffffffu);
                float GLF_dead15res = float(((GLF_dead15res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_dead15res1 & 1u) != 0u ? 1u : 0u));
                GLF_dead15_GLF_color = vec4(GLF_dead15res, GLF_dead15res, GLF_dead15res, 1.0);
            } else {
                ivec2 GLF_dead15icoord = ivec2(((position - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                int GLF_dead15res3 = ((GLF_dead15icoord.x >> 5) & 1) ^ ((GLF_dead15icoord.y & 32) >> 5);
                int GLF_dead15res2 = (GLF_dead15icoord.y * GLF_dead15icoord.y >> 10) & 1;
                int GLF_dead15res1 = (GLF_dead15icoord.x * GLF_dead15icoord.y >> 9) & 1;
                GLF_dead15_GLF_color = vec4(float(GLF_dead15res1 ^ GLF_dead15res2), float(GLF_dead15res2 & GLF_dead15res3), float(GLF_dead15res1 | GLF_dead15res3), 1.0);
            }
        } else {
            ivec2 GLF_dead15icoord = ivec2(((position - vec2(0.4, 0.0)) * vec2(1.0 / 0.6, 1.0)) * 256.0);
            int GLF_dead15v = (GLF_dead15icoord.x ^ GLF_dead15icoord.y) * GLF_dead15icoord.y;
            bool GLF_dead15res1 = ((GLF_dead15v >> 10) & 1) != 0;
            bool GLF_dead15res2 = ((GLF_dead15v >> 11) & 4) != 0;
            bool GLF_dead15res3 = ((GLF_dead15v >> 12) & 8) != 0;
            GLF_dead15_GLF_color = vec4(GLF_dead15res1 ? 1.0 : 0.0, GLF_dead15res2 ? 1.0 : 0.0, GLF_dead15res3 ? 1.0 : 0.0, 1);
        }
    }
    return vec3(h_r, s_g, b_b);
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < sqrt(0.0))))) {
        {
            bool GLF_live11c1 = _GLF_FUZZED(true);
            bool GLF_live11c2 = _GLF_FUZZED(true);
            bool GLF_live11c3 = _GLF_FUZZED((99106 == ivec3(12468, -92427, 81543).y));
            vec3 GLF_live11col = _GLF_FUZZED(vec3(-5590.8926, 359.052, -5.7));
            vec2 GLF_live11uv = _GLF_FUZZED(vec2(462.225, -18.29));
            if (!GLF_live11c1 && !GLF_live11c2 && GLF_live11c3) {
                float GLF_live11stripe = GLF_live11compute_stripe(cos((GLF_live11uv.x + GLF_live11uv.y) * 20.0), GLF_live11uv.x + GLF_live11uv.y);
                GLF_live11col = mix(vec3(.7, sinh(GLF_live11uv.x), GLF_live11uv.x), vec3(.3, .5, GLF_live11uv.x), GLF_live11stripe);
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < tan(0.0))))) {
                    _GLF_color = _GLF_color;
                }
                GLF_live11_GLF_color = vec4(GLF_live11col, 1.0);
                ;
            }
        }
        float donor_replacementGLF_dead8uvstep = _GLF_FUZZED((time));
        for (int GLF_dead8j = 0; GLF_dead8j < 3; GLF_dead8j++) {
            GLF_dead3_GLF_color += texture(GLF_dead8tex, position + vec2(float(GLF_live4msb8 - 1) * donor_replacementGLF_dead8uvstep, float(GLF_dead8j - 1) * donor_replacementGLF_dead8uvstep)) * GLF_dead8weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live4msb8 * 3 + GLF_dead8j, 9)];
        }
        {
            vec2 GLF_live10coord = _GLF_FUZZED(vec2(-566.288, -5362.8881));
            {
                ivec2 GLF_live10icoord = ivec2(((GLF_live10coord - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                if (_GLF_DEAD(false)) {
                    {
                        GLF_dead16_GLF_color = vec4(1.0, 1.0, 1.0, 1.0);
                        ;
                    }
                }
                int GLF_live10res3 = ((GLF_live10icoord.x >> 5) & 1) ^ ((GLF_live10icoord.y & 32) >> 5);
                int GLF_live10res2 = (GLF_live10icoord.y * GLF_live10icoord.y >> 10) & 1;
                int GLF_live10res1 = (GLF_live10icoord.x * GLF_live10icoord.y >> 9) & 1;
                GLF_live10_GLF_color = vec4(float(GLF_live10res1 ^ GLF_live10res2), float(GLF_live10res2 & GLF_live10res3), float(GLF_live10res1 | GLF_live10res3), 1.0);
            }
        }
    }
}

vec3 defaultColor() {
    return vec3(0.0);
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
        int donor_replacementGLF_dead7i = _GLF_FUZZED(-31029);
        if (mod(float(donor_replacementGLF_dead7i), s_g) <= 0.01) {
            b_b += 0.2;
        }
    }
}

int _GLF_outlined_1() {
    return 0;
}

vec4 _GLF_outlined_6(vec4 GLF_dead3_GLF_color) {
    return GLF_dead3_GLF_color;
}

vec4 _GLF_outlined_7(vec4 GLF_dead3_GLF_color) {
    return GLF_dead3_GLF_color;
}

vec3 drawShape(vec2 pos, vec2 square, vec3 setting) {
    if (_GLF_DEAD(false)) {
        vec4 donor_replacementGLF_dead8res = _GLF_FUZZED(GLF_dead3_GLF_color);
        for (int GLF_dead8i = 0; GLF_dead8i < 3; GLF_dead8i++) {
            for (int GLF_dead8j = 0; GLF_dead8j < 3; GLF_dead8j++) {
                donor_replacementGLF_dead8res += texture(GLF_dead8tex, pos + vec2(float(GLF_dead8i - 1) * h_r, float(GLF_dead8j - 1) * h_r)) * GLF_dead8weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead8i * 3 + GLF_dead8j, 9)];
            }
        }
        {
            if (_GLF_DEAD(false)) {
                if (pos.y < 0.6) {
                    uvec2 GLF_dead15icoord = uvec2(((pos - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                    uint GLF_dead15res1 = uint(((GLF_dead15icoord.x * GLF_dead15icoord.y) >> (GLF_dead15icoord.x & 31u)) & 0xffffffffu);
                    uint GLF_dead15res2 = uint(((GLF_dead15icoord.x * GLF_dead15icoord.y) << (GLF_dead15icoord.x & 31u)) & 0xffffffffu);
                    float GLF_dead15res = float(((GLF_dead15res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_dead15res1 & 1u) != 0u ? 1u : 0u));
                    GLF_dead15_GLF_color = vec4(GLF_dead15res, GLF_dead15res, GLF_dead15res, 1.0);
                } else {
                    ivec2 GLF_dead15icoord = ivec2(((pos - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                    int GLF_dead15res3 = ((GLF_dead15icoord.x >> 5) & 1) ^ ((GLF_dead15icoord.y & 32) >> 5);
                    int GLF_dead15res2 = (GLF_dead15icoord.y * GLF_dead15icoord.y >> 10) & 1;
                    int GLF_dead15res1 = (GLF_dead15icoord.x * GLF_dead15icoord.y >> 9) & 1;
                    GLF_dead15_GLF_color = vec4(float(GLF_dead15res1 ^ GLF_dead15res2), float(GLF_dead15res2 & GLF_dead15res3), float(GLF_dead15res1 | GLF_dead15res3), 1.0);
                }
            }
            vec3 GLF_live11col = _GLF_FUZZED(((-vec2(-261.434, 8.3).x) * vec3(-13.69, 8.0, -4.8)));
            vec2 GLF_live11uv = _GLF_FUZZED((mat3x2(9.5, 52.89, 1.7, -978.187, -2.9, 4.6) * vec3(-927.188, 8.5, -28.43)));
            {
                float GLF_live11stripe = GLF_live11compute_stripe(tan((GLF_live11uv.x + GLF_live11uv.y) * 20.0), GLF_live11uv.x + GLF_live11uv.y);
                GLF_live11col = mix(vec3(GLF_live11uv.x, .8, 0), vec3(1, GLF_live11uv.y, 0), GLF_live11stripe);
                GLF_live11_GLF_color = vec4(GLF_live11col, 1.0);
                ;
            }
        }
    }
    bool c1 = pos.x - setting.x < square.x;
    {
        if (_GLF_DEAD(false)) {
            _GLF_color = vec4(102.711, 31.80, -319.250, 3.7);
        }
        vec3 GLF_live11col = _GLF_FUZZED((vec3(-4498.4585, -8844.6365, -1421.3934) * (vec3(3.3, 81.74, 5312.9974) * vec3(7.3, 1629.5297, 521.826))));
        if (_GLF_DEAD(false)) {
            _GLF_color = GLF_dead3_GLF_color;
        }
        if (_GLF_DEAD(false)) {
            vec2 donor_replacementGLF_dead15coord = _GLF_FUZZED(tan(GLF_live12injectionSwitch));
            if (donor_replacementGLF_dead15coord.x > 0.4) {
                if (donor_replacementGLF_dead15coord.y < 0.6) {
                    uvec2 GLF_dead15icoord = uvec2(((donor_replacementGLF_dead15coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                    uint GLF_dead15res1 = uint(((GLF_dead15icoord.x * GLF_dead15icoord.y) >> (GLF_dead15icoord.x & 31u)) & 0xffffffffu);
                    uint GLF_dead15res2 = uint(((GLF_dead15icoord.x * GLF_dead15icoord.y) << (GLF_dead15icoord.x & 31u)) & 0xffffffffu);
                    float GLF_dead15res = float(((GLF_dead15res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_dead15res1 & 1u) != 0u ? 1u : 0u));
                    GLF_dead15_GLF_color = vec4(GLF_dead15res, GLF_dead15res, GLF_dead15res, 1.0);
                } else {
                    ivec2 GLF_dead15icoord = ivec2(((donor_replacementGLF_dead15coord - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                    int GLF_dead15res3 = ((GLF_dead15icoord.x >> 5) & 1) ^ ((GLF_dead15icoord.y & 32) >> 5);
                    int GLF_dead15res2 = (GLF_dead15icoord.y * GLF_dead15icoord.y >> 10) & 1;
                    int GLF_dead15res1 = (GLF_dead15icoord.x * GLF_dead15icoord.y >> 9) & 1;
                    GLF_dead15_GLF_color = vec4(float(GLF_dead15res1 ^ GLF_dead15res2), float(GLF_dead15res2 & GLF_dead15res3), float(GLF_dead15res1 | GLF_dead15res3), 1.0);
                }
            } else {
                ivec2 GLF_dead15icoord = ivec2(((donor_replacementGLF_dead15coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.6, 1.0)) * 256.0);
                int GLF_dead15v = (GLF_dead15icoord.x ^ GLF_dead15icoord.y) * GLF_dead15icoord.y;
                bool GLF_dead15res1 = ((GLF_dead15v >> 10) & 1) != 0;
                bool GLF_dead15res2 = ((GLF_dead15v >> 11) & 4) != 0;
                bool GLF_dead15res3 = ((GLF_dead15v >> 12) & 8) != 0;
                GLF_dead15_GLF_color = vec4(GLF_dead15res1 ? 1.0 : 0.0, GLF_dead15res2 ? 1.0 : 0.0, GLF_dead15res3 ? 1.0 : 0.0, 1);
            }
        }
        vec2 GLF_live11uv = _GLF_FUZZED(vec2(-42.65, 3.7));
        {
            float GLF_live11stripe = GLF_live11compute_stripe(cos((GLF_live11uv.x + GLF_live11uv.y) * 20.0), GLF_live11uv.x + GLF_live11uv.y);
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                vec2 donor_replacementGLF_dead15coord = _GLF_FUZZED(tanh(vec2(-1850.3330, 129.288)));
                {
                    if (donor_replacementGLF_dead15coord.y < 0.6) {
                        uvec2 GLF_dead15icoord = uvec2(((donor_replacementGLF_dead15coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                        uint GLF_dead15res1 = uint(((GLF_dead15icoord.x * GLF_dead15icoord.y) >> (GLF_dead15icoord.x & 31u)) & 0xffffffffu);
                        uint GLF_dead15res2 = uint(((GLF_dead15icoord.x * GLF_dead15icoord.y) << (GLF_dead15icoord.x & 31u)) & 0xffffffffu);
                        float GLF_dead15res = float(((GLF_dead15res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_dead15res1 & 1u) != 0u ? 1u : 0u));
                        GLF_dead15_GLF_color = vec4(GLF_dead15res, GLF_dead15res, GLF_dead15res, 1.0);
                    } else {
                        ivec2 GLF_dead15icoord = ivec2(((donor_replacementGLF_dead15coord - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                        int GLF_dead15res3 = ((GLF_dead15icoord.x >> 5) & 1) ^ ((GLF_dead15icoord.y & 32) >> 5);
                        int GLF_dead15res2 = (GLF_dead15icoord.y * GLF_dead15icoord.y >> 10) & 1;
                        int GLF_dead15res1 = (GLF_dead15icoord.x * GLF_dead15icoord.y >> 9) & 1;
                        GLF_dead15_GLF_color = vec4(float(GLF_dead15res1 ^ GLF_dead15res2), float(GLF_dead15res2 & GLF_dead15res3), float(GLF_dead15res1 | GLF_dead15res3), 1.0);
                    }
                }
            }
            GLF_live11col = mix(vec3(.7, sinh(GLF_live11uv.x), GLF_live11uv.x), vec3(.3, .5, GLF_live11uv.x), GLF_live11stripe);
            GLF_live11_GLF_color = vec4(GLF_live11col, 1.0);
            ;
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                _GLF_color = _GLF_color;
            }
        }
    }
    if (!c1) {
        if (_GLF_DEAD(false)) {
            if (_GLF_DEAD(false)) {
                _GLF_color = GLF_live10_GLF_color;
            }
            int donor_replacementGLF_dead8i = _GLF_FUZZED(bitfieldInsert(79674, findLSB(108128u), GLF_live4msb8, findMSB(GLF_live4msb8)));
            float donor_replacementGLF_dead8uvstep = _GLF_FUZZED(fract(cosh(dFdyCoarse(43.83))));
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                {
                    ;
                }
            }
            {
                for (int GLF_dead8j = 0; GLF_dead8j < 3; GLF_dead8j++) {
                    GLF_dead3_GLF_color += texture(GLF_dead8tex, pos + vec2(float(donor_replacementGLF_dead8i - 1) * donor_replacementGLF_dead8uvstep, float(GLF_dead8j - 1) * donor_replacementGLF_dead8uvstep)) * GLF_dead8weights[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead8i * 3 + GLF_dead8j, 9)];
                    if (_GLF_DEAD(_GLF_IDENTITY(false, !(!(false))))) {
                        _GLF_color = (mat4(-54.05, -0.0, 83.60, -42.28, 505.275, -6.2, 9623.3807, -9829.8789, -825.876, 92.93, -8.8, -27.60, 63.82, -4502.3746, -590.346, 885.477) * GLF_live11_GLF_color);
                    }
                }
            }
        }
        return defaultColor();
    }
    if (_GLF_DEAD(false)) {
        ivec2 donor_replacementGLF_dead16p = _GLF_FUZZED(ivec2(-20165, 92416));
        if (donor_replacementGLF_dead16p.x > 0 && GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead16p.x - 2) + (donor_replacementGLF_dead16p.y) * 16, 256)] == 0) {
            GLF_live4msb8 += 1;
        }
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
        _GLF_color = pow(GLF_dead9gl_FragCoord, vec4(-12.90, 6.5, -9.0, -4.1));
    }
    bool c2 = pos.x + setting.x > square.x;
    if (!c2) {
        return defaultColor();
    }
    bool c3 = pos.y - setting.x < square.y;
    if (!c3) {
        return defaultColor();
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < abs(0.0))))) {
        int donor_replacementGLF_dead16d = _GLF_FUZZED(GLF_live4msb8);
        ivec2 donor_replacementGLF_dead16p = _GLF_FUZZED(ivec2(-56961, -92269));
        {
            donor_replacementGLF_dead16d--;
            GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead16p.x) + (donor_replacementGLF_dead16p.y) * 16, 256)] = 1;
            GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead16p.x) + (donor_replacementGLF_dead16p.y - 1) * 16, 256)] = 1;
            GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead16p.x) + (donor_replacementGLF_dead16p.y - 2) * 16, 256)] = 1;
            donor_replacementGLF_dead16p.y -= 2;
        }
    }
    if (_GLF_DEAD(false)) {
        _GLF_color = GLF_dead9gl_FragCoord;
    }
    if (_GLF_DEAD(false)) {
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            vec2 donor_replacementGLF_dead8coord = _GLF_FUZZED(pos);
            vec4 donor_replacementGLF_dead8res = _GLF_FUZZED(vec4(6476.9179, -2.8, -8.1, 2.8));
            for (int GLF_dead8j = 0; GLF_dead8j < 3; GLF_dead8j++) {
                donor_replacementGLF_dead8res += texture(GLF_dead8tex, donor_replacementGLF_dead8coord + vec2(float(GLF_live4msb8 - 1) * b_b, float(GLF_dead8j - 1) * b_b)) * GLF_dead8weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live4msb8 * 3 + GLF_dead8j, 9)];
            }
        }
        int donor_replacementGLF_dead0directions = _GLF_FUZZED(-13933);
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            vec2 donor_replacementGLF_dead8coord = _GLF_FUZZED(injectionSwitch);
            for (int GLF_dead8i = 0; GLF_dead8i < 3; GLF_dead8i++) {
                for (int GLF_dead8j = 0; GLF_dead8j < 3; GLF_dead8j++) {
                    _GLF_color += texture(GLF_dead8tex, donor_replacementGLF_dead8coord + vec2(float(GLF_dead8i - 1) * s_g, float(GLF_dead8j - 1) * s_g)) * GLF_dead8weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead8i * 3 + GLF_dead8j, 9)];
                }
            }
        }
        int donor_replacementGLF_dead0i = _GLF_FUZZED((9542 + (91352 * (-82084))));
        {
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                if (float(donor_replacementGLF_dead0directions) >= h_r) {
                    ;
                }
                {
                    {
                        ;
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        vec2 donor_replacementGLF_dead17uv = _GLF_FUZZED(cos(resolution));
                        {
                            float GLF_dead17stripe = GLF_dead17compute_stripe(cos((donor_replacementGLF_dead17uv.x + donor_replacementGLF_dead17uv.y) * 20.0), donor_replacementGLF_dead17uv.x + donor_replacementGLF_dead17uv.y);
                            setting = mix(vec3(donor_replacementGLF_dead17uv.x, 0, 0.75), vec3(.8, .7, donor_replacementGLF_dead17uv.x), GLF_dead17stripe);
                            GLF_dead17_GLF_color = vec4(setting, 1.0);
                            ;
                        }
                    }
                }
            }
            int GLF_live4i = _GLF_FUZZED(28712);
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                {
                    GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT(GLF_live4msb8, 256)] = 0;
                }
            }
            float GLF_live4limit = _GLF_FUZZED(-0.6);
            float GLF_live4s = _GLF_FUZZED(5.8);
            if (float(GLF_live4i) >= GLF_live4limit) {
                ;
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < _GLF_IDENTITY(dot(vec2(0.0, 1.0), vec2(1.0, 0.0)), dot(vec2(0.0, 1.0), vec2(1.0, 0.0))))))) {
                    _GLF_color = (h_r / degrees(_GLF_color));
                }
            }
        }
        ivec2 donor_replacementGLF_dead0p = _GLF_FUZZED((ivec2(72981, -67260) >> (abs(-76978) * ivec2(58114, 79475))));
        int donor_replacementGLF_dead0v = _GLF_FUZZED(-88977);
        if (donor_replacementGLF_dead0directions == 0) {
            c2 = false;
            int GLF_dead0j = _GLF_FUZZED(-5671);
            for (donor_replacementGLF_dead0i = _GLF_outlined_1(); donor_replacementGLF_dead0i < 8; donor_replacementGLF_dead0i++) {
                if (_GLF_DEAD(false)) {
                    if (_GLF_DEAD(false)) {
                        _GLF_color = GLF_live11_GLF_color;
                    }
                    _GLF_color = (mat4(mat3(564.501, 38.54, -8533.6500, -746.331, -407.258, -63.78, 39.86, 21.65, 2.7)))[2];
                }
                if (_GLF_DEAD(false)) {
                    bool donor_replacementGLF_dead17c1 = _GLF_FUZZED((107938u == 75316u));
                    vec2 donor_replacementGLF_dead17uv = _GLF_FUZZED(tan(resolution));
                    if (!donor_replacementGLF_dead17c1 && !c1 && c2) {
                        float GLF_dead17stripe = GLF_dead17compute_stripe(cos((donor_replacementGLF_dead17uv.x + donor_replacementGLF_dead17uv.y) * 20.0), donor_replacementGLF_dead17uv.x + donor_replacementGLF_dead17uv.y);
                        setting = mix(vec3(.7, sinh(donor_replacementGLF_dead17uv.x), donor_replacementGLF_dead17uv.x), vec3(.3, .5, donor_replacementGLF_dead17uv.x), GLF_dead17stripe);
                        GLF_dead17_GLF_color = vec4(setting, 1.0);
                        ;
                    }
                }
                for (GLF_dead0j = 0; GLF_dead0j < 8; GLF_dead0j++) {
                    {
                        {
                            if (_GLF_DEAD(false)) {
                                _GLF_color = GLF_dead9gl_FragCoord;
                            }
                            int GLF_live12h = _GLF_FUZZED(((12101) - ivec3(-95792, -89718, -63824).r));
                            int GLF_live12i = _GLF_FUZZED(int(195844u));
                            int GLF_live12l = _GLF_FUZZED((12481 ^ ivec4(52285, -71139, -88441, -23196).g));
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                {
                                    float GLF_dead17stripe = GLF_dead17compute_stripe(tan((square.x + square.y) * 20.0), square.x + square.y);
                                    setting = mix(vec3(0.5, square.x, 0.1), vec3(.4, 0, .5), GLF_dead17stripe);
                                    GLF_dead17_GLF_color = vec4(setting, 1.0);
                                    ;
                                }
                            }
                            int GLF_live12pivot = _GLF_FUZZED((((true ? (-82009) : 58078) ^ ((-30687) | 51347)) & 98606));
                            {
                                int GLF_live12looplimiter0 = 0;
                                for (int GLF_live12j = GLF_live12l; GLF_live12j <= GLF_live12h - 1; GLF_live12j++) {
                                    if (GLF_live12looplimiter0 >= 6) {
                                        break;
                                    }
                                    GLF_live12looplimiter0++;
                                    {
                                        if (GLF_live12obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12j, 10)] <= GLF_live12pivot) {
                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                bool donor_replacementGLF_dead16canwalk = _GLF_FUZZED((mat4(271.054, 9098.5964, -316.895, 658.605, 146.943, -6.6, -1.9, 9551.9407, -7.0, 9.9, 2.5, -310.989, 51.96, 7.3, -5522.9982, -75.01) == (s_g * mat4(-2404.8778, 4993.5670, 7473.3095, 764.527, 1.8, 903.411, 1917.4967, -667.744, -96.89, -87.32, 5617.9806, -29.80, -2.1, -491.744, 11.87, 42.15))));
                                                ivec2 donor_replacementGLF_dead16p = _GLF_FUZZED(ivec2(40792, 84359));
                                                if (GLF_live12i == 0) {
                                                    donor_replacementGLF_dead16canwalk = false;
                                                    int GLF_dead16j = _GLF_FUZZED(ivec2(-92251, 95393)[1]);
                                                    for (donor_replacementGLF_dead0v = 0; donor_replacementGLF_dead0v < 8; donor_replacementGLF_dead0v++) {
                                                        for (GLF_dead16j = 0; GLF_dead16j < 8; GLF_dead16j++) {
                                                            if (GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead16j * 2 + donor_replacementGLF_dead0v * 2 * 16, 256)] == 0) {
                                                                donor_replacementGLF_dead16p.x = GLF_dead16j * 2;
                                                                donor_replacementGLF_dead16p.y = donor_replacementGLF_dead0v * 2;
                                                                donor_replacementGLF_dead16canwalk = true;
                                                            }
                                                        }
                                                    }
                                                    GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead16p.x) + (donor_replacementGLF_dead16p.y) * 16, 256)] = 1;
                                                } else {
                                                    int GLF_dead16d = donor_replacementGLF_dead0v % GLF_live12i;
                                                    donor_replacementGLF_dead0v += GLF_live12i;
                                                    if (GLF_dead16d >= 0 && donor_replacementGLF_dead16p.x > 0 && GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead16p.x - 2) + (donor_replacementGLF_dead16p.y) * 16, 256)] == 0) {
                                                        GLF_dead16d--;
                                                        GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead16p.x) + (donor_replacementGLF_dead16p.y) * 16, 256)] = 1;
                                                        GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead16p.x - 1) + (donor_replacementGLF_dead16p.y) * 16, 256)] = 1;
                                                        GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead16p.x - 2) + (donor_replacementGLF_dead16p.y) * 16, 256)] = 1;
                                                        donor_replacementGLF_dead16p.x -= 2;
                                                    }
                                                    if (GLF_dead16d >= 0 && donor_replacementGLF_dead16p.y > 0 && GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead16p.x) + (donor_replacementGLF_dead16p.y - 2) * 16, 256)] == 0) {
                                                        GLF_dead16d--;
                                                        GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead16p.x) + (donor_replacementGLF_dead16p.y) * 16, 256)] = 1;
                                                        GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead16p.x) + (donor_replacementGLF_dead16p.y - 1) * 16, 256)] = 1;
                                                        GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead16p.x) + (donor_replacementGLF_dead16p.y - 2) * 16, 256)] = 1;
                                                        donor_replacementGLF_dead16p.y -= 2;
                                                    }
                                                    if (GLF_dead16d >= 0 && donor_replacementGLF_dead16p.x < 14 && GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead16p.x + 2) + (donor_replacementGLF_dead16p.y) * 16, 256)] == 0) {
                                                        GLF_dead16d--;
                                                        GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead16p.x) + (donor_replacementGLF_dead16p.y) * 16, 256)] = 1;
                                                        GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead16p.x + 1) + (donor_replacementGLF_dead16p.y) * 16, 256)] = 1;
                                                        GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead16p.x + 2) + (donor_replacementGLF_dead16p.y) * 16, 256)] = 1;
                                                        donor_replacementGLF_dead16p.x += 2;
                                                    }
                                                    if (GLF_dead16d >= 0 && donor_replacementGLF_dead16p.y < 14 && GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead16p.x) + (donor_replacementGLF_dead16p.y + 2) * 16, 256)] == 0) {
                                                        GLF_dead16d--;
                                                        GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead16p.x) + (donor_replacementGLF_dead16p.y) * 16, 256)] = 1;
                                                        GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead16p.x) + (donor_replacementGLF_dead16p.y + 1) * 16, 256)] = 1;
                                                        GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead16p.x) + (donor_replacementGLF_dead16p.y + 2) * 16, 256)] = 1;
                                                        donor_replacementGLF_dead16p.y += 2;
                                                    }
                                                }
                                            }
                                            GLF_live12i++;
                                            GLF_live12swap(GLF_live12i, GLF_live12j);
                                        }
                                    }
                                }
                            }
                        }
                        if (_GLF_DEAD(false)) {
                            if (donor_replacementGLF_dead0v >= 0 && donor_replacementGLF_dead0p.y < 14 && GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead0p.x) + (donor_replacementGLF_dead0p.y + 2) * 16, 256)] == 0) {
                                donor_replacementGLF_dead0v--;
                                GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead0p.x) + (donor_replacementGLF_dead0p.y) * 16, 256)] = 1;
                                GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead0p.x) + (donor_replacementGLF_dead0p.y + 1) * 16, 256)] = 1;
                                GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead0p.x) + (donor_replacementGLF_dead0p.y + 2) * 16, 256)] = 1;
                                donor_replacementGLF_dead0p.y += 2;
                            }
                        }
                        vec4 GLF_live4c = _GLF_FUZZED(vec4(-8832.8852, 3190.3141, -4328.6950, 11.03));
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            _GLF_color = vec4(-0.1, 71.95, 156.579, 373.274);
                        }
                        int GLF_live4i = _GLF_FUZZED(72776);
                        int GLF_live4looplimiter1 = 0;
                        int GLF_live4msb8 = _GLF_FUZZED(ivec2(-63100, 26070).r);
                        if (_GLF_DEAD(false)) {
                            _GLF_color = uintBitsToFloat(uvec4(171274u, 46665u, 172220u, 46609u));
                        }
                        do {
                            if (GLF_live4looplimiter1 >= 4) {
                                {
                                    {
                                        int GLF_live12looplimiter2 = 0;
                                        for (int GLF_live12i = int(GLF_live12injectionSwitch.x); GLF_live12i < 10; GLF_live12i++) {
                                            if (GLF_live12looplimiter2 >= 6) {
                                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                    {
                                                        int GLF_dead16d = donor_replacementGLF_dead0v % GLF_live12looplimiter2;
                                                        donor_replacementGLF_dead0v += GLF_live12looplimiter2;
                                                        if (GLF_dead16d >= 0 && donor_replacementGLF_dead0p.x > 0 && GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead0p.x - 2) + (donor_replacementGLF_dead0p.y) * 16, 256)] == 0) {
                                                            GLF_dead16d--;
                                                            GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead0p.x) + (donor_replacementGLF_dead0p.y) * 16, 256)] = 1;
                                                            GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead0p.x - 1) + (donor_replacementGLF_dead0p.y) * 16, 256)] = 1;
                                                            GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead0p.x - 2) + (donor_replacementGLF_dead0p.y) * 16, 256)] = 1;
                                                            donor_replacementGLF_dead0p.x -= 2;
                                                        }
                                                        if (GLF_dead16d >= 0 && donor_replacementGLF_dead0p.y > 0 && GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead0p.x) + (donor_replacementGLF_dead0p.y - 2) * 16, 256)] == 0) {
                                                            GLF_dead16d--;
                                                            GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead0p.x) + (donor_replacementGLF_dead0p.y) * 16, 256)] = 1;
                                                            GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead0p.x) + (donor_replacementGLF_dead0p.y - 1) * 16, 256)] = 1;
                                                            GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead0p.x) + (donor_replacementGLF_dead0p.y - 2) * 16, 256)] = 1;
                                                            donor_replacementGLF_dead0p.y -= 2;
                                                        }
                                                        if (GLF_dead16d >= 0 && donor_replacementGLF_dead0p.x < 14 && GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead0p.x + 2) + (donor_replacementGLF_dead0p.y) * 16, 256)] == 0) {
                                                            GLF_dead16d--;
                                                            GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead0p.x) + (donor_replacementGLF_dead0p.y) * 16, 256)] = 1;
                                                            GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead0p.x + 1) + (donor_replacementGLF_dead0p.y) * 16, 256)] = 1;
                                                            GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead0p.x + 2) + (donor_replacementGLF_dead0p.y) * 16, 256)] = 1;
                                                            donor_replacementGLF_dead0p.x += 2;
                                                        }
                                                        if (GLF_dead16d >= 0 && donor_replacementGLF_dead0p.y < 14 && GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead0p.x) + (donor_replacementGLF_dead0p.y + 2) * 16, 256)] == 0) {
                                                            GLF_dead16d--;
                                                            GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead0p.x) + (donor_replacementGLF_dead0p.y) * 16, 256)] = 1;
                                                            GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead0p.x) + (donor_replacementGLF_dead0p.y + 1) * 16, 256)] = 1;
                                                            GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead0p.x) + (donor_replacementGLF_dead0p.y + 2) * 16, 256)] = 1;
                                                            donor_replacementGLF_dead0p.y += 2;
                                                        }
                                                    }
                                                }
                                                break;
                                            }
                                            GLF_live12looplimiter2++;
                                            if (_GLF_DEAD(false)) {
                                                _GLF_color = GLF_live10_GLF_color;
                                            }
                                            {
                                                GLF_live12obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12i, 10)] = (10 - GLF_live12i) * int(GLF_live12injectionSwitch.y);
                                            }
                                        }
                                        if (_GLF_DEAD(false)) {
                                            if (!c1 && !c3 && !c1 && c1) {
                                                float GLF_dead17stripe = GLF_dead17compute_stripe(tan((square.x + square.y) * 20.0), square.x + square.y);
                                                setting = mix(vec3(square.x, .8, 0), vec3(1, square.y, 0), GLF_dead17stripe);
                                                GLF_dead17_GLF_color = vec4(setting, 1.0);
                                                ;
                                            }
                                        }
                                    }
                                }
                                break;
                            }
                            GLF_live4looplimiter1++;
                            {
                                if (GLF_live4c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live4i, 4)] >= 1.0) {
                                    GLF_live4c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live4i, 4)] = GLF_live4c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live4i, 4)] * GLF_live4c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live4i, 4)];
                                }
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                    _GLF_color = GLF_live4c;
                                }
                                GLF_live4i++;
                            }
                        } while (GLF_live4i < findMSB(findLSB(GLF_live4msb8)));
                    }
                    if (_GLF_DEAD(false)) {
                        _GLF_color = (GLF_live11_GLF_color / determinant(mat3(-31.89, -122.336, 66.63, -5.2, -6746.5319, -671.909, -493.260, 9893.7892, -8.0)));
                    }
                    if (GLF_dead0map[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead0j * 2 + donor_replacementGLF_dead0i * 2 * 16, 256)] == 0) {
                        if (_GLF_DEAD(false)) {
                            vec2 donor_replacementGLF_dead8coord = _GLF_FUZZED(pos);
                            vec4 donor_replacementGLF_dead8res = _GLF_FUZZED(GLF_dead3_GLF_color);
                            if (_GLF_DEAD(_GLF_IDENTITY(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)), bool(bvec4(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)), true, false, true))))) {
                                {
                                    uvec2 GLF_dead15icoord = uvec2(((square - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                                    uint GLF_dead15res1 = uint(((GLF_dead15icoord.x * GLF_dead15icoord.y) >> (GLF_dead15icoord.x & 31u)) & 0xffffffffu);
                                    uint GLF_dead15res2 = uint(((GLF_dead15icoord.x * GLF_dead15icoord.y) << (GLF_dead15icoord.x & 31u)) & 0xffffffffu);
                                    float GLF_dead15res = float(((GLF_dead15res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_dead15res1 & 1u) != 0u ? 1u : 0u));
                                    GLF_dead15_GLF_color = vec4(GLF_dead15res, GLF_dead15res, GLF_dead15res, 1.0);
                                }
                            }
                            for (int GLF_dead8i = 0; GLF_dead8i < 3; GLF_dead8i++) {
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = inversesqrt(_GLF_color);
                                }
                                for (int GLF_dead8j = 0; GLF_dead8j < 3; GLF_dead8j++) {
                                    donor_replacementGLF_dead8res += texture(GLF_dead8tex, donor_replacementGLF_dead8coord + vec2(float(GLF_dead8i - 1) * s_g, float(GLF_dead8j - 1) * s_g)) * GLF_dead8weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead8i * 3 + GLF_dead8j, 9)];
                                }
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = clamp(_GLF_color, 908.174, s_g);
                                }
                            }
                        }
                        donor_replacementGLF_dead0p.x = GLF_dead0j * 2;
                        donor_replacementGLF_dead0p.y = donor_replacementGLF_dead0i * 2;
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                            _GLF_color = (mat4(7.5, 6.9, -44.30, 97.40, -6435.9612, -7.9, -49.61, 7.0, 175.962, -296.006, -882.416, 9.6, 6665.9914, -1.0, -0.5, 53.93), atan(GLF_live10_GLF_color));
                        }
                        c2 = true;
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            {
                                float GLF_dead17stripe = GLF_dead17compute_stripe(cos((pos.x + pos.y) * 20.0), pos.x + pos.y);
                                setting = mix(vec3(pos.x, 0, 0.75), vec3(.8, .7, pos.x), GLF_dead17stripe);
                                GLF_dead17_GLF_color = vec4(setting, 1.0);
                                ;
                            }
                        }
                        {
                            bool GLF_live11c1 = _GLF_FUZZED(true);
                            bool GLF_live11c2 = _GLF_FUZZED(bool(-7.8));
                            bool GLF_live11c3 = _GLF_FUZZED((mat3(-1398.8639, 191.394, 716.441, -797.405, 957.126, -6.5, 2.9, 9.3, -8.1) != mat3(-4.0, -8.7, -7.8, -77.80, -42.33, -952.027, 4.4, 643.567, -995.483)));
                            vec3 GLF_live11col = _GLF_FUZZED((vec3(vec4(836.012, 74.47, 1.6, 447.618)) + vec3(1506.1777, -0.0, 8.2)));
                            vec2 GLF_live11uv = _GLF_FUZZED((-vec2(6947.8756, -5.5)));
                            if (_GLF_DEAD(false)) {
                                vec3 donor_replacementGLF_dead17col = _GLF_FUZZED(GLF_live11col);
                                {
                                    float GLF_dead17stripe = GLF_dead17compute_stripe(cos((GLF_live11uv.x + GLF_live11uv.y) * 20.0), GLF_live11uv.x + GLF_live11uv.y);
                                    donor_replacementGLF_dead17col = mix(vec3(.7, sinh(GLF_live11uv.x), GLF_live11uv.x), vec3(.3, .5, GLF_live11uv.x), GLF_dead17stripe);
                                    GLF_dead17_GLF_color = vec4(donor_replacementGLF_dead17col, 1.0);
                                    ;
                                }
                            }
                            if (!GLF_live11c1 && !GLF_live11c2 && GLF_live11c3) {
                                float GLF_live11stripe = GLF_live11compute_stripe(cos((GLF_live11uv.x + GLF_live11uv.y) * 20.0), GLF_live11uv.x + GLF_live11uv.y);
                                GLF_live11col = mix(vec3(.7, sinh(GLF_live11uv.x), GLF_live11uv.x), vec3(.3, .5, GLF_live11uv.x), GLF_live11stripe);
                                GLF_live11_GLF_color = vec4(GLF_live11col, 1.0);
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = inversesqrt(GLF_dead3_GLF_color);
                                }
                                ;
                                if (_GLF_DEAD(false)) {
                                    for (GLF_live4msb8 = 0; GLF_live4msb8 < 8; GLF_live4msb8++) {
                                        for (donor_replacementGLF_dead0directions = 0; donor_replacementGLF_dead0directions < 8; donor_replacementGLF_dead0directions++) {
                                            if (GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead0directions * 2 + GLF_live4msb8 * 2 * 16, 256)] == 0) {
                                                donor_replacementGLF_dead0p.x = donor_replacementGLF_dead0directions * 2;
                                                donor_replacementGLF_dead0p.y = GLF_live4msb8 * 2;
                                                GLF_live11c3 = true;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    {
                        {
                            int GLF_live13iteration = _GLF_FUZZED(24939);
                            if (GLF_live13iteration < 1000) {
                                ;
                            } else {
                                ;
                            }
                        }
                        {
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                if (mod(float(GLF_live4msb8), s_g) <= 0.01) {
                                    h_r += 0.2;
                                }
                            }
                            ;
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        {
                            GLF_dead16_GLF_color = vec4(1.0, 1.0, 1.0, 1.0);
                            ;
                        }
                    }
                    {
                        if (_GLF_DEAD(false)) {
                            _GLF_color = vec4(-1052.1050, -7.3, -79.38, -7.5);
                        }
                        int GLF_live13c_im = _GLF_FUZZED((78648 | (-(-66195))));
                        int GLF_live13c_re = _GLF_FUZZED((13704 - 43299));
                        if (_GLF_DEAD(false)) {
                            _GLF_color = GLF_live11_GLF_color;
                        }
                        int GLF_live13iteration = _GLF_FUZZED(ivec4(-46923, -5525, 13447, -10293).q);
                        int GLF_live13looplimiter0 = 0;
                        int GLF_live13x = _GLF_FUZZED(77857);
                        int GLF_live13y = _GLF_FUZZED(-81982);
                        for (int GLF_live13k = 0; GLF_live13k < 1000; GLF_live13k++) {
                            if (GLF_live13looplimiter0 >= 3) {
                                break;
                            }
                            GLF_live13looplimiter0++;
                            {
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = mod(vec4(-851.068, -61.68, 22.75, -4.9), dFdy(time));
                                    if (_GLF_DEAD(false)) {
                                        {
                                            ivec2 GLF_dead15icoord = ivec2(((pos - vec2(0.4, 0.0)) * vec2(1.0 / 0.6, 1.0)) * 256.0);
                                            int GLF_dead15v = (GLF_dead15icoord.x ^ GLF_dead15icoord.y) * GLF_dead15icoord.y;
                                            bool GLF_dead15res1 = ((GLF_dead15v >> 10) & 1) != 0;
                                            bool GLF_dead15res2 = ((GLF_dead15v >> 11) & 4) != 0;
                                            bool GLF_dead15res3 = ((GLF_dead15v >> 12) & 8) != 0;
                                            GLF_dead15_GLF_color = vec4(GLF_dead15res1 ? 1.0 : 0.0, GLF_dead15res2 ? 1.0 : 0.0, GLF_dead15res3 ? 1.0 : 0.0, 1);
                                        }
                                    }
                                }
                                if (GLF_live13x * GLF_live13x + GLF_live13y * GLF_live13y > 262144) {
                                    break;
                                }
                                int GLF_live13x_new = ((GLF_live13x * GLF_live13x - GLF_live13y * GLF_live13y) / 256 + GLF_live13c_re);
                                GLF_live13y = (2 * GLF_live13x * GLF_live13y / 256 + GLF_live13c_im);
                                GLF_live13x = GLF_live13x_new;
                                GLF_live13iteration++;
                            }
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        vec2 donor_replacementGLF_dead17uv = _GLF_FUZZED(pow(vec2((bvec2(true, false), vec3(-2440.0867, 3417.2962, 8.4))), vec2(83.62, 3.8)));
                        if (!c1 && !c1 && c1) {
                            float GLF_dead17stripe = GLF_dead17compute_stripe(cos((donor_replacementGLF_dead17uv.x + donor_replacementGLF_dead17uv.y) * 20.0), donor_replacementGLF_dead17uv.x + donor_replacementGLF_dead17uv.y);
                            setting = mix(vec3(.7, sinh(donor_replacementGLF_dead17uv.x), donor_replacementGLF_dead17uv.x), vec3(.3, .5, donor_replacementGLF_dead17uv.x), GLF_dead17stripe);
                            GLF_dead17_GLF_color = vec4(setting, 1.0);
                            ;
                        }
                    }
                }
            }
            if (_GLF_DEAD(false)) {
                _GLF_color = GLF_live11_GLF_color;
            }
            GLF_dead0map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead0p.x) + (donor_replacementGLF_dead0p.y) * 16, 256)] = 1;
        } else {
            {
                vec2 GLF_live10coord = _GLF_FUZZED(vec2(-2.3, -9.4));
                if (GLF_live10coord.y < 0.6) {
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        _GLF_color = vec4(-283.869, 21.65, 3199.8554, 5.8);
                    }
                    uvec2 GLF_live10icoord = uvec2(((GLF_live10coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                    uint GLF_live10res1 = uint(((GLF_live10icoord.x * GLF_live10icoord.y) >> (GLF_live10icoord.x & 31u)) & 0xffffffffu);
                    uint GLF_live10res2 = uint(((GLF_live10icoord.x * GLF_live10icoord.y) << (GLF_live10icoord.x & 31u)) & 0xffffffffu);
                    float GLF_live10res = float(((GLF_live10res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_live10res1 & 1u) != 0u ? 1u : 0u));
                    GLF_live10_GLF_color = vec4(GLF_live10res, GLF_live10res, GLF_live10res, 1.0);
                } else {
                    if (_GLF_DEAD(false)) {
                        _GLF_color = GLF_dead3_GLF_color;
                    }
                    ivec2 GLF_live10icoord = ivec2(((GLF_live10coord - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                    int GLF_live10res3 = ((GLF_live10icoord.x >> 5) & 1) ^ ((GLF_live10icoord.y & 32) >> 5);
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        _GLF_color = GLF_dead9gl_FragCoord;
                    }
                    int GLF_live10res2 = (GLF_live10icoord.y * GLF_live10icoord.y >> 10) & 1;
                    int GLF_live10res1 = (GLF_live10icoord.x * GLF_live10icoord.y >> 9) & 1;
                    GLF_live10_GLF_color = vec4(float(GLF_live10res1 ^ GLF_live10res2), float(GLF_live10res2 & GLF_live10res3), float(GLF_live10res1 | GLF_live10res3), 1.0);
                }
            }
            int GLF_dead0d = donor_replacementGLF_dead0v % donor_replacementGLF_dead0directions;
            donor_replacementGLF_dead0v += donor_replacementGLF_dead0directions;
            if (GLF_dead0d >= 0 && donor_replacementGLF_dead0p.x > 0 && GLF_dead0map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead0p.x - 2) + (donor_replacementGLF_dead0p.y) * 16, 256)] == 0) {
                {
                    vec3 GLF_live11col = _GLF_FUZZED(vec3(-436.318, 2576.5558, -2.0));
                    vec2 GLF_live11uv = _GLF_FUZZED(vec2(-498.069, 765.219));
                    {
                        float GLF_live11stripe = GLF_live11compute_stripe(cos((GLF_live11uv.x + GLF_live11uv.y) * 20.0), GLF_live11uv.x + GLF_live11uv.y);
                        GLF_live11col = mix(vec3(GLF_live11uv.x, 0, 0.75), vec3(.8, .7, GLF_live11uv.x), GLF_live11stripe);
                        GLF_live11_GLF_color = vec4(GLF_live11col, 1.0);
                        ;
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            _GLF_color = vec4(-557.395, 9681.4931, -9.5, 6564.1994);
                            if (_GLF_DEAD(false)) {
                                bool donor_replacementGLF_dead16canwalk = _GLF_FUZZED(bool(s_g));
                                int donor_replacementGLF_dead16i = _GLF_FUZZED(donor_replacementGLF_dead0v);
                                do {
                                    donor_replacementGLF_dead0i++;
                                    int GLF_dead16directions = 0;
                                    if (donor_replacementGLF_dead0p.x > 0 && GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead0p.x - 2) + (donor_replacementGLF_dead0p.y) * 16, 256)] == 0) {
                                        GLF_dead16directions += 1;
                                    }
                                    if (donor_replacementGLF_dead0p.y > 0 && GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead0p.x) + (donor_replacementGLF_dead0p.y - 2) * 16, 256)] == 0) {
                                        GLF_dead16directions += 1;
                                    }
                                    if (donor_replacementGLF_dead0p.x < 14 && GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead0p.x + 2) + (donor_replacementGLF_dead0p.y) * 16, 256)] == 0) {
                                        GLF_dead16directions += 1;
                                    }
                                    if (donor_replacementGLF_dead0p.y < 14 && GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead0p.x) + (donor_replacementGLF_dead0p.y + 2) * 16, 256)] == 0) {
                                        GLF_dead16directions += 1;
                                    }
                                    if (GLF_dead16directions == 0) {
                                        donor_replacementGLF_dead16canwalk = false;
                                        int GLF_dead16j = _GLF_FUZZED(ivec2(-92251, 95393)[1]);
                                        for (donor_replacementGLF_dead16i = 0; donor_replacementGLF_dead16i < 8; donor_replacementGLF_dead16i++) {
                                            for (GLF_dead16j = 0; GLF_dead16j < 8; GLF_dead16j++) {
                                                if (GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead16j * 2 + donor_replacementGLF_dead16i * 2 * 16, 256)] == 0) {
                                                    donor_replacementGLF_dead0p.x = GLF_dead16j * 2;
                                                    donor_replacementGLF_dead0p.y = donor_replacementGLF_dead16i * 2;
                                                    donor_replacementGLF_dead16canwalk = true;
                                                }
                                            }
                                        }
                                        GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead0p.x) + (donor_replacementGLF_dead0p.y) * 16, 256)] = 1;
                                    } else {
                                        int GLF_dead16d = donor_replacementGLF_dead0i % GLF_dead16directions;
                                        donor_replacementGLF_dead0i += GLF_dead16directions;
                                        if (GLF_dead16d >= 0 && donor_replacementGLF_dead0p.x > 0 && GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead0p.x - 2) + (donor_replacementGLF_dead0p.y) * 16, 256)] == 0) {
                                            GLF_dead16d--;
                                            GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead0p.x) + (donor_replacementGLF_dead0p.y) * 16, 256)] = 1;
                                            GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead0p.x - 1) + (donor_replacementGLF_dead0p.y) * 16, 256)] = 1;
                                            GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead0p.x - 2) + (donor_replacementGLF_dead0p.y) * 16, 256)] = 1;
                                            donor_replacementGLF_dead0p.x -= 2;
                                        }
                                        if (GLF_dead16d >= 0 && donor_replacementGLF_dead0p.y > 0 && GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead0p.x) + (donor_replacementGLF_dead0p.y - 2) * 16, 256)] == 0) {
                                            GLF_dead16d--;
                                            GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead0p.x) + (donor_replacementGLF_dead0p.y) * 16, 256)] = 1;
                                            GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead0p.x) + (donor_replacementGLF_dead0p.y - 1) * 16, 256)] = 1;
                                            GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead0p.x) + (donor_replacementGLF_dead0p.y - 2) * 16, 256)] = 1;
                                            donor_replacementGLF_dead0p.y -= 2;
                                        }
                                        if (GLF_dead16d >= 0 && donor_replacementGLF_dead0p.x < 14 && GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead0p.x + 2) + (donor_replacementGLF_dead0p.y) * 16, 256)] == 0) {
                                            GLF_dead16d--;
                                            GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead0p.x) + (donor_replacementGLF_dead0p.y) * 16, 256)] = 1;
                                            GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead0p.x + 1) + (donor_replacementGLF_dead0p.y) * 16, 256)] = 1;
                                            GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead0p.x + 2) + (donor_replacementGLF_dead0p.y) * 16, 256)] = 1;
                                            donor_replacementGLF_dead0p.x += 2;
                                        }
                                        if (GLF_dead16d >= 0 && donor_replacementGLF_dead0p.y < 14 && GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead0p.x) + (donor_replacementGLF_dead0p.y + 2) * 16, 256)] == 0) {
                                            GLF_dead16d--;
                                            GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead0p.x) + (donor_replacementGLF_dead0p.y) * 16, 256)] = 1;
                                            GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead0p.x) + (donor_replacementGLF_dead0p.y + 1) * 16, 256)] = 1;
                                            GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead0p.x) + (donor_replacementGLF_dead0p.y + 2) * 16, 256)] = 1;
                                            donor_replacementGLF_dead0p.y += 2;
                                        }
                                    }
                                    if (GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead0p.y * 16 + donor_replacementGLF_dead0p.x, 256)] == 1) {
                                        GLF_dead16_GLF_color = vec4(1.0, 1.0, 1.0, 1.0);
                                        ;
                                    }
                                } while (donor_replacementGLF_dead16canwalk);
                            }
                        }
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        {
                            float GLF_dead17stripe = GLF_dead17compute_stripe(cos((square.x + square.y) * 20.0), square.x + square.y);
                            setting = mix(vec3(.7, sinh(square.x), square.x), vec3(.3, .5, square.x), GLF_dead17stripe);
                            GLF_dead17_GLF_color = vec4(setting, 1.0);
                            ;
                        }
                    }
                }
                if (_GLF_DEAD(false)) {
                    {
                        vec3 GLF_live11col = _GLF_FUZZED((-(106.611 + vec3(-85.35, -4097.8372, -30.26))));
                        vec2 GLF_live11uv = _GLF_FUZZED((-vec2(-9.7, -4.9)));
                        {
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                {
                                    float GLF_dead17stripe = GLF_dead17compute_stripe(tan((GLF_live11uv.x + GLF_live11uv.y) * 20.0), GLF_live11uv.x + GLF_live11uv.y);
                                    setting = mix(vec3(0.5, GLF_live11uv.x, 0.1), vec3(.4, 0, .5), GLF_dead17stripe);
                                    GLF_dead17_GLF_color = vec4(setting, 1.0);
                                    ;
                                }
                            }
                            float GLF_live11stripe = GLF_live11compute_stripe(cos((GLF_live11uv.x + GLF_live11uv.y) * 20.0), GLF_live11uv.x + GLF_live11uv.y);
                            if (_GLF_DEAD(false)) {
                                _GLF_color = GLF_dead9gl_FragCoord;
                            }
                            GLF_live11col = mix(vec3(.7, sinh(GLF_live11uv.x), GLF_live11uv.x), vec3(.3, .5, GLF_live11uv.x), GLF_live11stripe);
                            GLF_live11_GLF_color = vec4(GLF_live11col, 1.0);
                            ;
                            if (_GLF_DEAD(false)) {
                                if (donor_replacementGLF_dead0i >= 0 && donor_replacementGLF_dead0p.x > 0 && GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead0p.x - 2) + (donor_replacementGLF_dead0p.y) * 16, 256)] == 0) {
                                    donor_replacementGLF_dead0i--;
                                    GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead0p.x) + (donor_replacementGLF_dead0p.y) * 16, 256)] = 1;
                                    GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead0p.x - 1) + (donor_replacementGLF_dead0p.y) * 16, 256)] = 1;
                                    GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead0p.x - 2) + (donor_replacementGLF_dead0p.y) * 16, 256)] = 1;
                                    donor_replacementGLF_dead0p.x -= 2;
                                }
                            }
                        }
                    }
                    _GLF_color = _GLF_color;
                }
                {
                    vec4 GLF_live4c = _GLF_FUZZED((((-966.864) - vec3(324.008, -237.104, -78.15)) * (mat2x3(6.6, -488.810, -56.87, 3.5, -407.031, -6.1) * mat4x2(8.6, -9.7, -8.4, 19.14, 92.23, 2.0, -2.5, -8915.7580))));
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        if (_GLF_DEAD(false)) {
                            vec2 donor_replacementGLF_dead17uv = _GLF_FUZZED(square);
                            if (!c1 && c2) {
                                float GLF_dead17stripe = GLF_dead17compute_stripe(tan((donor_replacementGLF_dead17uv.x + donor_replacementGLF_dead17uv.y) * 20.0), donor_replacementGLF_dead17uv.x + donor_replacementGLF_dead17uv.y);
                                setting = mix(vec3(0.5, donor_replacementGLF_dead17uv.x, 0.1), vec3(.4, 0, .5), GLF_dead17stripe);
                                GLF_dead17_GLF_color = vec4(setting, 1.0);
                                ;
                            }
                        }
                        if (_GLF_DEAD(false)) {
                            _GLF_color = GLF_dead3_GLF_color;
                        }
                        vec2 donor_replacementGLF_dead8coord = _GLF_FUZZED(sin((injectionSwitch * time)));
                        {
                            {
                                vec2 GLF_live10coord = _GLF_FUZZED(vec2(98.99, 3450.4950));
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = GLF_live11_GLF_color;
                                }
                                if (GLF_live10coord.x > 0.4) {
                                    if (_GLF_DEAD(false)) {
                                        if (_GLF_DEAD(false)) {
                                            if (donor_replacementGLF_dead0v >= 0 && donor_replacementGLF_dead0p.y < 14 && GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead0p.x) + (donor_replacementGLF_dead0p.y + 2) * 16, 256)] == 0) {
                                                donor_replacementGLF_dead0v--;
                                                GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead0p.x) + (donor_replacementGLF_dead0p.y) * 16, 256)] = 1;
                                                GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead0p.x) + (donor_replacementGLF_dead0p.y + 1) * 16, 256)] = 1;
                                                GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead0p.x) + (donor_replacementGLF_dead0p.y + 2) * 16, 256)] = 1;
                                                donor_replacementGLF_dead0p.y += 2;
                                            }
                                        }
                                        _GLF_color = step(exp(-2526.3035), GLF_live10_GLF_color);
                                        if (_GLF_DEAD(false)) {
                                            if (c2) {
                                                float GLF_dead17stripe = GLF_dead17compute_stripe(cos((donor_replacementGLF_dead8coord.x + donor_replacementGLF_dead8coord.y) * 20.0), donor_replacementGLF_dead8coord.x + donor_replacementGLF_dead8coord.y);
                                                setting = mix(vec3(donor_replacementGLF_dead8coord.x, 0, 0.75), vec3(.8, .7, donor_replacementGLF_dead8coord.x), GLF_dead17stripe);
                                                GLF_dead17_GLF_color = vec4(setting, 1.0);
                                                ;
                                            }
                                        }
                                    }
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < sqrt(0.0))))) {
                                        if (square.y < 0.6) {
                                            uvec2 GLF_dead15icoord = uvec2(((square - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                                            uint GLF_dead15res1 = uint(((GLF_dead15icoord.x * GLF_dead15icoord.y) >> (GLF_dead15icoord.x & 31u)) & 0xffffffffu);
                                            uint GLF_dead15res2 = uint(((GLF_dead15icoord.x * GLF_dead15icoord.y) << (GLF_dead15icoord.x & 31u)) & 0xffffffffu);
                                            float GLF_dead15res = float(((GLF_dead15res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_dead15res1 & 1u) != 0u ? 1u : 0u));
                                            GLF_dead15_GLF_color = vec4(GLF_dead15res, GLF_dead15res, GLF_dead15res, 1.0);
                                        } else {
                                            ivec2 GLF_dead15icoord = ivec2(((square - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                                            int GLF_dead15res3 = ((GLF_dead15icoord.x >> 5) & 1) ^ ((GLF_dead15icoord.y & 32) >> 5);
                                            int GLF_dead15res2 = (GLF_dead15icoord.y * GLF_dead15icoord.y >> 10) & 1;
                                            int GLF_dead15res1 = (GLF_dead15icoord.x * GLF_dead15icoord.y >> 9) & 1;
                                            GLF_dead15_GLF_color = vec4(float(GLF_dead15res1 ^ GLF_dead15res2), float(GLF_dead15res2 & GLF_dead15res3), float(GLF_dead15res1 | GLF_dead15res3), 1.0);
                                        }
                                    }
                                    if (GLF_live10coord.y < 0.6) {
                                        if (_GLF_DEAD(false)) {
                                            _GLF_color = (GLF_dead3_GLF_color - GLF_live4c);
                                        }
                                        if (_GLF_DEAD(false)) {
                                            {
                                                donor_replacementGLF_dead0i += 1;
                                            }
                                        }
                                        uvec2 GLF_live10icoord = uvec2(((GLF_live10coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                                        uint GLF_live10res1 = uint(((GLF_live10icoord.x * GLF_live10icoord.y) >> (GLF_live10icoord.x & 31u)) & 0xffffffffu);
                                        uint GLF_live10res2 = uint(((GLF_live10icoord.x * GLF_live10icoord.y) << (GLF_live10icoord.x & 31u)) & 0xffffffffu);
                                        float GLF_live10res = float(((GLF_live10res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_live10res1 & 1u) != 0u ? 1u : 0u));
                                        GLF_live10_GLF_color = vec4(GLF_live10res, GLF_live10res, GLF_live10res, 1.0);
                                    } else {
                                        ivec2 GLF_live10icoord = ivec2(((GLF_live10coord - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                                        int GLF_live10res3 = ((GLF_live10icoord.x >> 5) & 1) ^ ((GLF_live10icoord.y & 32) >> 5);
                                        int GLF_live10res2 = (GLF_live10icoord.y * GLF_live10icoord.y >> 10) & 1;
                                        int GLF_live10res1 = (GLF_live10icoord.x * GLF_live10icoord.y >> 9) & 1;
                                        GLF_live10_GLF_color = vec4(float(GLF_live10res1 ^ GLF_live10res2), float(GLF_live10res2 & GLF_live10res3), float(GLF_live10res1 | GLF_live10res3), 1.0);
                                    }
                                } else {
                                    ivec2 GLF_live10icoord = ivec2(((GLF_live10coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.6, 1.0)) * 256.0);
                                    int GLF_live10v = (GLF_live10icoord.x ^ GLF_live10icoord.y) * GLF_live10icoord.y;
                                    bool GLF_live10res1 = ((GLF_live10v >> 10) & 1) != 0;
                                    bool GLF_live10res2 = ((GLF_live10v >> 11) & 4) != 0;
                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                        {
                                            uvec2 GLF_dead15icoord = uvec2(((square - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                                            uint GLF_dead15res1 = uint(((GLF_dead15icoord.x * GLF_dead15icoord.y) >> (GLF_dead15icoord.x & 31u)) & 0xffffffffu);
                                            uint GLF_dead15res2 = uint(((GLF_dead15icoord.x * GLF_dead15icoord.y) << (GLF_dead15icoord.x & 31u)) & 0xffffffffu);
                                            float GLF_dead15res = float(((GLF_dead15res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_dead15res1 & 1u) != 0u ? 1u : 0u));
                                            GLF_dead15_GLF_color = vec4(GLF_dead15res, GLF_dead15res, GLF_dead15res, 1.0);
                                        }
                                    }
                                    bool GLF_live10res3 = ((GLF_live10v >> 12) & 8) != 0;
                                    GLF_live10_GLF_color = vec4(GLF_live10res1 ? 1.0 : 0.0, GLF_live10res2 ? 1.0 : 0.0, GLF_live10res3 ? 1.0 : 0.0, 1);
                                }
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = trunc(GLF_live11_GLF_color);
                                }
                            }
                            _GLF_color += texture(GLF_dead8tex, donor_replacementGLF_dead8coord + vec2(float(donor_replacementGLF_dead0i - 1) * b_b, float(donor_replacementGLF_dead0directions - 1) * b_b)) * GLF_dead8weights[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead0i * 3 + donor_replacementGLF_dead0directions, 9)];
                        }
                    }
                    {
                        {
                            ;
                            if (_GLF_DEAD(false)) {
                                {
                                    if (square.y < 0.6) {
                                        uvec2 GLF_dead15icoord = uvec2(((square - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                                        uint GLF_dead15res1 = uint(((GLF_dead15icoord.x * GLF_dead15icoord.y) >> (GLF_dead15icoord.x & 31u)) & 0xffffffffu);
                                        uint GLF_dead15res2 = uint(((GLF_dead15icoord.x * GLF_dead15icoord.y) << (GLF_dead15icoord.x & 31u)) & 0xffffffffu);
                                        float GLF_dead15res = float(((GLF_dead15res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_dead15res1 & 1u) != 0u ? 1u : 0u));
                                        GLF_dead15_GLF_color = vec4(GLF_dead15res, GLF_dead15res, GLF_dead15res, 1.0);
                                    } else {
                                        ivec2 GLF_dead15icoord = ivec2(((square - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                                        int GLF_dead15res3 = ((GLF_dead15icoord.x >> 5) & 1) ^ ((GLF_dead15icoord.y & 32) >> 5);
                                        int GLF_dead15res2 = (GLF_dead15icoord.y * GLF_dead15icoord.y >> 10) & 1;
                                        int GLF_dead15res1 = (GLF_dead15icoord.x * GLF_dead15icoord.y >> 9) & 1;
                                        GLF_dead15_GLF_color = vec4(float(GLF_dead15res1 ^ GLF_dead15res2), float(GLF_dead15res2 & GLF_dead15res3), float(GLF_dead15res1 | GLF_dead15res3), 1.0);
                                    }
                                }
                            }
                        }
                    }
                    int GLF_live4i = _GLF_FUZZED(-45985);
                    {
                        bool GLF_live11c1 = _GLF_FUZZED((mat4(-945.635, 227.070, -60.23, 7.1, 0.7, 775.067, 868.198, -4.5, 4.3, -6737.8954, -5104.0998, -7.7, -6475.6682, -3.9, -3.6, -362.329) != mat4(mat4x3(-463.236, 461.039, -2.7, 6.2, 6.1, 9812.2254, -0.6, 84.19, 4900.7823, 71.03, -9.8, -492.297))));
                        if (_GLF_DEAD(false)) {
                            _GLF_color = GLF_dead9gl_FragCoord;
                        }
                        vec3 GLF_live11col = _GLF_FUZZED(vec3(8417.8851, 6626.4328, 3113.3962));
                        vec2 GLF_live11uv = _GLF_FUZZED(vec2(vec3(5379.7632, -3050.8558, 2191.7325)));
                        if (GLF_live11c1) {
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_ZERO(0.0, injectionSwitch.x))))) {
                                {
                                    uvec2 GLF_dead15icoord = uvec2(((pos - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                                    uint GLF_dead15res1 = uint(((GLF_dead15icoord.x * GLF_dead15icoord.y) >> (GLF_dead15icoord.x & 31u)) & 0xffffffffu);
                                    uint GLF_dead15res2 = uint(((GLF_dead15icoord.x * GLF_dead15icoord.y) << (GLF_dead15icoord.x & 31u)) & 0xffffffffu);
                                    float GLF_dead15res = float(((GLF_dead15res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_dead15res1 & 1u) != 0u ? 1u : 0u));
                                    GLF_dead15_GLF_color = vec4(GLF_dead15res, GLF_dead15res, GLF_dead15res, 1.0);
                                }
                            }
                            float GLF_live11stripe = GLF_live11compute_stripe(cos((GLF_live11uv.x + GLF_live11uv.y) * 20.0), GLF_live11uv.x + GLF_live11uv.y);
                            GLF_live11col = mix(vec3(GLF_live11uv.x, 0, 0.75), vec3(.8, .7, GLF_live11uv.x), GLF_live11stripe);
                            GLF_live11_GLF_color = vec4(GLF_live11col, 1.0);
                            ;
                        }
                    }
                    {
                        {
                            vec3 GLF_live12color = _GLF_FUZZED((68.91 * vec3(-2.3, 0.0, 48.07)));
                            if (_GLF_DEAD(false)) {
                                int donor_replacementGLF_dead16j = _GLF_FUZZED(GLF_dead0d);
                                {
                                    if (GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead16j * 2 + GLF_dead0d * 2 * 16, 256)] == 0) {
                                        donor_replacementGLF_dead0p.x = donor_replacementGLF_dead16j * 2;
                                        donor_replacementGLF_dead0p.y = GLF_dead0d * 2;
                                        c1 = true;
                                    }
                                }
                            }
                            int GLF_live12count = _GLF_FUZZED(((-38655) - 85511));
                            {
                                int GLF_live12looplimiter4 = 0;
                                do {
                                    if (GLF_live12looplimiter4 >= 6) {
                                        break;
                                        if (_GLF_DEAD(false)) {
                                            if (_GLF_DEAD(false)) {
                                                {
                                                    ivec2 GLF_dead15icoord = ivec2(((pos - vec2(0.4, 0.0)) * vec2(1.0 / 0.6, 1.0)) * 256.0);
                                                    int GLF_dead15v = (GLF_dead15icoord.x ^ GLF_dead15icoord.y) * GLF_dead15icoord.y;
                                                    bool GLF_dead15res1 = ((GLF_dead15v >> 10) & 1) != 0;
                                                    bool GLF_dead15res2 = ((GLF_dead15v >> 11) & 4) != 0;
                                                    bool GLF_dead15res3 = ((GLF_dead15v >> 12) & 8) != 0;
                                                    GLF_dead15_GLF_color = vec4(GLF_dead15res1 ? 1.0 : 0.0, GLF_dead15res2 ? 1.0 : 0.0, GLF_dead15res3 ? 1.0 : 0.0, 1);
                                                }
                                            }
                                            _GLF_color = min(GLF_live4c, GLF_live4c);
                                        }
                                    }
                                    GLF_live12looplimiter4++;
                                    if (_GLF_DEAD(false)) {
                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                            vec2 donor_replacementGLF_dead15coord = _GLF_FUZZED(injectionSwitch);
                                            {
                                                ivec2 GLF_dead15icoord = ivec2(((donor_replacementGLF_dead15coord - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                                                int GLF_dead15res3 = ((GLF_dead15icoord.x >> 5) & 1) ^ ((GLF_dead15icoord.y & 32) >> 5);
                                                int GLF_dead15res2 = (GLF_dead15icoord.y * GLF_dead15icoord.y >> 10) & 1;
                                                int GLF_dead15res1 = (GLF_dead15icoord.x * GLF_dead15icoord.y >> 9) & 1;
                                                GLF_dead15_GLF_color = vec4(float(GLF_dead15res1 ^ GLF_dead15res2), float(GLF_dead15res2 & GLF_dead15res3), float(GLF_dead15res1 | GLF_dead15res3), 1.0);
                                            }
                                        }
                                        _GLF_color = acos(GLF_live11_GLF_color);
                                    }
                                    {
                                        GLF_live12color -= GLF_live12palette(vec3(float(GLF_live12obj.numbers[4]) * 0.1), trunc(vec3(0.1)), vec3(float(GLF_live12obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_live12injectionSwitch.y), 10)]) * 0.1), vec3(GLF_live12injectionSwitch.x, float(GLF_live12obj.numbers[2]) * 0.1, float(GLF_live12obj.numbers[8]) * 0.1));
                                        GLF_live12count++;
                                    }
                                } while (GLF_live12count != GLF_live12obj.numbers[1]);
                            }
                        }
                        GLF_live4c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live4i, 4)] = GLF_live4c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live4i, 4)] * GLF_live4c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live4i, 4)];
                        {
                            bool GLF_live11c1 = _GLF_FUZZED(((ivec2(250, 16193) * ivec2(-82195, -38514)) == ivec2(11729, 89629)));
                            bool GLF_live11c2 = _GLF_FUZZED(((11639u - 3978u) >= 3249u));
                            bool GLF_live11c3 = _GLF_FUZZED(((ivec4(24257, 84383, 12922, -76923) == ivec4(-1581, -72931, -58010, 20576)) ? true : true));
                            bool GLF_live11c4 = _GLF_FUZZED((mat4(-29.76, 76.37, 222.809, 59.64, 374.063, 6.0, 7.3, -315.053, -578.008, 969.272, -70.85, -466.411, -7992.7827, -570.421, 1915.8128, -1.1) == ((-246.863) + mat4(-4.8, 3.3, 297.232, -0.7, -8.6, 6.3, -87.47, -2024.9103, -8110.6972, -2251.2494, -8.0, 87.78, 4.6, -3.8, -3676.3597, -5.8))));
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < sqrt(0.0))))) {
                                {
                                    float GLF_dead17stripe = GLF_dead17compute_stripe(tan((pos.x + pos.y) * 20.0), pos.x + pos.y);
                                    setting = mix(vec3(0.5, pos.x, 0.1), vec3(.4, 0, .5), GLF_dead17stripe);
                                    GLF_dead17_GLF_color = vec4(setting, 1.0);
                                    ;
                                }
                            }
                            vec3 GLF_live11col = _GLF_FUZZED((vec4(vec2(8.9, 5.9), -41.94, -7.0) * (true ? mat3x4(-4.2, -5659.1876, 3149.3152, -74.11, 0.2, 147.069, -8587.6198, 7.5, 940.719, 19.09, -8.8, -98.67) : mat3x4(4.9, -14.76, 727.345, 596.858, -8.7, -697.029, 629.807, 5.7, -806.986, -0.9, 145.220, 210.471))));
                            vec2 GLF_live11uv = _GLF_FUZZED(vec2(231.995, 972.482));
                            if (!GLF_live11c1 && !GLF_live11c2 && !GLF_live11c3 && GLF_live11c4) {
                                float GLF_live11stripe = GLF_live11compute_stripe(tan((GLF_live11uv.x + GLF_live11uv.y) * 20.0), GLF_live11uv.x + GLF_live11uv.y);
                                GLF_live11col = mix(vec3(GLF_live11uv.x, .8, 0), vec3(1, GLF_live11uv.y, 0), GLF_live11stripe);
                                GLF_live11_GLF_color = vec4(GLF_live11col, 1.0);
                                if (_GLF_DEAD(false)) {
                                    {
                                        float GLF_dead17stripe = GLF_dead17compute_stripe(tan((square.x + square.y) * 20.0), square.x + square.y);
                                        setting = mix(vec3(square.x, .8, 0), vec3(1, square.y, 0), GLF_dead17stripe);
                                        GLF_dead17_GLF_color = vec4(setting, 1.0);
                                        ;
                                    }
                                }
                                ;
                                if (_GLF_DEAD(false)) {
                                    {
                                        ivec2 GLF_dead15icoord = ivec2(((pos - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                                        int GLF_dead15res3 = ((GLF_dead15icoord.x >> 5) & 1) ^ ((GLF_dead15icoord.y & 32) >> 5);
                                        int GLF_dead15res2 = (GLF_dead15icoord.y * GLF_dead15icoord.y >> 10) & 1;
                                        int GLF_dead15res1 = (GLF_dead15icoord.x * GLF_dead15icoord.y >> 9) & 1;
                                        GLF_dead15_GLF_color = vec4(float(GLF_dead15res1 ^ GLF_dead15res2), float(GLF_dead15res2 & GLF_dead15res3), float(GLF_dead15res1 | GLF_dead15res3), 1.0);
                                    }
                                }
                            }
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            vec3 donor_replacementGLF_dead17col = _GLF_FUZZED((setting - ((time / setting) - (-0.1))));
                            vec2 donor_replacementGLF_dead17uv = _GLF_FUZZED(exp(GLF_live11injectionSwitch));
                            if (!c1 && c2) {
                                float GLF_dead17stripe = GLF_dead17compute_stripe(tan((donor_replacementGLF_dead17uv.x + donor_replacementGLF_dead17uv.y) * 20.0), donor_replacementGLF_dead17uv.x + donor_replacementGLF_dead17uv.y);
                                donor_replacementGLF_dead17col = mix(vec3(0.5, donor_replacementGLF_dead17uv.x, 0.1), vec3(.4, 0, .5), GLF_dead17stripe);
                                GLF_dead17_GLF_color = vec4(donor_replacementGLF_dead17col, 1.0);
                                ;
                            }
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            float donor_replacementGLF_dead7s = _GLF_FUZZED(-847.852);
                            {
                                if (mod(float(GLF_live4msb8), h_r) <= 0.01) {
                                    donor_replacementGLF_dead7s += 0.2;
                                }
                                if (float(GLF_live4msb8) >= s_g) {
                                    if (_GLF_DEAD(false)) {
                                        {
                                            float GLF_dead17stripe = GLF_dead17compute_stripe(tan((pos.x + pos.y) * 20.0), pos.x + pos.y);
                                            setting = mix(vec3(0.5, pos.x, 0.1), vec3(.4, 0, .5), GLF_dead17stripe);
                                            GLF_dead17_GLF_color = vec4(setting, 1.0);
                                            ;
                                        }
                                    }
                                    {
                                        vec3 GLF_live11col = _GLF_FUZZED(vec3(-325.622, 67.99, 1.3).tpt);
                                        vec2 GLF_live11uv = _GLF_FUZZED(((+mat4x2(2.4, -14.96, 2.1, 94.56, 725.201, -4783.3014, 3.7, 22.05)) * (mat4(-18.23, -5603.8977, -5.3, -4906.4880, 5.9, -987.458, -345.894, 854.050, -2550.4308, 4.8, 87.35, -4101.5875, 3.1, 2314.4401, 2007.2725, 946.756) * vec4(-77.06, -488.778, -391.375, 2.0))));
                                        {
                                            float GLF_live11stripe = GLF_live11compute_stripe(cos((GLF_live11uv.x + GLF_live11uv.y) * 20.0), GLF_live11uv.x + GLF_live11uv.y);
                                            if (_GLF_DEAD(false)) {
                                                {
                                                    float GLF_dead17stripe = GLF_dead17compute_stripe(tan((square.x + square.y) * 20.0), square.x + square.y);
                                                    GLF_live11col = mix(vec3(0.5, square.x, 0.1), vec3(.4, 0, .5), GLF_dead17stripe);
                                                    GLF_dead17_GLF_color = vec4(GLF_live11col, 1.0);
                                                    ;
                                                }
                                            }
                                            GLF_live11col = mix(vec3(.7, sinh(GLF_live11uv.x), GLF_live11uv.x), vec3(.3, .5, GLF_live11uv.x), GLF_live11stripe);
                                            if (_GLF_DEAD(false)) {
                                                _GLF_color = _GLF_color;
                                            }
                                            GLF_live11_GLF_color = vec4(GLF_live11col, 1.0);
                                            ;
                                        }
                                    }
                                    ;
                                }
                            }
                        }
                        if (_GLF_DEAD(false)) {
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                vec2 donor_replacementGLF_dead15coord = _GLF_FUZZED(resolution);
                                {
                                    ivec2 GLF_dead15icoord = ivec2(((donor_replacementGLF_dead15coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.6, 1.0)) * 256.0);
                                    int GLF_dead15v = (GLF_dead15icoord.x ^ GLF_dead15icoord.y) * GLF_dead15icoord.y;
                                    bool GLF_dead15res1 = ((GLF_dead15v >> 10) & 1) != 0;
                                    bool GLF_dead15res2 = ((GLF_dead15v >> 11) & 4) != 0;
                                    bool GLF_dead15res3 = ((GLF_dead15v >> 12) & 8) != 0;
                                    GLF_dead15_GLF_color = vec4(GLF_dead15res1 ? 1.0 : 0.0, GLF_dead15res2 ? 1.0 : 0.0, GLF_dead15res3 ? 1.0 : 0.0, 1);
                                }
                            }
                            _GLF_color = _GLF_outlined_6(GLF_dead3_GLF_color);
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    {
                                        if (pos.y < 0.6) {
                                            uvec2 GLF_dead15icoord = uvec2(((pos - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                                            uint GLF_dead15res1 = uint(((GLF_dead15icoord.x * GLF_dead15icoord.y) >> (GLF_dead15icoord.x & 31u)) & 0xffffffffu);
                                            uint GLF_dead15res2 = uint(((GLF_dead15icoord.x * GLF_dead15icoord.y) << (GLF_dead15icoord.x & 31u)) & 0xffffffffu);
                                            float GLF_dead15res = float(((GLF_dead15res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_dead15res1 & 1u) != 0u ? 1u : 0u));
                                            GLF_dead15_GLF_color = vec4(GLF_dead15res, GLF_dead15res, GLF_dead15res, 1.0);
                                        } else {
                                            ivec2 GLF_dead15icoord = ivec2(((pos - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                                            int GLF_dead15res3 = ((GLF_dead15icoord.x >> 5) & 1) ^ ((GLF_dead15icoord.y & 32) >> 5);
                                            int GLF_dead15res2 = (GLF_dead15icoord.y * GLF_dead15icoord.y >> 10) & 1;
                                            int GLF_dead15res1 = (GLF_dead15icoord.x * GLF_dead15icoord.y >> 9) & 1;
                                            GLF_dead15_GLF_color = vec4(float(GLF_dead15res1 ^ GLF_dead15res2), float(GLF_dead15res2 & GLF_dead15res3), float(GLF_dead15res1 | GLF_dead15res3), 1.0);
                                        }
                                    }
                                }
                                _GLF_color = vec4(vec3(-204.937, -5120.4298, 8601.6818), vec3(414.977, -10.98, 1054.6166)[2]);
                            }
                            {
                                vec3 GLF_live12color = _GLF_FUZZED((vec3(-9.7, 39.08, -7180.5086) * 2638.6715));
                                int GLF_live12count = _GLF_FUZZED((-792));
                                int GLF_live12looplimiter4 = 0;
                                do {
                                    if (GLF_live12looplimiter4 >= 6) {
                                        break;
                                    }
                                    GLF_live12looplimiter4++;
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                        _GLF_color = GLF_live4c;
                                    }
                                    {
                                        GLF_live12color -= GLF_live12palette(vec3(float(GLF_live12obj.numbers[4]) * 0.1), trunc(vec3(0.1)), vec3(float(GLF_live12obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_live12injectionSwitch.y), 10)]) * 0.1), vec3(GLF_live12injectionSwitch.x, float(GLF_live12obj.numbers[2]) * 0.1, float(GLF_live12obj.numbers[8]) * 0.1));
                                        GLF_live12count++;
                                    }
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                            vec2 donor_replacementGLF_dead15coord = _GLF_FUZZED(injectionSwitch);
                                            {
                                                ivec2 GLF_dead15icoord = ivec2(((donor_replacementGLF_dead15coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.6, 1.0)) * 256.0);
                                                int GLF_dead15v = (GLF_dead15icoord.x ^ GLF_dead15icoord.y) * GLF_dead15icoord.y;
                                                bool GLF_dead15res1 = ((GLF_dead15v >> 10) & 1) != 0;
                                                bool GLF_dead15res2 = ((GLF_dead15v >> 11) & 4) != 0;
                                                bool GLF_dead15res3 = ((GLF_dead15v >> 12) & 8) != 0;
                                                GLF_dead15_GLF_color = vec4(GLF_dead15res1 ? 1.0 : 0.0, GLF_dead15res2 ? 1.0 : 0.0, GLF_dead15res3 ? 1.0 : 0.0, 1);
                                            }
                                        }
                                        _GLF_color = (mat2x4(-9509.3183, -4.5, -5.6, 4.8, -5813.4322, 34.88, 113.987, -868.032) * (GLF_live12injectionSwitch / h_r));
                                    }
                                } while (GLF_live12count != GLF_live12obj.numbers[1]);
                            }
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        {
                            for (int GLF_dead8j = 0; GLF_dead8j < 3; GLF_dead8j++) {
                                _GLF_color += texture(GLF_dead8tex, square + vec2(float(donor_replacementGLF_dead0directions - 1) * s_g, float(GLF_dead8j - 1) * s_g)) * GLF_dead8weights[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead0directions * 3 + GLF_dead8j, 9)];
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < tan(0.0))))) {
                                    {
                                        float GLF_dead17stripe = GLF_dead17compute_stripe(tan((pos.x + pos.y) * 20.0), pos.x + pos.y);
                                        setting = mix(vec3(pos.x, .8, 0), vec3(1, pos.y, 0), GLF_dead17stripe);
                                        GLF_dead17_GLF_color = vec4(setting, 1.0);
                                        ;
                                    }
                                }
                            }
                        }
                    }
                }
                GLF_dead0d--;
                GLF_dead0map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead0p.x) + (donor_replacementGLF_dead0p.y) * 16, 256)] = 1;
                GLF_dead0map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead0p.x - 1) + (donor_replacementGLF_dead0p.y) * 16, 256)] = 1;
                {
                    vec2 GLF_live10coord = _GLF_FUZZED(vec2(3.3, -888.558));
                    {
                        uvec2 GLF_live10icoord = uvec2(((GLF_live10coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                        uint GLF_live10res1 = uint(((GLF_live10icoord.x * GLF_live10icoord.y) >> (GLF_live10icoord.x & 31u)) & 0xffffffffu);
                        if (_GLF_DEAD(false)) {
                            _GLF_color = GLF_dead3_GLF_color;
                        }
                        uint GLF_live10res2 = uint(((GLF_live10icoord.x * GLF_live10icoord.y) << (GLF_live10icoord.x & 31u)) & 0xffffffffu);
                        if (_GLF_DEAD(false)) {
                            {
                                if (GLF_live10coord.y < 0.6) {
                                    uvec2 GLF_dead15icoord = uvec2(((GLF_live10coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                                    uint GLF_dead15res1 = uint(((GLF_dead15icoord.x * GLF_dead15icoord.y) >> (GLF_dead15icoord.x & 31u)) & 0xffffffffu);
                                    uint GLF_dead15res2 = uint(((GLF_dead15icoord.x * GLF_dead15icoord.y) << (GLF_dead15icoord.x & 31u)) & 0xffffffffu);
                                    float GLF_dead15res = float(((GLF_dead15res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_dead15res1 & 1u) != 0u ? 1u : 0u));
                                    GLF_dead15_GLF_color = vec4(GLF_dead15res, GLF_dead15res, GLF_dead15res, 1.0);
                                } else {
                                    ivec2 GLF_dead15icoord = ivec2(((GLF_live10coord - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                                    int GLF_dead15res3 = ((GLF_dead15icoord.x >> 5) & 1) ^ ((GLF_dead15icoord.y & 32) >> 5);
                                    int GLF_dead15res2 = (GLF_dead15icoord.y * GLF_dead15icoord.y >> 10) & 1;
                                    int GLF_dead15res1 = (GLF_dead15icoord.x * GLF_dead15icoord.y >> 9) & 1;
                                    GLF_dead15_GLF_color = vec4(float(GLF_dead15res1 ^ GLF_dead15res2), float(GLF_dead15res2 & GLF_dead15res3), float(GLF_dead15res1 | GLF_dead15res3), 1.0);
                                }
                            }
                        }
                        float GLF_live10res = float(((GLF_live10res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_live10res1 & 1u) != 0u ? 1u : 0u));
                        GLF_live10_GLF_color = vec4(GLF_live10res, GLF_live10res, GLF_live10res, 1.0);
                    }
                }
                GLF_dead0map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead0p.x - 2) + (donor_replacementGLF_dead0p.y) * 16, 256)] = 1;
                donor_replacementGLF_dead0p.x -= 2;
            }
            if (GLF_dead0d >= 0 && donor_replacementGLF_dead0p.y > 0 && GLF_dead0map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead0p.x) + (donor_replacementGLF_dead0p.y - 2) * 16, 256)] == 0) {
                GLF_dead0d--;
                GLF_dead0map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead0p.x) + (donor_replacementGLF_dead0p.y) * 16, 256)] = 1;
                GLF_dead0map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead0p.x) + (donor_replacementGLF_dead0p.y - 1) * 16, 256)] = 1;
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        _GLF_color = GLF_dead3_GLF_color;
                    }
                    _GLF_color = vec4(4.1, 43.39, 5068.5935, -1.6);
                }
                GLF_dead0map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead0p.x) + (donor_replacementGLF_dead0p.y - 2) * 16, 256)] = 1;
                donor_replacementGLF_dead0p.y -= 2;
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    {
                        uvec2 GLF_dead15icoord = uvec2(((square - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                        uint GLF_dead15res1 = uint(((GLF_dead15icoord.x * GLF_dead15icoord.y) >> (GLF_dead15icoord.x & 31u)) & 0xffffffffu);
                        uint GLF_dead15res2 = uint(((GLF_dead15icoord.x * GLF_dead15icoord.y) << (GLF_dead15icoord.x & 31u)) & 0xffffffffu);
                        float GLF_dead15res = float(((GLF_dead15res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_dead15res1 & 1u) != 0u ? 1u : 0u));
                        GLF_dead15_GLF_color = vec4(GLF_dead15res, GLF_dead15res, GLF_dead15res, 1.0);
                    }
                }
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                _GLF_color = _GLF_color;
                if (_GLF_DEAD(false)) {
                    {
                        float GLF_dead17stripe = GLF_dead17compute_stripe(tan((pos.x + pos.y) * 20.0), pos.x + pos.y);
                        setting = mix(vec3(0.5, pos.x, 0.1), vec3(.4, 0, .5), GLF_dead17stripe);
                        GLF_dead17_GLF_color = vec4(setting, 1.0);
                        ;
                    }
                }
            }
            if (GLF_dead0d >= 0 && donor_replacementGLF_dead0p.x < 14 && GLF_dead0map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead0p.x + 2) + (donor_replacementGLF_dead0p.y) * 16, 256)] == 0) {
                GLF_dead0d--;
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    _GLF_color = (b_b * acos(GLF_dead3_GLF_color));
                }
                GLF_dead0map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead0p.x) + (donor_replacementGLF_dead0p.y) * 16, 256)] = 1;
                GLF_dead0map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead0p.x + 1) + (donor_replacementGLF_dead0p.y) * 16, 256)] = 1;
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    if (_GLF_DEAD(false)) {
                        vec2 donor_replacementGLF_dead15coord = _GLF_FUZZED(atanh(GLF_live11injectionSwitch));
                        if (donor_replacementGLF_dead15coord.x > 0.4) {
                            if (donor_replacementGLF_dead15coord.y < 0.6) {
                                uvec2 GLF_dead15icoord = uvec2(((donor_replacementGLF_dead15coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                                uint GLF_dead15res1 = uint(((GLF_dead15icoord.x * GLF_dead15icoord.y) >> (GLF_dead15icoord.x & 31u)) & 0xffffffffu);
                                uint GLF_dead15res2 = uint(((GLF_dead15icoord.x * GLF_dead15icoord.y) << (GLF_dead15icoord.x & 31u)) & 0xffffffffu);
                                float GLF_dead15res = float(((GLF_dead15res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_dead15res1 & 1u) != 0u ? 1u : 0u));
                                GLF_dead15_GLF_color = vec4(GLF_dead15res, GLF_dead15res, GLF_dead15res, 1.0);
                            } else {
                                ivec2 GLF_dead15icoord = ivec2(((donor_replacementGLF_dead15coord - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                                int GLF_dead15res3 = ((GLF_dead15icoord.x >> 5) & 1) ^ ((GLF_dead15icoord.y & 32) >> 5);
                                int GLF_dead15res2 = (GLF_dead15icoord.y * GLF_dead15icoord.y >> 10) & 1;
                                int GLF_dead15res1 = (GLF_dead15icoord.x * GLF_dead15icoord.y >> 9) & 1;
                                GLF_dead15_GLF_color = vec4(float(GLF_dead15res1 ^ GLF_dead15res2), float(GLF_dead15res2 & GLF_dead15res3), float(GLF_dead15res1 | GLF_dead15res3), 1.0);
                            }
                        } else {
                            ivec2 GLF_dead15icoord = ivec2(((donor_replacementGLF_dead15coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.6, 1.0)) * 256.0);
                            int GLF_dead15v = (GLF_dead15icoord.x ^ GLF_dead15icoord.y) * GLF_dead15icoord.y;
                            bool GLF_dead15res1 = ((GLF_dead15v >> 10) & 1) != 0;
                            bool GLF_dead15res2 = ((GLF_dead15v >> 11) & 4) != 0;
                            bool GLF_dead15res3 = ((GLF_dead15v >> 12) & 8) != 0;
                            GLF_dead15_GLF_color = vec4(GLF_dead15res1 ? 1.0 : 0.0, GLF_dead15res2 ? 1.0 : 0.0, GLF_dead15res3 ? 1.0 : 0.0, 1);
                        }
                    }
                    int donor_replacementGLF_dead8i = _GLF_FUZZED(donor_replacementGLF_dead0v);
                    if (_GLF_DEAD(false)) {
                        _GLF_color = dFdyFine(GLF_dead3_GLF_color);
                    }
                    {
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                            _GLF_color = (((mat3x2(948.079, -9.3, 823.271, -4.4, 678.564, 527.910) * mat3(-5.6, -55.12, 48.14, 1.0, 1.3, -1.9, 4560.3196, 95.49, -4.9)) + s_g), step(GLF_live10_GLF_color, GLF_live11_GLF_color));
                        }
                        for (int GLF_dead8j = 0; GLF_dead8j < 3; GLF_dead8j++) {
                            _GLF_color += texture(GLF_dead8tex, pos + vec2(float(donor_replacementGLF_dead8i - 1) * b_b, float(GLF_dead8j - 1) * b_b)) * GLF_dead8weights[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead8i * 3 + GLF_dead8j, 9)];
                        }
                    }
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    _GLF_color = GLF_dead3_GLF_color;
                }
                GLF_dead0map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead0p.x + 2) + (donor_replacementGLF_dead0p.y) * 16, 256)] = 1;
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    _GLF_color = _GLF_outlined_7(GLF_dead3_GLF_color);
                }
                if (_GLF_DEAD(false)) {
                    bool donor_replacementGLF_dead16canwalk = _GLF_FUZZED(true);
                    int donor_replacementGLF_dead16i = _GLF_FUZZED(mix(GLF_live4msb8, GLF_live4msb8, c2));
                    for (donor_replacementGLF_dead0directions = 0; donor_replacementGLF_dead0directions < 8; donor_replacementGLF_dead0directions++) {
                        if (GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead0directions * 2 + donor_replacementGLF_dead16i * 2 * 16, 256)] == 0) {
                            donor_replacementGLF_dead0p.x = donor_replacementGLF_dead0directions * 2;
                            donor_replacementGLF_dead0p.y = donor_replacementGLF_dead16i * 2;
                            donor_replacementGLF_dead16canwalk = true;
                        }
                    }
                }
                if (_GLF_DEAD(false)) {
                    _GLF_color = GLF_live10_GLF_color;
                }
                donor_replacementGLF_dead0p.x += 2;
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < abs(0.0))))) {
                bool donor_replacementGLF_dead17c2 = _GLF_FUZZED((setting.xz == GLF_live11injectionSwitch));
                vec2 donor_replacementGLF_dead17uv = _GLF_FUZZED(abs(GLF_live11injectionSwitch));
                if (!c1 && !donor_replacementGLF_dead17c2 && c2) {
                    float GLF_dead17stripe = GLF_dead17compute_stripe(cos((donor_replacementGLF_dead17uv.x + donor_replacementGLF_dead17uv.y) * 20.0), donor_replacementGLF_dead17uv.x + donor_replacementGLF_dead17uv.y);
                    setting = mix(vec3(.7, sinh(donor_replacementGLF_dead17uv.x), donor_replacementGLF_dead17uv.x), vec3(.3, .5, donor_replacementGLF_dead17uv.x), GLF_dead17stripe);
                    GLF_dead17_GLF_color = vec4(setting, 1.0);
                    ;
                }
            }
            if (GLF_dead0d >= 0 && donor_replacementGLF_dead0p.y < 14 && GLF_dead0map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead0p.x) + (donor_replacementGLF_dead0p.y + 2) * 16, 256)] == 0) {
                GLF_dead0d--;
                GLF_dead0map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead0p.x) + (donor_replacementGLF_dead0p.y) * 16, 256)] = 1;
                GLF_dead0map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead0p.x) + (donor_replacementGLF_dead0p.y + 1) * 16, 256)] = 1;
                GLF_dead0map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead0p.x) + (donor_replacementGLF_dead0p.y + 2) * 16, 256)] = 1;
                donor_replacementGLF_dead0p.y += 2;
                {
                    int GLF_live4i = _GLF_FUZZED((((-96562) + 55592)));
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        for (int GLF_dead8j = 0; GLF_dead8j < 3; GLF_dead8j++) {
                            _GLF_color += texture(GLF_dead8tex, square + vec2(float(GLF_dead0d - 1) * b_b, float(GLF_dead8j - 1) * b_b)) * GLF_dead8weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead0d * 3 + GLF_dead8j, 9)];
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                _GLF_color = (GLF_dead9gl_FragCoord * GLF_live11_GLF_color);
                            }
                        }
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        {
                            float GLF_dead17stripe = GLF_dead17compute_stripe(cos((pos.x + pos.y) * 20.0), pos.x + pos.y);
                            setting = mix(vec3(pos.x, 0, 0.75), vec3(.8, .7, pos.x), GLF_dead17stripe);
                            GLF_dead17_GLF_color = vec4(setting, 1.0);
                            ;
                        }
                    }
                    float GLF_live4ref = _GLF_FUZZED(-3.8);
                    float GLF_live4s = _GLF_FUZZED(3593.0127);
                    if (mod(float(GLF_live4i), GLF_live4ref) <= 0.01) {
                        if (_GLF_DEAD(false)) {
                            _GLF_color = GLF_live11_GLF_color;
                            if (_GLF_DEAD(false)) {
                                if (GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead0d * 2 + donor_replacementGLF_dead0directions * 2 * 16, 256)] == 0) {
                                    donor_replacementGLF_dead0p.x = GLF_dead0d * 2;
                                    donor_replacementGLF_dead0p.y = donor_replacementGLF_dead0directions * 2;
                                    c1 = true;
                                }
                            }
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            if (_GLF_DEAD(false)) {
                                {
                                    ivec2 GLF_dead15icoord = ivec2(((square - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                                    int GLF_dead15res3 = ((GLF_dead15icoord.x >> 5) & 1) ^ ((GLF_dead15icoord.y & 32) >> 5);
                                    int GLF_dead15res2 = (GLF_dead15icoord.y * GLF_dead15icoord.y >> 10) & 1;
                                    int GLF_dead15res1 = (GLF_dead15icoord.x * GLF_dead15icoord.y >> 9) & 1;
                                    GLF_dead15_GLF_color = vec4(float(GLF_dead15res1 ^ GLF_dead15res2), float(GLF_dead15res2 & GLF_dead15res3), float(GLF_dead15res1 | GLF_dead15res3), 1.0);
                                }
                            }
                            _GLF_color = GLF_dead3_GLF_color;
                        }
                        GLF_live4s += 0.2;
                        if (_GLF_DEAD(_GLF_IDENTITY(false, (false) && true))) {
                            vec3 donor_replacementGLF_dead17col = _GLF_FUZZED(round(vec3(538.818, -560.146, -70.37)));
                            vec2 donor_replacementGLF_dead17uv = _GLF_FUZZED(vec2(-148.987, -1.0));
                            {
                                float GLF_dead17stripe = GLF_dead17compute_stripe(tan((donor_replacementGLF_dead17uv.x + donor_replacementGLF_dead17uv.y) * 20.0), donor_replacementGLF_dead17uv.x + donor_replacementGLF_dead17uv.y);
                                donor_replacementGLF_dead17col = mix(vec3(0.5, donor_replacementGLF_dead17uv.x, 0.1), vec3(.4, 0, .5), GLF_dead17stripe);
                                GLF_dead17_GLF_color = vec4(donor_replacementGLF_dead17col, 1.0);
                                ;
                            }
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        _GLF_color = (h_r - _GLF_color);
                    }
                }
                if (_GLF_DEAD(false)) {
                    for (donor_replacementGLF_dead0v = 0; donor_replacementGLF_dead0v < 8; donor_replacementGLF_dead0v++) {
                        if (GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead0v * 2 + donor_replacementGLF_dead0v * 2 * 16, 256)] == 0) {
                            donor_replacementGLF_dead0p.x = donor_replacementGLF_dead0v * 2;
                            donor_replacementGLF_dead0p.y = donor_replacementGLF_dead0v * 2;
                            c2 = true;
                        }
                    }
                }
            }
        }
        {
            if (_GLF_DEAD(false)) {
                _GLF_color = GLF_live11_GLF_color;
                if (_GLF_DEAD(false)) {
                    if (pos.y < 0.6) {
                        uvec2 GLF_dead15icoord = uvec2(((pos - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                        uint GLF_dead15res1 = uint(((GLF_dead15icoord.x * GLF_dead15icoord.y) >> (GLF_dead15icoord.x & 31u)) & 0xffffffffu);
                        uint GLF_dead15res2 = uint(((GLF_dead15icoord.x * GLF_dead15icoord.y) << (GLF_dead15icoord.x & 31u)) & 0xffffffffu);
                        float GLF_dead15res = float(((GLF_dead15res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_dead15res1 & 1u) != 0u ? 1u : 0u));
                        GLF_dead15_GLF_color = vec4(GLF_dead15res, GLF_dead15res, GLF_dead15res, 1.0);
                    } else {
                        ivec2 GLF_dead15icoord = ivec2(((pos - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                        int GLF_dead15res3 = ((GLF_dead15icoord.x >> 5) & 1) ^ ((GLF_dead15icoord.y & 32) >> 5);
                        int GLF_dead15res2 = (GLF_dead15icoord.y * GLF_dead15icoord.y >> 10) & 1;
                        int GLF_dead15res1 = (GLF_dead15icoord.x * GLF_dead15icoord.y >> 9) & 1;
                        GLF_dead15_GLF_color = vec4(float(GLF_dead15res1 ^ GLF_dead15res2), float(GLF_dead15res2 & GLF_dead15res3), float(GLF_dead15res1 | GLF_dead15res3), 1.0);
                    }
                }
            }
            if (_GLF_DEAD(false)) {
                if (pos.x > 0.4) {
                    if (pos.y < 0.6) {
                        uvec2 GLF_dead15icoord = uvec2(((pos - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                        uint GLF_dead15res1 = uint(((GLF_dead15icoord.x * GLF_dead15icoord.y) >> (GLF_dead15icoord.x & 31u)) & 0xffffffffu);
                        uint GLF_dead15res2 = uint(((GLF_dead15icoord.x * GLF_dead15icoord.y) << (GLF_dead15icoord.x & 31u)) & 0xffffffffu);
                        float GLF_dead15res = float(((GLF_dead15res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_dead15res1 & 1u) != 0u ? 1u : 0u));
                        GLF_dead15_GLF_color = vec4(GLF_dead15res, GLF_dead15res, GLF_dead15res, 1.0);
                    } else {
                        ivec2 GLF_dead15icoord = ivec2(((pos - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                        int GLF_dead15res3 = ((GLF_dead15icoord.x >> 5) & 1) ^ ((GLF_dead15icoord.y & 32) >> 5);
                        int GLF_dead15res2 = (GLF_dead15icoord.y * GLF_dead15icoord.y >> 10) & 1;
                        int GLF_dead15res1 = (GLF_dead15icoord.x * GLF_dead15icoord.y >> 9) & 1;
                        GLF_dead15_GLF_color = vec4(float(GLF_dead15res1 ^ GLF_dead15res2), float(GLF_dead15res2 & GLF_dead15res3), float(GLF_dead15res1 | GLF_dead15res3), 1.0);
                    }
                } else {
                    ivec2 GLF_dead15icoord = ivec2(((pos - vec2(0.4, 0.0)) * vec2(1.0 / 0.6, 1.0)) * 256.0);
                    int GLF_dead15v = (GLF_dead15icoord.x ^ GLF_dead15icoord.y) * GLF_dead15icoord.y;
                    bool GLF_dead15res1 = ((GLF_dead15v >> 10) & 1) != 0;
                    bool GLF_dead15res2 = ((GLF_dead15v >> 11) & 4) != 0;
                    bool GLF_dead15res3 = ((GLF_dead15v >> 12) & 8) != 0;
                    GLF_dead15_GLF_color = vec4(GLF_dead15res1 ? 1.0 : 0.0, GLF_dead15res2 ? 1.0 : 0.0, GLF_dead15res3 ? 1.0 : 0.0, 1);
                }
            }
            if (_GLF_DEAD(false)) {
                _GLF_color = (GLF_dead3_GLF_color - h_r);
            }
            vec2 GLF_live5pos = _GLF_FUZZED(vec4(-4.4, -500.433, -5.8, -4780.0812).br);
            vec4 GLF_live5quad = _GLF_FUZZED((mat4x2(-695.959, 5.6, -82.41, 297.173, -237.982, -60.70, 1.6, -4.1) * vec4(94.22, -23.45, -9.3, 0.7)).yxyx);
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                _GLF_color = GLF_live5quad;
            }
            if (_GLF_DEAD(false)) {
                if (_GLF_DEAD(false)) {
                    {
                        if (square.y < 0.6) {
                            uvec2 GLF_dead15icoord = uvec2(((square - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                            uint GLF_dead15res1 = uint(((GLF_dead15icoord.x * GLF_dead15icoord.y) >> (GLF_dead15icoord.x & 31u)) & 0xffffffffu);
                            uint GLF_dead15res2 = uint(((GLF_dead15icoord.x * GLF_dead15icoord.y) << (GLF_dead15icoord.x & 31u)) & 0xffffffffu);
                            float GLF_dead15res = float(((GLF_dead15res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_dead15res1 & 1u) != 0u ? 1u : 0u));
                            GLF_dead15_GLF_color = vec4(GLF_dead15res, GLF_dead15res, GLF_dead15res, 1.0);
                        } else {
                            ivec2 GLF_dead15icoord = ivec2(((square - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                            int GLF_dead15res3 = ((GLF_dead15icoord.x >> 5) & 1) ^ ((GLF_dead15icoord.y & 32) >> 5);
                            int GLF_dead15res2 = (GLF_dead15icoord.y * GLF_dead15icoord.y >> 10) & 1;
                            int GLF_dead15res1 = (GLF_dead15icoord.x * GLF_dead15icoord.y >> 9) & 1;
                            GLF_dead15_GLF_color = vec4(float(GLF_dead15res1 ^ GLF_dead15res2), float(GLF_dead15res2 & GLF_dead15res3), float(GLF_dead15res1 | GLF_dead15res3), 1.0);
                        }
                    }
                }
                _GLF_color = _GLF_color;
            }
            if (GLF_live5pos.x < GLF_live5quad.x) {
                ;
            }
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
            _GLF_color = vec4(vec2(225.498, -6116.6745), resolution);
        }
    }
    bool c4 = pos.y + setting.x > square.y;
    if (_GLF_DEAD(false)) {
        _GLF_color = vec4(971.570, 8.4, -5.8, 17.88);
    }
    if (!c4) {
        {
            {
                ;
            }
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
            ivec2 donor_replacementGLF_dead1p = _GLF_FUZZED(ivec2(85457, -21659));
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                _GLF_color = sqrt(_GLF_color);
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                {
                    GLF_live4msb8 += 1;
                }
            }
            {
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    vec3 donor_replacementGLF_dead17col = _GLF_FUZZED((vec3(-31.06, -1.9, 10.18) + vec3(5549.2717, 9379.8081, -1653.0690)));
                    vec2 donor_replacementGLF_dead17uv = _GLF_FUZZED(GLF_live12injectionSwitch);
                    {
                        float GLF_dead17stripe = GLF_dead17compute_stripe(cos((donor_replacementGLF_dead17uv.x + donor_replacementGLF_dead17uv.y) * 20.0), donor_replacementGLF_dead17uv.x + donor_replacementGLF_dead17uv.y);
                        donor_replacementGLF_dead17col = mix(vec3(.7, sinh(donor_replacementGLF_dead17uv.x), donor_replacementGLF_dead17uv.x), vec3(.3, .5, donor_replacementGLF_dead17uv.x), GLF_dead17stripe);
                        GLF_dead17_GLF_color = vec4(donor_replacementGLF_dead17col, 1.0);
                        ;
                    }
                }
                donor_replacementGLF_dead1p.x -= 16;
            }
        }
        if (_GLF_DEAD(false)) {
            bool donor_replacementGLF_dead17c1 = _GLF_FUZZED(bvec2(false, true).g);
            if (!donor_replacementGLF_dead17c1 && c2) {
                float GLF_dead17stripe = GLF_dead17compute_stripe(tan((square.x + square.y) * 20.0), square.x + square.y);
                setting = mix(vec3(0.5, square.x, 0.1), vec3(.4, 0, .5), GLF_dead17stripe);
                GLF_dead17_GLF_color = vec4(setting, 1.0);
                ;
            }
        }
        return defaultColor();
        {
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                _GLF_color = (time - acos(cos(GLF_live11_GLF_color)));
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    ivec2 donor_replacementGLF_dead16p = _GLF_FUZZED((ivec2(-9664, -51421) - ivec2(-28707, -6932).yx));
                    if (GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT(GLF_live4msb8 * 2 + GLF_live4msb8 * 2 * 16, 256)] == 0) {
                        donor_replacementGLF_dead16p.x = GLF_live4msb8 * 2;
                        donor_replacementGLF_dead16p.y = GLF_live4msb8 * 2;
                        c1 = true;
                    }
                }
            }
            {
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    _GLF_color = smoothstep(GLF_live10_GLF_color, intBitsToFloat(ivec4(89626, -61740, 23537, -24219)), vec4(9.1, -26.46, 77.68, 74.54));
                }
                if (_GLF_DEAD(false)) {
                    ivec2 donor_replacementGLF_dead16p = _GLF_FUZZED((ivec2(-18468, -62196)));
                    {
                        GLF_live4msb8--;
                        GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead16p.x) + (donor_replacementGLF_dead16p.y) * 16, 256)] = 1;
                        GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead16p.x + 1) + (donor_replacementGLF_dead16p.y) * 16, 256)] = 1;
                        GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead16p.x + 2) + (donor_replacementGLF_dead16p.y) * 16, 256)] = 1;
                        donor_replacementGLF_dead16p.x += 2;
                    }
                }
                ;
            }
        }
    }
    bool c5 = pos.x - (setting.x - setting.y) < square.x;
    if (!c5) {
        return computeColor(setting.z / 40.0, pos);
    }
    bool c6 = pos.x + (setting.x - setting.y) > square.x;
    if (_GLF_DEAD(false)) {
        _GLF_color = _GLF_color;
    }
    {
        vec3 GLF_live12color = _GLF_FUZZED((vec3(81.35, -1517.6736, 9761.0613) - 714.931));
        int GLF_live12count = _GLF_FUZZED(-10211);
        int GLF_live12looplimiter5 = 0;
        {
            if (GLF_live12looplimiter5 >= 6) {
                ;
            }
            GLF_live12looplimiter5++;
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                {
                    float GLF_dead17stripe = GLF_dead17compute_stripe(tan((square.x + square.y) * 20.0), square.x + square.y);
                    setting = mix(vec3(0.5, square.x, 0.1), vec3(.4, 0, .5), GLF_dead17stripe);
                    GLF_dead17_GLF_color = vec4(setting, 1.0);
                    ;
                }
            }
            {
                GLF_live12color -= GLF_live12palette(vec3(float(GLF_live12obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_live12injectionSwitch.y), 10)]) * 0.1), vec3(0.8), trunc(vec3(0.1)), vec3(GLF_live12injectionSwitch.x, 0.6, float(GLF_live12obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_live12injectionSwitch.x), 10)]) * 0.1));
                GLF_live12count++;
            }
            if (_GLF_DEAD(false)) {
                _GLF_color = uintBitsToFloat(uvec4((168487u & 2267u), uvec2(175217u, 165931u).x, 113932u, 152904u));
            }
            if (_GLF_DEAD(false)) {
                {
                    float GLF_dead17stripe = GLF_dead17compute_stripe(tan((pos.x + pos.y) * 20.0), pos.x + pos.y);
                    setting = mix(vec3(0.5, pos.x, 0.1), vec3(.4, 0, .5), GLF_dead17stripe);
                    GLF_dead17_GLF_color = vec4(setting, 1.0);
                    ;
                }
            }
        }
    }
    if (_GLF_DEAD(false)) {
        vec2 donor_replacementGLF_dead17uv = _GLF_FUZZED(GLF_live12injectionSwitch);
        if (c3) {
            float GLF_dead17stripe = GLF_dead17compute_stripe(cos((donor_replacementGLF_dead17uv.x + donor_replacementGLF_dead17uv.y) * 20.0), donor_replacementGLF_dead17uv.x + donor_replacementGLF_dead17uv.y);
            setting = mix(vec3(donor_replacementGLF_dead17uv.x, 0, 0.75), vec3(.8, .7, donor_replacementGLF_dead17uv.x), GLF_dead17stripe);
            GLF_dead17_GLF_color = vec4(setting, 1.0);
            ;
        }
    }
    if (!c6) {
        return computeColor(setting.z / 40.0, pos);
        if (_GLF_DEAD(false)) {
            if (float(GLF_live4msb8) >= b_b) {
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    ivec2 donor_replacementGLF_dead16p = _GLF_FUZZED(ivec2(-81473, 12433));
                    {
                        c2 = false;
                        int GLF_dead16j = _GLF_FUZZED(ivec2(-92251, 95393)[1]);
                        for (GLF_live4msb8 = 0; GLF_live4msb8 < 8; GLF_live4msb8++) {
                            for (GLF_dead16j = 0; GLF_dead16j < 8; GLF_dead16j++) {
                                if (GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead16j * 2 + GLF_live4msb8 * 2 * 16, 256)] == 0) {
                                    donor_replacementGLF_dead16p.x = GLF_dead16j * 2;
                                    donor_replacementGLF_dead16p.y = GLF_live4msb8 * 2;
                                    c2 = true;
                                }
                            }
                        }
                        GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead16p.x) + (donor_replacementGLF_dead16p.y) * 16, 256)] = 1;
                    }
                }
                ;
            }
        }
    }
    bool c7 = pos.y - (setting.x - setting.y) < square.y;
    if (!c7) {
        if (_GLF_DEAD(false)) {
            vec2 donor_replacementGLF_dead8coord = _GLF_FUZZED(tan(vec2(411.772, 9719.4997)));
            if (_GLF_DEAD(false)) {
                _GLF_color = smoothstep(vec4(256.920, 645.241, 2787.1337, -47.92), GLF_dead3_GLF_color, vec4(-970.044, -577.147, 484.700, -6.5));
            }
            for (int GLF_dead8i = 0; GLF_dead8i < 3; GLF_dead8i++) {
                for (int GLF_dead8j = 0; GLF_dead8j < 3; GLF_dead8j++) {
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        _GLF_color = GLF_live10_GLF_color;
                    }
                    _GLF_color += texture(GLF_dead8tex, donor_replacementGLF_dead8coord + vec2(float(GLF_dead8i - 1) * b_b, float(GLF_dead8j - 1) * b_b)) * GLF_dead8weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead8i * 3 + GLF_dead8j, 9)];
                }
            }
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            _GLF_color = (vec4(-833.568, 1.0, 7.9, 90.70) - GLF_dead3_GLF_color);
        }
        return computeColor(setting.z / 40.0, pos);
    }
    {
        int GLF_live4i = _GLF_FUZZED(ivec2(16099, -26470).y);
        float GLF_live4ref = _GLF_FUZZED(float(true));
        float GLF_live4s = _GLF_FUZZED(float(false));
        if (mod(float(GLF_live4i), GLF_live4ref) <= 0.01) {
            GLF_live4s += 0.2;
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            _GLF_color = GLF_dead9gl_FragCoord;
        }
    }
    bool c8 = pos.y + (setting.x - setting.y) > square.y;
    {
        int GLF_live12looplimiter2 = 0;
        for (int GLF_live12i = int(GLF_live12injectionSwitch.x); GLF_live12i < 10; GLF_live12i++) {
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                if (_GLF_DEAD(_GLF_IDENTITY(false, bool(bvec4(false, true, false, true))))) {
                    int donor_replacementGLF_dead16directions = _GLF_FUZZED(GLF_live12i);
                    ivec2 donor_replacementGLF_dead16p = _GLF_FUZZED((true ? ivec2(-35071, -68420) : ivec2(-51449, -97712)));
                    {
                        int GLF_dead16d = GLF_live12looplimiter2 % donor_replacementGLF_dead16directions;
                        GLF_live12looplimiter2 += donor_replacementGLF_dead16directions;
                        if (GLF_dead16d >= 0 && donor_replacementGLF_dead16p.x > 0 && GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead16p.x - 2) + (donor_replacementGLF_dead16p.y) * 16, 256)] == 0) {
                            GLF_dead16d--;
                            GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead16p.x) + (donor_replacementGLF_dead16p.y) * 16, 256)] = 1;
                            GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead16p.x - 1) + (donor_replacementGLF_dead16p.y) * 16, 256)] = 1;
                            GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead16p.x - 2) + (donor_replacementGLF_dead16p.y) * 16, 256)] = 1;
                            donor_replacementGLF_dead16p.x -= 2;
                        }
                        if (GLF_dead16d >= 0 && donor_replacementGLF_dead16p.y > 0 && GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead16p.x) + (donor_replacementGLF_dead16p.y - 2) * 16, 256)] == 0) {
                            GLF_dead16d--;
                            GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead16p.x) + (donor_replacementGLF_dead16p.y) * 16, 256)] = 1;
                            GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead16p.x) + (donor_replacementGLF_dead16p.y - 1) * 16, 256)] = 1;
                            GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead16p.x) + (donor_replacementGLF_dead16p.y - 2) * 16, 256)] = 1;
                            donor_replacementGLF_dead16p.y -= 2;
                        }
                        if (GLF_dead16d >= 0 && donor_replacementGLF_dead16p.x < 14 && GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead16p.x + 2) + (donor_replacementGLF_dead16p.y) * 16, 256)] == 0) {
                            GLF_dead16d--;
                            GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead16p.x) + (donor_replacementGLF_dead16p.y) * 16, 256)] = 1;
                            GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead16p.x + 1) + (donor_replacementGLF_dead16p.y) * 16, 256)] = 1;
                            GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead16p.x + 2) + (donor_replacementGLF_dead16p.y) * 16, 256)] = 1;
                            donor_replacementGLF_dead16p.x += 2;
                        }
                        if (GLF_dead16d >= 0 && donor_replacementGLF_dead16p.y < 14 && GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead16p.x) + (donor_replacementGLF_dead16p.y + 2) * 16, 256)] == 0) {
                            GLF_dead16d--;
                            GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead16p.x) + (donor_replacementGLF_dead16p.y) * 16, 256)] = 1;
                            GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead16p.x) + (donor_replacementGLF_dead16p.y + 1) * 16, 256)] = 1;
                            GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead16p.x) + (donor_replacementGLF_dead16p.y + 2) * 16, 256)] = 1;
                            donor_replacementGLF_dead16p.y += 2;
                        }
                    }
                }
                _GLF_color = GLF_live10_GLF_color;
            }
            if (GLF_live12looplimiter2 >= 6) {
                break;
                if (_GLF_DEAD(false)) {
                    _GLF_color = _GLF_color;
                    if (_GLF_DEAD(false)) {
                        if (c3) {
                            float GLF_dead17stripe = GLF_dead17compute_stripe(cos((square.x + square.y) * 20.0), square.x + square.y);
                            setting = mix(vec3(square.x, 0, 0.75), vec3(.8, .7, square.x), GLF_dead17stripe);
                            GLF_dead17_GLF_color = vec4(setting, 1.0);
                            ;
                        }
                    }
                }
            }
            GLF_live12looplimiter2++;
            {
                GLF_live12obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12i, 10)] = (10 - GLF_live12i) * int(GLF_live12injectionSwitch.y);
            }
        }
        if (_GLF_DEAD(_GLF_IDENTITY(_GLF_FALSE(false, (gl_FragCoord.x < length(vec2(0.0, 0.0)))), (_GLF_FALSE(false, (gl_FragCoord.x < length(vec2(0.0, 0.0))))) && true))) {
            {
                float GLF_dead17stripe = GLF_dead17compute_stripe(cos((pos.x + pos.y) * 20.0), pos.x + pos.y);
                setting = mix(vec3(pos.x, 0, 0.75), vec3(.8, .7, pos.x), GLF_dead17stripe);
                GLF_dead17_GLF_color = vec4(setting, 1.0);
                ;
            }
        }
    }
    if (!c8) {
        return computeColor(setting.z / 40.0, pos);
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            _GLF_color = GLF_live10_GLF_color;
        }
    }
    if (_GLF_DEAD(false)) {
        vec2 donor_replacementGLF_dead15coord = _GLF_FUZZED(ceil(pos));
        if (donor_replacementGLF_dead15coord.y < 0.6) {
            uvec2 GLF_dead15icoord = uvec2(((donor_replacementGLF_dead15coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
            uint GLF_dead15res1 = uint(((GLF_dead15icoord.x * GLF_dead15icoord.y) >> (GLF_dead15icoord.x & 31u)) & 0xffffffffu);
            uint GLF_dead15res2 = uint(((GLF_dead15icoord.x * GLF_dead15icoord.y) << (GLF_dead15icoord.x & 31u)) & 0xffffffffu);
            float GLF_dead15res = float(((GLF_dead15res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_dead15res1 & 1u) != 0u ? 1u : 0u));
            GLF_dead15_GLF_color = vec4(GLF_dead15res, GLF_dead15res, GLF_dead15res, 1.0);
        } else {
            ivec2 GLF_dead15icoord = ivec2(((donor_replacementGLF_dead15coord - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
            int GLF_dead15res3 = ((GLF_dead15icoord.x >> 5) & 1) ^ ((GLF_dead15icoord.y & 32) >> 5);
            int GLF_dead15res2 = (GLF_dead15icoord.y * GLF_dead15icoord.y >> 10) & 1;
            int GLF_dead15res1 = (GLF_dead15icoord.x * GLF_dead15icoord.y >> 9) & 1;
            GLF_dead15_GLF_color = vec4(float(GLF_dead15res1 ^ GLF_dead15res2), float(GLF_dead15res2 & GLF_dead15res3), float(GLF_dead15res1 | GLF_dead15res3), 1.0);
        }
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
        _GLF_color = GLF_dead3_GLF_color;
    }
    {
        int GLF_live5i = _GLF_FUZZED(((-61905) + (-74780)));
        vec2 GLF_live5pos = _GLF_FUZZED(vec2(-21.60, 7759.2705));
        vec4 GLF_live5res = _GLF_FUZZED((vec4(-30.98, 9.7, -239.286, 6.0) + vec4(-345.626, 691.631, 35.33, -2.1)));
        {
            if (GLF_live5collision(GLF_live5pos, GLF_live5picdata[_GLF_MAKE_IN_BOUNDS_INT(GLF_live5i, 8)])) {
                GLF_live5res = GLF_live5pal[_GLF_MAKE_IN_BOUNDS_INT((int(GLF_live5picdata[_GLF_MAKE_IN_BOUNDS_INT(GLF_live5i, 8)].x) * int(GLF_live5picdata[_GLF_MAKE_IN_BOUNDS_INT(GLF_live5i, 8)].y) + GLF_live5i * 9 + 11) % 16, 16)];
            }
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            {
                ;
            }
        }
    }
    return defaultColor();
    if (_GLF_DEAD(false)) {
        {
            float GLF_dead17stripe = GLF_dead17compute_stripe(cos((pos.x + pos.y) * 20.0), pos.x + pos.y);
            setting = mix(vec3(.7, sinh(pos.x), pos.x), vec3(.3, .5, pos.x), GLF_dead17stripe);
            GLF_dead17_GLF_color = vec4(setting, 1.0);
            ;
        }
    }
}

vec2 _GLF_outlined_2(vec2 resolution) {
    return resolution.xy / min(resolution.x, resolution.y);
}

vec4 _GLF_outlined_3(vec4 GLF_dead3_GLF_color) {
    return tanh(atan(GLF_dead3_GLF_color));
}

vec3 computePoint(mat2 rotationMatrix) {
    vec2 aspect;
    aspect = _GLF_outlined_2(resolution);
    vec2 position;
    {
        int GLF_live4i = _GLF_FUZZED((28123 & 80654));
        if (_GLF_DEAD(_GLF_IDENTITY(false, !(!(_GLF_IDENTITY(false, bool(bvec2(false, false)))))))) {
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                float donor_replacementGLF_dead7s = _GLF_FUZZED(h_r);
                {
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        vec3 donor_replacementGLF_dead17col = _GLF_FUZZED((vec3(-5.7, -136.674, -540.007) - s_g));
                        {
                            float GLF_dead17stripe = GLF_dead17compute_stripe(tan((aspect.x + aspect.y) * 20.0), aspect.x + aspect.y);
                            donor_replacementGLF_dead17col = mix(vec3(0.5, aspect.x, 0.1), vec3(.4, 0, .5), GLF_dead17stripe);
                            GLF_dead17_GLF_color = vec4(donor_replacementGLF_dead17col, 1.0);
                            ;
                        }
                    }
                    ;
                }
            }
            _GLF_color = _GLF_color;
        }
        {
            vec2 GLF_live10coord = _GLF_FUZZED(vec2(7092.0815, 290.651));
            {
                uvec2 GLF_live10icoord = uvec2(((GLF_live10coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                uint GLF_live10res1 = uint(((GLF_live10icoord.x * GLF_live10icoord.y) >> (GLF_live10icoord.x & 31u)) & 0xffffffffu);
                uint GLF_live10res2 = uint(((GLF_live10icoord.x * GLF_live10icoord.y) << (GLF_live10icoord.x & 31u)) & 0xffffffffu);
                float GLF_live10res = float(((GLF_live10res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_live10res1 & 1u) != 0u ? 1u : 0u));
                GLF_live10_GLF_color = vec4(GLF_live10res, GLF_live10res, GLF_live10res, 1.0);
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    bool donor_replacementGLF_dead17c1 = _GLF_FUZZED(true);
                    bool donor_replacementGLF_dead17c2 = _GLF_FUZZED(true);
                    bool donor_replacementGLF_dead17c3 = _GLF_FUZZED((GLF_live11injectionSwitch == GLF_live12injectionSwitch));
                    vec3 donor_replacementGLF_dead17col = _GLF_FUZZED(vec3(-4.1, -9.7, -2.0));
                    if (!donor_replacementGLF_dead17c1 && !donor_replacementGLF_dead17c2 && donor_replacementGLF_dead17c3) {
                        float GLF_dead17stripe = GLF_dead17compute_stripe(cos((position.x + position.y) * 20.0), position.x + position.y);
                        donor_replacementGLF_dead17col = mix(vec3(.7, sinh(position.x), position.x), vec3(.3, .5, position.x), GLF_dead17stripe);
                        GLF_dead17_GLF_color = vec4(donor_replacementGLF_dead17col, 1.0);
                        ;
                    }
                }
            }
        }
        float GLF_live4limit = _GLF_FUZZED((+(-3.0)));
        {
            if (_GLF_DEAD(false)) {
                _GLF_color = reflect(GLF_live10_GLF_color, GLF_dead9gl_FragCoord);
            }
            vec3 GLF_live11col = _GLF_FUZZED(((+mat3(4.1, 350.247, -3.8, -7603.3180, -23.07, 3.3, 7950.0245, -8.5, -662.604)) * vec3(-27.40, -866.854, 3312.7637)));
            vec2 GLF_live11uv = _GLF_FUZZED(vec2(-975.612, -41.39));
            {
                float GLF_live11stripe = GLF_live11compute_stripe(tan((GLF_live11uv.x + GLF_live11uv.y) * 20.0), GLF_live11uv.x + GLF_live11uv.y);
                GLF_live11col = mix(vec3(GLF_live11uv.x, .8, 0), vec3(1, GLF_live11uv.y, 0), GLF_live11stripe);
                GLF_live11_GLF_color = vec4(GLF_live11col, 1.0);
                ;
            }
        }
        int GLF_live4looplimiter0 = 0;
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            {
                ivec2 GLF_dead15icoord = ivec2(((position - vec2(0.4, 0.0)) * vec2(1.0 / 0.6, 1.0)) * 256.0);
                int GLF_dead15v = (GLF_dead15icoord.x ^ GLF_dead15icoord.y) * GLF_dead15icoord.y;
                bool GLF_dead15res1 = ((GLF_dead15v >> 10) & 1) != 0;
                bool GLF_dead15res2 = ((GLF_dead15v >> 11) & 4) != 0;
                bool GLF_dead15res3 = ((GLF_dead15v >> 12) & 8) != 0;
                GLF_dead15_GLF_color = vec4(GLF_dead15res1 ? 1.0 : 0.0, GLF_dead15res2 ? 1.0 : 0.0, GLF_dead15res3 ? 1.0 : 0.0, 1);
            }
        }
        float GLF_live4ref = _GLF_FUZZED(((true ? 8.6 : (-600.404)) * 8.5));
        float GLF_live4s = _GLF_FUZZED(3.0);
        while (GLF_live4i < bitfieldInsert(800, GLF_live4i, 0, 0)) {
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                vec3 donor_replacementGLF_dead17col = _GLF_FUZZED(acos(clamp(vec3(-6033.8017, -7.1, 302.853), vec3(-4440.7132, -3013.2240, 5.2), vec3(-18.78, 349.001, -153.272))));
                {
                    float GLF_dead17stripe = GLF_dead17compute_stripe(tan((aspect.x + aspect.y) * 20.0), aspect.x + aspect.y);
                    donor_replacementGLF_dead17col = mix(vec3(0.5, aspect.x, 0.1), vec3(.4, 0, .5), GLF_dead17stripe);
                    GLF_dead17_GLF_color = vec4(donor_replacementGLF_dead17col, 1.0);
                    ;
                }
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                {
                    vec2 GLF_live10coord = _GLF_FUZZED((mat2(-9.5, 317.299, 9953.4476, 3.7) * vec2(-6117.9351, 21.13)));
                    {
                        ivec2 GLF_live10icoord = ivec2(((GLF_live10coord - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                        if (_GLF_DEAD(false)) {
                            _GLF_color = GLF_dead3_GLF_color;
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            vec3 donor_replacementGLF_dead17col = _GLF_FUZZED(fwidthCoarse(asinh((vec3(-0.5, 4.9, -6351.7527) + GLF_live4ref))));
                            vec2 donor_replacementGLF_dead17uv = _GLF_FUZZED(position);
                            {
                                float GLF_dead17stripe = GLF_dead17compute_stripe(cos((donor_replacementGLF_dead17uv.x + donor_replacementGLF_dead17uv.y) * 20.0), donor_replacementGLF_dead17uv.x + donor_replacementGLF_dead17uv.y);
                                donor_replacementGLF_dead17col = mix(vec3(donor_replacementGLF_dead17uv.x, 0, 0.75), vec3(.8, .7, donor_replacementGLF_dead17uv.x), GLF_dead17stripe);
                                GLF_dead17_GLF_color = vec4(donor_replacementGLF_dead17col, 1.0);
                                ;
                            }
                        }
                        int GLF_live10res3 = ((GLF_live10icoord.x >> 5) & 1) ^ ((GLF_live10icoord.y & 32) >> 5);
                        int GLF_live10res2 = (GLF_live10icoord.y * GLF_live10icoord.y >> 10) & 1;
                        int GLF_live10res1 = (GLF_live10icoord.x * GLF_live10icoord.y >> 9) & 1;
                        GLF_live10_GLF_color = vec4(float(GLF_live10res1 ^ GLF_live10res2), float(GLF_live10res2 & GLF_live10res3), float(GLF_live10res1 | GLF_live10res3), 1.0);
                    }
                }
                {
                    GLF_live4s += 0.2;
                }
            }
            if (_GLF_DEAD(false)) {
                _GLF_color = _GLF_color;
                {
                    if (_GLF_DEAD(false)) {
                        {
                            ivec2 GLF_dead15icoord = ivec2(((aspect - vec2(0.4, 0.0)) * vec2(1.0 / 0.6, 1.0)) * 256.0);
                            int GLF_dead15v = (GLF_dead15icoord.x ^ GLF_dead15icoord.y) * GLF_dead15icoord.y;
                            bool GLF_dead15res1 = ((GLF_dead15v >> 10) & 1) != 0;
                            bool GLF_dead15res2 = ((GLF_dead15v >> 11) & 4) != 0;
                            bool GLF_dead15res3 = ((GLF_dead15v >> 12) & 8) != 0;
                            GLF_dead15_GLF_color = vec4(GLF_dead15res1 ? 1.0 : 0.0, GLF_dead15res2 ? 1.0 : 0.0, GLF_dead15res3 ? 1.0 : 0.0, 1);
                        }
                    }
                    {
                        ;
                    }
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    vec3 donor_replacementGLF_dead17col = _GLF_FUZZED(vec3(GLF_dead9gl_FragCoord));
                    {
                        float GLF_dead17stripe = GLF_dead17compute_stripe(tan((aspect.x + aspect.y) * 20.0), aspect.x + aspect.y);
                        donor_replacementGLF_dead17col = mix(vec3(0.5, aspect.x, 0.1), vec3(.4, 0, .5), GLF_dead17stripe);
                        GLF_dead17_GLF_color = vec4(donor_replacementGLF_dead17col, 1.0);
                        ;
                    }
                }
            }
            if (GLF_live4looplimiter0 >= 4) {
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    _GLF_color = GLF_dead9gl_FragCoord;
                }
                break;
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    _GLF_color = (mat4x2(36.13, 6.0, -84.48, 971.042, 77.79, -4041.3438, -9897.6484, 3.6)[0] * (b_b / mat4x2(-7.0, 28.52, 349.085, 9.1, 6.9, -0.1, 154.693, 65.02)));
                    if (_GLF_DEAD(false)) {
                        {
                            if (GLF_dead3_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_live4msb8, 4)] >= 1.0) {
                                GLF_dead3_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_live4msb8, 4)] = GLF_dead3_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_live4msb8, 4)] * GLF_dead3_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(GLF_live4msb8, 4)];
                            }
                            {
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    ivec2 donor_replacementGLF_dead16p = _GLF_FUZZED((ivec2(-42941, -53009) / GLF_live4looplimiter0));
                                    {
                                        GLF_live4looplimiter0--;
                                        GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead16p.x) + (donor_replacementGLF_dead16p.y) * 16, 256)] = 1;
                                        GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead16p.x) + (donor_replacementGLF_dead16p.y + 1) * 16, 256)] = 1;
                                        GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead16p.x) + (donor_replacementGLF_dead16p.y + 2) * 16, 256)] = 1;
                                        donor_replacementGLF_dead16p.y += 2;
                                    }
                                }
                                {
                                    if (_GLF_DEAD(false)) {
                                        {
                                            continue;
                                        }
                                    }
                                    ;
                                }
                            }
                        }
                    }
                }
            }
            GLF_live4looplimiter0++;
            {
                {
                    int GLF_live12looplimiter5 = 0;
                    if (GLF_live12looplimiter5 >= 6) {
                        ;
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < sqrt(0.0))))) {
                            {
                                continue;
                            }
                        }
                        if (_GLF_DEAD(false)) {
                            _GLF_color = GLF_live11_GLF_color;
                        }
                    }
                }
                if (mod(float(GLF_live4i), GLF_live4ref) <= 0.01) {
                    GLF_live4s += 0.2;
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        _GLF_color = normalize(vec4(-546.142, -9916.7004, -58.43, 9842.9149));
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        for (int GLF_dead8j = 0; GLF_dead8j < 3; GLF_dead8j++) {
                            {
                                bool GLF_live11c1 = _GLF_FUZZED(((-22719) == (~2672)));
                                bool GLF_live11c2 = _GLF_FUZZED(true);
                                bool GLF_live11c3 = _GLF_FUZZED((mat2x3(-50.84, 22.78, -5.5, -91.45, -44.26, 3.9) != (mat2x3(4.6, 58.89, -12.19, 6.7, 226.140, 5720.3775) * float(144587u))));
                                bool GLF_live11c4 = _GLF_FUZZED((bvec4(true, (108718u == 88032u), bvec2(false, true)) == bvec4(true, true, true, false)));
                                vec3 GLF_live11col = _GLF_FUZZED(vec3(-8.6, 110.773, 706.133));
                                vec2 GLF_live11uv = _GLF_FUZZED(vec2(71.39, -13.05));
                                if (!GLF_live11c1 && !GLF_live11c2 && !GLF_live11c3 && GLF_live11c4) {
                                    float GLF_live11stripe = GLF_live11compute_stripe(tan((GLF_live11uv.x + GLF_live11uv.y) * 20.0), GLF_live11uv.x + GLF_live11uv.y);
                                    GLF_live11col = mix(vec3(GLF_live11uv.x, .8, 0), vec3(1, GLF_live11uv.y, 0), GLF_live11stripe);
                                    GLF_live11_GLF_color = vec4(GLF_live11col, 1.0);
                                    ;
                                }
                            }
                            GLF_dead3_GLF_color += texture(GLF_dead8tex, aspect + vec2(float(GLF_live4i - 1) * b_b, float(GLF_dead8j - 1) * b_b)) * GLF_dead8weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live4i * 3 + GLF_dead8j, 9)];
                            {
                                vec3 GLF_live11col = _GLF_FUZZED(vec3(-7253.0330, 111.755, -11.49));
                                vec2 GLF_live11uv = _GLF_FUZZED(vec2(225.408, -1622.5551));
                                {
                                    float GLF_live11stripe = GLF_live11compute_stripe(tan((GLF_live11uv.x + GLF_live11uv.y) * 20.0), GLF_live11uv.x + GLF_live11uv.y);
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = GLF_dead3_GLF_color;
                                    }
                                    GLF_live11col = mix(vec3(GLF_live11uv.x, .8, 0), vec3(1, GLF_live11uv.y, 0), GLF_live11stripe);
                                    GLF_live11_GLF_color = vec4(GLF_live11col, 1.0);
                                    ;
                                    if (_GLF_DEAD(false)) {
                                        int donor_replacementGLF_dead16d = _GLF_FUZZED(GLF_live4looplimiter0);
                                        ivec2 donor_replacementGLF_dead16p = _GLF_FUZZED(ivec2(83926, 65967));
                                        if (donor_replacementGLF_dead16d >= 0 && donor_replacementGLF_dead16p.x < 14 && GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead16p.x + 2) + (donor_replacementGLF_dead16p.y) * 16, 256)] == 0) {
                                            donor_replacementGLF_dead16d--;
                                            GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead16p.x) + (donor_replacementGLF_dead16p.y) * 16, 256)] = 1;
                                            GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead16p.x + 1) + (donor_replacementGLF_dead16p.y) * 16, 256)] = 1;
                                            GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead16p.x + 2) + (donor_replacementGLF_dead16p.y) * 16, 256)] = 1;
                                            donor_replacementGLF_dead16p.x += 2;
                                        }
                                    }
                                }
                                if (_GLF_DEAD(false)) {
                                    vec3 donor_replacementGLF_dead17col = _GLF_FUZZED((mat2x3(0.4, 0.3, 871.627, -8.9, 540.525, 86.98) * injectionSwitch));
                                    {
                                        float GLF_dead17stripe = GLF_dead17compute_stripe(cos((aspect.x + aspect.y) * 20.0), aspect.x + aspect.y);
                                        donor_replacementGLF_dead17col = mix(vec3(aspect.x, 0, 0.75), vec3(.8, .7, aspect.x), GLF_dead17stripe);
                                        GLF_dead17_GLF_color = vec4(donor_replacementGLF_dead17col, 1.0);
                                        ;
                                    }
                                }
                            }
                        }
                        if (_GLF_DEAD(false)) {
                            _GLF_color = clamp(GLF_live11_GLF_color, GLF_live11_GLF_color, vec4(0.3, 151.378, 23.72, 9.4));
                        }
                    }
                }
                if (_GLF_DEAD(false)) {
                    vec3 donor_replacementGLF_dead17col = _GLF_FUZZED(abs(vec3(-6.8, -2617.7896, 66.27)));
                    {
                        float GLF_dead17stripe = GLF_dead17compute_stripe(tan((position.x + position.y) * 20.0), position.x + position.y);
                        donor_replacementGLF_dead17col = mix(vec3(0.5, position.x, 0.1), vec3(.4, 0, .5), GLF_dead17stripe);
                        GLF_dead17_GLF_color = vec4(donor_replacementGLF_dead17col, 1.0);
                        ;
                    }
                }
                if (_GLF_DEAD(false)) {
                    _GLF_color = GLF_dead3_GLF_color;
                    if (_GLF_DEAD(false)) {
                        {
                            int GLF_live13iteration = _GLF_FUZZED(int(5310u));
                            {
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                    _GLF_color = GLF_live10_GLF_color;
                                }
                                ;
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                    _GLF_color = GLF_live10_GLF_color;
                                }
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    {
                                        ivec2 GLF_dead15icoord = ivec2(((position - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                                        int GLF_dead15res3 = ((GLF_dead15icoord.x >> 5) & 1) ^ ((GLF_dead15icoord.y & 32) >> 5);
                                        int GLF_dead15res2 = (GLF_dead15icoord.y * GLF_dead15icoord.y >> 10) & 1;
                                        int GLF_dead15res1 = (GLF_dead15icoord.x * GLF_dead15icoord.y >> 9) & 1;
                                        GLF_dead15_GLF_color = vec4(float(GLF_dead15res1 ^ GLF_dead15res2), float(GLF_dead15res2 & GLF_dead15res3), float(GLF_dead15res1 | GLF_dead15res3), 1.0);
                                    }
                                }
                            }
                        }
                        int donor_replacementGLF_dead7i = _GLF_FUZZED(GLF_live4i);
                        if (_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead7i, 4)] >= 1.0) {
                            if (_GLF_DEAD(false)) {
                                _GLF_color = _GLF_color;
                            }
                            _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead7i, 4)] = _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead7i, 4)] * _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead7i, 4)];
                        }
                    }
                }
                if (float(GLF_live4i) >= GLF_live4limit) {
                    if (_GLF_DEAD(_GLF_IDENTITY(false, (false) || false))) {
                        _GLF_color = vec4(-2.5, -6.3, -9.4, 82.11);
                        if (_GLF_DEAD(false)) {
                            _GLF_color = dFdx(GLF_live12injectionSwitch.stts);
                        }
                    }
                    ;
                }
                if (_GLF_DEAD(false)) {
                    ivec2 donor_replacementGLF_dead16p = _GLF_FUZZED(ivec2(-13236, -95958));
                    if (donor_replacementGLF_dead16p.x < 14 && GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead16p.x + 2) + (donor_replacementGLF_dead16p.y) * 16, 256)] == 0) {
                        GLF_live4looplimiter0 += 1;
                    }
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    if (_GLF_DEAD(false)) {
                        if (GLF_live4looplimiter0 < int(GLF_dead9gl_FragCoord.x)) {
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                {
                                    uvec2 GLF_dead15icoord = uvec2(((aspect - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                                    uint GLF_dead15res1 = uint(((GLF_dead15icoord.x * GLF_dead15icoord.y) >> (GLF_dead15icoord.x & 31u)) & 0xffffffffu);
                                    uint GLF_dead15res2 = uint(((GLF_dead15icoord.x * GLF_dead15icoord.y) << (GLF_dead15icoord.x & 31u)) & 0xffffffffu);
                                    float GLF_dead15res = float(((GLF_dead15res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_dead15res1 & 1u) != 0u ? 1u : 0u));
                                    GLF_dead15_GLF_color = vec4(GLF_dead15res, GLF_dead15res, GLF_dead15res, 1.0);
                                }
                            }
                            break;
                        }
                    }
                    {
                        int GLF_live12looplimiter0 = 0;
                        if (GLF_live12looplimiter0 >= 6) {
                            ;
                        }
                    }
                    _GLF_color = dFdxCoarse(GLF_dead3_GLF_color);
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    vec2 donor_replacementGLF_dead8coord = _GLF_FUZZED(unpackSnorm2x16((66270u << 104407u)));
                    {
                        _GLF_color += texture(GLF_dead8tex, donor_replacementGLF_dead8coord + vec2(float(GLF_live4looplimiter0 - 1) * b_b, float(GLF_live4looplimiter0 - 1) * b_b)) * GLF_dead8weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live4looplimiter0 * 3 + GLF_live4looplimiter0, 9)];
                    }
                }
                GLF_live4i++;
            }
        }
        if (_GLF_DEAD(false)) {
            float donor_replacementGLF_dead8uvstep = _GLF_FUZZED(GLF_live4limit);
            for (int GLF_dead8j = 0; GLF_dead8j < 3; GLF_dead8j++) {
                _GLF_color += texture(GLF_dead8tex, position + vec2(float(GLF_live4msb8 - 1) * donor_replacementGLF_dead8uvstep, float(GLF_dead8j - 1) * donor_replacementGLF_dead8uvstep)) * GLF_dead8weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live4msb8 * 3 + GLF_dead8j, 9)];
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                _GLF_color = GLF_dead9gl_FragCoord;
            }
            if (_GLF_DEAD(false)) {
                {
                    GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT(GLF_live4msb8, 256)] = 0;
                }
            }
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
            int donor_replacementGLF_dead16directions = _GLF_FUZZED((ivec3(6040, 51715, 81187) % ivec3(-57152, 50899, -34364)).t);
            ivec2 donor_replacementGLF_dead16p = _GLF_FUZZED(ivec2(64220, 89498));
            if (donor_replacementGLF_dead16p.y < 14 && GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead16p.x) + (donor_replacementGLF_dead16p.y + 2) * 16, 256)] == 0) {
                donor_replacementGLF_dead16directions += 1;
            }
        }
    }
    position = (gl_FragCoord.xy / resolution.xy) * aspect;
    vec2 center;
    {
        {
            ;
            {
                vec3 GLF_live11col = _GLF_FUZZED((mat2x3(mat2x4(-90.68, -545.548, -1.3, 2.1, -7909.4889, 7476.3604, -0.6, -2407.4933)) * vec2(-4112.2104, 72.47)));
                vec2 GLF_live11uv = _GLF_FUZZED(vec2(-4.1, 1.9));
                if (_GLF_DEAD(false)) {
                    _GLF_color = dFdyCoarse(_GLF_color);
                }
                {
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        vec2 donor_replacementGLF_dead17uv = _GLF_FUZZED(fma(sinh(position), GLF_live11injectionSwitch, GLF_live12injectionSwitch));
                        {
                            float GLF_dead17stripe = GLF_dead17compute_stripe(cos((donor_replacementGLF_dead17uv.x + donor_replacementGLF_dead17uv.y) * 20.0), donor_replacementGLF_dead17uv.x + donor_replacementGLF_dead17uv.y);
                            GLF_live11col = mix(vec3(donor_replacementGLF_dead17uv.x, 0, 0.75), vec3(.8, .7, donor_replacementGLF_dead17uv.x), GLF_dead17stripe);
                            GLF_dead17_GLF_color = vec4(GLF_live11col, 1.0);
                            ;
                        }
                    }
                    float GLF_live11stripe = GLF_live11compute_stripe(tan((GLF_live11uv.x + GLF_live11uv.y) * 20.0), GLF_live11uv.x + GLF_live11uv.y);
                    GLF_live11col = mix(vec3(GLF_live11uv.x, .8, 0), vec3(1, GLF_live11uv.y, 0), GLF_live11stripe);
                    GLF_live11_GLF_color = vec4(GLF_live11col, 1.0);
                    ;
                }
            }
        }
    }
    if (_GLF_DEAD(false)) {
        _GLF_color = min((s_g / vec4(6.1, -229.596, 11.44, 846.840)), (+GLF_live10_GLF_color));
    }
    center = vec2(0.5) * aspect;
    position *= rotationMatrix;
    center *= rotationMatrix;
    {
        int GLF_live5i = _GLF_FUZZED(-42869);
        vec2 GLF_live5pos = _GLF_FUZZED(((mat3(3410.1130, 57.52, -55.53, 5393.8036, -185.496, 15.81, 520.671, -329.191, 764.516) * vec3(1.8, 3282.9730, 5.7)) * mat2x3((vec3(-924.296, -3852.4381, -0.2) * mat3(-25.06, 156.798, -9583.0262, -86.38, -3390.5365, -5.2, -77.09, 8.3, -668.709)), vec3(241.587, -3.3, -343.063))));
        vec4 GLF_live5res = _GLF_FUZZED(vec3(34.12, 1019.1928, 75.71).grgr);
        {
            if (GLF_live5collision(GLF_live5pos, GLF_live5picdata[_GLF_MAKE_IN_BOUNDS_INT(GLF_live5i, 8)])) {
                if (_GLF_DEAD(false)) {
                    vec3 donor_replacementGLF_dead17col = _GLF_FUZZED(refract(vec3(-3.0, -82.69, -8.1), ldexp(tanh(vec3(8.1, -10.05, 6498.3741)), ivec3(-91247, -43509, 58310)), s_g));
                    {
                        float GLF_dead17stripe = GLF_dead17compute_stripe(cos((position.x + position.y) * 20.0), position.x + position.y);
                        donor_replacementGLF_dead17col = mix(vec3(.7, sinh(position.x), position.x), vec3(.3, .5, position.x), GLF_dead17stripe);
                        GLF_dead17_GLF_color = vec4(donor_replacementGLF_dead17col, 1.0);
                        ;
                    }
                }
                GLF_live5res = GLF_live5pal[_GLF_MAKE_IN_BOUNDS_INT((int(GLF_live5picdata[_GLF_MAKE_IN_BOUNDS_INT(GLF_live5i, 8)].x) * int(GLF_live5picdata[_GLF_MAKE_IN_BOUNDS_INT(GLF_live5i, 8)].y) + GLF_live5i * 9 + 11) % 16, 16)];
                if (_GLF_DEAD(false)) {
                    ivec2 donor_replacementGLF_dead16p = _GLF_FUZZED(ivec2(-42965, 80233));
                    {
                        GLF_live5i--;
                        GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead16p.x) + (donor_replacementGLF_dead16p.y) * 16, 256)] = 1;
                        GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead16p.x) + (donor_replacementGLF_dead16p.y - 1) * 16, 256)] = 1;
                        GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead16p.x) + (donor_replacementGLF_dead16p.y - 2) * 16, 256)] = 1;
                        donor_replacementGLF_dead16p.y -= 2;
                    }
                }
                if (_GLF_DEAD(false)) {
                    _GLF_color = vec4(5071.3218, 629.480, 4.8, 31.77);
                }
            }
            {
                int GLF_live12h = _GLF_FUZZED(-38504);
                int GLF_live12i = _GLF_FUZZED((74594));
                int GLF_live12l = _GLF_FUZZED((~ivec3(65312, -1292, -34198).g));
                int GLF_live12pivot = _GLF_FUZZED(35359);
                {
                    if (_GLF_DEAD(false)) {
                        if (_GLF_DEAD(false)) {
                            vec3 donor_replacementGLF_dead17col = _GLF_FUZZED(vec3(625.565, 6.0, 51.10));
                            {
                                float GLF_dead17stripe = GLF_dead17compute_stripe(cos((GLF_live5pos.x + GLF_live5pos.y) * 20.0), GLF_live5pos.x + GLF_live5pos.y);
                                donor_replacementGLF_dead17col = mix(vec3(GLF_live5pos.x, 0, 0.75), vec3(.8, .7, GLF_live5pos.x), GLF_dead17stripe);
                                GLF_dead17_GLF_color = vec4(donor_replacementGLF_dead17col, 1.0);
                                ;
                            }
                        }
                        _GLF_color = GLF_live11_GLF_color;
                    }
                    int GLF_live12looplimiter0 = 0;
                    for (int GLF_live12j = GLF_live12l; GLF_live12j <= GLF_live12h - 1; GLF_live12j++) {
                        if (GLF_live12looplimiter0 >= 6) {
                            break;
                            if (_GLF_DEAD(false)) {
                                vec3 donor_replacementGLF_dead17col = _GLF_FUZZED(vec3(3.5, -2.0, 3641.3559));
                                {
                                    float GLF_dead17stripe = GLF_dead17compute_stripe(tan((position.x + position.y) * 20.0), position.x + position.y);
                                    donor_replacementGLF_dead17col = mix(vec3(position.x, .8, 0), vec3(1, position.y, 0), GLF_dead17stripe);
                                    GLF_dead17_GLF_color = vec4(donor_replacementGLF_dead17col, 1.0);
                                    ;
                                }
                            }
                        }
                        GLF_live12looplimiter0++;
                        {
                            if (GLF_live12obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12j, 10)] <= GLF_live12pivot) {
                                GLF_live12i++;
                                GLF_live12swap(GLF_live12i, GLF_live12j);
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                    {
                                        ivec2 GLF_dead15icoord = ivec2(((position - vec2(0.4, 0.0)) * vec2(1.0 / 0.6, 1.0)) * 256.0);
                                        int GLF_dead15v = (GLF_dead15icoord.x ^ GLF_dead15icoord.y) * GLF_dead15icoord.y;
                                        bool GLF_dead15res1 = ((GLF_dead15v >> 10) & 1) != 0;
                                        bool GLF_dead15res2 = ((GLF_dead15v >> 11) & 4) != 0;
                                        bool GLF_dead15res3 = ((GLF_dead15v >> 12) & 8) != 0;
                                        GLF_dead15_GLF_color = vec4(GLF_dead15res1 ? 1.0 : 0.0, GLF_dead15res2 ? 1.0 : 0.0, GLF_dead15res3 ? 1.0 : 0.0, 1);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    vec3 result = vec3(0.0);
    if (_GLF_DEAD(false)) {
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            {
                vec3 GLF_live11col = _GLF_FUZZED(vec3(-9981.8375, -797.776, -1.2));
                vec2 GLF_live11uv = _GLF_FUZZED(vec2(2.7, -9365.9047));
                {
                    float GLF_live11stripe = GLF_live11compute_stripe(tan((GLF_live11uv.x + GLF_live11uv.y) * 20.0), GLF_live11uv.x + GLF_live11uv.y);
                    GLF_live11col = mix(vec3(GLF_live11uv.x, .8, 0), vec3(1, GLF_live11uv.y, 0), GLF_live11stripe);
                    GLF_live11_GLF_color = vec4(GLF_live11col, 1.0);
                    ;
                }
            }
            vec2 donor_replacementGLF_dead8coord = _GLF_FUZZED((time / center));
            {
                int GLF_live12i = _GLF_FUZZED(5973);
                {
                    GLF_live12obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12i, 10)] = (10 - GLF_live12i) * int(GLF_live12injectionSwitch.y);
                }
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_IDENTITY(0.0, min(0.0, 0.0)))))) {
                _GLF_color = GLF_live10_GLF_color;
            }
            vec4 donor_replacementGLF_dead8res = _GLF_FUZZED(vec4(-28.67, 558.163, -4027.5688, -92.92));
            {
                for (int GLF_dead8j = 0; GLF_dead8j < 3; GLF_dead8j++) {
                    donor_replacementGLF_dead8res += texture(GLF_dead8tex, donor_replacementGLF_dead8coord + vec2(float(GLF_live4msb8 - 1) * h_r, float(GLF_dead8j - 1) * h_r)) * GLF_dead8weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live4msb8 * 3 + GLF_dead8j, 9)];
                }
            }
        }
        bool donor_replacementGLF_dead0canwalk = _GLF_FUZZED(false);
        int donor_replacementGLF_dead0i = _GLF_FUZZED(-56394);
        int donor_replacementGLF_dead0j = _GLF_FUZZED(findLSB(findMSB(15041)));
        ivec2 donor_replacementGLF_dead0p = _GLF_FUZZED((ivec2(-61820, -95005) + (-44240)));
        if (GLF_dead0map[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead0j * 2 + donor_replacementGLF_dead0i * 2 * 16, 256)] == 0) {
            donor_replacementGLF_dead0p.x = donor_replacementGLF_dead0j * 2;
            donor_replacementGLF_dead0p.y = donor_replacementGLF_dead0i * 2;
            donor_replacementGLF_dead0canwalk = true;
        }
    }
    for (int i = 35; i >= 0; i--) {
        vec3 d;
        if (_GLF_DEAD(false)) {
            if (_GLF_DEAD(false)) {
                {
                    uvec2 GLF_dead15icoord = uvec2(((position - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                    uint GLF_dead15res1 = uint(((GLF_dead15icoord.x * GLF_dead15icoord.y) >> (GLF_dead15icoord.x & 31u)) & 0xffffffffu);
                    uint GLF_dead15res2 = uint(((GLF_dead15icoord.x * GLF_dead15icoord.y) << (GLF_dead15icoord.x & 31u)) & 0xffffffffu);
                    float GLF_dead15res = float(((GLF_dead15res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_dead15res1 & 1u) != 0u ? 1u : 0u));
                    GLF_dead15_GLF_color = vec4(GLF_dead15res, GLF_dead15res, GLF_dead15res, 1.0);
                }
            }
            _GLF_color = vec4(-3.3, 29.66, -914.134, 510.951);
        }
        d = drawShape(position, center + vec2(sin(float(i) / 10.0 + time) / 4.0, 0.0), vec3(0.01 + sin(float(i) / 100.0), 0.01, float(i)));
        if (_GLF_DEAD(false)) {
            if (_GLF_DEAD(false)) {
                _GLF_color = GLF_live10_GLF_color;
            }
            for (int GLF_dead8i = 0; GLF_dead8i < 3; GLF_dead8i++) {
                for (int GLF_dead8j = 0; GLF_dead8j < 3; GLF_dead8j++) {
                    _GLF_color += texture(GLF_dead8tex, position + vec2(float(GLF_dead8i - 1) * h_r, float(GLF_dead8j - 1) * h_r)) * GLF_dead8weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead8i * 3 + GLF_dead8j, 9)];
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    if (aspect.y < 0.6) {
                        uvec2 GLF_dead15icoord = uvec2(((aspect - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                        uint GLF_dead15res1 = uint(((GLF_dead15icoord.x * GLF_dead15icoord.y) >> (GLF_dead15icoord.x & 31u)) & 0xffffffffu);
                        uint GLF_dead15res2 = uint(((GLF_dead15icoord.x * GLF_dead15icoord.y) << (GLF_dead15icoord.x & 31u)) & 0xffffffffu);
                        float GLF_dead15res = float(((GLF_dead15res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_dead15res1 & 1u) != 0u ? 1u : 0u));
                        GLF_dead15_GLF_color = vec4(GLF_dead15res, GLF_dead15res, GLF_dead15res, 1.0);
                    } else {
                        ivec2 GLF_dead15icoord = ivec2(((aspect - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                        int GLF_dead15res3 = ((GLF_dead15icoord.x >> 5) & 1) ^ ((GLF_dead15icoord.y & 32) >> 5);
                        int GLF_dead15res2 = (GLF_dead15icoord.y * GLF_dead15icoord.y >> 10) & 1;
                        int GLF_dead15res1 = (GLF_dead15icoord.x * GLF_dead15icoord.y >> 9) & 1;
                        GLF_dead15_GLF_color = vec4(float(GLF_dead15res1 ^ GLF_dead15res2), float(GLF_dead15res2 & GLF_dead15res3), float(GLF_dead15res1 | GLF_dead15res3), 1.0);
                    }
                }
            }
        }
        if (length(d) <= 0.0) {
            if (_GLF_DEAD(false)) {
                _GLF_color = dFdxFine(GLF_dead9gl_FragCoord);
            }
            continue;
        }
        result = vec3(d);
        if (_GLF_DEAD(false)) {
            if (_GLF_DEAD(false)) {
                bool donor_replacementGLF_dead17c1 = _GLF_FUZZED(true);
                bool donor_replacementGLF_dead17c2 = _GLF_FUZZED((bvec4(true, false, false, false) == bvec4(true, true, false, false)));
                bool donor_replacementGLF_dead17c3 = _GLF_FUZZED(true);
                if (!donor_replacementGLF_dead17c1 && !donor_replacementGLF_dead17c2 && donor_replacementGLF_dead17c3) {
                    float GLF_dead17stripe = GLF_dead17compute_stripe(cos((center.x + center.y) * 20.0), center.x + center.y);
                    d = mix(vec3(.7, sinh(center.x), center.x), vec3(.3, .5, center.x), GLF_dead17stripe);
                    GLF_dead17_GLF_color = vec4(d, 1.0);
                    ;
                }
            }
            _GLF_color = _GLF_outlined_3(GLF_dead3_GLF_color);
            if (_GLF_DEAD(false)) {
                int donor_replacementGLF_dead8i = _GLF_FUZZED((~i));
                vec4 donor_replacementGLF_dead8res = _GLF_FUZZED(vec4(7.2, 92.48, 1.8, 71.18));
                {
                    for (int GLF_dead8j = 0; GLF_dead8j < 3; GLF_dead8j++) {
                        donor_replacementGLF_dead8res += texture(GLF_dead8tex, aspect + vec2(float(donor_replacementGLF_dead8i - 1) * h_r, float(GLF_dead8j - 1) * h_r)) * GLF_dead8weights[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead8i * 3 + GLF_dead8j, 9)];
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            bool donor_replacementGLF_dead16canwalk = _GLF_FUZZED(false);
                            int donor_replacementGLF_dead16i = _GLF_FUZZED(donor_replacementGLF_dead8i);
                            ivec2 donor_replacementGLF_dead16p = _GLF_FUZZED(ivec2(3196, 15541));
                            for (donor_replacementGLF_dead16i = 0; donor_replacementGLF_dead16i < 8; donor_replacementGLF_dead16i++) {
                                for (GLF_dead8j = 0; GLF_dead8j < 8; GLF_dead8j++) {
                                    if (GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead8j * 2 + donor_replacementGLF_dead16i * 2 * 16, 256)] == 0) {
                                        donor_replacementGLF_dead16p.x = GLF_dead8j * 2;
                                        donor_replacementGLF_dead16p.y = donor_replacementGLF_dead16i * 2;
                                        donor_replacementGLF_dead16canwalk = true;
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
        }
        {
            int GLF_live13c_im = _GLF_FUZZED(((-18049) * 73122));
            int GLF_live13c_re = _GLF_FUZZED(-97462);
            int GLF_live13iteration = _GLF_FUZZED(81332);
            if (_GLF_DEAD(false)) {
                bool donor_replacementGLF_dead17c1 = _GLF_FUZZED(false);
                bool donor_replacementGLF_dead17c2 = _GLF_FUZZED((GLF_dead3_GLF_color == vec4(-2.0, -7380.8284, -617.061, -1963.7453)));
                bool donor_replacementGLF_dead17c3 = _GLF_FUZZED(false);
                bool donor_replacementGLF_dead17c4 = _GLF_FUZZED((true || false));
                if (!donor_replacementGLF_dead17c1 && !donor_replacementGLF_dead17c2 && !donor_replacementGLF_dead17c3 && donor_replacementGLF_dead17c4) {
                    float GLF_dead17stripe = GLF_dead17compute_stripe(tan((center.x + center.y) * 20.0), center.x + center.y);
                    result = mix(vec3(center.x, .8, 0), vec3(1, center.y, 0), GLF_dead17stripe);
                    GLF_dead17_GLF_color = vec4(result, 1.0);
                    ;
                }
            }
            int GLF_live13looplimiter0 = 0;
            int GLF_live13x = _GLF_FUZZED((-(-62158)));
            int GLF_live13y = _GLF_FUZZED(((-30620) | 6704));
            for (int GLF_live13k = 0; GLF_live13k < 1000; GLF_live13k++) {
                if (GLF_live13looplimiter0 >= 3) {
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        _GLF_color = (-(GLF_live11injectionSwitch * mat4x2(9075.1222, 3088.0802, -87.84, 84.67, 9070.6715, 552.967, -0.5, 6.7)));
                    }
                    break;
                }
                GLF_live13looplimiter0++;
                {
                    if (GLF_live13x * GLF_live13x + GLF_live13y * GLF_live13y > 262144) {
                        break;
                    }
                    int GLF_live13x_new = ((GLF_live13x * GLF_live13x - GLF_live13y * GLF_live13y) / 256 + GLF_live13c_re);
                    GLF_live13y = (2 * GLF_live13x * GLF_live13y / 256 + GLF_live13c_im);
                    GLF_live13x = GLF_live13x_new;
                    GLF_live13iteration++;
                }
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                {
                    ivec2 GLF_dead15icoord = ivec2(((aspect - vec2(0.4, 0.0)) * vec2(1.0 / 0.6, 1.0)) * 256.0);
                    int GLF_dead15v = (GLF_dead15icoord.x ^ GLF_dead15icoord.y) * GLF_dead15icoord.y;
                    bool GLF_dead15res1 = ((GLF_dead15v >> 10) & 1) != 0;
                    bool GLF_dead15res2 = ((GLF_dead15v >> 11) & 4) != 0;
                    bool GLF_dead15res3 = ((GLF_dead15v >> 12) & 8) != 0;
                    GLF_dead15_GLF_color = vec4(GLF_dead15res1 ? 1.0 : 0.0, GLF_dead15res2 ? 1.0 : 0.0, GLF_dead15res3 ? 1.0 : 0.0, 1);
                }
            }
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            ivec2 donor_replacementGLF_dead16ipos = _GLF_FUZZED((ivec2(10833, -91015) % (-85511)));
            if (GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead16ipos.y * 16 + donor_replacementGLF_dead16ipos.x, 256)] == 1) {
                GLF_dead16_GLF_color = vec4(1.0, 1.0, 1.0, 1.0);
                ;
            }
        }
    }
    if (_GLF_DEAD(false)) {
        _GLF_color = GLF_dead9gl_FragCoord;
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < abs(0.0))))) {
            int donor_replacementGLF_dead16directions = _GLF_FUZZED(bitfieldInsert(59424, floatBitsToInt(b_b), GLF_live4msb8, GLF_live4msb8));
            ivec2 donor_replacementGLF_dead16p = _GLF_FUZZED(ivec2(-81231, 2624));
            if (donor_replacementGLF_dead16p.x > 0 && GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead16p.x - 2) + (donor_replacementGLF_dead16p.y) * 16, 256)] == 0) {
                donor_replacementGLF_dead16directions += 1;
            }
        }
    }
    return result;
}

vec4 _GLF_outlined_4(vec4 GLF_live4c) {
    return asinh(GLF_live4c);
}

vec4 _GLF_outlined_8() {
    return (vec3(-50.94, 71.71, 0.0) * mat4x3(-44.79, -9.3, 8932.8231, -6.4, -0.4, -705.883, -859.672, -596.969, 60.35, 5881.3706, 7.4, 10.16));
}

void main() {
    float angle;
    angle = sin(time) * 0.1;
    if (_GLF_DEAD(false)) {
        bool donor_replacementGLF_dead0canwalk = _GLF_FUZZED(true);
        int donor_replacementGLF_dead0directions = _GLF_FUZZED((62226 ^ (-75763)));
        int donor_replacementGLF_dead0i = _GLF_FUZZED(37227);
        ivec2 donor_replacementGLF_dead0p = _GLF_FUZZED((findLSB(77519) + ivec2(20788, 41858)));
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
            vec2 donor_replacementGLF_dead8coord = _GLF_FUZZED(injectionSwitch);
            for (int GLF_dead8j = 0; GLF_dead8j < 3; GLF_dead8j++) {
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        {
                            uvec2 GLF_dead15icoord = uvec2(((donor_replacementGLF_dead8coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                            uint GLF_dead15res1 = uint(((GLF_dead15icoord.x * GLF_dead15icoord.y) >> (GLF_dead15icoord.x & 31u)) & 0xffffffffu);
                            uint GLF_dead15res2 = uint(((GLF_dead15icoord.x * GLF_dead15icoord.y) << (GLF_dead15icoord.x & 31u)) & 0xffffffffu);
                            float GLF_dead15res = float(((GLF_dead15res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_dead15res1 & 1u) != 0u ? 1u : 0u));
                            GLF_dead15_GLF_color = vec4(GLF_dead15res, GLF_dead15res, GLF_dead15res, 1.0);
                        }
                    }
                    _GLF_color = sqrt(GLF_dead9gl_FragCoord);
                }
                _GLF_color += texture(GLF_dead8tex, donor_replacementGLF_dead8coord + vec2(float(donor_replacementGLF_dead0i - 1) * h_r, float(GLF_dead8j - 1) * h_r)) * GLF_dead8weights[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead0i * 3 + GLF_dead8j, 9)];
            }
        }
        int donor_replacementGLF_dead0v = _GLF_FUZZED(-9713);
        if (_GLF_DEAD(false)) {
            _GLF_color = fwidthCoarse((GLF_live11_GLF_color / b_b));
        }
        if (donor_replacementGLF_dead0directions == 0) {
            donor_replacementGLF_dead0canwalk = false;
            {
                {
                    ;
                }
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                _GLF_color = GLF_live10_GLF_color;
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    vec3 donor_replacementGLF_dead17col = _GLF_FUZZED(vec3(-2179.4300, 4911.3497, 98.31));
                    vec2 donor_replacementGLF_dead17uv = _GLF_FUZZED((mat3x2(-8890.3959, -4156.2557, 395.311, -4174.4666, -7465.3703, -9.0) * vec3(5817.2953, 6.0, -8932.9630)));
                    if (donor_replacementGLF_dead0canwalk) {
                        float GLF_dead17stripe = GLF_dead17compute_stripe(cos((donor_replacementGLF_dead17uv.x + donor_replacementGLF_dead17uv.y) * 20.0), donor_replacementGLF_dead17uv.x + donor_replacementGLF_dead17uv.y);
                        donor_replacementGLF_dead17col = mix(vec3(donor_replacementGLF_dead17uv.x, 0, 0.75), vec3(.8, .7, donor_replacementGLF_dead17uv.x), GLF_dead17stripe);
                        GLF_dead17_GLF_color = vec4(donor_replacementGLF_dead17col, 1.0);
                        return;
                    }
                }
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                ivec2 donor_replacementGLF_dead16p = _GLF_FUZZED(ivec2(-64097, 92192));
                if (donor_replacementGLF_dead16p.x < 14 && GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead16p.x + 2) + (donor_replacementGLF_dead16p.y) * 16, 256)] == 0) {
                    donor_replacementGLF_dead0v += 1;
                }
            }
            int GLF_dead0j = _GLF_FUZZED(-5671);
            for (donor_replacementGLF_dead0i = 0; donor_replacementGLF_dead0i < 8; donor_replacementGLF_dead0i++) {
                for (GLF_dead0j = 0; GLF_dead0j < 8; GLF_dead0j++) {
                    if (_GLF_DEAD(false)) {
                        _GLF_color = sqrt(GLF_dead9gl_FragCoord);
                    }
                    {
                        vec3 GLF_live12color = _GLF_FUZZED(vec3(vec2(2.5, 4566.8924), -4.1));
                        int GLF_live12count = _GLF_FUZZED(-19218);
                        int GLF_live12looplimiter5 = 0;
                        if (_GLF_DEAD(false)) {
                            vec2 donor_replacementGLF_dead17uv = _GLF_FUZZED((roundEven(resolution) * GLF_live11injectionSwitch));
                            if (!donor_replacementGLF_dead0canwalk && !donor_replacementGLF_dead0canwalk && !donor_replacementGLF_dead0canwalk && donor_replacementGLF_dead0canwalk) {
                                float GLF_dead17stripe = GLF_dead17compute_stripe(tan((donor_replacementGLF_dead17uv.x + donor_replacementGLF_dead17uv.y) * 20.0), donor_replacementGLF_dead17uv.x + donor_replacementGLF_dead17uv.y);
                                GLF_live12color = mix(vec3(donor_replacementGLF_dead17uv.x, .8, 0), vec3(1, donor_replacementGLF_dead17uv.y, 0), GLF_dead17stripe);
                                GLF_dead17_GLF_color = vec4(GLF_live12color, 1.0);
                                return;
                            }
                        }
                        {
                            if (GLF_live12looplimiter5 >= 6) {
                                ;
                            }
                            GLF_live12looplimiter5++;
                            {
                                GLF_live12color -= GLF_live12palette(vec3(float(GLF_live12obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_live12injectionSwitch.y), 10)]) * 0.1), vec3(0.8), trunc(vec3(0.1)), vec3(GLF_live12injectionSwitch.x, 0.6, float(GLF_live12obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_live12injectionSwitch.x), 10)]) * 0.1));
                                GLF_live12count++;
                            }
                        }
                    }
                    if (GLF_dead0map[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead0j * 2 + donor_replacementGLF_dead0i * 2 * 16, 256)] == 0) {
                        donor_replacementGLF_dead0p.x = GLF_dead0j * 2;
                        if (_GLF_DEAD(false)) {
                            _GLF_color = GLF_dead9gl_FragCoord;
                        }
                        donor_replacementGLF_dead0p.y = donor_replacementGLF_dead0i * 2;
                        if (_GLF_DEAD(false)) {
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                ivec2 donor_replacementGLF_dead16p = _GLF_FUZZED(ivec2(79320, -79779));
                                if (GLF_dead0j >= 0 && donor_replacementGLF_dead16p.x > 0 && GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead16p.x - 2) + (donor_replacementGLF_dead16p.y) * 16, 256)] == 0) {
                                    GLF_dead0j--;
                                    GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead16p.x) + (donor_replacementGLF_dead16p.y) * 16, 256)] = 1;
                                    GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead16p.x - 1) + (donor_replacementGLF_dead16p.y) * 16, 256)] = 1;
                                    GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead16p.x - 2) + (donor_replacementGLF_dead16p.y) * 16, 256)] = 1;
                                    donor_replacementGLF_dead16p.x -= 2;
                                }
                            }
                            _GLF_color = vec4(dFdxFine(vec3(2995.9586, 2.9, 1.8)), 0.7);
                            if (_GLF_DEAD(false)) {
                                int donor_replacementGLF_dead16directions = _GLF_FUZZED(donor_replacementGLF_dead0v);
                                if (donor_replacementGLF_dead0p.y > 0 && GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead0p.x) + (donor_replacementGLF_dead0p.y - 2) * 16, 256)] == 0) {
                                    donor_replacementGLF_dead16directions += 1;
                                }
                            }
                        }
                        donor_replacementGLF_dead0canwalk = true;
                        if (_GLF_DEAD(false)) {
                            vec2 donor_replacementGLF_dead8coord = _GLF_FUZZED(injectionSwitch);
                            {
                                for (int GLF_dead8j = 0; GLF_dead8j < 3; GLF_dead8j++) {
                                    _GLF_color += texture(GLF_dead8tex, donor_replacementGLF_dead8coord + vec2(float(donor_replacementGLF_dead0i - 1) * b_b, float(GLF_dead8j - 1) * b_b)) * GLF_dead8weights[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead0i * 3 + GLF_dead8j, 9)];
                                }
                            }
                        }
                    }
                }
                if (_GLF_DEAD(false)) {
                    {
                        bool GLF_live11c1 = _GLF_FUZZED(false);
                        bool GLF_live11c2 = _GLF_FUZZED(false);
                        bool GLF_live11c3 = _GLF_FUZZED((mat3x2(91.27) != mat3x2(-47.59, 14.31, 4.9, 3.8, -38.16, 2752.5307)));
                        vec3 GLF_live11col = _GLF_FUZZED(vec3(-4.5, 6.8, 129.895));
                        vec2 GLF_live11uv = _GLF_FUZZED(vec2(-8973.8025, 7.8));
                        if (!GLF_live11c1 && !GLF_live11c2 && GLF_live11c3) {
                            float GLF_live11stripe = GLF_live11compute_stripe(cos((GLF_live11uv.x + GLF_live11uv.y) * 20.0), GLF_live11uv.x + GLF_live11uv.y);
                            GLF_live11col = mix(vec3(.7, sinh(GLF_live11uv.x), GLF_live11uv.x), vec3(.3, .5, GLF_live11uv.x), GLF_live11stripe);
                            GLF_live11_GLF_color = vec4(GLF_live11col, 1.0);
                            ;
                        }
                    }
                    _GLF_color = (((-99.15) * _GLF_color) * mat3x4(-47.63, 2.4, -5934.6871, 446.073, -88.20, 4154.5760, 3.8, -6.5, -56.39, 0.5, -671.283, -5.6)).rrrr;
                }
            }
            GLF_dead0map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead0p.x) + (donor_replacementGLF_dead0p.y) * 16, 256)] = 1;
        } else {
            int GLF_dead0d = donor_replacementGLF_dead0v % donor_replacementGLF_dead0directions;
            if (_GLF_DEAD(false)) {
                vec2 donor_replacementGLF_dead15coord = _GLF_FUZZED(log(GLF_live12injectionSwitch));
                {
                    ivec2 GLF_dead15icoord = ivec2(((donor_replacementGLF_dead15coord - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                    int GLF_dead15res3 = ((GLF_dead15icoord.x >> 5) & 1) ^ ((GLF_dead15icoord.y & 32) >> 5);
                    int GLF_dead15res2 = (GLF_dead15icoord.y * GLF_dead15icoord.y >> 10) & 1;
                    int GLF_dead15res1 = (GLF_dead15icoord.x * GLF_dead15icoord.y >> 9) & 1;
                    GLF_dead15_GLF_color = vec4(float(GLF_dead15res1 ^ GLF_dead15res2), float(GLF_dead15res2 & GLF_dead15res3), float(GLF_dead15res1 | GLF_dead15res3), 1.0);
                }
            }
            donor_replacementGLF_dead0v += donor_replacementGLF_dead0directions;
            if (_GLF_DEAD(false)) {
                _GLF_color = mod(GLF_dead3_GLF_color, normalize(angle));
            }
            if (GLF_dead0d >= 0 && donor_replacementGLF_dead0p.x > 0 && GLF_dead0map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead0p.x - 2) + (donor_replacementGLF_dead0p.y) * 16, 256)] == 0) {
                GLF_dead0d--;
                if (_GLF_DEAD(false)) {
                    if (_GLF_DEAD(false)) {
                        vec2 donor_replacementGLF_dead15coord = _GLF_FUZZED(clamp(injectionSwitch, vec2(-3586.7204, 513.218), GLF_live11injectionSwitch));
                        {
                            ivec2 GLF_dead15icoord = ivec2(((donor_replacementGLF_dead15coord - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                            int GLF_dead15res3 = ((GLF_dead15icoord.x >> 5) & 1) ^ ((GLF_dead15icoord.y & 32) >> 5);
                            int GLF_dead15res2 = (GLF_dead15icoord.y * GLF_dead15icoord.y >> 10) & 1;
                            int GLF_dead15res1 = (GLF_dead15icoord.x * GLF_dead15icoord.y >> 9) & 1;
                            GLF_dead15_GLF_color = vec4(float(GLF_dead15res1 ^ GLF_dead15res2), float(GLF_dead15res2 & GLF_dead15res3), float(GLF_dead15res1 | GLF_dead15res3), 1.0);
                        }
                    }
                    _GLF_color = GLF_dead9gl_FragCoord;
                }
                if (_GLF_DEAD(false)) {
                    bool donor_replacementGLF_dead16canwalk = _GLF_FUZZED(donor_replacementGLF_dead0canwalk);
                    {
                        donor_replacementGLF_dead0p.x = donor_replacementGLF_dead0v * 2;
                        donor_replacementGLF_dead0p.y = donor_replacementGLF_dead0i * 2;
                        donor_replacementGLF_dead16canwalk = true;
                    }
                }
                GLF_dead0map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead0p.x) + (donor_replacementGLF_dead0p.y) * 16, 256)] = 1;
                GLF_dead0map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead0p.x - 1) + (donor_replacementGLF_dead0p.y) * 16, 256)] = 1;
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    _GLF_color = GLF_live11_GLF_color;
                }
                if (_GLF_DEAD(false)) {
                    int donor_replacementGLF_dead7i = _GLF_FUZZED((donor_replacementGLF_dead0directions ^ donor_replacementGLF_dead0directions));
                    if (float(donor_replacementGLF_dead7i) >= b_b) {
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            _GLF_color = step(s_g, GLF_live10_GLF_color);
                        }
                        ;
                        {
                            vec3 GLF_live12color = _GLF_FUZZED((vec3(vec4(-4.7, -9.1, 2.9, -174.777)) * mat3(4.3, -56.17, -3946.4137, -422.623, 451.308, -5.5, -2.0, 3324.5882, 4151.7782)));
                            int GLF_live12count = _GLF_FUZZED((+30881));
                            int GLF_live12looplimiter5 = 0;
                            do {
                                if (GLF_live12looplimiter5 >= 6) {
                                    break;
                                }
                                GLF_live12looplimiter5++;
                                {
                                    GLF_live12color -= GLF_live12palette(vec3(float(GLF_live12obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_live12injectionSwitch.y), 10)]) * 0.1), vec3(0.8), trunc(vec3(0.1)), vec3(GLF_live12injectionSwitch.x, 0.6, float(GLF_live12obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_live12injectionSwitch.x), 10)]) * 0.1));
                                    GLF_live12count++;
                                }
                            } while (GLF_live12count != GLF_live12obj.numbers[2]);
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        bool donor_replacementGLF_dead17c1 = _GLF_FUZZED(false);
                        vec3 donor_replacementGLF_dead17col = _GLF_FUZZED(round(vec3(2.0, -1.2, 6.2)));
                        vec2 donor_replacementGLF_dead17uv = _GLF_FUZZED(GLF_live12injectionSwitch);
                        if (donor_replacementGLF_dead17c1) {
                            float GLF_dead17stripe = GLF_dead17compute_stripe(cos((donor_replacementGLF_dead17uv.x + donor_replacementGLF_dead17uv.y) * 20.0), donor_replacementGLF_dead17uv.x + donor_replacementGLF_dead17uv.y);
                            donor_replacementGLF_dead17col = mix(vec3(donor_replacementGLF_dead17uv.x, 0, 0.75), vec3(.8, .7, donor_replacementGLF_dead17uv.x), GLF_dead17stripe);
                            GLF_dead17_GLF_color = vec4(donor_replacementGLF_dead17col, 1.0);
                            return;
                        }
                    }
                }
                GLF_dead0map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead0p.x - 2) + (donor_replacementGLF_dead0p.y) * 16, 256)] = 1;
                donor_replacementGLF_dead0p.x -= 2;
                {
                    vec4 GLF_live4c = _GLF_FUZZED((-vec4(-1.1, 24.07, 905.168, 9.0)));
                    int GLF_live4i = _GLF_FUZZED((63429 | (-72667)));
                    int GLF_live4looplimiter1 = 0;
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        float donor_replacementGLF_dead7s = _GLF_FUZZED(distance(vec3(3.6, -768.373, 443.027), vec3(188.330, -0.5, -41.16)));
                        {
                            ;
                        }
                        {
                            vec2 GLF_live10coord = _GLF_FUZZED((vec2(2737.8550, -62.86) + vec2(-82.00, -8.6)));
                            {
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = GLF_live4c;
                                }
                                ivec2 GLF_live10icoord = ivec2(((GLF_live10coord - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                                int GLF_live10res3 = ((GLF_live10icoord.x >> 5) & 1) ^ ((GLF_live10icoord.y & 32) >> 5);
                                int GLF_live10res2 = (GLF_live10icoord.y * GLF_live10icoord.y >> 10) & 1;
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                    vec3 donor_replacementGLF_dead17col = _GLF_FUZZED(fract(round(vec3(-572.711, 4.2, -79.29))));
                                    if (!donor_replacementGLF_dead0canwalk && donor_replacementGLF_dead0canwalk) {
                                        float GLF_dead17stripe = GLF_dead17compute_stripe(tan((GLF_live10coord.x + GLF_live10coord.y) * 20.0), GLF_live10coord.x + GLF_live10coord.y);
                                        donor_replacementGLF_dead17col = mix(vec3(0.5, GLF_live10coord.x, 0.1), vec3(.4, 0, .5), GLF_dead17stripe);
                                        GLF_dead17_GLF_color = vec4(donor_replacementGLF_dead17col, 1.0);
                                        return;
                                    }
                                }
                                int GLF_live10res1 = (GLF_live10icoord.x * GLF_live10icoord.y >> 9) & 1;
                                GLF_live10_GLF_color = vec4(float(GLF_live10res1 ^ GLF_live10res2), float(GLF_live10res2 & GLF_live10res3), float(GLF_live10res1 | GLF_live10res3), 1.0);
                            }
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            {
                                if (GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT(GLF_live4looplimiter1 * 2 + GLF_live4looplimiter1 * 2 * 16, 256)] == 0) {
                                    donor_replacementGLF_dead0p.x = GLF_live4looplimiter1 * 2;
                                    donor_replacementGLF_dead0p.y = GLF_live4looplimiter1 * 2;
                                    donor_replacementGLF_dead0canwalk = true;
                                }
                            }
                        }
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        _GLF_color = _GLF_outlined_4(GLF_live4c);
                    }
                    {
                        if (_GLF_DEAD(false)) {
                            _GLF_color = fwidthFine(GLF_dead3_GLF_color);
                        }
                        if (GLF_live4looplimiter1 >= 4) {
                            ;
                        }
                        if (_GLF_DEAD(false)) {
                            for (int GLF_dead7i = 0; GLF_dead7i < 3; GLF_dead7i++) {
                                if (GLF_live4c[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead7i, 4)] >= 1.0) {
                                    GLF_live4c[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead7i, 4)] = GLF_live4c[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead7i, 4)] * GLF_live4c[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead7i, 4)];
                                }
                            }
                        }
                        GLF_live4looplimiter1++;
                        if (_GLF_DEAD(_GLF_IDENTITY(false, !(!(false))))) {
                            vec2 donor_replacementGLF_dead15coord = _GLF_FUZZED(resolution);
                            if (donor_replacementGLF_dead15coord.x > 0.4) {
                                if (donor_replacementGLF_dead15coord.y < 0.6) {
                                    uvec2 GLF_dead15icoord = uvec2(((donor_replacementGLF_dead15coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                                    uint GLF_dead15res1 = uint(((GLF_dead15icoord.x * GLF_dead15icoord.y) >> (GLF_dead15icoord.x & 31u)) & 0xffffffffu);
                                    uint GLF_dead15res2 = uint(((GLF_dead15icoord.x * GLF_dead15icoord.y) << (GLF_dead15icoord.x & 31u)) & 0xffffffffu);
                                    float GLF_dead15res = float(((GLF_dead15res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_dead15res1 & 1u) != 0u ? 1u : 0u));
                                    GLF_dead15_GLF_color = vec4(GLF_dead15res, GLF_dead15res, GLF_dead15res, 1.0);
                                } else {
                                    ivec2 GLF_dead15icoord = ivec2(((donor_replacementGLF_dead15coord - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                                    int GLF_dead15res3 = ((GLF_dead15icoord.x >> 5) & 1) ^ ((GLF_dead15icoord.y & 32) >> 5);
                                    int GLF_dead15res2 = (GLF_dead15icoord.y * GLF_dead15icoord.y >> 10) & 1;
                                    int GLF_dead15res1 = (GLF_dead15icoord.x * GLF_dead15icoord.y >> 9) & 1;
                                    GLF_dead15_GLF_color = vec4(float(GLF_dead15res1 ^ GLF_dead15res2), float(GLF_dead15res2 & GLF_dead15res3), float(GLF_dead15res1 | GLF_dead15res3), 1.0);
                                }
                            } else {
                                ivec2 GLF_dead15icoord = ivec2(((donor_replacementGLF_dead15coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.6, 1.0)) * 256.0);
                                int GLF_dead15v = (GLF_dead15icoord.x ^ GLF_dead15icoord.y) * GLF_dead15icoord.y;
                                bool GLF_dead15res1 = ((GLF_dead15v >> 10) & 1) != 0;
                                bool GLF_dead15res2 = ((GLF_dead15v >> 11) & 4) != 0;
                                bool GLF_dead15res3 = ((GLF_dead15v >> 12) & 8) != 0;
                                GLF_dead15_GLF_color = vec4(GLF_dead15res1 ? 1.0 : 0.0, GLF_dead15res2 ? 1.0 : 0.0, GLF_dead15res3 ? 1.0 : 0.0, 1);
                            }
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            _GLF_color = GLF_live11_GLF_color;
                            if (_GLF_DEAD(false)) {
                                vec3 donor_replacementGLF_dead17col = _GLF_FUZZED(vec3(46.80, -6.6, 872.072));
                                vec2 donor_replacementGLF_dead17uv = _GLF_FUZZED(GLF_live11injectionSwitch.xy);
                                {
                                    float GLF_dead17stripe = GLF_dead17compute_stripe(tan((donor_replacementGLF_dead17uv.x + donor_replacementGLF_dead17uv.y) * 20.0), donor_replacementGLF_dead17uv.x + donor_replacementGLF_dead17uv.y);
                                    donor_replacementGLF_dead17col = mix(vec3(donor_replacementGLF_dead17uv.x, .8, 0), vec3(1, donor_replacementGLF_dead17uv.y, 0), GLF_dead17stripe);
                                    GLF_dead17_GLF_color = vec4(donor_replacementGLF_dead17col, 1.0);
                                    return;
                                }
                            }
                        }
                        {
                            if (GLF_live4c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live4i, 4)] >= 1.0) {
                                GLF_live4c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live4i, 4)] = GLF_live4c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live4i, 4)] * GLF_live4c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live4i, 4)];
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = GLF_live4c;
                                }
                            }
                            GLF_live4i++;
                            if (_GLF_DEAD(_GLF_IDENTITY(false, false || (false)))) {
                                if (GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead0v * 2 + GLF_dead0d * 2 * 16, 256)] == 0) {
                                    donor_replacementGLF_dead0p.x = donor_replacementGLF_dead0v * 2;
                                    donor_replacementGLF_dead0p.y = GLF_dead0d * 2;
                                    donor_replacementGLF_dead0canwalk = true;
                                }
                            }
                        }
                        if (_GLF_DEAD(false)) {
                            _GLF_color = _GLF_color;
                        }
                    }
                }
            }
            if (GLF_dead0d >= 0 && donor_replacementGLF_dead0p.y > 0 && GLF_dead0map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead0p.x) + (donor_replacementGLF_dead0p.y - 2) * 16, 256)] == 0) {
                {
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        _GLF_color = GLF_dead3_GLF_color;
                    }
                    {
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < abs(0.0))))) {
                            _GLF_color = mat3x4(-8361.6966, 2.9, -0.4, -0.7, 2.9, -688.381, 1906.7989, 873.292, -9.0, -57.60, 2.8, 1276.0199)[2];
                        }
                        ;
                    }
                }
                GLF_dead0d--;
                if (_GLF_DEAD(false)) {
                    _GLF_color = vec4(7643.0341, -490.058, 6444.3239, 1.9);
                }
                GLF_dead0map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead0p.x) + (donor_replacementGLF_dead0p.y) * 16, 256)] = 1;
                GLF_dead0map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead0p.x) + (donor_replacementGLF_dead0p.y - 1) * 16, 256)] = 1;
                GLF_dead0map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead0p.x) + (donor_replacementGLF_dead0p.y - 2) * 16, 256)] = 1;
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < _GLF_IDENTITY(dot(vec4(0.0, 0.0, 1.0, 1.0), vec4(1.0, 1.0, 0.0, 0.0)), dot(vec4(0.0, 0.0, 1.0, 1.0), vec4(1.0, 1.0, 0.0, 0.0))))))) {
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        _GLF_color = GLF_live12injectionSwitch.grgr;
                    }
                    vec4 donor_replacementGLF_dead7c = _GLF_FUZZED(mix(vec4(-8525.8400, -2.4, 85.16, 4.5), GLF_dead3_GLF_color, GLF_dead3_GLF_color));
                    for (int GLF_dead7i = 0; GLF_dead7i < 3; GLF_dead7i++) {
                        if (donor_replacementGLF_dead7c[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead7i, 4)] >= 1.0) {
                            donor_replacementGLF_dead7c[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead7i, 4)] = donor_replacementGLF_dead7c[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead7i, 4)] * donor_replacementGLF_dead7c[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead7i, 4)];
                        }
                    }
                }
                if (_GLF_DEAD(false)) {
                    _GLF_color = GLF_dead3_GLF_color;
                }
                donor_replacementGLF_dead0p.y -= 2;
                {
                    vec4 GLF_live4c = _GLF_FUZZED((vec4(242.827, -4.5, 7.1, -6098.2749) + (vec3(-728.219, -2.9, -570.703) * mat4x3(5966.5371, -0.6, 6.3, 9.2, 77.93, 263.455, -34.19, 448.930, 214.879, -8153.8588, -5213.1832, 55.58)).b));
                    if (_GLF_DEAD(false)) {
                        {
                            ;
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        _GLF_color = (bvec4(false, true, false, true), GLF_live4c);
                    }
                    int GLF_live4i = _GLF_FUZZED(ivec4(-32737, -96868, -99660, -86819).y);
                    if (_GLF_DEAD(_GLF_IDENTITY(false, true && (false)))) {
                        {
                            {
                                ;
                            }
                        }
                        vec2 donor_replacementGLF_dead8coord = _GLF_FUZZED(injectionSwitch);
                        {
                            bool GLF_live11c1 = _GLF_FUZZED((bvec4(true, true, false, true) != bvec4(false, false, false, false)));
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                _GLF_color = GLF_dead3_GLF_color;
                            }
                            bool GLF_live11c2 = _GLF_FUZZED(true);
                            bool GLF_live11c3 = _GLF_FUZZED((vec2(-888.999, 18.34) != vec2(-133.834, -54.20)));
                            vec3 GLF_live11col = _GLF_FUZZED(vec3(29.42, 3.6, 2.9));
                            vec2 GLF_live11uv = _GLF_FUZZED(vec2(25.53, -7.5));
                            if (!GLF_live11c1 && !GLF_live11c2 && GLF_live11c3) {
                                float GLF_live11stripe = GLF_live11compute_stripe(cos((GLF_live11uv.x + GLF_live11uv.y) * 20.0), GLF_live11uv.x + GLF_live11uv.y);
                                GLF_live11col = mix(vec3(.7, sinh(GLF_live11uv.x), GLF_live11uv.x), vec3(.3, .5, GLF_live11uv.x), GLF_live11stripe);
                                GLF_live11_GLF_color = vec4(GLF_live11col, 1.0);
                                ;
                            }
                        }
                        int donor_replacementGLF_dead8i = _GLF_FUZZED(GLF_dead0d);
                        vec4 donor_replacementGLF_dead8res = _GLF_FUZZED(GLF_live4c);
                        for (int GLF_dead8j = 0; GLF_dead8j < 3; GLF_dead8j++) {
                            donor_replacementGLF_dead8res += texture(GLF_dead8tex, donor_replacementGLF_dead8coord + vec2(float(donor_replacementGLF_dead8i - 1) * h_r, float(GLF_dead8j - 1) * h_r)) * GLF_dead8weights[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead8i * 3 + GLF_dead8j, 9)];
                            {
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < log(1.0))))) {
                                    _GLF_color = (+GLF_dead3_GLF_color);
                                }
                                vec2 GLF_live10coord = _GLF_FUZZED(vec2(-862.523, 6866.1794));
                                {
                                    uvec2 GLF_live10icoord = uvec2(((GLF_live10coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                                    if (_GLF_DEAD(false)) {
                                        bool donor_replacementGLF_dead17c1 = _GLF_FUZZED(false);
                                        vec3 donor_replacementGLF_dead17col = _GLF_FUZZED(vec3(9.5, -79.82, -3.1));
                                        if (donor_replacementGLF_dead17c1) {
                                            float GLF_dead17stripe = GLF_dead17compute_stripe(cos((GLF_live10coord.x + GLF_live10coord.y) * 20.0), GLF_live10coord.x + GLF_live10coord.y);
                                            donor_replacementGLF_dead17col = mix(vec3(GLF_live10coord.x, 0, 0.75), vec3(.8, .7, GLF_live10coord.x), GLF_dead17stripe);
                                            GLF_dead17_GLF_color = vec4(donor_replacementGLF_dead17col, 1.0);
                                            return;
                                        }
                                    }
                                    uint GLF_live10res1 = uint(((GLF_live10icoord.x * GLF_live10icoord.y) >> (GLF_live10icoord.x & 31u)) & 0xffffffffu);
                                    uint GLF_live10res2 = uint(((GLF_live10icoord.x * GLF_live10icoord.y) << (GLF_live10icoord.x & 31u)) & 0xffffffffu);
                                    float GLF_live10res = float(((GLF_live10res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_live10res1 & 1u) != 0u ? 1u : 0u));
                                    GLF_live10_GLF_color = vec4(GLF_live10res, GLF_live10res, GLF_live10res, 1.0);
                                }
                            }
                        }
                    }
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        int donor_replacementGLF_dead16i = _GLF_FUZZED(GLF_live4i);
                        int donor_replacementGLF_dead16v = _GLF_FUZZED((((-53071) / donor_replacementGLF_dead0v) ^ GLF_dead0d));
                        do {
                            donor_replacementGLF_dead16v++;
                            int GLF_dead16directions = 0;
                            if (donor_replacementGLF_dead0p.x > 0 && GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead0p.x - 2) + (donor_replacementGLF_dead0p.y) * 16, 256)] == 0) {
                                GLF_dead16directions += 1;
                            }
                            if (donor_replacementGLF_dead0p.y > 0 && GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead0p.x) + (donor_replacementGLF_dead0p.y - 2) * 16, 256)] == 0) {
                                GLF_dead16directions += 1;
                            }
                            if (donor_replacementGLF_dead0p.x < 14 && GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead0p.x + 2) + (donor_replacementGLF_dead0p.y) * 16, 256)] == 0) {
                                GLF_dead16directions += 1;
                            }
                            if (donor_replacementGLF_dead0p.y < 14 && GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead0p.x) + (donor_replacementGLF_dead0p.y + 2) * 16, 256)] == 0) {
                                GLF_dead16directions += 1;
                            }
                            if (GLF_dead16directions == 0) {
                                donor_replacementGLF_dead0canwalk = false;
                                int GLF_dead16j = _GLF_FUZZED(ivec2(-92251, 95393)[1]);
                                for (donor_replacementGLF_dead16i = 0; donor_replacementGLF_dead16i < 8; donor_replacementGLF_dead16i++) {
                                    for (GLF_dead16j = 0; GLF_dead16j < 8; GLF_dead16j++) {
                                        if (GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead16j * 2 + donor_replacementGLF_dead16i * 2 * 16, 256)] == 0) {
                                            donor_replacementGLF_dead0p.x = GLF_dead16j * 2;
                                            donor_replacementGLF_dead0p.y = donor_replacementGLF_dead16i * 2;
                                            donor_replacementGLF_dead0canwalk = true;
                                        }
                                    }
                                }
                                GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead0p.x) + (donor_replacementGLF_dead0p.y) * 16, 256)] = 1;
                            } else {
                                int GLF_dead16d = donor_replacementGLF_dead16v % GLF_dead16directions;
                                donor_replacementGLF_dead16v += GLF_dead16directions;
                                if (GLF_dead16d >= 0 && donor_replacementGLF_dead0p.x > 0 && GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead0p.x - 2) + (donor_replacementGLF_dead0p.y) * 16, 256)] == 0) {
                                    GLF_dead16d--;
                                    GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead0p.x) + (donor_replacementGLF_dead0p.y) * 16, 256)] = 1;
                                    GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead0p.x - 1) + (donor_replacementGLF_dead0p.y) * 16, 256)] = 1;
                                    GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead0p.x - 2) + (donor_replacementGLF_dead0p.y) * 16, 256)] = 1;
                                    donor_replacementGLF_dead0p.x -= 2;
                                }
                                if (GLF_dead16d >= 0 && donor_replacementGLF_dead0p.y > 0 && GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead0p.x) + (donor_replacementGLF_dead0p.y - 2) * 16, 256)] == 0) {
                                    GLF_dead16d--;
                                    GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead0p.x) + (donor_replacementGLF_dead0p.y) * 16, 256)] = 1;
                                    GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead0p.x) + (donor_replacementGLF_dead0p.y - 1) * 16, 256)] = 1;
                                    GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead0p.x) + (donor_replacementGLF_dead0p.y - 2) * 16, 256)] = 1;
                                    donor_replacementGLF_dead0p.y -= 2;
                                }
                                if (GLF_dead16d >= 0 && donor_replacementGLF_dead0p.x < 14 && GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead0p.x + 2) + (donor_replacementGLF_dead0p.y) * 16, 256)] == 0) {
                                    GLF_dead16d--;
                                    GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead0p.x) + (donor_replacementGLF_dead0p.y) * 16, 256)] = 1;
                                    GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead0p.x + 1) + (donor_replacementGLF_dead0p.y) * 16, 256)] = 1;
                                    GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead0p.x + 2) + (donor_replacementGLF_dead0p.y) * 16, 256)] = 1;
                                    donor_replacementGLF_dead0p.x += 2;
                                }
                                if (GLF_dead16d >= 0 && donor_replacementGLF_dead0p.y < 14 && GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead0p.x) + (donor_replacementGLF_dead0p.y + 2) * 16, 256)] == 0) {
                                    GLF_dead16d--;
                                    GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead0p.x) + (donor_replacementGLF_dead0p.y) * 16, 256)] = 1;
                                    GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead0p.x) + (donor_replacementGLF_dead0p.y + 1) * 16, 256)] = 1;
                                    GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead0p.x) + (donor_replacementGLF_dead0p.y + 2) * 16, 256)] = 1;
                                    donor_replacementGLF_dead0p.y += 2;
                                }
                            }
                            if (GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead0p.y * 16 + donor_replacementGLF_dead0p.x, 256)] == 1) {
                                GLF_dead16_GLF_color = vec4(1.0, 1.0, 1.0, 1.0);
                                return;
                            }
                        } while (donor_replacementGLF_dead0canwalk);
                    }
                    {
                        GLF_live4c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live4i, 4)] = GLF_live4c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live4i, 4)] * GLF_live4c[_GLF_MAKE_IN_BOUNDS_INT(GLF_live4i, 4)];
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            _GLF_color = GLF_dead3_GLF_color;
                        }
                        if (_GLF_DEAD(false)) {
                            bool donor_replacementGLF_dead16canwalk = _GLF_FUZZED(bool(time));
                            int donor_replacementGLF_dead16i = _GLF_FUZZED(abs(-85445));
                            int donor_replacementGLF_dead16v = _GLF_FUZZED((GLF_dead0d & ivec2(-9032, -37616))[0]);
                            if (donor_replacementGLF_dead0i == 0) {
                                donor_replacementGLF_dead16canwalk = false;
                                int GLF_dead16j = _GLF_FUZZED(ivec2(-92251, 95393)[1]);
                                for (donor_replacementGLF_dead16i = 0; donor_replacementGLF_dead16i < 8; donor_replacementGLF_dead16i++) {
                                    for (GLF_dead16j = 0; GLF_dead16j < 8; GLF_dead16j++) {
                                        if (GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead16j * 2 + donor_replacementGLF_dead16i * 2 * 16, 256)] == 0) {
                                            donor_replacementGLF_dead0p.x = GLF_dead16j * 2;
                                            donor_replacementGLF_dead0p.y = donor_replacementGLF_dead16i * 2;
                                            donor_replacementGLF_dead16canwalk = true;
                                        }
                                    }
                                }
                                GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead0p.x) + (donor_replacementGLF_dead0p.y) * 16, 256)] = 1;
                            } else {
                                int GLF_dead16d = donor_replacementGLF_dead16v % donor_replacementGLF_dead0i;
                                donor_replacementGLF_dead16v += donor_replacementGLF_dead0i;
                                if (GLF_dead16d >= 0 && donor_replacementGLF_dead0p.x > 0 && GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead0p.x - 2) + (donor_replacementGLF_dead0p.y) * 16, 256)] == 0) {
                                    GLF_dead16d--;
                                    GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead0p.x) + (donor_replacementGLF_dead0p.y) * 16, 256)] = 1;
                                    GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead0p.x - 1) + (donor_replacementGLF_dead0p.y) * 16, 256)] = 1;
                                    GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead0p.x - 2) + (donor_replacementGLF_dead0p.y) * 16, 256)] = 1;
                                    donor_replacementGLF_dead0p.x -= 2;
                                }
                                if (GLF_dead16d >= 0 && donor_replacementGLF_dead0p.y > 0 && GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead0p.x) + (donor_replacementGLF_dead0p.y - 2) * 16, 256)] == 0) {
                                    GLF_dead16d--;
                                    GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead0p.x) + (donor_replacementGLF_dead0p.y) * 16, 256)] = 1;
                                    GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead0p.x) + (donor_replacementGLF_dead0p.y - 1) * 16, 256)] = 1;
                                    GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead0p.x) + (donor_replacementGLF_dead0p.y - 2) * 16, 256)] = 1;
                                    donor_replacementGLF_dead0p.y -= 2;
                                }
                                if (GLF_dead16d >= 0 && donor_replacementGLF_dead0p.x < 14 && GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead0p.x + 2) + (donor_replacementGLF_dead0p.y) * 16, 256)] == 0) {
                                    GLF_dead16d--;
                                    GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead0p.x) + (donor_replacementGLF_dead0p.y) * 16, 256)] = 1;
                                    GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead0p.x + 1) + (donor_replacementGLF_dead0p.y) * 16, 256)] = 1;
                                    GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead0p.x + 2) + (donor_replacementGLF_dead0p.y) * 16, 256)] = 1;
                                    donor_replacementGLF_dead0p.x += 2;
                                }
                                if (GLF_dead16d >= 0 && donor_replacementGLF_dead0p.y < 14 && GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead0p.x) + (donor_replacementGLF_dead0p.y + 2) * 16, 256)] == 0) {
                                    GLF_dead16d--;
                                    GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead0p.x) + (donor_replacementGLF_dead0p.y) * 16, 256)] = 1;
                                    GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead0p.x) + (donor_replacementGLF_dead0p.y + 1) * 16, 256)] = 1;
                                    GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead0p.x) + (donor_replacementGLF_dead0p.y + 2) * 16, 256)] = 1;
                                    donor_replacementGLF_dead0p.y += 2;
                                }
                            }
                        }
                    }
                }
            }
            if (GLF_dead0d >= 0 && donor_replacementGLF_dead0p.x < 14 && GLF_dead0map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead0p.x + 2) + (donor_replacementGLF_dead0p.y) * 16, 256)] == 0) {
                GLF_dead0d--;
                GLF_dead0map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead0p.x) + (donor_replacementGLF_dead0p.y) * 16, 256)] = 1;
                {
                    vec2 GLF_live10coord = _GLF_FUZZED(vec2(-7.0, -9.7));
                    if (_GLF_DEAD(false)) {
                        _GLF_color = _GLF_color;
                    }
                    {
                        uvec2 GLF_live10icoord = uvec2(((GLF_live10coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                        uint GLF_live10res1 = uint(((GLF_live10icoord.x * GLF_live10icoord.y) >> (GLF_live10icoord.x & 31u)) & 0xffffffffu);
                        uint GLF_live10res2 = uint(((GLF_live10icoord.x * GLF_live10icoord.y) << (GLF_live10icoord.x & 31u)) & 0xffffffffu);
                        if (_GLF_DEAD(false)) {
                            _GLF_color = sign(GLF_live11_GLF_color);
                        }
                        float GLF_live10res = float(((GLF_live10res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_live10res1 & 1u) != 0u ? 1u : 0u));
                        GLF_live10_GLF_color = vec4(GLF_live10res, GLF_live10res, GLF_live10res, 1.0);
                    }
                }
                GLF_dead0map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead0p.x + 1) + (donor_replacementGLF_dead0p.y) * 16, 256)] = 1;
                GLF_dead0map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead0p.x + 2) + (donor_replacementGLF_dead0p.y) * 16, 256)] = 1;
                donor_replacementGLF_dead0p.x += 2;
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                int donor_replacementGLF_dead16d = _GLF_FUZZED(bitfieldInsert(findMSB(donor_replacementGLF_dead0v), GLF_dead0d, donor_replacementGLF_dead0directions, abs(GLF_dead0d)));
                {
                    donor_replacementGLF_dead16d--;
                    GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead0p.x) + (donor_replacementGLF_dead0p.y) * 16, 256)] = 1;
                    GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead0p.x + 1) + (donor_replacementGLF_dead0p.y) * 16, 256)] = 1;
                    GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead0p.x + 2) + (donor_replacementGLF_dead0p.y) * 16, 256)] = 1;
                    donor_replacementGLF_dead0p.x += 2;
                }
            }
            if (GLF_dead0d >= 0 && donor_replacementGLF_dead0p.y < 14 && GLF_dead0map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead0p.x) + (donor_replacementGLF_dead0p.y + 2) * 16, 256)] == 0) {
                GLF_dead0d--;
                GLF_dead0map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead0p.x) + (donor_replacementGLF_dead0p.y) * 16, 256)] = 1;
                if (_GLF_DEAD(false)) {
                    _GLF_color = vec4(-5719.8264, -959.003, 18.68, -781.543);
                }
                {
                    int GLF_live13c_im = _GLF_FUZZED(-27614);
                    int GLF_live13c_re = _GLF_FUZZED(-5993);
                    int GLF_live13iteration = _GLF_FUZZED(-20170);
                    int GLF_live13x = _GLF_FUZZED(((-94394) + ivec2(38726, -75430)).s);
                    int GLF_live13y = _GLF_FUZZED((ivec4(50526, -56811, -53468, 46064).b + 94202));
                    {
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                            bool donor_replacementGLF_dead17c1 = _GLF_FUZZED(donor_replacementGLF_dead0canwalk);
                            vec3 donor_replacementGLF_dead17col = _GLF_FUZZED(acosh(vec3(35.12, 48.78, 8483.2850)));
                            vec2 donor_replacementGLF_dead17uv = _GLF_FUZZED(GLF_live12injectionSwitch);
                            if (!donor_replacementGLF_dead17c1 && !donor_replacementGLF_dead0canwalk && donor_replacementGLF_dead0canwalk) {
                                float GLF_dead17stripe = GLF_dead17compute_stripe(cos((donor_replacementGLF_dead17uv.x + donor_replacementGLF_dead17uv.y) * 20.0), donor_replacementGLF_dead17uv.x + donor_replacementGLF_dead17uv.y);
                                donor_replacementGLF_dead17col = mix(vec3(.7, sinh(donor_replacementGLF_dead17uv.x), donor_replacementGLF_dead17uv.x), vec3(.3, .5, donor_replacementGLF_dead17uv.x), GLF_dead17stripe);
                                GLF_dead17_GLF_color = vec4(donor_replacementGLF_dead17col, 1.0);
                                return;
                            }
                        }
                        if (_GLF_DEAD(false)) {
                            _GLF_color = GLF_dead3_GLF_color;
                        }
                        int GLF_live13looplimiter0 = 0;
                        for (int GLF_live13k = 0; GLF_live13k < 1000; GLF_live13k++) {
                            if (GLF_live13looplimiter0 >= 3) {
                                if (_GLF_DEAD(false)) {
                                    _GLF_color = GLF_dead9gl_FragCoord;
                                }
                                break;
                            }
                            GLF_live13looplimiter0++;
                            if (_GLF_DEAD(false)) {
                                _GLF_color = dFdx(_GLF_color);
                            }
                            {
                                if (GLF_live13x * GLF_live13x + GLF_live13y * GLF_live13y > 262144) {
                                    break;
                                }
                                int GLF_live13x_new = ((GLF_live13x * GLF_live13x - GLF_live13y * GLF_live13y) / 256 + GLF_live13c_re);
                                GLF_live13y = (2 * GLF_live13x * GLF_live13y / 256 + GLF_live13c_im);
                                GLF_live13x = GLF_live13x_new;
                                GLF_live13iteration++;
                            }
                        }
                        if (_GLF_DEAD(_GLF_IDENTITY(false, (false) || false))) {
                            _GLF_color = vec3(0.7, -5.2, 8.5).yxzy;
                        }
                    }
                }
                GLF_dead0map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead0p.x) + (donor_replacementGLF_dead0p.y + 1) * 16, 256)] = 1;
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    {
                        if (_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead0i, 4)] >= 1.0) {
                            _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead0i, 4)] = _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead0i, 4)] * _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead0i, 4)];
                        }
                    }
                }
                {
                    {
                        vec3 GLF_live11col = _GLF_FUZZED((vec3(1.2, 1.2, -9116.8661)));
                        vec2 GLF_live11uv = _GLF_FUZZED(vec2(-55.96, 436.228));
                        if (_GLF_DEAD(false)) {
                            vec3 donor_replacementGLF_dead17col = _GLF_FUZZED(vec3(-55.52, -4738.1025, 7.1));
                            {
                                float GLF_dead17stripe = GLF_dead17compute_stripe(cos((GLF_live11uv.x + GLF_live11uv.y) * 20.0), GLF_live11uv.x + GLF_live11uv.y);
                                donor_replacementGLF_dead17col = mix(vec3(GLF_live11uv.x, 0, 0.75), vec3(.8, .7, GLF_live11uv.x), GLF_dead17stripe);
                                GLF_dead17_GLF_color = vec4(donor_replacementGLF_dead17col, 1.0);
                                return;
                            }
                        }
                        {
                            float GLF_live11stripe = GLF_live11compute_stripe(tan((GLF_live11uv.x + GLF_live11uv.y) * 20.0), GLF_live11uv.x + GLF_live11uv.y);
                            GLF_live11col = mix(vec3(0.5, GLF_live11uv.x, 0.1), vec3(.4, 0, .5), GLF_live11stripe);
                            GLF_live11_GLF_color = vec4(GLF_live11col, 1.0);
                            ;
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        _GLF_color = GLF_live11_GLF_color;
                    }
                    int GLF_live4looplimiter0 = 0;
                    if (GLF_live4looplimiter0 >= 4) {
                        ;
                        {
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                bool donor_replacementGLF_dead17c3 = _GLF_FUZZED(any(bvec4(true, false, false, false)));
                                vec3 donor_replacementGLF_dead17col = _GLF_FUZZED(fwidth(step(asinh(b_b), vec3(-447.199, 2.9, -99.60))));
                                vec2 donor_replacementGLF_dead17uv = _GLF_FUZZED(vec3(89.43, -282.551, 5991.3274).rg);
                                if (!donor_replacementGLF_dead0canwalk && !donor_replacementGLF_dead0canwalk && !donor_replacementGLF_dead17c3 && donor_replacementGLF_dead0canwalk) {
                                    float GLF_dead17stripe = GLF_dead17compute_stripe(tan((donor_replacementGLF_dead17uv.x + donor_replacementGLF_dead17uv.y) * 20.0), donor_replacementGLF_dead17uv.x + donor_replacementGLF_dead17uv.y);
                                    donor_replacementGLF_dead17col = mix(vec3(donor_replacementGLF_dead17uv.x, .8, 0), vec3(1, donor_replacementGLF_dead17uv.y, 0), GLF_dead17stripe);
                                    GLF_dead17_GLF_color = vec4(donor_replacementGLF_dead17col, 1.0);
                                    return;
                                }
                            }
                            vec2 GLF_live10coord = _GLF_FUZZED(vec2(vec3(9.2, -5.6, -84.25)));
                            if (GLF_live10coord.x > 0.4) {
                                if (GLF_live10coord.y < 0.6) {
                                    uvec2 GLF_live10icoord = uvec2(((GLF_live10coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                                    uint GLF_live10res1 = uint(((GLF_live10icoord.x * GLF_live10icoord.y) >> (GLF_live10icoord.x & 31u)) & 0xffffffffu);
                                    uint GLF_live10res2 = uint(((GLF_live10icoord.x * GLF_live10icoord.y) << (GLF_live10icoord.x & 31u)) & 0xffffffffu);
                                    float GLF_live10res = float(((GLF_live10res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_live10res1 & 1u) != 0u ? 1u : 0u));
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                        {
                                            GLF_live4msb8 += 1;
                                        }
                                    }
                                    GLF_live10_GLF_color = vec4(GLF_live10res, GLF_live10res, GLF_live10res, 1.0);
                                } else {
                                    ivec2 GLF_live10icoord = ivec2(((GLF_live10coord - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                                    int GLF_live10res3 = ((GLF_live10icoord.x >> 5) & 1) ^ ((GLF_live10icoord.y & 32) >> 5);
                                    int GLF_live10res2 = (GLF_live10icoord.y * GLF_live10icoord.y >> 10) & 1;
                                    if (_GLF_DEAD(_GLF_IDENTITY(false, !(!(false))))) {
                                        _GLF_color = _GLF_color;
                                    }
                                    int GLF_live10res1 = (GLF_live10icoord.x * GLF_live10icoord.y >> 9) & 1;
                                    if (_GLF_DEAD(false)) {
                                        _GLF_color = GLF_live10_GLF_color;
                                    }
                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                        bool donor_replacementGLF_dead17c2 = _GLF_FUZZED((bvec2(false, false) != bvec2(true, false)));
                                        vec3 donor_replacementGLF_dead17col = _GLF_FUZZED(vec3(-8466.6347, -7.9, -2320.7376));
                                        if (!donor_replacementGLF_dead0canwalk && donor_replacementGLF_dead17c2) {
                                            float GLF_dead17stripe = GLF_dead17compute_stripe(tan((GLF_live10coord.x + GLF_live10coord.y) * 20.0), GLF_live10coord.x + GLF_live10coord.y);
                                            donor_replacementGLF_dead17col = mix(vec3(0.5, GLF_live10coord.x, 0.1), vec3(.4, 0, .5), GLF_dead17stripe);
                                            GLF_dead17_GLF_color = vec4(donor_replacementGLF_dead17col, 1.0);
                                            return;
                                        }
                                    }
                                    GLF_live10_GLF_color = vec4(float(GLF_live10res1 ^ GLF_live10res2), float(GLF_live10res2 & GLF_live10res3), float(GLF_live10res1 | GLF_live10res3), 1.0);
                                }
                            } else {
                                ivec2 GLF_live10icoord = ivec2(((GLF_live10coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.6, 1.0)) * 256.0);
                                int GLF_live10v = (GLF_live10icoord.x ^ GLF_live10icoord.y) * GLF_live10icoord.y;
                                bool GLF_live10res1 = ((GLF_live10v >> 10) & 1) != 0;
                                bool GLF_live10res2 = ((GLF_live10v >> 11) & 4) != 0;
                                bool GLF_live10res3 = ((GLF_live10v >> 12) & 8) != 0;
                                if (_GLF_DEAD(false)) {
                                    {
                                        GLF_live10v += 1;
                                    }
                                }
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                    _GLF_color = uintBitsToFloat(uvec4(10577u, 13695u, 112934u, 198819u));
                                }
                                GLF_live10_GLF_color = vec4(GLF_live10res1 ? 1.0 : 0.0, GLF_live10res2 ? 1.0 : 0.0, GLF_live10res3 ? 1.0 : 0.0, 1);
                            }
                        }
                        if (_GLF_DEAD(false)) {
                            if (_GLF_DEAD(false)) {
                                _GLF_color = radians(asin(_GLF_color));
                            }
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                {
                                    ;
                                }
                                {
                                    {
                                        ;
                                    }
                                }
                            }
                            _GLF_color = _GLF_color;
                        }
                        {
                            if (_GLF_DEAD(false)) {
                                _GLF_color = atan(GLF_dead9gl_FragCoord);
                            }
                            vec3 GLF_live12color = _GLF_FUZZED((vec3(3426.6163, -8086.2591, -4.1) * (+(-7588.8275))));
                            int GLF_live12count = _GLF_FUZZED((-(+((-93599) + (-24642)))));
                            int GLF_live12looplimiter4 = 0;
                            do {
                                if (GLF_live12looplimiter4 >= 6) {
                                    break;
                                }
                                if (_GLF_DEAD(_GLF_IDENTITY(false, bool(bvec2(false, true))))) {
                                    ivec2 donor_replacementGLF_dead16p = _GLF_FUZZED(ivec2(-58367, 78677));
                                    if (GLF_live12count >= 0 && donor_replacementGLF_dead16p.y < 14 && GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead16p.x) + (donor_replacementGLF_dead16p.y + 2) * 16, 256)] == 0) {
                                        GLF_live12count--;
                                        GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead16p.x) + (donor_replacementGLF_dead16p.y) * 16, 256)] = 1;
                                        GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead16p.x) + (donor_replacementGLF_dead16p.y + 1) * 16, 256)] = 1;
                                        GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead16p.x) + (donor_replacementGLF_dead16p.y + 2) * 16, 256)] = 1;
                                        donor_replacementGLF_dead16p.y += 2;
                                    }
                                }
                                GLF_live12looplimiter4++;
                                {
                                    GLF_live12color -= GLF_live12palette(vec3(float(GLF_live12obj.numbers[4]) * 0.1), trunc(vec3(0.1)), vec3(float(GLF_live12obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_live12injectionSwitch.y), 10)]) * 0.1), vec3(GLF_live12injectionSwitch.x, float(GLF_live12obj.numbers[2]) * 0.1, float(GLF_live12obj.numbers[8]) * 0.1));
                                    GLF_live12count++;
                                }
                            } while (GLF_live12count != GLF_live12obj.numbers[1]);
                        }
                    }
                    {
                        vec2 GLF_live10coord = _GLF_FUZZED(vec2(-0.9, -71.66));
                        if (GLF_live10coord.y < 0.6) {
                            uvec2 GLF_live10icoord = uvec2(((GLF_live10coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                            uint GLF_live10res1 = uint(((GLF_live10icoord.x * GLF_live10icoord.y) >> (GLF_live10icoord.x & 31u)) & 0xffffffffu);
                            uint GLF_live10res2 = uint(((GLF_live10icoord.x * GLF_live10icoord.y) << (GLF_live10icoord.x & 31u)) & 0xffffffffu);
                            float GLF_live10res = float(((GLF_live10res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_live10res1 & 1u) != 0u ? 1u : 0u));
                            GLF_live10_GLF_color = vec4(GLF_live10res, GLF_live10res, GLF_live10res, 1.0);
                            if (_GLF_DEAD(false)) {
                                vec3 donor_replacementGLF_dead17col = _GLF_FUZZED(vec3(-11.42, -816.503, -114.794));
                                {
                                    float GLF_dead17stripe = GLF_dead17compute_stripe(cos((GLF_live10coord.x + GLF_live10coord.y) * 20.0), GLF_live10coord.x + GLF_live10coord.y);
                                    donor_replacementGLF_dead17col = mix(vec3(GLF_live10coord.x, 0, 0.75), vec3(.8, .7, GLF_live10coord.x), GLF_dead17stripe);
                                    GLF_dead17_GLF_color = vec4(donor_replacementGLF_dead17col, 1.0);
                                    return;
                                }
                            }
                        } else {
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                vec3 donor_replacementGLF_dead17col = _GLF_FUZZED(ceil(vec3(6.5, -346.989, -8.3)));
                                {
                                    float GLF_dead17stripe = GLF_dead17compute_stripe(cos((GLF_live10coord.x + GLF_live10coord.y) * 20.0), GLF_live10coord.x + GLF_live10coord.y);
                                    donor_replacementGLF_dead17col = mix(vec3(.7, sinh(GLF_live10coord.x), GLF_live10coord.x), vec3(.3, .5, GLF_live10coord.x), GLF_dead17stripe);
                                    GLF_dead17_GLF_color = vec4(donor_replacementGLF_dead17col, 1.0);
                                    return;
                                }
                            }
                            ivec2 GLF_live10icoord = ivec2(((GLF_live10coord - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                            if (_GLF_DEAD(false)) {
                                if (donor_replacementGLF_dead0v == 0) {
                                    donor_replacementGLF_dead0canwalk = false;
                                    int GLF_dead16j = _GLF_FUZZED(ivec2(-92251, 95393)[1]);
                                    for (donor_replacementGLF_dead0directions = 0; donor_replacementGLF_dead0directions < 8; donor_replacementGLF_dead0directions++) {
                                        for (GLF_dead16j = 0; GLF_dead16j < 8; GLF_dead16j++) {
                                            if (GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead16j * 2 + donor_replacementGLF_dead0directions * 2 * 16, 256)] == 0) {
                                                GLF_live10icoord.x = GLF_dead16j * 2;
                                                GLF_live10icoord.y = donor_replacementGLF_dead0directions * 2;
                                                donor_replacementGLF_dead0canwalk = true;
                                            }
                                        }
                                    }
                                    GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live10icoord.x) + (GLF_live10icoord.y) * 16, 256)] = 1;
                                } else {
                                    int GLF_dead16d = GLF_live4msb8 % donor_replacementGLF_dead0v;
                                    GLF_live4msb8 += donor_replacementGLF_dead0v;
                                    if (GLF_dead16d >= 0 && GLF_live10icoord.x > 0 && GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live10icoord.x - 2) + (GLF_live10icoord.y) * 16, 256)] == 0) {
                                        GLF_dead16d--;
                                        GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live10icoord.x) + (GLF_live10icoord.y) * 16, 256)] = 1;
                                        GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live10icoord.x - 1) + (GLF_live10icoord.y) * 16, 256)] = 1;
                                        GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live10icoord.x - 2) + (GLF_live10icoord.y) * 16, 256)] = 1;
                                        GLF_live10icoord.x -= 2;
                                    }
                                    if (GLF_dead16d >= 0 && GLF_live10icoord.y > 0 && GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live10icoord.x) + (GLF_live10icoord.y - 2) * 16, 256)] == 0) {
                                        GLF_dead16d--;
                                        GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live10icoord.x) + (GLF_live10icoord.y) * 16, 256)] = 1;
                                        GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live10icoord.x) + (GLF_live10icoord.y - 1) * 16, 256)] = 1;
                                        GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live10icoord.x) + (GLF_live10icoord.y - 2) * 16, 256)] = 1;
                                        GLF_live10icoord.y -= 2;
                                    }
                                    if (GLF_dead16d >= 0 && GLF_live10icoord.x < 14 && GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live10icoord.x + 2) + (GLF_live10icoord.y) * 16, 256)] == 0) {
                                        GLF_dead16d--;
                                        GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live10icoord.x) + (GLF_live10icoord.y) * 16, 256)] = 1;
                                        GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live10icoord.x + 1) + (GLF_live10icoord.y) * 16, 256)] = 1;
                                        GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live10icoord.x + 2) + (GLF_live10icoord.y) * 16, 256)] = 1;
                                        GLF_live10icoord.x += 2;
                                    }
                                    if (GLF_dead16d >= 0 && GLF_live10icoord.y < 14 && GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live10icoord.x) + (GLF_live10icoord.y + 2) * 16, 256)] == 0) {
                                        GLF_dead16d--;
                                        GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live10icoord.x) + (GLF_live10icoord.y) * 16, 256)] = 1;
                                        GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live10icoord.x) + (GLF_live10icoord.y + 1) * 16, 256)] = 1;
                                        GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((GLF_live10icoord.x) + (GLF_live10icoord.y + 2) * 16, 256)] = 1;
                                        GLF_live10icoord.y += 2;
                                    }
                                }
                            }
                            int GLF_live10res3 = ((GLF_live10icoord.x >> 5) & 1) ^ ((GLF_live10icoord.y & 32) >> 5);
                            int GLF_live10res2 = (GLF_live10icoord.y * GLF_live10icoord.y >> 10) & 1;
                            int GLF_live10res1 = (GLF_live10icoord.x * GLF_live10icoord.y >> 9) & 1;
                            if (_GLF_DEAD(false)) {
                                _GLF_color = (s_g - GLF_dead3_GLF_color);
                            }
                            GLF_live10_GLF_color = vec4(float(GLF_live10res1 ^ GLF_live10res2), float(GLF_live10res2 & GLF_live10res3), float(GLF_live10res1 | GLF_live10res3), 1.0);
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        {
                            bool GLF_live11c1 = _GLF_FUZZED(true);
                            bool GLF_live11c2 = _GLF_FUZZED(true);
                            if (_GLF_DEAD(_GLF_IDENTITY(false, bool(bool(false))))) {
                                _GLF_color = tanh(abs(GLF_dead3_GLF_color));
                            }
                            bool GLF_live11c3 = _GLF_FUZZED((mat4x2(0.2, -9.2, -35.96, -8944.1018, 6.0, -2431.2026, 5.4, 280.091) == mat4x2(-85.70, -0.1, 76.47, -705.896, 1.4, 6.8, 7488.2918, -602.394)));
                            vec3 GLF_live11col = _GLF_FUZZED((vec3(548.009, 1921.4786, -43.94) * (-7.6)));
                            if (_GLF_DEAD(false)) {
                                _GLF_color = floor(vec4(-7.0, 659.518, -6.9, 8675.8923));
                            }
                            vec2 GLF_live11uv = _GLF_FUZZED(vec3(-5.6, 614.599, 80.79).pt);
                            if (!GLF_live11c1 && !GLF_live11c2 && GLF_live11c3) {
                                float GLF_live11stripe = GLF_live11compute_stripe(cos((GLF_live11uv.x + GLF_live11uv.y) * 20.0), GLF_live11uv.x + GLF_live11uv.y);
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < sqrt(0.0))))) {
                                    _GLF_color = (atan(GLF_live11_GLF_color, GLF_live11_GLF_color) / time);
                                }
                                GLF_live11col = mix(vec3(.7, sinh(GLF_live11uv.x), GLF_live11uv.x), vec3(.3, .5, GLF_live11uv.x), GLF_live11stripe);
                                GLF_live11_GLF_color = vec4(GLF_live11col, 1.0);
                                ;
                                if (_GLF_DEAD(false)) {
                                    if (donor_replacementGLF_dead0v == 0) {
                                        donor_replacementGLF_dead0canwalk = false;
                                        int GLF_dead16j = _GLF_FUZZED(ivec2(-92251, 95393)[1]);
                                        for (donor_replacementGLF_dead0i = 0; donor_replacementGLF_dead0i < 8; donor_replacementGLF_dead0i++) {
                                            for (GLF_dead16j = 0; GLF_dead16j < 8; GLF_dead16j++) {
                                                if (GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead16j * 2 + donor_replacementGLF_dead0i * 2 * 16, 256)] == 0) {
                                                    donor_replacementGLF_dead0p.x = GLF_dead16j * 2;
                                                    donor_replacementGLF_dead0p.y = donor_replacementGLF_dead0i * 2;
                                                    donor_replacementGLF_dead0canwalk = true;
                                                }
                                            }
                                        }
                                        GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead0p.x) + (donor_replacementGLF_dead0p.y) * 16, 256)] = 1;
                                    } else {
                                        int GLF_dead16d = GLF_live4msb8 % donor_replacementGLF_dead0v;
                                        GLF_live4msb8 += donor_replacementGLF_dead0v;
                                        if (GLF_dead16d >= 0 && donor_replacementGLF_dead0p.x > 0 && GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead0p.x - 2) + (donor_replacementGLF_dead0p.y) * 16, 256)] == 0) {
                                            GLF_dead16d--;
                                            GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead0p.x) + (donor_replacementGLF_dead0p.y) * 16, 256)] = 1;
                                            GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead0p.x - 1) + (donor_replacementGLF_dead0p.y) * 16, 256)] = 1;
                                            GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead0p.x - 2) + (donor_replacementGLF_dead0p.y) * 16, 256)] = 1;
                                            donor_replacementGLF_dead0p.x -= 2;
                                        }
                                        if (GLF_dead16d >= 0 && donor_replacementGLF_dead0p.y > 0 && GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead0p.x) + (donor_replacementGLF_dead0p.y - 2) * 16, 256)] == 0) {
                                            GLF_dead16d--;
                                            GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead0p.x) + (donor_replacementGLF_dead0p.y) * 16, 256)] = 1;
                                            GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead0p.x) + (donor_replacementGLF_dead0p.y - 1) * 16, 256)] = 1;
                                            GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead0p.x) + (donor_replacementGLF_dead0p.y - 2) * 16, 256)] = 1;
                                            donor_replacementGLF_dead0p.y -= 2;
                                        }
                                        if (GLF_dead16d >= 0 && donor_replacementGLF_dead0p.x < 14 && GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead0p.x + 2) + (donor_replacementGLF_dead0p.y) * 16, 256)] == 0) {
                                            GLF_dead16d--;
                                            GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead0p.x) + (donor_replacementGLF_dead0p.y) * 16, 256)] = 1;
                                            GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead0p.x + 1) + (donor_replacementGLF_dead0p.y) * 16, 256)] = 1;
                                            GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead0p.x + 2) + (donor_replacementGLF_dead0p.y) * 16, 256)] = 1;
                                            donor_replacementGLF_dead0p.x += 2;
                                        }
                                        if (GLF_dead16d >= 0 && donor_replacementGLF_dead0p.y < 14 && GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead0p.x) + (donor_replacementGLF_dead0p.y + 2) * 16, 256)] == 0) {
                                            GLF_dead16d--;
                                            GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead0p.x) + (donor_replacementGLF_dead0p.y) * 16, 256)] = 1;
                                            GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead0p.x) + (donor_replacementGLF_dead0p.y + 1) * 16, 256)] = 1;
                                            GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead0p.x) + (donor_replacementGLF_dead0p.y + 2) * 16, 256)] = 1;
                                            donor_replacementGLF_dead0p.y += 2;
                                        }
                                    }
                                }
                            }
                        }
                        _GLF_color = sqrt(GLF_dead3_GLF_color);
                    }
                }
                GLF_dead0map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead0p.x) + (donor_replacementGLF_dead0p.y + 2) * 16, 256)] = 1;
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    _GLF_color = vec4(-2352.8916, -2.2, -65.05, -76.34);
                }
                donor_replacementGLF_dead0p.y += 2;
                if (_GLF_DEAD(false)) {
                    vec2 donor_replacementGLF_dead15coord = _GLF_FUZZED(GLF_live12injectionSwitch);
                    {
                        if (donor_replacementGLF_dead15coord.y < 0.6) {
                            uvec2 GLF_dead15icoord = uvec2(((donor_replacementGLF_dead15coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                            uint GLF_dead15res1 = uint(((GLF_dead15icoord.x * GLF_dead15icoord.y) >> (GLF_dead15icoord.x & 31u)) & 0xffffffffu);
                            uint GLF_dead15res2 = uint(((GLF_dead15icoord.x * GLF_dead15icoord.y) << (GLF_dead15icoord.x & 31u)) & 0xffffffffu);
                            float GLF_dead15res = float(((GLF_dead15res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_dead15res1 & 1u) != 0u ? 1u : 0u));
                            GLF_dead15_GLF_color = vec4(GLF_dead15res, GLF_dead15res, GLF_dead15res, 1.0);
                        } else {
                            ivec2 GLF_dead15icoord = ivec2(((donor_replacementGLF_dead15coord - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                            int GLF_dead15res3 = ((GLF_dead15icoord.x >> 5) & 1) ^ ((GLF_dead15icoord.y & 32) >> 5);
                            int GLF_dead15res2 = (GLF_dead15icoord.y * GLF_dead15icoord.y >> 10) & 1;
                            int GLF_dead15res1 = (GLF_dead15icoord.x * GLF_dead15icoord.y >> 9) & 1;
                            GLF_dead15_GLF_color = vec4(float(GLF_dead15res1 ^ GLF_dead15res2), float(GLF_dead15res2 & GLF_dead15res3), float(GLF_dead15res1 | GLF_dead15res3), 1.0);
                        }
                    }
                }
            }
        }
    }
    mat2 rotationMatrix;
    rotationMatrix = mat2(sin(angle), -cos(angle), cos(angle), sin(angle));
    if (_GLF_DEAD(false)) {
        ivec2 donor_replacementGLF_dead1p = _GLF_FUZZED(ivec2(19718, -3584));
        {
            donor_replacementGLF_dead1p = GLF_dead1iter(donor_replacementGLF_dead1p);
        }
        {
            int GLF_live6i = _GLF_FUZZED((45763));
            int GLF_live6j = _GLF_FUZZED(68728);
            if (_GLF_DEAD(false)) {
                _GLF_color = dFdxFine(vec4(vec2(-242.116, -349.244), -5.8, angle));
            }
            uint GLF_live6uselessOutVariable = _GLF_FUZZED(56368u);
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                vec2 donor_replacementGLF_dead8coord = _GLF_FUZZED(resolution);
                {
                    for (int GLF_dead8j = 0; GLF_dead8j < 3; GLF_dead8j++) {
                        GLF_dead3_GLF_color += texture(GLF_dead8tex, donor_replacementGLF_dead8coord + vec2(float(GLF_live4msb8 - 1) * s_g, float(GLF_dead8j - 1) * s_g)) * GLF_dead8weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live4msb8 * 3 + GLF_dead8j, 9)];
                    }
                }
            }
            if (uint(GLF_live6j) < uaddCarry(uint(GLF_live6i), 1u, GLF_live6uselessOutVariable)) {
                ;
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < abs(0.0))))) {
                    _GLF_color = dFdyFine(vec4(-3.2, 0.7, -2.7, 1.4));
                }
            }
        }
        {
            vec2 GLF_live10coord = _GLF_FUZZED(vec2(-6.2, -2.7));
            {
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    int donor_replacementGLF_dead16d = _GLF_FUZZED(GLF_live4msb8);
                    ivec2 donor_replacementGLF_dead16p = _GLF_FUZZED(bitfieldReverse(donor_replacementGLF_dead1p));
                    {
                        donor_replacementGLF_dead16d--;
                        GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead16p.x) + (donor_replacementGLF_dead16p.y) * 16, 256)] = 1;
                        GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead16p.x) + (donor_replacementGLF_dead16p.y - 1) * 16, 256)] = 1;
                        GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead16p.x) + (donor_replacementGLF_dead16p.y - 2) * 16, 256)] = 1;
                        donor_replacementGLF_dead16p.y -= 2;
                    }
                }
                if (GLF_live10coord.y < 0.6) {
                    uvec2 GLF_live10icoord = uvec2(((GLF_live10coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                    uint GLF_live10res1 = uint(((GLF_live10icoord.x * GLF_live10icoord.y) >> (GLF_live10icoord.x & 31u)) & 0xffffffffu);
                    uint GLF_live10res2 = uint(((GLF_live10icoord.x * GLF_live10icoord.y) << (GLF_live10icoord.x & 31u)) & 0xffffffffu);
                    float GLF_live10res = float(((GLF_live10res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_live10res1 & 1u) != 0u ? 1u : 0u));
                    GLF_live10_GLF_color = vec4(GLF_live10res, GLF_live10res, GLF_live10res, 1.0);
                } else {
                    ivec2 GLF_live10icoord = ivec2(((GLF_live10coord - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                    int GLF_live10res3 = ((GLF_live10icoord.x >> 5) & 1) ^ ((GLF_live10icoord.y & 32) >> 5);
                    int GLF_live10res2 = (GLF_live10icoord.y * GLF_live10icoord.y >> 10) & 1;
                    int GLF_live10res1 = (GLF_live10icoord.x * GLF_live10icoord.y >> 9) & 1;
                    GLF_live10_GLF_color = vec4(float(GLF_live10res1 ^ GLF_live10res2), float(GLF_live10res2 & GLF_live10res3), float(GLF_live10res1 | GLF_live10res3), 1.0);
                }
            }
        }
    }
    vec3 point1;
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
        {
            GLF_dead3_GLF_color = vec4(1.0, 0.0, 0.0, 1.0);
        }
    }
    point1 = computePoint(rotationMatrix);
    {
        vec2 GLF_live10coord = _GLF_FUZZED(vec2(-3.9, -5129.5544));
        if (_GLF_DEAD(false)) {
            _GLF_color = dFdx(vec4(-0.3, 662.310, -239.984, -4674.4193));
            if (_GLF_DEAD(false)) {
                if (GLF_live10coord.x > 0.4) {
                    if (GLF_live10coord.y < 0.6) {
                        uvec2 GLF_dead15icoord = uvec2(((GLF_live10coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                        uint GLF_dead15res1 = uint(((GLF_dead15icoord.x * GLF_dead15icoord.y) >> (GLF_dead15icoord.x & 31u)) & 0xffffffffu);
                        uint GLF_dead15res2 = uint(((GLF_dead15icoord.x * GLF_dead15icoord.y) << (GLF_dead15icoord.x & 31u)) & 0xffffffffu);
                        float GLF_dead15res = float(((GLF_dead15res2 & 0x80000000u) != 0u ? 1u : 0u) ^ ((GLF_dead15res1 & 1u) != 0u ? 1u : 0u));
                        GLF_dead15_GLF_color = vec4(GLF_dead15res, GLF_dead15res, GLF_dead15res, 1.0);
                    } else {
                        ivec2 GLF_dead15icoord = ivec2(((GLF_live10coord - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                        int GLF_dead15res3 = ((GLF_dead15icoord.x >> 5) & 1) ^ ((GLF_dead15icoord.y & 32) >> 5);
                        int GLF_dead15res2 = (GLF_dead15icoord.y * GLF_dead15icoord.y >> 10) & 1;
                        int GLF_dead15res1 = (GLF_dead15icoord.x * GLF_dead15icoord.y >> 9) & 1;
                        GLF_dead15_GLF_color = vec4(float(GLF_dead15res1 ^ GLF_dead15res2), float(GLF_dead15res2 & GLF_dead15res3), float(GLF_dead15res1 | GLF_dead15res3), 1.0);
                    }
                } else {
                    ivec2 GLF_dead15icoord = ivec2(((GLF_live10coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.6, 1.0)) * 256.0);
                    int GLF_dead15v = (GLF_dead15icoord.x ^ GLF_dead15icoord.y) * GLF_dead15icoord.y;
                    bool GLF_dead15res1 = ((GLF_dead15v >> 10) & 1) != 0;
                    bool GLF_dead15res2 = ((GLF_dead15v >> 11) & 4) != 0;
                    bool GLF_dead15res3 = ((GLF_dead15v >> 12) & 8) != 0;
                    GLF_dead15_GLF_color = vec4(GLF_dead15res1 ? 1.0 : 0.0, GLF_dead15res2 ? 1.0 : 0.0, GLF_dead15res3 ? 1.0 : 0.0, 1);
                }
            }
        }
        {
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                _GLF_color = step(dFdxFine(s_g), GLF_dead3_GLF_color);
            }
            ivec2 GLF_live10icoord = ivec2(((GLF_live10coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.6, 1.0)) * 256.0);
            int GLF_live10v = (GLF_live10icoord.x ^ GLF_live10icoord.y) * GLF_live10icoord.y;
            bool GLF_live10res1 = ((GLF_live10v >> 10) & 1) != 0;
            bool GLF_live10res2 = ((GLF_live10v >> 11) & 4) != 0;
            bool GLF_live10res3 = ((GLF_live10v >> 12) & 8) != 0;
            GLF_live10_GLF_color = vec4(GLF_live10res1 ? 1.0 : 0.0, GLF_live10res2 ? 1.0 : 0.0, GLF_live10res3 ? 1.0 : 0.0, 1);
        }
        if (_GLF_DEAD(false)) {
            _GLF_color = (-GLF_dead9gl_FragCoord);
        }
    }
    mat2 rotationMatrix2;
    rotationMatrix2 = rotationMatrix * rotationMatrix;
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
        _GLF_color = ((vec4(-9.0, -431.403, 23.95, -4.4) / GLF_live11_GLF_color));
    }
    if (_GLF_DEAD(false)) {
        {
            ;
        }
    }
    {
        int GLF_live13looplimiter2 = 0;
        if (_GLF_DEAD(false)) {
            _GLF_color = _GLF_color;
        }
        if (GLF_live13looplimiter2 >= 3) {
            ;
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                int donor_replacementGLF_dead16directions = _GLF_FUZZED(GLF_live13looplimiter2);
                {
                    donor_replacementGLF_dead16directions += 1;
                }
            }
        }
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < log(1.0))))) {
        _GLF_color = _GLF_color;
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
        int donor_replacementGLF_dead3baseIndex = _GLF_FUZZED(((38336 + 93099)));
        int donor_replacementGLF_dead3data = _GLF_FUZZED(34484);
        int donor_replacementGLF_dead3treeIndex = _GLF_FUZZED(40437);
        {
            if (GLF_dead3tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead3baseIndex, 10)].leftIndex == -1) {
                {
                    int GLF_live13x = _GLF_FUZZED(-18661);
                    int GLF_live13y = _GLF_FUZZED(-67918);
                    if (_GLF_DEAD(false)) {
                        for (donor_replacementGLF_dead3data = 0; donor_replacementGLF_dead3data < 16 * 16; donor_replacementGLF_dead3data++) {
                            GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead3data, 256)] = 0;
                        }
                    }
                    if (GLF_live13x * GLF_live13x + GLF_live13y * GLF_live13y > 262144) {
                        ;
                    }
                }
                if (_GLF_DEAD(false)) {
                    _GLF_color = _GLF_color;
                }
                GLF_dead3tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead3baseIndex, 10)].leftIndex = donor_replacementGLF_dead3treeIndex;
                if (_GLF_DEAD(false)) {
                    bool donor_replacementGLF_dead16canwalk = _GLF_FUZZED(true);
                    ivec2 donor_replacementGLF_dead16p = _GLF_FUZZED(ivec2(-31762, -14749));
                    {
                        for (donor_replacementGLF_dead3baseIndex = 0; donor_replacementGLF_dead3baseIndex < 8; donor_replacementGLF_dead3baseIndex++) {
                            if (GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead3baseIndex * 2 + donor_replacementGLF_dead3data * 2 * 16, 256)] == 0) {
                                donor_replacementGLF_dead16p.x = donor_replacementGLF_dead3baseIndex * 2;
                                donor_replacementGLF_dead16p.y = donor_replacementGLF_dead3data * 2;
                                donor_replacementGLF_dead16canwalk = true;
                            }
                        }
                    }
                }
                GLF_dead3makeTreeNode(GLF_dead3tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead3treeIndex, 10)], donor_replacementGLF_dead3data);
                return;
            } else {
                if (_GLF_DEAD(false)) {
                    {
                        bool GLF_live11c1 = _GLF_FUZZED((mat4(-482.190, 1387.3466, 13.74, 2442.1882, 35.58, 91.83, 1.4, 57.48, 94.84, -66.10, -31.63, -6168.5996, -25.60, -3322.9143, 7.6, -644.189) == (mat3x4(mat4x2(-8025.1492, 56.93, -7.3, -53.25, -185.848, 557.144, -52.04, 706.538)) * mat4x3(mat2x4(-4.1, -4.4, -4.5, 7.4, 556.416, 9.6, -641.458, -6.6)))));
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                            vec2 donor_replacementGLF_dead17uv = _GLF_FUZZED(resolution);
                            if (GLF_live11c1) {
                                float GLF_dead17stripe = GLF_dead17compute_stripe(cos((donor_replacementGLF_dead17uv.x + donor_replacementGLF_dead17uv.y) * 20.0), donor_replacementGLF_dead17uv.x + donor_replacementGLF_dead17uv.y);
                                point1 = mix(vec3(donor_replacementGLF_dead17uv.x, 0, 0.75), vec3(.8, .7, donor_replacementGLF_dead17uv.x), GLF_dead17stripe);
                                GLF_dead17_GLF_color = vec4(point1, 1.0);
                                return;
                            }
                        }
                        bool GLF_live11c2 = _GLF_FUZZED(false);
                        bool GLF_live11c3 = _GLF_FUZZED((true ? (141165u > 14725u) : (bvec3(false, true, true) == bvec3(true, true, false))));
                        vec3 GLF_live11col = _GLF_FUZZED(vec3(-0.2, -215.486, 2.2));
                        vec2 GLF_live11uv = _GLF_FUZZED((vec2(-66.88, 241.715) + 7.8));
                        if (!GLF_live11c1 && !GLF_live11c2 && GLF_live11c3) {
                            float GLF_live11stripe = GLF_live11compute_stripe(cos((GLF_live11uv.x + GLF_live11uv.y) * 20.0), GLF_live11uv.x + GLF_live11uv.y);
                            GLF_live11col = mix(vec3(.7, sinh(GLF_live11uv.x), GLF_live11uv.x), vec3(.3, .5, GLF_live11uv.x), GLF_live11stripe);
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                _GLF_color = GLF_dead3_GLF_color;
                            }
                            GLF_live11_GLF_color = vec4(GLF_live11col, 1.0);
                            ;
                        }
                    }
                    float donor_replacementGLF_dead7limit = _GLF_FUZZED(s_g);
                    float donor_replacementGLF_dead7s = _GLF_FUZZED(-0.3);
                    for (int GLF_dead7i = 1; GLF_dead7i < 800; GLF_dead7i++) {
                        if (mod(float(GLF_dead7i), angle) <= 0.01) {
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                int donor_replacementGLF_dead16i = _GLF_FUZZED(donor_replacementGLF_dead3treeIndex);
                                {
                                    GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead16i, 256)] = 0;
                                }
                            }
                            donor_replacementGLF_dead7s += 0.2;
                        }
                        if (float(GLF_dead7i) >= donor_replacementGLF_dead7limit) {
                            ;
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                _GLF_color = GLF_dead9gl_FragCoord;
                            }
                        }
                        {
                            {
                                ;
                            }
                        }
                    }
                }
                donor_replacementGLF_dead3baseIndex = GLF_dead3tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead3baseIndex, 10)].leftIndex;
                if (_GLF_DEAD(false)) {
                    _GLF_color = atanh(GLF_dead9gl_FragCoord);
                }
                ;
            }
            {
                {
                    int GLF_live12looplimiter2 = 0;
                    for (int GLF_live12i = int(GLF_live12injectionSwitch.x); GLF_live12i < 10; GLF_live12i++) {
                        if (GLF_live12looplimiter2 >= 6) {
                            break;
                        }
                        GLF_live12looplimiter2++;
                        {
                            GLF_live12obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12i, 10)] = (10 - GLF_live12i) * int(GLF_live12injectionSwitch.y);
                        }
                        if (_GLF_DEAD(false)) {
                            _GLF_color = normalize(vec4(4672.1101, 3.3, -6.1, 94.87));
                            if (_GLF_DEAD(false)) {
                                bool donor_replacementGLF_dead17c1 = _GLF_FUZZED((mat3x2(-8.1, -4.0, -751.539, -2.3, 4.9, 0.4) != mat3x2(1.2, 37.73, -6.7, -8146.3373, -5.9, 9.1)));
                                vec2 donor_replacementGLF_dead17uv = _GLF_FUZZED(mat3x2(-0.4, 90.02, -74.51, -5.9, 193.359, 684.315)[2]);
                                if (donor_replacementGLF_dead17c1) {
                                    float GLF_dead17stripe = GLF_dead17compute_stripe(cos((donor_replacementGLF_dead17uv.x + donor_replacementGLF_dead17uv.y) * 20.0), donor_replacementGLF_dead17uv.x + donor_replacementGLF_dead17uv.y);
                                    point1 = mix(vec3(donor_replacementGLF_dead17uv.x, 0, 0.75), vec3(.8, .7, donor_replacementGLF_dead17uv.x), GLF_dead17stripe);
                                    GLF_dead17_GLF_color = vec4(point1, 1.0);
                                    return;
                                }
                            }
                        }
                        if (_GLF_DEAD(false)) {
                            int donor_replacementGLF_dead16d = _GLF_FUZZED(GLF_live12looplimiter2);
                            ivec2 donor_replacementGLF_dead16p = _GLF_FUZZED((ivec2(-85775, 67809) / (-91515)));
                            {
                                donor_replacementGLF_dead16d--;
                                GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead16p.x) + (donor_replacementGLF_dead16p.y) * 16, 256)] = 1;
                                GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead16p.x) + (donor_replacementGLF_dead16p.y + 1) * 16, 256)] = 1;
                                GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead16p.x) + (donor_replacementGLF_dead16p.y + 2) * 16, 256)] = 1;
                                donor_replacementGLF_dead16p.y += 2;
                            }
                        }
                    }
                    if (_GLF_DEAD(false)) {
                        _GLF_color = GLF_live10_GLF_color;
                    }
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    bool donor_replacementGLF_dead17c1 = _GLF_FUZZED((true || false));
                    vec3 donor_replacementGLF_dead17col = _GLF_FUZZED(vec3(-72.24, 1.7, -4.7));
                    vec2 donor_replacementGLF_dead17uv = _GLF_FUZZED(vec2(point1));
                    if (donor_replacementGLF_dead17c1) {
                        float GLF_dead17stripe = GLF_dead17compute_stripe(cos((donor_replacementGLF_dead17uv.x + donor_replacementGLF_dead17uv.y) * 20.0), donor_replacementGLF_dead17uv.x + donor_replacementGLF_dead17uv.y);
                        donor_replacementGLF_dead17col = mix(vec3(donor_replacementGLF_dead17uv.x, 0, 0.75), vec3(.8, .7, donor_replacementGLF_dead17uv.x), GLF_dead17stripe);
                        GLF_dead17_GLF_color = vec4(donor_replacementGLF_dead17col, 1.0);
                        return;
                    }
                }
            }
        }
    }
    vec3 point2;
    point2 = computePoint(rotationMatrix2);
    mat2 rotationMatrix3;
    if (_GLF_DEAD(false)) {
        int donor_replacementGLF_dead0d = _GLF_FUZZED(((66770 / (-86974)) + min(-14918, -13026)));
        ivec2 donor_replacementGLF_dead0p = _GLF_FUZZED(ivec2(-56614, 54190));
        {
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < abs(0.0))))) {
                    _GLF_color = (mat4(-262.986, 0.9, 311.233, 2.1, -8.8, 4.1, -3.2, -6.8, 1.4, 32.87, 582.031, 24.77, -3.8, 4356.3153, -5.1, -783.842) * GLF_dead3_GLF_color);
                }
                _GLF_color = (fwidth(vec4(-2.8, 9.1, 7.6, 323.360)) * h_r);
            }
            donor_replacementGLF_dead0d--;
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                _GLF_color = (vec4(-158.024, -91.57, -6.5, 0.0));
            }
            GLF_dead0map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead0p.x) + (donor_replacementGLF_dead0p.y) * 16, 256)] = 1;
            if (_GLF_DEAD(false)) {
                _GLF_color = _GLF_color;
            }
            GLF_dead0map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead0p.x) + (donor_replacementGLF_dead0p.y + 1) * 16, 256)] = 1;
            GLF_dead0map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead0p.x) + (donor_replacementGLF_dead0p.y + 2) * 16, 256)] = 1;
            {
                int GLF_live6i = _GLF_FUZZED(-37183);
                int GLF_live6j = _GLF_FUZZED(97247);
                uint GLF_live6uselessOutVariable = _GLF_FUZZED(42811u);
                if (_GLF_DEAD(_GLF_IDENTITY(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)), _GLF_IDENTITY(bool(bvec2(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)), true)), (bool(bvec2(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)), true))) || false)))) {
                    vec2 donor_replacementGLF_dead15coord = _GLF_FUZZED(log2(resolution));
                    {
                        ivec2 GLF_dead15icoord = ivec2(((donor_replacementGLF_dead15coord - vec2(0.4, 0.6)) * vec2(1.0 / 0.4, 1.0 / 0.4)) * 256.0);
                        int GLF_dead15res3 = ((GLF_dead15icoord.x >> 5) & 1) ^ ((GLF_dead15icoord.y & 32) >> 5);
                        int GLF_dead15res2 = (GLF_dead15icoord.y * GLF_dead15icoord.y >> 10) & 1;
                        int GLF_dead15res1 = (GLF_dead15icoord.x * GLF_dead15icoord.y >> 9) & 1;
                        GLF_dead15_GLF_color = vec4(float(GLF_dead15res1 ^ GLF_dead15res2), float(GLF_dead15res2 & GLF_dead15res3), float(GLF_dead15res1 | GLF_dead15res3), 1.0);
                    }
                }
                if (uint(GLF_live6j) < uaddCarry(uint(GLF_live6i), 1u, GLF_live6uselessOutVariable)) {
                    ;
                }
                if (_GLF_DEAD(false)) {
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                        vec2 donor_replacementGLF_dead17uv = _GLF_FUZZED(unpackUnorm2x16(uint(false)));
                        {
                            float GLF_dead17stripe = GLF_dead17compute_stripe(cos((donor_replacementGLF_dead17uv.x + donor_replacementGLF_dead17uv.y) * 20.0), donor_replacementGLF_dead17uv.x + donor_replacementGLF_dead17uv.y);
                            point2 = mix(vec3(donor_replacementGLF_dead17uv.x, 0, 0.75), vec3(.8, .7, donor_replacementGLF_dead17uv.x), GLF_dead17stripe);
                            GLF_dead17_GLF_color = vec4(point2, 1.0);
                            return;
                        }
                    }
                    _GLF_color = vec4(255.197, 814.667, -4.1, -4906.7559);
                }
            }
            {
                vec3 GLF_live11col = _GLF_FUZZED(vec3(5.1, -2943.6508, 6223.1958));
                vec2 GLF_live11uv = _GLF_FUZZED(((vec2(436.661, -99.83) * vec2(-614.538, 7923.9831)) * 1882.8233));
                {
                    float GLF_live11stripe = GLF_live11compute_stripe(tan((GLF_live11uv.x + GLF_live11uv.y) * 20.0), GLF_live11uv.x + GLF_live11uv.y);
                    GLF_live11col = mix(vec3(GLF_live11uv.x, .8, 0), vec3(1, GLF_live11uv.y, 0), GLF_live11stripe);
                    GLF_live11_GLF_color = vec4(GLF_live11col, 1.0);
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        int donor_replacementGLF_dead16directions = _GLF_FUZZED(GLF_live4msb8);
                        if (donor_replacementGLF_dead0p.x < 14 && GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead0p.x + 2) + (donor_replacementGLF_dead0p.y) * 16, 256)] == 0) {
                            donor_replacementGLF_dead16directions += 1;
                        }
                    }
                    ;
                }
            }
            donor_replacementGLF_dead0p.y += 2;
        }
    }
    {
        vec2 GLF_live10coord = _GLF_FUZZED(vec2(-768.508, 44.50));
        {
            ivec2 GLF_live10icoord = ivec2(((GLF_live10coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.6, 1.0)) * 256.0);
            int GLF_live10v = (GLF_live10icoord.x ^ GLF_live10icoord.y) * GLF_live10icoord.y;
            bool GLF_live10res1 = ((GLF_live10v >> 10) & 1) != 0;
            bool GLF_live10res2 = ((GLF_live10v >> 11) & 4) != 0;
            bool GLF_live10res3 = ((GLF_live10v >> 12) & 8) != 0;
            GLF_live10_GLF_color = vec4(GLF_live10res1 ? 1.0 : 0.0, GLF_live10res2 ? 1.0 : 0.0, GLF_live10res3 ? 1.0 : 0.0, 1);
        }
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
        float donor_replacementGLF_dead7s = _GLF_FUZZED(vec3(-29.40, 4.3, -4.3).p);
        {
            ;
        }
    }
    rotationMatrix3 = rotationMatrix * rotationMatrix * rotationMatrix;
    if (_GLF_DEAD(false)) {
        if (_GLF_DEAD(false)) {
            bool donor_replacementGLF_dead17c1 = _GLF_FUZZED(false);
            bool donor_replacementGLF_dead17c2 = _GLF_FUZZED(true);
            bool donor_replacementGLF_dead17c3 = _GLF_FUZZED((bvec4(true, true, false, false) == bvec4(false, true, true, true)));
            bool donor_replacementGLF_dead17c4 = _GLF_FUZZED(false);
            vec3 donor_replacementGLF_dead17col = _GLF_FUZZED((5269.9440 + point2));
            vec2 donor_replacementGLF_dead17uv = _GLF_FUZZED((vec2(h_r, acosh(s_g))));
            if (!donor_replacementGLF_dead17c1 && !donor_replacementGLF_dead17c2 && !donor_replacementGLF_dead17c3 && donor_replacementGLF_dead17c4) {
                float GLF_dead17stripe = GLF_dead17compute_stripe(tan((donor_replacementGLF_dead17uv.x + donor_replacementGLF_dead17uv.y) * 20.0), donor_replacementGLF_dead17uv.x + donor_replacementGLF_dead17uv.y);
                donor_replacementGLF_dead17col = mix(vec3(donor_replacementGLF_dead17uv.x, .8, 0), vec3(1, donor_replacementGLF_dead17uv.y, 0), GLF_dead17stripe);
                GLF_dead17_GLF_color = vec4(donor_replacementGLF_dead17col, 1.0);
                return;
            }
        }
        _GLF_color = mod(GLF_dead3_GLF_color, vec4(-99.82, -95.58, -366.763, -4.9));
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
        _GLF_color = exp(_GLF_color);
    }
    vec3 point3;
    {
        if (_GLF_DEAD(false)) {
            vec2 donor_replacementGLF_dead8coord = _GLF_FUZZED(atan(injectionSwitch));
            int donor_replacementGLF_dead8i = _GLF_FUZZED(findLSB(clamp(102810u, 122712u, 136212u)));
            vec4 donor_replacementGLF_dead8res = _GLF_FUZZED(clamp(GLF_dead3_GLF_color, vec4(-3464.2841, -5.9, -1.8, 9592.3010), vec4(-1051.4485, 38.21, -862.178, -230.746)));
            float donor_replacementGLF_dead8uvstep = _GLF_FUZZED(time);
            {
                for (int GLF_dead8j = 0; GLF_dead8j < 3; GLF_dead8j++) {
                    donor_replacementGLF_dead8res += texture(GLF_dead8tex, donor_replacementGLF_dead8coord + vec2(float(donor_replacementGLF_dead8i - 1) * donor_replacementGLF_dead8uvstep, float(GLF_dead8j - 1) * donor_replacementGLF_dead8uvstep)) * GLF_dead8weights[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead8i * 3 + GLF_dead8j, 9)];
                }
                if (_GLF_DEAD(false)) {
                    _GLF_color = vec4(-6115.8685, 5541.5422, 1213.7756, 7454.1172);
                }
            }
        }
        vec2 GLF_live5pos = _GLF_FUZZED((vec2(5.6, 0.7) * mat2(-417.931, 9.4, 367.184, -0.5)));
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            _GLF_color = vec4(91.22, 754.850, -219.362, 41.66);
            {
                vec3 GLF_live11col = _GLF_FUZZED(vec3(-8.8, -5.8, -663.740));
                vec2 GLF_live11uv = _GLF_FUZZED(vec2(668.356, 40.25));
                {
                    float GLF_live11stripe = GLF_live11compute_stripe(cos((GLF_live11uv.x + GLF_live11uv.y) * 20.0), GLF_live11uv.x + GLF_live11uv.y);
                    GLF_live11col = mix(vec3(GLF_live11uv.x, 0, 0.75), vec3(.8, .7, GLF_live11uv.x), GLF_live11stripe);
                    GLF_live11_GLF_color = vec4(GLF_live11col, 1.0);
                    if (_GLF_DEAD(false)) {
                        {
                            float GLF_dead17stripe = GLF_dead17compute_stripe(tan((GLF_live11uv.x + GLF_live11uv.y) * 20.0), GLF_live11uv.x + GLF_live11uv.y);
                            GLF_live11col = mix(vec3(GLF_live11uv.x, .8, 0), vec3(1, GLF_live11uv.y, 0), GLF_dead17stripe);
                            GLF_dead17_GLF_color = vec4(GLF_live11col, 1.0);
                            return;
                        }
                    }
                    ;
                    if (_GLF_DEAD(_GLF_IDENTITY(false, !(_GLF_IDENTITY(!(false), bool(bool(!(false)))))))) {
                        int donor_replacementGLF_dead16i = _GLF_FUZZED(-28655);
                        for (donor_replacementGLF_dead16i = 0; donor_replacementGLF_dead16i < 16 * 16; donor_replacementGLF_dead16i++) {
                            GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead16i, 256)] = 0;
                        }
                    }
                }
            }
            if (_GLF_DEAD(false)) {
                _GLF_color = _GLF_color;
            }
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
            vec4 donor_replacementGLF_dead8res = _GLF_FUZZED(vec4(-4.7, -7.1, -7.3, -262.674));
            {
                {
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        _GLF_color = clamp(vec4(8504.0032, -973.262, 5.2, 2990.4604), 655.032, s_g);
                    }
                    {
                        int GLF_live12looplimiter2 = 0;
                        for (int GLF_live12i = int(GLF_live12injectionSwitch.x); GLF_live12i < 10; GLF_live12i++) {
                            if (GLF_live12looplimiter2 >= 6) {
                                break;
                            }
                            GLF_live12looplimiter2++;
                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                if (_GLF_DEAD(false)) {
                                    bool donor_replacementGLF_dead17c1 = _GLF_FUZZED((bvec2(true, false) == bvec2(true, false)));
                                    bool donor_replacementGLF_dead17c2 = _GLF_FUZZED((mat3x2(0.2, 4.8, -5.0, 367.862, 35.44, -2.8) != mat3x2(mat4x2(70.58, -446.567, -829.426, -2.9, -6320.2713, 57.67, -275.699, 6655.9248))));
                                    bool donor_replacementGLF_dead17c3 = _GLF_FUZZED(false);
                                    bool donor_replacementGLF_dead17c4 = _GLF_FUZZED(false);
                                    vec2 donor_replacementGLF_dead17uv = _GLF_FUZZED(GLF_live5pos);
                                    if (!donor_replacementGLF_dead17c1 && !donor_replacementGLF_dead17c2 && !donor_replacementGLF_dead17c3 && donor_replacementGLF_dead17c4) {
                                        float GLF_dead17stripe = GLF_dead17compute_stripe(tan((donor_replacementGLF_dead17uv.x + donor_replacementGLF_dead17uv.y) * 20.0), donor_replacementGLF_dead17uv.x + donor_replacementGLF_dead17uv.y);
                                        point3 = mix(vec3(donor_replacementGLF_dead17uv.x, .8, 0), vec3(1, donor_replacementGLF_dead17uv.y, 0), GLF_dead17stripe);
                                        GLF_dead17_GLF_color = vec4(point3, 1.0);
                                        return;
                                    }
                                }
                                _GLF_color = vec4(time, time, ((-mat4(-298.133, 965.482, 0.7, 8.8, -1.0, 430.005, 4.7, -5966.5897, 306.387, -277.718, -261.183, -66.57, 4807.8622, 6.2, 593.934, -0.0)), h_r), 25.66);
                                if (_GLF_DEAD(false)) {
                                    bool donor_replacementGLF_dead17c1 = _GLF_FUZZED((rotationMatrix3 != mat2(mat2x4(181.549, 6951.6063, -5.6, -65.52, 52.90, -1021.2452, 4.0, -3.7))));
                                    bool donor_replacementGLF_dead17c2 = _GLF_FUZZED((acos(point1) != point2));
                                    bool donor_replacementGLF_dead17c3 = _GLF_FUZZED(all(bvec3(true, true, false)));
                                    bool donor_replacementGLF_dead17c4 = _GLF_FUZZED(false);
                                    vec3 donor_replacementGLF_dead17col = _GLF_FUZZED(vec3(1.6, -732.513, -153.621));
                                    vec2 donor_replacementGLF_dead17uv = _GLF_FUZZED(min(fwidth(GLF_live5pos), angle));
                                    if (!donor_replacementGLF_dead17c1 && !donor_replacementGLF_dead17c2 && !donor_replacementGLF_dead17c3 && donor_replacementGLF_dead17c4) {
                                        float GLF_dead17stripe = GLF_dead17compute_stripe(tan((donor_replacementGLF_dead17uv.x + donor_replacementGLF_dead17uv.y) * 20.0), donor_replacementGLF_dead17uv.x + donor_replacementGLF_dead17uv.y);
                                        donor_replacementGLF_dead17col = mix(vec3(donor_replacementGLF_dead17uv.x, .8, 0), vec3(1, donor_replacementGLF_dead17uv.y, 0), GLF_dead17stripe);
                                        GLF_dead17_GLF_color = vec4(donor_replacementGLF_dead17col, 1.0);
                                        return;
                                    }
                                }
                            }
                            {
                                GLF_live12obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_live12i, 10)] = (10 - GLF_live12i) * int(GLF_live12injectionSwitch.y);
                            }
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            _GLF_color = vec4(1.9, -10.78, 7.4, -49.88);
                            if (_GLF_DEAD(false)) {
                                bool donor_replacementGLF_dead17c1 = _GLF_FUZZED(true);
                                bool donor_replacementGLF_dead17c2 = _GLF_FUZZED(false);
                                bool donor_replacementGLF_dead17c3 = _GLF_FUZZED(false);
                                if (!donor_replacementGLF_dead17c1 && !donor_replacementGLF_dead17c2 && donor_replacementGLF_dead17c3) {
                                    float GLF_dead17stripe = GLF_dead17compute_stripe(cos((GLF_live5pos.x + GLF_live5pos.y) * 20.0), GLF_live5pos.x + GLF_live5pos.y);
                                    point3 = mix(vec3(.7, sinh(GLF_live5pos.x), GLF_live5pos.x), vec3(.3, .5, GLF_live5pos.x), GLF_dead17stripe);
                                    GLF_dead17_GLF_color = vec4(point3, 1.0);
                                    return;
                                }
                            }
                        }
                    }
                }
                for (int GLF_dead8j = 0; GLF_dead8j < 3; GLF_dead8j++) {
                    donor_replacementGLF_dead8res += texture(GLF_dead8tex, GLF_live5pos + vec2(float(GLF_live4msb8 - 1) * b_b, float(GLF_dead8j - 1) * b_b)) * GLF_dead8weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_live4msb8 * 3 + GLF_dead8j, 9)];
                }
            }
        }
        vec4 GLF_live5quad = _GLF_FUZZED(vec4(8.2, -5045.5145, 2324.3595, 163.510));
        if (GLF_live5pos.x > GLF_live5quad.x + GLF_live5quad.z) {
            {
                vec3 GLF_live11col = _GLF_FUZZED(vec3(-521.377, -9612.0617, 5.2));
                vec2 GLF_live11uv = _GLF_FUZZED(vec2(0.2, -844.395));
                {
                    float GLF_live11stripe = GLF_live11compute_stripe(cos((GLF_live11uv.x + GLF_live11uv.y) * 20.0), GLF_live11uv.x + GLF_live11uv.y);
                    GLF_live11col = mix(vec3(GLF_live11uv.x, 0, 0.75), vec3(.8, .7, GLF_live11uv.x), GLF_live11stripe);
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        _GLF_color = vec4(1975.9152, -8.1, 1.4, 42.08);
                    }
                    GLF_live11_GLF_color = vec4(GLF_live11col, 1.0);
                    ;
                }
            }
            ;
        }
    }
    if (_GLF_DEAD(false)) {
        _GLF_color = _GLF_outlined_8();
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            _GLF_color = faceforward(fwidthFine(GLF_live10_GLF_color), mix(vec4(-5957.4687, 7.9, 2.0, -5.2), GLF_live11_GLF_color, vec4(7.8, -502.423, 1.6, -1.6)), vec4(b_b, resolution, b_b));
        }
    }
    point3 = computePoint(rotationMatrix3);
    vec3 mixed;
    if (_GLF_DEAD(false)) {
        {
            bool GLF_live11c1 = _GLF_FUZZED(true);
            bool GLF_live11c2 = _GLF_FUZZED((bvec2(false, false) != bvec2(true, false)));
            vec3 GLF_live11col = _GLF_FUZZED(vec3(-8.1, 9.4, -7444.7716));
            vec2 GLF_live11uv = _GLF_FUZZED((vec2(-3542.7893, -2.1) + (vec2(2599.9774, -315.887).gr + (-7215.3048))));
            if (!GLF_live11c1 && GLF_live11c2) {
                if (_GLF_DEAD(false)) {
                    _GLF_color = (b_b / GLF_live10_GLF_color);
                }
                float GLF_live11stripe = GLF_live11compute_stripe(tan((GLF_live11uv.x + GLF_live11uv.y) * 20.0), GLF_live11uv.x + GLF_live11uv.y);
                GLF_live11col = mix(vec3(0.5, GLF_live11uv.x, 0.1), vec3(.4, 0, .5), GLF_live11stripe);
                if (_GLF_DEAD(false)) {
                    _GLF_color = GLF_dead9gl_FragCoord;
                }
                GLF_live11_GLF_color = vec4(GLF_live11col, 1.0);
                ;
            }
            if (_GLF_DEAD(_GLF_IDENTITY(false, bool(bvec4(false, true, false, true))))) {
                int donor_replacementGLF_dead16i = _GLF_FUZZED(min(-67144, -29861));
                int donor_replacementGLF_dead16j = _GLF_FUZZED(GLF_live4msb8);
                ivec2 donor_replacementGLF_dead16p = _GLF_FUZZED(ivec2(-41162, -37690));
                for (donor_replacementGLF_dead16i = 0; donor_replacementGLF_dead16i < 8; donor_replacementGLF_dead16i++) {
                    for (donor_replacementGLF_dead16j = 0; donor_replacementGLF_dead16j < 8; donor_replacementGLF_dead16j++) {
                        if (GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead16j * 2 + donor_replacementGLF_dead16i * 2 * 16, 256)] == 0) {
                            donor_replacementGLF_dead16p.x = donor_replacementGLF_dead16j * 2;
                            donor_replacementGLF_dead16p.y = donor_replacementGLF_dead16i * 2;
                            GLF_live11c2 = true;
                        }
                    }
                }
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                _GLF_color = GLF_dead9gl_FragCoord;
            }
        }
        vec2 donor_replacementGLF_dead8coord = _GLF_FUZZED((max(injectionSwitch, 10.84) * h_r));
        int donor_replacementGLF_dead8i = _GLF_FUZZED(7312);
        for (int GLF_dead8j = 0; GLF_dead8j < 3; GLF_dead8j++) {
            GLF_dead3_GLF_color += texture(GLF_dead8tex, donor_replacementGLF_dead8coord + vec2(float(donor_replacementGLF_dead8i - 1) * s_g, float(GLF_dead8j - 1) * s_g)) * GLF_dead8weights[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead8i * 3 + GLF_dead8j, 9)];
            if (_GLF_DEAD(_GLF_IDENTITY(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)), true && (_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))))) {
                for (donor_replacementGLF_dead8i = 0; donor_replacementGLF_dead8i < 16 * 16; donor_replacementGLF_dead8i++) {
                    GLF_dead16map[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead8i, 256)] = 0;
                }
            }
        }
    }
    {
        vec2 GLF_live10coord = _GLF_FUZZED(vec2(vec4(5605.0846, -1.5, 6.4, -61.37)));
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
            _GLF_color = sin(_GLF_color);
        }
        {
            ivec2 GLF_live10icoord = ivec2(((GLF_live10coord - vec2(0.4, 0.0)) * vec2(1.0 / 0.6, 1.0)) * 256.0);
            int GLF_live10v = (GLF_live10icoord.x ^ GLF_live10icoord.y) * GLF_live10icoord.y;
            bool GLF_live10res1 = ((GLF_live10v >> 10) & 1) != 0;
            bool GLF_live10res2 = ((GLF_live10v >> 11) & 4) != 0;
            bool GLF_live10res3 = ((GLF_live10v >> 12) & 8) != 0;
            GLF_live10_GLF_color = vec4(GLF_live10res1 ? 1.0 : 0.0, GLF_live10res2 ? 1.0 : 0.0, GLF_live10res3 ? 1.0 : 0.0, 1);
        }
    }
    mixed = mix(point1, point2, vec3(0.3));
    mixed = mix(mixed, point3, vec3(0.3));
    _GLF_color = vec4(mixed, 1.0);
}
