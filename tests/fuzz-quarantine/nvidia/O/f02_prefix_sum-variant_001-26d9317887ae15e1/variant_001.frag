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

struct _GLF_struct_15 {
    ivec4 _f0;
    mat2x4 _f1;
};

struct _GLF_struct_14 {
    int _f0;
    vec2 _f1;
    mat3x2 _f2;
    mat4x2 _f3;
    float _f4;
    bool _f5;
};

struct _GLF_struct_13 {
    vec4 donor_replacementGLF_dead9quad;
    bvec4 _f0;
    vec3 _f1;
    mat4x3 _f2;
    bool _f3;
};

struct _GLF_struct_12 {
    bvec4 _f0;
    mat4x2 _f1;
    _GLF_struct_13 _f2;
    _GLF_struct_14 _f3;
    mat3 _f4;
    mat2x3 _f5;
};

struct _GLF_struct_11 {
    bvec4 _f0;
    int _f1;
    mat4 _f2;
    ivec2 _f3;
    ivec4 _f4;
};

struct _GLF_struct_10 {
    _GLF_struct_11 _f0;
    uvec2 _f1;
    _GLF_struct_12 _f2;
    float _f3;
    _GLF_struct_15 _f4;
    vec3 _f5;
    mat2x3 _f6;
};

struct _GLF_struct_19 {
    mat3 _f0;
    vec4 donor_replacementGLF_dead7c;
    vec3 _f1;
    bvec3 _f2;
    mat2x3 _f3;
    vec4 _f4;
};

struct _GLF_struct_18 {
    bvec2 _f0;
    uvec4 _f1;
    bvec2 _f2;
    mat2x4 _f3;
    mat4x3 _f4;
    mat2 _f5;
    uvec3 _f6;
};

struct _GLF_struct_17 {
    _GLF_struct_18 _f0;
    mat4x3 _f1;
    mat3 _f2;
    _GLF_struct_19 _f3;
};

struct _GLF_struct_16 {
    bvec4 _f0;
    vec2 _f1;
    mat3x2 _f2;
    _GLF_struct_17 _f3;
};

struct _GLF_struct_20 {
    uvec3 _f0;
    int donor_replacementGLF_dead7i;
};

struct _GLF_struct_23 {
    bvec4 _f0;
    bool _f1;
    vec2 _f2;
    mat4x3 _f3;
    uvec3 _f4;
};

struct _GLF_struct_22 {
    float donor_replacementGLF_dead7s;
    uvec2 _f0;
};

struct _GLF_struct_21 {
    mat4x2 _f0;
    _GLF_struct_22 _f1;
    _GLF_struct_23 _f2;
    bvec4 _f3;
};

struct _GLF_struct_27 {
    ivec4 _f0;
};

struct _GLF_struct_26 {
    bool _f0;
    mat3 _f1;
};

struct _GLF_struct_25 {
    uvec3 _f0;
    mat4 _f1;
    int GLF_dead4i;
};

struct _GLF_struct_24 {
    ivec2 _f0;
    mat2x3 _f1;
    float _f2;
    _GLF_struct_25 _f3;
    bvec4 _f4;
    _GLF_struct_26 _f5;
    _GLF_struct_27 _f6;
};

struct _GLF_struct_28 {
    uvec3 _f0;
    vec2 donor_replacementGLF_dead9pos;
};

struct _GLF_struct_31 {
    bvec3 _f0;
    bool _f1;
    int donor_replacementGLF_dead7i;
    ivec3 _f2;
    mat4 _f3;
    uvec4 _f4;
    mat4x2 _f5;
};

struct _GLF_struct_30 {
    vec4 _f0;
    vec4 _f1;
    bool _f2;
    mat2x3 _f3;
    _GLF_struct_31 _f4;
    vec2 _f5;
};

struct _GLF_struct_29 {
    uint _f0;
    _GLF_struct_30 _f1;
};

struct _GLF_struct_37 {
    mat2 _f0;
    ivec3 _f1;
    mat4x3 _f2;
};

struct _GLF_struct_36 {
    mat4x3 _f0;
    vec4 _f1;
    bvec2 _f2;
    _GLF_struct_37 _f3;
    uvec2 _f4;
};

struct _GLF_struct_35 {
    mat3 _f0;
    mat3 _f1;
    uvec4 _f2;
    mat3 _f3;
};

struct _GLF_struct_34 {
    mat2x3 _f0;
    ivec4 _f1;
    mat4x3 _f2;
};

struct _GLF_struct_33 {
    mat2x3 _f0;
    _GLF_struct_34 _f1;
    _GLF_struct_35 _f2;
};

struct _GLF_struct_32 {
    mat2x3 _f0;
    vec2 donor_replacementGLF_dead9pos;
    _GLF_struct_33 _f1;
    uint _f2;
    _GLF_struct_36 _f3;
    bvec4 _f4;
    uint _f5;
};

const vec4 GLF_dead9pal[16] = vec4[16](vec4(0.0, 0.0, 0.0, 1.0), vec4(0.5, 0.0, 0.0, 1.0), vec4(0.0, 0.5, 0.0, 1.0), vec4(0.5, 0.5, 0.0, 1.0), vec4(0.0, 0.0, 0.5, 1.0), vec4(0.5, 0.0, 0.5, 1.0), vec4(0.0, 0.5, 0.5, 1.0), vec4(0.5, 0.5, 0.5, 1.0), vec4(0.0, 0.0, 0.0, 1.0), vec4(1.0, 0.0, 0.0, 1.0), vec4(0.0, 1.0, 0.0, 1.0), vec4(1.0, 1.0, 0.0, 1.0), vec4(0.0, 0.0, 1.0, 1.0), vec4(1.0, 0.0, 1.0, 1.0), vec4(0.0, 1.0, 1.0, 1.0), vec4(1.0, 1.0, 1.0, 1.0));
const vec4 GLF_dead9picdata[8] = vec4[8](vec4(4, 4, 20, 4), vec4(4, 4, 4, 20), vec4(4, 20, 20, 4), vec4(20, 4, 4, 8), vec4(8, 6, 4, 2), vec4(2, 12, 2, 4), vec4(16, 2, 4, 4), vec4(12, 22, 4, 4));

bool GLF_dead9collision(vec2 GLF_dead9pos, vec4 GLF_dead9quad) {
    if (GLF_dead9pos.x < GLF_dead9quad.x) {
        return false;
    }
    if (GLF_dead9pos.y < GLF_dead9quad.y) {
        return false;
    }
    if (GLF_dead9pos.x > GLF_dead9quad.x + GLF_dead9quad.z) {
        return false;
    }
    if (GLF_dead9pos.y > GLF_dead9quad.y + GLF_dead9quad.w) {
        return false;
    }
    return true;
}

int GLF_dead5map[16 * 16] = int[256](0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
layout(set = 0, binding = 1) uniform sampler2D GLF_dead4tex;
const float GLF_dead4weights[9] = float[9](1.0, 0.5, -0.25, 0.5, 1.0, -0.5, -0.25, -0.5, -1.0);

struct _GLF_struct_9 {
    int GLF_dead0i;
    bvec2 _f0;
    bvec3 _f1;
};

struct _GLF_struct_5 {
    ivec4 _f0;
    mat2 _f1;
    ivec3 _f2;
    uvec2 _f3;
};

struct _GLF_struct_4 {
    mat2x3 _f0;
    mat3x2 _f1;
    uvec4 _f2;
};

struct _GLF_struct_3 {
    vec4 _f0;
    mat2x4 _f1;
    uvec2 _f2;
    mat3x2 _f3;
    mat4x2 _f4;
    mat2 _f5;
    bvec2 _f6;
};

struct _GLF_struct_2 {
    mat2x4 _f0;
    _GLF_struct_3 _f1;
    _GLF_struct_4 _f2;
    bvec2 _f3;
};

struct _GLF_struct_1 {
    vec2 _f0;
    bool GLF_dead0c2;
    mat2x3 _f1;
};

struct _GLF_struct_0 {
    mat3 _f0;
    uint _f1;
    _GLF_struct_1 _f2;
    _GLF_struct_2 _f3;
    bool _f4;
    _GLF_struct_5 _f5;
};

struct _GLF_struct_8 {
    mat4x2 _f0;
    mat4x2 _f1;
    bvec2 _f2;
    bool _f3;
    int i;
    int _f4;
};

struct _GLF_struct_7 {
    ivec3 _f0;
    _GLF_struct_8 _f1;
};

struct _GLF_struct_6 {
    float _f0;
    uvec4 _f1;
    uvec4 _f2;
    uvec2 _f3;
    mat2 _f4;
    _GLF_struct_7 _f5;
};

layout(set = 0, binding = 2) uniform buf2 {
    vec2 injectionSwitch;
};

layout(set = 0, binding = 3) uniform buf3 {
    float GLF_dead0time;
};

float GLF_dead0h_r = _GLF_FUZZED(-68.41);
float GLF_dead0s_g = _GLF_FUZZED(-52.44);
float GLF_dead0b_b = _GLF_FUZZED(-554.127);

void GLF_dead0doConvert() {
    vec3 GLF_dead0temp = _GLF_FUZZED(asinh(vec3(-6278.4540, -3.9, -392.370)));
    GLF_dead0temp = GLF_dead0b_b * (1.0 - GLF_dead0s_g) + (GLF_dead0b_b - GLF_dead0b_b * (1.0 - GLF_dead0s_g)) * clamp(abs(abs(6.0 * (GLF_dead0h_r - vec3(0, 1, 2) / 3.0)) - 3.0) - 1.0, 0.0, 1.0);
    GLF_dead0h_r = GLF_dead0temp.x;
    if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
    } else {
        GLF_dead0s_g = GLF_dead0temp.y;
    }
    GLF_dead0b_b = GLF_dead0temp.z;
}

