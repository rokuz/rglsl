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

int GLF_dead12map[16 * 16] = int[256](0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
layout(set = 0, binding = 2) uniform sampler2D GLF_dead11tex;

struct GLF_dead8QuicksortObject {
    int numbers[10];
};

GLF_dead8QuicksortObject GLF_dead8obj = GLF_dead8QuicksortObject(int[10](0, 0, 0, 0, 0, 0, 0, 0, 0, 0));

void GLF_dead8swap(int GLF_dead8i, int GLF_dead8j) {
    int GLF_dead8temp = GLF_dead8obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead8i, 10)];
    GLF_dead8obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead8i, 10)] = GLF_dead8obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead8j, 10)];
    GLF_dead8obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead8j, 10)] = GLF_dead8temp;
}

vec4 GLF_dead7_GLF_color = _GLF_FUZZED(vec4(_GLF_IDENTITY(761.303, min(761.303, _GLF_IDENTITY(761.303, (true ? 761.303 : _GLF_FUZZED(-3.1))))), 8.0, -7488.8105, -_GLF_IDENTITY(5.9, (false ? _GLF_FUZZED(vec4(9873.6894, -8279.9929, 84.93, 8.7).b) : _GLF_IDENTITY(5.9, (false ? _GLF_FUZZED(-1.7) : 5.9))))));

layout(set = 0, binding = 3) uniform buf3 {
    vec2 GLF_dead5injectionSwitch;
};

struct GLF_dead5QuicksortObject {
    int numbers[10];
};

GLF_dead5QuicksortObject GLF_dead5obj = GLF_dead5QuicksortObject(int[10](0, 0, _GLF_IDENTITY(0, 0 + (_GLF_IDENTITY(0, clamp(0, 0, 0)))), 0, 0, 0, 0, 0, 0, 0));

vec3 GLF_dead5palette(vec3 GLF_dead5a, vec3 GLF_dead5b, vec3 GLF_dead5c, vec3 GLF_dead5d) {
    return fract(mix(GLF_dead5d * GLF_dead5a, GLF_dead5a * GLF_dead5c, _GLF_IDENTITY(GLF_dead5b + GLF_dead5d, _GLF_IDENTITY(mat3(1.0) * (GLF_dead5b + GLF_dead5d), (_GLF_IDENTITY(mat3(1.0) * (GLF_dead5b + GLF_dead5d), (true ? (mat3(1.0) * (GLF_dead5b + GLF_dead5d)) : _GLF_FUZZED(vec3(351.775, -967.475, 2076.6431))))) * vec3(1.0, 1.0, 1.0))) - GLF_dead5c));
}

vec4 GLF_dead4_GLF_color = _GLF_FUZZED(vec4(-0.3, _GLF_IDENTITY(-57.15, mix(float(-57.15), float(_GLF_FUZZED(7.9)), bool(false))), _GLF_IDENTITY(-8.3, (-8.3) - 0.0), -_GLF_IDENTITY(79.37, (false ? _GLF_FUZZED(6.3) : 79.37))));
int GLF_dead4map[16 * 16] = int[256](0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, _GLF_IDENTITY(0, ~(_GLF_IDENTITY(~(0), clamp(~(0), ~(0), ~(0))))), 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, _GLF_IDENTITY(0, min(0, _GLF_IDENTITY(0, ~(~(0))))), 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, _GLF_IDENTITY(0, (0) - 0), 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, _GLF_IDENTITY(0, (0) / 1), 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, _GLF_IDENTITY(0, (0) | 0), 0, 0, 0, 0, 0, 0, 0);

struct GLF_dead2BST {
    int data;
    int leftIndex;
    int rightIndex;
};

GLF_dead2BST GLF_dead2tree[10] = GLF_dead2BST[10](GLF_dead2BST(0, 0, 0), GLF_dead2BST(0, 0, 0), GLF_dead2BST(_GLF_IDENTITY(0, 0 | (_GLF_IDENTITY(0, (0) ^ 0))), 0, 0), GLF_dead2BST(0, 0, 0), GLF_dead2BST(0, 0, 0), GLF_dead2BST(0, 0, 0), GLF_dead2BST(0, 0, 0), GLF_dead2BST(_GLF_IDENTITY(0, (_GLF_IDENTITY(0, max(0, 0))) - (0 & 23340)), 0, 0), GLF_dead2BST(0, 0, 0), GLF_dead2BST(0, 0, 0));

void GLF_dead2makeTreeNode(inout GLF_dead2BST GLF_dead2tree, int GLF_dead2data) {
    if (_GLF_DEAD(false)) {
        {
            ;
        }
    }
    GLF_dead2tree.data = GLF_dead2data;
    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
        bool donor_replacementGLF_dead4canwalk = _GLF_FUZZED(_GLF_IDENTITY((bvec3(false, true, _GLF_IDENTITY(true, !(!(_GLF_IDENTITY(true, !(!(true))))))) == bvec3(true, true, false)), bool(bool((bvec3(false, true, _GLF_IDENTITY(true, !(!(_GLF_IDENTITY(true, !(!(true))))))) == bvec3(true, true, false))))));
        int donor_replacementGLF_dead4j = _GLF_FUZZED(_GLF_IDENTITY(-77791, (-77791) / int(_GLF_ONE(1.0, injectionSwitch.y))));
        ivec2 donor_replacementGLF_dead4p = _GLF_FUZZED(ivec2(_GLF_IDENTITY(91572, clamp(91572, 91572, 91572)), -52891));
        for (donor_replacementGLF_dead4j = 0; donor_replacementGLF_dead4j < 8; donor_replacementGLF_dead4j++) {
            if (GLF_dead4map[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4j * 2 + GLF_dead2data * 2 * 16, 256)] == 0) {
                donor_replacementGLF_dead4p.x = donor_replacementGLF_dead4j * 2;
                donor_replacementGLF_dead4p.y = GLF_dead2data * _GLF_IDENTITY(2, _GLF_IDENTITY((2), 1 * (_GLF_IDENTITY((2), (true ? _GLF_IDENTITY((2), max((2), (2))) : _GLF_FUZZED(87719))))) + int(_GLF_ZERO(0.0, injectionSwitch.x)));
                donor_replacementGLF_dead4canwalk = true;
            }
        }
    }
    GLF_dead2tree.leftIndex = -1;
    _GLF_IDENTITY(GLF_dead2tree.rightIndex = -1, (GLF_dead2tree.rightIndex = -1) << _GLF_IDENTITY(0, (0) >> 0));
}

struct GLF_dead1QuicksortObject {
    int numbers[10];
};

GLF_dead1QuicksortObject GLF_dead1obj = GLF_dead1QuicksortObject(int[10](_GLF_IDENTITY(0, (0) >> (0 | 0)), 0, 0, 0, 0, 0, 0, 0, _GLF_IDENTITY(0, (0) | (0)), 0));
layout(set = 0, binding = 4) uniform sampler2D GLF_dead0tex;
const float GLF_dead0weights[9] = float[9](1.0, 0.5, -0.25, 0.5, 1.0, -0.5, -0.25, -0.5, -1.0);
layout(location = 0) out vec4 _GLF_color;
layout(set = 0, binding = 0) uniform sampler2D tex;