vec3 GLF_dead0computeColor(float GLF_dead0c, vec2 GLF_dead0position) {
    GLF_dead0h_r = fract(GLF_dead0c);
    if (_GLF_WRAPPED_IF_TRUE(true)) {
        GLF_dead0s_g = 1.0;
    } else {
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            int donor_replacementGLF_dead6count = _GLF_FUZZED((-97460));
            int donor_replacementGLF_dead6v = _GLF_FUZZED(-53414);
            while (donor_replacementGLF_dead6v > 1) {
                if ((donor_replacementGLF_dead6v & 1) == 1) {
                    donor_replacementGLF_dead6v = 3 * donor_replacementGLF_dead6v + 1;
                } else {
                    donor_replacementGLF_dead6v /= 2;
                }
                donor_replacementGLF_dead6count++;
            }
        }
        if (_GLF_DEAD(false)) {
            return vec3(1.0, 1.0, 1.0);
        }
    }
    GLF_dead0b_b = (0.5 + (sin(GLF_dead0time) * 0.5 + 0.5));
    if (_GLF_DEAD(false)) {
        {
            ;
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            return vec3(1.0, 1.0, 1.0);
            if (_GLF_DEAD(false)) {
                int donor_replacementGLF_dead7i = _GLF_FUZZED(30404);
                float donor_replacementGLF_dead7limit = _GLF_FUZZED(GLF_dead0b_b);
                while (donor_replacementGLF_dead7i < bitfieldInsert(800, donor_replacementGLF_dead7i, 0, 0)) {
                    if (mod(float(donor_replacementGLF_dead7i), GLF_dead0b_b) <= 0.01) {
                        GLF_dead0c += 0.2;
                    }
                    if (float(donor_replacementGLF_dead7i) >= donor_replacementGLF_dead7limit) {
                        ;
                    }
                    donor_replacementGLF_dead7i++;
                }
            }
        }
    }
    if (_GLF_WRAPPED_IF_TRUE(true)) {
        if (_GLF_DEAD(false)) {
            {
                ;
            }
        }
        if (_GLF_DEAD(false)) {
            return vec3(1.0, 1.0, 1.0);
        }
        GLF_dead0doConvert();
    } else {
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
        int donor_replacementGLF_dead9i = _GLF_FUZZED(findMSB(22618));
        vec2 donor_replacementGLF_dead9pos = _GLF_FUZZED(injectionSwitch);
        vec4 donor_replacementGLF_dead9res = _GLF_FUZZED((mat4x3(5.7, 4090.7187, 2.5, 0.2, 1537.2519, -4.7, 4160.0960, -82.62, 6.3, 6123.7652, -61.61, -77.34), vec4(GLF_dead0h_r, vec2(-290.257, -9.1), GLF_dead0c)));
        for (donor_replacementGLF_dead9i = 0; donor_replacementGLF_dead9i < 8; donor_replacementGLF_dead9i++) {
            if (GLF_dead9collision(donor_replacementGLF_dead9pos, GLF_dead9picdata[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9i, 8)])) {
                donor_replacementGLF_dead9res = GLF_dead9pal[_GLF_MAKE_IN_BOUNDS_INT((int(GLF_dead9picdata[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9i, 8)].x) * int(GLF_dead9picdata[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9i, 8)].y) + donor_replacementGLF_dead9i * 9 + 11) % 16, 16)];
            }
        }
    }
    GLF_dead0s_g *= 1.0 / GLF_dead0position.y;
    GLF_dead0h_r *= 1.0 / GLF_dead0position.x;
    do {
        if (_GLF_WRAPPED_IF_FALSE(false)) {
            if (_GLF_DEAD(false)) {
                discard;
            }
        } else {
            if (_GLF_DEAD(false)) {
                return vec3(1.0, 1.0, 1.0);
            }
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
            int donor_replacementGLF_dead6v = _GLF_FUZZED(16671);
            {
                donor_replacementGLF_dead6v = 3 * donor_replacementGLF_dead6v + 1;
            }
        }
    } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))));
    if (abs(GLF_dead0position.y - GLF_dead0position.x) < 0.5) {
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            float donor_replacementGLF_dead7s = _GLF_FUZZED(GLF_dead0c);
            {
                donor_replacementGLF_dead7s += 0.2;
            }
        }
        GLF_dead0b_b = clamp(GLF_dead0b_b * 3.0, 0.0, 1.0);
        if (_GLF_DEAD(false)) {
            vec2 donor_replacementGLF_dead9pos = _GLF_FUZZED(vec2(-8.2, -18.86));
            _GLF_struct_10 _GLF_struct_replacement_10 = _GLF_struct_10(_GLF_struct_11(bvec4(true, true, true, true), 1, mat4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), ivec2(1, 1), ivec4(1, 1, 1, 1)), uvec2(1u, 1u), _GLF_struct_12(bvec4(true, true, true, true), mat4x2(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), _GLF_struct_13(_GLF_FUZZED(ldexp(vec4(3.5, -5.6, 1.1, -472.804), ivec4(84297, -97321, 10671, -40334))), bvec4(true, true, true, true), vec3(1.0, 1.0, 1.0), mat4x3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), true), _GLF_struct_14(1, vec2(1.0, 1.0), mat3x2(1.0, 1.0, 1.0, 1.0, 1.0, 1.0), mat4x2(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), 1.0, true), mat3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), mat2x3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0)), 1.0, _GLF_struct_15(ivec4(1, 1, 1, 1), mat2x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0)), vec3(1.0, 1.0, 1.0), mat2x3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0));
            if (donor_replacementGLF_dead9pos.y > _GLF_struct_replacement_10._f2._f2.donor_replacementGLF_dead9quad.y + _GLF_struct_replacement_10._f2._f2.donor_replacementGLF_dead9quad.w) {
                ;
            }
        }
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_ZERO(0.0, injectionSwitch.x))))) {
        return vec3(1.0, 1.0, 1.0);
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
        return vec3(1.0, 1.0, 1.0);
        if (_GLF_DEAD(false)) {
            int donor_replacementGLF_dead9i = _GLF_FUZZED(-8429);
            vec4 donor_replacementGLF_dead9res = _GLF_FUZZED((vec4(-11.84, -1.9, -1.0, 46.00)));
            {
                donor_replacementGLF_dead9res = GLF_dead9pal[_GLF_MAKE_IN_BOUNDS_INT((int(GLF_dead9picdata[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9i, 8)].x) * int(GLF_dead9picdata[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9i, 8)].y) + donor_replacementGLF_dead9i * 9 + 11) % 16, 16)];
            }
        }
    }
    return vec3(GLF_dead0h_r, GLF_dead0s_g, GLF_dead0b_b);
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            return vec3(1.0, 1.0, 1.0);
        }
        if (_GLF_DEAD(false)) {
            vec2 donor_replacementGLF_dead4coord = _GLF_FUZZED(GLF_dead0position);
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                return vec3(1.0, 1.0, 1.0);
            }
            int donor_replacementGLF_dead4i = _GLF_FUZZED(min(-59790, -35998));
            int donor_replacementGLF_dead4j = _GLF_FUZZED(-62372);
            vec4 donor_replacementGLF_dead4res = _GLF_FUZZED(vec4(4.1, -471.155, -5065.0405, 28.82));
            float donor_replacementGLF_dead4uvstep = _GLF_FUZZED(distance(log2(acosh(vec3(-2.5, -3.6, 10.61))), vec3(41.59, -4898.8350, 3.5)));
            {
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    return vec3(1.0, 1.0, 1.0);
                }
                donor_replacementGLF_dead4res += texture(GLF_dead4tex, donor_replacementGLF_dead4coord + vec2(float(donor_replacementGLF_dead4i - 1) * donor_replacementGLF_dead4uvstep, float(donor_replacementGLF_dead4j - 1) * donor_replacementGLF_dead4uvstep)) * GLF_dead4weights[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4i * 3 + donor_replacementGLF_dead4j, 9)];
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                return vec3(1.0, 1.0, 1.0);
            }
        }
        if (_GLF_DEAD(false)) {
            return vec3(1.0, 1.0, 1.0);
        }
        return vec3(1.0, 1.0, 1.0);
    }
}

vec3 GLF_dead0defaultColor() {
    if (_GLF_DEAD(false)) {
        return vec3(1.0, 1.0, 1.0);
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
        return vec3(1.0, 1.0, 1.0);
    }
    do {
        return vec3(0.0);
    } while (_GLF_WRAPPED_LOOP(false));
    if (_GLF_DEAD(false)) {
        int donor_replacementGLF_dead9i = _GLF_FUZZED(88514);
        vec2 donor_replacementGLF_dead9pos = _GLF_FUZZED(ceil(injectionSwitch));
        vec4 donor_replacementGLF_dead9res = _GLF_FUZZED(vec4(98.29, 2.9, -4.3, -14.69));
        for (donor_replacementGLF_dead9i = 0; donor_replacementGLF_dead9i < 8; donor_replacementGLF_dead9i++) {
            if (GLF_dead9collision(donor_replacementGLF_dead9pos, GLF_dead9picdata[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9i, 8)])) {
                donor_replacementGLF_dead9res = GLF_dead9pal[_GLF_MAKE_IN_BOUNDS_INT((int(GLF_dead9picdata[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9i, 8)].x) * int(GLF_dead9picdata[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9i, 8)].y) + donor_replacementGLF_dead9i * 9 + 11) % 16, 16)];
            }
        }
    }
}

int _GLF_outlined_1() {
    return 0;
}

vec3 GLF_dead0drawShape(vec2 GLF_dead0pos, vec2 GLF_dead0square, vec3 GLF_dead0setting) {
    bool GLF_dead0c1 = GLF_dead0pos.x - GLF_dead0setting.x < GLF_dead0square.x;
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
        int donor_replacementGLF_dead5directions = _GLF_FUZZED(bitCount(-51612));
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            return vec3(1.0, 1.0, 1.0);
        }
        ivec2 donor_replacementGLF_dead5p = _GLF_FUZZED(ivec2(25737, -20843));
        if (donor_replacementGLF_dead5p.x > 0 && GLF_dead5map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead5p.x - 2) + (donor_replacementGLF_dead5p.y) * 16, 256)] == 0) {
            donor_replacementGLF_dead5directions += 1;
        }
    }
    if (_GLF_DEAD(false)) {
        return vec3(1.0, 1.0, 1.0);
    }
    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
        if (!GLF_dead0c1) {
            return GLF_dead0defaultColor();
        }
    } else {
    }
    if (_GLF_DEAD(false)) {
        return vec3(1.0, 1.0, 1.0);
    }
    _GLF_struct_0 _GLF_struct_replacement_0 = _GLF_struct_0(mat3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), 1u, _GLF_struct_1(vec2(1.0, 1.0), GLF_dead0pos.x + GLF_dead0setting.x > GLF_dead0square.x, mat2x3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0)), _GLF_struct_2(mat2x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), _GLF_struct_3(vec4(1.0, 1.0, 1.0, 1.0), mat2x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), uvec2(1u, 1u), mat3x2(1.0, 1.0, 1.0, 1.0, 1.0, 1.0), mat4x2(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), mat2(1.0, 1.0, 1.0, 1.0), bvec2(true, true)), _GLF_struct_4(mat2x3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0), mat3x2(1.0, 1.0, 1.0, 1.0, 1.0, 1.0), uvec4(1u, 1u, 1u, 1u)), bvec2(true, true)), true, _GLF_struct_5(ivec4(1, 1, 1, 1), mat2(1.0, 1.0, 1.0, 1.0), ivec3(1, 1, 1), uvec2(1u, 1u)));
    if (!_GLF_struct_replacement_0._f2.GLF_dead0c2) {
        do {
            if (_GLF_WRAPPED_IF_TRUE(true)) {
                return GLF_dead0defaultColor();
            } else {
            }
        } while (_GLF_WRAPPED_LOOP(false));
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            return vec3(1.0, 1.0, 1.0);
        }
    }
    bool GLF_dead0c3 = GLF_dead0pos.y - GLF_dead0setting.x < GLF_dead0square.y;
    if (!GLF_dead0c3) {
        return GLF_dead0defaultColor();
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
        if (_GLF_DEAD(false)) {
            {
                ;
            }
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            return vec3(1.0, 1.0, 1.0);
        }
        vec4 donor_replacementGLF_dead3quad = _GLF_FUZZED(vec4(4.8, 7327.2411, 59.81, -12.27));
        if (GLF_dead0square.x < donor_replacementGLF_dead3quad.x) {
            ;
            if (_GLF_DEAD(false)) {
                return vec3(1.0, 1.0, 1.0);
            }
            if (_GLF_DEAD(false)) {
                return vec3(1.0, 1.0, 1.0);
            }
            if (_GLF_DEAD(false)) {
                int donor_replacementGLF_dead7i = _GLF_FUZZED(clamp(84289, sign(-6298), 14244));
                float donor_replacementGLF_dead7limit = _GLF_FUZZED(GLF_dead0h_r);
                float donor_replacementGLF_dead7s = _GLF_FUZZED(degrees(GLF_dead0s_g));
                if (float(donor_replacementGLF_dead7i) >= donor_replacementGLF_dead7limit) {
                    ;
                }
            }
        }
        if (_GLF_DEAD(false)) {
            return vec3(1.0, 1.0, 1.0);
        }
    }
    bool GLF_dead0c4 = GLF_dead0pos.y + GLF_dead0setting.x > GLF_dead0square.y;
    if (_GLF_DEAD(false)) {
        int donor_replacementGLF_dead4i = _GLF_FUZZED((floatBitsToInt(GLF_dead0h_r) % 63795));
        if (_GLF_DEAD(false)) {
            return vec3(1.0, 1.0, 1.0);
        }
        vec4 donor_replacementGLF_dead4res = _GLF_FUZZED(vec4(-6.9, 1.8, -4.9, -866.030));
        float donor_replacementGLF_dead4uvstep = _GLF_FUZZED(clamp(GLF_dead0h_r, GLF_dead0h_r, GLF_dead0s_g));
        {
            for (int GLF_dead4j = 0; GLF_dead4j < 3; GLF_dead4j++) {
                donor_replacementGLF_dead4res += texture(GLF_dead4tex, GLF_dead0square + vec2(float(donor_replacementGLF_dead4i - 1) * donor_replacementGLF_dead4uvstep, float(GLF_dead4j - 1) * donor_replacementGLF_dead4uvstep)) * GLF_dead4weights[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4i * 3 + GLF_dead4j, 9)];
            }
        }
    }
    if (_GLF_DEAD(false)) {
        return vec3(1.0, 1.0, 1.0);
    }
    if (!GLF_dead0c4) {
        if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
        } else {
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                _GLF_struct_16 _GLF_struct_replacement_16 = _GLF_struct_16(bvec4(true, true, true, true), vec2(1.0, 1.0), mat3x2(1.0, 1.0, 1.0, 1.0, 1.0, 1.0), _GLF_struct_17(_GLF_struct_18(bvec2(true, true), uvec4(1u, 1u, 1u, 1u), bvec2(true, true), mat2x4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), mat4x3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), mat2(1.0, 1.0, 1.0, 1.0), uvec3(1u, 1u, 1u)), mat4x3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), mat3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), _GLF_struct_19(mat3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), _GLF_FUZZED((vec4(-2.2, -7672.3319, -97.84, 26.47) - vec4(861.148, 1.9, -200.714, 5.9))), vec3(1.0, 1.0, 1.0), bvec3(true, true, true), mat2x3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0), vec4(1.0, 1.0, 1.0, 1.0))));
                int donor_replacementGLF_dead7i = _GLF_FUZZED(mix(40971, -99758, GLF_dead0c1));
                if (_GLF_struct_replacement_16._f3._f3.donor_replacementGLF_dead7c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead7i, 4)] >= 1.0) {
                    _GLF_struct_replacement_16._f3._f3.donor_replacementGLF_dead7c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead7i, 4)] = _GLF_struct_replacement_16._f3._f3.donor_replacementGLF_dead7c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead7i, 4)] * _GLF_struct_replacement_16._f3._f3.donor_replacementGLF_dead7c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead7i, 4)];
                }
            }
            if (_GLF_DEAD(false)) {
                if (_GLF_DEAD(false)) {
                    return vec3(1.0, 1.0, 1.0);
                }
                vec2 donor_replacementGLF_dead4coord = _GLF_FUZZED(injectionSwitch);
                int donor_replacementGLF_dead4i = _GLF_FUZZED(sign(ivec4(-37075, -9478, 51694, 86358)).p);
                vec4 donor_replacementGLF_dead4res = _GLF_FUZZED((vec4(-7.7, -1.3, -4227.1772, -6.8) * GLF_dead0h_r));
                float donor_replacementGLF_dead4uvstep = _GLF_FUZZED(mix(GLF_dead0s_g, 5.1, GLF_dead0c3));
                {
                    for (int GLF_dead4j = 0; GLF_dead4j < 3; GLF_dead4j++) {
                        donor_replacementGLF_dead4res += texture(GLF_dead4tex, donor_replacementGLF_dead4coord + vec2(float(donor_replacementGLF_dead4i - 1) * donor_replacementGLF_dead4uvstep, float(GLF_dead4j - 1) * donor_replacementGLF_dead4uvstep)) * GLF_dead4weights[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4i * 3 + GLF_dead4j, 9)];
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < determinant(mat2(0.0, 0.0, 0.0, 0.0)))))) {
                            if (GLF_dead0pos.y > donor_replacementGLF_dead4res.y + donor_replacementGLF_dead4res.w) {
                                ;
                            }
                        }
                    }
                }
            }
            return GLF_dead0defaultColor();
        }
        if (_GLF_DEAD(false)) {
            return vec3(1.0, 1.0, 1.0);
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                int donor_replacementGLF_dead7i = _GLF_FUZZED(((-18021) / ivec3(-44478, 90300, -2087)[1]));
                float donor_replacementGLF_dead7limit = _GLF_FUZZED(GLF_dead0b_b);
                float donor_replacementGLF_dead7s = _GLF_FUZZED(GLF_dead0h_r);
                if (float(donor_replacementGLF_dead7i) >= donor_replacementGLF_dead7limit) {
                    ;
                }
            }
        }
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
        return vec3(1.0, 1.0, 1.0);
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            int donor_replacementGLF_dead7i = _GLF_FUZZED(ivec2(-40659, -13925)[0]);
            float donor_replacementGLF_dead7limit = _GLF_FUZZED(asinh(GLF_dead0h_r));
            float donor_replacementGLF_dead7s = _GLF_FUZZED(tan(GLF_dead0b_b));
            if (float(donor_replacementGLF_dead7i) >= donor_replacementGLF_dead7limit) {
                ;
            }
        }
    }
    if (_GLF_WRAPPED_IF_FALSE(false)) {
    } else {
        do {
            if (_GLF_DEAD(false)) {
                vec4 donor_replacementGLF_dead7c = _GLF_FUZZED(vec4(-29.08, 214.015, 1.9, -415.625));
                int donor_replacementGLF_dead7i = _GLF_FUZZED(int(GLF_dead0time));
                if (donor_replacementGLF_dead7c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead7i, 4)] >= 1.0) {
                    donor_replacementGLF_dead7c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead7i, 4)] = donor_replacementGLF_dead7c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead7i, 4)] * donor_replacementGLF_dead7c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead7i, 4)];
                }
            }
            if (_GLF_DEAD(false)) {
                return vec3(1.0, 1.0, 1.0);
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                    int donor_replacementGLF_dead6v = _GLF_FUZZED(ivec4(-51687, -5, 20736, -93728).r);
                    if ((donor_replacementGLF_dead6v & 1) == 1) {
                        donor_replacementGLF_dead6v = 3 * donor_replacementGLF_dead6v + 1;
                    } else {
                        donor_replacementGLF_dead6v /= 2;
                    }
                }
            }
        } while (_GLF_WRAPPED_LOOP(false));
    }
    bool GLF_dead0c5 = GLF_dead0pos.x - (GLF_dead0setting.x - GLF_dead0setting.y) < GLF_dead0square.x;
    if (_GLF_DEAD(false)) {
        {
            ;
        }
    }
    if (!GLF_dead0c5) {
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            return vec3(1.0, 1.0, 1.0);
        }
        for (int _injected_loop_counter = ((1 << _GLF_IDENTITY(int(6), int(6))) >> _GLF_IDENTITY(int(6), _GLF_IDENTITY(int(6), 0 + (int(6))))); _GLF_WRAPPED_LOOP(_injected_loop_counter != (0 << _GLF_IDENTITY(int(0), int(0)))); _injected_loop_counter--) {
            return GLF_dead0computeColor(GLF_dead0setting.z / 40.0, GLF_dead0pos);
        }
    }
    bool GLF_dead0c6 = GLF_dead0pos.x + (GLF_dead0setting.x - GLF_dead0setting.y) > GLF_dead0square.x;
    if (!GLF_dead0c6) {
        return GLF_dead0computeColor(GLF_dead0setting.z / 40.0, GLF_dead0pos);
    }
    if (_GLF_DEAD(false)) {
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
            int donor_replacementGLF_dead6v = _GLF_FUZZED((33654 - 2215));
            {
                donor_replacementGLF_dead6v /= 2;
            }
        }
        int donor_replacementGLF_dead5i = _GLF_FUZZED(48351);
        for (donor_replacementGLF_dead5i = _GLF_outlined_1(); donor_replacementGLF_dead5i < 16 * 16; donor_replacementGLF_dead5i++) {
            GLF_dead5map[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead5i, 256)] = 0;
        }
    }
    bool GLF_dead0c7 = GLF_dead0pos.y - (GLF_dead0setting.x - GLF_dead0setting.y) < GLF_dead0square.y;
    if (_GLF_DEAD(false)) {
        int donor_replacementGLF_dead9i = _GLF_FUZZED(44346);
        vec4 donor_replacementGLF_dead9res = _GLF_FUZZED(vec4(-62.53, -25.21, -1291.0631, 6843.4592));
        {
            donor_replacementGLF_dead9res = GLF_dead9pal[_GLF_MAKE_IN_BOUNDS_INT((int(GLF_dead9picdata[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9i, 8)].x) * int(GLF_dead9picdata[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9i, 8)].y) + donor_replacementGLF_dead9i * 9 + 11) % 16, 16)];
        }
    }
    if (!GLF_dead0c7) {
        return GLF_dead0computeColor(GLF_dead0setting.z / 40.0, GLF_dead0pos);
    }
    bool GLF_dead0c8 = GLF_dead0pos.y + (GLF_dead0setting.x - GLF_dead0setting.y) > GLF_dead0square.y;
    for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < ((1 << _GLF_IDENTITY(int(7), int(7))) >> _GLF_IDENTITY(int(7), _GLF_IDENTITY(int(7), (int(7)) / 1)))); _injected_loop_counter++) {
        if (_GLF_DEAD(false)) {
            _GLF_struct_20 _GLF_struct_replacement_20 = _GLF_struct_20(uvec3(1u, 1u, 1u), _GLF_FUZZED((_injected_loop_counter)));
            float donor_replacementGLF_dead7limit = _GLF_FUZZED(dFdxCoarse(GLF_dead0time));
            float donor_replacementGLF_dead7ref = _GLF_FUZZED((GLF_dead0s_g * tan(GLF_dead0time)));
            _GLF_struct_21 _GLF_struct_replacement_21 = _GLF_struct_21(mat4x2(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), _GLF_struct_22(_GLF_FUZZED(GLF_dead0time), uvec2(1u, 1u)), _GLF_struct_23(bvec4(true, true, true, true), true, vec2(1.0, 1.0), mat4x3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), uvec3(1u, 1u, 1u)), bvec4(true, true, true, true));
            while (_GLF_struct_replacement_20.donor_replacementGLF_dead7i < bitfieldInsert(800, _GLF_struct_replacement_20.donor_replacementGLF_dead7i, 0, 0)) {
                if (mod(float(_GLF_struct_replacement_20.donor_replacementGLF_dead7i), donor_replacementGLF_dead7ref) <= 0.01) {
                    _GLF_struct_replacement_21._f1.donor_replacementGLF_dead7s += 0.2;
                }
                if (float(_GLF_struct_replacement_20.donor_replacementGLF_dead7i) >= donor_replacementGLF_dead7limit) {
                    ;
                }
                _GLF_struct_replacement_20.donor_replacementGLF_dead7i++;
            }
        }
        if (!GLF_dead0c8) {
            if (_GLF_DEAD(false)) {
                continue;
            }
            return GLF_dead0computeColor(GLF_dead0setting.z / 40.0, GLF_dead0pos);
            if (_GLF_DEAD(false)) {
                discard;
            }
        }
    }
    if (_GLF_DEAD(false)) {
        return vec3(1.0, 1.0, 1.0);
    }
    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < determinant(mat4(0.0, 0.0, 1.0, 1.0, 0.0, _GLF_ZERO(0.0, injectionSwitch.x), 1.0, 1.0, 0.0, 0.0, 0.0, _GLF_IDENTITY(dot(vec3(1.0, 0.0, 0.0), vec3(1.0, 0.0, 0.0)), dot(vec3(1.0, 0.0, 0.0), vec3(1.0, 0.0, 0.0))), 0.0, 0.0, 0.0, 0.0)))))) {
            return vec3(1.0, 1.0, 1.0);
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            int donor_replacementGLF_dead9i = _GLF_FUZZED(sign((ivec2(-3496, -75680) << 32896).x));
            vec4 donor_replacementGLF_dead9res = _GLF_FUZZED(step(vec4(3135.0695, 6.4, 6509.0458, 6551.9964), vec4(2761.2801, -8.4, -15.45, -580.386)));
            {
                donor_replacementGLF_dead9res = GLF_dead9pal[_GLF_MAKE_IN_BOUNDS_INT((int(GLF_dead9picdata[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9i, 8)].x) * int(GLF_dead9picdata[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9i, 8)].y) + donor_replacementGLF_dead9i * 9 + 11) % 16, 16)];
            }
        }
    } else {
    }
    for (int _injected_loop_counter = ((int(_GLF_ONE(1.0, injectionSwitch.y)) << _GLF_IDENTITY(int(7), int(7))) >> _GLF_IDENTITY(int(7), int(7))); _GLF_WRAPPED_LOOP(_injected_loop_counter != int(_GLF_ZERO(0.0, injectionSwitch.x))); _injected_loop_counter--) {
        if (_GLF_DEAD(false)) {
            continue;
        }
        if (_GLF_DEAD(false)) {
            int donor_replacementGLF_dead9i = _GLF_FUZZED(_injected_loop_counter);
            vec2 donor_replacementGLF_dead9pos = _GLF_FUZZED(vec2(-6113.3058, 6671.5244));
            vec4 donor_replacementGLF_dead9res = _GLF_FUZZED(vec4(-6.3, -20.18, 675.889, 1.8));
            {
                if (GLF_dead9collision(donor_replacementGLF_dead9pos, GLF_dead9picdata[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9i, 8)])) {
                    donor_replacementGLF_dead9res = GLF_dead9pal[_GLF_MAKE_IN_BOUNDS_INT((int(GLF_dead9picdata[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9i, 8)].x) * int(GLF_dead9picdata[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9i, 8)].y) + donor_replacementGLF_dead9i * 9 + 11) % 16, 16)];
                }
            }
        }
        return GLF_dead0defaultColor();
    }
}