float ReallyApproxNormalizedAtan2(vec2 v) {
    float pi2 = 1.0 / (_GLF_IDENTITY(355.0 / 113.0, min(355.0 / 113.0, _GLF_IDENTITY(355.0 / 113.0, float(mat2x3(355.0 / 113.0, 0.0, _GLF_ONE(1.0, injectionSwitch.y), 0.0, 1.0, 0.0))))));
    if (_GLF_DEAD(_GLF_IDENTITY(false, (false) || _GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))))) {
        int donor_replacementGLF_dead15i = _GLF_FUZZED(-80489);
        if (GLF_dead7_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead15i, 4)] >= 1.0) {
            GLF_dead7_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead15i, 4)] = GLF_dead7_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead15i, 4)] * GLF_dead7_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead15i, 4)];
        }
    }
    if (_GLF_DEAD(false)) {
        _GLF_color = (dFdyFine((vec3(9146.7918, -95.51, 60.76) * mat4x3(-12.48, -0.3, 698.011, 5.6, 53.39, -4.4, 8.4, 3764.0623, -6.6, 7.3, 7895.2930, 164.395))) / 5.2);
    }
    if (length(v) < _GLF_IDENTITY(0.001, (_GLF_IDENTITY(0.001, max(0.001, _GLF_IDENTITY(0.001, float(vec2(0.001, 1.0)))))) / 1.0)) {
        return _GLF_IDENTITY(0.0, mix(float(_GLF_FUZZED(-3015.3954)), float(_GLF_IDENTITY(0.0, round(length(normalize(vec4(1.0, 1.0, 1.0, 1.0)))) * (0.0))), bool(true)));
    }
    if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
        if (_GLF_DEAD(false)) {
            if (_GLF_DEAD(_GLF_IDENTITY(false, bool(bvec4(false, true, false, _GLF_TRUE(true, (gl_FragCoord.y >= 0.0))))))) {
                int donor_replacementGLF_dead16v = _GLF_FUZZED(findMSB(53752));
                {
                    donor_replacementGLF_dead16v /= 2;
                }
            }
            _GLF_color = vec4(8.3, 984.267, 70.99, 936.053);
        }
        int donor_replacementGLF_dead10v = _GLF_FUZZED(bitfieldExtract((true ? (-96268) : 26713), 98479, bitCount(98669)));
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            _GLF_color = asinh(vec4(pi2, 3442.2130, vec2(-5.6, 67.97)));
        }
        {
            donor_replacementGLF_dead10v = 3 * donor_replacementGLF_dead10v + 1;
        }
    }
    vec2 a = abs(v);
    if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
        _GLF_color = _GLF_color;
    }
    float z;
    if (_GLF_DEAD(_GLF_FALSE(false, _GLF_IDENTITY((gl_FragCoord.y < _GLF_IDENTITY(dot(vec3(0.0, 0.0, 0.0), vec3(1.0, 1.0, 1.0)), dot(vec3(0.0, 0.0, _GLF_IDENTITY(0.0, (0.0) + length(vec4(0.0, 0.0, 0.0, 0.0)))), vec3(1.0, 1.0, 1.0)))), false || ((gl_FragCoord.y < _GLF_IDENTITY(dot(vec3(0.0, 0.0, 0.0), vec3(1.0, 1.0, 1.0)), dot(vec3(0.0, 0.0, _GLF_IDENTITY(0.0, (0.0) + length(vec4(0.0, 0.0, 0.0, 0.0)))), vec3(1.0, 1.0, 1.0))))))))) {
        vec2 donor_replacementGLF_dead0coord = _GLF_FUZZED(injectionSwitch);
        for (int GLF_dead0i = _GLF_IDENTITY(0, (0) | 0); GLF_dead0i < 3; GLF_dead0i++) {
            for (int GLF_dead0j = 0; GLF_dead0j < 3; GLF_dead0j++) {
                _GLF_color += texture(GLF_dead0tex, donor_replacementGLF_dead0coord + vec2(float(GLF_dead0i - 1) * z, float(GLF_dead0j - 1) * z)) * GLF_dead0weights[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead0i * 3 + GLF_dead0j, 9)];
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < _GLF_IDENTITY(dot(vec2(1.0, 1.0), vec2(0.0, 0.0)), dot(vec2(1.0, 1.0), vec2(0.0, 0.0))))))) {
                    {
                        ;
                    }
                }
            }
        }
        if (_GLF_DEAD(false)) {
            vec2 donor_replacementGLF_dead11coord = _GLF_FUZZED(donor_replacementGLF_dead0coord);
            {
                GLF_dead7_GLF_color = texture(GLF_dead11tex, donor_replacementGLF_dead11coord);
            }
        }
        if (_GLF_DEAD(false)) {
            vec2 donor_replacementGLF_dead7coord = _GLF_FUZZED(vec2(24.46, 3.3));
            {
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    int donor_replacementGLF_dead15i = _GLF_FUZZED((clamp(26997, 91704, -3935) | 13700));
                    if (GLF_dead7_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead15i, 4)] >= 1.0) {
                        GLF_dead7_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead15i, 4)] = GLF_dead7_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead15i, 4)] * GLF_dead7_GLF_color[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead15i, 4)];
                    }
                }
                uvec2 GLF_dead7icoord = uvec2(((donor_replacementGLF_dead7coord - vec2(0.4, _GLF_IDENTITY(0.0, (0.0) + 0.0))) * vec2(1.0 / 0.4, 1.0 / 0.6)) * 256.0);
                uint GLF_dead7res1 = uint(((GLF_dead7icoord.x * _GLF_IDENTITY(GLF_dead7icoord, (GLF_dead7icoord) | (GLF_dead7icoord)).y) >> (GLF_dead7icoord.x & 31u)) & 0xffffffffu);
                uint GLF_dead7res2 = uint((_GLF_IDENTITY((GLF_dead7icoord.x * GLF_dead7icoord.y) << (_GLF_IDENTITY(GLF_dead7icoord.x & 31u, min(_GLF_IDENTITY(GLF_dead7icoord.x & 31u, uint(uvec2(_GLF_IDENTITY(GLF_dead7icoord.x & 31u, clamp(GLF_dead7icoord.x & 31u, GLF_dead7icoord.x & 31u, GLF_dead7icoord.x & 31u)), 1u))), _GLF_IDENTITY(GLF_dead7icoord.x & 31u, ~(~(GLF_dead7icoord.x & 31u)))))), ((GLF_dead7icoord.x * GLF_dead7icoord.y) << (_GLF_IDENTITY(GLF_dead7icoord.x & 31u, min(_GLF_IDENTITY(GLF_dead7icoord.x & 31u, uint(uvec2(_GLF_IDENTITY(GLF_dead7icoord.x & 31u, clamp(GLF_dead7icoord.x & 31u, GLF_dead7icoord.x & _GLF_IDENTITY(31u, clamp(_GLF_IDENTITY(31u, (31u) / 1u), _GLF_IDENTITY(31u, (31u) | (31u)), _GLF_IDENTITY(31u, (true ? _GLF_IDENTITY(31u, (31u) | (31u)) : _GLF_FUZZED(GLF_dead7res1))))), GLF_dead7icoord.x & 31u)), 1u))), _GLF_IDENTITY(GLF_dead7icoord.x & 31u, ~(~(GLF_dead7icoord.x & 31u))))))) - 0u)) & 0xffffffffu);
                float GLF_dead7res = float(((GLF_dead7res2 & 0x80000000u) != 0u ? 1u : _GLF_IDENTITY(0u, clamp(0u, 0u, _GLF_IDENTITY(0u, (0u) + 0u)))) ^ ((GLF_dead7res1 & 1u) != 0u ? 1u : 0u));
                GLF_dead7_GLF_color = vec4(GLF_dead7res, GLF_dead7res, GLF_dead7res, 1.0);
            }
        }
    }
    if (a.y > a.x) {
        _GLF_IDENTITY(z = a.x / a.y, _GLF_IDENTITY((z = a.x / a.y) / 1.0, ((z = a.x / a.y) / 1.0) + _GLF_IDENTITY(dot(vec2(0.0, 0.0), vec2(1.0, 1.0)), dot(vec2(0.0, 0.0), vec2(1.0, 1.0)))));
        if (_GLF_DEAD(false)) {
            int donor_replacementGLF_dead8i = _GLF_FUZZED(bitfieldInsert(21668, -73565, 12488, 67677));
            int donor_replacementGLF_dead8j = _GLF_FUZZED(19966);
            int donor_replacementGLF_dead8pivot = _GLF_FUZZED(findLSB(abs(-4203)));
            if (GLF_dead8obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead8j, 10)] <= donor_replacementGLF_dead8pivot) {
                donor_replacementGLF_dead8i++;
                GLF_dead8swap(donor_replacementGLF_dead8i, _GLF_IDENTITY(donor_replacementGLF_dead8j, 0 | (donor_replacementGLF_dead8j)));
            }
        }
    } else {
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < log(1.0))))) {
                bool donor_replacementGLF_dead12canwalk = _GLF_FUZZED(false);
                int donor_replacementGLF_dead12i = _GLF_FUZZED(int((mat2x4(-2.5, -3547.3955, 9.1, -4532.4713, 4907.5412, 532.640, -7.0, 422.833) != mat2x4(8.5, 9952.8725, 998.420, 1.7, -7458.9892, 24.14, 96.75, 1.6))));
                int donor_replacementGLF_dead12j = _GLF_FUZZED((ivec3(-58866, -18827, -89140)).y);
                ivec2 donor_replacementGLF_dead12p = _GLF_FUZZED(ivec2(-10638, 83609));
                if (_GLF_DEAD(false)) {
                    int donor_replacementGLF_dead15i = _GLF_FUZZED(bitfieldReverse(donor_replacementGLF_dead12j));
                    {
                        if (mod(float(donor_replacementGLF_dead15i), pi2) <= 0.01) {
                            z += 0.2;
                        }
                        if (float(donor_replacementGLF_dead15i) >= z) {
                            return z;
                        }
                    }
                }
                for (donor_replacementGLF_dead12j = 0; donor_replacementGLF_dead12j < 8; donor_replacementGLF_dead12j++) {
                    if (GLF_dead12map[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead12j * 2 + donor_replacementGLF_dead12i * 2 * 16, 256)] == 0) {
                        donor_replacementGLF_dead12p.x = donor_replacementGLF_dead12j * 2;
                        donor_replacementGLF_dead12p.y = donor_replacementGLF_dead12i * 2;
                        donor_replacementGLF_dead12canwalk = true;
                    }
                }
            }
            int donor_replacementGLF_dead0v = _GLF_FUZZED(clamp(-_GLF_IDENTITY(11580, (11580) - 0), -80694, -42989));
            if (_GLF_DEAD(false)) {
                _GLF_color = step(_GLF_color, _GLF_color);
                if (_GLF_DEAD(false)) {
                    _GLF_color = _GLF_color;
                }
            }
            {
                donor_replacementGLF_dead0v = 3 * donor_replacementGLF_dead0v + 1;
            }
            if (_GLF_DEAD(false)) {
                {
                    GLF_dead5obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead0v, 10)] = (10 - donor_replacementGLF_dead0v) * int(GLF_dead5injectionSwitch.y);
                }
            }
        }
        z = a.y / _GLF_IDENTITY(a.x, clamp(_GLF_IDENTITY(a.x, clamp(a.x, a.x, a.x)), a.x, a.x));
    }
    if (_GLF_DEAD(false)) {
        _GLF_color = _GLF_color;
    }
    float th = _GLF_IDENTITY((0.97 - _GLF_IDENTITY(0.19 * z, (true ? _GLF_IDENTITY(0.19 * z, (true ? (0.19 * z) : _GLF_FUZZED(63.11))) : _GLF_FUZZED(pi2))) * z) * z * pi2, (_GLF_IDENTITY(true ? ((0.97 - _GLF_IDENTITY(0.19 * z, (true ? _GLF_IDENTITY(_GLF_IDENTITY(0.19 * z, (true ? (0.19 * z) : _GLF_FUZZED(63.11))), (_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)) ? _GLF_IDENTITY(0.19 * z, (true ? (0.19 * z) : _GLF_FUZZED(63.11))) : _GLF_FUZZED(8.7))) : _GLF_FUZZED(pi2))) * z) * z * pi2) : _GLF_FUZZED(pi2), _GLF_IDENTITY(float(_GLF_IDENTITY(vec2(_GLF_IDENTITY(true ? ((0.97 - _GLF_IDENTITY(0.19 * z, (true ? _GLF_IDENTITY(_GLF_IDENTITY(0.19 * z, (true ? (0.19 * z) : _GLF_FUZZED(63.11))), (_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)) ? _GLF_IDENTITY(0.19 * z, (true ? (0.19 * z) : _GLF_FUZZED(63.11))) : _GLF_FUZZED(8.7))) : _GLF_FUZZED(pi2))) * z) * z * pi2) : _GLF_FUZZED(pi2), min(true ? ((0.97 - _GLF_IDENTITY(0.19 * z, (true ? _GLF_IDENTITY(_GLF_IDENTITY(0.19 * z, (true ? (0.19 * z) : _GLF_FUZZED(63.11))), (_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)) ? _GLF_IDENTITY(0.19 * z, (true ? (0.19 * z) : _GLF_FUZZED(63.11))) : _GLF_FUZZED(8.7))) : _GLF_FUZZED(pi2))) * z) * z * pi2) : _GLF_FUZZED(pi2), true ? ((0.97 - _GLF_IDENTITY(0.19 * z, (true ? _GLF_IDENTITY(_GLF_IDENTITY(0.19 * z, (true ? (0.19 * z) : _GLF_FUZZED(63.11))), (_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)) ? _GLF_IDENTITY(0.19 * z, (true ? (0.19 * z) : _GLF_FUZZED(63.11))) : _GLF_FUZZED(8.7))) : _GLF_FUZZED(pi2))) * z) * z * pi2) : _GLF_FUZZED(pi2))), 1.0), max(vec2(_GLF_IDENTITY(true ? ((0.97 - _GLF_IDENTITY(0.19 * z, (true ? _GLF_IDENTITY(_GLF_IDENTITY(0.19 * z, (true ? (0.19 * z) : _GLF_FUZZED(63.11))), (_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)) ? _GLF_IDENTITY(0.19 * z, (true ? (0.19 * z) : _GLF_FUZZED(63.11))) : _GLF_FUZZED(8.7))) : _GLF_FUZZED(pi2))) * z) * z * pi2) : _GLF_FUZZED(pi2), min(true ? ((0.97 - _GLF_IDENTITY(0.19 * z, (true ? _GLF_IDENTITY(_GLF_IDENTITY(0.19 * z, (true ? (0.19 * z) : _GLF_FUZZED(63.11))), (_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)) ? _GLF_IDENTITY(0.19 * z, (true ? (0.19 * z) : _GLF_FUZZED(63.11))) : _GLF_FUZZED(8.7))) : _GLF_FUZZED(pi2))) * z) * z * pi2) : _GLF_FUZZED(pi2), true ? ((0.97 - _GLF_IDENTITY(0.19 * z, (true ? _GLF_IDENTITY(_GLF_IDENTITY(0.19 * z, (true ? (0.19 * z) : _GLF_FUZZED(63.11))), (_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)) ? _GLF_IDENTITY(0.19 * z, (true ? (0.19 * z) : _GLF_FUZZED(63.11))) : _GLF_FUZZED(8.7))) : _GLF_FUZZED(pi2))) * z) * z * pi2) : _GLF_FUZZED(pi2))), 1.0), vec2(_GLF_IDENTITY(true ? ((0.97 - _GLF_IDENTITY(0.19 * z, (true ? _GLF_IDENTITY(_GLF_IDENTITY(0.19 * z, (true ? (0.19 * z) : _GLF_FUZZED(63.11))), (_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)) ? _GLF_IDENTITY(0.19 * z, (true ? (0.19 * z) : _GLF_FUZZED(63.11))) : _GLF_FUZZED(8.7))) : _GLF_FUZZED(pi2))) * z) * z * pi2) : _GLF_FUZZED(pi2), min(true ? ((0.97 - _GLF_IDENTITY(0.19 * z, (true ? _GLF_IDENTITY(_GLF_IDENTITY(0.19 * z, (true ? (0.19 * z) : _GLF_FUZZED(63.11))), (_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)) ? _GLF_IDENTITY(0.19 * z, (true ? (0.19 * z) : _GLF_FUZZED(63.11))) : _GLF_FUZZED(8.7))) : _GLF_FUZZED(pi2))) * z) * z * pi2) : _GLF_FUZZED(pi2), true ? ((0.97 - _GLF_IDENTITY(0.19 * z, (true ? _GLF_IDENTITY(_GLF_IDENTITY(0.19 * z, (true ? (0.19 * z) : _GLF_FUZZED(63.11))), (_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)) ? _GLF_IDENTITY(0.19 * z, (true ? (0.19 * z) : _GLF_FUZZED(63.11))) : _GLF_FUZZED(8.7))) : _GLF_FUZZED(pi2))) * z) * z * pi2) : _GLF_FUZZED(pi2))), 1.0)))), max(float(_GLF_IDENTITY(vec2(_GLF_IDENTITY(true ? ((0.97 - _GLF_IDENTITY(0.19 * z, (true ? _GLF_IDENTITY(_GLF_IDENTITY(0.19 * z, (true ? (0.19 * z) : _GLF_FUZZED(63.11))), (_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)) ? _GLF_IDENTITY(0.19 * z, (true ? (0.19 * z) : _GLF_FUZZED(63.11))) : _GLF_FUZZED(8.7))) : _GLF_FUZZED(pi2))) * z) * z * pi2) : _GLF_FUZZED(pi2), min(true ? ((0.97 - _GLF_IDENTITY(0.19 * z, (true ? _GLF_IDENTITY(_GLF_IDENTITY(0.19 * z, (true ? (0.19 * z) : _GLF_FUZZED(63.11))), (_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)) ? _GLF_IDENTITY(0.19 * z, (true ? (0.19 * z) : _GLF_FUZZED(63.11))) : _GLF_FUZZED(8.7))) : _GLF_FUZZED(pi2))) * z) * z * pi2) : _GLF_FUZZED(pi2), true ? ((0.97 - _GLF_IDENTITY(0.19 * z, (true ? _GLF_IDENTITY(_GLF_IDENTITY(0.19 * z, (true ? (0.19 * z) : _GLF_FUZZED(63.11))), (_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)) ? _GLF_IDENTITY(0.19 * z, (true ? (0.19 * z) : _GLF_FUZZED(63.11))) : _GLF_FUZZED(8.7))) : _GLF_FUZZED(pi2))) * z) * z * pi2) : _GLF_FUZZED(pi2))), 1.0), max(vec2(_GLF_IDENTITY(true ? ((0.97 - _GLF_IDENTITY(0.19 * z, (true ? _GLF_IDENTITY(_GLF_IDENTITY(0.19 * z, (true ? (0.19 * z) : _GLF_FUZZED(63.11))), (_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)) ? _GLF_IDENTITY(0.19 * z, (true ? (0.19 * z) : _GLF_FUZZED(63.11))) : _GLF_FUZZED(8.7))) : _GLF_FUZZED(pi2))) * z) * z * pi2) : _GLF_FUZZED(pi2), min(true ? ((0.97 - _GLF_IDENTITY(0.19 * z, (true ? _GLF_IDENTITY(_GLF_IDENTITY(0.19 * z, (true ? (0.19 * z) : _GLF_FUZZED(63.11))), (_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)) ? _GLF_IDENTITY(0.19 * z, (true ? (0.19 * z) : _GLF_FUZZED(63.11))) : _GLF_FUZZED(8.7))) : _GLF_FUZZED(pi2))) * z) * z * pi2) : _GLF_FUZZED(pi2), true ? (_GLF_IDENTITY((0.97 - _GLF_IDENTITY(0.19 * z, _GLF_IDENTITY((true ? _GLF_IDENTITY(_GLF_IDENTITY(0.19 * z, (true ? (0.19 * z) : _GLF_FUZZED(63.11))), (_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)) ? _GLF_IDENTITY(0.19 * z, (true ? (0.19 * z) : _GLF_FUZZED(63.11))) : _GLF_FUZZED(8.7))) : _GLF_FUZZED(pi2)), clamp((true ? _GLF_IDENTITY(_GLF_IDENTITY(0.19 * z, (true ? (0.19 * z) : _GLF_FUZZED(63.11))), (_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)) ? _GLF_IDENTITY(0.19 * z, (true ? (0.19 * z) : _GLF_FUZZED(63.11))) : _GLF_FUZZED(8.7))) : _GLF_FUZZED(pi2)), (true ? _GLF_IDENTITY(_GLF_IDENTITY(0.19 * z, (true ? (0.19 * z) : _GLF_FUZZED(63.11))), (_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)) ? _GLF_IDENTITY(0.19 * z, (true ? (0.19 * z) : _GLF_FUZZED(63.11))) : _GLF_FUZZED(8.7))) : _GLF_FUZZED(pi2)), _GLF_IDENTITY((true ? _GLF_IDENTITY(_GLF_IDENTITY(0.19 * z, (true ? (0.19 * z) : _GLF_FUZZED(63.11))), (_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)) ? _GLF_IDENTITY(0.19 * z, (true ? (0.19 * z) : _GLF_FUZZED(63.11))) : _GLF_FUZZED(8.7))) : _GLF_FUZZED(pi2)), _GLF_IDENTITY(float(mat4x3((true ? _GLF_IDENTITY(_GLF_IDENTITY(0.19 * z, (true ? (0.19 * z) : _GLF_FUZZED(63.11))), (_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)) ? _GLF_IDENTITY(0.19 * z, (true ? (0.19 * z) : _GLF_FUZZED(63.11))) : _GLF_FUZZED(8.7))) : _GLF_FUZZED(pi2)), 0.0, 1.0, 1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 1.0)), mix(float(float(mat4x3((true ? _GLF_IDENTITY(_GLF_IDENTITY(0.19 * z, (true ? (0.19 * z) : _GLF_FUZZED(63.11))), (_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)) ? _GLF_IDENTITY(0.19 * z, (true ? (0.19 * z) : _GLF_FUZZED(63.11))) : _GLF_FUZZED(8.7))) : _GLF_FUZZED(pi2)), 0.0, 1.0, 1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 1.0))), float(_GLF_FUZZED(7.2)), bool(false))))))) * z) * z * pi2, ((0.97 - _GLF_IDENTITY(0.19 * z, _GLF_IDENTITY((true ? _GLF_IDENTITY(_GLF_IDENTITY(0.19 * z, (true ? (0.19 * z) : _GLF_FUZZED(63.11))), (_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)) ? _GLF_IDENTITY(0.19 * z, (true ? (0.19 * z) : _GLF_FUZZED(63.11))) : _GLF_FUZZED(8.7))) : _GLF_FUZZED(pi2)), clamp((true ? _GLF_IDENTITY(_GLF_IDENTITY(0.19 * z, (true ? (0.19 * z) : _GLF_FUZZED(63.11))), (_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)) ? _GLF_IDENTITY(0.19 * z, (true ? (0.19 * z) : _GLF_FUZZED(63.11))) : _GLF_FUZZED(8.7))) : _GLF_FUZZED(pi2)), (true ? _GLF_IDENTITY(_GLF_IDENTITY(0.19 * z, (true ? (0.19 * z) : _GLF_FUZZED(63.11))), (_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)) ? _GLF_IDENTITY(0.19 * z, (true ? (0.19 * z) : _GLF_FUZZED(63.11))) : _GLF_FUZZED(8.7))) : _GLF_FUZZED(pi2)), _GLF_IDENTITY((true ? _GLF_IDENTITY(_GLF_IDENTITY(0.19 * z, (true ? (0.19 * z) : _GLF_FUZZED(63.11))), (_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)) ? _GLF_IDENTITY(0.19 * z, (true ? (0.19 * z) : _GLF_FUZZED(63.11))) : _GLF_FUZZED(8.7))) : _GLF_FUZZED(pi2)), _GLF_IDENTITY(float(mat4x3((true ? _GLF_IDENTITY(_GLF_IDENTITY(0.19 * z, (true ? (0.19 * z) : _GLF_FUZZED(63.11))), (_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)) ? _GLF_IDENTITY(0.19 * z, (true ? (0.19 * z) : _GLF_FUZZED(63.11))) : _GLF_FUZZED(8.7))) : _GLF_FUZZED(pi2)), 0.0, 1.0, 1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 1.0)), mix(float(float(mat4x3((true ? _GLF_IDENTITY(_GLF_IDENTITY(0.19 * z, (true ? (0.19 * z) : _GLF_FUZZED(63.11))), (_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)) ? _GLF_IDENTITY(0.19 * z, (true ? (0.19 * z) : _GLF_FUZZED(63.11))) : _GLF_FUZZED(8.7))) : _GLF_FUZZED(pi2)), 0.0, 1.0, 1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 1.0))), float(_GLF_FUZZED(7.2)), bool(false))))))) * z) * z * pi2) - 0.0)) : _GLF_FUZZED(pi2))), 1.0), vec2(_GLF_IDENTITY(true ? ((0.97 - _GLF_IDENTITY(0.19 * z, (true ? _GLF_IDENTITY(_GLF_IDENTITY(0.19 * z, (true ? (0.19 * z) : _GLF_FUZZED(63.11))), (_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)) ? _GLF_IDENTITY(0.19 * z, (true ? (0.19 * z) : _GLF_FUZZED(63.11))) : _GLF_FUZZED(8.7))) : _GLF_FUZZED(pi2))) * z) * z * pi2) : _GLF_FUZZED(pi2), min(true ? ((0.97 - _GLF_IDENTITY(0.19 * z, (true ? _GLF_IDENTITY(_GLF_IDENTITY(0.19 * z, (true ? (0.19 * z) : _GLF_FUZZED(63.11))), (_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)) ? _GLF_IDENTITY(0.19 * z, (true ? (0.19 * z) : _GLF_FUZZED(63.11))) : _GLF_FUZZED(8.7))) : _GLF_FUZZED(pi2))) * z) * z * pi2) : _GLF_FUZZED(pi2), true ? ((0.97 - _GLF_IDENTITY(_GLF_IDENTITY(0.19 * z, (true ? _GLF_IDENTITY(_GLF_IDENTITY(0.19 * z, (true ? (0.19 * z) : _GLF_FUZZED(63.11))), _GLF_IDENTITY((_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)) ? _GLF_IDENTITY(0.19 * z, (true ? (0.19 * z) : _GLF_FUZZED(63.11))) : _GLF_FUZZED(8.7)), (_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)) ? _GLF_IDENTITY((_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)) ? _GLF_IDENTITY(0.19 * z, (true ? (0.19 * z) : _GLF_FUZZED(63.11))) : _GLF_FUZZED(8.7)), max((_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)) ? _GLF_IDENTITY(0.19 * z, (true ? (0.19 * z) : _GLF_FUZZED(63.11))) : _GLF_FUZZED(8.7)), (_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)) ? _GLF_IDENTITY(0.19 * z, (true ? (0.19 * z) : _GLF_FUZZED(63.11))) : _GLF_FUZZED(8.7)))) : _GLF_FUZZED(pi2)))) : _GLF_FUZZED(pi2))) * z, mix(float(_GLF_FUZZED(6.0)), float(_GLF_IDENTITY(0.19 * z, (true ? _GLF_IDENTITY(_GLF_IDENTITY(0.19 * z, (true ? (0.19 * z) : _GLF_FUZZED(63.11))), _GLF_IDENTITY((_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)) ? _GLF_IDENTITY(0.19 * z, (true ? (0.19 * z) : _GLF_FUZZED(63.11))) : _GLF_FUZZED(8.7)), (_GLF_TRUE(true, (gl_FragCoord.x >= 0.0)) ? _GLF_IDENTITY((_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)) ? _GLF_IDENTITY(0.19 * z, (true ? (0.19 * z) : _GLF_FUZZED(63.11))) : _GLF_FUZZED(8.7)), max((_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)) ? _GLF_IDENTITY(0.19 * z, (true ? (0.19 * z) : _GLF_FUZZED(63.11))) : _GLF_FUZZED(8.7)), (_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)) ? _GLF_IDENTITY(0.19 * z, (true ? (0.19 * z) : _GLF_FUZZED(63.11))) : _GLF_FUZZED(8.7)))) : _GLF_FUZZED(pi2)))) : _GLF_FUZZED(pi2))) * z), bool(true)))) * z * pi2) : _GLF_FUZZED(pi2))), 1.0)))), float(_GLF_IDENTITY(vec2(_GLF_IDENTITY(true ? ((0.97 - _GLF_IDENTITY(0.19 * z, (true ? _GLF_IDENTITY(_GLF_IDENTITY(0.19 * z, (true ? (0.19 * z) : _GLF_FUZZED(63.11))), (_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)) ? _GLF_IDENTITY(0.19 * z, (true ? (0.19 * z) : _GLF_FUZZED(63.11))) : _GLF_FUZZED(8.7))) : _GLF_FUZZED(pi2))) * z) * z * pi2) : _GLF_FUZZED(pi2), min(true ? ((0.97 - _GLF_IDENTITY(0.19 * z, (true ? _GLF_IDENTITY(_GLF_IDENTITY(0.19 * z, (true ? (0.19 * z) : _GLF_FUZZED(63.11))), (_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)) ? _GLF_IDENTITY(0.19 * z, (true ? (0.19 * z) : _GLF_FUZZED(63.11))) : _GLF_FUZZED(8.7))) : _GLF_FUZZED(pi2))) * z) * z * pi2) : _GLF_FUZZED(pi2), true ? ((0.97 - _GLF_IDENTITY(0.19 * z, (true ? _GLF_IDENTITY(_GLF_IDENTITY(0.19 * z, (true ? (0.19 * z) : _GLF_FUZZED(63.11))), (_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)) ? _GLF_IDENTITY(0.19 * z, (true ? (0.19 * z) : _GLF_FUZZED(63.11))) : _GLF_FUZZED(8.7))) : _GLF_FUZZED(pi2))) * z) * z * pi2) : _GLF_FUZZED(pi2))), 1.0), max(vec2(_GLF_IDENTITY(true ? ((0.97 - _GLF_IDENTITY(0.19 * z, (true ? _GLF_IDENTITY(_GLF_IDENTITY(0.19 * z, (true ? (0.19 * z) : _GLF_FUZZED(63.11))), (_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)) ? _GLF_IDENTITY(0.19 * z, (true ? (0.19 * z) : _GLF_FUZZED(63.11))) : _GLF_FUZZED(8.7))) : _GLF_FUZZED(pi2))) * z) * z * pi2) : _GLF_FUZZED(pi2), min(true ? ((0.97 - _GLF_IDENTITY(0.19 * z, (true ? _GLF_IDENTITY(_GLF_IDENTITY(0.19 * z, (true ? (0.19 * z) : _GLF_FUZZED(63.11))), (_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)) ? _GLF_IDENTITY(0.19 * z, (true ? (0.19 * z) : _GLF_FUZZED(63.11))) : _GLF_FUZZED(8.7))) : _GLF_FUZZED(pi2))) * z) * z * pi2) : _GLF_FUZZED(pi2), true ? ((0.97 - _GLF_IDENTITY(0.19 * z, (true ? _GLF_IDENTITY(_GLF_IDENTITY(0.19 * z, (true ? (0.19 * z) : _GLF_FUZZED(63.11))), (_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)) ? _GLF_IDENTITY(0.19 * z, _GLF_IDENTITY((true ? (_GLF_IDENTITY(0.19, (false ? _GLF_FUZZED((1213.5692 + z)) : 0.19)) * z) : _GLF_FUZZED(63.11)), float(mat2(_GLF_IDENTITY((true ? (_GLF_IDENTITY(0.19, (false ? _GLF_FUZZED((1213.5692 + z)) : 0.19)) * z) : _GLF_FUZZED(63.11)), ((true ? (_GLF_IDENTITY(0.19, (false ? _GLF_FUZZED((1213.5692 + z)) : 0.19)) * z) : _GLF_FUZZED(63.11))) - 0.0), sqrt(0.0), 1.0, determinant(mat3(1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, length(0.0), 1.0)))))) : _GLF_FUZZED(8.7))) : _GLF_FUZZED(pi2))) * z) * z * pi2) : _GLF_FUZZED(pi2))), 1.0), vec2(_GLF_IDENTITY(true ? ((0.97 - _GLF_IDENTITY(0.19 * z, (true ? _GLF_IDENTITY(_GLF_IDENTITY(0.19 * z, (true ? (0.19 * z) : _GLF_FUZZED(63.11))), (_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)) ? _GLF_IDENTITY(0.19 * z, (true ? (0.19 * z) : _GLF_FUZZED(63.11))) : _GLF_FUZZED(8.7))) : _GLF_FUZZED(pi2))) * z) * z * pi2) : _GLF_FUZZED(pi2), min(true ? ((0.97 - _GLF_IDENTITY(0.19 * z, (true ? _GLF_IDENTITY(_GLF_IDENTITY(0.19 * z, (true ? (0.19 * z) : _GLF_FUZZED(63.11))), (_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)) ? _GLF_IDENTITY(0.19 * z, (true ? (0.19 * z) : _GLF_FUZZED(63.11))) : _GLF_FUZZED(8.7))) : _GLF_FUZZED(pi2))) * z) * z * pi2) : _GLF_FUZZED(pi2), true ? ((0.97 - _GLF_IDENTITY(0.19 * z, (true ? _GLF_IDENTITY(_GLF_IDENTITY(0.19 * z, (true ? (0.19 * z) : _GLF_FUZZED(63.11))), (_GLF_TRUE(true, (gl_FragCoord.y >= 0.0)) ? _GLF_IDENTITY(0.19 * z, (true ? (0.19 * z) : _GLF_FUZZED(63.11))) : _GLF_FUZZED(8.7))) : _GLF_FUZZED(pi2))) * z) * z * pi2) : _GLF_FUZZED(pi2))), 1.0)))))))));
    if (_GLF_DEAD(false)) {
        _GLF_color = mod(GLF_dead4_GLF_color, GLF_dead7_GLF_color);
    }
    if (_GLF_IDENTITY(a.y, _GLF_IDENTITY(0.0 + (_GLF_IDENTITY(a.y, min(a.y, a.y))), clamp(0.0 + (_GLF_IDENTITY(a.y, min(a.y, a.y))), 0.0 + (_GLF_IDENTITY(a.y, min(a.y, a.y))), 0.0 + (_GLF_IDENTITY(a.y, min(a.y, a.y)))))) < a.x) {
        if (_GLF_DEAD(_GLF_IDENTITY(false, !(!(false))))) {
            _GLF_color = GLF_dead4_GLF_color;
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
            vec3 donor_replacementGLF_dead1color = _GLF_FUZZED(vec3(8.7, -2167.0311, -6222.3318));
            if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
                if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.y < 0.0)))) {
                    _GLF_color = acosh(_GLF_color);
                }
                ivec2 donor_replacementGLF_dead4ipos = _GLF_FUZZED(ivec2(28484, -11894));
                if (GLF_dead4map[_GLF_IDENTITY(_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4ipos.y * 16 + donor_replacementGLF_dead4ipos.x, 256), (_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead4ipos.y * 16 + donor_replacementGLF_dead4ipos.x, 256)) - 0)] == 1) {
                    if (_GLF_DEAD(false)) {
                        _GLF_color = clamp(GLF_dead4_GLF_color, vec4(-883.738, 3311.5701, 6.9, _GLF_IDENTITY(9.2, (_GLF_IDENTITY(9.2, (true ? 9.2 : _GLF_FUZZED(pi2)))) - 0.0)), _GLF_color);
                    }
                    GLF_dead4_GLF_color = vec4(1.0, 1.0, 1.0, 1.0);
                    ;
                }
            }
            {
                donor_replacementGLF_dead1color.y += float(GLF_dead1obj.numbers[2]);
            }
            if (_GLF_DEAD(false)) {
                {
                    int GLF_dead5count = int(GLF_dead5injectionSwitch.x);
                    do {
                        _GLF_IDENTITY(donor_replacementGLF_dead1color -= GLF_dead5palette(vec3(float(GLF_dead5obj.numbers[4]) * 0.1), trunc(vec3(0.1)), vec3(float(GLF_dead5obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_dead5injectionSwitch.y), 10)]) * 0.1), vec3(GLF_dead5injectionSwitch.x, float(GLF_dead5obj.numbers[2]) * 0.1, float(GLF_dead5obj.numbers[8]) * 0.1)), (true ? (donor_replacementGLF_dead1color -= GLF_dead5palette(vec3(float(GLF_dead5obj.numbers[4]) * 0.1), trunc(vec3(0.1)), vec3(float(GLF_dead5obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_dead5injectionSwitch.y), 10)]) * 0.1), vec3(GLF_dead5injectionSwitch.x, _GLF_IDENTITY(float(GLF_dead5obj.numbers[2]) * 0.1, float(mat2(_GLF_IDENTITY(float(GLF_dead5obj.numbers[2]) * 0.1, float(float(float(GLF_dead5obj.numbers[2]) * 0.1))), 1.0, abs(0.0), 0.0))), float(GLF_dead5obj.numbers[8]) * 0.1))) : _GLF_FUZZED(vec3(-7.1, -7.3, -552.516))));
                        GLF_dead5count++;
                    } while (GLF_dead5count != GLF_dead5obj.numbers[1]);
                    a += vec2(_GLF_IDENTITY(GLF_dead5count + int(GLF_dead5injectionSwitch.y), min(GLF_dead5count + int(GLF_dead5injectionSwitch.y), GLF_dead5count + int(GLF_dead5injectionSwitch.y))), GLF_dead5count + int(GLF_dead5injectionSwitch.x));
                }
            }
            if (_GLF_DEAD(false)) {
                _GLF_color = GLF_dead7_GLF_color;
            }
        }
        th = _GLF_IDENTITY(0.5 - th, 0.0 + (_GLF_IDENTITY(0.5 - th, float(_GLF_IDENTITY(mat2(0.5 - th, 1.0, 0.0, 0.0), (mat2(0.5 - th, 1.0, 0.0, 0.0)) * mat2(1.0))))));
    }
    if (_GLF_IDENTITY(v.x, min(_GLF_IDENTITY(v.x, mix(float(v.x), float(_GLF_FUZZED(188.908)), bool(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y))))), _GLF_IDENTITY(v.x, clamp(_GLF_IDENTITY(v.x, max(v.x, v.x)), v.x, _GLF_IDENTITY(v.x, clamp(v.x, v.x, v.x)))))) < 0.0) {
        th = 1.0 - th;
        if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
            int donor_replacementGLF_dead2baseIndex = _GLF_IDENTITY(_GLF_FUZZED(findLSB(packUnorm2x16(vec2(-5102.3365, 5636.3886)))), ~(~(_GLF_FUZZED(findLSB(packUnorm2x16(vec2(-5102.3365, 5636.3886)))))));
            int donor_replacementGLF_dead2data = _GLF_FUZZED(bitfieldExtract(int(false), 10024, -47323));
            if (_GLF_DEAD(false)) {
                if ((donor_replacementGLF_dead2baseIndex & 1) == 1) {
                    donor_replacementGLF_dead2baseIndex = 3 * donor_replacementGLF_dead2baseIndex + 1;
                } else {
                    donor_replacementGLF_dead2baseIndex /= 2;
                }
            }
            int donor_replacementGLF_dead2treeIndex = _GLF_FUZZED(-6000);
            if (_GLF_IDENTITY(GLF_dead2tree[_GLF_MAKE_IN_BOUNDS_INT(_GLF_IDENTITY(donor_replacementGLF_dead2baseIndex, clamp(donor_replacementGLF_dead2baseIndex, donor_replacementGLF_dead2baseIndex, donor_replacementGLF_dead2baseIndex)), 10)].leftIndex == -1, true && (GLF_dead2tree[_GLF_MAKE_IN_BOUNDS_INT(_GLF_IDENTITY(_GLF_IDENTITY(donor_replacementGLF_dead2baseIndex, clamp(donor_replacementGLF_dead2baseIndex, donor_replacementGLF_dead2baseIndex, _GLF_IDENTITY(donor_replacementGLF_dead2baseIndex, (_GLF_IDENTITY(donor_replacementGLF_dead2baseIndex, (donor_replacementGLF_dead2baseIndex) / 1)) - (0 | 0)))), int(_GLF_IDENTITY(ivec4(_GLF_IDENTITY(donor_replacementGLF_dead2baseIndex, clamp(donor_replacementGLF_dead2baseIndex, donor_replacementGLF_dead2baseIndex, _GLF_IDENTITY(donor_replacementGLF_dead2baseIndex, (_GLF_IDENTITY(donor_replacementGLF_dead2baseIndex, (donor_replacementGLF_dead2baseIndex) / 1)) - (0 | 0)))), (0 >> _GLF_IDENTITY(int(5), int(5))), 1, 0), max(_GLF_IDENTITY(ivec4(_GLF_IDENTITY(donor_replacementGLF_dead2baseIndex, clamp(donor_replacementGLF_dead2baseIndex, donor_replacementGLF_dead2baseIndex, _GLF_IDENTITY(donor_replacementGLF_dead2baseIndex, (_GLF_IDENTITY(donor_replacementGLF_dead2baseIndex, (donor_replacementGLF_dead2baseIndex) / 1)) - (0 | 0)))), (0 >> _GLF_IDENTITY(int(5), int(5))), 1, 0), (ivec4(_GLF_IDENTITY(donor_replacementGLF_dead2baseIndex, clamp(donor_replacementGLF_dead2baseIndex, donor_replacementGLF_dead2baseIndex, _GLF_IDENTITY(donor_replacementGLF_dead2baseIndex, (_GLF_IDENTITY(donor_replacementGLF_dead2baseIndex, (donor_replacementGLF_dead2baseIndex) / 1)) - (0 | 0)))), (0 >> _GLF_IDENTITY(int(5), int(5))), 1, 0)) ^ ivec4(0, 0, 0, 0)), ivec4(_GLF_IDENTITY(donor_replacementGLF_dead2baseIndex, clamp(donor_replacementGLF_dead2baseIndex, donor_replacementGLF_dead2baseIndex, _GLF_IDENTITY(donor_replacementGLF_dead2baseIndex, (_GLF_IDENTITY(donor_replacementGLF_dead2baseIndex, (donor_replacementGLF_dead2baseIndex) / 1)) - (0 | 0)))), (0 >> _GLF_IDENTITY(int(5), int(5))), 1, 0))))), 10)].leftIndex == -1))) {
                GLF_dead2tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead2baseIndex, 10)].leftIndex = _GLF_IDENTITY(donor_replacementGLF_dead2treeIndex, clamp(donor_replacementGLF_dead2treeIndex, donor_replacementGLF_dead2treeIndex, donor_replacementGLF_dead2treeIndex));
                GLF_dead2makeTreeNode(GLF_dead2tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead2treeIndex, 10)], donor_replacementGLF_dead2data);
                ;
            } else {
                if (_GLF_DEAD(false)) {
                    {
                        ;
                    }
                }
                if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                    {
                        donor_replacementGLF_dead2data = 3 * donor_replacementGLF_dead2data + 1;
                    }
                }
                donor_replacementGLF_dead2baseIndex = GLF_dead2tree[_GLF_MAKE_IN_BOUNDS_INT(donor_replacementGLF_dead2baseIndex, 10)].leftIndex;
                if (_GLF_DEAD(false)) {
                    {
                        donor_replacementGLF_dead2baseIndex += 1;
                    }
                }
                ;
                if (_GLF_DEAD(false)) {
                    {
                        return th;
                    }
                }
            }
        }
        if (_GLF_DEAD(_GLF_FALSE(false, (gl_FragCoord.x < 0.0)))) {
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                int donor_replacementGLF_dead11i = _GLF_FUZZED(bitCount(packHalf2x16(v)));
                {
                    if (v.x > 1.0)
                        v.x -= 1.0;
                    if (v.y > 1.0)
                        v.y -= 1.0;
                    v *= 2.0;
                    donor_replacementGLF_dead11i++;
                }
            }
            _GLF_color = step(_GLF_color, ldexp(vec4(3.3, 106.551, -925.122, -7.3), ivec4(97911, 47603, 22599, 74445)));
        }
    }
    if (v.y < 0.0) {
        th = -th;
        if (_GLF_DEAD(false)) {
            if (_GLF_DEAD(false)) {
                _GLF_color = (mat4(-2.5, 7499.9526, -118.903, -4.3, -71.92, 672.633, -2.7, 2.7, 5.9, 9.7, -66.46, 9.5, 47.34, -96.04, -3.8, 32.31) * vec4(1509.2028, -5.8, -7.6, 3.5));
            }
            vec3 donor_replacementGLF_dead5color = _GLF_FUZZED((z / vec3(4.4, -75.15, -8.2)));
            if (_GLF_DEAD(false)) {
                int donor_replacementGLF_dead10count = _GLF_FUZZED(-31524);
                int donor_replacementGLF_dead10v = _GLF_FUZZED(569);
                {
                    if ((donor_replacementGLF_dead10v & 1) == 1) {
                        donor_replacementGLF_dead10v = 3 * donor_replacementGLF_dead10v + 1;
                    } else {
                        donor_replacementGLF_dead10v /= 2;
                    }
                    donor_replacementGLF_dead10count++;
                }
            }
            vec2 donor_replacementGLF_dead5grid = _GLF_FUZZED(v);
            if (v.x > (3.0 / 4.0)) {
                int GLF_dead5count = int(GLF_dead5injectionSwitch.x);
                do {
                    donor_replacementGLF_dead5color -= GLF_dead5palette(vec3(float(GLF_dead5obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_dead5injectionSwitch.y), 10)]) * 0.1), vec3(0.8), trunc(vec3(0.1)), vec3(GLF_dead5injectionSwitch.x, 0.6, float(GLF_dead5obj.numbers[_GLF_MAKE_IN_BOUNDS_INT(int(GLF_dead5injectionSwitch.x), 10)]) * 0.1));
                    if (_GLF_DEAD(_GLF_FALSE(false, (_GLF_IDENTITY(injectionSwitch.x > _GLF_IDENTITY(injectionSwitch.y, min(_GLF_IDENTITY(injectionSwitch, clamp(injectionSwitch, _GLF_IDENTITY(injectionSwitch, mix(vec2((injectionSwitch)[0], (injectionSwitch)[1]), vec2(_GLF_FUZZED(-2.0), _GLF_FUZZED(859.739)), bvec2(false, _GLF_FALSE(false, (gl_FragCoord.x < 0.0))))), _GLF_IDENTITY(injectionSwitch, clamp(injectionSwitch, _GLF_IDENTITY(injectionSwitch, (injectionSwitch) * mat2(1.0)), _GLF_IDENTITY(injectionSwitch, clamp(injectionSwitch, injectionSwitch, injectionSwitch)))))).y, injectionSwitch.y)), true && (injectionSwitch.x > _GLF_IDENTITY(injectionSwitch.y, min(_GLF_IDENTITY(injectionSwitch, clamp(injectionSwitch, _GLF_IDENTITY(injectionSwitch, mix(vec2((injectionSwitch)[0], (injectionSwitch)[1]), vec2(_GLF_FUZZED(-2.0), _GLF_FUZZED(859.739)), bvec2(false, _GLF_FALSE(false, (gl_FragCoord.x < 0.0))))), _GLF_IDENTITY(injectionSwitch, clamp(injectionSwitch, _GLF_IDENTITY(injectionSwitch, (injectionSwitch) * mat2(1.0)), _GLF_IDENTITY(injectionSwitch, clamp(injectionSwitch, injectionSwitch, injectionSwitch)))))).y, injectionSwitch.y)))))))) {
                        _GLF_color = tanh(_GLF_color);
                    }
                    GLF_dead5count++;
                } while (GLF_dead5count != GLF_dead5obj.numbers[2]);
                donor_replacementGLF_dead5grid += vec2(GLF_dead5count + GLF_dead5obj.numbers[3], GLF_dead5count + GLF_dead5obj.numbers[_GLF_IDENTITY(3, _GLF_IDENTITY((_GLF_IDENTITY(3, (3) / 1)) << 0, (_GLF_IDENTITY((_GLF_IDENTITY(3, (3) / 1)) << 0, min((_GLF_IDENTITY(3, (3) / 1)) << 0, _GLF_IDENTITY((_GLF_IDENTITY(3, (3) / 1)) << 0, (false ? _GLF_FUZZED(GLF_dead5count) : ((_GLF_IDENTITY(3, (3) / 1)) << 0)))))) | ((-72309) & 0)))]);
            }
        }
    }
    return th;
    if (_GLF_DEAD(false)) {
        vec4 donor_replacementGLF_dead15c = _GLF_FUZZED(vec4(-6581.3854, -8.2, -0.8, -426.238));
        for (int GLF_dead15i = 0; GLF_dead15i < 3; GLF_dead15i++) {
            if (donor_replacementGLF_dead15c[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15i, 4)] >= 1.0) {
                donor_replacementGLF_dead15c[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15i, 4)] = donor_replacementGLF_dead15c[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15i, 4)] * donor_replacementGLF_dead15c[_GLF_MAKE_IN_BOUNDS_INT(GLF_dead15i, 4)];
            }
        }
    }
}