int GLF_dead1data[10] = int[10](_GLF_FUZZED(-5524), _GLF_FUZZED(44767), _GLF_FUZZED(-93160), _GLF_FUZZED(23395), _GLF_FUZZED(-43136), _GLF_FUZZED(ivec2(71712, -20738).t), _GLF_FUZZED((84441 & 8357)), _GLF_FUZZED(28637), _GLF_FUZZED(((-93919) ^ (-68463))), _GLF_FUZZED(ivec2(-79841, 36619).g)), GLF_dead1temp[10] = int[10](_GLF_FUZZED((23801 + (-69696))), _GLF_FUZZED(73373), _GLF_FUZZED((-10201)), _GLF_FUZZED((~(-8885))), _GLF_FUZZED(int(69042u)), _GLF_FUZZED((3433 & 33816)), _GLF_FUZZED(int(true)), _GLF_FUZZED(((48117 + ivec3(8159, -96311, 18812).t) - ivec2(-857, 67806).y)), _GLF_FUZZED(-25279), _GLF_FUZZED(18080));
layout(location = 0) out vec4 _GLF_color;

layout(set = 0, binding = 0) uniform buf0 {
    vec2 resolution;
};

vec3 _GLF_outlined_0(vec3 GLF_dead0d) {
    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
        return vec3(1.0, 1.0, 1.0);
    }
    if (_GLF_WRAPPED_IF_FALSE(false)) {
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            int donor_replacementGLF_dead9i = _GLF_FUZZED((38053 | (81190 % (-240))));
            vec2 donor_replacementGLF_dead9pos = _GLF_FUZZED((GLF_dead0s_g + injectionSwitch));
            vec4 donor_replacementGLF_dead9res = _GLF_FUZZED(vec4(-777.566, -672.765, 593.591, -86.89));
            for (donor_replacementGLF_dead9i = 0; donor_replacementGLF_dead9i < 8; donor_replacementGLF_dead9i++) {
                if (GLF_dead9collision(donor_replacementGLF_dead9pos, GLF_dead9picdata[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9i, 8)])) {
                    donor_replacementGLF_dead9res = GLF_dead9pal[_GLF_MAKE_IN_BOUNDS_INT((int(GLF_dead9picdata[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9i, 8)].x) * int(GLF_dead9picdata[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9i, 8)].y) + donor_replacementGLF_dead9i * 9 + 11) % 16, 16)];
                }
            }
        }
    } else {
        if (_GLF_DEAD(false)) {
            return vec3(1.0, 1.0, 1.0);
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                int donor_replacementGLF_dead7i = _GLF_FUZZED(((-34096) + 83833));
                float donor_replacementGLF_dead7limit = _GLF_FUZZED(floor(roundEven(distance(vec2(2237.6264, -7.8), injectionSwitch))));
                float donor_replacementGLF_dead7s = _GLF_FUZZED(GLF_dead0time);
                if (float(donor_replacementGLF_dead7i) >= donor_replacementGLF_dead7limit) {
                    ;
                }
            }
        }
        return vec3(GLF_dead0d);
    }
}

vec4 _GLF_outlined_2() {
    return mod(vec4(-2926.1268, -7148.9139, -729.666, 2.9), -5049.2187);
}

vec4 _GLF_outlined_3(vec4 _GLF_color) {
    return _GLF_color;
}

vec4 _GLF_outlined_4(vec4 _GLF_outVarBackup_GLF_color) {
    return _GLF_outVarBackup_GLF_color;
}

vec4 _GLF_outlined_5() {
    return vec4(-94.16, 20.80, -1.4, 714.523);
}

vec4 _GLF_outlined_6(vec4 _GLF_outVarBackup_GLF_color) {
    return _GLF_outVarBackup_GLF_color;
}

vec4 _GLF_outlined_7(vec4 _GLF_color) {
    return _GLF_color;
}

vec4 _GLF_outlined_8(vec4 _GLF_color) {
    return _GLF_color;
    if (_GLF_DEAD(_GLF_IDENTITY(false, bool(_GLF_IDENTITY(bool(false), false || (bool(false))))))) {
        int donor_replacementGLF_dead6v = _GLF_FUZZED((-91082));
        {
            donor_replacementGLF_dead6v /= 2;
        }
    }
}

vec4 _GLF_outlined_9(vec4 _GLF_outVarBackup_GLF_color) {
    return _GLF_outVarBackup_GLF_color;
    if (_GLF_DEAD(false)) {
        if (_GLF_DEAD(false)) {
            int donor_replacementGLF_dead6count = _GLF_FUZZED(clamp((34170 + 31074), -57526, -26377));
            int donor_replacementGLF_dead6v = _GLF_FUZZED(-51124);
            while (donor_replacementGLF_dead6v > 1) {
                if ((donor_replacementGLF_dead6v & 1) == 1) {
                    donor_replacementGLF_dead6v = 3 * donor_replacementGLF_dead6v + 1;
                } else {
                    donor_replacementGLF_dead6v /= 2;
                }
                donor_replacementGLF_dead6count++;
            }
        }
        return vec4(1.0, 1.0, 1.0, 1.0);
    }
}

vec4 _GLF_outlined_10(vec4 _GLF_outVarBackup_GLF_color) {
    return _GLF_outVarBackup_GLF_color;
}

void main() {
    float A[50];
    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
        int donor_replacementGLF_dead6count = _GLF_FUZZED(-61868);
        int donor_replacementGLF_dead6v = _GLF_FUZZED(-39392);
        while (donor_replacementGLF_dead6v > 1) {
            if ((donor_replacementGLF_dead6v & 1) == 1) {
                donor_replacementGLF_dead6v = 3 * donor_replacementGLF_dead6v + 1;
            } else {
                donor_replacementGLF_dead6v /= 2;
            }
            donor_replacementGLF_dead6count++;
        }
    }
    {
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        _GLF_color = vec4(-3.6, -8.9, 72.01, 3.5);
        if (_GLF_DEAD(false)) {
            if (_GLF_DEAD(false)) {
                int donor_replacementGLF_dead7i = _GLF_FUZZED((+72656));
                {
                    if (_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead7i, 4)] >= 1.0) {
                        _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead7i, 4)] = _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead7i, 4)] * _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead7i, 4)];
                    }
                    donor_replacementGLF_dead7i++;
                }
            }
            return;
        }
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            if (_GLF_DEAD(false)) {
                return;
            }
            _GLF_color = _GLF_outVarBackup_GLF_color;
        }
    }
    if (_GLF_DEAD(false)) {
        int donor_replacementGLF_dead5d = _GLF_FUZZED(-13801);
        if (_GLF_DEAD(false)) {
            int donor_replacementGLF_dead6count = _GLF_FUZZED((donor_replacementGLF_dead5d * (-4139)));
            int donor_replacementGLF_dead6v = _GLF_FUZZED(ivec4(91846, -2543, -20980, 39496).w);
            {
                if ((donor_replacementGLF_dead6v & 1) == 1) {
                    donor_replacementGLF_dead6v = 3 * donor_replacementGLF_dead6v + 1;
                } else {
                    donor_replacementGLF_dead6v /= 2;
                }
                donor_replacementGLF_dead6count++;
            }
        }
        ivec2 donor_replacementGLF_dead5p = _GLF_FUZZED((bitfieldInsert(ivec2(-80405, -32930), ivec2(-98883, 92315), 10874, 22340) & (-90383)));
        {
            donor_replacementGLF_dead5d--;
            if (_GLF_DEAD(false)) {
                int donor_replacementGLF_dead7i = _GLF_FUZZED(donor_replacementGLF_dead5d);
                float donor_replacementGLF_dead7ref = _GLF_FUZZED(-7.1);
                {
                    if (mod(float(donor_replacementGLF_dead7i), donor_replacementGLF_dead7ref) <= 0.01) {
                        GLF_dead0h_r += 0.2;
                    }
                    if (float(donor_replacementGLF_dead7i) >= GLF_dead0h_r) {
                        ;
                    }
                    donor_replacementGLF_dead7i++;
                }
            }
            GLF_dead5map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead5p.x) + (donor_replacementGLF_dead5p.y) * 16, 256)] = 1;
            GLF_dead5map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead5p.x - 1) + (donor_replacementGLF_dead5p.y) * 16, 256)] = 1;
            GLF_dead5map[_GLF_MAKE_IN_BOUNDS_INT((donor_replacementGLF_dead5p.x - 2) + (donor_replacementGLF_dead5p.y) * 16, 256)] = 1;
            donor_replacementGLF_dead5p.x -= 2;
        }
    }
    for (_GLF_struct_6 _GLF_struct_replacement_6 = _GLF_struct_6(1.0, uvec4(1u, 1u, 1u, 1u), uvec4(1u, 1u, 1u, 1u), uvec2(1u, 1u), mat2(1.0, 1.0, 1.0, 1.0), _GLF_struct_7(ivec3(1, 1, 1), _GLF_struct_8(mat4x2(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), mat4x2(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), bvec2(true, true), true, 0, 1))); _GLF_struct_replacement_6._f5._f1.i < 200; _GLF_struct_replacement_6._f5._f1.i++) {
        if (_GLF_struct_replacement_6._f5._f1.i >= int(resolution.x)) {
            if (_GLF_DEAD(false)) {
                vec2 donor_replacementGLF_dead4coord = _GLF_FUZZED(fma(vec2(-5.8, 8.9), injectionSwitch, fwidthFine(resolution)));
                vec4 donor_replacementGLF_dead4res = _GLF_FUZZED(exp2(fwidthCoarse(_GLF_color)));
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    _GLF_color = mix(vec4(684.026, 47.16, -7.1, 6.9), (vec4(-1786.5159, -6.1, 567.547, -821.905) + vec4(-1.7, 3.9, -375.741, 4250.5250)), vec4(-51.74, 0.0, 5747.0985, 1605.4400));
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        if (_GLF_DEAD(false)) {
                            vec2 donor_replacementGLF_dead9pos = _GLF_FUZZED(vec2(919.332, 181.939));
                            vec4 donor_replacementGLF_dead9quad = _GLF_FUZZED(mix(_GLF_color, _GLF_color, vec4(3152.1191, 2.1, -833.146, 8009.5042)));
                            if (donor_replacementGLF_dead9pos.x < donor_replacementGLF_dead9quad.x) {
                                ;
                            }
                        }
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                for (_GLF_struct_24 _GLF_struct_replacement_24 = _GLF_struct_24(ivec2(1, 1), mat2x3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0), 1.0, _GLF_struct_25(uvec3(1u, 1u, 1u), mat4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), 0), bvec4(true, true, true, true), _GLF_struct_26(true, mat3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0)), _GLF_struct_27(ivec4(1, 1, 1, 1))); _GLF_struct_replacement_24._f3.GLF_dead4i < 3; _GLF_struct_replacement_24._f3.GLF_dead4i++) {
                    for (int GLF_dead4j = 0; GLF_dead4j < 3; GLF_dead4j++) {
                        donor_replacementGLF_dead4res += texture(GLF_dead4tex, donor_replacementGLF_dead4coord + vec2(float(_GLF_struct_replacement_24._f3.GLF_dead4i - 1) * GLF_dead0h_r, float(GLF_dead4j - 1) * GLF_dead0h_r)) * GLF_dead4weights[_GLF_MAKE_IN_BOUNDS_INT(_GLF_struct_replacement_24._f3.GLF_dead4i * 3 + GLF_dead4j, 9)];
                    }
                }
            }
            break;
        }
        if ((4 * (_GLF_struct_replacement_6._f5._f1.i / 4)) == _GLF_struct_replacement_6._f5._f1.i) {
            {
                if (_GLF_DEAD(false)) {
                    break;
                }
                if (_GLF_DEAD(false)) {
                    _GLF_struct_28 _GLF_struct_replacement_28 = _GLF_struct_28(uvec3(1u, 1u, 1u), _GLF_FUZZED(vec2(-8179.8093, -2249.8284)));
                    vec4 donor_replacementGLF_dead9quad = _GLF_FUZZED(_GLF_color);
                    if (_GLF_struct_replacement_28.donor_replacementGLF_dead9pos.y < donor_replacementGLF_dead9quad.y) {
                        ;
                    }
                }
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = (+vec4(-5982.9850, -84.56, -1.8, 1224.0571));
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
            if (_GLF_DEAD(false)) {
                {
                    ;
                }
            }
            A[_GLF_struct_replacement_6._f5._f1.i / 4] = float(_GLF_struct_replacement_6._f5._f1.i);
            if (_GLF_DEAD(false)) {
                discard;
            }
            {
                if (_GLF_DEAD(false)) {
                    break;
                }
                vec4 _GLF_outVarBackup_GLF_color;
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    {
                        break;
                    }
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    return;
                }
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = (-vec4(8.8, -2.3, -2266.3523, -362.005));
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                }
            }
        }
    }
    for (int i = 0; i < 50; i++) {
        if (_GLF_DEAD(false)) {
            for (int _injected_loop_counter = int(_GLF_ZERO(0.0, injectionSwitch.x)); _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    _GLF_outVarBackup_GLF_color = _GLF_color;
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        int donor_replacementGLF_dead6count = _GLF_FUZZED(ivec3(92643, -15295, -57168)[1]);
                        int donor_replacementGLF_dead6v = _GLF_FUZZED(bitfieldReverse(i));
                        {
                            if ((donor_replacementGLF_dead6v & 1) == 1) {
                                donor_replacementGLF_dead6v = 3 * donor_replacementGLF_dead6v + 1;
                            } else {
                                donor_replacementGLF_dead6v /= 2;
                            }
                            donor_replacementGLF_dead6count++;
                        }
                    }
                    _GLF_color = atan(vec4(-5.4, 758.265, 530.620, -899.402), vec4(25.71, -814.822, 452.017, 1.9));
                    if (_GLF_DEAD(false)) {
                        int donor_replacementGLF_dead6count = _GLF_FUZZED(i);
                        int donor_replacementGLF_dead6v = _GLF_FUZZED(i);
                        {
                            if ((donor_replacementGLF_dead6v & 1) == 1) {
                                donor_replacementGLF_dead6v = 3 * donor_replacementGLF_dead6v + 1;
                            } else {
                                donor_replacementGLF_dead6v /= 2;
                            }
                            donor_replacementGLF_dead6count++;
                        }
                    }
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
                for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter < 1); _injected_loop_counter++) {
                    discard;
                    if (_GLF_DEAD(_GLF_IDENTITY(false, !(!(false))))) {
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                            int donor_replacementGLF_dead7i = _GLF_FUZZED(clamp(ivec4(70282, 41544, 2210, -35661), ivec4(66440, 23138, 84539, -84598), ivec4(84600, -58453, 90519, 18522))[0]);
                            float donor_replacementGLF_dead7ref = _GLF_FUZZED(distance(vec4(7.2, -7927.0478, 4.5, 117.233), step(_GLF_color, _GLF_color)));
                            float donor_replacementGLF_dead7s = _GLF_FUZZED(dFdxFine(length(vec2(-8251.8368, -52.00))));
                            if (mod(float(donor_replacementGLF_dead7i), donor_replacementGLF_dead7ref) <= 0.01) {
                                donor_replacementGLF_dead7s += 0.2;
                            }
                        }
                        vec2 donor_replacementGLF_dead4coord = _GLF_FUZZED(((-6.6) + min(vec2(-8378.5625, 5.5), vec2(4160.7917, 1.0))));
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            discard;
                        }
                        int donor_replacementGLF_dead4i = _GLF_FUZZED(-83282);
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            if (_GLF_DEAD(false)) {
                                discard;
                            }
                            if (_GLF_DEAD(false)) {
                                discard;
                            }
                            _GLF_color = _GLF_outlined_2();
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                        int donor_replacementGLF_dead4j = _GLF_FUZZED(i);
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            if (_GLF_DEAD(false)) {
                                _GLF_struct_29 _GLF_struct_replacement_29 = _GLF_struct_29(1u, _GLF_struct_30(vec4(1.0, 1.0, 1.0, 1.0), vec4(1.0, 1.0, 1.0, 1.0), true, mat2x3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0), _GLF_struct_31(bvec3(true, true, true), true, _GLF_FUZZED(donor_replacementGLF_dead4i), ivec3(1, 1, 1), mat4(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), uvec4(1u, 1u, 1u, 1u), mat4x2(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0)), vec2(1.0, 1.0)));
                                float donor_replacementGLF_dead7limit = _GLF_FUZZED(-27.67);
                                float donor_replacementGLF_dead7ref = _GLF_FUZZED(GLF_dead0s_g);
                                float donor_replacementGLF_dead7s = _GLF_FUZZED(GLF_dead0h_r);
                                while (_GLF_struct_replacement_29._f1._f4.donor_replacementGLF_dead7i < bitfieldInsert(800, _GLF_struct_replacement_29._f1._f4.donor_replacementGLF_dead7i, 0, 0)) {
                                    if (mod(float(_GLF_struct_replacement_29._f1._f4.donor_replacementGLF_dead7i), donor_replacementGLF_dead7ref) <= 0.01) {
                                        donor_replacementGLF_dead7s += 0.2;
                                    }
                                    if (float(_GLF_struct_replacement_29._f1._f4.donor_replacementGLF_dead7i) >= donor_replacementGLF_dead7limit) {
                                        ;
                                    }
                                    _GLF_struct_replacement_29._f1._f4.donor_replacementGLF_dead7i++;
                                }
                            }
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = vec4(-6.2, -92.31, 2.4, 4440.8817);
                            if (_GLF_DEAD(false)) {
                                int donor_replacementGLF_dead9i = _GLF_FUZZED(donor_replacementGLF_dead4j);
                                vec4 donor_replacementGLF_dead9res = _GLF_FUZZED(normalize(log2(_GLF_color)));
                                if (GLF_dead9collision(donor_replacementGLF_dead4coord, GLF_dead9picdata[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9i, 8)])) {
                                    donor_replacementGLF_dead9res = GLF_dead9pal[_GLF_MAKE_IN_BOUNDS_INT((int(GLF_dead9picdata[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9i, 8)].x) * int(GLF_dead9picdata[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9i, 8)].y) + donor_replacementGLF_dead9i * 9 + 11) % 16, 16)];
                                }
                            }
                            if (_GLF_DEAD(false)) {
                                break;
                            }
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                            if (_GLF_DEAD(false)) {
                                break;
                                if (_GLF_DEAD(false)) {
                                    int donor_replacementGLF_dead7i = _GLF_FUZZED(ivec3(-30469, 17462, 63844).t);
                                    float donor_replacementGLF_dead7limit = _GLF_FUZZED(pow(GLF_dead0s_g, GLF_dead0h_r));
                                    float donor_replacementGLF_dead7ref = _GLF_FUZZED(GLF_dead0s_g);
                                    float donor_replacementGLF_dead7s = _GLF_FUZZED(_GLF_outVarBackup_GLF_color[0]);
                                    while (donor_replacementGLF_dead7i < bitfieldInsert(800, donor_replacementGLF_dead7i, 0, 0)) {
                                        if (mod(float(donor_replacementGLF_dead7i), donor_replacementGLF_dead7ref) <= 0.01) {
                                            donor_replacementGLF_dead7s += 0.2;
                                        }
                                        if (float(donor_replacementGLF_dead7i) >= donor_replacementGLF_dead7limit) {
                                            ;
                                        }
                                        donor_replacementGLF_dead7i++;
                                    }
                                }
                            }
                        }
                        vec4 donor_replacementGLF_dead4res = _GLF_FUZZED(vec4(5723.5920, 3911.3298, 3.7, 5.2));
                        float donor_replacementGLF_dead4uvstep = _GLF_FUZZED(2.9);
                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                            int donor_replacementGLF_dead6count = _GLF_FUZZED(_injected_loop_counter);
                            int donor_replacementGLF_dead6v = _GLF_FUZZED(bitfieldReverse(-39199));
                            while (donor_replacementGLF_dead6v > 1) {
                                if ((donor_replacementGLF_dead6v & 1) == 1) {
                                    donor_replacementGLF_dead6v = 3 * donor_replacementGLF_dead6v + 1;
                                } else {
                                    donor_replacementGLF_dead6v /= 2;
                                }
                                donor_replacementGLF_dead6count++;
                            }
                        }
                        {
                            donor_replacementGLF_dead4res += texture(GLF_dead4tex, donor_replacementGLF_dead4coord + vec2(float(donor_replacementGLF_dead4i - 1) * donor_replacementGLF_dead4uvstep, float(donor_replacementGLF_dead4j - 1) * donor_replacementGLF_dead4uvstep)) * GLF_dead4weights[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4i * 3 + donor_replacementGLF_dead4j, 9)];
                        }
                    }
                }
            }
        }
        if (i < int(gl_FragCoord.x)) {
            break;
        }
        if (i > 0) {
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                if (_GLF_DEAD(false)) {
                    int donor_replacementGLF_dead6v = _GLF_FUZZED(bitfieldReverse(-53421));
                    {
                        donor_replacementGLF_dead6v = 3 * donor_replacementGLF_dead6v + 1;
                    }
                }
                A[i] += A[i - 1];
                {
                    vec4 _GLF_outVarBackup_GLF_color;
                    if (_GLF_DEAD(false)) {
                        discard;
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < sin(0.0))))) {
                            continue;
                        }
                    }
                    _GLF_outVarBackup_GLF_color = _GLF_outlined_3(_GLF_color);
                    _GLF_color = (vec4(1446.1916, 34.81, -4.2, -86.64) / 137.710);
                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                        _GLF_color = _GLF_outVarBackup_GLF_color;
                    }
                }
            } else {
            }
            if (_GLF_DEAD(false)) {
                break;
            }
            {
                vec4 _GLF_outVarBackup_GLF_color;
                if (_GLF_DEAD(false)) {
                    do {
                        if (_GLF_outVarBackup_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(i, 4)] >= 1.0) {
                            _GLF_outVarBackup_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(i, 4)] = _GLF_outVarBackup_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(i, 4)] * _GLF_outVarBackup_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(i, 4)];
                        }
                        i++;
                    } while (i < findMSB(findLSB(i)));
                }
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = vec4(8.8, 2.7, -3363.7577, 2888.5933);
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outlined_4(_GLF_outVarBackup_GLF_color);
                    if (_GLF_DEAD(false)) {
                        {
                            ;
                        }
                    }
                }
            }
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            vec2 donor_replacementGLF_dead0center = _GLF_FUZZED(refract(resolution, resolution, (bvec2(false, true).s ? acos(9.2) : (-72.49))));
            vec2 donor_replacementGLF_dead0position = _GLF_FUZZED(fwidthCoarse(injectionSwitch));
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                int donor_replacementGLF_dead7i = _GLF_FUZZED(bitCount(166966u));
                float donor_replacementGLF_dead7limit = _GLF_FUZZED(5.8);
                float donor_replacementGLF_dead7s = _GLF_FUZZED(GLF_dead0h_r);
                if (float(donor_replacementGLF_dead7i) >= donor_replacementGLF_dead7limit) {
                    ;
                }
            }
            vec3 donor_replacementGLF_dead0result = _GLF_FUZZED(smoothstep(vec3(953.262, 101.849, 864.589), vec3(-845.462, 982.217, -8.6), vec3(-2319.8838, -7680.7822, -2.4)));
            for (int GLF_dead0i = 35; GLF_dead0i >= 0; GLF_dead0i--) {
                vec3 GLF_dead0d = _GLF_FUZZED((vec2(-319.565, -38.13) * mat3x2(mat4x3(8006.6346, -964.291, -718.986, -188.555, 86.87, -2394.1405, -71.87, 6.0, -1.1, -157.593, -1.2, 929.407))));
                GLF_dead0d = GLF_dead0drawShape(donor_replacementGLF_dead0position, donor_replacementGLF_dead0center + vec2(sin(float(GLF_dead0i) / 10.0 + GLF_dead0time) / 4.0, 0.0), vec3(0.01 + sin(float(GLF_dead0i) / 100.0), 0.01, float(GLF_dead0i)));
                if (length(GLF_dead0d) <= 0.0) {
                    continue;
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    continue;
                }
                donor_replacementGLF_dead0result = _GLF_outlined_0(GLF_dead0d);
            }
        }
    }
    {
        vec4 _GLF_outVarBackup_GLF_color;
        _GLF_outVarBackup_GLF_color = _GLF_color;
        _GLF_color = vec4(-3.8);
        if (_GLF_WRAPPED_IF_TRUE(true)) {
            _GLF_color = _GLF_outVarBackup_GLF_color;
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                return;
            }
        }
    }
    if (int(gl_FragCoord.x) < 20) {
        _GLF_color = vec4(A[0] / resolution.x, A[4] / resolution.y, 1.0, 1.0);
    } else {
        {
            vec4 _GLF_outVarBackup_GLF_color;
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = vec4(1045.3647, 19.59, -441.458, -9.1);
            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= _GLF_ZERO(0.0, injectionSwitch.x))))) {
                _GLF_color = _GLF_outVarBackup_GLF_color;
                if (_GLF_DEAD(false)) {
                    if (_GLF_DEAD(false)) {
                        int donor_replacementGLF_dead9i = _GLF_FUZZED(96787);
                        vec2 donor_replacementGLF_dead9pos = _GLF_FUZZED(fma(vec2(-807.615, 9010.7804), resolution, vec2(309.566, -416.466)));
                        if (GLF_dead9collision(donor_replacementGLF_dead9pos, GLF_dead9picdata[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9i, 8)])) {
                            _GLF_color = GLF_dead9pal[_GLF_MAKE_IN_BOUNDS_INT((int(GLF_dead9picdata[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9i, 8)].x) * int(GLF_dead9picdata[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9i, 8)].y) + donor_replacementGLF_dead9i * 9 + 11) % 16, 16)];
                        }
                    }
                    return;
                    if (_GLF_DEAD(_GLF_IDENTITY(false, false || (false)))) {
                        int donor_replacementGLF_dead6count = _GLF_FUZZED(36846);
                        int donor_replacementGLF_dead6v = _GLF_FUZZED(findLSB(-66017));
                        while (donor_replacementGLF_dead6v > 1) {
                            if ((donor_replacementGLF_dead6v & 1) == 1) {
                                donor_replacementGLF_dead6v = 3 * donor_replacementGLF_dead6v + 1;
                            } else {
                                donor_replacementGLF_dead6v /= 2;
                            }
                            donor_replacementGLF_dead6count++;
                        }
                    }
                }
            }
        }
        {
            vec4 _GLF_outVarBackup_GLF_color;
            if (_GLF_DEAD(false)) {
                return;
            }
            if (_GLF_DEAD(false)) {
                {
                    ;
                }
            }
            _GLF_outVarBackup_GLF_color = _GLF_color;
            _GLF_color = vec4(1.9, -3981.0589, -9.1, 271.921);
            for (int _injected_loop_counter = int(_GLF_ONE(1.0, injectionSwitch.y)); _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    if (_GLF_DEAD(false)) {
                        discard;
                    }
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            _GLF_color = vec4(-1.4, -81.31, -2.8, 46.82);
                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                _GLF_color = _GLF_outVarBackup_GLF_color;
                            }
                        }
                        {
                            ;
                        }
                    }
                }
            }
        }
        for (int _injected_loop_counter = int(_GLF_ONE(1.0, injectionSwitch.y)); _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
            {
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    int donor_replacementGLF_dead7i = _GLF_FUZZED(_injected_loop_counter);
                    float donor_replacementGLF_dead7limit = _GLF_FUZZED(fwidthCoarse(GLF_dead0time));
                    float donor_replacementGLF_dead7ref = _GLF_FUZZED(fwidth(GLF_dead0b_b));
                    float donor_replacementGLF_dead7s = _GLF_FUZZED(normalize(GLF_dead0time));
                    while (donor_replacementGLF_dead7i < bitfieldInsert(800, donor_replacementGLF_dead7i, 0, 0)) {
                        if (mod(float(donor_replacementGLF_dead7i), donor_replacementGLF_dead7ref) <= 0.01) {
                            donor_replacementGLF_dead7s += 0.2;
                        }
                        if (float(donor_replacementGLF_dead7i) >= donor_replacementGLF_dead7limit) {
                            ;
                        }
                        donor_replacementGLF_dead7i++;
                    }
                }
                vec4 _GLF_outVarBackup_GLF_color;
                _GLF_outVarBackup_GLF_color = _GLF_color;
                _GLF_color = _GLF_outlined_5();
                if (_GLF_WRAPPED_IF_TRUE(true)) {
                    _GLF_color = _GLF_outVarBackup_GLF_color;
                    if (_GLF_DEAD(false)) {
                        return;
                    }
                    if (_GLF_DEAD(false)) {
                        int donor_replacementGLF_dead9i = _GLF_FUZZED(ivec3(-36368, 31662, 82013)[1]);
                        vec2 donor_replacementGLF_dead9pos = _GLF_FUZZED((injectionSwitch / GLF_dead0h_r));
                        vec4 donor_replacementGLF_dead9res = _GLF_FUZZED(_GLF_outVarBackup_GLF_color);
                        {
                            if (GLF_dead9collision(donor_replacementGLF_dead9pos, GLF_dead9picdata[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9i, 8)])) {
                                donor_replacementGLF_dead9res = GLF_dead9pal[_GLF_MAKE_IN_BOUNDS_INT((int(GLF_dead9picdata[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9i, 8)].x) * int(GLF_dead9picdata[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9i, 8)].y) + donor_replacementGLF_dead9i * 9 + 11) % 16, 16)];
                            }
                        }
                    }
                }
            }
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < tan(0.0))))) {
                vec2 donor_replacementGLF_dead4coord = _GLF_FUZZED(mat4x2(mat3x2(-0.2, 9.8, -7.6, -3505.8752, -6.3, -6819.2665))[0]);
                if (_GLF_DEAD(false)) {
                    {
                        ;
                    }
                }
                int donor_replacementGLF_dead4i = _GLF_FUZZED(_injected_loop_counter);
                vec4 donor_replacementGLF_dead4res = _GLF_FUZZED(vec4(-2490.2409, 7.5, -2403.9608, 6594.1158));
                {
                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        continue;
                    }
                    for (int GLF_dead4j = 0; GLF_dead4j < 3; GLF_dead4j++) {
                        donor_replacementGLF_dead4res += texture(GLF_dead4tex, donor_replacementGLF_dead4coord + vec2(float(donor_replacementGLF_dead4i - 1) * GLF_dead0h_r, float(GLF_dead4j - 1) * GLF_dead0h_r)) * GLF_dead4weights[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4i * 3 + GLF_dead4j, 9)];
                    }
                }
            }
            if (int(gl_FragCoord.x) < 40) {
                _GLF_color = vec4(A[5] / resolution.x, A[9] / resolution.y, 1.0, 1.0);
            } else {
                if (_GLF_DEAD(false)) {
                    float donor_replacementGLF_dead1grey = _GLF_FUZZED(-30.15);
                    {
                        donor_replacementGLF_dead1grey = 0.5 + float(GLF_dead1data[6]) / 10.0;
                    }
                }
                if (int(gl_FragCoord.x) < 60) {
                    if (_GLF_DEAD(false)) {
                        {
                            vec4 _GLF_outVarBackup_GLF_color;
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < abs(0.0))))) {
                                break;
                            }
                            _GLF_outVarBackup_GLF_color = _GLF_color;
                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                break;
                            }
                            _GLF_color = roundEven(dFdy(vec4(-3946.6533, 80.38, 9433.5132, -8.9)));
                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                _GLF_color = _GLF_outlined_6(_GLF_outVarBackup_GLF_color);
                            }
                        }
                        return;
                    }
                    _GLF_color = vec4(A[10] / resolution.x, A[14] / resolution.y, 1.0, 1.0);
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        int donor_replacementGLF_dead6v = _GLF_FUZZED(abs(_injected_loop_counter));
                        if ((donor_replacementGLF_dead6v & 1) == 1) {
                            donor_replacementGLF_dead6v = 3 * donor_replacementGLF_dead6v + 1;
                        } else {
                            donor_replacementGLF_dead6v /= 2;
                        }
                    }
                } else {
                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                        break;
                    }
                    if (_GLF_DEAD(false)) {
                        if (_GLF_DEAD(false)) {
                            if (_GLF_DEAD(false)) {
                                int donor_replacementGLF_dead9i = _GLF_FUZZED(_injected_loop_counter);
                                vec2 donor_replacementGLF_dead9pos = _GLF_FUZZED((injectionSwitch + vec2(4.5, 5.0)));
                                vec4 donor_replacementGLF_dead9res = _GLF_FUZZED(_GLF_color);
                                if (GLF_dead9collision(donor_replacementGLF_dead9pos, GLF_dead9picdata[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9i, 8)])) {
                                    donor_replacementGLF_dead9res = GLF_dead9pal[_GLF_MAKE_IN_BOUNDS_INT((int(GLF_dead9picdata[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9i, 8)].x) * int(GLF_dead9picdata[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9i, 8)].y) + donor_replacementGLF_dead9i * 9 + 11) % 16, 16)];
                                }
                            }
                            continue;
                        }
                        return;
                    }
                    do {
                        if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                        } else {
                            if (_GLF_DEAD(_GLF_IDENTITY(false, bool(bvec2(false, false))))) {
                                return;
                            }
                            {
                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                    int donor_replacementGLF_dead6count = _GLF_FUZZED(findMSB(34075));
                                    while (_injected_loop_counter > 1) {
                                        if ((_injected_loop_counter & 1) == 1) {
                                            _injected_loop_counter = 3 * _injected_loop_counter + 1;
                                        } else {
                                            _injected_loop_counter /= 2;
                                        }
                                        donor_replacementGLF_dead6count++;
                                    }
                                }
                                {
                                    vec4 _GLF_outVarBackup_GLF_color;
                                    _GLF_outVarBackup_GLF_color = _GLF_outlined_7(_GLF_color);
                                    _GLF_color = vec4(-42.27, 8.3, -760.585, 89.20);
                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)))) {
                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                    }
                                    if (_GLF_DEAD(false)) {
                                        int donor_replacementGLF_dead7i = _GLF_FUZZED(-47164);
                                        int donor_replacementGLF_dead7msb8 = _GLF_FUZZED(17917);
                                        do {
                                            if (_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead7i, 4)] >= 1.0) {
                                                _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead7i, 4)] = _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead7i, 4)] * _GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead7i, 4)];
                                            }
                                            donor_replacementGLF_dead7i++;
                                        } while (donor_replacementGLF_dead7i < findMSB(findLSB(donor_replacementGLF_dead7msb8)));
                                    }
                                }
                                vec4 _GLF_outVarBackup_GLF_color;
                                _GLF_outVarBackup_GLF_color = _GLF_outlined_8(_GLF_color);
                                _GLF_color = roundEven(vec4(-6534.8506, -2.4, 90.04, 31.16));
                                if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                        {
                                            ;
                                        }
                                    }
                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                }
                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                    discard;
                                }
                            }
                            if (int(gl_FragCoord.x) < 80) {
                                _GLF_color = vec4(A[15] / resolution.x, A[19] / resolution.y, 1.0, 1.0);
                            } else {
                                if (_GLF_WRAPPED_IF_FALSE(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                } else {
                                    if (int(gl_FragCoord.x) < 100) {
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            if (_GLF_DEAD(false)) {
                                                int donor_replacementGLF_dead6v = _GLF_FUZZED(85334);
                                                {
                                                    donor_replacementGLF_dead6v = 3 * donor_replacementGLF_dead6v + 1;
                                                }
                                            }
                                            _GLF_color = vec4(A[20] / resolution.x, A[24] / resolution.y, 1.0, 1.0);
                                        } else {
                                        }
                                    } else if (int(gl_FragCoord.x) < 120) {
                                        _GLF_color = vec4(A[25] / resolution.x, A[29] / resolution.y, 1.0, 1.0);
                                    } else {
                                        do {
                                            if (int(gl_FragCoord.x) < 140) {
                                                _GLF_color = vec4(A[30] / resolution.x, A[34] / resolution.y, 1.0, 1.0);
                                            } else if (int(gl_FragCoord.x) < 160) {
                                                _GLF_color = vec4(A[35] / resolution.x, A[39] / resolution.y, 1.0, 1.0);
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                    return;
                                                }
                                            } else if (int(gl_FragCoord.x) < 180) {
                                                {
                                                    if (_GLF_DEAD(false)) {
                                                        discard;
                                                    }
                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                    _GLF_color = vec4(2.8, 8.8, 3.3, 0.4);
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                        vec2 donor_replacementGLF_dead4coord = _GLF_FUZZED(injectionSwitch);
                                                        int donor_replacementGLF_dead4i = _GLF_FUZZED(_injected_loop_counter);
                                                        if (_GLF_DEAD(false)) {
                                                            continue;
                                                        }
                                                        float donor_replacementGLF_dead4uvstep = _GLF_FUZZED(-92.46);
                                                        if (_GLF_DEAD(false)) {
                                                            _GLF_struct_32 _GLF_struct_replacement_32 = _GLF_struct_32(mat2x3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0), _GLF_FUZZED(fract(donor_replacementGLF_dead4coord)), _GLF_struct_33(mat2x3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0), _GLF_struct_34(mat2x3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0), ivec4(1, 1, 1, 1), mat4x3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0)), _GLF_struct_35(mat3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), mat3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), uvec4(1u, 1u, 1u, 1u), mat3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0))), 1u, _GLF_struct_36(mat4x3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0), vec4(1.0, 1.0, 1.0, 1.0), bvec2(true, true), _GLF_struct_37(mat2(1.0, 1.0, 1.0, 1.0), ivec3(1, 1, 1), mat4x3(1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0)), uvec2(1u, 1u)), bvec4(true, true, true, true), 1u);
                                                            vec4 donor_replacementGLF_dead9quad = _GLF_FUZZED(degrees(_GLF_color));
                                                            if (_GLF_struct_replacement_32.donor_replacementGLF_dead9pos.y < donor_replacementGLF_dead9quad.y) {
                                                                ;
                                                            }
                                                        }
                                                        {
                                                            for (int GLF_dead4j = 0; GLF_dead4j < 3; GLF_dead4j++) {
                                                                _GLF_outVarBackup_GLF_color += texture(GLF_dead4tex, donor_replacementGLF_dead4coord + vec2(float(donor_replacementGLF_dead4i - 1) * donor_replacementGLF_dead4uvstep, float(GLF_dead4j - 1) * donor_replacementGLF_dead4uvstep)) * GLF_dead4weights[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4i * 3 + GLF_dead4j, 9)];
                                                            }
                                                        }
                                                    }
                                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                            discard;
                                                        }
                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                    }
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                        float donor_replacementGLF_dead7s = _GLF_FUZZED(GLF_dead0h_r);
                                                        {
                                                            donor_replacementGLF_dead7s += 0.2;
                                                        }
                                                    }
                                                }
                                                for (int _injected_loop_counter = 0; _GLF_WRAPPED_LOOP(_injected_loop_counter != int(_GLF_ONE(1.0, injectionSwitch.y))); _injected_loop_counter++) {
                                                    _GLF_color = vec4(A[40] / resolution.x, A[44] / resolution.y, 1.0, 1.0);
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                        int donor_replacementGLF_dead7i = _GLF_FUZZED(-83430);
                                                        float donor_replacementGLF_dead7limit = _GLF_FUZZED(asin(-581.640));
                                                        float donor_replacementGLF_dead7s = _GLF_FUZZED(GLF_dead0s_g);
                                                        if (float(donor_replacementGLF_dead7i) >= donor_replacementGLF_dead7limit) {
                                                            ;
                                                        }
                                                    }
                                                }
                                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                        continue;
                                                    }
                                                    vec2 donor_replacementGLF_dead0center = _GLF_FUZZED(dFdyCoarse(resolution));
                                                    vec2 donor_replacementGLF_dead0position = _GLF_FUZZED(vec2(3713.3912, -3723.7292));
                                                    vec3 donor_replacementGLF_dead0result = _GLF_FUZZED(dFdxCoarse(vec3(-864.881, -4939.1777, 8.4)));
                                                    for (_GLF_struct_9 _GLF_struct_replacement_9 = _GLF_struct_9(35, bvec2(true, true), bvec3(true, true, true)); _GLF_struct_replacement_9.GLF_dead0i >= 0; _GLF_struct_replacement_9.GLF_dead0i--) {
                                                        {
                                                            if (_GLF_DEAD(false)) {
                                                                discard;
                                                            }
                                                            if (_GLF_DEAD(false)) {
                                                                {
                                                                    if (_GLF_DEAD(false)) {
                                                                        int donor_replacementGLF_dead6count = _GLF_FUZZED(59144);
                                                                        int donor_replacementGLF_dead6v = _GLF_FUZZED(bitCount(118124u));
                                                                        while (donor_replacementGLF_dead6v > 1) {
                                                                            if ((donor_replacementGLF_dead6v & 1) == 1) {
                                                                                donor_replacementGLF_dead6v = 3 * donor_replacementGLF_dead6v + 1;
                                                                            } else {
                                                                                donor_replacementGLF_dead6v /= 2;
                                                                            }
                                                                            donor_replacementGLF_dead6count++;
                                                                        }
                                                                    }
                                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                    _GLF_color = (0.1 + vec4(-6.2, 4.0, -8.9, 3072.8344));
                                                                    if (_GLF_DEAD(false)) {
                                                                        continue;
                                                                    }
                                                                    if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)))) {
                                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                    }
                                                                    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                                        int donor_replacementGLF_dead8c_im = _GLF_FUZZED(-24514);
                                                                        int donor_replacementGLF_dead8c_re = _GLF_FUZZED(73283);
                                                                        {
                                                                            if (_injected_loop_counter * _injected_loop_counter + _injected_loop_counter * _injected_loop_counter > 262144) {
                                                                                break;
                                                                            }
                                                                            int GLF_dead8x_new = ((_injected_loop_counter * _injected_loop_counter - _injected_loop_counter * _injected_loop_counter) / 256 + donor_replacementGLF_dead8c_re);
                                                                            _injected_loop_counter = (2 * _injected_loop_counter * _injected_loop_counter / 256 + donor_replacementGLF_dead8c_im);
                                                                            _injected_loop_counter = GLF_dead8x_new;
                                                                            _injected_loop_counter++;
                                                                        }
                                                                    }
                                                                }
                                                                vec2 donor_replacementGLF_dead3pos = _GLF_FUZZED(log(donor_replacementGLF_dead0position));
                                                                vec4 donor_replacementGLF_dead3quad = _GLF_FUZZED((vec4(-8410.4572, -363.998, 1209.4556, 5136.6103) + GLF_dead0h_r));
                                                                if (_GLF_DEAD(false)) {
                                                                    continue;
                                                                }
                                                                if (donor_replacementGLF_dead3pos.y > donor_replacementGLF_dead3quad.y + donor_replacementGLF_dead3quad.w) {
                                                                    ;
                                                                }
                                                                if (_GLF_DEAD(false)) {
                                                                    continue;
                                                                }
                                                            }
                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                            _GLF_color = pow(vec4(-0.8, 6.2, 75.71, 842.059), pow(vec4(6504.0965, -1952.1866, 5.8, 43.03), vec4(-75.28, 7.1, -93.07, 9.7)));
                                                            for (int _injected_loop_counter = (0 | 0); _GLF_WRAPPED_LOOP(_injected_loop_counter != 1); _injected_loop_counter++) {
                                                                {
                                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                    _GLF_color = (mat3x4(565.697, 696.023, -1.5, -53.33, 304.868, -727.303, 173.881, -7330.8915, 755.693, -7722.0019, -4114.6405, 7.2) * vec3(558.097, -82.46, 7.1));
                                                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                                            int donor_replacementGLF_dead7i = _GLF_FUZZED(sign(26053));
                                                                            float donor_replacementGLF_dead7s = _GLF_FUZZED(smoothstep(GLF_dead0b_b, GLF_dead0s_g, max(GLF_dead0time, roundEven(GLF_dead0b_b))));
                                                                            if (float(donor_replacementGLF_dead7i) >= GLF_dead0s_g) {
                                                                                ;
                                                                            }
                                                                        }
                                                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                                            break;
                                                                            if (_GLF_DEAD(false)) {
                                                                                break;
                                                                            }
                                                                        }
                                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                    }
                                                                }
                                                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                                    int donor_replacementGLF_dead6count = _GLF_FUZZED((-45223));
                                                                    int donor_replacementGLF_dead6v = _GLF_FUZZED(-58104);
                                                                    {
                                                                        if ((donor_replacementGLF_dead6v & 1) == 1) {
                                                                            donor_replacementGLF_dead6v = 3 * donor_replacementGLF_dead6v + 1;
                                                                        } else {
                                                                            donor_replacementGLF_dead6v /= 2;
                                                                        }
                                                                        donor_replacementGLF_dead6count++;
                                                                    }
                                                                }
                                                                if (_GLF_DEAD(false)) {
                                                                    discard;
                                                                    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                                        vec2 donor_replacementGLF_dead9pos = _GLF_FUZZED(degrees(abs(resolution)));
                                                                        vec4 donor_replacementGLF_dead9quad = _GLF_FUZZED(vec4(5977.4363, round(GLF_dead0time), donor_replacementGLF_dead0center));
                                                                        if (donor_replacementGLF_dead9pos.y < donor_replacementGLF_dead9quad.y) {
                                                                            ;
                                                                        }
                                                                    }
                                                                }
                                                                if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                    _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                }
                                                                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                                    int donor_replacementGLF_dead7i = _GLF_FUZZED(88553);
                                                                    {
                                                                        _GLF_outVarBackup_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead7i, 4)] = _GLF_outVarBackup_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead7i, 4)] * _GLF_outVarBackup_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead7i, 4)];
                                                                    }
                                                                }
                                                                if (_GLF_DEAD(false)) {
                                                                    bool donor_replacementGLF_dead5canwalk = _GLF_FUZZED((false == true));
                                                                    int donor_replacementGLF_dead5i = _GLF_FUZZED(_injected_loop_counter);
                                                                    if (_GLF_DEAD(false)) {
                                                                        discard;
                                                                    }
                                                                    int donor_replacementGLF_dead5j = _GLF_FUZZED(ivec2(-33748, 3082)[0]);
                                                                    ivec2 donor_replacementGLF_dead5p = _GLF_FUZZED(ivec2(-76996, -17271));
                                                                    for (donor_replacementGLF_dead5j = 0; donor_replacementGLF_dead5j < 8; donor_replacementGLF_dead5j++) {
                                                                        if (GLF_dead5map[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead5j * 2 + donor_replacementGLF_dead5i * 2 * 16, 256)] == 0) {
                                                                            donor_replacementGLF_dead5p.x = donor_replacementGLF_dead5j * 2;
                                                                            donor_replacementGLF_dead5p.y = donor_replacementGLF_dead5i * 2;
                                                                            donor_replacementGLF_dead5canwalk = true;
                                                                            if (_GLF_DEAD(false)) {
                                                                                continue;
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                        vec3 GLF_dead0d = _GLF_FUZZED((vec2(-319.565, -38.13) * mat3x2(mat4x3(8006.6346, -964.291, -718.986, -188.555, 86.87, -2394.1405, -71.87, 6.0, -1.1, -157.593, -1.2, 929.407))));
                                                        GLF_dead0d = GLF_dead0drawShape(donor_replacementGLF_dead0position, donor_replacementGLF_dead0center + vec2(sin(float(_GLF_struct_replacement_9.GLF_dead0i) / 10.0 + GLF_dead0time) / 4.0, 0.0), vec3(0.01 + sin(float(_GLF_struct_replacement_9.GLF_dead0i) / 100.0), 0.01, float(_GLF_struct_replacement_9.GLF_dead0i)));
                                                        if (length(GLF_dead0d) <= 0.0) {
                                                            continue;
                                                        }
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                            discard;
                                                            if (_GLF_DEAD(false)) {
                                                                continue;
                                                            }
                                                        }
                                                        donor_replacementGLF_dead0result = vec3(GLF_dead0d);
                                                    }
                                                }
                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                                                    continue;
                                                }
                                            } else {
                                                if (_GLF_DEAD(false)) {
                                                    discard;
                                                }
                                                if (int(gl_FragCoord.x) < 180) {
                                                    _GLF_color = vec4(A[45] / resolution.x, A[49] / resolution.y, 1.0, 1.0);
                                                } else {
                                                    for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter != ((0 << _GLF_IDENTITY(int(8), int(8))) >> _GLF_IDENTITY(int(7), _GLF_IDENTITY(int(7), (int(7)) | 0)))); _injected_loop_counter--) {
                                                        if (_GLF_WRAPPED_IF_FALSE(false)) {
                                                        } else {
                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                                return;
                                                            }
                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                            _GLF_color = vec4(-8.8, -4.9, -4236.9812, 33.61);
                                                            if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                for (int _injected_loop_counter = 1; _GLF_WRAPPED_LOOP(_injected_loop_counter > 0); _injected_loop_counter--) {
                                                                    _GLF_color = _GLF_outlined_9(_GLF_outVarBackup_GLF_color);
                                                                }
                                                            }
                                                        }
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                            bool donor_replacementGLF_dead5canwalk = _GLF_FUZZED(false);
                                                            int donor_replacementGLF_dead5j = _GLF_FUZZED(93083);
                                                            if (_GLF_DEAD(_GLF_IDENTITY(false, (false) || _GLF_FALSE(false, (gl_FragCoord.y < 0.0))))) {
                                                                break;
                                                            }
                                                            ivec2 donor_replacementGLF_dead5p = _GLF_FUZZED((_injected_loop_counter ^ ivec2(-74110, 24419)));
                                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < log(1.0))))) {
                                                                discard;
                                                            }
                                                            {
                                                                donor_replacementGLF_dead5p.x = donor_replacementGLF_dead5j * 2;
                                                                {
                                                                    vec4 _GLF_outVarBackup_GLF_color;
                                                                    if (_GLF_DEAD(false)) {
                                                                        {
                                                                            ;
                                                                        }
                                                                    }
                                                                    _GLF_outVarBackup_GLF_color = _GLF_color;
                                                                    _GLF_color = vec4(3904.3458, -8.7, -722.519, 4323.3686);
                                                                    if (_GLF_WRAPPED_IF_TRUE(true)) {
                                                                        _GLF_color = _GLF_outVarBackup_GLF_color;
                                                                    }
                                                                }
                                                                donor_replacementGLF_dead5p.y = _injected_loop_counter * 2;
                                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                                    vec4 donor_replacementGLF_dead7c = _GLF_FUZZED(((+_GLF_color) * _GLF_color));
                                                                    int donor_replacementGLF_dead7i = _GLF_FUZZED(_injected_loop_counter);
                                                                    {
                                                                        donor_replacementGLF_dead7c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead7i, 4)] = donor_replacementGLF_dead7c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead7i, 4)] * donor_replacementGLF_dead7c[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead7i, 4)];
                                                                    }
                                                                }
                                                                donor_replacementGLF_dead5canwalk = true;
                                                            }
                                                        }
                                                        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                                                            float donor_replacementGLF_dead7s = _GLF_FUZZED(max(GLF_dead0s_g, GLF_dead0b_b));
                                                            {
                                                                ;
                                                            }
                                                        }
                                                        discard;
                                                        {
                                                            vec4 _GLF_outVarBackup_GLF_color;
                                                            if (_GLF_DEAD(false)) {
                                                                return;
                                                                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                                    int donor_replacementGLF_dead9i = _GLF_FUZZED(-10621);
                                                                    vec2 donor_replacementGLF_dead9pos = _GLF_FUZZED(mix(injectionSwitch, resolution, -3772.1426));
                                                                    vec4 donor_replacementGLF_dead9res = _GLF_FUZZED(vec4(2.4, -8.4, 5058.4265, -8119.8982));
                                                                    if (GLF_dead9collision(donor_replacementGLF_dead9pos, GLF_dead9picdata[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9i, 8)])) {
                                                                        donor_replacementGLF_dead9res = GLF_dead9pal[_GLF_MAKE_IN_BOUNDS_INT((int(GLF_dead9picdata[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9i, 8)].x) * int(GLF_dead9picdata[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead9i, 8)].y) + donor_replacementGLF_dead9i * 9 + 11) % 16, 16)];
                                                                    }
                                                                }
                                                            }
                                                            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                                                                return;
                                                            }
                                                            _GLF_outVarBackup_GLF_color = _GLF_color;
                                                            _GLF_color = vec4(-4128.2242, 3.5, -1120.5088, 8.7);
                                                            if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)))) {
                                                                _GLF_color = _GLF_outVarBackup_GLF_color;
                                                            }
                                                        }
                                                    }
                                                    {
                                                        vec4 _GLF_outVarBackup_GLF_color;
                                                        if (_GLF_DEAD(false)) {
                                                            continue;
                                                        }
                                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                                        _GLF_color = vec4(8499.4771, -228.108, 6.2, -4.0);
                                                        if (_GLF_WRAPPED_IF_TRUE(_GLF_TRUE(true, (gl_FragCoord.x >= _GLF_IDENTITY(dot(vec3(0.0, 0.0, 1.0), vec3(1.0, 1.0, 0.0)), dot(vec3(0.0, 0.0, 1.0), vec3(1.0, 1.0, 0.0))))))) {
                                                            _GLF_color = _GLF_outlined_10(_GLF_outVarBackup_GLF_color);
                                                        }
                                                    }
                                                    if (_GLF_DEAD(false)) {
                                                        int donor_replacementGLF_dead6v = _GLF_FUZZED(-61436);
                                                        {
                                                            donor_replacementGLF_dead6v /= 2;
                                                        }
                                                    }
                                                }
                                            }
                                        } while (_GLF_WRAPPED_LOOP(_GLF_FALSE(false, (gl_FragCoord.y < 0.0))));
                                    }
                                    {
                                        vec4 _GLF_outVarBackup_GLF_color;
                                        _GLF_outVarBackup_GLF_color = _GLF_color;
                                        _GLF_color = vec4(-9.8, 3552.5576, -369.716, -1.6);
                                        if (_GLF_WRAPPED_IF_TRUE(true)) {
                                            _GLF_color = _GLF_outVarBackup_GLF_color;
                                        }
                                    }
                                }
                            }
                        }
                        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < tan(0.0))))) {
                            int donor_replacementGLF_dead6v = _GLF_FUZZED(_injected_loop_counter);
                            if ((donor_replacementGLF_dead6v & 1) == 1) {
                                donor_replacementGLF_dead6v = 3 * donor_replacementGLF_dead6v + 1;
                            } else {
                                donor_replacementGLF_dead6v /= 2;
                            }
                        }
                    } while (_GLF_WRAPPED_LOOP(false));
                }
            }
        }
    }
}