vec2 polarize(vec2 coord) {
    if (_GLF_DEAD(_GLF_FALSE(false, _GLF_IDENTITY((injectionSwitch.x > injectionSwitch.y), !(!(_GLF_IDENTITY((injectionSwitch.x > injectionSwitch.y), false || ((injectionSwitch.x > injectionSwitch.y))))))))) {
        _GLF_color = vec4(-82.72, _GLF_IDENTITY(5.3, (5.3) / _GLF_ONE(1.0, injectionSwitch.y)), -865.054, -359.807);
    }
    vec2 center = coord - _GLF_IDENTITY(vec2(0.5), min(vec2(0.5), vec2(0.5)));
    if (_GLF_IDENTITY(_GLF_DEAD(_GLF_FALSE(false, _GLF_IDENTITY((_GLF_IDENTITY(gl_FragCoord, (_GLF_IDENTITY(gl_FragCoord, max(gl_FragCoord, gl_FragCoord))) + vec4(0.0, 0.0, 0.0, 0.0)).y < determinant(mat4(0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, tan(0.0), 0.0, _GLF_IDENTITY(0.0, clamp(0.0, _GLF_IDENTITY(0.0, float(mat3(0.0, 0.0, _GLF_IDENTITY(dot(vec4(0.0, 1.0, 0.0, 0.0), vec4(1.0, 0.0, 1.0, 1.0)), dot(vec4(0.0, 1.0, 0.0, 0.0), vec4(1.0, 0.0, 1.0, 1.0))), 1.0, 1.0, 0.0, 0.0, 1.0, 1.0))), _GLF_IDENTITY(0.0, min(0.0, 0.0)))), 0.0, 1.0, 0.0, sin(0.0), 0.0, 0.0))), bool(bvec4((_GLF_IDENTITY(gl_FragCoord, (_GLF_IDENTITY(gl_FragCoord, max(gl_FragCoord, gl_FragCoord))) + vec4(0.0, 0.0, 0.0, 0.0)).y < determinant(mat4(0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, tan(0.0), 0.0, _GLF_IDENTITY(0.0, clamp(0.0, _GLF_IDENTITY(0.0, float(mat3(0.0, 0.0, _GLF_IDENTITY(dot(vec4(0.0, 1.0, 0.0, 0.0), vec4(1.0, 0.0, 1.0, 1.0)), dot(vec4(0.0, 1.0, 0.0, 0.0), vec4(1.0, 0.0, 1.0, 1.0))), 1.0, 1.0, 0.0, 0.0, 1.0, 1.0))), _GLF_IDENTITY(0.0, min(0.0, 0.0)))), 0.0, 1.0, 0.0, sin(0.0), 0.0, 0.0))), true, _GLF_FALSE(false, (gl_FragCoord.y < 0.0)), false))))), !(!(_GLF_DEAD(_GLF_FALSE(false, _GLF_IDENTITY((_GLF_IDENTITY(gl_FragCoord, (_GLF_IDENTITY(gl_FragCoord, max(gl_FragCoord, gl_FragCoord))) + vec4(0.0, 0.0, 0.0, 0.0)).y < determinant(mat4(0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, tan(0.0), 0.0, _GLF_IDENTITY(0.0, clamp(0.0, _GLF_IDENTITY(0.0, float(mat3(0.0, 0.0, _GLF_IDENTITY(dot(vec4(0.0, 1.0, 0.0, 0.0), vec4(1.0, 0.0, 1.0, 1.0)), dot(vec4(0.0, 1.0, 0.0, 0.0), vec4(1.0, 0.0, 1.0, 1.0))), 1.0, 1.0, 0.0, 0.0, 1.0, 1.0))), _GLF_IDENTITY(0.0, min(0.0, 0.0)))), 0.0, 1.0, 0.0, sin(0.0), 0.0, 0.0))), bool(bvec4((_GLF_IDENTITY(gl_FragCoord, (_GLF_IDENTITY(gl_FragCoord, max(gl_FragCoord, gl_FragCoord))) + vec4(0.0, 0.0, 0.0, 0.0)).y < determinant(mat4(0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, tan(0.0), 0.0, _GLF_IDENTITY(0.0, clamp(0.0, _GLF_IDENTITY(0.0, float(mat3(0.0, 0.0, _GLF_IDENTITY(dot(vec4(0.0, 1.0, 0.0, 0.0), vec4(1.0, 0.0, 1.0, 1.0)), dot(vec4(0.0, 1.0, 0.0, 0.0), vec4(1.0, 0.0, 1.0, 1.0))), 1.0, 1.0, 0.0, 0.0, 1.0, 1.0))), _GLF_IDENTITY(0.0, min(0.0, 0.0)))), 0.0, 1.0, 0.0, sin(0.0), 0.0, 0.0))), true, _GLF_FALSE(false, (gl_FragCoord.y < 0.0)), false))))))))) {
        if (_GLF_IDENTITY(_GLF_DEAD(false), false || (_GLF_IDENTITY(_GLF_DEAD(false), bool(_GLF_IDENTITY(bvec2(_GLF_IDENTITY(_GLF_DEAD(false), (_GLF_DEAD(false)) || false), _GLF_TRUE(true, (gl_FragCoord.x >= 0.0))), bvec2(bvec2(bvec2(_GLF_IDENTITY(_GLF_DEAD(false), (_GLF_DEAD(false)) || false), _GLF_TRUE(true, _GLF_IDENTITY((gl_FragCoord.x >= 0.0), _GLF_TRUE(true, (injectionSwitch.x < injectionSwitch.y)) && ((gl_FragCoord.x >= 0.0))))))))))))) {
            _GLF_color = (433.397 * dFdxCoarse(vec4(-91.77, 75.31, -873.670, 8.9)));
        }
        float donor_replacementGLF_dead3result = _GLF_FUZZED((false ? max(floor(31.88), -79.21) : uintBitsToFloat(87001u)));
        {
            if (_GLF_DEAD(_GLF_FALSE(false, (injectionSwitch.x > injectionSwitch.y)))) {
                {
                    ;
                }
            }
            ;
        }
    }
    float dist = length(center);
    float angle = ReallyApproxNormalizedAtan2(center);
    return vec2(dist, _GLF_IDENTITY(angle, min(angle, _GLF_IDENTITY(angle, float(mat2x4(angle, 0.0, length(vec4(0.0, 0.0, 0.0, 0.0)), 0.0, 0.0, 0.0, tan(0.0), 0.0))))));
}

void main() {
    if (_GLF_DEAD(false)) {
        vec3 donor_replacementGLF_dead1color = _GLF_FUZZED((vec3(-9201.6680, _GLF_IDENTITY(-19.62, clamp(-19.62, _GLF_IDENTITY(-19.62, min(-19.62, -19.62)), -19.62)), 0.7) - fract(2406.2311)).bbb);
        {
            donor_replacementGLF_dead1color.z += _GLF_IDENTITY(float(GLF_dead1obj.numbers[7]), max(float(GLF_dead1obj.numbers[7]), float(GLF_dead1obj.numbers[7])));
        }
    }
    vec2 coord = gl_FragCoord.xy * (1.0 / 256.0);
    vec2 coord1 = polarize(coord + vec2(_GLF_IDENTITY(20.0 / 256.0, (_GLF_IDENTITY(20.0 / 256.0, max(_GLF_IDENTITY(20.0 / 256.0, _GLF_IDENTITY((20.0 / 256.0) / 1.0, (_GLF_IDENTITY(true, bool(_GLF_IDENTITY(bvec3(true, false, true), bvec3(bvec4(_GLF_IDENTITY(bvec3(true, false, true), bvec3(bvec4(bvec3(true, false, true), true))), false))))) ? (_GLF_IDENTITY((20.0 / 256.0) / 1.0, (false ? _GLF_FUZZED(-377.691) : ((20.0 / 256.0) / 1.0)))) : _GLF_FUZZED(atan(_GLF_IDENTITY(dot(_GLF_color, _GLF_color), (true ? _GLF_IDENTITY(dot(_GLF_color, _GLF_color), clamp(dot(_GLF_color, _GLF_color), dot(_GLF_color, _GLF_color), dot(_GLF_color, _GLF_color))) : _GLF_FUZZED(-9029.5147)))))))), _GLF_IDENTITY(20.0 / 256.0, max(20.0 / 256.0, 20.0 / 256.0))))) / _GLF_IDENTITY(1.0, 1.0 * (1.0))), -80.0 / _GLF_IDENTITY(_GLF_IDENTITY(256.0, mix(float(_GLF_FUZZED(vec4(82.69, -9.5, 798.504, 2073.3743).y)), float(256.0), bool(true))), (_GLF_IDENTITY(256.0, mix(float(_GLF_FUZZED(vec4(82.69, -9.5, 798.504, 2073.3743).y)), float(256.0), bool(true)))) + _GLF_IDENTITY(dot(vec4(1.0, 0.0, 0.0, 1.0), vec4(0.0, _GLF_IDENTITY(dot(vec2(1.0, 0.0), vec2(1.0, 0.0)), dot(vec2(1.0, 0.0), vec2(1.0, 0.0))), 1.0, determinant(mat4(0.0, 1.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0)))), _GLF_IDENTITY(dot(vec4(1.0, 0.0, 0.0, 1.0), vec4(0.0, _GLF_IDENTITY(dot(vec2(1.0, 0.0), vec2(1.0, 0.0)), dot(vec2(1.0, 0.0), vec2(1.0, 0.0))), 1.0, determinant(mat4(0.0, 1.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0)))), mix(float(dot(vec4(1.0, 0.0, 0.0, 1.0), vec4(0.0, _GLF_IDENTITY(dot(vec2(1.0, 0.0), vec2(1.0, 0.0)), dot(vec2(1.0, 0.0), vec2(1.0, 0.0))), 1.0, determinant(mat4(0.0, 1.0, 0.0, 1.0, 0.0, _GLF_IDENTITY(0.0, (0.0) - sqrt(length(vec4(0.0, 0.0, 0.0, 0.0)))), 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0))))), float(_GLF_IDENTITY(_GLF_FUZZED(-1.0), (false ? _GLF_FUZZED(1149.7588) : _GLF_FUZZED(-1.0)))), bool(false)))))));
    vec2 coord2 = polarize(coord + vec2(_GLF_IDENTITY(-60.0 / 256.0, _GLF_IDENTITY((_GLF_IDENTITY(-60.0 / 256.0, (true ? _GLF_IDENTITY(-60.0 / 256.0, float(mat3(-60.0 / 256.0, 1.0, 0.0, 0.0, 1.0, 1.0, 1.0, 1.0, 0.0))) : _GLF_FUZZED(-8.2)))) / determinant(mat3(1.0, 0.0, 0.0, log(1.0), 1.0, 0.0, _GLF_IDENTITY(0.0, clamp(0.0, 0.0, 0.0)), 0.0, 1.0)), clamp((_GLF_IDENTITY(-60.0 / 256.0, (true ? _GLF_IDENTITY(-60.0 / 256.0, float(mat3(-60.0 / 256.0, 1.0, 0.0, 0.0, 1.0, 1.0, 1.0, 1.0, 0.0))) : _GLF_FUZZED(-8.2)))) / determinant(_GLF_IDENTITY(mat3(1.0, 0.0, _GLF_IDENTITY(0.0, min(0.0, _GLF_IDENTITY(0.0, float(vec3(0.0, 1.0, 1.0))))), log(1.0), 1.0, 0.0, _GLF_IDENTITY(0.0, clamp(0.0, 0.0, 0.0)), _GLF_IDENTITY(0.0, max(_GLF_IDENTITY(0.0, float(mat3(0.0, _GLF_IDENTITY(dot(vec3(1.0, 0.0, 1.0), vec3(0.0, 1.0, 0.0)), dot(vec3(1.0, 0.0, 1.0), vec3(0.0, 1.0, 0.0))), round(length(normalize(vec4(1.0, 1.0, 1.0, 1.0)))), 1.0, 1.0, 1.0, 1.0, 0.0, 1.0))), 0.0)), 1.0), (mat3(1.0, 0.0, _GLF_IDENTITY(0.0, min(0.0, _GLF_IDENTITY(0.0, float(vec3(0.0, 1.0, 1.0))))), log(1.0), 1.0, 0.0, _GLF_IDENTITY(0.0, clamp(0.0, 0.0, 0.0)), _GLF_IDENTITY(0.0, max(_GLF_IDENTITY(0.0, float(mat3(0.0, _GLF_IDENTITY(dot(vec3(1.0, 0.0, 1.0), vec3(0.0, 1.0, 0.0)), dot(vec3(1.0, 0.0, 1.0), vec3(0.0, 1.0, 0.0))), round(length(normalize(vec4(1.0, 1.0, 1.0, 1.0)))), 1.0, 1.0, 1.0, 1.0, 0.0, 1.0))), 0.0)), 1.0)) + mat3(0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0))), (_GLF_IDENTITY(_GLF_IDENTITY(-60.0 / 256.0, (true ? _GLF_IDENTITY(-60.0 / 256.0, float(mat3(-60.0 / 256.0, 1.0, 0.0, 0.0, 1.0, 1.0, 1.0, 1.0, 0.0))) : _GLF_FUZZED(-_GLF_IDENTITY(8.2, float(vec2(8.2, _GLF_IDENTITY(dot(vec2(exp(0.0), _GLF_ZERO(0.0, injectionSwitch.x)), vec2(0.0, 1.0)), dot(vec2(exp(0.0), _GLF_ZERO(0.0, injectionSwitch.x)), vec2(0.0, 1.0))))))))), (_GLF_IDENTITY(_GLF_IDENTITY(-60.0 / 256.0, (true ? _GLF_IDENTITY(-60.0 / 256.0, float(mat3(-60.0 / 256.0, 1.0, 0.0, 0.0, 1.0, 1.0, 1.0, 1.0, 0.0))) : _GLF_FUZZED(-_GLF_IDENTITY(8.2, float(vec2(8.2, _GLF_IDENTITY(dot(vec2(exp(0.0), _GLF_ZERO(0.0, injectionSwitch.x)), vec2(0.0, 1.0)), dot(vec2(exp(0.0), _GLF_ZERO(0.0, injectionSwitch.x)), vec2(0.0, 1.0))))))))), mix(float(_GLF_FUZZED(3.4)), float(_GLF_IDENTITY(-60.0 / 256.0, (true ? _GLF_IDENTITY(-60.0 / 256.0, float(mat3(-60.0 / 256.0, 1.0, 0.0, 0.0, 1.0, 1.0, 1.0, 1.0, 0.0))) : _GLF_FUZZED(-_GLF_IDENTITY(8.2, float(vec2(8.2, _GLF_IDENTITY(dot(vec2(exp(0.0), _GLF_ZERO(0.0, injectionSwitch.x)), vec2(0.0, 1.0)), dot(vec2(exp(0.0), _GLF_ZERO(0.0, injectionSwitch.x)), vec2(0.0, 1.0)))))))))), bool(_GLF_TRUE(true, (injectionSwitch.x < _GLF_IDENTITY(injectionSwitch, mat2(1.0) * (injectionSwitch)).y)))))) / 1.0)) / determinant(mat3(1.0, 0.0, 0.0, log(1.0), 1.0, 0.0, _GLF_IDENTITY(0.0, clamp(_GLF_IDENTITY(0.0, (false ? _GLF_FUZZED(_GLF_IDENTITY(asin(-175.704), float(mat4(asin(-175.704), 1.0, 0.0, sqrt(1.0), 0.0, 0.0, 0.0, 0.0, cos(0.0), 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0)))) : 0.0)), 0.0, 0.0)), 0.0, _GLF_IDENTITY(1.0, mix(float(1.0), float(_GLF_FUZZED((8.5 * (-2344.8805)))), bool(false))))), (_GLF_IDENTITY(-60.0 / 256.0, (true ? _GLF_IDENTITY(-60.0 / 256.0, _GLF_IDENTITY(float(mat3(-60.0 / 256.0, 1.0, 0.0, 0.0, 1.0, 1.0, 1.0, 1.0, 0.0)), _GLF_IDENTITY(float(vec4(float(mat3(-60.0 / 256.0, 1.0, 0.0, 0.0, 1.0, 1.0, 1.0, 1.0, 0.0)), _GLF_ONE(1.0, injectionSwitch.y), 1.0, 0.0)), float(mat4(float(vec4(float(mat3(-60.0 / 256.0, 1.0, 0.0, 0.0, 1.0, 1.0, 1.0, 1.0, 0.0)), _GLF_ONE(1.0, injectionSwitch.y), 1.0, 0.0)), 0.0, 1.0, exp(0.0), 1.0, sin(0.0), 0.0, 0.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0, _GLF_IDENTITY(dot(vec3(1.0, 0.0, 0.0), vec3(1.0, 0.0, 0.0)), dot(vec3(1.0, 0.0, 0.0), vec3(1.0, 0.0, 0.0))), 0.0))))) : _GLF_IDENTITY(_GLF_FUZZED(-8.2), clamp(_GLF_FUZZED(-8.2), _GLF_FUZZED(-8.2), _GLF_FUZZED(-8.2)))))) / determinant(mat3(1.0, 0.0, 0.0, log(1.0), 1.0, 0.0, _GLF_IDENTITY(0.0, clamp(0.0, 0.0, 0.0)), 0.0, 1.0))))), 40.0 / 256.0));
    vec2 coord3 = polarize(coord);
    if (_GLF_DEAD(false)) {
        _GLF_color = _GLF_color;
    }
    coord = coord1 - coord2 + coord3;
    coord = floor(coord * 256.0) / 256.0;
    _GLF_color = vec4(texture(tex, _GLF_IDENTITY(coord, clamp(_GLF_IDENTITY(coord, vec2(mat3x4(_GLF_IDENTITY(coord, (coord) / vec2(1.0, 1.0)), 0.0, tan(0.0), 1.0, 0.0, 1.0, 1.0, 1.0, tan(0.0), 1.0, 0.0))), _GLF_IDENTITY(coord, mix(vec2((coord)[0], (coord)[1]), vec2(_GLF_FUZZED(381.408), _GLF_FUZZED(0.3)), bvec2(false, false))), coord))).xyz, 1.0);
}
